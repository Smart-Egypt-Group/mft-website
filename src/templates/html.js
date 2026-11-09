// Tiny HTML helpers shared by all templates. No dependencies.

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Text with inline tokens:
//   {lat}…{/lat}       Latin / digits inside Arabic → isolated LTR span (bidi fix)
//   {accent}…{/accent} brand accent (cyan on navy, deep teal on white)
//   \n                 line break
function t(s) {
  return esc(s)
    .replace(/\{lat\}([\s\S]*?)\{\/lat\}/g, '<span class="lat">$1</span>')
    .replace(/\{accent\}([\s\S]*?)\{\/accent\}/g, '<span class="accent">$1</span>')
    .replace(/\n/g, '<br>');
}

// Plain text (tokens stripped) — for <title>, meta, alt, aria.
function plain(s) {
  return String(s == null ? '' : s)
    .replace(/\{\/?(lat|accent)\}/g, '')
    .replace(/\n/g, ' ');
}

// Resolve a content href to a site path for the current language.
//   'services/'         → /en/services/
//   'industries/#x'     → /en/industries/#x
//   'https://…', '#…', 'mailto:', 'tel:' → unchanged
function url(ctx, href) {
  if (!href) return '#';
  if (/^(https?:|mailto:|tel:|#|\/)/.test(href)) return href;
  return `/${ctx.lang}/${href}`;
}

function attrs(obj) {
  return Object.entries(obj)
    .filter(([, v]) => v !== false && v != null)
    .map(([k, v]) => (v === true ? ` ${k}` : ` ${k}="${esc(v)}"`))
    .join('');
}

// Elements
const link = (ctx, href, label, cls, extra = {}) =>
  `<a${attrs({ class: cls, href: url(ctx, href), ...extra })}>${t(label)}</a>`;

const btn = (ctx, item, cls = 'btn btn-primary') => link(ctx, item.href, item.label, cls);

const eyebrow = (s, tag = 'p') => `<${tag} class="eyebrow">${t(s)}</${tag}>`;

const sectionHead = (o, level = 2) =>
  `<div class="section-head">${o.eyebrow ? eyebrow(o.eyebrow) : ''}<h${level}>${t(o.title)}</h${level}>${
    o.intro || o.body ? `<p class="lead">${t(o.intro || o.body)}</p>` : ''
  }</div>`;

// Visible marker on sections whose content is still a pending decision.
const phTag = (ctx) =>
  ctx.markPlaceholders ? `<span class="ph-tag" role="note">${t(ctx.c.ui.placeholderTag)}</span>` : '';

const pad2 = (n) => String(n).padStart(2, '0');

// Founding Members: applications close at site.config → founding.closesAt (decision, 8 Nov 2026: a
// deadline instead of 50 seats, so no seat number anywhere).
// The close date: {closeDay} {closeMonth} {closeTime} from site.config → founding.closesAt (its own
// offset, i.e. Cairo time), so the date is written once, in the config.
const MONTHS = {
  ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};
const closeParts = (ctx) => {
  const m = String((ctx.config.founding || {}).closesAt || '').match(/^\d{4}-(\d{2})-(\d{2})T(\d{2}:\d{2})/);
  return m ? { day: String(+m[2]), month: (MONTHS[ctx.lang] || MONTHS.en)[+m[1] - 1], time: m[3] } : null;
};
// Plain text: the close-date tokens resolved (titles, meta, JSON-LD, messages for the scripts).
const seats = (ctx, s) => {
  const p = closeParts(ctx);
  if (!p) return String(s);
  return String(s).replace(/\{closeDay\}/g, p.day).replace(/\{closeMonth\}/g, p.month).replace(/\{closeTime\}/g, p.time);
};
// HTML: every close-date part is a [data-close] span, so main.js can rewrite it from the platform's
// own deadline (site.config → founding.api.seats) when that differs from the config. The
// server-rendered value is site.config → founding.closesAt, so the page reads right without JS.
const closeHtml = (ctx, s) => {
  const p = closeParts(ctx);
  if (!p) return t(s);
  const span = (k) => `<span data-close="${k}">${esc(p[k])}</span>`;
  return t(String(s).replace(/\{close(Day|Month|Time)\}/g, (m, k) => `\u0001${k.toLowerCase()}\u0002`))
    .replace(/\u0001(day|month|time)\u0002/g, (m, k) => span(k));
};
// The close-date panel in the founding hero. Open: "applications close <date>"; closed (main.js
// sets <html data-seats-state="closed"> past the deadline): "applications closed on <date>".
const windowPanel = (ctx, extra = '') => {
  const W = ctx.c.founding.hero.window;
  return `<div class="seat-panel close-panel${extra}" data-seats-hide="off">
      <p class="seat-caption" data-seats-hide="closed">${closeHtml(ctx, W.label)}</p>
      <p class="seat-caption" data-seats-show="closed" hidden>${closeHtml(ctx, W.closedLabel)}</p>
      <p class="close-date">${closeHtml(ctx, W.date)}</p>
      <p class="seat-caption">${closeHtml(ctx, W.time)}</p>
      <p class="seat-note" data-seats-hide="closed">${closeHtml(ctx, W.note)}</p>
    </div>`;
};
// Founding copy by key ('hero.headline'), tokens resolved.
const fm = (ctx, key) => seats(ctx, key.split('.').reduce((o, k) => o && o[k], ctx.c.founding));
// The same as fm, as HTML with live close-date spans.
const fmh = (ctx, key) => closeHtml(ctx, key.split('.').reduce((o, k) => o && o[k], ctx.c.founding));
// Launch CTA → app sign-up, tagged so the app can attribute it (see marketing/README.md → UTM).
const signupUrl = (ctx, content) =>
  `${ctx.config.founding.signup[ctx.lang]}?utm_source=website&utm_medium=owned&utm_campaign=founding-members-2026&utm_content=${encodeURIComponent(content)}`;

module.exports = { esc, t, plain, url, attrs, link, btn, eyebrow, sectionHead, phTag, pad2, MONTHS, seats, closeHtml, fm, fmh, windowPanel, signupUrl };
