// Netlify Function: receives the contact form as JSON and records the lead.
// Plain Node — ports to a Cloudflare Worker / Vercel function in minutes.
//
// Delivery paths, tried in this order (all optional; the first configured wins):
//
//   1. ODOO_URL + ODOO_DB + ODOO_LOGIN + ODOO_API_KEY
//        JSON-RPC → crm.lead (type opportunity). Needs a dedicated API user.
//        BLOCKED as of 10 Sep 2026: the VPS database bug prevents creating any
//        new user on erp.seg-audit.com (see project_odoo_fintech memo).
//
//   2. ODOO_WEBSITE_FORM_URL   e.g. https://fin-tech.odoo.com
//        Server-side POST to Odoo's public website form controller
//        (/website/form/crm.lead), the same route the Odoo site's own contact
//        form uses. Needs NO API user, so it works around the bug above.
//        Enable by setting the variable; verify one lead in CRM after enabling.
//
//   3. LEAD_WEBHOOK_URL         any URL that accepts the JSON payload (Zapier,
//        Make, Slack incoming webhook, n8n…).
//
//   0. Nothing configured → the lead is written to the function log and 200 is
//        returned, so the site works before the CRM link is decided. Check
//        Netlify → Functions → lead → Logs until a path above is enabled.
//
// Other variables: ODOO_TEAM_ID, ODOO_SOURCE_ID (optional ids for path 1),
// ALLOWED_ORIGIN (restrict CORS to the site origin).

const SERVICE_LABELS = {
  'odoo-erp': 'Odoo ERP Implementation',
  'internal-audit': 'Internal Audit',
  'virtual-cfo': 'Virtual CFO',
  'financial-consulting': 'Financial Consulting',
  'business-analysis': 'Business Analysis',
  training: 'User Training',
  'technical-support': 'Technical Support',
  unsure: 'Not sure yet'
};

const json = (status, body, origin) => ({
  statusCode: status,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  },
  body: JSON.stringify(body)
});

function describe(lead) {
  const service = SERVICE_LABELS[lead.service] || lead.service || '';
  return {
    service,
    title: `${service || 'Website'} — ${lead.company || lead.name}`,
    description: [lead.message, '', `Service: ${service}`, `Country: ${lead.country}`, `Language: ${lead.lang}`, `Page: ${lead.page}`].join('\n')
  };
}

/* ---- Path 1: JSON-RPC with an API user ---- */
async function rpc(url, params) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', method: 'call', params, id: Date.now() })
  });
  const data = await res.json();
  if (data.error) throw new Error(JSON.stringify(data.error.data || data.error));
  return data.result;
}

async function viaJsonRpc(lead) {
  const { ODOO_URL, ODOO_DB, ODOO_LOGIN, ODOO_API_KEY, ODOO_TEAM_ID, ODOO_SOURCE_ID } = process.env;
  if (!ODOO_URL || !ODOO_DB || !ODOO_LOGIN || !ODOO_API_KEY) return null;
  const endpoint = ODOO_URL.replace(/\/$/, '') + '/jsonrpc';
  const uid = await rpc(endpoint, { service: 'common', method: 'login', args: [ODOO_DB, ODOO_LOGIN, ODOO_API_KEY] });
  if (!uid) throw new Error('Odoo login failed');
  const d = describe(lead);
  const vals = {
    name: d.title,
    type: 'opportunity',
    contact_name: lead.name,
    partner_name: lead.company,
    email_from: lead.email,
    phone: lead.phone || false,
    description: d.description
  };
  if (ODOO_TEAM_ID) vals.team_id = Number(ODOO_TEAM_ID);
  if (ODOO_SOURCE_ID) vals.source_id = Number(ODOO_SOURCE_ID);
  const id = await rpc(endpoint, { service: 'object', method: 'execute_kw', args: [ODOO_DB, uid, ODOO_API_KEY, 'crm.lead', 'create', [vals]] });
  return { path: 'jsonrpc', id };
}

/* ---- Path 2: Odoo public website form (no API user needed) ---- */
async function viaWebsiteForm(lead) {
  const base = (process.env.ODOO_WEBSITE_FORM_URL || '').replace(/\/$/, '');
  if (!base) return null;
  // Any public page carries a csrf_token and sets the session cookie.
  const page = await fetch(base + '/contactus', { headers: { 'Accept-Language': lead.lang || 'en' } });
  const html = await page.text();
  const m = html.match(/csrf_token:\s*'([^']+)'/) || html.match(/name="csrf_token"\s+value="([^"]+)"/);
  if (!m) throw new Error('csrf_token not found on ' + base);
  const cookie = (page.headers.get('set-cookie') || '').split(',').map((c) => c.split(';')[0].trim()).filter(Boolean).join('; ');
  const d = describe(lead);
  const form = new URLSearchParams({
    csrf_token: m[1],
    name: d.title,
    contact_name: lead.name,
    partner_name: lead.company,
    email_from: lead.email,
    phone: lead.phone || '',
    description: d.description
  });
  const res = await fetch(base + '/website/form/crm.lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'X-Requested-With': 'XMLHttpRequest', Cookie: cookie },
    body: form.toString()
  });
  const text = await res.text();
  if (!res.ok || /"error"|error_fields/.test(text)) throw new Error('website form rejected: ' + text.slice(0, 200));
  let id = null;
  try { id = JSON.parse(text).id || null; } catch { /* Odoo returns JSON {id: n}; ignore parse issues */ }
  return { path: 'website-form', id };
}

/* ---- Path 3: generic webhook ---- */
async function viaWebhook(lead) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return null;
  const d = describe(lead);
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...lead, ...d }) });
  if (!res.ok) throw new Error('webhook HTTP ' + res.status);
  return { path: 'webhook', id: null };
}

exports.handler = async (event) => {
  const origin = process.env.ALLOWED_ORIGIN || '*';
  if (event.httpMethod === 'OPTIONS') return json(204, {}, origin);
  if (event.httpMethod !== 'POST') return json(405, { error: 'method' }, origin);

  let lead;
  try { lead = JSON.parse(event.body || '{}'); } catch { return json(400, { error: 'json' }, origin); }

  const clean = (s, n = 500) => String(s || '').trim().slice(0, n);
  lead = {
    name: clean(lead.name, 120),
    company: clean(lead.company, 120),
    email: clean(lead.email, 160),
    phone: clean(lead.phone, 40),
    country: clean(lead.country, 10),
    service: clean(lead.service, 40),
    message: clean(lead.message, 4000),
    lang: clean(lead.lang, 5),
    page: clean(lead.page, 200),
    consent: lead.consent === true
  };
  if (!lead.name || !lead.company || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email) || !lead.consent) {
    return json(422, { error: 'validation' }, origin);
  }

  try {
    const result = (await viaJsonRpc(lead)) || (await viaWebsiteForm(lead)) || (await viaWebhook(lead));
    if (!result) console.log('LEAD (no delivery path configured):', JSON.stringify(lead));
    else console.log('LEAD delivered via', result.path, result.id == null ? '' : '#' + result.id);
    return json(200, { ok: true, id: result ? result.id : null }, origin);
  } catch (e) {
    // Never lose a lead: log it in full before reporting the failure.
    console.error('LEAD delivery failed:', e.message, JSON.stringify(lead));
    return json(502, { error: 'crm' }, origin);
  }
};
