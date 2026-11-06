# Implementation checklist, platform by platform

Apply **one platform at a time, only after the campaign owner approves that platform's line items**. Tick each box as it goes live and record the date. All asset paths are relative to `marketing/brand/assets/`; upload the **PNG** (WebP is for the web). Text comes from [profiles.md](profiles.md).

Before starting on any platform:
- [ ] Screenshot the current profile (avatar, cover, name, bio, links) and save it, so every change can be reverted
- [ ] Confirm the handle is free (search `@modernfintech` on that platform); if not, use `@mftfintech` and note it here
- [ ] Open the asset on a phone once to check the crop

| Platform | Avatar | Cover / banner | Name | Handle | Bio | Website | Approved by | Live on |
|---|---|---|---|---|---|---|---|---|
| LinkedIn page | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | | |
| Facebook page | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | | |
| Instagram | ☐ | highlights ☐ | ☐ | ✓ | ☐ | ☐ | | |
| YouTube | ☐ | ☐ + watermark ☐ | ☐ | ☐ | ☐ | ☐ | | |
| TikTok | ☐ | n/a | ☐ | ☐ | ☐ | ☐ | | |
| X | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | | |
| WhatsApp Business | ☐ | n/a | ☐ | n/a | ☐ | ☐ | | |
| Website footer (repo) | n/a | n/a | n/a | n/a | n/a | URLs in `site.config.js` ☐ | | |

---

## 1. LinkedIn company page (linkedin.com/company/92779112)

Where: the page in admin view → **Edit page**.

- [ ] **Logo** ← `avatars/avatar_linkedin_400x400.png`
- [ ] **Cover** ← `covers/linkedin-company-cover_1128x191.png` (check on desktop: the logo overlaps the bottom-left, and the copy is clear of it)
- [ ] **Name** = Modern Financial Technology (MFT)
- [ ] **Public URL** = `modernfintech` if available. Changing it alters the page link: update `site.config.js → social.linkedin` in the same week
- [ ] **Tagline** = AR tagline (profiles.md)
- [ ] **Overview** = AR + EN overview (profiles.md)
- [ ] **Website** = https://www.seg-audit.com · **Industry** = Accounting · **Specialties** (profiles.md)
- [ ] **Custom button** = Visit website → https://www.seg-audit.com

API: LinkedIn's organization APIs need Community Management API access; use the admin UI.

## 2. Facebook page "Modern Financial Technology" (facebook.com/Fintech2030)

Where: switch into the Page → **Edit** profile / **Settings → Page setup**.

- [ ] **Profile picture** ← `avatars/avatar_facebook_720x720.png`
- [ ] **Cover photo** ← `covers/facebook-page-cover_1640x624.png` (check desktop and phone: the phone crops the sides; the copy sits in the centre)
- [ ] **Name** = Modern Financial Technology (MFT) (optional; Facebook reviews it)
- [ ] **Username** = `modernfintech` if available. **Before changing**, confirm old links redirect; then update `site.config.js → social.facebook`
- [ ] **Category** = Financial Service, Accountant, Software Company
- [ ] **Intro** = AR intro (profiles.md)
- [ ] **Website / email / phone / address** (profiles.md)
- [ ] **Action button** = Send WhatsApp message → +20 106 239 9941

API: some Page fields can be set through the Graph API with a Page token; the Page UI is the dependable path.

## 3. Instagram (@modernfintech)

Where: profile → **Edit profile** (Business/Creator account).

- [ ] **Profile picture** ← `avatars/avatar_instagram_1080x1080.png`
- [ ] **Name** = Modern Financial Technology (MFT)
- [ ] **Bio** = AR bio (profiles.md; keep the line breaks)
- [ ] **Links** = www.seg-audit.com + the tagged app link (profiles.md)
- [ ] **Category** = Financial Service · **Contact options** = email + phone (profiles.md)
- [ ] **Highlights**: create from story archive, covers ←
  - [ ] `highlights/instagram-highlight_01-platform_1080x1920.png` → «SEG»
  - [ ] `highlights/instagram-highlight_02-founders_1080x1920.png` → «المؤسِّسون» (أيقونة مفتاح، بلا عدّ)
  - [ ] `highlights/instagram-highlight_03-trust_1080x1920.png` → «الثقة»
  - [ ] `highlights/instagram-highlight_04-insights_1080x1920.png` → «المقالات»
  - [ ] `highlights/instagram-highlight_05-contact_1080x1920.png` → «تواصل»

API: the Instagram API does not edit the profile picture or bio; use the app.

## 4. YouTube

Where: **YouTube Studio → Customisation** (tabs: Profile, Branding).

- [ ] **Handle decision first**: @modernfintech is held by "ModernFinTech4k". If that is MFT's channel, use it; otherwise claim **@mftfintech**
- [ ] **Picture** ← `avatars/avatar_youtube_800x800.png`
- [ ] **Banner** ← `covers/youtube-channel-banner_2560x1440.png` (Studio previews TV, desktop and mobile; all copy is in the safe area)
- [ ] **Video watermark** ← `watermark/youtube-watermark_150x150.png`, entire video
- [ ] **Name** = Modern Financial Technology (MFT) · **Description** (profiles.md) · **Links** · **Contact email**
- [ ] Then add the channel URL to `site.config.js → social.youtube`

API: YouTube Data API v3 supports the banner (`channelBanners.insert` then `channels.update`), the description and keywords (`channels.update` brandingSettings) and the watermark (`watermarks.set`), with OAuth by a channel owner. The profile picture is UI-only.

## 5. TikTok

Where: profile → **Edit profile** (switch to a Business account for category and the website link).

- [ ] **Username decision**: @modernfintech if free, else @mftfintech
- [ ] **Photo** ← `avatars/avatar_tiktok_720x720.png`
- [ ] **Name** = Modern Financial Technology · **Bio** = AR bio (profiles.md)
- [ ] **Website** = https://www.seg-audit.com (only shows once the account meets TikTok's eligibility rules)
- [ ] Then add the profile URL to `site.config.js → social.tiktok`

API: no public API for profile edits; use the app.

## 6. X

Where: profile → **Edit profile**.

- [ ] **Handle decision**: @modernfintech if free, else @mftfintech
- [ ] **Header** ← `covers/x-header_1500x500.png` · **Photo** ← `avatars/avatar_x_400x400.png`
- [ ] **Name** = Modern Financial Technology (MFT) · **Bio** = AR bio · **Location** = Cairo, Egypt · **Website** = https://www.seg-audit.com
- [ ] Add the profile URL to `site.config.js → social` (add an `x` key; the footer already knows the label)

API: X API profile endpoints (`update_profile`, `update_profile_image`, `update_profile_banner`) depend on the access tier; verify before relying on them.

## 7. WhatsApp Business (+20 106 239 9941)

Where: WhatsApp Business app → **Settings → Business tools → Business profile**.

- [ ] **Photo** ← `avatars/avatar_whatsapp_640x640.png`
- [ ] **Name, category, about, description, email, website, address** (profiles.md)
- [ ] **Hours**: set by the team (not published anywhere today)

## 8. LinkedIn founder profile (optional)

- [ ] **Background photo** ← `covers/linkedin-personal-banner_1584x396.png` (the founder applies it himself)

## 9. After all platforms

- [ ] Update `src/site.config.js → contact.social` with the final URLs (YouTube and TikTok are empty today and do not render until set), open a PR, rebuild and deploy
- [ ] Search each handle on each platform from a logged-out browser and check the avatar, name and cover look identical
- [ ] Record the final names, handles and URLs in the table at the top
