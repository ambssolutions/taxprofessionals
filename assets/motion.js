/* 0. Readability, always on: balanced heading lines (no single word left alone) and a comfortable line length. */
(function () {
  var st = document.createElement('style');
  st.textContent = 'h1,h2,h3{text-wrap:balance}main p,main li,main dd{text-wrap:pretty}';
  document.head.appendChild(st);
  function cap() {
    document.querySelectorAll('main p').forEach(function (p) {
      var cs = getComputedStyle(p), fs = parseFloat(cs.fontSize) || 16, w = p.getBoundingClientRect().width;
      if (w / (fs * 0.5) <= 84 || p.textContent.trim().split(/\s+/).length < 12) return;
      p.style.maxWidth = '68ch';
      if (cs.textAlign === 'center') { p.style.marginLeft = 'auto'; p.style.marginRight = 'auto'; }
    });
  }
  /* phones: no reading text below 14px (body copy 15px) and no cramped line spacing */
  function phone() {
    if (!matchMedia('(max-width: 760px)').matches) return;
    document.querySelectorAll('main p,main li,main dd,main blockquote,main figcaption,main small,main span,main a,main td,footer p,footer li,footer a,footer small,footer span,footer div').forEach(function (e) {
      if (e.closest('[aria-hidden="true"],nav,button')) return;
      var own = '';
      e.childNodes.forEach(function (n) { if (n.nodeType === 3) own += n.textContent; });
      if (own.trim().length < 25) return;
      var cs = getComputedStyle(e), fs = parseFloat(cs.fontSize) || 16, body = /^(P|LI|DD|BLOCKQUOTE)$/.test(e.tagName);
      var min = body && fs >= 13 ? 15 : 14;
      if (fs < min) { e.style.fontSize = min + 'px'; fs = min; }
      var lh = parseFloat(cs.lineHeight);
      if (body && fs < 22 && lh && lh / fs < 1.45) e.style.lineHeight = '1.5';
    });
  }
  function run() { cap(); phone(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();

/* Shared motion for every concept.
   1. Partner logo strip: turns the list that holds the partner logos into a slow right-to-left loop.
   Pauses on hover and focus, and while off screen. With reduced motion the strip stays static. */
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.gsap) fallingHeadings(); // round-2 concepts choreograph their own headings
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

  /* the logo passing the middle of the strip shows in full colour; the rest stay a soft grey */
  var hl = document.createElement('style');
  hl.textContent =
    '.tp-marquee>ul>li img{filter:grayscale(1)!important;opacity:.55!important;transition:filter .6s ease,opacity .6s ease!important}' +
    '.tp-marquee>ul>li.mid img{filter:none!important;opacity:1!important}';
  document.head.appendChild(hl);
  var items = Array.prototype.slice.call(list.children), on = false, raf = 0;
  function tick() {
    raf = 0; if (!on) return;
    var r = wrap.getBoundingClientRect(), mid = r.left + r.width / 2;
    items.forEach(function (li) {
      var b = li.getBoundingClientRect(), c = b.left + b.width / 2;
      li.classList.toggle('mid', Math.abs(c - mid) < b.width * 0.75);
    });
    raf = requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { on = es[0].isIntersecting; if (on && !raf) raf = requestAnimationFrame(tick); }).observe(wrap);
  }
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
  if (window.gsap) return; // the page runs its own GSAP choreography
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
    if (box.closest('.rv,.reveal,[data-rv],[role=tabpanel],[hidden],.slide,.slides,.panels')) return; // the concept already animates or swaps this one
    if (getComputedStyle(box).animationName !== 'none') return;
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

/* Hover that follows the content, not just the mouse (laptops).
   When the page scrolls, or a pinned strip slides, under a still mouse, browsers don't tell the page that the pointer
   has left one item and is now over another, so hover effects (photos that follow the pointer, tilted tiles, cursor
   labels, magnetic buttons) stayed switched on. After each scroll frame this checks what is really under the pointer
   and sends the leave and enter events the browser skipped. Leaving the window or switching tabs ends every hover. */
(function () {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  var x = -1, y = -1, chain = [], raf = 0;
  function at(px, py) { var c = [], e = document.elementFromPoint(px, py); while (e) { c.push(e); e = e.parentElement; } return c; }
  function fire(el, type, rel) {
    var o = { bubbles: /over|out/.test(type), cancelable: true, clientX: x, clientY: y, relatedTarget: rel || null, view: window };
    try { el.dispatchEvent(type.indexOf('pointer') === 0 ? new PointerEvent(type, Object.assign(o, { pointerType: 'mouse', isPrimary: true, pointerId: 1 })) : new MouseEvent(type, o)); } catch (e) {}
  }
  function swap(now) {
    var gone = chain.filter(function (e) { return now.indexOf(e) < 0; }), added = now.filter(function (e) { return chain.indexOf(e) < 0; });
    if (!gone.length && !added.length) return false;
    if (gone[0]) { fire(gone[0], 'pointerout', now[0]); fire(gone[0], 'mouseout', now[0]); }
    gone.forEach(function (e) { fire(e, 'pointerleave', now[0]); fire(e, 'mouseleave', now[0]); });
    if (now[0]) { fire(now[0], 'pointerover', gone[0]); fire(now[0], 'mouseover', gone[0]); }
    added.slice().reverse().forEach(function (e) { fire(e, 'pointerenter', gone[0]); fire(e, 'mouseenter', gone[0]); });
    chain = now; return true;
  }
  addEventListener('pointermove', function (e) { if (e.isTrusted) { x = e.clientX; y = e.clientY; chain = at(x, y); } }, { passive: true, capture: true });
  addEventListener('scroll', function () {
    if (raf || x < 0) return;
    raf = requestAnimationFrame(function () {
      raf = 0;
      // pointer-follow effects also get a move at the same spot, so they track the item now under the pointer
      if (swap(at(x, y)) && chain[0]) { fire(chain[0], 'pointermove'); fire(chain[0], 'mousemove'); }
    });
  }, { passive: true });
  function end() { if (x < 0) return; swap([]); x = y = -1; }
  document.documentElement.addEventListener('mouseleave', end);
  addEventListener('blur', end);
  document.addEventListener('visibilitychange', function () { if (document.hidden) end(); });
})();

/* The normal mouse pointer, always. Custom cursors hid the real pointer, so it got lost. The pointer stays on every
   design; only 05 Studio (Play / Pause over the slideshow) and 08 Kinetic (the dot that opens into View) keep a cursor
   effect, and there it follows alongside the normal pointer. */
(function () {
  var slug = document.documentElement.getAttribute('data-concept') || '';
  var keep = /^(05|08)-/.test(slug);
  var st = document.createElement('style');
  st.textContent =
    'html,html *{cursor:auto!important}' +
    'html :is(a,button,summary,label,select,[role=button],[data-play],.frame,.pp,.thumb){cursor:pointer!important}' +
    'html :is(input:not([type=checkbox]):not([type=radio]),textarea){cursor:text!important}' +
    (keep ? '' : '.cur{display:none!important}');
  document.head.appendChild(st);
})();

/* No bold words inside sentences: a highlighted phrase keeps its colour but takes the sentence's own weight.
   Headings, names and list titles keep their weight. */
(function () {
  var st = document.createElement('style');
  st.textContent = 'main :is(p,blockquote,dd,figcaption) :is(b,strong,em,mark,span,a){font-weight:inherit!important}' +
    'main :is(p,blockquote,dd,figcaption) :is(em){font-style:normal}';
  document.head.appendChild(st);
})();

/* People's names stay bold, in cards and in sentences. */
(function () {
  var re = /\b(Ranjana|Varun|Eshan) Gupta\b|\b(Hemant Kumar|Rizwan Sheikh|Vipul Koradia|Deepti Nanda|Mandeep Kaur|Jigar Parikh|Syed Shafi|Reeti Patel)\b/g;
  var st = document.createElement('style');
  st.textContent = 'main .tp-name,main .tp-name *{font-weight:700!important}';
  document.head.appendChild(st);
  function run() {
    var main = document.querySelector('main');
    if (!main) return;
    var w = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!re.test(n.nodeValue)) return NodeFilter.FILTER_REJECT;
        re.lastIndex = 0;
        return n.parentNode.closest('script,style,.tp-name,[aria-hidden="true"] svg')
          ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    var list = [], n;
    while ((n = w.nextNode())) list.push(n);
    list.forEach(function (t) {
      var p = t.parentNode;
      if (p.textContent.trim() === t.nodeValue.trim() && t.nodeValue.trim().replace(re, '') === '') {
        // a name that is its own label: bold only at reading sizes; large display names keep their font's real weight
        // (forcing bold on a display face that has no bold cut smears the letters)
        if (parseFloat(getComputedStyle(p).fontSize) < 20) p.classList.add('tp-name');
        re.lastIndex = 0; return;
      }
      var frag = document.createDocumentFragment(), s = t.nodeValue, last = 0, m;
      re.lastIndex = 0;
      while ((m = re.exec(s))) {
        frag.appendChild(document.createTextNode(s.slice(last, m.index)));
        var b = document.createElement('b'); b.className = 'tp-name'; b.textContent = m[0];
        frag.appendChild(b); last = m.index + m[0].length;
      }
      frag.appendChild(document.createTextNode(s.slice(last)));
      p.replaceChild(frag, t);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();

/* One calm type scale on tablets and laptops: display type, headings and long lines never grow past a cap,
   whatever a concept's own clamp() says. Runs before the page's motion is set up, so pins and splits measure the
   final size. Phones keep their own tuned sizes. */
(function () {
  var SKIP = 'script,style,svg,svg *,noscript,.ac-panel,.ac-panel *,.ac-launch,.ac-launch *';
  function words(t) { t = t.trim(); return t ? t.split(/\s+/).length : 0; }
  function cap() {
    [].forEach.call(document.querySelectorAll('[data-tpcap]'), function (e) { e.style.removeProperty('font-size'); e.removeAttribute('data-tpcap'); });
    var vw = window.innerWidth;
    if (vw < 761) return;
    var C = {
      long: Math.max(22, Math.min(28, vw * 0.019)),
      h2: Math.max(34, Math.min(48, vw * 0.034)),
      h1: Math.max(44, Math.min(72, vw * 0.052)),
      mid: Math.max(30, Math.min(48, vw * 0.034)),
      short: Math.max(48, Math.min(80, vw * 0.056))
    };
    var all = document.body.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      var e = all[i];
      if (e.matches(SKIP)) continue;
      var fs = parseFloat(getComputedStyle(e).fontSize);
      if (fs <= C.long) continue;
      var pf = e.parentElement ? parseFloat(getComputedStyle(e.parentElement).fontSize) : 0;
      if (Math.abs(fs - pf) < .5) continue;          // inherits its size: the element that sets it is capped instead
      var n = words(e.textContent), tag = e.tagName, lim;
      if (!n) continue;
      if (tag === 'H1' || e.closest('h1')) lim = C.h1;
      else if (tag === 'H2' || e.closest('h2')) lim = C.h2;   // a heading keeps the heading scale, however many words
      else if (n >= 8) lim = C.long;
      else if (n >= 2) lim = C.mid;      // names, phrases, phone numbers
      else lim = C.short;                // a single display word or number
      if (fs > lim + .5) { e.style.setProperty('font-size', lim.toFixed(1) + 'px', 'important'); e.setAttribute('data-tpcap', ''); }
    }
  }
  cap();
  var t; window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(cap, 250); });
})();
