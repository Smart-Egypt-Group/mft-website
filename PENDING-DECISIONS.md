# Pending decisions (Ahmed)

All site copy is final. Only the two items below are open. Each is marked in exactly one place in the code, so nothing else needs to change when a decision lands.

| # | Decision | Where to apply it | Current state |
|---|---|---|---|
| 1 | **Production domain** — buy `mftfintech.com` or fix the certificate on `mft-eg.com` | `src/site.config.js → siteUrl` (one line, boxed comment) | `https://PENDING-DOMAIN.example`. `npm run check` prints a warning until it is set. Drives canonical, hreflang, sitemap, robots, OG. |
| 2 | **Pricing packages** — fixed packages vs. indicative ranges, and the prices | `src/site.config.js → showPricingSlot` (flip to `true`), prices into `home.pricing.tiers` in both content files | Section fully written (Starter / Growth / Enterprise, no prices) and **hidden**. |

## Open: SEG Audit Founding Members launch (PR launch/founding-members, 3 Nov 2026)

**Resolved, launch lead (3 Nov 2026):** the 17 / 33 figures (existing Odoo customers, not platform users) are withdrawn everywhere. Scarcity is the fixed cap with no counter: «برنامج الأعضاء المؤسِّسون — 50 مقعد فقط بسعر مؤسِّس مدى الحياة». The counter is built but off (`site.config.js → founding.showCount: false`); see `marketing/workflow/01-operating-system.md → Switching on the real counter`.


| # | Decision | Where it lands |
|---|---|---|
| 3 | **Founder price for life**: decided by the launch lead. Confirm the exact terms behind "for life" (it is written as "for as long as the subscription runs"; not offered once the 50 seats are taken) and that billing in the app honours it. **Verified 3 Nov 2026 in seg-audit `main@3d0133c8`: billing has no founder or lifetime price and no coupon engine** (only a one-time 50% off the first billing cycle). Until it is built, sales do not promise it in writing | `src/content/{ar,en}.js → founding.gets.items[2]`, `founding.faq` |
| 4 | **YouTube and TikTok URLs**: not confirmed as MFT's own (youtube.com/@modernfintech is titled "ModernFinTech4k"). Empty values are not rendered | `src/site.config.js → contact.social.youtube / tiktok` |
| 5 | ~~**Seat definition**~~ **Resolved 8 Nov 2026 (Ahmed):** no seat cap and no counter; applications close at `founding.closesAt` (30 Nov 2026, 23:59:59 Cairo) and there is no confirmation e-mail. The counter code and `total` / `filled` / `asOf` / `showCount` are removed | `site.config.js → founding.closesAt` |
| 8 | **Free check scope (CEO, 3 Nov 2026)**: the offer is «فحص مجاني لميزان شركتك يكشف نقاط الخطر في دقائق». Two of the five indicators (heavy manual entries, backdated entries) need entry-level data (a journal or an Odoo connection); a trial-balance file alone holds balances only. Confirm how the app computes them for an uploaded trial balance, and that the check really returns in minutes, before the copy goes live. **Verified 3 Nov 2026 in seg-audit `main@3d0133c8`: from a trial-balance file the app computes imbalance, wrong-side (abnormal) balances, equity erosion and single-account concentration; it does NOT compute suspense accounts, manual entries or backdated entries (`reports/trial_balance.py:45–51`). The check also needs a signed-in account and uses report quota.** Options: (a) keep the five indicators and say «مع ربط Odoo» for the last three, (b) list only what the file computes, (c) build the three indicators from a journal upload. Sales scripts already use (a) one-to-one | site `founding.check`, home how/CTA/FAQ, `designs/concepts/tb-check/`, carousel, drafts |
| 7 | **Social handles**: standard @modernfintech (fallback @mftfintech); availability on X, TikTok and YouTube unconfirmed; Facebook/LinkedIn vanity URL changes alter existing links | `marketing/brand/CHECKLIST.md`, then `site.config.js → contact.social` |
| 6 | **Product name in copy**: **resolved by the CEO (3 Nov 2026):** company MFT → platform «SEG — Standard Enterprise Governance» → product «SEG Audit». Applied to the brand kit, profiles, the founding page, the about credential and the MFT FAQ. Older site copy still says "seg-audit" for the platform in places (trust, partners, agents pages); unify in a follow-up | content files |

## Open: sales playbook (PR #10, `marketing/sales/`, 3 Nov 2026)

Everything below is drafted and waits for the CEO. Nothing is sent to a partner, spent, published or configured on the live Odoo before approval.

