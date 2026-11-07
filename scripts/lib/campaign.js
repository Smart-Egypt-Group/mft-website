// November 2026 campaign kit, shared by every design generator (quality pass, 6 Nov 2026).
//
// One source for three things every asset must agree on:
//   1. the close date in words, from src/site.config.js → founding.closesAt (change it there only)
//   2. the campaign copy: scarcity = a closing window + selectivity. No seat numbers, no counts, no numeric
//      price or discount, no «مدى الحياة» (it belongs in the acceptance letter, not on an ad)
//   3. the signature (CEO decision, 6 Nov 2026; logo direction A approved 7 Nov): the SEG lockup (A's cube + «Standard Enterprise /
//      Governance», marketing/brand/assets/logo/official/, built by scripts/seg-logo-vector.js) | a hairline
//      divider | the full MFT logo (eagle + MODERN FINTECH: src/assets/logo/mft-lockup-*.png, cut from the
//      official 5906 px pack). One endorsed unit, SEG first, never mirrored in RTL layouts. H = the cube's
//      height; divider H/φ; MFT logo H/φ; gaps H/φ². Minimum H = 55 px on a 1080 px design, so the
//      name's capitals stay ≥ 10 px. Navy ink on light backgrounds, white on dark (the cube's dark blue is
//      ≈1.3:1 on navy). Compact variant (cube + MFT logo, no name) only where the name cannot reach
//      10 px (strip covers 1128×191 etc.). The MFT mark alone (mft-mark-*) stays for MFT's own company profiles.
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
  [/\d+\s*شركة\s*(كحد|بحد|فقط|بس)|(كحد|بحد)\s*أقصى\s*\d+\s*(شركة|عضو|مقعد)|السقف\s*\d+|\b\d+\s*companies\s*(max|only)|ليه\s*\d+\s*شركة/i, 'member cap number (no cap of any kind)'],
  [/مدى الحياة|for life/i, '«for life» is for the acceptance letter, not designs'],
  [/50%\s*(off|مدى|خصم)|خصم\s*50|50٪/, 'numeric discount on a design']
];

// ---- the signature ----
const b64 = (f) => fs.readFileSync(path.join(ROOT, f)).toString('base64');
const LOGO = 'marketing/brand/assets/logo/';
const OFFICIAL = LOGO + 'official/';
const uri = (f) => 'data:image/png;base64,' + b64(f);
// navy key = for light backgrounds, white key = for dark backgrounds (names kept for the generators)
const MARK = {
  navy: uri(OFFICIAL + 'seg-lockup-official_two-light.png'), white: uri(OFFICIAL + 'seg-lockup-official_two-dark.png'),
  mftNavy: uri('src/assets/logo/mft-lockup-navy.png'), mftWhite: uri('src/assets/logo/mft-lockup-white.png'),
  // the cube alone (compact signature, app-bar mocks): direction A; on dark its lifted ramp (≥ 3:1 on navy)
  cubeColor: uri(OFFICIAL + 'seg-cube-official_color.png'), cubeWhite: uri(OFFICIAL + 'seg-cube-official_color-on-dark.png')
};
const MARK_FILES = { segLight: OFFICIAL + 'seg-lockup-official_two-light.png', segDark: OFFICIAL + 'seg-lockup-official_two-dark.png', mftNavy: 'src/assets/logo/mft-lockup-navy.png', mftWhite: 'src/assets/logo/mft-lockup-white.png' };
// φ proportions (CEO, 7 Nov 2026): divider and MFT logo = H/φ, gaps = H/φ², minimum H = 55 (Fibonacci)
const { PHI } = require('./brand-tokens.js').phi;
const SIGN = { segRatio: 1940 / 512, mftRatio: 2000 / 683, minH: 55, gap: 1 / (PHI * PHI), div: 1 / PHI, mft: 1 / PHI };
const MARK_RATIO = SIGN.segRatio;
const { NAVY, CYAN } = require('./brand-tokens.js').legacy;

// HTML signature. `h` = the cube's height in px (raised to SIGN.minH); `onLight` = navy ink.
function signHTML(h, { onLight = false, style = '' } = {}) {
  const H = Math.max(h, SIGN.minH), c = onLight ? NAVY : '#FFFFFF', r = Math.round;
  return `<div class="seg-sign" style="display:flex;align-items:center;gap:${r(H * SIGN.gap)}px;direction:ltr;line-height:0;${style}">`
    + `<img src="${onLight ? MARK.navy : MARK.white}" alt="Standard Enterprise Governance" style="display:block;height:${H}px;width:auto">`
    + `<i style="display:block;width:${Math.max(1, r(H * 0.02))}px;height:${r(H * SIGN.div)}px;background:${c};opacity:.32"></i>`
    + `<img src="${onLight ? MARK.mftNavy : MARK.mftWhite}" alt="Modern Fintech" style="display:block;height:${r(H * SIGN.mft)}px;width:auto">`
    + `</div>`;
}

// Canvas signature: runs inside page.evaluate (eval SIGN_CANVAS_SRC). imgs = { seg, mft } loaded images;
// (x, y) = start and bottom of the unit; rtlEnd = x is the right end. Returns the unit's width.
// compact = the small-space variant (strip covers): cube alone + MFT logo, no name, no minimum size;
// used only where the name could not reach legible size (imgs.cube must be loaded).
const SIGN_CANVAS_SRC = `async function drawSign(g, imgs, x, y, h, onLight, rtlEnd, compact) {
  const S = ${JSON.stringify(SIGN)}, H = compact ? h : Math.max(h, S.minH);
  if (compact) imgs = { seg: imgs.cube, mft: imgs.mft };
  const segW = H * imgs.seg.width / imgs.seg.height, mftH = H * S.mft, mftW = mftH * imgs.mft.width / imgs.mft.height;
  const gap = H * S.gap, dw = Math.max(1, H * 0.02), total = segW + gap + dw + gap + mftW;
  const x0 = rtlEnd ? x - total : x, top = y - H;
  g.save();
  g.drawImage(imgs.seg, x0, top, segW, H);
  g.globalAlpha = .32; g.fillStyle = onLight ? '${NAVY}' : '#FFFFFF'; g.fillRect(x0 + segW + gap, top + H * (1 - S.div) / 2, dw, H * S.div); g.globalAlpha = 1;
  g.drawImage(imgs.mft, x0 + segW + gap + dw + gap, top + (H - mftH) / 2, mftW, mftH);
  g.restore();
  return total;
}`;

module.exports = { CLOSE, COPY, FORBIDDEN, MARK, MARK_FILES, MARK_RATIO, SIGN, signHTML, SIGN_CANVAS_SRC, words, parts, DAYS_AR, DAYS_EN, MONTHS_AR, MONTHS_EN, founding };
