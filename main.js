/* =============================================
   CRISPY CLEAN MOBILE CAR WASH — MAIN JS
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ===== YEAR =====
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ===== MOBILE NAV =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.classList.toggle('nav-open', isOpen);
    });

    // Close on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.classList.remove('nav-open');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.classList.remove('nav-open');
      }
    });
  }

  // ===== ACTIVE NAV LINK (scroll spy) =====
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const updateActiveLink = () => {
    const scrollY = window.scrollY + 120;
    let current = '';
    sections.forEach(section => {
      if (scrollY >= section.offsetTop) {
        current = section.getAttribute('id');
      }
    });
    navLinkEls.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // ===== INTERSECTION OBSERVER (scroll animations) =====
  const animatedEls = document.querySelectorAll('[data-animate]');
  if (animatedEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger delay based on sibling position
          const siblings = Array.from(entry.target.parentNode.children);
          const idx = siblings.indexOf(entry.target);
          const delay = Math.min(idx * 80, 400);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all
    animatedEls.forEach(el => el.classList.add('visible'));
  }

  // ===== SMOOTH SCROLL for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== HERO CARD PARALLAX (subtle) =====
  const heroCard = document.querySelector('.hero-card');
  if (heroCard) {
    document.addEventListener('mousemove', (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 12;
      const y = (e.clientY / innerHeight - 0.5) * 12;
      heroCard.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

});
