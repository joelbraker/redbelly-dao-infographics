// Hand-built diagrams, one per plate. All drawn on an 800 x 520 canvas.
// Only brand-kit colours. Ring nodes echo the nodes inside the Redbelly isotype.
// Phone readability: every label is at least MIN units tall. The canvas is never drawn smaller than 0.6x,
// so labels stay at 30 px or more on the 1080 px formats (check.js measures the rendered size).
// Contrast: paper and mist text on ink, slate or the well; red text only on ink or the well; ink text on paper or red.
(function () {
  const C = {
    ink: '#142530', slate: '#283A46', red: '#FF5050', paper: '#ECEBEC',
    mist: '#DCDCDC', grey: '#848B91', ok: '#86EFAC', edge: '#5A6D79',
  };
  const W = 800, H = 520, MIN = 50;

  // ---------- primitives ----------
  let seq = 0; // animation order
  const d = () => `style="--i:${seq++}"`;
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

  // o.head: subheader face (Readex Pro); otherwise running text (Be Vietnam Pro)
  function text(x, y, s, o = {}) {
    const size = Math.max(MIN, o.size || 52), lh = o.lh || size * 1.12;
    const lines = String(s).split('\n');
    const y0 = y - ((lines.length - 1) * lh) / 2;
    const tspans = lines.map((l, k) => `<tspan x="${x}" y="${y0 + k * lh}">${esc(l)}</tspan>`).join('');
    return `<text class="pp" ${d()} font-family="${o.head ? 'Readex Pro, Be Vietnam Pro, sans-serif' : 'Be Vietnam Pro, sans-serif'}" font-size="${size}" font-weight="${o.head ? 500 : (o.weight || 500)}" fill="${o.fill || C.paper}" text-anchor="${o.anchor || 'middle'}" dominant-baseline="central" letter-spacing="${o.ls || 0}">${tspans}</text>`;
  }
  const head = (x, y, s, o = {}) => text(x, y, s, { head: true, ...o });
  const sub = (x, y, s, o = {}) => text(x, y, s, { size: MIN, fill: C.mist, ...o });
  const cap = (x, y, s, o = {}) => text(x, y, s.toUpperCase(), { size: MIN, head: true, fill: C.red, ls: 2, ...o });
  function box(x, y, w, h, o = {}) {
    return `<rect class="pp" ${d()} x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 8}" fill="${o.fill || C.slate}" stroke="${o.stroke || 'none'}" stroke-width="${o.sw || 3}"/>`;
  }
  function line(x1, y1, x2, y2, o = {}) {
    return `<path class="ln" ${d()} pathLength="1" d="M${x1} ${y1} L${x2} ${y2}" stroke="${o.stroke || C.grey}" stroke-width="${o.sw || 4}" fill="none" ${o.dash ? `stroke-dasharray="${o.dash}" data-dash="1"` : ''} stroke-linecap="round"/>`;
  }
  function path(dd, o = {}) {
    return `<path class="ln" ${d()} pathLength="1" d="${dd}" stroke="${o.stroke || C.grey}" stroke-width="${o.sw || 4}" fill="${o.fill || 'none'}" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  function arrow(x1, y1, x2, y2, o = {}) {
    const a = Math.atan2(y2 - y1, x2 - x1), s = o.head || 18;
    const hx1 = x2 - s * Math.cos(a - 0.55), hy1 = y2 - s * Math.sin(a - 0.55);
    const hx2 = x2 - s * Math.cos(a + 0.55), hy2 = y2 - s * Math.sin(a + 0.55);
    return line(x1, y1, x2, y2, o) + path(`M${hx1} ${hy1} L${x2} ${y2} L${hx2} ${hy2}`, o);
  }
  // ring node, like the isotype's nodes
  function node(x, y, r = 16, o = {}) {
    return `<g class="pp" ${d()}><circle cx="${x}" cy="${y}" r="${r}" fill="${o.fill || C.ink}" stroke="${o.stroke || C.paper}" stroke-width="${o.sw || Math.max(4, r / 4)}"/>${o.dot ? `<circle cx="${x}" cy="${y}" r="${r * 0.4}" fill="${o.dot}"/>` : ''}</g>`;
  }
  function hex(cx, cy, r, o = {}) {
    const pts = [...Array(6)].map((_, k) => { const a = Math.PI / 6 + k * Math.PI / 3; return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`; }).join(' ');
    return `<polygon class="pp" ${d()} points="${pts}" fill="${o.fill || 'none'}" stroke="${o.stroke || C.paper}" stroke-width="${o.sw || 4}" stroke-linejoin="round"/>`;
  }
  function tick(x, y, s = 30, col = C.ok) {
    return path(`M${x - s * 0.5} ${y} L${x - s * 0.12} ${y + s * 0.4} L${x + s * 0.55} ${y - s * 0.42}`, { stroke: col, sw: Math.max(5, s / 5) });
  }
  function cross(x, y, s = 30, col = C.red) {
    const h = s * 0.42;
    return path(`M${x - h} ${y - h} L${x + h} ${y + h} M${x + h} ${y - h} L${x - h} ${y + h}`, { stroke: col, sw: Math.max(5, s / 5) });
  }
  function person(x, y, s = 1, col = C.paper) {
    return `<g class="pp" ${d()} fill="none" stroke="${col}" stroke-width="${4.5}" stroke-linecap="round"><circle cx="${x}" cy="${y - 12 * s}" r="${10 * s}"/><path d="M${x - 20 * s} ${y + 22 * s} C${x - 18 * s} ${y + 2 * s} ${x + 18 * s} ${y + 2 * s} ${x + 20 * s} ${y + 22 * s}"/></g>`;
  }
  function lock(x, y, s = 1, col = C.mist) {
    return `<g class="pp" ${d()} fill="none" stroke="${col}" stroke-width="4" stroke-linejoin="round"><rect x="${x - 13 * s}" y="${y - 4 * s}" width="${26 * s}" height="${20 * s}" rx="3"/><path d="M${x - 8 * s} ${y - 4 * s} V${y - 11 * s} a${8 * s} ${8 * s} 0 0 1 ${16 * s} 0 V${y - 4 * s}"/></g>`;
  }
  const svg = (inner) => `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="Be Vietnam Pro, sans-serif">${inner}</svg>`;
  const ring = (cx, cy, r, n, a0 = -Math.PI / 2) => [...Array(n)].map((_, k) => { const a = a0 + k * 2 * Math.PI / n; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
  const mesh = (pts, o = {}) => { let s = ''; for (let a = 0; a < pts.length; a++) for (let b = a + 1; b < pts.length; b++) s += line(...pts[a], ...pts[b], { stroke: C.edge, sw: 2.5 }); pts.forEach((p, k) => { s += node(...p, o.r || 15, (o.style && o.style(k)) || { stroke: o.stroke || C.red }); }); return s; };

  // ---------- diagrams ----------
  const D = {};

  D['01'] = () => {
    let s = '';
    // three bands, the base highlighted
    s += box(0, 0, 800, 160);
    s += head(36, 80, 'Real-world assets', { anchor: 'start' });
    [612, 680, 748].forEach((x, k) => { s += hex(x, 80, 30, { fill: C.ink, stroke: k === 1 ? C.red : C.paper }); });
    s += box(0, 180, 800, 160);
    s += head(36, 260, 'Identity layer', { anchor: 'start' });
    [600, 668, 736].forEach((x) => { s += person(x, 254, 1.25); s += tick(x + 22, 290, 24); });
    s += box(0, 360, 800, 160, { fill: C.ink, stroke: C.red });
    s += head(36, 440, 'DBFT consensus', { anchor: 'start' });
    s += mesh([[600, 470], [640, 404], [708, 392], [756, 446], [700, 490]], { r: 14 });
    return svg(s);
  };

  D['02'] = () => {
    let s = '';
    s += cap(0, 34, 'Today', { anchor: 'start' });
    s += box(0, 64, 250, 96);
    s += text(125, 112, 'Asset');
    s += box(550, 64, 250, 96);
    s += text(675, 112, 'Payment');
    s += line(270, 112, 530, 112, { dash: '2 14', sw: 5 });
    s += sub(400, 206, '2–4 business days');
    s += box(0, 256, 800, 264, { fill: C.ink, stroke: C.red });
    s += cap(32, 298, 'On one ledger', { anchor: 'start' });
    s += box(32, 340, 230, 100, { fill: C.slate });
    s += text(147, 390, 'Asset');
    s += box(538, 340, 230, 100, { fill: C.slate });
    s += text(653, 390, 'Payment');
    s += arrow(280, 370, 520, 370, { stroke: C.paper });
    s += arrow(520, 410, 280, 410, { stroke: C.red });
    s += text(400, 474, 'one transaction', { size: MIN });
    return svg(s);
  };

  D['03'] = () => {
    let s = '';
    s += box(0, 0, 390, 520);
    s += head(195, 56, 'Leader');
    const L = ring(195, 262, 108, 6);
    L.forEach((p) => { s += line(195, 262, ...p, { sw: 3.5 }); });
    L.forEach((p) => { s += node(...p, 18); });
    s += node(195, 262, 32, { stroke: C.grey, fill: C.grey });
    s += sub(195, 466, 'one decides');
    s += box(410, 0, 390, 520, { fill: C.ink, stroke: C.red });
    s += head(605, 56, 'DBFT');
    s += mesh(ring(605, 262, 112, 7), { r: 18 });
    s += text(605, 466, 'all decide', { size: MIN });
    return svg(s);
  };

  D['04'] = () => {
    let s = '';
    s += box(260, 0, 280, 100);
    s += person(330, 52, 1.35);
    s += head(380, 50, 'You', { anchor: 'start' });
    s += arrow(400, 106, 400, 144);
    s += box(170, 150, 460, 120, { fill: C.ink, stroke: C.red, sw: 5 });
    s += head(400, 210, 'Receptor', { size: 56 });
    s += arrow(300, 276, 210, 324);
    s += arrow(500, 276, 590, 324);
    s += box(0, 330, 380, 190);
    s += tick(58, 425, 34);
    s += text(104, 425, 'Network\naccess', { anchor: 'start' });
    s += box(420, 330, 380, 190);
    s += tick(478, 425, 34);
    s += text(524, 425, 'Eligible\nproducts', { anchor: 'start' });
    return svg(s);
  };

  D['05'] = () => {
    let s = '';
    const I = [400, 55], Y = [150, 465], V = [650, 465];
    s += line(...I, ...Y); s += line(...Y, ...V); s += line(...V, ...I);
    s += box(250, 0, 300, 110, { fill: C.ink, stroke: C.red });
    s += head(400, 55, 'Issuer');
    s += box(0, 410, 300, 110);
    s += head(150, 465, 'You');
    s += box(500, 410, 300, 110);
    s += head(650, 465, 'Verifier');
    // the credential itself, signed by the issuer and held by you
    s += box(200, 146, 400, 228, { fill: C.paper, rx: 12 });
    s += box(200, 146, 400, 70, { fill: C.red, rx: 12 });
    s += box(200, 186, 400, 30, { fill: C.red, rx: 0 });
    s += cap(400, 182, 'Credential', { fill: C.ink });
    s += text(400, 294, 'Proof of\naddress', { fill: C.ink, weight: 600 });
    return svg(s);
  };

  D['06'] = () => {
    let s = '';
    s += box(170, 0, 460, 100, { fill: C.paper, rx: 50 });
    s += path('M380 98 L362 132 L420 98', { stroke: C.paper, fill: C.paper, sw: 2 });
    s += head(400, 50, 'Over 18?', { fill: C.ink, size: 56 });
    s += box(0, 160, 470, 360);
    s += text(36, 214, 'Your wallet', { anchor: 'start', size: MIN, fill: C.mist });
    [['Birth date', 300], ['Name', 376], ['Address', 452]].forEach(([k, y], j) => {
      s += box(24, y - 32, 422, 64, { fill: C.ink, rx: 6 });
      s += text(48, y, k, { anchor: 'start', size: MIN, fill: j ? C.mist : C.paper });
      s += lock(410, y + 4, 1.05);
    });
    s += arrow(484, 300, 548, 300, { stroke: C.red });
    s += hex(672, 300, 112, { stroke: C.red, fill: C.ink, sw: 6 });
    s += head(672, 300, 'TRUE', { size: 56, ls: 2 });
    s += sub(672, 470, 'no data');
    return svg(s);
  };

  D['07'] = () => {
    let s = '';
    const tiers = [['Tokeniser', 'issues assets'], ['Averer', 'identity & wallet'], ['Redbelly Network', 'settlement']];
    s += line(46, 60, 46, 460, { dash: '2 14', sw: 5 });
    tiers.forEach(([n, t], j) => {
      const y = j * 180, hi = j === 0;
      s += box(100, y, 700, 160, { fill: hi ? C.ink : C.slate, stroke: hi ? C.red : 'none' });
      s += head(134, y + 52, n, { anchor: 'start' });
      s += sub(134, y + 112, t, { anchor: 'start' });
      s += node(46, y + 80, 20, { stroke: hi ? C.red : C.paper, dot: hi ? C.red : null });
    });
    return svg(s);
  };

  D['08'] = () => {
    let s = '';
    s += box(180, 0, 440, 90);
    s += head(400, 45, 'Trade request');
    s += arrow(400, 94, 400, 124);
    s += box(70, 128, 660, 252, { fill: C.ink, stroke: C.red });
    ['Identity', 'Eligibility', 'Limits'].forEach((l, k) => {
      const y = 170 + k * 84;
      if (k) s += line(100, y - 42, 700, y - 42, { stroke: C.slate, sw: 3 });
      s += text(110, y, l, { anchor: 'start' });
      s += tick(670, y, 32);
    });
    s += arrow(300, 386, 220, 412, { stroke: C.ok });
    s += arrow(500, 386, 580, 412, { stroke: C.red });
    s += box(0, 416, 380, 104);
    s += tick(52, 468, 34);
    s += head(98, 468, 'Settles', { anchor: 'start' });
    s += box(420, 416, 380, 104);
    s += cross(472, 468, 32);
    s += head(518, 468, 'Stopped', { anchor: 'start' });
    return svg(s);
  };

  D['09'] = () => {
    let s = '';
    // protocol level: two honest nodes disagree, and the proof points at the nodes responsible
    s += box(0, 0, 390, 520);
    s += head(195, 52, 'Polygraph');
    const P = [[80, 180], [195, 130], [310, 180], [130, 300], [260, 300]];
    for (let a = 0; a < P.length; a++) for (let b = a + 1; b < P.length; b++) s += line(...P[a], ...P[b], { stroke: C.edge, sw: 2.5 });
    P.forEach((p, k) => { s += node(...p, 18, k >= 3 ? { stroke: C.red, dot: C.red } : {}); });
    s += box(115, 340, 160, 62, { fill: C.paper, rx: 6 });
    s += head(195, 371, 'Proof', { fill: C.ink, size: MIN });
    s += sub(195, 460, 'if nodes\ndisagree', { lh: 50 });
    // participant level: everyone is known
    s += box(410, 0, 390, 520);
    s += head(605, 52, 'Identity');
    [[530, 160], [605, 160], [680, 160], [568, 272], [643, 272]].forEach(([x, y]) => { s += person(x, y, 1.3); s += tick(x + 24, y + 36, 22); });
    s += sub(605, 460, 'everyone\nis known', { lh: 50 });
    return svg(s);
  };

  D['10'] = () => {
    let s = '';
    const steps = [['Verified wallet', 'Receptor credential'], ['Proposal sets rules', 'quorum, voting period'], ['Sign to vote', 'free: no gas'], ['Public result', 'receipts on IPFS']];
    s += line(44, 62, 44, 458);
    steps.forEach(([a, b], k) => {
      const y = k * 132, hi = k === 2;
      s += box(104, y, 696, 124, { fill: hi ? C.ink : C.slate, stroke: hi ? C.red : 'none' });
      s += node(44, y + 62, 36, { stroke: hi ? C.red : C.paper });
      s += head(44, y + 64, String(k + 1), { size: MIN });
      s += head(134, y + 35, a, { anchor: 'start' });
      s += sub(134, y + 92, b, { anchor: 'start' });
    });
    return svg(s);
  };

  D['11'] = () => {
    let s = '';
    const ev = [['2024', 'Phase 1'], ['Jul 2025', 'Redbelly selected'], ['May 2026', 'Final report']];
    s += line(278, 36, 278, 236);
    ev.forEach(([t, l], k) => {
      const y = 36 + k * 100, hi = k === 1;
      s += text(252, y, t, { size: MIN, fill: hi ? C.red : C.mist, anchor: 'end', weight: 500 });
      s += node(278, y, 17, { stroke: hi ? C.red : C.paper, dot: hi ? C.red : null });
      s += text(310, y, l, { anchor: 'start', weight: hi ? 700 : 500 });
    });
    s += box(0, 300, 800, 220, { stroke: C.red });
    s += head(36, 372, '< 4 min', { anchor: 'start', size: 92 });
    s += text(420, 372, 'bond issued\nand resold', { anchor: 'start', size: MIN, lh: 54 });
    s += sub(36, 474, 'Usually: up to 4 days', { anchor: 'start' });
    return svg(s);
  };

  window.renderDiagram = (id) => { seq = 0; return D[id](); };
})();
