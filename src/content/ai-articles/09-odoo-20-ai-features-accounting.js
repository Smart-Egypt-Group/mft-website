// 09. Odoo 20 AI features for accounting: a feature-by-feature map
module.exports = {
  en: {
    slug: 'odoo-20-ai-features-accounting',
    topic: 'odoo',
    author: 'ahmed',
    reviewer: 'practice',
    image: { alt: 'Illustration: scattered transactions flow through a glowing white core onto a white ledger page showing a grid of app tiles where some modules carry an AI spark, one lit in cyan.' },
    date: '2026-10-14',
    title: 'Odoo 20 AI features for accounting: a feature-by-feature map',
    metaTitle: 'Odoo 20 AI Features for Accounting: Feature Map',
    dek: 'Which Odoo 20 AI features read your ledger, which can change it, which bill you per request, and which control each one needs before go-live.',
    description: 'Odoo 20 AI features for accounting, mapped one by one: what each does, which consume IAP credits, and which controls change once AI starts drafting entries.',
    keywords: ['Odoo 20 AI features', 'Odoo AI accounting', 'Odoo 20 AI agents', 'Odoo IAP credits', 'Odoo AI financial insights'],
    about: ['Odoo', 'Artificial intelligence', 'Accounting', 'Internal control', 'Accounts payable'],
    answer: 'Odoo 20’s AI features for accounting are AI-powered financial insights, agents that create and update records inside automated and scheduled actions, a database connection through MCP, and automatic model selection, all billed per request through IAP credits. Bill line prediction and duplicate detection sit beside them. Each needs an owner, scoped access rights and a named approver.',
    takeaways: [
      'Every Odoo 20 AI feature consumes IAP credits billed per request; none is included in a plan.',
      'The financial insights assistant answers only from the accounting data already in your database.',
      'Agents that create or update records belong inside your approval matrix, not beside it.',
      'Stored AI conversations last 30 days, so file any answer that supports an entry elsewhere.'
    ],
    body: [
      { p: 'At most Odoo 20 launch demos, someone types a question about cash and gets an answer in seconds. The finance manager in the room usually asks something less exciting: which of these features read the ledger, which ones can change it, and which ones send a bill. Those three questions sort the AI items in Odoo’s 20 release notes better than any menu, and your auditor will ask them after go-live.' },
      { p: 'This article covers only the AI items and the prediction features beside them. For the full picture, read our [[blog/odoo-20-whats-new-for-finance-teams/|overview of what Odoo 20 changes for finance teams]] and [[blog/odoo-20-ai-agents-finance-controls/|how to govern Odoo 20 AI agents in finance]]. Here the goal is a map you can hold against your own database.' },
      { h2: 'What counts as an AI feature in Odoo 20 accounting?' },
      { p: 'An Odoo 20 AI feature for accounting is any function that uses an AI model to answer, draft or act on accounting data, and according to Odoo’s 20 release notes every such feature now requires credits bought through IAP (In-App Purchase), billed per request and not included in any plan. That billing rule doubles as a test: if a feature consumes credits, budget and control it as AI, whatever menu it sits in.' },
      { p: 'The AI section of the notes covers agents, agentic automation, the MCP connection and model selection; the Accounting section adds AI-powered financial insights. Bill line prediction and duplicate detection are described without being called AI. They stay on the map because they shape the same entries; whether they draw credits must be confirmed in your database.' },
      { p: 'One gap to close first: we have not verified which agent capabilities are in Enterprise and which, if any, are in Community. Confirm it for your edition and plan.' },
      { h2: 'Which Odoo 20 AI features touch accounting, and what do they change?' },
      { p: '"Reads" means the feature only looks at data. "Drafts" means it creates or changes records a person can still review. "Acts" means it can start work inside an automation without a person.' },
      { table: {
        caption: 'Odoo 20 AI and prediction features for accounting: what each does and the control it needs',
        head: ['Feature', 'What it does (per Odoo’s 20 release notes)', 'Credits', 'Effect on data', 'Control to put in place'],
        rows: [
          ['AI-powered financial insights', 'Answers finance questions from accounting data in the database only; reviews suspected reconciliation errors', 'Yes, per request', 'Reads', 'Verify against the report before any decision or entry'],
          ['Agentic automation', 'Agents run from automated and scheduled actions; chats show how errors were handled', 'Yes, per trigger', 'Acts', 'Owner per trigger, monthly credit review'],
          ['Agents creating records', 'Create records, including from an uploaded PDF instruction file', 'Yes', 'Drafts', 'Draft state; approver other than the instructor'],
          ['Agents updating records', 'Update records; reprocess sources', 'Yes', 'Drafts or acts, depending on rights', 'Minimal rights; review changes'],
          ['Interactive responses and tool call limit', 'Permission requests through buttons; agent asks before exceeding its tool call limit', 'Yes', 'Gate', 'Decide who may grant permission'],
          ['MCP connection', 'Outside tools connect to the database', 'Confirm', 'Depends on rights', 'Dedicated user, scoped rights, logged access'],
          ['Automatic model selection', 'You choose the provider; Odoo picks the model', 'None stated', 'None directly', 'Record the provider; expect answers to vary'],
          ['Stored conversations', 'Kept up to 30 days after the last message', 'Not applicable', 'Retention', 'File evidence in the approval record'],
          ['AI file renaming (Documents)', 'Renames files with AI', 'Yes', 'Changes metadata', 'Spot-check against source'],
          ['Bill line prediction (Accounting)', 'Suggests line account, tax, analytic and more from bill history', 'Confirm', 'Drafts', 'Review account and tax'],
          ['Duplicate detection (Accounting)', 'Red for highly likely, yellow for potential duplicates', 'Confirm', 'Warns', 'Recorded reason for any red override']
        ]
      } },
      { h2: 'What does the AI assistant actually know about your finances?' },
      { p: 'The release notes are precise on the point that matters most to accountants: the financial insights assistant answers based solely on accounting data in your database. That anchors it in your books, and it is also the limit: if bank lines are unreconciled or accruals are not yet posted, it answers from the books as they are and cannot tell you what is missing.' },
      { p: 'Before anyone quotes it in a management meeting, test it against a period you have already closed:' },
      { ol: [
        'Pick a month that is closed, reconciled and reviewed, and protected by your usual lock date.',
        'Write five questions whose answers you hold in signed schedules, such as receivables overdue beyond 90 days and unreconciled bank items at month end.',
        'Ask each with the period and company stated, and record the answer, date and asker.',
        'Compare every answer with the signed schedule and classify each difference as wording, scope (a different date, filter or entity) or substance.',
        'Ask it to review suspected reconciliation errors for that month and check each finding against the [[blog/odoo-20-bank-reconciliation-and-bill-payments/|Odoo 20 bank reconciliation summary report]].',
        'Write a one-page usage note: reliable questions, questions needing a report check, and questions not to ask.'
      ] },
      { p: 'A substance difference is not a reason to switch the feature off; it marks the boundary to write down before the first busy close.' },
      { h2: 'How do Odoo 20 agents draft and change accounting records?' },
      { p: 'This is where AI moves from answering to doing. According to the release notes, agents can create records, including from an uploaded instruction file such as a PDF, update records, reprocess sources manually, and run inside automated and scheduled actions. An agent can be model-bound, becoming the default agent for a model, and instructions can be dictated by voice, which makes a written trail of who asked for what more important.' },
      { p: 'Confirm in your database which user and rights an agent acts under. Two Odoo 20 changes help: record rules are removed and the domain is set directly on the access right, and user group changes are logged in the user’s chatter, so widened rights leave a trail. Both belong in the review of [[blog/ai-segregation-of-duties-internal-controls/|AI agents inside segregation of duties]].' },
      { p: 'Our decision rule is short. If an agent’s output can reach the general ledger, a payment or vendor master data, it stays in draft and a named person approves it. The interactive permission buttons in Odoo 20 are useful, but a click by the same person who gave the instruction is not an independent approval.' },
      { quote: 'Credits pay for the answer. They do not pay for the review, and the review is the control.' },
      { h2: 'What do credits and conversation retention mean for finance?' },
      { p: 'Because every AI request is billed through IAP and none is included in a plan, AI cost behaves like a utility, not a licence. Budget by trigger, not by user: list each scheduled or automated action that calls an agent with its frequency, and compare consumption with that list monthly. Consumption you cannot map points to a trigger nobody owns.' },
      { p: 'Automatic model selection means the model behind an answer can change without any configuration change on your side, so record the provider in your AI policy and do not expect identical answers on different dates. Stored conversations are kept up to 30 days after the last message. If a conversation supports an entry or a decision, copy the answer into the approval record on the entry, and see our note on the [[blog/ai-audit-trail-zero-hallucination/|audit trail for AI output]].' },
      { h2: 'Which features predict rather than reason, and why does it matter?' },
      { p: 'These Accounting features shape entries as much as any agent, so they belong in the same review.' },
      { h3: 'Bill line prediction' },
      { p: 'When a bill is encoded manually or by import, Odoo suggests the product, account, tax, analytic distribution and vehicle from bill history and the label. Prediction from history repeats history, mistakes included: a vendor miscoded for a year will be miscoded again with confidence. Test it on vendors whose coding you recently corrected. For the wider entry workflow, see [[blog/ai-journal-entries-bank-reconciliation/|automating journal entries and bank reconciliation with AI]].' },
      { h3: 'Duplicate detection and pending payments' },
      { p: 'The payment wizard also detects pending payments to prevent double payment. A warning becomes a control only when overrides are recorded with a reason, by someone authorised to override.' },
      { h2: 'What should a finance team do on Monday?' },
      { ol: [
        'List every AI feature enabled in your database, using the table above as the checklist, and confirm which are available in your edition and plan.',
        'Name one owner for the IAP credit balance and one approver for each agent that can create or update accounting records.',
        'Run the closed-month test of the financial insights assistant and write the usage note.',
        'Review access rights for every user or connection used by agents or MCP, and read the chatter for recent group changes.',
        'Sample 20 predicted bill lines and every red duplicate warning overridden in the last month.',
        'Decide where AI answers that support entries are filed, so the evidence outlives the 30-day conversation window.'
      ] },
      { p: 'If you are still planning the move, fold these checks into your [[blog/odoo-20-upgrade-plan-17-18-19/|Odoo 20 upgrade plan]], and follow the [[blog/odoo-20-ai-accounting-step-by-step/|step-by-step guide to applying AI accounting on Odoo 20]] for the rollout sequence. The series hub covers [[blog/ai-in-accounting-guide-2026/|what AI in accounting means in practice]], and a companion piece covers [[blog/connect-ai-to-odoo-continuous-audit/|connecting AI to Odoo for continuous auditing]].' },
      { p: 'When MFT configures Odoo through our [[services/odoo-erp/|Odoo ERP implementation service]], this map is part of the design: which features are switched on, who owns their credits, and who approves their output. It is the same rule our own [[intelligence/|MFT Intelligence agents]] follow: agents draft, a named person approves, and nothing is posted automatically.' }
    ],
    faq: [
      { q: 'Do Odoo 20 AI features cost extra?', a: 'Yes. According to Odoo’s 20 release notes, all AI features require credits purchased through IAP (In-App Purchase). Credits are billed per request and are not included in any plan, so scheduled agents consume credits each time they run, whether or not they find anything useful.' },
      { q: 'Can the Odoo 20 AI assistant answer questions about my company’s finances?', a: 'Yes. AI-powered financial insights answers questions about topics such as receivables, cash flow and reconciliation issues, based solely on the accounting data in your database. It can also review suspected reconciliation errors and return findings. Its answers are only as complete as your books, so verify them against reports.' },
      { q: 'Is bill line prediction in Odoo 20 an AI feature?', a: 'The release notes list bill line prediction in the Accounting section. It suggests product, account, tax, analytic and vehicle from bill history and the bill label. Whether it consumes IAP credits should be confirmed in your own database. Either way, it repeats past coding, so predicted lines need review.' },
      { q: 'Are Odoo 20 AI agents available in Community edition?', a: 'We could not verify the edition split for AI agents from the Odoo 20 release notes. Confirm with Odoo or your implementation partner which agent capabilities your edition and plan include before you design any accounting process around them, and budget for IAP credits in either case.' },
      { q: 'How long does Odoo 20 keep AI conversations?', a: 'According to the Odoo 20 release notes, stored conversations are kept up to 30 days after the last message. If an AI answer supports a journal entry, an adjustment or a decision, copy it into the record where the approval sits, so the evidence survives after the conversation is gone.' }
    ],
    sources: [
      { label: 'Odoo, "Odoo 20 Release Notes" (official release notes, September 2026)', url: 'https://www.odoo.com/odoo-20-release-notes' }
    ]
  },
  ar: {
    slug: 'odoo-20-ai-features-accounting',
    topic: 'odoo',
    author: 'ahmed',
    reviewer: 'practice',
    image: { alt: 'رسم توضيحي: معاملات متناثرة تتدفق عبر نواة بيضاء مضيئة إلى صفحة دفتر بيضاء تُظهر شبكة تطبيقات تحمل بعض وحداتها علامة ذكاء اصطناعي، مع إضاءة وحدة واحدة باللون السماوي.' },
    date: '2026-10-14',
    title: 'ميزات الذكاء الاصطناعي في {lat}Odoo 20{/lat} للمحاسبة: خريطة ميزة بميزة',
    metaTitle: 'ميزات الذكاء الاصطناعي في Odoo 20 للمحاسبة: خريطة عملية',
    dek: 'أي ميزات الذكاء الاصطناعي في {lat}Odoo 20{/lat} تقرأ دفاترك، وأيها يغيّرها، وأيها يُحتسب لكل طلب، وما الضابط الرقابي الذي تحتاجه كل ميزة قبل التشغيل.',
    description: 'خريطة لميزات الذكاء الاصطناعي في Odoo 20 للمحاسبة: ماذا تفعل كل ميزة، وأيها يستهلك رصيد IAP، وما الضوابط التي تتغير حين يبدأ الذكاء الاصطناعي بإعداد القيود.',
    keywords: ['الذكاء الاصطناعي في أودو 20', 'ميزات Odoo 20 للمحاسبة', 'الذكاء الاصطناعي في المحاسبة', 'وكلاء الذكاء الاصطناعي في أودو', 'رصيد IAP في أودو'],
    about: ['Odoo', 'Artificial intelligence', 'Accounting', 'Internal control', 'Accounts payable'],
    answer: 'ميزات الذكاء الاصطناعي في {lat}Odoo 20{/lat} للمحاسبة هي: الرؤى المالية المدعومة بالذكاء الاصطناعي، ووكلاء ينشئون السجلات ويعدّلونها داخل الإجراءات الآلية والمجدولة، والاتصال بقاعدة البيانات عبر {lat}MCP{/lat}، والاختيار الآلي للنموذج، وكلها تُحتسب لكل طلب برصيد {lat}IAP{/lat}. وبجانبها توقّع بنود فواتير الموردين وكشف التكرار. وكل ميزة تحتاج إلى مالك وصلاحيات محدودة ومعتمِد مسمّى.',
    takeaways: [
      'كل ميزة ذكاء اصطناعي في {lat}Odoo 20{/lat} تستهلك رصيد {lat}IAP{/lat} يُحتسب لكل طلب، ولا تدخل في أي باقة.',
      'مساعد الرؤى المالية يجيب من البيانات المحاسبية الموجودة في قاعدة بياناتك فقط.',
      'الوكيل الذي ينشئ السجلات أو يعدّلها مكانه داخل مصفوفة الاعتماد، لا بجانبها.',
      'المحادثات المحفوظة تبقى {lat}30{/lat} يومًا، فاحفظ أي إجابة تدعم قيدًا في موضع آخر.'
    ],
    body: [
      { p: 'في أغلب عروض إطلاق {lat}Odoo 20{/lat}، يكتب أحدهم سؤالًا عن النقدية فتظهر الإجابة في ثوانٍ. أما المدير المالي الحاضر فيسأل عادة شيئًا أقل إثارة: أي هذه الميزات يقرأ دفتر الأستاذ، وأيها يستطيع تغييره، وأيها سيصل بفاتورة. هذه الأسئلة الثلاثة ترتّب بنود الذكاء الاصطناعي في ملاحظات إصدار {lat}Odoo 20{/lat} أفضل من أي تصنيف في القوائم، وهي نفسها الأسئلة التي سيطرحها مراجع الحسابات بعد التشغيل.' },
      { p: 'يتناول هذا المقال بنود الذكاء الاصطناعي وحدها، ومعها ميزات التوقّع المجاورة لها. وللصورة المالية الكاملة اقرأ [[blog/odoo-20-whats-new-for-finance-teams/|ما الذي يغيّره {lat}Odoo 20{/lat} لفرق المالية]]، ولحوكمة الوكلاء بوصفهم منفّذين اقرأ [[blog/odoo-20-ai-agents-finance-controls/|كيف تحكم وكلاء الذكاء الاصطناعي في {lat}Odoo 20{/lat}]]. أما الهدف هنا فأضيق: خريطة تضعها أمام قاعدة بياناتك وتراجعها ميزة بميزة.' },
      { h2: 'ما الذي يُعدّ ميزة ذكاء اصطناعي في محاسبة {lat}Odoo 20{/lat}؟' },
      { p: 'ميزة الذكاء الاصطناعي في محاسبة {lat}Odoo 20{/lat} هي أي وظيفة تستخدم نموذج ذكاء اصطناعي لتجيب عن بيانات محاسبية أو تُعدّ عليها مسودة أو تنفّذ عليها عملًا. وبحسب ملاحظات إصدار {lat}Odoo 20{/lat}، صارت كل هذه الميزات تتطلب رصيدًا يُشترى عبر {lat}IAP{/lat} ({lat}In-App Purchase{/lat})، يُحتسب لكل طلب ولا يدخل في أي باقة. وقاعدة الفوترة هذه اختبار عملي أيضًا: إن كانت الميزة تستهلك رصيدًا فعاملها كميزة ذكاء اصطناعي في الموازنة وفي الرقابة، أيًا كانت القائمة التي تظهر فيها.' },
      { p: 'تضع ملاحظات الإصدار بنود الذكاء الاصطناعي في قسمين. قسم الذكاء الاصطناعي يغطي الوكلاء والأتمتة بالوكلاء واتصال {lat}MCP{/lat} واختيار النموذج. وقسم المحاسبة يضيف الرؤى المالية المدعومة بالذكاء الاصطناعي. وبجانبها ميزات تتوقّع أو تُنبّه، مثل توقّع بنود الفاتورة وكشف التكرار، تصفها الملاحظات دون أن تسمّيها ذكاءً اصطناعيًا. أبقيناها على الخريطة لأنها تشكّل القيود نفسها، لكننا ميّزناها، ومسألة استهلاكها للرصيد يجب التحقق منها في قاعدة بياناتك.' },
      { p: 'وقبل التخطيط تبقى فجوة يجب سدّها، وهي النسخة. لم نتحقق من ملاحظات الإصدار أي قدرات الوكلاء متاحة في {lat}Enterprise{/lat} وأيها، إن وُجد، متاح في {lat}Community{/lat}. تأكد من ذلك لنسختك وباقتك قبل أن تبني أي إجراء على الوكلاء.' },
      { h2: 'أي ميزات الذكاء الاصطناعي في {lat}Odoo 20{/lat} تمس المحاسبة، وماذا تغيّر؟' },
      { p: 'الجدول التالي هو الخريطة. «تقرأ» تعني أن الميزة تطّلع على البيانات فقط. و«تُعدّ مسودة» تعني أنها تنشئ سجلات أو تغيّرها بحيث يستطيع شخص مراجعتها. و«تنفّذ» تعني أنها قد تطلق عملًا أو تُتمّه داخل أتمتة دون أن يبدأه أحد.' },
      { table: {
        caption: 'ميزات الذكاء الاصطناعي والتوقّع في {lat}Odoo 20{/lat} للمحاسبة: ماذا تفعل كل ميزة والضابط الذي تحتاجه',
        head: ['الميزة', 'ماذا تفعل (بحسب ملاحظات الإصدار)', 'الرصيد', 'الأثر على البيانات', 'الضابط المطلوب'],
        rows: [
          ['الرؤى المالية المدعومة بالذكاء الاصطناعي', 'تجيب عن الأسئلة المالية من البيانات المحاسبية في قاعدة البيانات وحدها، وتراجع أخطاء التسوية المشتبه بها', 'نعم، لكل طلب', 'تقرأ', 'المطابقة مع التقرير قبل أي قرار أو قيد'],
          ['الأتمتة بالوكلاء', 'وكلاء تطلقهم الإجراءات الآلية والمجدولة، مع عرض معالجة الأخطاء', 'نعم، مع كل طلب يطلقه المحفز', 'تنفّذ', 'مالك لكل محفز، ومراجعة شهرية للرصيد'],
          ['إنشاء الوكلاء للسجلات', 'إنشاء سجلات، منها ما يُنشأ من ملف تعليمات مرفوع مثل {lat}PDF{/lat}', 'نعم', 'تُعدّ مسودة', 'مسودة يعتمدها غير صاحب التعليمة'],
          ['تعديل الوكلاء للسجلات', 'تعديل سجلات قائمة، وإعادة معالجة المصادر يدويًا', 'نعم', 'مسودة أو تنفيذ حسب الصلاحيات', 'صلاحيات دنيا، ومراجعة التغييرات'],
          ['الردود التفاعلية وحد استدعاء الأدوات', 'طلبات الإذن بأزرار، والوكيل يستأذن قبل تجاوز حد استدعاء الأدوات', 'نعم', 'بوابة', 'تحديد من يمنح الإذن'],
          ['اتصال {lat}MCP{/lat}', 'ربط أدوات خارجية بقاعدة البيانات', 'يُتحقق منه', 'قراءة أو كتابة حسب الصلاحيات', 'مستخدم مخصص وصلاحيات محدودة ووصول مسجَّل'],
          ['الاختيار الآلي للنموذج', 'تختار المزوّد ويختار {lat}Odoo{/lat} النموذج', 'لم تُذكر تكلفة منفصلة', 'لا أثر مباشر', 'توثيق المزوّد، وتوقّع تغيّر الإجابات'],
          ['المحادثات المحفوظة', 'تُحفظ حتى {lat}30{/lat} يومًا بعد آخر رسالة', 'لا ينطبق', 'احتفاظ', 'حفظ الدليل في سجل الاعتماد'],
          ['إعادة تسمية الملفات بالذكاء الاصطناعي (المستندات)', 'تسمية الملفات بالذكاء الاصطناعي', 'نعم', 'تغيير بيانات وصفية', 'فحص عيّنة مقابل الأصل'],
          ['توقّع بنود الفاتورة (المحاسبة)', 'اقتراح الحساب والضريبة والتوزيع التحليلي وغيرها من تاريخ الفواتير', 'يُتحقق منه', 'تُعدّ مسودة', 'مراجعة الحساب والضريبة'],
          ['كشف التكرار (المحاسبة)', 'أحمر للتكرار المرجّح، وأصفر للتكرار المحتمل', 'يُتحقق منه', 'تُنبّه', 'سبب مكتوب لأي تجاوز للأحمر']
        ]
      } },
      { h2: 'ماذا يعرف المساعد الذكي فعلًا عن مالية شركتك؟' },
      { p: 'ملاحظات الإصدار دقيقة في النقطة الأهم للمحاسب: مساعد الرؤى المالية يجيب استنادًا إلى البيانات المحاسبية في قاعدة بياناتك وحدها. هذه قوة، لأن الإجابة مربوطة بدفاترك لا بمعرفة عامة. وهي أيضًا الحدّ. فإن كانت حركات البنك غير مسوّاة، أو حُمّلت فاتورة على حساب خطأ، أو لم تُرحَّل مستحقات الشهر بعد، فسيجيب المساعد من الدفاتر كما هي، ولن يخبرك بما ينقصها.' },
      { p: 'قبل أن يستشهد به أحد في اجتماع الإدارة، اختبره على فترة أقفلتها بالفعل:' },
      { ol: [
        'اختر شهرًا مقفلًا ومسوّى ومراجَعًا، ومحميًا بتاريخ الإقفال المعتاد لديك.',
        'اكتب خمسة أسئلة إجاباتها لديك في كشوف موقّعة، مثل الذمم المدينة المتأخرة أكثر من {lat}90{/lat} يومًا والبنود البنكية غير المسوّاة في نهاية الشهر.',
        'اطرح كل سؤال مع ذكر الفترة والشركة صراحة، وسجّل الإجابة والتاريخ ومن سأل.',
        'قارن كل إجابة بالكشف الموقّع، وصنّف كل فرق: صياغة، أو نطاق (تاريخ أو تصفية أو شركة مختلفة)، أو جوهر.',
        'اطلب منه مراجعة أخطاء التسوية المشتبه بها في ذلك الشهر، وطابق كل نتيجة مع [[blog/odoo-20-bank-reconciliation-and-bill-payments/|تقرير ملخص التسوية البنكية في {lat}Odoo 20{/lat}]].',
        'اكتب مذكرة استخدام من صفحة واحدة: الأسئلة التي يجيبها بموثوقية، وما يحتاج مطابقة مع تقرير، وما لا ينبغي أن يُسأل عنه أصلًا.'
      ] },
      { p: 'الفرق الجوهري ليس سببًا لإيقاف الميزة، بل سبب لمعرفة أين تنتهي حدودها، ولكتابة هذه الحدود قبل أول إقفال مزدحم.' },
      { h2: 'كيف يُعدّ وكلاء {lat}Odoo 20{/lat} السجلات المحاسبية ويغيّرونها؟' },
      { p: 'هنا ينتقل الذكاء الاصطناعي من الإجابة إلى التنفيذ. بحسب ملاحظات الإصدار، يستطيع الوكلاء إنشاء السجلات، ومنها ما يُنشأ من ملف تعليمات مرفوع مثل {lat}PDF{/lat}، وتعديل السجلات، وإعادة معالجة المصادر يدويًا، وعرض التقدم مباشرة، والعمل داخل الإجراءات الآلية والمجدولة. ويمكن أن يصبح الوكيل الافتراضي لنموذج بعينه، وأن يتلقى التعليمات بالإملاء الصوتي، وهذا يجعل الأثر المكتوب لمن طلب ماذا أهم من قبل.' },
      { p: 'تحقق في قاعدة بياناتك تحت أي مستخدم وبأي صلاحيات يعمل الوكيل. بعدها يساعدك تغييران في {lat}Odoo 20{/lat}. ألغيت قواعد السجلات ({lat}Record rules{/lat}) وصار النطاق يُضبط مباشرة على صلاحية الوصول، فصار ما يراه المستخدم ويغيّره محددًا في موضع واحد. وتغييرات مجموعات المستخدم تُسجَّل في سجل المحادثة ({lat}Chatter{/lat}) الخاص به، فيبقى أثر لمن وسّع الصلاحيات. والأمران جزء من مراجعة [[blog/ai-segregation-of-duties-internal-controls/|وكلاء الذكاء الاصطناعي داخل الفصل بين المهام]].' },
      { p: 'قاعدتنا في القرار قصيرة: إن كان ناتج الوكيل يمكن أن يصل إلى دفتر الأستاذ العام أو إلى دفعة أو إلى البيانات الأساسية للموردين، يبقى مسودة ويعتمده شخص مسمّى. أزرار الإذن التفاعلية في {lat}Odoo 20{/lat} مفيدة، لكن ضغطة من الشخص نفسه الذي أعطى التعليمة ليست اعتمادًا مستقلًا.' },
      { quote: 'الرصيد يدفع ثمن الإجابة، ولا يدفع ثمن المراجعة، والمراجعة هي الضابط.' },
      { h2: 'ماذا يعني الرصيد ومدة حفظ المحادثات للإدارة المالية؟' },
      { p: 'لأن كل طلب ذكاء اصطناعي يُحتسب عبر {lat}IAP{/lat} ولا يدخل أي طلب في باقة، تتصرف تكلفة الذكاء الاصطناعي كفاتورة مرافق لا كترخيص. الوكيل المجدول يستهلك رصيدًا سواء وجد شيئًا أم لا. ضع الموازنة حسب المحفز لا حسب المستخدم: اكتب كل إجراء آلي أو مجدول يستدعي وكيلًا مع تكراره، وقارن الاستهلاك الفعلي بهذه القائمة كل شهر. والاستهلاك الذي لا تستطيع ردّه إلى القائمة يدل على محفز بلا مالك.' },
      { p: 'والاختيار الآلي للنموذج يعني أن النموذج وراء الإجابة قد يتغير دون أي تعديل في إعداداتك، فوثّق المزوّد في سياسة الذكاء الاصطناعي ولا تنتظر إجابات متطابقة في تواريخ مختلفة. والمحادثات المحفوظة تبقى حتى {lat}30{/lat} يومًا بعد آخر رسالة. فإن دعمت محادثةٌ قيدًا أو قرارًا، فانسخ الإجابة المعنية إلى سجل الاعتماد على القيد نفسه، واقرأ ما كتبناه عن [[blog/ai-audit-trail-zero-hallucination/|مسار التدقيق لمخرجات الذكاء الاصطناعي]] قبل أن تعامل أي محادثة كدليل.' },
      { h2: 'أي الميزات تتوقّع ولا تستنتج، ولماذا يهم ذلك؟' },
      { p: 'توقّع بنود الفاتورة وكشف التكرار موجودان في قسم المحاسبة من ملاحظات الإصدار. وهما يشكّلان القيود بقدر ما يشكّلها أي وكيل، فمكانهما المراجعة نفسها.' },
      { h3: 'توقّع بنود الفاتورة' },
      { p: 'عند إدخال فاتورة مورد يدويًا أو باستيرادها، يقترح {lat}Odoo{/lat} المنتج والحساب والضريبة والتوزيع التحليلي والمركبة من تاريخ فواتير المورد ومن الوصف. والتوقّع من التاريخ يكرر التاريخ بأخطائه. فإن ظلت فواتير مورد ما تُحمّل على حساب مصروف خطأ طوال سنة، فسيقترح النظام الحساب نفسه بثقة. اختبره على موردين صحّحت توجيههم المحاسبي مؤخرًا. ولمسار القيود الأوسع اقرأ [[blog/ai-journal-entries-bank-reconciliation/|أتمتة قيود اليومية والتسوية البنكية بالذكاء الاصطناعي]].' },
      { h3: 'كشف التكرار والدفعات المعلّقة' },
      { p: 'الأحمر يعلّم فاتورة مكررة على الأرجح، والأصفر احتمال تكرار، ومعالج الدفع يكتشف الدفعات المعلّقة ليمنع سداد الفاتورة نفسها مرتين. ولا يصبح التحذير ضابطًا إلا إذا سُجّل تجاوزه. حدد من يحق له تجاوز التحذير الأحمر، واشترط سببًا مكتوبًا على الفاتورة.' },
      { h2: 'ماذا يفعل الفريق المالي يوم الاثنين؟' },
      { ol: [
        'احصر كل ميزة ذكاء اصطناعي مفعّلة في قاعدة بياناتك مستخدمًا الجدول أعلاه كقائمة فحص، وتأكد مما هو متاح في نسختك وباقتك.',
        'سمِّ مالكًا واحدًا لرصيد {lat}IAP{/lat}، ومعتمِدًا لكل وكيل يستطيع إنشاء سجلات محاسبية أو تعديلها.',
        'نفّذ اختبار الشهر المقفل على مساعد الرؤى المالية واكتب مذكرة الاستخدام.',
        'راجع صلاحيات كل مستخدم أو اتصال يستخدمه الوكلاء أو {lat}MCP{/lat}، واقرأ سجل المحادثة بحثًا عن تغييرات حديثة في المجموعات.',
        'خذ عينة من {lat}20{/lat} بندًا متوقَّعًا في فواتير الموردين، ومن كل تحذير أحمر تم تجاوزه في الشهر الماضي.',
        'حدد أين تُحفظ إجابات الذكاء الاصطناعي التي تدعم القيود، حتى يبقى الدليل بعد انقضاء مدة الثلاثين يومًا.'
      ] },
      { p: 'وإن كنت ما زلت تخطط للانتقال، فأدرج هذه الفحوص في [[blog/odoo-20-upgrade-plan-17-18-19/|خطة الترقية إلى {lat}Odoo 20{/lat}]]، واتبع [[blog/odoo-20-ai-accounting-step-by-step/|الدليل العملي لتطبيق المحاسبة بالذكاء الاصطناعي على {lat}Odoo 20{/lat}]] في ترتيب التنفيذ. وللصورة الأوسع ابدأ من المقال المحوري للسلسلة عن [[blog/ai-in-accounting-guide-2026/|الذكاء الاصطناعي في المحاسبة كما يُمارَس فعلًا]]. وإن كنت تنوي ربط طبقة تحليل خارجية بالدفاتر، فاقرأ [[blog/connect-ai-to-odoo-continuous-audit/|ربط الذكاء الاصطناعي بـ{lat}Odoo{/lat} للمراجعة المستمرة]].' },
      { p: 'وحين تُعدّ {lat}MFT{/lat} نظام {lat}Odoo{/lat} لعملائها من خلال [[services/odoo-erp/|خدمة تطبيق {lat}Odoo ERP{/lat}]]، تكون هذه الخريطة جزءًا من التصميم: أي الميزات تُفعَّل، ومن يملك رصيدها، ومن يعتمد مخرجاتها. وهي القاعدة نفسها التي يعمل بها [[intelligence/|وكلاء {lat}MFT Intelligence{/lat}]]: الوكيل يُعدّ المسودة، وشخص مسمّى يعتمد، ولا يُرحَّل شيء آليًا.' }
    ],
    faq: [
      { q: 'هل ميزات الذكاء الاصطناعي في {lat}Odoo 20{/lat} بتكلفة إضافية؟', a: 'نعم. بحسب ملاحظات إصدار {lat}Odoo 20{/lat}، تتطلب كل ميزات الذكاء الاصطناعي رصيدًا يُشترى عبر {lat}IAP{/lat}، يُحتسب لكل طلب ولا يدخل في أي باقة. لذلك يستهلك الوكيل المجدول رصيدًا في كل مرة يعمل فيها، سواء وجد ما يستحق العمل أم لم يجد.' },
      { q: 'هل يستطيع المساعد الذكي في {lat}Odoo 20{/lat} الإجابة عن أسئلة مالية شركتي؟', a: 'نعم. ميزة الرؤى المالية تجيب عن موضوعات مثل الذمم المدينة والتدفق النقدي ومشكلات التسوية، استنادًا إلى البيانات المحاسبية في قاعدة بياناتك وحدها، ويمكنها مراجعة أخطاء التسوية المشتبه بها. لكن إجاباتها لا تكتمل إلا بقدر اكتمال دفاترك، فطابقها مع التقارير.' },
      { q: 'هل توقّع بنود الفاتورة في {lat}Odoo 20{/lat} ميزة ذكاء اصطناعي؟', a: 'تدرج ملاحظات الإصدار توقّع بنود الفاتورة في قسم المحاسبة، وهو يقترح المنتج والحساب والضريبة والتوزيع التحليلي والمركبة من تاريخ فواتير المورد ووصف الفاتورة. أما استهلاكه لرصيد {lat}IAP{/lat} فيُتحقق منه في قاعدة بياناتك. وفي الحالتين هو يكرر التوجيه السابق، فالبنود المتوقَّعة تحتاج مراجعة.' },
      { q: 'هل وكلاء الذكاء الاصطناعي في {lat}Odoo 20{/lat} متاحون في نسخة {lat}Community{/lat}؟', a: 'لم نتمكن من التحقق من توزيع قدرات الوكلاء بين النسختين من ملاحظات إصدار {lat}Odoo 20{/lat}. تأكد من {lat}Odoo{/lat} أو من شريك التطبيق لديك مما تشمله نسختك وباقتك قبل أن تبني أي إجراء محاسبي على الوكلاء، وضع رصيد {lat}IAP{/lat} في الموازنة في الحالتين.' },
      { q: 'كم يحتفظ {lat}Odoo 20{/lat} بمحادثات الذكاء الاصطناعي؟', a: 'بحسب ملاحظات إصدار {lat}Odoo 20{/lat}، تُحفظ المحادثات حتى {lat}30{/lat} يومًا بعد آخر رسالة. فإن دعمت إجابةٌ من الذكاء الاصطناعي قيد يومية أو تسوية أو قرارًا، فانسخها إلى السجل الذي يحمل الاعتماد، حتى يبقى الدليل بعد زوال المحادثة.' }
    ],
    sources: [
      { label: '{lat}Odoo{/lat}، ملاحظات الإصدار الرسمية {lat}"Odoo 20 Release Notes"{/lat} (سبتمبر {lat}2026{/lat})', url: 'https://www.odoo.com/odoo-20-release-notes' }
    ]
  }
};
