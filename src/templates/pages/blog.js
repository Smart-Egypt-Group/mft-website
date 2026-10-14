const { t, esc, plain, url, btn } = require('../html');
const { ctaBand } = require('../layout');
const { pageHeader, seeAlso, faqSchema, faqBlock } = require('./services');

const WORDS_PER_MIN = { en: 220, ar: 180 };

// In-text links inside body copy: [[href|label]], href as in url() ('blog/slug/', 'intelligence/').
const LINK = /\[\[([^|\]]+)\|([^\]]+)\]\]/g;
const unlink = (s) => String(s == null ? '' : s).replace(LINK, '$2');
const rich = (ctx, s) => t(s).replace(LINK, (m, href, label) => `<a href="${esc(url(ctx, href))}">${label}</a>`);

// Plain text of one body block (for word count and llms-full.txt).
function blockText(b) {
  if (b.table) return [...(b.table.head || []), ...b.table.rows.flat()].join(' ');
  return b.p || b.h2 || b.h3 || b.quote || (b.ul || b.ol || []).join(' ');
}
function wordCount(post) {
  const text = post.body.map(blockText).join(' ');
  return plain(unlink(text)).split(/\s+/).filter(Boolean).length;
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

function renderBody(ctx, blocks) {
  return blocks.map((b) => {
    if (b.h2) return `<h2>${t(b.h2)}</h2>`;
    if (b.h3) return `<h3>${t(b.h3)}</h3>`;
    if (b.p) return `<p>${rich(ctx, b.p)}</p>`;
    if (b.ul) return `<ul class="check-list">${b.ul.map((li) => `<li>${rich(ctx, li)}</li>`).join('')}</ul>`;
    if (b.ol) return `<ol class="steps-list">${b.ol.map((li) => `<li>${rich(ctx, li)}</li>`).join('')}</ol>`;
    if (b.quote) return `<blockquote class="pull"><p>${t(b.quote)}</p></blockquote>`;
    if (b.table) {
      const T = b.table;
      return `<div class="table-wrap" role="region" aria-label="${esc(plain(T.caption))}" tabindex="0"><table class="data-table">
  <caption>${t(T.caption)}</caption>
  <thead><tr>${T.head.map((h) => `<th scope="col">${t(h)}</th>`).join('')}</tr></thead>
  <tbody>${T.rows.map((r) => `<tr>${r.map((cell, i) => (i === 0 ? `<th scope="row">${rich(ctx, cell)}</th>` : `<td>${rich(ctx, cell)}</td>`)).join('')}</tr>`).join('')}</tbody>
</table></div>`;
    }
    return '';
  }).join('\n');
}

// Article artwork (scripts/article-images.js): 16:9 hero as WebP (800/1600) with a JPEG fallback,
// and a 1200x630 JPEG for og:image / twitter:image. One file set per slug serves both languages.
const imgBase = (post) => `/assets/img/blog/${post.slug}`;
function heroFigure(post) {
  if (!post.image) return '';
  const b = imgBase(post);
  return `<figure class="article-hero">
      <picture>
        <source type="image/webp" srcset="${b}-800.webp 800w, ${b}-1600.webp 1600w" sizes="(max-width: 860px) calc(100vw - 32px), 820px">
        <img src="${b}-1600.jpg" width="1600" height="900" alt="${esc(plain(post.image.alt))}" fetchpriority="high" decoding="async">
      </picture>
    </figure>`;
}

function sourcesBlock(ctx, post) {
  if (!post.sources || !post.sources.length) return '';
  return `<section class="sources" aria-labelledby="sources-title"><h2 id="sources-title">${t(ctx.c.blog.labels.sources)}</h2><ol>${post.sources
    .map((s) => `<li><a href="${esc(s.url)}" rel="noopener" target="_blank">${t(s.label)}</a></li>`).join('')}</ol></section>`;
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
      ${post.reviewer ? `<p class="post-meta reviewed-by"><span>${t(B.labels.reviewedBy)} ${t(B.reviewers[post.reviewer].name)}</span><span>${t(B.labels.lastReviewed)} <time datetime="${esc(post.updated || post.date)}">${ctx.lang === 'ar' ? esc(fmtDate(ctx, post.updated || post.date)) : `<span class="lat">${esc(fmtDate(ctx, post.updated || post.date))}</span>`}</time></span></p>` : ''}
      ${heroFigure(post)}
    </div>
  </header>
  <section class="section">
    <div class="container narrow prose article-body">
      ${post.answer ? `<aside class="answer-box" aria-labelledby="answer-title"><p class="eyebrow" id="answer-title">${t(B.labels.answer)}</p><p class="answer-text">${t(post.answer)}</p>${post.takeaways && post.takeaways.length ? `<p class="takeaways-title">${t(B.labels.takeaways)}</p><ul class="check-list">${post.takeaways.map((k) => `<li>${t(k)}</li>`).join('')}</ul>` : ''}</aside>` : ''}
      ${renderBody(ctx, post.body)}
      ${sourcesBlock(ctx, post)}
      <p class="cta-row article-cta">${btn(ctx, { label: B.labels.cta, href: post.topic === 'odoo' || post.topic === 'compliance' ? 'request-quote/' : 'contact/' }, 'btn btn-primary')}</p>
    </div>
  </section>
  ${faqBlock(ctx, B.labels.faq, post.faq)}
  <section class="section" aria-labelledby="author-title">
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
    { label: ctx.c.services.page.eyebrow, href: post.topic === 'compliance' ? 'services/odoo-erp/' : post.topic === 'audit' ? 'services/internal-audit/' : post.topic === 'odoo' ? 'services/odoo-erp/' : 'intelligence/' },
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
    dateModified: post.updated || post.date,
    wordCount: wordCount(post),
    articleSection: plain(B.topics[post.topic]),
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    author: { '@type': 'Person', name: plain(a.name), jobTitle: plain(a.role), url: a.url, worksFor: { '@id': `${ctx.config.siteUrl}/#organization` } },
    publisher: { '@type': 'Organization', '@id': `${ctx.config.siteUrl}/#organization`, name: ctx.c.meta.siteName, logo: { '@type': 'ImageObject', url: `${ctx.config.siteUrl}/assets/logo/mft-lockup-navy.png` } },
    image: post.image
      ? [
          { '@type': 'ImageObject', url: `${ctx.config.siteUrl}${imgBase(post)}-og.jpg`, width: 1200, height: 630, caption: plain(post.image.alt) },
          { '@type': 'ImageObject', url: `${ctx.config.siteUrl}${imgBase(post)}-1600.jpg`, width: 1600, height: 900, caption: plain(post.image.alt) }
        ]
      : `${ctx.config.siteUrl}/assets/img/og-${ctx.lang}.png`,
    ...(post.answer ? { abstract: plain(post.answer), speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.answer-text', 'h1'] } } : {}),
    ...(post.keywords ? { keywords: post.keywords.map(plain).join(', ') } : {}),
    ...(post.about ? { about: post.about.map((name) => ({ '@type': 'Thing', name: plain(name) })) } : {}),
    ...(post.sources ? { citation: post.sources.map((x) => ({ '@type': 'CreativeWork', name: plain(x.label), url: x.url })) } : {})
  }];
  if (post.reviewer) {
    const r = B.reviewers[post.reviewer];
    jsonld.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': pageUrl,
      url: pageUrl,
      name: plain(post.title),
      inLanguage: ctx.lang,
      lastReviewed: post.updated || post.date,
      reviewedBy: { '@type': 'Organization', name: plain(r.name), description: plain(r.role), parentOrganization: { '@id': `${ctx.config.siteUrl}/#organization` } }
    });
  }
  if (post.faq && post.faq.length) jsonld.push(faqSchema(post.faq));
  return { title: `${plain(post.metaTitle || post.title)} | ${ctx.c.meta.shortName}`, description: post.description,
    ...(post.image ? { ogImage: { url: `${imgBase(post)}-og.jpg`, width: 1200, height: 630, alt: plain(post.image.alt) }, ogType: 'article', published: post.date, modified: post.updated || post.date } : {}), body, bodyClass: 'page-article', jsonld };
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

module.exports = { index, article, feed, latestBlock, blockText, unlink };
