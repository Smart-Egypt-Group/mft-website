const { t, esc, plain } = require('../html');
const { pageHeader } = require('./services');

const select = (id, name, label, options) =>
  `<div class="field"><label for="${id}">${t(label)}</label><select id="${id}" name="${name}">${options
    .map((o) => `<option value="${esc(o.value)}">${esc(plain(o.label))}</option>`)
    .join('')}</select></div>`;

module.exports = function quote(ctx) {
  const Q = ctx.c.quote;
  const F = Q.form;
  const C = ctx.c.contact.form;
  const cfg = ctx.config;
  const countries = C.countries.map((o) => `<option value="${esc(o.value)}">${esc(o.label)}</option>`).join('');

  const body = `${pageHeader(ctx, Q.page)}
<section class="section">
  <div class="container contact-grid">
    <form class="lead-form card" id="lead-form" method="post" action="${esc(cfg.formEndpoint || '#')}" novalidate
          data-endpoint="${esc(cfg.formEndpoint || '')}" data-mode="${esc(cfg.formMode || 'function')}" data-lang="${ctx.lang}" data-kind="Quote request" aria-labelledby="form-title">
      <h2 id="form-title">${t(F.heading)}</h2>
      <p class="form-status" role="status" aria-live="polite" data-success="${esc(plain(F.success))}" data-error="${esc(C.error)}" data-offline="${esc(C.offline)}" data-sending="${esc(C.sending)}"></p>
      <div class="field-row">
        ${select('q-agents', 'agents', F.agents, F.agentOptions)}
        ${select('q-erp', 'erp', F.erp, F.erpOptions)}
      </div>
      <div class="field-row">
        ${select('q-entities', 'entities', F.entities, F.entityOptions)}
        ${select('q-volume', 'volume', F.volume, F.volumeOptions)}
      </div>
      <div class="field-row">
        ${select('q-cadence', 'cadence', F.cadence, F.cadenceOptions)}
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
      <div class="field"><label for="f-message">${t(C.message)}</label><textarea id="f-message" name="message" rows="4"></textarea></div>
      <div class="field field-check"><input id="f-consent" name="consent" type="checkbox" required data-required="${esc(C.required)}"><label for="f-consent">${t(C.consent)}</label></div>
      <div class="hp" aria-hidden="true"><label for="f-website">${t(C.honeypotLabel)}</label><input id="f-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
      <input type="hidden" name="lang" value="${ctx.lang}"><input type="hidden" name="source" value="website-quote"><input type="hidden" name="service" value="intelligence">
      <button class="btn btn-primary btn-lg" type="submit">${t(F.submit)}</button>
    </form>
    <aside class="contact-details" aria-labelledby="next-title">
      <h2 id="next-title">${t(F.aside.title)}</h2>
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
  return { title: Q.title, description: Q.description, body, bodyClass: 'page-quote' };
};
