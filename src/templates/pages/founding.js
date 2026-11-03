// Founding Members: the SEG Audit launch page. Scarcity (seats left of the total) and social proof
// (companies already in) come from site.config → founding; copy from content/<lang>.js → founding.
// Every primary CTA goes to the app sign-up with a UTM tag per placement.
const { t, esc, plain, url, seats, signupUrl } = require('../html');
const { faqBlock, faqSchema, seeAlso } = require('./services');

// 50 seats as a grid: filled seats, the next seat (highlighted), open seats. Decorative; the
// numbers are stated in text right next to it.
function seatGrid(ctx) {
  const F = ctx.config.founding;
  let cells = '';
  for (let i = 0; i < F.total; i++) {
    const cls = i < F.filled ? 'seat seat-filled' : i === F.filled ? 'seat seat-next' : 'seat';
    cells += `<li class="${cls}"></li>`;
  }
  return `<ol class="seat-grid" aria-hidden="true">${cells}</ol>`;
}

module.exports = function founding(ctx) {
  const P = ctx.c.founding;
  const F = ctx.config.founding;
  const s = (x) => t(seats(ctx, x));
  const cta = (where, cls = 'btn btn-primary btn-lg') => `<a class="${cls}" href="${esc(signupUrl(ctx, where))}">${s(P.hero.cta)}</a>`;

  const hero = `<section class="founding-hero" aria-labelledby="fm-title">
  <div class="container founding-hero-inner">
    <div>
      <nav class="breadcrumb breadcrumb-light" aria-label="Breadcrumb"><ol><li><a href="${url(ctx, '')}">${t(ctx.c.ui.breadcrumbHome)}</a></li><li aria-current="page">${t(P.page.eyebrow)}</li></ol></nav>
      <p class="eyebrow">${t(P.page.eyebrow)}</p>
      <h1 id="fm-title">${s(P.hero.headline)}</h1>
      <p class="lead">${s(P.hero.subhead)}</p>
      <div class="cta-row">
        ${cta('hero')}
        <a class="btn btn-link btn-link-light" href="#fm-how">${t(P.hero.secondary)}</a>
      </div>
      <ul class="hero-assurance">${P.hero.assurance.map((x) => `<li>${t(x)}</li>`).join('')}</ul>
    </div>
    <div class="seat-panel">
      <p class="seat-count"><span class="seat-left lat">${F.total - F.filled}</span><span class="seat-total lat">/${F.total}</span></p>
      <p class="seat-caption">${s(P.hero.meterCaption)}</p>
      ${seatGrid(ctx)}
      <ul class="seat-legend">
        <li><span class="seat seat-filled" aria-hidden="true"></span>${s(P.hero.legend.filled)}</li>
        <li><span class="seat seat-next" aria-hidden="true"></span>${s(P.hero.legend.next)}</li>
        <li><span class="seat" aria-hidden="true"></span>${s(P.hero.legend.open)}</li>
      </ul>
    </div>
  </div>
</section>`;

  const gets = `<section class="section" aria-labelledby="fm-gets">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${t(P.gets.eyebrow)}</p><h2 id="fm-gets">${s(P.gets.title)}</h2><p class="lead">${s(P.gets.intro)}</p></div>
    <dl class="deflist">${P.gets.items.map((x) => `<div class="deflist-row"><dt>${t(x.title)}</dt><dd>${s(x.body)}</dd></div>`).join('')}</dl>
  </div>
</section>`;

  const how = `<section class="section section-navy" aria-labelledby="fm-how">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${t(P.how.eyebrow)}</p><h2 id="fm-how">${s(P.how.title)}</h2></div>
    <ol class="grid grid-3 steps">${P.how.steps
      .map((x, i) => `<li class="step"><span class="num lat" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><h3>${t(x.title)}</h3><p>${s(x.body)}</p></li>`)
      .join('')}</ol>
    <p class="section-foot">${cta('how')}</p>
  </div>
</section>`;

  const members = `<section class="section section-mist" aria-labelledby="fm-members">
  <div class="container narrow prose">
    <p class="eyebrow">${t(P.members.eyebrow)}</p>
    <h2 id="fm-members">${s(P.members.title)}</h2>
    <p>${s(P.members.body)}</p>
    <ul>${P.members.items.map((x) => `<li>${s(x)}</li>`).join('')}</ul>
    <p><a class="btn btn-navy" href="${url(ctx, 'contact/')}">${t(P.members.cta)}</a></p>
  </div>
</section>`;

  const final = `<section class="section section-navy final-cta" aria-labelledby="fm-final">
  <div class="container narrow">
    <h2 id="fm-final">${s(P.final.title)}</h2>
    <p class="lead">${s(P.final.body)}</p>
    <div class="cta-row">${cta('final')}</div>
  </div>
</section>`;

  const body = `${hero}
${gets}
${how}
${members}
${faqBlock(ctx, ctx.c.ui.faqTitle, P.faq.map((f) => ({ q: seats(ctx, f.q), a: seats(ctx, f.a) })))}
${final}
${seeAlso(ctx, [
  { label: ctx.c.trustCenter.page.eyebrow, href: 'trust/' },
  { label: ctx.c.partners.page.eyebrow, href: 'partners/' },
  { label: ctx.c.contact.page.eyebrow, href: 'contact/' }
])}`;
  return {
    title: seats(ctx, P.title),
    description: seats(ctx, P.description),
    body,
    bodyClass: 'page-founding',
    ogImage: { url: `/assets/img/launch/founding-og-${ctx.lang}.jpg`, width: 1200, height: 630, alt: plain(seats(ctx, P.ogAlt)) },
    jsonld: [faqSchema(P.faq.map((f) => ({ q: seats(ctx, f.q), a: seats(ctx, f.a) })))].filter(Boolean)
  };
};
