# شيت بناء حملة Meta: Standard Enterprise Governance (SEG) · الأعضاء المؤسِّسون

> **مستند تنفيذ فقط.** لم تُنشأ أي حملة، ولم يُلمس أي حساب إعلاني، ولم يُصرف شيء. الـCEO هو من يبني ويطلق.
>
> **المعمارية المعتمدة:** حملة واحدة، ومجموعتان (مصر والسعودية)، و4 إعلانات لكل مجموعة. نفس الطقم في البلدين.
>
> **يحلّ محل:** بنية Meta في [`paid-ads-kit.md`](paid-ads-kit.md) §3 و§4 (3 مجموعات). تبقى من الكيت بوابة ما قبل الإطلاق (§0)، وقواعد المتابعة (§5)، والقياس (§7).
>
> **الإبداعات:** [`marketing/designs/golden/`](../designs/golden/README.md) (v2)، والريلز في [`marketing/designs/video/`](../designs/video/README.md).
>
> **تاريخ الإعداد:** 5 نوفمبر 2026. **تحديث 6 نوفمبر 2026:** إعلان `hourglass` («بقي 33 من 50») **سُحب** واستُبدل بإعلان `close` (نافذة إغلاق سعر المؤسِّس + الانتقائية). أرقام 17/33 مسحوبة. وأرقام المنصة الحالية: 9,900 اختبار و388 فحصًا (`platform-facts.js`، 5 نوفمبر). تاريخ الإغلاق من `src/site.config.js → founding.closesAt` (افتراض عمل: الإثنين 30 نوفمبر 2026، 11:59 مساءً بتوقيت القاهرة). **لا سعر رقمي في أي إعلان.**

---

## 1. البنية على صفحة واحدة

```
الحملة   SEG-FM | Meta | Traffic-LPV | prospecting | ar | 2026-11
│         الهدف: Traffic (Landing page views) الآن، ثم Leads/Sales على CompleteRegistration لاحقًا · ABO
├── المجموعة  eg · مصر
│     ├── eg-crack        تصميم الشرخ        + ريل الحساب الوسيط
│     ├── eg-close        الإقفال جايّ (نافذة الإغلاق) + ريل الدفع المكرر
│     ├── eg-hawk-eye     عين الصقر          + ريل المصروف بلا مرفق
│     └── eg-lineup       طابور الاستجواب     + ريل القيود اليدوية المدوّرة
└── المجموعة  sa · السعودية   (نسخة مكررة من مصر: يتغير الموقع وقيمة utm_content فقط)
      ├── sa-crack · sa-close · sa-hawk-eye · sa-lineup
```

**قاعدة التسمية:** اسم الإعلان = قيمة `utm_content` نفسها، حتى يُقرأ التقرير بلا جدول تحويل.

---

## 2. الحملة

| الحقل | القيمة |
|---|---|
| **Buying type** | Auction |
| **Objective** | **Traffic** |
| **الاسم** | `SEG-FM \| Meta \| Traffic-LPV \| prospecting \| ar \| 2026-11` |
| **Special ad categories** | لا شيء. الإعلان عن منصة مراجعة، لا عن ائتمان أو تمويل. إن طلبت Meta تصنيف «Financial products and services» فاتبع تعليماتها وقت الإنشاء |
| **Advantage campaign budget** | **مطفأ** (ABO: الميزانية على كل مجموعة، حتى لا تبتلع مجموعة واحدة الميزانية مبكرًا وتفسد المقارنة بين البلدين) |
| **A/B test** | مطفأ. المقارنة بالبنية نفسها |
| **المرحلة التالية** | بعد تفعيل `CompleteRegistration` على التطبيق (PR ياسر، [`app-conversion-tracking-pr.md`](../workflow/app-conversion-tracking-pr.md)): حملة جديدة بهدف **Leads** أو **Sales** على هذا الحدث. لا تغيّر هدف الحملة الحالية بعد إطلاقها |

---

## 3. المجموعتان

