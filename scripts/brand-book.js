#!/usr/bin/env node
// SEG brand book: every page built from the tokens and the logo geometry, so nothing in it is drawn by hand.
//   PLAYWRIGHT_PATH=<path to playwright> node scripts/brand-book.js
// Writes
//   marketing/brand/seg-brand-book.pdf                       the book (1600 × 1000 pages)
//   marketing/brand/assets/book/page-NN_<slug>.png           every page as an image (review / sharing)
//   marketing/brand/tokens/seg-tokens.css                    CSS variables: primitives + roles (light, dark)
//   marketing/brand/tokens/tailwind.seg.cjs                  Tailwind theme extension
//   marketing/brand/tokens/contrast.md                       every role pair, both themes (fails the build if a pair fails)
//   marketing/brand/assets/identity/seg-sample_*             application samples at their real sizes
// Inputs: marketing/brand/tokens/seg-tokens.json, type-metrics.json (scripts/brand-type-metrics.js),
// scripts/seg-logo-vector.js (construction + lockups), marketing/brand/assets/logo/official/, src/assets/logo/mft-lockup-*.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const T = require('./lib/brand-tokens.js');
const LV = require('./seg-logo-vector.js');
const C = T.color;
const BRAND = path.join(ROOT, 'marketing/brand');
const OUT_ID = path.join(BRAND, 'assets/identity'), OUT_BOOK = path.join(BRAND, 'assets/book'), TOK = path.join(BRAND, 'tokens');
const MET = JSON.parse(fs.readFileSync(path.join(TOK, 'type-metrics.json'), 'utf8'));
const b64 = (f) => fs.readFileSync(path.join(ROOT, f)).toString('base64');
const png = (f) => `data:image/png;base64,${b64(f)}`;
const svgUri = (s) => `data:image/svg+xml;base64,${Buffer.from(s).toString('base64')}`;
const LOGO = {
  lineLight: png('marketing/brand/assets/logo/official/seg-lockup-official_line-light.png'), lineDark: png('marketing/brand/assets/logo/official/seg-lockup-official_line-dark.png'),
  stackLight: png('marketing/brand/assets/logo/official/seg-lockup-official_stack-light.png'), stackDark: png('marketing/brand/assets/logo/official/seg-lockup-official_stack-dark.png'),
  twoLight: png('marketing/brand/assets/logo/official/seg-lockup-official_two-light.png'), twoDark: png('marketing/brand/assets/logo/official/seg-lockup-official_two-dark.png'),
  // direction A (approved 7 Nov 2026): the official vector cube
  cube: png('marketing/brand/assets/logo/official/seg-cube-official_color.png'), cubeWhite: png('marketing/brand/assets/logo/official/seg-cube-official_mono-white.png'), cubeDark: png('marketing/brand/assets/logo/official/seg-cube-official_color-on-dark.png'),
  mftNavy: png('src/assets/logo/mft-lockup-navy.png'), mftWhite: png('src/assets/logo/mft-lockup-white.png')
};
const FONTS = `@font-face{font-family:Cairo;font-weight:200 1000;src:url(data:font/woff2;base64,${b64(T.font.arabic.file)})}`
  + `@font-face{font-family:"IBM Plex Sans";font-weight:400;src:url(data:font/ttf;base64,${b64('marketing/brand/fonts/IBMPlexSansArabic-Regular.ttf')});unicode-range:U+0000-00FF,U+2000-206F,U+20AC,U+2190-2193}`
  + `@font-face{font-family:"IBM Plex Sans";font-weight:700;src:url(data:font/ttf;base64,${b64('marketing/brand/fonts/IBMPlexSansArabic-Bold.ttf')});unicode-range:U+0000-00FF,U+2000-206F,U+20AC,U+2190-2193}`
  + `@font-face{font-family:Inter;font-weight:100 900;src:url(data:font/woff2;base64,${b64(T.font.latin.file)})}`;
const ROLE = (theme, r) => C[T.role[theme][r]];

// ---------------------------------------------------------------- 1. contrast (fails the build)
const grade = (x, ui) => (ui ? (x >= 3 ? 'UI ✓' : '✗') : x >= 7 ? 'AAA' : x >= 4.5 ? 'AA' : '✗');
const rows = [];
for (const theme of ['light', 'dark']) {
  for (const [fg, bg] of T.contrastPairs.text) rows.push({ theme, fg, bg, ui: false, r: T.contrast(ROLE(theme, fg), ROLE(theme, bg)) });
  for (const [fg, bg] of T.contrastPairs.ui) rows.push({ theme, fg, bg, ui: true, r: T.contrast(ROLE(theme, fg), ROLE(theme, bg)) });
}
const fails = rows.filter((x) => (x.ui ? x.r < 3 : x.r < 4.5));
let cmd = `# التباين: كل أدوار الألوان في الثيمين\n\n> اتولّد بـ\`node scripts/brand-book.js\` من \`seg-tokens.json\`. البناء **بيفشل** لو أي زوج نص أقل من 4.5:1، أو أي حدّ/عنصر واجهة أقل من 3:1.\n\n| الثيم | المقدّمة | الخلفية | النسبة | الدرجة |\n|---|---|---|---|---|\n`;
for (const x of rows) cmd += `| ${x.theme} | \`${x.fg}\` ${ROLE(x.theme, x.fg)} | \`${x.bg}\` ${ROLE(x.theme, x.bg)} | ${x.r.toFixed(2)}:1 | ${grade(x.r, x.ui)} |\n`;
fs.writeFileSync(path.join(TOK, 'contrast.md'), cmd);
if (fails.length) { console.error('contrast failures:\n' + fails.map((x) => `${x.theme} ${x.fg}/${x.bg} ${x.r.toFixed(2)}`).join('\n')); process.exit(1); }

// ---------------------------------------------------------------- 2. type scale (computed)
const snap4 = (n) => Math.round(n / 4) * 4;
const scale = (s, lh) => Object.entries(s.steps).map(([k, st]) => { const px = Math.round(s.base * Math.pow(s.ratio, st)); return { k, px, ar: snap4(px * (st <= 1 ? T.type.leading.arabicBody : T.type.leading.arabicHeading)), la: snap4(px * (st <= 1 ? T.type.leading.latinBody : T.type.leading.latinHeading)) }; });
const UI = scale(T.type.ui), DISP = scale(T.type.display);

// ---------------------------------------------------------------- 3. CSS + Tailwind
const kebab = (k) => k.replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase();
let css = `/* SEG design tokens: generated by scripts/brand-book.js from marketing/brand/tokens/seg-tokens.json. Do not edit by hand. */\n:root {\n`;
for (const [k, v] of Object.entries(C)) css += `  --seg-${kebab(k)}: ${v};\n`;
for (const [k, v] of Object.entries(T.role.light)) css += `  --seg-${kebab(k)}: var(--seg-${kebab(v)});\n`;
for (const [k, v] of Object.entries(T.space)) css += `  --seg-space-${k}: ${v}px;\n`;
for (const [k, v] of Object.entries(T.radius)) css += `  --seg-radius-${k}: ${v}px;\n`;
for (const [k, v] of Object.entries(T.shadow)) css += `  --seg-shadow-${kebab(k)}: ${v};\n`;
for (const x of UI) css += `  --seg-text-${kebab(x.k)}: ${x.px}px; --seg-leading-${kebab(x.k)}-ar: ${x.ar}px; --seg-leading-${kebab(x.k)}-la: ${x.la}px;\n`;
css += `  --seg-font: ${T.font.stack};\n  --seg-font-latin: ${T.font.stackLatin};\n}\n[data-theme="dark"] {\n`;
for (const [k, v] of Object.entries(T.role.dark)) css += `  --seg-${kebab(k)}: var(--seg-${kebab(v)});\n`;
css += `}\n\n/* RTL base. Arabic first; Latin runs and numbers stay LTR and isolated; never letter-space Arabic. */\nhtml[dir="rtl"] { font-family: var(--seg-font); line-height: ${T.type.leading.arabicBody}; }\n.seg-num, td.num { font-family: var(--seg-font-latin); font-variant-numeric: tabular-nums; direction: ltr; unicode-bidi: isolate; }\n.seg-overline:lang(en) { letter-spacing: ${T.type.tracking.overlineLatin}; text-transform: uppercase; }\n:focus-visible { outline: 2px solid var(--seg-focus); outline-offset: 2px; }\n`;
fs.writeFileSync(path.join(TOK, 'seg-tokens.css'), css);
const tw = { colors: { seg: {} }, spacing: {}, borderRadius: {}, boxShadow: {}, fontSize: {}, fontFamily: { sans: T.font.stack.split(', ').map((s) => s.replace(/"/g, '')), latin: T.font.stackLatin.split(', ').map((s) => s.replace(/"/g, '')) } };
for (const [k, v] of Object.entries(C)) { const m = k.match(/^seg(\d+)$/); if (m) tw.colors.seg[m[1]] = v; else tw.colors[kebab(k)] = v; }
for (const k of Object.keys(T.role.light)) tw.colors[`role-${kebab(k)}`] = `var(--seg-${kebab(k)})`;
for (const [k, v] of Object.entries(T.space)) tw.spacing[k] = `${v}px`;
for (const [k, v] of Object.entries(T.radius)) tw.borderRadius[k] = `${v}px`;
for (const [k, v] of Object.entries(T.shadow)) tw.boxShadow[kebab(k)] = v;
for (const x of UI) tw.fontSize[kebab(x.k)] = [`${x.px}px`, { lineHeight: `${x.ar}px` }];
fs.writeFileSync(path.join(TOK, 'tailwind.seg.cjs'), `// SEG Tailwind theme extension: generated by scripts/brand-book.js from seg-tokens.json.\n// theme: { extend: require('./tailwind.seg.cjs') }; dark theme: <html data-theme="dark"> (role colours are CSS variables).\n// RTL: use logical utilities (ms-/me-/ps-/pe-/start-/end-).\nmodule.exports = ${JSON.stringify(tw, null, 2)};\n`);

