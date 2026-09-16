/* Runs synchronously in <head> (tiny, same-origin) so motion classes exist BEFORE first paint:
   no content is ever painted and then hidden. Reduced-motion users get no motion class at all. */
(function () {
  var h = document.documentElement;
  try { if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; } catch (e) {}
  h.classList.add('js-motion');
  try {
    if (sessionStorage.getItem('mft-hero-seen')) h.classList.add('hero-seen');
    else sessionStorage.setItem('mft-hero-seen', '1');
  } catch (e) {}
})();
