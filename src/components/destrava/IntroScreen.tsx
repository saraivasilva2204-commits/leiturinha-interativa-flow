import { Button } from "@/components/ui/button";
import {
  FileText,
  HelpCircle,
  Timer,
  BookOpen,
  Brain,
  CheckCircle2,
  Trophy,
  Flame,
  Star,
  TrendingUp,
} from "lucide-react";

export function IntroScreen({ onStart }: { onStart: () => void }) {
  const features = [
    { icon: FileText, label: "Textos" },
    { icon: HelpCircle, label: "Perguntas" },
    { icon: Timer, label: "Cronometrado" },
  ];

  const steps = [
    {
      icon: BookOpen,
      title: "Leia",
      desc: "Leia textos cuidadosamente selecionados.",
    },
    {
      icon: HelpCircle,
      title: "Responda",
      desc: "Teste sua compreensão com perguntas.",
    },
    {
      icon: Brain,
      title: "Evolua",
      desc: "Desenvolva foco, interpretação e raciocínio.",
    },
  ];

  const benefits = [
    "Melhora a interpretação de texto",
    "Aumenta a concentração",
    "Desenvolve pensamento crítico",
    "Estimula a memória",
    "Fortalece o raciocínio lógico",
  ];

  const gamification = [
    { icon: Trophy, label: "Pontuação", value: "—" },
    { icon: Flame, label: "Sequência", value: "0 dias" },
    { icon: Star, label: "XP acumulado", value: "0 XP" },
    { icon: TrendingUp, label: "Evolução", value: "Em breve" },
  ];

  return (
    <div className="animate-slide-up w-full">
      {/* HERO */}
      <section className="relative text-center pt-6 pb-20">
        {/* Radial glow behind the title */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 flex items-start justify-center"
        >
          <div
            className="h-[520px] w-[520px] max-w-[90vw] rounded-full opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--primary) 14%, transparent) 0%, transparent 65%)",
            }}
          />
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight mb-10">
          Treine sua mente <br />
          através da <span className="text-gradient">leitura</span>
        </h1>

        <Button
          size="lg"
          variant="hero"
          onClick={onStart}
          aria-label="Começar agora"
        >
          Começar agora
        </Button>

        {/* Feature cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {features.map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              onClick={onStart}
              className="group rounded-2xl border border-primary/10 bg-white px-5 py-5 flex items-center gap-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-soft focus-visible:-translate-y-0.5 focus-visible:shadow-soft"
            >
              <span className="h-10 w-10 rounded-full bg-accent flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary/15">
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </span>
              <p className="font-medium text-foreground text-[15px]">{label}</p>
            </button>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-12">
          Como funciona
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {steps.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-primary/10 bg-white p-7 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft hover:border-primary/20"
            >
              <span className="h-11 w-11 rounded-full bg-accent flex items-center justify-center mb-5">
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </span>
              <h3 className="font-display text-xl font-semibold mb-2">
                {title}
              </h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-12">
          Por que treinar sua leitura?
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left">
          {benefits.map((b) => (
            <li
              key={b}
              className="flex items-center gap-3 rounded-xl border border-primary/10 bg-white px-5 py-4"
            >
              <CheckCircle2
                className="h-5 w-5 text-primary shrink-0"
                aria-hidden="true"
              />
              <span className="text-foreground text-[15px]">{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* GAMIFICATION PREVIEW */}
      <section className="py-20 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
          Sua evolução, gamificada
        </h2>
        <p className="text-muted-foreground mb-12 max-w-xl mx-auto">
          Em breve: acompanhe seu progresso e mantenha o ritmo dos seus
          treinos.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {gamification.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-2xl border border-primary/10 bg-white p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
            >
              <span className="h-9 w-9 rounded-full bg-accent flex items-center justify-center mb-4">
                <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
              </span>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                {label}
              </p>
              <p className="font-display text-lg font-semibold text-foreground">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <Button
            size="lg"
            variant="hero"
            onClick={onStart}
            aria-label="Começar agora"
          >
            Começar agora
          </Button>
        </div>
      </section>
    </div>
  );
}
