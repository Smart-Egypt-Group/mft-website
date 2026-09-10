const { t, esc, plain, url, btn } = require("../html");
const { ctaBand } = require('../layout');
const { pageHeader } = require('./services');

module.exports = function industries(ctx) {
  const I = ctx.c.industries;
  const jump = I.items.map((it) => `<li><a class="industry-chip" href="#${it.slug}"><span class="dot" aria-hidden="true"></span>${t(it.name)}</a></li>`).join('');
  const sections = I.items
    .map(
      (it, i) => `<section class="section industry${i % 2 ? ' section-mist' : ''}" id="${esc(it.slug)}" aria-labelledby="${esc(it.slug)}-title">
  <div class="container">
    <div class="section-head">
      <h2 id="${esc(it.slug)}-title">${t(it.name)}</h2>
      <p class="lead">${t(it.short)}</p>
    </div>
    <div class="grid grid-2 industry-cols">
      <div>
        <h3>${t(I.labels.challenges)}</h3>
        <ul class="dash-list">${it.challenges.map((x) => `<li>${t(x)}</li>`).join('')}</ul>
      </div>
      <div>
        <h3>${t(I.labels.how)}</h3>
        <ul class="check-list">${it.how.map((x) => `<li>${t(x)}</li>`).join('')}</ul>
      </div>
    </div>
    <p class="section-foot">${btn(ctx, { label: I.labels.cta, href: 'contact/' }, 'btn btn-navy')}</p>
  </div>
</section>`
    )
    .join('\n');

  const body = `${pageHeader(ctx, I.page)}
<div class="container"><ul class="chip-row jump-row" aria-label="${esc(plain(I.page.eyebrow))}">${jump}</ul></div>
${sections}
${ctaBand(ctx)}`;
  return { title: I.title, description: I.description, body, bodyClass: 'page-industries' };
};
