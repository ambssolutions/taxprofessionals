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
    '.tp-fall.in .tp-w{transform:none;opacity:1}';
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
  if (!('IntersectionObserver' in window)) { heads.forEach(function (h) { h.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.2 });
  heads.forEach(function (h) { io.observe(h); });
}
