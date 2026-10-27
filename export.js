// Renders every plate in every format to PNG. Usage: node export.js [ids...] [--scale=2] [--out=png]
const { chromium } = require('playwright');
const path = require('path');
const args = process.argv.slice(2);
const scale = Number((args.find(a => a.startsWith('--scale=')) || '--scale=1').split('=')[1]);
const out = (args.find(a => a.startsWith('--out=')) || '--out=png').split('=')[1];
const ids = args.filter(a => !a.startsWith('--'));
const FORMATS = { '169': [1920, 1080, '16x9'], '45': [1080, 1350, '4x5'], '11': [1080, 1080, '1x1'] };
const SLUGS = ['what-is-redbelly','why-tokenise','dbft-consensus','receptor','verifiable-credentials','zk-proofs','tokeniser','compliance-aware-assets','identity-and-accountability','governance','project-acacia'];
(async () => {
  const fs = require('fs'); fs.mkdirSync(path.join(__dirname, out), { recursive: true });
  const b = await chromium.launch();
  for (const [f, [w, h, tag]] of Object.entries(FORMATS)) {
    const page = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
    for (let i = 1; i <= 11; i++) {
      const id = String(i).padStart(2, '0'); if (ids.length && !ids.includes(id)) continue;
      await page.goto('file://' + path.join(__dirname, `plate.html?id=${id}&f=${f}`));
      await page.waitForSelector('body[data-ready="1"]');
      const over = await page.evaluate(() => { const p = document.querySelector('.plate'); const bad = [];
        p.querySelectorAll('.head,.notes,.src,.fig,.meta').forEach(e => { const r = e.getBoundingClientRect(); if (r.bottom > p.clientHeight + 1 || e.scrollHeight > e.clientHeight + 2) bad.push(e.className + ':' + Math.round(r.bottom)); }); const sv = p.querySelector('.fig svg').getBoundingClientRect(); bad.scale = Math.min(sv.width / 800, sv.height / 560).toFixed(2); return { bad, scale: bad.scale }; });
      const file = path.join(__dirname, out, `${id}-${SLUGS[i-1]}_${tag}.png`);
      await page.locator('.plate').screenshot({ path: file });
      console.log(file.split('/').pop(), 'diagram x' + over.scale, over.bad.length ? 'OVERFLOW ' + over.bad.join(' ') : '');
    }
    await page.close();
  }
  await b.close();
})();
