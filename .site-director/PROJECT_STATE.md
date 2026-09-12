PROJECT: Portfólio Adryan Chaves (comercial para PMEs + portfólio dev)
CURRENT_PHASE: 16 Final QA (parcial) / manutenção
STATUS: in-progress
CURRENT_OBJECTIVE: Publicado e em dia com o código; restam decisões do usuário (ver PENDENTES)

CHECKUP 2026-09-12 (17h):
- Produção estava atrás do código (rótulo "Preview", FAQ antigo, sem nota "Incluso") → redeploy feito e verificado
- CV em PDF era o LaTeX antigo (acentos quebrados, citava camada Gold) → regerado com `node scripts/cv.mjs` a partir de cv/curriculo.html; verificado em produção
- Git: commit inicial criado no main (sem remoto ainda)
- QA: overflow-x 0 em 375/390/430/768/1024/1440/1920 na home e nos 4 cases; nota "Incluso" de Serviços revisada em 390 e 1440
- Links externos: todos 200 (LinkedIn devolve 999 para bots, normal)
- Preview local do Astro 7 roda como daemon (`astro preview status|stop`)

DEPLOY:
- USER: publicar como vercel.app (sem domínio próprio por enquanto)
- Produção: https://adryan1-dev.vercel.app (projeto Vercel adryan1-dev, escopo adryan1-dev1), deploy via `npx vercel@59.16.0 deploy --prod --yes` (build remoto)
- site/canonical/sitemap/robots/JSON-LD usam https://adryan1-dev.vercel.app — trocar em astro.config.mjs, src/data/site.ts, public/robots.txt se houver domínio
- .vercelignore exclui .env* (token OIDC do link), .vercel, .site-director, dist, node_modules
- Verificado em produção: rotas 200, 404 real, CV PDF, OG, sitemap com 5 URLs
- Portfólio antigo continua em adryan-chaves.vercel.app (não mexido)
- OG images: scripts/og.mjs → public/og/{home,slug}.jpg + public/apple-touch-icon.png
- Visual audit aplicado: aria-live off no modo fixado, página 404, apple-touch-icon, quebra de linha do OG
- USER: rótulo "Preview" trocado por "Protótipo publicado" (PPG, ValeFiber)
- USER: FAQ e nota "Incluso" em Serviços: domínio, hospedagem e 3 meses de manutenção inclusos (site institucional, landing page, redesign)

PERFORMANCE (Lighthouse 12 local contra produção; PSI API sem cota):
- 1º deploy: home mobile 97/100/100/100 (LCP 1.8s, CLS 0, TBT 0, SI 4.2s); home desktop 100×4; case PPG mobile 100×4
- SI alto = animação de entrada do hero (terminava ~1.4s) → encurtada: rise 700ms, stagger 35ms, fades 600ms, delays 160–380ms
- Imagens: capas do carrossel todas lazy (nenhuma está na 1ª dobra); sizes do shot mobile no case corrigido para 320px
- Economia restante sinalizada (~60KiB, compressão AVIF) não vale a pena
- 2º deploy (produção): home mobile 99/100/100/100 (LCP 1.6s, SI 2.8s, CLS 0, TBT 0); home desktop 100×4 (LCP 0.3s); case PPG mobile 100×4 (LCP 1.3s)

