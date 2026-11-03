# 03. Paid ads: funding, structure, rules

Platforms: **Meta Ads** (Facebook + Instagram) and **TikTok Ads**. LinkedIn Ads is optional in phase 2 once the cost per founding sign-up from Meta is known (LinkedIn targets job titles precisely but costs more per click; test it only with a fixed cap).

No budget figure is set in this document on purpose. The campaign owner sets the **weekly envelope (B)** every Sunday; everything below is expressed as shares of B and multiples of the target cost per result.

## 0. Prerequisites (before the first paid riyal or pound)

| # | Item | Owner | Status to confirm |
|---|---|---|---|
| 1 | Business Manager + ad account in the company's name, two admins, 2FA on both | Campaign owner | ☐ |
| 2 | Payment method in the company's name; monthly spending limit on the account = 4 × B | Campaign owner / finance | ☐ |
| 3 | Domain `seg-audit.com` verified in Meta Business Manager | Ads manager | ☐ |
| 4 | **Conversion tracking on app.seg-audit.com**: Meta Pixel + Conversions API and TikTok Pixel + Events API, firing `CompleteRegistration` on sign-up. The marketing site sends no third-party scripts (CSP) and needs none: ads link straight to the app | App team | ☐ **Blocker for conversion-optimised campaigns** |
| 5 | The app keeps the UTM parameters of the sign-up in the account record (so CRM can tell which ad filled which seat) | App team | ☐ |
| 6 | Lead hand-off: every sign-up creates a CRM lead on erp.seg-audit.com with source and UTM | App / CRM | ☐ |

Until item 4 is live, run only **phase 1** below with Meta Instant Forms (leads stay inside Meta and are exported daily to CRM), and do not use conversion objectives.

### Funding control

- Spend is approved weekly (B) and monthly (4 × B) by the campaign owner. The ads manager can move money **between ad sets inside B**, never above it.
- Finance reconciles platform invoices to the ad change log monthly: every charge maps to a campaign that was approved.
- Each platform's account spending limit is the hard stop. A daily check confirms spend-to-date ≤ pace (see the monitoring checklist).

## 1. Campaign structure

Naming: `SEG-FM | <platform> | <objective> | <audience> | <lang> | <yyyy-mm>`; ad set and ad names carry the asset file name, e.g. `seats-ar_1080x1350`.

### Meta

| Campaign | Objective | Ad sets | Creatives | Share of B |
|---|---|---|---|---|
| **FM-Prospecting** | Leads (Instant Form) in phase 1; Sales/Leads optimised for `CompleteRegistration` in phase 2 | (1) Egypt: finance and accounting job interests + business owners, 28–60; (2) KSA: same; (3) Odoo / ERP interest stack (both countries) | `ads/meta-feed-4x5_seats-ar`, `ads/meta-feed-1x1_seats-ar`, `social/story_seats-ar` (Stories/Reels), `live-ar` set as the second angle; EN only in a separate ad set for KSA expat finance roles | 60% |
| **FM-Retargeting** | Same objective | Website + app visitors 30 days, page/profile engagers 60 days, video viewers 50%+ | `seats-ar` with the scarcity line; testimonial creative when one is approved | 25% |
| **FM-Lookalike** (phase 2, after 100+ sign-ups) | Same | 1–3% lookalike of sign-ups (hashed, with consent per the privacy policy) | Best two creatives from prospecting | 15% (until then, add to prospecting) |

Placements: Advantage+ placements, with the 4:5 asset for feeds and the 9:16 asset for Stories/Reels supplied explicitly.

### TikTok

| Campaign | Objective | Ad groups | Creatives | Share |
|---|---|---|---|---|
| **FM-TikTok** | Traffic in phase 1 (landing page views), Web conversions in phase 2 | Egypt 25–55 business/finance interests; KSA same | `ads/tiktok-9x16_seats-ar`, `ads/tiktok-9x16_live-ar` as a static open, plus the founder's short videos (scripts in `content/week-1/tiktok.md`) | Tested inside B: start at 15% of B taken equally from Meta prospecting, keep only if it meets the rules below |

## 2. Budget rules

- **Learning period**: no edits to an ad set for the first 3 days or until ~50 results, whichever comes first, except the hard stops below.
- **Target cost per result (T)**: set in week 2 from the median cost per lead / sign-up of week 1. Write it in the weekly report. Until then the rules use the account's running median.

### Pause the loser

| Signal | Action |
|---|---|
| Ad spent **2 × T** with zero results | Pause the ad |
| Ad set cost per result **> 1.5 × T** for 3 consecutive days after learning | Pause the ad set; move its budget to the best ad set in the same campaign |
| Link CTR (Meta) below **0.5%** after 2,000 impressions, or TikTok 2-second view rate below **30%** | Pause the creative; brief a new variant |
| Frequency **> 3.0** in 7 days (prospecting) or **> 6.0** (retargeting) and cost per result rising | Creative fatigue: rotate in a new variant, do not raise budget |
| Negative comments > 5% of comments, or any policy warning | Pause and escalate to the campaign owner the same day |

### Scale the winner

| Signal | Action |
|---|---|
| Ad set cost per result **≤ 0.8 × T** for 3 consecutive days with ≥ 10 results | Raise its daily budget by **20%**; at most once every 48 hours |
| Same creative wins in two countries / ad sets | Duplicate it into the retargeting campaign with the scarcity line |
| Ad set held its CPA after two 20% raises | Duplicate into a fresh ad set at +50% instead of raising further (keeps the original stable) |
| Total weekly spend would exceed B | Stop scaling; request a higher envelope in the Thursday report |

### Hard stops (any day, no waiting)

- Daily spend of the account > 1.3 × (B / 7) → find the cause, cap the campaign budgets.
- Landing page or sign-up broken → pause everything that links there until fixed.
- Counter switched on (see 01-operating-system.md) → replace seat creatives with the regenerated ones (new ads; pause the old).
- All 50 seats filled → pause every Founding Members campaign the same day.

Every change goes into `templates/ad-change-log.csv` with date, platform, object, old → new, rule applied, and who made it.

## 3. Creative rotation

Start each ad set with **three ads**: `seats-ar` (scarcity), `live-ar` (product), and one founder video once recorded. Retire an ad only by the rules above, never by taste. Every Monday the designer prepares one new variant per active angle so there is always a replacement ready.

## 4. Lead handling (paid leads cost money: they never wait)

1. Leads exported from Meta / TikTok into CRM every morning at 09:30 (or synced automatically once the integration exists).
2. Contacted by WhatsApp within 24 hours, with the founding page link (`utm_source=whatsapp&utm_medium=sales`).
3. CRM stage and the ad that produced the lead recorded, so cost per **seat filled** (not just per lead) appears in the weekly report.
