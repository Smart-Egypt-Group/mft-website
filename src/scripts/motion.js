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
  html.classList.add('js-motion');

  // 2) The one reveal utility: opacity + a light vertical offset, starting just before the
  //    element enters the viewport. Vertical only, so RTL and LTR behave identically.
  function reveal(targets, opts) {
    opts = opts || {};
    var els = typeof targets === 'string' ? document.querySelectorAll(targets) : targets;
    Array.prototype.forEach.call(els, function (el, i) {
      if (el.closest('.hero')) return;                 // hero has its own load-time entrance (CSS)
      el.classList.add('reveal');
      var delay = parseFloat(el.style.getPropertyValue('--i') || 0) * (opts.stagger || 0.07);
      gsap.fromTo(el, { autoAlpha: 0, y: opts.y || 14 }, {
        autoAlpha: 1, y: 0, duration: opts.duration || 0.5, delay: delay, ease: 'power2.out', overwrite: 'auto', clearProps: 'transform',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true,
          onEnter: function () { el.classList.add('in'); Array.prototype.forEach.call(el.querySelectorAll('[data-count]'), countUp); if (el.hasAttribute('data-count')) countUp(el); } }
      });
    });
  }
  window.mftReveal = reveal;

  // 3) Wrap the main sections: section heads, grids, index rows, definition rows, cards, chips, FAQ items.
  var scope = 'main .section';
  reveal(scope + ' .section-head', { y: 12 });
  reveal(scope + ' .grid > *, ' + scope + ' .index-row, ' + scope + ' .deflist-row, ' + scope + ' .cases > *, ' + scope + ' .testimonials > *, ' +
         scope + ' .plans > *, ' + scope + ' .agents > *, ' + scope + ' .pillars > *, ' + scope + ' .badge-grid > *, ' + scope + ' .chip-row > *, ' +
         scope + ' .milestone, ' + scope + ' .faq-item, ' + scope + ' .latest-facts > *, ' + scope + ' .num-list > li, ' + scope + ' .see-also-list > li');
  // Give siblings a stagger index if the template did not set one.
  Array.prototype.forEach.call(document.querySelectorAll('.reveal'), function (el) {
    if (!el.style.getPropertyValue('--i') && el.parentElement) {
      el.style.setProperty('--i', String(Math.min(Array.prototype.indexOf.call(el.parentElement.children, el), 8)));
    }
  });

  // Drawn elements (timeline rail, governance flow, hero trust counters, facts band): class-driven CSS transitions, fired once.
  Array.prototype.forEach.call(document.querySelectorAll('.timeline, .flow-wrap, .facts, .hero-trust, .dashboard-card, .latest-facts'), function (el) {
    ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: function () {
      el.classList.add('in');
      Array.prototype.forEach.call(el.querySelectorAll('[data-count]'), countUp);
    } });
  });

  // Insurance: anything still hidden after 5 s is shown (print, odd viewports, trigger never fires).
  setTimeout(function () {
    Array.prototype.forEach.call(document.querySelectorAll('.reveal:not(.in), .timeline:not(.in), .flow-wrap:not(.in)'), function (el) {
      el.classList.add('in'); gsap.set(el, { autoAlpha: 1, y: 0 }); Array.prototype.forEach.call(el.querySelectorAll('[data-count]'), countUp);
    });
  }, 5000);
  window.addEventListener('beforeprint', showAll);
})();