BUILT (cursor invertido, 2026-09-12 — publicado e verificado em produção, commit e1e5288):
- USER: pediu componente React "inverted-cursor" (e antes "magnetic-cursor", descartado); decidiu portar para Astro + TS vanilla, sem React/GSAP/shadcn
- src/components/ui/InvertedCursor.astro (prop size=60) montado no BaseLayout: círculo branco mix-blend difference, lerp 0.2, loop de rAF para quando alcança o mouse; só pointerType mouse + (hover:hover and pointer:fine); reduced-motion segue sem atraso
- Seta nativa escondida só em texto/fundo (links/botões mantêm pointer, carrossel mantém grab); com <dialog> aberto a seta volta e o círculo some
- SelectedWork: .work__track no modo fixado cursor auto → inherit
- Testado (Playwright): posição, atraso, parada do loop, mouseleave/enter, menu, reduced motion, celular; overflow-x 0 nas 7 larguras
- Sobre o CTA azul o círculo fica amarelo (#d0a400, inversão do #2f5bff)

BUILT (recorte no scroll, 2026-09-12 — publicado e verificado em produção, commit e1e5288):
- USER: pediu um efeito de scroll "legal e pouco trabalhoso" (pesquisa em 21st.dev); escolhido reveal por clip-path inspirado em "Scroll trigger animations", reescrito em CSS puro
- /projetos/[slug]: capa e galeria abrem de clip-path inset(12% 9% / 8% 6%) até 0 e zoom 1.14→1 enquanto atravessam a tela; as marcas de corte ficam paradas no tamanho final
- CSS scroll-driven animations com @supports + reduced-motion; timeline nomeada (--crop) no frame porque overflow hidden o torna scroll container
- ARMADILHA: o minificador junta animation-timeline no atalho `animation` (inválido) → timeline em regra separada e mais específica
- Testado: recorte e zoom progressivos, abre 100%, galeria com raio 20px, reduced-motion estático, overflow-x 0 nas 7 larguras

REPOSITÓRIO (2026-09-12):
- GitHub: https://github.com/adryan1-dev/portfolio-v3 (PRIVADO: .site-director tem notas internas; tornar público é decisão do usuário)
- Vercel projeto adryan1-dev conectado ao repo (`vercel git connect`): push no main publica em produção
- Portfólio antigo: USER pediu tirar do domínio sem excluir o projeto. adryan-chaves.vercel.app já responde DEPLOYMENT_NOT_FOUND e não há projeto/alias com esse nome na conta Vercel adryan1-dev (8 projetos listados via API). Se existir, está em outra conta Vercel

BUILT (barra de contato no celular, 2026-09-12 — commit fa008a4):
- src/components/layout/StickyCta.astro no BaseLayout: status + botão WhatsApp, fixa no rodapé <768px
- Aparece depois de [data-sticky-cta-after] (hero na home, cabeçalho nos cases), some quando #contato entra ou já passou; inert quando oculta; 404 não mostra
- Testado em 375/390/430, case, 404, 768/1440 (oculta)

BUILT (sistema de motion, 2026-09-12):
- USER: achou o site "muito estático" → DECISÃO ANTERIOR REVOGADA ("motion só no hero, sem reveal nas seções")
- Windows do usuário com efeitos de animação LIGADOS (não era reduced-motion)
- src/scripts/reveal.ts: IntersectionObserver marca [data-reveal-group] com .is-in uma vez (rootMargin -10% embaixo)
- global.css: [data-reveal] sobe 24px + fade (900ms, --i × 80ms); .rise (RiseText.astro) palavras por máscara (--w × 40ms); [data-reveal-rule]::after traço de luz sobre a linha do topo (1400ms). Estado oculto só com html.js (script inline no head) e prefers-reduced-motion: no-preference. Não aninhar grupos
- Aplicado: SectionHeader, título/intro/cards do carrossel, linhas de Serviços, etapas do Processo, Sobre (título, textos, experiência, ferramentas), projetos técnicos, FAQ, CTA final (marcas de corte por último), blocos/resumo/próximo projeto dos cases
- Carregamento: header desce; foto do hero abre de baixo (clip-path) com zoom 1.18→1 e marcas de corte depois; cabeçalho do case com RiseText load + anim-fade
- LCP 1440 local: 280ms no título do hero (a foto não virou LCP)
- Testado: todos os grupos revelados após rolar (home 1440/390, case), nada invisível no fim, reduced-motion e sem JS mostram tudo, sem erros; barra, cursor, recorte e overflow sem regressão

BUILT (navbar dynamic island, 2026-09-12):
- USER: "aquele navbar dynamic island que eu gosto" (mesmo conceito do ppg-site src/motion/header.ts) + referência de cápsula preta com botão claro
- Header.astro: no topo largo e transparente; ao rolar além de --header-h (sentinel) vira cápsula centralizada fit-content (52px, 12px do topo; 48px/10px no celular), fundo rgb(13 15 18 / .92) com blur, borda line-strong, sombra
- Largura anima % → fit-content com interpolate-size: allow-keywords (sem suporte: sem transição de largura); botão "Vamos conversar" vira pílula clara; "Baixar CV" recolhe (≥1024); celular: wordmark + Menu
- Testado 1440/1024/768/390: centralizada, itens dentro, largura intermediária durante a transição, links navegam, Menu abre, volta ao topo; sem regressão (barra, motion, recorte, overflow)

PENDENTES COM O USUÁRIO:
- Analytics sem cookie (Vercel Analytics/Umami + eventos whatsapp_click, project_open, cv_download) não implementado
- PPG: trocar status quando a Propague aprovar
- Final QA restante: teclado/menu/carrossel em produção, revisão visual do CV em PDF

BUILT (Fase 08, passo 1–3):
- Astro 7.3.2 + Tailwind 4.3 + fonts API (fontsource Geist/Geist Mono) + sitemap; build e astro check limpos
- tokens em src/styles/global.css; dados em src/data/site.ts
- Header (scroll blur via sentinel, dialog mobile), Footer, Button, Status
- Hero: H1 3 linhas fixas com reveal por palavra, ficha técnica (dl), foto src/assets/adryan.png (1122×1402) com crop marks, folha de contato com screenshots reais (desktop ≥768 / mobile <768)
- scripts/shots.mjs: screenshots + overflow nas 7 larguras (usa chromium-1243 do cache)
- Overflow-x = 0 em 375/390/430/768/1024/1440/1920

BUILT (Fase 08, passo 4 — carrossel, aguardando aprovação):
- Collection `projects` (src/content.config.ts + src/content/projects/*.md): título, ordem, categoria, ano, status honesto, resumo, stack, link, capas wide/tall
- scripts/covers.mjs: `capture` (Playwright nos sites no ar, 2x) + `compose` (pôster 2400×1500 e 1200×1500; fundo na cor da marca, browser frame mínimo com URL, phone com bezel); DeliveryLens = diagrama do pipeline
- Lbook: captura ao vivo cai no login → source usa screenshots antigos da estante (src/assets/work/lbook-*)
- SelectedWork + ProjectCard + src/scripts/carousel.ts: scroll-snap nativo, botões ←/→ (≥768), contador 01/04 aria-live, barra de progresso, setas do teclado, drag com mouse (sem abrir link), crop marks + zoom 1.03 no hover/foco
- Testado: botões/limites, ArrowLeft, drag 400px avança 1 card sem popup, snap mobile 230→351px; overflow-x 0 nas 7 larguras
- Hero: tira de miniaturas removida (duplicava o carrossel logo abaixo) — reversível
- USER: cards menores para escalar com mais projetos → --card-w 84vw (<768) · 46vw (768) · 40vw (1024) · 34vw (1440) · min(30vw,560px) (1920); meta em coluna única, resumo com clamp de 3 linhas, CTA alinhado no rodapé do card
- USER: campo `niche` na collection, exibido como "Categoria / Nicho" + ano (PPG: Agência de marketing · ValeFiber: Provedor de internet · Lbook: Gestão de leituras · DeliveryLens: Delivery)
- Contador mostra intervalo visível ("01–03 / 04"; mobile "02 / 04"); prev a partir do fim corrigido
- Capa wide do DeliveryLens ampliada para legibilidade em cards pequenos
- Links dos cards apontam para site/app/GitHub externos até existirem páginas de case

BUILT (Fase 08, passo 5 — seções restantes):
- USER: hero mais alto para ficha técnica (Serviços/Base/Agenda) caber na 1ª dobra no desktop → padding menor, --fs-display máx 6.5rem, lead 44ch, foto em grid-row 2/5
- Serviços (linhas editoriais, "Pedir orçamento" com mensagem de WhatsApp por serviço), Como funciona (4 etapas), Sobre (texto + experiência/formação do CV + ferramentas em texto), Outros projetos técnicos (FlowSheet, Crypto Pipeline), Proof (só renderiza com depoimentos reais em src/data/proof.ts), FAQ (details/summary exclusivo), CTA final (#contato, crop marks, WhatsApp, e-mail, linha para recrutadores)
- Conteúdo centralizado em src/data/content.ts; SectionHeader reutilizável; .section = metade de --section-y em cada lado
- Sem reveal de scroll nas seções (motion só no load do hero)
- QA visual por seção (1440/768/390): corrigidos grid de Serviços no desktop (especificidade do :not), colunas do Sobre (nth-of-type contava o div do texto), espaços antes de links inline (Astro remove whitespace com quebra de linha → usar {' '}), período da experiência sem quebra
- Hero: ficha técnica visível na 1ª dobra em 1440×900, 1536×864, 1920×1080 e 1366×768 (no limite)
- PENDENTE revisão do usuário: respostas do FAQ (domínio/hospedagem, atualizações, videochamada) são compromissos comerciais; Claude Code/Codex não listados em Ferramentas

BUILT (Fase 08, passo 6 — pedidos do usuário):
- USER: carrossel fixado com scroll vertical → horizontal (sticky 100vh, altura do pin = 100vh + percurso, mapeamento 1:1, volta ao fluxo no fim). Só em (min-width:1024px) and (min-height:700px) and (pointer:fine) and reduced-motion off; celular/tablet mantêm swipe nativo. Botões/teclado rolam a página até o card; foco por teclado traz o card para a tela; se não houver percurso (<40px) não fixa
- Telas 700–899px de altura: cards enxutos no modo fixado (sem intro, resumo e tags); card-w limitado pela altura da janela
- Testado com roda do mouse real em 1440×900, 1366×768, 1536×864; mobile 390 sem pin
- USER: Serviços com "Para quem é" (audience) logo abaixo do nome
- USER: Ferramentas com ícones simple-icons (SVG inline no build, monocromático, cor da marca no hover; marcas quase pretas usam cor do texto). Removidos SQL e Playwright (sem ícone), adicionado Django; Idiomas em linha de texto

BUILT (Fase 08, passo 7 — páginas de case):
- /projetos/[slug] (getStaticPaths da collection): voltar, número + status, H1, lede, botões (link externo + código), ficha (categoria, nicho, ano, papel), capa com crop marks, resumo (contexto/objetivo/tecnologias), O desafio, Direção (tokens com amostras de cor no PPG), galeria desktop + mobile, Implementação, Qualidade (opcional), "O que este case não afirma", próximo projeto, CTA final
- Conteúdo dos cases vem do portfólio anterior (adryan-chaves-portfolio/src/data/projects.ts), já verificado pelo usuário no repositório
- Cards do carrossel agora levam para o case ("Ver case →"); link externo fica dentro do case
- JSON-LD por página: CreativeWork + BreadcrumbList (BaseLayout aceita prop schema)
- CORREÇÃO DE FATO: DeliveryLens não tem camada gold implementada (limitação documentada no repo) → resumo e capa agora API → Bronze → Silver → PostgreSQL. O CV do usuário cita "Bronze, Silver e Gold": avisar para ajustar

USER DECISIONS (checkpoint hero):
- Fonte principal Manrope (títulos, subtítulos, texto, botões, nav); Geist Mono só para labels técnicos pequenos, badges e detalhes dev
- Hero: botão "Baixar CV" em destaque ao lado de "Ver projetos", variante light (#F5F5F5, texto escuro) — azul segue exclusivo do CTA WhatsApp

DESIGN NOTES (skill frontend-design):
- Labels mono em sentence case, sem CAIXA ALTA; números só onde há sequência real
- Hero = um momento de motion; ↗ só em links externos

APPROVED_DECISIONS:
- Dois públicos: PMEs primeiro, recrutadores/devs com caminho próprio (CV, Lab técnico, Experiência)
- Botão Baixar CV (header + hero como link de texto + CTA final) usando main.pdf
- Contato: adryan1.dev@gmail.com · WhatsApp 5533988285010 · linkedin.com/in/adryan1-dev · github.com/adryan1-dev
- Local: Almenara, MG (Vale do Jequitinhonha)
- Carrossel: PPG Marketing, ValeFiber, Lbook, DeliveryLens (capa diagrama) — Total Incorporações EXCLUÍDO pelo usuário
- Lab técnico: lista curta (FlowSheet, Crypto Pipeline) com stack + GitHub, após Sobre
- Headline H1: "Sites à altura da empresa que você construiu."
- Wordmark: adryan1.dev
- Status honesto visível nos cards (Preview / Projeto autoral / Projeto técnico)
- Defaults aceitos por omissão: WhatsApp CTA primário, cases internos, capas 16:10+4:5, FAQ, StickyCTA mobile
- Tokens base do brief; 1 accent azul; dark editorial
- Mobile-first, breakpoint 768; QA em 375/390/430/768/1024/1440/1920
- Não copiar ribeirodev (underscore, // labels, sombras duras, multicores, emojis, stats)

PROPOSED (pendente):
- Conceito "Ficha técnica" + crop marks; Astro 7 + Tailwind v4 + TS vanilla; Vercel
- Accent #2F5BFF (fill) / #5B82FF (texto)
- Capas via pipeline Playwright (16:10 + 4:5); cases internos /projetos/[slug]
- WhatsApp CTA primário; FAQ; StickyCTA mobile

IMPORTANT_CONSTRAINTS:
- Não inventar números, depoimentos, clientes; status honesto por case (Preview/Protótipo/Autoral)
- ppg-site.vercel.app NÃO é do Adryan; PPG = adryan1-dev.github.io/ppg-site
- Nada depende de hover; targets ≥44px; zero overflow horizontal; sem scroll-jacking

NEXT_STEP: Decisões do usuário em PENDENTES (GitHub remoto, StickyCTA, analytics)

BLOCKERS:
- nenhum (domínio: decidido usar adryan1-dev.vercel.app; OG images produzidas)

SPECIALIST_SKILLS_USED:
- frontend-design, copywriting

CODEX_HANDOFF_STATUS: none
