import { writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const outputPath = process.argv[2] || '/tmp/satflow-24h.json';
const TIMEOUT_MS = 45_000;

function clean(text) {
  return String(text || '').replace(/\s+/g, ' ').trim();
}

function parseBtc(text) {
  const value = clean(text).replace(/,/g, '').match(/<?\s*([0-9]+(?:\.[0-9]+)?)/);
  if (!value) return null;
  const number = Number(value[1]);
  if (!Number.isFinite(number) || number < 0) return null;
  if (clean(text).startsWith('<')) return number / 2;
  return number;
}

async function clickOneDay(page) {
  const buttons = page.getByRole('button', { name: '1D', exact: true });
  await buttons.first().waitFor({ state: 'visible', timeout: TIMEOUT_MS });
  await buttons.first().click();
  await page.waitForTimeout(2500);
  await page.getByText(/1D Volume/i).first().waitFor({ state: 'visible', timeout: TIMEOUT_MS });
}

async function extractTable(page, type) {
  return page.evaluate(({ type }) => {
    const clean = (text) => String(text || '').replace(/\s+/g, ' ').trim();
    const candidates = [...document.querySelectorAll('table')];
    const table = candidates.find((node) => /1D Volume/i.test(node.innerText) && (type === 'ORDINAL' ? /Collection/i.test(node.innerText) : /Ticker/i.test(node.innerText)));
    if (!table) return null;

    const headerCells = [...table.querySelectorAll('thead th')].map((cell) => clean(cell.innerText));
    const nameIndex = headerCells.findIndex((value) => type === 'ORDINAL' ? /Collection/i.test(value) : /Ticker/i.test(value));
    const volumeIndex = headerCells.findIndex((value) => /1D Volume/i.test(value));
    if (nameIndex < 0 || volumeIndex < 0) return null;

    return [...table.querySelectorAll('tbody tr')].map((row) => {
      const cells = [...row.querySelectorAll('td')].map((cell) => clean(cell.innerText));
      return { name: cells[nameIndex], volumeText: cells[volumeIndex] };
    }).filter((row) => row.name && row.volumeText);
  }, { type });
}

async function extractRoleRows(page, type) {
  return page.evaluate(({ type }) => {
    const clean = (text) => String(text || '').replace(/\s+/g, ' ').trim();
    const rows = [...document.querySelectorAll('[role="row"]')];
    const header = rows.find((row) => /1D Volume/i.test(row.innerText) && (type === 'ORDINAL' ? /Collection/i.test(row.innerText) : /Ticker/i.test(row.innerText)));
    if (!header) return null;
    const headerCells = [...header.querySelectorAll('[role="columnheader"], [role="cell"], th, td')].map((cell) => clean(cell.innerText));
    const nameIndex = headerCells.findIndex((value) => type === 'ORDINAL' ? /Collection/i.test(value) : /Ticker/i.test(value));
    const volumeIndex = headerCells.findIndex((value) => /1D Volume/i.test(value));
    if (nameIndex < 0 || volumeIndex < 0) return null;

    return rows.slice(rows.indexOf(header) + 1).map((row) => {
      const cells = [...row.querySelectorAll('[role="cell"], td')].map((cell) => clean(cell.innerText));
      return { name: cells[nameIndex], volumeText: cells[volumeIndex] };
    }).filter((row) => row.name && row.volumeText);
  }, { type });
}

async function scrapeLeaderboard(page, url, type) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: TIMEOUT_MS });
  await clickOneDay(page);

  let rows = await extractTable(page, type);
  if (!rows || rows.length === 0) rows = await extractRoleRows(page, type);

  if (!rows || rows.length === 0) {
    const text = clean(await page.locator('body').innerText());
    throw new Error(`Could not parse Satflow ${type} 1D leaderboard. Page excerpt: ${text.slice(0, 1200)}`);
  }

  const assets = rows.map((row) => ({
    name: clean(row.name).replace(/^\d+\s+/, ''),
    type,
    volumeBtc: parseBtc(row.volumeText),
    source: 'Satflow'
  })).filter((row) => row.name && Number.isFinite(row.volumeBtc) && row.volumeBtc > 0);

  if (assets.length === 0) throw new Error(`Satflow ${type} leaderboard contained no positive 1D volumes`);
  return assets;
}

const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (compatible; MempoolSurfClub/1.0; +https://www.mempoolsurfclub.com)'
  });
  const page = await context.newPage();

  const ordinals = await scrapeLeaderboard(page, 'https://www.satflow.com/ordinals', 'ORDINAL');
  const runes = await scrapeLeaderboard(page, 'https://www.satflow.com/runes', 'RUNE');

  const payload = {
    generatedAt: new Date().toISOString(),
    window: '24h',
    source: 'Satflow public 1D leaderboards',
    ordinals,
    runes
  };

  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`Scraped ${ordinals.length} Ordinals and ${runes.length} Runes from Satflow 1D leaderboards.`);
} finally {
  await browser.close();
}
