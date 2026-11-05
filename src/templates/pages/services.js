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
    ${sectionHead(o, 1)}${o.cta ? `
    <p class="section-foot"><a class="btn btn-primary btn-lg" href="${esc(o.cta.href)}">${t(o.cta.label)}</a></p>` : ''}
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
// "See also" block: internal links at the end of a page (related content).
function seeAlso(ctx, links) {
  if (!links || !links.length) return '';
  return `<nav class="section see-also" aria-labelledby="see-also-title">
  <div class="container">
    <h2 id="see-also-title" class="footer-title">${t(ctx.c.ui.seeAlso)}</h2>
    <ul class="see-also-list">${links.map((l) => `<li><a href="${url(ctx, l.href)}">${t(l.label)}</a></li>`).join('')}</ul>
  </div>
</nav>`;
}
// Social proof: published client stories (non-financial) and named testimonials, reused from home.stories.
function proofBlock(ctx, { stories = true } = {}) {
  const S = ctx.c.home.stories;
  if (!S) return '';
  const cases = stories
    ? `<ul class="grid grid-2 cases">${S.cases.map((cs) => `<li class="case"><p class="case-sector">${t(cs.sector)}</p><p class="case-figure">${t(cs.figure)}</p><p class="case-label">${t(cs.label)}</p><p class="case-body">${t(cs.body)}</p></li>`).join('')}</ul>`
    : '';
  const quotes = `<ul class="grid grid-2 testimonials">${S.testimonials.map((q) => `<li class="testimonial"><blockquote><p>${t(q.quote)}</p></blockquote><p class="testimonial-by"><strong>${t(q.name)}</strong> · ${t(q.company)}</p></li>`).join('')}</ul>`;
  return `<section class="section section-mist proof" aria-labelledby="proof-block-title">
  <div class="container">
    <div class="section-head"><h2 id="proof-block-title">${t(stories ? ctx.c.ui.proofTitle : ctx.c.ui.reviewsTitle)}</h2></div>
    ${cases}
    ${stories ? `<h3 class="testimonials-title">${t(ctx.c.ui.reviewsTitle)}</h3>` : ''}
    ${quotes}
  </div>
</section>`;
}
function reviewSchema(ctx) {
  const S = ctx.c.home.stories;
  if (!S) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${ctx.config.siteUrl}/#organization`,
    review: S.testimonials.map((q) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: plain(q.name) },
      publisher: { '@type': 'Organization', name: plain(q.company) },
      reviewBody: plain(q.quote),
      inLanguage: ctx.lang
    }))
  };
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
      ${s.cardStat ? `<p class="card-stat"><span class="card-stat-value lat">${esc(s.cardStat.value)}</span><span class="card-stat-label">${t(s.cardStat.label)}</span></p>` : ''}
      <p>${t(s.short)}</p>
      <p class="card-more"><a class="btn btn-link" href="${url(ctx, `services/${s.slug}/`)}" aria-label="${esc(plain(ctx.c.ui.learnMore))}: ${esc(plain(s.name))}">${t(ctx.c.ui.learnMore)}</a></p>
    </li>`
    )
    .join('');
  const body = `${pageHeader(ctx, S.page, [{ label: ctx.c.ui.breadcrumbHome, href: '' }, { label: S.page.eyebrow }])}
<section class="section">
  <div class="container"><ul class="grid grid-3 service-grid">${cards}</ul></div>
