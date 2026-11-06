#!/usr/bin/env node
// SEG logo system: the S-E-G cube on a declared geometric grid (3 directions for the CEO) and the official
// lockup «cube + Standard Enterprise Governance» (CEO decision, 6 Nov 2026).
//   PLAYWRIGHT_PATH=<path to playwright> node scripts/seg-logo-vector.js
// Module use (the brand book draws its construction pages from the same geometry):
//   require('./seg-logo-vector.js') → { DIRS, frame, cubeSVG, construction, weights, nameRun, lockupSVG, … }
//
// ── Construction ────────────────────────────────────────────────────────────────────────────────
// Frame. Three faces around one vertex C: top (G), left (S), right (E). Each face is a parallelogram
// with edge vectors U, V; the side faces' U rises at the projection angle α, their V is vertical.
// Module. m = W / Nu (W = a face's horizontal projection, Nu its width in modules). Every stroke,
// counter and seam is a whole or half number of modules.
// Optical rules (each measured and printed by this script):
//   1. Stroke parity. A bar on a side face is sheared: its perpendicular weight is band·(H/Nv)·cos α;
//      a stem's is stem·m. Type practice makes verticals 5–12 % heavier than horizontals so both read
//      equal. B and C sit in that window; A keeps the CEO's heavier stems on purpose (faithful).
//   2. Equal seams. Vertical and diagonal seams get one perpendicular width s: side faces move ±s/2
//      sideways, and a·sin α + (b + c)·cos α = s splits the diagonals between top and sides.
//   3. Rounding compensation. A round stroke-join of width r rounds outer corners and grows each
//      shape by r/2, so seams are drawn r wider and keep their declared width.
//   4. Top-face strokes are equal both ways: both of its axes are foreshortened alike.
//   5. Counters ≥ seams. A letter's slot must be at least as wide as the seam between faces, or the
//      letters close up before the faces separate when the logo gets small.
//   6. Lockup alignment. The name spans the left face's outer vertical edge (its top and bottom
//      corners), not the cube's pointed extremes, which overshoot and would make the type look small.
// Name. «Standard Enterprise Governance» in IBM Plex Sans Bold, as outlines (the brand's Latin face:
// see scripts/brand-type-metrics.js for why Plex Sans pairs best with Cairo). Native kerning, no
// tracking: the face's own spacing is drawn for this weight.
// ────────────────────────────────────────────────────────────────────────────────────────────────
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'marketing/brand/assets/logo');
const T = require('./lib/brand-tokens.js');
const C = T.color;
const FONTKIT = process.env.FONTKIT || '/Users/mac/seg-audit/portal/node_modules/next/dist/compiled/@next/font/dist/fontkit';
const f = (n) => Math.round(n * 100) / 100;
const rad = (d) => (d * Math.PI) / 180;
const NAME = 'Standard Enterprise Governance';

