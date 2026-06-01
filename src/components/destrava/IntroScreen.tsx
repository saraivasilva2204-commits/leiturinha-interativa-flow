import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Timer } from "lucide-react";

export function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="animate-slide-up text-center">
      <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] mb-5">
        Treine sua mente <br />
        através da <span className="text-gradient">leitura</span>
      </h1>

      <Button size="lg" variant="hero" onClick={onStart} aria-label="Começar exercício de leitura">
        Começar exercício
      </Button>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {[
          { title: "3 textos", desc: "Cenas curtas e únicas" },
          { title: "5 perguntas", desc: "Memória e interpretação" },
          { title: "Cronometrado", desc: "Tempo medido por texto" },
        ].map(({ title, desc }) => (
          <div key={title} className="rounded-2xl border border-border bg-card/50 backdrop-blur px-4 py-5 text-left">
            <p className="font-medium text-foreground text-sm">{title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
