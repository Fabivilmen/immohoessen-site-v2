/* ============================================
   IMMO HOESSEN - INTERACTIVITÉ (partagé par toutes les pages)
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ==========================================
  // MENU MOBILE (hamburger)
  // ==========================================
  const menuToggle = document.createElement('button');
  menuToggle.className = 'menu-toggle';
  menuToggle.setAttribute('aria-label', 'Menu');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.innerHTML = '<span></span><span></span><span></span>';

  const headerInner = document.querySelector('.header-inner');
  const nav = document.querySelector('.nav');

  function closeMenu() {
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  if (headerInner && nav) {
    // Le sélecteur de langue reste toujours visible dans l'en-tête (pas caché dans le menu mobile)
    const langSwitch = nav.querySelector('.lang-switch') || document.querySelector('.lang-switch');
    if (langSwitch) headerInner.appendChild(langSwitch);
    headerInner.appendChild(menuToggle);

    menuToggle.addEventListener('click', function () {
      const open = this.classList.toggle('active');
      nav.classList.toggle('active', open);
      this.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

    // Fermer avec la touche Échap ou en cliquant en dehors du menu
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    document.addEventListener('click', e => {
      if (!nav.classList.contains('active')) return;
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) closeMenu();
    });
  }

  // ==========================================
  // ANIMATION AU DÉFILEMENT (reveal)
  // Les éléments apparaissent en douceur, l'un après l'autre.
  // Une fois l'animation terminée, la classe est retirée pour que
  // les effets au survol (hover) redeviennent instantanés.
  // ==========================================
  const revealSelectors = '.card, .icon-card, .intro, .founder-card, .contact-card, .portal-feature, .phones, .offer-card, .trust-item, .split-illustration';
  const revealElements = document.querySelectorAll(revealSelectors);

  function finishReveal(el, delay) {
    const duration = el.classList.contains('split-illustration') ? 1900 : 1000;
    setTimeout(() => {
      el.classList.remove('reveal', 'active');
      el.style.transitionDelay = '';
    }, delay + duration);
  }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    // Pas d'animation : tout reste visible tel quel
  } else {
    // Décalage progressif entre éléments « frères » (cartes d'une même grille)
    const rank = new Map();
    revealElements.forEach(el => {
      const n = rank.get(el.parentElement) || 0;
      rank.set(el.parentElement, n + 1);
      el.classList.add('reveal');
      el.style.transitionDelay = ((n % 4) * 90) + 'ms';
    });

    const revealOnScroll = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add('active');
          finishReveal(el, parseFloat(el.style.transitionDelay) || 0);
          revealOnScroll.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealOnScroll.observe(el));
  }

  // ==========================================
  // BARRE DE PROGRESSION + BOUTON RETOUR EN HAUT
  // ==========================================
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);

  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Retour en haut');
  backToTop.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 15l-6-6-6 6"/>
    </svg>
  `;
  document.body.appendChild(backToTop);

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  // ==========================================
  // SCROLL : en-tête, progression, parallax (un seul écouteur, fluide)
  // ==========================================
  const header = document.querySelector('.header');
  const hero = document.querySelector('.hero');
  const heroCover = document.querySelector('.hero .cover');
  let ticking = false;

  function onScroll() {
    const y = window.pageYOffset;
    const max = document.documentElement.scrollHeight - window.innerHeight;

    if (header) header.classList.toggle('scrolled', y > 40);
    backToTop.classList.toggle('visible', y > 300);
    progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';

    // Parallax : la photo de couverture glisse plus lentement que la page
    if (heroCover && hero && !reduceMotion && y < hero.offsetHeight) {
      heroCover.style.transform = 'translate3d(0,' + (y * 0.15) + 'px,0)';
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

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
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
    });
  });
});
