import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Lightbulb, X, BookOpen } from "lucide-react";
import type { BankQuestion, Passage } from "@/lib/bank";
import { SKILL_LABEL } from "@/lib/skills";

type Props = {
  question: BankQuestion;
  passage: Passage;
  index: number;
  total: number;
  isLast: boolean;
  onNext: (result: { correct: boolean; hintsUsed: number; elapsedMs: number }) => void;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function TrainQuestion({ question, passage, index, total, isLast, onNext }: Props) {
  const isOrdering = question.tipo === "ordenacao";
  const [selected, setSelected] = useState<number | null>(null);
  const [order, setOrder] = useState<string[]>([]);
  const [hints, setHints] = useState(0);
  const [checked, setChecked] = useState(false);
  const [showText, setShowText] = useState(false);
  const start = useMemo(() => Date.now(), [question.id]);

  const shuffled = useMemo(
    () => (isOrdering ? shuffle(question.opcoes) : question.opcoes),
    [question.id],
  );

  const ready = isOrdering ? order.length === question.opcoes.length : selected !== null;
  const correct = isOrdering
    ? order.every((o, i) => o === question.opcoes[i])
    : selected === question.correta;

  const progress = ((index + 1) / total) * 100;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Pergunta {index + 1} / {total}
        </span>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {SKILL_LABEL[question.habilidade]}
          </span>
          <button
            type="button"
            onClick={() => setShowText((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            {showText ? "Esconder texto" : "Ver o texto"}
          </button>
        </div>
      </div>

      <div
        className="h-1 w-full bg-muted rounded-full overflow-hidden mb-8"
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

      {showText && (
        <div className="mb-8 rounded-2xl border border-border bg-card/50 p-5 space-y-3 animate-fade-in">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {passage.titulo}
          </p>
          {passage.paragrafos.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-foreground">
              {p}
            </p>
          ))}
        </div>
      )}

      <p className="font-display text-2xl sm:text-3xl text-foreground mb-7 leading-snug">
        {question.pergunta}
      </p>

      {isOrdering ? (
        <div className="space-y-3">
          <div className="grid gap-2.5">
            {shuffled.map((opt) => {
              const pos = order.indexOf(opt);
              const picked = pos >= 0;
              const rightSpot = checked && picked && question.opcoes[pos] === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  disabled={checked}
                  onClick={() =>
                    setOrder((cur) => (cur.includes(opt) ? cur.filter((c) => c !== opt) : [...cur, opt]))
                  }
                  className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200 ${
                    checked
                      ? rightSpot
                        ? "border-success/60 bg-success/5"
                        : picked
                          ? "border-destructive/60 bg-destructive/5"
                          : "border-border"
                      : picked
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background hover:border-primary/60"
                  }`}
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-xs font-semibold">
                    {picked ? pos + 1 : ""}
                  </span>
                  <span className="text-foreground leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            Toque nos acontecimentos na ordem correta. Toque de novo para desfazer.
          </p>
        </div>
      ) : (
        <div className="grid gap-2.5 sm:grid-cols-2">
          {question.opcoes.map((opt, oi) => {
            const isSel = selected === oi;
            const isRight = oi === question.correta;
            const state = checked
              ? isRight
                ? "right"
                : isSel
                  ? "wrong"
                  : "idle"
              : isSel
                ? "sel"
                : "idle";
            return (
              <button
                key={oi}
                type="button"
                disabled={checked}
                onClick={() => setSelected(oi)}
                aria-pressed={isSel}
                className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200 ${
                  state === "right"
                    ? "border-success/60 bg-success/5"
                    : state === "wrong"
                      ? "border-destructive/60 bg-destructive/5"
                      : state === "sel"
                        ? "border-primary bg-primary/5 shadow-soft"
                        : "border-border bg-background hover:border-primary/60 hover:bg-accent/40"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                    state === "right"
                      ? "border-success bg-success text-white"
                      : state === "wrong"
                        ? "border-destructive bg-destructive text-white"
                        : state === "sel"
                          ? "border-primary bg-gradient-primary text-primary-foreground"
                          : "border-border bg-background"
                  }`}
                  aria-hidden="true"
                >
                  {state === "right" && <Check className="h-3 w-3" strokeWidth={3} />}
                  {state === "wrong" && <X className="h-3 w-3" strokeWidth={3} />}
                  {state === "sel" && <Check className="h-3 w-3" strokeWidth={3} />}
                </span>
                <span className="text-foreground leading-relaxed">{opt}</span>
              </button>
            );
          })}
        </div>
      )}

      {!checked && hints > 0 && (
        <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-4 space-y-2 animate-fade-in">
          <p className="text-sm text-foreground flex gap-2">
            <Lightbulb className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <span>{question.dica1}</span>
          </p>
          {hints > 1 && (
            <p className="text-sm text-foreground pl-6">{question.dica2}</p>
          )}
        </div>
      )}

      {checked && (
        <div
          className={`mt-6 rounded-2xl border p-5 animate-fade-in ${
            correct ? "border-success/40 bg-success/5" : "border-destructive/40 bg-destructive/5"
          }`}
        >
          <p className="font-display text-xl text-foreground mb-2">
            {correct ? "Você acertou!" : "Não foi essa."}
          </p>
          <p className="text-sm text-foreground leading-relaxed mb-3">{question.explicacao}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Trecho do texto: <span className="italic text-foreground">“{question.trechoEvidencia}”</span>
          </p>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-4 flex-wrap">
        {!checked ? (
          <Button
            variant="outline"
            onClick={() => setHints((h) => Math.min(h + 1, 2))}
            disabled={hints >= 2}
          >
            <Lightbulb className="h-4 w-4" aria-hidden="true" />
            {hints === 0 ? "Preciso de uma dica" : hints === 1 ? "Outra dica" : "Sem mais dicas"}
          </Button>
        ) : (
          <p className="text-xs text-muted-foreground">
            {hints > 0 ? `Dicas usadas: ${hints}` : "Resolvido sem dicas."}
          </p>
        )}

        {!checked ? (
          <Button onClick={() => setChecked(true)} disabled={!ready} variant="hero" size="lg">
            Confirmar resposta
          </Button>
        ) : (
          <Button
            variant="hero"
            size="lg"
            onClick={() =>
              onNext({ correct, hintsUsed: hints, elapsedMs: Date.now() - start })
            }
          >
            {isLast ? "Ver resultado" : "Próxima pergunta"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        )}
      </div>
    </div>
  );
}
