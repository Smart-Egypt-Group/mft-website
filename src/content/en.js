// English content — FINAL (Session 2). Single source for all English copy.
// Sources: approved hero (Session 1), official company story and testimonials
// published on fin-tech.odoo.com, August/September 2026 campaign copy approved
// by Ahmed, and the competitor-research execution plan (positioning).
// Rule: no figure appears here that was not already published by MFT.
// Remaining decisions (domain, pricing packages, vector logo) live in
// PENDING-DECISIONS.md — nothing else in this file is a placeholder.

// Platform figures are generated from the seg-audit code (scripts/platform-facts.js); never type them here.
const F = require('./platform-facts');
const N = (x) => x.toLocaleString('en-US');
const SIGNUP = 'https://app.seg-audit.com/en/signup';

module.exports = {
  lang: 'en',
  dir: 'ltr',
  htmlLang: 'en',
  ogLocale: 'en_US',
  switchLabel: 'العربية',
  switchLang: 'ar',

  meta: {
    siteName: 'Modern Financial Technology',
    shortName: 'MFT',
    tagline: 'Financial clarity, delivered',
    description:
      'MFT is a CPA-led firm that implements Odoo ERP, runs internal audit and acts as your Virtual CFO: one team, one set of numbers, in Egypt and Saudi Arabia, expanding to the US.'
  },

  ui: {
    skip: 'Skip to content',
    menu: 'Menu',
    close: 'Close',
    home: 'Home',
    learnMore: 'Learn more',
    allServices: 'All services',
    allIndustries: 'All industries',
    readMore: 'Read more',
    breadcrumbHome: 'Home',
    placeholderTag: 'Pending decision, hidden in production',
    seeAlso: 'See also',
    proofTitle: 'From our engagements',
    reviewsTitle: 'What clients say',
    faqTitle: 'Frequently asked'
  },

  nav: {
    items: [
      { label: 'Services', href: 'services/' },
      { label: 'Industries', href: 'industries/' },
      { label: 'MFT Intelligence', href: 'intelligence/' },
      { label: 'About', href: 'about/' },
      { label: 'Insights', href: 'blog/' },
      { label: 'Contact', href: 'contact/' }
    ],
    cta: { label: 'Talk to Us', href: 'contact/' }
  },

  footer: {
    blurb:
      'A CPA-led financial technology and auditing firm. Odoo ERP, internal audit and Virtual CFO from one team, with one set of numbers.',
    columns: [
      {
        title: 'Services',
        links: [
          { label: 'Odoo ERP Solutions', href: 'services/odoo-erp/' },
          { label: 'Innovative Tax Solutions', href: 'services/tax-solutions/' },
          { label: 'Internal Audit', href: 'services/internal-audit/' },
          { label: 'Virtual CFO', href: 'services/virtual-cfo/' },
          { label: 'Financial Consulting', href: 'services/financial-consulting/' },
          { label: 'Business Analysis', href: 'services/business-analysis/' },
          { label: 'Claude for teams', href: 'services/claude-team/' }
        ]
      },
      {
        title: 'Industries',
        links: [
          { label: 'Trading & Distribution', href: 'industries/#trading' },
          { label: 'Retail & Point of Sale', href: 'industries/#retail' },
          { label: 'Manufacturing', href: 'industries/#manufacturing' },
          { label: 'Services & Projects', href: 'industries/#services' }
        ]
      },
      {
        title: 'Where we work',
        links: [
          { label: 'Egypt: Odoo, audit and Virtual CFO', href: 'egypt/' },
          { label: 'Saudi Arabia: ZATCA-ready Odoo and audit', href: 'saudi-arabia/' }
        ]
      },
      {
        title: 'Company',
        links: [
          { label: 'About MFT', href: 'about/' },
          { label: 'MFT Intelligence AI Agents', href: 'intelligence/' },
          { label: 'Request a quote', href: 'request-quote/' },
          { label: 'Insights (blog)', href: 'blog/' },
          { label: 'Contact', href: 'contact/' },
          { label: 'Privacy', href: 'privacy/' },
          { label: 'Trust & security', href: 'trust/' },
          { label: 'Founding Members', href: 'founding-members/' },
          { label: 'Partners', href: 'partners/' },
          { label: 'SEG platform', href: 'https://app.seg-audit.com', external: true }
        ]
      }
    ],
    contactTitle: 'Contact',
    officesTitle: 'Offices',
    socialTitle: 'Follow',
    offices: { eg: 'Egypt', sa: 'Saudi Arabia', us: 'United States' },
    legal: '© {year} Modern Financial Technology. All rights reserved.'
  },

  home: {
    title: 'Modern Financial Technology (MFT) | Standard Enterprise Governance (SEG), Odoo ERP & Internal Audit',
    description: 'MFT is a CPA-led firm with its own platform, Standard Enterprise Governance (SEG), and SEG Audit, its continuous audit product. We implement Odoo ERP, run internal audit and act as your Virtual CFO in Egypt, Saudi Arabia and the US.',
    hero: {
      eyebrow: 'Financial Clarity, Delivered',
      headline: 'Decisions built on {accent}numbers{/accent}.\nNot on guesses.',
      subhead:
        'MFT turns your data into clear financial reports on profitability, cash flow and internal controls, backed by a licensed audit team, Odoo ERP experts, and the SEG platform.',
      cta: { label: 'Check your trial balance free', href: SIGNUP },
      secondary: { label: 'See our services', href: 'services/' },
      trust: [
        'CPA-Led Team',
        'Odoo Certified Partners',
        { live: 'reports', text: 'Reports generated on SEG: {n}' },
        'Egypt and Saudi Arabia, expanding to the US'
      ]
    },
    heroB: {
      eyebrow: 'Financial Clarity, Delivered',
      headline: 'Making decisions on numbers, or on guesses?',
      subhead:
        'MFT turns your data into clear financial reports on profitability, cash flow and internal controls, backed by a licensed audit team, Odoo ERP experts, and the SEG platform.',
      cta: { label: 'Check your trial balance free', href: SIGNUP },
      trust: 'Trusted by finance teams across Egypt and Saudi Arabia, expanding to the US',
      dashboard: {
        title: 'Monthly P&L Snapshot',
        badge: 'Sample',
        kpis: [
          { label: 'Revenue', value: '$482K' },
          { label: 'Net Margin', value: '18.4%', up: true },
          { label: 'Cash Position', value: '$211K' }
        ],
        bars: [40, 55, 48, 70, 62, 88],
        caption: 'Revenue by month, last 6 months (illustrative)',
        findingsTitle: 'Agent findings (sample)',
        findings: [
          { text: 'Payment above materiality threshold, draft awaiting approval', tag: 'Auditor' },
          { text: 'Near-duplicate vendor detected: two codes, one tax id', tag: 'Auditor' },
          { text: 'Cash runway recalculated after supplier terms changed', tag: 'Virtual CFO' }
        ]
      }
    },
    // Live hero (C): one navy surface and a risk counter. 3/7/12 are illustrative until Ahmed supplies
    // real aggregates from actual reports (no client named). The headline carries the real fear:
    // unknown risk sitting in the books.
    heroRisk: {
      // The hero hooks on the first line: a live "scanning" strip, then a question about real money, not audit jargon.
      eyebrow: 'Financial Clarity, Delivered',
      live: `Live check of your books: ${N(F.checks)} checks across ${F.reports} reports`,
      headline: 'Standard Enterprise Governance (SEG): {accent}the platform that audits itself{/accent}',
      subhead: 'How many duplicate payments left your company this year without anyone noticing? SEG reads your books straight from your ERP, read-only, and shows you every finding ranked by severity, with its evidence.',
      assurance: ['Read-only', 'We change nothing in your system', 'No number without evidence'],
      cta: { label: 'Check your trial balance free', href: SIGNUP },
      secondary: { label: 'See our services', href: 'services/' },
      risk: {
        title: 'Illustrative sample of a check result. You will see this same screen on your data.',
        badge: 'Sample',
        scanning: 'Scanning',
        done: 'Check complete',
        findings: [
          { text: 'Same vendor bill paid twice', tag: 'Critical', level: 'critical' },
          { text: 'One vendor registered under two names', tag: 'High', level: 'high' },
          { text: 'Entry posted after the period was closed', tag: 'High', level: 'high' },
          { text: 'Vendor bill with no purchase order', tag: 'Medium', level: 'medium' }
        ],
        counters: [
          { value: 3, label: 'Critical findings', level: 'critical' },
          { value: 7, label: 'High findings', level: 'high' },
          { value: 12, label: 'Medium findings', level: 'medium' }
        ],
        caption: 'Every finding has a clear source in your books. No number without evidence.'
      }
    },

    // Trust: five guarantees that are built and tested in seg-audit today (audit ledger, tenant
    // isolation, restored backup, container hardening, test suite). Figures from
    // PRODUCT_VISIBILITY_AUDIT / HIDDEN_FEATURES_REPORT in the seg-audit repo (August 2026).
    // Nothing here depends on a screen that does not exist yet.
    trust: {
      eyebrow: 'Why you can trust the result',
      title: 'Nothing in your report can be tampered with quietly.',
      intro: 'Five guarantees built into SEG and actually tested, not promises on a policy page.',
      items: [
        {
          title: 'Nobody can alter your numbers without you knowing',
          body: 'Every report and every approval is written to a log where each entry is mathematically chained to the one before. Any edit or deletion outside the system, even directly in the database, shows up immediately and is located.'
        },
        {
          title: 'Your data is completely isolated from every other client',
          body: 'Each organisation lives in its own space, and anyone reaching for another client’s data finds that it does not exist for them. Isolation was tested across seven real organisations with zero leaks. That is verified, not promised.'
        },
        {
          title: 'Your backup has actually been restored, not just taken',
          body: 'Most companies take backups and never try restoring one. We restored a full copy of production data onto a clean server and it worked. What broke along the way was fixed.'
        },
        {
          title: 'The platform runs with the least privilege possible',
          body: 'Platform services run under non-administrative accounts with no extra system privileges, verified on the running servers rather than on paper.'
        },
        {
          title: `More than ${N(F.testsFloor)} automated tests before every update, none skipped`,
          body: `Test code is ${Math.floor(F.testRatio * 100)}% the size of the platform itself, and some of those tests guard the governance rules: one of them stopped a rule-breaking change before it reached any client.`
        }
      ],
      note: `Test and check counts are read from the platform code (${F.measuredOn}); the other guarantees were measured in a documented internal review of SEG (August 2026). Details on the trust page.`
    },

    positioning: {
      eyebrow: 'One team. One set of numbers.',
      title: 'ERP, audit and CFO. Usually three vendors. Here, one.',
      body:
        'Odoo partners stop at go-live. Advisors write reports without ever opening the system. Audit software flags exceptions and leaves you to explain them. MFT is one team that implements the ERP your numbers live in, audits the controls around it, and reads the results with you every month, with Egyptian e-invoicing and Saudi ZATCA compliance built in.',
      pillars: [
        {
          title: 'Odoo ERP',
          body: 'Implemented by certified partners who are also the accountants reading the output. Configuration decisions are accounting decisions here.'
        },
        {
          title: 'Internal Audit',
          body: 'Smart audit: controls designed into the system so errors are prevented and caught as they happen, not discovered in the annual review.'
        },
        {
          title: 'Virtual CFO',
          body: 'Monthly profitability, cash-flow forecasting and the decisions that follow: CFO judgement without a full-time hire.'
        }
      ]
    },

    services: {
      eyebrow: 'Services',
      title: 'From the first journal entry to the board pack.',
      intro:
        'Seven services, one accountable team. Start with a single report, or hand us the whole finance function.',
      cta: 'Explore all services'
    },

    how: {
      eyebrow: 'How we work',
      title: 'The risk points in your trial balance in minutes. Not quarters.',
      steps: [
        {
          when: 'Day 0',
          title: 'Connect or send your data',
          body: 'Connect Odoo to the SEG platform read-only, or share your last closed month as a trial balance or a spreadsheet. No preparation, no commitment.'
        },
        {
          when: 'Within minutes',
          title: 'The free trial-balance check',
          body: 'A free check of your company’s trial balance that flags its risk points in minutes. Indicators computed from your trial balance only: suspense accounts, abnormal balances, imbalances, heavy manual entries and backdated entries. Not a full audit report.'
        },
        {
          when: 'Week 1',
          title: 'Diagnosis',
          body: 'A 30-minute call with a licensed accountant, not a sales rep, on your entity, your system and what a decision-ready close would take.'
        },
        {
          when: 'On an agreed date',
          title: 'Delivery',
          body: 'Implementation, audit fieldwork or monthly reporting starts on an agreed calendar, with one named lead on our side until closure.'
        }
      ]
    },

    industries: {
      eyebrow: 'Industries',
      title: 'Built for the activities where margins hide in operations.',
      intro:
        'We classify your activity under ISIC Rev.4 into one of four families: trading, retail and point of sale, manufacturing, and services and projects. In each, the numbers only make sense when the ERP mirrors the operation.',
      cta: 'See each family'
    },

    proof: {
      eyebrow: 'Why MFT',
      title: 'Credentials you can verify. Numbers you can audit.',
      facts: [
        { live: 'reports', label: 'Reports generated on SEG so far' },
        { value: 'CPA', label: 'Licensed, CPA-led audit team' },
        { value: 'Odoo', label: 'Certified implementation partner' },
        { value: '2', label: 'Markets: Egypt and Saudi Arabia, expanding to the US' }
      ]
    },

    stories: {
      eyebrow: 'From our engagements',
      title: 'What the numbers found.',
      intro:
        'Two findings from recent audit engagements. Clients are anonymised and no financial amounts are published, only what was found and when.',
      cases: [
        {
          sector: 'Food & beverage distribution · Cairo',
          figure: '23 transactions',
          label: 'missed by manual review, surfaced in six weeks',
          body:
            'Running SEG alongside the external audit of the second quarter, the engine flagged a duplicate payment to one supplier registered under two vendor codes, caught before the close, not after it.',
          quote: '“We would have found it eventually. Eventually is expensive.”'
        },
        {
          sector: 'Construction · Riyadh',
          figure: '3 weeks before close',
          label: 'an inventory valuation gap caught before year-end',
          body:
            'A costing method never updated after a supplier contract changed. Found before the close, it was a board discussion. After it, it would have been a restatement.',
          quote: ''
        }
      ],
      testimonialsTitle: 'What clients say',
      testimonials: [
        {
          quote:
            'Honestly, it has been a great experience. If we continue like this, progress will reach a whole new level. The team is highly professional, respectful, cooperative and always responsive, and we can clearly see the continuous improvement.',
          name: 'Mr. Mahmoud',
          company: 'Al-Kayan Steel'
        },
        {
          quote:
            'There has definitely been a noticeable improvement in reducing errors. We really hope the progress and the continuous follow-up carry on.',
          name: 'Mr. Tarek',
          company: 'Jacquardina'
        }
      ]
    },

    // Hidden until Ahmed approves the package structure (site.config.js → showPricingSlot).
    pricing: {
      eyebrow: 'Engagement models',
      title: 'Transparent scope. No “custom quote” black box.',
      body: 'Each package publishes its scope, deliverables and monthly commitment up front.',
      tiers: [
        { name: 'Starter', body: 'One report, one system, one month. For teams that need a first clear picture.' },
        { name: 'Growth', body: 'Monthly reporting plus ERP support for companies scaling across entities or countries.' },
        { name: 'Enterprise', body: 'Full finance function: ERP, audit programme and Virtual CFO under one agreement.' }
      ],
      note: 'Package pricing to be published.'
    },

    cta: {
      title: 'Start with a free trial-balance check.',
      body:
        'A free check of your company’s trial balance that flags its risk points in minutes. Indicators computed from your trial balance only: suspense accounts, abnormal balances, imbalances, heavy manual entries and backdated entries. Not a full audit report. Upload your trial balance or connect Odoo read-only, with no commitment.',
      button: { label: 'Check your trial balance free', href: SIGNUP },
      alt: 'Or call us directly:'
    }
  },

  // Home teaser for the agents page
  intelligenceTeaser: {
    eyebrow: 'MFT Intelligence',
    title: 'AI agents that watch your books every day, reviewed by our accountants.',
    body: 'An Auditor agent that applies ISA 320 materiality to every transaction, and a Virtual CFO agent that turns your Odoo data into board-ready reports. Available now; ten more agents in internal validation.',
    cta: { label: 'Meet the agents', href: 'intelligence/' }
  },

  ctaBand: {
    title: 'Talk to a CPA, not a sales rep.',
    body: 'A 30-minute call to understand your entity, your systems and what a decision-ready close would look like. Free, and you leave with one concrete next step.',
    button: { label: 'Book a call', href: 'contact/' }
  },

  services: {
    title: 'Services | Modern Financial Technology',
    description:
      'Odoo ERP Solutions, tax solutions, internal audit, Virtual CFO, financial consulting, business analysis and Claude for teams, from one CPA-led team in Egypt, Saudi Arabia and the US.',
    page: {
      eyebrow: 'Services',
      title: 'Seven services. One accountable team.',
      intro:
        'Every engagement is led by a licensed accountant who also knows the system your numbers live in. Pick one service, or hand us the whole finance function.'
    },
    titleSuffix: 'in Egypt and Saudi Arabia | MFT',
    detailLabels: {
      overview: 'Overview',
      deliverables: 'What you get',
      forWho: 'Who it is for',
      related: 'Related services',
      cta: 'Discuss this service',
      tracks: 'What the service covers',
      systems: 'Supported systems',
      now: 'Available now',
      soon: 'Coming soon',
      moved: 'This service has moved to',
      movedNote: 'It is now part of Odoo ERP Solutions.'
    },
    // Merged into odoo-erp (CEO, 5 Nov 2026). Old URLs stay alive as light redirect pages
    // (noindex, canonical to the new anchor, out of the sitemap).
    legacy: [
      { slug: 'training', name: 'User Training', to: 'services/odoo-erp/#training' },
      { slug: 'technical-support', name: 'Technical Support', to: 'services/odoo-erp/#support' }
    ],
    items: [
      {
        slug: 'odoo-erp',
        name: 'Odoo ERP Solutions',
        short: 'Implementation, integrations, training and support for Odoo from one accountant-led team, plus custom module development with internal controls and governance built in.',
        tagline: 'An ERP that mirrors the business, closes the books, and governs itself.',
        definition: 'Odoo ERP Solutions by MFT is one service for the whole life of the system: implementation and configuration, integrations and custom reports, custom module development, training, support and upgrades, and tax inside Odoo. It is led by certified Odoo partners who are also licensed accountants, so the ledger is right from day one and stays right.',
        highlight: {
          value: '40+',
          label: 'review axes on your books, one of them for your activity family’s controls',
          body: 'With SEG Audit, we classify your activity under ISIC Rev.4 and check your books across 40+ review axes, including one dedicated to your activity family’s controls inside Odoo (trading, retail, manufacturing, services). We configure those controls into your system from the first setup. This is what Standard Enterprise Governance means inside your system: governance is part of the configuration, not a report that comes after it.'
        },
        body: [
          'Odoo implementations fail when the chart of accounts, cost centres and tax setup are an afterthought. MFT starts there. Our certified partners configure finance, inventory, manufacturing, sales, purchasing and HR around how your operation actually runs, for industrial, trading and service companies in Egypt and the Gulf.',
          'Because we practise smart audit, permissions, segregation of duties and documentation cycles are designed into the system from the first configuration, so the ERP prevents errors instead of just recording them. After go-live the same team stays with you: it trains every role, supports and upgrades the system, and builds what your activity needs.'
        ],
        tracks: [
          { id: 'implementation', title: 'Implementation and configuration', body: 'A finance-led deployment, from discovery to go-live.', items: ['Process mapping and gap analysis', 'Chart of accounts, analytic and cost-centre design', 'Module configuration: Accounting, Inventory, Manufacturing, Sales, Purchase, HR', 'Access rights and segregation of duties built in', 'Data migration with reconciled opening balances', 'Go-live support and 90-day stabilisation'] },
          { id: 'integrations', title: 'Integrations and custom reports', body: 'Odoo connected to everything around it, with reports shaped to your decisions.', items: ['Integrations with banks, e-invoicing portals, WhatsApp and third-party tools', 'Integrations and API work', 'Custom reports and dashboards'] },
          { id: 'custom-modules', featured: true, title: 'Custom module development', body: 'Odoo modules shaped to your activity, with internal controls and governance policies built in, not left in a separate manual.', items: ['Custom modules for your processes, developed within the implementation project', 'We classify your activity under ISIC Rev.4 and check your books across 40+ review axes, including one dedicated to your activity family’s controls', 'Ready-made module packages for each activity: being built and coming soon to the Odoo App Store; until then they are set up within the implementation project', 'Sector benchmarks for more than 50 activities (being added)'] },
          { id: 'training', title: 'Training', body: 'Role-based training on your own configuration and data, in Arabic or English, with recorded sessions.', items: ['Role-based curriculum on your live configuration', 'Hands-on workshops, on site or remote', 'Bilingual user guides and quick-reference cards', 'Competency check-outs before go-live', 'Refresher sessions after upgrades'] },
          { id: 'support', title: 'Support and upgrades', body: 'A support agreement with agreed response times, handled by people who know your configuration and chart of accounts.', items: ['Help desk with agreed response times', 'Version upgrades and regression testing', 'Monthly health check and backup verification'] },
          { id: 'tax', title: 'Tax inside Odoo', body: 'Egyptian e-invoicing (ETA), Saudi ZATCA phase two, withholding tax, VAT and multi-entity consolidation are part of the standard build, not change requests.', items: [], link: { label: 'Innovative Tax Solutions', href: 'services/tax-solutions/' } }
        ],
        forWho: 'Companies moving off spreadsheets or a legacy system, and Odoo users whose implementation never produced reliable financials or who need one partner for training, support and upgrades.',
        faq: [
          // Implementation time: CEO decision (5 Nov 2026), "6 weeks for any project".
          { q: 'How long does an implementation take?', a: 'Six weeks for any implementation project, from discovery to go-live.' },
          { q: 'Do you have ready-made modules for each activity?', a: 'Odoo module packages for each activity, with its controls, are being built and will be listed on the Odoo App Store soon; until then we configure your activity’s controls and build what is needed within the implementation project. Today, with SEG Audit, we classify your activity under ISIC Rev.4 and check your books across 40+ review axes, including one dedicated to your activity family’s controls, with sector benchmarks for more than 50 activities being added.' },
          { q: 'Do you handle Egyptian e-invoicing and Saudi ZATCA?', a: 'Yes. ETA e-invoicing, ZATCA phase two, withholding tax and multi-entity consolidation are part of the standard build. For return reconciliation and tax-file readiness, see Innovative Tax Solutions.' },
          // "90 days of stabilisation" and "critical issues acknowledged the same business day": confirmed by the CEO (5 Nov 2026).
          { q: 'What happens after go-live?', a: 'Ninety days of stabilisation are included, then optional support with response times agreed per contract; critical issues are acknowledged the same business day.' },
          { q: 'Do you handle upgrades and integrations?', a: 'Yes. Version upgrades with regression testing and a monthly health check, and integrations with banks, e-invoicing portals (ETA, ZATCA), WhatsApp and third-party tools via API.' },
          { q: 'Is training on site or remote, and is competency verified?', a: 'Either. Sessions are recorded so new hires onboard without a new engagement, and check-outs before go-live confirm each role can complete its daily tasks.' },
          { q: 'We are an Odoo partner serving several clients. Does SEG work for us?', a: 'Yes. Each client lives in its own organisation, isolated from every other one, and that isolation has been tested on seven real organisations with zero leaks. Talk to us about a partner arrangement and how many clients you serve.' }
        ]
      },
      {
        slug: 'tax-solutions',
        name: 'Innovative Tax Solutions',
        short: 'Tax compliance checked on every invoice and entry in your system, not a sample, through to filing the returns for you: e-invoicing and e-receipts, VAT, withholding tax and zakat.',
        tagline: 'Your return matches your books before the inspector asks.',
        definition: 'Tax solutions by MFT combine tax configuration inside Odoo (Egyptian ETA e-invoicing and e-receipts, Saudi ZATCA phase two, VAT and withholding tax) with automated checks that read every invoice and entry read-only, with results signed off by licensed accountants. It is a full managed service: we prepare the reconciliations, working papers and tax-file readiness, then file the tax returns on your company’s behalf, supervised by a qualified accountant at every stage.',
        body: [
          'Most tax differences only surface at inspection: an e-invoice never submitted or rejected, tax on an invoice that does not match its entry, a supplier with no tax withheld, a VAT return that does not match the books. So we start with the setup itself: Odoo taxes per entity, item codes, customer and supplier registration data, invoice sequences and lock dates, configured by accountants, not just developers.',
          'SEG Audit then reads all of your books, not a sample, and runs specific tax checks: ETA submission status or ZATCA clearance and reporting, output and input VAT reconciled to the return, tax differences between invoice and entry, supplier bills with no tax withheld, the zakat base, and tax-file readiness. The figures are computed from your books with fixed rules, and AI calculates no tax: it drafts the explanation of each finding and the proposed fix, and an MFT accountant approves it before it reaches you. Once you approve the reconciliation, we file the return on the official portal under your company’s authorisation and keep the filed return and proof of submission on your file.'
        ],
        deliverables: [
          'Tax configuration in Odoo: VAT and withholding tax per entity',
          'Egyptian ETA e-invoicing and e-receipts: setup and follow-up of unsubmitted, rejected or late invoices',
          'Saudi ZATCA phase two: integration, clearance and reporting, with hash-chain and UUID checks',
          'VAT return reconciled to the books: output, input, rate mismatches and zero-tax invoices',
          'Withholding tax review: tax setup, supplier bills without withholding, total withheld for the period',
          'Tax differences between invoice and entry, and manual tax entries',
          'E-invoice item data: item codes, customer addresses and free-text lines',
          'Zakat base reconciled to the filed return, for Saudi companies',
          'Tax-file readiness before inspection: registration numbers, invoice sequence gaps, draft invoices and lock dates',
          'Working papers and reconciliations the return is built on, and a findings report ranked by severity, each finding with its evidence from the books and an owner for the fix',
          'Tax returns filed on your company’s behalf (VAT, withholding tax and zakat) on the Egyptian Tax Authority or ZATCA portal, under your authorisation and after your approval, with proof of submission'
        ],
        systems: [
          { name: 'Odoo', status: 'now' },
          { name: 'SAP', status: 'soon' },
          { name: 'Oracle', status: 'soon' },
          { name: 'Microsoft Dynamics', status: 'soon' }
        ],
        forWho: 'Companies running Odoo in Egypt and Saudi Arabia ahead of a tax inspection or after e-invoicing goes live, and finance teams that still prepare returns by hand from spreadsheets.',
        faq: [
          { q: 'Does AI calculate the tax or decide our tax position?', a: 'No. The checks compute figures straight from your books with fixed rules; AI drafts the explanation and proposed fix for an accountant to approve. Anything that needs professional judgement, such as the right withholding rate for each type of transaction, is raised for review, never decided automatically.' },
          { q: 'Do you file the returns for us?', a: 'Yes. It is a full managed service supervised by a qualified accountant: we prepare the reconciliations and working papers, your company approves the figures, then we file the return on the Egyptian Tax Authority or ZATCA portal under its authorisation and hand you the filed return and proof of submission.' },
          { q: 'Do you need write access to our system?', a: 'No, read-only. VAT and withholding returns are filed outside Odoo, so we reconcile them to the books before filing, then file them on the portal for you.' },
          { q: 'We are not on Odoo. Does this apply to us?', a: 'The automated checks run on Odoo today; SAP, Oracle and Microsoft Dynamics are coming soon.' }
        ]
      },
      {
        slug: 'internal-audit',
        name: 'Internal Audit',
        short: 'Control testing and risk reviews by a CPA-led team, reported for the board.',
        tagline: 'Find the gap before the auditor, the bank or the tax authority does.',
        body: [
          'An internal audit programme designed around your actual risks: revenue leakage, duplicate payments, near-duplicate vendors, inventory shrinkage, access rights and tax exposure. Fieldwork is done inside your ERP and supported by Standard Enterprise Governance (SEG), MFT’s own platform, which scores every transaction by risk instead of sampling five percent and hoping the errors are in it.',
          'Annual audits leave eleven months uncovered. Our programmes run monthly or continuously with the same rigour, and every finding is ranked by financial impact and comes with an owner, a fix and a deadline.'
        ],
        deliverables: [
          'Risk-based annual audit plan',
          'Control design and effectiveness testing',
          'Procure-to-pay, order-to-cash and inventory reviews',
          'Vendor master, duplicate-payment and near-duplicate analysis',
          'Access-rights and segregation-of-duties review',
          'Board-ready audit reports with ranked findings',
          'Follow-up tracking until closure'
        ],
        forWho: 'Owner-managed companies, groups with multiple entities, and businesses preparing for external audit, financing or acquisition.',
        definition: 'Internal audit by MFT is a risk-based programme run by a CPA-led team inside your ERP: controls are tested, findings are ranked by financial impact, and each one carries an owner, a fix and a deadline.',
        faq: [
          { q: 'How is this different from our annual external audit?', a: 'External audit samples and looks back once a year. Our programme runs monthly or continuously, covers the whole population by risk, and is designed to prevent findings rather than report them.' },
          { q: 'Do you use software or people?', a: 'Both. SEG and the MFT Auditor agent do the coverage; licensed auditors decide what matters and sign the report.' },
          { q: 'Can findings be shared with our external auditor or bank?', a: 'Yes. Reports are written for boards and third parties, with ISA-classified findings and an evidence trail.' },
          { q: 'I am an external auditor. Can I rely on what the platform produces?', a: 'Every report and every approval is written to a log that cannot be edited or trimmed without it showing. And an approval is bound to the exact version that was approved: regenerate the report and the old approval lapses instead of silently carrying over to a version nobody has seen.' },
          { q: 'I run internal audit. What happens to a finding after it is detected?', a: 'It is not forgotten. The finding stays on record with its evidence and severity, a repeat in a later period is linked to the earlier one, and it cannot be closed or dismissed without a named, registered approver. Your MFT accountant follows remediation with you to closure as part of the programme.' },
        ]
      },
      {
        slug: 'virtual-cfo',
        name: 'Virtual CFO',
        short: 'Monthly reporting, cash forecasting and decisions: a CFO on your calendar, not your payroll.',
        tagline: 'The reports a CFO would build. The questions a CFO would ask.',
        body: [
          'Every month you receive a management pack you can read in five minutes: profitability by product and customer, cash-flow forecast, working-capital position and the variances that matter. Then we sit with you and decide what to do about them.',
          'The service scales from a single monthly review to a full finance-function lead with your team reporting to us. It works best on Odoo, but it does not require it.'
        ],
        deliverables: [
          'Monthly management reporting pack',
          '13-week cash-flow forecast',
          'Budgeting and variance analysis',
          'Pricing, margin and break-even analysis',
          'Bank, investor and board reporting',
          'Monthly decision review with management'
        ],
        forWho: 'Growing companies that need CFO-level judgement without a full-time hire, and founders who want to understand their own numbers.',
        definition: 'Virtual CFO by MFT is a monthly finance-leadership service: an MFT accountant delivers a management pack, a cash-flow forecast and a decision review, with the Virtual CFO agent doing the analysis from your ERP.',
        faq: [
          { q: 'How many hours a month do we get?', a: 'It is scoped by deliverables, not hours: the monthly pack, the forecast and the review meeting are fixed; ad-hoc questions are answered within the engagement.' },
          { q: 'Do we need Odoo?', a: 'No. A monthly trial balance and sub-ledger export from any system is enough to start; Odoo makes it faster.' },
          { q: 'Is the trial-balance check really free?', a: 'Yes. A free check of your company’s trial balance that flags its risk points in minutes. Indicators computed from your trial balance only: suspense accounts, abnormal balances, imbalances, heavy manual entries and backdated entries. Not a full audit report. No credit card, no commitment.' },
          { q: 'I am a CFO. What do I get after the trial-balance check?', a: 'The service does not end at a PDF. Every month you receive a new pack compared with the one before, you sit with your MFT accountant in a decision review, and audit findings stay on record from one month to the next instead of starting from zero each time.' },
          { q: 'I own a small company. What happens after the free trial-balance check?', a: 'A 30-minute diagnosis call with a licensed accountant that ends with one concrete next step, then, if you want it, a monthly pack with a defined scope. Nothing to install and no change to your system.' },
        ]
      },
      {
        slug: 'financial-consulting',
        name: 'Financial Consulting',
        short: 'Restructuring, feasibility, valuation and tax planning grounded in your actual ledger.',
        tagline: 'Advice that starts from your numbers, not a template.',
        body: [
          'Project-based work for the moments when a decision needs a financial answer: opening in Saudi Arabia, pricing a new line, restructuring debt, valuing a stake or preparing for investment. Cross-border work draws on our own ZATCA, SOCPA and Egyptian tax research and the Egypt-Saudi treaty position.',
          'Every engagement ends with a document you can hand to a bank, a partner or a buyer.'
        ],
        deliverables: [
          'Feasibility studies and financial models',
          'Cross-border structuring (Egypt, Saudi Arabia, US)',
          'Tax, zakat and compliance reviews',
          'Valuation and due-diligence support',
          'Cost reduction and margin programmes'
        ],
        forWho: 'Management teams facing a one-off decision with a large financial consequence.',
        definition: 'Financial consulting by MFT is project-based advisory for one-off decisions such as feasibility, restructuring, valuation, cross-border structuring and tax, grounded in your actual ledger.',
        faq: [
          { q: 'What does a typical engagement produce?', a: 'A document you can hand to a bank, partner or buyer: model, assumptions, scenarios and a recommendation.' },
          { q: 'Do you cover Saudi as well as Egypt?', a: 'Yes. Cross-border work draws on our own ZATCA, SOCPA and Egyptian tax research and the Egypt-Saudi treaty position.' },
          { q: 'How is it priced?', a: 'Fixed fee per engagement, agreed after a scoping call.' },
        ]
      },
      {
        slug: 'business-analysis',
        name: 'Business Analysis',
        short: 'Process mapping and requirements that make systems fit the business, not the reverse.',
        tagline: 'Before configuring anything, understand the operation.',
        body: [
          'We document how orders, stock, production and cash actually move, find where information is lost or re-typed, and specify what the system should do about it, including which audit requirements become operating rules inside the system.',
          'The output is a requirements document detailed enough to implement and clear enough for the owner to approve.'
        ],
        deliverables: [
          'As-is and to-be process maps',
          'Functional requirements and acceptance criteria',
          'KPI and dashboard definitions',
          'System selection and vendor evaluation',
          'Change-impact assessment'
        ],
        forWho: 'Companies about to implement or replace a system, and those whose current system does not reflect how they work.',
        definition: 'Business analysis by MFT documents how orders, stock, production and cash actually move through your company and specifies what a system must do about it, before anything is configured.',
        faq: [
          { q: 'When do we need this?', a: 'Before implementing or replacing a system, or when the current system does not reflect how you work.' },
          { q: 'What do we receive?', a: 'As-is and to-be process maps, functional requirements with acceptance criteria, KPI definitions and a change-impact assessment.' },
          { q: 'Is it tied to Odoo?', a: 'No. The output is system-neutral and can be used to evaluate vendors.' },
        ]
      },
      {
        slug: 'claude-team',
        name: 'Claude for teams: implementation and training',
        short: 'Set up Claude Team for your company, configure access and connect it to your work tools, then train each team to use it in their own work.',
        tagline: 'An AI tool is only as good as the way it is used.',
        body: [
          'We set up your company’s Claude Team workspace: members and roles, single sign-on (SSO), spend controls, projects and knowledge bases for each team, and connections to work tools such as Google Workspace, Microsoft 365 and Slack.',
          'Your company subscribes to Claude directly and in its own name, so ownership, billing and data stay with you. You add the MFT team as an admin in the workspace during setup, then we hand administration back to you in full.',
          'Then we train each role to use it in their actual work, from finance and audit to sales, HR and management, with a written usage policy that sets what company data may go in. It is the same approach we build the SEG platform on: AI prepares, a person approves.'
        ],
        deliverables: [
          'Workspace, members, roles and single sign-on set up',
          'Projects and knowledge bases for each team, built on your documents',
          'Claude connected to the work tools your plan includes',
          'A written usage policy with data and sharing controls',
          'Role-based training workshops, in Arabic or English, recorded',
          'A library of ready prompts for each team’s tasks'
        ],
        forWho: 'Companies that want to use AI in daily work with clear controls instead of scattered personal accounts: 2 to 150 members on the Team plan, and the Enterprise plan beyond that.',
        definition: 'Claude for teams with MFT is a service that sets up Claude Team for your company (members, permissions, single sign-on, projects, connections to work tools) and trains each team to use it under a written data policy. MFT is independent and not part of Anthropic.',
        faq: [
          { q: 'Is MFT part of Anthropic?', a: 'No. MFT is independent and provides the setup and training; Claude subscriptions, their prices and terms are set by Anthropic.' },
          { q: 'How does the subscription work?', a: 'Your company subscribes directly with Claude and pays its subscription there; before that we help you choose the plan and the number and type of seats. MFT’s setup and training is invoiced separately.' },
          { q: 'How many members does it cover?', a: 'The Team plan runs from 2 to 150 members; larger organisations use the Enterprise plan. We help you choose the plan and seat types for how each team works.' },
          { q: 'What about company data?', a: 'We write a policy with you on what may go in, set permissions and sharing at workspace level, and review Anthropic’s commercial terms on data with you before switching it on.' },
        ]
      }
    ]
  },

  industries: {
    title: 'Industries | Modern Financial Technology',
    description:
      'We serve activities classified under ISIC Rev.4 across four families: trading, retail and point of sale, manufacturing, and services and projects. Odoo ERP, audit and Virtual CFO in Egypt and Saudi Arabia.',
    // Source of the families and codes: seg-audit audit-engine/app/tenancy/industries.py (the list
    // the client picks from) and app/analysis/odoo_best_practice.py (family_of, FAMILY_RULES).
    // Do not add an activity here before the platform has rules for it.
    page: {
      eyebrow: 'Industries',
      title: 'Where the numbers depend on the operation.',
      intro:
        'We serve activities classified under ISIC Rev.4 across four families: trading, retail and point of sale, manufacturing, and services and projects. They are the same classifications your company picks its activity from in SEG Audit, and each family has an axis that checks its controls in Odoo.'
    },
    labels: {
      isic: 'ISIC divisions',
      examples: 'From the classification list',
      challenges: 'What usually goes wrong',
      how: 'How MFT helps',
      checks: 'What SEG Audit checks in Odoo',
      cta: 'Talk about your activity'
    },
    items: [
      {
        slug: 'trading',
        name: 'Trading & Distribution',
        isic: '45, 46',
        examples: ['Wholesale trade: distributors, wholesale agents and importers', 'Vehicle trade, spare parts and service centres'],
        short: 'Margin by SKU, customer and channel, after discounts, returns and freight.',
        challenges: [
          'Gross margin reported before rebates, returns and logistics',
          'Stock in transit and consignment stock outside the system',
          'Duplicate and near-duplicate vendors paid twice for months'
        ],
        how: [
          'Odoo Sales, Purchase and Inventory with landed-cost allocation',
          'Vendor-master, receivables ageing and credit-limit controls',
          'Channel and customer profitability in the monthly pack'
        ],
        checks: ['Inventory valued automatically with every move', 'Three-way match: purchase order, receipt and bill', 'Freight and customs costs loaded onto inventory']
      },
      {
        slug: 'retail',
        name: 'Retail & Point of Sale',
        isic: '47, 56',
        examples: ['Shops, chains, supermarkets and online stores', 'Restaurants, cafes and catering'],
        short: 'Recipe costing, expiry-driven stock and multi-outlet control.',
        challenges: [
          'Recipe costs drifting with ingredient prices and portion sizes',
          'Waste and expiry losses recorded late or not at all',
          'Cash and stock controls across branches and central kitchens'
        ],
        how: [
          'Lot and expiry tracking with recipe (BoM) costing in Odoo',
          'Branch-level P&L with waste and variance reporting',
          'Cash, purchasing and supplier-payment controls audited on site'
        ],
        checks: ['Inventory valued automatically with every move', 'Three-way match: purchase order, receipt and bill', 'Point-of-sale sessions closed the same day']
      },
      {
        slug: 'manufacturing',
        aliases: ['food-beverage'],
        name: 'Manufacturing',
        isic: '10 to 33 (section C)',
        examples: ['Food products and beverages', 'Chemicals, metals, textiles, furniture and other manufacturing'],
        short: 'True product cost, from bill of materials to landed overhead.',
        challenges: [
          'Standard costs that nobody has updated since the bill of materials changed',
          'Work-in-progress that never reconciles to the ledger',
          'Scrap, rework and yield losses invisible in the margin report'
        ],
        how: [
          'Odoo Manufacturing with routings, work centres and actual costing',
          'Inventory valuation and WIP controls tested by internal audit',
          'Monthly product-margin reporting by line and customer'
        ],
        checks: ['Inventory valued automatically with every move', 'Active bills of materials for manufactured products', 'Work orders on manufacturing orders', 'A separate work-in-progress account']
      },
      {
        slug: 'services',
        aliases: ['construction', 'healthcare'],
        name: 'Services & Projects',
        isic: '41 to 43, 55, 58 to 63, 69 to 75, 77 to 82, 85 to 88',
        examples: ['Building, civil engineering and specialised construction', 'Hospitals, clinics, radiology centres and laboratories'],
        short: 'Cost per project and per service line, from timesheets to retentions.',
        challenges: [
          'Cost-to-complete and margin per project known only at the end',
          'Retentions, advances and subcontractor certificates tracked in spreadsheets',
          'Claims and insurer receivables reconciled months late'
        ],
        how: [
          'Project-based analytic accounting and budgets in Odoo',
          'Subcontractor, retention and progress-billing controls',
          'Odoo configured for service-line accounting and insurer billing'
        ],
        checks: ['Timesheets on projects', 'Analytic distribution tying income and expenses to each project’s cost']
      }
    ]
  },

  about: {
    title: 'About | Modern Financial Technology',
    description:
      'MFT started in financial audit, developed the smart-audit approach, and now implements Odoo ERP and acts as Virtual CFO for companies in Egypt and Saudi Arabia, expanding to the US.',
    page: {
      eyebrow: 'About MFT',
      title: 'Accountants who build systems. Technologists who read ledgers.',
      intro:
        'Modern Financial Technology grew out of a deep professional background in accounting, audit and internal control, and one observation from the field: audit findings kept describing errors that the systems should have prevented.'
    },
    story: {
      title: 'The story',
      paras: [
        'MFT began as a financial audit and review practice, focused on analysing financial data, evaluating internal control systems and identifying operational and compliance risk for companies in Egypt and Saudi Arabia.',
        'Working inside those companies exposed a clear gap between what the audit found and what traditional systems could prevent. Out of that gap came smart audit: moving from reviewing what already happened to building a system that prevents errors and detects them in real time, through strong documentation cycles, defined permissions and segregation of duties, and audit requirements translated into operating rules inside the system.',
        'That approach led MFT into ERP implementation, above all Odoo, as the platform that turns audit and control concepts into daily practice. Today the firm is led by its CEO and combines licensed accountants and auditors with certified Odoo implementers, serving Egypt and Saudi Arabia and expanding to the United States. We do not separate audit, system and decision. We treat them as one ecosystem.'
      ]
    },
    values: {
      title: 'How we work',
      items: [
        { title: 'Numbers first', body: 'Every recommendation traces back to a reconciled ledger entry. If it cannot be audited, it is not in the report.' },
        { title: 'Plain language', body: 'Reports are written to be read by owners and boards, in Arabic or English, without a glossary.' },
        { title: 'Named accountability', body: 'A single lead on our side owns the engagement from discovery to closure.' },
        { title: 'Nothing invented', body: 'No fabricated benchmarks, no illustrative results presented as real. We publish figures we can stand behind.' }
      ]
    },
    credentials: {
      title: 'Credentials',
      items: [
        'CPA-led team of licensed accountants and auditors',
        // Registration number from the CEO (5 Nov 2026). The register/authority name is added once confirmed, not before.
        'Chartered accountant registration no. 57986',
        '40+ years of combined experience in manufacturing, trading and financial services',
        'Odoo Certified Partner',
        { live: 'reports', text: 'Reports generated on SEG so far: {n}' },
        'Egyptian e-invoicing (ETA) and Saudi ZATCA phase-two experience',
        `Standard Enterprise Governance (SEG) by MFT, with its continuous audit product SEG Audit: ${N(F.checks)} checks across ${F.reports} reports and more than ${N(F.testsFloor)} automated tests before every update`
      ]
    },
    team: {
      title: 'The team',
      intro:
        'Behind the platform is a team that has sat inside real audit committees: chartered accountants and auditors with more than forty years of combined experience in manufacturing, trading and financial services in Egypt and Saudi Arabia, working alongside certified Odoo implementers.',
      points: [
        { title: 'CEO-led', body: 'The firm is run by its founding auditor, who still leads client engagements.' },
        { title: 'Two disciplines, one desk', body: 'The people who configure the ERP are the people who audit it and read its output.' },
        { title: 'Bilingual by default', body: 'Every deliverable is available in Arabic and English.' }
      ]
    },
    // Founder's certificates: the certificate details as sent by the CEO (5 Nov 2026), verbatim.
    // Nothing is added that is not on the certificate. The dash between NITC and Ain Shams University
    // is written as a comma (site rule: no long dashes).
    founder: {
      title: 'Founder',
      intro: 'Ahmed Ashraf, founder and CEO of MFT.',
      certificationsTitle: 'Certifications',
      labels: { holder: 'Name on certificate', issuer: 'Issued by', validity: 'Valid', number: 'Certificate no.', verify: 'Verify the certificate' },
      certifications: [
        {
          name: 'Fundamentals of Digital Transformation Certificate (Cybersecurity · IT · Word · Excel · PowerPoint · Mobile App · Distance Learning)',
          holder: 'Ahmed Ashraf Mostafa Ahmed',
          issuer: 'NITC, Ain Shams University: Central Unit for IT Training (CUIT), Supreme Council of Universities (SCU)',
          validity: 'from 09/2026 to 08/2031',
          number: '20260915T39PSF, dated 15/09/2026',
          href: 'https://verify.scu.eg',
          hrefLabel: 'verify.scu.eg'
        }
      ]
    },
    offices: {
      title: 'Where we are',
      items: [
        { key: 'eg', name: 'Egypt', body: 'Head office: Dr. Sayed Abdel Wahed Street, Korba, Heliopolis, Cairo. Delivery team for all services.' },
        { key: 'sa', name: 'Saudi Arabia', body: 'ZATCA-compliant Odoo implementations and audit engagements for Saudi companies, delivered on site and remotely.' },
        { key: 'us', name: 'United States', body: 'Virtual CFO and Odoo services for US companies, expanding.' }
      ]
    }
  },

  contact: {
    title: 'Contact | Modern Financial Technology',
    description: 'Send one question or your last closed month. A licensed accountant replies within one business day with a first diagnosis and one concrete next step.',
    page: {
      eyebrow: 'Contact',
      title: 'One question can save you months.',
      intro:
        'You do not need to prepare anything. Send your question or your last closed month, and a licensed accountant, not a sales rep, replies within one business day with a first diagnosis and one concrete next step. Full confidentiality.'
    },
    form: {
      heading: 'Request your free trial-balance check',
      name: 'Full name',
      company: 'Company',
      email: 'Work email',
      phone: 'Phone / WhatsApp',
      phoneHint: 'Include your country code',
      country: 'Country',
      countries: [
        { value: 'EG', label: 'Egypt' },
        { value: 'SA', label: 'Saudi Arabia' },
        { value: 'US', label: 'United States' },
        { value: 'OTHER', label: 'Other' }
      ],
      service: 'What do you need help with?',
      servicePlaceholder: 'Choose a service',
      serviceOther: 'Not sure yet',
      message: 'Tell us briefly about your situation',
      messageHint: 'Entity, current system, what you need first.',
      consent: 'I agree to be contacted by MFT about this request, and I have read and accept the privacy notice, including its cookies and advertising pixels.',
      submit: 'Send request',
      sending: 'Sending…',
      success: 'Thank you. Your request has been received, and we will reply within one business day.',
      error: 'The request could not be sent. Please email or WhatsApp us directly using the details on this page.',
      offline: 'Online submission is not available right now. Please email or WhatsApp us using the details on this page.',
      required: 'Required',
      invalidEmail: 'Enter a valid email address.',
      honeypotLabel: 'Leave this field empty'
    },
    details: {
      title: 'Direct contact',
      email: 'Email',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
      whatsappCta: 'Start a WhatsApp conversation',
      responseLabel: 'Response time',
      response: 'Within one business day. Most clients started with a single WhatsApp message.',
      officesLabel: 'Offices',
      address: 'Dr. Sayed Abdel Wahed Street, Korba, Heliopolis, Cairo'
    }
  },

  // Trust centre: every item is enforced in the seg-audit code or measured in a documented
  // internal review. Sources: connector/guards.py, analysis/integrity.py, crypto/vault.py,
  // the hash-chained audit ledger, TRUST_MATRIX.md (Aug 2026), docs/security/01-security-posture.md.
  // What is not done yet is listed under notYet; nothing moves to the guarantees until it is done.
  // Partners: the programme for Odoo implementation partners and accounting firms. Controls
  // per activity come from seg-audit (analysis/odoo_best_practice.py → FAMILY_RULES, ISIC mapping).
  // Ready-made module packages and their Odoo App Store listing are not built yet: marked "soon".
  // Commission and resale margin are not decided: "set in the partner agreement", no figures.
  // Founding Members (Standard Enterprise Governance (SEG) launch, November 2026). Seat numbers come from site.config → founding:
  // {left} remaining, {filled} reserved (applications submitted), {total} seats. Never type the numbers here.
  // PENDING (Ahmed): the "Founding terms" benefit and the "after 50" FAQ are commercial commitments;
  // approve or remove before merge.
  founding: {
    // Real scarcity, no counter (launch lead, 3 Nov 2026): only 50 seats. Founder price: 50% off for life.
    // Counter copy lives in founding.counter below and shows only when site.config → founding.showCount is true.
    title: 'Standard Enterprise Governance (SEG) Founding Members | Only {total} seats. Founder price: 50% off for life',
    description: 'The Standard Enterprise Governance (SEG) Founding Members programme: only {total} seats. Founder price: 50% off for life, at every renewal. Start with a free check of your company’s trial balance at app.seg-audit.com.',
    ogAlt: 'Founding Members programme: only {total} seats. Founder price: 50% off for life',
    bar: 'SEG Founding Members: only {total} seats. Founder price: 50% off for life. Learn more',
    page: { eyebrow: 'Founding Members' },
    hero: {
      headline: 'SEG {accent}Founding Members{/accent}: only {total} seats. Founder price: 50% off for life',
      subhead: 'We are opening SEG, the governance platform from MFT, with its continuous audit product SEG Audit, to {total} companies as Founding Members. Founder price: 50% off for life, applied at every renewal. When the seats are taken, the programme closes.',
      cta: 'Claim your seat',
      secondary: 'How to join',
      assurance: ['Read-only access to your system', 'Evidence behind every finding', 'Reports in Arabic and English'],
      meterCaption: 'seats only. Founder price: 50% off for life',
      legend: { next: 'Your seat', open: 'Founding seat' }
    },
    homeBand: {
      title: 'Founding Members: only {total} seats. Founder price: 50% off for life',
      body: 'Founding seats on SEG are capped at {total} and will not reopen. Start with a free check of your company’s trial balance that flags its risk points in minutes.',
      more: 'Programme details'
    },
    final: {
      title: 'Only {total} seats. Founder price: 50% off for life.',
      body: 'Start with a free trial-balance check, and claim your seat before the count closes.'
    },
    // The real counter, later: replaces the matching copy above only when showCount is true and
    // The platform computes it: left = 50 − applications submitted (CEO, 5 Nov 2026). So {filled}
    // reads «reserved», not «joined»: an application is not a confirmed subscription. {total} is the cap (50).
    counter: {
      title: 'Standard Enterprise Governance (SEG) Founding Members | {left} of {total} seats left',
      description: 'The Standard Enterprise Governance (SEG) Founding Members programme: {total} seats, founder price: 50% off for life; {filled} reserved, {left} left.',
      ogAlt: '{left} of {total} seats left: Standard Enterprise Governance (SEG) Founding Members',
      bar: 'SEG Founding Members: {left} of {total} seats left. Learn more',
      'hero.headline': '{left} of {total} seats left: Standard Enterprise Governance (SEG) {accent}Founding Members{/accent}',
      'hero.subhead': 'SEG is the governance platform from MFT, with its continuous audit product SEG Audit. {filled} of {total} seats reserved so far; {left} remain. Founder price: 50% off for life.',
      'hero.meterCaption': 'seats left of {total}',
      'hero.legend.filled': 'Reserved: {filled}',
      'homeBand.title': 'Founding Members: {left} of {total} seats left',
      'homeBand.body': '{filled} of {total} founding seats reserved so far. Founding seats are capped at {total} and will not reopen. Founder price: 50% off for life.',
      'final.title': '{left} of {total} seats left.',
      'final.body': 'Every application counts against the seats left. Claim your seat before the count closes.'
    },
    // The lead magnet (CEO, 3 Nov 2026): trial-balance indicators only, not a full audit report.
    check: {
      eyebrow: 'The free check',
      title: 'A free check of your company’s trial balance that flags its risk points in minutes',
      intro: 'Not a full audit report: indicators computed directly from the balances in your trial balance, not estimates.',
      items: [
        { title: 'Suspense accounts', body: 'Balances left in clearing or suspense accounts.' },
        { title: 'Abnormal balances', body: 'An account with a balance against its nature, such as cash in credit.' },
        { title: 'Imbalance', body: 'Total debits do not equal total credits.' },
        { title: 'Heavy manual entries', body: 'A high share of manual entries on sensitive accounts.' },
        { title: 'Backdated entries', body: 'Entries dated earlier than the day they were recorded.' }
      ],
      cta: 'Check your trial balance free'
    },
    gets: {
      eyebrow: 'What a Founding Member gets',
      title: 'A front-row seat, not an ordinary subscription.',
      intro: 'Founding Members are the first to work on the platform with its team, and the first to be heard on it.',
      items: [
        { title: 'Onboarding with the MFT team', body: 'We connect your system read-only and walk through your first trial-balance check with you in one session, not a manual you read alone.' },
        { title: 'A direct line to the product team', body: 'Your feedback goes straight to the people building the platform, and you have a say in what we build next.' },
        { title: 'Founder price: 50% off for life', body: '50% off any plan, monthly or annual, at every renewal for as long as your subscription renews. Not offered once the {total} seats are filled.' },
        { title: 'The Founding Member title', body: 'Your company listed among the Founding Members, only with your written consent.' }
      ]
    },
    how: {
      eyebrow: 'How to join',
      title: 'Three steps to the risk points in your trial balance, in minutes.',
      steps: [
        { title: 'Sign up', body: 'Create your company account at app.seg-audit.com and start the free check. To reserve a Founding seat, apply through the application form: MFT approves each one by hand.' },
        { title: 'Upload your trial balance', body: 'Upload the trial balance of your last closed month, or connect Odoo read-only.' },
        { title: 'Get your trial-balance check', body: 'Indicators computed from your trial balance only: suspense accounts, abnormal balances, imbalances, heavy manual entries and backdated entries. Not a full audit report.' }
      ]
    },
    faq: [
      { q: 'Why only {total} seats?', a: 'Every Founding Member works directly with the MFT team on setup and follow-up, and that does not stretch beyond {total} companies in the first phase.' },
      { q: 'What happens once the {total} seats are filled?', a: 'The programme closes. The platform stays open for sign-up, without the founder price.' },
      { q: 'What does “Founder price: 50% off for life” mean?', a: '50% off any plan you choose, monthly or annual, applied at every renewal for as long as your subscription renews; you can cancel by yourself at any time. It is not offered once the seats are taken.' },
      { q: 'Can the platform change my data?', a: 'No. It reads only. The Odoo connection is read-only and the platform writes nothing to your system.' },
      { q: 'We are not on Odoo. Can we join?', a: 'Yes. Send your last closed month as a trial balance or spreadsheet and we work from that with you.' }
    ],
    // Founding seat application (page founding-members/apply/). Option values are the contract's
    // exactly (seg-audit docs/api/founding-applications.md); only the labels change.
    apply: {
      title: 'Apply for a Founding seat | Standard Enterprise Governance (SEG)',
      description: 'Apply to join the Standard Enterprise Governance (SEG) Founding Members from MFT: {total} seats only, every application reviewed by hand by the MFT team.',
      eyebrow: 'Founding seat application',
      headline: 'Apply for a seat among the {accent}Founding Members{/accent}',
      intro: 'Two minutes of your time. The MFT team reviews every application by hand, and approval is what reserves the seat. Once approved, you sign up on the platform with the same e-mail you applied with. An approved seat is held for 14 days; if you have not signed up and connected Odoo by then, the seat goes back to the pool.',
      counter: {
        caption: 'seats left of {total}',
        asOf: 'Last known count',
        full: 'The founding seats are taken. Apply and we will put you on the waitlist, and contact you if a seat opens.',
        off: 'Founding seat applications are paused for now. Get in touch and we will tell you if they reopen.',
        offCta: 'Contact us'
      },
      sections: { business: 'Your company', system: 'Your system', fit: 'Audit and role', contact: 'Contact details', commit: 'Participation and commitment' },
      fields: {
        companies: 'Companies or entities on one system',
        branches: 'Branches or locations',
        employees: 'Employees',
        je_monthly: 'Journal entries per month',
        revenue: 'Annual revenue (US$ equivalent)',
        erp: 'ERP',
        erp_version: 'Version (optional)',
        erp_version_hint: 'e.g. 17.0 or 18',
        hosting: 'Hosting',
        modules: 'Modules in use',
        sector: 'Sector',
        markets: 'Markets',
        auditor: 'Do you have an auditor?',
        role: 'Your role',
        main_pain: 'What is the biggest finance or control problem you want solved?',
        main_pain_hint: 'A line or two is enough (up to 500 characters).',
        contact_name: 'Name',
        company_name: 'Company name',
        email: 'Work e-mail',
        email_hint: 'Sign up on the platform later with this same e-mail so the seat reaches your company.',
        phone: 'Phone (optional)',
        consent_contact: 'I agree that the MFT team may contact me about this application, under the [[privacy/|privacy notice]].',
        case_study: 'Open to a case study about our experience',
        testimonial: 'Open to a written or video testimonial',
        logo: 'Open to showing our logo among the Founding Members',
        annual_commitment: 'We commit to an annual subscription',
        beta_feedback: 'We will give regular feedback on new features',
        commitHint: 'All optional; they help us order applications. Your name or logo is never published without a separate written approval.',
        choose: 'Choose',
        honeypot: 'Leave this field empty'
      },
      options: {
        employees: [['1_10', '1 to 10'], ['11_50', '11 to 50'], ['51_200', '51 to 200'], ['201_1000', '201 to 1,000'], ['1000_plus', 'More than 1,000']],
        je_monthly: [['under_500', 'Under 500 entries'], ['500_2k', '500 to 2,000'], ['2k_10k', '2,000 to 10,000'], ['10k_50k', '10,000 to 50,000'], ['50k_plus', 'More than 50,000']],
        revenue: [['under_1m', 'Under 1M'], ['1m_5m', '1M to 5M'], ['5m_25m', '5M to 25M'], ['25m_100m', '25M to 100M'], ['over_100m', 'Over 100M']],
        erp: [['odoo', 'Odoo'], ['other', 'Another system']],
        hosting: [['odoo_online', 'Odoo Online'], ['odoo_sh', 'Odoo.sh'], ['on_premise', 'Our own server (on-premise)'], ['other', 'Other']],
        modules: [['accounting', 'Accounting'], ['sales', 'Sales'], ['purchase', 'Purchase'], ['inventory', 'Inventory'], ['manufacturing', 'Manufacturing'], ['pos', 'Point of Sale'], ['hr_payroll', 'HR and payroll'], ['projects', 'Projects'], ['other', 'Other']],
        sector: [['manufacturing', 'Manufacturing'], ['trading', 'Trading and distribution'], ['retail', 'Retail'], ['services', 'Services'], ['construction', 'Construction'], ['healthcare', 'Healthcare'], ['hospitality', 'Hospitality'], ['technology', 'Technology'], ['other', 'Other']],
        markets: [['EG', 'Egypt'], ['SA', 'Saudi Arabia'], ['OTHER', 'Other markets']],
        auditor: [['none', 'None'], ['internal', 'Internal auditor'], ['external', 'External auditor'], ['both', 'Internal and external']],
        role: [['owner', 'Owner or partner'], ['cfo', 'CFO'], ['finance_manager', 'Finance manager'], ['accountant', 'Accountant'], ['other', 'Other']]
      },
      errors: {
        required: 'This field is required.',
        email: 'Enter a valid e-mail address.',
        number: 'Enter a whole number from {min} to {max}.',
        pick: 'Choose at least one.',
        length: 'Write {min} to {max} characters.',
        phone: 'Digits, spaces and + ( ) - only, 6 to 32 characters.',
        consent: 'We need your consent to be contacted to send the application.',
        server: 'Please check the highlighted fields.'
      },
      submit: 'Send application',
      submitWaitlist: 'Join the waitlist',
      sending: 'Sending…',
      success: 'Application received, thank you. Check your e-mail and confirm your application from the link we sent (valid for 72 hours); it does not reach the MFT team until it is confirmed. The team then reviews every application by hand and will contact you.',
      successWaitlist: 'Application received, thank you. Check your e-mail and confirm your application from the link we sent (valid for 72 hours). The seats are taken for now, so once confirmed your application goes on the waitlist, and we will contact you if a seat opens.',
      captchaFailed: 'The check that you are not a robot did not complete. Please try again.',
      rateLimited: 'Too many attempts in a short time. Please try again in a little while.',
      failed: 'The application could not be sent right now. Please try again shortly, or e-mail us at {email}.',
      aside: {
        title: 'What happens after you apply',
        steps: [
          'You confirm your e-mail from the link you receive; the application does not reach the team before that.',
          'The MFT team reviews your application by hand.',
          'Approval reserves one of the {total} seats for you at once, for 14 days.',
          'You sign up on the platform with the same e-mail and connect Odoo, and the seat becomes your company’s.'
        ],
        note: 'One seat per company and per Odoo database.'
      },
      cta: 'Apply for a Founding seat'
    },
  },

  partners: {
    title: 'Standard Enterprise Governance (SEG) partner programme | Accounting and audit firms, Odoo partners',
    description: 'The Standard Enterprise Governance (SEG) partner programme for accounting and audit firms and Odoo implementation partners in Egypt and Saudi Arabia: review your clients faster from one account for up to 25 companies, with Arabic reports signed off in your firm’s name.',
    page: {
      eyebrow: 'Partners',
      title: 'Your clients run Odoo. Continuous audit, under your name.',
      intro: 'The partner programme of Standard Enterprise Governance (SEG) from MFT, with its continuous audit product SEG Audit, for accounting and audit firms and Odoo implementation partners in Egypt and Saudi Arabia. Give your clients continuous review of their books: read-only access, every finding with its evidence, and your firm’s sign-off before the final sign-off by an MFT reviewer.',
      cta: 'Become a partner'
    },
    value: {
      eyebrow: 'Value for your firm',
      title: 'Review your clients faster. Under your name.',
      items: [
        { title: 'The platform prepares, you judge', body: `${N(F.checks)} checks across ${F.reports} reports on each company’s books, with findings ranked by severity and each one tied to its evidence. You read the ten that matter instead of thousands of entries, and the professional judgement stays yours.` },
        { title: 'All your clients from one account', body: 'The Enterprise plan covers up to 25 companies and 100 reports a month on one account, with the same method for every client.' },
        { title: 'Signed off in your firm’s name', body: 'Your firm signs the report off internally before the final sign-off by a named MFT reviewer, so it reaches your client under your name.' },
        { title: 'A recurring monthly service', body: 'You read the approved report with your client before every close. A monthly relationship instead of a yearly visit.' }
      ]
    },
    tracks: {
      eyebrow: 'Three tracks',
      title: 'Choose the way of working that fits your firm.',
      items: [
        { title: 'Referral', body: 'Introduce a client; we sell, invoice and serve, and you earn a commission on collected revenue.' },
        { title: 'Reseller', body: 'Sell and invoice yourself at the partner price, and give your clients first-line support.' },
        { title: 'Practice partner', body: 'Offer continuous audit as a monthly service in your firm’s name, from one account for up to 25 companies, and read the reports with your clients before every close.' }
      ]
    },
    // Partner levels. A null figure shows `pending` on the page; put the number (as text, e.g. '20%')
    // only after the CEO approves it in writing (marketing/sales/03-partner-program.md §2).
    levels: {
      eyebrow: 'Levels',
      title: 'Three levels that grow with your client base.',
      caption: 'Levels are reviewed every quarter and counted in active paying companies.',
      cols: ['Registered', 'Certified', 'Premier'],
      pending: 'Set in the partner agreement',
      rows: [
        { label: 'Requirement', values: ['A signed agreement and an intro session', 'One certified person and 3 active paying companies', 'Two certified people and 10 active paying companies'] },
        { label: 'Referral commission', values: [null, null, null] },
        { label: 'Reseller discount', values: [null, null, null] },
        { label: 'Registered-deal protection', values: [null, null, null] },
        { label: 'Benefits', values: ['A demo account, training and co-selling on your first deal', 'A listing in the partner directory, with your consent', 'Priority on routed opportunities, and co-marketing'] }
      ]
    },
    enable: {
      eyebrow: 'Enablement',
      title: 'From application to first client, step by step.',
      steps: [
        { when: 'Day 0', title: 'Partner application', body: 'From the form at the end of this page.' },
        { when: 'Within 3 days', title: 'A 30-minute call', body: 'Your type of firm, your clients on Odoo, their activities, and the independence rule.' },
        { when: 'Week 1', title: 'Agreement and demo account', body: 'The partner agreement, a demo account with no client data, and the sales kit in Arabic and English.' },
        { when: 'Week 2', title: '90-minute training', body: 'A product tour, read-only connection, what we say and what we don’t, and deal registration, then a short test.' },
        { when: 'Month 1', title: 'Your first three clients', body: 'A free trial-balance check for three of your client companies, and a joint read-out with you and the MFT team.' }
      ]
    },
    types: {
      eyebrow: 'Who it is for',
      title: 'Three kinds of partner.',
      items: [
        { title: 'Odoo implementation partners', body: 'Add continuous audit to implementation and upgrade projects, so your client knows the ledger is right after go-live, not only on hand-over day.' },
        { title: 'Accounting and audit firms', body: 'Offer your Odoo clients a monthly review of their books before close, with an Arabic report that ties every finding to its source.' },
        { title: 'Independent advisers and fractional CFOs', body: 'Read every client’s books with the same method, from one account, instead of a manual review that differs from company to company.' }
      ]
    },
    gets: {
      eyebrow: 'What partners get',
      title: 'What is available today.',
      items: [
        { title: 'One account, many companies', body: 'The Enterprise plan covers up to 25 companies and 100 reports a month on one account, so you run your clients from one place.' },
        { title: `${N(F.checks)} checks across ${F.reports} reports`, body: 'Duplicate payments, near-duplicate vendors, approvals and segregation of duties, cut-off, inventory valuation, tax and e-invoicing (ETA and ZATCA), and the financial statements.' },
        { title: 'A free trial-balance check for each client company', body: 'Every company starts with a free check of its trial balance that flags its risk points in minutes, so your client sees the value on their own numbers before any commitment.' },
        { title: 'A read-only connector module', body: 'The seg_audit_connector module is open source (LGPL-3) and runs on Odoo 17, 18 and 19: a dedicated read-only user, and a button that revokes access at once.' },
        { title: 'A named reviewer on every report', body: 'Every report stays a draft until an MFT reviewer approves it by name. Reports support decisions; they are not a formal audit opinion.' }
      ]
    },
    packages: {
      eyebrow: 'Activity packages',
      title: 'Each activity has its own controls in Odoo.',
      intro: 'The platform classifies the client’s activity (ISIC Rev.4) and then checks the controls that activity needs in its Odoo setup, on top of the general checks.',
      items: [
        { title: 'Trading and distribution', sectors: 'Wholesale and distribution', controls: ['Inventory valued automatically with every move', 'Three-way match: purchase order, receipt and bill', 'Freight and customs costs loaded onto inventory'] },
        { title: 'Retail and point of sale', sectors: 'Shops, restaurants and points of sale', controls: ['Inventory valued automatically with every move', 'Three-way match: purchase order, receipt and bill', 'Point-of-sale sessions closed the same day'] },
        { title: 'Manufacturing', sectors: 'Manufacturing, including food and beverage', controls: ['Inventory valued automatically with every move', 'Active bills of materials for manufactured products', 'Work orders on manufacturing orders', 'A separate work-in-progress account'] },
        { title: 'Services and projects', sectors: 'Contracting, healthcare and professional services', controls: ['Timesheets on projects', 'Analytic distribution tying income and expenses to each project’s cost'] }
      ],
      status: 'SEG Audit checks the controls above today on any Odoo system. Ready-made module packages for each activity are being built and will be listed on the Odoo App Store soon; until then they are set up within the implementation project.'
    },
    independence: {
      title: 'If you are the client’s external auditor',
      body: 'To protect your independence: referral only, with no commission on that client, and the client contracts with MFT directly. For clients whose statements you do not audit, you can be a reseller or a practice partner. Every partner agreement applies this limit.'
    },
    form: {
      heading: 'Become a partner',
      type: 'Partner type',
      typeOptions: [
        { value: 'odoo-partner', label: 'Odoo implementation partner' },
        { value: 'accounting-firm', label: 'Accounting or audit firm' },
        { value: 'consultant', label: 'Independent adviser or fractional CFO' },
        { value: 'other', label: 'Other' }
      ],
      clients: 'Your clients on Odoo',
      clientOptions: [
        { value: '<5', label: 'Fewer than 5' },
        { value: '5-10', label: '5 to 10' },
        { value: '10-25', label: '10 to 25' },
        { value: '25+', label: 'More than 25' }
      ],
      message: 'Tell us briefly about your clients and their activities',
      submit: 'Become a partner',
      success: 'Your application arrived. We will contact you to book the call.',
      aside: {
        title: 'What happens next',
        steps: ['We review your application and contact you by email or WhatsApp.', 'A 30-minute call to pick the first clients and agree the terms.', 'Your clients start with a free check of their trial balance, and you read the results with us.']
      }
    }
  },

  trustCenter: {
    title: 'Trust & security | Standard Enterprise Governance (SEG) by MFT',
    description: 'What the SEG platform guarantees and how each guarantee is enforced in code: read-only access, no guessed numbers, a ledger that cannot be edited silently, full client isolation. Plus what we do not claim yet.',
    page: {
      eyebrow: 'Trust & security',
      title: 'What we guarantee, how it is enforced, and what we do not claim yet.',
      intro: 'Every guarantee on this page is built into the Standard Enterprise Governance (SEG) platform and guarded by an automated test, not a line in a policy. At the end of the page: what we have not done yet, written just as plainly.'
    },
    groups: [
      {
        eyebrow: 'Access to your system',
        title: 'We read, we never write. The limit is enforced before any request leaves our servers.',
        items: [
          {
            title: 'Read-only, enforced in code',
            body: 'Every request to Odoo passes an allowlist before it leaves the platform. Only read methods are allowed; any attempt to create, edit or delete is refused inside the platform and never reaches your system.',
            proof: 'Guarded by a test that attempts a write and confirms it is refused before the network.'
          },
          {
            title: 'We do not open your documents',
            body: 'When a check needs to know whether a product or lot has a document, we read the attachment’s name, type and date only. Reading attachment content is refused in every check, and so is an "all fields" read on attachments.'
          },
          {
            title: 'Your system key never passes through your browser',
            body: 'The connection key is kept in an isolated secrets vault and used on our servers only while your report is prepared. If the vault cannot be reached, the request stops rather than continuing without it.'
          }
        ]
      },
      {
        eyebrow: 'Numbers and AI',
        title: 'Software computes, AI explains, an accountant approves.',
        items: [
          {
            title: 'Every number comes from your data, or reads "not available"',
            body: 'Deterministic software computes every figure from your data before the AI sees anything. The AI writes the narrative only, in a template that leaves it no room to add a number of its own.',
            proof: 'An integrity gate checks every number in the narrative: if it cannot find its source in the computed data, the report is flagged for review.'
          },
          {
            title: 'Your ledger rows never reach the AI model',
            body: 'Raw transactions are aggregated on the platform’s server; what reaches the model is computed figures, capped in size for each report type. Which model providers may process client data is set by a written policy the code enforces.'
          },
          {
            title: 'A draft until a named accountant approves it',
            body: 'Every report is a watermarked draft until a registered reviewer approves it by name. Reports support decisions; they are not a formal audit opinion, and every report says so.'
          }
        ]
      },
      {
        eyebrow: 'Record integrity',
        title: 'What appears in your report cannot be changed silently.',
        items: [
          {
            title: 'A chained log that exposes edits and deletions',
            body: 'Everything in your organisation’s account is recorded in a log mathematically linked to the entry before it, one chain per organisation. Any edit or deletion, even straight in the database, shows up and is located.',
            proof: 'Tried in production: a row edited with a direct database command was detected.'
          },
          {
            title: 'Approval is bound to the approved version',
            body: 'A report’s approval is bound to a fingerprint of its content. Regenerate the report and the approval drops automatically, so no signature ever covers content its signer did not see.'
          }
        ]
      },
      {
        eyebrow: 'Isolation and operations',
        title: 'Each client’s data in its own space, and a platform with no more privilege than it needs.',
        items: [
          {
            title: 'Full isolation between organisations',
            body: 'Ask for another organisation’s data and the answer is "not found", not "forbidden", so you cannot even tell it exists. Isolation is tested automatically with every update.'
          },
          {
            title: 'Least privilege',
            body: 'Platform services run under non-administrative accounts with every extra system privilege removed, verified on the running servers.'
          },
          {
            title: 'Backups we have actually restored',
            body: 'We restored a full copy of the platform databases onto a clean server and confirmed it works, rather than only taking backups.'
          },
          {
            title: `More than ${N(F.testsFloor)} automated tests before every update`,
            body: `No update reaches clients until all of them pass. The platform runs ${N(F.checks)} checks across ${F.reports} reports today; these figures are read straight from the platform code (${F.measuredOn}).`
          }
        ]
      }
    ],
    notYet: {
      title: 'What we do not claim yet',
      intro: 'We list it here because a professional buyer will ask, and because trust starts with not overstating.',
      items: [
        'The platform has not yet had an independent penetration test by an outside firm.',
        'We do not hold a SOC 2 or ISO 27001 certification.',
        'The data processing agreement (DPA) and the sub-processor list are being drafted with legal counsel and will be published here once in force.'
      ]
    },
    report: {
      title: 'Found a vulnerability?',
      body: 'Email {email} and please do not disclose it publicly. We reply within 72 business hours.'
    },
    securityEmail: 'security@seg-audit.com',
    platformLink: 'SEG platform',
    updated: `Last updated: ${F.measuredOn}`
  },

  privacy: {
    title: 'Privacy notice | Modern Financial Technology',
    description: 'What MFT collects through this website, why, and how to contact us about your data.',
    page: {
      eyebrow: 'Privacy',
      title: 'What we collect, and why.',
      intro: 'This website is a marketing site. We collect what you type into the contact form, and we use cookies and advertising pixels (Meta Pixel), described below.'
    },
    sections: [
      {
        title: 'What we collect',
        body: 'When you submit the contact form we receive the name, company, email, phone number, country, service of interest and message you enter, plus the page you sent it from and the language you used. When you apply for a Founding seat we receive the contact details you enter (name, company, work e-mail, optional phone), your answers about the company and its system (size bands, ERP, modules, sector, markets, auditor, your role, the main problem) and the participation choices you tick.'
      },
      {
        title: 'Cookies and visits',
        body: 'This site uses cookies and advertising pixels that run when the page opens, and we disclose them here. When you submit a form on the site or create an account on SEG, your acceptance of this privacy notice and the terms includes consent to the cookies and advertising pixels described in this section.',
        items: [
          { k: 'Essential', v: 'your browser keeps the visit source (utm) for the session, which is passed to the sign-up link on SEG so we know which ad or post brought you. It is not sent to a third party.' },
          { k: 'Advertising', v: 'the Meta Pixel from Meta Platforms loads when the page opens, for three purposes: advertising, conversion measurement and retargeting (showing our ads to people who visited the site).' },
          { k: 'What is sent to Meta', v: 'the page address and the previous page, the time of the visit, browser and device type, your IP address, clicks on the free-check button, the fact that a Founding seat application was sent (not its contents), and a cookie identifier. It sets the _fbp cookie (up to 90 days), and _fbc when you arrive from an ad. We do not send what you type into forms.' },
          { k: 'Later', v: 'we may add the TikTok Pixel for the same purposes and under the same rules, after this notice is updated.' },
          { k: 'Your right to object and withdraw consent', v: 'you may object to this processing or withdraw your consent at any time, under Egypt’s Personal Data Protection Law No. 151 of 2020 and Saudi Arabia’s Personal Data Protection Law, by writing to privacy@seg-audit.com. You can also block third-party cookies in your browser, or manage what reached Meta in your account’s ad settings.' }
        ]
      },
      {
        title: 'Who processes data on our behalf',
        body: 'We use only these parties, each for its purpose:',
        items: [
          { k: 'Website hosting', v: 'GitHub Pages by GitHub, Inc., which may log IP addresses for security.' },
          { k: 'Forms', v: 'the MFT customer system on Odoo (erp.seg-audit.com).' },
          { k: 'Founding seat applications', v: 'the SEG platform operated by MFT (app.seg-audit.com), where the MFT team reviews each application.' },
          { k: 'Advertising', v: 'Meta Platforms (Meta Pixel), and later TikTok (TikTok Pixel).' }
        ]
      },
      {
        title: 'Why we collect it',
        body: 'To reply to your request, run your free trial-balance check and, if you become a client, to run the engagement. Your details are recorded in MFT’s customer system and are not sold, rented or shared with third parties for their own purposes.'
      },
      {
        title: 'Financial data you send us',
        body: 'Any ledger, trial balance or report you share for the trial-balance check is treated as confidential client data: read-only access, restricted to the engagement team, and deleted on request once the engagement ends.'
      },
      {
        title: 'Your rights',
        body: 'You can ask what we hold about you, ask for it to be corrected, or ask for it to be deleted at any time by emailing {email}. We answer within one business day.'
      },
      {
        title: 'Other MFT platforms',
        body: 'The SEG platform (app.seg-audit.com) has its own terms and privacy policy, which apply when you create an account there.'
      }
    ],
    updated: 'Last updated: November 2026'
  },

  intelligence: {
    title: 'MFT Intelligence AI Agents | Modern Financial Technology',
    description:
      'Twelve finance AI agents built by MFT’s accountants. Auditor and Virtual CFO available now as a managed service; ten more in internal validation. Every action stays a draft until a named person approves it.',
    page: {
      eyebrow: 'MFT Intelligence',
      title: 'AI agents that work your numbers. Accountants who sign off.',
      intro:
        'MFT Intelligence is a set of twelve specialised finance agents built by our audit and Odoo teams. Each does one job continuously on your own data. Every finding cites the records it came from, every proposed action stays a draft until a named person approves it, and a licensed MFT accountant reviews what reaches you.'
    },
    definition: 'MFT Intelligence is a managed AI-agent service from Modern Financial Technology: MFT runs specialised audit, CFO and finance-operations agents on a client’s ERP data and delivers reviewed findings, draft entries and reports under a governance policy enforced in code.',
    statusLabels: { available: 'Available now', validation: 'Internal validation, launching soon' },
    benefitLabel: 'What it does for you',
    agentsTitle: 'Twelve agents. Two selling today.',
    agentsIntro: 'The Auditor and Virtual CFO agents are delivered now as a managed service. The other ten run daily inside MFT’s own validation programme and are promoted only after a written decision, never automatically.',
    learnMore: 'Full details and pricing path',
    agents: [
      { slug: 'auditor', name: 'Auditor agent', status: 'available', page: 'intelligence/auditor/',
        does: ['Continuous review of your books against ISA 320 materiality thresholds calibrated to your business', 'Flags every transaction or balance above the threshold, ranked by financial impact', 'Duplicate payments, near-duplicate vendors, unusual approvals and cut-off issues'],
        benefit: 'Problems surface when they happen, not at the annual audit, and the risk of a material misstatement drops.' },
      { slug: 'virtual-cfo', name: 'Virtual CFO agent', status: 'available', page: 'intelligence/virtual-cfo/',
        does: ['Profitability, cash flow and budget-variance analysis every month', 'Board-ready reports in Arabic or English', 'Reviewed and presented by an MFT accountant'],
        benefit: 'CFO-level visibility without the cost of a full-time hire, built for small and mid-sized companies.' },
      { slug: 'accountant', name: 'Accountant agent', status: 'validation',
        does: ['Complete month-end close checklist', 'Bank reconciliation and detection of entries above materiality', 'Drafts correcting entries for your approval, never posts automatically'],
        benefit: 'A faster, more accurate monthly close with your team keeping the final say.' },
      { slug: 'warehouse', name: 'Warehouse, inventory & production agent', status: 'validation',
        does: ['Stock levels, reorder points, valuation and slow-moving items', 'Receipts matched to purchase orders; abnormal movements flagged', 'Bill-of-materials, manufacturing-order and quality-check consistency'],
        benefit: 'Less capital locked in idle stock; receiving and production discrepancies caught early.' },
      { slug: 'hr', name: 'HR agent', status: 'validation',
        does: ['Headcount, probation periods and contracts approaching expiry', 'Payroll register reconciled against the employee master', 'Recruiting, performance, training and benefits reporting, with names and national IDs redacted'],
        benefit: 'Payroll discrepancies surface early and no contract renewal is forgotten.' },
      { slug: 'payroll', name: 'Payroll & workforce-cost agent', status: 'validation',
        does: ['Workforce cost by department and project', 'Overtime trends', 'Indicative end-of-service and leave provisions, always flagged for accountant confirmation'],
        benefit: 'You see where labour cost is going before the payroll run closes.' },
      { slug: 'sales', name: 'Sales & CRM agent', status: 'validation',
        does: ['Pipeline, conversion and customer concentration', 'Receivables ageing against credit limits', 'Discount and return patterns by customer and channel'],
        benefit: 'Margin and credit exposure become visible per customer, not just per month.' },
      { slug: 'procurement', name: 'Procurement agent', status: 'validation',
        does: ['Purchase-order to receipt to invoice matching', 'Vendor master hygiene: duplicates, dormant vendors, changed bank details', 'Price variance against agreed terms'],
        benefit: 'Leakage in the purchase cycle is caught at the order, not at the audit.' },
      { slug: 'tax', name: 'Tax & compliance agent', status: 'validation',
        does: ['VAT and withholding checks per country (Egypt 14%, Saudi 15%)', 'E-invoicing coverage (ETA, ZATCA) against the sales ledger', 'Filing calendar and exposure summary'],
        benefit: 'Tax exposure is known before the return, not after the assessment.' },
      { slug: 'treasury', name: 'Treasury & cash-flow agent', status: 'validation',
        does: ['13-week cash-flow view from open receivables, payables and commitments', 'Bank balance and facility monitoring', 'Runway recalculated when terms change'],
        benefit: 'No cash surprise reaches the board first.' },
      { slug: 'fixed-assets', name: 'Fixed assets agent', status: 'validation',
        does: ['Register completeness against purchases', 'Depreciation and disposal consistency', 'Physical-verification follow-up'],
        benefit: 'The asset register matches reality and the depreciation charge is defensible.' },
      { slug: 'projects', name: 'Project costing agent', status: 'validation',
        does: ['Cost-to-complete and margin per project', 'Retentions, advances and subcontractor certificates', 'Progress billing against milestones'],
        benefit: 'Project margin is known during the project, not at handover.' }
    ],
    governance: {
      eyebrow: 'Governance, in code',
      title: 'A written AI policy that the software enforces.',
      body: 'Most AI governance is a document on a shelf. Ours is a table in the codebase: which model providers may process real client data, which are barred, how the default is chosen, and what every run must log. Changing the table requires a written decision from the CEO in the same commit. The full policy is available to clients on request.',
      items: [
        { title: 'Provider authorisation', body: 'Real client data may only be processed by providers the policy authorises. Unauthorised providers are refused even when technically configured, and automatic fallback stops rather than switching to one.' },
        { title: 'Evidence or silence', body: 'Every finding must cite the record ids the agent actually retrieved. Findings that cite nothing, or a number not in the cited records, are rejected and shown struck through, never as facts.' },
        { title: 'Run log, seven years', body: 'Each run records provider, model, whether it ran in the cloud, tokens, client and task. Retained seven years by default, in line with ISA 230 working-paper conventions.' },
        { title: 'Your data stays on your system', body: 'Client ledgers are read from the client’s own Odoo at query time and are not copied into MFT’s systems, in line with Saudi PDPL and Egyptian data-protection requirements.' }
      ]
    },
    execution: {
      eyebrow: 'Execute after approval',
      title: 'Agents draft. People approve. Then, and only then, it executes.',
      body: 'The Accountant and Warehouse agents can carry an approved draft into Odoo so nobody re-keys it. The approval is tiered by your ISA 320 materiality threshold, approvers are registered by name, and mistakes are corrected by reversal, and nothing is ever deleted.',
      steps: [
        { title: 'Draft', body: 'The agent proposes a correcting entry or stock adjustment, with the evidence it cites.' },
        { title: 'Named approval', body: 'One registered approver below your materiality threshold; two at or above it, the second a reviewer or manager.' },
        { title: 'Execution & log', body: 'The entry is created in Odoo by a dedicated, restricted user and recorded in the run log with who approved, when, and the resulting entry id.' }
      ],
      note: 'Live Odoo write-back is delivered per client after their connector is configured; until then approved drafts are handed to your team as ready-to-post entries.'
    },
    segAudit: {
      eyebrow: 'Inside SEG',
      title: 'Every SEG report will be AI-reviewed before it reaches you.',
      body: 'The Auditor and Virtual CFO agents are being built into the SEG report pipeline itself, not as a paid add-on. Their output enters the platform’s existing two-stage human approval chain as a draft, the requester never approves their own run, and nothing is released without a person’s decision. The integration is in final review and switches on only after the AI-processing disclosure is published in the platform’s terms.',
      link: { label: 'About the SEG platform', href: 'https://app.seg-audit.com' }
    },
    faq: {
      title: 'Direct answers',
      items: [
        { q: 'What is MFT Intelligence?', a: 'A managed AI-agent service from Modern Financial Technology. Twelve specialised finance agents run on your ERP data; MFT accountants review the output; a governance policy enforced in code controls what the agents may do and where your data goes.' },
        { q: 'Which agents can I buy today?', a: 'The Auditor agent and the Virtual CFO agent, delivered as a managed service with monthly or continuous review. The other ten are in MFT’s internal validation programme and are offered as they are promoted.' },
        { q: 'Does an agent ever post or pay anything by itself?', a: 'No. Agents only draft. A named, registered person approves every action; above your materiality threshold a second person must approve. Corrections are made by reversal entries, never deletion.' },
        { q: 'Where does my data live?', a: 'On your own Odoo (or other ERP). Agents read it through the API at query time; MFT does not copy your ledger into its systems.' },
        { q: 'How is it priced?', a: 'Per engagement, based on the agents you need, the number of entities and your monthly transaction volume. Request a quote and you receive a scoped proposal from an MFT accountant.' },
        { q: 'Is this the same as SEG?', a: 'Standard Enterprise Governance (SEG) is MFT’s governance and audit platform. The same Auditor and CFO agents are being integrated into its report pipeline so every report is AI-reviewed before human review. MFT Intelligence is the standalone service you can engage directly, with or without seg-audit.' }
      ]
    },
    plans: {
      eyebrow: 'Engagement',
      title: 'Scoped to you. Quoted by an accountant.',
      intro: 'Three engagement shapes, priced per scope. Every one includes onboarding by an MFT accountant, materiality calibration for your business, and integration with your Odoo (or other ERP) data with every proposed action held as a draft for your approval.',
      cta: 'Request a quote',
      note: 'No fixed prices are published. Each engagement is priced to entity count, transaction volume and reporting scope.',
      tiers: [
        { name: 'Essential', summary: 'One agent, one monthly report.', features: ['Your choice of the Auditor or the Virtual CFO agent', 'One monthly report reviewed by an MFT accountant', 'ERP connection and onboarding; proposals delivered as drafts for your approval'] },
        { name: 'Professional', summary: 'Audit and CFO together, continuously.', features: ['Auditor and Virtual CFO agents together', 'Continuous weekly review of your books', 'Instant alerts when a transaction exceeds your materiality threshold', 'Monthly review call with your MFT accountant'], featured: true },
        { name: 'Complete', summary: 'Every agent, fully integrated.', features: ['All twelve agents, the validation-stage ones as they are promoted', 'Full Odoo integration across finance, inventory, HR and projects', 'Custom reports and dashboards', 'Named MFT lead for the engagement'] }
      ]
    }
  },

  // ---- Agent sales pages (Auditor, Virtual CFO) ----
  agentPages: {
    labels: { deliverables: 'What you receive', cadence: 'Cadence', delivery: 'How it is delivered', forWho: 'Who it is for', faq: 'Questions buyers ask', cta: 'Request a quote', back: 'All agents', related: 'Related service' },
    items: [
      {
        slug: 'auditor',
        name: 'Auditor agent',
        title: 'Auditor agent: continuous ISA 320 review of your books | MFT Intelligence',
        description: 'The MFT Auditor agent reviews every transaction against your ISA 320 materiality threshold, cites its evidence, and delivers findings reviewed by a licensed accountant. Available now.',
        eyebrow: 'MFT Intelligence · Available now',
        headline: 'Every transaction reviewed. Every finding evidenced.',
        definition: 'The Auditor agent is a continuous internal-audit service: an AI agent reviews 100% of your transactions against ISA 320 materiality thresholds calibrated to your business, and a licensed MFT auditor reviews and signs every finding before it reaches you.',
        intro: 'Annual audits sample a few percent and leave eleven months uncovered. The Auditor agent reads the whole ledger, every week or every day, ranks what it finds by financial impact, and cites the exact records, or says nothing.',
        deliverables: ['Findings report ranked by impact, each with cited record ids and an ISA classification', 'Materiality threshold calibrated at onboarding (1% of revenue or 5% of net profit, per ISA 320) and reviewed quarterly', 'Duplicate and near-duplicate payment analysis, vendor-master hygiene, approval and cut-off exceptions', 'Alerts when a transaction exceeds your threshold (Professional and above)', 'Reviewer notes from a licensed MFT auditor on every report', 'Seven-year run log available to your external auditor'],
        cadence: 'Monthly report (Essential) or continuous weekly review with alerts (Professional).',
        delivery: ['Onboarding call: entity, ERP, chart of accounts, materiality calibration, registered approvers', 'Connector to your Odoo (or ledger export for other systems); your data stays on your system', 'Agent runs on schedule; a licensed MFT auditor reviews, annotates and signs the report', 'Monthly review call to decide what to do about the findings'],
        forWho: 'Owner-managed companies and groups in Egypt and Saudi Arabia that want audit coverage between annual audits, and finance teams preparing for external audit, financing or acquisition.',
        faq: [
          { q: 'Does the agent replace our external auditor?', a: 'No. It is continuous internal review. Its run log and evidence trail make the external audit faster and cheaper, and its findings are classified against ISA so your auditor can use them.' },
          { q: 'What does “evidence or silence” mean in practice?', a: 'Each finding names the journal entries, payments or balances it is based on. If the agent cannot cite a record it retrieved, the finding is rejected and never shown as fact.' },
          { q: 'Can it fix what it finds?', a: 'It drafts. Correcting entries are proposed to your team, approved by a registered person, or two people above your materiality threshold, and only then posted. Nothing is deleted; mistakes are reversed.' },
          { q: 'Which systems does it read?', a: 'Odoo natively. Other ERPs via a periodic ledger export during onboarding.' }
        ],
        related: { label: 'Internal Audit service', href: 'services/internal-audit/' }
      },
      {
        slug: 'virtual-cfo',
        name: 'Virtual CFO agent',
        title: 'Virtual CFO agent: monthly board-ready analysis | MFT Intelligence',
        description: 'The MFT Virtual CFO agent analyses profitability, cash flow and budget variances from your ERP every month and produces board-ready reports reviewed by an MFT accountant. Available now.',
        eyebrow: 'MFT Intelligence · Available now',
        headline: 'A board pack every month. A CFO’s questions with it.',
        definition: 'The Virtual CFO agent is a managed monthly reporting service: an AI agent analyses profitability, cash flow and budget variances directly from your ERP data, and an MFT accountant reviews the analysis and presents it to management.',
        intro: 'Most small and mid-sized companies close the month and still cannot say where the margin went. The Virtual CFO agent produces the pack a CFO would build, by product, customer and cost centre, and MFT’s accountant sits with you to turn it into decisions.',
        deliverables: ['Monthly management pack: P&L by product and customer, cash-flow statement and 13-week forecast, working-capital position, budget variances', 'Board-ready summary in Arabic or English with the three questions management should ask', 'Variance explanations tied to the underlying entries (cited, never asserted)', 'Runway and covenant watch when terms or balances change', 'Monthly review call with an MFT accountant; quarterly with a partner', 'Seven-year run log'],
        cadence: 'Monthly pack and review call; weekly cash view on Professional and above.',
        delivery: ['Onboarding: entities, chart of accounts, budget upload, reporting currency and language', 'Connector to Odoo or a monthly ledger export; your data stays on your system', 'Agent produces the analysis; an MFT accountant reviews, annotates and signs it', 'Review meeting with management; actions tracked to the next month'],
        forWho: 'Growing companies in Egypt, Saudi Arabia and the US that need CFO-level judgement every month without a full-time hire, and founders who want to understand their own numbers.',
        faq: [
          { q: 'Is this a dashboard or a person?', a: 'Both. The agent does the analysis from your data; a licensed MFT accountant reviews it, signs it and presents it. You are never handed raw AI output.' },
          { q: 'Do we need Odoo?', a: 'It works best on Odoo, but a monthly trial balance and sub-ledger export from any system is enough to start.' },
          { q: 'How fast is the trial-balance check?', a: 'Minutes: upload your trial balance or connect Odoo read-only and the risk points in your trial balance appear. The full monthly pack starts from your next close.' },
          { q: 'Can it prepare investor or bank reporting?', a: 'Yes. Bank, investor and board formats are part of the Professional and Complete engagements.' }
        ],
        related: { label: 'Virtual CFO service', href: 'services/virtual-cfo/' }
      }
    ]
  },

  // ---- Quote request ----
  quote: {
    title: 'Request a quote | MFT Intelligence',
    description: 'Tell MFT your scope, from agents and ERP to entities and transaction volume, and receive a priced proposal from an accountant within two business days.',
    page: { eyebrow: 'Request a quote', title: 'Tell us the scope. We price it.', intro: 'No fixed price list, because no two ledgers are the same. Give us four facts about your scope and an MFT accountant returns a scoped proposal within two business days.' },
    form: {
      heading: 'Scope',
      agents: 'Which agents are you interested in?',
      agentOptions: [
        { value: 'auditor', label: 'Auditor agent (available now)' },
        { value: 'virtual-cfo', label: 'Virtual CFO agent (available now)' },
        { value: 'both', label: 'Auditor + Virtual CFO' },
        { value: 'complete', label: 'Complete: all agents as they launch' },
        { value: 'unsure', label: 'Not sure, advise me' }
      ],
      erp: 'Your ERP / accounting system',
      erpOptions: [{ value: 'odoo', label: 'Odoo' }, { value: 'sap', label: 'SAP' }, { value: 'dynamics', label: 'Microsoft Dynamics' }, { value: 'quickbooks', label: 'QuickBooks / Xero / Zoho' }, { value: 'excel', label: 'Spreadsheets' }, { value: 'other', label: 'Other' }],
      entities: 'Number of legal entities',
      entityOptions: [{ value: '1', label: '1' }, { value: '2-3', label: '2 to 3' }, { value: '4-10', label: '4 to 10' }, { value: '10+', label: 'More than 10' }],
      volume: 'Monthly transactions (approx.)',
      volumeOptions: [{ value: '<500', label: 'Under 500' }, { value: '500-2000', label: '500 to 2,000' }, { value: '2000-10000', label: '2,000 to 10,000' }, { value: '10000+', label: 'Over 10,000' }],
      cadence: 'Preferred cadence',
      cadenceOptions: [{ value: 'monthly', label: 'Monthly report' }, { value: 'weekly', label: 'Continuous weekly review' }, { value: 'unsure', label: 'Advise me' }],
      submit: 'Send scope and get a quote',
      success: 'Received. An MFT accountant will send your scoped proposal within two business days.',
      aside: { title: 'What happens next', steps: ['We confirm the scope by email or WhatsApp within one business day.', 'An MFT accountant prices the engagement to your entities, volume and cadence.', 'You receive a written proposal: scope, deliverables, cadence, price, start date.'] }
    }
  },

  // ---- Home: latest ----
  latest: {
    eyebrow: 'Latest from MFT',
    title: 'Twelve finance agents, built by accountants, governed in code.',
    body: 'MFT Intelligence is live as a managed service: the Auditor agent reviews every transaction against your ISA 320 materiality threshold; the Virtual CFO agent turns your Odoo data into a board pack. Ten more agents run daily in our own validation programme. Every action stays a draft until a named person approves it.',
    facts: [
      { value: '12', label: 'agent roles built' },
      { value: '2', label: 'selling today' },
      { value: '7', label: 'years of run log, by default' }
    ],
    cta: { label: 'Meet the agents', href: 'intelligence/' },
    quote: { label: 'Request a quote', href: 'request-quote/' }
  },

  // ---- About: milestones ----
  milestones: {
    title: 'Recent milestones',
    items: [
      { when: 'September 2026', title: 'MFT Intelligence v1.0', body: 'Twelve agent roles built. Auditor and Virtual CFO promoted to sellable; ten in internal validation.' },
      { when: 'September 2026', title: 'AI governance policy, enforced in code', body: 'Provider authorisation table, evidence gate, model policy and a seven-year run log, and changes require a written CEO decision in the same commit.' },
      { when: 'September 2026', title: 'Execute after approval', body: 'Approved drafts carried into Odoo by a restricted user; one or two named approvals by materiality; reversal-only corrections.' },
      { when: 'September 2026', title: 'SEG integration, phase 1', body: 'Auditor and CFO drafts enter the platform’s existing two-stage approval chain. In final review; enabled after the AI disclosure is published.' },
      { when: 'August 2026', title: 'Continuous-audit campaign', body: 'Published anonymised findings from live engagements: transactions missed by manual review surfaced in weeks; a valuation gap caught before year-end close.' }
    ]
  },

  homeFaq: [
    { q: 'What does Modern Financial Technology (MFT) do?', a: 'MFT is a CPA-led firm in Egypt and Saudi Arabia that implements Odoo ERP, runs internal audit programmes and acts as Virtual CFO for growing companies, with the SEG (Standard Enterprise Governance) platform, its continuous audit product SEG Audit and the MFT Intelligence agents doing the coverage and licensed accountants signing the results.' },
    { q: 'Is the trial-balance check really free?', a: 'Yes. A free check of your company’s trial balance that flags its risk points in minutes. Indicators computed from your trial balance only: suspense accounts, abnormal balances, imbalances, heavy manual entries and backdated entries. Not a full audit report. No credit card, no commitment.' },
    { q: 'Do you work with companies outside Cairo?', a: 'Yes. Engagements run on site and remotely across Egypt and Saudi Arabia, and Virtual CFO and Odoo work for US companies, in Arabic or English.' }
  ],
  industriesFaq: [
    { q: 'Which industries does MFT serve?', a: 'We serve activities classified under ISIC Rev.4 across four families: trading (45 and 46), retail and point of sale (47 and 56), manufacturing (10 to 33), and services and projects, including construction (41 to 43) and healthcare (86), in Egypt and Saudi Arabia. These are the families SEG Audit has Odoo control rules for today.' },
    { q: 'Do you configure Odoo differently per activity?', a: 'Yes. Manufacturing gets routings, work centres and actual costing; trading gets landed costs and credit controls; retail and restaurants get lot and expiry tracking with recipe costing and branch profitability; services and projects get project analytic accounting, retentions and service-line accounting. SEG Audit checks each family’s controls in a dedicated axis.' },
    { q: 'My activity is outside the four families. Can you still help?', a: 'SEG Audit’s general checks run on any activity. The activity-controls axis applies to the four families only, and we do not guess your activity from your data: the report states that your activity is outside the rules written today. Implementation and audit scope for any other activity is set on a call.' }
  ],
  aboutFaq: [
    { q: 'Where is MFT based?', a: 'The head office is on Dr. Sayed Abdel Wahed Street in Korba, Heliopolis, Cairo. Saudi engagements are delivered on site and remotely, and US clients are served remotely.' },
    { q: 'Who is on the team?', a: 'Licensed accountants and auditors with more than forty years of combined experience in manufacturing, trading and financial services, working alongside certified Odoo implementers, led by the founding auditor.' },
    { q: 'What is smart audit?', a: 'MFT’s approach of building controls into the system so errors are prevented and caught as they happen: documentation cycles, permissions and segregation of duties, and audit requirements turned into operating rules inside Odoo.' }
  ],
  contactFaq: [
    { q: 'How fast do you reply?', a: 'Within one business day, by email or WhatsApp. Most clients started with a single WhatsApp message.' },
    { q: 'What do I send for the free trial-balance check?', a: 'The trial balance of your last closed month, or connect Odoo read-only. No preparation is needed.' },
    { q: 'Is my data confidential?', a: 'Yes. Files shared for the trial-balance check are treated as confidential client data, restricted to the engagement team and deleted on request. Nothing is published about any client without written consent.' }
  ],

  locations: {
    labels: { obligations: 'What compliance looks like here', services: 'What MFT delivers in this market', how: 'How engagements run', faq: 'Questions from this market', cta: 'Book a call', quote: 'Request a quote', related: 'Related pages' },
    items: [
      {
        slug: 'egypt',
        country: 'EG',
        name: 'Egypt',
        city: 'Cairo',
        title: 'Odoo ERP, Internal Audit and Virtual CFO in Egypt | MFT Cairo',
        description: 'MFT is a CPA-led Odoo partner and audit firm headquartered in Cairo. Odoo ERP with ETA e-invoicing, internal audit programmes and Virtual CFO reporting for Egyptian companies.',
        eyebrow: 'Egypt',
        headline: 'Odoo, audit and Virtual CFO for Egyptian companies, from Cairo.',
        definition: 'MFT is a CPA-led financial technology and audit firm headquartered in Korba, Heliopolis, Cairo, serving companies across Egypt with Odoo ERP implementation, internal audit and Virtual CFO reporting, in Arabic and English.',
        intro: 'Egyptian finance teams carry the Egyptian Tax Authority e-invoicing mandate, 14% VAT, withholding tax and a market where most ERP implementations stop at go-live. MFT’s Cairo team implements the system, audits the controls around it and reads the results with you every month.',
        obligations: [
          'ETA e-invoicing: every issued invoice submitted and validated, with the receipt mandate for B2C',
          'VAT at 14% with monthly returns, and withholding tax on supplier payments',
          'Egyptian Accounting Standards and the annual external audit',
          'Data-protection obligations for personal data held in payroll and HR'
        ],
        services: [
          { title: 'Odoo ERP with ETA built in', body: 'Chart of accounts, e-invoicing submission, withholding and VAT configured by accountants, not just developers.', href: 'services/odoo-erp/' },
          { title: 'Innovative Tax Solutions', body: 'VAT return reconciled to the books, withholding tax review, ETA invoice follow-up, and the returns filed for you.', href: 'services/tax-solutions/' },
          { title: 'Internal audit, monthly or continuous', body: 'Risk-based programmes run inside your ERP, with findings ranked by impact and an owner for each.', href: 'services/internal-audit/' },
          { title: 'Virtual CFO', body: 'A monthly management pack and a review call with an MFT accountant, from your first closed month.', href: 'services/virtual-cfo/' },
          { title: 'MFT Intelligence agents', body: 'The Auditor and Virtual CFO agents, delivered as a managed service with human sign-off.', href: 'intelligence/' }
        ],
        how: ['Discovery call at our Cairo office or remotely', 'A free check of your company’s trial balance that flags its risk points in minutes', 'On-site fieldwork across Egypt when the engagement needs it', 'Reports in Arabic or English, written for owners and boards'],
        faq: [
          { q: 'Do you handle ETA e-invoicing inside Odoo?', a: 'Yes. Submission, validation and the B2C receipt mandate are configured in the standard implementation, not as a change request.' },
          { q: 'Can you work with my external auditor?', a: 'Yes. Findings are classified against ISA and delivered with an evidence trail your external auditor can use directly.' },
          { q: 'Where is the office?', a: 'Dr. Sayed Abdel Wahed Street, Korba, Heliopolis, Cairo. Calls and fieldwork are arranged on request.' }
        ]
      },
      {
        slug: 'saudi-arabia',
        country: 'SA',
        name: 'Saudi Arabia',
        city: 'Riyadh',
        title: 'ZATCA-ready Odoo ERP, Internal Audit and Virtual CFO in Saudi Arabia | MFT',
        description: 'MFT delivers ZATCA phase-two Odoo implementations, internal audit and Virtual CFO reporting for Saudi companies, with client data kept in the Kingdom under PDPL.',
        eyebrow: 'Saudi Arabia',
        headline: 'ZATCA-ready Odoo, audit and Virtual CFO for Saudi companies.',
        definition: 'MFT serves Saudi companies with ZATCA phase-two compliant Odoo ERP implementation, internal audit programmes and Virtual CFO reporting, delivered on site and remotely in Arabic and English, with client data remaining on the client’s own systems in line with the Saudi Personal Data Protection Law.',
        intro: 'Saudi finance teams face ZATCA phase-two integration, 15% VAT, zakat and withholding rules, and a data-protection law that decides where client data may live. MFT builds all of that into the implementation and the audit programme, and its own tax and zakat research covers the Egypt and Saudi treaty position for groups operating in both.',
        obligations: [
          'ZATCA e-invoicing phase two: integration, clearance and reporting of invoices',
          'VAT at 15%, zakat for Saudi and GCC-owned entities, and withholding on payments abroad',
          'SOCPA standards and the annual external audit',
          'Personal Data Protection Law: client data stays on the client’s own systems'
        ],
        services: [
          { title: 'Odoo ERP with ZATCA phase two', body: 'Integration, clearance and reporting configured as part of the standard build, with zakat and VAT set per entity.', href: 'services/odoo-erp/' },
          { title: 'Innovative Tax Solutions', body: 'ZATCA clearance and reporting follow-up, VAT and the zakat base reconciled to the books, and the returns filed for you.', href: 'services/tax-solutions/' },
          { title: 'Internal audit', body: 'Risk-based programmes with ISA-classified findings, run on site in the Kingdom or remotely.', href: 'services/internal-audit/' },
          { title: 'Virtual CFO', body: 'Monthly management packs and cash forecasts in Arabic or English, with a review call each month.', href: 'services/virtual-cfo/' },
          { title: 'Cross-border structuring', body: 'Egypt and Saudi groups: treaty position, transfer of profits and consolidated reporting.', href: 'services/financial-consulting/' }
        ],
        how: ['Discovery call in Arabic or English; on-site visits arranged for fieldwork', 'A free check of your company’s trial balance that flags its risk points in minutes', 'Client data read from your own Odoo at query time and never copied out of the Kingdom', 'Reports written for owners, boards and Saudi auditors'],
        faq: [
          { q: 'Is your Odoo implementation ZATCA phase-two compliant?', a: 'Yes. Integration, clearance and reporting are part of the standard implementation, and the configuration is tested against the ZATCA sandbox before go-live.' },
          { q: 'Where does my data live?', a: 'On your own Odoo or ERP in the Kingdom. MFT and the MFT Intelligence agents read it at query time and do not copy it, in line with the Personal Data Protection Law.' },
          { q: 'Do you have a Saudi office?', a: 'Engagements are delivered on site in Saudi Arabia and remotely from Cairo. Fieldwork visits are scheduled as part of the engagement.' }
        ]
      }
    ]
  },

  notFound: {
    title: 'Page not found',
    body: 'The page you are looking for does not exist or has moved.',
    link: 'Back to the home page'
  }
};
