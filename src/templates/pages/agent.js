const { t, esc, plain, url, btn } = require('../html');
const { ctaBand } = require('../layout');
const { pageHeader, faqBlock, faqSchema } = require('./services');

module.exports = function agentPage(ctx, item) {
  const L = ctx.c.agentPages.labels;
  const I = ctx.c.intelligence;
  const body = `${pageHeader(
    ctx,
    { eyebrow: item.eyebrow, title: item.headline, intro: item.definition },
    [{ label: ctx.c.ui.breadcrumbHome, href: '' }, { label: I.page.eyebrow, href: 'intelligence/' }, { label: item.name }]
  )}
<section class="section">
  <div class="container detail-grid">
    <article class="detail-main">
      <p class="lead">${t(item.intro)}</p>
      <h2>${t(L.deliverables)}</h2>
      <ul class="check-list">${item.deliverables.map((d) => `<li>${t(d)}</li>`).join('')}</ul>
      <h2>${t(L.cadence)}</h2>
      <p>${t(item.cadence)}</p>
      <h2>${t(L.delivery)}</h2>
      <ol class="num-list">${item.delivery.map((d, i) => `<li><span class="num lat" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><span>${t(d)}</span></li>`).join('')}</ol>
      <h2>${t(L.forWho)}</h2>
      <p>${t(item.forWho)}</p>
      <p class="cta-row">${btn(ctx, { label: L.cta, href: 'request-quote/' }, 'btn btn-primary btn-lg')}${btn(ctx, ctx.c.nav.cta, 'btn btn-link')}</p>
    </article>
    <aside class="detail-side" aria-labelledby="side-title">
      <h2 id="side-title" class="footer-title">${t(I.statusLabels.available)}</h2>
      <p class="small muted">${t(I.agentsIntro)}</p>
      <ul class="side-links">
        <li><a href="${url(ctx, item.related.href)}">${t(item.related.label)}</a></li>
        <li><a href="${url(ctx, 'intelligence/')}">${t(L.back)}</a></li>
      </ul>
      ${btn(ctx, { label: L.cta, href: 'request-quote/' }, 'btn btn-navy')}
    </aside>
  </div>
</section>
${faqBlock(ctx, L.faq, item.faq)}
${ctaBand(ctx)}`;

  const jsonld = [
    faqSchema(item.faq),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: plain(item.name),
      serviceType: plain(item.name),
      description: plain(item.definition),
      provider: { '@type': 'Organization', name: ctx.c.meta.siteName, url: ctx.config.siteUrl },
      areaServed: ['EG', 'SA', 'US'],
      availableLanguage: ['ar', 'en'],
      offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceSpecification: { '@type': 'PriceSpecification', description: plain(I.plans.note) } }
    }
  ];
  return { title: item.title, description: item.description, body, bodyClass: 'page-agent', jsonld };
};
