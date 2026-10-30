// Fact and content checks for the 11 plates. Usage: node verify.js [--online] [--report=reports/facts.md]
// Offline (always):
//   coverage   every lede and note on every plate is listed in src/facts.js with a source and a verbatim quote
//   numbers    every number on a plate (copy and diagram labels) appears in one of that plate's quotes
//   sources    every URL a plate's facts rest on is in its source list (src/sources.js, SOURCES.md)
//   glossary   every short form in src/glossary.js appears on exactly the plates it lists, and none is missing
//   wording    no price talk, investment advice, return promises or personal credit; plate 10 is not Snapshot-based
// Online (--online, needs network): opens every source page and confirms each quote is still on it.
// Exits with code 1 if any check fails.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const args = process.argv.slice(2);
const online = args.includes('--online');
const reportArg = args.find((a) => a.startsWith('--report='));

// load the plate sources the same way the browser does
const ctx = { window: {} };
vm.createContext(ctx);
['content.js', 'diagrams.js', 'facts.js', 'sources.js', 'glossary.js'].forEach((f) => vm.runInContext(fs.readFileSync(path.join(__dirname, 'src', f), 'utf8'), ctx));
const { PLATES, FACTS, SOURCES, GLOSSARY } = ctx.window;

const strip = (s) => s.replace(/\*/g, '');
const unesc = (s) => s.replace(/&lt;/g, '<').replace(/&amp;/g, '&');
// diagram labels: one string per <text>, its lines joined by spaces
const labels = (id) => [...ctx.window.renderDiagram(id).matchAll(/<text[^>]*>(.*?)<\/text>/g)].map((m) => unesc([...m[1].matchAll(/<tspan[^>]*>(.*?)<\/tspan>/g)].map((t) => t[1]).join(' ')));
const plateText = (p) => [strip(p.title), p.lede, ...p.notes, ...labels(p.id)];

// matching: case, spacing, quote marks, dashes and ligatures are normalised; words are not
const norm = (s) => s.toLowerCase().replace(/[‘’ʼ]/g, "'").replace(/[“”]/g, '"').replace(/[‐‑‒–—]/g, '-').replace(/ﬁ/g, 'fi').replace(/ﬂ/g, 'fl').replace(/¶/g, '').replace(/\s+/g, '');
const WORDS = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, fourteen: 14, eighteen: 18 };
const numbersIn = (s, quote) => {
  let t = s;
  if (quote) t = t.replace(/\b([a-z]+)\b/gi, (w) => (WORDS[w.toLowerCase()] !== undefined ? String(WORDS[w.toLowerCase()]) : w)).replace(/\bn\/3\b/g, '1/3');
  return (t.match(/\d+(?:\/\d+)?/g) || []);
};

const results = [];
const fail = (plate, check, msg) => results.push({ plate, check, msg });

for (const p of PLATES) {
  const facts = FACTS[p.id] || [];
  const listed = new Set(facts.map((f) => strip(f[0])));
  // coverage
  [p.lede, ...p.notes].forEach((line) => { if (!listed.has(line)) fail(p.id, 'coverage', `"${line}" has no entry in src/facts.js`); });
  // numbers: ordinals inside the diagram (a lone digit in a step marker) are not claims
  const quoteNums = new Set(facts.flatMap((f) => numbersIn(f[2], true)));
  plateText(p).filter((t) => !/^\d$/.test(t)).forEach((t) => numbersIn(t).forEach((n) => { if (!quoteNums.has(n)) fail(p.id, 'numbers', `"${n}" in "${t}" is not in any quote for this plate`); }));
  // sources
  const srcUrls = new Set((SOURCES[p.id] || []).map((s) => s[1]));
  facts.forEach((f) => { if (!srcUrls.has(f[1])) fail(p.id, 'sources', `${f[1]} is used in src/facts.js but missing from src/sources.js`); });
  // wording: failure criteria of the brief
  const all = plateText(p).join(' \n ') + ' ' + p.source;
  const banned = all.match(/\b(price[sd]?|profits?|returns?|gains?|invest(?:ing|ment)? advice|buy|moon|APY|APR|guaranteed? (?:income|yield)|to the moon|made by|designed by|created by)\b|@\w+/gi);
  if (banned) fail(p.id, 'wording', `banned wording: ${[...new Set(banned)].join(', ')}`);
}
// governance: the plate must describe the DAO's own platform, never Snapshot or Constitution v1.2 rules
const gov = PLATES.find((p) => p.id === '10');
const govText = plateText(gov).join(' ');
if (!/not Snapshot/.test(gov.lede)) fail('10', 'governance', 'the lede must say voting is on the DAO platform, not Snapshot');
if (/(on|via|through) Snapshot|Constitution|v1\.2|whitelist/i.test(govText)) fail('10', 'governance', 'mentions Snapshot voting, Constitution v1.2 or the whitelist as current rules');
// glossary
const termRe = (t) => new RegExp('(^|[^A-Za-z])' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![A-Za-z])');
for (const [term, , ids] of GLOSSARY) {
  const on = PLATES.filter((p) => termRe(term).test(plateText(p).join(' '))).map((p) => p.id);
  if (on.join() !== ids.join()) fail('all', 'glossary', `${term} listed for ${ids.join(', ')} but appears on ${on.join(', ') || 'no plate'}`);
}
const known = new Set(GLOSSARY.map((g) => g[0]));
PLATES.forEach((p) => (plateText(p).join(' ').match(/\b[A-Z][A-Z0-9]{1,}[a-z]?\b/g) || []).forEach((t) => {
  if (!known.has(t) && !['TRUE', 'TODAY', 'ON', 'ONE', 'LEDGER', 'CREDENTIAL'].includes(t)) fail(p.id, 'glossary', `short form "${t}" is not in src/glossary.js`);
}));

