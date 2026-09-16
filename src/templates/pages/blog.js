const { t, esc, plain, url, btn } = require('../html');
const { ctaBand } = require('../layout');
const { pageHeader, seeAlso, faqSchema } = require('./services');

const WORDS_PER_MIN = { en: 220, ar: 180 };

function wordCount(post) {
  const text = post.body.map((b) => b.p || b.h2 || b.quote || (b.ul || []).join(' ')).join(' ');
  return plain(text).split(/\s+/).filter(Boolean).length;
}
function readingTime(ctx, post) { return Math.max(1, Math.round(wordCount(post) / WORDS_PER_MIN[ctx.lang])); }
function fmtDate(ctx, iso) {
  const d = new Date(iso + 'T00:00:00Z');
  return d.toLocaleDateString(ctx.lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

function postMeta(ctx, post) {
  const B = ctx.c.blog;
  const a = B.authors[post.author];
  // Dates: English dates are Latin text (LTR isolate); Arabic dates read correctly in the RTL paragraph, so no wrapper.
  const date = ctx.lang === 'ar' ? esc(fmtDate(ctx, post.date)) : `<span class="lat">${esc(fmtDate(ctx, post.date))}</span>`;
  const mins = readingTime(ctx, post);
  const minsLabel = mins === 1 && B.labels.readingTimeOne ? t(B.labels.readingTimeOne) : mins === 2 && B.labels.readingTimeTwo ? t(B.labels.readingTimeTwo) : `<span class="lat">${mins}</span> ${t(B.labels.readingTime)}`;
  return `<p class="post-meta"><span class="topic-tag">${t(B.topics[post.topic])}</span><span>${t(B.labels.by)} ${t(a.name)}</span><time datetime="${esc(post.date)}">${date}</time><span>${minsLabel}</span></p>`;
}

function postCard(ctx, post) {
  return `<li class="post-card">
    ${postMeta(ctx, post)}
    <h2><a href="${url(ctx, `blog/${post.slug}/`)}">${t(post.title)}</a></h2>
    <p>${t(post.dek)}</p>
  </li>`;
}

function index(ctx) {
  const B = ctx.c.blog;
  const posts = [...B.posts].sort((a, b) => b.date.localeCompare(a.date));
  const body = `${pageHeader(ctx, B.page, [{ label: ctx.c.ui.breadcrumbHome, href: '' }, { label: B.page.eyebrow }])}
<section class="section">
  <div class="container narrow">
    <p class="small muted feed-link"><a href="/${ctx.lang}/blog/feed.xml" type="application/rss+xml">${t(B.labels.rss)}</a></p>
    <ol class="post-list">${posts.map((p) => postCard(ctx, p)).join('')}</ol>
  </div>
</section>
${seeAlso(ctx, [{ label: ctx.c.services.page.eyebrow, href: 'services/' }, { label: ctx.c.intelligence.page.eyebrow, href: 'intelligence/' }, { label: ctx.c.about.page.eyebrow, href: 'about/' }])}
${ctaBand(ctx)}`;
  const jsonld = [{
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: plain(B.page.eyebrow),
    url: `${ctx.config.siteUrl}/${ctx.lang}/blog/`,
    inLanguage: ctx.lang,
    publisher: { '@id': `${ctx.config.siteUrl}/#organization` },
    blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: plain(p.title), url: `${ctx.config.siteUrl}/${ctx.lang}/blog/${p.slug}/`, datePublished: p.date }))
  }];
  return { title: B.title, description: B.description, body, bodyClass: 'page-blog', jsonld };
}

function renderBody(blocks) {
  return blocks.map((b) => {
    if (b.h2) return `<h2>${t(b.h2)}</h2>`;
    if (b.p) return `<p>${t(b.p)}</p>`;
    if (b.ul) return `<ul class="check-list">${b.ul.map((li) => `<li>${t(li)}</li>`).join('')}</ul>`;
    if (b.quote) return `<blockquote class="pull"><p>${t(b.quote)}</p></blockquote>`;
    return '';
  }).join('\n');
}

