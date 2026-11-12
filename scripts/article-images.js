#!/usr/bin/env node
// Renders the article artwork into src/assets/img/blog/:
//   <slug>-1600.webp, <slug>-800.webp, <slug>-1600.jpg (hero, 16:9) and <slug>-og.jpg (1200×630).
// One language-neutral image per article (no words, MFT mark only) serves the AR and EN pages as the
// hero, og:image, twitter:image and Article schema image.
//
// System (CEO, 2026-10-14). Palette: navy #0D1B3E, cyan #1BB7CD, brilliant pure white. No gold.
// Every image shares one golden-ratio frame (φ = 1.618) on the 1600×900 canvas:
//   · split at x = 1600/φ ≈ 989: navy field on the left, pure-white "ledger page" on the right
//   · raw transactions scatter across the navy field and curve into a radiant white orb that sits on
//     the field's golden point (989/φ, 900/φ) ≈ (611, 556); core r 55, cyan ring r 89, outer ring r 144
//   · ordered lines fan out of the orb and cross a cyan seam of light onto the page
//   · the exception always leaves the orb dead straight on the golden line y = 556: brilliant white on
//     navy, glowing cyan on the page, landing on the highlighted element of the article's motif
//   · page grid: golden columns x ≈ 1222 and 1367, margins 89, rhythm 34/55/89; MFT mark on the 1367
//     column at the bottom margin
// The page is flat #FFFFFF at full brightness: no tint, no gradient; the only light on it is cyan,
// where the fan lines and the exception arrive from the orb.
// Each article gets its own topic motif on the page (MOTIFS below), drawn in navy line work with the
// single cyan highlight on y = 556.
//
// Needs Playwright + Google Chrome:  PLAYWRIGHT_PATH=<path to playwright> node scripts/article-images.js [slug…]
const fs = require('fs');
const path = require('path');

