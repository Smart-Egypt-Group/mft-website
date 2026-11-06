#!/usr/bin/env node
// November 2026 daily publishing packs: verify every post, then write one file per day.
//   node scripts/daily-packs.js           verify + write marketing/content/daily/2026-11-DD-ready.md (7 → 30)
//                                         and marketing/content/daily/00-november-index.md
//   node scripts/daily-packs.js --check   verify only (exit 1 on any problem); run it before each day's posts
//
// Data: scripts/lib/daily-nov.js. What is verified, per post:
//   • every asset exists under marketing/designs, its pixel size (read from the file header) is the
//     format's platform size, videos have the right frame size, their duration and whether audio exists
//   • every asset was rendered in the quality pass (6 Nov 2026 18:00 or later: SEG signature, close copy)
//     and none is a withdrawn file (seats / hourglass / scarcity-proof)
//   • the copy: no forbidden line (scripts/lib/campaign.js → FORBIDDEN), «باقي N» matches the date,
//     illustrative companies are labelled, no unfilled [placeholder] unless the post is marked `need`,
//     every linked post has a unique utm_content
// A post is ✅ when its asset and copy pass; 🔴 when it waits on human input (`need`, with a ready
// fallback when one exists); 🟡 when it waits on a gate outside the pack (`cond`). Nothing is published.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const DESIGNS = path.join(ROOT, 'marketing/designs');
const OUT = path.join(ROOT, 'marketing/content/daily');
const { FORBIDDEN, DAYS_AR } = require('./lib/campaign.js');
const { imageSize, mp4Info } = require('./lib/media-info.js');
const { DAYS } = require('./lib/daily-nov.js');
const CHECK_ONLY = process.argv.includes('--check');
const QUALITY_PASS = new Date('2026-11-06T18:00:00+02:00');

const CH = {
  'li-page': { name: 'LinkedIn · صفحة الشركة', src: 'linkedin', medium: 'organic', link: 'comment' },
  'li-founder': { name: 'LinkedIn · أحمد أشرف', src: 'linkedin', medium: 'organic', link: 'comment' },
  fb: { name: 'Facebook', src: 'facebook', medium: 'organic', link: 'body' },
  ig: { name: 'Instagram', src: 'instagram', medium: 'social-bio', link: 'bio' },
  'ig-story': { name: 'Instagram Story', src: 'instagram', medium: 'story', link: 'sticker' },
  tt: { name: 'TikTok', src: 'tiktok', medium: 'social-bio', link: 'bio' },
  yt: { name: 'YouTube', src: 'youtube', medium: 'organic', link: 'body' },
  'yt-community': { name: 'YouTube · Community', src: 'youtube', medium: 'organic', link: 'body' },
  wa: { name: 'واتساب / بريد (Opt-in)', src: 'whatsapp', medium: 'crm', link: 'body' },
  live: { name: 'البث (على الهوا)', src: 'live', medium: 'live-chat', link: 'body' }
};
const FMT = {
  text: { label: 'نص' },
  'img-4x5': { label: 'صورة 4:5', dims: [1080, 1350] },
  'img-1x1': { label: 'صورة 1:1', dims: [1080, 1080] },
  'img-link': { label: 'صورة 1.91:1', dims: [1200, 630] },
  'story-img': { label: 'ستوري 9:16', dims: [1080, 1920] },
  'story-video': { label: 'ستوري 9:16', dims: [1080, 1920] },
  reel: { label: 'فيديو 9:16', dims: [1080, 1920] },
  'video-4x5': { label: 'فيديو 4:5', dims: [1080, 1350] },
  'video-16x9': { label: 'فيديو 16:9', dims: [1920, 1080] },
  'yt-long': { label: 'فيديو 16:9 طويل + مصغّرة', dims: [1280, 720] },
  carousel: { label: 'كاروسيل 4:5' },
  event: { label: 'حدث LI/FB', dims: [1080, 1080] },
  'event-comment': { label: 'تعليق على الحدث' },
  'pinned-comment': { label: 'تعليق مثبّت' },
  live: { label: 'على الهوا' }
};
const BASE = { check: 'https://app.seg-audit.com/ar/signup', apply: 'https://www.seg-audit.com/ar/founding-members/apply/', partners: 'https://www.seg-audit.com/ar/partners/' };
const CTA_NAME = { check: 'الفحص', apply: 'الطلب*', partners: 'الشركاء', live: 'البث', comment: 'التعليق', none: '—' };
const url = (base, ch, id) => `${base}?utm_source=${ch.src}&utm_medium=${ch.medium}&utm_campaign=founding-members-2026&utm_content=${id}`;
const LIVE_LINK = '«رابط حدث البث»';
const ILLUSTRATIVE = /reel-|launch-demo-report|tb-check|golden-4-lineup|loss-aversion/;