const DIRS = {
  A: {
    key: 'a', name: 'a-faithful', title: 'A · تنظيف أمين', alpha: 28, W: 450, Nu: 11, Nv: 10, seam: 1.1, round: 9, stem: 3, band: 2, topStroke: 2.5,
    why: 'لوجو الـCEO بنفس شخصيته (ميل 28°، أوجه 11:10، أعمدة تقيلة)، على شبكة 11×10 موديول: كل خط عدد صحيح من الموديول، والفواصل متساوية، وقطر الحواف ثابت.',
    S: [[0, 0, 11, 2], [0, 2, 3, 4], [0, 4, 11, 6], [8, 6, 11, 8], [0, 8, 11, 10]],
    E: [[0, 0, 11, 2], [0, 2, 3, 4], [0, 4, 8, 6], [0, 6, 3, 8], [0, 8, 11, 10]],
    G: [[0, 0, 11, 2.5], [0, 0, 2.5, 11], [8.5, 0, 11, 11], [0, 8.5, 6.5, 11], [4, 4.5, 6.5, 8.5]], accentIdx: -1
  },
  B: {
    key: 'b', name: 'b-small', title: 'B · للمقاسات الصغيرة', alpha: 28, W: 450, Nu: 9, Nv: 8, seam: 0.8, round: 0, stem: 2, band: 2, topStroke: 2,
    why: 'نفس الحروف على شبكة أخشن 9×8: 3 أشرطة وفتحتين بنسبة 2:1، وأعمدة معدّلة لتوازن الوزن، و3 درجات مسطّحة من غير تدرّج يضيع في الصغير، وزوايا حادة تلمّ على البكسل.',
    S: [[0, 0, 9, 2], [0, 2, 2, 3], [0, 3, 9, 5], [7, 5, 9, 6], [0, 6, 9, 8]],
    E: [[0, 0, 9, 2], [0, 2, 2, 3], [0, 3, 7, 5], [0, 5, 2, 6], [0, 6, 9, 8]],
    G: [[0, 0, 9, 2], [0, 0, 2, 9], [7, 0, 9, 9], [0, 7, 5.5, 9], [3.5, 4, 5.5, 7]], accentIdx: -1
  },
  C: {
    key: 'c', name: 'c-alternative', title: 'C · مكعّب متساوي + سماوي', alpha: 30, W: 450, Nu: 10, Nv: 10, equal: true, seam: 0.9, round: 12, stem: 2.2, band: 2, topStroke: 2.1,
    why: 'مكعّب أيزومتري حقيقي (30° وأحرف متساوية): الموديول واحد في كل الاتجاهات، فالوزن متوازن بطبيعته. والعمود اللي جوّه الـG سماوي، نفس «ضوء الاستثناء» في كل تصاميم الحملة.',
    S: [[0, 0, 10, 2], [0, 2, 2.2, 4], [0, 4, 10, 6], [7.8, 6, 10, 8], [0, 8, 10, 10]],
    E: [[0, 0, 10, 2], [0, 2, 2.2, 4], [0, 4, 7.4, 6], [0, 6, 2.2, 8], [0, 8, 10, 10]],
    G: [[0, 0, 10, 2.1], [0, 0, 2.1, 10], [7.9, 0, 10, 10], [0, 7.9, 5.8, 10], [3.8, 4.2, 5.8, 7.9]], accentIdx: 4
  }
};
const PAINT = {
  A: { light: { left: [[0, 'seg900'], [1, 'seg600']], top: [[0, 'seg700'], [1, 'seg500']], right: [[0, 'seg900'], [1, 'seg500']] },
       dark: { left: [[0, 'seg500'], [1, 'seg300']], top: [[0, 'seg400'], [1, 'seg200']], right: [[0, 'seg500'], [1, 'seg200']] } },
  B: { light: { left: 'seg900', top: 'seg500', right: 'seg700' }, dark: { left: 'seg500', top: 'seg200', right: 'seg300' } },
  C: { light: { left: [[0, 'navy'], [1, 'seg800']], top: [[0, 'seg700'], [1, 'seg500']], right: [[0, 'seg800'], [1, 'seg600']], accent: 'cyan' },
       dark: { left: [[0, 'seg700'], [1, 'seg500']], top: [[0, 'seg500'], [1, 'seg200']], right: [[0, 'seg600'], [1, 'seg400']], accent: 'cyan' } }
};