// ---------------------------------------------------------------- 4. shared page CSS + pieces
const CSS = `${FONTS}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:${T.font.stack};color:${C.ink};-webkit-font-smoothing:antialiased}
.lat{font-family:${T.font.stackLatin}} .num{font-family:"IBM Plex Sans";direction:ltr;unicode-bidi:isolate}
.page{width:1600px;height:1000px;position:relative;overflow:hidden;background:#fff;padding:72px 88px 64px;page-break-after:always;display:flex;flex-direction:column}
.page.dark{background:${C.navy};color:#fff}
.eb{font:700 13px/1 "IBM Plex Sans";letter-spacing:.14em;color:${C.seg700};text-transform:uppercase;direction:ltr;text-align:right}
.dark .eb{color:${C.cyan}}
h1{font-size:52px;line-height:1.25;font-weight:800;margin:10px 0 8px} h2{font-size:28px;line-height:1.3;font-weight:800;margin-bottom:10px} h3{font-size:20px;font-weight:800;margin-bottom:6px}
p,li{font-size:17px;line-height:1.75;color:${C.slate}} .dark p,.dark li{color:${C.darkTextMuted}}
.why{border-inline-start:4px solid ${C.cyan};padding:6px 16px;background:${C.cyanTint};border-radius:0 10px 10px 0;font-size:16px;line-height:1.7;color:${C.ink}}
.dark .why{background:rgba(27,183,205,.10);color:#fff}
.foot{position:absolute;left:88px;right:88px;bottom:28px;display:flex;justify-content:space-between;font:600 12px/1 "IBM Plex Sans";color:${C.muted};direction:ltr}
.dark .foot{color:${C.darkTextSubtle}}
.grid{display:grid;gap:22px} .card{border:1px solid ${C.line};border-radius:14px;padding:20px} .dark .card{border-color:${C.darkLine}}
table{border-collapse:collapse;width:100%;font-size:15px} td,th{padding:7px 10px;border-bottom:1px solid ${C.line};text-align:right} th{font-weight:800;color:${C.ink};background:${C.surface}}
.ok,.no{position:absolute;top:10px;inset-inline-start:10px;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:800 18px/1 "IBM Plex Sans";color:#fff}
.ok{background:${C.success}} .no{background:${C.danger}}
.tile{position:relative;border-radius:14px;height:190px;display:flex;align-items:center;justify-content:center;overflow:hidden;border:1px solid ${C.line}}
.cap{font-size:14px;line-height:1.5;color:${C.slate};margin-top:8px}
table.tight td,table.tight th{padding:3px 8px;font-size:12.5px;line-height:1.45}`;
let pageNo = 0;
const PAGES = [];
const page = (slug, title, body, { dark = false, eb = '' } = {}) => {
  pageNo++;
  const n = pageNo;
  PAGES.push({ slug, html: () => `<section class="page${dark ? ' dark' : ''}"><div class="eb">${eb || 'SEG · BRAND BOOK'}</div>${title ? `<h1>${title}</h1>` : ''}${typeof body === 'function' ? body() : body}<div class="foot"><span>Standard Enterprise Governance · Brand book v${T.version}</span><span>${String(n).padStart(2, '0')}</span></div></section>` });
};
const sw = (k, v = C[k]) => { const light = T.contrast(C.ink, v) > T.contrast('#FFFFFF', v); const fg = light ? C.ink : '#FFFFFF'; return `<div style="background:${v};color:${fg};border-radius:10px;padding:10px 12px;height:96px;display:flex;flex-direction:column;justify-content:space-between;border:1px solid ${C.line}"><b class="lat" style="font-size:13px">${k}</b><span class="lat" style="font-size:12px">${v}<br>${T.contrast(fg, v).toFixed(1)}:1</span></div>`; };
const construction = (dk) => LV.construction(dk);
const W = (dk) => LV.weights(LV.DIRS[dk]);

// ---------------------------------------------------------------- 5. pages
page('cover', '', `<div style="position:absolute;inset:0;background:linear-gradient(160deg,${C.navy} 0%,${C.seg900} 70%,${C.seg700} 100%)"></div>
  <div style="position:absolute;inset:0;overflow:hidden"><img src="${LOGO.cubeWhite}" style="position:absolute;left:-140px;bottom:-200px;height:900px;opacity:.07"></div>
  <div style="position:relative;margin-top:150px"><img src="${LOGO.lineDark}" style="height:120px"></div>
  <div style="position:relative;margin-top:90px;color:#fff"><div style="font-size:64px;font-weight:900;line-height:1.2">دليل الهوية البصرية</div>
  <div style="font-size:24px;color:${C.darkTextMuted};margin-top:12px">نظام اللوجو، والألوان، والخطوط، والواجهة، والتطبيقات</div>
  <div class="lat" style="font-size:15px;color:${C.seg200};margin-top:28px;direction:ltr;text-align:right">v${T.version} · 6 November 2026 · for CEO approval · by Modern Fintech</div></div>
  <div style="position:absolute;bottom:56px;left:88px"><img src="${LOGO.mftWhite}" style="height:44px;opacity:.9"></div>`, { dark: true, eb: 'SEG · BRAND BOOK' });

page('principles', 'ثلاث قواعد تحكم كل قرار', `<div class="grid" style="grid-template-columns:repeat(3,1fr);margin-top:26px">
  ${[['الدليل قبل الرأي', 'كل رقم في تصميم أو تقرير بييجي ومعاه مصدره. في الهوية ده معناه: مفيش زخرفة من غير وظيفة، وكل قرار هنا مكتوب سببه جنبه.', 'شبكة اللوجو، ونسب التباين المحسوبة، ومقاييس الخطوط من ملفاتها.'], ['الهدوء المالي', 'جمهورنا مدير مالي ومراجع داخلي. الثقة بتيجي من الثبات: كحلي عميق، وأزرق اللوجو، وأبيض كتير، وحركة قليلة.', 'لونين أساسيين بس، وتمييز واحد لكل تكوين.'], ['الاستثناء بيلمع', 'المنصة وظيفتها تطلّع الحاجة اللي مش طبيعية. فبصريًا: كل تكوين فيه ضوء سماوي واحد بيشاور على الاستثناء، والباقي هادي.', 'السماوي ممنوع كلون خلفية أو نص صغير؛ هو إشارة.']].map(([t, d, e], i) => `<div class="card" style="padding:28px"><div class="lat" style="font:800 64px/1 'IBM Plex Sans';color:${i === 2 ? C.cyan : C.seg700}">0${i + 1}</div><h2 style="margin-top:14px">${t}</h2><p>${d}</p><p style="margin-top:12px;color:${C.ink};font-weight:700">في النظام: ${e}</p></div>`).join('')}</div>
  <h2 style="margin-top:40px">المحتويات</h2><p style="columns:3;font-size:16px">01 الغلاف · 02 القواعد · 03 فكرة اللوجو · 04 الإنشاء A · 05 الإنشاء <bdi>B</bdi> و<bdi>C</bdi> · 06 الاتجاهات للاختيار · 07 اللوكاب والتوقيع · 08 المساحة الآمنة والحد الأدنى · 09 اللوجو صح وغلط · 10 الألوان الأولية · 11 الأدوار (فاتح/غامق) · 12 التدرّجات · 13 التباين · 14 اقتران الخطوط · 15 السلّم الطباعي · 16 التناسب الذهبي φ · 17 العربي وRTL صح وغلط · 18 الأيقونات ولغة الرسوم · 19 عناصر الواجهة · 20 تطبيقات سوشيال · 21 غلاف التقرير · 22 شاشة المنصة · 23 القرارات</p>`);

page('logo-idea', 'اللوجو: مكعّب من 3 حروف', `<div style="display:grid;grid-template-columns:1.1fr 1fr;gap:56px;align-items:center;margin-top:20px">
  <div><img src="${LOGO.stackLight}" style="width:100%"></div>
  <div><p>مكعّب أيزومتري، على كل وش حرف من الاسم، والحروف مرسومة بالفراغ: <b>G</b> فوق، و<b>S</b> على الشمال، و<b>E</b> على اليمين. اسم المنصة بيتقري من 3 أوجه لجسم واحد، وده نفس وعدها: الدفاتر بتتشاف من كل الجهات.</p>
  <p style="margin-top:14px">اللوكاب الرسمي (قرار الـCEO): المكعّب + <b class="lat">Standard Enterprise Governance</b>، الاسم اللي SEG اختصاره. الاسم بخط IBM Plex Sans Bold، محوّل لمسارات، ومحاذي لحافة الوش الشمال الرأسية، مش لأطراف المكعّب المدبّبة.</p>
  <div class="why" style="margin-top:18px">ليه الاسم كامل؟ «SEG» لوحدها حروف مالهاش معنى عند حد ما يعرفناش. الاسم الكامل بيقول الفئة (Governance) والجمهور (Enterprise) من أول نظرة.</div></div></div>`);

