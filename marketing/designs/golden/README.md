# Standard Enterprise Governance (SEG): حزمة النسبة الذهبية φ

بريف الـCEO (5 نوفمبر 2026). يولّدها [`scripts/golden-ads.js`](../../../scripts/golden-ads.js)، والمعرض في [`index.html`](index.html) (كل إعلان بجانبه نسخة guides). القياسات الفعلية لكل ملف في [`metrics.json`](metrics.json). هذا الملف يُكتب من السكربت نفسه.

**المقاسات:** Meta feed مربع 1:1 (1080×1080) و4:5 (1080×1350)، JPG (للرفع) وWebP (للمعرض). ملفات الـJPG منشورة على `https://www.seg-audit.com/assets/social/golden/<file>.jpg`.

**البراند:** navy `#0D1B3E` وcyan `#1BB7CD` وأبيض، وأحمر إنذار خافت `#C0392B` لعلامات الخطر الصغيرة فقط. بلا ذهبي. عربي RTL. الاسم البارز «Standard Enterprise Governance (SEG)» في أعلى كل إعلان، والطُعم «فحص مجاني لميزان شركتك… في دقائق»، وCTA صغير «ابدأ الفحص المجاني · seg-audit.com»، وعلامة MFT.

**قاعدة البيانات:** كل رقم دفاتر داتا اختبارية معلَّمة «مثال توضيحي · داتا اختبارية». الاستثناءان: أرقام برنامج الأعضاء المؤسِّسين (من `site.config.js → founding`)، وعدد الاختبارات (من `platform-facts.js`). أعد التوليد بعد أي تغيير فيهما.

## إزاي اتطبّقت φ = 1.618 (على كل التصميمات)

| العنصر | القاعدة | القيمة على 1080 px |
|---|---|---|
| سُلّم الخط | T[k] = (W/φ⁸)·φᵏ، وكل نص في الإعلان درجة من السُلّم (السكربت يفشل لو لقى حجم برّه السُلّم) | 23 · 37 · 60 · 97 · 158 · 255 px |
| التباعد | نفس السُلّم: T0/φ، T0، T1، T2 | 14 · 23 · 37 · 60 px |
| الهامش | m = T2 = W/φ⁶ | 60 px |
| المسافة بين السطور | العناوين 2/φ = 1.236، النص φ = 1.618 | |
| خطوط القسمة الذهبية | x = W/φ² و W/φ، y = H/φ² و H/φ (نقاط القوة الأربع عند تقاطعها) | x: 412.5 · 667.5؛ y (1:1): 412.5 · 667.5؛ y (4:5): 515.7 · 834.3 |
| العنوان | آخر سطر فيه على الخط y = H/φ² | |
| الـCTA | طرفه الأيسر على الخط x = W/φ، وعرضه W − m − W/φ، وارتفاعه T2، ونصه T0 | عرض 352.5 px |
| الحلزون الذهبي | مستطيل ذهبي W × W/φ على الحافة السفلية، مقسوم ١٤ مرة لمربعات (كل مربع 1/φ من اللي قبله)؛ العين = نهاية التقسيم. يظهر خافتًا (16%) في الخلفية، والعنصر البطل متمركز على العين | العين (1:1): (298.2، 596.8) أو (781.8، 596.8) · (4:5): (298.2، 866.8) أو (781.8، 866.8) |
| الإضاءة | مركز التدرّج الشعاعي على عين الحلزون، ونصف قطر الانتقال W/φ | |

## كل تصميم

