#!/usr/bin/env node
// Brand profile assets for every MFT social profile, rendered into marketing/brand/assets/ as PNG + WebP:
//   avatars/     the MFT mark on navy, one design exported at each platform's recommended size
//   covers/      LinkedIn page cover, Facebook page cover, YouTube channel banner, X header,
//                LinkedIn personal banner (founder): each carries the positioning line in Arabic and
//                English («المنصة التي تراجع نفسها» / "The platform that reviews itself") and
//                app.seg-audit.com, kept inside the area every device shows (see SAFE below)
//   highlights/  Instagram story highlight covers (icon only, language-neutral)
//   watermark/   YouTube video watermark (transparent)
// No film grain here: it is invisible at profile sizes and stops PNG from compressing.
// The brand device on every cover is the golden spiral of reviewed reports from the launch concept
// "self-audit": the positioning line, drawn. Same engine and system as scripts/launch-concepts.js.
//
// Needs Playwright + Google Chrome:  PLAYWRIGHT_PATH=<path to playwright> node scripts/brand-profiles.js
const fs = require('fs');
const path = require('path');
const K = require('./launch-concepts.js');
const { design, navyField, light, spiral, rect, circ, bar, cyanCheck, text, pill, PHI, NAVY, CYAN, W, DIM } = K;

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'marketing/brand/assets');
const MARK_WHITE = 'data:image/png;base64,' + fs.readFileSync(path.join(ROOT, 'src/assets/logo/mft-mark-white.png')).toString('base64'); // qa-allow-mft-mark: MFT's own company avatars + watermark (SEG cube decision pending the CEO's logo direction)
const MARK_RATIO = 1024 / 1406; // mft-mark-*.png width / height qa-allow-mft-mark

const LINE = { ar: 'المنصة التي تراجع نفسها', en: 'The platform that reviews itself' };
const EYEBROW = 'MODERN FINANCIAL TECHNOLOGY · STANDARD ENTERPRISE GOVERNANCE';
const URL = 'app.seg-audit.com';

// ---- avatar: white mark + "MFT" on navy, everything inside the circle crop (radius 0.5) with room
// to spare; a thin cyan ring with one bright point, the "exception" of the system.
function avatar(s) {
  const u = s / 1080, d = design(s, s, u);
  navyField(d, 0, 0, s, s, s * 0.5, s * 0.42, { r: 0.75, grain: false });
  light(d, s * 0.5, s * 0.44, s * 0.36, 0.22);
  const R = s * 0.43, a = -Math.PI / 2 + (2 * Math.PI) / (PHI * PHI); // golden angle from the top
  d.svg += circ(s / 2, s / 2, R, 'none', { stroke: CYAN, sw: Math.max(1.5, 5 * u), so: 0.35 });
  d.svg += `<g filter="url(#glow)">${circ(s / 2 + R * Math.cos(a), s / 2 + R * Math.sin(a), Math.max(2, 14 * u), CYAN)}</g>`;
  const mh = s * 0.43, mw = mh * MARK_RATIO, top = s * 0.2;
  d.ops.push({ type: 'img', src: MARK_WHITE, x: (s - mw) / 2, y: top, w: mw, h: mh });
  text(d, { t: 'MFT', x: s / 2 + s * 0.012, y: top + mh + s * 0.115, px: s * 0.095, wt: 800, c: W, al: 'center', ls: s * 0.016, dir: 'ltr' });
  return d;
}

