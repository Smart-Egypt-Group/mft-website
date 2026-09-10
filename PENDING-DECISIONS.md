# Pending decisions (Ahmed)

All site copy is final. Only the three items below are open. Each is marked in exactly one place in the code, so nothing else needs to change when a decision lands.

| # | Decision | Where to apply it | Current state |
|---|---|---|---|
| 1 | **Production domain** — buy `mftfintech.com` or fix the certificate on `mft-eg.com` | `src/site.config.js → siteUrl` (one line, boxed comment) | `https://PENDING-DOMAIN.example`. `npm run check` prints a warning until it is set. Drives canonical, hreflang, sitemap, robots, OG. |
| 2 | **Pricing packages** — fixed packages vs. indicative ranges, and the prices | `src/site.config.js → showPricingSlot` (flip to `true`), prices into `home.pricing.tiers` in both content files | Section fully written (Starter / Growth / Enterprise, no prices) and **hidden**. |
| 3 | **Vector logo** — SVG/AI from Ahmed or extracted from the PSD | replace `src/assets/logo/mft-lockup-navy.png`, `mft-lockup-white.png`, `mft-mark-navy.png` with SVGs; update the `<img>` tags in `src/templates/layout.js` | Trimmed PNGs from the official pack (1400 px lockups, 512 px mark). Fine on standard screens, slightly soft on retina. |

## Blocked, not a decision

**Odoo CRM link for the lead form.** Creating the API user on `erp.seg-audit.com` is blocked by the VPS database bug (see the `project_odoo_fintech` memo). Until an admin fixes it:

- Leads are accepted (200) and written in full to the Netlify function log (`Functions → lead → Logs`). Nothing is lost, but someone has to read the log.
- **Workaround ready:** `functions/lead.js` can post through Odoo's public website-form route, which needs no API user. Set `ODOO_WEBSITE_FORM_URL=https://fin-tech.odoo.com` in the host and submit one test lead to verify it appears in CRM. The CSRF/session handshake was verified read-only on 10 Sep 2026; the POST itself has not been exercised against production.
- Or set `LEAD_WEBHOOK_URL` to any Zapier / Make / Slack webhook as an interim inbox.

## Decided and implemented (no action)

- Accent text on light backgrounds uses `#0E7C8C` (4.9:1, WCAG AA); brand cyan `#1BB7CD` for buttons, fills and text on navy. Final.
- Logo pinned top-left in Arabic as well as English (brand consistency over RTL convention). Final.
- WhatsApp number `+20 106 239 9941` (official contact page). Final.
- Contact address: Dr. Sayed Abdel Wahed Street, Korba, Heliopolis, Cairo (official contact page). Final.
- Social profiles: LinkedIn, Facebook, Instagram as linked from the official site footer. Final.
- No analytics installed; the privacy page states that. Add later only with a CSP update (see README).
