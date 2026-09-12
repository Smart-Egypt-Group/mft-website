const { t, esc, plain, url, btn, pad2 } = require('../html');
const { ctaBand } = require('../layout');
const { pageHeader, faqBlock, faqSchema } = require('./services');

// Governance flow diagram: draft → named approval (1 or 2 by materiality) → execution & log.
function flowDiagram(ctx) {
  const E = ctx.c.intelligence.execution;
  const rtl = ctx.c.dir === 'rtl';
  const s = E.steps;
  // Boxes at x = 40, 340, 640 (width 220) in a 900×260 viewBox; RTL mirrors via CSS transform.
  const box = (i, x) => `
    <g class="flow-node" style="--i:${i}">
      <rect x="${x}" y="70" width="220" height="72" rx="4" fill="#FFFFFF" stroke="#101B3A" stroke-width="2"/>
      <text x="${x + 110}" y="100" text-anchor="middle" class="flow-num">${pad2(i + 1)}</text>
      <text x="${x + 110}" y="124" text-anchor="middle" class="flow-title">${esc(plain(s[i].title))}</text>
    </g>`;
  return `<svg class="flow${rtl ? ' flow-rtl' : ''}" viewBox="0 0 900 260" role="img" aria-label="${esc(plain(E.title))}">
    <path class="flow-line" d="M260 106 H340" />
    <path class="flow-line" d="M560 106 H640" />
    <path class="flow-branch" d="M450 142 V196 H560" />
    <g class="flow-node flow-second" style="--i:3">
      <rect x="560" y="176" width="220" height="40" rx="4" fill="#F5F7FA" stroke="#1BB7CD" stroke-width="2"/>
      <text x="670" y="201" text-anchor="middle" class="flow-small">${esc(plain(rtl ? 'اعتماد ثانٍ فوق حد الأهمية النسبية' : 'Second approval above materiality'))}</text>
    </g>
    ${box(0, 40)}${box(1, 340)}${box(2, 640)}
    <circle class="flow-dot" style="--i:1" cx="340" cy="106" r="6" fill="#1BB7CD"/>
    <circle class="flow-dot" style="--i:2" cx="640" cy="106" r="6" fill="#1BB7CD"/>
  </svg>`;
}

module.exports = function intelligence(ctx) {
  const I = ctx.c.intelligence;

  const agents = I.agents
    .map(
      (a, i) => `<li class="card agent agent-${esc(a.status)}" id="${esc(a.slug)}" style="--i:${i % 2}">
      <div class="agent-head">
        <span class="num lat" aria-hidden="true">${pad2(i + 1)}</span>
        <span class="status status-${esc(a.status)}">${a.status === 'available' ? '<span class="dot dot-pulse" aria-hidden="true"></span>' : ''}${t(I.statusLabels[a.status])}</span>
      </div>
      <h3>${a.page ? `<a href="${url(ctx, a.page)}">${t(a.name)}</a>` : t(a.name)}</h3>
      <ul class="check-list">${a.does.map((d) => `<li>${t(d)}</li>`).join('')}</ul>
      <p class="benefit"><strong>${t(I.benefitLabel)}</strong> ${t(a.benefit)}</p>
      ${a.page ? `<p class="card-more"><a class="btn btn-link" href="${url(ctx, a.page)}">${t(I.learnMore)}</a></p>` : ''}
    </li>`
    )
    .join('');

  const gov = I.governance.items
    .map((g, i) => `<div class="deflist-row" style="--i:${i}"><dt>${t(g.title)}</dt><dd>${t(g.body)}</dd></div>`)
    .join('');

  const steps = I.execution.steps
    .map((s, i) => `<li class="pillar" style="--i:${i}"><span class="num lat" aria-hidden="true">${pad2(i + 1)}</span><h3>${t(s.title)}</h3><p>${t(s.body)}</p></li>`)
    .join('');

  const tiers = I.plans.tiers
    .map(
      (tier, i) => `<li class="card plan${tier.featured ? ' plan-featured' : ''}" style="--i:${i}">
      <h3>${t(tier.name)}</h3>
      <p class="plan-summary">${t(tier.summary)}</p>
      <ul class="check-list">${tier.features.map((f) => `<li>${t(f)}</li>`).join('')}</ul>
      <p class="plan-cta">${btn(ctx, { label: I.plans.cta, href: 'request-quote/' }, tier.featured ? 'btn btn-primary' : 'btn btn-navy')}</p>
    </li>`
    )
    .join('');

  const body = `${pageHeader(ctx, I.page)}
<section class="section" aria-labelledby="agents-title">
  <div class="container">
    <div class="section-head"><h2 id="agents-title">${t(I.agentsTitle)}</h2><p class="lead">${t(I.agentsIntro)}</p></div>
    <ul class="grid grid-2 agents">${agents}</ul>
  </div>
</section>

<section class="section section-mist" aria-labelledby="exec-title">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${t(I.execution.eyebrow)}</p><h2 id="exec-title">${t(I.execution.title)}</h2><p class="lead">${t(I.execution.body)}</p></div>
    <div class="flow-wrap reveal">${flowDiagram(ctx)}</div>
    <ol class="grid grid-3 pillars">${steps}</ol>
    <p class="muted small exec-note">${t(I.execution.note)}</p>
  </div>
</section>

<section class="section section-navy" aria-labelledby="gov-title">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${t(I.governance.eyebrow)}</p><h2 id="gov-title">${t(I.governance.title)}</h2><p class="lead">${t(I.governance.body)}</p></div>
    <dl class="deflist deflist-navy">${gov}</dl>
  </div>
</section>

<section class="section" aria-labelledby="seg-title">
  <div class="container teaser-inner">
    <div>
      <p class="eyebrow">${t(I.segAudit.eyebrow)}</p>
      <h2 id="seg-title">${t(I.segAudit.title)}</h2>
      <p class="lead">${t(I.segAudit.body)}</p>
    </div>
    <a class="btn btn-navy" href="${esc(I.segAudit.link.href)}" rel="noopener" target="_blank">${t(I.segAudit.link.label)}</a>
  </div>
</section>

<section class="section section-navy" aria-labelledby="plans-title">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${t(I.plans.eyebrow)}</p><h2 id="plans-title">${t(I.plans.title)}</h2><p class="lead">${t(I.plans.intro)}</p></div>
    <ul class="grid grid-3 plans">${tiers}</ul>
    <p class="plans-note">${t(I.plans.note)}</p>
  </div>
</section>

${faqBlock(ctx, I.faq.title, I.faq.items)}
${ctaBand(ctx)}`;

  const jsonld = [
    faqSchema(I.faq.items),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'MFT Intelligence AI Agents',
      serviceType: 'Managed AI agents for audit, CFO reporting and finance operations',
      description: plain(I.definition),
      provider: { '@type': 'Organization', name: ctx.c.meta.siteName, url: ctx.config.siteUrl },
      areaServed: ['EG', 'SA', 'US'],
      availableLanguage: ['ar', 'en'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'MFT Intelligence engagements',
        itemListElement: I.plans.tiers.map((tier) => ({ '@type': 'Offer', name: plain(tier.name), description: plain(tier.summary), priceSpecification: { '@type': 'PriceSpecification', description: plain(I.plans.note) } }))
      }
    }
  ];
  return { title: I.title, description: I.description, body, bodyClass: 'page-intelligence', jsonld };
};
