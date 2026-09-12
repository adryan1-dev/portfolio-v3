// Imagens de compartilhamento (Open Graph, 1200×630) para a home e para cada case.
// Uso: node scripts/og.mjs   → public/og/home.jpg e public/og/<slug>.jpg
import { mkdir, readdir, readFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const OUT = 'public/og';
const executablePath =
  process.env.CHROME_PATH ?? `${process.env.LOCALAPPDATA}/ms-playwright/chromium-1243/chrome-win64/chrome.exe`;

const dataUri = async (file) => {
  const type = file.endsWith('.png') ? 'png' : 'jpeg';
  return `data:image/${type};base64,${(await readFile(file)).toString('base64')}`;
};

// Frontmatter simples: só os campos de uma linha que a imagem usa
async function readProjects() {
  const dir = 'src/content/projects';
  const files = (await readdir(dir)).filter((f) => f.endsWith('.md'));
  return Promise.all(
    files.map(async (file) => {
      const text = await readFile(`${dir}/${file}`, 'utf8');
      const field = (name) => text.match(new RegExp(`^${name}: (.+)$`, 'm'))?.[1].trim();
      return {
        slug: file.replace(/\.md$/, ''),
        title: field('title'),
        category: field('category'),
        niche: field('niche'),
        status: field('status'),
        year: field('year'),
      };
    }),
  );
}

const base = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400&family=Manrope:wght@500;700&display=block">
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{width:1200px;height:630px;overflow:hidden;position:relative;background:#08090b;color:#f5f5f5;font-family:Manrope,sans-serif;-webkit-font-smoothing:antialiased}
    .mono{font-family:'Geist Mono',monospace}
    .wordmark{position:absolute;left:64px;top:56px;font-weight:700;font-size:26px;letter-spacing:-.02em}
    .crop{position:absolute}
    .crop::before{content:'';position:absolute;inset:-14px;pointer-events:none;background:
      linear-gradient(#ffffff38 0 0) top left/18px 2px,linear-gradient(#ffffff38 0 0) top left/2px 18px,
      linear-gradient(#ffffff38 0 0) top right/18px 2px,linear-gradient(#ffffff38 0 0) top right/2px 18px,
      linear-gradient(#ffffff38 0 0) bottom left/18px 2px,linear-gradient(#ffffff38 0 0) bottom left/2px 18px,
      linear-gradient(#ffffff38 0 0) bottom right/18px 2px,linear-gradient(#ffffff38 0 0) bottom right/2px 18px;background-repeat:no-repeat}
    .frame{width:100%;height:100%;overflow:hidden;border-radius:10px;background:#111318}
    .frame img{width:100%;height:100%;object-fit:cover;display:block}
    .dot{display:inline-block;width:12px;height:12px;border-radius:50%;background:#2f5bff;box-shadow:0 0 0 4px #2f5bff33;margin-right:14px;vertical-align:middle}
  </style>`;

function homeHtml(photo) {
  return `${base}<style>
    h1{position:absolute;left:64px;top:170px;width:660px;font-size:74px;font-weight:700;line-height:.98;letter-spacing:-.04em}
    h1 span{display:block}
    .role{position:absolute;left:64px;bottom:108px;font-size:26px;color:#9299a5}
    .status{position:absolute;left:64px;bottom:56px;font-size:22px;color:#9299a5}
    .photo{right:64px;top:64px;width:400px;height:502px}
    .photo img{object-position:50% 28%}
  </style>
  <p class="wordmark">adryan1.dev</p>
  <h1><span>Sites à altura</span><span>da empresa que</span><span>você construiu.</span></h1>
  <p class="role">Adryan Chaves, designer e desenvolvedor full stack</p>
  <p class="status"><span class="dot"></span>Disponível para novos projetos</p>
  <div class="crop photo"><div class="frame"><img src="${photo}"></div></div>`;
}

function projectHtml(project, cover) {
  return `${base}<style>
    .kicker{position:absolute;left:64px;top:62px;font-size:20px;color:#7c8390}
    .status{position:absolute;left:64px;top:168px;padding:6px 12px;border:2px solid #ffffff29;border-radius:6px;font-size:18px;color:#9299a5}
    h1{position:absolute;left:64px;top:222px;width:430px;font-size:60px;font-weight:700;line-height:1;letter-spacing:-.035em}
    .facts{position:absolute;left:64px;bottom:64px;width:430px;font-size:20px;line-height:1.5;color:#9299a5}
    .cover{left:540px;top:120px;width:596px;height:390px}
  </style>
  <p class="kicker mono">adryan1.dev / projetos</p>
  <p class="status mono">${project.status}</p>
  <h1>${project.title}</h1>
  <p class="facts mono">${project.category}<br>${project.niche}<br>${project.year}</p>
  <div class="crop cover"><div class="frame"><img src="${cover}"></div></div>`;
}

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath });

async function render(html, path, { width = 1200, height = 630, type = 'jpeg' } = {}) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path, type, ...(type === 'jpeg' ? { quality: 88 } : {}) });
  await page.close();
  console.log(`gerado ${path}`);
}

await render(homeHtml(await dataUri('src/assets/adryan.png')), `${OUT}/home.jpg`);
for (const project of await readProjects()) {
  const cover = await dataUri(`src/assets/covers/${project.slug}-wide.png`);
  await render(projectHtml(project, cover), `${OUT}/${project.slug}.jpg`);
}

// Ícone de tela inicial do iOS a partir do favicon
const favicon = (await readFile('public/favicon.svg')).toString('base64');
await render(
  `<style>*{margin:0}body{width:180px;height:180px;background:#08090b}img{display:block;width:180px;height:180px}</style><img src="data:image/svg+xml;base64,${favicon}">`,
  'public/apple-touch-icon.png',
  { width: 180, height: 180, type: 'png' },
);

await browser.close();
