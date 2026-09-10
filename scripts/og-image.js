#!/usr/bin/env node
// Renders the Open Graph share images (1200×630) for each language into
// src/assets/img/og-<lang>.png using the brand system: navy field, white logo
// top-left, headline, cyan rule. Needs Playwright + Google Chrome:
//   npm i -D playwright   (or set PLAYWRIGHT_PATH to an existing install)
//   node scripts/og-image.js
const fs = require('fs');
const path = require('path');

let chromium;
try { ({ chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright')); }
catch { console.error('playwright not found. npm i -D playwright, or set PLAYWRIGHT_PATH.'); process.exit(1); }

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'src/assets/img');
const config = require('../src/site.config.js');
const b64 = (p) => fs.readFileSync(path.join(ROOT, p)).toString('base64');

const LOGO_FILE = 'file://' + path.join(ROOT, 'src/assets/logo/mft-lockup-white.png');
const INTER = b64('src/assets/fonts/inter-latin-var.woff2');
const CAIRO = b64('src/assets/fonts/cairo-arabic-var.woff2');

function html(c) {
  const rtl = c.dir === 'rtl';
  const headline = c.home.hero.headline.replace(/\{\/?accent\}/g, (m) => (m === '{accent}' ? '<span class="a">' : '</span>')).replace(/\{\/?lat\}/g, '').replace('\n', '<br>');
  return `<!DOCTYPE html><html lang="${c.htmlLang}" dir="${c.dir}"><head><meta charset="utf-8"><style>
@font-face{font-family:Inter;font-weight:400 900;src:url(data:font/woff2;base64,${INTER}) format('woff2');unicode-range:U+0000-00FF,U+2000-206F}
@font-face{font-family:Cairo;font-weight:400 900;src:url(data:font/woff2;base64,${CAIRO}) format('woff2')}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#101B3A;color:#fff;font-family:Inter,Cairo,sans-serif;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between}
.top{display:flex;justify-content:space-between;align-items:center;direction:ltr}
.top img{height:64px}
.eyebrow{font-size:22px;font-weight:700;color:#7AA7FF;${rtl ? '' : 'letter-spacing:3px;text-transform:uppercase;'}}
h1{font-size:${rtl ? 76 : 80}px;font-weight:800;line-height:${rtl ? 1.3 : 1.08};max-width:1000px}
h1 .a{color:#7AA7FF}
.bottom{display:flex;justify-content:space-between;align-items:flex-end}
.tag{font-size:24px;font-weight:600;color:rgba(255,255,255,.78)}
.rule{width:180px;height:6px;background:#7AA7FF}
</style></head><body>
<div class="top"><img src="${LOGO_FILE}" alt=""><span class="eyebrow" dir="${c.dir}">${c.home.hero.eyebrow}</span></div>
<h1>${headline}</h1>
<div class="bottom"><span class="tag">${c.home.hero.trust[4]}</span><span class="rule"></span></div>
</body></html>`;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome' });
  for (const lang of config.languages) {
    const c = require(`../src/content/${lang}.js`);
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
    const tmp = path.join(require('os').tmpdir(), `mft-og-${lang}.html`);
    fs.writeFileSync(tmp, html(c));
    await page.goto('file://' + tmp);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    const file = path.join(OUT, `og-${lang}.png`);
    await page.screenshot({ path: file });
    console.log('wrote', path.relative(ROOT, file));
    await page.close();
  }
  await browser.close();
})();
