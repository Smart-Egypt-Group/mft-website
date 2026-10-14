// 08. AI audit trail and zero hallucination: the evidence-or-silence rule
module.exports = {
  en: {
    slug: 'ai-audit-trail-zero-hallucination',
    topic: 'audit',
    author: 'ahmed',
    reviewer: 'practice',
    date: '2026-10-14',
    title: 'AI audit trail and zero hallucination: the evidence-or-silence rule',
    metaTitle: 'AI audit trail and zero hallucination in finance',
    dek: 'An AI answer with no record behind it is an assertion, not evidence. How provenance, a validation gate and a named reviewer make AI output auditable.',
    description: 'How to build an AI audit trail auditors can rely on: provenance to record ids, the evidence-or-silence rule, and a re-performance test for each AI finding.',
    keywords: [
      'AI audit trail',
      'AI hallucination in accounting',
      'AI provenance audit evidence',
      'zero hallucination AI',
      'evidence or silence',
      'ISA 500 audit evidence AI'
    ],
    about: ['Audit trail', 'Audit evidence', 'Artificial intelligence', 'AI hallucination', 'Odoo'],
    answer: 'An AI audit trail links every AI output to the specific records it retrieved, the instruction and run that produced it, and the person who reviewed it. Zero hallucination is enforced, not hoped for: under the evidence-or-silence rule, a finding that cites no record, or a number absent from its cited records, is rejected.',
    takeaways: [
      'Provenance means every AI output can be traced to record ids, an instruction version and a named reviewer.',
      'Zero hallucination is a property of the process: unsupported output is struck through, never shown as fact.',
      'Re-perform AI findings from the cited records; re-asking the question is not re-performance.',
      'Odoo 20 keeps AI conversations up to 30 days, so evidence must be moved into the record or working papers.'
    ],
    body: [
      { p: 'A finance manager asks the AI assistant how many customer invoices are more than ninety days overdue and gets a clean, confident answer. It goes into the board pack. Three weeks later the external auditor asks a plain question: which invoices? If the answer is "the AI said so", the figure is not evidence. It is an assertion with no owner.' },
      { p: 'This is the problem of provenance, and it decides whether AI output can be used in accounting and audit at all. This article sets out the rule we apply, evidence or silence, and the trail that makes it testable. It is part of our [[blog/ai-in-accounting-guide-2026/|series on AI in accounting]].' },

      { h2: 'What is AI provenance in accounting and audit?' },
      { p: 'AI provenance is the recorded chain from an AI output back to the exact records it read, the instruction and run that produced it, and the person who accepted or rejected it, so that a reviewer can re-perform the work. An audit trail does the same for transactions: who created, changed, approved and posted what, and when. AI provenance extends that trail to a new kind of preparer. Without it, an AI finding cannot be traced to source, and an AI-drafted entry has a record of what was posted but not of why.' },

      { h2: 'Why is an AI answer not audit evidence on its own?' },
      { p: 'ISA 500 requires sufficient appropriate audit evidence, and appropriateness depends on relevance and reliability. ISA 230 requires documentation that lets an experienced auditor with no prior connection to the engagement understand the work done and the evidence obtained. A fluent paragraph from a language model meets neither test unless it points to records that can be inspected. The standards are moving with the technology: in August 2026 the IAASB issued exposure drafts revising ISA 500, ISA 330 and ISA 520 to address the increased use of technology, with comments due 15 December 2026. They are not final, but the direction is clear.' },
      { p: 'Hallucination is the specific risk. A model can produce a number, a vendor name or a date that reads correctly and exists nowhere in the books. In finance this is worse than an obvious error, because it looks like the output of a calculation.' },

      { h2: 'What does "evidence or silence" mean?' },
      { p: 'It is the operating rule of MFT Intelligence: every finding must cite the record ids the agent actually retrieved, and a finding that cites nothing, or contains a number that is not in the cited records, is rejected. Rejected findings are shown struck through, never presented as facts. The agent either shows its evidence or says nothing.' },
      { p: 'Note what the rule does not claim. It does not claim the model never errs. It moves zero hallucination from a property of the model, which nobody can guarantee, to a property of the process, which can be tested: unsupported output cannot pass as a finding.' },
      { quote: 'If the agent cannot point to the record, the finding does not exist.' },
      { h3: 'How the check works, step by step' },
      { ol: [
        'The agent retrieves records through the API, and the id of every record returned is logged.',
        'The agent drafts a finding and lists the record ids it relies on.',
        'A validation step checks that every cited id was actually retrieved in that run.',
        'It then checks that every number, date and name in the finding appears in the cited records.',
        'Any finding that fails is struck through and kept, so the reviewer sees what was rejected and why.',
        'A named reviewer accepts, edits or rejects the surviving findings, and the decision is recorded.'
      ] },
      { h3: 'A worked example' },
      { p: 'An agent reports that two bills from the same vendor carry the same reference, were posted four days apart and were both paid. It cites the two bill records and the two payment records. The validator confirms all four ids were retrieved and that the reference, dates and payment status appear in them, so the finding stands for review. In the same run the agent adds that the vendor was created by the user who approved both payments, but cites no vendor record or user log. That sentence is struck through. It may be true; it is not yet evidence, so the reviewer pulls the vendor change history before saying it.' },

      { h2: 'What should an AI audit trail record?' },
      { table: {
        caption: 'Minimum AI audit trail for finance use',
        head: ['Element', 'Why it matters', 'Practical note'],
        rows: [
          ['Instruction version', 'The same question under a different instruction gives a different answer', 'Odoo 20 default prompts accept context and dynamic values; version them like a policy'],
          ['Records retrieved', 'The basis for re-performance', 'Log record ids, not only a summary of the query'],
          ['Provider and model', 'Explains differences between runs', 'Odoo 20 selects the model automatically once you choose a provider; confirm what your database records'],
          ['Output as delivered', 'Shows what the user actually saw', 'Keep the original, including struck-through findings'],
          ['Reviewer and decision', 'Accountability sits with a person', 'A named, registered approver; the requester does not approve their own run'],
          ['Resulting entry', 'Links the finding to the books', 'Draft, approval, posting; corrections by reversal, never deletion'],
          ['Retention', 'Evidence must outlive the chat', 'Stored conversations are kept up to 30 days after the last message; copy what you need into the record or working papers']
        ]
      } },

      { h2: 'Where does Odoo 20 help, and where are the gaps?' },
      { p: 'According to Odoo’s 20 release notes, several AI features point the right way. AI-powered financial insights answer questions about the company’s finances based solely on accounting data in your database, and can review suspected reconciliation errors and return findings and recommendations. Agents show live progress, can reprocess sources manually, ask before exceeding their tool call limit and request permission through buttons. Outside AI, cash journal entries are hashed on reconciliation, user group changes are logged in the user’s chatter, and bank statement attachments are available in Accounting and Documents, which keeps the source document close to the entry.' },
      { p: 'The gaps are about evidence, not capability. Conversations are kept up to 30 days, shorter than any audit cycle. Automatic model selection means a re-run may not use the same model, so re-performance should re-check the cited records rather than re-ask the question. And an answer based on accounting data is only as good as that data: if bills are miscoded, the insight repeats the error with confidence. Confirm in your own database which AI features your edition and plan include and what each run logs. More on agent behaviour in [[blog/odoo-20-ai-agents-finance-controls/|Odoo 20 AI agents under finance controls]].' },

      { h2: 'How should an auditor test an AI-generated finding?' },
      { ol: [
        'Re-perform from the cited records: open each record id and confirm the facts in the finding.',
        'Trace to source documents: the bill, the bank statement line and the approval, not only the ledger.',
        'Test completeness: confirm the run covered the whole population for the period, not a filtered view. This is what makes [[blog/full-population-testing-ai-vs-sampling/|full-population testing with AI]] defensible.',
        'Review rejected findings too: a pattern of struck-through claims tells you something about the instruction or the data.',
        'Document under ISA 230: what was run, on which records, who reviewed it and what was concluded.'
      ] },
      { p: 'A finding that survives these steps is a lead with evidence. It is still not a conclusion about fraud or misstatement; that judgment stays with the auditor, as we stress in [[blog/ai-financial-fraud-detection/|AI-based fraud detection]].' },

      { h2: 'What about corrections drafted by AI?' },
      { p: 'Provenance matters most when AI moves from finding to fixing. Our rule set: agents draft correcting entries and adjustments; a named, registered person approves; above the client’s [[blog/materiality-isa-320-threshold/|ISA 320 materiality threshold]] a second approver is required; corrections are made by reversal, never deletion; nothing is auto-posted. The trail then reads end to end: records retrieved, finding, draft entry, approver, posted reversal. Who may approve what is a segregation question, covered in [[blog/ai-segregation-of-duties-internal-controls/|AI and segregation of duties]], and the principle is set out in [[blog/agents-draft-people-approve/|agents draft, people approve]].' },

      { h2: 'Where to start on Monday' },
      { ol: [
        'Pick one AI output your team already uses, such as an overdue receivables answer, and ask for the record ids behind it. If they cannot be produced, stop using it in reports.',
        'Write a one-page AI evidence standard: what each run must log, who reviews it, how long evidence is kept.',
        'Move any AI output used in a report or entry into the record or a working paper within the 30-day window.',
        'Version the instructions of every agent that touches finance, and review changes before they go live.',
        'Add a re-performance check on a few AI findings to each month-end close review.'
      ] },
      { p: 'This is the discipline behind seg-audit, MFT’s continuous audit platform. It reads the books straight from the ERP, read-only, scores every transaction by risk, and works to one rule: "No number without evidence". Findings stay on record with evidence and severity, repeats are linked to earlier findings, a finding cannot be closed without a named, registered approver, and the evidence trail is usable by external auditors. The [[intelligence/auditor/|Auditor agent]] applies evidence or silence today as a managed service and is being integrated into seg-audit’s report pipeline, where its output will enter a two-stage human approval chain as a draft; that integration is in final review, not yet live. For the case for continuous evidence, read [[blog/continuous-audit-eleven-months/|what the annual audit misses in eleven months]], or talk to our [[services/internal-audit/|internal audit team]].' }
    ],
    faq: [
      { q: 'What is AI hallucination in accounting?', a: 'It is when an AI model produces a figure, name, date or statement that reads as correct but does not exist in the underlying records. In accounting it is dangerous because it looks like the result of a calculation. The control is to require every output to cite the records it came from and reject anything unsupported.' },
      { q: 'Can AI output be used as audit evidence?', a: 'Only through the records it points to. ISA 500 asks for sufficient appropriate evidence, and ISA 230 asks for documentation another auditor can follow. An AI finding that cites record ids can be re-performed against those records and the source documents; an AI answer with no citations is an assertion that still needs evidence.' },
      { q: 'What should an AI audit trail include?', a: 'At minimum: the instruction version, the ids of the records retrieved, the provider and model where available, the output as delivered including rejected findings, the named reviewer and decision, any resulting draft or posted entry, and a retention step that keeps the evidence beyond the life of the chat.' },
      { q: 'How long does Odoo 20 keep AI conversations?', a: 'According to Odoo’s 20 release notes, stored AI conversations are kept up to 30 days after the last message. That is shorter than any audit cycle, so any AI output relied on for a report, a finding or an entry should be captured in the record or in working papers before then.' },
      { q: 'Does zero hallucination mean the AI never makes mistakes?', a: 'No. No model can guarantee that. Zero hallucination here means a process rule: output that cites no record, or contains a number not found in its cited records, is rejected and shown struck through, so unsupported claims never reach a report as facts. A named reviewer still checks what passes.' }
    ],
    sources: [
      { label: 'Odoo, "Odoo 20 Release Notes" (24 September 2026)', url: 'https://www.odoo.com/odoo-20-release-notes' },
      { label: 'IAASB, "Project update: ISA 500, Audit Evidence" (exposure drafts, August 2026)', url: 'https://www.iaasb.org/publications/project-update-isa-500-audit-evidence' }
    ]
  },

  ar: {
    slug: 'ai-audit-trail-zero-hallucination',
    topic: 'audit',
    author: 'ahmed',
    reviewer: 'practice',
    date: '2026-10-14',
    title: 'مسار التدقيق في الذكاء الاصطناعي وصفر هلوسة: قاعدة الدليل أو الصمت',
    metaTitle: 'مسار التدقيق في الذكاء الاصطناعي ومبدأ صفر هلوسة',
    dek: 'إجابة الذكاء الاصطناعي التي لا يقف خلفها سجل ادعاء لا دليل. كيف يجعل تتبع المصدر وبوابة التحقق والمراجع المسمّى مخرجات الذكاء الاصطناعي قابلة للمراجعة.',
    description: 'كيف تبني مسار تدقيق للذكاء الاصطناعي يعتمد عليه المراجع: ربط كل مخرج بمعرّفات السجلات، وقاعدة الدليل أو الصمت، واختبار إعادة أداء لكل ملاحظة.',
    keywords: [
      'مسار التدقيق في الذكاء الاصطناعي',
      'هلوسة الذكاء الاصطناعي في المحاسبة',
      'أدلة المراجعة والذكاء الاصطناعي',
      'الذكاء الاصطناعي في المراجعة الداخلية',
      'الدليل أو الصمت'
    ],
    about: ['مسار التدقيق', 'أدلة المراجعة', 'الذكاء الاصطناعي', 'هلوسة النماذج اللغوية', 'أودو'],
    answer: 'مسار التدقيق في الذكاء الاصطناعي يربط كل مخرج بالسجلات المحددة التي استرجعها، وبالتعليمات والتشغيل اللذين أنتجاه، وبالشخص الذي راجعه. ومبدأ صفر هلوسة يُفرض ولا يُتمنى: وفق قاعدة الدليل أو الصمت، تُرفض كل ملاحظة لا تستشهد بسجل، أو تتضمن رقمًا غير موجود في السجلات التي استشهدت بها، ولا تُعرض كحقيقة.',
    takeaways: [
      'تتبع المصدر يعني أن كل مخرج يعود إلى معرّفات سجلات وإصدار تعليمات ومراجع مسمّى.',
      'صفر هلوسة خاصية في الإجراء: المخرج غير المدعوم يُشطب ولا يُعرض كحقيقة.',
      'أعد أداء الملاحظة من السجلات المستشهد بها؛ إعادة طرح السؤال ليست إعادة أداء.',
      'يحفظ {lat}Odoo 20{/lat} محادثات الذكاء الاصطناعي حتى {lat}30{/lat} يومًا، فانقل الدليل إلى السجل أو أوراق العمل.'
    ],
    body: [
      { p: 'يسأل المدير المالي المساعد الذكي: كم فاتورة عميل تجاوز تأخرها تسعين يومًا؟ فتأتيه إجابة واضحة وواثقة، فيضعها في عرض مجلس الإدارة. بعد ثلاثة أسابيع يسأل المراجع الخارجي سؤالًا بسيطًا: أي فواتير؟ إذا كان الجواب "هكذا قال الذكاء الاصطناعي"، فالرقم ليس دليلًا، بل ادعاء بلا صاحب.' },
      { p: 'هذه مشكلة تتبع المصدر، وهي التي تحدد هل يصلح مخرج الذكاء الاصطناعي للاستخدام في المحاسبة والمراجعة أصلًا. نعرض هنا القاعدة التي نعمل بها، الدليل أو الصمت، ومسار التدقيق الذي يجعلها قابلة للاختبار. والمقال جزء من [[blog/ai-in-accounting-guide-2026/|سلسلتنا عن الذكاء الاصطناعي في المحاسبة]].' },

      { h2: 'ما تتبع مصدر الذكاء الاصطناعي في المحاسبة والمراجعة؟' },
      { p: 'تتبع مصدر الذكاء الاصطناعي ({lat}AI provenance{/lat}) هو السلسلة الموثقة التي تعيد أي مخرج إلى السجلات التي قرأها بالضبط، وإلى التعليمات والتشغيل اللذين أنتجاه، وإلى الشخص الذي قبله أو رفضه، بحيث يستطيع مراجع آخر إعادة أداء العمل. مسار التدقيق ({lat}Audit trail{/lat}) يفعل ذلك مع المعاملات: من أنشأ ماذا ومن عدّله واعتمده ورحّله، ومتى. وتتبع المصدر يمد هذا المسار إلى نوع جديد من المُعِدّين. ومن دونه لا يمكن ردّ ملاحظة الذكاء الاصطناعي إلى مصدرها، ويبقى للقيد الذي أعدّه الوكيل سجل بما رُحّل دون سجل بسببه.' },

      { h2: 'لماذا لا تكفي إجابة الذكاء الاصطناعي وحدها دليلًا للمراجعة؟' },
      { p: 'يتطلب معيار {lat}ISA 500{/lat} أدلة مراجعة كافية ومناسبة، والمناسبة تعني الصلة والموثوقية. ويتطلب {lat}ISA 230{/lat} توثيقًا يمكّن مراجعًا خبيرًا لا صلة سابقة له بالمهمة من فهم العمل المنجز والأدلة التي جُمعت. فقرة بليغة من نموذج لغوي لا تحقق أيًا من الشرطين ما لم تُحِل إلى سجلات يمكن فحصها. والمعايير تتحرك مع التقنية: في أغسطس {lat}2026{/lat} أصدر مجلس {lat}IAASB{/lat} مسودات عرض لتعديل {lat}ISA 500{/lat} و{lat}ISA 330{/lat} و{lat}ISA 520{/lat} لمعالجة التوسع في استخدام التقنية، وآخر موعد للتعليقات {lat}15{/lat} ديسمبر {lat}2026{/lat}. لم تصبح نهائية بعد، لكن الاتجاه واضح.' },
      { p: 'والهلوسة هي الخطر المحدد هنا: قد ينتج النموذج رقمًا أو اسم مورد أو تاريخًا يبدو صحيحًا ولا وجود له في الدفاتر. وفي المالية هذا أسوأ من الخطأ الظاهر، لأنه يبدو كأنه ناتج عملية حسابية.' },

      { h2: 'ماذا تعني قاعدة "الدليل أو الصمت"؟' },
      { p: 'هي قاعدة التشغيل في {lat}MFT Intelligence{/lat}: كل ملاحظة يجب أن تستشهد بمعرّفات السجلات التي استرجعها الوكيل فعلًا، وأي ملاحظة لا تستشهد بشيء، أو تتضمن رقمًا غير موجود في السجلات المستشهد بها، تُرفض. والملاحظات المرفوضة تظهر مشطوبة، ولا تُعرض كحقائق أبدًا. إما أن يُظهر الوكيل دليله، وإما أن يصمت.' },
      { p: 'ولاحظ ما لا تدّعيه القاعدة: لا تدّعي أن النموذج لا يخطئ. إنها تنقل مبدأ صفر هلوسة من خاصية في النموذج، لا يملك أحد ضمانها، إلى خاصية في الإجراء يمكن اختبارها: المخرج غير المدعوم لا يمر ملاحظةً.' },
      { quote: 'إن لم يستطع الوكيل أن يشير إلى السجل، فالملاحظة غير موجودة.' },
      { h3: 'كيف يعمل الفحص خطوة بخطوة' },
      { ol: [
        'يسترجع الوكيل السجلات عبر {lat}API{/lat}، ويُسجَّل معرّف كل سجل عاد إليه.',
        'يصوغ الوكيل الملاحظة ويذكر معرّفات السجلات التي يستند إليها.',
        'تتحقق خطوة الفحص من أن كل معرّف مستشهد به استُرجع فعلًا في التشغيل نفسه.',
        'ثم تتحقق من أن كل رقم وتاريخ واسم في الملاحظة موجود في تلك السجلات.',
        'الملاحظة التي تفشل تُشطب وتبقى ظاهرة، ليرى المراجع ما رُفض ولماذا.',
        'يقبل مراجع مسمّى الملاحظات الباقية أو يعدّلها أو يرفضها، ويُسجَّل قراره.'
      ] },
      { h3: 'مثال تطبيقي' },
      { p: 'يرصد الوكيل فاتورتين من المورد نفسه تحملان المرجع نفسه، رُحّلتا بفارق أربعة أيام، ودُفعت كل منهما. ويستشهد بسجلَّي الفاتورتين وسجلَّي الدفعتين. يتأكد الفاحص أن المعرّفات الأربعة استُرجعت وأن المرجع والتواريخ وحالة السداد موجودة فيها، فتبقى الملاحظة للمراجعة. وفي التشغيل نفسه يضيف الوكيل أن المورد أنشأه المستخدم الذي اعتمد الدفعتين، دون أن يستشهد بسجل المورد أو بسجل المستخدمين. هذه الجملة تُشطب. قد تكون صحيحة، لكنها ليست دليلًا بعد، فيسحب المراجع سجل تغييرات المورد قبل أن يقولها.' },

      { h2: 'ماذا يجب أن يسجّل مسار التدقيق في الذكاء الاصطناعي؟' },
      { table: {
        caption: 'الحد الأدنى لمسار تدقيق الذكاء الاصطناعي في الاستخدام المالي',
        head: ['العنصر', 'لماذا يهم', 'ملاحظة عملية'],
        rows: [
          ['إصدار التعليمات', 'السؤال نفسه بتعليمات مختلفة يعطي إجابة مختلفة', 'الأوامر الافتراضية في {lat}Odoo 20{/lat} تقبل سياقًا وقيمًا ديناميكية، فأدِر إصداراتها كما تدير سياسة'],
          ['السجلات المسترجعة', 'أساس إعادة الأداء', 'سجّل معرّفات السجلات، لا ملخص الاستعلام فقط'],
          ['المزوّد والنموذج', 'يفسر الاختلاف بين تشغيل وآخر', 'يختار {lat}Odoo 20{/lat} النموذج آليًا بعد أن تحدد المزوّد؛ تأكد مما تسجله قاعدة بياناتك'],
          ['المخرج كما سُلّم', 'يبيّن ما رآه المستخدم فعلًا', 'احتفظ بالأصل، بما فيه الملاحظات المشطوبة'],
          ['المراجع وقراره', 'المسؤولية على شخص', 'معتمِد مسمّى ومسجّل، ومن طلب التشغيل لا يعتمده'],
          ['القيد الناتج', 'يربط الملاحظة بالدفاتر', 'مسودة ثم اعتماد ثم ترحيل، والتصحيح بقيد عكسي لا بالحذف'],
          ['الحفظ', 'الدليل يجب أن يعيش بعد المحادثة', 'المحادثات المخزنة تُحفظ حتى {lat}30{/lat} يومًا بعد آخر رسالة، فانقل ما تحتاجه إلى السجل أو أوراق العمل']
        ]
      } },

      { h2: 'أين يساعد {lat}Odoo 20{/lat}، وأين الفجوات؟' },
      { p: 'وفق ملاحظات إصدار {lat}Odoo 20{/lat}، تسير عدة ميزات في الاتجاه الصحيح. الرؤى المالية بالذكاء الاصطناعي تجيب عن أسئلة مالية الشركة بالاعتماد على البيانات المحاسبية في قاعدة بياناتك وحدها، ويمكنها فحص أخطاء التسوية البنكية المشتبه بها وإرجاع ملاحظات وتوصيات. والوكلاء يعرضون التقدم مباشرة، ويمكن إعادة معالجة المصادر يدويًا، ويستأذنون قبل تجاوز حد استدعاء الأدوات، ويطلبون الإذن بأزرار. وخارج الذكاء الاصطناعي، تُختم قيود النقدية بالتجزئة ({lat}hashing{/lat}) عند التسوية، وتُسجَّل تغييرات مجموعات المستخدمين في محادثة المستخدم، وتتاح مرفقات كشوف الحساب البنكية في المحاسبة والمستندات، فيبقى المستند الأصلي قريبًا من القيد.' },
      { p: 'الفجوات في الدليل لا في القدرة. المحادثات تُحفظ حتى {lat}30{/lat} يومًا، وهي مدة أقصر من أي دورة مراجعة. والاختيار الآلي للنموذج يعني أن إعادة التشغيل قد لا تستخدم النموذج نفسه، فإعادة الأداء تكون بفحص السجلات المستشهد بها لا بإعادة السؤال. والإجابة المبنية على البيانات المحاسبية جيدة بقدر جودة تلك البيانات: إن كان توجيه الفواتير خاطئًا كررت الرؤية الخطأ بثقة. تأكد في قاعدة بياناتك من ميزات الذكاء الاصطناعي المتاحة في نسختك وخطتك، ومما يسجله كل تشغيل. وتفصيل سلوك الوكلاء في [[blog/odoo-20-ai-agents-finance-controls/|وكلاء {lat}Odoo 20{/lat} تحت الضوابط المالية]].' },

      { h2: 'كيف يختبر المراجع ملاحظة أنتجها الذكاء الاصطناعي؟' },
      { ol: [
        'أعد الأداء من السجلات المستشهد بها: افتح كل معرّف وتأكد من الوقائع الواردة في الملاحظة.',
        'تتبع إلى المستندات الأصلية: الفاتورة، وسطر كشف الحساب البنكي، والاعتماد، لا دفتر الأستاذ وحده.',
        'اختبر الاكتمال: تأكد أن التشغيل غطى المجتمع الكامل للفترة لا عرضًا مُصفّى. هذا ما يجعل [[blog/full-population-testing-ai-vs-sampling/|اختبار المجتمع الكامل بالذكاء الاصطناعي]] قابلًا للدفاع عنه.',
        'راجع الملاحظات المرفوضة أيضًا: تكرار الادعاءات المشطوبة يخبرك بشيء عن التعليمات أو عن البيانات.',
        'وثّق وفق {lat}ISA 230{/lat}: ماذا شُغّل، وعلى أي سجلات، ومن راجع، وما الاستنتاج.'
      ] },
      { p: 'الملاحظة التي تجتاز هذه الخطوات خيط مدعوم بالدليل، لكنها ليست حكمًا بالاحتيال أو بالتحريف؛ هذا الحكم يبقى للمراجع، كما نؤكد في [[blog/ai-financial-fraud-detection/|كشف الاحتيال المالي بالذكاء الاصطناعي]].' },

      { h2: 'وماذا عن قيود التصحيح التي يُعدّها الذكاء الاصطناعي؟' },
      { p: 'تتبع المصدر أهم ما يكون حين ينتقل الذكاء الاصطناعي من الرصد إلى التصحيح. قواعدنا: الوكيل يُعدّ قيود التصحيح والتسويات، ويعتمدها شخص مسمّى ومسجّل، وفوق [[blog/materiality-isa-320-threshold/|حد الأهمية النسبية وفق {lat}ISA 320{/lat}]] يلزم معتمِد ثانٍ، والتصحيح بقيد عكسي لا بالحذف، ولا يُرحَّل شيء آليًا. عندها يُقرأ المسار من أوله إلى آخره: السجلات المسترجعة، فالملاحظة، فمسودة القيد، فالمعتمِد، فالقيد العكسي المرحّل. ومن يعتمد ماذا سؤال فصل بين المهام تناولناه في [[blog/ai-segregation-of-duties-internal-controls/|الذكاء الاصطناعي والفصل بين المهام]]، والمبدأ مشروح في [[blog/agents-draft-people-approve/|الوكيل يُعِدّ والإنسان يعتمد]].' },

      { h2: 'من أين تبدأ يوم الأحد؟' },
      { ol: [
        'اختر مخرجًا واحدًا يستخدمه فريقك الآن، كإجابة عن الذمم المتأخرة، واطلب معرّفات السجلات التي خلفه. إن تعذّر ذلك فأوقف استخدامه في التقارير.',
        'اكتب معيارًا من صفحة واحدة لأدلة الذكاء الاصطناعي: ماذا يسجّل كل تشغيل، ومن يراجع، وكم يُحفظ الدليل.',
        'انقل كل مخرج استُخدم في تقرير أو قيد إلى السجل أو إلى ورقة عمل خلال نافذة الـ{lat}30{/lat} يومًا.',
        'أدِر إصدارات تعليمات كل وكيل يمس المالية، وراجع أي تغيير قبل تفعيله.',
        'أضف إلى مراجعة الإقفال الشهري إعادة أداء لعدد قليل من ملاحظات الذكاء الاصطناعي.'
      ] },
      { p: 'هذا هو الانضباط نفسه وراء {lat}seg-audit{/lat}، منصة {lat}MFT{/lat} للمراجعة المستمرة: تقرأ الدفاتر مباشرة من نظام {lat}ERP{/lat} قراءة فقط، وتقيّم كل معاملة حسب الخطر، وتعمل بقاعدة واحدة: لا رقم بلا دليل. تبقى الملاحظات مسجلة بأدلتها ودرجة خطورتها، وتُربط الملاحظات المتكررة بسابقاتها، ولا تُغلق ملاحظة دون معتمِد مسمّى ومسجّل، ومسار الأدلة صالح لاستخدام المراجع الخارجي. و[[intelligence/auditor/|وكيل المراجع]] يطبق قاعدة الدليل أو الصمت اليوم كخدمة مُدارة، ويجري دمجه في مسار تقارير {lat}seg-audit{/lat} ليدخل مخرجه سلسلة اعتماد بشري من مرحلتين كمسودة؛ والدمج في المراجعة النهائية ولم يُطلق بعد. ولماذا يهم الدليل المستمر، اقرأ [[blog/continuous-audit-eleven-months/|ما يفوت المراجعة السنوية في أحد عشر شهرًا]]، أو تواصل مع فريق [[services/internal-audit/|المراجعة الداخلية]] لدينا.' }
    ],
    faq: [
      { q: 'ما هلوسة الذكاء الاصطناعي في المحاسبة؟', a: 'هي أن ينتج النموذج رقمًا أو اسمًا أو تاريخًا أو عبارة تبدو صحيحة ولا وجود لها في السجلات. وخطرها في المحاسبة أنها تبدو كناتج عملية حسابية. والضابط أن يُلزم كل مخرج بالاستشهاد بالسجلات التي جاء منها، وأن يُرفض كل ما لا يدعمه سجل.' },
      { q: 'هل يصلح مخرج الذكاء الاصطناعي دليلًا للمراجعة؟', a: 'فقط عبر السجلات التي يحيل إليها. يطلب {lat}ISA 500{/lat} أدلة كافية ومناسبة، ويطلب {lat}ISA 230{/lat} توثيقًا يستطيع مراجع آخر تتبعه. الملاحظة التي تستشهد بمعرّفات سجلات يمكن إعادة أدائها على تلك السجلات والمستندات الأصلية، أما الإجابة بلا استشهاد فادعاء ما زال يحتاج إلى دليل.' },
      { q: 'ماذا يتضمن مسار تدقيق الذكاء الاصطناعي؟', a: 'على الأقل: إصدار التعليمات، ومعرّفات السجلات المسترجعة، والمزوّد والنموذج إن أمكن، والمخرج كما سُلّم بما فيه الملاحظات المرفوضة، والمراجع المسمّى وقراره، وأي قيد ناتج مسودةً أو مرحّلًا، وخطوة حفظ تُبقي الدليل بعد انتهاء عمر المحادثة.' },
      { q: 'كم يحتفظ {lat}Odoo 20{/lat} بمحادثات الذكاء الاصطناعي؟', a: 'وفق ملاحظات إصدار {lat}Odoo 20{/lat}، تُحفظ المحادثات المخزنة حتى {lat}30{/lat} يومًا بعد آخر رسالة. وهي مدة أقصر من أي دورة مراجعة، فكل مخرج اعتُمد عليه في تقرير أو ملاحظة أو قيد يجب تثبيته في السجل أو في أوراق العمل قبل انقضائها.' },
      { q: 'هل يعني صفر هلوسة أن الذكاء الاصطناعي لا يخطئ؟', a: 'لا، فلا نموذج يضمن ذلك. صفر هلوسة هنا قاعدة إجراء: المخرج الذي لا يستشهد بسجل، أو يتضمن رقمًا غير موجود في سجلاته، يُرفض ويظهر مشطوبًا، فلا يصل ادعاء غير مدعوم إلى تقرير كحقيقة. ويبقى المراجع المسمّى يفحص ما يمر.' }
    ],
    sources: [
      { label: 'أودو، ملاحظات إصدار {lat}Odoo 20{/lat}: {lat}"Odoo 20 Release Notes"{/lat} ({lat}24{/lat} سبتمبر {lat}2026{/lat})', url: 'https://www.odoo.com/odoo-20-release-notes' },
      { label: 'مجلس معايير المراجعة والتأكيد الدولية، تحديث مشروع أدلة المراجعة: {lat}"Project update: ISA 500, Audit Evidence"{/lat} (مسودات عرض، أغسطس {lat}2026{/lat})', url: 'https://www.iaasb.org/publications/project-update-isa-500-audit-evidence' }
    ]
  }
};
