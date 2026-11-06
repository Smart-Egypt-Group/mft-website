# سكربتات التعليق الصوتي + مواصفة الهندسة الصوتية · نوفمبر 2026

> **الحالة:** نصوص ومواصفة فقط. **لم يُولَّد أو يُسجَّل أي صوت.** مفيش منصة أصوات متصلة، والصوت هيتسجّل بعدين ويتركّب بـ`ffmpeg` حسب §6.
> **المصدر:** التوقيتات مأخوذة من المولّدات نفسها (`scripts/reels-cinematic.js` → `T` و`data-at`، و`scripts/tiktok-videos.js` → `SECONDS = 8`)، فالكلام متزامن مع اللي بيظهر على الشاشة بالفعل.
> **الحقائق المسموح بيها (دليل أو صمت):** من `src/content/platform-facts.js` (اتقاس 5 نوفمبر 2026): **أكتر من 9,900 اختبار آلي** (حد أدنى)، و**388 فحص**، و**22 تقرير**. كل الأرقام والأسماء والأكواد التانية في الريلز **داتا اختبارية على شركة وهمية** («مثال توضيحي»).
> **الندرة:** نافذة إغلاق (`founding.closesAt` = الإثنين 30 نوفمبر 2026، 11:59 مساءً بتوقيت القاهرة) + انتقاء («العضوية بالطلب، ومش كل طلب بيتقبل»). **ممنوع:** أي عدد مقاعد، أي سعر رقمي أو نسبة خصم، «مدى الحياة» كوعد فوترة، وكلمات «سرقة / احتيال / نصب». المستخدم: «ملاحظة»، «استثناء»، «مؤشر يستدعي فحص».
> **الفحص المجاني:** مؤشرات من ميزان المراجعة، **مش تقرير مراجعة**. لو اتقال عدد المؤشرات لازم يتقال معاه إن 3 منهم محتاجين ربط Odoo. السكربتات هنا مش بتذكر العدد خالص.

---

## 1. الجرد: الفيديوهات الموجودة فعلًا في الريبو

**12 ريل + 4 TikTok = 16 فيديو.** العدد مطابق للمطلوب.

| # | الملف | المدة | المقاس | الصوت الحالي | مستخدم في |
|---|---|---|---|---|---|
| R1 | `marketing/designs/video/reel-duplicate-payment_ar_1080x1920.mp4` | 34 ث | 1080×1920، 30fps | موسيقى + SFX مولَّدة بالكود (`reels-audio.js`)، -16 LUFS، **بدون كلام** | محتوى 7 نوفمبر، التقويم، شيت Meta |
| R2 | `…/reel-duplicate-payment_en_1080x1920.mp4` | 34 ث | نفسه | نفسه | LinkedIn EN (اختياري) |
| R3 | `…/reel-post-close-entry_ar_1080x1920.mp4` | 34 ث | نفسه | نفسه | التقويم، إعلان `close` (TikTok)، حزمة الإعلانات |
| R4 | `…/reel-post-close-entry_en_1080x1920.mp4` | 34 ث | نفسه | نفسه | — |
| R5 | `…/reel-suspense-account_ar_1080x1920.mp4` | 34 ث | نفسه | نفسه | التقويم، شيت Meta |
| R6 | `…/reel-suspense-account_en_1080x1920.mp4` | 34 ث | نفسه | نفسه | — |
| R7 | `…/reel-ghost-vendor_ar_1080x1920.mp4` | 34 ث | نفسه | نفسه | التقويم |
| R8 | `…/reel-ghost-vendor_en_1080x1920.mp4` | 34 ث | نفسه | نفسه | — |
| R9 | `…/reel-round-manual_ar_1080x1920.mp4` | 34 ث | نفسه | نفسه | التقويم، شيت Meta |
| R10 | `…/reel-round-manual_en_1080x1920.mp4` | 34 ث | نفسه | نفسه | — |
| R11 | `…/reel-no-receipt_ar_1080x1920.mp4` | 34 ث | نفسه | نفسه | التقويم، شيت Meta |
| R12 | `…/reel-no-receipt_en_1080x1920.mp4` | 34 ث | نفسه | نفسه | — |
| T1 | `marketing/designs/ads/video/tiktok-9x16_live-ar_1080x1920_8s.mp4` | 8 ث | 1080×1920، 30fps | **صامت** (`mp4()` بيتنادى من غير audio) | حزمة الإعلانات |
| T2 | `…/tiktok-9x16_live-en_1080x1920_8s.mp4` | 8 ث | نفسه | صامت | حزمة الإعلانات |
| T3 | `…/tiktok-9x16_close-ar_1080x1920_8s.mp4` (**بديل** `seats-ar`، اتولّد 6 نوفمبر) | 8 ث | نفسه | صامت | إعلان `close` |
| T4 | `…/tiktok-9x16_close-en_1080x1920_8s.mp4` (**بديل** `seats-en`) | 8 ث | نفسه | صامت | — |

**ملاحظات على الجرد:**
- المدد مأخوذة من المولّدات (`TOTAL = 34` و`SECONDS = 8`)، لأن `ffprobe` مش متسطّب على الجهاز. أول ما يتسطّب ffmpeg، تأكّد بالأمر اللي في §6.7.
- **T3/T4 بيتكتبوا على نسخة `close`**، اللي محتواها «سعر المؤسِّس يُغلق 30 نوفمبر · العضوية بالطلب». ملفات `seats` القديمة مسحوبة وما ينفعش يتعمل لها صوت.
- **فيديوهات EN:** فيه سكربت إنجليزي لكل واحد. ولو هتنزل لجمهور عربي، ينفع تحط عليها الصوت العربي، بس لازم الترجمة على الشاشة تتطابق مع الكلام، وإلا استخدم نسخة `_ar`.

### خريطة التوقيت الثابتة لكل الريلز (من `reels-cinematic.js`)

