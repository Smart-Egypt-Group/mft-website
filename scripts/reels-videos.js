#!/usr/bin/env node
// SEG Audit Reels / Shorts (CEO brief, 4 Nov 2026): vertical MP4s (1080×1920, 30 fps, H.264 + silent
// AAC) from the storyboard frames in marketing/designs/concepts/video/, rendered into
// marketing/designs/video/ and copied to src/assets/social/video/ for direct public links.
//
//   reel-a  «باقي 360 يوم»: frames 1–5 of video-a, then the end card   ≈ 22 s
//   reel-b  «قبل / بعد»:    frames 1–4 of video-b, then the end card   ≈ 18.4 s
//   each in Arabic and English.
// Motion: every frame enters with a soft directional wipe in the reading direction (right to left in
// Arabic), so its text appears progressively, then holds with a slow push-in. The end card reveals
// «فحص مجاني لميزان شركتك في دقائق · seg-audit.com» word by word, with the MFT mark.
// Data rule (CEO): frames that show ledger figures carry «مثال توضيحي · داتا اختبارية»; the figures are
// design placeholders, not MFT or client data.
// Audio: a silent AAC track (no music, so nothing to license); add music in each platform's editor.
// Encoding: Chrome WebCodecs (H.264 + AAC); the MP4 is written by scripts/tiktok-videos.js → mp4().
// Regenerate the frames first (scripts/launch-concepts.js) whenever the seat count changes.
// Needs Playwright + Google Chrome:  PLAYWRIGHT_PATH=<path to playwright> node scripts/reels-videos.js [filter]
const fs = require('fs');
const os = require('os');
const path = require('path');

