// Hand-built diagrams, one per plate. All drawn on an 800 x 560 canvas.
// Only brand-kit colours. Ring nodes echo the nodes inside the Redbelly isotype.
(function () {
  const C = {
    ink: '#142530', slate: '#283A46', red: '#FF5050', paper: '#ECEBEC',
    mist: '#DCDCDC', grey: '#848B91', ok: '#86EFAC',
  };
  const W = 800, H = 560;

  // ---------- primitives ----------
  let seq = 0; // animation order
  const d = () => `style="--i:${seq++}"`;
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

  function text(x, y, s, o = {}) {
    const size = o.size || 34, lh = o.lh || size * 1.18;
    const lines = String(s).split('\n');
    const y0 = y - ((lines.length - 1) * lh) / 2 * (o.valign === 'top' ? 0 : 1);
    const tspans = lines.map((l, k) => `<tspan x="${x}" y="${(o.valign === 'top' ? y : y0) + k * lh}">${esc(l)}</tspan>`).join('');
    // box titles and other emphasised labels are subheaders: Readex Pro; the rest stays in Be Vietnam Pro
    const head = (o.weight || 600) >= 700;
    return `<text class="pp" ${d()} font-family="${head ? 'Readex Pro, Be Vietnam Pro, sans-serif' : 'Be Vietnam Pro, sans-serif'}" font-size="${size}" font-weight="${head ? 500 : (o.weight || 600)}" fill="${o.fill || C.paper}" text-anchor="${o.anchor || 'middle'}" dominant-baseline="middle" letter-spacing="${o.ls || 0}">${tspans}</text>`;
  }
  const cap = (x, y, s, o = {}) => text(x, y, s.toUpperCase(), { size: 22, weight: 700, fill: C.red, ls: 3, ...o });
  function box(x, y, w, h, o = {}) {
    return `<rect class="pp" ${d()} x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 6}" fill="${o.fill || C.slate}" stroke="${o.stroke || 'none'}" stroke-width="${o.sw || 2}" ${o.dash ? `stroke-dasharray="${o.dash}"` : ''}/>`;
  }
  function line(x1, y1, x2, y2, o = {}) {
    return `<path class="ln" ${d()} pathLength="1" d="M${x1} ${y1} L${x2} ${y2}" stroke="${o.stroke || C.grey}" stroke-width="${o.sw || 3}" fill="none" ${o.dash ? `stroke-dasharray="${o.dash}" data-dash="1"` : ''} stroke-linecap="round"/>`;
  }
  function path(dd, o = {}) {
    return `<path class="ln" ${d()} pathLength="1" d="${dd}" stroke="${o.stroke || C.grey}" stroke-width="${o.sw || 3}" fill="${o.fill || 'none'}" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  function arrow(x1, y1, x2, y2, o = {}) {
    const a = Math.atan2(y2 - y1, x2 - x1), s = o.head || 16;
    const hx1 = x2 - s * Math.cos(a - 0.5), hy1 = y2 - s * Math.sin(a - 0.5);
    const hx2 = x2 - s * Math.cos(a + 0.5), hy2 = y2 - s * Math.sin(a + 0.5);
    return line(x1, y1, x2, y2, o) + path(`M${hx1} ${hy1} L${x2} ${y2} L${hx2} ${hy2}`, o);
  }
  // ring node, like the isotype's nodes
  function node(x, y, r = 16, o = {}) {
    return `<g class="pp" ${d()}><circle cx="${x}" cy="${y}" r="${r}" fill="${o.fill || C.ink}" stroke="${o.stroke || C.paper}" stroke-width="${o.sw || Math.max(3, r / 4)}"/>${o.dot ? `<circle cx="${x}" cy="${y}" r="${r * 0.38}" fill="${o.dot}"/>` : ''}</g>`;
  }
  function hex(cx, cy, r, o = {}) {
    const pts = [...Array(6)].map((_, k) => { const a = Math.PI / 6 + k * Math.PI / 3; return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`; }).join(' ');
    return `<polygon class="pp" ${d()} points="${pts}" fill="${o.fill || 'none'}" stroke="${o.stroke || C.paper}" stroke-width="${o.sw || 4}" stroke-linejoin="round"/>`;
  }
  function tick(x, y, s = 22, col = C.ok) {
    return path(`M${x - s * 0.5} ${y} L${x - s * 0.12} ${y + s * 0.4} L${x + s * 0.55} ${y - s * 0.42}`, { stroke: col, sw: Math.max(3, s / 6) });
  }
  function cross(x, y, s = 22, col = C.red) {
    const h = s * 0.45;
    return path(`M${x - h} ${y - h} L${x + h} ${y + h} M${x + h} ${y - h} L${x - h} ${y + h}`, { stroke: col, sw: Math.max(3, s / 6) });
  }
  function person(x, y, s = 1, col = C.paper) {
    return `<g class="pp" ${d()} fill="none" stroke="${col}" stroke-width="${3.5}" stroke-linecap="round"><circle cx="${x}" cy="${y - 12 * s}" r="${10 * s}"/><path d="M${x - 20 * s} ${y + 22 * s} C${x - 18 * s} ${y + 2 * s} ${x + 18 * s} ${y + 2 * s} ${x + 20 * s} ${y + 22 * s}"/></g>`;
  }
  function lock(x, y, s = 1, col = C.grey) {
    return `<g class="pp" ${d()} fill="none" stroke="${col}" stroke-width="3.5" stroke-linejoin="round"><rect x="${x - 13 * s}" y="${y - 4 * s}" width="${26 * s}" height="${20 * s}" rx="3"/><path d="M${x - 8 * s} ${y - 4 * s} V${y - 11 * s} a${8 * s} ${8 * s} 0 0 1 ${16 * s} 0 V${y - 4 * s}"/></g>`;
  }
  function chip(x, y, w, label, o = {}) {
    return box(x, y, w, o.h || 58, { fill: o.fill || C.ink, stroke: o.stroke || C.grey, rx: 29 }) + text(x + w / 2, y + (o.h || 58) / 2 + 1, label, { size: o.size || 26, weight: 600, fill: o.color || C.paper });
  }
  const svg = (inner) => `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="Be Vietnam Pro, sans-serif">${inner}</svg>`;

  // ---------- diagrams ----------
  const D = {};

  D['01'] = () => {
    let s = '';
    s += box(40, 10, 720, 166);
    s += text(72, 50, 'Real-world assets', { size: 36, weight: 700, anchor: 'start' });
    [['Bonds', 72, 128], ['Credit', 214, 138], ['Property', 366, 168], ['Carbon', 548, 150]].forEach(([l, x, w]) => { s += chip(x, 92, w, l, { size: 27 }); });
    s += arrow(400, 180, 400, 206);
    s += box(40, 210, 720, 140);
    s += text(72, 254, 'Identity layer', { size: 36, weight: 700, anchor: 'start' });
    s += text(72, 302, 'everyone is known', { size: 28, weight: 500, fill: C.mist, anchor: 'start' });
    [540, 610, 680].forEach((x) => { s += person(x, 286, 1.15); s += tick(x + 20, 318, 18); });
    s += arrow(400, 354, 400, 380);
    s += box(40, 384, 720, 166);
    s += text(72, 426, 'DBFT consensus', { size: 36, weight: 700, anchor: 'start' });
    s += text(72, 470, 'nodes agree together', { size: 28, weight: 500, fill: C.mist, anchor: 'start' });
    const pts = [[470, 500], [530, 468], [590, 508], [650, 470], [710, 504]];
    for (let a = 0; a < pts.length; a++) for (let b = a + 1; b < pts.length; b++) s += line(...pts[a], ...pts[b], { stroke: '#5a6d79', sw: 2 });
    pts.forEach(([x, y]) => { s += node(x, y, 13, { stroke: C.red }); });
    return svg(s);
  };

  D['02'] = () => {
    let s = '';
    s += cap(40, 26, 'Today', { anchor: 'start' });
    const bx = [40, 290, 540];
    ['Asset\nrecord', 'Payment', 'Paper-\nwork'].forEach((l, k) => { s += box(bx[k], 48, 220, 118); s += text(bx[k] + 110, 108, l, { size: 32 }); });
    s += line(264, 107, 286, 107, { dash: '2 8' });
    s += line(514, 107, 536, 107, { dash: '2 8' });
    s += text(40, 204, 'Bond trades: 2–4 business days to settle', { size: 28, weight: 500, fill: C.mist, anchor: 'start' });
    s += line(40, 248, 760, 248, { stroke: C.slate, sw: 2 });
    s += cap(40, 286, 'Tokenised', { anchor: 'start' });
    s += box(40, 310, 720, 190, { stroke: C.red, sw: 3 });
    s += hex(170, 396, 76, { fill: C.ink });
    s += text(170, 398, 'Asset', { size: 30 });
    s += hex(630, 396, 76, { stroke: C.red, fill: C.ink });
    s += text(630, 398, 'Payment', { size: 27 });
    s += arrow(268, 372, 532, 372, { stroke: C.paper });
    s += arrow(532, 414, 268, 414, { stroke: C.red });
    s += text(400, 474, 'swap in one go', { size: 28, weight: 600 });
    s += text(40, 538, 'The asset’s rules travel with the token', { size: 28, weight: 500, fill: C.mist, anchor: 'start' });
    return svg(s);
  };

  D['03'] = () => {
    let s = '';
    const ring = (cx, cy, r, n) => [...Array(n)].map((_, k) => { const a = -Math.PI / 2 + k * 2 * Math.PI / n; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
    s += box(20, 10, 370, 380);
    s += text(205, 54, 'Leader-based', { size: 32, fill: C.mist });
    const L = ring(205, 212, 98, 6);
    L.forEach((p) => { s += line(205, 212, ...p); });
    L.forEach((p) => { s += node(...p, 17); });
    s += node(205, 212, 28, { stroke: C.grey, fill: C.grey });
    s += text(205, 356, 'one node leads', { size: 28, weight: 500, fill: C.mist });
    s += box(410, 10, 370, 380, { stroke: C.red, sw: 3 });
    s += text(595, 54, 'DBFT', { size: 34, weight: 800 });
    const R = ring(595, 212, 104, 7);
    for (let a = 0; a < R.length; a++) for (let b = a + 1; b < R.length; b++) s += line(...R[a], ...R[b], { stroke: '#5a6d79', sw: 2 });
    R.forEach((p) => { s += node(...p, 17, { stroke: C.red }); });
    s += text(595, 356, 'all nodes decide', { size: 28, weight: 700 });
    s += box(20, 412, 760, 138, { fill: C.ink, stroke: C.slate, sw: 3 });
    [56, 170, 284, 398].forEach((x, k) => { s += box(x, 448, 90, 66, { stroke: k === 3 ? C.red : 'none', sw: 3 }); if (k) s += line(x - 24, 481, x - 2, 481); });
    s += tick(443, 481, 28);
    s += text(528, 462, 'One chain', { size: 30, weight: 700, anchor: 'start' });
    s += text(528, 502, 'no forks', { size: 28, weight: 500, fill: C.mist, anchor: 'start' });
    return svg(s);
  };

  D['04'] = () => {
    let s = '';
    s += box(210, 0, 380, 88);
    s += person(278, 50, 1.15);
    s += text(320, 44, 'You + wallet', { size: 32, anchor: 'start' });
    s += arrow(400, 92, 400, 112);
    s += hex(400, 232, 116, { stroke: C.red, fill: C.ink, sw: 6 });
    s += text(400, 218, 'Receptor', { size: 34, weight: 800 });
    s += text(400, 258, 'identity check', { size: 25, weight: 500, fill: C.mist });
    s += arrow(318, 326, 230, 376);
    s += arrow(482, 326, 570, 376);
    s += box(30, 380, 360, 90);
    s += tick(74, 425, 26);
    s += text(102, 425, 'Network access', { size: 30, anchor: 'start' });
    s += box(410, 380, 360, 90);
    s += tick(454, 425, 26);
    s += text(482, 425, 'Eligible products', { size: 30, anchor: 'start' });
    s += text(30, 522, '3 modules', { size: 26, weight: 600, fill: C.grey, anchor: 'start' });
    s += chip(200, 494, 172, 'Issuer', { h: 56, size: 27 });
    s += chip(388, 494, 180, 'Holder', { h: 56, size: 27 });
    s += chip(584, 494, 186, 'Verifier', { h: 56, size: 27 });
    return svg(s);
  };

  D['05'] = () => {
    let s = '';
    const I = [400, 56], Hd = [140, 500], V = [660, 500];
    s += line(...I, ...Hd); s += line(...Hd, ...V); s += line(...V, ...I);
    s += box(255, 6, 290, 100, { stroke: C.red, sw: 3 });
    s += text(400, 42, 'Issuer', { size: 32, weight: 800 });
    s += text(400, 80, 'creates & signs', { size: 25, weight: 500, fill: C.mist });
    s += box(10, 448, 270, 106);
    s += text(145, 484, 'You', { size: 32, weight: 800 });
    s += text(145, 522, 'keep it in a wallet', { size: 24, weight: 500, fill: C.mist });
    s += box(520, 448, 270, 106);
    s += text(655, 484, 'Verifier', { size: 32, weight: 800 });
    s += text(655, 522, 'checks it is real', { size: 24, weight: 500, fill: C.mist });
    s += box(210, 150, 380, 254, { fill: C.paper, rx: 10 });
    s += box(210, 150, 380, 56, { fill: C.red, rx: 10 });
    s += box(210, 182, 380, 24, { fill: C.red, rx: 0 });
    s += text(236, 179, 'CREDENTIAL', { size: 22, weight: 800, fill: '#ffffff', anchor: 'start', ls: 3 });
    ['Proof of address', 'AML/CTF check', 'Wholesale investor'].forEach((l, k) => {
      const y = 246 + k * 54;
      s += text(236, y, l, { size: 27, weight: 600, fill: C.ink, anchor: 'start' });
      s += tick(556, y, 24, '#1f8a4c');
    });
    return svg(s);
  };

  D['06'] = () => {
    let s = '';
    s += box(110, 6, 580, 92, { fill: C.paper, rx: 46 });
    s += path('M390 96 L372 126 L424 96', { stroke: C.paper, fill: C.paper, sw: 2 });
    s += text(400, 53, 'Is this user over 18?', { size: 33, weight: 800, fill: C.ink });
    s += box(130, 142, 540, 228);
    s += cap(160, 176, 'Your wallet', { anchor: 'start', fill: C.mist });
    ['Name', 'Birth date', 'Address'].forEach((k, j) => {
      const y = 222 + j * 50;
      s += text(160, y, k, { size: 27, weight: 500, fill: C.mist, anchor: 'start' });
      s += box(360, y - 18, 220, 36, { fill: C.ink, rx: 4 });
      s += lock(616, y, 0.85);
    });
    s += arrow(400, 376, 400, 398, { stroke: C.red });
    s += hex(400, 482, 72, { stroke: C.red, fill: C.ink, sw: 5 });
    s += text(400, 470, 'TRUE', { size: 34, weight: 800, ls: 2 });
    s += text(400, 506, 'proof', { size: 24, weight: 500, fill: C.mist });
    s += text(500, 440, 'no data shown', { size: 26, weight: 500, fill: C.mist, anchor: 'start' });
    return svg(s);
  };

  D['07'] = () => {
    let s = '';
    const tiers = [['Issue', 'Tokeniser', 'issue & manage assets'], ['Reach', 'Averer', 'identity & wallet'], ['Settle', 'Redbelly Network', 'final settlement']];
    s += line(80, 60, 80, 500, { dash: '2 12', sw: 4 });
    tiers.forEach(([k, n, sub], j) => {
      const y = 6 + j * 196, hi = j === 0;
      s += box(150, y, 620, 156, { fill: hi ? C.ink : C.slate, stroke: hi ? C.red : 'none', sw: 3 });
      s += cap(184, y + 36, k, { anchor: 'start', fill: hi ? C.red : C.grey });
      s += text(184, y + 80, n, { size: 36, weight: 800, anchor: 'start' });
      s += text(184, y + 122, sub, { size: 27, weight: 500, fill: C.mist, anchor: 'start' });
      s += node(80, y + 78, 17, { stroke: hi ? C.red : C.paper, dot: hi ? C.red : null });
    });
    return svg(s);
  };

  D['08'] = () => {
    let s = '';
    s += box(220, 4, 360, 76);
    s += text(400, 43, 'Trade request', { size: 32, weight: 800 });
    s += arrow(400, 84, 400, 114);
    s += box(120, 118, 560, 236, { fill: C.ink, stroke: C.red, sw: 3 });
    s += cap(150, 150, 'Checked first', { anchor: 'start' });
    ['Identity', 'Eligibility', 'Limits'].forEach((l, k) => {
      const y = 196 + k * 52;
      s += box(150, y - 21, 500, 42, { rx: 4 });
      s += text(174, y, l, { size: 28, weight: 600, anchor: 'start' });
      s += tick(618, y, 22);
    });
    s += arrow(300, 358, 210, 402, { stroke: C.ok });
    s += arrow(500, 358, 590, 402, { stroke: C.red });
    s += box(20, 406, 360, 88);
    s += tick(64, 450, 28);
    s += text(96, 450, 'Trade settles', { size: 30, weight: 800, anchor: 'start' });
    s += box(420, 406, 360, 88);
    s += cross(464, 450, 26);
    s += text(496, 450, 'Trade stopped', { size: 30, weight: 800, anchor: 'start' });
    s += text(400, 530, 'every check is recorded', { size: 28, weight: 500, fill: C.mist });
    return svg(s);
  };

  D['09'] = () => {
    let s = '';
    s += box(20, 6, 370, 384);
    s += cap(46, 42, 'Protocol level', { anchor: 'start' });
    const P = [[100, 130], [250, 104], [310, 222], [180, 262], [80, 220]];
    for (let a = 0; a < P.length; a++) for (let b = a + 1; b < P.length; b++) s += line(...P[a], ...P[b], { stroke: '#5a6d79', sw: 2 });
    P.forEach((p, k) => { s += node(...p, 17, k === 2 ? { stroke: C.red, dot: C.red } : {}); });
    s += line(310, 240, 310, 270, { stroke: C.red });
    s += box(244, 270, 132, 54, { fill: C.paper, rx: 4 });
    s += text(310, 298, 'PROOF', { size: 23, weight: 800, fill: C.red, ls: 2 });
    s += text(46, 356, 'Polygraph', { size: 32, weight: 800, anchor: 'start' });
    s += box(410, 6, 370, 384);
    s += cap(436, 42, 'Participant level', { anchor: 'start' });
    [[495, 128], [595, 128], [695, 128], [545, 232], [645, 232]].forEach(([x, y]) => { s += person(x, y, 1.3); s += tick(x + 24, y + 34, 20); });
    s += text(436, 356, 'Everyone known', { size: 32, weight: 800, anchor: 'start' });
    s += box(20, 412, 760, 140, { fill: C.ink, stroke: C.slate, sw: 3 });
    s += lock(84, 486, 1.6, C.red);
    s += text(138, 462, 'Privacy kept', { size: 32, weight: 800, anchor: 'start' });
    s += text(138, 506, 'with zero-knowledge proofs', { size: 28, weight: 500, fill: C.mist, anchor: 'start' });
    return svg(s);
  };

  D['10'] = () => {
    let s = '';
    const steps = [['Verified wallet', 'holds a Receptor credential'], ['Proposal sets rules', 'method, period, quorum'], ['Sign to vote', 'free: no gas, no transaction'], ['Public result', 'signed ballots, receipts on IPFS']];
    s += line(56, 64, 56, 484);
    steps.forEach(([a, b], k) => {
      const y = 64 + k * 140, hi = k === 2;
      s += box(112, y - 58, 668, 116, { fill: hi ? C.ink : C.slate, stroke: hi ? C.red : 'none', sw: 3 });
      s += node(56, y, 28, { stroke: hi ? C.red : C.paper });
      s += text(56, y + 1, String(k + 1), { size: 28, weight: 800 });
      s += text(142, y - 18, a, { size: 33, weight: 800, anchor: 'start' });
      s += text(142, y + 24, b, { size: 27, weight: 500, fill: C.mist, anchor: 'start' });
    });
    return svg(s);
  };

  D['11'] = () => {
    let s = '';
    const ev = [['2024', 'Phase 1: concept study'], ['Jul 2025', 'Redbelly selected'], ['to Feb 2026', 'Phase 2: live pilots'], ['May 2026', 'RBA final report']];
    s += line(200, 30, 200, 330);
    ev.forEach(([t, l], k) => {
      const y = 30 + k * 100, hi = k === 1;
      s += text(172, y, t, { size: 26, weight: 700, fill: hi ? C.red : C.grey, anchor: 'end' });
      s += node(200, y, 15, { stroke: hi ? C.red : C.paper, dot: hi ? C.red : null });
      s += text(236, y, l, { size: 32, weight: hi ? 800 : 600, anchor: 'start' });
    });
    s += box(20, 384, 760, 168, { stroke: C.red, sw: 3 });
    s += text(52, 468, '< 4 min', { size: 66, weight: 800, anchor: 'start' });
    s += text(336, 444, 'tokenised bond issued', { size: 27, weight: 600, anchor: 'start' });
    s += text(336, 482, '& resold, vs up to 4 days', { size: 27, weight: 500, fill: C.mist, anchor: 'start' });
    return svg(s);
  };

  window.renderDiagram = (id) => { seq = 0; return D[id](); };
})();