// ---- geometry ----
function frame(D) {
  const a = rad(D.alpha), W = D.W, rise = W * Math.tan(a);
  const H = D.equal ? W / Math.cos(a) : W * D.Nv / D.Nu;
  const m = W / D.Nu, s = D.seam * m + D.round;
  const ax = s / 2, bc = (s - ax * Math.sin(a)) / Math.cos(a), b = bc / 2, c = bc / 2;
  return { a, W, H, rise, m, s, faces: {
    top: { o: [-W, -rise - c], U: [W, -rise], V: [W, rise], nu: D.Nu, nv: D.Nu },
    left: { o: [-W - ax, -rise + b], U: [W, rise], V: [0, H], nu: D.Nu, nv: D.Nv },
    right: { o: [ax, b], U: [W, -rise], V: [0, H], nu: D.Nu, nv: D.Nv } } };
}
const P = (F, u, v) => [F.o[0] + F.U[0] * u / F.nu + F.V[0] * v / F.nv, F.o[1] + F.U[1] * u / F.nu + F.V[1] * v / F.nv];
const quad = (F, [u0, v0, u1, v1]) => [P(F, u0, v0), P(F, u1, v0), P(F, u1, v1), P(F, u0, v1)];
const d = (pts) => 'M' + pts.map((p) => `${f(p[0])} ${f(p[1])}`).join(' L') + ' Z';
function weights(D) {
  const G = frame(D), mv = G.H / D.Nv;
  const stem = D.stem * G.m, band = D.band * mv * Math.cos(G.a);
  const gap = ((D.Nv - 3 * D.band) / 2) * mv * Math.cos(G.a);
  return { m: f(G.m), stemPerp: f(stem), bandPerp: f(band), ratio: f(stem / band), counterPerp: f(gap), seam: f(G.s - D.round), round: D.round, HtoW: f(G.H / G.W) };
}
function bbox(D) {
  const G = frame(D), pts = [];
  for (const [k, L] of [['top', 'G'], ['left', 'S'], ['right', 'E']]) for (const r of D[L]) pts.push(...quad(G.faces[k], r));
  const pad = D.round / 2, xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  return { x: Math.min(...xs) - pad, y: Math.min(...ys) - pad, w: Math.max(...xs) - Math.min(...xs) + 2 * pad, h: Math.max(...ys) - Math.min(...ys) + 2 * pad, G };
}
function cubeSVG(dk, mode, idp = '') {
  const D = DIRS[dk], G = frame(D), Pn = mode === 'light' || mode === 'dark' ? PAINT[dk][mode] : null;
  const mono = mode === 'white' ? '#FFFFFF' : mode === 'black' ? '#000000' : null;
  let defs = '', g = '';
  const paint = (face) => {
    if (mono) return mono;
    const p = Pn[face]; if (!Array.isArray(p)) return C[p];
    const F = G.faces[face], s0 = P(F, 0, F.nv / 2), s1 = P(F, F.nu, F.nv / 2), id = `${idp}${dk}${face}`;
    defs += `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${f(s0[0])}" y1="${f(s0[1])}" x2="${f(s1[0])}" y2="${f(s1[1])}">${p.map(([o, c]) => `<stop offset="${o}" stop-color="${C[c]}"/>`).join('')}</linearGradient>`;
    return `url(#${id})`;
  };
  const rj = D.round ? ` stroke-width="${D.round}" stroke-linejoin="round"` : '';
  for (const [face, L] of [['top', 'G'], ['left', 'S'], ['right', 'E']]) {
    let bars = D[L], acc = null;
    if (L === 'G' && D.accentIdx >= 0 && !mono) { acc = bars[D.accentIdx]; bars = bars.filter((_, i) => i !== D.accentIdx); }
    const fill = paint(face);
    g += `<path d="${bars.map((r) => d(quad(G.faces[face], r))).join(' ')}" fill="${fill}"${rj ? ` stroke="${fill}"${rj}` : ''}/>`;
    if (acc) g += `<path d="${d(quad(G.faces[face], acc))}" fill="${C[Pn.accent]}"${rj ? ` stroke="${C[Pn.accent]}"${rj}` : ''}/>`;
  }
  return { defs, g, box: bbox(D) };
}

// ---- the name, as IBM Plex Sans Bold outlines ----
let FONT = null;
function font() {
  if (!FONT) FONT = require(FONTKIT).default(fs.readFileSync(path.join(ROOT, 'marketing/brand/fonts/IBMPlexSansArabic-Bold.ttf')));
  return FONT;
}
// one line at baseline y; cap = cap height in drawing units. Returns { d, w }.
function nameRun(text, x, y, cap) {
  const F = font(), s = cap / F.capHeight, run = F.layout(text);
  let cx = 0, dd = '';
  run.glyphs.forEach((g, i) => {
    const p = run.positions[i], ox = x + (cx + p.xOffset) * s, oy = y - p.yOffset * s;
    for (const c of g.path.commands) {
      const a = c.args.map((v, k) => (k % 2 === 0 ? ox + v * s : oy - v * s)).map(f);
      dd += c.command === 'moveTo' ? `M${a}` : c.command === 'lineTo' ? `L${a}` : c.command === 'quadraticCurveTo' ? `Q${a}` : c.command === 'bezierCurveTo' ? `C${a}` : 'Z';
    }
    cx += p.xAdvance;
  });
  return { d: dd, w: cx * s, descender: -F.descent * s };
}
// name block: 'line' = one line centred on the cube's vertical span; 'stack' = 3 lines spanning it
function nameBlock(layout, x, top, bot) {
  const span = bot - top;
  if (layout === 'line') {
    const cap = span * 0.34, y = top + span / 2 + cap / 2;
    const r = nameRun(NAME, x, y, cap); return { d: r.d, w: r.w };
  }
  // 'stack' = 3 lines; 'two' = «Standard Enterprise / Governance» (the signature: larger type per cube
  // height, so the name stays legible at footer sizes). Either way cap + (n−1)·leading = the edge span.
  const lines = layout === 'two' ? ['Standard Enterprise', 'Governance'] : NAME.split(' ');
  const cap = span / (1 + 1.32 * (lines.length - 1)), lead = cap * 1.32;
  let dd = '', w = 0;
  lines.forEach((word, i) => { const r = nameRun(word, x, top + cap + i * lead, cap); dd += r.d; w = Math.max(w, r.w); });
  return { d: dd, w, cap };
}

