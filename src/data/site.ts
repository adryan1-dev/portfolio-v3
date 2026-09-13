export const site = {
  name: 'adryan1.dev',
  person: 'Adryan Chaves',
  role: 'Designer e desenvolvedor full stack',
  url: 'https://www.adryan1dev.com.br',
  lang: 'pt-BR',
  locale: 'pt_BR',
  title: 'Adryan Chaves — Criação de Sites e Desenvolvimento Full Stack',
  description:
    'Criação de sites profissionais, landing pages e redesign para pequenas e médias empresas. Design e desenvolvimento full stack sob medida, de Almenara (MG) para todo o Brasil.',
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
  message = 'Olá, Adryan! Vim pelo seu site e quero conversar sobre um projeto.',
) => `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;

export const nav = [
  { label: 'Projetos', href: '/#projetos' },
  { label: 'Serviços', href: '/#servicos' },
  { label: 'Sobre', href: '/#sobre' },
  { label: 'Contato', href: '/#contato' },
] as const;
