#!/usr/bin/env node
// Standard Enterprise Governance (SEG) · golden-ratio Meta feed pack (CEO brief, 5 Nov 2026).
// Seven persuasion angles, each composed on φ = 1.618 in code, rendered at Meta feed 1:1 (1080×1080)
// and 4:5 (1080×1350) as JPG + WebP into marketing/designs/golden/<slug>/. The JPGs are copied to
// src/assets/social/golden/ so the site serves them by direct URL for ad selection.
//
// How φ is applied (every value below is computed, not eyeballed; README.md has the full note):
//   type scale   T[k] = (W / φ⁸) · φᵏ  →  23 · 37 · 60 · 97 · 158 · 255 px. Every text size is one step.
//   spacing      the same scale: 14 (T0/φ) · 23 · 37 · 60. Outer margin m = T2 = W/φ⁶.
//   leading      headlines 2/φ = 1.236, body φ = 1.618.
//   grid         golden-section lines x = W/φ², W/φ and y = H/φ², H/φ (the four power points).
//                The headline's last line sits on y = H/φ²; the CTA's left edge sits on x = W/φ.
//   spiral       a golden rectangle W × W/φ, aligned to the bottom edge, subdivided 12 times into
//                squares (each 1/φ of the last). Its pole ("eye") is computed as the limit of the
//                subdivision, and each design's hero (number, seat field, first evidence) is centred on it.
//   splits       panels, cards and the seat field use 1 : φ divisions; circle sizes and chip sizes step by φ.
// After rendering, the script measures every anchored element in the browser and writes the deviation
// from its golden target to metrics.json and README.md; it fails if any text size is off the scale or
// any text box overflows.
//
// Brand: navy #0D1B3E, cyan #1BB7CD, white, and a muted alarm red #C0392B used only for small risk
// marks. No gold. Arabic RTL. Data rule (CEO): every ledger figure is test data marked «مثال توضيحي».
// The seat numbers come from src/site.config.js → founding (the published offer); the test count from
// src/content/platform-facts.js.
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
const MARK = 'data:image/png;base64,' + b64('src/assets/logo/mft-mark-white.png');
const CAIRO = b64('src/assets/fonts/cairo-arabic-var.woff2');
const INTER = b64('src/assets/fonts/inter-latin-var.woff2');
const { founding: FM } = require('../src/site.config.js');
const FACTS = require('../src/content/platform-facts.js');

const NAVY = '#0D1B3E', CYAN = '#1BB7CD', W = '#FFFFFF', RED = '#C0392B';
const PHI = (1 + Math.sqrt(5)) / 2;
const FORMATS = { '1x1': [1080, 1080], '4x5': [1080, 1350] };
const ar = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '٬').replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
const FILLED = FM.showCount ? FM.filled : 0, TOTAL = FM.total, LEFT = TOTAL - FILLED;
const DEMO = 'مثال توضيحي · داتا اختبارية';
const r1 = (v) => Math.round(v * 10) / 10;

// ---------------------------------------------------------------- the golden geometry
function geometry(Wd, Hd) {
  const u = Wd / PHI ** 8;
  const T = [0, 1, 2, 3, 4, 5].map((k) => Math.round(u * PHI ** k)); // 23 37 60 97 158 255
  const S = { xs: Math.round(T[0] / PHI), s: T[0], m: T[1], l: T[2] };   // 14 23 37 60
  const m = T[2];
  const X1 = Wd / PHI ** 2, X2 = Wd / PHI, Y1 = Hd / PHI ** 2, Y2 = Hd / PHI;
  // Spiral: golden rectangle W × W/φ on the bottom edge, flipped vertically so its pole is in the
  // upper half of the rectangle. fx picks the pole's side (false: left of centre, true: right).
  const Hr = Wd / PHI, ry = Hd - Hr;
  const spiral = (fx) => {
    let [x, y, w, h] = [0, 0, Wd, Hr];
    const sq = [];
    for (let k = 0; k < 14; k++) {
      const t = k % 4;
      if (t === 0) { sq.push([x + w - h, y, h, 0, [x + w - h, y + h]]); w -= h; }
      else if (t === 1) { sq.push([x, y, w, 1, [x + w, y + w]]); y += w; h -= w; }
      else if (t === 2) { sq.push([x, y, h, 2, [x + h, y]]); x += h; w -= h; }
      else { sq.push([x, y + h - w, w, 3, [x, y + h - w]]); h -= w; }
    }
    const map = (px, py) => [fx ? Wd - px : px, ry + (Hr - py)];
    const squares = sq.map(([sx, sy, s]) => { const [ax, ay] = map(sx, sy), [bx, by] = map(sx + s, sy + s);
      return { x: Math.min(ax, bx), y: Math.min(ay, by), s }; });
    // Quarter arcs, θ falling by 90° per square (see the derivation in README.md).
    const pts = [];
    sq.forEach(([, , s, , c], k) => { for (let i = 0; i <= 24; i++) {
      const th = (-90 * k - (90 * i) / 24) * Math.PI / 180; pts.push(map(c[0] + s * Math.cos(th), c[1] + s * Math.sin(th))); } });
    const eye = map(x + w / 2, y + h / 2);
    return { squares, eye, d: 'M' + pts.map(([a, b]) => `${r1(a)} ${r1(b)}`).join(' L') };
  };
  // Vertical zones. Headline ends on Y1. Footer row (CTA + logo) is T2 high on the bottom margin,
  // the bait line sits one T0 gap above it, and the visual zone fills the space between.
  const footTop = Hd - m - T[2];
  const subTop = footTop - S.s - Math.round(T[1] * PHI);
  const vz = { top: Y1 + S.s, bottom: subTop - S.s };
  return { W: Wd, H: Hd, u, T, S, m, X1, X2, Y1, Y2, spiral, footTop, subTop, vz };
}

