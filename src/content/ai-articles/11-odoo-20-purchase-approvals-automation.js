// 11. Odoo 20 purchase approvals: automate the matrix, keep the control
module.exports = {
  en: {
    slug: 'odoo-20-purchase-approvals-automation',
    topic: 'odoo',
    author: 'ahmed',
    reviewer: 'practice',
    date: '2026-10-14',
    title: 'Odoo 20 purchase approvals: automate the matrix, keep the control',
    metaTitle: 'Odoo 20 purchase approvals and automation',
    dek: 'Thresholds, the Approvals app, automation rules and AI drafting in Odoo 20, mapped to an approval matrix you can defend in an audit.',
    description: 'Automate Odoo 20 purchase approvals with an approval matrix, PO approval threshold, Approvals app and automation rules, and keep AI agents to drafting.',
    keywords: ['Odoo 20 purchase approval', 'Odoo purchase order approval threshold', 'Odoo approval matrix', 'Odoo Approvals app purchasing', 'Odoo automation rules purchasing', 'AI in procurement approvals'],
    about: ['Odoo', 'Purchase order approval', 'Approval matrix', 'Business process automation', 'Artificial intelligence'],
    answer: 'To automate purchase approvals in Odoo 20, write the approval matrix first, then map each row to a mechanism: the Purchase Order Approval setting for order thresholds, the Approvals app for categories and several approvers, and automation rules with activity plans for vendor changes. Let AI agents draft records only, and test every month for split orders and bypasses.',
    takeaways: [
      'Design the approval matrix on paper, with tiers taken from materiality, before changing any setting.',
      'Use blocking mechanisms where cash is at stake and activities where data is at stake.',
      'Odoo 20 changes purchasing comparisons, dates and bill matching, not the approval settings.',
      'An AI agent drafts purchasing records; its user never sits in an approver group.'
    ],
    body: [
      { p: 'The purchase approval that fails most often is the one configured on the wrong document. A manager’s validation is set on orders above a threshold, and the threshold quietly becomes a target: two orders just below it instead of one above it, a bill entered with no order at all, a vendor’s bank account changed by the same person who releases payments. Approvals outside the approval matrix are a recurring finding in our continuous-audit work, and few involve a broken setting.' },
      { p: 'Odoo 20 adds AI agents that run from automated actions, and several purchasing and payables improvements. Neither replaces the approval matrix. Here is how to build that matrix into Odoo 20 so that automation routes, AI drafts, and the evidence of who approved what survives an audit.' },
      { h2: 'What is purchase approval automation in Odoo 20?' },
      { p: 'Purchase approval automation is the set of ERP rules that routes each purchase request, order, bill and vendor change to an authorised approver by amount, category and risk, holds the next step until approval is recorded, and keeps that record as evidence. Automation routes and blocks; a person decides. There are three layers:' },
      { ul: [
        'The rule: who may approve what, up to which tier, independent of whom. Finance owns it.',
        'The mechanism: the Odoo setting, app or automation that applies the rule to a document.',
        'The evidence: the chatter entry, approval record, activity or signature showing a named person applied the rule on a date.'
      ] },
      { h2: 'How do you build the approval matrix before configuring anything?' },
      { p: 'Start from events, not screens. A purchase cycle has six events that can need approval: the need, the commitment, the receipt, the bill, a vendor master change, and the payment. For each, decide the trigger, the approver, and whose work that approver must be independent of. Set the amount tiers from your planning materiality, as discussed in [[blog/materiality-isa-320-threshold/|setting a materiality threshold under ISA 320]], rather than from round numbers chosen at go-live.' },
      { table: {
        caption: 'Purchase approval matrix: event, trigger, approver and Odoo mechanism',
        head: ['Event', 'Approval trigger', 'Approver (independent of)', 'Odoo mechanism to confirm in your 20 database', 'Evidence kept'],
        rows: [
          ['Non-routine request', 'Spend outside replenishment rules', 'Budget owner (not the requester)', 'Approvals app category (Enterprise)', 'Approval record'],
          ['Purchase order, tier 1', 'Order total above the first tier', 'Purchasing manager (not the buyer)', 'Purchase Order Approval setting', 'Validation in the order chatter'],
          ['Purchase order, tier 2', 'Above the second tier, capital spend, or new vendor', 'Finance manager (second approver)', 'Approvals app, or automation rule triggering an activity plan', 'Approval record or completed activity'],
          ['Vendor creation or bank change', 'Every change', 'Finance reviewer (not purchasing, not payments)', 'Automation rule triggering a review activity plan', 'Completed activity, vendor chatter'],
          ['Vendor bill', 'No order, or outside tolerance', 'Payables lead (not the buyer)', 'Bill control on received quantities, order matching, duplicate warnings', 'Match summary, resolved warning'],
          ['Payment', 'Every batch', 'Treasury approver (not the payables clerk)', 'Payment rights limited to a named group', 'Payment record and bank confirmation']
        ]
      } },
      { p: 'Two rules make the matrix hold. The approver is independent of the work approved, as covered in [[blog/segregation-of-duties-odoo/|segregation of duties in Odoo]] and, once agents act in the system, of [[blog/ai-segregation-of-duties-internal-controls/|AI agents inside segregation of duties]]. And every row names its evidence: an approval nobody can show did not happen.' },
      { h2: 'Which Odoo mechanism should carry which approval?' },
      { p: 'These are long-standing features; confirm each one’s behaviour in your own Odoo 20 database and edition.' },
      { h3: 'The Purchase Order Approval setting' },
      { p: 'In recent Odoo versions, the Purchase settings include an order approval option: orders above an amount you set need a manager’s validation before confirmation. It sits on the document, which makes it good evidence. Its limits are clear: one amount for all categories, one level, and nothing that stops a split order or a bill without an order.' },
      { h3: 'The Approvals app' },
      { p: 'In recent Odoo versions, the Approvals app (Enterprise) lets you define approval categories with their approvers, for example capital purchases or a first order with a new vendor. It suits requests before an order and cases needing several approvers. Odoo’s 20 release notes contain no Approvals app section, so expect it to behave as before, and test it anyway.' },
      { h3: 'Automation rules, activity plans and Sign' },
      { p: 'According to Odoo’s 20 release notes, automation rules can now trigger activity plans, and Sign supports automated signature requests with fixed and role-based signers, sent from activities or activity plans, with Arabic script supported. A practical use: a vendor bank account change triggers a plan with a finance review, a call-back on a known number, and a signed confirmation. An activity does not by itself block the next step; where a step must be blocked, use a mechanism that blocks, or a small documented customisation.' },
      { p: 'The decision rule we apply: use a blocking mechanism where cash is at stake, an activity where data is at stake, and a signature where an external or legal acknowledgement is needed.' },
      { h2: 'What does Odoo 20 change in purchasing and payables?' },
      { p: 'Odoo’s 20 release notes list no change to purchase approval settings. The Purchase changes concern comparison, dates and cost, and several improve what an approver sees:' },
      { ul: [
        'An alternatives comparison screen: evidence that alternatives were considered above your upper tier.',
        'An editable expected arrival date that keeps the vendor’s original date for on-time rates, and recomputed arrival when the deadline has passed.',
        'A vendor quality rate based on quality checks.',
        'Sections and notes in purchase agreements and blanket orders, totals on order sections, and a default Incoterm per vendor.'
      ] },
      { p: 'In payables, the release notes add purchase order matching improvements (auto-complete, a match summary and unmatch), matching rules with payment tolerance, red and yellow duplicate warnings, and a payment wizard that detects pending payments. Treat unmatch as a control point: restrict it and review its use monthly. Two access changes also matter: record rules are removed and the domain is set on the access right itself, and user group changes are logged in the user’s chatter, so re-check every approver group after the upgrade. The wider picture is in [[blog/odoo-20-whats-new-for-finance-teams/|Odoo 20 for finance teams]], and the matching logic in [[blog/three-way-match-purchase-controls/|the three-way match]].' },
      { h2: 'Where does AI fit in purchasing approvals?' },
      { p: 'AI drafts; approval stays human. According to Odoo’s 20 release notes, agents can be triggered by automated and scheduled actions, create records (including from an uploaded instruction file such as a PDF), update records, ask permission through buttons, and ask before exceeding their tool call limit. Bill line prediction suggests product, account, tax and analytic from bill history and the label. All AI features need IAP credits billed per request; confirm which agent features your edition and plan include. The release notes describe no purchasing-specific agent.' },
      { ul: [
        'Drafting a request for quotation from a vendor’s quotation file: it stays in draft, the buyer reviews it, and the matrix applies as for any order.',
        'A scheduled agent drafting a weekly list of orders close to a tier, by vendor: useful only if each line cites the orders it read.',
        'Bill line prediction: track how often reviewers change suggested accounts, and keep review mandatory until that rate is stable and low.'
      ] },
      { p: 'The agent’s user must never sit in an approver group, the principle behind [[blog/agents-draft-people-approve/|agents draft, people approve]]. For every AI item and its credit model, see [[blog/odoo-20-ai-features-accounting/|the Odoo 20 AI feature map for accounting]].' },
      { h2: 'How do you test that approvals are not being bypassed?' },
      { p: 'ACFE’s 2026 Report to the Nations found that more than half of fraud cases involved a lack of internal controls or an override of existing ones. A purchase matrix is overridden in predictable ways, each leaving a trace in the ledger. Run these tests on the full population, not a sample, as explained in [[blog/full-population-testing-ai-vs-sampling/|moving from sampling to full-population testing]]:' },
      { ol: [
        'Split orders: group confirmed orders by vendor within a short window, such as seven days, and flag groups whose combined total crosses a tier while each order stays below it.',
        'Bills without orders for vendors or products that normally go through purchasing.',
        'Orders created or confirmed after the date of the bill they support.',
        'Approver equals requester or buyer on the same order.',
        'A vendor bank change followed by a payment before the review activity was completed.',
        'Bills unmatched and rematched, and red duplicate warnings overridden without a recorded reason.'
      ] },
      { p: 'A worked example of the first test: if the first tier is T, three orders to one vendor within five days, each at 90% of T, will pass the setting individually and represent 270% of T together. The setting worked; the matrix did not.' },
      { quote: 'An approval limit that is never tested for splitting becomes a price list for avoiding approval.' },
      { h2: 'Where should you start on Monday?' },
      { ol: [
        'Export users and groups, and list who can confirm orders, validate bills, change vendors and release payments.',
        'Write the matrix on one page, with tiers derived from materiality, and have finance sign it.',
        'Map each row to a mechanism and mark it as blocking or reminder.',
        'Configure it in a test database and run the bypass tests on last quarter’s data.',
        'Only then add AI drafting, with a named owner for IAP credits and approvers outside the agent’s group.'
      ] },
      { p: 'This sequence fits the wider rollout in [[blog/odoo-20-ai-accounting-step-by-step/|applying AI accounting on Odoo 20 step by step]], and the tests can run continuously once you [[blog/connect-ai-to-odoo-continuous-audit/|connect AI to Odoo for continuous auditing]]. In our [[services/odoo-erp/|Odoo ERP implementations]], the matrix is signed before users are created. seg-audit, our continuous audit platform, reads the books read-only and scores every transaction by risk; approvals outside the matrix are among the patterns it surfaces. A Procurement agent is in internal validation within [[intelligence/|MFT Intelligence]]; like all our agents, it drafts and a named person approves.' }
    ],
    faq: [
      { q: 'Does Odoo 20 have purchase order approval?', a: 'In recent Odoo versions, the Purchase settings include an order approval option where orders above a set amount need a manager’s validation before confirmation. Odoo’s 20 release notes list no change to it, so it should behave as before, but confirm the setting and its effect in your own Odoo 20 database before go-live.' },
      { q: 'Can Odoo handle multi-level purchase approvals?', a: 'The built-in order approval setting has one amount and one level. For several tiers or approvers, recent Odoo versions offer the Approvals app in Enterprise with approval categories, and automation rules that can trigger activity plans. Where a step must be blocked rather than reminded, test the behaviour or use a small documented customisation.' },
      { q: 'Is there an AI agent for purchasing in Odoo 20?', a: 'Odoo’s 20 release notes describe general AI agents that can create and update records and run from automated or scheduled actions, but no agent specific to purchasing. You can configure an agent to draft purchasing records, provided the output stays in draft and a person outside the agent’s group approves it.' },
      { q: 'How do you stop purchase order splitting in Odoo?', a: 'A threshold alone cannot stop it, because each split order is below the limit. Group confirmed orders by vendor within a short window and flag groups whose combined total crosses a tier. Run the test monthly on the full population, and review flagged groups with the approver who should have seen them.' },
      { q: 'Do AI features in Odoo 20 cost extra?', a: 'Yes. According to Odoo’s 20 release notes, all AI features require credits bought through In-App Purchase, billed per request and not included in any plan. Agents triggered on a schedule consume credits each time they run, so name an owner for the credit balance and review consumption by agent every month.' }
    ],
    sources: [
      { label: 'Odoo, "Odoo 20 Release Notes" (September 2026)', url: 'https://www.odoo.com/odoo-20-release-notes' },
      { label: 'ACFE, "Occupational Fraud 2026: A Report to the Nations" (press release, 19 May 2026)', url: 'https://www.acfe.com/about-the-acfe/newsroom-for-media/press-releases/press-release-detail?s=report-to-the-' }
    ]
  },
  ar: {
    slug: 'odoo-20-purchase-approvals-automation',
    topic: 'odoo',
    author: 'ahmed',
    reviewer: 'practice',
    date: '2026-10-14',
    title: 'اعتمادات المشتريات في {lat}Odoo 20{/lat}: أتمتة المصفوفة دون التفريط في الرقابة',
    metaTitle: 'اعتمادات المشتريات في {lat}Odoo 20{/lat} وأتمتتها',
    dek: 'حدود اعتماد أوامر الشراء وتطبيق الموافقات وقواعد الأتمتة وصياغة المسودات بالذكاء الاصطناعي في {lat}Odoo 20{/lat}، مربوطة بمصفوفة اعتماد تصمد أمام المراجعة.',
    description: 'كيف تؤتمت اعتمادات المشتريات في Odoo 20 بمصفوفة اعتماد وحد لاعتماد أمر الشراء وتطبيق الموافقات وقواعد الأتمتة، مع قصر وكلاء الذكاء الاصطناعي على إعداد المسودات.',
    keywords: ['اعتماد أوامر الشراء في أودو', 'مصفوفة الصلاحيات والاعتماد للمشتريات', 'أتمتة المشتريات في {lat}Odoo 20{/lat}', 'تطبيق الموافقات في أودو', 'الذكاء الاصطناعي في المشتريات'],
    about: ['{lat}Odoo{/lat}', 'اعتماد أوامر الشراء', 'مصفوفة الاعتماد', 'أتمتة العمليات', 'الذكاء الاصطناعي'],
    answer: 'لأتمتة اعتمادات المشتريات في {lat}Odoo 20{/lat} اكتب مصفوفة الاعتماد أولًا، ثم اربط كل سطر فيها بآلية: إعداد اعتماد أمر الشراء لحدود القيمة، وتطبيق الموافقات للفئات وتعدد المعتمِدين، وقواعد الأتمتة مع خطط الأنشطة لتغييرات بيانات الموردين. واجعل وكلاء الذكاء الاصطناعي يعدّون المسودات فقط، واختبر شهريًا تجزئة الأوامر والالتفاف على الاعتماد.',
    takeaways: [
      'صمّم مصفوفة الاعتماد على الورق، بمستويات مشتقة من الأهمية النسبية، قبل تغيير أي إعداد.',
      'استخدم آلية مانعة حيث يكون النقد معرضًا للخطر، ونشاطًا للمتابعة حيث تكون البيانات هي المعرضة.',
      'يغيّر {lat}Odoo 20{/lat} شاشات المقارنة والتواريخ ومطابقة الفواتير في المشتريات، لا إعدادات الاعتماد.',
      'وكيل الذكاء الاصطناعي يعدّ سجلات الشراء، ومستخدمه لا يدخل أبدًا في مجموعة المعتمِدين.'
    ],
    body: [
      { p: 'الاعتماد الذي يفشل أكثر من غيره في المشتريات ليس الاعتماد الغائب، بل الاعتماد الموضوع على المستند الخطأ. يُضبط اعتماد المدير على أوامر الشراء فوق حد معيّن، فيتحول الحد بهدوء إلى هدف: أمران تحت الحد بدل أمر واحد فوقه، وفاتورة مورد تُسجَّل بلا أمر شراء أصلًا، وحساب بنكي لمورد يغيّره الشخص نفسه الذي يُصدر المدفوعات. والاعتمادات التي تتم خارج مصفوفة الاعتماد ملاحظة متكررة في أعمال المراجعة المستمرة لدينا، وقلّما يكون سببها إعدادًا معطّلًا.' },
      { p: 'يضيف {lat}Odoo 20{/lat} وكلاء ذكاء اصطناعي يعملون من الإجراءات الآلية، ومجموعة تحسينات في المشتريات والدائنين. لا هذا ولا ذاك يحل محل مصفوفة الاعتماد. وفيما يلي طريقة بناء المصفوفة داخل {lat}Odoo 20{/lat} بحيث توجّه الأتمتة العمل إلى المعتمِد، ويعدّ الذكاء الاصطناعي المسودة، ويبقى دليل من اعتمد ماذا صالحًا أمام المراجع.' },
      { h2: 'ما أتمتة اعتمادات المشتريات في {lat}Odoo 20{/lat}؟' },
      { p: 'أتمتة اعتمادات المشتريات هي مجموعة القواعد داخل نظام {lat}ERP{/lat} التي توجّه كل طلب شراء وأمر شراء وفاتورة مورد وتغيير في بيانات المورد إلى معتمِد مفوَّض بحسب القيمة والفئة والمخاطر، وتوقف الخطوة التالية حتى يُسجَّل الاعتماد، وتحتفظ بهذا التسجيل دليلًا. الأتمتة توجّه وتمنع، والقرار لشخص. ولها ثلاث طبقات:' },
      { ul: [
        'القاعدة: من يعتمد ماذا، وحتى أي مستوى، ومستقلًا عن من. وهي قرار سياسة تملكه الإدارة المالية.',
        'الآلية: الإعداد أو التطبيق أو قاعدة الأتمتة في {lat}Odoo{/lat} التي تطبّق القاعدة على المستند.',
        'الدليل: سطر في سجل المحادثة ({lat}chatter{/lat})، أو سجل موافقة، أو نشاط منجَز، أو توقيع، يثبت أن شخصًا مسمّى طبّق القاعدة في تاريخ محدد.'
      ] },
      { p: 'وأغلب الإخفاقات تأتي من بناء الطبقة الثانية قبل الأولى.' },
      { h2: 'كيف تبني مصفوفة الاعتماد قبل أي إعداد؟' },
      { p: 'ابدأ من الأحداث لا من الشاشات. دورة الشراء فيها ستة أحداث قد تحتاج إلى اعتماد: نشوء الحاجة، والالتزام بأمر الشراء، والاستلام، وفاتورة المورد، وتغيير البيانات الأساسية للمورد، والدفع. ولكل حدث حدّد المحفز والمعتمِد والشخص الذي يجب أن يكون المعتمِد مستقلًا عنه. واشتق مستويات القيمة من الأهمية النسبية للتخطيط، كما شرحنا في [[blog/materiality-isa-320-threshold/|تحديد حد الأهمية النسبية وفق {lat}ISA 320{/lat}]]، لا من أرقام مستديرة اختيرت يوم التشغيل.' },
      { table: {
        caption: 'مصفوفة اعتماد المشتريات: الحدث والمحفز والمعتمِد والآلية في {lat}Odoo{/lat}',
        head: ['الحدث', 'محفز الاعتماد', 'المعتمِد (مستقل عن)', 'الآلية في {lat}Odoo{/lat} (تأكد منها في قاعدة {lat}20{/lat} لديك)', 'الدليل المحفوظ'],
        rows: [
          ['طلب شراء غير اعتيادي', 'إنفاق خارج قواعد إعادة الطلب', 'صاحب الموازنة (لا طالب الشراء)', 'فئة في تطبيق الموافقات ({lat}Enterprise{/lat})', 'سجل الموافقة'],
          ['أمر شراء، المستوى الأول', 'إجمالي الأمر فوق المستوى الأول', 'مدير المشتريات (لا المشتري)', 'إعداد اعتماد أمر الشراء', 'الاعتماد في سجل محادثة الأمر'],
          ['أمر شراء، المستوى الثاني', 'فوق المستوى الثاني، أو إنفاق رأسمالي، أو مورد جديد', 'المدير المالي (معتمِد ثانٍ)', 'تطبيق الموافقات، أو قاعدة أتمتة تطلق خطة أنشطة', 'سجل موافقة أو نشاط منجَز'],
          ['إنشاء مورد أو تغيير حسابه البنكي', 'كل تغيير', 'مراجع مالي (لا المشتريات ولا المدفوعات)', 'قاعدة أتمتة تطلق خطة أنشطة للمراجعة', 'نشاط منجَز، سجل محادثة المورد'],
          ['فاتورة المورد', 'بلا أمر شراء، أو خارج حد التسامح', 'مسؤول الدائنين (لا المشتري)', 'الفوترة على الكميات المستلمة، ومطابقة أمر الشراء، وتنبيهات التكرار', 'ملخص المطابقة، والتنبيه المعالَج'],
          ['الدفع', 'كل دفعة', 'معتمِد الخزينة (لا موظف الدائنين)', 'قصر صلاحية الدفع على مجموعة مسمّاة', 'سجل الدفع وتأكيد البنك']
        ]
      } },
      { p: 'وقاعدتان تجعلان المصفوفة متماسكة. الأولى أن المعتمِد مستقل عن العمل الذي يعتمده، وهو موضوع [[blog/segregation-of-duties-odoo/|الفصل بين المهام في {lat}Odoo{/lat}]]، ومع دخول الوكلاء إلى النظام موضوع [[blog/ai-segregation-of-duties-internal-controls/|موقع وكلاء الذكاء الاصطناعي من الفصل بين المهام]]. والثانية أن لكل سطر دليله: الاعتماد الذي لا يستطيع أحد إظهاره لم يحدث في نظر المراجع.' },
      { h2: 'أي آلية في {lat}Odoo{/lat} تحمل أي اعتماد؟' },
      { p: 'الآليات التالية قديمة في {lat}Odoo{/lat}، ولكل منها وظيفة مختلفة. تأكد من سلوك كل منها في قاعدة بيانات {lat}Odoo 20{/lat} ونسختك قبل الاعتماد عليها.' },
      { h3: 'إعداد اعتماد أمر الشراء' },
      { p: 'في إصدارات {lat}Odoo{/lat} الحديثة تتضمن إعدادات المشتريات خيار اعتماد الأوامر: الأمر الذي يتجاوز مبلغًا تحدده يحتاج إلى اعتماد مدير قبل التأكيد. ميزته أنه على المستند نفسه، فهو دليل جيد. وحدوده واضحة: مبلغ واحد لكل الفئات، ومستوى واحد، ولا شيء فيه يمنع تجزئة الأمر أو تسجيل فاتورة بلا أمر.' },
      { h3: 'تطبيق الموافقات' },
      { p: 'في إصدارات {lat}Odoo{/lat} الحديثة يتيح تطبيق الموافقات ({lat}Approvals{/lat}) في نسخة {lat}Enterprise{/lat} تعريف فئات موافقة لكل منها معتمِدوها، مثل المشتريات الرأسمالية أو أول أمر مع مورد جديد. يناسب الطلبات السابقة لأمر الشراء والحالات التي تحتاج أكثر من معتمِد. ولا تتضمن ملاحظات إصدار {lat}Odoo 20{/lat} قسمًا عن هذا التطبيق، فتوقّع أن يعمل كما كان، واختبره مع ذلك.' },
      { h3: 'قواعد الأتمتة وخطط الأنشطة والتوقيع' },
      { p: 'بحسب ملاحظات إصدار {lat}Odoo 20{/lat}، صار بإمكان قواعد الأتمتة إطلاق خطط الأنشطة، ويدعم تطبيق التوقيع ({lat}Sign{/lat}) طلبات توقيع آلية بموقّعين ثابتين أو بحسب الدور، تُرسل من الأنشطة أو خطط الأنشطة، مع دعم الكتابة العربية. مثال عملي: تغيير الحساب البنكي لمورد يطلق خطة فيها مراجعة مالية، واتصال تحقق بالمورد على رقم معروف مسبقًا، وتأكيد موقّع. لكن النشاط وحده لا يوقف الخطوة التالية؛ فحيث يجب المنع استخدم آلية مانعة أو تخصيصًا صغيرًا موثقًا.' },
      { p: 'وقاعدة القرار التي نطبقها: آلية مانعة حيث النقد معرّض، ونشاط حيث البيانات معرّضة، وتوقيع حيث يلزم إقرار خارجي أو قانوني.' },
      { h2: 'ماذا يغيّر {lat}Odoo 20{/lat} في المشتريات والدائنين؟' },
      { p: 'لا تذكر ملاحظات إصدار {lat}Odoo 20{/lat} أي تغيير في إعدادات اعتماد المشتريات. تغييرات قسم المشتريات تخص المقارنة والتواريخ والتكلفة، وبعضها يحسّن ما يراه المعتمِد:' },
      { ul: [
        'شاشة لمقارنة العروض البديلة، تصلح دليلًا على النظر في بدائل للأوامر فوق المستوى الأعلى.',
        'تاريخ وصول متوقع قابل للتعديل يحتفظ بالتاريخ الأصلي للمورد لحساب نسب الالتزام بالمواعيد، وإعادة حساب موعد الوصول عند فوات الموعد النهائي.',
        'معدل جودة للمورد مبني على فحوصات الجودة.',
        'أقسام وملاحظات في اتفاقيات الشراء والأوامر الإطارية، وإجماليات لأقسام أمر الشراء، و{lat}Incoterm{/lat} افتراضي لكل مورد.'
      ] },
      { p: 'وفي الدائنين تضيف ملاحظات الإصدار تحسينات لمطابقة أوامر الشراء (إكمال تلقائي، وملخص للمطابقة، وإلغاء المطابقة)، وقواعد مطابقة بحد تسامح في السداد، وتنبيهات تكرار حمراء وصفراء، ومعالج دفع يكشف المدفوعات المعلّقة. اعتبر إلغاء المطابقة نقطة رقابية: اقصره على أشخاص محددين وراجع استخدامه شهريًا. وتغييران في الصلاحيات يهمّان هنا: أُلغيت قواعد السجلات وصار النطاق يُحدد على صلاحية الوصول نفسها، وصارت تغييرات مجموعات المستخدم تُسجَّل في سجل محادثته؛ فراجع كل مجموعة معتمِدين بعد الترقية. الصورة الأوسع في [[blog/odoo-20-whats-new-for-finance-teams/|{lat}Odoo 20{/lat} لفرق المالية]]، ومنطق المطابقة في [[blog/three-way-match-purchase-controls/|المطابقة الثلاثية]].' },
      { h2: 'أين يقع الذكاء الاصطناعي من اعتمادات المشتريات؟' },
      { p: 'الذكاء الاصطناعي يعدّ المسودة، والاعتماد يبقى بشريًا. بحسب ملاحظات إصدار {lat}Odoo 20{/lat}، يمكن إطلاق الوكلاء من الإجراءات الآلية والمجدولة، ويستطيعون إنشاء السجلات (ومنها الإنشاء من ملف تعليمات مرفوع مثل {lat}PDF{/lat}) وتحديثها، وطلب الإذن عبر أزرار، والاستئذان قبل تجاوز حد استدعاء الأدوات. وتقترح ميزة التنبؤ ببنود الفاتورة المنتج والحساب والضريبة والتوزيع التحليلي من تاريخ الفواتير ووصف البند. وكل ميزات الذكاء الاصطناعي تحتاج رصيد {lat}IAP{/lat} يُحتسب لكل طلب؛ وتأكد من ميزات الوكلاء المشمولة في نسختك وخطتك. ولا تصف ملاحظات الإصدار وكيلًا مخصصًا للمشتريات.' },
      { ul: [
        'إعداد طلب عرض سعر من ملف عرض المورد: يبقى مسودة، ويراجعه المشتري، وتنطبق عليه المصفوفة كأي أمر آخر.',
        'وكيل مجدول يعدّ أسبوعيًا قائمة بالأوامر القريبة من حد مستوى ما لكل مورد: لا قيمة لها إلا إذا أحال كل سطر إلى الأوامر التي قرأها.',
        'التنبؤ ببنود الفاتورة: تابع كم مرة يغيّر المراجع الحساب المقترح، وأبقِ المراجعة إلزامية حتى يستقر هذا المعدل عند مستوى منخفض.'
      ] },
      { p: 'ومستخدم الوكيل لا يدخل أبدًا في مجموعة المعتمِدين، وهو المبدأ الذي يقوم عليه [[blog/agents-draft-people-approve/|الوكلاء يعدّون المسودة والبشر يعتمدون]]. ولكل بنود الذكاء الاصطناعي ونموذج الرصيد راجع [[blog/odoo-20-ai-features-accounting/|خريطة ميزات الذكاء الاصطناعي في {lat}Odoo 20{/lat} للمحاسبة]].' },
      { h2: 'كيف تختبر أن الاعتماد لا يُلتف عليه؟' },
      { p: 'وجد تقرير {lat}ACFE{/lat} لعام {lat}2026{/lat} عن الاحتيال المهني أن أكثر من نصف الحالات اقترن بغياب الضوابط الرقابية أو تجاوز الضوابط القائمة. ومصفوفة المشتريات يُلتف عليها بطرق متوقعة، وكل طريقة تترك أثرًا في الدفاتر. نفّذ هذه الاختبارات على المجتمع الكامل للفترة لا على عينة، كما في [[blog/full-population-testing-ai-vs-sampling/|الانتقال من العينة إلى فحص المجتمع الكامل]]:' },
      { ol: [
        'تجزئة الأوامر: اجمع الأوامر المؤكدة لكل مورد خلال نافذة قصيرة، {lat}7{/lat} أيام مثلًا، وعلّم المجموعات التي يتجاوز مجموعها مستوى الاعتماد بينما كل أمر فيها دونه.',
        'فواتير بلا أوامر شراء لموردين أو أصناف تمر عادة عبر المشتريات.',
        'أوامر أُنشئت أو أُكدت بعد تاريخ الفاتورة التي تدعمها.',
        'تطابق المعتمِد مع طالب الشراء أو المشتري على الأمر نفسه.',
        'تغيير حساب بنكي لمورد تبعته دفعة قبل إنجاز نشاط المراجعة.',
        'فواتير أُلغيت مطابقتها ثم أعيدت، وتنبيهات تكرار حمراء تُجووزت دون سبب مسجّل.'
      ] },
      { p: 'مثال تطبيقي على الاختبار الأول: إذا كان المستوى الأول {lat}T{/lat}، فثلاثة أوامر لمورد واحد خلال خمسة أيام، كل منها عند {lat}90%{/lat} من {lat}T{/lat}، تمر من الإعداد فرادى، ومجموعها {lat}270%{/lat} من {lat}T{/lat}. الإعداد عمل كما صُمم، والمصفوفة لم تعمل.' },
      { quote: 'حد الاعتماد الذي لا يُختبر ضد التجزئة يتحول إلى قائمة أسعار للتهرب من الاعتماد.' },
      { h2: 'من أين تبدأ يوم الأحد؟' },
      { ol: [
        'صدّر المستخدمين ومجموعاتهم، واكتب من يستطيع تأكيد الأوامر، واعتماد الفواتير، وتغيير بيانات الموردين، وإصدار المدفوعات.',
        'اكتب المصفوفة في صفحة واحدة بمستويات مشتقة من الأهمية النسبية، واجعل الإدارة المالية توقّعها.',
        'اربط كل سطر بآلية، وصنّفه مانعًا أو تذكيرًا.',
        'اضبطها في قاعدة اختبار، ونفّذ اختبارات الالتفاف على بيانات الربع الماضي.',
        'بعدها فقط أضف صياغة المسودات بالذكاء الاصطناعي، مع مالك مسمّى لرصيد {lat}IAP{/lat}، ومعتمِدين من خارج مجموعة الوكيل.'
      ] },
      { p: 'هذا التسلسل جزء من الخطة الأوسع في [[blog/odoo-20-ai-accounting-step-by-step/|تطبيق المحاسبة بالذكاء الاصطناعي على {lat}Odoo 20{/lat} خطوة بخطوة]]، ويمكن أن تعمل الاختبارات باستمرار بعد [[blog/connect-ai-to-odoo-continuous-audit/|ربط الذكاء الاصطناعي بـ{lat}Odoo{/lat} للمراجعة المستمرة]]. وفي [[services/odoo-erp/|مشروعات تطبيق {lat}Odoo ERP{/lat}]] التي ننفذها تُوقَّع المصفوفة قبل إنشاء المستخدمين. ومنصتنا للمراجعة المستمرة {lat}seg-audit{/lat} تقرأ الدفاتر قراءة فقط وتقيّم كل معاملة بحسب المخاطر، والاعتمادات خارج المصفوفة من الأنماط التي تُظهرها. ووكيل المشتريات قيد التحقق الداخلي ضمن [[intelligence/|{lat}MFT Intelligence{/lat}]]، وهو مثل كل وكلائنا يعدّ المسودة ويعتمد شخص مسمّى.' }
    ],
    faq: [
      { q: 'هل في {lat}Odoo 20{/lat} اعتماد لأوامر الشراء؟', a: 'في إصدارات {lat}Odoo{/lat} الحديثة تتضمن إعدادات المشتريات خيارًا يجعل الأوامر التي تتجاوز مبلغًا محددًا تحتاج إلى اعتماد مدير قبل التأكيد. ولا تذكر ملاحظات إصدار {lat}Odoo 20{/lat} تغييرًا فيه، فالمتوقع أن يعمل كما كان، لكن تأكد من الإعداد وأثره في قاعدة بياناتك قبل التشغيل الفعلي.' },
      { q: 'هل يدعم أودو اعتماد المشتريات على أكثر من مستوى؟', a: 'إعداد اعتماد الأوامر المدمج له مبلغ واحد ومستوى واحد. ولتعدد المستويات أو المعتمِدين توفر إصدارات {lat}Odoo{/lat} الحديثة تطبيق الموافقات في نسخة {lat}Enterprise{/lat} بفئات موافقة، وقواعد أتمتة تطلق خطط أنشطة. وحيث يجب منع الخطوة لا التذكير بها، اختبر السلوك أو استخدم تخصيصًا صغيرًا موثقًا.' },
      { q: 'هل يوجد وكيل ذكاء اصطناعي للمشتريات في {lat}Odoo 20{/lat}؟', a: 'تصف ملاحظات إصدار {lat}Odoo 20{/lat} وكلاء عامين يستطيعون إنشاء السجلات وتحديثها والعمل من الإجراءات الآلية والمجدولة، دون وكيل مخصص للمشتريات. ويمكنك إعداد وكيل يجهّز مسودات سجلات الشراء، بشرط أن تبقى المخرجات مسودة وأن يعتمدها شخص من خارج مجموعة الوكيل.' },
      { q: 'كيف تمنع تجزئة أوامر الشراء في أودو؟', a: 'حد الاعتماد وحده لا يمنعها، لأن كل أمر مجزأ يقع تحت الحد. اجمع الأوامر المؤكدة لكل مورد خلال نافذة زمنية قصيرة، وعلّم المجموعات التي يتجاوز مجموعها مستوى الاعتماد. ونفّذ الاختبار شهريًا على المجتمع الكامل، وراجع المجموعات المعلَّمة مع المعتمِد الذي كان يجب أن يراها.' },
      { q: 'هل ميزات الذكاء الاصطناعي في {lat}Odoo 20{/lat} بتكلفة إضافية؟', a: 'نعم. بحسب ملاحظات إصدار {lat}Odoo 20{/lat}، تحتاج كل ميزات الذكاء الاصطناعي رصيدًا يُشترى عبر {lat}IAP{/lat}، ويُحتسب لكل طلب، ولا يدخل في أي خطة. والوكلاء الذين يعملون بجدول زمني يستهلكون الرصيد في كل تشغيل، فسمِّ مالكًا للرصيد وراجع الاستهلاك لكل وكيل شهريًا.' }
    ],
    sources: [
      { label: 'أودو، ملاحظات إصدار {lat}Odoo 20{/lat} ({lat}"Odoo 20 Release Notes", September 2026{/lat})', url: 'https://www.odoo.com/odoo-20-release-notes' },
      { label: 'جمعية فاحصي الاحتيال المعتمدين، تقرير الاحتيال المهني {lat}2026{/lat} ({lat}"Occupational Fraud 2026: A Report to the Nations", press release, 19 May 2026{/lat})', url: 'https://www.acfe.com/about-the-acfe/newsroom-for-media/press-releases/press-release-detail?s=report-to-the-' }
    ]
  }
};