| الثانية | المشهد | اللي بيظهر |
|---|---|---|
| 0.25 | hook | سطر البراند «Standard Enterprise Governance» |
| 0.45 | hook | العنوان بيتكتب كلمة كلمة |
| 1.7 | hook | السطر الفرعي |
| **2.6** | hook | **الرقم المفتاحي بـimpact** (صوت sub drop) |
| 5.0 / 5.35 | why | انتقال، وبعده «ليه المراجعة السنوية بتفوّتها؟» |
| 6.3 · 8.0 · 9.7 | why | الأسباب 1 و2 و3 (مع tick) |
| 12.0 / 12.45 | ev | «… بيكشفها فورًا، بدليلها» وبعده كارت SEG |
| 13.1 → 14.5 | ev | الصفوف بتظهر |
| **15.0 → 18.6** | ev | **zoom على السطر المطابق** وتظليل الخلايا |
| 19.0 · 19.35 · 19.7 | ev | الشرائح (chips) مع tick، و19.6 شارة الخطورة |
| 20.6 | ev | سطر «الدليل: …» |
| 24.0 / 25.0 · 25.9 · 26.8 | ctl | «اللي المفروض يتعمل» وبعده 3 ضوابط |
| 29.3 · 29.7 · 30.3 | cta | لوجو MFT، وبعده «Standard Enterprise Governance»، وبعده «المنصة التي تراجع نفسها» |
| 31.2 · **31.9** | cta | «فحص مجاني لميزان شركتك في دقائق»، وبعده حبّة **seg-audit.com** (صوت resolve chord) |
| 34.0 | — | النهاية |

**ميزانية الكلام:** 2.3–2.6 كلمة/ث بالمصري، يعني حوالي **140–155 wpm**. كل ريل فيه **70–80 كلمة** عربي، وفيه سكتات مقصودة.

---

## 2. قواعد الأداء والهوك (لكل الفيديوهات)

**الصوت:** مصري، واثق، هادي، بنبرة «زميل خبير»: مراجع شاف المشكلة دي قبل كده. مش مذيع إعلانات ولا حد بيتحمّس زيادة. صوت رجالي أو حريمي، المهم يكون **نفس الصوت في كل السلسلة**.

**تشريح الهوك (0–3 ث) اللي بيخلّي الناس تعيد:**
1. **أول كلمة على أول frame** (0.2 ث). مفيش «أهلًا» ولا «النهارده هنتكلم عن».
2. **جملة ناقصة (open loop)** بتتقفل بالرقم اللي بيظهر عند 2.6 ث. الصوت يسكت لحظة قبل الـimpact بالظبط.
3. **قفلة الريل بترجّع لأولها:** آخر جملة بتشاور على تفصيلة في أول 3 ثواني («ارجع بص على…»)، فالـloop على Reels/TikTok يتحوّل لمشاهدة تانية.

**ممنوعات الأداء:** ما تضغطش على الأرقام كأنها فضيحة، وما تقولش «كارثة» أو «مصيبة». الخطورة بتيجي من الهدوء.
**الأرقام:** تتقال بالعربي المنطوق («ستة وأربعين ألف وتمنمية»)، إلا الأكواد (INV-2210 / IBAN) اللي بتتقرا حرف حرف بالإنجليزي.
**الـCTA الافتراضي (CTA-A):** الفحص المجاني.
**البديل (CTA-B):** للنشر من **الإثنين 23 نوفمبر**، فيه النافذة والانتقاء. نفس التوقيت بالظبط، وبتستبدل سطري 29–34 ث بس.

| | CTA-A (افتراضي) | CTA-B (أسبوع الإغلاق، من 23 نوفمبر) |
|---|---|---|
| 29.3–31.0 | «Standard Enterprise Governance… المنصة اللي بتراجع نفسها.» | «Standard Enterprise Governance… المنصة اللي بتراجع نفسها.» |
| 31.2–34.0 | «افحص ميزانك مجانًا على seg-audit.com. مؤشرات في دقايق… مش تقرير مراجعة.» | «العضوية التأسيسية بالطلب، ومش كل طلب بيتقبل. التقديم بيقفل ٣٠ نوفمبر… seg-audit.com.» |

> **تحديث مرحلة الجودة (6 نوفمبر):** الشاشة الختامية في الـ12 ريل بقت بتعرض الفحص المجاني **وتحته** سطر «سعر المؤسِّس يُغلق 30 نوفمبر · بالطلب فقط» (يظهر عند 32.6 ث، من `scripts/lib/campaign.js`). يعني CTA-B بقى متطابق مع الشاشة. لو التاريخ اتغيّر، الشاشة بتتولّد من جديد تلقائيًا، أما جملة الصوت فلازم تتسجّل تاني.

---

## 3. سكربتات الريلز (12)

### R1 · `reel-duplicate-payment_ar` · «الفاتورة اللي اتدفعت مرتين»

**الهوك:** «نفس الفاتورة… نفس المبلغ… واتدفعت **مرتين**.»
**نبرة الأداء:** 145 wpm. هادي وواثق. سكتة 0.4 ث قبل «مرتين»، وضغط خفيف على «محدش». الكلمات المضغوطة: مرتين، حرف، كلها، فورًا.
**EN gloss:** Same bill, same amount, paid twice, and nobody noticed. The audit samples; SEG reads every payment and shows the evidence.

| الثانية | النص المنطوق | ما على الشاشة | ملاحظة أداء |
|---|---|---|---|
| 0.2–2.4 | نفس الفاتورة… نفس المبلغ… | العنوان «نفس فاتورة المورّد اتدفعت مرتين» | بطيء، كل جملة لوحدها |
| 2.4–2.6 | *(سكتة)* | — | نفَس |
| 2.6–4.8 | واتدفعت **مرتين**. ومحدش خد باله. | `46,800 × 2` (impact) | «مرتين» على الـimpact بالظبط |
| 5.3–6.2 | ليه المراجعة السنوية بتفوّتها؟ | عنوان المشهد | سؤال حقيقي، مش استعراض |
| 6.3–7.9 | لأنها بتختبر عيّنة… مش كل الدفعات. | سبب 1 | ضغط على «عيّنة» |
| 8.0–9.6 | والمرجع التاني مختلف **بحرف واحد**. | سبب 2: INV-2210 / INV2210-A | «بحرف واحد» أبطأ |
| 9.7–11.8 | وبينهم تسعتاشر يوم، في شهرين مختلفين. | سبب 3 | — |
| 12.2–14.8 | ‏SEG بيقرا كل دفعة… مش عيّنة. | الكارت يظهر · «مثال توضيحي» | «كل» مضغوطة |
| 15.0–18.6 | نفس المورّد، نفس المبلغ، والمرجع متطابق اتنين وتسعين في المية. | zoom على السطرين | إيقاع مع تظليل الخلايا |
| 19.0–21.5 | ملاحظة حرجة… ومعاها دليلها: الفاتورة وقيدين السداد. | chips + «حرجة» + سطر الدليل | «حرجة» بدون دراما |
| 21.5–24.0 | ده مثال توضيحي على داتا اختبارية. | العلامة المائية | أخف، أسرع شوية |
| 24.3–24.9 | الضابط؟ | «اللي المفروض يتعمل» | — |
| 25.0–28.8 | امنع تكرار رقم الفاتورة في Odoo، ومطابقة تلاتية قبل الصرف. | الضوابط 1–2 (3 تظهر بدون كلام) | عملي، زي النصيحة |
| 29.3–31.0 | ‏Standard Enterprise Governance… المنصة اللي بتراجع نفسها. | شاشة الختام | أبطأ، بثقة |
| 31.2–33.6 | افحص ميزانك مجانًا على seg-audit.com… مش تقرير مراجعة، مؤشرات في دقايق. | الحبّة seg-audit.com عند 31.9 | الدومين على الـresolve |
| 33.6–34.0 | *(قفلة loop، اختيارية: «ارجع بص على المرجعين»)* | — | همس تقريبًا، بيدفع للإعادة |