// ---------------------------------------------------------------- shared shell
function shell(G, { head, visual, spiralFx = false, showSpiral = true, css = '', eyebrowNote = '' }) {
  const { W: Wd, H: Hd, T, S, m, X1, X2, Y1, Y2 } = G;
  const sp = G.spiral(spiralFx);
  const guides = `<svg class="guides" viewBox="0 0 ${Wd} ${Hd}" width="${Wd}" height="${Hd}">
      <rect x="${m}" y="${m}" width="${Wd - 2 * m}" height="${Hd - 2 * m}" fill="none" stroke="#FF4FD8" stroke-width="2" stroke-dasharray="6 6"/>
      ${[X1, X2].map((x) => `<line x1="${x}" y1="0" x2="${x}" y2="${Hd}" stroke="#FFE14F" stroke-width="2"/>`).join('')}
      ${[Y1, Y2].map((y) => `<line x1="0" y1="${y}" x2="${Wd}" y2="${y}" stroke="#FFE14F" stroke-width="2"/>`).join('')}
      ${sp.squares.slice(0, 9).map((q) => `<rect x="${r1(q.x)}" y="${r1(q.y)}" width="${r1(q.s)}" height="${r1(q.s)}" fill="none" stroke="#7CFFB2" stroke-width="1.5"/>`).join('')}
      <path d="${sp.d}" fill="none" stroke="#7CFFB2" stroke-width="3"/>
      <circle cx="${r1(sp.eye[0])}" cy="${r1(sp.eye[1])}" r="14" fill="none" stroke="#FF4FD8" stroke-width="3"/>
      <line x1="${sp.eye[0] - 30}" y1="${sp.eye[1]}" x2="${sp.eye[0] + 30}" y2="${sp.eye[1]}" stroke="#FF4FD8" stroke-width="2"/>
      <line x1="${sp.eye[0]}" y1="${sp.eye[1] - 30}" x2="${sp.eye[0]}" y2="${sp.eye[1] + 30}" stroke="#FF4FD8" stroke-width="2"/></svg>`;
  const lineDecor = showSpiral ? `<svg class="spiral" viewBox="0 0 ${Wd} ${Hd}" width="${Wd}" height="${Hd}"><path d="${sp.d}" fill="none" stroke="${CYAN}" stroke-width="1.5"/></svg>` : '';
  return `<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><style>
@font-face{font-family:Cairo;src:url(data:font/woff2;base64,${CAIRO});font-weight:400 900}
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${INTER});font-weight:400 900}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${Wd}px;height:${Hd}px;overflow:hidden}
body{position:relative;direction:rtl;font-family:Cairo,sans-serif;color:${W};
  background:radial-gradient(circle at ${r1(sp.eye[0])}px ${r1(sp.eye[1])}px, #1A2D5E 0%, ${NAVY} ${r1(Wd / PHI)}px, #081230 100%)}
.abs{position:absolute}
.lat{font-family:Inter,sans-serif;direction:ltr;unicode-bidi:isolate}
.spiral{position:absolute;inset:0;opacity:.16}
.guides{position:absolute;inset:0;display:none;z-index:9}
body.show-guides .guides{display:block}
.eyebrow{top:${m}px;right:${m}px;left:${m}px;height:${Math.round(T[1] * PHI)}px;display:flex;align-items:center;gap:${S.s}px;font-size:${T[1]}px;font-weight:800;color:${CYAN};white-space:nowrap}
.eyebrow .lat{font-weight:800}
.eyebrow small{font-size:${T[0]}px;color:rgba(255,255,255,.62);font-weight:700}
h1{right:${m}px;left:${m}px;bottom:${Hd - Y1}px;font-weight:900;line-height:${r1(2 / PHI * 1000) / 1000};font-size:${T[3]}px}
h1 em{font-style:normal;color:${CYAN}}
.sub{right:${m}px;left:${m}px;top:${G.subTop}px;height:${Math.round(T[1] * PHI)}px;font-size:${T[1]}px;line-height:${r1(PHI * 1000) / 1000};font-weight:700;color:rgba(255,255,255,.86);white-space:nowrap}
.sub b{color:${W};font-weight:900}
.foot{top:${G.footTop}px;height:${T[2]}px;left:${m}px;right:${m}px}
.cta{position:absolute;top:0;right:0;height:${T[2]}px;width:${Wd - m - X2}px;border-radius:${T[2]}px;background:${CYAN};color:${NAVY};
  display:flex;align-items:center;justify-content:center;gap:${S.xs}px;font-size:${T[0]}px;font-weight:800;white-space:nowrap}
.cta .lat{font-weight:800}
.mark{position:absolute;top:0;left:0;height:${T[2]}px;display:flex;align-items:center;gap:${S.xs}px;direction:ltr}
.mark img{height:${T[1]}px}
.mark span{font:800 ${T[0]}px Inter,sans-serif;letter-spacing:.15em}
.tag{display:inline-flex;align-items:center;gap:${S.xs}px;height:${T[1]}px;padding:0 ${S.s}px;border-radius:${T[1]}px;border:1.5px solid rgba(27,183,205,.7);
  color:${CYAN};font-size:${T[0]}px;font-weight:800;white-space:nowrap;background:rgba(13,27,62,.7)}
.tag::before{content:'';width:${S.xs}px;height:${S.xs}px;border-radius:50%;background:${CYAN}}
.dot{display:inline-block;border-radius:50%;background:${RED};box-shadow:0 0 0 ${S.xs / 2}px rgba(192,57,43,.25)}
${css}
</style><body data-vz-top="${G.vz.top}" data-vz-bottom="${G.vz.bottom}">${lineDecor}
<div class="abs eyebrow" data-g="eyebrow"><span class="lat">Standard Enterprise Governance (SEG)</span>${eyebrowNote ? `<small>${eyebrowNote}</small>` : ''}</div>
<h1 class="abs" data-g="headline">${head}</h1>
${visual(sp)}
<p class="abs sub" data-g="sub">فحص مجاني لميزان شركتك… <b>في دقائق</b></p>
<div class="abs foot"><div class="cta" data-g="cta"><span>افحص مجانًا</span><span>·</span><span class="lat">seg-audit.com</span></div>
  <div class="mark" data-g="logo"><img src="${MARK}" alt=""><span>MFT</span></div></div>
${guides}</body></html>`;
}

