// 05. Continuous auditing with AI vs traditional audit: a side-by-side comparison
module.exports = {
  en: {
    slug: 'continuous-auditing-ai-vs-traditional-audit',
    topic: 'audit',
    author: 'ahmed',
    reviewer: 'practice',
    date: '2026-10-14',
    title: 'Continuous auditing with AI vs traditional audit: side by side',
    metaTitle: 'Continuous Auditing with AI vs Traditional Audit',
    dek: 'A traditional audit looks back at a closed year through a sample. Continuous auditing tests every transaction as it posts. Here is what changes, and what does not.',
    description: 'Continuous auditing with AI compared with the traditional audit: timing, coverage, evidence, roles and risks, with a practical way for finance teams to start.',
    keywords: [
      'continuous auditing with AI',
      'continuous auditing vs traditional auditing',
      'AI in internal audit',
      'continuous monitoring of transactions',
      'audit analytics'
    ],
    about: ['Continuous auditing', 'Artificial intelligence', 'Internal audit', 'Audit evidence', 'Odoo'],
    answer: 'Continuous auditing with AI tests every transaction against defined rules shortly after it is posted, instead of testing a sample of a closed period months later. It shortens the time between an error and its detection and extends coverage to the whole population. It does not replace the external auditor’s opinion, professional judgement, or a named approver for each finding.',
    takeaways: [
      'The real difference is detection lag: months after the close versus days after posting.',
      'Rules catch known patterns, models rank what rules miss, and a person decides every finding.',
      'Continuous auditing sees only what was recorded, so physical counts, confirmations and judgement stay human.',
      'Start with one process, three to five tests and a named reviewer, then widen.'
    ],
    body: [
      { p: 'A finance manager receives the management letter in April. One point says a vendor was paid twice for the same invoice the previous May. The payment is eleven months old, the person who approved it has changed roles, and the question in the board meeting is not what happened but why nobody saw it for a year. Nothing in that audit was done badly. It was done late, by design.' },
      { p: 'That design is the subject of this comparison. The ACFE’s 2026 Report to the Nations found that the median occupational fraud lasts 12 months before it is detected, and that tips, not audits, were the top detection method in 43% of cases. The case for testing all year rather than once is made in [[blog/continuous-audit-eleven-months/|why an annual audit misses eleven months]]; this article takes the AI angle and puts the two approaches side by side, so you can decide what to keep, what to change and in what order.' },
      { h2: 'What is continuous auditing with AI?' },
      { p: 'Continuous auditing with AI is the practice of testing every ledger transaction against defined audit rules shortly after it is posted, using automated tests and AI models to rank risk, and routing each exception to a named person who reviews it against evidence. Two words carry the weight: every, and named. Coverage becomes the full population; accountability stays with a person.' },
      { p: 'It helps to separate it from continuous monitoring. Monitoring is owned by management and is part of the control itself, for example a payables supervisor who reviews a daily duplicate report. Auditing is owned by an independent function, internal audit or an outsourced provider, that tests whether those controls work. Both fit COSO’s Principle 16, which calls for ongoing and separate evaluations of internal control. For the wider map of where AI sits in finance, start with [[blog/ai-in-accounting-guide-2026/|our practical guide to AI in accounting]].' },
      { h2: 'How does continuous auditing differ from a traditional audit?' },
      { table: {
        caption: 'Traditional audit and continuous auditing with AI, compared on the dimensions that change the outcome',
        head: ['Dimension', 'Traditional audit', 'Continuous auditing with AI'],
        rows: [
          ['Timing', 'After the period closes, once or a few times a year', 'Daily or after each posting run, throughout the year'],
          ['Coverage', 'A sample selected under ISA 530, plus targeted items', 'Every transaction in the defined population, ranked by risk'],
          ['Detection lag', 'Months: the error is found after the books are closed', 'Days: the error is found while the period is still open'],
          ['Evidence', 'Documents requested and inspected during fieldwork', 'Ledger records with their ids, linked to source documents and stored with the finding'],
          ['Output', 'An opinion (external) or a periodic report (internal)', 'A live exception queue, with periodic reports built from it'],
          ['Who decides', 'The audit team, at the end of fieldwork', 'A named reviewer per exception, escalated by materiality'],
          ['Main weakness', 'Sampling risk and stale findings', 'Alert fatigue, data quality and the quality of the test design']
        ]
      } },
      { p: 'Continuous auditing does not remove risk; it exchanges one kind for another. Sampling risk shrinks for the attributes you test, because nothing is left out, a shift explained in detail in [[blog/full-population-testing-ai-vs-sampling/|our guide to moving from sampling to full-population testing]]. In its place come the risks of a badly designed test, an incomplete extract and a reviewer who stops reading alerts.' },
      { p: 'An external auditor still forms an opinion under the ISAs and decides how far to rely on anyone else’s work. Better internal evidence makes that reliance easier to justify, not automatic. The standards themselves are moving: in August 2026 the IAASB issued exposure drafts revising ISA 500, ISA 330 and ISA 520 to address the increased use of technology, with comments due by 15 December 2026. They are drafts, so do not build methodology on wording that may change.' },
      { h2: 'What does AI actually do in a continuous audit?' },
      { p: 'Three layers do different jobs, and confusing them is a frequent design mistake.' },
      { h3: 'Rules: the known patterns' },
      { p: 'Deterministic tests answer yes or no questions and run first, because they are cheap, explainable and repeatable. The patterns we find most often in continuous-audit work are:' },
      { ul: [
        'Duplicate and near-duplicate payments to the same vendor.',
        'Near-duplicate vendors: the same supplier set up twice under slightly different names.',
        'Approvals outside the approval matrix, including approvals by the person who raised the request, a test that depends on clean [[blog/ai-segregation-of-duties-internal-controls/|segregation of duties, including AI agents as users]].',
        'Cut-off errors, where the document date and the posting period disagree.',
        'Inventory valuation drift between the valuation report and the ledger.',
        'Manual journal entries posted late at month-end in round amounts, the population ISA 240 expects auditors to examine when testing journal entries.'
      ] },
      { h3: 'Models: what rules miss' },
      { p: 'A rule finds an exact duplicate. A model finds the bill that is not identical to anything but is unusual in several ways at once: a new vendor, an unusual posting hour, a user who rarely posts to that account. The output is a ranking, not a verdict. Its value is that the reviewer reads the riskiest twenty exceptions first rather than the first twenty.' },
      { h3: 'Language: explaining and drafting' },
      { p: 'Language models are good at turning an exception into a readable draft finding and at pulling the related documents together. They are also capable of stating a number that is not in the books. The control is simple and non-negotiable: every statement in a draft must cite the records it came from, or it is rejected. We call that rule evidence or silence, explained in [[blog/ai-audit-trail-zero-hallucination/|our article on AI provenance and the audit trail]]. And a flag is a question, not a conclusion; [[blog/ai-financial-fraud-detection/|AI-based fraud detection]] explains why a red flag is never proof of fraud.' },
      { h2: 'What does a continuous audit cycle look like in practice?' },
      { ol: [
        'Extract new postings since the last run through a dedicated read-only API user, as described in [[blog/connect-ai-to-odoo-continuous-audit/|connecting AI to Odoo for continuous auditing]].',
        'Reconcile the extract to the trial balance for the same period, so you know the population is complete before you test it.',
        'Run the rule tests, then the model scoring, on the new population.',
        'Suppress only patterns that have been explained before, and record who approved each suppression and why.',
        'Assign every remaining exception to a named reviewer, who checks it against the source document.',
        'Raise a finding with condition, criteria, cause, owner and due date, or close the exception with the evidence that explains it.',
        'Draft any correction for a person to approve, with a second approver above the ISA 320 materiality threshold, as set out in [[blog/materiality-isa-320-threshold/|our note on materiality thresholds]].',
        'Report monthly: open findings, ageing, repeats of earlier findings, and tests that produced nothing (which may mean the test is broken).'
      ] },
      { h2: 'Where does the traditional audit still win?' },
      { p: 'A continuous test sees only what was recorded. It cannot count stock in a warehouse, obtain a bank confirmation, read the tone of a management meeting, or see a side agreement that was never entered. Accounting estimates, going concern, related parties outside the books and the plausibility of management’s explanations remain judgement work. The ACFE’s 2026 report also found that more than half of cases involved a lack of internal controls or an override of existing ones, and an override performed by someone with the right access can look perfectly normal in the data.' },
      { p: 'There is also a dependency the traditional auditor checks first and a continuous programme often forgets: the IT environment. ISA 315 (Revised 2019) requires auditors to understand general IT controls because ledger data is only as reliable as the access rights behind it. Odoo’s 20 release notes say changes to user groups are now logged in the user’s chatter, which gives a reviewer a trail of who received which access and when. Test that trail before you trust the transactions.' },
      { h2: 'What are the risks, and how do you control them?' },
      { ul: [
        'Alert fatigue. Control: thresholds linked to materiality, and a weekly review of the ten most suppressed patterns.',
        'Incomplete data. Control: reconcile every extract to the trial balance and stop the run if it does not agree.',
        'Silent test failure. Control: a test that returns zero exceptions for three cycles is reviewed, not celebrated.',
        'Loss of independence. Control: the people who own the process do not edit the tests, and every rule change is logged with an approver.',
        'Invented explanations. Control: drafts without record citations are rejected and never presented as facts.',
        'Usage cost. If you use Odoo’s native AI, Odoo’s 20 release notes say all AI features consume IAP credits billed per request, so budget by volume of runs.'
      ] },
      { quote: 'A finding that arrives eleven months late is a history lesson, not a control.' },
      { h2: 'Where should a finance team start on Monday?' },
      { p: 'Pick one process with high volume and clear rules, usually payables. Choose three to five tests from the list above. Run them backwards on the last closed quarter and compare the results with what your last audit sample found; that comparison calibrates thresholds and tells you which tests produce noise. Then run weekly, assign a named reviewer, and keep the working papers ISA 230 expects: what was tested, what was found and how each exception was resolved. Widen to a second process only when the first queue is being cleared on time.' },
      { p: 'This is how we run it. MFT’s seg-audit platform reads the books straight from the ERP, read-only, scores every transaction by risk instead of sampling a few percent, and keeps each finding on record with its evidence and severity; a finding cannot be closed without a named, registered approver. Our [[intelligence/auditor/|Auditor agent]] drafts findings and correcting entries for a person to approve, and our [[services/internal-audit/|internal audit service]] supplies the licensed reviewers when you do not have them in-house.' }
    ],
    faq: [
      { q: 'Does continuous auditing replace the external auditor?', a: 'No. The external auditor still forms an independent opinion under the ISAs and decides how much to rely on internal work. Continuous auditing improves the evidence available during the year and can reduce surprises at year end, but reliance is the external auditor’s judgement, not something the company can assume.' },
      { q: 'What is the difference between continuous auditing and continuous monitoring?', a: 'Continuous monitoring is performed by management as part of a control, such as a supervisor reviewing a daily exceptions report. Continuous auditing is performed by an independent function that tests whether those controls work. Both use similar automated tests; the difference is ownership and independence.' },
      { q: 'Which transactions should be tested continuously first?', a: 'Start where volume is high and rules are clear: vendor bills and payments, manual journal entries, and vendor master changes. These produce testable patterns such as duplicates, approvals outside the matrix and late round-amount entries, and errors there move cash out of the business quickly.' },
      { q: 'Can AI-flagged exceptions be used as audit evidence?', a: 'The flag itself is not evidence; the ledger records and source documents behind it are. An exception becomes usable evidence when a reviewer has checked it against those records, documented the conclusion and kept the trail. Any AI statement that does not cite the underlying records should be rejected.' },
      { q: 'How often should continuous audit tests run?', a: 'Match frequency to how quickly the risk turns into loss. Payment and vendor master tests suit daily or before each payment run; journal entry and cut-off tests suit weekly runs and the month-end close. Running more often than a reviewer can clear the queue only creates backlog.' }
    ],
    sources: [
      { label: 'ACFE, "Occupational Fraud 2026: A Report to the Nations" (press release, 19 May 2026)', url: 'https://www.acfe.com/about-the-acfe/newsroom-for-media/press-releases/press-release-detail?s=report-to-the-' },
      { label: 'IAASB, "Project update: ISA 500, Audit Evidence" (exposure drafts issued August 2026)', url: 'https://www.iaasb.org/publications/project-update-isa-500-audit-evidence' }
    ]
  },
  ar: {
    slug: 'continuous-auditing-ai-vs-traditional-audit',
    topic: 'audit',
    author: 'ahmed',
    reviewer: 'practice',
    date: '2026-10-14',
    title: 'المراجعة المستمرة بالذكاء الاصطناعي والمراجعة التقليدية: مقارنة جنبًا إلى جنب',
    metaTitle: 'المراجعة المستمرة بالذكاء الاصطناعي مقابل المراجعة التقليدية',
    dek: 'المراجعة التقليدية تنظر إلى سنة مقفلة من خلال عينة. المراجعة المستمرة تختبر كل معاملة فور ترحيلها. ما الذي يتغير فعلًا، وما الذي يبقى كما هو؟',
    description: 'مقارنة عملية بين المراجعة المستمرة بالذكاء الاصطناعي والمراجعة التقليدية: التوقيت والتغطية والأدلة والأدوار والمخاطر، وخطة بداية واقعية للإدارة المالية.',
    keywords: [
      'المراجعة المستمرة بالذكاء الاصطناعي',
      'الفرق بين المراجعة المستمرة والمراجعة التقليدية',
      'الذكاء الاصطناعي في المراجعة الداخلية',
      'التدقيق المستمر',
      'تحليل البيانات في المراجعة'
    ],
    about: ['المراجعة المستمرة', 'الذكاء الاصطناعي', 'المراجعة الداخلية', 'أدلة المراجعة', '{lat}Odoo{/lat}'],
    answer: 'المراجعة المستمرة بالذكاء الاصطناعي تختبر كل معاملة وفق قواعد محددة بعد ترحيلها بوقت قصير، بدلًا من اختبار عينة من فترة مقفلة بعد شهور. فهي تقلّص المدة بين وقوع الخطأ واكتشافه وتمد التغطية إلى المجتمع الكامل. لكنها لا تحل محل رأي المراجع الخارجي ولا الحكم المهني ولا المعتمِد البشري المسمّى لكل ملاحظة.',
    takeaways: [
      'الفرق الحقيقي هو فجوة الاكتشاف: شهور بعد الإقفال في مقابل أيام بعد الترحيل.',
      'القواعد تلتقط الأنماط المعروفة، والنماذج ترتّب ما فاتها، والإنسان يحسم كل ملاحظة.',
      'المراجعة المستمرة لا ترى إلا ما سُجّل، فيبقى الجرد والمصادقات والتقديرات عملًا بشريًا.',
      'ابدأ بعملية واحدة وبثلاثة إلى خمسة اختبارات ومراجع مسمّى، ثم توسّع.'
    ],
    body: [
      { p: 'يصل خطاب الإدارة إلى المدير المالي في أبريل، وفيه بند يقول إن مورّدًا صُرف له مرتين عن الفاتورة نفسها في مايو من السنة السابقة. مرّ على الصرف أحد عشر شهرًا، والموظف الذي اعتمده انتقل إلى مكان آخر، والسؤال في اجتماع المجلس لم يعد ماذا حدث، بل لماذا لم يره أحد طوال سنة. لم يُخطئ أحد في تلك المراجعة، لكنها جاءت متأخرة، وهذا جزء من تصميمها.' },
      { p: 'هذا التصميم هو موضوع المقارنة. فقد وجد تقرير {lat}ACFE{/lat} لعام {lat}2026{/lat} أن حالة الاحتيال المهني الوسيطة تستمر {lat}12{/lat} شهرًا قبل اكتشافها، وأن البلاغات، لا المراجعات، كانت أول وسيلة اكتشاف بنسبة {lat}43%{/lat} من الحالات. وقد عرضنا حجة الاختبار طوال السنة في [[blog/continuous-audit-eleven-months/|لماذا تفوت المراجعة السنوية أحد عشر شهرًا]]؛ أما هنا فنأخذ زاوية الذكاء الاصطناعي ونضع المنهجين متجاورين، لتقرر ماذا تُبقي وماذا تغيّر وبأي ترتيب.' },
      { h2: 'ما المراجعة المستمرة بالذكاء الاصطناعي؟' },
      { p: 'المراجعة المستمرة بالذكاء الاصطناعي هي اختبار كل معاملة في دفتر الأستاذ وفق قواعد مراجعة محددة بعد ترحيلها بوقت قصير، باستخدام اختبارات آلية ونماذج ذكاء اصطناعي لترتيب المخاطر، ثم إحالة كل استثناء إلى شخص مسمّى يفحصه مقابل الدليل. كلمتان تحملان التعريف: «كل» و«مسمّى». فالتغطية تصبح المجتمع الكامل، والمساءلة تبقى عند إنسان.' },
      { p: 'ومن المفيد التفريق بينها وبين المتابعة المستمرة ({lat}Continuous monitoring{/lat}). المتابعة ملك الإدارة وجزء من الضابط الرقابي نفسه، كمشرف الموردين الذي يراجع تقرير التكرار يوميًا. أما المراجعة فتملكها وظيفة مستقلة، هي المراجعة الداخلية أو مزوّد خارجي، تختبر هل تعمل تلك الضوابط الرقابية. والاثنتان تندرجان تحت المبدأ {lat}16{/lat} من إطار {lat}COSO{/lat} الذي يطلب تقييمات مستمرة ومنفصلة للرقابة الداخلية. ولخريطة أوسع لموقع الذكاء الاصطناعي في الإدارة المالية، ابدأ من [[blog/ai-in-accounting-guide-2026/|دليلنا العملي للذكاء الاصطناعي في المحاسبة]].' },
      { h2: 'كيف تختلف المراجعة المستمرة عن المراجعة التقليدية؟' },
      { table: {
        caption: 'المراجعة التقليدية والمراجعة المستمرة بالذكاء الاصطناعي، على الأبعاد التي تغيّر النتيجة',
        head: ['البُعد', 'المراجعة التقليدية', 'المراجعة المستمرة بالذكاء الاصطناعي'],
        rows: [
          ['التوقيت', 'بعد إقفال الفترة، مرة أو بضع مرات في السنة', 'يوميًا أو بعد كل دورة ترحيل، طوال السنة'],
          ['التغطية', 'عينة مختارة وفق {lat}ISA 530{/lat} مع بنود مستهدفة', 'كل معاملة في المجتمع المحدد، مرتبة حسب الخطر'],
          ['فجوة الاكتشاف', 'شهور: يُكتشف الخطأ بعد إقفال الدفاتر', 'أيام: يُكتشف الخطأ والفترة ما زالت مفتوحة'],
          ['الأدلة', 'مستندات تُطلب وتُفحص أثناء العمل الميداني', 'سجلات الأستاذ بأرقامها التعريفية، مربوطة بالمستند الأصلي ومحفوظة مع الملاحظة'],
          ['المُخرج', 'رأي (خارجي) أو تقرير دوري (داخلي)', 'قائمة استثناءات حية، وتقارير دورية تُبنى منها'],
          ['من يقرر', 'فريق المراجعة، في نهاية العمل الميداني', 'مراجع مسمّى لكل استثناء، مع تصعيد حسب الأهمية النسبية'],
          ['نقطة الضعف', 'خطر العينة وملاحظات قديمة', 'إرهاق التنبيهات، وجودة البيانات، وجودة تصميم الاختبار']
        ]
      } },
      { p: 'اقرأ السطر الأخير جيدًا. المراجعة المستمرة لا تلغي الخطر بل تستبدل نوعًا بآخر. فخطر العينة يتقلص في الخصائص التي تختبرها لأن شيئًا لم يُستبعد، وهو ما نشرحه في [[blog/full-population-testing-ai-vs-sampling/|دليلنا للانتقال من العينة إلى اختبار المجتمع الكامل]]. وفي المقابل تظهر مخاطر اختبار سيئ التصميم، واستخراج ناقص، ومراجع توقف عن قراءة التنبيهات.' },
      { p: 'ولا يقل أهمية ما لا يتغير. فالمراجع الخارجي ما زال يكوّن رأيه وفق معايير المراجعة الدولية، ويقرر إلى أي حد يعتمد على عمل غيره. الأدلة الداخلية الأفضل تجعل هذا الاعتماد أسهل تبريرًا، لا تلقائيًا. والمعايير نفسها تتحرك: ففي أغسطس {lat}2026{/lat} أصدر {lat}IAASB{/lat} مسودات عرض لتعديل {lat}ISA 500{/lat} و{lat}ISA 330{/lat} و{lat}ISA 520{/lat} لمعالجة التوسع في استخدام التقنية، وآخر موعد للتعليقات {lat}15{/lat} ديسمبر {lat}2026{/lat}. إنها مسودات لا معايير نهائية، فلا تبنِ منهجيتك على صياغة قد تتغير.' },
      { h2: 'ماذا يفعل الذكاء الاصطناعي فعلًا في المراجعة المستمرة؟' },
      { p: 'ثلاث طبقات، لكل منها عمل مختلف، والخلط بينها أكثر أخطاء التصميم شيوعًا.' },
      { h3: 'القواعد: الأنماط المعروفة' },
      { p: 'الاختبارات القطعية تجيب بنعم أو لا، ويجب أن تعمل أولًا لأنها رخيصة وقابلة للتفسير والتكرار. وأكثر الأنماط التي نجدها في أعمال المراجعة المستمرة:' },
      { ul: [
        'المدفوعات المكررة وشبه المكررة للمورّد نفسه.',
        'المورّدون شبه المكررين: المورّد ذاته مُسجَّل مرتين بأسماء متقاربة.',
        'اعتمادات خارج مصفوفة الصلاحيات، ومنها اعتماد صاحب الطلب لطلبه، وهو اختبار يعتمد على [[blog/ai-segregation-of-duties-internal-controls/|الفصل بين المهام، بما في ذلك وكلاء الذكاء الاصطناعي كمستخدمين]].',
        'أخطاء الفصل الزمني، حين يختلف تاريخ المستند عن فترة الترحيل.',
        'انحراف تقييم المخزون بين تقرير التقييم ودفتر الأستاذ.',
        'قيود اليومية اليدوية المرحّلة متأخرة في نهاية الشهر بمبالغ مقرّبة، وهي المجتمع الذي يتوقع {lat}ISA 240{/lat} أن يفحصه المراجع عند اختبار القيود.'
      ] },
      { h3: 'النماذج: ما تفوته القواعد' },
      { p: 'القاعدة تجد الفاتورة المكررة حرفيًا. أما النموذج فيجد الفاتورة التي لا تطابق شيئًا لكنها غير مألوفة من عدة زوايا معًا: مورّد جديد، وساعة ترحيل غير معتادة، ومستخدم نادرًا ما يرحّل على هذا الحساب. والمُخرج ترتيب لا حكم، وقيمته أن يقرأ المراجع أخطر عشرين استثناء أولًا لا أول عشرين.' },
      { h3: 'اللغة: الشرح والصياغة' },
      { p: 'النماذج اللغوية جيدة في تحويل الاستثناء إلى مسودة ملاحظة مقروءة وفي جمع المستندات المرتبطة. وهي قادرة أيضًا على ذكر رقم غير موجود في الدفاتر. والضابط بسيط ولا يقبل التفاوض: كل جملة في المسودة يجب أن تستشهد بالسجلات التي جاءت منها، وإلا رُفضت. نسمّي هذه القاعدة «الدليل أو الصمت»، ونشرحها في [[blog/ai-audit-trail-zero-hallucination/|مقالنا عن مصدر مخرجات الذكاء الاصطناعي ومسار التدقيق]]. والتنبيه سؤال لا استنتاج؛ ويشرح مقال [[blog/ai-financial-fraud-detection/|كشف الاحتيال المالي بالذكاء الاصطناعي]] لماذا لا يكون المؤشر دليلًا على الاحتيال أبدًا.' },
      { h2: 'كيف تبدو دورة المراجعة المستمرة عمليًا؟' },
      { ol: [
        'استخرج الترحيلات الجديدة منذ آخر تشغيل عبر مستخدم {lat}API{/lat} مخصص للقراءة فقط، كما في [[blog/connect-ai-to-odoo-continuous-audit/|ربط الذكاء الاصطناعي بـ{lat}Odoo{/lat} للمراجعة المستمرة]].',
        'طابق المستخرج مع ميزان المراجعة للفترة نفسها، لتعرف أن المجتمع كامل قبل أن تختبره.',
        'شغّل اختبارات القواعد، ثم تقييم النماذج، على المجتمع الجديد.',
        'لا تستبعد إلا أنماطًا سبق تفسيرها، وسجّل من وافق على كل استبعاد ولماذا.',
        'أسند كل استثناء متبقٍ إلى مراجع مسمّى يفحصه مقابل المستند الأصلي.',
        'ارفع ملاحظة بالواقعة والمعيار والسبب والمسؤول والموعد، أو أغلق الاستثناء بالدليل الذي يفسّره.',
        'صُغ أي تصحيح كمسودة يعتمدها شخص، مع معتمِد ثانٍ فوق حد الأهمية النسبية وفق {lat}ISA 320{/lat}، كما في [[blog/materiality-isa-320-threshold/|مقالنا عن حدود الأهمية النسبية]].',
        'قدّم تقريرًا شهريًا: الملاحظات المفتوحة وأعمارها، وتكرار ملاحظات سابقة، والاختبارات التي لم تُخرج شيئًا (فقد يعني ذلك أن الاختبار معطّل).'
      ] },
      { h2: 'أين تتفوق المراجعة التقليدية؟' },
      { p: 'الاختبار المستمر لا يرى إلا ما سُجّل. لا يستطيع عدّ مخزون في مستودع، ولا الحصول على مصادقة بنكية، ولا قراءة أجواء اجتماع الإدارة، ولا رؤية اتفاق جانبي لم يُقيَّد أصلًا. وتبقى التقديرات المحاسبية والاستمرارية والأطراف ذات العلاقة خارج الدفاتر ومعقولية تفسيرات الإدارة عملًا يقوم على الحكم المهني. كما وجد تقرير {lat}ACFE{/lat} لعام {lat}2026{/lat} أن أكثر من نصف الحالات اقترن بغياب ضوابط رقابية أو تجاوز ضوابط قائمة، والتجاوز الذي يقوم به من يملك الصلاحية قد يبدو طبيعيًا تمامًا في البيانات.' },
      { p: 'وهناك اعتماد يفحصه المراجع التقليدي أولًا وتنساه برامج كثيرة: بيئة تقنية المعلومات. فمعيار {lat}ISA 315 (Revised 2019){/lat} يطلب فهم الضوابط العامة لتقنية المعلومات، لأن بيانات الأستاذ لا تكون أوثق من صلاحيات الوصول التي تقف خلفها. وتذكر ملاحظات إصدار {lat}Odoo 20{/lat} أن تغييرات مجموعات المستخدمين أصبحت تُسجَّل في سجل محادثة المستخدم، ما يمنح المراجع أثرًا لمن حصل على أي صلاحية ومتى. افحص هذا الأثر قبل أن تثق بالمعاملات.' },
      { h2: 'ما المخاطر، وكيف تضبطها؟' },
      { ul: [
        'إرهاق التنبيهات. الضابط: حدود مربوطة بالأهمية النسبية، ومراجعة أسبوعية لأكثر عشرة أنماط مستبعدة.',
        'نقص البيانات. الضابط: مطابقة كل استخراج مع ميزان المراجعة وإيقاف التشغيل إن لم يتطابق.',
        'تعطّل الاختبار بصمت. الضابط: الاختبار الذي لا يُخرج أي استثناء ثلاث دورات متتالية يُفحص، لا يُحتفى به.',
        'فقدان الاستقلال. الضابط: أصحاب العملية لا يعدّلون الاختبارات، وكل تعديل على القواعد يُسجَّل مع معتمِده.',
        'تفسيرات مختلقة. الضابط: تُرفض المسودات الخالية من الإحالة إلى السجلات ولا تُعرض كحقائق أبدًا.',
        'تكلفة الاستخدام. إن استخدمت الذكاء الاصطناعي المدمج في {lat}Odoo{/lat}، فملاحظات إصدار {lat}Odoo 20{/lat} تقول إن كل خصائصه تستهلك أرصدة {lat}IAP{/lat} تُحتسب لكل طلب، فخطط الموازنة حسب عدد مرات التشغيل.'
      ] },
      { quote: 'الملاحظة التي تصل بعد أحد عشر شهرًا درس في التاريخ، لا ضابط رقابي.' },
      { h2: 'من أين تبدأ الإدارة المالية يوم الإثنين؟' },
      { p: 'اختر عملية واحدة كثيرة الحركة وواضحة القواعد، وغالبًا ستكون الموردين والمدفوعات. اختر ثلاثة إلى خمسة اختبارات من القائمة السابقة، وشغّلها بأثر رجعي على آخر ربع مقفل، ثم قارن نتائجها بما وجدته عينة آخر مراجعة؛ هذه المقارنة تضبط الحدود وتكشف الاختبارات التي لا تنتج إلا ضجيجًا. بعد ذلك شغّلها أسبوعيًا، وعيّن مراجعًا مسمّى، واحتفظ بأوراق العمل التي يتوقعها {lat}ISA 230{/lat}: ماذا اختُبر، وماذا وُجد، وكيف حُسم كل استثناء. ولا تنتقل إلى عملية ثانية قبل أن تُصفّى قائمة الأولى في موعدها.' },
      { p: 'هكذا نعمل نحن. منصة {lat}seg-audit{/lat} الخاصة بـ{lat}MFT{/lat} تقرأ الدفاتر مباشرة من نظام {lat}ERP{/lat} قراءة فقط، وتقيّم كل معاملة حسب الخطر بدلًا من سحب عينة بنسبة صغيرة، وتحفظ كل ملاحظة بدليلها ودرجة خطورتها، ولا تُغلق ملاحظة دون معتمِد مسمّى ومسجَّل. ووكيل [[intelligence/auditor/|المراجع الذكي]] يصوغ الملاحظات وقيود التصحيح كمسودات يعتمدها شخص، وتوفر [[services/internal-audit/|خدمة المراجعة الداخلية]] لدينا المراجعين المرخّصين إن لم يكونوا لديك داخل الشركة.' }
    ],
    faq: [
      { q: 'هل تحل المراجعة المستمرة محل المراجع الخارجي؟', a: 'لا. المراجع الخارجي ما زال يكوّن رأيًا مستقلًا وفق معايير المراجعة الدولية، ويقرر مدى اعتماده على العمل الداخلي. المراجعة المستمرة تحسّن الأدلة المتاحة خلال السنة وتقلل مفاجآت نهاية العام، لكن الاعتماد عليها قرار يعود للمراجع الخارجي، لا أمر تفترضه الشركة.' },
      { q: 'ما الفرق بين المراجعة المستمرة والمتابعة المستمرة؟', a: 'المتابعة المستمرة تقوم بها الإدارة كجزء من الضابط الرقابي، مثل مشرف يراجع تقرير استثناءات يوميًا. أما المراجعة المستمرة فتقوم بها وظيفة مستقلة تختبر هل تعمل تلك الضوابط. الاختبارات الآلية متشابهة في الحالتين، والفارق هو الملكية والاستقلال.' },
      { q: 'ما المعاملات التي يجب اختبارها باستمرار أولًا؟', a: 'ابدأ حيث الحركة كثيرة والقواعد واضحة: فواتير المورّدين ومدفوعاتهم، وقيود اليومية اليدوية، وتعديلات بيانات المورّدين الأساسية. هذه المناطق تنتج أنماطًا قابلة للاختبار كالتكرار والاعتماد خارج المصفوفة والقيود المقرّبة المتأخرة، والأخطاء فيها تُخرج النقد من الشركة بسرعة.' },
      { q: 'هل يمكن استخدام استثناءات الذكاء الاصطناعي كأدلة مراجعة؟', a: 'التنبيه نفسه ليس دليلًا؛ الدليل هو سجلات الأستاذ والمستندات الأصلية التي خلفه. ويصبح الاستثناء دليلًا قابلًا للاستخدام حين يفحصه مراجع مقابل تلك السجلات، ويوثّق استنتاجه، ويحتفظ بمسار التدقيق. وأي عبارة من الذكاء الاصطناعي لا تستشهد بالسجلات يجب رفضها.' },
      { q: 'كم مرة يجب تشغيل اختبارات المراجعة المستمرة؟', a: 'اربط التكرار بسرعة تحوّل الخطر إلى خسارة. اختبارات المدفوعات وبيانات المورّدين تناسبها دورة يومية أو قبل كل دفعة سداد، واختبارات القيود والفصل الزمني تناسبها دورة أسبوعية ومع الإقفال الشهري. والتشغيل بوتيرة أسرع مما يستطيع المراجع تصفيته لا يصنع إلا تراكمًا.' }
    ],
    sources: [
      { label: 'جمعية فاحصي الاحتيال المعتمدين، تقرير {lat}"Occupational Fraud 2026: A Report to the Nations"{/lat} (بيان صحفي، {lat}19{/lat} مايو {lat}2026{/lat})', url: 'https://www.acfe.com/about-the-acfe/newsroom-for-media/press-releases/press-release-detail?s=report-to-the-' },
      { label: 'مجلس معايير المراجعة والتأكيد الدولية، {lat}"Project update: ISA 500, Audit Evidence"{/lat} (مسودات عرض صدرت في أغسطس {lat}2026{/lat})', url: 'https://www.iaasb.org/publications/project-update-isa-500-audit-evidence' }
    ]
  }
};
