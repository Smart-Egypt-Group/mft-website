/* MFT website — ad pixels (CEO, 4 Nov 2026). The pixels load with the page on the production hosts,
   on the basis of the disclosure in the privacy notice (content/<lang>.js → privacy); consent is part
   of accepting that notice and the terms (forms here, sign-up on the SEG platform). No banner, no opt-out UI.
   The right to object is exercised by email (privacy@seg-audit.com), as the notice says.
   IDs come from site.config.js → analytics, rendered onto this script tag as data attributes.
     PageView  every page (Meta) / page() (TikTok)
     Lead      click on a [data-track="lead"] CTA: the free trial-balance check (Meta "Lead",
               TikTok "ClickButton"); and a founding application received (apply.js → 'mft:lead',
               Meta "Lead" content_name founding-application, TikTok "SubmitForm")
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
  var metaId = me.getAttribute('data-meta-pixel') || '';
  var tiktokId = me.getAttribute('data-tiktok-pixel') || '';

  /* ---------- Meta Pixel (standard base code, as a file instead of inline) ---------- */
  if (metaId) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('set', 'autoConfig', false, metaId); // no automatic button/form scraping: only the events below
    window.fbq('init', metaId);
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

  /* ---------- Lead: the free-check CTA. Same-tab clicks wait a moment so the event leaves before the page does ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-track="lead"]');
    if (!a) return;
    if (window.fbq) window.fbq('track', 'Lead', { content_name: 'free-trial-balance-check' });
    if (window.ttq && tiktokId) window.ttq.track('ClickButton', { content_name: 'free-trial-balance-check' });
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank') return;
    e.preventDefault();
    var href = a.href;
    setTimeout(function () { window.location.href = href; }, 300);
  });
})();