// Places an element so its centre is on (x, y).
const centred = (x, y) => `left:${r1(x)}px;top:${r1(y)}px;transform:translate(-50%,-50%)`;

// ---------------------------------------------------------------- 1) the hidden error grows
// Circles grow by φ from a red origin dot on the spiral's eye: 23 → 97 → 158 → 255 px (T0, T3, T4, T5).
function hidden(G) {
  const { T, S } = G;
  return shell(G, {
    eyebrowNote: 'الخطأ المستخبي',
    spiralFx: true,
    head: 'الخطأ المستخبي<br><em>بيكبر كل يوم.</em>',
    visual: (sp) => {
      const [ex, ey] = sp.eye;
      const steps = [[T[0], 2400, 'اليوم'], [T[3], 18000, 'بعد شهر'], [T[4], 135000, 'بعد ٦ شهور'], [T[5], 980000, 'عند الإقفال']];
      let x = ex, out = '';
      steps.forEach(([d, amt, when], i) => {
        if (i > 0) x -= steps[i - 1][0] / 2 + S.s + d / 2;
        const fs = i === 0 ? T[0] : T[i - 1];
        out += i === 0
          ? `<span class="abs dot" data-g="hero" style="${centred(x, ey)};width:${d}px;height:${d}px"></span>
             <span class="abs lbl" style="left:${r1(x)}px;top:${r1(ey + d / 2 + S.s)}px;transform:translateX(-50%)">${when}<br><b>${ar(amt)}</b></span>`
          : `<div class="abs vzc disc d${i}" style="${centred(x, ey)};width:${d}px;height:${d}px"><b style="font-size:${fs}px">${ar(amt)}</b></div>
             <span class="abs lbl" style="left:${r1(x)}px;top:${r1(ey + d / 2 + S.s)}px;transform:translateX(-50%)">${when}</span>`;
      });
      return out + `<span class="abs tag" style="right:${G.m}px;top:${G.vz.top}px">${DEMO} · ج.م</span>`;
    },
    css: `.disc{border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid rgba(27,183,205,.6);
        background:radial-gradient(circle at 35% 30%, rgba(255,255,255,.2), rgba(27,183,205,.1) 61.8%, rgba(27,183,205,.04))}
      .disc b{font-weight:900;white-space:nowrap}
      .d3{border-color:#fff;box-shadow:0 0 0 ${G.S.xs}px rgba(255,255,255,.06),0 0 ${G.T[2]}px rgba(27,183,205,.35)}
      .lbl{font-size:${T[0]}px;font-weight:800;color:rgba(255,255,255,.75);white-space:nowrap;text-align:center;line-height:1.236}
      .lbl b{color:#fff}`
  });
}

// ---------------------------------------------------------------- 2) five things you can't see
// The visual zone splits at x = W/φ²: the list card fills the φ part, the hidden "٢" sits on the eye.
function five(G) {
  const { T, S, m, X1, vz } = G;
  const rows = [['حسابات معلّقة بقالها شهور', 1], ['أرصدة عكس طبيعتها', 1], ['قيود يدوية على حسابات حساسة', 1], ['ميزان مش متزن', 0], ['قيود بتاريخ رجعي', 0]];
  return shell(G, {
    eyebrowNote: 'فحص الميزان',
    head: '<em>٥</em> حاجات في دفاترك<br>مش شايفها.',
    visual: (sp) => `<div class="abs card vzc" style="right:${m}px;left:${r1(X1)}px;top:${vz.top}px;height:${r1(vz.bottom - vz.top)}px">
        ${rows.map(([t, on], i) => `<div class="r${on ? '' : ' hid'}"><span class="n">${ar(i + 1)}</span><span class="t">${t}</span>${on ? `<span class="dot" style="width:${S.xs}px;height:${S.xs}px"></span>` : ''}</div>`).join('')}</div>
      <div class="abs hero vzc" data-g="hero" style="${centred(sp.eye[0], sp.eye[1])}"><b>٢</b><span>مستخبيين</span></div>`,
    css: `.card{background:#fff;color:${NAVY};border-radius:${S.s}px;padding:${S.xs}px ${S.m}px;display:flex;flex-direction:column;justify-content:space-around;box-shadow:0 ${S.m}px ${T[2]}px rgba(0,0,0,.35)}
      .r{display:flex;align-items:center;gap:${S.s}px;font-weight:800;font-size:${T[0]}px;white-space:nowrap}
      .r+.r{border-top:2px solid #E6E9F0;padding-top:${S.xs / 2}px}
      .n{flex:0 0 auto;width:${T[1]}px;height:${T[1]}px;border-radius:50%;background:${NAVY};color:#fff;display:flex;align-items:center;justify-content:center}
      .t{flex:1}
      .hid .t,.hid .n{filter:blur(${S.xs / 2}px)}
      .hero{display:flex;flex-direction:column;align-items:center;line-height:1}
      .hero b{font-size:${T[5]}px;font-weight:900;color:${CYAN};line-height:1}
      .hero span{font-size:${T[0]}px;font-weight:800;color:rgba(255,255,255,.8);margin-top:${S.xs}px}`
  });
}

// ---------------------------------------------------------------- 3) shocking specificity
// One exact number at T4 (158 px). Its centre line runs through the spiral's eye.
function shock(G) {
  const { T, S, m } = G;
  return shell(G, {
    eyebrowNote: 'رصيد شاذ',
    showSpiral: true,
    head: 'خزينتك <em>بالسالب؟</em><br>ده مش رقم طبيعي.',
    visual: (sp) => `<div class="abs acct-h vzc" style="right:${m}px;left:${m}px;bottom:${r1(G.H - sp.eye[1] + T[4] * 0.62)}px"><span>حساب: الخزينة الرئيسية · ٣١ أكتوبر</span><span class="tag">${DEMO}</span></div>
      <div class="abs num vzc" data-g="hero" style="left:50%;top:${r1(sp.eye[1])}px;transform:translate(-50%,-50%)"><span class="minus">−</span><span>${ar(18747106)}</span><span class="cur">ج.م</span></div>
      <div class="abs flag vzc" style="right:${m}px;left:${m}px;top:${r1(sp.eye[1] + T[4] * 0.62)}px"><span class="dot" style="width:${S.xs}px;height:${S.xs}px"></span><span>رصيد دائن على حساب نقدية</span></div>`,
    css: `.acct-h{display:flex;justify-content:space-between;align-items:center;font-size:${T[0]}px;font-weight:800;color:rgba(255,255,255,.8)}
      .num{display:flex;align-items:baseline;gap:${S.xs}px;direction:ltr;white-space:nowrap;font-size:${T[4]}px;font-weight:900;line-height:1}
      .minus{color:${RED}}
      .cur{font-size:${T[1]}px;font-weight:800;color:rgba(255,255,255,.7)}
      .flag{display:flex;align-items:center;justify-content:center;gap:${S.xs}px;font-size:${T[1]}px;font-weight:800}`
  });
}