| الحقل | `eg · مصر` | `sa · السعودية` |
|---|---|---|
| **Conversion location** | Website | Website |
| **Performance goal** | **Maximize number of landing page views** | نفسه |
| **Dataset / Pixel** | `501774495051160` (حيّ على الموقع منذ 4 نوفمبر 2026، وهو شرط تحسين مشاهدات الصفحة) | نفسه |
| **Budget** | Daily، قيمة مقترحة **15$** (من الكيت §5، يحددها الـCEO) | Daily، **15$** مقترح |
| **Schedule** | تاريخ البدء بتوقيت القاهرة، والانتهاء بعد 7 أيام (أسبوع اختبار) | نفسه |
| **Location** | Egypt · People living in or recently in this location | Saudi Arabia · نفسه |
| **العمر** | **25–55** (حد صارم، انظر الخطوة 4-هـ) | **25–55** |
| **الجنس** | الكل | الكل |
| **اللغات** | اتركها فارغة. كثير من المديرين في السعودية يستخدمون الواجهة بالإنجليزية | نفسه |
| **Detailed targeting** | Interests: **Accounting**، وDemographics/Behaviors: **Business decision makers** (وإن وُجد: Business decision maker titles and interests) | نفسه |
| **Placements** | **Advantage+ placements** (تلقائي) | نفسه |
| **الصفحة (Identity)** | **Modern Financial Technology** + حساب Instagram المربوط | نفسه |
| **الوجهة** | `www.seg-audit.com` (صفحة الأعضاء المؤسِّسين، الروابط في §4) | نفسه |

**ملاحظات على الاستهداف:**
- الاهتمامان في **صندوق واحد** (أي OR) هو الافتراضي، حتى يبقى حجم الجمهور في السعودية صالحًا.
- إن قدّر Meta الجمهور أكبر من اللازم، أضف **Narrow audience** (أي AND) بالاهتمام الثاني.
- **أسماء الاهتمامات تختلف في الواجهة من وقت لآخر.** ابحث عن الاسم واختر الموجود فقط، ولا تضف بديلًا عامًا مثل «Finance» وحدها، لأنها تجلب مستثمري الأسهم.
- المواضع التلقائية تشمل Audience Network. اتركها كما طلبت المعمارية. وإن ظهر أن أغلب النقرات منها بلا مشاهدة صفحة، فاستبعدها في المراجعة الأسبوعية.

---

## 4. الإعلانات الأربعة (نفس الطقم في المجموعتين)

### الميديا لكل إعلان

- **موضع الـFeed:** صورة golden بمقاس **4:5**. والـ1:1 بديل للمواضع المربعة (Marketplace، والعمود الأيمن، وSearch).
- **موضعا Stories وReels:** ريل عمودي 9:16 بطول 34 ثانية من الموجود. الريلز مصمَّمة كمشهد مراجعة واحد يكمّل زاوية الإعلان.
- **الملفات:** نزّل الصور من الرابط العام، أو خذها من المسار في الريبو. وكل الروابط العامة تُرجع 200 (متحقق 5 نوفمبر 2026).

| الإعلان | الزاوية | Feed 4:5 (أساسي) | 1:1 (بديل) | الريل لـStories/Reels |
|---|---|---|---|---|
| `crack` | الخطأ المستخبي اللي بيكبر (Loss aversion) | `marketing/designs/golden/1-crack/golden-1-crack_ar_4x5_1080x1350.jpg`<br>https://www.seg-audit.com/assets/social/golden/golden-1-crack_ar_4x5_1080x1350.jpg | https://www.seg-audit.com/assets/social/golden/golden-1-crack_ar_1x1_1080x1080.jpg | `reel-suspense-account_ar` (حساب وسيط يكبر كل شهر)<br>https://www.seg-audit.com/assets/social/video/reel-suspense-account_ar_1080x1920.mp4 |
| `close` | نافذة الإغلاق + الانتقائية («سعر المؤسِّس يُغلق 30 نوفمبر») | **مؤقت (لا 4:5):** `marketing/designs/guerrilla/graffiti/graffiti-03-closing_ar_square_1080x1080.jpg` («الإقفال جايّ. وفيه مفاجآت.») لكل مواضع الـFeed، إلى أن يجهز تصميم N1 من [`design-redo-list.md`](../strategy/design-redo-list.md) | نفس المربع | `reel-duplicate-payment_ar` (الريل الرئيسي)<br>https://www.seg-audit.com/assets/social/video/reel-duplicate-payment_ar_1080x1920.mp4 · أو ستوري `graffiti-03-closing_ar_story_1080x1920.jpg` |
| `hawk-eye` | «كل رقم بدليله» / «المنصة التي تراجع نفسها» (سلطة الثقة) | `marketing/designs/golden/3-hawk-eye/golden-3-hawk-eye_ar_4x5_1080x1350.jpg`<br>https://www.seg-audit.com/assets/social/golden/golden-3-hawk-eye_ar_4x5_1080x1350.jpg | https://www.seg-audit.com/assets/social/golden/golden-3-hawk-eye_ar_1x1_1080x1080.jpg | `reel-no-receipt_ar` (مصروف معتمد بلا مرفق = رقم بلا دليل)<br>https://www.seg-audit.com/assets/social/video/reel-no-receipt_ar_1080x1920.mp4 |
| `lineup` | الصادم: «كل قيد تحت الاستجواب» | `marketing/designs/golden/4-lineup/golden-4-lineup_ar_4x5_1080x1350.jpg`<br>https://www.seg-audit.com/assets/social/golden/golden-4-lineup_ar_4x5_1080x1350.jpg | https://www.seg-audit.com/assets/social/golden/golden-4-lineup_ar_1x1_1080x1080.jpg | `reel-round-manual_ar` (قيود يدوية مدوّرة في آخر يومين من الشهر)<br>https://www.seg-audit.com/assets/social/video/reel-round-manual_ar_1080x1920.mp4 |

