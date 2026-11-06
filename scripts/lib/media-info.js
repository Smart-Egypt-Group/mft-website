// Read media facts straight from file headers (no dependencies). Used by design-qa.js and daily-packs.js.
//   imageSize(file) → [w, h] | null         PNG, JPEG, WebP (VP8 / VP8L / VP8X)
//   mp4Info(file)   → { w, h, sec, audio }  MP4 / MOV: the video track's display size, the movie
//                                           duration in seconds, and whether a sound track exists
const fs = require('fs');

function imageSize(file) {
  const b = fs.readFileSync(file);
  if (b.slice(1, 4).toString() === 'PNG') return [b.readUInt32BE(16), b.readUInt32BE(20)];
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i < b.length) { if (b[i] !== 0xff) { i++; continue; } const m = b[i + 1], len = b.readUInt16BE(i + 2); if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)]; i += 2 + len; }
  }
  if (b.slice(0, 4).toString() === 'RIFF') {
    const t = b.slice(12, 16).toString();
    if (t === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
    if (t === 'VP8L') { const v = b.readUInt32LE(21); return [(v & 0x3fff) + 1, ((v >> 14) & 0x3fff) + 1]; }
    if (t === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
  }
  return null;
}

// ISO-BMFF boxes: walk [start, end) and call cb(type, payloadStart, boxEnd)
function boxes(b, start, end, cb) {
  let i = start;
  while (i + 8 <= end) {
    let size = b.readUInt32BE(i), hdr = 8;
    const type = b.toString('latin1', i + 4, i + 8);
    if (size === 1) { size = Number(b.readBigUInt64BE(i + 8)); hdr = 16; } else if (size === 0) size = end - i;
    if (size < hdr) break;
    cb(type, i + hdr, Math.min(i + size, end));
    i += size;
  }
}

function mp4Info(file) {
  const b = fs.readFileSync(file);
  let ts = 0, dur = 0;
  const tracks = [];
  boxes(b, 0, b.length, (t, s, e) => {
    if (t !== 'moov') return;
    boxes(b, s, e, (t2, s2, e2) => {
      if (t2 === 'mvhd') {
        if (b[s2] === 1) { ts = b.readUInt32BE(s2 + 20); dur = Number(b.readBigUInt64BE(s2 + 24)); } else { ts = b.readUInt32BE(s2 + 12); dur = b.readUInt32BE(s2 + 16); }
      }
      if (t2 === 'trak') {
        const tr = {};
        boxes(b, s2, e2, (t3, s3, e3) => {
          if (t3 === 'tkhd') { tr.w = Math.round(b.readUInt32BE(e3 - 8) / 65536); tr.h = Math.round(b.readUInt32BE(e3 - 4) / 65536); }
          if (t3 === 'mdia') boxes(b, s3, e3, (t4, s4) => { if (t4 === 'hdlr') tr.type = b.toString('latin1', s4 + 8, s4 + 12); });
        });
        tracks.push(tr);
      }
    });
  });
  const v = tracks.find((t) => t.type === 'vide');
  if (!v || !ts) return null;
  return { w: v.w, h: v.h, sec: dur / ts, audio: tracks.some((t) => t.type === 'soun') };
}

module.exports = { imageSize, mp4Info };