// ---------------------------------------------------------------- 4) scarcity 33 / 50
// The 50 seats are laid out by the golden angle (137.508° = 360°/φ²), Vogel's sunflower model,
// with the pole on the spiral's eye. Seat k sits at r = c·√k.
function scarcity(G) {
  const { T, S, m, vz } = G;
  const GA = 2 * Math.PI / PHI ** 2;
  return shell(G, {
    eyebrowNote: 'الأعضاء المؤسِّسون',
    head: 'المقاعد المؤسِّسة<br><em>بتخلص.</em>',
    visual: (sp) => {
      const [ex, ey] = sp.eye;
      const R = Math.min((vz.bottom - vz.top) / 2, ex - m) - S.s;
      const c = R / Math.sqrt(TOTAL - 0.5), d = Math.round(c * 0.9);
      const seats = Array.from({ length: TOTAL }, (_, k) => {
        const r = c * Math.sqrt(k + 0.5), a = k * GA;
        const cls = k < FILLED ? 'f' : k === FILLED ? 'me' : '';
        return `<i class="abs ${cls}" style="${centred(ex + r * Math.cos(a), ey + r * Math.sin(a))};width:${d}px;height:${d}px"${k === 0 ? ' data-g="hero"' : ''}></i>`;
      }).join('');
      const right = G.W - m, left = ex + R + S.l;
      return `${seats}<div class="abs side vzc" style="right:${m}px;width:${r1(right - left)}px;top:${r1(ey)}px;transform:translateY(-50%)">
          <b>${ar(LEFT)}</b><span class="l1">مقعد باقي من ${ar(TOTAL)}</span>
          <span class="legs"><span class="leg"><i class="f"></i>انضمّت ${ar(FILLED)} شركة</span><span class="leg"><i class="me"></i>مقعدك</span><span class="leg"><i></i>متاح</span></span></div>`;
    },
    css: `i{display:block;border-radius:50%;border:2px solid rgba(255,255,255,.42)}
      i.f{background:#fff;border-color:#fff}
      i.me{background:${CYAN};border-color:${CYAN};box-shadow:0 0 0 ${S.xs / 2}px rgba(27,183,205,.25),0 0 ${S.m}px rgba(27,183,205,.7)}
      .side{display:flex;flex-direction:column;align-items:flex-start;gap:${S.xs}px}
      .side b{font-size:${T[4]}px;font-weight:900;color:${CYAN};line-height:1}
      .side .l1{font-size:${T[1]}px;font-weight:800;white-space:nowrap}
      .legs{display:flex;flex-wrap:wrap;gap:${S.xs}px ${S.s}px;margin-top:${S.xs}px}
      .leg{display:flex;align-items:center;gap:${S.xs}px;font-size:${T[0]}px;font-weight:700;color:rgba(255,255,255,.8);white-space:nowrap}
      .leg i{width:${T[0]}px;height:${T[0]}px;position:static}`
  });
}