const svgDoc = (vb, body, defs) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.map(f).join(' ')}" width="${f(vb[2])}" height="${f(vb[3])}">${defs ? `<defs>${defs}</defs>` : ''}${body}</svg>\n`;
const INK = { light: C.navy, dark: '#FFFFFF', white: '#FFFFFF', black: '#000000' };
function lockupSVG(dk, mode, layout = 'line', idp = 'lk') {
  const c = cubeSVG(dk, mode, idp + layout), B = c.box, G = B.G, F = G.faces.left;
  const top = P(F, 0, 0)[1], bot = P(F, 0, F.nv)[1];
  const x0 = B.x + B.w + G.m * 2; // gap = 2 modules
  const n = nameBlock(layout, x0, top, bot);
  return svgDoc([B.x, B.y, x0 + n.w - B.x + G.m * 0.5, B.h], `${c.g}<path d="${n.d}" fill="${INK[mode]}"/>`, c.defs);
}
function iconSVG(dk, mode) {
  const c = cubeSVG(dk, mode, 'ic'), B = c.box, S = 1024, sc = (S * 0.66) / Math.max(B.w, B.h);
  const ox = (S - B.w * sc) / 2 - B.x * sc, oy = (S - B.h * sc) / 2 - B.y * sc;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}">${c.defs ? `<defs>${c.defs}</defs>` : ''}<rect width="${S}" height="${S}" rx="${S * 0.225}" fill="${mode === 'light' ? '#FFFFFF' : C.navy}"/><g transform="translate(${f(ox)} ${f(oy)}) scale(${f(sc)})">${c.g}</g></svg>\n`;
}
function build(dk) {
  const out = {}, p = `seg-logo-${DIRS[dk].key}_`;
  for (const [mode, n] of [['light', 'color'], ['dark', 'color-on-dark'], ['white', 'mono-white'], ['black', 'mono-black']]) {
    const c = cubeSVG(dk, mode); out[p + n + '.svg'] = svgDoc([c.box.x, c.box.y, c.box.w, c.box.h], c.g, c.defs);
  }
  for (const L of ['line', 'stack', 'two']) for (const mode of ['light', 'dark']) out[`${p}lockup-${L}-${mode}.svg`] = lockupSVG(dk, mode, L);
  out[p + 'icon-light.svg'] = iconSVG(dk, 'light'); out[p + 'icon-dark.svg'] = iconSVG(dk, 'dark');
  return out;
}

// ---- the official lockup on the CEO's own cube (raster, cleaned: seg-logo-raster.js) ----
// The cube image is 520 × 508; its left face's outer vertical edge runs y 178 → 400 (measured on the
// flattened face), so the name aligns to that span exactly as in the vector lockups (rule 6).
const RASTER = { w: 520, h: 508, top: 178, bot: 400, m: 41 };
function officialSVG(mode, layout) {
  const file = mode === 'dark' ? 'seg-logo_white.png' : 'seg-logo_full.png';
  const img = 'data:image/png;base64,' + fs.readFileSync(path.join(OUT, file)).toString('base64');
  const x0 = RASTER.w + RASTER.m * 2, n = nameBlock(layout, x0, RASTER.top, RASTER.bot);
  const W = x0 + n.w + RASTER.m * 0.5;
  return svgDoc([0, 0, W, RASTER.h], `<image href="${img}" x="0" y="0" width="${RASTER.w}" height="${RASTER.h}"/><path d="${n.d}" fill="${INK[mode]}"/>`);
}

