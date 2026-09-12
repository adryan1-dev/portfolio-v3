// Gera o currículo em PDF a partir de cv/curriculo.html.
// Uso: node scripts/cv.mjs   → public/cv/adryan-chaves-cv.pdf
// PDF com texto real (acentos corretos para ATS), links clicáveis e marcação de estrutura.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { chromium } from 'playwright-core';

const executablePath =
  process.env.CHROME_PATH ?? `${process.env.LOCALAPPDATA}/ms-playwright/chromium-1243/chrome-win64/chrome.exe`;
const source = pathToFileURL(resolve('cv/curriculo.html')).href;
const output = 'public/cv/adryan-chaves-cv.pdf';

const browser = await chromium.launch({ executablePath });
const page = await browser.newPage();
await page.goto(source, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.pdf({
  path: output,
  format: 'A4',
  printBackground: true,
  margin: { top: '14mm', bottom: '14mm', left: '16mm', right: '16mm' },
  tagged: true,
  outline: true,
});
await browser.close();
console.log(`gerado ${output}`);
