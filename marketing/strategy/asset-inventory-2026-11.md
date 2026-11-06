# جرد الفيديوهات والتصميمات: Standard Enterprise Governance (SEG) · نوفمبر 2026

> **التاريخ:** الجمعة 6 نوفمبر 2026 · **النطاق:** `marketing/brand/assets/` و`marketing/designs/` و`src/assets/img/launch/`. النسخ المنشورة في `src/assets/social/` هي نسخ مطابقة لملفات في `marketing/designs/` (مذكورة أسفل الجدول).
> **المنهج:** الجدول مولَّد من الملفات الموجودة على القرص، صف لكل تصميم (يجمع JPG وWebP وPNG للتصميم الواحد). الحالة مأخوذة من قواعد سكربتات التوليد (`scripts/*.js` تقرأ `founding.showCount` وهي الآن `true`)، **وتأكدتُ منها بالعين على عيّنة** من المجموعات المتأثرة: `instagram-square_seats-ar/en` و`story_seats-ar` و`meta-feed-4x5_seats-ar` و`linkedin-facebook-link_seats-ar` و`neutral-seats` و`golden-2-hourglass` و`psych-4` و`hemicycle` و`founder-pov` وstoryboards الفيديو وإطار من `tiktok-9x16_seats-ar_8s.mp4`. **لم أفتح كل ملف على حدة.** تُراجَع الحالة بالعين قبل أي استخدام.
> **مرجع الندرة الجديدة:** يُلغى عدّاد «33 من 50». الندرة الجديدة = **نافذة إغلاق** (سعر المؤسِّس يختفي نهائيًا في تاريخ محدد) + **انتقائية** (بالطلب فقط، وليس كل طلب يُقبل).


> **تحديث 6 نوفمبر 2026 (برانش `content/launch-fixes-nov`):** الـ35 تصميمًا 🟡 (11 رقم الاختبارات + 24 نطاق الفحص) **أُصلحت وأُعيد توليدها** (الحالة في الجدول محدّثة). الـ48 ⛔ لم تُعدَّل: قائمة إعادة التصميم بالمواصفات في [`design-redo-list.md`](design-redo-list.md). الـ2 og:image (🟡) تبقى حتى قرار الموقع.
## الخلاصة

| | العدد |
|---|---|
| **فيديوهات** (MP4) | **16**: 12 ريل سينمائي 34 ث (6 سيناريوهات × عربي/إنجليزي) + 4 إعلانات TikTok ثابتة متحركة 8 ث |
| **تصميمات** (صورة/PDF، بلا أدوات داخلية) | **215** تصميمًا فريدًا (كل واحد غالبًا JPG + WebP): 213 في `marketing/` + 2 og:image للموقع. منها ملفّا PDF للكاروسيل |
| أدوات داخلية (خطوط φ ومناطق آمنة) | 13، لا تُنشر |
| **تناقض الندرة الجديدة (⛔ يُعاد أو يُسحب)** | **48 أصلًا: 2 فيديو + 46 تصميمًا** |
| **يحتاج تعديلًا نصيًا (🟡)** | 37: 11 برقم اختبارات قديم، و24 بادعاء «5 مؤشرات» بلا شرط Odoo، و2 og:image بندرة كمية |
| **جاهز (✅)** | الباقي: 12 ريل، والأغلفة والأفاتار، و«متاح الآن»، والجرافيتي/اليد/الملصق، وحزمة psych (عدا 4 و5)، وgolden 1 و4، وشاشة التقرير التوضيحية، ودعوة البث |

### ⛔ ما يناقض الندرة الجديدة (أولوية قصوى: لا يُستخدم في أي منشور أو إعلان)

| المجموعة | الملفات | ما عليه | البديل |
|---|---|---|---|
| مقاعد launch-images | `social/*_seats-{ar,en}_*` (10)، `social/*_neutral-seats_*` (4)، `ads/meta-feed-*_seats-*` (4)، `ads/tiktok-9x16_seats-*` (2) | «33/50 · انضمت 17 شركة» أو شبكة 17 مقعدًا ممتلئًا | إعادة توليد بنسخة «نافذة الإغلاق» (انظر المراجعة §C) |
| فيديو TikTok 8 ث | `ads/video/tiktok-9x16_seats-{ar,en}_1080x1920_8s.mp4` | نفس لوحة 33/50 | استبداله بـ`live-*` أو ريل |
| golden v2 | `golden/2-hourglass/*` (2 + 2 guides) | «باقي ٣٣ مقعدًا من ٥٠ · انضمّت ١٧» | **مذكور كإعلان رقم 2 في `sales/meta-build-sheet.md`**: يُستبدل قبل إطلاق الحملة |
| psych | `psych/4-scarcity-proof/*` (3) | «باقي ٣٣ من ٥٠» | يُسحب. الانتقائية بديله |
| concepts | `hemicycle/*` (8) | «باقي 33 من 50 · 17 شركة انضمّت» | الهيميسايكل نفسه قوي: يُعاد كـ«مجلس الأعضاء المؤسِّسين» بلا مقاعد ممتلئة + تاريخ الإغلاق |
| Founder POV | `founder-pov/*` (4) | شارة «باقي 33 من 50» | الشارة تصبح «سعر المؤسِّس يُغلق [التاريخ]» |
| إطارات الفيديو | `video-a_*_frame-5`، `video-b_*_frame-4`، والـ4 storyboards | لقطة الختام 33/50 | إطار ختام جديد |
| غلاف Highlight | `brand/assets/highlights/instagram-highlight_02-seats` | 12 مقعدًا ممتلئًا من 25 (عدّاد ضمني) | أيقونة ختم/مفتاح بلا عدّ |

**منشورة على الموقع الآن (روابط عامة):** `src/assets/social/instagram-square_seats-ar_1080x1080.jpg` و`story_seats-ar_1080x1920.jpg` و`golden/golden-2-hourglass_ar_{1x1,4x5}.jpg` نسخ من ملفات ⛔، وروابطها مكتوبة في `launch-week.md` و`meta-build-sheet.md`. تُسحب من الخطط فورًا، وحذفها من الموقع قرار لفريق الموقع.

