// Standard Enterprise Governance (SEG) Reels: the soundtrack, synthesised in code. No sample, loop or
// recording is used, so there is nothing to license: every sound below is generated from sine waves and
// white noise by this file. Output: 48 kHz stereo 32-bit float WAV; loudness is normalised later by
// ffmpeg (loudnorm, -16 LUFS integrated, -1.5 dBTP) when the MP4 is muxed.
//
//   bed      calm ambient pad: Am(add9) → Fmaj7 → C(add9) → G6, detuned sines through a soft low-pass,
//            slow swells, a quiet shimmer an octave up
//   whoosh   band-passed noise sweeping 250 Hz → 3.2 kHz, panned in the reading direction (RTL: right to left)
//   tick     soft two-partial ping (1.76 + 3.52 kHz) with a 90 ms decay, for each revealed finding
//   impact   sub drop 92 → 44 Hz with a low-passed noise thump, on the key number
//   resolve  A major add9 bell chord with a 3 s decay, on the call to action
// The bed is ducked under the effects (up to -6 dB, 0.45 s release) so they stay clear.
const fs = require('fs');

const SR = 48000;
const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);

function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1; }

// One-pole low-pass, state per channel.
function lp(alpha) { let y = 0; return (x) => (y += alpha * (x - y)); }
// Biquad band-pass (RBJ), with a centre that can change per sample.
function bandpass() {
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  return (x, f, q) => {
    const w = (2 * Math.PI * f) / SR, a = Math.sin(w) / (2 * q), c = Math.cos(w);
    const b0 = a, b2 = -a, a0 = 1 + a, a1 = -2 * c, a2 = 1 - a;
    const y = (b0 * x + b2 * x2 - a1 * y1 - a2 * y2) / a0;
    x2 = x1; x1 = x; y2 = y1; y1 = y; return y;
  };
}

