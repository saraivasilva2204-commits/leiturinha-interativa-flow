import type { ReadingLevel, SkillId } from "./skills";

export type CategoryId =
  | "mensagens"
  | "avisos"
  | "noticias"
  | "saude"
  | "trabalho"
  | "compras"
  | "internet"
  | "transporte"
  | "educacao"
  | "documentos";

export const CATEGORIES: { id: CategoryId; label: string; emoji: string }[] = [
  { id: "noticias", label: "Notícias", emoji: "📰" },
  { id: "mensagens", label: "Mensagens", emoji: "📱" },
  { id: "documentos", label: "Documentos", emoji: "🧾" },
  { id: "saude", label: "Saúde", emoji: "🏥" },
  { id: "trabalho", label: "Trabalho", emoji: "💼" },
  { id: "compras", label: "Compras", emoji: "🛒" },
  { id: "transporte", label: "Transporte", emoji: "🚌" },
  { id: "educacao", label: "Educação", emoji: "🏫" },
  { id: "internet", label: "Internet", emoji: "🌐" },
  { id: "avisos", label: "Avisos", emoji: "📢" },
];

export const CATEGORY_LABEL: Record<CategoryId, string> = CATEGORIES.reduce(
  (acc, c) => ({ ...acc, [c.id]: c.label }),
  {} as Record<CategoryId, string>,
);

export type Passage = {
  id: string;
  titulo: string;
  categoria: CategoryId;
  nivel: ReadingLevel;
  paragrafos: string[];
};

export type QuestionType =
  | "multipla_escolha"
  | "verdadeiro_falso"
  | "fato_opiniao"
  | "completar"
  | "ordenacao";

export type BankQuestion = {
  id: string;
  passageId: string;
  tipo: QuestionType;
  habilidade: SkillId;
  nivel: ReadingLevel;
  pergunta: string;
  /** For "ordenacao" these are the steps in the CORRECT order. */
  opcoes: string[];
  /** Index of the correct option. Ignored for "ordenacao". */
  correta: number;
  explicacao: string;
  dica1: string;
  dica2: string;
  trechoEvidencia: string;
};