const params = (dk) => { const D = LV.DIRS[dk], w = W(dk); return `<table class="tight"><tr><th>المعامل</th><th>القيمة</th></tr>
  <tr><td>زاوية الإسقاط α</td><td class="num">${D.alpha}°${D.equal ? ' (أيزومتري حقيقي)' : ''}</td></tr><tr><td>شبكة الوش الجانبي</td><td class="num">${D.Nu} × ${D.Nv} m · H/W ${w.HtoW}</td></tr>
  <tr><td>العمود / الشريط (موديول)</td><td class="num">${D.stem} m / ${D.band} m · الوش العلوي ${D.topStroke} m</td></tr>
  <tr><td>الوزن العمودي ÷ الأفقي (⟂)</td><td class="num">${w.stemPerp} / ${w.bandPerp} = <b>${w.ratio}</b></td></tr>
  <tr><td>الفاصل بين الأوجه (⟂)</td><td class="num">${w.seam} · الفتحة ${w.counterPerp} (≥ الفاصل ✓)</td></tr><tr><td>قطر الحواف</td><td class="num">${w.round || '0 (حاد)'}</td></tr></table>`; };
page('construction-a', 'الإنشاء: الاتجاه A على الشبكة', `<div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-top:6px">
  <div><img src="${svgUri(construction('A'))}" style="width:100%;height:760px;object-fit:contain"></div>
  <div>${params('A')}
  <h3 style="margin-top:22px">التصحيحات البصرية (مش حسابية بس)</h3><ol style="padding-inline-start:20px">
   <li><b>توازن الوزن:</b> الشريط على وش مائل وزنه الحقيقي أقل بـcos α؛ والعين بتشوف الرأسي أتقل. المعيار 1.05–1.12. A محتفظ بـ1.70 عمدًا (شخصية لوجو الـCEO)؛ <bdi>B</bdi> و<bdi>C</bdi> جوّه المعيار.</li>
   <li><b>فواصل متساوية:</b> الفاصل الرأسي والقطريين بنفس العرض العمودي (<span class="lat" dir="ltr" style="unicode-bidi:isolate">a·sin α + (b+c)·cos α = s</span>).</li>
   <li><b>تعويض التدوير:</b> التدوير بيكبّر الأشكال r/2، فالفواصل بتترسم r أوسع علشان تفضل بعرضها.</li>
   <li><b>الوش العلوي متساوي الاتجاهين:</b> محوريه مقصّرين بنفس القدر.</li>
   <li><b>الفتحة ≥ الفاصل:</b> وإلا الحروف تتقفل قبل ما الأوجه تنفصل في الصغير (البناء بيفشل لو اتكسرت).</li>
   <li><b>محاذاة الاسم:</b> على الحافة الرأسية للوش الشمال؛ الأطراف المدبّبة overshoot.</li></ol>
  <p style="font-size:13px;margin-top:8px">الشبكة السماوية = الموديول · الخط المتقطع الأحمر = الأفقي وزاوية α · المستطيل المتقطع = المساحة الآمنة (2 موديول).</p></div></div>`);

page('construction-bc', 'الإنشاء: الاتجاهين <bdi>B</bdi> و<bdi>C</bdi>', `<div style="display:grid;grid-template-columns:1fr 1fr;gap:48px">
  ${['B', 'C'].map((dk) => `<div><h2>${LV.DIRS[dk].title}</h2><img src="${svgUri(construction(dk))}" style="width:100%;height:400px;object-fit:contain">${params(dk)}<div class="why" style="margin-top:12px">${LV.DIRS[dk].why}</div></div>`).join('')}</div>`);

const dirFile = (dk, n) => svgUri(fs.readFileSync(path.join(BRAND, 'assets/logo/directions', LV.DIRS[dk].name, `seg-logo-${LV.DIRS[dk].key}_${n}.svg`), 'utf8'));
const dirPng = (dk, n) => png(`marketing/brand/assets/logo/directions/${LV.DIRS[dk].name}/seg-logo-${LV.DIRS[dk].key}_${n}.png`);
page('directions', 'الاتجاهات التلاتة: للاختيار', `<div class="grid" style="grid-template-columns:repeat(3,1fr);margin-top:16px">
  ${['A', 'B', 'C'].map((dk) => `<div class="card"><h2>${LV.DIRS[dk].title}</h2>
   <div style="display:flex;gap:12px"><div style="flex:1;height:170px;display:flex;align-items:center;justify-content:center"><img src="${dirFile(dk, 'color')}" style="height:150px"></div><div style="flex:1;height:170px;background:${C.navy};border-radius:12px;display:flex;align-items:center;justify-content:center"><img src="${dirFile(dk, 'color-on-dark')}" style="height:140px"></div></div>
   <div style="display:flex;gap:16px;align-items:flex-end;margin:14px 0;direction:ltr">${[16, 32, 48].map((z) => `<div style="text-align:center"><img src="${dirPng(dk, `icon-light_${z}`)}" style="width:${z * 2}px;height:${z * 2}px;image-rendering:pixelated;border:1px solid ${C.line};border-radius:6px"><div class="lat" style="font-size:11px;color:${C.muted}">${z}px ×2</div></div>`).join('')}</div>
   <p style="font-size:15px">${LV.DIRS[dk].why}</p></div>`).join('')}</div>
  <div class="why" style="margin-top:20px"><b>التوصية:</b> A لوجو أساسي (استمرارية لوجو الـCEO)، وB نسخة رسمية لأقل من 48 px (أفاتار، favicon، أيقونة تطبيق). <bdi>C</bdi> لو الـCEO عايز يربط اللوجو بسماوي الحملة. <b>بصراحة:</b> على 16 px الحروف مش مقروءة في التلاتة؛ B أوضحهم، والحل الكامل رمز مبسّط خاص بالمقاس ده (مش معمول).</div>`);

page('lockups', 'اللوكاب والتوقيع', `<div class="grid" style="grid-template-columns:1.25fr 1fr;margin-top:10px;align-items:start">
  <div><h3>اللوكاب الأفقي (السطر الواحد)</h3><div class="card" style="padding:26px"><img src="${LOGO.lineLight}" style="width:100%"></div>
  <h3 style="margin-top:16px">المكدّس (3 سطور) · وسطرين (للتوقيع)</h3><div style="display:flex;gap:16px"><div class="card" style="flex:1"><img src="${LOGO.stackLight}" style="width:100%"></div><div class="card" style="flex:1.4;display:flex;align-items:center"><img src="${LOGO.twoLight}" style="width:100%"></div></div></div>
  <div><h3>التوقيع على التصاميم</h3><div style="background:${C.navy};border-radius:14px;padding:26px 22px;display:flex;align-items:center;gap:23px;direction:ltr"><img src="${LOGO.twoDark}" style="height:54px"><i style="width:1px;height:38px;background:#fff;opacity:.32"></i><img src="${LOGO.mftWhite}" style="height:27px"></div>
  <div style="background:#fff;border:1px solid ${C.line};border-radius:14px;padding:26px 22px;display:flex;align-items:center;gap:23px;direction:ltr;margin-top:12px"><img src="${LOGO.twoLight}" style="height:54px"><i style="width:1px;height:38px;background:${C.navy};opacity:.32"></i><img src="${LOGO.mftNavy}" style="height:27px"></div>
  <p style="font-size:15px;margin-top:12px"><b>الوحدة:</b> لوكاب SEG (سطرين) | خط رفيع | شعار MFT الكامل. المكعّب <bdi>H</bdi>؛ الخط <bdi>0.7 H</bdi>؛ MFT <bdi>0.5 H</bdi>؛ المسافات <bdi>0.42 H</bdi>. <b>SEG أولًا، والوحدة ما بتنعكسش في RTL</b>: لوجوهات لاتينية، وقلبها بيخلّي MFT يتقري الأول.</p>
  <p style="font-size:15px"><b>المدمج:</b> المكعّب + MFT من غير الاسم، بس لما الاسم ما يوصلش 10 px (أغلفة الشريط 1128×191).</p>
  <div class="why">ليه سطرين في التوقيع؟ في 3 سطور الاسم 12% من ارتفاع المكعّب (5 px على تصميم 1080)؛ في سطرين 19%، فبيوصل 10 px عند أقل مقاس للتوقيع.</div></div></div>`);

const q = '0.18';
page('clearspace', 'المساحة الآمنة والحد الأدنى', `<div style="display:grid;grid-template-columns:1fr 1fr;gap:56px;margin-top:20px">
  <div><div style="position:relative;border:2px dashed ${C.seg600};padding:${Math.round(300 * 0.18)}px;display:inline-block;border-radius:6px"><img src="${LOGO.lineLight}" style="height:300px;display:block;max-width:600px;object-fit:contain"><span class="lat" style="position:absolute;top:6px;left:8px;font-size:12px;color:${C.seg600}">2m</span></div>
  <p style="margin-top:14px">المساحة الآمنة = <b>2 موديول</b> من كل جهة (حوالي ${q} من ارتفاع المكعّب). مفيش نص ولا حافة صورة ولا عنصر جوّه المساحة دي.</p></div>
  <div><table><tr><th>الاستخدام</th><th>الحد الأدنى</th><th>السبب</th></tr>
  <tr><td>المكعّب وحده (شاشة)</td><td class="num">24 px</td><td>تحتها الفتحات بتقفل</td></tr><tr><td>المكعّب، اتجاه B</td><td class="num">16 px</td><td>شبكة أخشن وفتحات ≥ الفاصل</td></tr>
  <tr><td>المكعّب (طباعة)</td><td class="num">10 mm</td><td>حبر الطباعة بيقفل الفتحات</td></tr><tr><td>الاسم في أي لوكاب</td><td class="num">capitals ≥ 10 px</td><td>أقل من كده نسيج مش كلام</td></tr>
  <tr><td>التوقيع على تصميم 1080</td><td class="num">المكعّب ≥ 54 px</td><td>علشان الاسم يوصل 10 px</td></tr><tr><td>أقل من كده</td><td>التوقيع المدمج</td><td>المكعّب + MFT بس</td></tr></table></div></div>`);

