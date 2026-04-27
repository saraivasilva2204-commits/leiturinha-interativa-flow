import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Logo } from "@/components/destrava/Logo";
import { IntroScreen } from "@/components/destrava/IntroScreen";
import { ReadingScreen } from "@/components/destrava/ReadingScreen";
import { QuestionsScreen } from "@/components/destrava/QuestionsScreen";
import { FeedbackScreen } from "@/components/destrava/FeedbackScreen";
import { Chatbot } from "@/components/destrava/Chatbot";
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
  const [times, setTimes] = useState<number[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);

  const stories: StoryItem[] = useMemo(() => generateStories(3), [seed]);
  const questions: Question[] = useMemo(() => generateQuestions(stories), [stories]);

  const restart = () => {
    setTimes([]);
    setAnswers([]);
    setSeed((s) => s + 1);
    setPhase("intro");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-5 sm:px-8 py-5 flex items-center justify-between max-w-5xl mx-auto w-full">
        <Logo />
        {phase !== "intro" && (
          <button
            onClick={restart}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Reiniciar
          </button>
        )}
      </header>

      <main className="flex-1 flex items-center justify-center px-5 sm:px-8 py-8">
        <section
          className="w-full max-w-2xl rounded-3xl border border-border bg-card/70 backdrop-blur-xl shadow-card p-6 sm:p-10 md:p-12"
          aria-live="polite"
        >
          {phase === "intro" && <IntroScreen onStart={() => setPhase("reading")} />}
          {phase === "reading" && (
            <ReadingScreen
              stories={stories}
              onFinish={(t) => {
                setTimes(t);
                setPhase("questions");
              }}
            />
          )}
          {phase === "questions" && (
            <QuestionsScreen
              questions={questions}
              onSubmit={(a) => {
                setAnswers(a);
                setPhase("feedback");
              }}
            />
          )}
          {phase === "feedback" && (
            <FeedbackScreen
              questions={questions}
              answers={answers}
              times={times}
              onRestart={restart}
            />
          )}
        </section>
      </main>

      <footer className="px-5 sm:px-8 py-6 text-center text-xs text-muted-foreground">
        Feito com foco em leitura ativa · DESTRAVAÊ
      </footer>

      <Chatbot />
    </div>
  );
}
