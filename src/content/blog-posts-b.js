// Blog batch B: six posts on internal audit, controls, Odoo reconciliation, Virtual CFO and cash forecasting.
// Same rules as blog.en.js / blog.ar.js: founder's voice, no client figures, no long dashes, {lat} in Arabic.

module.exports = {
  en: [
    {
      slug: 'what-is-internal-audit',
      topic: 'audit',
      author: 'ahmed',
      date: '2026-09-20',
      title: 'What is internal audit, and what does a mid-sized company actually get from it?',
      dek: 'Internal audit is not a smaller external audit. It answers a different question, for a different reader, on a different timetable.',
      description: 'What internal audit is, how it differs from external audit, how the IIA frames it, and what a small or mid-sized company should expect to receive from it.',
      answer: 'Internal audit is an independent, objective function that tests whether a company’s risk management, controls and governance actually work, and reports findings and recommendations to the board or owners. Unlike an external audit, which gives an opinion on the annual financial statements for outside users, internal audit works for the organisation throughout the year and looks forward.',
      takeaways: [
        'External audit gives an opinion on the financial statements; internal audit tests whether the controls behind them work.',
        'Independence comes from the reporting line: internal audit reports to the board or owners, not to the people it reviews.',
        'A useful engagement starts from a risk assessment, not a fixed checklist.',
        'Every finding should name an owner, a deadline and how the fix will be verified.'
      ],
      body: [
        { p: 'Most owners first meet the word audit through their external auditor: a firm that arrives after year-end, asks for confirmations and schedules, and signs an opinion on the financial statements. So when someone proposes internal audit, the natural assumption is that it is the same exercise, done more often, by someone closer to home. It is not, and the difference decides whether the money spent on it returns anything.' },
        { h2: 'What is internal audit?' },
        { p: 'The Institute of Internal Auditors, which sets the global standards for the profession, describes internal auditing as independent and objective assurance and advice that helps an organisation protect and create value. In practice that means a systematic, disciplined look at three things: how the business identifies and manages risk, whether its controls work as designed, and whether governance gives the board and owners an accurate picture. The output is not an opinion on the numbers. It is a set of findings and recommendations about the system that produces them.' },
        { h2: 'How is it different from an external audit?' },
        { ul: [
          'Purpose: the external auditor expresses an opinion on whether the financial statements are fairly presented; internal audit evaluates whether risk, control and governance processes are effective.',
          'Audience: the external opinion is for shareholders, lenders, tax authorities and other outside users; internal audit reports to the board, the audit committee or the owners.',
          'Timing: the external audit looks back at a closed year; internal audit works through the year and looks at what is happening now and what could go wrong next.',
          'Scope: the external auditor is bound by the financial statements; internal audit can review procurement, inventory, payroll, system access, compliance, or anything the risk assessment points to.',
          'Standards: external auditors work under the International Standards on Auditing; internal auditors follow the IIA’s Global Internal Audit Standards.'
        ] },
        { p: 'The two are complementary. A good internal audit function gives the external auditor a stronger control environment to rely on and a documented evidence trail, which usually shortens the year-end work. It does not replace the external audit, and it should never be sold as if it does.' },
        { h2: 'Where does independence come from?' },
        { p: 'An internal auditor who reports to the finance manager cannot credibly report on the finance manager’s controls. Independence is a matter of reporting line: the function, whether in-house or outsourced, reports its findings to the board, an audit committee, or in an owner-managed company directly to the owners. Management responds to the findings and owns the fixes. The auditor does not design the controls it later tests, and does not run the processes it reviews.' },
        { h2: 'What does a small or mid-sized company actually get?' },
        { p: 'A company without an audit committee or a dedicated team does not need a large department. It needs a structured programme sized to its risks. When MFT runs internal audit for an owner-managed business, the engagement usually delivers the following.' },
        { ul: [
          'A risk assessment that ranks the business processes by what could go wrong and how much it would matter, so the work starts where the exposure is.',
          'An annual audit plan agreed with the owners, covering the high-risk processes first: typically purchasing and payments, sales and receivables, inventory, payroll and system access.',
          'Testing of the controls in those processes, including segregation of duties, approval limits, reconciliations and the audit trail in the ERP.',
          'A written report per review, with each finding tied to its evidence, the risk, the root cause, a recommendation, an owner and a target date.',
          'Follow-up: a later check that the agreed actions were implemented and actually work, not only that someone said they were done.'
        ] },
        { h2: 'What makes a finding useful?' },
        { p: 'A finding that says “controls over payments should be strengthened” is not a finding. A useful one states what was tested, what was found, why it matters, and what would fix it. For example: vendor bank details can be changed by the same user who releases payments, and nobody reviews the changes, so a fraudulent change could go unnoticed; restrict the change to a separate role and review a change log monthly. An anomaly is reported as an anomaly, with its evidence. Whether it is an error, a weakness or something worse is established by investigation, not assumed in the report.' },
        { quote: 'External audit tells you whether last year’s numbers were fair. Internal audit tells you whether next year’s will be.' },
        { h2: 'When is the right time to start?' },
        { p: 'The usual triggers are growth that has outpaced the finance team, a new ERP going live, a second branch or a second country, preparing for investors or a bank facility, or an owner who no longer sees every payment personally. Each of these moves decisions away from the people who used to check them by eye. Internal audit puts a structured check in place of that personal oversight, before a surprise forces the question.' }
      ],
      faq: [
        { q: 'Is internal audit mandatory for private companies?', a: 'Generally not, although requirements depend on the country, the sector and whether the company is listed or regulated, so check what applies to you. Most private companies adopt internal audit voluntarily because owners, lenders or investors want assurance over controls.' },
        { q: 'Can internal audit be outsourced?', a: 'Yes. Many small and mid-sized companies outsource or co-source internal audit to a specialist firm. Independence still depends on the reporting line: the provider reports to the board or owners, and management remains responsible for the controls.' },
        { q: 'How often should internal audit report?', a: 'Most programmes report after each review and give the board or owners a periodic summary, often quarterly, of findings and the status of agreed actions. The frequency should follow the risk assessment rather than a fixed calendar.' }
      ]
    },
    {
      slug: 'segregation-of-duties-odoo',
      topic: 'audit',
      author: 'ahmed',
      date: '2026-09-22',
      title: 'Segregation of duties in Odoo: who should never hold both keys',
      dek: 'The conflicting pairs every finance process has, how to separate them with Odoo access groups and approvals, and what to do when the team is too small to split them.',
      description: 'Segregation of duties explained: the classic conflicting pairs, enforcing them with Odoo access groups and approvals, and compensating controls for small teams.',
      answer: 'Segregation of duties means no single person controls every stage of a transaction: authorising it, recording it, holding the asset and reconciling the result. In Odoo it is enforced by assigning users to access groups that separate incompatible tasks and by adding approval steps. Where the team is too small, independent review of changes and reconciliations compensates.',
      takeaways: [
        'Separate four functions: authorising, recording, custody of assets and reconciliation.',
        'Map the conflicts by process before assigning Odoo access groups, not after.',
        'Approvals and lock dates add control where roles cannot be split.',
        'Small teams compensate with independent, documented review of changes and reconciliations.'
      ],
      body: [
        { p: 'In our reviews, the control weaknesses that matter most are rarely sophisticated. They come down to one person being able to do two things that should have been done by two people: add a supplier and pay it, or receive cash and record the receipt. Segregation of duties is one of the oldest internal controls there is, and in an ERP it is also one of the easiest to undo with a single change in the user settings.' },
        { h2: 'What is segregation of duties?' },
        { p: 'The principle is that no single person should control every stage of a transaction. Control frameworks split a transaction into four functions: authorising it, recording it, having custody of the asset involved, and reconciling the records to reality. When one person holds two of those functions, they can both create an error and hide it. The aim is not distrust of any individual. It is a design in which a mistake, or a deliberate misstatement, has to pass through a second pair of hands.' },
        { h2: 'Which pairs of duties conflict?' },
        { ul: [
          'Creating or changing a vendor, including its bank account, and approving or releasing payments to vendors.',
          'Raising a purchase order and receiving the goods against it, or approving the vendor bill for the same order.',
          'Creating customers and setting credit limits, and approving sales on credit or issuing credit notes.',
          'Receiving cash or customer payments, and posting the receipts or reconciling the bank account.',
          'Posting manual journal entries, and approving them or changing the lock dates that protect closed periods.',
          'Administering user access in the system, and processing financial transactions in it.',
          'Adjusting inventory quantities, and counting or valuing the same stock.'
        ] },
        { h2: 'How do you implement it in Odoo?' },
        { p: 'Odoo controls what a user can do through access groups assigned per application. In Accounting the levels run from invoicing-only access up to full accounting and administrator rights; Purchase, Sales and Inventory each have their own user and administrator levels. The exact group names and what each one allows vary by version and edition, which is why we confirm the version before we design the matrix. The practical sequence is the same on every implementation.' },
        { ul: [
          'Start from the process, not the system: list who does what in purchasing, sales, treasury, inventory and the close, and mark the conflicting pairs.',
          'Translate the result into a role matrix, then into Odoo access groups, giving each user the lowest level that lets them do their job.',
          'Add approval steps where one role must check another: Purchase offers a two-step order approval above an amount you set, and further approvals on payments or entries can be added with Odoo’s approval features, depending on edition.',
          'Protect closed periods with lock dates, and restrict who can change them.',
          'Remove administrator rights from anyone who processes transactions, and keep a separate, rarely used administrator account.',
          'Review the user list and group assignments at least quarterly; access drifts every time someone covers for a colleague on leave.'
        ] },
        { p: 'This is part of how MFT designs an Odoo implementation: the access matrix is signed off by the finance lead before users are created, so the system starts with the separation built in instead of having it retrofitted after the first audit.' },
        { h2: 'What if the team is too small to split duties?' },
        { p: 'A finance team of two cannot separate seven pairs of duties. That does not make the principle irrelevant. It means compensating controls: checks performed by someone outside the transaction, usually the owner or general manager, that would detect what segregation would have prevented.' },
        { ul: [
          'The owner approves every new vendor and every change to vendor bank details, from a report of changes to vendor records.',
          'Bank statements reach the owner directly, and the owner reviews and signs the monthly reconciliation.',
          'A monthly list of manual journal entries, credit notes and inventory adjustments is reviewed by someone who did not post them.',
          'Payments above a set amount need a second approver, even if that person sits outside finance.'
        ] },
        { quote: 'Segregation of duties is not about trusting people less. It is about not asking anyone to be the only control.' },
        { h2: 'How do you know it is working?' },
        { p: 'Test it. Export the users and their groups from Odoo and compare them with the approved matrix. Select vendor changes and check who made them and who approved them. Look for anyone who posted and approved the same entry. An internal audit review of access is short when the design is sound, and it is the only way to know the design survived the last year of staff changes.' }
      ],
      faq: [
        { q: 'What is an example of segregation of duties?', a: 'A common example is that the person who creates a vendor or changes its bank details is not the person who approves or releases payments to that vendor. Another is that the person who receives customer cash does not reconcile the bank account.' },
        { q: 'Can Odoo enforce segregation of duties?', a: 'Yes, mainly through access groups per application, approval steps such as purchase order approval above a set amount, and lock dates on closed periods. The available groups and approval features vary by version and edition, so the design should be checked against your installation.' },
        { q: 'What are compensating controls?', a: 'They are checks performed by someone independent of the transaction, such as an owner reviewing bank reconciliations or vendor changes, that detect what segregation of duties would otherwise have prevented. They are used when the team is too small to separate conflicting duties.' }
      ]
    },
    {
      slug: 'three-way-match-purchase-controls',
      topic: 'audit',
      author: 'ahmed',
      date: '2026-09-24',
      title: 'Three-way match: the purchase control that stops paying for what never arrived',
      dek: 'Purchase order, receipt and vendor bill should agree before money leaves. How the match works, where tolerances belong, and how Odoo handles the exceptions.',
      description: 'How a three-way match of purchase order, receipt and vendor bill works, how to set tolerances, and how Odoo bill control handles partial deliveries and returns.',
      answer: 'A three-way match compares the purchase order, the goods receipt and the vendor bill before a payment is approved. Quantities and prices on the bill must agree with what was ordered and what was actually received, within agreed tolerances. Differences are held for review instead of being paid, so the company pays only for goods it ordered and received.',
      takeaways: [
        'Match three documents: what was ordered, what was received, and what was billed.',
        'Tolerances must be written, small, and approved by someone outside purchasing.',
        'In Odoo, billing on received quantities ties each bill to a validated receipt.',
        'Partial deliveries, returns and price changes are where the control is really tested.'
      ],
      body: [
        { p: 'Ask a finance team how it knows a vendor bill is right and the usual answer is that purchasing confirmed it. That is a two-way check at best: the bill agrees with what someone remembers ordering. The three-way match adds the piece that matters most, evidence that the goods or services actually arrived, and it does so before the payment rather than after.' },
        { h2: 'What is a three-way match?' },
        { p: 'Three documents are compared line by line before a bill is approved for payment:' },
        { ul: [
          'The purchase order: what the company authorised, at what price, from which vendor.',
          'The goods receipt: what the warehouse or the requester confirms was physically received, and in what quantity.',
          'The vendor bill: what the supplier is asking to be paid for.'
        ] },
        { p: 'If the bill agrees with the order on price and with the receipt on quantity, it can proceed. If it does not, the difference is held and investigated. A two-way match, order against bill, is common for services where there is no physical receipt; even then, a confirmation from the requester that the service was delivered plays the part of the receipt.' },
        { h2: 'What tolerances are reasonable?' },
        { p: 'Exact agreement on every line is rarely practical: rounding, freight, small currency differences and agreed price adjustments all create noise. A tolerance is the difference the company accepts without investigation. There is no standard figure. It should reflect the value of typical purchases and the company’s materiality, and it should be:' },
        { ul: [
          'Written in the purchasing policy, separately for quantity and for price.',
          'Small enough that repeated differences cannot add up to something material over a year.',
          'Approved by finance, not set by the purchasing team whose bills it applies to.',
          'Reviewed: a monthly list of bills accepted within tolerance shows whether one vendor is consistently using the full allowance.'
        ] },
        { h2: 'How does Odoo support it?' },
        { p: 'Odoo links the three documents natively. A vendor bill can be created from the purchase order, and each bill line keeps a reference to its order line. The product’s bill control setting decides what can be billed: on ordered quantities, the bill can be raised as soon as the order is confirmed; on received quantities, only what has been validated on a receipt can be billed. For stocked goods we set received quantities as the default, which turns the receipt into a hard condition rather than a reminder.' },
        { p: 'Depending on the version, the Purchase settings also include a three-way matching option that marks each bill according to whether it should be paid, based on the order and the receipts. Price tolerances are not a standard setting, so where a client needs one we enforce the rule through the approval workflow or a small, documented customisation, and confirm the behaviour on the client’s version during testing.' },
        { h2: 'What about partial deliveries, returns and price changes?' },
        { ul: [
          'Partial deliveries: with billing on received quantities, the vendor can only be billed for what arrived; the balance stays open on the order until the rest is received or the line is closed.',
          'Returns: a return to the vendor reduces the received quantity, so goods already billed need a vendor credit note, and the return is not closed until that credit note is matched.',
          'Over-deliveries: goods received above the ordered quantity are approved as a change to the order, or returned, before they are billed.',
          'Price variance: a bill above the order price is either corrected by the vendor or approved as an order change by someone with authority; it is not quietly accepted by the clerk entering the bill.',
          'Services and expenses without a receipt: a requester confirmation, recorded against the order, takes the place of the receipt.'
        ] },
        { p: 'Where inventory is valued automatically, the match also reaches the balance sheet. The receipt values the stock at the order price, and a bill at a different price creates a difference that has to be treated according to the costing method. Leaving those differences unreviewed is how inventory valuation drifts away from what was actually paid.' },
        { quote: 'A bill without a receipt is a request for payment. A bill with one is evidence.' },
        { h2: 'How do you test the control?' },
        { p: 'In an MFT internal audit review we take the bills paid in a period and check, for a risk-based selection, that each one traces to an approved order and a validated receipt, and that differences outside tolerance were approved by someone with authority. We also look for the workarounds: bills recorded without an order, orders created after the bill date, and receipts validated by the person who approved the order. Each is a place where the control was bypassed, and each is visible in the ledger.' }
      ],
      faq: [
        { q: 'What is the difference between a two-way and a three-way match?', a: 'A two-way match compares the purchase order with the vendor bill. A three-way match adds the goods receipt, so the company confirms that what is billed was actually received before it pays.' },
        { q: 'Does Odoo support three-way matching?', a: 'Yes. Odoo links vendor bills to purchase order lines, and setting a product’s bill control to received quantities limits billing to what has been received. Some versions also offer a three-way matching option in the Purchase settings, so confirm the behaviour on your version.' },
        { q: 'What tolerance should a three-way match allow?', a: 'There is no standard figure. The tolerance should be small, written in the purchasing policy separately for quantity and price, approved by finance, and reviewed so that repeated differences cannot add up to a material amount.' }
      ]
    },
    {
      slug: 'bank-reconciliation-controls',
      topic: 'odoo',
      author: 'ahmed',
      date: '2026-09-26',
      title: 'Bank reconciliation is a control, not a chore',
      dek: 'Done often and reviewed by someone else, the bank reconciliation is the cheapest error and fraud detection a company has. Done late by the person who pays, it is decoration.',
      description: 'Bank reconciliation as an internal control: how often to reconcile, reconciling items, unexplained differences, Odoo reconciliation models, and who reviews.',
      answer: 'A bank reconciliation is a control because it proves that every movement on the bank statement is recorded in the ledger and every recorded payment actually went through the bank. To work as a control it is done at least monthly, with reconciling items explained and aged, no unexplained difference carried forward, and review by someone who makes no payments.',
      takeaways: [
        'Reconcile every account at least monthly, and active accounts weekly.',
        'Every reconciling item needs an explanation, an owner and an age.',
        'An unexplained difference is a finding, not a balancing figure.',
        'The reviewer must not be the person who creates or releases payments.'
      ],
      body: [
        { p: 'In many companies the bank reconciliation is the last task of the close, done quickly by whoever has time, with a small difference posted to a suspense account so that the numbers agree. That is the reconciliation as a chore. Treated as a control, the same exercise is the most direct evidence a company has that its cash records are complete and real.' },
        { h2: 'Why is bank reconciliation a control?' },
        { p: 'The bank statement is evidence produced by a third party. Comparing it with the ledger tests two things at once: that every movement on the statement is recorded, which catches unrecorded payments, charges and receipts; and that every payment and receipt in the ledger actually went through the bank, which catches entries that never happened. Few other controls give independent evidence so cheaply.' },
        { h2: 'How often should you reconcile?' },
        { p: 'At least monthly, for every bank account, including dormant accounts and accounts in foreign currency. For operating accounts with frequent movements, weekly is better, and where statements arrive in Odoo every day, daily matching is realistic. The reason is practical: an error found within a week is easy to trace, because the people involved remember the transaction. One found three months later is an investigation.' },
        { h2: 'What counts as a reconciling item?' },
        { p: 'A reconciling item is a legitimate timing difference between the bank and the books, with a known cause and an expected clearing date:' },
        { ul: [
          'Outstanding payments: cheques issued or transfers recorded but not yet cleared by the bank.',
          'Deposits in transit: receipts recorded in the books but not yet credited on the statement.',
          'Bank charges, interest and fees on the statement that have not yet been recorded.',
          'Errors by the bank or in the ledger that have been identified and are being corrected.'
        ] },
        { p: 'Each item should have a description, an owner and an age. Items older than a period set in the close procedure, for example thirty days, are escalated: a cheque that has not cleared for months may be lost, cancelled or misused, and a deposit that never arrives is a receivable, not cash.' },
        { h2: 'What do you do with an unexplained difference?' },
        { p: 'Nothing that makes it disappear. An unexplained difference means the reconciliation is not finished, however small the amount. Posting it to a suspense or rounding account hides the very thing the control exists to find, and a small difference can be the visible part of a larger pattern. The difference stays open, is investigated, and is reported to the reviewer with what has been done so far.' },
        { quote: 'A reconciliation that always balances on the last day, with a small adjustment, has not been reconciled. It has been closed.' },
        { h2: 'How does Odoo help?' },
        { p: 'Odoo imports bank statements from files or, depending on the edition and the bank, through a direct bank feed, and presents each statement line for matching against open invoices, bills and payments. Reconciliation models automate the routine: a rule can match lines to open invoices by reference or partner, or propose a counterpart entry for recurring items such as bank charges, and it can either suggest the match or apply it automatically. Automation belongs only on items that are genuinely routine, and the rules themselves need review, because a badly written model reconciles the wrong things silently.' },
        { p: 'Lock dates matter here too. Once a period is reconciled and reviewed, locking it prevents back-dated entries from changing a balance that has already been agreed to the bank. When MFT runs an Odoo implementation, the statement import, the reconciliation models and the lock-date procedure are configured and tested with the finance team before the first close.' },
        { h2: 'Who should review it?' },
        { p: 'Someone who does not create or release payments, and who is senior enough to ask questions. In a small company that is usually the owner or general manager. The review is evidenced: the reviewer agrees the closing balance to the statement, reads the list of reconciling items and their ages, asks about anything old or unusual, and signs and dates the reconciliation. Without that step, the reconciliation tells the company only what the preparer chose to show.' }
      ],
      faq: [
        { q: 'How often should bank accounts be reconciled?', a: 'At least monthly for every account, including dormant and foreign currency accounts. Active operating accounts benefit from weekly or even daily matching, because recent differences are much easier to trace.' },
        { q: 'What are reconciliation models in Odoo?', a: 'They are rules that help match bank statement lines, for example to open invoices by reference or partner, or that propose a counterpart entry for recurring items such as bank charges. They can suggest a match for review or apply it automatically, so they should be configured and reviewed with care.' },
        { q: 'Who should review the bank reconciliation?', a: 'Someone who does not create or release payments, often the owner, general manager or finance manager. The reviewer agrees the balances, questions old or unusual reconciling items, and signs and dates the reconciliation.' }
      ]
    },
    {
      slug: 'virtual-cfo-vs-full-time-cfo',
      topic: 'audit',
      author: 'ahmed',
      date: '2026-09-28',
      title: 'Virtual CFO or full-time CFO: how to tell which one you need',
      dek: 'The first question is not budget. It is how much senior finance judgement the business needs each week, and how much of the work is building rather than running.',
      description: 'When a Virtual CFO makes sense and when to hire a full-time CFO: the scope, cadence and deliverables to expect, and the red flags to watch for in either model.',
      answer: 'A Virtual CFO makes sense when a company needs senior finance judgement on planning, cash, reporting and controls, but not every day, typically a growing or owner-managed business with a bookkeeper or small team. A full-time CFO is the better choice when significant finance decisions arise daily, the team needs an on-site leader, or investors and lenders expect one.',
      takeaways: [
        'Decide on the amount of senior judgement needed, not the job title.',
        'A Virtual CFO works on a fixed cadence with defined deliverables.',
        'Daily decisions, a larger team or investor requirements point to a full-time hire.',
        'Neither model works without reliable books and a disciplined close.'
      ],
      body: [
        { p: 'Owners usually ask this question when something has started to slip: the bank asks for a forecast nobody can produce, a new branch opens without a budget, or the monthly numbers arrive too late to change anything. The instinct is to hire a CFO. Sometimes that is right. Often what the business needs first is a CFO’s judgement for a few days a month, applied to a finance function that is not yet ready for a full-time leader.' },
        { h2: 'What does a Virtual CFO actually do?' },
        { p: 'A Virtual CFO is a senior finance professional, or a small team, who performs the CFO role part-time and usually remotely, under an engagement with a defined scope. The work sits above bookkeeping and below the board: turning the ledger into decisions. A typical scope includes:' },
        { ul: [
          'A monthly management pack: profit and loss, balance sheet, cash flow and the few KPIs the owners actually manage by, with commentary on what moved and why.',
          'Cash management: a rolling cash forecast, a working capital review and early warning of tight weeks or covenant pressure.',
          'Budgeting and forecasting, and the variance review that keeps a budget useful after the first month.',
          'Close discipline: a calendar, reconciliations and review, so the numbers are reliable and on time.',
          'Controls and governance: approval limits, segregation of duties and the reporting the owners or board need.',
          'Support on decisions and with counterparties: pricing, investment cases, banks, investors and auditors.'
        ] },
        { h2: 'What cadence should you expect?' },
        { p: 'The engagement runs on a rhythm, not on request. A common pattern is a weekly cash check, a monthly close review and management meeting, and a quarterly session on the forecast, the budget and the risks ahead. Between those points the Virtual CFO is reachable for decisions that cannot wait. If the arrangement is only activated when something goes wrong, it is advisory work, not a CFO function.' },
        { h2: 'When does a Virtual CFO make sense?' },
        { ul: [
          'The company has a bookkeeper or a small accounting team that records transactions well, but nobody who interprets them for the owners.',
          'Finance decisions of consequence come up monthly, not daily.',
          'The business is preparing for something specific, such as a bank facility, a new market or an ERP change, and needs senior input for a defined period.',
          'The owners want the discipline of monthly reporting and forecasting before committing to a permanent senior hire.'
        ] },
        { h2: 'When should you hire a full-time CFO?' },
        { ul: [
          'Significant finance decisions arise every day: pricing, treasury, contracts, credit.',
          'The finance team has grown to the point where it needs a leader on site to direct, train and review its work.',
          'The company is raising capital, managing several entities or preparing for a listing, and investors or lenders expect a dedicated executive.',
          'The role needs to sit permanently in the leadership team and own outcomes beyond finance.'
        ] },
        { p: 'The two are not exclusive. Many companies use a Virtual CFO to build the reporting, the forecast and the controls, then hire a full-time CFO into a function that already works, with the Virtual CFO helping to define the role and hand over.' },
        { quote: 'A CFO is not a job title. It is a quantity of judgement per week. Buy the quantity you need.' },
        { h2: 'What are the red flags?' },
        { ul: [
          'No defined deliverables: if the engagement letter does not list what arrives each month, nothing reliably will.',
          'Reports built outside the ledger: spreadsheets that cannot be traced back to the accounting system are opinions, not management information.',
          'A Virtual CFO who also posts the entries and approves the payments, which removes the independent review the role should provide.',
          'Forecasts without variance review: a forecast nobody compares with actuals is a document, not a tool.',
          'On the hiring side, recruiting a CFO before the books are reliable, which turns a strategic hire into a clean-up project.'
        ] },
        { p: 'At MFT the Virtual CFO service starts with the ledger: the books are reviewed and the close is stabilised before the first management pack is issued, because every decision in the role depends on numbers the owners can trust.' }
      ],
      faq: [
        { q: 'What is a Virtual CFO?', a: 'A Virtual CFO is a senior finance professional or team who performs the CFO role part-time and usually remotely, under an engagement with a defined scope, cadence and deliverables.' },
        { q: 'Is a Virtual CFO the same as an outsourced accountant?', a: 'No. An outsourced accountant records transactions and prepares the books and filings. A Virtual CFO interprets those numbers, runs forecasting and management reporting, strengthens controls and supports the owners’ decisions.' },
        { q: 'When should a company hire a full-time CFO?', a: 'Usually when significant finance decisions arise daily, the finance team needs an on-site leader, or investors and lenders expect a dedicated finance executive. Many companies make the hire after a Virtual CFO has built reliable reporting and controls.' }
      ]
    },
    {
      slug: 'thirteen-week-cash-flow-forecast',
      topic: 'audit',
      author: 'ahmed',
      date: '2026-09-30',
      title: 'How to build a 13-week cash flow forecast from your ledger',
      dek: 'Thirteen weeks is long enough to see a problem coming and short enough to forecast from real invoices. A practical method using the direct approach and a weekly roll.',
      description: 'How to build a 13-week cash flow forecast from the ledger with the direct method: receipts, payments, a weekly roll-forward and variance review against actuals.',
      answer: 'A 13-week cash flow forecast projects cash receipts and payments week by week for the next quarter using the direct method. It starts from the reconciled bank balance, builds receipts from open receivables and expected sales, and payments from payables, payroll, tax and debt service. It is rolled forward every week and compared with actual results.',
      takeaways: [
        'Start from the reconciled bank balance, not from profit.',
        'Use the direct method: actual receipts and payments, week by week.',
        'Roll the forecast every week, dropping the past week and adding a new one.',
        'Compare forecast with actual weekly; the variances show where the assumptions are wrong.'
      ],
      body: [
        { p: 'Profit and cash rarely move together in the short term. A profitable month can end with less cash than it began, because customers paid late, stock was bought ahead of a season, or a tax payment fell due. The 13-week cash flow forecast exists to answer one question the profit and loss account cannot: will we have enough cash in each of the next thirteen weeks, and if not, in which week does the problem start?' },
        { h2: 'Why thirteen weeks?' },
        { p: 'Thirteen weeks is a quarter. It is long enough to see a shortfall coming while there is still time to act, by chasing collections, rescheduling payments or drawing on a facility, and short enough that most of the numbers come from documents that already exist: open invoices, open bills, purchase orders, payroll and loan schedules. Beyond a quarter a forecast leans more on assumptions; within it, it can be built largely from the ledger.' },
        { h2: 'What is the direct method?' },
        { p: 'The direct method forecasts actual cash in and cash out by category, rather than starting from profit and adjusting for non-cash items as the indirect method does. For a short-term forecast it is the right choice, because the people managing cash think in receipts and payments, and because each line can be traced to its source and checked against what actually happened.' },
        { h2: 'How do you build it from the ledger?' },
        { ul: [
          'Opening balance: the bank balances reconciled to the statements, for every account the company can actually use.',
          'Customer receipts: open receivables from the aged balance, each placed in the week it is realistically expected to be paid, based on that customer’s actual payment behaviour rather than the contractual due date.',
          'New sales: expected collections from sales not yet invoiced, from confirmed orders or the pipeline, kept on a separate line so their uncertainty stays visible.',
          'Supplier payments: open payables and committed purchase orders, scheduled by agreed terms and the company’s payment runs.',
          'Payroll and recurring costs: salaries, rent, utilities and subscriptions, in the weeks they actually leave the account.',
          'Tax and statutory payments: VAT, withholding, social insurance and other obligations, on their filing calendar.',
          'Financing: loan repayments, interest, facility drawdowns and any owner funding or distributions.',
          'Closing balance per week, compared with the minimum cash the business needs to operate safely.'
        ] },
        { p: 'In Odoo most of these inputs already exist: the aged receivable and payable reports, open purchase orders, and journal items with due dates. The forecast itself usually lives in a spreadsheet or a planning tool fed from those reports, but every line should trace to the ledger or to a named, written assumption.' },
        { h2: 'How does the weekly roll work?' },
        { p: 'Every week the past week drops off and a new thirteenth week is added. The opening balance is replaced by the actual reconciled balance, open items are refreshed from the ledger, and the assumptions for the remaining weeks are revisited. The roll should take hours, not days. If it takes longer, the inputs are not coming cleanly from the system.' },
        { h2: 'Why does variance review matter?' },
        { p: 'A forecast is only as good as the last time it was checked. Each week, compare what was forecast for the week just ended with what actually happened, line by line. Large variances have an explanation: a customer who pays later than assumed, a supplier paid early, a cost nobody listed. Fix the assumption, not just the number. Over several weeks this review is what turns a spreadsheet into a reliable tool, and it shows the owners which parts of the forecast deserve confidence.' },
        { quote: 'The point of a cash forecast is not to be right. It is to be wrong early enough to do something about it.' },
        { h2: 'Who should own it?' },
        { p: 'The forecast belongs to finance, but its inputs come from sales, purchasing and operations, and the decisions it prompts belong to the owners or management. In the companies where MFT acts as Virtual CFO, the 13-week forecast is reviewed in a short weekly cash meeting: the closing balance per week, the lowest point in the quarter, the variances from last week, and the actions agreed to protect the tight weeks.' }
      ],
      faq: [
        { q: 'What is a 13-week cash flow forecast?', a: 'It is a week-by-week projection of cash receipts and payments over the next thirteen weeks, built with the direct method and updated every week. It shows the expected cash balance at the end of each week and highlights when a shortfall could occur.' },
        { q: 'Should a 13-week forecast use the direct or the indirect method?', a: 'The direct method is usually preferred, because it projects actual receipts and payments that can be traced to invoices, bills and schedules. The indirect method, which starts from profit, suits longer-term planning better.' },
        { q: 'How often should a 13-week cash flow forecast be updated?', a: 'Weekly. Each week the past week is replaced with actuals, a new week is added at the end, and the forecast is compared with actual results to improve the assumptions.' }
      ]
    }
  ],
  ar: [
    {
      slug: 'what-is-internal-audit',
      topic: 'audit',
      author: 'ahmed',
      date: '2026-09-20',
      title: 'ما المراجعة الداخلية، وماذا تحصل عليه الشركة المتوسطة منها فعلًا؟',
      dek: 'المراجعة الداخلية ليست مراجعة خارجية مصغّرة. إنها تجيب عن سؤال مختلف، لقارئ مختلف، وفق جدول زمني مختلف.',
      description: 'ما المراجعة الداخلية، وكيف تختلف عن المراجعة الخارجية، وكيف يصوغها معهد المراجعين الداخليين IIA، وما الذي تتوقعه منها الشركة الصغيرة أو المتوسطة فعلًا.',
      answer: 'المراجعة الداخلية وظيفة مستقلة وموضوعية تختبر هل تعمل إدارة المخاطر والرقابة والحوكمة في الشركة فعلًا، وترفع ملاحظاتها وتوصياتها إلى مجلس الإدارة أو الملّاك. وعلى خلاف المراجعة الخارجية التي تُبدي رأيًا في القوائم المالية السنوية لمستخدمين من خارج الشركة، تعمل المراجعة الداخلية لصالح المنشأة طوال السنة وتنظر إلى الأمام.',
      takeaways: [
        'المراجعة الخارجية تُبدي رأيًا في القوائم المالية؛ والمراجعة الداخلية تختبر هل تعمل الضوابط التي تقف خلفها.',
        'الاستقلال يأتي من خط التقرير: ترفع المراجعة الداخلية تقاريرها إلى المجلس أو الملّاك، لا إلى من تراجع أعمالهم.',
        'التكليف المفيد يبدأ من تقييم للمخاطر، لا من قائمة فحص ثابتة.',
        'كل ملاحظة يجب أن تحدد مسؤولًا وموعدًا وطريقة للتحقق من الإصلاح.'
      ],
      body: [
        { p: 'يتعرّف أغلب الملّاك على كلمة «مراجعة» أول مرة من خلال مراجعهم الخارجي: مكتب يصل بعد نهاية السنة، ويطلب المصادقات والكشوف، ويوقّع رأيًا في القوائم المالية. لذلك حين يقترح أحد مراجعة داخلية يكون الافتراض الطبيعي أنها التمرين نفسه، يتكرر أكثر، ويقوم به شخص أقرب. وهي ليست كذلك، والفرق هو ما يحدد هل يعود ما يُنفق عليها بشيء.' },
        { h2: 'ما المراجعة الداخلية؟' },
        { p: 'يصف معهد المراجعين الداخليين ({lat}IIA{/lat})، الذي يضع المعايير العالمية للمهنة، المراجعة الداخلية بأنها تأكيد ومشورة مستقلان وموضوعيان يساعدان المنشأة على حماية القيمة وخلقها. وعمليًا يعني ذلك نظرة منهجية منضبطة إلى ثلاثة أمور: كيف تحدد الشركة مخاطرها وتديرها، وهل تعمل ضوابطها كما صُممت، وهل تمنح الحوكمة المجلس والملّاك صورة دقيقة. والمُخرج ليس رأيًا في الأرقام، بل ملاحظات وتوصيات عن النظام الذي يُنتجها.' },
        { h2: 'كيف تختلف عن المراجعة الخارجية؟' },
        { ul: [
          'الغرض: يُبدي المراجع الخارجي رأيًا في عدالة عرض القوائم المالية؛ وتقيّم المراجعة الداخلية فاعلية عمليات المخاطر والرقابة والحوكمة.',
          'الجمهور: الرأي الخارجي موجّه للمساهمين والمقرضين والجهات الضريبية وسائر المستخدمين من الخارج؛ والمراجعة الداخلية ترفع تقاريرها إلى المجلس أو لجنة المراجعة أو الملّاك.',
          'التوقيت: تنظر المراجعة الخارجية إلى سنة أُقفلت؛ وتعمل المراجعة الداخلية طوال السنة وتنظر إلى ما يحدث الآن وما قد يسوء لاحقًا.',
          'النطاق: المراجع الخارجي محكوم بالقوائم المالية؛ والمراجعة الداخلية يمكنها أن تراجع المشتريات والمخزون والرواتب وصلاحيات الأنظمة والامتثال، أو أي شيء يشير إليه تقييم المخاطر.',
          'المعايير: يعمل المراجعون الخارجيون وفق معايير المراجعة الدولية ({lat}ISA{/lat})؛ ويتّبع المراجعون الداخليون المعايير العالمية للمراجعة الداخلية الصادرة عن {lat}IIA{/lat}.'
        ] },
        { p: 'والاثنتان متكاملتان. وظيفة المراجعة الداخلية الجيدة تمنح المراجع الخارجي بيئة رقابية أقوى يعتمد عليها وأثر أدلة موثّقًا، وهذا عادة يختصر عمل نهاية السنة. لكنها لا تحل محل المراجعة الخارجية، ولا ينبغي أن تُسوَّق كأنها تفعل.' },
        { h2: 'من أين يأتي الاستقلال؟' },
        { p: 'المراجع الداخلي الذي يرفع تقاريره إلى المدير المالي لا يستطيع أن يقدّم تقريرًا موثوقًا عن ضوابط المدير المالي. الاستقلال مسألة خط تقرير: الوظيفة، داخلية كانت أو مُسندة إلى جهة خارجية، ترفع ملاحظاتها إلى المجلس أو لجنة المراجعة، وفي الشركة التي يديرها ملّاكها إلى الملّاك مباشرة. والإدارة ترد على الملاحظات وتتولى الإصلاح. ولا يصمم المراجع الضوابط التي سيختبرها لاحقًا، ولا يدير العمليات التي يراجعها.' },
        { h2: 'ماذا تحصل عليه الشركة الصغيرة أو المتوسطة فعلًا؟' },
        { p: 'الشركة التي ليس لديها لجنة مراجعة أو فريق متخصص لا تحتاج إدارة كبيرة، بل برنامجًا منظمًا على قدر مخاطرها. وحين تتولى {lat}MFT{/lat} المراجعة الداخلية لشركة يديرها ملّاكها، يقدّم التكليف عادة ما يلي.' },
        { ul: [
          'تقييم للمخاطر يرتّب العمليات حسب ما قد يسوء فيها ومدى أهميته، فيبدأ العمل حيث يكون التعرض.',
          'خطة مراجعة سنوية متفق عليها مع الملّاك تبدأ بالعمليات الأعلى خطرًا: عادة المشتريات والمدفوعات، والمبيعات والمدينون، والمخزون، والرواتب، وصلاحيات الأنظمة.',
          'اختبار الضوابط في تلك العمليات، ومنها الفصل بين المهام، وحدود الاعتماد، والتسويات، وأثر المراجعة في نظام تخطيط الموارد.',
          'تقرير مكتوب لكل مراجعة، تُربط فيه كل ملاحظة بدليلها، والخطر، والسبب الجذري، والتوصية، والمسؤول، والموعد المستهدف.',
          'المتابعة: فحص لاحق يتأكد أن الإجراءات المتفق عليها نُفذت وتعمل فعلًا، لا أن أحدًا قال إنها نُفذت.'
        ] },
        { h2: 'ما الذي يجعل الملاحظة مفيدة؟' },
        { p: 'الملاحظة التي تقول «ينبغي تعزيز الرقابة على المدفوعات» ليست ملاحظة. الملاحظة المفيدة تذكر ما الذي اختُبر، وما الذي وُجد، ولماذا يهم، وما الذي يصلحه. مثال ذلك: يستطيع المستخدم نفسه الذي يُصدر المدفوعات أن يغيّر البيانات البنكية للمورد، ولا أحد يراجع هذه التغييرات، فقد يمر تغيير احتيالي دون أن يُلاحظ؛ والتوصية قصر التغيير على دور منفصل ومراجعة سجل التغييرات شهريًا. والشذوذ يُبلَّغ عنه بوصفه شذوذًا، مع دليله. أما هل هو خطأ أو ضعف رقابي أو ما هو أسوأ، فيحسمه التحقيق، لا افتراض في التقرير.' },
        { quote: 'المراجعة الخارجية تخبرك هل كانت أرقام العام الماضي عادلة. والمراجعة الداخلية تخبرك هل ستكون أرقام العام القادم كذلك.' },
        { h2: 'متى يكون الوقت المناسب للبدء؟' },
        { p: 'المحفزات المعتادة: نمو سبق قدرة فريق المالية، أو نظام تخطيط موارد جديد يدخل التشغيل، أو فرع ثانٍ أو دولة ثانية، أو استعداد لمستثمرين أو لتسهيل بنكي، أو مالك لم يعد يرى كل دفعة بنفسه. كل واحد من هذه ينقل القرارات بعيدًا عن الأشخاص الذين اعتادوا فحصها بأعينهم. والمراجعة الداخلية تضع فحصًا منظمًا مكان ذلك الإشراف الشخصي، قبل أن تفرض مفاجأةٌ السؤال.' }
      ],
      faq: [
        { q: 'هل المراجعة الداخلية إلزامية للشركات الخاصة؟', a: 'غالبًا لا، وإن كانت المتطلبات تتوقف على الدولة والقطاع وهل الشركة مدرجة أو خاضعة لجهة رقابية، فتحقق مما ينطبق عليك. وأغلب الشركات الخاصة تتبنى المراجعة الداخلية طوعًا لأن الملّاك أو المقرضين أو المستثمرين يريدون تأكيدًا على الضوابط.' },
        { q: 'هل يمكن إسناد المراجعة الداخلية إلى جهة خارجية؟', a: 'نعم. كثير من الشركات الصغيرة والمتوسطة تُسند المراجعة الداخلية كليًا أو جزئيًا إلى مكتب متخصص. ويبقى الاستقلال مرهونًا بخط التقرير: يرفع المزوّد تقاريره إلى المجلس أو الملّاك، وتظل الإدارة مسؤولة عن الضوابط.' },
        { q: 'كم مرة ينبغي أن ترفع المراجعة الداخلية تقاريرها؟', a: 'أغلب البرامج تُصدر تقريرًا بعد كل مراجعة، وتقدّم للمجلس أو الملّاك ملخصًا دوريًا، ربع سنوي غالبًا، بالملاحظات وحالة الإجراءات المتفق عليها. وينبغي أن يتبع التكرار تقييم المخاطر لا تقويمًا ثابتًا.' }
      ]
    },
    {
      slug: 'segregation-of-duties-odoo',
      topic: 'audit',
      author: 'ahmed',
      date: '2026-09-22',
      title: 'الفصل بين المهام في {lat}Odoo{/lat}: من لا ينبغي أن يحمل المفتاحين معًا',
      dek: 'الأزواج المتعارضة في كل عملية مالية، وكيف تفصل بينها بمجموعات الصلاحيات والاعتمادات في {lat}Odoo{/lat}، وماذا تفعل حين يكون الفريق أصغر من أن يُقسَّم.',
      description: 'شرح الفصل بين المهام: الأزواج المتعارضة المعروفة، وكيف تُفرض بمجموعات الصلاحيات والاعتمادات في Odoo، والضوابط التعويضية حين يكون فريق المالية صغيرًا جدًا.',
      answer: 'الفصل بين المهام يعني ألا يتحكم شخص واحد في كل مراحل المعاملة: اعتمادها، وتسجيلها، وحيازة الأصل، وتسوية النتيجة. وفي {lat}Odoo{/lat} يُفرض بإسناد المستخدمين إلى مجموعات صلاحيات تفصل المهام المتعارضة وبإضافة خطوات اعتماد. وحين يكون الفريق أصغر من ذلك، تعوّض عنه مراجعة مستقلة للتغييرات والتسويات.',
      takeaways: [
        'افصل بين أربع وظائف: الاعتماد، والتسجيل، وحيازة الأصول، والتسوية.',
        'ارسم التعارضات حسب العملية قبل إسناد مجموعات الصلاحيات في {lat}Odoo{/lat}، لا بعده.',
        'الاعتمادات وتواريخ الإقفال تضيف رقابة حيث لا يمكن تقسيم الأدوار.',
        'الفرق الصغيرة تعوّض بمراجعة مستقلة موثّقة للتغييرات والتسويات.'
      ],
      body: [
        { p: 'في مراجعاتنا، نادرًا ما تكون نقاط الضعف الرقابية الأهم معقدة. إنها تعود إلى شخص واحد يستطيع أن يفعل أمرين كان ينبغي أن يقوم بهما شخصان: أن يضيف موردًا ويدفع له، أو أن يستلم النقدية ويسجّل التحصيل. الفصل بين المهام من أقدم الضوابط الداخلية، وهو في نظام تخطيط الموارد من أسهلها نقضًا بتغيير واحد في إعدادات المستخدم.' },
        { h2: 'ما الفصل بين المهام؟' },
        { p: 'المبدأ ألا يتحكم شخص واحد في كل مراحل المعاملة. تقسّم أُطر الرقابة المعاملة إلى أربع وظائف: اعتمادها، وتسجيلها، وحيازة الأصل المعني، وتسوية السجلات بالواقع. وحين يجمع شخص واحد وظيفتين منها يستطيع أن يُحدث الخطأ وأن يخفيه معًا. والغاية ليست الشك في أي فرد، بل تصميم يجعل الخطأ، أو التحريف المتعمد، يمر حتمًا على يد ثانية.' },
        { h2: 'ما أزواج المهام المتعارضة؟' },
        { ul: [
          'إنشاء مورد أو تعديله، بما في ذلك حسابه البنكي، واعتماد المدفوعات للموردين أو إصدارها.',
          'إصدار أمر الشراء واستلام البضاعة مقابله، أو اعتماد فاتورة المورد للأمر نفسه.',
          'إنشاء العملاء وتحديد حدود الائتمان، واعتماد البيع الآجل أو إصدار إشعارات الدائن.',
          'استلام النقدية أو مدفوعات العملاء، وترحيل التحصيلات أو تسوية الحساب البنكي.',
          'ترحيل القيود اليومية اليدوية، واعتمادها أو تغيير تواريخ الإقفال التي تحمي الفترات المُقفلة.',
          'إدارة صلاحيات المستخدمين في النظام، ومعالجة المعاملات المالية فيه.',
          'تسوية كميات المخزون، وجرد المخزون نفسه أو تقييمه.'
        ] },
        { h2: 'كيف تطبّقه في {lat}Odoo{/lat}؟' },
        { p: 'يتحكم {lat}Odoo{/lat} فيما يستطيع المستخدم فعله عبر مجموعات صلاحيات تُسند لكل تطبيق. في المحاسبة تتدرج المستويات من صلاحية الفوترة فقط حتى صلاحيات المحاسبة الكاملة والمدير؛ ولكل من المشتريات والمبيعات والمخزون مستوى مستخدم ومستوى مدير. وتختلف أسماء المجموعات وما تتيحه كل منها حسب الإصدار والنسخة، ولهذا نتأكد من الإصدار قبل تصميم المصفوفة. أما التسلسل العملي فواحد في كل تنفيذ.' },
        { ul: [
          'ابدأ من العملية لا من النظام: اكتب من يفعل ماذا في المشتريات والمبيعات والخزينة والمخزون والإقفال، وحدد الأزواج المتعارضة.',
          'حوّل النتيجة إلى مصفوفة أدوار، ثم إلى مجموعات صلاحيات في {lat}Odoo{/lat}، وامنح كل مستخدم أدنى مستوى يتيح له أداء عمله.',
          'أضف خطوات اعتماد حيث يجب أن يفحص دور دورًا آخر: تطبيق المشتريات يتيح اعتمادًا على مرحلتين لأوامر الشراء فوق مبلغ تحدده، ويمكن إضافة اعتمادات أخرى على المدفوعات أو القيود بأدوات الاعتماد في {lat}Odoo{/lat}، حسب النسخة.',
          'احمِ الفترات المُقفلة بتواريخ الإقفال، وقيّد من يستطيع تغييرها.',
          'اسحب صلاحيات المدير ممن يعالجون المعاملات، واحتفظ بحساب مدير منفصل نادر الاستخدام.',
          'راجع قائمة المستخدمين وإسناد المجموعات كل ربع سنة على الأقل؛ فالصلاحيات تنحرف كلما غطّى أحدهم عن زميل في إجازة.'
        ] },
        { p: 'هذا جزء من طريقة {lat}MFT{/lat} في تصميم تنفيذ {lat}Odoo{/lat}: يوقّع مسؤول المالية على مصفوفة الصلاحيات قبل إنشاء المستخدمين، فيبدأ النظام والفصل مبني فيه، بدل أن يُضاف لاحقًا بعد أول مراجعة.' },
        { h2: 'ماذا لو كان الفريق أصغر من أن تُقسَّم المهام؟' },
        { p: 'فريق مالية من شخصين لا يستطيع الفصل بين سبعة أزواج من المهام. وهذا لا يُسقط المبدأ، بل يعني ضوابط تعويضية: فحوصًا يجريها شخص خارج المعاملة، عادة المالك أو المدير العام، تكشف ما كان الفصل سيمنعه.' },
        { ul: [
          'يعتمد المالك كل مورد جديد وكل تغيير في البيانات البنكية للموردين، من تقرير بالتغييرات على سجلات الموردين.',
          'تصل كشوف الحساب البنكية إلى المالك مباشرة، ويراجع التسوية الشهرية ويوقّعها.',
          'قائمة شهرية بالقيود اليدوية وإشعارات الدائن وتسويات المخزون يراجعها شخص لم يرحّلها.',
          'المدفوعات فوق مبلغ محدد تحتاج معتمِدًا ثانيًا، حتى لو كان من خارج المالية.'
        ] },
        { quote: 'الفصل بين المهام ليس أن تثق بالناس أقل. إنه ألا تطلب من أحد أن يكون الضابط الوحيد.' },
        { h2: 'كيف تعرف أنه يعمل؟' },
        { p: 'اختبره. صدّر المستخدمين ومجموعاتهم من {lat}Odoo{/lat} وقارنهم بالمصفوفة المعتمدة. اختر تغييرات على الموردين وتحقق ممن أجراها ومن اعتمدها. ابحث عن أي شخص رحّل قيدًا واعتمده بنفسه. مراجعة الصلاحيات ضمن المراجعة الداخلية قصيرة حين يكون التصميم سليمًا، وهي الطريقة الوحيدة لمعرفة هل صمد التصميم أمام تغييرات الموظفين خلال العام الماضي.' }
      ],
      faq: [
        { q: 'ما مثال الفصل بين المهام؟', a: 'المثال الشائع أن من يُنشئ موردًا أو يغيّر بياناته البنكية ليس هو من يعتمد المدفوعات لذلك المورد أو يُصدرها. ومثال آخر أن من يستلم نقدية العملاء لا يُجري تسوية الحساب البنكي.' },
        { q: 'هل يستطيع {lat}Odoo{/lat} فرض الفصل بين المهام؟', a: 'نعم، أساسًا عبر مجموعات الصلاحيات لكل تطبيق، وخطوات الاعتماد مثل اعتماد أوامر الشراء فوق مبلغ محدد، وتواريخ الإقفال على الفترات المُقفلة. وتختلف المجموعات وأدوات الاعتماد المتاحة حسب الإصدار والنسخة، فينبغي فحص التصميم على تثبيتك أنت.' },
        { q: 'ما الضوابط التعويضية؟', a: 'هي فحوص يجريها شخص مستقل عن المعاملة، كأن يراجع المالك التسويات البنكية أو التغييرات على الموردين، لتكشف ما كان الفصل بين المهام سيمنعه. وتُستخدم حين يكون الفريق أصغر من أن تُفصل فيه المهام المتعارضة.' }
      ]
    },
    {
      slug: 'three-way-match-purchase-controls',
      topic: 'audit',
      author: 'ahmed',
      date: '2026-09-24',
      title: 'المطابقة الثلاثية: ضابط المشتريات الذي يمنعك من الدفع مقابل ما لم يصل',
      dek: 'أمر الشراء والاستلام وفاتورة المورد يجب أن تتفق قبل أن يخرج المال. كيف تعمل المطابقة، وأين مكان حدود التسامح، وكيف يتعامل {lat}Odoo{/lat} مع الاستثناءات.',
      description: 'كيف تعمل المطابقة الثلاثية بين أمر الشراء واستلام البضاعة وفاتورة المورد، وكيف تُحدَّد حدود التسامح، وكيف يعالج Odoo التوريد الجزئي والمرتجعات وفروق السعر.',
      answer: 'المطابقة الثلاثية مقارنة بين أمر الشراء واستلام البضاعة وفاتورة المورد قبل اعتماد الدفع. يجب أن تتفق الكميات والأسعار في الفاتورة مع ما طُلب وما استُلم فعلًا، في حدود تسامح متفق عليها. والفروق تُحجز للمراجعة بدل أن تُدفع، فلا تدفع الشركة إلا مقابل بضاعة طلبتها واستلمتها.',
      takeaways: [
        'طابق ثلاثة مستندات: ما طُلب، وما استُلم، وما فُوتر.',
        'حدود التسامح يجب أن تكون مكتوبة وصغيرة ويعتمدها شخص من خارج المشتريات.',
        'في {lat}Odoo{/lat} تربط الفوترة على الكميات المستلمة كل فاتورة باستلام معتمد.',
        'التوريد الجزئي والمرتجعات وتغيّر الأسعار هي حيث يُختبر الضابط فعلًا.'
      ],
      body: [
        { p: 'اسأل فريق مالية كيف يعرف أن فاتورة المورد صحيحة، وستكون الإجابة المعتادة أن المشتريات أكدتها. هذا في أحسن الأحوال فحص ثنائي: الفاتورة تتفق مع ما يتذكر أحدهم أنه طلبه. والمطابقة الثلاثية تضيف القطعة الأهم، أي الدليل على أن البضاعة أو الخدمة وصلت فعلًا، وتفعل ذلك قبل الدفع لا بعده.' },
        { h2: 'ما المطابقة الثلاثية؟' },
        { p: 'تُقارن ثلاثة مستندات بندًا بندًا قبل اعتماد الفاتورة للدفع:' },
        { ul: [
          'أمر الشراء: ما اعتمدته الشركة، وبأي سعر، ومن أي مورد.',
          'استلام البضاعة: ما يؤكد المخزن أو طالب الشراء أنه استُلم فعليًا، وبأي كمية.',
          'فاتورة المورد: ما يطلب المورد أن يُدفع له مقابله.'
        ] },
        { p: 'إذا اتفقت الفاتورة مع الأمر في السعر ومع الاستلام في الكمية، تمضي. وإن لم تتفق، يُحجز الفرق ويُحقَّق فيه. والمطابقة الثنائية، أي الأمر مقابل الفاتورة، شائعة في الخدمات حيث لا استلام مادي؛ وحتى عندها يقوم تأكيد طالب الخدمة بأنها قُدّمت مقام الاستلام.' },
        { h2: 'ما حدود التسامح المعقولة؟' },
        { p: 'التطابق التام في كل بند نادرًا ما يكون عمليًا: التقريب، والشحن، وفروق العملة الصغيرة، وتعديلات الأسعار المتفق عليها كلها تُحدث ضجيجًا. وحد التسامح هو الفرق الذي تقبله الشركة دون تحقيق. لا يوجد رقم قياسي له. ينبغي أن يعكس قيمة المشتريات المعتادة والأهمية النسبية للشركة، وأن يكون:' },
        { ul: [
          'مكتوبًا في سياسة المشتريات، منفصلًا للكمية وللسعر.',
          'صغيرًا بما يكفي حتى لا تتراكم الفروق المتكررة إلى مبلغ جوهري خلال السنة.',
          'معتمدًا من المالية، لا يحدده فريق المشتريات الذي يُطبَّق على فواتيره.',
          'خاضعًا للمراجعة: قائمة شهرية بالفواتير المقبولة ضمن حد التسامح تُظهر هل يستهلك مورد بعينه الحد كاملًا باستمرار.'
        ] },
        { h2: 'كيف يدعمها {lat}Odoo{/lat}؟' },
        { p: 'يربط {lat}Odoo{/lat} المستندات الثلاثة بشكل أصيل. يمكن إنشاء فاتورة المورد من أمر الشراء، ويحتفظ كل بند في الفاتورة بإشارة إلى بند الأمر. ويحدد إعداد التحكم في الفوترة على المنتج ما يمكن فوترته: على الكميات المطلوبة يمكن تسجيل الفاتورة بمجرد تأكيد الأمر؛ وعلى الكميات المستلمة لا يُفوتر إلا ما اعتُمد في استلام. وللبضاعة المخزنية نجعل الكميات المستلمة هي الافتراضي، فيتحول الاستلام إلى شرط ملزم لا مجرد تذكير.' },
        { p: 'وبحسب الإصدار، تتضمن إعدادات المشتريات أيضًا خيار المطابقة الثلاثية الذي يوسم كل فاتورة بحسب هل ينبغي دفعها، استنادًا إلى الأمر والاستلامات. أما حدود التسامح في السعر فليست إعدادًا قياسيًا، لذلك حين يحتاجها العميل نفرض القاعدة عبر مسار الاعتماد أو تخصيص صغير موثّق، ونتأكد من السلوك على إصدار العميل أثناء الاختبار.' },
        { h2: 'وماذا عن التوريد الجزئي والمرتجعات وتغيّر الأسعار؟' },
        { ul: [
          'التوريد الجزئي: مع الفوترة على الكميات المستلمة لا يُفوتر المورد إلا عمّا وصل؛ ويبقى الرصيد مفتوحًا على الأمر حتى يُستلم الباقي أو يُغلق البند.',
          'المرتجعات: الإرجاع إلى المورد يخفض الكمية المستلمة، فالبضاعة التي فُوترت بالفعل تحتاج إشعار دائن من المورد، ولا يُغلق المرتجع حتى يُطابق ذلك الإشعار.',
          'التوريد الزائد: البضاعة المستلمة فوق الكمية المطلوبة تُعتمد كتعديل على الأمر، أو تُرجع، قبل أن تُفوتر.',
          'فرق السعر: الفاتورة بسعر أعلى من الأمر إما يصححها المورد أو تُعتمد كتعديل على الأمر من صاحب صلاحية؛ ولا يقبلها بصمت الموظف الذي يُدخل الفاتورة.',
          'الخدمات والمصروفات بلا استلام: تأكيد طالب الخدمة، المسجّل على الأمر، يقوم مقام الاستلام.'
        ] },
        { p: 'وحيث يُقيَّم المخزون آليًا، تصل المطابقة إلى الميزانية أيضًا. فالاستلام يقيّم المخزون بسعر الأمر، والفاتورة بسعر مختلف تُحدث فرقًا يجب معالجته وفق طريقة التكلفة. وترك هذه الفروق بلا مراجعة هو الطريق الذي ينحرف به تقييم المخزون عمّا دُفع فعلًا.' },
        { quote: 'الفاتورة بلا استلام طلبُ دفع. والفاتورة المقترنة باستلام دليل.' },
        { h2: 'كيف تختبر الضابط؟' },
        { p: 'في مراجعة داخلية تجريها {lat}MFT{/lat} نأخذ الفواتير المدفوعة في فترة، ونتحقق في عينة مختارة حسب المخاطر أن كلًا منها يرتبط بأمر معتمد واستلام معتمد، وأن الفروق خارج حد التسامح اعتمدها صاحب صلاحية. ونبحث كذلك عن طرق الالتفاف: فواتير سُجلت بلا أمر شراء، وأوامر أُنشئت بعد تاريخ الفاتورة، واستلامات اعتمدها الشخص نفسه الذي اعتمد الأمر. كل واحدة منها موضع تُجووز فيه الضابط، وكلها ظاهرة في الدفتر.' }
      ],
      faq: [
        { q: 'ما الفرق بين المطابقة الثنائية والمطابقة الثلاثية؟', a: 'المطابقة الثنائية تقارن أمر الشراء بفاتورة المورد. والمطابقة الثلاثية تضيف استلام البضاعة، فتتأكد الشركة أن ما فُوتر استُلم فعلًا قبل أن تدفع.' },
        { q: 'هل يدعم {lat}Odoo{/lat} المطابقة الثلاثية؟', a: 'نعم. يربط {lat}Odoo{/lat} فواتير الموردين ببنود أوامر الشراء، وضبط التحكم في الفوترة على المنتج على الكميات المستلمة يقصر الفوترة على ما استُلم. وتتيح بعض الإصدارات خيار المطابقة الثلاثية في إعدادات المشتريات، فتأكد من السلوك على إصدارك.' },
        { q: 'ما حد التسامح المناسب في المطابقة الثلاثية؟', a: 'لا يوجد رقم قياسي. ينبغي أن يكون الحد صغيرًا، ومكتوبًا في سياسة المشتريات للكمية والسعر كلٌّ على حدة، ومعتمدًا من المالية، وخاضعًا للمراجعة حتى لا تتراكم الفروق المتكررة إلى مبلغ جوهري.' }
      ]
    },
    {
      slug: 'bank-reconciliation-controls',
      topic: 'odoo',
      author: 'ahmed',
      date: '2026-09-26',
      title: 'التسوية البنكية ضابط رقابي، لا عبء روتيني',
      dek: 'حين تُجرى كثيرًا ويراجعها شخص آخر، تكون التسوية البنكية أرخص وسيلة لكشف الأخطاء والاحتيال لدى الشركة. وحين تُجرى متأخرة على يد من يدفع، تصبح زينة.',
      description: 'التسوية البنكية كضابط رقابة داخلية: كم مرة تُجرى، وكيف تُعالج البنود المعلّقة والفروق غير المفسَّرة، ونماذج التسوية في Odoo، ومن يراجع التسوية ويوقّعها.',
      answer: 'التسوية البنكية ضابط رقابي لأنها تثبت أن كل حركة في كشف البنك مسجّلة في الدفتر، وأن كل دفعة مسجّلة مرت فعلًا عبر البنك. ولكي تعمل كضابط تُجرى شهريًا على الأقل، مع تفسير البنود المعلّقة وتتبّع أعمارها، وعدم ترحيل أي فرق غير مفسَّر، ومراجعة من شخص لا يُجري المدفوعات.',
      takeaways: [
        'سوِّ كل حساب شهريًا على الأقل، والحسابات النشطة أسبوعيًا.',
        'كل بند معلّق يحتاج تفسيرًا ومسؤولًا وعمرًا.',
        'الفرق غير المفسَّر ملاحظة رقابية، لا رقم موازنة.',
        'المراجِع يجب ألا يكون هو من يُنشئ المدفوعات أو يُصدرها.'
      ],
      body: [
        { p: 'في شركات كثيرة تكون التسوية البنكية آخر مهام الإقفال، يُنجزها على عجل من يجد وقتًا، ويُرحَّل فرق صغير إلى حساب معلّق حتى تتفق الأرقام. هذه هي التسوية كعبء روتيني. أما حين تُعامل كضابط رقابي، فالتمرين نفسه هو أقوى دليل مباشر تملكه الشركة على أن سجلات نقديتها كاملة وحقيقية.' },
        { h2: 'لماذا تُعد التسوية البنكية ضابطًا رقابيًا؟' },
        { p: 'كشف الحساب البنكي دليل يُصدره طرف ثالث. ومقارنته بالدفتر تختبر أمرين معًا: أن كل حركة في الكشف مسجّلة، وهذا يلتقط المدفوعات والرسوم والتحصيلات غير المسجّلة؛ وأن كل دفعة وتحصيل في الدفتر مرّ فعلًا عبر البنك، وهذا يلتقط قيودًا لم تحدث أصلًا. وقليلة هي الضوابط الأخرى التي تقدّم دليلًا مستقلًا بهذه الكلفة المنخفضة.' },
        { h2: 'كم مرة ينبغي إجراء التسوية؟' },
        { p: 'شهريًا على الأقل، لكل حساب بنكي، بما فيها الحسابات الخاملة والحسابات بالعملات الأجنبية. وللحسابات التشغيلية كثيرة الحركة يكون الأسبوعي أفضل، وحين تصل الكشوف إلى {lat}Odoo{/lat} يوميًا تصبح المطابقة اليومية واقعية. والسبب عملي: الخطأ الذي يُكتشف خلال أسبوع سهل التتبع لأن المعنيين يتذكرون المعاملة. أما الذي يُكتشف بعد ثلاثة أشهر فهو تحقيق.' },
        { h2: 'ما الذي يُعد بندًا معلّقًا في التسوية؟' },
        { p: 'البند المعلّق فرق توقيت مشروع بين البنك والدفاتر، سببه معروف وتاريخ تسويته متوقع:' },
        { ul: [
          'مدفوعات قائمة: شيكات صادرة أو تحويلات مسجّلة لم يصرفها البنك بعد.',
          'إيداعات في الطريق: تحصيلات مسجّلة في الدفاتر لم تظهر في الكشف بعد.',
          'رسوم بنكية وفوائد وعمولات في الكشف لم تُسجَّل بعد.',
          'أخطاء من البنك أو في الدفتر حُددت وجارٍ تصحيحها.'
        ] },
        { p: 'لكل بند وصف ومسؤول وعمر. والبنود الأقدم من مدة يحددها إجراء الإقفال، ثلاثين يومًا مثلًا، تُصعَّد: الشيك الذي لم يُصرف منذ أشهر قد يكون ضائعًا أو ملغى أو أسيء استخدامه، والإيداع الذي لا يصل أبدًا مدين لا نقدية.' },
        { h2: 'ماذا تفعل بالفرق غير المفسَّر؟' },
        { p: 'لا شيء يجعله يختفي. الفرق غير المفسَّر يعني أن التسوية لم تكتمل، مهما صغر المبلغ. وترحيله إلى حساب معلّق أو حساب تقريب يُخفي بالضبط ما وُجد الضابط ليكشفه، وقد يكون الفرق الصغير الجزء الظاهر من نمط أكبر. يبقى الفرق مفتوحًا، ويُحقَّق فيه، ويُرفع إلى المراجِع مع ما أُنجز حتى الآن.' },
        { quote: 'التسوية التي تتوازن دائمًا في اليوم الأخير بتعديل صغير لم تُسوَّ. لقد أُغلقت فقط.' },
        { h2: 'كيف يساعد {lat}Odoo{/lat}؟' },
        { p: 'يستورد {lat}Odoo{/lat} كشوف الحساب من ملفات، أو بحسب النسخة والبنك عبر ربط بنكي مباشر، ويعرض كل سطر في الكشف لمطابقته مع الفواتير والمدفوعات المفتوحة. ونماذج التسوية تؤتمت الروتين: قاعدة تطابق الأسطر مع الفواتير المفتوحة بالمرجع أو بالشريك، أو تقترح قيدًا مقابلًا للبنود المتكررة كالرسوم البنكية، ويمكن أن تقترح المطابقة أو تطبّقها آليًا. والأتمتة مكانها البنود الروتينية حقًا فقط، والقواعد نفسها تحتاج مراجعة، لأن النموذج المكتوب بشكل سيئ يسوّي الأشياء الخطأ بصمت.' },
        { p: 'وتواريخ الإقفال مهمة هنا أيضًا. فبعد تسوية الفترة ومراجعتها، يمنع إقفالها القيود بتاريخ سابق من تغيير رصيد اتُّفق عليه مع البنك. وحين تتولى {lat}MFT{/lat} تنفيذ {lat}Odoo{/lat}، يُضبط استيراد الكشوف ونماذج التسوية وإجراء تواريخ الإقفال ويُختبر مع فريق المالية قبل أول إقفال.' },
        { h2: 'من ينبغي أن يراجعها؟' },
        { p: 'شخص لا يُنشئ المدفوعات ولا يُصدرها، وفي موقع يسمح له بالسؤال. وفي الشركة الصغيرة يكون عادة المالك أو المدير العام. والمراجعة موثّقة: يطابق المراجِع الرصيد الختامي مع الكشف، ويقرأ قائمة البنود المعلّقة وأعمارها، ويسأل عن كل قديم أو غير معتاد، ثم يوقّع التسوية ويؤرخها. ومن دون هذه الخطوة لا تخبر التسوية الشركة إلا بما اختار مُعدّها أن يُظهره.' }
      ],
      faq: [
        { q: 'كم مرة ينبغي تسوية الحسابات البنكية؟', a: 'شهريًا على الأقل لكل حساب، بما فيها الحسابات الخاملة والحسابات بالعملات الأجنبية. والحسابات التشغيلية النشطة تستفيد من المطابقة الأسبوعية أو حتى اليومية، لأن الفروق الحديثة أسهل كثيرًا في التتبع.' },
        { q: 'ما نماذج التسوية في {lat}Odoo{/lat}؟', a: 'هي قواعد تساعد على مطابقة أسطر الكشف البنكي، مثلًا مع الفواتير المفتوحة بالمرجع أو بالشريك، أو تقترح قيدًا مقابلًا للبنود المتكررة كالرسوم البنكية. ويمكن أن تقترح المطابقة للمراجعة أو تطبّقها آليًا، لذلك ينبغي ضبطها ومراجعتها بعناية.' },
        { q: 'من ينبغي أن يراجع التسوية البنكية؟', a: 'شخص لا يُنشئ المدفوعات ولا يُصدرها، غالبًا المالك أو المدير العام أو المدير المالي. يطابق المراجِع الأرصدة، ويسأل عن البنود المعلّقة القديمة أو غير المعتادة، ويوقّع التسوية ويؤرخها.' }
      ]
    },
    {
      slug: 'virtual-cfo-vs-full-time-cfo',
      topic: 'audit',
      author: 'ahmed',
      date: '2026-09-28',
      title: 'مدير مالي افتراضي أم مدير مالي متفرغ: كيف تعرف أيهما تحتاج',
      dek: 'السؤال الأول ليس الميزانية، بل حجم الحكم المالي الرفيع الذي تحتاجه الشركة كل أسبوع، وكم من العمل بناء وكم منه تشغيل.',
      description: 'متى يكون المدير المالي الافتراضي هو الخيار الصحيح ومتى تعيّن مديرًا ماليًا متفرغًا: النطاق والإيقاع والمخرجات المتوقعة، والعلامات التحذيرية في كلا النموذجين.',
      answer: 'يكون المدير المالي الافتراضي مناسبًا حين تحتاج الشركة حكمًا ماليًا رفيعًا في التخطيط والنقدية والتقارير والضوابط، لكن ليس كل يوم، وهذا حال الشركة النامية أو التي يديرها ملّاكها ولديها محاسب أو فريق صغير. أما المدير المالي المتفرغ فهو الخيار الأفضل حين تنشأ قرارات مالية مهمة يوميًا، أو يحتاج الفريق قائدًا حاضرًا، أو يطلبه المستثمرون والمقرضون.',
      takeaways: [
        'قرّر بحسب حجم الحكم المالي الرفيع المطلوب، لا بحسب المسمى الوظيفي.',
        'المدير المالي الافتراضي يعمل بإيقاع ثابت ومخرجات محددة.',
        'القرارات اليومية، أو الفريق الأكبر، أو متطلبات المستثمرين تشير إلى تعيين متفرغ.',
        'لا ينجح أي من النموذجين دون دفاتر موثوقة وإقفال منضبط.'
      ],
      body: [
        { p: 'يطرح الملّاك هذا السؤال عادة حين يبدأ شيء في الانفلات: البنك يطلب توقعات لا يستطيع أحد إعدادها، أو فرع جديد يُفتتح بلا موازنة، أو أرقام الشهر تصل متأخرة عن أن تغيّر شيئًا. والدافع الأول هو تعيين مدير مالي. أحيانًا يكون هذا صحيحًا. وكثيرًا ما تحتاج الشركة أولًا إلى حكم مدير مالي لبضعة أيام في الشهر، يُطبَّق على وظيفة مالية ليست جاهزة بعد لقائد متفرغ.' },
        { h2: 'ماذا يفعل المدير المالي الافتراضي فعلًا؟' },
        { p: 'المدير المالي الافتراضي مختص مالي رفيع، أو فريق صغير، يؤدي دور المدير المالي بدوام جزئي وغالبًا عن بُعد، بموجب تكليف محدد النطاق. ويقع عمله فوق مسك الدفاتر ودون مجلس الإدارة: تحويل الدفتر إلى قرارات. ويشمل النطاق المعتاد:' },
        { ul: [
          'حزمة إدارية شهرية: قائمة الدخل، والميزانية، والتدفقات النقدية، وعدد قليل من مؤشرات الأداء التي يدير بها الملّاك فعلًا، مع تعليق على ما تحرك ولماذا.',
          'إدارة النقدية: توقعات نقدية متجددة، ومراجعة لرأس المال العامل، وإنذار مبكر بالأسابيع الضيقة أو الضغط على تعهدات القروض.',
          'الموازنة والتوقعات، ومراجعة الانحرافات التي تُبقي الموازنة مفيدة بعد شهرها الأول.',
          'انضباط الإقفال: تقويم، وتسويات، ومراجعة، حتى تكون الأرقام موثوقة وفي موعدها.',
          'الضوابط والحوكمة: حدود الاعتماد، والفصل بين المهام، والتقارير التي يحتاجها الملّاك أو المجلس.',
          'الدعم في القرارات ومع الأطراف الخارجية: التسعير، ودراسات الاستثمار، والبنوك، والمستثمرون، والمراجعون.'
        ] },
        { h2: 'ما الإيقاع الذي ينبغي أن تتوقعه؟' },
        { p: 'يسير التكليف على إيقاع، لا عند الطلب. النمط الشائع فحص نقدية أسبوعي، ومراجعة إقفال واجتماع إداري شهري، وجلسة ربع سنوية عن التوقعات والموازنة والمخاطر المقبلة. وبين هذه النقاط يكون المدير المالي الافتراضي متاحًا للقرارات التي لا تحتمل الانتظار. وإن كان الترتيب لا يُفعَّل إلا حين يقع خطأ، فهو عمل استشاري لا وظيفة مدير مالي.' },
        { h2: 'متى يكون المدير المالي الافتراضي مناسبًا؟' },
        { ul: [
          'لدى الشركة محاسب أو فريق محاسبة صغير يسجّل المعاملات جيدًا، لكن لا أحد يفسّرها للملّاك.',
          'القرارات المالية المؤثرة تأتي شهريًا لا يوميًا.',
          'الشركة تستعد لأمر محدد، كتسهيل بنكي أو سوق جديدة أو تغيير نظام تخطيط الموارد، وتحتاج مدخلات رفيعة لفترة محددة.',
          'يريد الملّاك انضباط التقارير والتوقعات الشهرية قبل الالتزام بتعيين رفيع دائم.'
        ] },
        { h2: 'متى ينبغي أن تعيّن مديرًا ماليًا متفرغًا؟' },
        { ul: [
          'تنشأ قرارات مالية مهمة كل يوم: التسعير، والخزينة، والعقود، والائتمان.',
          'نما فريق المالية إلى حد يحتاج معه قائدًا حاضرًا يوجّه عمله ويدرّبه ويراجعه.',
          'الشركة تجمع رأس مال، أو تدير عدة كيانات، أو تستعد للإدراج، ويتوقع المستثمرون أو المقرضون مسؤولًا تنفيذيًا متفرغًا.',
          'يحتاج الدور إلى مقعد دائم في فريق القيادة وإلى تملّك نتائج تتجاوز المالية.'
        ] },
        { p: 'والخياران لا يُلغي أحدهما الآخر. كثير من الشركات تستعين بمدير مالي افتراضي لبناء التقارير والتوقعات والضوابط، ثم تعيّن مديرًا ماليًا متفرغًا في وظيفة تعمل بالفعل، ويساعد المدير المالي الافتراضي في تحديد الدور وتسليمه.' },
        { quote: 'المدير المالي ليس مسمى وظيفيًا. إنه كمية من الحكم في الأسبوع. اشترِ الكمية التي تحتاجها.' },
        { h2: 'ما العلامات التحذيرية؟' },
        { ul: [
          'لا مخرجات محددة: إن لم يذكر خطاب التكليف ما يصل كل شهر، فلن يصل شيء بانتظام.',
          'تقارير تُبنى خارج الدفتر: الجداول التي لا يمكن تتبعها إلى النظام المحاسبي آراء، لا معلومات إدارية.',
          'مدير مالي افتراضي يرحّل القيود ويعتمد المدفوعات أيضًا، فيُسقط المراجعة المستقلة التي يُفترض أن يقدّمها الدور.',
          'توقعات بلا مراجعة انحرافات: التوقعات التي لا يقارنها أحد بالفعلي وثيقة، لا أداة.',
          'وفي جانب التعيين: توظيف مدير مالي قبل أن تصبح الدفاتر موثوقة، فيتحول التعيين الاستراتيجي إلى مشروع تنظيف.'
        ] },
        { p: 'في {lat}MFT{/lat} تبدأ خدمة المدير المالي الافتراضي من الدفتر: تُراجع الدفاتر ويستقر الإقفال قبل إصدار أول حزمة إدارية، لأن كل قرار في هذا الدور يعتمد على أرقام يثق بها الملّاك.' }
      ],
      faq: [
        { q: 'ما المدير المالي الافتراضي؟', a: 'هو مختص مالي رفيع أو فريق يؤدي دور المدير المالي بدوام جزئي وغالبًا عن بُعد، بموجب تكليف له نطاق وإيقاع ومخرجات محددة.' },
        { q: 'هل المدير المالي الافتراضي هو نفسه المحاسب الخارجي؟', a: 'لا. المحاسب الخارجي يسجّل المعاملات ويُعدّ الدفاتر والإقرارات. أما المدير المالي الافتراضي فيفسّر تلك الأرقام، ويدير التوقعات والتقارير الإدارية، ويقوّي الضوابط، ويدعم قرارات الملّاك.' },
        { q: 'متى ينبغي للشركة أن تعيّن مديرًا ماليًا متفرغًا؟', a: 'عادة حين تنشأ قرارات مالية مهمة يوميًا، أو يحتاج فريق المالية قائدًا حاضرًا، أو يتوقع المستثمرون والمقرضون مسؤولًا ماليًا تنفيذيًا متفرغًا. وكثير من الشركات تعيّنه بعد أن يبني مدير مالي افتراضي تقارير وضوابط موثوقة.' }
      ]
    },
    {
      slug: 'thirteen-week-cash-flow-forecast',
      topic: 'audit',
      author: 'ahmed',
      date: '2026-09-30',
      title: 'كيف تبني توقعات تدفق نقدي لمدة {lat}13{/lat} أسبوعًا من دفترك',
      dek: 'ثلاثة عشر أسبوعًا مدة تكفي لرؤية المشكلة قادمة، وتقصر بما يكفي للتوقع من فواتير حقيقية. منهج عملي بالطريقة المباشرة وتحديث أسبوعي متدحرج.',
      description: 'كيف تبني توقعات تدفق نقدي لمدة 13 أسبوعًا من الدفتر بالطريقة المباشرة: المقبوضات والمدفوعات، والتحديث الأسبوعي المتدحرج، ومراجعة الانحرافات مقابل الفعلي.',
      answer: 'توقعات التدفق النقدي لمدة {lat}13{/lat} أسبوعًا تُسقط المقبوضات والمدفوعات النقدية أسبوعًا بأسبوع للربع القادم بالطريقة المباشرة. تبدأ من الرصيد البنكي المسوّى، وتبني المقبوضات من أرصدة العملاء المفتوحة والمبيعات المتوقعة، والمدفوعات من الموردين والرواتب والضرائب وخدمة الدين. وتُحدَّث كل أسبوع وتُقارن بالنتائج الفعلية.',
      takeaways: [
        'ابدأ من الرصيد البنكي المسوّى، لا من الربح.',
        'استخدم الطريقة المباشرة: مقبوضات ومدفوعات فعلية، أسبوعًا بأسبوع.',
        'حدّث التوقعات كل أسبوع: يسقط الأسبوع المنقضي ويُضاف أسبوع جديد.',
        'قارن المتوقع بالفعلي أسبوعيًا؛ فالانحرافات تكشف أين تخطئ الافتراضات.'
      ],
      body: [
        { p: 'نادرًا ما يتحرك الربح والنقدية معًا في المدى القصير. قد ينتهي شهر رابح بنقدية أقل مما بدأ به، لأن العملاء دفعوا متأخرين، أو اشتُري مخزون قبل الموسم، أو حلّ موعد دفعة ضريبية. وتوقعات التدفق النقدي لمدة {lat}13{/lat} أسبوعًا موجودة لتجيب عن سؤال لا تجيب عنه قائمة الدخل: هل ستكون لدينا نقدية كافية في كل أسبوع من الأسابيع الثلاثة عشر القادمة، وإن لم تكن، ففي أي أسبوع تبدأ المشكلة؟' },
        { h2: 'لماذا ثلاثة عشر أسبوعًا؟' },
        { p: 'ثلاثة عشر أسبوعًا ربع سنة. مدة تكفي لرؤية العجز قادمًا وما زال هناك وقت للتصرف، بمتابعة التحصيل أو إعادة جدولة المدفوعات أو السحب من تسهيل، وتقصر بما يكفي لتأتي أغلب الأرقام من مستندات موجودة بالفعل: فواتير مفتوحة، وفواتير موردين مفتوحة، وأوامر شراء، ورواتب، وجداول قروض. وبعد الربع تعتمد التوقعات أكثر على الافتراضات؛ أما داخله فيمكن بناؤها في معظمها من الدفتر.' },
        { h2: 'ما الطريقة المباشرة؟' },
        { p: 'الطريقة المباشرة تتوقع النقدية الداخلة والخارجة فعلًا حسب الفئة، بدل البدء من الربح وتعديله بالبنود غير النقدية كما تفعل الطريقة غير المباشرة. وهي الخيار الصحيح للتوقعات قصيرة المدى، لأن من يديرون النقدية يفكرون بالمقبوضات والمدفوعات، ولأن كل سطر يمكن تتبعه إلى مصدره ومقارنته بما حدث فعلًا.' },
        { h2: 'كيف تبنيها من الدفتر؟' },
        { ul: [
          'الرصيد الافتتاحي: أرصدة البنوك المسوّاة مع الكشوف، لكل حساب تستطيع الشركة استخدامه فعلًا.',
          'مقبوضات العملاء: الأرصدة المفتوحة من تقرير أعمار المدينين، يوضع كل منها في الأسبوع المتوقع واقعيًا لسداده، بناءً على سلوك العميل الفعلي في السداد لا على تاريخ الاستحقاق التعاقدي.',
          'المبيعات الجديدة: التحصيلات المتوقعة من مبيعات لم تُفوتر بعد، من أوامر مؤكدة أو من خط المبيعات، في سطر منفصل حتى يبقى عدم يقينها ظاهرًا.',
          'مدفوعات الموردين: الأرصدة الدائنة المفتوحة وأوامر الشراء الملتزم بها، مجدولة وفق الشروط المتفق عليها ودورات الدفع في الشركة.',
          'الرواتب والتكاليف المتكررة: الرواتب والإيجار والمرافق والاشتراكات، في الأسابيع التي تخرج فيها من الحساب فعلًا.',
          'الضرائب والمدفوعات النظامية: ضريبة القيمة المضافة، والاستقطاع، والتأمينات الاجتماعية وغيرها، وفق تقويم إقراراتها.',
          'التمويل: أقساط القروض، والفوائد، والسحب من التسهيلات، وأي تمويل من الملّاك أو توزيعات عليهم.',
          'الرصيد الختامي لكل أسبوع، مقارنًا بالحد الأدنى من النقدية الذي تحتاجه الشركة لتعمل بأمان.'
        ] },
        { p: 'في {lat}Odoo{/lat} توجد أغلب هذه المدخلات بالفعل: تقارير أعمار المدينين والدائنين، وأوامر الشراء المفتوحة، وبنود القيود بتواريخ استحقاقها. أما التوقعات نفسها فتعيش غالبًا في جدول بيانات أو أداة تخطيط تُغذّى من تلك التقارير، لكن كل سطر فيها يجب أن يرتبط بالدفتر أو بافتراض مسمّى ومكتوب.' },
        { h2: 'كيف يعمل التحديث الأسبوعي المتدحرج؟' },
        { p: 'كل أسبوع يسقط الأسبوع المنقضي ويُضاف أسبوع ثالث عشر جديد. يُستبدل الرصيد الافتتاحي بالرصيد الفعلي المسوّى، وتُحدَّث البنود المفتوحة من الدفتر، وتُراجع افتراضات الأسابيع المتبقية. ينبغي أن يستغرق التحديث ساعات لا أيامًا. وإن استغرق أكثر، فالمدخلات لا تأتي من النظام بشكل نظيف.' },
        { h2: 'لماذا تهم مراجعة الانحرافات؟' },
        { p: 'التوقعات جيدة بقدر آخر مرة فُحصت فيها. كل أسبوع قارن ما توقعته للأسبوع المنقضي بما حدث فعلًا، سطرًا بسطر. والانحرافات الكبيرة لها تفسير: عميل يدفع متأخرًا عمّا افتُرض، أو مورد دُفع له مبكرًا، أو تكلفة لم يذكرها أحد. أصلح الافتراض، لا الرقم فقط. وعلى مدى أسابيع تحوّل هذه المراجعة جدول البيانات إلى أداة موثوقة، وتُظهر للملّاك أي أجزاء التوقعات تستحق الثقة.' },
        { quote: 'الغاية من توقعات النقدية ليست أن تكون صحيحة، بل أن تكون خاطئة مبكرًا بما يكفي لتفعل شيئًا حيال ذلك.' },
        { h2: 'من ينبغي أن يتملكها؟' },
        { p: 'التوقعات مسؤولية المالية، لكن مدخلاتها تأتي من المبيعات والمشتريات والعمليات، والقرارات التي تستدعيها للملّاك أو الإدارة. وفي الشركات التي تعمل فيها {lat}MFT{/lat} مديرًا ماليًا افتراضيًا، تُراجع توقعات الأسابيع الثلاثة عشر في اجتماع نقدية أسبوعي قصير: الرصيد الختامي لكل أسبوع، وأدنى نقطة في الربع، وانحرافات الأسبوع الماضي، والإجراءات المتفق عليها لحماية الأسابيع الضيقة.' }
      ],
      faq: [
        { q: 'ما توقعات التدفق النقدي لمدة {lat}13{/lat} أسبوعًا؟', a: 'هي إسقاط أسبوعي للمقبوضات والمدفوعات النقدية على مدى الأسابيع الثلاثة عشر القادمة، يُبنى بالطريقة المباشرة ويُحدَّث كل أسبوع. وتُظهر الرصيد النقدي المتوقع في نهاية كل أسبوع وتنبّه إلى موعد احتمال العجز.' },
        { q: 'هل تُبنى توقعات الأسابيع الثلاثة عشر بالطريقة المباشرة أم غير المباشرة؟', a: 'تُفضَّل الطريقة المباشرة عادة، لأنها تُسقط مقبوضات ومدفوعات فعلية يمكن تتبعها إلى الفواتير وجداول السداد. أما الطريقة غير المباشرة التي تبدأ من الربح فتناسب التخطيط طويل المدى أكثر.' },
        { q: 'كم مرة ينبغي تحديث توقعات التدفق النقدي لمدة {lat}13{/lat} أسبوعًا؟', a: 'أسبوعيًا. كل أسبوع يُستبدل الأسبوع المنقضي بالفعلي، ويُضاف أسبوع جديد في النهاية، وتُقارن التوقعات بالنتائج الفعلية لتحسين الافتراضات.' }
      ]
    }
  ]
};
