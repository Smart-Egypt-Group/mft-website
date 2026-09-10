// English content — placeholder copy written in the approved hero voice.
// Every block tagged TODO(session-2) is a slot for the final copy from Session 2.
// Rules: never invent statistics. The only approved figures are the ones in the
// hero trust strip (CPA-led team, Odoo Certified Partner, 500+ reports delivered,
// Egypt · Saudi Arabia · US). Anything else stays qualitative.

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
    // TODO(session-2): final meta description (<=155 chars)
    description:
      'MFT combines Odoo ERP implementation, internal audit and Virtual CFO services in one CPA-led team serving Egypt, Saudi Arabia and the US.'
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
    placeholderTag: 'Placeholder — final copy pending (Session 2)'
  },

  nav: {
    items: [
      { label: 'Services', href: 'services/' },
      { label: 'Industries', href: 'industries/' },
      { label: 'About', href: 'about/' },
      { label: 'Contact', href: 'contact/' }
    ],
    cta: { label: 'Talk to Us', href: 'contact/' }
  },

  footer: {
    // TODO(session-2): footer blurb
    blurb:
      'A CPA-led financial technology and auditing firm. Odoo ERP, internal audit and Virtual CFO — one team, one set of numbers.',
    columns: [
      {
        title: 'Services',
        links: [
          { label: 'Odoo ERP Implementation', href: 'services/odoo-erp/' },
          { label: 'Internal Audit', href: 'services/internal-audit/' },
          { label: 'Virtual CFO', href: 'services/virtual-cfo/' },
          { label: 'Financial Consulting', href: 'services/financial-consulting/' },
          { label: 'Business Analysis', href: 'services/business-analysis/' },
          { label: 'User Training', href: 'services/training/' },
          { label: 'Technical Support', href: 'services/technical-support/' }
        ]
      },
      {
        title: 'Industries',
        links: [
          { label: 'Manufacturing', href: 'industries/#manufacturing' },
          { label: 'Trading & Distribution', href: 'industries/#trading' },
          { label: 'Food & Beverage', href: 'industries/#food-beverage' },
          { label: 'Healthcare', href: 'industries/#healthcare' },
          { label: 'Construction', href: 'industries/#construction' }
        ]
      },
      {
        title: 'Company',
        links: [
          { label: 'About MFT', href: 'about/' },
          { label: 'Contact', href: 'contact/' },
          { label: 'seg-audit platform', href: 'https://app.seg-audit.com', external: true }
        ]
      }
    ],
    contactTitle: 'Contact',
    officesTitle: 'Offices',
    offices: { eg: 'Egypt', sa: 'Saudi Arabia', us: 'United States' },
    legal: '© {year} Modern Financial Technology. All rights reserved.',
    // TODO(session-2): privacy policy page / link
    privacy: 'Privacy'
  },

  home: {
    title: 'Modern Financial Technology — Odoo ERP, Internal Audit & Virtual CFO',
    hero: {
      eyebrow: 'Financial Clarity, Delivered',
      // {accent} wraps the emphasised word. Approved copy from hero-final-A.
      headline: 'Decisions built on {accent}numbers{/accent}.\nNot on guesses.',
      subhead:
        'MFT turns your data into clear financial reports — profitability, cash flow, internal controls — backed by a licensed audit team, Odoo ERP experts, and the seg-audit platform.',
      cta: { label: 'Get Your First Report Free', href: 'contact/' },
      secondary: { label: 'See our services', href: 'services/' },
      trust: [
        'CPA-Led Team',
        'Odoo Certified Partners',
        'ISO-Aligned Internal Controls',
        '500+ Reports Delivered',
        'Egypt · Saudi Arabia · US'
      ]
    },
    // Variant B (split dashboard) — kept as the approved alternative.
    heroB: {
      eyebrow: 'Financial Clarity, Delivered',
      headline: 'Making decisions on numbers — or on guesses?',
      subhead:
        'MFT turns your data into clear financial reports — profitability, cash flow, internal controls — backed by a licensed audit team, Odoo ERP experts, and the seg-audit platform.',
      cta: { label: 'Book Your Free Financial Report', href: 'contact/' },
      trust: 'Trusted by finance teams across Egypt, Saudi Arabia, and the US',
      dashboard: {
        title: 'Monthly P&L Snapshot',
        badge: 'Sample',
        kpis: [
          { label: 'Revenue', value: '$482K' },
          { label: 'Net Margin', value: '18.4%', up: true },
          { label: 'Cash Position', value: '$211K' }
        ],
        bars: [40, 55, 48, 70, 62, 88],
        caption: 'Revenue by month — last 6 months (illustrative)'
      }
    },

    // TODO(session-2): positioning block — "the only integrated provider" message
    positioning: {
      eyebrow: 'One team. One set of numbers.',
      title: 'ERP, audit and CFO — usually three vendors. Here, one.',
      body:
        'Most firms stop at go-live, or advise without ever touching the system. MFT implements the Odoo ERP your numbers live in, audits the controls around it, and reads the results with you every month.',
      pillars: [
        {
          title: 'Odoo ERP',
          body: 'Implemented by certified partners who also understand the accounting behind every configuration.'
        },
        {
          title: 'Internal Audit',
          body: 'A CPA-led team that tests controls, closes gaps and reports in language the board can act on.'
        },
        {
          title: 'Virtual CFO',
          body: 'Monthly reporting, cash-flow forecasting and decisions — without the cost of a full-time CFO.'
        }
      ]
    },

    services: {
      eyebrow: 'Services',
      title: 'Everything between raw data and a confident decision.',
      intro:
        'Seven services, one accountable team. Start with a single report or hand us the whole finance function.',
      cta: 'Explore all services'
    },

    // TODO(session-2): confirm the engagement steps
    how: {
      eyebrow: 'How we work',
      title: 'From first call to first report in weeks, not quarters.',
      steps: [
        {
          title: 'Discovery',
          body: 'A structured session on your entity, systems, reporting gaps and compliance obligations (ZATCA, e-invoicing, tax).'
        },
        {
          title: 'Diagnosis',
          body: 'We map your current numbers against what a decision-ready close looks like, and quote the gap in plain terms.'
        },
        {
          title: 'Delivery',
          body: 'Implementation, audit fieldwork or reporting starts on an agreed calendar, with a named lead on our side.'
        },
        {
          title: 'Decision',
          body: 'You get reports built to be read — profitability, cash, controls — and a monthly review to act on them.'
        }
      ]
    },

    industries: {
      eyebrow: 'Industries',
      title: 'Built for the sectors where margins hide in operations.',
      intro:
        'Manufacturing, trading, food & beverage, healthcare and construction share one trait: the numbers only make sense when the ERP mirrors the operation.',
      cta: 'See industry detail'
    },

    proof: {
      eyebrow: 'Why MFT',
      title: 'Credentials you can verify. Numbers you can audit.',
      facts: [
        { value: '500+', label: 'Reports delivered' },
        { value: 'CPA', label: 'Licensed, CPA-led audit team' },
        { value: 'Odoo', label: 'Certified implementation partner' },
        { value: '3', label: 'Markets: Egypt, Saudi Arabia, US' }
      ]
    },

    // TODO(ops, execution plan week 10): replace with the first real case study.
    caseStudy: {
      eyebrow: 'Client story',
      title: 'A real client, real numbers — coming here.',
      body:
        'This slot is reserved for the first published case study with verified figures. Until then, MFT does not publish anonymised or illustrative results.',
      cta: { label: 'Ask us for references', href: 'contact/' }
    },

    // TODO(Ahmed): pricing decision — fixed packages (Starter / Growth / Enterprise)
    // or indicative ranges. Structure below is a placeholder only; no prices shown.
    pricing: {
      eyebrow: 'Engagement models',
      title: 'Transparent scope. No “custom quote” black box.',
      body:
        'Pricing packages are being finalised. Each will publish its scope, deliverables and monthly commitment up front.',
      tiers: [
        { name: 'Starter', body: 'One report, one system, one month. For teams that need a first clear picture.' },
        { name: 'Growth', body: 'Monthly reporting plus ERP support for companies scaling across entities or countries.' },
        { name: 'Enterprise', body: 'Full finance function: ERP, audit programme and Virtual CFO under one agreement.' }
      ],
      note: 'Scope and pricing to be confirmed.'
    },

    cta: {
      title: 'Start with one report. Free.',
      body:
        'Send us your last closed month and we will return a profitability and cash-flow snapshot with the three questions your board should be asking.',
      button: { label: 'Get Your First Report Free', href: 'contact/' },
      alt: 'Or call us directly'
    }
  },

  // Shared CTA band used on inner pages
  ctaBand: {
    title: 'Talk to a CPA, not a sales rep.',
    body: 'A 30-minute call to understand your entity, your systems and what a decision-ready close would look like.',
    button: { label: 'Book a call', href: 'contact/' }
  },

  services: {
    title: 'Services — Modern Financial Technology',
    description:
      'Odoo ERP implementation, internal audit, Virtual CFO, financial consulting, business analysis, training and technical support from one CPA-led team.',
    page: {
      eyebrow: 'Services',
      title: 'Seven services. One accountable team.',
      intro:
        'Every engagement is led by a licensed accountant who also knows the system your numbers live in. Pick one service, or hand us the whole finance function.'
    },
    detailLabels: {
      overview: 'Overview',
      deliverables: 'What you get',
      forWho: 'Who it is for',
      related: 'Related services',
      cta: 'Discuss this service'
    },
    // TODO(session-2): final copy for each service. Slugs are stable — do not rename.
    items: [
      {
        slug: 'odoo-erp',
        name: 'Odoo ERP Implementation',
        short: 'Configured by accountants, not just developers — so the ledger is right on day one.',
        tagline: 'An ERP that mirrors the business and closes the books.',
        body: [
          'Odoo implementation fails when the chart of accounts, cost centres and tax setup are an afterthought. MFT starts there. Our certified partners configure finance, inventory, manufacturing, sales and HR around how your operation actually runs.',
          'Egyptian e-invoicing, Saudi ZATCA phase two, withholding tax and multi-entity consolidation are part of the standard build — not a change request.'
        ],
        deliverables: [
          'Process mapping and gap analysis',
          'Chart of accounts, analytic and cost-centre design',
          'Module configuration: Accounting, Inventory, Manufacturing, Sales, Purchase, HR',
          'Tax and e-invoicing compliance (Egypt ETA, Saudi ZATCA)',
          'Data migration with reconciled opening balances',
          'Go-live support and 90-day stabilisation'
        ],
        forWho: 'Companies moving off spreadsheets or a legacy system, and Odoo users whose implementation never produced reliable financials.'
      },
      {
        slug: 'internal-audit',
        name: 'Internal Audit',
        short: 'Control testing and risk reviews by a CPA-led team, reported for the board.',
        tagline: 'Find the gap before the auditor, the bank or the tax authority does.',
        body: [
          'An internal audit programme designed around your actual risks: revenue leakage, duplicate payments, inventory shrinkage, access rights, tax exposure. Fieldwork is done inside your ERP and supported by the seg-audit platform.',
          'Findings are ranked by financial impact and each one comes with an owner, a fix and a deadline.'
        ],
        deliverables: [
          'Risk-based annual audit plan',
          'Control design and effectiveness testing',
          'Procure-to-pay, order-to-cash and inventory reviews',
          'Access-rights and segregation-of-duties review',
          'Board-ready audit reports with ranked findings',
          'Follow-up tracking until closure'
        ],
        forWho: 'Owner-managed companies, groups with multiple entities, and businesses preparing for external audit, financing or acquisition.'
      },
      {
        slug: 'virtual-cfo',
        name: 'Virtual CFO',
        short: 'Monthly reporting, cash forecasting and decisions — a CFO on your calendar, not your payroll.',
        tagline: 'The reports a CFO would build. The questions a CFO would ask.',
        body: [
          'Every month you receive a management pack: profitability by product and customer, cash-flow forecast, working-capital position and the variances that matter. Then we sit with you and decide what to do about them.',
          'The service scales from a single monthly review to a full finance-function lead with your team reporting to us.'
        ],
        deliverables: [
          'Monthly management reporting pack',
          '13-week cash-flow forecast',
          'Budgeting and variance analysis',
          'Pricing, margin and break-even analysis',
          'Bank, investor and board reporting',
          'Monthly decision review with management'
        ],
        forWho: 'Growing companies that need CFO-level judgement without a full-time hire, and founders who want to understand their own numbers.'
      },
      {
        slug: 'financial-consulting',
        name: 'Financial Consulting',
        short: 'Restructuring, feasibility, valuation and tax planning grounded in your actual ledger.',
        tagline: 'Advice that starts from your numbers, not a template.',
        body: [
          'Project-based work where a decision needs a financial answer: opening in Saudi Arabia, pricing a new line, restructuring debt, valuing a stake or preparing for investment.',
          'Every engagement ends with a document you can hand to a bank, a partner or a buyer.'
        ],
        deliverables: [
          'Feasibility studies and financial models',
          'Cross-border structuring (Egypt, Saudi Arabia, US)',
          'Tax planning and compliance reviews',
          'Valuation and due-diligence support',
          'Cost reduction and margin programmes'
        ],
        forWho: 'Management teams facing a one-off decision with a large financial consequence.'
      },
      {
        slug: 'business-analysis',
        name: 'Business Analysis',
        short: 'Process mapping and requirements that make systems fit the business — not the reverse.',
        tagline: 'Before configuring anything, understand the operation.',
        body: [
          'We document how orders, stock, production and cash actually move, find where information is lost or re-typed, and specify what the system should do about it.',
          'The output is a requirements document detailed enough to implement and clear enough for the owner to approve.'
        ],
        deliverables: [
          'As-is and to-be process maps',
          'Functional requirements and acceptance criteria',
          'KPI and dashboard definitions',
          'System selection and vendor evaluation',
          'Change-impact assessment'
        ],
        forWho: 'Companies about to implement or replace a system, and those whose current system does not reflect how they work.'
      },
      {
        slug: 'training',
        name: 'User Training',
        short: 'Role-based Odoo and finance training so the team runs the system without us.',
        tagline: 'A system is only as good as the people posting into it.',
        body: [
          'Training is built per role — accountant, storekeeper, sales admin, production planner, manager — on your own data and your own workflows, in Arabic or English.',
          'Sessions are recorded and documented so new hires onboard without a new engagement.'
        ],
        deliverables: [
          'Role-based curriculum on your live configuration',
          'Hands-on workshops, on site or remote',
          'Bilingual user guides and quick-reference cards',
          'Competency check-outs before go-live',
          'Refresher sessions after upgrades'
        ],
        forWho: 'Teams going live on Odoo, and existing users whose adoption never got past the basics.'
      },
      {
        slug: 'technical-support',
        name: 'Technical Support',
        short: 'Odoo administration, upgrades, integrations and fixes under a response-time agreement.',
        tagline: 'Keep the system current, integrated and closing on time.',
        body: [
          'A support agreement that covers the day-to-day: user issues, report changes, access rights, upgrades, integrations with banks, e-invoicing portals and third-party tools.',
          'Every request is logged, prioritised and answered within the agreed window — by people who know your configuration.'
        ],
        deliverables: [
          'Help desk with agreed response times',
          'Version upgrades and regression testing',
          'Custom reports and dashboards',
          'Integrations and API work',
          'Monthly health check and backup verification'
        ],
        forWho: 'Any company running Odoo in production that needs a partner rather than a ticket queue.'
      }
    ]
  },

  industries: {
    title: 'Industries — Modern Financial Technology',
    description:
      'Odoo ERP, audit and Virtual CFO services for manufacturing, trading, food & beverage, healthcare and construction companies in Egypt, Saudi Arabia and the US.',
    page: {
      eyebrow: 'Industries',
      title: 'Where the numbers depend on the operation.',
      intro:
        'Five sectors where MFT has implemented, audited and reported. In each, the finance answer lives in the operational detail — costing, stock, contracts, compliance.'
    },
    labels: {
      challenges: 'What usually goes wrong',
      how: 'How MFT helps',
      cta: 'Talk about your sector'
    },
    // TODO(session-2): final copy per industry. Slugs are stable — do not rename.
    items: [
      {
        slug: 'manufacturing',
        name: 'Manufacturing',
        short: 'True product cost, from bill of materials to landed overhead.',
        challenges: [
          'Standard costs that nobody has updated since the BoM changed',
          'Work-in-progress that never reconciles to the ledger',
          'Scrap, rework and yield losses invisible in the margin report'
        ],
        how: [
          'Odoo Manufacturing with routings, work centres and actual costing',
          'Inventory valuation and WIP controls tested by internal audit',
          'Monthly product-margin reporting by line and customer'
        ]
      },
      {
        slug: 'trading',
        name: 'Trading & Distribution',
        short: 'Margin by SKU, customer and channel — after discounts, returns and freight.',
        challenges: [
          'Gross margin reported before rebates, returns and logistics',
          'Stock in transit and consignment stock outside the system',
          'Credit exposure growing faster than sales'
        ],
        how: [
          'Odoo Sales, Purchase and Inventory with landed-cost allocation',
          'Receivables ageing, credit limits and collection controls',
          'Channel and customer profitability in the monthly pack'
        ]
      },
      {
        slug: 'food-beverage',
        name: 'Food & Beverage',
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
        ]
      },
      {
        slug: 'healthcare',
        name: 'Healthcare',
        short: 'Revenue cycle, insurer receivables and consumables under control.',
        challenges: [
          'Claims and insurer receivables reconciled months late',
          'Consumables and pharmacy stock leaking through weak controls',
          'Doctor, department and service-line profitability unknown'
        ],
        how: [
          'Odoo configured for service-line accounting and insurer billing',
          'Pharmacy and consumables controls with regular stock audits',
          'Department and payer profitability reporting'
        ]
      },
      {
        slug: 'construction',
        name: 'Construction',
        short: 'Project accounting, retentions and subcontractor exposure by site.',
        challenges: [
          'Cost-to-complete and margin per project known only at the end',
          'Retentions, advances and subcontractor certificates tracked in spreadsheets',
          'Cash forecasts that ignore billing milestones'
        ],
        how: [
          'Project-based analytic accounting and budgets in Odoo',
          'Subcontractor, retention and progress-billing controls',
          'Project cash-flow forecasting and monthly cost-to-complete review'
        ]
      }
    ]
  },

  about: {
    title: 'About — Modern Financial Technology',
    description:
      'MFT is a CEO-led financial technology and auditing firm combining Odoo ERP, internal audit and Virtual CFO expertise across Egypt, Saudi Arabia and the US.',
    page: {
      eyebrow: 'About MFT',
      title: 'Accountants who build systems. Technologists who read ledgers.',
      intro:
        'Modern Financial Technology was founded on one observation: ERP partners stop at go-live, and advisors rarely touch the system. We do both.'
    },
    // TODO(session-2): company story, founding year, CEO profile
    story: {
      title: 'The story',
      paras: [
        'MFT is a CEO-led firm operating from Egypt and Saudi Arabia, now expanding to the United States. The team combines licensed accountants and auditors with certified Odoo implementers — the same people who configure the system also read what comes out of it.',
        'That combination is the reason clients keep us after go-live: the ERP, the audit programme and the monthly reporting are built to the same chart of accounts by the same team.'
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
        'Odoo Certified Partner',
        'ISO-aligned internal-control framework',
        '500+ reports delivered across Egypt, Saudi Arabia and the US',
        'Egyptian e-invoicing (ETA) and Saudi ZATCA phase-two experience',
        'seg-audit: MFT’s own audit-management platform'
      ]
    },
    // TODO(session-2): leadership profiles, photos, LinkedIn links
    team: {
      title: 'Leadership',
      intro: 'Profiles and photographs to be supplied.',
      members: [
        { name: 'Chief Executive Officer', role: 'Founder & CEO — licensed auditor' },
        { name: 'Head of Audit', role: 'Internal audit & controls' },
        { name: 'Head of ERP', role: 'Odoo implementation & support' }
      ]
    },
    offices: {
      title: 'Where we are',
      items: [
        { key: 'eg', name: 'Egypt', body: 'Head office and delivery team.' },
        { key: 'sa', name: 'Saudi Arabia', body: 'ZATCA-compliant implementations and audit engagements.' },
        { key: 'us', name: 'United States', body: 'Virtual CFO and Odoo services for US companies — expanding.' }
      ]
    }
  },

  contact: {
    title: 'Contact — Modern Financial Technology',
    description: 'Book a call with MFT: Odoo ERP, internal audit and Virtual CFO for companies in Egypt, Saudi Arabia and the US.',
    page: {
      eyebrow: 'Contact',
      title: 'Tell us about your numbers.',
      intro:
        'Fill in the form and a licensed accountant — not a sales rep — will reply within one business day. Or call us directly.'
    },
    form: {
      heading: 'Request your first report',
      name: 'Full name',
      company: 'Company',
      email: 'Work email',
      phone: 'Phone',
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
      consent: 'I agree to be contacted by MFT about this request.',
      submit: 'Send request',
      sending: 'Sending…',
      success: 'Thank you. Your request has been received — we will reply within one business day.',
      error: 'The request could not be sent. Please email or call us directly using the details on this page.',
      offline: 'Online submission is not configured yet. Please email or call us using the details on this page.',
      required: 'Required',
      invalidEmail: 'Enter a valid email address.',
      honeypotLabel: 'Leave this field empty'
    },
    details: {
      title: 'Direct contact',
      email: 'Email',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
      hours: 'Sunday – Thursday, 9:00 – 18:00 (Cairo / Riyadh)',
      hoursLabel: 'Hours',
      officesLabel: 'Offices'
    }
  },

  notFound: {
    title: 'Page not found',
    body: 'The page you are looking for does not exist or has moved.',
    link: 'Back to the home page'
  }
};
