/* Shared motion for every concept.
   1. Partner logo strip: turns the list that holds the partner logos into a slow right-to-left loop.
   Pauses on hover and focus, and while off screen. With reduced motion the strip stays static. */
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  fallingHeadings();
  // the list holding the most partner logos (a page may also show one or two logos elsewhere)
  var list = null, best = 0;
  document.querySelectorAll('ul').forEach(function (u) {
    var n = u.querySelectorAll(':scope > li img[src*="assets/logo/partner-"]').length;
    if (n > best) { best = n; list = u; }
  });
  if (best < 4) list = null;
  if (!list || list.dataset.marquee) return;
  list.dataset.marquee = '1';

  var css = document.createElement('style');
  css.textContent =
    '.tp-marquee{overflow:hidden;width:100%;max-width:100%;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}' +
    '.tp-marquee>ul{display:flex!important;flex-wrap:nowrap!important;gap:0!important;width:max-content!important;max-width:none!important;margin:0!important;padding:0!important;grid-template-columns:none!important;animation:tp-marquee var(--tp-dur,45s) linear infinite}' +
    '.tp-marquee>ul>li{flex:0 0 auto!important;width:clamp(120px,14vw,170px)!important;margin:0 clamp(14px,2vw,28px) 0 0!important}' +
    '.tp-marquee>ul>li img{width:100%!important;height:auto!important;display:block}' +
    '.tp-marquee:hover>ul,.tp-marquee:focus-within>ul,.tp-marquee.off>ul{animation-play-state:paused}' +
    '@keyframes tp-marquee{to{transform:translateX(-50%)}}';
  document.head.appendChild(css);

  var wrap = document.createElement('div');
  wrap.className = 'tp-marquee';
  list.parentNode.insertBefore(wrap, list);
  wrap.appendChild(list);

  // second copy for a seamless loop, hidden from screen readers and the tab order
  Array.prototype.slice.call(list.children).forEach(function (li) {
    var c = li.cloneNode(true);
    c.setAttribute('aria-hidden', 'true');
    c.querySelectorAll('a,button').forEach(function (el) { el.tabIndex = -1; });
    c.querySelectorAll('img').forEach(function (im) { im.alt = ''; });
    list.appendChild(c);
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { wrap.classList.toggle('off', !es[0].isIntersecting); }).observe(wrap);
  }
  document.addEventListener('visibilitychange', function () { wrap.classList.toggle('off', document.hidden); });
})();

/* 2. Falling headings: each word of a section heading drops softly into place as it scrolls into view.
   Transform and opacity only, so it stays smooth on phones. Text stays readable without JS. */
function fallingHeadings() {
  var css = document.createElement('style');
  css.textContent =
    '.tp-w{display:inline-block;will-change:transform;transform:translate3d(0,-.62em,0);opacity:0;' +
    'transition:transform 1.25s cubic-bezier(.16,1,.3,1),opacity .9s cubic-bezier(.33,1,.68,1);transition-delay:calc(var(--i)*65ms)}' +
    '.tp-fall.tp-on .tp-w{transform:none;opacity:1}';
  document.head.appendChild(css);
  var heads = Array.prototype.filter.call(document.querySelectorAll('main h2, main .h2'), function (h) {
    var cs = getComputedStyle(h);
    return h.offsetWidth > 40 && cs.position !== 'absolute' && !h.closest('[aria-hidden="true"],.tp-marquee') && !h.querySelector('.tp-w') && h.textContent.trim().split(/\s+/).length <= 14;
  });
  heads.forEach(function (h) {
    var i = 0;
    (function split(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var w = document.createElement('span');
            w.className = 'tp-w'; w.style.setProperty('--i', i++); w.textContent = part;
            frag.appendChild(w);
          });
          c.parentNode.replaceChild(frag, c);
        } else if (c.nodeType === 1 && !/^(BR|SVG|IMG)$/.test(c.tagName)) split(c);
      });
    })(h);
    h.classList.add('tp-fall');
  });
  if (!('IntersectionObserver' in window)) { heads.forEach(function (h) { h.classList.add('tp-on'); }); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('tp-on'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.2 });
  heads.forEach(function (h) { io.observe(h); });
}

/* 3. High-motion layer, only on the concepts listed here (the others stay calm).
   Native and transform/opacity only: CSS scroll-driven text, IntersectionObserver reveals, no scroll-jacking. */
