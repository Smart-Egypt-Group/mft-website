#!/usr/bin/env node
// SEG logo, vector track (6 Nov 2026): three refinement directions of the S-E-G cube, redrawn from
// geometry (not traced), for the CEO to choose from. Nothing here replaces the logo on the designs: the
// designs use the CEO's file (scripts/seg-logo-raster.js) until a direction is approved.
//
//   PLAYWRIGHT_PATH=<path to playwright> node scripts/seg-logo-vector.js
//
// Construction. The cube is three faces around one vertex: top (G), left (S), right (E). Each face is a
// parallelogram with its own edge vectors; every letter is a set of bars drawn in the face's own
// (u, v) square and mapped onto the face, so all three letters share one grid and one stroke. The
// proportions of direction A were measured from the CEO's file by flattening each face back to a
// square (5 horizontal bands per letter, stems ≈ 0.26 of the face, slope ≈ 0.53, faces 0.91 as tall as
// they are wide, seams ≈ 10% of the face). Colours: the darkest / mid / lightest blues of the file.
//
// Directions
//   A · faithful: the CEO's cube, cleaned: same bars, same per-face gradients, soft corners.
//   B · small sizes: chunkier bars (3 × 0.24) and wider slots, flat 3-tone faces, wider seams, square
//       corners: stays readable at 16–32 px (favicon, avatars, app icon).
//   C · alternative: same cube and letters, re-coloured into the campaign system: faces run navy →
//       SEG blue, the G's inner bar is the campaign cyan (the «exception» light of the designs).
// Each: colour (light bg), on-dark, mono white, mono black, horizontal lockup (light / dark), square icon
// (light / dark), as SVG + PNG, a sheet per direction and one comparison board.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'marketing/brand/assets/logo/directions');
const T = require('./lib/brand-tokens.js');

const f = (n) => Math.round(n * 100) / 100;
const pt = (o, U, V, u, v) => [o[0] + U[0] * u + V[0] * v, o[1] + U[1] * u + V[1] * v];
const poly = (pts) => 'M' + pts.map((p) => `${f(p[0])} ${f(p[1])}`).join(' L') + ' Z';

// bars per letter, in face (u, v): [u0, v0, u1, v1]
const LETTERS = {
  A: {
    S: [[0, 0, 1, 0.2], [0, 0.2, 0.26, 0.4], [0, 0.4, 1, 0.62], [0.69, 0.62, 1, 0.78], [0, 0.78, 1, 1]],
    E: [[0, 0, 1, 0.2], [0, 0.2, 0.26, 0.4], [0, 0.4, 0.74, 0.6], [0, 0.6, 0.26, 0.78], [0, 0.78, 1, 1]],
    G: [[0, 0, 1, 0.2], [0, 0, 0.24, 1], [0.8, 0, 1, 1], [0, 0.7, 0.6, 1], [0.72, 0.7, 1, 1], [0.4, 0.4, 0.6, 0.7]]
  },
  B: {
    S: [[0, 0, 1, 0.24], [0, 0.24, 0.3, 0.38], [0, 0.38, 1, 0.62], [0.7, 0.62, 1, 0.76], [0, 0.76, 1, 1]],
    E: [[0, 0, 1, 0.24], [0, 0.24, 0.3, 0.38], [0, 0.38, 0.72, 0.62], [0, 0.62, 0.3, 0.76], [0, 0.76, 1, 1]],
    G: [[0, 0, 1, 0.24], [0, 0, 0.3, 1], [0.76, 0, 1, 1], [0, 0.7, 0.56, 1], [0.72, 0.7, 1, 1], [0.38, 0.42, 0.56, 0.7]]
  }
};

