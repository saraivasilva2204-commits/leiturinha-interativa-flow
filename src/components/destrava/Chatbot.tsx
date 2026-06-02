import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import mascotAsset from "@/assets/mascot-head.png.asset.json";

type Msg = { role: "user" | "bot"; text: string };

const SUGGESTIONS = [
  "Como melhorar minha memória?",
  "Dica para ler com mais foco",
  "Por que errei essa pergunta?",
];

// Heurística local. Quando o webhook estiver configurado, será usado.
function localReply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("memória") || q.includes("memoria") || q.includes("decora"))
    return "Tente associar cada elemento (personagem, lugar, ação) a uma imagem mental vívida. Quanto mais incomum a imagem, mais fácil lembrar.";
  if (q.includes("foco") || q.includes("concentra") || q.includes("atenção"))
    return "Antes de começar, respire fundo 3 vezes e leia uma vez sem pressa. Releia destacando o verbo principal de cada frase.";
  if (q.includes("errei") || q.includes("erro") || q.includes("dica"))
    return "Errar é parte do treino. Releia o texto, identifique o quem / onde / o quê e tente recontar em voz alta com suas palavras.";
  if (q.includes("interpreta") || q.includes("entender"))
    return "Pergunte-se: quem age? onde? por quê? Essa estrutura simples destrava 90% da interpretação.";
  return "Boa pergunta! Em breve vou conectar com a IA completa via n8n para respostas mais profundas. Por enquanto: leia devagar, visualize a cena e relacione com algo que você já viva.";
}

const WEBHOOK_URL = ""; // futuro: https://n8n.../webhook/destravae-chat

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text: "Olá! Sou o assistente do DESTRAVAÊ 🪄 Posso te dar dicas de leitura, explicar erros e sugerir treinos.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      let reply = "";
      if (WEBHOOK_URL) {
        const res = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        });
        const data = await res.json();
        reply = data.reply ?? localReply(text);
      } else {
        await new Promise((r) => setTimeout(r, 450));
        reply = localReply(text);
      }
      setMessages((m) => [...m, { role: "bot", text: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "Tive um problema para responder. Tente novamente." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Fechar Dé" : "Abrir Dé"}
        aria-expanded={open}
        className="fixed top-5 right-5 z-50 h-14 w-14 rounded-full bg-gradient-primary text-primary-foreground shadow-glow flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Assistente DESTRAVAÊ"
          className="animate-scale-in fixed bottom-24 right-5 z-50 w-[min(calc(100vw-2.5rem),22rem)] h-[28rem] rounded-3xl border border-border bg-card shadow-card flex flex-col overflow-hidden"
        >
          <header className="px-4 py-3 border-b border-border flex items-center gap-2.5 bg-gradient-primary">
            <div className="h-9 w-9 rounded-full bg-primary-foreground/15 backdrop-blur flex items-center justify-center overflow-hidden ring-1 ring-primary-foreground/30 shadow-[0_0_12px_rgba(177,77,255,0.6)]">
              <img
                src={mascotAsset.url}
                alt="Mascote DESTRAVAÊ"
                className="h-full w-full object-cover object-center scale-110"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-primary-foreground leading-tight">
                Assistente
              </p>
              <p className="text-[10px] uppercase tracking-wider text-primary-foreground/70">
                Online
              </p>
            </div>
          </header>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-gradient-primary text-primary-foreground rounded-br-sm"
                      : "bg-secondary text-secondary-foreground rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-secondary rounded-2xl rounded-bl-sm px-3.5 py-3 flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse" />
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse [animation-delay:300ms]" />
                </div>
              </div>
            )}
            {messages.length <= 1 && !loading && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs rounded-full border border-border bg-background px-2.5 py-1 text-muted-foreground hover:text-foreground hover:border-primary-glow transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-border p-2.5 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte algo..."
              aria-label="Mensagem"
              maxLength={300}
              className="flex-1 rounded-full bg-secondary px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground border-0 focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button
              type="submit"
              size="icon"
              variant="hero"
              disabled={!input.trim() || loading}
              aria-label="Enviar mensagem"
              className="rounded-full"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
