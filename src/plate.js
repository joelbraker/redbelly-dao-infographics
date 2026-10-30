// Builds one plate (topic x format). Used by plate.html (export/editing) and by the website.
(function () {
  const FORMATS = {
    '169': { w: 1920, h: 1080, label: 'Landscape 16:9' },
    '45': { w: 1080, h: 1350, label: 'Portrait 4:5' },
    '11': { w: 1080, h: 1080, label: 'Square 1:1' },
  };
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  // keep hyphenated words (real‑world) and ranges (2–4, 1/3) together, and highlight *words*
  const mark = (s) => esc(s).replace(/(\w)-(\w)/g, '$1\u2011$2').replace(/(\d+[–/]\d+)/g, '<span class="nw">$1</span>').replace(/\*([^*]+)\*/g, '<em>$1</em>');
  const hexDot = (on) => `<svg viewBox="0 0 20 23"><polygon points="10,1 19,6.2 19,16.8 10,22 1,16.8 1,6.2" fill="${on ? '#FF5050' : 'none'}" stroke="${on ? '#FF5050' : '#4A5D6A'}" stroke-width="2"/></svg>`;

  // brand pattern: the isotype tiled on a hex grid, as in the guideline application pages
  const isoPath = (window.BRAND.isotype.match(/ d="([^"]+)"/) || [])[1] || '';
  let uid = 0;
  function lattice() {
    const id = 'lat' + (++uid) + Math.random().toString(36).slice(2, 7);
    const tile = (x, y) => `<path transform="translate(${x - 117.4} ${y - 310.94})" d="${isoPath}"/>`;
    return `<svg class="lattice" aria-hidden="true"><defs><pattern id="${id}" width="99.5" height="168" patternUnits="userSpaceOnUse">` +
      `<g fill="currentColor">${tile(7, 0)}${tile(56.75, 84)}${tile(-42.75, 84)}${tile(7, 168)}</g></pattern></defs>` +
      `<rect width="100%" height="100%" fill="url(#${id})"/></svg>`;
  }
  const reg = () => ['tl', 'tr', 'bl', 'br'].map((k) => `<i class="reg ${k}" aria-hidden="true"></i>`).join('');

  function renderPlate(p, format, opts = {}) {
    const el = document.createElement('article');
    el.className = `plate f${format}${opts.animate ? ' anim' : ''}`;
    el.dataset.id = p.id;
    el.innerHTML = `
      <div class="spine"></div>
      ${lattice()}${reg()}
      <header class="meta">
        <span class="wm">${window.BRAND.wordmark}</span>
        <span class="series"><span>${esc(window.SERIES.name)}</span><span class="idx" role="img" aria-label="Plate ${p.id} of ${window.SERIES.total}">${window.PLATES.map((x) => hexDot(x.id === p.id)).join('')}</span></span>
      </header>
      <div class="head">
        <div class="kicker"><b>${p.id}</b>${esc(p.kicker)}</div>
        <h1 class="title">${mark(p.title)}</h1>
        <p class="lede">${mark(p.lede)}</p>
      </div>
      <figure class="fig" role="img" aria-label="Fig. ${p.id}: ${esc(p.fig || '')}">${window.renderDiagram(p.id)}</figure>
      <ol class="notes">${p.notes.map((n, k) => `<li><span class="n"><span>${k + 1}</span></span><span>${mark(n)}</span></li>`).join('')}</ol>
      <footer class="src"><span><span class="lbl">Sources</span>${esc(p.source)}</span><span class="iso">${window.BRAND.isotype}</span></footer>`;
    return el;
  }
  window.FORMATS = FORMATS;
  window.renderPlate = renderPlate;
})();
