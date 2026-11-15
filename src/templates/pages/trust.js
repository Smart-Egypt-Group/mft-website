// Trust centre: what seg-audit guarantees and how each guarantee is enforced.
// Copy lives in content/<lang>.js → trustCenter; platform figures in
// content/platform-facts.js (generated from the seg-audit code).
const { t, esc, url } = require('../html');
const { pageHeader, seeAlso } = require('./services');

module.exports = function trust(ctx) {
  const T = ctx.c.trustCenter;
  const email = T.securityEmail;

  const groups = T.groups
    .map(
      (g, gi) => `<section class="section${gi % 2 ? ' section-mist' : ''}" aria-labelledby="trust-g${gi}">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${t(g.eyebrow)}</p><h2 id="trust-g${gi}">${t(g.title)}</h2></div>
    <dl class="deflist">
      ${g.items
        .map(
          (x) => `<div class="deflist-row"><dt>${t(x.title)}</dt><dd>${t(x.body)}${
            x.proof ? `<br><span class="muted small">${t(x.proof)}</span>` : ''
          }</dd></div>`
        )
        .join('')}
    </dl>
  </div>
</section>`
    )
    .join('\n');

  const report = `<section class="section section-navy" aria-labelledby="trust-report">
  <div class="container narrow prose">
    <h2 id="trust-report">${t(T.report.title)}</h2>
    <p>${t(T.report.body).replace('{email}', `<a href="mailto:${esc(email)}" class="lat">${esc(email)}</a>`)}</p>
    <p class="muted small">${t(T.updated)}</p>
  </div>
</section>`;

  const body = `${pageHeader(ctx, T.page, [{ label: ctx.c.ui.breadcrumbHome, href: '' }, { label: T.page.eyebrow }])}
${groups}
${report}
${seeAlso(ctx, [
  { label: ctx.c.privacy.page.eyebrow, href: 'privacy/' },
  { label: T.platformLink, href: url(ctx, 'https://app.seg-audit.com') },
  { label: ctx.c.contact.page.eyebrow, href: 'contact/' }
])}`;
  return { title: T.title, description: T.description, body, bodyClass: 'page-trust', motion: false };
};
