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

- 11 Sep 2026: the GitHub Pages preview form now posts directly to Odoo (`FORM_MODE=odoo-direct`). Verified with real-browser submissions on the live URL: leads #900 (Arabic) and #901 (English) in CRM, plus #899 from the session-less curl probe. All four test leads (#898–#901) are labelled "delete me" — delete them from CRM when convenient.

- 11 Sep 2026, from Ahmed's reference HTML: navy is the dominant colour, cyan the accent. Home uses hero B (split dashboard), the navbar is navy with the white logo and cyan CTA, and the navy / cyan / gold / gray palette applies site-wide. Two earlier blue-accent iterations were reverted.

- Logo: no vector exists. All web assets are derived directly from the official 5906×5906 PNG pack (`scripts/logo-assets.js`, cropped to the alpha bounding box, 2000 px lockups, 1024 px mark, favicon set 32/192/512 + 180 touch icon). 17× oversampled for the 40 px header; final.

- Accent text on light backgrounds uses `#0E7C8C` (4.9:1, WCAG AA); brand cyan `#1BB7CD` for buttons, fills and text on navy. Final.
- Logo pinned top-left in Arabic as well as English (brand consistency over RTL convention). Final.
- WhatsApp number `+20 106 239 9941` (official contact page). Final.
- Contact address: Dr. Sayed Abdel Wahed Street, Korba, Heliopolis, Cairo (official contact page). Final.
- Social profiles: LinkedIn, Facebook, Instagram as linked from the official site footer. Final.
- No analytics installed; the privacy page states that. Add later only with a CSP update (see README).
