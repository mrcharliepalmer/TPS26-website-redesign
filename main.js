/* ============================================================
   THE PODCAST SHOW LONDON 2026 — MAIN.JS
   Shared JavaScript for all pages.
   ============================================================ */

/* --- Page transitions --- */
const mainEl = document.getElementById('main');

// Fade in on page load
if (mainEl) {
  requestAnimationFrame(() => mainEl.classList.add('is-visible'));
}

// Fade out on internal link click
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href]');
  if (!link || !mainEl) return;

  const href = link.getAttribute('href');

  // Skip external links, anchors, mailto, tel, new-tab links, and modified clicks
  if (!href
    || href.startsWith('#')
    || href.startsWith('mailto:')
    || href.startsWith('tel:')
    || href.startsWith('http')
    || link.target === '_blank'
    || e.ctrlKey || e.metaKey || e.shiftKey) return;

  e.preventDefault();
  mainEl.classList.remove('is-visible');
  mainEl.classList.add('is-leaving');

  setTimeout(() => { window.location.href = href; }, 200);
});

// Handle back/forward navigation (bfcache)
window.addEventListener('pageshow', (e) => {
  if (e.persisted && mainEl) {
    mainEl.classList.remove('is-leaving');
    mainEl.classList.add('is-visible');
  }
});


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

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

const mobileClose = mobileMenu.querySelector('.mobile-menu__close');
if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
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


/* --- Photo break parallax --- */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!prefersReducedMotion.matches) {
  const parallaxBreaks = document.querySelectorAll('.photo-break--parallax');

  if (parallaxBreaks.length) {
    const updateParallax = () => {
      const vh = window.innerHeight;
      parallaxBreaks.forEach(el => {
        const rect = el.getBoundingClientRect();
        // Only compute when in viewport
        if (rect.bottom < 0 || rect.top > vh) return;
        // Progress: 0 when element enters bottom, 1 when it leaves top
        const progress = (vh - rect.top) / (vh + rect.height);
        // Shift image upward as user scrolls down (70% speed = 30% offset range)
        const img = el.querySelector('img');
        const maxShift = img.offsetHeight - el.offsetHeight;
        img.style.transform = `translateY(${-(progress * maxShift * 0.7)}px)`;
      });
    };

    window.addEventListener('scroll', updateParallax, { passive: true });
    window.addEventListener('resize', updateParallax, { passive: true });
    updateParallax();
  }
}


/* --- Speaker avatar stagger entrance --- */
const speakerGrid = document.querySelector('.home-speakers__grid');

if (speakerGrid) {
  const speakerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        speakerObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  speakerObserver.observe(speakerGrid);
}




/* --- Scroll-arrow utility (shared by programme carousel + partner activations) --- */
function initScrollArrows(trackSel, prevSel, nextSel, opts) {
  const track = document.querySelector(trackSel);
  const prev = document.querySelector(prevSel);
  const next = document.querySelector(nextSel);
  if (!track || !prev || !next) return;

  const cardSel = (opts && opts.cardSelector) || ':scope > *';
  const mode = (opts && opts.mode) || 'class'; // 'class' uses is-hidden, 'disabled' sets disabled attr

  const getScrollAmount = () => {
    const card = track.querySelector(cardSel);
    if (!card) return 300;
    return card.offsetWidth + (parseInt(getComputedStyle(track).gap) || 24);
  };

  const update = () => {
    const sl = track.scrollLeft;
    const max = track.scrollWidth - track.clientWidth;
    if (mode === 'disabled') {
      prev.disabled = sl <= 2;
      next.disabled = sl + track.clientWidth >= track.scrollWidth - 2;
    } else {
      prev.classList.toggle('is-hidden', sl <= 5);
      next.classList.toggle('is-hidden', sl >= max - 5);
    }
  };

  prev.addEventListener('click', () => track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' }));
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}

/* Programme stages carousel (homepage + programme page) */
initScrollArrows(
  '.programme__marquee-track',
  '.programme__arrow--prev',
  '.programme__arrow--next',
  { cardSelector: '.programme-card' }
);

/* Partner activations carousel */
initScrollArrows(
  '.partner-activations__track',
  '.partner-activations__arrow--prev',
  '.partner-activations__arrow--next',
  { cardSelector: '.partner-activations__card', mode: 'disabled' }
);


/* --- Partner quotes rotator --- */
const quotesStage = document.querySelector('.partner-quotes__stage');

if (quotesStage) {
  const slides = quotesStage.querySelectorAll('.partner-quotes__slide');
  const dots = quotesStage.querySelectorAll('.partner-quotes__dot');
  const prevBtn = quotesStage.querySelector('.partner-quotes__arrow--prev');
  const nextBtn = quotesStage.querySelector('.partner-quotes__arrow--next');
  let current = 0;
  let autoTimer = null;
  const INTERVAL = 6000;

  const goTo = (index) => {
    slides[current].classList.remove('is-active');
    slides[current].hidden = true;
    dots[current].classList.remove('is-active');
    dots[current].setAttribute('aria-selected', 'false');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('is-active');
    slides[current].hidden = false;
    // Re-trigger fade animation
    slides[current].style.animation = 'none';
    slides[current].offsetHeight;
    slides[current].style.animation = '';
    dots[current].classList.add('is-active');
    dots[current].setAttribute('aria-selected', 'true');
  };

  prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); resetAuto(); });
  });

  // Auto-rotation (respects prefers-reduced-motion)
  const startAuto = () => {
    if (prefersReducedMotion.matches) return;
    autoTimer = setInterval(() => goTo(current + 1), INTERVAL);
  };

  const resetAuto = () => {
    clearInterval(autoTimer);
    startAuto();
  };

  // Pause on hover
  quotesStage.addEventListener('mouseenter', () => clearInterval(autoTimer));
  quotesStage.addEventListener('mouseleave', () => startAuto());

  startAuto();
}
