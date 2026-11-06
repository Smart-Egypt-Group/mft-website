#!/usr/bin/env node
// The founder-price close date in words, from src/site.config.js → founding.closesAt, plus a claims check
// for marketing copy. No dependencies.
//
//   node scripts/close-date.js                 print the canonical AR/EN strings
//   node scripts/close-date.js --check         fail on withdrawn or stale claims in marketing/ (17/33, X of 50,
//                                              7,900 tests, 361 checks) and on close dates that differ from config
//   node scripts/close-date.js --from <ISO>    rewrite every written form of the OLD date to the current one
//                                              across marketing/**/*.md (countdown lines «باقي N أيام» are listed
//                                              for a manual pass; they are not rewritten)
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const { founding } = require('../src/site.config.js');

const DAYS_AR = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS_AR = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Cairo wall-clock parts of an ISO string that carries its own offset (e.g. 2026-11-30T23:59:00+02:00)
function parts(iso) {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!m) throw new Error('closesAt must look like 2026-11-30T23:59:00+02:00');
  const [y, mo, d, h, mi] = m.slice(1).map(Number);
  const dow = new Date(Date.UTC(y, mo - 1, d)).getUTCDay();
  return { y, mo, d, h, mi, dow };
}
function words(iso) {
  const p = parts(iso), h12 = ((p.h + 11) % 12) + 1, mm = String(p.mi).padStart(2, '0');
  const pmAr = p.h >= 12 ? 'مساءً' : 'صباحًا', pmEn = p.h >= 12 ? 'pm' : 'am';
  return {
    arFull: `${DAYS_AR[p.dow]} ${p.d} ${MONTHS_AR[p.mo - 1]} ${p.y}، ${h12}:${mm} ${pmAr} بتوقيت القاهرة`,
    arDay: `${DAYS_AR[p.dow]} ${p.d} ${MONTHS_AR[p.mo - 1]}`,
    arShort: `${p.d} ${MONTHS_AR[p.mo - 1]}`,
    arTime: `${h12}:${mm} ${pmAr}`,
    enFull: `${DAYS_EN[p.dow]} ${p.d} ${MONTHS_EN[p.mo - 1]} ${p.y}, ${h12}:${mm} ${pmEn} Cairo time`,
    enDay: `${DAYS_EN[p.dow]} ${p.d} ${MONTHS_EN[p.mo - 1]}`,
    enShort: `${p.d} ${MONTHS_EN[p.mo - 1]}`
  };
}

function mdFiles(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...mdFiles(p)); else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

const W = words(founding.closesAt);
const arg = process.argv[2];

if (!arg) { console.log(JSON.stringify({ closesAt: founding.closesAt, ...W }, null, 2)); process.exit(0); }

if (arg === '--from') {
  const old = words(process.argv[3] || '');
  let n = 0;
  for (const f of mdFiles(path.join(ROOT, 'marketing'))) {
    let s = fs.readFileSync(f, 'utf8'); const before = s;
    for (const k of ['arFull', 'enFull', 'arDay', 'enDay', 'arShort', 'enShort']) s = s.split(old[k]).join(W[k]);
    if (s !== before) { fs.writeFileSync(f, s); n++; console.log('rewrote', path.relative(ROOT, f)); }
    s.split('\n').forEach((l, i) => { if (/باقي \d+ (يوم|أيام)|\d+ days? (left|to go)|أيام على الإغلاق/.test(l)) console.log(`  check countdown: ${path.relative(ROOT, f)}:${i + 1}`); });
  }
  console.log(`${n} file(s) rewritten to ${W.arFull}`);
  process.exit(0);
}

if (arg === '--check') {
  // Files that discuss the withdrawn claims on purpose (history, reviews, the redo list) are skipped.
  const SKIP = /marketing\/strategy\/|marketing\/designs\/.*README\.md$/;
  const RULES = [
    [/انضم[ّ]?ت\s*(17|١٧)|(17|١٧)\s*شركة\s*انضم|باقي\s*(33|٣٣)|بقي\s*(33|٣٣)|(33|٣٣)\s*من\s*(50|٥٠)|\b33\s*\/\s*50\b|\b\d+ of 50 (seats )?left|17 companies/, 'withdrawn seat count (17/33)'],
    [/7,900|٧٬٩٠٠/, 'stale test count (now ' + require('../src/content/platform-facts.js').testsFloor + ')'],
    [/\b361\b|٣٦١/, 'stale check count (now ' + require('../src/content/platform-facts.js').checks + ')']
  ];
  const otherClose = new RegExp(`(يُغلق|يغلق|يتقفل|يختفي|closes)[^\\n]{0,40}?(\\d{1,2}) (${MONTHS_AR.join('|')}|${MONTHS_EN.join('|')})`);
  let bad = 0;
  for (const f of mdFiles(path.join(ROOT, 'marketing'))) {
    const rel = path.relative(ROOT, f);
    if (SKIP.test(rel)) continue;
    fs.readFileSync(f, 'utf8').split('\n').forEach((l, i) => {
      if (/withdrawn|مسحوب|ممنوع|لا تُستخدم|forbidden/i.test(l)) return; // lines that name the rule itself
      for (const [re, why] of RULES) if (re.test(l)) { bad++; console.log(`${rel}:${i + 1}  ${why}`); }
      const m = l.match(otherClose);
      if (m && `${m[2]} ${m[3]}` !== W.arShort && `${m[2]} ${m[3]}` !== W.enShort) { bad++; console.log(`${rel}:${i + 1}  close date ${m[2]} ${m[3]} ≠ ${W.arShort}`); }
    });
  }
  console.log(bad ? `\n${bad} problem(s)` : `marketing copy clean · close date ${W.arFull}`);
  process.exit(bad ? 1 : 0);
}
console.error('unknown option'); process.exit(2);
