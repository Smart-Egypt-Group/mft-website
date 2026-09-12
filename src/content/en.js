// English content — FINAL (Session 2). Single source for all English copy.
// Sources: approved hero (Session 1), official company story and testimonials
// published on fin-tech.odoo.com, August/September 2026 campaign copy approved
// by Ahmed, and the competitor-research execution plan (positioning).
// Rule: no figure appears here that was not already published by MFT.
// Remaining decisions (domain, pricing packages, vector logo) live in
// PENDING-DECISIONS.md — nothing else in this file is a placeholder.

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
      'MFT is a CPA-led firm that implements Odoo ERP, runs internal audit and acts as your Virtual CFO — one team, one set of numbers, in Egypt, Saudi Arabia and the US.'
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
    placeholderTag: 'Pending decision — hidden in production'
  },

  nav: {
    items: [
      { label: 'Services', href: 'services/' },
      { label: 'Industries', href: 'industries/' },
      { label: 'MFT Intelligence', href: 'intelligence/' },
      { label: 'About', href: 'about/' },
      { label: 'Contact', href: 'contact/' }
    ],
    cta: { label: 'Talk to Us', href: 'contact/' }
  },

  footer: {
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
          { label: 'MFT Intelligence AI Agents', href: 'intelligence/' },
          { label: 'Request a quote', href: 'request-quote/' },
          { label: 'Contact', href: 'contact/' },
          { label: 'Privacy', href: 'privacy/' },
          { label: 'seg-audit platform', href: 'https://app.seg-audit.com', external: true }
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
    title: 'Modern Financial Technology — Odoo ERP, Internal Audit & Virtual CFO',
    hero: {
      eyebrow: 'Financial Clarity, Delivered',
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
        caption: 'Revenue by month — last 6 months (illustrative)',
        findingsTitle: 'Agent findings (sample)',
        findings: [
          { text: 'Payment above materiality threshold — draft awaiting approval', tag: 'Auditor' },
          { text: 'Near-duplicate vendor detected — two codes, one tax id', tag: 'Auditor' },
          { text: 'Cash runway recalculated after supplier terms changed', tag: 'Virtual CFO' }
        ]
      }
    },

    positioning: {
      eyebrow: 'One team. One set of numbers.',
      title: 'ERP, audit and CFO — usually three vendors. Here, one.',
      body:
        'Odoo partners stop at go-live. Advisors write reports without ever opening the system. Audit software flags exceptions and leaves you to explain them. MFT is the only firm in the region that implements the ERP your numbers live in, audits the controls around it, and reads the results with you every month — with Egyptian e-invoicing and Saudi ZATCA compliance built in.',
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
          body: 'Monthly profitability, cash-flow forecasting and the decisions that follow — CFO judgement without a full-time hire.'
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
      title: 'From first message to first report in 24 hours. Not quarters.',
      steps: [
        {
          when: 'Day 0',
          title: 'Send your data',
          body: 'Share your last closed month — a trial balance, an Odoo export or a spreadsheet. No preparation, no commitment.'
        },
        {
          when: 'Within 24 hours',
          title: 'First report in 24 hours',
          body: 'You receive a cash-flow and profitability snapshot with the three questions your board should be asking. Free, one per company.'
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

    stories: {
      eyebrow: 'From our engagements',
      title: 'What the numbers found.',
      intro:
        'Two findings from recent audit engagements. Clients are anonymised and no financial amounts are published — only what was found, and when.',
      cases: [
        {
          sector: 'Food & beverage distribution · Cairo',
          figure: '23 transactions',
          label: 'missed by manual review, surfaced in six weeks',
          body:
            'Running seg-audit alongside the external audit of the second quarter, the engine flagged a duplicate payment to one supplier registered under two vendor codes — caught before the close, not after it.',
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
            'Honestly, it has been a great experience. If we continue like this, progress will reach a whole new level. The team is highly professional, respectful, cooperative and always responsive — we can clearly see the continuous improvement.',
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
      title: 'Start with one report. Free.',
      body:
        'Send us your last closed month and within 24 hours you get a cash-flow and profitability snapshot with the three questions your board should be asking. One free report per company, defined scope, no commitment.',
      button: { label: 'Get Your First Report Free', href: 'contact/' },
      alt: 'Or call us directly'
    }
  },

  // Home teaser for the agents page
  intelligenceTeaser: {
    eyebrow: 'MFT Intelligence',
    title: 'AI agents that watch your books every day — reviewed by our accountants.',
    body: 'An Auditor agent that applies ISA 320 materiality to every transaction, and a Virtual CFO agent that turns your Odoo data into board-ready reports. Available now; four more agents in validation.',
    cta: { label: 'Meet the agents', href: 'intelligence/' }
  },

  ctaBand: {
    title: 'Talk to a CPA, not a sales rep.',
    body: 'A 30-minute call to understand your entity, your systems and what a decision-ready close would look like. Free, and you leave with one concrete next step.',
    button: { label: 'Book a call', href: 'contact/' }
  },

  services: {
    title: 'Services — Modern Financial Technology',
    description:
      'Odoo ERP implementation, internal audit, Virtual CFO, financial consulting, business analysis, training and technical support from one CPA-led team in Egypt, Saudi Arabia and the US.',
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
    items: [
      {
        slug: 'odoo-erp',
        name: 'Odoo ERP Implementation',
        short: 'Configured by accountants, not just developers — so the ledger is right on day one.',
        tagline: 'An ERP that mirrors the business and closes the books.',
        body: [
          'Odoo implementations fail when the chart of accounts, cost centres and tax setup are an afterthought. MFT starts there. Our certified partners configure finance, inventory, manufacturing, sales, purchasing and HR around how your operation actually runs — for industrial, trading and service companies in Egypt and the Gulf.',
          'Egyptian e-invoicing (ETA), Saudi ZATCA phase two, withholding tax and multi-entity consolidation are part of the standard build, not change requests. And because we practise smart audit, permissions, segregation of duties and documentation cycles are designed into the system from the first configuration, so the ERP prevents errors instead of just recording them.'
        ],
        deliverables: [
          'Process mapping and gap analysis',
          'Chart of accounts, analytic and cost-centre design',
          'Module configuration: Accounting, Inventory, Manufacturing, Sales, Purchase, HR',
          'Tax and e-invoicing compliance (Egypt ETA, Saudi ZATCA)',
          'Access rights and segregation of duties built in',
          'Data migration with reconciled opening balances',
          'Go-live support and 90-day stabilisation'
        ],
        forWho: 'Companies moving off spreadsheets or a legacy system, and Odoo users whose implementation never produced reliable financials.',
        definition: 'Odoo ERP implementation by MFT is a finance-led deployment: certified Odoo partners who are also licensed accountants configure the system around your chart of accounts, tax obligations and controls, so the ledger is right from day one.',
        faq: [
          { q: 'How long does an implementation take?', a: 'Typically eight to sixteen weeks from discovery to go-live for a single entity, depending on modules and data migration. We commit to a calendar at the end of discovery.' },
          { q: 'Do you handle Egyptian e-invoicing and Saudi ZATCA?', a: 'Yes. ETA e-invoicing, ZATCA phase two, withholding tax and multi-entity consolidation are part of the standard build.' },
          { q: 'What happens after go-live?', a: 'Ninety days of stabilisation are included, then optional technical support with agreed response times.' },
        ]
      },
      {
        slug: 'internal-audit',
        name: 'Internal Audit',
        short: 'Control testing and risk reviews by a CPA-led team, reported for the board.',
        tagline: 'Find the gap before the auditor, the bank or the tax authority does.',
        body: [
          'An internal audit programme designed around your actual risks: revenue leakage, duplicate payments, near-duplicate vendors, inventory shrinkage, access rights and tax exposure. Fieldwork is done inside your ERP and supported by seg-audit, MFT’s own platform, which scores every transaction by risk instead of sampling five percent and hoping the errors are in it.',
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
          { q: 'Do you use software or people?', a: 'Both. seg-audit and the MFT Auditor agent do the coverage; licensed auditors decide what matters and sign the report.' },
          { q: 'Can findings be shared with our external auditor or bank?', a: 'Yes. Reports are written for boards and third parties, with ISA-classified findings and an evidence trail.' },
        ]
      },
      {
        slug: 'virtual-cfo',
        name: 'Virtual CFO',
        short: 'Monthly reporting, cash forecasting and decisions — a CFO on your calendar, not your payroll.',
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
          { q: 'Is the first report really free?', a: 'Yes. Send your last closed month and you receive a cash-flow and profitability snapshot within 24 hours, no commitment.' },
        ]
      },
      {
        slug: 'financial-consulting',
        name: 'Financial Consulting',
        short: 'Restructuring, feasibility, valuation and tax planning grounded in your actual ledger.',
        tagline: 'Advice that starts from your numbers, not a template.',
        body: [
          'Project-based work for the moments when a decision needs a financial answer: opening in Saudi Arabia, pricing a new line, restructuring debt, valuing a stake or preparing for investment. Cross-border work draws on our own ZATCA, SOCPA and Egyptian tax research and the Egypt–Saudi treaty position.',
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
        definition: 'Financial consulting by MFT is project-based advisory for one-off decisions — feasibility, restructuring, valuation, cross-border structuring and tax — grounded in your actual ledger.',
        faq: [
          { q: 'What does a typical engagement produce?', a: 'A document you can hand to a bank, partner or buyer: model, assumptions, scenarios and a recommendation.' },
          { q: 'Do you cover Saudi as well as Egypt?', a: 'Yes. Cross-border work draws on our own ZATCA, SOCPA and Egyptian tax research and the Egypt–Saudi treaty position.' },
          { q: 'How is it priced?', a: 'Fixed fee per engagement, agreed after a scoping call.' },
        ]
      },
      {
        slug: 'business-analysis',
        name: 'Business Analysis',
        short: 'Process mapping and requirements that make systems fit the business — not the reverse.',
        tagline: 'Before configuring anything, understand the operation.',
        body: [
          'We document how orders, stock, production and cash actually move, find where information is lost or re-typed, and specify what the system should do about it — including which audit requirements become operating rules inside the system.',
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
        definition: 'Business analysis by MFT documents how orders, stock, production and cash actually move through your company and specifies what a system must do about it — before anything is configured.',
        faq: [
          { q: 'When do we need this?', a: 'Before implementing or replacing a system, or when the current system does not reflect how you work.' },
          { q: 'What do we receive?', a: 'As-is and to-be process maps, functional requirements with acceptance criteria, KPI definitions and a change-impact assessment.' },
          { q: 'Is it tied to Odoo?', a: 'No. The output is system-neutral and can be used to evaluate vendors.' },
        ]
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
        forWho: 'Teams going live on Odoo, and existing users whose adoption never got past the basics.',
        definition: 'User training by MFT is role-based Odoo and finance training delivered on your own configuration and data, in Arabic or English, with recorded sessions and bilingual guides.',
        faq: [
          { q: 'Who is it for?', a: 'Accountants, storekeepers, sales admins, production planners and managers — each with their own curriculum.' },
          { q: 'On site or remote?', a: 'Either. Sessions are recorded so new hires onboard without a new engagement.' },
          { q: 'Is competency verified?', a: 'Yes. Check-outs before go-live confirm each role can complete its daily tasks.' },
        ]
      },
      {
        slug: 'technical-support',
        name: 'Technical Support',
        short: 'Odoo administration, upgrades, integrations and fixes under a response-time agreement.',
        tagline: 'Keep the system current, integrated and closing on time.',
        body: [
          'A support agreement that covers the day-to-day: user issues, report changes, access rights, upgrades, and integrations with banks, e-invoicing portals, WhatsApp and third-party tools.',
          'Every request is logged, prioritised and answered within the agreed window — by people who know your configuration and your chart of accounts.'
        ],
        deliverables: [
          'Help desk with agreed response times',
          'Version upgrades and regression testing',
          'Custom reports and dashboards',
          'Integrations and API work',
          'Monthly health check and backup verification'
        ],
        forWho: 'Any company running Odoo in production that needs a partner rather than a ticket queue.',
        definition: 'Technical support by MFT is an Odoo administration and maintenance agreement with agreed response times: user issues, report changes, access rights, upgrades and integrations, handled by people who know your chart of accounts.',
        faq: [
          { q: 'What response times do you offer?', a: 'Agreed per contract; critical issues are acknowledged the same business day.' },
          { q: 'Do you handle upgrades?', a: 'Yes. Version upgrades with regression testing and a monthly health check are included.' },
          { q: 'Which integrations?', a: 'Banks, e-invoicing portals (ETA, ZATCA), WhatsApp and third-party tools via API.' },
        ],
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
        'Five sectors where MFT implements, audits and reports. In each, the finance answer lives in the operational detail — costing, stock, contracts, compliance.'
    },
    labels: {
      challenges: 'What usually goes wrong',
      how: 'How MFT helps',
      cta: 'Talk about your sector'
    },
    items: [
      {
        slug: 'manufacturing',
        name: 'Manufacturing',
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
        ]
      },
      {
        slug: 'trading',
        name: 'Trading & Distribution',
        short: 'Margin by SKU, customer and channel — after discounts, returns and freight.',
        challenges: [
          'Gross margin reported before rebates, returns and logistics',
          'Stock in transit and consignment stock outside the system',
          'Duplicate and near-duplicate vendors paid twice for months'
        ],
        how: [
          'Odoo Sales, Purchase and Inventory with landed-cost allocation',
          'Vendor-master, receivables ageing and credit-limit controls',
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
          'Inventory costing methods left unchanged after supplier contracts change'
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
      'MFT started in financial audit, developed the smart-audit approach, and now implements Odoo ERP and acts as Virtual CFO for companies in Egypt, Saudi Arabia and the US.',
    page: {
      eyebrow: 'About MFT',
      title: 'Accountants who build systems. Technologists who read ledgers.',
      intro:
        'Modern Financial Technology grew out of a deep professional background in accounting, audit and internal control — and one observation from the field: audit findings kept describing errors that the systems should have prevented.'
    },
    story: {
      title: 'The story',
      paras: [
        'MFT began as a financial audit and review practice, focused on analysing financial data, evaluating internal control systems and identifying operational and compliance risk for companies in Egypt and Saudi Arabia.',
        'Working inside those companies exposed a clear gap between what the audit found and what traditional systems could prevent. Out of that gap came smart audit: moving from reviewing what already happened to building a system that prevents errors and detects them in real time — strong documentation cycles, defined permissions and segregation of duties, and audit requirements translated into operating rules inside the system.',
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
        '40+ years of combined experience in manufacturing, trading and financial services',
        'Odoo Certified Partner',
        'ISO-aligned internal-control framework',
        '500+ reports delivered across Egypt, Saudi Arabia and the US',
        'Egyptian e-invoicing (ETA) and Saudi ZATCA phase-two experience',
        'seg-audit: MFT’s own audit, control and cash-flow reporting platform'
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
    offices: {
      title: 'Where we are',
      items: [
        { key: 'eg', name: 'Egypt', body: 'Head office: Dr. Sayed Abdel Wahed Street, Korba, Heliopolis, Cairo. Delivery team for all services.' },
        { key: 'sa', name: 'Saudi Arabia', body: 'ZATCA-compliant Odoo implementations and audit engagements for Saudi companies, delivered on site and remotely.' },
        { key: 'us', name: 'United States', body: 'Virtual CFO and Odoo services for US companies — expanding.' }
      ]
    }
  },

  contact: {
    title: 'Contact — Modern Financial Technology',
    description: 'Send one question or your last closed month. A licensed accountant replies within one business day with a first diagnosis and one concrete next step.',
    page: {
      eyebrow: 'Contact',
      title: 'One question can save you months.',
      intro:
        'You do not need to prepare anything. Send your question or your last closed month, and a licensed accountant — not a sales rep — replies within one business day with a first diagnosis and one concrete next step. Full confidentiality.'
    },
    form: {
      heading: 'Request your first report',
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
      consent: 'I agree to be contacted by MFT about this request and have read the privacy notice.',
      submit: 'Send request',
      sending: 'Sending…',
      success: 'Thank you. Your request has been received — we will reply within one business day.',
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

  privacy: {
    title: 'Privacy notice — Modern Financial Technology',
    description: 'What MFT collects through this website, why, and how to contact us about your data.',
    page: {
      eyebrow: 'Privacy',
      title: 'What we collect, and why.',
      intro: 'This website is a marketing site. It collects only what you type into the contact form.'
    },
    sections: [
      {
        title: 'What we collect',
        body: 'When you submit the contact form we receive the name, company, email, phone number, country, service of interest and message you enter, plus the page you sent it from and the language you used. The site sets no tracking cookies and uses no third-party analytics.'
      },
      {
        title: 'Why we collect it',
        body: 'To reply to your request, prepare your first report and, if you become a client, to run the engagement. Your details are recorded in MFT’s customer system and are not sold, rented or shared with third parties for their own purposes.'
      },
      {
        title: 'Financial data you send us',
        body: 'Any ledger, trial balance or report you share for a first report is treated as confidential client data: read-only access, restricted to the engagement team, and deleted on request once the engagement ends.'
      },
      {
        title: 'Your rights',
        body: 'You can ask what we hold about you, ask for it to be corrected, or ask for it to be deleted at any time by emailing {email}. We answer within one business day.'
      },
      {
        title: 'Other MFT platforms',
        body: 'The seg-audit platform (app.seg-audit.com) has its own terms and privacy policy, which apply when you create an account there.'
      }
    ],
    updated: 'Last updated: September 2026'
  },

  intelligence: {
    title: 'MFT Intelligence AI Agents — Modern Financial Technology',
    description:
      'Twelve finance AI agents built by MFT’s accountants. Auditor and Virtual CFO available now as a managed service; ten more in internal validation. Every action stays a draft until a named person approves it.',
    page: {
      eyebrow: 'MFT Intelligence',
      title: 'AI agents that work your numbers. Accountants who sign off.',
      intro:
        'MFT Intelligence is a set of twelve specialised finance agents built by our audit and Odoo teams. Each does one job continuously on your own data. Every finding cites the records it came from, every proposed action stays a draft until a named person approves it, and a licensed MFT accountant reviews what reaches you.'
    },
    definition: 'MFT Intelligence is a managed AI-agent service from Modern Financial Technology: MFT runs specialised audit, CFO and finance-operations agents on a client’s ERP data and delivers reviewed findings, draft entries and reports under a governance policy enforced in code.',
    statusLabels: { available: 'Available now', validation: 'Internal validation — launching soon' },
    benefitLabel: 'What it does for you',
    agentsTitle: 'Twelve agents. Two selling today.',
    agentsIntro: 'The Auditor and Virtual CFO agents are delivered now as a managed service. The other ten run daily inside MFT’s own validation programme and are promoted only after a written decision — never automatically.',
    learnMore: 'Full details and pricing path',
    agents: [
      { slug: 'auditor', name: 'Auditor agent', status: 'available', page: 'intelligence/auditor/',
        does: ['Continuous review of your books against ISA 320 materiality thresholds calibrated to your business', 'Flags every transaction or balance above the threshold, ranked by financial impact', 'Duplicate payments, near-duplicate vendors, unusual approvals and cut-off issues'],
        benefit: 'Problems surface when they happen, not at the annual audit — and the risk of a material misstatement drops.' },
      { slug: 'virtual-cfo', name: 'Virtual CFO agent', status: 'available', page: 'intelligence/virtual-cfo/',
        does: ['Profitability, cash flow and budget-variance analysis every month', 'Board-ready reports in Arabic or English', 'Reviewed and presented by an MFT accountant'],
        benefit: 'CFO-level visibility without the cost of a full-time hire — built for small and mid-sized companies.' },
      { slug: 'accountant', name: 'Accountant agent', status: 'validation',
        does: ['Complete month-end close checklist', 'Bank reconciliation and detection of entries above materiality', 'Drafts correcting entries for your approval — never posts automatically'],
        benefit: 'A faster, more accurate monthly close with your team keeping the final say.' },
      { slug: 'warehouse', name: 'Warehouse, inventory & production agent', status: 'validation',
        does: ['Stock levels, reorder points, valuation and slow-moving items', 'Receipts matched to purchase orders; abnormal movements flagged', 'Bill-of-materials, manufacturing-order and quality-check consistency'],
        benefit: 'Less capital locked in idle stock; receiving and production discrepancies caught early.' },
      { slug: 'hr', name: 'HR agent', status: 'validation',
        does: ['Headcount, probation periods and contracts approaching expiry', 'Payroll register reconciled against the employee master', 'Recruiting, performance, training and benefits reporting — names and national IDs redacted'],
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
        { title: 'Evidence or silence', body: 'Every finding must cite the record ids the agent actually retrieved. Findings that cite nothing, or a number not in the cited records, are rejected and shown struck through — never as facts.' },
        { title: 'Run log, seven years', body: 'Each run records provider, model, whether it ran in the cloud, tokens, client and task. Retained seven years by default, in line with ISA 230 working-paper conventions.' },
        { title: 'Your data stays on your system', body: 'Client ledgers are read from the client’s own Odoo at query time and are not copied into MFT’s systems, in line with Saudi PDPL and Egyptian data-protection requirements.' }
      ]
    },
    execution: {
      eyebrow: 'Execute after approval',
      title: 'Agents draft. People approve. Then, and only then, it executes.',
      body: 'The Accountant and Warehouse agents can carry an approved draft into Odoo so nobody re-keys it. The approval is tiered by your ISA 320 materiality threshold, approvers are registered by name, and mistakes are corrected by reversal — nothing is ever deleted.',
      steps: [
        { title: 'Draft', body: 'The agent proposes a correcting entry or stock adjustment, with the evidence it cites.' },
        { title: 'Named approval', body: 'One registered approver below your materiality threshold; two — the second a reviewer or manager — at or above it.' },
        { title: 'Execution & log', body: 'The entry is created in Odoo by a dedicated, restricted user and recorded in the run log with who approved, when, and the resulting entry id.' }
      ],
      note: 'Live Odoo write-back is delivered per client after their connector is configured; until then approved drafts are handed to your team as ready-to-post entries.'
    },
    segAudit: {
      eyebrow: 'Inside seg-audit',
      title: 'Every seg-audit report will be AI-reviewed before it reaches you.',
      body: 'The Auditor and Virtual CFO agents are being built into the seg-audit report pipeline itself — not as a paid add-on. Their output enters the platform’s existing two-stage human approval chain as a draft, the requester never approves their own run, and nothing is released without a person’s decision. The integration is in final review and switches on only after the AI-processing disclosure is published in the platform’s terms.',
      link: { label: 'About the seg-audit platform', href: 'https://app.seg-audit.com' }
    },
    faq: {
      title: 'Direct answers',
      items: [
        { q: 'What is MFT Intelligence?', a: 'A managed AI-agent service from Modern Financial Technology. Twelve specialised finance agents run on your ERP data; MFT accountants review the output; a governance policy enforced in code controls what the agents may do and where your data goes.' },
        { q: 'Which agents can I buy today?', a: 'The Auditor agent and the Virtual CFO agent, delivered as a managed service with monthly or continuous review. The other ten are in MFT’s internal validation programme and are offered as they are promoted.' },
        { q: 'Does an agent ever post or pay anything by itself?', a: 'No. Agents only draft. A named, registered person approves every action; above your materiality threshold a second person must approve. Corrections are made by reversal entries, never deletion.' },
        { q: 'Where does my data live?', a: 'On your own Odoo (or other ERP). Agents read it through the API at query time; MFT does not copy your ledger into its systems.' },
        { q: 'How is it priced?', a: 'Per engagement, based on the agents you need, the number of entities and your monthly transaction volume. Request a quote and you receive a scoped proposal from an MFT accountant.' },
        { q: 'Is this the same as seg-audit?', a: 'seg-audit is MFT’s audit and reporting platform. The same Auditor and CFO agents are being integrated into its report pipeline so every report is AI-reviewed before human review. MFT Intelligence is the standalone service you can engage directly, with or without seg-audit.' }
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
        title: 'Auditor agent — continuous ISA 320 review of your books | MFT Intelligence',
        description: 'The MFT Auditor agent reviews every transaction against your ISA 320 materiality threshold, cites its evidence, and delivers findings reviewed by a licensed accountant. Available now.',
        eyebrow: 'MFT Intelligence · Available now',
        headline: 'Every transaction reviewed. Every finding evidenced.',
        definition: 'The Auditor agent is a continuous internal-audit service: an AI agent reviews 100% of your transactions against ISA 320 materiality thresholds calibrated to your business, and a licensed MFT auditor reviews and signs every finding before it reaches you.',
        intro: 'Annual audits sample a few percent and leave eleven months uncovered. The Auditor agent reads the whole ledger, every week or every day, ranks what it finds by financial impact, and cites the exact records — or says nothing.',
        deliverables: ['Findings report ranked by impact, each with cited record ids and an ISA classification', 'Materiality threshold calibrated at onboarding (1% of revenue or 5% of net profit, per ISA 320) and reviewed quarterly', 'Duplicate and near-duplicate payment analysis, vendor-master hygiene, approval and cut-off exceptions', 'Alerts when a transaction exceeds your threshold (Professional and above)', 'Reviewer notes from a licensed MFT auditor on every report', 'Seven-year run log available to your external auditor'],
        cadence: 'Monthly report (Essential) or continuous weekly review with alerts (Professional).',
        delivery: ['Onboarding call: entity, ERP, chart of accounts, materiality calibration, registered approvers', 'Connector to your Odoo (or ledger export for other systems); your data stays on your system', 'Agent runs on schedule; a licensed MFT auditor reviews, annotates and signs the report', 'Monthly review call to decide what to do about the findings'],
        forWho: 'Owner-managed companies and groups in Egypt and Saudi Arabia that want audit coverage between annual audits, and finance teams preparing for external audit, financing or acquisition.',
        faq: [
          { q: 'Does the agent replace our external auditor?', a: 'No. It is continuous internal review. Its run log and evidence trail make the external audit faster and cheaper, and its findings are classified against ISA so your auditor can use them.' },
          { q: 'What does “evidence or silence” mean in practice?', a: 'Each finding names the journal entries, payments or balances it is based on. If the agent cannot cite a record it retrieved, the finding is rejected and never shown as fact.' },
          { q: 'Can it fix what it finds?', a: 'It drafts. Correcting entries are proposed to your team, approved by a registered person — two people above your materiality threshold — and only then posted. Nothing is deleted; mistakes are reversed.' },
          { q: 'Which systems does it read?', a: 'Odoo natively. Other ERPs via a periodic ledger export during onboarding.' }
        ],
        related: { label: 'Internal Audit service', href: 'services/internal-audit/' }
      },
      {
        slug: 'virtual-cfo',
        name: 'Virtual CFO agent',
        title: 'Virtual CFO agent — monthly board-ready analysis | MFT Intelligence',
        description: 'The MFT Virtual CFO agent analyses profitability, cash flow and budget variances from your ERP every month and produces board-ready reports reviewed by an MFT accountant. Available now.',
        eyebrow: 'MFT Intelligence · Available now',
        headline: 'A board pack every month. A CFO’s questions with it.',
        definition: 'The Virtual CFO agent is a managed monthly reporting service: an AI agent analyses profitability, cash flow and budget variances directly from your ERP data, and an MFT accountant reviews the analysis and presents it to management.',
        intro: 'Most small and mid-sized companies close the month and still cannot say where the margin went. The Virtual CFO agent produces the pack a CFO would build — by product, customer and cost centre — and MFT’s accountant sits with you to turn it into decisions.',
        deliverables: ['Monthly management pack: P&L by product and customer, cash-flow statement and 13-week forecast, working-capital position, budget variances', 'Board-ready summary in Arabic or English with the three questions management should ask', 'Variance explanations tied to the underlying entries (cited, never asserted)', 'Runway and covenant watch when terms or balances change', 'Monthly review call with an MFT accountant; quarterly with a partner', 'Seven-year run log'],
        cadence: 'Monthly pack and review call; weekly cash view on Professional and above.',
        delivery: ['Onboarding: entities, chart of accounts, budget upload, reporting currency and language', 'Connector to Odoo or a monthly ledger export; your data stays on your system', 'Agent produces the analysis; an MFT accountant reviews, annotates and signs it', 'Review meeting with management; actions tracked to the next month'],
        forWho: 'Growing companies in Egypt, Saudi Arabia and the US that need CFO-level judgement every month without a full-time hire, and founders who want to understand their own numbers.',
        faq: [
          { q: 'Is this a dashboard or a person?', a: 'Both. The agent does the analysis from your data; a licensed MFT accountant reviews it, signs it and presents it. You are never handed raw AI output.' },
          { q: 'Do we need Odoo?', a: 'It works best on Odoo, but a monthly trial balance and sub-ledger export from any system is enough to start.' },
          { q: 'How fast is the first pack?', a: 'Send your last closed month and you receive a first cash-flow and profitability snapshot within 24 hours, free. The full monthly pack starts from your next close.' },
          { q: 'Can it prepare investor or bank reporting?', a: 'Yes. Bank, investor and board formats are part of the Professional and Complete engagements.' }
        ],
        related: { label: 'Virtual CFO service', href: 'services/virtual-cfo/' }
      }
    ]
  },

  // ---- Quote request ----
  quote: {
    title: 'Request a quote — MFT Intelligence',
    description: 'Tell MFT your scope — agents, ERP, entities, transaction volume — and receive a priced proposal from an accountant within two business days.',
    page: { eyebrow: 'Request a quote', title: 'Tell us the scope. We price it.', intro: 'No fixed price list, because no two ledgers are the same. Give us four facts about your scope and an MFT accountant returns a scoped proposal within two business days.' },
    form: {
      heading: 'Scope',
      agents: 'Which agents are you interested in?',
      agentOptions: [
        { value: 'auditor', label: 'Auditor agent (available now)' },
        { value: 'virtual-cfo', label: 'Virtual CFO agent (available now)' },
        { value: 'both', label: 'Auditor + Virtual CFO' },
        { value: 'complete', label: 'Complete — all agents as they launch' },
        { value: 'unsure', label: 'Not sure — advise me' }
      ],
      erp: 'Your ERP / accounting system',
      erpOptions: [{ value: 'odoo', label: 'Odoo' }, { value: 'sap', label: 'SAP' }, { value: 'dynamics', label: 'Microsoft Dynamics' }, { value: 'quickbooks', label: 'QuickBooks / Xero / Zoho' }, { value: 'excel', label: 'Spreadsheets' }, { value: 'other', label: 'Other' }],
      entities: 'Number of legal entities',
      entityOptions: [{ value: '1', label: '1' }, { value: '2-3', label: '2–3' }, { value: '4-10', label: '4–10' }, { value: '10+', label: 'More than 10' }],
      volume: 'Monthly transactions (approx.)',
      volumeOptions: [{ value: '<500', label: 'Under 500' }, { value: '500-2000', label: '500 – 2,000' }, { value: '2000-10000', label: '2,000 – 10,000' }, { value: '10000+', label: 'Over 10,000' }],
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
      { when: 'September 2026', title: 'AI governance policy, enforced in code', body: 'Provider authorisation table, evidence gate, model policy and a seven-year run log — changes require a written CEO decision in the same commit.' },
      { when: 'September 2026', title: 'Execute after approval', body: 'Approved drafts carried into Odoo by a restricted user; one or two named approvals by materiality; reversal-only corrections.' },
      { when: 'September 2026', title: 'seg-audit integration, phase 1', body: 'Auditor and CFO drafts enter the platform’s existing two-stage approval chain. In final review; enabled after the AI disclosure is published.' },
      { when: 'August 2026', title: 'Continuous-audit campaign', body: 'Published anonymised findings from live engagements: transactions missed by manual review surfaced in weeks; a valuation gap caught before year-end close.' }
    ]
  },

  notFound: {
    title: 'Page not found',
    body: 'The page you are looking for does not exist or has moved.',
    link: 'Back to the home page'
  }
};
