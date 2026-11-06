// Site-wide configuration. Everything marked TODO is a decision that belongs to
// Ahmed / Session 2 and must be confirmed before production deploy.
module.exports = {
  // ┌──────────────────────────────────────────────────────────────────────┐
  // │ PENDING (Ahmed): production domain — buying mftfintech.com vs fixing  │
  // │ the certificate on mft-eg.com. Replace this ONE value before deploy.  │
  // │ Drives canonical URLs, hreflang, sitemap.xml, robots.txt, OG tags.    │
  // └──────────────────────────────────────────────────────────────────────┘
  siteUrl: 'https://PENDING-DOMAIN.example',

  // Default language for the root redirect (/). 'ar' per brief (Arabic default).
  defaultLang: 'ar',
  languages: ['ar', 'en'],

  // Home hero variant. 'C' = single navy hero with the risk-dashboard hook (Ahmed approved the
  // concept, 14 Sep 2026). 'B' = split dashboard (11 Sep) and 'A' = trust strip stay previewable
  // at /_preview/hero-b/ and /_preview/hero-a/.
  heroVariant: 'C',

  // Lead form. The static form POSTs JSON to this endpoint. Default is the
  // Netlify function in /functions/lead.js which forwards to Odoo CRM (crm.lead).
  // Set to '' to disable network submission (the form then shows the direct
  // contact fallback). See README → "Lead form".
  // Lead delivery. DEFAULT = 'odoo-direct': the browser posts straight to Odoo's public
  // website-form route, which works on ANY host (GitHub Pages, Netlify, a plain folder) with
  // no server and no env var. This is the mode verified live (leads #898-#907). The Netlify
  // function path is opt-in: FORM_MODE=function at build time (readable response, needs the
  // function deployed). An EMPTY endpoint is refused by `npm run check` so the
  // "online submission not available" message can never ship by accident (14 Sep 2026 incident:
  // a preview built with FORM_ENDPOINT= was reviewed as if it were the live site).
  formMode: 'odoo-direct',
  // Temporary safeguard (5 Nov 2026): erp.seg-audit.com answered 404 on /website/form/crm.lead,
  // and an odoo-direct post is opaque, so the browser cannot tell delivered from lost. While
  // false, every lead form shows WhatsApp and email up front and never says "received".
  // Set true only after a test lead is seen in Odoo CRM.
  leadForm: { deliveryVerified: false },
  formEndpoint: '/.netlify/functions/lead', // used only when formMode === 'function'
  odooFormUrl: 'https://erp.seg-audit.com/website/form/crm.lead',

  // Contact details — taken from the official contact page
  // https://fin-tech.odoo.com/contactus (31 Aug 2026), same source the September
  // social campaign used. Not defaults.
  contact: {
    email: 'info@seg-audit.com',
    phones: [
      { display: '+20 106 239 9941', tel: '+201062399941' },
      { display: '+20 104 005 7520', tel: '+201040057520' }
    ],
    whatsapp: '+201062399941', // official WhatsApp number on the contact page
    // Cairo address from the official contact page. It is the only office: Saudi Arabia is served
    // on site and remotely, the US is a market MFT is expanding into (footer.markets says so).
    offices: [
      { key: 'eg', line: 'Korba, Heliopolis, Cairo', lineAr: 'الكوربة، مصر الجديدة، القاهرة' }
    ],
    // Public profiles, rendered in the footer and in Organization.sameAs. An empty value is not
    // rendered (and `npm run check` warns), so a profile only appears once its URL is confirmed.
    // Checked 3 Nov 2026: the Facebook page title is "Modern Financial Technology"; Instagram
    // @modernfintech is "Modern Financial Technology (MFT)". YouTube and TikTok are PENDING (Ahmed):
    // the URLs could not be confirmed as MFT's own (youtube.com/@modernfintech is "ModernFinTech4k").
    social: {
      linkedin: 'https://www.linkedin.com/company/92779112',
      facebook: 'https://www.facebook.com/Fintech2030',
      instagram: 'https://www.instagram.com/modernfintech/',
      youtube: '',
      tiktok: ''
    }
  },

  // Founding Members launch of the platform, Standard Enterprise Governance (SEG): 50 seats, founder price: 50% off for life. Public counter ON
  // (CEO, 3 Nov 2026). Live count (CEO, 5 Nov 2026): the platform computes left = 50 - applications
  // submitted, and the site shows that number from api.seats; `total` (50) is the cap and the API's
  // own total is ignored. `filled` / `asOf` are only the fallback shown when the endpoint is
  // unreachable (17 as of 2026-11-03): update them to the last known applications count.
  // `showCount: false` hides the counter.
  // With the counter on, the page, header bar, home band, seat meter and titles switch to the
  // counter copy in content/<lang>.js → founding.counter,
  // and the generators (launch-images.js, launch-concepts.js) draw the filled seats.
  founding: {
    enabled: true,
    total: 50,
    showCount: true,
    filled: 17,
    asOf: '2026-11-03',
    // Founder-price close (working assumption, 6 Nov 2026; the CEO confirms). The ONE place the date
    // lives: the founder price disappears for good at this moment (Cairo time, UTC+2 in November).
    // Marketing copy writes it out in full; to move it, change this value and run
    //   node scripts/close-date.js --from <old ISO>     (rewrites the date across marketing/)
    // Not yet rendered by the site templates (switching the site to the close date is a separate decision).
    closesAt: '2026-11-30T23:59:00+02:00',
    // Every launch CTA lands on the app sign-up. UTM content is added per placement in the template.
    signup: { ar: 'https://app.seg-audit.com/ar/signup', en: 'https://app.seg-audit.com/en/signup' },
    // Founding application (page founding-members/apply/), contract: seg-audit
    // docs/api/founding-applications.md. Both endpoints are public; the browser calls them only
    // once the portal lists this site's origin in SEG_PUBLIC_FORM_ORIGINS (CORS).
    //   seats  GET  → {open, total, left}; drives every [data-seats] number on the site live.
    //              If it fails, the numbers above (filled / asOf) stay: the last known count.
    //   apply  POST → 202 always; 422 field errors; 429 Retry-After.
    // utmField: the contract forbids unknown fields (422), so UTMs are NOT sent with the
    // application yet; they ride on the Meta Lead event. When the platform accepts an object
    // field for them, set its name here (e.g. 'utm') and the form starts sending it.
    api: {
      seats: 'https://app.seg-audit.com/api/public/founding-seats',
      apply: 'https://app.seg-audit.com/api/public/founding-applications',
      utmField: null,
      // Captcha (Cloudflare Turnstile): off on the platform for now (CEO, 5 Nov 2026). The form
      // already sends captcha_token = "" (ignored while off). To switch on: MFT sets the platform
      // secret, puts the Turnstile site key here, and the widget renders in the form's slot; the
      // token is then required (a failed check = 400).
      captchaSiteKey: null
    }
  },

  // Reports counter (CEO, 5 Nov 2026): replaces the fixed «+500 تقرير». The platform's real count
  // of report PDFs rendered and delivered. Contract: seg-audit docs/api/public-reports-count.md.
  //   GET api, no sign-in; CORS only for origins in the portal's SEG_PUBLIC_FORM_ORIGINS.
  //   200 {"reports": N}      show N (whole number, >= 0); polled every pollSeconds while visible
  //   429 {"reports": null}   keep the last number shown (Retry-After respected)
  //   502/503 {"reports":null} hide the counter: never a guessed number
  //   unreachable / CORS      keep the last number this visitor saw, else stay hidden
  //   lastKnown / asOf        optional confirmed total printed in the page before the first
  //                           answer; null = nothing is printed and the item starts hidden.
  reportsCounter: {
    api: 'https://app.seg-audit.com/api/public/reports-count',
    pollSeconds: 45,
    lastKnown: null,
    asOf: null
  },

  // PENDING (Ahmed): package structure/prices. Section is fully written in
  // home.pricing; flip to true once the packages are approved.
  showPricingSlot: false,

  // Related MFT platforms (kept separate from this site by design).
  platform: {
    segAudit: 'https://app.seg-audit.com',
    odooSite: 'https://erp.seg-audit.com'
  },

  // Analytics — leave empty until a decision is made. Injected only if set.
  // Ad pixels (CEO, 4 Nov 2026): loaded by assets/js/pixel.js with the page, on the basis of the privacy
  // notice (consent is part of accepting it and the terms; no banner, no opt-out UI; objections by email to
  // privacy@seg-audit.com). Only on the production hosts, so local and preview builds never send events. Disclosed in the privacy notice (content/<lang>.js
  // → privacy); update that notice before adding another pixel.
  analytics: {
    gtmId: '',        // e.g. 'GTM-XXXXXXX'
    plausibleDomain: '',
    metaPixelId: '501774495051160', // Meta Pixel (web): PageView on every page, Lead on the free-check CTA
    tiktokPixelId: '',              // TikTok Pixel: PLACEHOLDER, paste the ID here when it is ready (same events)
    pixelHosts: ['www.seg-audit.com', 'seg-audit.com']
  }
};
