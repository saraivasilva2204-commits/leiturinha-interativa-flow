import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CATEGORY_LABEL, type Passage } from "@/lib/bank";
import { LEVELS } from "@/lib/skills";

type Props = {
  passage: Passage;
  onFinish: () => void;
};

export function PassageReader({ passage, onFinish }: Props) {
  const level = LEVELS.find((l) => l.nivel === passage.nivel);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 flex-wrap mb-5 stagger-in">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {CATEGORY_LABEL[passage.categoria]}
        </span>
        <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
          Nível {passage.nivel} · {level?.nome}
        </span>
      </div>

      <h1 className="font-display text-3xl sm:text-4xl text-foreground mb-6 leading-tight stagger-in">
        {passage.titulo}
      </h1>

      <article className="space-y-4 stagger-in">
        {passage.paragrafos.map((p, i) => (
          <p key={i} className="text-lg sm:text-xl leading-relaxed text-foreground">
            {p}
          </p>
        ))}
      </article>

      <div className="mt-10 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-xs text-muted-foreground max-w-xs">
          Leia com calma. Você poderá consultar o texto durante as perguntas.
        </p>
        <Button onClick={onFinish} variant="hero" size="lg">
          Ir para as perguntas
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
