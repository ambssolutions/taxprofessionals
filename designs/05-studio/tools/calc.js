/* Tax Professionals: client calculators.
   Every figure lives in TAX_CONFIG below. Update it each April and re-run tools/calc.test.mjs.
   The maths functions are pure (no DOM) so the node tests can load them. */
(function (root) {
  'use strict';

  var IRD = 'https://www.ird.govt.nz';
  var TAX_CONFIG = {
    taxYear: '2026-27',
    yearStart: '2026-04-01',
    yearEnd: '2027-03-31',
    checkedOn: '28 October 2026',

    incomeTax: {
      effectiveFrom: '2025-04-01 (thresholds changed 31 July 2024)',
      source: IRD + '/income-tax/income-tax-for-individuals/tax-codes-and-tax-rates-for-individuals/tax-rates-for-individuals',
      // upTo is the top of each band in dollars; null = no top
      brackets: [
        { upTo: 15600, rate: 0.105 },
        { upTo: 53500, rate: 0.175 },
        { upTo: 78100, rate: 0.30 },
        { upTo: 180000, rate: 0.33 },
        { upTo: null, rate: 0.39 }
      ]
    },

    accLevy: {
      effectiveFrom: '2026-04-01',
      source: IRD + '/income-tax/income-tax-for-individuals/acc-clients-and-carers/acc-earners-levy-rates',
      rate: 0.0175,              // $1.75 per $100, GST inclusive
      maxLiableEarnings: 156641  // maximum levy $2,741.22
    },

    studentLoan: {
      effectiveFrom: '2026-04-01',
      source: IRD + '/student-loans/living-in-new-zealand-with-a-student-loan/repaying-my-student-loan-when-i-earn-salary-or-wages',
      sourcePayPeriods: IRD + '/-/media/project/ir/home/documents/digital-service-providers/software-providers/payroll-calculations-business-rules-specifications/payroll-calculations-and-business-rules-specification.pdf',
      rate: 0.12,
      annualThreshold: 24128,
      payPeriodThreshold: { weekly: 464, fortnightly: 928, fourweekly: 1856, monthly: 2010.66, annual: 24128 }
    },

    kiwiSaver: {
      effectiveFrom: '2026-04-01',
      source: IRD + '/kiwisaver-changes',
      sourceEmployee: IRD + '/kiwisaver/kiwisaver-individuals/growing-my-kiwisaver-account/employee-contributions-to-kiwisaver',
      employeeRates: [0.035, 0.04, 0.06, 0.08, 0.10],
      defaultRate: 0.035,
      temporaryReducedRate: 0.03,   // by application, 3 to 12 months; employer may match 3% or pay 3.5%
      employerMinimum: 0.035,
      nextChange: 'The default and minimum employer rate rise to 4% from 1 April 2028.'
    },

    esct: {
      effectiveFrom: '2025-04-01',
      source: IRD + '/-/media/project/ir/home/documents/forms-and-guides/ir300---ir399/ir340/ir340-apr-2026.pdf',
      basis: "Employee's salary or wages plus gross employer superannuation contributions for the previous tax year (estimate for a new employee).",
      bands: [
        { upTo: 18720, rate: 0.105 },
        { upTo: 64200, rate: 0.175 },
        { upTo: 93720, rate: 0.30 },
        { upTo: 216000, rate: 0.33 },
        { upTo: null, rate: 0.39 }
      ]
    },

    gst: {
      source: IRD + '/gst/filing-and-paying-gst-and-refunds/calculating-gst',
      rate: 0.15,               // GST content of an inclusive price = 3/23
      registrationThreshold: 60000,
      registrationSource: IRD + '/registering-for-gst',
      frequencySource: IRD + '/gst/registering-for-gst/which-gst-accounting-basis-and-filing-frequency-should-i-use',
      monthlyRequiredAbove: 24000000,   // must file monthly if taxable supplies over $24m in 12 months
      sixMonthlyMax: 500000             // six-monthly allowed if under $500,000
    },

    provisional: {
      source: IRD + '/income-tax/provisional-tax/provisional-tax-options/standard-option/work-out-provisional-tax-using-the-standard-option',
      datesSource: IRD + '/income-tax/provisional-tax/paying-your-provisional-tax/payment-dates-for-provisional-tax',
      threshold: 5000,      // provisional tax applies when last year's RIT is more than $5,000
      uplift: 1.05,         // previous year's RIT plus 5%
      upliftTwoYears: 1.10, // when based on RIT from two years ago
      // 31 March balance date, for the 2026-27 income year
      instalments: ['2026-08-28', '2027-01-15', '2027-05-07'],
      sixMonthlyGstInstalments: ['2026-10-28', '2027-05-07']
    },

    links: {
      home: IRD + '/',
      calculators: IRD + '/tools-calculators',
      wff: IRD + '/working-for-families/estimate-your-entitlement',
      ir330: IRD + '/income-tax/income-tax-for-individuals/tax-codes-and-tax-rates-for-individuals/complete-my-tax-code-declaration',
      ir526: IRD + '/income-tax/income-tax-for-individuals/individual-tax-credits/donation-tax-credits/submit-a-donation-receipt',
      gstFrequency: IRD + '/gst/registering-for-gst/which-gst-accounting-basis-and-filing-frequency-should-i-use',
      studentLoan: IRD + '/student-loans/living-in-new-zealand-with-a-student-loan/repaying-my-student-loan-when-i-earn-salary-or-wages'
    }
  };

  var PERIODS = { weekly: 52, fortnightly: 26, monthly: 12, annual: 1 };

  function r2(n) { return Math.round((n + Number.EPSILON) * 100) / 100; }

  function banded(amount, bands) {
    var tax = 0, lower = 0, marginal = bands[0].rate, rows = [];
    amount = Math.max(0, amount);
    for (var i = 0; i < bands.length; i++) {
      var b = bands[i], top = b.upTo == null ? Infinity : b.upTo;
      if (amount > lower) {
        var part = Math.min(amount, top) - lower;
        var t = part * b.rate;
        tax += t;
        rows.push({ from: lower, to: b.upTo, rate: b.rate, amount: part, tax: r2(t) });
        marginal = b.rate;
      }
      lower = top;
    }
    return { tax: r2(tax), marginal: marginal, rows: rows };
  }

  function incomeTax(income) {
    income = Math.max(0, +income || 0);
    var b = banded(income, TAX_CONFIG.incomeTax.brackets);
    return { income: income, tax: b.tax, marginal: income > 0 ? b.marginal : 0, effective: income > 0 ? b.tax / income : 0, rows: b.rows, net: r2(income - b.tax) };
  }

  function accLevy(annual) {
    var c = TAX_CONFIG.accLevy;
    return r2(Math.min(Math.max(0, annual), c.maxLiableEarnings) * c.rate);
  }

  function esctRate(annualSalaryPlusEmployer) {
    var bands = TAX_CONFIG.esct.bands, x = Math.max(0, annualSalaryPlusEmployer);
    for (var i = 0; i < bands.length; i++) if (bands[i].upTo == null || x <= bands[i].upTo) return bands[i].rate;
    return bands[bands.length - 1].rate;
  }

  function studentLoan(pay, freq) {
    var c = TAX_CONFIG.studentLoan, th = c.payPeriodThreshold[freq];
    var per = r2(Math.max(0, pay - th) * c.rate);
    return { perPeriod: per, perYear: r2(per * PERIODS[freq]), threshold: th, rate: c.rate };
  }

  /* PAYE for tax code M or M SL. Pay is gross for one pay period.
     Method: annualise the period pay, work out annual income tax, divide back (as IRD's PAYE tables do),
     ACC earners' levy on the period pay with the maximum shared across the year. */
  function paye(opts) {
    var freq = opts.freq || 'weekly', n = PERIODS[freq];
    var gross = Math.max(0, +opts.pay || 0);
    var annual = gross * n;
    var tax = r2(incomeTax(Math.floor(annual)).tax / n);
    var acc = r2(Math.min(gross, TAX_CONFIG.accLevy.maxLiableEarnings / n) * TAX_CONFIG.accLevy.rate);
    var sl = opts.sl ? studentLoan(gross, freq).perPeriod : 0;
    var ksRate = +opts.ksRate || 0;
    var ks = r2(gross * ksRate);
    var erRate = ksRate > 0 ? (opts.erRate != null ? +opts.erRate : TAX_CONFIG.kiwiSaver.employerMinimum) : 0;
    var er = r2(gross * erRate);
    var esct = esctRate(annual + er * n);
    var erTax = r2(er * esct);
    return {
      freq: freq, gross: gross, paye: tax, acc: acc, payeTotal: r2(tax + acc), studentLoan: sl, kiwiSaver: ks,
      employerGross: er, esctRate: esct, esct: erTax, employerNet: r2(er - erTax),
      takeHome: r2(gross - tax - acc - sl - ks)
    };
  }

  function kiwiSaver(opts) {
    var salary = Math.max(0, +opts.salary || 0), rate = +opts.rate || 0;
    var er = opts.erRate != null ? +opts.erRate : TAX_CONFIG.kiwiSaver.employerMinimum;
    var employee = r2(salary * rate), employerGross = r2(salary * er);
    var esct = esctRate(salary + employerGross), esctAmt = r2(employerGross * esct);
    var employerNet = r2(employerGross - esctAmt);
    return { salary: salary, employee: employee, employerGross: employerGross, esctRate: esct, esct: esctAmt, employerNet: employerNet, total: r2(employee + employerNet) };
  }

  function gst(amount, mode) {
    var a = Math.max(0, +amount || 0), rate = TAX_CONFIG.gst.rate;
    if (mode === 'remove') {
      var g = r2(a * 3 / 23);
      return { excl: r2(a - g), gst: g, incl: r2(a) };
    }
    var g2 = r2(a * rate);
    return { excl: r2(a), gst: g2, incl: r2(a + g2) };
  }

  function gstFrequency(turnover) {
    var c = TAX_CONFIG.gst, t = Math.max(0, +turnover || 0);
    return {
      mustRegister: t > c.registrationThreshold,
      atThreshold: t === c.registrationThreshold,
      monthly: true,
      twoMonthly: t <= c.monthlyRequiredAbove,
      sixMonthly: t < c.sixMonthlyMax
    };
  }

  function provisional(opts) {
    var c = TAX_CONFIG.provisional, rit = Math.max(0, +opts.rit || 0);
    var applies = rit > c.threshold;
    var total = applies ? r2(rit * c.uplift) : 0;
    var dates = opts.sixMonthlyGst ? c.sixMonthlyGstInstalments : c.instalments;
    var each = Math.floor(total / dates.length * 100) / 100;
    var parts = dates.map(function (d, i) { return { date: d, amount: i === dates.length - 1 ? r2(total - each * (dates.length - 1)) : each }; });
    return { rit: rit, applies: applies, total: total, instalments: applies ? parts : [] };
  }

  var api = { TAX_CONFIG: TAX_CONFIG, PERIODS: PERIODS, incomeTax: incomeTax, accLevy: accLevy, esctRate: esctRate, studentLoan: studentLoan, paye: paye, kiwiSaver: kiwiSaver, gst: gst, gstFrequency: gstFrequency, provisional: provisional };
  root.TPCalc = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;

  /* ---------- page wiring ---------- */
  if (typeof document === 'undefined') return;

  var nzd = new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD' });
  var nzd0 = new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD', maximumFractionDigits: 0 });
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function money(n) { return nzd.format(n); }
  function pct(n, d) { return (n * 100).toFixed(d == null ? 1 : d).replace(/\.0+$/, '') + '%'; }
  function num(el) { var v = String(el.value).replace(/[$,\s]/g, ''); var n = parseFloat(v); return isFinite(n) ? n : 0; }
  var FREQ = { weekly: 'week', fortnightly: 'fortnight', monthly: 'month', annual: 'year' };
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function fmtDate(iso) { var p = iso.split('-'); return (+p[2]) + ' ' + MONTHS[+p[1] - 1] + ' ' + p[0]; }
  function rows(list) {
    return '<dl class="rl">' + list.map(function (r) { return '<div' + (r[2] ? ' class="' + r[2] + '"' : '') + '><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>'; }).join('') + '</dl>';
  }
  function big(label, value, sub) { return '<p class="big"><span class="bl">' + label + '</span><span class="bv">' + value + '</span>' + (sub ? '<span class="bs">' + sub + '</span>' : '') + '</p>'; }

  // figures note
  $$('[data-tax-year]').forEach(function (el) { el.textContent = TAX_CONFIG.taxYear; });
  $$('[data-checked]').forEach(function (el) { el.textContent = TAX_CONFIG.checkedOn; });
  $$('[data-link]').forEach(function (a) { var k = a.getAttribute('data-link'); if (TAX_CONFIG.links[k]) a.href = TAX_CONFIG.links[k]; });

  var calcs = {
    tax: function (f, out) {
      var r = incomeTax(num(f.income));
      out.innerHTML = big('Income tax for the year', money(r.tax)) +
        rows([['Effective rate', pct(r.effective, 2)], ['Marginal rate', pct(r.marginal)], ['Income after income tax', money(r.net)]]) +
        '<details class="bands"><summary>How it adds up</summary><table><thead><tr><th scope="col">Band</th><th scope="col">Rate</th><th scope="col">Tax</th></tr></thead><tbody>' +
        r.rows.map(function (b) { return '<tr><td>' + nzd0.format(b.from + (b.from ? 1 : 0)) + (b.to ? ' to ' + nzd0.format(b.to) : ' and over') + '</td><td>' + pct(b.rate) + '</td><td>' + money(b.tax) + '</td></tr>'; }).join('') +
        '</tbody></table></details><p class="fine">Income tax only. ACC earners\' levy, student loan and tax credits are not included.</p>';
    },
    paye: function (f, out) {
      var freq = f.freq.value, ks = f.ks.value;
      var r = paye({ pay: num(f.pay), freq: freq, sl: f.code.value === 'MSL', ksRate: ks === 'none' ? 0 : +ks, erRate: +f.er.value });
      var per = FREQ[freq];
      out.innerHTML = big('Take-home pay', money(r.takeHome), 'per ' + per) +
        rows([['Gross pay', money(r.gross)], ['PAYE (income tax)', '- ' + money(r.paye)], ['ACC earners\' levy', '- ' + money(r.acc)],
          f.code.value === 'MSL' ? ['Student loan', '- ' + money(r.studentLoan)] : null,
          ks !== 'none' ? ['KiwiSaver (you, ' + pct(+ks) + ')', '- ' + money(r.kiwiSaver)] : null,
          ['Take-home', money(r.takeHome), 'tot']].filter(Boolean)) +
        (ks !== 'none' ? '<h4>Paid by your employer, on top of your pay</h4>' + rows([['Employer KiwiSaver (gross, ' + pct(+f.er.value) + ')', money(r.employerGross)], ['Less ESCT at ' + pct(r.esctRate), '- ' + money(r.esct)], ['Into your KiwiSaver', money(r.employerNet), 'tot']]) : '') +
        '<p class="fine">Tax code M or M SL only. Secondary tax codes, tax credits, Working for Families and one-off payments are not covered.</p>';
    },
    sl: function (f, out) {
      var freq = f.freq.value, r = studentLoan(num(f.pay), freq);
      out.innerHTML = big('Student loan repayment', money(r.perPeriod), 'per ' + FREQ[freq]) +
        rows([['Per year at this pay', money(r.perYear)], ['Repayment threshold', money(r.threshold) + ' per ' + FREQ[freq]], ['Rate on pay over the threshold', pct(r.rate, 0)]]) +
        '<p class="fine">For salary and wages with tax code M SL. Self-employed and other income is assessed at year end. Overseas-based borrowers have different rules.</p>';
    },
    ks: function (f, out) {
      var r = kiwiSaver({ salary: num(f.salary), rate: +f.rate.value, erRate: +f.er.value });
      out.innerHTML = big('Going into KiwiSaver each year', money(r.total), 'your contributions plus your employer\'s after ESCT') +
        rows([['You (' + pct(+f.rate.value) + ' of gross pay)', money(r.employee)], ['Employer contribution (gross)', money(r.employerGross)], ['Less ESCT at ' + pct(r.esctRate), '- ' + money(r.esct)], ['Employer contribution (after ESCT)', money(r.employerNet)],
          ['Your share per fortnight', money(r.employee / 26)]]) +
        '<p class="fine">ESCT rate uses this salary plus the employer contribution, as a stand-in for last year\'s figure. Government contributions are not included.</p>';
    },
    gst: function (f, out) {
      var mode = f.mode.value, r = gst(num(f.amount), mode);
      out.innerHTML = big(mode === 'remove' ? 'Price before GST' : 'Price including GST', money(mode === 'remove' ? r.excl : r.incl)) +
        rows([['Excluding GST', money(r.excl)], ['GST at ' + pct(TAX_CONFIG.gst.rate, 0), money(r.gst)], ['Including GST', money(r.incl), 'tot']]) +
        '<p class="fine">' + (mode === 'remove' ? 'GST content worked out as 3/23 of the GST-inclusive amount.' : 'GST worked out as 15% of the GST-exclusive amount.') + '</p>';
    },
    gstf: function (f, out) {
      var r = gstFrequency(num(f.turnover)), reg = f.reg.value, c = TAX_CONFIG.gst;
      var opt = function (ok, name, when) { return '<li class="' + (ok ? 'ok' : 'no') + '"><strong>' + name + '</strong><span>' + (ok ? 'Open to you. ' : 'Not available at this turnover. ') + when + '</span></li>'; };
      var regLine = reg === 'yes' ? '' : (r.mustRegister ? '<p class="note warn">Over ' + nzd0.format(c.registrationThreshold) + ' in 12 months, you must register for GST.</p>' : '<p class="note">Under ' + nzd0.format(c.registrationThreshold) + ' in 12 months, registering is optional. You can still choose to register.</p>');
      var best = !r.twoMonthly ? 'Monthly' : r.sixMonthly ? 'Monthly, two-monthly or six-monthly' : 'Monthly or two-monthly';
      out.innerHTML = big('Filing periods open to you', best) + regLine +
        '<ul class="opts">' +
        opt(r.monthly, 'Monthly', r.twoMonthly ? 'Anyone can choose it. It can suit regular refunds.' : 'Required when sales are over $24 million in 12 months.') +
        opt(r.twoMonthly, 'Two-monthly', 'For sales of $24 million or less in 12 months. The usual choice.') +
        opt(r.sixMonthly, 'Six-monthly', 'For sales under $500,000 in 12 months. Periods line up with your balance date.') +
        '</ul><p class="fine">Returns and payments are due on the 28th of the month after the period ends, except periods ending in November (due 15 January) and March (due 7 May). With a 31 March balance date, six-monthly periods end in September and March.</p>';
    },
    prov: function (f, out) {
      var r = provisional({ rit: num(f.rit), sixMonthlyGst: f.six.checked });
      if (!r.applies) {
        out.innerHTML = big('Provisional tax', 'Not required', 'last year\'s residual income tax is ' + nzd0.format(TAX_CONFIG.provisional.threshold) + ' or less') +
          '<p class="fine">You can still choose to pay voluntarily, which can help avoid interest on a large bill. Ask us if your income is rising.</p>';
        return;
      }
      out.innerHTML = big('Provisional tax for ' + TAX_CONFIG.taxYear, money(r.total), 'last year\'s residual income tax plus 5%') +
        '<ol class="inst">' + r.instalments.map(function (p, i) { return '<li><span class="n">' + (i + 1) + '</span><span class="d">' + fmtDate(p.date) + '</span><span class="a">' + money(p.amount) + '</span></li>'; }).join('') + '</ol>' +
        '<p class="fine">Standard option, 31 March balance date. If last year\'s return is not filed by an instalment date, the instalment is based on the year before plus 10%. A due date that falls on a weekend or public holiday moves to the next working day.</p>';
    }
  };

  var DISC = '<p class="disc">Estimate only. Your own tax may differ; talk to us.</p>';
  $$('form[data-calc]').forEach(function (f) {
    var key = f.getAttribute('data-calc'), out = $('#' + f.getAttribute('aria-controls'));
    function run() { try { calcs[key](f, out); out.insertAdjacentHTML('beforeend', DISC); } catch (e) { out.textContent = 'Check the amounts entered.'; } }
    f.addEventListener('input', run);
    f.addEventListener('change', run);
    f.addEventListener('submit', function (e) { e.preventDefault(); run(); });
    run();
  });

  // money inputs: show thousands separators when leaving the field
  $$('input[inputmode=decimal]').forEach(function (i) {
    i.addEventListener('blur', function () { var n = num(i); if (i.value !== '') i.value = n.toLocaleString('en-NZ', { maximumFractionDigits: 2 }); });
  });

  // tabs
  var tabs = $$('[role=tab]');
  function show(t, focus) {
    tabs.forEach(function (x) { var on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; $('#' + x.getAttribute('aria-controls')).hidden = !on; });
    if (focus) t.focus();
    try { history.replaceState(null, '', '#' + t.id.replace('t-', '')); } catch (e) {}
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { show(t); });
    t.addEventListener('keydown', function (e) {
      var j = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (j == null) return;
      e.preventDefault(); show(tabs[(j + tabs.length) % tabs.length], true);
    });
  });
  var start = location.hash && $('#t-' + location.hash.slice(1));
  if (start) show(start); else if (tabs[0]) show(tabs[0]);
  $$('a[data-tab]').forEach(function (a) { a.addEventListener('click', function (e) { var t = $('#t-' + a.getAttribute('data-tab')); if (t) { e.preventDefault(); show(t); $('#tools').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); } }); });

  // checklist builder
  var KEY = 'taxpro-05-bring';
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { saved = {}; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) {} }
  var cl = $('#cl-form'), list = $('#cl-list');
  if (cl && list) {
    var groups = $$('[data-group]', list);
    function update() {
      var any = false;
      $$('input[name=sit]', cl).forEach(function (c) { saved['sit-' + c.value] = c.checked; });
      var sel = $$('input[name=sit]:checked', cl).map(function (c) { return c.value; });
      groups.forEach(function (g) { var on = g.getAttribute('data-group') === 'all' || sel.indexOf(g.getAttribute('data-group')) > -1; g.hidden = !on; if (on) any = true; });
      var items = $$('li:not([hidden]) input', list).filter(function (i) { return !i.closest('[hidden]'); });
      var done = items.filter(function (i) { return i.checked; }).length;
      $('#cl-count').textContent = done + ' of ' + items.length + ' ready';
      save();
    }
    $$('input[name=sit]', cl).forEach(function (c) { if (saved['sit-' + c.value] != null) c.checked = !!saved['sit-' + c.value]; c.addEventListener('change', update); });
    $$('input[type=checkbox]', list).forEach(function (c) { if (saved[c.name]) c.checked = true; c.addEventListener('change', function () { saved[c.name] = c.checked; update(); }); });
    $('#cl-print').addEventListener('click', function () { window.print(); });
    $('#cl-clear').addEventListener('click', function () { $$('input[type=checkbox]', list).forEach(function (c) { c.checked = false; saved[c.name] = false; }); update(); });
    update();
  }

  // header: mobile menu and quick bar
  var mb = $('.menu-btn'), nav = $('#site-nav');
  if (mb && nav) {
    mb.addEventListener('click', function () { var o = mb.getAttribute('aria-expanded') !== 'true'; mb.setAttribute('aria-expanded', o); mb.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); nav.classList.toggle('open', o); });
    $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { mb.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) { mb.click(); mb.focus(); } });
  }
  var qb = $('.qb'), intro = $('.intro');
  if (qb && intro && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { qb.classList.toggle('on', !es[0].isIntersecting); }).observe(intro);
  } else if (qb) qb.classList.add('on');
})(typeof globalThis !== 'undefined' ? globalThis : this);
