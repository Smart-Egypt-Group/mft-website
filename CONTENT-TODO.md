# Content & decision slots (Session 2 handoff)

Everything below is either placeholder copy written in the approved hero voice, or a decision that belongs to Ahmed. Keys refer to `src/content/en.js` / `src/content/ar.js` unless noted. Approved and locked: the hero headline, subhead, CTA and the five trust badges.

## Decisions (Ahmed)

| # | Decision | Where | Status |
|---|---|---|---|
| 1 | Production domain (old `www.mft-eg.com` has a broken TLS certificate) | `site.config.js → siteUrl` | open |
| 2 | Pricing model: fixed packages (Starter / Growth / Enterprise) or indicative ranges — execution plan §4 | `home.pricing`, `site.config.js → showPricingSlot` | open; slot shows structure, no prices |
| 3 | Hero variant for launch: A (trust strip, primary pick) or B (split dashboard) | `site.config.js → heroVariant` | A set; both previewable |
| 4 | Accent colour for text on white: brand cyan fails AA (2.4:1); site uses deep cyan `#0E7C8C` (4.9:1) for eyebrows, links and the "numbers" accent. Confirm, or approve a different AA-compliant tint | `main.css → --cyan-text` | needs sign-off |
| 5 | Logo position in Arabic: kept **top-left** per brand rule (RTL web convention would be top-right) | `main.css → .header-inner` | needs sign-off |
| 6 | WhatsApp business number (currently first phone) | `site.config.js → contact.whatsapp` | confirm |
| 7 | Analytics tool (none installed) | `site.config.js → analytics` | open |
| 8 | Lead destination: Odoo CRM via `functions/lead.js` needs a DB name + API user | host env vars | open |

## Copy slots (Session 2)

| Page | Key | What is there now |
|---|---|---|
| All | `meta.description`, per-page `description` | draft meta descriptions |
| Home | `home.positioning` | "only integrated provider" message from the competitor plan — draft |
| Home | `home.how.steps` | 4-step engagement model — draft |
| Home | `home.caseStudy` | reserved slot; no anonymised results published (plan week 10) |
| Home | `home.cta` | free first report offer — confirm the offer wording |
| Services | `services.items[*]` (7) | tagline, 2 paragraphs, deliverables, "who it is for" per service — draft |
| Industries | `industries.items[*]` (5) | short, 3 challenges, 3 ways MFT helps — draft |
| About | `about.story`, `about.values`, `about.credentials` | draft; founding year and CEO name missing |
| About | `about.team` | role titles only; names, bios, photos, LinkedIn missing |
| About | `about.offices` | one line per country; addresses missing |
| Contact | `contact.details.hours` | Sun–Thu 9–18 assumed — confirm |
| Footer | `footer.blurb`, `footer.privacy` | draft; privacy policy page does not exist yet |
| Config | `contact.offices[].line`, `contact.social` | empty — not rendered until filled |

## Facts used (all pre-approved; add nothing without a source)

- CPA-led team · Odoo Certified Partner · ISO-aligned internal controls · 500+ reports delivered · Egypt · Saudi Arabia · US
- Contact: info@seg-audit.com, +20 106 239 9941, +20 104 005 7520 (official contact page, 31 Aug 2026)
- Dashboard numbers in hero B are labelled "Sample / illustrative" and must stay labelled or be replaced with real figures.