let chromium;
try { ({ chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright')); }
catch { console.error('playwright not found. npm i -D playwright, or set PLAYWRIGHT_PATH.'); process.exit(1); }
const { mp4 } = require('./tiktok-videos.js');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'marketing/designs/concepts/video');
const OUT = path.join(ROOT, 'marketing/designs/video');
const PUB = path.join(ROOT, 'src/assets/social/video');
const b64 = (f) => fs.readFileSync(path.join(ROOT, f)).toString('base64');
const W = 1080, H = 1920, FPS = 30, SEG = 3.6, END = 4.0, WIPE = 0.6, ZOOM = 0.03;

const REELS = {
  a: { frames: 5, demo: [4] },       // frame 4 is the report with figures
  b: { frames: 4, demo: [1, 2, 3] }  // the ledger frames
};
const COPY = {
  ar: { demo: 'مثال توضيحي · داتا اختبارية', l1: 'فحص مجاني لميزان شركتك', l2: 'في دقائق', pill: 'seg-audit.com', rtl: true },
  en: { demo: 'Illustrative example · test data', l1: 'A free check of your trial balance', l2: 'in minutes', pill: 'seg-audit.com', rtl: false }
};

async function main() {
  const only = process.argv[2] || '';
  fs.mkdirSync(OUT, { recursive: true });
  fs.mkdirSync(PUB, { recursive: true });
  // WebCodecs needs a secure context: a local file page counts, about:blank does not.
  const blank = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'reels-')), 'blank.html');
  fs.writeFileSync(blank, '<!doctype html><title>encode</title>');
  const browser = await chromium.launch({ channel: 'chrome', args: ['--disable-gpu'] });
  const page = await browser.newPage();
  await page.goto('file://' + blank);
  await page.evaluate(async ({ cairo, inter }) => {
    for (const [fam, data] of [['Cairo', cairo], ['Inter', inter]]) {
      const f = new FontFace(fam, `url(data:font/woff2;base64,${data})`, { weight: '400 900' }); await f.load(); document.fonts.add(f);
    }
  }, { cairo: b64('src/assets/fonts/cairo-arabic-var.woff2'), inter: b64('src/assets/fonts/inter-latin-var.woff2') });

  const results = [];
  for (const [id, R] of Object.entries(REELS)) for (const lang of ['ar', 'en']) {
    const name = `reel-${id}_${lang}_1080x1920`;
    if (only && !name.includes(only)) continue;
    const frames = Array.from({ length: R.frames }, (_, i) => fs.readFileSync(path.join(SRC, `video-${id}_${lang}_frame-${i + 1}_1080x1920.jpg`)).toString('base64'));
    const out = await page.evaluate(async ({ frames, demo, C, mark, W, H, FPS, SEG, END, WIPE, ZOOM }) => {
      const load = async (src) => { const i = new Image(); i.src = src; await i.decode(); return i; };
      const imgs = await Promise.all(frames.map((f) => load('data:image/jpeg;base64,' + f)));
      const logo = await load(mark);
      const c = new OffscreenCanvas(W, H), g = c.getContext('2d');
      const layer = new OffscreenCanvas(W, H), lg = layer.getContext('2d');
      const ease = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : 0.5 - 0.5 * Math.cos(Math.PI * t));
      const total = imgs.length * SEG + END, n = Math.round(total * FPS);

      const drawFrame = (ctx, k, tIn) => { // frame k, tIn seconds after it started
        const s = 1 + ZOOM * ease(Math.min(tIn / SEG, 1)), dw = W * s, dh = H * s;
        ctx.drawImage(imgs[k], (W - dw) / 2, (H - dh) * 0.4, dw, dh);
        if (demo.includes(k + 1)) { // the data-rule label, bottom centre, above the platform UI
          ctx.font = '800 34px Cairo, Inter'; ctx.direction = C.rtl ? 'rtl' : 'ltr'; ctx.textAlign = 'center';
          const tw = ctx.measureText(C.demo).width, pw = tw + 64, ph = 64, x = (W - pw) / 2, y = H - 330;
          ctx.fillStyle = 'rgba(13,27,62,.92)'; ctx.beginPath(); ctx.roundRect(x, y, pw, ph, ph / 2); ctx.fill();
          ctx.strokeStyle = '#1BB7CD'; ctx.lineWidth = 2; ctx.stroke();
          ctx.fillStyle = '#1BB7CD'; ctx.fillText(C.demo, W / 2, y + 44);
        }
      };
      const navy = (ctx) => { const gr = ctx.createRadialGradient(W * 0.5, H * 0.35, 50, W * 0.5, H * 0.4, H * 0.8); gr.addColorStop(0, '#1C2F63'); gr.addColorStop(0.55, '#0D1B3E'); gr.addColorStop(1, '#081230'); ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H); };
      // Soft directional wipe: the incoming layer is masked by a feathered edge moving in the reading direction.
      const wipe = (p) => {
        const feather = 220, edge = -feather + p * (W + 2 * feather);
        const x0 = C.rtl ? W - edge : edge;
        const gr = lg.createLinearGradient(C.rtl ? x0 + feather / 2 : x0 - feather / 2, 0, C.rtl ? x0 - feather / 2 : x0 + feather / 2, 0);
        gr.addColorStop(0, 'rgba(0,0,0,1)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
        lg.globalCompositeOperation = 'destination-in'; lg.fillStyle = gr; lg.fillRect(0, 0, W, H); lg.globalCompositeOperation = 'source-over';
      };
      const words = (ctx, text, y, px, color, t0, t) => { // word-by-word reveal in reading order
        ctx.direction = C.rtl ? 'rtl' : 'ltr'; ctx.textAlign = C.rtl ? 'right' : 'left';
        const ws = text.split(' ');
        let sp, widths, tot;
        do { // shrink until the line fits inside the 72 px side margins
          ctx.font = `900 ${px}px Cairo, Inter`;
          sp = ctx.measureText(' ').width; widths = ws.map((w) => ctx.measureText(w).width);
          tot = widths.reduce((a, b) => a + b, 0) + sp * (ws.length - 1);
        } while (tot > W - 144 && --px > 20);
        let x = C.rtl ? (W + tot) / 2 : (W - tot) / 2;
        ws.forEach((w, i) => {
          const a = ease((t - t0 - i * 0.14) / 0.35);
          ctx.globalAlpha = a; ctx.fillStyle = color; ctx.fillText(w, x, y + (1 - a) * 18);
          x += (C.rtl ? -1 : 1) * (widths[i] + sp);
        });
        ctx.globalAlpha = 1;
        return ws.length;
      };
      const endCard = (ctx, t) => {
        navy(ctx);
        ctx.globalAlpha = ease(t / 0.5);
        const mh = 120, mw = mh * logo.width / logo.height; ctx.drawImage(logo, (W - mw) / 2 - 90, 520, mw, mh);
        ctx.font = '800 92px Inter'; ctx.direction = 'ltr'; ctx.textAlign = 'left'; ctx.fillStyle = '#fff'; ctx.fillText('MFT', (W - mw) / 2 - 90 + mw + 30, 612);
        ctx.globalAlpha = 1;
        const k1 = words(ctx, C.l1, 900, C.rtl ? 86 : 70, '#FFFFFF', 0.4, t);
        const k2 = words(ctx, C.l2, 1020, C.rtl ? 86 : 70, '#1BB7CD', 0.4 + k1 * 0.14, t);
        const tp = 0.4 + (k1 + k2) * 0.14 + 0.1, a = ease((t - tp) / 0.4);
        ctx.globalAlpha = a; ctx.font = '800 54px Inter'; ctx.direction = 'ltr'; ctx.textAlign = 'center';
        const pw = ctx.measureText(C.pill).width + 110, ph = 110, px = (W - pw) / 2, py = 1130 + (1 - a) * 20;
        ctx.shadowColor = 'rgba(27,183,205,.5)'; ctx.shadowBlur = 40; ctx.fillStyle = '#1BB7CD'; ctx.beginPath(); ctx.roundRect(px, py, pw, ph, ph / 2); ctx.fill(); ctx.shadowBlur = 0;
        ctx.fillStyle = '#0D1B3E'; ctx.fillText(C.pill, W / 2, py + 74); ctx.globalAlpha = 1;
      };

      // ---- video
      const vchunks = []; let vdesc = null, fail = null;
      const venc = new VideoEncoder({
        output: (ch, meta) => { if (meta && meta.decoderConfig && meta.decoderConfig.description) vdesc = new Uint8Array(meta.decoderConfig.description); const b = new Uint8Array(ch.byteLength); ch.copyTo(b); vchunks.push({ key: ch.type === 'key', ts: ch.timestamp, data: b }); },
        error: (e) => { fail = String(e); }
      });
      venc.configure({ codec: 'avc1.42E028', width: W, height: H, bitrate: 8e6, framerate: FPS, hardwareAcceleration: 'prefer-software', latencyMode: 'quality', avc: { format: 'avc' } });
      for (let i = 0; i < n; i++) {
        const t = i / FPS, k = Math.floor(t / SEG);
        if (k >= imgs.length) endCard(g, t - imgs.length * SEG);
        else {
          const tIn = t - k * SEG;
          if (tIn < WIPE) { // previous frame (or navy before the first) under the incoming wipe
            if (k === 0) navy(g); else drawFrame(g, k - 1, SEG + tIn);
            lg.clearRect(0, 0, W, H); drawFrame(lg, k, tIn); wipe(ease(tIn / WIPE)); g.drawImage(layer, 0, 0);
          } else drawFrame(g, k, tIn);
          if (k === imgs.length - 1 && tIn > SEG - 0.5) { g.globalAlpha = ease((tIn - (SEG - 0.5)) / 0.5); navy(g); g.globalAlpha = 1; } // fade into the end card
        }
        const frame = new VideoFrame(c, { timestamp: Math.round((i * 1e6) / FPS), duration: Math.round(1e6 / FPS) });
        venc.encode(frame, { keyFrame: i % (FPS * 2) === 0 });
        frame.close();
        if (venc.encodeQueueSize > 8) await new Promise((r) => setTimeout(r, 5));
      }
      await venc.flush(); venc.close();

      // ---- silent AAC
      const achunks = []; let adesc = null;
      const aenc = new AudioEncoder({
        output: (ch, meta) => { if (meta && meta.decoderConfig && meta.decoderConfig.description) adesc = new Uint8Array(meta.decoderConfig.description); const b = new Uint8Array(ch.byteLength); ch.copyTo(b); achunks.push(b); },
        error: (e) => { fail = String(e); }
      });
      const SR = 48000;
      aenc.configure({ codec: 'mp4a.40.2', sampleRate: SR, numberOfChannels: 2, bitrate: 96000 });
      const block = 4800, totalSamples = Math.ceil(total * SR);
      for (let s = 0; s < totalSamples; s += block) {
        const len = Math.min(block, totalSamples - s);
        aenc.encode(new AudioData({ format: 'f32-planar', sampleRate: SR, numberOfFrames: len, numberOfChannels: 2, timestamp: Math.round((s / SR) * 1e6), data: new Float32Array(len * 2) }));
      }
      await aenc.flush(); aenc.close();
      if (fail) throw new Error(fail);

      const toB64 = (u) => { let s = ''; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); return btoa(s); };
      vchunks.sort((a, b) => a.ts - b.ts);
      // Fall back to the AAC-LC 48 kHz stereo AudioSpecificConfig if the encoder gives none.
      return { seconds: n / FPS, avcC: toB64(vdesc), v: vchunks.map((x) => ({ key: x.key, data: toB64(x.data) })), asc: adesc ? toB64(adesc) : btoa(String.fromCharCode(0x11, 0x90)), a: achunks.map(toB64) };
    }, { frames, demo: R.demo, C: COPY[lang], mark: 'data:image/png;base64,' + b64('src/assets/logo/mft-mark-white.png'), W, H, FPS, SEG, END, WIPE, ZOOM });

    const vs = out.v.map((s) => ({ key: s.key, data: Buffer.from(s.data, 'base64') }));
    const audio = { samples: out.a.map((s) => Buffer.from(s, 'base64')), asc: Buffer.from(out.asc, 'base64'), sampleRate: 48000, channels: 2 };
    const file = path.join(OUT, `${name}.mp4`);
    fs.writeFileSync(file, mp4(vs, Buffer.from(out.avcC, 'base64'), audio, { width: W, height: H, fps: FPS }));
    fs.copyFileSync(file, path.join(PUB, `${name}.mp4`));
    results.push({ name, seconds: out.seconds, mb: fs.statSync(file).size / 1e6 });
    console.log('wrote', path.relative(ROOT, file), `${out.seconds.toFixed(1)} s`, `${(fs.statSync(file).size / 1e6).toFixed(1)} MB`, `audio ${audio.samples.length} AAC frames`);
  }
  await browser.close();
  return results;
}

if (require.main === module) main();
module.exports = { main };
