// Conteúdo das seções da home. Tudo aqui vem do CV, dos repositórios ou descreve o serviço oferecido:
// nada de números, clientes ou resultados inventados.

export type Solution = 'site' | 'automacao' | 'sistema';

export const solutionLabels: Record<Solution, string> = {
  site: 'Site',
  automacao: 'Automação',
  sistema: 'Sistema',
};

/** Situações comuns de quem procura ajuda. Cada uma aponta um caminho possível, sem prometer resultado. */
export const problems: { title: string; text: string; path: string; solution: Solution }[] = [
  {
    title: 'Contatos e atendimento espalhados',
    text: 'Clientes chegam por WhatsApp, e-mail e telefone, e ninguém sabe ao certo quem já foi respondido.',
    path: 'Automação e CRM simples',
    solution: 'automacao',
  },
  {
    title: 'Tarefas manuais que se repetem',
    text: 'Copiar dados de um lugar para outro, preencher o mesmo formulário e enviar o mesmo aviso todos os dias.',
    path: 'Automação',
    solution: 'automacao',
  },
  {
    title: 'Planilhas que viraram o sistema da empresa',
    text: 'Funcionam até crescer: versões diferentes, erros de digitação e dependência de uma pessoa só.',
    path: 'Sistema sob medida',
    solution: 'sistema',
  },
  {
    title: 'Ferramentas que não se comunicam',
    text: 'Site, agenda, planilha e mensagens em lugares separados, com a mesma informação digitada duas vezes.',
    path: 'Integração entre ferramentas',
    solution: 'automacao',
  },
  {
    title: 'Dificuldade para apresentar o serviço',
    text: 'O negócio é bom, mas quem pesquisa não encontra, não entende a oferta ou não sabe como entrar em contato.',
    path: 'Site ou landing page',
    solution: 'site',
  },
  {
    title: 'Pouca visibilidade sobre processos e resultados',
    text: 'As informações existem, mas ficam soltas, e é difícil enxergar o que está andando e o que está parado.',
    path: 'Painel e relatórios',
    solution: 'sistema',
  },
];

export const services = [
  {
    id: 'sites',
    title: 'Sites que transformam visitas em oportunidades',
    audience:
      'Empresas, clínicas, escritórios, imobiliárias e profissionais liberais que precisam ser encontrados e entendidos na internet.',
    description:
      'Sites institucionais, landing pages e redesign de sites que já existem. Texto claro, visual profissional e um caminho simples até o seu contato.',
    includes: ['Site institucional', 'Landing page', 'Redesign', 'WhatsApp e formulários', 'SEO técnico e velocidade'],
    examples:
      'Site de clínica com contato por WhatsApp. Página de campanha para anúncios. Novo site para uma imobiliária.',
    cta: 'Conversar sobre um site',
    message: 'Olá, Adryan! Quero conversar sobre um site para minha empresa.',
  },
  {
    id: 'automacoes',
    title: 'Automações que devolvem tempo à sua equipe',
    audience: 'Equipes que repetem tarefas todos os dias e usam várias ferramentas que não conversam entre si.',
    description:
      'Integrações entre plataformas e APIs, fluxos com n8n e outras ferramentas, organização e qualificação de leads, rotinas a partir de planilhas e IA aplicada a processos.',
    includes: [
      'Integração de ferramentas',
      'Fluxos com n8n',
      'Organização de leads',
      'Rotinas de planilhas',
      'IA em processos',
    ],
    examples:
      'Contato do site que chega organizado e avisa a equipe. Planilha que preenche formulários sozinha.',
    cta: 'Conversar sobre automação',
    message: 'Olá, Adryan! Quero conversar sobre automatizar uma tarefa ou processo da minha empresa.',
  },
  {
    id: 'sistemas',
    title: 'Sistemas que acompanham o crescimento da empresa',
    audience: 'Negócios que superaram as planilhas e precisam de uma ferramenta feita para a forma como trabalham.',
    description:
      'Sistemas internos e administrativos, CRMs, painéis com relatórios, gestão de clientes e processos e aplicações web sob medida.',
    includes: ['Sistema interno', 'CRM sob medida', 'Painéis e relatórios', 'Gestão de clientes', 'Aplicação web'],
    examples:
      'Cadastro de clientes com histórico. Painel com indicadores do mês. Controle de etapas de um processo.',
    cta: 'Conversar sobre um sistema',
    message: 'Olá, Adryan! Quero conversar sobre um sistema sob medida para minha empresa.',
  },
];