### النصوص

**قواعد الصياغة:**
- عربية مبسّطة يقرأها السوقان، لأن الطقم واحد في البلدين.
- **لا أرقام مقاعد** (17/33 مسحوبة). المسموح: تاريخ الإغلاق من `founding.closesAt`، وحقائق المنصة (388 فحصًا، و22 تقريرًا، و+9,900 اختبار، من [`platform-facts.js`](../../src/content/platform-facts.js)).
- لا أرقام دفاتر في النصوص. أرقام الدفاتر على التصاميم فقط، ومعلَّمة «مثال توضيحي».
- الطُعم بالصياغة المعتمدة. لا «تقرير مجاني» ولا «تقرير مراجعة».
- **زر CTA في الأربعة: «اعرف المزيد» (Learn more).**

#### `crack` · الخطأ المستخبي اللي بيكبر

- **النص الأساسي:**
  > قيد واحد خاطئ اليوم… يكبر حتى يصبح شرخًا في الإقفال.
  >
  > Standard Enterprise Governance (SEG) من MFT يقرأ دفاترك باستمرار، ويكشف مؤشرات الخطر وهي ما زالت صغيرة، ولكل ملاحظة دليلها.
  >
  > ابدأ بفحص مجاني لميزان شركتك… في دقائق.
- **العنوان:** اكشف الخطأ قبل الإقفال
- **الوصف:** فحص مجاني · مؤشرات من الميزان فقط
- **CTA:** اعرف المزيد

#### `close` · نافذة الإغلاق + الانتقائية

- **النص الأساسي:**
  > سعر المؤسِّس في Standard Enterprise Governance (SEG) يُغلق نهائيًا الإثنين 30 نوفمبر، 11:59 مساءً بتوقيت القاهرة. بعدها لا يعود.
  >
  > والعضوية بالطلب فقط: فريق MFT يراجع كل طلب بنفسه، وليس كل طلب يُقبل. والمقبول يعمل معه فريقنا مباشرة في الإعداد.
  >
  > ابدأ بفحص مجاني لميزان شركتك… في دقائق.
- **العنوان:** سعر المؤسِّس يُغلق 30 نوفمبر
- **الوصف:** العضوية بالطلب · فحص مجاني أولًا
- **CTA:** اعرف المزيد
- **قبل الإطلاق:** `node scripts/close-date.js --check` نظيف، والتاريخ في النص = `founding.closesAt`. لا «مدى الحياة» في الإعلان: يُقال في خطاب القبول.
- **بعد الإغلاق (1 ديسمبر 00:00):** يُوقف الإعلان في نفس الدقيقة (جدولة End date = موعد الإغلاق).

#### `hawk-eye` · سلطة الثقة

- **النص الأساسي:**
  > كل رقم في التقرير… ومعه دليله: القيد، وفاتورة المورّد، والمرفق.
  >
  > Standard Enterprise Governance (SEG) هي المنصة التي تراجع نفسها: أكثر من 9,900 اختبار آلي قبل كل تحديث. تقرأ دفاتر Odoo بصلاحية قراءة فقط، وتُجري 388 فحصًا في 22 تقريرًا.
  >
  > ابدأ بفحص مجاني لميزان شركتك… في دقائق.