function synth({ total, cues, rtl = true, seed = 7 }) {
  const n = Math.ceil(total * SR), L = new Float32Array(n), R = new Float32Array(n);
  const noise = rng(seed);

  // ---- music bed
  const chords = [[57, 64, 67, 71], [53, 60, 64, 69], [48, 55, 62, 64], [55, 62, 64, 71]]; // Am(add9) Fmaj7 C(add9) G6
  const seg = total / chords.length, lpl = lp(0.06), lpr = lp(0.06);
  for (let i = 0; i < n; i++) {
    const t = i / SR; let l = 0, r = 0;
    for (let c = 0; c < chords.length; c++) {
      const c0 = c * seg - 1.2, c1 = (c + 1) * seg + 1.2; // overlap for a smooth crossfade
      if (t < c0 || t > c1) continue;
      const env = Math.min(1, (t - c0) / 1.8, (c1 - t) / 1.8) ** 2;
      for (const m of chords[c]) {
        const f = midi(m - 12);
        l += env * (Math.sin(2 * Math.PI * f * 0.997 * t) + 0.35 * Math.sin(2 * Math.PI * f * 2.003 * t));
        r += env * (Math.sin(2 * Math.PI * f * 1.003 * t) + 0.35 * Math.sin(2 * Math.PI * f * 1.997 * t));
      }
      const sh = midi(chords[c][3] + 12); // shimmer
      const tw = 0.5 + 0.5 * Math.sin(2 * Math.PI * 0.25 * t);
      l += 0.12 * env * tw * Math.sin(2 * Math.PI * sh * t); r += 0.12 * env * (1 - tw) * Math.sin(2 * Math.PI * sh * t);
    }
    const swell = 0.75 + 0.25 * Math.sin(2 * Math.PI * (t / 8));
    const fade = Math.min(1, t / 1.5, (total - t) / 2.0);
    L[i] = lpl(l) * 0.055 * swell * fade; R[i] = lpr(r) * 0.055 * swell * fade;
  }

  // ---- ducking envelope from the cue times
  const duck = new Float32Array(n).fill(1);
  for (const c of cues) {
    const s = Math.floor(c.t * SR), depth = c.type === 'tick' ? 0.25 : 0.5;
    for (let i = Math.max(0, s - 2400); i < Math.min(n, s + SR * 0.9); i++) {
      const dt = (i - s) / SR, g = dt < 0 ? 1 - depth * (1 + dt / 0.05) : 1 - depth * Math.exp(-dt / 0.45);
      duck[i] = Math.min(duck[i], Math.max(0, Math.min(1, g)));
    }
  }
  for (let i = 0; i < n; i++) { L[i] *= duck[i]; R[i] *= duck[i]; }

  // ---- effects
  const add = (i, l, r) => { if (i >= 0 && i < n) { L[i] += l; R[i] += r; } };
  for (const c of cues) {
    const s = Math.floor(c.t * SR);
    if (c.type === 'whoosh') {
      const d = 0.75, len = Math.floor(d * SR), bp = bandpass(), bp2 = bandpass();
      for (let k = 0; k < len; k++) {
        const x = k / len, f = 250 * Math.pow(3200 / 250, x), env = Math.sin(Math.PI * Math.min(1, x * 1.15)) ** 2;
        const v = 0.5 * bp(noise(), f, 1.4) + 0.25 * bp2(noise(), f * 1.5, 2.2);
        const pan = rtl ? 1 - x : x; // RTL: right to left
        add(s + k, v * env * 0.32 * (1 - pan * 0.8), v * env * 0.32 * (0.2 + pan * 0.8));
      }
    } else if (c.type === 'tick') {
      const len = Math.floor(0.25 * SR);
      for (let k = 0; k < len; k++) {
        const t = k / SR, e = Math.exp(-t / 0.09), click = k < 60 ? noise() * (1 - k / 60) * 0.15 : 0;
        const v = (Math.sin(2 * Math.PI * 1760 * t) * 0.6 + Math.sin(2 * Math.PI * 3520 * t) * 0.25) * e * 0.16 + click * 0.3;
        add(s + k, v, v);
      }
    } else if (c.type === 'impact') {
      const len = Math.floor(1.2 * SR), lpn = lp(0.02);
      let ph = 0;
      for (let k = 0; k < len; k++) {
        const t = k / SR, f = 44 + 48 * Math.exp(-t / 0.08); ph += (2 * Math.PI * f) / SR;
        const v = Math.sin(ph) * Math.exp(-t / 0.42) * 0.5 + lpn(noise()) * Math.exp(-t / 0.06) * 1.6;
        add(s + k, v * 0.55, v * 0.55);
      }
    } else if (c.type === 'resolve') {
      const notes = [57, 61, 64, 71, 69 + 12], len = Math.floor(3.2 * SR);
      for (let k = 0; k < len; k++) {
        const t = k / SR, a = Math.min(1, t / 0.02) * Math.exp(-t / 1.1);
        let l = 0, r = 0;
        notes.forEach((m, j) => { const f = midi(m); const st = 0.04 * j; if (t < st) return;
          const v = Math.sin(2 * Math.PI * f * (t - st)) + 0.3 * Math.sin(2 * Math.PI * f * 3 * (t - st)) * Math.exp(-(t - st) / 0.3);
          l += v * (j % 2 ? 0.7 : 1); r += v * (j % 2 ? 1 : 0.7); });
        add(s + k, l * a * 0.05, r * a * 0.05);
      }
    }
  }
  // soft safety limiter (loudness is set by ffmpeg loudnorm afterwards)
  for (let i = 0; i < n; i++) { L[i] = Math.tanh(L[i] * 1.2) / 1.2; R[i] = Math.tanh(R[i] * 1.2) / 1.2; }
  return { L, R };
}

function writeWav(file, { L, R }) {
  const n = L.length, data = Buffer.alloc(n * 8);
  for (let i = 0; i < n; i++) { data.writeFloatLE(L[i], i * 8); data.writeFloatLE(R[i], i * 8 + 4); }
  const h = Buffer.alloc(44);
  h.write('RIFF', 0); h.writeUInt32LE(36 + data.length, 4); h.write('WAVE', 8); h.write('fmt ', 12);
  h.writeUInt32LE(16, 16); h.writeUInt16LE(3, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(SR, 24);
  h.writeUInt32LE(SR * 8, 28); h.writeUInt16LE(8, 32); h.writeUInt16LE(32, 34); h.write('data', 36); h.writeUInt32LE(data.length, 40);
  fs.writeFileSync(file, Buffer.concat([h, data]));
}

module.exports = { synth, writeWav, SR };
