#!/usr/bin/env node
// SEG Audit paid ads: TikTok-ready MP4s (8 s, 1080×1920, 30 fps, H.264, no audio) rendered from
// the static 9:16 ad designs in marketing/designs/ads/ into marketing/designs/ads/video/.
// TikTok's own placements need video; the music is added in TikTok Ads Manager from the
// Commercial Music Library, so the files carry no audio track.
//
// Motion: a slow ease-in-out push-in (1.00 → 1.04) on the design, so frame 0 is the full design
// (a clean cover) and the 64 px design margins keep the CTA inside the frame throughout.
// Encoding: Chrome's WebCodecs H.264 encoder (no ffmpeg needed); the MP4 container is written here.
// Regenerate the source JPGs first (scripts/launch-images.js) whenever the close date (founding.closesAt) or copy changes.
// Needs Playwright + Google Chrome:  PLAYWRIGHT_PATH=<path to playwright> node scripts/tiktok-videos.js [filter]
const fs = require('fs');
const os = require('os');
const path = require('path');

let chromium;
try { ({ chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright')); }
catch { console.error('playwright not found. npm i -D playwright, or set PLAYWRIGHT_PATH.'); process.exit(1); }

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'marketing/designs/ads');
const OUT = path.join(SRC, 'video');
let W = 1080, H = 1920; const FPS = 30, SECONDS = 8, ZOOM = 0.04, BITRATE = 8e6;
const TIMESCALE = 15360, DELTA = TIMESCALE / FPS;
const VARIANTS = ['live-ar', 'live-en', 'close-ar', 'close-en']; // seats-* withdrawn 6 Nov 2026
// Every motion job (coverage pass, 6 Nov 2026): the 9:16 ads, plus 4:5 feed video (Facebook/Instagram/
// LinkedIn feed), 16:9 (YouTube, LinkedIn/Facebook landscape) and 9:16 stories of the scarcity concepts.
const D = path.join(ROOT, 'marketing/designs');
const JOBS = [
  ...VARIANTS.map((v) => ({ name: `tiktok-9x16_${v}_1080x1920`, src: path.join(SRC, `tiktok-9x16_${v}_1080x1920.jpg`), w: 1080, h: 1920 })),
  ...VARIANTS.map((v) => ({ name: `meta-feed-4x5_${v}_1080x1350`, src: path.join(SRC, `meta-feed-4x5_${v}_1080x1350.jpg`), w: 1080, h: 1350 })),
  ...VARIANTS.map((v) => ({ name: `video-16x9_${v}_1920x1080`, src: path.join(SRC, `video-16x9_${v}_1920x1080.jpg`), w: 1920, h: 1080 })),
  ...['ar', 'en'].map((l) => ({ name: `council-story_${l}_1080x1920`, src: path.join(D, `concepts/hemicycle/hemicycle_${l}_story_1080x1920.jpg`), w: 1080, h: 1920 })),
  { name: 'selectivity-story_ar_1080x1920', src: path.join(D, 'psych/4-selectivity/psych-4-selectivity_ar_story_1080x1920.jpg'), w: 1080, h: 1920 },
  { name: 'days-4x5_ar_1080x1350', src: path.join(D, 'golden/2-days/golden-2-days_ar_4x5_1080x1350.jpg'), w: 1080, h: 1350 }
];

// ---------------------------------------------------------------- MP4 (ISO BMFF) writer
const u8 = (n) => Buffer.from([n & 255]);
const u16 = (n) => { const b = Buffer.alloc(2); b.writeUInt16BE(n); return b; };
const u32 = (n) => { const b = Buffer.alloc(4); b.writeUInt32BE(n >>> 0); return b; };
const str = (s) => Buffer.from(s, 'latin1');
const box = (type, ...parts) => { const body = Buffer.concat(parts); return Buffer.concat([u32(8 + body.length), str(type), body]); };
const full = (type, version, flags, ...parts) => box(type, u8(version), u8(flags >> 16), u16(flags & 0xffff), ...parts);
const MATRIX = Buffer.concat([0x00010000, 0, 0, 0, 0x00010000, 0, 0, 0, 0x40000000].map(u32));

// MPEG-4 descriptor: tag, then the length in the 4-byte 0x80-continued form.
const desc = (tag, ...parts) => { const body = Buffer.concat(parts), n = body.length;
  return Buffer.concat([u8(tag), Buffer.from([0x80 | ((n >> 21) & 127), 0x80 | ((n >> 14) & 127), 0x80 | ((n >> 7) & 127), n & 127]), body]); };

// samples: [{ key, data }] H.264 (avcC format) at FPS; options: { width, height, fps }.
// audio (optional): { samples: [Buffer] AAC-LC raw frames of 1024 samples, asc: AudioSpecificConfig, sampleRate, channels }.
function mp4(samples, avcC, audio = null, options = {}) {
  const width = options.width || W, height = options.height || H, delta = TIMESCALE / (options.fps || FPS);
  const n = samples.length, duration = n * delta, movieDur = Math.round((duration / TIMESCALE) * 1000);
  const vData = Buffer.concat(samples.map((s) => s.data));
  const aData = audio ? Buffer.concat(audio.samples) : Buffer.alloc(0);
  const aDur = audio ? audio.samples.length * 1024 : 0;
  const tkhd = (id, dur, isAudio) => full('tkhd', 0, 3, u32(0), u32(0), u32(id), u32(0), u32(dur), Buffer.alloc(8), u16(0), u16(isAudio ? 1 : 0), u16(isAudio ? 0x0100 : 0), u16(0), MATRIX,
    u32(isAudio ? 0 : width << 16), u32(isAudio ? 0 : height << 16));
  const moov = (vOff, aOff) => box('moov',
    full('mvhd', 0, 0, u32(0), u32(0), u32(1000), u32(movieDur), u32(0x00010000), u16(0x0100), Buffer.alloc(10), MATRIX, Buffer.alloc(24), u32(audio ? 3 : 2)),
    box('trak',
      tkhd(1, movieDur, false),
      box('mdia',
        full('mdhd', 0, 0, u32(0), u32(0), u32(TIMESCALE), u32(duration), u16(0x55c4), u16(0)),
        full('hdlr', 0, 0, u32(0), str('vide'), Buffer.alloc(12), str('VideoHandler\0')),
        box('minf',
          full('vmhd', 0, 1, Buffer.alloc(8)),
          box('dinf', full('dref', 0, 0, u32(1), full('url ', 0, 1))),
          box('stbl',
            full('stsd', 0, 0, u32(1), box('avc1',
              Buffer.alloc(6), u16(1), Buffer.alloc(16), u16(width), u16(height), u32(0x00480000), u32(0x00480000), u32(0), u16(1),
              Buffer.alloc(32), u16(0x0018), u16(0xffff), box('avcC', avcC))),
            full('stts', 0, 0, u32(1), u32(n), u32(delta)),
            full('stss', 0, 0, u32(samples.filter((s) => s.key).length), ...samples.map((s, i) => (s.key ? u32(i + 1) : null)).filter(Boolean)),
            full('stsc', 0, 0, u32(1), u32(1), u32(n), u32(1)),
            full('stsz', 0, 0, u32(0), u32(n), ...samples.map((s) => u32(s.data.length))),
            full('stco', 0, 0, u32(1), u32(vOff)))))),
    ...(audio ? [box('trak',
      tkhd(2, Math.round((aDur / audio.sampleRate) * 1000), true),
      box('mdia',
        full('mdhd', 0, 0, u32(0), u32(0), u32(audio.sampleRate), u32(aDur), u16(0x55c4), u16(0)),
        full('hdlr', 0, 0, u32(0), str('soun'), Buffer.alloc(12), str('SoundHandler\0')),
        box('minf',
          full('smhd', 0, 0, u16(0), u16(0)),
          box('dinf', full('dref', 0, 0, u32(1), full('url ', 0, 1))),
          box('stbl',
            full('stsd', 0, 0, u32(1), box('mp4a',
              Buffer.alloc(6), u16(1), Buffer.alloc(8), u16(audio.channels), u16(16), u16(0), u16(0), u32(audio.sampleRate << 16),
              full('esds', 0, 0, desc(0x03, u16(2), u8(0),
                desc(0x04, u8(0x40), u8(0x15), Buffer.from([0, 0x18, 0]), u32(192000), u32(128000), desc(0x05, audio.asc)),
                desc(0x06, u8(2)))))),
            full('stts', 0, 0, u32(1), u32(audio.samples.length), u32(1024)),
            full('stsc', 0, 0, u32(1), u32(1), u32(audio.samples.length), u32(1)),
            full('stsz', 0, 0, u32(0), u32(audio.samples.length), ...audio.samples.map((b) => u32(b.length))),
            full('stco', 0, 0, u32(1), u32(aOff))))))] : []));
  const ftyp = box('ftyp', str('isom'), u32(512), str('isomiso2avc1mp41'));
  const size = ftyp.length + moov(0, 0).length; // moov first (fast start); its size does not depend on the offsets
  const vOff = size + 8, aOff = vOff + vData.length;
  return Buffer.concat([ftyp, moov(vOff, aOff), u32(8 + vData.length + aData.length), str('mdat'), vData, aData]);
}

// ---------------------------------------------------------------- render + encode in Chrome
async function main() {
  const only = process.argv[2] || '';
  fs.mkdirSync(OUT, { recursive: true });
  // WebCodecs needs a secure context: a local file page counts, about:blank does not.
  const blank = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'tiktok-videos-')), 'blank.html');
  fs.writeFileSync(blank, '<!doctype html><title>encode</title>');
  const browser = await chromium.launch({ channel: 'chrome', args: ['--disable-gpu'] });
  const page = await browser.newPage();
  await page.goto('file://' + blank);
  const written = [];
  for (const job of JOBS) {
    const name = job.name;
    if (only && !name.includes(only)) continue;
    W = job.w; H = job.h;
    const jpg = fs.readFileSync(job.src).toString('base64');
    const out = await page.evaluate(async ({ jpg, W, H, FPS, SECONDS, ZOOM, BITRATE }) => {
      const img = new Image(); img.src = 'data:image/jpeg;base64,' + jpg; await img.decode();
      const c = new OffscreenCanvas(W, H), g = c.getContext('2d');
      const chunks = []; let desc = null, fail = null;
      const enc = new VideoEncoder({
        output: (chunk, meta) => {
          if (meta && meta.decoderConfig && meta.decoderConfig.description) desc = new Uint8Array(meta.decoderConfig.description);
          const b = new Uint8Array(chunk.byteLength); chunk.copyTo(b);
          chunks.push({ key: chunk.type === 'key', ts: chunk.timestamp, data: b });
        },
        error: (e) => { fail = String(e); }
      });
      enc.configure({ codec: W * H > 1080 * 1920 ? 'avc1.42E032' : 'avc1.42E028', width: W, height: H, bitrate: BITRATE, framerate: FPS, hardwareAcceleration: 'prefer-software', latencyMode: 'quality', avc: { format: 'avc' } });
      const n = FPS * SECONDS, ease = (t) => 0.5 - 0.5 * Math.cos(Math.PI * t);
      for (let i = 0; i < n; i++) {
        const s = 1 + ZOOM * ease(i / (n - 1)), dw = W * s, dh = H * s;
        g.drawImage(img, (W - dw) / 2, (H - dh) * 0.42, dw, dh); // pushes in slightly above centre, toward the headline
        const frame = new VideoFrame(c, { timestamp: Math.round((i * 1e6) / FPS), duration: Math.round(1e6 / FPS) });
        enc.encode(frame, { keyFrame: i % (FPS * 2) === 0 });
        frame.close();
        if (enc.encodeQueueSize > 8) await new Promise((r) => setTimeout(r, 5));
      }
      await enc.flush(); enc.close();
      if (fail) throw new Error(fail);
      const b64 = (u) => { let s = ''; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); return btoa(s); };
      chunks.sort((a, b) => a.ts - b.ts);
      return { avcC: b64(desc), samples: chunks.map((x) => ({ key: x.key, data: b64(x.data) })) };
    }, { jpg, W, H, FPS, SECONDS, ZOOM, BITRATE });
    const samples = out.samples.map((s) => ({ key: s.key, data: Buffer.from(s.data, 'base64') }));
    const file = path.join(OUT, `${name}_8s.mp4`);
    fs.writeFileSync(file, mp4(samples, Buffer.from(out.avcC, 'base64'), null, { width: W, height: H }));
    written.push(file);
    console.log('wrote', path.relative(ROOT, file), `${samples.length} frames`, `${(fs.statSync(file).size / 1e6).toFixed(1)} MB`);
  }
  await browser.close();
  return written;
}

if (require.main === module) main();
module.exports = { main, mp4 };
