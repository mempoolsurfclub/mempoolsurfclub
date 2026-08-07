import { writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const outputPath = process.argv[2] || '/tmp/satflow-24h.json';
const TIMEOUT_MS = 45_000;

function clean(text) {
  return String(text || '').replace(/\s+/g, ' ').trim();
}

function parseBtc(text) {
  const normalized = clean(text).replace(/,/g, '');
  if (!normalized || normalized.startsWith('<')) return null;
  const value = normalized.match(/([0-9]+(?:\.[0-9]+)?)/);
  if (!value) return null;
  const number = Number(value[1]);
  return Number.isFinite(number) && number > 0 ? number : null;
}

async function clickOneDay(page) {
  await page.waitForTimeout(4000);

  const candidates = [
    page.getByText('1D', { exact: true }),
    page.locator('button, [role="button"], a').filter({ hasText: /^1D$/ }),
    page.locator('text="1D"')
  ];

  let clicked = false;
  for (const candidate of candidates) {
    try {
      if (await candidate.count()) {
        await candidate.first().click({ timeout: 5000, force: true });
        clicked = true;
        break;
      }
    } catch (error) {
      // Try the next rendered form of the control.
    }
  }

  if (!clicked) {
    clicked = await page.evaluate(() => {
      const nodes = [...document.querySelectorAll('button, [role="button"], a, div, span')];
      const target = nodes.find((node) => String(node.textContent || '').trim() === '1D');
      if (!target) return false;
      target.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      return true;
    });
  }

  if (!clicked) {
    const text = clean(await page.locator('body').innerText().catch(() => ''));
    throw new Error(`Satflow 1D control not found. Page excerpt: ${text.slice(0, 1600)}`);
  }

  await page.waitForTimeout(3500);
  const bodyText = clean(await page.locator('body').innerText());
  if (!/1D Volume/i.test(bodyText)) {
    throw new Error(`Satflow did not switch to 1D data. Page excerpt: ${bodyText.slice(0, 1600)}`);
  }
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
    throw new Error(`Could not parse Satflow ${type} 1D leaderboard. Page excerpt: ${text.slice(0, 1600)}`);
  }

  const assets = rows.map((row) => ({
    name: clean(row.name).replace(/^\d+\s+/, ''),
    type,
    volumeBtc: parseBtc(row.volumeText),
    source: 'Satflow'
  })).filter((row) => row.name && Number.isFinite(row.volumeBtc) && row.volumeBtc > 0);

  if (assets.length === 0) throw new Error(`Satflow ${type} leaderboard contained no positive exact 1D volumes`);
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
