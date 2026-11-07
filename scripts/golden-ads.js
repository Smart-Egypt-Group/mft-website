#!/usr/bin/env node
// Standard Enterprise Governance (SEG) · Meta campaign creatives v2, "outside the box", composed on
// φ = 1.618 (CEO brief, 5 Nov 2026). Four concepts, one set for both ad sets (Egypt and Saudi Arabia),
// so the copy is plain Arabic both markets read, and no currency sign is shown.
//
//   1-crack      loss aversion: a ledger page splits open. The crack widens by exactly φ every step,
//                from a hair-line at one wrong entry to a chasm at the closing.
//   2-days       scarcity as a closing window (6 Nov 2026; replaces the withdrawn seats hourglass): an
//                hourglass whose sand is the days of the month; the neck is the close (founding.closesAt).
//   3-hawk-eye   authority: a macro raptor eye, the hero, with the evidence chain in its gaze.
//   4-lineup     the shock concept: every journal entry under interrogation, in a police lineup.
//
// φ in code (README.md has the per-design note and the measured deviations):
//   type scale  T[k] = (W/φ⁸)·φᵏ → 23 · 37 · 60 · 97 · 158 · 255 · 412 px; every text size is a step.
//   spacing     14 · 23 · 37 · 60 (same scale); outer margin m = T2 = W/φ⁶.
//   leading     headlines 2/φ = 1.236, body φ = 1.618.
//   grid        golden-section lines x = W/φ², W/φ and y = H/φ², H/φ.
//   spiral      golden rectangle W × W/φ on the bottom edge, subdivided until it converges; its pole
//               ("eye") anchors the hero of designs 1 to 3.
// After rendering, every element carrying data-a="key=value;…" is measured in the browser and its
// deviation from the golden target is written to metrics.json and README.md. The run fails if a text
// size is off the scale, text overflows its box, or the headline touches the eyebrow.
//
// Brand: navy #0D1B3E, cyan #1BB7CD, white, muted alarm red #C0392B for small risk marks only.
// No gold. Arabic RTL. Data rule: every ledger figure and code is test data marked «مثال توضيحي».
// Close date: src/site.config.js → founding.closesAt (via scripts/lib/campaign.js). Test count: platform-facts.js.
// No seat numbers anywhere. Signature: mark + SEG + BY MFT (scripts/lib/campaign.js → signHTML).
//
//   PLAYWRIGHT_PATH=<path to playwright> node scripts/golden-ads.js [filter]
const fs = require('fs');
const path = require('path');

