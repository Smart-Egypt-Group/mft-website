#!/usr/bin/env node
// Design QA for the November 2026 campaign (quality pass, 6 Nov 2026). No dependencies.
//   node scripts/design-qa.js
// Fails (exit 1) on:
//   1. forbidden copy in any design generator (seat counts and seat language, «مدى الحياة», numeric
//      discounts): scripts/lib/campaign.js → FORBIDDEN
//   2. withdrawn assets still in marketing/designs or marketing/brand/assets (file names with seats,
//      hourglass, scarcity-proof)
//   3. any image whose pixel size is not the size in its file name, or whose size is not a known
//      platform spec (Instagram, Facebook, LinkedIn, TikTok, YouTube, X)
//   4. a generator that draws the old «MFT» text signature instead of the shared SEG signature
//   5. the SEG logo: the shared kit (scripts/lib/campaign.js) must load the SEG cube files; a generator
//      that writes «SEG» as a wordmark (fillText('SEG'…), <span class="lat">SEG…) must take its logo from
//      the kit, and no generator may load the MFT mark (src/assets/logo/mft-mark-*) except on a line
//      marked «qa-allow-mft-mark» (MFT's own company avatars)
//   6. design tokens: brand colours and font files come from marketing/brand/tokens/seg-tokens.json
//      (scripts/lib/brand-tokens.js), never typed per generator
// Comment lines (// …) in generators are not scanned: they document what was withdrawn.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const { FORBIDDEN } = require('./lib/campaign.js');

const GENERATORS = ['launch-images', 'launch-concepts', 'psych-ads', 'golden-ads', 'guerrilla-ads', 'launch-week-assets', 'brand-profiles', 'tiktok-videos', 'reels-cinematic'];
// Platform specs: [w, h, where]
const SPECS = [
  [1080, 1080, 'IG/FB/LI square · Meta 1:1'], [1080, 1350, 'IG/FB/LI portrait 4:5 · Meta 4:5'], [1080, 1920, 'Story/Reel/TikTok/Shorts 9:16'],
  [1200, 630, 'LinkedIn/Facebook link'], [1600, 900, 'X post'], [1280, 720, 'YouTube thumbnail'], [1920, 1080, 'YouTube/LinkedIn 16:9 video frame'], [2560, 1440, 'YouTube banner'],
  [1128, 191, 'LinkedIn company cover'], [1584, 396, 'LinkedIn personal banner'], [1500, 500, 'X header'], [1640, 624, 'Facebook cover'],
  [150, 150, 'YouTube watermark'], [1240, 1754, 'A4 at 150 dpi'], [2316, 1180, 'storyboard sheet'], [1860, 1180, 'storyboard sheet']
];
const AVATAR = /avatar_/; // avatars: each platform's own square size
const LOGO_DIR = /brand\/assets\/(logo|identity)\//; // logo masters and identity boards: their own sizes

const problems = [];
// 1 + 4: generator sources
for (const g of GENERATORS) {
  const lines = fs.readFileSync(path.join(ROOT, 'scripts', g + '.js'), 'utf8').split('\n');
  lines.forEach((l, i) => {
    if (/^\s*\/\//.test(l)) return;
    for (const [re, why] of FORBIDDEN) if (re.test(l)) problems.push(`scripts/${g}.js:${i + 1}: ${why}`);
    if (/<span>MFT<\/span>|fillText\('MFT'/.test(l)) problems.push(`scripts/${g}.js:${i + 1}: old MFT text signature (use signHTML / the SEG signature)`);
  });
}

const { imageSize: size } = require('./lib/media-info.js');
// 5: the SEG logo
const KIT = fs.readFileSync(path.join(ROOT, 'scripts/lib/campaign.js'), 'utf8');
for (const f of ['seg-logo_sign.png', 'seg-logo_sign-white.png']) {
  if (!KIT.includes(f)) problems.push(`scripts/lib/campaign.js: signature does not load the SEG logo (${f})`);
  if (!fs.existsSync(path.join(ROOT, 'marketing/brand/assets/logo', f))) problems.push(`marketing/brand/assets/logo/${f}: missing`);
}
if (/mft-mark-/.test(KIT.replace(/^\s*\/\/.*$/gm, ''))) problems.push('scripts/lib/campaign.js: signature still loads the MFT mark');
for (const g of GENERATORS) {
  const src = fs.readFileSync(path.join(ROOT, 'scripts', g + '.js'), 'utf8');
  const usesKitLogo = /require\('\.\/lib\/campaign\.js'\)/.test(src) && /\bMARK\b|signHTML|SIGN_CANVAS_SRC|drawSign/.test(src);
  src.split('\n').forEach((l, i) => {
    if (/^\s*\/\//.test(l)) return;
    if (/^const\s+(NAVY|CYAN|W|RED|DEEP|PAPER|CYAN_INK)\s*=\s*'#/.test(l)) problems.push(`scripts/${g}.js:${i + 1}: brand colour typed locally (read it from scripts/lib/brand-tokens.js → legacy)`);
    if (/src\/assets\/fonts\/[a-z-]+\.woff2/.test(l)) problems.push(`scripts/${g}.js:${i + 1}: font path typed locally (read it from scripts/lib/brand-tokens.js → font)`);
    if (/mft-mark-/.test(l) && !/qa-allow-mft-mark/.test(l)) problems.push(`scripts/${g}.js:${i + 1}: loads the MFT mark (the SEG logo comes from scripts/lib/campaign.js → MARK)`);
    if (/fillText\('SEG'|class="lat">SEG|>SEG<\/(b|span)>/.test(l) && !usesKitLogo) problems.push(`scripts/${g}.js:${i + 1}: writes SEG as text without the SEG logo`);
  });
}

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p)); else out.push(p);
  }
  return out;
}
let images = 0;
const bySpec = {};
for (const base of ['marketing/designs', 'marketing/brand/assets']) {
  for (const f of walk(path.join(ROOT, base))) {
    const rel = path.relative(ROOT, f);
    if (/seats|hourglass|scarcity-proof/.test(path.basename(f))) problems.push(`${rel}: withdrawn asset still present`);
    if (!/\.(png|jpe?g|webp)$/i.test(f)) continue;
    const s = size(f); images++;
    if (!s) { problems.push(`${rel}: unreadable image header`); continue; }
    const named = [...path.basename(f).matchAll(/_(\d{3,})x(\d{3,})(?=[_.])/g)].pop();
    if (named && (+named[1] !== s[0] || +named[2] !== s[1])) problems.push(`${rel}: is ${s[0]}×${s[1]}, name says ${named[1]}×${named[2]}`);
    const spec = SPECS.find(([w, h]) => w === s[0] && h === s[1]);
    if (!spec && !(AVATAR.test(f) && s[0] === s[1]) && !LOGO_DIR.test(rel)) problems.push(`${rel}: ${s[0]}×${s[1]} is not a platform spec`);
    const k = spec ? spec[2] : LOGO_DIR.test(rel) ? 'logo master' : 'avatar';
    bySpec[k] = (bySpec[k] || 0) + 1;
  }
}

console.log(`checked ${GENERATORS.length} generators and ${images} images`);
for (const [k, n] of Object.entries(bySpec).sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(4)}  ${k}`);
if (problems.length) { console.error(`\n${problems.length} problem(s):\n` + problems.join('\n')); process.exit(1); }
console.log('design QA: clean');
