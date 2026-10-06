// Blog posts batch A: Egyptian VAT and e-receipts, Saudi Zakat versus income tax, and three Odoo finance guides.
// Same rules as blog.en.js / blog.ar.js: no client amounts, no long dashes, methodology or MFT practice only.
module.exports = {
  en: [
    {
      slug: 'egypt-vat-return-odoo',
      topic: 'compliance',
      author: 'ahmed',
      date: '2026-09-18',
      title: 'Preparing Egypt’s monthly VAT return from Odoo, without the spreadsheet',
      dek: 'The return should come out of the ledger, and the ledger should agree with what the Egyptian Tax Authority already holds from your e-invoices.',
      description: 'How to prepare Egypt’s monthly VAT return from Odoo: tax grid mapping, input versus output tax, reconciling to the general ledger and matching ETA e-invoices.',
      answer: 'Prepare it from Odoo’s tax report, not a spreadsheet. Map every tax in use to the correct tax grid, reconcile output and input VAT on the report to the VAT accounts in the general ledger, compare sales and purchases with the e-invoices accepted on the ETA portal, then file by the statutory deadline and set the tax lock date.',
      takeaways: [
        'Every tax in use must map to the right tax grid, for invoices and refunds.',
        'The tax report and the VAT account balances must agree every month.',
        'Output and input tax should match the e-invoices accepted by the ETA.',
        'Lock the declared period in Odoo once the return is filed.'
      ],
      body: [
        { p: 'In most Egyptian companies we meet, the monthly VAT return is prepared in a spreadsheet that starts from an Odoo export and ends in a figure someone types into the Egyptian Tax Authority portal. The spreadsheet works until the month it does not: a credit note posted after the export, a purchase invoice without a valid tax registration number, an e-invoice that was rejected and never resubmitted. The return should come out of the ledger, and the ledger should agree with what the Authority already holds.' },
        { h2: 'What does the Egyptian VAT return actually summarise?' },
        { p: 'For each tax period, the return reports the output tax charged on taxable sales, the input tax recoverable on purchases, and the net amount payable or carried forward. The standard rate is 14%. Some supplies are exempt, exports are generally zero-rated, and certain goods carry schedule (table) tax under its own rules. Each of these must land in its own line on the return, which means each must be distinguishable in Odoo before the month starts, not after it ends.' },
        { h2: 'How should taxes be mapped in Odoo?' },
        { p: 'Every tax in Odoo carries tax grids that tell the system which line of the tax report an amount belongs to. The Egyptian localization provides a starting set. The work is checking that every tax actually in use, including any created by hand during the first year, is mapped to the right grid for both the base and the tax amount, and for both invoices and refunds.' },
        { ul: [
          'Output VAT at 14% on local taxable sales, with the base and the tax on separate grids.',
          'Zero-rated exports and exempt sales as distinct taxes, so they appear on the return instead of hiding inside a generic 0% tax.',
          'Input VAT on local purchases, split where the return or your own analysis requires it.',
          'Import VAT paid at customs, recorded against the customs documentation rather than the supplier invoice.',
          'Refund versions of each tax mapped to reverse the correct grid, so credit notes reduce the right line.'
        ] },
        { h2: 'Input versus output: where do the errors usually come from?' },
        { p: 'Output tax errors are usually about timing: an invoice dated in one month and posted in the next, or a credit note issued without reference to the original invoice. Input tax errors are usually about eligibility: VAT claimed on a purchase whose supplier document does not meet the conditions for deduction, VAT claimed twice because the same vendor bill was entered twice, or VAT on expenses for which the law does not allow deduction. Odoo will record any of these without complaint unless the configuration tells it otherwise.' },
        { p: 'Our practice is to restrict who can create or edit taxes, require the supplier’s tax registration number on any vendor bill that carries input VAT, and run a duplicate check on vendor reference and amount before the period is closed.' },
        { h2: 'How do you reconcile the return to the general ledger?' },
        { p: 'The tax report in Odoo is computed from journal items that carry tax grids. The balance of the VAT accounts in the general ledger is computed from the same journal items, grouped by account. If the two disagree, something was posted to a VAT account without a tax grid, usually a manual journal entry, or a tax was configured to post to the wrong account. The reconciliation is simple and monthly:' },
        { ul: [
          'The movement on the output VAT account for the period equals the output tax on the report.',
          'The movement on the input VAT account for the period equals the recoverable input tax on the report.',
          'Any difference is traced to specific journal items, and every manual entry to a VAT account is reviewed and justified.',
          'The VAT settlement entry clears both accounts to the payable or carry-forward account, so the next period opens clean.'
        ] },
        { h2: 'How does the return link to ETA e-invoices?' },
        { p: 'Since e-invoicing became mandatory, the Authority receives every B2B invoice your company issues, and every one your suppliers issue to you, as structured data. That changes the review. Output tax on the return should agree with the e-invoices your company submitted and the Authority accepted for the period, after credit and debit notes. Input tax should be supported by e-invoices your suppliers submitted. Before filing, we compare the Odoo sales journal with the list of accepted documents on the portal and investigate three populations: invoices in Odoo that were never accepted, documents accepted by the Authority that are not in Odoo, and documents whose amount or date differs between the two.' },
        { p: 'The same comparison on the purchase side catches vendor bills recorded from paper or PDF where no valid e-invoice exists. Check the current ETA guidance on what supports input tax for the period in question, since the rules have tightened as e-invoicing has rolled out.' },
        { quote: 'If the return cannot be rebuilt from the ledger in ten minutes, it was not prepared from the ledger.' },
        { h2: 'Where does the VAT return sit in the monthly close?' },
        { p: 'The return is filed by the statutory deadline, but the work belongs inside the month-end close, after bank reconciliation and before the period is locked. Once the return is filed, set the tax lock date in Odoo so that nothing can be posted into a declared period without a deliberate, logged change. When we run an Odoo implementation for Egyptian clients, tax grid mapping and this reconciliation are part of the acceptance tests, not a later improvement.' }
      ],
      faq: [
        { q: 'What is the standard VAT rate in Egypt?', a: 'The standard VAT rate is 14%. Some supplies are exempt, exports are generally zero-rated, and certain goods are subject to schedule tax, so each needs its own tax in Odoo.' },
        { q: 'Can Odoo produce the Egyptian VAT return automatically?', a: 'Odoo produces a tax report from the tax grids configured in the Egyptian localization. It is only as accurate as the tax mapping and the postings behind it, so reconcile it to the ledger and the ETA portal before filing.' },
        { q: 'Why does my VAT report not match the general ledger?', a: 'Usually because a manual journal entry was posted to a VAT account without a tax, or a tax posts to the wrong account. Trace the difference to individual journal items and fix the configuration, not just the entry.' }
      ]
    },
    {
      slug: 'egypt-e-receipt-b2c',
      topic: 'compliance',
      author: 'ahmed',
      date: '2026-09-21',
      title: 'Egypt’s e-receipt system: what changes for retail, and what Odoo POS needs',
      dek: 'E-invoicing covered sales between businesses. The e-receipt covers sales to consumers, at the till, as they happen, and it is a different project.',
      description: 'What Egypt’s B2C e-receipt system is, how it differs from B2B e-invoicing, and what POS and Odoo setup a retailer needs before the first receipt goes live.',
      answer: 'Egypt’s e-receipt system requires businesses selling to consumers to issue each receipt electronically and transmit it to the Egyptian Tax Authority, with a unique identifier and a QR code. Unlike B2B e-invoicing, it runs at the point of sale in high volumes, so every POS terminal must be registered and integrated, and receipts reconciled to the ledger daily.',
      takeaways: [
        'E-receipts cover B2C sales at the point of sale; e-invoicing covers B2B.',
        'Each POS terminal is part of the compliance setup and must be registered.',
        'Returns must reference the original receipt, not be typed as negative sales.',
        'Reconcile POS sessions, accepted receipts and bank deposits every day.'
      ],
      body: [
        { p: 'Egyptian companies have spent the last few years bringing their B2B invoices onto the Egyptian Tax Authority’s e-invoicing system. For retailers, restaurants, pharmacies and anyone else who sells to individuals, the e-receipt system is the second half of the same policy: the Authority sees consumer sales as they happen, not when the VAT return is filed.' },
        { h2: 'What is the e-receipt system?' },
        { p: 'An e-receipt is the electronic version of the receipt a customer receives at the till. Instead of a paper slip printed by a cash register the Authority never sees, each receipt is issued as a structured document carrying the seller’s details, the items, the tax, a unique identifier and a QR code, and it is transmitted to the Authority according to its technical specifications. The rollout has been phased by groups of taxpayers, so the date that applies to your company depends on the group you were notified in. Check the current ETA announcements rather than relying on a date you heard from a peer.' },
        { h2: 'How is it different from B2B e-invoicing?' },
        { ul: [
          'The buyer: e-invoices are issued to registered businesses with a tax number; e-receipts are issued mainly to consumers, who usually have none.',
          'The volume: a company might issue a few hundred invoices a month and thousands of receipts a day.',
          'The place: e-invoices are usually created in the back office; receipts are created at the till, often by cashiers with no accounting role.',
          'The devices: each point of sale that issues receipts is registered with the Authority, which makes the device itself part of the compliance setup.',
          'The failure mode: an invoice can wait an hour for a fix; a queue at the till cannot.'
        ] },
        { h2: 'What does the POS and Odoo setup need?' },
        { p: 'Whether you use Odoo Point of Sale or another POS that feeds Odoo, the project has the same parts. The technical connection may come from a localization module, a certified integrator or a custom connector, depending on your Odoo version and edition, so confirm which before you plan the timeline.' },
        { ul: [
          'Registration of each branch and each POS terminal with the Authority, mapped one to one to the terminals configured in Odoo.',
          'Product master data with valid item codes and the correct tax on every item sold at the till, including services and deposits.',
          'Clean handling of returns and refunds: a return receipt that references the original receipt, not a negative sale typed by hand.',
          'A plan for connectivity loss: how receipts are queued, numbered and transmitted when the line is down, within what the specification allows.',
          'A receipt layout with the QR code and the fields the Authority requires, tested on the actual printers in the stores.'
        ] },
        { h2: 'How should finance reconcile e-receipts?' },
        { p: 'The e-receipt system creates a third record of every sale, beside the POS session and the accounting entry. The three must agree. Our daily routine for retail clients compares, per terminal and per day, the POS session totals, the receipts accepted by the Authority, and the cash and card amounts actually banked. Differences fall into a few patterns: receipts stuck in a transmission queue, sessions closed without posting, refunds processed outside the system, and card settlements that arrive net of fees on a different day.' },
        { p: 'Monthly, the output VAT on retail sales in the return should agree with the sum of accepted receipts after returns. If it does not, either the return is wrong or the receipts are, and the Authority can see both.' },
        { quote: 'At the till, compliance is a cashier’s habit. Design the system so the correct habit is the easy one.' },
        { h2: 'Where do implementations usually go wrong?' },
        { p: 'Most of the problems we see are not in the connector. They are in the store: a terminal added at a new branch and never registered, a promotion configured with a discount the receipt format cannot express, staff trained on the old cash register and taught nothing about returns. That is why we treat e-receipts as an operations project with an accounting owner. In an Odoo implementation for retail, we test every receipt type, sale, return, exchange, discount and void, in a test environment before the first store switches over.' },
        { p: 'After go-live, the daily reconciliation is the control. It is short when the setup is right, and it is the first place a missing terminal or a broken refund process shows itself, long before the VAT return is due.' }
      ],
      faq: [
        { q: 'What is the difference between an e-invoice and an e-receipt in Egypt?', a: 'The e-invoice covers sales to businesses and is issued from the back office. The e-receipt covers sales to consumers at the point of sale, in much higher volumes, with each POS terminal registered with the Egyptian Tax Authority.' },
        { q: 'Does Odoo support the Egyptian e-receipt?', a: 'Support depends on your Odoo version, edition and the localization or integration you use. Confirm the connector and test every receipt type, including returns, before go-live.' },
        { q: 'When does my company have to join the e-receipt system?', a: 'The Egyptian Tax Authority has rolled the system out in phases by groups of taxpayers. Check the current ETA announcements and any notification addressed to your company for the date that applies to you.' }
      ]
    },
    {
      slug: 'zakat-vs-corporate-income-tax-saudi',
      topic: 'compliance',
      author: 'ahmed',
      date: '2026-09-24',
      title: 'Zakat or corporate income tax in Saudi Arabia: who pays which, and what the ledger must show',
      dek: 'Two systems run side by side and start from the same financial statements, but they measure different things and need different information from the books.',
      description: 'Zakat versus corporate income tax in Saudi Arabia: who pays which based on ownership, what each one measures, and what the ledger must support all year round.',
      answer: 'In Saudi Arabia, the share of a company owned by Saudi and GCC nationals is generally subject to Zakat, at 2.5% of the zakat base, while the share owned by non-Saudi shareholders is subject to corporate income tax, at a standard 20% of taxable profit. Companies with mixed ownership pay both, split by ownership.',
      takeaways: [
        'Saudi and GCC ownership is generally subject to Zakat; non-Saudi ownership to income tax.',
        'Zakat is 2.5% of a wealth-based zakat base; income tax is 20% of taxable profit.',
        'Account classification often decides whether a balance is added, deducted or adjusted.',
        'Draft both computations at each quarter close, not only at year-end.'
      ],
      body: [
        { p: 'Saudi Arabia runs two systems side by side for companies: Zakat and corporate income tax. Both are administered by the Zakat, Tax and Customs Authority (ZATCA), both are filed annually, and both start from the financial statements. But they measure different things, apply to different owners and need different information from the ledger. A company that understands only one of them usually discovers the other at the worst moment, during an assessment.' },
        { h2: 'Who pays Zakat and who pays income tax?' },
        { p: 'The dividing line is ownership. As a general rule:' },
        { ul: [
          'The share of a company owned by Saudi nationals, and by GCC nationals treated as Saudi for this purpose, is subject to Zakat.',
          'The share owned by non-Saudi shareholders is subject to corporate income tax.',
          'A company with mixed ownership files a combined position: Zakat on the Saudi and GCC share, income tax on the foreign share, both computed from the same accounts.',
          'Certain sectors, such as oil and hydrocarbons, have their own regimes and rates that this note does not cover.'
        ] },
        { p: 'Where shareholders are themselves companies, their treatment needs a careful reading of the regulations, so confirm how corporate shareholders are treated with your adviser. When the shareholder register changes during the year, the split changes with it.' },
        { h2: 'What does each one actually measure?' },
        { p: 'Corporate income tax is a tax on profit. The starting point is accounting profit, adjusted for items the tax rules treat differently: expenses that are not deductible, provisions that are deductible only when they are used, depreciation computed under the tax rules rather than the accounting policy, and so on. The standard rate is 20% of the taxable profit attributable to the foreign share.' },
        { p: 'Zakat is a levy on wealth, not on profit. It is charged at 2.5% of the zakat base, which is built broadly from the company’s sources of funds, such as equity, retained earnings, certain provisions and long-term financing, less the assets the regulations allow to be deducted, such as fixed assets and certain long-term investments. Adjusted net profit for the year also enters the calculation. A loss-making company can therefore still owe Zakat if its base is positive. The regulations defining the base have been revised in recent years, so build your computation on the current ZATCA rules, not on last decade’s template.' },
        { quote: 'Income tax asks what you earned. Zakat asks what you hold. The ledger has to answer both.' },
        { h2: 'What must the ledger support?' },
        { p: 'Neither return can be prepared well from a trial balance alone. The detail matters, because the classification of a balance often decides whether it is added to the zakat base, deducted from it, or adjusted for income tax.' },
        { ul: [
          'A chart of accounts that separates long-term from short-term financing, and related-party balances from third-party ones.',
          'Provisions in their own accounts, with movements that show amounts charged and amounts used during the year.',
          'A fixed asset register that reconciles to the ledger, with additions, disposals and depreciation traceable to documents.',
          'Investments classified by type and holding, with the evidence the deduction rules require.',
          'A record of ownership percentages by period, so the split between Zakat and income tax can be computed and defended.',
          'Non-deductible expenses, such as fines and costs without adequate support, tagged as they are posted, not reconstructed at year-end.'
        ] },
        { h2: 'How do withholding tax and VAT fit in?' },
        { p: 'They are separate obligations that run through the year. Payments to non-resident parties may carry withholding tax, and VAT at 15% is filed on its own cycle. Neither replaces Zakat or income tax, but all of them draw on the same vendor and customer master data, so an error in one tends to appear in the others.' },
        { h2: 'How should a finance team prepare during the year?' },
        { p: 'The annual return is due by the statutory deadline after year-end, and the computation is only as good as the twelve months of postings behind it. Our approach, whether as part of an Odoo implementation or a Virtual CFO engagement, is to design the chart of accounts and analytic tags with both computations in mind, prepare a draft zakat base and income tax computation at each quarter close, and keep a reconciliation from the audited financial statements to every line of the returns. When ZATCA asks a question during an assessment, the answer should already be in the file.' }
      ],
      faq: [
        { q: 'Do foreign-owned companies in Saudi Arabia pay Zakat?', a: 'Generally not on the foreign-owned share, which is subject to corporate income tax instead. A company with both Saudi or GCC and foreign shareholders pays Zakat on the Saudi and GCC share and income tax on the foreign share.' },
        { q: 'Can a loss-making company owe Zakat?', a: 'Yes. Zakat is calculated on the zakat base, which reflects the company’s funds and assets rather than its profit, so a company can owe Zakat in a loss year.' },
        { q: 'What is the corporate income tax rate in Saudi Arabia?', a: 'The standard rate is 20% of the taxable profit attributable to non-Saudi ownership. Some sectors, such as oil and hydrocarbons, are taxed at different rates.' }
      ]
    },
    {
      slug: 'odoo-accounting-implementation-steps',
      topic: 'odoo',
      author: 'ahmed',
      date: '2026-09-27',
      title: 'The phases of an Odoo accounting implementation, and the mistakes that cost the most',
      dek: 'Installing Odoo takes an afternoon. An implementation an auditor will accept takes phases, and each one ends in a reconciliation.',
      description: 'The phases of a sound Odoo accounting implementation, from chart of accounts and taxes to opening balances, parallel run and go-live, and the costly mistakes.',
      answer: 'A sound Odoo accounting implementation runs in phases: design the chart of accounts, configure taxes and journals, set access rights and approvals, load and reconcile opening balances, run Odoo in parallel with the old system for at least one closed period, then go live with lock dates set. Skipping the parallel run is the costliest mistake.',
      takeaways: [
        'Design the chart of accounts for statutory and tax reporting; use analytics for management views.',
        'Treat access rights as segregation of duties, not as an IT setting.',
        'Load open items individually and reconcile every control account at cut-over.',
        'Run at least one parallel month before go-live.'
      ],
      body: [
        { p: 'Odoo can be installed in an afternoon. An accounting implementation that an auditor will accept takes longer, because the hard part is not the software. It is deciding how the business should be recorded, then making the system enforce those decisions. These are the phases we follow, in the order we follow them, and the mistakes we are most often called in to fix.' },
        { h2: 'Phase one: what should the chart of accounts look like?' },
        { p: 'Start from the localization chart for Egypt or Saudi Arabia, then shape it around how management and the tax returns need to read the numbers. Keep the chart of accounts for the statutory and tax view, and use analytic accounts for branches, projects and cost centres rather than multiplying ledger accounts. Agree the mapping from the old chart to the new one in writing, because opening balances and comparative reports both depend on it.' },
        { h2: 'Phase two: how should taxes and journals be configured?' },
        { p: 'Each tax the company actually uses is configured with the correct rate, accounts and tax grids, including refunds. Journals are set up for each bank account, each cash box, sales, purchases and miscellaneous entries, with sequences that match the company’s numbering policy and, where relevant, the e-invoicing requirements of the ETA or ZATCA. Payment terms, fiscal positions for exports and foreign suppliers, and currency settings also belong in this phase.' },
        { h2: 'Phase three: who can do what?' },
        { p: 'Access rights are an internal control, not an IT task. Decide who can create and post vendor bills, who can register payments, who can create customers and vendors, who can edit taxes and accounts, and who can post manual journal entries. Separate the person who creates a vendor from the person who pays it. Odoo’s user groups and approval features cover most of this natively; anything that needs Studio or custom development should be documented as such.' },
        { h2: 'Phase four: how do you load opening balances correctly?' },
        { ul: [
          'Choose a cut-over date at a period end, ideally a closed and reviewed month or year.',
          'Load the trial balance at that date into a dedicated opening journal, through a suspense account that must end at zero.',
          'Load open customer invoices and vendor bills individually, so ageing and payment matching work from day one.',
          'Load inventory quantities and values that agree with the stock count and the ledger, and fixed assets with their accumulated depreciation.',
          'Reconcile every control account, bank, receivables, payables, inventory and VAT, to its subledger before anything else is posted.'
        ] },
        { h2: 'Phase five: why run in parallel?' },
        { p: 'For at least one month, transactions are recorded in both the old system and Odoo, and the month is closed in both. The two trial balances, the VAT position and the receivable and payable ageing are compared line by line. The differences are almost always configuration: a tax posting to the wrong account, a journal with the wrong default account, a product category with the wrong valuation accounts. Finding them in a parallel month costs days. Finding them after go-live costs a restatement.' },
        { h2: 'Phase six: what does go-live look like?' },
        { p: 'Go-live is a decision, signed by the finance lead, based on a passed parallel run and a short list of known issues, each with an owner. The old system is set to read-only. Lock dates are set in Odoo for every period before go-live. Users are trained on their own processes, not on Odoo in general, and the first month-end close is run with the implementation team present.' },
        { quote: 'The parallel month is the cheapest audit you will ever buy.' },
        { h2: 'What are the typical mistakes?' },
        { ul: [
          'Copying the old chart of accounts line by line, including accounts nobody has used in years.',
          'Loading opening receivables and payables as a single total, so nothing can be matched or aged.',
          'Giving every finance user the adviser or administrator role to save time during setup, and never taking it back.',
          'Creating taxes by hand during go-live week without tax grids, so the tax report is wrong from the first month.',
          'Skipping the parallel run because the deadline is close.',
          'Treating inventory as a separate project, when its valuation accounts drive the balance sheet.'
        ] },
        { p: 'Our Odoo implementations are led by accountants for this reason. Every phase above ends with a reconciliation, and the project is not finished until the numbers agree.' }
      ],
      faq: [
        { q: 'How long does an Odoo accounting implementation take?', a: 'It depends on the number of companies, modules and integrations, and on the quality of the existing data. Plan for at least one parallel month in addition to configuration and testing.' },
        { q: 'Should opening balances be imported as totals or as open items?', a: 'Load the trial balance as totals, but load open customer invoices and vendor bills individually, so ageing reports and payment reconciliation work from the first day.' },
        { q: 'What is a parallel run in an ERP implementation?', a: 'It is a period in which transactions are recorded in both the old and the new system and both are closed, so the results can be compared and configuration errors found before go-live.' }
      ]
    },
    {
      slug: 'odoo-inventory-valuation-fifo-avco',
      topic: 'odoo',
      author: 'ahmed',
      date: '2026-09-30',
      title: 'FIFO or average cost in Odoo: choosing a valuation method you can live with',
      dek: 'The costing method decides the gross margin the board sees every month. It is easy to choose during setup and expensive to change later.',
      description: 'FIFO or average cost in Odoo: the effect on COGS and margin, why automated perpetual valuation matters, landed costs, and the risk of changing method mid-year.',
      answer: 'Choose FIFO when purchase costs move and you need cost of goods sold to reflect the actual layers consumed; choose average cost (AVCO) when items are interchangeable and you want smoother margins. In Odoo, set the method and automated valuation on the product category before transactions begin, because changing it mid-year revalues stock and breaks comparability.',
      takeaways: [
        'FIFO follows actual cost layers; average cost smooths price changes.',
        'Automated valuation posts every stock move to the ledger, so category accounts must be right first.',
        'Landed costs belong in inventory cost, not in expenses.',
        'Changing the method mid-year is an accounting policy change, not just a setting.'
      ],
      body: [
        { p: 'Inventory valuation in Odoo is set by two choices on each product category: the costing method and the valuation mode. Together they decide how stock is valued on the balance sheet, what lands in cost of goods sold, and therefore what gross margin the board sees each month. Both choices are easy to make during setup and expensive to change later.' },
        { h2: 'What costing methods does Odoo offer?' },
        { ul: [
          'Standard price: every unit is valued at a fixed cost you set, and differences from actual cost must be handled separately. Useful in manufacturing with a disciplined costing process, rarely right for trading.',
          'Average cost (AVCO): each receipt updates a weighted average cost per product, and deliveries are valued at the current average.',
          'First in, first out (FIFO): stock is held in layers by receipt, and deliveries consume the oldest layers first, each at its own cost.'
        ] },
        { p: 'Under IAS 2, and the Egyptian standard based on it, both FIFO and weighted average are acceptable cost formulas; LIFO is not. Saudi Arabia applies IFRS as endorsed locally, with the same result. The standard also requires the same formula for inventories of a similar nature and use.' },
        { h2: 'How do FIFO and average cost affect COGS and margin?' },
        { p: 'When purchase prices are stable, the two methods give similar results. When prices move, they diverge. In a rising price environment, FIFO charges older, cheaper layers to cost of goods sold, so margins look higher and closing stock is valued nearer current prices. Average cost blends old and new, so margins move more smoothly and react to price changes more slowly. With a volatile currency, as Egyptian importers have experienced, the gap between the two can be large enough to change how management reads a quarter.' },
        { p: 'Neither method is more correct. The question is which one matches how the business buys and sells. Interchangeable goods bought continuously suit average cost. Goods with distinct batches, expiry dates or price-sensitive margins often suit FIFO. Whatever you choose, apply it consistently within each category of similar items.' },
        { h2: 'Why use perpetual (automated) valuation?' },
        { p: 'With manual, or periodic, valuation, Odoo tracks quantities and the accountant posts the stock value in a journal entry at period end. With automated, or perpetual, valuation, every receipt and delivery posts its own journal entry to the stock valuation, stock input and stock output accounts configured on the category. Automated valuation keeps the ledger and the stock valuation report in step every day, and it is what makes landed costs and accurate cost of goods sold per invoice possible. It also means configuration errors reach the ledger immediately, which is why the category accounts must be right before the first receipt.' },
        { h2: 'How do landed costs work?' },
        { p: 'Freight, customs duties, insurance and clearing charges are part of the cost of inventory under IAS 2. In Odoo, the landed costs feature allocates these charges to the receipts they relate to, by quantity, weight, volume, current cost or equally, and adds them to the stock layers. It works with FIFO and average cost under automated valuation. If landed costs are posted as expenses instead, margins on imported goods are overstated in the month of sale and understated in the month of import.' },
        { quote: 'The costing method is an accounting policy. Change it the way you would change any policy: rarely, deliberately and in writing.' },
        { h2: 'What are the risks of changing the method mid-year?' },
        { p: 'Odoo allows the costing method on a category to be changed, and revalues the stock on hand when you do. That convenience hides several risks:' },
        { ul: [
          'A change of cost formula is a change in accounting policy under IAS 8, which needs justification and disclosure, not just a configuration change.',
          'Comparatives become inconsistent: the months before and after the change are not measured the same way.',
          'The revaluation entry can be large and lands on a single day, distorting that month’s margin.',
          'Open receipts, returns and landed costs that straddle the change are easy to misvalue.'
        ] },
        { p: 'If a change is genuinely needed, make it at a period end after a stock count, document the reason, record the revaluation separately and agree the approach with your external auditor beforehand.' },
        { h2: 'How we set it up' },
        { p: 'In an Odoo implementation, we decide the method per product category with the finance lead, configure automated valuation with dedicated accounts, and reconcile the stock valuation report to the ledger before go-live and at every month end. The same reconciliation is one of the first checks in our internal audit work, because inventory valuation drift is rarely visible anywhere else.' }
      ],
      faq: [
        { q: 'Is FIFO or average cost better in Odoo?', a: 'Neither is better in general. FIFO suits goods with distinct batches or price-sensitive margins; average cost suits interchangeable goods bought continuously. Choose per product category and apply it consistently.' },
        { q: 'Can I change the costing method in Odoo after go-live?', a: 'Odoo allows it and revalues stock on hand, but a change of cost formula is a change in accounting policy. Do it at a period end, document it and agree it with your auditor.' },
        { q: 'Do landed costs work with standard price in Odoo?', a: 'No. Landed costs in Odoo require FIFO or average cost with automated inventory valuation.' }
      ]
    },
    {
      slug: 'month-end-close-checklist-odoo',
      topic: 'odoo',
      author: 'ahmed',
      date: '2026-10-03',
      title: 'A month-end close checklist for Odoo that a reviewer can sign',
      dek: 'Most of the tools are already in Odoo. What is usually missing is the order, the evidence and the sign-off.',
      description: 'A practical month-end close checklist for Odoo: bank reconciliation, AR and AP ageing, accruals, inventory valuation, depreciation, VAT, review and lock dates.',
      answer: 'A month-end close in Odoo should reconcile every bank and cash journal, review receivable and payable ageing, post accruals and deferrals, reconcile inventory valuation to the ledger, post depreciation, reconcile VAT, review the trial balance and management accounts, and only then set the lock date, so the closed period cannot change without a logged decision.',
      takeaways: [
        'Finish posting, e-invoice submission and stock moves before the close begins.',
        'Every subledger report must agree with its control account.',
        'Accruals should reverse automatically so they do not double count.',
        'Set the lock date only after an independent review.'
      ],
      body: [
        { p: 'A close is finished when someone other than the preparer can review it and sign it. In Odoo, most of the steps are built in: bank reconciliation, ageing reports, asset depreciation, lock dates. What is usually missing is the order, the evidence and the sign-off. This is the checklist we use, in the order we use it.' },
        { h2: 'What has to be finished before the close starts?' },
        { ul: [
          'All sales invoices and credit notes for the month are posted and, in Egypt and Saudi Arabia, accepted by the ETA or cleared or reported to ZATCA.',
          'All vendor bills received are posted, and goods received without a bill are identified.',
          'POS sessions are closed and posted.',
          'Stock receipts and deliveries for the month are validated, with no draft moves dated in the period.'
        ] },
        { h2: 'Step one: are the bank and cash journals reconciled?' },
        { p: 'Every bank statement line for the month is reconciled in Odoo, and the statement ending balance agrees with the bank’s own statement. Unreconciled items older than the month are listed with an explanation. Cash boxes are counted and agree with the cash journal. Outstanding receipts and payments accounts are reviewed, since items left there are often the first sign of a duplicate or a misposted payment.' },
        { h2: 'Step two: what does the receivable and payable ageing show?' },
        { p: 'Run the aged receivable and aged payable reports and agree their totals to the control accounts in the trial balance. Review overdue customer balances for collectability and the expected credit loss provision, and review vendor balances for debit balances, duplicates and unapplied credit notes. Customer advances and vendor prepayments should sit in their own accounts, not netted inside receivables and payables.' },
        { h2: 'Step three: which accruals and deferrals are needed?' },
        { p: 'Post accruals for goods and services received but not yet billed, such as utilities, professional fees and the goods received not invoiced balance. Recognise prepaid expenses and deferred revenue for the portion that belongs to the month. Depending on version and edition, Odoo can generate deferral entries from vendor bills and invoices, and accruals can be posted with an automatic reversal on the first day of the next month, so they do not double count when the bill arrives.' },
        { h2: 'Step four: does inventory agree with the ledger?' },
        { p: 'Compare the stock valuation report with the balances of the inventory accounts. Under automated valuation they should agree exactly; any difference points to a manual entry on an inventory account or a category with the wrong accounts. Review the stock interim accounts for received and delivered goods for balances that should have cleared, post landed costs for the month’s imports, and record the results of any cycle counts.' },
        { h2: 'Step five: are fixed assets and depreciation up to date?' },
        { p: 'Confirm that the month’s capital purchases are registered as assets, disposals are recorded and depreciation entries for the month are posted. In Odoo Enterprise, the assets app posts depreciation on its schedule. The asset register should reconcile to the cost and accumulated depreciation accounts.' },
        { h2: 'Step six: are tax and other balance sheet accounts reconciled?' },
        { ul: [
          'VAT accounts agree with the tax report, and the VAT return figures agree with both.',
          'Payroll liabilities, social insurance and withholding tax accounts agree with their supporting schedules.',
          'Intercompany balances agree on both sides.',
          'Foreign currency balances are revalued at the month-end rate where the policy requires it.',
          'Suspense and clearing accounts are at zero or explained.'
        ] },
        { h2: 'Step seven: who reviews, and when do you lock?' },
        { p: 'The preparer hands over the trial balance, the reconciliations and a short note on unusual movements. The reviewer compares the profit and loss with budget and with prior months, questions the large movements and reads the manual journal entries posted in the last days of the month. Only after review are the lock dates set in Odoo, so that nothing can be posted into the closed period without a deliberate, recorded change by an authorised person.' },
        { quote: 'A close without a lock date is a draft.' },
        { p: 'Many owners we support through our Virtual CFO service start with a close that takes weeks and ends without review. Run consistently, the checklist above shortens itself: each month starts from reconciled balances instead of last month’s open questions.' }
      ],
      faq: [
        { q: 'How do I lock a period in Odoo?', a: 'Set the lock dates in Odoo’s accounting settings once the period has been reviewed, and restrict who can change them, so reopening a closed period is a deliberate and traceable decision.' },
        { q: 'How long should a month-end close take?', a: 'It depends on transaction volume, the number of entities and how much is reconciled during the month. The aim is a predictable timetable with review built in, not the shortest possible close.' },
        { q: 'Why does the stock valuation report not match the inventory account?', a: 'Usually because of a manual journal entry on an inventory account, or a product category configured with the wrong valuation accounts. Under automated valuation, the two should agree exactly.' }
      ]
    }
  ],
  ar: [
    {
      slug: 'egypt-vat-return-odoo',
      topic: 'compliance',
      author: 'ahmed',
      date: '2026-09-18',
      title: 'إعداد إقرار ضريبة القيمة المضافة المصري الشهري من {lat}Odoo{/lat}، بلا جدول بيانات',
      dek: 'الإقرار يجب أن يخرج من دفتر الأستاذ، ودفتر الأستاذ يجب أن يتفق مع ما تملكه مصلحة الضرائب المصرية بالفعل من فواتيرك الإلكترونية.',
      description: 'كيف تعد إقرار ضريبة القيمة المضافة المصري الشهري من Odoo: ربط الضرائب بشبكات التقرير، وضريبة المدخلات والمخرجات، ومطابقته مع دفتر الأستاذ والفواتير الإلكترونية.',
      answer: 'أعدّه من تقرير الضرائب في {lat}Odoo{/lat} لا من جدول بيانات: اربط كل ضريبة مستخدمة بالشبكة الضريبية الصحيحة، وطابق ضريبة المخرجات والمدخلات في التقرير مع حسابات الضريبة في دفتر الأستاذ، وقارن المبيعات والمشتريات بالفواتير الإلكترونية المقبولة على منظومة مصلحة الضرائب، ثم قدّمه في الموعد القانوني واضبط تاريخ قفل الضرائب.',
      takeaways: [
        'كل ضريبة مستخدمة يجب أن ترتبط بالشبكة الضريبية الصحيحة، للفواتير والمرتجعات.',
        'تقرير الضرائب وأرصدة حسابات الضريبة يجب أن يتفقا كل شهر.',
        'ضريبة المخرجات والمدخلات يجب أن تطابق الفواتير الإلكترونية التي قبلتها المصلحة.',
        'اقفل الفترة المُقرّ عنها في {lat}Odoo{/lat} فور تقديم الإقرار.'
      ],
      body: [
        { p: 'في أغلب الشركات المصرية التي نعمل معها، يُعدّ إقرار ضريبة القيمة المضافة الشهري في جدول بيانات يبدأ بتصدير من {lat}Odoo{/lat} وينتهي برقم يكتبه أحدهم يدويًا على بوابة مصلحة الضرائب المصرية. ينجح الجدول حتى الشهر الذي لا ينجح فيه: إشعار دائن رُحّل بعد التصدير، أو فاتورة شراء بلا رقم تسجيل ضريبي صالح، أو فاتورة إلكترونية رُفضت ولم يُعد إرسالها. الإقرار يجب أن يخرج من دفتر الأستاذ، ودفتر الأستاذ يجب أن يتفق مع ما تملكه المصلحة بالفعل.' },
        { h2: 'ماذا يلخّص إقرار القيمة المضافة المصري فعلًا؟' },
        { p: 'يعرض الإقرار عن كل فترة ضريبية ضريبة المخرجات المحصّلة على المبيعات الخاضعة، وضريبة المدخلات القابلة للخصم على المشتريات، والصافي المستحق أو المرحّل. السعر العام أربعة عشر بالمئة، وبعض التوريدات معفاة، والصادرات عمومًا بسعر صفر، وبعض السلع تخضع لضريبة الجدول بقواعدها الخاصة. كل فئة من هذه يجب أن تقع في سطرها في الإقرار، أي يجب أن تكون مميّزة في {lat}Odoo{/lat} قبل أن يبدأ الشهر، لا بعد أن ينتهي.' },
        { h2: 'كيف تُربط الضرائب في {lat}Odoo{/lat}؟' },
        { p: 'كل ضريبة في {lat}Odoo{/lat} تحمل شبكات ضريبية، تُسمّى أحيانًا وسومًا، تخبر النظام بأي سطر في تقرير الضرائب ينتمي إليه المبلغ. توفّر الحزمة المحلية المصرية مجموعة للبداية، والعمل الحقيقي هو التأكد من أن كل ضريبة مستخدمة فعلًا، بما فيها ما أُنشئ يدويًا في السنة الأولى، مربوطة بالشبكة الصحيحة للوعاء وللضريبة معًا، وللفواتير وللمرتجعات معًا.' },
        { ul: [
          'ضريبة مخرجات بأربعة عشر بالمئة على المبيعات المحلية الخاضعة، مع الوعاء والضريبة على شبكتين منفصلتين.',
          'الصادرات بسعر صفر والمبيعات المعفاة كضرائب مستقلة، حتى تظهر في الإقرار بدل أن تختفي داخل ضريبة صفرية عامة.',
          'ضريبة مدخلات على المشتريات المحلية، مقسّمة حيث يتطلب الإقرار أو تحليلك ذلك.',
          'ضريبة الواردات المسددة في الجمارك، مسجّلة على المستندات الجمركية لا على فاتورة المورد.',
          'نسخة المرتجعات من كل ضريبة مربوطة بحيث تعكس الشبكة الصحيحة، فتخفّض الإشعارات الدائنة السطر الصحيح.'
        ] },
        { h2: 'المدخلات والمخرجات: من أين تأتي الأخطاء عادة؟' },
        { p: 'أخطاء ضريبة المخرجات غالبًا أخطاء توقيت: فاتورة مؤرخة في شهر ومرحّلة في الشهر التالي، أو إشعار دائن صدر دون إشارة إلى الفاتورة الأصلية. أما أخطاء ضريبة المدخلات فغالبًا أخطاء أحقية: ضريبة خُصمت على مشتريات لا يستوفي مستند المورد فيها شروط الخصم، أو خُصمت مرتين لأن فاتورة المورد نفسها أُدخلت مرتين، أو خُصمت على مصروفات لا يجيز القانون خصم ضريبتها. يسجّل {lat}Odoo{/lat} كل ذلك دون اعتراض ما لم يُعدّ ليرفضه.' },
        { p: 'ممارستنا أن نقصر صلاحية إنشاء الضرائب وتعديلها على عدد محدود، وأن نشترط رقم التسجيل الضريبي للمورد في كل فاتورة شراء تحمل ضريبة مدخلات، وأن نشغّل فحصًا للتكرار على مرجع المورد والمبلغ قبل إقفال الفترة.' },
        { h2: 'كيف يُطابق الإقرار مع دفتر الأستاذ العام؟' },
        { p: 'يُحسب تقرير الضرائب في {lat}Odoo{/lat} من بنود القيود التي تحمل شبكات ضريبية، ويُحسب رصيد حسابات الضريبة في دفتر الأستاذ من البنود نفسها مجمّعة حسب الحساب. فإذا اختلفا، فهناك شيء رُحّل إلى حساب ضريبة دون شبكة، غالبًا قيد يومية يدوي، أو ضريبة معدّة لترحّل إلى الحساب الخطأ. المطابقة بسيطة ومكانها كل شهر:' },
        { ul: [
          'حركة حساب ضريبة المخرجات عن الفترة تساوي ضريبة المخرجات في التقرير.',
          'حركة حساب ضريبة المدخلات عن الفترة تساوي ضريبة المدخلات القابلة للخصم في التقرير.',
          'أي فرق يُتتبّع إلى بنود قيود بعينها، وكل قيد يدوي على حساب ضريبة يُراجع ويُبرَّر.',
          'قيد تسوية الضريبة يصفّي الحسابين إلى حساب الضريبة المستحقة أو الرصيد المرحّل، فتبدأ الفترة التالية نظيفة.'
        ] },
        { h2: 'كيف يرتبط الإقرار بالفواتير الإلكترونية لدى {lat}ETA{/lat}؟' },
        { p: 'منذ أن أصبحت الفاتورة الإلكترونية إلزامية، تتلقى المصلحة كل فاتورة {lat}B2B{/lat} تصدرها شركتك، وكل فاتورة يصدرها موردوك لك، في صورة بيانات منظّمة. وهذا يغيّر المراجعة: ضريبة المخرجات في الإقرار يجب أن تتفق مع الفواتير التي أرسلتها شركتك وقبلتها المصلحة عن الفترة بعد الإشعارات الدائنة والمدينة، وضريبة المدخلات يجب أن تسندها فواتير إلكترونية أرسلها الموردون. قبل التقديم نقارن دفتر المبيعات في {lat}Odoo{/lat} بقائمة المستندات المقبولة على البوابة، ونفحص ثلاث مجموعات: فواتير في {lat}Odoo{/lat} لم تُقبل قط، ومستندات قبلتها المصلحة وليست في {lat}Odoo{/lat}، ومستندات يختلف مبلغها أو تاريخها بين الطرفين.' },
        { p: 'والمقارنة نفسها على جانب المشتريات تكشف فواتير موردين سُجّلت من ورق أو من ملف {lat}PDF{/lat} دون وجود فاتورة إلكترونية صالحة. راجع إرشادات المصلحة الحالية بشأن ما يسند ضريبة المدخلات عن الفترة المعنية، فالقواعد تشددت مع توسّع الفاتورة الإلكترونية.' },
        { quote: 'إذا لم تستطع إعادة بناء الإقرار من دفتر الأستاذ في عشر دقائق، فهو لم يُعدّ من دفتر الأستاذ.' },
        { h2: 'أين يقع إقرار القيمة المضافة في الإقفال الشهري؟' },
        { p: 'يُقدَّم الإقرار في الموعد القانوني، لكن العمل نفسه مكانه داخل الإقفال الشهري، بعد التسوية البنكية وقبل قفل الفترة. وبعد التقديم اضبط تاريخ قفل الضرائب في {lat}Odoo{/lat} حتى لا يُرحّل شيء في فترة مُقرّ عنها إلا بتغيير متعمد ومسجّل. وعندما ننفّذ {lat}Odoo{/lat} لعملائنا في مصر، يكون ربط الشبكات الضريبية وهذه المطابقة جزءًا من اختبارات القبول، لا تحسينًا يأتي لاحقًا.' }
      ],
      faq: [
        { q: 'ما السعر العام لضريبة القيمة المضافة في مصر؟', a: 'السعر العام أربعة عشر بالمئة. بعض التوريدات معفاة، والصادرات عمومًا بسعر صفر، وبعض السلع تخضع لضريبة الجدول، لذا يحتاج كل منها ضريبة مستقلة في {lat}Odoo{/lat}.' },
        { q: 'هل يُخرج {lat}Odoo{/lat} إقرار القيمة المضافة المصري تلقائيًا؟', a: 'يُخرج {lat}Odoo{/lat} تقرير ضرائب من الشبكات المعدّة في الحزمة المحلية المصرية، ودقته بقدر دقة ربط الضرائب والترحيلات التي خلفه، لذا طابقه مع دفتر الأستاذ وبوابة المصلحة قبل التقديم.' },
        { q: 'لماذا لا يطابق تقرير الضرائب دفتر الأستاذ العام؟', a: 'غالبًا لأن قيدًا يدويًا رُحّل إلى حساب ضريبة دون ضريبة، أو لأن ضريبة معدّة لترحّل إلى الحساب الخطأ. تتبّع الفرق إلى البنود وأصلح الإعداد، لا القيد وحده.' }
      ]
    },
    {
      slug: 'egypt-e-receipt-b2c',
      topic: 'compliance',
      author: 'ahmed',
      date: '2026-09-21',
      title: 'منظومة الإيصال الإلكتروني في مصر: ما الذي يتغير للتجزئة، وما الذي تحتاجه نقاط البيع في {lat}Odoo{/lat}',
      dek: 'غطّت الفاتورة الإلكترونية المبيعات بين الشركات. أما الإيصال الإلكتروني فيغطي المبيعات للمستهلك، عند الكاشير، لحظة حدوثها، وهو مشروع مختلف.',
      description: 'ما منظومة الإيصال الإلكتروني المصرية للبيع للمستهلكين، وكيف تختلف عن الفاتورة الإلكترونية بين الشركات، وما الذي يحتاجه إعداد نقاط البيع وOdoo قبل التشغيل.',
      answer: 'تُلزم منظومة الإيصال الإلكتروني في مصر الشركات التي تبيع للمستهلكين بإصدار كل إيصال إلكترونيًا وإرساله إلى مصلحة الضرائب، بمعرّف فريد ورمز {lat}QR{/lat}. وبخلاف الفاتورة الإلكترونية بين الشركات، تعمل المنظومة عند نقطة البيع وبأحجام كبيرة، فيجب تسجيل كل جهاز نقطة بيع وربطه، ومطابقة الإيصالات مع الدفاتر يوميًا.',
      takeaways: [
        'الإيصال الإلكتروني يغطي البيع للمستهلك عند نقطة البيع، والفاتورة الإلكترونية تغطي البيع بين الشركات.',
        'كل جهاز نقطة بيع جزء من إعداد الامتثال ويجب تسجيله.',
        'المرتجع يجب أن يشير إلى الإيصال الأصلي، لا أن يُكتب بيعًا سالبًا.',
        'طابق جلسات نقاط البيع والإيصالات المقبولة والإيداعات البنكية كل يوم.'
      ],
      body: [
        { p: 'قضت الشركات المصرية السنوات الأخيرة في نقل فواتيرها بين الشركات إلى منظومة الفاتورة الإلكترونية لدى مصلحة الضرائب. أما متاجر التجزئة والمطاعم والصيدليات وكل من يبيع للأفراد، فمنظومة الإيصال الإلكتروني هي النصف الثاني من السياسة نفسها: المصلحة ترى مبيعات المستهلكين وقت حدوثها، لا عند تقديم إقرار القيمة المضافة.' },
        { h2: 'ما منظومة الإيصال الإلكتروني؟' },
        { p: 'الإيصال الإلكتروني هو النسخة الإلكترونية من الإيصال الذي يتسلمه العميل عند الكاشير. فبدل ورقة تطبعها ماكينة نقدية لا تراها المصلحة، يصدر كل إيصال مستندًا منظّمًا يحمل بيانات البائع والأصناف والضريبة ومعرّفًا فريدًا ورمز {lat}QR{/lat}، ويُرسل إلى المصلحة وفق مواصفاتها الفنية. وقد طُبّقت المنظومة على مراحل حسب مجموعات الممولين، فالموعد الذي يخص شركتك يعتمد على المجموعة التي أُخطرت ضمنها. راجع إعلانات المصلحة الحالية ولا تعتمد على موعد سمعته من زميل.' },
        { h2: 'كيف تختلف عن الفاتورة الإلكترونية بين الشركات؟' },
        { ul: [
          'المشتري: الفاتورة تصدر لشركات مسجلة لها رقم ضريبي، والإيصال يصدر غالبًا لمستهلكين ليس لهم رقم.',
          'الحجم: قد تصدر الشركة بضع مئات من الفواتير شهريًا وآلاف الإيصالات يوميًا.',
          'المكان: الفاتورة تُنشأ عادة في المكتب الخلفي، والإيصال يُنشأ عند الكاشير، غالبًا على يد موظفين ليس لهم دور محاسبي.',
          'الأجهزة: كل نقطة بيع تصدر إيصالات تُسجّل لدى المصلحة، فيصبح الجهاز نفسه جزءًا من إعداد الامتثال.',
          'نمط الفشل: الفاتورة تحتمل ساعة انتظار حتى تُصلح، وطابور الكاشير لا يحتمل.'
        ] },
        { h2: 'ما الذي يحتاجه إعداد نقاط البيع و{lat}Odoo{/lat}؟' },
        { p: 'سواء استخدمت نقاط البيع في {lat}Odoo{/lat} أو نظام نقاط بيع آخر يغذّي {lat}Odoo{/lat}، فللمشروع الأجزاء نفسها. وقد يأتي الربط الفني من حزمة محلية أو من مُكامل معتمد أو من موصل مخصص، بحسب إصدار {lat}Odoo{/lat} ونسخته، فتأكد من ذلك قبل أن تضع الجدول الزمني.' },
        { ul: [
          'تسجيل كل فرع وكل جهاز نقطة بيع لدى المصلحة، مربوطًا واحدًا بواحد بالأجهزة المعدّة في {lat}Odoo{/lat}.',
          'بيانات أصناف رئيسية بأكواد صالحة وضريبة صحيحة على كل صنف يُباع عند الكاشير، بما في ذلك الخدمات والتأمينات.',
          'معالجة نظيفة للمرتجعات والاستردادات: إيصال مرتجع يشير إلى الإيصال الأصلي، لا بيع سالب يُكتب يدويًا.',
          'خطة لانقطاع الاتصال: كيف تُحفظ الإيصالات وتُرقّم وتُرسل عند انقطاع الخط، في حدود ما تسمح به المواصفات.',
          'تصميم إيصال يحمل رمز {lat}QR{/lat} والحقول التي تطلبها المصلحة، مُختبر على الطابعات الفعلية في الفروع.'
        ] },
        { h2: 'كيف تطابق الإدارة المالية الإيصالات الإلكترونية؟' },
        { p: 'تُنشئ منظومة الإيصال سجلًا ثالثًا لكل عملية بيع، بجانب جلسة نقطة البيع والقيد المحاسبي، ويجب أن تتفق الثلاثة. روتيننا اليومي لعملاء التجزئة يقارن، لكل جهاز ولكل يوم، إجماليات جلسات نقاط البيع، والإيصالات التي قبلتها المصلحة، والمبالغ النقدية ومبالغ البطاقات التي أُودعت فعلًا في البنك. وتقع الفروق في أنماط قليلة: إيصالات عالقة في طابور الإرسال، وجلسات أُغلقت دون ترحيل، واستردادات تمت خارج النظام، وتسويات بطاقات تصل صافية من العمولة في يوم مختلف.' },
        { p: 'وشهريًا، يجب أن تتفق ضريبة المخرجات على مبيعات التجزئة في الإقرار مع مجموع الإيصالات المقبولة بعد المرتجعات. فإن لم تتفق، فالخطأ إما في الإقرار وإما في الإيصالات، والمصلحة ترى الاثنين.' },
        { quote: 'عند الكاشير، الامتثال عادة يومية للموظف. صمّم النظام بحيث تكون العادة الصحيحة هي الأسهل.' },
        { h2: 'أين تتعثر التطبيقات عادة؟' },
        { p: 'أغلب المشكلات التي نراها ليست في الموصل، بل في الفرع: جهاز أُضيف في فرع جديد ولم يُسجّل، أو عرض ترويجي بخصم لا يستطيع شكل الإيصال التعبير عنه، أو موظفون دُرّبوا على الماكينة القديمة ولم يتعلموا شيئًا عن المرتجعات. لذلك نعامل الإيصال الإلكتروني كمشروع تشغيلي له مالك محاسبي. وفي تنفيذ {lat}Odoo{/lat} لقطاع التجزئة نختبر كل نوع إيصال، البيع والمرتجع والاستبدال والخصم والإلغاء، في بيئة اختبار قبل أن ينتقل أول فرع.' },
        { p: 'وبعد التشغيل تصبح المطابقة اليومية هي أداة الرقابة. تكون قصيرة حين يكون الإعداد سليمًا، وهي أول مكان يظهر فيه جهاز غير مسجّل أو إجراء استرداد معطوب، قبل موعد إقرار القيمة المضافة بوقت طويل.' }
      ],
      faq: [
        { q: 'ما الفرق بين الفاتورة الإلكترونية والإيصال الإلكتروني في مصر؟', a: 'الفاتورة الإلكترونية تغطي المبيعات للشركات وتصدر من المكتب الخلفي. أما الإيصال الإلكتروني فيغطي المبيعات للمستهلكين عند نقطة البيع، بأحجام أكبر بكثير، مع تسجيل كل جهاز نقطة بيع لدى مصلحة الضرائب.' },
        { q: 'هل يدعم {lat}Odoo{/lat} الإيصال الإلكتروني المصري؟', a: 'يعتمد الدعم على إصدار {lat}Odoo{/lat} ونسخته وعلى الحزمة المحلية أو الربط الذي تستخدمه. تأكد من الموصل واختبر كل أنواع الإيصالات، بما فيها المرتجعات، قبل التشغيل.' },
        { q: 'متى يجب أن تنضم شركتي إلى منظومة الإيصال الإلكتروني؟', a: 'طبّقت مصلحة الضرائب المنظومة على مراحل حسب مجموعات الممولين. راجع إعلانات المصلحة الحالية وأي إخطار موجّه لشركتك لمعرفة الموعد الذي يخصك.' }
      ]
    },
    {
      slug: 'zakat-vs-corporate-income-tax-saudi',
      topic: 'compliance',
      author: 'ahmed',
      date: '2026-09-24',
      title: 'الزكاة أم ضريبة الدخل في السعودية: من يدفع ماذا، وما الذي يجب أن يُظهره دفتر الأستاذ',
      dek: 'نظامان يعملان جنبًا إلى جنب ويبدآن من القوائم المالية نفسها، لكنهما يقيسان أشياء مختلفة ويحتاجان معلومات مختلفة من الدفاتر.',
      description: 'الفرق بين الزكاة وضريبة دخل الشركات في السعودية: من يخضع لكل منهما حسب الملكية، وما الذي يقيسه كل نظام، وما الذي يجب أن يدعمه دفتر الأستاذ طوال السنة.',
      answer: 'في السعودية تخضع حصة الشركة المملوكة لسعوديين ولمواطني دول مجلس التعاون الخليجي للزكاة عمومًا، بنسبة اثنين ونصف بالمئة من الوعاء الزكوي، بينما تخضع حصة المساهمين غير السعوديين لضريبة دخل الشركات بسعر أساسي قدره عشرون بالمئة من الربح الخاضع. والشركات مختلطة الملكية تدفع الاثنين، مقسّمين حسب الملكية.',
      takeaways: [
        'الملكية السعودية والخليجية تخضع للزكاة عمومًا، والملكية غير السعودية لضريبة الدخل.',
        'الزكاة اثنان ونصف بالمئة من وعاء قائم على الثروة، وضريبة الدخل عشرون بالمئة من الربح الخاضع.',
        'تصنيف الحساب كثيرًا ما يحدد هل يُضاف الرصيد إلى الوعاء أم يُحسم منه أم يُعدّل.',
        'أعدّ مسودة الحسابين عند إقفال كل ربع، لا في نهاية السنة فقط.'
      ],
      body: [
        { p: 'تطبّق المملكة على الشركات نظامين متجاورين: الزكاة وضريبة دخل الشركات. تديرهما معًا هيئة الزكاة والضريبة والجمارك ({lat}ZATCA{/lat})، ويُقدَّم كلاهما سنويًا، ويبدأ كلاهما من القوائم المالية. لكنهما يقيسان أشياء مختلفة، وينطبقان على ملّاك مختلفين، ويحتاجان معلومات مختلفة من دفتر الأستاذ. والشركة التي تفهم أحدهما فقط تكتشف الآخر عادة في أسوأ توقيت: أثناء الربط.' },
        { h2: 'من يدفع الزكاة ومن يدفع ضريبة الدخل؟' },
        { p: 'الخط الفاصل هو الملكية. وكقاعدة عامة:' },
        { ul: [
          'حصة الشركة المملوكة لمواطنين سعوديين، ولمواطني دول مجلس التعاون المعاملين معاملة السعوديين في هذا الشأن، تخضع للزكاة.',
          'الحصة المملوكة لمساهمين غير سعوديين تخضع لضريبة دخل الشركات.',
          'الشركة مختلطة الملكية تقدّم موقفًا مركبًا: زكاة على الحصة السعودية والخليجية، وضريبة دخل على الحصة الأجنبية، وكلاهما محسوب من الحسابات نفسها.',
          'لبعض القطاعات، كالنفط والمواد الهيدروكربونية، أنظمة وأسعار خاصة لا تتناولها هذه المقالة.'
        ] },
        { p: 'وحين يكون المساهمون أنفسهم شركات، تحتاج معاملتهم إلى قراءة دقيقة للائحة، فتأكد من معاملة المساهمين الاعتباريين مع مستشارك. وإذا تغيّر سجل المساهمين خلال السنة، تغيّرت القسمة معه.' },
        { h2: 'ماذا يقيس كل منهما فعلًا؟' },
        { p: 'ضريبة الدخل ضريبة على الربح. نقطة البداية هي الربح المحاسبي، معدّلًا بالبنود التي تعاملها قواعد الضريبة بشكل مختلف: مصروفات غير قابلة للخصم، ومخصصات لا تُخصم إلا عند استخدامها، واستهلاك يُحسب وفق قواعد الضريبة لا وفق السياسة المحاسبية، وغير ذلك. والسعر الأساسي عشرون بالمئة من الربح الخاضع المنسوب إلى الحصة الأجنبية.' },
        { p: 'أما الزكاة فهي على الثروة لا على الربح، بنسبة اثنين ونصف بالمئة من الوعاء الزكوي، الذي يُبنى في جوهره من مصادر أموال الشركة كحقوق الملكية والأرباح المبقاة وبعض المخصصات والتمويل طويل الأجل، مطروحًا منها الأصول التي تجيز اللائحة حسمها كالأصول الثابتة وبعض الاستثمارات طويلة الأجل. ويدخل صافي الربح المعدّل للسنة في الحساب أيضًا. لذلك قد تستحق الزكاة على شركة خاسرة إذا كان وعاؤها موجبًا. وقد عُدّلت اللائحة التي تحدد الوعاء في السنوات الأخيرة، فابنِ حسابك على قواعد الهيئة الحالية، لا على نموذج العقد الماضي.' },
        { quote: 'ضريبة الدخل تسأل: كم كسبت؟ والزكاة تسأل: كم تملك؟ ودفتر الأستاذ يجب أن يجيب عن السؤالين.' },
        { h2: 'ما الذي يجب أن يدعمه دفتر الأستاذ؟' },
        { p: 'لا يمكن إعداد أيٍّ من الإقرارين جيدًا من ميزان المراجعة وحده. التفاصيل مهمة، لأن تصنيف الرصيد كثيرًا ما يحدد هل يُضاف إلى الوعاء الزكوي أم يُحسم منه أم يُعدّل لأغراض ضريبة الدخل.' },
        { ul: [
          'دليل حسابات يفصل التمويل طويل الأجل عن قصير الأجل، وأرصدة الأطراف ذات العلاقة عن أرصدة الغير.',
          'مخصصات في حسابات مستقلة، بحركة تُظهر المكوَّن والمستخدَم خلال السنة.',
          'سجل أصول ثابتة يطابق دفتر الأستاذ، بإضافات واستبعادات واستهلاك يمكن تتبعها إلى المستندات.',
          'استثمارات مصنّفة حسب النوع ونسبة الملكية، مع المستندات التي تتطلبها قواعد الحسم.',
          'سجل لنسب الملكية حسب الفترة، حتى تُحسب القسمة بين الزكاة وضريبة الدخل ويمكن الدفاع عنها.',
          'تمييز المصروفات غير القابلة للخصم، كالغرامات والتكاليف غير المؤيدة بمستندات كافية، عند ترحيلها لا بإعادة بنائها في نهاية السنة.'
        ] },
        { h2: 'أين تقع ضريبة الاستقطاع وضريبة القيمة المضافة؟' },
        { p: 'هما التزامان منفصلان يجريان طوال السنة. قد تخضع المدفوعات لغير المقيمين لضريبة الاستقطاع، وضريبة القيمة المضافة بخمسة عشر بالمئة تُقدَّم في دورتها الخاصة. لا تحل أي منهما محل الزكاة أو ضريبة الدخل، لكنها جميعًا تعتمد على بيانات الموردين والعملاء نفسها، فالخطأ في إحداها يظهر عادة في الأخرى.' },
        { h2: 'كيف يستعد فريق المالية خلال السنة؟' },
        { p: 'يُقدَّم الإقرار السنوي في الموعد القانوني بعد نهاية السنة، والحساب لا يكون أفضل من اثني عشر شهرًا من الترحيلات التي خلفه. نهجنا، سواء ضمن تنفيذ {lat}Odoo{/lat} أو ضمن خدمة المدير المالي الافتراضي، أن نصمم دليل الحسابات والوسوم التحليلية والحسابان في الذهن، وأن نُعدّ مسودة للوعاء الزكوي ولحساب ضريبة الدخل عند إقفال كل ربع، وأن نحتفظ بمطابقة من القوائم المالية المراجعة إلى كل سطر في الإقرارين. وحين تطرح الهيئة سؤالًا أثناء الربط، يجب أن تكون الإجابة في الملف بالفعل.' }
      ],
      faq: [
        { q: 'هل تدفع الشركات المملوكة لأجانب في السعودية الزكاة؟', a: 'عمومًا لا عن الحصة الأجنبية، فهي تخضع لضريبة دخل الشركات بدلًا من ذلك. والشركة التي لها مساهمون سعوديون أو خليجيون وأجانب تدفع الزكاة عن الحصة السعودية والخليجية وضريبة الدخل عن الحصة الأجنبية.' },
        { q: 'هل يمكن أن تستحق الزكاة على شركة خاسرة؟', a: 'نعم. تُحسب الزكاة على الوعاء الزكوي الذي يعكس أموال الشركة وأصولها لا ربحها، فقد تستحق الزكاة في سنة الخسارة.' },
        { q: 'ما سعر ضريبة دخل الشركات في السعودية؟', a: 'السعر الأساسي عشرون بالمئة من الربح الخاضع المنسوب إلى الملكية غير السعودية، ولبعض القطاعات كالنفط والمواد الهيدروكربونية أسعار مختلفة.' }
      ]
    },
    {
      slug: 'odoo-accounting-implementation-steps',
      topic: 'odoo',
      author: 'ahmed',
      date: '2026-09-27',
      title: 'مراحل تنفيذ المحاسبة على {lat}Odoo{/lat}، والأخطاء الأعلى كلفة',
      dek: 'تثبيت {lat}Odoo{/lat} يستغرق ظهيرة واحدة. أما تنفيذ يقبله المراجع فيمر بمراحل، تنتهي كل منها بمطابقة.',
      description: 'مراحل تنفيذ المحاسبة على Odoo بشكل سليم، من دليل الحسابات والضرائب إلى الأرصدة الافتتاحية والتشغيل المتوازي والتشغيل الفعلي، والأخطاء الأعلى كلفة.',
      answer: 'يمر تنفيذ المحاسبة السليم على {lat}Odoo{/lat} بمراحل: تصميم دليل الحسابات، وإعداد الضرائب واليوميات، وضبط الصلاحيات والاعتمادات، وتحميل الأرصدة الافتتاحية ومطابقتها، ثم تشغيل {lat}Odoo{/lat} بالتوازي مع النظام القديم لفترة مُقفلة واحدة على الأقل، ثم التشغيل الفعلي مع ضبط تواريخ القفل. وتخطّي التشغيل المتوازي هو الخطأ الأعلى كلفة.',
      takeaways: [
        'صمّم دليل الحسابات للتقارير القانونية والضريبية، واستخدم الحسابات التحليلية لعرض الإدارة.',
        'عامل الصلاحيات كفصل للمهام، لا كإعداد تقني.',
        'حمّل البنود المفتوحة كلًّا على حدة، وطابق كل حساب مراقبة عند الانتقال.',
        'شغّل شهرًا متوازيًا واحدًا على الأقل قبل التشغيل الفعلي.'
      ],
      body: [
        { p: 'يمكن تثبيت {lat}Odoo{/lat} في ظهيرة واحدة. أما تنفيذ محاسبي يقبله المراجع فيستغرق وقتًا أطول، لأن الجزء الصعب ليس البرنامج، بل تقرير كيف يجب أن تُسجَّل أعمال الشركة، ثم جعل النظام يفرض تلك القرارات. هذه هي المراحل التي نتبعها، بالترتيب الذي نتبعها به، والأخطاء التي نُستدعى في الغالب لإصلاحها.' },
        { h2: 'المرحلة الأولى: كيف يجب أن يبدو دليل الحسابات؟' },
        { p: 'ابدأ من دليل الحزمة المحلية لمصر أو للسعودية، ثم شكّله حول الطريقة التي تحتاج بها الإدارة والإقرارات الضريبية إلى قراءة الأرقام. اجعل دليل الحسابات للعرض القانوني والضريبي، واستخدم الحسابات التحليلية للفروع والمشروعات ومراكز التكلفة بدل مضاعفة حسابات الأستاذ. واتفق كتابةً على الربط بين الدليل القديم والجديد، لأن الأرصدة الافتتاحية وتقارير المقارنة تعتمد عليه.' },
        { h2: 'المرحلة الثانية: كيف تُعدّ الضرائب واليوميات؟' },
        { p: 'تُعدّ كل ضريبة تستخدمها الشركة فعلًا بالسعر والحسابات والشبكات الضريبية الصحيحة، بما في ذلك المرتجعات. وتُنشأ يوميات لكل حساب بنكي وكل خزينة وللمبيعات والمشتريات والقيود المتنوعة، بتسلسلات تطابق سياسة الترقيم في الشركة، ومتطلبات الفاتورة الإلكترونية لدى {lat}ETA{/lat} أو {lat}ZATCA{/lat} حيث تنطبق. وشروط الدفع، والأوضاع الضريبية للصادرات والموردين الأجانب، وإعدادات العملات، مكانها هذه المرحلة أيضًا.' },
        { h2: 'المرحلة الثالثة: من يستطيع أن يفعل ماذا؟' },
        { p: 'الصلاحيات رقابة داخلية لا مهمة تقنية. حدّد من يُنشئ فواتير الموردين ويرحّلها، ومن يسجّل المدفوعات، ومن يُنشئ العملاء والموردين، ومن يعدّل الضرائب والحسابات، ومن يرحّل القيود اليدوية. وافصل بين من يُنشئ المورد ومن يدفع له. تغطي مجموعات المستخدمين وخصائص الاعتماد في {lat}Odoo{/lat} أغلب ذلك أصلًا، وما يحتاج {lat}Studio{/lat} أو تطويرًا مخصصًا يجب توثيقه بوصفه كذلك.' },
        { h2: 'المرحلة الرابعة: كيف تُحمَّل الأرصدة الافتتاحية بشكل صحيح؟' },
        { ul: [
          'اختر تاريخ انتقال في نهاية فترة، ويُفضّل أن يكون شهرًا أو سنة مُقفلة ومراجعة.',
          'حمّل ميزان المراجعة في ذلك التاريخ في يومية افتتاحية مخصصة، عبر حساب معلّق يجب أن ينتهي إلى صفر.',
          'حمّل فواتير العملاء والموردين المفتوحة كلًّا على حدة، حتى تعمل أعمار الديون ومطابقة المدفوعات من اليوم الأول.',
          'حمّل كميات المخزون وقيمه متفقة مع الجرد ودفتر الأستاذ، والأصول الثابتة باستهلاكها المتراكم.',
          'طابق كل حساب مراقبة، البنك والعملاء والموردين والمخزون والضريبة، مع دفتره المساعد قبل ترحيل أي شيء آخر.'
        ] },
        { h2: 'المرحلة الخامسة: لماذا التشغيل المتوازي؟' },
        { p: 'لمدة شهر على الأقل تُسجَّل المعاملات في النظام القديم وفي {lat}Odoo{/lat} معًا، ويُقفل الشهر في كليهما. ثم يُقارَن ميزانا المراجعة وموقف ضريبة القيمة المضافة وأعمار العملاء والموردين بندًا بندًا. والفروق تكاد تكون دائمًا في الإعداد: ضريبة ترحّل إلى الحساب الخطأ، أو يومية بحساب افتراضي خطأ، أو فئة منتجات بحسابات تقييم خطأ. اكتشافها في الشهر المتوازي يكلّف أيامًا، واكتشافها بعد التشغيل يكلّف إعادة عرض للقوائم.' },
        { h2: 'المرحلة السادسة: كيف يبدو التشغيل الفعلي؟' },
        { p: 'التشغيل الفعلي قرار يوقّعه مسؤول المالية، بناءً على تشغيل متوازٍ ناجح وقائمة قصيرة بمشكلات معروفة لكل منها مالك. يُحوَّل النظام القديم إلى القراءة فقط، وتُضبط تواريخ القفل في {lat}Odoo{/lat} لكل فترة قبل التشغيل. ويُدرَّب المستخدمون على إجراءاتهم هم، لا على {lat}Odoo{/lat} عمومًا، ويُنفَّذ أول إقفال شهري بحضور فريق التنفيذ.' },
        { quote: 'الشهر المتوازي أرخص مراجعة ستشتريها على الإطلاق.' },
        { h2: 'ما الأخطاء المعتادة؟' },
        { ul: [
          'نسخ دليل الحسابات القديم سطرًا بسطر، بما فيه حسابات لم يستخدمها أحد منذ سنوات.',
          'تحميل أرصدة العملاء والموردين الافتتاحية كإجمالي واحد، فلا يمكن مطابقة شيء ولا تعميره.',
          'منح كل مستخدمي المالية صلاحية المستشار أو المدير لتوفير الوقت أثناء الإعداد، ثم عدم سحبها أبدًا.',
          'إنشاء ضرائب يدويًا في أسبوع التشغيل دون شبكات ضريبية، فيخطئ تقرير الضرائب من الشهر الأول.',
          'تخطّي التشغيل المتوازي لأن الموعد قريب.',
          'معاملة المخزون كمشروع منفصل، مع أن حسابات تقييمه تحرّك الميزانية.'
        ] },
        { p: 'لهذا السبب يقود المحاسبون تنفيذات {lat}Odoo{/lat} لدينا. كل مرحلة مما سبق تنتهي بمطابقة، والمشروع لا ينتهي حتى تتفق الأرقام.' }
      ],
      faq: [
        { q: 'كم يستغرق تنفيذ المحاسبة على {lat}Odoo{/lat}؟', a: 'يعتمد على عدد الشركات والتطبيقات والتكاملات، وعلى جودة البيانات الحالية. خطّط لشهر متوازٍ واحد على الأقل إضافة إلى الإعداد والاختبار.' },
        { q: 'هل تُحمَّل الأرصدة الافتتاحية كإجماليات أم كبنود مفتوحة؟', a: 'حمّل ميزان المراجعة كإجماليات، لكن حمّل فواتير العملاء والموردين المفتوحة كلًّا على حدة، حتى تعمل تقارير الأعمار ومطابقة المدفوعات من اليوم الأول.' },
        { q: 'ما التشغيل المتوازي في تنفيذ أنظمة تخطيط الموارد؟', a: 'فترة تُسجَّل فيها المعاملات في النظامين القديم والجديد ويُقفل كلاهما، حتى تُقارن النتائج وتُكتشف أخطاء الإعداد قبل التشغيل الفعلي.' }
      ]
    },
    {
      slug: 'odoo-inventory-valuation-fifo-avco',
      topic: 'odoo',
      author: 'ahmed',
      date: '2026-09-30',
      title: '{lat}FIFO{/lat} أم متوسط التكلفة في {lat}Odoo{/lat}: اختيار طريقة تقييم تستطيع التعايش معها',
      dek: 'طريقة التكلفة تحدد مجمل الربح الذي يراه مجلس الإدارة كل شهر. اختيارها سهل أثناء الإعداد، وتغييرها لاحقًا مكلف.',
      description: 'FIFO أم متوسط التكلفة في Odoo: أثر كل منهما على تكلفة المبيعات والهامش، وأهمية التقييم الآلي المستمر، والتكاليف الإضافية، ومخاطر تغيير الطريقة خلال السنة.',
      answer: 'اختر {lat}FIFO{/lat} عندما تتحرك أسعار الشراء وتحتاج أن تعكس تكلفة المبيعات الطبقات الفعلية المستهلكة، واختر متوسط التكلفة عندما تكون الأصناف متماثلة وتريد هوامش أكثر سلاسة. وفي {lat}Odoo{/lat} اضبط الطريقة والتقييم الآلي على فئة المنتج قبل بدء المعاملات، لأن تغييرها خلال السنة يعيد تقييم المخزون ويُفقد المقارنات اتساقها.',
      takeaways: [
        '{lat}FIFO{/lat} تتبع طبقات التكلفة الفعلية، ومتوسط التكلفة يلطّف تغيرات الأسعار.',
        'التقييم الآلي يرحّل كل حركة مخزون إلى الدفاتر، فيجب أن تكون حسابات الفئة صحيحة أولًا.',
        'التكاليف الإضافية جزء من تكلفة المخزون، لا من المصروفات.',
        'تغيير الطريقة خلال السنة تغيير في السياسة المحاسبية، لا مجرد إعداد.'
      ],
      body: [
        { p: 'يُضبط تقييم المخزون في {lat}Odoo{/lat} باختيارين على كل فئة منتجات: طريقة التكلفة، ونمط التقييم. ومعًا يحددان قيمة المخزون في الميزانية، وما يذهب إلى تكلفة المبيعات، وبالتالي مجمل الربح الذي يراه مجلس الإدارة كل شهر. والاختياران سهلان أثناء الإعداد، ومكلفان إذا تغيّرا لاحقًا.' },
        { h2: 'ما طرق التكلفة التي يوفرها {lat}Odoo{/lat}؟' },
        { ul: [
          'السعر المعياري: تُقيّم كل وحدة بتكلفة ثابتة تحددها، وتُعالج الفروق عن التكلفة الفعلية بشكل منفصل. مفيد في التصنيع مع نظام تكاليف منضبط، ونادرًا ما يناسب التجارة.',
          'متوسط التكلفة ({lat}AVCO{/lat}): كل استلام يحدّث متوسطًا مرجحًا لتكلفة الصنف، وتُقيّم عمليات الصرف بالمتوسط الحالي.',
          'الوارد أولًا يُصرف أولًا ({lat}FIFO{/lat}): يُحتفظ بالمخزون في طبقات حسب الاستلام، ويستهلك الصرف أقدم الطبقات أولًا، كلٌّ بتكلفتها.'
        ] },
        { p: 'وفق معيار {lat}IAS 2{/lat} والمعيار المصري المبني عليه، تُقبل طريقتا {lat}FIFO{/lat} والمتوسط المرجح، ولا تُقبل طريقة الوارد أخيرًا يُصرف أولًا. وتطبّق السعودية المعايير الدولية بصيغتها المعتمدة محليًا، والنتيجة نفسها. ويشترط المعيار استخدام الطريقة نفسها للمخزون المتشابه في طبيعته واستخدامه.' },
        { h2: 'كيف تؤثر {lat}FIFO{/lat} ومتوسط التكلفة على تكلفة المبيعات والهامش؟' },
        { p: 'حين تستقر أسعار الشراء تتقارب نتائج الطريقتين، وحين تتحرك تتباعد. ففي بيئة أسعار صاعدة تحمّل {lat}FIFO{/lat} تكلفة المبيعات بالطبقات الأقدم والأرخص، فيبدو الهامش أعلى ويُقيّم مخزون آخر المدة قريبًا من الأسعار الحالية. أما متوسط التكلفة فيمزج القديم بالجديد، فيتحرك الهامش بسلاسة أكبر ويتأخر في الاستجابة لتغير الأسعار. ومع عملة متقلبة، كما عاش المستوردون في مصر، قد يكون الفرق بين الطريقتين كبيرًا بما يكفي ليغيّر قراءة الإدارة لربع كامل.' },
        { p: 'ليست إحدى الطريقتين أصح من الأخرى. السؤال هو أيهما تطابق طريقة الشركة في الشراء والبيع. الأصناف المتماثلة التي تُشترى باستمرار يناسبها متوسط التكلفة، والأصناف ذات الدفعات المميزة أو تواريخ الصلاحية أو الهوامش الحساسة للسعر تناسبها {lat}FIFO{/lat} غالبًا. وأيًّا كان اختيارك، فطبّقه باتساق داخل كل فئة من الأصناف المتشابهة.' },
        { h2: 'لماذا التقييم المستمر (الآلي)؟' },
        { p: 'في التقييم اليدوي، أو الدوري، يتتبع {lat}Odoo{/lat} الكميات ويرحّل المحاسب قيمة المخزون بقيد في نهاية الفترة. وفي التقييم الآلي، أو المستمر، يرحّل كل استلام وكل صرف قيده الخاص إلى حسابات تقييم المخزون والمخزون الوارد والمخزون الصادر المعدّة على الفئة. يُبقي التقييم الآلي دفتر الأستاذ وتقرير تقييم المخزون متطابقين يومًا بيوم، وهو ما يجعل التكاليف الإضافية وتكلفة المبيعات الدقيقة لكل فاتورة ممكنة. ويعني أيضًا أن أخطاء الإعداد تصل إلى الدفاتر فورًا، ولذلك يجب أن تكون حسابات الفئة صحيحة قبل أول استلام.' },
        { h2: 'كيف تعمل التكاليف الإضافية؟' },
        { p: 'الشحن والرسوم الجمركية والتأمين ومصاريف التخليص جزء من تكلفة المخزون وفق {lat}IAS 2{/lat}. وفي {lat}Odoo{/lat} توزّع خاصية التكاليف الإضافية هذه المصاريف على الاستلامات المرتبطة بها، بالكمية أو الوزن أو الحجم أو التكلفة الحالية أو بالتساوي، وتضيفها إلى طبقات المخزون. وهي تعمل مع {lat}FIFO{/lat} ومتوسط التكلفة في ظل التقييم الآلي. فإن رُحّلت هذه المصاريف كمصروفات، ارتفعت الهوامش على البضائع المستوردة في شهر البيع بأكثر من حقيقتها وانخفضت في شهر الاستيراد.' },
        { quote: 'طريقة التكلفة سياسة محاسبية. غيّرها كما تغيّر أي سياسة: نادرًا، وعن قصد، وكتابةً.' },
        { h2: 'ما مخاطر تغيير الطريقة خلال السنة؟' },
        { p: 'يسمح {lat}Odoo{/lat} بتغيير طريقة التكلفة على الفئة، ويعيد تقييم المخزون القائم عند التغيير. وتخفي هذه السهولة عدة مخاطر:' },
        { ul: [
          'تغيير معادلة التكلفة تغيير في السياسة المحاسبية وفق {lat}IAS 8{/lat}، يحتاج تبريرًا وإفصاحًا، لا مجرد تعديل في الإعداد.',
          'تفقد المقارنات اتساقها: الأشهر قبل التغيير وبعده لا تُقاس بالطريقة نفسها.',
          'قد يكون قيد إعادة التقييم كبيرًا ويقع في يوم واحد، فيشوّه هامش ذلك الشهر.',
          'الاستلامات والمرتجعات والتكاليف الإضافية المفتوحة التي تعبر تاريخ التغيير يسهل أن تُقيّم خطأ.'
        ] },
        { p: 'وإن كان التغيير ضروريًا فعلًا، فاجعله في نهاية فترة بعد جرد فعلي، ووثّق السبب، وسجّل إعادة التقييم منفصلة، واتفق على النهج مع مراجعك الخارجي مسبقًا.' },
        { h2: 'كيف نُعدّه' },
        { p: 'في تنفيذ {lat}Odoo{/lat} نقرر الطريقة لكل فئة منتجات مع مسؤول المالية، ونُعدّ التقييم الآلي بحسابات مخصصة، ونطابق تقرير تقييم المخزون مع دفتر الأستاذ قبل التشغيل وفي نهاية كل شهر. والمطابقة نفسها من أوائل الفحوص في عملنا للمراجعة الداخلية، لأن انحراف تقييم المخزون نادرًا ما يظهر في أي مكان آخر.' }
      ],
      faq: [
        { q: 'أيهما أفضل في {lat}Odoo{/lat}: {lat}FIFO{/lat} أم متوسط التكلفة؟', a: 'لا أفضلية مطلقة لأي منهما. {lat}FIFO{/lat} تناسب الأصناف ذات الدفعات المميزة أو الهوامش الحساسة للسعر، ومتوسط التكلفة يناسب الأصناف المتماثلة التي تُشترى باستمرار. اختر لكل فئة منتجات وطبّق باتساق.' },
        { q: 'هل يمكن تغيير طريقة التكلفة في {lat}Odoo{/lat} بعد التشغيل؟', a: 'يسمح {lat}Odoo{/lat} بذلك ويعيد تقييم المخزون القائم، لكن تغيير معادلة التكلفة تغيير في السياسة المحاسبية. نفّذه في نهاية فترة، ووثّقه، واتفق عليه مع مراجعك.' },
        { q: 'هل تعمل التكاليف الإضافية مع السعر المعياري في {lat}Odoo{/lat}؟', a: 'لا. تتطلب التكاليف الإضافية في {lat}Odoo{/lat} طريقة {lat}FIFO{/lat} أو متوسط التكلفة مع التقييم الآلي للمخزون.' }
      ]
    },
    {
      slug: 'month-end-close-checklist-odoo',
      topic: 'odoo',
      author: 'ahmed',
      date: '2026-10-03',
      title: 'قائمة إقفال شهري في {lat}Odoo{/lat} يستطيع المراجع أن يوقّع عليها',
      dek: 'أغلب الأدوات موجودة في {lat}Odoo{/lat} بالفعل. ما ينقص عادة هو الترتيب والأدلة والتوقيع.',
      description: 'قائمة عملية للإقفال الشهري في Odoo: التسويات البنكية، وأعمار العملاء والموردين، والمستحقات، وتقييم المخزون، والاستهلاك، والضريبة، والمراجعة، وتواريخ القفل.',
      answer: 'يجب أن يطابق الإقفال الشهري في {lat}Odoo{/lat} كل يومية بنك وخزينة، ويراجع أعمار العملاء والموردين، ويرحّل المستحقات والمؤجلات، ويطابق تقييم المخزون مع الدفاتر، ويرحّل الاستهلاك، ويطابق ضريبة القيمة المضافة، ثم يراجع ميزان المراجعة وتقارير الإدارة، وبعد ذلك فقط يضبط تاريخ القفل حتى لا تتغير الفترة المقفلة إلا بقرار مسجّل.',
      takeaways: [
        'أنهِ الترحيل وإرسال الفواتير الإلكترونية وحركات المخزون قبل بدء الإقفال.',
        'كل تقرير لدفتر مساعد يجب أن يطابق حساب المراقبة الخاص به.',
        'المستحقات يجب أن تنعكس تلقائيًا حتى لا تُحتسب مرتين.',
        'اضبط تاريخ القفل بعد مراجعة مستقلة فقط.'
      ],
      body: [
        { p: 'ينتهي الإقفال حين يستطيع شخص غير من أعدّه أن يراجعه ويوقّع عليه. في {lat}Odoo{/lat} أغلب الخطوات مدمجة: التسوية البنكية، وتقارير الأعمار، واستهلاك الأصول، وتواريخ القفل. ما ينقص عادة هو الترتيب والأدلة والتوقيع. هذه هي القائمة التي نستخدمها، بالترتيب الذي نستخدمها به.' },
        { h2: 'ما الذي يجب أن ينتهي قبل بدء الإقفال؟' },
        { ul: [
          'كل فواتير المبيعات والإشعارات الدائنة للشهر مرحّلة، وفي مصر والسعودية مقبولة لدى {lat}ETA{/lat} أو مُجازة أو مُبلّغ عنها لدى {lat}ZATCA{/lat}.',
          'كل فواتير الموردين المستلمة مرحّلة، والبضائع المستلمة دون فاتورة محددة.',
          'جلسات نقاط البيع مغلقة ومرحّلة.',
          'استلامات المخزون وعمليات صرفه للشهر مُصدَّقة، ولا حركات مسودة مؤرخة داخل الفترة.'
        ] },
        { h2: 'الخطوة الأولى: هل يوميات البنك والخزينة مسوّاة؟' },
        { p: 'كل سطر في كشف البنك للشهر مسوّى في {lat}Odoo{/lat}، والرصيد الختامي للكشف يطابق كشف البنك نفسه. والبنود غير المسوّاة الأقدم من الشهر مدرجة مع تفسير. والخزائن مجرودة ومتفقة مع يومية النقدية. وتُراجع حسابات المقبوضات والمدفوعات المعلّقة، فالبنود المتروكة فيها كثيرًا ما تكون أول علامة على دفعة مكررة أو مرحّلة خطأ.' },
        { h2: 'الخطوة الثانية: ماذا تُظهر أعمار العملاء والموردين؟' },
        { p: 'شغّل تقريري أعمار الذمم المدينة والدائنة، وطابق إجمالييهما مع حسابات المراقبة في ميزان المراجعة. راجع أرصدة العملاء المتأخرة من حيث قابلية التحصيل ومخصص الخسائر الائتمانية المتوقعة، وراجع أرصدة الموردين بحثًا عن أرصدة مدينة وتكرارات وإشعارات دائنة غير مطبقة. ويجب أن تكون دفعات العملاء المقدمة ودفعات الموردين المقدمة في حسابات مستقلة، لا مخصومة داخل الأرصدة.' },
        { h2: 'الخطوة الثالثة: ما المستحقات والمؤجلات المطلوبة؟' },
        { p: 'رحّل مستحقات السلع والخدمات المستلمة التي لم تصل فواتيرها، كالمرافق والأتعاب المهنية ورصيد البضائع المستلمة غير المفوترة. واعترف بالمصروفات المدفوعة مقدمًا والإيرادات المؤجلة بالجزء الذي يخص الشهر. وبحسب الإصدار والنسخة، يستطيع {lat}Odoo{/lat} توليد قيود التأجيل من فواتير الموردين والعملاء، ويمكن ترحيل المستحقات مع عكس تلقائي في أول يوم من الشهر التالي، حتى لا تُحتسب مرتين عند وصول الفاتورة.' },
        { h2: 'الخطوة الرابعة: هل يتفق المخزون مع الدفاتر؟' },
        { p: 'قارن تقرير تقييم المخزون بأرصدة حسابات المخزون. في التقييم الآلي يجب أن يتطابقا تمامًا، وأي فرق يشير إلى قيد يدوي على حساب مخزون أو إلى فئة بحسابات خطأ. راجع الحسابات الوسيطة للمخزون الوارد والصادر بحثًا عن أرصدة كان يجب أن تُصفّى، ورحّل التكاليف الإضافية لواردات الشهر، وسجّل نتائج أي جرد دوري.' },
        { h2: 'الخطوة الخامسة: هل الأصول الثابتة والاستهلاك محدّثة؟' },
        { p: 'تأكد من تسجيل مشتريات الأصول للشهر كأصول، وتسجيل الاستبعادات، وترحيل قيود استهلاك الشهر. وفي نسخة {lat}Odoo Enterprise{/lat} يرحّل تطبيق الأصول قيود الاستهلاك وفق جدولها. ويجب أن يطابق سجل الأصول حسابات التكلفة ومجمع الاستهلاك.' },
        { h2: 'الخطوة السادسة: هل الضريبة وحسابات الميزانية الأخرى مطابقة؟' },
        { ul: [
          'حسابات ضريبة القيمة المضافة تطابق تقرير الضرائب، وأرقام الإقرار تطابق الاثنين.',
          'التزامات الرواتب والتأمينات الاجتماعية وضريبة الاستقطاع تطابق كشوفها المؤيدة.',
          'الأرصدة بين شركات المجموعة متفقة على الجانبين.',
          'أرصدة العملات الأجنبية مُعاد تقييمها بسعر نهاية الشهر حيث تقتضي السياسة ذلك.',
          'الحسابات المعلّقة والوسيطة صفرية أو مفسّرة.'
        ] },
        { h2: 'الخطوة السابعة: من يراجع، ومتى تقفل؟' },
        { p: 'يسلّم المُعدّ ميزان المراجعة والمطابقات وملاحظة قصيرة بالحركات غير المعتادة. ويقارن المراجع قائمة الدخل بالموازنة وبالأشهر السابقة، ويسأل عن الحركات الكبيرة، ويقرأ القيود اليدوية المرحّلة في الأيام الأخيرة من الشهر. وبعد المراجعة فقط تُضبط تواريخ القفل في {lat}Odoo{/lat}، حتى لا يُرحّل شيء في الفترة المقفلة إلا بتغيير متعمد ومسجّل من شخص مخوّل.' },
        { quote: 'الإقفال بلا تاريخ قفل مجرد مسودة.' },
        { p: 'كثير من الملّاك الذين ندعمهم عبر خدمة المدير المالي الافتراضي يبدؤون بإقفال يستغرق أسابيع وينتهي دون مراجعة. والقائمة أعلاه، إذا نُفّذت باتساق، تختصر نفسها بنفسها: كل شهر يبدأ من أرصدة مطابقة بدل الأسئلة المفتوحة من الشهر الماضي.' }
      ],
      faq: [
        { q: 'كيف أقفل فترة في {lat}Odoo{/lat}؟', a: 'اضبط تواريخ القفل في إعدادات المحاسبة في {lat}Odoo{/lat} بعد مراجعة الفترة، وقيّد من يستطيع تغييرها، حتى تكون إعادة فتح فترة مقفلة قرارًا متعمدًا يمكن تتبعه.' },
        { q: 'كم يجب أن يستغرق الإقفال الشهري؟', a: 'يعتمد على حجم المعاملات وعدد الشركات ومقدار ما يُطابق خلال الشهر. الهدف جدول زمني متوقع تدخل فيه المراجعة، لا أقصر إقفال ممكن.' },
        { q: 'لماذا لا يطابق تقرير تقييم المخزون حساب المخزون؟', a: 'غالبًا بسبب قيد يومية يدوي على حساب مخزون، أو فئة منتجات معدّة بحسابات تقييم خطأ. وفي التقييم الآلي يجب أن يتطابقا تمامًا.' }
      ]
    }
  ]
};
