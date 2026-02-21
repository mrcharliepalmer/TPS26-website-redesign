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


/* --- Partner activations scroll arrows --- */
const activationsTrack = document.querySelector('.partner-activations__track');

if (activationsTrack) {
  const prevBtn = document.querySelector('.partner-activations__arrow--prev');
  const nextBtn = document.querySelector('.partner-activations__arrow--next');
  const card = activationsTrack.querySelector('.partner-activations__card');

  const getScrollAmount = () => {
    if (!card) return 340;
    return card.offsetWidth + parseInt(getComputedStyle(activationsTrack).gap) || 24;
  };

  const updateArrowState = () => {
    const { scrollLeft, scrollWidth, clientWidth } = activationsTrack;
    prevBtn.disabled = scrollLeft <= 2;
    nextBtn.disabled = scrollLeft + clientWidth >= scrollWidth - 2;
  };

  prevBtn.addEventListener('click', () => {
    activationsTrack.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    activationsTrack.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });

  activationsTrack.addEventListener('scroll', updateArrowState, { passive: true });
  window.addEventListener('resize', updateArrowState, { passive: true });
  updateArrowState();
}


/* --- Partner quotes carousel --- */
const quotesCarousel = document.querySelector('.partner-quotes__carousel');

if (quotesCarousel) {
  const slides = quotesCarousel.querySelectorAll('.partner-quotes__slide');
  const dots = quotesCarousel.querySelectorAll('.partner-quotes__dot');
  const prevBtn = quotesCarousel.querySelector('.partner-quotes__arrow--prev');
  const nextBtn = quotesCarousel.querySelector('.partner-quotes__arrow--next');
  let current = 0;

  const goTo = (index) => {
    slides[current].classList.remove('is-active');
    slides[current].hidden = true;
    dots[current].classList.remove('is-active');
    dots[current].setAttribute('aria-selected', 'false');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('is-active');
    slides[current].hidden = false;
    slides[current].style.animation = 'none';
    slides[current].offsetHeight; // trigger reflow
    slides[current].style.animation = '';
    dots[current].classList.add('is-active');
    dots[current].setAttribute('aria-selected', 'true');
  };

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });
}
