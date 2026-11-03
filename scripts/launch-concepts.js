#!/usr/bin/env node
// SEG Audit launch: creative concepts (CEO creative direction, 3 Nov 2026), rendered into
// marketing/designs/concepts/. The standard placement set stays in scripts/launch-images.js.
//
// Same system: navy #0D1B3E, cyan #1BB7CD, brilliant pure white, no gold, golden ratio, small MFT
// mark. Bold here means scale, contrast and one idea per frame, never noise: every concept states a
// fact the site already publishes (read-only, evidence behind every finding, automated tests before
// every update, the seat count) so the attention it earns reinforces trust.
//
//   hook-360        pattern interrupt: «مين بيراجع دفاترك باقي 360 يوم؟» over a 365-day calendar
//                   in which only one working week is lit
//   self-audit      "the platform that audits itself": a golden spiral of reports, each one checked
//                   by the next, converging on one cyan point
//   before-after    a dark, unreviewed ledger turns into a brilliant-white report at the scan line,
//                   with the one exception in cyan
//   no-source       zero guesswork: a number with no source is struck through and never reaches
//                   the report
//   hemicycle       scarcity + proof: 50 seats as a hemicycle, 17 lit, the next one cyan,
//                   «باقي 33 من 50 · 17 شركة انضمّت»
//   carousel        «5 أخطاء في دفاترك مش هتلاحظها», 7 slides 4:5, plus a PDF for LinkedIn
//   video-*         storyboard frames 1080×1920 for two short videos (3-second hook first) and a
//                   storyboard sheet per video
//   founder-pov     a transparent overlay for the founder's own footage + a mock frame
//
// Seat numbers: src/site.config.js → founding. Test count: src/content/platform-facts.js.
// Needs Playwright + Google Chrome:  PLAYWRIGHT_PATH=<path to playwright> node scripts/launch-concepts.js [filter]
const fs = require('fs');
const path = require('path');

