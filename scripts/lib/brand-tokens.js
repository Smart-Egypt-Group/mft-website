// SEG design tokens for the generators: one source, marketing/brand/tokens/seg-tokens.json.
//   const T = require('./lib/brand-tokens.js');  T.color.navy, T.font.stack, T.space[4] …
//   const { NAVY, CYAN, W } = require('./lib/brand-tokens.js').legacy;   (the names the generators use)
// Also: contrast(a, b) → WCAG ratio, used by the identity build and by checks.
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', '..', 'marketing/brand/tokens/seg-tokens.json');
const T = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const c = T.color;

// Names already used across the generators, now read from the tokens instead of typed per file.
const legacy = {
  NAVY: c.navy, DEEP: c.navyDeep, NIGHT: c.navyNight, CYAN: c.cyan, CYAN_INK: c.cyanInk, CYAN_DEEP: c.cyanDeep,
  W: c.white, RED: c.danger, PAPER: c.paper, SURFACE: c.surface, LINE: c.line, SLATE: c.slate, MUTED: c.muted,
  SEG: c.seg700, SEG_DARK: c.seg900, SEG_LIGHT: c.seg500
};

function lum(hex) {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}
const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

module.exports = { ...T, legacy, contrast, lum, FILE };