| التصميم | الزاوية | تطبيق φ |
|---|---|---|
| `1-hidden-error/` | الخطأ المستخبي (Loss aversion) | دائرة الخطأ تكبر بعامل φ: ٢٣ ← ٩٧ ← ١٥٨ ← ٢٥٥ px (درجات T0 وT3 وT4 وT5)، والمسافة بينها T0. نقطة البداية الحمراء على عين الحلزون (يمين، لأن الزمن يمشي مع القراءة من اليمين)، والدوائر تكبر يسارًا. المبالغ مثال توضيحي. |
| `2-five-things/` | ٥ حاجات (Curiosity gap) | منطقة البصري مقسومة عند x = W/φ²: الكارت (٥ بنود، ٣ ظاهرة و٢ مموّهة) في الجزء φ، والرقم «٢» بحجم T5 على عين الحلزون في الجزء ١. |
| `3-shocking-specificity/` | التحديد الصادم | رقم واحد دقيق بحجم T4 (١٥٨ px)، وخط منتصفه يمر بعين الحلزون. السطر فوقه والسطر تحته على بُعد 0.62·T4 من المنتصف. علامة السالب والنقطة فقط بالأحمر. |
| `4-scarcity/` | الندرة 33/50 | الـ50 مقعد مرصوصة بالزاوية الذهبية (360°/φ² = 137.508°، نموذج عباد الشمس لـVogel) وقطبها على عين الحلزون: المقعد k على نصف قطر c·√k. المقاعد الممتلئة (17) بيضاء، ومقعدك سماوي. الأرقام من site.config.js → founding (العرض المعلن، حتى 2026-11-03)، لا بيانات دفاتر. |
| `5-authority/` | السلطة «يراجع نفسه» | مستطيل ذهبي (h × hφ) مقسوم لمربعاته، وكل مربع يتحقق من اللي بعده: الشكل المتشابه ذاتيًا هو الفكرة نفسها. عدد الاختبارات في أكبر مربع، وأيقونات ✓ تصغر T3 ← T2 ← T1 ثم ينكمش الحلزون. الرقم من platform-facts.js (كود المنصة، 2026-10-26). |
| `6-anchoring/` | التثبيت (Anchoring) | اللوحتان مقسومتان عند x = W/φ²: المرساة (تكلفة مفاجأة الإقفال، مثال توضيحي) تاخد الجزء φ بحجم T3، والفحص المجاني يأخذ الجزء ١ لكن سعره «٠» بحجم T4 وخلفية سماوية، فالجزء الأصغر يكسب العين. |
| `7-every-number-evidence/` | كل رقم بدليله | الرقم على عين الحلزون بحجم T4، وسلسلة الدليل (القيد ← فاتورة المورّد ← المرفق) يسار منه بمسافات متساوية في منطقة البصري، والوصلات تتجه كلها للعين. الأكواد والمبلغ مثال توضيحي. |

## القياس بعد الرندر (انحراف بالـpx عن الهدف الذهبي)

مقاسة من صندوق العنصر الفعلي في المتصفح بعد تحميل الخطوط. الصفر يعني إن العنصر بالظبط على الخط أو العين.

| الملف | آخر سطر العنوان − H/φ² | طرف الـCTA − W/φ | البطل − عين الحلزون | قسمة اللوحتين − W/φ² | أحجام الخط المستخدمة |
|---|---|---|---|---|---|
| `golden-1-hidden-error_ar_1x1_1080x1080.jpg` | 0 | 0 | 0 | — | 23 · 37 · 60 · 97 |
| `golden-1-hidden-error_ar_4x5_1080x1350.jpg` | 0 | 0 | 0 | — | 23 · 37 · 60 · 97 |
| `golden-2-five-things_ar_1x1_1080x1080.jpg` | 0 | 0 | 0 | — | 23 · 37 · 97 · 255 |
| `golden-2-five-things_ar_4x5_1080x1350.jpg` | 0 | 0 | 0 | — | 23 · 37 · 97 · 255 |
| `golden-3-shocking-specificity_ar_1x1_1080x1080.jpg` | 0 | 0 | 0 | — | 23 · 37 · 97 · 158 |
| `golden-3-shocking-specificity_ar_4x5_1080x1350.jpg` | 0 | 0 | 0 | — | 23 · 37 · 97 · 158 |
| `golden-4-scarcity_ar_1x1_1080x1080.jpg` | 0 | 0 | 18.7 | — | 23 · 37 · 97 · 158 |
| `golden-4-scarcity_ar_4x5_1080x1350.jpg` | 0 | 0 | 21.6 | — | 23 · 37 · 97 · 158 |
| `golden-5-authority_ar_1x1_1080x1080.jpg` | 0 | 0 | — | — | 23 · 37 · 97 |
| `golden-5-authority_ar_4x5_1080x1350.jpg` | 0 | 0 | — | — | 23 · 37 · 97 |
| `golden-6-anchoring_ar_1x1_1080x1080.jpg` | 0 | 0 | — | 0 | 23 · 37 · 97 · 158 |
| `golden-6-anchoring_ar_4x5_1080x1350.jpg` | 0 | 0 | — | 0 | 23 · 37 · 97 · 158 |
| `golden-7-every-number-evidence_ar_1x1_1080x1080.jpg` | 0 | 0 | 0 | — | 23 · 37 · 97 · 158 |
| `golden-7-every-number-evidence_ar_4x5_1080x1350.jpg` | 0 | 0 | 0 | — | 23 · 37 · 97 · 158 |

