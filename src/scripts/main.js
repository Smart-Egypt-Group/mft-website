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

  /* ---------- Campaign attribution ----------
     Ads land here with utm_* in the URL. Carry them, for this tab's session, onto every app
     sign-up link, so the sign-up is credited to the ad and not to the site's own
     utm_source=website. The site placement (hero, tb-check…) moves to `cta`. Without incoming
     UTMs the links keep the site's own tags. */
  (function () {
    var KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    var params = new URLSearchParams(window.location.search);
    var utm = null;
    KEYS.forEach(function (k) {
      var v = params.get(k);
      if (v) { utm = utm || {}; utm[k] = v.slice(0, 100); }
    });
    try {
      if (utm) window.sessionStorage.setItem('mft-utm', JSON.stringify(utm));
      else utm = JSON.parse(window.sessionStorage.getItem('mft-utm') || 'null');
    } catch (e) { /* storage blocked: use this page's UTMs only */ }
    if (!utm || !utm.utm_source) return;
    Array.prototype.forEach.call(document.querySelectorAll('a[href^="https://app.seg-audit.com/"]'), function (a) {
      var u;
      try { u = new URL(a.href); } catch (e) { return; }
      if (!/\/signup\/?$/.test(u.pathname)) return;
      var placement = u.searchParams.get('utm_content');
      KEYS.forEach(function (k) { u.searchParams.delete(k); });
      KEYS.forEach(function (k) { if (utm[k]) u.searchParams.set(k, utm[k]); });
      if (placement) u.searchParams.set('cta', placement);
      a.href = u.toString();
    });
  })();

  /* ---------- Founding seats, live ----------
     The platform's public counter (contract: seg-audit docs/api/founding-applications.md):
       200 {open:true,  total, left}  open: update every [data-seats] number
       200 {open:false, total, left}  full: waitlist wording ([data-seats-show="full"])
       200 {open:false}               offer off: hide [data-seats-hide="off"], show [data-seats-show="off"]
       anything else / network / CORS failure: keep the last known count, quietly
     Last known = the last good answer this browser saw (localStorage), else the count rendered
     from site.config. [data-seats-stale] (the apply page only) then shows its date.
     The state is published on <html data-seats-state> and as a 'mft:seats' event for apply.js. */
  (function () {
    var me = document.querySelector('script[data-seats-api]');
    if (!me) return;
    var api = me.getAttribute('data-seats-api');
    var KEY = 'mft-seats', TTL = 60 * 1000;
    var built = {
      open: true,
      total: parseInt(me.getAttribute('data-seats-total'), 10),
      left: parseInt(me.getAttribute('data-seats-left'), 10),
      at: Date.parse(me.getAttribute('data-seats-asof') || '') || 0
    };
    function read(store) { try { return JSON.parse(window[store].getItem(KEY) || 'null'); } catch (e) { return null; } }
    function write(store, v) { try { window[store].setItem(KEY, JSON.stringify(v)); } catch (e) { /* storage blocked */ } }
    function valid(d) { return d && typeof d.open === 'boolean'; }
    function counted(d) { return typeof d.total === 'number' && typeof d.left === 'number' && d.total > 0 && d.left >= 0 && d.left <= d.total; }

    function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }
    function apply(d, stale) {
      var state = !d.open && !counted(d) ? 'off' : !d.open || d.left === 0 ? 'full' : 'open';
      document.documentElement.setAttribute('data-seats-state', state);
      if (counted(d)) {
        var filled = d.total - d.left;
        each('[data-seats="left"]', function (el) { el.textContent = d.left; });
        each('[data-seats="total"]', function (el) { el.textContent = d.total; });
        each('[data-seats="filled"]', function (el) { el.textContent = filled; });
        each('[data-seats-grid]', function (g) {
          Array.prototype.forEach.call(g.children, function (c, i) {
            c.className = i < filled ? 'seat seat-filled' : i === filled ? 'seat seat-next' : 'seat';
          });
        });
      }
      each('[data-seats-hide]', function (el) { el.hidden = el.getAttribute('data-seats-hide').split(' ').indexOf(state) !== -1; });
      each('[data-seats-show]', function (el) { el.hidden = el.getAttribute('data-seats-show').split(' ').indexOf(state) === -1; });
      each('[data-seats-stale]', function (el) {
        el.hidden = !stale;
        var at = el.querySelector('[data-seats="asof"]');
        if (at && stale && d.at) at.textContent = new Date(d.at).toISOString().slice(0, 10);
      });
      try { document.dispatchEvent(new CustomEvent('mft:seats', { detail: { state: state, seats: d, stale: !!stale } })); } catch (e) { /* old browser */ }
    }
    function fallback() {
      var last = read('localStorage');
      apply(valid(last) && last.at > built.at ? last : built, true);
    }

    var cached = read('sessionStorage');
    if (valid(cached) && Date.now() - cached.at < TTL) { apply(cached, false); return; }
    if (!window.fetch) { fallback(); return; }
    var ctl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 6000);
    fetch(api, { credentials: 'omit', cache: 'no-store', signal: ctl ? ctl.signal : undefined })
      .then(function (r) { if (r.status !== 200) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (d) {
        if (!valid(d) || (d.open && !counted(d))) throw new Error('bad body');
        d = { open: d.open, total: d.total, left: d.left, at: Date.now() };
        write('sessionStorage', d);
        if (counted(d)) write('localStorage', d);
        apply(d, false);
      })
      .catch(fallback)
      .then(function () { clearTimeout(timer); });
  })();

  /* ---------- Lead form ---------- */
  var form = document.getElementById('lead-form');
  if (!form) return;

  var status = form.querySelector('.form-status');
  var endpoint = form.getAttribute('data-endpoint') || '';
  var mode = form.getAttribute('data-mode') || 'function';
  var SERVICE_LABELS = {
    'odoo-erp': 'Odoo ERP Implementation', 'internal-audit': 'Internal Audit', 'virtual-cfo': 'Virtual CFO',
    'financial-consulting': 'Financial Consulting', 'business-analysis': 'Business Analysis',
    'training': 'User Training', 'technical-support': 'Technical Support', 'unsure': 'Not sure yet',
    'partners': 'Partner programme',
    'claude-team': 'Claude Team implementation & training'
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
      ['agents', 'erp', 'entities', 'volume', 'cadence', 'partner_type', 'odoo_clients'].forEach(function (k) { if (data[k]) extra.push(k.charAt(0).toUpperCase() + k.slice(1) + ': ' + data[k]); });
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