export const PASSAGES: Passage[] = [
  {
    id: "p-mensagem",
    titulo: "Recado no grupo da família",
    categoria: "mensagens",
    nivel: 1,
    paragrafos: [
      "Tia Cleide: Pessoal, o almoço de domingo vai ser na casa da vovó, e não no salão do condomínio. Começa ao meio-dia.",
      "Cada um leva uma coisa: eu levo o arroz, o Beto leva a salada e a Ana fica com a sobremesa. Quem quiser levar refrigerante, avise antes para não sobrar.",
      "Ah, importante: o portão da frente está com problema, então entrem pela garagem.",
    ],
  },
  {
    id: "p-aviso",
    titulo: "Aviso do condomínio",
    categoria: "avisos",
    nivel: 1,
    paragrafos: [
      "AVISO AOS MORADORES: na próxima terça-feira, dia 14, o fornecimento de água será interrompido das 8h às 14h para a limpeza da caixa d'água.",
      "Pedimos que os moradores guardem água para uso durante o período. A lavanderia coletiva ficará fechada nesse dia.",
      "Em caso de dúvida, procure a portaria do bloco B.",
    ],
  },
  {
    id: "p-noticia",
    titulo: "Nova ciclovia na avenida central",
    categoria: "noticias",
    nivel: 2,
    paragrafos: [
      "A prefeitura inaugurou nesta semana uma ciclovia de quatro quilômetros na avenida central. A obra levou cinco meses e ocupou uma das faixas de carros.",
      "Comerciantes da região reclamaram da redução das vagas de estacionamento. Já os ciclistas relataram que passaram a fazer o trajeto até o trabalho em menos tempo, pois antes precisavam desviar por ruas movimentadas.",
      "A secretaria de mobilidade informou que vai monitorar o trânsito por três meses antes de decidir se amplia o projeto para outras avenidas.",
    ],
  },
  {
    id: "p-saude",
    titulo: "Orientação do posto de saúde",
    categoria: "saude",
    nivel: 2,
    paragrafos: [
      "Dona Marlene saiu da consulta com uma receita: um comprimido a cada 8 horas, durante 7 dias, sempre depois das refeições.",
      "A enfermeira explicou que, se ela sentir dor no estômago, deve avisar o posto antes de interromper o remédio por conta própria.",
      "Ao chegar em casa, Marlene anotou os horários em um papel e colou na porta da geladeira. Na primeira noite, quase esqueceu a dose, mas o papel a lembrou.",
    ],
  },
  {
    id: "p-trabalho",
    titulo: "E-mail sobre o novo processo",
    categoria: "trabalho",
    nivel: 3,
    paragrafos: [
      "Equipe, a partir do dia 1º, os pedidos de férias deixarão de ser enviados por e-mail e passarão a ser registrados no sistema interno.",
      "A mudança acontece porque muitos pedidos se perdiam na caixa de entrada e demoravam semanas para serem aprovados. No sistema, cada pedido recebe um número e o funcionário acompanha o andamento.",
      "Pedidos enviados por e-mail depois do dia 1º não serão considerados. Em caso de dificuldade com o sistema, procure o setor de pessoal, que fará o registro junto com você.",
    ],
  },
  {
    id: "p-compras",
    titulo: "Anúncio de liquidação",
    categoria: "compras",
    nivel: 4,
    paragrafos: [
      "IMPERDÍVEL! A melhor loja de eletrodomésticos da cidade está com até 70% de desconto nesta semana.",
      "Todos os produtos têm garantia de um ano. As vendas parceladas contam com juros de 3% ao mês, informados no contrato.",
      "Quem não aproveitar vai se arrepender: são ofertas que ninguém mais consegue oferecer.",
    ],
  },
  {
    id: "p-internet",
    titulo: "Post compartilhado nas redes",
    categoria: "internet",
    nivel: 4,
    paragrafos: [
      "Uma publicação afirmava que beber água morna com limão toda manhã elimina qualquer doença. O texto dizia: 'especialistas confirmam, mas a indústria não quer que você saiba'.",
      "Nenhum nome de especialista, instituição ou pesquisa era citado. Nos comentários, uma nutricionista pediu a fonte e não recebeu resposta.",
      "A publicação já tinha sido compartilhada mais de vinte mil vezes.",
    ],
  },
  {
    id: "p-transporte",
    titulo: "Mudança no itinerário da linha 302",
    categoria: "transporte",
    nivel: 5,
    paragrafos: [
      "COMUNICADO: a partir de segunda-feira, a linha 302 não passará mais pela rua das Acácias, por causa de uma obra no asfalto.",
      "O ônibus seguirá pela avenida Brasil e fará parada em frente ao mercado municipal. Quem desce no ponto do hospital deve usar a linha 305 ou descer no mercado e caminhar dois quarteirões.",
      "A mudança vale por cerca de 40 dias, enquanto durar a obra.",
    ],
  },
  {
    id: "p-educacao",
    titulo: "Comunicado da escola",
    categoria: "educacao",
    nivel: 5,
    paragrafos: [
      "Srs. responsáveis: a reunião de pais do 6º ano será na quinta-feira, às 19h, no auditório. A entrega dos boletins acontece na própria reunião.",
      "Quem não puder comparecer deve retirar o boletim na secretaria a partir de sexta-feira, das 8h às 12h, apresentando documento com foto.",
      "Alunos não precisam comparecer à reunião.",
    ],
  },
];

