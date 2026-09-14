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
