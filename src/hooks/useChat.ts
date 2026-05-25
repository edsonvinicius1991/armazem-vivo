// Hook para comunicação com a Edge Function do chatbot
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

// Tipos para o chat
export interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

// Formato que o Gemini espera no histórico
interface GeminiContent {
    role: "user" | "model";
    parts: { text: string }[];
}

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Converte o histórico de mensagens para o formato esperado pelo Gemini
    const toGeminiHistory = useCallback((msgs: Message[]): GeminiContent[] => {
        return msgs.map((m) => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.content }],
        }));
    }, []);

    // Envia uma mensagem para a Edge Function e recebe a resposta
    const sendMessage = useCallback(
        async (text: string) => {
            if (!text.trim() || loading) return;

            const userMessage: Message = {
                id: crypto.randomUUID(),
                role: "user",
                content: text,
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, userMessage]);
            setLoading(true);
            setError(null);

            try {
                // Constrói o histórico antes de adicionar a nova mensagem
                const history = toGeminiHistory([...messages]);

                const { data, error: fnError } = await supabase.functions.invoke(
                    "chat",
                    {
                        body: { message: text, history },
                    }
                );

                if (fnError) {
                    throw new Error(fnError.message || "Erro ao chamar o assistente");
                }

                if (data?.error) {
                    throw new Error(data.error);
                }

                const reply = data?.reply ?? "Sem resposta do assistente.";
                setMessages((prev) => [
                    ...prev,
                    { 
                        id: crypto.randomUUID(),
                        role: "assistant", 
                        content: reply,
                        timestamp: new Date()
                    },
                ]);
            } catch (e: any) {
                const errorMsg =
                    e?.message || "Erro ao consultar o assistente. Tente novamente.";
                setError(errorMsg);
                setMessages((prev) => [
                    ...prev,
                    {
                        id: crypto.randomUUID(),
                        role: "assistant",
                        content: `❌ ${errorMsg}`,
                        timestamp: new Date()
                    },
                ]);
            } finally {
                setLoading(false);
            }
        },
        [messages, loading, toGeminiHistory]
    );

    // Limpa o histórico de conversa
    const clearChat = useCallback(() => {
        setMessages([]);
        setError(null);
    }, []);

    return { messages, loading, error, sendMessage, clearChat, clearMessages: clearChat };
}