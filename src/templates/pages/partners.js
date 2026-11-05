// Partners: the programme for Odoo implementation partners and accounting firms (value for
// the firm, tracks, levels, enablement), the activity packages (control rules per Odoo activity
// family), and an application form that lands in Odoo CRM as "Partner application: …".
// Copy: content/<lang>.js → partners. Level figures left null render as `levels.pending`.
const { t, esc, plain, phTag } = require('../html');
const { leadDirect } = require('../lead-direct');
const { pageHeader, seeAlso } = require('./services');

const select = (id, name, label, options) =>
  `<div class="field"><label for="${id}">${t(label)}</label><select id="${id}" name="${name}">${options
    .map((o) => `<option value="${esc(o.value)}">${esc(plain(o.label))}</option>`)
    .join('')}</select></div>`;

module.exports = function partners(ctx) {
  const P = ctx.c.partners;
  const F = P.form;
  const C = ctx.c.contact.form;
  const cfg = ctx.config;
  const LD = leadDirect(ctx);
  const countries = C.countries.map((o) => `<option value="${esc(o.value)}">${esc(o.label)}</option>`).join('');

  const value = `<section class="section" aria-labelledby="pt-value">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${t(P.value.eyebrow)}</p><h2 id="pt-value">${t(P.value.title)}</h2></div>
    <ol class="grid grid-4 pillars">${P.value.items
      .map((x) => `<li class="card"><h3>${t(x.title)}</h3><p>${t(x.body)}</p></li>`)
      .join('')}</ol>
  </div>
</section>`;

  const tracks = `<section class="section" aria-labelledby="pt-tracks">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${t(P.tracks.eyebrow)}</p><h2 id="pt-tracks">${t(P.tracks.title)}</h2></div>
    <ol class="grid grid-3 pillars">${P.tracks.items
      .map((x) => `<li class="card"><h3>${t(x.title)}</h3><p>${t(x.body)}</p></li>`)
      .join('')}</ol>
  </div>
</section>`;

  const L = P.levels;
  const pending = L.rows.some((r) => r.values.some((v) => v == null));
  const levels = `<section class="section section-mist" aria-labelledby="pt-levels">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${t(L.eyebrow)}</p><h2 id="pt-levels">${t(L.title)}</h2></div>
    ${pending ? phTag(ctx) : ''}
    <div class="table-wrap" tabindex="0" role="region" aria-labelledby="pt-levels">
      <table class="data-table">
        <caption>${t(L.caption)}</caption>
        <thead><tr><td></td>${L.cols.map((c) => `<th scope="col">${t(c)}</th>`).join('')}</tr></thead>
        <tbody>${L.rows
          .map((r) => `<tr><th scope="row">${t(r.label)}</th>${r.values.map((v) => `<td>${v == null ? `<span class="muted">${t(L.pending)}</span>` : t(v)}</td>`).join('')}</tr>`)
          .join('')}</tbody>
      </table>
    </div>
  </div>
</section>`;

  const E = P.enable;
  const enable = `<section class="section" aria-labelledby="pt-enable">
  <div class="container narrow">
    <div class="section-head"><p class="eyebrow">${t(E.eyebrow)}</p><h2 id="pt-enable">${t(E.title)}</h2></div>
    <dl class="deflist">${E.steps
      .map((x) => `<div class="deflist-row"><dt>${t(x.when)}</dt><dd><strong>${t(x.title)}</strong><br>${t(x.body)}</dd></div>`)
      .join('')}</dl>
  </div>
</section>`;

  const types = `<section class="section section-mist" aria-labelledby="pt-types">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${t(P.types.eyebrow)}</p><h2 id="pt-types">${t(P.types.title)}</h2></div>
    <ol class="grid grid-3 pillars">${P.types.items
      .map((x) => `<li class="card"><h3>${t(x.title)}</h3><p>${t(x.body)}</p></li>`)
      .join('')}</ol>
  </div>
</section>`;

  const gets = `<section class="section section-mist" aria-labelledby="pt-gets">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${t(P.gets.eyebrow)}</p><h2 id="pt-gets">${t(P.gets.title)}</h2></div>
    <dl class="deflist">${P.gets.items
      .map((x) => `<div class="deflist-row"><dt>${t(x.title)}</dt><dd>${t(x.body)}</dd></div>`)
      .join('')}</dl>
  </div>
</section>`;

  const packages = `<section class="section" aria-labelledby="pt-packages">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${t(P.packages.eyebrow)}</p><h2 id="pt-packages">${t(P.packages.title)}</h2><p class="lead">${t(P.packages.intro)}</p></div>
    <ol class="grid grid-2 pillars">${P.packages.items
      .map(
        (x) => `<li class="card"><h3>${t(x.title)}</h3><p class="muted small">${t(x.sectors)}</p><ul>${x.controls
          .map((c) => `<li>${t(c)}</li>`)
          .join('')}</ul></li>`
      )
      .join('')}</ol>
    <p class="trust-note">${t(P.packages.status)}</p>
  </div>
</section>`;

  const independence = `<section class="section section-navy" aria-labelledby="pt-indep">
  <div class="container narrow prose">
    <h2 id="pt-indep">${t(P.independence.title)}</h2>
    <p>${t(P.independence.body)}</p>
  </div>
</section>`;

  const form = `<section class="section" id="apply" aria-labelledby="form-title">
  <div class="container contact-grid">
    <form class="lead-form card" id="lead-form" method="post" action="${esc(cfg.formEndpoint || '#')}" novalidate
          data-endpoint="${esc(cfg.formEndpoint || '')}" data-mode="${esc(cfg.formMode || 'function')}" data-lang="${ctx.lang}" data-kind="Partner application" aria-labelledby="form-title">
      <h2 id="form-title">${t(F.heading)}</h2>
      ${LD.block}
      <p class="form-status" role="status" aria-live="polite"${LD.attr} data-success="${esc(plain(F.success))}" data-error="${esc(C.error)}" data-offline="${esc(C.offline)}" data-sending="${esc(C.sending)}"></p>
      <div class="field-row">
        ${select('p-type', 'partner_type', F.type, F.typeOptions)}
        ${select('p-clients', 'odoo_clients', F.clients, F.clientOptions)}
      </div>
      <div class="field-row">
        <div class="field"><label for="f-country">${t(C.country)}</label><select id="f-country" name="country">${countries}</select></div>
      </div>
      <hr class="form-rule">
      <div class="field-row">
        <div class="field"><label for="f-name">${t(C.name)} <span class="req" aria-hidden="true">*</span></label><input id="f-name" name="name" type="text" autocomplete="name" required data-required="${esc(C.required)}"></div>
        <div class="field"><label for="f-company">${t(C.company)} <span class="req" aria-hidden="true">*</span></label><input id="f-company" name="company" type="text" autocomplete="organization" required data-required="${esc(C.required)}"></div>
      </div>
      <div class="field-row">
        <div class="field"><label for="f-email">${t(C.email)} <span class="req" aria-hidden="true">*</span></label><input id="f-email" name="email" type="email" autocomplete="email" inputmode="email" required data-required="${esc(C.required)}" data-invalid="${esc(C.invalidEmail)}" dir="ltr"></div>
        <div class="field"><label for="f-phone">${t(C.phone)}</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" dir="ltr"></div>
      </div>
      <div class="field"><label for="f-message">${t(F.message)}</label><textarea id="f-message" name="message" rows="4"></textarea></div>
      <div class="field field-check"><input id="f-consent" name="consent" type="checkbox" required data-required="${esc(C.required)}"><label for="f-consent">${t(C.consent)}</label></div>
      <div class="hp" aria-hidden="true"><label for="f-website">${t(C.honeypotLabel)}</label><input id="f-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
      <input type="hidden" name="lang" value="${ctx.lang}"><input type="hidden" name="source" value="website-partners"><input type="hidden" name="service" value="partners">
      <button class="btn btn-primary btn-lg" type="submit">${t(F.submit)}</button>
    </form>
    <aside class="contact-details" aria-labelledby="pt-next">
      <h2 id="pt-next">${t(F.aside.title)}</h2>
      <ol class="num-list">${F.aside.steps.map((s, i) => `<li><span class="num lat" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><span>${t(s)}</span></li>`).join('')}</ol>
      <dl>
        <dt>${t(ctx.c.contact.details.whatsapp)}</dt>
        <dd><a href="https://wa.me/${esc(cfg.contact.whatsapp.replace(/[^0-9]/g, ''))}" rel="noopener" target="_blank" class="btn btn-navy btn-sm wa-btn">${t(ctx.c.contact.details.whatsappCta)}</a></dd>
        <dt>${t(ctx.c.contact.details.email)}</dt>
        <dd><a href="mailto:${esc(cfg.contact.email)}" class="lat">${esc(cfg.contact.email)}</a></dd>
      </dl>
    </aside>
  </div>
</section>`;

  const header = { ...P.page, cta: { label: P.page.cta, href: '#apply' } };
  const body = `${pageHeader(ctx, header, [{ label: ctx.c.ui.breadcrumbHome, href: '' }, { label: P.page.eyebrow }])}
${value}
${types}
${tracks}
${levels}
${enable}
${gets}
${packages}
${independence}
${form}
${seeAlso(ctx, [
  { label: ctx.c.services.page.eyebrow, href: 'services/' },
  { label: ctx.c.trustCenter.page.eyebrow, href: 'trust/' },
  { label: ctx.c.contact.page.eyebrow, href: 'contact/' }
])}`;
  return { title: P.title, description: P.description, body, bodyClass: 'page-partners', motion: false };
};