const problems = [];
const cache = new Map();
const MONTHS = { 10: 'نوف' };

// ---- asset verification ----
function verify(rel, fmtKey, where) {
  if (cache.has(rel + fmtKey)) return cache.get(rel + fmtKey);
  const file = path.join(DESIGNS, rel);
  const res = { rel, ok: false, info: '' };
  if (/seats|hourglass|scarcity-proof/.test(rel)) problems.push(`${where}: withdrawn asset ${rel}`);
  if (!fs.existsSync(file)) { problems.push(`${where}: missing on disk: marketing/designs/${rel}`); res.info = '❌ مش موجود'; cache.set(rel + fmtKey, res); return res; }
  const st = fs.statSync(file);
  const when = new Date(st.mtime.getTime() + 2 * 3600e3); // Cairo
  const stamp = `${when.getUTCDate()} ${MONTHS[when.getUTCMonth()] || when.getUTCMonth() + 1} ${String(when.getUTCHours()).padStart(2, '0')}:${String(when.getUTCMinutes()).padStart(2, '0')}`;
  if (st.mtime < QUALITY_PASS) problems.push(`${where}: ${rel} predates the quality pass (${st.mtime.toISOString()})`);
  const want = FMT[fmtKey] && FMT[fmtKey].dims;
  let w, h, extra = '';
  if (/\.mp4$/i.test(rel)) {
    const m = mp4Info(file);
    if (!m) { problems.push(`${where}: unreadable MP4 ${rel}`); res.info = '❌ MP4 تالف'; cache.set(rel + fmtKey, res); return res; }
    ({ w, h } = m); extra = ` · ${m.sec.toFixed(1)} ث · ${m.audio ? 'صوت ✓' : 'صامت'}`;
    res.sec = m.sec; res.audio = m.audio;
  } else if (/\.(png|jpe?g|webp)$/i.test(rel)) {
    const s = imageSize(file); if (!s) { problems.push(`${where}: unreadable image ${rel}`); } else [w, h] = s;
  } else if (/\.pdf$/i.test(rel)) { w = h = 0; extra = ' · PDF'; }
  if (want && (w !== want[0] || h !== want[1])) problems.push(`${where}: ${rel} is ${w}×${h}, ${fmtKey} needs ${want[0]}×${want[1]}`);
  res.ok = true; res.w = w; res.h = h;
  res.info = `✓ ${w}×${h}${extra} · ${stamp}`;
  cache.set(rel + fmtKey, res);
  return res;
}

// ---- copy verification ----
function checkCopy(text, where, d) {
  if (!text) return;
  for (const [re, why] of FORBIDDEN) if (re.test(text)) problems.push(`${where}: ${why}: «${text.match(re)[0]}»`);
  for (const m of text.matchAll(/باقي (\d+) (يوم|أيام)/g)) if (+m[1] !== 30 - d) problems.push(`${where}: «${m[0]}» on ${d} Nov (should be ${30 - d})`);
  if (/باقي يومين/.test(text) && d !== 28) problems.push(`${where}: «باقي يومين» on ${d} Nov`);
  if (/بكرة آخر يوم/.test(text) && d !== 29) problems.push(`${where}: «بكرة آخر يوم» on ${d} Nov`);
}

