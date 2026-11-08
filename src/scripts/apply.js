/* Founding membership application (founding-members/apply/). Progressive enhancement: posts JSON to
   the platform's public endpoint. Contract: seg-audit docs/api/founding-applications.md.
     202  {received:true, seats:{open, deadline}}: always the same, whatever happened: one neutral
          "received, MFT will reply by e-mail" message (never "created"). There is no confirmation
          e-mail step (decision, 8 Nov 2026): the application goes straight to MFT's review queue.
     410  {closed:true, deadline?, detail}: applications are closed (past the deadline, or the offer
          switched off) → the page switches to its "applications closed" card (main.js)
     422  {detail:[{loc:["body",field],msg}]}: mark those fields
     429  Retry-After: "try again in a little while"
     400  with the captcha on: the Turnstile check failed → reset the widget, ask to retry
     else / network / CORS: "could not send now", with the e-mail fallback
   The page validates first with the contract's own rules, so a 422 should be rare.
   On 202 a 'mft:lead' event fires; pixel.js sends it to Meta as Lead with the visit's UTMs only
   (never the form's contents). UTMs go with the application only once site.config →
   founding.api.utmField names a field the platform accepts (unknown fields are a 422). */
(function () {
  'use strict';
  var form = document.getElementById('founding-form');
  if (!form || !window.fetch) return;
  var M = {};
  try { M = JSON.parse(document.getElementById('apply-i18n').textContent); } catch (e) { return; }
  var E = M.errors || {};
  var endpoint = form.getAttribute('data-endpoint');
  var utmField = form.getAttribute('data-utm-field');
  var status = form.querySelector('.form-status');
  var btn = form.querySelector('button[type="submit"]');

  var EMAIL = /^[A-Za-z0-9.!#$%&'*+\/=?^_`{|}~-]{1,64}@[A-Za-z0-9.-]{1,253}\.[A-Za-z]{2,24}$/;   // the engine's _EMAIL
  var PHONE = /^\+?[0-9 ()-]{6,32}$/;                                   // the engine's _PHONE
  var INTS = ['companies', 'branches'];
  var CHOICES = ['employees', 'je_monthly', 'revenue', 'erp', 'hosting', 'sector', 'auditor', 'role'];
  var LISTS = ['modules', 'markets'];
  var FLAGS = ['case_study', 'testimonial', 'logo', 'annual_commitment', 'beta_feedback'];

  function fmt(s, o) { return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return o && o[k] != null ? o[k] : m; }); }
  function el(name) { return form.querySelector('[name="' + name + '"]') || document.getElementById('ap-' + name); }
  function wrap(name) {
    var g = form.querySelector('[data-group="' + name + '"]');
    if (g) return g;
    var i = el(name);
    return i && i.closest('.field');
  }
  function setStatus(kind, text) {
    status.className = 'form-status' + (kind ? ' ' + kind : '');
    status.textContent = text || '';
  }
  function mark(name, msg) {
    var w = wrap(name);
    if (!w) return null;
    w.classList.add('invalid');
    var err = w.querySelector('.field-error');
    if (!err) { err = document.createElement('span'); err.className = 'field-error'; err.id = 'ap-' + name + '-error'; w.appendChild(err); }
    err.textContent = msg;
    var input = w.tagName === 'FIELDSET' ? w : el(name);
    if (input) {
      input.setAttribute('aria-invalid', 'true');
      var d = (input.getAttribute('aria-describedby') || '').split(' ').filter(function (x) { return x && x !== err.id; });
      d.push(err.id);
      input.setAttribute('aria-describedby', d.join(' '));
    }
    return w;
  }
  function unmark(name) {
    var w = wrap(name);
    if (!w) return;
    w.classList.remove('invalid');
    var err = w.querySelector('.field-error');
    var input = w.tagName === 'FIELDSET' ? w : el(name);
    if (input) {
      input.removeAttribute('aria-invalid');
      if (err) input.setAttribute('aria-describedby', (input.getAttribute('aria-describedby') || '').split(' ').filter(function (x) { return x && x !== err.id; }).join(' '));
    }
    if (err) err.remove();
  }
  function checked(name) {
    return Array.prototype.filter.call(form.querySelectorAll('input[name="' + name + '"]'), function (i) { return i.checked; }).map(function (i) { return i.value; });
  }
  function val(name) { var i = el(name); return i ? String(i.value || '').trim() : ''; }
  function squash(s) { return s.split(/\s+/).filter(Boolean).join(' '); }

  // The payload, exactly the contract's fields (no others: unknown fields are a 422).
  function payload() {
    var p = {
      email: val('email').toLowerCase(),
      contact_name: squash(val('contact_name')),
      company_name: squash(val('company_name')),
      phone: squash(val('phone')),
      consent_contact: !!el('consent_contact').checked,
      website: el('website').value || ''
    };
    INTS.forEach(function (k) { p[k] = parseInt(val(k), 10); });
    CHOICES.forEach(function (k) { p[k] = val(k); });
    LISTS.forEach(function (k) { p[k] = checked(k); });
    // Turnstile token (site.config → founding.api.captchaSiteKey). Empty while the captcha is
    // off: the platform ignores it until MFT switches it on, then it is required.
    p.captcha_token = captchaToken();
    p.erp_version = val('erp_version');
    p.main_pain = val('main_pain');
    FLAGS.forEach(function (k) { p[k] = !!el(k).checked; });
    if (utmField) {
      var utm = null;
      try { utm = JSON.parse(window.sessionStorage.getItem('mft-utm') || 'null'); } catch (e) { /* none */ }
      if (utm) p[utmField] = utm;
    }
    return p;
  }

  // Captcha: when a site key is configured, render Turnstile in the slot (its script is loaded
  // only then) and keep its token in the hidden field. With no key: nothing loads, token "".
  var slot = form.querySelector('[data-captcha-slot]');
  var siteKey = slot && slot.getAttribute('data-sitekey');
  function captchaToken() { var i = form.querySelector('[name="captcha_token"]'); return i ? i.value || '' : ''; }
  function captchaReset() {
    var i = form.querySelector('[name="captcha_token"]'); if (i) i.value = '';
    if (siteKey && window.turnstile) try { window.turnstile.reset(slot); } catch (e) { /* not rendered */ }
  }
  if (siteKey) {
    window.mftTurnstile = function () {
      window.turnstile.render(slot, {
        sitekey: siteKey,
        language: form.getAttribute('data-lang') || 'auto',
        callback: function (token) { form.querySelector('[name="captcha_token"]').value = token; },
        'expired-callback': captchaReset,
        'error-callback': captchaReset
      });
    };
    var ts = document.createElement('script');
    ts.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=mftTurnstile&render=explicit';
    ts.async = true; ts.defer = true;
    document.head.appendChild(ts);
  }

  // Page-side validation with the contract's rules. Returns [[field, message], ...].
  function check(p) {
    var bad = [];
    function len(k, min, max) { var n = p[k].length; if (n < min || n > max) bad.push([k, n ? fmt(E.length, { min: min, max: max }) : E.required]); }
    INTS.forEach(function (k) {
      var i = el(k), min = +i.getAttribute('data-min'), max = +i.getAttribute('data-max'), raw = val(k);
      if (!raw) bad.push([k, E.required]);
      else if (!/^\d+$/.test(raw) || p[k] < min || p[k] > max) bad.push([k, fmt(E.number, { min: min, max: max })]);
    });
    CHOICES.forEach(function (k) { if (!p[k]) bad.push([k, E.required]); });
    if (!p.modules.length) bad.push(['modules', E.pick]);
    if (!p.markets.length) bad.push(['markets', E.pick]);
    if (p.erp_version.length > 32) bad.push(['erp_version', fmt(E.length, { min: 0, max: 32 })]);
    len('main_pain', 3, 500);
    len('contact_name', 2, 120);
    len('company_name', 2, 160);
    if (!p.email) bad.push(['email', E.required]);
    else if (p.email.length < 5 || p.email.length > 320 || !EMAIL.test(p.email)) bad.push(['email', E.email]);
    if (p.phone && !PHONE.test(p.phone)) bad.push(['phone', E.phone]);
    if (!p.consent_contact) bad.push(['consent_contact', E.consent]);
    return bad;
  }

  function showErrors(list) {
    var first = null;
    list.forEach(function (x) { var w = mark(x[0], x[1]); if (w && !first) first = w; });
    if (first) {
      var focus = first.querySelector('input, select, textarea') || first;
      focus.focus();
    }
  }

  // Clear a field's error as soon as it is edited.
  form.addEventListener('input', function (e) { if (e.target.name) unmark(e.target.name); });
  form.addEventListener('change', function (e) { if (e.target.name) unmark(e.target.name); });

  // 410: applications are closed. main.js hides the form and shows the "closed" card (with the
  // platform's deadline, if it sent one); without main.js the message goes in the form's status.
  function closed(body) {
    try { document.dispatchEvent(new CustomEvent('mft:founding-closed', { detail: { deadline: body && body.deadline } })); } catch (e) { /* old browser */ }
    var card = document.getElementById('ap-closed');
    if (document.documentElement.getAttribute('data-seats-state') === 'closed' && card && !card.hidden) { card.focus(); return; }
    setStatus('err', M.closed);
    status.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    setStatus('', '');
    Array.prototype.forEach.call(form.querySelectorAll('.invalid'), function (w) {
      var n = w.getAttribute('data-group') || (w.querySelector('[name]') || {}).name;
      if (n) unmark(n);
    });
    var p = payload();
    var bad = check(p);
    if (bad.length) { showErrors(bad); return; }

    var label = btn.textContent;
    btn.disabled = true;
    btn.textContent = M.sending;
    setStatus('info', M.sending);

    fetch(endpoint, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(p)
    })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (body) { return { status: r.status, body: body }; });
      })
      .then(function (res) {
        if (res.status === 202) {
          form.reset();
          captchaReset();
          form.classList.add('is-sent');
          setStatus('ok', M.success);
          status.focus();
          try { document.dispatchEvent(new CustomEvent('mft:lead', { detail: { name: 'founding-application' } })); } catch (err) { /* old browser */ }
          return;
        }
        if (res.status === 410) { closed(res.body); return; }
        if (res.status === 422 && res.body && Array.isArray(res.body.detail)) {
          var list = [];
          res.body.detail.forEach(function (d) {
            var f = d && d.loc && d.loc[d.loc.length - 1];
            if (typeof f === 'number' && d.loc.length > 1) f = d.loc[d.loc.length - 2];   // list item: its field
            if (typeof f === 'string' && wrap(f)) list.push([f, E.server]);
          });
          setStatus('err', E.server);
          showErrors(list);
          return;
        }
        if (res.status === 429) { setStatus('err', M.rateLimited); return; }
        if (res.status === 400 && siteKey) { captchaReset(); setStatus('err', M.captchaFailed); return; }   // captcha on: failed check
        setStatus('err', M.failed);
      })
      .catch(function () { setStatus('err', M.failed); })
      .then(function () {
        btn.disabled = false;
        if (btn.textContent === M.sending) btn.textContent = label;
      });
  });
})();