const tile = (ok, inner, bg, cap) => `<div><div class="tile" style="background:${bg}"><span class="${ok ? 'ok' : 'no'}">${ok ? '✓' : '✕'}</span>${inner}</div><div class="cap">${cap}</div></div>`;
page('logo-dos', 'اللوجو: صح وغلط', `<div class="grid" style="grid-template-columns:repeat(4,1fr);gap:18px;margin-top:8px">
  ${tile(true, `<img src="${LOGO.lineLight}" style="width:86%">`, '#fff', 'الملوّن على الأبيض أو الفاتح.')}
  ${tile(true, `<img src="${LOGO.lineDark}" style="width:86%">`, C.navy, 'الأبيض على الكحلي.')}
  ${tile(true, `<div style="display:flex;align-items:center;gap:14px;direction:ltr"><img src="${LOGO.twoDark}" style="height:42px"><i style="width:1px;height:30px;background:#fff;opacity:.32"></i><img src="${LOGO.mftWhite}" style="height:21px"></div>`, C.navy, 'التوقيع كوحدة: SEG أولًا، ثم MFT.')}
  ${tile(true, `<img src="${LOGO.cube}" style="height:70%">`, C.surface, 'المكعّب وحده كأيقونة.')}
  ${tile(false, `<img src="${LOGO.lineLight}" style="width:86%;transform:scaleX(1.35);transform-origin:center">`, '#fff', 'ممنوع تمطيط أو ضغط.')}
  ${tile(false, `<img src="${LOGO.cube}" style="height:65%;transform:rotate(18deg)">`, '#fff', 'ممنوع التدوير أو تغيير زاوية المكعّب.')}
  ${tile(false, `<img src="${LOGO.cube}" style="height:65%;filter:hue-rotate(140deg) saturate(1.4)">`, '#fff', 'ممنوع تغيير الألوان.')}
  ${tile(false, `<img src="${LOGO.lineLight}" style="width:86%">`, C.navy, 'ممنوع الملوّن على الكحلي (الغامق 1.3:1).')}
  ${tile(false, `<img src="${LOGO.cube}" style="height:62%;filter:drop-shadow(0 0 18px ${C.cyan}) drop-shadow(6px 8px 6px rgba(0,0,0,.5))">`, '#fff', 'ممنوع ظل أو توهّج أو حدّ.')}
  ${tile(false, `<img src="${LOGO.lineDark}" style="width:86%">`, `repeating-linear-gradient(45deg,${C.seg500} 0 14px,${C.cyan} 14px 28px,${C.navy800} 28px 42px)`, 'ممنوع على خلفية زحمة.')}
  ${tile(false, `<div style="display:flex;align-items:center;gap:14px;direction:ltr"><img src="${LOGO.mftWhite}" style="height:21px"><i style="width:1px;height:30px;background:#fff;opacity:.32"></i><img src="${LOGO.twoDark}" style="height:42px"></div>`, C.navy, 'ممنوع عكس التوقيع (MFT أولًا).')}
  ${tile(false, `<div style="display:flex;align-items:center;gap:10px;direction:ltr"><img src="${LOGO.cube}" style="height:60px"><b class="lat" style="font:800 34px Inter;color:${C.navy}">SEG</b></div>`, '#fff', 'ممنوع «SEG» نص بدل الاسم. (فحص design-qa بيرفضه)')}</div>`);

page('palette', 'الألوان الأولية', `<p>الأزرق من بكسلات لوجو الـCEO: 900 و800 و700 و600 و500 مقاسة (أغمق، ربع، وسط، تلات أرباع، أفتح)، والباقي متدرّج للأبيض. الكحلي والسماوي من نظام الحملة اللي شغّال من أول نوفمبر.</p>
  <h3 style="margin-top:14px">أزرق SEG</h3><div class="grid" style="grid-template-columns:repeat(10,1fr);gap:8px;direction:ltr">${['seg900', 'seg800', 'seg700', 'seg600', 'seg500', 'seg400', 'seg300', 'seg200', 'seg100', 'seg50'].map((k) => sw(k)).join('')}</div>
  <h3 style="margin-top:14px">كحلي وسماوي</h3><div class="grid" style="grid-template-columns:repeat(8,1fr);gap:8px;direction:ltr">${['navyNight', 'navyDeep', 'navy', 'navy800', 'cyanDeep', 'cyanInk', 'cyan', 'cyanTint'].map((k) => sw(k)).join('')}</div>
  <h3 style="margin-top:14px">محايد ودلالي</h3><div class="grid" style="grid-template-columns:repeat(10,1fr);gap:8px;direction:ltr">${['ink', 'slate', 'muted', 'lineStrong', 'line', 'surfaceSunken', 'surface', 'danger', 'warning', 'success'].map((k) => sw(k)).join('')}</div>`);

const roleRow = (theme, r) => { const v = ROLE(theme, r); return `<tr><td class="lat" style="font-size:13px">${r}</td><td><span style="display:inline-block;width:18px;height:18px;border-radius:4px;background:${v};border:1px solid ${C.line};vertical-align:middle"></span> <span class="lat" style="font-size:13px">${T.role[theme][r]} ${v}</span></td></tr>`; };
const roleKeys = ['background', 'surface', 'surfaceAlt', 'onSurface', 'onSurfaceMuted', 'outline', 'outlineStrong', 'primary', 'onPrimary', 'primaryContainer', 'link', 'accent', 'accentText', 'critical', 'criticalContainer', 'warning', 'success', 'focus'];
page('roles', 'الأدوار: الفاتح والغامق', `<p>المكوّنات ما بتستخدمش هيكس أبدًا؛ بتستخدم دور. كل دور له قيمة في الثيم الفاتح وقيمة في الغامق، فالشاشة بتتقلب غامق من غير ما مكوّن يتغيّر.</p>
  <div class="grid" style="grid-template-columns:1fr 1fr;margin-top:12px"><div><h3>فاتح</h3><table class="tight">${roleKeys.map((r) => roleRow('light', r)).join('')}</table></div>
  <div><h3>غامق</h3><table class="tight">${roleKeys.map((r) => roleRow('dark', r)).join('')}</table></div></div>`);

const grad = (g) => g.type === 'linear' ? `linear-gradient(${g.angle || 90}deg,${g.stops.map(([c, o]) => `${C[c]} ${Math.round(o * 100)}%`).join(',')})` : `radial-gradient(circle at ${g.at || '50% 50%'},${g.stops.map(([c, o]) => { const [k, a] = c.split('@'); return a ? `rgba(27,183,205,${a}) ${o * 100}%` : `${C[k]} ${o * 100}%`; }).join(',')})`;
page('gradients', 'التدرّجات: بنقط توقّف دقيقة', `<div class="grid" style="grid-template-columns:repeat(3,1fr);margin-top:14px">
  ${['depth', 'night', 'signal'].map((k) => { const g = T.gradient[k]; return `<div><div style="height:250px;border-radius:14px;background:${k === 'signal' ? `${grad(g)},${C.navy}` : grad(g)}"></div><h3 style="margin-top:12px" class="lat">${k}</h3><p class="lat" style="font-size:13px;direction:ltr;text-align:right">${g.type}${g.angle ? ' ' + g.angle + '°' : ''} · ${g.stops.map(([c, o]) => `${c} ${Math.round(o * 100)}%`).join(' → ')}</p><p style="font-size:14px">${{ depth: 'خلفيات البراند، وأغلفة التقارير، والبانرات.', night: 'حقول البوستات والصفحات الغامقة.', signal: 'الضوء اللي بيعلّم الاستثناء: واحد بس في كل تكوين.' }[k]}</p></div>`; }).join('')}</div>
  <h3 style="margin-top:22px">تدرّج أوجه اللوجو (A)</h3><div class="grid" style="grid-template-columns:repeat(3,1fr)">${['left', 'top', 'right'].map((f) => { const g = T.gradient['logoA.' + f]; return `<div><div style="height:60px;border-radius:10px;background:linear-gradient(90deg,${g.stops.map(([c, o]) => `${C[c]} ${o * 100}%`).join(',')})"></div><p class="lat" style="font-size:13px;direction:ltr;text-align:right">${f}: ${g.stops.map(([c, o]) => `${c} (${C[c]}) ${o * 100}%`).join(' → ')}</p></div>`; }).join('')}</div>
  <div class="why" style="margin-top:12px">كل تدرّج بيمشي من الغامق للفاتح في اتجاه واحد: مصدر ضوء واحد فوق على اليمين، زي ما المكعّب منوّر.</div>`);

page('contrast', 'التباين: محسوب، والبناء بيفشل لو اتكسر', `<div class="grid" style="grid-template-columns:1fr 1fr;gap:28px;margin-top:6px">${['light', 'dark'].map((th) => `<div><h3>${th === 'light' ? 'فاتح' : 'غامق'}</h3><table class="tight">${rows.filter((x) => x.theme === th).map((x) => `<tr><td class="lat">${x.fg} / ${x.bg}</td><td><span style="background:${ROLE(th, x.bg)};color:${ROLE(th, x.fg)};padding:2px 8px;border-radius:6px;border:1px solid ${C.line}" class="lat">Aa نص</span></td><td class="num"><b>${x.r.toFixed(2)}</b></td><td>${grade(x.r, x.ui)}</td></tr>`).join('')}</table></div>`).join('')}</div>`);

