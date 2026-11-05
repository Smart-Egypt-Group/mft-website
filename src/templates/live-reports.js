// Live count of reports generated on the SEG platform (CEO, 5 Nov 2026). It replaces the fixed
// «+500 تقرير» claim. Content marks an item with { live: 'reports', text: '…{n}…' } (or a proof
// fact with { live: 'reports', label }); this module renders it with the last known number from
// site.config → reportsCounter, and main.js refreshes it from the platform endpoint.
// No last known number and no endpoint answer → the item stays hidden: nothing is claimed.
const { t, esc } = require('./html');

const isLive = (x) => !!x && typeof x === 'object' && x.live === 'reports';

function last(ctx) {
  const R = ctx.config.reportsCounter || {};
  return Number.isFinite(R.lastKnown) && R.lastKnown > 0 ? R.lastKnown : null;
}

const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// Attributes for the element that holds the count (li.badge, li.fact).
function liveAttrs(ctx) {
  const R = ctx.config.reportsCounter || {};
  const n = last(ctx);
  return ` data-reports-live data-reports-api="${esc(R.api || '')}" data-reports-poll="${Number(R.pollSeconds) || 45}" data-reports-last="${n || ''}" data-reports-asof="${esc(R.asOf || '')}"${n ? '' : ' hidden'}`;
}

const countSpan = (ctx) => `<span class="lat" data-reports="count">${last(ctx) ? fmt(last(ctx)) : ''}</span>`;

const liveText = (ctx, x) => t(x.text).replace('{n}', countSpan(ctx));

module.exports = { isLive, liveAttrs, countSpan, liveText };