### R2 · `reel-duplicate-payment_en` (EN VO)

**Hook:** "Same bill. Same amount. Paid **twice**."
**Tone:** 150 wpm, calm authority, 0.4 s pause before "twice".

| s | VO | On screen |
|---|---|---|
| 0.2–4.8 | Same bill. Same amount. *(pause)* Paid twice. And nobody noticed. | hook → `46,800 × 2` at 2.6 |
| 5.3–11.8 | Why does the annual audit miss it? It tests a sample. The second reference is one character off. And they're nineteen days apart. | why 1–3 |
| 12.2–24.0 | SEG reads every payment, not a sample. Same supplier, same amount, a ninety-two percent reference match. A critical finding, with its evidence. Illustrative test data. | evidence card |
| 24.3–28.8 | The control: block duplicate bill numbers in Odoo, and three-way match before you pay. | controls |
| 29.3–34.0 | Standard Enterprise Governance, the platform that audits itself. Check your trial balance free at seg-audit.com. Indicators, not an audit report. | end card |

---

### R3 · `reel-post-close-entry_ar` · «قيد بعد الإقفال»

**الهوك:** «قيد بتاريخ سبتمبر… اتكتب **في أكتوبر**.»
**نبرة الأداء:** 140 wpm، ونبرة «تحقيق هادي». سكتة قبل «في أكتوبر»، وضغط على «بعد ما اتعتمدت». الكلمات المضغوطة: بعد، تاريخ الإنشاء، قفل.
**EN gloss:** An entry dated September, created in October, after the statements were approved. SEG compares the creation log with the entry date.

| الثانية | النص المنطوق | ما على الشاشة | ملاحظة أداء |
|---|---|---|---|
| 0.2–2.4 | قيد بتاريخ سبتمبر… | العنوان | بطيء، فيه سؤال |
| 2.4–2.6 | *(سكتة)* | — | — |
| 2.6–4.8 | اتكتب **في أكتوبر**. بعد ما القوايم اتعتمدت. | `+3 أيام` (impact) | «في أكتوبر» على الـimpact |
| 5.3–6.2 | ليه المراجعة بتفوّته؟ | عنوان المشهد | — |
| 6.3–7.9 | القوايم اتعتمدت قبل القيد. | سبب 1 | — |
| 8.0–9.6 | والمراجع بيشوف الرصيد النهائي… مش امتى كل قيد اتعمل. | سبب 2 | ضغط على «امتى» |
| 9.7–11.8 | والقيد يدوي، من مستخدم برّه فريق الحسابات. | سبب 3 | محايد، من غير اتهام |
| 12.2–14.8 | ‏SEG بيقارن تاريخ القيد بتاريخ إنشائه في سجل Odoo. | الكارت · «مثال توضيحي» | واضح وتقني |
| 15.0–18.6 | تمانية وعشرين سبتمبر… اتنشأ تلاتة أكتوبر. | zoom: تاريخ الإنشاء والمستخدم | التاريخين بإيقاع التظليل |
| 19.0–21.5 | بعد الإقفال بتلات أيام، وبتاريخ رجعي. ملاحظة عالية، ودليلها في السجل. | chips + «عالية» + الدليل | — |
| 21.5–24.0 | مثال توضيحي، داتا اختبارية. | — | أخف |
| 24.3–28.8 | الضابط: تاريخ قفل لكل فترة بعد اعتمادها، والقيود اليدوية للمحاسبين بس. | الضوابط | — |
| 29.3–31.0 | ‏Standard Enterprise Governance… المنصة اللي بتراجع نفسها. | الختام | — |
| 31.2–34.0 | افحص ميزانك مجانًا على seg-audit.com. | الحبّة | loop: «… ارجع بص على التاريخين» (اختياري) |

### R4 · `reel-post-close-entry_en` (EN VO)

**Hook:** "An entry dated September… created **in October**."

| s | VO | On screen |
|---|---|---|
| 0.2–4.8 | An entry dated September… *(pause)* created in October. After the statements were approved. | hook → `+3 days` |
| 5.3–11.8 | Why it slips: the statements were already signed off. Auditors see balances, not creation dates. And a user outside finance posted it. | why 1–3 |
| 12.2–24.0 | SEG checks every entry date against its creation date in the Odoo log. Three days after close, backdated. A high-severity finding, with the log as evidence. Illustrative test data. | evidence |
| 24.3–28.8 | The control: a lock date on every approved period, and manual entries for accountants only. | controls |
| 29.3–34.0 | Standard Enterprise Governance, the platform that audits itself. Free trial-balance check at seg-audit.com. | end card |

---

### R5 · `reel-suspense-account_ar` · «الحساب الوسيط»

**الهوك:** «فيه حساب في دفاترك… **بيكبر كل شهر**.»
**نبرة الأداء:** 140 wpm. نبرة «سر صغير بقوله لك»، بصوت أوطى في أول جملة. الكلمات المضغوطة: كل شهر، بيستخبى، أعمار.
**EN gloss:** A suspense account that grows every month; every unexplained difference hides in it. SEG ages each item.

