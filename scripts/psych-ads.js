#!/usr/bin/env node
// SEG Audit "persuasion" pack (CEO brief, 4 Nov 2026): nine designs, one persuasion principle each,
// rendered into marketing/designs/psych/. Square 1080×1080 and story 1080×1920 for all; link
// 1200×630 where it suits. Gallery: marketing/designs/psych/index.html (principle notes per design).
//
// Brand: navy #0D1B3E, cyan #1BB7CD, white. One controlled "alarm" red #C0392B, used only for small
// risk marks (a dot, a badge, a minus sign), never for large fills. No gold. Arabic RTL.
// Data rule (CEO): no real MFT or client data anywhere. Every ledger figure is test data and carries
// «مثال توضيحي». The seat numbers come from src/site.config.js → founding (the published offer); the
// test count from src/content/platform-facts.js.
//
// Hand lettering uses macOS system fonts (Waseem, Farisi); UI type is Cairo from src/assets/fonts.
// Needs Playwright + Google Chrome:  PLAYWRIGHT_PATH=<path to playwright> node scripts/psych-ads.js [filter]
const fs = require('fs');
const path = require('path');

let chromium;
try { ({ chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright')); }
catch { console.error('playwright not found. npm i -D playwright, or set PLAYWRIGHT_PATH.'); process.exit(1); }

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'marketing/designs/psych');
const b64 = (f) => fs.readFileSync(path.join(ROOT, f)).toString('base64');
const CAIRO = b64(require('./lib/brand-tokens.js').font.arabic.file);
const INTER = b64(require('./lib/brand-tokens.js').font.latin.file);
const { founding: FM } = require('../src/site.config.js');
const FACTS = require('../src/content/platform-facts.js');

const { NAVY, CYAN, W, RED } = require('./lib/brand-tokens.js').legacy; // marketing/brand/tokens/seg-tokens.json
const SIZES = { square: [1080, 1080], story: [1080, 1920], link: [1200, 630] };

// Western digits everywhere (one system, as on the site, platform and reports): 18747106 → 18,747,106
const ar = (n) => Number(n).toLocaleString('en-US'); // Western digits in all Arabic creative (review, 7 Nov 2026)
const { CLOSE, COPY: K, signHTML } = require('./lib/campaign.js');
const TESTS = ar(FACTS.testsFloor);
const DEMO = 'مثال توضيحي · داتا اختبارية';

// ---------------------------------------------------------------- shared shell
const BASE_CSS = `
@font-face{font-family:Cairo;src:url(data:font/woff2;base64,${CAIRO});font-weight:400 900}
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${INTER});font-weight:400 900}
*{box-sizing:border-box;margin: 0;padding: 0}
html,body{width:100%;height:100%;overflow:hidden}
body{position:relative;direction:rtl;font-family:Cairo,sans-serif;color:${W};
  background:radial-gradient(ellipse at 70% 15%, #1C2F63 0%, ${NAVY} 55%, #081230 100%)}
.grid-bg{position:absolute;inset:0;opacity:.07;background-image:linear-gradient(${CYAN} 1px,transparent 1px),linear-gradient(90deg,${CYAN} 1px,transparent 1px);background-size:54px 54px;mask-image:radial-gradient(ellipse at 50% 40%,#000 20%,transparent 75%)}
.frame{position:absolute;inset:0;display:flex;flex-direction:column}
.eyebrow{font-weight:800;color:${CYAN};letter-spacing:0}
.eyebrow b{font-family:Inter;font-weight:800}
h1{font-weight:900;line-height:1.18}
h1 em{font-style:normal;color:${CYAN}}
.sub{color:rgba(255,255,255,.8);font-weight:600;line-height:1.55}
.tag{display:inline-flex;align-items:center;gap: .5em;align-self:flex-start;border:1.5px solid rgba(27,183,205,.7);color:${CYAN};
  border-radius:999px;padding: .25em .9em;font-weight:800;white-space:nowrap;background:rgba(13,27,62,.6)}
.tag::before{content:'';width:.55em;height:.55em;border-radius:50%;background:${CYAN}}
.red-dot{display:inline-block;width:.6em;height:.6em;border-radius:50%;background:${RED};box-shadow:0 0 0 .18em rgba(192,57,43,.25)}
.visual{position:relative;flex:1;min-height:0;container-type:size}
.foot{display:flex;align-items:center;justify-content:space-between;direction:rtl}
.cta{display:flex;align-items:center;gap: .6em;padding: 0 1.15em;border-radius:999px;background:${CYAN};color:${NAVY};font-weight:800;white-space:nowrap;box-shadow:0 8px 28px rgba(27,183,205,.3)}
.cta b{font-family:Inter;font-weight:800}
.mark{display:flex;align-items:center;gap: .4em;direction:ltr}
.mark span{font: 800 1em Inter,sans-serif;letter-spacing:.15em}
.lat{font-family:Inter;font-weight:800;direction:ltr;unicode-bidi:isolate}`;

// Layout tokens per format. link = two columns (copy on the right, visual on the left).
function kindCss(kind) {
  if (kind === 'story') return `.frame{padding: 144px 55px 144px;gap: 34px} .eyebrow{font-size: 33px} h1{font-size: 86px} .sub{font-size: 42px} .tag{font-size: 26px}
    .foot{height:auto;flex-direction:column-reverse;align-items:flex-start;gap: 21px} .cta{height:72px;font-size: 33px} .mark{font-size: 33px} .mark img{height:40px}`; // stories: signature row above the pill
  if (kind === 'link') return `.frame{padding: 55px 55px 34px;display:grid;grid-template-columns:1fr 1.12fr;grid-template-rows:auto 1fr auto;column-gap: 34px;row-gap: 13px}
    .copy{grid-column:1;grid-row:1/3;display:flex;flex-direction:column;gap: 13px;justify-content:center}
    .visual{grid-column:2;grid-row:1/3} .foot{grid-column:1/3;grid-row:3;height:50px}
    .eyebrow{font-size: 20px} h1{font-size: 42px} .sub{font-size: 20px} .tag{font-size: 16px}
    .cta{height:48px;font-size: 20px} .mark{font-size: 20px} .mark img{height:26px}`;
  return `.frame{padding: 55px 55px 55px;gap: 21px} .eyebrow{font-size: 26px} h1{font-size: 86px} .sub{font-size: 26px} .tag{font-size: 20px}
    .foot{height:62px} .cta{height:62px;font-size: 26px} .mark{font-size: 26px} .mark img{height:34px}`;
}

// Shrinks every .fit element (block) until its content fits its own width (and data-max-h, if set).
const FIT_JS = `for (const el of document.querySelectorAll('.fit')) { let px = parseFloat(getComputedStyle(el).fontSize);
  const maxH = +el.dataset.maxH || Infinity; while ((el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > maxH) && px > 10) el.style.fontSize = (--px) + 'px'; }`;

function page(kind, { eyebrow, head, sub, tag, visual, css = '', extra = '', script = '', cta = 'فحص مجاني في دقائق' }) {
  const copy = `${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<h1 class="fit">${head}</h1>${sub ? `<p class="sub">${sub}</p>` : ''}${tag ? `<span class="tag">${tag}</span>` : ''}`;
  const foot = `<div class="foot"><div class="cta"><span>${cta}</span><i>·</i><b>seg-audit.com</b></div>${signHTML({ story: 44, link: 30, square: 38 }[kind] || 38)}</div>`;
  const inner = kind === 'link'
    ? `<div class="copy">${copy}</div><div class="visual">${visual}</div>${foot}`
    : `${copy}<div class="visual">${visual}</div>${foot}`;
  return `<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><style>${BASE_CSS}${kindCss(kind)}${css}</style><body>${extra}<div class="grid-bg"></div><div class="frame">${inner}</div><script>${FIT_JS}${script}</script></body></html>`;
}

// ---------------------------------------------------------------- 1) loss aversion
// One small wrong entry, four moments in time, the circle grows. Red stays a dot (the origin) and a badge.
function loss(kind) {
  const steps = [['اليوم', 2400], ['بعد شهر', 18000], ['بعد 6 شهور', 135000], ['عند الإقفال', 980000]];
  const vertical = kind === 'story';
  const sizes = [16, 26, 40, 62]; // % of the visual's short side
  const nodes = steps.map(([when, amt], i) => `<div class="node n${i}">
      <div class="disc" style="--s:${sizes[i]}">${i === 0 ? '<span class="red-dot"></span>' : ''}<span class="amt">${ar(amt)}</span>${i === 3 ? '<span class="badge">!</span>' : ''}</div>
      <span class="when">${when}</span></div>`).join('<div class="arrow"></div>');
  return page(kind, {
    eyebrow: '<b>Standard Enterprise Governance</b> · الخطأ الصغير',
    head: 'الخطأ اللي مش شايفه<br><em>بيكبر.</em>',
    sub: 'قيد غلط صغير النهارده… مفاجأة كبيرة في الإقفال. اكشفه بدري.',
    tag: `${DEMO} · المبالغ بالجنيه`,
    visual: `<div class="row">${nodes}</div>`,
    css: `.row{--u:${vertical ? 'min(1cqw, calc(1cqh / 1.75))' : 'min(1cqh, calc(1cqw / 1.75))'};position:absolute;inset:0;display:flex;flex-direction:${vertical ? 'column' : 'row'};align-items:center;justify-content:space-between}
      .node{display:flex;flex-direction:${vertical ? 'row' : 'column'};align-items:center;gap: calc(var(--u) * 2.4)}
      .disc{position:relative;width:calc(var(--s) * var(--u));height:calc(var(--s) * var(--u));border-radius:50%;display:flex;align-items:center;justify-content:center;
        background:radial-gradient(circle at 35% 30%, rgba(255,255,255,.22), rgba(27,183,205,.10) 60%, rgba(27,183,205,.05));border:2px solid rgba(27,183,205,.55)}
      .n3 .disc{border-color:#fff;box-shadow:0 0 0 calc(var(--u) * 1.4) rgba(255,255,255,.06),0 0 calc(var(--u) * 6) rgba(27,183,205,.35)}
      .amt{font-weight:900;font-size: calc(var(--s) * var(--u) * .22);white-space:nowrap}
      .disc .red-dot{position:absolute;top:calc(var(--u) * -.6);inset-inline-start:calc(var(--u) * -.6);font-size: calc(var(--u) * 3)}
      .badge{position:absolute;top:4%;inset-inline-end:4%;width:calc(var(--u) * 8);height:calc(var(--u) * 8);border-radius:50%;background:${RED};font-weight:900;font-size: calc(var(--u) * 5.6);display:flex;align-items:center;justify-content:center;line-height:1}
      .when{font-weight:800;font-size: calc(var(--u) * 4.2);color:rgba(255,255,255,.75);white-space:nowrap}
      .arrow{flex:1;align-self:center;${vertical ? 'width:2px;min-height:2cqmin' : 'height:2px;min-width:2cqmin'};background:linear-gradient(${vertical ? '180deg' : '270deg'},rgba(27,183,205,.2),rgba(27,183,205,.8));margin: 0 1cqmin}`
  });
}

// ---------------------------------------------------------------- 2) curiosity gap (Zeigarnik)
function curiosity(kind) {
  const rows = [['حسابات معلّقة بقالها شهور', 1], ['أرصدة عكس طبيعتها', 1], ['قيود يدوية كثيفة على حسابات حساسة', 1], ['ميزان مش متزن', 0], ['قيود بتاريخ رجعي بعد الإقفال', 0]];
  return page(kind, {
    eyebrow: '<b>Standard Enterprise Governance</b> · فحص الميزان',
    head: '<em>5</em> حاجات في دفاترك<br>مش شايفها.',
    sub: '3 منهم قدامك… والاتنين الباقيين في ميزانك.',
    visual: `<div class="card">${rows.map(([t, shown], i) => `<div class="r${shown ? '' : ' hid'}"><span class="n">${ar(i + 1)}</span><span class="t">${t}</span>${shown ? '<span class="red-dot"></span>' : ''}</div>`).join('')}
      <div class="lock"><svg viewBox="0 0 24 24" width="1em" height="1em"><path d="M7 10V7a5 5 0 0 1 10 0v3" fill="none" stroke="${NAVY}" stroke-width="2.4" stroke-linecap="round"/><rect x="4.5" y="10" width="15" height="11" rx="2.5" fill="${NAVY}"/></svg><span>اكشف الاتنين بالفحص المجاني</span></div></div>`,
    css: `.card{position:absolute;inset:0;background:#fff;color:${NAVY};border-radius:2.4cqmin;padding: 3.5cqmin 4cqmin;display:flex;flex-direction:column;justify-content:space-around;box-shadow:0 3cqmin 7cqmin rgba(0,0,0,.35)}
      .r{display:flex;align-items:center;gap: 2.6cqmin;font-weight:800;font-size: min(5.2cqmin,7cqh);border-bottom:2px solid #E6E9F0;padding: 1cqmin 0}
      .r:last-of-type{border-bottom:0}
      .n{flex:0 0 auto;width:1.7em;height:1.7em;border-radius:50%;background:${NAVY};color:#fff;display:flex;align-items:center;justify-content:center;font-size: .8em}
      .t{flex:1}
      .r .red-dot{font-size: .7em}
      .hid .t,.hid .n{filter:blur(.3em);opacity:.9}
      .lock{position:absolute;left:50%;bottom:13%;transform:translateX(-50%);display:flex;align-items:center;justify-content:center;gap: 1.6cqmin;white-space:nowrap;
        background:${NAVY};color:#fff;border-radius:999px;padding: 1.4cqmin 3.4cqmin;font-weight:900;font-size: min(4cqmin,5.4cqh);box-shadow:0 1.4cqmin 3cqmin rgba(13,27,62,.35)}
      .lock svg path{stroke:#fff} .lock svg rect{fill:#fff}
      .lock svg{font-size: 1.3em}`
  });
}

// ---------------------------------------------------------------- 3) shocking specificity
function shock(kind) {
  return page(kind, {
    eyebrow: '<b>Standard Enterprise Governance</b> · رصيد شاذ',
    head: 'خزينتك <em>بالسالب؟</em>',
    sub: 'النقدية ما ينفعش تبقى سالب. لو حصل، يبقى فيه قيد غلط مستخبي.',
    visual: `<div class="acct">
        <div class="hdr"><span>حساب: الخزينة الرئيسية</span><span class="demo">${DEMO}</span></div>
        <div class="num"><span class="minus">−</span><span class="digits">${ar(18747106)}</span><span class="cur">ج.م</span></div>
        <div class="flag"><span class="red-dot"></span><span>رصيد دائن على حساب نقدية</span></div>
      </div>`,
    css: `.acct{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;gap: 3cqh;padding: 4cqmin 5cqmin;border-radius:2.4cqmin;
        background:linear-gradient(160deg,rgba(255,255,255,.08),rgba(255,255,255,.02));border:1.5px solid rgba(255,255,255,.14)}
      .hdr{display:flex;justify-content:space-between;align-items:center;gap: 2cqmin;font-weight:800;font-size: min(4.2cqmin,7cqh);color:rgba(255,255,255,.8);flex-wrap:wrap}
      .demo{color:${CYAN};border:1.5px solid rgba(27,183,205,.7);border-radius:999px;padding: .15em .8em;font-size: .85em;white-space:nowrap}
      .num{display:flex;align-items:baseline;justify-content:center;gap: 1.4cqmin;direction:ltr;white-space:nowrap}
      .digits{font-weight:900;font-size: min(15cqw,30cqh);line-height:1;letter-spacing:-.01em}
      .minus{font-weight:900;font-size: min(15cqw,30cqh);line-height:1;color:${RED}}
      .cur{font-weight:800;font-size: min(5cqw,9cqh);color:rgba(255,255,255,.7)}
      .flag{display:flex;align-items:center;justify-content:center;gap: 1.4cqmin;font-weight:800;font-size: min(4.4cqmin,7cqh)}`
  });
}

// ---------------------------------------------------------------- 4) selectivity + closing window
// Scarcity without a count (6 Nov 2026): the application itself is the visual. One application under
// review, its lines blank (no invented applicant), a cyan review stamp, and the close date as a deadline
// tab. No «accepted» stamp: nothing on an ad may imply an outcome or a number of members.
function selectivity(kind) {
  const rows = ['الشركة', 'النشاط', 'نظام المحاسبة', 'حجم القيود الشهري', 'ليه دلوقتي؟'];
  return page(kind, {
    eyebrow: `<b>SEG</b> · ${K.ar.program}`,
    head: 'مش كل طلب <em>بيتقبل</em>.',
    sub: `${K.ar.review} و${K.ar.closesOn}.`,
    tag: K.ar.selectShort,
    cta: K.ar.cta,
    visual: `<div class="app"><div class="tab"><span>آخر موعد</span><b>${CLOSE.arShort}</b><span>${CLOSE.arTime}</span></div>
      <p class="t">طلب عضوية مؤسِّسة</p>
      ${rows.map((r, i) => `<div class="row"><span>${r}</span><i style="width:${[58, 44, 36, 50, 66][i]}%"></i></div>`).join('')}
      <div class="stamp"><b>قيد المراجعة</b><span>فريق MFT</span></div></div>`,
    css: `.app{position:absolute;inset:2% 6% 4%;background:#F7F9FC;color:${NAVY};border-radius:2.4cqmin;padding: 7cqmin 6cqmin 5cqmin;box-shadow:0 3cqmin 7cqmin rgba(0,0,0,.45);display:flex;flex-direction:column;gap: 3.2cqmin;transform:rotate(-1.6deg)}
      .app .t{font-weight:900;font-size: min(5.6cqmin,9cqh);margin-bottom: 1cqmin}
      .row{display:flex;align-items:center;gap: 3cqmin;font-weight:700;font-size: min(3.4cqmin,6cqh);color:rgba(13,27,62,.7)}
      .row span{flex:0 0 34%} .row i{display:block;height:1.6cqmin;border-radius:1cqmin;background:rgba(13,27,62,.14)}
      .tab{position:absolute;top:-3.4cqmin;inset-inline-start:6cqmin;background:${NAVY};color:#fff;border:2px solid ${CYAN};border-radius:1.6cqmin;padding: 1.4cqmin 3cqmin;display:flex;align-items:center;gap: 2cqmin;font-weight:800;font-size: min(3.2cqmin,5.6cqh);white-space:nowrap}
      .tab b{color:${CYAN};font-weight:900}
      .stamp{position:absolute;inset-inline-end:5cqmin;bottom:5cqmin;width:min(30cqmin,46cqh);aspect-ratio:1;border-radius:50%;border:.9cqmin solid #1497AA;outline:.35cqmin solid #1497AA;outline-offset:.9cqmin;color:#1497AA;display:flex;flex-direction:column;align-items:center;justify-content:center;transform:rotate(-14deg);font-weight:900;font-size: min(4.6cqmin,8cqh);line-height:1.2;opacity:.92}
      .stamp span{font-size: .62em;font-weight:800}`
  });
}

// ---------------------------------------------------------------- 5) meta authority
function authority(kind) {
  const ticks = Array.from({ length: 36 }, (_, i) => { const a = (i / 36) * 2 * Math.PI, r = 44;
    return `<path d="M${50 + r * Math.cos(a) - 1.6} ${50 + r * Math.sin(a)} l1.3 1.4 l2.4 -2.8" fill="none" stroke="${CYAN}" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" opacity="${0.35 + 0.65 * ((i % 4) === 0)}"/>`; }).join('');
  return page(kind, {
    eyebrow: '<b>Standard Enterprise Governance</b> · الثقة',
    head: 'المنصة التي<br><em>تراجع نفسها.</em>',
    sub: `قبل ما تراجع دفاترك: +${TESTS} اختبار آلي قبل كل تحديث للمنصة، وكل تقرير يعتمده مراجع باسمه.`,
    visual: `<div class="seal"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="rgba(27,183,205,.08)" stroke="rgba(27,183,205,.6)" stroke-width=".6"/><circle cx="50" cy="50" r="31" fill="none" stroke="rgba(255,255,255,.18)" stroke-width=".4" stroke-dasharray="1 1.6"/>${ticks}</svg>
      <div class="in"><span class="big">+${TESTS}</span><span class="lbl">اختبار قبل كل تحديث</span><span class="src">من كود المنصة · ${ar(+FACTS.measuredOn.slice(8))} ${['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'][+FACTS.measuredOn.slice(5,7)-1]} ${FACTS.measuredOn.slice(0,4).replace(/\d/g, (d) => '0123456789'[d])}</span></div></div>`,
    css: `.seal{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
      .seal svg{height:100%;max-width:100%;aspect-ratio:1}
      .in{position:absolute;display:flex;flex-direction:column;align-items:center;gap: .6cqmin;text-align:center}
      .big{font-weight:900;font-size: min(17cqmin,30cqw);line-height:1}
      .lbl{font-weight:800;font-size: min(5cqmin,8cqw);color:${CYAN}}
      .src{font-weight:600;font-size: min(3cqmin,5cqw);color:rgba(255,255,255,.6)}`
  });
}

// ---------------------------------------------------------------- 6) anchoring
function anchoring(kind) {
  const vertical = kind === 'story';
  return page(kind, {
    eyebrow: '<b>Standard Enterprise Governance</b> · قبل الإقفال',
    head: 'مفاجأة الإقفال بتكلّفك…<br><em>الفحص ببلاش.</em>',
    sub: 'اعرف نقاط الخطر في ميزانك قبل ما تبقى قيود تصحيح وأسابيع تسويات.',
    visual: `<div class="cmp">
        <div class="c bad"><p class="h">مفاجأة الإقفال السنوي</p><ul><li><span class="red-dot"></span>قيود تصحيح</li><li><span class="red-dot"></span>أسابيع تسويات</li><li><span class="red-dot"></span>أسئلة المراجع</li></ul>
          <p class="price">أسابيع</p><p class="demo">شغل فريقك بعد ما السنة تتقفل</p></div>
        <div class="vs">مقابل</div>
        <div class="c good"><p class="h">الفحص المجاني</p><ul><li>ميزان آخر شهر مقفول</li><li>5 مؤشرات خطر</li><li>في دقائق</li></ul>
          <p class="price">مجانًا</p><p class="demo">بلا بطاقة ولا التزام</p></div>
      </div>`,
    css: `.cmp{position:absolute;inset:0;display:flex;flex-direction:${vertical ? 'column' : 'row'};gap: 2.4cqmin;align-items:stretch}
      .c{flex:1;min-height:0;border-radius:2.4cqmin;padding: ${vertical ? '2.4cqmin 3.4cqmin' : '3.4cqmin'};display:flex;flex-direction:column;gap: ${vertical ? '.8cqh' : '1.6cqmin'};justify-content:center}
      .bad{background:rgba(255,255,255,.06);border:1.5px solid rgba(255,255,255,.16)}
      .good{background:#fff;color:${NAVY};box-shadow:0 0 0 .8cqmin rgba(27,183,205,.35),0 3cqmin 6cqmin rgba(0,0,0,.35)}
      .h{font-weight:900;font-size: min(5cqmin,${vertical ? 3.4 : 9}cqh)}
      .good .h{color:#0F7C91}
      ul{list-style:none;display:flex;flex-direction:column;gap: .8cqmin;font-weight:700;font-size: min(3.8cqmin,${vertical ? 2.6 : 6.4}cqh)}
      li{display:flex;align-items:center;gap: 1.2cqmin}
      .good li::before{content:'✓';color:${CYAN};font-weight:900}
      .price{font-weight:900;font-size: min(9cqmin,${vertical ? 5 : 15}cqh);line-height:1.1}
      .price small{font-size: .4em;font-weight:800;opacity:.7}
      .demo{font-weight:700;font-size: min(2.8cqmin,${vertical ? 2 : 5}cqh);opacity:.7}
      .vs{align-self:center;font-weight:900;font-size: min(3.4cqmin,6cqh);color:rgba(255,255,255,.6)}`
  });
}

// ---------------------------------------------------------------- 7a) pattern break: graffiti, v2
function graffiti(kind) {
  const story = kind === 'story', w = 1080, h = story ? 1920 : 1080, seed = 41;
  const pw = 360, ph = story ? 320 : 270; let seams = '', holes = '';
  for (let x = pw; x < w; x += pw) seams += `<rect x="${x - 1}" y="0" width="3" height="${h}" fill="rgba(0,0,0,.34)"/><rect x="${x + 2}" y="0" width="1" height="${h}" fill="rgba(255,255,255,.06)"/>`;
  for (let y = ph; y < h; y += ph) seams += `<rect x="0" y="${y - 1}" width="${w}" height="3" fill="rgba(0,0,0,.34)"/><rect x="0" y="${y + 2}" width="${w}" height="1" fill="rgba(255,255,255,.06)"/>`;
  for (let x = pw / 4; x < w; x += pw / 2) for (let y = ph / 2; y < h; y += ph) holes += `<circle cx="${x}" cy="${y}" r="7" fill="rgba(0,0,0,.5)" stroke="rgba(255,255,255,.08)" stroke-width="2"/>`;
  const html = `<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><style>
@font-face{font-family:Cairo;src:url(data:font/woff2;base64,${CAIRO});font-weight:400 900}
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${INTER});font-weight:400 900}
*{box-sizing:border-box;margin: 0;padding: 0} html,body{width:100%;height:100%;overflow:hidden}
body{position:relative;direction:rtl;font-family:Cairo,sans-serif;color:#fff;background:radial-gradient(ellipse at 50% 0%, #2A3E78 0%, #172852 45%, ${NAVY} 100%)}
.layer{position:absolute;inset:0}
.light{background:radial-gradient(ellipse 80% 45% at 50% 0%, rgba(255,255,255,.16), transparent 70%)}
.copy{position:absolute;inset-inline:70px;top:50%;transform:translateY(-58%) rotate(-3deg);text-align:center}
.ln{line-height:1.08}
.sp{position:relative;display:inline-block;white-space:nowrap;font-family:Waseem,Cairo,sans-serif;font-weight:700;filter:url(#spray);
  text-shadow:0 0 4px currentColor,0 0 26px rgba(255,255,255,.22),0 0 60px rgba(27,183,205,.12)}
.sp .bl{display:inline-block;width:0;height:0}
.drip{position:absolute;background:currentColor;border-radius:0 0 999px 999px}
.drip::after{content:'';position:absolute;left:50%;bottom:-5px;transform:translateX(-50%);width:170%;aspect-ratio:1;border-radius:50%;background:currentColor}
.speck{position:absolute;border-radius:50%;background:currentColor}
.stencil{position:absolute;top:${story ? 210 : 96}px;inset-inline-end:86px;display:flex;align-items:center;gap: 13px;opacity:.9;filter:url(#spray)}
.eye{width:${story ? 150 : 120}px}
.stencil span{font: 800 ${story ? 34 : 28}px Inter;letter-spacing:.3em;color:${CYAN};direction:ltr}
.alarm{position:absolute;font-family:Waseem,Cairo;font-weight:700;color:${RED};filter:url(#spray);text-shadow:0 0 18px rgba(192,57,43,.5)}
.demo{position:absolute;bottom:${story ? 210 : 150}px;inset-inline:0;text-align:center;font-weight:800;font-size: ${story ? 30 : 24}px;color:rgba(255,255,255,.65)}
.cta{position:absolute;right:64px;bottom:64px;display:flex;align-items:center;gap: 13px;height:${story ? 68 : 58}px;padding: 0 34px;border-radius:999px;background:${CYAN};color:${NAVY};font-weight:800;font-size: ${story ? 30 : 25}px;white-space:nowrap}
.cta b{font-family:Inter} .mark{position:absolute;${story ? 'right:64px;bottom:166px' : 'left:64px;bottom:76px'};display:flex;align-items:center;gap: 13px;direction:ltr}
.mark img{height:${story ? 40 : 34}px} .mark span{font: 800 ${story ? 30 : 26}px Inter;letter-spacing:.15em}
</style><body>
<svg class="layer" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>
  <filter id="grainW"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" seed="${seed}"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 .55 0 0 0 -.2"/></filter>
  <filter id="grainK"><feTurbulence type="fractalNoise" baseFrequency=".5" numOctaves="3" seed="${seed + 1}"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .95 0 0 0 -.3"/></filter>
  <filter id="stain"><feTurbulence type="fractalNoise" baseFrequency=".004" numOctaves="4" seed="${seed + 2}"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1.2 0 0 0 -.45"/></filter>
  <filter id="spray" x="-5%" y="-10%" width="110%" height="130%"><feTurbulence type="fractalNoise" baseFrequency="1.15" numOctaves="1" seed="${seed + 3}" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="6" xChannelSelector="R" yChannelSelector="G"/></filter>
</defs><rect width="${w}" height="${h}" filter="url(#stain)"/><rect width="${w}" height="${h}" filter="url(#grainK)"/><rect width="${w}" height="${h}" filter="url(#grainW)"/>${seams}${holes}</svg>
<div class="layer light"></div>
<div class="stencil"><svg class="eye" viewBox="0 0 120 60"><path d="M4 30 C30 4 90 4 116 30 C90 56 30 56 4 30Z" fill="none" stroke="${CYAN}" stroke-width="6"/><circle cx="60" cy="30" r="15" fill="${CYAN}"/><circle cx="60" cy="30" r="6" fill="${NAVY}"/><path d="M2 18 L38 6" stroke="${CYAN}" stroke-width="6" stroke-linecap="round"/></svg><span>SEG</span></div>
<div class="copy"><div class="ln"><span class="sp fit" style="color:#fff;font-size: ${story ? 230 : 210}px">دفاترك فيها<i class="bl"></i></span></div><div class="ln"><span class="sp fit" style="color:${CYAN};font-size: ${story ? 230 : 210}px">حاجة مش<i class="bl"></i></span></div><div class="ln"><span class="sp fit" style="color:#fff;font-size: ${story ? 230 : 210}px">شايفها.<i class="bl"></i></span></div></div>
<span class="alarm" id="alarm">!</span>
<p class="demo">اكشفها قبل الإقفال</p>
<div class="cta"><span>فحص مجاني في دقائق</span><i>·</i><b>seg-audit.com</b></div><div class="mark">${signHTML(story ? 44 : 38)}</div>
<script>
for (const el of document.querySelectorAll('.sp')) { let px = parseFloat(el.style.fontSize); while (el.offsetWidth > ${w - 150} && px > 20) el.style.fontSize = (--px) + 'px'; }
let s = ${seed}; const r = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
for (const sp of document.querySelectorAll('.sp')) {
  const wd = sp.offsetWidth, base = sp.querySelector('.bl').offsetTop, fs = parseFloat(sp.style.fontSize);
  for (let i = 0, n = 2 + Math.floor(r() * 2); i < n; i++) { const d = document.createElement('i'); d.className = 'drip'; const dw = 3 + r() * 4;
    d.style.cssText = 'left:' + (wd * (0.08 + r() * 0.84)) + 'px;top:' + (base - fs * 0.1) + 'px;width:' + dw + 'px;height:' + (fs * (0.12 + r() * 0.32)) + 'px'; sp.appendChild(d); }
  for (let i = 0; i < 26; i++) { const d = document.createElement('i'); d.className = 'speck'; const z = 1.5 + r() * 4;
    d.style.cssText = 'left:' + (wd * r()) + 'px;top:' + (fs * (-0.15 + r() * 1.25)) + 'px;width:' + z + 'px;height:' + z + 'px;opacity:' + (0.3 + r() * 0.6); sp.appendChild(d); }
}
const last = document.querySelectorAll('.sp')[2].getBoundingClientRect(), a = document.getElementById('alarm');
a.style.fontSize = (last.height * 0.9) + 'px'; a.style.left = (last.left - last.height * 0.45) + 'px'; a.style.top = (last.top - last.height * 0.05) + 'px';
</script></body></html>`;
  return html;
}

// ---------------------------------------------------------------- 7b) pattern break: writing on the palm, v2
function handSvg() {
  const parts = [
    '<rect x="150" y="120" width="88" height="340" rx="44" transform="rotate(-8 194 450)"/>',
    '<rect x="250" y="66" width="92" height="390" rx="46" transform="rotate(-1 296 450)"/>',
    '<rect x="350" y="104" width="88" height="352" rx="44" transform="rotate(6 394 450)"/>',
    '<rect x="440" y="200" width="74" height="280" rx="37" transform="rotate(14 477 470)"/>',
    '<rect x="142" y="337" width="96" height="310" rx="48" transform="rotate(-34 190 620)"/>',
    '<rect x="146" y="360" width="364" height="230" rx="70"/>',
    '<path d="M152 430 C140 520 150 600 182 660 C200 700 206 760 208 860 L432 860 C436 760 452 700 482 646 C516 580 522 500 508 420 Z"/>',
    '<ellipse cx="214" cy="600" rx="82" ry="118"/>'
  ].join('');
  const creases = ['M318 428 C236 500 222 600 252 736', 'M508 474 C430 452 360 470 300 512', 'M196 500 C262 520 332 546 404 578',
    'M178 160 l30 -4 M276 118 l32 0 M376 152 l30 4 M462 252 l24 6', 'M162 300 l42 -6 M264 268 l42 -2 M366 278 l40 4 M452 354 l32 8'];
  return `<svg viewBox="0 0 600 940" width="100%" height="100%">
  <defs>
    <linearGradient id="skin" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="600" y2="860"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".7" stop-color="#EEF7F9"/><stop offset="1" stop-color="#DCEEF2"/></linearGradient>
    <radialGradient id="cup" cx="330" cy="560" r="190" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="rgba(13,27,62,.10)"/><stop offset="1" stop-color="rgba(13,27,62,0)"/></radialGradient>
    <filter id="soft" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#000" flood-opacity=".45"/></filter>
  </defs>
  <g filter="url(#soft)"><g fill="${CYAN}" stroke="${CYAN}" stroke-width="9" opacity=".6">${parts}</g><g fill="url(#skin)">${parts}</g></g>
  <ellipse cx="330" cy="560" rx="190" ry="160" fill="url(#cup)"/>
  <g stroke="rgba(13,27,62,.15)" stroke-width="4" stroke-linecap="round" fill="none">${creases.map((p) => `<path d="${p}"/>`).join('')}</g>
  <path d="M196 840 L444 840 L452 940 L188 940 Z" fill="#13224A"/><rect x="188" y="836" width="264" height="14" rx="4" fill="${CYAN}"/>
</svg>`;
}
function palm(kind) {
  const story = kind === 'story';
  const hw = story ? 860 : 500, hh = hw * 940 / 600, top = story ? 170 : 16;
  const capY = story ? 1530 : 800;
  const html = `<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><style>
@font-face{font-family:Cairo;src:url(data:font/woff2;base64,${CAIRO});font-weight:400 900}
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${INTER});font-weight:400 900}
*{box-sizing:border-box;margin: 0;padding: 0} html,body{width:100%;height:100%;overflow:hidden}
body{position:relative;direction:rtl;font-family:Cairo,sans-serif;color:#fff;background:radial-gradient(ellipse at 50% 35%, #1E3368 0%, ${NAVY} 60%, #081230 100%)}
.glow{position:absolute;inset:0;background:radial-gradient(circle at 50% ${story ? 34 : 38}%, rgba(27,183,205,.30), transparent 42%)}
.hand{position:absolute;left:${(1080 - hw) / 2}px;top:${top}px;width:${hw}px;height:${hh}px}
.ink{position:absolute;left:17%;right:11%;top:54%;transform:translateY(-50%) rotate(-9deg);text-align:center}
.ink .l{display:block;white-space:nowrap;font-family:Farisi,Cairo,serif;color:${NAVY};filter:url(#pen);line-height:1.15}
.ink .l1{font-size: ${hw * 0.16}px} .ink .l2{font-size: ${hw * 0.115}px}
.circle{position:absolute;left:4%;top:-26%;width:${hw * 0.12}px;height:${hw * 0.12}px;filter:url(#pen)}
.under{display:block;margin: 5px auto 0;width:66%;height:9px;border-radius:9px;background:${CYAN};filter:url(#pen);transform:rotate(1.5deg)}
.fade{position:absolute;left:0;right:0;top:${capY - (story ? 230 : 150)}px;height:${story ? 230 : 150}px;background:linear-gradient(to bottom, rgba(13,27,62,0), ${NAVY})}
.cap{position:absolute;right:64px;left:64px;top:${capY}px;text-align:center;font-weight:800;font-size: ${story ? 50 : 38}px;line-height:1.5}
.cap em{font-style:normal;color:${CYAN}}
.cta{position:absolute;right:64px;bottom:64px;display:flex;align-items:center;gap: 13px;height:${story ? 68 : 58}px;padding: 0 34px;border-radius:999px;background:${CYAN};color:${NAVY};font-weight:800;font-size: ${story ? 30 : 25}px;white-space:nowrap}
.cta b{font-family:Inter} .mark{position:absolute;${story ? 'right:64px;bottom:166px' : 'left:64px;bottom:76px'};display:flex;align-items:center;gap: 13px;direction:ltr}
.mark img{height:${story ? 40 : 34}px} .mark span{font: 800 ${story ? 30 : 26}px Inter;letter-spacing:.15em}
</style><body>
<svg width="0" height="0" style="position:absolute"><filter id="pen"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="3"/></filter></svg>
<div class="glow"></div>
<div class="hand">${handSvg()}<div class="ink">
  <svg class="circle" viewBox="0 0 60 60"><path d="M30 6 C48 5 56 20 54 33 C52 48 36 56 22 52 C8 48 4 32 9 20 C13 11 24 6 36 8" fill="none" stroke="${RED}" stroke-width="4" stroke-linecap="round"/><text x="30" y="40" text-anchor="middle" font-family="Cairo" font-weight="900" font-size="30" fill="${RED}">!</text></svg>
  <span class="l l1">راجع دفاترك</span><span class="l l2">قبل الإقفال</span><span class="under"></span></div></div>
<div class="fade"></div>
<p class="cap">الحاجة المهمة بتتكتب عشان ماتتنساش.<br><em>دفاترك أهم.</em></p>
<div class="cta"><span>فحص مجاني في دقائق</span><i>·</i><b>seg-audit.com</b></div><div class="mark">${signHTML(story ? 44 : 38)}</div>
</body></html>`;
  return html;
}

// ---------------------------------------------------------------- 8) the hawk's eye (vigilance)
function eye(kind) {
  const rows = Array.from({ length: 9 }, (_, i) => `<rect x="${-26 + (i % 2) * 4}" y="${-24 + i * 6}" width="${40 - (i % 3) * 8}" height="1.6" rx=".8" fill="rgba(255,255,255,.55)"/>`).join('');
  return page(kind, {
    eyebrow: '<b>Standard Enterprise Governance</b> · رقابة مستمرة',
    head: 'عين على دفاترك.<br><em>كل يوم.</em>',
    sub: 'مش مرة في السنة. SEG بيراجع باستمرار، ولكل ملاحظة دليلها.',
    visual: `<div class="eyebox"><svg viewBox="-122 -70 244 132">
        <defs><radialGradient id="iris" cx="0" cy="0" r="34" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#7FE3EF"/><stop offset=".55" stop-color="${CYAN}"/><stop offset="1" stop-color="#0E6F80"/></radialGradient>
          <clipPath id="lid"><path d="M-100 4 C-64 -50 64 -50 100 -6 C64 46 -64 50 -100 4Z"/></clipPath>
          <filter id="g"><feGaussianBlur stdDeviation="3"/></filter></defs>
        <path d="M-100 4 C-64 -50 64 -50 100 -6 C64 46 -64 50 -100 4Z" fill="rgba(255,255,255,.95)"/>
        <g clip-path="url(#lid)"><circle cx="6" cy="-2" r="34" fill="url(#iris)"/><g transform="translate(6 -2)" opacity=".9">${rows}<circle cx="13" cy="0" r="2.2" fill="${RED}"/></g>
          <circle cx="6" cy="-2" r="11" fill="${NAVY}"/><circle cx="-4" cy="-12" r="5" fill="#fff" opacity=".9"/></g>
        <path d="M-100 4 C-64 -50 64 -50 100 -6" fill="none" stroke="${NAVY}" stroke-width="5"/>
        <path d="M-108 -14 C-60 -62 40 -64 106 -30 L96 -22 C40 -50 -54 -50 -100 -6Z" fill="#fff"/>
        <path d="M100 -6 C112 4 116 14 108 26" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
        <circle cx="6" cy="-2" r="40" fill="none" stroke="${CYAN}" stroke-width="1" opacity=".5" filter="url(#g)"/>
      </svg><p class="cap"><span class="red-dot"></span>رصدها في دقائق · ${DEMO}</p></div>`,
    css: `.eyebox{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap: 2cqh}
      .eyebox svg{width:min(100cqw,170cqh);max-height:85cqh;filter:drop-shadow(0 0 4cqmin rgba(27,183,205,.35))}
      .cap{display:flex;align-items:center;gap: 1.4cqmin;font-weight:800;font-size: min(3.6cqmin,6cqh);color:rgba(255,255,255,.75)}`
  });
}

// ---------------------------------------------------------------- catalogue
const DESIGNS = [
  { slug: '1-loss-aversion', fn: loss, kinds: ['square', 'story', 'link'], principle: 'Loss aversion', note: 'الخسارة أثقل من المكسب: خطأ صغير اليوم يكبر حتى الإقفال. الدائرة تكبر مع الوقت، والأحمر نقطة البداية وشارة النهاية فقط. المبالغ مثال توضيحي.' },
  { slug: '2-curiosity-gap', fn: curiosity, kinds: ['square', 'story'], principle: 'Curiosity gap (Zeigarnik)', note: 'العقل لا يترك قائمة ناقصة: 5 بنود، 3 ظاهرة و2 مموّهة، والكشف الوحيد هو الفحص المجاني. البنود هي مؤشرات الفحص الحقيقية، بلا أرقام.' },
  { slug: '3-shocking-specificity', fn: shock, kinds: ['square', 'story', 'link'], principle: 'Shocking specificity', note: 'رقم دقيق محدد يُصدَّق ويُتذكَّر أكثر من وصف عام: خزينة بالسالب −18,747,106 ج.م، معلَّم «مثال توضيحي · داتا اختبارية». علامة السالب والنقطة فقط بالأحمر.' },
  { slug: '4-selectivity', fn: selectivity, kinds: ['square', 'story', 'link'], principle: 'Selectivity + closing window', note: `ندرة بلا أرقام (6 نوفمبر 2026، بدل «باقي X من 50» المسحوب): طلب عضوية تحت المراجعة، سطوره فاضية (مفيش متقدّم وهمي)، وختم «قيد المراجعة · فريق MFT» لا «مقبول»، وآخر موعد ${CLOSE.arShort} من site.config.js → founding.closesAt.` },
  { slug: '5-meta-authority', fn: authority, kinds: ['square', 'story', 'link'], principle: 'Meta authority', note: `السلطة من الدليل لا من الادعاء: المنصة التي تراجع نفسها، +${TESTS} اختبار آلي قبل كل تحديث (من كود المنصة، ${FACTS.measuredOn}). استُخدمت الصياغة المعتمدة بدل «الوحيدة» لأنها ادعاء تفضيل مطلق بلا دليل.` },
  { slug: '6-anchoring', fn: anchoring, kinds: ['square', 'story', 'link'], principle: 'Anchoring', note: 'المرساة السعرية: تكلفة مفاجأة الإقفال (+250,000 ج.م، مثال توضيحي) بجانب الفحص المجاني (0 ج.م) فيبدو القرار بديهيًا.' },
  { slug: '7a-pattern-break-graffiti', fn: graffiti, kinds: ['square', 'story'], principle: 'Pattern break: graffiti v2', note: 'كسر النمط في الـfeed: جرافيتي على خرسانة بإضاءة علوية، ورذاذ ونقاط طلاء، وستنسل عين SEG، وعلامة «!» حمراء صغيرة.' },
  // 7b-pattern-break-palm withdrawn 7 Nov 2026 (adversarial review): same clip-art hand as guerrilla/palm
  { slug: '8-hawk-eye', fn: eye, kinds: ['square', 'story', 'link'], principle: 'Vigilance: the hawk’s eye', note: 'عين الصقر (رمز MFT) كعنصر رقابة: قيود الدفتر منعكسة في القزحية، ونقطة حمراء صغيرة رصدتها العين. «عين على دفاترك. كل يوم.»' }
];

// ---------------------------------------------------------------- render
async function main() {
  const only = process.argv[2] || '';
  const browser = await chromium.launch({ channel: 'chrome', args: ['--disable-gpu'] });
  const enc = await browser.newPage();
  const written = [];
  for (const d of DESIGNS) for (const kind of d.kinds) {
    const [w, h] = SIZES[kind];
    const base = `psych-${d.slug}_ar_${kind}_${w}x${h}`;
    if (only && !base.includes(only)) continue;
    const p = await browser.newPage({ viewport: { width: w, height: h } });
    await p.setContent(d.fn(kind), { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(150);
    await p.screenshot({ type: 'png' }); // warm-up: Chrome 157 can return a half-painted first capture
    const png = (await p.screenshot({ type: 'png' })).toString('base64');
    await p.close();
    // Same encoders and qualities as scripts/launch-concepts.js.
    const [webp, jpg] = await enc.evaluate(async (src) => {
      const i = new Image(); i.src = 'data:image/png;base64,' + src; await i.decode();
      const c = document.createElement('canvas'); c.width = i.width; c.height = i.height; c.getContext('2d').drawImage(i, 0, 0);
      return [c.toDataURL('image/webp', 0.9), c.toDataURL('image/jpeg', 0.92)].map((x) => x.split(',')[1]);
    }, png);
    const dir = path.join(OUT, d.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${base}.webp`), Buffer.from(webp, 'base64'));
    fs.writeFileSync(path.join(dir, `${base}.jpg`), Buffer.from(jpg, 'base64'));
    written.push({ d, base, w, h });
    console.log('wrote', `${d.slug}/${base}`);
  }
  await browser.close();

  if (!only) {
    const html = `<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SEG persuasion pack</title>
<style>body{margin: 0;padding: 34px 13px;background:#F5F7FA;color:#0D1B3E;font: 16px/1.6 system-ui,sans-serif}h1{font-size: 26px;margin: 0 0 5px}h2{font-size: 16px;margin: 34px 0 5px}.p{margin: 0 0 13px;color:#3B4262;max-width:80ch}.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap: 21px;align-items:start}figure{margin: 0;background:#fff;border:1px solid #E6E9F0;border-radius:6px;padding: 8px}img{display:block;width:100%;height:auto}figcaption{font-size: 13px;margin-top: 8px;word-break:break-all;direction:ltr;text-align:left}.k{display:inline-block;font-size: 13px;font-weight:700;color:#0F7C91;direction:ltr}</style>
<h1>Standard Enterprise Governance (SEG): حزمة علم نفس الإقناع</h1><p class="p">مولَّدة بالكود عبر scripts/psych-ads.js. navy وcyan وأبيض، وأحمر إنذار #C0392B لعلامات الخطر الصغيرة فقط، بلا ذهبي. كل الأرقام داتا اختبارية معلَّمة «مثال توضيحي»، ما عدا تاريخ إغلاق سعر المؤسِّس (site.config.js) وعدد الاختبارات (من كود المنصة). بلا أرقام مقاعد ولا سعر رقمي.</p>
${DESIGNS.map((d) => `<h2>${d.slug} <span class="k">${d.principle}</span></h2><p class="p">${d.note}</p><div class="g">${written.filter((x) => x.d === d).map((x) => `<figure><img loading="lazy" src="${d.slug}/${x.base}.webp" alt="${x.base}"><figcaption>${d.slug}/${x.base}.jpg · ${x.w}×${x.h}</figcaption></figure>`).join('')}</div>`).join('\n')}`;
    fs.writeFileSync(path.join(OUT, 'index.html'), html);
    console.log(`${written.length} designs × 2 formats`);
  }
}

if (require.main === module) main();
module.exports = { DESIGNS };
