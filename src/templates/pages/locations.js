const { t, esc, plain, url, btn, pad2 } = require('../html');
const { ctaBand } = require('../layout');
const { pageHeader, faqBlock, faqSchema, seeAlso } = require('./services');

module.exports = function locationPage(ctx, item) {
  const L = ctx.c.locations.labels;
  const crumbs = [{ label: ctx.c.ui.breadcrumbHome, href: '' }, { label: item.name }];

  const obligations = item.obligations.map((o) => `<li>${t(o)}</li>`).join('');
  const services = item.services
    .map(
      (s, i) => `<li class="index-row">
      <span class="num lat" aria-hidden="true">${pad2(i + 1)}</span>
      <div><h3><a href="${url(ctx, s.href)}">${t(s.title)}</a></h3><p>${t(s.body)}</p></div>
    </li>`
    )
    .join('');
  const how = item.how.map((h, i) => `<li><span class="num lat" aria-hidden="true">${pad2(i + 1)}</span><span>${t(h)}</span></li>`).join('');

  const body = `${pageHeader(ctx, { eyebrow: item.eyebrow, title: item.headline, intro: item.definition }, crumbs)}
<section class="section" aria-labelledby="obl-title">
  <div class="container detail-grid">
    <article class="detail-main">
      <p class="lead">${t(item.intro)}</p>
      <h2 id="obl-title">${t(L.obligations)}</h2>
      <ul class="check-list">${obligations}</ul>
      <h2>${t(L.how)}</h2>
      <ol class="num-list">${how}</ol>
      <p class="cta-row">${btn(ctx, { label: L.cta, href: 'contact/' }, 'btn btn-primary btn-lg')}${btn(ctx, { label: L.quote, href: 'request-quote/' }, 'btn btn-link')}</p>
    </article>
    <aside class="detail-side" aria-labelledby="loc-side-title">
      <h2 id="loc-side-title" class="footer-title">${t(ctx.c.footer.contactTitle)}</h2>
      <ul class="side-links">
        <li><a href="mailto:${esc(ctx.config.contact.email)}" class="lat">${esc(ctx.config.contact.email)}</a></li>
        ${ctx.config.contact.phones.map((p) => `<li><a href="tel:${esc(p.tel)}" class="lat">${esc(p.display)}</a></li>`).join('')}
      </ul>
      <p class="small muted">${t(ctx.c.contact.details.address)}</p>
    </aside>
  </div>
</section>

<section class="section section-mist" aria-labelledby="loc-svc-title">
  <div class="container">
    <div class="section-head"><h2 id="loc-svc-title">${t(L.services)}</h2></div>
    <ol class="index-list">${services}</ol>
  </div>
</section>

${faqBlock(ctx, L.faq, item.faq)}
${seeAlso(ctx, [
    { label: ctx.c.services.page.eyebrow, href: 'services/' },
    { label: ctx.c.industries.page.eyebrow, href: 'industries/' },
    { label: ctx.c.intelligence.page.eyebrow, href: 'intelligence/' },
    ...ctx.c.locations.items.filter((x) => x.slug !== item.slug).map((x) => ({ label: x.name, href: `${x.slug}/` }))
  ])}
${ctaBand(ctx)}`;

  const jsonld = [
    faqSchema(item.faq),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: plain(item.headline),
      serviceType: 'Odoo ERP implementation, internal audit and Virtual CFO',
      description: plain(item.definition),
      provider: { '@id': `${ctx.config.siteUrl}/#organization` },
      areaServed: { '@type': 'Country', name: plain(item.name), identifier: item.country },
      availableLanguage: ['ar', 'en']
    }
  ];
  return { title: item.title, description: item.description, body, bodyClass: 'page-location', jsonld };
};