// ---------------------------------------------------------------- 5) authority: it audits itself
// A golden rectangle (h × hφ) in the visual zone, subdivided into its squares. Each square checks
// the next one: the self-similar shape is the claim. The test count sits in the largest square.
function authority(G) {
  const { T, S, m, vz } = G;
  const h = vz.bottom - vz.top, w = Math.min(h * PHI, G.W - 2 * m), hh = w / PHI;
  const x0 = G.W - m - w, y0 = vz.top + (h - hh) / 2;
  let [x, y, ww, h2] = [x0, y0, w, hh];
  const sq = [];
  for (let k = 0; k < 6; k++) { // cut order right, bottom, left, top: the spiral turns toward the reading start
    const t = k % 4;
    if (t === 0) { sq.push([x + ww - h2, y, h2]); ww -= h2; }
    else if (t === 1) { sq.push([x, y + h2 - ww, ww]); h2 -= ww; }
    else if (t === 2) { sq.push([x, y, h2]); x += h2; ww -= h2; }
    else { sq.push([x, y, ww]); y += ww; h2 -= ww; }
  }
  const labels = ['', 'الفحوص', 'التقارير', 'الكود', '', ''];
  return shell(G, {
    eyebrowNote: 'الثقة',
    showSpiral: false,
    head: 'المنصة اللي<br><em>بتراجع نفسها.</em>',
    visual: () => sq.map(([sx, sy, s], i) => `<div class="abs vzc sq s${i}" style="left:${r1(sx)}px;top:${r1(sy)}px;width:${r1(s)}px;height:${r1(s)}px"${i === 0 ? ' data-g="hero"' : ''}>${
      i === 0 ? `<b>+${ar(FACTS.testsFloor)}</b><span>اختبار آلي قبل كل تحديث</span><small>من كود المنصة · ${ar(26)} أكتوبر ${ar(2026)}</small>`
      : i < 4 ? `<svg viewBox="0 0 24 24" width="${T[3 - i]}" height="${T[3 - i]}"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="${CYAN}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>${labels[i] ? `<span style="font-size:${T[0]}px">${labels[i]}</span>` : ''}`
      : ''}</div>`).join('') ,
    css: `.sq{border:1.5px solid rgba(27,183,205,.5);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${S.xs / 2}px;text-align:center;background:rgba(27,183,205,.04)}
      .s0{background:rgba(27,183,205,.09);border-color:rgba(27,183,205,.8)}
      .s0 b{font-size:${T[3]}px;font-weight:900;line-height:1}
      .s0 span{font-size:${T[0]}px;font-weight:800;color:${CYAN}}
      .s0 small{font-size:${T[0]}px;font-weight:600;color:rgba(255,255,255,.6)}
      .sq span{font-weight:800;color:rgba(255,255,255,.85)}`
  });
}

// ---------------------------------------------------------------- 6) anchoring
// The visual zone splits at x = W/φ²: the anchor (the cost of a closing surprise) gets the φ part,
// the free check the 1 part, with its price at T4 so the smaller panel wins the eye.
function anchoring(G) {
  const { T, S, m, X1, vz } = G;
  const top = vz.top, hgt = vz.bottom - vz.top;
  return shell(G, {
    eyebrowNote: 'قبل الإقفال',
    showSpiral: false,
    head: 'الإقفال بيكلّف…<br><em>والفحص ببلاش.</em>',
    visual: () => `<div class="abs pa vzc" style="right:${m}px;left:${r1(X1 + S.xs)}px;top:${top}px;height:${r1(hgt)}px">
        <span class="k">تكلفة مفاجأة في الإقفال</span><b><span class="dot" style="width:${S.xs}px;height:${S.xs}px"></span>+${ar(250000)} <small>ج.م</small></b><span class="k2">تسويات · غرامات · وقت مراجعة</span><span class="tag">${DEMO}</span></div>
      <div class="abs pb vzc" data-g="hero" style="left:${m}px;right:${r1(G.W - X1 + S.xs)}px;top:${top}px;height:${r1(hgt)}px">
        <span class="k">الفحص المجاني</span><b>صفر <small>ج.م</small></b><span class="k2">في دقائق</span></div>`,
    css: `.pa,.pb{border-radius:${S.s}px;display:flex;flex-direction:column;justify-content:center;gap:${S.xs}px;padding:0 ${S.m}px}
      .pa{border:1.5px solid rgba(255,255,255,.18);background:rgba(255,255,255,.04)}
      .pa b{font-size:${T[3]}px;font-weight:900;line-height:1.236;color:rgba(255,255,255,.88);white-space:nowrap;display:flex;align-items:center;gap:${S.xs}px}
      .pa b small{font-size:${T[1]}px;font-weight:800}
      .pa .tag{align-self:flex-start}
      .pb{background:${CYAN};color:${NAVY};align-items:center;text-align:center;box-shadow:0 ${S.s}px ${T[2]}px rgba(27,183,205,.3)}
      .pb b{font-size:${T[4]}px;font-weight:900;line-height:1.236;display:flex;flex-direction:column;align-items:center}
      .pb b small{font-size:${T[1]}px;line-height:1}
      .k{font-size:${T[0]}px;font-weight:800;white-space:nowrap}
      .k2{font-size:${T[0]}px;font-weight:700;opacity:.75;white-space:nowrap}`
  });
}

// ---------------------------------------------------------------- 7) every number with its evidence
// The figure sits on the spiral's eye; its evidence chain steps away from it, each link 1/φ of the
// one before (chip widths 412 → 255 → 158 px; connector lengths 60 → 37 → 23).
function evidence(G) {
  const { T, S, m, vz } = G;
  return shell(G, {
    eyebrowNote: 'كل رقم بدليله',
    spiralFx: true,
    head: 'كل رقم في التقرير…<br><em>ومعاه دليله.</em>',
    visual: (sp) => {
      const [ex, ey] = sp.eye;
      const chips = [['القيد', 'JE/2026/10/0412'], ['فاتورة المورّد', 'BILL/2026/0389'], ['المرفق', 'bill-0389.pdf']];
      const gap = (vz.bottom - vz.top - 3 * T[2]) / 4;
      const right = ex - T[4] * 1.4;
      return `<div class="abs fig vzc" data-g="hero" style="${centred(ex, ey)}"><span class="k">مصروف صيانة · أكتوبر</span><b>${ar(48500)}</b><span class="k">ج.م</span></div>
        ${chips.map(([k, v], i) => { const cy = vz.top + gap * (i + 1) + T[2] * i + T[2] / 2;
          return `<div class="abs chip vzc" style="right:${r1(G.W - right)}px;top:${r1(cy - T[2] / 2)}px;height:${T[2]}px"><span class="ok">✓</span><span>${k}</span><span class="lat v">${v}</span></div>
          <svg class="abs" style="left:0;top:0;overflow:visible" width="1" height="1"><path d="M${r1(right + S.xs)} ${r1(cy)} C${r1(right + S.l)} ${r1(cy)} ${r1(ex - T[4] * .9)} ${r1(ey)} ${r1(ex - T[4] * .62)} ${r1(ey)}" fill="none" stroke="${CYAN}" stroke-width="1.5" opacity=".6"/></svg>`; }).join('')}
        <span class="abs tag" style="left:${m}px;top:${r1(vz.bottom - T[1])}px">${DEMO}</span>`;
    },
    css: `.fig{display:flex;flex-direction:column;align-items:center;line-height:1;gap:${S.xs}px}
      .fig b{font-size:${T[4]}px;font-weight:900;line-height:1}
      .fig .k{font-size:${T[0]}px;font-weight:800;color:${CYAN}}
      .chip{display:flex;align-items:center;gap:${S.xs}px;padding:0 ${S.s}px;border-radius:${T[2]}px;background:rgba(255,255,255,.95);color:${NAVY};font-size:${T[0]}px;font-weight:800;white-space:nowrap}
      .chip .ok{color:#fff;background:${CYAN};width:${T[1]}px;height:${T[1]}px;border-radius:50%;display:flex;align-items:center;justify-content:center}
      .chip .v{font-weight:700;color:#3B4262}`
  });
}

// ---------------------------------------------------------------- catalogue
const DESIGNS = [
  { slug: '1-hidden-error', fn: hidden, angle: 'الخطأ المستخبي (Loss aversion)',
    phi: 'دائرة الخطأ تكبر بعامل φ: ٢٣ ← ٩٧ ← ١٥٨ ← ٢٥٥ px (درجات T0 وT3 وT4 وT5)، والمسافة بينها T0. نقطة البداية الحمراء على عين الحلزون (يمين، لأن الزمن يمشي مع القراءة من اليمين)، والدوائر تكبر يسارًا. المبالغ مثال توضيحي.' },
  { slug: '2-five-things', fn: five, angle: '٥ حاجات (Curiosity gap)',
    phi: 'منطقة البصري مقسومة عند x = W/φ²: الكارت (٥ بنود، ٣ ظاهرة و٢ مموّهة) في الجزء φ، والرقم «٢» بحجم T5 على عين الحلزون في الجزء ١.' },
  { slug: '3-shocking-specificity', fn: shock, angle: 'التحديد الصادم',
    phi: 'رقم واحد دقيق بحجم T4 (١٥٨ px)، وخط منتصفه يمر بعين الحلزون. السطر فوقه والسطر تحته على بُعد 0.62·T4 من المنتصف. علامة السالب والنقطة فقط بالأحمر.' },
  { slug: '4-scarcity', fn: scarcity, angle: `الندرة ${LEFT}/${TOTAL}`,
    phi: `الـ${TOTAL} مقعد مرصوصة بالزاوية الذهبية (360°/φ² = 137.508°، نموذج عباد الشمس لـVogel) وقطبها على عين الحلزون: المقعد k على نصف قطر c·√k. المقاعد الممتلئة (${FILLED}) بيضاء، ومقعدك سماوي. الأرقام من site.config.js → founding (العرض المعلن، حتى ${FM.asOf})، لا بيانات دفاتر.` },
  { slug: '5-authority', fn: authority, angle: 'السلطة «يراجع نفسه»',
    phi: 'مستطيل ذهبي (h × hφ) مقسوم لمربعاته، وكل مربع يتحقق من اللي بعده: الشكل المتشابه ذاتيًا هو الفكرة نفسها. عدد الاختبارات في أكبر مربع، وأيقونات ✓ تصغر T3 ← T2 ← T1 ثم ينكمش الحلزون. الرقم من platform-facts.js (كود المنصة، ' + FACTS.measuredOn + ').' },
  { slug: '6-anchoring', fn: anchoring, angle: 'التثبيت (Anchoring)',
    phi: 'اللوحتان مقسومتان عند x = W/φ²: المرساة (تكلفة مفاجأة الإقفال، مثال توضيحي) تاخد الجزء φ بحجم T3، والفحص المجاني يأخذ الجزء ١ لكن سعره «٠» بحجم T4 وخلفية سماوية، فالجزء الأصغر يكسب العين.' },
  { slug: '7-every-number-evidence', fn: evidence, angle: 'كل رقم بدليله',
    phi: 'الرقم على عين الحلزون بحجم T4، وسلسلة الدليل (القيد ← فاتورة المورّد ← المرفق) يسار منه بمسافات متساوية في منطقة البصري، والوصلات تتجه كلها للعين. الأكواد والمبلغ مثال توضيحي.' }
];

// ---------------------------------------------------------------- measure
const MEASURE = `(() => {
  const r = (el) => { const b = el.getBoundingClientRect(); return { x: b.left, y: b.top, w: b.width, h: b.height, cx: b.left + b.width / 2, cy: b.top + b.height / 2, bottom: b.bottom, right: b.right }; };
  const out = {}; for (const el of document.querySelectorAll('[data-g]')) out[el.dataset.g] = r(el);
  const sizes = new Set(), overflow = [];
  for (const el of document.querySelectorAll('body *')) {
    if (el.closest('svg')) continue;
    const txt = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (txt) sizes.add(Math.round(parseFloat(getComputedStyle(el).fontSize)));
    if (el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflow !== 'visible') overflow.push(el.className || el.tagName);
    const b = el.getBoundingClientRect();
    if (txt && (b.left < -1 || b.right > innerWidth + 1 || b.bottom > innerHeight + 1)) overflow.push('offcanvas:' + (el.className || el.tagName));
  }
  // text that leaves its own box
  for (const el of document.querySelectorAll('h1,.sub,.cta,.eyebrow,.chip,.r,.k,.k2,.l1,.tag,.lbl,.num,.flag,.acct-h')) {
    const range = document.createRange(); range.selectNodeContents(el); const t = range.getBoundingClientRect(), b = el.getBoundingClientRect();
    if (t.width > b.width + 2) overflow.push('text>' + (el.className || el.tagName));
  }
  const eb = document.querySelector('.eyebrow').getBoundingClientRect(), hl = document.querySelector('h1');
  const hr = document.createRange(); hr.selectNodeContents(hl); if (hr.getBoundingClientRect().top < eb.bottom + 14) overflow.push('headline hits eyebrow');
  const vt = +document.body.dataset.vzTop, vb = +document.body.dataset.vzBottom;
  for (const el of document.querySelectorAll('.vzc')) { const b = el.getBoundingClientRect(); if (b.top < vt - 1 || b.bottom > vb + 1) overflow.push('outside visual zone: ' + el.className); }
  return { els: out, sizes: [...sizes].sort((a, b) => a - b), overflow };
})()`;

// ---------------------------------------------------------------- render
async function main() {
  const only = process.argv[2] || '';
  fs.mkdirSync(HOST, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', args: ['--disable-gpu'] });
  const enc = await browser.newPage();
  const written = [], metrics = {}, problems = [];
  const toFiles = async (png, file) => {
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
    await p.waitForTimeout(150);
    const meas = await p.evaluate(MEASURE);
    const png = (await p.screenshot({ type: 'png' })).toString('base64');
    await p.evaluate(() => document.body.classList.add('show-guides'));
    const gpng = (await p.screenshot({ type: 'png' })).toString('base64');
    await p.close();

    const dir = path.join(OUT, d.slug);
    fs.mkdirSync(dir, { recursive: true });
    const f = await toFiles(png, base), g = await toFiles(gpng, base);
    fs.writeFileSync(path.join(dir, `${base}.webp`), f.webp);
    fs.writeFileSync(path.join(dir, `${base}.jpg`), f.jpg);
    fs.writeFileSync(path.join(dir, `${base}_guides.webp`), g.webp);
    fs.copyFileSync(path.join(dir, `${base}.jpg`), path.join(HOST, `${base}.jpg`));

    // Deviations from the golden targets, in px.
    const sp = G.spiral(['1-hidden-error', '7-every-number-evidence'].includes(d.slug));
    const e = meas.els, dev = {};
    if (e.headline) dev.headline_bottom_vs_H_over_phi2 = r1(e.headline.bottom - G.Y1);
    if (e.cta) dev.cta_left_vs_W_over_phi = r1(e.cta.x - G.X2);
    if (e.hero && !['5-authority', '6-anchoring'].includes(d.slug)) {
      dev.hero_centre_vs_spiral_eye = d.slug === '3-shocking-specificity' ? r1(Math.abs(e.hero.cy - sp.eye[1]))
        : d.slug === '4-scarcity' ? r1(Math.hypot(e.hero.cx - sp.eye[0], e.hero.cy - sp.eye[1]))
        : r1(Math.hypot(e.hero.cx - sp.eye[0], e.hero.cy - sp.eye[1]));
    }
    if (d.slug === '6-anchoring' && e.hero) dev.panel_split_vs_W_over_phi2 = r1(e.hero.right + G.S.xs - G.X1);
    dev.margin_right = r1(w - e.eyebrow.right); dev.margin_bottom = r1(h - e.cta.bottom);
    const offScale = meas.sizes.filter((s) => !G.T.includes(s));
    if (offScale.length) problems.push(`${base}: font sizes off the φ scale: ${offScale.join(', ')}`);
    if (meas.overflow.length) problems.push(`${base}: overflow: ${[...new Set(meas.overflow)].join(', ')}`);
    metrics[base] = { format: fmt, size: [w, h], scale: G.T, spacing: G.S, golden_lines: { X1: r1(G.X1), X2: r1(G.X2), Y1: r1(G.Y1), Y2: r1(G.Y2) },
      spiral_eye: sp.eye.map(r1), font_sizes_used: meas.sizes, deviation_px: dev };
    written.push({ d, base, w, h, fmt });
    console.log('wrote', `${d.slug}/${base}`, JSON.stringify(dev));
  }
  await browser.close();
  if (problems.length) { console.error('\nPROBLEMS:\n' + problems.join('\n')); process.exitCode = 1; }
  if (only) return;

  fs.writeFileSync(path.join(OUT, 'metrics.json'), JSON.stringify(metrics, null, 2) + '\n');
  const G1 = geometry(1080, 1080), G4 = geometry(1080, 1350);
  const url = (b) => `https://www.seg-audit.com/assets/social/golden/${b}.jpg`;

  // ---- gallery
  const html = `<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SEG golden-ratio pack</title>
<style>body{margin:0;padding:32px 16px;background:#F5F7FA;color:#0D1B3E;font:15px/1.618 system-ui,sans-serif}h1{font-size:24px;margin:0 0 4px}h2{font-size:18px;margin:40px 0 4px}.p{margin:0 0 12px;color:#3B4262;max-width:80ch}
.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:20px;align-items:start}figure{margin:0;background:#fff;border:1px solid #E6E9F0;border-radius:6px;padding:10px}img{display:block;width:100%;height:auto}
figcaption{font-size:12px;margin-top:8px;word-break:break-all;direction:ltr;text-align:left}figcaption a{color:#0F7C91}.k{display:inline-block;font-size:12px;font-weight:700;color:#0F7C91}code{direction:ltr;unicode-bidi:isolate}</style>
<h1>Standard Enterprise Governance (SEG): حزمة النسبة الذهبية φ</h1>
<p class="p">٧ زوايا إقناع × مقاسي Meta feed (1:1 و4:5)، مولَّدة بالكود عبر <code>scripts/golden-ads.js</code>. بجانب كل إعلان نسخة «guides» توضّح خطوط القسمة الذهبية (أصفر)، ومربعات الحلزون وعينه (أخضر وبنفسجي)، والهامش. كل الأرقام داتا اختبارية معلَّمة «مثال توضيحي»، ما عدا أرقام برنامج الأعضاء المؤسِّسين وعدد الاختبارات. القياسات الفعلية في <code>metrics.json</code>.</p>
${DESIGNS.map((d) => `<h2>${d.slug} <span class="k">${d.angle}</span></h2><p class="p">${d.phi}</p><div class="g">${written.filter((x) => x.d === d).map((x) => `<figure><img loading="lazy" src="${d.slug}/${x.base}.webp" alt="${x.base}"><figcaption>${x.fmt} · ${x.w}×${x.h} · <a href="${url(x.base)}">JPG</a></figcaption></figure><figure><img loading="lazy" src="${d.slug}/${x.base}_guides.webp" alt="${x.base} guides"><figcaption>${x.fmt} · guides</figcaption></figure>`).join('')}</div>`).join('\n')}`;
  fs.writeFileSync(path.join(OUT, 'index.html'), html);

  // ---- README (written from the same numbers the renderer used)
  const md = [];
  md.push('# Standard Enterprise Governance (SEG): حزمة النسبة الذهبية φ', '');
  md.push('بريف الـCEO (5 نوفمبر 2026). يولّدها [`scripts/golden-ads.js`](../../../scripts/golden-ads.js)، والمعرض في [`index.html`](index.html) (كل إعلان بجانبه نسخة guides). القياسات الفعلية لكل ملف في [`metrics.json`](metrics.json). هذا الملف يُكتب من السكربت نفسه.', '');
  md.push('**المقاسات:** Meta feed مربع 1:1 (1080×1080) و4:5 (1080×1350)، JPG (للرفع) وWebP (للمعرض). ملفات الـJPG منشورة على `https://www.seg-audit.com/assets/social/golden/<file>.jpg`.', '');
  md.push('**البراند:** navy `#0D1B3E` وcyan `#1BB7CD` وأبيض، وأحمر إنذار خافت `#C0392B` لعلامات الخطر الصغيرة فقط. بلا ذهبي. عربي RTL. الاسم البارز «Standard Enterprise Governance (SEG)» في أعلى كل إعلان، والطُعم «فحص مجاني لميزان شركتك… في دقائق»، وCTA صغير «ابدأ الفحص المجاني · seg-audit.com»، وعلامة MFT.', '');
  md.push('**قاعدة البيانات:** كل رقم دفاتر داتا اختبارية معلَّمة «مثال توضيحي · داتا اختبارية». الاستثناءان: أرقام برنامج الأعضاء المؤسِّسين (من `site.config.js → founding`)، وعدد الاختبارات (من `platform-facts.js`). أعد التوليد بعد أي تغيير فيهما.', '');
  md.push('## إزاي اتطبّقت φ = 1.618 (على كل التصميمات)', '');
  md.push('| العنصر | القاعدة | القيمة على 1080 px |', '|---|---|---|');
  md.push(`| سُلّم الخط | T[k] = (W/φ⁸)·φᵏ، وكل نص في الإعلان درجة من السُلّم (السكربت يفشل لو لقى حجم برّه السُلّم) | ${G1.T.join(' · ')} px |`);
  md.push(`| التباعد | نفس السُلّم: T0/φ، T0، T1، T2 | ${[G1.S.xs, G1.S.s, G1.S.m, G1.S.l].join(' · ')} px |`);
  md.push(`| الهامش | m = T2 = W/φ⁶ | ${G1.m} px |`);
  md.push('| المسافة بين السطور | العناوين 2/φ = 1.236، النص φ = 1.618 | |');
  md.push(`| خطوط القسمة الذهبية | x = W/φ² و W/φ، y = H/φ² و H/φ (نقاط القوة الأربع عند تقاطعها) | x: ${r1(G1.X1)} · ${r1(G1.X2)}؛ y (1:1): ${r1(G1.Y1)} · ${r1(G1.Y2)}؛ y (4:5): ${r1(G4.Y1)} · ${r1(G4.Y2)} |`);
  md.push('| العنوان | آخر سطر فيه على الخط y = H/φ² | |');
  md.push(`| الـCTA | طرفه الأيسر على الخط x = W/φ، وعرضه W − m − W/φ، وارتفاعه T2، ونصه T0 | عرض ${r1(1080 - G1.m - G1.X2)} px |`);
  md.push(`| الحلزون الذهبي | مستطيل ذهبي W × W/φ على الحافة السفلية، مقسوم ١٤ مرة لمربعات (كل مربع 1/φ من اللي قبله)؛ العين = نهاية التقسيم. يظهر خافتًا (16%) في الخلفية، والعنصر البطل متمركز على العين | العين (1:1): (${G1.spiral(false).eye.map(r1).join('، ')}) أو (${G1.spiral(true).eye.map(r1).join('، ')}) · (4:5): (${G4.spiral(false).eye.map(r1).join('، ')}) أو (${G4.spiral(true).eye.map(r1).join('، ')}) |`);
  md.push('| الإضاءة | مركز التدرّج الشعاعي على عين الحلزون، ونصف قطر الانتقال W/φ | |', '');
  md.push('## كل تصميم', '');
  md.push('| التصميم | الزاوية | تطبيق φ |', '|---|---|---|');
  DESIGNS.forEach((d) => md.push(`| \`${d.slug}/\` | ${d.angle} | ${d.phi} |`));
  md.push('', '## القياس بعد الرندر (انحراف بالـpx عن الهدف الذهبي)', '');
  md.push('مقاسة من صندوق العنصر الفعلي في المتصفح بعد تحميل الخطوط. الصفر يعني إن العنصر بالظبط على الخط أو العين.', '');
  md.push('| الملف | آخر سطر العنوان − H/φ² | طرف الـCTA − W/φ | البطل − عين الحلزون | قسمة اللوحتين − W/φ² | أحجام الخط المستخدمة |', '|---|---|---|---|---|---|');
  for (const [b, mt] of Object.entries(metrics)) { const v = mt.deviation_px;
    md.push(`| \`${b}.jpg\` | ${v.headline_bottom_vs_H_over_phi2 ?? '—'} | ${v.cta_left_vs_W_over_phi ?? '—'} | ${v.hero_centre_vs_spiral_eye ?? '—'} | ${v.panel_split_vs_W_over_phi2 ?? '—'} | ${mt.font_sizes_used.join(' · ')} |`); }
  md.push('', '«البطل − عين الحلزون»: في 3 هو المسافة الرأسية بين خط منتصف الرقم والعين؛ وفي 4 هو مركز أول مقعد (المقعد صفر، على نصف قطر c·√0.5). تصميما 5 و6 لا يستخدمان عين الحلزون الكبير: 5 يبني مستطيله الذهبي الخاص، و6 مقسوم عند W/φ².', '');
  md.push('## الحلزون: الاشتقاق', '');
  md.push('المستطيل [x, y, w, h] بنسبة φ. في كل خطوة نقطع مربعًا بضلع الجانب الأقصر بالترتيب يمين، فوق، شمال، تحت، والباقي مستطيل ذهبي أصغر. في كل مربع ربع دائرة مركزها ركن المربع اللي على خط القطع، والزاوية تقل ٩٠° في كل خطوة، فالأقواس متصلة. العين هي مركز المستطيل الباقي بعد ١٤ خطوة (الخطأ أقل من 0.1 px)، وتطلع عند (0.2764·W، 0.7236·W/φ) قبل القلب. السكربت يقلب المستطيل رأسيًا (والعين تطلع في النص العلوي) وأفقيًا حسب التصميم.', '');
  md.push('## الروابط العامة (JPG)', '');
  written.forEach((x) => md.push(`- \`${x.base}.jpg\`: ${url(x.base)}`));
  md.push('', '## إعادة التوليد', '', '```bash', 'PLAYWRIGHT_PATH=<path to playwright> node scripts/golden-ads.js [filter]', '```', '');
  fs.writeFileSync(path.join(OUT, 'README.md'), md.join('\n'));
  console.log(`${written.length} files`);
}

if (require.main === module) main();
module.exports = { DESIGNS, geometry };
