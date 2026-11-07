#!/usr/bin/env node
// Paid-campaign cut of the CEO's lesson video «3 علامات تكشف المورد الوهمي» (Ayman Ashraf, 44.7 s, 9:16).
//   PLAYWRIGHT_PATH=… FFMPEG=… node scripts/ayman-ad.js <source.mov>
// → marketing/designs/ads/video/ghost-vendor-ayman_ad_1080x1920.mp4
// Edits (CEO brief, 7 Nov 2026):
//   1. 576×1024 → 1080×1920: Lanczos upscale + a light luma unsharp (5×5, 0.5), no chroma sharpening
//   2. identity on logo A: the old MFT-only tile (top start corner, 0–36 s) is covered by a fixed SEG A tile
//      (the official cube + «SEG»); the old end card (MFT logo + «اكتب في الكومنتات») is replaced from 39.8 s
//      by a new card: the line «العلامة ≠ دليل… لكنها بداية الفحص», the free-check CTA and the full signature
//      (SEG lockup A + «Standard Enterprise Governance» | MFT)
//   3. paid CTA: «فحص مجاني لميزان شركتك في دقائق» + app.seg-audit.com instead of «اكتب في الكومنتات»
// The source already carries burned-in Arabic captions; audio: EBU R128 two-pass loudnorm to -14 LUFS, -1.5 dBTP.
const fs = require('fs'), os = require('os'), path = require('path'), { spawnSync } = require('child_process');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const { signHTML, MARK } = require('./lib/campaign.js');
const { NAVY, CYAN, RED } = require('./lib/brand-tokens.js').legacy;
const ROOT = path.join(__dirname, '..'), FF = process.env.FFMPEG || 'ffmpeg';
const SRC = process.argv[2]; if (!SRC) { console.error('usage: node scripts/ayman-ad.js <source.mov>'); process.exit(1); }
const OUT = path.join(ROOT, 'marketing/designs/ads/video/ghost-vendor-ayman_ad_1080x1920.mp4');
const W = 1080, H = 1920, K = W / 576; // source → output scale
const TILE = { x: 44, y: 60, w: 78, h: 100 }; // old tile 48–117 × 64–155 in source px, plus its soft edge
const LOGO_OFF = 36.0, END_AT = 39.8;
const font = (f) => fs.readFileSync(path.join(ROOT, 'src/assets/fonts', f)).toString('base64');
const css = `@font-face{font-family:Cairo;src:url(data:font/woff2;base64,${font('cairo-arabic-var.woff2')});font-weight:400 900}
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${font('inter-latin-var.woff2')});font-weight:400 900}
*{margin:0;padding:0;box-sizing:border-box}html,body{width:${W}px;height:${H}px}body{font-family:Cairo,Inter,sans-serif}
.lat{font-family:Inter;direction:ltr;unicode-bidi:isolate}`;
const r = Math.round, t = { x: r(TILE.x * K), y: r(TILE.y * K), w: r(TILE.w * K), h: r(TILE.h * K) };
const watermark = `<!doctype html><html dir="rtl"><style>${css}body{background:transparent}
.tile{position:absolute;left:${t.x}px;top:${t.y}px;width:${t.w}px;height:${t.h}px;border-radius:24px;background:#fff;box-shadow:0 6px 24px rgba(0,0,0,.35);
display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px}
.tile img{width:${r(t.w * 0.66)}px;height:auto}.tile b{font:900 30px Inter;letter-spacing:.06em;color:${NAVY}}</style>
<body><div class="tile"><img src="${MARK.cubeColor}" alt=""><b>SEG</b></div></body></html>`;
const endcard = `<!doctype html><html dir="rtl" lang="ar"><style>${css}
body{background:radial-gradient(ellipse at 70% 0%,#1E3470 0%,${NAVY} 55%,#060E24 100%);color:#fff;display:flex;flex-direction:column;justify-content:center;padding:0 89px;gap:0}
h1{font-weight:900;font-size:110px;line-height:1.15}h1 em{font-style:normal;color:${RED}}
h2{font-weight:800;font-size:68px;color:${CYAN};margin-top:13px}
.rule{height:3px;width:233px;background:${CYAN};opacity:.6;margin:55px 0}
.cta{font-weight:900;font-size:64px;line-height:1.3}
.pill{display:inline-flex;align-self:flex-start;margin-top:34px;padding:16px 42px;border-radius:999px;background:${CYAN};color:${NAVY};font:800 46px Inter}
.sub{margin-top:21px;font-weight:700;font-size:38px;color:rgba(255,255,255,.72)}
.sign{margin-top:89px;align-self:flex-start}</style><body>
<h1>العلامة <em>≠</em> دليل</h1><h2>لكنها بداية الفحص.</h2>
<div class="rule"></div>
<p class="cta">فحص مجاني لميزان شركتك<br>في دقائق</p>
<p class="pill">app.seg-audit.com</p>
<p class="sub">الرابط تحت الفيديو · مؤشرات، مش تقرير مراجعة</p>
<div class="sign">${signHTML(110)}</div></body></html>`;

