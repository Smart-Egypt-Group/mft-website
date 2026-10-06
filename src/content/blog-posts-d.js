// Blog posts batch D: Odoo 20 upgrade planning and Odoo 20 inventory valuation changes.
// Odoo 20 claims come only from Odoo's 20 release notes as summarised in the verified fact sheet.
// Same rules as blog.en.js / blog.ar.js: no client amounts, no long dashes, methodology or MFT practice only.
module.exports = {
  en: [
    {
      slug: 'odoo-20-upgrade-plan-17-18-19',
      topic: 'odoo',
      author: 'ahmed',
      date: '2026-10-03',
      title: 'Should you upgrade to Odoo 20? A plan for companies on 17, 18 and 19',
      dek: 'The right timing depends on the version you run today. The right test plan depends on the finance team, not the release notes.',
      description: 'When to upgrade to Odoo 20 from 17, 18 or 19, the risk of skipping versions, and a finance-first test plan: tie-outs, taxes, e-invoicing, parallel close.',
      answer: 'It depends on your current version. On Odoo 17, standard support was planned to end in September 2026, so plan the upgrade now. On 18, upgrade within the next twelve months. On 19, upgrade when a specific Odoo 20 feature pays for itself. Whatever the timing, test the ledger, taxes and e-invoicing before go-live.',
      takeaways: [
        'Odoo 17 has reached its planned end of standard support; start planning now.',
        'Skipping versions in one upgrade request saves time but raises testing risk.',
        'Tie out the trial balance and open items before and after the upgrade.',
        'Re-test ETA or ZATCA e-invoicing in a sandbox or pre-production before go-live.'
      ],
      body: [
        { p: 'Odoo 20 was released on 24 September 2026, and the first question we hear from finance teams is not about features. It is about timing: do we have to move, and when? The honest answer depends on which version you run today, how much custom code sits on top of it, and whether your e-invoicing integration is stable. This article sets out how we think about the decision and the test plan we use, written for the finance team that will sign off the result.' },
        { h2: 'How long is each Odoo version supported?' },
        { p: 'Odoo supports each major version for three years. According to Odoo’s 20 release notes and its published support policy, the planned end of standard support is September 2026 for 17.0, September 2027 for 18.0 and September 2028 for 19.0, which puts Odoo 20 at roughly September 2029. Community and Enterprise share one version number, so the calendar is the same for both, although what is included in each edition is not.' },
        { h2: 'What should a company on Odoo 17 do?' },
        { p: 'Plan the upgrade now. September 2026 has arrived, and running a finance system outside standard support means fixes and upgrade assistance are no longer something you can count on. That does not mean upgrading next week. It means choosing a target version, booking the test window and freezing non-essential customisation so the scope stops moving. For most companies on 17, the target will be Odoo 20 rather than 18 or 19, because it buys the longest support horizon.' },
        { h2: 'What about Odoo 18 and Odoo 19?' },
        { p: 'On 18, aim to upgrade within the next twelve months. Support is planned to run to September 2027, which leaves time for a calm project, but not for an indefinite delay that pushes the work into year-end. On 19, there is no deadline pressure until 2028. Upgrade when a specific Odoo 20 feature pays for itself, for example the inventory valuation changes or the duplicate detection on invoices and bills described in the release notes, and not simply because a new version exists.' },
        { h2: 'Can you jump straight from 17 to 20?' },
        { p: 'On Enterprise, yes. Odoo’s upgrade service can take a database across several versions in one request, for example from 17 to 20. It saves calendar time, but skipping versions raises testing risk: data is transformed through several migration steps at once, and any difference you find is harder to attribute to a single change. If you skip versions, budget more testing, not less. Community databases and custom modules need their own migration route, which is a separate conversation about code.' },
        { h2: 'What does a finance-first upgrade test plan cover?' },
        { p: 'Most upgrade tests check that screens open and buttons work. A finance-first test checks that the numbers did not move. We run the upgrade on a copy of production and test in this order:' },
        { ul: [
          'Trial balance tie-out: print the trial balance at the same date before and after, by account, and explain every difference to zero.',
          'Open items tie-out: compare open receivables, open payables and unreconciled bank lines, by partner and by document, before and after.',
          'Taxes: confirm every tax, tax grid and fiscal position survived, then rebuild the last filed VAT return from the upgraded database and compare.',
          'E-invoicing: re-test Egypt’s ETA or Saudi Arabia’s ZATCA integration in the authority’s sandbox or pre-production environment before go-live, including credit notes and rejected documents.',
          'Custom modules: list every custom module, decide to migrate, replace with standard features or retire, and test each one that touches accounting.',
          'Access rights: check that roles, approval limits and segregation of duties look the same after the upgrade as they did before it.'
        ] },
        { p: 'Expect some behaviour to change on purpose. According to Odoo’s 20 release notes, journal entries that affect bank accounts must now originate from bank transactions, which stops manual entries that break bank consistency. If your team posts bank charges or transfers by manual journal entry today, that habit has to change, and the test should prove the replacement process works.' },
        { quote: 'An upgrade is finished when the trial balance agrees, not when the login screen loads.' },
        { h2: 'Why run a parallel close of one month?' },
        { p: 'Because a close exercises everything at once: reconciliations, accruals, depreciation, inventory valuation, tax and reporting. We close one recent month in the upgraded test database, following the same month-end close checklist the team uses in production, and compare the financial statements with the ones already approved. Differences found here cost an afternoon. Differences found after go-live cost a restatement.' },
        { h2: 'How should cut-over and rollback work?' },
        { p: 'Pick a cut-over date right after a month is closed and locked, never in the middle of a period. Freeze posting, take a final backup, run the production upgrade, then repeat the trial balance and open items tie-out on the live result before users return. Agree the rollback rule in advance: who decides, by when, and what triggers it. If the tie-out fails and cannot be explained within the agreed window, you restore the backup and try again, rather than fixing the ledger by hand under pressure.' },
        { h2: 'Who should own the decision?' },
        { p: 'The finance lead, with IT and the implementation partner in support. Our Odoo implementation and upgrade team at MFT starts every upgrade with the tie-out templates above, because the people who will defend the numbers to auditors should be the ones who accept them.' }
      ],
      faq: [
        { q: 'Is Odoo 17 still supported after September 2026?', a: 'Odoo’s planned end of standard support for 17.0 is September 2026. After that date you should not rely on standard support, so companies on 17 should plan their upgrade now.' },
        { q: 'Can we upgrade from Odoo 17 directly to Odoo 20?', a: 'On Enterprise, Odoo’s upgrade service can take a database across several versions in one request. Skipping versions raises testing risk, so plan more testing, especially of the ledger, taxes and custom modules.' },
        { q: 'Do we need to re-test ETA or ZATCA e-invoicing after upgrading?', a: 'Yes. After any upgrade, re-test the e-invoicing integration in the authority’s sandbox or pre-production environment, including credit notes and rejections, before you go live.' }
      ]
    },
    {
      slug: 'odoo-20-inventory-valuation-changes',
      topic: 'odoo',
      author: 'ahmed',
      date: '2026-10-02',
      title: 'Odoo 20 inventory valuation changes: what they mean for COGS and margin',
      dek: 'Several Odoo 20 changes touch the line between inventory and cost of goods sold. Each one helps, and each one needs a control around it.',
      description: 'Odoo 20 inventory valuation changes and their effect on COGS and margin: closing accruals, retroactive COGS, landed costs, aging, and month-end controls.',
      answer: 'According to Odoo’s 20 release notes, valuation accruals can post directly to the inventory valuation account, COGS updates retroactively when a cost changes after delivery, landed costs can target individual products, and inventory can be reported at a past date. Margins become more accurate, so cost changes and period locks need tighter control.',
      takeaways: [
        'Retroactive COGS means a late cost change can move margin on goods already delivered.',
        'Landed costs per product give more precise unit costs on mixed receipts.',
        'Inventory at a past date and stock aging support month-end and audit work.',
        'Lock periods, restrict who changes costs, and reconcile stock valuation to the GL monthly.'
      ],
      body: [
        { p: 'Inventory is where gross margin is won or lost on paper. The selling price is rarely in dispute; the cost of goods sold behind it often is. Odoo 20 brings a group of changes that sit exactly on that line between inventory and COGS. This article goes through them from a finance point of view, then sets out the controls we would put around them. It assumes you already know the costing methods themselves; if not, start with our guide to FIFO and AVCO valuation in Odoo.' },
        { h2: 'What changes in perpetual valuation closing?' },
        { p: 'According to Odoo’s 20 release notes, under perpetual valuation, accrual entries affecting inventory valuation can be made from the inventory valuation closing report, and they post directly to the inventory valuation account rather than through the stock variation account. In practice this shortens the path from a closing adjustment to the balance sheet line it affects. It also means fewer intermediate balances to clear at month end, but only if the team knows the new route and stops reaching for the old one.' },
        { h2: 'How does retroactive COGS affect margin?' },
        { p: 'The release notes describe a retroactive COGS update when a cost changes after delivery. Think of a receipt valued at a provisional cost, goods delivered to a customer, and the final vendor cost arriving later. In earlier versions that difference often stayed in inventory or needed a manual correction. In Odoo 20, cost of goods sold on the delivered quantity follows the corrected cost.' },
        { p: 'For margin reporting this is better: margin reflects what the goods actually cost. For the close it is a new risk: a cost change made after a month is reported can move COGS for goods that left the warehouse in that month. That is why the period lock matters more, not less, after this change.' },
        { h2: 'What is new in landed costs?' },
        { p: 'Landed costs can now be assigned to individual products of a transfer. When one container holds several products and the freight or customs relates to only some of them, you no longer have to spread the charge across everything received. Unit costs, and therefore margins by product, become more precise. The control question is who decides the allocation and where the supporting document is kept.' },
        { h2: 'Which new reports help at month end and in audit?' },
        { p: 'According to the release notes, Odoo 20 can show inventory at a past date and adds a stock aging report. Inventory at a past date answers the question auditors ask every year: what did you hold at the balance sheet date? Stock aging shows which items have not moved, which is the starting point for a slow-moving or obsolete stock review and any write-down discussion. Neither report decides the write-down for you, but both shorten the evidence work.' },
        { h2: 'What else changes for valuation?' },
        { ul: [
          'Stock on hand and valuation can be managed without the Inventory app, which suits companies that hold some stock but do not run full warehouse operations.',
          'Suggested reordering rules propose minimum and maximum quantities from demand history, desired days of coverage and order frequency. They affect how much cash sits in stock, so treat the suggestions as proposals to approve, not settings to accept.',
          'Intercompany resupply from another company’s warehouse transfers valuation correctly, according to the release notes, which matters for groups that move stock between legal entities.'
        ] },
        { p: 'Feature availability can differ between Community and Enterprise, and much of the accounting automation remains Enterprise-only, so confirm what your edition includes before you design a process around it.' },
        { quote: 'A more accurate cost is only useful if nobody can change it after the month is reported.' },
        { h2: 'Which controls should go around these changes?' },
        { p: 'Each change above makes valuation more accurate. Each one also gives more people a way to move COGS. We recommend three controls, and we add them to the inventory section of the month-end close checklist:' },
        { ul: [
          'Period lock: lock each period once it is reported, so a retroactive cost change cannot silently alter COGS in a closed month. Changes after the lock go through a documented adjustment in the open period.',
          'Who can change costs: restrict product cost changes, landed cost allocations and valuation accruals to named roles, separate from the people who receive goods, and review a log of cost changes every month.',
          'Stock valuation to GL reconciliation: at each month end, reconcile the stock valuation report to the inventory valuation account in the general ledger, and explain every difference before the period is locked.'
        ] },
        { h2: 'Should these changes drive your upgrade?' },
        { p: 'If inventory is material to your balance sheet and margins are a board-level number, they are a fair reason to plan the move to Odoo 20, especially from an older version. Test them on a copy of your own data first, and compare COGS for a closed month before and after. Where we act as Virtual CFO at MFT, that comparison is the evidence we want before any margin report is trusted.' }
      ],
      faq: [
        { q: 'Does Odoo 20 change COGS on goods already delivered?', a: 'According to Odoo’s 20 release notes, COGS is updated retroactively when a cost changes after delivery. Lock reported periods so such changes do not alter closed months without a documented adjustment.' },
        { q: 'Can landed costs be assigned to only some products in a receipt?', a: 'Yes. According to the release notes, Odoo 20 lets you assign landed costs to individual products of a transfer, instead of spreading them across everything received.' },
        { q: 'How do we confirm inventory valuation is correct at month end?', a: 'Reconcile the stock valuation report to the inventory valuation account in the general ledger, explain every difference, and only then lock the period. Inventory at a past date helps for prior dates.' }
      ]
    }
  ],
  ar: [
    {
      slug: 'odoo-20-upgrade-plan-17-18-19',
      topic: 'odoo',
      author: 'ahmed',
      date: '2026-10-03',
      title: 'هل تنتقل إلى {lat}Odoo 20{/lat}؟ خطة للشركات على الإصدارات {lat}17{/lat} و{lat}18{/lat} و{lat}19{/lat}',
      dek: 'التوقيت المناسب يتوقف على الإصدار الذي تعمل عليه اليوم، وخطة الاختبار المناسبة يحددها فريق المالية لا ملاحظات الإصدار.',
      description: 'متى تنتقل إلى Odoo 20 من 17 أو 18 أو 19، ومخاطر تخطي الإصدارات، وخطة اختبار تبدأ بالمالية: مطابقة الأرصدة والضرائب والفوترة الإلكترونية وإقفال شهر موازٍ.',
      answer: 'يتوقف ذلك على إصدارك الحالي. على {lat}Odoo 17{/lat} كان الدعم القياسي مقررًا أن ينتهي في سبتمبر {lat}2026{/lat}، فخطّط للترقية الآن. على {lat}18{/lat} نفّذها خلال الاثني عشر شهرًا القادمة. وعلى {lat}19{/lat} انتقل حين تغطي ميزة محددة في {lat}Odoo 20{/lat} تكلفتها. وأيًّا كان التوقيت، اختبر دفتر الأستاذ والضرائب والفوترة الإلكترونية قبل التشغيل.',
      takeaways: [
        'وصل {lat}Odoo 17{/lat} إلى الموعد المقرر لنهاية دعمه القياسي، فابدأ التخطيط الآن.',
        'تخطي الإصدارات في طلب ترقية واحد يوفّر الوقت لكنه يرفع مخاطر الاختبار.',
        'طابِق ميزان المراجعة والبنود المفتوحة قبل الترقية وبعدها.',
        'أعد اختبار الفوترة الإلكترونية لدى {lat}ETA{/lat} أو {lat}ZATCA{/lat} في بيئة تجريبية أو ما قبل الإنتاج قبل التشغيل.'
      ],
      body: [
        { p: 'صدر {lat}Odoo 20{/lat} في الرابع والعشرين من سبتمبر {lat}2026{/lat}، وأول سؤال نسمعه من فرق المالية لا يتعلق بالمزايا بل بالتوقيت: هل يجب أن ننتقل، ومتى؟ الإجابة الصادقة تتوقف على الإصدار الذي تعمل عليه اليوم، وحجم الشيفرة المخصصة فوقه، ومدى استقرار ربط الفوترة الإلكترونية لديك. يعرض هذا المقال طريقتنا في اتخاذ القرار وخطة الاختبار التي نستخدمها، مكتوبة لفريق المالية الذي سيعتمد النتيجة.' },
        { h2: 'كم مدة دعم كل إصدار من {lat}Odoo{/lat}؟' },
        { p: 'يدعم {lat}Odoo{/lat} كل إصدار رئيسي ثلاث سنوات. ووفقًا لملاحظات إصدار {lat}Odoo 20{/lat} وسياسة الدعم المعلنة، فإن الموعد المقرر لنهاية الدعم القياسي هو سبتمبر {lat}2026{/lat} للإصدار {lat}17.0{/lat}، وسبتمبر {lat}2027{/lat} للإصدار {lat}18.0{/lat}، وسبتمبر {lat}2028{/lat} للإصدار {lat}19.0{/lat}، ما يضع {lat}Odoo 20{/lat} عند سبتمبر {lat}2029{/lat} تقريبًا. ويشترك إصدارا {lat}Community{/lat} و{lat}Enterprise{/lat} في رقم إصدار واحد، فالتقويم واحد لهما، وإن اختلف ما يتضمنه كل منهما.' },
        { h2: 'ماذا تفعل الشركة التي تعمل على {lat}Odoo 17{/lat}؟' },
        { p: 'تخطط للترقية الآن. لقد حلّ سبتمبر {lat}2026{/lat}، وتشغيل نظام مالي خارج الدعم القياسي يعني أن الإصلاحات والمساعدة في الترقية لم تعد أمرًا يمكن الاعتماد عليه. هذا لا يعني الترقية الأسبوع القادم، بل يعني اختيار الإصدار المستهدف، وحجز نافذة الاختبار، وتجميد التخصيصات غير الضرورية حتى يتوقف النطاق عن التمدد. ولأغلب الشركات على {lat}17{/lat} سيكون الهدف {lat}Odoo 20{/lat} لا {lat}18{/lat} ولا {lat}19{/lat}، لأنه يمنح أطول أفق للدعم.' },
        { h2: 'وماذا عن {lat}Odoo 18{/lat} و{lat}Odoo 19{/lat}؟' },
        { p: 'على {lat}18{/lat} استهدف الترقية خلال الاثني عشر شهرًا القادمة. الدعم مقرر حتى سبتمبر {lat}2027{/lat}، وهذا يترك وقتًا لمشروع هادئ، لا لتأجيل مفتوح يدفع العمل إلى نهاية السنة المالية. أما على {lat}19{/lat} فلا ضغط زمنيًا قبل {lat}2028{/lat}. انتقل حين تغطي ميزة محددة في {lat}Odoo 20{/lat} تكلفتها، مثل تغييرات تقييم المخزون أو كشف التكرار في فواتير البيع والشراء الواردَين في ملاحظات الإصدار، لا لمجرد صدور إصدار جديد.' },
        { h2: 'هل يمكن القفز مباشرة من {lat}17{/lat} إلى {lat}20{/lat}؟' },
        { p: 'على {lat}Enterprise{/lat} نعم. خدمة الترقية لدى {lat}Odoo{/lat} تستطيع نقل قاعدة البيانات عبر عدة إصدارات في طلب واحد، من {lat}17{/lat} إلى {lat}20{/lat} مثلًا. هذا يوفّر الوقت، لكن تخطي الإصدارات يرفع مخاطر الاختبار: البيانات تمر بعدة خطوات ترحيل دفعة واحدة، وأي فرق تجده يصعب نسبته إلى تغيير بعينه. إن تخطيت إصدارات فخصّص وقتًا أطول للاختبار لا أقصر. أما قواعد بيانات {lat}Community{/lat} والوحدات المخصصة فلها مسار ترحيل خاص، وهذا حديث منفصل عن الشيفرة.' },
        { h2: 'ماذا تغطي خطة اختبار تبدأ بالمالية؟' },
        { p: 'أغلب اختبارات الترقية تتحقق من أن الشاشات تفتح والأزرار تعمل. الاختبار الذي يبدأ بالمالية يتحقق من أن الأرقام لم تتحرك. نجري الترقية على نسخة من قاعدة الإنتاج ونختبر بهذا الترتيب:' },
        { ul: [
          'مطابقة ميزان المراجعة: اطبع الميزان في التاريخ نفسه قبل الترقية وبعدها، حسابًا حسابًا، وفسّر كل فرق حتى يصل إلى صفر.',
          'مطابقة البنود المفتوحة: قارن الذمم المدينة والدائنة المفتوحة وسطور البنك غير المسوّاة، لكل شريك ولكل مستند، قبل وبعد.',
          'الضرائب: تأكد من بقاء كل ضريبة وشبكة ضريبية ووضع مالي، ثم أعد بناء آخر إقرار قيمة مضافة مُقدَّم من القاعدة المُرقّاة وقارنه.',
          'الفوترة الإلكترونية: أعد اختبار الربط مع {lat}ETA{/lat} في مصر أو {lat}ZATCA{/lat} في السعودية في البيئة التجريبية أو بيئة ما قبل الإنتاج لدى الجهة قبل التشغيل، بما في ذلك الإشعارات الدائنة والمستندات المرفوضة.',
          'الوحدات المخصصة: اكتب قائمة بكل وحدة مخصصة، وقرّر ترحيلها أو استبدالها بميزة قياسية أو إلغاءها، واختبر كل وحدة تمس المحاسبة.',
          'صلاحيات الوصول: تحقق من أن الأدوار وحدود الاعتماد والفصل بين المهام بعد الترقية كما كانت قبلها.'
        ] },
        { p: 'توقّع أن يتغير بعض السلوك عمدًا. فوفقًا لملاحظات إصدار {lat}Odoo 20{/lat}، أصبحت قيود اليومية التي تمس الحسابات البنكية يجب أن تنشأ من معاملات بنكية، وهذا يمنع القيود اليدوية التي تُخل باتساق البنك. إن كان فريقك يسجّل المصروفات البنكية أو التحويلات بقيود يدوية اليوم، فهذه العادة يجب أن تتغير، ويجب أن يُثبت الاختبار أن الإجراء البديل يعمل.' },
        { quote: 'الترقية تنتهي حين يتطابق ميزان المراجعة، لا حين تظهر شاشة الدخول.' },
        { h2: 'لماذا نُجري إقفالًا موازيًا لشهر واحد؟' },
        { p: 'لأن الإقفال يختبر كل شيء دفعة واحدة: التسويات والاستحقاقات والإهلاك وتقييم المخزون والضريبة والتقارير. نُقفل شهرًا حديثًا في قاعدة الاختبار المُرقّاة، باتباع قائمة إقفال نهاية الشهر نفسها التي يستخدمها الفريق في الإنتاج، ونقارن القوائم المالية بتلك المعتمدة بالفعل. الفرق الذي يُكتشف هنا يكلّف ساعات قليلة، والفرق الذي يُكتشف بعد التشغيل يكلّف إعادة عرض.' },
        { h2: 'كيف يجب أن يتم الانتقال والتراجع؟' },
        { p: 'اختر تاريخ الانتقال بعد إقفال شهر وقفله مباشرة، لا في منتصف فترة أبدًا. أوقف الترحيل، وخذ نسخة احتياطية نهائية، ونفّذ ترقية الإنتاج، ثم كرّر مطابقة ميزان المراجعة والبنود المفتوحة على النتيجة الحية قبل عودة المستخدمين. واتفق مسبقًا على قاعدة التراجع: من يقرر، وفي أي موعد، وما الذي يستدعيه. إن فشلت المطابقة ولم يُفسَّر الفرق خلال النافذة المتفق عليها، تُستعاد النسخة الاحتياطية وتُعاد المحاولة، بدل إصلاح الدفاتر يدويًا تحت الضغط.' },
        { h2: 'من يملك القرار؟' },
        { p: 'قائد المالية، بدعم من تقنية المعلومات وشريك التنفيذ. يبدأ فريق تنفيذ وترقية {lat}Odoo{/lat} لدى {lat}MFT{/lat} كل ترقية بنماذج المطابقة السابقة، لأن من سيدافعون عن الأرقام أمام المراجعين هم من يجب أن يقبلوها.' }
      ],
      faq: [
        { q: 'هل ما زال {lat}Odoo 17{/lat} مدعومًا بعد سبتمبر {lat}2026{/lat}؟', a: 'الموعد المقرر لنهاية الدعم القياسي للإصدار {lat}17.0{/lat} هو سبتمبر {lat}2026{/lat}. بعد هذا التاريخ لا ينبغي الاعتماد على الدعم القياسي، لذا على الشركات العاملة على {lat}17{/lat} التخطيط للترقية الآن.' },
        { q: 'هل يمكن الترقية من {lat}Odoo 17{/lat} مباشرة إلى {lat}Odoo 20{/lat}؟', a: 'على {lat}Enterprise{/lat} تستطيع خدمة الترقية لدى {lat}Odoo{/lat} نقل القاعدة عبر عدة إصدارات في طلب واحد. تخطي الإصدارات يرفع مخاطر الاختبار، فخطّط لاختبار أوسع، خاصة لدفتر الأستاذ والضرائب والوحدات المخصصة.' },
        { q: 'هل نحتاج إلى إعادة اختبار الفوترة الإلكترونية لدى {lat}ETA{/lat} أو {lat}ZATCA{/lat} بعد الترقية؟', a: 'نعم. بعد أي ترقية، أعد اختبار ربط الفوترة الإلكترونية في البيئة التجريبية أو بيئة ما قبل الإنتاج لدى الجهة، بما في ذلك الإشعارات الدائنة والرفض، قبل التشغيل.' }
      ]
    },
    {
      slug: 'odoo-20-inventory-valuation-changes',
      topic: 'odoo',
      author: 'ahmed',
      date: '2026-10-02',
      title: 'تغييرات تقييم المخزون في {lat}Odoo 20{/lat}: ماذا تعني لتكلفة المبيعات وهامش الربح',
      dek: 'عدة تغييرات في {lat}Odoo 20{/lat} تقع على الحد الفاصل بين المخزون وتكلفة البضاعة المباعة. كل منها مفيد، وكل منها يحتاج إلى رقابة حوله.',
      description: 'تغييرات تقييم المخزون في Odoo 20 وأثرها على تكلفة المبيعات والهامش: استحقاقات الإقفال، والتكلفة بأثر رجعي، وتكاليف الشحن، وتقادم المخزون، ورقابة نهاية الشهر.',
      answer: 'وفقًا لملاحظات إصدار {lat}Odoo 20{/lat}، يمكن ترحيل استحقاقات التقييم مباشرة إلى حساب تقييم المخزون، وتُحدَّث تكلفة المبيعات بأثر رجعي إذا تغيرت التكلفة بعد التسليم، وتُخصَّص تكاليف الشحن والجمارك لمنتجات بعينها، ويُعرض المخزون في تاريخ سابق. يصبح الهامش أدق، فتحتاج تغييرات التكلفة وقفل الفترات إلى رقابة أشد.',
      takeaways: [
        'تحديث تكلفة المبيعات بأثر رجعي يعني أن تغيير تكلفة متأخرًا قد يحرّك هامش بضاعة سُلّمت بالفعل.',
        'تخصيص تكاليف الشحن والجمارك لكل منتج يعطي تكلفة وحدة أدق في الاستلامات المختلطة.',
        'المخزون في تاريخ سابق وتقرير تقادم المخزون يدعمان إقفال الشهر وأعمال المراجعة.',
        'اقفل الفترات، وقيّد من يغيّر التكاليف، وطابِق تقييم المخزون مع دفتر الأستاذ شهريًا.'
      ],
      body: [
        { p: 'المخزون هو المكان الذي يُكسب فيه هامش الربح أو يُخسر على الورق. سعر البيع نادرًا ما يكون محل خلاف، أما تكلفة البضاعة المباعة خلفه فكثيرًا ما تكون. يأتي {lat}Odoo 20{/lat} بمجموعة تغييرات تقع تمامًا على هذا الحد بين المخزون وتكلفة المبيعات. يتناولها هذا المقال من زاوية المالية، ثم يعرض الضوابط التي نضعها حولها. وهو يفترض أنك تعرف طرق التكلفة نفسها، وإلا فابدأ بدليلنا عن تقييم المخزون بطريقتي {lat}FIFO{/lat} و{lat}AVCO{/lat} في {lat}Odoo{/lat}.' },
        { h2: 'ما الذي يتغير في إقفال التقييم المستمر؟' },
        { p: 'وفقًا لملاحظات إصدار {lat}Odoo 20{/lat}، يمكن في التقييم المستمر إنشاء قيود استحقاق تؤثر في تقييم المخزون من تقرير إقفال تقييم المخزون، وتُرحَّل مباشرة إلى حساب تقييم المخزون بدل المرور بحساب تغيّر المخزون. عمليًا يقصر هذا الطريق بين تسوية الإقفال وبند الميزانية الذي تؤثر فيه، ويعني أرصدة وسيطة أقل تحتاج إلى تصفية في نهاية الشهر، بشرط أن يعرف الفريق المسار الجديد ويتوقف عن استخدام القديم.' },
        { h2: 'كيف يؤثر تحديث تكلفة المبيعات بأثر رجعي في الهامش؟' },
        { p: 'تصف ملاحظات الإصدار تحديثًا لتكلفة البضاعة المباعة بأثر رجعي عندما تتغير التكلفة بعد التسليم. تخيّل استلامًا قُيّم بتكلفة مبدئية، ثم سُلّمت البضاعة لعميل، ثم وصلت تكلفة المورد النهائية لاحقًا. في الإصدارات السابقة كان هذا الفرق يبقى غالبًا في المخزون أو يحتاج إلى تصحيح يدوي. أما في {lat}Odoo 20{/lat} فتتبع تكلفة المبيعات على الكمية المسلّمة التكلفة المصحّحة.' },
        { p: 'لتقارير الهامش هذا أفضل، لأن الهامش يعكس ما كلّفته البضاعة فعلًا. لكنه في الإقفال خطر جديد: تغيير تكلفة يُجرى بعد إعلان نتائج شهر قد يحرّك تكلفة مبيعات بضاعة خرجت من المستودع في ذلك الشهر. لهذا يزداد قفل الفترات أهمية بعد هذا التغيير، لا العكس.' },
        { h2: 'ما الجديد في تكاليف الشحن والجمارك؟' },
        { p: 'أصبح ممكنًا تخصيص التكاليف الإضافية لمنتجات بعينها داخل عملية النقل. فحين تحمل حاوية واحدة عدة منتجات ويتعلق الشحن أو الجمارك ببعضها فقط، لم تعد مضطرًا إلى توزيع التكلفة على كل ما استُلم. تصبح تكلفة الوحدة، ومن ثم الهامش لكل منتج، أدق. وسؤال الرقابة هنا: من يقرر التخصيص، وأين يُحفظ المستند المؤيد له؟' },
        { h2: 'أي التقارير الجديدة تساعد في نهاية الشهر والمراجعة؟' },
        { p: 'وفقًا لملاحظات الإصدار، يستطيع {lat}Odoo 20{/lat} عرض المخزون في تاريخ سابق، ويضيف تقريرًا لتقادم المخزون. عرض المخزون في تاريخ سابق يجيب عن السؤال الذي يطرحه المراجعون كل عام: ماذا كنت تملك في تاريخ الميزانية؟ وتقرير التقادم يُظهر الأصناف التي لم تتحرك، وهو نقطة البداية لمراجعة المخزون بطيء الحركة أو المتقادم وأي نقاش عن تخفيض قيمته. لا يقرر أي من التقريرين التخفيض نيابة عنك، لكنهما يختصران عمل جمع الأدلة.' },
        { h2: 'ما الذي يتغير أيضًا في التقييم؟' },
        { ul: [
          'يمكن إدارة المخزون المتاح وتقييمه دون تطبيق المخزون، وهذا يناسب الشركات التي تحتفظ ببعض المخزون دون تشغيل كامل لعمليات المستودعات.',
          'قواعد إعادة الطلب المقترحة تقترح حدًا أدنى وحدًا أقصى بناءً على تاريخ الطلب وأيام التغطية المرغوبة وتكرار الطلب. وهي تؤثر في حجم النقد المحتجز في المخزون، فتعامل معها كمقترحات تُعتمد لا كإعدادات تُقبل تلقائيًا.',
          'إعادة التزويد بين الشركات من مستودع شركة أخرى تنقل التقييم بشكل صحيح وفقًا لملاحظات الإصدار، وهذا مهم للمجموعات التي تنقل المخزون بين كيانات قانونية.'
        ] },
        { p: 'قد يختلف توفر المزايا بين إصداري {lat}Community{/lat} و{lat}Enterprise{/lat}، وجزء كبير من أتمتة المحاسبة ما زال حكرًا على {lat}Enterprise{/lat}، فتأكد مما يتضمنه إصدارك قبل أن تبني إجراء عمل حوله.' },
        { quote: 'التكلفة الأدق لا تفيد إلا إذا لم يستطع أحد تغييرها بعد إعلان نتائج الشهر.' },
        { h2: 'ما الضوابط التي يجب أن تحيط بهذه التغييرات؟' },
        { p: 'كل تغيير مما سبق يجعل التقييم أدق، وكل تغيير منها يمنح أشخاصًا أكثر وسيلة لتحريك تكلفة المبيعات. نوصي بثلاثة ضوابط نضيفها إلى قسم المخزون في قائمة إقفال نهاية الشهر:' },
        { ul: [
          'قفل الفترة: اقفل كل فترة فور إعلان نتائجها، حتى لا يغيّر تعديل تكلفة بأثر رجعي تكلفة المبيعات في شهر مُقفل بصمت. والتغييرات بعد القفل تمر بتسوية موثقة في الفترة المفتوحة.',
          'من يغيّر التكاليف: قيّد تغيير تكلفة المنتجات وتخصيص تكاليف الشحن والجمارك واستحقاقات التقييم بأدوار مسماة، منفصلة عمّن يستلمون البضاعة، وراجع سجل تغييرات التكلفة كل شهر.',
          'مطابقة تقييم المخزون مع دفتر الأستاذ: في نهاية كل شهر طابِق تقرير تقييم المخزون مع حساب تقييم المخزون في دفتر الأستاذ العام، وفسّر كل فرق قبل قفل الفترة.'
        ] },
        { h2: 'هل يجب أن تدفعك هذه التغييرات إلى الترقية؟' },
        { p: 'إن كان المخزون جوهريًا في ميزانيتك وكان الهامش رقمًا يُناقش على مستوى مجلس الإدارة، فهي سبب وجيه للتخطيط للانتقال إلى {lat}Odoo 20{/lat}، خاصة من إصدار أقدم. اختبرها أولًا على نسخة من بياناتك، وقارن تكلفة المبيعات لشهر مُقفل قبل الترقية وبعدها. وحيث نعمل مديرًا ماليًا افتراضيًا لدى {lat}MFT{/lat}، فهذه المقارنة هي الدليل الذي نطلبه قبل الوثوق بأي تقرير هامش.' }
      ],
      faq: [
        { q: 'هل يغيّر {lat}Odoo 20{/lat} تكلفة المبيعات لبضاعة سُلّمت بالفعل؟', a: 'وفقًا لملاحظات إصدار {lat}Odoo 20{/lat}، تُحدَّث تكلفة المبيعات بأثر رجعي عندما تتغير التكلفة بعد التسليم. اقفل الفترات المُعلنة حتى لا تغيّر هذه التعديلات الشهور المُقفلة دون تسوية موثقة.' },
        { q: 'هل يمكن تخصيص تكاليف الشحن والجمارك لبعض منتجات الاستلام فقط؟', a: 'نعم. وفقًا لملاحظات الإصدار، يتيح {lat}Odoo 20{/lat} تخصيص هذه التكاليف لمنتجات بعينها داخل عملية النقل، بدل توزيعها على كل ما استُلم.' },
        { q: 'كيف نتأكد من صحة تقييم المخزون في نهاية الشهر؟', a: 'طابِق تقرير تقييم المخزون مع حساب تقييم المخزون في دفتر الأستاذ العام، وفسّر كل فرق، ثم اقفل الفترة. ويساعد عرض المخزون في تاريخ سابق في فحص التواريخ الماضية.' }
      ]
    }
  ]
};