// cube geometry in a 1000 × 1000 box
function faces({ W = 450, k = 0.53, H = 410, g = 44, C = [500, 520] } = {}) {
  const gx = g / 2, a = g / 2, b = g * 0.86 - gx * k; // seams: vertical = g, diagonal ≈ g
  const L = [-W, -W * k], R = [W, -W * k], D = [0, H];
  const top = { o: [C[0] + L[0], C[1] + L[1] - a], U: [W, -W * k], V: [W, W * k] };
  const left = { o: [C[0] + L[0] - gx, C[1] + L[1] + b], U: [W, W * k], V: D };
  const right = { o: [C[0] + gx, C[1] + b], U: R, V: D };
  return { top, left, right };
}
function letterPath(face, bars) {
  return bars.map(([u0, v0, u1, v1]) => poly([pt(face.o, face.U, face.V, u0, v0), pt(face.o, face.U, face.V, u1, v0), pt(face.o, face.U, face.V, u1, v1), pt(face.o, face.U, face.V, u0, v1)])).join(' ');
}
// per-face linear gradient along the face's U edge (dark at the start, light at the end)
function grad(id, face, stops) {
  const a = pt(face.o, face.U, face.V, 0, 0.5), b = pt(face.o, face.U, face.V, 1, 0.5);
  return `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
}

const C = T.color;
// paint sets per direction × background. Each face: [stops] (gradient) or a single colour.
const PAINT = {
  A: {
    light: { left: [[0, C.seg900], [1, C.seg600]], top: [[0, C.seg700], [1, C.seg500]], right: [[0, C.seg900], [1, C.seg500]] },
    dark: { left: [[0, C.seg500], [1, C.seg300]], top: [[0, C.seg400], [1, C.seg200]], right: [[0, C.seg500], [1, C.seg200]] }
  },
  B: {
    light: { left: C.seg900, top: C.seg500, right: C.seg700 },
    dark: { left: C.seg500, top: C.seg200, right: C.seg300 }
  },
  C: {
    light: { left: [[0, C.navy], [1, C.seg800]], top: [[0, C.seg700], [1, C.seg500]], right: [[0, C.seg800], [1, C.seg600]], accent: C.cyan },
    dark: { left: [[0, C.seg700], [1, C.seg500]], top: [[0, C.seg500], [1, C.seg200]], right: [[0, C.seg600], [1, C.seg400]], accent: C.cyan }
  }
};
const DIR = {
  A: { name: 'a-faithful', title: 'A · تنظيف أمين', letters: 'A', geo: {}, round: 10 },
  B: { name: 'b-small', title: 'B · للمقاسات الصغيرة', letters: 'B', geo: { g: 60 }, round: 0 },
  C: { name: 'c-alternative', title: 'C · اتجاه بديل (كحلي + سماوي)', letters: 'B', geo: { g: 34 }, round: 16 }
};

// the cube as an SVG group. mode: light | dark | white | black
function cube(dk, mode, idp = '') {
  const D = DIR[dk], F = faces(D.geo), L = LETTERS[D.letters];
  const P = mode === 'light' || mode === 'dark' ? PAINT[dk][mode] : null;
  const mono = mode === 'white' ? '#FFFFFF' : mode === 'black' ? '#000000' : null;
  let defs = '', g = '';
  const paint = (name) => {
    if (mono) return mono;
    const p = P[name];
    if (Array.isArray(p)) { defs += grad(`${idp}${dk}${name}`, F[name], p); return `url(#${idp}${dk}${name})`; }
    return p;
  };
  const rnd = D.round ? ` stroke-linejoin="round" stroke-width="${D.round}"` : '';
  for (const [name, letter] of [['top', 'G'], ['left', 'S'], ['right', 'E']]) {
    let bars = L[letter];
    let accent = '';
    if (dk === 'C' && letter === 'G' && !mono) { accent = letterPath(F.top, [bars[5]]); bars = bars.slice(0, 5); }
    const fill = paint(name);
    g += `<path d="${letterPath(F[name], bars)}" fill="${fill}"${rnd ? ` stroke="${fill}"${rnd}` : ''}/>`;
    if (accent) g += `<path d="${accent}" fill="${P.accent}"${rnd ? ` stroke="${P.accent}"${rnd}` : ''}/>`;
  }
  return { defs, g };
}

