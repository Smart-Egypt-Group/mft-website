// 06. From sampling to full-population testing with AI
module.exports = {
  en: {
    slug: 'full-population-testing-ai-vs-sampling',
    topic: 'audit',
    author: 'ahmed',
    reviewer: 'practice',
    date: '2026-10-14',
    title: 'Full-population testing with AI vs audit sampling: a practical guide',
    metaTitle: 'Full-Population Testing with AI vs Audit Sampling',
    dek: 'Testing every transaction removes sampling risk for what you test. It also creates new obligations: complete data, well-designed tests and a person who evaluates every exception.',
    description: 'Full-population testing with AI versus audit sampling under ISA 530: what changes, what risks remain, and a worked procedure for testing every vendor bill.',
    keywords: [
      'full-population testing',
      'audit sampling vs 100% testing',
      'AI audit analytics',
      'ISA 530 audit sampling',
      'testing every transaction'
    ],
    about: ['Audit sampling', 'Full-population testing', 'Artificial intelligence', 'Audit evidence', 'ISA 530'],
    answer: 'Full-population testing with AI means running an audit procedure on every transaction in a defined population instead of a statistical or judgemental sample. It removes sampling risk for the attributes tested, but it does not remove the need to prove the data is complete, design the right tests, and have a person evaluate each exception against evidence.',
    takeaways: [
      'Testing every item answers a different question from sampling: not “is the error rate acceptable?” but “which items are wrong?”',
      'The remaining risks are incomplete data, a badly designed test and a misjudged exception.',
      'Reconcile the extracted population to the trial balance before running any test.',
      'Sampling still has a place where evidence is physical, external or costly per item.'
    ],
    body: [
      { p: 'An audit senior opens the payables population for the year: several thousand vendor bills. The plan calls for a few dozen items, selected with care and documented properly. The sample comes back clean, and the file says so. In the same population, two bills from the same vendor carry the same reference a week apart, and neither was selected. The sample was correct. It was also silent about the two items that mattered.' },
      { p: 'Sampling exists because, for most of audit history, testing everything was impossible within any sensible budget. That constraint has largely gone for anything held in a ledger. The question is no longer whether you can test every transaction, but what changes in your method, your evidence and your judgement when you do. This guide answers that, with a worked procedure you can run on your own data.' },
      { h2: 'What is full-population testing?' },
      { p: 'Full-population testing is applying an audit procedure to every item in a defined population, such as all vendor bills posted in a year, rather than to a selected subset. ISA 530 governs audit sampling, where the auditor applies procedures to less than the whole population and draws a conclusion about the rest. When every item is tested, there is no extrapolation and therefore no sampling risk for that test. What remains is the risk that the population is incomplete, that the test is wrong, or that someone misreads an exception.' },
      { p: 'Definition is half the work. “All purchases” is not a population; “all posted vendor bills and credit notes in the purchase journals between two dates, for all companies in the database” is. If the definition is loose, the test is complete only for the part you happened to extract. Full-population testing is one of the engines of [[blog/continuous-auditing-ai-vs-traditional-audit/|continuous auditing with AI]], and the series hub on [[blog/ai-in-accounting-guide-2026/|AI in accounting]] shows where it fits among the other uses.' },
      { h2: 'How is it different from audit sampling under ISA 530?' },
      { table: {
        caption: 'Audit sampling and full-population testing compared',
        head: ['Aspect', 'Audit sampling (ISA 530)', 'Full-population testing with AI'],
        rows: [
          ['Question answered', 'Is the error rate or misstatement in the population acceptable?', 'Which specific items fail the test?'],
          ['Risk that remains', 'Sampling risk plus non-sampling risk', 'Non-sampling risk only: wrong test, incomplete data, misjudged exception'],
          ['Completeness check', 'Population defined, then sampled', 'Extracted population reconciled to the ledger before testing'],
          ['Exceptions', 'Few, each investigated, then projected', 'Many, ranked by risk, each resolved or explained'],
          ['Documentation (ISA 230)', 'Selection method, items tested, results, projection', 'Test logic, population totals, every exception and its resolution'],
          ['Effort profile', 'Spread across document inspection', 'Concentrated in test design and exception review'],
          ['Best suited to', 'Physical, external or costly-per-item evidence', 'Attributes visible in ledger and system data']
        ]
      } },
      { p: 'The first row is the one people miss. Sampling estimates; full-population testing identifies. That changes what you do with the result. A projected error is evaluated against materiality as a whole. An identified exception is a specific record with a specific owner, and it needs a specific resolution.' },
      { h2: 'Does testing 100% of transactions mean 100% assurance?' },
      { p: 'No, and claiming it would be a documentation problem waiting to happen. A test detects only what it was designed to detect. A duplicate test on reference numbers will not find a duplicate entered with a different reference. A cut-off test on dates will not find a sale that should never have been recorded. ISA 500 asks whether information used as audit evidence is relevant and reliable, and that applies to the extract and the test logic as much as to any document. The IAASB’s August 2026 exposure drafts revising ISA 500, ISA 330 and ISA 520 address the increased use of technology; comments are due by 15 December 2026 and the drafts are not yet final, so watch the wording rather than anticipate it.' },
      { p: 'A decision rule we use: describe a full-population test by the attribute it proves and the population it covers, never as “all transactions tested”. “Every posted vendor bill in the year was tested for duplicate vendor and reference” is a claim you can defend. “AP was tested 100%” is not.' },
      { h2: 'How does AI help test a full population?' },
      { h3: 'Preparing the data' },
      { p: 'Before any test, profile the population: count of records, totals by period, blank fields, users who posted, posting dates outside the period. Then reconcile totals to the trial balance. AI is useful here for spotting inconsistent text, such as one vendor written five ways, but the reconciliation itself is arithmetic and should stay deterministic.' },
      { h3: 'Testing and ranking' },
      { p: 'Rules test attributes: duplicates, approvals, dates, round amounts. Models then rank all items by risk so that reviewers start at the top rather than in posting order. Ranking is what makes a full population workable: a reviewer cannot read every line, but can read the riskiest ones first and document why the rest were not escalated.' },
      { h3: 'Documenting' },
      { p: 'Language models can draft the exception narrative and the working paper. The safeguard is that every statement cites the records it was drawn from; anything else is rejected. That principle, evidence or silence, is covered in [[blog/ai-audit-trail-zero-hallucination/|our article on AI provenance and the audit trail]].' },
      { h2: 'A worked example: testing every vendor bill in a quarter' },
      { p: 'The procedure below uses no amounts. It can be run on any ERP; where Odoo features are mentioned, confirm them in your own database and edition.' },
      { ol: [
        'Define the population: all posted vendor bills and credit notes in the purchase journals for the quarter, for every company in scope.',
        'Reconcile: the count and total of the extract must agree with the movement on the payables control account for the same period. If they do not, stop and find the gap.',
        'Test exact duplicates: same vendor, same reference, same amount. Odoo’s 20 release notes add duplicate detection on invoices and bills with two levels, red for highly likely and yellow for potential duplicates; compare your results with those warnings to learn whether the system control is working.',
        'Test near-duplicates: same vendor and amount within a short date window but a different reference, and vendors whose names differ only slightly.',
        'Test approvals: bills linked to purchase orders that exceeded the approval threshold without a manager’s validation. In recent Odoo versions this rests on the Purchase Order Approval setting; confirm how it is configured in your 20 database, and see [[blog/three-way-match-purchase-controls/|three-way match purchase controls]] for the matching side.',
        'Test segregation: the same user created the vendor, raised the order and validated the bill, a pattern explored in [[blog/ai-segregation-of-duties-internal-controls/|AI and segregation of duties]].',
        'Test cut-off: bill date and posting period disagree around the quarter end.',
        'Rank all exceptions by risk and review from the top, recording the conclusion for each.'
      ] },
      { h2: 'How should exceptions be evaluated?' },
      { p: 'Every exception ends in one of four categories, and the category decides what happens next.' },
      { ul: [
        'Explained: a legitimate item, such as a recurring monthly bill. Record the evidence that explains it and consider refining the test.',
        'Control deviation: the control did not operate, but no misstatement resulted. Report it as a control finding with an owner.',
        'Misstatement: the books are wrong. Quantify it, evaluate it against materiality as described in [[blog/materiality-isa-320-threshold/|our note on ISA 320 thresholds]], and correct it by reversal, never by deletion.',
        'Fraud indicator: an item that calls for the inquiries ISA 240 requires. It is not proof; [[blog/ai-financial-fraud-detection/|AI-based fraud detection]] explains why a flag is a question, not a conclusion.'
      ] },
      { quote: 'Testing every transaction removes sampling risk. It does not remove the duty to be right about what you tested.' },
      { h2: 'When is sampling still the right tool?' },
      { p: 'When the evidence is not in the system. Physical inventory, external confirmations, inspection of a signed contract or a site visit cost the same per item whether or not you have AI, so sampling remains the rational choice. The two approaches also combine well: use the full population to identify high-risk strata, test those strata fully, and sample the low-risk remainder where documentary evidence is needed. The ACFE’s 2024 Report to the Nations found that proactive data monitoring and analysis was among the anti-fraud controls associated with roughly half the losses and duration, which argues for running analytics across the population, not for abandoning judgement about where to look closer.' },
      { h2: 'Where to start on Monday' },
      { p: 'Choose one population you already sample, most often payables. Define it precisely, reconcile it to the trial balance, and run the five tests from the worked example on the last closed quarter. Then compare: what did the full-population tests find that the last sample did not, and how many exceptions turned out to be explained items? That comparison is your calibration, and your first working paper.' },
      { p: 'This is the method behind MFT’s seg-audit platform, which reads the books from the ERP read-only and scores every transaction by risk instead of sampling a few percent. Every finding has a source in the books, is classified against the ISAs, and keeps an evidence trail that external auditors can use. If you want the analysis run for you, our [[services/internal-audit/|internal audit service]] and the [[intelligence/auditor/|Auditor agent]], which drafts findings for a named person to approve, are where to start.' }
    ],
    faq: [
      { q: 'Is full-population testing allowed under ISA 530?', a: 'ISA 530 governs audit sampling, which applies when procedures cover less than the whole population. Testing every item is not sampling, so there is no sampling risk to evaluate for that test. The other standards still apply: the data must be reliable under ISA 500 and the work documented under ISA 230.' },
      { q: 'Does 100% testing mean the auditor finds every error?', a: 'No. A full-population test finds only the errors it was designed to find, in the data that was extracted. Errors of a different type, transactions never recorded, and items outside the defined population remain undetected. Describe each test by the attribute and the population it covers.' },
      { q: 'How do you handle thousands of exceptions from full-population testing?', a: 'Rank exceptions by risk, review from the top, and refine tests that produce mostly explained items. Suppress a recurring pattern only with a recorded reason and approver. A queue that nobody can clear is a design problem in the tests, not a reason to return to sampling.' },
      { q: 'What data do I need to start full-population testing?', a: 'A complete extract of the population with record ids, dates, users, vendors or customers, references, amounts and approval data, plus the trial balance for the same period. Reconcile the extract to the ledger first; without that reconciliation, the test is complete only for the data you happened to receive.' },
      { q: 'Can external auditors rely on full-population tests run by the company?', a: 'They can consider them, but reliance is their decision. They will want to understand the data source, how completeness was checked, the logic of each test, and how exceptions were resolved. A documented trail from each finding back to the ledger records makes that evaluation much easier.' }
    ],
    sources: [
      { label: 'IAASB, "Project update: ISA 500, Audit Evidence" (exposure drafts issued August 2026)', url: 'https://www.iaasb.org/publications/project-update-isa-500-audit-evidence' },
      { label: 'ACFE, "Occupational Fraud 2024: A Report to the Nations" (report, 2024)', url: 'https://www.acfe.com/en-us/-/media/files/acfe/pdfs/rttn/2024/2024-report-to-the-nations.pdf' }
    ]
  },
  ar: {
    slug: 'full-population-testing-ai-vs-sampling',
    topic: 'audit',
    author: 'ahmed',
    reviewer: 'practice',
    date: '2026-10-14',
    title: 'من العينة إلى اختبار المجتمع الكامل بالذكاء الاصطناعي: دليل عملي للمراجعين',
    metaTitle: 'اختبار المجتمع الكامل بالذكاء الاصطناعي بدلًا من العينة',
    dek: 'اختبار كل معاملة يلغي خطر العينة فيما تختبره، لكنه يفرض التزامات جديدة: بيانات كاملة، واختبارات محكمة التصميم، وشخص يقيّم كل استثناء.',
    description: 'اختبار المجتمع الكامل بالذكاء الاصطناعي مقابل العينة وفق {lat}ISA 530{/lat}: ما الذي يتغير، وما المخاطر الباقية، وإجراء عملي لاختبار كل فواتير المورّدين.',
    keywords: [
      'اختبار المجتمع الكامل',
      'العينة في المراجعة',
      'الذكاء الاصطناعي في المراجعة',
      'العينات الإحصائية في المراجعة',
      'اختبار كل المعاملات'
    ],
    about: ['العينة في المراجعة', 'اختبار المجتمع الكامل', 'الذكاء الاصطناعي', 'أدلة المراجعة', '{lat}ISA 530{/lat}'],
    answer: 'اختبار المجتمع الكامل بالذكاء الاصطناعي يعني تطبيق إجراء المراجعة على كل معاملة في مجتمع محدد بدلًا من عينة إحصائية أو حكمية. وهو يلغي خطر العينة في الخصائص المختبرة، لكنه لا يلغي الحاجة إلى إثبات اكتمال البيانات، وتصميم الاختبار الصحيح، وتقييم شخص مسؤول لكل استثناء مقابل الدليل.',
    takeaways: [
      'اختبار كل البنود يجيب عن سؤال مختلف: لا «هل معدل الخطأ مقبول؟» بل «أي البنود خاطئ؟»',
      'المخاطر الباقية هي البيانات الناقصة والاختبار سيئ التصميم والاستثناء الذي يُساء تقديره.',
      'طابق المجتمع المستخرج مع ميزان المراجعة قبل تشغيل أي اختبار.',
      'تبقى العينة مناسبة حين يكون الدليل ماديًا أو خارجيًا أو مكلفًا لكل بند.'
    ],
    body: [
      { p: 'يفتح المراجع الأول مجتمع الموردين للسنة: آلاف الفواتير. والخطة تطلب بضع عشرات من البنود، تُختار بعناية وتُوثَّق كما يجب. تعود العينة نظيفة، ويقول الملف ذلك. وفي المجتمع نفسه فاتورتان من المورّد ذاته تحملان المرجع نفسه بفارق أسبوع، ولم تقع أي منهما في العينة. كانت العينة صحيحة، وكانت صامتة عن البندين الوحيدين المهمين.' },
      { p: 'وُجدت العينة لأن اختبار كل شيء كان، طوال معظم تاريخ المهنة، مستحيلًا ضمن أي موازنة معقولة. هذا القيد زال إلى حد كبير في كل ما يُحفظ في دفتر الأستاذ. فلم يعد السؤال هل تستطيع اختبار كل معاملة، بل ما الذي يتغير في منهجك وأدلتك وحكمك المهني حين تفعل. وهذا ما يجيب عنه الدليل، مع إجراء عملي تطبقه على بياناتك.' },
      { h2: 'ما اختبار المجتمع الكامل؟' },
      { p: 'اختبار المجتمع الكامل هو تطبيق إجراء مراجعة على كل بند في مجتمع محدد، مثل كل فواتير المورّدين المرحّلة في سنة، بدلًا من مجموعة مختارة منه. ويحكم معيار {lat}ISA 530{/lat} العينة في المراجعة، حين يطبق المراجع إجراءاته على أقل من المجتمع كله ثم يستنتج حكمًا على الباقي. أما حين يُختبر كل بند فلا يوجد تعميم، وبالتالي لا يوجد خطر عينة في ذلك الاختبار. ويبقى خطر أن يكون المجتمع ناقصًا، أو الاختبار خاطئًا، أو أن يُساء فهم استثناء.' },
      { p: 'التعريف نصف العمل. «كل المشتريات» ليست مجتمعًا؛ أما «كل فواتير المورّدين وإشعارات الخصم المرحّلة في يوميات المشتريات بين تاريخين، لكل الشركات في قاعدة البيانات» فهي مجتمع. وإن كان التعريف فضفاضًا فالاختبار كامل فقط للجزء الذي صادف أنك استخرجته. واختبار المجتمع الكامل أحد محركات [[blog/continuous-auditing-ai-vs-traditional-audit/|المراجعة المستمرة بالذكاء الاصطناعي]]، ويبيّن [[blog/ai-in-accounting-guide-2026/|دليلنا للذكاء الاصطناعي في المحاسبة]] موقعه بين الاستخدامات الأخرى.' },
      { h2: 'كيف يختلف عن العينة وفق {lat}ISA 530{/lat}؟' },
      { table: {
        caption: 'مقارنة بين العينة في المراجعة واختبار المجتمع الكامل',
        head: ['الجانب', 'العينة ({lat}ISA 530{/lat})', 'اختبار المجتمع الكامل بالذكاء الاصطناعي'],
        rows: [
          ['السؤال الذي يجيب عنه', 'هل معدل الخطأ أو التحريف في المجتمع مقبول؟', 'أي البنود بعينها تفشل في الاختبار؟'],
          ['الخطر الباقي', 'خطر العينة وخطر غير متعلق بالعينة', 'خطر غير متعلق بالعينة فقط: اختبار خاطئ، بيانات ناقصة، استثناء يُساء تقديره'],
          ['فحص الاكتمال', 'يُحدَّد المجتمع ثم تُسحب العينة', 'يُطابَق المجتمع المستخرج مع الأستاذ قبل الاختبار'],
          ['الاستثناءات', 'قليلة، يُفحص كل منها ثم يُعمَّم', 'كثيرة، مرتبة حسب الخطر، ويُحسم أو يُفسَّر كل منها'],
          ['التوثيق ({lat}ISA 230{/lat})', 'طريقة الاختيار والبنود المختبرة والنتائج والتعميم', 'منطق الاختبار وإجماليات المجتمع وكل استثناء وطريقة حسمه'],
          ['توزيع الجهد', 'موزع على فحص المستندات', 'مركّز في تصميم الاختبار ومراجعة الاستثناءات'],
          ['الأنسب له', 'الأدلة المادية أو الخارجية أو المكلفة لكل بند', 'الخصائص الظاهرة في بيانات الأستاذ والنظام']
        ]
      } },
      { p: 'السطر الأول هو ما يغفل عنه كثيرون. العينة تُقدّر، واختبار المجتمع الكامل يُعيّن. وهذا يغيّر ما تفعله بالنتيجة: فالخطأ المعمَّم يُقيَّم مقابل الأهمية النسبية ككل، أما الاستثناء المعيَّن فهو سجل محدد له مسؤول محدد، ويحتاج إلى حسم محدد.' },
      { h2: 'هل اختبار {lat}100%{/lat} من المعاملات يعني تأكيدًا بنسبة {lat}100%{/lat}؟' },
      { p: 'لا، والادعاء بذلك مشكلة توثيق تنتظر أن تقع. فالاختبار لا يكتشف إلا ما صُمم لاكتشافه. اختبار التكرار على أرقام المراجع لن يجد فاتورة مكررة أُدخلت بمرجع مختلف، واختبار الفصل الزمني على التواريخ لن يجد مبيعات ما كان يجب أن تُسجَّل أصلًا. ويسأل {lat}ISA 500{/lat} هل المعلومات المستخدمة كدليل مراجعة ملائمة وموثوقة، وهذا ينطبق على المستخرج ومنطق الاختبار بقدر ما ينطبق على أي مستند. كما أن مسودات العرض التي أصدرها {lat}IAASB{/lat} في أغسطس {lat}2026{/lat} لتعديل {lat}ISA 500{/lat} و{lat}ISA 330{/lat} و{lat}ISA 520{/lat} تعالج التوسع في استخدام التقنية، وآخر موعد للتعليقات {lat}15{/lat} ديسمبر {lat}2026{/lat}، وهي ليست نهائية بعد، فتابع الصياغة ولا تستبقها.' },
      { p: 'قاعدة نعمل بها: صِف اختبار المجتمع الكامل بالخاصية التي يثبتها والمجتمع الذي يغطيه، ولا تكتب أبدًا «اختُبرت كل المعاملات». عبارة «اختُبرت كل فاتورة مورّد مرحّلة خلال السنة للتحقق من تكرار المورّد والمرجع» ادعاء تستطيع الدفاع عنه، أما «اختُبرت الذمم الدائنة بنسبة {lat}100%{/lat}» فلا.' },
      { h2: 'كيف يساعد الذكاء الاصطناعي في اختبار المجتمع الكامل؟' },
      { h3: 'تجهيز البيانات' },
      { p: 'قبل أي اختبار، صِف المجتمع: عدد السجلات، والإجماليات حسب الفترة، والحقول الفارغة، والمستخدمون الذين رحّلوا، وتواريخ الترحيل خارج الفترة. ثم طابق الإجماليات مع ميزان المراجعة. والذكاء الاصطناعي مفيد هنا في رصد النصوص غير المتسقة، كمورّد واحد مكتوب بخمس صيغ، أما المطابقة نفسها فعملية حسابية يجب أن تبقى قطعية.' },
      { h3: 'الاختبار والترتيب' },
      { p: 'القواعد تختبر الخصائص: التكرار والاعتمادات والتواريخ والمبالغ المقرّبة. ثم ترتب النماذج كل البنود حسب الخطر ليبدأ المراجع من الأعلى لا بترتيب الترحيل. والترتيب هو ما يجعل المجتمع الكامل قابلًا للعمل: فالمراجع لا يستطيع قراءة كل سطر، لكنه يستطيع قراءة الأخطر أولًا وتوثيق سبب عدم تصعيد الباقي.' },
      { h3: 'التوثيق' },
      { p: 'تستطيع النماذج اللغوية صياغة سرد الاستثناء وورقة العمل. والضمانة أن تستشهد كل عبارة بالسجلات التي أُخذت منها، وإلا رُفضت. هذا المبدأ، «الدليل أو الصمت»، نشرحه في [[blog/ai-audit-trail-zero-hallucination/|مقالنا عن مصدر مخرجات الذكاء الاصطناعي ومسار التدقيق]].' },
      { h2: 'مثال تطبيقي: اختبار كل فواتير المورّدين في ربع سنة' },
      { p: 'الإجراء التالي بلا مبالغ، ويمكن تطبيقه على أي نظام {lat}ERP{/lat}؛ وحيث نذكر خصائص في {lat}Odoo{/lat} فتحقق منها في قاعدة بياناتك وإصدارك.' },
      { ol: [
        'حدّد المجتمع: كل فواتير المورّدين وإشعارات الخصم المرحّلة في يوميات المشتريات خلال الربع، لكل شركة داخل النطاق.',
        'طابق: يجب أن يتفق عدد السجلات المستخرجة وإجماليها مع حركة حساب مراقبة الموردين للفترة نفسها، وإن لم يتفقا فتوقف وابحث عن الفجوة.',
        'اختبر التكرار الحرفي: المورّد نفسه والمرجع نفسه والمبلغ نفسه. وتضيف ملاحظات إصدار {lat}Odoo 20{/lat} كشفًا للتكرار في الفواتير بمستويين، أحمر للتكرار المرجح جدًا وأصفر للتكرار المحتمل؛ قارن نتائجك بتلك التحذيرات لتعرف هل يعمل الضابط داخل النظام.',
        'اختبر شبه التكرار: المورّد والمبلغ نفساهما خلال أيام قليلة بمرجع مختلف، والمورّدون الذين لا تختلف أسماؤهم إلا قليلًا.',
        'اختبر الاعتمادات: فواتير مربوطة بأوامر شراء تجاوزت حد الاعتماد دون موافقة المدير. في إصدارات {lat}Odoo{/lat} الحديثة يقوم ذلك على إعداد {lat}Purchase Order Approval{/lat}، فتحقق من ضبطه في قاعدة {lat}Odoo 20{/lat} لديك، وراجع [[blog/three-way-match-purchase-controls/|ضوابط المطابقة الثلاثية في المشتريات]] لجانب المطابقة.',
        'اختبر الفصل بين المهام: المستخدم نفسه أنشأ المورّد وأصدر أمر الشراء واعتمد الفاتورة، وهو نمط نتناوله في [[blog/ai-segregation-of-duties-internal-controls/|الذكاء الاصطناعي والفصل بين المهام]].',
        'اختبر الفصل الزمني: تاريخ الفاتورة لا يتفق مع فترة الترحيل حول نهاية الربع.',
        'رتّب كل الاستثناءات حسب الخطر وراجعها من الأعلى، مع تسجيل الاستنتاج لكل منها.'
      ] },
      { h2: 'كيف تُقيَّم الاستثناءات؟' },
      { p: 'ينتهي كل استثناء إلى واحدة من أربع فئات، والفئة تحدد ما يحدث بعدها.' },
      { ul: [
        'مُفسَّر: بند مشروع، كفاتورة شهرية متكررة. سجّل الدليل الذي يفسّره وفكّر في تحسين الاختبار.',
        'انحراف في الضابط: الضابط لم يعمل لكن لم ينتج تحريف. يُرفع كملاحظة رقابية لها مسؤول.',
        'تحريف: الدفاتر خاطئة. حدّد قيمته، وقيّمه مقابل الأهمية النسبية كما في [[blog/materiality-isa-320-threshold/|مقالنا عن حدود {lat}ISA 320{/lat}]]، وصحّحه بقيد عكسي لا بالحذف أبدًا.',
        'مؤشر احتيال: بند يستدعي الاستفسارات التي يتطلبها {lat}ISA 240{/lat}. وهو ليس دليلًا؛ ويشرح مقال [[blog/ai-financial-fraud-detection/|كشف الاحتيال المالي بالذكاء الاصطناعي]] لماذا يكون التنبيه سؤالًا لا استنتاجًا.'
      ] },
      { quote: 'اختبار كل معاملة يلغي خطر العينة، لكنه لا يعفيك من أن تكون محقًا فيما اختبرته.' },
      { h2: 'متى تظل العينة هي الأداة الصحيحة؟' },
      { p: 'حين لا يكون الدليل داخل النظام. فالجرد الفعلي والمصادقات الخارجية وفحص عقد موقّع أو زيارة موقع تكلّف الشيء نفسه لكل بند بوجود الذكاء الاصطناعي أو بدونه، فتبقى العينة الخيار الرشيد. والمنهجان يتكاملان جيدًا: استخدم المجتمع الكامل لتحديد الطبقات عالية الخطر، واختبر تلك الطبقات بالكامل، واسحب عينة من الباقي منخفض الخطر حيث يلزم دليل مستندي. وقد وجد تقرير {lat}ACFE{/lat} لعام {lat}2024{/lat} أن المتابعة والتحليل الاستباقي للبيانات كان من ضوابط مكافحة الاحتيال المرتبطة بنحو نصف الخسائر والمدة، وهذا حجة لتشغيل التحليلات على المجتمع كله، لا للتخلي عن الحكم المهني في اختيار ما يستحق نظرة أقرب.' },
      { h2: 'من أين تبدأ يوم الإثنين؟' },
      { p: 'اختر مجتمعًا تسحب منه عينة اليوم، وغالبًا سيكون الموردين. عرّفه بدقة، وطابقه مع ميزان المراجعة، وشغّل الاختبارات الخمسة من المثال على آخر ربع مقفل. ثم قارن: ماذا وجدت اختبارات المجتمع الكامل ولم تجده آخر عينة، وكم استثناء تبيّن أنه بند مُفسَّر؟ هذه المقارنة هي معايرتك، وأول ورقة عمل لديك.' },
      { p: 'هذا هو المنهج الذي تقوم عليه منصة {lat}seg-audit{/lat} الخاصة بـ{lat}MFT{/lat}، التي تقرأ الدفاتر من نظام {lat}ERP{/lat} قراءة فقط وتقيّم كل معاملة حسب الخطر بدلًا من سحب عينة بنسبة صغيرة. لكل ملاحظة مصدر في الدفاتر، وتصنيف وفق معايير المراجعة الدولية، ومسار أدلة يستطيع المراجع الخارجي استخدامه. وإن أردت أن يُنفَّذ التحليل لك، فابدأ من [[services/internal-audit/|خدمة المراجعة الداخلية]] لدينا ووكيل [[intelligence/auditor/|المراجع الذكي]] الذي يصوغ الملاحظات كمسودات يعتمدها شخص مسمّى.' }
    ],
    faq: [
      { q: 'هل يسمح {lat}ISA 530{/lat} باختبار المجتمع الكامل؟', a: 'يحكم {lat}ISA 530{/lat} العينة في المراجعة، وينطبق حين تغطي الإجراءات أقل من المجتمع كله. واختبار كل بند ليس عينة، فلا يوجد خطر عينة يُقيَّم في ذلك الاختبار. لكن المعايير الأخرى تظل سارية: يجب أن تكون البيانات موثوقة وفق {lat}ISA 500{/lat}، وأن يُوثَّق العمل وفق {lat}ISA 230{/lat}.' },
      { q: 'هل يعني اختبار {lat}100%{/lat} أن المراجع يجد كل خطأ؟', a: 'لا. اختبار المجتمع الكامل يجد فقط الأخطاء التي صُمم لاكتشافها، في البيانات التي استُخرجت. أما الأخطاء من نوع آخر، والمعاملات التي لم تُسجَّل أصلًا، والبنود خارج المجتمع المحدد، فتبقى دون اكتشاف. لذلك صِف كل اختبار بالخاصية والمجتمع اللذين يغطيهما.' },
      { q: 'كيف أتعامل مع آلاف الاستثناءات من اختبار المجتمع الكامل؟', a: 'رتّب الاستثناءات حسب الخطر، وراجع من الأعلى، وحسّن الاختبارات التي تُخرج غالبًا بنودًا مُفسَّرة. ولا تستبعد نمطًا متكررًا إلا بسبب مسجّل ومعتمِد. القائمة التي لا يستطيع أحد تصفيتها مشكلة في تصميم الاختبارات، لا سبب للعودة إلى العينة.' },
      { q: 'ما البيانات التي أحتاجها لبدء اختبار المجتمع الكامل؟', a: 'استخراج كامل للمجتمع بأرقام السجلات والتواريخ والمستخدمين والمورّدين أو العملاء والمراجع والمبالغ وبيانات الاعتماد، مع ميزان المراجعة للفترة نفسها. طابق المستخرج مع الأستاذ أولًا؛ فبدون هذه المطابقة يكون الاختبار كاملًا فقط للبيانات التي صادف أنها وصلتك.' },
      { q: 'هل يعتمد المراجع الخارجي على اختبارات المجتمع الكامل التي تجريها الشركة؟', a: 'يستطيع أن يأخذها في الاعتبار، لكن الاعتماد قراره. سيريد أن يفهم مصدر البيانات، وكيف فُحص الاكتمال، ومنطق كل اختبار، وكيف حُسمت الاستثناءات. ومسار موثّق من كل ملاحظة إلى سجلات الأستاذ يجعل هذا التقييم أسهل كثيرًا.' }
    ],
    sources: [
      { label: 'مجلس معايير المراجعة والتأكيد الدولية، {lat}"Project update: ISA 500, Audit Evidence"{/lat} (مسودات عرض صدرت في أغسطس {lat}2026{/lat})', url: 'https://www.iaasb.org/publications/project-update-isa-500-audit-evidence' },
      { label: 'جمعية فاحصي الاحتيال المعتمدين، تقرير {lat}"Occupational Fraud 2024: A Report to the Nations"{/lat} ({lat}2024{/lat})', url: 'https://www.acfe.com/en-us/-/media/files/acfe/pdfs/rttn/2024/2024-report-to-the-nations.pdf' }
    ]
  }
};
