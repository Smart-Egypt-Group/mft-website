# حزمة الإعلانات المدفوعة الجاهزة للإطلاق (Meta + TikTok)

> **مستند تجهيزي فقط.** لم تُنشأ أي حملة، ولم يُلمس أي حساب إعلاني، ولم يُصرف شيء.
> الـCEO هو من يشحن الحساب، ويحدد الميزانية، ويطلق بنفسه باتباع القسم 6.
>
> **المراجع:** القواعد العامة في [`workflow/03-paid-ads.md`](../workflow/03-paid-ads.md)، ومخطط UTM في [`workflow/05-kpis-and-reporting.md`](../workflow/05-kpis-and-reporting.md#utm-scheme)، واقتصاديات CAC في [`00-economics.md`](00-economics.md).
> **يحلّ محل:** نسخ [`content/week-1/ads.md`](../content/week-1/ads.md)، التي كُتبت والعدّاد مُطفأ.
>
> **تاريخ الإعداد:** 4 نوفمبر 2026.

---

## 0. بوابة ما قبل الإطلاق (لا تُطلَق أي حملة قبل اكتمالها)

| # | البند | الحالة (4 نوفمبر 2026) | من يؤكد |
|---|---|---|---|
| **G1** | **الطُعم شغّال نظيف.** #966 و#967 لم يُدمجا منفردين؛ أُغلقا ودُمجا معًا في **#968** (`COMBINED-966-967`) على `main` في `Smart-Egypt-Group/seg-audit`، commit `8452417`، 3 نوفمبر 21:52 UTC، وCI على `main` أخضر | ✅ الكود مدموج · ☐ **النشر على الإنتاج غير متحقق** (لا workflow نشر ظاهر في المستودع) | ياسر |
| **G1-b** | **اختبار يدوي على الإنتاج:** سجّل من رابط إعلان (بـUTM)، وارفع ميزان مراجعة تجريبيًا، وتأكد أن المؤشرات الخمسة تظهر في دقائق، وأن التقرير بلا نموذج | ☐ | الـCEO بحساب اختبار، يُحذف بعدها |
| **G2** | **تمرير UTM من الموقع إلى التسجيل.** الوجهة `www.seg-audit.com`، لكن أزرار الموقع تكتب UTM ثابتًا (`utm_source=website&utm_medium=owned`) فوق UTM الإعلان (تحققت منه على الموقع الحي). بدون الإصلاح **لا يُعرف أي إعلان جاب أي تسجيل** | ☐ **عائق للوجهة المختارة.** الإصلاح سكربت صغير في الموقع يمرّر `utm_*` القادمة إلى روابط `app.seg-audit.com` | فريق الموقع |
| **G3** | **التطبيق يحفظ UTM التسجيل** في سجل الحساب، ويرسل Lead لـCRM بالمصدر ([03 §0](../workflow/03-paid-ads.md), البندان 5 و6) | ☐ غير متحقق | ياسر |
| **G4** | **تتبع التحويل:** Meta Pixel + Conversions API وTikTok Pixel + Events API على `app.seg-audit.com`، بحدث `CompleteRegistration` | ☐ **لم أجد أي بكسل في صفحة التسجيل العامة** (فحص للقراءة فقط). حتى يتم: الحملات على هدف **الزيارات/النقرات** فقط | ياسر |
| **G5** | الحساب الإعلاني والدفع وتحقق النطاق `seg-audit.com` ([03 §0](../workflow/03-paid-ads.md)، البنود 1–3) | ☐ | الـCEO |
| **G6** | **الأرقام على التصاميم مطابقة للموقع:** «باقي 33 من 50». راجع `src/site.config.js → founding.filled` يوم الإطلاق | ☐ صباح الإطلاق | الـCEO |
| **G7** | **سياسة الخصوصية** تذكر بكسلات الإعلانات قبل تفعيلها (G4) | ☐ عند تفعيل G4 | القانوني |

**قاعدة:** G1 وG1-b وG5 وG6 شرط لأي إطلاق. G2 شرط لإطلاق بوجهة `www`. وإن تأخر G2، فالبديل المؤقت: الوجهة مباشرة إلى `https://app.seg-audit.com/ar/signup?…` بنفس UTM، وهو المسار الأصلي في 03. هذا قرار الـCEO.

---

## 1. الهدف

| | المرحلة 1 (الآن، بلا بكسل) | المرحلة 2 (بعد G4) |
|---|---|---|
| **هدف الحملة** | Meta: **Traffic**، والتحسين على **Link clicks** · TikTok: **Traffic**، والتحسين على **Click** | Meta: **Leads** أو **Sales** على `CompleteRegistration` · TikTok: **Website conversions** |
| **الوجهة** | صفحة الأعضاء المؤسِّسين، وفيها قسم الفحص المجاني | التسجيل مباشرة، أو الموقع بعد G2 |
| **ما يُقاس** | النقرات، وCTR، وCPC في المنصة. والتسجيلات حسب `utm_content` من التطبيق (بعد G2 وG3) | تكلفة التسجيل داخل المنصة، ثم تكلفة المقعد المدفوع في CRM |

**روابط الوجهة:**

| | الرابط |
|---|---|
| إعلانات **الطُعم** | `https://www.seg-audit.com/ar/founding-members/?…#fm-check`، وتفتح على قسم الفحص المجاني |
| إعلانات **المقاعد** | `https://www.seg-audit.com/ar/founding-members/?…` |
| الإنجليزي | `/en/founding-members/` |

> **UTM: قراران يختلفان عن نص الطلب، عن قصد:**
> - **`utm_campaign=founding-members-2026`** لا `founding_members`. هذه القيمة مستخدمة فعلًا منذ 3 نوفمبر في أزرار الموقع ومنشورات اليوم العضوية، والمخطط يمنع تغييرها أثناء الحملة؛ تغييرها يقسم تقرير الإطلاق إلى حملتين. لو أردت `founding_members` فهو استبدال نصي واحد في هذا الملف.
> - **`utm_source=meta`** (كما طلبت) بدل `facebook`/`instagram` في المخطط القديم، لأن مواضع Advantage+ تجمع المنصتين. أُضيفت `meta` إلى المخطط في 05.

---

## 2. الجمهور

**الدول:** مصر والسعودية.

**الأدوار المستهدفة:** المدير المالي (CFO)، ورئيس الحسابات، والمراجع الداخلي، ومكاتب المحاسبة والمراجعة، ومستخدمو Odoo، وصاحب الشركة.

> أسماء الاهتمامات والوظائف تختلف حسب المنصة ووقت الإنشاء. **ابحث عن كل اسم في الواجهة، واستخدم الموجود منه فقط.** لا تضف بديلًا عامًا غير ذي صلة، مثل «Finance» وحدها التي تجلب مستثمري الأسهم.

### Meta (Facebook + Instagram)

| | المجموعة 1: `eg-finance` | المجموعة 2: `sa-finance` | المجموعة 3: `odoo-firms` |
|---|---|---|---|
| **الموقع** | مصر: القاهرة الكبرى، والإسكندرية، والدلتا والقناة، أو مصر كلها | السعودية: الرياض، وجدة، والدمام والخبر | مصر + السعودية |
| **العمر** | 28–60 | 28–60 | 25–60 |
| **اللغة** | العربية | العربية (والإعلان الإنجليزي بلغة English) | العربية |
| **الاهتمامات** | Accounting، Auditing، Internal audit، Bookkeeping، Financial statement، Corporate finance، Certified Public Accountant، IFRS | نفسها + Zakat، VAT، ZATCA (إن وُجدت) | **Odoo**، Enterprise resource planning، ERP software، SAP، Microsoft Dynamics، QuickBooks، Accounting software |
| **الوظائف** (Demographics → Work → Job title، إن ظهرت) | Chief Financial Officer، Finance Manager، Financial Controller، Chief Accountant، Internal Auditor، Auditor، Accountant | نفسها | Accountant، Auditor، ERP Consultant، Odoo Consultant |
| **السلوك** | Small business owners، Business page admins | نفسها | Business page admins |
| **Advantage+ audience** | **مطفأ** طوال أسبوع الاختبار، حتى تبقى المقارنة بين المجموعات نظيفة | مطفأ | مطفأ |

**الاستبعاد:** متفاعلو الصفحة في آخر 30 يومًا، إن أردت قصر الاختبار على جمهور بارد.

### TikTok

| | المجموعة 1: `eg-finance` | المجموعة 2: `sa-finance` |
|---|---|---|
| **الموقع** | مصر | السعودية |
| **العمر** | 25–34، 35–44، 45–54 | نفسها |
| **اللغة** | العربية | العربية |
| **الاهتمامات** (Interests) | Business & Finance: Financial Services، Business Services، Accounting · Tech: Business Software | نفسها |
| **السلوك** (Video interactions، 15 يومًا) | تفاعل مع فيديوهات Business & Finance وEducation | نفسها |
| **الهاشتاجات** (Hashtag interactions) | `#محاسبة` `#محاسب` `#مراجعة` `#Odoo` `#اودو` `#ضرائب` | `#محاسبة` `#محاسب` `#زكاة` `#الزكاة_والضريبة` `#Odoo` |
| **Targeting expansion** | مطفأ | مطفأ |

TikTok جمهوره أصغر سنًّا وأقل تخصصًا. لذلك هو **اختبار** هنا، ويبقى فقط إن حقق قواعد القسم 5.

---

## 3. البنية

```
Meta  ── SEG-FM | Meta | Traffic | prospecting | ar | 2026-11            (حملة واحدة، ميزانية على مستوى المجموعة)
         ├─ eg-finance   → m-eg-bait-ar · m-eg-seats-ar
         ├─ sa-finance   → m-sa-bait-ar · m-sa-seats-ar · m-sa-bait-en
         └─ odoo-firms   → m-odoo-bait-ar · m-odoo-seats-ar

TikTok ── SEG-FM | TikTok | Traffic | prospecting | ar | 2026-11          (حملة واحدة، ميزانية على مستوى المجموعة)
         ├─ eg-finance   → t-eg-bait-ar · t-eg-seats-ar
         └─ sa-finance   → t-sa-bait-ar · t-sa-seats-ar
```

- **اختبار الجمهور:** بين المجموعات، بنفس الرسالتين في كل مجموعة.
- **اختبار الرسالة:** داخل كل مجموعة، **«الطُعم» (bait)** مقابل **«المقاعد» (seats)**.
- **اسم الإعلان = قيمة `utm_content`** نفسها، حتى يُقرأ التقرير بلا جدول تحويل.
- **الميزانية على مستوى المجموعة:** Meta ABO، أي Advantage campaign budget مطفأ. وTikTok ميزانية الحملة بلا حد. السبب أن ميزانية الحملة الموحّدة ترسل المال لمجموعة واحدة مبكرًا وتفسد الاختبار.

---

## 4. الإعلانات

### الصياغة المعتمدة (لا تُغيَّر)

- **الطُعم:** «فحص مجاني لميزان شركتك يكشف نقاط الخطر في دقائق». مؤشرات من الميزان فقط. **لا** «تقرير مجاني» ولا «تقرير مراجعة».
- **المقاعد:** «50 مقعد. انضمّت 17 شركة. باقي 33.» بسعر مؤسِّس مدى الحياة.
- **المنصة:** SEG Audit، وحدة المراجعة المستمرة في **SEG (Standard Enterprise Governance)** من MFT.
- **الثقة:** قراءة فقط، ولكل ملاحظة دليلها.

**ممنوع:** نسب توفير أو «أسرع بـX%»، وأسماء عملاء، والإيموجي في نصوص TikTok.

### ملفات التصاميم

كلها في `marketing/designs/ads/`، بنسختي JPG وWebP. **ارفع JPG.**

| النسخة | Feed 4:5 | Feed 1:1 | Stories / Reels / TikTok 9:16 |
|---|---|---|---|
| **bait-ar** («متاح الآن» + الفحص المجاني) | `meta-feed-4x5_live-ar_1080x1350.jpg` | `meta-feed-1x1_live-ar_1080x1080.jpg` | `tiktok-9x16_live-ar_1080x1920.jpg` |
| **seats-ar** (باقي 33 من 50) | `meta-feed-4x5_seats-ar_1080x1350.jpg` | `meta-feed-1x1_seats-ar_1080x1080.jpg` | `tiktok-9x16_seats-ar_1080x1920.jpg` |
| **bait-en** | `meta-feed-4x5_live-en_1080x1350.jpg` | `meta-feed-1x1_live-en_1080x1080.jpg` | `tiktok-9x16_live-en_1080x1920.jpg` |
| **seats-en** (احتياطي) | `meta-feed-4x5_seats-en_1080x1350.jpg` | `meta-feed-1x1_seats-en_1080x1080.jpg` | `tiktok-9x16_seats-en_1080x1920.jpg` |

**ملاحظات على التصاميم:**
- ملف 9:16 نفسه يُستخدم لمواضع Stories وReels في Meta.
- زر الدعوة المرسوم على التصاميم يقول `app.seg-audit.com`، والوجهة `www`. لا مشكلة في المراجعة، لكنه اختلاف بصري. إن أردت التطابق، أعيد توليد التصاميم بالنطاق `seg-audit.com`.
- **TikTok** في مواضعه الأساسية يحتاج **فيديو**. حوّل الصورة لفيديو 6–10 ثوانٍ بأداة **Video templates / Smart video** داخل TikTok Ads Manager، أو ارفع MP4 منها. بدائل جاهزة بالحركة: إطارات `designs/concepts/video/`.

### Meta: الحدود والمواضع

| الحقل | الحد |
|---|---|
| النص الأساسي | يظهر أول ~125 حرفًا قبل «المزيد» |
| العنوان | ≤ 40 |
| الوصف | ≤ 30 |

**المواضع:** Advantage+ placements، مع **استبعاد Audience Network** لجودة الزيارات.

**تعيين الملف حسب الموضع** (Customize asset per placement):

| الموضع | الملف |
|---|---|
| Feeds | 4:5 |
| Stories وReels | 9:16 |
| Right column وSearch | 1:1 |

#### `m-eg-bait-ar` · مجموعة eg-finance · الطُعم

- **النص الأساسي:**
  > فحص مجاني لميزان شركتك يكشف نقاط الخطر في دقائق.
  >
  > ارفع ميزان آخر شهر مقفول، وشوف: حسابات معلّقة، وأرصدة شاذة، وعدم اتزان، وقيود يدوية كثيفة، وتواريخ رجعية. مؤشرات من الميزان فقط، مش تقرير مراجعة كامل.
  >
  > SEG Audit من MFT: قراءة فقط، ولكل ملاحظة دليلها.
- **العنوان:** افحص ميزان شركتك مجانًا
- **الوصف:** نقاط الخطر في دقائق
- **زر الدعوة:** Sign up (التسجيل)
- **الرابط:** `https://www.seg-audit.com/ar/founding-members/?utm_source=meta&utm_medium=paid&utm_campaign=founding-members-2026&utm_content=m-eg-bait-ar#fm-check`
- **التصميم:** `ads/meta-feed-4x5_live-ar_1080x1350.jpg` · `ads/meta-feed-1x1_live-ar_1080x1080.jpg` · `ads/tiktok-9x16_live-ar_1080x1920.jpg`

#### `m-eg-seats-ar` · مجموعة eg-finance · المقاعد

- **النص الأساسي:**
  > 50 مقعد بس للأعضاء المؤسِّسين في SEG Audit. انضمّت 17 شركة، وباقي 33.
  >
  > سعر مؤسِّس يفضل معاك مدى الحياة، والعضو المؤسِّس بيشتغل مع فريق MFT مباشرة في الإعداد. ابدأ بفحص مجاني لميزان شركتك يكشف نقاط الخطر في دقائق.
- **العنوان:** باقي 33 مقعد من 50
- **الوصف:** سعر مؤسِّس مدى الحياة
- **زر الدعوة:** Sign up (التسجيل)
- **الرابط:** `https://www.seg-audit.com/ar/founding-members/?utm_source=meta&utm_medium=paid&utm_campaign=founding-members-2026&utm_content=m-eg-seats-ar`
- **التصميم:** `ads/meta-feed-4x5_seats-ar_1080x1350.jpg` · `ads/meta-feed-1x1_seats-ar_1080x1080.jpg` · `ads/tiktok-9x16_seats-ar_1080x1920.jpg`

#### `m-sa-bait-ar` · مجموعة sa-finance · الطُعم

- **النص الأساسي:**
  > فحص مجاني لميزان شركتك يكشف نقاط الخطر في دقائق.
  >
  > ارفع ميزان المراجعة لآخر شهر مقفل، واعرف الحسابات المعلّقة والأرصدة الشاذة والقيود اليدوية والتواريخ الرجعية قبل الإقفال. مؤشرات من الميزان فقط، لا تقرير مراجعة كامل.
  >
  > SEG Audit من MFT: قراءة فقط من نظامك، ولكل ملاحظة دليلها.
- **العنوان:** افحص ميزان شركتك مجانًا
- **الوصف:** نقاط الخطر في دقائق
- **زر الدعوة:** Sign up (التسجيل)
- **الرابط:** `https://www.seg-audit.com/ar/founding-members/?utm_source=meta&utm_medium=paid&utm_campaign=founding-members-2026&utm_content=m-sa-bait-ar#fm-check`
- **التصميم:** نفس ملفات `live-ar` أعلاه

#### `m-sa-seats-ar` · مجموعة sa-finance · المقاعد

- **النص الأساسي:**
  > 50 مقعدًا فقط للأعضاء المؤسِّسين في SEG Audit. انضمّت 17 شركة، وبقي 33.
  >
  > سعر مؤسِّس يبقى لك مدى الحياة، وفريق MFT يعمل معك مباشرة في الإعداد. ابدأ بفحص مجاني لميزان شركتك يكشف نقاط الخطر في دقائق.
- **العنوان:** باقي 33 مقعدًا من 50
- **الوصف:** سعر مؤسِّس مدى الحياة
- **زر الدعوة:** Sign up (التسجيل)
- **الرابط:** `https://www.seg-audit.com/ar/founding-members/?utm_source=meta&utm_medium=paid&utm_campaign=founding-members-2026&utm_content=m-sa-seats-ar`
- **التصميم:** نفس ملفات `seats-ar` أعلاه

#### `m-sa-bait-en` · مجموعة sa-finance · الطُعم بالإنجليزية

**اللغة:** إن أمكن، لغة هذا الإعلان English عبر **Multiple languages** في الإعلان. وإلا فمجموعة رابعة صغيرة `sa-finance-en`.

- **Primary text:**
  > A free check of your company’s trial balance that flags its risk points in minutes.
  >
  > Upload last month’s closed trial balance and see suspense balances, abnormal balances, imbalance, heavy manual entries and back-dated entries. Indicators from the trial balance only, not a full audit report.
  >
  > SEG Audit by MFT: read-only, every finding with its evidence.
- **Headline:** Check your trial balance free
- **Description:** Risk points in minutes
- **CTA:** Sign up
- **Link:** `https://www.seg-audit.com/en/founding-members/?utm_source=meta&utm_medium=paid&utm_campaign=founding-members-2026&utm_content=m-sa-bait-en#fm-check`
- **Design:** `ads/meta-feed-4x5_live-en_1080x1350.jpg` · `ads/meta-feed-1x1_live-en_1080x1080.jpg` · `ads/tiktok-9x16_live-en_1080x1920.jpg`

#### `m-odoo-bait-ar` · مجموعة odoo-firms · الطُعم

- **النص الأساسي:**
  > شركتك أو عملاءك على Odoo؟
  >
  > فحص مجاني لميزان شركتك يكشف نقاط الخطر في دقائق. وبعده SEG Audit يقرأ دفاتر Odoo باستمرار، بصلاحية قراءة فقط: 361 فحصًا في 22 تقريرًا، ولكل ملاحظة دليلها.
  >
  > مكاتب المحاسبة: حساب واحد لحد 25 شركة.
- **العنوان:** افحص ميزان Odoo مجانًا
- **الوصف:** SEG Audit من MFT
- **زر الدعوة:** Learn more (معرفة المزيد)
- **الرابط:** `https://www.seg-audit.com/ar/founding-members/?utm_source=meta&utm_medium=paid&utm_campaign=founding-members-2026&utm_content=m-odoo-bait-ar#fm-check`
- **التصميم:** نفس ملفات `live-ar` أعلاه

#### `m-odoo-seats-ar` · مجموعة odoo-firms · المقاعد

- **النص الأساسي:**
  > مراجعة مستمرة لدفاتر Odoo، من غير ما تستنى آخر السنة.
  >
  > 50 مقعد بس للأعضاء المؤسِّسين في SEG Audit: انضمّت 17 شركة، وباقي 33. سعر مؤسِّس مدى الحياة. ابدأ بفحص مجاني لميزانك.
- **العنوان:** باقي 33 مقعد من 50
- **الوصف:** لشركات Odoo ومكاتبها
- **زر الدعوة:** Sign up (التسجيل)
- **الرابط:** `https://www.seg-audit.com/ar/founding-members/?utm_source=meta&utm_medium=paid&utm_campaign=founding-members-2026&utm_content=m-odoo-seats-ar`
- **التصميم:** نفس ملفات `seats-ar` أعلاه

### TikTok

**الحقول:**
- **نص الإعلان:** 1–100 حرف، بلا إيموجي.
- **الهوية:** Custom identity «Modern Financial Technology» + شعار MFT. أو حساب TikTok الرسمي إن كان مربوطًا، فيتيح Spark Ads لاحقًا.

| الإعلان | المجموعة | النص | زر الدعوة | الرابط | التصميم |
|---|---|---|---|---|---|
| `t-eg-bait-ar` | eg-finance | فحص مجاني لميزان شركتك يكشف نقاط الخطر في دقائق. مؤشرات من الميزان فقط. | Sign up | `https://www.seg-audit.com/ar/founding-members/?utm_source=tiktok&utm_medium=paid&utm_campaign=founding-members-2026&utm_content=t-eg-bait-ar#fm-check` | `ads/tiktok-9x16_live-ar_1080x1920.jpg` (يُحوَّل لفيديو) |
| `t-eg-seats-ar` | eg-finance | 50 مقعد بسعر مؤسِّس مدى الحياة. انضمّت 17 شركة، باقي 33. احجز مقعدك. | Sign up | `https://www.seg-audit.com/ar/founding-members/?utm_source=tiktok&utm_medium=paid&utm_campaign=founding-members-2026&utm_content=t-eg-seats-ar` | `ads/tiktok-9x16_seats-ar_1080x1920.jpg` (يُحوَّل لفيديو) |
| `t-sa-bait-ar` | sa-finance | فحص مجاني لميزان شركتك يكشف نقاط الخطر في دقائق، قبل الإقفال. | Sign up | `https://www.seg-audit.com/ar/founding-members/?utm_source=tiktok&utm_medium=paid&utm_campaign=founding-members-2026&utm_content=t-sa-bait-ar#fm-check` | `ads/tiktok-9x16_live-ar_1080x1920.jpg` (يُحوَّل لفيديو) |
| `t-sa-seats-ar` | sa-finance | 50 مقعدًا بسعر مؤسِّس مدى الحياة. انضمّت 17 شركة، وبقي 33. | Sign up | `https://www.seg-audit.com/ar/founding-members/?utm_source=tiktok&utm_medium=paid&utm_campaign=founding-members-2026&utm_content=t-sa-seats-ar` | `ads/tiktok-9x16_seats-ar_1080x1920.jpg` (يُحوَّل لفيديو) |

---

## 5. الميزانية والقواعد

### ميزانية الاختبار (قيم مقترحة، يعدّلها الـCEO)

| المنصة | المجموعات | يومي لكل مجموعة | يومي | 7 أيام |
|---|---|---|---|---|
| Meta | 3 | **15$** | 45$ | **315$** |
| TikTok | 2 | **20$** | 40$ | **280$** |
| **الإجمالي** | | | **85$** | **≈ 595$** |

- **TikTok:** الحد الأدنى للميزانية اليومية للمجموعة عنده كان 20$. **تحقق منه في الواجهة وقت الإنشاء.**
- **حد إنفاق الحساب** (Account spending limit): 650$ لأسبوع الاختبار، أي الإجمالي وهامش 10%. هذا هو التوقف الصلب.
- **عملة الحساب ومنطقته الزمنية لا تتغيران بعد الإنشاء.** المقترح: USD، وتوقيت القاهرة.

### من CAC ≤ 2,500$ إلى سقف تكلفة النتيجة

CAC في [00](00-economics.md) **شامل**: الإعلانات + الأدوات + وقت الفريق + العمولات. لذلك:

**افتراض 1 (يعدّله الـCEO):** الإعلانات = 50% من CAC، أي حتى **1,250$ إعلانات لكل عميل مدفوع**.

| معدل التسجيل ← مدفوع (افتراض، لم يُقَس بعد) | أقصى تكلفة لكل تسجيل |
|---|---|
| 5% | 62$ |
| 10% | 125$ |
| 20% | 250$ |

**افتراض 2:** معدل نقرة ← تسجيل 5%. فأقصى تكلفة نقرة = تكلفة التسجيل × 5% (مثلًا 125$ × 5% ≈ 6$).

**سقف التشغيل في الأسبوع 1 (T):**
- **125$ لكل تسجيل**، أي سيناريو 10%.
- يُستبدل بالفعلي بعد أول 20 تسجيلًا مدفوع المصدر، وبعد أول عملاء مدفوعين.
- **لا يُعدّ CAC محققًا** إلا من CRM: مقاعد مدفوعة ÷ صرف الحملة، لا من تقرير المنصة.

**ما يُقرأ في الأسبوع 1:**
- بلا بكسل (G4)، المنصات لا ترى التسجيل. فالقرار اليومي على **مؤشرات النقر**.
- والقرار الأسبوعي على **التسجيلات حسب `utm_content`** من التطبيق، إن تحقق G2 وG3.

### قاعدة إيقاف الخاسر

| الإشارة | الإجراء |
|---|---|
| إعلان صرف **2 × T** (أي 250$) بلا تسجيل واحد، بعد G2/G3 | إيقاف الإعلان |
| **Meta:** Link CTR < **0.5%** بعد 2,000 ظهور، أو CPC > **ضعف وسيط الحساب** بعد 3 أيام | إيقاف الإعلان |
| **TikTok:** معدل مشاهدة ثانيتين < **30%**، أو CTR < **0.5%** بعد 2,000 ظهور | إيقاف الإعلان |
| تكلفة التسجيل للمجموعة > **1.5 × T** لـ3 أيام متتالية بعد فترة التعلّم | إيقاف المجموعة، ونقل ميزانيتها لأفضل مجموعة |
| التكرار > **3.0** خلال 7 أيام مع ارتفاع التكلفة | تصميم جديد، لا زيادة ميزانية |
| تعليقات سلبية > 5%، أو أي تحذير سياسة | إيقاف وتصعيد للـCEO في نفس اليوم |
| الصفحة أو التسجيل لا يعمل | **إيقاف كل شيء فورًا** |
| `founding.filled` تغيّر | إيقاف إعلانات المقاعد، واستبدالها بتصاميم الرقم الجديد |
| اكتمال الخمسين مقعدًا | إيقاف كل الحملات في نفس اليوم |

**فترة التعلّم:** لا تعديل على المجموعة أول 3 أيام، إلا للتوقفات الصلبة.

### قاعدة مضاعفة الفائز

| الإشارة | الإجراء |
|---|---|
| تكلفة التسجيل للمجموعة **≤ 0.8 × T** لـ3 أيام، مع ≥ 10 تسجيلات | زيادة يومية **+20%**، مرة كل 48 ساعة على الأكثر |
| رسالة فازت (الطُعم أو المقاعد) داخل مجموعتين أو أكثر، بفارق ≥ 30% في تكلفة التسجيل أو في CTR إن لم تتوفر التسجيلات، وبعد ≥ 1,000 نقرة للرسالة | إيقاف الرسالة الخاسرة، ونسخة جديدة من الفائزة بصياغة ثانية لاختبار الجولة التالية |
| المجموعة حافظت على تكلفتها بعد زيادتين | **نسخ** المجموعة بميزانية +50% بدل زيادة الأصلية |
| الصرف الأسبوعي سيتجاوز الميزانية المعتمدة | توقف عن التوسيع، واطلب اعتمادًا جديدًا من الـCEO |

كل تغيير يُسجَّل في [`workflow/templates/ad-change-log.csv`](../workflow/templates/ad-change-log.csv).

---

## 6. دليل الإطلاق اليدوي (للـCEO)

> الواجهات تتغير. أسماء الأزرار أدناه هي الشائعة وقت الكتابة. إن اختلف اسم، ابحث عن الوظيفة نفسها.

### أ) Meta Ads Manager

**1. الإعداد (مرة واحدة)، في `business.facebook.com` → Business settings:**
- [ ] الحساب الإعلاني باسم الشركة، ومسؤولان بتحقق ثنائي.
- [ ] الصفحة (MFT) وحساب Instagram مربوطان بالـBusiness.
- [ ] **Brand safety → Domains:** أضف `seg-audit.com` وتحقق منه بسجل **DNS TXT**. لا تحقق بوسم meta في الموقع، لأنه يتطلب نشرًا.
- [ ] **Billing & payments:**
  - وسيلة دفع باسم الشركة.
  - **Account spending limit = 650$**.
  - **ملاحظة:** بعض البطاقات المصرية لها حد للمدفوعات الدولية؛ تأكد مع البنك قبل الإطلاق.
- [ ] (المرحلة 2، بعد G4) **Events Manager → Connect data sources → Web**:
  - بكسل / Dataset باسم `SEG app`.
  - يركّبه فريق التطبيق على `app.seg-audit.com` مع Conversions API.
  - حدث `CompleteRegistration`.
  - تأكد بـ**Test events**.

**2. الحملة:** Ads Manager → **Create**
- [ ] **Objective: Traffic**، ثم Continue.
- [ ] **الاسم:** `SEG-FM | Meta | Traffic | prospecting | ar | 2026-11`.
- [ ] **Special ad categories:** لا شيء، فالإعلان عن برنامج مراجعة، لا عن ائتمان أو تمويل. إن طلبت Meta تصنيف «Financial products and services» فاتبع تعليماتها وقت الإنشاء.
- [ ] **Advantage campaign budget: مطفأ** (الميزانية على المجموعات).
- [ ] **A/B test: مطفأ**، فالاختبار بالبنية نفسها.

**3. المجموعة الأولى `eg-finance`:**
- [ ] **Conversion location:** Website · **Performance goal:** Maximize number of link clicks.
  - بعد G4 فقط: Landing page views، أو تغيير الهدف للمرحلة 2.
- [ ] **Budget:** Daily **15$** · **Schedule:** تاريخ البدء بتوقيت القاهرة، والانتهاء بعد 7 أيام.
- [ ] **Audience:** حسب القسم 2. **Advantage+ audience مطفأ** إن ظهر الخيار، وإلا قيود جمهور صارمة.
- [ ] **Placements:** Advantage+ placements، ثم **استبعد Audience Network**.
- [ ] الاسم: `eg-finance`.

**4. الإعلان الأول `m-eg-bait-ar`:**
- [ ] **Identity:** صفحة MFT + حساب Instagram.
- [ ] **Format:** Single image.
- [ ] **Media:** ارفع `meta-feed-4x5_live-ar_1080x1350.jpg`.
  - ثم **Edit → Customize asset per placement**: الـ9:16 لـStories وReels، والـ1:1 للباقي.
- [ ] **النص الأساسي، والعنوان، والوصف، وزر الدعوة:** انسخها من القسم 4.
- [ ] **Website URL:** الصق الرابط الكامل من القسم 4، بـUTM. واترك خانة **URL parameters** فارغة، حتى لا يتكرر UTM.
- [ ] **Advantage+ creative / Enhancements:** أطفئ تعديل النص، وتحسين الصورة، والموسيقى، و«Add overlays». التصاميم والنصوص معتمدة كما هي.
- [ ] **Multi-advertiser ads:** مطفأ.
- [ ] **Tracking:** اختر الـDataset إن وُجد (المرحلة 2).
- [ ] **Preview:** راجع كل موضع على الجوال، وتأكد أن العربي من اليمين وأن النص لا يغطي الرقم.

**5. باقي البنية:**
- [ ] **Duplicate** الإعلان، ثم عدّله إلى `m-eg-seats-ar`: الملفات، والنص، والرابط.
- [ ] **Duplicate** المجموعة إلى `sa-finance`: الموقع السعودية، ونصوص `m-sa-*`، وإعلان `m-sa-bait-en` بلغة English.
- [ ] **Duplicate** إلى `odoo-firms`: الاهتمامات حسب القسم 2، ونصوص `m-odoo-*`.

**6. قبل الإطلاق:**
- [ ] بوابة القسم 0 كلها ✅.
- [ ] افتح كل رابط من الجوال: يفتح الصفحة الصحيحة، والـUTM ظاهر في شريط العنوان.
- [ ] **Publish.** تدخل الإعلانات المراجعة، وعادة خلال 24 ساعة.

**7. بعد الإطلاق:**
- [ ] أول 24 ساعة: تأكد من «Active»، والصرف ≤ الميزانية، وأن لا رفض.
- [ ] يوميًا 09:30: القواعد في القسم 5 + [`workflow/04-daily-monitoring.md`](../workflow/04-daily-monitoring.md).

### ب) TikTok Ads Manager

**1. الإعداد (مرة واحدة)، في `ads.tiktok.com`:**
- [ ] حساب إعلاني باسم الشركة. **Business verification** بالسجل التجاري، والعملة USD، والمنطقة الزمنية القاهرة.
- [ ] **Payment:**
  - دفع يدوي مسبق بمبلغ الاختبار (280$ + هامش)، أو دفع تلقائي مع حد.
  - الدفع اليدوي المسبق **يحد الصرف تلقائيًا**، وهو المقترح للاختبار.
- [ ] (المرحلة 2، بعد G4) **Assets → Events → Web events**:
  - Pixel + Events API على `app.seg-audit.com`.
  - حدث `CompleteRegistration`.
  - تأكد بـ**Test events**.

**2. الحملة:** **Create** → **Manual campaign**، لا Smart+، حتى تبقى البنية تحت السيطرة.
- [ ] **Objective: Traffic**.
- [ ] **الاسم:** `SEG-FM | TikTok | Traffic | prospecting | ar | 2026-11`.
- [ ] **Campaign budget:** بلا حد (الميزانية على المجموعات).

**3. المجموعة `eg-finance`:**
- [ ] **Placement:** Select placement → **TikTok فقط**، وأزل Pangle وغيره.
- [ ] **Destination:** Website · **Optimization goal:** Click.
  - Landing page view تحتاج البكسل، فهي للمرحلة 2.
- [ ] **Targeting:** حسب القسم 2. **Targeting expansion مطفأ**.
- [ ] **Budget:** Daily **20$** · **Schedule:** 7 أيام · **Bid:** Maximum delivery (Lowest cost).
- [ ] الاسم: `eg-finance`.

**4. الإعلان `t-eg-bait-ar`:**
- [ ] **Identity:** Custom identity «Modern Financial Technology» + الشعار.
- [ ] **Format:** Single video:
  - **Create video → Video template / Smart video** من `tiktok-9x16_live-ar_1080x1920.jpg`، 6–10 ثوانٍ.
  - أو ارفع MP4 جاهزًا.
  - أضف موسيقى من مكتبة TikTok التجارية (Commercial Music Library) فقط.
- [ ] **Ad text** من القسم 4، و**CTA:** Sign up، و**URL:** الرابط الكامل بـUTM.
- [ ] **Automated creative optimization:** مطفأ.
- [ ] **Preview** على الجوال.

**5. باقي البنية:**
- [ ] انسخ الإعلان إلى `t-eg-seats-ar`.
- [ ] انسخ المجموعة إلى `sa-finance` بنصوص `t-sa-*`.

**6. قبل الإطلاق:**
- [ ] البوابة ✅، والروابط تعمل من الجوال.
- [ ] **Submit**. المراجعة عادة خلال 24 ساعة.

**7. بعد الإطلاق:** نفس متابعة Meta.

---

## 7. القياس والتقرير الأسبوعي

| ما يُقاس | المصدر |
|---|---|
| ظهور، ونقرات، وCTR، وCPC، والتكرار، ومعدل مشاهدة ثانيتين | Ads Manager لكل منصة |
| تسجيلات حسب `utm_content` | التطبيق، بعد G2 وG3 |
| فحوص الميزان المرفوعة من الإعلانات | المنصة |
| Leads ومراحلها | Odoo CRM |
| **تكلفة المقعد المدفوع** | صرف الحملة ÷ مقاعد مدفوعة مصدرها `utm_medium=paid` في CRM |

**التقرير:** يُكتب كل خميس في [`workflow/templates/weekly-report.md`](../workflow/templates/weekly-report.md): الرسالة الفائزة، والمجموعة الفائزة، وT المحدّث، وطلب الميزانية التالية.
