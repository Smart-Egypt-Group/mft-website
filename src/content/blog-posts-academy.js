// Blog posts batch Academy: SEG Academy, 22 Arabic articles, one per report on the platform
// (REPORTS in seg-audit audit-engine/app/reports/catalog.py @649e283f, the same commit as platform-facts.js).
// One file per article in ./academy-articles, each exporting { ar }. Arabic only: the build drops the
// hreflang to the missing English page. Rules: marketing/content/academy/_writer-brief.md
// (evidence or silence, no client figures, illustrative examples labelled, no long dashes).
//
// Scheduling: a post dated after today (Cairo) is not built. The site is static, so a post goes live
// on the first deploy on or after its date (scripts/academy-publish.js). ACADEMY_ALL=1 builds them all
// (local preview only).
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'academy-articles');
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => /^\d{2}-.+\.js$/.test(f)).sort() : [];
const today = new Date(Date.now() + 2 * 3600 * 1000).toISOString().slice(0, 10); // Cairo (UTC+2)
const hooks = require('./academy-hooks.js');
const art = (slug) => fs.existsSync(path.join(__dirname, '..', 'assets', 'img', 'blog', `${slug}-og.jpg`));
// Artwork from scripts/article-images.js (hook on the image); added here so the article files stay untouched.
const all = files.map((f) => require(path.join(dir, f)).ar)
  .map((p) => (!p.image && hooks[p.slug] && art(p.slug) ? { ...p, image: { alt: `أكاديمية SEG: ${hooks[p.slug].hook.join('، ')}` } } : p));
const ar = process.env.ACADEMY_ALL === '1' ? all : all.filter((p) => p.date <= today);

module.exports = { ar, en: [], all };
