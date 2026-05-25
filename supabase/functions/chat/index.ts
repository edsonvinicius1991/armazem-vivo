// Edge Function: chat — Agente LLM com Gemini API para Armazém Vivo
// Orquestra o loop agentic: recebe mensagem → Gemini → tool calls → resposta

import { GoogleGenerativeAI } from "npm:@google/generative-ai@0.24.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { warehouseTools } from "./tools.ts";
import { executeToolCall } from "./executor.ts";
import { SYSTEM_PROMPT } from "./system-prompt.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
    // Trata preflight CORS
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

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
            history: history ?? [],
        });

        // ── Loop Agentic (max 5 iterações) ───────────────────────
        let response = await chat.sendMessage(message);
        let iterations = 0;
        const MAX_ITERATIONS = 5;

        while (iterations < MAX_ITERATIONS) {
            const candidate = response.response.candidates?.[0];
            if (!candidate) break;

            const parts = candidate.content?.parts ?? [];
            const toolCalls = parts.filter((p: any) => p.functionCall);

            if (toolCalls.length === 0) break;

            // Executa todas as tool calls em paralelo
            const toolResults = await Promise.all(
                toolCalls.map(async (part: any) => {
                    const { name, args } = part.functionCall;
                    console.log(`[Chat] Executando tool: ${name}`, JSON.stringify(args));
                    const result = await executeToolCall(name, args ?? {});
                    return {
                        functionResponse: {
                            name,
                            response: { result },
                        },
                    };
                })
            );

            // Envia os resultados de volta ao Gemini
            response = await chat.sendMessage(toolResults);
            iterations++;
        }

        // ── Resposta final ───────────────────────────────────────
        const reply = response.response.text();

        return new Response(
            JSON.stringify({ reply }),
            {
                status: 200,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    } catch (error: any) {
        console.error("[Chat] Erro:", error);
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