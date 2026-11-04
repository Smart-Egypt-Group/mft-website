#!/usr/bin/env node
// SEG Audit launch week, day-3 prep (CEO, 4 Nov 2026), rendered into marketing/designs/launch-week/
// and copied to src/assets/social/ for direct public links. Square 1080×1080 and story 1080×1920.
//   demo-report   an illustrative SEG Audit report screen: risk level, critical / high / medium
//                 findings, each with its evidence. Entirely fictional data on a model company, marked
//                 «عرض توضيحي · داتا اختبارية». Nothing from the production app.
//   live-invite   the live broadcast invite: Tuesday 10 November 2026, 19:00 Cairo.
// Brand: navy, cyan, white; alarm red #C0392B only for small risk marks (severity chips, the live dot).
// No gold, no amber. Arabic RTL. CTA «فحص مجاني في دقائق · seg-audit.com» and the MFT mark.
// Needs Playwright + Google Chrome:  PLAYWRIGHT_PATH=<path to playwright> node scripts/launch-week-assets.js [filter]
const fs = require('fs');
const path = require('path');

let chromium;
try { ({ chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright')); }
catch { console.error('playwright not found. npm i -D playwright, or set PLAYWRIGHT_PATH.'); process.exit(1); }

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'marketing/designs/launch-week');
const PUB = path.join(ROOT, 'src/assets/social');
const b64 = (f) => fs.readFileSync(path.join(ROOT, f)).toString('base64');
const MARK = 'data:image/png;base64,' + b64('src/assets/logo/mft-mark-white.png');
const CAIRO = b64('src/assets/fonts/cairo-arabic-var.woff2');
const INTER = b64('src/assets/fonts/inter-latin-var.woff2');
const NAVY = '#0D1B3E', CYAN = '#1BB7CD', RED = '#C0392B';
const SIZES = { square: [1080, 1080], story: [1080, 1920] };
const DEMO = 'عرض توضيحي · داتا اختبارية';

const BASE = `
@font-face{font-family:Cairo;src:url(data:font/woff2;base64,${CAIRO});font-weight:400 900}
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${INTER});font-weight:400 900}
*{box-sizing:border-box;margin:0;padding:0} html,body{width:100%;height:100%;overflow:hidden}
body{position:relative;direction:rtl;font-family:Cairo,sans-serif;color:#fff;background:radial-gradient(ellipse at 70% 10%, #1C2F63 0%, ${NAVY} 55%, #081230 100%)}
.lat{font-family:Inter;direction:ltr;unicode-bidi:isolate}
.foot{position:absolute;inset-inline:64px;bottom:60px;display:flex;justify-content:space-between;align-items:center}
.cta{display:flex;align-items:center;gap:14px;padding:0 28px;border-radius:999px;background:${CYAN};color:${NAVY};font-weight:800;white-space:nowrap}
.cta b{font-family:Inter} .mark{display:flex;align-items:center;gap:12px;direction:ltr} .mark span{font:800 1em Inter;letter-spacing:.15em}`;
const foot = (story) => `<div class="foot" style="font-size:${story ? 30 : 25}px"><div class="cta" style="height:${story ? 68 : 58}px"><span>فحص مجاني في دقائق</span><i>·</i><b>seg-audit.com</b></div><div class="mark"><img src="${MARK}" style="height:${story ? 40 : 34}px" alt=""><span>MFT</span></div></div>`;

// ---------------------------------------------------------------- demo report screen
function demoReport(kind) {
  const story = kind === 'story';
  const L = (x) => `<span class="lat">${x}</span>`; // codes and amounts keep their own (LTR) order inside Arabic
  const findings = [
    ['c', 'حرجة', 'خزينة برصيد دائن', `الخزينة الرئيسية (${L('1101')}) رصيدها ${L('−184,250')} في ${L('31')} أكتوبر.`, `الدليل: قيد ${L('JE-1047')} · ${L('28')} أكتوبر · صرف نقدي بلا مستند`],
    ['c', 'حرجة', 'دفعة مكررة لنفس المورّد', `دفعتان بنفس المبلغ ${L('46,800')} لنفس الفاتورة.`, `الدليل: ${L('PAY-0332')} و ${L('PAY-0339')} · فاتورة ${L('BILL-2210')}`],
    ['h', 'عالية', 'مورّد متسجّل باسمين', 'اسمان متقاربان بنفس الحساب البنكي.', `الدليل: المورّد ${L('V-118')} و ${L('V-131')} · نفس ${L('IBAN')}`],
    ['h', 'عالية', 'قيد بتاريخ رجعي بعد الإقفال', `قيد يدوي بتاريخ سبتمبر سُجِّل في ${L('3')} أكتوبر.`, `الدليل: قيد ${L('JE-0981')} · أنشأه مستخدم خارج فريق الحسابات`],
    ['m', 'متوسطة', 'حساب معلّق بلا تسوية', `رصيد ${L('12,400')} في حساب وسيط منذ ${L('4')} شهور.`, `الدليل: حساب ${L('2190')} · آخر حركة ${L('30')} يونيو`]
  ];
  const shown = story ? findings.slice(0, 4) : findings.slice(0, 3);
  const css = `
.top{position:absolute;inset-inline:64px;top:${story ? 130 : 52}px;display:flex;flex-direction:column;gap:${story ? 22 : 14}px}
.eyebrow{font-weight:800;color:${CYAN};font-size:${story ? 30 : 24}px} .eyebrow b{font-family:Inter}
h1{font-weight:900;font-size:${story ? 76 : 50}px;line-height:1.2} h1 em{font-style:normal;color:${CYAN}}
.ribbon{align-self:flex-start;display:flex;align-items:center;gap:10px;font-weight:900;font-size:${story ? 28 : 22}px;color:${NAVY};background:#fff;border-radius:999px;padding:6px 20px}
.ribbon::before{content:'';width:12px;height:12px;border-radius:50%;background:${CYAN}}
.screen{position:absolute;inset-inline:64px;top:${story ? 560 : 336}px;bottom:${story ? 170 : 146}px;background:#F5F7FA;color:${NAVY};border-radius:22px;overflow:hidden;box-shadow:0 30px 70px rgba(0,0,0,.45);display:flex;flex-direction:column}
.bar{display:flex;align-items:center;justify-content:space-between;background:${NAVY};color:#fff;padding:${story ? '20px 30px' : '14px 24px'};font-size:${story ? 24 : 18}px}
.bar .app{display:flex;align-items:center;gap:10px;font-weight:800} .bar .app img{height:${story ? 28 : 22}px}
.bar .co{opacity:.8;font-weight:600}
.wm{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none}
.wm span{transform:rotate(-24deg);font-weight:900;font-size:${story ? 92 : 70}px;color:rgba(13,27,62,.06);white-space:nowrap}
.body{flex:1;display:flex;flex-direction:column;gap:${story ? 20 : 11}px;padding:${story ? '26px 30px' : '14px 22px'}}
.risk{display:flex;align-items:center;gap:${story ? 22 : 16}px}
.level{flex:0 0 auto;display:flex;flex-direction:column;gap:2px;padding:${story ? '18px 24px' : '8px 18px'};border-radius:16px;background:#fff;border:1px solid #E6E9F0}
.level small{font-size:${story ? 20 : 15}px;color:#5A6483;font-weight:700} .level b{font-size:${story ? 38 : 28}px;font-weight:900;color:${RED}}
.cnt{flex:1;display:grid;grid-template-columns:repeat(3,1fr);gap:${story ? 14 : 10}px}
.cnt div{background:#fff;border:1px solid #E6E9F0;border-radius:16px;padding:${story ? '14px' : '6px'};text-align:center}
.cnt b{display:block;font-family:Inter;font-weight:900;font-size:${story ? 46 : 32}px;line-height:1.1}
.cnt span{font-size:${story ? 20 : 15}px;font-weight:700;color:#5A6483}
.cnt .c b{color:${RED}} .cnt .h b{color:${NAVY}} .cnt .m b{color:#0F7C91}
.f{background:#fff;border:1px solid #E6E9F0;border-radius:16px;padding:${story ? '18px 22px' : '10px 16px'};display:flex;flex-direction:column;gap:${story ? 6 : 2}px}
.f .row{display:flex;align-items:center;gap:12px}
.chip{flex:0 0 auto;font-weight:800;font-size:${story ? 19 : 14}px;border-radius:999px;padding:2px 14px;border:2px solid}
.chip.c{background:${RED};border-color:${RED};color:#fff} .chip.h{border-color:${RED};color:${RED}} .chip.m{border-color:${CYAN};color:#0F7C91}
.f .t{font-weight:900;font-size:${story ? 28 : 21}px}
.f .d{font-size:${story ? 22 : 16}px;color:#3B4262;font-weight:600}
.f .e{font-size:${story ? 20 : 15}px;color:#0F7C91;font-weight:700;display:flex;gap:8px;align-items:center}
.f .e::before{content:'';flex:0 0 auto;width:${story ? 18 : 14}px;height:${story ? 18 : 14}px;border-radius:4px;border:2px solid #0F7C91}
.draft{margin-top:auto;font-size:${story ? 19 : 14}px;color:#5A6483;font-weight:700;text-align:center}`;
  const body = `
<div class="top"><p class="eyebrow"><b>Standard Enterprise Governance</b> · شاشة تقرير</p>
  <h1>شوف SEG بيكشف إيه<br>في دفاتر شركة <em>نموذجية</em>.</h1>
  <span class="ribbon">${DEMO}</span></div>
<div class="screen">
  <div class="bar"><span class="app"><img src="${MARK}" alt=""><span class="lat">SEG Audit</span></span><span class="co">شركة النموذج للتوزيع (اسم وهمي) · أكتوبر 2026</span></div>
  <div class="body">
    <div class="risk"><div class="level"><small>مستوى المخاطر</small><b>مرتفع</b></div>
      <div class="cnt"><div class="c"><b>2</b><span>حرجة</span></div><div class="h"><b>4</b><span>عالية</span></div><div class="m"><b>6</b><span>متوسطة</span></div></div></div>
    ${shown.map(([k, lbl, t, d, e]) => `<div class="f"><div class="row"><span class="chip ${k}">${lbl}</span><span class="t">${t}</span></div><p class="d">${d}</p><p class="e">${e}</p></div>`).join('')}
    <p class="draft">مسودة حتى يعتمدها مراجع من MFT باسمه · كل الأسماء والأرقام وهمية</p>
  </div>
  <div class="wm"><span>${DEMO}</span></div>
</div>
${foot(story)}`;
  return `<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><style>${BASE}${css}</style><body>${body}</body></html>`;
}

// ---------------------------------------------------------------- live invite card
function liveInvite(kind) {
  const story = kind === 'story';
  const css = `
.wrap{position:absolute;inset-inline:64px;top:${story ? 170 : 70}px;display:flex;flex-direction:column;gap:${story ? 34 : 20}px}
.live{align-self:flex-start;display:flex;align-items:center;gap:12px;font-weight:900;font-size:${story ? 32 : 26}px;padding:8px 24px;border-radius:999px;border:2px solid rgba(255,255,255,.35)}
.live i{width:${story ? 18 : 15}px;height:${story ? 18 : 15}px;border-radius:50%;background:${RED};box-shadow:0 0 0 6px rgba(192,57,43,.25)}
h1{font-weight:900;font-size:${story ? 86 : 62}px;line-height:1.2} h1 em{font-style:normal;color:${CYAN}}
.sub{font-weight:700;font-size:${story ? 34 : 26}px;color:rgba(255,255,255,.8);line-height:1.5}
.when{display:flex;gap:${story ? 26 : 20}px;align-items:stretch}
.cal{flex:0 0 auto;width:${story ? 240 : 190}px;border-radius:22px;overflow:hidden;background:#fff;color:${NAVY};text-align:center;box-shadow:0 20px 50px rgba(0,0,0,.4)}
.cal .m{background:${CYAN};color:${NAVY};font-weight:900;font-size:${story ? 32 : 26}px;padding:8px 0}
.cal .d{font-family:Inter;font-weight:900;font-size:${story ? 120 : 92}px;line-height:1.1}
.cal .w{font-weight:800;font-size:${story ? 28 : 22}px;padding-bottom:12px;color:#3B4262}
.info{flex:1;display:flex;flex-direction:column;justify-content:center;gap:${story ? 14 : 8}px;border-radius:22px;border:1.5px solid rgba(255,255,255,.18);background:rgba(255,255,255,.05);padding:${story ? '26px 30px' : '18px 24px'}}
.info .t{font-weight:900;font-size:${story ? 52 : 40}px} .info .t span{font-family:Inter}
.info .z{font-weight:700;font-size:${story ? 28 : 22}px;color:rgba(255,255,255,.75)}
.list{display:flex;flex-direction:column;gap:${story ? 14 : 8}px;font-weight:700;font-size:${story ? 32 : 24}px}
.list li{list-style:none;display:flex;gap:14px;align-items:center} .list li::before{content:'';width:12px;height:12px;border-radius:50%;background:${CYAN};flex:0 0 auto}
.demo{align-self:flex-start;font-weight:800;font-size:${story ? 26 : 20}px;color:${CYAN};border:1.5px solid rgba(27,183,205,.7);border-radius:999px;padding:4px 18px}
.reg{font-weight:800;font-size:${story ? 30 : 23}px;color:#fff}`;
  const body = `
<div class="wrap">
  <span class="live"><i></i>بث مباشر</span>
  <h1>ميزان المراجعة قبل الإقفال:<br><em>٥ نقاط خطر</em> تكشفها في دقائق.</h1>
  <div class="when">
    <div class="cal"><div class="m">نوفمبر 2026</div><div class="d">10</div><div class="w">الثلاثاء</div></div>
    <div class="info"><p class="t">٧ مساءً</p><p class="z">بتوقيت القاهرة · ٨ مساءً بتوقيت الرياض</p></div>
  </div>
  ${story ? `<ul class="list"><li>الحسابات المعلّقة والأرصدة الشاذة</li><li>القيود اليدوية الكثيفة والتواريخ الرجعية</li><li>إزاي تقرأ كل ملاحظة من دليلها</li></ul>` : ''}
  <span class="demo">عرض توضيحي على شركة نموذجية · داتا اختبارية</span>
  <p class="reg">سجّل من الحدث علشان يوصلك التذكير · الرابط في البايو</p>
</div>
${foot(story)}`;
  return `<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><style>${BASE}${css}</style><body>${body}</body></html>`;
}

const DESIGNS = [['demo-report', demoReport], ['live-invite', liveInvite]];

async function main() {
  const only = process.argv[2] || '';
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', args: ['--disable-gpu'] });
  const enc = await browser.newPage();
  for (const [slug, fn] of DESIGNS) for (const [kind, [w, h]] of Object.entries(SIZES)) {
    const base = `launch-${slug}_ar_${kind}_${w}x${h}`;
    if (only && !base.includes(only)) continue;
    const p = await browser.newPage({ viewport: { width: w, height: h } });
    await p.setContent(fn(kind), { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(150);
    const png = (await p.screenshot({ type: 'png' })).toString('base64');
    await p.close();
    const [webp, jpg] = await enc.evaluate(async (src) => {
      const i = new Image(); i.src = 'data:image/png;base64,' + src; await i.decode();
      const c = document.createElement('canvas'); c.width = i.width; c.height = i.height; c.getContext('2d').drawImage(i, 0, 0);
      return [c.toDataURL('image/webp', 0.9), c.toDataURL('image/jpeg', 0.92)].map((x) => x.split(',')[1]);
    }, png);
    fs.writeFileSync(path.join(OUT, `${base}.webp`), Buffer.from(webp, 'base64'));
    fs.writeFileSync(path.join(OUT, `${base}.jpg`), Buffer.from(jpg, 'base64'));
    fs.copyFileSync(path.join(OUT, `${base}.jpg`), path.join(PUB, `${base}.jpg`));
    console.log('wrote', base);
  }
  await browser.close();
}

if (require.main === module) main();
