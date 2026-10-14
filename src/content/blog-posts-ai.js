// Blog posts batch AI: twelve AR/EN articles on AI in accounting, AI in audit and AI with Odoo 20.
// One file per article in ./ai-articles, each exporting { en, ar } with the same slug.
// Odoo 20 claims come only from Odoo's official 20 release notes; statistics carry their source in `sources`.
// Same rules as blog.en.js / blog.ar.js: no client amounts, no long dashes, methodology or MFT practice only.
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'ai-articles');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js')).sort();
const pairs = files.map((f) => require(path.join(dir, f)));

module.exports = { en: pairs.map((x) => x.en), ar: pairs.map((x) => x.ar) };
