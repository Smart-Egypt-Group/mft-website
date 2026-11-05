/* Founding seat application (founding-members/apply/). Progressive enhancement: posts JSON to the
   platform's public endpoint. Contract: seg-audit docs/api/founding-applications.md.
     202  always the same, whatever happened: one neutral "received" message (never "created")
     422  {detail:[{loc:["body",field],msg}]}: mark those fields
     429  Retry-After: "try again in a little while"
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
  var state = 'open';

  var EMAIL = /^[^@\s]{1,64}@[A-Za-z0-9.-]{1,253}\.[A-Za-z]{2,24}$/;   // the engine's _EMAIL
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

  // Seats state from main.js: full → waitlist wording on the button. main.js may have settled
  // already (cached answer), so read the current state too.
  function onState(st) {
    state = st || 'open';
    if (!btn.disabled) btn.textContent = btn.getAttribute(state === 'full' ? 'data-label-full' : 'data-label-open');
  }
  document.addEventListener('mft:seats', function (e) { onState(e.detail && e.detail.state); });
  if (document.documentElement.getAttribute('data-seats-state')) onState(document.documentElement.getAttribute('data-seats-state'));

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
          var seats = res.body && res.body.seats;
          var full = state === 'full' || (seats && seats.left === 0);
          form.reset();
          form.classList.add('is-sent');
          setStatus('ok', full ? M.successWaitlist : M.success);
          status.focus();
          try { document.dispatchEvent(new CustomEvent('mft:lead', { detail: { name: 'founding-application', waitlist: !!full } })); } catch (err) { /* old browser */ }
          return;
        }
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
        setStatus('err', M.failed);
      })
      .catch(function () { setStatus('err', M.failed); })
      .then(function () {
        btn.disabled = false;
        if (btn.textContent === M.sending) btn.textContent = label;
      });
  });
})();