- **العنوان:** كل رقم بدليله
- **الوصف:** قراءة فقط · 388 فحصًا · 22 تقريرًا
- **CTA:** اعرف المزيد

#### `lineup` · كل قيد تحت الاستجواب

- **النص الأساسي:**
  > كل قيد تحت الاستجواب: من أنشأه؟ من اعتمده؟ أين المستند؟ ولماذا سُجّل في آخر دقيقة؟
  >
  > Standard Enterprise Governance (SEG) يطرح هذه الأسئلة على كل قيد في دفاترك، ويضع أمامك الإجابة بدليلها.
  >
  > ابدأ بفحص مجاني لميزان شركتك… في دقائق.
- **العنوان:** كل قيد تحت الاستجواب
- **الوصف:** فحص مجاني · مؤشرات من الميزان فقط
- **CTA:** اعرف المزيد

### روابط الوجهة (Website URL) بالـUTM كاملًا

**قواعد الروابط:**
- الصق الرابط كما هو في خانة **Website URL**، واترك خانة **URL parameters** فارغة حتى لا يتكرر الـUTM.
- إعلانات الطُعم (`crack` و`hawk-eye` و`lineup`) تفتح على قسم الفحص المجاني `#fm-check`، وإعلان المقاعد يفتح على أول الصفحة.
- **الموقع يمرّر الـUTM لزر التسجيل تلقائيًا** (بوابة G2، متحقق).

| الإعلان | الرابط |
|---|---|
| `eg-crack` | `https://www.seg-audit.com/ar/founding-members/?utm_source=meta&utm_medium=paid&utm_campaign=founding-members-2026&utm_content=eg-crack#fm-check` |
| `eg-close` | `https://www.seg-audit.com/ar/founding-members/?utm_source=meta&utm_medium=paid&utm_campaign=founding-members-2026&utm_content=eg-close` |
| `eg-hawk-eye` | `https://www.seg-audit.com/ar/founding-members/?utm_source=meta&utm_medium=paid&utm_campaign=founding-members-2026&utm_content=eg-hawk-eye#fm-check` |
| `eg-lineup` | `https://www.seg-audit.com/ar/founding-members/?utm_source=meta&utm_medium=paid&utm_campaign=founding-members-2026&utm_content=eg-lineup#fm-check` |
| `sa-crack` | `https://www.seg-audit.com/ar/founding-members/?utm_source=meta&utm_medium=paid&utm_campaign=founding-members-2026&utm_content=sa-crack#fm-check` |
| `sa-close` | `https://www.seg-audit.com/ar/founding-members/?utm_source=meta&utm_medium=paid&utm_campaign=founding-members-2026&utm_content=sa-close` |
| `sa-hawk-eye` | `https://www.seg-audit.com/ar/founding-members/?utm_source=meta&utm_medium=paid&utm_campaign=founding-members-2026&utm_content=sa-hawk-eye#fm-check` |
| `sa-lineup` | `https://www.seg-audit.com/ar/founding-members/?utm_source=meta&utm_medium=paid&utm_campaign=founding-members-2026&utm_content=sa-lineup#fm-check` |

**Display link** (اختياري): `seg-audit.com`

---

## 5. هاشتاجات للنسخ العضوية (اختياري)

> **ليست ضرورية في الإعلانات المدفوعة.** الهاشتاج في الإعلان رابط يُخرج المستخدم من الإعلان، فالافتراضي بدونها. استخدمها في منشورات الصفحة وInstagram العضوية: من 5 إلى 8 هاشتاجات في آخر المنشور، لا أكثر.

| الفئة | الهاشتاجات |
|---|---|
| محاسبة ومراجعة | `#محاسبة` `#محاسب` `#محاسبين` `#مراجعة` `#مراجعة_داخلية` `#تدقيق` `#تدقيق_داخلي` `#ميزان_المراجعة` |
| حوكمة ورقابة | `#حوكمة` `#حوكمة_الشركات` `#رقابة_داخلية` `#إدارة_المخاطر` `#الامتثال` |
| إدارة مالية | `#إدارة_مالية` `#مدير_مالي` `#التقارير_المالية` `#إقفال_الحسابات` |
| Odoo وERP | `#Odoo` `#أودو` `#ERP` `#تخطيط_موارد_المؤسسات` |
| ريادة أعمال | `#ريادة_أعمال` `#رواد_الأعمال` `#الشركات_الناشئة` `#الشركات_الصغيرة_والمتوسطة` |
| البلد (حسب المنشور) | مصر: `#مصر` `#القاهرة` · السعودية: `#السعودية` `#الرياض` `#جدة` |

