// Capas dos projetos, em duas etapas reproduzíveis:
//   node scripts/covers.mjs capture [slug...]  → screenshots dos sites no ar em src/assets/covers/source
//   node scripts/covers.mjs compose [slug...]  → pôsteres 16:10 (wide) e 4:5 (tall) em src/assets/covers
import { mkdir, readFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const SOURCE = 'src/assets/covers/source';
const OUT = 'src/assets/covers';
const executablePath =
  process.env.CHROME_PATH ?? `${process.env.LOCALAPPDATA}/ms-playwright/chromium-1243/chrome-win64/chrome.exe`;

const projects = [
  { slug: 'marcia-chaves', url: 'https://marcia-trg.vercel.app/', background: '#3B8FD1' },
  { slug: 'team-mielle', url: 'https://lp-mielle.vercel.app/', background: '#22C55E' },
  { slug: 'ppg-marketing', url: 'https://adryan1-dev.github.io/ppg-site/', background: '#F2C200' },
  { slug: 'vale-fiber', url: 'https://vale-fiber.vercel.app/', background: '#D71F2B' },
  { slug: 'marina-avelar', url: 'https://marina-nutri.vercel.app/', background: '#6F7955' },
  { slug: 'lbook', url: 'https://lbook-woad.vercel.app/', background: '#D9E1F2' },
  { slug: 'deliverylens', diagram: true, background: '#0D0F12' },
];

const [mode, ...only] = process.argv.slice(2);
const selected = projects.filter((p) => only.length === 0 || only.includes(p.slug));
if (!['capture', 'compose'].includes(mode)) {
  console.error('Uso: node scripts/covers.mjs <capture|compose> [slug...]');
  process.exit(1);
}

await mkdir(SOURCE, { recursive: true });
const browser = await chromium.launch({ executablePath });

const viewports = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

async function capture(project) {
  for (const [kind, options] of Object.entries(viewports)) {
    const page = await browser.newPage(options);
    await page.goto(project.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `${SOURCE}/${project.slug}-${kind}.png` });
    await page.close();
    console.log(`capturado ${project.slug} ${kind}`);
  }
}

const fontLinks = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Manrope:wght@500;700&display=block">`;
const reset = `*{box-sizing:border-box;margin:0;padding:0}body{position:relative;overflow:hidden;-webkit-font-smoothing:antialiased}`;
const dataUri = async (file) => `data:image/png;base64,${(await readFile(file)).toString('base64')}`;

function screensWide({ background, desktop, mobile, host }) {
  return `${fontLinks}<style>${reset}
    body{width:2400px;height:1500px;background:${background};font-family:'Geist Mono',monospace}
    .browser{position:absolute;left:600px;top:250px;width:1880px;border-radius:20px;overflow:hidden;background:#0d0f12;box-shadow:0 60px 140px rgb(0 0 0/.35),0 0 0 1px rgb(0 0 0/.12)}
    .bar{height:64px;display:flex;align-items:center;padding:0 28px;color:#9299a5;font-size:22px}
    .browser img{display:block;width:100%}
    .phone{position:absolute;left:220px;top:500px;width:540px;border-radius:56px;overflow:hidden;border:12px solid #0b0c0e;background:#0b0c0e;box-shadow:0 60px 140px rgb(0 0 0/.4)}
    .phone img{display:block;width:100%;border-radius:44px}
  </style>
  <div class="browser"><div class="bar">${host}</div><img src="${desktop}"></div>
  <div class="phone"><img src="${mobile}"></div>`;
}

function screensTall({ background, mobile }) {
  return `<style>${reset}
    body{width:1200px;height:1500px;background:${background}}
    .phone{position:absolute;left:240px;top:180px;width:720px;border-radius:72px;overflow:hidden;border:16px solid #0b0c0e;background:#0b0c0e;box-shadow:0 60px 140px rgb(0 0 0/.4)}
    .phone img{display:block;width:100%;border-radius:56px}
  </style>
  <div class="phone"><img src="${mobile}"></div>`;
}

// DeliveryLens não tem interface: a capa é o próprio pipeline, desenhado como diagrama.
// Só as etapas implementadas no repositório (a camada gold ainda não existe).
const stages = [
  { name: 'API REST', note: 'ingestão com Python' },
  { name: 'Bronze', note: 'dados brutos', swatch: '#A9784A' },
  { name: 'Silver', note: 'dados validados', swatch: '#A7ADB7' },
  { name: 'PostgreSQL', note: 'carga para análise', output: true },
];
const node = (s) =>
  `<div class="node${s.output ? ' node--out' : ''}"><b>${s.swatch ? `<i style="background:${s.swatch}"></i>` : ''}${s.name}</b><span>${s.note}</span></div>`;