| الثانية | النص المنطوق | ما على الشاشة | ملاحظة أداء |
|---|---|---|---|
| 0.2–2.4 | فيه حساب في دفاترك… | العنوان «حساب وسيط بيكبر كل شهر» | واطي، قريب من المايك |
| 2.6–4.8 | **بيكبر كل شهر**. وكل فرق… بيستخبى فيه. | `12,400 → 86,250` (impact) | النبرة تعلى مع الرقم |
| 5.3–6.2 | ليه محدش بيشوفه؟ | عنوان المشهد | — |
| 6.3–7.9 | رصيده صغير جنب الميزانية. | سبب 1 | — |
| 8.0–9.6 | والحركات بتقابل بعضها… فالصافي شكله طبيعي. | سبب 2 | «طبيعي» بسخرية خفيفة جدًا |
| 9.7–11.8 | ومحدش بيحلّل أعمار البنود جوّاه. | سبب 3 | — |
| 12.2–14.8 | ‏SEG بيفتح الحساب… ويعدّ عمر كل بند. | الكارت · الأعمدة بتطلع | — |
| 15.0–18.6 | خمس شهور تراكم… وأكتر من نص الرصيد أقدم من تسعين يوم. | zoom على عمود أكتوبر | «أكتر من نص» تقريب أمين لـ71% |
| 19.0–21.5 | ملاحظة عالية، والدليل: سبعة وتلاتين حركة من غير تسوية. | chips + الدليل | — |
| 21.5–24.0 | مثال توضيحي، داتا اختبارية. | — | — |
| 24.3–28.8 | الضابط: تسوية شهرية، ومسؤول باسمه عن كل بند مفتوح. | الضوابط | — |
| 29.3–34.0 | ‏Standard Enterprise Governance، المنصة اللي بتراجع نفسها. افحص ميزانك مجانًا على seg-audit.com. | الختام | loop: «… شوف أول رقم تاني» |

### R6 · `reel-suspense-account_en` (EN VO)

**Hook:** "There's one account in your books… that **grows every month**."

| s | VO | On screen |
|---|---|---|
| 0.2–4.8 | There's one account in your books… that grows every month. And every difference hides in it. | hook → `12,400 → 86,250` |
| 5.3–11.8 | Why nobody sees it: it looks small next to the balance sheet. Movements offset. And nobody ages the items. | why |
| 12.2–24.0 | SEG opens the account and ages every item. Five months building, most of it older than ninety days. Thirty-seven uncleared movements. Illustrative test data. | evidence |
| 24.3–28.8 | The control: clear it monthly, with a named owner for every open item. | controls |
| 29.3–34.0 | Standard Enterprise Governance, the platform that audits itself. Free trial-balance check at seg-audit.com. | end card |

---

### R7 · `reel-ghost-vendor_ar` · «IBAN واحد لمورّد وموظف»

**الهوك:** «الحساب البنكي للمورّد ده… **هو نفسه** حساب موظف عندك.»
**نبرة الأداء:** 135 wpm، وهو أبطأ ريل. **حيادي جدًا.** لازم جملة «مؤشر يستدعي فحص، مش اتهام» تتقال بوضوح وبنفس الوزن، مش بسرعة. الكلمات المضغوطة: نفسه، مؤشر، اعتماد ثنائي.
**EN gloss:** A supplier's IBAN matches an employee's. An indicator to review, not an accusation. SEG cross-checks supplier master data with payroll.

| الثانية | النص المنطوق | ما على الشاشة | ملاحظة أداء |
|---|---|---|---|
| 0.2–2.4 | الحساب البنكي للمورّد ده… | العنوان | — |
| 2.6–4.8 | **هو نفسه** حساب موظف عندك. مؤشر يستدعي فحص… مش اتهام. | `IBAN = IBAN` (impact) + السطر الفرعي | الجملة التانية بنفس الثقة |
| 5.3–6.2 | ليه بيعدّي؟ | عنوان المشهد | — |
| 6.3–7.9 | المورّدين في ملف، والموظفين في ملف تاني. | سبب 1 | — |
| 8.0–9.6 | والمراجعة بتختبر الدفعات… مش البيانات الرئيسية. | سبب 2 | — |
| 9.7–11.8 | وبنك المورّد اتعدّل قبل الدفعات بأسبوع. | سبب 3 | — |
| 12.2–14.8 | ‏SEG بيطابق حسابات المورّدين مع حسابات الرواتب. | الكارت | — |
| 15.0–18.6 | نفس الـIBAN… آخره أربعة أربعة واحد سبعة. | zoom على الحسابين و«=» | الأرقام ببطء |
| 19.0–21.5 | اتعدّل قبل الدفعات بسبع أيام، وبعده تلات دفعات. | chips | محايد |
| 21.5–24.0 | ده مؤشر للفحص، والدليل في سجل التعديل. مثال توضيحي. | سطر الدليل + العلامة المائية | — |
| 24.3–28.8 | الضابط: اعتماد ثنائي لأي تعديل في بنك المورّد، واللي بيضيف المورّد ما يعتمدش الصرف. | الضوابط | — |
| 29.3–34.0 | ‏Standard Enterprise Governance، المنصة اللي بتراجع نفسها. افحص ميزانك مجانًا على seg-audit.com. | الختام | — |

> **تنبيه:** مؤشر المورّد الوهمي (`GHOST_VENDOR`) محتاج تطبيق الموظفين في Odoo، ومش جزء من الفحص المجاني للميزان. علشان كده الـCTA هنا ما بيقولش «الفحص المجاني هيكشف ده».

### R8 · `reel-ghost-vendor_en` (EN VO)

**Hook:** "This supplier's bank account… **is** one of your employees'."

| s | VO | On screen |
|---|---|---|
| 0.2–4.8 | This supplier's bank account… is one of your employees'. An indicator to review, not an accusation. | hook → `IBAN = IBAN` |
| 5.3–11.8 | Why it slips: suppliers and employees sit in separate files. Audits test payments, not master data. And the bank details changed a week before the payments. | why |
| 12.2–24.0 | SEG matches supplier accounts against payroll. Same IBAN, ending four-four-one-seven. Changed seven days before three payments. The change log is the evidence. Illustrative test data. | evidence |
| 24.3–28.8 | The control: two-person approval for any supplier bank change, and segregation of duties. | controls |
| 29.3–34.0 | Standard Enterprise Governance, the platform that audits itself. seg-audit.com. | end card |

---

### R9 · `reel-round-manual_ar` · «أرقام مستديرة آخر الشهر»

