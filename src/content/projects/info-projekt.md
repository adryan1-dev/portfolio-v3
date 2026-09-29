---
title: Info Projekt
order: 4
category: Site institucional
niche: Provedor de internet
year: 2026
status: Protótipo publicado
summary: Site de planos de fibra óptica que mostra as condições de cada cidade do Vale do Jequitinhonha e leva a contratação ao WhatsApp.
seoDescription: Case do site institucional da Info Projekt, provedor de fibra óptica no Vale do Jequitinhonha. Planos por cidade, TV incluída e atendimento pelo WhatsApp.
stack: [Next.js, React, Vercel]
link:
  label: Ver site
  href: https://info-projekt.vercel.app/
cover:
  wide: ../../assets/covers/info-projekt-wide.png
  tall: ../../assets/covers/info-projekt-tall.png
  alt: Telas do site da Info Projekt no desktop e no celular, sobre fundo vermelho
gallery:
  - src: ../../assets/covers/source/info-projekt-desktop.png
    device: desktop
    alt: "Primeira dobra do site da Info Projekt no desktop: título Fibra óptica com gente do Vale por perto, botões Ver planos para minha cidade e Falar com a Info, e o mascote da marca sobre fundo vermelho."
    caption: Primeira dobra no desktop
  - src: ../../assets/covers/source/info-projekt-mobile.png
    device: mobile
    alt: "Site da Info Projekt no celular: menu com o botão Planos, título em branco sobre fundo vermelho, dois botões de ação e os itens Fibra óptica, TV nos planos e Atendimento local."
    caption: Primeira dobra no celular
case:
  lede: Um site de planos de fibra óptica que deixa o visitante escolher a cidade antes de comparar velocidades e preços.
  context: Provedor regional de internet por fibra óptica, com atendimento no Vale do Jequitinhonha.
  objective: Apresentar os planos, mostrar as condições de cada localidade e levar o visitante ao atendimento por WhatsApp ou telefone.
  role: Arquitetura de conteúdo, interface e desenvolvimento front-end.
  problem: Quem procura internet residencial quer saber a velocidade, o preço e se o serviço chega à sua cidade. Como as condições mudam por localidade, a página precisa deixar isso claro antes de pedir a contratação.
  strategy: A página abre com a promessa de atendimento próximo e um seletor de cidade. Depois mostra os planos de Internet + TV e as condições, e termina com os canais de atendimento e a Central do Cliente.
  direction:
    title: Direção visual
    body: O vermelho da marca domina a primeira dobra e o mascote dá personalidade ao site. Mais abaixo, o fundo claro deixa os planos e os preços em primeiro plano. O verde aparece nos botões de contato.
    tokens:
      - label: Vermelho
        value: "#D3141D, marca e botões principais"
        color: "#D3141D"
      - label: Verde
        value: "#0F7B40, botões de contato"
        color: "#0F7B40"
      - label: Branco
        value: "#FFFFFF, fundo das seções de planos"
        color: "#FFFFFF"
      - label: Fonte
        value: Poppins
  implementation:
    body: Site em Next.js e React, publicado na Vercel, com seletor de localidade e seletor do tipo de plano.
    points:
      - Seletor com 16 cidades e a opção para quem não encontra a sua
      - Planos de 300 Mbps, 700 Mbps e 1 Gbps com TV Info Play incluída
      - Aviso de que os preços são do catálogo geral, até a cidade ser escolhida
      - Condições dos planos e canais de contato na mesma página
  quality:
    title: Informação e navegação
    body: O que decide a contratação fica na mesma página, com as condições ditas de forma direta.
    points:
      - Roteador em comodato, fidelidade de 12 meses e taxa de adesão por localidade informados
      - Botão de WhatsApp e telefone à vista
      - Link para a Central do Cliente e segunda via
  limitations:
    - O case usa apenas fatos visíveis no site publicado e não declara métricas de conversão, base de clientes ou alcance.
    - O repositório não é público.
---
