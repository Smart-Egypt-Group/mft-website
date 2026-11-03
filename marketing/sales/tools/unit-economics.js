#!/usr/bin/env node
// SEG Audit unit economics: one model for every sales motion, checked against the CEO's reference
// guardrails (CAC <= $2,500, ARPA $6,000, NRR >= 115%, payback ~6 months).
//
//   node marketing/sales/tools/unit-economics.js                 # reference model
//   node marketing/sales/tools/unit-economics.js --gm 0.70       # what if gross margin is 70%?
//   node marketing/sales/tools/unit-economics.js --arpa 4800 --json
//
// Every input below is either a CEO reference figure (REF) or an ASSUMPTION to be replaced with
// actuals from Odoo (invoices, expenses, timesheets) once there are paying accounts. Nothing here
// is a measured result.

const REF = { cacMax: 2500, arpa: 6000, nrrMin: 1.15, paybackTarget: 6 };

// List prices from seg-audit main@3d0133c8, audit-engine/app/billing/plans.py (monthly, EGP is the only
// charge currency; SAR is display-only). Annual billing is priced 20% below 12 months (not advertised as a discount).
const PLANS = [
  { key: 'starter',    name: 'المبتدئة Starter',     egp: 2000,  sar: 300,   companies: 1 },
  { key: 'standard',   name: 'المتوسطة Standard',    egp: 10000, sar: 1500,  companies: 1 },
  { key: 'advanced',   name: 'المتقدّمة Advanced',    egp: 20000, sar: 3000,  companies: 1 },
  { key: 'enterprise', name: 'المؤسسات Enterprise',  egp: 75000, sar: 11250, companies: 25 },
];

const DEFAULTS = {
  fx: 56,                  // ASSUMPTION: EGP per USD (bank rate ~56.0 on 29 Oct 2026). Use the CBE rate of the day.
  sarFx: 3.75,             // SAR per USD (peg)
  arpa: REF.arpa,          // REF: annual recurring revenue per paying account, USD
  gm: 0.83,                // ASSUMPTION: subscription gross margin. 0.83 is what the REF figures imply
                           // (2,500 / (6,000 / 12 × 6) = 0.833). Named-reviewer time on every report is COGS.
  grr: 0.88,               // ASSUMPTION: gross revenue retention, used only for the lifetime view
  nrr: REF.nrrMin,         // REF target
};

// Per-motion assumptions. cac = fully loaded acquisition cost per NEW paying account in that motion
// (media + tools + people time + partner payouts that count as acquisition cost). netShare = share of
// list ARPA that MFT keeps (reseller discounts are contra-revenue, not CAC). acvMult = account size
// relative to the reference ARPA (ABM accounts are multi-entity).
const MOTIONS = [
  { key: 'plg',       name: 'PLG: free trial-balance check → self-serve / assisted', cac: 900,  netShare: 1.00, acvMult: 1 },
  { key: 'referral',  name: 'Partner referral (20% of first-year net revenue)',     cac: 1200 + 300, netShare: 1.00, acvMult: 1 },
  { key: 'reseller',  name: 'Partner resale (partner buys at 30% off list)',        cac: 600,  netShare: 0.70, acvMult: 1 },
  { key: 'practice',  name: 'Practice partner (firm runs it for its clients)',      cac: 400,  netShare: 0.65, acvMult: 1 },
  { key: 'founder',   name: 'Founder-led + LinkedIn social selling',                cac: 1500, netShare: 1.00, acvMult: 1.5 },
  { key: 'outbound',  name: 'Outbound multi-touch + nurture + retargeting',         cac: 2400, netShare: 1.00, acvMult: 1 },
  { key: 'abm',       name: 'ABM (groups, multi-entity, audit firms)',              cac: 8000, netShare: 1.00, acvMult: 4 },
];

function args(argv) {
  const o = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--json') o.json = true;
    else if (a.startsWith('--')) o[a.slice(2)] = Number(argv[++i]);
  }
  return o;
}

