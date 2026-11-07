# Short-video storyboards (Reels / TikTok / Shorts)

> **⚠️ أرشيف (6 نوفمبر 2026):** سطور الندرة في هذا الملف («50 مقعد فقط بسعر مؤسِّس مدى الحياة») **قديمة**. الندرة الآن: سعر المؤسِّس يُغلق نهائيًا الإثنين 30 نوفمبر 2026، 11:59 مساءً بتوقيت القاهرة (`src/site.config.js → founding.closesAt`) + العضوية بالطلب، ومش كل طلب بيتقبل. «مدى الحياة» يُقال في خطاب القبول فقط. المحتوى الجاهز للنشر: [`november-calendar.md`](november-calendar.md).

Frames: `marketing/designs/concepts/video/`. Storyboard sheets: `video-a_{ar,en}_storyboard_*.jpg`, `video-b_{ar,en}_storyboard_*.jpg`.
Format: 1080×1920, 30 fps, burned-in captions (most views are muted), text inside the safe zone (250–1440 px from the top, 150 px clear of the right edge).
Edit: CapCut or Premiere. Each frame is a still; motion comes from the moves listed (scale, wipe, light sweep). No stock footage, no music with lyrics; a low, steady pulse or ticking beat.

**The 3-second rule:** the first frame must state the whole hook as large type, before any logo. The MFT mark appears only at the end.

---

## Video 1 · «باقي 360 يوم» · 15 s

| Time | Frame | On screen | Motion | Voice-over (founder, Egyptian Arabic) |
|---|---|---|---|---|
| 0:00–0:03 | `frame-1` | «مين بيراجع دفاترك باقي **360** يوم؟» | Type slams in line by line (4 frames each); «360» scales 110% → 100% with a cyan glow pulse | (first second silent) «مين بيراجع دفاترك باقي تلتمية وستين يوم؟» |
| 0:03–0:06 | `frame-2` | «مراجعة سنوية واحدة. والسنة 365 يومًا.» + calendar, one week lit | The five white dots light one by one, then hold | «المراجعة السنوية بتاخد أيام. والسنة كلها ٣٦٥ يوم.» |
| 0:06–0:10 | `frame-3` | «SEG Audit بيقرا دفاترك كل يوم.» | A cyan wave runs through the dots day by day (animate `wave` from 0 to 365, or cross-fade frame-2 → frame-3) | «SEG Audit بيقرا دفاترك كل يوم، بصلاحية قراءة بس.» |
| 0:10–0:13 | `frame-4` | «وكل ملاحظة معاها دليلها.» + white report, one cyan row | A white light sweeps down the scan line; the cyan row lights last | «وكل ملاحظة بتطلعلك معاها مصدرها في دفاترك.» |
| 0:13–0:15 | `frame-5` | Council (6 Nov 2026): «30 نوفمبر» in the hemicycle · «مقعدك في المجلس، لو اتقبلت.» + «العضوية بالطلب، ومش كل طلب بيتقبل» + apply pill | The visitor's seat pulses cyan | «خمسين مقعد بس، بسعر مؤسس مدى الحياة. الرابط في البايو.» |

**Caption:** مين بيراجع دفاترك باقي 360 يوم؟ SEG Audit بيراجع كل يوم. العضوية المؤسِّسة بالطلب، وسعر المؤسِّس بيتقفل 30 نوفمبر. #SEGAudit #محاسبة #ريادة_أعمال

## Video 2 · «قبل / بعد» · 12 s

| Time | Frame | On screen | Motion | Voice-over |
|---|---|---|---|---|
| 0:00–0:03 | `frame-1` | «دفاترك شكلها كده؟» over the tilted, overlapping ledger | Slow 3% drift + slight shake on the rows; text hard-cut in at 0:00 | (none; ticking sound only) |
| 0:03–0:06 | `frame-2` | «SEG Audit بيراجع…» | The scan line wipes top → bottom; above it the rows snap into the white report | «SEG Audit بيراجع الدفاتر كلها، مش عيّنة.» |
| 0:06–0:09 | `frame-3` | «ملاحظة حرجة واحدة. ومعها مصدرها.» | The cyan row lights; the source chip pulses once | «ملاحظة حرجة واحدة، ومعاها مصدرها.» |
| 0:09–0:12 | `frame-4` | Council end card | The viewer's seat pulses | «مش كل طلب بيتقبل. وسعر المؤسِّس بيتقفل 30 نوفمبر.» |

## Founder POV clip · 30–40 s

Overlay: `marketing/designs/concepts/founder-pov/founder-pov_{ar,en}_overlay_1080x1920.png` (transparent), placed as the top layer for the whole clip. The mock frame shows the placement.

| Element | Spec |
|---|---|
| Shot | Phone on a tripod at eye level, vertical, founder centred on the golden line (the mock shows the guides), office or plain wall behind, window light from the side |
| Hook | Burned in from frame 1: «ليه مش أي شركة؟». The founder says it in the first second |
| Lower third | On from 0:02 to 0:07, then off (keep the overlay version without it for the rest, or mask it) |
| Script | TikTok day 6 in [`week-1/tiktok.md`](week-1/tiktok.md); the founder edits it to his own words |
| End | Cut to `video/video-a_*_frame-5` (hemicycle) for the last 2 seconds |

## Before publishing (all videos)

- [ ] No seat count and no «مدى الحياة» on any frame; closing window + selectivity only
- [ ] Captions checked against the voice-over word for word
- [ ] First frame is the hook, not the logo
- [ ] Watched once on a phone with the sound off
- [ ] Uploaded natively to each platform (no cross-platform watermark)
