import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Flame, Sparkles, Target } from "lucide-react";
import {
  loadProgress,
  playerLevel,
  untrainedSkill,
  weakestSkill,
  type Progress,
} from "@/lib/progress";
import { LEVELS, SKILL_LABEL } from "@/lib/skills";

export function RecommendedTraining() {
  const [progress, setProgress] = useState<Progress | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  if (!progress) return null;

  const skill = weakestSkill(progress) ?? untrainedSkill(progress);
  const level = LEVELS.find((l) => l.nivel === progress.currentLevel);
  const pl = playerLevel(progress.xp);
  const first = progress.history.length === 0;

  return (
    <section
      aria-label="Treino recomendado"
      className="mt-12 max-w-3xl mx-auto rounded-3xl border border-border bg-card/70 backdrop-blur p-6 sm:p-8 text-left"
    >
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
        Treino recomendado para você
      </p>
      <h2 className="font-display text-2xl sm:text-3xl mb-3">
        {first
          ? "Vamos começar pelo nível 1: compreensão literal"
          : `${level?.nome} · foco em ${skill ? SKILL_LABEL[skill] : "leitura geral"}`}
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        {first
          ? "Textos curtos do dia a dia, com dicas e explicação depois de cada resposta."
          : level?.descricao}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <Stat icon={Sparkles} label="Nível de jogador" value={`${pl.level}`} />
        <Stat
          icon={Flame}
          label="Sequência"
          value={`${progress.streak} dia${progress.streak === 1 ? "" : "s"}`}
        />
        <Stat icon={Target} label="Treinos feitos" value={`${progress.history.length}`} />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button asChild variant="hero" size="lg">
          <Link to="/treino">{first ? "Fazer meu primeiro treino" : "Continuar treinando"}</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/evolucao">Minha evolução</Link>
        </Button>
      </div>
    </section>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Flame;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background/60 p-4">
      <Icon className="h-4 w-4 text-primary mb-2" aria-hidden="true" />
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-display text-xl text-foreground mt-0.5 tabular-nums">{value}</p>
    </div>
  );
}
