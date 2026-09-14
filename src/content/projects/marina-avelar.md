---
title: Marina Avelar
order: 5
category: Landing page
niche: Nutrição
year: 2026
status: Projeto conceitual
summary: Estudo de site para uma nutricionista fictícia, feito para testar linguagem, estrutura e direção de arte de uma presença digital na área da saúde.
seoDescription: Case do projeto conceitual Marina Avelar, site de uma nutricionista fictícia. Paleta oliva e creme, atendimento explicado e ficção declarada na página.
stack: [HTML, CSS, JavaScript, Vercel]
link:
  label: Ver site
  href: https://marina-nutri.vercel.app/
repo: https://github.com/adryan1-dev/site-nutri
cover:
  wide: ../../assets/covers/marina-avelar-wide.png
  tall: ../../assets/covers/marina-avelar-tall.png
  alt: Telas do site conceitual Marina Avelar no desktop e no celular, sobre fundo verde-oliva
gallery:
  - src: ../../assets/covers/source/marina-avelar-desktop.png
    device: desktop
    alt: "Primeira dobra do site no desktop: título Uma alimentação que acompanha a sua rotina e os seus objetivos., botões Ver conceito e Conhecer o projeto, e retrato em arco da nutricionista fictícia."
    caption: Primeira dobra no desktop
  - src: ../../assets/covers/source/marina-avelar-mobile.png
    device: mobile
    alt: "Site no celular: cabeçalho Marina Avelar, nutricionista fictícia, título em serifa, botões Ver conceito e Conhecer o projeto e o aviso Profissional, imagens e dados fictícios."
    caption: Primeira dobra no celular
case:
  lede: Um estudo de presença digital para a área da saúde, com uma nutricionista fictícia e a ficção declarada na própria página.
  context: Projeto conceitual para portfólio. Marina Avelar, os textos, os dados e as imagens são fictícios.
  objective: Mostrar como um site de nutrição pode apresentar atendimento, processo e modalidades de consulta de forma a gerar confiança, sem usar dados de uma profissional real.
  role: Arquitetura de conteúdo, interface e desenvolvimento front-end.
  problem: Quem procura uma nutricionista quer entender se o atendimento cabe na própria rotina e como é a primeira consulta. Um estudo sem cliente precisa mostrar isso sem ser confundido com um consultório de verdade.
  strategy: A página apresenta três frentes de atendimento, a profissional, o acompanhamento em quatro etapas, as consultas presencial e online e as dúvidas antes da primeira consulta. Os botões de agendamento levam ao aviso de que o projeto é conceitual.
  direction:
    title: Direção visual
    body: Creme, oliva e bronze criam um ambiente calmo. Títulos em serifa, retratos com cantos em arco e círculos finos em bronze dão um tom editorial, e a seção do processo passa para o grafite para marcar a sequência de etapas.
    tokens:
      - label: Oliva
        value: "#6F7955, botões e chamada final"
        color: "#6F7955"
      - label: Creme
        value: "#F5F0E6, seções alternadas"
        color: "#F5F0E6"
      - label: Bronze
        value: "#C58B68, números, detalhes e foco"
        color: "#C58B68"
      - label: Títulos
        value: Maitree
      - label: Texto
        value: Open Sans
  implementation:
    body: Uma página em HTML, com CSS e JavaScript no próprio arquivo, sem dependências nem etapa de build, e uma página de privacidade separada. Publicada na Vercel.
    points:
      - Menu mobile com aria-expanded, fechamento por Esc e trava de scroll
      - Revelação ao rolar com IntersectionObserver, desligada com movimento reduzido
      - FAQ com details e summary nativos
      - Link para pular ao conteúdo e foco visível em bronze
  quality:
    title: Ficção declarada
    body: Um site de saúde com uma profissional inventada só funciona como estudo se ninguém o confundir com um consultório real.
    points:
      - Aviso de ficção no hero, na faixa de informações, na chamada final e no rodapé
      - Retratos gerados por IA, identificados assim no texto alternativo
      - Sem telefone, endereço, registro profissional ou canal de agendamento
      - Página de privacidade informa que não há cadastro, formulário nem área de pacientes
  limitations:
    - Projeto conceitual. Não há cliente, atendimento nem métricas.
    - Página única, sem CMS nem backend. O conteúdo é atualizado no código.
---
