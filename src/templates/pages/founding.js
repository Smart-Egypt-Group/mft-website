// Founding Members: the SEG Audit launch page. Scarcity is the fixed cap (50 seats at a founder price
// for life). A live counter (seats filled / left) exists but stays off until site.config → founding
// .showCount is true; copy from content/<lang>.js → founding (counter copy in founding.counter).
// "Claim your seat" CTAs go to the application form (founding-members/apply/); the free check goes
// to the app sign-up with a UTM tag per placement.
const { t, esc, plain, url, seats, fm, fmh, signupUrl } = require('../html');
const { faqBlock, faqSchema, seeAlso } = require('./services');

// 50 seats as a grid: the visitor's seat highlighted, the rest open; with the counter on, filled seats
// first. Decorative; the numbers are stated in text right next to it.
function seatGrid(ctx) {
  const F = ctx.config.founding, filled = F.showCount ? F.filled : 0;
  let cells = '';
  for (let i = 0; i < F.total; i++) {
    const cls = i < filled ? 'seat seat-filled' : i === filled ? 'seat seat-next' : 'seat';
    cells += `<li class="${cls}"></li>`;
  }
  return `<ol class="seat-grid" aria-hidden="true" data-seats-grid>${cells}</ol>`;
}

module.exports = function founding(ctx) {
  const P = ctx.c.founding;
  const F = ctx.config.founding;
  const s = (x) => t(seats(ctx, x));
  // Claiming a seat = the application form (approval reserves the seat); the free check = sign-up.
  const apply = (where) => `${url(ctx, 'founding-members/apply/')}?from=${encodeURIComponent(where)}`;
  const cta = (where, cls = 'btn btn-primary btn-lg') => `<a class="${cls}" href="${esc(apply(where))}">${s(P.hero.cta)}</a>`;
  const checkCta = (where, cls = 'btn btn-primary btn-lg') => `<a class="${cls}" href="${esc(signupUrl(ctx, where))}" data-track="lead">${t(P.check.cta)}</a>`;

  const hero = `<section class="founding-hero" aria-labelledby="fm-title">
  <div class="container founding-hero-inner">
    <div>
      <nav class="breadcrumb breadcrumb-light" aria-label="Breadcrumb"><ol><li><a href="${url(ctx, '')}">${t(ctx.c.ui.breadcrumbHome)}</a></li><li aria-current="page">${t(P.page.eyebrow)}</li></ol></nav>
      <p class="eyebrow">${t(P.page.eyebrow)}</p>
      <h1 id="fm-title">${fmh(ctx, 'hero.headline')}</h1>
      <p class="lead">${fmh(ctx, 'hero.subhead')}</p>
      <div class="cta-row">
        ${cta('hero')}
        <a class="btn btn-link btn-link-light" href="#fm-how">${t(P.hero.secondary)}</a>
      </div>
      <ul class="hero-assurance">${P.hero.assurance.map((x) => `<li>${t(x)}</li>`).join('')}</ul>
    </div>
    <div class="seat-panel" data-seats-hide="off">
      <p class="seat-count"><span class="seat-left lat" data-seats="left">${F.showCount ? F.total - F.filled : F.total}</span>${F.showCount ? `<span class="seat-total lat">/<span data-seats="total">${F.total}</span></span>` : ''}</p>
      <p class="seat-caption">${fmh(ctx, 'hero.meterCaption')}</p>
      ${seatGrid(ctx)}
      <ul class="seat-legend">
        ${F.showCount ? `<li><span class="seat seat-filled" aria-hidden="true"></span>${fmh(ctx, 'hero.legend.filled')}</li>` : ''}
        <li><span class="seat seat-next" aria-hidden="true"></span>${s(P.hero.legend.next)}</li>
        <li><span class="seat" aria-hidden="true"></span>${s(P.hero.legend.open)}</li>
      </ul>
    </div>
  </div>
</section>`;

  const check = `<section class="section section-mist" aria-labelledby="fm-check">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${t(P.check.eyebrow)}</p><h2 id="fm-check">${t(P.check.title)}</h2><p class="lead">${t(P.check.intro)}</p></div>
    <ol class="grid grid-3 pillars check-list">${P.check.items
      .map((x, i) => `<li class="card"><span class="num lat" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><h3>${t(x.title)}</h3><p>${t(x.body)}</p></li>`)
      .join('')}</ol>
    <p class="section-foot"><a class="btn btn-primary btn-lg" href="${esc(signupUrl(ctx, 'tb-check'))}" data-track="lead">${t(P.check.cta)}</a></p>
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
    <p class="section-foot">${checkCta('how')}</p>
  </div>
</section>`;


  const final = `<section class="section section-navy final-cta" aria-labelledby="fm-final">
  <div class="container narrow">
    <h2 id="fm-final">${fmh(ctx, 'final.title')}</h2>
    <p class="lead">${fmh(ctx, 'final.body')}</p>
    <div class="cta-row">${cta('final')}</div>
  </div>
</section>`;

  const body = `${hero}
${check}
${gets}
${how}
${faqBlock(ctx, ctx.c.ui.faqTitle, P.faq.map((f) => ({ q: seats(ctx, f.q), a: seats(ctx, f.a) })))}
${final}
${seeAlso(ctx, [
  { label: ctx.c.trustCenter.page.eyebrow, href: 'trust/' },
  { label: ctx.c.partners.page.eyebrow, href: 'partners/' },
  { label: ctx.c.contact.page.eyebrow, href: 'contact/' }
])}`;
  return {
    title: fm(ctx, 'title'),
    description: fm(ctx, 'description'),
    body,
    bodyClass: 'page-founding',
    ogImage: { url: `/assets/img/launch/founding-og-${ctx.lang}.jpg`, width: 1200, height: 630, alt: plain(fm(ctx, 'ogAlt')) },
    jsonld: [faqSchema(P.faq.map((f) => ({ q: seats(ctx, f.q), a: seats(ctx, f.a) })))].filter(Boolean)
  };
};