// ---- covers: navy field, positioning block centred in the golden-major part of the safe area,
// golden spiral in the minor part. `safe` = what every device shows, avoiding avatar overlaps.
function cover(w, h, safe, o = {}) {
  const u = safe.h / 420, d = design(w, h, u);
  navyField(d, 0, 0, w, h, safe.x + safe.w * 0.75, safe.y + safe.h * 0.5, { r: 0.7, grain: false });
  const split = safe.x + safe.w / PHI, pad = safe.h * 0.08;
  const sw = safe.x + safe.w - split - pad, sh = Math.min(sw / PHI, safe.h - 2 * pad);
  const spw = sh * PHI;
  light(d, split + pad + spw / 2, safe.y + safe.h / 2, safe.h * 0.75, 0.24);
  spiral(d, split + pad + (sw - spw) / 2, safe.y + (safe.h - sh) / 2, spw, sh, o.levels || 8);
  // the positioning block: eyebrow · Arabic line · English line · url pill (centred: bilingual-neutral)
  const cx = safe.x + (split - safe.x) / 2, maxW = split - safe.x - pad * 2;
  const k = o.compact ? [0, 0.3, 0.15, 0.15] : [0.06, 0.2, 0.1, 0.09];
  const rows = [];
  if (k[0]) rows.push({ h: safe.h * k[0] * 1.6, draw: (y) => text(d, { t: EYEBROW, x: cx, y: y + safe.h * k[0], px: safe.h * k[0], c: CYAN, al: 'center', ls: safe.h * k[0] * 0.12, maxW, fit: true, dir: 'ltr' }) });
  rows.push({ h: safe.h * k[1] * 1.25, draw: (y) => text(d, { t: LINE.ar, x: cx, y: y + safe.h * k[1] * 0.95, px: safe.h * k[1], c: W, al: 'center', maxW, fit: true }) });
  rows.push({ h: safe.h * k[2] * 1.7, draw: (y) => text(d, { t: LINE.en, x: cx, y: y + safe.h * k[2] * 1.05, px: safe.h * k[2], wt: 600, c: DIM, al: 'center', maxW, fit: true }) });
  rows.push({ h: safe.h * k[3] * 2.2, draw: (y) => pill(d, { t: URL, x: cx, y: y + safe.h * k[3] * 0.2, h: safe.h * k[3] * 1.9, px: safe.h * k[3], al: 'center', padX: safe.h * k[3] * 1.1 }) });
  const total = rows.reduce((a, r) => a + r.h, 0);
  let y = safe.y + (safe.h - total) / 2;
  for (const r of rows) { r.draw(y); y += r.h; }
  if (o.guide) d.svg += rect(safe.x, safe.y, safe.w, safe.h, 'none', { stroke: '#FF00FF', sw: 2 });
  return d;
}

// ---- Instagram highlight covers: one line icon in the centre circle (IG shows ~the middle 1080²)
function highlight(icon) {
  const w = 1080, h = 1920, u = 1, d = design(w, h, u), cx = 540, cy = 960;
  navyField(d, 0, 0, w, h, cx, cy, { r: 0.6, grain: false });
  light(d, cx, cy, 380, 0.22);
  const L = (dd) => `<path d="${dd}" fill="none" stroke="${W}" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>`;
  let s = '';
  if (icon === 'platform') { spiral(d, cx - 260, cy - 160, 520, 520 / PHI, 7); return d; }
  if (icon === 'trust') { s += L(`M${cx} ${cy - 230} L${cx + 190} ${cy - 160} V${cy + 10} C${cx + 190} ${cy + 140} ${cx + 90} ${cy + 210} ${cx} ${cy + 250} C${cx - 90} ${cy + 210} ${cx - 190} ${cy + 140} ${cx - 190} ${cy + 10} V${cy - 160} Z`); d.svg += s + cyanCheck(cx, cy, 70, 3); return d; }
  if (icon === 'insights') { s += rect(cx - 170, cy - 230, 340, 460, 'none', { r: 30, stroke: W, sw: 22 }); [0, 1, 2].forEach((i) => { s += bar(cx - 100, cy - 90 + i * 90, [200, 150, 180][i], 22, W, 0.9); }); d.svg += s + `<g filter="url(#glow)">${bar(cx - 100, cy - 180, 120, 26, CYAN)}</g>`; return d; }
  // founders (6 Nov 2026, replaces the withdrawn seat grid): a key, no count. The cyan bit = by application.
  if (icon === 'founders') { s += `<circle cx="${cx - 120}" cy="${cy - 120}" r="120" fill="none" stroke="${W}" stroke-width="22"/>` + L(`M${cx - 35} ${cy - 35} L${cx + 230} ${cy + 230} M${cx + 120} ${cy + 120} L${cx + 50} ${cy + 190} M${cx + 185} ${cy + 185} L${cx + 125} ${cy + 245}`); d.svg += s + `<g filter="url(#glow)">${circ(cx - 120, cy - 120, 44, CYAN)}</g>`; return d; }
  if (icon === 'contact') { s += L(`M${cx - 230} ${cy - 170} H${cx + 230} V${cy + 110} H${cx - 40} L${cx - 150} ${cy + 220} V${cy + 110} H${cx - 230} Z`); d.svg += s + [-90, 0, 90].map((dx, i) => i === 1 ? `<g filter="url(#glow)">${circ(cx + dx, cy - 30, 26, CYAN)}</g>` : circ(cx + dx, cy - 30, 24, W)).join(''); return d; }
  return d;
}

