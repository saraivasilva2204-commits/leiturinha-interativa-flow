import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { StoryItem } from "@/lib/exercise";

type Props = {
  stories: StoryItem[];
  onFinish: (timesMs: number[]) => void;
};

export function ReadingScreen({ stories, onFinish }: Props) {
  const [index, setIndex] = useState(0);
  const [times, setTimes] = useState<number[]>([]);
  const startRef = useRef<number>(performance.now());

  useEffect(() => {
    startRef.current = performance.now();
  }, [index]);

  const handleNext = () => {
    const elapsed = performance.now() - startRef.current;
    const newTimes = [...times, elapsed];
    setTimes(newTimes);
    if (index + 1 >= stories.length) {
      onFinish(newTimes);
    } else {
      setIndex(index + 1);
    }
  };

  const story = stories[index];
  const isLast = index === stories.length - 1;
  const progress = ((index + 1) / stories.length) * 100;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Texto {index + 1} / {stories.length}
        </span>
        <div className="flex gap-1.5" aria-hidden="true">
          {stories.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-8 rounded-full transition-all duration-500 ${
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

      <article
        key={index}
        className="animate-scale-in min-h-[180px] flex items-center"
      >
        <p className="font-display text-3xl sm:text-4xl leading-[1.35] text-foreground">
          {story.text}
        </p>
      </article>

      <div className="mt-12 flex items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground max-w-xs">
          Leia com atenção. Você não poderá voltar a este texto.
        </p>
        <Button onClick={handleNext} variant="hero" size="lg">
          {isLast ? "Ir para perguntas" : "Próximo texto"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
