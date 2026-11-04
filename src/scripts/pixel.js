/* MFT website — cookie consent + ad pixels (CEO, 4 Nov 2026). Opt-in: no ad pixel loads until the
   visitor chooses "Accept" in the banner (#consent). The choice is kept for 12 months in localStorage
   (essential, no consent needed); "Cookie settings" ([data-consent-open]) reopens the banner.
   IDs come from site.config.js → analytics, rendered onto this script tag as data attributes.
   Pixels load only on the production hosts (data-hosts), so local and preview builds send nothing.
     PageView  every page, after consent (Meta) / page() (TikTok)
     Lead      click on a [data-track="lead"] CTA: the free trial-balance check (Meta "Lead",
               TikTok "ClickButton"), after consent
   Disclosed in the privacy notice (content/<lang>.js → privacy). */
(function () {
  'use strict';
  var me = document.currentScript;
  if (!me) return;
  var hosts = (me.getAttribute('data-hosts') || '').split(' ');
  var onHost = hosts.indexOf(window.location.hostname) !== -1;
  var metaId = me.getAttribute('data-meta-pixel') || '';
  var tiktokId = me.getAttribute('data-tiktok-pixel') || '';
  var KEY = 'mft-consent', MAX_AGE = 365 * 24 * 3600 * 1000;
  var loaded = false;

  /* ---------- Stored choice ---------- */
  function getChoice() {
    try {
      var c = JSON.parse(window.localStorage.getItem(KEY) || 'null');
      if (c && (c.v === 'granted' || c.v === 'denied') && Date.now() - c.t < MAX_AGE) return c.v;
    } catch (e) { /* storage blocked: ask again, load nothing */ }
    return null;
  }
  function setChoice(v) {
    try { window.localStorage.setItem(KEY, JSON.stringify({ v: v, t: Date.now() })); } catch (e) { /* keep for this page only */ }
  }

  /* ---------- Pixels (standard base code, as a file instead of inline) ---------- */
  function loadPixels() {
    if (loaded || !onHost) return;
    loaded = true;
    if (metaId) {
      !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
        t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
      }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('set', 'autoConfig', false, metaId); // no automatic button/form scraping: only the events below
      window.fbq('consent', 'grant');
      window.fbq('init', metaId);
      window.fbq('track', 'PageView');
    }
    /* TikTok Pixel: inactive until site.config → analytics.tiktokPixelId is set */
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
  }

  /* Withdrawal: stop the pixels on this page and delete their first-party cookies. */
  function revoke() {
    if (window.fbq) window.fbq('consent', 'revoke');
    if (window.ttq && window.ttq.revokeConsent) window.ttq.revokeConsent();
    var host = window.location.hostname, base = host.replace(/^www\./, '');
    ['_fbp', '_fbc', '_ttp'].forEach(function (name) {
      [host, '.' + base, base].forEach(function (d) {
        document.cookie = name + '=; Max-Age=0; path=/; domain=' + d;
      });
      document.cookie = name + '=; Max-Age=0; path=/';
    });
  }

  /* ---------- Banner ---------- */
  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function () {
    var banner = document.getElementById('consent');
    var show = function () { if (banner) { banner.hidden = false; var b = banner.querySelector('[data-consent="denied"]'); if (b) b.focus({ preventScroll: true }); } };
    var choice = getChoice();
    if (choice === 'granted') loadPixels();
    else if (!choice) show();

    document.addEventListener('click', function (e) {
      var pick = e.target.closest && e.target.closest('[data-consent]');
      if (pick) {
        var v = pick.getAttribute('data-consent');
        var was = getChoice();
        setChoice(v);
        if (banner) banner.hidden = true;
        if (v === 'granted') loadPixels();
        else if (was === 'granted' || loaded) revoke();
        return;
      }
      if (e.target.closest && e.target.closest('[data-consent-open]')) { e.preventDefault(); show(); }
    });
  });

  /* ---------- Lead: the free-check CTA (only once the pixels are loaded, i.e. after consent).
     Same-tab clicks wait a moment so the event leaves before the page does. ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-track="lead"]');
    if (!a || !loaded) return;
    if (window.fbq) window.fbq('track', 'Lead', { content_name: 'free-trial-balance-check' });
    if (window.ttq && tiktokId) window.ttq.track('ClickButton', { content_name: 'free-trial-balance-check' });
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank') return;
    e.preventDefault();
    var href = a.href;
    setTimeout(function () { window.location.href = href; }, 300);
  });
})();
