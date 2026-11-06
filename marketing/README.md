# SEG Audit launch: marketing operating system

Everything the marketing team needs to run the **Founding Members** launch day by day. Arabic first, bilingual where it helps. Nothing here is published automatically: every post, ad and message goes through the publishing workflow and a named approver.

## The campaign in one screen

| | |
|---|---|
| Product | **SEG Audit**, the continuous audit platform from MFT (app.seg-audit.com) |
| Offer | **Founding Members programme**, by application only (MFT reviews every application by hand; not every one is accepted), 50 companies at most, at the **founder price** (its terms are written in the acceptance letter; billing does not yet support «for life», `PENDING-DECISIONS.md` #3). **No seat numbers anywhere**: the 17 / 33 figures were withdrawn (they were existing Odoo customers, not platform users) |
| Lead magnet (CEO) | **«فحص مجاني لميزان شركتك يكشف نقاط الخطر في دقائق»**: trial-balance indicators (three of the five, suspense, manual and backdated entries, need an Odoo connection, `PENDING-DECISIONS.md` #8) (suspense accounts, abnormal balances, imbalance, heavy manual entries, backdated entries). Never called a free report or an audit report |
| Launch angle (6 Nov 2026) | **Closing window + selectivity**: «سعر المؤسِّس يُغلق نهائيًا الإثنين 30 نوفمبر 2026، 11:59 مساءً بتوقيت القاهرة + العضوية بالطلب، ومش كل طلب بيتقبل». One source for the date: `src/site.config.js → founding.closesAt` (working assumption; the CEO confirms). Calendar to the close: [content/november-calendar.md](content/november-calendar.md) |
| Every CTA | `https://app.seg-audit.com/ar/signup` (or `/en/signup`) with UTM tags, see [UTM scheme](workflow/05-kpis-and-reporting.md#utm-scheme) |
| Website | `/ar/founding-members/` and `/en/founding-members/`, a launch bar on every page, a band on the home page |
| Counter | **Retired as a scarcity device** (6 Nov 2026). The site config still has `showCount: true`; switching it off is a separate site decision and a gate before any paid launch. Claims check before every post: `node scripts/close-date.js --check` |

### Two tracks

| Track | Audience | Goal | Main channels | North-star metric |
|---|---|---|---|---|
| **A. Acquisition** | Prospects: finance managers, CFOs, owners, chief accountants, Odoo users in Egypt and KSA | Fill the 50 founding seats | LinkedIn, Facebook, Instagram, X, YouTube, TikTok, Meta Ads, TikTok Ads | Founding sign-ups (seat claimed) |
| **B. Retention & Growth** | Every company that signs up and takes a founding seat | Activate, keep, collect proof, get referrals | WhatsApp 1:1, email, onboarding calls, LinkedIn (with consent) | Active founding members, testimonials collected, referrals |

**Sales playbook:** [sales/README.md](sales/README.md). Every motion is tied to one of the CEO's reference numbers (CAC ≤ $2,500, ARPA $6,000, NRR ≥ 115%, payback ~6 months); nothing is spent, published or promised to a partner without the CEO's approval.

Track B feeds track A: every testimonial, case study and referral from a founding member becomes proof for the seats still open. Existing MFT Odoo customers are **not** SEG Audit users and are not addressed as founding members.

## Folder map

```
marketing/
  README.md                         this file
  workflow/
    01-operating-system.md          daily + weekly cadence for both tracks, roles, the seat-count rule
    02-publishing-workflow.md       draft → review → approve → schedule → publish → log
    03-paid-ads.md                  funding, campaign structure, budget split, pause-loser / scale-winner rules
    04-daily-monitoring.md          the daily checklist per platform
    05-kpis-and-reporting.md        weekly KPIs, UTM scheme, weekly report template
    06-sales-operating-rhythm.md    the sales day, week, month and quarter, merged with the marketing cadence
    templates/
      content-log.csv               one row per published item (the log in step 6)
      weekly-report.md              copy this every Thursday
      ad-change-log.csv             every budget or status change in Ads Manager
  sales/                            the B2B sales playbook (PLG → PQL, partner/reseller programme, ABM, founder-led
                                    and LinkedIn selling, outbound + nurture + retargeting, Odoo 19 CRM stages and
                                    scoring with import CSVs, MEDDPICC, demo/webinar/case studies, unit-economics model);
                                    start at sales/README.md
  brand/                            the brand identity kit, profile assets per platform, profile text, implementation checklist
  content/
    week-1/                         Arabic launch drafts per platform, both tracks (track B: track-b-new-members.md)
    video-storyboards.md            shot lists + voice-over for the short videos and the founder POV clip
  designs/
    README.md                       every file, size and where it is used
    index.html                      review sheet (open locally)
    social/ ads/ covers/            WebP + JPG, generated by scripts/launch-images.js (standard placements)
    concepts/                       the creative concepts: hook 360, self-audit, before/after, zero guesswork,
                                    hemicycle, carousel (+PDF), video frames + storyboards, founder POV overlay
                                    generated by scripts/launch-concepts.js; see concepts/README.md
```

## Regenerating the designs

```bash
PLAYWRIGHT_PATH=<path to playwright> node scripts/launch-images.js
```

For the creative concepts: `node scripts/launch-concepts.js` (same requirements). Same requirements as `scripts/article-images.js` (Playwright + Google Chrome). Pass a filter to render a subset, e.g. `node scripts/launch-images.js story_`. The founding page og:image (`src/assets/img/launch/founding-og-{ar,en}.jpg`) is written by the same run.

## Rules that never bend

1. **No invented numbers.** Only the cap of 50 and the platform figures already on the site (`src/content/platform-facts.js`). No savings claims, no "X% fewer errors", no client amounts.
2. **No customer named without written consent.** Founding members are a count, not a logo wall, until each one says yes in writing.
3. **No member count in public, ever, in this launch.** No «انضمت X شركة», no «باقي X», no «X من 50». The only countdown allowed is to the real close date in `founding.closesAt`, and that date is never extended once published.
4. **Nothing is "fraud" or "a misstatement".** We talk about findings and exceptions with evidence, never accusations.
5. **Every link carries UTM tags.** An untagged link is a post that cannot be measured.
6. **The free offer has one description**: «فحص مجاني لميزان شركتك يكشف نقاط الخطر في دقائق» / "A free check of your company’s trial balance that flags its risk points in minutes". Never «تقرير مجاني», never "audit report".
7. **One approver per item**, named in the content log, before anything is scheduled.
