/* MFT website — ad pixels (CEO, 4 Nov 2026). The pixels load with the page on the production hosts,
   on the basis of the disclosure in the privacy notice (content/<lang>.js → privacy); consent is part
   of accepting that notice and the terms (forms here, sign-up on the SEG platform). No banner, no opt-out UI.
   The right to object is exercised by email (privacy@seg-audit.com), as the notice says.
   IDs come from site.config.js → analytics, rendered onto this script tag as data attributes.
     PageView  every page (Meta) / page() (TikTok)
     CTAClick  click on a [data-track="lead"] CTA: the free trial-balance check (Meta custom
               "CTAClick", TikTok "ClickButton"). A click is intent, not a conversion: it is NOT a
               Lead (11 Nov 2026) — the free-check Lead fires on the SEG platform after sign-up.
     Lead      a founding application received (apply.js → 'mft:lead',
               Meta "Lead" content_name founding-application, TikTok "SubmitForm")
     Contact   click on any WhatsApp link (wa.me) (Meta "Contact", TikTok "Contact"), 8 Nov 2026
   A browser that opted out under the short-lived notice bar (localStorage mft-consent = 'denied')
   stays opted out. */
(function () {
  'use strict';
  var me = document.currentScript;
  if (!me) return;
  var hosts = (me.getAttribute('data-hosts') || '').split(' ');
  if (hosts.indexOf(window.location.hostname) === -1) return;
  try {
    var c = JSON.parse(window.localStorage.getItem('mft-consent') || 'null');
    if (c && c.v === 'denied') return;
  } catch (e) { /* storage blocked: load as normal */ }
  /* data-meta-pixel may hold several space-separated IDs (business dataset + legacy pixel): each is
     initialised, and every fbq('track') below then reaches all of them. */
  var metaIds = (me.getAttribute('data-meta-pixel') || '').split(/\s+/).filter(Boolean);
  var tiktokId = me.getAttribute('data-tiktok-pixel') || '';

  /* ---------- fbc coverage (13 Nov 2026): Meta's click cookies, first-party, before the pixel.
     fbevents.js writes _fbc only after it loads and only for this host, so a visitor who moves on to the
     SEG platform (app.seg-audit.com) to sign up arrived there without it. Written here on the parent
     domain, from this landing's fbclid, in Meta's own format (fb.1.<ms>.<fbclid>), 90 days; the first
     landing of a click keeps its timestamp. Only where the pixel itself runs (the checks above). ---------- */
  function readCookie(n) {
    var m = document.cookie.match(new RegExp('(?:^|; )' + n + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : '';
  }
  function writeCookie(n, v) {
    var h = window.location.hostname, dom = /(^|\.)seg-audit\.com$/.test(h) ? '; Domain=.seg-audit.com' : '';
    document.cookie = n + '=' + v + '; Max-Age=' + (90 * 86400) + '; Path=/' + dom + '; SameSite=Lax' +
      (window.location.protocol === 'https:' ? '; Secure' : '');
  }
  if (metaIds.length) {
    try {
      var now = Date.now();
      var clk = new URLSearchParams(window.location.search).get('fbclid');
      if (clk && /^[A-Za-z0-9_-]{1,480}$/.test(clk)) {
        var have = /^fb\.\d\.\d{10,16}\.([A-Za-z0-9_-]+)$/.exec(readCookie('_fbc'));
        if (!have || have[1] !== clk) writeCookie('_fbc', 'fb.1.' + now + '.' + clk);
      }
      if (!/^fb\.\d\.\d{10,16}\.\d{1,32}$/.test(readCookie('_fbp'))) {
        writeCookie('_fbp', 'fb.1.' + now + '.' + Math.floor(Math.random() * 1e10));
      }
    } catch (err) { /* cookies blocked: the pixel runs as before */ }
  }

  /* ---------- Meta Pixel (standard base code, as a file instead of inline) ---------- */
  if (metaIds.length) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    metaIds.forEach(function (id) {
      window.fbq('set', 'autoConfig', false, id); // no automatic button/form scraping: only the events below
      window.fbq('init', id);
    });
    window.fbq('track', 'PageView');
  }

  /* ---------- TikTok Pixel (standard base code). Inactive until site.config → analytics.tiktokPixelId is set ---------- */
  if (tiktokId) {
    !function (w, d, t) {
      w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || [];
      ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie', 'holdConsent', 'revokeConsent', 'grantConsent'];
      ttq.setAndDefer = function (o, m) { o[m] = function () { o.push([m].concat(Array.prototype.slice.call(arguments, 0))); }; };
      for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.instance = function (id) { for (var e = ttq._i[id] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]); return e; };
      ttq.load = function (id, opts) {
        var r = 'https://analytics.tiktok.com/i18n/pixel/events.js';
        ttq._i = ttq._i || {}; ttq._i[id] = []; ttq._i[id]._u = r; ttq._t = ttq._t || {}; ttq._t[id] = +new Date(); ttq._o = ttq._o || {}; ttq._o[id] = opts || {};
        var s = d.createElement('script'); s.type = 'text/javascript'; s.async = !0; s.src = r + '?sdkid=' + id + '&lib=' + t;
        var f = d.getElementsByTagName('script')[0]; f.parentNode.insertBefore(s, f);
      };
      ttq.load(tiktokId);
      ttq.page();
    }(window, document, 'ttq');
  }

  /* ---------- Lead: a founding seat application received (202), fired by apply.js. Only the
     event name and this visit's UTMs: never what was typed in the form (privacy notice). ---------- */
  document.addEventListener('mft:lead', function (e) {
    var d = (e && e.detail) || {};
    var params = { content_name: d.name || 'founding-application', content_category: d.waitlist ? 'waitlist' : 'founding-seat' };
    try {
      var utm = JSON.parse(window.sessionStorage.getItem('mft-utm') || 'null');
      if (utm) ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (k) { if (utm[k]) params[k] = utm[k]; });
    } catch (err) { /* storage blocked */ }
    if (window.fbq) window.fbq('track', 'Lead', params);
    if (window.ttq && tiktokId) window.ttq.track('SubmitForm', { content_name: params.content_name });
  });

  /* ---------- Contact: a click on any WhatsApp link (wa.me). These open in a new tab, so no delay is needed.
     Only the fact of the click is sent, never the number or a message (privacy notice). ---------- */
  document.addEventListener('click', function (e) {
    var w = e.target.closest && e.target.closest('a[href^="https://wa.me/"]');
    if (!w) return;
    if (window.fbq) window.fbq('track', 'Contact', { content_name: 'whatsapp' });
    if (window.ttq && tiktokId) window.ttq.track('Contact', { content_name: 'whatsapp' });
  });

  /* ---------- CTAClick: the free-check CTA (intent only, not a Lead). Same-tab clicks wait a moment so the event leaves before the page does ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-track="lead"]');
    if (!a) return;
    if (window.fbq) window.fbq('trackCustom', 'CTAClick', { content_name: 'free-trial-balance-check' });
    if (window.ttq && tiktokId) window.ttq.track('ClickButton', { content_name: 'free-trial-balance-check' });
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank') return;
    e.preventDefault();
    var href = a.href;
    setTimeout(function () { window.location.href = href; }, 300);
  });
})();
