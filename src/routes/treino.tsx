import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/destrava/SiteHeader";
import { PassageReader } from "@/components/destrava/PassageReader";
import { TrainQuestion } from "@/components/destrava/TrainQuestion";
import { PhaseTransition } from "@/components/destrava/PhaseTransition";
import { AccessibilityPanel } from "@/components/destrava/AccessibilityPanel";
import { buildSession, type TrainingSession } from "@/lib/session";
import {
  loadProgress,
  playerLevel,
  recordSession,
  saveProgress,
  weakestSkill,
  untrainedSkill,
  type Progress,
} from "@/lib/progress";
import { SKILL_LABEL, LEVELS } from "@/lib/skills";
import { RotateCcw, Trophy, Frown, Flame, Sparkles } from "lucide-react";

export const Route = createFileRoute("/treino")({
  head: () => ({
    meta: [
      { title: "Treino de leitura — DESTRAVAÊ" },
      {
        name: "description",
        content:
          "Treine interpretação de textos do dia a dia com dicas, explicações e feedback imediato a cada resposta.",
      },
      { property: "og:title", content: "Treino de leitura — DESTRAVAÊ" },
      {
        property: "og:description",
        content: "Textos reais, perguntas por habilidade e explicação depois de cada resposta.",
      },
    ],
  }),
  component: TreinoPage,
});

type Phase = "reading" | "questions" | "result";

type Answer = { correct: boolean; hintsUsed: number; elapsedMs: number };

function TreinoPage() {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [session, setSession] = useState<TrainingSession | null>(null);
  const [phase, setPhase] = useState<Phase>("reading");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [readingStart, setReadingStart] = useState(0);
  const [readingMs, setReadingMs] = useState(0);
  const [round, setRound] = useState(0);
  const [xpGain, setXpGain] = useState(0);

  useEffect(() => {
    const p = loadProgress();
    setProgress(p);
    const skill = weakestSkill(p) ?? untrainedSkill(p);
    setSession(buildSession({ progress: p, skill }));
    setReadingStart(Date.now());
  }, [round]);

  const finishQuestions = (all: Answer[]) => {
    if (!session || !progress) return;
    const score = all.filter((a) => a.correct).length;
    const before = progress.xp;
    const next = recordSession(progress, {
      date: new Date().toISOString(),
      passageId: session.passage.id,
      score,
      total: all.length,
      level: session.passage.nivel,
      hintsUsed: all.reduce((s, a) => s + a.hintsUsed, 0),
      readingMs,
      answerMs: all.reduce((s, a) => s + a.elapsedMs, 0),
      skills: session.questions.map((q, i) => ({
        skill: q.habilidade,
        correct: all[i]?.correct ?? false,
      })),
    });
    saveProgress(next);
    setProgress(next);
    setXpGain(next.xp - before);
    setPhase("result");
  };

  const restart = () => {
    setPhase("reading");
    setQIndex(0);
    setAnswers([]);
    setReadingMs(0);
    setXpGain(0);
    setRound((r) => r + 1);
  };

  const score = answers.filter((a) => a.correct).length;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-6 sm:px-12 py-12 w-full" aria-live="polite">
        <div className="w-full max-w-3xl">
          {!session ? (
            <p className="text-center text-muted-foreground">Preparando seu treino…</p>
          ) : (
            <PhaseTransition phaseKey={`${phase}:${qIndex}:${round}`}>
              {phase === "reading" && (
                <PassageReader
                  passage={session.passage}
                  onFinish={() => {
                    setReadingMs(Date.now() - readingStart);
                    setPhase("questions");
                  }}
                />
              )}

              {phase === "questions" && (
                <TrainQuestion
                  question={session.questions[qIndex]}
                  passage={session.passage}
                  index={qIndex}
                  total={session.questions.length}
                  isLast={qIndex === session.questions.length - 1}
                  onNext={(res) => {
                    const all = [...answers, res];
                    setAnswers(all);
                    if (qIndex === session.questions.length - 1) finishQuestions(all);
                    else setQIndex(qIndex + 1);
                  }}
                />
              )}

              {phase === "result" && progress && (
                <ResultView
                  score={score}
                  total={answers.length}
                  xpGain={xpGain}
                  progress={progress}
                  skills={session.questions.map((q, i) => ({
                    skill: q.habilidade,
                    correct: answers[i]?.correct ?? false,
                  }))}
                  onRestart={restart}
                />
              )}
            </PhaseTransition>
          )}
        </div>
      </main>
      <AccessibilityPanel />
    </div>
  );
}

function ResultView({
  score,
  total,
  xpGain,
  progress,
  skills,
  onRestart,
}: {
  score: number;
  total: number;
  xpGain: number;
  progress: Progress;
  skills: { skill: import("@/lib/skills").SkillId; correct: boolean }[];
  onRestart: () => void;
}) {
  const good = total > 0 && score / total >= 0.5;
  const pl = playerLevel(progress.xp);
  const levelInfo = LEVELS.find((l) => l.nivel === progress.currentLevel);

  return (
    <div className="animate-slide-up">
      <div className="text-center mb-10">
        <div
          className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl mb-5 ${
            good ? "bg-gradient-primary shadow-glow" : "bg-muted"
          }`}
        >
          {good ? (
            <Trophy className="h-7 w-7 text-primary-foreground" aria-hidden="true" />
          ) : (
            <Frown className="h-7 w-7 text-muted-foreground" aria-hidden="true" />
          )}
        </div>
        <h1 className="font-display text-4xl sm:text-5xl mb-3">
          {score} de {total}{" "}
          <span className={good ? "text-gradient" : "text-muted-foreground"}>acertos</span>
        </h1>
        <p className="text-muted-foreground">
          Você ganhou <strong className="text-foreground">{xpGain} XP</strong> neste treino.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        <Card icon={Sparkles} label="Nível de jogador" value={`${pl.level}`} />
        <Card icon={Flame} label="Sequência" value={`${progress.streak} dia${progress.streak === 1 ? "" : "s"}`} />
        <Card icon={Trophy} label="Nível de leitura" value={`${progress.currentLevel}`} />
      </div>

      <div className="rounded-2xl border border-border bg-card/50 p-5 mb-6">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
          Progresso até o próximo nível
        </p>
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-gradient-primary transition-all duration-700" style={{ width: `${pl.pct}%` }} />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {pl.into} de {pl.needed} XP · Leitura atual: {levelInfo?.nome}
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card/50 p-5 mb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
          Habilidades treinadas agora
        </p>
        <ul className="space-y-2">
          {skills.map((s, i) => (
            <li key={i} className="flex items-center justify-between gap-3 text-sm">
              <span className="text-foreground">{SKILL_LABEL[s.skill]}</span>
              <span className={s.correct ? "text-success" : "text-destructive"}>
                {s.correct ? "acertou" : "errou"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button onClick={onRestart} variant="hero" size="lg">
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Novo treino
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/evolucao">Ver minha evolução</Link>
        </Button>
      </div>
    </div>
  );
}

function Card({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Trophy;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card/50 p-4">
      <Icon className="h-4 w-4 text-primary mb-2" aria-hidden="true" />
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-display text-xl text-foreground mt-0.5 tabular-nums">{value}</p>
    </div>
  );
}
