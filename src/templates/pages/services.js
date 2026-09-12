const { t, esc, plain, url, btn, sectionHead, pad2 } = require('../html');
const { ctaBand } = require('../layout');

function pageHeader(ctx, o, crumbs) {
  const trail = crumbs
    ? `<nav class="breadcrumb" aria-label="Breadcrumb"><ol>${crumbs
        .map((cr) => (cr.href ? `<li><a href="${url(ctx, cr.href)}">${t(cr.label)}</a></li>` : `<li aria-current="page">${t(cr.label)}</li>`))
        .join('')}</ol></nav>`
    : '';
  return `<section class="page-header">
  <div class="container">
    ${trail}
    ${sectionHead(o, 1)}
  </div>
</section>`;
}

// FAQ block (details/summary) + FAQPage schema — shared by services, agents and intelligence pages.
function faqBlock(ctx, title, items) {
  if (!items || !items.length) return '';
  return `<section class="section section-mist faq" aria-labelledby="faq-title">
  <div class="container narrow">
    <h2 id="faq-title">${t(title)}</h2>
    <div class="faq-list">
      ${items.map((f, i) => `<details class="faq-item reveal" style="--i:${i}"${i === 0 ? ' open' : ''}><summary><h3>${t(f.q)}</h3><span class="faq-icon" aria-hidden="true"></span></summary><p>${t(f.a)}</p></details>`).join('')}
    </div>
  </div>
</section>`;
}
function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: plain(f.q), acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } }))
  };
}

function index(ctx) {
  const S = ctx.c.services;
  const cards = S.items
    .map(
      (s, i) => `<li class="card service-card">
      <span class="num lat" aria-hidden="true">${pad2(i + 1)}</span>
      <h2><a href="${url(ctx, `services/${s.slug}/`)}">${t(s.name)}</a></h2>
      <p>${t(s.short)}</p>
      <p class="card-more"><span class="btn btn-link" aria-hidden="true">${t(ctx.c.ui.learnMore)}</span></p>
    </li>`
    )
    .join('');
  const body = `${pageHeader(ctx, S.page)}
<section class="section">
  <div class="container"><ul class="grid grid-3 service-grid">${cards}</ul></div>
</section>
${ctaBand(ctx)}`;
  return { title: S.title, description: S.description, body, bodyClass: 'page-services' };
}

function detail(ctx, item) {
  const S = ctx.c.services;
  const L = S.detailLabels;
  const related = S.items
    .filter((s) => s.slug !== item.slug)
    .slice(0, 3)
    .map((s) => `<li><a href="${url(ctx, `services/${s.slug}/`)}">${t(s.name)}</a></li>`)
    .join('');
  const body = `${pageHeader(
    ctx,
    { eyebrow: S.page.eyebrow, title: item.name, intro: item.tagline },
    [{ label: ctx.c.ui.breadcrumbHome, href: '' }, { label: S.page.eyebrow, href: 'services/' }, { label: item.name }]
  )}
<section class="section">
  <div class="container detail-grid">
    <article class="detail-main">
      <h2 class="visually-hidden">${t(L.overview)}</h2>
      ${item.definition ? `<p class="lead definition">${t(item.definition)}</p>` : ''}
      ${item.body.map((p) => `<p>${t(p)}</p>`).join('')}
      <h2>${t(L.deliverables)}</h2>
      <ul class="check-list">${item.deliverables.map((d) => `<li>${t(d)}</li>`).join('')}</ul>
      <h2>${t(L.forWho)}</h2>
      <p>${t(item.forWho)}</p>
      <p class="cta-row">${btn(ctx, { label: L.cta, href: 'contact/' }, 'btn btn-primary')}</p>
    </article>
    <aside class="detail-side" aria-labelledby="related-title">
      <h2 id="related-title" class="footer-title">${t(L.related)}</h2>
      <ul class="side-links">${related}</ul>
      <a class="btn btn-link" href="${url(ctx, 'services/')}">${t(ctx.c.ui.allServices)}</a>
    </aside>
  </div>
</section>
${faqBlock(ctx, ctx.c.services.faqTitle || (ctx.lang === 'ar' ? 'أسئلة شائعة' : 'Frequently asked'), item.faq)}
${ctaBand(ctx)}`;
  const jsonld = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: plain(item.name),
      serviceType: plain(item.name),
      description: plain(item.definition || item.short),
      provider: { '@type': 'Organization', name: ctx.c.meta.siteName, url: ctx.config.siteUrl },
      areaServed: ['EG', 'SA', 'US'],
      availableLanguage: ['ar', 'en']
    }
  ];
  if (item.faq) jsonld.push(faqSchema(item.faq));
  return {
    title: `${plain(item.name)} — ${ctx.c.meta.siteName}`,
    description: item.short,
    body,
    bodyClass: 'page-service-detail',
    jsonld
  };
}

module.exports = { index, detail, pageHeader, faqBlock, faqSchema };
