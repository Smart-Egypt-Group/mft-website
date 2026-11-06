#!/usr/bin/env node
// Standard Enterprise Governance (SEG) Reels, cinematic cut (CEO brief, 4 Nov 2026): six internal-audit
// scenarios × Arabic and English, 1080×1920, 30 fps, 34 s, H.264 High + AAC 48 kHz stereo with a
// synthesised, license-free soundtrack (scripts/reels-audio.js). Rendered into marketing/designs/video/ and
// copied to src/assets/social/video/ for direct public links.
//
// Story per reel: the pain (with the key figure) → why the annual audit misses it → SEG flags it at once,
// with an evidence reveal (zoom onto the matched line + the evidence note) → the control → end card
// «Standard Enterprise Governance — المنصة التي تراجع نفسها» + the free-check CTA + the MFT mark.
// Motion: spring and expo easing, parallax background layers, a slow camera drift, word-by-word kinetic
// type, soft-focus scene transitions with a light sweep in the reading direction.
// Every scenario maps to a check in the platform code (Smart-Egypt-Group/seg-audit,
// audit-engine/app/analysis): red_flags.duplicate_payments; je_closing JE_POST_CLOSE / JE_BACKDATED;
// standards.uncleared_suspense; red_flags GHOST_VENDOR (needs the Employees app; worded as an indicator to
// review, never an accusation); gl_integrity round manual entries; expenses without an attachment.
// Data rule (CEO): every name, code and figure is test data on a model company, marked
// «مثال توضيحي · داتا اختبارية».
// Encoding: Chrome WebCodecs (no ffmpeg on this machine); loudness normalised in code to -16 LUFS
// (EBU R128 gating) with a -1.5 dBFS peak ceiling; MP4 written by scripts/tiktok-videos.js → mp4().
// Needs Playwright + Google Chrome:  PLAYWRIGHT_PATH=<path to playwright> node scripts/reels-cinematic.js [filter]
const fs = require('fs');
const os = require('os');
const path = require('path');

