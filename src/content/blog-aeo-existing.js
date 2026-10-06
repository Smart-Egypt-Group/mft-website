// AEO fields (short answer, takeaways, FAQ) for the five original posts in blog.en.js / blog.ar.js.
// Strictly derived from what each article already says. Keyed by slug.

module.exports = {
  en: {
    'materiality-isa-320-threshold': {
      answer: 'Under ISA 320, materiality is the size of misstatement that could reasonably influence the decisions of people who read the financial statements. It is set by choosing a benchmark that reflects how the business is judged, such as profit before tax or revenue, applying a percentage that reflects its risk, and setting a lower performance materiality beneath it.',
      takeaways: [
        'ISA 320 gives a method, not a fixed number.',
        'Common benchmarks: around five percent of profit before tax, or around one percent of revenue, or a percentage of total assets.',
        'Performance materiality sits below the threshold so small errors cannot add up unnoticed.',
        'MFT computes the threshold from the client’s last closed year and reviews it every quarter.'
      ],
      faq: [
        { q: 'How is materiality calculated under ISA 320?', a: 'By selecting a benchmark that reflects how the entity is judged, such as profit before tax, revenue or total assets, and applying a percentage that reflects its risk. The standard does not prescribe a fixed number.' },
        { q: 'What is performance materiality?', a: 'It is a lower amount set below overall materiality so that several small misstatements cannot add up to a material one without being noticed.' },
        { q: 'How often should the materiality threshold be reviewed?', a: 'MFT reviews it every quarter and recomputes it when revenue or profit moves by more than the percentage itself, so the threshold stays aligned with the business.' }
      ]
    },
    'zatca-phase-two-odoo-checklist': {
      answer: 'Before going live with ZATCA phase two in Odoo, confirm that entity and branch details match the ZATCA portal, the EGS unit is onboarded with a production CSID, standard invoices clear and simplified invoices report within 24 hours, mandatory invoice fields and credit note references are correct, and every invoice type passes the ZATCA sandbox.',
      takeaways: [
        'Phase two integrates invoicing with ZATCA: standard invoices are cleared in real time, simplified invoices are reported within a day.',
        'Most rejections come from credit and debit notes that do not reference the original invoice and state the reason.',
        'Test every invoice type in the ZATCA sandbox and review the rejection log before switching to production.',
        'MFT keeps the ledger on the client’s own Odoo instance and reads it through the API at query time.'
      ],
      faq: [
        { q: 'Does Odoo support ZATCA phase two e-invoicing?', a: 'Yes, Odoo supports phase two. Whether a specific implementation is compliant depends on configuration decisions such as entity setup, device onboarding, invoice fields and clearance versus reporting.' },
        { q: 'What is the difference between clearance and reporting in ZATCA phase two?', a: 'Standard B2B tax invoices are cleared by ZATCA in real time before they reach the customer, while simplified B2C invoices are reported to ZATCA within 24 hours.' },
        { q: 'Why are ZATCA credit notes rejected?', a: 'In MFT’s implementations, most rejections come from credit and debit notes that do not reference the original invoice or do not carry the reason for the adjustment.' }
      ]
    },
    'egypt-eta-einvoicing-odoo-mistakes': {
      answer: 'Most Egyptian Tax Authority e-invoice rejections from Odoo come from master data, not tax: products without an approved item code, customers with the wrong identification type, branch addresses that differ from the registration, unlisted units of measure, discounts at the wrong level, missing exchange rates, and credit notes without the original document’s UUID.',
      takeaways: [
        'ETA rejections are usually master-data problems that were visible in Odoo weeks earlier.',
        'Fix errors at the point of entry with validation rules, not after submission.',
        'Credit notes must reference the original document’s UUID.',
        'Retail and food and beverage clients also need the B2C receipt stream, tested in the sandbox.'
      ],
      faq: [
        { q: 'Why is my e-invoice rejected by the Egyptian Tax Authority?', a: 'The cause is usually master data in the ERP: a missing or wrong item code, an incorrect customer identification, a branch address that does not match the registration, or a unit of measure outside the ETA list.' },
        { q: 'Can Odoo prevent ETA e-invoice errors?', a: 'Yes. Odoo can enforce validation rules at the point of entry, for example refusing to save a product without an item code or to confirm an invoice with an unmapped unit. MFT configures these rules during implementation.' },
        { q: 'Does the e-receipt mandate apply alongside e-invoicing?', a: 'For retail and food and beverage businesses, the B2C receipt mandate adds a second stream with its own device registration and its own timing, alongside e-invoicing.' }
      ]
    },
    'continuous-audit-eleven-months': {
      answer: 'Continuous internal audit reviews the whole population of transactions throughout the year instead of a sample once a year. It surfaces issues the annual audit is not designed to catch in time, such as duplicate payments, near-duplicate vendors, approvals outside the matrix and cut-off errors, and it shortens the external audit by leaving a ready evidence trail.',
      takeaways: [
        'An annual audit samples once a year and is not designed to watch the other eleven months.',
        'Continuous review covers the whole population, ranked by risk and financial impact.',
        'Typical findings: duplicate payments, approvals outside the matrix, cut-off errors and valuation drift.',
        'It complements the external audit rather than replacing it.'
      ],
      faq: [
        { q: 'What is continuous auditing?', a: 'It is internal audit that reviews transactions throughout the year rather than sampling once at year-end, scoring the whole population by risk so that issues surface while they can still be corrected.' },
        { q: 'Does continuous audit replace the external audit?', a: 'No. It complements it: findings are classified against ISA and the evidence trail already exists, which makes the annual audit shorter and cheaper.' },
        { q: 'What does continuous audit typically find?', a: 'Common findings include duplicate and near-duplicate payments, approvals outside the approval matrix, cut-off errors, inventory valuation drift, and manual journal entries posted late at month-end in round amounts.' }
      ]
    },
    'agents-draft-people-approve': {
      answer: 'In MFT Intelligence, AI agents never post to the ledger. They draft correcting entries and adjustments with the evidence attached, and named, registered people approve them by materiality tier: one approver below the ISA 320 threshold, a second at or above it. Corrections are made by reversing entries, never deletions, and every step is logged.',
      takeaways: [
        'Agents only draft; a registered person approves every entry.',
        'Approval is by name and by tier against the ISA 320 materiality threshold.',
        'Findings must cite the records retrieved in that run, or the evidence gate rejects them.',
        'Every run is logged, and the log is kept for seven years by default.'
      ],
      faq: [
        { q: 'Can MFT Intelligence post entries to Odoo on its own?', a: 'No. Agents only draft entries with evidence attached, and registered approvers must approve them. Live write-back to Odoo is configured per client once the connector is in place; until then approved drafts are handed to the team as ready-to-post entries.' },
        { q: 'What happens if an AI agent’s finding cites no evidence?', a: 'The evidence gate rejects it and shows it to the reviewer struck through, never as a fact. The agent may report that it found nothing, but it may not guess.' },
        { q: 'How are wrong entries corrected in MFT Intelligence?', a: 'Nothing is deleted. A wrong entry is corrected by a new reversing entry that references the original and is approved by the same tiers.' }
      ]
    }
  },
  ar: {
    'materiality-isa-320-threshold': {
      answer: 'الأهمية النسبية وفق {lat}ISA 320{/lat} هي حجم الخطأ الذي يُعقل أن يؤثر في قرارات من يقرؤون القوائم المالية. وتُحدَّد باختيار مقياس يعكس كيف يُحكم على الشركة، كالربح قبل الضريبة أو الإيراد، ثم تطبيق نسبة تعكس مخاطرها، ووضع أهمية نسبية للأداء أدنى منها.',
      takeaways: [
        'معيار {lat}ISA 320{/lat} يعطي منهجًا، لا رقمًا ثابتًا.',
        'المقاييس الشائعة: نحو خمسة بالمئة من الربح قبل الضريبة، أو نحو واحد بالمئة من الإيراد، أو نسبة من مجموع الأصول.',
        'الأهمية النسبية للأداء تقع تحت الحد حتى لا تتراكم أخطاء صغيرة دون أن يلاحظها أحد.',
        'تحسب {lat}MFT{/lat} الحد من آخر سنة مُقفلة للعميل وتراجعه كل ربع سنة.'
      ],
      faq: [
        { q: 'كيف تُحسب الأهمية النسبية وفق {lat}ISA 320{/lat}؟', a: 'باختيار مقياس يعكس كيف يُحكم على المنشأة، كالربح قبل الضريبة أو الإيراد أو مجموع الأصول، وتطبيق نسبة تعكس مخاطرها. ولا يفرض المعيار رقمًا ثابتًا.' },
        { q: 'ما الأهمية النسبية للأداء؟', a: 'هي مبلغ أدنى يُحدَّد تحت الأهمية النسبية الكلية، حتى لا تتراكم أخطاء صغيرة عدة إلى خطأ جوهري دون أن تُلاحظ.' },
        { q: 'كم مرة ينبغي مراجعة حد الأهمية النسبية؟', a: 'تراجعه {lat}MFT{/lat} كل ربع سنة، وتعيد حسابه عندما يتحرك الإيراد أو الربح بأكثر من النسبة نفسها، حتى يبقى الحد متسقًا مع الشركة.' }
      ]
    },
    'zatca-phase-two-odoo-checklist': {
      answer: 'قبل تشغيل المرحلة الثانية من {lat}ZATCA{/lat} في {lat}Odoo{/lat} تأكد أن بيانات الكيان والفروع تطابق بوابة الهيئة، وأن وحدة إصدار الفواتير مسجّلة بشهادة إنتاج، وأن الفواتير القياسية تُجاز والمبسطة تُبلَّغ خلال أربع وعشرين ساعة، وأن الحقول الإلزامية وإشارات إشعارات الدائن صحيحة، وأن كل نوع فاتورة اجتاز البيئة التجريبية للهيئة.',
      takeaways: [
        'المرحلة الثانية تربط الفوترة بالهيئة: الفواتير القياسية تُجاز لحظيًا، والمبسطة يُبلَّغ عنها خلال يوم.',
        'أغلب حالات الرفض تأتي من إشعارات دائن ومدين لا تشير إلى الفاتورة الأصلية ولا تذكر السبب.',
        'اختبر كل نوع فاتورة في البيئة التجريبية للهيئة وراجع سجل الرفض قبل التحويل إلى الإنتاج.',
        'تُبقي {lat}MFT{/lat} الدفتر على نسخة {lat}Odoo{/lat} الخاصة بالعميل وتقرأه عبر {lat}API{/lat} وقت الاستعلام.'
      ],
      faq: [
        { q: 'هل يدعم {lat}Odoo{/lat} المرحلة الثانية من الفوترة الإلكترونية لدى {lat}ZATCA{/lat}؟', a: 'نعم، {lat}Odoo{/lat} يدعم المرحلة الثانية. أما امتثال تنفيذ بعينه فيتوقف على قرارات الإعداد، كإعداد الكيان وتسجيل الجهاز وحقول الفاتورة والإجازة مقابل الإبلاغ.' },
        { q: 'ما الفرق بين الإجازة والإبلاغ في المرحلة الثانية؟', a: 'الفواتير الضريبية القياسية بين المنشآت تُجيزها الهيئة لحظيًا قبل أن تصل إلى العميل، أما الفواتير المبسطة للمستهلكين فيُبلَّغ عنها للهيئة خلال أربع وعشرين ساعة.' },
        { q: 'لماذا تُرفض إشعارات الدائن لدى {lat}ZATCA{/lat}؟', a: 'في تنفيذات {lat}MFT{/lat} تأتي أغلب حالات الرفض من إشعارات دائن ومدين لا تشير إلى الفاتورة الأصلية أو لا تحمل سبب التعديل.' }
      ]
    },
    'egypt-eta-einvoicing-odoo-mistakes': {
      answer: 'أغلب حالات رفض مصلحة الضرائب المصرية للفواتير الإلكترونية الصادرة من {lat}Odoo{/lat} سببها البيانات الأساسية لا الضريبة: منتجات بلا كود صنف معتمد، وعملاء بنوع تعريف خاطئ، وعناوين فروع تخالف التسجيل، ووحدات قياس خارج القائمة، وخصومات في المستوى الخطأ، وأسعار صرف ناقصة، وإشعارات دائن بلا المعرّف الفريد للمستند الأصلي.',
      takeaways: [
        'حالات رفض المصلحة غالبًا مشاكل بيانات أساسية كانت ظاهرة في {lat}Odoo{/lat} قبل أسابيع.',
        'أصلح الأخطاء عند الإدخال بقواعد تحقق، لا بعد الإرسال.',
        'إشعارات الدائن يجب أن تشير إلى المعرّف الفريد للمستند الأصلي.',
        'عملاء التجزئة والأغذية والمشروبات يحتاجون أيضًا مسار الإيصال الإلكتروني، مختبرًا في البيئة التجريبية.'
      ],
      faq: [
        { q: 'لماذا ترفض مصلحة الضرائب المصرية فاتورتي الإلكترونية؟', a: 'السبب عادة في البيانات الأساسية بنظام تخطيط الموارد: كود صنف ناقص أو خاطئ، أو تعريف عميل غير صحيح، أو عنوان فرع لا يطابق التسجيل، أو وحدة قياس خارج قائمة المصلحة.' },
        { q: 'هل يستطيع {lat}Odoo{/lat} منع أخطاء الفاتورة الإلكترونية؟', a: 'نعم. يستطيع {lat}Odoo{/lat} فرض قواعد تحقق عند الإدخال، كرفض حفظ منتج بلا كود صنف أو اعتماد فاتورة بوحدة غير مربوطة. وتضبط {lat}MFT{/lat} هذه القواعد أثناء التنفيذ.' },
        { q: 'هل ينطبق إلزام الإيصال الإلكتروني إلى جانب الفاتورة الإلكترونية؟', a: 'لقطاعات التجزئة والأغذية والمشروبات يضيف إلزام الإيصال الإلكتروني للمستهلك مسارًا ثانيًا بتسجيل جهاز خاص وتوقيت خاص، إلى جانب الفوترة الإلكترونية.' }
      ]
    },
    'continuous-audit-eleven-months': {
      answer: 'المراجعة الداخلية المستمرة تفحص مجتمع المعاملات كله طوال السنة بدل عينة مرة في السنة. وتكشف ما ليست المراجعة السنوية مصممة لالتقاطه في وقته، كالمدفوعات المكررة والموردين شبه المكررين والاعتمادات خارج المصفوفة وأخطاء الفصل الزمني، وتختصر المراجعة الخارجية لأنها تترك أثر أدلة جاهزًا.',
      takeaways: [
        'المراجعة السنوية تأخذ عينة مرة في السنة، وليست مصممة لمراقبة الأشهر الأحد عشر الأخرى.',
        'المراجعة المستمرة تغطي المجتمع كله، مرتّبًا حسب المخاطر والأثر المالي.',
        'ملاحظات نموذجية: مدفوعات مكررة، واعتمادات خارج المصفوفة، وأخطاء فصل زمني، وانحراف في التقييم.',
        'هي تكمّل المراجعة الخارجية ولا تحل محلها.'
      ],
      faq: [
        { q: 'ما المراجعة المستمرة؟', a: 'هي مراجعة داخلية تفحص المعاملات طوال السنة بدل عينة واحدة في نهايتها، وتقيّم المجتمع كله حسب المخاطر فتظهر المشكلات وما زال تصحيحها ممكنًا.' },
        { q: 'هل تحل المراجعة المستمرة محل المراجعة الخارجية؟', a: 'لا، بل تكمّلها: الملاحظات مصنّفة وفق {lat}ISA{/lat} وأثر الأدلة موجود أصلًا، وهذا يجعل المراجعة السنوية أقصر وأقل تكلفة.' },
        { q: 'ما الذي تجده المراجعة المستمرة عادة؟', a: 'من الملاحظات الشائعة المدفوعات المكررة وشبه المكررة، والاعتمادات خارج مصفوفة الصلاحيات، وأخطاء الفصل الزمني، وانحراف تقييم المخزون، والقيود اليدوية المتأخرة في آخر الشهر بمبالغ مدوّرة.' }
      ]
    },
    'agents-draft-people-approve': {
      answer: 'في {lat}MFT Intelligence{/lat} لا يرحّل وكلاء الذكاء الاصطناعي أي قيد إلى الدفتر. إنهم يُعدّون مسودات القيود التصحيحية والتسويات مرفقة بأدلتها، ويعتمدها أشخاص مسجّلون بالاسم حسب مستوى الأهمية النسبية: معتمِد واحد تحت حد {lat}ISA 320{/lat}، وثانٍ عنده أو فوقه. والتصحيح يكون بقيود عكسية لا بالحذف، وكل خطوة مسجّلة.',
      takeaways: [
        'الوكلاء يُعدّون المسودات فقط؛ وشخص مسجّل يعتمد كل قيد.',
        'الاعتماد بالاسم وبالمستوى مقابل حد الأهمية النسبية ({lat}ISA 320{/lat}).',
        'الملاحظات يجب أن تستشهد بالسجلات المسترجعة في التشغيلة نفسها، وإلا رفضتها بوابة الأدلة.',
        'كل تشغيلة مسجّلة، ويُحتفظ بالسجل سبع سنوات افتراضيًا.'
      ],
      faq: [
        { q: 'هل تستطيع {lat}MFT Intelligence{/lat} ترحيل القيود إلى {lat}Odoo{/lat} من تلقاء نفسها؟', a: 'لا. الوكلاء يُعدّون مسودات القيود مرفقة بأدلتها فقط، ويجب أن يعتمدها معتمِدون مسجّلون. والكتابة الفعلية في {lat}Odoo{/lat} تُضبط لكل عميل بعد تهيئة موصّله، وحتى ذلك الحين تُسلَّم المسودات المعتمدة للفريق كقيود جاهزة للترحيل.' },
        { q: 'ماذا يحدث إذا لم تستشهد ملاحظة الوكيل بأي دليل؟', a: 'ترفضها بوابة الأدلة وتُعرض للمراجع مشطوبة، لا كحقيقة أبدًا. يُسمح للوكيل بأن يقول إنه لم يجد شيئًا، ولا يُسمح له أن يخمّن.' },
        { q: 'كيف تُصحَّح القيود الخاطئة في {lat}MFT Intelligence{/lat}؟', a: 'لا يُحذف شيء. يُصحَّح القيد الخاطئ بقيد عكسي جديد يشير إلى الأصل ويُعتمد بنفس المستويات.' }
      ]
    }
  }
};
