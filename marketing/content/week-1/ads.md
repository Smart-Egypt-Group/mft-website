# نسخ الإعلانات: الأسبوع الأول (Meta + TikTok)

الهيكل وقواعد الإيقاف والتوسيع في [workflow/03-paid-ads.md](../../workflow/03-paid-ads.md). كل إعلان يحتاج اعتماد صاحب الحملة قبل التشغيل.

## Meta Ads

**المواضع والتصاميم:**
| الموضع | التصميم |
|---|---|
| Feed (4:5) | `designs/ads/meta-feed-4x5_seats-ar_1080x1350.jpg` · `_live-ar_` |
| Feed (1:1) | `designs/ads/meta-feed-1x1_seats-ar_1080x1080.jpg` · `_live-ar_` |
| Stories / Reels (9:16) | `designs/social/story_seats-ar_1080x1920.jpg` · `_live-ar_` |
| الإنجليزية (ad set منفصل للسعودية) | نفس الملفات بنهاية `_en_` |

**الرابط:** `app.seg-audit.com/ar/signup?utm_source=facebook&utm_medium=paid&utm_campaign=founding-members-2026&utm_content={{ad.name}}&utm_term={{adset.name}}`
(Meta يستبدل `{{ad.name}}` و`{{adset.name}}` تلقائيًا؛ سمِّ الإعلان باسم التصميم، والمجموعة باسم الجمهور: `eg-finance`، `sa-finance`، `odoo-stack`، `rt-30d`.)

### الإعلان A: الندرة (seats)

- **النص الأساسي (125 حرفًا قبل «المزيد»):**
  > باقي 33 من 50 مقعدًا للأعضاء المؤسِّسين في SEG Audit. انضمت 17 شركة بالفعل.
  >
  > SEG Audit يراجع دفاترك باستمرار، بصلاحية قراءة فقط، ويعرض كل ملاحظة ومعها دليلها. العضو المؤسِّس يعمل مع فريق MFT مباشرة في الإعداد.
- **العنوان (40 حرفًا):** باقي 33 من 50 مقعدًا
- **الوصف:** الأعضاء المؤسِّسون في SEG Audit
- **زر الدعوة:** «التسجيل» (Sign up)

### الإعلان B: المنتج (live)

- **النص الأساسي:**
  > كم دفعة مكررة خرجت من شركتك هذا العام ولم يلاحظها أحد؟
  >
  > SEG Audit متاح الآن: يقرأ دفاترك من نظامك، قراءة فقط، ويرتّب كل ملاحظة حسب خطورتها مع مصدرها. باقي 33 مقعدًا تأسيسيًا.
- **العنوان:** SEG Audit متاح الآن
- **الوصف:** مراجعة مستمرة لدفاترك
- **زر الدعوة:** «معرفة المزيد» (Learn more) في الاستهداف البارد، «التسجيل» في إعادة الاستهداف

### الإعلان D: الطُعم (فحص الميزان المجاني) · الزاوية الأولى للتوليد

- **النص الأساسي:**
  > فحص مجاني لميزان شركتك يكشف نقاط الخطر في دقائق.
  >
  > ارفع ميزان المراجعة لآخر شهر مُقفَل، وشوف حسابات معلّقة، وأرصدة شاذة، وعدم اتزان، وقيود يدوية كثيفة، وتواريخ رجعية. مؤشرات من الميزان فقط، لا تقرير مراجعة كامل.
- **العنوان:** افحص ميزانك مجانًا
- **الوصف:** نقاط الخطر في دقائق
- **زر الدعوة:** «التسجيل» (Sign up)
- **التصميم:** `designs/concepts/tb-check/tb-check_ar_portrait_1080x1350.jpg` (Feed) · `tb-check_ar_story_1080x1920.jpg` (Stories/Reels) · الكاروسيل `designs/concepts/carousel/` (إعلان كاروسيل)

### الإعلان C: إعادة الاستهداف (rt-30d)

