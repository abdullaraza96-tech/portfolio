const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

$('#year').textContent = new Date().getFullYear();

const navToggle = $('.nav-toggle');
const nav = $('.nav-links');
navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(open));
});
$$('.nav-links a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('is-open');
  navToggle?.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.10 });
$$('.reveal').forEach(el => observer.observe(el));

const glow = $('.cursor-glow');
if (glow && matchMedia('(pointer:fine)').matches) {
  addEventListener('pointermove', e => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }, { passive: true });
}

const lightbox = $('.lightbox');
const lightboxImg = $('.lightbox img');
const closeLightbox = () => {
  lightbox.hidden = true;
  document.body.style.overflow = '';
};
$$('.js-lightbox-trigger').forEach(el => {
  el.addEventListener('click', () => {
    lightboxImg.src = el.dataset.img;
    lightboxImg.alt = el.dataset.alt || 'Dashboard preview';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  });
});
$('.lightbox-close')?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
addEventListener('keydown', e => { if (e.key === 'Escape' && !lightbox.hidden) closeLightbox(); });
