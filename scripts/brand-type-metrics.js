#!/usr/bin/env node
// Measures Arabic ↔ Latin type pairings from the font files themselves (no eyeballing).
//   node scripts/brand-type-metrics.js        → marketing/brand/tokens/type-metrics.json
// For each candidate pairing, at Regular (the files' default instance), in units of the em:
//   latin.x     x-height (glyph «x» top)           latin.cap   cap height (glyph «H» top)
//   arabic.body Arabic body height: median top of «بصمعفهقو» joined, no ascenders (≈ x-height)
//   arabic.alef alef height (the Arabic analogue of cap height)
//   stem        vertical stem thickness: dotless «ı» bbox width (Latin), isolated alef width (Arabic)
// Then: body/x (≈ 1 means the two scripts look the same size at one font-size), stem ratio
// (≈ 1 means the same colour on the page), and the size-adjust the Latin face would need.
// Fonts read: this repo's Cairo + Inter (the campaign), the platform's IBM Plex Sans Arabic (the PDF
// reports; its Latin is IBM Plex Sans, drawn as one family). fontkit comes from the platform's Next.js.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const FONTKIT = process.env.FONTKIT || '/Users/mac/seg-audit/portal/node_modules/next/dist/compiled/@next/font/dist/fontkit';
const fk = require(FONTKIT).default;
const PLEX = process.env.PLEX_DIR || path.join(ROOT, 'marketing/brand/fonts');
const load = (p) => fk(fs.readFileSync(p));

function arabic(font) {
  const em = font.unitsPerEm;
  // body: median top of 8 letters with no ascender, in joined forms (bowls, teeth, loops)
  const tops = font.layout('بصمعفهقو').glyphs.map((g) => g.bbox.maxY).filter((y) => y > 0 && y < 0.62 * em).sort((a, b) => a - b);
  const alef = font.glyphForCodePoint(0x627).bbox;
  return { body: tops[Math.floor(tops.length / 2)] / em, alef: alef.maxY / em, stem: (alef.maxX - alef.minX) / em };
}
function latin(font) {
  // stem: dotless ı (U+0131) has no tail or serif in either face, so its bbox width is the stem
  const em = font.unitsPerEm, x = font.glyphForCodePoint(120).bbox, H = font.glyphForCodePoint(72).bbox, l = font.glyphForCodePoint(font.hasGlyphForCodePoint(0x131) ? 0x131 : 108).bbox;
  return { x: x.maxY / em, cap: H.maxY / em, stem: (l.maxX - l.minX) / em };
}
const r3 = (n) => Math.round(n * 1000) / 1000;
const pairs = [
  { id: 'cairo+inter', use: 'الحملة والموقع اليوم', ar: load(path.join(ROOT, 'src/assets/fonts/cairo-arabic-var.woff2')), la: load(path.join(ROOT, 'src/assets/fonts/inter-latin-var.woff2')) },
  { id: 'plexArabic+plexSans', use: 'تقارير الـPDF في المنصة', ar: load(path.join(PLEX, 'IBMPlexSansArabic-Regular.ttf')), la: load(path.join(PLEX, 'IBMPlexSansArabic-Regular.ttf')) },
  { id: 'plexArabic+inter', use: 'بديل: Plex عربي + Inter', ar: load(path.join(PLEX, 'IBMPlexSansArabic-Regular.ttf')), la: load(path.join(ROOT, 'src/assets/fonts/inter-latin-var.woff2')) },
  { id: 'cairo+plexSans', use: 'بديل: Cairo + Plex لاتيني', ar: load(path.join(ROOT, 'src/assets/fonts/cairo-arabic-var.woff2')), la: load(path.join(PLEX, 'IBMPlexSansArabic-Regular.ttf')) }
];
const out = pairs.map((p) => {
  const a = arabic(p.ar), l = latin(p.la);
  return {
    id: p.id, use: p.use,
    arabic: { family: p.ar.familyName, body: r3(a.body), alef: r3(a.alef), stem: r3(a.stem) },
    latin: { family: p.la.familyName, x: r3(l.x), cap: r3(l.cap), stem: r3(l.stem) },
    bodyToX: r3(a.body / l.x), alefToCap: r3(a.alef / l.cap), stemRatio: r3(a.stem / l.stem),
    latinSizeAdjust: r3(a.body / l.x)
  };
});
fs.writeFileSync(path.join(ROOT, 'marketing/brand/tokens/type-metrics.json'), JSON.stringify({ generatedBy: 'scripts/brand-type-metrics.js', note: 'Regular instances; ratios ≈ 1.000 = the two scripts match', pairs: out }, null, 2) + '\n');
for (const o of out) console.log(o.id.padEnd(22), 'body/x', o.bodyToX, ' alef/cap', o.alefToCap, ' stem', o.stemRatio, ' |', JSON.stringify(o.arabic), JSON.stringify(o.latin));
