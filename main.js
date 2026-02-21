/* ============================================================
   THE PODCAST SHOW LONDON 2026 — MAIN.JS
   Shared JavaScript for all pages.
   ============================================================ */

/* --- Urgency bar --- */
const urgencyBar = document.getElementById('urgency-bar');

if (urgencyBar) {
  if (sessionStorage.getItem('urgency-dismissed')) {
    urgencyBar.classList.add('is-hidden');
  } else {
    // Set CSS custom property for bar height so header offsets correctly
    const setBarHeight = () => {
      document.documentElement.style.setProperty(
        '--urgency-bar-h',
        urgencyBar.offsetHeight + 'px'
      );
    };
    setBarHeight();
    window.addEventListener('resize', setBarHeight, { passive: true });

    urgencyBar.querySelector('.urgency-bar__close').addEventListener('click', () => {
      urgencyBar.classList.add('is-hidden');
      sessionStorage.setItem('urgency-dismissed', '1');
      document.documentElement.style.setProperty('--urgency-bar-h', '0px');
    });
  }
}

/* --- Nav scroll behaviour --- */
const header = document.getElementById('site-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    header.classList.add('site-header--scrolled');
  } else {
    header.classList.remove('site-header--scrolled');
  }
}, { passive: true });

/* --- Mobile menu --- */
const hamburger = document.querySelector('.nav__hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
});

/* --- Scroll reveal --- */
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));
