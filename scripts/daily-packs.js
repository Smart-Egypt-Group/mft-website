#!/usr/bin/env node
// November 2026 daily publishing packs: verify every post, then write one file per day.
//   node scripts/daily-packs.js           verify + write marketing/content/daily/2026-11-DD-ready.md (7 → 30)
//                                         and marketing/content/daily/00-november-index.md
//   node scripts/daily-packs.js --check   verify only (exit 1 on any problem); run it before each day's posts
//
// Data: scripts/lib/daily-nov.js. What is verified, per post:
//   • every asset exists under marketing/designs, its pixel size (read from the file header) is the
//     format's platform size, videos have the right frame size, their duration and whether audio exists
//   • every asset was rendered after the signature decision (6 Nov 2026 22:15 or later: SEG lockup =
//     cube + «Standard Enterprise Governance», then the full MFT logo; close copy)
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
const { DAYS, VALUE, ACADEMY } = require('./lib/daily-nov.js');
const CHECK_ONLY = process.argv.includes('--check');
// every asset must be rendered after the CEO's signature decision went in (6 Nov 2026, 22:15 Cairo):
// SEG lockup (cube + «Standard Enterprise Governance») | the full MFT logo
// φ pass (CEO, 7 Nov 2026 00:31 Cairo): spacing/type on the φ scale, signature on φ — every asset after it
// phase 2 (CEO approved logo A, 7 Nov 2026 15:57 Cairo): every image after it. Videos keep the φ-pass time:
// they wait on the audio track (readiness.json → audioPending) and get logo A in the audio re-render.
const QUALITY_PASS = new Date('2026-11-07T15:57:00+02:00');
const VIDEO_PASS = new Date('2026-11-07T00:31:00+02:00');
// reels: after the end card stopped repeating the name under the lockup (6 Nov 2026, 23:38 Cairo)
const REEL_PASS = new Date('2026-11-07T00:31:00+02:00');

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
const CTA_NAME = { check: 'الفحص', apply: 'الطلب', partners: 'الشركاء', live: 'البث', comment: 'التعليق', none: '—' };
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
  const pass = /\.mp4$/i.test(rel) ? VIDEO_PASS : QUALITY_PASS;
  if (st.mtime < pass) problems.push(`${where}: ${rel} predates the current signature (${st.mtime.toISOString()})`);
  const want = FMT[fmtKey] && FMT[fmtKey].dims;
  let w, h, extra = '';
  if (/\.mp4$/i.test(rel)) {
    const m = mp4Info(file);
    if (!m) { problems.push(`${where}: unreadable MP4 ${rel}`); res.info = '❌ MP4 تالف'; cache.set(rel + fmtKey, res); return res; }
    ({ w, h } = m); extra = ` · ${m.sec.toFixed(1)} ث · ${m.audio ? 'صوت ✓' : 'صامت'}`;
    res.sec = m.sec; res.audio = m.audio;
    const cap = path.join(DESIGNS, 'captions', path.basename(rel, '.mp4') + '.srt');
    if (!fs.existsSync(cap)) problems.push(`${where}: ${rel} has no caption file (node scripts/video-captions.js)`); else { res.caption = `captions/${path.basename(cap)}`; extra += ' · كابشن ✓'; }
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
  if (p.cta === 'apply') out.now = url(BASE.apply, ch, p.id); // counter off (7 Nov 2026): straight to the apply page
  if (p.cta === 'live') out.now = LIVE_LINK;
  return out;
}
function body(text, L, cta) {
  if (!text.includes('{LINK}')) return text;
  return text.replace('{LINK}', L.now);
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
  // completeness (CEO, 7 Nov 2026): every day has a design (image), a video and a story, primary or ready fallback
  const all = rows.flatMap((r) => [...r.checked, ...((r.alt && r.alt.checked) || [])].map((c) => ({ c, r })));
  const has = { design: all.some((x) => /\.(jpe?g|png)$/.test(x.c.rel) && !/^yt-long$/.test(x.r.p.fmt)), video: all.some((x) => /\.mp4$/.test(x.c.rel)), story: rows.some((r) => r.p.ch === 'ig-story' && r.checked.length) };
  for (const [k, v] of Object.entries(has)) if (!v) problems.push(`${D.d} Nov: no ${k} on the day`);
  const needs = rows.filter((r) => r.p.need);
  const conds = rows.filter((r) => r.p.cond && !r.p.need);
  let state, stateShort;
  if (needs.length) {
    const allAlt = needs.every((r) => r.alt);
    stateShort = `🔴 ناقص إدخال بشري${allAlt ? ' (البديل جاهز)' : ''}`;
    state = `${stateShort}: ${[...new Set(needs.map((r) => r.p.need))].join(' · ')}`;
  } else { stateShort = '✅ جاهز كامل'; state = stateShort; }
  const condNote = conds.length ? `صفوف مشروطة: ${[...new Set(conds.map((r) => r.p.cond))].join(' · ')}` : '';
  days.push({ D, wd, rows, state, stateShort, condNote, needs, conds, has });
}

