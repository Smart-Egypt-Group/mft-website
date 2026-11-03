#!/usr/bin/env node
// Renders the SEG Audit launch artwork ("Founding Members", November 2026) into marketing/designs/
// as WebP + JPG, plus the founding page og:image into src/assets/img/launch/.
//
// Same system as scripts/article-images.js (CEO, 2026-10-14): navy #0D1B3E, cyan #1BB7CD,
// brilliant pure white, no gold, golden-ratio frame, small MFT mark.
//   · the canvas splits at the golden ratio into a navy field and a flat pure-white "page":
//     vertically (navy at the start) on landscape formats, horizontally (navy on top) on square and
//     portrait formats, so the copy always sits on navy and the page always carries the motif
//   · a seam of light runs along the split; raw transactions drift across the navy field into a
//     white light on the seam, on the golden line
//   · the campaign motif is the 50-seat grid: open seats as navy rings (filled seats in navy only when
//     the real counter is on), and the
//     NEXT seat in glowing cyan, reached by the cyan exception line straight out of the seam light
//     (it is the seat the viewer can take). The "now live" set uses a ledger with one cyan line.
//   · copy has three levels only (eyebrow, hero, support) plus one CTA pill to app.seg-audit.com
//
// Variants: seats-ar / seats-en ("only 50 seats, founder price for life"; "X of 50 left" only with the real counter), live-ar / live-en ("now live"), neutral-seats /
// neutral-live (no words,
// one file for both languages). Seat counts come from src/site.config.js → founding, so a rerun after
// the counter (showCount) is off, so the seat designs carry «برنامج الأعضاء المؤسِّسون — 50 مقعد
// فقط بسعر مؤسِّس مدى الحياة» and no count.
//
// Needs Playwright + Google Chrome:  PLAYWRIGHT_PATH=<path to playwright> node scripts/launch-images.js [name-filter]
const fs = require('fs');
const path = require('path');

