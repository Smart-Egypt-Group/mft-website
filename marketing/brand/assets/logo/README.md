# لوجو SEG

> ✅ **الاتجاه A معتمد من الـCEO (7 نوفمبر 2026) كاللوجو الرسمي الوحيد.** `official/` = A (vector كامل). ملفات الـCEO النقطية (القسم 2) بقت أرشيف المصدر.

## 1. اللوكاب الرسمي على التصاميم (قرار الـCEO، 6 نوفمبر 2026)

**اللوكاب = مكعّب SEG + «Standard Enterprise Governance».**
- **المكعّب:** الاتجاه A (vector على الشبكة، العمود ÷ الشريط = φ).
- **الاسم:** IBM Plex Sans Bold، محوّل لمسارات، ومحاذي لحافة الوش الشمال الرأسية.
- **البناء:** الملفات بيعملها `node scripts/seg-logo-vector.js`.

| الملف | الاستخدام |
|---|---|
| `official/seg-lockup-official_line-{light,dark}.{svg,png}` | سطر واحد: اللوكاب الأساسي (غلاف، بانر، رأس تقرير) |
| `official/seg-lockup-official_stack-{light,dark}.*` | 3 سطور: مساحات مربعة |
| `official/seg-lockup-official_two-{light,dark}.*` | سطرين: **التوقيع على كل التصاميم** |

**التوقيع على تصاميم الحملة:** لوكاب «سطرين» | خط رفيع | **شعار MFT الكامل**. الكود في `scripts/lib/campaign.js`، و`scripts/design-qa.js` بيفحصه.

**شعار MFT:** `src/assets/logo/mft-lockup-{navy,white}.png` (2000×683). مقصوص بـ`scripts/logo-assets.js` من الحزمة الرسمية:
- **المسار:** `/Users/mac/Desktop/ MFT/LOGO Modern Financial Technology/` (فيه مسافة قبل MFT).
- **الملف المصدر:** `{Dark Blue & Light Blue, White & Light Blue}/PNG Text on the Side.png`، PNG شفاف 5906×5906.
- **الصيغ المتاحة في الحزمة:** PNG وJPG بس، والمصدر `Source/PSD.psd`. **مفيش SVG ولا PDF.**

## 2. ملف الـCEO (المسار النقطي)

| الملف | المقاس | الاستخدام |
|---|---|---|
| `seg-logo_source_180x180.jpg` | 180×180 | الأصل كما وصل. لا يُعدّل |
| `seg-logo_native.png` | 130×127 | بعد شيل الخلفية وقصّ الحواف |
| `seg-logo_full.png` / `_white` / `_navy` | 520×508 | تكبير ×4 مع تنعيم الحواف. **للشاشة بس** |
| `seg-logo_sign.png` / `_sign-white.png` | 262×256 | المكعّب وحده (أيقونات الواجهة في التصاميم) |

بيتعمل بـ`node scripts/seg-logo-raster.js`.

**الدقة:** الأصل 180 px، فده كفاية للشاشة ومش كفاية للطباعة. الحل الـvector تحت بعد الاعتماد، أو ملف المصمم الأصلي.

## 3. إعادة الرسم vector على شبكة: 3 اتجاهات للاعتماد (`directions/`)

- **A · تنظيف أمين:** زاوية 28°، شبكة 11×10.
- **B · للمقاسات الصغيرة:** زاوية 28°، شبكة 9×8.
- **C · مكعّب متساوي + سماوي:** زاوية 30°، شبكة 10×10.

**الملفات لكل اتجاه:**
- المكعّب: `_color` و`_color-on-dark` و`_mono-white` و`_mono-black`.
- اللوكاب: `_lockup-{line,stack,two}-{light,dark}`.
- الأيقونة: `_icon-{light,dark}`، و`_icon-light_{16,32,48,180}.png`.

**الإنشاء والتصحيحات البصرية والأرقام:** في الكتاب `../../seg-brand-book.pdf` (صفحات 4–6)، وفي `../../brand-identity.md`.

**لحد الاعتماد:** التصاميم بتستخدم ملف الـCEO (القسم 1)، مش الـvector.

## 4. علامة MFT وحدها

`src/assets/logo/mft-mark-*.png` فاضلة على صور بروفايل حسابات MFT نفسها بس (`scripts/brand-profiles.js`، والسطر فيه `qa-allow-mft-mark`).
