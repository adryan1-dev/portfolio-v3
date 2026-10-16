export const site = {
  name: 'adryan1.dev',
  person: 'Adryan Chaves',
  role: 'Desenvolvedor de soluções digitais',
  url: 'https://www.adryan1dev.com.br',
  lang: 'pt-BR',
  locale: 'pt_BR',
  title: 'Adryan Chaves — Sites, Sistemas e Automações para Empresas',
  description:
    'Desenvolvedor independente em Almenara (MG): criação de sites e landing pages, automações e sistemas sob medida para empresas e profissionais liberais.',
  location: { city: 'Almenara', region: 'MG', country: 'BR' },
  available: true,
  cv: '/cv/adryan-chaves-cv.pdf',
} as const;

export const contact = {
  email: 'adryan1.dev@gmail.com',
  whatsapp: '5533988285010',
  linkedin: 'https://www.linkedin.com/in/adryan1-dev/',
  github: 'https://github.com/adryan1-dev',
} as const;

export const whatsappLink = (
  message = 'Olá, Adryan! Vim pelo seu site e quero conversar sobre uma solução para minha empresa.',
) => `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;

export const nav = [
  { label: 'Soluções', href: '/#servicos' },
  { label: 'Projetos', href: '/#projetos' },
  { label: 'Processo', href: '/#processo' },
  { label: 'Perfil', href: '/perfil' },
  { label: 'Contato', href: '/#contato' },
] as const;
