/* شاشة الاختبار: سؤال واحد في كل مرة، والوقت يُحسب على السيرفر (mft_web_forms /mft/quiz/*). */
(function () {
  'use strict';
  var API = 'https://erp.seg-audit.com';
  var app = document.getElementById('quiz-app');
  var totalBox = document.querySelector('[data-total]');
  var totalTime = document.querySelector('[data-total-time]');
  var LET = { a: 'أ', b: 'ب', c: 'ج', d: 'د' };
  var token = '';
  try { token = new URLSearchParams(location.search).get('t') || ''; } catch (e) {}
  var cur = null, choice = null, qEnd = 0, tEnd = 0, timer = null, busy = false, lastBlur = 0;

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function mmss(sec) { sec = Math.max(0, Math.ceil(sec)); var m = Math.floor(sec / 60), s = sec % 60; return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s; }
  function post(path, extra) {
    var fd = new FormData();
    fd.append('t', token);
    for (var k in (extra || {})) if (extra[k] != null) fd.append(k, extra[k]);
    return fetch(API + path, { method: 'POST', body: fd }).then(function (r) { return r.json(); });
  }
  function card(html, cls) { app.innerHTML = '<div class="card qz-card ' + (cls || 'qz-center') + '">' + html + '</div>'; }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }

  function render(d) {
    busy = false;
    if (!d || d.ok === false) {
      stop(); totalBox.hidden = true;
      return card('<h1>الرابط غير صالح</h1><p>تأكد من فتح الرابط كما وصلك في البريد الإلكتروني، أو تواصل معنا على واتساب <span class="lat" dir="ltr">+20 106 239 9941</span>.</p>');
    }
    cur = d;
    if (d.state === 'pending') return intro(d);
    if (d.state === 'done') {
      stop(); totalBox.hidden = true;
      window.onbeforeunload = null;
      return card('<p class="qz-big">✓</p><h1>تم استلام إجاباتك</h1><p>شكرًا لك. ستصلك نتيجة الطلب والخطوة التالية على بريدك الإلكتروني.</p><p><a class="btn btn-ghost" href="/ar/training/">العودة لصفحة البرنامج</a></p>');
    }
    if (d.state === 'expired') {
      stop(); totalBox.hidden = true;
      return card('<h1>انتهت صلاحية الرابط</h1><p>انتهت مدة صلاحية رابط الاختبار دون استكماله. يمكنك التقديم مرة أخرى في الدورات القادمة.</p>');
    }
    question(d);
  }

  function intro(d) {
    totalBox.hidden = true;
    var who = d.name ? '<p>أهلًا <b>' + esc(d.name.split(' ')[0]) + '</b>،</p>' : '';
    card(who + '<h1>' + esc(d.quiz) + '</h1>' +
      '<ul class="qz-rules">' +
      '<li><b>' + esc(d.questions) + '</b> سؤال اختيار من متعدد.</li>' +
      '<li><b>' + esc(d.seconds_per_question) + '</b> ثانية لكل سؤال، وينتقل تلقائيًا للسؤال التالي عند انتهاء الوقت.</li>' +
      '<li>مدة الاختبار <b>' + esc(Math.round(d.minutes)) + '</b> دقيقة، ومحاولة واحدة فقط.</li>' +
      '<li>لا يمكن الرجوع لسؤال سابق.</li>' +
      '<li>لا تغادر الصفحة أو تفتح نوافذ أخرى أثناء الحل؛ مغادرة الصفحة تُسجّل.</li>' +
      '</ul><p><button class="btn btn-primary btn-lg" type="button" data-start>ابدأ الاختبار الآن</button></p>');
    app.querySelector('[data-start]').addEventListener('click', function (e) {
      e.target.disabled = true;
      post('/mft/quiz/start').then(render).catch(netErr);
    });
  }

  function question(d) {
    totalBox.hidden = false;
    choice = null;
    var now = Date.now();
    qEnd = now + d.seconds_left * 1000;
    tEnd = now + d.total_seconds_left * 1000;
    var C = 2 * Math.PI * 30;
    var opts = d.options.map(function (o, i) {
      return '<li><button type="button" class="qz-opt" aria-pressed="false" data-k="' + esc(o.key) + '"><span class="l">' + 'أبجد'.charAt(i) + '</span><span>' + esc(o.label) + '</span></button></li>';
    }).join('');
    app.innerHTML =
      '<div class="qz-meta"><span>' + esc(d.track || '') + '</span><span>السؤال <b class="lat">' + (d.index + 1) + '</b> من <b class="lat">' + d.total + '</b></span></div>' +
      '<div class="qz-progress"><i style="width:' + Math.round(100 * d.index / d.total) + '%"></i></div>' +
      '<div class="card qz-card"><div class="qz-head"><p class="qz-q">' + esc(d.question) + '</p>' +
      '<div class="qz-ring" aria-label="الوقت المتبقي للسؤال"><svg viewBox="0 0 68 68"><circle class="bg" cx="34" cy="34" r="30"/><circle class="fg" cx="34" cy="34" r="30" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="0"/></svg><span data-qs>' + d.seconds_left + '</span></div></div>' +
      '<ul class="qz-opts">' + opts + '</ul>' +
      '<div class="qz-foot"><span class="qz-hint">ينتقل تلقائيًا عند انتهاء الوقت · لا يمكن الرجوع</span><button class="btn btn-primary btn-lg" type="button" data-next disabled>' + (d.index + 1 === d.total ? 'إنهاء الاختبار' : 'التالي') + '</button></div></div>';
    [].forEach.call(app.querySelectorAll('.qz-opt'), function (b) {
      b.addEventListener('click', function () {
        if (busy) return;
        [].forEach.call(app.querySelectorAll('.qz-opt'), function (x) { x.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
        choice = b.getAttribute('data-k');
        app.querySelector('[data-next]').disabled = false;
      });
    });
    app.querySelector('[data-next]').addEventListener('click', function () { submit(); });
    var ring = app.querySelector('.qz-ring'), fg = app.querySelector('.qz-ring .fg'), qs = app.querySelector('[data-qs]');
    var per = (d.seconds_per_question || 90) * 1000;
    stop();
    timer = setInterval(function () {
      var t = Date.now();
      var left = (qEnd - t) / 1000, tot = (tEnd - t) / 1000;
      qs.textContent = Math.max(0, Math.ceil(left));
      fg.setAttribute('stroke-dashoffset', (C * (1 - Math.max(0, qEnd - t) / per)).toFixed(1));
      ring.classList.toggle('is-low', left <= 10);
      totalTime.textContent = mmss(tot);
      totalBox.classList.toggle('is-low', tot <= 120);
      if (left <= 0) submit(true);
    }, 250);
    window.onbeforeunload = function () { return 'الاختبار جارٍ'; };
  }

  function submit(timeout) {
    if (busy || !cur) return;
    busy = true;
    stop();
    [].forEach.call(app.querySelectorAll('button'), function (b) { b.disabled = true; });
    post('/mft/quiz/answer', { index: cur.index, choice: timeout && !choice ? '' : choice }).then(render).catch(netErr);
  }

  function netErr() {
    busy = false;
    card('<h1>انقطع الاتصال</h1><p>تأكد من الإنترنت ثم اضغط «متابعة». الوقت يُحسب على الخادم.</p><p><button class="btn btn-primary" type="button" data-retry>متابعة</button></p>');
    app.querySelector('[data-retry]').addEventListener('click', load);
  }
  function load() { post('/mft/quiz/state').then(render).catch(netErr); }

  function blur() {
    if (!cur || cur.state !== 'running') return;
    var t = Date.now();
    if (t - lastBlur < 3000) return;
    lastBlur = t;
    post('/mft/quiz/event', { type: 'blur' }).catch(function () {});
  }
  document.addEventListener('visibilitychange', function () { if (document.hidden) blur(); });
  window.addEventListener('blur', blur);

  if (!token) return render(null);
  load();
})();
