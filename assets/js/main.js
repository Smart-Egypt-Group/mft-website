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

  /* ---------- Reports generated on SEG, live ----------
     Contract: seg-audit docs/api/public-reports-count.md. Elements [data-reports-live] carry the
     endpoint (site.config reportsCounter).
       200 {"reports": N}        fill every [data-reports="count"], show the elements, remember N
       429                       keep what is shown; wait Retry-After before the next call
       502 / 503 (any 5xx)       hide: the platform is down, so no number is shown
       network / CORS failure    keep the last number this visitor saw, else stay hidden
     Polls every data-reports-poll seconds (30 to 60) while the tab is visible. */
  (function () {
    var els = document.querySelectorAll('[data-reports-live]');
    if (!els.length) return;
    var api = els[0].getAttribute('data-reports-api') || '';
    var poll = Math.min(60, Math.max(30, parseInt(els[0].getAttribute('data-reports-poll'), 10) || 45)) * 1000;
    var built = { reports: parseInt(els[0].getAttribute('data-reports-last'), 10), at: Date.parse(els[0].getAttribute('data-reports-asof') || '') || 0 };
    var KEY = 'mft-reports';
    var timer = null, shown = false;
    function ok(d) { return d && typeof d.reports === 'number' && isFinite(d.reports) && d.reports >= 0 && Math.floor(d.reports) === d.reports; }
    function read() { try { return JSON.parse(window.localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } }
    function write(v) { try { window.localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* storage blocked */ } }
    function each(fn) { Array.prototype.forEach.call(els, fn); }
    function show(d) {
      var txt = String(d.reports).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      Array.prototype.forEach.call(document.querySelectorAll('[data-reports="count"]'), function (el) { el.textContent = txt; });
      each(function (el) { el.hidden = false; });
      shown = true;
    }
    function hide() { each(function (el) { el.hidden = true; }); shown = false; }
    function last() {
      var l = read();
      return ok(l) && l.at > built.at ? l : ok(built) ? built : null;
    }
    function keepLast() { if (!shown) { var l = last(); if (l) show(l); } }
    function next(ms) { clearTimeout(timer); timer = setTimeout(tick, ms); }
    function tick() {
      if (document.hidden) return;   // resumes on visibilitychange
      fetch(api, { credentials: 'omit', cache: 'no-store' })
        .then(function (r) {
          if (r.status === 200) {
            return r.json().then(function (b) {
              var d = { reports: b && b.reports, at: Date.now() };
              if (!ok(d)) throw new Error('bad body');
              write(d); show(d); next(poll);
            });
          }
          if (r.status === 429) {
            var wait = parseInt(r.headers.get('Retry-After'), 10);
            keepLast(); next(Math.max(poll, (isFinite(wait) ? wait : 60) * 1000));
            return;
          }
          if (r.status >= 500) { hide(); next(poll); return; }
          throw new Error('HTTP ' + r.status);
        })
        .catch(function () { keepLast(); next(poll); });
    }
    if (!api || !window.fetch) { keepLast(); return; }
    keepLast();   // last known first, so the number does not flash in
    tick();
    document.addEventListener('visibilitychange', function () { if (!document.hidden) next(0); });
  })();

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

  /* ---------- Founding applications: open, closed or off ----------
     Decision (8 Nov 2026): applications close at a deadline; there is no seat count. The platform's
     public endpoint (contract: seg-audit docs/api/founding-applications.md):
       200 {open:true,  deadline}  open until the deadline
       200 {open:false, deadline}  the deadline passed: applications closed
       200 {open:false}            the offer is switched off
     The older answer {open, total, left} works too: only `open` and an optional `deadline` are read;
     without a deadline the one from site.config applies (data-founding-deadline). Past the deadline
     by this browser's clock the state is 'closed' as well.
     anything else / network / CORS failure: the last good answer this browser saw (localStorage),
     else site.config's deadline, quietly.
     States: open | closed | off, on <html data-seats-state>. [data-seats-hide="off closed"] hides an
     element in those states, [data-seats-show="closed"] shows it only then. A platform deadline is
     written into every [data-close="day|month|time"] span in Cairo time, whatever its UTC offset.
     apply.js reports a 410 (applications closed) with a 'mft:founding-closed' event. */
  (function () {
    var me = document.querySelector('script[data-seats-api]');
    if (!me) return;
    var api = me.getAttribute('data-seats-api');
    // v2: the answer is now {open, deadline}; the old 'mft-seats' cache held seat counts.
    var KEY = 'mft-founding-v2', TTL = 60 * 1000;
    var MONTHS = (me.getAttribute('data-founding-months') || '').split('|');
    var built = { open: true, deadline: me.getAttribute('data-founding-deadline') || '', at: 0 };
    var timer = null;
    try { window.localStorage.removeItem('mft-seats'); window.sessionStorage.removeItem('mft-seats'); } catch (e) { /* storage blocked */ }
    function read(store) { try { return JSON.parse(window[store].getItem(KEY) || 'null'); } catch (e) { return null; } }
    function write(store, v) { try { window[store].setItem(KEY, JSON.stringify(v)); } catch (e) { /* storage blocked */ } }
    function valid(d) { return d && typeof d.open === 'boolean'; }
    function when(iso) { var t = Date.parse(iso || ''); return isNaN(t) ? null : t; }

    function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }
    // The deadline as Cairo wall-clock parts, e.g. 2026-11-30T21:59:59+00:00 → 30, November, 23:59.
    function cairo(t) {
      var o = {};
      try {
        new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
          .formatToParts(new Date(t)).forEach(function (p) { o[p.type] = p.value; });
      } catch (e) { return null; }
      if (!o.day || !o.month || !MONTHS[+o.month - 1]) return null;
      return { day: String(+o.day), month: MONTHS[+o.month - 1], time: ('0' + (+o.hour % 24)).slice(-2) + ':' + o.minute };
    }
    // d = {open, deadline}: the platform's answer, or the fallback.
    function apply(d, fromPlatform) {
      var given = when(d.deadline), end = given !== null ? given : when(built.deadline);
      var state = !d.open ? (given !== null ? 'closed' : 'off') : end !== null && Date.now() >= end ? 'closed' : 'open';
      document.documentElement.setAttribute('data-seats-state', state);
      if (given !== null) {
        var c = cairo(given);
        if (c) each('[data-close]', function (el) { var k = el.getAttribute('data-close'); if (c[k]) el.textContent = c[k]; });
      }
      each('[data-seats-hide]', function (el) { el.hidden = el.getAttribute('data-seats-hide').split(' ').indexOf(state) !== -1; });
      each('[data-seats-show]', function (el) { el.hidden = el.getAttribute('data-seats-show').split(' ').indexOf(state) === -1; });
      // Still open with the deadline less than a day away: flip to closed at the deadline itself.
      if (timer) clearTimeout(timer);
      if (state === 'open' && end !== null && end - Date.now() < 864e5) timer = setTimeout(function () { apply(d, fromPlatform); }, end - Date.now() + 1000);
      try { document.dispatchEvent(new CustomEvent('mft:seats', { detail: { state: state, deadline: given !== null ? d.deadline : built.deadline, stale: !fromPlatform } })); } catch (e) { /* old browser */ }
    }
    function fallback() {
      var last = read('localStorage');
      apply(valid(last) ? last : built, false);
    }
    // apply.js: the platform answered 410 (closed) to an application.
    document.addEventListener('mft:founding-closed', function (e) {
      var dl = e.detail && e.detail.deadline;
      apply({ open: false, deadline: when(dl) !== null ? dl : built.deadline }, true);
    });

    var cached = read('sessionStorage');
    if (valid(cached) && Date.now() - cached.at < TTL) { apply(cached, true); return; }
    if (!window.fetch) { fallback(); return; }
    var ctl = window.AbortController ? new AbortController() : null;
    var abort = setTimeout(function () { if (ctl) ctl.abort(); }, 6000);
    fetch(api, { credentials: 'omit', cache: 'no-store', signal: ctl ? ctl.signal : undefined })
      .then(function (r) { if (r.status !== 200) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (d) {
        if (!valid(d)) throw new Error('bad body');
        d = { open: d.open, deadline: typeof d.deadline === 'string' ? d.deadline : '', at: Date.now() };
        write('sessionStorage', d);
        write('localStorage', d);
        apply(d, true);
      })
      .catch(fallback)
      .then(function () { clearTimeout(abort); });
  })();

  /* ---------- Lead form ---------- */
  var form = document.getElementById('lead-form');
  if (!form) return;

  var status = form.querySelector('.form-status');
  var endpoint = form.getAttribute('data-endpoint') || '';
  var mode = form.getAttribute('data-mode') || 'function';
  var SERVICE_LABELS = {
    'odoo-erp': 'Odoo ERP Solutions', 'tax-solutions': 'Innovative Tax Solutions', 'internal-audit': 'Internal Audit', 'virtual-cfo': 'Virtual CFO',
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
        // Delivery not verified (opaque Odoo route): never claim "received"; point to the direct
        // channels and keep what the visitor typed, so they can copy it into WhatsApp or email.
        var unverified = status.getAttribute('data-unverified');
        if (unverified) { setStatus('info', unverified); status.setAttribute('tabindex', '-1'); status.focus(); return; }
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
