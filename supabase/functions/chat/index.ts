// Edge Function: chat — Agente LLM com Gemini API para Armazém Vivo
// Orquestra o loop agentic: recebe mensagem → Gemini → tool calls → resposta

import { GoogleGenerativeAI, Content } from "npm:@google/generative-ai@0.24.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { warehouseTools } from "./tools.ts";
import { executeToolCall } from "./executor.ts";
import { SYSTEM_PROMPT } from "./system-prompt.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-application-name",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Mensagem de fallback quando o loop agêntico não produz texto
const FALLBACK_REPLY =
    "Não foi possível processar sua consulta no momento. Tente reformular a pergunta ou use termos mais específicos.";

/**
 * Sanitiza o histórico recebido do front-end.
 * Remove entradas com role inválido, sem parts, ou com parts vazio.
 * Garante que nunca passamos Content malformado para o startChat.
 */
function sanitizeHistory(raw: unknown): Content[] {
    if (!Array.isArray(raw)) return [];

    return raw.filter((item: any) => {
        if (!item || typeof item !== "object") return false;
        if (item.role !== "user" && item.role !== "model") return false;
        if (!Array.isArray(item.parts) || item.parts.length === 0) return false;
        // Filtra parts sem nenhum conteúdo utilizável
        const validParts = item.parts.filter(
            (p: any) => p && (typeof p.text === "string" || p.functionCall || p.functionResponse)
        );
        return validParts.length > 0;
    }) as Content[];
}

Deno.serve(async (req) => {
    // Trata preflight CORS
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    const t0 = Date.now();

    try {
        // ── Autenticação ─────────────────────────────────────────
        const authHeader = req.headers.get("authorization");
        if (!authHeader) {
            return new Response(
                JSON.stringify({ error: "Token de autenticação ausente" }),
                { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        const supabaseAuth = createClient(
            Deno.env.get("SUPABASE_URL")!,
            Deno.env.get("SUPABASE_ANON_KEY")!
        );

        const { data: { user }, error: authError } = await supabaseAuth.auth.getUser(
            authHeader.replace("Bearer ", "")
        );

        if (authError || !user) {
            return new Response(
                JSON.stringify({ error: "Usuário não autenticado" }),
                { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        // ── Corpo da requisição ──────────────────────────────────
        const { message, history } = await req.json();

        if (!message || typeof message !== "string") {
            return new Response(
                JSON.stringify({ error: "Campo 'message' é obrigatório" }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        // Sanitiza o histórico para evitar que Content inválido derrube o startChat
        const safeHistory = sanitizeHistory(history);

        // ── Gemini API ───────────────────────────────────────────
        const apiKey = Deno.env.get("GEMINI_API_KEY");
        if (!apiKey) {
            return new Response(
                JSON.stringify({ error: "GEMINI_API_KEY não configurada no servidor" }),
                { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: SYSTEM_PROMPT,
            tools: warehouseTools as any,
        });

        const chat = model.startChat({
            history: safeHistory,
        });

        // ── Loop Agêntico (max 8 iterações) ──────────────────────
        // Aumentado de 5 para 8 para suportar fluxos encadeados:
        // ex: search_products → get_product_stock → resposta final
        let response = await chat.sendMessage(message);
        let iterations = 0;
        const MAX_ITERATIONS = 8;

        while (iterations < MAX_ITERATIONS) {
            const candidate = response.response.candidates?.[0];
            if (!candidate) break;

            const parts = candidate.content?.parts ?? [];
            const toolCalls = parts.filter((p: any) => p.functionCall);

            // Sem tool calls → modelo produziu resposta textual, sai do loop
            if (toolCalls.length === 0) break;

            // Executa todas as tool calls em paralelo
            const toolResults = await Promise.all(
                toolCalls.map(async (part: any) => {
                    const { name, args } = part.functionCall;
                    console.log(`[Chat] Tool call: ${name}`, JSON.stringify(args));
                    const result = await executeToolCall(name, args ?? {});
                    // Formato esperado pelo SDK @google/generative-ai@0.24: Part[]
                    return {
                        functionResponse: {
                            name,
                            response: { result },
                        },
                    };
                })
            );

            // Envia os resultados de volta ao Gemini para a próxima iteração
            response = await chat.sendMessage(toolResults);
            iterations++;
        }

        // ── Resposta final ───────────────────────────────────────
        let reply: string;
        try {
            reply = response.response.text();
        } catch {
            reply = "";
        }

        // Guard: se o loop exauriu MAX_ITERATIONS ou a resposta veio vazia
        if (!reply || reply.trim() === "") {
            console.warn(`[Chat] Loop encerrado sem resposta textual | iterações=${iterations}`);
            reply = FALLBACK_REPLY;
        }

        const duration = Date.now() - t0;
        console.log(`[Chat] Resposta gerada | user=${user.id} | iterações=${iterations} | ${duration}ms`);

        return new Response(
            JSON.stringify({ reply }),
            {
                status: 200,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    } catch (error: any) {
        const duration = Date.now() - t0;
        console.error(`[Chat] Erro após ${duration}ms:`, error?.message ?? String(error));
        return new Response(
            JSON.stringify({
                error: "Erro interno ao processar a mensagem",
                details: error?.message ?? String(error),
            }),
            {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }
});