**الهوك:** «خمسين ألف… مية ألف… خمسة وعشرين ألف… **مظبوطين أوي**.»
**نبرة الأداء:** 145 wpm. الأرقام الثلاثة بإيقاع ثابت زي العدّ، وبعدها سكتة، وبعدها «مظبوطين أوي» بنص ابتسامة. الكلمات المضغوطة: مظبوطين، آخر يومين، مستند.
**EN gloss:** Fifty thousand, a hundred thousand, twenty-five thousand: suspiciously neat. Round manual entries in the last two days of the month.

| الثانية | النص المنطوق | ما على الشاشة | ملاحظة أداء |
|---|---|---|---|
| 0.2–2.4 | خمسين ألف… مية ألف… خمسة وعشرين ألف… | العنوان «قيود يدوية بأرقام مستديرة» | عدّ منتظم |
| 2.6–4.8 | **مظبوطين أوي**. وكلهم في آخر يومين من الشهر. | `68%` (impact) | — |
| 5.3–6.2 | ليه ما بتلفتش النظر؟ | عنوان المشهد | — |
| 6.3–7.9 | قيود يدوية قليلة وسط آلاف القيود الآلية. | سبب 1 | — |
| 8.0–9.6 | والرقم المستدير شكله تقدير عادي. | سبب 2 | — |
| 9.7–11.8 | وآخر الشهر ضغط إقفال، والمراجعة بعدها بشهور. | سبب 3 | — |
| 12.2–14.8 | ‏SEG بيفرز القيود اليدوية لوحدها، ويبص على توقيتها ومبالغها. | الكارت | — |
| 15.0–18.6 | تلات قيود مستديرة، في آخر يومين، ومن غير مستند مرفق. | zoom على المبالغ | — |
| 19.0–21.5 | تمانية وستين في المية من قيمة القيود اليدوية… في آخر يومين. ملاحظة عالية. | chips + الدليل | الرقم بهدوء |
| 21.5–24.0 | مثال توضيحي، داتا اختبارية. | — | — |
| 24.3–28.8 | الضابط: مستند إلزامي فوق حد معيّن، واعتماد أعلى لقيود الإقفال. | الضوابط | — |
| 29.3–34.0 | ‏Standard Enterprise Governance، المنصة اللي بتراجع نفسها. افحص ميزانك مجانًا على seg-audit.com. | الختام | loop: «… عدّهم تاني» |

> الـloop هنا قوي، لأن «عدّهم تاني» بترجّع المشاهد على العدّ اللي في الهوك.

### R10 · `reel-round-manual_en` (EN VO)

**Hook:** "Fifty thousand. A hundred thousand. Twenty-five thousand. **Very neat.**"

| s | VO | On screen |
|---|---|---|
| 0.2–4.8 | Fifty thousand. A hundred thousand. Twenty-five thousand. *(pause)* Very neat. All in the last two days of the month. | hook → `68%` |
| 5.3–11.8 | Why they don't stand out: manual entries are few. Round figures look like estimates. And the audit comes months later. | why |
| 12.2–24.0 | SEG isolates manual entries and looks at timing and amounts. Three round entries, last two days, no document attached. Sixty-eight percent of manual-entry value. Illustrative test data. | evidence |
| 24.3–28.8 | The control: a supporting document above a threshold, and senior approval for closing entries. | controls |
| 29.3–34.0 | Standard Enterprise Governance, the platform that audits itself. seg-audit.com. | end card |

---

### R11 · `reel-no-receipt_ar` · «مصروفات من غير إيصال»

**الهوك:** «مصروفات اتعتمدت… ومفيش **إيصال واحد**.»
**نبرة الأداء:** 145 wpm. أخف ريل في السلسلة (خطورته متوسطة)، فالنبرة عملية من غير جدية زيادة. الكلمات المضغوطة: واحد، صغيرة، قبل الاعتماد.
**EN gloss:** Approved expense claims without a single receipt. Each one is small, so the annual sample skips them.

| الثانية | النص المنطوق | ما على الشاشة | ملاحظة أداء |
|---|---|---|---|
| 0.2–2.4 | مصروفات اتعتمدت… | العنوان | — |
| 2.6–4.8 | ومفيش **إيصال واحد**. ضيافة، وسفر، وعمولات. | `74%` (impact) + السطر الفرعي | التلات بنود بإيقاع |
| 5.3–6.2 | ليه بتعدّي؟ | عنوان المشهد | — |
| 6.3–7.9 | كل مطالبة لوحدها مبلغ صغير. | سبب 1 | — |
| 8.0–9.6 | ومتوزعة على ناس وحسابات كتير. | سبب 2 | — |
| 9.7–11.8 | والعيّنة السنوية نادرًا ما بتختارها. | سبب 3 | — |
| 12.2–14.8 | ‏SEG بيبص على كل مطالبة اتعتمدت، وهل ليها مرفق. | الكارت | — |
| 15.0–18.6 | واحد وتلاتين مطالبة من اتنين وأربعين… من غير مستند. | zoom على الجدول | — |
| 19.0–21.5 | ملاحظة متوسطة، والدليل: المطالبات نفسها في Odoo. | chips + الدليل | — |
| 21.5–24.0 | مثال توضيحي، داتا اختبارية. | — | — |
| 24.3–28.8 | الضابط: مرفق إلزامي قبل الاعتماد، وسقف واضح لأي مطالبة من غير إيصال. | الضوابط | — |
| 29.3–34.0 | ‏Standard Enterprise Governance، المنصة اللي بتراجع نفسها. افحص ميزانك مجانًا على seg-audit.com. | الختام | — |

### R12 · `reel-no-receipt_en` (EN VO)

**Hook:** "Approved expenses… and not **one** receipt."

| s | VO | On screen |
|---|---|---|
| 0.2–4.8 | Approved expenses… and not one receipt. Hospitality, travel, commissions. | hook → `74%` |
| 5.3–11.8 | Why they slip: each claim is small, spread across people and accounts, and the annual sample rarely picks them. | why |
| 12.2–24.0 | SEG checks every approved claim for an attachment. Thirty-one of forty-two with no document. A medium finding; the evidence is the claims themselves in Odoo. Illustrative test data. | evidence |
| 24.3–28.8 | The control: an attachment before approval, and a clear cap for claims without a receipt. | controls |
| 29.3–34.0 | Standard Enterprise Governance, the platform that audits itself. seg-audit.com. | end card |

---

## 4. سكربتات TikTok (4 × 8 ث)

