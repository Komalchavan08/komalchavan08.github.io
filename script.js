// ═══════════════════════════════════════
//  KOMAL CHAVAN — PORTFOLIO JS
// ═══════════════════════════════════════

// ── Sticky Header ──
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
  setActiveNav();
});

// ── Mobile Menu ──
const menuIcon = document.getElementById('menuIcon');
const menuBx   = document.getElementById('menuBx');
const navbar   = document.getElementById('navbar');

menuIcon.addEventListener('click', () => {
  navbar.classList.toggle('open');
  menuBx.className = navbar.classList.contains('open') ? 'bx bx-x' : 'bx bx-menu';
});
document.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => {
    navbar.classList.remove('open');
    menuBx.className = 'bx bx-menu';
  });
});
document.addEventListener('click', e => {
  if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
    navbar.classList.remove('open');
    menuBx.className = 'bx bx-menu';
  }
});

// ── Active Nav on scroll ──
function setActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 130) current = s.id;
  });
  links.forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('href') === '#' + current) l.classList.add('active');
  });
}

// ── Scroll Reveal ──
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('show'), i * 100);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Typing Effect ──
const typedEl = document.querySelector('.typed-text');
const words   = ['Frontend Developer', 'Java Programmer', 'Web Designer', 'MCA Graduate', 'Problem Solver'];
let wi = 0, ci = 0, deleting = false;

function type() {
  const word = words[wi];
  if (!deleting) {
    typedEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = word.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
    }
  }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// ── Contact Form ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn');
    const orig = btn.textContent;
    btn.textContent = 'Message Sent ✓';
    btn.style.background = 'transparent';
    btn.style.color = 'var(--green)';
    btn.style.outline = '2px solid var(--green)';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = orig;
      btn.style = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

// ── Certificate Lightbox ──
const certModal      = document.getElementById('certModal');
const certModalImg   = document.getElementById('certModalImg');
const certModalClose = document.getElementById('certModalClose');
const certModalBg    = document.getElementById('certModalBg');

function openCert(src) {
  certModalImg.src = src;
  certModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCert() {
  certModal.classList.remove('open');
  document.body.style.overflow = '';
}
if (certModalClose) certModalClose.addEventListener('click', closeCert);
if (certModalBg)    certModalBg.addEventListener('click', closeCert);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCert(); });
window.addEventListener('DOMContentLoaded', () => {
  const targets = [
    '.home-content', '.home-img',
    '.about-img-wrap', '.about-content',
    '.project-card', '.cert-card',
    '.contact-info', '.contact-form',
    '.section-title', '.section-sub'
  ];
  targets.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
  });
  // Re-observe newly added elements
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
});