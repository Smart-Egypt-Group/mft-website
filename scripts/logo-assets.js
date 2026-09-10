#!/usr/bin/env node
// Derives every web logo asset from the official 5906×5906 PNG pack.
// The pack has wide transparent padding around each mark, so each file is
// cropped to its alpha bounding box and scaled to a web-sized cap — the
// pixels themselves come straight from the originals.
//   Light backgrounds → "Dark Blue & Light Blue"   Navy backgrounds → "White & Light Blue"
// Needs Playwright + installed Google Chrome:  PLAYWRIGHT_PATH=<playwright> node scripts/logo-assets.js
const fs = require('fs');
const path = require('path');
let chromium;
try { ({ chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright')); }
catch { console.error('playwright not found. npm i -D playwright, or set PLAYWRIGHT_PATH.'); process.exit(1); }

const PACK = process.env.LOGO_PACK || '/Users/mac/Desktop/ MFT/LOGO Modern Financial Technology/';
const OUT = path.join(__dirname, '..', 'src/assets/logo');
const jobs = [
  // header (rendered 40 px tall → 2000 px wide is 17× oversampled; crisp on any retina display)
  { src: 'Dark Blue & Light Blue/PNG Text on the Side.png', out: 'mft-lockup-navy.png',  maxW: 2000 },
  { src: 'White & Light Blue/PNG Text on the Side.png',     out: 'mft-lockup-white.png', maxW: 2000 },
  { src: 'Dark Blue & Light Blue/PNG.png',                  out: 'mft-stacked-navy.png', maxW: 1200 },
  { src: 'White & Light Blue/PNG.png',                      out: 'mft-stacked-white.png', maxW: 1200 },
  { src: 'Dark Blue & Light Blue/icon.png',                 out: 'mft-mark-navy.png',    maxW: 1024 },
  { src: 'White & Light Blue/icon.png',                     out: 'mft-mark-white.png',   maxW: 1024 },
  // favicon / touch icons: mark centred in a square canvas
  { src: 'Dark Blue & Light Blue/icon.png', out: 'favicon-32.png',  square: 32,  pad: 0.04 },
  { src: 'Dark Blue & Light Blue/icon.png', out: 'favicon-192.png', square: 192, pad: 0.08 },
  { src: 'Dark Blue & Light Blue/icon.png', out: 'favicon-512.png', square: 512, pad: 0.08 },
  { src: 'White & Light Blue/icon.png',     out: 'apple-touch-icon.png', square: 180, pad: 0.16, bg: '#101B3A' }
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch({ channel: 'chrome' });
  const p = await b.newPage();
  await p.goto('about:blank');
  for (const j of jobs) {
    const b64 = fs.readFileSync(path.join(PACK, j.src)).toString('base64');
    const res = await p.evaluate(async ({ b64, j }) => {
      const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
      const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
      const x = c.getContext('2d'); x.drawImage(img, 0, 0);
      const d = x.getImageData(0, 0, c.width, c.height).data;
      let x0 = c.width, y0 = c.height, x1 = -1, y1 = -1;
      for (let y = 0; y < c.height; y++) for (let px = 0; px < c.width; px++) {
        if (d[(y * c.width + px) * 4 + 3] > 8) { if (px < x0) x0 = px; if (px > x1) x1 = px; if (y < y0) y0 = y; if (y > y1) y1 = y; }
      }
      const w = x1 - x0 + 1, h = y1 - y0 + 1;
      const o = document.createElement('canvas');
      const ox = o.getContext('2d');
      if (j.square) {
        o.width = o.height = j.square;
        if (j.bg) { ox.fillStyle = j.bg; ox.fillRect(0, 0, j.square, j.square); }
        const inner = j.square * (1 - 2 * j.pad);
        const s = Math.min(inner / w, inner / h);
        const dw = w * s, dh = h * s;
        ox.imageSmoothingQuality = 'high';
        ox.drawImage(img, x0, y0, w, h, (j.square - dw) / 2, (j.square - dh) / 2, dw, dh);
      } else {
        const s = Math.min(1, j.maxW / w);
        o.width = Math.round(w * s); o.height = Math.round(h * s);
        ox.imageSmoothingQuality = 'high';
        ox.drawImage(img, x0, y0, w, h, 0, 0, o.width, o.height);
      }
      return { data: o.toDataURL('image/png'), w: o.width, h: o.height, srcW: w, srcH: h };
    }, { b64, j });
    fs.writeFileSync(path.join(OUT, j.out), Buffer.from(res.data.split(',')[1], 'base64'));
    console.log(j.out.padEnd(24), `${res.w}×${res.h}`.padEnd(11), `(content ${res.srcW}×${res.srcH} of 5906×5906 — ${j.src})`);
  }
  await b.close();
})();
