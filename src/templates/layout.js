// Page shell: <head>, header, footer. Every page template returns { title,
// description, body } and this wraps it.
const { esc, t, plain, url, link, btn } = require('./html');

function head(ctx, page) {
  const { c, config } = ctx;
  const canonical = `${config.siteUrl}/${ctx.lang}/${ctx.path}`;
  const alternates = config.languages
    .map((l) => `<link rel="alternate" hreflang="${l}" href="${config.siteUrl}/${l}/${ctx.altPaths[l]}">`)
    .join('\n  ');
  const title = plain(page.title || c.meta.siteName);
  const desc = plain(page.description || c.meta.description);
  const analytics = config.analytics.plausibleDomain
    ? `<script defer data-domain="${esc(config.analytics.plausibleDomain)}" src="https://plausible.io/js/script.js"></script>`
    : '';
  return `<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <link rel="canonical" href="${canonical}">
  ${alternates}
  <link rel="alternate" hreflang="x-default" href="${config.siteUrl}/${config.defaultLang}/${ctx.altPaths[config.defaultLang]}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(c.meta.siteName)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:locale" content="${c.ogLocale}">
  <meta property="og:image" content="${config.siteUrl}/assets/img/og-${ctx.lang}.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#101B3A">
  <link rel="icon" href="/assets/logo/favicon-32.png" sizes="32x32" type="image/png">
  <link rel="icon" href="/assets/logo/favicon-192.png" sizes="192x192" type="image/png">
  <link rel="icon" href="/assets/logo/favicon-512.png" sizes="512x512" type="image/png">
  <link rel="apple-touch-icon" href="/assets/logo/apple-touch-icon.png" sizes="180x180">
  <link rel="preload" href="/assets/fonts/inter-latin-var.woff2" as="font" type="font/woff2" crossorigin>
  ${ctx.lang === 'ar' ? '<link rel="preload" href="/assets/fonts/cairo-arabic-var.woff2" as="font" type="font/woff2" crossorigin>' : ''}
  <link rel="stylesheet" href="/assets/css/main.css?v=${ctx.buildId}">
  ${analytics}
  <script type="application/ld+json">${JSON.stringify(orgSchema(ctx))}</script>`;
}

function orgSchema(ctx) {
  const { c, config } = ctx;
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: c.meta.siteName,
    alternateName: c.meta.shortName,
    url: config.siteUrl,
    logo: `${config.siteUrl}/assets/logo/mft-lockup-navy.png`,
    email: config.contact.email,
    telephone: config.contact.phones[0] && config.contact.phones[0].tel,
    areaServed: ['EG', 'SA', 'US'],
    knowsLanguage: ['ar', 'en']
  };
}

function header(ctx) {
  const { c } = ctx;
  const items = c.nav.items
    .map((it) => {
      const active = ctx.path.startsWith(it.href.replace(/#.*$/, ''));
      return `<li><a href="${url(ctx, it.href)}"${active ? ' aria-current="page"' : ''}>${t(it.label)}</a></li>`;
    })
    .join('');
  const alt = c.switchLang;
  return `<a class="skip-link" href="#main">${t(c.ui.skip)}</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="/${ctx.lang}/" aria-label="${esc(c.meta.siteName)} — ${esc(c.ui.home)}">
      <img src="/assets/logo/mft-lockup-navy.png" alt="${esc(c.meta.siteName)}" width="2000" height="683" decoding="async" fetchpriority="high">
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
      <span class="nav-toggle-bars" aria-hidden="true"></span><span class="nav-toggle-label">${t(c.ui.menu)}</span>
    </button>
    <nav id="site-nav" class="site-nav" aria-label="${esc(c.ui.menu)}">
      <ul>${items}</ul>
      <div class="nav-actions">
        <a class="lang-switch" href="/${alt}/${ctx.altPaths[alt]}" lang="${alt}" hreflang="${alt}" dir="${alt === 'ar' ? 'rtl' : 'ltr'}">${esc(c.switchLabel)}</a>
        ${btn(ctx, c.nav.cta, 'btn btn-navy btn-sm')}
      </div>
    </nav>
  </div>
</header>`;
}

function footer(ctx) {
  const { c, config } = ctx;
  const cols = c.footer.columns
    .map(
      (col) => `<div class="footer-col">
        <h2 class="footer-title">${t(col.title)}</h2>
        <ul>${col.links
          .map(
            (l) =>
              `<li><a href="${url(ctx, l.href)}"${l.external ? ' rel="noopener" target="_blank"' : ''}>${t(l.label)}</a></li>`
          )
          .join('')}</ul>
      </div>`
    )
    .join('');
  const phones = config.contact.phones
    .map((p) => `<li><a href="tel:${esc(p.tel)}" class="lat">${esc(p.display)}</a></li>`)
    .join('');
  const offices = config.contact.offices
    .map((o) => {
      const line = ctx.lang === 'ar' ? o.lineAr : o.line;
      return `<li>${t(c.footer.offices[o.key])}${line ? ` <span class="muted">— ${t(line)}</span>` : ''}</li>`;
    })
    .join('');
  const socialNames = { linkedin: 'LinkedIn', facebook: 'Facebook', instagram: 'Instagram', x: 'X' };
  const social = Object.entries(config.contact.social || {})
    .filter(([, href]) => href)
    .map(([k, href]) => `<li><a href="${esc(href)}" rel="noopener" target="_blank" class="lat">${esc(socialNames[k] || k)}</a></li>`)
    .join('');
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="/assets/logo/mft-lockup-white.png" alt="${esc(c.meta.siteName)}" width="2000" height="683" loading="lazy" decoding="async">
        <p>${t(c.footer.blurb)}</p>
      </div>
      ${cols}
      <div class="footer-col">
        <h2 class="footer-title">${t(c.footer.contactTitle)}</h2>
        <ul>
          <li><a href="mailto:${esc(config.contact.email)}" class="lat">${esc(config.contact.email)}</a></li>
          ${phones}
        </ul>
        <h2 class="footer-title">${t(c.footer.officesTitle)}</h2>
        <ul>${offices}</ul>
        ${social ? `<h2 class="footer-title">${t(c.footer.socialTitle)}</h2><ul>${social}</ul>` : ''}
      </div>
    </div>
    <div class="footer-bottom">
      <p>${t(c.footer.legal.replace('{year}', String(new Date().getFullYear())))}</p>
    </div>
  </div>
</footer>`;
}

function ctaBand(ctx) {
  const { c } = ctx;
  return `<section class="cta-band" aria-labelledby="cta-band-title">
  <div class="container cta-band-inner">
    <div>
      <h2 id="cta-band-title">${t(c.ctaBand.title)}</h2>
      <p>${t(c.ctaBand.body)}</p>
    </div>
    ${btn(ctx, c.ctaBand.button, 'btn btn-primary btn-lg')}
  </div>
</section>`;
}

function layout(ctx, page) {
  return `<!DOCTYPE html>
<html lang="${ctx.c.htmlLang}" dir="${ctx.c.dir}">
<head>
  ${head(ctx, page)}
</head>
<body class="${esc(page.bodyClass || '')}">
${header(ctx)}
<main id="main" tabindex="-1">
${page.body}
</main>
${footer(ctx)}
<script src="/assets/js/main.js?v=${ctx.buildId}" defer></script>
</body>
</html>
`;
}

module.exports = { layout, ctaBand, link };