const pair = MET.pairs;
page('type-pairing', 'اقتران الخطوط: بالقياس من ملفات الخطوط', `<p>قِست كل اقتران من ملفات الخطوط نفسها (<span class="lat">scripts/brand-type-metrics.js</span>): ارتفاع جسم الحرف العربي ÷ x-height اللاتيني، والألف ÷ الكابيتال، وسُمك العمود. 1.000 = نفس الحجم البصري ونفس «اللون» على الصفحة.</p>
  <table style="margin-top:12px"><tr><th>الاقتران</th><th>الاستخدام اليوم</th><th>الجسم ÷ x</th><th>الألف ÷ الكابيتال</th><th>العمود</th></tr>
  ${pair.map((p) => `<tr${p.id === 'cairo+plexSans' ? ` style="background:${C.successTint};font-weight:800"` : ''}><td class="lat">${p.arabic.family} + ${p.latin.family === 'IBM Plex Sans Arabic' ? 'IBM Plex Sans' : p.latin.family}</td><td>${p.use}</td><td class="num">${p.bodyToX}</td><td class="num">${p.alefToCap}</td><td class="num">${p.stemRatio}</td></tr>`).join('')}</table>
  <div class="grid" style="grid-template-columns:1fr 1fr;margin-top:22px">
   <div class="card"><div style="font-size:15px;color:${C.muted}">عربي: Cairo</div><div style="font-size:54px;font-weight:800;line-height:1.3">ميزان المراجعة</div><div style="font-size:22px">كل ملاحظة جاية ومعاها دليلها.</div></div>
   <div class="card lat" style="direction:ltr;text-align:left"><div style="font-size:15px;color:${C.muted}">Latin: IBM Plex Sans</div><div style="font-size:54px;font-weight:700;line-height:1.3">Trial balance</div><div style="font-size:22px">Every finding comes with its evidence. <span style="font-weight:700">1,249,400.00</span></div></div></div>
  <div class="why" style="margin-top:14px"><b>القرار:</b> Cairo للعربي (موجود في الحملة والموقع والمنصة) + <b>IBM Plex Sans</b> للاتيني: أقرب اقتران في المقاسات التلاتة (0.969 / 1.027 / 0.963)، وأرقامه جدولية من غير إعداد (كل الأرقام 600 وحدة)، وهو نفسه خط تقارير الـPDF في المنصة. Inter اللي في الحملة دلوقتي أخف 12% في العمود. <b>ملاحظة:</b> المنصة بتستخدم Tajawal + Cairo، والتقارير Plex؛ الدليل بيوحّدهم (قرار).</div>`);

page('type-scale', 'السلّم الطباعي', `<div class="grid" style="grid-template-columns:1fr 1fr;gap:40px;margin-top:6px">
  <div><h3>الواجهة: √φ = 1.272 من 16 (كل خطوتين = φ)</h3>${UI.slice().reverse().map((x) => `<div style="display:flex;align-items:baseline;gap:16px;border-bottom:1px solid ${C.line};padding:5px 0"><span class="lat" style="width:150px;font-size:12px;color:${C.muted}">${x.k} · ${x.px}/${x.ar} ar · ${x.la} la</span><span style="font-size:${x.px}px;line-height:${x.ar}px;font-weight:${x.k.startsWith('h') ? 800 : 400}">ميزان المراجعة</span></div>`).join('')}</div>
  <div><h3>العرض والتسويق: φ = 1.618 من 26</h3>${DISP.slice().reverse().map((x) => `<div style="display:flex;align-items:baseline;gap:16px;border-bottom:1px solid ${C.line};padding:4px 0;overflow:hidden;white-space:nowrap"><span class="lat" style="width:150px;flex:none;font-size:12px;color:${C.muted}">${x.k} · ${x.px}/${x.ar}</span><span style="font-size:${Math.min(x.px, 100)}px;line-height:1.15;font-weight:800">${x.px > 80 ? '30 نوفمبر' : 'المنصة التي تراجع نفسها'}</span></div>`).join('')}</div></div>
  <div class="why" style="margin-top:14px">نسبتين من نفس الجذر φ: الواجهة بتمشي بنص خطوة (√φ) علشان الجداول والنماذج محتاجة درجات متقاربة، فكل مستويين رئيسيين بينهم φ بالظبط؛ التسويق بيمشي بخطوة φ كاملة علشان التراتب يبان من بعيد. ارتفاع السطر مقفول على شبكة 4 px، والعربي واخد ${T.type.leading.arabicBody} للنص و${T.type.leading.arabicHeading} للعناوين، مقابل ${T.type.leading.latinBody} و${T.type.leading.latinHeading} للاتيني: النقط والتشكيل فوق وتحت محتاجين مساحة.</div>`);

const PHI_ = T.phi.PHI;
page('phi', 'نظام التناسب الذهبي φ = 1.618', `<div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-top:6px">
  <div><svg viewBox="0 0 618 382" style="width:100%;border:1px solid ${C.line};border-radius:10px">${(() => { let x = 0, y = 0, w = 618, h = 382, o = '', dir = 0; for (let i = 0; i < 7; i++) { const sq = Math.min(w, h); const [sx, sy] = dir === 0 ? [x, y] : dir === 1 ? [x + w - sq, y] : dir === 2 ? [x + w - sq, y + h - sq] : [x, y + h - sq]; o += `<rect x="${sx}" y="${sy}" width="${sq}" height="${sq}" fill="${i % 2 ? '#fff' : C.seg50}" stroke="${C.seg600}" stroke-width="1.5"/>`; if (dir === 0) { x += sq; w -= sq; } else if (dir === 1) { y += sq; h -= sq; } else if (dir === 2) { w -= sq; } else { h -= sq; } dir = (dir + 1) % 4; } return o + `<circle cx="${618 / PHI_}" cy="${382 / PHI_}" r="9" fill="${C.cyan}"/>`; })()}</svg>
  <p style="font-size:14px;margin-top:8px">المستطيل الذهبي وتقسيمه المتكرر؛ النقطة السماوية = نقطة ذهبية (61.8٪، 61.8٪) بدل المنتصف.</p>
  <h3 style="margin-top:16px">المسافات (فيبوناتشي: كل مقاس = السابق × φ)</h3><div style="display:flex;align-items:flex-end;gap:10px;direction:ltr">${T.phi.SPACE.slice(0, 9).map((v) => `<div style="text-align:center"><div style="width:${Math.min(v, 89)}px;height:${Math.min(v, 144)}px;background:${C.seg200};border-radius:3px"></div><div class="lat" style="font-size:11px">${v}</div></div>`).join('')}</div></div>
  <div><table class="tight"><tr><th>أين</th><th>القاعدة</th><th>منفّذة في</th></tr>
   <tr><td>المسافات</td><td class="num">5 · 8 · 13 · 21 · 34 · 55 · 89 · 144 · 233</td><td>التوكنز + كل CSS في المولّدات</td></tr>
   <tr><td>الخطوط</td><td>‏√φ بين الدرجات، φ بين المستويات الرئيسية</td><td>التوكنز + المولّدات (فحص QA)</td></tr>
   <tr><td>تقسيم الإطار</td><td class="num">61.8 / 38.2</td><td>launch-images (الحقل/الصفحة)، golden-ads، المفاهيم</td></tr>
   <tr><td>نقطة التركيز</td><td>نقاط ذهبية / حلزون</td><td>الضوء والهيرو: <bdi>launch-images</bdi>، <bdi>golden-ads</bdi>، <bdi>hook-360</bdi></td></tr>
   <tr><td>اللوجو A</td><td>العمود ÷ الشريط = φ (1.62)</td><td>عمود الـCEO المقاس 0.26 = 2.86 موديول</td></tr>
   <tr><td>اللوكاب (سطر)</td><td>ارتفاع حروف الاسم = حافة الوش ÷ φ²</td><td>seg-logo-vector.js</td></tr>
   <tr><td>التوقيع</td><td>MFT والخط = H/φ؛ المسافات = H/φ²؛ الحد الأدنى 55</td><td>scripts/lib/campaign.js</td></tr>
   <tr><td>الأدوار</td><td>أنصاف الأقطار 5 · 8 · 13 · 21</td><td>التوكنز</td></tr></table>
  <div class="why" style="margin-top:14px"><b>حيث φ مش بيحكم (متعمّد):</b> مواضع العناصر في الستوري والريلز بتتبع مناطق الأمان بتاعة المنصات (250 فوق / 480 تحت)؛ وسطور الاسم في لوكاب السطرين بتباعد 1.32 مش φ، لأن φ كان هيصغّر الاسم تحت 10 px. الأولوية للقراءة والمنصة.</div>
  <p style="font-size:14px;margin-top:10px">مصدر واحد: <bdi class="lat">seg-tokens.json → phi</bdi> + <bdi class="lat">scripts/lib/brand-tokens.js → phi</bdi>. فحص <span class="lat">design-qa.js</span> بيرفض أي مسافة أو حجم خط ثابت برّه السلّم (اتجرّب بقيم 30 و31 px واترفضوا).</p></div></div>`);
