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

// Founding Members: {total}, and only with the counter on {filled} and {left}, come from
// site.config → founding.
// The close window: {closeDay} {closeMonth} {closeTime} from site.config → founding.closesAt (its own
// offset, i.e. Cairo time), so the date is written once, in the config.
const MONTHS = {
  ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};
const closeTokens = (ctx, s) => {
  const m = String((ctx.config.founding || {}).closesAt || '').match(/^\d{4}-(\d{2})-(\d{2})T(\d{2}:\d{2})/);
  if (!m) return String(s);
  return String(s).replace(/\{closeDay\}/g, String(+m[2])).replace(/\{closeMonth\}/g, (MONTHS[ctx.lang] || MONTHS.en)[+m[1] - 1]).replace(/\{closeTime\}/g, m[3]);
};
const seats = (ctx, s) => {
  const F = ctx.config.founding, filled = F.showCount ? F.filled : 0;
  return closeTokens(ctx, s).replace(/\{left\}/g, F.total - filled).replace(/\{filled\}/g, filled).replace(/\{total\}/g, F.total);
};
// The close-window panel shown in place of the seats panel while the counter is off.
const windowPanel = (ctx, extra = '') => {
  const W = ctx.c.founding.hero.window;
  return `<div class="seat-panel close-panel${extra}">
      <p class="seat-caption">${t(seats(ctx, W.label))}</p>
      <p class="close-date">${t(seats(ctx, W.date))}</p>
      <p class="seat-caption">${t(seats(ctx, W.time))}</p>
      <p class="seat-note">${t(seats(ctx, W.note))}</p>
    </div>`;
};
// Founding copy by key ('hero.headline'): the counter version from content → founding.counter when
// site.config → founding.showCount is on, the count-free version otherwise. Tokens resolved.
const fm = (ctx, key) => {
  const P = ctx.c.founding, C = P.counter || {};
  const v = ctx.config.founding.showCount && C[key] != null ? C[key] : key.split('.').reduce((o, k) => o && o[k], P);
  return seats(ctx, v);
};
// The same as fm, as HTML: every seat number is a [data-seats] span, so main.js can update it from
// the platform's live counter (site.config → founding.api.seats). Server-rendered value = the last
// known count from site.config, so the page reads right without JS or if the counter is down.
const fmh = (ctx, key) => {
  const P = ctx.c.founding, C = P.counter || {};
  const v = ctx.config.founding.showCount && C[key] != null ? C[key] : key.split('.').reduce((o, k) => o && o[k], P);
  return seatsHtml(ctx, v);
};
const seatsHtml = (ctx, s) => {
  const F = ctx.config.founding, filled = F.showCount ? F.filled : 0;
  const span = (k, n) => `<span data-seats="${k}">${n}</span>`;
  return t(closeTokens(ctx, s).replace(/\{(left|filled|total)\}/g, '\u0001$1\u0002'))
    .replace(/\u0001left\u0002/g, span('left', F.total - filled))
    .replace(/\u0001filled\u0002/g, span('filled', filled))
    .replace(/\u0001total\u0002/g, span('total', F.total));
};
// Launch CTA → app sign-up, tagged so the app can attribute it (see marketing/README.md → UTM).
const signupUrl = (ctx, content) =>
  `${ctx.config.founding.signup[ctx.lang]}?utm_source=website&utm_medium=owned&utm_campaign=founding-members-2026&utm_content=${encodeURIComponent(content)}`;

module.exports = { esc, t, plain, url, attrs, link, btn, eyebrow, sectionHead, phTag, pad2, seats, fm, fmh, seatsHtml, windowPanel, signupUrl };
