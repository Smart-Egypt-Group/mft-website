#!/usr/bin/env node
// Renders the article artwork for the AI series into src/assets/img/blog/:
//   <slug>-1600.webp, <slug>-800.webp, <slug>-1600.jpg (hero, 16:9) and <slug>-og.jpg (1200×630).
// Vector compositions in the brand system (navy field, white line work, cyan highlights, one gold
// accent, MFT mark only). No words in the artwork, so one image serves the AR and EN pages.
// Needs Playwright + Google Chrome:  PLAYWRIGHT_PATH=<path to playwright> node scripts/article-images.js [slug…]
const fs = require('fs');
const path = require('path');

let chromium;
try { ({ chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright')); }
catch { console.error('playwright not found. npm i -D playwright, or set PLAYWRIGHT_PATH.'); process.exit(1); }

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'src/assets/img/blog');
const MARK = 'data:image/png;base64,' + fs.readFileSync(path.join(ROOT, 'src/assets/logo/mft-mark-white.png')).toString('base64');

// Brand tokens (src/styles/main.css)
const NAVY = '#0D1B3E', CYAN = '#1BB7CD', GOLD = '#C9A227', W = '#FFFFFF';
const W1 = 'rgba(255,255,255,.12)', W2 = 'rgba(255,255,255,.28)', W3 = 'rgba(255,255,255,.55)', W4 = 'rgba(255,255,255,.85)';
const CYAN2 = 'rgba(27,183,205,.35)';

// Deterministic pseudo-random numbers so a re-render gives the same picture.
function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

const rect = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r ?? 6}" fill="${o.fill || 'none'}" stroke="${o.stroke || 'none'}" stroke-width="${o.sw || 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`;
const circle = (cx, cy, r, o = {}) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${o.fill || 'none'}" stroke="${o.stroke || 'none'}" stroke-width="${o.sw || 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`;
const line = (x1, y1, x2, y2, o = {}) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.stroke || W2}" stroke-width="${o.sw || 2}" stroke-linecap="round"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`;
const pathD = (d, o = {}) => `<path d="${d}" fill="${o.fill || 'none'}" stroke="${o.stroke || W2}" stroke-width="${o.sw || 2}" stroke-linecap="round" stroke-linejoin="round"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`;
const check = (cx, cy, s, color = NAVY, sw = 4) => pathD(`M${cx - s} ${cy} L${cx - s / 3} ${cy + s * 0.7} L${cx + s} ${cy - s * 0.6}`, { stroke: color, sw });
// A card with ledger rows: the recurring "document" glyph of the set.
function card(x, y, w, h, rows, o = {}) {
  let s = rect(x, y, w, h, { fill: o.fill || 'rgba(255,255,255,.04)', stroke: o.stroke || W2, r: 10 });
  const gap = (h - 48) / rows;
  for (let i = 0; i < rows; i++) {
    const yy = y + 30 + i * gap;
    s += line(x + 24, yy, x + 24 + (w - 48) * (o.lens ? o.lens[i % o.lens.length] : 0.62), yy, { stroke: o.row || W2, sw: 4 });
    if (o.amounts !== false) s += line(x + w - 24 - (w - 48) * 0.18, yy, x + w - 24, yy, { stroke: o.row || W2, sw: 4 });
  }
  return s;
}

// ---- Motifs (viewBox 1600×900; keep the subject inside x 220..1380, y 170..730 so the OG crop holds) ----
const MOTIFS = {
  // 01 Hub: the three pillars as clusters around one ledger core.
  'ai-in-accounting-guide-2026': () => {
    const C = [800, 450];
    let s = '';
    [[570, 340], [1088, 318], [800, 628]].forEach(([x, y]) => { s += line(C[0], C[1], x, y, { stroke: W2, sw: 2, dash: '2 10' }); });
    // accounting cluster: ledger card
    s += card(370, 220, 200, 160, 4, { lens: [0.5, 0.7, 0.4, 0.6] });
    // audit cluster: magnifier over dots
    for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) s += circle(1060 + i * 34, 245 + j * 34, 5, { fill: W2 });
    s += circle(1150, 300, 62, { stroke: CYAN, sw: 5 }) + line(1194, 344, 1236, 386, { stroke: CYAN, sw: 8 });
    s += circle(1128, 279, 7, { fill: GOLD });
    // Odoo cluster: modular tiles
    for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) s += rect(710 + i * 64, 640 + j * 64, 52, 52, { stroke: W3, r: 10, fill: i === 1 && j === 0 ? CYAN2 : 'none' });
    // core
    s += circle(C[0], C[1], 92, { stroke: W1, sw: 2 }) + circle(C[0], C[1], 64, { fill: CYAN }) ;
    s += line(C[0] - 30, C[1] - 16, C[0] + 30, C[1] - 16, { stroke: NAVY, sw: 6 }) + line(C[0] - 30, C[1], C[0] + 18, C[1], { stroke: NAVY, sw: 6 }) + line(C[0] - 30, C[1] + 16, C[0] + 26, C[1] + 16, { stroke: NAVY, sw: 6 });
    return { pillar: 0, svg: s };
  },

  // 02 Journal entries and bank reconciliation: statement lines matched to ledger lines; one open item.
  'ai-journal-entries-bank-reconciliation': () => {
    let s = card(300, 200, 360, 500, 0) + card(940, 200, 360, 500, 0);
    const rows = 7, y0 = 250, gap = 64;
    const map = [1, 0, 2, 4, 3, 6, null];
    for (let i = 0; i < rows; i++) {
      const y = y0 + i * gap;
      const open = map[i] === null;
      s += line(330, y, 330 + [170, 200, 140, 190, 180, 150, 200][i], y, { stroke: open ? GOLD : W3, sw: 6 });
      s += line(560, y, 630, y, { stroke: open ? GOLD : W3, sw: 6 });
      s += line(970, y, 970 + [190, 160, 200, 140, 190, 170, 130][i], y, { stroke: W3, sw: 6 });
      s += line(1200, y, 1270, y, { stroke: W3, sw: 6 });
      if (!open) {
        const y2 = y0 + map[i] * gap;
        s += pathD(`M660 ${y} C 790 ${y}, 810 ${y2}, 940 ${y2}`, { stroke: CYAN, sw: 3 });
        s += circle(660, y, 6, { fill: CYAN }) + circle(940, y2, 6, { fill: CYAN });
      }
    }
    s += rect(312, y0 + 6 * gap - 22, 336, 44, { stroke: GOLD, sw: 2, dash: '6 8', r: 8 });
    s += circle(800, 760, 26, { fill: CYAN }) + check(800, 760, 11);
    return { pillar: 0, svg: s };
  },

  // 03 Fraud detection: a population of transactions, outliers ringed, inside a shield.
  'ai-financial-fraud-detection': () => {
    const r = rng(3);
    let s = pathD('M1080 190 L1290 250 L1290 470 C1290 600 1190 680 1080 720 C970 680 870 600 870 470 L870 250 Z', { stroke: CYAN, sw: 4, fill: 'rgba(27,183,205,.06)' });
    for (let i = 0; i < 170; i++) {
      const x = 290 + r() * 580, y = 300 + (r() + r() + r()) / 3 * 360;
      s += circle(x.toFixed(1), y.toFixed(1), 4 + r() * 3, { fill: r() < 0.15 ? W3 : W2 });
    }
    const outs = [[1010, 380], [1150, 520], [1060, 600]];
    outs.forEach(([x, y], i) => { s += circle(x, y, 9, { fill: i === 0 ? GOLD : W4 }) + circle(x, y, 26, { stroke: i === 0 ? GOLD : W3, sw: 3 }); });
    s += line(260, 690, 920, 690, { stroke: W1, sw: 2 }) + line(260, 690, 260, 260, { stroke: W1, sw: 2 });
    return { pillar: 0, svg: s };
  },

  // 04 Month-end close: a month of days closing into one reviewed report.
  'ai-month-end-close-financial-reporting': () => {
    let s = '';
    const x0 = 250, y0 = 230, c = 66;
    for (let w = 0; w < 5; w++) for (let d = 0; d < 7; d++) {
      const i = w * 7 + d, x = x0 + d * c, y = y0 + w * c;
      if (i > 30) continue;
      const done = i < 24;
      s += rect(x, y, 54, 54, { r: 8, fill: done ? CYAN2 : 'none', stroke: done ? CYAN : W2, sw: 2 });
      if (done && i % 3 === 0) s += check(x + 27, y + 26, 10, W4, 3);
    }
    s += rect(x0 + 2 * c, y0 + 4 * c, 54, 54, { r: 8, stroke: GOLD, sw: 3 });
    s += pathD('M760 450 C 830 450, 840 450, 900 450', { stroke: W3, sw: 3 }) + pathD('M884 438 L902 450 L884 462', { stroke: W3, sw: 3 });
    // report with bars
    s += rect(950, 210, 380, 480, { r: 12, fill: 'rgba(255,255,255,.05)', stroke: W3 });
    const bars = [120, 170, 140, 210, 190];
    bars.forEach((h, i) => { s += rect(1000 + i * 60, 600 - h, 36, h, { r: 4, fill: i === 3 ? CYAN : W2 }); });
    s += line(990, 600, 1290, 600, { stroke: W3 });
    s += line(1000, 260, 1180, 260, { stroke: W4, sw: 6 }) + line(1000, 292, 1120, 292, { stroke: W2, sw: 5 });
    s += line(1000, 650, 1120, 650, { stroke: GOLD, sw: 5 });
    return { pillar: 0, svg: s };
  },

  // 05 Continuous vs traditional: one annual point against a continuous monitored signal.
  'continuous-auditing-ai-vs-traditional-audit': () => {
    let s = '';
    // traditional
    s += line(240, 310, 1360, 310, { stroke: W2, sw: 3 });
    for (let m = 0; m <= 12; m++) s += line(240 + m * 93.3, 300, 240 + m * 93.3, 320, { stroke: W1, sw: 2 });
    s += circle(1360, 310, 14, { fill: W4 }) + circle(1360, 310, 30, { stroke: W2, sw: 2 });
    // continuous
    let d = 'M240 560';
    const r = rng(5);
    for (let x = 240; x <= 1360; x += 14) d += ` L${x} ${(560 + Math.sin(x / 38) * 26 + (r() - 0.5) * 22).toFixed(1)}`;
    s += pathD(d, { stroke: CYAN, sw: 4 });
    for (let x = 300; x <= 1340; x += 80) s += circle(x, 650, 6, { fill: CYAN2 }) + line(x, 610, x, 638, { stroke: CYAN2, sw: 2 });
    s += circle(820, 470, 12, { fill: GOLD }) + line(820, 482, 820, 540, { stroke: GOLD, sw: 3, dash: '4 6' });
    s += line(240, 430, 1360, 430, { stroke: W1, sw: 2, dash: '2 12' });
    return { pillar: 1, svg: s };
  },

  // 06 Sampling to full population: every dot read by the scan, one exception found.
  'full-population-testing-ai-vs-sampling': () => {
    let s = '';
    const cols = 30, rows = 13, x0 = 250, y0 = 220, g = 38;
    const scan = 20;
    const r = rng(6);
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      const x = x0 + i * g, y = y0 + j * g;
      const read = i < scan;
      const sampled = !read && r() < 0.06;
      s += circle(x, y, read ? 6 : 5, { fill: read ? CYAN2 : sampled ? W4 : W1 });
      if (sampled) s += circle(x, y, 13, { stroke: W3, sw: 2 });
    }
    s += rect(x0 + scan * g - 80, y0 - 30, 60, rows * g + 22, { r: 4, fill: 'rgba(27,183,205,.10)' });
    s += rect(x0 + scan * g - 24, y0 - 34, 6, rows * g + 30, { r: 3, fill: CYAN });
    const ex = [x0 + 12 * g, y0 + 7 * g];
    s += circle(ex[0], ex[1], 9, { fill: GOLD }) + circle(ex[0], ex[1], 24, { stroke: GOLD, sw: 3 });
    return { pillar: 1, svg: s };
  },

  // 07 Segregation of duties: a role-by-permission matrix with one conflict, and two keys kept apart.
  'ai-segregation-of-duties-internal-controls': () => {
    let s = '';
    const x0 = 260, y0 = 220, c = 76, n = 6;
    const r = rng(7);
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const conflict = i === 4 && j === 2;
      const on = conflict || r() < 0.38;
      s += rect(x0 + i * c, y0 + j * c, 60, 60, { r: 8, fill: conflict ? NAVY : on ? CYAN2 : 'none', stroke: conflict ? GOLD : on ? CYAN : W1, sw: conflict ? 3 : 2 });
    }
    s += circle(x0 + 4 * c + 30, y0 + 2 * c + 30, 10, { fill: GOLD }) + circle(x0 + 4 * c + 30, y0 + 2 * c + 30, 46, { stroke: GOLD, sw: 3 });
    const key = (x, y, col) => circle(x, y, 40, { stroke: col, sw: 6 }) + circle(x, y, 14, { stroke: col, sw: 4 }) + line(x + 40, y, x + 220, y, { stroke: col, sw: 8 }) + line(x + 180, y, x + 180, y + 40, { stroke: col, sw: 8 }) + line(x + 214, y, x + 214, y + 30, { stroke: col, sw: 8 });
    s += key(1000, 330, CYAN) + key(1000, 590, W3);
    s += line(980, 460, 1280, 460, { stroke: W2, sw: 2, dash: '8 10' });
    return { pillar: 1, svg: s };
  },

  // 08 Audit trail and zero hallucination: records chained to a finding; the unsupported claim is struck.
  'ai-audit-trail-zero-hallucination': () => {
    let s = '';
    const xs = [240, 440, 640];
    xs.forEach((x, i) => {
      s += card(x, 250, 150, 190, 3, { lens: [0.7, 0.5, 0.6], amounts: false });
      s += circle(x + 75, 476, 10, { fill: CYAN });
      if (i < xs.length - 1) s += rect(x + 140, 330, 70, 28, { r: 14, stroke: CYAN, sw: 4 });
    });
    s += pathD('M790 345 C 860 345, 880 330, 950 330', { stroke: CYAN, sw: 4 });
    // supported finding
    s += rect(960, 230, 380, 210, { r: 12, fill: 'rgba(27,183,205,.10)', stroke: CYAN, sw: 3 });
    s += line(1000, 290, 1220, 290, { stroke: W4, sw: 7 }) + line(1000, 330, 1160, 330, { stroke: W3, sw: 5 }) + line(1000, 366, 1200, 366, { stroke: W3, sw: 5 });
    s += circle(1290, 290, 26, { fill: GOLD }) + check(1290, 290, 11);
    // unsupported claim, rejected
    s += rect(960, 500, 380, 170, { r: 12, stroke: W1, sw: 2, dash: '8 8' });
    s += line(1000, 560, 1220, 560, { stroke: W1, sw: 7 }) + line(1000, 600, 1160, 600, { stroke: W1, sw: 5 });
    s += line(980, 640, 1320, 520, { stroke: W3, sw: 4 });
    return { pillar: 1, svg: s };
  },

  // 09 Odoo 20 AI features: a modular app grid where some modules gain an AI layer, paid in credits.
  'odoo-20-ai-features-accounting': () => {
    let s = '';
    const x0 = 270, y0 = 210, c = 132, ai = new Set(['1,0', '2,1', '0,2', '3,2']);
    for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) {
      const x = x0 + i * c, y = y0 + j * c, on = ai.has(`${i},${j}`);
      s += rect(x, y, 108, 108, { r: 18, fill: on ? CYAN2 : 'rgba(255,255,255,.03)', stroke: on ? CYAN : W2, sw: 2 });
      if (on) {
        const cx = x + 54, cy = y + 54;
        s += pathD(`M${cx} ${cy - 26} L${cx + 7} ${cy - 7} L${cx + 26} ${cy} L${cx + 7} ${cy + 7} L${cx} ${cy + 26} L${cx - 7} ${cy + 7} L${cx - 26} ${cy} L${cx - 7} ${cy - 7} Z`, { fill: W, stroke: 'none' });
      } else s += line(x + 28, y + 54, x + 80, y + 54, { stroke: W2, sw: 5 });
    }
    // credits: a coin stack
    [0, 1, 2, 3].forEach((k) => {
      const cy = 560 - k * 22, col = k === 3 ? GOLD : 'rgba(201,162,39,.6)';
      s += pathD(`M1014 ${cy} L1014 ${cy + 22} A 96 30 0 0 0 1206 ${cy + 22} L1206 ${cy}`, { stroke: col, sw: 4, fill: NAVY });
      s += `<ellipse cx="1110" cy="${cy}" rx="96" ry="30" fill="${NAVY}" stroke="${col}" stroke-width="4"/>`;
    });
    s += `<ellipse cx="1110" cy="494" rx="56" ry="16" fill="none" stroke="rgba(201,162,39,.45)" stroke-width="3"/>`;
    s += pathD('M820 400 C 900 400, 930 470, 1010 470', { stroke: W2, sw: 3, dash: '3 10' });
    return { pillar: 2, svg: s };
  },

  // 10 Connecting AI to Odoo: ERP database and an AI node joined by one governed, one-way channel.
  'connect-ai-to-odoo-continuous-audit': () => {
    let s = '';
    // database
    const cyl = (x, y, w, h) => `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="34" fill="none" stroke="${W3}" stroke-width="3"/>` + pathD(`M${x - w} ${y} L${x - w} ${y + h} A ${w} 34 0 0 0 ${x + w} ${y + h} L${x + w} ${y}`, { stroke: W3, sw: 3 }) + pathD(`M${x - w} ${y + h / 2} A ${w} 34 0 0 0 ${x + w} ${y + h / 2}`, { stroke: W2, sw: 2 });
    s += cyl(400, 330, 130, 260);
    // AI node: hexagon with inner graph
    const hx = 1200, hy = 460, R = 140;
    let hp = '';
    for (let k = 0; k < 6; k++) { const a = Math.PI / 3 * k + Math.PI / 6; hp += `${k ? 'L' : 'M'}${(hx + R * Math.cos(a)).toFixed(1)} ${(hy + R * Math.sin(a)).toFixed(1)} `; }
    s += pathD(hp + 'Z', { stroke: CYAN, sw: 4, fill: 'rgba(27,183,205,.08)' });
    const nodes = [[hx, hy - 60], [hx - 55, hy + 30], [hx + 55, hy + 30], [hx, hy]];
    nodes.slice(0, 3).forEach(([x, y]) => { s += line(hx, hy, x, y, { stroke: CYAN, sw: 3 }); });
    nodes.forEach(([x, y], i) => { s += circle(x, y, i === 3 ? 16 : 11, { fill: i === 3 ? CYAN : W4 }); });
    // channel
    s += line(540, 460, 1050, 460, { stroke: W2, sw: 3 });
    for (let x = 580; x < 720; x += 40) s += circle(x, 460, 6, { fill: CYAN });
    for (let x = 900; x < 1040; x += 40) s += circle(x, 460, 6, { fill: CYAN });
    s += pathD('M1030 446 L1050 460 L1030 474', { stroke: CYAN, sw: 3 });
    // shield + lock at the gate
    s += pathD('M800 360 L880 384 L880 466 C880 516 842 546 800 562 C758 546 720 516 720 466 L720 384 Z', { stroke: GOLD, sw: 4, fill: NAVY });
    s += rect(776, 452, 48, 40, { r: 6, fill: GOLD }) + pathD('M786 452 L786 434 A 14 14 0 0 1 814 434 L814 452', { stroke: GOLD, sw: 5 });
    return { pillar: 2, svg: s };
  },

  // 11 Purchasing and approvals: an order moving through approval steps; above the threshold, a second approver.
  'odoo-20-purchase-approvals-automation': () => {
    let s = card(230, 330, 190, 240, 4, { lens: [0.6, 0.45, 0.7, 0.5] });
    const steps = [[560, 450], [760, 450], [960, 450]];
    s += line(420, 450, 1180, 450, { stroke: W2, sw: 3 });
    steps.forEach(([x, y]) => { s += circle(x, y, 38, { fill: NAVY, stroke: CYAN, sw: 4 }) + check(x, y, 14, CYAN, 4); });
    // threshold and second approver
    s += line(230, 300, 1370, 300, { stroke: GOLD, sw: 3, dash: '14 10' });
    s += pathD('M960 412 C 960 330, 1040 240, 1150 240', { stroke: CYAN, sw: 3 });
    s += circle(1180, 240, 38, { fill: GOLD }) + check(1180, 240, 14, NAVY, 5);
    // released order
    s += rect(1190, 400, 170, 100, { r: 10, fill: CYAN2, stroke: CYAN, sw: 3 });
    s += line(1214, 434, 1320, 434, { stroke: W4, sw: 6 }) + line(1214, 466, 1290, 466, { stroke: W3, sw: 5 });
    return { pillar: 2, svg: s };
  },

  // 12 Step-by-step rollout: three phases as rising steps, each with a gate, ending in production.
  'odoo-20-ai-accounting-step-by-step': () => {
    let s = '';
    const st = [[260, 640], [620, 500], [980, 360]];
    st.forEach(([x, y], i) => {
      s += rect(x, y, 360, 730 - y, { r: 6, fill: `rgba(255,255,255,${0.04 + i * 0.03})`, stroke: W2, sw: 2 });
      for (let k = 0; k <= i; k++) s += circle(x + 40 + k * 28, y + 40, 8, { fill: CYAN });
      s += rect(x + 300, y - 70, 6, 70, { r: 2, fill: W3 }) + pathD(`M${x + 306} ${y - 70} L${x + 352} ${y - 56} L${x + 306} ${y - 42} Z`, { fill: i === 2 ? GOLD : W3, stroke: 'none' });
    });
    s += pathD('M300 610 L560 610 L600 520 L920 470 L960 380 L1280 330', { stroke: CYAN, sw: 3, dash: '2 12' });
    return { pillar: 2, svg: s };
  }
};

