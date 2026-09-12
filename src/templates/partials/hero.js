// Home hero. Variant A = trust-strip hero (primary, approved). Variant B =
// split-screen dashboard preview (approved alternative). Switch in site.config.js.
const { t, esc, plain, btn } = require('../html');

function heroA(ctx) {
  const h = ctx.c.home.hero;
  const trust = h.trust.map((b) => `<li class="badge"><span class="dot" aria-hidden="true"></span><span class="badge-label">${t(b)}</span></li>`).join('');
  return `<section class="hero hero-a" aria-labelledby="hero-title">
  <div class="container">
    <div class="hero-inner">
      <p class="eyebrow">${t(h.eyebrow)}</p>
      <h1 id="hero-title" class="display">${t(h.headline)}</h1>
      <p class="subhead">${t(h.subhead)}</p>
      <div class="cta-row">
        ${btn(ctx, h.cta, 'btn btn-primary btn-lg')}
        ${h.secondary ? btn(ctx, h.secondary, 'btn btn-link') : ''}
      </div>
    </div>
    <ul class="trust-strip" aria-label="${esc(plain(ctx.c.home.proof.eyebrow))}">${trust}</ul>
  </div>
</section>`;
}

function heroB(ctx) {
  const h = ctx.c.home.heroB;
  const d = h.dashboard;
  const num = (v) => {
    // "$482K" → prefix "$", value 482, suffix "K"; "18.4%" → 18.4 + "%"
    const m = String(v).match(/^([^0-9]*)([0-9][0-9.,]*)(.*)$/);
    if (!m) return `<span class="kpi-value lat">${esc(v)}</span>`;
    return `<span class="lat">${esc(m[1])}<span class="count" data-count="${esc(m[2].replace(/,/g, ''))}" data-decimals="${(m[2].split('.')[1] || '').length}">${esc(m[2])}</span>${esc(m[3])}</span>`;
  };
  const kpis = d.kpis
    .map(
      (k, i) => `<div class="kpi" style="--i:${i}"><div class="kpi-label">${t(k.label)}</div><div class="kpi-value${k.up ? ' up' : ''}">${num(k.value)}</div></div>`
    )
    .join('');
  const bars = d.bars
    .map((v, i) => `<div class="bar${i === 3 || i === 5 ? ' accent' : ''}" style="height:${v}%;--i:${i}"></div>`)
    .join('');
  const findings = (d.findings || [])
    .map((f, i) => `<li style="--i:${i}"><span class="dot" aria-hidden="true"></span><span>${t(f.text)}</span><span class="finding-tag">${t(f.tag)}</span></li>`)
    .join('');
  const trust = ctx.c.home.hero.trust
    .slice(0, 4)
    .map((b, i) => {
      const m = String(b).match(/^\{lat\}(\d+)\+\{\/lat\}(.*)$|^(\d+)\+(.*)$/);
      if (m) {
        const n = m[1] || m[3], rest = m[2] || m[4];
        return `<li class="badge" style="--i:${i}"><span class="dot" aria-hidden="true"></span><span class="badge-label"><span class="lat"><span class="count" data-count="${n}">${n}</span>+</span>${t(rest)}</span></li>`;
      }
      return `<li class="badge" style="--i:${i}"><span class="dot" aria-hidden="true"></span><span class="badge-label">${t(b)}</span></li>`;
    })
    .join('');
  return `<section class="hero hero-b" aria-labelledby="hero-title">
  <div class="hero-b-left">
    <div class="hero-inner">
      <p class="eyebrow rise" style="--i:0">${t(h.eyebrow)}</p>
      <h1 id="hero-title" class="display rise" style="--i:1">${t(h.headline)}</h1>
      <p class="subhead rise" style="--i:2">${t(h.subhead)}</p>
      <div class="cta-row rise" style="--i:3">${btn(ctx, h.cta, 'btn btn-primary btn-lg')}${btn(ctx, ctx.c.home.hero.secondary, 'btn btn-link btn-link-light')}</div>
      <ul class="hero-trust rise" style="--i:4" aria-label="${esc(plain(ctx.c.home.proof.eyebrow))}">${trust}</ul>
    </div>
  </div>
  <div class="hero-b-right">
    <div class="dashboard-card rise" style="--i:2" role="img" aria-label="${esc(plain(d.title))} — ${esc(plain(d.caption))}">
      <div class="dc-header"><div class="dc-title">${t(d.title)}</div><div class="dc-badge"><span class="pulse" aria-hidden="true"></span>${t(d.badge)}</div></div>
      <div class="kpi-row">${kpis}</div>
      <div class="chart-area"><div class="bars" aria-hidden="true">${bars}</div><div class="chart-caption">${t(d.caption)}</div></div>
      ${findings ? `<div class="findings"><div class="findings-title">${t(d.findingsTitle)}</div><ul>${findings}</ul></div>` : ''}
    </div>
  </div>
</section>`;
}

module.exports = { heroA, heroB };
