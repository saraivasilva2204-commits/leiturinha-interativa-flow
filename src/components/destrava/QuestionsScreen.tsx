import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import type { Question } from "@/lib/exercise";
import { CountdownTimer } from "./CountdownTimer";


type Props = {
  questions: Question[];
  onSubmit: (answers: number[], answerTimesMs: number[]) => void;
};

export function QuestionsScreen({ questions, onSubmit }: Props) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [times, setTimes] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const startRef = useRef<number>(performance.now());

  useEffect(() => {
    startRef.current = performance.now();
    setSelected(null);
  }, [index]);

  const q = questions[index];
  const isLast = index === questions.length - 1;
  const progress = ((index + 1) / questions.length) * 100;

  const handleNext = () => {
    if (selected === null) return;
    const elapsed = performance.now() - startRef.current;
    const newAnswers = [...answers, selected];
    const newTimes = [...times, elapsed];
    setAnswers(newAnswers);
    setTimes(newTimes);
    if (isLast) {
      onSubmit(newAnswers, newTimes);
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Pergunta {index + 1} / {questions.length}
        </span>
        <div className="flex gap-1.5" aria-hidden="true">
          {questions.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-6 rounded-full transition-all duration-500 ${
                i <= index ? "bg-gradient-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      <div
        className="h-1 w-full bg-muted rounded-full overflow-hidden mb-10"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-gradient-primary transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      <fieldset key={q.id} className="animate-scale-in">
        <legend className="sr-only">{q.prompt}</legend>
        <p className="font-display text-2xl sm:text-3xl text-foreground mb-7 leading-snug">
          {q.prompt}
        </p>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {q.options.map((opt, oi) => {
            const isSel = selected === oi;
            return (
              <button
                key={oi}
                type="button"
                onClick={() => setSelected(oi)}
                aria-pressed={isSel}
                className={`group flex items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200 ${
                  isSel
                    ? "border-primary-glow bg-primary/5 shadow-soft"
                    : "border-border bg-background hover:border-primary-glow/60 hover:bg-accent/40"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                    isSel
                      ? "border-primary-glow bg-gradient-primary text-primary-foreground"
                      : "border-border bg-background"
                  }`}
                  aria-hidden="true"
                >
                  {isSel && <Check className="h-3 w-3" strokeWidth={3} />}
                </span>
                <span className="text-foreground leading-relaxed">{opt}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-10 flex items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          Selecione uma opção para avançar.
        </p>
        <Button
          onClick={handleNext}
          disabled={selected === null}
          variant="hero"
          size="lg"
        >
          {isLast ? "Ver resultado" : "Próxima pergunta"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
