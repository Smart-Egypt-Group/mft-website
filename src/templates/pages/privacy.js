const { t, esc } = require('../html');
const { pageHeader } = require('./services');

module.exports = function privacy(ctx) {
  const P = ctx.c.privacy;
  const email = ctx.config.contact.email;
  const sections = P.sections
    .map((s) => {
      const body = t(s.body).replace('{email}', `<a href="mailto:${esc(email)}" class="lat">${esc(email)}</a>`);
      return `<h2>${t(s.title)}</h2><p>${body}</p>`;
    })
    .join('');
  const body = `${pageHeader(ctx, P.page)}
<section class="section">
  <div class="container narrow prose">
    ${sections}
    <p class="muted small">${t(P.updated)}</p>
  </div>
</section>`;
  return { title: P.title, description: P.description, body, bodyClass: 'page-privacy' };
};
