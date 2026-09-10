const { t, esc, url, btn, sectionHead, phTag, pad2 } = require('../html');
const { heroA, heroB } = require('../partials/hero');

module.exports = function home(ctx, opts = {}) {
  const { c, config } = ctx;
  const H = c.home;
  const variant = opts.heroVariant || config.heroVariant;
  const hero = variant === 'B' ? heroB(ctx) : heroA(ctx);

  const pillars = H.positioning.pillars
    .map(
      (p, i) => `<li class="pillar"><span class="num lat" aria-hidden="true">${pad2(i + 1)}</span><h3>${t(p.title)}</h3><p>${t(p.body)}</p></li>`
    )
    .join('');

  const services = c.services.items
    .map(
      (s, i) => `<li class="card service-card">
        <span class="num lat" aria-hidden="true">${pad2(i + 1)}</span>
        <h3><a href="${url(ctx, `services/${s.slug}/`)}">${t(s.name)}</a></h3>
        <p>${t(s.short)}</p>
      </li>`
    )
    .join('');

  const steps = H.how.steps
    .map((s, i) => `<li class="step"><span class="num lat" aria-hidden="true">${pad2(i + 1)}</span><h3>${t(s.title)}</h3><p>${t(s.body)}</p></li>`)
    .join('');

  const industries = c.industries.items
    .map((it) => `<li><a class="industry-chip" href="${url(ctx, `industries/#${it.slug}`)}"><span class="dot" aria-hidden="true"></span>${t(it.name)}</a></li>`)
    .join('');

  const facts = H.proof.facts
    .map((f) => `<li class="fact"><span class="fact-value lat">${esc(f.value)}</span><span class="fact-label">${t(f.label)}</span></li>`)
    .join('');

  const cases = H.stories.cases
    .map(
      (cs) => `<li class="case">
        <p class="case-sector">${t(cs.sector)}</p>
        <p class="case-figure">${t(cs.figure)}</p>
        <p class="case-label">${t(cs.label)}</p>
        <p class="case-body">${t(cs.body)}</p>
        ${cs.quote ? `<p class="case-quote">${t(cs.quote)}</p>` : ''}
      </li>`
    )
    .join('');
  const testimonials = H.stories.testimonials
    .map(
      (q) => `<li class="testimonial"><blockquote><p>${t(q.quote)}</p></blockquote><p class="testimonial-by"><strong>${t(q.name)}</strong> · ${t(q.company)}</p></li>`
    )
    .join('');
  const caseStudy = `<section class="section section-mist" aria-labelledby="stories-title">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${t(H.stories.eyebrow)}</p><h2 id="stories-title">${t(H.stories.title)}</h2><p class="lead">${t(H.stories.intro)}</p></div>
    <ul class="grid grid-2 cases">${cases}</ul>
    <h3 class="testimonials-title">${t(H.stories.testimonialsTitle)}</h3>
    <ul class="grid grid-2 testimonials">${testimonials}</ul>
  </div>
</section>`;

  const pricing = config.showPricingSlot
    ? `<section class="section" aria-labelledby="pricing-title">
  <div class="container">
    ${phTag(ctx)}
    <div class="section-head"><p class="eyebrow">${t(H.pricing.eyebrow)}</p><h2 id="pricing-title">${t(H.pricing.title)}</h2><p class="lead">${t(H.pricing.body)}</p></div>
    <ul class="grid grid-3 tiers">
      ${H.pricing.tiers.map((tier) => `<li class="card tier"><h3 class="lat">${esc(tier.name)}</h3><p>${t(tier.body)}</p><p class="muted small">${t(H.pricing.note)}</p></li>`).join('')}
    </ul>
  </div>
</section>`
    : '';

  const phones = config.contact.phones
    .map((p) => `<a href="tel:${esc(p.tel)}" class="lat">${esc(p.display)}</a>`)
    .join(' <span aria-hidden="true">·</span> ');

  const body = `${hero}

<section class="section" aria-labelledby="pos-title">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${t(H.positioning.eyebrow)}</p><h2 id="pos-title">${t(H.positioning.title)}</h2><p class="lead">${t(H.positioning.body)}</p></div>
    <ol class="grid grid-3 pillars">${pillars}</ol>
  </div>
</section>

<section class="section section-mist" aria-labelledby="svc-title">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${t(H.services.eyebrow)}</p><h2 id="svc-title">${t(H.services.title)}</h2><p class="lead">${t(H.services.intro)}</p></div>
    <ul class="grid grid-3 service-grid">${services}</ul>
    <p class="section-foot"><a class="btn btn-link" href="${url(ctx, 'services/')}">${t(H.services.cta)}</a></p>
  </div>
</section>

<section class="section section-navy" aria-labelledby="how-title">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${t(H.how.eyebrow)}</p><h2 id="how-title">${t(H.how.title)}</h2></div>
    <ol class="grid grid-4 steps">${steps}</ol>
  </div>
</section>

<section class="section" aria-labelledby="ind-title">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${t(H.industries.eyebrow)}</p><h2 id="ind-title">${t(H.industries.title)}</h2><p class="lead">${t(H.industries.intro)}</p></div>
    <ul class="chip-row">${industries}</ul>
    <p class="section-foot"><a class="btn btn-link" href="${url(ctx, 'industries/')}">${t(H.industries.cta)}</a></p>
  </div>
</section>

<section class="section section-blue" aria-labelledby="proof-title">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${t(H.proof.eyebrow)}</p><h2 id="proof-title">${t(H.proof.title)}</h2></div>
    <ul class="grid grid-4 facts">${facts}</ul>
  </div>
</section>

${caseStudy}
${pricing}

<section class="section section-navy final-cta" aria-labelledby="final-title">
  <div class="container narrow">
    <h2 id="final-title" class="display">${t(H.cta.title)}</h2>
    <p class="lead">${t(H.cta.body)}</p>
    <div class="cta-row">${btn(ctx, H.cta.button, 'btn btn-primary btn-lg')}</div>
    <p class="alt-contact">${t(H.cta.alt)} — ${phones}</p>
  </div>
</section>`;

  return { title: H.title, description: c.meta.description, body, bodyClass: `page-home variant-${variant.toLowerCase()}` };
};
