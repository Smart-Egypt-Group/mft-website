const { t, url } = require('../html');

module.exports = function notFound(ctx) {
  const N = ctx.c.notFound;
  const body = `<section class="section page-header">
  <div class="container narrow">
    <p class="eyebrow lat">404</p>
    <h1>${t(N.title)}</h1>
    <p class="lead">${t(N.body)}</p>
    <p class="cta-row"><a class="btn btn-navy" href="${url(ctx, '')}">${t(N.link)}</a></p>
  </div>
</section>`;
  return { title: `${N.title} — ${ctx.c.meta.siteName}`, description: N.body, body, bodyClass: 'page-404' };
};
