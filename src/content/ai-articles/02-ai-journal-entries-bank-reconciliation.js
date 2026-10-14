// 02. AI for journal entries and bank reconciliation: how to automate safely
module.exports = {
  en: {
    slug: 'ai-journal-entries-bank-reconciliation',
    topic: 'ai',
    author: 'ahmed',
    reviewer: 'practice',
    image: { alt: 'Illustration: scattered transactions flow through a glowing white core onto a white ledger page showing a T-account with debit and credit balanced on one entry highlighted in cyan.' },
    date: '2026-10-14',
    title: 'AI for journal entries and bank reconciliation: automate it safely',
    metaTitle: 'AI journal entries and bank reconciliation',
    dek: 'Which entries AI should draft, how it matches bank lines, what Odoo 20 changes, and the controls that keep every automated match explainable to an auditor.',
    description: 'How AI automates journal entries and bank reconciliation: matching logic, Odoo 20 changes, which entries to automate, and the controls that keep them auditable.',
    keywords: ['AI bank reconciliation', 'automate journal entries with AI', 'AI journal entries', 'automated bank reconciliation Odoo', 'AI reconciliation controls'],
    about: ['Artificial intelligence', 'Bank reconciliation', 'Journal entry', 'Odoo', 'Internal control'],
    answer: 'AI automates journal entries and bank reconciliation by predicting how documents should be coded, matching bank transactions to open invoices, bills and payments, and drafting entries for review. It should handle high-volume, well-evidenced items such as customer receipts and bank charges, while a named person approves judgemental entries, owns matching tolerances and reviews every unmatched or written-off difference.',
    takeaways: [
      'Automate by evidence: the stronger the external proof for an entry, the more the machine can prepare it.',
      'In Odoo 20, entries that hit bank accounts must originate from bank transactions.',
      'Matching tolerances and write-off accounts are control settings with an owner, not user preferences.',
      'Prove the automation on a closed month before any live use, comparing difference by difference.'
    ],
    body: [
      { p: 'Every finance manager knows the suspense account that grows a little each month. A customer pays three invoices in one transfer and the bank deducts a charge; the receipt does not equal any single invoice, so it is parked. A vendor bill is coded the way the last one was, whether or not the last one was right. By year end the reconciliation agrees, but nobody can explain a handful of lines without opening old emails.' },
      { p: 'This is where AI earns its place in accounting: high volumes of entries whose correct treatment is mostly evident from the documents. It is also where careless automation does the most damage, because a wrong match clears a balance that should have stayed open. This article, part of our [[blog/ai-in-accounting-guide-2026/|practical guide to AI in accounting]], sets out how to automate both safely.' },
      { h2: 'What does automating journal entries with AI mean?' },
      { p: 'AI journal entry automation is the use of learned patterns and document reading to prepare entries and reconciliations that a person then reviews and approves, rather than keying each one by hand. In practice it combines four layers, and it helps to know which one you are looking at:' },
      { ul: [
        'Rules: reconciliation models that propose or book a fixed treatment, such as a recurring bank charge. Available in recent Odoo versions; confirm their behaviour in your 20 database.',
        'Extraction: bill digitization (OCR) that reads vendor documents, which in recent Odoo versions consumes IAP credits.',
        'Prediction: according to Odoo’s 20 release notes, when a bill is encoded manually or by import, Odoo suggests the product, account, tax, analytic and vehicle values from bill history and the label.',
        'Agents: the release notes also describe AI agents that can create and update records, including from an uploaded instruction file such as a PDF, and that can be triggered by automated or scheduled actions.'
      ] },
      { h2: 'How does AI match bank transactions?' },
      { p: 'Bank matching is a search for the open item that best explains a statement line. Good matching works in a fixed order, from strongest evidence to weakest, and stops at the first confident answer:' },
      { ol: [
        'Exact reference: the payment reference on the statement equals an invoice or payment number.',
        'Partner and amount: the counterparty is recognised and the amount equals one open item.',
        'Combination: the amount equals the sum of several open items of the same partner.',
        'Tolerance: the amount differs from an open item by less than an agreed tolerance, and the difference goes to a defined write-off account.',
        'No match: the line stays open for a person, with the candidates the system considered.'
      ] },
      { p: 'Odoo 20 formalises much of this. According to Odoo’s 20 release notes, matching rules for invoices and bills now support a payment tolerance and a matching order, you can run Auto Reconciliation manually, and a write-off created during reconciliation can carry an analytic distribution. The AI-powered financial insights feature can review suspected reconciliation errors and return findings and recommendations, working only from the accounting data in your database.' },
      { h3: 'A worked example without amounts' },
      { p: 'Take the customer who pays three invoices in one transfer with a bank charge deducted. Steps 1 and 2 fail: no single reference, no single invoice amount. Step 3 finds the three invoices whose total is close to the receipt. Step 4 accepts the shortfall only if it is within the tolerance the controller set, and books it to the bank charges account with the customer’s analytic tag. If the shortfall is larger, the line stays open, because a customer short-payment is a collection issue, not a bank charge. The rule protects the receivable ledger from being quietly written down.' },
      { h2: 'What does Odoo 20 change in bank and entry controls?' },
      { p: 'The most important change is not AI at all. Odoo’s 20 release notes state that entries impacting bank accounts must originate from bank transactions, with clearer statement validation. A manual journal entry straight to the bank account, the classic way a ledger drifts from the statement, is no longer the normal path. Alongside it, the notes list a bank reconciliation summary report of reconciled and unreconciled items at period end, statement batching and quick reconciliation shortcuts, red and yellow duplicate warnings on invoices and bills, a payment wizard that detects pending payments to prevent double payment, and hashing of cash journal entries on reconciliation. We cover the payables side in [[blog/odoo-20-bank-reconciliation-and-bill-payments/|Odoo 20 bank reconciliation and bill payments]].' },
      { h2: 'Which entries should AI draft, and which should it never touch?' },
      { p: 'Our decision rule is simple: automate in proportion to the external evidence behind the entry. The table applies it to the entries a typical finance team posts every month.' },
      { table: {
        caption: 'Automation decision matrix for common entries',
        head: ['Entry type', 'Evidence available', 'Automation level', 'Control'],
        rows: [
          ['Bank charges and recurring fees', 'Bank statement line', 'Rule or match, auto-proposed', 'Monthly review of the charges account by the controller'],
          ['Customer receipts', 'Statement line plus open invoice', 'AI match within tolerance', 'Weekly list of tolerance write-offs, reviewed and signed'],
          ['Vendor bills with stable history', 'Vendor document plus purchase order', 'Predicted lines, person confirms', 'Override rate tracked; coding policy beats history'],
          ['Accruals and provisions', 'Estimates and judgement', 'AI drafts the schedule only', 'Preparer and approver both named; reversed next period'],
          ['Closing adjustments', 'Analysis, often off-system', 'Draft with cited records', 'Second approver above materiality'],
          ['Correcting entries', 'The original error and its source', 'Agent drafts a reversal and a new entry', 'No deletion; approver is not the preparer'],
          ['Manual entries to bank accounts', 'None beyond the entry itself', 'Not allowed in Odoo 20', 'Bank entries come from bank transactions']
        ]
      } },
      { p: 'Notice what the bottom rows share: the less the external evidence, the more the AI is limited to drafting, and the more the approval depends on [[blog/materiality-isa-320-threshold/|your ISA 320 materiality threshold]].' },
      { h2: 'What controls keep automated entries auditable?' },
      { p: 'The existing [[blog/bank-reconciliation-controls/|bank reconciliation controls]] still apply: an independent reviewer, aged reconciling items, no plugging differences. Automation adds five of its own:' },
      { ul: [
        'A distinct system user for every agent or automation, so the audit trail shows the machine as preparer and a person as approver. How that fits your access matrix is covered in [[blog/ai-segregation-of-duties-internal-controls/|AI, segregation of duties and internal controls]].',
        'Tolerances, write-off accounts and matching order owned by the controller and changed only through a logged approval.',
        'Corrections by reversal, never by deletion, so the original AI proposal remains visible.',
        'Every AI explanation of a match or entry cites the records it used; one that cites nothing is rejected. This is the principle behind [[blog/ai-audit-trail-zero-hallucination/|evidence or silence]].',
        'Lock dates on closed periods, a long-standing Odoo control, so no automation can reach back into a signed-off month.'
      ] },
      { quote: 'Automate the match, never the explanation of a difference.' },
      { h2: 'How do you know the automation is working?' },
      { p: 'Measure it like any other control, monthly and on the full population rather than a sample. Four indicators are enough to start:' },
      { ul: [
        'Auto-match share: the percentage of statement lines matched without manual intervention, tracked by matching rule.',
        'Tolerance write-offs: count and trend of differences booked under tolerance. A rising count is a collection or pricing issue, not an efficiency gain.',
        'Prediction override rate: how often people change a predicted bill line. High rates on one vendor point to bad history.',
        'Reversals of automated entries: each one is a finding about a rule, a model or a document.'
      ] },
      { p: 'These indicators feed straight into the close; see [[blog/ai-month-end-close-financial-reporting/|AI in the monthly close and financial reporting]] for how they fit the close calendar.' },
      { h2: 'What will an auditor test?' },
      { p: 'ISA 240 requires the auditor to test the appropriateness of journal entries, and the population now includes entries prepared by software. Expect an auditor to ask for the list of automation users and rules, the approval log for changes to tolerances, and a full-population extract of entries by preparer. The patterns we look for in our own continuous-audit work are familiar: duplicate and near-duplicate payments, manual entries posted late at month-end in round amounts, and approvals outside the approval matrix. A flagged entry is a question for management, not proof of error or fraud; [[blog/ai-financial-fraud-detection/|AI-based fraud detection]] explains how to treat flags. Testing every entry rather than a sample is covered in [[blog/full-population-testing-ai-vs-sampling/|from sampling to full-population testing]].' },
      { h2: 'Where to start on Monday' },
      { ol: [
        'Export last month’s bank statement lines and your reconciliation, and count lines matched manually, lines parked in suspense and lines older than thirty days.',
        'List every reconciliation model and matching rule in your database, with who created it and what write-off account it uses.',
        'Set a tolerance in writing, approved by the finance manager, before enabling any automatic matching.',
        'Run automatic matching on a copy of the closed month and compare each match with what your team did. Every disagreement is either a rule to fix or a human error found.',
        'Go live on one bank account, review the tolerance write-off list weekly for a full quarter, then extend.'
      ] },
      { p: 'If you are on Odoo, confirm each feature above in your own 20 database and edition before you design around it. Reconciliation rules and approval paths are design decisions for any [[services/odoo-erp/|Odoo ERP implementation]], not settings to leave at default, and our [[intelligence/|MFT Intelligence agents]] draft correcting entries that a named, registered person approves; nothing is auto-posted. For the full rollout sequence, see the [[blog/odoo-20-ai-accounting-step-by-step/|step-by-step guide to AI accounting on Odoo 20]].' }
    ],
    faq: [
      { q: 'Can AI do bank reconciliation automatically?', a: 'AI can propose most matches automatically when the evidence is strong: a matching reference, a known partner and an equal amount, or a combination within an approved tolerance. It should not resolve unexplained differences. Those stay open for a person to investigate, and a reviewer who does not handle payments signs off the reconciliation.' },
      { q: 'What is a payment tolerance in bank reconciliation?', a: 'A payment tolerance is the largest difference between a bank receipt and an open invoice that the system may accept as a match, booking the difference to a defined write-off account. It is a control setting: the controller should own it, approve changes in writing and review the resulting write-offs regularly.' },
      { q: 'Should AI post journal entries without approval?', a: 'No. AI should prepare entries and a named person should approve them, with a second approver above the materiality threshold for judgemental entries. Corrections should be made by reversal, not deletion, so the audit trail shows both what the machine proposed and what a person decided.' },
      { q: 'What does Odoo 20 change for bank entries?', a: 'According to Odoo’s 20 release notes, entries that affect bank accounts must originate from bank transactions, with clearer statement validation. The notes also add a reconciliation summary report at period end, matching rules with payment tolerance and matching order, and the ability to run Auto Reconciliation manually.' },
      { q: 'How do I test AI reconciliation before going live?', a: 'Run it on a copy of a month you have already closed and compare every match with your team’s reconciliation. Each disagreement is either a rule to correct or a human error the automation found. Go live on one bank account first and review the tolerance write-offs weekly for a quarter.' }
    ],
    sources: [
      { label: 'Odoo, "Odoo 20 Release Notes" (Sept 2026)', url: 'https://www.odoo.com/odoo-20-release-notes' }
    ]
  },
  ar: {
    slug: 'ai-journal-entries-bank-reconciliation',
    topic: 'ai',
    author: 'ahmed',
    reviewer: 'practice',
    image: { alt: 'رسم توضيحي: معاملات متناثرة تتدفق عبر نواة بيضاء مضيئة إلى صفحة دفتر بيضاء تُظهر حساب على شكل حرف T يتوازن فيه المدين والدائن على قيد واحد باللون السماوي.' },
    date: '2026-10-14',
    title: 'أتمتة قيود اليومية والتسوية البنكية بالذكاء الاصطناعي دون فقدان الرقابة',
    metaTitle: 'التسوية البنكية وقيود اليومية بالذكاء الاصطناعي',
    dek: 'أي القيود يُعِدّها الذكاء الاصطناعي، وكيف يطابق سطور البنك، وما الذي غيّره {lat}Odoo 20{/lat}، وما الضوابط التي تجعل كل مطابقة آلية قابلة للتفسير أمام المراجع.',
    description: 'كيف يؤتمت الذكاء الاصطناعي قيود اليومية والتسوية البنكية: منطق المطابقة، وتغييرات {lat}Odoo 20{/lat}، وما يصلح للأتمتة، والضوابط التي تحفظ مسار التدقيق.',
    keywords: ['التسوية البنكية بالذكاء الاصطناعي', 'أتمتة قيود اليومية', 'الذكاء الاصطناعي في القيود المحاسبية', 'التسوية البنكية في أودو', 'ضوابط التسوية البنكية'],
    about: ['الذكاء الاصطناعي', 'التسوية البنكية', 'قيد اليومية', '{lat}Odoo{/lat}', 'الرقابة الداخلية'],
    answer: 'يؤتمت الذكاء الاصطناعي قيود اليومية والتسوية البنكية بتوقع التوجيه المحاسبي للمستندات، ومطابقة الحركات البنكية مع الفواتير والمدفوعات المفتوحة، وإعداد مسودات القيود للمراجعة. يناسب البنود الكثيفة الواضحة الأدلة كمتحصلات العملاء وعمولات البنك، بينما يعتمد شخص مسمّى القيود التقديرية، ويملك حدود التسامح في المطابقة، ويراجع كل فرق غير مطابق أو مشطوب.',
    takeaways: [
      'الأتمتة على قدر الدليل: كلما قوي الدليل الخارجي للقيد، أمكن للآلة أن تُعِدّه.',
      'في {lat}Odoo 20{/lat} يجب أن تنشأ القيود التي تمس حسابات البنك من معاملات بنكية.',
      'حدود التسامح وحسابات الشطب إعدادات رقابية لها مالك، لا تفضيلات للمستخدم.',
      'أثبت الأتمتة على شهر مُقفل قبل أي تشغيل فعلي، بمقارنة الفروق واحدًا واحدًا.'
    ],
    body: [
      { p: 'كل مدير مالي يعرف الحساب المعلّق الذي يكبر قليلًا كل شهر. عميل يسدد ثلاث فواتير بتحويل واحد ويخصم البنك عمولته، فلا يساوي المبلغ أي فاتورة بعينها، فيُركن في الحساب المعلّق. وفاتورة مورد تُوجَّه كما وُجّهت سابقتها، سواء كانت السابقة صحيحة أم لا. وفي نهاية السنة تتطابق التسوية في مجملها، لكن لا أحد يستطيع تفسير عدد من السطور دون الرجوع إلى رسائل بريد قديمة.' },
      { p: 'هنا تحديدًا يثبت الذكاء الاصطناعي قيمته في المحاسبة: قيود كثيرة العدد، معالجتها الصحيحة ظاهرة في الغالب من المستندات. وهنا أيضًا تُحدث الأتمتة المتسرعة أكبر الضرر، لأن مطابقة خاطئة تُقفل رصيدًا كان يجب أن يبقى مفتوحًا. هذا المقال جزء من [[blog/ai-in-accounting-guide-2026/|الدليل العملي للذكاء الاصطناعي في المحاسبة]]، ويشرح كيف تؤتمت الاثنين بأمان.' },
      { h2: 'ماذا تعني أتمتة قيود اليومية بالذكاء الاصطناعي؟' },
      { p: 'أتمتة قيود اليومية بالذكاء الاصطناعي هي استخدام الأنماط المتعلَّمة وقراءة المستندات لإعداد القيود والتسويات، ثم يراجعها شخص ويعتمدها، بدل إدخال كل قيد يدويًا. وهي عمليًا أربع طبقات، ومن المفيد أن تعرف أيها أمامك:' },
      { ul: [
        'القواعد: نماذج التسوية التي تقترح معالجة ثابتة أو ترحّلها، كعمولة بنكية متكررة. متاحة في إصدارات {lat}Odoo{/lat} الحديثة، وتأكد من سلوكها في قاعدة بيانات الإصدار {lat}20{/lat} لديك.',
        'الاستخراج: رقمنة فواتير الموردين ({lat}OCR{/lat}) التي تقرأ المستندات، وهي في إصدارات {lat}Odoo{/lat} الحديثة تستهلك رصيد {lat}IAP{/lat}.',
        'التوقع: بحسب ملاحظات إصدار {lat}Odoo 20{/lat}، عند إدخال فاتورة مورد يدويًا أو باستيرادها يقترح النظام المنتج والحساب والضريبة والتوزيع التحليلي والمركبة من تاريخ الفواتير ومن الوصف.',
        'الوكلاء: تصف ملاحظات الإصدار أيضًا وكلاء ذكاء اصطناعي يستطيعون إنشاء السجلات وتعديلها، بما في ذلك من ملف تعليمات مرفوع مثل {lat}PDF{/lat}، ويمكن تشغيلهم من إجراءات آلية أو مجدولة.'
      ] },
      { h2: 'كيف يطابق الذكاء الاصطناعي الحركات البنكية؟' },
      { p: 'المطابقة البنكية ({lat}Bank reconciliation{/lat}) بحث عن البند المفتوح الذي يفسّر سطر الكشف على أفضل وجه. والمطابقة الجيدة تسير بترتيب ثابت من الدليل الأقوى إلى الأضعف، وتتوقف عند أول إجابة واثقة:' },
      { ol: [
        'المرجع المطابق: مرجع الدفع في الكشف يساوي رقم فاتورة أو دفعة.',
        'الطرف والمبلغ: الطرف المقابل معروف والمبلغ يساوي بندًا مفتوحًا واحدًا.',
        'التجميع: المبلغ يساوي مجموع عدة بنود مفتوحة للطرف نفسه.',
        'التسامح: الفرق بين المبلغ وبند مفتوح أقل من حد تسامح متفق عليه، ويُرحّل الفرق إلى حساب شطب محدد.',
        'لا مطابقة: يبقى السطر مفتوحًا لشخص يراجعه، مع البنود المرشحة التي نظر فيها النظام.'
      ] },
      { p: 'ويُقنّن {lat}Odoo 20{/lat} كثيرًا من ذلك. بحسب ملاحظات الإصدار، أصبحت قواعد مطابقة فواتير العملاء والموردين تدعم حد تسامح للدفع وترتيبًا للمطابقة، ويمكن تشغيل التسوية الآلية يدويًا، ويمكن أن يحمل قيد الشطب الناشئ أثناء التسوية توزيعًا تحليليًا. كما تستطيع ميزة التحليلات المالية بالذكاء الاصطناعي مراجعة أخطاء التسوية المشتبه بها وتقديم نتائج وتوصيات، معتمدة على البيانات المحاسبية في قاعدة بياناتك وحدها.' },
      { h3: 'مثال تطبيقي بلا مبالغ' },
      { p: 'لنعد إلى العميل الذي سدد ثلاث فواتير بتحويل واحد بعد خصم عمولة البنك. تفشل الخطوتان الأولى والثانية: لا مرجع واحد، ولا فاتورة واحدة بالمبلغ نفسه. الخطوة الثالثة تجد الفواتير الثلاث التي يقترب مجموعها من المتحصل. والخطوة الرابعة تقبل النقص فقط إن كان ضمن حد التسامح الذي وضعه المراقب المالي، وترحّله إلى حساب عمولات البنك بالوسم التحليلي للعميل. أما إن كان النقص أكبر فيبقى السطر مفتوحًا، لأن نقص سداد العميل مسألة تحصيل لا عمولة بنكية. بهذه القاعدة لا يُخفَّض دفتر المدينين بصمت.' },
      { h2: 'ما الذي يغيّره {lat}Odoo 20{/lat} في ضوابط البنك والقيود؟' },
      { p: 'أهم تغيير ليس ذكاءً اصطناعيًا أصلًا. تنص ملاحظات إصدار {lat}Odoo 20{/lat} على أن القيود التي تمس حسابات البنك يجب أن تنشأ من معاملات بنكية، مع رسائل أوضح عند اعتماد الكشف. القيد اليدوي المباشر على حساب البنك، وهو الطريق التقليدي لابتعاد الدفاتر عن الكشف، لم يعد المسار الطبيعي. وإلى جانبه تذكر الملاحظات تقريرًا ملخصًا للتسوية البنكية بالبنود المسوّاة وغير المسوّاة في نهاية الفترة، وتجميع الكشوف واختصارات للتسوية السريعة، وتحذيرات تكرار حمراء وصفراء على الفواتير، ومعالج دفع يكتشف المدفوعات المعلّقة لمنع السداد المزدوج، وتشفير قيود يومية النقدية ({lat}hashing{/lat}) عند التسوية. وتناولنا جانب الدائنين في [[blog/odoo-20-bank-reconciliation-and-bill-payments/|التسوية البنكية وسداد الموردين في {lat}Odoo 20{/lat}]].' },
      { h2: 'أي القيود يُعِدّها الذكاء الاصطناعي، وأيها لا يقترب منه؟' },
      { p: 'قاعدتنا بسيطة: الأتمتة بقدر الدليل الخارجي الذي يقف خلف القيد. الجدول يطبقها على القيود التي يرحّلها فريق مالي معتاد كل شهر.' },
      { table: {
        caption: 'مصفوفة قرار الأتمتة للقيود الشائعة',
        head: ['نوع القيد', 'الدليل المتاح', 'مستوى الأتمتة', 'الضابط الرقابي'],
        rows: [
          ['عمولات البنك والرسوم المتكررة', 'سطر كشف البنك', 'قاعدة أو مطابقة مقترحة آليًا', 'مراجعة شهرية لحساب العمولات من المراقب المالي'],
          ['متحصلات العملاء', 'سطر الكشف مع الفاتورة المفتوحة', 'مطابقة بالذكاء الاصطناعي ضمن حد التسامح', 'قائمة أسبوعية بشطب فروق التسامح، تُراجع وتوقَّع'],
          ['فواتير موردين بتاريخ مستقر', 'مستند المورد مع أمر الشراء', 'بنود متوقعة يؤكدها شخص', 'متابعة نسبة التعديل؛ سياسة التوجيه مقدَّمة على التاريخ'],
          ['المستحقات والمخصصات', 'تقديرات واجتهاد', 'الذكاء الاصطناعي يُعِدّ الجدول فقط', 'المُعِدّ والمعتمِد مسمّيان؛ يُعكس القيد في الفترة التالية'],
          ['تسويات الإقفال', 'تحليل يتم غالبًا خارج النظام', 'مسودة تستشهد بالسجلات', 'معتمِد ثانٍ فوق حد الأهمية النسبية'],
          ['القيود التصحيحية', 'الخطأ الأصلي ومصدره', 'الوكيل يُعِدّ قيدًا عكسيًا وقيدًا جديدًا', 'لا حذف؛ والمعتمِد غير المُعِدّ'],
          ['قيود يدوية على حسابات البنك', 'لا دليل سوى القيد نفسه', 'غير مسموح في {lat}Odoo 20{/lat}', 'قيود البنك تنشأ من معاملات بنكية']
        ]
      } },
      { p: 'لاحظ ما يجمع الصفوف الأخيرة: كلما قلّ الدليل الخارجي اقتصر دور الذكاء الاصطناعي على الإعداد، وزاد اعتماد الموافقة على [[blog/materiality-isa-320-threshold/|حد الأهمية النسبية وفق {lat}ISA 320{/lat}]].' },
      { h2: 'ما الضوابط التي تحفظ قابلية القيود الآلية للمراجعة؟' },
      { p: '[[blog/bank-reconciliation-controls/|ضوابط التسوية البنكية]] المعروفة تظل قائمة: مراجع مستقل، وأعمار للبنود المعلّقة، ولا ترحيل للفروق إلى حسابات وسيطة لإخفائها. وتضيف الأتمتة خمسة ضوابط خاصة بها:' },
      { ul: [
        'مستخدم مستقل في النظام لكل وكيل أو أتمتة، ليُظهر مسار التدقيق الآلة مُعِدًّا والإنسان معتمِدًا. وكيف يندمج ذلك في مصفوفة الصلاحيات نشرحه في [[blog/ai-segregation-of-duties-internal-controls/|الذكاء الاصطناعي والفصل بين المهام والضوابط الرقابية]].',
        'حدود التسامح وحسابات الشطب وترتيب المطابقة يملكها المراقب المالي، ولا تتغير إلا باعتماد مسجّل.',
        'التصحيح بالقيد العكسي لا بالحذف، ليبقى مقترح الذكاء الاصطناعي الأصلي ظاهرًا.',
        'كل تفسير يقدّمه الذكاء الاصطناعي لمطابقة أو قيد يستشهد بالسجلات التي استخدمها، وما لا يستشهد بشيء يُرفض. هذا هو مبدأ [[blog/ai-audit-trail-zero-hallucination/|الدليل أو الصمت]].',
        'تواريخ الإقفال على الفترات المُقفلة، وهي ضابط قديم في {lat}Odoo{/lat}، حتى لا تصل أي أتمتة إلى شهر تم اعتماده.'
      ] },
      { quote: 'أتمِت المطابقة، ولا تؤتمت أبدًا تفسير الفرق.' },
      { h2: 'كيف تعرف أن الأتمتة تعمل؟' },
      { p: 'قِسها كما تقيس أي ضابط رقابي: شهريًا، وعلى المجتمع الكامل لا على عينة. تكفي أربعة مؤشرات للبداية:' },
      { ul: [
        'نسبة المطابقة الآلية: نسبة سطور الكشف التي طوبقت دون تدخل يدوي، موزعة حسب قاعدة المطابقة.',
        'شطب فروق التسامح: عددها واتجاهها. ارتفاع العدد مشكلة تحصيل أو تسعير، لا مكسب كفاءة.',
        'نسبة تعديل البنود المتوقعة: كم مرة يغيّر الموظفون بند الفاتورة المقترح. ارتفاعها لدى مورد بعينه يدل على تاريخ توجيه سيئ.',
        'القيود العكسية للقيود الآلية: كل واحد منها ملاحظة على قاعدة أو نموذج أو مستند.'
      ] },
      { p: 'وتصب هذه المؤشرات مباشرة في الإقفال؛ راجع [[blog/ai-month-end-close-financial-reporting/|الذكاء الاصطناعي في الإقفال الشهري والتقارير المالية]] لترى موضعها في جدول الإقفال.' },
      { h2: 'ما الذي سيختبره المراجع؟' },
      { p: 'يطلب معيار {lat}ISA 240{/lat} من المراجع اختبار ملاءمة قيود اليومية، والمجتمع الآن يضم قيودًا أعدّتها البرمجيات. توقّع أن يطلب المراجع قائمة مستخدمي الأتمتة وقواعدها، وسجل اعتماد تغييرات حدود التسامح، ومستخرجًا كاملًا للقيود حسب المُعِدّ. والأنماط التي نبحث عنها في أعمال المراجعة المستمرة لدينا مألوفة: مدفوعات مكررة وشبه مكررة، وقيود يدوية مرحّلة متأخرة في آخر الشهر بمبالغ مقرّبة، واعتمادات خارج مصفوفة الصلاحيات. والقيد الذي يظهر عليه تنبيه سؤال يُوجَّه للإدارة، لا دليل على خطأ أو احتيال؛ ويشرح مقال [[blog/ai-financial-fraud-detection/|كشف الاحتيال بالذكاء الاصطناعي]] كيف تُعامل التنبيهات. أما اختبار كل القيود بدل العينة فنتناوله في [[blog/full-population-testing-ai-vs-sampling/|من العينة إلى اختبار المجتمع الكامل]].' },
      { h2: 'من أين تبدأ يوم الأحد القادم' },
      { ol: [
        'صدّر سطور كشف البنك للشهر الماضي وتسويتك له، واحسب السطور المطابقة يدويًا، والسطور المركونة في الحساب المعلّق، والسطور الأقدم من ثلاثين يومًا.',
        'اكتب قائمة بكل نماذج التسوية وقواعد المطابقة في قاعدة بياناتك، ومن أنشأها، وأي حساب شطب تستخدم.',
        'حدّد حد التسامح كتابةً، واعتمده من المدير المالي، قبل تفعيل أي مطابقة آلية.',
        'شغّل المطابقة الآلية على نسخة من الشهر المُقفل وقارن كل مطابقة بما فعله فريقك. كل اختلاف إما قاعدة تحتاج إصلاحًا أو خطأ بشري اكتشفته الأتمتة.',
        'ابدأ التشغيل الفعلي على حساب بنكي واحد، وراجع قائمة شطب فروق التسامح أسبوعيًا لربع كامل، ثم توسّع.'
      ] },
      { p: 'وإن كنت تعمل على {lat}Odoo{/lat} فتأكد من كل ميزة مذكورة هنا في قاعدة بيانات الإصدار {lat}20{/lat} ونسختك قبل أن تبني عليها. قواعد التسوية ومسارات الاعتماد قرارات تصميم في أي [[services/odoo-erp/|تطبيق لنظام {lat}Odoo ERP{/lat}]]، لا إعدادات تُترك على وضعها الافتراضي، و[[intelligence/|وكلاء {lat}MFT Intelligence{/lat}]] يُعِدّون القيود التصحيحية ليعتمدها شخص مسمّى ومسجّل، ولا يُرحَّل شيء آليًا. وللتسلسل الكامل للتطبيق راجع [[blog/odoo-20-ai-accounting-step-by-step/|دليل تطبيق المحاسبة بالذكاء الاصطناعي على {lat}Odoo 20{/lat} خطوة بخطوة]].' }
    ],
    faq: [
      { q: 'هل يستطيع الذكاء الاصطناعي إجراء التسوية البنكية تلقائيًا؟', a: 'يستطيع اقتراح أغلب المطابقات تلقائيًا حين يكون الدليل قويًا: مرجع مطابق، أو طرف معروف ومبلغ مساوٍ، أو مجموعة بنود ضمن حد تسامح معتمد. لكنه لا يجوز أن يحسم الفروق غير المفسّرة، فهذه تبقى مفتوحة ليفحصها شخص، ويعتمد التسوية مراجع لا يتعامل مع المدفوعات.' },
      { q: 'ما هو حد التسامح في التسوية البنكية؟', a: 'حد التسامح هو أكبر فرق بين متحصل بنكي وفاتورة مفتوحة يجوز للنظام قبوله كمطابقة، مع ترحيل الفرق إلى حساب شطب محدد. وهو إعداد رقابي: يملكه المراقب المالي، ويعتمد أي تغيير فيه كتابةً، ويراجع قيود الشطب الناتجة عنه بانتظام.' },
      { q: 'هل يرحّل الذكاء الاصطناعي قيود اليومية دون اعتماد؟', a: 'لا. الذكاء الاصطناعي يُعِدّ القيود وشخص مسمّى يعتمدها، مع معتمِد ثانٍ فوق حد الأهمية النسبية للقيود التقديرية. ويكون التصحيح بالقيد العكسي لا بالحذف، ليُظهر مسار التدقيق ما اقترحته الآلة وما قرره الإنسان معًا، ولا يُرحَّل أي قيد آليًا دون هذا الاعتماد.' },
      { q: 'ما الذي غيّره أودو {lat}20{/lat} في قيود البنك؟', a: 'بحسب ملاحظات إصدار {lat}Odoo 20{/lat}، يجب أن تنشأ القيود التي تمس حسابات البنك من معاملات بنكية، مع رسائل أوضح عند اعتماد الكشف. وأضاف الإصدار تقريرًا ملخصًا للتسوية في نهاية الفترة، وقواعد مطابقة بحد تسامح وترتيب للمطابقة، وإمكانية تشغيل التسوية الآلية يدويًا.' },
      { q: 'كيف أختبر التسوية بالذكاء الاصطناعي قبل التشغيل الفعلي؟', a: 'شغّلها على نسخة من شهر أقفلته بالفعل، وقارن كل مطابقة بتسوية فريقك. كل اختلاف إما قاعدة تحتاج تصحيحًا أو خطأ بشري اكتشفته الأتمتة. ثم ابدأ بحساب بنكي واحد، وراجع شطب فروق التسامح أسبوعيًا طوال ربع سنة.' }
    ],
    sources: [
      { label: 'أودو، {lat}"Odoo 20 Release Notes"{/lat} (سبتمبر {lat}2026{/lat})', url: 'https://www.odoo.com/odoo-20-release-notes' }
    ]
  }
};
