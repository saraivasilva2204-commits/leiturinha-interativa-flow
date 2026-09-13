export type SkillId =
  | "explicita"
  | "ideia_principal"
  | "inferencia"
  | "causa_consequencia"
  | "vocabulario"
  | "sequencia"
  | "fato_opiniao"
  | "intencao"
  | "critica"
  | "aplicacao";

export const SKILLS: { id: SkillId; label: string; short: string }[] = [
  { id: "explicita", label: "Informação explícita", short: "Explícita" },
  { id: "ideia_principal", label: "Ideia principal", short: "Ideia principal" },
  { id: "inferencia", label: "Inferência", short: "Inferência" },
  { id: "causa_consequencia", label: "Causa e consequência", short: "Causa e efeito" },
  { id: "vocabulario", label: "Vocabulário no contexto", short: "Vocabulário" },
  { id: "sequencia", label: "Sequência de acontecimentos", short: "Sequência" },
  { id: "fato_opiniao", label: "Fato e opinião", short: "Fato/opinião" },
  { id: "intencao", label: "Intenção do autor", short: "Intenção" },
  { id: "critica", label: "Interpretação crítica", short: "Crítica" },
  { id: "aplicacao", label: "Aplicação prática", short: "Aplicação" },
];

export const SKILL_LABEL: Record<SkillId, string> = SKILLS.reduce(
  (acc, s) => ({ ...acc, [s.id]: s.label }),
  {} as Record<SkillId, string>,
);

export type ReadingLevel = 1 | 2 | 3 | 4 | 5;

export const LEVELS: { nivel: ReadingLevel; nome: string; descricao: string }[] = [
  {
    nivel: 1,
    nome: "Compreensão literal",
    descricao: "Localizar informações que estão escritas no texto.",
  },
  {
    nivel: 2,
    nome: "Inferência",
    descricao: "Descobrir o que o texto sugere sem dizer diretamente.",
  },
  {
    nivel: 3,
    nome: "Interpretação",
    descricao: "Identificar a ideia principal e o sentido das expressões.",
  },
  {
    nivel: 4,
    nome: "Leitura crítica",
    descricao: "Separar fato de opinião e analisar argumentos.",
  },
  {
    nivel: 5,
    nome: "Aplicação ao cotidiano",
    descricao: "Usar a leitura em situações reais do dia a dia.",
  },
];

export type Mastery = {
  label: string;
  tone: "excelente" | "bom" | "desenvolvimento" | "praticar" | "iniciante";
  emoji: string;
};

export function masteryFor(accuracy: number | null): Mastery {
  if (accuracy === null) return { label: "Ainda não treinado", tone: "iniciante", emoji: "⚪" };
  if (accuracy >= 0.9) return { label: "Excelente", tone: "excelente", emoji: "🟢" };
  if (accuracy >= 0.75) return { label: "Bom", tone: "bom", emoji: "🟢" };
  if (accuracy >= 0.6) return { label: "Em desenvolvimento", tone: "desenvolvimento", emoji: "🟡" };
  if (accuracy >= 0.4) return { label: "Vamos praticar", tone: "praticar", emoji: "🟠" };
  return { label: "Começando", tone: "iniciante", emoji: "🔴" };
}
