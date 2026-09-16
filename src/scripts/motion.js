/* MFT website motion: GSAP + ScrollTrigger scroll reveals (Ahmed's decision, 15 Sep 2026).
   One reusable utility, registered once, loaded only on pages that opt in (layout.js).
   Hover states are CSS transitions only (main.css); nothing here touches them.
   Fallbacks: if GSAP is missing, or the user prefers reduced motion, every element is shown in
   its final state and no ScrollTrigger is created. */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var gsap = window.gsap, ScrollTrigger = window.ScrollTrigger;
  var html = document.documentElement;

  function countUp(el) {
    if (el.getAttribute('data-counted')) return;
    el.setAttribute('data-counted', '1');
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    if (isNaN(target)) return;
    var fmt = function (v) { var s = v.toFixed(decimals); return decimals ? s : s.replace(/\B(?=(\d{3})+(?!\d))/g, ','); };
    if (reduce || !gsap) { el.textContent = fmt(target); return; }
    var o = { v: 0 };
    gsap.to(o, { v: target, duration: 1.1, ease: 'power3.out', onUpdate: function () { el.textContent = fmt(o.v); }, onComplete: function () { el.textContent = fmt(target); } });
  }
  window.mftCountUp = countUp;

  function showAll() {
    html.classList.remove('js-motion');
    Array.prototype.forEach.call(document.querySelectorAll('.reveal, .timeline, .flow-wrap'), function (el) { el.classList.add('in'); });
    Array.prototype.forEach.call(document.querySelectorAll('[data-count]'), countUp);
  }

  if (reduce || !gsap || !ScrollTrigger) { showAll(); return; }

  // 1) Register once, for the whole site.
  gsap.registerPlugin(ScrollTrigger);
  // ignoreMobileResize: the mobile URL bar showing/hiding must not force a full refresh mid-scroll.
  // limitCallbacks: fire enter/leave callbacks only when their state actually changes.
  ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });
  html.classList.add('js-motion');   // normally already set by pre.js before first paint

  // 2) The one reveal utility: opacity + a light vertical offset for content that is still BELOW the
  //    viewport when the script runs. Anything already visible (fully or partly) is left exactly as
  //    painted, so a page load or a navigation never flickers. Vertical only, so RTL == LTR.
  var vh = window.innerHeight;
  function reveal(targets, opts) {
    opts = opts || {};
    var els = typeof targets === 'string' ? document.querySelectorAll(targets) : targets;
    Array.prototype.forEach.call(els, function (el) {
      if (el.closest('.hero')) return;                 // hero has its own load-time entrance (CSS)
      var top = el.getBoundingClientRect().top;
      if (top < vh) { el.classList.add('in'); Array.prototype.forEach.call(el.querySelectorAll('[data-count]'), countUp); return; }
      el.classList.add('reveal');
      var idx = parseFloat(el.style.getPropertyValue('--i') || 0);
      var delay = Math.min(idx, 2) * (opts.stagger || 0.04);
      gsap.set(el, { autoAlpha: 0, y: opts.y || 10 });
      // Start before the element enters (160px below the viewport) so it is already fading in when it
      // arrives; when the user is scrolling fast, show it at once so content never lags the scroll.
      ScrollTrigger.create({ trigger: el, start: 'top bottom+=160', once: true, onEnter: function (self) {
        var fast = Math.abs(self.getVelocity()) > 1200;
        if (fast) { gsap.set(el, { autoAlpha: 1, y: 0, clearProps: 'transform' }); }
        else gsap.to(el, { autoAlpha: 1, y: 0, duration: opts.duration || 0.35, delay: delay, ease: 'power2.out', overwrite: 'auto', clearProps: 'transform' });
        el.classList.add('in');
        Array.prototype.forEach.call(el.querySelectorAll('[data-count]'), countUp);
        if (el.hasAttribute('data-count')) countUp(el);
      } });
    });
  }
  window.mftReveal = reveal;

  // 3) Wrap the main sections: section heads, grids, index rows, definition rows, cards, chips, FAQ items.
  //    Sibling index for the small stagger is assigned first, so the utility can read it.
  var scope = 'main .section';
  var sel = scope + ' .section-head, ' + scope + ' .grid > *, ' + scope + ' .index-row, ' + scope + ' .deflist-row, ' + scope + ' .cases > *, ' +
            scope + ' .testimonials > *, ' + scope + ' .plans > *, ' + scope + ' .agents > *, ' + scope + ' .pillars > *, ' + scope + ' .badge-grid > *, ' +
            scope + ' .chip-row > *, ' + scope + ' .milestone, ' + scope + ' .faq-item, ' + scope + ' .latest-facts > *, ' + scope + ' .num-list > li, ' + scope + ' .see-also-list > li';
  Array.prototype.forEach.call(document.querySelectorAll(sel), function (el) {
    if (!el.style.getPropertyValue('--i') && el.parentElement) {
      el.style.setProperty('--i', String(Math.min(Array.prototype.indexOf.call(el.parentElement.children, el), 8)));
    }
  });
  reveal(sel);

  // Drawn elements (timeline rail, governance flow, hero trust counters, facts band): class-driven CSS transitions, fired once.
  Array.prototype.forEach.call(document.querySelectorAll('.timeline, .flow-wrap, .facts, .hero-trust, .dashboard-card, .latest-facts'), function (el) {
    if (el.getBoundingClientRect().top < vh) { el.classList.add('in'); Array.prototype.forEach.call(el.querySelectorAll('[data-count]'), countUp); return; }
    ScrollTrigger.create({ trigger: el, start: 'top bottom+=120', once: true, onEnter: function () {
      el.classList.add('in');
      Array.prototype.forEach.call(el.querySelectorAll('[data-count]'), countUp);
    } });
  });

  // A single jump (End key, anchor link, a hard flick on a short page) can pass a trigger's start and end in
  // one frame; limitCallbacks then suppresses onEnter. On scroll end, show anything at or above the viewport.
  function sweep() {
    var vh2 = window.innerHeight;
    Array.prototype.forEach.call(document.querySelectorAll('.reveal:not(.in), .timeline:not(.in), .flow-wrap:not(.in), .facts:not(.in), .hero-trust:not(.in), .dashboard-card:not(.in), .latest-facts:not(.in)'), function (el) {
      if (el.getBoundingClientRect().top >= vh2) return;
      el.classList.add('in');
      if (el.classList.contains('reveal')) gsap.set(el, { autoAlpha: 1, y: 0, clearProps: 'transform' });
      Array.prototype.forEach.call(el.querySelectorAll('[data-count]'), countUp);
      if (el.hasAttribute('data-count')) countUp(el);
    });
  }
  ScrollTrigger.addEventListener('scrollEnd', sweep);

  // Insurance: anything still hidden after 5 s is shown (print, odd viewports, trigger never fires).
  setTimeout(function () {
    Array.prototype.forEach.call(document.querySelectorAll('.reveal:not(.in), .timeline:not(.in), .flow-wrap:not(.in)'), function (el) {
      el.classList.add('in'); gsap.set(el, { autoAlpha: 1, y: 0 }); Array.prototype.forEach.call(el.querySelectorAll('[data-count]'), countUp);
    });
  }, 5000);
  window.addEventListener('beforeprint', showAll);
})();