page('rtl', 'العربي وRTL: صح وغلط', `<div class="grid" style="grid-template-columns:1fr 1fr;gap:20px;margin-top:8px">
  ${[[true, `<p style="font-size:24px;color:${C.ink}">الرصيد في 31 أكتوبر: <span class="num" style="font-weight:700">1,249,400.00</span> جنيه</p>`, 'الأرقام LTR ومعزولة (unicode-bidi: isolate) جوّه السطر العربي، وبخط Plex الجدولي.'],
     [false, `<p style="font-size:24px;color:${C.ink};unicode-bidi:bidi-override;direction:rtl">الرصيد: 1,249,400.00</p>`, 'من غير عزل: الأرقام بتتقلب أو بتتلخبط مع علامات الترقيم.'],
     [true, `<p style="font-size:30px;font-weight:800;color:${C.ink}">مراجعة مستمرة</p>`, 'العربي من غير تباعد حروف: الوصلات بين الحروف هي الكتابة نفسها.'],
     [false, `<p style="font-size:30px;font-weight:800;color:${C.ink};letter-spacing:.3em">مراجعة مستمرة</p>`, 'letter-spacing على العربي بيقطّع الوصلات.'],
     [true, `<p style="font-size:24px;line-height:1.7;color:${C.ink}">قيد يدوي بمبلغ مُدوَّر في آخر يومين<br>من الشهر، يستاهل مراجعة.</p>`, `ارتفاع سطر ${T.type.leading.arabicBody}: النقط والتشكيل واخدين مساحتهم.`],
     [false, `<p style="font-size:24px;line-height:1.0;color:${C.ink}">قيد يدوي بمبلغ مُدوَّر في آخر يومين<br>من الشهر، يستاهل مراجعة.</p>`, 'ارتفاع سطر 1.0: التشكيل بيلزق في السطر اللي فوقه.']].map(([ok, inner, cap]) => `<div><div class="tile" style="background:#fff;height:130px;padding:0 50px;justify-content:flex-start"><span class="${ok ? 'ok' : 'no'}">${ok ? '✓' : '✕'}</span>${inner}</div><div class="cap">${cap}</div></div>`).join('')}</div>
  <p style="margin-top:12px;font-size:15px">والقواعد كمان: خصائص منطقية (margin-inline-start، ms-/me-) بدل left/right؛ الأيقونات اللي ليها اتجاه (الأسهم) بتنعكس، واللوجو والأرقام والرسوم البيانية الزمنية ما بتنعكسش.</p>`);

const ic = (d, dot) => `<svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="${C.navy}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}${dot ? `<circle cx="${dot[0]}" cy="${dot[1]}" r="2.2" fill="${C.cyan}" stroke="none"/>` : ''}</svg>`;
const ICONS = [['الدفتر', '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>', [16, 16]], ['ملاحظة', '<path d="M12 3l9 16H3z"/><path d="M12 10v4"/>', [12, 17]], ['الدليل', '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>', [11, 11]], ['الإقفال', '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>', [15, 15]], ['الاعتماد', '<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/>', null], ['الربط', '<path d="M10 14a4 4 0 0 0 5.6 0l3-3a4 4 0 0 0-5.6-5.6l-1 1"/><path d="M14 10a4 4 0 0 0-5.6 0l-3 3a4 4 0 0 0 5.6 5.6l1-1"/>', [19, 5]]];
page('icons', 'الأيقونات ولغة الرسوم', `<div class="grid" style="grid-template-columns:1fr 1.1fr;gap:44px;margin-top:8px">
  <div><h3>الأيقونات</h3><div class="grid" style="grid-template-columns:repeat(3,1fr);gap:14px">${ICONS.map(([n, d, dot]) => `<div class="card" style="text-align:center">${ic(d, dot)}<div style="font-size:14px;margin-top:6px">${n}</div></div>`).join('')}</div>
  <p style="font-size:15px;margin-top:12px">شبكة 24، خط 2 px، نهايات وزوايا مدوّرة، لون واحد. <b>نقطة سماوية واحدة</b> بس لما الأيقونة بتشاور على حاجة محتاجة انتباه. مفيش أيقونات مليانة ملوّنة ولا emoji في الواجهة.</p></div>
  <div><h3>لغة الرسوم</h3><div style="height:330px;border-radius:14px;position:relative;overflow:hidden;background:radial-gradient(120% 90% at 85% 20%,${C.seg800},${C.navy} 55%,${C.navyNight})">
   ${Array.from({ length: 9 }, (_, i) => `<div style="position:absolute;right:${40 + (i % 3) * 8}px;left:${180 + (i * 37) % 120}px;top:${40 + i * 30}px;height:7px;border-radius:4px;background:${i === 5 ? C.cyan : 'rgba(255,255,255,.18)'};${i === 5 ? `box-shadow:${T.shadow.glowCyan}` : ''}"></div>`).join('')}
   <div style="position:absolute;left:80px;top:183px;width:26px;height:26px;border-radius:50%;background:${C.cyan};box-shadow:${T.shadow.glowCyan}"></div></div>
  <p style="font-size:15px;margin-top:12px">حقل كحلي هادي + سطر واحد بيلمع بالسماوي = الاستثناء اللي المنصة طلّعته. صفحة بيضا للتقرير. فكرة واحدة لكل إطار. وأي شركة أو رقم في رسم مكتوب عليه «مثال توضيحي · داتا اختبارية».</p></div></div>`);

const comp = (theme) => { const R = (r) => ROLE(theme, r); return `<div style="background:${R('surface')};border:1px solid ${R('outline')};border-radius:${T.radius.xl}px;padding:24px;color:${R('onSurface')}">
  <div style="display:flex;gap:10px;flex-wrap:wrap"><span style="background:${R('primary')};color:${R('onPrimary')};padding:10px 20px;border-radius:${T.radius.md}px;font-weight:700">قدّم طلبك</span><span style="border:1px solid ${R('outlineStrong')};color:${R('onSurface')};padding:10px 20px;border-radius:${T.radius.md}px;font-weight:700">إلغاء</span><span style="background:${R('accent')};color:${R('onAccent')};padding:10px 20px;border-radius:${T.radius.pill}px;font-weight:800">فحص مجاني</span></div>
  <div style="display:flex;gap:8px;margin-top:14px">${[['critical', 'criticalContainer', 'onCriticalContainer', 'حرجة'], ['warning', 'warningContainer', 'onWarningContainer', 'عالية'], ['success', 'successContainer', 'onSuccessContainer', 'سليم']].map(([a, b, c2, t]) => `<span style="background:${R(b)};color:${R(c2)};padding:3px 12px;border-radius:999px;font-size:14px;font-weight:700">● ${t}</span>`).join('')}</div>
  <div style="margin-top:14px;border:1px solid ${R('outlineStrong')};border-radius:${T.radius.sm}px;padding:10px 12px;color:${R('onSurfaceSubtle')}">اسم الشركة</div>
  <div style="margin-top:14px;background:${R('surfaceAlt')};border-radius:${T.radius.lg}px;padding:14px;display:flex;justify-content:space-between"><span style="color:${R('onSurfaceMuted')}">ملاحظات حرجة</span><b class="num" style="font-size:26px">2</b></div>
  <a style="display:block;margin-top:12px;color:${R('link')};font-weight:700">شوف الدليل ←</a></div>`; };
page('ui', 'عناصر الواجهة (Tokens)', `<div class="grid" style="grid-template-columns:1fr 1fr 0.9fr;gap:26px;margin-top:6px">
  <div><h3>فاتح</h3>${comp('light')}</div><div><h3>غامق</h3><div style="background:${ROLE('dark', 'background')};padding:14px;border-radius:24px">${comp('dark')}</div></div>
  <div><h3>المسافات · أنصاف الأقطار · الظلال</h3><div style="display:flex;align-items:flex-end;gap:6px;direction:ltr">${Object.entries(T.space).slice(1).map(([k, v]) => `<div style="text-align:center"><div style="width:${Math.min(v, 40)}px;height:${v}px;background:${C.seg200};border-radius:2px"></div><div class="lat" style="font-size:10px">${v}</div></div>`).join('')}</div>
   <div style="display:flex;gap:10px;margin-top:16px;direction:ltr">${Object.entries(T.radius).map(([k, v]) => `<div style="text-align:center"><div style="width:52px;height:52px;border:2px solid ${C.seg600};border-radius:${Math.min(v, 26)}px"></div><div class="lat" style="font-size:10px">${k} ${v}</div></div>`).join('')}</div>
   <div style="display:flex;gap:16px;margin-top:20px">${['card', 'pop'].map((k) => `<div style="flex:1;height:70px;background:#fff;border-radius:14px;box-shadow:${T.shadow[k]};display:flex;align-items:center;justify-content:center" class="lat">${k}</div>`).join('')}</div>
   <p style="font-size:14px;margin-top:16px">الملفات: <span class="lat">seg-tokens.css</span> (متغيرات + <span class="lat">[data-theme=dark]</span>) و<span class="lat">tailwind.seg.cjs</span>. المكوّنات بتستخدم الأدوار بس.</p></div></div>`);