export const QUESTIONS: BankQuestion[] = [
  // ---- p-mensagem (nível 1)
  {
    id: "q-msg-1",
    passageId: "p-mensagem",
    tipo: "multipla_escolha",
    habilidade: "explicita",
    nivel: 1,
    pergunta: "Onde vai acontecer o almoço de domingo?",
    opcoes: ["Na casa da vovó", "No salão do condomínio", "Na casa da tia Cleide", "Em um restaurante"],
    correta: 0,
    explicacao:
      "A mensagem diz que o almoço será na casa da vovó e corrige o local anterior, o salão do condomínio.",
    dica1: "A informação está na primeira mensagem do grupo.",
    dica2: "Procure a frase que compara dois lugares usando 'e não'.",
    trechoEvidencia: "o almoço de domingo vai ser na casa da vovó, e não no salão do condomínio",
  },
  {
    id: "q-msg-2",
    passageId: "p-mensagem",
    tipo: "verdadeiro_falso",
    habilidade: "explicita",
    nivel: 1,
    pergunta: "A Ana ficou responsável pela sobremesa.",
    opcoes: ["Verdadeiro", "Falso"],
    correta: 0,
    explicacao: "A divisão das tarefas aparece no texto: arroz, salada e sobremesa, cada um com um nome.",
    dica1: "Releia a parte em que cada pessoa leva uma coisa.",
    dica2: "Compare os três nomes com os três itens listados.",
    trechoEvidencia: "eu levo o arroz, o Beto leva a salada e a Ana fica com a sobremesa",
  },
  {
    id: "q-msg-3",
    passageId: "p-mensagem",
    tipo: "inferencia" as never as QuestionType,
    habilidade: "inferencia",
    nivel: 2,
    pergunta: "Por que os convidados devem entrar pela garagem?",
    opcoes: [
      "Porque o portão da frente está com defeito",
      "Porque a garagem é mais perto da cozinha",
      "Porque a rua está em obras",
      "Porque a vovó pediu para estacionar dentro",
    ],
    correta: 0,
    explicacao:
      "O texto informa o problema no portão e, em seguida, o pedido para entrar pela garagem. Uma informação explica a outra.",
    dica1: "A resposta está ligada a um problema citado no fim da mensagem.",
    dica2: "Procure a palavra 'então': ela liga um motivo a uma orientação.",
    trechoEvidencia: "o portão da frente está com problema, então entrem pela garagem",
  },

  // ---- p-aviso (nível 1)
  {
    id: "q-avi-1",
    passageId: "p-aviso",
    tipo: "multipla_escolha",
    habilidade: "explicita",
    nivel: 1,
    pergunta: "Em qual horário a água ficará desligada?",
    opcoes: ["Das 8h às 14h", "Das 14h às 20h", "Durante todo o dia 14", "Das 8h às 10h"],
    correta: 0,
    explicacao: "O aviso informa o intervalo exato da interrupção.",
    dica1: "Procure os números que aparecem junto da palavra 'interrompido'.",
    dica2: "O horário está no primeiro parágrafo, logo depois da data.",
    trechoEvidencia: "será interrompido das 8h às 14h",
  },
  {
    id: "q-avi-2",
    passageId: "p-aviso",
    tipo: "multipla_escolha",
    habilidade: "causa_consequencia",
    nivel: 2,
    pergunta: "Qual é o motivo da interrupção da água?",
    opcoes: [
      "A limpeza da caixa d'água",
      "Uma obra na rua",
      "A falta de chuva na cidade",
      "A reforma da lavanderia",
    ],
    correta: 0,
    explicacao: "O aviso apresenta a finalidade da interrupção: limpar a caixa d'água.",
    dica1: "Procure a expressão que indica finalidade: 'para'.",
    dica2: "O motivo aparece no fim da primeira frase.",
    trechoEvidencia: "para a limpeza da caixa d'água",
  },
  {
    id: "q-avi-3",
    passageId: "p-aviso",
    tipo: "aplicacao" as never as QuestionType,
    habilidade: "aplicacao",
    nivel: 5,
    pergunta: "Você precisa lavar roupa na lavanderia coletiva na terça-feira. O que fazer?",
    opcoes: [
      "Mudar a lavagem para outro dia, porque a lavanderia estará fechada",
      "Ir de manhã bem cedo, antes das 8h",
      "Procurar a portaria para abrir a lavanderia",
      "Lavar depois das 14h, quando a água voltar",
    ],
    correta: 0,
    explicacao:
      "O aviso diz que a lavanderia fica fechada no dia inteiro, não apenas durante a interrupção da água.",
    dica1: "Veja o que o aviso fala especificamente sobre a lavanderia.",
    dica2: "Repare que o texto diz 'nesse dia', e não 'nesse horário'.",
    trechoEvidencia: "A lavanderia coletiva ficará fechada nesse dia.",
  },

  // ---- p-noticia (nível 2)
  {
    id: "q-not-1",
    passageId: "p-noticia",
    tipo: "multipla_escolha",
    habilidade: "ideia_principal",
    nivel: 3,
    pergunta: "Qual é a ideia principal da notícia?",
    opcoes: [
      "A cidade ganhou uma ciclovia que dividiu opiniões e ainda será avaliada",
      "Os comerciantes venceram a disputa sobre as vagas",
      "Os ciclistas passaram a andar mais devagar",
      "A prefeitura desistiu de novas ciclovias",
    ],
    correta: 0,
    explicacao:
      "O texto apresenta a obra, as reações contrárias e favoráveis e o monitoramento futuro. Nenhum lado é apontado como vencedor.",
    dica1: "Pergunte-se: sobre o que o texto fala do começo ao fim?",
    dica2: "Junte os três parágrafos em uma frase só.",
    trechoEvidencia:
      "vai monitorar o trânsito por três meses antes de decidir se amplia o projeto",
  },
  {
    id: "q-not-2",
    passageId: "p-noticia",
    tipo: "multipla_escolha",
    habilidade: "inferencia",
    nivel: 2,
    pergunta: "Por que os ciclistas passaram a fazer o trajeto em menos tempo?",
    opcoes: [
      "Porque não precisam mais desviar por ruas movimentadas",
      "Porque a ciclovia é mais curta que a avenida",
      "Porque o trânsito de carros aumentou",
      "Porque as bicicletas ficaram mais rápidas",
    ],
    correta: 0,
    explicacao:
      "O texto liga o ganho de tempo ao desvio que existia antes, usando a palavra 'pois'.",
    dica1: "A explicação está no segundo parágrafo.",
    dica2: "Procure a palavra 'pois': ela introduz o motivo.",
    trechoEvidencia: "pois antes precisavam desviar por ruas movimentadas",
  },
  {
    id: "q-not-3",
    passageId: "p-noticia",
    tipo: "verdadeiro_falso",
    habilidade: "explicita",
    nivel: 1,
    pergunta: "A ciclovia ocupou uma das faixas antes usada por carros.",
    opcoes: ["Verdadeiro", "Falso"],
    correta: 0,
    explicacao: "Está escrito no primeiro parágrafo.",
    dica1: "Procure a frase sobre o tempo de obra e o espaço ocupado.",
    dica2: "A informação vem logo depois de 'cinco meses'.",
    trechoEvidencia: "A obra levou cinco meses e ocupou uma das faixas de carros.",
  },

  // ---- p-saude (nível 2)
  {
    id: "q-sau-1",
    passageId: "p-saude",
    tipo: "multipla_escolha",
    habilidade: "explicita",
    nivel: 1,
    pergunta: "Quantas doses do remédio Marlene deve tomar por dia?",
    opcoes: ["Três", "Duas", "Sete", "Oito"],
    correta: 0,
    explicacao: "Um comprimido a cada 8 horas equivale a três doses em 24 horas.",
    dica1: "Veja o intervalo entre as doses.",
    dica2: "Divida 24 horas pelo intervalo indicado na receita.",
    trechoEvidencia: "um comprimido a cada 8 horas, durante 7 dias",
  },
  {
    id: "q-sau-2",
    passageId: "p-saude",
    tipo: "ordenacao",
    habilidade: "sequencia",
    nivel: 2,
    pergunta: "Coloque os acontecimentos na ordem em que aparecem no texto.",
    opcoes: [
      "Marlene sai da consulta com a receita",
      "A enfermeira dá a orientação sobre dor no estômago",
      "Marlene cola os horários na geladeira",
      "O papel a lembra da dose na primeira noite",
    ],
    correta: 0,
    explicacao: "O texto segue essa ordem: consulta, orientação, anotação e, por fim, a primeira noite.",
    dica1: "Comece pelo que acontece no consultório.",
    dica2: "O último acontecimento é o único que fala de 'primeira noite'.",
    trechoEvidencia: "Ao chegar em casa, Marlene anotou os horários em um papel",
  },
  {
    id: "q-sau-3",
    passageId: "p-saude",
    tipo: "multipla_escolha",
    habilidade: "aplicacao",
    nivel: 5,
    pergunta: "Se Marlene sentir dor no estômago no terceiro dia, qual é a melhor atitude?",
    opcoes: [
      "Avisar o posto de saúde antes de parar o remédio",
      "Parar o remédio imediatamente",
      "Dobrar a dose para passar mais rápido",
      "Esperar acabar os sete dias sem falar com ninguém",
    ],
    correta: 0,
    explicacao: "A enfermeira orientou avisar o posto antes de interromper o tratamento sozinha.",
    dica1: "A orientação da enfermeira está no segundo parágrafo.",
    dica2: "Repare na expressão 'antes de interromper o remédio por conta própria'.",
    trechoEvidencia: "deve avisar o posto antes de interromper o remédio por conta própria",
  },

  // ---- p-trabalho (nível 3)
  {
    id: "q-tra-1",
    passageId: "p-trabalho",
    tipo: "multipla_escolha",
    habilidade: "causa_consequencia",
    nivel: 2,
    pergunta: "Por que a empresa mudou a forma de pedir férias?",
    opcoes: [
      "Porque pedidos se perdiam no e-mail e demoravam para ser aprovados",
      "Porque o e-mail da empresa foi desativado",
      "Porque poucas pessoas pediam férias",
      "Porque o setor de pessoal diminuiu",
    ],
    correta: 0,
    explicacao: "O motivo está declarado no texto com a expressão 'acontece porque'.",
    dica1: "Procure a palavra 'porque' no segundo parágrafo.",
    dica2: "O problema citado envolve a caixa de entrada.",
    trechoEvidencia: "muitos pedidos se perdiam na caixa de entrada e demoravam semanas",
  },
  {
    id: "q-tra-2",
    passageId: "p-trabalho",
    tipo: "completar",
    habilidade: "ideia_principal",
    nivel: 3,
    pergunta: "Complete: a principal intenção do e-mail é ______.",
    opcoes: [
      "informar uma mudança de procedimento e orientar a equipe",
      "criticar quem pediu férias por e-mail",
      "anunciar novas datas de férias coletivas",
      "avisar que o sistema interno saiu do ar",
    ],
    correta: 0,
    explicacao:
      "O e-mail comunica a nova regra, explica o motivo e diz o que fazer em caso de dificuldade.",
    dica1: "Pense no objetivo de quem escreveu.",
    dica2: "O texto não cobra nem culpa ninguém: ele orienta.",
    trechoEvidencia: "passarão a ser registrados no sistema interno",
  },
  {
    id: "q-tra-3",
    passageId: "p-trabalho",
    tipo: "multipla_escolha",
    habilidade: "aplicacao",
    nivel: 5,
    pergunta: "Você não consegue usar o sistema no dia 3. O que o e-mail orienta fazer?",
    opcoes: [
      "Procurar o setor de pessoal para registrar junto",
      "Enviar o pedido por e-mail mesmo assim",
      "Esperar o próximo mês",
      "Pedir para um colega registrar com o login dele",
    ],
    correta: 0,
    explicacao:
      "O texto prevê a dificuldade e indica o setor de pessoal. Pedidos por e-mail após o dia 1º não valem.",
    dica1: "A orientação está na última frase.",
    dica2: "O texto cita um setor específico da empresa.",
    trechoEvidencia: "procure o setor de pessoal, que fará o registro junto com você",
  },

  // ---- p-compras (nível 4)
  {
    id: "q-com-1",
    passageId: "p-compras",
    tipo: "fato_opiniao",
    habilidade: "fato_opiniao",
    nivel: 4,
    pergunta: "\"A melhor loja de eletrodomésticos da cidade\" é fato ou opinião?",
    opcoes: ["Fato", "Opinião"],
    correta: 1,
    explicacao:
      "Não há dado que comprove que a loja é a melhor. É uma avaliação de quem escreveu o anúncio.",
    dica1: "Pergunte: isso pode ser comprovado com números?",
    dica2: "Palavras como 'melhor' e 'imperdível' costumam indicar opinião.",
    trechoEvidencia: "A melhor loja de eletrodomésticos da cidade",
  },
  {
    id: "q-com-2",
    passageId: "p-compras",
    tipo: "multipla_escolha",
    habilidade: "critica",
    nivel: 4,
    pergunta: "Qual conclusão NÃO se sustenta no anúncio?",
    opcoes: [
      "Todos os produtos estão com 70% de desconto",
      "As vendas parceladas têm juros de 3% ao mês",
      "Os produtos têm garantia de um ano",
      "A loja está em semana de liquidação",
    ],
    correta: 0,
    explicacao:
      "O anúncio diz 'até 70%', o que significa que esse é o desconto máximo, não o desconto de todos os produtos.",
    dica1: "Preste atenção em uma palavra pequena antes do percentual.",
    dica2: "'Até 70%' e '70% em tudo' não querem dizer a mesma coisa.",
    trechoEvidencia: "está com até 70% de desconto nesta semana",
  },
  {
    id: "q-com-3",
    passageId: "p-compras",
    tipo: "multipla_escolha",
    habilidade: "intencao",
    nivel: 4,
    pergunta: "Qual é a intenção principal de quem escreveu o anúncio?",
    opcoes: [
      "Convencer o leitor a comprar rapidamente",
      "Explicar como funciona a garantia legal",
      "Comparar preços com outras lojas",
      "Ensinar a calcular juros",
    ],
    correta: 0,
    explicacao:
      "O texto usa apelos emocionais e a ideia de urgência para levar o leitor à compra.",
    dica1: "Repare no tom da última frase.",
    dica2: "Frases como 'vai se arrepender' criam pressa.",
    trechoEvidencia: "Quem não aproveitar vai se arrepender",
  },

  // ---- p-internet (nível 4)
  {
    id: "q-int-1",
    passageId: "p-internet",
    tipo: "multipla_escolha",
    habilidade: "critica",
    nivel: 4,
    pergunta: "Qual é o principal problema da publicação?",
    opcoes: [
      "Ela afirma algo sem apresentar nenhuma fonte",
      "Ela tem poucos compartilhamentos",
      "Ela fala sobre alimentação",
      "Ela foi escrita por uma nutricionista",
    ],
    correta: 0,
    explicacao:
      "O texto destaca que nenhum especialista, instituição ou pesquisa é citado, e o pedido de fonte não foi respondido.",
    dica1: "Veja o que o segundo parágrafo informa sobre fontes.",
    dica2: "Muitos compartilhamentos não comprovam nada.",
    trechoEvidencia: "Nenhum nome de especialista, instituição ou pesquisa era citado.",
  },
  {
    id: "q-int-2",
    passageId: "p-internet",
    tipo: "vocabulario" as never as QuestionType,
    habilidade: "vocabulario",
    nivel: 3,
    pergunta: "No texto, a expressão \"a indústria não quer que você saiba\" serve para",
    opcoes: [
      "criar desconfiança e dar ar de segredo revelado",
      "citar um estudo científico",
      "explicar o efeito do limão no corpo",
      "identificar o autor da publicação",
    ],
    correta: 0,
    explicacao:
      "A expressão sugere uma conspiração e tenta convencer o leitor sem apresentar provas.",
    dica1: "Pense no efeito que a frase provoca em quem lê.",
    dica2: "Ela não traz informação verificável, apenas uma sensação.",
    trechoEvidencia: "especialistas confirmam, mas a indústria não quer que você saiba",
  },
  {
    id: "q-int-3",
    passageId: "p-internet",
    tipo: "fato_opiniao",
    habilidade: "fato_opiniao",
    nivel: 4,
    pergunta: "\"A publicação já tinha sido compartilhada mais de vinte mil vezes.\" É fato ou opinião?",
    opcoes: ["Fato", "Opinião"],
    correta: 0,
    explicacao: "É um dado que pode ser verificado na própria rede social.",
    dica1: "Pergunte: é possível conferir esse número?",
    dica2: "Números verificáveis indicam fato, mesmo em textos duvidosos.",
    trechoEvidencia: "compartilhada mais de vinte mil vezes",
  },

  // ---- p-transporte (nível 5)
  {
    id: "q-tsp-1",
    passageId: "p-transporte",
    tipo: "multipla_escolha",
    habilidade: "aplicacao",
    nivel: 5,
    pergunta: "Você desce no ponto do hospital todos os dias. A partir de segunda, o que pode fazer?",
    opcoes: [
      "Pegar a linha 305 ou descer no mercado e caminhar dois quarteirões",
      "Continuar na 302 e descer na rua das Acácias",
      "Esperar os 40 dias sem usar ônibus",
      "Pedir ao motorista para desviar pelo hospital",
    ],
    correta: 0,
    explicacao: "O comunicado apresenta exatamente essas duas alternativas para quem usa o ponto do hospital.",
    dica1: "A orientação para o ponto do hospital está no segundo parágrafo.",
    dica2: "O texto cita outra linha e uma caminhada curta.",
    trechoEvidencia: "deve usar a linha 305 ou descer no mercado e caminhar dois quarteirões",
  },
  {
    id: "q-tsp-2",
    passageId: "p-transporte",
    tipo: "verdadeiro_falso",
    habilidade: "inferencia",
    nivel: 2,
    pergunta: "A mudança do itinerário é definitiva.",
    opcoes: ["Verdadeiro", "Falso"],
    correta: 1,
    explicacao:
      "O texto informa um prazo aproximado de 40 dias, ligado à duração da obra. Portanto, é temporária.",
    dica1: "Procure a informação sobre tempo no último parágrafo.",
    dica2: "A expressão 'enquanto durar a obra' indica algo temporário.",
    trechoEvidencia: "A mudança vale por cerca de 40 dias, enquanto durar a obra.",
  },
  {
    id: "q-tsp-3",
    passageId: "p-transporte",
    tipo: "multipla_escolha",
    habilidade: "causa_consequencia",
    nivel: 2,
    pergunta: "Qual é a causa da mudança no trajeto?",
    opcoes: [
      "Uma obra no asfalto da rua das Acácias",
      "A criação de uma nova linha de ônibus",
      "A abertura do mercado municipal",
      "A falta de motoristas",
    ],
    correta: 0,
    explicacao: "O comunicado apresenta a obra como motivo da alteração.",
    dica1: "Procure a expressão 'por causa de'.",
    dica2: "A causa aparece na primeira frase.",
    trechoEvidencia: "por causa de uma obra no asfalto",
  },

  // ---- p-educacao (nível 5)
  {
    id: "q-edu-1",
    passageId: "p-educacao",
    tipo: "multipla_escolha",
    habilidade: "aplicacao",
    nivel: 5,
    pergunta: "Você trabalha na quinta à noite e não pode ir à reunião. Como conseguir o boletim?",
    opcoes: [
      "Retirar na secretaria a partir de sexta, das 8h às 12h, com documento com foto",
      "Pedir ao aluno para buscar no auditório",
      "Aguardar o envio pelo correio",
      "Ir à secretaria na própria quinta-feira à tarde",
    ],
    correta: 0,
    explicacao: "O comunicado prevê essa alternativa, com dia, horário e documento necessários.",
    dica1: "A alternativa está no segundo parágrafo.",
    dica2: "Repare no dia e no horário indicados, além do documento.",
    trechoEvidencia:
      "retirar o boletim na secretaria a partir de sexta-feira, das 8h às 12h, apresentando documento com foto",
  },
  {
    id: "q-edu-2",
    passageId: "p-educacao",
    tipo: "verdadeiro_falso",
    habilidade: "explicita",
    nivel: 1,
    pergunta: "Os alunos devem comparecer à reunião de pais.",
    opcoes: ["Verdadeiro", "Falso"],
    correta: 1,
    explicacao: "A última frase do comunicado diz o contrário.",
    dica1: "Veja a informação final do comunicado.",
    dica2: "Há uma frase curta que fala diretamente dos alunos.",
    trechoEvidencia: "Alunos não precisam comparecer à reunião.",
  },
  {
    id: "q-edu-3",
    passageId: "p-educacao",
    tipo: "completar",
    habilidade: "ideia_principal",
    nivel: 3,
    pergunta: "Complete: o comunicado serve principalmente para ______.",
    opcoes: [
      "informar a data da reunião e como retirar o boletim",
      "convidar os alunos para uma apresentação",
      "explicar as notas do 6º ano",
      "avisar sobre mudanças no horário das aulas",
    ],
    correta: 0,
    explicacao: "Os dois assuntos do texto são a reunião e a entrega dos boletins.",
    dica1: "Some os assuntos dos dois primeiros parágrafos.",
    dica2: "O texto não comenta o conteúdo das notas.",
    trechoEvidencia: "A entrega dos boletins acontece na própria reunião.",
  },
];

export function passageById(id: string): Passage {
  const p = PASSAGES.find((x) => x.id === id);
  if (!p) throw new Error(`Passagem não encontrada: ${id}`);
  return p;
}
