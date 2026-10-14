// 12. AI accounting on Odoo 20, step by step: a 90-day rollout with gates
module.exports = {
  en: {
    slug: 'odoo-20-ai-accounting-step-by-step',
    topic: 'odoo',
    author: 'ahmed',
    reviewer: 'practice',
    image: { alt: 'Illustration: scattered transactions flow through a glowing white core onto a white ledger page showing a rollout track of three phases with gates, the final phase in cyan.' },
    date: '2026-10-14',
    title: 'AI accounting on Odoo 20, step by step: a 90-day rollout with gates',
    metaTitle: 'AI accounting on Odoo 20: a 90-day rollout plan',
    dek: 'A phased procedure for switching on Odoo 20’s AI features in finance: what to enable first, what each gate must prove, and when agents may start drafting.',
    description: 'A step-by-step plan for AI accounting on Odoo 20: three 30-day phases, measurable gates, named approvers and retained evidence before agents draft entries.',
    keywords: ['AI accounting Odoo 20', 'Odoo 20 AI implementation steps', 'Odoo AI rollout plan', 'AI bank reconciliation Odoo', 'Odoo 20 AI agents accounting'],
    about: ['Odoo', 'Artificial intelligence', 'Accounting', 'Bank reconciliation', 'Internal control'],
    answer: 'To apply AI accounting on Odoo 20, roll it out in three 30-day phases with a gate between each: first assistive features such as bill line prediction and financial insights, then AI in bank reconciliation, then agents that draft entries for approval. Each gate requires measured error rates, named approvers and retained evidence before the next phase starts.',
    takeaways: [
      'Measure today’s error and backlog figures before enabling anything, or no gate can be passed honestly.',
      'Start with features that suggest, move to features that match, and finish with agents that draft.',
      'Every gate has a stop rule written in advance, not decided after the results arrive.',
      'Agent conversations are kept up to 30 days, so export what your audit file needs.'
    ],
    body: [
      { p: 'Gartner’s 2025 survey of finance leaders found that 59% use AI in their finance function, almost unchanged from 58% a year earlier, after a sharp rise from 37% in 2023. The barriers cited were complexity, data and talent. In our experience the stall rarely comes from the model. It comes from the order of work: a team switches on several AI features at once, cannot tell which one produced which error, and quietly returns to doing things by hand.' },
      { p: 'Odoo 20 puts a broad set of AI features inside the accounting application. This guide is the procedure we use to bring them in one layer at a time, over roughly 90 days, with a gate between phases that must be passed on evidence.' },
      { h2: 'What does applying AI accounting on Odoo 20 mean?' },
      { p: 'AI accounting on Odoo 20 is the controlled use of Odoo’s AI features, and of external AI agents connected to the database, to suggest, match, explain and draft accounting records, with every output reviewed by a named person before it affects the ledger. According to Odoo’s 20 release notes, the relevant features include:' },
      { ul: [
        'Bill line prediction: product, account, tax and analytic suggested from bill history and the label.',
        'AI-powered financial insights: questions about receivables, cash flow or reconciliation issues, answered solely from the accounting data in your database, including a review of suspected reconciliation errors.',
        'Agentic automation: agents triggered by automated and scheduled actions that create and update records.',
        'A connection to the database through MCP (Model Context Protocol) for outside AI tools.'
      ] },
      { p: 'All AI features require IAP credits, billed per request and not included in any plan. Confirm which agent features your edition and plan include before you design around them. The full inventory is in [[blog/odoo-20-ai-features-accounting/|the Odoo 20 AI feature map for accounting]].' },
      { h2: 'What must be true before day 1?' },
      { p: 'Day 0 is the step most teams skip, and it decides whether the gates mean anything.' },
      { ul: [
        'Version and support: Odoo 17.0 standard support was planned to end in September 2026. If you are still on it, finish the [[blog/odoo-20-upgrade-plan-17-18-19/|upgrade plan]] before adding AI.',
        'Chart of accounts: in Odoo 20 parent accounts replace account groups and account codes become optional. Settle your coding policy first, because bill line prediction learns from history, including history you would rather it forgot.',
        'Access rights: record rules are removed and the domain sits on the access right, and group changes are logged in the user’s chatter. Redesign roles, then create a separate user for each agent.',
        'Status names: payment statuses are renamed (In Process becomes Paid, Paid becomes Reconciled). Update reports, filters and any prompt that refers to them.',
        'Lock dates: in recent Odoo versions lock dates protect closed periods; set them and restrict who can change them.',
        'Credits: name an owner for the IAP balance and set a monthly ceiling in requests.',
        'Baseline: record today’s days to close, unreconciled bank items by age, and the share of bills corrected after entry.'
      ] },
      { h2: 'Days 1 to 30: which AI features should you switch on first?' },
      { p: 'Start with features that suggest and leave the person in control of every posting. Bill line prediction and financial insights fit this description; so does bill digitization, which in recent Odoo versions reads bills by OCR using IAP credits. The work in this phase is measurement:' },
      { ol: [
        'Enable bill line prediction for one journal or one group of vendors, not all at once.',
        'For every bill in the pilot, the reviewer records whether each suggested account, tax and analytic was accepted, changed or removed.',
        'Ask the financial insights assistant the same five questions each week, and tie every answer back to the standard report it should agree with.',
        'Log every disagreement with its cause: stale history, a miscoded vendor, or a wrong answer.'
      ] },
      { p: 'A worked example of the rule we apply: a changed analytic is an inconvenience, a changed account is a classification error, and a changed tax is a compliance error. Score them separately. A pilot can pass with frequent analytic corrections and fail on a handful of tax corrections.' },
      { h2: 'Days 31 to 60: how do you bring AI into bank reconciliation?' },
      { p: 'Reconciliation is where Odoo 20 changes the most. According to Odoo’s 20 release notes, entries affecting bank accounts must now originate from bank transactions, matching rules support a payment tolerance and a matching order, Auto Reconciliation can be run manually, and a summary report shows reconciled and unreconciled items at period end. The AI assistant can review suspected reconciliation errors and return findings and recommendations.' },
      { ol: [
        'Write the matching rules on paper first: which fields, what tolerance, in what order. Approve them as you would a policy.',
        'Run Auto Reconciliation manually on a closed month and compare the result with the reconciliation you signed at the time.',
        'Ask the assistant to review the remaining unreconciled items, and have a person resolve each recommendation with a recorded reason.',
        'File the summary report in the close pack, signed by preparer and reviewer, as set out in the [[blog/month-end-close-checklist-odoo/|month-end close checklist]].'
      ] },
      { p: 'The control detail sits in [[blog/odoo-20-bank-reconciliation-and-bill-payments/|Odoo 20 bank reconciliation and bill payments]], and the AI angle in [[blog/ai-journal-entries-bank-reconciliation/|automating journal entries and bank reconciliation with AI]].' },
      { h2: 'Days 61 to 90: when may agents start drafting?' },
      { p: 'Only now, and only in draft. According to Odoo’s 20 release notes, agents can be triggered by automated and scheduled actions, an agent can become the default agent for a model, agent questions and permission requests are answered through buttons, and the agent asks before exceeding its tool call limit. Stored conversations are kept up to 30 days after the last message.' },
      { ul: [
        'Choose one narrow use, such as drafting accrual reversals or recurring entries, and give the agent its own user with the minimum rights.',
        'Keep every output in draft; approval is tiered by materiality, with a second approver above your threshold.',
        'Export the conversation and the records it cited into the close file before the retention period ends, because ISA 230 expects documentation an experienced auditor can follow.',
        'Correct by reversal, never by deletion, so the audit trail shows both the draft and the fix.'
      ] },
      { p: 'If an external reviewer will read the books continuously, plan that link with [[blog/connect-ai-to-odoo-continuous-audit/|connecting AI to Odoo for continuous auditing]]. The evidence principle behind all of it is in [[blog/ai-audit-trail-zero-hallucination/|evidence or silence]].' },
      { quote: 'Switch on one AI feature at a time, and only after you can measure what it got wrong.' },
      { h2: 'What does each gate have to prove?' },
      { p: 'COSO’s Principle 16 calls for ongoing and separate evaluations of whether controls are working. The gates are those evaluations, made explicit. Each one has a stop rule agreed before the phase starts.' },
      { table: {
        caption: 'The 90-day AI accounting rollout on Odoo 20: scope, owner, gate evidence and stop rule',
        head: ['Phase', 'Scope', 'Owner', 'Evidence to pass the gate', 'Stop rule'],
        rows: [
          ['Day 0', 'Version, chart of accounts, roles, lock dates, credits, baseline', 'Finance manager', 'Signed role matrix, recorded baseline', 'No baseline, no start'],
          ['Days 1 to 30', 'Bill line prediction, financial insights, bill digitization', 'Payables lead', 'Correction rates by account, tax and analytic; insight answers tied to reports', 'Any unexplained tax correction pattern'],
          ['Days 31 to 60', 'Matching rules, Auto Reconciliation, AI review of reconciliation errors', 'Treasury or GL accountant', 'Signed summary report; closed-month rerun agrees with the signed reconciliation', 'An automatic match reversed on review without explanation'],
          ['Days 61 to 90', 'One agent drafting one entry type', 'Controller', 'Every draft approved or rejected by a named person; conversations exported', 'Any agent output posted without approval'],
          ['After 90', 'Second agent or wider scope', 'Finance manager with internal audit', 'Quarterly review of rights, credits and rejected drafts', 'Credit use without an owning agent']
        ]
      } },
      { p: 'A stop rule pauses the phase, not the project. Fix the cause, rerun the measurement, and reopen the gate.' },
      { h2: 'Where should you start on Monday?' },
      { ol: [
        'Confirm your Odoo version, edition and plan, and what each includes for AI.',
        'Record the baseline figures before anyone changes a setting.',
        'Pick one journal for the bill line prediction pilot and one reviewer to score it.',
        'Write the three stop rules and have the finance manager sign them.',
        'Book the day-30 gate review now, with someone from outside the pilot in the room.'
      ] },
      { p: 'The same gated approach applies to purchasing, covered in [[blog/odoo-20-purchase-approvals-automation/|automating purchase approvals in Odoo 20]], and the broader context is in [[blog/ai-in-accounting-guide-2026/|our guide to AI in accounting]] and [[blog/ai-month-end-close-financial-reporting/|AI in the monthly close]]. MFT runs this rollout as part of our [[services/odoo-erp/|Odoo ERP work]]. Our [[intelligence/auditor/|Auditor agent]] and [[intelligence/virtual-cfo/|Virtual CFO agent]] are available as a managed service: they draft, a named and registered person approves, and nothing is auto-posted.' }
    ],
    faq: [
      { q: 'How long does it take to implement AI accounting in Odoo 20?', a: 'A controlled rollout takes about 90 days for a typical finance team: 30 days for assistive features such as bill line prediction, 30 for AI in bank reconciliation, and 30 for a first agent that drafts entries. The time goes into measuring errors and passing gates, not into switching features on.' },
      { q: 'Which Odoo 20 AI feature should accounting enable first?', a: 'Start with features that suggest and leave a person in control of posting, such as bill line prediction and the AI-powered financial insights assistant. Pilot them on one journal, record every correction by type, and check each assistant answer against the standard report it should agree with.' },
      { q: 'Can Odoo 20 AI agents post journal entries automatically?', a: 'According to Odoo’s 20 release notes, agents can create and update records and run from automated or scheduled actions. Whether their output reaches the ledger without review is a control you design. We keep agent output in draft, require a named approver tiered by materiality, and correct errors by reversal.' },
      { q: 'How long does Odoo 20 keep AI agent conversations?', a: 'Odoo’s 20 release notes state that stored conversations are kept up to 30 days after the last message. If a conversation supports an accounting entry or a close decision, export it with the records it cited into your close file before that period ends, so the evidence survives for the auditor.' },
      { q: 'What should we measure before starting AI in accounting?', a: 'Record a baseline before changing any setting: days to close, unreconciled bank items by age, and the share of bills corrected after entry. Without a baseline you cannot show that a phase improved anything, and no gate in the rollout can be passed on evidence rather than impression.' }
    ],
    sources: [
      { label: 'Gartner, "Gartner Survey Shows Finance AI Adoption Remains Steady in 2025" (press release, 18 Nov 2025)', url: 'https://www.gartner.com/en/newsroom/press-releases/2025-11-18-gartner-survey-shows-finance-ai-adoption-remains-steady-in-2025' },
      { label: 'Odoo, "Odoo 20 Release Notes" (September 2026)', url: 'https://www.odoo.com/odoo-20-release-notes' }
    ]
  },
  ar: {
    slug: 'odoo-20-ai-accounting-step-by-step',
    topic: 'odoo',
    author: 'ahmed',
    reviewer: 'practice',
    image: { alt: 'رسم توضيحي: معاملات متناثرة تتدفق عبر نواة بيضاء مضيئة إلى صفحة دفتر بيضاء تُظهر مسار تطبيق من ثلاث مراحل تفصلها بوابات، والمرحلة الأخيرة باللون السماوي.' },
    date: '2026-10-14',
    title: 'المحاسبة بالذكاء الاصطناعي على {lat}Odoo 20{/lat} خطوة بخطوة: خطة {lat}90{/lat} يومًا ببوابات',
    metaTitle: 'المحاسبة بالذكاء الاصطناعي على {lat}Odoo 20{/lat}: خطة {lat}90{/lat} يومًا',
    dek: 'إجراء مرحلي لتشغيل ميزات الذكاء الاصطناعي في {lat}Odoo 20{/lat} داخل الإدارة المالية: ماذا تفعّل أولًا، وماذا يجب أن تثبته كل بوابة، ومتى يبدأ الوكلاء في إعداد المسودات.',
    description: 'خطة عملية لتطبيق المحاسبة بالذكاء الاصطناعي على Odoo 20 في ثلاث مراحل من 30 يومًا، ببوابات قابلة للقياس ومعتمِدين مسمّين ودليل محفوظ قبل أن يعدّ الوكلاء القيود.',
    keywords: ['الذكاء الاصطناعي في المحاسبة على أودو', 'تطبيق الذكاء الاصطناعي في {lat}Odoo 20{/lat}', 'خطوات تطبيق أودو {lat}20{/lat} للمحاسبة', 'التسوية البنكية بالذكاء الاصطناعي', 'وكلاء الذكاء الاصطناعي في أودو'],
    about: ['{lat}Odoo{/lat}', 'الذكاء الاصطناعي', 'المحاسبة', 'التسوية البنكية', 'الرقابة الداخلية'],
    answer: 'لتطبيق المحاسبة بالذكاء الاصطناعي على {lat}Odoo 20{/lat} قسّم التشغيل إلى ثلاث مراحل، كل منها {lat}30{/lat} يومًا، تفصل بينها بوابات: أولًا الميزات المساعدة مثل التنبؤ ببنود الفاتورة والتحليلات المالية، ثم الذكاء الاصطناعي في التسوية البنكية، ثم وكلاء يعدّون القيود مسودةً للاعتماد. ولا تُفتح مرحلة قبل قياس الأخطاء وتسمية المعتمِدين وحفظ الدليل.',
    takeaways: [
      'قِس معدلات الأخطاء والمتأخرات الحالية قبل تفعيل أي شيء، وإلا فلن تُجتاز أي بوابة بأمانة.',
      'ابدأ بالميزات التي تقترح، ثم التي تطابق، وانتهِ بالوكلاء الذين يعدّون المسودات.',
      'لكل بوابة قاعدة توقف مكتوبة مسبقًا، لا تُقرَّر بعد ظهور النتائج.',
      'محادثات الوكلاء تُحفظ حتى {lat}30{/lat} يومًا فقط، فصدّر ما يحتاجه ملف المراجعة.'
    ],
    body: [
      { p: 'وجد استطلاع {lat}Gartner{/lat} لقيادات المالية في {lat}2025{/lat} أن {lat}59%{/lat} منهم يستخدمون الذكاء الاصطناعي في الوظيفة المالية، مقابل {lat}58%{/lat} في العام السابق، بعد قفزة من {lat}37%{/lat} في {lat}2023{/lat}. أي أن الانتشار توقف عن النمو تقريبًا، والعوائق المذكورة هي التعقيد والبيانات والكفاءات. وما نراه في الميدان أن التعثر نادرًا ما يأتي من النموذج نفسه، بل من ترتيب العمل: يفعّل الفريق عدة ميزات دفعة واحدة، ثم لا يعرف أي ميزة أنتجت أي خطأ، فيعود بهدوء إلى العمل اليدوي.' },
      { p: 'يضع {lat}Odoo 20{/lat} مجموعة واسعة من ميزات الذكاء الاصطناعي داخل تطبيق المحاسبة. وهذا الدليل هو الإجراء الذي نتبعه لإدخالها طبقةً بعد طبقة، خلال نحو {lat}90{/lat} يومًا، مع بوابة بين كل مرحلتين لا تُجتاز إلا بدليل.' },
      { h2: 'ماذا يعني تطبيق المحاسبة بالذكاء الاصطناعي على {lat}Odoo 20{/lat}؟' },
      { p: 'المحاسبة بالذكاء الاصطناعي على {lat}Odoo 20{/lat} هي الاستخدام المنضبط لميزات الذكاء الاصطناعي في {lat}Odoo{/lat}، وللوكلاء الخارجيين المتصلين بقاعدة البيانات، في اقتراح السجلات المحاسبية ومطابقتها وتفسيرها وإعداد مسوداتها، على أن يراجع شخص مسمّى كل مخرَج قبل أن يمس دفتر الأستاذ. وبحسب ملاحظات إصدار {lat}Odoo 20{/lat} تشمل الميزات ذات الصلة:' },
      { ul: [
        'التنبؤ ببنود فاتورة المورد: اقتراح المنتج والحساب والضريبة والتوزيع التحليلي من تاريخ الفواتير ووصف البند.',
        'التحليلات المالية بالذكاء الاصطناعي: أسئلة عن الذمم المدينة والتدفق النقدي ومشكلات التسوية، يُجاب عنها من البيانات المحاسبية في قاعدتك وحدها، ومنها مراجعة أخطاء التسوية المشتبه بها.',
        'الأتمتة بالوكلاء: وكلاء تطلقهم الإجراءات الآلية والمجدولة، ينشئون السجلات ويحدّثونها.',
        'الاتصال بقاعدة البيانات عبر {lat}MCP (Model Context Protocol){/lat} لأدوات الذكاء الاصطناعي الخارجية.'
      ] },
      { p: 'وكل ميزات الذكاء الاصطناعي تحتاج رصيد {lat}IAP{/lat} يُحتسب لكل طلب ولا يدخل في أي خطة. وتأكد من ميزات الوكلاء المشمولة في نسختك وخطتك قبل أن تبني عليها. والحصر الكامل في [[blog/odoo-20-ai-features-accounting/|خريطة ميزات الذكاء الاصطناعي في {lat}Odoo 20{/lat} للمحاسبة]].' },
      { h2: 'ما الذي يجب أن يكون جاهزًا قبل اليوم الأول؟' },
      { p: 'اليوم صفر هو الخطوة التي تتجاوزها أغلب الفرق، وهو الذي يحدد هل للبوابات معنى أصلًا.' },
      { ul: [
        'الإصدار والدعم: كان مقررًا أن ينتهي الدعم القياسي لـ{lat}Odoo 17.0{/lat} في سبتمبر {lat}2026{/lat}. إن كنت ما زلت عليه فأنهِ [[blog/odoo-20-upgrade-plan-17-18-19/|خطة الترقية]] قبل إضافة الذكاء الاصطناعي.',
        'دليل الحسابات: في {lat}Odoo 20{/lat} تحل الحسابات الأم محل مجموعات الحسابات، وتصبح أكواد الحسابات اختيارية. احسم سياسة الترميز أولًا، لأن التنبؤ ببنود الفاتورة يتعلم من التاريخ، بما فيه تاريخ تفضّل أن ينساه.',
        'الصلاحيات: أُلغيت قواعد السجلات وصار النطاق على صلاحية الوصول نفسها، وتُسجَّل تغييرات المجموعات في سجل محادثة المستخدم. أعد تصميم الأدوار، ثم أنشئ مستخدمًا مستقلًا لكل وكيل.',
        'أسماء الحالات: تغيّرت حالات الدفع (صار {lat}In Process{/lat} يسمى {lat}Paid{/lat}، و{lat}Paid{/lat} يسمى {lat}Reconciled{/lat}). حدّث التقارير والفلاتر وأي تعليمات للوكيل تشير إليها.',
        'تواريخ الإقفال: في إصدارات {lat}Odoo{/lat} الحديثة تحمي تواريخ الإقفال الفترات المقفلة؛ اضبطها وحدد من يملك تغييرها.',
        'الرصيد: سمِّ مالكًا لرصيد {lat}IAP{/lat}، وضع سقفًا شهريًا بعدد الطلبات.',
        'خط الأساس: سجّل اليوم عدد أيام الإقفال الشهري، وبنود التسوية البنكية المعلّقة حسب أعمارها، ونسبة فواتير الموردين التي تُصحَّح بعد إدخالها.'
      ] },
      { h2: 'الأيام {lat}1{/lat} إلى {lat}30{/lat}: أي ميزات تفعّل أولًا؟' },
      { p: 'ابدأ بما يقترح ويترك الترحيل كله بيد الإنسان: التنبؤ ببنود الفاتورة والتحليلات المالية، ومعها رقمنة الفواتير التي تقرأ الفاتورة بتقنية {lat}OCR{/lat} وتستهلك رصيد {lat}IAP{/lat} في إصدارات {lat}Odoo{/lat} الحديثة. والعمل الحقيقي في هذه المرحلة هو القياس:' },
      { ol: [
        'فعّل التنبؤ ببنود الفاتورة على دفتر يومية واحد أو مجموعة موردين واحدة، لا على الكل.',
        'في كل فاتورة ضمن التجربة، يسجّل المراجع هل قُبل الحساب والضريبة والتوزيع التحليلي المقترح كما هو، أم عُدّل، أم حُذف.',
        'اطرح على مساعد التحليلات المالية الأسئلة الخمسة نفسها كل أسبوع، واربط كل إجابة بالتقرير القياسي الذي يجب أن تتفق معه.',
        'دوّن كل اختلاف مع سببه: تاريخ قديم، أو مورد مرمَّز خطأ، أو إجابة خاطئة.'
      ] },
      { p: 'ومثال تطبيقي على القاعدة التي نعمل بها: تعديل التوزيع التحليلي إزعاج، وتعديل الحساب خطأ تبويب، وتعديل الضريبة خطأ امتثال. قِس كل نوع على حدة. فقد تنجح التجربة مع تصحيحات تحليلية كثيرة، وتفشل بسبب عدد قليل من تصحيحات الضريبة.' },
      { h2: 'الأيام {lat}31{/lat} إلى {lat}60{/lat}: كيف تُدخل الذكاء الاصطناعي في التسوية البنكية؟' },
      { p: 'التسوية البنكية ({lat}Bank reconciliation{/lat}) هي أكثر ما يغيّره {lat}Odoo 20{/lat}. فبحسب ملاحظات الإصدار يجب أن تنشأ القيود التي تمس حسابات البنوك من حركات بنكية، وتدعم قواعد المطابقة حد تسامح في السداد وترتيبًا للمطابقة، ويمكن تشغيل المطابقة التلقائية يدويًا، ويعرض تقرير ملخص البنود المسوّاة وغير المسوّاة في نهاية الفترة. ويستطيع المساعد مراجعة أخطاء التسوية المشتبه بها وتقديم نتائج وتوصيات.' },
      { ol: [
        'اكتب قواعد المطابقة على الورق أولًا: أي الحقول، وبأي حد تسامح، وبأي ترتيب. واعتمدها كما تعتمد سياسة.',
        'شغّل المطابقة التلقائية يدويًا على شهر مقفل، وقارن النتيجة بالتسوية التي وقّعتها وقتها.',
        'اطلب من المساعد مراجعة البنود المعلّقة المتبقية، واجعل شخصًا يحسم كل توصية بسبب مسجّل.',
        'احفظ تقرير الملخص في ملف الإقفال الشهري موقّعًا من المُعِدّ والمراجع، كما في [[blog/month-end-close-checklist-odoo/|قائمة الإقفال الشهري]].'
      ] },
      { p: 'تفاصيل الضوابط الرقابية في [[blog/odoo-20-bank-reconciliation-and-bill-payments/|التسوية البنكية ودفع الفواتير في {lat}Odoo 20{/lat}]]، وزاوية الذكاء الاصطناعي في [[blog/ai-journal-entries-bank-reconciliation/|أتمتة قيود اليومية والتسوية البنكية بالذكاء الاصطناعي]].' },
      { h2: 'الأيام {lat}61{/lat} إلى {lat}90{/lat}: متى يبدأ الوكلاء في إعداد المسودات؟' },
      { p: 'الآن فقط، وبصيغة المسودة فقط. بحسب ملاحظات إصدار {lat}Odoo 20{/lat}، يمكن إطلاق الوكلاء من الإجراءات الآلية والمجدولة، ويمكن جعل وكيل هو الوكيل الافتراضي لنموذج بيانات معيّن، وتُجاب أسئلة الوكيل وطلبات الإذن عبر أزرار، ويستأذن الوكيل قبل تجاوز حد استدعاء الأدوات. وتُحفظ المحادثات حتى {lat}30{/lat} يومًا بعد آخر رسالة.' },
      { ul: [
        'اختر استخدامًا ضيقًا واحدًا، مثل إعداد قيود عكس المستحقات أو القيود المتكررة، وامنح الوكيل مستخدمًا خاصًا بأدنى صلاحيات.',
        'أبقِ كل مخرَج مسودة؛ والاعتماد متدرج بحسب الأهمية النسبية، مع معتمِد ثانٍ فوق الحد.',
        'صدّر المحادثة والسجلات التي استند إليها الوكيل إلى ملف الإقفال قبل انتهاء مدة الحفظ، لأن {lat}ISA 230{/lat} يتطلب توثيقًا يستطيع مراجع متمرس أن يتتبعه.',
        'صحّح بقيد عكسي لا بالحذف، ليُظهر مسار التدقيق المسودة والتصحيح معًا.'
      ] },
      { p: 'وإن كان مراجع خارجي سيقرأ الدفاتر باستمرار، فخطط لهذا الربط مع [[blog/connect-ai-to-odoo-continuous-audit/|ربط الذكاء الاصطناعي بـ{lat}Odoo{/lat} للمراجعة المستمرة]]. ومبدأ الدليل الذي يحكم كل ذلك في [[blog/ai-audit-trail-zero-hallucination/|الدليل أو الصمت]].' },
      { quote: 'فعّل ميزة ذكاء اصطناعي واحدة في كل مرة، ولا تفعّلها قبل أن تستطيع قياس أخطائها.' },
      { h2: 'ماذا يجب أن تثبت كل بوابة؟' },
      { p: 'يطلب المبدأ {lat}16{/lat} في إطار {lat}COSO{/lat} تقييمات مستمرة ومنفصلة للتأكد من أن الضوابط تعمل. والبوابات هي هذه التقييمات بصيغة صريحة، ولكل منها قاعدة توقف يُتفق عليها قبل بدء المرحلة.' },
      { table: {
        caption: 'خطة {lat}90{/lat} يومًا للمحاسبة بالذكاء الاصطناعي على {lat}Odoo 20{/lat}: النطاق والمالك ودليل البوابة وقاعدة التوقف',
        head: ['المرحلة', 'النطاق', 'المالك', 'الدليل المطلوب لاجتياز البوابة', 'قاعدة التوقف'],
        rows: [
          ['اليوم صفر', 'الإصدار، ودليل الحسابات، والأدوار، وتواريخ الإقفال، والرصيد، وخط الأساس', 'المدير المالي', 'مصفوفة أدوار موقّعة، وخط أساس مسجّل', 'لا خط أساس، لا بداية'],
          ['الأيام {lat}1{/lat} إلى {lat}30{/lat}', 'التنبؤ ببنود الفاتورة، والتحليلات المالية، ورقمنة الفواتير', 'مسؤول الدائنين', 'معدلات التصحيح للحساب والضريبة والتحليل؛ وإجابات مربوطة بالتقارير', 'نمط غير مفسَّر في تصحيحات الضريبة'],
          ['الأيام {lat}31{/lat} إلى {lat}60{/lat}', 'قواعد المطابقة، والمطابقة التلقائية، ومراجعة أخطاء التسوية', 'محاسب الخزينة أو الأستاذ العام', 'تقرير ملخص موقّع؛ وإعادة تشغيل شهر مقفل تتفق مع التسوية الموقّعة', 'مطابقة تلقائية تُلغى عند المراجعة دون تفسير'],
          ['الأيام {lat}61{/lat} إلى {lat}90{/lat}', 'وكيل واحد يعدّ نوعًا واحدًا من القيود', 'المراقب المالي', 'كل مسودة اعتمدها أو رفضها شخص مسمّى؛ والمحادثات مصدَّرة', 'أي مخرَج للوكيل رُحّل دون اعتماد'],
          ['بعد اليوم {lat}90{/lat}', 'وكيل ثانٍ أو نطاق أوسع', 'المدير المالي مع المراجعة الداخلية', 'مراجعة ربع سنوية للصلاحيات والرصيد والمسودات المرفوضة', 'استهلاك رصيد بلا وكيل مسؤول عنه']
        ]
      } },
      { p: 'قاعدة التوقف تُوقف المرحلة لا المشروع. عالج السبب، وأعد القياس، ثم افتح البوابة من جديد.' },
      { h2: 'من أين تبدأ يوم الأحد؟' },
      { ol: [
        'تأكد من إصدار {lat}Odoo{/lat} ونسخته وخطتك، وما يشمله كل منها من ذكاء اصطناعي.',
        'سجّل أرقام خط الأساس قبل أن يغيّر أحد أي إعداد.',
        'اختر دفتر يومية واحدًا لتجربة التنبؤ ببنود الفاتورة، ومراجعًا واحدًا يقيس نتائجها.',
        'اكتب قواعد التوقف الثلاث، واجعل المدير المالي يوقّعها.',
        'حدّد الآن موعد مراجعة بوابة اليوم {lat}30{/lat}، بحضور شخص من خارج فريق التجربة.'
      ] },
      { p: 'والنهج المرحلي نفسه ينطبق على المشتريات، كما في [[blog/odoo-20-purchase-approvals-automation/|أتمتة اعتمادات المشتريات في {lat}Odoo 20{/lat}]]، والإطار الأوسع في [[blog/ai-in-accounting-guide-2026/|دليلنا للذكاء الاصطناعي في المحاسبة]] و[[blog/ai-month-end-close-financial-reporting/|الذكاء الاصطناعي في الإقفال الشهري]]. وتنفذ {lat}MFT{/lat} هذه الخطة ضمن [[services/odoo-erp/|خدمات تطبيق {lat}Odoo ERP{/lat}]]. ويتوفر [[intelligence/auditor/|وكيل المراجع]] و[[intelligence/virtual-cfo/|وكيل المدير المالي الافتراضي]] لدينا كخدمة مُدارة: يعدّان المسودة، ويعتمد شخص مسمّى ومسجّل، ولا يُرحَّل شيء تلقائيًا.' }
    ],
    faq: [
      { q: 'كم يستغرق تطبيق المحاسبة بالذكاء الاصطناعي في {lat}Odoo 20{/lat}؟', a: 'يستغرق التشغيل المنضبط نحو {lat}90{/lat} يومًا لفريق مالي معتاد: {lat}30{/lat} يومًا للميزات المساعدة مثل التنبؤ ببنود الفاتورة، و{lat}30{/lat} للذكاء الاصطناعي في التسوية البنكية، و{lat}30{/lat} لأول وكيل يعدّ القيود مسودة. والوقت يذهب إلى قياس الأخطاء واجتياز البوابات، لا إلى تفعيل الميزات.' },
      { q: 'ما أول ميزة ذكاء اصطناعي تفعّلها المحاسبة في أودو {lat}20{/lat}؟', a: 'ابدأ بالميزات التي تقترح وتترك الترحيل بيد الإنسان، مثل التنبؤ ببنود فاتورة المورد ومساعد التحليلات المالية. جرّبها على دفتر يومية واحد، وسجّل كل تصحيح بحسب نوعه، وطابق كل إجابة للمساعد مع التقرير القياسي الذي يجب أن تتفق معه.' },
      { q: 'هل يستطيع وكلاء {lat}Odoo 20{/lat} ترحيل قيود اليومية تلقائيًا؟', a: 'بحسب ملاحظات إصدار {lat}Odoo 20{/lat}، يستطيع الوكلاء إنشاء السجلات وتحديثها والعمل من الإجراءات الآلية والمجدولة. أما وصول مخرجاتهم إلى الدفتر دون مراجعة فضابط تصممه أنت. نحن نُبقي مخرجات الوكيل مسودة، ونشترط معتمِدًا مسمّى متدرجًا بحسب الأهمية النسبية، ونصحح الأخطاء بقيد عكسي.' },
      { q: 'كم يحتفظ {lat}Odoo 20{/lat} بمحادثات وكلاء الذكاء الاصطناعي؟', a: 'تنص ملاحظات إصدار {lat}Odoo 20{/lat} على حفظ المحادثات حتى {lat}30{/lat} يومًا بعد آخر رسالة. فإن كانت المحادثة تدعم قيدًا محاسبيًا أو قرارًا في الإقفال، فصدّرها مع السجلات التي استندت إليها إلى ملف الإقفال قبل انتهاء المدة، ليبقى الدليل متاحًا للمراجع.' },
      { q: 'ماذا نقيس قبل بدء الذكاء الاصطناعي في المحاسبة؟', a: 'سجّل خط أساس قبل تغيير أي إعداد: عدد أيام الإقفال، وبنود التسوية البنكية المعلّقة حسب أعمارها، ونسبة الفواتير المصحَّحة بعد إدخالها. فبدون خط أساس لا تستطيع إثبات أن مرحلة ما حسّنت شيئًا، ولا تُجتاز أي بوابة بدليل بدل الانطباع.' }
    ],
    sources: [
      { label: 'جارتنر، استطلاع الذكاء الاصطناعي في المالية {lat}2025{/lat} ({lat}"Gartner Survey Shows Finance AI Adoption Remains Steady in 2025", press release, 18 Nov 2025{/lat})', url: 'https://www.gartner.com/en/newsroom/press-releases/2025-11-18-gartner-survey-shows-finance-ai-adoption-remains-steady-in-2025' },
      { label: 'أودو، ملاحظات إصدار {lat}Odoo 20{/lat} ({lat}"Odoo 20 Release Notes", September 2026{/lat})', url: 'https://www.odoo.com/odoo-20-release-notes' }
    ]
  }
};
