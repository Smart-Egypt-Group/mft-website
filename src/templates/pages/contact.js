const { t, esc, plain } = require('../html');
const { pageHeader } = require('./services');

module.exports = function contact(ctx) {
  const C = ctx.c.contact;
  const F = C.form;
  const cfg = ctx.config;
  const services = ctx.c.services.items
    .map((s) => `<option value="${esc(s.slug)}">${esc(plain(s.name))}</option>`)
    .join('');
  const countries = F.countries.map((o) => `<option value="${esc(o.value)}">${esc(o.label)}</option>`).join('');
  const phones = cfg.contact.phones
    .map((p) => `<li><a href="tel:${esc(p.tel)}" class="lat">${esc(p.display)}</a></li>`)
    .join('');
  const wa = cfg.contact.whatsapp.replace(/[^0-9]/g, '');
  const offices = cfg.contact.offices
    .map((o) => `<li>${t(ctx.c.footer.offices[o.key])}</li>`)
    .join('');

  const body = `${pageHeader(ctx, C.page)}
<section class="section">
  <div class="container contact-grid">
    <form class="lead-form card" id="lead-form" method="post" action="${esc(cfg.formEndpoint || '#')}" novalidate
          data-endpoint="${esc(cfg.formEndpoint || '')}" data-lang="${ctx.lang}" aria-labelledby="form-title">
      <h2 id="form-title">${t(F.heading)}</h2>
      <p class="form-status" role="status" aria-live="polite" data-success="${esc(F.success)}" data-error="${esc(F.error)}" data-offline="${esc(F.offline)}" data-sending="${esc(F.sending)}"></p>

      <div class="field-row">
        <div class="field">
          <label for="f-name">${t(F.name)} <span class="req" aria-hidden="true">*</span></label>
          <input id="f-name" name="name" type="text" autocomplete="name" required data-required="${esc(F.required)}">
        </div>
        <div class="field">
          <label for="f-company">${t(F.company)} <span class="req" aria-hidden="true">*</span></label>
          <input id="f-company" name="company" type="text" autocomplete="organization" required data-required="${esc(F.required)}">
        </div>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="f-email">${t(F.email)} <span class="req" aria-hidden="true">*</span></label>
          <input id="f-email" name="email" type="email" autocomplete="email" inputmode="email" required data-required="${esc(F.required)}" data-invalid="${esc(F.invalidEmail)}" dir="ltr">
        </div>
        <div class="field">
          <label for="f-phone">${t(F.phone)}</label>
          <input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" aria-describedby="f-phone-hint" dir="ltr">
          <span class="hint" id="f-phone-hint">${t(F.phoneHint)}</span>
        </div>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="f-country">${t(F.country)}</label>
          <select id="f-country" name="country">${countries}</select>
        </div>
        <div class="field">
          <label for="f-service">${t(F.service)}</label>
          <select id="f-service" name="service">
            <option value="">${esc(F.servicePlaceholder)}</option>
            ${services}
            <option value="unsure">${esc(F.serviceOther)}</option>
          </select>
        </div>
      </div>
      <div class="field">
        <label for="f-message">${t(F.message)}</label>
        <textarea id="f-message" name="message" rows="5" aria-describedby="f-message-hint"></textarea>
        <span class="hint" id="f-message-hint">${t(F.messageHint)}</span>
      </div>
      <div class="field field-check">
        <input id="f-consent" name="consent" type="checkbox" required data-required="${esc(F.required)}">
        <label for="f-consent">${t(F.consent)}</label>
      </div>
      <div class="hp" aria-hidden="true">
        <label for="f-website">${t(F.honeypotLabel)}</label>
        <input id="f-website" name="website" type="text" tabindex="-1" autocomplete="off">
      </div>
      <input type="hidden" name="lang" value="${ctx.lang}">
      <input type="hidden" name="source" value="website">
      <button class="btn btn-primary btn-lg" type="submit">${t(F.submit)}</button>
    </form>

    <aside class="contact-details" aria-labelledby="details-title">
      <h2 id="details-title">${t(C.details.title)}</h2>
      <dl>
        <dt>${t(C.details.email)}</dt>
        <dd><a href="mailto:${esc(cfg.contact.email)}" class="lat">${esc(cfg.contact.email)}</a></dd>
        <dt>${t(C.details.phone)}</dt>
        <dd><ul class="plain">${phones}</ul></dd>
        <dt>${t(C.details.whatsapp)}</dt>
        <dd><a href="https://wa.me/${esc(wa)}" rel="noopener" target="_blank" class="btn btn-navy btn-sm wa-btn">${t(C.details.whatsappCta)}</a></dd>
        <dt>${t(C.details.responseLabel)}</dt>
        <dd>${t(C.details.response)}</dd>
        <dt>${t(C.details.officesLabel)}</dt>
        <dd><p class="address">${t(C.details.address)}</p><ul class="plain">${offices}</ul></dd>
      </dl>
    </aside>
  </div>
</section>`;
  return { title: C.title, description: C.description, body, bodyClass: 'page-contact' };
};