«البطل − عين الحلزون»: في 3 هو المسافة الرأسية بين خط منتصف الرقم والعين؛ وفي 4 هو مركز أول مقعد (المقعد صفر، على نصف قطر c·√0.5). تصميما 5 و6 لا يستخدمان عين الحلزون الكبير: 5 يبني مستطيله الذهبي الخاص، و6 مقسوم عند W/φ².

## الحلزون: الاشتقاق

المستطيل [x, y, w, h] بنسبة φ. في كل خطوة نقطع مربعًا بضلع الجانب الأقصر بالترتيب يمين، فوق، شمال، تحت، والباقي مستطيل ذهبي أصغر. في كل مربع ربع دائرة مركزها ركن المربع اللي على خط القطع، والزاوية تقل ٩٠° في كل خطوة، فالأقواس متصلة. العين هي مركز المستطيل الباقي بعد ١٤ خطوة (الخطأ أقل من 0.1 px)، وتطلع عند (0.2764·W، 0.7236·W/φ) قبل القلب. السكربت يقلب المستطيل رأسيًا (والعين تطلع في النص العلوي) وأفقيًا حسب التصميم.

## الروابط العامة (JPG)

- `golden-1-hidden-error_ar_1x1_1080x1080.jpg`: https://www.seg-audit.com/assets/social/golden/golden-1-hidden-error_ar_1x1_1080x1080.jpg
- `golden-1-hidden-error_ar_4x5_1080x1350.jpg`: https://www.seg-audit.com/assets/social/golden/golden-1-hidden-error_ar_4x5_1080x1350.jpg
- `golden-2-five-things_ar_1x1_1080x1080.jpg`: https://www.seg-audit.com/assets/social/golden/golden-2-five-things_ar_1x1_1080x1080.jpg
- `golden-2-five-things_ar_4x5_1080x1350.jpg`: https://www.seg-audit.com/assets/social/golden/golden-2-five-things_ar_4x5_1080x1350.jpg
- `golden-3-shocking-specificity_ar_1x1_1080x1080.jpg`: https://www.seg-audit.com/assets/social/golden/golden-3-shocking-specificity_ar_1x1_1080x1080.jpg
- `golden-3-shocking-specificity_ar_4x5_1080x1350.jpg`: https://www.seg-audit.com/assets/social/golden/golden-3-shocking-specificity_ar_4x5_1080x1350.jpg
- `golden-4-scarcity_ar_1x1_1080x1080.jpg`: https://www.seg-audit.com/assets/social/golden/golden-4-scarcity_ar_1x1_1080x1080.jpg
- `golden-4-scarcity_ar_4x5_1080x1350.jpg`: https://www.seg-audit.com/assets/social/golden/golden-4-scarcity_ar_4x5_1080x1350.jpg
- `golden-5-authority_ar_1x1_1080x1080.jpg`: https://www.seg-audit.com/assets/social/golden/golden-5-authority_ar_1x1_1080x1080.jpg
- `golden-5-authority_ar_4x5_1080x1350.jpg`: https://www.seg-audit.com/assets/social/golden/golden-5-authority_ar_4x5_1080x1350.jpg
- `golden-6-anchoring_ar_1x1_1080x1080.jpg`: https://www.seg-audit.com/assets/social/golden/golden-6-anchoring_ar_1x1_1080x1080.jpg
- `golden-6-anchoring_ar_4x5_1080x1350.jpg`: https://www.seg-audit.com/assets/social/golden/golden-6-anchoring_ar_4x5_1080x1350.jpg
- `golden-7-every-number-evidence_ar_1x1_1080x1080.jpg`: https://www.seg-audit.com/assets/social/golden/golden-7-every-number-evidence_ar_1x1_1080x1080.jpg
- `golden-7-every-number-evidence_ar_4x5_1080x1350.jpg`: https://www.seg-audit.com/assets/social/golden/golden-7-every-number-evidence_ar_4x5_1080x1350.jpg

## إعادة التوليد

```bash
PLAYWRIGHT_PATH=<path to playwright> node scripts/golden-ads.js [filter]
```