let chromium;
try { ({ chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright')); }
catch { console.error('playwright not found. npm i -D playwright, or set PLAYWRIGHT_PATH.'); process.exit(1); }

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'marketing/designs/golden');
const HOST = path.join(ROOT, 'src/assets/social/golden');
const b64 = (f) => fs.readFileSync(path.join(ROOT, f)).toString('base64');
const CAIRO = b64(require('./lib/brand-tokens.js').font.arabic.file);
const INTER = b64(require('./lib/brand-tokens.js').font.latin.file);
const { founding: FM } = require('../src/site.config.js');
const FACTS = require('../src/content/platform-facts.js');

const { NAVY, DEEP, CYAN, CYAN_INK, W, RED, PAPER } = require('./lib/brand-tokens.js').legacy; // marketing/brand/tokens/seg-tokens.json
const { PHI } = require('./lib/brand-tokens.js').phi; // one source for φ
const FORMATS = { '1x1': [1080, 1080], '4x5': [1080, 1350] };
const ar = (n) => Number(n).toLocaleString('en-US'); // Western digits in all Arabic creative (review, 7 Nov 2026)
const { CLOSE, COPY: K, signHTML } = require('./lib/campaign.js');
const DEMO = 'مثال توضيحي · داتا اختبارية';
const r1 = (v) => Math.round(v * 10) / 10;
const rng = (seed) => { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); };

// ---------------------------------------------------------------- the golden geometry
function geometry(Wd, Hd) {
  const u = Wd / PHI ** 8;
  const T = [0, 1, 2, 3, 4, 5, 6].map((k) => Math.round(u * PHI ** k)); // 23 37 60 97 158 255 412
  const S = { xs: Math.round(T[0] / PHI), s: T[0], m: T[1], l: T[2] };   // 14 23 37 60
  const m = T[2];
  const X1 = Wd / PHI ** 2, X2 = Wd / PHI, Y1 = Hd / PHI ** 2, Y2 = Hd / PHI;
  const Hr = Wd / PHI, ry = Hd - Hr;
  const spiral = (fx) => {
    let [x, y, w, h] = [0, 0, Wd, Hr];
    const sq = [];
    for (let k = 0; k < 14; k++) {
      const t = k % 4;
      if (t === 0) { sq.push([x + w - h, y, h, [x + w - h, y + h]]); w -= h; }
      else if (t === 1) { sq.push([x, y, w, [x + w, y + w]]); y += w; h -= w; }
      else if (t === 2) { sq.push([x, y, h, [x + h, y]]); x += h; w -= h; }
      else { sq.push([x, y + h - w, w, [x, y + h - w]]); h -= w; }
    }
    const map = (px, py) => [fx ? Wd - px : px, ry + (Hr - py)];
    const squares = sq.map(([sx, sy, s]) => { const [ax, ay] = map(sx, sy), [bx, by] = map(sx + s, sy + s); return { x: Math.min(ax, bx), y: Math.min(ay, by), s }; });
    const pts = [];
    sq.forEach(([, , s, c], k) => { for (let i = 0; i <= 24; i++) { const th = (-90 * k - (90 * i) / 24) * Math.PI / 180; pts.push(map(c[0] + s * Math.cos(th), c[1] + s * Math.sin(th))); } });
    return { squares, eye: map(x + w / 2, y + h / 2), d: 'M' + pts.map(([a, b]) => `${r1(a)} ${r1(b)}`).join(' L') };
  };
  const footTop = Hd - m - T[2];
  const subTop = footTop - S.s - Math.round(T[1] * PHI);
  const vz = { top: Y1 + S.s, bottom: subTop - S.s };
  return { W: Wd, H: Hd, u, T, S, m, X1, X2, Y1, Y2, spiral, footTop, subTop, vz };
}

// ---------------------------------------------------------------- shared frame
// scene: full-bleed HTML/SVG behind the frame. paper: light theme (design 1).
function shell(G, { scene, head, headCss = '', css = '', eyebrowNote = '', paper = false, spiralFx = null, guidesExtra = '', sub = 'فحص مجاني لميزان شركتك… <b>في دقائق</b>', cta = 'افحص مجانًا' }) {
  const { W: Wd, H: Hd, T, S, m, X1, X2, Y1, Y2 } = G;
  const sp = spiralFx === null ? null : G.spiral(spiralFx);
  const ink = paper ? NAVY : W, accent = paper ? CYAN_INK : CYAN;
  const guides = `<svg class="guides" viewBox="0 0 ${Wd} ${Hd}" width="${Wd}" height="${Hd}">
      <rect x="${m}" y="${m}" width="${Wd - 2 * m}" height="${Hd - 2 * m}" fill="none" stroke="#FF4FD8" stroke-width="2" stroke-dasharray="6 6"/>
      ${[X1, X2].map((x) => `<line x1="${x}" y1="0" x2="${x}" y2="${Hd}" stroke="#FFC400" stroke-width="2"/>`).join('')}
      ${[Y1, Y2].map((y) => `<line x1="0" y1="${y}" x2="${Wd}" y2="${y}" stroke="#FFC400" stroke-width="2"/>`).join('')}
      ${sp ? `${sp.squares.slice(0, 9).map((q) => `<rect x="${r1(q.x)}" y="${r1(q.y)}" width="${r1(q.s)}" height="${r1(q.s)}" fill="none" stroke="#2BD47D" stroke-width="1.5"/>`).join('')}
      <path d="${sp.d}" fill="none" stroke="#2BD47D" stroke-width="3"/>
      <circle cx="${r1(sp.eye[0])}" cy="${r1(sp.eye[1])}" r="14" fill="none" stroke="#FF4FD8" stroke-width="3"/>` : ''}${guidesExtra}</svg>`;
  return `<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><style>
@font-face{font-family:Cairo;src:url(data:font/woff2;base64,${CAIRO});font-weight:400 900}
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${INTER});font-weight:400 900}
*{box-sizing:border-box;margin: 0;padding: 0}
html,body{width:${Wd}px;height:${Hd}px;overflow:hidden}
body{position:relative;direction:rtl;font-family:Cairo,sans-serif;color:${ink};background:${paper ? PAPER : NAVY}}
.abs{position:absolute}
.lat{font-family:Inter,sans-serif;direction:ltr;unicode-bidi:isolate}
.guides{position:absolute;inset:0;display:none;z-index:9}
body.show-guides .guides{display:block}
.eyebrow{top:${m}px;right:${m}px;left:${m}px;height:${Math.round(T[1] * PHI)}px;display:flex;align-items:center;gap: ${S.s}px;font-size: ${T[1]}px;font-weight:800;color:${accent};white-space:nowrap;z-index:5}
.eyebrow .lat{font-weight:800}
.eyebrow small{font-size: ${T[0]}px;color:${paper ? 'rgba(13,27,62,.6)' : 'rgba(255,255,255,.62)'};font-weight:700}
h1{right:${m}px;left:${m}px;bottom:${Hd - Y1}px;font-weight:900;line-height:${2 / PHI};font-size: ${T[3]}px;z-index:5}
h1 em{font-style:normal;color:${accent}}
h1 .s{display:block;font-size: ${T[1]}px;line-height:${PHI};font-weight:800;color:${paper ? 'rgba(13,27,62,.75)' : 'rgba(255,255,255,.85)'}}
${headCss}
.sub{right:${m}px;left:${m}px;top:${G.subTop}px;height:${Math.round(T[1] * PHI)}px;font-size: ${T[1]}px;line-height:${PHI};font-weight:700;white-space:nowrap;z-index:5;color:${paper ? 'rgba(13,27,62,.85)' : 'rgba(255,255,255,.88)'}}
.sub b{font-weight:900;color:${ink}}
.foot{top:${G.footTop}px;height:${T[2]}px;left:${m}px;right:${m}px;z-index:5}
.cta{position:absolute;top:0;right:0;height:${T[2]}px;width:${Wd - m - X2}px;border-radius:${T[2]}px;background:${CYAN};color:${NAVY};
  display:flex;align-items:center;justify-content:center;gap: ${S.xs}px;font-size: ${T[0]}px;font-weight:800;white-space:nowrap;box-shadow:0 ${S.xs}px ${S.m}px rgba(27,183,205,.3)}
.cta .lat{font-weight:800}
.mark{position:absolute;top:0;left:0;height:${T[2]}px;display:flex;align-items:center;gap: ${S.xs}px;direction:ltr}
.mark img{height:${T[1]}px}
.mark span{font: 800 ${T[0]}px Inter,sans-serif;letter-spacing:.15em}
.tag{display:inline-flex;align-items:center;gap: ${S.xs}px;height:${T[1]}px;padding: 0 ${S.s}px;border-radius:${T[1]}px;border:1.5px solid ${paper ? 'rgba(13,27,62,.35)' : 'rgba(27,183,205,.7)'};
  color:${accent};font-size: ${T[0]}px;font-weight:800;white-space:nowrap;background:${paper ? 'rgba(255,255,255,.85)' : 'rgba(13,27,62,.75)'};z-index:5}
.tag::before{content:'';width:${S.xs}px;height:${S.xs}px;border-radius:50%;background:${accent}}
.dot{display:inline-block;flex:0 0 auto;width:${S.xs}px;height:${S.xs}px;border-radius:50%;background:${RED};box-shadow:0 0 0 ${S.xs / 2}px rgba(192,57,43,.22)}
.fade{left:0;right:0;bottom:0;height:${T[5]}px;background:linear-gradient(180deg,transparent,${paper ? PAPER : DEEP} 61.8%);z-index:4}
${css}
</style><body data-vz-top="${G.vz.top}" data-vz-bottom="${G.vz.bottom}">
${scene(sp)}
<div class="abs fade"></div>
<div class="abs eyebrow" data-g="eyebrow"><span class="lat">Standard Enterprise Governance (SEG)</span>${eyebrowNote ? `<small>${eyebrowNote}</small>` : ''}</div>
<h1 class="abs" data-g="headline">${head}</h1>
<p class="abs sub" data-g="sub">${sub}</p>
<div class="abs foot"><div class="cta" data-g="cta" data-a="left=${r1(X2)}"><span>${cta}</span><span>·</span><span class="lat">seg-audit.com</span></div>
  <div class="mark">${signHTML(T[1], { onLight: paper })}</div></div>
${guides}</body></html>`;
}
const centred = (x, y) => `left:${r1(x)}px;top:${r1(y)}px;transform:translate(-50%,-50%)`;

// ---------------------------------------------------------------- 1) the crack (loss aversion)
// The crack starts as a hair-line at one wrong entry on the spiral's eye and runs to the left edge.
// Its width is w(x) = T0 · φ^((x0 − x)/Δ): it multiplies by φ every Δ px, so it passes exactly through
// the scale widths T0 → T1 → T2 → T3 → T4 → T5. The time markers sit where it reaches T2, T3, T4.
function crack(G) {
  const { W: Wd, H: Hd, T, S, m } = G;
  const sp = G.spiral(true), [x0, ey] = sp.eye;
  const steps = 5, dx = (x0 + S.l) / steps; // T0 at the origin, T5 just past the left edge
  const width = (x) => T[0] * PHI ** ((x0 - x) / dx) * (x0 - x < dx ? (x0 - x) / dx : 1) + 1.5;
  const R = rng(11);
  let yc = ey;
  const top = [], bot = [], branches = [];
  for (let x = x0; x >= -S.l; x -= 5) {
    const w = width(x);
    yc += (R() - 0.5) * Math.min(6, w * 0.06);
    yc += (ey - yc) * 0.04;
    top.push([x, yc - (w / 2) * (0.78 + R() * 0.44)]);
    bot.push([x, yc + (w / 2) * (0.78 + R() * 0.44)]);
    if (R() < 0.035 && w > T[1]) {
      const up = R() < 0.5, len = w * (0.5 + R() * 0.9);
      let bx = x, by = up ? yc - w / 2 : yc + w / 2; const pts = [[bx, by]];
      for (let i = 0; i < 6; i++) { bx += (R() - 0.65) * len / 4; by += (up ? -1 : 1) * len / 6; pts.push([bx, by]); }
      branches.push(pts);
    }
  }
  const poly = [...top, ...bot.reverse()].map(([a, b]) => `${r1(a)},${r1(b)}`).join(' ');
  const marks = [[2, 'بعد أسبوع', 6500], [3, 'بعد شهر', 18000], [4, 'بعد 6 أشهر', 135000]].map(([k, when, amt]) => {
    const x = x0 - k * dx;
    return `<div class="abs mk" data-a="cx=${r1(x)}" style="left:${r1(x)}px;top:${r1(ey + width(x) / 2 + S.l)}px;transform:translateX(-50%)"><b>${when}</b><span>${ar(amt)}</span></div>
      <svg class="abs" style="left:0;top:0;overflow:visible" width="1" height="1"><line x1="${r1(x)}" y1="${r1(ey + width(x) / 2 + S.xs)}" x2="${r1(x)}" y2="${r1(ey + width(x) / 2 + S.l - S.xs)}" stroke="${NAVY}" stroke-width="1.5" stroke-dasharray="3 4" opacity=".55"/></svg>`;
  }).join('');
  // ledger texture: rule every T1, columns on the golden lines
  const rows = []; const accts = ['مصروفات متنوعة', 'الموردين', 'الصندوق', 'البنك', 'العملاء', 'مصروف صيانة', 'إيرادات', 'المخزون'];
  for (let y = Math.ceil((G.vz.top + T[1]) / T[1]) * T[1]; y < G.subTop - T[1]; y += T[1]) {
    if (y > ey - T[5] * 0.62 && y < ey + T[5] * 1.1) continue;
    const i = Math.round(y / T[1]);
    rows.push(`<div class="abs row" style="top:${r1(y - T[1] + 8)}px"><span style="right:${m}px">${accts[i % accts.length]}</span><span class="lat" style="left:${r1(G.X2 - 120)}px">${(((i * 7919) % 90000) + 1000).toLocaleString('en')}.00</span><span class="lat" style="left:${r1(G.X1 - 160)}px">JE/2026/10/${String(300 + i * 7).padStart(4, '0')}</span></div>`);
  }
  return shell(G, {
    paper: true, spiralFx: true, eyebrowNote: 'الخطأ المستخبي',
    head: 'قيد واحد غلط…<br><em>شرخ في الإقفال.</em>',
    scene: () => `<svg class="abs" style="left:0;top:0" width="${Wd}" height="${Hd}">
        <defs><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .05  0 0 0 0 .1  0 0 0 0 .24  0 0 0 .09 0"/></filter>
          <filter id="glow" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="5"/></filter>
          <radialGradient id="vig" cx="50%" cy="45%" r="75%"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="${NAVY}" stop-opacity=".16"/></radialGradient>
          <linearGradient id="deep" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="${NAVY}"/><stop offset="1" stop-color="${DEEP}"/></linearGradient></defs>
        ${Array.from({ length: Math.ceil(Hd / T[1]) }, (_, i) => `<line x1="0" y1="${i * T[1]}" x2="${Wd}" y2="${i * T[1]}" stroke="#D3DAE6" stroke-width="1"/>`).join('')}
        <line x1="${Wd - m + S.xs}" y1="0" x2="${Wd - m + S.xs}" y2="${Hd}" stroke="${CYAN}" stroke-width="2" opacity=".45"/>
        <polygon points="${poly}" fill="#9AA6BD" transform="translate(0 4)" opacity=".55"/>
        <polygon points="${poly}" fill="url(#deep)"/>
        <polygon points="${poly}" fill="none" stroke="${CYAN}" stroke-width="3" opacity=".65" filter="url(#glow)"/>
        ${branches.map((p) => `<polyline points="${p.map(([a, b]) => `${r1(a)},${r1(b)}`).join(' ')}" fill="none" stroke="${DEEP}" stroke-width="2" stroke-linecap="round" opacity=".8"/>`).join('')}
        <rect width="100%" height="100%" filter="url(#grain)"/><rect width="100%" height="100%" fill="url(#vig)"/></svg>
      ${rows.join('')}
      <span class="abs dot origin" data-g="hero" data-a="cx=${r1(x0)};cy=${r1(ey)}" style="${centred(x0, ey)}"></span>
      <div class="abs o-lbl" style="left:${r1(x0 + S.s)}px;top:${r1(ey - T[2] - S.s)}px"><b>اليوم</b><span>${ar(2400)}</span></div>
      ${marks}
      <div class="abs end" style="left:${m}px;top:${r1(ey)}px;transform:translateY(-50%)"><span>عند الإقفال</span><b>${ar(980000)}</b></div>
      <span class="abs tag" style="left:${m}px;top:${r1(G.vz.top)}px">${DEMO}</span>`,
    css: `.row{left:0;right:0;height:${T[1]}px;font-size: ${T[0]}px;color:rgba(13,27,62,.28);font-weight:700}
      .row span{position:absolute;white-space:nowrap}
      .origin{width:${T[0]}px;height:${T[0]}px;z-index:3}
      .o-lbl{display:flex;flex-direction:column;font-size: ${T[0]}px;line-height:1.236;font-weight:800;color:${NAVY};white-space:nowrap}
      .o-lbl span{color:${RED}}
      .mk{display:flex;flex-direction:column;align-items:center;font-size: ${T[0]}px;line-height:1.236;font-weight:800;white-space:nowrap;color:${NAVY}}
      .mk span{color:rgba(13,27,62,.65)}
      .end{display:flex;flex-direction:column;align-items:flex-start;padding: 0 ${S.s}px;color:#fff;line-height:1.236;z-index:3}
      .end span{font-size: ${T[0]}px;font-weight:800;color:${CYAN}}
      .end b{font-size: ${T[2]}px;font-weight:900;white-space:nowrap}`
  });
}

// ---------------------------------------------------------------- 2) the hourglass of days (closing window)
// The neck sits on the spiral's eye. The glass is a golden rectangle (height h, width h/φ) and the
// neck divides its height at the golden section: top bulb h/φ, bottom bulb h/φ².
function hourglass(G) {
  const { T, S, m, vz } = G;
  const sp = G.spiral(true), [nx, ny] = sp.eye;
  const hTop = ny - (G.m + Math.round(T[1] * PHI) + S.l), hBot = vz.bottom - ny;
  const h = Math.min(hTop * PHI, hBot * PHI ** 2), w = h / PHI;
  const top = ny - h / PHI, bot = ny + h / PHI ** 2, neck = T[0];
  const hw = (y) => { // half-width of the glass at y
    if (y <= ny) { const p = (ny - y) / (ny - top); return neck / 2 + (w / 2 - neck / 2) * Math.sin(Math.min(1, p * 1.35) * Math.PI / 2) ** 0.8; }
    const q = (y - ny) / (bot - ny); return neck / 2 + (w / 2 - neck / 2) * Math.sin(Math.min(1, q * 1.35) * Math.PI / 2) ** 0.8;
  };
  const edge = (side) => { const pts = []; for (let y = top; y <= bot + 0.1; y += 4) pts.push([nx + side * hw(y), y]); return pts; };
  const L = edge(-1), Rr = edge(1);
  const glass = 'M' + L.map(([a, b]) => `${r1(a)} ${r1(b)}`).join(' L') + ' L' + Rr.reverse().map(([a, b]) => `${r1(a)} ${r1(b)}`).join(' L') + 'Z';
  // the sand is the month's days (s = T1, gap 6): every day but the close day settles in the top bulb; the
  // close day is the cyan tile in the neck. The bottom bulb stays empty: nothing has been counted down.
  const s = T[1], g = 6, seats = [];
  const fill = (n, y0, dir, cls) => {
    let y = y0, left = n;
    while (left > 0) {
      const room = 2 * hw(y + (dir > 0 ? -s / 2 : s / 2)) - S.s;
      let k = Math.max(1, Math.min(left, Math.floor((room + g) / (s + g))));
      const rowW = k * s + (k - 1) * g;
      for (let i = 0; i < k; i++) seats.push([nx - rowW / 2 + i * (s + g) + s / 2, y, cls]);
      left -= k; y += dir * (s + g);
    }
  };
  const DAYS = new Date(Date.UTC(CLOSE.y, CLOSE.mo, 0)).getUTCDate();
  fill(DAYS - 1, ny - neck - s, -1, 'av');                // top bulb, rows going up from the neck
  const chair = (x, y, cls) => `<g transform="translate(${r1(x - s / 2)} ${r1(y - s / 2)}) scale(${s / 24})" class="${cls}"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M3 8.5h18" stroke-width="2" fill="none"/></g>`;
  const fall = [nx, ny + s * 0.2];
  return shell(G, {
    spiralFx: true, eyebrowNote: 'الأعضاء المؤسِّسون',
    sub: `سعر المؤسِّس… <b>${K.ar.after}</b>`, cta: K.ar.cta,
    head: `<span class="pre">يُغلق</span><b class="big" data-a="cy=${r1(ny)}">${ar(CLOSE.d)}</b><span class="s">${CLOSE.arMonth} · ${CLOSE.arTime.replace(/\d/g, (x) => '0123456789'[x]).replace('مساءً', 'م')}</span>`,
    headCss: `h1{right:auto;left:${m}px;bottom:auto;top:${r1(top)}px;width:${r1(nx - m)}px;z-index:1;display:flex;flex-direction:column;align-items:center;text-align:center;line-height:1}
      h1 .pre{font-size: ${T[3]}px;line-height:1.236}
      h1 .big{font-size: ${T[6]}px;line-height:1;color:${CYAN};font-weight:900;margin: -${S.m}px 0 0}
      h1 .s{margin-top: ${S.xs}px}`,
    scene: () => `<div class="abs bg"></div><svg class="abs" style="left:0;top:0;z-index:2" width="${G.W}" height="${G.H}">
        <defs><linearGradient id="gl" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".3" stop-color="#fff" stop-opacity=".03"/><stop offset=".8" stop-color="#fff" stop-opacity=".02"/><stop offset="1" stop-color="#fff" stop-opacity=".12"/></linearGradient>
          <filter id="b8"><feGaussianBlur stdDeviation="8"/></filter><filter id="b2"><feGaussianBlur stdDeviation="2"/></filter>
          <radialGradient id="halo"><stop offset="0" stop-color="${CYAN}" stop-opacity=".55"/><stop offset="1" stop-color="${CYAN}" stop-opacity="0"/></radialGradient></defs>
        <circle cx="${r1(nx)}" cy="${r1(ny)}" r="${r1(w / PHI)}" fill="url(#halo)" opacity=".35"/>
        <path d="${glass}" fill="url(#gl)" stroke="rgba(255,255,255,.55)" stroke-width="2.5"/>
        <path d="M${r1(nx - w / 2 + S.s)} ${r1(top + S.l)} Q ${r1(nx - w / 2 + S.s)} ${r1(ny - h / PHI ** 3)} ${r1(nx - neck)} ${r1(ny - S.s)}" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".28" filter="url(#b2)"/>
        <rect x="${r1(nx - w / 2 - S.s)}" y="${r1(top - S.s)}" width="${r1(w + 2 * S.s)}" height="${S.s}" rx="${S.xs / 2}" fill="#1A2D5E" stroke="${CYAN}" stroke-width="1.5"/>
        <rect x="${r1(nx - w / 2 - S.s)}" y="${r1(bot)}" width="${r1(w + 2 * S.s)}" height="${S.s}" rx="${S.xs / 2}" fill="#1A2D5E" stroke="${CYAN}" stroke-width="1.5"/>
        ${seats.map(([x, y, c]) => chair(x, y, c)).join('')}
        <circle cx="${r1(fall[0])}" cy="${r1(fall[1])}" r="${s}" fill="${CYAN}" opacity=".5" filter="url(#b8)"/>
        ${chair(fall[0], fall[1], 'fall')}
      </svg>
      <span class="abs" data-g="hero" data-a="cx=${r1(nx)};cy=${r1(ny)}" style="${centred(nx, ny)};width:${neck}px;height:${neck}px"></span>
      <div class="abs legend" style="left:${m}px;top:${r1(bot - T[1])}px"><span><i class="av"></i>أيام ${CLOSE.arMonth}</span><span><i class="tk"></i>${K.ar.selectShort}</span></div>`,
    css: `.bg{inset:0;background:radial-gradient(circle at ${r1(nx)}px ${r1(ny)}px,#1C3068 0%,${NAVY} ${r1(G.W / PHI)}px,${DEEP} 100%)}
      g.av rect{fill:rgba(27,183,205,.08);stroke:${CYAN};stroke-width:1.8} g.av path{stroke:${CYAN}}
      g.tk path{fill:#fff;stroke:#fff;stroke-width:1} g.tk path:last-child{stroke:#fff}
      g.fall rect{fill:${CYAN};stroke:${CYAN};stroke-width:1.4} g.fall path{stroke:${NAVY}}
      .legend{display:flex;justify-content:center;gap: ${S.s}px;font-size: ${T[0]}px;font-weight:700;color:rgba(255,255,255,.8);white-space:nowrap}
      .legend span{display:flex;align-items:center;gap: ${S.xs}px}
      .legend i{width:${S.xs}px;height:${S.xs}px;border-radius:3px;display:block}
      .legend i.tk{background:#fff;border-radius:50%} .legend i.av{border:2px solid ${CYAN}}`
  });
}

// ---------------------------------------------------------------- 3) the hawk's eye (authority)
// A macro raptor eye: the pupil on the spiral's eye, iris radius T5 (255 px), pupil radius T5/φ,
// highlight T5/φ³. Feathers flow along the spiral's tangent. The evidence chain sits in its gaze.
function hawk(G) {
  const { W: Wd, H: Hd, T, S, m, vz } = G;
  const sp = G.spiral(false), [ex, ey] = sp.eye;
  const R = T[5], pr = R / PHI, R2 = rng(5);
  // feathers: short curved strokes whose direction follows a log-spiral field around the eye
  const feathers = [];
  for (let i = 0; i < 1300; i++) {
    const x = R2() * Wd, y = R2() * Hd, dx = x - ex, dy = y - ey, d = Math.hypot(dx, dy);
    if (d < R * 1.12) continue;
    const a = Math.atan2(dy, dx) + Math.PI / 2 + 0.3; // tangent + golden-spiral pitch (atan(2·ln φ/π) ≈ 0.3 rad)
    const len = 20 + R2() * 40 * Math.min(1.6, d / R), c = Math.cos(a), s2 = Math.sin(a);
    const shade = ['#13244F', '#172A59', '#1C3068', '#0E1C42'][Math.floor(R2() * 4)];
    feathers.push(`<path d="M${r1(x)} ${r1(y)} q${r1(c * len * .5 - s2 * 6)} ${r1(s2 * len * .5 + c * 6)} ${r1(c * len)} ${r1(s2 * len)}" stroke="${shade}" stroke-width="${r1(3 + R2() * 5)}" stroke-linecap="round" fill="none" opacity="${r1(0.55 + R2() * 0.45)}"/>`);
  }
  const fibres = Array.from({ length: 220 }, (_, i) => {
    const a = (i / 220) * 2 * Math.PI + R2() * 0.02, r0 = pr * (1.02 + R2() * 0.08), r1_ = R * (0.86 + R2() * 0.12);
    const col = R2() < 0.5 ? '#8EEAF4' : '#0A5563';
    return `<line x1="${r1(ex + r0 * Math.cos(a))}" y1="${r1(ey + r0 * Math.sin(a))}" x2="${r1(ex + r1_ * Math.cos(a + 0.05))}" y2="${r1(ey + r1_ * Math.sin(a + 0.05))}" stroke="${col}" stroke-width="${r1(1 + R2() * 2)}" opacity="${r1(0.15 + R2() * 0.35)}"/>`;
  }).join('');
  // reflection in the cornea: a small document with a check
  const docW = R / PHI ** 2, docH = docW * PHI, dx0 = ex + pr * 0.2, dy0 = ey - pr * 0.55;
  const colLeft = ex + R + S.s, colW = Wd - m - colLeft;
  const chain = [['القيد', 'JE/2026/10/0412'], ['فاتورة المورّد', 'BILL/2026/0389'], ['المرفق', 'bill-0389.pdf']];
  const cy0 = vz.top + S.l;
  // chips start under the proof block's real height (figure + line at line-height 1.236) plus a φ gap; a fixed
  // T[3] offset let the line run into the first chip (CEO, 7 Nov 2026)
  // square frames have less height under the headline: the stack steps down one φ gap (S.s → S.xs)
  const gap = Hd / Wd < 1.1 ? S.xs : S.s, chip0 = cy0 + Math.ceil((T[2] + T[0]) * 1.236) + gap;
  return shell(G, {
    spiralFx: false, eyebrowNote: 'الثقة',
    head: 'كل رقم <em>بدليله.</em><span class="s">المنصة التي تراجع نفسها</span>',
    scene: () => `<svg class="abs" style="left:0;top:0" width="${Wd}" height="${Hd}">
        <defs>
          <radialGradient id="bgp" cx="${r1(ex / Wd * 100)}%" cy="${r1(ey / Hd * 100)}%" r="80%"><stop offset="0" stop-color="#1F3570"/><stop offset=".382" stop-color="${NAVY}"/><stop offset="1" stop-color="${DEEP}"/></radialGradient>
          <radialGradient id="iris" cx="${r1(ex)}" cy="${r1(ey)}" r="${R}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#B8F3F9"/><stop offset=".45" stop-color="#5BD6E6"/><stop offset=".75" stop-color="${CYAN}"/><stop offset=".93" stop-color="#0C6D7C"/><stop offset="1" stop-color="#062F38"/></radialGradient>
          <radialGradient id="sock" cx="${r1(ex)}" cy="${r1(ey)}" r="${r1(R * 1.3)}" gradientUnits="userSpaceOnUse"><stop offset=".8" stop-color="#030816"/><stop offset="1" stop-color="#030816" stop-opacity="0"/></radialGradient>
          <filter id="soft"><feGaussianBlur stdDeviation="3"/></filter><filter id="soft12"><feGaussianBlur stdDeviation="12"/></filter>
          <clipPath id="eyeclip"><circle cx="${r1(ex)}" cy="${r1(ey)}" r="${R}"/></clipPath>
        </defs>
        <rect width="100%" height="100%" fill="url(#bgp)"/>
        ${feathers.join('')}
        <circle cx="${r1(ex)}" cy="${r1(ey)}" r="${r1(R * 1.3)}" fill="url(#sock)"/>
        <circle cx="${r1(ex)}" cy="${r1(ey)}" r="${R}" fill="url(#iris)"/>
        <g clip-path="url(#eyeclip)">${fibres}
          <circle cx="${r1(ex)}" cy="${r1(ey)}" r="${r1(pr)}" fill="#02050D"/>
          <circle cx="${r1(ex)}" cy="${r1(ey)}" r="${r1(pr * 1.06)}" fill="none" stroke="#0A5563" stroke-width="6" opacity=".6"/>
          <g transform="translate(${r1(dx0)} ${r1(dy0)}) skewX(-8)" opacity=".85">
            <rect width="${r1(docW)}" height="${r1(docH)}" rx="4" fill="#E8F7FA"/>
            ${[0, 1, 2, 3].map((i) => `<rect x="${r1(docW * .14)}" y="${r1(docH * (.16 + i * .13))}" width="${r1(docW * (i === 3 ? .4 : .72))}" height="4" rx="2" fill="#7A8BAA"/>`).join('')}
            <circle cx="${r1(docW * .7)}" cy="${r1(docH * .8)}" r="${r1(docW * .17)}" fill="${CYAN}"/>
            <path d="M${r1(docW * .62)} ${r1(docH * .8)} l${r1(docW * .06)} ${r1(docW * .06)} l${r1(docW * .1)} -${r1(docW * .11)}" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <ellipse cx="${r1(ex - R * .38)}" cy="${r1(ey - R * .42)}" rx="${r1(R / PHI ** 3)}" ry="${r1(R / PHI ** 4)}" transform="rotate(-35 ${r1(ex - R * .38)} ${r1(ey - R * .42)})" fill="#fff" opacity=".9" filter="url(#soft)"/>
          <circle cx="${r1(ex + R * .45)}" cy="${r1(ey + R * .35)}" r="${r1(R / PHI ** 5)}" fill="#fff" opacity=".55" filter="url(#soft)"/>
          <path d="M${r1(ex - R * 1.2)} ${r1(ey - R * .38)} Q ${r1(ex)} ${r1(ey - R * .95)} ${r1(ex + R * 1.2)} ${r1(ey - R * .55)} L ${r1(ex + R * 1.2)} ${r1(ey - R * 1.3)} L ${r1(ex - R * 1.2)} ${r1(ey - R * 1.3)} Z" fill="#050B1E" opacity=".72" filter="url(#soft12)"/>
        </g>
        <path d="M${r1(ex - R * 1.32)} ${r1(ey - R * .22)} Q ${r1(ex - R * .2)} ${r1(ey - R * 1.32)} ${r1(ex + R * 1.25)} ${r1(ey - R * .62)} Q ${r1(ex + R * .3)} ${r1(ey - R * 1.05)} ${r1(ex - R * 1.32)} ${r1(ey - R * .22)}Z" fill="#0A1533"/>
        <path d="M${r1(ex - R * 1.32)} ${r1(ey - R * .22)} Q ${r1(ex - R * .2)} ${r1(ey - R * 1.32)} ${r1(ex + R * 1.25)} ${r1(ey - R * .62)}" fill="none" stroke="${CYAN}" stroke-width="2" opacity=".35"/>
        ${chain.map((_, i) => { const y = chip0 + i * (T[2] + gap) + T[2] / 2; return `<path d="M${r1(ex + pr * .9)} ${r1(ey - pr * .2 + i * pr * .2)} C ${r1(ex + R * 1.1)} ${r1(ey)} ${r1(colLeft - S.l)} ${r1(y)} ${r1(colLeft - S.xs)} ${r1(y)}" fill="none" stroke="${CYAN}" stroke-width="1.5" stroke-dasharray="2 6" opacity=".7"/>`; }).join('')}
      </svg>
      <span class="abs" data-g="hero" data-a="cx=${r1(ex)};cy=${r1(ey)}" style="${centred(ex, ey)};width:${r1(pr * 2)}px;height:${r1(pr * 2)}px;border-radius:50%"></span>
      <div class="abs proof" style="left:${r1(colLeft)}px;width:${r1(colW)}px;top:${r1(cy0)}px"><b>+${ar(FACTS.testsFloor)}</b><span>اختبار آلي قبل كل تحديث للمنصة</span></div>
      ${chain.map(([k, v], i) => `<div class="abs chip" style="right:${m}px;top:${r1(chip0 + i * (T[2] + gap))}px;height:${T[2]}px"><span class="ok">✓</span><span>${k}</span><span class="lat v">${v}</span></div>`).join('')}
      <span class="abs tag" style="right:${m}px;top:${r1(chip0 + 3 * (T[2] + gap))}px">${DEMO}</span>`,
    css: `.proof{display:flex;flex-direction:column;align-items:flex-start;line-height:1.236;color:#fff}
      .proof b{font-size: ${T[2]}px;font-weight:900;color:${CYAN}}
      .proof span{font-size: ${T[0]}px;font-weight:700;color:rgba(255,255,255,.75);white-space:nowrap}
      .chip{display:flex;align-items:center;gap: ${S.xs}px;padding: 0 ${S.s}px;border-radius:${T[2]}px;background:rgba(255,255,255,.95);color:${NAVY};font-size: ${T[0]}px;font-weight:800;white-space:nowrap}
      .chip .ok{color:#fff;background:${CYAN};width:${T[1]}px;height:${T[1]}px;border-radius:50%;display:flex;align-items:center;justify-content:center}
      .chip .v{font-weight:700;color:#3B4262}`
  });
}

// ---------------------------------------------------------------- 4) the lineup (every entry under interrogation)
// Police lineup: three journal entries against a height chart. The suspect is a golden rectangle
// (h × h/φ) centred on x = W/φ under the lamp; the other entry is 1/φ of its size. Chart rules every T1.
function lineup(G) {
  const { W: Wd, H: Hd, T, S, m, X2, vz } = G;
  const ch = vz.bottom - vz.top, cw = ch / PHI, cx = X2, floor = vz.bottom;
  const sh = ch / PHI, sw = sh / PHI;
  const side = [[Math.min(cx + cw / 2 + S.m + sw / 2, Wd - m - sw / 2), 'JE/0405']];
  const qs = ['مين أنشأه؟', 'مين اعتمده؟', 'فين المستند؟', 'ليه في آخر دقيقة؟'];
  const chart = [];
  for (let y = floor, n = 0; y > 0; y -= T[1], n++) chart.push(`<line x1="0" y1="${r1(y)}" x2="${Wd}" y2="${r1(y)}" stroke="#fff" stroke-width="${n % 5 ? 1 : 2}" opacity="${n % 5 ? .07 : .16}"/>${n % 5 || y < vz.top + T[1] ? '' : `<text x="${Wd - m + S.xs}" y="${r1(y - 6)}" fill="#fff" opacity=".3" font-family="Inter" font-weight="700" font-size="${T[0]}" text-anchor="middle">${n * 10}</text>`}`);
  const qLeft = m, qRight = cx - cw / 2 - S.m;
  return shell(G, {
    eyebrowNote: 'كل قيد بدليله',
    head: 'كل قيد…<br><em>تحت الاستجواب.</em>',
    scene: () => `<div class="abs bg"></div><svg class="abs" style="left:0;top:0" width="${Wd}" height="${Hd}">
        <defs><linearGradient id="cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E9FBFE" stop-opacity="0"/><stop offset=".38" stop-color="#E9FBFE" stop-opacity=".1"/><stop offset="1" stop-color="#E9FBFE" stop-opacity=".22"/></linearGradient>
          <radialGradient id="pool"><stop offset="0" stop-color="#E9FBFE" stop-opacity=".35"/><stop offset="1" stop-color="#E9FBFE" stop-opacity="0"/></radialGradient></defs>
        ${chart.join('')}
        <polygon points="${r1(cx - S.l)},0 ${r1(cx + S.l)},0 ${r1(cx + cw * .9)},${r1(floor)} ${r1(cx - cw * .9)},${r1(floor)}" fill="url(#cone)"/>
        <ellipse cx="${r1(cx)}" cy="${r1(floor)}" rx="${r1(cw)}" ry="${r1(S.m)}" fill="url(#pool)"/>
        <rect x="0" y="${r1(floor)}" width="${Wd}" height="${r1(Hd - floor)}" fill="${DEEP}" opacity=".7"/>
      </svg>
      ${side.map(([x, code]) => `<div class="abs card dim" style="left:${r1(x - sw / 2)}px;top:${r1(floor - sh)}px;width:${r1(sw)}px;height:${r1(sh)}px">${[.7, .5, .8, .4, .6].map((wd) => `<i style="width:${wd * 100}%"></i>`).join('')}<span class="plac lat">${code}</span></div>`).join('')}
      <div class="abs card lit" data-g="hero" data-a="cx=${r1(cx)};ratio=${r1(PHI * 1000) / 1000}" style="left:${r1(cx - cw / 2)}px;top:${r1(floor - ch)}px;width:${r1(cw)}px;height:${r1(ch)}px">
        <span class="k">قيد يومية</span><span class="lat code">JE/2026/10/0412</span>
        <span class="k2">مصروفات متنوعة</span><b>${ar(48500)}</b>
        <span class="k2">31 أكتوبر · 11:58 م</span>
        <span class="flag"><span class="dot"></span>بلا مرفق</span>
        <span class="flag"><span class="dot"></span>المنشئ = المعتمِد</span></div>
      <div class="abs qs" style="left:${qLeft}px;width:${r1(qRight - qLeft)}px;top:${r1(vz.top)}px;height:${r1(ch)}px">${qs.map((q, i) => `<span style="opacity:${r1(1 - i * 0.12)}">${q}</span>`).join('')}</div>
      <span class="abs tag" style="left:${m}px;top:${r1(vz.top)}px">${DEMO}</span>`,
    css: `.bg{inset:0;background:radial-gradient(ellipse at ${r1(cx)}px ${r1(floor)}px,#1B2F66 0%,${NAVY} 38.2%,#050B1E 100%)}
      .card{border-radius:${S.xs / 2}px;display:flex;flex-direction:column;justify-content:center}
      .dim{background:#B9C3D6;opacity:.32;padding: ${S.s}px;gap: ${S.xs}px;justify-content:flex-start;filter:blur(.6px)}
      .dim i{display:block;height:${S.xs / 2}px;border-radius:4px;background:${NAVY};opacity:.6}
      .plac{position:absolute;left:${S.xs}px;right:${S.xs}px;bottom:${S.s}px;height:${T[1]}px;background:${NAVY};color:#fff;font-size: ${T[0]}px;font-weight:800;display:flex;align-items:center;justify-content:center}
      .lit{background:#FBFCFE;color:${NAVY};padding: ${S.s}px ${S.xs}px;gap: ${S.xs / 2}px;box-shadow:0 0 ${T[2]}px rgba(233,251,254,.25),0 ${S.m}px ${T[2]}px rgba(0,0,0,.5)}
      .lit .k{font-size: ${T[0]}px;font-weight:900;color:${CYAN_INK}}
      .lit .code{font-size: ${T[0]}px;font-weight:800;background:${NAVY};color:#fff;align-self:flex-start;padding: 0 ${S.xs}px;border-radius:4px}
      .lit .k2{font-size: ${T[0]}px;font-weight:700;color:rgba(13,27,62,.7)}
      .lit b{font-size: ${T[2]}px;font-weight:900;line-height:1.236}
      .flag{display:flex;align-items:center;gap: ${S.xs}px;font-size: ${T[0]}px;font-weight:800;color:${NAVY};white-space:nowrap}
      .qs{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap: ${S.s}px}
      .qs span{font-size: ${T[1]}px;font-weight:800;color:#fff;white-space:nowrap;border-inline-start:3px solid ${CYAN};padding-inline-start: ${S.xs}px;line-height:1.236}`
  });
}

// ---------------------------------------------------------------- catalogue
const DESIGNS = [
  { slug: '1-crack', fn: crack, angle: 'الخطأ المستخبي اللي بيكبر (Loss aversion)',
    idea: 'صفحة دفتر يومية بتتشق. قيد واحد غلط النهارده شعرة، ويوم الإقفال شرخ بيقسم الصفحة.',
    phi: 'عرض الشرخ w(x) = T0·φ^((x0−x)/Δ): بيتضرب في φ كل Δ px بالظبط، فبيعدّي على عروض السُّلَّم 23 ← 37 ← 60 ← 97 ← 158 ← 255. نقطة البداية الحمرا على عين الحلزون، وعلامات الزمن (أسبوع، شهر، 6 أشهر) عند العروض T2 وT3 وT4. سطور الدفتر كل T1، والأعمدة على خطوط القسمة.' },
  { slug: '2-days', fn: hourglass, angle: `نافذة الإغلاق «الوقت، مش المقاعد» (${CLOSE.arShort})`,
    idea: `ساعة رملية رملها أيام ${CLOSE.arMonth}، والرقبة هي لحظة الإغلاق: ${CLOSE.arFull}. يوم الإغلاق مربع سماوي في الرقبة، والانتفاخ السفلي فاضي (مفيش عدّ تنازلي يتقادم). حلّت محل ساعة المقاعد المسحوبة (6 نوفمبر 2026).`,
    phi: 'الساعة مستطيل ذهبي (h × h/φ). الرقبة على عين الحلزون، وبتقسم الارتفاع عند القسمة الذهبية: الانتفاخ العلوي h/φ والسفلي h/φ². مربع اليوم T1، ورقم يوم الإغلاق بأكبر درجة T6 (412 px)، وخط منتصفه على مستوى العين تقريبًا (القياس في الجدول).' },
  { slug: '3-hawk-eye', fn: hawk, angle: '«كل رقم بدليله» / «المنصة التي تراجع نفسها»',
    idea: 'عين صقر ماكرو هي البطل: في قرنيتها انعكاس مستند عليه ✓، ونظرتها ممتدة لسلسلة الدليل (القيد ← فاتورة المورّد ← المرفق).',
    phi: 'البؤبؤ على عين الحلزون. نصف قطر القزحية T5 (255)، والبؤبؤ T5/φ، ولمعة الضوء T5/φ³ وT5/φ⁵، والمستند المنعكس مستطيل ذهبي عرضه T5/φ². الريش متجه على مماس حلزون لوغاريتمي بخطوة الحلزون الذهبي (atan(2·ln φ/π) ≈ 0.3 rad).' },
  { slug: '4-lineup', fn: lineup, angle: 'الصادم: «كل قيد تحت الاستجواب»',
    idea: 'طابور تعرّف في قسم شرطة: قيود يومية قدام لوحة الأطوال، والمتهم تحت اللمبة: بلا مرفق، والمنشئ هو المعتمِد، وآخر دقيقة في الشهر.',
    phi: 'القيد المتهم مستطيل ذهبي (h × h/φ) مركزه على الخط x = W/φ تحت مخروط الضوء، والقيد اللي جنبه 1/φ من حجمه، والأسئلة في المساحة اللي قبل خط القسمة. خطوط لوحة الأطوال كل T1. مفيش حلزون هنا: التركيب مبني على القسمة والمستطيلات.' }
];

// ---------------------------------------------------------------- measure
const MEASURE = `(() => {
  const box = (el) => el.getBoundingClientRect();
  const sizes = new Set(), overflow = [], anchors = [];
  for (const el of document.querySelectorAll('body *')) {
    if (el.closest('svg')) continue;
    if (el.closest('.seg-sign')) continue; // the platform signature has its own fixed proportions
    const txt = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (txt) sizes.add(Math.round(parseFloat(getComputedStyle(el).fontSize)));
    const b = box(el);
    if (txt && (b.left < -1 || b.right > innerWidth + 1 || b.bottom > innerHeight + 1 || b.top < -1)) overflow.push('offcanvas:' + (el.className || el.tagName));
  }
  for (const el of document.querySelectorAll('h1,.sub,.cta,.eyebrow,.chip,.tag,.qs span,.flag,.proof span,.mk,.end,.legend,.lit span,.lit b')) {
    const r = document.createRange(); r.selectNodeContents(el); const t = r.getBoundingClientRect(), b = box(el);
    if (t.width > b.width + 2) overflow.push('text>' + (el.className || el.tagName));
  }
  // no two text blocks may overlap (proof, chips, tags, sub, cta)
  const blocks = [...document.querySelectorAll('.proof,.chip,.tag,.sub,.cta,h1')].map((e) => [e, box(e)]);
  for (let i = 0; i < blocks.length; i++) for (let j = i + 1; j < blocks.length; j++) { const [ea, a] = blocks[i], [eb2, b] = blocks[j];
    if (ea.contains(eb2) || eb2.contains(ea)) continue;
    if (a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1) overflow.push('overlap:' + (ea.className || ea.tagName) + '×' + (eb2.className || eb2.tagName)); }
  const eb = box(document.querySelector('.eyebrow')), hr = document.createRange(); hr.selectNodeContents(document.querySelector('h1 .pre') || document.querySelector('h1'));
  if (hr.getBoundingClientRect().top < eb.bottom + 14) overflow.push('headline hits eyebrow');
  for (const el of document.querySelectorAll('[data-a]')) {
    const b = box(el), v = { cx: b.left + b.width / 2, cy: b.top + b.height / 2, left: b.left, right: b.right, top: b.top, bottom: b.bottom, ratio: b.height / b.width };
    for (const kv of el.dataset.a.split(';')) { const [k, t] = kv.split('='); anchors.push({ el: el.dataset.g || el.className.split(' ').slice(-1)[0] || el.tagName, key: k, target: +t, got: Math.round(v[k] * 1000) / 1000 }); }
  }
  const h1 = box(document.querySelector('h1'));
  return { sizes: [...sizes].sort((a, b) => a - b), overflow, anchors, h1bottom: h1.bottom };
})()`;

// ---------------------------------------------------------------- render
async function main() {
  const only = process.argv[2] || '';
  if (!only) { // v2 replaces the v1 pack
    for (const d of fs.existsSync(OUT) ? fs.readdirSync(OUT) : []) { const p = path.join(OUT, d); if (fs.statSync(p).isDirectory()) fs.rmSync(p, { recursive: true }); }
    // HOST (src/assets/social/golden) is a site folder: files are added or overwritten, never removed here.
  }
  fs.mkdirSync(HOST, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', args: ['--disable-gpu'] });
  const enc = await browser.newPage();
  const written = [], metrics = {}, problems = [];
  const toFiles = async (png) => {
    const [webp, jpg] = await enc.evaluate(async (src) => {
      const i = new Image(); i.src = 'data:image/png;base64,' + src; await i.decode();
      const c = document.createElement('canvas'); c.width = i.width; c.height = i.height; c.getContext('2d').drawImage(i, 0, 0);
      return [c.toDataURL('image/webp', 0.9), c.toDataURL('image/jpeg', 0.92)].map((x) => x.split(',')[1]);
    }, png);
    return { webp: Buffer.from(webp, 'base64'), jpg: Buffer.from(jpg, 'base64') };
  };
  for (const d of DESIGNS) for (const [fmt, [w, h]] of Object.entries(FORMATS)) {
    const base = `golden-${d.slug}_ar_${fmt}_${w}x${h}`;
    if (only && !base.includes(only)) continue;
    const G = geometry(w, h);
    const p = await browser.newPage({ viewport: { width: w, height: h } });
    await p.setContent(d.fn(G), { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(200);
    const meas = await p.evaluate(MEASURE);
    // warm-up capture: with Chrome 157 the first screenshot of a fresh page can come back half-painted
    // (the top band repeated at the bottom); the second one is the real frame
    await p.screenshot({ type: 'png' });
    const png = (await p.screenshot({ type: 'png' })).toString('base64');
    await p.evaluate(() => document.body.classList.add('show-guides'));
    const gpng = (await p.screenshot({ type: 'png' })).toString('base64');
    await p.close();
    const dir = path.join(OUT, d.slug);
    fs.mkdirSync(dir, { recursive: true });
    const f = await toFiles(png), g = await toFiles(gpng);
    fs.writeFileSync(path.join(dir, `${base}.webp`), f.webp);
    fs.writeFileSync(path.join(dir, `${base}.jpg`), f.jpg);
    // φ guide overlays are QA material, never shippable art: marketing/designs/_qa/ (review, 7 Nov 2026)
    const qa = path.join(OUT, '..', '_qa', 'golden', d.slug); fs.mkdirSync(qa, { recursive: true });
    fs.writeFileSync(path.join(qa, `${base}_guides.webp`), g.webp);
    fs.copyFileSync(path.join(dir, `${base}.jpg`), path.join(HOST, `${base}.jpg`));
    const anchors = meas.anchors.map((a) => ({ ...a, dev: r1(a.got - a.target) }));
    if (!['2-days'].includes(d.slug)) anchors.push({ el: 'headline', key: 'bottom', target: r1(G.Y1), got: r1(meas.h1bottom), dev: r1(meas.h1bottom - G.Y1) });
    const off = meas.sizes.filter((s) => !G.T.includes(s));
    if (off.length) problems.push(`${base}: font sizes off the φ scale: ${off.join(', ')}`);
    if (meas.overflow.length) problems.push(`${base}: ${[...new Set(meas.overflow)].join(', ')}`);
    metrics[base] = { format: fmt, size: [w, h], scale: G.T, golden_lines: { X1: r1(G.X1), X2: r1(G.X2), Y1: r1(G.Y1), Y2: r1(G.Y2) }, font_sizes_used: meas.sizes, anchors };
    written.push({ d, base, w, h, fmt });
    console.log('wrote', base, anchors.map((a) => `${a.el}.${a.key}:${a.dev}`).join(' '));
  }
  await browser.close();
  if (problems.length) { console.error('\nPROBLEMS:\n' + problems.join('\n')); process.exitCode = 1; }
  if (only) return;
  fs.writeFileSync(path.join(OUT, 'metrics.json'), JSON.stringify(metrics, null, 2) + '\n');
  const G1 = geometry(1080, 1080), G4 = geometry(1080, 1350);
  const url = (b) => `https://www.seg-audit.com/assets/social/golden/${b}.jpg`;

  const html = `<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SEG golden campaign v2</title>
<style>body{margin: 0;padding: 34px 13px;background:#F5F7FA;color:#0D1B3E;font: 16px/1.618 system-ui,sans-serif}h1{font-size: 26px;margin: 0 0 5px}h2{font-size: 16px;margin: 34px 0 5px}.p{margin: 0 0 8px;color:#3B4262;max-width:80ch}
.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap: 21px;align-items:start}figure{margin: 0;background:#fff;border:1px solid #E6E9F0;border-radius:6px;padding: 8px}img{display:block;width:100%;height:auto}
figcaption{font-size: 13px;margin-top: 8px;direction:ltr;text-align:left}figcaption a{color:#0F7C91}.k{font-size: 13px;font-weight:700;color:#0F7C91}code{direction:ltr;unicode-bidi:isolate}</style>
<h1>Standard Enterprise Governance (SEG): إبداعات حملة Meta، النسبة الذهبية φ (v2)</h1>
<p class="p">4 مفاهيم × مقاسي Meta feed (1:1 و4:5)، نفس الطقم لمجموعتَي مصر والسعودية. مولَّدة بالكود عبر <code>scripts/golden-ads.js</code>. بجانب كل إعلان نسخة guides: خطوط القسمة بالأصفر، والحلزون بالأخضر، والعين والهامش بالبنفسجي. القياسات في <code>metrics.json</code>.</p>
${DESIGNS.map((d) => `<h2>${d.slug} <span class="k">${d.angle}</span></h2><p class="p"><b>الفكرة:</b> ${d.idea}</p><p class="p"><b>φ:</b> ${d.phi}</p><div class="g">${written.filter((x) => x.d === d).map((x) => `<figure><img loading="lazy" src="${d.slug}/${x.base}.webp" alt="${x.base}"><figcaption>${x.fmt} · ${x.w}×${x.h} · <a href="${url(x.base)}">JPG</a></figcaption></figure><figure><img loading="lazy" src="../_qa/golden/${d.slug}/${x.base}_guides.webp" alt="${x.base} guides"><figcaption>${x.fmt} · guides</figcaption></figure>`).join('')}</div>`).join('\n')}`;
  fs.writeFileSync(path.join(OUT, 'index.html'), html);

  const md = [];
  md.push('# Standard Enterprise Governance (SEG): إبداعات حملة Meta، النسبة الذهبية φ (v2)', '');
  md.push('بريف الـCEO (5 نوفمبر 2026): «خارج الصندوق»، 4 زوايا، نفس الطقم لمجموعتَي مصر والسعودية. يولّدها [`scripts/golden-ads.js`](../../../scripts/golden-ads.js)، والمعرض في [`index.html`](index.html)، والقياسات في [`metrics.json`](metrics.json). هذا الملف يكتبه السكربت. حلّت محل حزمة v1 (7 زوايا).', '');
  md.push('**المقاسات:** Meta feed 1:1 (1080×1080) و4:5 (1080×1350)، JPG (للرفع) وWebP (للمعرض) ونسخة `_guides.webp` عليها خطوط φ في `marketing/designs/_qa/golden/` (للمراجعة بس، مش للنشر).', '');
  md.push('**البراند:** navy `#0D1B3E` وcyan `#1BB7CD` وأبيض، وأحمر إنذار خافت `#C0392B` للعلامات الصغيرة فقط. بلا ذهبي. عربي RTL، بصياغة يقرأها السوقان، وبلا رمز عملة لأن الطقم واحد لمصر والسعودية. في كل إعلان: «Standard Enterprise Governance (SEG)»، و«فحص مجاني لميزان شركتك… في دقائق»، وCTA «افحص مجانًا · seg-audit.com» (أو «قدّم طلبك» في تصميم النافذة)، وتوقيع المنصة: العلامة + SEG + BY MFT. بلا أرقام مقاعد ولا سعر رقمي.', '');
  md.push('**البيانات:** كل رقم وكود دفاتر داتا اختبارية معلَّمة «مثال توضيحي · داتا اختبارية». الاستثناءان: تاريخ الإغلاق (`site.config.js → founding.closesAt`: ' + CLOSE.arFull + ') وعدد الاختبارات (`platform-facts.js`، ' + FACTS.measuredOn + ').', '');
  md.push('## نظام φ المشترك', '');
  md.push('| العنصر | القاعدة | القيمة على 1080 px |', '|---|---|---|');
  md.push(`| سُلَّم الخط | T[k] = (W/φ⁸)·φᵏ، وكل نص درجة منه (السكربت يفشل لو لقى حجم برّه السُّلَّم) | ${G1.T.join(' · ')} |`);
  md.push(`| التباعد والهامش | ${[G1.S.xs, G1.S.s, G1.S.m, G1.S.l].join(' · ')}؛ الهامش m = T2 = W/φ⁶ | ${G1.m} |`);
  md.push('| المسافة بين السطور | العناوين 2/φ = 1.236، النص φ = 1.618 | |');
  md.push(`| خطوط القسمة | x = W/φ² و W/φ، y = H/φ² و H/φ | x: ${r1(G1.X1)} · ${r1(G1.X2)}؛ y 1:1: ${r1(G1.Y1)} · ${r1(G1.Y2)}؛ y 4:5: ${r1(G4.Y1)} · ${r1(G4.Y2)} |`);
  md.push('| العنوان | آخر سطر على y = H/φ² (ما عدا الساعة الرملية: الرقم العملاق هو العنوان) | |');
  md.push(`| الـCTA | طرفه الأيسر على x = W/φ، وارتفاعه T2، ونصه T0 | |`);
  md.push(`| الحلزون الذهبي | مستطيل W × W/φ على الحافة السفلية، مقسوم لحد ما يتقارب؛ عينه تثبّت البطل في التصميمات 1 إلى 3 | العين 1:1: (${G1.spiral(false).eye.map(r1).join('، ')}) أو (${G1.spiral(true).eye.map(r1).join('، ')})؛ 4:5: (${G4.spiral(false).eye.map(r1).join('، ')}) أو (${G4.spiral(true).eye.map(r1).join('، ')}) |`, '');
  md.push('## المفاهيم', '');
  DESIGNS.forEach((d) => { md.push(`### \`${d.slug}/\` · ${d.angle}`, '', `**الفكرة:** ${d.idea}`, '', `**تطبيق φ:** ${d.phi}`, ''); });
  md.push('## القياس بعد الرندر', '', 'انحراف كل عنصر مُثبَّت عن هدفه الذهبي، بالـpx (ratio بدون وحدة). مقاس من صندوق العنصر في المتصفح بعد تحميل الخطوط.', '');
  md.push('| الملف | العنصر | المقياس | الهدف | الفعلي | الانحراف |', '|---|---|---|---|---|---|');
  for (const [b, mt] of Object.entries(metrics)) for (const a of mt.anchors) md.push(`| \`${b}\` | ${a.el} | ${a.key} | ${a.target} | ${a.got} | ${a.dev} |`);
  md.push('', '## الروابط العامة (JPG)', '');
  written.forEach((x) => md.push(`- \`${x.base}.jpg\`: ${url(x.base)}`));
  md.push('', '## إعادة التوليد', '', '```bash', 'PLAYWRIGHT_PATH=<path to playwright> node scripts/golden-ads.js [filter]', '```', '');
  fs.writeFileSync(path.join(OUT, 'README.md'), md.join('\n'));
  console.log(`${written.length} files`);
}

if (require.main === module) main();
module.exports = { DESIGNS, geometry };