export const steps = [
  {
    title: 'Entendimento do negócio',
    text: 'Conversamos sobre sua rotina, seus processos e o que está atrapalhando. Ainda sem falar de ferramenta.',
  },
  {
    title: 'Proposta de solução',
    text: 'Defino escopo, abordagem, investimento e prazo, tudo por escrito antes de começar.',
  },
  {
    title: 'Desenvolvimento e validação',
    text: 'Construo em etapas e você testa antes de seguirmos, para ajustar cedo o que for preciso.',
  },
  {
    title: 'Entrega e evolução',
    text: 'Publico ou implanto a solução, oriento o uso e dou o suporte combinado na proposta.',
  },
];

export const experience = [
  { period: 'abr 2025 – atual', role: 'Designer gráfico', org: 'Propague Marketing, Almenara (MG)' },
  { period: 'abr 2024 – jan 2025', role: 'Suporte técnico', org: 'Info Projekt, Almenara (MG)' },
  {
    period: '2024 – 2026',
    role: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
    org: 'Faculdade Descomplica',
  },
];

// Cada nome precisa ter ícone mapeado em About.astro (pacote simple-icons)
export const tools = [
  { label: 'Frontend', items: ['JavaScript', 'TypeScript', 'React', 'Vite', 'HTML', 'CSS', 'Tailwind CSS'] },
  {
    label: 'Backend e dados',
    items: ['Node.js', 'Express', 'PostgreSQL', 'Supabase', 'Python', 'Django', 'Pandas', 'Apache Airflow'],
  },
  { label: 'Fluxo de trabalho', items: ['Git', 'GitHub Actions', 'Docker', 'Vercel', 'Figma'] },
];

export const languages = ['Português nativo', 'Inglês avançado'];

// FlowSheet, Lbook e DeliveryLens têm case próprio em src/content/projects
export const techProjects = [
  {
    name: 'Crypto Pipeline',
    year: 2025,
    summary:
      'Coleta cotações de criptomoedas pela API da CoinGecko, trata os dados com Pandas e entrega os resultados por um bot no Telegram.',
    stack: ['Python', 'Pandas', 'Telegram Bot'],
    repo: 'https://github.com/adryan1-dev/crypto-pipeline',
  },
];

export const faqs = [
  {
    question: 'Que tipos de projeto você desenvolve?',
    answer:
      'Três frentes: sites e landing pages, automações e integrações entre ferramentas, e sistemas sob medida, como painéis, CRMs e ferramentas internas. Se não souber em qual delas seu caso se encaixa, é para isso que serve a primeira conversa.',
  },
  {
    question: 'Como funciona o orçamento?',
    answer:
      'Depois de uma conversa sobre o seu negócio, envio uma proposta com escopo, prazo e investimento definidos. O valor depende do que precisa ser feito, não de um pacote fechado.',
  },
  {
    question: 'Quanto tempo leva?',
    answer:
      'Depende do tamanho do projeto e de quando o que eu preciso (textos, imagens, acessos, regras do processo) estiver disponível. O prazo entra na proposta.',
  },
  {
    question: 'Você integra com os sistemas que já uso?',
    answer:
      'Em muitos casos, sim, quando a ferramenta oferece API, integração ou exportação de dados. Avalio isso na conversa inicial e digo com clareza o que é viável.',
  },
  {
    question: 'Dá para começar com algo pequeno?',
    answer:
      'Dá. Muitas vezes o melhor primeiro passo é automatizar uma única tarefa ou publicar uma página simples, e evoluir depois conforme o resultado.',
  },
  {
    question: 'Como ficam suporte e manutenção?',
    answer:
      'O que está incluso de suporte e manutenção fica descrito na proposta e varia conforme o projeto. Depois da entrega, posso continuar evoluindo a solução se fizer sentido.',
  },
  {
    question: 'Existem custos de domínio, hospedagem ou outros serviços?',
    answer:
      'Dependendo do projeto, sim: domínio, hospedagem, ferramentas de automação, serviços de IA e APIs podem ter custo próprio. A proposta lista o que é necessário e quem contrata cada item, para não haver surpresa.',
  },
  {
    question: 'Por que não usar apenas ferramentas prontas?',
    answer:
      'Quando uma ferramenta pronta resolve, eu digo. O desenvolvimento personalizado vale a pena quando o seu processo é específico, quando as ferramentas não se encaixam ou quando você precisa ligar várias delas.',
  },
  {
    question: 'Você atende empresas de outras cidades?',
    answer: 'Sim. Estou em Almenara (MG) e todo o atendimento pode ser feito online, por WhatsApp e videochamada.',
  },
];
