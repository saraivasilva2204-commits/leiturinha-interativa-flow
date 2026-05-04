export type Difficulty = "facil" | "medio" | "dificil";

export type StoryItem = {
  agentName: string;       // "Lucas"
  agentRole: string;       // "um estudante curioso de engenharia"
  agentFull: string;       // "Lucas, um estudante curioso de engenharia"
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

type Persona = { name: string; role: string };

type Theme = {
  name: string;
  personas: Persona[];
  actions: string[];
  environments: string[];
  means: string[];
  effects: string[];
};

const themes: Theme[] = [
  {
    name: "ciencia",
    personas: [
      { name: "Mariana", role: "uma bióloga marinha experiente" },
      { name: "Otávio", role: "um pesquisador iniciante de genética" },
      { name: "Helena", role: "uma astrônoma dedicada" },
      { name: "Bruno", role: "um químico veterano" },
    ],
    actions: [
      "analisava amostras de coral coletadas no fundo do mar",
      "comparava sequências de DNA suspeitas",
      "registrava o brilho de uma estrela recém-descoberta",
      "testava a reação de um novo composto",
    ],
    environments: [
      "no laboratório oceanográfico de Florianópolis",
      "na sala de sequenciamento do instituto Butantan",
      "no observatório de Pico dos Dias, em Minas Gerais",
      "em um laboratório climatizado da Unicamp",
    ],
    means: [
      "utilizando um microscópio eletrônico de alta resolução",
      "com o auxílio de um software de bioinformática",
      "por meio de um telescópio refletor de longo alcance",
      "manipulando reagentes em uma capela de exaustão",
    ],
    effects: [
      "o que levou à identificação de uma espécie inédita",
      "resultando na descoberta de uma mutação rara",
      "confirmando a existência de um sistema planetário próximo",
      "provocando uma reação em cadeia inesperada",
    ],
  },
  {
    name: "escola",
    personas: [
      { name: "Lucas", role: "um estudante curioso do ensino médio" },
      { name: "Beatriz", role: "uma professora de literatura recém-formada" },
      { name: "Camila", role: "uma bibliotecária paciente" },
      { name: "Diego", role: "um aluno aplicado do curso de história" },
    ],
    actions: [
      "revisava anotações para uma prova decisiva",
      "preparava uma aula sobre poesia modernista",
      "organizava livros raros em ordem cronológica",
      "transcrevia trechos de um manuscrito antigo",
    ],
    environments: [
      "na biblioteca central da universidade",
      "em uma sala de aula vazia ao final da tarde",
      "no acervo histórico do colégio municipal",
      "em uma cabine de estudos do segundo andar",
    ],
    means: [
      "com fichas resumo coloridas e marcadores",
      "utilizando uma apresentação de slides interativa",
      "consultando um catálogo digital especializado",
      "com o auxílio de uma lupa e um caderno detalhado",
    ],
    effects: [
      "o que garantiu uma nota acima da média na avaliação",
      "despertando o interesse dos alunos por autores brasileiros",
      "permitindo recuperar três obras dadas como perdidas",
      "revelando uma assinatura escondida nas margens do texto",
    ],
  },
  {
    name: "tecnologia",
    personas: [
      { name: "Rafael", role: "um jovem programador júnior" },
      { name: "Sofia", role: "uma analista de segurança da informação" },
      { name: "Vinícius", role: "um designer de produto sênior" },
      { name: "Larissa", role: "uma engenheira de dados experiente" },
    ],
    actions: [
      "depurava uma falha intermitente no sistema de pagamentos",
      "monitorava acessos suspeitos vindos do exterior",
      "redesenhava o fluxo de cadastro do aplicativo",
      "automatizava o processamento dos relatórios mensais",
    ],
    environments: [
      "em um escritório minimalista no centro de São Paulo",
      "na sala de monitoramento da empresa, à meia-noite",
      "em um estúdio de design iluminado por luz natural",
      "em uma sala de servidores refrigerada do data center",
    ],
    means: [
      "com a ajuda de logs estruturados e um depurador remoto",
      "utilizando um painel de inteligência de ameaças",
      "por meio de protótipos interativos no Figma",
      "executando scripts em Python agendados a cada hora",
    ],
    effects: [
      "o que reduziu o tempo de resposta do sistema pela metade",
      "bloqueando uma tentativa de invasão antes que causasse prejuízo",
      "aumentando em 40% a taxa de conclusão do cadastro",
      "economizando dois dias de trabalho manual por semana",
    ],
  },
  {
    name: "misterio",
    personas: [
      { name: "Inspetor Henrique", role: "um detetive observador da polícia civil" },
      { name: "Júlia", role: "uma jornalista investigativa cética" },
      { name: "Ricardo", role: "um arqueólogo veterano" },
      { name: "Tereza", role: "uma perita criminal discreta" },
    ],
    actions: [
      "examinava pegadas deixadas próximas a uma janela quebrada",
      "comparava depoimentos contraditórios de três testemunhas",
      "decifrava inscrições gravadas em uma placa de bronze",
      "coletava fragmentos de tecido encontrados na cena",
    ],
    environments: [
      "em uma mansão abandonada nos arredores de Petrópolis",
      "em uma redação silenciosa às três da manhã",
      "em um sítio arqueológico nas serras do Piauí",
      "em um beco estreito do centro histórico de Salvador",
    ],
    means: [
      "com o auxílio de uma lanterna ultravioleta",
      "cruzando informações em uma planilha detalhada",
      "utilizando um pincel fino e uma escova macia",
      "com pinças esterilizadas e sacos de evidência",
    ],
    effects: [
      "o que apontou um suspeito até então ignorado",
      "expondo uma contradição que mudou o rumo da investigação",
      "revelando uma data anterior à esperada para o sítio",
      "resultando na identificação do responsável em poucos dias",
    ],
  },
  {
    name: "cotidiano",
    personas: [
      { name: "Dona Cecília", role: "uma padeira madrugadora do bairro" },
      { name: "Eduardo", role: "um músico de rua talentoso" },
      { name: "Patrícia", role: "uma jardineira tranquila" },
      { name: "Marcos", role: "um entregador de bicicleta apressado" },
    ],
    actions: [
      "preparava uma fornada especial de pão de queijo",
      "ensaiava uma melodia inédita no violão",
      "transplantava orquídeas raras com cuidado",
      "organizava as entregas do dia em rotas otimizadas",
    ],
    environments: [
      "na cozinha aconchegante da padaria Estrela do Sul",
      "no calçadão da praia de Copacabana ao entardecer",
      "em uma estufa coberta no bairro Jardim Botânico",
      "em um galpão de logística próximo à rodoviária",
    ],
    means: [
      "seguindo uma receita herdada da avó",
      "com um violão clássico de cordas de náilon",
      "usando ferramentas próprias e adubo orgânico",
      "consultando um aplicativo de rotas no celular",
    ],
    effects: [
      "o que atraiu uma fila de clientes pela manhã",
      "reunindo uma pequena multidão em poucos minutos",
      "fazendo as flores desabrocharem em tempo recorde",
      "garantindo que todas as entregas chegassem antes do almoço",
    ],
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
  if (difficulty === "facil") {
    return `${s.agentFull} ${s.action} ${s.environment}, ${s.means}, ${s.effect}.`;
  }
  if (difficulty === "medio") {
    return `${cap(s.environment)}, ${s.agentFull} ${s.action} ${s.means}, ${s.effect}.`;
  }
  return `${s.agentFull}, ${s.environment}, ${s.action} ${s.means} — ${s.effect}.`;
}

function cap(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateStories(count = 3): StoryItem[] {
  const usedThemes = new Set<string>();
  const usedNames = new Set<string>();
  const stories: StoryItem[] = [];

  for (let i = 0; i < count; i++) {
    let theme: Theme;
    do {
      theme = pickRandom(themes);
    } while (usedThemes.has(theme.name) && usedThemes.size < themes.length);
    usedThemes.add(theme.name);

    const difficulty = difficultyOrder[Math.min(i, difficultyOrder.length - 1)];

    let persona: Persona;
    let attempts = 0;
    do {
      persona = pickRandom(theme.personas);
      attempts++;
    } while (usedNames.has(persona.name) && attempts < 8);
    usedNames.add(persona.name);

    const base = {
      agentName: persona.name,
      agentRole: persona.role,
      agentFull: `${persona.name}, ${persona.role}`,
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

// Natural prompts referencing the agent by name (no "no texto N").
const fieldPrompts: Record<QuestionField, (story: StoryItem) => string> = {
  agent: () => `Qual era o nome da pessoa descrita nessa passagem?`,
  action: (s) => `O que ${s.agentName} estava fazendo?`,
  environment: (s) => `Onde ${s.agentName} se encontrava?`,
  means: (s) => `Que recurso ${s.agentName} utilizou para realizar a tarefa?`,
  effect: (s) => `Qual foi a consequência da ação de ${s.agentName}?`,
};

function distractorPool(field: QuestionField, exclude: string[]): string[] {
  const pool: string[] = [];
  themes.forEach((t) => {
    if (field === "agent") {
      t.personas.forEach((p) => {
        if (!exclude.includes(p.name)) pool.push(p.name);
      });
      return;
    }
    const arr =
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

function correctValueFor(story: StoryItem, field: QuestionField): string {
  if (field === "agent") return story.agentName;
  return story[field];
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
    const correct = correctValueFor(story, field);
    const allUsed = stories.map((s) => correctValueFor(s, field));
    const { options, idx } = buildOptions(correct, distractorPool(field, allUsed));
    questions.push({
      id: `q-${i}-${field}`,
      storyIndex: i,
      field,
      prompt: fieldPrompts[field](story),
      options,
      correctIndex: idx,
    });
  });

  // Two extra questions on different fields, also natural-sounding.
  const extras: QuestionField[] = ["effect", "agent"];
  extras.forEach((field, k) => {
    const storyIndex = (k + 1) % stories.length;
    const story = stories[storyIndex];
    const correct = correctValueFor(story, field);
    const allUsed = stories.map((s) => correctValueFor(s, field));
    const { options, idx } = buildOptions(correct, distractorPool(field, allUsed));
    questions.push({
      id: `q-extra-${storyIndex}-${field}-${k}`,
      storyIndex,
      field,
      prompt: fieldPrompts[field](story),
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
