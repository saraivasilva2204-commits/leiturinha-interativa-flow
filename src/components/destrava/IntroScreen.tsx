import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Timer } from "lucide-react";

export function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="animate-slide-up text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-4 py-1.5 text-xs font-medium text-muted-foreground mb-8">
        <span className="h-1.5 w-1.5 rounded-full bg-primary-glow animate-pulse" />
        Treino cognitivo de leitura ativa
      </div>

      <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] mb-5">
        Treine sua mente <br />
        através da <span className="text-gradient">leitura</span>
      </h1>

      <p className="mx-auto max-w-xl text-lg text-muted-foreground leading-relaxed mb-10">
        Três textos curtos. Algumas perguntas. Um treino direto de
        <span className="text-foreground"> memória</span>,
        <span className="text-foreground"> atenção</span> e
        <span className="text-foreground"> interpretação</span>.
      </p>

      <Button
        size="lg"
        variant="hero"
        onClick={onStart}
        aria-label="Começar exercício de leitura"
      >
        Começar exercício
      </Button>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {[
          { icon: BookOpen, title: "3 textos", desc: "Cenas curtas e únicas" },
          { icon: Brain, title: "5 perguntas", desc: "Memória e interpretação" },
          { icon: Timer, title: "Cronometrado", desc: "Tempo medido por texto" },
        ].map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-2xl border border-border bg-card/50 backdrop-blur px-4 py-5 text-left"
          >
            <Icon className="h-5 w-5 text-primary-glow mb-3" aria-hidden="true" />
            <p className="font-medium text-foreground text-sm">{title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
