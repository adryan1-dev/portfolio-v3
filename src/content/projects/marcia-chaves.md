---
title: Márcia Chaves
order: 1
category: Landing page
niche: Terapia
year: 2026
status: Protótipo publicado
summary: Landing page de uma terapeuta certificada em TRG em Almenara (MG), feita para acolher quem busca ajuda e levar a primeira conversa ao WhatsApp.
seoDescription: Case da landing page de Márcia Chaves, terapeuta certificada em TRG em Almenara (MG). Linguagem acolhedora, abordagens explicadas e contato pelo WhatsApp.
stack: [HTML, CSS, JavaScript, Node.js, Motion, Vercel]
link:
  label: Ver site
  href: https://marcia-trg.vercel.app/
cover:
  wide: ../../assets/covers/marcia-chaves-wide.png
  tall: ../../assets/covers/marcia-chaves-tall.png
  alt: Telas da landing page de Márcia Chaves no desktop e no celular, sobre fundo azul
gallery:
  - src: ../../assets/covers/source/marcia-chaves-desktop.png
    device: desktop
    alt: "Primeira dobra da landing page no desktop: título Um espaço seguro para compreender suas emoções e cuidar de você, botão Conversar com Márcia, foto da terapeuta com o selo TRG e faixa de credenciais."
    caption: Primeira dobra no desktop
  - src: ../../assets/covers/source/marcia-chaves-mobile.png
    device: mobile
    alt: "Landing page no celular: título, texto de apoio, botões Conversar com Márcia e Conhecer o atendimento, e atendimento online e presencial em Almenara/MG."
    caption: Primeira dobra no celular
case:
  lede: Uma landing page que apresenta o acompanhamento terapêutico com acolhimento e leva a primeira conversa para o WhatsApp.
  context: Terapeuta certificada em TRG, com formação em Terapia Cognitivo-Comportamental, Leitura Corporal e Inteligência Emocional, e atendimento online e presencial em Almenara (MG).
  objective: Explicar como o atendimento funciona e tornar o primeiro contato simples e sem pressão, pelo WhatsApp.
  role: Arquitetura de conteúdo, interface e desenvolvimento front-end.
  problem: Quem procura terapia costuma chegar inseguro. Precisa se reconhecer no que está vivendo, entender as abordagens e saber que o primeiro passo é só uma conversa.
  strategy: A página começa pelo acolhimento e pelas credenciais, ajuda a pessoa a se reconhecer em situações comuns, explica as abordagens e como funciona o atendimento, responde dúvidas e termina em uma chamada para o WhatsApp.
  direction:
    title: Direção visual
    body: A paleta sai do selo TRG. Marinho e azul conduzem títulos e botões, os fundos são claros e as outras cores do selo marcam os ícones das credenciais. Palavras grandes e esmaecidas ao fundo, como Mente, Escuta e Emoções, dão ritmo às seções.
    tokens:
      - label: Marinho
        value: "#16305A, títulos e botões"
        color: "#16305A"
      - label: Azul do selo
        value: "#3B8FD1, acento principal"
        color: "#3B8FD1"
      - label: Fundo claro
        value: "#F2F7FB, seções alternadas"
        color: "#F2F7FB"
      - label: Títulos
        value: Hind Vadodara
      - label: Destaque
        value: Crimson Text
      - label: Texto
        value: Hind Siliguri
  implementation:
    body: O site é gerado por um script de build em Node.js a partir de um arquivo central de configuração, que reúne textos, contatos, dúvidas e imagens. O resultado é HTML estático, publicado na Vercel.
    points:
      - Campos pendentes marcados entre colchetes e conferidos por um comando antes de publicar
      - "Animações com Motion: entrada do hero, paralaxe na foto e revelação ao rolar, desligadas com movimento reduzido"
      - WhatsApp flutuante que some quando a chamada final ou o rodapé aparecem
      - Dados estruturados ProfessionalService e Person, sitemap e robots gerados no build
  quality:
    title: Cuidado com o tema
    body: Um site de terapia precisa ser claro sobre o que oferece e sobre o que não oferece.
    points:
      - Aviso de que o acompanhamento não substitui tratamento médico ou psiquiátrico
      - Rodapé orienta procurar o serviço de emergência em situações de risco
      - Seção de depoimentos só aparece com relatos reais e autorizados
      - Política de privacidade própria
  limitations:
    - Apresentado como protótipo publicado. Não há métricas de agendamento ou contato publicadas.
    - Ainda não há depoimentos. A seção fica oculta até existirem relatos autorizados.
    - O repositório não é público.
---