// ---------------------------------------------------------------- 6. application samples (also standalone files)
const post = `<div style="width:1080px;height:1350px;position:relative;overflow:hidden;background:${grad(T.gradient.night)};color:#fff;padding:96px;font-family:${T.font.stack}">
  <div class="lat" style="font:700 22px 'IBM Plex Sans';letter-spacing:.14em;color:${C.cyan};direction:ltr;text-align:right">STANDARD ENTERPRISE GOVERNANCE</div>
  <div style="font-size:${DISP.find((x) => x.k === 'display').px}px;line-height:1.15;font-weight:900;margin:24px 0 18px">كل رقم<br><span style="color:${C.seg200}">بدليله.</span></div>
  <div style="font-size:${DISP.find((x) => x.k === 'lead').px + 8}px;line-height:1.6;color:${C.darkTextMuted};max-width:820px">SEG بيراجع دفاترك كل يوم، وكل ملاحظة جاية ومعاها مصدرها.</div>
  <div style="position:absolute;left:96px;right:96px;top:640px;background:#fff;border-radius:20px;padding:26px 30px;color:${C.ink};box-shadow:${T.shadow.pop}">
   ${[['حرجة', 'criticalContainer', 'onCriticalContainer', 'دفعة مكررة لنفس المورّد', '40,800'], ['عالية', 'warningContainer', 'onWarningContainer', 'قيد بعد الإقفال', '50,000'], ['سليم', 'successContainer', 'onSuccessContainer', 'تسوية البنك مطابقة', '2,140']].map(([t, b, c2, d, n]) => `<div style="display:flex;align-items:center;gap:18px;padding:15px 0;border-bottom:1px solid ${C.line}"><span style="background:${ROLE('light', b)};color:${ROLE('light', c2)};border-radius:999px;padding:4px 16px;font-size:22px;font-weight:800">● ${t}</span><span style="flex:1;font-size:28px;font-weight:700">${d}</span><span class="num" style="font-size:28px;font-weight:700">${n}</span></div>`).join('')}
   <div style="color:${C.muted};font-size:19px;margin-top:12px">مثال توضيحي · داتا اختبارية</div></div>
  <div style="position:absolute;left:96px;right:96px;bottom:84px;display:flex;justify-content:space-between;align-items:center;direction:ltr">
   <div style="display:flex;align-items:center;gap:27px"><img src="${LOGO.twoDark}" style="height:64px"><i style="width:1px;height:45px;background:#fff;opacity:.32"></i><img src="${LOGO.mftWhite}" style="height:32px"></div>
   <span style="background:${C.cyan};color:${C.navy};border-radius:999px;padding:18px 34px;font-size:30px;font-weight:800;direction:rtl">فحص مجاني · <span class="lat">seg-audit.com</span></span></div></div>`;
const a4 = `<div style="width:1240px;height:1754px;position:relative;overflow:hidden;background:#fff;font-family:${T.font.stack}">
  <div style="position:absolute;inset:0 0 auto 0;height:1060px;background:${grad(T.gradient.depth)};overflow:hidden"><img src="${LOGO.cubeWhite}" style="position:absolute;left:-160px;top:260px;height:960px;opacity:.07"></div>
  <img src="${LOGO.lineDark}" style="position:absolute;right:110px;top:110px;height:96px">
  <div style="position:absolute;right:110px;left:110px;top:430px;color:#fff">
   <div class="lat" style="font:700 22px 'IBM Plex Sans';letter-spacing:.14em;color:${C.cyan};direction:ltr;text-align:right">AUDIT COMMITTEE REPORT · OCTOBER 2026</div>
   <div style="font-size:${DISP.find((x) => x.k === 'display').px}px;line-height:1.15;margin:22px 0;font-weight:900">تقرير لجنة المراجعة</div>
   <div style="font-size:36px;color:${C.darkTextMuted}">شركة النموذج للتوزيع</div><div style="font-size:24px;color:${C.seg200};margin-top:14px">مثال توضيحي · اسم وهمي وداتا اختبارية</div></div>
  <div style="position:absolute;right:110px;left:110px;top:1140px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px">
   ${[['حرجة', '2', 'critical'], ['عالية', '4', 'warning'], ['متوسطة', '6', 'primary']].map(([t, n, r]) => `<div style="border:1px solid ${C.line};border-radius:20px;padding:28px;border-top:8px solid ${ROLE('light', r)}"><div class="num" style="font-size:72px;font-weight:700;text-align:right">${n}</div><div style="font-size:28px;color:${C.slate}">ملاحظات ${t}</div></div>`).join('')}</div>
  <div style="position:absolute;right:110px;left:110px;top:1440px;font-size:22px;color:${C.slate};line-height:1.7">الملاحظات مرتبة حسب الخطورة، وكل ملاحظة مربوطة بقيدها في الدفاتر. مؤشرات تستاهل مراجعة، مش اتهامات.</div>
  <div style="position:absolute;right:110px;left:110px;bottom:100px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid ${C.line};padding-top:24px;direction:ltr">
   <div style="display:flex;align-items:center;gap:23px"><img src="${LOGO.twoLight}" style="height:54px"><i style="width:1px;height:38px;background:${C.navy};opacity:.32"></i><img src="${LOGO.mftNavy}" style="height:27px"></div>
   <span style="font-size:20px;color:${C.muted};direction:rtl">معتمد من: مراجع MFT (الاسم)</span></div></div>`;
const avatar = `<div style="width:1080px;height:1080px;background:${grad(T.gradient.night)};display:flex;align-items:center;justify-content:center"><img src="${LOGO.cubeDark}" style="height:560px"></div>`;
const banner = `<div style="width:1584px;height:396px;position:relative;overflow:hidden;background:${grad(T.gradient.depth)};color:#fff;font-family:${T.font.stack}">
  <div style="position:absolute;inset:0;overflow:hidden"><img src="${LOGO.cubeWhite}" style="position:absolute;left:-60px;top:-140px;height:680px;opacity:.06"></div>
  <img src="${LOGO.lineDark}" style="position:absolute;left:120px;top:150px;height:96px">
  <div style="position:absolute;right:120px;top:120px;text-align:right"><div style="font-size:58px;font-weight:900">المنصة التي تراجع نفسها</div><div class="lat" style="font:400 24px 'IBM Plex Sans';color:${C.seg200};margin-top:10px;direction:ltr;text-align:right">The platform that reviews itself · app.seg-audit.com</div></div></div>`;
const screen = (theme) => { const R = (r) => ROLE(theme, r), dk = theme === 'dark';
  const kpi = (t, n, r) => `<div style="background:${R('surface')};border:1px solid ${R('outline')};border-radius:${T.radius.lg}px;padding:18px 20px"><div style="font-size:14px;color:${R('onSurfaceMuted')}">${t}</div><div class="num" style="font-size:34px;font-weight:700;margin-top:6px;color:${r ? R(r) : R('onSurface')};text-align:right">${n}</div></div>`;
  const bars = [6, 8, 7, 7, 8, 12].map((v, i) => `<rect x="${18 + i * 58}" y="${150 - v * 10}" width="34" height="${v * 10}" rx="5" fill="${i === 5 ? C.cyan : R('primary')}" opacity="${i === 5 ? 1 : 0.85}"/>`).join(''); // October (last) = the exception
  const row = (sev, sc, d, ev, own, st) => `<tr><td style="padding:12px;border-bottom:1px solid ${R('outline')}"><span style="background:${R(sc + 'Container')};color:${R('on' + sc[0].toUpperCase() + sc.slice(1) + 'Container')};padding:3px 12px;border-radius:999px;font-size:13px;font-weight:700">● ${sev}</span></td><td style="padding:12px;border-bottom:1px solid ${R('outline')};font-weight:700">${d}</td><td class="num" style="padding:12px;border-bottom:1px solid ${R('outline')};color:${R('link')};font-size:14px">${ev}</td><td style="padding:12px;border-bottom:1px solid ${R('outline')};color:${R('onSurfaceMuted')}">${own}</td><td style="padding:12px;border-bottom:1px solid ${R('outline')};color:${R('onSurfaceMuted')}">${st}</td></tr>`;
  return `<div dir="rtl" style="width:1440px;height:900px;display:flex;background:${R('background')};color:${R('onSurface')};font-family:${T.font.stack};font-size:15px">
  <aside style="width:250px;background:${C.navy};padding:26px 22px;color:#fff"><img src="${LOGO.twoDark}" style="height:46px"><div style="margin-top:40px;display:flex;flex-direction:column;gap:6px">${['نظرة عامة', 'الملاحظات', 'الأدلة', 'التقارير', 'ربط Odoo', 'الإعدادات'].map((n, i) => `<div style="padding:11px 14px;border-radius:${T.radius.md}px;${i === 1 ? `background:rgba(255,255,255,.08);border-inline-start:3px solid ${C.cyan}` : 'color:' + C.darkTextMuted}">${n}</div>`).join('')}</div>
   <div style="position:absolute;bottom:24px;opacity:.85"><img src="${LOGO.mftWhite}" style="height:22px"></div></aside>
  <main style="flex:1;padding:26px 32px;display:flex;flex-direction:column;gap:20px">
   <div style="display:flex;justify-content:space-between;align-items:center"><div><div style="font-size:26px;font-weight:800">الملاحظات</div><div style="color:${R('onSurfaceMuted')};font-size:14px">شركة النموذج للتوزيع · أكتوبر 2026 · مثال توضيحي، داتا اختبارية</div></div>
    <div style="display:flex;gap:10px"><span style="border:1px solid ${R('outlineStrong')};padding:9px 16px;border-radius:${T.radius.md}px">تصدير PDF</span><span style="background:${R('primary')};color:${R('onPrimary')};padding:9px 18px;border-radius:${T.radius.md}px;font-weight:700">فحص جديد</span></div></div>
   <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px">${kpi('مستوى المخاطر', 'مرتفع', 'critical')}${kpi('ملاحظات حرجة', '2', 'critical')}${kpi('ملاحظات عالية', '4', 'warning')}${kpi('قيود اتفحصت', '18,406', null)}</div>
   <div style="display:grid;grid-template-columns:1.9fr 1fr;gap:16px;flex:1">
    <div style="background:${R('surface')};border:1px solid ${R('outline')};border-radius:${T.radius.lg}px;padding:6px 8px"><table style="width:100%;border-collapse:collapse;font-size:15px"><tr style="color:${R('onSurfaceSubtle')};font-size:13px"><td style="padding:12px">الخطورة</td><td style="padding:12px">الملاحظة</td><td style="padding:12px">الدليل</td><td style="padding:12px">المسؤول</td><td style="padding:12px">الحالة</td></tr>
     ${row('حرجة', 'critical', 'خزينة برصيد دائن', 'JE-1047', 'رئيس الحسابات', 'مفتوحة')}${row('حرجة', 'critical', 'دفعة مكررة لنفس المورّد', 'PAY-0332 · 0339', 'المدير المالي', 'مفتوحة')}${row('عالية', 'warning', 'قيد بعد الإقفال', 'JE-0412', 'رئيس الحسابات', 'قيد المراجعة')}${row('عالية', 'warning', 'مورّد باسمين', 'V-118 · V-131', 'المشتريات', 'قيد المراجعة')}${row('عالية', 'warning', 'مصروف من غير مرفق', 'JE-0388', 'رئيس الحسابات', 'مفتوحة')}${row('متوسطة', 'primary', 'قيود يدوية مدوّرة آخر الشهر', 'JE-0401…0409', 'المدير المالي', 'قيد المراجعة')}${row('سليم', 'success', 'تسوية البنك مطابقة', 'BR-10', 'الخزينة', 'مقفولة')}</table></div>
    <div style="background:${R('surface')};border:1px solid ${R('outline')};border-radius:${T.radius.lg}px;padding:18px"><div style="font-weight:800">الملاحظات شهريًا</div><div style="color:${R('onSurfaceMuted')};font-size:13px">أكتوبر = الاستثناء (سماوي)</div><svg viewBox="0 0 370 170" style="width:100%;margin-top:14px">${bars}</svg>
     <div class="num" style="display:flex;justify-content:space-between;font-size:12px;color:${R('onSurfaceSubtle')};direction:ltr"><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span></div>
     <div style="margin-top:22px;background:${R('primaryContainer')};color:${R('onPrimaryContainer')};border-radius:${T.radius.md}px;padding:12px 14px;font-size:14px">كل ملاحظة بيعتمدها مراجع MFT باسمه قبل ما تطلع في التقرير.</div></div></div></main></div>`; };
