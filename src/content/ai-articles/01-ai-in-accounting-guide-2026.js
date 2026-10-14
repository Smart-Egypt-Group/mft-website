// 01. AI in accounting: a practical 2026 guide for finance teams
module.exports = {
  en: {
    slug: 'ai-in-accounting-guide-2026',
    topic: 'ai',
    author: 'ahmed',
    reviewer: 'practice',
    image: { alt: 'Illustration: a central ledger node linked to a ledger card, a magnifier over transaction points and a grid of ERP modules, for AI across accounting, audit and Odoo.' },
    date: '2026-10-14',
    title: 'AI in accounting: a practical 2026 guide for finance teams',
    metaTitle: 'AI in accounting: a practical 2026 guide',
    dek: 'What AI really does in entries, reconciliation, the close and the audit, which controls it needs, and how a finance team should start without losing its audit trail.',
    description: 'AI in accounting explained for 2026: what it does in entries, reconciliation, close and audit, the controls it needs, and where a finance team should start.',
    keywords: ['AI in accounting', 'artificial intelligence in accounting', 'AI for finance teams', 'AI accounting controls', 'AI in accounting Odoo 20'],
    about: ['Artificial intelligence', 'Accounting', 'Internal control', 'Internal audit', 'Odoo'],
    answer: 'AI in accounting is the use of machine learning and language models to draft, match, classify and test accounting records: suggesting bill lines, matching bank transactions, flagging duplicates and scoring every transaction for risk. It speeds preparation and widens review coverage, but a named person must still approve what it drafts, and every output must trace to source records.',
    takeaways: [
      'AI in accounting drafts, matches and flags; it does not carry responsibility for the books.',
      'Finance AI adoption has levelled off, so the hard work now is control design, not buying tools.',
      'Every AI output needs a source record behind it and a named approver in front of it.',
      'Start with one high-volume, evidence-rich process such as bank reconciliation, measured against a closed month.'
    ],
    body: [
      { p: 'It is the fourth working day after month end. One accountant is matching a long bank statement line by line, another is keying vendor bills from memory of how the last one was coded, and the internal auditor is preparing to test a sample of a few dozen entries out of thousands. None of this is wrong. It is how most finance teams in Cairo and Riyadh still close, and exactly where AI is now being sold to them.' },
      { p: 'This guide is the hub of a twelve-part MFT series on AI in accounting, audit and Odoo 20: what AI actually does in the accounting cycle, what it changes in your controls, and how to begin without trading your audit trail for speed.' },
      { h2: 'What is AI in accounting?' },
      { p: 'AI in accounting is software that learns from your existing records, or reads documents and questions in natural language, to prepare, match, classify or test accounting data that a person then reviews and approves. That definition matters because it excludes two things often sold under the same label: fixed rules (a reconciliation model that always books bank charges to the same account is automation, not AI), and autonomous posting (software that books entries with nobody accountable is a control failure, whatever it is called).' },
      { p: 'Four capabilities sit under the label, each needing a different control:' },
      { ul: [
        'Prediction: suggesting the account, tax or analytic tag for a bill line from history. The risk is that it repeats yesterday’s coding error with confidence.',
        'Matching: pairing bank transactions with invoices, bills and payments. The risk is a wrong match that clears a balance which should have stayed open.',
        'Anomaly scoring: ranking every transaction by risk, such as duplicates, late round-amount manual entries or approvals outside the matrix. The risk is treating a flag as a finding.',
        'Language agents: answering questions about the ledger, reading documents and drafting records or entries. The risk is a fluent answer with no record behind it.'
      ] },
      { h2: 'Where does AI help in the accounting cycle?' },
      { p: 'Read it process by process: what the machine does, and what a person must still own. The table maps the cycle to the article in this series that goes deeper.' },
      { table: {
        caption: 'AI across the accounting and audit cycle: what the machine does, what a person keeps',
        head: ['Process', 'What AI does', 'What a person still owns', 'Go deeper'],
        rows: [
          ['Journal entries and bills', 'Predicts lines, extracts documents, drafts recurring and correcting entries', 'Approval, coding policy, reversal of errors', '[[blog/ai-journal-entries-bank-reconciliation/|Automating journal entries and bank reconciliation]]'],
          ['Bank reconciliation', 'Matches transactions to open items, proposes write-offs, flags suspected errors', 'Tolerance limits, unexplained differences, reviewer sign-off', '[[blog/ai-journal-entries-bank-reconciliation/|AI bank matching and its controls]]'],
          ['Fraud red flags', 'Scores duplicates, near-duplicate vendors, unusual timing and amounts', 'Investigation; a flag is never proof of fraud', '[[blog/ai-financial-fraud-detection/|AI-based financial fraud detection]]'],
          ['Month-end close', 'Tracks open items, drafts accruals and variance commentary', 'Judgement on estimates, cut-off, final sign-off', '[[blog/ai-month-end-close-financial-reporting/|AI in the monthly close and financial reporting]]'],
          ['Audit approach', 'Monitors continuously instead of once a year', 'Scope, risk assessment, conclusions', '[[blog/continuous-auditing-ai-vs-traditional-audit/|Continuous auditing with AI vs traditional auditing]]'],
          ['Audit testing', 'Tests the full population, not a sample', 'Defining the test and following up exceptions', '[[blog/full-population-testing-ai-vs-sampling/|From sampling to full-population testing]]'],
          ['Access and duties', 'Runs as a system user with its own rights', 'Keeping the agent inside segregation of duties', '[[blog/ai-segregation-of-duties-internal-controls/|AI, segregation of duties and internal controls]]'],
          ['Evidence', 'Cites the records behind each answer', 'Rejecting any output with no source', '[[blog/ai-audit-trail-zero-hallucination/|AI provenance and the zero-hallucination principle]]'],
          ['Odoo 20 features', 'Bill line prediction, financial insights, agents', 'Deciding which features to switch on', '[[blog/odoo-20-ai-features-accounting/|Odoo 20 AI features for accounting]]'],
          ['Connecting AI to the ERP', 'Reads ledger data through the API or MCP', 'Access scope, data residency, approvals', '[[blog/connect-ai-to-odoo-continuous-audit/|Connecting AI to Odoo for continuous auditing]]'],
          ['Purchasing', 'Drafts and routes purchase documents', 'Approval matrix and thresholds', '[[blog/odoo-20-purchase-approvals-automation/|Automating purchasing and approvals in Odoo 20]]'],
          ['Rollout', 'Runs in pilot on a closed period first', 'Gates between phases', '[[blog/odoo-20-ai-accounting-step-by-step/|Step-by-step AI accounting on Odoo 20]]']
        ]
      } },
      { h2: 'How many finance teams actually use AI in 2026?' },
      { p: 'Fewer than the marketing suggests, and the number has stopped climbing. Gartner’s 2025 AI in Finance Survey of 183 CFOs and senior finance leaders found that 59% report using AI in their finance function, against 58% in 2024 and 37% in 2023. The cited barriers were complexity, data and talent. Two cautions: it measures the finance function overall, not accounting specifically, and “using AI” covers anything from one pilot to a production process.' },
      { p: 'Our reading: the easy experiments have been run. What separates teams now is whether they can put AI inside a process with defined inputs, a reviewer and evidence, which is a controls question, not a technology one.' },
      { h2: 'What does Odoo 20 add for accounting teams?' },
      { p: 'According to Odoo’s 20 release notes, the accounting items are concrete: bill line prediction that suggests product, account, tax and analytic values from bill history and the label; AI-powered financial insights that answer questions about receivables, cash flow or reconciliation issues based solely on the accounting data in your database; and duplicate detection on invoices and bills with a red level for highly likely duplicates and a yellow level for potential ones. Agents can now be triggered by automated and scheduled actions, and the database can be connected to outside assistants through MCP.' },
      { p: 'Two facts shape the business case. All AI features require credits bought through In-App Purchase, billed per request and not included in any plan. And which edition includes AI agents should be confirmed for your own edition and plan before you design around them. The [[blog/odoo-20-ai-agents-finance-controls/|governance of Odoo 20 AI agents]] is covered separately; the short version is that an agent which can create records is part of your control environment.' },
      { h2: 'What can go wrong when AI touches the ledger?' },
      { h3: 'Confident answers with no record behind them' },
      { p: 'A language model can produce a balance or a vendor name that reads correctly and exists nowhere in the books. The defence is structural: every figure cites its record, and anything that cites nothing is rejected.' },
      { h3: 'History repeated as policy' },
      { p: 'Prediction learns from what was posted, not what should have been. If a recurring service was miscoded for a year, the model will propose the same account confidently. Review predicted lines against the coding policy, not against last month.' },
      { h3: 'A new user nobody put in the access matrix' },
      { p: 'An agent that creates or updates records is a user. If it runs under an administrator’s account, it inherits rights no single person should have. Give it its own user, map it into your [[blog/segregation-of-duties-odoo/|segregation of duties in Odoo]], and make sure it never approves what it prepared.' },
      { h2: 'Which controls should govern AI in accounting?' },
      { p: 'The controls are not new. COSO’s 2013 framework already asks for control activities (Principle 10), general controls over technology (Principle 11) and ongoing evaluations (Principle 16). What changes is that the preparer can now be software. We apply five rules:' },
      { ol: [
        'The machine drafts; a named, registered person approves. Nothing is posted by the AI on its own.',
        'Approval is tiered by your [[blog/materiality-isa-320-threshold/|ISA 320 materiality threshold]]: above it, a second approver signs.',
        'Errors are corrected by reversal, never by deletion, so the trail shows what the AI proposed and what a person changed.',
        'Every output cites its source records; outputs with no source are rejected and kept visible as rejected.',
        'Rights, tolerances and prompts are owned by the controller and changed through the same approval as any other configuration.'
      ] },
      { quote: 'If the machine cannot show the record, the number does not exist.' },
      { h2: 'How does AI change the audit?' },
      { p: 'Traditional audit relies on sampling under ISA 530 because testing everything by hand is impossible. Once the ledger can be read programmatically, an auditor can test the full population: every manual entry, every payment, every vendor. ISA 240 already requires testing the appropriateness of journal entries; full-population analytics make that test complete rather than illustrative.' },
      { p: 'The case for continuous work is about time. The ACFE’s Occupational Fraud 2026 report, covering 2,402 cases from 143 countries and territories, found that the median fraud lasts 12 months before detection, that tips remain the top detection method at 43% of cases, and that proactive data monitoring is associated with lower losses and faster detection. An annual audit, as we have argued, [[blog/continuous-audit-eleven-months/|misses eleven months]]. Standards are moving too: in August 2026 the IAASB issued exposure drafts revising ISA 500, ISA 330 and ISA 520 to address the growing use of technology, with comments due 15 December 2026. They are not yet final.' },
      { h2: 'Where should a finance team start?' },
      { p: 'Start with one process and a measurement, not a platform decision:' },
      { ol: [
        'Pick one process with high volume and clear evidence. Bank reconciliation is usually the best candidate, because every match can be checked against a statement line.',
        'Baseline it on a closed month: count unmatched lines, days to reconcile and items older than thirty days.',
        'Clean the master data the AI will learn from, starting with duplicate and near-duplicate vendors.',
        'Write the approval rule before switching anything on: who reviews AI drafts, and what threshold needs a second approver.',
        'Run the AI on the closed month and compare its result with the human reconciliation, difference by difference.',
        'Go live only if the comparison passes, then extend to the next process through the gates in the [[blog/odoo-20-ai-accounting-step-by-step/|step-by-step Odoo 20 rollout]].'
      ] },
      { p: 'This is also how we work. Our seg-audit platform reads the books straight from the ERP, read-only, and scores every transaction by risk instead of sampling a few percent; a finding cannot be closed without a named approver. Our [[intelligence/|MFT Intelligence agents]] draft corrections that a registered person approves, and our [[services/internal-audit/|internal audit team]] uses both on engagements. The right first step is a conversation about one process, not a demo.' }
    ],
    faq: [
      { q: 'Will AI replace accountants?', a: 'No. AI takes over preparation work such as matching bank lines, suggesting bill coding and flagging duplicates. Judgement on estimates, cut-off, approvals and the responsibility for the financial statements stay with people. What changes is the job mix: less keying, more review, exception handling and control ownership.' },
      { q: 'What is the difference between automation and AI in accounting?', a: 'Automation follows fixed rules you define, for example always booking a recurring bank charge to the same account. AI learns patterns from your records or reads documents and questions in natural language, so it can handle cases you did not write a rule for. Both need an approver, but AI also needs evidence that each output came from real records.' },
      { q: 'Is AI in accounting safe for audited financial statements?', a: 'It can be, if the controls are designed first. The AI should only draft, a named person should approve, errors should be reversed rather than deleted, and every output should cite its source records. Under those conditions, AI work leaves a clearer audit trail than many manual processes do.' },
      { q: 'Do Odoo 20 AI features cost extra?', a: 'Yes. According to Odoo’s 20 release notes, all AI features require credits purchased through In-App Purchase, billed per request and not included in any plan. Which edition includes AI agents should be confirmed for your own edition and plan before you build a process around them.' },
      { q: 'What is the first AI use case a finance team should try?', a: 'Bank reconciliation is usually the best first case. It has high volume, a clear external source of truth in the bank statement, and results that can be checked line by line. Run it on a month you have already closed and compare the AI result with your own reconciliation before going live.' }
    ],
    sources: [
      { label: 'Gartner, "Gartner Survey Shows Finance AI Adoption Remains Steady in 2025" (press release, 18 Nov 2025)', url: 'https://www.gartner.com/en/newsroom/press-releases/2025-11-18-gartner-survey-shows-finance-ai-adoption-remains-steady-in-2025' },
      { label: 'Odoo, "Odoo 20 Release Notes" (Sept 2026)', url: 'https://www.odoo.com/odoo-20-release-notes' },
      { label: 'ACFE, "Occupational Fraud 2026: A Report to the Nations" (press release, 19 May 2026)', url: 'https://www.acfe.com/about-the-acfe/newsroom-for-media/press-releases/press-release-detail?s=report-to-the-' },
      { label: 'IAASB, "Project update: ISA 500, Audit Evidence" (exposure drafts, Aug 2026)', url: 'https://www.iaasb.org/publications/project-update-isa-500-audit-evidence' }
    ]
  },
  ar: {
    slug: 'ai-in-accounting-guide-2026',
    topic: 'ai',
    author: 'ahmed',
    reviewer: 'practice',
    image: { alt: 'رسم توضيحي: عقدة دفتر أستاذ مركزية مرتبطة ببطاقة قيود، وعدسة مكبرة فوق نقاط معاملات، وشبكة وحدات نظام {lat}ERP{/lat}، ترمز إلى الذكاء الاصطناعي في المحاسبة والمراجعة و{lat}Odoo{/lat}.' },
    date: '2026-10-14',
    title: 'الذكاء الاصطناعي في المحاسبة: دليل عملي لفرق المالية في {lat}2026{/lat}',
    metaTitle: 'الذكاء الاصطناعي في المحاسبة: دليل عملي {lat}2026{/lat}',
    dek: 'ما الذي يفعله الذكاء الاصطناعي فعلًا في القيود والتسوية والإقفال والمراجعة، وما الضوابط التي يحتاجها، وكيف يبدأ الفريق المالي دون أن يخسر مسار التدقيق.',
    description: 'الذكاء الاصطناعي في المحاسبة {lat}2026{/lat}: دوره في القيود والتسوية البنكية والإقفال والمراجعة، والضوابط الرقابية اللازمة، ومن أين يبدأ الفريق المالي.',
    keywords: ['الذكاء الاصطناعي في المحاسبة', 'استخدام الذكاء الاصطناعي في المحاسبة', 'الذكاء الاصطناعي للإدارة المالية', 'الذكاء الاصطناعي والضوابط الرقابية', 'الذكاء الاصطناعي في أودو {lat}20{/lat}'],
    about: ['الذكاء الاصطناعي', 'المحاسبة', 'الرقابة الداخلية', 'المراجعة الداخلية', '{lat}Odoo{/lat}'],
    answer: 'الذكاء الاصطناعي في المحاسبة هو استخدام تعلم الآلة والنماذج اللغوية لإعداد السجلات المحاسبية ومطابقتها وتصنيفها واختبارها: اقتراح بنود فواتير الموردين، ومطابقة الحركات البنكية، وكشف التكرار، وتقييم مخاطر كل معاملة. هو يسرّع الإعداد ويوسّع نطاق الفحص، لكن شخصًا مسمّى يظل يعتمد ما يُعدّه، ويجب أن يرتبط كل ناتج بسجلات مصدره.',
    takeaways: [
      'الذكاء الاصطناعي في المحاسبة يُعِدّ ويطابق وينبّه، لكنه لا يتحمل مسؤولية الدفاتر.',
      'استخدام الذكاء الاصطناعي في الإدارات المالية توقف عن الصعود، فالعمل الحقيقي الآن تصميم الضوابط لا شراء الأدوات.',
      'كل ناتج من الذكاء الاصطناعي يحتاج سجلًا مصدرًا خلفه ومعتمِدًا مسمّى أمامه.',
      'ابدأ بعملية واحدة كثيفة الحركة وواضحة الأدلة، كالتسوية البنكية، وقِسها على شهر مُقفل.'
    ],
    body: [
      { p: 'اليوم الرابع من أيام العمل بعد نهاية الشهر. محاسب يطابق كشف بنك طويلًا سطرًا سطرًا، وآخر يُدخل فواتير الموردين معتمدًا على ذاكرته لطريقة توجيه الفاتورة السابقة، والمراجع الداخلي يجهّز لاختبار عينة من بضع عشرات من القيود وسط آلاف. لا شيء من هذا خطأ في ذاته، لكنه ما زال الشكل المعتاد للإقفال لدى أغلب الإدارات المالية في القاهرة والرياض، وهو بالضبط المكان الذي يُعرض فيه الذكاء الاصطناعي عليها الآن.' },
      { p: 'هذا الدليل هو المحور لسلسلة من اثني عشر مقالًا تنشرها {lat}MFT{/lat} عن الذكاء الاصطناعي في المحاسبة والمراجعة و{lat}Odoo 20{/lat}. نشرح فيه ما يفعله الذكاء الاصطناعي داخل الدورة المحاسبية فعلًا، وما يغيّره في الضوابط الرقابية، وكيف تبدأ دون أن تشتري السرعة بثمن مسار تدقيق لا تستطيع الدفاع عنه.' },
      { h2: 'ما هو الذكاء الاصطناعي في المحاسبة؟' },
      { p: 'الذكاء الاصطناعي في المحاسبة هو برمجيات تتعلم من سجلاتك القائمة، أو تقرأ المستندات والأسئلة باللغة الطبيعية، لتُعِدّ البيانات المحاسبية أو تطابقها أو تصنّفها أو تختبرها، ثم يراجعها شخص ويعتمدها. أهمية هذا التعريف أنه يستبعد أمرين يُباعان كثيرًا تحت الاسم نفسه: القواعد الثابتة، فنموذج تسوية يوجّه عمولات البنك دائمًا إلى الحساب نفسه أتمتة لا ذكاء اصطناعي؛ والترحيل الذاتي، فبرنامج يرحّل القيود دون مسؤول محدد هو خلل رقابي أيًا كان اسمه.' },
      { p: 'عمليًا تندرج تحت هذا الاسم أربع قدرات، ولكل منها ضابط مختلف:' },
      { ul: [
        'التوقع: اقتراح الحساب والضريبة والوسم التحليلي لبند الفاتورة من السجل التاريخي. الخطر أن يكرر خطأ التوجيه السابق بثقة كاملة.',
        'المطابقة: ربط الحركات البنكية بالفواتير والمدفوعات. الخطر مطابقة خاطئة تُقفل رصيدًا كان يجب أن يبقى مفتوحًا.',
        'تقييم الشذوذ: ترتيب كل المعاملات حسب درجة المخاطر، كالمدفوعات المكررة، وقيود يدوية بمبالغ مقرّبة في آخر الشهر، واعتمادات خارج مصفوفة الصلاحيات. الخطر أن يُعامل التنبيه كأنه ملاحظة مثبتة.',
        'الوكلاء اللغويون: الإجابة عن أسئلة حول الدفاتر، وقراءة المستندات، وإعداد مسودات السجلات والقيود. الخطر إجابة بليغة لا يقف خلفها أي سجل.'
      ] },
      { h2: 'أين يساعد الذكاء الاصطناعي في الدورة المحاسبية؟' },
      { p: 'الطريقة المفيدة لفهم الموضوع هي المرور على العمليات واحدة واحدة، والسؤال في كل منها: ما الذي تقوم به الآلة، وما الذي يجب أن يبقى ملكًا لشخص؟ الجدول التالي يرسم الدورة ويحيلك إلى المقال الذي يتعمق في كل خطوة.' },
      { table: {
        caption: 'الذكاء الاصطناعي عبر دورة المحاسبة والمراجعة: ما تقوم به الآلة وما يبقى للإنسان',
        head: ['العملية', 'ما يقوم به الذكاء الاصطناعي', 'ما يبقى مسؤولية الإنسان', 'للتعمق'],
        rows: [
          ['قيود اليومية وفواتير الموردين', 'يتوقع البنود، ويستخرج بيانات المستندات، ويُعِدّ مسودات القيود المتكررة والتصحيحية', 'الاعتماد، وسياسة التوجيه المحاسبي، وعكس الأخطاء', '[[blog/ai-journal-entries-bank-reconciliation/|أتمتة القيود والتسوية البنكية]]'],
          ['التسوية البنكية', 'يطابق الحركات مع البنود المفتوحة، ويقترح الشطب، وينبّه إلى الأخطاء المحتملة', 'حدود التسامح، والفروق غير المفسّرة، وتوقيع المراجع', '[[blog/ai-journal-entries-bank-reconciliation/|المطابقة البنكية بالذكاء الاصطناعي وضوابطها]]'],
          ['مؤشرات الاحتيال', 'يقيّم التكرار، والموردين شبه المكررين، والتوقيتات والمبالغ غير المعتادة', 'الفحص والتحقيق؛ فالتنبيه ليس دليل احتيال أبدًا', '[[blog/ai-financial-fraud-detection/|كشف الاحتيال المالي بالذكاء الاصطناعي]]'],
          ['الإقفال الشهري', 'يتابع البنود المفتوحة، ويُعِدّ مسودات الاستحقاقات وتفسير الانحرافات', 'التقدير في التقديرات المحاسبية، والفصل الزمني، والاعتماد النهائي', '[[blog/ai-month-end-close-financial-reporting/|الذكاء الاصطناعي في الإقفال الشهري والتقارير المالية]]'],
          ['منهج المراجعة', 'يراقب باستمرار بدل مرة في السنة', 'النطاق، وتقييم المخاطر، والاستنتاجات', '[[blog/continuous-auditing-ai-vs-traditional-audit/|المراجعة المستمرة مقابل المراجعة التقليدية]]'],
          ['اختبارات المراجعة', 'يختبر المجتمع الكامل لا العينة', 'تصميم الاختبار ومتابعة الاستثناءات', '[[blog/full-population-testing-ai-vs-sampling/|من العينة إلى اختبار المجتمع الكامل]]'],
          ['الصلاحيات والمهام', 'يعمل كمستخدم للنظام بصلاحيات خاصة به', 'إبقاء الوكيل داخل إطار الفصل بين المهام', '[[blog/ai-segregation-of-duties-internal-controls/|الذكاء الاصطناعي والفصل بين المهام]]'],
          ['الأدلة', 'يستشهد بالسجلات التي بنى عليها كل إجابة', 'رفض أي ناتج بلا مصدر', '[[blog/ai-audit-trail-zero-hallucination/|مسار التدقيق ومبدأ صفر هلوسة]]'],
          ['ميزات {lat}Odoo 20{/lat}', 'توقع بنود الفواتير، والتحليلات المالية، والوكلاء', 'تحديد ما يُفعَّل منها', '[[blog/odoo-20-ai-features-accounting/|خريطة ميزات الذكاء الاصطناعي في {lat}Odoo 20{/lat}]]'],
          ['ربط الذكاء الاصطناعي بنظام {lat}ERP{/lat}', 'يقرأ بيانات الدفاتر عبر {lat}API{/lat} أو {lat}MCP{/lat}', 'نطاق الوصول، ومكان حفظ البيانات، والاعتمادات', '[[blog/connect-ai-to-odoo-continuous-audit/|ربط الذكاء الاصطناعي بـ{lat}Odoo{/lat} للمراجعة المستمرة]]'],
          ['المشتريات', 'يُعِدّ مستندات الشراء ويوجّهها للاعتماد', 'مصفوفة الصلاحيات وحدود الاعتماد', '[[blog/odoo-20-purchase-approvals-automation/|أتمتة المشتريات والاعتمادات في {lat}Odoo 20{/lat}]]'],
          ['التطبيق', 'يعمل تجريبيًا على فترة مُقفلة أولًا', 'بوابات العبور بين المراحل', '[[blog/odoo-20-ai-accounting-step-by-step/|تطبيق المحاسبة بالذكاء الاصطناعي على {lat}Odoo 20{/lat} خطوة بخطوة]]']
        ]
      } },
      { h2: 'كم إدارة مالية تستخدم الذكاء الاصطناعي فعلًا؟' },
      { p: 'أقل مما توحي به الحملات التسويقية، والرقم توقف عن الصعود. وجد استطلاع {lat}Gartner{/lat} للذكاء الاصطناعي في المالية لعام {lat}2025{/lat}، الذي شمل {lat}183{/lat} من المديرين الماليين وكبار قيادات المالية، أن {lat}59%{/lat} يستخدمون الذكاء الاصطناعي في وظيفتهم المالية، مقابل {lat}58%{/lat} في {lat}2024{/lat} و{lat}37%{/lat} في {lat}2023{/lat}. وكانت العوائق المذكورة: التعقيد، والبيانات، والكفاءات. وعند الاستشهاد بالرقم انتبه لأمرين: إنه يقيس الوظيفة المالية كلها لا المحاسبة تحديدًا، وعبارة "يستخدم الذكاء الاصطناعي" تشمل كل شيء من تجربة واحدة إلى عملية تشغيلية كاملة.' },
      { p: 'قراءتنا لهذا الثبات عملية: التجارب السهلة أُجريت بالفعل. ما يفرّق بين الفرق الآن هو القدرة على وضع الذكاء الاصطناعي داخل عملية لها مدخلات محددة ومراجِع وأدلة، وهذا سؤال رقابي قبل أن يكون سؤالًا تقنيًا.' },
      { h2: 'ماذا يضيف {lat}Odoo 20{/lat} لفرق المحاسبة؟' },
      { p: 'بحسب ملاحظات إصدار {lat}Odoo 20{/lat}، البنود المحاسبية محددة: توقع بنود فاتورة المورد، فيقترح المنتج والحساب والضريبة والتوزيع التحليلي من تاريخ الفواتير ومن الوصف؛ وتحليلات مالية بالذكاء الاصطناعي تجيب عن أسئلة حول المدينين والتدفق النقدي ومشكلات التسوية بالاعتماد على البيانات المحاسبية في قاعدة بياناتك وحدها؛ وكشف للتكرار في فواتير العملاء والموردين بمستوى أحمر للتكرار شبه المؤكد ومستوى أصفر للتكرار المحتمل. كما أصبح من الممكن تشغيل الوكلاء من الإجراءات الآلية والمجدولة، وربط قاعدة البيانات بمساعدين خارجيين عبر {lat}MCP{/lat}.' },
      { p: 'وحقيقتان تحكمان دراسة الجدوى. كل ميزات الذكاء الاصطناعي تحتاج رصيدًا يُشترى عبر {lat}In-App Purchase{/lat}، يُحتسب لكل طلب ولا يدخل في أي باقة. والنسخة التي تتضمن الوكلاء يجب تأكيدها لنسختك وباقتك قبل أن تبني عليها. تناولنا [[blog/odoo-20-ai-agents-finance-controls/|حوكمة وكلاء {lat}Odoo 20{/lat} في المالية]] في مقال مستقل، وخلاصته أن الوكيل الذي يستطيع إنشاء السجلات صار جزءًا من بيئتك الرقابية.' },
      { h2: 'ما الذي قد يسوء حين يلمس الذكاء الاصطناعي الدفاتر؟' },
      { h3: 'إجابات واثقة بلا سجل خلفها' },
      { p: 'قد يقدّم النموذج اللغوي رصيدًا أو تفسيرًا لانحراف أو اسم مورد يبدو سليمًا تمامًا ولا وجود له في الدفاتر. الدفاع الوحيد الموثوق بنيوي: كل رقم يستشهد بالسجل الذي جاء منه، وما لا يستشهد بشيء يُرفض ولا يُجمَّل.' },
      { h3: 'الماضي يتحول إلى سياسة' },
      { p: 'التوقع يتعلم مما رُحّل فعلًا، لا مما كان يجب أن يُرحّل. إن وُجّهت خدمة متكررة إلى حساب خاطئ طوال عام، فسيقترح النموذج الحساب نفسه بثقة عالية. راجع البنود المتوقعة على سياسة دليل الحسابات، لا على قيد الشهر الماضي.' },
      { h3: 'مستخدم جديد لم يُدرج في مصفوفة الصلاحيات' },
      { p: 'الوكيل الذي ينشئ السجلات أو يعدّلها مستخدم بكل معنى الكلمة. إن عمل بحساب مدير النظام ورث صلاحيات لا يجوز أن يجمعها شخص واحد. خصّص له مستخدمًا مستقلًا، وأدرجه في [[blog/segregation-of-duties-odoo/|الفصل بين المهام في {lat}Odoo{/lat}]]، وتأكد أنه لا يعتمد أبدًا ما أعدّه.' },
      { h2: 'ما الضوابط الرقابية التي تحكم الذكاء الاصطناعي في المحاسبة؟' },
      { p: 'الضوابط ليست جديدة. إطار {lat}COSO{/lat} لعام {lat}2013{/lat} يطلب أصلًا أنشطة رقابية (المبدأ {lat}10{/lat})، وضوابط عامة على التقنية (المبدأ {lat}11{/lat})، وتقييمات مستمرة (المبدأ {lat}16{/lat}). الجديد أن مُعِدّ القيد قد يكون الآن برنامجًا. نطبّق خمس قواعد:' },
      { ol: [
        'الآلة تُعِدّ، وشخص مسمّى ومسجّل يعتمد. لا يُرحَّل شيء بواسطة الذكاء الاصطناعي وحده.',
        'الاعتماد متدرج حسب [[blog/materiality-isa-320-threshold/|حد الأهمية النسبية وفق {lat}ISA 320{/lat}]]: ما يتجاوزه يحتاج معتمِدًا ثانيًا.',
        'تُصحَّح الأخطاء بالقيد العكسي لا بالحذف، ليبقى في المسار ما اقترحه الذكاء الاصطناعي وما غيّره الإنسان.',
        'كل ناتج يستشهد بسجلات مصدره، وما لا مصدر له يُرفض ويبقى ظاهرًا بوصفه مرفوضًا.',
        'الصلاحيات وحدود التسامح والتعليمات يملكها المراقب المالي، ولا تتغير إلا بالاعتماد نفسه الذي يمر به أي إعداد آخر.'
      ] },
      { quote: 'إن لم تستطع الآلة أن تُريك السجل، فالرقم غير موجود.' },
      { h2: 'كيف يغيّر الذكاء الاصطناعي عمل المراجعة؟' },
      { p: 'تعتمد المراجعة التقليدية على العينة وفق {lat}ISA 530{/lat} لأن فحص كل شيء يدويًا مستحيل. لكن حين تصبح الدفاتر مقروءة برمجيًا، يستطيع المراجع اختبار المجتمع الكامل: كل قيد يدوي، وكل دفعة، وكل مورد. ومعيار {lat}ISA 240{/lat} يطلب أصلًا اختبار ملاءمة قيود اليومية، والتحليل الشامل يجعل هذا الاختبار كاملًا بدل أن يكون توضيحيًا.' },
      { p: 'وحجة الاستمرارية حجة زمن. تقرير {lat}ACFE{/lat} عن الاحتيال المهني لعام {lat}2026{/lat}، الذي شمل {lat}2,402{/lat} حالة من {lat}143{/lat} دولة وإقليمًا، وجد أن الاحتيال يستمر في المتوسط الوسيط {lat}12{/lat} شهرًا قبل اكتشافه، وأن البلاغات ما زالت أول وسيلة اكتشاف بنسبة {lat}43%{/lat} من الحالات، وأن المراقبة الاستباقية للبيانات ترتبط بخسائر أقل واكتشاف أسرع. والمراجعة السنوية، كما كتبنا من قبل، [[blog/continuous-audit-eleven-months/|تفوتها أحد عشر شهرًا]]. والمعايير تتحرك أيضًا: في أغسطس {lat}2026{/lat} أصدر {lat}IAASB{/lat} مسودات عرض لتعديل {lat}ISA 500{/lat} و{lat}ISA 330{/lat} و{lat}ISA 520{/lat} لمواكبة تزايد استخدام التقنية، وآخر موعد للتعليقات {lat}15{/lat} ديسمبر {lat}2026{/lat}. هي مقترحات لا معايير نهائية.' },
      { h2: 'من أين يبدأ الفريق المالي؟' },
      { p: 'ليس من قرار اختيار المنصة، بل من عملية واحدة ومقياس واحد. هذا هو التسلسل الذي نعمل به:' },
      { ol: [
        'اختر عملية واحدة كثيفة الحركة وواضحة الأدلة. التسوية البنكية عادة أفضل مرشح، لأن كل مطابقة يمكن التحقق منها أمام سطر في كشف البنك.',
        'خذ خط الأساس من شهر مُقفل: عدد السطور غير المطابقة، وعدد أيام التسوية، والبنود الأقدم من ثلاثين يومًا.',
        'نظّف البيانات الأساسية التي سيتعلم منها الذكاء الاصطناعي، وابدأ بالموردين المكررين وشبه المكررين.',
        'اكتب قاعدة الاعتماد قبل تفعيل أي شيء: من يراجع مسودات الذكاء الاصطناعي، وعند أي حد يلزم معتمِد ثانٍ.',
        'شغّل الذكاء الاصطناعي على الشهر المُقفل وقارن نتيجته بالتسوية التي أعدّها فريقك، فرقًا فرقًا.',
        'لا تنتقل للتشغيل الفعلي إلا إذا نجحت المقارنة، ثم توسّع إلى العملية التالية عبر البوابات الموضحة في [[blog/odoo-20-ai-accounting-step-by-step/|خطة التطبيق على {lat}Odoo 20{/lat} خطوة بخطوة]].'
      ] },
      { p: 'وهكذا نعمل نحن أيضًا. منصتنا {lat}seg-audit{/lat} تقرأ الدفاتر مباشرة من نظام {lat}ERP{/lat} بصلاحية قراءة فقط، وتقيّم مخاطر كل معاملة بدل فحص نسبة صغيرة منها، ولا تُغلق أي ملاحظة دون معتمِد مسمّى. و[[intelligence/|وكلاء {lat}MFT Intelligence{/lat}]] يُعِدّون مسودات التصحيحات والتحليلات ليعتمدها شخص مسجّل، ويستخدم [[services/internal-audit/|فريق المراجعة الداخلية]] لدينا الاثنين في أعمال العملاء. وإن أردت أن تعرف أين يناسب الذكاء الاصطناعي إقفالك أنت، فالخطوة الأولى الصحيحة حوار حول عملية واحدة، لا عرض توضيحي.' }
    ],
    faq: [
      { q: 'هل سيحل الذكاء الاصطناعي محل المحاسبين؟', a: 'لا. الذكاء الاصطناعي يتولى أعمال الإعداد مثل مطابقة سطور البنك واقتراح توجيه الفواتير وكشف التكرار. أما التقدير في التقديرات المحاسبية والفصل الزمني والاعتمادات ومسؤولية القوائم المالية فتبقى للبشر. ما يتغير هو طبيعة العمل: إدخال أقل، ومراجعة ومعالجة استثناءات وملكية للضوابط أكثر.' },
      { q: 'ما الفرق بين الأتمتة والذكاء الاصطناعي في المحاسبة؟', a: 'الأتمتة تتبع قواعد ثابتة تحددها أنت، كتوجيه عمولة بنكية متكررة دائمًا إلى الحساب نفسه. أما الذكاء الاصطناعي فيتعلم الأنماط من سجلاتك أو يقرأ المستندات والأسئلة باللغة الطبيعية، فيتعامل مع حالات لم تكتب لها قاعدة. الاثنان يحتاجان معتمِدًا، لكن الذكاء الاصطناعي يحتاج أيضًا دليلًا على أن كل ناتج جاء من سجلات حقيقية.' },
      { q: 'هل استخدام الذكاء الاصطناعي آمن مع القوائم المالية المراجَعة؟', a: 'يمكن أن يكون آمنًا إذا صُممت الضوابط أولًا: الذكاء الاصطناعي يُعِدّ فقط، وشخص مسمّى يعتمد، والأخطاء تُعكس ولا تُحذف، وكل ناتج يستشهد بسجلات مصدره. بهذه الشروط يترك عمل الذكاء الاصطناعي مسار تدقيق أوضح مما تتركه عمليات يدوية كثيرة.' },
      { q: 'هل ميزات الذكاء الاصطناعي في أودو {lat}20{/lat} مدفوعة بشكل منفصل؟', a: 'نعم. بحسب ملاحظات إصدار {lat}Odoo 20{/lat}، كل ميزات الذكاء الاصطناعي تحتاج رصيدًا يُشترى عبر {lat}In-App Purchase{/lat}، ويُحتسب لكل طلب، ولا يدخل في أي باقة. ويجب تأكيد النسخة التي تتضمن وكلاء الذكاء الاصطناعي لنسختك وباقتك قبل أن تبني عليها أي عملية.' },
      { q: 'ما أول استخدام للذكاء الاصطناعي يجربه الفريق المالي؟', a: 'التسوية البنكية عادة هي أفضل بداية: حركة كثيفة، ومصدر خارجي واضح للحقيقة هو كشف البنك، ونتائج يمكن فحصها سطرًا سطرًا. شغّلها على شهر أقفلته بالفعل وقارن نتيجة الذكاء الاصطناعي بتسويتك أنت قبل أي تشغيل فعلي.' }
    ],
    sources: [
      { label: 'جارتنر، {lat}"Gartner Survey Shows Finance AI Adoption Remains Steady in 2025"{/lat} (بيان صحفي، {lat}18{/lat} نوفمبر {lat}2025{/lat})', url: 'https://www.gartner.com/en/newsroom/press-releases/2025-11-18-gartner-survey-shows-finance-ai-adoption-remains-steady-in-2025' },
      { label: 'أودو، {lat}"Odoo 20 Release Notes"{/lat} (سبتمبر {lat}2026{/lat})', url: 'https://www.odoo.com/odoo-20-release-notes' },
      { label: 'جمعية فاحصي الاحتيال المعتمدين، {lat}"Occupational Fraud 2026: A Report to the Nations"{/lat} (بيان صحفي، {lat}19{/lat} مايو {lat}2026{/lat})', url: 'https://www.acfe.com/about-the-acfe/newsroom-for-media/press-releases/press-release-detail?s=report-to-the-' },
      { label: 'مجلس معايير المراجعة والتأكيد الدولية، {lat}"Project update: ISA 500, Audit Evidence"{/lat} (مسودات عرض، أغسطس {lat}2026{/lat})', url: 'https://www.iaasb.org/publications/project-update-isa-500-audit-evidence' }
    ]
  }
};
