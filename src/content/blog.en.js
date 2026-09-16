// English blog content. Articles are authored in the founder's voice. Rules: no client financial
// amounts, no long dashes, every claim either methodology (ISA, ZATCA, ETA) or MFT's own practice.
// Body blocks: { h2 }, { p }, { ul: [] }, { quote }. Slugs are shared with blog.ar.js.

module.exports = {
  title: 'Insights | Modern Financial Technology',
  description: 'Practical writing from MFT on internal audit, materiality, Saudi ZATCA and Egyptian e-invoicing compliance, and running Odoo as a finance system.',
  page: {
    eyebrow: 'Insights',
    title: 'Notes from the ledger.',
    intro: 'Short, practical articles from MFT’s accountants on audit, compliance in Egypt and Saudi Arabia, and Odoo, written for owners and finance teams, not for other consultants.'
  },
  labels: { readingTime: 'min read', readingTimeOne: '{lat}1{/lat} min read', readingTimeTwo: '{lat}2{/lat} min read', by: 'By', published: 'Published', updated: 'Updated', topic: 'Topic', related: 'Related articles', all: 'All articles', author: 'About the author', latest: 'Latest insights', rss: 'RSS feed' },
  topics: { audit: 'Internal audit', compliance: 'Compliance', odoo: 'Odoo', intelligence: 'MFT Intelligence' },
  authors: {
    ahmed: {
      name: 'Ahmed Ashraf Mostafa',
      role: 'Founder and CEO, Modern Financial Technology',
      bio: 'Licensed auditor and the founder of MFT. Ahmed built the firm from a financial audit practice into an Odoo implementation and Virtual CFO business serving Egypt and Saudi Arabia, and still leads client engagements. He writes about what the ledger actually shows.',
      url: 'https://www.linkedin.com/company/92779112'
    }
  },
  posts: [
    {
      slug: 'materiality-isa-320-threshold',
      topic: 'audit',
      author: 'ahmed',
      date: '2026-09-16',
      title: 'Materiality is a method, not a round number',
      dek: 'How ISA 320 turns “what matters” into a threshold your team can apply every day, and why a fixed round figure is the wrong answer for every company at once.',
      description: 'A practical guide to setting an ISA 320 materiality threshold for internal audit and continuous review: the benchmarks, the calibration, and how MFT applies it inside Odoo.',
      body: [
        { p: 'Ask most finance teams what counts as a significant error and you get a number somebody chose years ago. It is usually round, it is rarely written down, and it is the same for a trading company with thin margins as for a manufacturer with thick ones. That is not materiality. It is a habit.' },
        { h2: 'What ISA 320 actually asks for' },
        { p: 'International Standard on Auditing 320 defines materiality in terms of the decisions of the people who read the financial statements. A misstatement is material if it could reasonably be expected to influence those decisions. The standard does not give a number. It gives a discipline: pick a benchmark that reflects how the business is judged, apply a percentage that reflects its risk, and revisit the result when the business changes.' },
        { ul: ['For companies judged on profit, a percentage of profit before tax, commonly around five percent.', 'For companies judged on scale or in a loss year, a percentage of revenue, commonly around one percent, or of total assets.', 'A lower performance materiality below that figure, so that several small errors cannot add up unnoticed.'] },
        { h2: 'Why one figure for everyone fails' },
        { p: 'A threshold that is right for one entity is wrong for the next. Set it high and a growing company reviews too little: duplicate payments, near-duplicate vendors and cut-off errors slip under the line month after month. Set it low and the team drowns in exceptions and stops reading them. Both failures look like diligence from the outside.' },
        { h2: 'How we calibrate it' },
        { p: 'At onboarding we compute the threshold from the client’s own last closed year: the benchmark, the percentage, and a performance materiality below it. We write the calculation down, we review it every quarter, and we recompute it when revenue or profit moves by more than the percentage itself. The Auditor agent in MFT Intelligence carries exactly this number, so every transaction it flags is flagged against your threshold, not a default.' },
        { quote: 'A threshold you cannot explain to your board in one sentence is not a threshold. It is a guess with a decimal point.' },
        { h2: 'What changes for your team' },
        { p: 'Two things. First, the review becomes explainable: this entry was flagged because it exceeds a documented threshold derived from your own numbers. Second, approvals become proportionate: below the line one registered approver, at or above it a second person. That is the same logic MFT applies when an agent drafts a correcting entry and a person approves it.' }
      ]
    },
    {
      slug: 'zatca-phase-two-odoo-checklist',
      topic: 'compliance',
      author: 'ahmed',
      date: '2026-09-16',
      title: 'ZATCA phase two inside Odoo: what must be right before go-live',
      dek: 'Integration, clearance and reporting are configuration decisions, not a button. The checklist we run before any Saudi Odoo implementation goes live.',
      description: 'The MFT checklist for ZATCA phase two e-invoicing in Odoo: device onboarding, clearance versus reporting, invoice fields, sandbox testing and the data-residency question.',
      body: [
        { p: 'Phase two of the ZATCA e-invoicing programme moved Saudi companies from generating compliant invoices to integrating with the Authority: standard tax invoices are cleared in real time, simplified invoices are reported within a day, and every document carries a cryptographic stamp and a QR code. Odoo supports this. Whether your implementation does depends on decisions made weeks before go-live.' },
        { h2: 'The six checks we do not skip' },
        { ul: ['Entity and branch setup: the commercial registration, VAT number and address on every invoice match the ZATCA portal exactly, per branch.', 'Device onboarding: the EGS unit is enrolled with a production CSID, and the renewal date is in someone’s calendar.', 'Clearance versus reporting: B2B standard invoices are configured to clear before they reach the customer; B2C simplified invoices report within the 24-hour window.', 'Invoice content: line-level VAT categories, exemption reasons, and the buyer identification fields that phase two made mandatory.', 'Credit and debit notes: they reference the original invoice and carry the reason; this is where most rejections come from.', 'Sandbox first: every invoice type is tested against the ZATCA sandbox, and the rejection log is reviewed, before the production switch.'] },
        { h2: 'Where the data lives' },
        { p: 'Saudi clients ask this before anything else, and they are right to. Under the Personal Data Protection Law, client data should stay on the client’s own systems. Our Odoo implementations keep the ledger on the client’s instance; MFT and the MFT Intelligence agents read it through the API at query time and do not copy it out of the Kingdom.' },
        { h2: 'After go-live' },
        { p: 'Compliance is not a state, it is a monthly check. The Tax and compliance agent in internal validation at MFT reconciles the sales ledger against what was cleared and reported, so a gap shows up before the Authority finds it. Until it is promoted, our accountants run the same reconciliation by hand as part of the monthly review.' }
      ]
    },
    {
      slug: 'egypt-eta-einvoicing-odoo-mistakes',
      topic: 'compliance',
      author: 'ahmed',
      date: '2026-09-16',
      title: 'Egyptian e-invoicing in Odoo: seven configuration mistakes that block submissions',
      dek: 'Most ETA rejections are not tax problems. They are master-data problems that were visible in Odoo weeks earlier.',
      description: 'The seven Odoo configuration errors MFT sees most often behind Egyptian Tax Authority e-invoice rejections, and how to fix each one at the source.',
      body: [
        { p: 'When an e-invoice is rejected by the Egyptian Tax Authority, the finance team reads it as a tax issue. In our implementations, the cause is almost always upstream: a product without a GS1 or EGS code, a customer without a valid tax id, an address missing a field the portal requires. The fix is in master data, not in the tax return.' },
        { h2: 'The seven we see most' },
        { ul: ['Products without an approved item code, or with a code of the wrong type for the product category.', 'Customers with a national id where a tax registration number is required, or the reverse for individuals.', 'Branch addresses that do not match the branch registered with the Authority, down to the governorate field.', 'Unit of measure codes that are not in the ETA list, usually because a local unit was typed by hand.', 'Discounts applied at document level where the schema expects them per line, or the other way round.', 'Currency and exchange rate fields left empty on foreign-currency invoices.', 'Credit notes issued without a reference to the original document’s UUID.'] },
        { h2: 'Fix it where it starts' },
        { p: 'Each of these is a validation rule that Odoo can enforce at the point of entry: a product cannot be saved without an item code, a customer cannot be set to B2B without a tax number, an invoice cannot be confirmed with an unmapped unit. We configure those rules during implementation. That is what we mean when we say the implementation is led by accountants: the system refuses the error instead of recording it.' },
        { h2: 'The receipt mandate' },
        { p: 'For retail and food and beverage clients, the B2C receipt mandate adds a second stream with its own device registration and its own timing. It is part of the standard implementation for those sectors, and it is tested in the sandbox with the same rigour as invoices.' },
        { quote: 'A rejected e-invoice is the Authority telling you what your master data looked like a month ago.' }
      ]
    },
    {
      slug: 'continuous-audit-eleven-months',
      topic: 'audit',
      author: 'ahmed',
      date: '2026-09-16',
      title: 'The eleven months your annual audit does not see',
      dek: 'Sampling once a year is a design choice from a paper era. What continuous review finds, and how it changes the relationship with your external auditor.',
      description: 'Why annual sampling leaves most of the year uncovered, what continuous internal audit finds in practice (duplicate payments, near-duplicate vendors, cut-off), and how it complements the external audit.',
      body: [
        { p: 'An annual audit does exactly what it says: once a year, a sample of transactions is examined, and an opinion is formed on the statements as a whole. It is essential, and it is not designed to catch what happens in the other eleven months. Nothing in it is meant to notice a supplier registered twice under two codes, paid twice for eight months.' },
        { h2: 'What continuous review finds' },
        { ul: ['Duplicate and near-duplicate payments: same bank account, same tax id, two vendor codes.', 'Approvals outside the matrix: the same person requesting and approving, or an approver acting above their limit.', 'Cut-off errors that move revenue or cost between periods and flatter one month at the expense of the next.', 'Inventory valuation drift when a costing method is not updated after a supplier contract changes.', 'Manual journal entries posted late on the last day of the month, in round amounts, with thin descriptions.'] },
        { p: 'None of these are exotic. All of them were visible in the ledger long before year-end. Our published client stories describe two of them: transactions missed by manual review and surfaced within six weeks, and a valuation gap caught three weeks before close. No amounts, by policy; the pattern is the point.' },
        { h2: 'Coverage, not sampling' },
        { p: 'With the whole population scored by risk, the question changes from “which five percent do we look at” to “which findings matter this week”. The Auditor agent in MFT Intelligence ranks every flagged item by financial impact against your ISA 320 threshold and cites the exact records. A licensed auditor reviews the ranked list and signs the report. That is the division of labour: the machine covers, the accountant judges.' },
        { h2: 'Your external auditor is not the competition' },
        { p: 'Continuous review makes the annual audit shorter and cheaper. Findings are classified against ISA, the evidence trail is already there, and the working papers are retained for seven years by default. Most external auditors we work with ask for the run log on day one.' }
      ]
    },
    {
      slug: 'agents-draft-people-approve',
      topic: 'intelligence',
      author: 'ahmed',
      date: '2026-09-16',
      title: 'Agents draft. People approve. Why we built it that way.',
      dek: 'The one rule in MFT Intelligence that is not negotiable, and how it turns AI from a report generator into a controlled part of the close.',
      description: 'How MFT Intelligence executes after approval: agents draft correcting entries and adjustments, named registered approvers sign them by materiality tier, and corrections are reversals, never deletions.',
      body: [
        { p: 'The obvious way to build an AI accountant is to let it post. It is also the fastest way to lose the trust of an audit committee. When we designed execution into MFT Intelligence, we started from the opposite end: what would a careful reviewer need to see before letting a machine touch the ledger at all?' },
        { h2: 'Three rules, enforced in code' },
        { ul: ['Agents only draft. A correcting journal entry or a stock adjustment is a proposal with its evidence attached, never a posting.', 'Approval is by name and by tier. A registered person approves below your ISA 320 materiality threshold; at or above it, a second registered reviewer or manager must approve too. Unregistered names are refused.', 'Nothing is deleted. A wrong entry is corrected by a new reversing entry that references the original, approved by the same tiers.'] },
        { h2: 'Evidence or silence' },
        { p: 'Every finding an agent produces must cite the record ids it actually retrieved in that run. A finding that cites nothing, or quotes a number that is not in the cited records, is rejected by the evidence gate and shown to the reviewer struck through, never as a fact. The agent is allowed to say it found nothing. It is not allowed to guess.' },
        { h2: 'The log is the product' },
        { p: 'Every run records which model processed the data and whether it ran in the cloud, the tokens used, the client and the task, and every approval, execution and reversal with the resulting entry id. The log is kept for seven years by default, in line with working-paper conventions. When a client’s auditor asks how a number got there, the answer is a line in a file, not a meeting.' },
        { quote: 'Governance that lives in a document gets waived. Governance that lives in code gets a pull request.' },
        { h2: 'Where this is today' },
        { p: 'The Auditor and Virtual CFO agents are available as a managed service with MFT accountants reviewing every output. The execution path is built and tested; live write-back to Odoo is configured per client once their connector is in place, and until then approved drafts are handed to the team as ready-to-post entries. The same two agents are being built into the seg-audit report pipeline so every report is AI-reviewed before a person reviews it. That integration switches on only after the AI-processing disclosure is published in the platform’s terms.' }
      ]
    }
  ]
};