let chromium;
try { ({ chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright')); }
catch { console.error('playwright not found. npm i -D playwright, or set PLAYWRIGHT_PATH.'); process.exit(1); }

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'marketing/designs/concepts');
const b64 = (f) => fs.readFileSync(path.join(ROOT, f)).toString('base64');
const MARK = { navy: 'data:image/png;base64,' + b64('src/assets/logo/mft-mark-navy.png'), white: 'data:image/png;base64,' + b64('src/assets/logo/mft-mark-white.png') };
const INTER = b64('src/assets/fonts/inter-latin-var.woff2');
const CAIRO = b64('src/assets/fonts/cairo-arabic-var.woff2');
const { founding: FM } = require('../src/site.config.js');
const FACTS = require('../src/content/platform-facts.js');
const LEFT = FM.total - FM.filled;
const TESTS = FACTS.testsFloor.toLocaleString('en-US');

const NAVY = '#0D1B3E', CYAN = '#1BB7CD', W = '#FFFFFF';
const DIM = 'rgba(255,255,255,.78)', DIM2 = 'rgba(255,255,255,.55)';
const PHI = (1 + Math.sqrt(5)) / 2;
const f = (n) => +(+n).toFixed(1);
function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

// ---------------------------------------------------------------- copy
const T = {
  ar: {
    hook: { l1: 'مين بيراجع دفاترك', s1: 'مين بيراجع', s2: 'دفاترك باقي', pre: 'باقي', post: 'يوم؟', cap: 'مراجعة سنوية واحدة. والسنة 365 يومًا.' },
    self: { eb: 'SEG Audit · الثقة', head: 'المنصة التي تراجع نفسها.', sub: `قبل أن تراجع دفاترك: أكثر من ${TESTS} اختبار آلي قبل كل تحديث، وسجل لا يُعدَّل بصمت.` },
    ba: { before: 'قبل', after: 'بعد', head: 'من دفاتر لا يراها أحد، إلى تقرير تراه كاملًا.' },
    ns: { eb: 'SEG Audit · صفر تخمين', head: 'رقم بلا مصدر؟ لا يدخل تقريرك.', sub: 'كل رقم في تقارير SEG Audit مرتبط بمصدره في دفاترك.', tag: 'بلا مصدر', note: 'مثال توضيحي' },
    hemi: { eb: 'SEG Audit · الأعضاء المؤسِّسون', title: `باقي ${LEFT} من ${FM.total} · ${FM.filled} شركة انضمّت`, t1: `باقي ${LEFT} من ${FM.total}`, t2: `${FM.filled} شركة انضمّت`, sub: 'احجز مقعدك قبل اكتمال العدد.', cap: 'مقعدًا متبقيًا', pill: 'احجز مقعدك  ·  app.seg-audit.com' },
    car: {
      cover: { l1: 'أخطاء في دفاترك', l2: 'مش هتلاحظها', sub: 'إلا لو حد بيراجعها كل يوم.', swipe: 'اسحب  ←' },
      items: [
        { t: 'نفس الفاتورة اتدفعت مرتين', d: 'مرجعين مختلفين، ونفس المبلغ ونفس المورد.' },
        { t: 'مورد واحد باسمين', d: 'كودين مختلفين، ورقم ضريبي واحد.' },
        { t: 'قيد بعد إقفال الفترة', d: 'الفترة مقفولة في التقرير، ومفتوحة في الدفاتر.' },
        { t: 'فاتورة مورد من غير أمر شراء', d: 'الصرف حصل، والموافقة مش موجودة.' },
        { t: 'نفس الشخص بيعمل الدفعة ويعتمدها', d: 'الصلاحية موجودة، والفصل بين المهام لأ.' }
      ],
      foot: 'SEG Audit يرصدها، ومعها دليلها.',
      end: { head: 'SEG Audit بيراجع دفاترك كل يوم.', line: `باقي ${LEFT} من ${FM.total} · ${FM.filled} شركة انضمّت`, pill: 'احجز مقعدك  ·  app.seg-audit.com' }
    },
    vid: { a2: 'مراجعة سنوية واحدة. والسنة 365 يومًا.', a3: 'SEG Audit بيقرا دفاترك كل يوم.', a4: 'وكل ملاحظة معاها دليلها.', b1: 'دفاترك شكلها كده؟', b2: 'SEG Audit بيراجع…', b3: 'ملاحظة حرجة واحدة. ومعها مصدرها.' },
    pov: { hook: 'ليه 50 شركة بس؟', name: 'أحمد أشرف', role: 'المؤسس والرئيس التنفيذي، MFT', pill: `باقي ${LEFT} من ${FM.total}`, ph: 'لقطة المؤسس هنا (POV)' }
  },
  en: {
    hook: { l1: 'Who reviews your books', s1: 'Who reviews your', s2: 'books the other', pre: 'the other', post: 'days?', cap: 'One annual audit. A year has 365 days.' },
    self: { eb: 'SEG AUDIT · TRUST', head: 'The platform that audits itself.', sub: `Before it reviews your books: ${TESTS}+ automated tests before every update, and a log nothing can change silently.` },
    ba: { before: 'Before', after: 'After', head: 'From books no one sees to a report you see in full.' },
    ns: { eb: 'SEG AUDIT · ZERO GUESSWORK', head: 'A number with no source never reaches your report.', sub: 'Every number in a SEG Audit report links to its source in your books.', tag: 'No source', note: 'Illustrative example' },
    hemi: { eb: 'SEG AUDIT · FOUNDING MEMBERS', title: `${LEFT} of ${FM.total} left · ${FM.filled} companies joined`, t1: `${LEFT} of ${FM.total} left`, t2: `${FM.filled} companies joined`, sub: 'Claim your seat before the count closes.', cap: 'seats left', pill: 'Claim your seat  ·  app.seg-audit.com' },
    car: {
      cover: { l1: 'mistakes in your books', l2: "you won't notice", sub: 'Unless someone reviews them every day.', swipe: 'Swipe  →' },
      items: [
        { t: 'The same invoice, paid twice', d: 'Two references, the same amount, the same supplier.' },
        { t: 'One supplier, two names', d: 'Two supplier codes, one tax ID.' },
        { t: 'An entry after period close', d: 'Closed in the report, still open in the books.' },
        { t: 'A supplier invoice with no PO', d: 'The payment went out; the approval never existed.' },
        { t: 'One person creates and approves', d: 'The access is there; the segregation of duties is not.' }
      ],
      foot: 'SEG Audit flags it, with its evidence.',
      end: { head: 'SEG Audit reviews your books every day.', line: `${LEFT} of ${FM.total} left · ${FM.filled} companies joined`, pill: 'Claim your seat  ·  app.seg-audit.com' }
    },
    vid: { a2: 'One annual audit. A year has 365 days.', a3: 'SEG Audit reads your books every day.', a4: 'And every finding comes with its evidence.', b1: 'Do your books look like this?', b2: 'SEG Audit is reviewing…', b3: 'One critical finding. With its source.' },
    pov: { hook: 'Why only 50 companies?', name: 'Ahmed Ashraf', role: 'Founder & CEO, MFT', pill: `${LEFT} of ${FM.total} left`, ph: 'Founder footage here (POV)' }
  }
};

// ---------------------------------------------------------------- frame + primitives
// A design = { w, h, svg (shapes only), ops (type, marks, images, drawn on the canvas after) }.
function design(w, h, u) {
  const R = `filterUnits="userSpaceOnUse" x="${-w}" y="${-h}" width="${w * 3}" height="${h * 3}"`;
  const defs = `
<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="4" stitchTiles="stitch"/><feColorMatrix type="matrix" values=".33 .33 .33 0 0  .33 .33 .33 0 0  .33 .33 .33 0 0  0 0 0 0 1"/></filter>
<filter id="glow" ${R}><feGaussianBlur stdDeviation="${f(5 * u)}" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="glowW" ${R}><feGaussianBlur stdDeviation="${f(6 * u)}" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="bloom" ${R}><feGaussianBlur in="SourceGraphic" stdDeviation="${f(4 * u)}" result="b1"/><feGaussianBlur in="SourceGraphic" stdDeviation="${f(14 * u)}" result="b2"/><feGaussianBlur in="SourceGraphic" stdDeviation="${f(34 * u)}" result="b3"/><feMerge><feMergeNode in="b3"/><feMergeNode in="b3"/><feMergeNode in="b2"/><feMergeNode in="b2"/><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="b10" ${R}><feGaussianBlur stdDeviation="${f(10 * u)}"/></filter>
<filter id="b40" ${R}><feGaussianBlur stdDeviation="${f(40 * u)}"/></filter>
<filter id="b100" ${R}><feGaussianBlur stdDeviation="${f(100 * u)}"/></filter>`;
  return { w, h, u, defs, svg: '', ops: [], alpha: false };
}
const svgOf = (d) => `<svg xmlns="http://www.w3.org/2000/svg" width="${d.w}" height="${d.h}" viewBox="0 0 ${d.w} ${d.h}"><defs>${d.defs}</defs>${d.svg}</svg>`;
let gid = 0;
// navy field with the radial light the blog uses; `dark` deepens it (the "before" state)
function navyField(d, x, y, w, h, cx, cy, o = {}) {
  const id = 'bg' + (++gid), R = Math.max(w, h) * (o.r || 0.8);
  d.defs += `<radialGradient id="${id}" gradientUnits="userSpaceOnUse" cx="${f(cx)}" cy="${f(cy)}" r="${f(R)}"><stop offset="0" stop-color="${o.dark ? '#0E2150' : '#16326E'}"/><stop offset=".5" stop-color="${o.dark ? '#0A1534' : NAVY}"/><stop offset="1" stop-color="#050B20"/></radialGradient>`;
  d.svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${id})"/>`;
  d.svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" filter="url(#grain)" opacity=".05" style="mix-blend-mode:overlay"/>`;
}
const light = (d, cx, cy, r, o = 0.3) => { d.svg += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="${CYAN}" opacity="${o * 0.8}" filter="url(#b100)"/><circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r * 0.6)}" fill="${W}" opacity="${o}" filter="url(#b100)"/>`; };
const rect = (x, y, w, h, fill, o = {}) => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${f(o.r ?? 0)}" fill="${fill}"${o.op != null ? ` opacity="${o.op}"` : ''}${o.stroke ? ` stroke="${o.stroke}" stroke-width="${f(o.sw || 2)}"${o.so != null ? ` stroke-opacity="${o.so}"` : ''}${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}` : ''}${o.filter ? ` filter="url(#${o.filter})"` : ''}${o.tr ? ` transform="${o.tr}"` : ''}/>`;
const bar = (x, y, w, h, fill, op = 1) => rect(x, y - h / 2, w, h, fill, { r: h / 2, op });
const circ = (cx, cy, r, fill, o = {}) => `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="${fill}"${o.op != null ? ` opacity="${o.op}"` : ''}${o.stroke ? ` stroke="${o.stroke}" stroke-width="${f(o.sw || 2)}"${o.so != null ? ` stroke-opacity="${o.so}"` : ''}${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}` : ''}${o.filter ? ` filter="url(#${o.filter})"` : ''}/>`;
const tick = (cx, cy, s, c = W, sw = 2.6) => `<path d="M${f(cx - s)} ${f(cy)} L${f(cx - s / 3)} ${f(cy + s * .7)} L${f(cx + s)} ${f(cy - s * .6)}" fill="none" stroke="${c}" stroke-width="${f(sw)}" stroke-linecap="round" stroke-linejoin="round"/>`;
const cyanCheck = (cx, cy, r, u) => `<g filter="url(#glow)">${circ(cx, cy, r, CYAN)}</g>` + tick(cx, cy, r * .45, W, Math.max(1.4, r * .16));
// canvas ops
const text = (d, o) => d.ops.push({ type: 'text', wt: 800, c: W, al: 'left', ...o });
const runs = (d, o) => d.ops.push({ type: 'runs', al: 'left', ...o });
const pill = (d, o) => d.ops.push({ type: 'pill', bg: CYAN, fg: NAVY, ...o });
const mark = (d, x, y, h, white = true) => d.ops.push({ type: 'mark', x, y, h, white });
// start-aligned anchor for a box: right edge in Arabic, left edge in English
const st = (lang, x0, x1) => (lang === 'ar' ? { x: x1, al: 'right' } : { x: x0, al: 'left' });
const en = (lang, x0, x1) => (lang === 'ar' ? { x: x0, al: 'left' } : { x: x1, al: 'right' });

// ---------------------------------------------------------------- shared motifs
// Year calendar: 53 weeks × 7 days (or any cols × rows); `lit` days in white, `wave` days in cyan.
function calendar(d, x, y, w, h, o = {}) {
  const cols = o.cols || 53, rows = o.rows || 7, n = 365;
  const sp = Math.min(w / cols, h / rows), r = sp * (o.k || 0.34);
  const x0 = x + (w - sp * cols) / 2 + sp / 2, y0 = y + (h - sp * rows) / 2 + sp / 2;
  const lit = new Set(o.lit || []);
  let s = '', g = '';
  for (let i = 0; i < n; i++) {
    const c = o.byRow ? i % cols : Math.floor(i / rows), rr = o.byRow ? Math.floor(i / cols) : i % rows;
    const cx = x0 + c * sp, cy = y0 + rr * sp;
    if (lit.has(i)) g += circ(cx, cy, r * 1.05, W);
    else if (o.wave != null && i < o.wave) s += circ(cx, cy, r, CYAN, { op: Math.min(1, 0.55 + (i / o.wave) * 0.45) });
    else s += circ(cx, cy, r - 0.75 * d.u, 'none', { stroke: W, sw: 1.5 * d.u, so: 0.28 });
  }
  d.svg += s + `<g filter="url(#glowW)">${g}</g>`;
  if (o.wave != null && o.wave < n) { // the reading front glows
    const i = o.wave, c = o.byRow ? i % cols : Math.floor(i / rows), rr = o.byRow ? Math.floor(i / cols) : i % rows;
    d.svg += `<g filter="url(#bloom)">${circ(x0 + c * sp, y0 + rr * sp, r * 1.15, W)}</g>`;
  }
  return { sp, r };
}

// Hemicycle of seats (parliament layout). Seats fill from the reading start: right in Arabic.
function hemicycle(d, cx, cy, R0, R1, lang, o = {}) {
  const rows = 4, total = FM.total;
  const rs = [...Array(rows)].map((_, i) => R0 + (R1 - R0) * i / (rows - 1));
  const sum = rs.reduce((a, b) => a + b);
  const ns = rs.map((r) => Math.round(total * r / sum)); ns[rows - 1] += total - ns.reduce((a, b) => a + b);
  const seats = [];
  rs.forEach((r, i) => { for (let j = 0; j < ns[i]; j++) { const th = Math.PI - j * Math.PI / (ns[i] - 1); seats.push({ x: cx + r * Math.cos(th), y: cy - r * Math.sin(th), th, row: i }); } });
  seats.sort((a, b) => (lang === 'ar' ? a.th - b.th : b.th - a.th) || a.row - b.row);
  const sr = Math.min((R1 - R0) / (rows - 1), Math.PI * R0 / (ns[0] - 1)) * 0.38;
  let open = '', filled = '';
  seats.forEach((p, i) => {
    if (i < FM.filled) filled += circ(p.x, p.y, sr, W);
    else if (i > FM.filled) open += circ(p.x, p.y, sr - d.u, 'none', { stroke: W, sw: 2 * d.u, so: 0.34 });
  });
  const nx = seats[FM.filled];
  d.svg += `<path d="M${f(cx - R1 - sr * 3)} ${f(cy + sr * 2.2)} L${f(cx + R1 + sr * 3)} ${f(cy + sr * 2.2)}" stroke="${CYAN}" stroke-opacity=".5" stroke-width="${f(1.5 * d.u)}"/>`;
  d.svg += open + `<g filter="url(#glowW)">${filled}</g>`;
  d.svg += `<g filter="url(#glow)">${circ(nx.x, nx.y, sr * 1.05, CYAN)}</g>` + circ(nx.x, nx.y, sr * 1.55, 'none', { stroke: CYAN, sw: 2 * d.u }) + circ(nx.x, nx.y, sr * 2.2, 'none', { stroke: CYAN, sw: 1.5 * d.u, so: 0.35 });
}

// Golden spiral of report cards; each card carries a cyan check: reviewed by the next one.
function spiral(d, x, y, w, h, levels = 9) {
  const u = d.u, sq = [];
  let dir = 0;
  for (let i = 0; i < levels; i++) {
    let s;
    if (dir === 0) { s = h; sq.push({ x, y, s, dir }); x += s; w -= s; }
    else if (dir === 1) { s = w; sq.push({ x, y, s, dir }); y += s; h -= s; }
    else if (dir === 2) { s = h; sq.push({ x: x + w - s, y, s, dir }); w -= s; }
    else { s = w; sq.push({ x, y: y + h - s, s, dir }); h -= s; }
    dir = (dir + 1) % 4;
  }
  const end = { x: x + w / 2, y: y + h / 2 };
  let cards = '', checks = '', arc = '';
  sq.forEach((q, i) => {
    const g = Math.max(1.5 * u, q.s * 0.03), cx = q.x + g, cy = q.y + g, cs = q.s - 2 * g;
    cards += rect(cx, cy, cs, cs, W, { r: Math.max(2, cs * 0.035) });
    if (cs > 46 * u) {
      const hb = cs * 0.15;
      cards += `<path d="M${f(cx)} ${f(cy + hb)} V${f(cy + cs * 0.035)} a${f(cs * 0.035)} ${f(cs * 0.035)} 0 0 1 ${f(cs * 0.035)} ${f(-cs * 0.035)} H${f(cx + cs - cs * 0.035)} a${f(cs * 0.035)} ${f(cs * 0.035)} 0 0 1 ${f(cs * 0.035)} ${f(cs * 0.035)} V${f(cy + hb)} Z" fill="${NAVY}"/>`;
      cards += bar(cx + cs * 0.08, cy + hb / 2, cs * 0.34, Math.max(2, cs * 0.03), W, 0.9);
      const rows = cs > 160 * u ? 5 : 3;
      for (let k = 0; k < rows; k++) {
        const yy = cy + hb + cs * 0.14 + k * (cs * 0.62 / rows);
        cards += bar(cx + cs * 0.08, yy, cs * [0.62, 0.44, 0.7, 0.5, 0.58][k], Math.max(2, cs * 0.028), NAVY, 0.78);
      }
      checks += cyanCheck(cx + cs - cs * 0.1, cy + hb / 2, Math.max(4 * u, cs * 0.055), u);
    } else checks += circ(cx + cs / 2, cy + cs / 2, Math.max(1.5, cs * 0.12), CYAN, { op: 0.9 });
    // quarter arc of the spiral through this square
    const s = q.s, a = [[q.x, q.y + s, q.x + s, q.y], [q.x, q.y, q.x + s, q.y + s], [q.x + s, q.y, q.x, q.y + s], [q.x + s, q.y + s, q.x, q.y]][q.dir];
    arc += `${i ? 'L' : 'M'}${f(a[0])} ${f(a[1])} A${f(s)} ${f(s)} 0 0 1 ${f(a[2])} ${f(a[3])} `;
  });
  d.svg += `<g filter="url(#glowW)">${cards}</g>` + cards;
  d.svg += `<path d="${arc}" fill="none" stroke="${CYAN}" stroke-width="${f(2.2 * u)}" stroke-opacity=".9" filter="url(#glow)"/>`;
  d.svg += checks;
  d.svg += `<g filter="url(#bloom)">${circ(end.x, end.y, 5 * u, W)}</g>` + circ(end.x, end.y, 11 * u, 'none', { stroke: CYAN, sw: 2 * u });
}

// The unreviewed ledger: rows tilted, offset and overlapping; amounts drawn as dim tilted digits.
const AMOUNTS = ['48,210', '312,940', '18,400', '96,500', '7,250', '133,080', '18,400', '2,904', '61,775', '410,020', '5,600', '27,318'];
function messy(d, x, y, w, h, seed, o = {}) {
  const u = d.u, r = rng(seed), n = o.rows || 14, px = o.px || 22 * u;
  let s = '';
  for (let i = 0; i < n; i++) {
    const cy = y + (i + 0.5) * h / n + (r() - 0.5) * h / n * 0.7, rot = (r() - 0.5) * 7;
    const x0 = x + (r() - 0.2) * w * 0.08, rowW = w * (0.86 + r() * 0.14), op = 0.22 + r() * 0.45;
    const cx = x0 + rowW / 2;
    let g = bar(x0, cy, rowW * 0.12, 12 * u, W, op * 0.8) + bar(x0 + rowW * 0.17, cy, rowW * (0.25 + r() * 0.3), 9 * u, W, op);
    if (r() < 0.28) g += `<path d="M${f(x0 + rowW * 0.15)} ${f(cy + 8 * u)} q ${f(rowW * 0.1)} ${f(-22 * u)} ${f(rowW * 0.22)} ${f(-2 * u)} t ${f(rowW * 0.2)} ${f(-6 * u)}" fill="none" stroke="${W}" stroke-opacity="${op * 0.8}" stroke-width="${f(2 * u)}"/>`;
    if (r() < 0.22) g += rect(x0 + rowW * 0.6, cy - 14 * u, rowW * 0.16, 28 * u, 'none', { r: 6 * u, stroke: W, sw: 1.5 * u, so: op, dash: `${f(4 * u)} ${f(4 * u)}` });
    s += `<g transform="rotate(${f(rot)} ${f(cx)} ${f(cy)})">${g}</g>`;
    if (r() < 0.3) s += `<g opacity=".35" transform="translate(${f((r() - 0.5) * 40 * u)} ${f(10 * u)}) rotate(${f(rot + (r() - 0.5) * 6)} ${f(cx)} ${f(cy)})">${g}</g>`;
    const ax = x0 + rowW * (0.55 + r() * 0.5), apx = px * (0.8 + r() * 0.5);
    text(d, { t: AMOUNTS[(i + seed) % AMOUNTS.length], x: ax, y: cy + apx * 0.35, px: apx, wt: 600, c: `rgba(255,255,255,${(op + 0.1).toFixed(2)})`, al: 'right', rot: rot * Math.PI / 180, rx: cx, ry: cy, dir: 'ltr' });
    if (r() < 0.16) text(d, { t: '?', x: x0 + rowW * 0.68, y: cy + px * 0.35, px: px * 1.1, c: `rgba(255,255,255,${op.toFixed(2)})`, al: 'center', dir: 'ltr' });
  }
  d.svg += s;
}

// The reviewed report: aligned rows, severity dots, source chips, one cyan exception row.
function report(d, x, y, w, h, lang, o = {}) {
  const u = d.u, n = o.rows || 6, hot = o.hot ?? 2, px = o.px || 26 * u;
  const M = (v) => (lang === 'ar' ? x + w - (v - x) : v); // mirror an x inside the box
  const rowH = (h - 70 * u) / n, head = 44 * u;
  let s = rect(x, y, w, head, NAVY, { r: 8 * u });
  s += bar(Math.min(M(x + 22 * u), M(x + 22 * u + w * 0.3)), y + head / 2, w * 0.3, 8 * u, W, 0.9);
  s += bar(Math.min(M(x + w * 0.62), M(x + w * 0.62 + w * 0.14)), y + head / 2, w * 0.14, 8 * u, W, 0.55);
  for (let i = 0; i < n; i++) {
    const cy = y + head + 26 * u + rowH * (i + 0.5), isHot = i === hot;
    if (isHot) s += rect(x - 10 * u, cy - rowH * 0.42, w + 20 * u, rowH * 0.84, CYAN, { r: 10 * u, op: 0.13 });
    const dx = M(x + 18 * u);
    s += isHot ? `<g filter="url(#glow)">${circ(dx, cy, 9 * u, CYAN)}</g>` : circ(dx, cy, 8 * u, NAVY, { op: [0.9, 0.55, 0.3][i % 3] });
    const lw = w * [0.34, 0.26, 0.3, 0.22, 0.32, 0.28][i % 6], lx = x + 42 * u;
    s += isHot ? `<g filter="url(#glow)">${bar(Math.min(M(lx), M(lx + lw)), cy, lw, 9 * u, CYAN)}</g>` : bar(Math.min(M(lx), M(lx + lw)), cy, lw, 8 * u, NAVY, 0.85);
    // source chip: a tiny document mark, always present (that is the point)
    const cxp = x + w - 46 * u, cw = 30 * u, chh = 34 * u;
    const chx = Math.min(M(cxp), M(cxp + cw));
    s += rect(chx, cy - chh / 2, cw, chh, isHot ? CYAN : 'none', { r: 4 * u, stroke: isHot ? CYAN : NAVY, sw: 1.8 * u, so: 0.8 });
    s += bar(chx + 7 * u, cy - 6 * u, cw - 14 * u, 3 * u, isHot ? W : NAVY, 0.8) + bar(chx + 7 * u, cy + 2 * u, (cw - 14 * u) * 0.6, 3 * u, isHot ? W : NAVY, 0.8);
    const ax = lang === 'ar' ? x + 64 * u : x + w - 64 * u;
    text(d, { t: AMOUNTS[i + 1], x: ax, y: cy + px * 0.36, px, wt: 700, c: NAVY, al: lang === 'ar' ? 'left' : 'right', dir: 'ltr' });
    if (!isHot) s += `<g opacity=".6">${tick(M(x + w * 0.5), cy, 6 * u, NAVY, 2 * u)}</g>`;
  }
  d.svg += s;
}

// ---------------------------------------------------------------- concepts
// Every builder returns a design for (w, h, lang). Kinds: square 1080², portrait 1080×1350,
// story 1080×1920 (safe 250..1440, end margin 150), link 1200×630.
const kindOf = (w, h) => (w > h ? 'link' : h / w > 1.6 ? 'story' : h / w > 1.15 ? 'portrait' : 'square');
const CTA = 'app.seg-audit.com';

function hook360(w, h, lang, o = {}) {
  const k = kindOf(w, h), u = k === 'link' ? h / 630 : w / 1080, d = design(w, h, u), C = T[lang].hook, A = lang === 'ar';
  navyField(d, 0, 0, w, h, w * 0.5, h * 0.42);
  const lit = [35, 36, 37, 38, 39]; // one working week in January (Sun–Thu), the annual audit
  if (k === 'link') {
    light(d, w * 0.62, 330, 300 * u, 0.22);
    const a = st(lang, 70, 1130);
    text(d, { t: C.l1, ...a, y: 128, px: 62, maxW: 1060, fit: true });
    runs(d, { ...a, y: 400, dir: A ? 'rtl' : 'ltr', gap: 22, maxW: 1060, items: [{ t: C.pre, px: 62 }, { t: '360', px: 250, c: CYAN, glow: CYAN, wt: 900 }, { t: C.post, px: 62 }] });
    calendar(d, 70, 470, 1060, 125, { lit });
    mark(d, 70, 54, 26, true);
    return d;
  }
  const S = k === 'story' ? { m: 96, eb: 300, l1: 470, l2: 615, num: 1075, numPx: 540, post: 1215, cal: [1260, 125], cap: 1440 }
    : k === 'portrait' ? { m: 90, eb: 150, l1: 300, l2: 420, num: 860, numPx: 460, post: 0, cal: [935, 125], cap: 1130 }
    : { m: 90, eb: 110, l1: 230, l2: 0, num: 650, numPx: 380, post: 0, cal: [715, 120], cap: 890 };
  light(d, w / 2, S.num - S.numPx * 0.35, 380 * u, 0.24);
  const a = st(lang, S.m, w - S.m), pxL = (k === 'story' ? 128 : k === 'portrait' ? 104 : 96) * u;
  text(d, { t: 'SEG Audit', ...a, y: S.eb, px: 30 * u, wt: 800, c: CYAN, ls: 3 * u });
  if (k === 'story') {
    text(d, { t: C.s1, ...a, y: S.l1, px: pxL, maxW: w - 2 * S.m, fit: true });
    text(d, { t: C.s2, ...a, y: S.l2, px: pxL, maxW: w - 2 * S.m, fit: true });
    text(d, { t: '360', ...a, y: S.num, px: S.numPx * u, wt: 900, c: CYAN, glow: CYAN, dir: 'ltr', maxW: w - 2 * S.m, fit: true });
    text(d, { t: C.post, ...a, y: S.post, px: pxL });
  } else {
    if (k === 'portrait') { text(d, { t: C.s1, ...a, y: S.l1, px: pxL, maxW: w - 2 * S.m, fit: true }); text(d, { t: C.s2, ...a, y: S.l2, px: pxL, maxW: w - 2 * S.m, fit: true }); }
    else text(d, { t: C.l1, ...a, y: S.l1, px: pxL, maxW: w - 2 * S.m, fit: true });
    runs(d, { ...a, y: S.num, dir: A ? 'rtl' : 'ltr', gap: 24 * u, maxW: w - 2 * S.m, items: k === 'portrait' ? [{ t: '360', px: S.numPx * u, c: CYAN, glow: CYAN, wt: 900 }, { t: C.post, px: pxL }] : [{ t: C.pre, px: pxL }, { t: '360', px: S.numPx * u, c: CYAN, glow: CYAN, wt: 900 }, { t: C.post, px: pxL }] });
  }
  if (!o.noCal) {
    calendar(d, S.m, S.cal[0] * (k === 'square' ? 1 : 1), w - 2 * S.m, S.cal[1] * u, { lit });
    text(d, { t: C.cap, ...a, y: S.cap - (k === 'story' ? 60 : 0), px: 30 * u, wt: 600, c: DIM });
  }
  if (!o.frame) {
    const by = k === 'story' ? 1640 : h - 90 * u;
    mark(d, S.m, by + 14 * u, 32 * u, true);
    pill(d, { t: CTA, x: w - S.m, y: by - 34 * u, h: 64 * u, px: 26 * u, al: 'right', padX: 30 * u });
  }
  return d;
}

function selfAudit(w, h, lang) {
  const k = kindOf(w, h), u = k === 'link' ? h / 630 : w / 1080, d = design(w, h, u), C = T[lang].self;
  navyField(d, 0, 0, w, h, w * 0.5, h * 0.62);
  if (k === 'link') {
    const a = st(lang, 70, 520);
    light(d, 860, 320, 260, 0.2);
    text(d, { t: C.eb, ...a, y: 120, px: 20, c: CYAN, ls: 3 });
    text(d, { t: C.head, ...a, y: 190, px: 52, maxW: 450, wrap: true, lh: 1.2 });
    text(d, { t: C.sub, ...a, y: 360, px: 21, wt: 500, c: DIM, maxW: 440, wrap: true, lh: 1.55 });
    spiral(d, 590, 150, 540, 540 / PHI);
    mark(d, 70, 578, 26, true);
    return d;
  }
  const S = k === 'story' ? { m: 96, eb: 300, hd: 420, hpx: 92, sb: 640, box: 860 } : k === 'portrait' ? { m: 90, eb: 140, hd: 250, hpx: 84, sb: 450, box: 640 } : { m: 90, eb: 105, hd: 195, hpx: 70, sb: 325, box: 405 };
  const a = st(lang, S.m, w - S.m), bw = w - 2 * S.m, bh = bw / PHI;
  light(d, w / 2, S.box + bh / 2, 420 * u, 0.22);
  text(d, { t: C.eb, ...a, y: S.eb, px: 28 * u, c: CYAN, ls: 3 * u });
  text(d, { t: C.head, ...a, y: S.hd, px: S.hpx * u, maxW: bw, wrap: true, lh: 1.15 });
  text(d, { t: C.sub, ...a, y: S.sb, px: (k === 'story' ? 36 : 30) * u, wt: 500, c: DIM, maxW: bw * 0.96, wrap: true, lh: 1.55 });
  spiral(d, S.m, S.box, bw, bh);
  const by = k === 'story' ? 1640 : h - 48 * u;
  mark(d, S.m, by, 30 * u, true);
  text(d, { t: CTA, x: w - S.m, y: by - 6 * u, px: 26 * u, wt: 700, c: DIM, al: 'right', dir: 'ltr' });
  return d;
}

function beforeAfter(w, h, lang, o = {}) {
  const k = kindOf(w, h), u = k === 'link' ? h / 630 : w / 1080, d = design(w, h, u), C = T[lang].ba, A = lang === 'ar';
  const words = !o.neutral;
  if (k === 'link') {
    const sx = Math.round(w - w / PHI); // before 38.2% on the left, after 61.8%
    navyField(d, 0, 0, sx, h, sx * 0.5, h * 0.5, { dark: true });
    messy(d, 40, 70, sx - 80, h - 120, 7, { rows: 12, px: 18 });
    d.svg += rect(sx, 0, w - sx, h, W);
    report(d, sx + 70, 70, w - sx - 140, words ? 380 : 480, lang, { rows: 5, hot: 2, px: 22 });
    d.svg += `<g filter="url(#bloom)">${rect(sx - 2.5, 0, 5, h, W)}</g>` + rect(sx - 1, 0, 2, h, CYAN);
    if (words) {
      pill(d, { t: C.before, x: 40, y: 30, h: 40, px: 18, al: 'left', bg: 'rgba(255,255,255,.12)', fg: W, padX: 18 });
      pill(d, { t: C.after, x: sx + 70, y: 22, h: 40, px: 18, al: 'left', bg: NAVY, fg: W, padX: 18 });
      text(d, { t: C.head, ...st(lang, sx + 70, w - 70), y: 540, px: 30, c: NAVY, maxW: w - sx - 140, fit: true });
    }
    mark(d, 40, h - 34, 24, true);
    return d;
  }
  const sy = Math.round(h - h / PHI) - (k === 'story' ? 0 : 0), m = k === 'story' ? 96 : 80 * u;
  navyField(d, 0, 0, w, sy, w * 0.5, sy * 0.5, { dark: true });
  messy(d, m * 0.6, (k === 'story' ? 250 : 60) * u, w - m * 1.2, sy - (k === 'story' ? 300 : 110) * u, 11, { rows: k === 'story' ? 9 : 8, px: 24 * u });
  d.svg += rect(0, sy, w, h - sy, W);
  const repTop = sy + (k === 'story' ? 100 : 70) * u, repH = (k === 'story' ? 560 : k === 'portrait' ? 470 : 380) * u;
  report(d, m, repTop, w - 2 * m - (k === 'story' ? 54 * u : 0), repH, lang, { rows: k === 'square' ? 5 : 6, hot: 2, px: 26 * u });
  // the scan line: the moment of review
  d.svg += `<g filter="url(#bloom)">${rect(0, sy - 3 * u, w, 6 * u, W)}</g>` + rect(0, sy - 1 * u, w, 2 * u, CYAN);
  const r = rng(5); for (let i = 0; i < 26; i++) d.svg += circ(r() * w, sy - (6 + r() * 60) * u, (1 + r() * 2.4) * u, r() < 0.3 ? CYAN : W, { op: 0.3 + r() * 0.6, filter: 'glowW' });
  if (words) {
    const a = st(lang, m, w - m);
    pill(d, { t: C.before, x: a.x, y: (k === 'story' ? 180 : 24) * u, h: 48 * u, px: 22 * u, al: a.al, bg: 'rgba(255,255,255,.14)', fg: W, padX: 22 * u });
    pill(d, { t: C.after, x: a.x, y: sy + 26 * u, h: 48 * u, px: 22 * u, al: a.al, bg: NAVY, fg: W, padX: 22 * u });
    text(d, { t: C.head, ...a, y: repTop + repH + (k === 'story' ? 90 : 70) * u, px: (k === 'story' ? 50 : 34) * u, c: NAVY, maxW: w - 2 * m - (k === 'story' ? 54 * u : 0), wrap: k === 'story', fit: k !== 'story', lh: 1.25 });
  }
  mark(d, m, k === 'story' ? 1800 : h - 40 * u, 30 * u, false);
  return d;
}

function noSource(w, h, lang) {
  const k = kindOf(w, h), u = k === 'link' ? h / 630 : w / 1080, d = design(w, h, u), C = T[lang].ns, A = lang === 'ar';
  const rows = [['48,210', 'JE-1042'], ['1,250,000', null], ['312,940', 'INV-2291'], ['96,500', 'TB-2026-10']];
  // the page: a small ledger where the unsourced number is struck through
  const page = (x, y, w2, h2, s) => {
    const M = (v) => (A ? x + w2 - (v - x) : v);
    const rh = h2 / 4.6;
    rows.forEach(([amt, src], i) => {
      const hot = !src, cy = y + rh * (i + 0.5) + (i > 1 ? rh * 0.5 : i === 1 ? rh * 0.25 : 0);
      const px = (hot ? 64 : 38) * s;
      const lw = w2 * [0.26, 0.2, 0.3, 0.22][i];
      if (!hot) d.svg += bar(Math.min(M(x), M(x + lw)), cy - px * 0.33, lw, 9 * s, NAVY, 0.85); // the unsourced row has no label: nothing backs it
      const ax = A ? x + w2 * 0.34 : x + w2 * 0.66;
      text(d, { t: amt, x: ax, y: cy, px, wt: hot ? 900 : 700, c: hot ? 'rgba(13,27,62,.45)' : NAVY, al: A ? 'left' : 'right', dir: 'ltr', strike: hot ? CYAN : null });
      const cw = w2 * 0.27, chx = A ? x : x + w2 - cw, chy = cy - px * 0.33 - 22 * s;
      d.svg += rect(chx, chy, cw, 44 * s, 'none', { r: 22 * s, stroke: hot ? CYAN : NAVY, sw: 2 * s, so: hot ? 1 : 0.55, dash: hot ? `${f(6 * s)} ${f(6 * s)}` : null });
      text(d, { t: hot ? '?' : src, x: chx + cw / 2, y: chy + 30 * s, px: (hot ? 26 : 19) * s, wt: 700, c: hot ? '#0E7C8C' : NAVY, al: 'center', dir: 'ltr' });
      if (hot) pill(d, { t: C.tag, x: A ? x + w2 : x, y: cy + 24 * s, h: 40 * s, px: 20 * s, al: A ? 'right' : 'left', bg: CYAN, fg: NAVY, padX: 18 * s });
      if (i < rows.length - 1) d.svg += rect(x, cy + (hot ? 80 : 34) * s, w2, 1.5 * s, NAVY, { op: 0.12 });
    });
    text(d, { t: C.note, ...en(lang, x, x + w2), y: y + h2, px: 18 * s, wt: 600, c: '#5A6483' });
  };
  if (k === 'link') {
    const sx = Math.round(w - w / PHI);
    navyField(d, 0, 0, sx, h, sx * 0.4, h * 0.5);
    d.svg += rect(sx, 0, w - sx, h, W);
    const a = st(lang, 56, sx - 50);
    text(d, { t: C.eb, ...a, y: 110, px: 16, c: CYAN, ls: 2 });
    text(d, { t: C.head, ...a, y: 175, px: 38, maxW: sx - 106, wrap: true, lh: 1.22 });
    text(d, { t: C.sub, ...a, y: 390, px: 19, wt: 500, c: DIM, maxW: sx - 106, wrap: true, lh: 1.55 });
    page(sx + 60, 90, w - sx - 120, 470, 0.9);
    mark(d, 56, h - 40, 24, true);
    return d;
  }
  const sy = Math.round(h - h / PHI), m = (k === 'story' ? 96 : 90) * u;
  navyField(d, 0, 0, w, sy, w * 0.3, sy * 0.4);
  d.svg += rect(0, sy, w, h - sy, W) + `<g filter="url(#glowW)">${rect(w * 0.08, sy - 1.5 * u, w * 0.84, 3 * u, CYAN, { op: 0.8 })}</g>`;
  const a = st(lang, m, w - m);
  const S = k === 'story' ? { eb: 300, hd: 410, hpx: 72, sb: 0 } : k === 'portrait' ? { eb: 120, hd: 215, hpx: 66, sb: 430 } : { eb: 90, hd: 175, hpx: 56, sb: 345 };
  text(d, { t: C.eb, ...a, y: S.eb * (k === 'story' ? 1 : u), px: 26 * u, c: CYAN, ls: 3 * u });
  text(d, { t: C.head, ...a, y: S.hd * (k === 'story' ? 1 : u), px: S.hpx * u, maxW: w - 2 * m, wrap: true, lh: 1.18 });
  if (S.sb) text(d, { t: C.sub, ...a, y: S.sb * u, px: 28 * u, wt: 500, c: DIM, maxW: w - 2 * m, wrap: true, lh: 1.5 });
  if (k === 'story') text(d, { t: C.sub, ...a, y: 650, px: 30, wt: 500, c: DIM, maxW: w - 2 * m - 54, wrap: true, lh: 1.5 });
  if (k === 'story') page(m, sy + 120, w - 2 * m - 54, 560, 1.4);
  else page(m, sy + 80 * u, w - 2 * m, (k === 'portrait' ? 520 : 400) * u, u);
  mark(d, m, k === 'story' ? 1800 : h - 36 * u, 30 * u, false);
  return d;
}

function hemi(w, h, lang, o = {}) {
  const k = kindOf(w, h), u = k === 'link' ? h / 630 : w / 1080, d = design(w, h, u), C = T[lang].hemi, A = lang === 'ar';
  if (k === 'link') {
    navyField(d, 0, 0, w, h, 840, 420);
    light(d, 840, 400, 300, 0.3);
    hemicycle(d, 840, 470, 190, 330, lang);
    text(d, { t: String(LEFT), x: 840, y: 452, px: 150, wt: 900, c: CYAN, glow: CYAN, al: 'center', dir: 'ltr' });
    const a = st(lang, 64, 460);
    text(d, { t: C.eb, ...a, y: 150, px: 16, c: CYAN, ls: 2, maxW: 396, fit: true });
    text(d, { t: C.t1, ...a, y: 250, px: 64, maxW: 396, fit: true });
    text(d, { t: C.t2, ...a, y: 325, px: 40, c: DIM, maxW: 396, fit: true });
    pill(d, { t: CTA, x: a.x, y: 380, h: 54, px: 21, al: a.al, padX: 24 });
    mark(d, 64, h - 40, 24, true);
    return d;
  }
  const S = k === 'story' ? { cy: 960, R0: 270, R1: 445, eb: 320, tt: 1105, sb: 1180, pl: 1240 } : k === 'portrait' ? { cy: 760, R0: 265, R1: 440, eb: 170, tt: 895, sb: 965, pl: 1020 } : { cy: 625, R0: 250, R1: 410, eb: 110, tt: 750, sb: 815, pl: 865 };
  const cy = S.cy * u;
  navyField(d, 0, 0, w, h, w / 2, cy - 80 * u);
  light(d, w / 2, cy - 140 * u, 380 * u, 0.32);
  hemicycle(d, w / 2, cy, S.R0 * u, S.R1 * u, lang);
  text(d, { t: String(LEFT), x: w / 2, y: cy - 22 * u, px: S.R0 * 0.78 * u, wt: 900, c: CYAN, glow: CYAN, al: 'center', dir: 'ltr' });
  text(d, { t: C.eb, x: w / 2, y: S.eb * u, px: 26 * u, c: CYAN, al: 'center', ls: 3 * u });
  if (o.frame) return d;
  text(d, { t: C.title, x: w / 2, y: S.tt * u, px: (k === 'story' ? 62 : 54) * u, al: 'center', maxW: w - 160 * u, fit: true });
  text(d, { t: C.sub, x: w / 2, y: S.sb * u, px: 30 * u, wt: 500, c: DIM, al: 'center', maxW: w - 200 * u, fit: true });
  pill(d, { t: C.pill, x: w / 2, y: S.pl * u, h: 66 * u, px: 26 * u, al: 'center', padX: 32 * u });
  mark(d, 90 * u, k === 'story' ? 1800 : h - 50 * u, 30 * u, true);
  return d;
}

// ---- carousel (1080×1350): cover, five mistakes, end slide
function carouselSlide(i, lang) {
  const w = 1080, h = 1350, u = 1, d = design(w, h, u), C = T[lang].car, A = lang === 'ar', m = 90;
  const a = st(lang, m, w - m), b = en(lang, m, w - m);
  navyField(d, 0, 0, w, h, w * 0.5, h * 0.35);
  text(d, { t: 'SEG Audit', ...a, y: 110, px: 26, c: CYAN, ls: 3 });
  text(d, { t: `${String(i + 1).padStart(2, '0')}/07`, ...b, y: 110, px: 26, wt: 700, c: DIM2, dir: 'ltr' });
  if (i === 0) {
    light(d, A ? w * 0.7 : w * 0.3, 470, 380, 0.3);
    text(d, { t: '5', ...a, y: 800, px: 640, wt: 900, c: CYAN, glow: CYAN, dir: 'ltr' });
    text(d, { t: C.cover.l1, ...a, y: 950, px: 96, maxW: w - 2 * m, fit: true });
    text(d, { t: C.cover.l2, ...a, y: 1070, px: 96, maxW: w - 2 * m, fit: true, c: W });
    text(d, { t: C.cover.sub, ...a, y: 1160, px: 34, wt: 500, c: DIM });
    text(d, { t: C.cover.swipe, ...b, y: 1175, px: 30, c: CYAN });
    mark(d, m, 1290, 28, true);
    return d;
  }
  if (i === 6) {
    light(d, w / 2, 560, 380, 0.3);
    hemicycle(d, w / 2, 620, 165, 270, lang);
    text(d, { t: String(LEFT), x: w / 2, y: 606, px: 140, wt: 900, c: CYAN, glow: CYAN, al: 'center', dir: 'ltr' });
    text(d, { t: C.end.head, x: w / 2, y: 810, px: 72, al: 'center', maxW: w - 2 * m, wrap: true, lh: 1.2 });
    text(d, { t: C.end.line, x: w / 2, y: 1035, px: 40, c: CYAN, al: 'center', maxW: w - 2 * m, fit: true });
    pill(d, { t: C.end.pill, x: w / 2, y: 1090, h: 70, px: 28, al: 'center', padX: 34 });
    mark(d, m, 1290, 28, true);
    return d;
  }
  const it = C.items[i - 1];
  text(d, { t: String(i).padStart(2, '0'), ...a, y: 380, px: 230, wt: 900, c: CYAN, stroke: 3, glow: CYAN, dir: 'ltr' });
  text(d, { t: it.t, ...a, y: 530, px: 68, maxW: w - 2 * m, fit: true });
  text(d, { t: it.d, ...a, y: 625, px: 34, wt: 500, c: DIM, maxW: w - 2 * m, wrap: true, lh: 1.5 });
  // the white evidence card with the mistake drawn in navy + cyan
  const cx = m, cy = 800, cw = w - 2 * m, ch = 360;
  d.svg += `<g filter="url(#glowW)" opacity=".5">${rect(cx, cy, cw, ch, W, { r: 18 })}</g>` + rect(cx, cy, cw, ch, W, { r: 18 });
  const M = (v) => (A ? cx + cw - (v - cx) : v);
  const doc = (x, y, s, o = {}) => rect(x, y, s * 0.78, s, o.fill || W, { r: 6, stroke: o.stroke || NAVY, sw: 2.5, so: o.so ?? 0.85, dash: o.dash }) + (o.empty ? '' : bar(x + s * 0.14, y + s * 0.3, s * 0.5, 5, NAVY, 0.6) + bar(x + s * 0.14, y + s * 0.48, s * 0.36, 5, NAVY, 0.6) + bar(x + s * 0.14, y + s * 0.66, s * 0.44, 5, NAVY, 0.6));
  if (i === 1) { // two identical rows, bracketed in cyan
    [0, 1].forEach((k) => {
      const y = cy + 110 + k * 120;
      d.svg += doc(Math.min(M(cx + 50), M(cx + 50 + 47)), y - 30, 60) + bar(Math.min(M(cx + 140), M(cx + 140 + 330)), y, 330, 10, NAVY, 0.85);
      text(d, { t: '18,400', x: A ? cx + 190 : cx + cw - 190, y: y + 14, px: 40, wt: 800, c: NAVY, al: A ? 'left' : 'right', dir: 'ltr' });
      text(d, { t: k ? 'REF 2291-B' : 'REF 2291', x: M(cx + 140) + (A ? -0 : 0), y: y + 46, px: 18, wt: 600, c: '#5A6483', al: A ? 'right' : 'left', dir: 'ltr' });
    });
    const bx = A ? cx + 120 : cx + cw - 120;
    d.svg += `<g filter="url(#glow)"><path d="M${bx} ${cy + 80} h${A ? -24 : 24} v180 h${A ? 24 : -24}" fill="none" stroke="${CYAN}" stroke-width="5" stroke-linejoin="round"/></g>`;
    pill(d, { t: '×2', x: A ? cx + 30 : cx + cw - 30, y: cy + 150, h: 48, px: 24, al: A ? 'left' : 'right', padX: 16 });
  }
  if (i === 2) { // two supplier cards, one tax ID
    [0, 1].forEach((k) => {
      const x = cx + 70 + k * 320, y = cy + 70;
      d.svg += rect(x, y, 260, 120, 'none', { r: 12, stroke: NAVY, sw: 2.5, so: 0.8 }) + circ(x + 50, y + 60, 28, NAVY, { op: 0.85 }) + bar(x + 95, y + 48, 130 - k * 30, 9, NAVY, 0.85) + bar(x + 95, y + 76, 80, 7, NAVY, 0.5);
      d.svg += `<g filter="url(#glow)"><path d="M${x + 130} ${y + 120} C ${x + 130} ${y + 175}, ${cx + cw - 230} ${cy + 200}, ${cx + cw - 230} ${cy + 230}" fill="none" stroke="${CYAN}" stroke-width="4"/></g>`;
    });
    d.svg += `<g filter="url(#glow)">${rect(cx + cw - 400, cy + 230, 340, 76, CYAN, { r: 38 })}</g>`;
    text(d, { t: '312-456-789', x: cx + cw - 230, y: cy + 280, px: 32, wt: 800, c: NAVY, al: 'center', dir: 'ltr' });
  }
  if (i === 3) { // a timeline: the period is locked, an entry lands after it
    const y = cy + 200, x0 = cx + 60, x1 = cx + cw - 60;
    d.svg += rect(x0, y - 2, x1 - x0, 4, NAVY, { op: 0.4 });
    for (let t = 0; t < 9; t++) { const x = x0 + t * (x1 - x0) / 8; d.svg += circ(x, y, 10, NAVY, { op: t < 6 ? 0.85 : 0.2 }); }
    const lx = x0 + 5.5 * (x1 - x0) / 8;
    d.svg += rect(lx - 3, cy + 60, 6, 220, NAVY) + rect(lx - 26, cy + 60, 52, 40, NAVY, { r: 6 }) + `<path d="M${lx - 14} ${cy + 62} v-12 a14 14 0 0 1 28 0 v12" fill="none" stroke="${NAVY}" stroke-width="5"/>`;
    const ex = x0 + 6.5 * (x1 - x0) / 8;
    d.svg += `<g filter="url(#glow)">${circ(ex, y, 18, CYAN)}</g>` + circ(ex, y, 32, 'none', { stroke: CYAN, sw: 3 });
    text(d, { t: '31/10', x: lx, y: cy + 320, px: 26, wt: 700, c: NAVY, al: 'center', dir: 'ltr' });
    text(d, { t: '02/11', x: ex, y: y - 50, px: 26, wt: 800, c: '#0E7C8C', al: 'center', dir: 'ltr' });
  }
  if (i === 4) { // the three-way match with the PO missing
    const xs = [cx + 110, cx + 380, cx + 650].map((x) => (A ? cx + cw - (x - cx) - 110 : x));
    d.svg += doc(xs[0], cy + 90, 170, { stroke: CYAN, so: 1, dash: '10 8', empty: true });
    text(d, { t: '?', x: xs[0] + 66, y: cy + 210, px: 90, wt: 900, c: CYAN, al: 'center', glow: CYAN, dir: 'ltr' });
    d.svg += doc(xs[1], cy + 90, 170) + doc(xs[2], cy + 90, 170);
    [[0, 1], [1, 2]].forEach(([p, q]) => { const a1 = Math.min(xs[p], xs[q]) + 140, a2 = Math.max(xs[p], xs[q]) - 10; d.svg += `<path d="M${a1} ${cy + 175} H${a2}" stroke="${NAVY}" stroke-width="3" stroke-opacity=".5" stroke-dasharray="6 6"/>`; });
    ['PO', 'GRN', 'INV'].forEach((l, k) => text(d, { t: l, x: xs[k] + 66, y: cy + 310, px: 24, wt: 800, c: k ? NAVY : '#0E7C8C', al: 'center', dir: 'ltr' }));
  }
  if (i === 5) { // one person on both sides of the control
    const px0 = cx + cw / 2, py = cy + 190;
    [[cx + 160, '+'], [cx + cw - 160, '✓']].forEach(([x, sym]) => {
      d.svg += rect(x - 80, cy + 90, 160, 200, 'none', { r: 16, stroke: NAVY, sw: 3, so: 0.85 });
      text(d, { t: sym, x, y: cy + 225, px: 96, wt: 800, c: NAVY, al: 'center', dir: 'ltr' });
      d.svg += `<g filter="url(#glow)"><path d="M${px0} ${py} L${x + (x < px0 ? 80 : -80)} ${py}" stroke="${CYAN}" stroke-width="4"/></g>`;
    });
    d.svg += `<g filter="url(#glow)">${circ(px0, py, 52, CYAN)}</g>` + circ(px0, py - 14, 17, W) + `<path d="M${px0 - 28} ${py + 32} a28 24 0 0 1 56 0" fill="${W}"/>`;
  }
  text(d, { t: C.foot, ...a, y: 1255, px: 30, c: CYAN });
  mark(d, A ? m : w - m - 110, 1290, 28, true);
  return d;
}

// ---- founder POV: transparent overlay (alpha) and a mock frame on a placeholder
function founderPov(lang, mock) {
  const w = 1080, h = 1920, u = 1, d = design(w, h, u), C = T[lang].pov, A = lang === 'ar', m = 72;
  if (mock) {
    navyField(d, 0, 0, w, h, w / 2, h * 0.45, { dark: true, r: 0.7 });
    light(d, w / 2, h * 0.44, 420, 0.16);
    [w / PHI, w - w / PHI].forEach((x) => { d.svg += `<path d="M${f(x)} 0 V${h}" stroke="${W}" stroke-opacity=".12" stroke-dasharray="8 10" stroke-width="2"/>`; });
    [h / PHI, h - h / PHI].forEach((y) => { d.svg += `<path d="M0 ${f(y)} H${w}" stroke="${W}" stroke-opacity=".12" stroke-dasharray="8 10" stroke-width="2"/>`; });
    text(d, { t: C.ph, x: w / 2, y: 930, px: 34, wt: 600, c: DIM2, al: 'center' });
  } else d.alpha = true;
  // top: the hook in caption boxes (safe from 250)
  text(d, { t: C.hook, x: w / 2, y: 380, px: 92, al: 'center', bg: NAVY, bgPad: 30, maxW: w - 2 * m, fit: true });
  pill(d, { t: C.pill, x: w / 2, y: 470, h: 60, px: 26, al: 'center', padX: 28 });
  // lower third (above the platform caption zone)
  const ly = 1180, lw = 760, lx = A ? w - m - lw : m;
  d.svg += rect(lx, ly, lw, 170, NAVY, { r: 14, op: 0.94 }) + `<g filter="url(#glow)">${rect(A ? lx + lw - 8 : lx, ly, 8, 170, CYAN, { r: 4 })}</g>`;
  const a = st(lang, lx + 40, lx + lw - 40);
  text(d, { t: C.name, ...a, y: ly + 78, px: 50 });
  text(d, { t: C.role, ...a, y: ly + 130, px: 28, wt: 600, c: DIM });
  mark(d, A ? lx + 34 : lx + lw - 120, ly + 150, 28, true);
  return d;
}

// ---- storyboard frames (1080×1920) for two short videos
function videoFrames(lang) {
  const V = T[lang].vid, A = lang === 'ar', w = 1080, h = 1920, m = 96;
  const cap = (d, t, y = 330, c = W) => text(d, { t, ...st(lang, m, w - 150), y, px: 62, c, maxW: w - m - 150, wrap: true, lh: 1.2 });
  const frames = {};
  // A: "360 days"
  frames.a1 = hook360(w, h, lang, { frame: true, noCal: true });
  frames.a2 = (() => { const d = design(w, h, 1); navyField(d, 0, 0, w, h, w / 2, h / 2); cap(d, V.a2); calendar(d, m, 520, w - m - 150, 900, { cols: 19, rows: 20, byRow: true, lit: [22, 23, 24, 25, 26], k: 0.3 }); return d; })();
  frames.a3 = (() => { const d = design(w, h, 1); navyField(d, 0, 0, w, h, w / 2, h / 2); cap(d, V.a3); calendar(d, m, 520, w - m - 150, 900, { cols: 19, rows: 20, byRow: true, wave: 240, k: 0.3 }); return d; })();
  frames.a4 = (() => { const d = design(w, h, 1); const sy = 720; navyField(d, 0, 0, w, sy, w / 2, sy / 2); cap(d, V.a4, 380); d.svg += rect(0, sy, w, h - sy, W) + `<g filter="url(#bloom)">${rect(0, sy - 3, w, 6, W)}</g>` + rect(0, sy - 1, w, 2, CYAN); report(d, m, sy + 110, w - m - 150, 600, lang, { rows: 6, hot: 1, px: 28 }); return d; })();
  frames.a5 = hemi(w, h, lang);
  // B: before → after
  frames.b1 = (() => { const d = design(w, h, 1); navyField(d, 0, 0, w, h, w / 2, h * 0.45, { dark: true }); messy(d, 50, 200, w - 100, 1400, 21, { rows: 18, px: 26 }); d.svg += rect(0, 560, w, 300, '#050B20', { op: 0.55 }); text(d, { t: V.b1, x: w / 2, y: 745, px: 104, al: 'center', maxW: w - 2 * m, fit: true }); return d; })();
  frames.b2 = (() => { const d = design(w, h, 1); const sy = 980; d.svg += rect(0, 0, w, sy, W); report(d, m, 300, w - m - 150, 600, lang, { rows: 6, hot: 3, px: 28 }); navyField(d, 0, sy, w, h - sy, w / 2, sy + 300, { dark: true }); messy(d, 50, sy + 40, w - 100, 820, 23, { rows: 10, px: 26 }); d.svg += `<g filter="url(#bloom)">${rect(0, sy - 4, w, 8, W)}</g>` + rect(0, sy - 1.5, w, 3, CYAN); text(d, { t: V.b2, ...st(lang, m, w - 150), y: 1130, px: 56, c: W, bg: NAVY, bgPad: 18 }); return d; })();
  frames.b3 = (() => { const d = design(w, h, 1); const sy = 640; navyField(d, 0, 0, w, sy, w / 2, sy / 2); cap(d, V.b3, 380); d.svg += rect(0, sy, w, h - sy, W); report(d, m, sy + 110, w - m - 150, 620, lang, { rows: 6, hot: 2, px: 28 }); return d; })();
  frames.b4 = hemi(w, h, lang);
  return frames;
}
const SB = {
  ar: {
    a: { title: 'فيديو قصير ١: «باقي 360 يوم» · 15 ثانية · Reels / TikTok / Shorts', notes: [['0:00–0:03', 'الخطّاف: السؤال كامل على الشاشة، بلا كلام أول ثانية، ثم بصوت المؤسس'], ['0:03–0:06', 'التقويم: 365 نقطة، أسبوع عمل واحد مضيء'], ['0:06–0:10', 'النقاط تضيء سماويًا يومًا بعد يوم: SEG Audit يقرأ كل يوم'], ['0:10–0:13', 'التقرير الأبيض: الملاحظة السماوية ومعها مصدرها'], ['0:13–0:15', 'الختام: باقي 33 من 50 · الرابط في البايو']] },
    b: { title: 'فيديو قصير ٢: «قبل / بعد» · 12 ثانية', notes: [['0:00–0:03', 'الخطّاف: دفاتر مائلة متداخلة، والسؤال بخط ضخم'], ['0:03–0:06', 'خط المسح يمر من أعلى لأسفل: ما فوقه منظَّم وأبيض'], ['0:06–0:09', 'التقرير كاملًا: ملاحظة حرجة واحدة بالسماوي'], ['0:09–0:12', 'الختام: المقاعد · الرابط']] }
  },
  en: {
    a: { title: 'Short video 1: "The other 360 days" · 15 s · Reels / TikTok / Shorts', notes: [['0:00–0:03', 'Hook: the full question on screen, silent first second, then the founder’s voice'], ['0:03–0:06', 'The calendar: 365 dots, one working week lit'], ['0:06–0:10', 'Day by day the dots turn cyan: SEG Audit reads every day'], ['0:10–0:13', 'The white report: the cyan finding with its source'], ['0:13–0:15', 'End card: 33 of 50 left · link in bio']] },
    b: { title: 'Short video 2: "Before / After" · 12 s', notes: [['0:00–0:03', 'Hook: a tilted, overlapping ledger and the question in huge type'], ['0:03–0:06', 'The scan line sweeps down: above it, ordered and white'], ['0:06–0:09', 'The full report: one critical finding in cyan'], ['0:09–0:12', 'End card: the seats · the link']] }
  }
};

// ---------------------------------------------------------------- render
// Minimal PDF of full-page JPEGs (for LinkedIn document carousels). No dependency.
function pdfOfJpegs(pages, wPt, hPt) {
  const parts = [], offs = [];
  let len = 0;
  const push = (b) => { const buf = Buffer.isBuffer(b) ? b : Buffer.from(b, 'binary'); parts.push(buf); len += buf.length; };
  const obj = (n, body) => { offs[n] = len; push(`${n} 0 obj\n`); body(); push('\nendobj\n'); };
  push('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
  const n = pages.length, kids = pages.map((_, i) => `${3 + i * 3} 0 R`).join(' ');
  obj(1, () => push('<< /Type /Catalog /Pages 2 0 R >>'));
  obj(2, () => push(`<< /Type /Pages /Kids [${kids}] /Count ${n} >>`));
  pages.forEach((p, i) => {
    const pg = 3 + i * 3, im = pg + 1, cs = pg + 2;
    obj(pg, () => push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${wPt} ${hPt}] /Resources << /XObject << /Im${i} ${im} 0 R >> >> /Contents ${cs} 0 R >>`));
    obj(im, () => { push(`<< /Type /XObject /Subtype /Image /Width ${p.w} /Height ${p.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${p.buf.length} >>\nstream\n`); push(p.buf); push('\nendstream'); });
    const c = `q ${wPt} 0 0 ${hPt} 0 0 cm /Im${i} Do Q`;
    obj(cs, () => push(`<< /Length ${c.length} >>\nstream\n${c}\nendstream`));
  });
  const xref = len, total = 3 + n * 3;
  push(`xref\n0 ${total}\n0000000000 65535 f \n`);
  for (let i = 1; i < total; i++) push(`${String(offs[i]).padStart(10, '0')} 00000 n \n`);
  push(`trailer\n<< /Size ${total} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
  return Buffer.concat(parts);
}

(async () => {
  const only = process.argv[2] || '';
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage();
  await page.goto('about:blank');
  await page.evaluate(async ({ inter, cairo }) => {
    const a = new FontFace('Inter', `url(data:font/woff2;base64,${inter})`, { weight: '400 900', unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+2000-206F, U+2074, U+20AC, U+2122, U+2190, U+2191, U+2193, U+2212, U+2215, U+2713' });
    const b = new FontFace('Cairo', `url(data:font/woff2;base64,${cairo})`, { weight: '400 900', unicodeRange: 'U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF' });
    await a.load(); await b.load(); document.fonts.add(a); document.fonts.add(b);
  }, { inter: INTER, cairo: CAIRO });

  // Canvas renderer: SVG shapes first, then type, marks and images in order.
  const render = (d, formats) => page.evaluate(async ({ svg, ops, w, h, formats, mark }) => {
    const AR = /[؀-ۿ]/;
    const load = async (src) => { const i = new Image(); i.src = src; await i.decode(); return i; };
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const g = c.getContext('2d');
    g.drawImage(await load('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)), 0, 0, w, h);
    const marks = { navy: await load(mark.navy), white: await load(mark.white) };
    const font = (o, px) => { g.font = `${o.wt || 800} ${px}px "Inter","Cairo",sans-serif`; g.letterSpacing = o.ls && !AR.test(o.t) ? `${o.ls}px` : '0px'; };
    const wrapLines = (t, maxW) => { const ws = t.split(' '), out = []; let cur = ''; for (const x of ws) { const n = cur ? cur + ' ' + x : x; if (g.measureText(n).width > maxW && cur) { out.push(cur); cur = x; } else cur = n; } if (cur) out.push(cur); return out; };
    const leftOf = (al, x, wd) => (al === 'left' ? x : al === 'right' ? x - wd : x - wd / 2);
    for (const o of ops) {
      g.save();
      if (o.type === 'text') {
        g.direction = o.dir || (AR.test(o.t) ? 'rtl' : 'ltr'); g.textAlign = 'left';
        let px = o.px; font(o, px);
        if (o.fit && o.maxW) while (g.measureText(o.t).width > o.maxW && px > 8) font(o, --px);
        const lines = o.wrap && o.maxW ? wrapLines(o.t, o.maxW) : [o.t];
        if (o.rot) { g.translate(o.rx, o.ry); g.rotate(o.rot); g.translate(-o.rx, -o.ry); }
        lines.forEach((ln, i) => {
          const y = o.y + i * px * (o.lh || 1.2), wd = g.measureText(ln).width, x = leftOf(o.al, o.x, wd);
          if (o.bg) { const p = o.bgPad || 16; g.fillStyle = o.bg; g.beginPath(); g.roundRect(x - p, y - px * 0.98, wd + 2 * p, px * 1.42, 12); g.fill(); }
          if (o.glow) { g.shadowColor = o.glow; g.shadowBlur = px * 0.18; }
          if (o.stroke) { g.lineWidth = o.stroke; g.strokeStyle = o.c; g.strokeText(ln, x, y); }
          else { g.fillStyle = o.c; g.fillText(ln, x, y); }
          g.shadowBlur = 0;
          if (o.strike) {
            g.strokeStyle = o.strike; g.lineCap = 'round'; g.lineWidth = Math.max(3, px * 0.085);
            g.shadowColor = o.strike; g.shadowBlur = px * 0.25;
            g.beginPath(); g.moveTo(x - px * 0.12, y - px * 0.34); g.lineTo(x + wd + px * 0.12, y - px * 0.3); g.stroke(); g.shadowBlur = 0;
          }
        });
      }
      if (o.type === 'runs') {
        let items = o.items.map((r) => { font({ wt: r.wt || 800, t: r.t }, r.px); return { ...r, wd: g.measureText(r.t).width }; });
        let total = items.reduce((a, r) => a + r.wd, 0) + o.gap * (items.length - 1);
        if (o.maxW && total > o.maxW) { // scale the whole line down together so the hierarchy holds
          const k = o.maxW / total;
          items = items.map((r) => { font({ wt: r.wt || 800, t: r.t }, r.px * k); return { ...r, px: r.px * k, wd: g.measureText(r.t).width }; });
          total = o.maxW;
        }
        let x = leftOf(o.al, o.x, total);
        for (const r of (o.dir === 'rtl' ? [...items].reverse() : items)) {
          font({ wt: r.wt || 800, t: r.t }, r.px); g.direction = AR.test(r.t) ? 'rtl' : 'ltr'; g.textAlign = 'left';
          if (r.glow) { g.shadowColor = r.glow; g.shadowBlur = r.px * 0.18; }
          g.fillStyle = r.c || '#FFFFFF'; g.fillText(r.t, x, o.y); g.shadowBlur = 0;
          x += r.wd + o.gap;
        }
      }
      if (o.type === 'pill') {
        font({ wt: 800, t: o.t }, o.px); g.direction = AR.test(o.t) ? 'rtl' : 'ltr'; g.textAlign = 'left';
        const wd = g.measureText(o.t).width, pw = wd + 2 * o.padX, x = leftOf(o.al, o.x, pw);
        if (o.bg === '#1BB7CD') { g.shadowColor = 'rgba(27,183,205,.5)'; g.shadowBlur = o.h * 0.4; }
        g.fillStyle = o.bg; g.beginPath(); g.roundRect(x, o.y, pw, o.h, o.h / 2); g.fill(); g.shadowBlur = 0;
        g.fillStyle = o.fg; g.fillText(o.t, x + o.padX, o.y + o.h / 2 + o.px * 0.36);
      }
      if (o.type === 'mark') {
        const mk = o.white ? marks.white : marks.navy, mw = o.h * mk.width / mk.height;
        g.drawImage(mk, o.x, o.y - o.h, mw, o.h);
        g.fillStyle = o.white ? '#FFFFFF' : '#0D1B3E'; g.font = `800 ${o.h * 0.76}px "Inter"`; g.letterSpacing = `${o.h * 0.15}px`; g.direction = 'ltr'; g.textAlign = 'left';
        g.fillText('MFT', o.x + mw + o.h * 0.38, o.y - o.h / 2 + o.h * 0.28);
      }
      if (o.type === 'img') {
        const im = await load(o.src); g.beginPath(); g.roundRect(o.x, o.y, o.w, o.h, o.r || 0); g.clip(); g.drawImage(im, o.x, o.y, o.w, o.h);
      }
      g.restore();
    }
    const enc = { webp: ['image/webp', 0.9], jpg: ['image/jpeg', 0.92], png: ['image/png'] };
    return formats.map((k) => c.toDataURL(...enc[k]).split(',')[1]);
  }, { svg: svgOf(d), ops: d.ops, w: d.w, h: d.h, formats, mark: MARK });

  const written = [];
  const save = async (dir, base, d, formats = ['webp', 'jpg']) => {
    if (only && !`${dir}/${base}`.includes(only)) return null;
    const out = await render(d, formats);
    fs.mkdirSync(path.join(OUT, dir), { recursive: true });
    const bufs = {};
    formats.forEach((k, i) => { bufs[k] = Buffer.from(out[i], 'base64'); fs.writeFileSync(path.join(OUT, dir, `${base}.${k}`), bufs[k]); });
    written.push({ dir, base, w: d.w, h: d.h, ext: formats.includes('jpg') ? 'jpg' : formats[0] });
    console.log('wrote', `${dir}/${base}`);
    return bufs;
  };
  const SIZES = { square: [1080, 1080], portrait: [1080, 1350], story: [1080, 1920], link: [1200, 630] };
  const sets = [
    ['hook-360', hook360, ['story', 'square', 'portrait', 'link']],
    ['self-audit', selfAudit, ['square', 'story', 'link']],
    ['before-after', beforeAfter, ['story', 'square', 'portrait', 'link']],
    ['no-source', noSource, ['square', 'story', 'link']],
    ['hemicycle', hemi, ['square', 'story', 'portrait', 'link']]
  ];
  for (const [name, fn, kinds] of sets) for (const k of kinds) for (const lang of ['ar', 'en']) {
    const [w, h] = SIZES[k];
    await save(name, `${name}_${lang}_${k}_${w}x${h}`, fn(w, h, lang));
  }
  for (const k of ['story', 'square']) { const [w, h] = SIZES[k]; await save('before-after', `before-after_neutral_${k}_${w}x${h}`, beforeAfter(w, h, 'ar', { neutral: true })); }

  for (const lang of ['ar', 'en']) {
    const pages = [];
    for (let i = 0; i < 7; i++) { const b = await save('carousel', `carousel-5-mistakes_${lang}_${String(i + 1).padStart(2, '0')}_1080x1350`, carouselSlide(i, lang)); if (b) pages.push({ buf: b.jpg, w: 1080, h: 1350 }); }
    if (pages.length === 7) { fs.writeFileSync(path.join(OUT, 'carousel', `carousel-5-mistakes_${lang}.pdf`), pdfOfJpegs(pages, 810, 1012.5)); console.log('wrote', `carousel/carousel-5-mistakes_${lang}.pdf`); }
  }

  for (const lang of ['ar', 'en']) {
    await save('founder-pov', `founder-pov_${lang}_overlay_1080x1920`, founderPov(lang, false), ['png', 'webp']);
    await save('founder-pov', `founder-pov_${lang}_mock_1080x1920`, founderPov(lang, true));
  }

  for (const lang of ['ar', 'en']) {
    const fr = videoFrames(lang), shots = {};
    for (const [id, d] of Object.entries(fr)) { const b = await save('video', `video-${id[0]}_${lang}_frame-${id.slice(1)}_1080x1920`, d); if (b) shots[id] = 'data:image/jpeg;base64,' + b.jpg.toString('base64'); }
    for (const v of ['a', 'b']) {
      const ids = Object.keys(shots).filter((x) => x[0] === v);
      if (!ids.length) continue;
      const S = SB[lang][v], fw = 420, fh = 747, gap = 36, W2 = ids.length * fw + (ids.length + 1) * gap, H2 = 1180;
      const d = design(W2, H2, 1);
      d.svg += rect(0, 0, W2, H2, '#F5F7FA');
      text(d, { t: S.title, ...st(lang, gap, W2 - gap), y: 90, px: 40, c: NAVY });
      const order = lang === 'ar' ? [...ids].reverse() : ids; // Arabic sheets read right to left
      order.forEach((id, i) => {
        const x = gap + i * (fw + gap), n = ids.indexOf(id);
        d.svg += rect(x - 1, 139, fw + 2, fh + 2, NAVY, { r: 14, op: 0.15 });
        d.ops.push({ type: 'img', src: shots[id], x, y: 140, w: fw, h: fh, r: 14 });
        text(d, { t: S.notes[n][0], x: x + fw / 2, y: 940, px: 30, wt: 800, c: '#0E7C8C', al: 'center', dir: 'ltr' });
        text(d, { t: S.notes[n][1], x: x + fw / 2, y: 990, px: 22, wt: 600, c: NAVY, al: 'center', maxW: fw - 10, wrap: true, lh: 1.45 });
      });
      mark(d, gap, H2 - 40, 28, false);
      await save('video', `video-${v}_${lang}_storyboard_${W2}x${H2}`, d, ['webp', 'jpg']);
    }
  }
  await browser.close();

  if (!only) {
    const groups = [...new Set(written.map((x) => x.dir))];
    const html = `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SEG Audit launch concepts</title>
<style>body{margin:0;padding:32px 16px;background:#F5F7FA;color:#0D1B3E;font:15px/1.5 system-ui,sans-serif}h1{font-size:24px;margin:0 0 4px}h2{font-size:18px;margin:40px 0 12px}p{margin:0 0 16px;color:#3B4262}.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px}figure{margin:0;background:#fff;border:1px solid #E6E9F0;border-radius:6px;padding:10px}img{display:block;width:100%;height:auto;background:repeating-conic-gradient(#ddd 0 25%,#fff 0 50%) 0 0/20px 20px}figcaption{font-size:12px;margin-top:8px;word-break:break-all}</style>
<h1>SEG Audit launch: creative concepts</h1><p>Generated by scripts/launch-concepts.js. See README.md in this folder for the idea behind each concept and where to use it.</p>
${groups.map((gname) => `<h2>${gname}</h2><div class="g">${written.filter((x) => x.dir === gname).map((x) => `<figure><img loading="lazy" src="${gname}/${x.base}.webp" alt="${x.base}"><figcaption>${gname}/${x.base}.${x.ext} · ${x.w}×${x.h}</figcaption></figure>`).join('')}</div>`).join('\n')}`;
    fs.writeFileSync(path.join(OUT, 'index.html'), html);
    console.log(`${written.length} files`);
  }
})();
