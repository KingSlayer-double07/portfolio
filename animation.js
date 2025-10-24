// Reveal on scroll + stagger via data-delay
const revealEls = document.querySelectorAll('.reveal');

const io = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || '0', 10);
      // apply delay via transition-delay to both opacity & transform
      el.style.transitionDelay = `${delay}ms`;
      requestAnimationFrame(() => el.classList.add('revealed'));
      io.unobserve(el);
    }
  }
}, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

// Simple 3D tilt on hover (no external lib)
const tiltEls = document.querySelectorAll('.tilt');

tiltEls.forEach(card => {
  // speed & limits
  const maxDeg = 8;

  function handleMove(e) {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = (e.clientX - cx) / (rect.width / 2);
    const y = (e.clientY - cy) / (rect.height / 2);
    const rotY = x * maxDeg;       // left/right
    const rotX = -y * maxDeg;      // up/down
    card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
  }

  function reset() {
    card.style.transform = '';
  }

  card.addEventListener('mousemove', handleMove);
  card.addEventListener('mouseleave', reset);
});

// Active nav link on scroll
const sections = [...document.querySelectorAll('section[id]')];
const navLinks = [...document.querySelectorAll('.nav__link')];

function setActiveNav() {
  const y = window.scrollY + 120; // offset for sticky nav
  let activeId = null;
  for (const s of sections) {
    const top = s.offsetTop;
    const bottom = top + s.offsetHeight;
    if (y >= top && y < bottom) { activeId = s.id; break; }
  }
  navLinks.forEach(a => {
    const href = a.getAttribute('href') || '';
    const id = href.startsWith('#') ? href.slice(1) : null;
    a.removeAttribute('aria-current');
    if (id && id === activeId) a.setAttribute('aria-current', 'page');
  });
}
window.addEventListener('scroll', setActiveNav);
window.addEventListener('load', setActiveNav);

// Optional: smooth scroll offset fix for sticky nav (if needed)
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^=\"#\"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  const target = document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  const offset = 80; // nav height
  const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
});
