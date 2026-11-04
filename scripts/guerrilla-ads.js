#!/usr/bin/env node
// SEG Audit "attention" pack (CEO brief, 3 Nov 2026): three stylized, code-generated guerrilla styles
// rendered into marketing/designs/guerrilla/. Every line comes in square 1080×1080 and story 1080×1920.
//
// Same system as the launch designs: navy #0D1B3E, cyan #1BB7CD, brilliant pure white, no gold, Arabic
// RTL, small MFT mark, no real person anywhere (the hand is a flat illustration, not a photo).
//   graffiti   spray paint on a navy-painted concrete wall: formwork seams, tie holes, grain, drips
//   palm       pen writing on the palm of an illustrated open hand, with the line under it:
//              «الحاجة المهمة بتتكتب عشان ماتتنساش. دفاترك أهم»
//   sticky     a cyan sticky note on a monitor showing a ledger (cyan, not yellow: no gold)
// Every frame carries the small CTA «فحص مجاني في دقائق · seg-audit.com».
//
// Hand lettering uses macOS system fonts (Waseem for spray and marker, Farisi for pen, Bradley Hand
// for the Latin domain); UI type is Cairo from src/assets/fonts. On another OS the hand fonts fall
// back, so render on a Mac.
// Needs Playwright + Google Chrome:  PLAYWRIGHT_PATH=<path to playwright> node scripts/guerrilla-ads.js [filter]
const fs = require('fs');
const path = require('path');

