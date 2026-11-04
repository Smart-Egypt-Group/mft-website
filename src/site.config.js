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
    // Cairo address from the official contact page. Saudi and US have no street
    // address published; country names only.
    offices: [
      { key: 'eg', line: 'Korba, Heliopolis, Cairo', lineAr: 'الكوربة، مصر الجديدة، القاهرة' },
      { key: 'sa', line: '', lineAr: '' },
      { key: 'us', line: '', lineAr: '' }
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

  // Founding Members launch (SEG Audit): 50 seats at a founder price for life. Public counter ON
  // (CEO, 3 Nov 2026): 17 confirmed founding members on the SEG platform as of 2026-11-03.
  // To update: set `filled` to the confirmed count and `asOf` to the date; `showCount: false` hides it.
  // With the counter on, the page, header bar, home band, seat meter and titles switch to the
  // counter copy in content/<lang>.js → founding.counter,
  // and the generators (launch-images.js, launch-concepts.js) draw the filled seats.
  founding: {
    enabled: true,
    total: 50,
    showCount: true,
    filled: 17,
    asOf: '2026-11-03',
    // Every launch CTA lands on the app sign-up. UTM content is added per placement in the template.
    signup: { ar: 'https://app.seg-audit.com/ar/signup', en: 'https://app.seg-audit.com/en/signup' }
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
