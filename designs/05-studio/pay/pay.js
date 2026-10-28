(function(d){
  'use strict';

  /* menu (phones and small laptops) */
  var mbtn = d.querySelector('.menu-btn'), nav = d.getElementById('site-nav');
  function setMenu(open){ mbtn.setAttribute('aria-expanded', open); mbtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); nav.classList.toggle('open', open); }
  mbtn.addEventListener('click', function(){ setMenu(mbtn.getAttribute('aria-expanded') !== 'true'); });
  nav.addEventListener('click', function(e){ if (e.target.closest('a')) setMenu(false); });
  d.addEventListener('keydown', function(e){ if (e.key === 'Escape' && mbtn.getAttribute('aria-expanded') === 'true') { setMenu(false); mbtn.focus(); } });

  /* walkthrough: four steps, by step button, Back/Next or arrow keys */
  var btns = [].slice.call(d.querySelectorAll('.st')), panels = [].slice.call(d.querySelectorAll('.panel'));
  var prev = d.getElementById('prev'), next = d.getElementById('next'), countN = d.getElementById('count-n'), live = d.getElementById('step-live');
  var cur = 0;
  function show(i, announce){
    cur = Math.max(0, Math.min(panels.length - 1, i));
    btns.forEach(function(b, j){ if (j === cur) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); b.classList.toggle('past', j < cur); });
    panels.forEach(function(p, j){ p.hidden = j !== cur; });
    prev.disabled = cur === 0; next.disabled = cur === panels.length - 1;
    countN.textContent = cur + 1;
    if (announce) live.textContent = 'Step ' + (cur + 1) + ' of ' + panels.length + ': ' + panels[cur].querySelector('h3').textContent;
  }
  btns.forEach(function(b, j){
    b.addEventListener('click', function(){ show(j, true); });
    b.addEventListener('keydown', function(e){
      var k = e.key, t = null;
      if (k === 'ArrowRight' || k === 'ArrowDown') t = Math.min(btns.length - 1, j + 1);
      else if (k === 'ArrowLeft' || k === 'ArrowUp') t = Math.max(0, j - 1);
      else if (k === 'Home') t = 0; else if (k === 'End') t = btns.length - 1;
      if (t === null) return;
      e.preventDefault(); btns[t].focus(); show(t, true);
    });
  });
  function step(dir){
    show(cur + dir, true);
    /* keep focus on a usable control when a button becomes disabled at either end */
    if (d.activeElement && d.activeElement.disabled) (dir > 0 ? prev : next).focus();
  }
  prev.addEventListener('click', function(){ step(-1); });
  next.addEventListener('click', function(){ step(1); });
  d.getElementById('walk').classList.add('ready');
  show(0, false);

  /* invoice number helper: copies to the clipboard only, never stored or sent */
  var inv = d.getElementById('inv'), copy = d.getElementById('copy'), status = d.getElementById('copy-status'), resetT;
  function say(msg, ok){
    status.textContent = msg; status.classList.toggle('ok', !!ok);
    clearTimeout(resetT);
    if (ok) { copy.textContent = 'Copied'; resetT = setTimeout(function(){ copy.textContent = 'Copy'; }, 2600); }
  }
  function fallback(text){
    var ta = d.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    d.body.appendChild(ta); ta.select();
    var ok = false; try { ok = d.execCommand('copy'); } catch (e) {}
    d.body.removeChild(ta); inv.focus();
    return ok;
  }
  copy.addEventListener('click', function(){
    var v = inv.value.trim();
    if (!v) { say('Type your invoice number first.'); inv.focus(); return; }
    var done = function(){ say('Copied ' + v + '. Paste it as the reference on Ezidebit\'s page.', true); };
    var fail = function(){ if (fallback(v)) done(); else { inv.select(); say('Copying is blocked here. The number is selected, so copy it with your keyboard or a long press.'); } };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(v).then(done, fail);
    else fail();
  });
  inv.addEventListener('input', function(){ if (status.textContent) { status.textContent = ''; status.classList.remove('ok'); copy.textContent = 'Copy'; } });
  inv.addEventListener('keydown', function(e){ if (e.key === 'Enter') { e.preventDefault(); copy.click(); } });

  /* phone quick bar: hidden while the payment box shows */
  var qb = d.querySelector('.qb'), box = d.querySelector('.paybox');
  if ('IntersectionObserver' in window) new IntersectionObserver(function(es){ qb.classList.toggle('on', !es[0].isIntersecting); }, {threshold:0}).observe(box);
  else qb.classList.add('on');
})(document);
