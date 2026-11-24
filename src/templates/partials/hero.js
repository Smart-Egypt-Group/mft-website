// Home hero. Variant C = single navy surface with the risk-dashboard hook (live, Ahmed's approved
// concept, 14 Sep 2026). A = trust-strip hero and B = split dashboard stay as /_preview/ pages.
// Switch in site.config.js.
const { t, esc, plain, url, btn, figure } = require('../html');
const { isLive, liveAttrs, liveText, countSpan } = require('../live-reports');

function heroA(ctx) {
  const h = ctx.c.home.hero;
  const trust = h.trust.map((b) => (isLive(b) ? `<li class="badge"${liveAttrs(ctx)}><span class="dot" aria-hidden="true"></span><span class="badge-label">${liveText(ctx, b)}</span></li>` : `<li class="badge"><span class="dot" aria-hidden="true"></span><span class="badge-label">${t(b)}</span></li>`)).join('');
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
      if (isLive(b)) return `<li class="badge" style="--i:${i}"${liveAttrs(ctx)}><span class="dot" aria-hidden="true"></span><span class="badge-label">${liveText(ctx, b)}</span></li>`;
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
    <div class="dashboard-card rise" style="--i:2" role="img" aria-label="${esc(plain(d.title))}. ${esc(plain(d.caption))}">
      <div class="dc-header"><div class="dc-title">${t(d.title)}</div><div class="dc-badge"><span class="pulse" aria-hidden="true"></span>${t(d.badge)}</div></div>
      <div class="kpi-row">${kpis}</div>
      <div class="chart-area"><div class="bars" aria-hidden="true">${bars}</div><div class="chart-caption">${t(d.caption)}</div></div>
      ${findings ? `<div class="findings"><div class="findings-title">${t(d.findingsTitle)}</div><ul>${findings}</ul></div>` : ''}
    </div>
  </div>
</section>`;
}

// Variant C: navy hero. With home.heroRisk.stats the panel beside the headline carries REAL counted
// figures (CEO, 24 Nov 2026: the hero hooks with real counters), and the illustrative check result
// moves to its own section right under the hero (sampleSection). Without stats, the hero keeps the
// illustrative risk panel as before. Counters animate with the existing countUp (main.js runs every
// `.hero [data-count]` on load).
function riskPanel(ctx, extra = '') {
  const r = ctx.c.home.heroRisk.risk;
  const counters = r.counters
    .map(
      (k, i) => `<li class="risk-card risk-${esc(k.level)}" style="--i:${i}"><span class="risk-num lat"><span class="count" data-count="${esc(k.value)}">${esc(k.value)}</span></span><span class="risk-label">${t(k.label)}</span></li>`
    )
    .join('');
  const findings = (r.findings || []).length
    ? `<ul class="risk-findings" aria-hidden="true">${r.findings.map((f, i) => `<li class="sev-${esc(f.level)}" style="--i:${i}"><span>${t(f.text)}</span><span class="finding-tag">${t(f.tag)}</span></li>`).join('')}</ul>`
    : '';
  const panelLabel = `${plain(r.title)} ${r.counters.map((k) => `${k.value} ${plain(k.label)}`).join(', ')}. ${(r.findings || []).map((f) => `${plain(f.text)} (${plain(f.tag)})`).join('. ')}. ${plain(r.caption)}`;
  return `<div class="risk-panel${extra}" role="img" aria-label="${esc(panelLabel)}">
      <div class="risk-head"><p class="risk-title">${t(r.title)}</p><span class="risk-badge">${t(r.badge)}</span></div>
      ${r.scanning ? `<div class="scan-status" aria-hidden="true"><span class="scan-label scan-running">${t(r.scanning)}</span><span class="scan-label scan-done">${t(r.done)}</span><span class="scan-track"><span class="scan-fill"></span></span></div>` : ''}
      <ul class="risk-row" aria-hidden="true">${counters}</ul>
      ${findings}
      <p class="risk-caption" aria-hidden="true">${t(r.caption)}</p>
    </div>`;
}

// Real counted figures. Every value comes from a facts file through figure(), or is the live
// reports counter, which hides itself when the platform gives no number: nothing is claimed.
function statsPanel(ctx) {
  const S = ctx.c.home.heroRisk.stats;
  const items = S.items
    .map((x, i) =>
      isLive(x)
        ? `<li class="stat stat-live" style="--i:${i}"${liveAttrs(ctx)}><span class="stat-num lat">${countSpan(ctx)}</span><span class="stat-label"><span class="live-dot" aria-hidden="true"></span><span>${t(x.label)}</span></span></li>`
        : `<li class="stat" style="--i:${i}"><span class="stat-num lat">${figure(x.value)}</span><span class="stat-label">${t(x.label)}</span></li>`
    )
    .join('');
  return `<div class="stats-panel rise" style="--i:2">
      <p class="stats-title">${t(S.title)}</p>
      <ul class="stats-grid">${items}</ul>
      <p class="stats-foot"><span>${t(S.asOf)}</span>${S.more ? `<a class="btn btn-link" href="${url(ctx, S.more.href)}">${t(S.more.label)}</a>` : ''}</p>
    </div>`;
}

function heroC(ctx) {
  const h = ctx.c.home.heroRisk;
  return `<section class="hero hero-c" aria-labelledby="hero-title">
  <div class="container hero-c-inner">
    <div class="hero-copy">
      ${h.live ? `<p class="hero-live rise" style="--i:0"><span class="live-dot" aria-hidden="true"></span>${t(h.live)}</p>` : `<p class="eyebrow rise" style="--i:0">${t(h.eyebrow)}</p>`}
      <h1 id="hero-title" class="display rise" style="--i:1">${t(h.headline)}</h1>
      <p class="subhead rise" style="--i:2">${t(h.subhead)}</p>
      <div class="cta-row rise" style="--i:3">${btn(ctx, h.cta, 'btn btn-primary btn-lg')}${btn(ctx, h.secondary, 'btn btn-ghost btn-lg')}</div>
      ${h.assurance ? `<ul class="hero-assurance rise" style="--i:4">${h.assurance.map((a) => `<li>${t(a)}</li>`).join('')}</ul>` : ''}
    </div>
    ${h.stats ? statsPanel(ctx) : riskPanel(ctx, ' rise" style="--i:2')}
  </div>
</section>`;
}

// The illustrative check result, in its own section right under the hero, when the hero panel
// carries the real figures. Clearly a sample: its own badge and copy say so.
function sampleSection(ctx) {
  const h = ctx.c.home.heroRisk;
  if (!h.stats || !h.sample) return '';
  return `<section class="section section-navy sample" aria-labelledby="sample-title">
  <div class="container sample-inner">
    <div class="section-head"><p class="eyebrow">${t(h.sample.eyebrow)}</p><h2 id="sample-title">${t(h.sample.title)}</h2><p class="lead">${t(h.sample.body)}</p></div>
    ${riskPanel(ctx)}
  </div>
</section>`;
}

module.exports = { heroA, heroB, heroC, sampleSection };
