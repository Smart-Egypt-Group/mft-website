const { t, esc, plain } = require('./html');
// Lead forms: temporary direct-contact safeguard. Until site.config → leadForm.deliveryVerified is
// true, every lead form shows WhatsApp and email up front, and the script never claims "received"
// (the Odoo route answers opaquely, so delivery cannot be confirmed from the browser).
const leadDirect = (ctx) => {
  const cfg = ctx.config;
  if (cfg.leadForm && cfg.leadForm.deliveryVerified) return { block: '', attr: '' };
  const D = ctx.c.contact.form.direct;
  const waDigits = cfg.contact.whatsapp.replace(/[^0-9]/g, '');
  const waPhone = cfg.contact.phones.find((p) => p.tel.replace(/[^0-9]/g, '') === waDigits);
  const waDisplay = waPhone ? waPhone.display : cfg.contact.whatsapp;
  const email = cfg.contact.email;
  const block = `<div class="form-direct" role="note">
        <p class="form-direct-title">${t(D.title)}</p>
        <p>${t(D.body)}</p>
        <div class="form-direct-links">
          <a href="https://wa.me/${esc(waDigits)}" rel="noopener" target="_blank" class="btn btn-navy btn-sm">${t(D.whatsapp)} <span class="lat" dir="ltr">${esc(waDisplay)}</span></a>
          <a href="mailto:${esc(email)}" class="btn btn-ghost btn-sm">${t(D.email)} <span class="lat" dir="ltr">${esc(email)}</span></a>
        </div>
      </div>`;
  const msg = plain(ctx.c.contact.form.unverified).replace('{wa}', '\u2066' + waDisplay + '\u2069').replace('{email}', email);
  return { block, attr: ` data-unverified="${esc(msg)}"` };
};

module.exports = { leadDirect };
