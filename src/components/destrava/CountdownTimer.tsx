import { useEffect, useRef, useState, useCallback } from "react";
import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";

type Props = {
  duration: number; // seconds
  storageKey: string;
  onComplete: () => void;
  onSkip?: () => void;
  label?: string;
};

export function CountdownTimer({
  duration,
  storageKey,
  onComplete,
  onSkip,
  label = "Tempo restante",
}: Props) {
  const [remaining, setRemaining] = useState<number>(() => {
    if (typeof window === "undefined") return duration;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const data = JSON.parse(raw) as { remaining: number; paused: boolean };
        if (typeof data.remaining === "number" && data.remaining > 0) {
          return Math.min(duration, data.remaining);
        }
      }
    } catch {}
    return duration;
  });
  const [paused, setPaused] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const data = JSON.parse(raw) as { paused: boolean };
        return Boolean(data.paused);
      }
    } catch {}
    return false;
  });

  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Reset when key (phase/index) changes
  useEffect(() => {
    completedRef.current = false;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const data = JSON.parse(raw) as { remaining: number; paused: boolean };
        setRemaining(
          typeof data.remaining === "number" && data.remaining > 0
            ? Math.min(duration, data.remaining)
            : duration,
        );
        setPaused(Boolean(data.paused));
        return;
      }
    } catch {}
    setRemaining(duration);
    setPaused(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  // Tick
  useEffect(() => {
    if (paused) return;
    if (remaining <= 0) return;
    const id = window.setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [paused, remaining]);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ remaining, paused }),
      );
    } catch {}
  }, [remaining, paused, storageKey]);

  // Auto-complete
  useEffect(() => {
    if (remaining === 0 && !completedRef.current) {
      completedRef.current = true;
      try {
        localStorage.removeItem(storageKey);
      } catch {}
      onCompleteRef.current();
    }
  }, [remaining, storageKey]);

  const reset = useCallback(() => {
    completedRef.current = false;
    setRemaining(duration);
    setPaused(false);
  }, [duration]);

  const skip = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    try {
      localStorage.removeItem(storageKey);
    } catch {}
    (onSkip ?? onComplete)();
  }, [onComplete, onSkip, storageKey]);

  const danger = remaining <= 10 && remaining > 0;
  const pct = (remaining / duration) * 100;
  const radius = 22;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (pct / 100) * circ;

  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border px-3 py-2 backdrop-blur transition-colors ${
        danger
          ? "border-destructive/50 bg-destructive/10"
          : "border-border bg-card/70"
      }`}
      role="timer"
      aria-live="off"
      aria-label={`${label}: ${remaining} segundos`}
    >
      <div className="relative h-12 w-12 shrink-0">
        <svg className="h-12 w-12 -rotate-90" viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r={radius}
            fill="none"
            strokeWidth="4"
            className="stroke-muted"
          />
          <circle
            cx="25"
            cy="25"
            r={radius}
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            className={`transition-[stroke-dashoffset] duration-1000 ease-linear ${
              danger ? "stroke-destructive" : "stroke-primary"
            }`}
          />
        </svg>
        <span
          className={`absolute inset-0 flex items-center justify-center font-mono text-xs font-bold tabular-nums ${
            danger ? "text-destructive animate-pulse" : "text-foreground"
          }`}
        >
          {remaining}
        </span>
      </div>

      <div className="hidden sm:flex flex-col leading-tight">
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </span>
        <span
          className={`font-mono text-sm font-semibold tabular-nums ${
            danger ? "text-destructive" : "text-foreground"
          }`}
        >
          {remaining}s
        </span>
      </div>

      <div className="flex items-center gap-1 ml-1">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Retomar" : "Pausar"}
          className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-border bg-background hover:bg-accent transition-colors"
        >
          {paused ? (
            <Play className="h-3.5 w-3.5" />
          ) : (
            <Pause className="h-3.5 w-3.5" />
          )}
        </button>
        <button
          type="button"
          onClick={reset}
          aria-label="Reiniciar cronômetro"
          className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-border bg-background hover:bg-accent transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={skip}
          aria-label="Avançar"
          className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-border bg-background hover:bg-accent transition-colors"
        >
          <SkipForward className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
