(() => {
  const header = document.querySelector('.header');
  const fv = document.querySelector('.fv');
  const onScroll = () => header.classList.toggle('is-scrolled', !fv || window.scrollY > fv.offsetHeight - header.offsetHeight);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const btn = document.querySelector('.menu-btn');
  const drawer = document.querySelector('.drawer');
  if (btn && drawer) {
    const set = (open) => {
      drawer.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
      document.documentElement.classList.toggle('is-locked', open);
    };
    btn.addEventListener('click', () => set(!drawer.classList.contains('is-open')));
    drawer.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
  }

  document.querySelectorAll('.ttl__en').forEach((t) => t.querySelectorAll('.mask').forEach((m, i) => m.style.setProperty('--m', i)));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      if (el.classList.contains('rv')) {
        const sibs = [...el.parentElement.children].filter((c) => c.classList.contains('rv'));
        el.style.setProperty('--rv-delay', `${sibs.indexOf(el) * 0.12}s`);
      }
      el.classList.add('is-on');
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.rv, .ttl__en').forEach((el) => io.observe(el));

  document.querySelectorAll('form[data-todo]').forEach((f) => f.addEventListener('submit', (e) => e.preventDefault()));

  const io2 = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const sibs = [...el.parentElement.children].filter((c) => c.classList.contains('pic') || c.classList.contains('deco'));
      el.style.setProperty('--rv-delay', `${sibs.indexOf(el) * 0.15}s`);
      el.classList.add('is-on'); io2.unobserve(el);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.pic, .deco, .ttl2__en').forEach((el) => io2.observe(el));
  document.querySelectorAll('.ttl2__en').forEach((t) => t.querySelectorAll('.mask').forEach((m, i) => {
    m.style.setProperty('--m', i);
    const sp = m.firstElementChild; const txt = sp.textContent; sp.textContent = '';
    [...txt].forEach((ch, k) => { const e = document.createElement('span'); e.className = 'ch2'; e.style.setProperty('--i', k); e.textContent = ch; sp.appendChild(e); });
    sp.style.transform = 'none';
  }));
  const bar = document.querySelector('.progress');
  const par = [...document.querySelectorAll('.collage__b, .collage__c')];
  const onS = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.setProperty('--sp', (max > 0 ? scrollY / max : 0).toFixed(4));
    par.forEach((el, k) => { const r = el.getBoundingClientRect(); const d = (r.top + r.height / 2 - innerHeight / 2) / innerHeight; el.style.setProperty('--py', `${(d * (k % 2 ? -14 : 12)).toFixed(1)}px`); });
  };
  addEventListener('scroll', () => requestAnimationFrame(onS), { passive: true }); onS();
  const st = document.querySelector('.fv__stage');
  if (st && matchMedia('(hover: hover)').matches) st.addEventListener('mousemove', (e) => { const r = st.getBoundingClientRect(); st.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3)); st.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3)); });
  let n = 0;
  document.querySelectorAll('.fv__line').forEach((line) => {
    const walk = (node) => {
      [...node.childNodes].forEach((c) => {
        if (c.nodeType === 3) {
          const frag = document.createDocumentFragment();
          [...c.textContent].forEach((ch) => { const sp = document.createElement('span'); sp.className = 'fv__ch'; sp.style.setProperty('--c', n++); sp.textContent = ch; frag.appendChild(sp); });
          c.replaceWith(frag);
        }
      });
    };
    walk(line);
  });
  const ecs = [];
  document.querySelectorAll('.fv__en-l').forEach((w) => {
    const t = w.textContent; w.textContent = '';
    [...t].forEach((ch) => { const o = document.createElement('span'); o.className = 'fv__ec'; const i = document.createElement('span'); i.style.setProperty('--c', ecs.length); i.textContent = ch; o.appendChild(i); w.appendChild(o); ecs.push(o); });
  });
  const stage = document.querySelector('.fv__stage');
  if (fv && stage) {
    const clamp = (v) => Math.min(1, Math.max(0, v));
    const tick = () => {
      const run = fv.offsetHeight - stage.offsetHeight;
      const t = run > 0 ? clamp(window.scrollY / run) : 0;
      const p1 = clamp(t / 0.18);
      const p2 = clamp((t - 0.14) / 0.18);
      const p3 = clamp((t - 0.5) / 0.12);
      const p4 = clamp((t - 0.6) / 0.16);
      [['--p1', p1], ['--p2', p2], ['--p3', p3], ['--p4', p4]].forEach(([k, v]) => fv.style.setProperty(k, v.toFixed(3)));
      fv.classList.toggle('is-msg', p2 > 0.6 && p3 < 0.4);
      fv.classList.toggle('is-salon', p4 > 0.6);
      fv.classList.toggle('is-msg-still', p3 === 0);
      fv.classList.toggle('is-rest', p1 === 0);
      const nE = ecs.length || 1;
      ecs.forEach((e, k) => e.style.setProperty('--o', clamp(1 - (p1 * 1.8 - (k / nE) * 0.8)).toFixed(3)));
    };
    window.addEventListener('scroll', () => requestAnimationFrame(tick), { passive: true });
    tick();
  }
})();