**مجموعة جاهزة للنسخ** (8 هاشتاجات):

```
#محاسبة #مراجعة_داخلية #حوكمة_الشركات #رقابة_داخلية #مدير_مالي #Odoo #ريادة_أعمال #السعودية
```

بدّل آخر هاشتاج بـ`#مصر` في منشورات مصر.

---

## 6. التنفيذ خطوة بخطوة في Ads Manager

> الواجهات تتغير. أسماء الأزرار أدناه هي الشائعة وقت الكتابة. إن اختلف اسم، ابحث عن الوظيفة نفسها.
>
> الإعداد لمرة واحدة (الحساب، والدفع، وتحقق النطاق `seg-audit.com`، وحد الإنفاق) في [`paid-ads-kit.md`](paid-ads-kit.md) §6-أ-1، وهو بوابة G5.

### الخطوة 0 · تجهيز الملفات (على الجهاز)
- [ ] نزّل الملفات من الروابط العامة في §4 إلى مجلد واحد، أو خذها من الريبو. الملفات 8 صور (4 بمقاس 4:5 و4 بمقاس 1:1) و4 ريلز.
- [ ] افتح هذا الشيت بجانب Ads Manager، وانسخ النصوص من §4 كما هي.

### الخطوة 1 · إنشاء الحملة
- [ ] Ads Manager → **Create** → **Traffic** → Continue.
- [ ] الاسم: `SEG-FM | Meta | Traffic-LPV | prospecting | ar | 2026-11`.
- [ ] **Special ad categories:** لا شيء.
- [ ] **Advantage campaign budget: مطفأ.**
- [ ] **A/B test: مطفأ** → Next.

### الخطوة 2 · المجموعة الأولى `eg · مصر`
- [ ] الاسم: `eg · مصر`.
- [ ] **Conversion location:** Website.
- [ ] **Performance goal:** Maximize number of landing page views.
- [ ] **Dataset:** `501774495051160`.
- [ ] **Budget:** Daily، والمبلغ الذي يعتمده الـCEO (مقترح 15$).
- [ ] **Schedule:** البدء والانتهاء (7 أيام).
- [ ] **Audience:**
  - أ. **Location:** Egypt.
  - ب. **Detailed targeting:** Accounting + Business decision makers، في صندوق واحد.
  - ج. **Age:** 25–55.
  - د. **Gender:** All. **Languages:** فارغ.
  - هـ. **العمر في Advantage+ audience اقتراح، لا حد.** لتثبيت 25–55 كحد صارم اختر **Switch to original audience options**، ثم حدّد العمر والاستهداف هناك.
  - و. راجع **Audience definition / Estimated audience size**، وسجّل الرقم في الشيت.
- [ ] **Placements:** Advantage+ placements.
- [ ] Next.

### الخطوة 3 · الإعلان الأول `eg-crack`
- [ ] الاسم: `eg-crack`.
- [ ] **Identity:** Facebook Page = **Modern Financial Technology**، وحساب Instagram المربوط.
- [ ] **Ad setup:** Create ad · **Format:** Single image or video.
- [ ] **Media:**
  - ارفع `golden-1-crack_ar_4x5_1080x1350.jpg`.
  - ثم **Edit → Customize asset per placement**:
    - **Feeds:** الـ4:5.
    - **Stories وReels:** الريل `reel-suspense-account_ar_1080x1920.mp4`.
    - **Search وRight column:** الـ1:1.
  - **لو الواجهة لم تسمح بخلط صورة وفيديو في نفس الإعلان:** اجعل الإعلان صورة فقط بكل المواضع، وأنشئ الريل لاحقًا كإعلان خامس باسم `eg-crack-reel`، والـUTM هو `utm_content=eg-crack-reel`. هذا يضيف إعلانًا خامسًا للمجموعة، لذلك سجّله في الشيت.
