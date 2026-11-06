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

// φ: the proportion system (CEO, 7 Nov 2026). One source for every generator.
//   SPACE  Fibonacci spacing 5 · 8 · 13 · 21 · 34 · 55 · 89 · 144 · 233 · 377 · 610
//   TYPE   16 × √φ^n (n = −4…17): 6 … 752; two steps = φ (primary hierarchy levels)
//   split(L) → [L/φ, L − L/φ];  points(w, h) → the four golden points of a frame
const PHI = T.phi.ratio;
const SPACE = T.phi.space;
const TYPE = Array.from({ length: 22 }, (_, i) => Math.round(T.phi.typeBase * Math.pow(Math.sqrt(PHI), i - 4)));
const nearest = (set, v) => set.reduce((a, b) => (Math.abs(b - v) < Math.abs(a - v) ? b : a));
const phi = {
  PHI, SPACE, TYPE,
  space: (n) => SPACE[n], type: (n) => TYPE[n + 4],
  snapSpace: (v) => nearest(SPACE, v), snapType: (v) => nearest(TYPE, v),
  onScale: (set, v, tol = 1) => set.some((x) => Math.abs(x - v) <= tol),
  split: (L) => [L / PHI, L - L / PHI],
  points: (w, h) => [[w / PHI, h / PHI], [w - w / PHI, h / PHI], [w / PHI, h - h / PHI], [w - w / PHI, h - h / PHI]]
};

module.exports = { ...T, legacy, contrast, lum, FILE, phi };
