#!/usr/bin/env node
// Captions for every campaign video (rule: «كابشن دايمًا»). Writes marketing/designs/captions/<video>.srt
//   node scripts/video-captions.js          write + verify (exit 1 if any MP4 has no caption)
//   node scripts/video-captions.js --check  verify only
// Sources, in order:
//   1. the voice-over scripts (marketing/content/voiceover-scripts-nov.md, R1–R12 and T1–T4): one cue per
//      timed line of «النص المنطوق», so the captions match what will be spoken once the audio is recorded
//   2. videos with no script (4:5 / 16:9 cuts of the same motion, council, selectivity, days): the copy on
//      screen, from the campaign kit (scripts/lib/campaign.js), so captions never invent a line.
// Upload the .srt as the platform caption track (YouTube, Facebook, LinkedIn), or burn it in for Instagram.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const D = path.join(ROOT, 'marketing/designs');
const OUT = path.join(D, 'captions');
const { COPY: K, CLOSE } = require('./lib/campaign.js');
const CHECK = process.argv.includes('--check');

const ts = (s) => { const ms = Math.round(s * 1000), h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, sec = Math.floor(ms / 1000) % 60; return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')},${String(ms % 1000).padStart(3, '0')}`; };
const srt = (cues) => cues.map((c, i) => `${i + 1}\n${ts(c[0])} --> ${ts(c[1])}\n${c[2]}\n`).join('\n');
const clean = (t) => t.replace(/\*\([^)]*\)\*/g, '').replace(/\*\*/g, '').replace(/[*`]/g, '').replace(/‏/g, '').replace(/\s+/g, ' ').trim();

// 1. scripts
const VO = fs.readFileSync(path.join(ROOT, 'marketing/content/voiceover-scripts-nov.md'), 'utf8');
const SCRIPT = {};
for (const sec of VO.split(/\n### /).slice(1)) {
  const m = sec.match(/^(R\d+|T\d+) · `([^`]+)`/); if (!m) continue;
  const cues = [];
  for (const row of sec.matchAll(/^\| *(\d+(?:\.\d+)?)[–-](\d+(?:\.\d+)?) *\| *([^|]+)\|/gm)) {
    const text = clean(row[3]); if (!text || text === '—') continue;
    cues.push([+row[1], +row[2], text]);
  }
  if (cues.length) SCRIPT[m[2]] = cues;
}
// 2. on-screen copy for the cuts without a script
const ON = {
  'council-story_ar': [[0.3, 7.8, `مقعدك في المجلس، لو اتقبلت.\n${K.ar.select}`]],
  'council-story_en': [[0.3, 7.8, `Your seat on the council, if accepted.\n${K.en.select}`]],
  'selectivity-story_ar': [[0.3, 4, 'مش كل طلب بيتقبل.'], [4, 7.8, `${K.ar.review}\n${K.ar.closesOn}`]],
  'days-4x5_ar': [[0.3, 4, `يُغلق ${CLOSE.arShort}`], [4, 7.8, `سعر المؤسِّس… ${K.ar.after}`]]
};
const sourceFor = (base) => {
  const k = base.replace(/_\d+x\d+(_8s)?$/, '');
  if (SCRIPT[k]) return [SCRIPT[k], 'script'];
  if (ON[k]) return [ON[k], 'on-screen'];
  const v = k.match(/(live|close)-(ar|en)$/); // 4:5 and 16:9 cuts carry the same copy as the 9:16 motion
  if (v && SCRIPT[`tiktok-9x16_${v[1]}-${v[2]}`]) return [SCRIPT[`tiktok-9x16_${v[1]}-${v[2]}`], 'script (same motion)'];
  return [null, null];
};
const videos = ['video', 'ads/video'].flatMap((d) => fs.readdirSync(path.join(D, d)).filter((f) => f.endsWith('.mp4')).map((f) => path.join(d, f)));
fs.mkdirSync(OUT, { recursive: true });
const missing = [];
let n = 0;
for (const v of videos) {
  const base = path.basename(v, '.mp4'), [cues, src] = sourceFor(base), file = path.join(OUT, `${base}.srt`);
  if (!cues) { missing.push(v); continue; }
  if (!CHECK) fs.writeFileSync(file, srt(cues));
  if (!fs.existsSync(file)) missing.push(v); else n++;
  if (!CHECK) console.log(`${base}.srt · ${cues.length} cues · ${src}`);
}
if (missing.length) { console.error('no caption for:\n' + missing.join('\n')); process.exit(1); }
console.log(`captions: ${n}/${videos.length} videos → marketing/designs/captions/`);