(function () {
  var HIGH = ['01-partners', '03-epsom', '05-studio', '07-bento', '08-kinetic', '11-reveal', '12-story'];
  var slug = document.documentElement.getAttribute('data-concept');
  if (HIGH.indexOf(slug) < 0 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var fine = matchMedia('(pointer: fine)').matches && innerWidth >= 900;
  var css = document.createElement('style');
  css.textContent =
    /* brand curtain that drops when leaving via a same-site link */
    '.tp-curtain{position:fixed;inset:0;z-index:2147482000;pointer-events:none;background:#033F66;transform:translateY(0);transition:transform .9s cubic-bezier(.76,0,.24,1)}' +
    '.tp-curtain::after{content:"";position:absolute;left:0;right:0;bottom:0;height:10px;background:#4CA442}' +
    '.tp-curtain.up{transform:translateY(-101%)}' +
    /* text that lights up as you scroll */
    '.tp-sw{opacity:.4;transition:opacity .5s linear}' +
    '@supports (animation-timeline: view()){.tp-sw{transition:none;animation:tp-sw linear both;animation-timeline:view();animation-range:entry 10% cover 42%}}' +
    '@keyframes tp-sw{to{opacity:1}}' +
    '.tp-scrub.tp-on .tp-sw{opacity:1}' +
    /* photos open like a book cover (fine pointers), soft wipe on touch */
    '.tp-book{transform-origin:0 50%;transform:perspective(1400px) rotateY(-68deg);opacity:0;transition:transform 1.5s cubic-bezier(.16,1,.3,1),opacity .7s ease;backface-visibility:hidden}' +
    '.tp-book.tp-on{transform:perspective(1400px) rotateY(0);opacity:1}' +
    '.tp-wipe{clip-path:inset(0 0 100% 0);transition:clip-path 1.3s cubic-bezier(.16,1,.3,1)}' +
    '.tp-wipe.tp-on{clip-path:inset(0 0 0 0)}' +
    '.tp-mag{transition:transform .5s cubic-bezier(.16,1,.3,1)}';
  document.head.appendChild(css);

  // curtain: lift after first paint; drop again when following a same-site link
  var cur = document.createElement('div'); cur.className = 'tp-curtain'; cur.setAttribute('aria-hidden', 'true');
  cur.classList.add('up'); // starts lifted so the first paint is never covered
  document.body.appendChild(cur);
  addEventListener('pageshow', function (e) { if (e.persisted) cur.classList.add('up'); });
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || a.hasAttribute('download')) return;
    var u = new URL(a.href, location.href);
    if (u.origin !== location.origin || u.pathname === location.pathname || a.closest('[data-concept-switcher]')) return;
    e.preventDefault(); cur.classList.remove('up'); setTimeout(function () { location.href = u.href; }, 650);
  });

  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('tp-on'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }) : null;
  function watch(el) { if (io) io.observe(el); else el.classList.add('tp-on'); }

  // scroll-lit intro paragraphs: the first paragraph after up to four section headings
  var n = 0;
  document.querySelectorAll('main section h2').forEach(function (h) {
    if (n >= 4) return;
    var p = h.parentElement.querySelector(':scope > p, :scope + p') || h.nextElementSibling;
    if (!p || p.tagName !== 'P' || p.children.length > 2) return;
    var words = p.textContent.trim().split(/\s+/).length;
    if (words < 8 || words > 60 || p.closest('form,details,.tp-marquee')) return;
    var txt = p.innerHTML; if (/<(a|button|input)/i.test(txt)) return;
    p.innerHTML = p.textContent.trim().split(/(\s+)/).map(function (w) { return /^\s+$/.test(w) ? w : '<span class="tp-sw">' + w.replace(/[&<>]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]; }) + '</span>'; }).join('');
    p.classList.add('tp-scrub'); watch(p); n++;
  });

  // book-opening photos: up to four large content images outside the hero
  var m = 0, hero = document.querySelector('main > section, main > header, .hero');
  document.querySelectorAll('main img').forEach(function (img) {
    if (m >= 4 || (hero && hero.contains(img)) || img.closest('.tp-marquee,header,nav')) return;
    if ((+img.getAttribute('width') || 0) < 480) return;
    var box = img.closest('figure') || img;
    if (box.closest('.rv,.reveal,[data-rv]')) return; // the concept already animates this one
    var wide = box.getBoundingClientRect().width > innerWidth * .7;
    box.classList.add(fine && !wide ? 'tp-book' : 'tp-wipe'); watch(box); m++;
  });

  // magnetic primary buttons on fine pointers
  if (fine) document.querySelectorAll('main a[class*="btn"], main button[class*="btn"], main .cta').forEach(function (b, i) {
    if (i > 5) return;
    b.classList.add('tp-mag');
    b.addEventListener('pointermove', function (e) { var r = b.getBoundingClientRect(); b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * .18) + 'px,' + ((e.clientY - r.top - r.height / 2) * .28) + 'px)'; });
    b.addEventListener('pointerleave', function () { b.style.transform = ''; });
  });
})();
