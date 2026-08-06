/* ============================================
   IMMO HOESSEN - INTERACTIVITÉ (partagé par toutes les pages)
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ==========================================
  // MENU MOBILE (hamburger)
  // ==========================================
  const menuToggle = document.createElement('button');
  menuToggle.className = 'menu-toggle';
  menuToggle.setAttribute('aria-label', 'Menu');
  menuToggle.innerHTML = '<span></span><span></span><span></span>';

  const headerInner = document.querySelector('.header-inner');
  const nav = document.querySelector('.nav');

  if (headerInner && nav) {
    headerInner.appendChild(menuToggle);

    menuToggle.addEventListener('click', function () {
      this.classList.toggle('active');
      nav.classList.toggle('active');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }

  // ==========================================
  // ANIMATION AU DÉFILEMENT (reveal)
  // ==========================================
  const revealSelectors = '.card, .icon-card, .intro, .founder-card, .contact-card, .portal-feature, .phones, .offer-card';
  const revealElements = document.querySelectorAll(revealSelectors);

  revealElements.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const revealOnScroll = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealOnScroll.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealOnScroll.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // ==========================================
  // BOUTON RETOUR EN HAUT
  // ==========================================
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Retour en haut');
  backToTop.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 15l-6-6-6 6"/>
    </svg>
  `;
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.pageYOffset > 300);

    const header = document.querySelector('.header');
    if (header) {
      header.style.boxShadow = window.pageYOffset > 100 ? '0 2px 20px rgba(0,0,0,0.1)' : 'none';
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==========================================
  // LAZY LOADING AUTOMATIQUE
  // ==========================================
  document.querySelectorAll('img:not([loading])').forEach(img => {
    img.setAttribute('loading', 'lazy');
  });

  // ==========================================
  // SCROLL FLUIDE POUR LES ANCRES INTERNES
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ==========================================
  // EFFET PARALLAX SUR LA PHOTO DE COUVERTURE
  // ==========================================
  const heroCover = document.querySelector('.hero .cover');
  if (heroCover) {
    window.addEventListener('scroll', () => {
      const rate = window.pageYOffset * 0.3;
      heroCover.style.transform = `translateY(${rate}px) scale(1.08)`;
    });
  }
});
