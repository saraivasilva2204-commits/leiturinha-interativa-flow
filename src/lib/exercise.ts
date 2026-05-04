export type Difficulty = "facil" | "medio" | "dificil";

export type StoryItem = {
  agent: string;
  action: string;
  environment: string;
  means: string;
  effect: string;
  text: string;
  difficulty: Difficulty;
};

export type QuestionField = "agent" | "action" | "environment" | "means" | "effect";

export type Question = {
  id: string;
  storyIndex: number;
  field: QuestionField;
  prompt: string;
  options: string[];
  correctIndex: number;
};

type Theme = {
  name: string;
  agents: string[];
  actions: string[];
  environments: string[];
  means: string[];
  effects: string[];
};

const themes: Theme[] = [
  {
    name: "ciencia",
    agents: ["uma pesquisadora", "um cientista jovem", "uma bióloga curiosa", "um engenheiro atento"],
    actions: ["analisava amostras raras", "testava uma nova hipótese", "mapeava sinais incomuns", "documentava reações químicas"],
    environments: ["um laboratório silencioso", "uma sala de experimentos iluminada", "um centro de pesquisa subterrâneo", "um observatório isolado"],
    means: ["usando algoritmos avançados", "com microscópios de alta precisão", "por meio de simulações computacionais", "através de sensores sensíveis"],
    effects: ["o que revelou um padrão inédito", "resultando em uma descoberta inesperada", "o que mudou toda a investigação", "abrindo caminho para uma nova teoria"],
  },
  {
    name: "escola",
    agents: ["uma professora dedicada", "um estudante distraído", "uma aluna criativa", "um bibliotecário paciente"],
    actions: ["organizava materiais antigos", "revisava anotações esquecidas", "preparava uma aula diferente", "buscava um livro raro"],
    environments: ["uma biblioteca silenciosa", "uma sala de aula vazia", "um corredor empoeirado", "um auditório iluminado"],
    means: ["com a ajuda de fichas coloridas", "seguindo um método antigo", "usando um caderno detalhado", "com atenção minuciosa"],
    effects: ["o que despertou novas ideias", "resultando em uma lição memorável", "que mudou sua percepção da matéria", "criando uma conexão inesperada"],
  },
  {
    name: "tecnologia",
    agents: ["um desenvolvedor focado", "uma designer atenta", "um analista experiente", "uma programadora inquieta"],
    actions: ["depurava um sistema complexo", "redesenhava uma interface", "monitorava sinais de rede", "automatizava tarefas repetitivas"],
    environments: ["um escritório minimalista", "uma sala servidor refrigerada", "um coworking movimentado", "um estúdio criativo"],
    means: ["com scripts personalizados", "por meio de inteligência artificial", "usando ferramentas de monitoramento", "através de testes automatizados"],
    effects: ["o que otimizou o processo", "resultando em uma falha crítica corrigida", "que economizou horas de trabalho", "expondo uma vulnerabilidade oculta"],
  },
  {
    name: "misterio",
    agents: ["um detetive observador", "uma jornalista cética", "um arqueólogo veterano", "uma investigadora discreta"],
    actions: ["seguia uma pista esquecida", "decifrava um manuscrito antigo", "examinava uma cena obscura", "rastreava um som distante"],
    environments: ["uma mansão abandonada", "uma vila enevoada", "um sótão empoeirado", "uma rua deserta ao amanhecer"],
    means: ["com uma lanterna pequena", "guiado por anotações cifradas", "usando um mapa rasgado", "através de pistas sutis"],
    effects: ["o que revelou uma verdade oculta", "levando a uma reviravolta surpreendente", "que mudou o rumo do caso", "expondo um segredo guardado por anos"],
  },
  {
    name: "cotidiano",
    agents: ["uma padeira madrugadora", "um músico de rua", "uma jardineira tranquila", "um entregador apressado"],
    actions: ["preparava uma receita especial", "ensaiava uma melodia nova", "cuidava de plantas raras", "organizava entregas do dia"],
    environments: ["uma cozinha aconchegante", "uma praça movimentada", "um jardim ensolarado", "um galpão organizado"],
    means: ["com ingredientes selecionados", "usando um instrumento antigo", "com ferramentas próprias", "seguindo uma rota cuidadosa"],
    effects: ["o que encantou os clientes", "atraindo uma pequena multidão", "resultando em flores únicas", "garantindo um dia produtivo"],
  },
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const difficultyOrder: Difficulty[] = ["facil", "medio", "dificil"];

function buildText(s: Omit<StoryItem, "text" | "difficulty">, difficulty: Difficulty): string {
  // Light variation in connectors based on difficulty
  if (difficulty === "facil") {
    return `${cap(s.agent)} ${s.action} em ${s.environment}, ${s.means}, ${s.effect}.`;
  }
  if (difficulty === "medio") {
    return `Em ${s.environment}, ${s.agent} ${s.action} ${s.means}, ${s.effect}.`;
  }
  return `${cap(s.agent)}, em ${s.environment}, ${s.action} ${s.means} — ${s.effect}.`;
}

function cap(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateStories(count = 3): StoryItem[] {
  const usedThemes = new Set<string>();
  const stories: StoryItem[] = [];

  for (let i = 0; i < count; i++) {
    let theme: Theme;
    do {
      theme = pickRandom(themes);
    } while (usedThemes.has(theme.name) && usedThemes.size < themes.length);
    usedThemes.add(theme.name);

    const difficulty = difficultyOrder[Math.min(i, difficultyOrder.length - 1)];

    const base = {
      agent: pickRandom(theme.agents),
      action: pickRandom(theme.actions),
      environment: pickRandom(theme.environments),
      means: pickRandom(theme.means),
      effect: pickRandom(theme.effects),
    };

    stories.push({
      ...base,
      difficulty,
      text: buildText(base, difficulty),
    });
  }

  return stories;
}

const fieldPrompts: Record<QuestionField, (i: number) => string> = {
  agent: (i) => `Quem era o agente do texto ${i + 1}?`,
  action: (i) => `O que o agente fez no texto ${i + 1}?`,
  environment: (i) => `Onde se passava o texto ${i + 1}?`,
  means: (i) => `Qual foi o meio utilizado no texto ${i + 1}?`,
  effect: (i) => `Qual foi o efeito final no texto ${i + 1}?`,
};

function distractorPool(field: QuestionField, exclude: string[]): string[] {
  const pool: string[] = [];
  themes.forEach((t) => {
    const arr =
      field === "agent" ? t.agents :
      field === "action" ? t.actions :
      field === "environment" ? t.environments :
      field === "means" ? t.means :
      t.effects;
    arr.forEach((v) => {
      if (!exclude.includes(v)) pool.push(v);
    });
  });
  return pool;
}

function buildOptions(correct: string, pool: string[]): { options: string[]; idx: number } {
  const wrong = shuffle(pool).slice(0, 3);
  const options = shuffle([correct, ...wrong]);
  return { options, idx: options.indexOf(correct) };
}

export function generateQuestions(stories: StoryItem[]): Question[] {
  // Rotate through the 5 fields so each story exercises a different element.
  const fields: QuestionField[] = ["agent", "environment", "means", "action", "effect"];
  const questions: Question[] = [];

  stories.forEach((story, i) => {
    const field = fields[i % fields.length];
    const correct = story[field];
    const allValuesUsed = stories.map((s) => s[field]);
    const { options, idx } = buildOptions(correct, distractorPool(field, allValuesUsed));
    questions.push({
      id: `q-${i}-${field}`,
      storyIndex: i,
      field,
      prompt: fieldPrompts[field](i),
      options,
      correctIndex: idx,
    });
  });

  // Add 2 extra cross-questions on different fields for depth
  const extraFields: QuestionField[] = ["effect", "means"];
  extraFields.forEach((field, k) => {
    const storyIndex = (k + 1) % stories.length;
    const story = stories[storyIndex];
    const correct = story[field];
    const allValuesUsed = stories.map((s) => s[field]);
    const { options, idx } = buildOptions(correct, distractorPool(field, allValuesUsed));
    questions.push({
      id: `q-extra-${storyIndex}-${field}-${k}`,
      storyIndex,
      field,
      prompt: fieldPrompts[field](storyIndex),
      options,
      correctIndex: idx,
    });
  });

  return questions;
}

export function motivationalMessage(score: number, total: number): string {
  const ratio = score / total;
  if (ratio === 1) return "Memória afiada! Você capturou cada detalhe. 🌟";
  if (ratio >= 0.8) return "Excelente leitura! Sua atenção está em alta. 🚀";
  if (ratio >= 0.6) return "Bom trabalho! Mais uma rodada e você destrava de vez. 💪";
  if (ratio >= 0.4) return "Você está no caminho. Releia com calma e tente de novo. 🌱";
  return "Sem pressa — voltar é parte do treino. Vamos de novo! ✨";
}

export type PerformanceAnalysis = {
  insights: string[];
};

export function analyzePerformance(params: {
  score: number;
  total: number;
  readingTimes: number[];
  answerTimes: number[];
}): PerformanceAnalysis {
  const { score, total, readingTimes, answerTimes } = params;
  const insights: string[] = [];
  const ratio = score / total;
  const avgRead = readingTimes.reduce((a, b) => a + b, 0) / Math.max(readingTimes.length, 1);
  const avgAns = answerTimes.reduce((a, b) => a + b, 0) / Math.max(answerTimes.length, 1);

  // Reading speed heuristics (per text)
  if (avgRead < 6000 && ratio < 0.7) {
    insights.push("Boa memória, mas leitura rápida demais pode ter afetado sua precisão.");
  } else if (avgRead > 18000 && ratio >= 0.8) {
    insights.push("Leitura cuidadosa: sua atenção aos detalhes garantiu uma ótima retenção.");
  } else if (ratio >= 0.8) {
    insights.push("Ótima retenção de detalhes — equilíbrio entre tempo e precisão.");
  }

  if (avgAns < 3500 && ratio >= 0.7) {
    insights.push("Respostas rápidas e precisas — sinal de leitura ativa.");
  } else if (avgAns > 12000) {
    insights.push("Você ponderou bastante cada pergunta. Confie mais na primeira impressão.");
  }

  if (ratio < 0.5) {
    insights.push("Tente reler buscando os 5 elementos: agente, ação, ambiente, meio e efeito.");
  }

  if (insights.length === 0) {
    insights.push("Desempenho consistente. Continue treinando para subir o nível.");
  }

  return { insights };
}
