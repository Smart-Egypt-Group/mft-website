const { t, phTag } = require('../html');
const { ctaBand } = require('../layout');
const { pageHeader } = require('./services');

module.exports = function about(ctx) {
  const A = ctx.c.about;
  const body = `${pageHeader(ctx, A.page)}
<section class="section" aria-labelledby="story-title">
  <div class="container narrow">
    <h2 id="story-title">${t(A.story.title)}</h2>
    ${A.story.paras.map((p) => `<p class="lead">${t(p)}</p>`).join('')}
  </div>
</section>

<section class="section section-mist" aria-labelledby="values-title">
  <div class="container">
    <div class="section-head"><h2 id="values-title">${t(A.values.title)}</h2></div>
    <ul class="grid grid-2 values">
      ${A.values.items.map((v) => `<li class="card"><h3>${t(v.title)}</h3><p>${t(v.body)}</p></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section section-navy" aria-labelledby="cred-title">
  <div class="container">
    <div class="section-head"><h2 id="cred-title">${t(A.credentials.title)}</h2></div>
    <ul class="badge-grid">
      ${A.credentials.items.map((x) => `<li class="badge"><span class="dot" aria-hidden="true"></span>${t(x)}</li>`).join('')}
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="team-title">
  <div class="container">
    ${phTag(ctx)}
    <div class="section-head"><h2 id="team-title">${t(A.team.title)}</h2><p class="lead">${t(A.team.intro)}</p></div>
    <ul class="grid grid-3 team">
      ${A.team.members
        .map(
          (m) => `<li class="card team-card"><div class="avatar" aria-hidden="true"></div><h3>${t(m.name)}</h3><p>${t(m.role)}</p></li>`
        )
        .join('')}
    </ul>
  </div>
</section>

<section class="section section-mist" aria-labelledby="offices-title">
  <div class="container">
    <div class="section-head"><h2 id="offices-title">${t(A.offices.title)}</h2></div>
    <ul class="grid grid-3 offices">
      ${A.offices.items.map((o) => `<li class="office"><span class="dot" aria-hidden="true"></span><h3>${t(o.name)}</h3><p>${t(o.body)}</p></li>`).join('')}
    </ul>
  </div>
</section>
${ctaBand(ctx)}`;
  return { title: A.title, description: A.description, body, bodyClass: 'page-about' };
};
