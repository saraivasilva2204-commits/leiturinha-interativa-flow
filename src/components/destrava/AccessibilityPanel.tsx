import { useEffect, useState } from "react";
import { Accessibility, X, Type, AlignJustify, Sun, Moon, BookOpen } from "lucide-react";

type Theme = "light" | "sepia" | "dark";
type Spacing = "normal" | "relaxed" | "loose";
type FontMode = "default" | "dyslexic";

type Settings = {
  theme: Theme;
  spacing: Spacing;
  font: FontMode;
  fontScale: number; // 0.9 - 1.4
};

const STORAGE_KEY = "destrava:a11y";

const DEFAULTS: Settings = {
  theme: "light",
  spacing: "normal",
  font: "default",
  fontScale: 1,
};

function loadSettings(): Settings {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

function applySettings(s: Settings) {
  const root = document.documentElement;
  root.dataset.theme = s.theme;
  root.dataset.spacing = s.spacing;
  root.dataset.font = s.font;
  root.style.setProperty("--a11y-font-scale", String(s.fontScale));
}

export function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  useEffect(() => {
    const s = loadSettings();
    setSettings(s);
    applySettings(s);
  }, []);

  const update = (patch: Partial<Settings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    applySettings(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const reset = () => {
    setSettings(DEFAULTS);
    applySettings(DEFAULTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="Abrir opções de acessibilidade"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 left-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90 transition"
      >
        <Accessibility className="h-5 w-5" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Acessibilidade"
          className="fixed bottom-20 left-5 z-50 w-[min(92vw,320px)] rounded-2xl border border-border bg-popover text-popover-foreground p-4 shadow-xl animate-fade-in"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold">Acessibilidade</h2>
            <button
              type="button"
              aria-label="Fechar"
              onClick={() => setOpen(false)}
              className="rounded-md p-1 hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <Section icon={<Type className="h-4 w-4" />} label="Fonte">
            <SegBtn active={settings.font === "default"} onClick={() => update({ font: "default" })}>
              Padrão
            </SegBtn>
            <SegBtn
              active={settings.font === "dyslexic"}
              onClick={() => update({ font: "dyslexic" })}
            >
              OpenDyslexic
            </SegBtn>
          </Section>

          <Section icon={<Type className="h-4 w-4" />} label={`Zoom\u00A0(${Math.round(settings.fontScale * 100)}%)`}>
            <input
              type="range"
              min={0.9}
              max={1.4}
              step={0.05}
              value={settings.fontScale}
              onChange={(e) => update({ fontScale: Number(e.target.value) })}
              className="w-full accent-[var(--primary)]"
              aria-label="Tamanho do texto"
            />
          </Section>

          <Section icon={<AlignJustify className="h-4 w-4" />} label="Espaçamento">
            <SegBtn active={settings.spacing === "normal"} onClick={() => update({ spacing: "normal" })}>
              Normal
            </SegBtn>
            <SegBtn active={settings.spacing === "relaxed"} onClick={() => update({ spacing: "relaxed" })}>
              Relax.
            </SegBtn>
            <SegBtn active={settings.spacing === "loose"} onClick={() => update({ spacing: "loose" })}>
              Amplo
            </SegBtn>
          </Section>

          <Section icon={<Sun className="h-4 w-4" />} label="Tema">
            <SegBtn active={settings.theme === "light"} onClick={() => update({ theme: "light" })}>
              <Sun className="h-3.5 w-3.5" /> Claro
            </SegBtn>
            <SegBtn active={settings.theme === "sepia"} onClick={() => update({ theme: "sepia" })}>
              <BookOpen className="h-3.5 w-3.5" /> Sépia
            </SegBtn>
            <SegBtn active={settings.theme === "dark"} onClick={() => update({ theme: "dark" })}>
              <Moon className="h-3.5 w-3.5" /> Noturno
            </SegBtn>
          </Section>

          <button
            type="button"
            onClick={reset}
            className="mt-2 w-full text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
          >
            Restaurar padrões
          </button>
        </div>
      )}
    </>
  );
}

function Section({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1.5">
        {icon}
        <span>{label}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function SegBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-medium transition ${
        active
          ? "bg-primary text-primary-foreground border-transparent"
          : "bg-card text-foreground border-border hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}
