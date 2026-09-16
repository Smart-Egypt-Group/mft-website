/* MFT website — progressive enhancement only. The site works without this file. */
(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  if (header && toggle) {
    var setOpen = function (open) {
      header.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    toggle.addEventListener('click', function () {
      setOpen(!header.classList.contains('nav-open'));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('nav-open')) { setOpen(false); toggle.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (header.classList.contains('nav-open') && !header.contains(e.target)) setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900) setOpen(false);
    });
  }

  /* ---------- Motion ----------
     Scroll reveals live in motion.js (GSAP + ScrollTrigger, loaded only on pages that opt in).
     Here: only the hero's load-time counters, using the shared counter when motion.js is present. */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function localCountUp(el) {
    if (el.getAttribute('data-counted')) return;
    el.setAttribute('data-counted', '1');
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    if (isNaN(target)) return;
    var fmt = function (v) { var s = v.toFixed(decimals); return decimals ? s : s.replace(/\B(?=(\d{3})+(?!\d))/g, ','); };
    if (reduce) { el.textContent = fmt(target); return; }
    var start = null, dur = 1100;
    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(frame); else el.textContent = fmt(target);
    }
    requestAnimationFrame(frame);
  }
  var countUp = window.mftCountUp || localCountUp;
  var heroSeen = document.documentElement.classList.contains('hero-seen');
  Array.prototype.forEach.call(document.querySelectorAll('.hero [data-count]'), function (el) {
    if (heroSeen) { el.setAttribute('data-counted', '1'); return; }   // settled hero on later pages: final numbers, no replay
    setTimeout(function () { countUp(el); }, 350);
  });

  /* ---------- Lead form ---------- */
  var form = document.getElementById('lead-form');
  if (!form) return;

  var status = form.querySelector('.form-status');
  var endpoint = form.getAttribute('data-endpoint') || '';
  var mode = form.getAttribute('data-mode') || 'function';
  var SERVICE_LABELS = {
    'odoo-erp': 'Odoo ERP Implementation', 'internal-audit': 'Internal Audit', 'virtual-cfo': 'Virtual CFO',
    'financial-consulting': 'Financial Consulting', 'business-analysis': 'Business Analysis',
    'training': 'User Training', 'technical-support': 'Technical Support', 'unsure': 'Not sure yet'
  };
  var submitBtn = form.querySelector('button[type="submit"]');

  function setStatus(kind, text) {
    status.className = 'form-status' + (kind ? ' ' + kind : '');
    status.textContent = text || '';
  }

  function fieldWrap(input) { return input.closest('.field'); }

  function showError(input, msg) {
    var wrap = fieldWrap(input);
    if (!wrap) return;
    wrap.classList.add('invalid');
    var err = wrap.querySelector('.field-error');
    if (!err) {
      err = document.createElement('span');
      err.className = 'field-error';
      err.id = input.id + '-error';
      wrap.appendChild(err);
    }
    err.textContent = msg;
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', ((input.getAttribute('aria-describedby') || '').replace(err.id, '') + ' ' + err.id).trim());
  }

  function clearError(input) {
    var wrap = fieldWrap(input);
    if (!wrap) return;
    wrap.classList.remove('invalid');
    var err = wrap.querySelector('.field-error');
    if (err) err.remove();
    input.removeAttribute('aria-invalid');
  }

  function validate() {
    var firstBad = null;
    var fields = form.querySelectorAll('[required]');
    Array.prototype.forEach.call(fields, function (input) {
      clearError(input);
      var bad = false, msg = input.getAttribute('data-required');
      if (input.type === 'checkbox') bad = !input.checked;
      else if (!input.value.trim()) bad = true;
      else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim())) {
        bad = true; msg = input.getAttribute('data-invalid') || msg;
      }
      if (bad) { showError(input, msg); if (!firstBad) firstBad = input; }
    });
    if (firstBad) firstBad.focus();
    return !firstBad;
  }

  Array.prototype.forEach.call(form.querySelectorAll('[required]'), function (input) {
    input.addEventListener('input', function () { clearError(input); });
    input.addEventListener('change', function () { clearError(input); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    setStatus('', '');
    if (!validate()) return;

    // Honeypot: bots fill the hidden field. Pretend success, send nothing.
    if (form.querySelector('[name="website"]').value) {
      setStatus('ok', status.getAttribute('data-success'));
      form.reset();
      return;
    }

    if (!endpoint) {
      setStatus('info', status.getAttribute('data-offline'));
      return;
    }

    var data = {};
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name || el.name === 'website') return;
      data[el.name] = el.type === 'checkbox' ? el.checked : el.value.trim();
    });
    data.page = location.pathname;

    submitBtn.disabled = true;
    setStatus('info', status.getAttribute('data-sending'));

    var request;
    if (mode === 'odoo-direct') {
      // Odoo public website-form route (crm.lead). Field names are Odoo's.
      var service = SERVICE_LABELS[data.service] || data.service || '';
      var params = new URLSearchParams();
      var kind = form.getAttribute('data-kind') || '';
      params.set('name', (kind ? kind + ': ' : '') + (service || 'Website') + ' \u2014 ' + (data.company || data.name));
      params.set('contact_name', data.name);
      params.set('partner_name', data.company);
      params.set('email_from', data.email);
      params.set('phone', data.phone || '');
      var extra = [];
      ['agents', 'erp', 'entities', 'volume', 'cadence'].forEach(function (k) { if (data[k]) extra.push(k.charAt(0).toUpperCase() + k.slice(1) + ': ' + data[k]); });
      params.set('description', [data.message, ''].concat(extra, ['Service: ' + service, 'Country: ' + data.country, 'Language: ' + data.lang, 'Page: ' + data.page]).join('\n'));
      // Odoo sends no CORS header: the response is opaque, so a resolved fetch means the
      // request was delivered; a network failure rejects and shows the error message.
      request = fetch(endpoint, { method: 'POST', mode: 'no-cors', credentials: 'omit', body: params })
        .then(function () { return {}; });
    } else {
      request = fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json().catch(function () { return {}; }); });
    }

    request
      .then(function () {
        setStatus('ok', status.getAttribute('data-success'));
        form.reset();
        status.focus && status.setAttribute('tabindex', '-1');
        status.focus();
      })
      .catch(function () {
        setStatus('err', status.getAttribute('data-error'));
      })
      .then(function () { submitBtn.disabled = false; });
  });
})();
