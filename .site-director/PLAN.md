# Portfólio Adryan: plano de implementação (v1)

Status: aguardando decisões e assets. Nada implementado.

## 1. Referência (ribeirodev.com): princípios, não layout

| Funciona | Princípio que vamos transferir | NÃO copiar |
|---|---|---|
| Hierarquia forte com títulos enormes | Display tipográfico como elemento de composição | Onest 900 e o peso ultra-black |
| Labels monospace | Mono só para metadados (índices, categoria, ano, status) | Rótulos `// comentário` e `~/arquivo.ts` |
| Palavra enfatizada com `_underscore_` | Uma assinatura visual própria e repetível | O motivo underscore (inclusive `ADRYAN_`) |
| Muito respiro entre seções | Seções com padding generoso e ritmo constante | — |
| Vanilla, rápido, fontes pré-carregadas | Pouco JS, fontes self-hosted | — |
| — | — | Sombras duras offset, várias cores de destaque, emojis na meta, bloco de stats, avatar circular no hero, seção "Carreira" |

A referência fala com recrutadores. Este site fala com donos de empresa, então a estrutura muda: projetos logo depois do hero, e depois serviços, processo, confiança e contato.

## 2. Conceito de identidade: "Ficha técnica"

A ideia é que o site pareça a ficha técnica de um estúdio: grid rigoroso, linhas finas, metadados em mono organizados em colunas e títulos grandes em grotesk. A precisão da mídia impressa entra na interface.

Assinatura visual: **marcas de corte** (crop marks ⌜ ⌝ ⌞ ⌟). Elas aparecem nas capas de projeto no hover/focus, no frame do hero e nos indicadores ativos. Remetem a design e precisão sem cair em clichê de dev (cursor piscando, underscore, `</>`).

Sistema de índice: toda seção abre com uma linha mono `02 — SERVIÇOS ............ [4]` e uma linha fina que se desenha no reveal.

## 3. Design tokens

### Cor
```
--bg:            #08090B   fundo principal
--bg-2:          #0D0F12   seções alternadas (uso raro)
--surface:       #111318   capas/placeholder, menu mobile
--text:          #F5F5F5
--text-muted:    #9299A5   (~6.9:1 sobre --bg)
--text-faint:    #7C8390   labels mono pequenos (validar ≥4.5:1 no bg e na surface)
--border:        rgba(255,255,255,0.08)
--border-strong: rgba(255,255,255,0.16)  hover/foco de linhas
--accent:        #2F5BFF   preenchimento do CTA primário (texto branco ≈5.2:1), dot de status, progress bar
--accent-text:   #5B82FF   links/estados ativos sobre fundo escuro (≈5.8:1)
--focus-ring:    #5B82FF   outline 2px offset 3px
```
Regra: o azul nunca aparece em mais de ~3 lugares por viewport.

### Tipografia (fluida, mobile-first)
- Sans: Geist Variable (self-hosted, subset latin). Mono: Geist Mono Variable.
- Alternativa em aberto: Schibsted Grotesk ou Hanken Grotesk nos títulos, se Geist + preto + azul ficar com cara de Vercel.

```
--fs-display: clamp(2.75rem, 1.6rem + 5.2vw, 7rem)   ≈45px@375 · 48@430 · 100@1440 · 112 teto
              lh .95 · tracking -0.045em · weight 600
--fs-h2:      clamp(2.25rem, 1.5rem + 3.2vw, 4.5rem)  lh 1.0 · -0.035em
--fs-h3:      clamp(1.5rem, 1.2rem + 1.2vw, 2.25rem)  lh 1.1 · -0.02em
--fs-lead:    clamp(1.125rem, 1rem + .4vw, 1.375rem)  lh 1.5
--fs-body:    1rem                                    lh 1.6
--fs-mono:    .75rem  uppercase · tracking .08em
--fs-mono-sm: .6875rem
```
Headings com `text-wrap: balance`, parágrafos com `text-wrap: pretty`, max ~60ch.