// ---- wordmark: S E G / B Y M F T built from bars on a 3 × 5 grid (pure paths, no font) ----
const GLYPH = {
  S: { w: 3, r: [[0, 0, 3, 1], [0, 0, 1, 3], [0, 2, 3, 1], [2, 2, 1, 3], [0, 4, 3, 1]] },
  E: { w: 3, r: [[0, 0, 3, 1], [0, 0, 1, 5], [0, 2, 2.4, 1], [0, 4, 3, 1]] },
  G: { w: 3, r: [[0, 0, 3, 1], [0, 0, 1, 5], [0, 4, 3, 1], [2, 2, 1, 3], [1.6, 2, 1.4, 1]] },
  B: { w: 3, r: [[0, 0, 1, 5], [0, 0, 2.3, 1], [0, 2, 2.3, 1], [0, 4, 2.3, 1], [2, 0.6, 1, 1.6], [2, 2.6, 1, 1.8]] },
  Y: { w: 3, r: [[0, 0, 1, 2.6], [2, 0, 1, 2.6], [0, 2, 3, 1], [1, 2, 1, 3]] },
  M: { w: 5, r: [[0, 0, 1, 5], [4, 0, 1, 5], [0, 0, 5, 1], [2, 0, 1, 3]] },
  F: { w: 3, r: [[0, 0, 1, 5], [0, 0, 3, 1], [0, 2, 2.4, 1]] },
  T: { w: 3, r: [[0, 0, 3, 1], [1, 0, 1, 5]] },
  ' ': { w: 1.2, r: [] }
};
function word(text, x, y, unit, track = 1) {
  let d = '', cx = x;
  for (const ch of text) {
    const gl = GLYPH[ch];
    for (const [rx, ry, rw, rh] of gl.r) d += `M${f(cx + rx * unit)} ${f(y + ry * unit)} h${f(rw * unit)} v${f(rh * unit)} h${f(-rw * unit)} Z `;
    cx += (gl.w + track) * unit;
  }
  return { d, w: cx - x - track * unit };
}

const svg = (w, h, body, defs = '', bg = '') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${defs ? `<defs>${defs}</defs>` : ''}${bg}${body}</svg>\n`;
const CUBE_BOX = [40, 30, 920, 940]; // the cube's bounds inside its 1000 box (trimmed viewBox)

function files(dk) {
  const out = {};
  const vb = (body, defs) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${CUBE_BOX.join(' ')}" width="${CUBE_BOX[2]}" height="${CUBE_BOX[3]}">${defs ? `<defs>${defs}</defs>` : ''}${body}</svg>\n`;
  for (const mode of ['light', 'dark', 'white', 'black']) {
    const c = cube(dk, mode);
    const name = { light: 'color', dark: 'color-on-dark', white: 'mono-white', black: 'mono-black' }[mode];
    out[`seg-logo-${dk.toLowerCase()}_${name}.svg`] = vb(c.g, c.defs);
  }
  // horizontal lockups: cube + SEG + BY MFT
  for (const mode of ['light', 'dark']) {
    const c = cube(dk, mode, 'lk');
    const ink = mode === 'light' ? C.navy : '#FFFFFF', sub = mode === 'light' ? C.seg700 : C.seg200;
    const ch = 600, s = ch / 1000, cx = 0, cy = 0; // cube 600 tall
    const u = ch * 0.42 / 5, x0 = cx + CUBE_BOX[2] * s + 70;
    const seg = word('SEG', x0, cy + ch * 0.2, u, 1.1);
    const by = word('BY MFT', x0 + 4, cy + ch * 0.2 + 5 * u + u * 1.6, u * 0.36, 1.2);
    const W = Math.ceil(x0 + Math.max(seg.w, by.w) + 20), H = ch;
    const body = `<g transform="translate(${-CUBE_BOX[0] * s} ${-CUBE_BOX[1] * s}) scale(${s})">${c.g}</g><path d="${seg.d}" fill="${ink}"/><path d="${by.d}" fill="${sub}"/>`;
    out[`seg-logo-${dk.toLowerCase()}_lockup-${mode}.svg`] = svg(W, H, body, c.defs);
  }
  // square icons (rounded square, cube at 68%)
  for (const mode of ['light', 'dark']) {
    const c = cube(dk, mode, 'ic');
    const S = 1024, sc = (S * 0.68) / CUBE_BOX[3], ox = (S - CUBE_BOX[2] * sc) / 2 - CUBE_BOX[0] * sc, oy = (S - CUBE_BOX[3] * sc) / 2 - CUBE_BOX[1] * sc;
    const bg = `<rect width="${S}" height="${S}" rx="${S * 0.22}" fill="${mode === 'light' ? '#FFFFFF' : C.navy}"/>`;
    out[`seg-logo-${dk.toLowerCase()}_icon-${mode}.svg`] = svg(S, S, `<g transform="translate(${f(ox)} ${f(oy)}) scale(${f(sc)})">${c.g}</g>`, c.defs, bg);
  }
  return out;
}