### 🟡 ملاحظات «الدليل أو الصمت» على تصميمات جاهزة بصريًا

1. **رقم الاختبارات:** `self-audit/*` و`psych-5-meta-authority/*` و`golden-3-hawk-eye/*` تقول «+7,900 اختبار». المصدر الحالي `src/content/platform-facts.js` (قياس 5 نوفمبر 2026، commit `649e283f`) = **9,900 اختبار، و388 فحصًا في 22 تقريرًا**. الرقم القديم ليس كاذبًا (أقل من الحقيقي)، لكنه يختلف عن الموقع. يُعاد التوليد.
2. **نطاق الفحص المجاني:** `tb-check/*` والكاروسيل `carousel-5-mistakes_*` تعرض 5 مؤشرات. حسب `PENDING-DECISIONS.md` بند 8 (تحقق 3 نوفمبر): **ملف الميزان وحده يحسب عدم الاتزان والأرصدة الشاذة فقط**؛ الحسابات المعلّقة والقيود اليدوية والتواريخ الرجعية تحتاج ربط Odoo أو دفتر يومية. يُضاف سطر «3 منها مع ربط Odoo» أو يُعاد التصميم، **إلا إذا** تأكد الفريق أن التطبيق تغيّر بعد 3 نوفمبر.
3. **og:image صفحة المؤسِّسين** (`src/assets/img/launch/founding-og-{ar,en}.jpg`): بلا عدّاد (جيد)، لكن رسالته «50 مقعد فقط» ندرة كمية. تُستبدل بنسخة نافذة الإغلاق عند تحديد التاريخ.

### ما هو غير موجود (فجوات أصول)

| الأصل الناقص | لماذا يهم | مذكور في |
|---|---|---|
| **فيديو المؤسس** (أي لقطة حقيقية لأحمد أشرف) | الـoverlay جاهز بلا فيديو. الثقة في B2B تُبنى بوجه | `content/week-1/tiktok.md` ي6، `concepts/founder-pov/` |
| **تصميم الشركاء** | يوم 5 (الأحد 8 نوفمبر) بلا تصميم مخصّص | `workflow/launch-week.md` |
| **تسجيل البث الحي** وقصاصاته | البث 10 نوفمبر هو أغنى مادة خام للأسبوعين القادمين | `launch-week.md` ي7 |
| **ريلز سعودية اللهجة** | الطقم كله مصري خفيف، والسعودية سوق الـARPA | `meta-build-sheet.md` §8 |
| **أصول نافذة الإغلاق والانتقائية** | لا يوجد تصميم واحد بالرسالة الجديدة | — |
| **فيديو أفقي 16:9 لـYouTube** وصور LinkedIn 1:1 للمستندات | YouTube فيه Shorts فقط، ولا محتوى طويل | `content/week-1/youtube.md` |
| أصول إنجليزية لـgolden وpsych وguerrilla | كلها عربي فقط؛ مقبول لأن الإنجليزي للسعودية (وافدين) فقط | — |

## الجدول الكامل (صف لكل تصميم)

**الأعمدة:** المسار بلا امتداد · الصيغ · النوع · الأبعاد · القناة · الحالة.