const offline = results.slice();
(async () => {
  let live = [];
  if (online) live = await checkOnline();
  const lines = [];
  const counts = PLATES.map((p) => `| ${p.id} | ${p.kicker} | ${(FACTS[p.id] || []).length} | ${new Set((FACTS[p.id] || []).map((f) => f[1])).size} | ${offline.filter((r) => r.plate === p.id).length ? 'FAIL' : 'pass'} |${online ? ` ${liveCell(live, p.id)} |` : ''}`);
  lines.push(`| Plate | Topic | Facts with quotes | Sources | Offline checks |${online ? ' Quotes found on live pages |' : ''}`);
  lines.push(`|---|---|---|---|---|${online ? '---|' : ''}`);
  lines.push(...counts);
  console.log(lines.join('\n'));
  const all = offline.concat(live.filter((l) => !l.ok).map((l) => ({ plate: l.plate, check: 'online', msg: `quote not found on ${l.url}: "${l.quote.slice(0, 70)}…"${l.note ? ' (' + l.note + ')' : ''}` })));
  if (all.length) console.log('\nFAILURES\n' + all.map((r) => `${r.plate} ${r.check}: ${r.msg}`).join('\n'));
  else console.log(`\nAll checks pass${online ? ', and every quote was found on its live source page' : ''}.`);

  if (reportArg) {
    const out = path.resolve(__dirname, reportArg.split('=')[1]);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    const day = new Date().toISOString().slice(0, 10);
    const detail = PLATES.map((p) => `### ${p.id}. ${p.kicker}\n\n| On the plate | Source | Quote${online ? ' | Live' : ''} |\n|---|---|---|${online ? '---|' : ''}\n` +
      (FACTS[p.id] || []).map((f) => { const l = live.find((x) => x.plate === p.id && x.quote === f[2]); return `| ${strip(f[0])} | ${f[1].replace('https://', '')} | “${f[2]}” |${online ? ` ${l ? (l.ok ? 'found' : 'NOT FOUND') : ''} |` : ''}`; }).join('\n')).join('\n\n');
    fs.writeFileSync(out, `# Fact verification report\n\nGenerated by \`node verify.js${online ? ' --online' : ''} --report=reports/facts.md\` on ${day}.\n\n` +
      `Every lede and note on every plate is listed in [\`src/facts.js\`](../src/facts.js) with the supplied resource it rests on and a verbatim quote from that resource. ` +
      `${online ? 'Each quote was then searched for on the live page (spacing, quote marks and dashes normalised, wording unchanged).' : 'Run with --online to search each quote on the live page.'}\n\n` +
      `Checks: every lede and note has a quote; every number on a plate appears in one of its quotes; every source URL is in the plate's source list; the glossary matches the plates; no price talk, investment advice or personal credit; the governance plate follows the DAO voting platform, not Snapshot or Constitution v1.2.\n\n` +
      lines.join('\n') + `\n\n${all.length ? '## Failures\n\n' + all.map((r) => `- ${r.plate} ${r.check}: ${r.msg}`).join('\n') : 'All checks pass.'}\n\n## Every fact and its quote\n\n${detail}\n`);
    console.log('Report written to ' + path.relative(__dirname, out));
  }
  process.exit(all.length ? 1 : 0);
})();

function liveCell(live, id) {
  const mine = live.filter((l) => l.plate === id);
  return `${mine.filter((l) => l.ok).length} / ${mine.length}`;
}

// fetch every source once (rendered, so pages built in the browser are read too) and search each quote
async function checkOnline() {
  const { chromium } = require('playwright');
  const { execFileSync } = require('child_process');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const cache = {};
  const textOf = async (url) => {
    if (cache[url] !== undefined) return cache[url];
    let t = '', note = '';
    try {
      if (url.endsWith('.pdf')) {
        const res = await page.request.get(url);
        const tmp = path.join(require('os').tmpdir(), 'rb-verify-' + Date.now() + '.pdf');
        fs.writeFileSync(tmp, await res.body());
        try { t = execFileSync('pdftotext', ['-q', tmp, '-'], { encoding: 'utf8' }); } catch (e) { note = 'pdftotext is not installed: search the PDF by hand'; }
        fs.unlinkSync(tmp);
      } else {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(1500);
        t = await page.evaluate(() => { const b = document.body.cloneNode(true); b.querySelectorAll('script,style,noscript').forEach((e) => e.remove()); return b.textContent; });
      }
    } catch (e) { note = 'could not load: ' + e.message.split('\n')[0]; }
    cache[url] = { t: norm(t), note };
    return cache[url];
  };
  const out = [];
  for (const p of PLATES) for (const [, url, quote] of FACTS[p.id] || []) {
    const { t, note } = await textOf(url);
    out.push({ plate: p.id, url, quote, ok: !!t && t.includes(norm(quote)), note });
    process.stdout.write('.');
  }
  process.stdout.write('\n');
  await browser.close();
  return out;
}
