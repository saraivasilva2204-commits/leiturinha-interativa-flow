import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/destrava/SiteHeader";
import { RecommendedTraining } from "@/components/destrava/RecommendedTraining";
import { IntroScreen } from "@/components/destrava/IntroScreen";
import { ReadingScreen } from "@/components/destrava/ReadingScreen";
import { QuestionsScreen } from "@/components/destrava/QuestionsScreen";
import { FeedbackScreen } from "@/components/destrava/FeedbackScreen";
import { AccessibilityPanel } from "@/components/destrava/AccessibilityPanel";
import { PhaseTransition } from "@/components/destrava/PhaseTransition";
import {
  generateQuestions,
  generateStories,
  type Question,
  type StoryItem,
} from "@/lib/exercise";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DESTRAVAÊ — Treine sua mente através da leitura" },
      {
        name: "description",
        content:
          "Exercício cognitivo de leitura, memória e interpretação. Três textos, perguntas e feedback inteligente.",
      },
      { property: "og:title", content: "DESTRAVAÊ — Treine sua mente através da leitura" },
      {
        property: "og:description",
        content:
          "Plataforma educativa que estimula leitura ativa, memória e interpretação textual.",
      },
    ],
  }),
  component: Index,
});

type Phase = "intro" | "reading" | "questions" | "feedback";

function Index() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [seed, setSeed] = useState(0);
  const [readingTimes, setReadingTimes] = useState<number[]>([]);
  const [answerTimes, setAnswerTimes] = useState<number[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);

  const stories: StoryItem[] = useMemo(() => generateStories(3), [seed]);
  const questions: Question[] = useMemo(() => generateQuestions(stories), [stories]);

  const restart = () => {
    setReadingTimes([]);
    setAnswerTimes([]);
    setAnswers([]);
    setSeed((s) => s + 1);
    setPhase("intro");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main
        className="flex-1 flex items-center justify-center px-6 sm:px-12 py-12 w-full"
        aria-live="polite"
      >
        <div className="w-full max-w-3xl">
          <PhaseTransition phaseKey={phase + ":" + seed}>
          {phase === "intro" && (
            <>
              <IntroScreen onStart={() => setPhase("reading")} />
              <RecommendedTraining />
            </>
          )}
          {phase === "reading" && (
            <ReadingScreen
              stories={stories}
              onFinish={(t) => {
                setReadingTimes(t);
                setPhase("questions");
              }}
            />
          )}
          {phase === "questions" && (
            <QuestionsScreen
              questions={questions}
              onSubmit={(a, ts) => {
                setAnswers(a);
                setAnswerTimes(ts);
                setPhase("feedback");
              }}
            />
          )}
          {phase === "feedback" && (
            <FeedbackScreen
              questions={questions}
              answers={answers}
              readingTimes={readingTimes}
              answerTimes={answerTimes}
              onRestart={restart}
            />
          )}
          </PhaseTransition>
        </div>
      </main>

      {phase !== "intro" && (
        <button
          onClick={restart}
          className="fixed bottom-5 right-5 z-40 text-xs text-muted-foreground hover:text-foreground transition-colors bg-card/80 backdrop-blur border border-border rounded-full px-3 py-1.5 shadow-sm"
        >
          Reiniciar
        </button>
      )}

      <AccessibilityPanel />
    </div>
  );
}
