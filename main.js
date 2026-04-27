/* ============================================
   IMMO HOESSEN - INTERATIVIDADE
   JavaScript para animações e comportamentos
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // MENU MOBILE HAMBURGUER
  // ==========================================
  const menuToggle = document.createElement('button');
  menuToggle.className = 'menu-toggle';
  menuToggle.setAttribute('aria-label', 'Menu');
  menuToggle.innerHTML = '<span></span><span></span><span></span>';
  
  const headerInner = document.querySelector('.header-inner');
  const nav = document.querySelector('.nav');
  
  if (headerInner && nav) {
    headerInner.appendChild(menuToggle);
    
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      nav.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }
  
  // ==========================================
  // ANIMAÇÃO AO SCROLL (REVEAL)
  // ==========================================
  const revealElements = document.querySelectorAll('.card, .intro');
  
  revealElements.forEach(el => {
    el.classList.add('reveal');
  });
  
  const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealOnScroll.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => revealOnScroll.observe(el));
  
  // ==========================================
  // BOTÃO VOLTAR AO TOPO
  // ==========================================
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Voltar ao topo');
  backToTop.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 15l-6-6-6 6"/>
    </svg>
  `;
  document.body.appendChild(backToTop);
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // ==========================================
  // HEADER TRANSPARENTE AO SCROLL
  // ==========================================
  const header = document.querySelector('.header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
      header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });
  
  // ==========================================
  // ÍCONES NOS CARDS (adicionar automaticamente)
  // ==========================================
  const cardIcons = {
    'gestion': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    'administration': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
    'technique': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    'financiere': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    'conseil': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
    'suivi': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    'conformite': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
    'ag': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    'urgence': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    'default': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'
  };
  
  const cards = document.querySelectorAll('.card');
  
  cards.forEach((card, index) => {
    const title = card.querySelector('h3');
    if (!title) return;
    
    const text = title.textContent.toLowerCase();
    let iconKey = 'default';
    
    if (text.includes('base')) iconKey = 'gestion';
    else if (text.includes('admin')) iconKey = 'administration';
    else if (text.includes('technique')) iconKey = 'technique';
    else if (text.includes('financier')) iconKey = 'financiere';
    else if (text.includes('conseil') || text.includes('audit')) iconKey = 'conseil';
    else if (text.includes('suivi') || text.includes('quotidien')) iconKey = 'suivi';
    else if (text.includes('conformite') || text.includes('légal')) iconKey = 'conformite';
    else if (text.includes('ag') || text.includes('assemblée')) iconKey = 'ag';
    else if (text.includes('urgence')) iconKey = 'urgence';
    
    const iconDiv = document.createElement('div');
    iconDiv.className = 'card-icon';
    iconDiv.innerHTML = cardIcons[iconKey] || cardIcons.default;
    
    card.insertBefore(iconDiv, title);
  });
  
  // ==========================================
  // LAZY LOADING PARA IMAGENS
  // ==========================================
  const images = document.querySelectorAll('img:not([loading])');
  
  images.forEach(img => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
  });
  
  // ==========================================
  // SMOOTH SCROLL PARA LINKS INTERNOS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // ==========================================
  // EFEITO PARALLAX NA HERO
  // ==========================================
  const hero = document.querySelector('.hero');
  const heroCover = document.querySelector('.hero .cover');
  
  if (hero && heroCover) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;
      heroCover.style.transform = `translateY(${rate}px) scale(1.1)`;
    });
  }
  
  // ==========================================
  // CONTADOR ANIMADO (se houver números)
  // ==========================================
  const animateCounter = (el, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start);
      }
    }, 16);
  };
  
  // Observar elementos com data-counter
  document.querySelectorAll('[data-counter]').forEach(el => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(el.getAttribute('data-counter'));
          animateCounter(el, target);
          observer.unobserve(el);
        }
      });
    });
    observer.observe(el);
  });
  
  console.log('🚀 Immo Hoessen - Site carregado com sucesso!');
});
