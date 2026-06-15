/* ═══════════════════════════════════════════════════
   CHECKER — RIDE IN STYLE
   script.js
   London, Ontario's Premier Taxi & Limousine Service
════════════════════════════════════════════════════ */

/* ── HEADER: scroll background ───────────────────── */
(function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load in case page is already scrolled
})();


/* ── MOBILE MENU toggle ───────────────────────────── */
function toggleMenu() {
  const menu      = document.getElementById('mobileMenu');
  const hamburger = document.getElementById('hamburger');
  if (!menu) return;

  const isOpen = menu.classList.toggle('open');

  // Animate hamburger → X
  if (hamburger) {
    const bars = hamburger.querySelectorAll('span');
    if (isOpen) {
      bars[0].style.transform = 'translateY(7px) rotate(45deg)';
      bars[1].style.opacity   = '0';
      bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      bars[0].style.transform = '';
      bars[1].style.opacity   = '';
      bars[2].style.transform = '';
    }
  }
}

// Close menu when clicking outside it
document.addEventListener('click', function (e) {
  const menu      = document.getElementById('mobileMenu');
  const hamburger = document.getElementById('hamburger');
  if (!menu || !menu.classList.contains('open')) return;
  if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
    menu.classList.remove('open');
    if (hamburger) {
      const bars = hamburger.querySelectorAll('span');
      bars[0].style.transform = '';
      bars[1].style.opacity   = '';
      bars[2].style.transform = '';
    }
  }
});


/* ── SMOOTH SCROLL for all #anchor links ─────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      // Close mobile menu if open
      const menu = document.getElementById('mobileMenu');
      if (menu && menu.classList.contains('open')) toggleMenu();

      // Offset for fixed header (72px)
      const headerHeight = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ── FAQ ACCORDION ────────────────────────────────── */
function toggleFaq(questionEl) {
  const item   = questionEl.parentElement;
  const isOpen = item.classList.contains('open');

  // Close all items first
  document.querySelectorAll('.faq-item').forEach(function (i) {
    i.classList.remove('open');
  });

  // Open the clicked item (unless it was already open)
  if (!isOpen) {
    item.classList.add('open');
  }
}

// Also allow clicking anywhere on the question row (not just via onclick attr)
(function initFaq() {
  document.querySelectorAll('.faq-question').forEach(function (q) {
    q.addEventListener('click', function () {
      toggleFaq(q);
    });
  });
})();


/* ── SCROLL REVEAL (IntersectionObserver) ─────────── */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();


/* ── FORM SUCCESS helper ──────────────────────────── */
function showFormSuccess(form, message) {
  form.style.display = 'none';

  const success = document.createElement('div');
  success.style.cssText = [
    'background:#F5C200',
    'color:#0d0d0d',
    'border-radius:12px',
    'padding:40px 32px',
    'text-align:center',
    'font-family:inherit',
  ].join(';');
  success.innerHTML = [
    '<div style="font-size:48px;margin-bottom:16px">✓</div>',
    '<h3 style="font-size:22px;font-weight:800;margin:0 0 10px">' + message.heading + '</h3>',
    '<p style="font-size:15px;margin:0 0 24px;opacity:.85">' + message.body + '</p>',
    '<a href="tel:5196590400" style="display:inline-block;background:#0d0d0d;color:#F5C200;font-weight:700;padding:12px 28px;border-radius:6px;text-decoration:none;font-size:15px">',
    'Or call us now — (519) 659-0400',
    '</a>',
  ].join('');

  form.parentNode.appendChild(success);
}

/* ── CONTACT FORM submission handler ─────────────── */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    showFormSuccess(form, {
      heading: 'Message Received!',
      body:    'Thank you — a Checker representative will be in touch with you shortly. We\'re available 24/7 if you need a faster response.',
    });
  });
})();


/* ── BUSINESS FORM submission handler ────────────── */
(function initBizForm() {
  const form = document.getElementById('bizForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    showFormSuccess(form, {
      heading: 'Business Inquiry Received!',
      body:    'We\'ll review your details and have a Checker representative reach out within one business day to get your account set up.',
    });
  });
})();


/* ── ACTIVE NAV highlight on scroll ──────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  function setActive() {
    let current = '';
    sections.forEach(function (section) {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.style.color = '';
      if (link.getAttribute('href') === '#' + current) {
        link.style.color = 'var(--white)';
      }
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
})();