### Espaço / forma / motion
```
space: 4 8 12 16 24 32 48 64 96 128 192
--section-y: clamp(96px, 12vw, 192px)
--radius-sm: 4px (tags) · --radius-md: 12px (capas, foto) · sem pills exceto status dot
--ease-out:    cubic-bezier(.16, 1, .3, 1)
--ease-in-out: cubic-bezier(.65, 0, .35, 1)
--dur-fast: 200ms · --dur-base: 400ms · --dur-slow: 600ms
```

## 4. Grid e breakpoints (mobile-first)

| Faixa | Colunas | Margem lateral | Gutter |
|---|---|---|---|
| 0–767 (375/390/430) | 4 | 20px (24 a partir de 400) | 16 |
| 768–1023 | 8 | 32px | 20 |
| 1024–1439 | 12 | 40px | 24 |
| 1440–1919 | 12 | 64px | 24 |
| ≥1920 | 12 | auto (container 1680 máx.) | 32 |

O carrossel é full-bleed à direita: começa alinhado à coluna 1 e sangra até a borda da viewport.

## 5. Arquitetura / stack

**Astro (estável atual) + Tailwind v4 (`@theme` com os tokens) + TypeScript vanilla em `<script>`s.** Zero framework no cliente.

Por quê: HTML estático, praticamente sem JS por padrão, `astro:assets` gera AVIF/WebP com srcset, content collections tipadas para projetos, `@astrojs/sitemap`, e View Transitions nativas (morph da capa entre home e página do case). Deploy na Vercel.

Descartado: Next.js (runtime React desnecessário para site de conteúdo), GSAP/Lenis/Framer (CSS + IntersectionObserver + WAAPI resolvem; smooth-scroll atrapalha mobile e acessibilidade), Swiper (pesado). Embla (~7kb) fica como plano B se o drag nativo não ficar premium.

```
src/
  content.config.ts            schema zod de projects
  content/projects/*.md        frontmatter + corpo do case
  data/site.ts                 contato, links, disponibilidade, serviços, processo, stack, FAQ
  data/proof.ts                depoimentos/métricas (vazio → seção não renderiza)
  layouts/BaseLayout.astro     <head> SEO, fontes, JSON-LD, ClientRouter
  components/
    ui/       Button, ArrowLink, MonoLabel, SectionHeader, Rule, Tag, StatusDot, CropMarks, Container
    layout/   Header, MobileMenu, Footer, StickyCTA
    sections/ Hero, SelectedWork, Services, Process, Proof, About, Stack, FAQ, FinalCTA
    work/     ProjectCarousel, ProjectCard, ProjectCover, CarouselControls, CaseMeta, NextProject
  scripts/    carousel.ts, reveal.ts, header.ts, cursor.ts, menu.ts
  styles/     tokens.css, base.css, motion.css
  pages/      index.astro, projetos/[slug].astro, 404.astro
public/       robots.txt, favicon.svg, apple-touch-icon.png, og/*.png
```

Schema de projeto:
`title, slug, client, category, year, summary(≤140), tags[], cover.desktop(16:10), cover.mobile(4:5), coverAlt, accentColor?, liveUrl?, order, featured, challenge, solution, gallery[]`

## 6. Componentes reutilizáveis (contratos)

- `SectionHeader {index, label, title, aside?}`: linha mono + título h2 + linha fina.
- `Button {variant: primary|ghost, href, external?}`: 52px de altura, seta ↗ que desloca 2px no hover.
- `ArrowLink`: sublinhado animado com `background-size`.
- `MonoLabel`, `Tag` (texto mono com borda de 1px, sem cor).
- `StatusDot {label}`: ponto azul com pulso lento (desligado em reduced-motion).
- `CropMarks`: 4 cantos em pseudo-elementos, animados via `--crop-inset`.
- `IndexedRow {n, title, body, meta?}`: base de Serviços, Processo e FAQ.
- `ProjectCard` / `ProjectCover` (`<picture>` com art direction).