// Shared frame: grid, pillar indicator (accounting / audit / Odoo as three dots), MFT mark.
function frame(motif, w, h) {
  const { pillar, svg } = motif;
  let grid = '';
  for (let x = 0; x <= 1600; x += 40) grid += `<line x1="${x}" y1="0" x2="${x}" y2="900" stroke="rgba(255,255,255,.035)" stroke-width="1"/>`;
  for (let y = 0; y <= 900; y += 40) grid += `<line x1="0" y1="${y}" x2="1600" y2="${y}" stroke="rgba(255,255,255,.035)" stroke-width="1"/>`;
  const dots = [0, 1, 2].map((i) => circle(1404 + i * 34, 100, 9, i === pillar ? { fill: CYAN } : { stroke: W2, sw: 2 })).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
<rect width="1600" height="900" fill="${NAVY}"/>${grid}
<rect x="96" y="96" width="120" height="6" fill="${GOLD}"/>
${dots}
${svg}
<image href="${MARK}" x="96" y="752" width="64" height="64" opacity=".9"/>
</svg>`;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const only = process.argv.slice(2);
  const slugs = Object.keys(MOTIFS).filter((s) => !only.length || only.includes(s));
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage();
  await page.goto('about:blank');
  // Rasterise the SVG on a canvas and encode with Chrome's own WebP / JPEG encoders. No screenshot:
  // headless page capture fails on this machine, and the canvas path needs no native image tooling.
  const render = async (svg, w, h, type, q) => Buffer.from(await page.evaluate(async ({ svg, w, h, type, q }) => {
    const img = new Image(); img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); await img.decode();
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    c.getContext('2d').drawImage(img, 0, 0, w, h);
    return c.toDataURL(type, q).split(',')[1];
  }, { svg, w, h, type, q }), 'base64');
  for (const slug of slugs) {
    const m = MOTIFS[slug]();
    const hero = frame(m, 1600, 900), og = frame(m, 1200, 630);
    fs.writeFileSync(path.join(OUT, `${slug}-1600.webp`), await render(hero, 1600, 900, 'image/webp', 0.86));
    fs.writeFileSync(path.join(OUT, `${slug}-800.webp`), await render(frame(m, 800, 450), 800, 450, 'image/webp', 0.86));
    fs.writeFileSync(path.join(OUT, `${slug}-1600.jpg`), await render(hero, 1600, 900, 'image/jpeg', 0.86));
    fs.writeFileSync(path.join(OUT, `${slug}-og.jpg`), await render(og, 1200, 630, 'image/jpeg', 0.88));
    console.log('wrote', slug);
  }
  await browser.close();
})();