// ---- render one post's link block ----
function links(p, ch) {
  const out = { now: '', after: '', where: ch.link };
  if (p.cta === 'check') out.now = url(BASE.check, ch, p.id);
  if (p.cta === 'partners') out.now = url(BASE.partners, ch, p.id);
  if (p.cta === 'apply') { out.now = url(BASE.check, ch, p.id); out.after = url(BASE.apply, ch, p.id); }
  if (p.cta === 'live') out.now = LIVE_LINK;
  return out;
}
function body(text, L, cta) {
  if (!text.includes('{LINK}')) return text;
  return text.replace('{LINK}', L.now + (cta === 'apply' ? '\n(ابدأ بالفحص المجاني، وفريقنا بيتواصل معاك للطلب.)' : ''));
}
const quote = (t) => t.split('\n').map((l) => (l ? `> ${l}` : '>')).join('\n');
const cell = (t) => String(t || '—').replace(/\|/g, '\\|').replace(/\n/g, ' ');

// ---- build ----
const usedIds = new Map();
const days = [];
for (const D of DAYS) {
  const date = new Date(Date.UTC(2026, 10, D.d));
  const wd = DAYS_AR[date.getUTCDay()];
  const rows = [];
  D.posts.forEach((p, i) => {
    const where = `${D.d} Nov #${i + 1} (${p.ch} ${p.t})`;
    const ch = CH[p.ch], fm = FMT[p.fmt];
    if (!ch) problems.push(`${where}: unknown channel ${p.ch}`);
    if (!fm) problems.push(`${where}: unknown format ${p.fmt}`);
    if (!p.hook || !p.text || !p.id || !p.t) problems.push(`${where}: missing hook / text / id / time`);
    if (!['check', 'apply', 'partners', 'live', 'comment', 'none'].includes(p.cta)) problems.push(`${where}: bad cta ${p.cta}`);
    if (['check', 'apply', 'partners', 'live'].includes(p.cta)) {
      if (usedIds.has(p.id)) problems.push(`${where}: utm_content ${p.id} already used on ${usedIds.get(p.id)}`);
      usedIds.set(p.id, where);
    }
    // assets
    const list = p.asset ? [].concat(p.asset) : [];
    const checked = list.map((a) => verify(a, /^story/.test(p.fmt) ? 'story-img' : p.fmt, where));
    const support = (p.support || []).map((a) => verify(a, '', where));
    if (!list.length && !['text', 'event-comment', 'pinned-comment', 'live'].includes(p.fmt) && !p.need) problems.push(`${where}: ${p.fmt} without an asset and not marked need`);
    let alt = null;
    if (p.alt) {
      const altList = p.alt.asset ? [].concat(p.alt.asset) : [];
      alt = { ...p.alt, checked: altList.map((a) => verify(a, p.alt.fmt || p.fmt, where + ' (alt)')) };
    }
    // copy
    const L = links(p, ch || CH.fb);
    const text = body(p.text, L, p.cta);
    const all = [p.hook, text, p.comment, p.sticker, p.title, alt && alt.text, alt && alt.hook].filter(Boolean).join('\n');
    checkCopy(all, where, D.d);
    if (/\{(?!الاسم)[^}]*\}/.test(text)) problems.push(`${where}: unfilled {token}`);
    if (/\[[^\]]+\]/.test(text) && !p.need) problems.push(`${where}: [placeholder] without need`);
    if (p.cta === 'live' && !p.need) problems.push(`${where}: live link not marked need`);
    const illus = list.some((a) => ILLUSTRATIVE.test(a)) || /شركة نموذج|شركة النموذج/.test(text);
    if (illus && !/مثال توضيحي|عرض توضيحي/.test(all)) problems.push(`${where}: illustrative example not labelled «مثال توضيحي»`);
    const status = p.need ? '🔴' : p.cond ? '🟡' : '✅';
    rows.push({ p, ch, fm, checked, support, alt, L, text, status });
  });
  rows.sort((a, b) => a.p.t.localeCompare(b.p.t));
  const needs = rows.filter((r) => r.p.need);
  const conds = rows.filter((r) => r.p.cond && !r.p.need);
  let state, stateShort;
  if (needs.length) {
    const allAlt = needs.every((r) => r.alt);
    stateShort = `🔴 ناقص إدخال بشري${allAlt ? ' (البديل جاهز)' : ''}`;
    state = `${stateShort}: ${[...new Set(needs.map((r) => r.p.need))].join(' · ')}`;
  } else { stateShort = '✅ جاهز كامل'; state = stateShort; }
  const condNote = conds.length ? `صفوف مشروطة: ${[...new Set(conds.map((r) => r.p.cond))].join(' · ')}` : '';
  days.push({ D, wd, rows, state, stateShort, condNote, needs, conds });
}