let chromium;
try { ({ chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright')); }
catch { console.error('playwright not found. npm i -D playwright, or set PLAYWRIGHT_PATH.'); process.exit(1); }

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'marketing/designs');
const SITE_OUT = path.join(ROOT, 'src/assets/img/launch');
const b64 = (f) => fs.readFileSync(path.join(ROOT, f)).toString('base64');
const MARK_NAVY = 'data:image/png;base64,' + b64('src/assets/logo/mft-mark-navy.png');
const MARK_WHITE = 'data:image/png;base64,' + b64('src/assets/logo/mft-mark-white.png');
const INTER = b64('src/assets/fonts/inter-latin-var.woff2');
const CAIRO = b64('src/assets/fonts/cairo-arabic-var.woff2');
const { founding: FM } = require('../src/site.config.js');
// No public counter unless site.config → founding.showCount (then FILLED seats are drawn and counted).
const FILLED = FM.showCount ? FM.filled : 0, LEFT = FM.total - FILLED;
// The approved line «برنامج الأعضاء المؤسِّسون — 50 مقعد فقط بسعر مؤسِّس مدى الحياة» is set as eyebrow + title.

const NAVY = '#0D1B3E', CYAN = '#1BB7CD', W = '#FFFFFF';
const PHI = (1 + Math.sqrt(5)) / 2;
function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
const f = (n) => +n.toFixed(1);

// ---- Copy (three levels + CTA). The AR seats headline is the approved campaign line, verbatim. ----
const COPY = {
  'seats-ar': FM.showCount
    ? { dir: 'rtl', eyebrow: 'SEG Audit · الأعضاء المؤسِّسون', hero: [String(LEFT), `/${FM.total}`], title: `باقي ${LEFT} من ${FM.total} — الأعضاء المؤسِّسون`, support: `انضمت ${FILLED} شركة بالفعل. احجز مقعدك قبل اكتمال العدد.`, cta: 'احجز مقعدك  ·  app.seg-audit.com', motif: 'seats' }
    : { dir: 'rtl', eyebrow: 'SEG Audit · برنامج الأعضاء المؤسِّسون', hero: [String(FM.total), ''], title: `${FM.total} مقعد فقط بسعر مؤسِّس مدى الحياة`, support: 'ابدأ بفحص مجاني لميزان شركتك يكشف نقاط الخطر في دقائق.', cta: 'احجز مقعدك  ·  app.seg-audit.com', motif: 'seats' },
  'seats-en': FM.showCount
    ? { dir: 'ltr', eyebrow: 'SEG AUDIT · FOUNDING MEMBERS', hero: [String(LEFT), `/${FM.total}`], title: `${LEFT} of ${FM.total} seats left — Founding Members`, support: `${FILLED} companies have already joined. Claim yours before the count closes.`, cta: 'Claim your seat  ·  app.seg-audit.com', motif: 'seats' }
    : { dir: 'ltr', eyebrow: 'SEG AUDIT · FOUNDING MEMBERS PROGRAMME', hero: [String(FM.total), ''], title: `Only ${FM.total} seats, founder price for life`, support: 'Start with a free check of your company’s trial balance that flags its risk points in minutes.', cta: 'Claim your seat  ·  app.seg-audit.com', motif: 'seats' },
  'live-ar': { dir: 'rtl', eyebrow: 'SEG Audit من MFT', heroText: 'متاح الآن', title: 'منصة المراجعة المستمرة لدفاترك', support: 'فحص مجاني لميزان شركتك يكشف نقاط الخطر في دقائق.', cta: 'افحص ميزانك مجانًا  ·  app.seg-audit.com', motif: 'live' },
  'live-en': { dir: 'ltr', eyebrow: 'SEG AUDIT BY MFT', heroText: 'Now live', title: 'Continuous audit for your books', support: 'A free check of your company’s trial balance that flags its risk points in minutes.', cta: 'Check your trial balance free  ·  app.seg-audit.com', motif: 'live' },
  'neutral-seats': { motif: 'seats' },
  'neutral-live': { motif: 'live' }
};

// ---- Formats. kind: land (vertical split), stack (horizontal split), strip (covers/banners). ----
// safe: the area the platform never crops or covers (UI overlays, avatars, TV/mobile crops).
const FORMATS = [
  { dir: 'social', name: 'linkedin-facebook-link', w: 1200, h: 630, kind: 'land', variants: ['seats-ar', 'seats-en', 'live-ar', 'live-en', 'neutral-seats', 'neutral-live'] },
  { dir: 'social', name: 'x-post', w: 1600, h: 900, kind: 'land', variants: ['seats-ar', 'seats-en', 'live-ar', 'live-en', 'neutral-seats', 'neutral-live'] },
  { dir: 'social', name: 'instagram-square', w: 1080, h: 1080, kind: 'stack', variants: ['seats-ar', 'seats-en', 'live-ar', 'live-en', 'neutral-seats', 'neutral-live'] },
  // Story layout keeps TikTok's safe zone too (top 160, bottom 480, end 140), so it doubles as
  // Instagram/Facebook Stories, Reels cover, and Meta Stories/Reels ads.
  { dir: 'social', name: 'story', w: 1080, h: 1920, kind: 'stack', safe: { t: 250, b: 480, s: 96, e: 150 }, variants: ['seats-ar', 'seats-en', 'live-ar', 'live-en', 'neutral-seats', 'neutral-live'] },
  { dir: 'social', name: 'youtube-thumbnail', w: 1280, h: 720, kind: 'land', variants: ['seats-ar', 'seats-en', 'live-ar', 'live-en'] },
  { dir: 'ads', name: 'meta-feed-4x5', w: 1080, h: 1350, kind: 'stack', variants: ['seats-ar', 'seats-en', 'live-ar', 'live-en'] },
  { dir: 'ads', name: 'meta-feed-1x1', w: 1080, h: 1080, kind: 'stack', variants: ['seats-ar', 'seats-en', 'live-ar', 'live-en'] },
  { dir: 'ads', name: 'tiktok-9x16', w: 1080, h: 1920, kind: 'stack', safe: { t: 250, b: 520, s: 96, e: 170 }, variants: ['seats-ar', 'seats-en', 'live-ar', 'live-en'] },
  // Profile covers: long-lived, so they carry the "now live" message, never a seat count.
  // YouTube: 2560×1440 canvas, everything that matters inside the 1546×423 all-devices safe area.
  { dir: 'covers', name: 'youtube-banner', w: 2560, h: 1440, kind: 'strip', safe: { x: 507, y: 508, w: 1546, h: 423 }, variants: ['live-ar', 'live-en', 'neutral-live'] },
  // LinkedIn/X/Facebook: the profile picture overlaps the bottom-start corner; copy stays clear of it.
  { dir: 'covers', name: 'linkedin-cover', w: 1128, h: 191, kind: 'strip', safe: { x: 220, y: 20, w: 868, h: 151 }, variants: ['live-ar', 'live-en', 'neutral-live'] },
  { dir: 'covers', name: 'x-header', w: 1500, h: 500, kind: 'strip', safe: { x: 260, y: 60, w: 1180, h: 330 }, variants: ['live-ar', 'live-en', 'neutral-live'] },
  { dir: 'covers', name: 'facebook-cover', w: 1640, h: 624, kind: 'strip', safe: { x: 280, y: 90, w: 1080, h: 420 }, variants: ['live-ar', 'live-en', 'neutral-live'] }
];

// ---- Geometry ----
// Returns the navy field, the page, the seam light, the text box and where the page motif goes.
function frame(F) {
  const { w, h, kind } = F;
  const u = kind === 'strip' ? (F.safe ? F.safe.h : h) / 420 : Math.min(w, h) / 1080;
  if (kind === 'land') {
    const sx = Math.round(w / PHI), M = Math.round(h * 0.089);
    return { u: Math.min(w / 1200, h / 630), axis: 'x', seam: sx, light: { x: sx, y: Math.round(h / PHI) },
      text: { x: M, y: M, w: sx - M - Math.round(118 * Math.min(w / 1200, h / 630)), h: h - 2 * M }, // clear of the seam light
      page: { x: sx + M * 0.8, y: M, w: w - sx - M * 1.6, h: h - 2.6 * M },
      mark: { x: sx + M * 0.8, y: h - M * 0.75, onNavy: false } };
  }
  if (kind === 'stack') {
    const s = F.safe || { t: 0, b: 0, s: 0, e: 0 }, M = Math.round(w * 0.082);
    const top = Math.max(M, s.t), side = Math.max(M, s.s);
    // With a platform safe zone the golden split is taken inside it, so copy and seats both stay
    // clear of the UI overlays; otherwise the whole canvas splits at the golden ratio.
    const sy = F.safe ? Math.round(top + (h - s.b - top) / PHI) : Math.round(h / PHI);
    return { u, axis: 'y', seam: sy, light: { x: Math.round(w / PHI), y: sy },
      text: { x: side, y: top, w: w - side - Math.max(M, s.e), h: sy - top - M * 0.7 },
      page: { x: side, y: sy + M * 0.6, w: w - side - Math.max(M, s.e), h: Math.min(h - s.b, h - M) - sy - M * (s.b ? 1.7 : 1.3) }, // leaves a band for the mark
      mark: { x: side, y: Math.min(h - s.b, h - M * 0.5) - (s.b ? 0 : M * 0.15), onNavy: false } };
  }
  // strip: navy field across, the page as the golden end column of the safe area
  const S = F.safe;
  const sx = Math.round(S.x + S.w / PHI), pad = Math.round(S.h * 0.14);
  return { u, axis: 'x', seam: sx, light: { x: sx, y: Math.round(S.y + S.h / PHI) },
    text: { x: S.x + pad, y: S.y + pad * 0.6, w: sx - S.x - 2 * pad, h: S.h - pad * 1.2 },
    page: { x: sx + pad, y: S.y + pad * 0.5, w: S.x + S.w - sx - 2 * pad, h: S.h - pad * 1.6 },
    mark: { x: sx + pad, y: S.y + S.h - pad * 0.35, onNavy: false } };
}

// Seat grid: columns × rows to fit the page box; returns seat centres and radius.
function seatLayout(box, landscape) {
  const cols = landscape ? 5 : 10, rows = FM.total / cols;
  const cell = Math.min(box.w / cols, box.h / rows);
  const r = cell * 0.34;
  const gx = box.x + (box.w - cell * cols) / 2, gy = box.y + (box.h - cell * rows) / 2;
  const seats = [];
  for (let i = 0; i < FM.total; i++) seats.push({ x: gx + cell * (i % cols + 0.5), y: gy + cell * (Math.floor(i / cols) + 0.5) });
  return { seats, r, cell };
}

function scene(F, variant) {
  const { w, h } = F, G = frame(F), C = COPY[variant], u = G.u;
  const neutral = !C.dir;
  const r = rng(w * 7 + h * 13 + variant.length);
  const R = `filterUnits="userSpaceOnUse" x="${-w}" y="${-h}" width="${w * 3}" height="${h * 3}"`;
  const navyRect = G.axis === 'x' ? { x: 0, y: 0, w: G.seam, h } : { x: 0, y: 0, w, h: G.seam };
  const pageRect = G.axis === 'x' ? { x: G.seam, y: 0, w: w - G.seam, h } : { x: 0, y: G.seam, w, h: h - G.seam };
  // Without copy, the light moves into the field (the article composition); with copy it sits on the seam.
  const L = neutral
    ? (G.axis === 'x' ? { x: Math.round(G.seam / PHI), y: G.light.y } : { x: Math.round(w / 2), y: Math.round(G.seam / PHI) })
    : G.light;
  const orbR = (neutral ? 55 : 30) * u;
  let defs = `
<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="4" stitchTiles="stitch"/><feColorMatrix type="matrix" values=".33 .33 .33 0 0  .33 .33 .33 0 0  .33 .33 .33 0 0  0 0 0 0 1"/></filter>
<filter id="glow" ${R}><feGaussianBlur stdDeviation="${5 * u}" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="glowW" ${R}><feGaussianBlur stdDeviation="${6 * u}" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="bloom" ${R}><feGaussianBlur in="SourceGraphic" stdDeviation="${4 * u}" result="b1"/><feGaussianBlur in="SourceGraphic" stdDeviation="${14 * u}" result="b2"/><feGaussianBlur in="SourceGraphic" stdDeviation="${34 * u}" result="b3"/><feMerge><feMergeNode in="b3"/><feMergeNode in="b3"/><feMergeNode in="b2"/><feMergeNode in="b2"/><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="b10" ${R}><feGaussianBlur stdDeviation="${10 * u}"/></filter>
<filter id="b40" ${R}><feGaussianBlur stdDeviation="${40 * u}"/></filter>
<filter id="b100" ${R}><feGaussianBlur stdDeviation="${100 * u}"/></filter>
<radialGradient id="bg" gradientUnits="userSpaceOnUse" cx="${L.x}" cy="${L.y}" r="${Math.max(w, h) * 0.75}"><stop offset="0" stop-color="#16326E"/><stop offset=".5" stop-color="${NAVY}"/><stop offset="1" stop-color="#060E26"/></radialGradient>
<radialGradient id="vig" gradientUnits="userSpaceOnUse" cx="${L.x}" cy="${L.y}" r="${Math.max(w, h) * 0.75}"><stop offset=".55" stop-color="#050B20" stop-opacity="0"/><stop offset="1" stop-color="#050B20" stop-opacity=".6"/></radialGradient>
<linearGradient id="seamG" x1="${G.axis === 'x' ? 0 : 0}" y1="0" x2="${G.axis === 'x' ? 0 : 1}" y2="${G.axis === 'x' ? 1 : 0}"><stop offset="0" stop-color="${CYAN}" stop-opacity="0"/><stop offset=".5" stop-color="${CYAN}"/><stop offset="1" stop-color="${CYAN}" stop-opacity="0"/></linearGradient>
<radialGradient id="landing" gradientUnits="userSpaceOnUse" cx="${G.light.x}" cy="${G.light.y}" r="${180 * u}"><stop offset="0" stop-color="${CYAN}" stop-opacity=".30"/><stop offset=".45" stop-color="${CYAN}" stop-opacity=".10"/><stop offset="1" stop-color="${CYAN}" stop-opacity="0"/></radialGradient>
<clipPath id="navyClip"><rect x="${navyRect.x}" y="${navyRect.y}" width="${navyRect.w}" height="${navyRect.h}"/></clipPath>
<clipPath id="pageClip"><rect x="${pageRect.x}" y="${pageRect.y}" width="${pageRect.w}" height="${pageRect.h}"/></clipPath>`;

  let s = `<rect width="${w}" height="${h}" fill="url(#bg)"/>`;
  s += `<circle cx="${L.x}" cy="${L.y}" r="${340 * u}" fill="${CYAN}" opacity="${neutral ? .26 : .2}" filter="url(#b100)"/><circle cx="${L.x}" cy="${L.y}" r="${200 * u}" fill="${W}" opacity="${neutral ? .3 : .16}" filter="url(#b100)"/>`;

  // Raw transactions drifting into the light. With copy on the field they stay faint and keep out of
  // the text block's core so the type reads clean.
  let inb = '', pts = '';
  const n = Math.round((neutral ? 300 : 170) * Math.sqrt((navyRect.w * navyRect.h) / (1600 * 900 * 0.62)));
  const T = G.text;
  for (let i = 0; i < n; i++) {
    let x, y;
    if (G.axis === 'x') { x = navyRect.w * 0.04 + Math.pow(r(), 0.85) * (L.x - navyRect.w * 0.04 - 120 * u); y = h * 0.05 + r() * h * 0.9; }
    else { x = w * 0.04 + r() * w * 0.92; y = navyRect.h * 0.04 + Math.pow(r(), 0.85) * (L.y - navyRect.h * 0.04 - 90 * u); }
    const inText = !neutral && x > T.x - 20 && x < T.x + T.w + 20 && y > T.y && y < T.y + T.h;
    const dim = inText ? 0.22 : 1;
    const end = G.axis === 'x' ? { x: L.x - orbR - 10 * u, y: L.y + (r() - 0.5) * 60 * u } : { x: L.x + (r() - 0.5) * 60 * u, y: L.y - orbR - 10 * u };
    const d = G.axis === 'x'
      ? `M${f(x)} ${f(y)} C ${f(x + (120 + r() * 120) * u)} ${f(y)}, ${f(end.x - (150 + r() * 70) * u)} ${f(end.y)}, ${f(end.x)} ${f(end.y)}`
      : `M${f(x)} ${f(y)} C ${f(x)} ${f(y + (120 + r() * 120) * u)}, ${f(end.x)} ${f(end.y - (150 + r() * 70) * u)}, ${f(end.x)} ${f(end.y)}`;
    inb += `<path d="${d}" stroke="${W}" stroke-width="${f((0.6 + r() * 0.9) * u)}" fill="none" opacity="${((0.08 + r() * 0.22) * dim).toFixed(3)}"/>`;
    const rad = (1.4 + r() * 3.2) * u, cy = r() < .07;
    pts += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rad)}" fill="${cy ? CYAN : W}" opacity="${((0.45 + r() * 0.45) * dim).toFixed(2)}"${(cy || rad > 3.6 * u) && !inText ? ' filter="url(#glowW)"' : ''}/>`;
  }
  s += `<g clip-path="url(#navyClip)">${inb}${pts}</g>`;
  s += `<rect width="${w}" height="${h}" fill="url(#vig)"/><rect x="${navyRect.x}" y="${navyRect.y}" width="${navyRect.w}" height="${navyRect.h}" filter="url(#grain)" opacity=".05" style="mix-blend-mode:overlay"/>`;

  // the pure-white page
  s += `<rect x="${pageRect.x}" y="${pageRect.y}" width="${pageRect.w}" height="${pageRect.h}" fill="${W}"/>`;

  // ---- page motif ----
  let page = '', target;
  const P = G.page;
  if (C.motif === 'seats') {
    const landscape = G.axis === 'x';
    const S = seatLayout(P, landscape);
    const next = FILLED; // the visitor's seat: the first open one
    target = S.seats[next];
    S.seats.forEach((p, i) => {
      if (i === next) return;
      if (i < FILLED) page += `<circle cx="${f(p.x)}" cy="${f(p.y)}" r="${f(S.r)}" fill="${NAVY}"/>`;
      else page += `<circle cx="${f(p.x)}" cy="${f(p.y)}" r="${f(S.r - 1.25 * u)}" fill="none" stroke="${NAVY}" stroke-opacity=".55" stroke-width="${f(2.5 * u)}"/>`;
    });
    if (next != null) {
      const p = S.seats[next];
      page += `<g filter="url(#glow)"><circle cx="${f(p.x)}" cy="${f(p.y)}" r="${f(S.r)}" fill="${CYAN}"/></g>`;
      page += `<circle cx="${f(p.x)}" cy="${f(p.y)}" r="${f(S.r + 9 * u)}" fill="none" stroke="${CYAN}" stroke-width="${f(2 * u)}"/>`;
      page += `<circle cx="${f(p.x)}" cy="${f(p.y)}" r="${f(S.r + 22 * u)}" fill="none" stroke="${CYAN}" stroke-opacity=".35" stroke-width="${f(1.5 * u)}"/>`;
    }
  } else {
    // ledger: rows of navy bars, one cyan posted line ending on a cyan check
    const rows = G.axis === 'x' || F.kind === 'strip' ? 9 : 6;
    const gap = Math.min(P.h / rows, 44 * u), y0 = P.y + (P.h - gap * (rows - 1)) / 2;
    const hot = Math.floor(rows / 2);
    const lens = [.62, .38, .8, .5, .7, .44, .9, .56, .66];
    for (let i = 0; i < rows; i++) {
      const y = y0 + i * gap, bw = P.w * 0.58 * lens[i % lens.length], bh = 7 * u;
      if (i === hot) continue;
      page += `<rect x="${f(P.x)}" y="${f(y - bh / 2)}" width="${f(P.w * 0.12)}" height="${f(bh)}" rx="${f(bh / 2)}" fill="${NAVY}" opacity=".55"/>`;
      page += `<rect x="${f(P.x + P.w * 0.18)}" y="${f(y - bh / 2)}" width="${f(bw)}" height="${f(bh)}" rx="${f(bh / 2)}" fill="${NAVY}" opacity=".88"/>`;
      page += `<rect x="${f(P.x + P.w * 0.84)}" y="${f(y - bh / 2)}" width="${f(P.w * 0.16)}" height="${f(bh)}" rx="${f(bh / 2)}" fill="${NAVY}" opacity=".7"/>`;
    }
    const y = y0 + hot * gap, bh = 9 * u;
    page += `<rect x="${f(P.x - 10 * u)}" y="${f(y - 16 * u)}" width="${f(P.w + 20 * u)}" height="${f(32 * u)}" rx="${f(8 * u)}" fill="${CYAN}" opacity=".12"/>`;
    page += `<g filter="url(#glow)"><rect x="${f(P.x)}" y="${f(y - bh / 2)}" width="${f(P.w * 0.12)}" height="${f(bh)}" rx="${f(bh / 2)}" fill="${CYAN}"/><rect x="${f(P.x + P.w * 0.18)}" y="${f(y - bh / 2)}" width="${f(P.w * 0.5)}" height="${f(bh)}" rx="${f(bh / 2)}" fill="${CYAN}"/></g>`;
    const cx = P.x + P.w * 0.9, cr = 17 * u;
    page += `<g filter="url(#glow)"><circle cx="${f(cx)}" cy="${f(y)}" r="${f(cr)}" fill="${CYAN}"/></g>`;
    page += `<path d="M${f(cx - cr * .42)} ${f(y)} L${f(cx - cr * .14)} ${f(y + cr * .3)} L${f(cx + cr * .42)} ${f(y - cr * .25)}" fill="none" stroke="${W}" stroke-width="${f(2.6 * u)}" stroke-linecap="round" stroke-linejoin="round"/>`;
    target = { x: P.x, y };
  }

  // the exception line: white on navy, cyan on the page, from the light straight to the target
  // (an elbow on the page when the target is not on the seam light's line)
  if (target) {
    const lw = 3 * u;
    if (G.axis === 'x') {
      const ty = target.y, tx = target.x;
      s += `<g clip-path="url(#navyClip)" filter="url(#bloom)"><rect x="${L.x}" y="${f(L.y - lw / 1.5)}" width="${f(G.seam - L.x)}" height="${f(lw * 1.33)}" fill="${W}"/></g>`;
      const d = Math.abs(ty - G.light.y) < 1 ? `M${G.seam} ${f(ty)} L${f(tx)} ${f(ty)}` : `M${G.seam} ${G.light.y} L${f(G.seam + (tx - G.seam) * 0.38)} ${G.light.y} L${f(G.seam + (tx - G.seam) * 0.38)} ${f(ty)} L${f(tx)} ${f(ty)}`;
      s += `<g clip-path="url(#pageClip)" filter="url(#glow)"><path d="${d}" fill="none" stroke="${CYAN}" stroke-width="${f(lw)}" stroke-linejoin="round"/></g>`;
    } else {
      const tx = target.x, ty = target.y;
      s += `<g clip-path="url(#navyClip)" filter="url(#bloom)"><rect x="${f(L.x - lw / 1.5)}" y="${L.y}" width="${f(lw * 1.33)}" height="${f(Math.max(0, G.seam - L.y))}" fill="${W}"/></g>`;
      const d = Math.abs(tx - G.light.x) < 1 ? `M${f(tx)} ${G.seam} L${f(tx)} ${f(ty)}` : `M${G.light.x} ${G.seam} L${G.light.x} ${f(G.seam + (ty - G.seam) * 0.4)} L${f(tx)} ${f(G.seam + (ty - G.seam) * 0.4)} L${f(tx)} ${f(ty)}`;
      s += `<g clip-path="url(#pageClip)" filter="url(#glow)"><path d="${d}" fill="none" stroke="${CYAN}" stroke-width="${f(lw)}" stroke-linejoin="round"/></g>`;
    }
  }
  s += `<g clip-path="url(#pageClip)"><ellipse cx="${G.light.x}" cy="${G.light.y}" rx="${200 * u}" ry="${120 * u}" fill="url(#landing)"/></g>`;
  s += page;

  // seam of light along the split
  s += G.axis === 'x'
    ? `<rect x="${f(G.seam - 1.5 * u)}" y="${f(h * 0.08)}" width="${f(3 * u)}" height="${f(h * 0.84)}" fill="url(#seamG)" filter="url(#glowW)"/>`
    : `<rect x="${f(w * 0.08)}" y="${f(G.seam - 1.5 * u)}" width="${f(w * 0.84)}" height="${f(3 * u)}" fill="url(#seamG)" filter="url(#glowW)"/>`;

  // the light (an orb in the field when there is no copy, a seam light when there is)
  s += `<circle cx="${L.x}" cy="${L.y}" r="${f(orbR * 2.6)}" fill="none" stroke="${W}" stroke-opacity=".14" stroke-width="${f(u)}"/>`;
  s += `<circle cx="${L.x}" cy="${L.y}" r="${f(orbR * 2)}" fill="none" stroke="${CYAN}" stroke-opacity=".6" stroke-width="${f(1.5 * u)}" stroke-dasharray="${f(3 * u)} ${f(7 * u)}"/>`;
  s += `<circle cx="${L.x}" cy="${L.y}" r="${f(orbR * 2.36)}" fill="${W}" opacity=".3" filter="url(#b40)"/>`;
  s += `<circle cx="${L.x}" cy="${L.y}" r="${f(orbR * 1.618)}" fill="none" stroke="${CYAN}" stroke-width="${f(3 * u)}" filter="url(#glowW)"/>`;
  s += `<circle cx="${L.x}" cy="${L.y}" r="${f(orbR * 1.24)}" fill="${W}" opacity=".9" filter="url(#b10)"/>`;
  s += `<circle cx="${L.x}" cy="${L.y}" r="${f(orbR)}" fill="${W}" filter="url(#bloom)"/>`;
  return { svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>${defs}</defs>${s}</svg>`, G };
}

// ---- Type plan per kind (px at u = 1). The canvas fits each line to the text box. ----
function typePlan(F, C) {
  if (F.kind === 'strip') return { eyebrow: 26, hero: 0, heroText: 92, title: 34, support: 0, cta: 26, gap: 1 };
  if (F.kind === 'land') return { eyebrow: 21, hero: C.hero ? 150 : 0, heroText: 104, title: 36, support: 24, cta: 22, gap: 1 };
  if (F.h / F.w > 1.5) return { eyebrow: 32, hero: C.hero ? 300 : 0, heroText: 150, title: 60, support: 36, cta: 32, gap: 1.35 };
  if (F.h / F.w > 1.2) return { eyebrow: 28, hero: C.hero ? 210 : 0, heroText: 128, title: 50, support: 32, cta: 28, gap: 1.15 };
  return { eyebrow: 26, hero: C.hero ? 170 : 0, heroText: 116, title: 44, support: 28, cta: 26, gap: 1 };
}

(async () => {
  const only = process.argv[2] || '';
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage();
  await page.goto('about:blank');
  await page.evaluate(async ({ inter, cairo }) => {
    const a = new FontFace('Inter', `url(data:font/woff2;base64,${inter})`, { weight: '400 900', unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+2000-206F, U+2074, U+20AC, U+2122, U+2190, U+2191, U+2193, U+2212, U+2215' });
    const b = new FontFace('Cairo', `url(data:font/woff2;base64,${cairo})`, { weight: '400 900', unicodeRange: 'U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF' });
    await a.load(); await b.load(); document.fonts.add(a); document.fonts.add(b);
  }, { inter: INTER, cairo: CAIRO });

  // Rasterise on a canvas and encode with Chrome's WebP / JPEG encoders, as article-images.js does.
  // Copy is set on the canvas in the site's Inter (Latin, digits) and Cairo (Arabic).
  const render = async (job) => page.evaluate(async (j) => {
    const load = async (src) => { const i = new Image(); i.src = src; await i.decode(); return i; };
    const bg = await load('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(j.svg));
    const c = document.createElement('canvas'); c.width = j.w; c.height = j.h;
    const g = c.getContext('2d');
    g.drawImage(bg, 0, 0, j.w, j.h);
    const u = j.G.u, T = j.G.text, C = j.C, P = j.plan;
    const FONT = '"Inter", "Cairo", sans-serif';
    // MFT mark: navy on the page, bottom margin of the page column
    const mk = await load(j.G.mark.onNavy ? j.markWhite : j.markNavy);
    const mh = (j.kind === 'strip' ? 24 : 34) * u * (j.kind === 'stack' ? 1.15 : 1), mw = mh * mk.width / mk.height;
    const mx = j.G.mark.x, my = j.G.mark.y;
    g.drawImage(mk, mx, my - mh, mw, mh);
    g.fillStyle = j.G.mark.onNavy ? '#FFFFFF' : '#0D1B3E'; g.font = `800 ${mh * 0.76}px "Inter"`; g.letterSpacing = `${mh * 0.15}px`;
    g.textAlign = 'left'; g.direction = 'ltr'; g.textBaseline = 'alphabetic';
    g.fillText('MFT', mx + mw + mh * 0.38, my - mh / 2 + mh * 0.28);
    if (!C.dir) return [c.toDataURL('image/webp', 0.9).split(',')[1], c.toDataURL('image/jpeg', 0.92).split(',')[1]];

    const rtl = C.dir === 'rtl';
    g.direction = C.dir; g.textAlign = rtl ? 'right' : 'left'; g.letterSpacing = '0px';
    const X = rtl ? T.x + T.w : T.x;
    const set = (wt, px, ls = 0) => { g.font = `${wt} ${px}px ${FONT}`; g.letterSpacing = rtl ? '0px' : `${ls}px`; };
    const fit = (text, wt, px, maxW, ls = 0) => { let p = px; set(wt, p, ls); while (g.measureText(text).width > maxW && p > 8) { p -= 1; set(wt, p, ls); } return p; };
    const wrap = (text, maxW) => { const words = text.split(' '); const lines = []; let cur = ''; for (const wd of words) { const t = cur ? cur + ' ' + wd : wd; if (g.measureText(t).width > maxW && cur) { lines.push(cur); cur = wd; } else cur = t; } if (cur) lines.push(cur); return lines; };

    // measure the block, then centre it vertically in the text box
    const k = P.gap * u, items = [];
    const ebPx = fit(C.eyebrow, 700, P.eyebrow * u, T.w, rtl ? 0 : 3 * u);
    items.push({ type: 'eyebrow', px: ebPx, h: ebPx * 1.2, after: 22 * k });
    if (C.hero && P.hero) {
      const hp = P.hero * u; set(800, hp);
      items.push({ type: 'hero', px: hp, h: hp * 0.76, after: 30 * k });
    } else if (C.heroText) {
      const hp = fit(C.heroText, 800, P.heroText * u, T.w);
      items.push({ type: 'heroText', px: hp, h: hp * 1.0, after: 22 * k });
    }
    if (C.title) { const tp = fit(C.title, 800, P.title * u, T.w); items.push({ type: 'title', px: tp, h: tp * 1.25, after: 14 * k }); }
    if (C.support && P.support) { set(500, P.support * u); const lines = wrap(C.support, T.w * 0.94); items.push({ type: 'support', px: P.support * u, lines, h: lines.length * P.support * u * 1.5, after: 30 * k }); }
    const cp = P.cta * u; set(800, cp); const cw = Math.min(g.measureText(C.cta).width + cp * 2.2, T.w), chh = cp * 2.3;
    items.push({ type: 'cta', px: cp, h: chh, after: 0 });
    const total = items.reduce((a, it) => a + it.h + it.after, 0);
    let y = T.y + Math.max(0, (T.h - total) / 2);
    for (const it of items) {
      if (it.type === 'eyebrow') { set(700, it.px, rtl ? 0 : 3 * u); g.fillStyle = '#1BB7CD'; g.fillText(C.eyebrow, X, y + it.px); }
      if (it.type === 'hero') {
        // the seat count: big cyan number + muted "/50", always LTR digits
        g.direction = 'ltr'; g.textAlign = 'left';
        set(800, it.px); const nW = g.measureText(C.hero[0]).width;
        set(800, it.px * 0.42); const dW = C.hero[1] ? g.measureText(C.hero[1]).width : 0;
        const gapX = it.px * 0.06, full = nW + gapX + dW, x0 = rtl ? X - full : X;
        g.shadowColor = 'rgba(27,183,205,.55)'; g.shadowBlur = 40 * u;
        set(800, it.px); g.fillStyle = '#1BB7CD'; g.fillText(C.hero[0], x0, y + it.px * 0.76);
        g.shadowBlur = 0; set(800, it.px * 0.42); g.fillStyle = 'rgba(255,255,255,.62)'; g.fillText(C.hero[1], x0 + nW + gapX, y + it.px * 0.76);
        g.direction = C.dir; g.textAlign = rtl ? 'right' : 'left';
      }
      if (it.type === 'heroText') { set(800, it.px); g.fillStyle = '#FFFFFF'; g.shadowColor = 'rgba(255,255,255,.35)'; g.shadowBlur = 28 * u; g.fillText(C.heroText, X, y + it.px * 0.86); g.shadowBlur = 0; }
      if (it.type === 'title') { set(800, it.px); g.fillStyle = '#FFFFFF'; g.fillText(C.title, X, y + it.px * 1.0); }
      if (it.type === 'support') { set(500, it.px); g.fillStyle = 'rgba(255,255,255,.8)'; it.lines.forEach((ln, i) => g.fillText(ln, X, y + it.px * (1.1 + i * 1.5))); }
      if (it.type === 'cta') {
        const x0 = rtl ? X - cw : X, r = chh / 2;
        g.shadowColor = 'rgba(27,183,205,.5)'; g.shadowBlur = 24 * u;
        g.fillStyle = '#1BB7CD'; g.beginPath(); g.roundRect(x0, y, cw, chh, r); g.fill(); g.shadowBlur = 0;
        set(800, it.px); g.fillStyle = '#0D1B3E'; g.textAlign = 'center';
        let p = it.px; while (g.measureText(C.cta).width > cw - p * 1.6 && p > 8) { p -= 1; set(800, p); }
        g.fillText(C.cta, x0 + cw / 2, y + chh / 2 + p * 0.36);
        g.textAlign = rtl ? 'right' : 'left';
      }
      y += it.h + it.after;
    }
    return [c.toDataURL('image/webp', 0.9).split(',')[1], c.toDataURL('image/jpeg', 0.92).split(',')[1]];
  }, job);

  const written = [];
  for (const F of FORMATS) {
    for (const v of F.variants) {
      const base = `${F.name}_${v}_${F.w}x${F.h}`;
      if (only && !base.includes(only)) continue;
      const { svg, G } = scene(F, v);
      const [webp, jpg] = await render({ svg, G, w: F.w, h: F.h, kind: F.kind, C: COPY[v], plan: typePlan(F, COPY[v]), markNavy: MARK_NAVY, markWhite: MARK_WHITE });
      const dir = path.join(OUT, F.dir); fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, base + '.webp'), Buffer.from(webp, 'base64'));
      fs.writeFileSync(path.join(dir, base + '.jpg'), Buffer.from(jpg, 'base64'));
      written.push({ dir: F.dir, base, w: F.w, h: F.h, variant: v, name: F.name });
      // the founding page og:image is the 1200×630 seats card in each language
      if (F.name === 'linkedin-facebook-link' && /^seats-(ar|en)$/.test(v)) {
        fs.mkdirSync(SITE_OUT, { recursive: true });
        fs.writeFileSync(path.join(SITE_OUT, `founding-og-${v.slice(-2)}.jpg`), Buffer.from(jpg, 'base64'));
      }
      console.log('wrote', F.dir + '/' + base);
    }
  }
  await browser.close();

  // Review sheet: marketing/designs/index.html shows every file at a glance (open it locally).
  if (!only) {
    const groups = [...new Set(written.map((x) => x.dir))];
    const html = `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SEG Audit launch designs</title>
<style>body{margin:0;padding:32px 16px;background:#F5F7FA;color:#0D1B3E;font:15px/1.5 system-ui,sans-serif}h1{font-size:24px;margin:0 0 4px}h2{font-size:18px;margin:40px 0 12px;text-transform:capitalize}p{margin:0 0 16px;color:#3B4262}.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px}figure{margin:0;background:#fff;border:1px solid #E6E9F0;border-radius:6px;padding:10px}img{display:block;width:100%;height:auto;background:#0D1B3E}figcaption{font-size:12px;margin-top:8px;word-break:break-all}</style>
<h1>SEG Audit launch: Founding Members</h1><p>Generated by scripts/launch-images.js. ${FM.total} founding seats${FM.showCount ? ` (${FILLED} filled)` : ', no public counter'}. Every file exists as .webp and .jpg.</p>
${groups.map((gname) => `<h2>${gname}</h2><div class="g">${written.filter((x) => x.dir === gname).map((x) => `<figure><img loading="lazy" src="${gname}/${x.base}.webp" alt="${x.name} ${x.variant}"><figcaption>${gname}/${x.base}.jpg · ${x.w}×${x.h}</figcaption></figure>`).join('')}</div>`).join('\n')}`;
    fs.writeFileSync(path.join(OUT, 'index.html'), html);
    console.log(`${written.length} designs × 2 formats`);
  }
})();
