#!/usr/bin/env node
// Static site build. Zero dependencies.
//   node build.js                     → dist/ (production)
//   node build.js --mark-placeholders → dist/ with visible "placeholder" tags on pending slots
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const config = require('./src/site.config.js');
// Preview/CI overrides (never edit site.config.js for a temporary deploy):
//   SITE_URL       canonical origin, e.g. https://smart-egypt-group.github.io/mft-website-preview
//   BASE_PATH      sub-path the site is served from, e.g. /mft-website-preview  (default: none)
//   FORM_ENDPOINT  '' to disable online submission on hosts without the function
if (process.env.SITE_URL) config.siteUrl = process.env.SITE_URL.replace(/\/$/, '');
if (process.env.FORM_ENDPOINT !== undefined) config.formEndpoint = process.env.FORM_ENDPOINT;
//   FORM_MODE      'function' (default) or 'odoo-direct' (static hosts without a function runtime)
if (process.env.FORM_MODE) config.formMode = process.env.FORM_MODE;
if (config.formMode === 'odoo-direct') config.formEndpoint = config.odooFormUrl;
const BASE = (process.env.BASE_PATH || '').replace(/\/$/, '');
// Rewrite root-absolute URLs (href="/…", src="/…", url('/…'), content="…/assets") to the base path.
function rebase(text) {
  if (!BASE) return text;
  return text
    .replace(/(href|src|action|data-endpoint)="\/(?!\/)/g, `$1="${BASE}/`)
    .replace(/url\('\/(?!\/)/g, `url('${BASE}/`)
    .replace(/location\.replace\('\//g, `location.replace('${BASE}/`)
    .replace(/url=\/(?!\/)/g, `url=${BASE}/`);
}
const { layout } = require('./src/templates/layout');
const home = require('./src/templates/pages/home');
const services = require('./src/templates/pages/services');
const industries = require('./src/templates/pages/industries');
const about = require('./src/templates/pages/about');
const contact = require('./src/templates/pages/contact');
const notFound = require('./src/templates/pages/notfound');
const privacy = require('./src/templates/pages/privacy');

const markPlaceholders = process.argv.includes('--mark-placeholders') || process.env.MARK_PLACEHOLDERS === '1';
const buildId = Date.now().toString(36);

function rmrf(p) { fs.rmSync(p, { recursive: true, force: true }); }
function mkdirp(p) { fs.mkdirSync(p, { recursive: true }); }
function write(rel, content) {
  const out = path.join(DIST, rel);
  mkdirp(path.dirname(out));
  fs.writeFileSync(out, /\.(html|css|js|xml|txt)$/.test(rel) ? rebase(content) : content);
}
function copyDir(from, to) {
  mkdirp(to);
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const s = path.join(from, entry.name), d = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else if (!entry.name.startsWith('.')) fs.copyFileSync(s, d);
  }
}

// Page list. `path` is the URL path relative to /<lang>/ and is identical in
// both languages (slugs are stable), which is what makes hreflang trivial.
function pageList(c) {
  const pages = [
    { path: '', render: (ctx) => home(ctx) },
    { path: 'services/', render: (ctx) => services.index(ctx) },
    ...c.services.items.map((item) => ({ path: `services/${item.slug}/`, render: (ctx) => services.detail(ctx, ctx.c.services.items.find((s) => s.slug === item.slug)) })),
    { path: 'industries/', render: (ctx) => industries(ctx) },
    { path: 'about/', render: (ctx) => about(ctx) },
    { path: 'contact/', render: (ctx) => contact(ctx) },
    { path: 'privacy/', render: (ctx) => privacy(ctx) },
    { path: '404.html', render: (ctx) => notFound(ctx), file: true, noindex: true },
    // Review-only preview of the alternative hero. Excluded from sitemap, disallowed in robots.
    { path: '_preview/hero-b/', render: (ctx) => home(ctx, { heroVariant: 'B' }), noindex: true },
    { path: '_preview/hero-a/', render: (ctx) => home(ctx, { heroVariant: 'A' }), noindex: true }
  ];
  return pages;
}

function build() {
  const started = Date.now();
  rmrf(DIST);
  mkdirp(DIST);

  // Assets
  copyDir(path.join(SRC, 'assets'), path.join(DIST, 'assets'));
  for (const f of fs.readdirSync(path.join(SRC, 'styles'))) write(`assets/css/${f}`, fs.readFileSync(path.join(SRC, 'styles', f), 'utf8'));
  for (const f of fs.readdirSync(path.join(SRC, 'scripts'))) write(`assets/js/${f}`, fs.readFileSync(path.join(SRC, 'scripts', f), 'utf8'));

  const contents = {};
  for (const lang of config.languages) contents[lang] = require(`./src/content/${lang}.js`);

  const urls = [];
  let count = 0;
  for (const lang of config.languages) {
    const c = contents[lang];
    for (const page of pageList(c)) {
      const altPaths = {};
      for (const l of config.languages) altPaths[l] = page.path;
      const ctx = { lang, c, config, path: page.path, altPaths, buildId, markPlaceholders };
      const rendered = page.render(ctx);
      let html = layout(ctx, rendered);
      if (page.noindex) html = html.replace('<meta name="viewport"', '<meta name="robots" content="noindex">\n  <meta name="viewport"');
      const rel = page.file ? `${lang}/${page.path}` : `${lang}/${page.path}index.html`;
      write(rel, html);
      count++;
      if (!page.noindex) urls.push(`${config.siteUrl}/${lang}/${page.path}`);
    }
  }

  // Root: language chooser / redirect. Server-side rules (see _redirects) take
  // precedence on Netlify; this file is the universal fallback.
  const d = config.defaultLang;
  const other = config.languages.filter((l) => l !== d);
  write(
    'index.html',
    `<!DOCTYPE html><html lang="${d}"><head><meta charset="utf-8"><meta name="robots" content="noindex">
<meta http-equiv="refresh" content="1; url=/${d}/"><title>Modern Financial Technology</title>
<script>(function(){var l=(navigator.languages||[navigator.language||'']).map(function(x){return String(x).slice(0,2).toLowerCase()});var langs=${JSON.stringify(config.languages)};for(var i=0;i<l.length;i++){if(langs.indexOf(l[i])>-1){location.replace('/'+l[i]+'/');return}}location.replace('/${d}/')})();</script>
</head><body style="font-family:Inter,Cairo,system-ui,sans-serif;padding:40px;color:#101B3A">
<p><a href="/${d}/">${contents[d].meta.siteName}</a>${other.map((l) => ` · <a href="/${l}/" lang="${l}">${contents[l].switchLabel === contents[d].switchLabel ? l : contents[d].switchLabel}</a>`).join('')}</p>
</body></html>\n`
  );
  // Root 404 (Netlify/Cloudflare/GitHub Pages serve /404.html)
  fs.copyFileSync(path.join(DIST, d, '404.html'), path.join(DIST, '404.html'));
  if (BASE) write('.nojekyll', '');

  // Netlify-style redirects: language-aware root, legacy paths, 404s.
  write(
    '_redirects',
    [
      ...config.languages.filter((l) => l !== d).map((l) => `/  /${l}/  302  Language=${l}`),
      `/  /${d}/  302`,
      ...config.languages.map((l) => `/${l}/*  /${l}/404.html  404`),
      ''
    ].join('\n')
  );

  write('robots.txt', `User-agent: *\nAllow: /\nDisallow: /*/_preview/\nSitemap: ${config.siteUrl}/sitemap.xml\n`);
  write(
    'sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
      urls
        .map((u) => {
          const m = u.match(/\/(\w\w)\/(.*)$/);
          const alts = config.languages.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${config.siteUrl}/${l}/${m[2]}"/>`).join('\n');
          return `  <url>\n    <loc>${u}</loc>\n${alts}\n  </url>`;
        })
        .join('\n') +
      '\n</urlset>\n'
  );

  console.log(`built ${count} pages (${config.languages.join(', ')}) → dist/ in ${Date.now() - started}ms${markPlaceholders ? ' [placeholders marked]' : ''}${BASE ? ` [base ${BASE}]` : ''}${process.env.SITE_URL ? ` [siteUrl ${config.siteUrl}]` : ''}`);
}

if (require.main === module) build();
module.exports = { build };
