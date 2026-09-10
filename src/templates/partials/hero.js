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
  const kpis = d.kpis
    .map(
      (k) => `<div class="kpi"><div class="kpi-label">${t(k.label)}</div><div class="kpi-value lat${k.up ? ' up' : ''}">${esc(k.value)}</div></div>`
    )
    .join('');
  const bars = d.bars
    .map((v, i) => `<div class="bar${i === 3 || i === 5 ? ' accent' : ''}" style="height:${v}%"></div>`)
    .join('');
  return `<section class="hero hero-b" aria-labelledby="hero-title">
  <div class="hero-b-left">
    <div class="hero-inner">
      <p class="eyebrow">${t(h.eyebrow)}</p>
      <h1 id="hero-title" class="display">${t(h.headline)}</h1>
      <p class="subhead">${t(h.subhead)}</p>
      <div class="cta-row">${btn(ctx, h.cta, 'btn btn-primary btn-lg')}</div>
      <p class="trust-line">${t(h.trust)}</p>
    </div>
  </div>
  <div class="hero-b-right">
    <div class="dashboard-card" role="img" aria-label="${esc(plain(d.title))} — ${esc(plain(d.caption))}">
      <div class="dc-header"><div class="dc-title">${t(d.title)}</div><div class="dc-badge">${t(d.badge)}</div></div>
      <div class="kpi-row">${kpis}</div>
      <div class="chart-area"><div class="bars" aria-hidden="true">${bars}</div><div class="chart-caption">${t(d.caption)}</div></div>
    </div>
  </div>
</section>`;
}

module.exports = { heroA, heroB };