// ---- YouTube watermark (150×150, transparent): the white mark
function watermark() {
  const s = 150, d = design(s, s, s / 1080); d.alpha = true;
  const mh = 120, mw = mh * MARK_RATIO;
  d.ops.push({ type: 'img', src: MARK_WHITE, x: (s - mw) / 2, y: 15, w: mw, h: mh });
  return d;
}

// Platform specs. Avatar sizes: each platform's recommended upload (the circle crop is respected by
// the design). Cover safe areas: the region every device shows, minus the profile-picture overlap.
const AVATARS = [
  ['master', 1080], ['linkedin', 400], ['facebook', 720], ['instagram', 1080], ['youtube', 800], ['tiktok', 720], ['x', 400], ['whatsapp', 640]
];
const COVERS = [
  // LinkedIn company page: 1128×191; the logo overlaps the bottom-left on desktop.
  { name: 'linkedin-company-cover', w: 1128, h: 191, safe: { x: 250, y: 18, w: 850, h: 155 }, o: { compact: true, levels: 7 } },
  // Facebook page: shown 820×312 on desktop and cropped to ~16:9 on phones (sides cut); profile
  // picture overlaps the bottom-left on desktop. Uploaded at 2× (1640×624).
  { name: 'facebook-page-cover', w: 1640, h: 624, safe: { x: 300, y: 70, w: 1040, h: 440 } },
  // YouTube: 2560×1440; only the centre 1546×423 shows on every device.
  { name: 'youtube-channel-banner', w: 2560, h: 1440, safe: { x: 507, y: 508, w: 1546, h: 423 } },
  // X: 1500×500; the avatar overlaps the bottom-left and some views crop top and bottom.
  { name: 'x-header', w: 1500, h: 500, safe: { x: 330, y: 60, w: 1110, h: 340 } },
  // LinkedIn personal profile (founder): 1584×396; the photo overlaps the left.
  { name: 'linkedin-personal-banner', w: 1584, h: 396, safe: { x: 470, y: 40, w: 1070, h: 316 } }
];
const HIGHLIGHTS = ['platform', 'founders', 'trust', 'insights', 'contact']; // highlight name for 02: «المؤسِّسون»

(async () => {
  const { render, close } = await K.openRenderer();
  const files = [];
  const save = async (dir, base, d, formats = ['png', 'webp']) => {
    const out = await render(d, formats);
    fs.mkdirSync(path.join(OUT, dir), { recursive: true });
    formats.forEach((k, i) => fs.writeFileSync(path.join(OUT, dir, `${base}.${k}`), Buffer.from(out[i], 'base64')));
    files.push(`${dir}/${base}`); console.log('wrote', `${dir}/${base}`);
  };
  for (const [p, s] of AVATARS) await save('avatars', `avatar_${p}_${s}x${s}`, avatar(s));
  for (const c of COVERS) {
    await save('covers', `${c.name}_${c.w}x${c.h}`, cover(c.w, c.h, c.safe, c.o));
    await save('covers/safe-area-guides', `${c.name}_${c.w}x${c.h}_guide`, cover(c.w, c.h, c.safe, { ...c.o, guide: true }), ['webp']);
  }
  for (const [i, ic] of HIGHLIGHTS.entries()) await save('highlights', `instagram-highlight_${String(i + 1).padStart(2, '0')}-${ic}_1080x1920`, highlight(ic));
  await save('watermark', 'youtube-watermark_150x150', watermark());
  await close();
  console.log(`${files.length} assets`);
})();
