// SEG Academy: the hook set on each article's artwork (hero + og:image). One line pair per slug,
// taken from the article's own dek or core question (evidence or silence, a flag not an accusation,
// no figures the article does not document, no long dashes). Used by scripts/article-images.js
// (text on the navy field) and by blog-posts-academy.js (image alt).
// motif = an existing artwork motif in scripts/article-images.js reused for the page side.
module.exports = {
  'academy-ledger-integrity': { hook: ['الميزان متوازن', 'والدفتر اللي تحته محدش شافه'], motif: 'ai-in-accounting-guide-2026' },
  'academy-bank-reconciliation': { hook: ['التسوية «خلصانة» على الشاشة', 'والدفاتر بتقول حاجة تانية'], motif: 'bank-reconciliation-controls' },
  'academy-procure-to-pay': { hook: ['حساب المورد البنكي اتغيّر', 'قبل الدفعة بأسبوع؟'], motif: 'three-way-match-purchase-controls' },
  'academy-access-and-sod': { hook: ['أخطر صلاحية في شركتك', 'مع يوزر محدش بيستخدمه'], motif: 'segregation-of-duties-odoo' },
  'academy-period-cut-off': { hook: ['قيد يتنقل يوم واحد', 'يغيّر ربح الشهر كله'], motif: 'month-end-close-checklist-odoo' },
  'academy-aging-analysis': { hook: ['لسه بتبيع', 'لعميل مش بيدفع؟'], motif: 'thirteen-week-cash-flow-forecast' },
  'academy-financial-statements-review': { hook: ['القوائم طلعت بضغطة زرار', 'مين راجعها قبل ما تتبعت؟'], motif: 'ai-month-end-close-financial-reporting' },
  'academy-order-to-cash': { hook: ['البيع اتعمل', 'بس الفلوس هتيجي كاملة؟'], motif: 'ai-journal-entries-bank-reconciliation' },
  'academy-liquidity-going-concern': { hook: ['بتكسب على الورق', 'والخزنة بتقول كلام تاني'], motif: 'virtual-cfo-vs-full-time-cfo' },
  'academy-inventory-valuation': { hook: ['رقم المخزون شكله مظبوط', 'بس اتكوّن إزاي؟'], motif: 'odoo-inventory-valuation-fifo-avco' },
  'academy-egypt-tax-compliance': { hook: ['الفاتورة اترحّلت في أودو', 'بس المنظومة قبلتها؟'], motif: 'egypt-eta-einvoicing-odoo-mistakes' },
  'academy-saudi-tax-compliance': { hook: ['الفاتورة اترحّلت في أودو', 'بس منصة «فاتورة» قبلتها؟'], motif: 'zatca-phase-two-odoo-checklist' },
  'academy-tax-file-readiness': { hook: ['مأمور الفحص مش هيبدأ من الإقرار', 'هيبدأ من السيستم'], motif: 'egypt-vat-return-odoo' },
  'academy-related-parties': { hook: ['مفيش خانة «طرف ذو علاقة»', 'بس البيانات بتقول كتير'], motif: 'ai-financial-fraud-detection' },
  'academy-accounting-treatment-fixed-assets': { hook: ['الرقم متسجّل صح', 'في المكان الغلط'], motif: 'odoo-accounting-implementation-steps' },
  'academy-zakat': { hook: ['وعاء الزكاة مش رقم بيتكتب', 'ده رقم يطلع من دفاترك'], motif: 'zakat-vs-corporate-income-tax-saudi' },
  'academy-pos-sales': { hook: ['قيد الجلسة رقم واحد', 'والمشاكل كلها جوه الطلبات'], motif: 'full-population-testing-ai-vs-sampling' },
  'academy-manufacturing-quality': { hook: ['المنتج دخل المخزن', 'والمواد اللي اتصرفت عليه فين؟'], motif: 'continuous-audit-eleven-months' },
  'academy-local-content': { hook: ['نسبة المحتوى المحلي', 'احسبها من دفاترك قبل غيرك'], motif: 'agents-draft-people-approve' },
  'academy-odoo-configuration': { hook: ['أودو شغّال من سنين', 'مين راجع إعداداته؟'], motif: 'connect-ai-to-odoo-continuous-audit' },
  'academy-odoo-adoption': { hook: ['اشتريت نظام متكامل', 'وبتشتغل عليه كدفتر يومية'], motif: 'what-is-internal-audit' },
  'academy-odoo-best-practice': { hook: ['إعداد ينفع شركة تجارة', 'ممكن يبوّظ حسابات مصنع'], motif: 'continuous-auditing-ai-vs-traditional-audit' }
};
