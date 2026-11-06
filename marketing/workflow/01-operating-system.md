# 01. Operating system: roles and cadence

The team works in Cairo time (EET, UTC+2) on a Sunday to Thursday week, the working week of both target markets (Egypt and KSA). KSA is one hour ahead (UTC+3); post times below are set for the overlap where both markets are online.

## Roles (one name per role, write it in the log)

| Role | Owns | Decides |
|---|---|---|
| **Campaign owner** (Ahmed or delegate) | Offer, seats filled (internal), budget ceiling, final approval of anything new (new claim, new ad angle, new spend) | Go / no-go, budget changes above the weekly envelope |
| **Content lead** | Drafts, calendar, captions, comments policy | Copy within approved angles |
| **Designer** | Generator runs, new variants, platform resizes | Layout within the brand system |
| **Ads manager** | Meta Ads + TikTok Ads, daily checks, rule-based pause/scale | Moves inside the weekly envelope per [03-paid-ads.md](03-paid-ads.md) |
| **Community / sales response** | Comments, DMs, WhatsApp replies within SLA, hand-off of leads | Reply wording from the approved FAQ |
| **Customer success** (track B) | Each new founding member: onboarding, check-ins, testimonials, referrals | Session scheduling, escalation to product |

Sales roles (account executive, SDR, partner manager, RevOps, founder) and the sales blocks of the same day are in [06-sales-operating-rhythm.md](06-sales-operating-rhythm.md).

One person can hold several roles. The approver must not be the drafter for the same item (segregation of duties).

## Daily cadence

| Time (Cairo) | Track | Block | Output |
|---|---|---|---|
| 09:00–09:15 | Both | **Stand-up** (15 min): yesterday's numbers, today's posts, seats filled (internal), blockers | Internal seat tally updated |
| 09:15–09:45 | A | **Monitoring pass 1**: [04-daily-monitoring.md](04-daily-monitoring.md) for every platform and both ad accounts | Monitoring row filled; any rule-based ad action logged |
| 09:45–11:00 | A | **Publish slot 1** (LinkedIn, X, Facebook) at the scheduled times; first-hour engagement: reply to every comment | Content log updated (step 6 of the publishing workflow) |
| 11:00–12:30 | B | **Founding members block**: today's touchpoints from the track B plan (welcome, onboarding call, check-in, testimonial ask, referral ask) | CRM activity per member; consent captured in writing where asked |
| 12:30–14:00 | A | **Produce**: next day's drafts and design variants, submitted for review by 14:00 | Drafts in "Review" |
| 14:00–15:00 | Both | **Review and approve** tomorrow's items | Items in "Approved" → scheduled |
| 16:00–17:00 | A | **Leads**: every sign-up and DM from the last 24h contacted (WhatsApp/phone) | CRM leads with source + UTM |
| 19:00–21:00 | A | **Publish slot 2** (Instagram, TikTok, Facebook, YouTube Shorts): evening is peak for these | Content log updated |
| 21:00–21:15 | A | **Monitoring pass 2**: ads spend pace, comment queue at zero | Notes for tomorrow's stand-up |

Response SLA: comments and DMs within **2 working hours**; sign-ups contacted within **24 hours**. Weekend (Fri/Sat): one check per day on DMs and ad spend, no new posts unless scheduled.

## Weekly cadence

| Day | Track | Ritual | Output |
|---|---|---|---|
| **Sunday** | Both | **Weekly planning** (45 min): last week's report, this week's calendar, angles, budget envelope | Calendar locked; budget envelope approved by the campaign owner |
| **Monday** | A | **Creative refresh**: new variants for any ad flagged as fatigued; rerun the generators if the copy changed | New assets in Review |
| **Tuesday** | B | **Founding members review**: status of every founding member (active, onboarded, at risk), testimonials and referrals pipeline | Track B table updated |
| **Wednesday** | A | **Ads deep-dive**: audience and creative breakdown, scale/kill decisions above the daily rules | Ad change log |
| **Thursday** | Both | **Weekly report** ([templates/weekly-report.md](templates/weekly-report.md)) sent to the campaign owner by 15:00 | Report + next week's asks |

## Track B: each new founding member, first four weeks after sign-up

| Week | Touchpoint | Channel | Goal |
|---|---|---|---|
| 1 | Personal welcome: «أهلًا بكم بين الأعضاء المؤسِّسين» | WhatsApp 1:1 from the founder, then email | Recognition; open the conversation |
| 1–2 | Onboarding session (30–45 min): every report running on their data | Call / screen-share | Activation |
| 2 | Check-in: «ما أول ملاحظة فاجأتك؟» | WhatsApp | Value moment; testimonial raw material |
| 3 | Testimonial or case study ask, with consent form (named / anonymous / no) | Call, then written consent by email | Proof for track A |
| 3–4 | Referral ask: «المقاعد التأسيسية 50 فقط، بسعر مؤسِّس مدى الحياة. من تعرف يستفيد؟» (no remaining-seat number while the counter is off) | WhatsApp | Warm leads for track A |

Track B status per member lives in the CRM (Odoo, erp.seg-audit.com) with one activity per touchpoint. Never post anything that identifies a member without written consent.

## Scarcity: closing window + selectivity (6 Nov 2026)

The seat counter is **retired as a public device**. The 17 / 33 figures were withdrawn (existing Odoo customers, not platform users), and no new count is published in this launch. Seats filled stay an **internal** number in the weekly report.

Public scarcity has two parts, both backed by fact:

1. **Closing window.** The founder price disappears for good at `src/site.config.js → founding.closesAt` (working assumption: Monday 30 November 2026, 11:59 pm Cairo; the CEO confirms). Once published, the date is **never extended**. To move it before it is published: change `closesAt`, run `node scripts/close-date.js --from <old ISO>`, then `--check`.
2. **Selectivity.** Membership is by application; MFT reviews each one by hand (stated on `/ar/founding-members/apply/`), and not every application is accepted. An approved seat is held 14 days for sign-up and the Odoo connection. Publish the acceptance criteria before using «not everyone is accepted» in ads.

Rules:
- «Founder price» is the name. No numeric price in any ad until one price list is approved. «For life» is stated in the **acceptance letter**, not promised as billing in a post.
- `node scripts/close-date.js --check` must pass before anything is scheduled.
- At the close: every ad that mentions the founder price stops at the same minute (set the ad End date to `closesAt`), the site switches to the waitlist / full-price message, and the 1 December post says the programme closed.
- The site still shows `showCount: true`; turning it off is a separate site decision and a gate before any paid launch (`sales/meta-build-sheet.md` B5).
