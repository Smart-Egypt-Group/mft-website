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

module.exports = { esc, t, plain, url, attrs, link, btn, eyebrow, sectionHead, phTag, pad2 };
