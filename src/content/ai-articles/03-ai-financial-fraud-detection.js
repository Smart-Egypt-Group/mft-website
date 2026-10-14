// 03. AI financial fraud detection: red flags, models and limits
module.exports = {
  en: {
    slug: 'ai-financial-fraud-detection',
    topic: 'ai',
    author: 'ahmed',
    reviewer: 'practice',
    image: { alt: 'Illustration: a scatter of transaction points with three outliers ringed inside a shield outline, one of them highlighted in gold.' },
    date: '2026-10-14',
    title: 'AI financial fraud detection: red flags, models and limits',
    metaTitle: 'AI financial fraud detection: red flags and limits',
    dek: 'What the models test in your ledger, how to triage what they raise, and why a flag is never proof of fraud or of a misstatement.',
    description: 'How AI financial fraud detection works in accounting: the red flags models score, the controls behind them, and why a flag is a lead to test, not proof.',
    keywords: [
      'AI financial fraud detection',
      'AI fraud detection in accounting',
      'fraud red flags in accounts payable',
      'journal entry testing with AI',
      'ACFE occupational fraud 2026'
    ],
    about: ['Artificial intelligence', 'Occupational fraud', 'Internal control', 'Journal entry testing', 'Odoo'],
    answer: 'AI financial fraud detection scores every transaction in the ledger against red-flag patterns, such as duplicate payments, near-duplicate vendors, approvals outside the matrix and round manual entries posted late at month-end, and routes the highest scores to a person. A flag is a lead to investigate with evidence, never proof of fraud or of a misstatement.',
    takeaways: [
      'AI fraud detection scores every transaction and ranks the riskiest for human review.',
      'A flag is a lead to test with evidence, never proof of fraud or a misstatement.',
      'The ACFE’s 2026 report puts the median time to detection at 12 months; ongoing monitoring shortens it.',
      'Odoo 20 adds preventive duplicate and payment checks; looking back across history still needs a review process.'
    ],
    body: [
      { p: 'Picture the payables run at quarter-end. Two queued bills carry the same vendor invoice number with one character changed. A vendor created last month shares a bank account with an old one. A round manual journal entry lands on the final evening of the month, posted by a user who rarely posts manual entries. None of this is hidden. It sits in the ledger, and in most companies nobody looks until the annual audit.' },
      { p: 'The ACFE’s Occupational Fraud 2026 report, built on 2,402 cases from 143 countries and territories, found that the median fraud runs 12 months before it is detected, and that tips, not controls, remain the top detection method at 43% of cases. AI does not change who commits fraud. It changes how quickly the ledger can tell you that something does not fit. Below: what the models test, how to triage their output, and the line every finance team must hold: a flag is not proof.' },
      { h2: 'What is AI financial fraud detection?' },
      { p: 'AI financial fraud detection is the use of rules, statistical models and language models to score every transaction in a company’s books for patterns associated with fraud or error, so that people review the riskiest items first instead of a random few. Three parts of that definition matter. It covers every transaction, which is why it belongs with [[blog/full-population-testing-ai-vs-sampling/|full-population testing rather than sampling]]. It produces a score, not a verdict. And it ends with a person, because a model can rank but cannot judge intent.' },
      { p: 'It is also wider than fraud. The pattern behind a fraudulent payment equally fits an honest duplicate, a cut-off error or a misconfigured tax. Most flags turn out to be error, which is useful: both usually live in the same weak control.' },
      { h2: 'Which red flags can AI test across the whole ledger?' },
      { p: 'These red flags recur in MFT’s continuous-audit work. Each is testable from ERP data and points back to a control, where the lasting fix belongs.' },
      { table: {
        caption: 'Red flags, what the model compares, and the first human test',
        head: ['Red flag', 'What the model compares', 'First test by a reviewer', 'Control it points to'],
        rows: [
          ['Duplicate and near-duplicate payments', 'Vendor, amount, date and invoice reference, including near-identical references', 'Pull both bills and payments; confirm two real deliveries exist', 'Duplicate checks at bill entry and the [[blog/three-way-match-purchase-controls/|three-way match]]'],
          ['Near-duplicate vendors', 'Names, tax numbers, bank accounts and addresses across the vendor master', 'Trace who created each record and who approved the bank details', 'Approval of vendor master changes'],
          ['Approvals outside the approval matrix', 'Approver and value band against the approved matrix', 'Check whether the approver held that authority on that date', 'Approval limits and [[blog/ai-segregation-of-duties-internal-controls/|segregation of duties]]'],
          ['Round manual entries posted late at month-end', 'Entry source, posting time, user, and how round the figure is', 'Read the support; confirm the business reason', 'Journal entry review before the close'],
          ['Cut-off errors', 'Delivery, receipt and invoice dates against the period posted', 'Match the goods movement to the accounting date', 'Period-end cut-off procedure and lock dates'],
          ['Inventory valuation drift', 'Unit cost movement against purchase history and the valuation method', 'Recompute the cost of the items that moved', 'Costing review and the valuation close']
        ]
      } },
      { h2: 'How do the models behind a fraud flag work?' },
      { p: 'Three families of technique do the work; a credible setup uses all three.' },
      { h3: 'Rules: the patterns you already know' },
      { p: 'Rules encode what an experienced auditor already looks for: the same vendor and reference twice, a payment approved by the person who created the vendor. They are transparent and easy to defend in a working paper, but find only what someone thought to write down.' },
      { h3: 'Anomaly scoring: what does not fit' },
      { p: 'Anomaly models learn what normal looks like for each account, vendor or user and score departures: a user who never posts manual entries suddenly posting several, a vendor whose invoice frequency doubles. They catch new patterns but also flag every legitimate business change, so their output needs triage, not trust.' },
      { h3: 'Language models: reading the narrative' },
      { p: 'Language models read what numbers cannot: entry descriptions, bill labels, vendor names written in two scripts. Their known risk is stating things that are not in the data. That is why MFT’s agents work under the rule we call evidence or silence, set out in [[blog/ai-audit-trail-zero-hallucination/|our article on AI provenance and the audit trail]]: a finding that does not cite the records it was drawn from is rejected, not reported.' },
      { h2: 'What is a fraud flag not?' },
      { p: 'A flag is not proof of fraud. It is not proof of a misstatement either. It is a statement that a transaction differs from a pattern, and that the difference has an explanation someone has to find. Treating flags as accusations exposes honest staff to suspicion and teaches the organisation to argue with the system instead of using it.' },
      { quote: 'A flag is a question the ledger asks; only evidence can answer it.' },
      { p: 'Every flag should therefore close in one of three documented outcomes, with the evidence attached:' },
      { ol: [
        'Explained: the reviewer found a legitimate reason (a split delivery, an agreed advance, a corrected bill) and attached the document that shows it.',
        'Error or control gap: no fraud indicator, but a mistake or a weak control. It becomes an internal audit finding with an owner and a target date, rated by impact and likelihood.',
        'Escalated: the explanation is missing, contradicts the documents, or comes only from the person under review. It goes to whoever owns fraud matters (often the audit committee chair, the owner or legal counsel), outside the reporting line involved, and the evidence is preserved before anyone is asked.'
      ] },
      { p: 'In the third case, do not confront, delete or quietly "fix" the entry. Corrections come later, by reversal, so the original record survives.' },
      { h2: 'Why does detection speed matter so much?' },
      { p: 'Because time is what fraud needs. The ACFE’s 2026 report puts the median duration at 12 months before detection, the same figure as its 2024 report. More than half of the 2026 cases involved a lack of internal controls or an override of existing ones, and the controls associated with stronger outcomes (lower losses and faster detection) include proactive data monitoring, management review and surprise audits. An annual audit examines the year after it ends; as we argue in [[blog/continuous-audit-eleven-months/|why the annual audit misses eleven months]], that leaves the window open for most of the year.' },
      { p: 'Standards point the same way. ISA 240 requires the auditor to test the appropriateness of journal entries, and Principle 16 of COSO’s Internal Control, Integrated Framework expects ongoing evaluations, not only separate ones. A model that scores entries weekly is ongoing evaluation in practice; one that runs once a year is a better sampling tool.' },
      { h2: 'What does Odoo 20 add for fraud prevention?' },
      { p: 'According to Odoo’s 20 release notes, several accounting changes make some red flags harder to create in the first place:' },
      { ul: [
        'Duplicate detection on invoices and bills with two warning levels: red for a highly likely duplicate, yellow for a potential one.',
        'A payment wizard that detects pending payments, to prevent the same bill being paid twice.',
        'Bank consistency: entries that affect bank accounts must originate from bank transactions, which closes the manual route into the bank balance.',
        'User group changes logged in the user’s chatter, so a temporary grant of rights before a sensitive posting leaves a trace.',
        'Hashing of cash journal entries on reconciliation.'
      ] },
      { p: 'These are preventive controls at entry. They do not look back across history, compare the vendor master for near-duplicates, or score a user against their own pattern. A yellow warning that staff learn to dismiss is no control at all. For the AI items in the release, see [[blog/odoo-20-ai-features-accounting/|Odoo 20 AI features for accounting]]. Confirm each feature in your own database and edition before you design controls around it.' },
      { h2: 'Where are the limits of AI fraud detection?' },
      { ul: [
        'Data: cash taken before it is recorded, or a side agreement with a vendor, leaves no line to score.',
        'Collusion: when requester and approver act together, every individual control passes. Testing pairs (requester with approver, buyer with vendor) lowers the odds but does not close the gap.',
        'False positives: flooded reviewers stop reading. Start with fewer, sharper tests.',
        'Override outside the system: an approval given by phone and keyed in later looks clean in the data.',
        'The tool itself: anything that drafts entries is a user and needs the same segregation and logging as a person.'
      ] },
      { p: 'None of these is a reason to wait. Pair the model with management review, surprise checks and an easy reporting channel, since more than half of tips come from employees.' },
      { h2: 'Where should a finance team start on Monday?' },
      { ol: [
        'For each red flag in the table above, name the preventive control and its owner.',
        'Export one quarter of vendor bills, payments, the vendor master and manual journal entries. Run the duplicate payment, near-duplicate vendor and late round entry tests first; the same data also feeds daily matching, as described in [[blog/ai-journal-entries-bank-reconciliation/|automating journal entries and bank reconciliation with AI]].',
        'Agree the triage outcomes and the escalation owner before the first flag.',
        'Tune for two or three cycles: retire noisy tests, tighten useful ones.',
        'Move to weekly once triage keeps pace.'
      ] },
      { p: 'This is the approach behind seg-audit, MFT’s continuous audit platform. It reads the books straight from the ERP, read-only, scores every transaction by risk instead of sampling a few percent, links repeat findings to earlier ones, and no finding closes without a named, registered approver. The [[intelligence/auditor/|MFT Auditor agent]] drafts findings and corrections under the evidence-or-silence rule, and a person approves them. If you want an independent view of where your controls are thin, our [[services/internal-audit/|internal audit service]] starts with exactly these tests.' }
    ],
    faq: [
      { q: 'Can AI detect financial fraud on its own?', a: 'No. AI can score every transaction for patterns associated with fraud or error and rank the riskiest for review, but it cannot establish intent or confirm that fraud occurred. That takes a person examining source documents, explanations and context, and, where warranted, an investigation run by the right owner with the evidence preserved.' },
      { q: 'What red flags does AI find most often in accounts payable?', a: 'Duplicate and near-duplicate payments, near-duplicate vendor records sharing a bank account or tax number, approvals outside the approval matrix, and bills recorded in the wrong period. Each can be tested from ERP data, and each traces back to a specific preventive control such as duplicate checks, vendor master approval or the three-way match.' },
      { q: 'Does a fraud flag mean someone committed fraud?', a: 'No. A flag means a transaction departs from an expected pattern, and most flags turn out to be legitimate exceptions or honest errors. Each one should close as explained, as an error or control gap, or as escalated, with evidence attached. Nobody should be treated as a suspect on the strength of a score.' },
      { q: 'How does AI fraud detection relate to ISA 240?', a: 'ISA 240 sets out the auditor’s responsibilities relating to fraud and requires testing the appropriateness of journal entries. Scoring every manual entry for risk factors such as timing, user and round figures gives the auditor and internal audit a full-population view to select from. The auditor’s judgment and documentation duties do not change.' },
      { q: 'Does Odoo 20 have built-in fraud detection?', a: 'Odoo’s 20 release notes describe preventive checks rather than a fraud module: red and yellow duplicate warnings on invoices and bills, pending payment detection in the payment wizard, bank entries that must come from bank transactions, and logged user group changes. Analysis across history still needs a separate review process. Confirm each feature in your edition.' }
    ],
    sources: [
      { label: 'ACFE, "Occupational Fraud 2026: A Report to the Nations" (press release, 19 May 2026)', url: 'https://www.acfe.com/about-the-acfe/newsroom-for-media/press-releases/press-release-detail?s=report-to-the-' },
      { label: 'ACFE, "Occupational Fraud 2024: A Report to the Nations" (report, 2024)', url: 'https://www.acfe.com/en-us/-/media/files/acfe/pdfs/rttn/2024/2024-report-to-the-nations.pdf' },
      { label: 'Odoo, "Odoo 20 Release Notes" (September 2026)', url: 'https://www.odoo.com/odoo-20-release-notes' }
    ]
  },
  ar: {
    slug: 'ai-financial-fraud-detection',
    topic: 'ai',
    author: 'ahmed',
    reviewer: 'practice',
    image: { alt: 'رسم توضيحي: نقاط معاملات متناثرة، وثلاث قيم شاذة محاطة بدوائر داخل درع، إحداها مميزة باللون الذهبي.' },
    date: '2026-10-14',
    title: 'كشف الاحتيال المالي بالذكاء الاصطناعي: المؤشرات والنماذج والحدود',
    metaTitle: 'كشف الاحتيال المالي بالذكاء الاصطناعي: المؤشرات والحدود',
    dek: 'ما الذي تفحصه النماذج في دفاترك، وكيف تُفرز التنبيهات التي ترفعها، ولماذا لا يكون التنبيه دليلًا على احتيال ولا على تحريف.',
    description: 'كيف يعمل كشف الاحتيال المالي بالذكاء الاصطناعي في المحاسبة: المؤشرات التي تفحصها النماذج، والضوابط التي تقف خلفها، ولماذا التنبيه بداية فحص لا دليل إدانة.',
    keywords: [
      'كشف الاحتيال المالي بالذكاء الاصطناعي',
      'الذكاء الاصطناعي في كشف الاحتيال المحاسبي',
      'مؤشرات الاحتيال في الحسابات الدائنة',
      'فحص قيود اليومية بالذكاء الاصطناعي',
      'تقرير الاحتيال المهني {lat}ACFE{/lat}'
    ],
    about: ['الذكاء الاصطناعي', 'الاحتيال المهني', 'الرقابة الداخلية', 'فحص قيود اليومية', '{lat}Odoo{/lat}'],
    answer: 'يقيّم كشف الاحتيال المالي بالذكاء الاصطناعي كل معاملة في الدفتر مقابل أنماط معروفة بارتباطها بالاحتيال أو الخطأ، مثل المدفوعات المكررة، والموردين المتشابهين، والاعتمادات خارج مصفوفة الصلاحيات، والقيود اليدوية بأرقام مقرّبة في آخر الشهر، ثم يرفع الأعلى خطرًا إلى شخص مسؤول. والتنبيه بداية فحص بالأدلة، لا دليل احتيال ولا تحريف.',
    takeaways: [
      'يقيّم الذكاء الاصطناعي كل معاملة ويرتّب الأعلى خطرًا لمراجعة بشرية.',
      'التنبيه سؤال يُختبر بالأدلة، وليس إثباتًا لاحتيال ولا لتحريف.',
      'وفق تقرير {lat}ACFE{/lat} لعام {lat}2026{/lat} يستمر الاحتيال {lat}12{/lat} شهرًا في المتوسط قبل اكتشافه، والمتابعة المستمرة تقصّر هذه المدة.',
      'يضيف {lat}Odoo 20{/lat} ضوابط وقائية للتكرار والسداد، أما فحص التاريخ السابق فيحتاج عملية مراجعة مستقلة.'
    ],
    body: [
      { p: 'تخيّل دفعة سداد الموردين في آخر يوم من الربع. فاتورتان في الانتظار تحملان رقم فاتورة المورد نفسه مع اختلاف حرف واحد. ومورد أُنشئ الشهر الماضي يشترك في حساب بنكي مع مورد قديم. وقيد يومية يدوي برقم مقرّب على نحو لافت يُرحَّل مساء آخر يوم في الشهر، بواسطة مستخدم نادرًا ما يرحّل قيودًا يدوية. لا شيء من هذا مخفي، لكن في أغلب الشركات لا ينظر إليه أحد حتى المراجعة السنوية.' },
      { p: 'تقرير الاحتيال المهني لعام {lat}2026{/lat} الصادر عن جمعية فاحصي الاحتيال المعتمدين ({lat}ACFE{/lat})، المبني على {lat}2,402{/lat} حالة من {lat}143{/lat} دولة وإقليمًا، وجد أن الاحتيال يستمر في المتوسط (الوسيط) {lat}12{/lat} شهرًا قبل اكتشافه، وأن البلاغات لا الضوابط ما زالت أول وسيلة اكتشاف بنسبة {lat}43%{/lat} من الحالات. الذكاء الاصطناعي لا يغيّر من يرتكب الاحتيال، لكنه يغيّر سرعة إخبار الدفتر لك بأن شيئًا ما لا يستقيم. نعرض هنا ما تفحصه النماذج، وكيف تُفرز التنبيهات، والحد الذي يجب أن يلتزم به كل فريق مالي: التنبيه ليس دليلًا.' },
      { h2: 'ما كشف الاحتيال المالي بالذكاء الاصطناعي؟' },
      { p: 'كشف الاحتيال المالي بالذكاء الاصطناعي هو استخدام القواعد والنماذج الإحصائية ونماذج اللغة لتقييم كل معاملة في دفاتر الشركة مقابل أنماط مرتبطة بالاحتيال أو الخطأ، بحيث يبدأ المراجع بالأعلى خطرًا بدل عدد عشوائي من البنود. في هذا التعريف ثلاث نقاط حاسمة: أنه يشمل المجتمع الكامل لا العينة، ولذلك مكانه مع [[blog/full-population-testing-ai-vs-sampling/|الانتقال من العينة إلى فحص المجتمع الكامل]]؛ وأن ناتجه درجة خطر لا حكم؛ وأنه ينتهي عند إنسان، لأن النموذج يرتّب ولا يستطيع الحكم على النية.' },
      { p: 'وهو أوسع من الاحتيال. النمط الذي يدل على دفعة احتيالية يدل بالقدر نفسه على تكرار غير مقصود، أو خطأ في الفصل بين الفترات، أو ضريبة مُعدّة بشكل خاطئ. وعمليًا يتبيّن أن معظم التنبيهات أخطاء، وهذه فائدة لا عيب: خطأ يُكتشف في الأسبوع نفسه أيسر تصحيحًا من احتيال يُكتشف بعد عام، والاثنان يعيشان عادة في الضابط الضعيف نفسه.' },
      { h2: 'ما مؤشرات الاحتيال التي يفحصها الذكاء الاصطناعي في الدفتر كله؟' },
      { p: 'المؤشرات التالية هي التي تتكرر في أعمال المراجعة المستمرة لدى {lat}MFT{/lat}. كل منها قابل للفحص من بيانات موجودة أصلًا في نظام {lat}ERP{/lat}، وكل منها يعود إلى ضابط رقابي، وهناك يكون العلاج الدائم.' },
      { table: {
        caption: 'المؤشر، وما يقارنه النموذج، وأول اختبار يجريه المراجع',
        head: ['المؤشر', 'ما يقارنه النموذج', 'أول اختبار للمراجع', 'الضابط المرتبط'],
        rows: [
          ['المدفوعات المكررة وشبه المكررة', 'المورد والقيمة والتاريخ ومرجع الفاتورة، بما في ذلك المراجع التي تختلف بحرف أو بادئة', 'سحب الفاتورتين والدفعتين، والتحقق من وجود توريدين أو خدمتين فعلًا', 'فحص التكرار عند تسجيل الفاتورة و[[blog/three-way-match-purchase-controls/|المطابقة الثلاثية]]'],
          ['الموردون المتشابهون', 'الأسماء والأرقام الضريبية والحسابات البنكية والعناوين في سجل الموردين', 'تتبّع من أنشأ كل سجل ومن اعتمد البيانات البنكية', 'اعتماد التعديلات على سجل الموردين'],
          ['اعتمادات خارج مصفوفة الصلاحيات', 'المعتمِد وشريحة القيمة لكل أمر أو دفعة مقابل المصفوفة المعتمدة', 'التحقق من أن المعتمِد كان يملك الصلاحية في ذلك التاريخ', 'حدود الاعتماد و[[blog/ai-segregation-of-duties-internal-controls/|الفصل بين المهام]]'],
          ['قيود يدوية مقرّبة تُرحَّل متأخرة في آخر الشهر', 'مصدر القيد ووقت الترحيل والمستخدم ودرجة تقريب الرقم', 'قراءة البيان والمستند المؤيد والتحقق من السبب التشغيلي', 'مراجعة قيود اليومية قبل الإقفال'],
          ['أخطاء الفصل بين الفترات', 'تواريخ التسليم والاستلام والفاتورة مقابل الفترة المرحَّل إليها', 'مطابقة حركة البضاعة بالتاريخ المحاسبي', 'إجراء الفصل في نهاية الفترة وتواريخ القفل'],
          ['انحراف تقييم المخزون', 'حركة تكلفة الوحدة مقابل تاريخ الشراء وطريقة التقييم', 'إعادة احتساب تكلفة الأصناف التي تحركت', 'مراجعة التكاليف وإقفال التقييم']
        ]
      } },
      { h2: 'كيف تعمل النماذج التي تُنتج تنبيه الاحتيال؟' },
      { p: 'ثلاث عائلات من الأساليب تؤدي معظم العمل، والإعداد الجاد يستخدمها جميعًا، لأن كلًا منها يلتقط ما تفوته الأخرى.' },
      { h3: 'القواعد: الأنماط المعروفة' },
      { p: 'القواعد تترجم ما يبحث عنه المراجع الخبير أصلًا: المورد والمرجع نفساهما مرتين، ودفعة اعتمدها من أنشأ المورد، وقيد رُحّل بعد إقفال الفترة. القواعد شفافة ويسهل الدفاع عنها في أوراق العمل، لكن ضعفها أنها لا تجد إلا ما فكّر أحدهم في كتابته.' },
      { h3: 'رصد الشذوذ: ما لا يتسق مع المعتاد' },
      { p: 'تتعلم نماذج الشذوذ الصورة المعتادة لكل حساب أو مورد أو مستخدم، ثم تقيّم الخروج عنها: مستخدم لا يرحّل قيودًا يدوية يرحّل فجأة عدة قيود، ومورد يتضاعف معدل فواتيره، وحساب مصروف يُستخدم في ساعة لا يعمل فيها أحد. هذه النماذج تلتقط أنماطًا جديدة، لكنها تنبّه أيضًا على كل تغيير مشروع في النشاط، فمخرجاتها تحتاج فرزًا لا ثقة عمياء.' },
      { h3: 'نماذج اللغة: قراءة النص' },
      { p: 'تقرأ نماذج اللغة ما لا تقوله الأرقام: بيانات القيود، ووصف بنود الفواتير، وأسماء الموردين المكتوبة بالعربية مرة وبالإنجليزية مرة، والفجوة بين ما يقوله القيد والحساب الذي يصيبه. وخطرها معروف لكل من استخدمها: قد تقول ما ليس في البيانات. لهذا تعمل وكلاء {lat}MFT{/lat} وفق قاعدة "الدليل أو الصمت" التي نشرحها في [[blog/ai-audit-trail-zero-hallucination/|مقال مسار التدقيق ومصدر مخرجات الذكاء الاصطناعي]]: الملاحظة التي لا تستشهد بالسجلات التي استُخرجت منها تُرفض ولا تُعرض.' },
      { h2: 'ما الذي لا يعنيه تنبيه الاحتيال؟' },
      { p: 'التنبيه ليس إثباتًا لاحتيال، وليس إثباتًا لتحريف في القوائم أيضًا. هو قول بأن معاملة ما تختلف عن نمط متوقع، وأن لهذا الاختلاف تفسيرًا على أحد أن يجده. ومعاملة التنبيهات كاتهامات تُحدث ضررين: تعرّض الموظف الأمين للشبهة، وتعلّم المنشأة أن تجادل النظام بدل أن تستخدمه.' },
      { quote: 'التنبيه سؤال يطرحه الدفتر، ولا يجيب عنه إلا الدليل.' },
      { p: 'لذلك يجب أن يُغلق كل تنبيه على واحدة من ثلاث نتائج موثقة، والدليل مرفق بها:' },
      { ol: [
        'مُفسَّر: وجد المراجع سببًا مشروعًا (توريد على دفعات، أو دفعة مقدمة متفق عليها، أو فاتورة مصحّحة) وأرفق المستند الذي يثبته.',
        'خطأ أو ثغرة رقابية: لا مؤشر احتيال، لكن هناك خطأ أو ضابط ضعيف. تتحول إلى ملاحظة مراجعة داخلية لها مسؤول وتاريخ مستهدف، مصنّفة حسب الأثر والاحتمال.',
        'مُصعَّد: التفسير غائب، أو يناقض المستندات، أو لا يأتي إلا من الشخص محل الفحص. يذهب التنبيه إلى صاحب الاختصاص في قضايا الاحتيال (عادة رئيس لجنة المراجعة أو المالك أو المستشار القانوني)، خارج خط التبعية للأشخاص المعنيين، وتُحفظ الأدلة قبل سؤال أي أحد.'
      ] },
      { p: 'في الحالة الثالثة: لا مواجهة ولا حذف ولا "تصحيح" صامت. التصحيح لاحقًا وبقيد عكسي، فيبقى السجل الأصلي ومسار التدقيق.' },
      { h2: 'لماذا تهم سرعة الاكتشاف إلى هذا الحد؟' },
      { p: 'لأن الوقت هو ما يحتاجه الاحتيال. يقدّر تقرير {lat}ACFE{/lat} لعام {lat}2026{/lat} المدة الوسيطة قبل الاكتشاف بـ{lat}12{/lat} شهرًا، وهو الرقم نفسه في تقرير {lat}2024{/lat}. وفي أكثر من نصف حالات {lat}2026{/lat} كان هناك غياب لضوابط رقابية أو تجاوز لضوابط قائمة، ومن الضوابط المرتبطة بنتائج أفضل (خسائر أقل واكتشاف أسرع): المتابعة الاستباقية للبيانات، ومراجعة الإدارة، والمراجعات المفاجئة. أما المراجعة السنوية فتفحص العام بعد انتهائه، وكما نوضح في [[blog/continuous-audit-eleven-months/|لماذا تفوت المراجعة السنوية أحد عشر شهرًا]]، تبقى النافذة مفتوحة معظم العام.' },
      { p: 'والمعايير تشير إلى الاتجاه نفسه. يُلزم معيار {lat}ISA 240{/lat} المراجع الخارجي باختبار مدى ملاءمة قيود اليومية، ويتوقع المبدأ {lat}16{/lat} في إطار {lat}COSO{/lat} للرقابة الداخلية تقييمات مستمرة لا منفصلة فقط. نموذج يقيّم القيود أسبوعيًا هو التقييم المستمر في صورته العملية، ونموذج دقيق لا يعمل إلا مرة في السنة مجرد أداة عينة أفضل، لا أكثر.' },
      { h2: 'ماذا يضيف {lat}Odoo 20{/lat} للوقاية من الاحتيال؟' },
      { p: 'وفق ملاحظات إصدار {lat}Odoo 20{/lat}، توجد تغييرات محاسبية تجعل بعض المؤشرات أصعب حدوثًا من الأساس:' },
      { ul: [
        'كشف تكرار الفواتير وفواتير الموردين بمستويين من التحذير: أحمر للتكرار شبه المؤكد، وأصفر للتكرار المحتمل.',
        'معالج سداد يكتشف الدفعات المعلّقة لمنع سداد الفاتورة نفسها مرتين.',
        'اتساق البنك: القيود التي تمس الحسابات البنكية يجب أن تنشأ من معاملات بنكية، فيُغلق الطريق اليدوي إلى رصيد البنك.',
        'تسجيل تغييرات مجموعات المستخدمين في سجل المحادثة الخاص بالمستخدم، فيترك منح صلاحية مؤقتة قبل ترحيل حساس أثرًا.',
        'تشفير قيود يومية النقدية بالبصمة ({lat}hashing{/lat}) عند التسوية.'
      ] },
      { p: 'هذه ضوابط وقائية لحظة التسجيل. لا تنظر إلى عام كامل من التاريخ، ولا تقارن سجل الموردين بحثًا عن التشابه، ولا تقيّم سلوك المستخدم مقابل نمطه المعتاد. والتعامل مع التحذير الأصفر قرار بشري، والتحذير الذي يعتاد الموظفون تجاهله ليس ضابطًا. للاطلاع على بنود الذكاء الاصطناعي في الإصدار وتكلفتها بأرصدة {lat}IAP{/lat}، راجع [[blog/odoo-20-ai-features-accounting/|خريطة مزايا الذكاء الاصطناعي في {lat}Odoo 20{/lat} للمحاسبة]]. وتحقق من كل ميزة في قاعدة بياناتك ونسختك قبل أن تبني عليها ضوابطك.' },
      { h2: 'أين تقف حدود كشف الاحتيال بالذكاء الاصطناعي؟' },
      { ul: [
        'البيانات: النموذج يقيّم ما في الدفتر فقط. النقدية التي تُختلس قبل تسجيلها، أو الاتفاق الجانبي مع مورد، لا يتركان سطرًا يُقيَّم.',
        'التواطؤ: حين يتفق الطالب والمعتمِد، يمر كل ضابط فردي. فحص الأزواج (الطالب مع المعتمِد، والمشتري مع المورد) يقلل الاحتمال ولا يسد الثغرة.',
        'التنبيهات الكاذبة: نموذج غير مضبوط يُغرق المراجعين، والمراجع الغارق يتوقف عن القراءة. ابدأ باختبارات أقل وأدق.',
        'التجاوز خارج النظام: اعتماد يُعطى هاتفيًا ثم يُسجَّل لاحقًا يبدو سليمًا في البيانات.',
        'الأداة نفسها: كل ما يقرأ الدفاتر ويُعدّ مسودات قيود فيها هو مستخدم، ويحتاج الفصل بين المهام والتسجيل نفسيهما المطبّقين على الإنسان.'
      ] },
      { p: 'لا شيء من ذلك سبب للانتظار، بل لاقتران النموذج بمراجعة الإدارة والفحوص المفاجئة وقناة بلاغات ميسّرة، فأكثر من نصف البلاغات يأتي من الموظفين.' },
      { h2: 'من أين يبدأ الفريق المالي يوم الأحد؟' },
      { ol: [
        'خذ المؤشرات الستة في الجدول أعلاه، وحدّد لكل منها الضابط الذي يفترض أن يمنعه ومن يملك هذا الضابط.',
        'صدّر ربعًا واحدًا من فواتير الموردين والمدفوعات وسجل الموردين والقيود اليدوية، وابدأ باختبارات الدفعات المكررة والموردين المتشابهين والقيود المقرّبة المتأخرة. والبيانات نفسها تغذي المطابقة اليومية كما في [[blog/ai-journal-entries-bank-reconciliation/|أتمتة قيود اليومية والتسوية البنكية بالذكاء الاصطناعي]].',
        'اتفق على نتائج الفرز الثلاث، وعلى من يستقبل التصعيد، قبل وصول أول تنبيه.',
        'اضبط الاختبارات على مدى دورتين أو ثلاث: أوقف ما لا يُنتج إلا ضجيجًا، وشدّد ما يكشف مشكلات حقيقية.',
        'انتقل من الفحص الربع سنوي إلى الأسبوعي حين يصبح الفرز قادرًا على مجاراة التنبيهات.'
      ] },
      { p: 'هذه هي الفكرة التي بُنيت عليها منصة {lat}seg-audit{/lat}، منصة المراجعة المستمرة لدى {lat}MFT{/lat}: تقرأ الدفاتر مباشرة من نظام {lat}ERP{/lat} بصلاحية قراءة فقط، وتقيّم كل معاملة حسب الخطر بدل عينة من نسبة ضئيلة، وتحفظ كل ملاحظة بمصدرها ودرجة خطورتها، وتربط الملاحظة المتكررة بسابقاتها، ولا تسمح بإغلاق ملاحظة دون معتمِد مسمّى ومسجّل. ويُعدّ [[intelligence/auditor/|وكيل المراجع من {lat}MFT{/lat}]] مسودات الملاحظات والتصحيحات وفق قاعدة "الدليل أو الصمت"، ثم يعتمدها شخص مسؤول. وإن أردت رأيًا مستقلًا في مواضع ضعف ضوابطك، فإن [[services/internal-audit/|خدمة المراجعة الداخلية لدينا]] تبدأ بهذه الاختبارات تحديدًا.' }
    ],
    faq: [
      { q: 'هل يستطيع الذكاء الاصطناعي كشف الاحتيال المالي وحده؟', a: 'لا. يستطيع تقييم كل معاملة مقابل أنماط مرتبطة بالاحتيال أو الخطأ وترتيب الأعلى خطرًا للمراجعة، لكنه لا يستطيع إثبات النية ولا تأكيد وقوع احتيال. هذا يحتاج شخصًا يفحص المستندات المؤيدة والتفسيرات والسياق، وعند الحاجة تحقيقًا يتولاه صاحب الاختصاص مع حفظ الأدلة.' },
      { q: 'ما أكثر مؤشرات الاحتيال التي يكشفها الذكاء الاصطناعي في الحسابات الدائنة؟', a: 'المدفوعات المكررة وشبه المكررة، وسجلات موردين متشابهة تشترك في حساب بنكي أو رقم ضريبي، والاعتمادات خارج مصفوفة الصلاحيات، والفواتير المسجلة في غير فترتها. كلها قابلة للفحص من بيانات النظام، وكل منها يعود إلى ضابط وقائي محدد مثل فحص التكرار أو اعتماد سجل الموردين أو المطابقة الثلاثية.' },
      { q: 'هل يعني تنبيه الاحتيال أن أحدًا ارتكب احتيالًا؟', a: 'لا. التنبيه يعني أن المعاملة تخرج عن نمط متوقع، ومعظم التنبيهات يتبيّن أنها استثناءات مشروعة أو أخطاء غير مقصودة. يُغلق كل تنبيه على أنه مُفسَّر، أو خطأ وثغرة رقابية، أو مُصعَّد، مع إرفاق الدليل. ولا يُعامَل أحد كمشتبه به بناءً على درجة خطر.' },
      { q: 'ما علاقة كشف الاحتيال بالذكاء الاصطناعي بمعيار {lat}ISA 240{/lat}؟', a: 'يحدد معيار {lat}ISA 240{/lat} مسؤوليات المراجع تجاه الاحتيال ويُلزمه باختبار مدى ملاءمة قيود اليومية. وتقييم كل قيد يدوي حسب عوامل الخطر، كالتوقيت والمستخدم والأرقام المقرّبة، يمنح المراجع الخارجي والمراجعة الداخلية رؤية للمجتمع الكامل يختاران منها. أما الحكم المهني ومتطلبات التوثيق فلا تتغير.' },
      { q: 'هل يتضمن {lat}Odoo 20{/lat} أداة مدمجة لكشف الاحتيال؟', a: 'تصف ملاحظات إصدار {lat}Odoo 20{/lat} ضوابط وقائية لا وحدة لكشف الاحتيال: تحذيرات تكرار حمراء وصفراء على الفواتير، واكتشاف الدفعات المعلّقة في معالج السداد، وقيودًا بنكية يجب أن تنشأ من معاملات بنكية، وتسجيل تغييرات مجموعات المستخدمين. أما تحليل التاريخ السابق فيحتاج عملية مراجعة مستقلة. تحقق من كل ميزة في نسختك.' }
    ],
    sources: [
      { label: 'جمعية فاحصي الاحتيال المعتمدين، {lat}"Occupational Fraud 2026: A Report to the Nations"{/lat} (بيان صحفي، {lat}19{/lat} مايو {lat}2026{/lat})', url: 'https://www.acfe.com/about-the-acfe/newsroom-for-media/press-releases/press-release-detail?s=report-to-the-' },
      { label: 'جمعية فاحصي الاحتيال المعتمدين، {lat}"Occupational Fraud 2024: A Report to the Nations"{/lat} (تقرير، {lat}2024{/lat})', url: 'https://www.acfe.com/en-us/-/media/files/acfe/pdfs/rttn/2024/2024-report-to-the-nations.pdf' },
      { label: '{lat}Odoo{/lat}، {lat}"Odoo 20 Release Notes"{/lat} (سبتمبر {lat}2026{/lat})', url: 'https://www.odoo.com/odoo-20-release-notes' }
    ]
  }
};
