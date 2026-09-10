// Netlify Function: receives the contact form as JSON and creates a crm.lead in
// Odoo via JSON-RPC. Works unchanged on Netlify; the handler is plain
// Node so it ports to a Cloudflare Worker / Vercel function in minutes.
//
// Environment variables (set in the hosting dashboard, never in git):
//   ODOO_URL       e.g. https://fin-tech.odoo.com
//   ODOO_DB        database name
//   ODOO_LOGIN     API user login (a dedicated "Website Leads" user with CRM rights only)
//   ODOO_API_KEY   that user's API key (Odoo → Preferences → Account Security)
//   ODOO_TEAM_ID   optional: crm.team id to assign
//   ODOO_SOURCE_ID optional: utm.source id (e.g. "Website")
//   ALLOWED_ORIGIN optional: restrict CORS to the site origin
//
// If ODOO_* are not set, the function still returns 200 and logs the lead so
// the site can be deployed before the CRM link is decided.

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

async function createOdooLead(lead) {
  const { ODOO_URL, ODOO_DB, ODOO_LOGIN, ODOO_API_KEY, ODOO_TEAM_ID, ODOO_SOURCE_ID } = process.env;
  if (!ODOO_URL || !ODOO_DB || !ODOO_LOGIN || !ODOO_API_KEY) return null;
  const endpoint = ODOO_URL.replace(/\/$/, '') + '/jsonrpc';
  const uid = await rpc(endpoint, { service: 'common', method: 'login', args: [ODOO_DB, ODOO_LOGIN, ODOO_API_KEY] });
  if (!uid) throw new Error('Odoo login failed');
  const service = SERVICE_LABELS[lead.service] || lead.service || '';
  const vals = {
    name: `${service || 'Website'} — ${lead.company || lead.name}`,
    type: 'opportunity',
    contact_name: lead.name,
    partner_name: lead.company,
    email_from: lead.email,
    phone: lead.phone || false,
    description: [
      lead.message,
      '',
      `Service: ${service}`,
      `Country: ${lead.country}`,
      `Language: ${lead.lang}`,
      `Page: ${lead.page}`
    ].join('\n')
  };
  if (ODOO_TEAM_ID) vals.team_id = Number(ODOO_TEAM_ID);
  if (ODOO_SOURCE_ID) vals.source_id = Number(ODOO_SOURCE_ID);
  return rpc(endpoint, {
    service: 'object',
    method: 'execute_kw',
    args: [ODOO_DB, uid, ODOO_API_KEY, 'crm.lead', 'create', [vals]]
  });
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
    const id = await createOdooLead(lead);
    if (id == null) console.log('lead (Odoo not configured):', JSON.stringify(lead));
    return json(200, { ok: true, id: id || null }, origin);
  } catch (e) {
    console.error('Odoo error:', e.message);
    return json(502, { error: 'crm' }, origin);
  }
};