if (problems.length) { console.error(`${problems.length} problem(s):\n` + problems.join('\n')); process.exit(1); }
const nAssets = new Set([...cache.values()].map((r) => r.rel)).size;
const nPosts = days.reduce((s, x) => s + x.rows.length, 0);
console.log(`verified ${days.length} days · ${nPosts} posts · ${nAssets} distinct assets on disk · copy clean`);
if (CHECK_ONLY) process.exit(0);

// ---- write ----
const now = new Date(Date.now() + 2 * 3600e3);
const stamp = `${now.getUTCDate()} نوفمبر ${now.getUTCFullYear()}، ${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}`;
const GLOBAL = [
  '`node scripts/close-date.js --check` و`node scripts/design-qa.js` و`node scripts/daily-packs.js --check` يطلعوا نظاف.',
  '**تاريخ الإغلاق مؤكد من الـCEO** (قرار 1). كل نصوص الحزمة مكتوبة على 30 نوفمبر 11:59 م.',
  '**روابط «الطلب\\*»:** الرابط المكتوب دلوقتي هو **الفحص** (صفحة الطلب لسه بتعرض العدّاد). بعد إطفاء العدّاد (`showCount: false`، قرار منفصل) استبدله برابط «بعد إطفاء العدّاد» المكتوب تحت كل منشور.',
  '**TikTok وYouTube:** بعد تأكيد إن الحسابات ملك MFT (G8). لحد كده الصفوف دي 🟡 ومتتنشرش.',
  'بعد النشر: سجّل الرابط الفعلي في `marketing/workflow/templates/content-log.csv`.'
];
const fmtAsset = (c) => c.map((x) => `\`${x.rel}\``).join(' + ');
const fmtInfo = (c) => c.map((x) => x.info).join(' / ');

