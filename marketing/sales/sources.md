# المصادر وما بُني عليها

البحث أُجري في 3 نوفمبر 2026.

**القاعدة:** أغلب «معايير 2026» المنشورة من مدوّنات موردي أدوات، ومنهجها غير منشور. لذلك:
- نأخذ منها **الاتجاه والممارسة**.
- لا نأخذ منها **الأهداف الرقمية**.
- أهدافنا تُبنى من خط أساسنا بعد أول 4 إلى 8 أسابيع.

## 1. حقائق تحقّقنا منها مباشرة

| الحقيقة | الدليل |
|---|---|
| أسعار الباقات، والمؤسسات حتى 25 شركة، والتحصيل بالجنيه فقط، وعرض الإطلاق 50% من أول دورة، وأسعار المقاعد الإضافية | كود `seg-audit` فرع `main@3d0133c8`، الملفان `audit-engine/app/billing/plans.py` و`billing/approvals.py` |
| فحص الميزان من ملف: الاتزان، والأرصدة في غير جانبها، وحقوق الملكية، والتركّز. **لا** المعلّقات أو اليدوي أو الرجعي من الميزان وحده | `reports/trial_balance.py`، `analysis/tb_integrity.py`، `tb_plausibility.py` |
| لوحة الاعتماد: اعتماد داخلي اختياري، ثم اعتماد نهائي لمراجع MFT فقط | `engage/approvals/targets.py`، `auth/roles.py` |
| محرّك الإحالة يحسب 20% على أول فاتورة؛ لا واجهة للشركاء؛ البوابة لا ترسل الكود | `billing/referrals.py`، `billing/router.py` |
| لا white-label، ولا دور شريك، ولا UTM، ولا حدث تسجيل | نفس المستودع (بحث) |
| الربط بنقرة واحدة معطّل؛ الموديول لـOdoo 17 و18 و19 | `portal/src/app/[locale]/connect/page.tsx`، `seg_audit_connector/__manifest__.py` |
| Odoo الخاص بـMFT هو 19.0 Enterprise | `https://erp.seg-audit.com/web/webclient/version_info` |
| التقييم التنبؤي وقواعد التوزيع في Odoo CRM | [توثيق Odoo 18: Lead scoring](https://www.odoo.com/documentation/18.0/applications/sales/crm/track_leads/lead_scoring.html) |
| سعر الصرف ~56 جنيهًا للدولار (بنكي، 29 أكتوبر 2026) | [Arab Finance](https://www.arabfinance.com/en/news/newdetails/us-dollar-weakens-against-egp-on-october-29) |

## 2. الممارسات (اتجاه، لا أرقام)

| الموضوع | المصادر | ما أخذناه |
|---|---|---|
| PLG وPQL والحركة الهجينة | [Enrich Labs](https://www.enrichlabs.ai/blog/product-led-growth-complete-guide-2026) · [GrowthSpree](https://www.growthspreeofficial.com/blogs/b2b-saas-product-qualified-lead-pql-definitions-benchmarks-2026-by-product-type-conversion-rates.md) · [SaaSHero](https://www.saashero.net/content/2026-b2b-saas-conversion-benchmarks/) · [Prospeo](https://prospeo.io/s/go-to-market-strategy-for-b2b-saas) | PQL = ملاءمة + استخدام + حداثة (14–30 يومًا)؛ المنتج يؤهّل والمبيعات تُغلق. **تحويل PQL ← مدفوع ~32% غير موثّق؛ لم يُستخدم هدفًا** |
| برامج الشركاء | [Kolonell](https://kolonell.com/en/blog/accountant-partner-reseller-saas-commission-nairobi-2026) · [Hamster Garage](https://www.hamstergarage.com/article/saas-affiliate-commission-rates-benchmarks-formulas) · [SIPTRUNK](https://www.siptrunk.com/blog/saas-reseller-programs-compared/) · [Chargebee](https://chargebee.com/blog/resellers-advantage-saas-economy) | إحالة 15–25% بتدرّج؛ إعادة بيع 25–40%؛ white-label يعني أن الشريك يفوتر ويملك العلاقة |
| MEDDPICC | [MEDDICC (رسمي)](https://meddicc.com/llm-info) · [Fullcast](https://www.fullcast.com/content/meddpicc/) · [Prospeo](https://prospeo.io/s/meddic-vs-meddpicc) | 8 عناصر؛ تأهيل لا عملية؛ للصفقات المعقدة. **إحصاءات رفع الفوز غير موثّقة** |
| الاقتصاديات | [Data-Mania (Benchmarkit/Aleph)](https://www.data-mania.com/blog/b2b-saas-benchmarks-2026-annual-report/) · [Beancount](https://beancount.io/blog/2026/05/10/saas-metrics-founders-must-track-2026-ltv-cac-nrr-churn-cac-payback-benchmarks-guide) | الوسيط: NRR ~101–102%، واسترداد 16–20 شهرًا. **مرجع الـCEO (115% و6 أشهر) هدف للربع الأعلى، لا متوسط** |
| Outbound المبني على إشارة | [Unify](https://www.unifygtm.com/explore/signal-based-outbound-sequence-templates) · [Apollo](https://www.apollo.io/insights/whats-the-ideal-cadence-for-a-multi-channel-outbound-sequence) · [Autobound](https://www.autobound.ai/blog/outbound-sales-playbook-2026) | الإشارة + تعدد القنوات + القياس بالاجتماعات؛ جودة القائمة أولًا |
| ABM | [Abmatic](https://blog.abmatic.ai/abm-playbook-2026) · [Koka Sexton](https://kokasexton.com/account-based-marketing-signal-intelligence/) · [SaaSHero](https://www.saashero.net/uncategorized/abm-playbook-b2b-saas-2026/) | 3 مستويات بأعداد صارمة؛ لجنة الشراء بالأدوار؛ إشارات مركّبة؛ المقياس pipeline الحسابات المسمّاة |
| LinkedIn والمؤسس | [Metricool](https://metricool.com/linkedin-algorithm/) · [Expandi](https://expandi.io/blog/linkedin-algorithm/) · [Koka Sexton](https://kokasexton.com/?p=1166) | زمن القراءة إشارة مؤكّدة (LinkedIn Engineering 2024)؛ التعليقات الجوهرية؛ الرابط خارج النص. **المضاعِفات والعتبات غير موثّقة** |
| متطلبات البريد | [Red Sift](https://redsift.com/guides/google-and-yahoos-bulk-email-sender-requirements) · [Close](https://help.close.com/technical-support/email-deliverability/requirements-for-bulk-email-senders) | SPF + DKIM + DMARC، وإلغاء بنقرة، وعتبة 5,000/يوم. **عتبة الشكاوى لم تُتحقق من المصدر الرسمي** |
| حماية البيانات | مصر: [Tamimi](https://www.tamimi.com/our-knowledge/publications/general/Articles/from-policy-to-practice-egypt-issues-executive-regulations-of-the-personal-data-protection-law/) · [CMS](https://cms.law/en/are/legal-updates/egypt-s-pdpl-executive-regulations-issued-one-year-compliance-countdown-begins). السعودية: [Clyde & Co](https://www.clydeco.com/en/insights/2025/05/saudi-arabia-new-pdp-law-consultation) · [Tamimi (أكتوبر 2026)](https://www.tamimi.com/news/sdaia-opens-public-consultation-on-proposed-amendments-to-the-pdpl-implementing-regulation/) | موافقة مسبقة وإلغاء مجاني؛ ترخيص محتمل في مصر. **مصادر ثانوية؛ رأي قانوني مطلوب** |
| الاستقلال المهني | [IESBA: Fees pronouncement](https://www.ethicsboard.org/publications/final-pronouncement-revisions-fee-related-provisions-code) | §330 / §410: الأتعاب والمكافآت وتهديد المصلحة الذاتية. **النص الحرفي لأحكام العمولات والقواعد المحلية لم يُتحقق منه** |