let chromium;
try { ({ chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright')); }
catch { console.error('playwright not found. npm i -D playwright, or set PLAYWRIGHT_PATH.'); process.exit(1); }

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'marketing/designs/guerrilla');
const b64 = (f) => fs.readFileSync(path.join(ROOT, f)).toString('base64');
const MARK = 'data:image/png;base64,' + b64('src/assets/logo/mft-mark-white.png');
const CAIRO = b64('src/assets/fonts/cairo-arabic-var.woff2');
const INTER = b64('src/assets/fonts/inter-latin-var.woff2');

const NAVY = '#0D1B3E', CYAN = '#1BB7CD', W = '#FFFFFF';
const SIZES = { square: [1080, 1080], story: [1080, 1920] };
const CAPTION = 'الحاجة المهمة بتتكتب عشان ماتتنساش. دفاترك أهم';

// ---------------------------------------------------------------- copy (CEO brief)
const GRAFFITI = [
  { slug: '01-who-reviews', lines: [['مين بيراجع', W, 250], ['دفاترك؟', CYAN, 330]] },
  { slug: '02-errors', lines: [['دفاترك فيها أخطاء…', W, 200], ['وإنت لسه مش عارف.', CYAN, 200]] },
  { slug: '03-closing', lines: [['الإقفال جايّ.', W, 240], ['وفيه مفاجآت.', CYAN, 240]] },
  { slug: '04-365', tally: true, lines: [['٣٦٥ يوم', CYAN, 300], ['بلا مراجعة', W, 200], ['= خطر مستخبي.', W, 200]] }
];
const PALM = [
  { slug: '01-review-your-books', t: 'راجع دفاترك' },
  { slug: '02-who-reviews-you', t: 'مين بيراجعك؟' },
  { slug: '03-domain', t: 'seg-audit.com', latin: true }
];
const STICKY = [
  { slug: '01-cash', l1: 'ماتنساش…', l2: 'الخزينة مش مظبوطة' },
  { slug: '02-receivables', l1: 'الذمم المدينة', l2: 'محتاجة مراجعة' }
];

// ---------------------------------------------------------------- shared page parts
const BASE_CSS = `
@font-face{font-family:Cairo;src:url(data:font/woff2;base64,${CAIRO});font-weight:400 900}
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${INTER});font-weight:400 900}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:100%;height:100%;overflow:hidden}
body{position:relative;direction:rtl;font-family:Cairo,sans-serif;background:${NAVY};color:${W}}
.layer{position:absolute;inset:0}
.cta{position:absolute;right:64px;display:flex;align-items:center;gap:14px;padding:0 30px;border-radius:999px;
  background:${CYAN};color:${NAVY};font-weight:800;white-space:nowrap;box-shadow:0 8px 28px rgba(27,183,205,.35)}
.cta b{font-family:Inter,sans-serif;font-weight:800}
.mark{position:absolute;left:64px;display:flex;align-items:center;gap:12px;direction:ltr}
.mark img{display:block}
.mark span{font:800 1em Inter,sans-serif;letter-spacing:.15em;color:${W}}`;

const cta = (h, bottom) => {
  const px = h === 1920 ? 30 : 25, ht = h === 1920 ? 68 : 56;
  return `<div class="cta" style="bottom:${bottom}px;height:${ht}px;font-size:${px}px"><span>فحص مجاني في دقائق</span><i>·</i><b dir="ltr">seg-audit.com</b></div>`;
};
const mark = (h, bottom) => {
  const s = h === 1920 ? 40 : 34;
  return `<div class="mark" style="bottom:${bottom + 14}px;font-size:${s * 0.76}px"><img src="${MARK}" style="height:${s}px"><span>MFT</span></div>`;
};
const page = (css, body, script = '') => `<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><style>${BASE_CSS}${css}</style><body>${body}<script>${script}</script></body></html>`;

// Shrinks every .fit element (inline-block) until its layout width, before any rotation, fits data-max (px).
const FIT_JS = `for (const el of document.querySelectorAll('.fit')) { const max = +el.dataset.max; let px = parseFloat(getComputedStyle(el).fontSize); while (el.offsetWidth > max && px > 10) el.style.fontSize = (--px) + 'px'; }`;

// ---------------------------------------------------------------- 1) graffiti on a concrete wall
function graffiti(d, w, h) {
  const story = h === 1920, seed = d.slug.charCodeAt(1) * 7;
  // formwork panels and tie holes
  const pw = 360, ph = story ? 320 : 270; let seams = '', holes = '';
  for (let x = pw; x < w; x += pw) seams += `<rect x="${x - 1}" y="0" width="3" height="${h}" fill="rgba(0,0,0,.32)"/><rect x="${x + 2}" y="0" width="1" height="${h}" fill="rgba(255,255,255,.05)"/>`;
  for (let y = ph; y < h; y += ph) seams += `<rect x="0" y="${y - 1}" width="${w}" height="3" fill="rgba(0,0,0,.32)"/><rect x="0" y="${y + 2}" width="${w}" height="1" fill="rgba(255,255,255,.05)"/>`;
  for (let x = pw / 4; x < w; x += pw / 2) for (let y = ph / 2; y < h; y += ph) holes += `<circle cx="${x}" cy="${y}" r="7" fill="rgba(0,0,0,.5)" stroke="rgba(255,255,255,.07)" stroke-width="2"/>`;
  // tally marks: 365 days nobody looked at
  let tally = '';
  if (d.tally) {
    const gx = 70, gy = story ? 150 : 90, cw = 92;
    for (let g = 0; g < 9; g++) {
      const x0 = gx + (g % 9) * cw * 1.05, y0 = gy;
      for (let i = 0; i < 4; i++) tally += `<path d="M${x0 + i * 15} ${y0} l${(i % 2) * 3 - 1} 70" stroke="rgba(255,255,255,.42)" stroke-width="7" stroke-linecap="round" fill="none"/>`;
      tally += `<path d="M${x0 - 10} ${y0 + 52} L${x0 + 60} ${y0 + 14}" stroke="rgba(255,255,255,.42)" stroke-width="7" stroke-linecap="round" fill="none"/>`;
    }
  }
  const k = story ? 1.12 : 1, maxW = w - 150;
  const lines = d.lines.map(([t, c, px]) => `<div class="ln"><span class="sp fit" data-max="${maxW}" style="color:${c};font-size:${px * k}px">${t}<i class="bl"></i></span></div>`).join('');
  const css = `
.wall{background:radial-gradient(ellipse at 55% 42%, #22346A 0%, #172852 45%, ${NAVY} 100%)}
.copy{position:absolute;right:75px;left:75px;top:50%;transform:translateY(-${story ? 56 : 54}%) rotate(-3.5deg);text-align:center}
.ln{line-height:1.12}
.sp{position:relative;display:inline-block;white-space:nowrap;font-family:Waseem,Cairo,sans-serif;font-weight:700;filter:url(#spray);
  text-shadow:0 0 5px currentColor,0 0 22px rgba(255,255,255,.18)}
.sp .bl{display:inline-block;width:0;height:0}
.drip{position:absolute;background:currentColor;border-radius:0 0 999px 999px}
.drip::after{content:'';position:absolute;left:50%;bottom:-6px;transform:translateX(-50%);width:170%;aspect-ratio:1;border-radius:50%;background:currentColor}`;
  const body = `
<div class="layer wall"></div>
<svg class="layer" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <filter id="grainW"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" seed="${seed}"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 .5 0 0 0 -.18"/></filter>
    <filter id="grainK"><feTurbulence type="fractalNoise" baseFrequency=".55" numOctaves="3" seed="${seed + 1}"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .9 0 0 0 -.3"/></filter>
    <filter id="stain"><feTurbulence type="fractalNoise" baseFrequency=".005" numOctaves="4" seed="${seed + 2}"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1.1 0 0 0 -.42"/></filter>
    <filter id="spray" x="-5%" y="-10%" width="110%" height="130%"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="1" seed="${seed + 3}" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="6" xChannelSelector="R" yChannelSelector="G"/></filter>
  </defs>
  <rect width="${w}" height="${h}" filter="url(#stain)"/>
  <rect width="${w}" height="${h}" filter="url(#grainK)"/>
  <rect width="${w}" height="${h}" filter="url(#grainW)"/>
  ${seams}${holes}${tally}
</svg>
<div class="copy">${lines}</div>
${cta(h, 64)}${mark(h, 64)}`;
  // Drips from the baseline of each sprayed line.
  const script = `${FIT_JS}
let s = ${seed}; const r = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
for (const sp of document.querySelectorAll('.sp')) {
  const wd = sp.offsetWidth, base = sp.querySelector('.bl').offsetTop, fs = parseFloat(sp.style.fontSize), n = 2 + Math.floor(r() * 3);
  for (let i = 0; i < n; i++) {
    const dr = document.createElement('i'); dr.className = 'drip'; const dw = 3 + r() * 4;
    dr.style.cssText = 'left:' + (wd * (0.06 + r() * 0.88)) + 'px;top:' + (base - fs * 0.12) + 'px;width:' + dw + 'px;height:' + (fs * (0.12 + r() * 0.38)) + 'px';
    sp.appendChild(dr);
  }
}
`;
  return page(css, body, script);
}

// ---------------------------------------------------------------- 2) written on the palm
// A flat illustrated open hand in a 600×820 box: fingers and palm drawn twice, outline pass first and
// fill pass on top, so the outline only shows on the outer edge.
function handSvg() {
  const parts = [
    '<rect x="150" y="120" width="88" height="340" rx="44" transform="rotate(-8 194 450)"/>',
    '<rect x="250" y="66" width="92" height="390" rx="46" transform="rotate(-1 296 450)"/>',
    '<rect x="350" y="104" width="88" height="352" rx="44" transform="rotate(6 394 450)"/>',
    '<rect x="440" y="200" width="74" height="280" rx="37" transform="rotate(14 477 470)"/>',
    '<rect x="142" y="337" width="96" height="310" rx="48" transform="rotate(-34 190 620)"/>',
    '<rect x="146" y="360" width="364" height="230" rx="70"/>',
    '<path d="M152 430 C140 520 150 600 182 660 C200 700 206 760 208 830 L432 830 C436 760 452 700 482 646 C516 580 522 500 508 420 Z"/>',
    '<ellipse cx="214" cy="600" rx="82" ry="118"/>'
  ].join('');
  const lines = [
    'M318 428 C236 500 222 600 252 736', // thenar crease
    'M508 474 C430 452 360 470 300 512', // heart line
    'M196 500 C262 520 332 546 404 578', // head line
    'M178 160 l30 -4 M276 118 l32 0 M376 152 l30 4 M462 252 l24 6', // finger tip pads
    'M162 300 l42 -6 M264 268 l42 -2 M366 278 l40 4 M452 354 l32 8' // upper joints
  ];
  return `<svg viewBox="0 0 600 820" width="100%" height="100%">
  <defs><linearGradient id="skin" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="820"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#E4F3F6"/></linearGradient></defs>
  <g fill="${CYAN}" stroke="${CYAN}" stroke-width="10" opacity=".55">${parts}</g>
  <g fill="url(#skin)">${parts}</g>
  <g stroke="rgba(13,27,62,.16)" stroke-width="4" stroke-linecap="round" fill="none">${lines.map((p) => `<path d="${p}"/>`).join('')}</g>
</svg>`;
}
function palm(d, w, h) {
  const story = h === 1920;
  const hw = story ? 870 : 560, hh = hw * 820 / 600, top = story ? 200 : 26;
  const capY = story ? 1500 : 830;
  const ink = d.latin
    ? `font-family:'Bradley Hand',cursive;font-weight:700;direction:ltr;font-size:${hw * 0.115}px`
    : `font-family:Farisi,Cairo,serif;font-size:${hw * 0.2}px`;
  const css = `
.glow{background:radial-gradient(circle at 50% ${story ? 38 : 40}%, rgba(27,183,205,.28) 0%, rgba(27,183,205,0) 46%)}
.hand{position:absolute;left:${(w - hw) / 2}px;top:${top}px;width:${hw}px;height:${hh}px}
.ink{position:absolute;left:16%;right:12%;top:58%;transform:translateY(-50%) rotate(-9deg);text-align:center;white-space:nowrap}
.ink span{display:inline-block;line-height:1.1;color:${NAVY};filter:url(#pen);${ink}}
.ink u{display:block;margin:6px auto 0;width:62%;height:9px;border-radius:9px;background:${CYAN};filter:url(#pen);transform:rotate(1.5deg)}
.cap{position:absolute;right:64px;left:64px;top:${capY}px;text-align:center;font-weight:800;font-size:${story ? 52 : 40}px;line-height:1.5}
.cap em{font-style:normal;color:${CYAN}}
.fade{position:absolute;left:0;right:0;top:${capY - (story ? 260 : 170)}px;height:${story ? 260 : 170}px;background:linear-gradient(to bottom, rgba(13,27,62,0), ${NAVY})}`;
  const [c1, c2] = CAPTION.split('. ');
  const body = `
<svg width="0" height="0" style="position:absolute"><filter id="pen"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="5" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="3"/></filter></svg>
<div class="layer glow"></div>
<div class="hand">${handSvg()}<div class="ink"><span class="fit" data-max="${hw * 0.62}">${d.t}</span><u></u></div></div>
<div class="fade"></div>
<p class="cap">${c1}.<br><em>${c2}</em></p>
${cta(h, 64)}${mark(h, 64)}`;
  return page(css, body, FIT_JS);
}

// ---------------------------------------------------------------- 3) sticky note on a screen
function sticky(d, w, h) {
  const story = h === 1920;
  const mw = story ? 960 : 900, mh = mw * 0.62, mx = (w - mw) / 2, my = story ? 640 : 110;
  const nw = story ? 600 : 520;
  const rows = Array.from({ length: 9 }, (_, i) => {
    const hi = i === 5;
    return `<div class="row${hi ? ' hi' : ''}"><i style="width:${[38, 52, 30, 46, 58, 44, 34, 50, 40][i]}%"></i><b></b><b></b></div>`;
  }).join('');
  const css = `
.desk{background:radial-gradient(ellipse at 50% 30%, #1C2E5C 0%, ${NAVY} 70%)}
.mon{position:absolute;left:${mx}px;top:${my}px;width:${mw}px;height:${mh}px;border-radius:26px;background:#08122B;
  border:2px solid #22356A;box-shadow:0 40px 90px rgba(0,0,0,.5);padding:26px 26px 48px}
.mon::after{content:'';position:absolute;left:50%;bottom:18px;width:12px;height:12px;border-radius:50%;background:#22356A;transform:translateX(-50%)}
.scr{width:100%;height:100%;border-radius:8px;background:#F5F7FA;padding:28px 34px;overflow:hidden}
.bar{height:34px;border-radius:6px;background:${NAVY};margin-bottom:22px;display:flex;gap:10px;align-items:center;padding:0 14px}
.bar i{width:12px;height:12px;border-radius:50%;background:rgba(255,255,255,.35)}
.row{display:flex;align-items:center;gap:22px;height:${mh * 0.068}px;border-bottom:2px solid #E6E9F0}
.row i{display:block;height:10px;border-radius:5px;background:#3B4262;opacity:.55}
.row b{display:block;margin-inline-start:auto;width:12%;height:10px;border-radius:5px;background:#3B4262;opacity:.35}
.row b + b{margin-inline-start:0}
.row.hi{background:rgba(27,183,205,.14);border-radius:6px}
.row.hi i,.row.hi b{background:${CYAN};opacity:1}
.neck{position:absolute;left:${w / 2 - 50}px;top:${my + mh}px;width:100px;height:${story ? 150 : 110}px;background:linear-gradient(#0A1530,#22356A)}
.foot{position:absolute;left:${w / 2 - 190}px;top:${my + mh + (story ? 150 : 110)}px;width:380px;height:22px;border-radius:12px;background:#22356A}
.note{position:absolute;width:${nw}px;height:${nw}px;right:${mx - (story ? 0 : 30)}px;top:${my - (story ? 120 : 50)}px;transform:rotate(4.5deg);
  background:linear-gradient(160deg,#5ED2E1 0%,${CYAN} 55%,#16A6BB 100%);
  box-shadow:0 26px 40px rgba(0,0,0,.42), inset 0 -18px 30px rgba(13,27,62,.12);
  border-radius:4px 4px 4px 60px/4px 4px 4px 30px;padding:${nw * 0.13}px ${nw * 0.09}px;color:${NAVY};text-align:center;
  display:flex;flex-direction:column;justify-content:center;gap:${nw * 0.03}px}
.tape{position:absolute;top:-26px;left:50%;width:46%;height:58px;transform:translateX(-50%) rotate(-3deg);background:rgba(255,255,255,.55);box-shadow:0 2px 6px rgba(0,0,0,.12)}
.note p{display:inline-block;align-self:center;font-family:Waseem,Cairo,sans-serif;font-weight:700;line-height:1.15;white-space:nowrap;filter:url(#mk)}
.note svg.u{display:block;margin:0 auto}`;
  const body = `
<svg width="0" height="0" style="position:absolute"><filter id="mk"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="9" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="3"/></filter></svg>
<div class="layer desk"></div>
<div class="mon"><div class="scr"><div class="bar"><i></i><i></i><i></i></div>${rows}</div></div>
<div class="neck"></div><div class="foot"></div>
<div class="note"><span class="tape"></span>
  <p class="fit" data-max="${nw * 0.82}" style="font-size:${nw * 0.17}px">${d.l1}</p>
  <p class="fit" data-max="${nw * 0.82}" style="font-size:${nw * 0.17}px">${d.l2}</p>
  <svg class="u" width="${nw * 0.62}" height="30" viewBox="0 0 300 30" style="filter:url(#mk)"><path d="M6 18 C80 6 160 26 294 10" stroke="${NAVY}" stroke-width="7" stroke-linecap="round" fill="none"/></svg>
</div>
${cta(h, 64)}${mark(h, 64)}`;
  return page(css, body, FIT_JS);
}

// ---------------------------------------------------------------- render
async function main() {
  const only = process.argv[2] || '';
  const browser = await chromium.launch({ channel: 'chrome', args: ['--disable-gpu'] });
  const enc = await browser.newPage();
  const written = [];
  const jobs = [
    ...GRAFFITI.map((d) => ['graffiti', d, graffiti]),
    ...PALM.map((d) => ['palm', d, palm]),
    ...STICKY.map((d) => ['sticky', d, sticky])
  ];
  for (const [style, d, fn] of jobs) for (const [kind, [w, h]] of Object.entries(SIZES)) {
    const base = `${style}-${d.slug}_ar_${kind}_${w}x${h}`;
    if (only && !`${style}/${base}`.includes(only)) continue;
    const p = await browser.newPage({ viewport: { width: w, height: h } });
    await p.setContent(fn(d, w, h), { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(150);
    const png = (await p.screenshot({ type: 'png' })).toString('base64');
    await p.close();
    // Same encoders and qualities as scripts/launch-concepts.js.
    const [webp, jpg] = await enc.evaluate(async (src) => {
      const i = new Image(); i.src = 'data:image/png;base64,' + src; await i.decode();
      const c = document.createElement('canvas'); c.width = i.width; c.height = i.height; c.getContext('2d').drawImage(i, 0, 0);
      return [c.toDataURL('image/webp', 0.9), c.toDataURL('image/jpeg', 0.92)].map((x) => x.split(',')[1]);
    }, png);
    fs.mkdirSync(path.join(OUT, style), { recursive: true });
    fs.writeFileSync(path.join(OUT, style, `${base}.webp`), Buffer.from(webp, 'base64'));
    fs.writeFileSync(path.join(OUT, style, `${base}.jpg`), Buffer.from(jpg, 'base64'));
    written.push({ style, base, w, h });
    console.log('wrote', `${style}/${base}`);
  }
  await browser.close();

  if (!only) {
    const names = { graffiti: 'جرافيتي على حيطة', palm: 'مكتوب على راحة اليد', sticky: 'ورقة لاصقة على شاشة' };
    const html = `<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SEG guerrilla pack</title>
<style>body{margin:0;padding:32px 16px;background:#F5F7FA;color:#0D1B3E;font:15px/1.6 system-ui,sans-serif}h1{font-size:24px;margin:0 0 4px}h2{font-size:18px;margin:40px 0 12px}p{margin:0 0 16px;color:#3B4262}.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:20px;align-items:start}figure{margin:0;background:#fff;border:1px solid #E6E9F0;border-radius:6px;padding:10px}img{display:block;width:100%;height:auto}figcaption{font-size:12px;margin-top:8px;word-break:break-all;direction:ltr;text-align:left}</style>
<h1>Standard Enterprise Governance (SEG): حزمة جذب الانتباه</h1><p>تصاميم مولَّدة بالكود (stylized) عبر scripts/guerrilla-ads.js: navy وcyan وأبيض، بلا ذهبي، بلا أي شخص حقيقي. كل جملة بمقاسين: مربع 1080×1080 وستوري 1080×1920، بصيغتي JPG وWebP.</p>
${Object.keys(names).map((s) => `<h2>${names[s]}</h2><div class="g">${written.filter((x) => x.style === s).map((x) => `<figure><img loading="lazy" src="${s}/${x.base}.webp" alt="${x.base}"><figcaption>${s}/${x.base}.jpg · ${x.w}×${x.h}</figcaption></figure>`).join('')}</div>`).join('\n')}`;
    fs.writeFileSync(path.join(OUT, 'index.html'), html);
    console.log(`${written.length} designs × 2 formats`);
  }
}

if (require.main === module) main();
module.exports = { graffiti, palm, sticky, GRAFFITI, PALM, STICKY };
