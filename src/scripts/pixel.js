/* MFT website — ad pixels + cookie notice with opt-out (CEO, 4 Nov 2026). The pixels load with the
   page; a small, non-blocking bar (#consent) tells first-time visitors and offers "Opt out of
   tracking". Opting out stops the pixels for that visitor and is kept for 12 months in localStorage,
   so they never load again in that browser; "Tracking settings" ([data-consent-open]) reopens the bar.
   Stored choice: 'ack' (saw the notice, tracking on) or 'denied' (opted out).
   IDs come from site.config.js → analytics, rendered onto this script tag as data attributes.
   Pixels load only on the production hosts (data-hosts), so local and preview builds send nothing.
     PageView  every page unless opted out (Meta) / page() (TikTok)
     Lead      click on a [data-track="lead"] CTA: the free trial-balance check (Meta "Lead",
               TikTok "ClickButton"), unless opted out
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
  var loaded = false, optedOut = false;

  /* ---------- Stored choice ---------- */
  function getChoice() {
    try {
      var c = JSON.parse(window.localStorage.getItem(KEY) || 'null');
      if (c && Date.now() - c.t < MAX_AGE) {
        if (c.v === 'denied') return 'denied';
        if (c.v === 'ack' || c.v === 'granted') return 'ack'; // 'granted' = the short-lived opt-in version
      }
    } catch (e) { /* storage blocked: show the notice again; an opt-out lasts for this page only */ }
    return null;
  }
  function setChoice(v) {
    try { window.localStorage.setItem(KEY, JSON.stringify({ v: v, t: Date.now() })); } catch (e) { /* keep for this page only */ }
  }

  /* ---------- Pixels (standard base code, as a file instead of inline) ---------- */
  function loadPixels() {
    optedOut = false;
    if (!onHost) return;
    if (loaded) { if (window.fbq) window.fbq('consent', 'grant'); if (window.ttq && window.ttq.grantConsent) window.ttq.grantConsent(); return; }
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

  /* Opt-out: stop the pixels on this page and delete their first-party cookies. */
  function revoke() {
    optedOut = true;
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

  /* ---------- Notice bar ---------- */
  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  var choice = getChoice();
  if (choice !== 'denied') loadPixels();
  else optedOut = true;
  ready(function () {
    var bar = document.getElementById('consent');
    var sync = function () {
      if (!bar) return;
      var off = optedOut;
      bar.querySelector('[data-consent-msg="on"]').hidden = off;
      bar.querySelector('[data-consent-msg="off"]').hidden = !off;
      bar.querySelector('[data-consent="denied"]').hidden = off;
      bar.querySelector('[data-consent="granted"]').hidden = !off;
    };
    var show = function () { if (bar) { sync(); bar.hidden = false; } };
    if (!choice) show();

    document.addEventListener('click', function (e) {
      var pick = e.target.closest && e.target.closest('[data-consent]');
      if (pick) {
        var v = pick.getAttribute('data-consent');
        if (v === 'denied') { setChoice('denied'); revoke(); sync(); return; } // stays open to show it took effect
        if (v === 'granted') { setChoice('ack'); loadPixels(); }
        if (v === 'ack') setChoice(optedOut ? 'denied' : 'ack');
        if (bar) bar.hidden = true;
        return;
      }
      if (e.target.closest && e.target.closest('[data-consent-open]')) { e.preventDefault(); show(); }
    });
  });

  /* ---------- Lead: the free-check CTA (only while the pixels run, i.e. not opted out).
     Same-tab clicks wait a moment so the event leaves before the page does. ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-track="lead"]');
    if (!a || !loaded || optedOut) return;
    if (window.fbq) window.fbq('track', 'Lead', { content_name: 'free-trial-balance-check' });
    if (window.ttq && tiktokId) window.ttq.track('ClickButton', { content_name: 'free-trial-balance-check' });
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank') return;
    e.preventDefault();
    var href = a.href;
    setTimeout(function () { window.location.href = href; }, 300);
  });
})();