## 7. Estrutura da página (fluxo de conversão)

1. **Header**: `logo · Projetos Serviços Sobre Contato · [Vamos conversar ↗]`. Transparente no topo; depois de 24px de scroll ganha `rgba(8,9,11,.72)` + blur 12px + linha inferior. Link da seção ativa com dot azul.
2. **Hero**: eyebrow mono `CRIAÇÃO DE SITES PARA EMPRESAS`, H1, lead, 2 CTAs, `● Disponível para novos projetos`, linha discreta `Design & Desenvolvimento Web · Minas Gerais, Brasil`. No desktop, a capa do projeto 01 aparece parcialmente na dobra, para a prova de qualidade entrar já no primeiro scroll.
3. **Projetos selecionados**: carrossel (§8).
4. **Serviços**: 4 `IndexedRow` de largura total separados por linhas finas, com descrição sempre visível. Accordion só para "O que inclui", se houver conteúdo.
5. **Como funciona**: 4 colunas com linha de progresso no desktop; lista vertical com régua à esquerda no mobile.
6. **Prova social**: slot condicional, renderizado só com dados reais.
7. **Sobre + Ferramentas**: foto 4:5 (5 col) + texto (6 col). A stack vira uma sub-seção compacta: 3 colunas mono em texto, sem logos.
8. **Perguntas frequentes** (proposto): prazo, investimento, domínio/hospedagem, "consigo editar?", manutenção.
9. **CTA final**: eyebrow, H2 grande, texto, WhatsApp e e-mail.
10. **Footer**: logo, função, 4 links, ©.
+ **StickyCTA mobile** (proposto): barra inferior discreta que aparece depois do hero e some quando o CTA final entra na tela.
+ **/projetos/[slug]**: capa (morph), ficha técnica (cliente, segmento, entrega, ano, link), Desafio, Solução, galeria desktop+mobile, próximo projeto, CTA.

## 8. Sistema do carrossel

**Base nativa (funciona sem JS):**
```css
.track { display:flex; gap:var(--gutter); overflow-x:auto; scroll-snap-type:x mandatory;
         overscroll-behavior-x:contain; scroll-padding-inline:var(--margin);
         padding-inline:var(--margin); scrollbar-width:none; }
.card  { flex:0 0 var(--card-w); scroll-snap-align:start; }
.track::after { content:""; flex:0 0 calc(100vw - var(--card-w) - var(--margin)*2); } /* último card encaixa no início */
```
`--card-w`: 86vw (<768) · 72vw (768) · 70vw (1024) · 60vw (1440) · min(58vw,1040px) (1920).
Resultado: ~1.33 cards visíveis a 1024, ~1.55 a 1440, ~1.67 a 1920.

**Enhancement (`carousel.ts`, ~2–3kb):**
- Anterior/próximo: `scrollTo({left: card[i].offsetLeft - margin, behavior})`. Desabilitados nas pontas. Escondidos abaixo de 768.
- Contador `01 / 05`: índice pelo card mais próximo no `scrollend` (fallback: `scroll` com debounce de 100ms) + `aria-live="polite"`.
- Progress bar: `transform: scaleX(scrollLeft / maxScroll)` via rAF.
- Drag (só `pointer: fine`): pointer events + `setPointerCapture`, snap desligado durante o arraste, snap ao mais próximo na soltura, clique cancelado se o movimento passar de 6px, `user-select:none` e `draggable=false` nas imagens.
- Wheel: só o horizontal nativo (trackpad/shift). **Sem sequestrar o scroll vertical.**
- Teclado: ←/→ quando o foco está na região; Tab percorre os cards e cada card focado entra na tela.
- A11y: `<section aria-roledescription="carrossel" aria-label="Projetos selecionados">`, `<ul>` com `<li aria-roledescription="slide" aria-label="1 de 5">`.
- Mínimo de 4 projetos. Com menos que isso, trocar para lista editorial vertical.

