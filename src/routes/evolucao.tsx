import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/destrava/SiteHeader";
import { AccessibilityPanel } from "@/components/destrava/AccessibilityPanel";
import { accuracyFor, loadProgress, playerLevel, weakestSkill, type Progress } from "@/lib/progress";
import { LEVELS, SKILLS, masteryFor } from "@/lib/skills";
import { CATEGORY_LABEL, passageById } from "@/lib/bank";

export const Route = createFileRoute("/evolucao")({
  head: () => ({
    meta: [
      { title: "Minha evolução — DESTRAVAÊ" },
      {
        name: "description",
        content:
          "Acompanhe seu nível de leitura, XP, sequência de dias e o domínio de cada habilidade de interpretação.",
      },
      { property: "og:title", content: "Minha evolução — DESTRAVAÊ" },
      {
        property: "og:description",
        content: "Veja seu progresso por habilidade e o histórico dos seus treinos de leitura.",
      },
    ],
  }),
  component: EvolucaoPage,
});

function EvolucaoPage() {
  const [progress, setProgress] = useState<Progress | null>(null);
  useEffect(() => setProgress(loadProgress()), []);

  const pl = playerLevel(progress?.xp ?? 0);
  const weakest = progress ? weakestSkill(progress) : null;
  const levelInfo = LEVELS.find((l) => l.nivel === (progress?.currentLevel ?? 1));
  const history = progress ? [...progress.history].reverse().slice(0, 10) : [];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 px-6 sm:px-12 py-12 w-full">
        <div className="w-full max-w-3xl mx-auto animate-fade-in">
          <h1 className="font-display text-4xl sm:text-5xl mb-3">
            Minha <span className="text-gradient">evolução</span>
          </h1>
          <p className="text-muted-foreground mb-10">
            Tudo o que você treinou fica salvo neste dispositivo.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <Box label="Nível de jogador" value={`${pl.level}`} />
            <Box label="XP total" value={`${progress?.xp ?? 0}`} />
            <Box label="Sequência" value={`${progress?.streak ?? 0} dia${progress?.streak === 1 ? "" : "s"}`} />
            <Box label="Treinos feitos" value={`${progress?.history.length ?? 0}`} />
          </div>

          <div className="rounded-2xl border border-border bg-card/50 p-5 mb-8">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
              Nível de leitura atual
            </p>
            <p className="font-display text-2xl text-foreground">
              Nível {progress?.currentLevel ?? 1} · {levelInfo?.nome}
            </p>
            <p className="text-sm text-muted-foreground mt-1">{levelInfo?.descricao}</p>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden mt-4">
              <div className="h-full bg-gradient-primary transition-all duration-700" style={{ width: `${pl.pct}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {pl.into} de {pl.needed} XP para o próximo nível de jogador
            </p>
          </div>

          <section className="rounded-2xl border border-border bg-card/50 p-5 mb-8">
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
              Domínio por habilidade
            </h2>
            <ul className="space-y-3">
              {SKILLS.map((s) => {
                const acc = progress ? accuracyFor(progress, s.id) : null;
                const m = masteryFor(acc);
                return (
                  <li key={s.id} className="flex items-center gap-3">
                    <span className="w-40 sm:w-52 text-sm text-foreground shrink-0">{s.label}</span>
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary transition-all duration-700"
                        style={{ width: `${(acc ?? 0) * 100}%` }}
                      />
                    </div>
                    <span className="w-28 text-right text-xs text-muted-foreground">
                      {m.emoji} {m.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          {weakest && (
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 mb-8">
              <p className="text-sm text-foreground">
                Sugestão: seu próximo treino vai focar em{" "}
                <strong>{SKILLS.find((s) => s.id === weakest)?.label}</strong>.
              </p>
            </div>
          )}

          <section className="rounded-2xl border border-border bg-card/50 p-5 mb-10">
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
              Últimos treinos
            </h2>
            {history.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Você ainda não concluiu nenhum treino.
              </p>
            ) : (
              <ul className="space-y-3">
                {history.map((h, i) => {
                  let titulo = h.passageId;
                  let categoria = "";
                  try {
                    const p = passageById(h.passageId);
                    titulo = p.titulo;
                    categoria = CATEGORY_LABEL[p.categoria];
                  } catch {
                    /* texto removido do banco */
                  }
                  return (
                    <li key={i} className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-foreground">
                        {titulo}
                        {categoria && (
                          <span className="text-muted-foreground"> · {categoria}</span>
                        )}
                      </span>
                      <span className="text-muted-foreground tabular-nums">
                        {h.score}/{h.total} ·{" "}
                        {new Date(h.date).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                        })}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          <div className="flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to="/treino">Treinar agora</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/conquistas">Ver conquistas</Link>
            </Button>
          </div>
        </div>
      </main>
      <AccessibilityPanel />
    </div>
  );
}

function Box({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/50 p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-display text-2xl text-foreground mt-0.5 tabular-nums">{value}</p>
    </div>
  );
}
