# 02. Publishing workflow

Six stages. An item moves forward only when the exit check of its stage is met. Every item has an ID: `w<week>-d<day>-<platform>-<track>-<n>`, e.g. `w1-d1-li-a-1`. The same ID is the `utm_content` value.

```
Draft → Review → Approve → Schedule → Publish → Log
```

| # | Stage | Who | What happens | Exit check |
|---|---|---|---|---|
| 1 | **Draft** | Content lead / designer | Copy from `content/week-N/`, asset from `designs/`, link built with UTM | Item has ID, platform, track, copy, asset file name, tagged link, planned time |
| 2 | **Review** | A second person (not the drafter) | Runs the review checklist below | All boxes ticked, or returned to Draft with comments |
| 3 | **Approve** | Campaign owner (new claims, ads, anything about customers) or content lead (routine posts from approved angles) | Reads the final version as it will appear | Approver's name + date in the log |
| 4 | **Schedule** | Content lead | Meta Business Suite (Facebook + Instagram), LinkedIn page scheduler, X, YouTube Studio, TikTok Studio. Time from the calendar | Scheduled time matches the calendar; preview checked on mobile |
| 5 | **Publish** | Platform (scheduled) or community lead (manual) | Goes live. First hour: the author stays online to answer comments | Live URL copied |
| 6 | **Log** | Content lead | One row in `templates/content-log.csv`; 24h and 7-day numbers added later | Row complete |

## Review checklist (stage 2)

**Facts and claims**
- [ ] Every number is 50, 17, 33 or a platform figure already on the site. No savings, no percentages, no client amounts.
- [ ] Seat count matches today's `founding.filled`.
- [ ] No customer, logo or identifiable story without written consent on file.
- [ ] No word that implies fraud or a confirmed misstatement ("exceptions", "findings", "evidence" instead).

**Brand and language**
- [ ] Arabic first; Latin terms (SEG Audit, Odoo, MFT) kept as Latin.
- [ ] Asset is from `designs/` (or a new variant made by the generator), right size for the placement.
- [ ] No gold, no stock photos, no third-party logos.
- [ ] Tone: direct, calm, expert. No exclamation storms, no hype words («ثوري», «الأفضل في العالم»).

**Links and tracking**
- [ ] Link goes to app.seg-audit.com (sign-up) or the founding page, and opens.
- [ ] UTM tags follow the scheme; `utm_content` = item ID.
- [ ] Link in bio / description updated where the platform has no clickable links in posts (Instagram, TikTok).

**Platform fit**
- [ ] Caption length and hashtag count within the platform norm (see the content file header).
- [ ] Text on the creative sits inside the safe zone (stories/TikTok: designs already respect it).
- [ ] Alt text written (LinkedIn, X, Facebook, Instagram support it).

## Approval matrix

| Item | Approver |
|---|---|
| Organic post from an approved angle, approved asset | Content lead |
| Anything new: angle, claim, number, offer wording | Campaign owner |
| Any ad (new ad, new copy, new audience) | Campaign owner |
| Anything mentioning a founding member, even anonymous | Campaign owner + written consent on file |
| Replies to comments | Community lead from the approved FAQ; anything off-script goes to the campaign owner |

## Comment and DM policy

- Reply to every comment in the first hour, then within the 2-hour SLA.
- Price questions: «الأسعار وشروط العضوية التأسيسية في رسالة خاصة» → DM → WhatsApp → CRM lead.
- Criticism: answer once, publicly, with facts; move to DM. Never delete criticism; hide only spam and abuse.
- Questions about data security: link to `/ar/trust/` (the trust centre), never improvise.

## Stage definitions in the tracker

Use the same six stage names as columns in whichever board the team uses (Odoo Project, Trello, Notion). The log CSV is the system of record for what went live.