// construction drawing (inline SVG for the brand book)
function construction(dk) {
  const D = DIRS[dk], c = cubeSVG(dk, 'light', 'cs' + dk), B = c.box, G = B.G;
  let s = `<g opacity=".22">${c.g}</g>`;
  for (const F of Object.values(G.faces)) {
    for (let u = 0; u <= F.nu; u++) s += `<path d="M${P(F, u, 0).map(f)} L${P(F, u, F.nv).map(f)}" stroke="${C.cyanDeep}" stroke-width="${u % F.nu ? 0.9 : 1.8}" opacity=".75"/>`;
    for (let v = 0; v <= F.nv; v++) s += `<path d="M${P(F, 0, v).map(f)} L${P(F, F.nu, v).map(f)}" stroke="${C.cyanDeep}" stroke-width="${v % F.nv ? 0.9 : 1.8}" opacity=".75"/>`;
  }
  for (const [k, L] of [['top', 'G'], ['left', 'S'], ['right', 'E']]) for (const r of D[L]) s += `<path d="${d(quad(G.faces[k], r))}" fill="none" stroke="${C.navy}" stroke-width="2.2"/>`;
  const L0 = P(G.faces.left, 0, 0), R = 95;
  s += `<path d="M${f(L0[0])} ${f(L0[1])} h${R * 1.7}" stroke="${C.danger}" stroke-width="2" stroke-dasharray="7 5"/>`;
  s += `<path d="M${f(L0[0] + R)} ${f(L0[1])} A${R} ${R} 0 0 1 ${f(L0[0] + R * Math.cos(G.a))} ${f(L0[1] + R * Math.sin(G.a))}" fill="none" stroke="${C.danger}" stroke-width="3"/>`;
  s += `<text x="${f(L0[0] + R + 14)}" y="${f(L0[1] + 34)}" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="700" font-size="30" fill="${C.danger}">α = ${D.alpha}°</text>`;
  const q = G.m * 2; // clear space = 2 modules
  s += `<rect x="${f(B.x - q)}" y="${f(B.y - q)}" width="${f(B.w + 2 * q)}" height="${f(B.h + 2 * q)}" fill="none" stroke="${C.seg600}" stroke-width="2.4" stroke-dasharray="12 9"/>`;
  const pad = G.m * 3;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${f(B.x - pad)} ${f(B.y - pad)} ${f(B.w + 2 * pad)} ${f(B.h + 2 * pad)}">${c.defs ? `<defs>${c.defs}</defs>` : ''}${s}</svg>`;
}

module.exports = { DIRS, PAINT, frame, bbox, cubeSVG, lockupSVG, officialSVG, iconSVG, build, construction, weights, nameRun, NAME, RASTER };

if (require.main === module) (async () => {
  const { chromium } = require(process.env.PLAYWRIGHT_PATH);
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage();
  await page.goto('about:blank');
  const png = async (svgText, file, w, h) => {
    const data = await page.evaluate(async ({ src, w, h }) => {
      const i = new Image(); i.src = src; await i.decode();
      const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d');
      g.imageSmoothingQuality = 'high'; g.drawImage(i, 0, 0, w, h); return c.toDataURL('image/png').split(',')[1];
    }, { src: 'data:image/svg+xml;base64,' + Buffer.from(svgText).toString('base64'), w, h });
    fs.writeFileSync(file, Buffer.from(data, 'base64'));
  };
  const vbOf = (s) => s.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number);
  let n = 0;
  // official lockups (used by every campaign design's signature)
  const off = path.join(OUT, 'official'); fs.mkdirSync(off, { recursive: true });
  for (const L of ['line', 'stack', 'two']) for (const mode of ['light', 'dark']) {
    const s = officialSVG(mode, L), vb = vbOf(s), name = `seg-lockup-official_${L}-${mode}`;
    fs.writeFileSync(path.join(off, name + '.svg'), s);
    const H = 512; await png(s, path.join(off, name + '.png'), Math.round(H * vb[2] / vb[3]), H); n += 2;
  }
  // the three vector directions
  const dirRoot = path.join(OUT, 'directions');
  for (const dk of Object.keys(DIRS)) {
    const dir = path.join(dirRoot, DIRS[dk].name);
    fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
    const F = build(dk);
    for (const [name, s] of Object.entries(F)) {
      fs.writeFileSync(path.join(dir, name), s); n++;
      const vb = vbOf(s), H = name.includes('lockup') ? 512 : 1024;
      await png(s, path.join(dir, name.replace('.svg', '.png')), Math.round(H * vb[2] / vb[3]), H); n++;
    }
    for (const z of [16, 32, 48, 180]) { await png(F[`seg-logo-${DIRS[dk].key}_icon-light.svg`], path.join(dir, `seg-logo-${DIRS[dk].key}_icon-light_${z}.png`), z, z); n++; }
    const w = weights(DIRS[dk]);
    if (w.counterPerp < w.seam) throw new Error(`${dk}: counter ${w.counterPerp} < seam ${w.seam} (rule 5)`);
    console.log(dk, JSON.stringify(w));
  }
  await browser.close();
  console.log(`wrote ${n} files under ${path.relative(ROOT, OUT)}/official and /directions`);
})();
