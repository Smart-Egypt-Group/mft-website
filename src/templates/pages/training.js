// Graduate training program (MFT Graduate Program): landing page with the application form, and the
// admission test page. The form posts to Odoo (erp.seg-audit.com/mft/form/training, module
// mft_web_forms), which creates the hr.applicant and returns a quiz token; the test page runs the
// timed admission quiz against /mft/quiz/*. Questions, pass marks and emails are edited in Odoo
// (Recruitment → Configuration → برنامج التدريب), not here.
//   training/{ar,en}.html       page body (inside <main>), wrapped by the site layout
//   training/test-{ar,en}.html  standalone, distraction-free test page ({{V}} = build id)
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'training');
const read = (f) => fs.readFileSync(path.join(DIR, f), 'utf8');

const META = {
  ar: {
    title: 'برنامج التدريب العملي | Modern Financial Technology',
    description: 'برنامج تدريب عملي مجاني لمدة 30 يومًا في المحاسبة أو تنفيذ Odoo ERP لخريجي التجارة، شعبة المحاسبة، والمتميزون ينضمون لفريق MFT.',
    alt: 'برنامج MFT للتدريب: مسار المحاسبة ومسار تنفيذ Odoo ERP'
  },
  en: {
    title: 'Graduate Program | Modern Financial Technology',
    description: 'A free, hands-on 30-day training program in accounting or Odoo ERP implementation for commerce graduates (accounting). Top performers join the MFT team.',
    alt: 'MFT Graduate Program: accounting track and Odoo ERP implementation track'
  }
};

function landing(ctx) {
  const m = META[ctx.lang];
  return {
    title: m.title,
    description: m.description,
    ogImage: { url: `/assets/img/training/program-${ctx.lang}.png`, width: 1200, height: 630, alt: m.alt },
    body: read(`${ctx.lang}.html`),
    bodyClass: 'page-training',
    motion: false,
    styles: ['training.css'],
    scripts: ['training.js']
  };
}

// Full HTML document (no site header/footer): returned as-is by build.js for pages marked raw.
function test(ctx) {
  return read(`test-${ctx.lang}.html`).replace(/\{\{V\}\}/g, ctx.buildId);
}

module.exports = { landing, test };
