import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/destrava/SiteHeader";
import { AccessibilityPanel } from "@/components/destrava/AccessibilityPanel";
import { ACHIEVEMENTS, loadProgress, type Progress } from "@/lib/progress";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/conquistas")({
  head: () => ({
    meta: [
      { title: "Conquistas — DESTRAVAÊ" },
      {
        name: "description",
        content:
          "Desbloqueie conquistas treinando leitura: treinos perfeitos, dias seguidos e leitura crítica.",
      },
      { property: "og:title", content: "Conquistas — DESTRAVAÊ" },
      {
        property: "og:description",
        content: "Veja quais conquistas você já desbloqueou nos seus treinos de leitura.",
      },
    ],
  }),
  component: ConquistasPage,
});

function ConquistasPage() {
  const [progress, setProgress] = useState<Progress | null>(null);
  useEffect(() => setProgress(loadProgress()), []);
  const unlocked = new Set(progress?.achievements ?? []);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 px-6 sm:px-12 py-12 w-full">
        <div className="w-full max-w-3xl mx-auto animate-fade-in">
          <h1 className="font-display text-4xl sm:text-5xl mb-3">
            Suas <span className="text-gradient">conquistas</span>
          </h1>
          <p className="text-muted-foreground mb-10">
            {unlocked.size} de {ACHIEVEMENTS.length} desbloqueadas.
          </p>

          <ul className="grid gap-3 sm:grid-cols-2">
            {ACHIEVEMENTS.map((a) => {
              const got = unlocked.has(a.id);
              return (
                <li
                  key={a.id}
                  className={`rounded-2xl border p-5 flex items-start gap-4 transition-colors ${
                    got ? "border-primary/40 bg-primary/5" : "border-border bg-card/40"
                  }`}
                >
                  <span className="text-2xl" aria-hidden="true">
                    {got ? a.emoji : <Lock className="h-5 w-5 text-muted-foreground" />}
                  </span>
                  <div>
                    <p className={`font-medium ${got ? "text-foreground" : "text-muted-foreground"}`}>
                      {a.label}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">{a.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-10">
            <Button asChild variant="hero" size="lg">
              <Link to="/treino">Treinar agora</Link>
            </Button>
          </div>
        </div>
      </main>
      <AccessibilityPanel />
    </div>
  );
}