const SAMPLES = [['social-post_1080x1350', post, 1080, 1350], ['report-cover_A4_1240x1754', a4, 1240, 1754], ['avatar_1080x1080', avatar, 1080, 1080], ['linkedin-banner_1584x396', banner, 1584, 396], ['platform-screen-light_1440x900', screen('light'), 1440, 900], ['platform-screen-dark_1440x900', screen('dark'), 1440, 900]];

const sampleImg = (name) => png(`marketing/brand/assets/identity/seg-sample_${name}.png`);
const fit = (name, w, h, box) => { const sc = Math.min(box[0] / w, box[1] / h); return `<img src="${sampleImg(name)}" style="width:${Math.round(w * sc)}px;height:${Math.round(h * sc)}px;border-radius:10px;box-shadow:${T.shadow.card};flex:none;display:block">`; };
page('apps-social', 'تطبيقات: سوشيال وبروفايل', () => `<div style="display:flex;gap:30px;align-items:flex-start;margin-top:8px">${fit('social-post_1080x1350', 1080, 1350, [520, 650])}<div style="display:flex;flex-direction:column;gap:22px">${fit('avatar_1080x1080', 1080, 1080, [260, 260])}${fit('linkedin-banner_1584x396', 1584, 396, [760, 190])}
  <p style="font-size:15px;max-width:760px">البوست: حقل «night»، عنوان display ‏${DISP.find((x) => x.k === 'display').px} px، كارت أبيض للدليل بشارات الخطورة (الأدوار)، والتوقيع كوحدة. الأفاتار: المكعّب الأبيض لوحده (الاسم مش هيتقري في دايرة 110 px). البانر: lockup السطر الواحد + الجملة.</p></div></div>`);
page('apps-report', 'تطبيقات: غلاف تقرير A4', () => `<div style="display:flex;gap:44px;align-items:flex-start;margin-top:0">${fit('report-cover_A4_1240x1754', 1240, 1754, [560, 792])}<div style="max-width:620px"><p>غلاف التقرير هو المنتج اللي العميل بيمسكه. الثلث الفوقاني تدرّج «depth» والمكعّب علامة مائية 7%، والاسم بلوكاب السطر الواحد. تحت: أرقام الخطورة بشريط لون الدور، والتوقيع (SEG | MFT) في الذيل جنب اسم المراجع المعتمد.</p><div class="why" style="margin-top:14px">ليه الأرقام بخط Plex؟ جدولية، فالـ2 والـ4 والـ6 بيقفوا على نفس المحور في الكروت وفي أي جدول جوّه التقرير.</div><p style="margin-top:14px;font-size:14px">الملف: <span class="lat">assets/identity/seg-sample_report-cover_A4_1240x1754.png</span> + <span class="lat">.pdf</span> (مقاس A4).</p></div></div>`);
page('apps-screen', 'تطبيقات: شاشة المنصة (فاتح وغامق)', () => `<div style="display:flex;gap:26px;margin-top:4px">${fit('platform-screen-light_1440x900', 1440, 900, [700, 438])}${fit('platform-screen-dark_1440x900', 1440, 900, [700, 438])}</div>
  <p style="margin-top:20px">نفس الشاشة بالثيمين، من غير تغيير مكوّن واحد: كل لون جاي من دور. القائمة على اليمين (RTL)، والأرقام والمراجع LTR معزولة، وشارات الخطورة containers بنص onContainer، وأكتوبر هو العمود السماوي الوحيد: الاستثناء.</p>
  <p style="font-size:14px">أساس العرض: <span class="lat">seg-audit/portal</span> بيستخدم Tajawal + Cairo دلوقتي؛ الشاشة دي مقترح، مش لقطة من المنصة.</p>`);

page('decisions', 'القرارات المطلوبة من الـCEO', `<table style="margin-top:14px;font-size:17px"><tr><th>#</th><th>القرار</th><th>توصيتي</th><th>بيأثر على</th></tr>
  <tr><td>1</td><td>اتجاه المكعّب</td><td>✅ <b>A اعتُمد</b> (7 نوفمبر) وعُمّم على كل الصور والستوريز والأغلفة</td><td>الفيديوهات بتاخد A مع مسار الصوت</td></tr>
  <tr><td>2</td><td>ملف أصلي من المصمم (SVG/AI/PDF) لو موجود</td><td>يحسم الأبعاد بدل القياس من 180 px</td><td>الإنشاء</td></tr>
  <tr><td>3</td><td>الخط اللاتيني: IBM Plex Sans بدل Inter</td><td>نعم (أقرب قياس + أرقام جدولية + خط التقارير)</td><td>الموقع، والحملة، والمنصة</td></tr>
  <tr><td>4</td><td>توحيد خط المنصة (Tajawal + Cairo ← Cairo + Plex)</td><td>نعم، بعد 30 نوفمبر</td><td>seg-audit/portal</td></tr>
  <tr><td>5</td><td>favicon مقروء على 16 px (رمز مبسّط)</td><td>وش S لوحده</td><td>الموقع والتطبيق</td></tr>
  <tr><td>6</td><td>ألوان warning/success والأدوار الغامقة</td><td>اعتماد كما هي (كلها عدّت التباين)</td><td>الواجهة والتقارير</td></tr></table>
  <div class="why" style="margin-top:22px">بعد القرار 1: التوقيع على كل الأصول بيتبدّل من مكان واحد (<span class="lat">scripts/lib/campaign.js → MARK</span>) وبعدها إعادة توليد المولّدات والريلز. لحد كده، كل التصاميم شايلة لوجو الـCEO الأصلي + الاسم الكامل + شعار MFT.</div>`);

// ---------------------------------------------------------------- 7. render
(async () => {
  const { chromium } = require(process.env.PLAYWRIGHT_PATH);
  const browser = await chromium.launch({ channel: 'chrome' });
  fs.mkdirSync(OUT_ID, { recursive: true }); fs.rmSync(OUT_BOOK, { recursive: true, force: true }); fs.mkdirSync(OUT_BOOK, { recursive: true });
  const doc = (body) => `<!doctype html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><style>${CSS}</style></head><body>${body}</body></html>`;
  const shoot = async (html, w, h, file) => {
    const p = await browser.newPage({ viewport: { width: w, height: h } });
    await p.setContent(doc(html), { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(250);
    await p.screenshot({ type: 'png' }); // warm-up (Chrome 157 half-painted first capture)
    await p.screenshot({ path: file, type: 'png', clip: { x: 0, y: 0, width: w, height: h } });
    return p;
  };
  for (const [name, html, w, h] of SAMPLES) {
    const p = await shoot(html, w, h, path.join(OUT_ID, `seg-sample_${name}.png`));
    if (name.startsWith('report-cover')) await p.pdf({ path: path.join(OUT_ID, `seg-sample_${name}.pdf`), format: 'A4', printBackground: true, pageRanges: '1', scale: 794 / 1240 });
    await p.close();
  }
  for (let i = 0; i < PAGES.length; i++) { const p = await shoot(PAGES[i].html(), 1600, 1000, path.join(OUT_BOOK, `page-${String(i + 1).padStart(2, '0')}_${PAGES[i].slug}.png`)); await p.close(); }
  const p = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  await p.setContent(doc(PAGES.map((x) => x.html()).join('')), { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
  await p.pdf({ path: path.join(BRAND, 'seg-brand-book.pdf'), width: '1600px', height: '1000px', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await browser.close();
  console.log(`contrast: ${rows.length} role pairs, all pass · type: UI ${UI.map((x) => x.px).join('/')} · display ${DISP.map((x) => x.px).join('/')}`);
  console.log(`book: ${PAGES.length} pages → marketing/brand/seg-brand-book.pdf + assets/book/ · samples: ${SAMPLES.length} → assets/identity/`);
})();
