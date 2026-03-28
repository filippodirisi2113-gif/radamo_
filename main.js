/* ========================================
   RADAMÒ — main.js
   Shared JavaScript across all pages
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAVBAR SCROLL EFFECT ---- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        // Only remove on homepage (where it starts transparent)
        if (!navbar.classList.contains('scrolled') || window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
          navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Inner pages always have scrolled class; homepage starts without
    if (!navbar.classList.contains('scrolled')) {
      handleScroll();
    }
  }

  /* ---- HERO PARALLAX & LOAD ANIMATION ---- */
  const hero = document.getElementById('hero');
  if (hero) {
    // Trigger slow zoom-out
    requestAnimationFrame(() => { hero.classList.add('loaded'); });

    // Subtle parallax on scroll
    window.addEventListener('scroll', () => {
      const heroYOffset = window.scrollY;
      const heroBg = hero.querySelector('.hero__bg');
      if (heroBg) {
        heroBg.style.transform = `scale(1) translateY(${heroYOffset * 0.3}px)`;
      }
    }, { passive: true });
  }

  /* ---- MOBILE MENU ---- */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const navOverlay = document.getElementById('navOverlay');

  const openMenu  = () => {
    hamburger?.classList.add('open');
    mobileMenu?.classList.add('open');
    navOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger?.setAttribute('aria-expanded', 'true');
  };
  const closeMenu = () => {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
    navOverlay?.classList.remove('open');
    document.body.style.overflow = '';
    hamburger?.setAttribute('aria-expanded', 'false');
  };

  hamburger?.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });
  navOverlay?.addEventListener('click', closeMenu);
  mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  /* ---- SCROLL REVEAL ---- */
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });
    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ---- MENU TABS (menu.html) ---- */
  const menuTabs = document.getElementById('menuTabs');
  if (menuTabs) {
    const tabs     = menuTabs.querySelectorAll('.menu-tab');
    const categories = document.querySelectorAll('.menu-category');

    // Check URL param for auto-selecting tab
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam  = urlParams.get('tab');

    const activateTab = (tabId) => {
      tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
      categories.forEach(c => c.classList.toggle('active', c.id === 'tab-' + tabId));
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', () => activateTab(tab.dataset.tab));
    });

    if (tabParam) activateTab(tabParam);
  }

  /* ---- SMOOTH ACTIVE LINK HIGHLIGHT ---- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__nav a, .navbar__mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

});
