import { PASSAGES, QUESTIONS, type BankQuestion, type Passage } from "./bank";
import type { ReadingLevel, SkillId } from "./skills";
import type { Progress } from "./progress";

export type TrainingSession = {
  passage: Passage;
  questions: BankQuestion[];
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function questionsFor(passageId: string): BankQuestion[] {
  return QUESTIONS.filter((q) => q.passageId === passageId);
}


export function pickPassage(opts: {
  progress: Progress;
  level?: ReadingLevel;
  skill?: SkillId | null;
}): Passage {
  const { progress, level, skill } = opts;
  const target = level ?? progress.currentLevel;

  let candidates = PASSAGES.filter((p) => p.nivel === target);

  if (skill) {
    const withSkill = candidates.filter((p) =>
      questionsFor(p.id).some((q) => q.habilidade === skill),
    );
    if (withSkill.length) candidates = withSkill;
    else {
      const anyLevel = PASSAGES.filter((p) =>
        questionsFor(p.id).some((q) => q.habilidade === skill),
      );
      if (anyLevel.length) candidates = anyLevel;
    }
  }

  if (!candidates.length) {
    // aproxima o nível mais próximo disponível
    candidates = [...PASSAGES].sort(
      (a, b) => Math.abs(a.nivel - target) - Math.abs(b.nivel - target),
    );
  }

  const recent = progress.history.slice(-3).map((h) => h.passageId);
  const unseen = candidates.filter((p) => !recent.includes(p.id));
  const pool = unseen.length ? unseen : candidates;
  return shuffle(pool)[0];
}

export function buildSession(opts: {
  progress: Progress;
  level?: ReadingLevel;
  skill?: SkillId | null;
}): TrainingSession {
  const passage = pickPassage(opts);
  const qs = questionsFor(passage.id);
  const ordered = opts.skill
    ? [...qs].sort((a, b) => (b.habilidade === opts.skill ? 1 : 0) - (a.habilidade === opts.skill ? 1 : 0))
    : qs;
  return { passage, questions: ordered };
}


