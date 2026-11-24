// Our work in numbers: every figure MFT publishes, with how it is counted, its source and the
// date it was measured (CEO, 24 Nov 2026). Copy lives in content/<lang>.js → numbers.
// Practice figures come from content/practice-facts.js (measured from MFT's own ERP, see
// PRACTICE-FACTS.md); platform figures from content/platform-facts.js (generated from the
// seg-audit code); the reports counter is live (templates/live-reports.js).
// No client is named and no client amount is shown, here or anywhere on the site.
const { t, figure } = require('../html');
const { ctaBand } = require('../layout');
const { isLive, liveAttrs, countSpan } = require('../live-reports');
const { pageHeader, seeAlso } = require('./services');

module.exports = function numbers(ctx) {
  const X = ctx.c.numbers;

  const groups = X.groups
    .map((g, gi) => {
      const tiles = g.items
        .map((x, i) =>
          isLive(x)
            ? `<li class="fact reveal" style="--i:${i}"${liveAttrs(ctx)}><span class="fact-value lat">${countSpan(ctx)}</span><span class="fact-label">${t(x.label)}</span></li>`
            : `<li class="fact reveal" style="--i:${i}"><span class="fact-value lat">${figure(x.value)}</span><span class="fact-label">${t(x.label)}</span></li>`
        )
        .join('');
      // The definition of the live counter hides with the counter itself: no number, no claim.
      const rows = g.items
        .map(
          (x) => `<div class="deflist-row"${isLive(x) ? liveAttrs(ctx) : ''}><dt>${t(x.name)}</dt><dd>${t(x.how)}<br><span class="muted small">${t(x.source)}</span></dd></div>`
        )
        .join('');
      return `<section class="section${gi % 2 ? ' section-mist' : ''}" aria-labelledby="num-g${gi}">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${t(g.eyebrow)}</p><h2 id="num-g${gi}">${t(g.title)}</h2><p class="lead">${t(g.intro)}</p></div>
    <ul class="grid grid-${g.items.length === 4 ? 4 : 3} facts">${tiles}</ul>
    <h3 class="numbers-how">${t(X.howTitle)}</h3>
    <dl class="deflist">
      ${rows}
    </dl>
  </div>
</section>`;
    })
    .join('\n');

  const body = `${pageHeader(ctx, X.page, [{ label: ctx.c.ui.breadcrumbHome, href: '' }, { label: X.page.eyebrow }])}
${groups}
<div class="section numbers-updated">
  <div class="container">
    <p class="muted small">${t(X.updated)}</p>
  </div>
</div>
${seeAlso(ctx, [
  { label: ctx.c.trustCenter.page.eyebrow, href: 'trust/' },
  { label: ctx.c.services.page.eyebrow, href: 'services/' },
  { label: ctx.c.about.page.eyebrow, href: 'about/' }
])}
${ctaBand(ctx)}`;
  return { title: X.title, description: X.description, body, bodyClass: 'page-numbers' };
};
