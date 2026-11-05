const { t, esc } = require('../html');
const { ctaBand } = require('../layout');
const { isLive, liveAttrs, liveText } = require('../live-reports');
const { pageHeader, faqBlock, faqSchema, seeAlso } = require('./services');

// Founder's certifications (CEO, 5 Nov 2026). Renders nothing while about.founder.certifications
// is empty; every field comes from the certificate itself, never filled in by guess.
function founder(ctx, F) {
  const list = (F && F.certifications) || [];
  if (!list.length) return '';
  const L = F.labels || {};
  const row = (k, v) => (v ? `<div class="deflist-row"><dt>${t(L[k] || k)}</dt><dd>${v}</dd></div>` : '');
  const card = (x) => `<li class="cert-card">
      <h3 class="cert-name">${t(x.name)}</h3>
      <dl class="deflist cert-meta">
        ${row('holder', t(x.holder || ''))}
        ${row('issuer', t(x.issuer || ''))}
        ${row('validity', t(x.validity || ''))}
        ${row('number', t(x.number || ''))}
        ${x.href ? row('verify', `<a href="${esc(x.href)}" rel="noopener" target="_blank"><span class="lat" dir="ltr">${esc(x.hrefLabel || x.href)}</span></a>`) : ''}
      </dl>
    </li>`;
  return `<section class="section" aria-labelledby="founder-title">
  <div class="container">
    <div class="section-head"><h2 id="founder-title">${t(F.title)}</h2>${F.intro ? `<p class="lead">${t(F.intro)}</p>` : ''}</div>
    <h3 class="cert-heading">${t(F.certificationsTitle)}</h3>
    <ul class="cert-list">${list.map(card).join('')}</ul>
  </div>
</section>`;
}

module.exports = function about(ctx) {
  const A = Object.assign({}, ctx.c.about, { milestones: ctx.c.milestones });
  const body = `${pageHeader(ctx, A.page, [{ label: ctx.c.ui.breadcrumbHome, href: '' }, { label: A.page.eyebrow }])}
<section class="section" aria-labelledby="story-title">
  <div class="container narrow">
    <h2 id="story-title">${t(A.story.title)}</h2>
    ${A.story.paras.map((p) => `<p class="lead">${t(p)}</p>`).join('')}
  </div>
</section>

<section class="section section-mist" aria-labelledby="values-title">
  <div class="container">
    <div class="section-head"><h2 id="values-title">${t(A.values.title)}</h2></div>
    <dl class="deflist">
      ${A.values.items.map((v) => `<div class="deflist-row"><dt>${t(v.title)}</dt><dd>${t(v.body)}</dd></div>`).join('')}
    </dl>
  </div>
</section>

<section class="section section-navy" aria-labelledby="cred-title">
  <div class="container">
    <div class="section-head"><h2 id="cred-title">${t(A.credentials.title)}</h2></div>
    <ul class="badge-grid">
      ${A.credentials.items.map((x) => (isLive(x) ? `<li class="badge"${liveAttrs(ctx)}><span class="dot" aria-hidden="true"></span><span class="badge-label">${liveText(ctx, x)}</span></li>` : `<li class="badge"><span class="dot" aria-hidden="true"></span><span class="badge-label">${t(x)}</span></li>`)).join('')}
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="team-title">
  <div class="container">
    <div class="section-head"><h2 id="team-title">${t(A.team.title)}</h2><p class="lead">${t(A.team.intro)}</p></div>
    <ul class="grid grid-3 pillars">
      ${A.team.points.map((m, i) => `<li class="pillar"><span class="num lat" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><h3>${t(m.title)}</h3><p>${t(m.body)}</p></li>`).join('')}
    </ul>
  </div>
</section>

${founder(ctx, A.founder)}
<section class="section section-mist" aria-labelledby="ms-title">
  <div class="container">
    <div class="section-head"><h2 id="ms-title">${t(A.milestones.title)}</h2></div>
    <ol class="milestones">
      ${A.milestones.items.map((m, i) => `<li class="milestone reveal" style="--i:${i}"><span class="ms-when lat">${t(m.when)}</span><div><h3>${t(m.title)}</h3><p>${t(m.body)}</p></div></li>`).join('')}
    </ol>
  </div>
</section>

<section class="section" aria-labelledby="offices-title">
  <div class="container">
    <div class="section-head"><h2 id="offices-title">${t(A.offices.title)}</h2></div>
    <ul class="grid grid-3 offices">
      ${A.offices.items.map((o) => `<li class="office"><span class="dot" aria-hidden="true"></span><h3>${t(o.name)}</h3><p>${t(o.body)}</p></li>`).join('')}
    </ul>
  </div>
</section>
${faqBlock(ctx, ctx.c.ui.faqTitle, ctx.c.aboutFaq)}
${seeAlso(ctx, [{ label: ctx.c.intelligence.page.eyebrow, href: 'intelligence/' }, { label: ctx.c.services.page.eyebrow, href: 'services/' }, ...ctx.c.locations.items.map((x) => ({ label: x.name, href: `${x.slug}/` }))])}
${ctaBand(ctx)}`;
  return { title: A.title, description: A.description, body, bodyClass: 'page-about', jsonld: [faqSchema(ctx.c.aboutFaq)] };
};
