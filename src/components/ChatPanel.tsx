import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Trash2, Sparkles, Loader2, Minimize2, Maximize2 } from "lucide-react";
import { useChat, Message } from "../hooks/useChat";
import { ScrollArea } from "./ui/scroll-area"; // se disponível, senão usamos div com overflow-y-auto
import { cn } from "../lib/utils";

// Renderizador simplificado e seguro de Markdown para a interface
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const parseContent = (text: string) => {
    // Quebrar em linhas
    const lines = text.split("\n");
    let inTable = false;
    let tableHeaders: string[] = [];
    let tableRows: string[][] = [];

    const elements: React.ReactNode[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Tratar tabelas markdown (| Col 1 | Col 2 |)
      if (line.startsWith("|") && line.endsWith("|")) {
        // Ignorar linha separadora (ex: |---|---|)
        if (line.includes("---")) {
          continue;
        }

        const cols = line.split("|").map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        if (!inTable) {
          inTable = true;
          tableHeaders = cols;
        } else {
          tableRows.push(cols);
        }
        continue;
      } else if (inTable) {
        // Fechar tabela se a linha atual não for parte dela
        elements.push(
          <div key={`table-${i}`} className="my-3 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/50">
                <tr>
                  {tableHeaders.map((h, idx) => (
                    <th key={idx} className="px-3 py-2 text-left font-semibold text-slate-700 dark:text-slate-300">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
                {tableRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-3 py-1.5 text-slate-600 dark:text-slate-400">
                        {renderInlineMarkdown(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        inTable = false;
        tableHeaders = [];
        tableRows = [];
      }

      // Linhas em branco
      if (line === "") {
        elements.push(<div key={`br-${i}`} className="h-2" />);
        continue;
      }

      // Cabeçalhos (ex: ### Título)
      if (line.startsWith("### ")) {
        elements.push(<h4 key={`h3-${i}`} className="text-sm font-bold text-slate-900 dark:text-white mt-3 mb-1">{renderInlineMarkdown(line.substring(4))}</h4>);
        continue;
      }
      if (line.startsWith("## ")) {
        elements.push(<h3 key={`h2-${i}`} className="text-base font-bold text-slate-900 dark:text-white mt-4 mb-2">{renderInlineMarkdown(line.substring(3))}</h3>);
        continue;
      }

      // Listas com marcadores (ex: * Item ou - Item)
      if (line.startsWith("* ") || line.startsWith("- ")) {
        elements.push(
          <ul key={`ul-${i}`} className="list-disc pl-5 my-1 text-sm text-slate-600 dark:text-slate-300">
            <li>{renderInlineMarkdown(line.substring(2))}</li>
          </ul>
        );
        continue;
      }

      // Parágrafo normal
      elements.push(<p key={`p-${i}`} className="text-sm leading-relaxed mb-1.5">{renderInlineMarkdown(line)}</p>);
    }

    // Caso a tabela tenha terminado no final do texto
    if (inTable) {
      elements.push(
        <div key="table-final" className="my-3 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                {tableHeaders.map((h, idx) => (
                  <th key={idx} className="px-3 py-2 text-left font-semibold text-slate-700 dark:text-slate-300">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
              {tableRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-3 py-1.5 text-slate-600 dark:text-slate-400">
                      {renderInlineMarkdown(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return elements;
  };

  // Renderiza elementos inline como negrito (**texto**) e código (`código`)
  const renderInlineMarkdown = (text: string) => {
    // Substituir negrito **texto**
    const boldRegex = /\*\*(.*?)\*\*/g;
    // Substituir itálico *texto*
    const italicRegex = /\*(.*?)\*/g;
    // Substituir código `código`
    const codeRegex = /`(.*?)`/g;

    let parts: React.ReactNode[] = [text];

    // Processar código inline
    parts = parts.flatMap((part) => {
      if (typeof part !== "string") return part;
      const subParts = [];
      let lastIdx = 0;
      let match;
      codeRegex.lastIndex = 0;

      while ((match = codeRegex.exec(part)) !== null) {
        if (match.index > lastIdx) {
          subParts.push(part.substring(lastIdx, match.index));
        }
        subParts.push(
          <code key={`code-${match.index}`} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs text-rose-600 dark:text-rose-400">
            {match[1]}
          </code>
        );
        lastIdx = codeRegex.lastIndex;
      }
      if (lastIdx < part.length) {
        subParts.push(part.substring(lastIdx));
      }
      return subParts;
    });

    // Processar negrito
    parts = parts.flatMap((part) => {
      if (typeof part !== "string") return part;
      const subParts = [];
      let lastIdx = 0;
      let match;
      boldRegex.lastIndex = 0;

      while ((match = boldRegex.exec(part)) !== null) {
        if (match.index > lastIdx) {
          subParts.push(part.substring(lastIdx, match.index));
        }
        subParts.push(
          <strong key={`strong-${match.index}`} className="font-bold text-slate-900 dark:text-white">
            {match[1]}
          </strong>
        );
        lastIdx = boldRegex.lastIndex;
      }
      if (lastIdx < part.length) {
        subParts.push(part.substring(lastIdx));
      }
      return subParts;
    });

    // Processar itálico
    parts = parts.flatMap((part) => {
      if (typeof part !== "string") return part;
      const subParts = [];
      let lastIdx = 0;
      let match;
      italicRegex.lastIndex = 0;

      while ((match = italicRegex.exec(part)) !== null) {
        if (match.index > lastIdx) {
          subParts.push(part.substring(lastIdx, match.index));
        }
        subParts.push(
          <em key={`em-${match.index}`} className="italic text-slate-800 dark:text-slate-200">
            {match[1]}
          </em>
        );
        lastIdx = italicRegex.lastIndex;
      }
      if (lastIdx < part.length) {
        subParts.push(part.substring(lastIdx));
      }
      return subParts;
    });

    return <>{parts}</>;
  };

  return <div className="space-y-1 text-slate-700 dark:text-slate-300">{parseContent(content)}</div>;
};

export const ChatPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { messages, loading, sendMessage, clearChat } = useChat();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const formatTime = (dateInput: any) => {
    try {
      if (!dateInput) return "";
      const date = new Date(dateInput);
      if (isNaN(date.getTime())) return "";
      if (typeof date.toLocaleTimeString !== 'function') return "";
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      return "";
    }
  };

  // Auto-scroll para a última mensagem
  useEffect(() => {
    if (scrollContainerRef.current) {
      setTimeout(() => {
        scrollContainerRef.current?.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: "smooth"
        });
      }, 100);
    }
  }, [messages, loading]);

  const handleSend = () => {
    if (!inputValue.trim() || loading) return;
    sendMessage(inputValue);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickPrompt = (promptText: string) => {
    if (loading) return;
    sendMessage(promptText);
  };

  const toggleChat = () => setIsOpen(!isOpen);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Sugestões de comandos rápidos
  const quickPrompts = [
    { text: "Listar localizações", icon: "📍" },
    { text: "Consultar estoque do PROD001", icon: "📦" },
    { text: "Quais produtos estão cadastrados?", icon: "📋" },
    { text: "Verificar se há alertas de estoque", icon: "⚠️" }
  ];

  return (
    <>
      {/* Botão Flutuante de Ativação do Chat */}
      <button
        id="btn-open-chat"
        onClick={toggleChat}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center border",
          isOpen 
            ? "bg-rose-500 hover:bg-rose-600 border-rose-600 text-white" 
            : "bg-gradient-to-tr from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 border-indigo-700 text-white"
        )}
        title="Falar com Assistente WMS"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        )}
      </button>

      {/* Painel do Chat */}
      {isOpen && (
        <div
          className={cn(
            "fixed bottom-24 right-6 z-50 flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 shadow-2xl backdrop-blur-md transition-all duration-300 overflow-hidden",
            isExpanded 
              ? "w-[calc(100vw-3rem)] md:w-[650px] h-[calc(100vh-10rem)]" 
              : "w-[calc(100vw-3rem)] sm:w-[400px] h-[550px]"
          )}
        >
          {/* Cabeçalho */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-indigo-900/50 text-white">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-indigo-500/25 border border-indigo-500/30 flex items-center justify-center">
                <Sparkles className="h-4.5 w-4.5 text-indigo-400 animate-pulse" />
              </div>
              <div>
                <h3 className="font-semibold text-sm tracking-wide">Assistente WMS</h3>
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  <span className="text-[10px] text-slate-400 font-medium uppercase">Online (Gemini 2.5)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Botão Maximizar / Minimizar */}
              <button
                onClick={toggleExpand}
                className="p-1.5 rounded-md hover:bg-slate-800/60 text-slate-400 hover:text-white transition-colors"
                title={isExpanded ? "Reduzir painel" : "Expandir painel"}
              >
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>

              {/* Botão Limpar Chat */}
              <button
                onClick={clearChat}
                className="p-1.5 rounded-md hover:bg-slate-800/60 text-slate-400 hover:text-rose-400 transition-colors"
                title="Limpar conversa"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              {/* Botão Fechar */}
              <button
                onClick={toggleChat}
                className="p-1.5 rounded-md hover:bg-slate-800/60 text-slate-400 hover:text-white transition-colors"
                title="Fechar chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Área de Mensagens */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/20"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3 max-w-[85%] transition-all",
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                {/* Avatar */}
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 shadow-sm border",
                    msg.role === "user"
                      ? "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                      : "bg-indigo-550 border-indigo-650 text-white"
                  )}
                >
                  {msg.role === "user" ? <User className="h-4.5 w-4.5" /> : <Bot className="h-4.5 w-4.5" />}
                </div>

                {/* Conteúdo do Balão */}
                <div
                  className={cn(
                    "rounded-2xl px-3.5 py-2.5 shadow-sm text-sm leading-relaxed",
                    msg.role === "user"
                      ? "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-tl-none"
                  )}
                >
                  {msg.role === "user" ? (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <MarkdownRenderer content={msg.content} />
                  )}
                  <span
                    className={cn(
                      "block text-[9px] mt-1.5 text-right font-medium opacity-50",
                      msg.role === "user" ? "text-indigo-200" : "text-slate-400 dark:text-slate-500"
                    )}
                  >
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            {/* Indicador de Carregamento */}
            {loading && (
              <div className="flex gap-3 max-w-[85%] mr-auto items-start">
                <div className="h-8 w-8 rounded-full bg-indigo-550 border border-indigo-650 text-white flex items-center justify-center shrink-0">
                  <Bot className="h-4.5 w-4.5" />
                </div>
                <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Consultando estoque e processando...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Dicas Rápidas (Mostradas quando o chat estiver quase limpo ou como atalhos de produtividade) */}
          {messages.length <= 1 && !loading && (
            <div className="px-4 py-2 bg-slate-100/50 dark:bg-slate-900/50 border-t border-slate-200/50 dark:border-slate-800/50">
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider block mb-1.5">
                Dicas rápidas
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {quickPrompts.map((qp, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickPrompt(qp.text)}
                    className="text-left px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 hover:border-indigo-200 dark:hover:border-indigo-900 text-slate-600 dark:text-slate-400 hover:text-indigo-650 dark:hover:text-indigo-400 transition-all font-medium flex items-center gap-1.5 truncate"
                  >
                    <span>{qp.icon}</span>
                    <span className="truncate">{qp.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Campo de Entrada de Mensagens */}
          <div className="p-3 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 flex gap-2">
            <textarea
              rows={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pergunte ao assistente WMS..."
              disabled={loading}
              className="flex-1 max-h-24 min-h-[38px] px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-950 focus:outline-none focus:ring-1.5 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-600 dark:focus:border-indigo-600 text-sm placeholder-slate-400 dark:placeholder-slate-500 text-slate-800 dark:text-slate-200 resize-none"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || loading}
              className={cn(
                "p-2.5 rounded-xl flex items-center justify-center transition-all shadow-sm border shrink-0",
                inputValue.trim() && !loading
                  ? "bg-indigo-600 hover:bg-indigo-700 border-indigo-700 text-white cursor-pointer active:scale-95"
                  : "bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-350 dark:text-slate-650 cursor-not-allowed"
              )}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