الفيديوهات دي **صورة ثابتة عليها zoom بطيء بنسبة 4%** (`ZOOM = 0.04`)، ومفيهاش قطعات. علشان كده الصوت هو اللي بيعمل الإيقاع. ميزانية الكلام **16–19 كلمة**.

### T1 · `tiktok-9x16_live-ar` · «متاح الآن»

على الشاشة: «متاح الآن» · «منصة المراجعة المستمرة لدفاترك» · «فحص مجاني لميزان شركتك يكشف نقاط الخطر في دقائق» · `app.seg-audit.com`

**الهوك:** «دفاترك بتتراجع **مرة في السنة**… والباقي؟»
**نبرة الأداء:** 150 wpm. سؤال مستفز بهدوء، وبعده إجابة واثقة.
**EN gloss:** Your books get audited once a year. And the rest? Continuous audit, now live. Free trial-balance check.

| الثانية | النص المنطوق | ما على الشاشة | ملاحظة أداء |
|---|---|---|---|
| 0.1–2.6 | دفاترك بتتراجع **مرة في السنة**… والباقي؟ | «متاح الآن» | سكتة 0.3 ث قبل «والباقي؟» |
| 2.8–5.0 | ‏SEG بيراجعها على طول. متاح دلوقتي. | العنوان | — |
| 5.2–7.8 | افحص ميزانك مجانًا… مؤشرات في دقايق، مش تقرير مراجعة. | الدعم + الرابط | آخر كلمة قبل 7.8 |

### T2 · `tiktok-9x16_live-en`

**Hook:** "Your books get audited **once a year**… and the rest?"

| s | VO | On screen |
|---|---|---|
| 0.1–2.6 | Your books get audited once a year… and the rest? | "Now live" |
| 2.8–5.0 | SEG reviews them continuously. Live now. | title |
| 5.2–7.8 | Check your trial balance free. Indicators in minutes, not an audit report. | support + link |

### T3 · `tiktok-9x16_close-ar` · «سعر المؤسِّس يُغلق 30 نوفمبر» (بديل `seats-ar`)

على الشاشة (نسخة `close`): التاريخ «30 نوفمبر · 11:59 م» · «سعر المؤسِّس يُغلق نهائيًا» · «العضوية بالطلب» · الرابط

**الهوك:** «فيه باب **بيقفل** يوم ٣٠ نوفمبر… ومش أي حد هيدخل.»
**نبرة الأداء:** 140 wpm. وقور، من غير عدّ تنازلي صاخب. «مش كل طلب بيتقبل» تتقال كحقيقة، مش كتهديد. الكلمات المضغوطة: بيقفل، بالطلب، مش كل.
**EN gloss:** Founder pricing closes on 30 November at 11:59 pm Cairo time. Membership is by application, and not every application is accepted.

| الثانية | النص المنطوق | ما على الشاشة | ملاحظة أداء |
|---|---|---|---|
| 0.1–2.8 | فيه باب **بيقفل** يوم ٣٠ نوفمبر… ومش أي حد هيدخل. | التاريخ | سكتة قبل «ومش» |
| 3.0–5.4 | سعر المؤسِّس بيقفل الساعة ١١:٥٩ بالليل… ومش راجع. | سطر الإغلاق | «ومش راجع» أوطى |
| 5.6–7.8 | العضوية بالطلب، ومش كل طلب بيتقبل. قدّم من seg-audit.com. | «العضوية بالطلب» + الرابط | الدومين على آخر frame |

> **مهم:** التاريخ والساعة هنا **منطوقين**، فلو `founding.closesAt` اتغيّر، لازم الـVO يتسجّل تاني، لأن `close-date.js --from` بيعدّل النص بس، مش الصوت. سجّل الجملتين الأولى والتانية كملفات منفصلة علشان الاستبدال يكون سهل.

### T4 · `tiktok-9x16_close-en`

**Hook:** "A door **closes** on the thirtieth of November… and not everyone gets in."

| s | VO | On screen |
|---|---|---|
| 0.1–2.8 | A door closes on the thirtieth of November… and not everyone gets in. | date |
| 3.0–5.4 | Founder pricing ends at eleven fifty-nine pm, Cairo time. It doesn't come back. | close line |
| 5.6–7.8 | Membership is by application, and not every one is accepted. seg-audit.com. | membership + link |

---

## 5. قائمة فحص النصوص قبل التسجيل

- [ ] مفيش أي عدد مقاعد، ولا سعر، ولا نسبة خصم، ولا «مدى الحياة».
- [ ] الحقائق الوحيدة عن المنصة هي اللي في `platform-facts.js`. السكربتات الحالية **مش بتستخدمها**، ولو اتضافت لازم تتقال «أكتر من 9,900 اختبار» (حد أدنى)، «388 فحص».
- [ ] كل ريل فيه «مثال توضيحي» منطوقة مرة على الأقل، والعلامة المائية ظاهرة على الشاشة.
- [ ] «ملاحظة / مؤشر» مش «احتيال / سرقة»، وR7 فيه «مش اتهام» منطوقة.
- [ ] الفحص المجاني = «مؤشرات… مش تقرير مراجعة».
- [ ] تاريخ الإغلاق المنطوق (T3/T4، وCTA-B) مطابق لـ`node scripts/close-date.js`.
- [ ] شغّل `node scripts/close-date.js --check` بعد أي تعديل على الملف ده.

---

## 6. مواصفة الهندسة الصوتية (للتنفيذ بـffmpeg)

> **ما اتولّدش أي صوت.** المواصفة دي جاهزة للتنفيذ أول ما ملفات الـVO والموسيقى توصل.
> **ملاحظة عن الوضع الحالي:** الريلز فيها soundtrack مولَّد بالكود (`scripts/reels-audio.js`: bed + whoosh + tick + impact + resolve)، ومظبوط على **-16 LUFS** و-1.5 dBFS peak. فيديوهات TikTok **صامتة**. المواصفة دي بتنقل الكل لـ**-14 LUFS**.
> **الموسيقى:** عندك اختيارين: (أ) تستخدم الـbed المولَّد من `reels-audio.js`، وده مالوش رخصة لأنه مولَّد بالكامل، بس محتاج تعديل صغير في السكربت يطلّع stems منفصلة (bed / sfx)، لأنه حاليًا بيطلّع mix واحد. (ب) موسيقى royalty-free من مكتبة مرخّصة (Artlist / Epidemic / YouTube Audio Library)، واحفظ إثبات الرخصة.