**Card:** capa ≈73% da altura; abaixo `01` mono, título h3, `Categoria · Ano` mono, resumo, tags, `Ver projeto ↗`. Tudo sempre visível, nada depende de hover.
**Hover desktop:** imagem com scale 1.03 (600ms ease-out), crop marks entram (300ms), seta desloca, cursor-label `VER PROJETO` (só pointer:fine, lerp em rAF, só transform).

**Capas (produção):** template no Figma. Fundo com a cor/textura da marca do cliente, frame de navegador mínimo (barra fina com URL em mono, sem os 3 dots), desktop + mobile sobrepostos, logo pequeno do cliente. Exportar 2400×1500 (16:10) e 1200×1500 (4:5 mobile). Gerar widths 480/800/1200/1600/2000 com `sizes="(min-width:768px) 60vw, 86vw"`.

## 9. Mobile (experiência própria)

- Hero sem `100vh` forçado. H1 ~45–48px com reveal por palavra (independe da quebra) e `text-wrap: balance`. CTAs empilhados, largura total, 52px, primário primeiro.
- Header de 56px. Botão "Menu" em texto mono, sem ícone hambúrguer. Abre `<dialog>` em tela cheia com links grandes (32px) numerados 01–04, status de disponibilidade e CTA WhatsApp embaixo. Foco preso, Esc fecha, scroll travado, fechamento via ClientRouter ao navegar.
- Carrossel: swipe nativo, momentum, 86vw, próximo card aparecendo 14vw, contador + barra abaixo.
- Capas 4:5 via `<picture media>`: pôster vertical no celular.
- Targets ≥44px (links do footer com padding). `-webkit-tap-highlight-color: transparent` + estados `:active`.
- Sem cursor custom, deslocamentos de reveal menores (12px), nenhum parallax.
- Overflow: corrigir a causa, com `overflow-x: clip` em `body` só como rede de segurança. Teste automatizado `scrollWidth > innerWidth` nas 7 viewports.

## 10. Motion

| Momento | Spec |
|---|---|
| Load do hero (o único momento orquestrado) | eyebrow fade 0ms → palavras do H1 sobem por máscara (stagger 40ms, 600ms ease-out) → lead+CTAs fade-up em +300ms → capa peek 1.04→1. Total <1s |
| Section header | linha fina scaleX 0→1 (600ms) + label/título fade-up 16px |
| Listas (serviços, processo) | stagger de 60ms, uma vez |
| Capa hover | scale 1.03 · crop marks · seta |
| Links/botões | sublinhado 300ms · seta ↗ translate(2px,-2px) |
| Header | transição de bg/blur em 200ms |
| Home ↔ case | View Transitions com `transition:name` na capa (morph) |

**Não anima:** parágrafos soltos, ícones, fundo, números contando, carrossel automático.
Regras: estados iniciais só com `html.js` (sem JS o conteúdo aparece), só `transform/opacity`, IntersectionObserver com `once`. `prefers-reduced-motion`: reveals instantâneos, sem morph, `scroll-behavior: auto`, dot sem pulso. Medir o LCP do H1 com e sem reveal; se piorar, o H1 entra sem atraso.

## 11. SEO

- `<title>` home: `Criação de Sites para Empresas e Landing Pages | Adryan`
- description: `Criação de sites profissionais, landing pages e redesign para pequenas e médias empresas. Design e desenvolvimento sob medida, rápidos e responsivos. Atendimento em [cidade]/MG e todo o Brasil.`
- H1 contém "sites" e o eyebrow carrega o termo principal. H2 das seções com termos naturais (criação de sites, landing pages, redesign).
- JSON-LD: `ProfessionalService` (areaServed: [cidade], Minas Gerais, Brasil; founder `Person`; sameAs LinkedIn/GitHub) + `WebSite`. Nos cases: `CreativeWork` + `BreadcrumbList`. FAQ em HTML semântico.
- Cases indexáveis (`/projetos/total-incorporacoes`) com texto real, para ranquear por segmento ("site para incorporadora").
- canonical, `lang="pt-BR"`, `og:locale pt_BR`, OG 1200×630 por página (estático), favicon SVG + apple-touch, sitemap, robots.txt, 404.
- Fora do site (maior alavanca local): Perfil de Empresa no Google. Não criar páginas por cidade sem conteúdo real (doorway pages).

