// November 2026 campaign kit, shared by every design generator (quality pass, 6 Nov 2026).
//
// One source for three things every asset must agree on:
//   1. the close date in words, from src/site.config.js → founding.closesAt (change it there only)
//   2. the campaign copy: scarcity = a closing window + selectivity. No seat numbers, no counts, no numeric
//      price or discount, no «مدى الحياة» (it belongs in the acceptance letter, not on an ad)
//   3. the platform signature: the official SEG logo (the S-E-G cube the CEO sent on 6 Nov 2026,
//      marketing/brand/assets/logo/, cleaned by scripts/seg-logo-raster.js) + the «SEG» wordmark +
//      «BY MFT», one per design, bottom-start margin, same proportions everywhere (logo height = H;
//      word = 0.6 H, 800, tracking .14em; «BY MFT» = 0.27 H, 600). Colour cube on light backgrounds;
//      the white cube on dark ones (the cube's dark blue is ≈1.3:1 on navy, below the 3:1 a logo needs).
//      The MFT mark (src/assets/logo/mft-mark-*.png) stays for MFT's own company profiles only.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const { founding } = require('../../src/site.config.js');

const DAYS_AR = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS_AR = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Cairo wall-clock parts of an ISO string that carries its own offset (e.g. 2026-11-30T23:59:00+02:00)
function parts(iso) {
  const m = String(iso).match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!m) throw new Error('closesAt must look like 2026-11-30T23:59:00+02:00');
  const [y, mo, d, h, mi] = m.slice(1).map(Number);
  const dow = new Date(Date.UTC(y, mo - 1, d)).getUTCDay();
  return { y, mo, d, h, mi, dow };
}
function words(iso) {
  const p = parts(iso), h12 = ((p.h + 11) % 12) + 1, mm = String(p.mi).padStart(2, '0');
  const pmAr = p.h >= 12 ? 'مساءً' : 'صباحًا', pmEn = p.h >= 12 ? 'pm' : 'am';
  return {
    ...p,
    arFull: `${DAYS_AR[p.dow]} ${p.d} ${MONTHS_AR[p.mo - 1]} ${p.y}، ${h12}:${mm} ${pmAr} بتوقيت القاهرة`,
    arDay: `${DAYS_AR[p.dow]} ${p.d} ${MONTHS_AR[p.mo - 1]}`,
    arShort: `${p.d} ${MONTHS_AR[p.mo - 1]}`,
    arTime: `${h12}:${mm} ${pmAr}`,
    arMonth: MONTHS_AR[p.mo - 1], arWeekday: DAYS_AR[p.dow],
    enFull: `${DAYS_EN[p.dow]} ${p.d} ${MONTHS_EN[p.mo - 1]} ${p.y}, ${h12}:${mm} ${pmEn} Cairo time`,
    enDay: `${DAYS_EN[p.dow]} ${p.d} ${MONTHS_EN[p.mo - 1]}`,
    enShort: `${p.d} ${MONTHS_EN[p.mo - 1]}`,
    enTime: `${h12}:${mm} ${pmEn}`,
    enMonth: MONTHS_EN[p.mo - 1], enWeekday: DAYS_EN[p.dow]
  };
}
const CLOSE = words(founding.closesAt);

// Campaign copy. Every scarcity line on every design comes from here.
const COPY = {
  ar: {
    program: 'برنامج الأعضاء المؤسِّسين',
    closes: 'سعر المؤسِّس يُغلق نهائيًا',
    closesOn: `سعر المؤسِّس يُغلق ${CLOSE.arShort}`,
    when: `${CLOSE.arWeekday}، ${CLOSE.arTime} بتوقيت القاهرة`,
    whenFull: CLOSE.arFull,
    after: 'وبعدها ما بيرجعش.',
    select: 'العضوية بالطلب، ومش كل طلب بيتقبل.',
    selectShort: 'بالطلب فقط',
    review: 'كل طلب بيراجعه فريق MFT بنفسه.',
    cta: 'قدّم طلبك',
    ctaUrl: 'seg-audit.com',
    free: 'فحص مجاني في دقائق'
  },
  en: {
    program: 'Founding Members Programme',
    closes: 'Founder pricing closes for good',
    closesOn: `Founder pricing closes ${CLOSE.enShort}`,
    when: `${CLOSE.enWeekday}, ${CLOSE.enTime} Cairo time`,
    whenFull: CLOSE.enFull,
    after: 'It does not come back.',
    select: 'Membership is by application. Not every application is accepted.',
    selectShort: 'By application only',
    review: 'The MFT team reviews every application itself.',
    cta: 'Apply',
    ctaUrl: 'seg-audit.com',
    free: 'Free check in minutes'
  }
};

