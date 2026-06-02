import { Button } from "@/components/ui/button";
import { FileText, HelpCircle, Timer } from "lucide-react";

export function IntroScreen({ onStart }: { onStart: () => void }) {
  const features = [
    { icon: FileText, label: "Textos" },
    { icon: HelpCircle, label: "Perguntas" },
    { icon: Timer, label: "Cronometrado" },
  ];

  return (
    <div className="animate-slide-up text-center">
      <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] mb-8">
        Treine sua mente <br />
        através da <span className="text-gradient">leitura</span>
      </h1>

      <Button size="lg" variant="hero" onClick={onStart} aria-label="Começar exercício de leitura">
        Começar exercício
      </Button>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {features.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="rounded-2xl border border-border bg-card/60 backdrop-blur px-5 py-5 flex items-center gap-4"
          >
            <span className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
            </span>
            <p className="font-medium text-foreground text-base">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