for (const X of days) {
  const { D, wd } = X;
  const dd = String(D.d).padStart(2, '0');
  let md = `# حزمة نشر ${wd} ${D.d} نوفمبر 2026: ${D.angle}\n\n`;
  md += `> **حالة اليوم:** ${X.state}${X.condNote ? `\n> **${X.condNote}** (🟡، متتنشرش قبل الشرط).` : ''}\n`;
  md += `> **مفيش حاجة منشورة أو مجدولة.** كل منشور بيعدّي على [سير النشر](../../workflow/02-publishing-workflow.md) واعتماد الـCEO.\n`;
  md += `> **الاتجاه:** سعر المؤسِّس يُغلق نهائيًا الإثنين 30 نوفمبر 2026، 11:59 مساءً بتوقيت القاهرة (\`src/site.config.js → founding.closesAt\`) + العضوية بالطلب، ومش كل طلب بيتقبل. لا مقاعد، ولا سعر رقمي، ولا «مدى الحياة».\n`;
  md += `> **الدليل:** اتولّد بـ\`node scripts/daily-packs.js\` (${stamp}). كل أصل اتفحص على الديسك: موجود، ومقاسه من هيدر الملف، ومدة الفيديو ووجود الصوت، وتاريخ توليده بعد مرحلة الجودة (توقيع SEG + BY MFT ونص الإغلاق). النصوص اتفحصت ضد الممنوعات، وعدّ الأيام، ووسم «مثال توضيحي».\n\n`;
  md += `**الحالة:** ✅ جاهز (أصل ونص) · 🔴 محتاج إدخال بشري (والبديل الجاهز مكتوب تحته) · 🟡 جاهز، بس مستني شرط برّه الحزمة\n\n`;
  md += `## قبل أول نشر\n\n` + GLOBAL.map((g) => `- ${g}`).join('\n') + '\n' + (D.gates.length ? D.gates.map((g) => `- ${g}`).join('\n') + '\n' : '') + '\n';
  md += `## الجدول\n\n| # | الوقت | القناة | الفورمات | الأصل (المسار تحت \`marketing/designs/\`) | فحص الأصل | الهوك | CTA | \`utm_content\` | الحالة |\n|---|---|---|---|---|---|---|---|---|---|\n`;
  X.rows.forEach((r, i) => {
    const asset = r.checked.length ? fmtAsset(r.checked) : r.p.need && !['text'].includes(r.p.fmt) ? '🔴 ناقص' : '— (نص)';
    const info = r.checked.length ? fmtInfo(r.checked) : r.alt && r.alt.checked && r.alt.checked.length ? `البديل: ${fmtInfo(r.alt.checked)}` : '—';
    md += `| ${i + 1} | ${r.p.t} | ${r.ch.name} | ${r.fm.label} | ${cell(asset)} | ${cell(info)} | ${cell(r.p.hook)} | ${CTA_NAME[r.p.cta]} | \`${r.p.id}\` | ${r.status} |\n`;
  });
  md += `\n\\* «الطلب»: الرابط الحالي هو الفحص لحد إطفاء العدّاد.\n\n## المنشورات\n`;
  X.rows.forEach((r, i) => {
    const p = r.p;
    md += `\n### ${i + 1} · ${p.t} · ${r.ch.name} · \`${p.id}\` ${r.status}\n\n`;
    if (p.need) md += `**🔴 محتاج إدخال بشري:** ${p.need}\n\n`;
    if (p.cond) md += `**🟡 الشرط:** ${p.cond}\n\n`;
    md += `- **الفورمات:** ${r.fm.label}${r.fm.dims ? ` (${r.fm.dims.join('×')})` : ''}\n`;
    if (r.checked.length) md += r.checked.map((c, k) => `- **الأصل${r.checked.length > 1 ? ` ${k + 1}` : ''}:** \`marketing/designs/${c.rel}\` · ${c.info}`).join('\n') + '\n';
    else if (p.need && p.fmt !== 'text') md += `- **الأصل:** 🔴 مش موجود لسه (${p.need.split(':')[0]})\n`;
    if (r.support.length) md += r.support.map((c) => `- **أصل مساعد جاهز:** \`marketing/designs/${c.rel}\` · ${c.info}`).join('\n') + '\n';
    md += `- **الهوك:** ${p.hook}\n`;
    if (p.title) md += `- **العنوان:** ${p.title}\n`;
    md += `- **النص النهائي:**\n\n${quote(r.text)}\n\n`;
    if (p.cta === 'apply' || p.cta === 'check' || p.cta === 'partners' || p.cta === 'live') {
      const L = r.L;
      if (L.where === 'comment') {
        const lead = p.comment || (p.cta === 'apply' ? 'ابدأ بالفحص المجاني، وفريقنا بيتواصل معاك للطلب:' : p.cta === 'live' ? 'سجّل في الحدث:' : 'الفحص المجاني لميزان شركتك:');
        md += `- **أول تعليق:** ${lead} ${L.now}\n`;
        if (L.after) md += `- **بعد إطفاء العدّاد (أول تعليق):** قدّم طلبك: ${L.after}\n`;
      } else if (L.where === 'bio') {
        md += `- **رابط البايو:** ${L.now}\n`;
        if (L.after) md += `- **بعد إطفاء العدّاد (البايو):** ${L.after}\n`;
      } else if (L.where === 'sticker') {
        md += `- **ملصق الرابط:** ${L.now}\n`;
        if (L.after) md += `- **بعد إطفاء العدّاد (الملصق):** ${L.after}\n`;
      } else if (L.after) md += `- **بعد إطفاء العدّاد:** استبدل الرابط في النص بـ ${L.after}\n`;
    }
    md += `- **CTA:** ${CTA_NAME[p.cta]}\n`;
    if (p.sticker) md += `- **الملصقات:** ${p.sticker}\n`;
    if (p.note) md += `- **ملاحظة:** ${p.note}\n`;
    if (r.alt) {
      const a = r.alt;
      md += `- **✅ البديل الجاهز${a.note ? ` (${a.note})` : ''}:**\n`;
      if (a.checked && a.checked.length) md += a.checked.map((c) => `  - الأصل: \`marketing/designs/${c.rel}\` · ${c.info}`).join('\n') + '\n';
      if (a.hook) md += `  - الهوك: ${a.hook}\n`;
      md += `\n${quote(body(a.text, r.L, p.cta))}\n`;
    }
  });
  md += `\n## المدفوع اليوم\n\n${D.paid}\n`;
  if (D.noteDay) md += `\n## ملاحظة على التقويم\n\n${D.noteDay}\n`;
  if (D.replies) md += `\n## الردود الجاهزة\n\n| السؤال | الرد |\n|---|---|\n| «كام مقعد فاضل؟» | «مش بنعلن أعداد. البرنامج بالطلب، وكل طلب بيراجعه فريق MFT بنفسه. وسعر المؤسِّس بيتقفل نهائيًا 30 نوفمبر.» |\n| «سعر المؤسِّس كام؟» | «تفاصيله بتوصلك في خطاب القبول. ابدأ بالفحص المجاني، وفريقنا يتواصل معاك.» (لا أرقام في التعليقات) |\n| «الشركة دي حقيقية؟» | «لا، مثال توضيحي بداتا اختبارية. مش بنعرض بيانات أي عميل.» |\n| «هتمدّدوا؟» | «لا. التاريخ ده نهائي.» (بعد تأكيد الـCEO للتاريخ) |\n`;
  if (D.after) md += `\n${D.after}\n`;
  fs.writeFileSync(path.join(OUT, `2026-11-${dd}-ready.md`), md);
}

