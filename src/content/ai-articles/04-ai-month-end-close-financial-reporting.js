// 04. AI in the month-end close and financial reporting: what to automate
module.exports = {
  en: {
    slug: 'ai-month-end-close-financial-reporting',
    topic: 'ai',
    author: 'ahmed',
    reviewer: 'practice',
    image: { alt: 'Illustration: a month calendar with completed days checked, one open day outlined in gold, and an arrow to a financial report with a bar chart.' },
    date: '2026-10-14',
    title: 'AI in the month-end close and financial reporting: what to automate',
    metaTitle: 'AI in the month-end close: what to automate',
    dek: 'Which close tasks AI can prepare, which it can only check, and the approval and evidence rules that keep the reported numbers defensible.',
    description: 'How to use AI in the month-end close and financial reporting: which tasks to automate, which to review, and the approval rules that keep numbers defensible.',
    keywords: [
      'AI in month-end close',
      'AI financial reporting',
      'month-end close automation',
      'AI variance commentary',
      'Odoo 20 month-end close'
    ],
    about: ['Artificial intelligence', 'Month-end close', 'Financial reporting', 'Account reconciliation', 'Odoo'],
    answer: 'AI helps the month-end close by doing the matching, reconciling, variance scanning and first-draft commentary that consume most of the close calendar, and by testing every entry before the period is locked. It should draft accruals, adjustments and explanations for a named person to approve, never post them, and every reported number must trace to cited records.',
    takeaways: [
      'Most close time goes on matching, chasing and explaining, which is where AI helps first.',
      'AI drafts adjustments and commentary; a named person approves, tiered by materiality.',
      'Every number in AI-written commentary must trace to records in the books, or it is struck out.',
      'Move matching and entry testing into the month so the close starts with exceptions only.'
    ],
    body: [
      { p: 'It is the third working day of the close. The bank still has unmatched lines from the second week of the month, the accrual for goods received but not yet billed lives in someone’s spreadsheet, and the management pack will go out with commentary written late at night by the person who also prepared the numbers. The close is rarely slow because the accounting is hard. It is slow because of matching, chasing and explaining, three kinds of work that AI handles well if the controls around it are designed first.' },
      { p: 'Finance teams are already moving. Gartner’s 2025 AI in Finance Survey found that 59% of finance leaders use AI in their finance function, against 58% in 2024 and 37% in 2023, and that adoption has levelled off, with complexity, data and talent cited as barriers. That figure covers the finance function broadly, not the close specifically, but the barriers it names are exactly the ones a close project meets.' },
      { h2: 'What does AI in the month-end close mean?' },
      { p: 'AI in the month-end close is the use of matching models, anomaly tests and language models to prepare, check and explain a period’s numbers, while people approve every entry that changes the books. It is useful to split the close into three kinds of work, because AI plays a different role in each:' },
      { ul: [
        'Preparing: matching bank lines, reconciling balance sheet accounts, drafting accruals and adjustments.',
        'Checking: testing every manual entry, cut-off, valuation movements and unusual balances before the period is locked.',
        'Explaining: drafting variance commentary and the narrative of the management report.'
      ] },
      { p: 'The steps of a sound close do not change. Our [[blog/month-end-close-checklist-odoo/|month-end close checklist for Odoo]] sets them out; this article is about where AI fits inside them.' },
      { h2: 'Which close tasks can AI do, and which must stay human?' },
      { p: 'The decision rule we apply: AI may propose anything, may check everything, and may change the books only through a draft that a named person approves. The matrix below applies it task by task.' },
      { table: {
        caption: 'Month-end close: what AI does, what a person does, what evidence is kept',
        head: ['Close task', 'What AI does', 'What a person does', 'Evidence kept'],
        rows: [
          ['Bank reconciliation', 'Proposes matches and lists unmatched lines, as described in [[blog/ai-journal-entries-bank-reconciliation/|automating bank reconciliation with AI]]', 'Approves matches and every write-off', 'Reconciled and unreconciled items at period end'],
          ['Accruals for goods received not billed', 'Drafts the accrual from receipts with no bill, with a reversal date', 'Approves the estimate and the reversal', 'The receipt records the draft cites'],
          ['Balance sheet account reconciliations', 'Compares ledger balances with subledgers and lists breaks', 'Resolves breaks and signs the reconciliation', 'Signed reconciliation with its support'],
          ['Manual journal entry review', 'Scores every manual entry for timing, user, roundness and posting after cut-off', 'Investigates the high scores', 'Score, reviewer and outcome per entry'],
          ['Inventory valuation close', 'Compares unit cost movements and drafts valuation adjustments', 'Approves valuation entries', 'Recomputed cost per item moved'],
          ['Variance commentary', 'Drafts explanations that cite accounts and records', 'Edits and owns the narrative', 'Record references behind every figure'],
          ['Period lock', 'Checks that preconditions are met: no unapproved drafts, no open breaks', 'Sets the lock date', 'Lock log and the checklist sign-off']
        ]
      } },
      { h2: 'How does AI change the close calendar?' },
      { p: 'The largest gain does not come from doing close tasks faster on day 1. It comes from moving them out of the close window altogether.' },
      { h3: 'During the month' },
      { p: 'If bank matching and manual entry scoring run daily, the close starts with a short list of exceptions instead of a month of raw transactions. The same scoring that supports [[blog/ai-financial-fraud-detection/|AI-based fraud detection]] doubles as a close control: a round manual entry posted late on the last evening of the month is a classic finding in MFT’s continuous-audit work, and it is far easier to question on the day it is posted.' },
      { h3: 'The first days of the close' },
      { p: 'AI drafts accruals, reclassifications and valuation adjustments, each with the records it relied on. The accountant’s job shifts from building entries to reviewing them, which is faster only if every draft shows its evidence.' },
      { h3: 'Reporting' },
      { p: 'Once the trial balance is approved, AI drafts the variance commentary and the management report narrative. The controller edits. Nothing in the pack is a number the controller cannot trace.' },
      { h2: 'Who approves what AI drafts?' },
      { p: 'Speed is worthless if it comes from skipping review. The approval design we use with clients has four rules:' },
      { ol: [
        'Every draft carries the record references it was built from. A draft without them is returned, not reviewed.',
        'Approval is tiered by the client’s ISA 320 materiality threshold: below it, one named approver; above it, a second approver. Our article on [[blog/materiality-isa-320-threshold/|setting the materiality threshold]] explains how to fix it.',
        'The person who requested or ran the AI task never approves its output, which is [[blog/ai-segregation-of-duties-internal-controls/|segregation of duties applied to AI agents]].',
        'Corrections are made by reversal, never by deleting or editing a posted entry, so the trail of what was proposed, approved and corrected survives.'
      ] },
      { quote: 'A close is fast when the evidence is ready, not when the approvals are skipped.' },
      { h2: 'Can AI write the financial report commentary?' },
      { p: 'It can write the first draft, and it often writes it better than a tired controller at midnight. The danger is specific: a language model can produce a fluent sentence with a number that does not exist in the books. A practical tie-out test catches this before the report leaves the finance team:' },
      { ol: [
        'Highlight every figure and percentage in the draft commentary.',
        'Trace each one to the approved trial balance or the records the draft cites.',
        'Strike out any figure that cannot be traced, and any sentence whose cause is asserted without a record behind it.',
        'Keep the traced draft with the close file as evidence of review.'
      ] },
      { p: 'MFT’s agents apply the same rule automatically under the evidence-or-silence principle described in [[blog/ai-audit-trail-zero-hallucination/|our article on AI provenance and the audit trail]]: a finding that cites nothing, or a number absent from the cited records, is rejected and shown struck through, never as a fact. The human tie-out remains, because the controller signs the pack, not the model.' },
      { h2: 'What does Odoo 20 change for the close?' },
      { p: 'According to Odoo’s 20 release notes, several accounting changes touch the close directly:' },
      { ul: [
        'A bank reconciliation summary report listing reconciled and unreconciled transactions at period end, plus the option to run Auto Reconciliation manually.',
        'Bank consistency: entries affecting bank accounts must originate from bank transactions.',
        'Under perpetual valuation, accrual entries from the inventory valuation closing report post directly to the valuation account, and cost of goods sold is updated retroactively when cost changes after delivery. See [[blog/odoo-20-inventory-valuation-changes/|the Odoo 20 inventory valuation changes]].',
        'Exchange gains and losses consolidated into one line per invoice, and depreciation models that accept rates and decimals.',
        'Payment statuses renamed: "In Process" becomes "Paid" and "Paid" becomes "Reconciled", which affects saved filters and close reports.',
        'AI-powered financial insights: questions to the AI assistant about receivables, cash flow or reconciliation issues, answered solely from accounting data in your database, including a review of suspected reconciliation errors.'
      ] },
      { p: 'All AI features in Odoo 20 run on IAP credits billed per request and not included in any plan, so a daily AI routine has a running cost to budget. Lock dates, reconciliation models and Spreadsheet dashboards exist in recent Odoo versions; confirm how they behave in your 20 database before you build the close around them. The full AI map is in [[blog/odoo-20-ai-features-accounting/|Odoo 20 AI features for accounting]].' },
      { h2: 'What can go wrong when AI enters the close?' },
      { ul: [
        'Automating a broken close: if the chart of accounts or cut-off rules are unclear, AI reproduces the confusion faster.',
        'Accepting matches in bulk: approval becomes a click, and the control disappears while the log says it happened.',
        'Drafts piling up: unapproved drafts at lock date mean the period closes on numbers nobody owns. Make "no open drafts" a lock precondition.',
        'Evidence in the wrong place: Odoo 20 keeps stored AI conversations up to 30 days after the last message, so anything that supports a closing entry belongs in the close file, not in a chat.'
      ] },
      { h2: 'Where should you start this month?' },
      { ol: [
        'Write your close calendar as a list of tasks with the working days each takes and who owns it.',
        'Mark the tasks that are mostly matching, chasing or explaining. Those are the candidates.',
        'Run AI in parallel for one close on two of them, without changing the official process, and compare its drafts with what your team posted.',
        'Set the approval tiers and the lock preconditions before the AI output counts.',
        'In the following close, move matching and entry scoring into the month, and keep commentary drafting for last.'
      ] },
      { p: 'This is the work our [[intelligence/virtual-cfo/|Virtual CFO agent]] does as a managed service: it reads the books through the API at query time, drafts analysis and adjustments that cite the records behind them, and leaves approval to a named person on the client’s side; nothing is auto-posted. For teams that also want an experienced finance lead around the close, our [[services/virtual-cfo/|Virtual CFO service]] pairs that work with people who have closed books and signed reports themselves.' }
    ],
    faq: [
      { q: 'Can AI close the books automatically?', a: 'No, and it should not. AI can match transactions, reconcile accounts, test entries and draft accruals, adjustments and commentary, but each change to the books should be a draft that a named person approves, with a second approver above the materiality threshold. The person who signs the financial statements remains accountable for them.' },
      { q: 'Which month-end close tasks should be automated with AI first?', a: 'Start with tasks that are mostly matching and chasing: bank reconciliation, balance sheet account reconciliations and scoring every manual journal entry. They have clear evidence, measurable outcomes and low judgment. Leave estimates, valuation adjustments and report commentary until the approval tiers and the evidence rules have been proven in at least one close.' },
      { q: 'Is AI-generated financial commentary reliable?', a: 'Only after a tie-out. A language model can write a fluent explanation containing a figure that is not in the books. Trace every number and percentage to the approved trial balance or cited records, strike anything that cannot be traced, and keep the traced draft in the close file as evidence of review.' },
      { q: 'How should AI-drafted adjustments be approved?', a: 'Tie approval to materiality. Below the ISA 320 based threshold, one named approver signs; above it, a second approver is required. The person who ran the AI task never approves its output, every draft must cite the records it used, and corrections are made by reversal so the original entry and its history remain.' },
      { q: 'What does Odoo 20 add to the month-end close?', a: 'Odoo’s 20 release notes list a bank reconciliation summary report at period end, a manual Auto Reconciliation option, bank entries that must come from bank transactions, inventory valuation accruals posting directly to the valuation account, and AI-powered financial insights that run on IAP credits. Confirm each item in your own database and edition.' }
    ],
    sources: [
      { label: 'Gartner, "Finance AI adoption remains steady in 2025" (press release, 18 Nov 2025)', url: 'https://www.gartner.com/en/newsroom/press-releases/2025-11-18-gartner-survey-shows-finance-ai-adoption-remains-steady-in-2025' },
      { label: 'Odoo, "Odoo 20 Release Notes" (September 2026)', url: 'https://www.odoo.com/odoo-20-release-notes' }
    ]
  },
  ar: {
    slug: 'ai-month-end-close-financial-reporting',
    topic: 'ai',
    author: 'ahmed',
    reviewer: 'practice',
    image: { alt: 'رسم توضيحي: تقويم شهري أُنجزت أيامه بعلامات صح ويوم مفتوح بإطار ذهبي، وسهم يتجه إلى تقرير مالي برسم بياني بالأعمدة.' },
    date: '2026-10-14',
    title: 'الذكاء الاصطناعي في الإقفال الشهري والتقارير المالية: ماذا تؤتمت؟',
    metaTitle: 'الذكاء الاصطناعي في الإقفال الشهري: ماذا تؤتمت؟',
    dek: 'أي مهام الإقفال يُعدّها الذكاء الاصطناعي، وأيها يكتفي بفحصه، وما قواعد الاعتماد والأدلة التي تُبقي الأرقام المنشورة قابلة للدفاع عنها.',
    description: 'كيف تستخدم الذكاء الاصطناعي في الإقفال الشهري والتقارير المالية: ما المهام التي تؤتمتها، وما الذي يبقى للمراجعة، وقواعد الاعتماد التي تحمي الأرقام.',
    keywords: [
      'الذكاء الاصطناعي في الإقفال الشهري',
      'الذكاء الاصطناعي في التقارير المالية',
      'أتمتة الإقفال الشهري',
      'تحليل الانحرافات بالذكاء الاصطناعي',
      'الإقفال الشهري في {lat}Odoo 20{/lat}'
    ],
    about: ['الذكاء الاصطناعي', 'الإقفال الشهري', 'التقارير المالية', 'تسوية الحسابات', '{lat}Odoo{/lat}'],
    answer: 'يساعد الذكاء الاصطناعي في الإقفال الشهري بتولي المطابقة والتسويات وفحص الانحرافات والمسودة الأولى للتعليق المالي، وهي ما يستهلك معظم أيام الإقفال، وباختبار كل قيد قبل قفل الفترة. ودوره أن يُعدّ مسودات الاستحقاقات والتسويات والتفسيرات ليعتمدها شخص مسمّى، لا أن يرحّلها، وأن يعود كل رقم في التقرير إلى سجلات مذكورة.',
    takeaways: [
      'معظم وقت الإقفال يذهب إلى المطابقة والمتابعة والتفسير، ومن هنا يبدأ دور الذكاء الاصطناعي.',
      'الذكاء الاصطناعي يُعدّ المسودة، وشخص مسمّى يعتمد، بمستويات مرتبطة بالأهمية النسبية.',
      'كل رقم في تعليق كتبه الذكاء الاصطناعي يجب أن يعود إلى سجل في الدفاتر، وإلا يُشطب.',
      'انقل المطابقة واختبار القيود إلى أيام الشهر، فيبدأ الإقفال بالاستثناءات وحدها.'
    ],
    body: [
      { p: 'اليوم الثالث من الإقفال. في البنك سطور غير مطابقة منذ الأسبوع الثاني من الشهر، واستحقاق البضاعة المستلمة التي لم تصل فاتورتها ما زال في جدول بيانات على جهاز أحد المحاسبين، وتقرير الإدارة سيخرج بتعليق كُتب في ساعة متأخرة على يد الشخص نفسه الذي أعدّ الأرقام. نادرًا ما يتأخر الإقفال لأن المحاسبة صعبة؛ يتأخر بسبب المطابقة والمتابعة والتفسير، وهي ثلاثة أنواع من العمل يجيدها الذكاء الاصطناعي إذا صُممت الضوابط الرقابية حوله أولًا.' },
      { p: 'والإدارات المالية تتحرك بالفعل. وجد استطلاع {lat}Gartner{/lat} للذكاء الاصطناعي في المالية لعام {lat}2025{/lat} أن {lat}59%{/lat} من قادة المالية يستخدمون الذكاء الاصطناعي في الوظيفة المالية، مقابل {lat}58%{/lat} في {lat}2024{/lat} و{lat}37%{/lat} في {lat}2023{/lat}، وأن الاستخدام استقر، مع ذكر التعقيد والبيانات والكفاءات كعوائق. الرقم يخص الوظيفة المالية عمومًا لا الإقفال تحديدًا، لكن العوائق التي يذكرها هي نفسها التي يصطدم بها أي مشروع لتطوير الإقفال.' },
      { h2: 'ما المقصود بالذكاء الاصطناعي في الإقفال الشهري؟' },
      { p: 'الذكاء الاصطناعي في الإقفال الشهري هو استخدام نماذج المطابقة واختبارات الشذوذ ونماذج اللغة لإعداد أرقام الفترة وفحصها وتفسيرها، مع بقاء اعتماد كل قيد يغيّر الدفاتر بيد أشخاص مسمّين. ومن المفيد تقسيم الإقفال إلى ثلاثة أنواع من العمل، لأن دور الذكاء الاصطناعي يختلف في كل منها:' },
      { ul: [
        'الإعداد: مطابقة سطور البنك، وتسوية حسابات الميزانية، وإعداد مسودات الاستحقاقات والتسويات.',
        'الفحص: اختبار كل قيد يدوي، والفصل بين الفترات، وحركة التقييم، والأرصدة غير المعتادة قبل قفل الفترة.',
        'التفسير: صياغة مسودة تعليق الانحرافات وسرد تقرير الإدارة.'
      ] },
      { p: 'خطوات الإقفال السليم نفسها لا تتغير، وقد عرضناها في [[blog/month-end-close-checklist-odoo/|قائمة مراجعة الإقفال الشهري على {lat}Odoo{/lat}]]. أما هذا المقال فعن موضع الذكاء الاصطناعي داخل تلك الخطوات.' },
      { h2: 'ما مهام الإقفال التي يؤديها الذكاء الاصطناعي، وما الذي يبقى للإنسان؟' },
      { p: 'القاعدة التي نطبقها: للذكاء الاصطناعي أن يقترح أي شيء، وأن يفحص كل شيء، لكنه لا يغيّر الدفاتر إلا عبر مسودة يعتمدها شخص مسمّى. والمصفوفة التالية تطبق القاعدة مهمةً مهمة.' },
      { table: {
        caption: 'الإقفال الشهري: دور الذكاء الاصطناعي، ودور الإنسان، والدليل المحفوظ',
        head: ['مهمة الإقفال', 'دور الذكاء الاصطناعي', 'دور الشخص المسؤول', 'الدليل المحفوظ'],
        rows: [
          ['التسوية البنكية', 'يقترح المطابقات ويعرض السطور غير المطابقة، كما في [[blog/ai-journal-entries-bank-reconciliation/|أتمتة التسوية البنكية بالذكاء الاصطناعي]]', 'يعتمد المطابقات وكل شطب', 'البنود المسوّاة وغير المسوّاة في نهاية الفترة'],
          ['استحقاق بضاعة مستلمة بلا فاتورة', 'يُعدّ مسودة الاستحقاق من الاستلامات التي لا فاتورة لها، مع تاريخ العكس', 'يعتمد التقدير وتاريخ العكس', 'سجلات الاستلام التي تستند إليها المسودة'],
          ['تسويات حسابات الميزانية', 'يقارن أرصدة الأستاذ العام بالدفاتر المساعدة ويعرض الفروق', 'يعالج الفروق ويوقّع التسوية', 'تسوية موقّعة بمستنداتها'],
          ['مراجعة قيود اليومية اليدوية', 'يقيّم كل قيد يدوي حسب التوقيت والمستخدم وتقريب الرقم والترحيل بعد الفصل', 'يفحص القيود الأعلى خطرًا', 'الدرجة والمراجع والنتيجة لكل قيد'],
          ['إقفال تقييم المخزون', 'يقارن حركة تكلفة الوحدة ويُعدّ مسودات تسويات التقييم', 'يعتمد قيود التقييم', 'إعادة احتساب التكلفة للأصناف المتحركة'],
          ['تعليق الانحرافات', 'يكتب تفسيرات تستشهد بالحسابات والسجلات', 'يحرر السرد ويتحمل مسؤوليته', 'مرجع سجل خلف كل رقم'],
          ['قفل الفترة', 'يتحقق من الشروط: لا مسودات غير معتمدة ولا فروق مفتوحة', 'يضع تاريخ القفل', 'سجل القفل وتوقيع قائمة المراجعة']
        ]
      } },
      { h2: 'كيف يغيّر الذكاء الاصطناعي جدول الإقفال؟' },
      { p: 'المكسب الأكبر لا يأتي من إنجاز مهام الإقفال أسرع في اليوم الأول، بل من إخراجها من نافذة الإقفال أصلًا.' },
      { h3: 'خلال الشهر' },
      { p: 'إذا عملت مطابقة البنك وتقييم القيود اليدوية يوميًا، يبدأ الإقفال بقائمة قصيرة من الاستثناءات بدل شهر كامل من المعاملات الخام. والتقييم نفسه الذي يخدم [[blog/ai-financial-fraud-detection/|كشف الاحتيال المالي بالذكاء الاصطناعي]] يعمل ضابطًا للإقفال أيضًا: قيد يدوي برقم مقرّب يُرحَّل مساء آخر يوم في الشهر من الملاحظات المتكررة في أعمال المراجعة المستمرة لدى {lat}MFT{/lat}، والسؤال عنه يوم ترحيله أيسر كثيرًا من السؤال عنه بعد شهر.' },
      { h3: 'الأيام الأولى من الإقفال' },
      { p: 'يُعدّ الذكاء الاصطناعي مسودات الاستحقاقات وإعادة التبويب وتسويات التقييم، ومع كل منها السجلات التي استند إليها. فيتحول عمل المحاسب من بناء القيود إلى مراجعتها، وهذا أسرع فقط إذا أظهرت كل مسودة دليلها.' },
      { h3: 'إعداد التقارير' },
      { p: 'بعد اعتماد ميزان المراجعة، يكتب الذكاء الاصطناعي مسودة تعليق الانحرافات وسرد تقرير الإدارة، ويحررها المراقب المالي. ولا يحتوي التقرير رقمًا لا يستطيع المراقب المالي تتبعه.' },
      { h2: 'من يعتمد ما يُعدّه الذكاء الاصطناعي؟' },
      { p: 'لا قيمة للسرعة إذا جاءت من تخطي المراجعة. ويقوم تصميم الاعتماد الذي نطبقه مع عملائنا على أربع قواعد:' },
      { ol: [
        'كل مسودة تحمل مراجع السجلات التي بُنيت عليها، والمسودة التي تخلو منها تُعاد ولا تُراجع.',
        'يتدرج الاعتماد حسب حد الأهمية النسبية للعميل وفق معيار {lat}ISA 320{/lat}: دونه معتمِد واحد مسمّى، وفوقه معتمِد ثانٍ. ويشرح مقال [[blog/materiality-isa-320-threshold/|تحديد حد الأهمية النسبية]] كيف يُضبط هذا الحد.',
        'من طلب مهمة الذكاء الاصطناعي أو شغّلها لا يعتمد مخرجاتها، وهذا هو [[blog/ai-segregation-of-duties-internal-controls/|الفصل بين المهام مطبقًا على وكلاء الذكاء الاصطناعي]].',
        'التصحيح بقيد عكسي، لا بحذف قيد مرحّل أو تعديله، فيبقى مسار ما اقتُرح وما اعتُمد وما صُحح.'
      ] },
      { quote: 'الإقفال السريع هو الذي اكتملت أدلته، لا الذي تخطى اعتماداته.' },
      { h2: 'هل يستطيع الذكاء الاصطناعي كتابة التعليق على التقارير المالية؟' },
      { p: 'يستطيع كتابة المسودة الأولى، وكثيرًا ما يكتبها أفضل من مراقب مالي مُرهق في منتصف الليل. لكن الخطر محدد: نموذج اللغة قد يصوغ جملة سلسة برقم لا وجود له في الدفاتر. وهذا اختبار مطابقة عملي يكشف ذلك قبل أن يغادر التقرير الإدارة المالية:' },
      { ol: [
        'ظلّل كل رقم ونسبة في مسودة التعليق.',
        'تتبّع كل رقم إلى ميزان المراجعة المعتمد أو إلى السجلات التي تستشهد بها المسودة.',
        'اشطب أي رقم لا يمكن تتبعه، وأي جملة تنسب سببًا دون سجل يسندها.',
        'احفظ المسودة بعد التتبع في ملف الإقفال دليلًا على المراجعة.'
      ] },
      { p: 'وتطبق وكلاء {lat}MFT{/lat} القاعدة نفسها آليًا وفق مبدأ "الدليل أو الصمت" الذي نشرحه في [[blog/ai-audit-trail-zero-hallucination/|مقال مسار التدقيق ومصدر مخرجات الذكاء الاصطناعي]]: الملاحظة التي لا تستشهد بشيء، أو التي تذكر رقمًا غير موجود في السجلات المذكورة، تُرفض وتظهر مشطوبة، لا كحقيقة. ويبقى التتبع البشري قائمًا، لأن من يوقّع التقرير هو المراقب المالي لا النموذج.' },
      { h2: 'ماذا يغيّر {lat}Odoo 20{/lat} في الإقفال؟' },
      { p: 'وفق ملاحظات إصدار {lat}Odoo 20{/lat}، تمس تغييرات محاسبية عدة الإقفالَ مباشرة:' },
      { ul: [
        'تقرير ملخص للتسوية البنكية يعرض المعاملات المسوّاة وغير المسوّاة في تاريخ نهاية الفترة، مع إمكانية تشغيل التسوية التلقائية ({lat}Auto Reconciliation{/lat}) يدويًا.',
        'اتساق البنك: القيود التي تمس الحسابات البنكية يجب أن تنشأ من معاملات بنكية.',
        'في التقييم المستمر، تُرحَّل قيود الاستحقاق من تقرير إقفال تقييم المخزون مباشرة إلى حساب التقييم، وتُحدَّث تكلفة البضاعة المباعة بأثر رجعي إذا تغيرت التكلفة بعد التسليم. راجع [[blog/odoo-20-inventory-valuation-changes/|تغييرات تقييم المخزون في {lat}Odoo 20{/lat}]].',
        'دمج أرباح وخسائر فروق العملة في سطر واحد لكل فاتورة، ونماذج إهلاك تقبل النسب والكسور العشرية.',
        'إعادة تسمية حالات السداد: "{lat}In Process{/lat}" تصبح "{lat}Paid{/lat}"، و"{lat}Paid{/lat}" تصبح "{lat}Reconciled{/lat}"، وهذا يؤثر في الفلاتر المحفوظة وتقارير الإقفال.',
        'تحليلات مالية بالذكاء الاصطناعي: أسئلة للمساعد الذكي عن المدينين أو التدفق النقدي أو مشكلات التسوية، يجيب عنها من البيانات المحاسبية في قاعدة بياناتك وحدها، بما في ذلك مراجعة أخطاء التسوية المشتبه بها.'
      ] },
      { p: 'كل مزايا الذكاء الاصطناعي في {lat}Odoo 20{/lat} تعمل بأرصدة {lat}IAP{/lat} تُحتسب لكل طلب ولا تدخل في أي باقة، فالروتين اليومي له تكلفة تشغيل يجب أن تدخل الموازنة. أما تواريخ القفل ونماذج التسوية ولوحات {lat}Spreadsheet{/lat} فموجودة في إصدارات {lat}Odoo{/lat} الحديثة، فتحقق من سلوكها في قاعدة بيانات {lat}20{/lat} لديك قبل أن تبني الإقفال عليها. والخريطة الكاملة في [[blog/odoo-20-ai-features-accounting/|مزايا الذكاء الاصطناعي في {lat}Odoo 20{/lat} للمحاسبة]].' },
      { h2: 'ما الذي قد يسوء حين يدخل الذكاء الاصطناعي الإقفال؟' },
      { ul: [
        'أتمتة إقفال معيب: إذا كان دليل الحسابات أو قواعد الفصل بين الفترات غير واضحة، يكرر الذكاء الاصطناعي الارتباك بسرعة أكبر.',
        'قبول المطابقات بالجملة: يصبح الاعتماد نقرة، ويختفي الضابط بينما يقول السجل إنه حدث.',
        'تراكم المسودات: مسودات غير معتمدة في تاريخ القفل تعني فترة تُقفل على أرقام لا يملكها أحد. اجعل "لا مسودات مفتوحة" شرطًا للقفل.',
        'الدليل في المكان الخطأ: يحتفظ {lat}Odoo 20{/lat} بمحادثات الذكاء الاصطناعي حتى {lat}30{/lat} يومًا بعد آخر رسالة، فكل ما يسند قيد إقفال مكانه ملف الإقفال لا المحادثة.'
      ] },
      { h2: 'من أين تبدأ هذا الشهر؟' },
      { ol: [
        'اكتب جدول الإقفال قائمةَ مهام، مع عدد أيام العمل لكل مهمة ومن يملكها.',
        'علّم المهام التي يغلب عليها المطابقة أو المتابعة أو التفسير، فهي المرشحة.',
        'شغّل الذكاء الاصطناعي على اثنتين منها بالتوازي خلال إقفال واحد دون تغيير الإجراء الرسمي، وقارن مسوداته بما رحّله فريقك.',
        'حدد مستويات الاعتماد وشروط القفل قبل أن تُعتمد مخرجات الذكاء الاصطناعي.',
        'في الإقفال التالي انقل المطابقة وتقييم القيود إلى أيام الشهر، واترك مسودة التعليق للنهاية.'
      ] },
      { p: 'هذا هو العمل الذي يؤديه [[intelligence/virtual-cfo/|وكيل المدير المالي الافتراضي]] كخدمة مُدارة: يقرأ الدفاتر عبر {lat}API{/lat} وقت الاستعلام، ويُعدّ تحليلات وتسويات تستشهد بالسجلات التي تسندها، ويترك الاعتماد لشخص مسمّى لدى العميل، ولا يُرحَّل شيء تلقائيًا. وللفرق التي تريد أيضًا قائدًا ماليًا متمرسًا حول الإقفال، تجمع [[services/virtual-cfo/|خدمة المدير المالي الافتراضي]] هذا العمل مع أشخاص أقفلوا الدفاتر ووقّعوا التقارير بأنفسهم.' }
    ],
    faq: [
      { q: 'هل يستطيع الذكاء الاصطناعي إقفال الدفاتر تلقائيًا؟', a: 'لا، ولا ينبغي له. يستطيع مطابقة المعاملات وتسوية الحسابات واختبار القيود وإعداد مسودات الاستحقاقات والتسويات والتعليق، لكن كل تغيير في الدفاتر يجب أن يكون مسودة يعتمدها شخص مسمّى، مع معتمِد ثانٍ فوق حد الأهمية النسبية. ومن يوقّع القوائم المالية يبقى مسؤولًا عنها.' },
      { q: 'ما مهام الإقفال الشهري التي تُؤتمت بالذكاء الاصطناعي أولًا؟', a: 'ابدأ بالمهام التي يغلب عليها المطابقة والمتابعة: التسوية البنكية، وتسويات حسابات الميزانية، وتقييم كل قيد يومية يدوي. أدلتها واضحة ونتائجها قابلة للقياس والاجتهاد فيها محدود. وأجّل التقديرات وتسويات التقييم والتعليق على التقارير حتى تثبت مستويات الاعتماد وقواعد الأدلة في إقفال واحد على الأقل.' },
      { q: 'هل يمكن الاعتماد على التعليق المالي الذي يكتبه الذكاء الاصطناعي؟', a: 'فقط بعد المطابقة. قد يكتب نموذج اللغة تفسيرًا سلسًا يتضمن رقمًا غير موجود في الدفاتر. تتبّع كل رقم ونسبة إلى ميزان المراجعة المعتمد أو السجلات المذكورة، واشطب ما لا يمكن تتبعه، واحفظ المسودة بعد التتبع في ملف الإقفال دليلًا على المراجعة.' },
      { q: 'كيف تُعتمد التسويات التي يُعدّها الذكاء الاصطناعي؟', a: 'اربط الاعتماد بالأهمية النسبية. دون الحد المبني على معيار {lat}ISA 320{/lat} يوقّع معتمِد واحد مسمّى، وفوقه يلزم معتمِد ثانٍ. ومن شغّل مهمة الذكاء الاصطناعي لا يعتمد مخرجاتها، ويجب أن تستشهد كل مسودة بالسجلات التي استخدمتها، ويكون التصحيح بقيد عكسي حتى يبقى القيد الأصلي وتاريخه.' },
      { q: 'ماذا يضيف {lat}Odoo 20{/lat} إلى الإقفال الشهري؟', a: 'تذكر ملاحظات إصدار {lat}Odoo 20{/lat} تقريرًا ملخصًا للتسوية البنكية في نهاية الفترة، وتشغيلًا يدويًا للتسوية التلقائية، وقيودًا بنكية يجب أن تنشأ من معاملات بنكية، وترحيل استحقاقات تقييم المخزون مباشرة إلى حساب التقييم، وتحليلات مالية بالذكاء الاصطناعي تعمل بأرصدة {lat}IAP{/lat}. تحقق من كل بند في نسختك.' }
    ],
    sources: [
      { label: '{lat}Gartner{/lat}، {lat}"Finance AI adoption remains steady in 2025"{/lat} (بيان صحفي، {lat}18{/lat} نوفمبر {lat}2025{/lat})', url: 'https://www.gartner.com/en/newsroom/press-releases/2025-11-18-gartner-survey-shows-finance-ai-adoption-remains-steady-in-2025' },
      { label: '{lat}Odoo{/lat}، {lat}"Odoo 20 Release Notes"{/lat} (سبتمبر {lat}2026{/lat})', url: 'https://www.odoo.com/odoo-20-release-notes' }
    ]
  }
};
