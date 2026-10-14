// 07. AI and segregation of duties: internal controls when agents are users
module.exports = {
  en: {
    slug: 'ai-segregation-of-duties-internal-controls',
    topic: 'audit',
    author: 'ahmed',
    reviewer: 'practice',
    image: { alt: 'Illustration: scattered transactions flow through a glowing white core onto a white ledger page showing two separate role panels, with a permission trying to cross between them blocked in cyan.' },
    date: '2026-10-14',
    title: 'AI and segregation of duties: internal controls when agents are users',
    metaTitle: 'AI and segregation of duties: internal controls',
    dek: 'An AI agent that can write to the ledger is a new user in your control design. Here is how to place it in the SoD matrix and use AI to test it.',
    description: 'How AI changes segregation of duties and internal controls: treat each agent as a user, map its conflicts, and test SoD across every transaction, not a sample.',
    keywords: [
      'AI segregation of duties',
      'AI internal controls',
      'AI agents segregation of duties',
      'SoD matrix AI agents',
      'Odoo 20 access rights',
      'continuous controls monitoring'
    ],
    about: ['Segregation of duties', 'Internal control', 'AI agents', 'Odoo', 'COSO Internal Control, Integrated Framework'],
    answer: 'AI changes segregation of duties because an AI agent that can create or update accounting records is, for control purposes, a user. It must sit in the SoD matrix with a role, an owner and minimum rights. Keep its output in draft for a named person to approve, and use AI to test conflicts across every transaction.',
    takeaways: [
      'An agent that can create or update records performs the recording function and belongs in the SoD matrix.',
      'Agents may draft, propose and monitor; authorization and custody stay with named people.',
      'AI adds configuration conflicts: the person who writes an agent’s instructions should not approve its drafts.',
      'Used as a detective control, AI checks who actually did what on every transaction, not who could have.'
    ],
    body: [
      { p: 'Run a user access review on an ERP where AI has been on for a few months and a new kind of line appears. It is not a person, it has no job description, it was set up by IT or the implementation partner, and it can create and update records in Accounting. Nobody put it in the segregation of duties matrix, because the matrix was written for people.' },
      { p: 'The basics of conflicting duties in Odoo are in our [[blog/segregation-of-duties-odoo/|guide to segregation of duties in Odoo]]. This article asks what changes when some hands in a process are agents, and how the same technology can test segregation on every transaction. It is part of our series on [[blog/ai-in-accounting-guide-2026/|AI in accounting in 2026]].' },

      { h2: 'What is segregation of duties when AI is part of the process?' },
      { p: 'Segregation of duties is the design rule that no single user, human or automated, can authorize, record, hold custody of and reconcile the same transaction. The four functions have not changed; the list of users has. COSO’s Internal Control, Integrated Framework (2013) has a place for this: Principle 10 covers control activities such as segregation, and Principle 11 covers general controls over technology, which is where the configuration of an AI agent belongs. ISA 315 (Revised 2019) requires the external auditor to understand the IT environment and general IT controls, so an agent with write access will be in scope at your next audit whether you mapped it or not.' },

      { h2: 'Is an AI agent a "user" for segregation of duties?' },
      { p: 'For control purposes, yes: the test is whether the actor can change the books. According to Odoo’s 20 release notes, AI agents can create records (including from an uploaded instruction file such as a PDF), update records, and be triggered by automated actions and scheduled actions. Anything that can create or update an accounting record performs the recording function and must sit in the matrix with a role, an owner and limits.' },
      { p: 'Before designing anything, confirm in your own Odoo 20 database under whose access rights an agent’s actions run and how its changes are attributed in the record history; that decides whether a conflict sits with the agent, the person who triggered it, or both. Also confirm which AI features your edition and plan include. Every AI request consumes IAP credits, billed per request and not included in any plan.' },
      { h3: 'Decision rule: which of the four functions may an agent hold?' },
      { table: {
        caption: 'Where an AI agent may sit among the four functions',
        head: ['Function', 'May an AI agent hold it?', 'Condition'],
        rows: [
          ['Authorize', 'No', 'Approval is a judgment that carries accountability, so it stays with a named, registered person. An agent may prepare the approval file.'],
          ['Record', 'Draft only', 'The agent drafts entries or records; a person who did not configure the agent reviews and posts them.'],
          ['Custody', 'No', 'No agent should initiate payments. If you pay bills from Odoo through payment initiation (PISP), keep the release with a person.'],
          ['Reconcile', 'Propose only', 'The agent proposes matches and flags suspected errors; a person validates the reconciliation.'],
          ['Monitor', 'Yes', 'Reading the full population for exceptions is where AI adds most and conflicts least, provided findings go to someone independent.']
        ]
      } },

      { h2: 'Which conflicts does AI introduce that a classic SoD matrix misses?' },
      { p: 'AI adds conflicting pairs that sit in configuration, not in transactions, so a classic matrix misses them:' },
      { ul: [
        'Agent configurer and approver. Whoever writes an agent’s instructions and skills shapes every entry it drafts. In Odoo 20, "topics" are renamed "skills" and default prompts accept context and dynamic values, so a one-line change can alter a month of drafts. That person should not approve them.',
        'Requester and approver of the same run. The person who asks an agent to prepare a correcting entry should not be the one who approves it.',
        'Trigger owner and process owner. Agents can be fired by automated and scheduled actions, and Studio automation rules can now trigger activity plans. Changing a trigger is changing a control, so it needs change management.',
        'Button clicker and authority holder. Odoo 20 agents ask questions, request permission and make suggestions answered by buttons, and they ask before exceeding their tool call limit. Each click is an approval, so define who may click.',
        'Connection owner and data owner. The release notes describe connecting to the database via MCP. An external connection is a user with rights; it belongs in the matrix and in your [[blog/connect-ai-to-odoo-continuous-audit/|design for connecting AI to Odoo]].'
      ] },

      { h2: 'How do you design internal controls for AI agents in Odoo?' },
      { p: 'Treat each agent like a new team member who works fast, never tires and has no judgment. Our procedure:' },
      { ol: [
        'Inventory every agent, every automated or scheduled action that calls AI, and every API or MCP connection. Record its owner, its trigger and the models it can create or update.',
        'Map each one to the four functions and add it to the SoD matrix as its own row, next to the people.',
        'Set its access rights to the minimum. Odoo’s 20 release notes say record rules are removed and the domain is set directly on the access right, so any restriction you relied on before an upgrade must be re-checked, not assumed.',
        'Keep agent output in draft. A named person who did not configure the agent posts it. Confirm in your database that the agent’s rights do not allow posting or confirming.',
        'Tier approvals by materiality: above your [[blog/materiality-isa-320-threshold/|ISA 320 materiality threshold]], require a second approver.',
        'Correct by reversal, never by deletion, and protect closed periods with lock dates (long-standing in recent Odoo versions; confirm in your 20 database who can change them).',
        'Retain evidence outside the chat. Stored AI conversations are kept up to 30 days after the last message, so anything you need as audit evidence must be captured in the record or a working paper before then.',
        'Review agent rights and configuration every quarter, using the user group change log that Odoo 20 keeps in each user’s chatter.'
      ] },
      { p: 'The governance of the agents themselves is covered in [[blog/odoo-20-ai-agents-finance-controls/|Odoo 20 AI agents under finance controls]], and the principle behind step 4 is set out in [[blog/agents-draft-people-approve/|agents draft, people approve]].' },
      { quote: 'An agent that can write to the ledger is a user. Give it a role, an owner, and a person who signs for its work.' },

      { h2: 'How can AI test segregation of duties instead of threatening it?' },
      { p: 'A manual access review checks who could act. A data test checks who did act, on every transaction. The difference matters: the ACFE’s Occupational Fraud 2026 report found that more than half of cases involved a lack of internal controls or an override of existing ones, and that proactive data monitoring is associated with lower losses and faster detection.' },
      { table: {
        caption: 'SoD control matrix: preventive design and AI-run detective tests',
        head: ['Risk', 'Preventive control', 'Detective test on the full population', 'Evidence to retain'],
        rows: [
          ['Fictitious vendor paid', 'Vendor maintenance and payment release in different roles', 'Same user changed a vendor’s bank details and released a payment to that vendor', 'Vendor change log, payment record, user ids'],
          ['Self-approved journal entry', 'Posting and approval in different roles', 'Same user created and posted a manual entry, especially late in the month and in round amounts', 'Entry history with creator and poster'],
          ['Approval bypass', 'Purchase Order Approval above a set amount (recent Odoo versions; confirm in 20)', 'Orders confirmed outside the approval matrix, or split to fall just below the threshold', 'Order approval history, version of the approval matrix'],
          ['Duplicate payment', 'Duplicate detection warnings on bills', 'Duplicate and near-duplicate payments, near-duplicate vendors', 'Bill ids, payment ids, warning status'],
          ['Agent drift', 'Draft-only rights; approval by someone other than the configurer', 'Drafts approved by the person who configured or triggered the agent', 'Agent configuration history, approver id']
        ]
      } },
      { p: 'Running these tests on every record is the subject of [[blog/full-population-testing-ai-vs-sampling/|full-population testing with AI]]. A hit is a lead, not a finding: two conflicting roles held by one user is a design weakness, and whether it was exploited is a question for evidence, as explained in [[blog/ai-financial-fraud-detection/|AI-based fraud detection]].' },

      { h2: 'What if the team is too small to separate duties?' },
      { p: 'A two-person team cannot split seven conflicting pairs, and agents do not change that, because an agent cannot carry accountability. The answer is still compensating controls, now cheaper to run. An owner or general manager outside the transaction reviews a short monthly exception list produced by AI: users who both created and approved, vendor bank changes followed by payments, manual entries after the close. The review is quick because the list is short, and documented because the list is a record. That is COSO Principle 16 (ongoing and separate evaluations) in a form a small team can sustain.' },

      { h2: 'Where to start on Monday' },
      { ol: [
        'List every AI agent, automation and external connection in your ERP, with one named owner for each.',
        'Add them as rows in your SoD matrix and mark the function each one performs.',
        'Remove posting, confirming and payment rights from agents; keep them on draft.',
        'Run one detective test on the last quarter: users who both created and approved the same journal entry or vendor payment.',
        'Agree who reviews the exceptions, and how evidence is kept beyond the 30-day conversation window.'
      ] },
      { p: 'This is how we built MFT Intelligence, twelve finance agents written by MFT’s accountants: agents draft correcting entries and adjustments, a named, registered person approves, a second approver is required above the client’s ISA 320 materiality threshold, corrections are made by reversal, and nothing is auto-posted. The [[intelligence/auditor/|Auditor agent]] is available now as a managed service, and our [[services/internal-audit/|internal audit team]] can bring your agents into a segregation of duties review alongside your people. See also [[blog/ai-audit-trail-zero-hallucination/|the AI audit trail]] and [[blog/continuous-auditing-ai-vs-traditional-audit/|continuous auditing with AI]].' }
    ],
    faq: [
      { q: 'Can an AI agent approve transactions in an ERP?', a: 'It should not. Approval carries accountability, and an agent cannot be held accountable. Let the agent prepare the approval file, such as the supporting records and the exceptions it found, and leave the decision to a named, registered person. Above your materiality threshold, add a second approver who did not request the agent’s work.' },
      { q: 'Who should configure AI agents in the finance system?', a: 'Someone who does not approve what the agent produces. Writing an agent’s instructions shapes every draft it creates, so it is a recording function. Separate it from approval, put configuration changes under change management, and review the configuration history at least quarterly alongside user access rights.' },
      { q: 'How does AI help test segregation of duties?', a: 'It reads every transaction instead of a sample and checks who actually acted: the same user creating and posting a journal entry, changing a vendor’s bank details and releasing a payment, or approving outside the approval matrix. Each hit is a lead for review, documented with record ids, not a confirmed violation.' },
      { q: 'Does Odoo 20 change access rights for segregation of duties?', a: 'According to Odoo’s 20 release notes, record rules are removed and the domain is set directly on the access right, and user group changes are logged in the user’s chatter. After upgrading, re-test every restriction your segregation design relied on and use the change log as review evidence.' },
      { q: 'Is a segregation of duties conflict found by AI proof of fraud?', a: 'No. A conflict shows that one user could, or did, perform two functions that should be separate. That is a control weakness. Whether anyone misused it is a separate question answered by examining the underlying transactions and documents, with the person involved given a chance to explain.' }
    ],
    sources: [
      { label: 'Odoo, "Odoo 20 Release Notes" (24 September 2026)', url: 'https://www.odoo.com/odoo-20-release-notes' },
      { label: 'ACFE, "Occupational Fraud 2026: A Report to the Nations" (press release, 19 May 2026)', url: 'https://www.acfe.com/about-the-acfe/newsroom-for-media/press-releases/press-release-detail?s=report-to-the-' }
    ]
  },

  ar: {
    slug: 'ai-segregation-of-duties-internal-controls',
    topic: 'audit',
    author: 'ahmed',
    reviewer: 'practice',
    image: { alt: 'رسم توضيحي: معاملات متناثرة تتدفق عبر نواة بيضاء مضيئة إلى صفحة دفتر بيضاء تُظهر لوحتا دورين منفصلتان، مع صلاحية تحاول العبور بينهما وتُمنع باللون السماوي.' },
    date: '2026-10-14',
    title: 'الذكاء الاصطناعي والفصل بين المهام: الوكيل مستخدم داخل الضوابط الرقابية',
    metaTitle: 'الذكاء الاصطناعي والفصل بين المهام والضوابط الرقابية',
    dek: 'الوكيل الذكي الذي يستطيع الكتابة في الدفاتر مستخدم جديد في تصميم الرقابة. كيف تضعه في مصفوفة الفصل بين المهام، وكيف تستخدم الذكاء الاصطناعي لاختباره.',
    description: 'كيف يغيّر الذكاء الاصطناعي الفصل بين المهام والضوابط الرقابية: عامل كل وكيل كمستخدم، وارسم تعارضاته، واختبر الفصل على كل المعاملات لا على عينة منها.',
    keywords: [
      'الذكاء الاصطناعي والفصل بين المهام',
      'الضوابط الرقابية الداخلية والذكاء الاصطناعي',
      'مصفوفة الفصل بين المهام',
      'وكلاء الذكاء الاصطناعي في المحاسبة',
      'صلاحيات المستخدمين في أودو'
    ],
    about: ['الفصل بين المهام', 'الرقابة الداخلية', 'وكلاء الذكاء الاصطناعي', 'أودو', 'إطار كوسو للرقابة الداخلية'],
    answer: 'يغيّر الذكاء الاصطناعي الفصل بين المهام لأن الوكيل القادر على إنشاء القيود والسجلات المحاسبية أو تعديلها يُعد مستخدمًا من منظور الرقابة. لذلك يجب أن يظهر في مصفوفة الفصل بين المهام بدور ومالك وأدنى صلاحيات ممكنة، وأن تبقى مخرجاته مسودات يعتمدها شخص مسمّى، مع استخدام الذكاء الاصطناعي نفسه لاختبار التعارضات على كل المعاملات.',
    takeaways: [
      'الوكيل الذي ينشئ السجلات أو يعدّلها يؤدي وظيفة التسجيل، ومكانه مصفوفة الفصل بين المهام.',
      'للوكيل أن يُعِدّ ويقترح ويراقب؛ أما الاعتماد وحيازة الأصول فيبقيان مع أشخاص مسمّين.',
      'يضيف الذكاء الاصطناعي تعارضات في الإعداد: من يكتب تعليمات الوكيل لا يعتمد مسوداته.',
      'كضابط كاشف، يفحص الذكاء الاصطناعي من نفّذ فعلًا على كل معاملة، لا من كان يستطيع التنفيذ.'
    ],
    body: [
      { p: 'افتح مراجعة صلاحيات المستخدمين على نظام {lat}ERP{/lat} مضى على تفعيل الذكاء الاصطناعي فيه بضعة أشهر، وستجد سطرًا من نوع جديد. ليس موظفًا، وليس له وصف وظيفي، أعدّه أحد أفراد تقنية المعلومات أو شريك التنفيذ، ويستطيع إنشاء السجلات وتعديلها في المحاسبة. لم يضعه أحد في مصفوفة الفصل بين المهام، لأن المصفوفة كُتبت للبشر.' },
      { p: 'هذا المقال يتناول ضابطًا قديمًا من زاوية الذكاء الاصطناعي. أساسيات المهام المتعارضة في {lat}Odoo{/lat} شرحناها في [[blog/segregation-of-duties-odoo/|دليل الفصل بين المهام في {lat}Odoo{/lat}]]. السؤال هنا: ماذا يتغير حين يكون بعض المنفذين في العملية وكلاء آليين، وكيف تختبر التقنية نفسها الفصل بين المهام على كل معاملة بدل العينة؟ والمقال جزء من سلسلتنا عن [[blog/ai-in-accounting-guide-2026/|الذكاء الاصطناعي في المحاسبة {lat}2026{/lat}]].' },

      { h2: 'ما الفصل بين المهام حين يدخل الذكاء الاصطناعي في العملية؟' },
      { p: 'الفصل بين المهام هو قاعدة التصميم التي تمنع أي مستخدم واحد، بشريًا كان أو آليًا، من اعتماد المعاملة وتسجيلها وحيازة الأصل وتسويتها معًا. الوظائف الأربع لم تتغير، الذي تغيّر هو قائمة المستخدمين. وإطار {lat}COSO{/lat} للرقابة الداخلية ({lat}2013{/lat}) يتسع لذلك: المبدأ {lat}10{/lat} يغطي الأنشطة الرقابية ومنها الفصل بين المهام، والمبدأ {lat}11{/lat} يغطي الضوابط العامة على التقنية، وهناك بالضبط يقع إعداد وكيل الذكاء الاصطناعي. ويُلزم معيار {lat}ISA 315 (Revised 2019){/lat} المراجع الخارجي بفهم بيئة تقنية المعلومات والضوابط العامة عليها، فالوكيل الذي يملك صلاحية الكتابة سيدخل نطاق المراجعة القادمة سواء رسمتموه في المصفوفة أم لا.' },

      { h2: 'هل يُعد وكيل الذكاء الاصطناعي "مستخدمًا" في الفصل بين المهام؟' },
      { p: 'من منظور الرقابة، نعم. المعيار ليس هل المنفّذ إنسان، بل هل يستطيع تغيير الدفاتر. ووفق ملاحظات إصدار {lat}Odoo 20{/lat}، يستطيع وكلاء الذكاء الاصطناعي إنشاء السجلات (بما في ذلك من ملف تعليمات مرفوع مثل {lat}PDF{/lat})، وتعديلها، والعمل بمشغّلات من الإجراءات الآلية والإجراءات المجدولة. وكل ما يستطيع إنشاء سجل محاسبي أو تعديله يؤدي وظيفة التسجيل، ويجب أن يكون في المصفوفة بدور ومالك وحدود.' },
      { p: 'قبل أي تصميم، تأكد من أمرين في قاعدة بيانات {lat}Odoo 20{/lat} الخاصة بك: بصلاحيات من تُنفَّذ إجراءات الوكيل، وكيف تُنسب تعديلاته في سجل التغييرات. الإجابة تحدد هل التعارض يقع على الوكيل، أم على من شغّله، أم على الاثنين. وتأكد كذلك من ميزات الذكاء الاصطناعي المتاحة في نسختك وخطتك؛ فكل طلب يستهلك أرصدة {lat}IAP{/lat} تُحتسب لكل طلب ولا تدخل في أي خطة.' },
      { h3: 'قاعدة القرار: أي الوظائف الأربع يجوز أن يتولاها الوكيل؟' },
      { table: {
        caption: 'موقع وكيل الذكاء الاصطناعي من الوظائف الأربع',
        head: ['الوظيفة', 'هل يتولاها الوكيل؟', 'الشرط'],
        rows: [
          ['الاعتماد', 'لا', 'الاعتماد حكم مهني تترتب عليه مسؤولية، فيبقى مع شخص مسمّى ومسجّل. للوكيل أن يجهّز ملف الاعتماد فقط.'],
          ['التسجيل', 'مسودة فقط', 'يُعدّ الوكيل القيود أو السجلات، ويراجعها ويرحّلها شخص لم يشارك في إعداد الوكيل.'],
          ['حيازة الأصول', 'لا', 'لا يبدأ أي وكيل عملية دفع. وإن كنتم تسددون الفواتير من {lat}Odoo{/lat} عبر خدمة بدء الدفع ({lat}PISP{/lat})، فإطلاق الدفعة يبقى بيد شخص.'],
          ['التسوية', 'اقتراح فقط', 'يقترح الوكيل المطابقات وينبّه إلى الأخطاء المحتملة، ويعتمد التسوية شخص.'],
          ['المراقبة', 'نعم', 'قراءة المجتمع الكامل بحثًا عن الاستثناءات هي أكثر ما يضيفه الذكاء الاصطناعي وأقل ما يتعارض، بشرط أن تذهب النتائج إلى طرف مستقل.']
        ]
      } },

      { h2: 'ما التعارضات الجديدة التي لا تلتقطها مصفوفة الفصل التقليدية؟' },
      { p: 'المصفوفة التقليدية تسرد أزواجًا مثل تعديل بيانات المورد وإطلاق الدفع له. والذكاء الاصطناعي يضيف أزواجًا يسهل أن تفوتك لأنها في الإعداد لا في المعاملات:' },
      { ul: [
        'من يُعِدّ الوكيل ومن يعتمد مسوداته. كاتب التعليمات والمهارات يشكّل كل قيد يُعدّه الوكيل. وفي {lat}Odoo 20{/lat} صار اسم "المواضيع" "المهارات"، وتقبل الأوامر الافتراضية سياقًا وقيمًا ديناميكية، فتعديل سطر واحد قد يغيّر توجيه مسودات شهر كامل. هذا الشخص لا ينبغي أن يعتمد المسودات.',
        'من يطلب التشغيل ومن يعتمد نتيجته. من يطلب من الوكيل إعداد قيد تصحيح لا يكون هو معتمده.',
        'مالك المشغّل ومالك العملية. تُشغَّل الوكلاء بإجراءات آلية ومجدولة، وصارت قواعد الأتمتة في {lat}Studio{/lat} قادرة على تشغيل خطط الأنشطة. تغيير المشغّل تغيير في ضابط رقابي، فيحتاج إدارة تغيير وعينًا ثانية.',
        'من يضغط الزر ومن يملك الصلاحية. وكلاء {lat}Odoo 20{/lat} يطرحون أسئلة ويطلبون إذنًا ويقدمون اقتراحات يُرد عليها بأزرار، ويستأذنون قبل تجاوز حد استدعاء الأدوات. كل ضغطة اعتماد، فحدّد من يحق له الضغط.',
        'مالك الاتصال ومالك البيانات. تذكر ملاحظات الإصدار الاتصال بقاعدة البيانات عبر {lat}MCP{/lat}. الاتصال الخارجي مستخدم له صلاحيات، ومكانه المصفوفة و[[blog/connect-ai-to-odoo-continuous-audit/|تصميم ربط الذكاء الاصطناعي بـ{lat}Odoo{/lat}]].'
      ] },

      { h2: 'كيف تصمم الضوابط الرقابية لوكلاء الذكاء الاصطناعي في {lat}Odoo{/lat}؟' },
      { p: 'تعامل مع كل وكيل كموظف جديد في الإدارة المالية: سريع، لا يتعب، ولا يملك تقديرًا مهنيًا. هذه الخطوات التي نتبعها:' },
      { ol: [
        'احصر كل وكيل، وكل إجراء آلي أو مجدول يستدعي الذكاء الاصطناعي، وكل اتصال عبر {lat}API{/lat} أو {lat}MCP{/lat}، وسجّل مالكه ومشغّله والنماذج التي يستطيع إنشاءها أو تعديلها.',
        'اربط كلًا منها بإحدى الوظائف الأربع، وأضفه إلى مصفوفة الفصل بين المهام سطرًا مستقلًا بجوار الموظفين.',
        'اجعل صلاحياته في حدها الأدنى. تقول ملاحظات إصدار {lat}Odoo 20{/lat} إن قواعد السجلات أُلغيت وصار النطاق يُحدد مباشرة على صلاحية الوصول، فأي قيد اعتمدتم عليه قبل الترقية يُعاد اختباره ولا يُفترض بقاؤه.',
        'أبقِ مخرجات الوكيل مسودات يرحّلها شخص مسمّى لم يشارك في إعداده، وتأكد في قاعدة بياناتك أن صلاحيات الوكيل لا تسمح بالترحيل أو التأكيد.',
        'درّج الاعتماد حسب الأهمية النسبية: فوق [[blog/materiality-isa-320-threshold/|حد الأهمية النسبية وفق {lat}ISA 320{/lat}]] يلزم معتمِد ثانٍ.',
        'صحّح بالعكس لا بالحذف، واحمِ الفترات المُقفلة بتواريخ الإقفال (ميزة قائمة في إصدارات {lat}Odoo{/lat} الحديثة؛ تأكد في قاعدة {lat}20{/lat} ممن يستطيع تغييرها).',
        'احفظ الدليل خارج المحادثة. محادثات الذكاء الاصطناعي المخزنة تُحفظ حتى {lat}30{/lat} يومًا بعد آخر رسالة، فما تحتاجه دليلًا للمراجعة يُثبَّت في السجل أو في ورقة عمل قبل ذلك.',
        'راجع صلاحيات الوكلاء وإعداداتهم كل ربع سنة، مستعينًا بسجل تغييرات مجموعات المستخدمين الذي يحفظه {lat}Odoo 20{/lat} في محادثة كل مستخدم.'
      ] },
      { p: 'حوكمة الوكلاء أنفسهم تناولناها في [[blog/odoo-20-ai-agents-finance-controls/|وكلاء {lat}Odoo 20{/lat} تحت الضوابط المالية]]، والمبدأ وراء الخطوة الرابعة شرحناه في [[blog/agents-draft-people-approve/|الوكيل يُعِدّ والإنسان يعتمد]].' },
      { quote: 'الوكيل الذي يكتب في الدفتر مستخدم. أعطه دورًا ومالكًا وشخصًا يوقّع على عمله.' },

      { h2: 'كيف يختبر الذكاء الاصطناعي الفصل بين المهام بدل أن يهدده؟' },
      { p: 'التقنية نفسها أقوى ضابط كاشف عرفه الفصل بين المهام. مراجعة الصلاحيات اليدوية تفحص من كان يستطيع أن يفعل، واختبار البيانات يفحص من فعل فعلًا، على كل معاملة. والفرق جوهري: وجد تقرير {lat}ACFE{/lat} عن الاحتيال المهني لعام {lat}2026{/lat} أن أكثر من نصف الحالات ارتبط بغياب الضوابط الداخلية أو بتجاوز الضوابط القائمة، وأن المراقبة الاستباقية للبيانات ترتبط بخسائر أقل واكتشاف أسرع.' },
      { table: {
        caption: 'مصفوفة رقابة للفصل بين المهام: التصميم الوقائي والاختبارات الكاشفة بالذكاء الاصطناعي',
        head: ['الخطر', 'الضابط الوقائي', 'الاختبار الكاشف على المجتمع الكامل', 'الدليل المحفوظ'],
        rows: [
          ['الدفع لمورد وهمي', 'تعديل بيانات الموردين وإطلاق الدفع في دورين مختلفين', 'المستخدم نفسه غيّر البيانات البنكية للمورد ثم أطلق دفعة له', 'سجل تغييرات المورد، سجل الدفعة، معرّفات المستخدمين'],
          ['قيد يومية يعتمده صاحبه', 'الترحيل والاعتماد في دورين مختلفين', 'المستخدم نفسه أنشأ قيدًا يدويًا ورحّله، خاصة في آخر الشهر وبمبالغ مقرّبة', 'سجل القيد بمُنشئه ومرحّله'],
          ['تجاوز الاعتماد', 'اعتماد أوامر الشراء فوق مبلغ محدد (إصدارات {lat}Odoo{/lat} الحديثة؛ تأكد في {lat}20{/lat})', 'أوامر أُكّدت خارج مصفوفة الاعتماد، أو قُسّمت لتقع تحت الحد مباشرة', 'سجل اعتماد الأوامر، إصدار مصفوفة الاعتماد'],
          ['الدفع المكرر', 'تنبيهات اكتشاف التكرار على الفواتير', 'مدفوعات مكررة أو شبه مكررة، وموردون متشابهون', 'معرّفات الفواتير والمدفوعات، حالة التنبيه'],
          ['انحراف الوكيل', 'صلاحيات مسودة فقط، واعتماد من غير مُعِدّ الوكيل', 'مسودات اعتمدها من أعدّ الوكيل أو شغّله', 'سجل إعداد الوكيل، معرّف المعتمِد']
        ]
      } },
      { p: 'تشغيل هذه الاختبارات على كل سجل بدل العينة هو موضوع [[blog/full-population-testing-ai-vs-sampling/|اختبار المجتمع الكامل بالذكاء الاصطناعي]]. وتحفّظ واجب: النتيجة خيط للمتابعة لا ملاحظة مؤكدة. اجتماع دورين متعارضين لدى مستخدم واحد ضعف في التصميم، أما هل استُغل فسؤال تجيب عنه الأدلة، كما نشرح في [[blog/ai-financial-fraud-detection/|كشف الاحتيال المالي بالذكاء الاصطناعي]].' },

      { h2: 'وماذا لو كان الفريق أصغر من أن تُفصل فيه المهام؟' },
      { p: 'فريق مالية من شخصين لا يستطيع توزيع سبعة أزواج متعارضة، وإضافة الوكلاء لا تغيّر ذلك، لأن الوكيل لا يتحمل مسؤولية. الحل ما زال الضوابط التعويضية، لكنها صارت أرخص تشغيلًا. المالك أو المدير العام، وهو خارج المعاملة، يراجع شهريًا قائمة استثناءات قصيرة يُعدّها الذكاء الاصطناعي: مستخدمون أنشأوا واعتمدوا، وتغييرات في الحسابات البنكية للموردين تلتها مدفوعات، وقيود يدوية بعد الإقفال الشهري. المراجعة تأخذ دقائق لأن القائمة قصيرة، وهي موثقة لأن القائمة نفسها سجل. هذا هو المبدأ {lat}16{/lat} في {lat}COSO{/lat} (التقييمات المستمرة والمنفصلة) بصيغة يقدر عليها فريق صغير.' },

      { h2: 'من أين تبدأ يوم الأحد؟' },
      { ol: [
        'اكتب قائمة بكل وكيل ذكاء اصطناعي وكل أتمتة وكل اتصال خارجي في نظامك، ولكل منها مالك واحد مسمّى.',
        'أضفها أسطرًا في مصفوفة الفصل بين المهام، وحدد الوظيفة التي يؤديها كل منها.',
        'اسحب من الوكلاء صلاحيات الترحيل والتأكيد والدفع، وأبقهم على المسودات.',
        'شغّل اختبارًا كاشفًا واحدًا على الربع الأخير: مستخدمون أنشأوا واعتمدوا القيد نفسه أو الدفعة نفسها.',
        'اتفق على من يراجع الاستثناءات، وكيف يُحفظ الدليل بعد نافذة الـ{lat}30{/lat} يومًا للمحادثات.'
      ] },
      { p: 'بهذا المنطق بنينا {lat}MFT Intelligence{/lat}، اثني عشر وكيلًا ماليًا كتبها محاسبو {lat}MFT{/lat}: الوكيل يُعدّ قيود التصحيح والتسويات، ويعتمدها شخص مسمّى ومسجّل، ويلزم معتمِد ثانٍ فوق حد الأهمية النسبية للعميل وفق {lat}ISA 320{/lat}، والتصحيح بقيد عكسي، ولا يُرحَّل شيء آليًا. [[intelligence/auditor/|وكيل المراجع]] متاح الآن كخدمة مُدارة، وفريق [[services/internal-audit/|المراجعة الداخلية]] لدينا يستطيع إدخال وكلائكم في مراجعة الفصل بين المهام جنبًا إلى جنب مع موظفيكم. ولجانب الأدلة اقرأ [[blog/ai-audit-trail-zero-hallucination/|مسار التدقيق في الذكاء الاصطناعي وقاعدة الدليل أو الصمت]]، ولنموذج المتابعة [[blog/continuous-auditing-ai-vs-traditional-audit/|المراجعة المستمرة بالذكاء الاصطناعي]].' }
    ],
    faq: [
      { q: 'هل يجوز أن يعتمد وكيل الذكاء الاصطناعي المعاملات في نظام {lat}ERP{/lat}؟', a: 'لا ينبغي. الاعتماد تترتب عليه مسؤولية، والوكيل لا يُسأل. دع الوكيل يجهّز ملف الاعتماد من مستندات داعمة واستثناءات وجدها، واترك القرار لشخص مسمّى ومسجّل. وفوق حد الأهمية النسبية أضف معتمِدًا ثانيًا لم يكن هو من طلب عمل الوكيل.' },
      { q: 'من يجب أن يُعدّ وكلاء الذكاء الاصطناعي في النظام المالي؟', a: 'شخص لا يعتمد ما ينتجه الوكيل. كتابة تعليمات الوكيل تشكّل كل مسودة يُعدّها، فهي وظيفة تسجيل. افصلها عن الاعتماد، وضع تغييرات الإعداد تحت إدارة التغيير، وراجع سجل الإعداد كل ربع سنة على الأقل مع مراجعة صلاحيات المستخدمين.' },
      { q: 'كيف يساعد الذكاء الاصطناعي في اختبار الفصل بين المهام؟', a: 'يقرأ كل المعاملات بدل العينة ويتحقق ممن نفّذ فعلًا: مستخدم أنشأ قيد يومية ورحّله، أو غيّر البيانات البنكية لمورد ثم أطلق دفعة له، أو اعتمد خارج مصفوفة الاعتماد. كل نتيجة خيط للمراجعة موثق بمعرّفات السجلات، لا مخالفة مؤكدة.' },
      { q: 'هل يغيّر {lat}Odoo 20{/lat} صلاحيات الوصول المتعلقة بالفصل بين المهام؟', a: 'وفق ملاحظات إصدار {lat}Odoo 20{/lat}، أُلغيت قواعد السجلات وصار النطاق يُحدد مباشرة على صلاحية الوصول، وتُسجَّل تغييرات مجموعات المستخدمين في محادثة المستخدم. بعد الترقية أعد اختبار كل قيد اعتمد عليه تصميم الفصل، واستخدم سجل التغييرات دليلًا للمراجعة.' },
      { q: 'هل التعارض الذي يكتشفه الذكاء الاصطناعي دليل على احتيال؟', a: 'لا. التعارض يبيّن أن مستخدمًا واحدًا كان يستطيع، أو قام فعلًا، بوظيفتين يجب فصلهما، وهذا ضعف رقابي. أما هل أساء أحد استخدامه فسؤال آخر تجيب عنه فحص المعاملات والمستندات الأصلية، مع إعطاء الشخص المعني فرصة للتوضيح.' }
    ],
    sources: [
      { label: 'أودو، ملاحظات إصدار {lat}Odoo 20{/lat}: {lat}"Odoo 20 Release Notes"{/lat} ({lat}24{/lat} سبتمبر {lat}2026{/lat})', url: 'https://www.odoo.com/odoo-20-release-notes' },
      { label: 'جمعية فاحصي الاحتيال المعتمدين، تقرير الاحتيال المهني: {lat}"Occupational Fraud 2026: A Report to the Nations"{/lat} (بيان صحفي، {lat}19{/lat} مايو {lat}2026{/lat})', url: 'https://www.acfe.com/about-the-acfe/newsroom-for-media/press-releases/press-release-detail?s=report-to-the-' }
    ]
  }
};