## 12. Performance: orçamento

- Mobile 4G: LCP < 1.8s · CLS < 0.05 · INP < 150ms · Lighthouse ≥95 nas 4 categorias.
- JS total da home < 15kb gz. CSS < 25kb gz.
- Fontes: 2 woff2 variáveis em subset latin, preload só da sans, `font-display: swap` + fallback com métricas ajustadas (size-adjust).
- Imagens: AVIF/WebP, `width/height` explícitos, só a primeira capa visível com `fetchpriority="high"`, o resto lazy.
- Analytics sem cookie (Vercel Analytics ou Umami): eventos `whatsapp_click`, `project_open`, `carousel_nav`, `email_click`.

## 13. Ordem de implementação (checkpoints)

1. Setup Astro + Tailwind v4 + tokens + fontes + BaseLayout/SEO base
2. Header + MobileMenu + Footer
3. Hero → **Hero Quality Gate** (screenshots 390 e 1440 para aprovação)
4. Collection de projetos + ProjectCover + carrossel → **checkpoint** (swipe real no celular)
5. Serviços, Processo, Sobre+Stack, Proof (slot), FAQ, CTA final, StickyCTA
6. Template de case
7. Passada de motion
8. Visual Audit (read-only, top 10) → Refinement
9. Mobile QA nas 7 viewports + Technical QA (Playwright: overflow, teclado, menu, carrossel)
10. Performance + SEO (sitemap, OG, JSON-LD, Lighthouse)
11. Deploy na Vercel (com confirmação) → Final QA

---

## 14. Revisão v2: conteúdo real e escopo dev (substitui §7 onde houver conflito)

### Dados confirmados (CV + GitHub)
- **Nome e local:** Adryan Chaves (CV: Adryan Chaves Torres Pinto), Almenara, MG, Vale do Jequitinhonha.
- **Contato:** adryan1.dev@gmail.com · WhatsApp 5533988285010 · linkedin.com/in/adryan1-dev · github.com/adryan1-dev.
- **Formação:** Tecnólogo em ADS, Descomplica, 2024–2026. Inglês avançado.
- **Experiência:**
  - Designer Gráfico, Propague Marketing (abr/2025–atual);
  - Representante de Suporte, Info Projekt (abr/2024–jan/2025).
- **CV:** `C:\Users\lavin\Downloads\main.pdf` → `public/cv/adryan-chaves-cv.pdf`.
- **Foto:** `C:\Users\lavin\Downloads\EU.jpeg`, 640×640 e 22KB. A luz e a cena combinam com a direção, mas a resolução não basta.
- **Stack de referência:** Astro 7.3 é a versão atual (vista em `C:\dev\portfolio-new`).

### Escopo: dois públicos na mesma narrativa
Os clientes (PMEs) vêm primeiro. Recrutadores e devs têm um caminho próprio que não disputa o hero.
- **Hero:** H1 comercial. O eyebrow diz a função: `ADRYAN CHAVES · DESIGNER & DESENVOLVEDOR FULL STACK`. O terceiro CTA é um link de texto, `Baixar CV ↓`.
- **Header:** entra o link `CV ↓` (mono, discreto) antes do CTA.
- **A home tem duas metades:**
  - Cliente: Hero → Projetos → Serviços → Processo
  - Perfil: Lab técnico → Sobre + Experiência + Ferramentas
  - Fechamento: Prova social (slot) → FAQ → CTA final (WhatsApp, e-mail, CV) → Footer

### Inventário de projetos
**Carrossel (4):**