// Forbidden on any design (checked by scripts/design-qa.js against generator sources).
const FORBIDDEN = [
  [/باقي\s*\S*\s*من\s*\S*\s*مقعد|مقعد(ًا)?\s*فقط|\d+\s*مقعد|٥٠\s*مقعد|احجز مقعدك|اكتمال العدد/, 'seat count / seat language (AR)'],
  [/\bseats? left\b|Only \$\{?[A-Z.]*\}? seats|Claim your seat|\d+ seats|seats reserved/i, 'seat count / seat language (EN)'],
  [/مدى الحياة|for life/i, '«for life» is for the acceptance letter, not designs'],
  [/50%\s*(off|مدى|خصم)|خصم\s*50|50٪/, 'numeric discount on a design']
];

// ---- the signature ----
const b64 = (f) => fs.readFileSync(path.join(ROOT, f)).toString('base64');
const LOGO = 'marketing/brand/assets/logo/';
// navy key = for light backgrounds (the colour cube); white key = for dark backgrounds
const MARK = { white: 'data:image/png;base64,' + b64(LOGO + 'seg-logo_sign-white.png'), navy: 'data:image/png;base64,' + b64(LOGO + 'seg-logo_sign.png') };
MARK.color = MARK.navy; MARK.onDark = MARK.white; MARK.onLight = MARK.navy;
const MARK_FILES = { white: LOGO + 'seg-logo_sign-white.png', color: LOGO + 'seg-logo_sign.png' };
const MARK_RATIO = 262 / 256;
const { NAVY, CYAN } = require('./brand-tokens.js').legacy;

// HTML signature (for the HTML/CSS generators). `h` = mark height in px; `onLight` = navy version.
function signHTML(h, { onLight = false, style = '' } = {}) {
  const c = onLight ? NAVY : '#FFFFFF';
  return `<div class="seg-sign" style="display:flex;align-items:center;gap:${Math.round(h * 0.32)}px;direction:ltr;line-height:1;${style}">`
    + `<img src="${onLight ? MARK.navy : MARK.white}" alt="" style="display:block;height:${h}px;width:auto">`
    + `<span style="display:flex;flex-direction:column;gap:${Math.round(h * 0.06)}px">`
    + `<b style="font:800 ${Math.round(h * 0.6)}px/1 Inter,sans-serif;letter-spacing:.14em;color:${c}">SEG</b>`
    + `<i style="font:600 ${Math.round(h * 0.27)}px/1 Inter,sans-serif;font-style:normal;letter-spacing:.12em;color:${c};opacity:.72">BY MFT</i>`
    + `</span></div>`;
}

// Canvas signature (for the canvas generators). Runs inside page.evaluate: pass SIGN_CANVAS_SRC and eval it,
// or copy the same proportions. Kept as a string so both worlds share one definition.
const SIGN_CANVAS_SRC = `async function drawSign(g, img, x, y, h, onLight, rtlEnd) {
  const c = onLight ? '${NAVY}' : '#FFFFFF', mw = h * img.width / img.height, gap = h * 0.32;
  g.save(); g.direction = 'ltr'; g.textAlign = 'left'; g.textBaseline = 'alphabetic';
  g.font = '800 ' + (h * 0.6) + 'px "Inter"'; g.letterSpacing = (h * 0.084) + 'px';
  const ww = g.measureText('SEG').width;
  const total = mw + gap + ww;
  const x0 = rtlEnd ? x - total : x;
  g.drawImage(img, x0, y - h, mw, h);
  g.fillStyle = c; g.fillText('SEG', x0 + mw + gap, y - h * 0.47);
  g.font = '600 ' + (h * 0.27) + 'px "Inter"'; g.letterSpacing = (h * 0.032) + 'px'; g.globalAlpha = .72;
  g.fillText('BY MFT', x0 + mw + gap, y - h * 0.1);
  g.restore();
  return total;
}`;

module.exports = { CLOSE, COPY, FORBIDDEN, MARK, MARK_FILES, MARK_RATIO, signHTML, SIGN_CANVAS_SRC, words, parts, DAYS_AR, DAYS_EN, MONTHS_AR, MONTHS_EN, founding };
