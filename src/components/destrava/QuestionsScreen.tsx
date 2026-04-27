import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import type { Question } from "@/lib/exercise";

type Props = {
  questions: Question[];
  onSubmit: (answers: number[]) => void;
};

export function QuestionsScreen({ questions, onSubmit }: Props) {
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  const handleSubmit = () => {
    if (!allAnswered) return;
    onSubmit(questions.map((q) => answers[q.id]));
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8 text-center">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Perguntas
        </span>
        <h2 className="font-display text-3xl sm:text-4xl mt-2">
          O que sua mente <span className="text-gradient">guardou</span>?
        </h2>
      </div>

      <div className="space-y-7">
        {questions.map((q, qi) => (
          <fieldset key={q.id} className="rounded-2xl border border-border bg-card/40 p-5 sm:p-6">
            <legend className="px-2 text-xs font-medium uppercase tracking-wider text-primary-glow">
              {qi + 1} de {questions.length}
            </legend>
            <p className="font-display text-xl text-foreground mb-5 leading-snug">
              {q.prompt}
            </p>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {q.options.map((opt, oi) => {
                const selected = answers[q.id] === oi;
                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => setAnswers({ ...answers, [q.id]: oi })}
                    aria-pressed={selected}
                    className={`group flex items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200 ${
                      selected
                        ? "border-primary-glow bg-primary/5 shadow-soft"
                        : "border-border bg-background hover:border-primary-glow/60 hover:bg-accent/40"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                        selected
                          ? "border-primary-glow bg-gradient-primary text-primary-foreground"
                          : "border-border bg-background"
                      }`}
                      aria-hidden="true"
                    >
                      {selected && <Check className="h-3 w-3" strokeWidth={3} />}
                    </span>
                    <span className="text-foreground leading-relaxed">{opt}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          {Object.keys(answers).length} de {questions.length} respondidas
        </p>
        <Button
          onClick={handleSubmit}
          disabled={!allAnswered}
          variant="hero"
          size="lg"
        >
          Ver resultado
        </Button>
      </div>
    </div>
  );
}
