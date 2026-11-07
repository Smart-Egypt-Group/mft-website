// Caption cues for every campaign video: [[start s, end s, text], …]. Shared by scripts/video-captions.js
// (the .srt files) and the renderers that burn the same cues into the picture (reels-cinematic.js,
// tiktok-videos.js), so the burned-in captions and the caption files never disagree.
// Sources, in order:
//   1. the scripts (marketing/content/voiceover-scripts-nov.md, R1–R12 and T1–T4): one cue per timed line.
//      The videos are music-only (CEO, 7 Nov 2026: no voice-over); the lines are read, not spoken.
//   2. videos with no script (4:5 / 16:9 cuts, council, selectivity, days): the copy on screen, from the
//      campaign kit (scripts/lib/campaign.js), so captions never invent a line.
// Digits are Western (0-9) everywhere, as in every campaign asset.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '../..');
const { COPY: K, CLOSE } = require('./campaign.js');

const western = (s) => s.replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x660)).replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x6f0));
const clean = (t) => western(t.replace(/\*\([^)]*\)\*/g, '').replace(/\*\*/g, '').replace(/[*`]/g, '').replace(/‏/g, '').replace(/\s+/g, ' ').trim());

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
const ON = {
  'council-story_ar': [[0.3, 7.8, `مقعدك في المجلس، لو اتقبلت.\n${K.ar.select}`]],
  'council-story_en': [[0.3, 7.8, `Your seat on the council, if accepted.\n${K.en.select}`]],
  'selectivity-story_ar': [[0.3, 4, 'مش كل طلب بيتقبل.'], [4, 7.8, `${K.ar.review}\n${K.ar.closesOn}`]],
  'days-4x5_ar': [[0.3, 4, `يُغلق ${CLOSE.arShort}`], [4, 7.8, `سعر المؤسِّس… ${K.ar.after}`]]
};
// base = the video file name without .mp4 → [cues, source] or [null, null]
function cuesFor(base) {
  const k = base.replace(/_\d+x\d+(_8s)?$/, '');
  if (SCRIPT[k]) return [SCRIPT[k], 'script'];
  if (ON[k]) return [ON[k].map(([a, b, x]) => [a, b, western(x)]), 'on-screen'];
  const v = k.match(/(live|close)-(ar|en)$/); // 4:5 and 16:9 cuts carry the same copy as the 9:16 motion
  if (v && SCRIPT[`tiktok-9x16_${v[1]}-${v[2]}`]) return [SCRIPT[`tiktok-9x16_${v[1]}-${v[2]}`], 'script (same motion)'];
  return [null, null];
}
module.exports = { cuesFor, western };
