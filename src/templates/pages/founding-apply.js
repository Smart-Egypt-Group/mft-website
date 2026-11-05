// Founding seat application: the public form on founding-members/apply/. It posts JSON to the
// platform (site.config → founding.api.apply) and shows the live seats counter
// (founding.api.seats) via main.js; the form logic is in scripts/apply.js. Contract: seg-audit
// docs/api/founding-applications.md. Without JS, or before the counter answers, the numbers are
// the last known count from site.config (founding.filled / asOf).
const { t, esc, plain, url, seats, seatsHtml } = require('../html');
const { seeAlso } = require('./services');

module.exports = function foundingApply(ctx) {
  const P = ctx.c.founding, A = P.apply, F = ctx.config.founding, L = A.fields;
  const filled = F.showCount ? F.filled : 0;
  const s = (x) => seatsHtml(ctx, x);
  // Text with [[path/|label]] links (the consent line points to the privacy notice).
  const tl = (x) => t(x).replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, (m, href, label) => `<a href="${esc(url(ctx, href))}">${label}</a>`);
  const req = '<span class="req" aria-hidden="true">*</span>';
  const opts = (k) => A.options[k];

  const select = (name, required = true) => `<div class="field"><label for="ap-${name}">${t(L[name])} ${required ? req : ''}</label>
        <select id="ap-${name}" name="${name}"${required ? ' required' : ''}><option value="">${esc(plain(L.choose))}</option>${opts(name)
    .map(([v, label]) => `<option value="${esc(v)}">${esc(plain(label))}</option>`).join('')}</select></div>`;
  const number = (name, min, max) => `<div class="field"><label for="ap-${name}">${t(L[name])} ${req}</label>
        <input id="ap-${name}" name="${name}" type="number" inputmode="numeric" min="${min}" max="${max}" step="1" required dir="ltr" data-min="${min}" data-max="${max}"></div>`;
  const group = (name, max) => `<fieldset class="field field-group" id="ap-${name}" data-group="${name}" data-min="1"${max ? ` data-max="${max}"` : ''}>
        <legend>${t(L[name])} ${req}</legend>
        <div class="check-grid">${opts(name)
    .map(([v, label]) => `<span class="check-chip"><input type="checkbox" id="ap-${name}-${esc(v)}" name="${name}" value="${esc(v)}"><label for="ap-${name}-${esc(v)}">${t(label)}</label></span>`).join('')}</div></fieldset>`;
  const text = (name, type, attrs, hint) => `<div class="field"><label for="ap-${name}">${t(L[name])} ${/optional|اختياري/.test(plain(L[name])) ? '' : req}</label>
        <input id="ap-${name}" name="${name}" type="${type}" ${attrs}>${hint ? `<span class="field-hint" id="ap-${name}-hint">${t(hint)}</span>` : ''}</div>`;
  const check = (name) => `<div class="field field-check"><input id="ap-${name}" name="${name}" type="checkbox"><label for="ap-${name}">${t(L[name])}</label></div>`;

  // Messages for apply.js, resolved here so the script stays language-free.
  const i18n = {
    errors: A.errors,
    submit: plain(A.submit), submitWaitlist: plain(A.submitWaitlist), sending: plain(A.sending),
    success: plain(seats(ctx, A.success)), successWaitlist: plain(seats(ctx, A.successWaitlist)),
    rateLimited: plain(A.rateLimited), captchaFailed: plain(A.captchaFailed), failed: plain(A.failed).replace('{email}', ctx.config.contact.email)
  };
  for (const k in i18n.errors) i18n.errors[k] = plain(i18n.errors[k]);

  const hero = `<section class="founding-hero apply-hero" aria-labelledby="ap-title">
  <div class="container founding-hero-inner">
    <div>
      <nav class="breadcrumb breadcrumb-light" aria-label="Breadcrumb"><ol><li><a href="${url(ctx, '')}">${t(ctx.c.ui.breadcrumbHome)}</a></li><li><a href="${url(ctx, 'founding-members/')}">${t(P.page.eyebrow)}</a></li><li aria-current="page">${t(A.eyebrow)}</li></ol></nav>
      <p class="eyebrow">${t(A.eyebrow)}</p>
      <h1 id="ap-title">${t(A.headline)}</h1>
      <p class="lead">${t(A.intro)}</p>
    </div>
    <div class="seat-panel apply-counter" data-seats-hide="off" aria-live="polite">
      <p class="seat-count"><span class="seat-left lat" data-seats="left">${F.total - filled}</span><span class="seat-total lat">/<span data-seats="total">${F.total}</span></span></p>
      <p class="seat-caption">${s(A.counter.caption)}</p>
      <p class="seat-stale" data-seats-stale hidden>${t(A.counter.asOf)} · <span class="lat" data-seats="asof">${esc(F.asOf || '')}</span></p>
      <p class="seat-note" data-seats-show="full" hidden>${t(A.counter.full)}</p>
    </div>
  </div>
</section>`;

  const off = `<div class="apply-off card" data-seats-show="off" hidden>
      <p>${t(A.counter.off)}</p>
      <p><a class="btn btn-primary" href="${url(ctx, 'contact/')}">${t(A.counter.offCta)}</a></p>
    </div>`;

  const form = `<section class="section" aria-labelledby="ap-form-title">
  <div class="container contact-grid apply-grid">
    ${off}
    <form class="lead-form card apply-form" id="founding-form" method="post" action="${esc(F.api.apply)}" novalidate data-seats-hide="off"
          data-endpoint="${esc(F.api.apply)}" data-utm-field="${esc(F.api.utmField || '')}" data-lang="${ctx.lang}" aria-labelledby="ap-form-title">
      <h2 id="ap-form-title" class="visually-hidden">${t(A.eyebrow)}</h2>
      <script type="application/json" id="apply-i18n">${JSON.stringify(i18n).replace(/</g, '\\u003c')}</script>

      <h3 class="form-section">${t(A.sections.business)}</h3>
      <div class="field-row">${number('companies', 1, 500)}${number('branches', 1, 5000)}</div>
      <div class="field-row">${select('employees')}${select('je_monthly')}</div>
      <div class="field-row">${select('revenue')}${select('sector')}</div>
      ${group('markets', 3)}

      <h3 class="form-section">${t(A.sections.system)}</h3>
      <div class="field-row">${select('erp')}${text('erp_version', 'text', 'maxlength="32" autocomplete="off" dir="ltr" aria-describedby="ap-erp_version-hint"', L.erp_version_hint)}</div>
      <div class="field-row">${select('hosting')}<div class="field"></div></div>
      ${group('modules')}

      <h3 class="form-section">${t(A.sections.fit)}</h3>
      <div class="field-row">${select('auditor')}${select('role')}</div>
      <div class="field"><label for="ap-main_pain">${t(L.main_pain)} ${req}</label>
        <textarea id="ap-main_pain" name="main_pain" rows="4" minlength="3" maxlength="500" required aria-describedby="ap-main_pain-hint" data-min="3" data-max="500"></textarea>
        <span class="field-hint" id="ap-main_pain-hint">${t(L.main_pain_hint)}</span></div>

      <h3 class="form-section">${t(A.sections.contact)}</h3>
      <div class="field-row">
        ${text('contact_name', 'text', 'autocomplete="name" minlength="2" maxlength="120" required data-min="2" data-max="120"')}
        ${text('company_name', 'text', 'autocomplete="organization" minlength="2" maxlength="160" required data-min="2" data-max="160"')}
      </div>
      <div class="field-row">
        ${text('email', 'email', 'autocomplete="email" inputmode="email" maxlength="320" required dir="ltr" aria-describedby="ap-email-hint"', L.email_hint)}
        ${text('phone', 'tel', 'autocomplete="tel" inputmode="tel" maxlength="32" dir="ltr"')}
      </div>

      <h3 class="form-section">${t(A.sections.commit)}</h3>
      <p class="field-hint">${t(L.commitHint)}</p>
      <div class="check-stack">${['case_study', 'testimonial', 'logo', 'annual_commitment', 'beta_feedback'].map(check).join('')}</div>

      <div class="field field-check field-consent"><input id="ap-consent_contact" name="consent_contact" type="checkbox" required><label for="ap-consent_contact">${tl(L.consent_contact)} ${req}</label></div>
      <div class="captcha-slot" id="ap-captcha" data-captcha-slot data-sitekey="${esc(F.api.captchaSiteKey || '')}"${F.api.captchaSiteKey ? '' : ' hidden'}></div>
      <input type="hidden" name="captcha_token" id="ap-captcha_token" value="">
      <div class="hp" aria-hidden="true"><label for="ap-website">${t(L.honeypot)}</label><input id="ap-website" name="website" type="text" tabindex="-1" autocomplete="off" value=""></div>

      <p class="form-status" role="status" aria-live="polite" tabindex="-1"></p>
      <button class="btn btn-primary btn-lg" type="submit" data-label-open="${esc(plain(A.submit))}" data-label-full="${esc(plain(A.submitWaitlist))}">${t(A.submit)}</button>
    </form>
    <aside class="contact-details apply-aside" aria-labelledby="ap-next-title">
      <h2 id="ap-next-title">${t(A.aside.title)}</h2>
      <ol class="num-list">${A.aside.steps.map((x, i) => `<li><span class="num lat" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><span>${s(x)}</span></li>`).join('')}</ol>
      <p class="field-hint">${t(A.aside.note)}</p>
    </aside>
  </div>
</section>`;

  const body = `${hero}
${form}
${seeAlso(ctx, [
  { label: P.page.eyebrow, href: 'founding-members/' },
  { label: ctx.c.trustCenter.page.eyebrow, href: 'trust/' },
  { label: ctx.c.privacy.page ? ctx.c.privacy.page.eyebrow : 'Privacy', href: 'privacy/' }
])}`;
  return {
    title: seats(ctx, A.title),
    description: seats(ctx, A.description),
    body,
    bodyClass: 'page-founding page-apply',
    motion: false,
    scripts: ['apply.js'],
    ogImage: { url: `/assets/img/launch/founding-og-${ctx.lang}.jpg`, width: 1200, height: 630, alt: plain(seats(ctx, A.title)) }
  };
};