// ---- index ----
let ix = `# حزم النشر اليومية: 7 → 30 نوفمبر 2026\n\n`;
ix += `> اتولّدت بـ\`node scripts/daily-packs.js\` (${stamp}) من \`scripts/lib/daily-nov.js\`. **مفيش حاجة منشورة أو مجدولة.**\n`;
ix += `> **اتفحص:** ${days.length} يوم · ${nPosts} منشور · ${nAssets} أصل مختلف موجود على الديسك بمقاسه الصحيح ومولَّد بعد مرحلة الجودة · النصوص نظيفة. قبل كل يوم: \`node scripts/daily-packs.js --check\`.\n`;
ix += `> المصادر: [\`november-calendar.md\`](../november-calendar.md) (الخطة) · [\`coverage-matrix-nov.md\`](../coverage-matrix-nov.md) (الخانات والنبرة) · [\`voiceover-scripts-nov.md\`](../voiceover-scripts-nov.md) (الصوت).\n\n`;
ix += `## حالة كل يوم\n\n| اليوم | الزاوية | المنشورات | الحالة | الناقص بالظبط | مشروط (🟡) |\n|---|---|---|---|---|---|\n`;
for (const X of days) {
  const dd = String(X.D.d).padStart(2, '0');
  const miss = X.needs.length ? [...new Set(X.needs.map((r) => r.p.need))].join(' · ') : '—';
  const cnd = X.conds.length ? [...new Set(X.conds.map((r) => r.p.cond))].join(' · ') : '—';
  ix += `| [${X.wd} ${X.D.d}](2026-11-${dd}-ready.md) | ${cell(X.D.angle)} | ${X.rows.length} | ${X.stateShort} | ${cell(miss)} | ${cell(cnd)} |\n`;
}
const allNeeds = new Map();
for (const X of days) for (const r of X.needs) { const k = r.p.need; if (!allNeeds.has(k)) allNeeds.set(k, []); allNeeds.get(k).push(`${X.D.d}`); }
ix += `\n## كل الإدخال البشري المطلوب (مجمّع)\n\n| المطلوب | الأيام |\n|---|---|\n` + [...allNeeds].map(([k, v]) => `| ${cell(k)} | ${[...new Set(v)].join('، ')} |`).join('\n') + '\n';
ix += `\n## الشروط العامة (على كل الأيام)\n\n` + GLOBAL.map((g) => `- ${g}`).join('\n') + '\n';
ix += `\n## الأصول المستخدمة (اتفحصت كلها)\n\n| الأصل | الفحص |\n|---|---|\n` + [...new Map([...cache.values()].map((r) => [r.rel, r])).values()].sort((a, b) => a.rel.localeCompare(b.rel)).map((r) => `| \`${r.rel}\` | ${r.info} |`).join('\n') + '\n';
fs.writeFileSync(path.join(OUT, '00-november-index.md'), ix);
console.log(`wrote ${days.length} day files + 00-november-index.md`);
