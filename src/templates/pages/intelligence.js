const { t, esc, url, btn, pad2 } = require('../html');
const { ctaBand } = require('../layout');
const { pageHeader } = require('./services');

module.exports = function intelligence(ctx) {
  const I = ctx.c.intelligence;

  const principles = I.principles.items
    .map((p, i) => `<li class="pillar"><span class="num lat" aria-hidden="true">${pad2(i + 1)}</span><h3>${t(p.title)}</h3><p>${t(p.body)}</p></li>`)
    .join('');

  const agents = I.agents
    .map(
      (a, i) => `<li class="card agent agent-${esc(a.status)}" id="${esc(a.slug)}">
      <div class="agent-head">
        <span class="num lat" aria-hidden="true">${pad2(i + 1)}</span>
        <span class="status status-${esc(a.status)}">${t(I.statusLabels[a.status])}</span>
      </div>
      <h3>${t(a.name)}</h3>
      <ul class="check-list">${a.does.map((d) => `<li>${t(d)}</li>`).join('')}</ul>
      <p class="benefit"><strong>${t(I.benefitLabel)}</strong> ${t(a.benefit)}</p>
    </li>`
    )
    .join('');

  const tiers = I.plans.tiers
    .map(
      (tier) => `<li class="card plan${tier.featured ? ' plan-featured' : ''}">
      <h3>${t(tier.name)}</h3>
      <p class="plan-summary">${t(tier.summary)}</p>
      <ul class="check-list">${tier.features.map((f) => `<li>${t(f)}</li>`).join('')}</ul>
      <p class="plan-cta">${btn(ctx, { label: I.plans.cta, href: 'contact/' }, tier.featured ? 'btn btn-primary' : 'btn btn-navy')}</p>
    </li>`
    )
    .join('');

  const body = `${pageHeader(ctx, I.page)}
<section class="section" aria-labelledby="principles-title">
  <div class="container">
    <div class="section-head"><h2 id="principles-title">${t(I.principles.title)}</h2></div>
    <ol class="grid grid-3 pillars">${principles}</ol>
  </div>
</section>

<section class="section section-mist" aria-labelledby="agents-title">
  <div class="container">
    <div class="section-head"><h2 id="agents-title">${t(I.agentsTitle)}</h2></div>
    <ul class="grid grid-2 agents">${agents}</ul>
  </div>
</section>

<section class="section section-navy" aria-labelledby="plans-title">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${t(I.plans.eyebrow)}</p><h2 id="plans-title">${t(I.plans.title)}</h2><p class="lead">${t(I.plans.intro)}</p></div>
    <ul class="grid grid-3 plans">${tiers}</ul>
    <p class="plans-note">${t(I.plans.note)}</p>
  </div>
</section>
${ctaBand(ctx)}`;

  return { title: I.title, description: I.description, body, bodyClass: 'page-intelligence' };
};