- [ ] **Primary text، Headline، Description:** الصق من §4 → `crack`.
- [ ] **Call to action:** Learn more (اعرف المزيد).
- [ ] **Website URL:** الصق رابط `eg-crack` من جدول الروابط. واترك **URL parameters** فارغة.
- [ ] **Display link:** `seg-audit.com`.
- [ ] **Advantage+ creative / Enhancements:** أطفئ كل التحسينات (تعديل النص، وتحسين الصورة، والقوالب، والموسيقى، وAdd overlays، وExpand image). التصاميم والنصوص معتمدة كما هي.
- [ ] **Multi-advertiser ads:** مطفأ.
- [ ] **Tracking:** Website events → الـDataset `501774495051160`.
- [ ] **Preview:** راجع Feed وStories وReels على الجوال:
  - العربي من اليمين.
  - الشريط السفلي في Reels لا يغطي الـCTA المرسوم.
  - «مثال توضيحي» ظاهر.

### الخطوة 4 · باقي إعلانات مصر (بالتكرار)
- [ ] على `eg-crack` → **Duplicate** → نفس المجموعة → Duplicate (مرة واحدة).
- [ ] عدّل النسخة إلى `eg-close`:
  - الاسم.
  - الميديا: مربع `graffiti-03-closing_ar_square_1080x1080.jpg` للـFeed (مؤقتًا)، والريل `reel-duplicate-payment_ar`.
  - النصوص من §4 → `close`.
  - **End date للإعلان:** موعد الإغلاق (`founding.closesAt`).
  - الرابط: `eg-close`، وهو **بلا** `#fm-check`.
- [ ] كرر نفس الخطوات لـ`eg-hawk-eye` (الريل `reel-no-receipt_ar`) ولـ`eg-lineup` (الريل `reel-round-manual_ar`).
- [ ] تأكد أن كل إعلان رابطه مطابق لاسمه. **هذا أكثر خطأ شائع في التكرار.**

### الخطوة 5 · المجموعة الثانية `sa · السعودية` (بالتكرار)
- [ ] على المجموعة `eg · مصر` → **Duplicate** → **Existing campaign** (نفس الحملة) → Duplicate.
- [ ] عدّل المجموعة الجديدة:
  - الاسم: `sa · السعودية`.
  - **Location:** احذف Egypt وأضف **Saudi Arabia**.
  - تأكد من العمر 25–55، والاستهداف، والميزانية اليومية، والجدولة.
- [ ] عدّل كل إعلان من الأربعة في المجموعة الجديدة:
  - **الاسم:** `eg-…` ← `sa-…`.
  - **Website URL:** رابط `sa-…` من الجدول. يتغير `utm_content` فقط.
  - **النصوص والميديا كما هي.**
- [ ] راجع جدول الروابط سطرًا سطرًا مقابل الإعلانات الثمانية.

### الخطوة 6 · الميزانية والحماية
- [ ] **Advantage campaign budget** ما زال مطفأ، وكل مجموعة بميزانيتها اليومية.
- [ ] **Billing → Account spending limit:** مضبوط حسب الكيت §5. هذا هو التوقف الصلب.
- [ ] إجمالي الأسبوع = (يومي مصر + يومي السعودية) × 7. بالقيم المقترحة: 30$ يوميًا، و**210$** للأسبوع.

### الخطوة 7 · بوابة «تأكيد الطُعم قبل الصرف» (إلزامية)
> **ابنِ كل شيء واترك الحملة مطفأة** (مفتاح الحملة Off)، أو اضبط تاريخ البدء بعد البوابة. لا يُصرف دولار قبل أن تمر كل البنود.

