// Screenshots + checagem de overflow horizontal por viewport.
// Uso: BASE_URL=http://localhost:4321/ WIDTHS=390,1440,1366x768 FULL=1 OUT=.shots node scripts/shots.mjs
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const base = process.env.BASE_URL ?? 'http://localhost:4321/';
const out = process.env.OUT ?? '.shots';
const full = process.env.FULL === '1';
const executablePath =
  process.env.CHROME_PATH ?? `${process.env.LOCALAPPDATA}/ms-playwright/chromium-1243/chrome-win64/chrome.exe`;

const heightFor = (w) => (w < 768 ? 844 : w < 1440 ? 1024 : w === 1440 ? 900 : 1080);
const sizes = (process.env.WIDTHS ?? '375,390,430,768,1024,1440,1920').split(',').map((entry) => {
  const [width, height] = entry.split('x').map(Number);
  return { name: entry, width, height: height || heightFor(width) };
});

await mkdir(out, { recursive: true });
const browser = await chromium.launch({ executablePath });

let failed = false;
for (const { name, width, height } of sizes) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1600);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  await page.screenshot({ path: `${out}/${name}.png`, fullPage: full });
  console.log(`${name}  overflow-x: ${overflow}px`);
  if (overflow > 0) failed = true;
  await page.close();
}

await browser.close();
process.exit(failed ? 1 : 0);