| # | Projeto | Categoria · Ano | Status (honesto) | Link | Fonte visual |
|---|---|---|---|---|---|
| 01 | PPG Marketing | Site institucional · 2026 | Preview | adryan1-dev.github.io/ppg-site | screenshots no repo adryan-chaves-portfolio |
| 02 | ValeFiber | Site institucional (provedor de fibra) · 2026 | Preview | vale-fiber.vercel.app | idem |
| 03 | Lbook | Aplicação full stack · 2026 | Projeto autoral | lbook-woad.vercel.app | idem 01 |
| 04 | DeliveryLens Analytics | Engenharia de dados · 2026 | Projeto técnico | GitHub | capa tipográfica/diagrama (sem UI) |

A capa do DeliveryLens é um pôster-diagrama do pipeline (API → Bronze → Silver → Gold → SQL) em mono sobre a surface. É o único card sem screenshot, o que quebra o ritmo do carrossel de propósito e sinaliza o lado de engenharia.

**Lab técnico (aprovado):** lista curta depois do Sobre, com FlowSheet (Django, Playwright · 2026) e Crypto Pipeline (Python, Pandas, Telegram · 2025). Cada linha traz stack e link `GitHub ↗`.

**Decisões fechadas:**
- H1: "Sites à altura da empresa que você construiu."
- Wordmark: `adryan1.dev`
- Status visível nos cards

**Ficam de fora (decisão do usuário):** Total Incorporações.
**Também fora:** repos de curso (2023), portfolio-legacy, info-projekt (vazio) e ppg-site.vercel.app (não é seu, é da Pontchartrain Properties).

### Capas: pipeline reproduzível (sem Figma)
Em `scripts/covers/`:
1. O Playwright captura cada link em desktop 1440×900 e mobile 390×844.
2. Um template HTML monta a capa: fundo na cor da marca, frame mínimo, desktop + mobile sobrepostos.
3. Screenshot em 2400×1500 e 1200×1500, convertido para AVIF/WebP pelo astro:assets.

Dá para regenerar sempre que o site do cliente mudar. Cores: PPG amarelo/preto, Total tijolo/carvão, ValeFiber e Lbook tirados da própria interface.

### Componentes novos
- `LabRow {index, name, kind, summary, stack[], repo}`: usa `IndexedRow` como base.
- `Timeline {role, org, period, place, bullets≤2}`: experiência + formação.
- `CVLink`: `<a href="/cv/adryan-chaves-cv.pdf" download>` + evento `cv_download`.
- Página de case ganha `status` e `limitations` (deixa claro o que é mock ou protótipo).

### Ferramentas (agrupadas do CV, texto mono, sem logos)
- Frontend: JavaScript, TypeScript, React, Vite, HTML, CSS, Tailwind
- Backend e dados: Node.js, Express, PostgreSQL, SQL, Supabase, Python, Django
- DevOps e fluxo: Git, GitHub Actions, Docker, Vercel, Linux, Figma
- Automação e dados: Pandas, Airflow, Playwright

### SEO v2
- **title:** `Adryan Chaves — Criação de Sites e Desenvolvimento Full Stack`
- **areaServed:** Almenara, Vale do Jequitinhonha, Minas Gerais, Brasil.
- **JSON-LD:** `Person` (jobTitle, alumniOf, knowsAbout, sameAs) + `ProfessionalService`.

### Riscos abertos
1. **Honestidade dos cases.** O Total é protótipo independente, e o site real deles é totalmg.com.br. O PPG é um preview que ainda espera aprovação. Mostrar a marca exige o status visível e, de preferência, permissão.
2. **Foto em 640px** fica borrada em telas retina acima de ~320px de largura. Preciso do original.
3. **Camada de texto do CV:** o texto extraído do PDF sai com acentos quebrados ("aplica¸c˜oes"), então sistemas ATS leem errado. Recompilar o LaTeX com `\usepackage[T1]{fontenc}` + `\usepackage{lmodern}` (ou XeLaTeX com fontspec).
4. **CV vs README do Lbook:** o CV diz Express + GitHub Pages, o README atual diz Supabase + Vercel. O site mostra as duas camadas: "legado" e "app".
