const { t, esc } = require('../html');
const { pageHeader, seeAlso } = require('./services');

module.exports = function privacy(ctx) {
  const P = ctx.c.privacy;
  const email = ctx.config.contact.email;
  const sections = P.sections
    .map((s) => {
      const body = t(s.body).replace('{email}', `<a href="mailto:${esc(email)}" class="lat">${esc(email)}</a>`);
      const list = s.items ? `<ul>${s.items.map((x) => (x.k ? `<li><strong>${t(x.k)}:</strong> ${t(x.v)}</li>` : `<li>${t(x)}</li>`)).join('')}</ul>` : '';
      // The consent banner's script (assets/js/pixel.js) opens on any [data-consent-open].
      const settings = s.consentButton ? `<p><button type="button" class="btn btn-navy btn-sm" data-consent-open>${t(ctx.c.ui.consent.settings)}</button></p>` : '';
      return `<h2>${t(s.title)}</h2><p>${body}</p>${list}${settings}`;
    })
    .join('');
  const body = `${pageHeader(ctx, P.page, [{ label: ctx.c.ui.breadcrumbHome, href: '' }, { label: P.page.eyebrow }])}
<section class="section">
  <div class="container narrow prose">
    ${sections}
    <p class="muted small">${t(P.updated)}</p>
  </div>
</section>
${seeAlso(ctx, [{ label: ctx.c.contact.page.eyebrow, href: 'contact/' }, { label: ctx.c.about.page.eyebrow, href: 'about/' }])}`;
  return { title: P.title, description: P.description, body, bodyClass: 'page-privacy', motion: false };
};