for (const [d, v] of Object.entries(VALUE)) checkCopy(v, `${d} Nov value`, +d);
if (DAYS.some((D) => !VALUE[D.d])) problems.push('a day without its customer value (VALUE)');
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
  '**روابط «الطلب»:** بتروح على صفحة الطلب مباشرة (العدّاد اتطفى: `showCount: false`، 7 نوفمبر).',
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
  md += `> **الدليل:** اتولّد بـ\`node scripts/daily-packs.js\` (${stamp}). كل أصل اتفحص على الديسك: موجود، ومقاسه من هيدر الملف، ومدة الفيديو ووجود الصوت، وتاريخ توليده بعد قرار التوقيع ونظام φ (لوكاب SEG + شعار MFT الكامل، والمسافات والخطوط على سلّم φ). النصوص اتفحصت ضد الممنوعات، وعدّ الأيام، ووسم «مثال توضيحي».\n\n`;
  md += `**الحالة:** ✅ جاهز (أصل ونص) · 🔴 محتاج إدخال بشري (والبديل الجاهز مكتوب تحته) · 🟡 جاهز، بس مستني شرط برّه الحزمة\n\n`;
  md += `## قبل أول نشر\n\n` + GLOBAL.map((g) => `- ${g}`).join('\n') + '\n' + (D.gates.length ? D.gates.map((g) => `- ${g}`).join('\n') + '\n' : '') + '\n';
  md += `## الجدول\n\n| # | الوقت | القناة | الفورمات | الأصل (المسار تحت \`marketing/designs/\`) | فحص الأصل | الهوك | CTA | \`utm_content\` | الحالة |\n|---|---|---|---|---|---|---|---|---|---|\n`;
  X.rows.forEach((r, i) => {
    const asset = r.checked.length ? fmtAsset(r.checked) : r.p.need && !['text'].includes(r.p.fmt) ? '🔴 ناقص' : '— (نص)';
    const info = r.checked.length ? fmtInfo(r.checked) : r.alt && r.alt.checked && r.alt.checked.length ? `البديل: ${fmtInfo(r.alt.checked)}` : '—';
    md += `| ${i + 1} | ${r.p.t} | ${r.ch.name} | ${r.fm.label} | ${cell(asset)} | ${cell(info)} | ${cell(r.p.hook)} | ${CTA_NAME[r.p.cta]} | \`${r.p.id}\` | ${r.status} |\n`;
  });
  md += `\n## المنشورات\n`;
  X.rows.forEach((r, i) => {
    const p = r.p;
    md += `\n### ${i + 1} · ${p.t} · ${r.ch.name} · \`${p.id}\` ${r.status}\n\n`;
    if (p.need) md += `**🔴 محتاج إدخال بشري:** ${p.need}\n\n`;
    if (p.cond) md += `**🟡 الشرط:** ${p.cond}\n\n`;
    md += `- **الفورمات:** ${r.fm.label}${r.fm.dims ? ` (${r.fm.dims.join('×')})` : ''}\n`;
    if (r.checked.length) md += r.checked.map((c, k) => `- **الأصل${r.checked.length > 1 ? ` ${k + 1}` : ''}:** \`marketing/designs/${c.rel}\` · ${c.info}`).join('\n') + '\n';
    else if (p.need && p.fmt !== 'text') md += `- **الأصل:** 🔴 مش موجود لسه (${p.need.split(':')[0]})\n`;
    for (const c of r.checked.filter((c) => c.caption)) md += `- **الكابشن (SRT، يترفع مع الفيديو):** \`marketing/designs/${c.caption}\`\n`;
    if (r.support.length) md += r.support.map((c) => `- **أصل مساعد جاهز:** \`marketing/designs/${c.rel}\` · ${c.info}`).join('\n') + '\n';
    md += `- **الهوك:** ${p.hook}\n`;
    if (p.title) md += `- **العنوان:** ${p.title}\n`;
    md += `- **النص النهائي:**\n\n${quote(r.text)}\n\n`;
    if (p.cta === 'apply' || p.cta === 'check' || p.cta === 'partners' || p.cta === 'live') {
      const L = r.L;
      if (L.where === 'comment') {
        const lead = p.comment || (p.cta === 'apply' ? 'قدّم طلبك:' : p.cta === 'live' ? 'سجّل في الحدث:' : 'الفحص المجاني لميزان شركتك:');
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
ix += `> **اتفحص:** ${days.length} يوم · ${nPosts} منشور · ${nAssets} أصل مختلف موجود على الديسك بمقاسه الصحيح ومولَّد بعد قرار التوقيع (لوكاب SEG + شعار MFT) · النصوص نظيفة. قبل كل يوم: \`node scripts/daily-packs.js --check\`.\n`;
ix += `> المصادر: [\`november-calendar.md\`](../november-calendar.md) (الخطة) · [\`coverage-matrix-nov.md\`](../coverage-matrix-nov.md) (الخانات والنبرة) · [\`voiceover-scripts-nov.md\`](../voiceover-scripts-nov.md) (الصوت).\n\n`;
ix += `## حالة كل يوم\n\n| اليوم | الزاوية | المنشورات | تصميم · فيديو · ستوري | الحالة | الناقص بالظبط | مشروط (🟡) |\n|---|---|---|---|---|---|---|\n`;
for (const X of days) {
  const dd = String(X.D.d).padStart(2, '0');
  const miss = X.needs.length ? [...new Set(X.needs.map((r) => r.p.need))].join(' · ') : '—';
  const cnd = X.conds.length ? [...new Set(X.conds.map((r) => r.p.cond))].join(' · ') : '—';
  ix += `| [${X.wd} ${X.D.d}](2026-11-${dd}-ready.md) | ${cell(X.D.angle)} | ${X.rows.length} | ${['design', 'video', 'story'].map((k) => (X.has[k] ? '✓' : '✗')).join(' · ')} | ${X.stateShort} | ${cell(miss)} | ${cell(cnd)} |\n`;
}
const allNeeds = new Map();
for (const X of days) for (const r of X.needs) { const k = r.p.need; if (!allNeeds.has(k)) allNeeds.set(k, []); allNeeds.get(k).push(`${X.D.d}`); }
ix += `\n## كل الإدخال البشري المطلوب (مجمّع)\n\n| المطلوب | الأيام |\n|---|---|\n` + [...allNeeds].map(([k, v]) => `| ${cell(k)} | ${[...new Set(v)].join('، ')} |`).join('\n') + '\n';
ix += `\n## الشروط العامة (على كل الأيام)\n\n` + GLOBAL.map((g) => `- ${g}`).join('\n') + '\n';
ix += `\n## الأصول المستخدمة (اتفحصت كلها)\n\n| الأصل | الفحص |\n|---|---|\n` + [...new Map([...cache.values()].map((r) => [r.rel, r])).values()].sort((a, b) => a.rel.localeCompare(b.rel)).map((r) => `| \`${r.rel}\` | ${r.info} |`).join('\n') + '\n';
fs.writeFileSync(path.join(OUT, '00-november-index.md'), ix);
console.log(`wrote ${days.length} day files + 00-november-index.md`);
// ---- the calendar (november-calendar.md, between CAL markers) + platform observation log ----
// One source with the packs. Platforms = those connected through Composio (Facebook, Instagram,
// LinkedIn page + founder, YouTube). TikTok is listed apart until its connection is complete.
// Readiness chain per post: asset produced → uploaded → reviewed → copy ready. Produced and copy-ready
// come from the files and checks; uploaded / reviewed from marketing/content/daily/readiness.json.
const RD = JSON.parse(fs.readFileSync(path.join(OUT, 'readiness.json'), 'utf8'));
const rd = (id) => RD.posts[id] || {};
const PLAT = { 'li-page': 'LinkedIn', 'li-founder': 'LinkedIn', fb: 'Facebook', ig: 'Instagram', 'ig-story': 'Instagram', yt: 'YouTube', 'yt-community': 'YouTube', tt: 'TikTok', wa: 'يدوي', live: 'يدوي' };
const TYPE = (f) => ({ text: 'نص', 'img-4x5': 'بوست', 'img-1x1': 'بوست', 'img-link': 'بوست', 'story-img': 'ستوري', 'story-video': 'ستوري فيديو', reel: 'ريل / فيديو 9:16', 'video-4x5': 'فيديو', 'video-16x9': 'فيديو 16:9', 'yt-long': 'فيديو طويل', carousel: 'كاروسيل', event: 'حدث', 'event-comment': 'تعليق', 'pinned-comment': 'تعليق مثبّت', live: 'بث' }[f] || f);
const NO_ASSET = ['text', 'event-comment', 'pinned-comment', 'live'];
// deadline: produced assets need upload + review the day before (18:00); human inputs get their own
const DEADLINE = [[/^N6/, '11 نوف 13:00 (تقطيع + مراجعة بعد بث 10)'], [/^N7/, '11 نوف 20:00 (تصوير + مونتاج)'], [/^N3/, '14 نوف 18:00 (بعد اعتماد المعايير)'], [/رابط حدث البث/, '8 نوف 12:30 (بعد إنشاء الحدث)'], [/قرار منصة البث/, '8 نوف 11:00'], [/قرار الـCEO 2/, '26 نوف 18:00']];
const deadline = (d, p) => { const m = p.need && DEADLINE.find(([re]) => re.test(p.need)); return m ? m[1] : `${d - 1} نوف 18:00`; };
// observations: derived, typed, so they can be counted per platform and tracked to resolution
const OBS = {
  missing: { t: 'أصل ناقص (تصوير / إنتاج)', fix: 'تثبيت التصوير والمونتاج قبل يومين من النشر، والبديل الجاهز جاهز للنشر لو اتأخر' },
  input: { t: 'إدخال / قرار بشري', fix: 'الحسم قبل الموعد المكتوب في «جاهز قبل»، وإلا يتنشر البديل' },
  silent: { t: 'فيديو صامت', fix: 'صوت من مكتبة المنصة الآن، وتسجيل VO من السكربتات الجاهزة (voiceover-scripts-nov.md)' },
  apply: { t: 'رابط «الطلب» = الفحص مؤقتًا', fix: 'إطفاء العدّاد في صفحة الطلب، ثم تبديل الرابط المكتوب تحت كل منشور (G10)' },
  reuse: { t: 'تكرار أصل خلال 7 أيام على نفس المنصة', fix: 'بديل من نفس العائلة أو قص مختلف، علشان ما يبانش متكرر للمتابع' },
  feature: { t: 'خاصية منصة غير مؤكدة', fix: 'التأكد من تفعيل الخاصية للقناة قبل الموعد' },
  rule: { t: 'قيد المنصة', fix: null }
};
// resolved observation types (7 Nov 2026): before → fix → evidence, written into the log
const RESOLVED = [
  ['apply', 'رابط «الطلب» = الفحص مؤقتًا', { LinkedIn: 13, Facebook: 8, Instagram: 20 }, 'العدّاد اتطفى (`src/site.config.js → founding.showCount: false`)، وكل رابط «الطلب» بقى على صفحة الطلب مباشرة بالـUTM، واتشالت بوابة «بعد إطفاء العدّاد»', '`grep founding-members/apply` في ملفات الأيام؛ `node build.js` + `scripts/check.js` نظاف'],
  ['silent', 'فيديو صامت', { LinkedIn: 0, Facebook: 0, Instagram: 5, YouTube: 2 }, 'كابشن عربي/إنجليزي SRT لكل الـ28 فيديو من سكربتات التعليق الصوتي (أو النص اللي على الشاشة)، وبيتعرض على كل منشور فيديو؛ الصوت نفسه في مسار الصوت (`audioPending`)', '`marketing/designs/captions/*.srt` (28)؛ `node scripts/video-captions.js --check`'],
  ['reuse', 'تكرار أصل خلال 7 أيام على نفس المنصة', { LinkedIn: 2, Facebook: 3, Instagram: 9 }, 'أصول بديلة من نفس العائلات (hook-360، live، graffiti-04، sticky، hemicycle، before-after، ساعة الأيام)؛ الفحص بيطلّع أي تكرار جديد تلقائيًا', 'عمود «ملاحظات» في الجدول: صفر تكرار'],
  ['feature', 'خاصية منصة غير مؤكدة', { YouTube: 1 }, 'منشور YouTube Community (23 نوفمبر) اتبدّل بـShort لفيديو الإغلاق، والقناة مربوطة بـComposio', 'ملف يوم 23: `w4-d2-yt-a-1` فيديو 9:16 + SRT']
];
const RULE = { 'li-page': 'الرابط في أول تعليق (المنشور اللي فيه رابط بيوصل أقل)', 'li-founder': 'الرابط في أول تعليق؛ بصوت المؤسس ومراجعته', fb: 'الرابط جوّه النص', ig: 'الرابط في البايو (يتغيّر الصبح)', 'ig-story': 'ملصق رابط؛ الملصقات بين 250 px فوق و480 px تحت', yt: 'عنوان + وصف + الرابط في الوصف', 'yt-community': 'Community: صورة + نص' };
const lastUse = {};
const obsOf = (d, p) => {
  const o = [];
  if (p.need) o.push(['missing', p.asset || NO_ASSET.includes(p.fmt) || p.fmt === 'text' ? 'input' : 'missing', p.need].slice(1));
  if (p.cond && !/TikTok/.test(p.cond)) o.push(['feature', p.cond]);
  for (const a of [].concat(p.asset || [])) { const k = PLAT[p.ch] + a, prev = lastUse[k]; if (prev && d - prev < 7) o.push(['reuse', `نفس الأصل اتنشر ${prev} نوف`]); lastUse[k] = d; }
  if (RULE[p.ch]) o.push(['rule', RULE[p.ch]]);
  return o;
};
const ok = (v) => (v === true ? '✅' : v === false ? '⬜' : v);
const WEEKS = [[7, 10, 'الأسبوع 1 (تكملة) · 7–10', 'الإطلاق: أول إعلان للتاريخ + الشركاء + البث'], [11, 14, 'الأسبوع 2 · 11–14', 'ما بعد البث: قيمة البث لمن فاته + الانتقاء'], [15, 21, 'الأسبوع 3 · 15–21', 'المسلسل التعليمي «تشريح شركة النموذج» + معايير القبول'], [22, 30, 'الأسبوع 4 · 22–30', 'أسبوع الإغلاق: عدّ للتاريخ + ختام المسلسل + الذروة 30']];
const ACTIVE = (r) => ['LinkedIn', 'Facebook', 'Instagram', 'YouTube'].includes(PLAT[r.p.ch]);
const LOG = [];
const view = days.map((X) => ({ X, rows: X.rows.map((r) => {
  const p = r.p, produced = rd(p.id).audioPending ? '🎙 صوت معلّق' : NO_ASSET.includes(p.fmt) ? '—' : p.need && /^N[367]/.test(p.need) && r.checked.length ? '🔴 (المساعد ✅)' : (r.checked.length ? '✅' : (r.alt && r.alt.checked && r.alt.checked.length ? '🔴 (بديل ✅)' : '🔴'));
  const copy = p.need && (NO_ASSET.includes(p.fmt) || p.fmt === 'text' || /رابط|قرار/.test(p.need)) ? (r.alt ? '🟡 (بديل ✅)' : '🔴') : '✅';
  const obs = obsOf(X.D.d, p);
  for (const [k, txt] of obs) LOG.push({ plat: PLAT[r.p.ch], d: X.D.d, t: p.t, id: p.id, k, txt, done: (RD.obs || {})[`${p.id}:${k}`] });
  const full = (produced === '✅' || produced === '—') && copy === '✅' && rd(p.id).uploaded === true && rd(p.id).reviewed === true;
  const prodReady = (produced === '✅' || produced === '—') && copy === '✅';
  const uploadReady = prodReady && rd(p.id).reviewed === true; // produced + reviewed + copy: only the upload is left
  return { r, uploadReady, produced, uploaded: ok(rd(p.id).uploaded === true), reviewed: ok(rd(p.id).reviewed === true), copy, full, prodReady, dl: deadline(X.D.d, p), obs };
}) }));
const all = view.flatMap((v) => v.rows), act = all.filter((x) => ACTIVE(x.r));
const cnt = { uploadReady: act.filter((x) => x.uploadReady).length, audio: act.filter((x) => rd(x.r.p.id).audioPending).length, total: act.length, full: act.filter((x) => x.full).length, prodReady: act.filter((x) => x.prodReady).length, needs: act.filter((x) => !x.prodReady).length, uploaded: act.filter((x) => x.uploaded === '✅').length, reviewed: act.filter((x) => x.reviewed === '✅').length };
let cmd = `<!-- CAL:START — اتولّد بـ\`node scripts/daily-packs.js\` من \`scripts/lib/daily-nov.js\` + \`daily/readiness.json\`. ما يتعدّلش باليد. -->\n\n`;
cmd += `## المنصات\n\n**مجدولة (مربوطة بـComposio):** Facebook · Instagram · LinkedIn (الصفحة + حساب المؤسس) · YouTube. **TikTok: مُعلّق لحد ما يكتمل الربط** (قسم في الآخر، مش مجدول). واتساب/البريد يدوي خارج الربط.\n\n`;
cmd += `## الجاهزية الإجمالية (${act.length} منشور على المنصات المربوطة)\n\n| الخطوة | العدد | |\n|---|---|---|\n| **جاهز للرفع الآن** (مُنتَج باللوجو A + مُراجَع + النص جاهز) | **${cnt.uploadReady}** | باقي خطوة الرفع بس |
| فيديو معلّق على مسار الصوت (VO / هندسة صوتية) | **${cnt.audio}** | \`audioPending\` في readiness.json؛ بيتعاد رندره باللوجو A مع الصوت |
| الأصل مُنتَج + النص جاهز | **${cnt.prodReady}** | الأصل موجود ومفحوص على الديسك، أو نص بلا أصل |\n| محتاج إنتاج أو إدخال بشري | **${cnt.needs}** | تصوير (N6/N7)، كاروسيل المعايير (N3)، رابط البث، قرار 2 — ولكل واحد بديل جاهز إلا المكتوب 🔴 |\n| مرفوع على الجدولة | **${cnt.uploaded}** | يتحدّث في \`daily/readiness.json\` |\n| مُراجَع (اعتماد) | **${cnt.reviewed}** | يتحدّث في \`daily/readiness.json\` |\n| **جاهز بالكامل** (الأربع خطوات) | **${cnt.full}** | |\n\n`;
cmd += `> **المرحلة 2 (اعتماد الـCEO، 7 نوفمبر):** كل الصور والستوريز والأغلفة اتولّدت باللوجو A. الفيديوهات معلّقة على مسار الصوت. **خطوة «جاهز قبل»** = آخر موعد لاكتمال الجاهزية: اليوم السابق 18:00 للرفع والمراجعة، ومواعيد خاصة للتصوير والقرارات.\n\n`;
cmd += `## الملخّص أسبوع بأسبوع\n\n| الأسبوع | التيمة | LinkedIn | Facebook | Instagram | YouTube | TikTok (معلّق) | الأكاديمية | جاهز للرفع / الإجمالي | أهم الهوكات |\n|---|---|---|---|---|---|---|---|---|---|\n`;
for (const [a, b, name, theme] of WEEKS) {
  const ws = view.filter((v) => v.X.D.d >= a && v.X.D.d <= b).flatMap((v) => v.rows), n = (pl) => ws.filter((x) => PLAT[x.r.p.ch] === pl).length, wa = ws.filter((x) => ACTIVE(x.r));
  const seen = new Set(), key = (h) => h.replace(/[^؀-ۿ0-9a-z\s]/gi, '').trim().split(/\s+/).slice(0, 2).join(' ');
  const hooks = ws.filter((x) => ['li-page', 'li-founder'].includes(x.r.p.ch) && x.r.p.cta !== 'none' && !/comment|event/.test(x.r.p.fmt)).map((x) => x.r.p.hook).filter((h) => !seen.has(key(h)) && seen.add(key(h))).slice(0, 3).map((h) => `«${cell(h)}»`).join(' · ');
  cmd += `| ${name} | ${theme} | ${n('LinkedIn')} | ${n('Facebook')} | ${n('Instagram')} | ${n('YouTube')} | ${n('TikTok')} | ${ACADEMY.filter((x) => x.d >= a && x.d <= b).length} | ${wa.filter((x) => x.prodReady).length} / ${wa.length} | ${hooks} |\n`;
}
const tot = (pl) => all.filter((x) => PLAT[x.r.p.ch] === pl).length;
cmd += `| **الإجمالي** | | **${tot('LinkedIn')}** | **${tot('Facebook')}** | **${tot('Instagram')}** | **${tot('YouTube')}** | ${tot('TikTok')} | **${ACADEMY.length}** | **${cnt.prodReady} / ${cnt.total}** | |\n\n`;
for (const [a, b, name, theme] of WEEKS) {
  cmd += `## ${name} نوفمبر: ${theme}\n\n`;
  for (const v of view.filter((y) => y.X.D.d >= a && y.X.D.d <= b)) {
    const X = v.X, dd = String(X.D.d).padStart(2, '0'), star = X.D.d === 30 && !X.D.angle.includes('★') ? '★ ' : '';
    cmd += `### ${star}${X.wd} ${X.D.d} نوفمبر · ${X.D.angle}\n\n**القيمة للعميل:** ${VALUE[X.D.d]}  \n**الحزمة الكاملة** (الكابشن، والأصل بمساره، والروابط): [\`daily/2026-11-${dd}-ready.md\`](daily/2026-11-${dd}-ready.md)\n\n| الوقت | المنصة | النوع | الهوك | CTA | \`utm_content\` | الأصل مُنتَج | مرفوع | مُراجَع | النص جاهز | جاهز قبل | ملاحظات |\n|---|---|---|---|---|---|---|---|---|---|---|---|\n`;
    const lines = v.rows.filter((x) => ACTIVE(x.r) || x.r.p.ch === 'live').map((x) => ({ t: x.r.p.t, html: `| ${x.r.p.t} | ${x.r.ch.name} | ${TYPE(x.r.p.fmt)} | ${cell(x.r.p.hook)} | ${CTA_NAME[x.r.p.cta]} | \`${x.r.p.id}\` | ${x.produced} | ${x.uploaded} | ${x.reviewed} | ${x.copy} | ${x.dl} | ${cell(x.obs.map(([k, t]) => (k === 'rule' ? t : `**${OBS[k].t}:** ${t}`)).join(' · '))} |` }));
    const slots = ACADEMY.filter((x) => x.d === X.D.d).map((x) => ({ t: x.t, html: `| ${x.t} | ${x.ch} | تعليمي | **[تُملأ بحلقة الأكاديمية التعليمية لاحقاً]** | — | \`w-academy-${dd}\` | ⬜ | ⬜ | ⬜ | ⬜ | ${X.D.d - 2} نوف 18:00 | خانة محجوزة؛ إنتاجها يبدأ قبل يومين |` }));
    cmd += [...lines, ...slots].sort((x, y) => x.t.localeCompare(y.t)).map((x) => x.html).join('\n') + '\n\n';
  }
}
const pend = all.filter((x) => !ACTIVE(x.r) && x.r.p.ch !== 'live');
cmd += `## مُعلّق: TikTok (لحد ما يكتمل الربط) + قنوات يدوية\n\nمش مجدول. الأصول والنصوص جاهزة في حزم الأيام، وتتجدول أول ما الربط يكتمل وتتأكد ملكية الحساب (G8).\n\n| اليوم | الوقت | القناة | النوع | الهوك | \`utm_content\` | الأصل مُنتَج | النص جاهز |\n|---|---|---|---|---|---|---|---|\n`;
cmd += pend.map((x) => `| ${x.r.p.id.match(/w\d-d\d/) ? view.find((v) => v.rows.includes(x)).X.D.d : ''} | ${x.r.p.t} | ${x.r.ch.name} | ${TYPE(x.r.p.fmt)} | ${cell(x.r.p.hook)} | \`${x.r.p.id}\` | ${x.produced} | ${x.copy} |`).join('\n') + '\n\n';
cmd += `**المفتاح:** ✅ تم · ⬜ لسه · 🔴 ناقص (مكتوب السبب في «ملاحظات») · 🟡 قرار معلّق والبديل جاهز. سجل الملاحظات لكل منصة: [\`platform-observations.md\`](platform-observations.md).\n\n<!-- CAL:END -->`;
const CAL = path.join(ROOT, 'marketing/content/november-calendar.md');
let calSrc = fs.readFileSync(CAL, 'utf8');
calSrc = calSrc.replace(/<!-- CAL:START[\s\S]*?<!-- CAL:END -->/, cmd);
fs.writeFileSync(CAL, calSrc);
// ---- per-platform observation log ----
let lg = `# سجل الملاحظات لكل منصة · نوفمبر 2026\n\n> اتولّد بـ\`node scripts/daily-packs.js\` من نفس بيانات الجدول. كل ملاحظة مربوطة باليوم والساعة والمنصة والـ\`utm_content\`. **الحالة** بتتحدّث في \`daily/readiness.json → obs\` (المفتاح \`<utm_content>:<النوع>\` = \`"معالجة"\`)، فالتحسّن بيتقاس لكل منصة مع الوقت.\n\n## الملخّص\n\n| المنصة | ملاحظات (من غير قيود المنصة) | مفتوحة | معالجة | أكتر نوع متكرر |\n|---|---|---|---|---|\n`;
const PL = ['LinkedIn', 'Facebook', 'Instagram', 'YouTube'];
for (const pl of PL) {
  const L = LOG.filter((x) => x.plat === pl && x.k !== 'rule'), open = L.filter((x) => !x.done).length;
  const byK = {}; L.forEach((x) => { byK[x.k] = (byK[x.k] || 0) + 1; });
  const top = Object.entries(byK).sort((a, b) => b[1] - a[1])[0];
  lg += `| ${pl} | ${L.length} | ${open} | ${L.length - open} | ${top ? `${OBS[top[0]].t} (${top[1]})` : '—'} |\n`;
}
for (const pl of PL) {
  const L = LOG.filter((x) => x.plat === pl);
  lg += `\n## ${pl}\n\n**قيود المنصة الثابتة:** ${[...new Set(L.filter((x) => x.k === 'rule').map((x) => x.txt))].join(' · ')}\n\n| النوع | العدد | التحسين المقترح |\n|---|---|---|\n`;
  const byK = {}; L.filter((x) => x.k !== 'rule').forEach((x) => { byK[x.k] = (byK[x.k] || 0) + 1; });
  lg += Object.entries(byK).sort((a, b) => b[1] - a[1]).map(([k, n]) => `| ${OBS[k].t} | ${n} | ${OBS[k].fix} |`).join('\n') + '\n\n| اليوم | الساعة | `utm_content` | النوع | الملاحظة | الحالة |\n|---|---|---|---|---|---|\n';
  lg += L.filter((x) => x.k !== 'rule').map((x) => `| ${x.d} نوف | ${x.t} | \`${x.id}\` | ${OBS[x.k].t} | ${cell(x.txt)} | ${x.done || (['missing', 'input'].includes(x.k) ? '⏳ محتاج قرار بشري' : 'مفتوحة')} |`).join('\n') + '\n';
}
lg += `\n## سجل المعالجة (7 نوفمبر 2026)\n\n| المنصة | الملاحظة | العدد قبل | الحل | الدليل | الحالة |\n|---|---|---|---|---|---|\n`;
for (const [k, t, before, fix, ev] of RESOLVED) for (const [pl, nb] of Object.entries(before)) if (nb) lg += `| ${pl} | ${t} | ${nb} | ${fix} | ${ev} | ✅ تم الحل (المتبقي: ${LOG.filter((x) => x.plat === pl && x.k === k).length}) |\n`;
lg += `\n### ⚠ ملاحظة جديدة بعد إطفاء العدّاد: صفحة الهبوط (كل المنصات)\n\n| المنصة | الملاحظة | الحالة |\n|---|---|---|\n| كل المنصات (رابط «الطلب») | صفحة المؤسِّسين وصفحة الطلب على الموقع لسه نصّها «50 مقعدًا فقط، سعر المؤسِّس: 50%» (العنوان، والوصف، والأسئلة الشائعة «لماذا 50 مقعدًا فقط؟»، عربي وإنجليزي في \`src/content/ar.js\` و\`en.js\`). ده بيعارض اتجاه الحملة (لا سقف، لا خصم رقمي) | ⏳ **قرار الـCEO:** إعادة صياغة شروط العرض على الموقع. ما اتعدّلتش لأنها شروط تجارية |\n`;
lg += `\n**الملاحظات اللي فاضلة كلها إدخال أو قرار بشري** (تصوير، أو رابط البث، أو اعتماد): حالتها «محتاج قرار بشري» لحد ما تتسجّل في \`readiness.json → obs\`.\n`;
fs.writeFileSync(path.join(ROOT, 'marketing/content/platform-observations.md'), lg);
console.log(`wrote november-calendar.md + platform-observations.md · ${cnt.total} posts on connected platforms: ${cnt.uploadReady} ready to upload now, ${cnt.audio} videos pending audio, ${cnt.prodReady} produced + copy ready, ${cnt.needs} need production/input, ${cnt.uploaded} uploaded, ${cnt.reviewed} reviewed, ${cnt.full} fully ready · TikTok/manual pending ${pend.length}`);