function diagram({ background, orientation }) {
  const wide = orientation === 'wide';
  const [api, bronze, silver, pg] = stages.map(node);
  return `${fontLinks}<style>${reset}
    body{width:${wide ? 2400 : 1200}px;height:1500px;background:${background};color:#f5f5f5;font-family:'Geist Mono',monospace}
    .grid{position:absolute;inset:0;background-image:linear-gradient(rgb(255 255 255/.035) 1px,transparent 1px),linear-gradient(90deg,rgb(255 255 255/.035) 1px,transparent 1px);background-size:80px 80px}
    .title{position:absolute;left:${wide ? 110 : 110}px;top:${wide ? 90 : 120}px;font-size:${wide ? 38 : 26}px;color:#7c8390}
    .compose{position:absolute;border:2px dashed rgb(255 255 255/.16);border-radius:28px;${wide ? 'left:90px;right:90px;top:230px;bottom:150px' : 'left:110px;right:110px;top:220px;bottom:130px'}}
    .compose>small{position:absolute;top:-19px;left:40px;padding:0 16px;background:${background};font-size:${wide ? 30 : 24}px;color:#7c8390}
    .flow{position:absolute;display:flex;align-items:center;${wide ? 'left:150px;right:150px;top:50%;transform:translateY(-22%)' : 'flex-direction:column;left:0;right:0;top:330px'}}
    .group{position:relative;display:flex;align-items:center;${wide ? '' : 'flex-direction:column'}}
    .group::before{content:'';position:absolute;border:3px solid #2f5bff;${wide ? 'left:0;right:0;top:-84px;height:44px;border-bottom:0;border-radius:12px 12px 0 0' : 'top:0;bottom:0;left:-70px;width:36px;border-right:0;border-radius:10px 0 0 10px'}}
    .group>small{position:absolute;font-size:${wide ? 32 : 24}px;color:#5b82ff;white-space:nowrap;${wide ? 'top:-146px;left:50%;transform:translateX(-50%)' : 'left:-86px;top:50%;transform:translate(-100%,-50%) rotate(-90deg);transform-origin:right center'}}
    .node{flex:none;${wide ? 'min-width:340px' : 'width:560px'};padding:${wide ? '48px 38px' : '26px 32px'};border:${wide ? 3 : 2}px solid rgb(255 255 255/.16);border-radius:18px;background:#111318;white-space:nowrap}
    .node--out{border-color:#2f5bff}
    .node b{display:flex;align-items:center;gap:16px;font-family:Manrope,sans-serif;font-weight:700;font-size:${wide ? 60 : 38}px;letter-spacing:-.02em}
    .node i{width:${wide ? 24 : 18}px;height:${wide ? 24 : 18}px;border-radius:5px}
    .node span{display:block;margin-top:14px;font-size:${wide ? 30 : 22}px;color:#9299a5}
    .line{flex:1;${wide ? 'height:3px;min-width:40px' : 'width:2px;height:44px;flex:none'};background:rgb(255 255 255/.28)}
    .line--out{background:#2f5bff}
  </style>
  <div class="grid"></div>
  <p class="title">deliverylens-analytics / pipeline</p>
  <div class="compose"><small>docker compose</small></div>
  <div class="flow">${api}<div class="line"></div><div class="group"><small>Apache Airflow · DAG</small>${bronze}<div class="line"></div>${silver}</div><div class="line line--out"></div>${pg}</div>`;
}

async function render(html, width, height, path) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path });
  await page.close();
  console.log(`gerado ${path}`);
}

async function compose(project) {
  const wide = `${OUT}/${project.slug}-wide.png`;
  const tall = `${OUT}/${project.slug}-tall.png`;
  if (project.diagram) {
    await render(diagram({ background: project.background, orientation: 'wide' }), 2400, 1500, wide);
    await render(diagram({ background: project.background, orientation: 'tall' }), 1200, 1500, tall);
    return;
  }
  const url = new URL(project.url);
  const host = `${url.host}${url.pathname}`.replace(/\/$/, '');
  const desktop = await dataUri(`${SOURCE}/${project.slug}-desktop.png`);
  const mobile = await dataUri(`${SOURCE}/${project.slug}-mobile.png`);
  await render(screensWide({ background: project.background, desktop, mobile, host }), 2400, 1500, wide);
  await render(screensTall({ background: project.background, mobile }), 1200, 1500, tall);
}

for (const project of selected) {
  if (mode === 'capture' && project.url) await capture(project);
  if (mode === 'compose') await compose(project);
}

await browser.close();
