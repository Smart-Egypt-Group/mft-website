# MFT brand identity kit

One identity on every profile, post and page. This kit is the reference; the site (`src/styles/main.css`) and the generators (`scripts/brand-profiles.js`, `scripts/launch-images.js`, `scripts/launch-concepts.js`) already follow it.

| | |
|---|---|
| Company | **Modern Financial Technology** (short: **MFT**) |
| Platform | **SEG Audit**, the continuous audit platform from MFT (`app.seg-audit.com`) |
| Website | **www.seg-audit.com** |
| Positioning | **المنصة التي تراجع نفسها** · **The platform that reviews itself** |

## 1. Positioning

**The line (AR + EN, always together on profile covers):**
- المنصة التي تراجع نفسها
- The platform that reviews itself

**What it means (use in about sections):**
- AR: نراجع أنفسنا قبل أن نراجع دفاترك: أكثر من 7,900 اختبار آلي قبل كل تحديث، وسجل لا يُعدَّل بصمت، وقراءة فقط من نظامك، ولكل ملاحظة دليلها.
- EN: We review ourselves before we review your books: 7,900+ automated tests before every update, a log nothing can change silently, read-only access to your system, and evidence behind every finding.

Every claim above is published on the site (trust centre, platform figures in `src/content/platform-facts.js`). The test count is regenerated from the seg-audit code; update the text when it changes.

**One-sentence company description:**
- AR: MFT شركة تكنولوجيا مالية ومراجعة بقيادة محاسبين معتمدين: منصة SEG Audit للمراجعة المستمرة، وتنفيذ Odoo ERP، والمراجعة الداخلية، والمدير المالي الافتراضي، في مصر والسعودية والولايات المتحدة.
- EN: MFT is a fintech and audit firm led by certified accountants: the SEG Audit continuous audit platform, Odoo ERP implementation, internal audit and virtual CFO services, in Egypt, Saudi Arabia and the United States.

## 2. Logo and mark

| Asset | File | Use |
|---|---|---|
| Mark, white (white + cyan) | `src/assets/logo/mft-mark-white.png` | On navy: avatars, covers, video |
| Mark, navy | `src/assets/logo/mft-mark-navy.png` | On white |
| Horizontal lockup, white / navy | `src/assets/logo/mft-lockup-{white,navy}.png` | Website header and footer, documents |
| Stacked lockup, white / navy | `src/assets/logo/mft-stacked-{white,navy}.png` | Square layouts with room |
| Profile avatar (all platforms) | `marketing/brand/assets/avatars/` | Social profile pictures |

Rules:
- **Clear space:** at least ¼ of the mark's height on every side.
- **Minimum size:** 24 px tall on screen (mark), 120 px wide (lockup).
- **Small MFT mark** on creatives: one per design, at the bottom margin, never the hero.
- Never recolour, outline, stretch, rotate, add shadows or gold, or place the white mark on a light background.
- No vector master exists yet; all assets come from the official 5906 px PNG pack (`scripts/logo-assets.js`). Ask for an SVG before printing large formats.

## 3. Colour

| Token | Hex | Role |
|---|---|---|
| **Navy** | `#0D1B3E` | The dominant field: backgrounds, headers, text on white |
| **Cyan** | `#1BB7CD` | The accent: one highlight per design (the "exception"), fills and text **on navy** only |
| **Brilliant white** | `#FFFFFF` | Luminous: the reviewed page, type on navy |
| Accent (interactive, site) | `#0F7C91` | Buttons and links on the website, and cyan-hued text on white (4.9:1, WCAG AA) |
| Mist (site surfaces) | `#F5F7FA` | Light section backgrounds on the website |

- **No gold.** It is retired from social and launch work.
- Cyan on white is 2.4:1: never use it for text on light backgrounds.
- Proportion: navy dominant, white as light, cyan as the single point of attention.

## 4. Composition

- **Golden ratio (φ = 1.618):** split every canvas at 61.8 / 38.2; place the key point on the golden line.
- **The system's grammar:** a navy field, a brilliant-white "page", a seam of light where they meet, and **one** cyan exception line or point.
- **Brand device:** the golden spiral of reviewed reports (each one checked by the next): the positioning line made visible. It appears on every profile cover.
- No stock photos, no clipart, no third-party logos, no emojis in designs.

## 5. Typography

| | Latin and digits | Arabic |
|---|---|---|
| Typeface | **Inter** (variable) | **Cairo** (variable) |
| Headlines | 800–900 | 800–900 |
| Body | 400–600 | 400–600 |
| Files | `src/assets/fonts/inter-latin-var.woff2` | `src/assets/fonts/cairo-arabic-var.woff2` |

- Type scale (site): 17 px body → 27.5 px (×φ) → 44.5 px (×φ²). Three sizes per view.
- Arabic: no letter-spacing, no all-caps logic, looser line height. English eyebrows: uppercase, tracked.
- Digits are always Latin (0–9), in Inter, in both languages.

## 6. Voice

**We sound like** a senior auditor who is also a good engineer: calm, exact, direct.

| Do | Don't |
|---|---|
| State a fact, then its evidence | Promise outcomes («وفّر 50%», "10× faster") |
| «ملاحظة»، «دليل»، «مصدر» | «احتيال»، «فضيحة»، or any word that convicts |
| Short sentences; one idea each | Exclamation storms, «ثوري», "game-changing" |
| Arabic first, clear Modern Standard Arabic; Egyptian dialect only in short video and hooks | Mix languages mid-sentence (keep Latin product names as Latin) |
| Name numbers only when they are published (`platform-facts.js`, seat count) | Invent statistics or name a client without written consent |

## 7. Names, handles and links (standard)

| Item | Standard |
|---|---|
| Display name | **Modern Financial Technology (MFT)**: use the full form everywhere it fits |
| Handle | **@modernfintech** everywhere (Instagram already uses it). Fallback where taken: **@mftfintech** |
| Website field | **https://www.seg-audit.com** |
| Platform link (in bios, pinned posts) | **app.seg-audit.com** |
| Contact | info@seg-audit.com · +20 106 239 9941 (WhatsApp) |

Per-platform text: [profiles.md](profiles.md). Step-by-step application: [CHECKLIST.md](CHECKLIST.md).