### 6.1 الأهداف النهائية (لكل الفيديوهات)

| البند | القيمة |
|---|---|
| Integrated loudness | **-14 LUFS** (±0.5) |
| True peak | **≤ -1.0 dBTP** |
| LRA | 5–8 LU (حد أقصى 9) |
| Sample rate / codec | 48 kHz، stereo، **AAC-LC 320 kbps** |
| VO (short-term loudness وقت الكلام) | حوالي -14 إلى -12 LUFS-S |
| Music bed من غير كلام | -24 LUFS-S |
| Music bed تحت الكلام (بعد الـducking) | **-28 إلى -30 LUFS-S**، يعني حوالي 14–16 LU تحت الـVO |
| SFX | peaks بين -10 و-6 dBFS قبل الـmaster، والـimpact أعلى واحد |
| Video | `-c:v copy`، الفيديو ما بيتلمسش |

### 6.2 الموسيقى لكل فيديو

| الفيديو | النوع / المزاج | BPM | المفتاح | ملاحظات |
|---|---|---|---|---|
| R1/R2 دفعة مكررة | Minimal tech / pulse ambient، متوتر وهادي | 90 | A minor | pulse خفيف يدخل مع الـzoom عند 15 ث |
| R3/R4 قيد بعد الإقفال | Investigative ambient (clock-like ticks) | 84 | D minor | تكّات ساعة خفيفة جدًا في مشهد why |
| R5/R6 حساب وسيط | Dark ambient pad، بيتصاعد ببطء | 80 | F minor | الـpad يعلى مع الأعمدة (12–19 ث) |
| R7/R8 مورّد وموظف | Neutral documentary، من غير drama | 76 | C minor → Eb | **ممنوع** أي «suspense sting» يوحي باتهام |
| R9/R10 أرقام مستديرة | Minimal piano + soft pulse | 92 | G minor | الهوك على 3 نبضات متزامنة مع العدّ |
| R11/R12 بلا إيصال | Light corporate minimal | 96 | C major / A minor | أخف واحد في السلسلة |
| T1/T2 live | Uplifting minimal tech | 110 | E major | fade-in في أول 0.3 ث، ونبضة على الرابط |
| T3/T4 close | Slow cinematic swell + clock texture | 70 | D minor → F major على آخر سطر | من غير tick-tock عالي ولا countdown beeps |

**حجم الـbed:** يتصدّر قبل الـducking عند -24 LUFS integrated. fade-in بـ0.3 ث، وfade-out من 32.8 لـ34.0 في الريلز، ومن 7.4 لـ8.0 في TikTok.

### 6.3 الـSFX (مربوطة بقطعات المولّد)

**المصدر:** إمّا من `reels-audio.js` (مولّد، مالوش رخصة)، أو من مكتبة royalty-free. كلمات البحث بين القوسين.

| الثانية (ريل) | الصوت | كلمات البحث | المستوى |
|---|---|---|---|
| 0.25 | soft riser قصير لسطر البراند | "soft riser short", "UI swell" | -18 dBFS peak |
| **2.6** | **impact / sub drop** (92→44 Hz) مع الرقم المفتاحي | "sub drop impact cinematic", "low boom" | -8 dBFS، وهو أعلى SFX |
| 5.0 · 12.0 · 24.0 · 29.0 | whoosh انتقال المشهد، وفي العربي بيتحرك من اليمين للشمال | "air whoosh soft transition" | -16 dBFS |
| 6.3 · 8.0 · 9.7 | tick لكل سبب | "UI tick soft", "glass ping" | -18 dBFS |
| 15.0 | zoom swoosh خفيف | "camera zoom swish subtle" | -20 dBFS |
| 15.3 → 16.0 | ticks التظليل | "UI highlight tick" | -20 dBFS |
| 19.0 · 19.35 · 19.7 | chip pops | "pop UI soft" | -18 dBFS |
| 19.6 | شارة الخطورة: **ping محايد**، مش alarm | "notification ping neutral" | -16 dBFS |
| 25.0 · 25.9 · 26.8 | ticks الضوابط (check) | "check confirm soft" | -18 dBFS |
| **31.9** | **resolve chord** (A add9 bell) مع seg-audit.com | "bell chord resolve", "success chime warm" | -12 dBFS |

**TikTok:** soft riser عند 0.0، وpop خفيف عند 5.6 مع الرابط، وفي T3/T4 كمان clock texture خفيفة من 0 لـ5.4 ث عند -26 dBFS.
**ممنوع:** صفارات إنذار، أو كاش ريجستر، أو أي صوت كوميدي، أو «tension sting» على R7.

### 6.4 سلسلة الـVO (مرتبة)

1. **Highpass 80 Hz** (`highpass=f=80:poles=2`)، وبعده lowpass 16 kHz لتنضيف الهيس.
2. **Noise gate / denoise خفيف** (`afftdn=nr=10:nf=-45`) لو التسجيل مش في استوديو.
3. **EQ:**
   - قص 250 Hz بـ-2 dB (Q 1.0) علشان صوت الأوضة الـboxy.
   - presence عند 3.5 kHz بـ+2.5 dB (Q 1.2).
   - air عند 10 kHz بـ+1.5 dB (shelf).
4. **De-ess** (`deesser=i=0.4:m=0.5:f=0.5`) على حروف الـس والـش والـص.
5. **Compressor:** `acompressor=threshold=-20dB:ratio=3:attack=5:release=80:makeup=3dB:knee=4`.
6. **Limiter** على الـVO stem عند -3 dBFS (`alimiter=limit=0.7`).

### 6.5 الـDucking (sidechain)

الموسيقى بتنزل تحت الكلام تلقائيًا:
`sidechaincompress=threshold=0.03:ratio=8:attack=20:release=350:knee=6:makeup=1`
- `threshold=0.03` تقريبًا -30 dBFS، فأي كلام بيشغّل الـducking.
- النتيجة حوالي 8–12 dB reduction تحت الكلام، وده اللي بيوصل الـbed لـ-28/-30 LUFS-S.
- `release=350ms` بيخلّي الموسيقى ترجع بنعومة في السكتات (مهم جدًا لسكتة 2.4–2.6 ث قبل الـimpact).
- **الـSFX ما بتتعملهاش ducking.** بتدخل الـmix بعد الـsidechain.

