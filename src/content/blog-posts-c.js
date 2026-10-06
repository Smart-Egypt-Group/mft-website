// Blog posts batch C: Odoo 20 for finance teams, Odoo 20 AI agents under finance controls, and Odoo 20 bank
// reconciliation and bill payments. Every Odoo 20 claim comes from Odoo's published 20 release notes only.
// Same rules as blog.en.js / blog.ar.js: no client amounts, no long dashes, methodology or MFT practice only.
module.exports = {
  en: [
    {
      slug: 'odoo-20-whats-new-for-finance-teams',
      topic: 'odoo',
      author: 'ahmed',
      date: '2026-10-06',
      title: 'Odoo 20 for finance teams: what changes, what to ignore, what to test',
      dek: 'Most of the launch noise is about AI. For a finance team in Egypt or Saudi Arabia, the changes that matter are in the bank, in payables and in the valuation close.',
      description: 'What Odoo 20 changes for finance teams in Egypt and Saudi Arabia: bank entries, bill payments, duplicate checks, valuation, the AI assistant and what to test.',
      answer: 'According to the Odoo 20 release notes, the finance changes that matter are in the bank and payables: bank entries must originate from bank transactions, bills can be paid through bank payment initiation where bank and country allow, and duplicate bills get red or yellow warnings. An AI assistant follows. Re-test ETA and ZATCA e-invoicing after upgrading.',
      takeaways: [
        'Odoo 20 was released on 24 September 2026; Odoo 17.0 reaches the planned end of standard support the same month.',
        'The bank, payables and valuation changes alter controls, not just screens, so they need testing.',
        'AI features run on IAP credits bought separately, and AI agents are Enterprise-only.',
        'No Odoo 20 specific ETA or ZATCA changes are verified; re-test e-invoicing in a sandbox anyway.'
      ],
      body: [
        { p: 'Odoo 20 was released on 24 September 2026 at Odoo Experience in Brussels, with one version number for Community and Enterprise. For a finance team in Cairo or Riyadh, the more important changes are quieter: how bank entries are created, how bills are paid, how duplicates are caught and how inventory valuation is closed. This is a reading of the Odoo 20 release notes from the finance side: what changes, what can wait, and what to test before you move.' },
        { h2: 'Does the release date matter if we are not upgrading yet?' },
        { p: 'It matters because of support, not features. Odoo supports each major version for three years. According to Odoo’s published plan, standard support for 17.0 ends in September 2026, for 18.0 in September 2027 and for 19.0 in September 2028, which places Odoo 20 at roughly September 2029. If you run 17.0, the question is no longer whether to plan an upgrade but which version to land on. Odoo’s upgrade service can take an Enterprise database across several versions in one request, for example from 17 to 20, but skipping versions raises the testing burden, because every change in between arrives at once.' },
        { h2: 'What changes in accounting and the bank?' },
        { p: 'The most consequential change, according to the release notes, is that all journal entries affecting bank accounts must originate from bank transactions. A manual entry straight to the bank account, the usual cause of a bank balance that no longer agrees with the statement, is no longer the normal path. Around it sit several smaller improvements:' },
        { ul: [
          'Refined statement validation feedback to help find and fix balance inconsistencies.',
          'A bank reconciliation summary report listing reconciled and unreconciled transactions as at the period end date.',
          'Matching rules that find an open invoice or bill fitting a transaction and reconcile it.',
          'Analytic distribution on a write-off created during reconciliation.',
          'Exchange gains and losses consolidated into a single line per invoice, expandable to show the calculation.',
          'Depreciation that accepts rates and decimal numbers, and intercompany vendor bills auto-matched with synchronized purchase orders.'
        ] },
        { h2: 'What changes in payables?' },
        { p: 'Three things. First, bills can be paid from Odoo: select one or several, pay, and confirm with the bank, individually or in batch, through payment initiation (PISP). Availability depends on your bank and country, so confirm it with your bank before you plan around it. Second, invoices and bills get duplicate detection with two levels: red for a highly likely duplicate to correct, yellow for a potential duplicate to investigate before posting, with protection against double payments. Third, bill lines can be predicted from bill history, which speeds entry but also repeats yesterday’s coding mistakes if nobody reviews them.' },
        { h2: 'What changes in inventory valuation?' },
        { p: 'Under perpetual valuation, accrual entries affecting inventory valuation can be made from the inventory valuation closing report and post directly to the inventory valuation account, rather than through the stock variation account. The release notes also list a retroactive COGS update when a cost changes after delivery, landed costs assignable to individual products of a transfer, inventory at a past date, a stock aging report, and the ability to manage stock on hand and valuation without the Inventory app. Each changes how a balance sheet or gross profit figure is produced, so each belongs in your close review.' },
        { h2: 'What does the AI assistant do for accounting?' },
        { p: 'According to the release notes, you can ask the accounting AI assistant about receivables, gross profit or cash flow and get figures drawn from the reports, and it can review suspected bank reconciliation errors and return recommendations. AI features consume IAP credits bought separately from user licences and billed per request. Treat its answers as a fast way to find the right report, and its recommendations as proposals that a person checks against the ledger.' },
        { h2: 'What about ETA and ZATCA e-invoicing?' },
        { p: 'We have not verified any Odoo 20 specific change for Egypt’s ETA e-invoicing or Saudi ZATCA. The localization modules you rely on today still exist, but an upgrade touches the data and code underneath them. After any upgrade, re-test e-invoicing end to end in a sandbox or pre-production environment before production invoices flow.' },
        { h2: 'What can a finance team safely ignore for now?' },
        { p: 'Anything that does not change how a balance is produced or approved can wait for a second phase: presentation changes such as the consolidated exchange difference line, purchasing helpers such as vendor quality ratings and suggested reordering rules, and AI agents until you have decided who governs them.' },
        { h2: 'What should you test before you upgrade?' },
        { ul: [
          'Any process that posted manual entries to bank accounts, since those entries must now come from bank transactions.',
          'The bank reconciliation summary report at a month end you have already closed, compared with your own reconciliation.',
          'Duplicate warnings on a sample of known duplicates and known legitimate repeats.',
          'Payment initiation with your actual bank, if it is offered for your country, and who is allowed to use it.',
          'The valuation closing report and COGS on a product whose cost changed after delivery.',
          'ETA or ZATCA e-invoicing in a sandbox or pre-production environment.'
        ] },
        { quote: 'An upgrade is a change in how your numbers are produced. Test it like one.' },
        { p: 'When we run an Odoo upgrade for a client, these tests are part of acceptance, run on a copy of the client’s own closed periods, before anyone is asked to sign off.' }
      ],
      faq: [
        { q: 'When was Odoo 20 released?', a: 'Odoo 20 was released on 24 September 2026 at Odoo Experience in Brussels, with one version number for Community and Enterprise.' },
        { q: 'How long will Odoo 20 be supported?', a: 'Odoo supports each major version for three years, which places standard support for Odoo 20 at roughly September 2029. Odoo 17.0 reaches its planned end of standard support in September 2026.' },
        { q: 'Does Odoo 20 change Egyptian ETA or Saudi ZATCA e-invoicing?', a: 'No Odoo 20 specific change for ETA or ZATCA is verified. Re-test e-invoicing in a sandbox or pre-production environment after any upgrade, before production invoices are issued.' }
      ]
    },
    {
      slug: 'odoo-20-ai-agents-finance-controls',
      topic: 'intelligence',
      author: 'ahmed',
      date: '2026-10-05',
      title: 'Odoo 20 AI agents in finance: useful, billable, and in need of an approver',
      dek: 'Odoo 20 lets AI agents create and update records on a schedule. That makes them part of your control environment, and they should be governed like it.',
      description: 'What Odoo 20 AI agents can do in finance, what they cost in IAP credits, and how to govern them: agents draft, a named person approves, run logs are kept.',
      answer: 'According to the Odoo 20 release notes, AI agents are Enterprise-only records with instructions, skills, knowledge sources and triggers. They can create and update records, run in automated and scheduled actions, and every run is logged. Each request consumes IAP credits. Govern them like a new team member: the agent drafts, a named person approves.',
      takeaways: [
        'AI agents are part of Odoo 20 Enterprise, not Community.',
        'Every request consumes IAP credits, including requests fired by scheduled triggers.',
        'An agent that can create or update records needs an approver and segregation of duties.',
        'Keep and review the run logs as audit evidence, not as a debugging aid.'
      ],
      body: [
        { p: 'Until now, AI in most ERP systems answered questions. According to the Odoo 20 release notes, AI agents in Odoo 20 go further: they can create and update records and run inside automated and scheduled actions, not only in a chat window. For a finance team that is a real capability and a real control question at the same time. An agent that posts or edits records on a schedule is doing work that, done by a person, would sit inside your approval matrix.' },
        { h2: 'What is an AI agent in Odoo 20?' },
        { p: 'The release notes describe an agent as a record with instructions, reusable skills, knowledge sources and triggers wired to automation rules. Every run is logged. Agents can also connect to outside assistants through MCP. In finance terms, an agent is a standing instruction with the ability to act: it wakes on a trigger, reads what its knowledge sources allow, and changes records within the rights it has been given.' },
        { h2: 'What can agents do for finance today?' },
        { p: 'The release notes name a few finance uses directly. The accounting AI assistant answers questions about receivables, gross profit or cash flow with figures from the reports, and can review suspected bank reconciliation errors and return recommendations. In purchasing, an agent points out vendors worth renegotiating with, and a vendor quality rating is built from past orders. Beyond these, what an agent does depends on how you configure it, which is exactly why configuration is a finance decision and not only an IT one.' },
        { h2: 'Who can use them, and what do they cost?' },
        { p: 'AI agents are part of Odoo 20 Enterprise, not Community. AI features consume IAP credits, bought separately from user licences and billed per request. That includes requests fired by scheduled triggers: a trigger that runs every hour consumes credits every hour, whether or not there was anything useful to do. A cost that grows with a schedule rather than with use is easy to miss in the budget and easy to fix once someone owns it.' },
        { ul: [
          'Name an owner for the IAP credit balance and review consumption monthly, by agent.',
          'Set trigger frequency to the business need: a daily review does not need an hourly trigger.',
          'Disable agents that no longer have a clear purpose instead of letting them run quietly.'
        ] },
        { h2: 'How should finance govern an agent that can change records?' },
        { p: 'The same way it governs a person with the same rights. The fact that the actor is software does not remove the need for authorisation; it removes the excuse that somebody looked.' },
        { ul: [
          'The agent drafts. Anything that affects the ledger, a payment or master data stays in draft until a person reviews it.',
          'A named person approves. Not a role mailbox and not the agent’s owner by default, but a specific approver with authority for that type and size of item.',
          'Segregation of duties applies. The person who configures an agent’s instructions should not be the only person who approves its output.',
          'Rights are minimal. Give the agent access to the records it needs and no more, and review those rights when its instructions change.',
          'Logs are kept. Every run is logged in Odoo; decide how long you keep them and who reviews them, and treat them as audit evidence.'
        ] },
        { h2: 'What should internal audit look at?' },
        { p: 'Start with an inventory: which agents exist, what triggers them, what records they can create or update, and who owns each one. Then sample the run logs against the records changed, and check that every ledger-affecting change has an approval by someone other than the agent’s configurer. Check external connections through MCP separately, because they move data beyond the walls of the database. Finally, compare IAP credit consumption with the agents that should be running; unexplained consumption is often the first sign of a forgotten trigger.' },
        { quote: 'An agent with write access and no approver is not automation. It is an unreviewed journal entry with a schedule.' },
        { h2: 'How does this compare with MFT’s own approach?' },
        { p: 'It is the rule we built MFT Intelligence on, and the subject of our earlier article, Agents draft. People approve. Our agents prepare findings, correcting entries and adjustments; named, registered approvers sign them according to materiality; and corrections are made as reversals, never deletions. Odoo 20 agents can be governed the same way. The tool provides triggers and logs. The approval design is yours to set, before the first agent goes live, not after the first surprise.' },
        { p: 'If you are evaluating Odoo 20 agents, write down for each one its purpose, its trigger, its rights, its approver and its expected credit use. If you cannot fill in the approver, the agent is not ready.' }
      ],
      faq: [
        { q: 'Are Odoo 20 AI agents available in Community?', a: 'No. According to the Odoo 20 release notes, AI agents are part of Odoo 20 Enterprise.' },
        { q: 'How are Odoo AI agents billed?', a: 'AI features consume IAP credits bought separately from user licences, billed per request, including requests fired by scheduled triggers. A trigger that runs hourly consumes credits hourly.' },
        { q: 'Can an Odoo 20 agent post accounting entries without approval?', a: 'Agents can create and update records within the rights they are given. Whether ledger changes need approval is a control you design: keep agent output in draft and require a named approver.' }
      ]
    },
    {
      slug: 'odoo-20-bank-reconciliation-and-bill-payments',
      topic: 'odoo',
      author: 'ahmed',
      date: '2026-10-04',
      title: 'Odoo 20 bank reconciliation and bill payments: the new rules and the controls they need',
      dek: 'Bank entries now come from bank transactions, bills can be paid from inside Odoo, and duplicates are flagged in two colours. Each change moves a control.',
      description: 'Odoo 20 bank reconciliation and bill payments: bank-originated entries, the summary report, matching rules, PISP, duplicate warnings and the controls they need.',
      answer: 'According to the Odoo 20 release notes, every journal entry affecting a bank account must originate from a bank transaction, a summary report shows reconciled and unreconciled items at period end, and bills can be paid through payment initiation where bank and country allow. Pair these with approval before payment, few payment initiators and a reviewed duplicate queue.',
      takeaways: [
        'Journal entries affecting bank accounts must originate from bank transactions.',
        'The reconciliation summary report gives period-end evidence of reconciled and unreconciled items.',
        'Paying bills via PISP depends on bank and country, and moves payment release into Odoo.',
        'Red duplicate warnings need correction; yellow ones need investigation before posting.'
      ],
      body: [
        { p: 'Bank reconciliation and supplier payments are where most of the cash controls of a company live. According to the Odoo 20 release notes, both change in this version. Some of the changes close gaps we have seen for years. Others move a control from the bank portal into Odoo, which means the control has to move with it.' },
        { h2: 'Why must bank entries now originate from bank transactions?' },
        { p: 'The release notes state that all journal entries impacting bank accounts must originate from bank transactions, to prevent manual entries that break bank consistency. In practice, the classic reconciliation problem is a manual journal entry posted straight to the bank account: a bank charge, a transfer, a correction. The ledger moves, the statement does not, and the difference sits in the reconciliation until someone explains it. Under the new rule, the bank transaction comes first and the accounting follows it.' },
        { p: 'Finance teams that relied on manual bank entries for transfers between accounts, opening balances or corrections should map those cases before upgrading and decide how each will now be recorded. The release notes also mention refined statement validation feedback to help find and fix balance inconsistencies.' },
        { h2: 'What does the reconciliation summary report give you?' },
        { p: 'A bank reconciliation summary report shows reconciled and unreconciled transactions as at the period end date. That is the document an auditor asks for at every close: what was reconciled, what remained open, and as of when. Make it part of the month-end file, signed by the preparer and a reviewer, and investigate unreconciled items by age rather than by size alone.' },
        { h2: 'How do matching rules and write-off analytics change the routine?' },
        { p: 'Matching rules find an open invoice or bill that fits a transaction and reconcile it. That removes routine work, but it also means a rule can reconcile the wrong item if it is too broad. Review the rules when they are created, and sample automatically reconciled items each month. The release notes also allow an analytic distribution on a write-off created during reconciliation, so small differences such as bank charges can be assigned to a cost centre instead of falling into a general account. Agree which write-offs are acceptable, up to what limit, and who may post them.' },
        { h2: 'How does paying bills from Odoo work?' },
        { p: 'According to the release notes, you can select one or more bills, pay, and confirm with the bank, individually or in batch, through payment initiation (PISP). Availability depends on your bank and country, so check with your bank in Egypt or Saudi Arabia before you plan for it. Where it is available, payment release moves from the bank portal into Odoo, and the bank portal’s own approval chain may no longer be the only gate.' },
        { h2: 'What do the red and yellow duplicate warnings mean?' },
        { p: 'Duplicate detection on invoices and bills has two levels. Red means a highly likely duplicate, to be corrected. Yellow means a potential duplicate, to be investigated before posting. The release notes also describe protection against double payments. Duplicates are one of the most common payables errors we find, so this is useful, but a warning is only a control if someone acts on it and the action is recorded.' },
        { h2: 'Which controls need to change?' },
        { ul: [
          'Approval before payment: a bill should be approved under your approval matrix before it can be selected for payment, and that approval should be visible on the bill.',
          'Who can initiate payments: limit payment initiation to a small, named group that does not also create vendors or enter bills.',
          'Bank-side confirmation: keep the bank’s own authorisation limits aligned with Odoo, so neither side becomes a rubber stamp.',
          'Duplicate review: no red warning is overridden without a documented reason, and yellow warnings are cleared by someone other than the person who entered the bill.',
          'Matching rules and write-offs: changes to rules and write-off limits are approved and logged.'
        ] },
        { quote: 'When the payment button moves into the ERP, the approval matrix has to move with it.' },
        { h2: 'What should you test before relying on it?' },
        { p: 'Run the summary report for a period you have already closed and compare it with your own reconciliation. Enter known duplicates and known legitimate repeat bills and check which warning each receives. If payment initiation is offered by your bank, test a batch end to end with real approvals and confirm that a user without payment rights cannot release it. As part of an internal audit, we review the access rights, the rule changes and a sample of payments against approved bills, because the new features are only as strong as the people allowed to use them.' }
      ],
      faq: [
        { q: 'Can I still post manual journal entries to a bank account in Odoo 20?', a: 'According to the Odoo 20 release notes, all journal entries impacting bank accounts must originate from bank transactions, to prevent manual entries that break bank consistency.' },
        { q: 'Can I pay vendor bills directly from Odoo 20 in Egypt or Saudi Arabia?', a: 'Odoo 20 supports paying bills through payment initiation (PISP), individually or in batch, but availability depends on the bank and country. Confirm with your bank first.' },
        { q: 'What is the difference between red and yellow duplicate warnings?', a: 'Red marks a highly likely duplicate that should be corrected. Yellow marks a potential duplicate that should be investigated before posting.' }
      ]
    }
  ],
  ar: [
    {
      slug: 'odoo-20-whats-new-for-finance-teams',
      topic: 'odoo',
      author: 'ahmed',
      date: '2026-10-06',
      title: '{lat}Odoo 20{/lat} لفرق المالية: ما الذي يتغير، وما الذي يمكن تجاهله، وما الذي يجب اختباره',
      dek: 'أغلب ضجيج الإطلاق يدور حول الذكاء الاصطناعي. أما لفريق مالي في مصر أو السعودية، فالتغييرات المهمة في البنك والدائنين وإقفال التقييم.',
      description: 'ما الذي يغيّره Odoo 20 لفرق المالية في مصر والسعودية: قيود البنك، وسداد فواتير الموردين، وكشف التكرار، وتقييم المخزون، والمساعد الذكي، وما يجب اختباره.',
      answer: 'بحسب ملاحظات إصدار {lat}Odoo 20{/lat}، أهم التغييرات المالية في البنك والدائنين: قيود حسابات البنك يجب أن تنشأ من معاملات بنكية، ويمكن سداد فواتير الموردين عبر خدمة بدء الدفع حيث يسمح البنك والدولة، وتظهر تحذيرات حمراء وصفراء للفواتير المكررة. يليها مساعد ذكي. وأعد اختبار الفوترة الإلكترونية لدى {lat}ETA{/lat} و{lat}ZATCA{/lat} بعد الترقية.',
      takeaways: [
        'صدر {lat}Odoo 20{/lat} في {lat}24{/lat} سبتمبر {lat}2026{/lat}، وفي الشهر نفسه ينتهي الدعم القياسي المخطط للإصدار {lat}17.0{/lat}.',
        'تغييرات البنك والدائنين والتقييم تغيّر الضوابط الرقابية لا الشاشات فقط، لذا تحتاج اختبارًا.',
        'ميزات الذكاء الاصطناعي تعمل برصيد {lat}IAP{/lat} يُشترى منفصلًا، ووكلاء الذكاء الاصطناعي متاحون في نسخة {lat}Enterprise{/lat} فقط.',
        'لا توجد تغييرات موثّقة خاصة بـ{lat}Odoo 20{/lat} لمنظومتي {lat}ETA{/lat} و{lat}ZATCA{/lat}، ومع ذلك أعد اختبار الفوترة الإلكترونية في بيئة تجريبية.'
      ],
      body: [
        { p: 'صدر {lat}Odoo 20{/lat} في {lat}24{/lat} سبتمبر {lat}2026{/lat} خلال مؤتمر {lat}Odoo Experience{/lat} في بروكسل، برقم إصدار واحد لنسختي {lat}Community{/lat} و{lat}Enterprise{/lat}. معظم التغطية دارت حول الذكاء الاصطناعي. لكن لفريق مالي في القاهرة أو الرياض، التغييرات الأهم أهدأ من ذلك: كيف تُنشأ قيود البنك، وكيف تُسدّد فواتير الموردين، وكيف تُكتشف الفواتير المكررة، وكيف يُقفل تقييم المخزون. هذه قراءة لملاحظات الإصدار من زاوية المالية: ما الذي يتغير، وما الذي يمكن تأجيله، وما الذي يجب اختباره قبل الانتقال.' },
        { h2: 'هل يهم تاريخ الإصدار إن لم نكن سنرقّي الآن؟' },
        { p: 'يهم بسبب الدعم لا الميزات. يدعم {lat}Odoo{/lat} كل إصدار رئيسي ثلاث سنوات. وبحسب خطته المعلنة، ينتهي الدعم القياسي للإصدار {lat}17.0{/lat} في سبتمبر {lat}2026{/lat}، وللإصدار {lat}18.0{/lat} في سبتمبر {lat}2027{/lat}، وللإصدار {lat}19.0{/lat} في سبتمبر {lat}2028{/lat}، ما يضع {lat}Odoo 20{/lat} تقريبًا حتى سبتمبر {lat}2029{/lat}. إن كنت تعمل على {lat}17.0{/lat} فالسؤال لم يعد هل تخطط للترقية، بل إلى أي إصدار. خدمة الترقية لدى {lat}Odoo{/lat} تستطيع نقل قاعدة بيانات {lat}Enterprise{/lat} عبر عدة إصدارات في طلب واحد، من {lat}17{/lat} إلى {lat}20{/lat} مثلًا، لكن تخطي الإصدارات يزيد عبء الاختبار، لأن كل ما تغيّر بينها يصل دفعة واحدة.' },
        { h2: 'ما الذي يتغير في المحاسبة والبنك؟' },
        { p: 'أكثر التغييرات أثرًا، بحسب ملاحظات الإصدار، أن كل قيود اليومية التي تمس حسابات البنك يجب أن تنشأ من معاملات بنكية. القيد اليدوي المباشر على حساب البنك، وهو السبب المعتاد لرصيد بنكي لم يعد يتفق مع الكشف، لم يعد المسار الطبيعي. وحول هذا التغيير تحسينات أصغر:' },
        { ul: [
          'رسائل أدق عند اعتماد كشف الحساب تساعد على اكتشاف فروق الأرصدة وإصلاحها.',
          'تقرير ملخص للتسوية البنكية يعرض المعاملات المسوّاة وغير المسوّاة في تاريخ نهاية الفترة.',
          'قواعد مطابقة تبحث عن فاتورة عميل أو مورد مفتوحة تناسب المعاملة وتسوّيها.',
          'توزيع تحليلي على قيد الشطب الذي يُنشأ أثناء التسوية.',
          'أرباح وخسائر فروق العملة مجمّعة في سطر واحد لكل فاتورة، يمكن فتحه لعرض تفاصيل الحساب.',
          'إهلاك يقبل النسب والأرقام العشرية، وفواتير موردين بين الشركات الشقيقة تُطابق تلقائيًا مع أوامر الشراء المتزامنة.'
        ] },
        { h2: 'ما الذي يتغير في الدائنين؟' },
        { p: 'ثلاثة أمور. أولًا، يمكن سداد فواتير الموردين من داخل {lat}Odoo{/lat}: تختار فاتورة أو أكثر، وتدفع، ثم تؤكد مع البنك، فرديًا أو دفعة واحدة، عبر خدمة بدء الدفع ({lat}PISP{/lat}). الإتاحة تعتمد على البنك والدولة، فتأكد مع بنكك قبل أن تبني خطتك عليها. ثانيًا، كشف للتكرار في فواتير العملاء والموردين بمستويين: أحمر لفاتورة مكررة على الأرجح يجب تصحيحها، وأصفر لاحتمال تكرار يجب فحصه قبل الترحيل، مع حماية من السداد المزدوج. ثالثًا، توقّع بنود الفاتورة من تاريخ فواتير المورد، وهو ما يسرّع الإدخال لكنه يكرر أخطاء التوجيه المحاسبي السابقة إن لم يراجعها أحد.' },
        { h2: 'ما الذي يتغير في تقييم المخزون؟' },
        { p: 'في التقييم المستمر، يمكن إنشاء قيود الاستحقاق المؤثرة في تقييم المخزون من تقرير إقفال تقييم المخزون، فتُرحّل مباشرة إلى حساب تقييم المخزون بدل المرور بحساب تغير المخزون. وتذكر ملاحظات الإصدار أيضًا تحديثًا بأثر رجعي لتكلفة البضاعة المباعة ({lat}COGS{/lat}) عندما تتغير التكلفة بعد التسليم، وتحميل التكاليف الإضافية على منتجات بعينها داخل عملية النقل، وعرض المخزون في تاريخ سابق، وتقرير أعمار المخزون، وإمكانية إدارة الكميات والتقييم دون تطبيق المخزون. كل واحد من هذه يغيّر طريقة إنتاج رقم في الميزانية أو في مجمل الربح، فمكانه مراجعة الإقفال لا المستودع وحده.' },
        { h2: 'ماذا يفعل المساعد الذكي في المحاسبة؟' },
        { p: 'بحسب ملاحظات الإصدار، يمكنك سؤال مساعد المحاسبة الذكي عن الذمم المدينة أو مجمل الربح أو التدفق النقدي فيعطيك أرقامًا من التقارير، ويمكنه مراجعة أخطاء التسوية البنكية المشتبه بها وتقديم توصيات. وميزات الذكاء الاصطناعي تستهلك رصيد {lat}IAP{/lat} يُشترى منفصلًا عن تراخيص المستخدمين ويُحتسب لكل طلب. تعامل مع إجاباته كطريق سريع إلى التقرير الصحيح، ومع توصياته كمقترحات يتحقق منها شخص مقابل دفتر الأستاذ.' },
        { h2: 'وماذا عن الفوترة الإلكترونية لدى {lat}ETA{/lat} و{lat}ZATCA{/lat}؟' },
        { p: 'لم نتحقق من أي تغيير خاص بـ{lat}Odoo 20{/lat} لمنظومة الفاتورة الإلكترونية المصرية أو لهيئة الزكاة والضريبة والجمارك السعودية. الحزم المحلية التي تعتمد عليها اليوم ما زالت موجودة، لكن الترقية تمس البيانات والشيفرة التي تحتها. بعد أي ترقية، أعد اختبار الفوترة الإلكترونية من أولها إلى آخرها في بيئة تجريبية أو بيئة ما قبل الإنتاج قبل أن تصدر فواتير حقيقية.' },
        { h2: 'ما الذي يمكن لفريق المالية تجاهله الآن بأمان؟' },
        { p: 'كل ما لا يغيّر طريقة إنتاج رصيد أو اعتماده يمكن أن ينتظر مرحلة ثانية: تغييرات العرض مثل سطر فروق العملة المجمّع، وأدوات المشتريات مثل تقييم جودة الموردين وقواعد إعادة الطلب المقترحة، ووكلاء الذكاء الاصطناعي إلى أن تقرر من يحكمهم. وتجاهل ميزة قرار أيضًا، فدوّنه.' },
        { h2: 'ما الذي يجب اختباره قبل الترقية؟' },
        { ul: [
          'كل عملية كانت تُرحّل قيودًا يدوية على حسابات البنك، لأنها يجب الآن أن تنشأ من معاملات بنكية.',
          'تقرير ملخص التسوية البنكية لشهر أقفلته بالفعل، مقارنة بتسويتك الخاصة.',
          'تحذيرات التكرار على عينة من فواتير مكررة معروفة وفواتير متكررة مشروعة معروفة.',
          'خدمة بدء الدفع مع بنكك الفعلي إن كانت متاحة في دولتك، ومن المسموح له باستخدامها.',
          'تقرير إقفال التقييم وتكلفة البضاعة المباعة لمنتج تغيرت تكلفته بعد التسليم.',
          'الفوترة الإلكترونية لدى {lat}ETA{/lat} أو {lat}ZATCA{/lat} في بيئة تجريبية أو بيئة ما قبل الإنتاج.'
        ] },
        { quote: 'الترقية تغيير في طريقة إنتاج أرقامك. اختبرها على هذا الأساس.' },
        { p: 'وعندما ننفّذ ترقية {lat}Odoo{/lat} لعملائنا، تكون هذه الاختبارات جزءًا من القبول، تُجرى على نسخة من الفترات المقفلة لدى العميل نفسه، قبل أن يُطلب من أحد التوقيع.' }
      ],
      faq: [
        { q: 'متى صدر {lat}Odoo 20{/lat}؟', a: 'صدر {lat}Odoo 20{/lat} في {lat}24{/lat} سبتمبر {lat}2026{/lat} خلال مؤتمر {lat}Odoo Experience{/lat} في بروكسل، برقم إصدار واحد لنسختي {lat}Community{/lat} و{lat}Enterprise{/lat}.' },
        { q: 'إلى متى سيُدعم {lat}Odoo 20{/lat}؟', a: 'يدعم {lat}Odoo{/lat} كل إصدار رئيسي ثلاث سنوات، ما يضع الدعم القياسي لـ{lat}Odoo 20{/lat} تقريبًا حتى سبتمبر {lat}2029{/lat}. وينتهي الدعم القياسي المخطط للإصدار {lat}17.0{/lat} في سبتمبر {lat}2026{/lat}.' },
        { q: 'هل يغيّر {lat}Odoo 20{/lat} الفوترة الإلكترونية لدى {lat}ETA{/lat} المصرية أو {lat}ZATCA{/lat} السعودية؟', a: 'لا يوجد تغيير موثّق خاص بـ{lat}Odoo 20{/lat} لأي منهما. أعد اختبار الفوترة الإلكترونية في بيئة تجريبية أو بيئة ما قبل الإنتاج بعد أي ترقية، قبل إصدار فواتير حقيقية.' }
      ]
    },
    {
      slug: 'odoo-20-ai-agents-finance-controls',
      topic: 'intelligence',
      author: 'ahmed',
      date: '2026-10-05',
      title: 'وكلاء الذكاء الاصطناعي في {lat}Odoo 20{/lat} للمالية: مفيدون، بتكلفة، ويحتاجون إلى معتمِد',
      dek: 'يسمح {lat}Odoo 20{/lat} لوكلاء الذكاء الاصطناعي بإنشاء السجلات وتعديلها وفق جدول زمني. وهذا يجعلهم جزءًا من بيئة الرقابة لديك، ويجب أن يُحكموا على هذا الأساس.',
      description: 'ما الذي يستطيعه وكلاء الذكاء الاصطناعي في Odoo 20 للمالية، وتكلفتهم برصيد IAP، وكيف تحكمهم: الوكيل يعدّ المسودة، وشخص مسمّى يعتمد، وسجلات التشغيل تُحفظ.',
      answer: 'بحسب ملاحظات إصدار {lat}Odoo 20{/lat}، وكلاء الذكاء الاصطناعي سجلات في نسخة {lat}Enterprise{/lat} فقط، لها تعليمات ومهارات ومصادر معرفة ومحفزات. يستطيعون إنشاء السجلات وتعديلها والعمل داخل الإجراءات الآلية والمجدولة، وكل تشغيل يُسجَّل. وكل طلب يستهلك رصيد {lat}IAP{/lat}. احكمهم كموظف جديد: الوكيل يعدّ المسودة، وشخص مسمّى يعتمد.',
      takeaways: [
        'وكلاء الذكاء الاصطناعي جزء من {lat}Odoo 20 Enterprise{/lat}، لا من {lat}Community{/lat}.',
        'كل طلب يستهلك رصيد {lat}IAP{/lat}، بما في ذلك الطلبات التي تطلقها المحفزات المجدولة.',
        'الوكيل القادر على إنشاء السجلات أو تعديلها يحتاج إلى معتمِد وإلى فصل بين المهام.',
        'احفظ سجلات التشغيل وراجعها كدليل مراجعة، لا كأداة لتصحيح الأخطاء فقط.'
      ],
      body: [
        { p: 'حتى الآن، كان الذكاء الاصطناعي في أغلب أنظمة تخطيط الموارد يجيب عن الأسئلة. وبحسب ملاحظات إصدار {lat}Odoo 20{/lat}، يذهب الوكلاء في هذا الإصدار أبعد: يستطيعون إنشاء السجلات وتعديلها والعمل داخل الإجراءات الآلية والمجدولة، لا في نافذة محادثة فقط. لفريق المالية هذه قدرة حقيقية وسؤال رقابي حقيقي في الوقت نفسه. فالوكيل الذي يرحّل سجلات أو يعدّلها وفق جدول يؤدي عملًا لو قام به شخص لكان داخل مصفوفة الصلاحيات والاعتماد لديك.' },
        { h2: 'ما وكيل الذكاء الاصطناعي في {lat}Odoo 20{/lat}؟' },
        { p: 'تصف ملاحظات الإصدار الوكيل بأنه سجل له تعليمات، ومهارات قابلة لإعادة الاستخدام، ومصادر معرفة، ومحفزات مربوطة بقواعد الأتمتة. وكل تشغيل يُسجَّل. ويمكن للوكلاء أيضًا الاتصال بمساعدين خارجيين عبر {lat}MCP{/lat}. وبلغة المالية، الوكيل تعليمة دائمة لديها القدرة على التنفيذ: يستيقظ عند محفز، ويقرأ ما تسمح به مصادر معرفته، ويغيّر السجلات في حدود الصلاحيات الممنوحة له.' },
        { h2: 'ماذا يستطيع الوكلاء أن يفعلوا للمالية اليوم؟' },
        { p: 'تذكر ملاحظات الإصدار بعض الاستخدامات المالية صراحة. مساعد المحاسبة الذكي يجيب عن أسئلة الذمم المدينة ومجمل الربح والتدفق النقدي بأرقام من التقارير، ويستطيع مراجعة أخطاء التسوية البنكية المشتبه بها وتقديم توصيات. وفي المشتريات، يشير وكيل إلى الموردين الذين تستحق إعادة التفاوض معهم، ويُبنى تقييم لجودة المورد من أوامره السابقة. وما عدا ذلك، فما يفعله الوكيل يتوقف على طريقة إعداده، ولهذا بالتحديد يكون الإعداد قرارًا ماليًا لا تقنيًا فقط.' },
        { h2: 'من يستطيع استخدامهم، وكم يكلّفون؟' },
        { p: 'وكلاء الذكاء الاصطناعي جزء من {lat}Odoo 20 Enterprise{/lat}، لا من {lat}Community{/lat}. وميزات الذكاء الاصطناعي تستهلك رصيد {lat}IAP{/lat} يُشترى منفصلًا عن تراخيص المستخدمين ويُحتسب لكل طلب. ويشمل ذلك الطلبات التي تطلقها المحفزات المجدولة: المحفز الذي يعمل كل ساعة يستهلك رصيدًا كل ساعة، سواء وُجد ما يستحق العمل أم لا. والتكلفة التي تنمو مع الجدول لا مع الاستخدام يسهل أن تغيب عن الموازنة، ويسهل إصلاحها متى صار لها مالك.' },
        { ul: [
          'سمِّ مالكًا لرصيد {lat}IAP{/lat}، وراجع الاستهلاك شهريًا لكل وكيل.',
          'اضبط تكرار المحفز على حاجة العمل: المراجعة اليومية لا تحتاج إلى محفز كل ساعة.',
          'أوقف الوكلاء الذين لم يعد لهم غرض واضح بدل تركهم يعملون في صمت.'
        ] },
        { h2: 'كيف تحكم المالية وكيلًا يستطيع تغيير السجلات؟' },
        { p: 'بالطريقة نفسها التي تحكم بها شخصًا يملك الصلاحيات نفسها. كون المنفّذ برنامجًا لا يلغي الحاجة إلى التفويض، بل يلغي العذر بأن أحدًا قد نظر.' },
        { ul: [
          'الوكيل يعدّ المسودة. كل ما يمس دفتر الأستاذ أو الدفعات أو البيانات الأساسية يبقى مسودة إلى أن يراجعه شخص.',
          'شخص مسمّى يعتمد. لا صندوق بريد لدور، ولا مالك الوكيل تلقائيًا، بل معتمِد محدد له صلاحية هذا النوع وهذا الحجم من البنود.',
          'الفصل بين المهام ينطبق. من يعدّ تعليمات الوكيل لا ينبغي أن يكون الوحيد الذي يعتمد مخرجاته.',
          'الصلاحيات في حدها الأدنى. امنح الوكيل الوصول إلى السجلات التي يحتاجها فقط، وراجع صلاحياته كلما تغيرت تعليماته.',
          'السجلات تُحفظ. كل تشغيل يُسجَّل في {lat}Odoo{/lat}؛ قرر مدة الاحتفاظ بها ومن يراجعها، وعاملها كدليل مراجعة.'
        ] },
        { h2: 'ما الذي يجب أن تنظر إليه المراجعة الداخلية؟' },
        { p: 'ابدأ بحصر: ما الوكلاء الموجودون، وما الذي يطلقهم، وما السجلات التي يستطيعون إنشاءها أو تعديلها، ومن مالك كل واحد منهم. ثم خذ عينة من سجلات التشغيل وقارنها بالسجلات التي تغيّرت، وتحقق من أن كل تغيير يمس دفتر الأستاذ له اعتماد من شخص غير من أعدّ الوكيل. وافحص الاتصالات الخارجية عبر {lat}MCP{/lat} على حدة، لأنها تنقل البيانات خارج حدود قاعدة البيانات. وأخيرًا قارن استهلاك رصيد {lat}IAP{/lat} بالوكلاء الذين يُفترض أن يعملوا؛ فالاستهلاك غير المفسَّر كثيرًا ما يكون أول علامة على محفز منسي.' },
        { quote: 'وكيل لديه صلاحية الكتابة بلا معتمِد ليس أتمتة. إنه قيد يومية غير مراجَع له جدول زمني.' },
        { h2: 'كيف يقارن هذا بنهج {lat}MFT{/lat}؟' },
        { p: 'هذه هي القاعدة التي بنينا عليها {lat}MFT Intelligence{/lat}، وهي موضوع مقالنا السابق «الوكلاء يُعدّون المسودة. البشر يعتمدون.». وكلاؤنا يُعدّون الملاحظات والقيود التصحيحية والتسويات، ومعتمِدون مسجّلون بالاسم يوقّعونها حسب الأهمية النسبية، والتصحيحات تتم بقيود عكسية لا بالحذف. ويمكن حكم وكلاء {lat}Odoo 20{/lat} بالطريقة نفسها. الأداة توفر المحفزات والسجلات، أما تصميم الاعتماد فقرارك أنت، قبل أن يعمل أول وكيل، لا بعد أول مفاجأة.' },
        { p: 'إن كنت تقيّم وكلاء {lat}Odoo 20{/lat}، فاكتب لكل وكيل غرضه، ومحفزه، وصلاحياته، ومعتمِده، والاستهلاك المتوقع من الرصيد. وإن لم تستطع ملء خانة المعتمِد، فالوكيل ليس جاهزًا.' }
      ],
      faq: [
        { q: 'هل وكلاء الذكاء الاصطناعي في {lat}Odoo 20{/lat} متاحون في نسخة {lat}Community{/lat}؟', a: 'لا. بحسب ملاحظات إصدار {lat}Odoo 20{/lat}، وكلاء الذكاء الاصطناعي جزء من نسخة {lat}Odoo 20 Enterprise{/lat}.' },
        { q: 'كيف تُحتسب تكلفة وكلاء الذكاء الاصطناعي في {lat}Odoo{/lat}؟', a: 'تستهلك ميزات الذكاء الاصطناعي رصيد {lat}IAP{/lat} يُشترى منفصلًا عن تراخيص المستخدمين ويُحتسب لكل طلب، بما في ذلك طلبات المحفزات المجدولة. المحفز الذي يعمل كل ساعة يستهلك رصيدًا كل ساعة.' },
        { q: 'هل يستطيع وكيل في {lat}Odoo 20{/lat} ترحيل قيود محاسبية دون اعتماد؟', a: 'يستطيع الوكلاء إنشاء السجلات وتعديلها في حدود الصلاحيات الممنوحة لهم. أما اشتراط الاعتماد لتغييرات دفتر الأستاذ فضابط تصممه أنت: أبقِ مخرجات الوكيل مسودة واشترط معتمِدًا مسمّى.' }
      ]
    },
    {
      slug: 'odoo-20-bank-reconciliation-and-bill-payments',
      topic: 'odoo',
      author: 'ahmed',
      date: '2026-10-04',
      title: 'التسوية البنكية وسداد فواتير الموردين في {lat}Odoo 20{/lat}: القواعد الجديدة والضوابط التي تحتاجها',
      dek: 'قيود البنك تنشأ الآن من معاملات بنكية، والفواتير يمكن سدادها من داخل {lat}Odoo{/lat}، والتكرار يُعلَّم بلونين. وكل تغيير من هذه ينقل ضابطًا رقابيًا.',
      description: 'التسوية البنكية وسداد الفواتير في Odoo 20: قيود تنشأ من معاملات البنك، وتقرير ملخص التسوية، وقواعد المطابقة، والدفع عبر PISP، وتحذيرات التكرار، والضوابط.',
      answer: 'بحسب ملاحظات إصدار {lat}Odoo 20{/lat}، كل قيد يومية يمس حساب البنك يجب أن ينشأ من معاملة بنكية، ويعرض تقرير ملخص البنود المسوّاة وغير المسوّاة في نهاية الفترة، ويمكن سداد فواتير الموردين عبر خدمة بدء الدفع حيث يسمح البنك والدولة. اقرن ذلك باعتماد قبل الدفع، وعدد محدود ممن يبدؤون الدفعات، ومراجعة موثّقة للتكرار.',
      takeaways: [
        'قيود اليومية التي تمس حسابات البنك يجب أن تنشأ من معاملات بنكية.',
        'تقرير ملخص التسوية يقدّم دليلًا في نهاية الفترة على البنود المسوّاة وغير المسوّاة.',
        'السداد عبر {lat}PISP{/lat} يعتمد على البنك والدولة، وينقل إطلاق الدفعات إلى داخل {lat}Odoo{/lat}.',
        'التحذير الأحمر للتكرار يستلزم التصحيح، والأصفر يستلزم الفحص قبل الترحيل.'
      ],
      body: [
        { p: 'التسوية البنكية وسداد الموردين هما الموضع الذي تعيش فيه أغلب ضوابط النقدية في أي شركة. وبحسب ملاحظات إصدار {lat}Odoo 20{/lat}، يتغير كلاهما في هذا الإصدار. بعض التغييرات يسد ثغرات نراها منذ سنوات، وبعضها ينقل ضابطًا من بوابة البنك إلى داخل {lat}Odoo{/lat}، وهذا يعني أن الضابط يجب أن ينتقل معه.' },
        { h2: 'لماذا يجب أن تنشأ قيود البنك الآن من معاملات بنكية؟' },
        { p: 'تنص ملاحظات الإصدار على أن كل قيود اليومية المؤثرة في حسابات البنك يجب أن تنشأ من معاملات بنكية، لمنع القيود اليدوية التي تُخلّ باتساق البنك. والمشكلة الكلاسيكية في التسوية قيد يدوي يُرحّل مباشرة إلى حساب البنك: عمولة بنكية، أو تحويل، أو تصحيح. يتحرك الدفتر ولا يتحرك الكشف، ويبقى الفرق في التسوية إلى أن يفسّره أحد. وبموجب القاعدة الجديدة تأتي المعاملة البنكية أولًا ثم تتبعها المحاسبة.' },
        { p: 'على فرق المالية التي اعتمدت على القيود اليدوية للتحويل بين الحسابات أو للأرصدة الافتتاحية أو للتصحيحات أن تحصر هذه الحالات قبل الترقية، وأن تقرر كيف ستُسجَّل كل حالة من الآن. وتذكر ملاحظات الإصدار أيضًا رسائل أدق عند اعتماد كشف الحساب تساعد على اكتشاف فروق الأرصدة وإصلاحها.' },
        { h2: 'ماذا يقدّم لك تقرير ملخص التسوية؟' },
        { p: 'يعرض تقرير ملخص التسوية البنكية المعاملات المسوّاة وغير المسوّاة في تاريخ نهاية الفترة. وهذا هو المستند الذي يطلبه المراجع في كل إقفال: ما الذي سُوّي، وما الذي بقي مفتوحًا، وفي أي تاريخ. اجعله جزءًا من ملف الإقفال الشهري، موقّعًا من المُعِدّ والمراجِع، وافحص البنود غير المسوّاة حسب عمرها لا حسب حجمها فقط.' },
        { h2: 'كيف تغيّر قواعد المطابقة والتوزيع التحليلي للشطب العمل اليومي؟' },
        { p: 'تبحث قواعد المطابقة عن فاتورة عميل أو مورد مفتوحة تناسب المعاملة وتسوّيها. هذا يرفع عبئًا روتينيًا، لكنه يعني أيضًا أن قاعدة واسعة أكثر من اللازم قد تسوّي البند الخطأ. راجع القواعد عند إنشائها، وخذ عينة شهرية من البنود المسوّاة آليًا. وتسمح ملاحظات الإصدار أيضًا بتوزيع تحليلي على قيد الشطب الذي يُنشأ أثناء التسوية، فتُحمَّل الفروق الصغيرة مثل العمولات البنكية على مركز تكلفة بدل أن تسقط في حساب عام. اتفقوا على الشطب المقبول، وحتى أي حد، ومن يحق له ترحيله.' },
        { h2: 'كيف يعمل سداد فواتير الموردين من داخل {lat}Odoo{/lat}؟' },
        { p: 'بحسب ملاحظات الإصدار، يمكنك اختيار فاتورة أو أكثر، والدفع، ثم التأكيد مع البنك، فرديًا أو دفعة واحدة، عبر خدمة بدء الدفع ({lat}PISP{/lat}). الإتاحة تعتمد على البنك والدولة، فتحقق مع بنكك في مصر أو السعودية قبل أن تخطط لها. وحيث تتاح، ينتقل إطلاق الدفعات من بوابة البنك إلى داخل {lat}Odoo{/lat}، وقد لا تبقى سلسلة الاعتماد في بوابة البنك هي البوابة الوحيدة.' },
        { h2: 'ماذا تعني تحذيرات التكرار الحمراء والصفراء؟' },
        { p: 'لكشف التكرار في فواتير العملاء والموردين مستويان. الأحمر يعني فاتورة مكررة على الأرجح يجب تصحيحها، والأصفر يعني احتمال تكرار يجب فحصه قبل الترحيل. وتصف ملاحظات الإصدار أيضًا حماية من السداد المزدوج. الفواتير المكررة من أكثر أخطاء الدائنين التي نجدها، لذا فهذه ميزة مفيدة، لكن التحذير لا يصبح ضابطًا إلا إذا تصرف أحد بناءً عليه وسُجّل تصرفه.' },
        { h2: 'ما الضوابط التي يجب أن تتغير؟' },
        { ul: [
          'الاعتماد قبل الدفع: تُعتمد الفاتورة وفق مصفوفة الاعتماد لديك قبل أن يمكن اختيارها للسداد، ويكون هذا الاعتماد ظاهرًا على الفاتورة.',
          'من يبدأ الدفعات: اقصر بدء الدفع على مجموعة صغيرة مسمّاة لا تنشئ الموردين ولا تُدخل فواتيرهم.',
          'التأكيد من جهة البنك: أبقِ حدود التفويض في البنك متسقة مع {lat}Odoo{/lat}، حتى لا يتحول أي طرف إلى ختم شكلي.',
          'مراجعة التكرار: لا يُتجاوز تحذير أحمر دون سبب موثّق، ويُغلق التحذير الأصفر شخص غير من أدخل الفاتورة.',
          'قواعد المطابقة والشطب: تُعتمد التغييرات على القواعد وحدود الشطب وتُسجَّل.'
        ] },
        { quote: 'حين ينتقل زر الدفع إلى نظام تخطيط الموارد، يجب أن تنتقل معه مصفوفة الاعتماد.' },
        { h2: 'ما الذي يجب اختباره قبل الاعتماد عليه؟' },
        { p: 'شغّل تقرير الملخص لفترة أقفلتها بالفعل وقارنه بتسويتك الخاصة. أدخل فواتير مكررة معروفة وفواتير متكررة مشروعة معروفة، وتحقق من التحذير الذي تحصل عليه كل منها. وإن كان بنكك يتيح بدء الدفع، فاختبر دفعة كاملة من أولها إلى آخرها باعتمادات حقيقية، وتأكد أن مستخدمًا بلا صلاحية دفع لا يستطيع إطلاقها. وضمن أعمال المراجعة الداخلية التي نقدمها، نراجع صلاحيات الوصول وتغييرات القواعد وعينة من الدفعات مقابل الفواتير المعتمدة، لأن الميزات الجديدة لا تكون أقوى من الأشخاص المسموح لهم باستخدامها.' }
      ],
      faq: [
        { q: 'هل ما زال بإمكاني ترحيل قيود يدوية على حساب البنك في {lat}Odoo 20{/lat}؟', a: 'بحسب ملاحظات إصدار {lat}Odoo 20{/lat}، كل قيود اليومية المؤثرة في حسابات البنك يجب أن تنشأ من معاملات بنكية، لمنع القيود اليدوية التي تُخلّ باتساق البنك.' },
        { q: 'هل أستطيع سداد فواتير الموردين مباشرة من {lat}Odoo 20{/lat} في مصر أو السعودية؟', a: 'يدعم {lat}Odoo 20{/lat} سداد الفواتير عبر خدمة بدء الدفع ({lat}PISP{/lat})، فرديًا أو دفعة واحدة، لكن الإتاحة تعتمد على البنك والدولة. تحقق مع بنكك أولًا.' },
        { q: 'ما الفرق بين تحذير التكرار الأحمر والأصفر؟', a: 'الأحمر يعلّم فاتورة مكررة على الأرجح يجب تصحيحها، والأصفر يعلّم احتمال تكرار يجب فحصه قبل الترحيل.' }
      ]
    }
  ]
};
