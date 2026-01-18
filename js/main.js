/* ========================================
   CREA DESIGN STUDIO - MAIN JAVASCRIPT
   ======================================== */

// ==================== NAVEGACIÓN CON SCROLL ====================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== SMOOTH SCROLL PARA ENLACES ====================
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

// ==================== FORMULARIO DE CONTACTO ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Capturar datos del formulario
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            currentSite: document.getElementById('current-site').value,
            budget: document.getElementById('budget').value,
            message: document.getElementById('message').value
        };
        
        // Log de datos (para desarrollo)
        console.log('📨 Formulario enviado:', formData);
        
        // Aquí puedes agregar la lógica para enviar el formulario a tu backend
        // Ejemplo: 
        // fetch('/api/contact', { 
        //     method: 'POST', 
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(formData) 
        // })
        
        // Mensaje de confirmación
        alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
        
        // Reset del formulario
        contactForm.reset();
    });
}

// ==================== ANIMACIONES AL SCROLL ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animación de fade-in
document.querySelectorAll('.process-card, .portfolio-card, .service-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});

// ==================== ANIMACIÓN DE CONTADORES EN STATS ====================
const animateCounter = (element, target) => {
    const duration = 2000; // 2 segundos
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + 
                (target.toString().includes('+') ? '+' : '') + 
                (target.toString().includes('%') ? '%' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Observar stats para animación de contadores
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statNumber = entry.target.querySelector('.stat-number');
            const targetText = statNumber.textContent;
            const targetNum = parseInt(targetText.replace(/\D/g, ''));
            
            statNumber.textContent = '0';
            animateCounter(statNumber, targetText);
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// ==================== PORTFOLIO CARDS HOVER EFFECT ====================
document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// ==================== PARALLAX EFFECT EN HERO (OPCIONAL) ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ==================== VALIDACIÓN DE FORMULARIO EN TIEMPO REAL ====================
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value) && this.value !== '') {
            this.style.borderColor = '#ff2d92';
        } else {
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }
    });
}

// ==================== MENSAJE DE CONSOLA ====================
console.log('%c🎨 Crea Design Studio', 'font-size: 20px; font-weight: bold; color: #ff2d92;');
console.log('%cWebsite loaded successfully ✨', 'font-size: 14px; color: #00d9ff;');
console.log('%c¿Buscas talento? Contáctanos en hola@creadesignstudio.com', 'font-size: 12px; color: #a1a1aa;');