### 6.6 الإيقاع

- الـVO يبدأ عند **0.2 ث** في الريلز و**0.1 ث** في TikTok.
- سكتة **0.2 ث** قبل الـimpact (2.4–2.6)، والموسيقى ما تتعملهاش ducking فيها، فالمشاهد يحس بالفراغ.
- كل سطر في جدول التوقيت **يبتدي على الـcue بتاعه أو بعده بـ≤0.1 ث**، وعمره ما يبتدي قبله.
- سيب 0.3–0.5 ث فاضية قبل كل انتقال مشهد (5.0، 12.0، 24.0، 29.0) علشان الـwhoosh.
- آخر كلمة في الريل تخلص قبل **33.6 ث**، وفي TikTok قبل **7.8 ث**.

### 6.7 أوامر ffmpeg (قوالب)

اسماء الملفات المفترضة: `vo.wav` (VO متسجّل كملف واحد على click-track 34 ث)، و`music.wav`، و`sfx.wav` (الـSFX متجمّعة على timeline واحدة)، و`video.mp4`.

**0) تأكيد المدة والمقاس:**
```bash
ffprobe -v error -show_entries format=duration:stream=codec_type,width,height,sample_rate -of compact video.mp4
```

**1) تجهيز الـVO** (السلسلة اللي في §6.4):
```bash
ffmpeg -i vo_raw.wav -af "highpass=f=80:poles=2,lowpass=f=16000,afftdn=nr=10:nf=-45,equalizer=f=250:t=q:w=1.0:g=-2,equalizer=f=3500:t=q:w=1.2:g=2.5,highshelf=f=10000:g=1.5,deesser=i=0.4:m=0.5:f=0.5,acompressor=threshold=-20dB:ratio=3:attack=5:release=80:makeup=3dB:knee=4,alimiter=limit=0.7" -ar 48000 -ac 2 vo.wav
```

**1-ب) لو الـVO متسجّل سطر سطر:** كل سطر يتحط على الـcue بتاعه بـ`adelay` (بالمللي ثانية). مثال لـR1 بأول 3 سطور:
```bash
ffmpeg -i l01.wav -i l02.wav -i l03.wav -filter_complex "[0]adelay=200|200[a];[1]adelay=2600|2600[b];[2]adelay=5300|5300[c];[a][b][c]amix=inputs=3:normalize=0,apad=whole_dur=34" -ar 48000 vo.wav
```

**2) الـmix (ducking + SFX):**
```bash
ffmpeg -i vo.wav -i music.wav -i sfx.wav -filter_complex "[1:a]volume=0dB,afade=t=in:d=0.3,afade=t=out:st=32.8:d=1.2[m];[0:a]asplit=2[vo][sc];[m][sc]sidechaincompress=threshold=0.03:ratio=8:attack=20:release=350:knee=6:makeup=1[md];[vo][md][2:a]amix=inputs=3:normalize=0:duration=first[mix]" -map "[mix]" -ar 48000 -c:a pcm_s24le mix.wav
```
> في TikTok: `afade=t=out:st=7.4:d=0.6`، وخلّي `duration=first` لأن طول الـVO بيحدد طول الـmix.

**3) Loudness — pass 1** (قياس):
```bash
ffmpeg -i mix.wav -af loudnorm=I=-14:TP=-1.0:LRA=7:print_format=json -f null -
```

**4) Loudness — pass 2** (تطبيق بالقيم المقاسة؛ استبدل `<…>` بقيم الـJSON):
```bash
ffmpeg -i mix.wav -af loudnorm=I=-14:TP=-1.0:LRA=7:measured_I=<input_i>:measured_TP=<input_tp>:measured_LRA=<input_lra>:measured_thresh=<input_thresh>:offset=<target_offset>:linear=true:print_format=summary -ar 48000 mix_norm.wav
```

**5) الـmux على الفيديو** (الفيديو بيتنسخ زي ما هو، والصوت القديم بيتشال):
```bash
ffmpeg -i video.mp4 -i mix_norm.wav -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 320k -ar 48000 -ac 2 -shortest -movflags +faststart out.mp4
```

**6) التحقق النهائي:**
```bash
ffmpeg -i out.mp4 -af ebur128=peak=true -f null - 2>&1 | tail -12
```
المطلوب: `I ≈ -14.0 LUFS`، و`True peak ≤ -1.0 dBFS`، و`LRA ≤ 9 LU`.

### 6.8 تسمية الملفات

```
marketing/designs/video/vo/
  <slug>_<lang>_vo_raw.wav        # التسجيل الخام (48k/24-bit)، ما يتعدّلش
  <slug>_<lang>_vo.wav            # بعد السلسلة
  <slug>_<lang>_mix_-14LUFS.wav   # الـmix النهائي
marketing/designs/video/
  <slug>_<lang>_1080x1920_vo.mp4  # الفيديو النهائي بالصوت (الأصل من غير VO بيفضل زي ما هو)
```
مثال: `reel-duplicate-payment_ar_1080x1920_vo.mp4`، و`tiktok-9x16_close-ar_1080x1920_8s_vo.mp4`.
**ملفات الصوت الكبيرة (`*.wav`) تفضل برّه git** لحد ما يتقرر هتتخزّن فين.

### 6.9 قائمة التسليم

- [ ] 16 ملف VO (12 ريل + 4 TikTok)، كلهم بنفس الصوت ونفس المايك ونفس الأوضة.
- [ ] نسخة CTA-B للريلز الـ6 العربي (سطرين لكل واحد).
- [ ] سطور التاريخ في T3/T4 متسجّلة كملفات منفصلة.
- [ ] الموسيقى: ملف لكل فيديو، ومعاه إثبات رخصة أو إثبات إنه مولَّد بالكود.
- [ ] الـSFX على timeline الـcues اللي في §6.3.
- [ ] كل `out.mp4` عدّى التحقق في §6.7 خطوة 6.
- [ ] مراجعة سمعية على موبايل بسماعة الموبايل نفسها، علشان الـVO يبان فوق الموسيقى.
- [ ] مراجعة سمعية على R7 تحديدًا: نبرة محايدة، ومفيش أي صوت بيوحي باتهام.
- [ ] ترجمة على الشاشة (SRT/burned-in) من نفس النصوص دي، لأن أغلب المشاهدة على Reels بتكون من غير صوت.
- [ ] `node scripts/close-date.js --check` نظيف قبل النشر.
