---
title: Team Mielle
order: 2
category: Landing page
niche: Personal trainer
year: 2026
status: Protótipo publicado
summary: Landing page de uma personal trainer com atendimento presencial e online, feita para mostrar o método e levar a primeira conversa ao WhatsApp.
seoDescription: Case da landing page da Team Mielle, da personal trainer Stéfane Mielle. Identidade preta e verde, método em quatro etapas e conversa pelo WhatsApp.
stack: [HTML, CSS, JavaScript, Node.js, Sharp, Vercel]
link:
  label: Ver site
  href: https://lp-mielle.vercel.app/
cover:
  wide: ../../assets/covers/team-mielle-wide.png
  tall: ../../assets/covers/team-mielle-tall.png
  alt: Telas da landing page da Team Mielle no desktop e no celular, sobre fundo verde
gallery:
  - src: ../../assets/covers/source/team-mielle-desktop.png
    device: desktop
    alt: "Primeira dobra da landing page no desktop: foto de Stéfane Mielle à esquerda e, à direita, o título Seu treino. Seu ritmo. Sua evolução., com evolução em verde neon, e o botão Falar com a Stéfane."
    caption: Primeira dobra no desktop
  - src: ../../assets/covers/source/team-mielle-mobile.png
    device: mobile
    alt: "Landing page no celular: foto de Stéfane Mielle no topo e, logo abaixo, painel preto com o título Seu treino. Seu ritmo. Sua evolução. e o botão Falar com a Stéfane."
    caption: Primeira dobra no celular
case:
  lede: Uma landing page que apresenta o método de uma personal trainer e leva a primeira conversa para o WhatsApp.
  context: Stéfane Mielle é personal trainer e bacharel em Educação Física. Atende presencialmente e online, com treinos personalizados para emagrecimento, condicionamento e hipertrofia, sob a marca Team Mielle.
  objective: Mostrar que o treino é personalizado e que iniciantes são bem-vindos, e fazer da conversa pelo WhatsApp o próximo passo.
  role: Arquitetura de conteúdo, interface, tratamento de imagens e desenvolvimento front-end.
  problem: Quem procura uma personal quer saber se ela é a pessoa certa antes de mandar mensagem. Sem depoimentos nem resultados para mostrar, a confiança precisava vir do método, da formação e da presença da própria Stéfane.
  strategy: A página abre com a Stéfane e as credenciais, explica por que personalizar, mostra o método em quatro etapas, separa presencial e online e apresenta os objetivos. Depois vêm a Stéfane em primeira pessoa, o que esperar do acompanhamento e as dúvidas, e a página fecha com a chamada para o WhatsApp.
  direction:
    title: Direção visual
    body: O conceito é Força com direção. Preto, grafite, branco e fotografia ocupam a maior parte da tela, e o verde conduz a atenção e a conversão. O neon é usado como sinal, uma palavra por bloco, como evolução no título do hero. Todas as fotos passam pelo mesmo tratamento, com contraste alto e sombras puxadas para o verde, para se fundirem ao fundo preto.
    tokens:
      - label: Verde
        value: "#22C55E, botões e indicadores"
        color: "#22C55E"
      - label: Neon
        value: "#39FF88, um trecho de impacto por bloco"
        color: "#39FF88"
      - label: Preto
        value: "#070A08, fundo principal"
        color: "#070A08"
      - label: Títulos
        value: Bebas Neue
      - label: Subtítulos e botões
        value: Sora
      - label: Texto
        value: Inter
  implementation:
    body: Página estática em HTML, CSS e JavaScript, sem framework, com tokens em CSS custom properties e uma folha de estilo por grupo de seções. WhatsApp e Instagram ficam em um arquivo de configuração. Publicada na Vercel.
    points:
      - Script em Node.js com Sharp trata as fotos e gera AVIF, WebP e JPG, com origem e licença de cada imagem registradas
      - "Botões de contato lidos da configuração: sem número, levam ao Instagram; sem os dois, não aparecem"
      - Barra de WhatsApp no celular que só aparece quando nenhum outro botão de contato, o FAQ ou o rodapé estão na tela
      - FAQ com respostas no HTML, que a busca do navegador encontra e abre
      - Menu mobile com foco preso, fechamento por Esc e conteúdo de fundo inerte
  quality:
    title: Sem promessa de atalho
    body: Sites de personal trainer costumam prometer resultado. Este só afirma o que a Stéfane pode sustentar.
    points:
      - Sem depoimentos, antes e depois, preços ou número de alunos
      - Cenas de treino vêm de bancos de imagem ou de uma imagem gerada por IA, e ninguém nelas é apresentado como aluna
      - Faixa de credenciais com botão de pausa, parada quando o movimento reduzido está ativo
      - Imagem de compartilhamento abaixo de 300 KB, o limite do WhatsApp
  limitations:
    - Apresentado como protótipo publicado. Não há métricas de contato publicadas.
    - Domínio próprio, local do atendimento presencial e preços ainda não foram definidos.
    - O repositório não é público.
---
