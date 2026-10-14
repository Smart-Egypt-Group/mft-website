// 10. Connecting AI to Odoo for continuous auditing: access, residency, evidence and approvals
module.exports = {
  en: {
    slug: 'connect-ai-to-odoo-continuous-audit',
    topic: 'odoo',
    author: 'ahmed',
    reviewer: 'practice',
    image: { alt: 'Illustration: scattered transactions flow through a glowing white core onto a white ledger page showing an ERP database reached only through a read-only lock in cyan.' },
    date: '2026-10-14',
    title: 'Connecting AI to Odoo for continuous auditing: access, evidence and approvals',
    metaTitle: 'Connect AI to Odoo for Continuous Auditing',
    dek: 'The data an auditor needs is already in Odoo every day. The design question is how AI reaches it without becoming a new risk.',
    description: 'How to connect AI to Odoo for continuous auditing: API or MCP access, read-only users, data residency, evidence that traces to records, and named approvers.',
    keywords: ['connect AI to Odoo', 'continuous auditing Odoo', 'Odoo MCP', 'Odoo API audit access', 'AI continuous audit ERP'],
    about: ['Continuous auditing', 'Odoo', 'Artificial intelligence', 'Model Context Protocol', 'Audit evidence'],
    answer: 'To connect AI to Odoo for continuous auditing, give the analysis layer its own dedicated user with read access only, through the external API or the MCP connection listed in Odoo’s 20 release notes. Keep client data on the client’s system, make every finding cite the record ids it read, and route any proposed correction to a named approver.',
    takeaways: [
      'The audit connection gets its own user, its own key and read access only.',
      'Ask where data is processed and stored before asking what the model can do.',
      'A finding without the record ids behind it is an opinion, not evidence.',
      'Corrections are drafted by the system and approved by a named person, never posted by the connection.'
    ],
    body: [
      { p: 'Picture a familiar year-end conversation: the auditor finds a vendor paid twice in the second quarter, the board asks why nobody noticed, and the honest answer is that the payment sat in Odoo for nine months while everyone waited for the annual audit. We wrote about that gap in [[blog/continuous-audit-eleven-months/|why an annual audit misses eleven months]]. The fix is not more auditors. It is a connection that reads the books every day and raises the question while the money can still be recovered.' },
      { p: 'Connecting AI to an ERP is easy to demonstrate and easy to get wrong: the connection is a new user that sees everything the auditor sees, often run by a third party, often processing data outside the company. This article sets out the design decisions in the order an auditor would check them.' },
      { h2: 'What does connecting AI to Odoo for continuous auditing mean?' },
      { p: 'Connecting AI to Odoo for continuous auditing means giving an analysis layer governed, logged and read-only access to the ledger, so that tests run on the full population on a schedule and every result points back to the records it came from. Two words in that definition carry the weight. Governed means someone owns the connection, its rights and its output. Points back means a finding can be reopened in Odoo by anyone who doubts it.' },
      { p: 'It fits the monitoring component of COSO’s Internal Control, Integrated Framework (2013): Principle 16 calls for ongoing and separate evaluations, and a daily test run is an ongoing evaluation. For how this differs from the annual cycle, see [[blog/continuous-auditing-ai-vs-traditional-audit/|continuous auditing with AI vs traditional auditing]].' },
      { h2: 'Which connection route should you use: API, MCP or in-database agents?' },
      { p: 'Three routes lead into the data and one goes around it, each with its own control profile.' },
      { table: {
        caption: 'Routes for connecting AI to Odoo and the control each one needs',
        head: ['Route', 'How it reaches the data', 'Best suited to', 'Main control'],
        rows: [
          ['External API (XML-RPC / JSON-RPC)', 'A dedicated API user and key query the database; long available in recent Odoo versions, confirm in your 20 database', 'Scheduled full-population tests run by an outside platform', 'Dedicated user, read-only rights, key rotation, access log review'],
          ['MCP connection', 'Odoo’s 20 release notes list connecting to the database via Model Context Protocol, so AI tools can query it', 'Interactive questions from an AI assistant during an engagement', 'Confirm in your database which user and rights it runs under before enabling'],
          ['Odoo’s own AI agents', 'Agents run inside the database, triggered by automated or scheduled actions', 'Operational checks owned by the finance team', 'Agent owner, draft state for output, IAP credit budget'],
          ['Exports and spreadsheets', 'Someone extracts data and sends a file', 'One-off analysis', 'Completeness check against the trial balance; no ongoing coverage']
        ]
      } },
      { p: 'For continuous auditing the external API is usually the backbone, because it is independent of the people being audited and can run on a fixed schedule. MCP is useful for an auditor asking follow-up questions, but treat it as a new access path with its own approval, not as a feature to switch on. The finance-side view of these features is in our [[blog/odoo-20-ai-features-accounting/|feature map of Odoo 20 AI for accounting]].' },
      { h2: 'Why should the audit connection read only?' },
      { p: 'Because the auditor must not be able to change what the auditor tests. If the connection can write, a finding and its fix can come from the same identity, which breaks the segregation of duties the audit is meant to test. ISA 315 (Revised 2019) asks auditors to understand the IT environment and general IT controls; an audit connection with write rights is exactly the kind of access that understanding should flag.' },
      { ol: [
        'Create a dedicated user for the connection. Never reuse a person’s login or an administrator account.',
        'Grant read access only to the models the tests need: journal entries, invoices and bills, payments, partners, products and stock valuation.',
        'In Odoo 20, record rules are removed and the domain is set directly on the access right, so review that domain as part of the setup.',
        'Issue an API key for that user alone and record who holds it and when it will be rotated.',
        'Review the user’s chatter monthly: Odoo 20 logs user group changes there, so any widening of rights leaves a trail.',
        'Test the restriction: attempt a write with the key and file the refusal as evidence that read-only holds.'
      ] },
      { p: 'Read-only applies to the connection, not to everything AI does. MFT’s seg-audit platform reads the books straight from the ERP, read-only. Our [[intelligence/auditor/|Auditor agent]] does more: it drafts correcting entries and adjustments, but drafting is not posting, and nothing reaches the ledger without approval. For segregation of duties when an agent is in the chain, see [[blog/ai-segregation-of-duties-internal-controls/|AI, segregation of duties and internal controls]].' },
      { h2: 'Where does the data go, and who keeps it?' },
      { p: 'Data residency is the question owners ask last and should ask first. A connection that copies the whole ledger to an outside store creates a second set of books, outside your controls and possibly outside your country. Ask every provider, including us, the same questions:' },
      { ul: [
        'Is client data stored by the provider, or read at query time and discarded?',
        'In which country is it processed, and by which AI model provider?',
        'How long are prompts, answers and logs kept, and can they be deleted on request?',
        'Who at the provider can see the data, and is that access logged?',
        'Does the provider’s contract match your data-protection obligations, as confirmed by your legal adviser?'
      ] },
      { p: 'Our own answer is that client data stays on the client’s system and our agents read through the API at query time. Odoo’s native AI has its own retention rule: according to the release notes, stored conversations are kept up to 30 days after the last message. Know both rules before anything goes live.' },
      { h2: 'Which tests should run continuously?' },
      { p: 'Start with tests whose exceptions are cheap to verify and expensive to miss. These are the patterns that recur in our continuous-audit work:' },
      { ul: [
        'Duplicate and near-duplicate payments: same vendor, similar amount and reference, close dates.',
        'Near-duplicate vendors: similar names, shared bank accounts or tax numbers.',
        'Approvals outside the approval matrix: bills or orders approved above the approver’s limit.',
        'Cut-off errors: receipts and bills recorded in different periods around month end.',
        'Inventory valuation drift between the stock valuation and the general ledger.',
        'Manual journal entries posted late at month end in round amounts, which ISA 240 already requires auditors to test.'
      ] },
      { p: 'Each test reads the whole population, not a sample, which is the subject of [[blog/full-population-testing-ai-vs-sampling/|moving from sampling to full-population testing]]. The ACFE’s 2024 Report to the Nations found the median fraud lasted 12 months before detection, and that proactive data monitoring and analysis was among the controls associated with roughly half the losses and duration. A daily test proves nothing alone; it shortens how long a problem stays hidden.' },
      { h2: 'How does an AI finding become audit evidence?' },
      { p: 'Only by pointing at the records. ISA 500 asks whether evidence is sufficient and appropriate, and ISA 230 asks that documentation let an experienced auditor understand what was done. An AI sentence meets neither. A finding that lists the record ids it retrieved, the rule that flagged them and the time of the query meets both, because anyone can reopen those records in Odoo.' },
      { quote: 'If a finding cannot name the records it read, it is not a finding. It is a rumour with a confidence score.' },
      { p: 'That is the rule MFT Intelligence runs on, which we call "evidence or silence": every finding must cite the record ids the agent actually retrieved, and a finding that cites nothing, or quotes a number not in the cited records, is rejected and shown struck through, never as fact. The details are in our article on [[blog/ai-audit-trail-zero-hallucination/|AI provenance and the zero-hallucination principle]]. The standards are moving too: in August 2026 the IAASB issued exposure drafts revising ISA 500, ISA 330 and ISA 520 to address greater use of technology, with comments due 15 December 2026. They are not final, so build on the current standards.' },
      { h2: 'Who approves what the AI proposes?' },
      { p: 'A named, registered person, never the connection and never the person who asked for the run. Our rule set, described in [[blog/agents-draft-people-approve/|agents draft, people approve]], is:' },
      { ul: [
        'The agent drafts the correcting entry or adjustment; nothing is posted automatically.',
        'Approval is tiered by the client’s [[blog/materiality-isa-320-threshold/|ISA 320 materiality threshold]]: above it, a second approver signs.',
        'Corrections are made by reversal, never by deletion, so the original stays visible.',
        'In seg-audit, a finding cannot be closed without a named, registered approver, and repeats are linked to earlier findings.'
      ] },
      { p: 'Live Odoo write-back of approved corrections is delivered per client, only after that client’s connector is configured. Until then, approved corrections are entered by the client’s own team, which keeps the posting under their controls.' },
      { h2: 'Where should you start?' },
      { ol: [
        'Write down the purpose of the connection, its owner and the tests it will run.',
        'Create the dedicated read-only user and key, and test that a write is refused.',
        'Get written answers to the five residency questions above.',
        'Run three tests on a closed quarter first, such as duplicate payments, near-duplicate vendors and late round-amount journal entries, and calibrate false positives.',
        'Agree who reviews exceptions, in what time frame, and who approves corrections.',
        'Review the connection’s log, rights and findings monthly, as you would any privileged user.'
      ] },
      { p: 'This is the work behind our [[services/internal-audit/|internal audit service]]: seg-audit reads the books read-only, scores every transaction by risk instead of sampling a few percent, and keeps each finding on record with evidence and severity. If your Odoo 20 rollout is still ahead, combine this with the [[blog/odoo-20-ai-accounting-step-by-step/|step-by-step guide to AI accounting on Odoo 20]].' }
    ],
    faq: [
      { q: 'Can AI connect directly to Odoo?', a: 'Yes. Recent Odoo versions offer an external API (XML-RPC and JSON-RPC) used with a dedicated API user and key, and Odoo’s 20 release notes add connecting to the database via MCP (Model Context Protocol). Confirm in your own database which user and rights each connection runs under before enabling it.' },
      { q: 'Should an audit AI have write access to Odoo?', a: 'No. The connection used for continuous auditing should read only, so the tool that tests the books cannot change them. If an AI system proposes corrections, they should arrive as drafts approved by a named person, with corrections made by reversal rather than deletion.' },
      { q: 'Does connecting AI to Odoo move my data outside the company?', a: 'It depends on the provider. Some copy the ledger to their own storage; others read through the API at query time. Ask where data is processed, by which model provider, how long prompts and logs are kept, and who can see them, and have your legal adviser check the contract.' },
      { q: 'Can AI findings be used as audit evidence?', a: 'Only when they trace to records. A finding that lists the record ids retrieved, the rule applied and the time of the query can be reopened and verified, which is what ISA 500 and ISA 230 expect. An unsupported AI statement is not evidence, however confident it sounds.' },
      { q: 'What should continuous auditing test first in Odoo?', a: 'Start with tests that are cheap to verify and costly to miss: duplicate and near-duplicate payments, near-duplicate vendors, approvals outside the approval matrix, cut-off errors, inventory valuation drift, and manual journal entries posted late at month end in round amounts. Run them on a closed period first to calibrate.' }
    ],
    sources: [
      { label: 'Odoo, "Odoo 20 Release Notes" (official release notes, September 2026)', url: 'https://www.odoo.com/odoo-20-release-notes' },
      { label: 'ACFE, "Occupational Fraud 2024: A Report to the Nations" (report, 2024)', url: 'https://www.acfe.com/en-us/-/media/files/acfe/pdfs/rttn/2024/2024-report-to-the-nations.pdf' },
      { label: 'IAASB, "Project update: ISA 500 Audit Evidence" (exposure drafts on ISA 500, ISA 330 and ISA 520, August 2026)', url: 'https://www.iaasb.org/publications/project-update-isa-500-audit-evidence' }
    ]
  },
  ar: {
    slug: 'connect-ai-to-odoo-continuous-audit',
    topic: 'odoo',
    author: 'ahmed',
    reviewer: 'practice',
    image: { alt: 'رسم توضيحي: معاملات متناثرة تتدفق عبر نواة بيضاء مضيئة إلى صفحة دفتر بيضاء تُظهر قاعدة بيانات نظام {lat}ERP{/lat} لا يُوصل إليها إلا عبر قفل للقراءة فقط باللون السماوي.' },
    date: '2026-10-14',
    title: 'ربط الذكاء الاصطناعي بـ{lat}Odoo{/lat} للمراجعة المستمرة: الوصول والدليل والاعتماد',
    metaTitle: 'ربط الذكاء الاصطناعي بأودو للمراجعة المستمرة',
    dek: 'البيانات التي يحتاجها المراجع موجودة في {lat}Odoo{/lat} كل يوم. والسؤال الحقيقي: كيف يصل إليها الذكاء الاصطناعي دون أن يصبح هو نفسه خطرًا جديدًا.',
    description: 'كيف تربط الذكاء الاصطناعي بـ Odoo للمراجعة المستمرة: وصول عبر API أو MCP، ومستخدم للقراءة فقط، وموضع البيانات، ودليل يرجع إلى السجلات، ومعتمِد مسمّى.',
    keywords: ['ربط الذكاء الاصطناعي بأودو', 'المراجعة المستمرة', 'المراجعة المستمرة بالذكاء الاصطناعي', 'Odoo MCP', 'الذكاء الاصطناعي في المراجعة الداخلية'],
    about: ['Continuous auditing', 'Odoo', 'Artificial intelligence', 'Model Context Protocol', 'Audit evidence'],
    answer: 'لربط الذكاء الاصطناعي بـ{lat}Odoo{/lat} للمراجعة المستمرة، امنح طبقة التحليل مستخدمًا مخصصًا بصلاحية قراءة فقط، عبر واجهة {lat}API{/lat} الخارجية أو اتصال {lat}MCP{/lat} الوارد في ملاحظات إصدار {lat}Odoo 20{/lat}. أبقِ بيانات العميل على نظامه، واجعل كل ملاحظة تذكر أرقام السجلات التي قرأتها، ووجّه أي تصحيح مقترح إلى معتمِد مسمّى.',
    takeaways: [
      'اتصال المراجعة له مستخدمه ومفتاحه الخاص، وصلاحيته قراءة فقط.',
      'اسأل أين تُعالَج البيانات وأين تُحفظ قبل أن تسأل ماذا يستطيع النموذج.',
      'الملاحظة التي لا تذكر أرقام السجلات وراءها رأي، لا دليل.',
      'التصحيحات يُعدّها النظام مسودة ويعتمدها شخص مسمّى، ولا يرحّلها الاتصال أبدًا.'
    ],
    body: [
      { p: 'تخيّل مشهدًا مألوفًا في نهاية السنة: يكتشف مراقب الحسابات أن موردًا سُدّد له مرتين في الربع الثاني، فيسأل مجلس الإدارة لماذا لم ينتبه أحد، والإجابة الصادقة أن الدفعة بقيت في {lat}Odoo{/lat} تسعة أشهر والجميع ينتظر المراجعة السنوية. كتبنا عن هذه الفجوة في [[blog/continuous-audit-eleven-months/|لماذا تفوّت المراجعة السنوية أحد عشر شهرًا]]. والعلاج ليس مزيدًا من المراجعين، بل اتصال يقرأ الدفاتر كل يوم ويطرح السؤال بينما المال ما زال قابلًا للاسترداد.' },
      { p: 'ربط الذكاء الاصطناعي بنظام تخطيط الموارد ({lat}ERP{/lat}) سهل في العرض وسهل الخطأ فيه. فالاتصال مستخدم جديد يرى كل ما يراه المراجع، وكثيرًا ما يديره طرف ثالث، وكثيرًا ما يعالج البيانات خارج الشركة. يعرض هذا المقال قرارات التصميم بالترتيب الذي يفحصها به المراجع.' },
      { h2: 'ما معنى ربط الذكاء الاصطناعي بـ{lat}Odoo{/lat} للمراجعة المستمرة؟' },
      { p: 'ربط الذكاء الاصطناعي بـ{lat}Odoo{/lat} للمراجعة المستمرة هو منح طبقة تحليل وصولًا محكومًا ومسجَّلًا وللقراءة فقط إلى دفتر الأستاذ، بحيث تُجرى الاختبارات على المجتمع الكامل وفق جدول، وتعود كل نتيجة إلى السجلات التي جاءت منها. كلمتان في هذا التعريف تحملان الوزن كله. «محكوم» تعني أن هناك من يملك الاتصال وصلاحياته ومخرجاته. و«تعود إلى السجلات» تعني أن أي شخص يشك في الملاحظة يستطيع فتح سجلاتها في {lat}Odoo{/lat}.' },
      { p: 'وهذا يقع في مكون المتابعة من إطار {lat}COSO{/lat} للرقابة الداخلية ({lat}2013{/lat}): المبدأ {lat}16{/lat} يطلب تقييمات مستمرة ومنفصلة، والاختبار اليومي تقييم مستمر. وللفرق بينه وبين الدورة السنوية اقرأ [[blog/continuous-auditing-ai-vs-traditional-audit/|المراجعة المستمرة بالذكاء الاصطناعي مقابل المراجعة التقليدية]].' },
      { h2: 'أي طريق اتصال تختار: {lat}API{/lat} أم {lat}MCP{/lat} أم الوكلاء داخل القاعدة؟' },
      { p: 'هناك ثلاثة طرق إلى البيانات وطريق رابع يلتف حولها، ولكل منها ملف رقابي مختلف.' },
      { table: {
        caption: 'طرق ربط الذكاء الاصطناعي بـ{lat}Odoo{/lat} والضابط الذي يحتاجه كل طريق',
        head: ['الطريق', 'كيف يصل إلى البيانات', 'الأنسب له', 'الضابط الرئيسي'],
        rows: [
          ['واجهة {lat}API{/lat} الخارجية ({lat}XML-RPC / JSON-RPC{/lat})', 'مستخدم {lat}API{/lat} مخصص ومفتاح يستعلمان من القاعدة؛ متاحة منذ إصدارات {lat}Odoo{/lat} الحديثة، وتأكد منها في قاعدة الإصدار {lat}20{/lat}', 'اختبارات دورية على المجتمع الكامل تشغّلها منصة خارجية', 'مستخدم مخصص، وصلاحية قراءة فقط، وتدوير المفتاح، ومراجعة سجل الوصول'],
          ['اتصال {lat}MCP{/lat}', 'تذكر ملاحظات إصدار {lat}Odoo 20{/lat} الاتصال بقاعدة البيانات عبر {lat}Model Context Protocol{/lat}، فتستطيع أدوات الذكاء الاصطناعي الاستعلام منها', 'أسئلة تفاعلية من مساعد ذكي أثناء مهمة مراجعة', 'التحقق في قاعدة بياناتك من المستخدم والصلاحيات التي يعمل بها قبل التفعيل'],
          ['وكلاء {lat}Odoo{/lat} الأصليون', 'يعملون داخل القاعدة وتطلقهم الإجراءات الآلية أو المجدولة', 'فحوص تشغيلية يملكها الفريق المالي', 'مالك للوكيل، ومخرجات في حالة مسودة، وموازنة لرصيد {lat}IAP{/lat}'],
          ['التصدير والجداول', 'شخص يستخرج البيانات ويرسل ملفًا', 'تحليل لمرة واحدة', 'فحص الاكتمال مقابل ميزان المراجعة، ولا تغطية مستمرة']
        ]
      } },
      { p: 'في المراجعة المستمرة تكون واجهة {lat}API{/lat} الخارجية عادة هي العمود الفقري، لأنها مستقلة عمّن تجري مراجعتهم وتعمل على جدول ثابت. أما {lat}MCP{/lat} فمفيد لمراجع يطرح أسئلة متابعة، لكن عامله كمسار وصول جديد له اعتماده الخاص، لا كميزة تُفعَّل بضغطة. ونظرة الفريق المالي إلى هذه الميزات في [[blog/odoo-20-ai-features-accounting/|خريطة ميزات الذكاء الاصطناعي في {lat}Odoo 20{/lat} للمحاسبة]].' },
      { h2: 'لماذا يجب أن يكون اتصال المراجعة للقراءة فقط؟' },
      { p: 'لأن المراجع يجب ألا يستطيع تغيير ما يختبره. إن كان الاتصال يكتب، فقد تخرج الملاحظة وتصحيحها من الهوية نفسها، وهذا يهدم الفصل بين المهام الذي جاءت المراجعة لاختباره. ومعيار {lat}ISA 315{/lat} (المعدّل {lat}2019{/lat}) يطلب من المراجع فهم بيئة تقنية المعلومات والضوابط العامة عليها، واتصال مراجعة بصلاحية كتابة هو تحديدًا ما ينبغي أن يكشفه هذا الفهم.' },
      { ol: [
        'أنشئ مستخدمًا مخصصًا للاتصال، ولا تستخدم أبدًا حساب شخص أو حساب مدير النظام.',
        'امنحه صلاحية قراءة على النماذج التي تحتاجها الاختبارات فقط: قيود اليومية، وفواتير العملاء والموردين، والدفعات، والشركاء، والمنتجات، وتقييم المخزون.',
        'في {lat}Odoo 20{/lat} ألغيت قواعد السجلات وصار النطاق يُضبط على صلاحية الوصول مباشرة، فراجع هذا النطاق ضمن الإعداد.',
        'أصدر مفتاح {lat}API{/lat} لهذا المستخدم وحده، ودوّن من يحمله ومتى يُستبدل.',
        'راجع سجل المحادثة ({lat}Chatter{/lat}) الخاص بالمستخدم شهريًا، فـ{lat}Odoo 20{/lat} يسجّل فيه تغييرات المجموعات، فيبقى أثر لأي توسيع للصلاحيات.',
        'اختبر القيد: حاول الكتابة بالمفتاح واحفظ الرفض دليلًا على أن القراءة فقط مطبّقة فعلًا.'
      ] },
      { p: 'والقراءة فقط صفة للاتصال، لا لكل ما يفعله الذكاء الاصطناعي. منصة {lat}seg-audit{/lat} التابعة لـ{lat}MFT{/lat} تقرأ الدفاتر مباشرة من نظام تخطيط الموارد للقراءة فقط. أما [[intelligence/auditor/|وكيل المراجع]] فيذهب أبعد: يُعدّ القيود التصحيحية والتسويات، لكن الإعداد ليس ترحيلًا، ولا يصل شيء إلى الدفتر دون اعتماد. وللفصل بين المهام حين يدخل وكيل في السلسلة اقرأ [[blog/ai-segregation-of-duties-internal-controls/|الذكاء الاصطناعي والفصل بين المهام والضوابط الرقابية]].' },
      { h2: 'إلى أين تذهب البيانات، ومن يحتفظ بها؟' },
      { p: 'موضع البيانات هو آخر سؤال يطرحه الملاك، وينبغي أن يكون الأول. فالاتصال الذي ينسخ دفتر الأستاذ كاملًا إلى مخزن خارجي يصنع نسخة ثانية من الدفاتر، خارج ضوابطك وربما خارج بلدك. اطرح على كل مزوّد، ونحن منهم، الأسئلة نفسها:' },
      { ul: [
        'هل يحتفظ المزوّد ببيانات العميل، أم يقرؤها وقت الاستعلام ثم يتخلص منها؟',
        'في أي بلد تُعالَج، ولدى أي مزوّد لنماذج الذكاء الاصطناعي؟',
        'كم تُحفظ الأسئلة والإجابات والسجلات، وهل يمكن حذفها عند الطلب؟',
        'من لدى المزوّد يستطيع رؤية البيانات، وهل هذا الوصول مسجَّل؟',
        'هل يتوافق عقد المزوّد مع التزاماتك في حماية البيانات، بحسب ما يؤكده مستشارك القانوني؟'
      ] },
      { p: 'وإجابتنا نحن أن بيانات العميل تبقى على نظامه، وأن وكلاءنا يقرؤون عبر {lat}API{/lat} وقت الاستعلام. وللذكاء الاصطناعي الأصلي في {lat}Odoo{/lat} قاعدة احتفاظ خاصة به: بحسب ملاحظات الإصدار تُحفظ المحادثات حتى {lat}30{/lat} يومًا بعد آخر رسالة. اعرف القاعدتين قبل أي تشغيل.' },
      { h2: 'ما الاختبارات التي تعمل باستمرار؟' },
      { p: 'ابدأ باختبارات يسهل التحقق من استثناءاتها ويكلّف فواتها كثيرًا. هذه هي الأنماط التي تتكرر في أعمال المراجعة المستمرة لدينا:' },
      { ul: [
        'الدفعات المكررة وشبه المكررة: المورد نفسه، ومبلغ ومرجع متقاربان، وتواريخ متقاربة.',
        'الموردون شبه المكررين: أسماء متشابهة، أو حساب بنكي أو رقم ضريبي مشترك.',
        'اعتمادات خارج مصفوفة الاعتماد: فواتير أو أوامر اعتُمدت فوق حد المعتمِد.',
        'أخطاء الفصل بين الفترات: استلام وفاتورة مسجلان في فترتين مختلفتين حول نهاية الشهر.',
        'انحراف تقييم المخزون بين تقييم المخازن ودفتر الأستاذ العام.',
        'قيود يومية يدوية تُرحّل متأخرة في نهاية الشهر بمبالغ مقرّبة، وهي قيود يلزم معيار {lat}ISA 240{/lat} المراجع أصلًا باختبار ملاءمتها.'
      ] },
      { p: 'كل اختبار يقرأ المجتمع الكامل لا العينة، وهذا موضوع [[blog/full-population-testing-ai-vs-sampling/|الانتقال من العينة إلى اختبار المجتمع الكامل]]. ووجد تقرير {lat}ACFE{/lat} لعام {lat}2024{/lat} أن الاحتيال الوسيط استمر {lat}12{/lat} شهرًا قبل اكتشافه، وأن المتابعة والتحليل الاستباقي للبيانات كانا من الضوابط المرتبطة بخسائر ومدد أقل بنحو النصف. الاختبار اليومي لا يثبت شيئًا وحده، لكنه يقصّر المدة التي تبقى فيها المشكلة مختبئة.' },
      { h2: 'كيف تصبح ملاحظة الذكاء الاصطناعي دليل مراجعة؟' },
      { p: 'فقط حين تشير إلى السجلات. معيار {lat}ISA 500{/lat} يسأل هل الدليل كافٍ وملائم، ومعيار {lat}ISA 230{/lat} يطلب توثيقًا يمكّن مراجعًا خبيرًا من فهم ما أُنجز. والجملة التي يكتبها الذكاء الاصطناعي لا تفي بأي منهما. أما الملاحظة التي تذكر أرقام السجلات التي استرجعتها، والقاعدة التي رصدتها، ووقت الاستعلام، فتفي بالاثنين، لأن أي شخص يستطيع فتح تلك السجلات في {lat}Odoo{/lat}.' },
      { quote: 'الملاحظة التي لا تسمّي السجلات التي قرأتها ليست ملاحظة، بل إشاعة بدرجة ثقة.' },
      { p: 'هذه هي القاعدة التي يعمل بها {lat}MFT Intelligence{/lat}، ونسمّيها «الدليل أو الصمت»: كل ملاحظة يجب أن تذكر أرقام السجلات التي استرجعها الوكيل فعلًا، والملاحظة التي لا تستند إلى شيء، أو تذكر رقمًا غير موجود في السجلات المستشهد بها، تُرفض وتظهر مشطوبة، ولا تُعرض أبدًا كحقيقة. التفاصيل في مقالنا عن [[blog/ai-audit-trail-zero-hallucination/|مصدر مخرجات الذكاء الاصطناعي ومبدأ صفر هلوسة]]. والمعايير نفسها تتحرك: في أغسطس {lat}2026{/lat} أصدر {lat}IAASB{/lat} مسودات عرض لتعديل {lat}ISA 500{/lat} و{lat}ISA 330{/lat} و{lat}ISA 520{/lat} لمعالجة التوسع في استخدام التقنية، وتنتهي التعليقات في {lat}15{/lat} ديسمبر {lat}2026{/lat}. وهي ليست نهائية، فابنِ على المعايير الحالية.' },
      { h2: 'من يعتمد ما يقترحه الذكاء الاصطناعي؟' },
      { p: 'شخص مسمّى ومسجَّل، لا الاتصال ولا من طلب التشغيل. وقواعدنا، كما شرحناها في [[blog/agents-draft-people-approve/|الوكلاء يُعدّون المسودة والبشر يعتمدون]]، هي:' },
      { ul: [
        'الوكيل يُعدّ القيد التصحيحي أو التسوية، ولا يُرحَّل شيء آليًا.',
        'الاعتماد متدرج حسب [[blog/materiality-isa-320-threshold/|حد الأهمية النسبية وفق {lat}ISA 320{/lat}]] لدى العميل: فوقه يوقّع معتمِد ثانٍ.',
        'التصحيح يتم بقيد عكسي لا بالحذف، فيبقى الأصل ظاهرًا.',
        'في {lat}seg-audit{/lat} لا تُغلق ملاحظة دون معتمِد مسمّى ومسجَّل، والملاحظات المتكررة تُربط بما سبقها.'
      ] },
      { p: 'أما الكتابة المباشرة للتصحيحات المعتمدة في {lat}Odoo{/lat} فتُقدَّم لكل عميل على حدة، وبعد إعداد موصّله فقط. وحتى ذلك الحين يُدخل فريق العميل نفسه التصحيحات المعتمدة، فيبقى الترحيل تحت ضوابطه.' },
      { h2: 'من أين تبدأ؟' },
      { ol: [
        'اكتب غرض الاتصال ومالكه والاختبارات التي سيجريها.',
        'أنشئ المستخدم المخصص للقراءة فقط ومفتاحه، واختبر أن الكتابة مرفوضة.',
        'احصل على إجابات مكتوبة عن أسئلة موضع البيانات الخمسة أعلاه.',
        'شغّل ثلاثة اختبارات على ربع مقفل أولًا، مثل الدفعات المكررة والموردين شبه المكررين والقيود المتأخرة بمبالغ مقرّبة، واضبط النتائج الإيجابية الكاذبة.',
        'اتفق على من يراجع الاستثناءات وفي أي مدة، ومن يعتمد التصحيحات.',
        'راجع سجل الاتصال وصلاحياته وملاحظاته شهريًا، كما تراجع أي مستخدم ذي صلاحيات عالية.'
      ] },
      { p: 'هذا هو العمل الذي تقوم عليه [[services/internal-audit/|خدمة المراجعة الداخلية]] لدينا: {lat}seg-audit{/lat} تقرأ الدفاتر للقراءة فقط، وتقيّم كل معاملة حسب خطرها بدل فحص نسبة صغيرة منها، وتحفظ كل ملاحظة في السجل مع دليلها ودرجة خطورتها. وإن كان تطبيق {lat}Odoo 20{/lat} ما زال أمامك، فاقرن هذا بـ[[blog/odoo-20-ai-accounting-step-by-step/|الدليل العملي لتطبيق المحاسبة بالذكاء الاصطناعي على {lat}Odoo 20{/lat}]].' }
    ],
    faq: [
      { q: 'هل يمكن ربط الذكاء الاصطناعي بـ{lat}Odoo{/lat} مباشرة؟', a: 'نعم. توفر إصدارات {lat}Odoo{/lat} الحديثة واجهة {lat}API{/lat} خارجية ({lat}XML-RPC{/lat} و{lat}JSON-RPC{/lat}) تُستخدم بمستخدم ومفتاح مخصصين، وتضيف ملاحظات إصدار {lat}Odoo 20{/lat} الاتصال بقاعدة البيانات عبر {lat}MCP{/lat}. تحقق في قاعدة بياناتك من المستخدم والصلاحيات التي يعمل بها كل اتصال قبل تفعيله.' },
      { q: 'هل يجب أن يملك ذكاء المراجعة الاصطناعي صلاحية كتابة في {lat}Odoo{/lat}؟', a: 'لا. اتصال المراجعة المستمرة يجب أن يكون للقراءة فقط، حتى لا تستطيع الأداة التي تختبر الدفاتر أن تغيّرها. وإن اقترح نظام ذكاء اصطناعي تصحيحات، فتصل كمسودات يعتمدها شخص مسمّى، ويتم التصحيح بقيد عكسي لا بالحذف.' },
      { q: 'هل ينقل ربط الذكاء الاصطناعي بـ{lat}Odoo{/lat} بياناتي خارج الشركة؟', a: 'يتوقف ذلك على المزوّد. بعضهم ينسخ دفتر الأستاذ إلى تخزينه الخاص، وبعضهم يقرأ عبر {lat}API{/lat} وقت الاستعلام. اسأل أين تُعالَج البيانات، ولدى أي مزوّد نماذج، وكم تُحفظ الأسئلة والسجلات، ومن يراها، واطلب من مستشارك القانوني مراجعة العقد.' },
      { q: 'هل تصلح ملاحظات الذكاء الاصطناعي دليلًا للمراجعة؟', a: 'فقط حين ترجع إلى السجلات. الملاحظة التي تذكر أرقام السجلات المسترجعة والقاعدة المطبقة ووقت الاستعلام يمكن فتحها والتحقق منها، وهذا ما يتوقعه معيارا {lat}ISA 500{/lat} و{lat}ISA 230{/lat}. أما عبارة الذكاء الاصطناعي غير المستندة فليست دليلًا مهما بدت واثقة.' },
      { q: 'ما أول ما تختبره المراجعة المستمرة في {lat}Odoo{/lat}؟', a: 'ابدأ بما يسهل التحقق منه ويكلّف فواته: الدفعات المكررة وشبه المكررة، والموردون شبه المكررين، والاعتمادات خارج المصفوفة، وأخطاء الفصل بين الفترات، وانحراف تقييم المخزون، والقيود اليدوية المتأخرة بمبالغ مقرّبة في نهاية الشهر. وشغّلها على فترة مقفلة أولًا لضبطها.' }
    ],
    sources: [
      { label: '{lat}Odoo{/lat}، ملاحظات الإصدار الرسمية {lat}"Odoo 20 Release Notes"{/lat} (سبتمبر {lat}2026{/lat})', url: 'https://www.odoo.com/odoo-20-release-notes' },
      { label: 'جمعية فاحصي الاحتيال المعتمدين {lat}(ACFE){/lat}، تقرير {lat}"Occupational Fraud 2024: A Report to the Nations"{/lat} ({lat}2024{/lat})', url: 'https://www.acfe.com/en-us/-/media/files/acfe/pdfs/rttn/2024/2024-report-to-the-nations.pdf' },
      { label: 'مجلس معايير المراجعة والتأكيد الدولية {lat}(IAASB){/lat}، {lat}"Project update: ISA 500 Audit Evidence"{/lat}، مسودات عرض لتعديل {lat}ISA 500{/lat} و{lat}ISA 330{/lat} و{lat}ISA 520{/lat} (أغسطس {lat}2026{/lat})', url: 'https://www.iaasb.org/publications/project-update-isa-500-audit-evidence' }
    ]
  }
};
