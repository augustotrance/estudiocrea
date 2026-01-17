// ====================
// SMOOTH SCROLL MEJORADO
// ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
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

// ====================
// SCROLL ANIMATIONS (FADE IN)
// ====================

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observar elementos con animación
const animatedElements = document.querySelectorAll(
  '.lab-step, .portfolio-card, .service-card, .manifesto-line'
);

animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Clase para elementos visibles
const style = document.createElement('style');
style.textContent = `
  .visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// ====================
// PARALLAX SUTIL EN HERO
// ====================

const heroShapes = document.querySelectorAll('.shape');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxSpeed = 0.5;
  
  heroShapes.forEach((shape, index) => {
    const speed = parallaxSpeed * (index + 1);
    shape.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ====================
// CURSOR PERSONALIZADO (OPCIONAL)
// ====================

const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
  .custom-cursor {
    width: 20px;
    height: 20px;
    border: 2px solid #ff2e8b;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease, opacity 0.15s ease;
    opacity: 0;
    mix-blend-mode: difference;
  }
  
  .custom-cursor.active {
    opacity: 1;
  }
  
  .custom-cursor.hover {
    transform: scale(1.5);
    background: rgba(255, 46, 139, 0.2);
  }
`;
document.head.appendChild(cursorStyle);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX - 10 + 'px';
  cursor.style.top = e.clientY - 10 + 'px';
  cursor.classList.add('active');
});

// Efecto hover en elementos interactivos
const interactiveElements = document.querySelectorAll('a, button, .portfolio-card, .service-card');

interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
  });
  
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
});

// ====================
// CONTADOR ANIMADO PARA STATS
// ====================

const animateCounter = (element, target, duration = 2000) => {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + (element.dataset.suffix || '');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + (element.dataset.suffix || '');
    }
  }, 16);
};

// Observar stats para animarlos cuando entren en viewport
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      
      statNumbers.forEach(stat => {
        const text = stat.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[0-9]/g, '');
        stat.dataset.suffix = suffix;
        animateCounter(stat, number, 1500);
      });
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  statsObserver.observe(heroStats);
}

// ====================
// FORMULARIO - VALIDACIÓN BÁSICA
// ====================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Aquí podés integrar tu servicio de envío (Formspree, Netlify Forms, etc.)
    const formData = new FormData(contactForm);
    
    // Feedback visual
    const submitButton = contactForm.querySelector('.btn-primary');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Simular envío (reemplazar con tu lógica real)
    setTimeout(() => {
      submitButton.textContent = '✓ Mensaje enviado';
      submitButton.style.background = '#a4ff3a';
      
      // Reset después de 3 segundos
      setTimeout(() => {
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.style.background = '';
        submitButton.disabled = false;
      }, 3000);
    }, 1500);
  });
}

// ====================
// HEADER TRANSPARENTE AL SCROLL
// ====================

const header = document.querySelector('.site-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.background = 'rgba(10, 10, 15, 0.95)';
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
  } else {
    header.style.background = 'rgba(10, 10, 15, 0.8)';
    header.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// ====================
// LAZY LOADING DE IMÁGENES (cuando agregues imágenes reales)
// ====================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

console.log('🎨 Crea Design Studio — Site loaded');
