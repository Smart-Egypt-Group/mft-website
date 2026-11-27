/* برنامج التدريب: إرسال نموذج التقديم إلى Odoo (mft_web_forms) ثم الانتقال لاختبار القبول. */
(function () {
  'use strict';
  var API = 'https://erp.seg-audit.com';
  var form = document.getElementById('training-form');
  if (!form) return;
  var done = document.getElementById('training-done');
  var status = form.querySelector('.form-status');
  var btn = form.querySelector('button[type="submit"]');
  var MAX = 5 * 1024 * 1024;
  var ERR = {
    missing: 'برجاء استكمال الحقول المطلوبة.',
    phone: 'رقم الموبايل غير صحيح.',
    email: 'البريد الإلكتروني غير صحيح.',
    cv_type: 'السيرة الذاتية يجب أن تكون PDF أو Word.',
    cv_size: 'حجم السيرة الذاتية أكبر من 5 ميجابايت.',
    busy: 'يوجد ضغط على الخادم الآن، حاول مرة أخرى بعد دقائق.',
    consent: 'برجاء الموافقة على استخدام البيانات.',
    year: 'سنة التخرج غير صحيحة.'
  };
  var FAIL = 'تعذّر الإرسال الآن. حاول مرة أخرى، أو راسلنا على واتساب ‎+20 106 239 9941 أو info@seg-audit.com.';

  try {
    var qs = new URLSearchParams(location.search);
    var tr = qs.get('track');
    if (tr === 'accounting' || tr === 'odoo') form.track.value = tr;
  } catch (e) {}

  function say(text, kind) {
    status.textContent = text || '';
    status.className = 'form-status' + (kind ? ' is-' + kind : '');
    if (text) status.focus();
  }
  function invalid(field) { if (field) { field.setAttribute('aria-invalid', 'true'); field.focus(); } }
  function validate() {
    [].forEach.call(form.querySelectorAll('[aria-invalid]'), function (el) { el.removeAttribute('aria-invalid'); });
    var f = form.elements;
    if (!f.name.value.trim()) return invalid(f.name), ERR.missing;
    if (!/^[0-9+()\-\s]{7,20}$/.test(f.phone.value.trim())) return invalid(f.phone), ERR.phone;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.value.trim())) return invalid(f.email), ERR.email;
    if (!f.track.value) return invalid(f.track), ERR.missing;
    var y = parseInt(f.graduation_year.value, 10);
    if (!y || y < 1990 || y > 2026) return invalid(f.graduation_year), ERR.year;
    var cv = f.cv.files && f.cv.files[0];
    if (cv) {
      if (!/\.(pdf|docx?)$/i.test(cv.name)) return invalid(f.cv), ERR.cv_type;
      if (cv.size > MAX) return invalid(f.cv), ERR.cv_size;
    }
    if (!f.consent.checked) return invalid(f.consent), ERR.consent;
    return '';
  }
  function showDone(data) {
    form.hidden = true;
    done.hidden = false;
    var n = done.querySelector('[data-name]');
    if (n) n.textContent = form.elements.name.value.trim().split(/\s+/)[0];
    var link = done.querySelector('[data-quiz-link]');
    if (data.quiz_token) {
      link.href = '/ar/training/test/?t=' + encodeURIComponent(data.quiz_token);
    } else {
      link.hidden = true;
      var later = done.querySelector('[data-later]');
      if (later) later.textContent = 'سيصلك رابط اختبار القبول على بريدك الإلكتروني.';
    }
    done.focus();
    try { if (window.fbq) window.fbq('track', 'SubmitApplication'); } catch (e) {}
  }
  function send() {
    var err = validate();
    if (err) return say(err, 'error');
    var fd = new FormData(form);
    if (!(fd.get('cv') && fd.get('cv').size)) fd.delete('cv');
    fd.append('lang', 'ar');
    try {
      var qs = new URLSearchParams(location.search);
      ['utm_source', 'utm_medium', 'utm_campaign'].forEach(function (k) { if (qs.get(k)) fd.append(k, qs.get(k)); });
    } catch (e) {}
    btn.disabled = true;
    say('جارٍ الإرسال…');
    fetch(API + '/mft/form/training', { method: 'POST', body: fd })
      .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
      .then(function (j) {
        btn.disabled = false;
        if (j && j.ok) { say(''); showDone(j); }
        else say(ERR[j && j.error] || FAIL, 'error');
      })
      .catch(function () { btn.disabled = false; say(FAIL, 'error'); });
  }
  // نلتقط الإرسال قبل أي معالج عام للنماذج في main.js
  document.addEventListener('submit', function (e) {
    if (e.target !== form) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    send();
  }, true);
})();