| # | Decision | Where it lands |
|---|---|---|
| 9 | **Partner programme figures**: referral 15 / 20 / 25%, recurring 10% (years 2–3), reseller discount 20 / 30 / 35%, deal-registration 60 / 90 / 120 days, MDF up to 5%, practice-partner wholesale price per company (not proposed: CEO sets it) | `marketing/sales/03-partner-program.md`, `partners/agreement-term-sheet.md`, `partners/page-copy.md` (then `src/content/{ar,en}.js → partners`) |
| 10 | **ARPA $6,000 vs price list**: at ~56 EGP/USD every single-company plan lists below $6,000/year in Egypt (Advanced ≈ $4,286); the target needs ~14–28% Enterprise accounts, partners or Gulf pricing. **Billing charges EGP only**; SAR prices are display-only. Decide how Gulf customers are charged | `marketing/sales/00-economics.md`, seg-audit billing |
| 11 | **Gross margin**: the reference figures imply ~83%; named-reviewer sign-off on every report is cost of revenue. Start timesheets on approvals | `00-economics.md`, Odoo Timesheets |
| 12 | **Legal opinion before outbound email and list uploads**: Egypt Law 151/2020 (prior consent; secondary sources mention a licence for electronic direct marketing) and Saudi PDPL (consent; regulation under amendment). Until then: no cold email to individuals, no CRM lists uploaded to ad platforms | `07-outbound-nurture-retargeting.md`, `11-compliance-and-governance.md` |
| 13 | **Auditor independence rule**: no commission for a firm on a client whose statements it audits (IESBA §330/§410); confirm against Egyptian and SOCPA rules | `03-partner-program.md §7`, term sheet |
| 14 | **White-label and partner final sign-off**: today reports carry MFT's mark and only an MFT reviewer gives final sign-off. A partner-branded report with the firm's own final sign-off changes who carries the assurance | `03-partner-program.md §5` |
| 15 | **Product tickets for seg-audit**: UTM capture + sign-up → Odoo CRM lead; `signup.completed` / `quota.reached` / first-report events; `referral_code` in signup/checkout + partner admin screen (engine pays 20% on the first invoice only); founder price in billing; one-click connect | `02-plg-pql.md §7` |
| 16 | **Odoo CRM setup on erp.seg-audit.com (19.0 Enterprise)**: teams, stages, Studio fields, tags, automation rules; test on a copy first. Installed apps (Studio, Marketing Automation, Partner Assignment, Events) not verified | `08-odoo-crm-pipeline-scoring.md`, `marketing/sales/odoo/*.csv` |

## Resolved: lead form → Odoo CRM

Verified live on 10 Sep 2026 with Ahmed's approval: a test lead sent through the public website-form route created **crm.lead #898** on fin-tech.odoo.com ("Virtual CFO — MFT Website — test 10 Sep 2026") with contact name, email, phone and the full description (service, country, language, page). Odoo's existing CRM automations fired on it: a welcome email from OdooBot and two "Follow up the call" activities. No API user was needed, so the VPS user-creation bug no longer blocks the site.

- `ODOO_WEBSITE_FORM_URL` is set in `netlify.toml` for production; nothing else to configure.
- Records arrive as **leads** (not opportunities) — the website route ignores the type field. Convert from the lead view, or switch to the JSON-RPC path once an API user can be created.
- Lead #898 is labelled "delete me"; delete it from CRM when convenient.

## Decided and implemented (no action)

- 8 Nov 2026, Meta pixel ownership (Ahmed: «اعمل اللازم تقنيا»): the site fired only `501774495051160` ("Ahmed Ashraf's Pixel", a personal pixel from 2022, not owned by Business Manager 1914332548951730 and not linked to ad account MFT 1082321551115350). The business-owned dataset `775138718613961` had never received an event. Both now load (`analytics.metaPixelId` takes space-separated IDs; every event reaches each), so ads can optimise on the business dataset with no history lost. New event: Meta `Contact` on any wa.me click; disclosed in the privacy notice (AR/EN, "What is sent to Meta"). **Open (Ahmed, Business Settings):** assign dataset 775138718613961 to ad account 1082321551115350; then retire the personal pixel by removing its ID here.

- 14 Oct 2026: AI education series, 12 AR/EN articles (24 pages) in `src/content/ai-articles/` (one file per article, loaded by `blog-posts-ai.js`), new topic `ai`. Blog template gained `h3`, `ol`, `table`, in-text links `[[href|label]]`, `sources` (rendered + Article `citation`), `metaTitle`, `keywords`, `about`, and `reviewer` (visible line + WebPage `reviewedBy`/`lastReviewed`). Odoo 20 claims checked against odoo.com/odoo-20-release-notes directly this time. **Open before merge:** confirm the reviewer label "MFT audit and Odoo practice" (or name a person); decide whether AI agents are Enterprise-only (existing post `odoo-20-ai-agents-finance-controls` says yes and mentions a vendor-renegotiation agent; neither was found in the official notes this session).

- 6 Oct 2026: lead form moved to the self-hosted Odoo at `erp.seg-audit.com` (PR #1) and deployed to production (gh-pages 796d391 from main 6867620) on Ahmed's instruction, with the risk stated: the endpoint was not reachable from the build sandbox, and `no-cors` means a rejected lead still shows success. **Open:** send one test lead from the live contact page and confirm it lands in CRM on erp.seg-audit.com.

- 6 Oct 2026: Insights grew from 5 to 17 AR/EN articles (PR #2); every article carries a short answer, key takeaways and an FAQ (FAQPage schema) for AEO; robots.txt names AI answer-engine crawlers and `llms-full.txt` carries every article for GEO; mobile tap targets raised to 24px+. Odoo 20 articles follow, written only from the Odoo 20 release notes as reported by Odoo partners (odoo.com itself was unreachable from the sandbox).

- 16 Sep 2026, blog: Ahmed asked for a blog. Built `blog/` (AR/EN) with five founding articles (ISA 320 materiality, ZATCA phase two in Odoo, Egyptian e-invoicing mistakes in Odoo, continuous audit, agents draft / people approve), RSS per language, Article + Blog schema, home "Latest insights" block, nav and footer links. SEO item 15 (author bio) is closed: articles carry an author box for Ahmed Ashraf Mostafa (name from the execution-plan document; bio built from verified facts; LinkedIn points to the company page). **Confirmed by the project manager, 16 Sep 2026:** name, title and bio stay as written; LinkedIn stays on the company page until Ahmed provides a personal URL (not a blocker). Edit in one place when it arrives: `src/content/blog.<lang>.js → authors.ahmed.url`.

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