- **النص:** > زرت SEG Audit مؤخرًا. المقاعد التأسيسية تقل: باقي 33 من 50. أكمل تسجيل شركتك قبل اكتمال العدد.
- **العنوان:** أكمل حجز مقعدك
- **التصميم:** `seats-ar` بكل المواضع

### نموذج Instant Form (المرحلة 1، قبل تفعيل تتبع التسجيل على التطبيق)

- **العنوان:** فحص مجاني لميزان شركتك يكشف نقاط الخطر في دقائق
- **الحقول:** الاسم، رقم الهاتف (واتساب)، البريد، اسم الشركة، نظام المحاسبة (Odoo / غيره)، الدولة (مصر / السعودية / أخرى)
- **سؤال تأهيل:** «ما دورك في الشركة؟» (مالك · مدير مالي · رئيس حسابات · مراجع · أخرى)
- **سياسة الخصوصية:** `https://www.seg-audit.com/ar/privacy/`
- **رسالة الشكر:** «وصلنا طلبك. ارفع ميزان المراجعة من الرابط التالي، وتظهر نقاط الخطر في دقائق. وسنتواصل معك على واتساب خلال يوم عمل واحد.» + زر إلى `app.seg-audit.com/ar/signup?utm_source=facebook&utm_medium=paid&utm_campaign=founding-members-2026&utm_content=instant-form-thanks`

## TikTok Ads

**التصاميم:** `designs/ads/tiktok-9x16_seats-ar_1080x1920.jpg`، `designs/ads/tiktok-9x16_live-ar_1080x1920.jpg` (صورة ثابتة أو أول ثانيتين من الفيديو) + فيديوهات [tiktok.md](tiktok.md).
**الرابط:** `app.seg-audit.com/ar/signup?utm_source=tiktok&utm_medium=paid&utm_campaign=founding-members-2026&utm_content=__CID_NAME__&utm_term=__AID_NAME__`

| | النص (حتى 100 حرف) | زر الدعوة |
|---|---|---|
| A | باقي 33 من 50 مقعدًا للأعضاء المؤسِّسين في SEG Audit. انضمت 17 شركة. | سجّل الآن |
| B | كم دفعة مكررة خرجت من شركتك ولم يلاحظها أحد؟ SEG Audit يراجع باستمرار. | معرفة المزيد |
| C | قراءة فقط، ولكل ملاحظة دليلها. SEG Audit متاح الآن لـ50 شركة. | سجّل الآن |
| D | فحص مجاني لميزان شركتك يكشف نقاط الخطر في دقائق. | سجّل الآن |

**الاسم المعروض:** Modern Financial Technology · **صورة الملف:** شعار MFT.

## English (KSA expat finance roles, separate ad set)

- **Primary text:** 33 of 50 Founding Member seats left on SEG Audit. 17 companies have already joined. Continuous, read-only audit of your books: every finding ranked by severity, with its evidence.
- **Headline:** 33 of 50 seats left
- **Description:** SEG Audit Founding Members
- **Link:** `app.seg-audit.com/en/signup?utm_source=facebook&utm_medium=paid&utm_campaign=founding-members-2026&utm_content={{ad.name}}&utm_term={{adset.name}}`

## قبل التشغيل

- [ ] العدد في كل النسخ = العدد الحالي.
- [ ] لا ادعاءات أداء أو توفير، ولا أسماء عملاء.
- [ ] العرض المجاني موصوف بالنص المعتمد فقط: «فحص مجاني لميزان شركتك يكشف نقاط الخطر في دقائق»، لا «تقرير مجاني» ولا «تقرير مراجعة».
- [ ] شروط Meta للإعلانات المالية: الإعلان لا يعرض منتجًا ماليًا (قروض، استثمار)؛ هو برنامج مراجعة. إن طُلب تصنيف «Financial products and services» فيُختار حسب تعليمات المنصة وقت الإنشاء.
- [ ] الرابط يعمل من الجوال.
