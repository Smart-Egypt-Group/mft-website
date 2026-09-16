# Pending decisions (Ahmed)

All site copy is final. Only the two items below are open. Each is marked in exactly one place in the code, so nothing else needs to change when a decision lands.

| # | Decision | Where to apply it | Current state |
|---|---|---|---|
| 1 | **Production domain** — buy `mftfintech.com` or fix the certificate on `mft-eg.com` | `src/site.config.js → siteUrl` (one line, boxed comment) | `https://PENDING-DOMAIN.example`. `npm run check` prints a warning until it is set. Drives canonical, hreflang, sitemap, robots, OG. |
| 2 | **Pricing packages** — fixed packages vs. indicative ranges, and the prices | `src/site.config.js → showPricingSlot` (flip to `true`), prices into `home.pricing.tiers` in both content files | Section fully written (Starter / Growth / Enterprise, no prices) and **hidden**. |

## Resolved: lead form → Odoo CRM

Verified live on 10 Sep 2026 with Ahmed's approval: a test lead sent through the public website-form route created **crm.lead #898** on fin-tech.odoo.com ("Virtual CFO — MFT Website — test 10 Sep 2026") with contact name, email, phone and the full description (service, country, language, page). Odoo's existing CRM automations fired on it: a welcome email from OdooBot and two "Follow up the call" activities. No API user was needed, so the VPS user-creation bug no longer blocks the site.

- `ODOO_WEBSITE_FORM_URL` is set in `netlify.toml` for production; nothing else to configure.
- Records arrive as **leads** (not opportunities) — the website route ignores the type field. Convert from the lead view, or switch to the JSON-RPC path once an API user can be created.
- Lead #898 is labelled "delete me"; delete it from CRM when convenient.

## Decided and implemented (no action)

- 16 Sep 2026, motion complaints from Ahmed on live: (1) content flickered on every load because the motion class was added after first paint; (2) content lagged behind fast scrolling (invisible up to 600 ms). Frame rate was never the problem (16.6 ms frames, zero long tasks). Fixed and deployed (gh-pages da31e8b): pre-paint class via `pre.js`, hide only below-viewport elements, earlier trigger, instant reveal on fast scroll, hero entrance once per session, ScrollTrigger ignores mobile URL-bar resizes.

- 16 Sep 2026: SEO checklist + GSAP motion deployed to production (gh-pages f31ddcb from feat/risk-hero-trust 9002e58) with Ahmed's approval; 44 pages live at www.seg-audit.com. Post-deploy contact test lead is labelled "delete me".

- 15 Sep 2026, SEO checklist: 12 partial or missing items implemented (location pages EG/SA, market in service titles, LocalBusiness+geo schema, visible breadcrumbs, see-also blocks, FAQ on level-1 pages, Review schema, proof on service pages). Author bio (item 15) skipped by decision: no blog. A blog is a separate content decision.

- 14 Sep 2026, "dead contact form" report: NOT reproducible on the live site (www.seg-audit.com, GitHub Pages build of the same morning). Real-browser submissions in Arabic and English returned the success message, Odoo answered 200, and leads #906/#907 landed in CRM. The "online submission not available" text only appears in a build made with an empty endpoint, i.e. the review artifact, not the site. Hardened anyway: `odoo-direct` is now the default mode, an empty `FORM_ENDPOINT` refuses to build, and `npm run check` fails on any unwired lead form. Test leads now #898 to #907, all "delete me".

- 12 Sep 2026 (sales-channel update, Ahmed's assumptions accepted): all 12 agent roles published with real statuses; Consultant omitted (not built). Auditor + Virtual CFO sold as a **managed service by MFT** (standalone MFT Intelligence). Inside seg-audit the same two agents are **built into the report pipeline** ("every report AI-reviewed before it reaches you"), not a paid add-on; described as "in final review, enabled after the AI disclosure is published". AI providers are not named on the site; policy "available on request". Odoo ERP-delivery agents are not mentioned. Quote form posts to CRM with title prefix "Quote request:" and scope fields in the description (verified: leads #904/#905).

- 11 Sep 2026: the GitHub Pages preview form now posts directly to Odoo (`FORM_MODE=odoo-direct`). Verified with real-browser submissions on the live URL: leads #900 (Arabic) and #901 (English) in CRM, plus #899 from the session-less curl probe. Test leads #898–#905 are labelled "delete me" — delete them from CRM when convenient (#902–#905 are the 12 Sep contact + quote form tests).

- 11 Sep 2026, from Ahmed's reference HTML: navy is the dominant colour, cyan the accent. Home uses hero B (split dashboard), the navbar is navy with the white logo and cyan CTA, and the navy / cyan / gold / gray palette applies site-wide. Two earlier blue-accent iterations were reverted.

- Logo: no vector exists. All web assets are derived directly from the official 5906×5906 PNG pack (`scripts/logo-assets.js`, cropped to the alpha bounding box, 2000 px lockups, 1024 px mark, favicon set 32/192/512 + 180 touch icon). 17× oversampled for the 40 px header; final.

- Accent text on light backgrounds uses `#0E7C8C` (4.9:1, WCAG AA); brand cyan `#1BB7CD` for buttons, fills and text on navy. Final.
- Logo pinned top-left in Arabic as well as English (brand consistency over RTL convention). Final.
- WhatsApp number `+20 106 239 9941` (official contact page). Final.
- Contact address: Dr. Sayed Abdel Wahed Street, Korba, Heliopolis, Cairo (official contact page). Final.
- Social profiles: LinkedIn, Facebook, Instagram as linked from the official site footer. Final.
- No analytics installed; the privacy page states that. Add later only with a CSP update (see README).
