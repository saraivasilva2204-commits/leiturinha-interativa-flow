export type StoryItem = {
  agent: string;
  environment: string;
  action: string;
  text: string;
};

export type Question = {
  id: string;
  storyIndex: number;
  prompt: string;
  options: string[];
  correctIndex: number;
  field: "agent" | "environment" | "action";
};

const agents = [
  "estudante", "bibliotecária", "viajante", "pintor", "cientista",
  "padeira", "menino curioso", "astrônoma", "jardineiro", "escritora",
  "marinheiro", "fotógrafa", "professor", "detetive", "arqueóloga",
];

const environments = [
  "uma biblioteca silenciosa",
  "um vagão de trem ao amanhecer",
  "um café antigo no centro da cidade",
  "uma trilha cercada por pinheiros",
  "um sótão empoeirado",
  "uma praia ao entardecer",
  "uma estação espacial abandonada",
  "um mercado movimentado",
  "uma floresta enevoada",
  "um observatório no alto da montanha",
  "uma livraria escondida",
  "um jardim secreto",
];

const actions = [
  "investigar um livro misterioso",
  "abrir uma carta esquecida",
  "seguir um som distante",
  "fotografar uma luz estranha",
  "anotar uma ideia repentina",
  "resolver um antigo enigma",
  "decifrar um mapa rasgado",
  "conversar com um desconhecido",
  "tocar uma melodia esquecida",
  "guardar uma chave dourada",
  "desenhar o que via pela janela",
  "voltar pelo mesmo caminho",
];

function pick<T>(list: T[], used: Set<string>): T {
  let item: T;
  let key: string;
  do {
    item = list[Math.floor(Math.random() * list.length)];
    key = String(item);
  } while (used.has(key));
  used.add(key);
  return item;
}

export function generateStories(count = 3): StoryItem[] {
  const usedA = new Set<string>();
  const usedE = new Set<string>();
  const usedAct = new Set<string>();

  return Array.from({ length: count }, () => {
    const agent = pick(agents, usedA);
    const environment = pick(environments, usedE);
    const action = pick(actions, usedAct);
    const article = /^[aeiouáéíóú]/i.test(agent) ? "Um(a)" : "Um(a)";
    return {
      agent,
      environment,
      action,
      text: `${article} ${agent} estava em ${environment} quando decidiu ${action}.`,
    };
  });
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateQuestions(stories: StoryItem[]): Question[] {
  const allAgents = stories.map((s) => s.agent);
  const allEnvs = stories.map((s) => s.environment);
  const allActions = stories.map((s) => s.action);

  const distractors = {
    agent: agents.filter((a) => !allAgents.includes(a)),
    environment: environments.filter((e) => !allEnvs.includes(e)),
    action: actions.filter((a) => !allActions.includes(a)),
  };

  const buildOptions = (correct: string, pool: string[]): { options: string[]; idx: number } => {
    const wrong = shuffle(pool).slice(0, 3);
    const options = shuffle([correct, ...wrong]);
    return { options, idx: options.indexOf(correct) };
  };

  const templates: Array<{ field: Question["field"]; prompt: (i: number) => string }> = [
    { field: "agent", prompt: (i) => `Quem era o(a) personagem do texto ${i + 1}?` },
    { field: "environment", prompt: (i) => `Onde se passava o texto ${i + 1}?` },
    { field: "action", prompt: (i) => `Qual ação foi realizada no texto ${i + 1}?` },
  ];

  const questions: Question[] = [];
  stories.forEach((story, i) => {
    const t = templates[i % templates.length];
    const correct = story[t.field];
    const { options, idx } = buildOptions(correct, distractors[t.field]);
    questions.push({
      id: `q-${i}-${t.field}`,
      storyIndex: i,
      prompt: t.prompt(i),
      options,
      correctIndex: idx,
      field: t.field,
    });
  });

  // 2 perguntas extras cruzando histórias
  const extras: Array<{ field: Question["field"]; storyIndex: number; prompt: string }> = [
    { field: "environment", storyIndex: 0, prompt: "Em que ambiente acontecia o primeiro texto?" },
    { field: "action", storyIndex: stories.length - 1, prompt: "Qual foi a ação do último texto?" },
  ];

  extras.forEach((e) => {
    const story = stories[e.storyIndex];
    const correct = story[e.field];
    const { options, idx } = buildOptions(correct, distractors[e.field]);
    questions.push({
      id: `q-extra-${e.storyIndex}-${e.field}`,
      storyIndex: e.storyIndex,
      prompt: e.prompt,
      options,
      correctIndex: idx,
      field: e.field,
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