(async () => {
  const tmp = process.env.OVERLAY_DIR || fs.mkdtempSync(path.join(os.tmpdir(), 'ayman-'));
  const b = await chromium.launch({ channel: 'chrome', args: ['--disable-gpu'] }), p = await b.newPage({ viewport: { width: W, height: H } });
  for (const [name, html, omit] of [['wm.png', watermark, true], ['end.png', endcard, false]]) {
    await p.setContent(html, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(tmp, name), omitBackground: omit }); // first capture = warm-up (Chrome 157)
    await p.waitForTimeout(200); await p.screenshot({ path: path.join(tmp, name), omitBackground: omit });
  }
  await b.close();
  // loudness, pass 1: measure
  const meas = spawnSync(FF, ['-hide_banner', '-i', SRC, '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json', '-f', 'null', '-'], { encoding: 'utf8' }).stderr;
  const L = JSON.parse(meas.slice(meas.lastIndexOf('{'), meas.lastIndexOf('}') + 1));
  const an = `loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=${L.input_i}:measured_TP=${L.input_tp}:measured_LRA=${L.input_lra}:measured_thresh=${L.input_thresh}:offset=${L.target_offset}:linear=true,aresample=48000`;
  // pass 2: picture + sound
  const vf = `[0:v]scale=${W}:${H}:flags=lanczos+accurate_rnd+full_chroma_int,unsharp=5:5:0.5:5:5:0[v];`
    + `[v][1:v]overlay=0:0:enable='lt(t,${LOGO_OFF})'[a];[2:v]format=rgba,fade=in:st=${END_AT}:d=0.4:alpha=1[e];[a][e]overlay=0:0:enable='gte(t,${END_AT})',format=yuv420p[out]`;
  const res = spawnSync(FF, ['-hide_banner', '-loglevel', 'error', '-y', '-i', SRC, '-loop', '1', '-i', path.join(tmp, 'wm.png'), '-loop', '1', '-i', path.join(tmp, 'end.png'),
    '-filter_complex', vf, '-map', '[out]', '-map', '0:a', '-af', an, '-shortest',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-profile:v', 'high', '-r', '30', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', OUT], { encoding: 'utf8' });
  if (res.status) { console.error(res.stderr); process.exit(1); }
  const chk = spawnSync(FF, ['-hide_banner', '-i', OUT, '-af', 'loudnorm=I=-14:print_format=json', '-f', 'null', '-'], { encoding: 'utf8' }).stderr;
  const C = JSON.parse(chk.slice(chk.lastIndexOf('{'), chk.lastIndexOf('}') + 1));
  console.log('wrote', path.relative(ROOT, OUT), `${(fs.statSync(OUT).size / 1e6).toFixed(1)} MB`, `audio ${C.input_i} LUFS, true peak ${C.input_tp} dBTP`);
})().catch((e) => { console.error(e); process.exit(1); });
