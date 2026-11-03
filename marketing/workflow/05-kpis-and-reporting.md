# 05. KPIs, UTM scheme, weekly report

## Weekly KPIs

Targets are set by the campaign owner. Week 1 is the baseline week: record, do not judge. From week 2 each KPI gets a target in the report.

### The funnel (track A)

| Stage | KPI | Source | Note |
|---|---|---|---|
| Reach | Impressions and reach per platform; ad reach | Native analytics, Ads Manager | Organic and paid reported separately |
| Attention | Engagement rate (reactions + comments + shares + saves) / impressions; video 2-second and average watch time | Native analytics | Compare per format, not across platforms |
| Interest | Link clicks; founding page visits; app sign-up page visits by `utm_source` | Platform + app analytics | Founding page visits need analytics on the site (none installed today; see "gaps") |
| Lead | Sign-ups started; Meta / TikTok form leads; DMs asking about the offer | App, Ads, inboxes | Counted once per company |
| **Seat** | **Founding seats filled this week / to date (of 33)** | Campaign owner / CRM | The north-star number |
| Efficiency | Cost per lead, cost per sign-up, **cost per seat filled**, per platform and per creative | Ads + CRM | Cost per seat needs lead → seat matching in CRM |
| Speed | Median time from sign-up to first contact; % contacted within 24h | CRM | Target: 100% within 24h |

### Retention & growth (track B)

| KPI | Definition |
|---|---|
| Activated members | Of 17, members with at least one report run on their own data this month |
| Onboarding sessions done | Of 17 |
| At-risk members | No login / no report in 14 days, or an open complaint |
| Testimonials / case studies | Requested → consented → published |
| Referrals | Referrals received → contacted → seats filled from referrals |
| Expansion | Expansion conversations held → proposals → won (no amounts in public reports) |

### Content operations

| KPI | Definition |
|---|---|
| Plan adherence | Items published on the planned day / items planned |
| Review cycle time | Draft submitted → approved, median hours |
| Response SLA | % comments/DMs answered within 2 working hours |
| Ad hygiene | % of ad changes with a log row and a rule cited |

## UTM scheme

Base links:
- Sign-up (primary CTA): `https://app.seg-audit.com/ar/signup` or `/en/signup`
- Founding page (explainer): `https://www.seg-audit.com/ar/founding-members/` or `/en/…`

| Parameter | Values | Rule |
|---|---|---|
| `utm_source` | `linkedin`, `facebook`, `instagram`, `x`, `youtube`, `tiktok`, `whatsapp`, `email`, `website`, `partner` | The platform where the click happens, lowercase |
| `utm_medium` | `organic`, `paid`, `social-bio`, `owned`, `email`, `sales`, `referral` | `social-bio` = link in bio; `owned` = our website; `sales` = 1:1 WhatsApp from the team; `referral` = a founding member's own link |
| `utm_campaign` | `founding-members-2026` | One value for the whole launch; never change it mid-flight |
| `utm_content` | The item ID: `w1-d1-li-a-1`, or for ads the asset name: `seats-ar-4x5` | Lets the report tie a seat back to one post or creative |
| `utm_term` | Paid only: audience short name: `eg-finance`, `sa-finance`, `odoo-stack`, `rt-30d`, `lal-1` | |

Examples:

```
https://app.seg-audit.com/ar/signup?utm_source=linkedin&utm_medium=organic&utm_campaign=founding-members-2026&utm_content=w1-d1-li-a-1
https://app.seg-audit.com/ar/signup?utm_source=facebook&utm_medium=paid&utm_campaign=founding-members-2026&utm_content=seats-ar-4x5&utm_term=eg-finance
https://app.seg-audit.com/ar/signup?utm_source=whatsapp&utm_medium=referral&utm_campaign=founding-members-2026&utm_content=ref-<member-code>
```

The website already tags its own CTAs: `utm_source=website&utm_medium=owned&utm_campaign=founding-members-2026&utm_content=hero|how|final|home-band`.

Shorten links only with a shortener that keeps the full UTM string on redirect; record both the short and the full link in the content log.

## Measurement gaps (known, to close)

1. The app must keep UTM parameters with the sign-up (see [03-paid-ads.md](03-paid-ads.md#0-prerequisites-before-the-first-paid-riyal-or-pound), item 5). Until then, attribution is by platform-reported clicks and by asking every new sign-up «من أين عرفت عنّا؟».
2. The marketing site has no analytics (privacy page states so). Founding page visits are inferred from app-side referrers. Adding analytics needs a privacy page and CSP update first.
3. Seat filled = a CRM stage the campaign owner defines (paid / contract signed). Write the definition in week 1's report so the count is never argued.

## Weekly report

Copy [templates/weekly-report.md](templates/weekly-report.md) to `reports/<yyyy-mm-dd>.md` (or the shared drive) every Thursday. Numbers come from the content log, the ad change log, the monitoring sheet and CRM; every number cites its source.
