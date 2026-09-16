import { SKILLS, type ReadingLevel, type SkillId } from "./skills";

export type SkillStat = { correct: number; total: number };

export type SessionRecord = {
  date: string; // ISO
  passageId: string;
  score: number;
  total: number;
  level: ReadingLevel;
  hintsUsed: number;
  readingMs: number;
  answerMs: number;
  skills: { skill: SkillId; correct: boolean }[];
};

export type Progress = {
  xp: number;
  streak: number;
  lastDay: string | null; // YYYY-MM-DD
  skills: Record<string, SkillStat>;
  history: SessionRecord[];
  achievements: string[];
  currentLevel: ReadingLevel;
};

const KEY = "destravae:progress:v1";

export const EMPTY_PROGRESS: Progress = {
  xp: 0,
  streak: 0,
  lastDay: null,
  skills: {},
  history: [],
  achievements: [],
  currentLevel: 1,
};

export function loadProgress(): Progress {
  if (typeof window === "undefined") return EMPTY_PROGRESS;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY_PROGRESS;
    return { ...EMPTY_PROGRESS, ...(JSON.parse(raw) as Progress) };
  } catch {
    return EMPTY_PROGRESS;
  }
}

export function saveProgress(p: Progress) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* storage cheio ou bloqueado */
  }
}

function dayKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

/** Nível de jogador (não confundir com nível de leitura). 120 XP por nível. */
export function playerLevel(xp: number) {
  const level = Math.floor(xp / 120) + 1;
  const into = xp % 120;
  return { level, into, needed: 120, pct: (into / 120) * 100 };
}

export const ACHIEVEMENTS: { id: string; label: string; description: string; emoji: string }[] = [
  { id: "primeiro-treino", label: "Primeiro passo", description: "Concluiu o primeiro treino.", emoji: "🚀" },
  { id: "sem-erros", label: "Perfeito", description: "Acertou todas as perguntas de um treino.", emoji: "🎯" },
  { id: "sem-dicas", label: "Por conta própria", description: "Terminou um treino sem usar dicas.", emoji: "🧠" },
  { id: "cinco-treinos", label: "Constância", description: "Concluiu 5 treinos.", emoji: "📚" },
  { id: "sequencia-3", label: "Três dias seguidos", description: "Treinou por 3 dias seguidos.", emoji: "🔥" },
  { id: "leitor-critico", label: "Leitor crítico", description: "Acertou 5 perguntas de leitura crítica.", emoji: "🧐" },
  { id: "nivel-5", label: "Chegou ao topo", description: "Concluiu um treino de nível 5.", emoji: "🏔️" },
];

export function accuracyFor(p: Progress, skill: SkillId): number | null {
  const s = p.skills[skill];
  if (!s || s.total === 0) return null;
  return s.correct / s.total;
}

export function recordSession(prev: Progress, rec: SessionRecord): Progress {
  const skills = { ...prev.skills };
  rec.skills.forEach(({ skill, correct }) => {
    const cur = skills[skill] ?? { correct: 0, total: 0 };
    skills[skill] = { correct: cur.correct + (correct ? 1 : 0), total: cur.total + 1 };
  });

  const today = dayKey();
  let streak = prev.streak;
  if (prev.lastDay !== today) {
    const yesterday = dayKey(new Date(Date.now() - 86400000));
    streak = prev.lastDay === yesterday ? prev.streak + 1 : 1;
  }
  if (streak === 0) streak = 1;

  const xpGain = rec.score * 10 + (rec.score === rec.total ? 20 : 0) - rec.hintsUsed * 2;
  const xp = Math.max(0, prev.xp + xpGain);

  const history = [...prev.history, rec].slice(-50);

  // Nível de leitura sobe quando o desempenho é alto; desce quando é muito baixo.
  const ratio = rec.score / Math.max(rec.total, 1);
  let currentLevel = prev.currentLevel;
  if (ratio >= 0.8 && currentLevel < 5) currentLevel = (currentLevel + 1) as ReadingLevel;
  else if (ratio < 0.4 && currentLevel > 1) currentLevel = (currentLevel - 1) as ReadingLevel;

  const achievements = new Set(prev.achievements);
  achievements.add("primeiro-treino");
  if (rec.score === rec.total) achievements.add("sem-erros");
  if (rec.hintsUsed === 0) achievements.add("sem-dicas");
  if (history.length >= 5) achievements.add("cinco-treinos");
  if (streak >= 3) achievements.add("sequencia-3");
  if (rec.level === 5) achievements.add("nivel-5");
  const critica = skills["critica"];
  if (critica && critica.correct >= 5) achievements.add("leitor-critico");

  return {
    xp,
    streak,
    lastDay: today,
    skills,
    history,
    achievements: [...achievements],
    currentLevel,
  };
}

/** Habilidade mais fraca (com dados) — usada para recomendar o próximo treino. */
export function weakestSkill(p: Progress): SkillId | null {
  let worst: { id: SkillId; acc: number } | null = null;
  SKILLS.forEach((s) => {
    const acc = accuracyFor(p, s.id);
    if (acc === null) return;
    const current: { id: SkillId; acc: number } | null = worst;
    if (!current || acc < current.acc) worst = { id: s.id, acc };
  });
  return worst ? (worst as { id: SkillId; acc: number }).id : null;
}

export function untrainedSkill(p: Progress): SkillId | null {
  const s = SKILLS.find((sk) => accuracyFor(p, sk.id) === null);
  return s ? s.id : null;
}