let chromium;
try { ({ chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright')); }
catch { console.error('playwright not found. npm i -D playwright, or set PLAYWRIGHT_PATH.'); process.exit(1); }

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'src/assets/img/blog');
const b64 = (f) => fs.readFileSync(path.join(ROOT, f)).toString('base64');
const MARK = 'data:image/png;base64,' + b64('src/assets/logo/mft-mark-navy.png');
const INTER = b64('src/assets/fonts/inter-latin-var.woff2');

const NAVY = '#0D1B3E', CYAN = '#1BB7CD', W = '#FFFFFF';
function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
const hash = (str) => [...str].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

// ---- Golden-ratio grid ----
const PHI = (1 + Math.sqrt(5)) / 2;
const SEAM = Math.round(1600 / PHI);                               // 989
const PAGE = 1600 - SEAM;                                          // 611
const OX = Math.round(SEAM / PHI), H = Math.round(900 / PHI);      // orb (611, 556); H = the exception line
const C1 = SEAM + Math.round(PAGE / PHI / PHI), C2 = SEAM + Math.round(PAGE / PHI); // 1222, 1367
const M = 89, X0 = 1060, X1 = 1600 - M;                            // page content x range 1060..1511
const GRID = { C2, M };

// ---- Page primitives (navy line work on white; cyan only for the highlight) ----
const f = (n) => +n.toFixed(1);
const bar = (x, y, w, o = .88, h = 6) => `<rect x="${f(x)}" y="${f(y - h / 2)}" width="${f(w)}" height="${h}" rx="${h / 2}" fill="${NAVY}" opacity="${o}"/>`;
const cbar = (x, y, w, h = 8) => `<rect x="${f(x)}" y="${f(y - h / 2)}" width="${f(w)}" height="${h}" rx="${h / 2}" fill="${CYAN}"/>`;
const hair = (x1, y1, x2, y2, o = .18, sw = 1.5) => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${NAVY}" stroke-opacity="${o}" stroke-width="${sw}"/>`;
const box = (x, y, w, h, o = {}) => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${o.r ?? 10}" fill="${o.fill || W}"${o.fo != null ? ` fill-opacity="${o.fo}"` : ''} stroke="${o.stroke || NAVY}" stroke-opacity="${o.so ?? .85}" stroke-width="${o.sw || 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`;
const ring = (cx, cy, r, o = {}) => `<circle cx="${f(cx)}" cy="${f(cy)}" r="${r}" fill="${o.fill || 'none'}" stroke="${o.stroke || NAVY}" stroke-opacity="${o.so ?? .85}" stroke-width="${o.sw || 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`;
const dot = (cx, cy, r, c = NAVY, o = .88) => `<circle cx="${f(cx)}" cy="${f(cy)}" r="${r}" fill="${c}" opacity="${o}"/>`;
const pth = (d, o = {}) => `<path d="${d}" fill="${o.fill || 'none'}" stroke="${o.stroke || NAVY}" stroke-opacity="${o.so ?? .85}" stroke-width="${o.sw || 2}" stroke-linecap="round" stroke-linejoin="round"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`;
const tick = (cx, cy, s, c = W, sw = 2.6) => pth(`M${f(cx - s)} ${f(cy)} L${f(cx - s / 3)} ${f(cy + s * .7)} L${f(cx + s)} ${f(cy - s * .6)}`, { stroke: c, so: 1, sw });
const glow = (inner) => `<g filter="url(#glow)">${inner}</g>`;
const tint = (x, y, w, h, r = 8) => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${r}" fill="${CYAN}" opacity=".12"/>`;
const cyanCheck = (cx, cy, r = 17) => glow(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${CYAN}"/>`) + tick(cx, cy, r * .42);
const bang = (cx, cy, r = 17) => glow(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${CYAN}"/>`) + `<rect x="${cx - 2.5}" y="${cy - r * .55}" width="5" height="${r * .62}" rx="2.5" fill="${W}"/><circle cx="${cx}" cy="${cy + r * .38}" r="2.8" fill="${W}"/>`;
const doc = (x, y, w, h, rows, o = {}) => { // a document card with a navy header band and text rows
  let s = box(x, y, w, h, { r: 12 });
  s += `<path d="M${x + 1} ${y + 12} a11 11 0 0 1 11 -11 h${w - 24} a11 11 0 0 1 11 11 v${(o.head || 34) - 12} h-${w - 2} z" fill="${NAVY}"/>`;
  s += `<rect x="${x + 18}" y="${y + (o.head || 34) / 2 - 3}" width="${w * .38}" height="6" rx="3" fill="${W}" opacity=".9"/>`;
  for (let i = 0; i < rows; i++) { const yy = y + (o.head || 34) + 26 + i * (o.gap || 21); s += bar(x + 18, yy, (w - 36) * [.7, .5, .62, .44, .56][i % 5], .55, 5); }
  return s;
};
const qr = (x, y, n, cell, seed) => { // an abstract, unreadable QR-style block
  const r = rng(seed); let s = '';
  const finder = (fx, fy) => `<rect x="${fx}" y="${fy}" width="${cell * 3}" height="${cell * 3}" rx="2" fill="none" stroke="${NAVY}" stroke-width="${cell * .7}"/>`;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const inF = (i < 4 && j < 4) || (i >= n - 4 && j < 4) || (i < 4 && j >= n - 4);
    if (!inF && r() < .46) s += `<rect x="${x + i * cell}" y="${y + j * cell}" width="${cell}" height="${cell}" fill="${NAVY}"/>`;
  }
  return s + finder(x + cell * .35, y + cell * .35) + finder(x + (n - 3.35) * cell, y + cell * .35) + finder(x + cell * .35, y + (n - 3.35) * cell);
};
const sparkle = (cx, cy, s, c) => `<path d="M${cx} ${cy - s} L${cx + s * .26} ${cy - s * .26} L${cx + s} ${cy} L${cx + s * .26} ${cy + s * .26} L${cx} ${cy + s} L${cx - s * .26} ${cy + s * .26} L${cx - s} ${cy} L${cx - s * .26} ${cy - s * .26} Z" fill="${c}"/>`;

// Each motif returns { svg, to, node, rows }: the page drawing, where the cyan exception line ends
// on y = H, whether to cap it with the standard cyan node, and whether the fan rows run across the page.
const MOTIFS = {
  // ---------- AI series ----------
  // AI in accounting (hub): the ordered ledger itself; the exception is one posted line.
  'ai-in-accounting-guide-2026': () => {
    let s = '';
    const ys = [-5, -4, -3, -2, -1, 1, 2, 3].map((k) => H + k * 34);
    ys.forEach((y, i) => { [C1, C2].forEach((cx, j) => { s += bar(cx, y, [55, 34, 89, 55, 34, 89, 55, 89][(i + j * 3) % 8]); }); });
    s += bar(C1, H - 7 * 34, 34, .35) + bar(C2, H - 7 * 34, 34, .35) + hair(C1 - 55, H - 6 * 34 - 17 + 4, X1, H - 6 * 34 - 17 + 4, .3);
    s += hair(C1, H + 4 * 34, X1, H + 4 * 34, .3) + hair(C1, H + 4 * 34 + 6, X1, H + 4 * 34 + 6, .3);
    s += glow(cbar(C1, H, 89) + cbar(C2, H, 55));
    return { svg: s, to: X1, node: true, rows: true };
  },

  // Journal entries and bank reconciliation: a T-account, debit and credit balanced on the posted line.
  'ai-journal-entries-bank-reconciliation': () => {
    const cx = 1290; let s = '';
    s += `<rect x="1100" y="318" width="380" height="5" rx="2.5" fill="${NAVY}"/><rect x="${cx - 2.5}" y="318" width="5" height="380" rx="2.5" fill="${NAVY}"/>`;
    s += bar(1130, 290, 55, .35) + bar(1335, 290, 55, .35);
    [-4, -3, -2, -1, 1, 2, 3].forEach((k, i) => { const y = H + k * 44; s += bar(cx - 34 - [89, 55, 120, 72, 98, 60, 110][i], y, [89, 55, 120, 72, 98, 60, 110][i]); s += bar(cx + 34, y, [72, 110, 60, 98, 55, 120, 89][i]); });
    s += glow(cbar(cx - 34 - 110, H, 110) + cbar(cx + 34, H, 110) + pth(`M${cx - 30} ${H - 14} Q ${cx} ${H - 44} ${cx + 30} ${H - 14}`, { stroke: CYAN, so: 1, sw: 2.5 }));
    s += hair(cx - 160, 690, cx - 34, 690, .5) + hair(cx - 160, 696, cx - 34, 696, .5) + hair(cx + 34, 690, cx + 160, 690, .5) + hair(cx + 34, 696, cx + 160, 696, .5);
    return { svg: s, to: cx - 160, node: false };
  },

  // Fraud detection: a transaction population with its normal range; the AI line lands on the outlier.
  'ai-financial-fraud-detection': () => {
    const r = rng(25); let s = hair(1080, 300, 1080, 700, .4, 2) + hair(1080, 700, 1500, 700, .4, 2);
    s += `<ellipse cx="1250" cy="640" rx="150" ry="52" fill="none" stroke="${NAVY}" stroke-opacity=".3" stroke-width="1.5" stroke-dasharray="4 6"/>`;
    for (let i = 0; i < 120; i++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()); s += dot(1250 + Math.cos(a) * d * 140, 640 + Math.sin(a) * d * 46, 2.5 + r() * 2.5, NAVY, .35 + r() * .5); }
    [[1180, 470], [1330, 430]].forEach(([x, y]) => { s += dot(x, y, 4, NAVY, .7) + ring(x, y, 13, { so: .35, sw: 1.5 }); });
    s += glow(`<circle cx="1420" cy="${H}" r="9" fill="${CYAN}"/>`) + ring(1420, H, 23, { stroke: CYAN, so: 1 }) + ring(1420, H, 40, { stroke: CYAN, so: .4, sw: 1.5 });
    return { svg: s, to: 1411, node: false };
  },

  // Month-end close and reporting: a report with its chart; the line lands on the period's key bar.
  'ai-month-end-close-financial-reporting': () => {
    let s = doc(1080, 250, 410, 450, 3, { head: 44, gap: 21 });
    const tops = [612, 588, 630, H, 600, 578];
    s += hair(1110, 660, 1460, 660, .5);
    tops.forEach((t, i) => { const x = 1122 + i * 56; s += i === 3 ? glow(`<rect x="${x}" y="${t}" width="34" height="${660 - t}" rx="4" fill="${CYAN}"/>`) : `<rect x="${x}" y="${t}" width="34" height="${660 - t}" rx="4" fill="${NAVY}" opacity=".85"/>`; });
    s += hair(1110, 520, 1460, 520, .12);
    return { svg: s, to: 1122 + 3 * 56, node: false };
  },

  // Continuous vs traditional audit: one annual point on top; a live, continuous signal on the golden line.
  'continuous-auditing-ai-vs-traditional-audit': () => {
    let s = hair(1070, 400, 1490, 400, .35, 2);
    for (let m = 0; m <= 12; m++) s += hair(1070 + m * 35, 393, 1070 + m * 35, 407, .3, 1.5);
    s += dot(1490, 400, 9, NAVY, 1) + ring(1490, 400, 20, { so: .3, sw: 1.5 });
    const r = rng(27); let d = `M1060 ${H}`;
    for (let x = 1060; x <= 1490; x += 7) d += ` L${x} ${f(H + Math.sin((x - 1060) / 21) * 13 * Math.min(1, (x - 1060) / 60) + (r() - .5) * 6)}`;
    s += glow(pth(d, { stroke: CYAN, so: 1, sw: 3 }));
    for (let x = 1105; x <= 1490; x += 35) s += dot(x, H + 55, 3.5, CYAN, .9);
    s += hair(1070, H + 55, 1490, H + 55, .12);
    return { svg: s, to: 1060, node: false };
  },

  // Full population vs sampling: every item read; a few old-style samples ringed; one exception found.
  'full-population-testing-ai-vs-sampling': () => {
    const r = rng(28); let s = '';
    for (let c = 0; c < 12; c++) for (let k = -6; k <= 4; k++) {
      const x = 1092 + c * 34, y = H + k * 34;
      if (k === 0 && c === 8) continue;
      s += dot(x, y, 4, NAVY, .8);
      if (r() < .07) s += ring(x, y, 11, { so: .4, sw: 1.5 });
    }
    s += glow(`<rect x="1484" y="${H - 6 * 34 - 17}" width="3" height="${11 * 34}" rx="1.5" fill="${CYAN}"/>`);
    s += glow(`<circle cx="${1092 + 8 * 34}" cy="${H}" r="8" fill="${CYAN}"/>`) + ring(1092 + 8 * 34, H, 20, { stroke: CYAN, so: 1 });
    return { svg: s, to: 1092 + 8 * 34 - 8, node: false };
  },

  // AI segregation of duties: two role panels kept apart; a crossing attempt on the golden line is blocked.
  'ai-segregation-of-duties-internal-controls': () => {
    let s = box(1070, 300, 180, 390, { r: 16, so: .5 }) + box(1331, 300, 180, 390, { r: 16, so: .5 });
    s += `<circle cx="1160" cy="330" r="9" fill="${NAVY}"/><circle cx="1421" cy="330" r="9" fill="none" stroke="${NAVY}" stroke-width="2"/>`;
    s += hair(1290, 290, 1290, 700, .35, 2).replace('/>', ' stroke-dasharray="6 8"/>');
    [-4, -3, -2, -1, 0, 1, 2, 3].forEach((k) => {
      const y = H + k * 40;
      if (y < 370) return;
      if (k === 0) { s += glow(`<rect x="1090" y="${y - 13}" width="140" height="26" rx="13" fill="${CYAN}"/>`); s += box(1351, y - 13, 140, 26, { r: 13, so: .5, sw: 1.5 }); return; }
      s += box(1090, y - 13, 140, 26, { r: 13, so: .5, sw: 1.5 }) + bar(1104, y, 70, .6, 5);
      s += box(1351, y - 13, 140, 26, { r: 13, so: .5, sw: 1.5 }) + bar(1365, y, 60, .6, 5);
    });
    s += glow(pth(`M1230 ${H} L1270 ${H}`, { stroke: CYAN, so: 1, sw: 3, dash: '5 6' }));
    s += ring(1290, H, 15, { stroke: CYAN, so: 1, sw: 3 }) + pth(`M1280 ${H + 10} L1300 ${H - 10}`, { stroke: CYAN, so: 1, sw: 3 });
    return { svg: s, to: 1090, node: false };
  },

  // Audit trail, zero hallucination: records chained to the finding; an unsupported claim is struck out.
  'ai-audit-trail-zero-hallucination': () => {
    let s = '';
    [1070, 1186, 1302].forEach((x, i) => {
      s += box(x, H - 55, 82, 110, { r: 10 }) + bar(x + 14, H - 28, 46, .55, 5) + bar(x + 14, H - 10, 34, .55, 5) + bar(x + 14, H + 8, 52, .55, 5);
      s += glow(`<rect x="${x + 70}" y="${H - 9}" width="58" height="18" rx="9" fill="none" stroke="${CYAN}" stroke-width="3"/>`);
    });
    s += glow(box(1418, H - 66, 93, 132, { r: 12, stroke: CYAN, so: 1, sw: 3 })) + bar(1434, H - 34, 55, .7, 5) + bar(1434, H - 16, 40, .5, 5) + cyanCheck(1464, H + 30, 15);
    s += box(1186, 300, 200, 96, { r: 12, so: .3, sw: 1.5, dash: '6 7' }) + bar(1206, 330, 120, .2, 5) + bar(1206, 352, 80, .2, 5) + hair(1176, 410, 1396, 290, .45, 2);
    return { svg: s, to: 1070, node: false };
  },

  // Odoo 20 AI features: the app grid, a few modules gaining an AI layer; the lit one on the golden line.
  'odoo-20-ai-features-accounting': () => {
    let s = '';
    const ai = new Set(['2,0', '0,2', '1,1']);
    for (let c = 0; c < 3; c++) for (let k = -1; k <= 1; k++) {
      const x = 1090 + c * 130, y = H + k * 130 - 48, key = `${c},${k + 1}`;
      if (k === 0 && c === 0) { s += glow(`<rect x="${x}" y="${y}" width="96" height="96" rx="22" fill="${CYAN}"/>`) + sparkle(x + 48, y + 48, 24, W); continue; }
      s += box(x, y, 96, 96, { r: 22, so: .5 });
      s += ai.has(key) ? sparkle(x + 48, y + 48, 19, CYAN) : bar(x + 26, y + 48, 44, .6);
    }
    return { svg: s, to: 1090, node: false };
  },

  // Connecting AI to Odoo: the ERP database, entered on the golden line only through a read-only lock.
  'connect-ai-to-odoo-continuous-audit': () => {
    const cx = 1365, rx = 120, ry = 32, top = 330, bot = 690;
    let s = `<path d="M${cx - rx} ${top} L${cx - rx} ${bot} A ${rx} ${ry} 0 0 0 ${cx + rx} ${bot} L${cx + rx} ${top}" fill="${W}" stroke="${NAVY}" stroke-opacity=".85" stroke-width="2.5"/>`;
    s += `<ellipse cx="${cx}" cy="${top}" rx="${rx}" ry="${ry}" fill="${W}" stroke="${NAVY}" stroke-opacity=".85" stroke-width="2.5"/>`;
    [450, 570].forEach((y) => { s += pth(`M${cx - rx} ${y} A ${rx} ${ry} 0 0 0 ${cx + rx} ${y}`, { so: .3, sw: 1.5 }); });
    [395, 515, 635].forEach((y) => { s += bar(cx - 60, y + 16, 89, .5, 5) + bar(cx + 40, y + 16, 34, .5, 5); });
    s += glow(pth(`M1172 ${H} L${cx - rx - 4} ${H}`, { stroke: CYAN, so: 1, sw: 3, dash: '4 8' }));
    s += glow(`<rect x="1122" y="${H - 14}" width="40" height="32" rx="6" fill="${CYAN}"/>`) + pth(`M1131 ${H - 14} L1131 ${H - 24} A 11 11 0 0 1 1153 ${H - 24} L1153 ${H - 14}`, { stroke: CYAN, so: 1, sw: 4 });
    s += `<circle cx="1142" cy="${H + 1}" r="4" fill="${W}"/>`;
    return { svg: s, to: 1122, node: false };
  },

  // Purchase approvals: an order through approval steps; above the threshold a second approver signs.
  'odoo-20-purchase-approvals-automation': () => {
    let s = doc(1070, H - 85, 110, 170, 4, { head: 28, gap: 24 });
    s += hair(1060, 410, 1511, 410, .45, 2).replace('/>', ' stroke-dasharray="10 8"/>');
    s += glow(pth(`M1180 ${H} L1440 ${H}`, { stroke: CYAN, so: 1, sw: 3 }));
    [1240, 1330].forEach((x) => { s += `<circle cx="${x}" cy="${H}" r="21" fill="${W}" stroke="${CYAN}" stroke-width="3"/>` + tick(x, H, 8, CYAN, 3); });
    s += pth(`M1330 ${H - 21} C 1330 400, 1360 340, 1420 340`, { so: .6, sw: 2 });
    s += `<circle cx="1440" cy="340" r="21" fill="${NAVY}"/>` + tick(1440, 340, 8, W, 3);
    s += glow(`<rect x="1440" y="${H - 22}" width="71" height="44" rx="10" fill="${CYAN}"/>`) + `<rect x="1454" y="${H - 7}" width="40" height="5" rx="2.5" fill="${W}"/><rect x="1454" y="${H + 5}" width="26" height="5" rx="2.5" fill="${W}" opacity=".8"/>`;
    return { svg: s, to: 1070, node: false };
  },

  // Step-by-step rollout: three phases on one track with gates, ending in production.
  'odoo-20-ai-accounting-step-by-step': () => {
    let s = '';
    const seg = [[1070, 1200], [1222, 1345], [1367, 1480]];
    seg.forEach(([a, b], i) => {
      s += i < 2 ? `<rect x="${a}" y="${H - 7}" width="${b - a}" height="14" rx="7" fill="${NAVY}" opacity=".88"/>` : glow(`<rect x="${a}" y="${H - 7}" width="${b - a}" height="14" rx="7" fill="${CYAN}"/>`);
      for (let k = 0; k < 3; k++) { const ty = H - 178 + k * 30; s += (i < 2 ? `<circle cx="${a + 10}" cy="${ty}" r="7" fill="${NAVY}"/>` + tick(a + 10, ty, 3.5, W, 1.8) : ring(a + 10, ty, 7, { stroke: CYAN, so: 1, sw: 2 })) + bar(a + 26, ty, [70, 52, 62][k], .55, 5); }
      if (i < 2) s += `<rect x="${b + 9}" y="${H - 55}" width="4" height="${55 + 21}" rx="2" fill="${NAVY}"/>` + `<path d="M${b + 13} ${H - 55} L${b + 38} ${H - 46} L${b + 13} ${H - 37} Z" fill="${NAVY}"/>`;
    });
    s += ring(1497, H, 14, { stroke: CYAN, so: 1, sw: 3 }) + `<circle cx="1497" cy="${H}" r="5" fill="${CYAN}"/>`;
    [1135, 1283, 1423].forEach((x) => { s += hair(x, H + 34, x, H + 89, .25) + dot(x, H + 89, 4, NAVY, .6); });
    return { svg: s, to: 1070, node: false };
  },

  // ---------- Earlier articles ----------
  // Materiality (ISA 320): misstatements against the threshold; only the line on y = 556 crosses it.
  'materiality-isa-320-threshold': () => {
    let s = '';
    s += hair(C1, 300, C1, 700, .35, 1.5).replace('/>', ' stroke-dasharray="3 6"/>');
    s += glow(`<rect x="${C2 - 1.5}" y="300" width="3" height="400" rx="1.5" fill="${CYAN}"/>`);
    [-6, -5, -4, -3, -2, -1, 1, 2, 3].forEach((k, i) => { s += bar(X0, H + k * 34, [200, 130, 260, 90, 170, 240, 120, 210, 150][i], .85, 12); });
    s += glow(`<rect x="${X0}" y="${H - 6}" width="${1450 - X0}" height="12" rx="6" fill="${CYAN}"/>`);
    return { svg: s, to: 1450, node: true };
  },

  // ZATCA phase two: the e-invoice with its QR block and the go-live checklist; one item cleared.
  'zatca-phase-two-odoo-checklist': () => {
    let s = box(1070, 250, 400, 450, { r: 14 }) + `<path d="M1071 264 a13 13 0 0 1 13 -13 h372 a13 13 0 0 1 13 13 v42 h-398 z" fill="${NAVY}"/>`;
    s += `<rect x="1094" y="275" width="130" height="7" rx="3.5" fill="${W}" opacity=".9"/>`;
    s += qr(1356, 326, 13, 7, 11);
    s += bar(1094, 350, 140, .5, 5) + bar(1094, 372, 100, .35, 5);
    [-3, -2, -1, 0, 1, 2, 3].forEach((k) => {
      const y = H + k * 34, done = k < 0;
      if (k === 0) { s += tint(1084, y - 15, 372, 30) + glow(`<rect x="1096" y="${y - 10}" width="20" height="20" rx="5" fill="${CYAN}"/>`) + tick(1106, y, 5.5, W, 2.2) + cbar(1132, y, 150, 6); return; }
      s += done ? `<rect x="1096" y="${y - 10}" width="20" height="20" rx="5" fill="${NAVY}"/>` + tick(1106, y, 5.5, W, 2.2) : `<rect x="1097" y="${y - 9}" width="18" height="18" rx="5" fill="none" stroke="${NAVY}" stroke-opacity=".5" stroke-width="2"/>`;
      s += bar(1132, y, [170, 120, 150, 0, 110, 160, 90][k + 3], done ? .75 : .35, 5);
    });
    return { svg: s, to: 1096, node: false };
  },

  // ETA e-invoicing mistakes: an invoice whose fields are validated; one field fails; the e-seal below.
  'egypt-eta-einvoicing-odoo-mistakes': () => {
    let s = box(1070, 230, 380, 470, { r: 14 }) + `<path d="M1071 244 a13 13 0 0 1 13 -13 h352 a13 13 0 0 1 13 13 v42 h-378 z" fill="${NAVY}"/>`;
    s += `<rect x="1094" y="255" width="120" height="7" rx="3.5" fill="${W}" opacity=".9"/><rect x="1380" y="252" width="44" height="13" rx="6.5" fill="${CYAN}"/>`;
    [-4, -3, -2, -1, 0, 1].forEach((k) => {
      const y = H + k * 50;
      s += bar(1094, y, 70, .4, 5);
      if (k === 0) { s += tint(1186, y - 15, 230, 30, 7) + glow(box(1186, y - 15, 230, 30, { r: 7, stroke: CYAN, so: 1, sw: 2.5, fill: 'none' })); return; }
      s += box(1186, y - 15, 230, 30, { r: 7, so: .35, sw: 1.5 }) + bar(1200, y, [120, 90, 150, 70, 0, 110][k + 4], .7, 5);
    });
    s += bang(1474, H, 17);
    s += ring(1376, 640, 34, { so: .7, sw: 2 }) + ring(1376, 640, 25, { so: .35, sw: 1.5, dash: '3 4' }) + tick(1376, 640, 9, NAVY, 2.6);
    return { svg: s, to: 1186, node: false };
  },

  // Eleven months of continuous audit: monthly activity on a continuous line; the annual audit, once.
  'continuous-audit-eleven-months': () => {
    let s = '';
    const xs = Array.from({ length: 12 }, (_, m) => 1086 + m * 37);
    xs.forEach((x, m) => { const h = [89, 55, 120, 72, 98, 60, 110, 80, 130, 66, 104, 48][m]; s += `<rect x="${x - 7}" y="${H - 21 - h}" width="14" height="${h}" rx="4" fill="${NAVY}" opacity=".85"/>`; });
    s += glow(`<rect x="1060" y="${H - 1.5}" width="${1497 - 1060}" height="3" rx="1.5" fill="${CYAN}"/>` + xs.map((x) => `<circle cx="${x}" cy="${H}" r="5" fill="${CYAN}"/>`).join(''));
    s += hair(1070, H + 89, 1497, H + 89, .35, 2);
    xs.forEach((x, m) => { s += m < 11 ? hair(x, H + 82, x, H + 96, .3) : dot(x, H + 89, 8, NAVY, 1) + ring(x, H + 89, 18, { so: .3, sw: 1.5 }); });
    return { svg: s, to: 1497, node: true };
  },

  // Agents draft, people approve: a stack of drafts; one approved, outlined and sealed.
  'agents-draft-people-approve': () => {
    let s = '';
    [[1110, H - 150], [1090, H - 125], [1070, H - 100]].forEach(([x, y], i) => { s += box(x, y, 150, 200, { r: 12, so: i === 2 ? .7 : .35, sw: 1.5, dash: '6 6' }); if (i === 2) [0, 1, 2, 3].forEach((k) => { s += bar(x + 20, y + 40 + k * 26, [100, 70, 110, 60][k], .35, 5); }); });
    s += pth(`M1240 ${H} L1300 ${H}`, { so: .5, sw: 2 }) + pth(`M1290 ${H - 7} L1300 ${H} L1290 ${H + 7}`, { so: .5, sw: 2 });
    s += glow(box(1315, H - 120, 180, 240, { r: 14, stroke: CYAN, so: 1, sw: 3 }));
    [0, 1, 2, 3, 4].forEach((k) => { s += bar(1337, H - 85 + k * 28, [110, 80, 125, 70, 95][k], .8, 5); });
    s += cyanCheck(1495, H - 120, 21);
    return { svg: s, to: 1070, node: false };
  },

  // Egypt VAT return: output and input boxes, the net position on the golden line.
  'egypt-vat-return-odoo': () => {
    let s = bar(1100, 290, 89, .45) + bar(1310, 290, 89, .45);
    [-6, -4, -2].forEach((k) => { const y = H + k * 34; s += box(1100, y - 20, 190, 40, { r: 8, so: .4, sw: 1.5 }) + bar(1200, y, 70, .8, 5) + box(1310, y - 20, 190, 40, { r: 8, so: .4, sw: 1.5 }) + bar(1410, y, 70, .8, 5); });
    s += hair(1100, H - 34, 1500, H - 34, .5, 2);
    s += tint(1100, H - 26, 400, 52, 10) + glow(box(1100, H - 26, 400, 52, { r: 10, stroke: CYAN, so: 1, sw: 2.5, fill: 'none' })) + glow(cbar(1380, H, 100, 8));
    s += hair(1310, 660, 1500, 660, .5) + bar(1310, 690, 55, .3, 5);
    return { svg: s, to: 1100, node: false };
  },

  // Egypt e-receipt (B2C): a till receipt, items then the total on the golden line, its QR below.
  'egypt-e-receipt-b2c': () => {
    const x = 1170, w = 250, top = 210, bot = 722;
    let zig = ''; for (let i = 0; i <= 10; i++) zig += ` L${x + w - i * w / 10} ${bot - (i % 2 ? 12 : 0)}`;
    let s = `<path d="M${x} ${top + 12} a12 12 0 0 1 12 -12 h${w - 24} a12 12 0 0 1 12 12 L${x + w} ${bot}${zig} Z" fill="${W}" stroke="${NAVY}" stroke-opacity=".85" stroke-width="2"/>`;
    s += bar(x + 70, top + 40, 110, .8, 7) + bar(x + 95, top + 62, 60, .35, 5);
    [0, 1, 2, 3, 4, 5].forEach((k) => { const y = top + 110 + k * 34; s += bar(x + 24, y, [110, 80, 130, 70, 100, 90][k], .5, 5) + bar(x + w - 24 - 50, y, 50, .8, 5); });
    s += hair(x + 20, H - 34, x + w - 20, H - 34, .5, 1.5).replace('/>', ' stroke-dasharray="4 5"/>');
    s += tint(x + 10, H - 17, w - 20, 34) + bar(x + 24, H, 70, .85, 7) + glow(cbar(x + w - 24 - 76, H, 76, 9));
    s += qr(x + w / 2 - 38, 600, 11, 7, 7);
    return { svg: s, to: x, node: false };
  },

  // Zakat vs corporate income tax: two bases weighed on one balance; the pans hang on the golden line.
  'zakat-vs-corporate-income-tax-saudi': () => {
    const cx = 1290; let s = '';
    s += `<rect x="${cx - 2.5}" y="300" width="5" height="400" rx="2.5" fill="${NAVY}"/><rect x="${cx - 70}" y="696" width="140" height="8" rx="4" fill="${NAVY}"/>`;
    s += `<rect x="1140" y="318" width="300" height="5" rx="2.5" fill="${NAVY}"/><circle cx="${cx}" cy="320" r="10" fill="${NAVY}"/>`;
    [[1150, NAVY, .55], [1430, CYAN, 1]].forEach(([px, c, o]) => {
      s += pth(`M${px} 323 L${px - 62} ${H} M${px} 323 L${px + 62} ${H}`, { stroke: c === CYAN ? CYAN : NAVY, so: c === CYAN ? 1 : .55, sw: 1.5 });
      const pan = `<path d="M${px - 72} ${H} L${px + 72} ${H} A 72 28 0 0 1 ${px - 72} ${H} Z" fill="${c}" opacity="${c === CYAN ? 1 : .9}"/>`;
      s += c === CYAN ? glow(pan) : pan;
      [0, 1, 2].forEach((k) => { const bw = 70 - k * 14; s += `<rect x="${px - bw / 2}" y="${H - 12 - k * 13}" width="${bw}" height="10" rx="3" fill="${c}" opacity="${c === CYAN ? .9 : .7}"/>`; });
    });
    return { svg: s, to: 1078, node: false };
  },

  // Odoo accounting implementation: a stepper, done steps ticked, the current one on the golden line.
  'odoo-accounting-implementation-steps': () => {
    const x = 1130; let s = '';
    const ks = [-4, -3, -2, -1, 0, 1, 2];
    s += `<rect x="${x - 1.5}" y="${H - 4 * 64}" width="3" height="${4 * 64}" fill="${NAVY}" opacity=".85"/><rect x="${x - 1}" y="${H}" width="2" height="${2 * 64}" fill="${NAVY}" opacity=".25"/>`;
    ks.forEach((k) => {
      const y = H + k * 64;
      if (k < 0) s += `<circle cx="${x}" cy="${y}" r="14" fill="${NAVY}"/>` + tick(x, y, 6, W, 2.4);
      else if (k === 0) s += `<circle cx="${x}" cy="${y}" r="20" fill="${W}" stroke="${CYAN}" stroke-width="3"/>` + glow(`<circle cx="${x}" cy="${y}" r="8" fill="${CYAN}"/>`);
      else s += `<circle cx="${x}" cy="${y}" r="13" fill="${W}" stroke="${NAVY}" stroke-opacity=".35" stroke-width="2"/>`;
      const o = k < 0 ? .8 : k === 0 ? 1 : .3;
      s += (k === 0 ? glow(cbar(x + 44, y - 8, 170, 8)) : bar(x + 44, y - 8, [150, 120, 170, 130, 0, 140, 110][k + 4], o, 7)) + bar(x + 44, y + 12, [90, 70, 110, 80, 120, 85, 60][k + 4], o * .45, 5);
    });
    return { svg: s, to: x - 20, node: false };
  },

  // Inventory valuation FIFO / AVCO: cost layers in stock; the layer issued slides out on the golden line.
  'odoo-inventory-valuation-fifo-avco': () => {
    let s = '';
    for (let j = -6; j <= 3; j++) {
      const y = H + j * 40 - 17;
      if (j === 0) { s += glow(`<rect x="1190" y="${y}" width="290" height="34" rx="7" fill="${CYAN}" opacity=".95"/>`) + `<rect x="1206" y="${y + 14}" width="70" height="6" rx="3" fill="${W}"/>`; continue; }
      s += box(1130, y, 290, 34, { r: 7, so: .55, sw: 1.5 }) + `<rect x="1130" y="${y}" width="8" height="34" rx="3" fill="${NAVY}" opacity="${.3 + (j + 6) * .07}"/>` + bar(1150, y + 17, [70, 110, 90, 60, 100, 80, 0, 95, 75, 85][j + 6], .45, 5);
    }
    s += hair(1130, H - 17, 1130, H + 17, .4).replace('/>', ' stroke-dasharray="3 4"/>');
    s += pth(`M1100 ${H + 3 * 40 + 30} L1450 ${H + 3 * 40 + 30}`, { so: .5, sw: 2 });
    return { svg: s, to: 1190, node: false };
  },

  // Month-end close checklist: the month grid, days closed and ticked; close day on the golden line.
  'month-end-close-checklist-odoo': () => {
    let s = '';
    const x0 = 1100, step = 57, sz = 44;
    for (let c = 0; c < 7; c++) s += bar(x0 + c * step + 10, H - 4 * step + 2, 24, .35, 5);
    for (let r = -3; r <= 1; r++) for (let c = 0; c < 7; c++) {
      const x = x0 + c * step, y = H + r * step - sz / 2, i = (r + 3) * 7 + c;
      if (i > 32) continue;
      if (r === 0 && c === 4) { s += glow(`<rect x="${x}" y="${y}" width="${sz}" height="${sz}" rx="9" fill="${CYAN}"/>`) + tick(x + sz / 2, y + sz / 2, 9, W, 3); continue; }
      const done = i < 25;
      const wk = i % 7 > 4;
      s += done && !wk ? `<rect x="${x}" y="${y}" width="${sz}" height="${sz}" rx="9" fill="${NAVY}" opacity=".88"/>` + (i % 2 === 0 ? tick(x + sz / 2, y + sz / 2, 7, W, 2.4) : '') : box(x, y, sz, sz, { r: 9, so: wk ? .55 : .3, sw: 1.5, dash: wk ? '3 4' : null });
    }
    return { svg: s, to: x0, node: false };
  },

  // What is internal audit: a process flow under the auditor's lens.
  'what-is-internal-audit': () => {
    let s = '';
    const xs = [1075, 1245, 1415];
    s += pth(`M${xs[0] + 80} ${H} L${xs[1]} ${H} M${xs[1] + 80} ${H} L${xs[2]} ${H}`, { so: .6, sw: 2 });
    xs.forEach((x, i) => { s += i === 1 ? tint(x, H - 36, 80, 72, 12) + box(x, H - 36, 80, 72, { r: 12, stroke: CYAN, so: 1, sw: 2.5, fill: 'none' }) + glow(cbar(x + 16, H - 8, 48, 6)) + bar(x + 16, H + 10, 30, .5, 5) : box(x, H - 36, 80, 72, { r: 12 }) + bar(x + 16, H - 8, 44, .7, 5) + bar(x + 16, H + 10, 30, .4, 5); });
    s += box(1245, H - 200, 80, 60, { r: 12, so: .4, sw: 1.5 }) + hair(1285, H - 140, 1285, H - 36, .3) + box(1245, H + 140, 80, 60, { r: 12, so: .4, sw: 1.5 }) + hair(1285, H + 36, 1285, H + 140, .3);
    s += glow(ring(1285, H, 89, { stroke: CYAN, so: 1, sw: 5 })) + ring(1285, H, 99, { so: .2, sw: 1.5 });
    s += pth(`M${1285 + 63} ${H + 63} L${1285 + 118} ${H + 118}`, { sw: 14, so: .9 });
    return { svg: s, to: 1075, node: false };
  },

  // Segregation of duties in Odoo: the role × permission matrix; the conflicting pair on the golden line.
  'segregation-of-duties-odoo': () => {
    const r = rng(13); let s = '';
    for (let c = 0; c < 6; c++) s += bar(1166 + c * 55 - 12, H - 5 * 55 + 10, 24, .35, 5);
    for (let k = -4; k <= 2; k++) {
      const y = H + k * 55;
      s += bar(1066, y, 60, .55, 5);
      for (let c = 0; c < 6; c++) {
        const x = 1166 + c * 55;
        if (k === 0 && (c === 1 || c === 4)) { s += glow(`<circle cx="${x}" cy="${y}" r="11" fill="${CYAN}"/>`) + ring(x, y, 21, { stroke: CYAN, so: 1 }); continue; }
        s += (k !== 0 && r() < .42) || (k === 0 && c === 2) ? dot(x, y, 9, NAVY, .88) : ring(x, y, 9, { so: .25, sw: 1.5 });
      }
    }
    s += glow(pth(`M${1166 + 55} ${H - 26} Q ${1166 + 2.5 * 55} ${H - 70} ${1166 + 4 * 55} ${H - 26}`, { stroke: CYAN, so: 1, sw: 2.5, dash: '5 5' }));
    return { svg: s, to: 1145, node: false };
  },

  // Three-way match: order, receipt and bill converge on one match on the golden line.
  'three-way-match-purchase-controls': () => {
    let s = '';
    const cards = [1070, 1226, 1382];
    cards.forEach((x, i) => {
      s += doc(x, 250, 120, 150, 3, { head: 28, gap: 22 });
      if (i === 1) s += pth(`M${x + 44} 360 L${x + 60} 352 L${x + 76} 360 L${x + 76} 380 L${x + 60} 388 L${x + 44} 380 Z M${x + 44} 360 L${x + 60} 368 L${x + 76} 360 M${x + 60} 368 L${x + 60} 388`, { so: .6, sw: 1.5 });
      s += glow(pth(`M${x + 60} 400 C ${x + 60} 480, 1286 470, 1286 ${H - 22}`, { stroke: CYAN, so: .9, sw: 2.2 }));
    });
    s += cyanCheck(1286, H, 22);
    s += pth(`M1286 ${H + 22} L1286 ${H + 70}`, { so: .5, sw: 2 }) + box(1196, H + 70, 180, 64, { r: 12 }) + bar(1216, H + 92, 100, .7, 5) + bar(1216, H + 112, 60, .4, 5);
    return { svg: s, to: 1264, node: false };
  },

  // Bank reconciliation controls: statement against ledger, every pair matched but one.
  'bank-reconciliation-controls': () => {
    let s = `<rect x="1070" y="330" width="130" height="8" rx="4" fill="${NAVY}"/><rect x="1381" y="330" width="130" height="8" rx="4" fill="${NAVY}"/>`;
    const ks = [-4, -3, -2, -1, 0, 1, 2, 3], map = { '-4': -2, '-3': 1, '-2': -4, '-1': 3, '1': -1, '2': -3, '3': 2 };
    ks.forEach((k) => {
      const y = H + k * 40;
      if (k === 0) s += glow(cbar(1070, y, 130, 8)) + glow(box(1060, y - 16, 150, 32, { r: 8, stroke: CYAN, so: 1, sw: 2, fill: 'none', dash: '5 5' }));
      else s += bar(1070, y, [100, 130, 80, 120, 0, 90, 110, 125][k + 4], .8);
      s += bar(1381 + 130 - [110, 90, 125, 80, 70, 130, 100, 95][k + 4], y, [110, 90, 125, 80, 70, 130, 100, 95][k + 4], k === 0 ? .25 : .8);
      if (k !== 0) { const y2 = H + map[k] * 40; s += pth(`M1215 ${y} C 1290 ${y}, 1300 ${y2}, 1370 ${y2}`, { so: .45, sw: 1.5 }) + dot(1215, y, 3.5) + dot(1370, y2, 3.5); }
    });
    return { svg: s, to: 1060, node: false };
  },

  // Virtual CFO vs full-time CFO: the finance dashboard; the tile on the golden line is the live one.
  'virtual-cfo-vs-full-time-cfo': () => {
    let s = '';
    const tiles = [[1060, 284], [1295, 284], [1060, 493], [1295, 493]];
    tiles.forEach(([x, y], i) => {
      const hot = i === 2;
      s += hot ? tint(x, y, 216, 190, 14) + glow(box(x, y, 216, 190, { r: 14, stroke: CYAN, so: 1, sw: 2.5, fill: 'none' })) : box(x, y, 216, 190, { r: 14, so: .3, sw: 1.5 });
      const c = hot ? CYAN : NAVY;
      s += `<rect x="${x + 20}" y="${y + 22}" width="70" height="6" rx="3" fill="${NAVY}" opacity=".4"/>`;
      if (i === 0) s += pth(`M${x + 20} ${y + 150} L${x + 60} ${y + 120} L${x + 100} ${y + 132} L${x + 140} ${y + 90} L${x + 190} ${y + 70}`, { sw: 2.5 });
      if (i === 1) [50, 80, 60, 100, 74].forEach((h, k) => { s += `<rect x="${x + 24 + k * 36}" y="${y + 166 - h}" width="20" height="${h}" rx="4" fill="${NAVY}" opacity=".85"/>`; });
      if (i === 2) s += glow(pth(`M${x + 20} ${y + 150} C ${x + 70} ${y + 150}, ${x + 90} ${y + 72}, ${x + 196} ${y + 63}`, { stroke: c, so: 1, sw: 3 })) + `<circle cx="${x + 196}" cy="${y + 63}" r="6" fill="${CYAN}"/>`;
      if (i === 3) s += ring(x + 108, y + 110, 48, { so: .15, sw: 14 }) + pth(`M${x + 108} ${y + 62} A 48 48 0 1 1 ${x + 62} ${y + 124}`, { sw: 14, so: .85 }).replace('stroke-linecap="round"', 'stroke-linecap="butt"');
    });
    return { svg: s, to: 1060, node: false };
  },

  // 13-week cash flow: weekly balances against the minimum-cash line; the week that touches it.
  'thirteen-week-cash-flow-forecast': () => {
    let s = '';
    const tops = [420, 452, 400, 470, 500, 448, 520, H, 492, 440, 410, 460, 380];
    s += hair(1066, 700, 1500, 700, .5, 2);
    tops.forEach((t, i) => { const x = 1072 + i * 33; s += i === 7 ? glow(`<rect x="${x}" y="${t}" width="21" height="${700 - t}" rx="4" fill="${CYAN}"/>`) : `<rect x="${x}" y="${t}" width="21" height="${700 - t}" rx="4" fill="${NAVY}" opacity=".85"/>`; });
    s += glow(pth(`M1060 ${H} L1500 ${H}`, { stroke: CYAN, so: 1, sw: 2.5, dash: '8 7' }));
    s += glow(`<circle cx="${1072 + 7 * 33 + 10.5}" cy="${H}" r="8" fill="${CYAN}"/>`) + ring(1072 + 7 * 33 + 10.5, H, 20, { stroke: CYAN, so: 1 });
    return { svg: s, to: 1060, node: false };
  },

  // What's new in Odoo 20 for finance: the app grid with new modules; the lit one on the golden line.
  'odoo-20-whats-new-for-finance-teams': () => {
    let s = '';
    for (let c = 0; c < 4; c++) for (let k = -2; k <= 1; k++) {
      const x = 1100 + c * 89, y = H + k * 89 - 34;
      if (k === 0 && c === 1) { s += glow(`<rect x="${x}" y="${y}" width="68" height="68" rx="17" fill="${CYAN}"/>`) + `<rect x="${x + 20}" y="${y + 31}" width="28" height="6" rx="3" fill="${W}"/><rect x="${x + 31}" y="${y + 20}" width="6" height="28" rx="3" fill="${W}"/>`; continue; }
      s += box(x, y, 68, 68, { r: 17, so: .45, sw: 1.5 });
      const g = (c + k * 3 + 9) % 4;
      s += g === 0 ? bar(x + 18, y + 34, 32, .7) : g === 1 ? ring(x + 34, y + 34, 12, { so: .7 }) : g === 2 ? `<rect x="${x + 22}" y="${y + 22}" width="24" height="24" rx="5" fill="none" stroke="${NAVY}" stroke-opacity=".7" stroke-width="2"/>` : bar(x + 18, y + 28, 32, .7, 5) + bar(x + 18, y + 40, 20, .45, 5);
      if ((c === 3 && k === -2) || (c === 2 && k === 1)) s += `<circle cx="${x + 64}" cy="${y + 4}" r="7" fill="${CYAN}"/>`;
    }
    return { svg: s, to: 1100, node: false };
  },

  // Odoo 20 AI agents and finance controls: agent proposes, control gate checks, the entry is recorded.
  'odoo-20-ai-agents-finance-controls': () => {
    let s = '';
    let hp = ''; for (let k = 0; k < 6; k++) { const a = Math.PI / 3 * k + Math.PI / 6; hp += `${k ? 'L' : 'M'}${f(1120 + 44 * Math.cos(a))} ${f(H + 44 * Math.sin(a))} `; }
    s += pth(hp + 'Z', { sw: 2.5, fill: W }) + sparkle(1120, H, 15, NAVY);
    s += glow(pth(`M1164 ${H} L1262 ${H}`, { stroke: CYAN, so: 1, sw: 3 }));
    s += glow(`<rect x="1262" y="${H - 55}" width="10" height="110" rx="5" fill="${CYAN}"/><rect x="1318" y="${H - 55}" width="10" height="110" rx="5" fill="${CYAN}"/>`) + `<rect x="1272" y="${H - 4}" width="46" height="8" rx="4" fill="${CYAN}" opacity=".5"/>`;
    s += glow(`<rect x="1278" y="${H - 104}" width="34" height="28" rx="6" fill="${CYAN}"/>`) + pth(`M1285 ${H - 104} L1285 ${H - 113} A 10 10 0 0 1 1305 ${H - 113} L1305 ${H - 104}`, { stroke: CYAN, so: 1, sw: 3.5 });
    s += pth(`M1328 ${H} L1390 ${H}`, { so: .6, sw: 2 }) + box(1390, H - 60, 121, 120, { r: 12 }) + bar(1408, H - 28, 70, .7, 5) + bar(1408, H - 8, 50, .45, 5) + `<circle cx="1481" cy="${H + 30}" r="14" fill="${NAVY}"/>` + tick(1481, H + 30, 6, W, 2.4);
    s += box(1070, 650, 280, 56, { r: 10, so: .3, sw: 1.5 }) + [0, 1, 2, 3].map((k) => bar(1086 + k * 64, 678, 44, .35, 5)).join('');
    return { svg: s, to: 1076, node: false };
  },

  // Odoo 20 bank reconciliation and bill payments: bills batched into one payment matched to the bank.
  'odoo-20-bank-reconciliation-and-bill-payments': () => {
    let s = '';
    [H - 130, H, H + 130].forEach((y, i) => {
      s += box(1070, y - 45, 100, 90, { r: 10, so: i === 1 ? .85 : .6 }) + bar(1086, y - 18, 56, .6, 5) + bar(1086, y, 40, .4, 5) + bar(1086, y + 18, 50, .7, 5);
      if (i !== 1) s += pth(`M1170 ${y} C 1215 ${y}, 1220 ${H}, 1250 ${H}`, { so: .45, sw: 1.8 });
    });
    s += glow(pth(`M1170 ${H} L1250 ${H}`, { stroke: CYAN, so: 1, sw: 3 }) + `<rect x="1250" y="${H - 21}" width="89" height="42" rx="21" fill="${CYAN}"/>`) + bar(1270, H, 49, 1, 6).replace(NAVY, W);
    s += glow(pth(`M1339 ${H} L1381 ${H}`, { stroke: CYAN, so: 1, sw: 3 }));
    s += `<rect x="1381" y="330" width="130" height="8" rx="4" fill="${NAVY}"/>`;
    [-4, -3, -2, -1, 0, 1, 2, 3].forEach((k) => { const y = H + k * 40; s += k === 0 ? glow(cbar(1381, y, 130, 8)) : bar(1381 + 130 - [110, 90, 125, 80, 0, 130, 100, 95][k + 4], y, [110, 90, 125, 80, 0, 130, 100, 95][k + 4], .8); });
    return { svg: s, to: 1070, node: false };
  },

  // Odoo upgrade plan (17 → 20): version steps rising to the target release on the golden line.
  'odoo-20-upgrade-plan-17-18-19': () => {
    let s = '';
    const steps = [[1076, H + 111], [1186, H + 74], [1296, H + 37], [1406, H]];
    steps.forEach(([x, t], i) => {
      const last = i === 3;
      s += last ? tint(x, t, 105, 722 - t, 6) + glow(`<rect x="${x}" y="${t - 1.5}" width="105" height="3" rx="1.5" fill="${CYAN}"/>`) + `<rect x="${x}" y="${t}" width="105" height="${722 - t}" rx="6" fill="none" stroke="${CYAN}" stroke-width="2"/>` : `<rect x="${x}" y="${t}" width="105" height="${722 - t}" rx="6" fill="${W}" stroke="${NAVY}" stroke-opacity=".7" stroke-width="2"/>` + `<circle cx="${x + 52}" cy="${t + 24}" r="6" fill="${NAVY}"/>`;
    });
    s += pth(`M1128 ${H + 87} L1238 ${H + 50} L1348 ${H + 13} L1458 ${H - 24}`, { so: .45, sw: 2, dash: '3 7' });
    s += `<rect x="1456" y="${H - 110}" width="4" height="110" rx="2" fill="${NAVY}"/>` + glow(`<path d="M1460 ${H - 110} L1500 ${H - 96} L1460 ${H - 82} Z" fill="${CYAN}"/>`);
    return { svg: s, to: 1406, node: false };
  },

  // Odoo 20 inventory valuation changes: stock on the racks, one item revalued on the golden line.
  'odoo-20-inventory-valuation-changes': () => {
    let s = '';
    [1080, 1290, 1500].forEach((x) => { s += `<rect x="${x - 2}" y="320" width="4" height="400" rx="2" fill="${NAVY}" opacity=".85"/>`; });
    const shelves = [440, H + 28, 712];
    shelves.forEach((y) => { s += `<rect x="1076" y="${y}" width="428" height="6" rx="3" fill="${NAVY}" opacity=".85"/>`; });
    const boxAt = (x, w, h, sy, hot) => hot ? glow(`<rect x="${x}" y="${sy - h}" width="${w}" height="${h}" rx="5" fill="${CYAN}"/>`) + `<rect x="${x + w / 2 - 3}" y="${sy - h}" width="6" height="${h}" fill="${W}" opacity=".8"/>` : box(x, sy - h, w, h, { r: 5, so: .7, sw: 2 }) + `<rect x="${x + w / 2 - 2.5}" y="${sy - h}" width="5" height="${h * .4}" fill="${NAVY}" opacity=".5"/>`;
    s += boxAt(1100, 70, 60, 440) + boxAt(1180, 89, 80, 440) + boxAt(1310, 60, 50, 440) + boxAt(1385, 89, 70, 440);
    s += boxAt(1100, 80, 56, H + 28, true) + boxAt(1196, 70, 70, H + 28) + boxAt(1310, 89, 60, H + 28) + boxAt(1410, 70, 80, H + 28);
    s += boxAt(1110, 89, 70, 712) + boxAt(1320, 70, 56, 712) + boxAt(1400, 80, 89, 712);
    s += pth(`M1100 290 L1190 272 L1280 280 L1370 252 L1460 240`, { so: .6, sw: 2 }) + dot(1460, 240, 5, NAVY, 1) + hair(1100, 300, 1460, 300, .15);
    return { svg: s, to: 1100, node: false };
  }
};

// ---- Shared frame ----
const R = 'filterUnits="userSpaceOnUse" x="-400" y="-400" width="2400" height="1700"';
const DEFS = `
<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="4" stitchTiles="stitch"/><feColorMatrix type="matrix" values=".33 .33 .33 0 0  .33 .33 .33 0 0  .33 .33 .33 0 0  0 0 0 0 1"/></filter>
<filter id="glow" ${R}><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="glowW" ${R}><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="bloom" ${R}><feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b1"/><feGaussianBlur in="SourceGraphic" stdDeviation="14" result="b2"/><feGaussianBlur in="SourceGraphic" stdDeviation="34" result="b3"/><feMerge><feMergeNode in="b3"/><feMergeNode in="b3"/><feMergeNode in="b2"/><feMergeNode in="b2"/><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="b10" ${R}><feGaussianBlur stdDeviation="10"/></filter>
<filter id="b40" ${R}><feGaussianBlur stdDeviation="40"/></filter>
<filter id="b100" ${R}><feGaussianBlur stdDeviation="100"/></filter>
<radialGradient id="bg" gradientUnits="userSpaceOnUse" cx="${OX}" cy="${H}" r="900"><stop offset="0" stop-color="#16326E"/><stop offset=".5" stop-color="${NAVY}"/><stop offset="1" stop-color="#060E26"/></radialGradient>
<radialGradient id="vig" gradientUnits="userSpaceOnUse" cx="${OX}" cy="${H}" r="900"><stop offset=".55" stop-color="#050B20" stop-opacity="0"/><stop offset="1" stop-color="#050B20" stop-opacity=".6"/></radialGradient>
<linearGradient id="inFade" x1="${M}" y1="0" x2="${OX - 60}" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${W}" stop-opacity=".08"/><stop offset="1" stop-color="${W}" stop-opacity=".9"/></linearGradient>
<linearGradient id="rowFade" x1="${SEAM}" y1="0" x2="${X0 + 20}" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${CYAN}" stop-opacity=".55"/><stop offset="1" stop-color="${CYAN}" stop-opacity="0"/></linearGradient>
<radialGradient id="landing" gradientUnits="userSpaceOnUse" cx="${SEAM}" cy="${H}" r="160"><stop offset="0" stop-color="${CYAN}" stop-opacity=".30"/><stop offset=".45" stop-color="${CYAN}" stop-opacity=".10"/><stop offset="1" stop-color="${CYAN}" stop-opacity="0"/></radialGradient>
<linearGradient id="streak" x1="${SEAM}" y1="0" x2="${SEAM + 260}" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${CYAN}" stop-opacity=".45"/><stop offset="1" stop-color="${CYAN}" stop-opacity="0"/></linearGradient>
<linearGradient id="flare" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${W}" stop-opacity="0"/><stop offset=".5" stop-color="${W}"/><stop offset="1" stop-color="${W}" stop-opacity="0"/></linearGradient>
<linearGradient id="seam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${CYAN}" stop-opacity="0"/><stop offset=".5" stop-color="${CYAN}"/><stop offset="1" stop-color="${CYAN}" stop-opacity="0"/></linearGradient>
<clipPath id="navyClip"><rect width="${SEAM}" height="900"/></clipPath>
<clipPath id="pageClip"><rect x="${SEAM}" width="${PAGE}" height="900"/></clipPath>`;

function scene(slug) {
  const m = MOTIFS[slug]();
  const r = rng(hash(slug));
  let s = `<rect width="1600" height="900" fill="url(#bg)"/>`;
  s += `<circle cx="${OX}" cy="${H}" r="340" fill="${CYAN}" opacity=".26" filter="url(#b100)"/><circle cx="${OX}" cy="${H}" r="200" fill="${W}" opacity=".30" filter="url(#b100)"/>`;
  // raw transactions (a different scatter per article)
  let inb = '', pts = '';
  for (let i = 0; i < 300; i++) {
    const x = M + Math.pow(r(), 0.85) * (OX - M - 170), y = M + r() * (900 - 2 * M);
    const ty = H + (r() - 0.5) * 70, c1x = x + 120 + r() * 120, c2x = OX - 150 - r() * 70;
    inb += `<path d="M${f(x)} ${f(y)} C ${f(c1x)} ${f(y)}, ${f(c2x)} ${f(ty)}, ${OX - 50} ${f(ty)}" stroke="url(#inFade)" stroke-width="${(0.6 + r() * 0.9).toFixed(2)}" fill="none" opacity="${(0.22 + r() * 0.5).toFixed(2)}"/>`;
    const rad = 1.4 + r() * 3.2, c = r() < .07;
    pts += `<circle cx="${f(x)}" cy="${f(y)}" r="${rad.toFixed(1)}" fill="${c ? CYAN : W}" opacity="${(0.55 + r() * 0.45).toFixed(2)}"${(c || rad > 3.6) ? ' filter="url(#glowW)"' : ''}/>`;
  }
  s += inb + pts;
  s += `<rect width="1600" height="900" fill="url(#vig)"/><rect width="${SEAM}" height="900" filter="url(#grain)" opacity=".05" style="mix-blend-mode:overlay"/>`;
  // the white page
  s += `<rect x="${SEAM}" y="0" width="${PAGE}" height="900" fill="${W}"/>`;
  // ordered lines fan out of the orb and cross the seam
  let navy = '', page = '';
  [-5, -4, -3, -2, -1, 1, 2, 3].forEach((k) => {
    const y = H + k * 34, o = k * 5;
    const d = `M${OX + 60} ${H + o} C ${OX + 200} ${H + o}, ${OX + 230} ${y}, ${OX + 330} ${y} L ${m.rows ? X1 : X0 + 20} ${y}`;
    navy += `<path d="${d}" stroke="${CYAN}" stroke-opacity=".85" stroke-width="2" fill="none"/>`;
    page += `<path d="${d}" stroke="${m.rows ? CYAN : 'url(#rowFade)'}"${m.rows ? ' stroke-opacity=".35"' : ''} stroke-width="1.5" fill="none"/>`;
  });
  s += `<g clip-path="url(#navyClip)">${navy}</g><g clip-path="url(#pageClip)">${page}</g>`;
  // the exception: brilliant white on navy, cyan on the page up to the motif's target
  s += `<g clip-path="url(#navyClip)" filter="url(#bloom)"><rect x="${OX}" y="${H - 2}" width="${SEAM - OX}" height="4" fill="${W}"/></g>`;
  s += `<g clip-path="url(#pageClip)">${m.rows ? `<rect x="${SEAM}" y="${H - 9}" width="${m.to - SEAM}" height="18" fill="${CYAN}" opacity=".12"/>` : ''}<g filter="url(#glow)"><rect x="${SEAM}" y="${H - 1.5}" width="${Math.max(0, m.to - SEAM)}" height="3" fill="${CYAN}"/></g></g>`;
  // light where the exception lands on the page: a soft cyan bloom and a short streak along y = H
  s += `<g clip-path="url(#pageClip)"><ellipse cx="${SEAM}" cy="${H}" rx="200" ry="120" fill="url(#landing)"/><rect x="${SEAM}" y="${H - 7}" width="260" height="14" fill="url(#streak)" filter="url(#b10)"/></g>`;
  // the motif. Navy ink on the page never drops below 55% so nothing on the white reads as grey.
  const ink = m.svg.replace(/<[^>]*#0D1B3E[^>]*>/g, (el) => el.replace(/((?:stroke-)?opacity)="(0?\.\d+)"/g, (_, k, v) => `${k}="${Math.max(+v, .55)}"`));
  s += `<g>${ink}</g>`;
  if (m.node) s += glow(`<circle cx="${m.to}" cy="${H}" r="9" fill="${CYAN}"/>`) + `<circle cx="${m.to}" cy="${H}" r="21" fill="none" stroke="${CYAN}" stroke-width="2"/>`;
  // seam of light at the golden split
  s += `<rect x="${SEAM - 1.5}" y="${M}" width="3" height="${900 - 2 * M}" fill="url(#seam)" filter="url(#glowW)"/>`;
  s += `<circle cx="${SEAM}" cy="${H}" r="6" fill="${W}" filter="url(#bloom)"/>`;
  // the orb
  s += `<circle cx="${OX}" cy="${H}" r="144" fill="none" stroke="${W}" stroke-opacity=".14"/>`;
  s += `<circle cx="${OX}" cy="${H}" r="110" fill="none" stroke="${CYAN}" stroke-opacity=".6" stroke-width="1.5" stroke-dasharray="3 7"/>`;
  s += `<circle cx="${OX}" cy="${H}" r="130" fill="${W}" opacity=".35" filter="url(#b40)"/>`;
  s += `<circle cx="${OX}" cy="${H}" r="89" fill="none" stroke="${CYAN}" stroke-width="3" filter="url(#glowW)"/>`;
  s += `<circle cx="${OX}" cy="${H}" r="68" fill="${W}" opacity=".9" filter="url(#b10)"/>`;
  s += `<circle cx="${OX}" cy="${H}" r="55" fill="${W}" filter="url(#bloom)"/>`;
  s += `<rect x="${OX - 377}" y="${H - 2}" width="754" height="4" rx="2" fill="url(#flare)" filter="url(#glowW)"/>`;
  [-90, 30, 150].forEach((deg) => { const t = deg * Math.PI / 180; s += `<circle cx="${f(OX + 110 * Math.cos(t))}" cy="${f(H + 110 * Math.sin(t))}" r="6" fill="${W}" filter="url(#glowW)"/>`; });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900"><defs>${DEFS}</defs>${s}</svg>`;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const only = process.argv.slice(2);
  const slugs = Object.keys(MOTIFS).filter((s) => !only.length || only.includes(s));
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage();
  await page.goto('about:blank');
  await page.evaluate(async (d) => { const ff = new FontFace('Inter', `url(data:font/woff2;base64,${d})`, { weight: '400 900' }); await ff.load(); document.fonts.add(ff); }, INTER);
  // Rasterise on a canvas and encode with Chrome's own WebP / JPEG encoders (headless page capture
  // fails on this machine, and this path needs no native image tooling). The MFT wordmark is set on
  // the canvas in the site's Inter.
  const render = async (svg, w, h, type, q) => Buffer.from(await page.evaluate(async ({ svg, mark, w, h, type, q, GRID }) => {
    const load = async (src) => { const i = new Image(); i.src = src; await i.decode(); return i; };
    const bg = await load('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)), mk = await load(mark);
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const g = c.getContext('2d');
    const sc = Math.max(w / 1600, h / 900);
    g.setTransform(sc, 0, 0, sc, (w - 1600 * sc) / 2, (h - 900 * sc) / 2);
    g.drawImage(bg, 0, 0, 1600, 900);
    const mh = 34, mw = mh * mk.width / mk.height, x = GRID.C2, yb = 900 - GRID.M;
    g.drawImage(mk, x, yb - mh, mw, mh);
    g.fillStyle = '#0D1B3E'; g.font = '800 26px "Inter"'; g.letterSpacing = '5px';
    g.fillText('MFT', x + mw + 13, yb - mh / 2 + 9.5);
    return c.toDataURL(type, q).split(',')[1];
  }, { svg, mark: MARK, w, h, type, q, GRID }), 'base64');
  for (const slug of slugs) {
    const svg = scene(slug);
    fs.writeFileSync(path.join(OUT, `${slug}-1600.webp`), await render(svg, 1600, 900, 'image/webp', 0.9));
    fs.writeFileSync(path.join(OUT, `${slug}-800.webp`), await render(svg, 800, 450, 'image/webp', 0.9));
    fs.writeFileSync(path.join(OUT, `${slug}-1600.jpg`), await render(svg, 1600, 900, 'image/jpeg', 0.93));
    fs.writeFileSync(path.join(OUT, `${slug}-og.jpg`), await render(svg, 1200, 630, 'image/jpeg', 0.93));
    console.log('wrote', slug);
  }
  await browser.close();
})();
