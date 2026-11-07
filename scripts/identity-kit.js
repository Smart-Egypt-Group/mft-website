#!/usr/bin/env node
// Identity kit (logo A): profile pictures and covers for every platform, one look across all of them.
//   PLAYWRIGHT_PATH=… node scripts/identity-kit.js
// → marketing/brand/identity-kit/{avatars,covers}/*.png, mirrored to src/assets/brand/identity-kit/ (public).
// Look: the campaign navy field (radial lift top-right, faint cyan grid), the official A files from
// marketing/brand/assets/logo/official/ (SVG, so small avatars stay crisp), the MFT lockup after a divider
// (signature proportions from lib/campaign.js: divider and MFT = H/φ, gaps = H/φ²).
// Avatars: the A cube alone, inside the inner 64% so a circular crop never clips it.
// Covers: the full signature + seg-audit.com, kept inside each platform's safe area (SAFE below).
const fs = require('fs'), path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const { NAVY, CYAN } = require('./lib/brand-tokens.js').legacy;
const { PHI } = require('./lib/brand-tokens.js').phi;
const ROOT = path.join(__dirname, '..'), OFF = path.join(ROOT, 'marketing/brand/assets/logo/official');
const OUT = path.join(ROOT, 'marketing/brand/identity-kit'), PUB = path.join(ROOT, 'src/assets/brand/identity-kit');
const svg = (f) => 'data:image/svg+xml;base64,' + fs.readFileSync(path.join(OFF, f)).toString('base64');
const png = (f) => 'data:image/png;base64,' + fs.readFileSync(path.join(ROOT, f)).toString('base64');
const CUBE = svg('seg-cube-official_color-on-dark.svg'), LOCK = svg('seg-lockup-official_two-dark.svg'), MFT = png('src/assets/logo/mft-lockup-white.png');
const INTER = fs.readFileSync(path.join(ROOT, 'src/assets/fonts/inter-latin-var.woff2')).toString('base64');

const AVATARS = [ // [platform, size]
  ['facebook', 500], ['instagram', 320], ['linkedin-company', 300], ['youtube', 800], ['tiktok', 200], ['x', 400], ['whatsapp', 640]
];
// [platform, w, h, safe area {w, h} centred, content anchor]; anchor 'end' = right part (a profile photo sits bottom-left)
const COVERS = [
  ['facebook-cover', 1640, 624, { w: 820, h: 312 }, 'center'],
  ['linkedin-company-banner', 1128, 191, { w: 1128, h: 165 }, 'center'],
  ['linkedin-personal-banner', 1584, 396, { w: 1584, h: 250 }, 'end'],
  ['youtube-banner', 2560, 1440, { w: 1546, h: 423 }, 'center'],
  ['x-header', 1500, 500, { w: 1500, h: 290 }, 'center']
];
const field = (W, H) => `background:radial-gradient(ellipse at 78% 0%, #1E3470 0%, ${NAVY} 52%, #060E24 100%);`;
const grid = `<i style="position:absolute;inset:0;opacity:.07;background-image:linear-gradient(${CYAN} 1px,transparent 1px),linear-gradient(90deg,${CYAN} 1px,transparent 1px);background-size:48px 48px;-webkit-mask-image:radial-gradient(ellipse at 70% 30%,#000 0%,transparent 75%)"></i>`;
const page = (W, H, inner) => `<!doctype html><meta charset="utf-8"><style>@font-face{font-family:Inter;src:url(data:font/woff2;base64,${INTER});font-weight:400 900}
*{margin:0;padding:0;box-sizing:border-box}html,body{width:${W}px;height:${H}px;overflow:hidden}body{position:relative;${field(W, H)}font-family:Inter,sans-serif}</style><body>${grid}${inner}</body>`;

function avatar(S) {
  const c = Math.round(S * 0.6); // cube box; the A cube's own aspect is 963 × 943
  return page(S, S, `<img src="${CUBE}" style="position:absolute;width:${c}px;left:${(S - c) / 2}px;top:${(S - c * 943 / 963) / 2 + S * 0.01}px">`);
}
function cover(W, H, safe, anchor) {
  const h = Math.round(Math.min(safe.h * 0.42, safe.w / 7.6)); // signature height; ~7.6 h wide in total
  const gap = Math.round(h / (PHI * PHI)), url = Math.max(16, Math.round(h * 0.26));
  const x = anchor === 'end' ? `right:${Math.round(W * 0.06)}px;` : 'left:50%;transform:translate(-50%,-50%);';
  const y = anchor === 'end' ? `top:50%;transform:translateY(-50%);` : 'top:50%;';
  return page(W, H, `<div style="position:absolute;${x}${y}display:flex;flex-direction:column;align-items:${anchor === 'end' ? 'flex-end' : 'center'};gap:${Math.round(gap * 0.9)}px">
  <div style="display:flex;align-items:center;gap:${gap}px"><img src="${LOCK}" style="height:${h}px"><i style="width:${Math.max(1, Math.round(h * 0.02))}px;height:${Math.round(h / PHI)}px;background:#fff;opacity:.32"></i><img src="${MFT}" style="height:${Math.round(h / PHI)}px"></div>
  <p style="font:700 ${url}px Inter;letter-spacing:.04em;color:${CYAN}">seg-audit.com</p></div>`);
}

(async () => {
  for (const d of ['avatars', 'covers']) { fs.mkdirSync(path.join(OUT, d), { recursive: true }); fs.mkdirSync(path.join(PUB, d), { recursive: true }); }
  const b = await chromium.launch({ channel: 'chrome', args: ['--disable-gpu'] });
  const jobs = [...AVATARS.map(([n, s]) => ['avatars', `seg-avatar_${n}_${s}x${s}.png`, s, s, avatar(s)]),
    ...COVERS.map(([n, w, h, safe, a]) => ['covers', `seg-cover_${n}_${w}x${h}.png`, w, h, cover(w, h, safe, a)])];
  for (const [dir, name, w, h, html] of jobs) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.setContent(html, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready);
    const f = path.join(OUT, dir, name);
    await p.screenshot({ path: f }); await p.waitForTimeout(150); await p.screenshot({ path: f }); // warm-up capture (Chrome 157)
    await p.close(); fs.copyFileSync(f, path.join(PUB, dir, name)); console.log(dir, name);
  }
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
