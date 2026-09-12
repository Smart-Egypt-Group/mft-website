#!/usr/bin/env node
// Quality gate. Fails the build on:
//   - any text/background token pair below WCAG AA (4.5:1 normal, 3:1 large)
//   - HTML: missing lang/dir, ≠1 <h1>, <img> without alt, form controls without a label,
//     leaked {lat}/{accent} tokens, broken internal links, letter-spacing on Arabic
// Run after `node build.js`.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const CSS = fs.readFileSync(path.join(ROOT, 'src/styles/main.css'), 'utf8');
let failures = 0;
const fail = (msg) => { failures++; console.error('  ✗ ' + msg); };
const ok = (msg) => console.log('  ✓ ' + msg);

/* ---------- 1. Contrast ---------- */
function token(name) {
  const m = CSS.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{6}|rgba?\\([^)]*\\)|var\\(--[\\w-]+\\))`));
  if (!m) throw new Error('token not found: ' + name);
  const alias = m[1].match(/^var\(--([\w-]+)\)$/);
  return alias ? token(alias[1]) : m[1];
}
function toRGB(v, bg) {
  if (v.startsWith('#')) return [1, 3, 5].map((i) => parseInt(v.slice(i, i + 2), 16));
  const [r, g, b, a = 1] = v.match(/[\d.]+/g).map(Number);
  return [r, g, b].map((ch, i) => Math.round(ch * a + bg[i] * (1 - a))); // composite over bg
}
function lum([r, g, b]) {
  const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function ratio(fg, bg) {
  const b = toRGB(bg, [255, 255, 255]);
  const f = toRGB(fg, b);
  const [l1, l2] = [lum(f), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}
// [foreground token, background token, minimum, where it is used]
const PAIRS = [
  ['ink', 'white', 4.5, 'body text'],
  ['ink-2', 'white', 4.5, 'secondary text, nav links, subhead'],
  ['ink-3', 'white', 4.5, 'hints, captions, footer-size text'],
  ['ink-2', 'mist', 4.5, 'card text on mist sections'],
  ['ink-3', 'mist', 4.5, 'hints on mist'],
  ['cyan-text', 'white', 4.5, 'eyebrow, accent word, links on white'],
  ['cyan-text', 'mist', 4.5, 'eyebrow on mist'],
  ['cyan', 'navy', 4.5, 'eyebrow / numbers on navy sections'],
  ['navy', 'cyan', 4.5, 'primary CTA label, cyan band text'],
  ['white', 'navy', 4.5, 'navy sections, footer'],
  ['on-navy-2', 'navy', 4.5, 'secondary text on navy'],
  ['on-navy-3', 'navy', 4.5, 'tertiary text on navy'],
  ['on-navy-4', 'navy', 4.5, 'hero B trust line (reference: white at 50%)'],
  ['line-strong', 'white', 3, 'input borders (non-text 3:1)'],
  // Guard rails — these MUST stay out of text use. Documented, not asserted:
  // cyan on white ≈ 2.4:1, gold on white ≈ 2.4:1.
];
console.log('Contrast (WCAG AA):');
for (const [fg, bg, min, where] of PAIRS) {
  const r = ratio(token(fg), token(bg));
  const line = `${fg} on ${bg} = ${r.toFixed(2)}:1 (min ${min}) — ${where}`;
  r >= min ? ok(line) : fail(line);
}
const cyanOnWhite = ratio(token('cyan'), token('white'));
const goldOnWhite = ratio(token('gold'), token('white'));
console.log(`  · reference: brand cyan on white = ${cyanOnWhite.toFixed(2)}:1, gold on white = ${goldOnWhite.toFixed(2)}:1 → never used for text on light backgrounds`);
// Make sure no rule sets text colour to raw cyan/gold on a light surface.
if (/color:\s*var\(--gold\)/.test(CSS)) fail('CSS sets a text colour to --gold');
else ok('gold is never used as a text colour');

/* ---------- 2. HTML ---------- */
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    e.isDirectory() ? walk(p, out) : e.name.endsWith('.html') && out.push(p);
  }
  return out;
}
const files = walk(DIST);
console.log(`\nHTML (${files.length} files):`);
let htmlIssues = 0;
for (const file of files) {
  const rel = path.relative(DIST, file);
  const html = fs.readFileSync(file, 'utf8');
  const problems = [];
  if (rel === 'index.html') continue; // root redirect stub
  if (!/<html[^>]*\slang="/.test(html)) problems.push('missing lang');
  if (!/<html[^>]*\sdir="/.test(html)) problems.push('missing dir');
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) problems.push(`${h1s} <h1>`);
  for (const img of html.match(/<img[^>]*>/g) || []) if (!/\salt="/.test(img)) problems.push('img without alt');
  if (/\{\/?(lat|accent)\}/.test(html)) problems.push('leaked content token');
  if (/\bundefined\b|\[object Object\]/.test(html)) problems.push('"undefined" or [object Object] in output');
  // form controls need a <label for>
  for (const ctl of html.match(/<(input|select|textarea)[^>]*>/g) || []) {
    const id = (ctl.match(/\sid="([^"]+)"/) || [])[1];
    if (/type="hidden"/.test(ctl)) continue;
    if (!id || !html.includes(`for="${id}"`)) problems.push(`control without label: ${ctl.slice(0, 60)}`);
  }
  // internal links resolve
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const target = m[1];
    if (target.startsWith('//')) continue;
    const candidates = [path.join(DIST, target), path.join(DIST, target, 'index.html')];
    if (!candidates.some((c) => fs.existsSync(c))) problems.push(`broken link ${target}`);
  }
  for (const m of html.matchAll(/(?:src|href)="(\/assets\/[^"?]+)/g)) {
    if (!fs.existsSync(path.join(DIST, m[1]))) problems.push(`missing asset ${m[1]}`);
  }
  // JSON-LD must parse and carry a @type
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { const o = JSON.parse(m[1]); if (!o['@type'] && !o['@graph']) problems.push('JSON-LD without @type'); } catch { problems.push('invalid JSON-LD'); }
  }
  // RTL: no letter-spacing anywhere except inside .lat / reset rules
  if (/dir="rtl"/.test(html) && /style="[^"]*letter-spacing/.test(html)) problems.push('inline letter-spacing on RTL page');
  if (problems.length) { htmlIssues++; fail(`${rel}: ${problems.join('; ')}`); }
}
if (!htmlIssues) ok('lang/dir, single h1, alt text, labels, tokens, links, assets');

/* ---------- 3. Content is final ---------- */
console.log('\nContent:');
let todo = 0;
for (const lang of ['en', 'ar']) {
  const src = fs.readFileSync(path.join(ROOT, `src/content/${lang}.js`), 'utf8');
  const hits = src.match(/TODO\(|lorem ipsum|placeholder text/gi) || [];
  if (hits.length) { todo += hits.length; fail(`${lang}.js still has ${hits.length} TODO/placeholder marker(s)`); }
}
if (!todo) ok('no TODO or placeholder markers in content files');
// Client confidentiality (Ahmed, 11 Sep 2026): no real financial amount of any client on the
// site. The only allowed currency figures are the illustrative dashboard KPIs in heroB.dashboard.
let money = 0;
for (const lang of ['en', 'ar']) {
  const src = fs.readFileSync(path.join(ROOT, `src/content/${lang}.js`), 'utf8').replace(/dashboard:\s*\{[\s\S]*?bars:/g, '');
  const hits = src.match(/\b(EGP|SAR|USD|AED)\b|\$\s?\d|\d\s?(million|billion)|جنيه|ريال|مليون|مليار|دولار/g) || [];
  if (hits.length) { money += hits.length; fail(`${lang}.js contains currency amounts: ${[...new Set(hits)].join(', ')}`); }
}
if (!money) ok('no client financial amounts in content (dashboard sample excluded)');
const cfg = fs.readFileSync(path.join(ROOT, 'src/site.config.js'), 'utf8');
if (/PENDING-DOMAIN/.test(cfg)) console.log('  ! siteUrl still PENDING (decision with Ahmed) — set it before production deploy');
else ok('siteUrl set');

/* ---------- 4. CSS sanity ---------- */
console.log('\nCSS:');
if (/\[dir="rtl"\][^{]*\{[^}]*letter-spacing:\s*0/.test(CSS)) ok('RTL resets letter-spacing');
else fail('RTL letter-spacing reset missing');
if (/linear-gradient|radial-gradient/.test(CSS)) fail('gradient found (brand rule: no gradients)');
else ok('no gradients');

console.log(failures ? `\n${failures} problem(s)` : '\nAll checks passed');
process.exit(failures ? 1 : 0);
