# 08. Odoo CRM: المراحل والفرق والتقييم والأتمتة

**النظام:** `erp.seg-audit.com`، Odoo **19.0 Enterprise**، استضافة خاصة. تحقّقنا من الإصدار عبر `/web/webclient/version_info` في 3 نوفمبر 2026.

**ما لم نتحقق منه:**
- التطبيقات المثبتة (Marketing Automation، Studio، Partner Assignment).
- الإعداد الحالي للمراحل.

**كيف يُطبَّق هذا الملف:**
- كل ما في الجدول يُضبط من الواجهة أو يُستورد من ملفات `odoo/`.
- **التطبيق على Odoo الحي تغيير إعداد دائم:** يحتاج موافقة الـCEO، ويُجرَّب أولًا على نسخة اختبار.
- لا شيء في هذا الـPR يغيّر Odoo.

## 1. الفرق (CRM ← Configuration ← Sales Teams)

| الفريق | يستقبل | قاعدة التوزيع (Assignment Rules ← Domain) |
|---|---|---|
| **مباشر: PLG** | تسجيلات المنصة، الفحص المجاني، النماذج، الإعلانات | `[("x_motion", "in", ["plg", "inbound", "outbound", "founder"])]` |
| **حسابات كبرى: ABM** | حسابات T1/T2، المجموعات | `[("tag_ids.name", "in", ["ABM-T1", "ABM-T2"])]` |
| **الشركاء** | طلبات الشراكة، الصفقات المسجّلة من الشركاء | `[("x_motion", "=", "partner")]` |

**الإعدادات:**
- CRM ← Configuration ← Settings ← **Rule-Based Assignment**، بوضع **Repeatedly** كل ساعة.
- المؤسس عليه **Skip auto assignment**؛ يُسند له يدويًا.

## 2. المراحل (Pipeline)

الاستيراد: [odoo/crm.stage.csv](odoo/crm.stage.csv). المراحل مشتركة بين الفرق. حقل **Requirements** يظهر تلميحًا على المرحلة، ونضع فيه شرط الخروج.

