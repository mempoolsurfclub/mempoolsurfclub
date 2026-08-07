const PAGE_URL = 'https://www.satflow.com/ordinals';

function uniq(values) {
  return [...new Set(values)];
}

function snippets(text, pattern, radius = 1400, limit = 8) {
  const out = [];
  let from = 0;
  while (out.length < limit) {
    const index = text.indexOf(pattern, from);
    if (index < 0) break;
    out.push(text.slice(Math.max(0, index - radius), Math.min(text.length, index + pattern.length + radius)));
    from = index + pattern.length;
  }
  return out;
}

const response = await fetch(PAGE_URL, { headers: { 'user-agent': 'Mozilla/5.0' } });
const html = await response.text();
console.log(`SATFLOW_TRACE html status=${response.status} bytes=${html.length}`);

for (const pattern of ['NEXT_PUBLIC_BACKEND_URL', 'preloadedDataByPeriod', 'volume1D', 'volume7D', 'oneDayVolume', 'oneDayChange']) {
  const hits = snippets(html, pattern, 1200, 4);
  for (const hit of hits) console.log(`SATFLOW_TRACE HTML ${pattern}\n${hit}\nSATFLOW_TRACE END`);
}

const scripts = uniq([...html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)]
  .map((match) => new URL(match[1], PAGE_URL).href));
console.log(`SATFLOW_TRACE scripts=${scripts.length}`);

const patterns = [
  'NEXT_PUBLIC_BACKEND_URL',
  'preloadedDataByPeriod',
  'loadFromAPI',
  'volume1D',
  'volume1d',
  'volume7D',
  'oneDayVolume',
  'oneDayChange',
  'sevenDayVolume',
  'collectionStats.',
  'collections.getMany',
  'collections.',
  'getMany.useQuery',
  'useQuery({period',
  'period:',
  'timePeriod',
  '1 Day',
  '1D Volume',
  '/trpc',
  'api.satflow.com'
];

for (const script of scripts) {
  let js;
  try {
    const jsResponse = await fetch(script, { headers: { 'user-agent': 'Mozilla/5.0' } });
    if (!jsResponse.ok) continue;
    js = await jsResponse.text();
  } catch (error) {
    continue;
  }

  const matched = patterns.filter((pattern) => js.includes(pattern));
  if (!matched.length) continue;
  console.log(`SATFLOW_TRACE SCRIPT ${script} bytes=${js.length} patterns=${matched.join(',')}`);
  for (const pattern of matched) {
    for (const hit of snippets(js, pattern, 2200, 6)) {
      console.log(`SATFLOW_TRACE MATCH ${pattern}\n${hit}\nSATFLOW_TRACE END`);
    }
  }
}

throw new Error('Satflow trace complete; inspect workflow logs for public leaderboard data procedure.');