function article(ctx, post) {
  const B = ctx.c.blog;
  const a = B.authors[post.author];
  const related = B.posts.filter((p) => p.slug !== post.slug).filter((p) => p.topic === post.topic).concat(B.posts.filter((p) => p.slug !== post.slug && p.topic !== post.topic)).slice(0, 3);
  const body = `<article class="article">
  <header class="page-header">
    <div class="container narrow">
      <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="${url(ctx, '')}">${t(ctx.c.ui.breadcrumbHome)}</a></li><li><a href="${url(ctx, 'blog/')}">${t(B.page.eyebrow)}</a></li><li aria-current="page">${t(B.topics[post.topic])}</li></ol></nav>
      <p class="eyebrow">${t(B.topics[post.topic])}</p>
      <h1>${t(post.title)}</h1>
      <p class="lead">${t(post.dek)}</p>
      ${postMeta(ctx, post)}
    </div>
  </header>
  <section class="section">
    <div class="container narrow prose article-body">
      ${renderBody(post.body)}
    </div>
  </section>
  <section class="section section-mist" aria-labelledby="author-title">
    <div class="container narrow">
      <div class="author-box">
        <p class="eyebrow" id="author-title">${t(B.labels.author)}</p>
        <h2>${t(a.name)}</h2>
        <p class="author-role">${t(a.role)}</p>
        <p>${t(a.bio)}</p>
        <p><a class="btn btn-link" href="${esc(a.url)}" rel="noopener" target="_blank">LinkedIn</a></p>
      </div>
    </div>
  </section>
</article>
<section class="section related-posts" aria-labelledby="related-posts-title">
  <div class="container narrow">
    <h2 id="related-posts-title" class="footer-title">${t(B.labels.related)}</h2>
    <ol class="post-list compact">${related.map((p) => postCard(ctx, p)).join('')}</ol>
    <p class="section-foot"><a class="btn btn-link" href="${url(ctx, 'blog/')}">${t(B.labels.all)}</a></p>
  </div>
</section>
${seeAlso(ctx, [
    { label: ctx.c.services.page.eyebrow, href: post.topic === 'compliance' ? 'services/odoo-erp/' : post.topic === 'audit' ? 'services/internal-audit/' : 'intelligence/' },
    { label: ctx.c.intelligence.page.eyebrow, href: 'intelligence/' },
    ...ctx.c.locations.items.map((x) => ({ label: x.name, href: `${x.slug}/` }))
  ])}
${ctaBand(ctx)}`;
  const pageUrl = `${ctx.config.siteUrl}/${ctx.lang}/blog/${post.slug}/`;
  const jsonld = [{
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: plain(post.title),
    description: plain(post.description),
    inLanguage: ctx.lang,
    datePublished: post.date,
    dateModified: post.date,
    wordCount: wordCount(post),
    articleSection: plain(B.topics[post.topic]),
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    author: { '@type': 'Person', name: plain(a.name), jobTitle: plain(a.role), url: a.url, worksFor: { '@id': `${ctx.config.siteUrl}/#organization` } },
    publisher: { '@type': 'Organization', '@id': `${ctx.config.siteUrl}/#organization`, name: ctx.c.meta.siteName, logo: { '@type': 'ImageObject', url: `${ctx.config.siteUrl}/assets/logo/mft-lockup-navy.png` } },
    image: `${ctx.config.siteUrl}/assets/img/og-${ctx.lang}.png`
  }];
  return { title: `${plain(post.title)} | ${ctx.c.meta.shortName}`, description: post.description, body, bodyClass: 'page-article', jsonld };
}

// RSS 2.0 feed per language.
function feed(ctx) {
  const B = ctx.c.blog;
  const base = `${ctx.config.siteUrl}/${ctx.lang}/`;
  const posts = [...B.posts].sort((a, b) => b.date.localeCompare(a.date));
  const items = posts.map((p) => `    <item>
      <title>${esc(plain(p.title))}</title>
      <link>${base}blog/${p.slug}/</link>
      <guid isPermaLink="true">${base}blog/${p.slug}/</guid>
      <pubDate>${new Date(p.date + 'T09:00:00Z').toUTCString()}</pubDate>
      <description>${esc(plain(p.description))}</description>
      <category>${esc(plain(B.topics[p.topic]))}</category>
    </item>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(plain(B.title))}</title>
    <link>${base}blog/</link>
    <atom:link href="${base}blog/feed.xml" rel="self" type="application/rss+xml"/>
    <description>${esc(plain(B.description))}</description>
    <language>${ctx.lang}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

// Compact "latest insights" block for the home page.
function latestBlock(ctx, n = 3) {
  const B = ctx.c.blog;
  const posts = [...B.posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, n);
  return `<section class="section" aria-labelledby="latest-posts-title">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${t(B.page.eyebrow)}</p><h2 id="latest-posts-title">${t(B.labels.latest)}</h2></div>
    <ol class="post-list columns">${posts.map((p) => postCard(ctx, p)).join('')}</ol>
    <p class="section-foot"><a class="btn btn-link" href="${url(ctx, 'blog/')}">${t(B.labels.all)}</a></p>
  </div>
</section>`;
}

module.exports = { index, article, feed, latestBlock };
