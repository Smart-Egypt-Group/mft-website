# PR brief for Yasser: conversion tracking on app.seg-audit.com

> **What this is:** instructions for a PR on the platform repo `Smart-Egypt-Group/seg-audit`, to be written, reviewed and merged by Yasser. Marketing does not push to that repo.
> **Approved by:** the CEO, 4 Nov 2026, together with the website pixel.
> **Why:** paid ads ([`sales/paid-ads-kit.md`](../sales/paid-ads-kit.md), gates G3 and G4) can only optimise for, and report on, sign-ups once the app reports them.

## What already exists (website, live since 4 Nov 2026)

| | |
|---|---|
| **Meta Pixel ID** | `501774495051160`. The app uses the **same** pixel/dataset, so website → sign-up is one journey |
| **Events on www.seg-audit.com** | `PageView` on every page. `Lead` on the free-check CTA |
| **Code** | `mft-website/src/scripts/pixel.js` (IDs in `src/site.config.js → analytics`) |
| **UTMs** | The website forwards the ad's `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` and `utm_term` to every sign-up link. The site placement goes in `cta` (`hero`, `tb-check`, `how`, `final`, `home-band`) |

A sign-up link from an ad looks like this:

```
https://app.seg-audit.com/ar/signup?utm_source=meta&utm_medium=paid&utm_campaign=founding-members-2026&utm_content=m-eg-bait-ar&cta=tb-check
```

## Scope of the PR

### 1. Keep the UTMs (gate G3)

- On the sign-up page, read `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `cta` and `fbclid` from the URL.
- Hold them through the sign-up flow (sessionStorage or a hidden form field), and persist them **first-touch** on the new account / organisation record:
  - Do not overwrite on later logins.
  - Cap each value at 100 characters.
- Pass them to the CRM lead created on `erp.seg-audit.com` (source fields or a note), so cost per **paid seat** can be computed.

### 2. Meta Pixel + Conversions API (gate G4)

- **Browser (pixel):**
  - Load the Meta base code on the public sign-up pages with `PageView`.
  - **`CompleteRegistration`** fires once, **after the server confirms the account was created** (not on button click), with an `eventID`:

    ```js
    fbq('track', 'CompleteRegistration', { content_name: 'founding-signup', status: true }, { eventID: '<registration-uuid>' });
    ```

- **Server (Conversions API):** send the same event, with the same `event_id`, so Meta deduplicates it.
  - `event_name: 'CompleteRegistration'`, `action_source: 'website'`, `event_source_url`, `event_time`.
  - `user_data`: `client_ip_address`, `client_user_agent`, `fbp` (the `_fbp` cookie) and `fbc` (the `_fbc` cookie, or built from `fbclid`).
  - Hashed email and phone (SHA-256 after normalising) **only if** the app's privacy terms disclose it (see 4).
- **The access token** is a server secret, in the secrets vault like the other credentials. It never goes to the browser, and never into the repo.
- **On/off switch:** environment variables `META_PIXEL_ID` and `META_CAPI_TOKEN`; when empty, nothing loads and nothing is sent. Production is set by the CEO.
- **Optional (useful for optimisation later):** a custom event `TrialBalanceChecked` when the first free trial-balance check finishes. This is the PQL signal.

### 3. TikTok Pixel + Events API (placeholder)

- Same pattern, behind `TIKTOK_PIXEL_ID` and `TIKTOK_EVENTS_TOKEN`, which stay **empty until the CEO provides the ID**.
- Event `CompleteRegistration`, with the same `event_id` in the browser and the server.

### 4. Privacy, and what must never be sent

- **Never send financial data** to Meta or TikTok: no trial-balance figures, accounts, entries, file names, company names or report content. Only the registration event and the identifiers above.
- **Update the app's privacy policy before this goes live:** Meta Pixel and Conversions API, the `_fbp`/`_fbc` cookies, the purpose (measuring ads), and how to opt out.
- The read-only promise to Odoo is unaffected; this touches only the sign-up flow.
- **Consent (CEO decision, 4 Nov 2026):** one consent, not a separate banner. The sign-up's acceptance of the terms and privacy policy covers cookies and advertising pixels:
  - Change the acceptance line at sign-up so it says so explicitly. Suggested wording: «أوافق على الشروط وسياسة الخصوصية، بما فيها ملفات تعريف الارتباط والبكسلات الإعلانية» / "I accept the terms and privacy policy, including cookies and advertising pixels".
  - Update the app's terms and privacy text to match.
  - No cookie banner and no visible opt-out control.
  - The privacy text keeps the right to object or withdraw consent by email to `privacy@seg-audit.com` (Egypt Law 151/2020, Saudi PDPL).
  - Keep the pixel call in one place, so a consent gate can wrap it later if a legal opinion requires one.

### 5. CSP

If the app sends a Content-Security-Policy, add:

| Directive | Add |
|---|---|
| `script-src` | `https://connect.facebook.net` |
| `img-src` | `https://www.facebook.com` |
| `connect-src` | `https://www.facebook.com`, `https://connect.facebook.net` |
| (later, for TikTok) | `https://analytics.tiktok.com` |

## Acceptance criteria

- [ ] **Staging:** Meta Events Manager → **Test events** (with a `test_event_code` on the CAPI call) shows `PageView` and one `CompleteRegistration` from **both** Browser and Server, marked **Deduplicated**.
- [ ] **No double counting:** reloading the success page does not send a second `CompleteRegistration`.
- [ ] **UTMs are saved:** a sign-up from the example URL above stores all six UTM/`cta` values on the account, and they appear on the CRM lead.
- [ ] **Off means off:** with the environment variables empty, no request goes to `facebook.com` or `tiktok.com`.
- [ ] **Nothing financial leaves:** a check of the network tab and the CAPI payload shows no financial data and no company name.
- [ ] **Privacy policy:** the app's policy is updated.
- [ ] **CI green;** tests added for the UTM persistence and for the event firing only after server confirmation.

## After merge (CEO)

1. Set `META_PIXEL_ID=501774495051160` and the CAPI token in production.
2. In Events Manager:
   - Confirm `CompleteRegistration` is received.
   - **Automatic advanced matching: OFF** (Settings). The website promises it sends no form data.
3. In the ads kit, mark G3 and G4 ✅. Then phase 2 can switch the campaigns to optimise on `CompleteRegistration`.