</section>
${seeAlso(ctx, [{ label: ctx.c.industries.page.eyebrow, href: 'industries/' }, { label: ctx.c.intelligence.page.eyebrow, href: 'intelligence/' }, ...ctx.c.locations.items.map((x) => ({ label: x.name, href: `${x.slug}/` }))])}
${ctaBand(ctx)}`;
  return { title: S.title, description: S.description, body, bodyClass: 'page-services' };
}

// A merged service (odoo-erp): one card per track, each with its own anchor so other pages and
// the legacy redirects can point at it. A featured track is set apart.
function tracks(ctx, item, L) {
  const nav = item.tracks.map((x) => `<li><a href="#${esc(x.id)}">${t(x.title)}</a></li>`).join('');
  const cards = item.tracks
    .map((x) => `<section class="track-card${x.featured ? ' is-featured' : ''}" id="${esc(x.id)}" aria-labelledby="${esc(x.id)}-title">
        <h3 id="${esc(x.id)}-title">${x.featured && item.highlight ? `<span class="track-stat lat">${esc(item.highlight.value)}</span>` : ''}${t(x.title)}</h3>
        <p>${t(x.body)}</p>
        ${x.items.length ? `<ul class="check-list">${x.items.map((d) => `<li>${t(d)}</li>`).join('')}</ul>` : ''}
        ${x.link ? `<p><a class="btn btn-link" href="${url(ctx, x.link.href)}">${t(x.link.label)}</a></p>` : ''}
      </section>`)
    .join('');
  return `<h2>${t(L.tracks)}</h2>
      <nav class="track-nav" aria-label="${esc(plain(L.tracks))}"><ul>${nav}</ul></nav>
      <div class="track-grid">${cards}</div>`;
}

// Old service URL kept alive after a merge: a light page that sends the visitor to the new
// anchor (meta refresh added by build.js, canonical to the target, noindex, out of the sitemap).
function moved(ctx, old) {
  const S = ctx.c.services, L = S.detailLabels;
  const target = S.items.find((s) => old.to.startsWith(`services/${s.slug}/`));
  const body = `${pageHeader(ctx, { eyebrow: S.page.eyebrow, title: old.name, intro: L.movedNote }, [{ label: ctx.c.ui.breadcrumbHome, href: '' }, { label: S.page.eyebrow, href: 'services/' }, { label: old.name }])}
<section class="section"><div class="container narrow"><p class="lead">${t(L.moved)} <a href="${url(ctx, old.to)}">${t(target ? target.name : old.to)}</a></p></div></section>`;
  return { title: `${plain(old.name)} ${plain(S.titleSuffix)}`, description: plain(L.movedNote), body, bodyClass: 'page-service-moved', motion: false };
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
      ${item.highlight ? `<div class="svc-highlight"><p class="svc-highlight-value lat" aria-hidden="true">${esc(item.highlight.value)}</p><div><p class="svc-highlight-label"><span class="visually-hidden">${esc(item.highlight.value)} </span>${t(item.highlight.label)}</p><p>${t(item.highlight.body)}</p></div></div>` : ''}
      ${item.body.map((p) => `<p>${t(p)}</p>`).join('')}
      ${item.tracks ? tracks(ctx, item, L) : `<h2>${t(L.deliverables)}</h2>
      <ul class="check-list">${item.deliverables.map((d) => `<li>${t(d)}</li>`).join('')}</ul>`}
      ${item.systems ? `<h2>${t(L.systems)}</h2>
      <ul class="system-list">${item.systems.map((x) => `<li class="system system-${x.status}"><span class="lat">${esc(x.name)}</span><span class="system-status">${t(x.status === 'now' ? L.now : L.soon)}</span></li>`).join('')}</ul>` : ''}
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
${faqBlock(ctx, ctx.c.ui.faqTitle, item.faq)}
${proofBlock(ctx, { stories: item.slug === 'internal-audit' || item.slug === 'virtual-cfo' })}
${ctaBand(ctx)}`;
  const jsonld = [
    reviewSchema(ctx),
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
    title: `${plain(item.name)} ${plain(ctx.c.services.titleSuffix)}`,
    description: item.short,
    body,
    bodyClass: 'page-service-detail',
    jsonld
  };
}

module.exports = { index, detail, moved, pageHeader, faqBlock, faqSchema, seeAlso, proofBlock, reviewSchema };