| # | البند | كيف تتأكد | ✓ |
|---|---|---|---|
| **B1** | **الطُعم شغّال على الإنتاج** (G1 وG1-b) | من الجوال افتح رابط `eg-crack`، ثم «ابدأ الفحص المجاني»، ثم سجّل بحساب اختبار وارفع ميزان مراجعة تجريبيًا. **يجب أن تظهر المؤشرات الخمسة في دقائق، بلا نموذج إضافي وبلا دفع.** احذف حساب الاختبار بعدها | ☐ |
| **B2** | الرابط يفتح القسم الصحيح | `#fm-check` ينزل على قسم الفحص المجاني، ورابط `close` يفتح أول الصفحة | ☐ |
| **B3** | الـUTM وصل للتسجيل | بعد الضغط على زر التسجيل، رابط `app.seg-audit.com` في شريط العنوان يحمل `utm_source=meta&utm_medium=paid&utm_campaign=founding-members-2026&utm_content=eg-crack` و`cta=` | ☐ |
| **B4** | البكسل يسجّل | Events Manager → Dataset `501774495051160` → **Test events**: افتح الرابط، ثم يظهر `PageView`. اضغط زر الفحص، ثم يظهر `Lead` | ☐ |
| **B5** | لا أرقام مقاعد في أي مكان (تحديث 6 نوفمبر) | `node scripts/close-date.js --check` نظيف. **وصفحة الهبوط الحية لا تعرض عدّادًا** («طلبات مقدَّمة / المتبقي»): هذا يتطلب `founding.showCount: false` في الموقع، وهو قرار منفصل. ما دام العدّاد ظاهرًا على الصفحة = **لا تطلق** | ☐ |
| **B6** | الحساب جاهز (G5) | الدفع، وحد الإنفاق، وتحقق النطاق `seg-audit.com` | ☐ |
| **B7** | المعاينة | الإعلانات الثمانية، كل واحد في 3 مواضع على الجوال: النص صحيح، والميديا صحيحة، والرابط مطابق للاسم | ☐ |

**لو فشل أي بند من B1 إلى B5: لا تطلق.** سجّل البند الفاشل وأبلغ ياسر (B1 وB3) أو فريق التسويق (B2 وB4 وB5).

### الخطوة 8 · الإطلاق
- [ ] كل بنود B ✓.
- [ ] **Review and publish** → **Publish**، ثم فعّل مفتاح الحملة On. الإعلانات تدخل المراجعة، وعادة خلال 24 ساعة.
- [ ] سجّل وقت الإطلاق وأرقام الحملة والمجموعات والإعلانات (IDs) في التقرير الأسبوعي.

### الخطوة 9 · أول 24 ساعة
- [ ] الحالة Active لكل الإعلانات الثمانية، ولا رفض. أي رفض: اقرأ السبب، ولا تعدّل النص بلا مراجعة.
- [ ] الصرف لكل مجموعة ≤ الميزانية اليومية.
- [ ] Landing page views > 0 في المجموعتين، يعني البكسل يعمل مع الإعلانات.
- [ ] بعدها المتابعة اليومية 09:30 حسب الكيت §5 و[`workflow/04-daily-monitoring.md`](../workflow/04-daily-monitoring.md).
  - **لا تعديل قبل 3 أيام** إلا لإيقاف إعلان مرفوض أو صرف غير طبيعي.

---

## 7. ما يُقرأ في التقرير الأسبوعي

- **لكل إعلان (اسمه = `utm_content`):**
  - من Ads Manager: Landing page views، وتكلفة مشاهدة الصفحة، وCTR، والتكرار.
  - من التطبيق (بعد G3): التسجيلات حسب `utm_content`.
- **مصر مقابل السعودية:** نفس الطقم في البلدين، فالفرق هو البلد نفسه. هذا سبب ABO.
- **الزاوية الفائزة:** الأقل تكلفة لكل تسجيل، لا لكل نقرة. لو التسجيلات لم تُقرأ بعد (G3)، فالقرار المؤقت على تكلفة مشاهدة الصفحة + معدل `Lead` من البكسل.

---

## 8. ملاحظات معروفة

- **اللهجة:** نصوص الإعلانات بالعربية المبسّطة. أما الكلام المكتوب على التصاميم والريلز فمصري خفيف، مثل «ليه» في الاستجواب و«بيكبر» في الريلز، ويُفهم في السعودية.
  - لو أراد الـCEO نسخة سعودية خالصة للتصاميم (مثل «ليش» و«يكبر»)، فهي تعديل نصي في `scripts/golden-ads.js` و`scripts/reels-cinematic.js` ثم إعادة توليد.
- **العملة:** لا رمز عملة على تصاميم golden ولا في النصوص، لأن الطقم واحد. والريلز السينمائية أيضًا تعرض مبالغها بلا رمز عملة (متحقق في `scripts/reels-cinematic.js`).
- **الريل 34 ثانية:** تحقق في المعاينة أن Meta يقبل الطول في Stories وReels وقت الإنشاء. لو ظهر تحذير طول، استخدم الصورة 4:5 في كل المواضع لذلك الإعلان.