function model(input = {}) {
  const p = { ...DEFAULTS, ...input };
  const rows = MOTIONS.map(m => {
    const acv = p.arpa * m.acvMult * m.netShare;           // what MFT books per year
    const gpMonth = (acv / 12) * p.gm;                       // gross profit per month
    const payback = m.cac / gpMonth;                         // months
    const allowedCac = REF.paybackTarget * gpMonth;          // CAC that still pays back in 6 months
    return {
      motion: m.key, name: m.name, cac: m.cac, acv: Math.round(acv),
      paybackMonths: +payback.toFixed(1), allowedCac: Math.round(allowedCac),
      ok: payback <= REF.paybackTarget + 0.5,
    };
  });
  // Lifetime view: a cohort's revenue grows at NRR; GRR bounds the downside. Five-year horizon, no discounting.
  let rev = 0, yr = p.arpa;
  for (let y = 0; y < 5; y++) { rev += yr; yr *= p.nrr; }
  const ltv5 = rev * p.gm;
  const plans = PLANS.map(pl => ({
    plan: pl.key, name: pl.name,
    egyptUsdYear: Math.round(pl.egp * 12 / p.fx), gulfUsdYear: Math.round(pl.sar * 12 / p.sarFx),
  }));
  // Share of Enterprise accounts needed for the blended ARPA to reach the reference, if the rest are Advanced (Egypt list).
  const adv = plans[2].egyptUsdYear, ent = plans[3].egyptUsdYear, std = plans[1].egyptUsdYear;
  const mix = { enterpriseShareIfRestAdvanced: +((p.arpa - adv) / (ent - adv)).toFixed(3),
                enterpriseShareIfRestStandard: +((p.arpa - std) / (ent - std)).toFixed(3) };
  return {
    inputs: p, ref: REF, plans, mix,
    impliedGm: +(REF.cacMax / (REF.arpa / 12 * REF.paybackTarget)).toFixed(3),
    referencePaybackMonths: +(REF.cacMax / (p.arpa / 12 * p.gm)).toFixed(1),
    ltv5yr: Math.round(ltv5), ltvToCac: +(ltv5 / REF.cacMax).toFixed(1),
    rows,
  };
}

if (require.main === module) {
  const a = args(process.argv);
  const r = model(Object.fromEntries(Object.entries(a).filter(([k]) => k in DEFAULTS)));
  if (a.json) { console.log(JSON.stringify(r, null, 2)); process.exit(0); }
  const usd = n => '$' + n.toLocaleString('en-US');
  console.log(`Inputs: ARPA ${usd(r.inputs.arpa)} · GM ${(r.inputs.gm * 100).toFixed(0)}% · NRR ${(r.inputs.nrr * 100).toFixed(0)}% · GRR ${(r.inputs.grr * 100).toFixed(0)}%`);
  console.log(`Reference: CAC ${usd(REF.cacMax)} pays back in ${r.referencePaybackMonths} months (target ${REF.paybackTarget}); the reference implies GM ${(r.impliedGm * 100).toFixed(1)}%`);
  console.log('\nList price per year in USD (Egypt EGP list ÷ fx | Gulf SAR display list ÷ 3.75):');
  for (const x of r.plans) console.log(`  ${x.name.padEnd(22)} ${usd(x.egyptUsdYear).padStart(8)} | ${usd(x.gulfUsdYear).padStart(8)}`);
  console.log(`To average ${usd(r.inputs.arpa)} on the Egypt list: ${(r.mix.enterpriseShareIfRestAdvanced * 100).toFixed(0)}% Enterprise if the rest are Advanced, ${(r.mix.enterpriseShareIfRestStandard * 100).toFixed(0)}% if the rest are Standard.\n`);
  console.log(`5-year gross profit per account at NRR: ${usd(r.ltv5yr)} (${r.ltvToCac}× the CAC ceiling)\n`);
  const pad = (s, n) => String(s).padEnd(n);
  console.log(pad('Motion', 58) + pad('CAC', 9) + pad('Net ACV', 10) + pad('Payback', 10) + pad('CAC allowed @6m', 17) + 'OK');
  for (const x of r.rows) console.log(pad(x.name, 58) + pad(usd(x.cac), 9) + pad(usd(x.acv), 10) + pad(x.paybackMonths + ' m', 10) + pad(usd(x.allowedCac), 17) + (x.ok ? 'yes' : 'NO'));
}

module.exports = { model, REF, DEFAULTS, MOTIONS, PLANS };
