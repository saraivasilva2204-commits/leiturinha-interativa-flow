import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy, Clock, Brain, Lightbulb, Timer } from "lucide-react";
import type { Question } from "@/lib/exercise";
import { motivationalMessage, analyzePerformance } from "@/lib/exercise";

type Props = {
  questions: Question[];
  answers: number[];
  readingTimes: number[];
  answerTimes: number[];
  onRestart: () => void;
};

export function FeedbackScreen({
  questions,
  answers,
  readingTimes,
  answerTimes,
  onRestart,
}: Props) {
  const score = questions.reduce(
    (acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0),
    0,
  );
  const total = questions.length;
  const totalReadMs = readingTimes.reduce((a, b) => a + b, 0);
  const totalAnsMs = answerTimes.reduce((a, b) => a + b, 0);
  const avgReadMs = totalReadMs / Math.max(readingTimes.length, 1);
  const avgAnsMs = totalAnsMs / Math.max(answerTimes.length, 1);

  const fmt = (ms: number) => `${(ms / 1000).toFixed(1)}s`;

  const analysis = analyzePerformance({
    score,
    total,
    readingTimes,
    answerTimes,
  });

  return (
    <div className="animate-slide-up">
      <div className="text-center mb-10">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow mb-5">
          <Trophy className="h-7 w-7 text-primary-foreground" aria-hidden="true" />
        </div>
        <h2 className="font-display text-4xl sm:text-5xl mb-3">
          {score} de {total} <span className="text-gradient">acertos</span>
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
          {motivationalMessage(score, total)}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <Stat icon={Brain} label="Acertos" value={`${score}/${total}`} />
        <Stat icon={Clock} label="Tempo total" value={fmt(totalReadMs + totalAnsMs)} />
        <Stat icon={Timer} label="Leitura média" value={fmt(avgReadMs)} />
        <Stat icon={Timer} label="Resposta média" value={fmt(avgAnsMs)} />
      </div>

      <div className="rounded-2xl border border-border bg-card/40 p-5 mb-5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
          Tempo de leitura por texto
        </p>
        <TimeBars times={readingTimes} label="Texto" />
      </div>

      <div className="rounded-2xl border border-border bg-card/40 p-5 mb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
          Tempo de resposta por pergunta
        </p>
        <TimeBars times={answerTimes} label="P." />
      </div>

      <div className="rounded-2xl border border-primary-glow/30 bg-primary/5 p-5 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="h-4 w-4 text-primary-glow" aria-hidden="true" />
          <p className="text-xs font-medium uppercase tracking-wider text-primary-glow">
            Análise do desempenho
          </p>
        </div>
        <ul className="space-y-2">
          {analysis.insights.map((line, i) => (
            <li key={i} className="text-sm text-foreground leading-relaxed flex gap-2">
              <span className="text-primary-glow mt-1">•</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      <details className="rounded-2xl border border-border bg-card/40 p-5 mb-8 group">
        <summary className="cursor-pointer text-sm font-medium text-foreground flex items-center justify-between">
          Revisar respostas
          <span className="text-xs text-muted-foreground group-open:rotate-180 transition-transform">
            ▾
          </span>
        </summary>
        <div className="mt-4 space-y-4">
          {questions.map((q, i) => {
            const correct = answers[i] === q.correctIndex;
            return (
              <div key={q.id} className="text-sm">
                <p className="text-foreground mb-1">
                  <span className={correct ? "text-success" : "text-destructive"}>
                    {correct ? "✓" : "✗"}
                  </span>{" "}
                  {q.prompt}
                </p>
                <p className="text-xs text-muted-foreground pl-4">
                  Sua resposta: {q.options[answers[i]]}
                  {!correct && (
                    <>
                      <br />
                      Correta:{" "}
                      <span className="text-foreground">{q.options[q.correctIndex]}</span>
                    </>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </details>

      <div className="flex justify-center">
        <Button onClick={onRestart} variant="hero" size="lg">
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Refazer exercício
        </Button>
      </div>
    </div>
  );
}

function TimeBars({ times, label }: { times: number[]; label: string }) {
  const max = Math.max(...times, 1);
  const fmt = (ms: number) => `${(ms / 1000).toFixed(1)}s`;
  return (
    <div className="space-y-3">
      {times.map((t, i) => {
        const pct = (t / max) * 100;
        return (
          <div key={i} className="flex items-center gap-3">
            <span className="w-14 text-xs text-muted-foreground">
              {label} {i + 1}
            </span>
            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-gradient-primary transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="w-12 text-right text-xs font-medium text-foreground tabular-nums">
              {fmt(t)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Stat({
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
      <Icon className="h-4 w-4 text-primary-glow mb-2" aria-hidden="true" />
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-display text-xl text-foreground mt-0.5 tabular-nums">{value}</p>
    </div>
  );
}