| المسار | الصيغ | النوع | الأبعاد | القناة / الاستخدام | الحالة |
|---|---|---|---|---|---|
| `marketing/brand/assets/avatars/avatar_facebook_720x720` | png+webp | avatar | 720×720 | Facebook | ✅ جاهز |
| `marketing/brand/assets/avatars/avatar_instagram_1080x1080` | png+webp | avatar | 1080×1080 | Instagram | ✅ جاهز |
| `marketing/brand/assets/avatars/avatar_linkedin_400x400` | png+webp | avatar | 400×400 | LinkedIn | ✅ جاهز |
| `marketing/brand/assets/avatars/avatar_master_1080x1080` | png+webp | avatar | 1080×1080 | master | ✅ جاهز |
| `marketing/brand/assets/avatars/avatar_tiktok_720x720` | png+webp | avatar | 720×720 | TikTok | ✅ جاهز |
| `marketing/brand/assets/avatars/avatar_whatsapp_640x640` | png+webp | avatar | 640×640 | WhatsApp | ✅ جاهز |
| `marketing/brand/assets/avatars/avatar_x_400x400` | png+webp | avatar | 400×400 | — | ✅ جاهز |
| `marketing/brand/assets/avatars/avatar_youtube_800x800` | png+webp | avatar | 800×800 | YouTube | ✅ جاهز |
| `marketing/brand/assets/covers/facebook-page-cover_1640x624` | png+webp | cover | 1640×624 | Facebook | ✅ جاهز |
| `marketing/brand/assets/covers/linkedin-company-cover_1128x191` | png+webp | cover | 1128×191 | LinkedIn | ✅ جاهز |
| `marketing/brand/assets/covers/linkedin-personal-banner_1584x396` | png+webp | cover | 1584×396 | LinkedIn | ✅ جاهز |
| `marketing/brand/assets/covers/safe-area-guides/facebook-page-cover_1640x624_guide` | webp | guide (internal) | 1640×624 | Facebook | ✅ أداة داخلية |
| `marketing/brand/assets/covers/safe-area-guides/linkedin-company-cover_1128x191_guide` | webp | guide (internal) | 1128×191 | LinkedIn | ✅ أداة داخلية |
| `marketing/brand/assets/covers/safe-area-guides/linkedin-personal-banner_1584x396_guide` | webp | guide (internal) | 1584×396 | LinkedIn | ✅ أداة داخلية |
| `marketing/brand/assets/covers/safe-area-guides/x-header_1500x500_guide` | webp | guide (internal) | 1500×500 | X | ✅ أداة داخلية |
| `marketing/brand/assets/covers/safe-area-guides/youtube-channel-banner_2560x1440_guide` | webp | guide (internal) | 2560×1440 | YouTube | ✅ أداة داخلية |
| `marketing/brand/assets/covers/x-header_1500x500` | png+webp | cover | 1500×500 | X | ✅ جاهز |
| `marketing/brand/assets/covers/youtube-channel-banner_2560x1440` | png+webp | cover | 2560×1440 | YouTube | ✅ جاهز |
| `marketing/brand/assets/highlights/instagram-highlight_01-platform_1080x1920` | png+webp | IG highlight cover | 1080×1920 | Instagram | ✅ جاهز |
| `marketing/brand/assets/highlights/instagram-highlight_02-seats_1080x1920` | png+webp | IG highlight cover | 1080×1920 | Instagram | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/brand/assets/highlights/instagram-highlight_03-trust_1080x1920` | png+webp | IG highlight cover | 1080×1920 | Instagram | ✅ جاهز |
| `marketing/brand/assets/highlights/instagram-highlight_04-insights_1080x1920` | png+webp | IG highlight cover | 1080×1920 | Instagram | ✅ جاهز |
| `marketing/brand/assets/highlights/instagram-highlight_05-contact_1080x1920` | png+webp | IG highlight cover | 1080×1920 | Instagram | ✅ جاهز |
| `marketing/brand/assets/watermark/youtube-watermark_150x150` | png+webp | watermark | 150×150 | YouTube | ✅ جاهز |
| `marketing/designs/ads/meta-feed-1x1_live-ar_1080x1080` | jpg+webp | image | 1080×1080 | Meta feed 1:1 | ✅ جاهز |
| `marketing/designs/ads/meta-feed-1x1_live-en_1080x1080` | jpg+webp | image | 1080×1080 | Meta feed 1:1 | ✅ جاهز |
| `marketing/designs/ads/meta-feed-1x1_seats-ar_1080x1080` | jpg+webp | image | 1080×1080 | Meta feed 1:1 | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/ads/meta-feed-1x1_seats-en_1080x1080` | jpg+webp | image | 1080×1080 | Meta feed 1:1 | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/ads/meta-feed-4x5_live-ar_1080x1350` | jpg+webp | image | 1080×1350 | Meta feed 4:5 | ✅ جاهز |
| `marketing/designs/ads/meta-feed-4x5_live-en_1080x1350` | jpg+webp | image | 1080×1350 | Meta feed 4:5 | ✅ جاهز |
| `marketing/designs/ads/meta-feed-4x5_seats-ar_1080x1350` | jpg+webp | image | 1080×1350 | Meta feed 4:5 | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/ads/meta-feed-4x5_seats-en_1080x1350` | jpg+webp | image | 1080×1350 | Meta feed 4:5 | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/ads/tiktok-9x16_live-ar_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | TikTok Ads | ✅ جاهز |
| `marketing/designs/ads/tiktok-9x16_live-en_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | TikTok Ads | ✅ جاهز |
| `marketing/designs/ads/tiktok-9x16_seats-ar_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | TikTok Ads | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/ads/tiktok-9x16_seats-en_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | TikTok Ads | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/ads/video/tiktok-9x16_live-ar_1080x1920_8s` | mp4 | video | 1080×1920 | TikTok Ads | ✅ جاهز |
| `marketing/designs/ads/video/tiktok-9x16_live-en_1080x1920_8s` | mp4 | video | 1080×1920 | TikTok Ads | ✅ جاهز |
| `marketing/designs/ads/video/tiktok-9x16_seats-ar_1080x1920_8s` | mp4 | video | 1080×1920 | TikTok Ads | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/ads/video/tiktok-9x16_seats-en_1080x1920_8s` | mp4 | video | 1080×1920 | TikTok Ads | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/concepts/before-after/before-after_ar_link_1200x630` | jpg+webp | image | 1200×630 | LinkedIn/FB link | ✅ جاهز |
| `marketing/designs/concepts/before-after/before-after_ar_portrait_1080x1350` | jpg+webp | image | 1080×1350 | Meta feed 4:5 | ✅ جاهز |
| `marketing/designs/concepts/before-after/before-after_ar_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/concepts/before-after/before-after_ar_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/concepts/before-after/before-after_en_link_1200x630` | jpg+webp | image | 1200×630 | LinkedIn/FB link | ✅ جاهز |
| `marketing/designs/concepts/before-after/before-after_en_portrait_1080x1350` | jpg+webp | image | 1080×1350 | Meta feed 4:5 | ✅ جاهز |
| `marketing/designs/concepts/before-after/before-after_en_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/concepts/before-after/before-after_en_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/concepts/before-after/before-after_neutral_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/concepts/before-after/before-after_neutral_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/concepts/carousel/carousel-5-mistakes_ar` | pdf | carousel slide | — | LinkedIn document | ✅ مُصلَح 6 نوفمبر (سطر «01 و04 و05 بربط Odoo») |
| `marketing/designs/concepts/carousel/carousel-5-mistakes_ar_01_1080x1350` | jpg+webp | carousel slide | 1080×1350 | IG/FB carousel | ✅ مُصلَح 6 نوفمبر (سطر «01 و04 و05 بربط Odoo») |
| `marketing/designs/concepts/carousel/carousel-5-mistakes_ar_02_1080x1350` | jpg+webp | carousel slide | 1080×1350 | IG/FB carousel | ✅ مُصلَح 6 نوفمبر (سطر «01 و04 و05 بربط Odoo») |
| `marketing/designs/concepts/carousel/carousel-5-mistakes_ar_03_1080x1350` | jpg+webp | carousel slide | 1080×1350 | IG/FB carousel | ✅ مُصلَح 6 نوفمبر (سطر «01 و04 و05 بربط Odoo») |
| `marketing/designs/concepts/carousel/carousel-5-mistakes_ar_04_1080x1350` | jpg+webp | carousel slide | 1080×1350 | IG/FB carousel | ✅ مُصلَح 6 نوفمبر (سطر «01 و04 و05 بربط Odoo») |
| `marketing/designs/concepts/carousel/carousel-5-mistakes_ar_05_1080x1350` | jpg+webp | carousel slide | 1080×1350 | IG/FB carousel | ✅ مُصلَح 6 نوفمبر (سطر «01 و04 و05 بربط Odoo») |
| `marketing/designs/concepts/carousel/carousel-5-mistakes_ar_06_1080x1350` | jpg+webp | carousel slide | 1080×1350 | IG/FB carousel | ✅ مُصلَح 6 نوفمبر (سطر «01 و04 و05 بربط Odoo») |
| `marketing/designs/concepts/carousel/carousel-5-mistakes_ar_07_1080x1350` | jpg+webp | carousel slide | 1080×1350 | IG/FB carousel | ✅ مُصلَح 6 نوفمبر (سطر «01 و04 و05 بربط Odoo») |
| `marketing/designs/concepts/carousel/carousel-5-mistakes_en` | pdf | carousel slide | — | LinkedIn document | ✅ مُصلَح 6 نوفمبر (سطر «01 و04 و05 بربط Odoo») |
| `marketing/designs/concepts/carousel/carousel-5-mistakes_en_01_1080x1350` | jpg+webp | carousel slide | 1080×1350 | IG/FB carousel | ✅ مُصلَح 6 نوفمبر (سطر «01 و04 و05 بربط Odoo») |
| `marketing/designs/concepts/carousel/carousel-5-mistakes_en_02_1080x1350` | jpg+webp | carousel slide | 1080×1350 | IG/FB carousel | ✅ مُصلَح 6 نوفمبر (سطر «01 و04 و05 بربط Odoo») |
| `marketing/designs/concepts/carousel/carousel-5-mistakes_en_03_1080x1350` | jpg+webp | carousel slide | 1080×1350 | IG/FB carousel | ✅ مُصلَح 6 نوفمبر (سطر «01 و04 و05 بربط Odoo») |
| `marketing/designs/concepts/carousel/carousel-5-mistakes_en_04_1080x1350` | jpg+webp | carousel slide | 1080×1350 | IG/FB carousel | ✅ مُصلَح 6 نوفمبر (سطر «01 و04 و05 بربط Odoo») |
| `marketing/designs/concepts/carousel/carousel-5-mistakes_en_05_1080x1350` | jpg+webp | carousel slide | 1080×1350 | IG/FB carousel | ✅ مُصلَح 6 نوفمبر (سطر «01 و04 و05 بربط Odoo») |
| `marketing/designs/concepts/carousel/carousel-5-mistakes_en_06_1080x1350` | jpg+webp | carousel slide | 1080×1350 | IG/FB carousel | ✅ مُصلَح 6 نوفمبر (سطر «01 و04 و05 بربط Odoo») |
| `marketing/designs/concepts/carousel/carousel-5-mistakes_en_07_1080x1350` | jpg+webp | carousel slide | 1080×1350 | IG/FB carousel | ✅ مُصلَح 6 نوفمبر (سطر «01 و04 و05 بربط Odoo») |
| `marketing/designs/concepts/founder-pov/founder-pov_ar_mock_1080x1920` | jpg+webp | overlay mock | 1080×1920 | TikTok/Reels/LinkedIn video | ⛔ يناقض (شارة «باقي 33 من 50») |
| `marketing/designs/concepts/founder-pov/founder-pov_ar_overlay_1080x1920` | png+webp | video overlay | 1080×1920 | TikTok/Reels/LinkedIn video | ⛔ يناقض (شارة «باقي 33 من 50») |
| `marketing/designs/concepts/founder-pov/founder-pov_en_mock_1080x1920` | jpg+webp | overlay mock | 1080×1920 | TikTok/Reels/LinkedIn video | ⛔ يناقض (شارة «باقي 33 من 50») |
| `marketing/designs/concepts/founder-pov/founder-pov_en_overlay_1080x1920` | png+webp | video overlay | 1080×1920 | TikTok/Reels/LinkedIn video | ⛔ يناقض (شارة «باقي 33 من 50») |
| `marketing/designs/concepts/hemicycle/hemicycle_ar_link_1200x630` | jpg+webp | image | 1200×630 | LinkedIn/FB link | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/concepts/hemicycle/hemicycle_ar_portrait_1080x1350` | jpg+webp | image | 1080×1350 | Meta feed 4:5 | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/concepts/hemicycle/hemicycle_ar_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/concepts/hemicycle/hemicycle_ar_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/concepts/hemicycle/hemicycle_en_link_1200x630` | jpg+webp | image | 1200×630 | LinkedIn/FB link | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/concepts/hemicycle/hemicycle_en_portrait_1080x1350` | jpg+webp | image | 1080×1350 | Meta feed 4:5 | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/concepts/hemicycle/hemicycle_en_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/concepts/hemicycle/hemicycle_en_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/concepts/hook-360/hook-360_ar_link_1200x630` | jpg+webp | image | 1200×630 | LinkedIn/FB link | ✅ جاهز |
| `marketing/designs/concepts/hook-360/hook-360_ar_portrait_1080x1350` | jpg+webp | image | 1080×1350 | Meta feed 4:5 | ✅ جاهز |
| `marketing/designs/concepts/hook-360/hook-360_ar_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/concepts/hook-360/hook-360_ar_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/concepts/hook-360/hook-360_en_link_1200x630` | jpg+webp | image | 1200×630 | LinkedIn/FB link | ✅ جاهز |
| `marketing/designs/concepts/hook-360/hook-360_en_portrait_1080x1350` | jpg+webp | image | 1080×1350 | Meta feed 4:5 | ✅ جاهز |
| `marketing/designs/concepts/hook-360/hook-360_en_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/concepts/hook-360/hook-360_en_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/concepts/no-source/no-source_ar_link_1200x630` | jpg+webp | image | 1200×630 | LinkedIn/FB link | ✅ جاهز |
| `marketing/designs/concepts/no-source/no-source_ar_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/concepts/no-source/no-source_ar_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/concepts/no-source/no-source_en_link_1200x630` | jpg+webp | image | 1200×630 | LinkedIn/FB link | ✅ جاهز |
| `marketing/designs/concepts/no-source/no-source_en_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/concepts/no-source/no-source_en_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/concepts/self-audit/self-audit_ar_link_1200x630` | jpg+webp | image | 1200×630 | LinkedIn/FB link | ✅ مُصلَح 6 نوفمبر (أُعيد توليده بـ9,900) |
| `marketing/designs/concepts/self-audit/self-audit_ar_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ مُصلَح 6 نوفمبر (أُعيد توليده بـ9,900) |
| `marketing/designs/concepts/self-audit/self-audit_ar_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ مُصلَح 6 نوفمبر (أُعيد توليده بـ9,900) |
| `marketing/designs/concepts/self-audit/self-audit_en_link_1200x630` | jpg+webp | image | 1200×630 | LinkedIn/FB link | ✅ مُصلَح 6 نوفمبر (أُعيد توليده بـ9,900) |
| `marketing/designs/concepts/self-audit/self-audit_en_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ مُصلَح 6 نوفمبر (أُعيد توليده بـ9,900) |
| `marketing/designs/concepts/self-audit/self-audit_en_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ مُصلَح 6 نوفمبر (أُعيد توليده بـ9,900) |
| `marketing/designs/concepts/tb-check/tb-check_ar_link_1200x630` | jpg+webp | image | 1200×630 | LinkedIn/FB link | ✅ مُصلَح 6 نوفمبر (سطر «01 و04 و05 بربط Odoo») |
| `marketing/designs/concepts/tb-check/tb-check_ar_portrait_1080x1350` | jpg+webp | image | 1080×1350 | Meta feed 4:5 | ✅ مُصلَح 6 نوفمبر (سطر «01 و04 و05 بربط Odoo») |
| `marketing/designs/concepts/tb-check/tb-check_ar_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ مُصلَح 6 نوفمبر (سطر «01 و04 و05 بربط Odoo») |
| `marketing/designs/concepts/tb-check/tb-check_ar_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ مُصلَح 6 نوفمبر (سطر «01 و04 و05 بربط Odoo») |
| `marketing/designs/concepts/tb-check/tb-check_en_link_1200x630` | jpg+webp | image | 1200×630 | LinkedIn/FB link | ✅ مُصلَح 6 نوفمبر (سطر «01 و04 و05 بربط Odoo») |
| `marketing/designs/concepts/tb-check/tb-check_en_portrait_1080x1350` | jpg+webp | image | 1080×1350 | Meta feed 4:5 | ✅ مُصلَح 6 نوفمبر (سطر «01 و04 و05 بربط Odoo») |
| `marketing/designs/concepts/tb-check/tb-check_en_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ مُصلَح 6 نوفمبر (سطر «01 و04 و05 بربط Odoo») |
| `marketing/designs/concepts/tb-check/tb-check_en_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ مُصلَح 6 نوفمبر (سطر «01 و04 و05 بربط Odoo») |
| `marketing/designs/concepts/video/video-a_ar_frame-1_1080x1920` | jpg+webp | video frame | 1080×1920 | Reels/TikTok (to edit) | ✅ جاهز |
| `marketing/designs/concepts/video/video-a_ar_frame-2_1080x1920` | jpg+webp | video frame | 1080×1920 | Reels/TikTok (to edit) | ✅ جاهز |
| `marketing/designs/concepts/video/video-a_ar_frame-3_1080x1920` | jpg+webp | video frame | 1080×1920 | Reels/TikTok (to edit) | ✅ جاهز |
| `marketing/designs/concepts/video/video-a_ar_frame-4_1080x1920` | jpg+webp | video frame | 1080×1920 | Reels/TikTok (to edit) | ✅ جاهز |
| `marketing/designs/concepts/video/video-a_ar_frame-5_1080x1920` | jpg+webp | video frame | 1080×1920 | Reels/TikTok (to edit) | ⛔ يناقض (لقطة الختام 33/50) |
| `marketing/designs/concepts/video/video-a_ar_storyboard_2316x1180` | jpg+webp | storyboard sheet | 2316×1180 | internal (edit brief) | ⛔ يناقض (لقطة الختام 33/50) |
| `marketing/designs/concepts/video/video-a_en_frame-1_1080x1920` | jpg+webp | video frame | 1080×1920 | Reels/TikTok (to edit) | ✅ جاهز |
| `marketing/designs/concepts/video/video-a_en_frame-2_1080x1920` | jpg+webp | video frame | 1080×1920 | Reels/TikTok (to edit) | ✅ جاهز |
| `marketing/designs/concepts/video/video-a_en_frame-3_1080x1920` | jpg+webp | video frame | 1080×1920 | Reels/TikTok (to edit) | ✅ جاهز |
| `marketing/designs/concepts/video/video-a_en_frame-4_1080x1920` | jpg+webp | video frame | 1080×1920 | Reels/TikTok (to edit) | ✅ جاهز |
| `marketing/designs/concepts/video/video-a_en_frame-5_1080x1920` | jpg+webp | video frame | 1080×1920 | Reels/TikTok (to edit) | ⛔ يناقض (لقطة الختام 33/50) |
| `marketing/designs/concepts/video/video-a_en_storyboard_2316x1180` | jpg+webp | storyboard sheet | 2316×1180 | internal (edit brief) | ⛔ يناقض (لقطة الختام 33/50) |
| `marketing/designs/concepts/video/video-b_ar_frame-1_1080x1920` | jpg+webp | video frame | 1080×1920 | Reels/TikTok (to edit) | ✅ جاهز |
| `marketing/designs/concepts/video/video-b_ar_frame-2_1080x1920` | jpg+webp | video frame | 1080×1920 | Reels/TikTok (to edit) | ✅ جاهز |
| `marketing/designs/concepts/video/video-b_ar_frame-3_1080x1920` | jpg+webp | video frame | 1080×1920 | Reels/TikTok (to edit) | ✅ جاهز |
| `marketing/designs/concepts/video/video-b_ar_frame-4_1080x1920` | jpg+webp | video frame | 1080×1920 | Reels/TikTok (to edit) | ⛔ يناقض (لقطة الختام 33/50) |
| `marketing/designs/concepts/video/video-b_ar_storyboard_1860x1180` | jpg+webp | storyboard sheet | 1860×1180 | internal (edit brief) | ⛔ يناقض (لقطة الختام 33/50) |
| `marketing/designs/concepts/video/video-b_en_frame-1_1080x1920` | jpg+webp | video frame | 1080×1920 | Reels/TikTok (to edit) | ✅ جاهز |
| `marketing/designs/concepts/video/video-b_en_frame-2_1080x1920` | jpg+webp | video frame | 1080×1920 | Reels/TikTok (to edit) | ✅ جاهز |
| `marketing/designs/concepts/video/video-b_en_frame-3_1080x1920` | jpg+webp | video frame | 1080×1920 | Reels/TikTok (to edit) | ✅ جاهز |
| `marketing/designs/concepts/video/video-b_en_frame-4_1080x1920` | jpg+webp | video frame | 1080×1920 | Reels/TikTok (to edit) | ⛔ يناقض (لقطة الختام 33/50) |
| `marketing/designs/concepts/video/video-b_en_storyboard_1860x1180` | jpg+webp | storyboard sheet | 1860×1180 | internal (edit brief) | ⛔ يناقض (لقطة الختام 33/50) |
| `marketing/designs/covers/facebook-cover_live-ar_1640x624` | jpg+webp | cover | 1640×624 | Facebook | ✅ جاهز |
| `marketing/designs/covers/facebook-cover_live-en_1640x624` | jpg+webp | cover | 1640×624 | Facebook | ✅ جاهز |
| `marketing/designs/covers/facebook-cover_neutral-live_1640x624` | jpg+webp | cover | 1640×624 | Facebook | ✅ جاهز |
| `marketing/designs/covers/linkedin-cover_live-ar_1128x191` | jpg+webp | cover | 1128×191 | LinkedIn | ✅ جاهز |
| `marketing/designs/covers/linkedin-cover_live-en_1128x191` | jpg+webp | cover | 1128×191 | LinkedIn | ✅ جاهز |
| `marketing/designs/covers/linkedin-cover_neutral-live_1128x191` | jpg+webp | cover | 1128×191 | LinkedIn | ✅ جاهز |
| `marketing/designs/covers/x-header_live-ar_1500x500` | jpg+webp | cover | 1500×500 | X | ✅ جاهز |
| `marketing/designs/covers/x-header_live-en_1500x500` | jpg+webp | cover | 1500×500 | X | ✅ جاهز |
| `marketing/designs/covers/x-header_neutral-live_1500x500` | jpg+webp | cover | 1500×500 | X | ✅ جاهز |
| `marketing/designs/covers/youtube-banner_live-ar_2560x1440` | jpg+webp | cover | 2560×1440 | YouTube | ✅ جاهز |
| `marketing/designs/covers/youtube-banner_live-en_2560x1440` | jpg+webp | cover | 2560×1440 | YouTube | ✅ جاهز |
| `marketing/designs/covers/youtube-banner_neutral-live_2560x1440` | jpg+webp | cover | 2560×1440 | YouTube | ✅ جاهز |
| `marketing/designs/golden/1-crack/golden-1-crack_ar_1x1_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/golden/1-crack/golden-1-crack_ar_1x1_1080x1080_guides` | webp | guide (internal) | 1080×1080 | IG/FB feed | ✅ أداة داخلية |
| `marketing/designs/golden/1-crack/golden-1-crack_ar_4x5_1080x1350` | jpg+webp | image | 1080×1350 | Meta feed 4:5 | ✅ جاهز |
| `marketing/designs/golden/1-crack/golden-1-crack_ar_4x5_1080x1350_guides` | webp | guide (internal) | 1080×1350 | Meta feed 4:5 | ✅ أداة داخلية |
| `marketing/designs/golden/2-hourglass/golden-2-hourglass_ar_1x1_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/golden/2-hourglass/golden-2-hourglass_ar_1x1_1080x1080_guides` | webp | guide (internal) | 1080×1080 | IG/FB feed | ✅ أداة داخلية |
| `marketing/designs/golden/2-hourglass/golden-2-hourglass_ar_4x5_1080x1350` | jpg+webp | image | 1080×1350 | Meta feed 4:5 | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/golden/2-hourglass/golden-2-hourglass_ar_4x5_1080x1350_guides` | webp | guide (internal) | 1080×1350 | Meta feed 4:5 | ✅ أداة داخلية |
| `marketing/designs/golden/3-hawk-eye/golden-3-hawk-eye_ar_1x1_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ مُصلَح 6 نوفمبر (أُعيد توليده بـ9,900) |
| `marketing/designs/golden/3-hawk-eye/golden-3-hawk-eye_ar_1x1_1080x1080_guides` | webp | guide (internal) | 1080×1080 | IG/FB feed | ✅ أداة داخلية |
| `marketing/designs/golden/3-hawk-eye/golden-3-hawk-eye_ar_4x5_1080x1350` | jpg+webp | image | 1080×1350 | Meta feed 4:5 | ✅ مُصلَح 6 نوفمبر (أُعيد توليده بـ9,900) |
| `marketing/designs/golden/3-hawk-eye/golden-3-hawk-eye_ar_4x5_1080x1350_guides` | webp | guide (internal) | 1080×1350 | Meta feed 4:5 | ✅ أداة داخلية |
| `marketing/designs/golden/4-lineup/golden-4-lineup_ar_1x1_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/golden/4-lineup/golden-4-lineup_ar_1x1_1080x1080_guides` | webp | guide (internal) | 1080×1080 | IG/FB feed | ✅ أداة داخلية |
| `marketing/designs/golden/4-lineup/golden-4-lineup_ar_4x5_1080x1350` | jpg+webp | image | 1080×1350 | Meta feed 4:5 | ✅ جاهز |
| `marketing/designs/golden/4-lineup/golden-4-lineup_ar_4x5_1080x1350_guides` | webp | guide (internal) | 1080×1350 | Meta feed 4:5 | ✅ أداة داخلية |
| `marketing/designs/guerrilla/graffiti/graffiti-01-who-reviews_ar_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/guerrilla/graffiti/graffiti-01-who-reviews_ar_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/guerrilla/graffiti/graffiti-02-errors_ar_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/guerrilla/graffiti/graffiti-02-errors_ar_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/guerrilla/graffiti/graffiti-03-closing_ar_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/guerrilla/graffiti/graffiti-03-closing_ar_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/guerrilla/graffiti/graffiti-04-365_ar_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/guerrilla/graffiti/graffiti-04-365_ar_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/guerrilla/palm/palm-01-review-your-books_ar_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/guerrilla/palm/palm-01-review-your-books_ar_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/guerrilla/palm/palm-02-who-reviews-you_ar_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/guerrilla/palm/palm-02-who-reviews-you_ar_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/guerrilla/palm/palm-03-domain_ar_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/guerrilla/palm/palm-03-domain_ar_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/guerrilla/sticky/sticky-01-cash_ar_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/guerrilla/sticky/sticky-01-cash_ar_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/guerrilla/sticky/sticky-02-receivables_ar_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/guerrilla/sticky/sticky-02-receivables_ar_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/launch-week/launch-demo-report_ar_square_1080x1080` | jpg+webp | report-mockup | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/launch-week/launch-demo-report_ar_story_1080x1920` | jpg+webp | report-mockup | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/launch-week/launch-live-invite_ar_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز حتى 10 نوفمبر ثم أرشيف |
| `marketing/designs/launch-week/launch-live-invite_ar_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز حتى 10 نوفمبر ثم أرشيف |
| `marketing/designs/psych/1-loss-aversion/psych-1-loss-aversion_ar_link_1200x630` | jpg+webp | image | 1200×630 | LinkedIn/FB link | ✅ جاهز |
| `marketing/designs/psych/1-loss-aversion/psych-1-loss-aversion_ar_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/psych/1-loss-aversion/psych-1-loss-aversion_ar_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/psych/2-curiosity-gap/psych-2-curiosity-gap_ar_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/psych/2-curiosity-gap/psych-2-curiosity-gap_ar_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/psych/3-shocking-specificity/psych-3-shocking-specificity_ar_link_1200x630` | jpg+webp | image | 1200×630 | LinkedIn/FB link | ✅ جاهز |
| `marketing/designs/psych/3-shocking-specificity/psych-3-shocking-specificity_ar_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/psych/3-shocking-specificity/psych-3-shocking-specificity_ar_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/psych/4-scarcity-proof/psych-4-scarcity-proof_ar_link_1200x630` | jpg+webp | image | 1200×630 | LinkedIn/FB link | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/psych/4-scarcity-proof/psych-4-scarcity-proof_ar_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/psych/4-scarcity-proof/psych-4-scarcity-proof_ar_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/psych/5-meta-authority/psych-5-meta-authority_ar_link_1200x630` | jpg+webp | image | 1200×630 | LinkedIn/FB link | ✅ مُصلَح 6 نوفمبر (أُعيد توليده بـ9,900) |
| `marketing/designs/psych/5-meta-authority/psych-5-meta-authority_ar_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ مُصلَح 6 نوفمبر (أُعيد توليده بـ9,900) |
| `marketing/designs/psych/5-meta-authority/psych-5-meta-authority_ar_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ مُصلَح 6 نوفمبر (أُعيد توليده بـ9,900) |
| `marketing/designs/psych/6-anchoring/psych-6-anchoring_ar_link_1200x630` | jpg+webp | image | 1200×630 | LinkedIn/FB link | ✅ جاهز |
| `marketing/designs/psych/6-anchoring/psych-6-anchoring_ar_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/psych/6-anchoring/psych-6-anchoring_ar_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/psych/7a-pattern-break-graffiti/psych-7a-pattern-break-graffiti_ar_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/psych/7a-pattern-break-graffiti/psych-7a-pattern-break-graffiti_ar_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/psych/7b-pattern-break-palm/psych-7b-pattern-break-palm_ar_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/psych/7b-pattern-break-palm/psych-7b-pattern-break-palm_ar_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/psych/8-hawk-eye/psych-8-hawk-eye_ar_link_1200x630` | jpg+webp | image | 1200×630 | LinkedIn/FB link | ✅ جاهز |
| `marketing/designs/psych/8-hawk-eye/psych-8-hawk-eye_ar_square_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/psych/8-hawk-eye/psych-8-hawk-eye_ar_story_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/social/instagram-square_live-ar_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/social/instagram-square_live-en_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/social/instagram-square_neutral-live_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ✅ جاهز |
| `marketing/designs/social/instagram-square_neutral-seats_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/social/instagram-square_seats-ar_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/social/instagram-square_seats-en_1080x1080` | jpg+webp | image | 1080×1080 | IG/FB feed | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/social/linkedin-facebook-link_live-ar_1200x630` | jpg+webp | image | 1200×630 | LinkedIn/FB link | ✅ جاهز |
| `marketing/designs/social/linkedin-facebook-link_live-en_1200x630` | jpg+webp | image | 1200×630 | LinkedIn/FB link | ✅ جاهز |
| `marketing/designs/social/linkedin-facebook-link_neutral-live_1200x630` | jpg+webp | image | 1200×630 | LinkedIn/FB link | ✅ جاهز |
| `marketing/designs/social/linkedin-facebook-link_neutral-seats_1200x630` | jpg+webp | image | 1200×630 | LinkedIn/FB link | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/social/linkedin-facebook-link_seats-ar_1200x630` | jpg+webp | image | 1200×630 | LinkedIn/FB link | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/social/linkedin-facebook-link_seats-en_1200x630` | jpg+webp | image | 1200×630 | LinkedIn/FB link | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/social/story_live-ar_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/social/story_live-en_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/social/story_neutral-live_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ✅ جاهز |
| `marketing/designs/social/story_neutral-seats_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/social/story_seats-ar_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/social/story_seats-en_1080x1920` | jpg+webp | story / 9:16 | 1080×1920 | IG/FB Stories, Reels cover | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/social/x-post_live-ar_1600x900` | jpg+webp | image | 1600×900 | X | ✅ جاهز |
| `marketing/designs/social/x-post_live-en_1600x900` | jpg+webp | image | 1600×900 | X | ✅ جاهز |
| `marketing/designs/social/x-post_neutral-live_1600x900` | jpg+webp | image | 1600×900 | X | ✅ جاهز |
| `marketing/designs/social/x-post_neutral-seats_1600x900` | jpg+webp | image | 1600×900 | X | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/social/x-post_seats-ar_1600x900` | jpg+webp | image | 1600×900 | X | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/social/x-post_seats-en_1600x900` | jpg+webp | image | 1600×900 | X | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/social/youtube-thumbnail_live-ar_1280x720` | jpg+webp | image | 1280×720 | YouTube thumbnail | ✅ جاهز |
| `marketing/designs/social/youtube-thumbnail_live-en_1280x720` | jpg+webp | image | 1280×720 | YouTube thumbnail | ✅ جاهز |
| `marketing/designs/social/youtube-thumbnail_seats-ar_1280x720` | jpg+webp | image | 1280×720 | YouTube thumbnail | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/social/youtube-thumbnail_seats-en_1280x720` | jpg+webp | image | 1280×720 | YouTube thumbnail | ⛔ يناقض الندرة الجديدة (يعرض 33/50 أو مقاعد ممتلئة) |
| `marketing/designs/video/reel-duplicate-payment_ar_1080x1920` | mp4 | video | 1080×1920 | Reels/Shorts/TikTok + Meta Stories | ✅ جاهز (نشر عضوي غير مؤكد) |
| `marketing/designs/video/reel-duplicate-payment_en_1080x1920` | mp4 | video | 1080×1920 | Reels/Shorts/TikTok + Meta Stories | ✅ جاهز (نشر عضوي غير مؤكد) |
| `marketing/designs/video/reel-ghost-vendor_ar_1080x1920` | mp4 | video | 1080×1920 | Reels/Shorts/TikTok + Meta Stories | ✅ جاهز (نشر عضوي غير مؤكد) |
| `marketing/designs/video/reel-ghost-vendor_en_1080x1920` | mp4 | video | 1080×1920 | Reels/Shorts/TikTok + Meta Stories | ✅ جاهز (نشر عضوي غير مؤكد) |
| `marketing/designs/video/reel-no-receipt_ar_1080x1920` | mp4 | video | 1080×1920 | Reels/Shorts/TikTok + Meta Stories | ✅ جاهز (نشر عضوي غير مؤكد) |
| `marketing/designs/video/reel-no-receipt_en_1080x1920` | mp4 | video | 1080×1920 | Reels/Shorts/TikTok + Meta Stories | ✅ جاهز (نشر عضوي غير مؤكد) |
| `marketing/designs/video/reel-post-close-entry_ar_1080x1920` | mp4 | video | 1080×1920 | Reels/Shorts/TikTok + Meta Stories | ✅ جاهز (نشر عضوي غير مؤكد) |
| `marketing/designs/video/reel-post-close-entry_en_1080x1920` | mp4 | video | 1080×1920 | Reels/Shorts/TikTok + Meta Stories | ✅ جاهز (نشر عضوي غير مؤكد) |
| `marketing/designs/video/reel-round-manual_ar_1080x1920` | mp4 | video | 1080×1920 | Reels/Shorts/TikTok + Meta Stories | ✅ جاهز (نشر عضوي غير مؤكد) |
| `marketing/designs/video/reel-round-manual_en_1080x1920` | mp4 | video | 1080×1920 | Reels/Shorts/TikTok + Meta Stories | ✅ جاهز (نشر عضوي غير مؤكد) |
| `marketing/designs/video/reel-suspense-account_ar_1080x1920` | mp4 | video | 1080×1920 | Reels/Shorts/TikTok + Meta Stories | ✅ جاهز (نشر عضوي غير مؤكد) |
| `marketing/designs/video/reel-suspense-account_en_1080x1920` | mp4 | video | 1080×1920 | Reels/Shorts/TikTok + Meta Stories | ✅ جاهز (نشر عضوي غير مؤكد) |
| `src/assets/img/launch/founding-og-ar` | jpg | og:image | — | website og:image | 🟡 جاهز مؤقتًا (ندرة كمية «50 مقعد» بلا موعد إغلاق) |
| `src/assets/img/launch/founding-og-en` | jpg | og:image | — | website og:image | 🟡 جاهز مؤقتًا (ندرة كمية «50 مقعد» بلا موعد إغلاق) |

## نسخ الموقع (`src/assets/social/`)

نسخ JPG مطابقة لملفات أعلاه، تخدم روابط عامة على `https://www.seg-audit.com/assets/social/…`: 8 golden، و12 ريل، و`launch-demo-report_ar_{square,story}` و`launch-live-invite_ar_{square,story}` و`linkedin-facebook-link_live-ar` و`before-after_ar_square`، و**`instagram-square_seats-ar` و`story_seats-ar` (⛔)**.

## إعادة التوليد

كل الصور مولَّدة بالكود (`scripts/launch-images.js` و`launch-concepts.js` و`psych-ads.js` و`golden-ads.js` و`guerrilla-ads.js` و`launch-week-assets.js` و`brand-profiles.js`)، والريلز من `scripts/reels-cinematic.js`. الإصلاح الأسرع للمجموعة ⛔: متغير نافذة إغلاق في `src/site.config.js → founding` (مثل `closesOn`) ونصوص بديلة في السكربتات، و`showCount: false`، ثم إعادة التوليد. **هذا عمل تطوير لم يُنفَّذ في هذه المهمة.**
