// Conteúdo das seções da home. Tudo aqui vem do CV, dos repositórios ou descreve o serviço oferecido:
// nada de números, clientes ou resultados inventados.

export const services = [
  {
    title: 'Site institucional',
    audience:
      'Empresas, comércios, clínicas e escritórios que precisam de uma presença profissional e completa na internet.',
    description:
      'Para empresas que precisam apresentar marca, serviços e diferenciais com a mesma seriedade que têm no atendimento.',
    includes: ['Páginas sob medida', 'WhatsApp integrado', 'SEO básico', 'Pronto para celular'],
    message: 'Olá, Adryan! Quero conversar sobre um site institucional para minha empresa.',
  },
  {
    title: 'Landing page',
    audience:
      'Profissionais autônomos, lançamentos de produto e campanhas de anúncios que precisam transformar visitas em contatos.',
    description: 'Uma página focada em uma campanha, produto ou serviço, com um único objetivo: gerar contatos.',
    includes: ['Texto orientado a conversão', 'Formulário ou WhatsApp', 'Carregamento rápido'],
    message: 'Olá, Adryan! Quero conversar sobre uma landing page.',
  },
  {
    title: 'Redesign',
    audience:
      'Negócios que já têm site, mas ele está desatualizado, lento, difícil de usar no celular ou não gera contatos.',
    description:
      'Modernização de um site que já existe: visual, experiência no celular, velocidade e clareza da mensagem.',
    includes: ['Análise do site atual', 'Nova direção visual', 'Migração do conteúdo'],
    message: 'Olá, Adryan! Quero conversar sobre o redesign do site da minha empresa.',
  },
  {
    title: 'Desenvolvimento web',
    audience: 'Empresas que precisam de sistemas internos, painéis, automações ou integrações feitos sob medida.',
    description: 'Sistemas, painéis e integrações sob medida, do banco de dados à interface.',
    includes: ['Aplicações React', 'APIs com Node.js', 'PostgreSQL'],
    message: 'Olá, Adryan! Quero conversar sobre um projeto de desenvolvimento web.',
  },
];

export const steps = [
  { title: 'Briefing', text: 'Conversamos sobre sua empresa, seu público e o que o site precisa resolver.' },
  { title: 'Direção', text: 'Definimos a estrutura das páginas, o conteúdo e a direção visual.' },
  { title: 'Desenvolvimento', text: 'Construo o site responsivo e rápido, e você acompanha cada etapa.' },
  {
    title: 'Publicação',
    text: 'Revisamos juntos, publicamos no seu domínio e deixamos tudo pronto para receber clientes.',
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

export const techProjects = [
  {
    name: 'FlowSheet',
    year: 2026,
    summary:
      'Importa planilhas Excel e usa cada linha para preencher formulários web automaticamente, com status em tempo real e reprocessamento só do que deu erro.',
    stack: ['Python', 'Django', 'Playwright'],
    repo: 'https://github.com/adryan1-dev/flow-sheet',
  },
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
    question: 'Quanto custa um site?',
    answer:
      'Depende do tamanho do site e do que ele precisa fazer. Depois de uma conversa rápida sobre o projeto, envio uma proposta com escopo, prazo e valor definidos, sem surpresas no meio do caminho.',
  },
  {
    question: 'Quanto tempo leva para ficar pronto?',
    answer:
      'O prazo entra na proposta e depende principalmente do número de páginas e de quando o conteúdo (textos, fotos e logo) estiver disponível.',
  },
  {
    question: 'Preciso ter domínio e hospedagem?',
    answer:
      'Não. Domínio e hospedagem já estão inclusos no projeto: eu cuido do registro e da publicação do site.',
  },
  {
    question: 'Consigo atualizar o site depois?',
    answer:
      'Sim. Todo projeto inclui 3 meses de manutenção para pequenas alterações ou correções depois da publicação.',
  },
  {
    question: 'Você atende empresas de outras cidades?',
    answer: 'Sim. Estou em Almenara (MG) e todo o atendimento pode ser feito online, por WhatsApp e videochamada.',
  },
  {
    question: 'O site vai funcionar bem no celular?',
    answer:
      'Sim. Cada página é pensada para o celular desde o início e testada em diferentes tamanhos de tela antes da publicação.',
  },
];
