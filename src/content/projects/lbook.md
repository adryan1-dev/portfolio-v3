---
title: Lbook
order: 4
category: Aplicação full stack
niche: Gestão de leituras
year: 2026
status: Projeto autoral
summary: Aplicação para catalogar livros, acompanhar o progresso de leitura e guardar resenhas, com login e estante individual por conta.
seoDescription: Case do Lbook, aplicação full stack para organizar leituras, acompanhar o progresso e registrar resenhas. React, Supabase, Express e PostgreSQL.
stack: [React, Vite, Tailwind CSS, Supabase, PostgreSQL]
link:
  label: Abrir app
  href: https://lbook-woad.vercel.app/
repo: https://github.com/adryan1-dev/lbook
cover:
  wide: ../../assets/covers/lbook-wide.png
  tall: ../../assets/covers/lbook-tall.png
  alt: Telas do Lbook no desktop e no celular, com a estante de livros
gallery:
  - src: ../../assets/covers/source/lbook-desktop.png
    device: desktop
    alt: "Estante do Lbook no desktop: busca, filtros por status e grade de livros com capa, autor e avaliação."
    caption: Estante no desktop
  - src: ../../assets/covers/source/lbook-mobile.png
    device: mobile
    alt: "Estante do Lbook no celular: navegação, busca, filtros de status e capas em duas colunas."
    caption: Estante no celular
case:
  lede: Uma aplicação para organizar leituras, acompanhar o progresso e registrar resenhas em um fluxo único.
  context: Projeto autoral, um caderno pessoal de leituras.
  objective: Organizar leituras, acompanhar o progresso e registrar resenhas em um só lugar.
  role: Produto, interface, API, banco de dados e automação de deploy.
  problem: Leituras ficam espalhadas entre listas, notas e lembranças. Status, progresso e opinião raramente ficam no mesmo lugar.
  strategy: Cada livro concentra um único registro com status, página atual, avaliação por critérios e resenha. A interface muda conforme o status para mostrar só o que faz sentido naquele momento.
  direction:
    title: Arquitetura técnica
    body: Uma única base de front-end fala com três camadas de dados por meio de adaptadores. Isso permite uma demo estática, o app com login e um modo local com API própria.
    points:
      - "App: React na Vercel com Supabase (Auth, PostgreSQL com RLS e Storage)"
      - "Legado: API Express com PostgreSQL e upload de capas com Multer"
      - "Demo: dados no localStorage, publicada por GitHub Actions"
  implementation:
    body: React, Vite e Tailwind CSS na interface, Node.js e Express na API, PostgreSQL com migrações SQL e GitHub Actions no deploy da demo.
    points:
      - "Status: minha biblioteca, quero comprar, lendo, lido e abandonei"
      - Busca por título ou autor sem diferenciar acentos
      - "Avaliação em quatro critérios: enredo, personagens, edição e final"
      - Barra de progresso por página durante a leitura
      - CRUD completo com upload de capa
  limitations:
    - A demo guarda os dados só no navegador e não sincroniza entre dispositivos.
    - A confirmação de e-mail está desativada na primeira versão.
    - O modo legado exige PostgreSQL local.
    - Projeto autoral, sem dados de uso publicados.
---
