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

  // Home hero variant. 'B' = split-screen dashboard (Ahmed's reference file, 11 Sep 2026);
  // 'A' = trust-strip hero, still previewable at /_preview/hero-a/.
  heroVariant: 'B',

  // Lead form. The static form POSTs JSON to this endpoint. Default is the
  // Netlify function in /functions/lead.js which forwards to Odoo CRM (crm.lead).
  // Set to '' to disable network submission (the form then shows the direct
  // contact fallback). See README → "Lead form".
  formEndpoint: '/.netlify/functions/lead',
  // 'function'    → POST JSON to formEndpoint (Netlify function → Odoo). Readable response.
  // 'odoo-direct' → POST form-encoded straight to Odoo's public website-form route from the
  //                 browser (no server needed — used on GitHub Pages). Odoo skips the CSRF check
  //                 for unauthenticated sessions and returns no CORS header, so the browser sends
  //                 in no-cors mode and treats a delivered request as success. Verified live:
  //                 leads #898 (server path) and #899 (session-less POST) on fin-tech.odoo.com.
  formMode: 'function',
  odooFormUrl: 'https://fin-tech.odoo.com/website/form/crm.lead',

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
    // Public profiles linked from the official site footer.
    social: {
      linkedin: 'https://www.linkedin.com/company/92779112',
      facebook: 'https://www.facebook.com/Fintech2030',
      instagram: 'https://www.instagram.com/egypt.smart'
    }
  },

  // PENDING (Ahmed): package structure/prices. Section is fully written in
  // home.pricing; flip to true once the packages are approved.
  showPricingSlot: false,

  // Related MFT platforms (kept separate from this site by design).
  platform: {
    segAudit: 'https://app.seg-audit.com',
    odooSite: 'https://fin-tech.odoo.com'
  },

  // Analytics — leave empty until a decision is made. Injected only if set.
  analytics: {
    gtmId: '',        // e.g. 'GTM-XXXXXXX'
    plausibleDomain: ''
  }
};