(async () => {
  const { chromium } = require(process.env.PLAYWRIGHT_PATH);
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage();
  // SVG → PNG on a canvas (exact pixels, transparent unless bg)
  await page.goto('about:blank');
  const png = async (svgText, file, w, h, bg) => {
    const data = await page.evaluate(async ({ src, w, h, bg }) => {
      const i = new Image(); i.src = src; await i.decode();
      const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d');
      if (bg) { g.fillStyle = bg; g.fillRect(0, 0, w, h); }
      g.imageSmoothingQuality = 'high'; g.drawImage(i, 0, 0, w, h);
      return c.toDataURL('image/png').split(',')[1];
    }, { src: 'data:image/svg+xml;base64,' + Buffer.from(svgText).toString('base64'), w, h, bg });
    fs.writeFileSync(file, Buffer.from(data, 'base64'));
  };
  const made = [];
  const sheets = {};
  for (const dk of ['A', 'B', 'C']) {
    const dir = path.join(OUT, DIR[dk].name);
    fs.mkdirSync(dir, { recursive: true });
    const F = files(dk);
    for (const [n, s] of Object.entries(F)) {
      fs.writeFileSync(path.join(dir, n), s); made.push(path.join(dir, n));
      const m = s.match(/viewBox="([\d.\s-]+)"/)[1].split(/\s+/).map(Number);
      const target = n.includes('icon') ? 1024 : n.includes('lockup') ? 600 : 1024;
      const scale = n.includes('lockup') ? target / m[3] : target / Math.max(m[2], m[3]);
      const out = path.join(dir, n.replace('.svg', '.png'));
      await png(s, out, Math.round(m[2] * scale), Math.round(m[3] * scale)); made.push(out);
    }
    // favicon-size proofs of the light icon
    for (const z of [16, 32, 48, 180]) { const out = path.join(dir, `seg-logo-${dk.toLowerCase()}_icon-light_${z}.png`); await png(F[`seg-logo-${dk.toLowerCase()}_icon-light.svg`], out, z, z); made.push(out); }
    sheets[dk] = F;
  }
  // ---- comparison board (preview for the CEO) ----
  const b64 = (s) => 'data:image/svg+xml;base64,' + Buffer.from(s).toString('base64');
  const fontCSS = `@font-face{font-family:Cairo;src:url(data:font/woff2;base64,${fs.readFileSync(path.join(ROOT, 'src/assets/fonts/cairo-arabic-var.woff2')).toString('base64')})}@font-face{font-family:Inter;src:url(data:font/woff2;base64,${fs.readFileSync(path.join(ROOT, 'src/assets/fonts/inter-latin-var.woff2')).toString('base64')})}`;
  const src = 'data:image/png;base64,' + fs.readFileSync(path.join(ROOT, 'marketing/brand/assets/logo/seg-logo_full.png')).toString('base64');
  const row = (dk) => {
    const F = sheets[dk], p = `seg-logo-${dk.toLowerCase()}_`;
    const cell = (s, bg, w = 180, h = 180, lab = '') => `<div class="c" style="background:${bg}"><img src="${b64(s)}" style="max-width:${w}px;max-height:${h}px"><span style="color:${bg === '#FFFFFF' || bg === '#F4F6FB' ? '#5B6478' : '#AEB8D0'}">${lab}</span></div>`;
    const sizes = [16, 24, 32, 48].map((z) => `<img src="${b64(F[p + 'icon-light.svg'])}" style="width:${z}px;height:${z}px">`).join('');
    // real small-size pixels, shown ×4 (nearest neighbour) so the reader judges what a 16 / 32 px favicon shows
    const zoom = [16, 32].map((z) => `<img src="data:image/png;base64,${fs.readFileSync(path.join(OUT, DIR[dk].name, `seg-logo-${dk.toLowerCase()}_icon-light_${z}.png`)).toString('base64')}" style="width:${z * 4}px;height:${z * 4}px;image-rendering:pixelated">`).join('');
    return `<section><h2>${DIR[dk].title}</h2><div class="g">
      ${cell(F[p + 'color.svg'], '#FFFFFF', 180, 180, 'ملوّن · فاتح')}
      ${cell(F[p + 'color-on-dark.svg'], C.navy, 180, 180, 'ملوّن · غامق')}
      ${cell(F[p + 'mono-black.svg'], '#FFFFFF', 180, 180, 'أحادي أسود')}
      ${cell(F[p + 'mono-white.svg'], C.navy, 180, 180, 'أحادي أبيض')}
      ${cell(F[p + 'lockup-light.svg'], '#FFFFFF', 300, 120, 'Lockup · فاتح')}
      ${cell(F[p + 'lockup-dark.svg'], C.navy, 300, 120, 'Lockup · غامق')}
      ${cell(F[p + 'icon-light.svg'], '#F4F6FB', 150, 150, 'أيقونة')}
      ${cell(F[p + 'icon-dark.svg'], '#F4F6FB', 150, 150, 'أيقونة · غامق')}
      <div class="c" style="background:#FFFFFF"><div class="z">${sizes}</div><span style="color:#5B6478">16 · 24 · 32 · 48 px</span></div>
      <div class="c" style="background:#FFFFFF"><div class="z">${zoom}</div><span style="color:#5B6478">16 و32 px مكبّرين ×4</span></div>
    </div></section>`;
  };
  const board = `<html dir="rtl"><head><style>${fontCSS}body{margin:0;background:#E9EDF5;font-family:Cairo,Inter,sans-serif;padding:40px;width:1520px}h1{margin:0 0 6px;font-size:40px;color:${C.navy}}p.s{margin:0 0 28px;color:#46506A;font-size:20px}
  section{background:#fff;border-radius:20px;padding:24px 28px;margin-bottom:24px}h2{margin:0 0 16px;font-size:28px;color:${C.navy}}.g{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;direction:ltr}
  .c{border-radius:12px;height:250px;padding:14px;box-sizing:border-box;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;border:1px solid #DDE3EE}.c span{font-size:15px;direction:rtl}.z{display:flex;gap:14px;align-items:end}
  .src{display:flex;gap:24px;align-items:center;background:#fff;border-radius:20px;padding:20px 28px;margin-bottom:24px}.src img{height:120px}</style></head><body>
  <h1>لوجو SEG: 3 اتجاهات للاعتماد</h1><p class="s">إعادة رسم vector من هندسة المكعّب (مش تتبّع صورة). الألوان مستخرجة من ملف الـCEO. الاختيار للـCEO قبل التعميم على الأصول.</p>
  <div class="src"><img src="${src}"><div><b style="font-size:22px;color:${C.navy}">الأصل (ملف الـCEO، 180×180 px)</b><br><span style="color:#46506A;font-size:18px">ده المستخدم دلوقتي في التوقيع على كل التصاميم، لحد اعتماد اتجاه.</span></div></div>
  ${row('A')}${row('B')}${row('C')}</body></html>`;
  await page.setViewportSize({ width: 1600, height: 1000 });
  await page.setContent(board);
  await page.waitForTimeout(400);
  const boardFile = path.join(OUT, 'seg-logo-directions_board.png');
  await page.screenshot({ path: boardFile, fullPage: true });
  made.push(boardFile);
  await browser.close();
  console.log(`wrote ${made.length} files under ${path.relative(ROOT, OUT)}`);
})();