let chromium;
try { ({ chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright')); }
catch { console.error('playwright not found. npm i -D playwright, or set PLAYWRIGHT_PATH.'); process.exit(1); }
const { mp4 } = require('./tiktok-videos.js');
const { synth, SR } = require('./reels-audio.js');

const { signHTML, COPY: KC } = require('./lib/campaign.js');
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'marketing/designs/video');
const PUB = path.join(ROOT, 'src/assets/social/video');
const b64 = (f) => fs.readFileSync(path.join(ROOT, f)).toString('base64');
const MARK = 'data:image/png;base64,' + b64('src/assets/logo/mft-mark-white.png');
const CAIRO = b64('src/assets/fonts/cairo-arabic-var.woff2');
const INTER = b64('src/assets/fonts/inter-latin-var.woff2');
const W = 1080, H = 1920, FPS = 30, TOTAL = 34;
const NAVY = '#0D1B3E', CYAN = '#1BB7CD', RED = '#C0392B';
// Scene windows (seconds)
const T = { hook: [0, 5], why: [5, 12], ev: [12, 24], ctl: [24, 29], cta: [29, TOTAL] };

// ---------------------------------------------------------------- copy
const UI = {
  ar: { dir: 'rtl', chapters: ['المشكلة', 'ليه بتعدّي', 'إزاي بتتكشف', 'الضابط'], why: 'ليه المراجعة السنوية بتفوّتها؟',
    ev: '<span class="lat">Standard Enterprise Governance</span> بيكشفها فورًا، بدليلها', ctl: 'اللي المفروض يتعمل', demo: 'مثال توضيحي · داتا اختبارية',
    company: 'شركة النموذج للتوزيع (اسم وهمي)', cta1: 'فحص مجاني لميزان شركتك', cta2: 'في دقائق', brand: 'Standard Enterprise Governance' },
  en: { dir: 'ltr', chapters: ['The problem', 'Why it slips', 'How it’s caught', 'The control'], why: 'Why the annual audit misses it',
    ev: 'Standard Enterprise Governance flags it at once, with its evidence', ctl: 'The control', demo: 'Illustrative example · test data',
    company: 'Model Distribution Co. (fictional)', cta1: 'A free check of your trial balance', cta2: 'in minutes', brand: 'Standard Enterprise Governance' }
};
const SC = {
  'duplicate-payment': {
    ar: { hook: 'نفس فاتورة المورّد<br><em>اتدفعت مرتين.</em>', hookSub: 'ومحدش لاحظ.',
      why: ['المراجعة السنوية بتختبر عيّنة من الدفعات، مش كلها.', 'الدفعة التانية برقم مرجع مختلف شوية: <b>INV-2210</b> و <b>INV2210-A</b>.', 'بين الدفعتين ١٩ يوم، في فترتين محاسبيتين.'],
      ev: { title: 'دفعة مكررة لنفس المورّد', sev: ['c', 'حرجة'], kind: 'table', cols: ['الدفعة', 'التاريخ', 'المرجع', 'المبلغ'],
        rows: [['PAY-0332', '12 أكتوبر', 'INV-2210', '46,800'], ['PAY-0359', '31 أكتوبر', 'INV2210-A', '46,800']], hi: [2, 3],
        chips: ['نفس المورّد: V-118', 'نفس المبلغ', 'مرجع متطابق 92%'], foot: 'الدليل: المورّد V-118 · الفاتورة BILL-2210 · قيدا السداد' },
      ctl: ['منع تكرار رقم فاتورة المورّد في Odoo.', 'مطابقة ثلاثية قبل الصرف: أمر الشراء والاستلام والفاتورة.', 'استرداد الدفعة الزائدة، ومراجعة دفعات المورّد آخر ١٢ شهر.'] },
    en: { hook: 'The same supplier bill<br><em>was paid twice.</em>', hookSub: 'And nobody noticed.',
      why: ['The annual audit tests a sample of payments, not all of them.', 'The second payment carries a slightly different reference: <b>INV-2210</b> and <b>INV2210-A</b>.', 'The two payments are 19 days apart, in two accounting periods.'],
      ev: { title: 'Duplicate payment to one supplier', sev: ['c', 'Critical'], kind: 'table', cols: ['Payment', 'Date', 'Reference', 'Amount'],
        rows: [['PAY-0332', '12 Oct', 'INV-2210', '46,800'], ['PAY-0359', '31 Oct', 'INV2210-A', '46,800']], hi: [2, 3],
        chips: ['Same supplier: V-118', 'Same amount', 'Reference 92% match'], foot: 'Evidence: supplier V-118 · bill BILL-2210 · both payment entries' },
      ctl: ['Block duplicate supplier bill numbers in Odoo.', 'Three-way match before payment: PO, receipt and bill.', 'Recover the overpayment and review that supplier’s last 12 months.'] }
  },
  'post-close-entry': {
    ar: { hook: 'قيد بتاريخ سبتمبر…<br><em>اتسجّل بعد إقفال سبتمبر.</em>', hookSub: 'والقوائم كانت اتعتمدت.',
      why: ['القوائم الشهرية اتعتمدت قبل ما القيد يتسجّل.', 'المراجع بيشوف الأرصدة النهائية، مش تاريخ إنشاء كل قيد.', 'القيد يدوي، وعمله مستخدم من خارج فريق الحسابات.'],
      ev: { title: 'قيد بعد إقفال الفترة', sev: ['h', 'عالية'], kind: 'kv',
        rows: [['القيد', 'JE-0981'], ['تاريخ القيد', '28 سبتمبر'], ['تاريخ الإنشاء', '3 أكتوبر'], ['إقفال سبتمبر', '30 سبتمبر'], ['أنشأه', 'user.sales'], ['الحساب · المبلغ', '4100 إيرادات · 120,000']], hi: [2, 4],
        chips: ['بعد الإقفال بـ3 أيام', 'تاريخ رجعي 5 أيام', 'مستخدم خارج الدور'], foot: 'الدليل: تاريخ الإنشاء في سجل Odoo مقابل تاريخ القيد' },
      ctl: ['تاريخ قفل (Lock date) على كل فترة بعد اعتمادها.', 'القيود اليدوية للمحاسبين فقط.', 'مراجعة كل قيد اتسجّل بعد الإقفال قبل اعتماد القوائم.'] },
    en: { hook: 'An entry dated September…<br><em>posted after September closed.</em>', hookSub: 'The statements were already approved.',
      why: ['The monthly statements were approved before the entry was posted.', 'The auditor sees final balances, not when each entry was created.', 'It is a manual entry, made by a user outside the finance team.'],
      ev: { title: 'Entry posted after the period close', sev: ['h', 'High'], kind: 'kv',
        rows: [['Entry', 'JE-0981'], ['Entry date', '28 Sep'], ['Created on', '3 Oct'], ['September close', '30 Sep'], ['Created by', 'user.sales'], ['Account · amount', '4100 Revenue · 120,000']], hi: [2, 4],
        chips: ['3 days after close', 'Backdated 5 days', 'User outside the role'], foot: 'Evidence: creation date in the Odoo log vs the entry date' },
      ctl: ['A lock date on every period once it is approved.', 'Manual entries for accountants only.', 'Review every post-close entry before the statements are approved.'] }
  },
  'suspense-account': {
    ar: { hook: 'حساب وسيط<br><em>بيكبر كل شهر.</em>', hookSub: 'وكل فرق بيستخبى فيه.',
      why: ['رصيده صغير جنب إجمالي الميزانية، فمش بيلفت النظر.', 'الحركات بتقابل بعضها، فالصافي شكله طبيعي.', 'محدش بيحلّل أعمار الأرصدة جوّه الحساب.'],
      ev: { title: 'حساب وسيط بلا تسوية', sev: ['h', 'عالية'], kind: 'bars', bars: [['يونيو', 12400], ['يوليو', 29800], ['أغسطس', 47100], ['سبتمبر', 63900], ['أكتوبر', 86250]],
        chips: ['متراكم 5 شهور', '71% أقدم من 90 يوم', 'أقدم بند: 30 يونيو'], foot: 'الدليل: حساب 2190 · 37 حركة بلا تسوية' },
      ctl: ['تسوية شهرية للحساب الوسيط، وبحد أقصى ٣٠ يوم لكل بند.', 'مسؤول باسمه عن كل بند مفتوح.', 'أي رصيد أقدم من ٦٠ يوم يوصل للمدير المالي.'] },
    en: { hook: 'A suspense account<br><em>that grows every month.</em>', hookSub: 'And every difference hides in it.',
      why: ['Its balance looks small next to the balance sheet total.', 'Movements offset each other, so the net looks normal.', 'Nobody ages the items inside the account.'],
      ev: { title: 'Uncleared suspense account', sev: ['h', 'High'], kind: 'bars', bars: [['Jun', 12400], ['Jul', 29800], ['Aug', 47100], ['Sep', 63900], ['Oct', 86250]],
        chips: ['Building for 5 months', '71% older than 90 days', 'Oldest item: 30 Jun'], foot: 'Evidence: account 2190 · 37 uncleared movements' },
      ctl: ['Clear the suspense account monthly, 30 days at most per item.', 'A named owner for every open item.', 'Anything older than 60 days goes to the CFO.'] }
  },
  'ghost-vendor': {
    ar: { hook: 'الحساب البنكي للمورّد…<br><em>هو حساب موظف عندك.</em>', hookSub: 'مؤشر يستدعي فحصًا، مش اتهام.',
      why: ['بيانات المورّدين في ملف، والموظفين في ملف تاني.', 'المراجعة بتختبر الدفعات، مش البيانات الرئيسية.', 'تعديل بنك المورّد اتعمل قبل الدفعات بأسبوع.'],
      ev: { title: 'حساب مورّد مطابق لحساب موظف', sev: ['c', 'حرجة'], kind: 'pair',
        pair: [['المورّد V-131', 'IBAN EG38 •••• 4417', 'عُدّل 21 سبتمبر'], ['الموظف E-027', 'IBAN EG38 •••• 4417', 'قسم المشتريات']],
        chips: ['IBAN متطابق', 'التعديل قبل الدفعات بـ7 أيام', '3 دفعات بعده: 148,500'], foot: 'مؤشر يستدعي فحصًا، وليس اتهامًا · الدليل: الحسابات البنكية وسجل التعديل' },
      ctl: ['مطابقة حسابات المورّدين البنكية مع حسابات الرواتب شهريًا.', 'اعتماد ثنائي لأي تعديل في بيانات بنك المورّد.', 'فصل المهام: اللي بيضيف المورّد ما يعتمدش الدفع.'] },
    en: { hook: 'Your supplier’s bank account…<br><em>is one of your employees’.</em>', hookSub: 'An indicator to review, not an accusation.',
      why: ['Supplier data lives in one file, employee data in another.', 'The audit tests payments, not master data.', 'The supplier’s bank details changed a week before the payments.'],
      ev: { title: 'Supplier account matches an employee’s', sev: ['c', 'Critical'], kind: 'pair',
        pair: [['Supplier V-131', 'IBAN EG38 •••• 4417', 'Changed 21 Sep'], ['Employee E-027', 'IBAN EG38 •••• 4417', 'Purchasing']],
        chips: ['Matching IBAN', 'Changed 7 days before payments', '3 payments since: 148,500'], foot: 'An indicator to review, not an accusation · Evidence: bank accounts and the change log' },
      ctl: ['Match supplier bank accounts against payroll accounts monthly.', 'Two-person approval for any supplier bank change.', 'Segregation: whoever adds a supplier does not approve its payments.'] }
  },
  'round-manual': {
    ar: { hook: 'قيود يدوية<br><em>بأرقام مستديرة.</em>', hookSub: 'في آخر يومين من الشهر.',
      why: ['القيود اليدوية قليلة وسط آلاف القيود الآلية.', 'الرقم المستدير شكله تقدير عادي، مش لافت.', 'آخر الشهر ضغط إقفال، والمراجعة بعدها بشهور.'],
      ev: { title: 'قيود يدوية مستديرة في الإقفال', sev: ['h', 'عالية'], kind: 'table', cols: ['القيد', 'التاريخ', 'البيان', 'المبلغ'],
        rows: [['JE-1101', '30 أكتوبر', 'مخصص ديون', '50,000.00'], ['JE-1102', '31 أكتوبر', 'مصروف مستحق', '100,000.00'], ['JE-1104', '31 أكتوبر', 'تسوية مخزون', '25,000.00']], hi: [1, 3],
        chips: ['مبالغ مستديرة', 'آخر يومين', 'بلا مستند مرفق'], foot: 'الدليل: 68% من قيمة القيود اليدوية في آخر يومين' },
      ctl: ['مستند داعم إلزامي لأي قيد يدوي فوق حد معيّن.', 'اعتماد مستوى أعلى لقيود الإقفال.', 'مقارنة التقديرات بالفعلي في الشهر التالي.'] },
    en: { hook: 'Manual entries<br><em>in round amounts.</em>', hookSub: 'In the last two days of the month.',
      why: ['Manual entries are few among thousands of automatic ones.', 'A round figure looks like an ordinary estimate.', 'Month end is close pressure, and the audit comes months later.'],
      ev: { title: 'Round manual entries at close', sev: ['h', 'High'], kind: 'table', cols: ['Entry', 'Date', 'Label', 'Amount'],
        rows: [['JE-1101', '30 Oct', 'Bad-debt provision', '50,000.00'], ['JE-1102', '31 Oct', 'Accrued expense', '100,000.00'], ['JE-1104', '31 Oct', 'Stock adjustment', '25,000.00']], hi: [1, 3],
        chips: ['Round amounts', 'Last two days', 'No document attached'], foot: 'Evidence: 68% of manual-entry value in the last two days' },
      ctl: ['A supporting document for every manual entry above a threshold.', 'Senior approval for closing entries.', 'Compare estimates with actuals the following month.'] }
  },
  'no-receipt': {
    ar: { hook: 'مصروفات معتمدة…<br><em>بلا إيصال واحد.</em>', hookSub: 'ضيافة وسفر وعمولات.',
      why: ['كل مطالبة لوحدها مبلغ صغير.', 'المصروفات متوزعة على موظفين وحسابات كتير.', 'العيّنة السنوية نادرًا ما تختارها.'],
      ev: { title: 'مطالبات مصروفات معتمدة بلا مستند', sev: ['m', 'متوسطة'], kind: 'stat', stat: ['74%', 'من المطالبات المعتمدة بلا مرفق'],
        rows: [['ضيافة عملاء', '23 مطالبة', '21 بلا مرفق'], ['سفر وانتقالات', '11 مطالبة', '6 بلا مرفق'], ['عمولات وسطاء', '8 مطالبات', '4 بلا مرفق']],
        chips: ['31 من 42 بلا مستند', 'بنود حساسة', 'اعتماد بلا مرفق'], foot: 'الدليل: المطالبات المعتمدة بلا مرفق في Odoo' },
      ctl: ['مرفق إلزامي قبل اعتماد أي مطالبة.', 'سقف واضح للمطالبة بلا إيصال.', 'مراجعة شهرية لنسبة التغطية المستندية.'] },
    en: { hook: 'Approved expenses…<br><em>without a single receipt.</em>', hookSub: 'Hospitality, travel and commissions.',
      why: ['Each claim on its own is a small amount.', 'Expenses are spread across many people and accounts.', 'The annual sample rarely picks them.'],
      ev: { title: 'Approved expense claims with no document', sev: ['m', 'Medium'], kind: 'stat', stat: ['74%', 'of approved claims have no attachment'],
        rows: [['Client hospitality', '23 claims', '21 without'], ['Travel', '11 claims', '6 without'], ['Broker commissions', '8 claims', '4 without']],
        chips: ['31 of 42 undocumented', 'Sensitive items', 'Approved without attachment'], foot: 'Evidence: approved claims with no attachment in Odoo' },
      ctl: ['An attachment required before any claim is approved.', 'A clear cap for claims without a receipt.', 'A monthly review of documentation coverage.'] }
  }
};


// The key figure of each scenario, shown with an impact in the hook (test data).
const KEY = {
  'duplicate-payment': { ar: ['46,800 × 2', 'نفس المبلغ، نفس الفاتورة'], en: ['46,800 × 2', 'Same amount, same bill'] },
  'post-close-entry': { ar: ['+3 أيام', 'بعد إقفال الفترة'], en: ['+3 days', 'after the period closed'] },
  'suspense-account': { ar: ['12,400 → 86,250', 'في 5 شهور'], en: ['12,400 → 86,250', 'in 5 months'] },
  'ghost-vendor': { ar: ['IBAN = IBAN', 'مورّد وموظف'], en: ['IBAN = IBAN', 'supplier and employee'] },
  'round-manual': { ar: ['68%', 'من قيمة القيود اليدوية في آخر يومين'], en: ['68%', 'of manual-entry value in the last two days'] },
  'no-receipt': { ar: ['74%', 'من المطالبات المعتمدة بلا مرفق'], en: ['74%', 'of approved claims with no attachment'] }
};
const END = { ar: ['Standard Enterprise Governance', 'المنصة التي تراجع نفسها'], en: ['Standard Enterprise Governance', 'The platform that audits itself'] };

// ---------------------------------------------------------------- evidence card
function evidence(ev, U) {
  const z0 = T.ev[0] + 3.0; // zoom onto the matched line
  const sev = `<span class="sev ${ev.sev[0]} pop" data-at="${T.ev[0] + 7.6}">${ev.sev[1]}</span>`;
  let body = '';
  if (ev.kind === 'table') {
    body = `<table><thead><tr>${ev.cols.map((c, i) => `<th class="${ev.hi.includes(i) ? 'hc' : ''}">${c}</th>`).join('')}</tr></thead><tbody>${ev.rows.map((r, k) =>
      `<tr data-at="${T.ev[0] + 1.1 + k * 0.4}" ${k === ev.rows.length - 1 ? 'data-focus' : ''}>${r.map((v, i) => `<td class="${ev.hi.includes(i) ? 'hl' : ''}" ${ev.hi.includes(i) ? `data-hl="${z0 + 0.3 + i * 0.25}"` : ''}><span class="lat">${v}</span></td>`).join('')}</tr>`).join('')}</tbody></table>`;
  } else if (ev.kind === 'kv') {
    body = `<dl>${ev.rows.map(([k, v], i) => `<div class="kvr${ev.hi.includes(i) ? ' hlr' : ''}" data-at="${T.ev[0] + 0.9 + i * 0.3}" ${ev.hi.includes(i) ? `data-hl="${z0 + 0.3 + i * 0.2}"` : ''} ${i === ev.hi[0] ? 'data-focus' : ''}><dt>${k}</dt><dd><span class="lat">${v}</span></dd></div>`).join('')}</dl>`;
  } else if (ev.kind === 'bars') {
    const max = Math.max(...ev.bars.map((b) => b[1]));
    body = `<div class="bars">${ev.bars.map(([m, v], i) => `<div class="bar" data-at="${T.ev[0] + 0.9 + i * 0.35}" ${i === ev.bars.length - 1 ? `data-focus data-hl="${z0 + 0.4}"` : ''}><span class="bv lat">${v.toLocaleString('en-US')}</span><i class="grow" data-grow="${T.ev[0] + 0.9 + i * 0.35}" style="--h:${(v / max) * 100}%"></i><span class="bm">${m}</span></div>`).join('')}</div>`;
  } else if (ev.kind === 'pair') {
    body = `<div class="pair">${ev.pair.map((p, i) => `<div class="pc" data-at="${T.ev[0] + 0.9 + i * 0.6}" ${i === 1 ? 'data-focus' : ''}><b>${p[0]}</b><span class="iban lat" data-hl="${z0 + 0.4 + i * 0.3}">${p[1]}</span><small>${p[2]}</small></div>`).join(`<div class="eq pop" data-at="${T.ev[0] + 2.4}">=</div>`)}</div>`;
  } else if (ev.kind === 'stat') {
    body = `<div class="stat" data-at="${T.ev[0] + 0.9}"><b class="lat">${ev.stat[0]}</b><span>${ev.stat[1]}</span></div><table class="mini"><tbody>${ev.rows.map((r, k) => `<tr data-at="${T.ev[0] + 1.7 + k * 0.4}" ${k === 0 ? 'data-focus' : ''}>${r.map((v, i) => `<td class="${i === 2 ? 'hl' : ''}" ${i === 2 ? `data-hl="${z0 + 0.3 + k * 0.25}"` : ''}>${v}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  }
  return `<div class="card" data-at="${T.ev[0] + 0.45}" data-zoom="${z0},${z0 + 3.6}">
    <div class="ch"><span class="app"><img src="${MARK}" alt=""><span class="lat">SEG</span></span><span class="co">${U.company}</span></div>
    <div class="cb"><div class="ct"><p class="ttl">${ev.title}</p>${sev}</div>${body}
      <div class="chips">${ev.chips.map((c, i) => `<span class="chip pop" data-at="${T.ev[0] + 7.0 + i * 0.35}" data-tick>${c}</span>`).join('')}</div>
      <p class="foot" data-at="${T.ev[0] + 8.6}"><i></i>${ev.foot}</p></div>
    <div class="wm"><span>${U.demo}</span></div></div>`;
}

// ---------------------------------------------------------------- page
function page(id, lang) {
  const U = UI[lang], S = SC[id][lang], K = KEY[id][lang], E = END[lang], rtl = U.dir === 'rtl';
  const scene = (k, inner, cls = '') => `<section class="sc ${cls}" data-from="${T[k][0]}" data-to="${T[k][1]}">${inner}</section>`;
  const chW = [T.hook, T.why, T.ev, T.ctl];
  const chapters = U.chapters.map((c, i) => `<div class="cp" data-c0="${chW[i][0]}" data-c1="${chW[i][1]}"><i><b></b></i><span>${c}</span></div>`).join('');
  return `<!doctype html><html lang="${lang}" dir="${U.dir}"><meta charset="utf-8"><style>
@font-face{font-family:Cairo;src:url(data:font/woff2;base64,${CAIRO});font-weight:400 900}
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${INTER});font-weight:400 900}
*{box-sizing:border-box;margin:0;padding:0} html,body{width:${W}px;height:${H}px;overflow:hidden;background:#060E24}
body{position:relative;font-family:${rtl ? 'Cairo,Inter' : 'Inter,Cairo'},sans-serif;color:#fff}
.lat{font-family:Inter;direction:ltr;unicode-bidi:isolate;font-feature-settings:'tnum' 1}
/* depth layers */
#bg0{position:absolute;inset:-80px;background:radial-gradient(ellipse at 70% 0%, #1E3470 0%, ${NAVY} 50%, #060E24 100%)}
#bg1{position:absolute;inset:-200px;opacity:.06;background-image:linear-gradient(${CYAN} 1px,transparent 1px),linear-gradient(90deg,${CYAN} 1px,transparent 1px);background-size:60px 60px}
.orb{position:absolute;border-radius:50%;filter:blur(90px)}
#o1{width:760px;height:760px;background:rgba(27,183,205,.20);top:-200px;${rtl ? 'right' : 'left'}:-240px}
#o2{width:620px;height:620px;background:rgba(40,70,160,.35);bottom:-160px;${rtl ? 'left' : 'right'}:-200px}
#grain{position:absolute;inset:0;opacity:.05;mix-blend-mode:overlay}
#vig{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(0,0,0,.45) 100%)}
#stage{position:absolute;inset:0;transform-origin:50% 45%}
.sweep{position:absolute;top:0;bottom:0;width:260px;background:linear-gradient(90deg,transparent,rgba(27,183,205,.28),rgba(255,255,255,.35),rgba(27,183,205,.28),transparent);filter:blur(6px);opacity:0;z-index:6}
.chap{position:absolute;inset-inline:64px;top:92px;display:flex;gap:12px;z-index:5}
.cp{flex:1;display:flex;flex-direction:column;gap:12px} .cp i{display:block;height:6px;border-radius:6px;background:rgba(255,255,255,.16);overflow:hidden}
.cp b{display:block;height:100%;width:0;background:linear-gradient(90deg,${CYAN},#7FE3EF)} .cp span{font-weight:800;font-size:26px;color:rgba(255,255,255,.45);letter-spacing:${rtl ? 0 : '.02em'}} .cp.on span{color:#fff}
.sc{position:absolute;inset:0;opacity:0;padding:230px 76px 190px;display:flex;flex-direction:column;justify-content:center}
.brandline{font:800 26px Inter;color:${CYAN};letter-spacing:.08em;text-transform:uppercase}
h1{font-weight:900;font-size:${rtl ? 116 : 100}px;line-height:1.16;margin-top:36px;letter-spacing:${rtl ? 0 : '-.015em'}} h1 em{font-style:normal;color:${CYAN}}
.dot{display:inline-block;width:24px;height:24px;border-radius:50%;background:${RED};box-shadow:0 0 0 9px rgba(192,57,43,.22);margin-inline-end:20px;vertical-align:middle}
.hooksub{margin-top:30px;font-weight:700;font-size:44px;color:rgba(255,255,255,.72)}
.key{margin-top:84px;display:flex;flex-direction:column;gap:12px}
.key b{font:900 ${rtl ? 124 : 120}px Inter;line-height:1;color:#fff;direction:ltr;unicode-bidi:isolate;text-shadow:0 0 60px rgba(27,183,205,.45)}
.key span{font-weight:800;font-size:38px;color:${CYAN}}
.demoTag{position:absolute;inset-inline:76px;bottom:104px;display:flex;justify-content:center}
.demoTag span{font-weight:800;font-size:26px;color:${CYAN};border:1.5px solid rgba(27,183,205,.6);border-radius:999px;padding:8px 22px;background:rgba(6,14,36,.6)}
h2{font-weight:900;font-size:76px;line-height:1.22;letter-spacing:${rtl ? 0 : '-.01em'}}
.why{list-style:none;margin-top:80px;display:flex;flex-direction:column;gap:50px}
.why li{display:flex;gap:30px;align-items:flex-start;font-weight:700;font-size:52px;line-height:1.45}
.why li .n{flex:0 0 auto;width:82px;height:82px;border-radius:50%;border:3px solid ${CYAN};color:${CYAN};font:900 40px Inter;display:flex;align-items:center;justify-content:center;margin-top:4px}
.why b{font-family:Inter;color:${CYAN};direction:ltr;unicode-bidi:isolate}
.evh{font-weight:900;font-size:56px;line-height:1.28}
.card{position:relative;margin-top:46px;background:#F5F7FA;color:${NAVY};border-radius:28px;overflow:hidden;box-shadow:0 50px 110px rgba(0,0,0,.55),0 0 0 1px rgba(255,255,255,.06)}
.ch{display:flex;justify-content:space-between;align-items:center;background:${NAVY};color:#fff;padding:24px 32px;font-size:28px}
.ch .app{display:flex;align-items:center;gap:12px;font-weight:800} .ch img{height:30px} .ch .co{opacity:.8;font-weight:600}
.cb{padding:34px;display:flex;flex-direction:column;gap:28px}
.ct{display:flex;align-items:center;justify-content:space-between;gap:18px} .ttl{font-weight:900;font-size:44px;line-height:1.3}
.sev{flex:0 0 auto;font-weight:900;font-size:32px;border-radius:999px;padding:4px 22px;border:3px solid}
.sev.c{background:${RED};border-color:${RED};color:#fff} .sev.h{border-color:${RED};color:${RED}} .sev.m{border-color:${CYAN};color:#0F7C91}
table{width:100%;border-collapse:separate;border-spacing:0 12px;font-size:34px} th{font-weight:800;font-size:26px;color:#5A6483;text-align:start;padding:0 14px}
td{background:#fff;padding:22px 14px;font-weight:800;white-space:nowrap;border-top:1px solid #E6E9F0;border-bottom:1px solid #E6E9F0;transition:none}
td:first-child{border-inline-start:1px solid #E6E9F0;border-start-start-radius:12px;border-end-start-radius:12px} td:last-child{border-inline-end:1px solid #E6E9F0;border-start-end-radius:12px;border-end-end-radius:12px}
.lit{box-shadow:inset 0 0 0 4px ${CYAN},0 0 0 6px rgba(27,183,205,.18);background:rgba(27,183,205,.12)!important}
.mini td{font-size:32px}
dl{display:flex;flex-direction:column;gap:10px} .kvr{display:flex;justify-content:space-between;align-items:center;background:#fff;border:1px solid #E6E9F0;border-radius:12px;padding:20px 24px;font-size:36px}
dt{color:#5A6483;font-weight:700} dd{font-weight:900}
.bars{height:560px;display:flex;align-items:flex-end;gap:22px;padding:10px 6px 0;direction:ltr}
.bar{flex:1;height:100%;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:10px;border-radius:14px}
.bar i{display:block;width:100%;height:0;border-radius:12px 12px 4px 4px;background:rgba(13,27,62,.32)} .bar:last-child i{background:${NAVY}}
.bv{font-weight:900;font-size:28px} .bm{font-weight:800;font-size:28px;color:#5A6483;font-family:${rtl ? 'Cairo' : 'Inter'}}
.pair{display:flex;flex-direction:column;align-items:stretch;gap:14px}
.pc{background:#fff;border:1px solid #E6E9F0;border-radius:16px;padding:22px 24px;display:flex;flex-direction:column;gap:8px}
.pc b{font-weight:900;font-size:38px} .pc small{font-weight:700;font-size:28px;color:#5A6483}
.iban{align-self:flex-start;font-weight:900;font-size:44px;padding:6px 14px;border-radius:10px}
.eq{align-self:center;font:900 60px Inter;color:${RED};line-height:1}
.stat{display:flex;align-items:baseline;gap:24px} .stat b{font-weight:900;font-size:180px;line-height:1;color:${NAVY}} .stat span{font-weight:800;font-size:38px;color:#3B4262;line-height:1.35}
.chips{display:flex;flex-wrap:wrap;gap:14px} .chip{font-weight:800;font-size:30px;border-radius:999px;padding:10px 22px;background:rgba(27,183,205,.14);color:#0F7C91;border:2px solid rgba(27,183,205,.55)}
.foot{display:flex;gap:16px;align-items:flex-start;font-weight:700;font-size:28px;color:#0D1B3E;background:#fff;border:1px solid #E6E9F0;border-radius:14px;padding:18px 20px}
.foot i{flex:0 0 auto;width:8px;align-self:stretch;border-radius:8px;background:${CYAN}}
.wm{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none} .wm span{transform:rotate(-24deg);font-weight:900;font-size:84px;color:rgba(13,27,62,.055);white-space:nowrap}
.ctl{list-style:none;margin-top:76px;display:flex;flex-direction:column;gap:34px}
.ctl li{display:flex;gap:26px;align-items:flex-start;font-weight:800;font-size:50px;line-height:1.45;background:rgba(255,255,255,.06);border:1.5px solid rgba(255,255,255,.14);border-radius:24px;padding:32px 34px;backdrop-filter:blur(6px)}
.ctl li::before{content:'✓';flex:0 0 auto;width:64px;height:64px;border-radius:50%;background:${CYAN};color:${NAVY};font:900 36px Inter;display:flex;align-items:center;justify-content:center;margin-top:6px}
.cta{align-items:center;text-align:center;gap:30px;padding-top:120px}
.cta .m{display:flex;align-items:center;gap:24px;direction:ltr} .cta .m img{height:112px} .cta .m span{font:800 88px Inter;letter-spacing:.15em}
.cta .e1{font:800 50px Inter;letter-spacing:-.01em;margin-top:40px} .cta .rule{width:120px;height:4px;border-radius:4px;background:${CYAN}}
.cta .e2{font-weight:900;font-size:${rtl ? 74 : 64}px;color:${CYAN};line-height:1.2}
.cta .l1{margin-top:50px;font-weight:800;font-size:${rtl ? 48 : 42}px;color:rgba(255,255,255,.85)}
.cta .cl{margin-top:34px;font-weight:800;font-size:${rtl ? 40 : 34}px;color:${CYAN};text-align:center;max-width:860px;line-height:1.45}
.cta .pill{margin-top:16px;font:800 56px Inter;color:${NAVY};background:${CYAN};border-radius:999px;padding:24px 60px;box-shadow:0 0 60px rgba(27,183,205,.55)}
.w{display:inline-block;white-space:pre}
</style><body>
<div id="bg0"></div><div id="bg1"></div><div class="orb" id="o1"></div><div class="orb" id="o2"></div>
<svg id="grain" width="${W}" height="${H}"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>
<div class="sweep" id="sweep"></div>
<div class="chap" id="chap">${chapters}</div>
<div id="stage">
${scene('hook', `<p class="brandline" data-at="0.25">${U.brand}</p><h1 class="kin" data-at="0.45"><span class="dot"></span>${S.hook}</h1><p class="hooksub kin" data-at="1.7">${S.hookSub}</p><div class="key" data-impact="2.6"><b style="font-size:${K[0].length > 11 ? 92 : 124}px">${K[0]}</b><span>${K[1]}</span></div><div class="demoTag" data-at="3.0"><span>${U.demo}</span></div>`)}
${scene('why', `<h2 class="kin" data-at="${T.why[0] + 0.35}">${U.why}</h2><ul class="why">${S.why.map((w, i) => `<li data-at="${T.why[0] + 1.3 + i * 1.7}" data-tick><span class="n">${i + 1}</span><span>${w}</span></li>`).join('')}</ul>`)}
${scene('ev', `<p class="evh kin" data-at="${T.ev[0] + 0.25}">${U.ev}</p>${evidence(S.ev, U)}<div class="demoTag"><span>${U.demo}</span></div>`)}
${scene('ctl', `<h2 class="kin" data-at="${T.ctl[0] + 0.35}">${U.ctl}</h2><ul class="ctl">${S.ctl.map((c, i) => `<li data-at="${T.ctl[0] + 1.0 + i * 0.9}" data-tick>${c}</li>`).join('')}</ul><div class="demoTag"><span>${U.demo}</span></div>`)}
<section class="sc cta" data-from="${T.cta[0]}" data-to="${T.cta[1] + 1}">
  <div class="m" data-at="${T.cta[0] + 0.3}">${signHTML(112)}</div>
  <p class="e1 kin" data-at="${T.cta[0] + 0.7}" dir="ltr">${E[0]}</p><div class="rule grow-x" data-at="${T.cta[0] + 1.2}"></div><p class="e2 kin" data-at="${T.cta[0] + 1.3}">${E[1]}</p>
  <p class="l1 kin" data-at="${T.cta[0] + 2.2}">${U.cta1} ${U.cta2}</p><p class="pill pop" data-at="${T.cta[0] + 2.9}">seg-audit.com</p>
  <p class="cl kin" data-at="${T.cta[0] + 3.6}">${KC[rtl ? 'ar' : 'en'].closesOn} · ${KC[rtl ? 'ar' : 'en'].selectShort}</p></section>
</div>
<script>
const TOT=${TOTAL}, RTL=${rtl};
const clamp=(x)=>Math.max(0,Math.min(1,x));
const expo=(x)=>x<=0?0:x>=1?1:1-Math.pow(2,-10*x);
const inout=(x)=>x<=0?0:x>=1?1:(x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2);
const spring=(x)=>x<=0?0:x>=1?1:1-Math.exp(-7*x)*Math.cos(10*x);
// kinetic type: split text nodes into words
for (const el of document.querySelectorAll('.kin')) {
  const walk=(n)=>{ for (const c of [...n.childNodes]) { if (c.nodeType===3) { const parts=c.textContent.split(/(\\s+)/); const frag=document.createDocumentFragment();
      for (const p of parts) { if (!p) continue; if (/^\\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); continue; } const s=document.createElement('span'); s.className='w'; s.textContent=p; frag.appendChild(s); } c.replaceWith(frag);
    } else if (c.nodeType===1 && c.classList.contains('lat')) { c.classList.add('w'); } else if (c.nodeType===1 && !c.classList.contains('dot')) walk(c); } };
  walk(el);
}
const scs=[...document.querySelectorAll('.sc')], kins=[...document.querySelectorAll('.kin')], ats=[...document.querySelectorAll('[data-at]:not(.kin)')];
const hls=[...document.querySelectorAll('[data-hl]')], cps=[...document.querySelectorAll('.cp')], grows=[...document.querySelectorAll('[data-grow]')];
const card=document.querySelector('.card'), key=document.querySelector('[data-impact]');
const stage=document.getElementById('stage'), sweep=document.getElementById('sweep');
const bounds=[${T.why[0]},${T.ev[0]},${T.ctl[0]},${T.cta[0]}];
// cue list for the soundtrack
window.CUES=[{t:0.05,type:'whoosh'},...bounds.map(b=>({t:b-0.3,type:'whoosh'})),{t:+key.dataset.impact,type:'impact'},
  ...hls.map(e=>({t:+e.dataset.hl,type:'tick'})),...[...document.querySelectorAll('[data-tick]')].map(e=>({t:+e.dataset.at+0.05,type:'tick'})),{t:${T.cta[0]}+2.9,type:'resolve'}];
let zoomOrigin=null;
window.setT=(t)=>{
  // camera drift + parallax
  const drift=Math.sin(t*0.35)*6, push=1+0.012*Math.sin(t*0.18);
  stage.style.transform='translate('+(drift*0.6).toFixed(2)+'px,'+(Math.cos(t*0.27)*5).toFixed(2)+'px) scale('+push.toFixed(4)+')';
  document.getElementById('bg1').style.transform='translateY('+(-t*7).toFixed(1)+'px)';
  document.getElementById('o1').style.transform='translate('+(Math.sin(t*0.21)*60).toFixed(1)+'px,'+(Math.cos(t*0.17)*40).toFixed(1)+'px)';
  document.getElementById('o2').style.transform='translate('+(Math.cos(t*0.19)*50).toFixed(1)+'px,'+(Math.sin(t*0.23)*50).toFixed(1)+'px)';
  // scenes: soft-focus in and out
  for (const s of scs) { const a=+s.dataset.from, b=+s.dataset.to; let o=0, y=0, bl=0;
    if (t>=a-0.01 && t<=b) { const i=expo((t-a)/0.6), out=t>b-0.45?inout((t-(b-0.45))/0.45):0; o=Math.min(i,1-out); y=(1-i)*70-out*50; bl=(1-i)*14+out*10; }
    s.style.opacity=o.toFixed(3); s.style.transform='translateY('+y.toFixed(1)+'px)'; s.style.filter=bl>0.05?'blur('+bl.toFixed(1)+'px)':'none'; }
  // light sweep at each scene change, in the reading direction
  let sw=0, sx=0; for (const b of bounds) { const k=(t-(b-0.35))/0.75; if (k>=0&&k<=1) { sw=Math.sin(Math.PI*k); sx=RTL?(1-inout(k)):inout(k); } }
  sweep.style.opacity=(sw*0.9).toFixed(3); sweep.style.transform='translateX('+(sx*(${W}+520)-390).toFixed(1)+'px)';
  // kinetic words
  for (const el of kins) { const a=+el.dataset.at; el.style.opacity=t>=a-0.01?1:0; [...el.querySelectorAll('.w')].forEach((w,i)=>{ const k=clamp((t-a-i*0.07)/0.5), e=expo(k);
      w.style.opacity=e.toFixed(3); w.style.transform='translateY('+((1-e)*34).toFixed(1)+'px) scale('+(0.96+0.04*spring(k)).toFixed(4)+')'; w.style.filter=k<1?'blur('+((1-e)*8).toFixed(1)+'px)':'none'; }); }
  // other elements
  for (const e of ats) { const k=clamp((t-+e.dataset.at)/0.55), pop=e.classList.contains('pop'); const v=pop?spring(k):expo(k);
    e.style.opacity=clamp(k*1.6).toFixed(3); e.style.transform=pop?'scale('+(0.6+0.4*v).toFixed(4)+')':'translateY('+((1-v)*30).toFixed(1)+'px)'; }
  for (const g of grows) { const k=expo(clamp((t-+g.dataset.grow)/0.8)); g.style.height='calc(var(--h) * '+k.toFixed(4)+')'; }
  const rule=document.querySelector('.grow-x'); if (rule) { const k=expo(clamp((t-+rule.dataset.at)/0.6)); rule.style.transform='scaleX('+k.toFixed(3)+')'; rule.style.opacity=k>0?1:0; }
  for (const e of hls) e.classList.toggle('lit', t>=+e.dataset.hl);
  // the key figure: impact
  if (key) { const a=+key.dataset.impact, k=clamp((t-a)/0.7), sh=t>=a&&t<a+0.18?Math.sin((t-a)*120)*(1-(t-a)/0.18)*10:0;
    key.style.opacity=k>0?1:0; key.style.transform='translateX('+sh.toFixed(1)+'px) scale('+(1.35-0.35*spring(k)).toFixed(4)+')'; key.style.transformOrigin=RTL?'right center':'left center'; }
  // evidence zoom onto the focused line
  if (card) { const [z0,z1]=card.dataset.zoom.split(',').map(Number);
    if (!zoomOrigin) { const f=card.querySelector('[data-focus]'); if (f) { const r=f.getBoundingClientRect(), c=card.getBoundingClientRect(); if (r.height) zoomOrigin=((r.left+r.width/2-c.left)/c.width*100).toFixed(1)+'% '+((r.top+r.height/2-c.top)/c.height*100).toFixed(1)+'%'; } }
    const zin=inout(clamp((t-z0)/0.7)), zout=inout(clamp((t-(z1-0.7))/0.7)), z=1+0.10*(zin-zout);
    if (zoomOrigin) card.style.transformOrigin=zoomOrigin;
    const base=card.style.transform.replace(/scale\\([^)]*\\)/g,''); card.style.transform=base+' scale('+z.toFixed(4)+')'; }
  for (const c of cps) { const a=+c.dataset.c0, b=+c.dataset.c1; c.querySelector('b').style.width=(clamp((t-a)/(b-a))*100)+'%'; c.classList.toggle('on', t>=a&&t<b); }
  document.getElementById('chap').style.opacity=t>${T.cta[0]}?Math.max(0,1-(t-${T.cta[0]})/0.4):1;
};
window.setT(0);
</script></body></html>`;
}

// ---------------------------------------------------------------- loudness (EBU R128 integrated, gated)
function biquad(b0, b1, b2, a1, a2) { let x1 = 0, x2 = 0, y1 = 0, y2 = 0; return (x) => { const y = b0 * x + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2; x2 = x1; x1 = x; y2 = y1; y1 = y; return y; }; }
function lufs(L, R) { // K-weighting coefficients for 48 kHz (ITU-R BS.1770)
  const kw = () => { const s = biquad(1.53512485958697, -2.69169618940638, 1.19839281085285, -1.69065929318241, 0.73248077421585), h = biquad(1, -2, 1, -1.99004745483398, 0.99007225036621); return (x) => h(s(x)); };
  const fl = kw(), fr = kw(), n = L.length, kl = new Float32Array(n), kr = new Float32Array(n);
  for (let i = 0; i < n; i++) { kl[i] = fl(L[i]); kr[i] = fr(R[i]); }
  const blk = Math.floor(0.4 * SR), hop = Math.floor(0.1 * SR), z = [];
  for (let s = 0; s + blk <= n; s += hop) { let a = 0; for (let i = s; i < s + blk; i++) a += kl[i] * kl[i] + kr[i] * kr[i]; z.push(a / blk); }
  const L_ = (m) => -0.691 + 10 * Math.log10(m);
  const abs = z.filter((m) => L_(m) > -70); if (!abs.length) return -70;
  const rel = L_(abs.reduce((a, b) => a + b, 0) / abs.length) - 10;
  const g = abs.filter((m) => L_(m) > rel);
  return L_(g.reduce((a, b) => a + b, 0) / g.length);
}

// ---------------------------------------------------------------- render + encode
async function main() {
  const only = process.argv[2] || '';
  fs.mkdirSync(OUT, { recursive: true });
  fs.mkdirSync(PUB, { recursive: true });
  const blank = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'reels3-')), 'blank.html');
  fs.writeFileSync(blank, '<!doctype html><title>encode</title>');
  const browser = await chromium.launch({ channel: 'chrome', args: ['--disable-gpu'] });
  const enc = await browser.newPage();
  await enc.goto('file://' + blank); // WebCodecs needs a secure context
  for (const id of Object.keys(SC)) for (const lang of ['ar', 'en']) {
    const name = `reel-${id}_${lang}_1080x1920`;
    if (only && !name.includes(only)) continue;
    const p = await browser.newPage({ viewport: { width: W, height: H } });
    await p.setContent(page(id, lang), { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    const cues = await p.evaluate(() => window.CUES);

    // soundtrack: synthesise, normalise to -16 LUFS, cap peaks at -1.5 dBFS
    const audio = synth({ total: TOTAL, cues, rtl: UI[lang].dir === 'rtl', seed: id.length * 31 + lang.length });
    const loud = lufs(audio.L, audio.R), gain = Math.pow(10, (-16 - loud) / 20), ceil = Math.pow(10, -1.5 / 20);
    let peak = 0; for (let i = 0; i < audio.L.length; i++) peak = Math.max(peak, Math.abs(audio.L[i] * gain), Math.abs(audio.R[i] * gain));
    const g = peak > ceil ? gain * (ceil / peak) : gain;
    for (let i = 0; i < audio.L.length; i++) { audio.L[i] *= g; audio.R[i] *= g; }
    const finalLufs = lufs(audio.L, audio.R);

    await enc.evaluate(({ W, H, FPS }) => {
      window._v = []; window._desc = null; window._fail = null;
      window._enc = new VideoEncoder({
        output: (ch, meta) => { if (meta && meta.decoderConfig && meta.decoderConfig.description) window._desc = new Uint8Array(meta.decoderConfig.description); const b = new Uint8Array(ch.byteLength); ch.copyTo(b); window._v.push({ key: ch.type === 'key', ts: ch.timestamp, data: b }); },
        error: (e) => { window._fail = String(e); }
      });
      window._enc.configure({ codec: 'avc1.640028', width: W, height: H, bitrate: 10e6, framerate: FPS, hardwareAcceleration: 'prefer-software', latencyMode: 'quality', avc: { format: 'avc' } });
    }, { W, H, FPS });
    const n = TOTAL * FPS;
    for (let i = 0; i < n; i++) {
      await p.evaluate((t) => window.setT(t), i / FPS);
      const jpg = (await p.screenshot({ type: 'jpeg', quality: 92 })).toString('base64');
      await enc.evaluate(async ({ jpg, i, FPS }) => {
        const bmp = await createImageBitmap(await (await fetch('data:image/jpeg;base64,' + jpg)).blob());
        const f = new VideoFrame(bmp, { timestamp: Math.round((i * 1e6) / FPS), duration: Math.round(1e6 / FPS) });
        window._enc.encode(f, { keyFrame: i % (FPS * 2) === 0 }); f.close(); bmp.close();
        while (window._enc.encodeQueueSize > 6) await new Promise((r) => setTimeout(r, 4));
      }, { jpg, i, FPS });
    }
    await p.close();
    // interleaved float32 → page → AAC
    const inter = new Float32Array(audio.L.length * 2);
    for (let i = 0; i < audio.L.length; i++) { inter[i] = audio.L[i]; inter[audio.L.length + i] = audio.R[i]; } // planar: L then R
    const out = await enc.evaluate(async ({ pcm, frames, SR }) => {
      await window._enc.flush(); window._enc.close();
      const raw = Uint8Array.from(atob(pcm), (c) => c.charCodeAt(0)), f32 = new Float32Array(raw.buffer);
      const Lc = f32.subarray(0, frames), Rc = f32.subarray(frames);
      const ach = []; let adesc = null;
      const ae = new AudioEncoder({ output: (ch, meta) => { if (meta && meta.decoderConfig && meta.decoderConfig.description) adesc = new Uint8Array(meta.decoderConfig.description); const b = new Uint8Array(ch.byteLength); ch.copyTo(b); ach.push(b); }, error: (e) => { window._fail = String(e); } });
      ae.configure({ codec: 'mp4a.40.2', sampleRate: SR, numberOfChannels: 2, bitrate: 192000 });
      const block = 4800;
      for (let s = 0; s < frames; s += block) { const len = Math.min(block, frames - s), d = new Float32Array(len * 2); d.set(Lc.subarray(s, s + len), 0); d.set(Rc.subarray(s, s + len), len);
        ae.encode(new AudioData({ format: 'f32-planar', sampleRate: SR, numberOfFrames: len, numberOfChannels: 2, timestamp: Math.round((s / SR) * 1e6), data: d })); }
      await ae.flush(); ae.close();
      if (window._fail) throw new Error(window._fail);
      const toB64 = (u) => { let s = ''; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); return btoa(s); };
      window._v.sort((a, b) => a.ts - b.ts);
      return { avcC: toB64(window._desc), v: window._v.map((x) => ({ key: x.key, data: toB64(x.data) })), asc: toB64(adesc), a: ach.map(toB64) };
    }, { pcm: Buffer.from(inter.buffer).toString('base64'), frames: audio.L.length, SR });
    const vs = out.v.map((s) => ({ key: s.key, data: Buffer.from(s.data, 'base64') }));
    const au = { samples: out.a.map((s) => Buffer.from(s, 'base64')), asc: Buffer.from(out.asc, 'base64'), sampleRate: SR, channels: 2 };
    const file = path.join(OUT, `${name}.mp4`);
    fs.writeFileSync(file, mp4(vs, Buffer.from(out.avcC, 'base64'), au, { width: W, height: H, fps: FPS }));
    // The public copy (src/assets/social/video) is a site file: refreshed only with SITE=1.
    if (process.env.SITE === '1') fs.copyFileSync(file, path.join(PUB, `${name}.mp4`));
    console.log('wrote', path.relative(ROOT, file), `${TOTAL} s`, `${(fs.statSync(file).size / 1e6).toFixed(1)} MB`, `audio ${finalLufs.toFixed(1)} LUFS, ${cues.length} cues`);
  }
  await browser.close();
}

if (require.main === module) main();
module.exports = { SC, UI, KEY, page, T, TOTAL };
