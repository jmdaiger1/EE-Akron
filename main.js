(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  if (btn && menu) {
    var setOpen = function (open) {
      menu.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open);
    };
    btn.addEventListener('click', function () { setOpen(!menu.classList.contains('open')); });
    menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  }

  // Photo galleries
  document.querySelectorAll('[data-gallery]').forEach(function (g) {
    var track = g.querySelector('.track');
    var count = g.querySelector('.g-count');
    var n = track.children.length;
    var index = function () { return Math.round(track.scrollLeft / track.clientWidth); };
    var update = function () { count.textContent = (index() + 1) + ' / ' + n; };
    var go = function (d) {
      var i = (index() + d + n) % n;
      track.scrollTo({ left: i * track.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
    };
    g.querySelector('.g-prev').addEventListener('click', function () { go(-1); });
    g.querySelector('.g-next').addEventListener('click', function () { go(1); });
    track.addEventListener('scroll', update, { passive: true });
    update();
  });
})();