| # | المرحلة | شرط الدخول / الخروج | MEDDPICC الأدنى (من 16) |
|---|---|---|---|
| 1 | جديد · New | Lead تحوّل لفرصة؛ الملاءمة محققة (Odoo، الدور، الدولة) | — |
| 2 | فحص منجز · TB check done | أول تقرير على بيانات الشركة (`report.generated`) | — |
| 3 | PQL / مؤهَّل · Qualified | PQL ≥ 60 ([02](02-plg-pql.md#4-تعريف-pql-ونقاطه))، **أو** اجتماع مؤهَّل من شريك أو ABM أو المؤسس | — |
| 4 | اكتشاف · Discovery | مكالمة اكتشاف منجزة؛ الألم والبطل معروفان | 6 |
| 5 | تقييم · Evaluation | ديمو أو جلسة قراءة على بياناته؛ معايير القرار معروفة؛ المشتري الاقتصادي محدّد | 9 |
| 6 | عرض سعر · Proposal | التقينا بالمشتري الاقتصادي؛ العرض مرسل من Odoo (Quotation) | 11 |
| 7 | تعاقد · Commit | مسار الأوراق معروف؛ خطة عمل مشتركة بتواريخ ([templates/mutual-action-plan.md](templates/mutual-action-plan.md)) | 13 |
| 8 | مدفوع · Won (`is_won`) | **أول فاتورة محصّلة** (تعريف «المقعد المملوء» حتى يحسمه الـCEO، القرار #5) | — |

**الصفقات الصغيرة (PLG، باقة المبتدئة أو المتوسطة)** تنتقل من المرحلة 3 إلى 8 مباشرة. MEDDPICC الكامل للصفقات ≥ المتقدّمة أو المؤسسات أو أي صفقة ABM.

**أسباب الخسارة:** [odoo/crm.lost.reason.csv](odoo/crm.lost.reason.csv). لا تُغلق فرصة بلا سبب.

## 3. الحقول المخصّصة (Studio على `crm.lead`)

| الحقل | النوع | القيم / الملاحظة |
|---|---|---|
| `x_motion` | Selection | `plg`، `partner`، `abm`، `founder`، `outbound`، `inbound`، `event` (الحركة المصدر، لحساب CAC لكل حركة) |
| `x_pql_score` | Integer | 0–100 ([02 §4](02-plg-pql.md#4-تعريف-pql-ونقاطه)) |
| `x_account_score` | Integer | 0–100 ([05 §3](05-abm.md#3-ترتيب-الحساب-account-score)) |
| `x_partner_id` | Many2one ← `res.partner` | الشريك المحيل أو الوكيل (فلتر: Tag `Partner`) |
| `x_partner_track` | Selection | `referral`، `reseller`، `practice` |
| `x_deal_reg_expiry` | Date | نهاية حماية الصفقة المسجّلة |
| `x_odoo_hosting` | Selection | `online`، `odoo_sh`، `on_premise`، `none` (Odoo Online = لا موديولات مخصّصة) |
| `x_odoo_version` | Selection | `17`، `18`، `19`، `other` |
| `x_entities` | Integer | عدد الكيانات أو الشركات |
| `x_platform_org` | Char | معرّف المؤسسة على المنصة (للمطابقة اليدوية مع سجل التدقيق) |
| `x_mdp_metrics` … `x_mdp_competition` | Selection `0/1/2` × 8 | نقاط MEDDPICC ([09](09-meddpicc.md)) |
| `x_mdp_notes` | Html | ملاحظات MEDDPICC بالقالب |
| `x_mdp_total` | Integer | يُحسب بقاعدة الأتمتة 5 |

**الحقول الأصلية المستخدمة:**
- **Campaign / Medium / Source** (UTM)
- **Tags**
- **Expected Revenue** (= ACV السنوي)
- **Expected Closing**
- **Probability** (التقييم التنبؤي)
- **Lost Reason**

## 4. الوسوم (Tags)

الاستيراد: [odoo/crm.tag.csv](odoo/crm.tag.csv). مجموعاتها:

| المجموعة | الوسوم |
|---|---|
| المنتج | `TB-check-done`، `Odoo-connected`، `Invited-teammate`، `Quota-reached`، `PQL`، `PQL-candidate` |
| الحركة | `Partner-sourced`، `Partner-application`، `Founder-sourced`، `ABM-T1`، `ABM-T2`، `ABM-T3`، `Webinar` |
| تسلسلات | `OB-A-new-CFO`، `OB-B-Odoo-hiring`، `OB-C-engaged`، `N1`، `N2`، `N3`، `N4` |
| السوق | `EG`، `SA`، `AE`، `EN-speaker` |
| الحالة | `Founding-member`، `Independence-auditor-of-record` |

## 5. التقييم (Lead scoring): طبقتان

1. **التقييم التنبؤي الأصلي في Odoo:**
   - يعمل دائمًا، ويتعلم من الفرص الرابحة والخاسرة.
   - المرحلة والفريق متغيّران ثابتان.
   - من CRM ← Configuration ← Settings ← **Update Probabilities**:
     - فعّل: **Country**، و**Source**، و**Tags**، و**Email Quality**، و**Phone Quality**.
     - وتاريخ البداية = يوم بدء الإطلاق.
   - **لن يكون دقيقًا قبل وجود تاريخ كافٍ** من الرابح والخاسر؛ يُقرأ بحذر في أول ربع.
2. **التقييم القاعدي (يدوي حتى تُبنى أحداث المنتج):**
   - `x_pql_score` و`x_account_score` بالجداول في [02](02-plg-pql.md) و[05](05-abm.md).
   - يُحدَّثان في التمريرة اليومية ([workflow/06](../workflow/06-sales-operating-rhythm.md)) من لوحة إدارة المنصة وسجل التدقيق.

**قاعدة التوجيه** (Assignment domain على عضو فريق PLG الأول):

```
[("x_pql_score", ">=", 60)]
```

## 6. الأتمتة (Settings ← Technical ← Automation Rules)

| # | المشغّل | الشرط | الإجراء |
|---|---|---|---|
| 1 | On save | أُضيف Tag `PQL` | انقل للمرحلة 3؛ نشاط «اتصال PQL» موعده **اليوم** للمسؤول |
| 2 | On creation | `x_motion = partner` أو Source = `partner` | الفريق = الشركاء؛ نشاط «مراجعة تسجيل الصفقة» خلال يوم عمل؛ `x_deal_reg_expiry` = اليوم + مدة حماية مستوى الشريك |
| 3 | Based on date field | `x_deal_reg_expiry` بعد 7 أيام | نشاط لمدير الشركاء: «تمديد أو إغلاق التسجيل» |
| 4 | Based on date field (Last stage update + 7 أيام) | المرحلة ≥ 4 ولا نشاط مفتوح | نشاط للمسؤول + متابع: مدير المبيعات |
| 5 | On save | تغيّر أي حقل `x_mdp_*` | إجراء Execute Code (أدناه) يحسب `x_mdp_total` |
| 6 | Stage set to | مدفوع (Won) | نشاط «جلسة إعداد» خلال 3 أيام عمل؛ نشاط «QBR» بعد 90 يومًا. الموديول `website_mft` في كود المنصة يُنشئ المؤسسة عند Won، لكن ملفه يذكر أنه **لم يُشغَّل داخل Odoo** بعد؛ يُختبر على نسخة اختبار أولًا |
| 7 | On save | Tag `Independence-auditor-of-record` موجود و`x_partner_track` ≠ فارغ | نشاط تحذير للـCEO: «لا عمولة على عميل مراجعة» |

**كود القاعدة 5:**

```python
fields = ['x_mdp_metrics', 'x_mdp_economic_buyer', 'x_mdp_decision_criteria', 'x_mdp_decision_process',
          'x_mdp_paper_process', 'x_mdp_pain', 'x_mdp_champion', 'x_mdp_competition']
for rec in records:
    rec['x_mdp_total'] = sum(int(rec[f] or 0) for f in fields)
```

## 7. التقارير ولوحة المبيعات (CRM ← Reporting ← Pipeline)

| التقرير | التجميع | يجيب عن |
|---|---|---|
| Pipeline حسب الحركة | `x_motion` × Stage، المقياس: Expected Revenue | أي حركة تملأ الـpipeline |
| التحويل بين المراحل | Stage (Won/Lost) حسب `x_motion` | أين نخسر |
| PQL | Tag `PQL` حسب أسبوع الإنشاء | حجم PQL والتحويل |
| الشركاء | `x_partner_id` × Stage | من الشريك النشط فعلًا |
| أسباب الخسارة | Lost Reason × `x_motion` | ماذا نصلح |
| CAC لكل حركة | Accounting: حسابات تحليلية `S&M/*` ÷ Won حسب `x_motion` | الرقم المرجعي ([00](00-economics.md)) |

## 8. خطوات التطبيق (بعد الموافقة)

1. نسخة اختبار من قاعدة البيانات (Odoo.sh staging أو نسخة محلية).
2. Studio: الحقول في القسم 3.
3. استيراد `crm.tag.csv` و`crm.lost.reason.csv` و`crm.stage.csv`: Favorites ← Import records.
4. الفرق وقواعد التوزيع.
5. قواعد الأتمتة 1–7؛ تجربة كل قاعدة على Lead اختباري مكتوب عليه «delete me».
6. تحديث الاحتمالات (Update Probabilities).
7. المراجعة مع الـCEO، ثم التكرار على Odoo الحي.
