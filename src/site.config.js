// Site-wide configuration. Everything marked TODO is a decision that belongs to
// Ahmed / Session 2 and must be confirmed before production deploy.
module.exports = {
  // TODO(Ahmed): final production domain. The old www.mft-eg.com has a broken TLS
  // certificate (noted 31 Aug 2026) and fin-tech.odoo.com is the Odoo site. Used for
  // canonical URLs, hreflang, sitemap and Open Graph.
  siteUrl: 'https://www.example.com',

  // Default language for the root redirect (/). 'ar' per brief (Arabic default).
  defaultLang: 'ar',
  languages: ['ar', 'en'],

  // Home hero variant: 'A' = trust-strip hero (primary pick), 'B' = split dashboard.
  heroVariant: 'A',

  // Lead form. The static form POSTs JSON to this endpoint. Default is the
  // Netlify function in /functions/lead.js which forwards to Odoo CRM (crm.lead).
  // Set to '' to disable network submission (the form then shows the direct
  // contact fallback). See README → "Lead form".
  formEndpoint: '/.netlify/functions/lead',

  // Contact details — taken from the official contact page
  // https://fin-tech.odoo.com/contactus (31 Aug 2026), same source the September
  // social campaign used. Not defaults.
  contact: {
    email: 'info@seg-audit.com',
    phones: [
      { display: '+20 106 239 9941', tel: '+201062399941' },
      { display: '+20 104 005 7520', tel: '+201040057520' }
    ],
    whatsapp: '+201062399941', // TODO(Ahmed): confirm WhatsApp business number
    // TODO(Session 2): office addresses (Cairo, Riyadh, US)
    offices: [
      { key: 'eg', line: '' },
      { key: 'sa', line: '' },
      { key: 'us', line: '' }
    ],
    social: {
      // TODO(Session 2): confirm public profile URLs
      linkedin: '',
      facebook: '',
      instagram: '',
      x: ''
    }
  },

  // Sections whose content is a decision still pending. Kept in the build so the
  // slot is visible in preview; flip to false to hide on production.
  showPricingSlot: true,     // TODO(Ahmed): fixed packages vs. price ranges (execution plan §4)
  showCaseStudySlot: true,   // TODO(Ops): first real case study with real numbers (plan, week 10)

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
