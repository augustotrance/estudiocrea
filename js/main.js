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
// CURSOR PERSONALIZADO - Solo animación, sin cursor del sistema
// ====================

document.body.style.cursor = 'none';

const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
  * {
    cursor: none !important;
  }

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
    transform: scale(1.8);
    background: rgba(255, 46, 139, 0.3);
    border-width: 3px;
  }
`;
document.head.appendChild(cursorStyle);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    cursor.classList.add('active');
});

document.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
});

document.addEventListener('mouseenter', () => {
    cursor.classList.add('active');
});

// Efecto hover en elementos interactivos
const interactiveElements = document.querySelectorAll(
    'a, button, .portfolio-card, .service-card, input, select, textarea'
);

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

        const submitButton = contactForm.querySelector('.btn-primary');
        const originalText = submitButton.textContent;

        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        // Simular envío (reemplazar con tu lógica real)
        setTimeout(() => {
            submitButton.textContent = '✓ Proyecto enviado';
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
// LAZY LOADING DE IMÁGENES
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

// ====================
// PORTFOLIO MODAL SYSTEM CON URLs E IMÁGENES
// ====================

// Datos de los proyectos (editá las URLs cuando las tengas listas)
const projectsData = {
    'beauty-premium': {
        category: 'Branding · Social · Web',
        title: 'Marca Premium · Beauty',
        subtitle: 'Reposicionamiento de marca de belleza como opción premium en su sector',
        client: 'Beauty Studio Premium',
        sector: 'Beauty & Wellness',
        services: 'Branding, Social Media, Web Design',
        year: '2025',
        challenge: 'El cliente necesitaba diferenciarse de la competencia local y justificar precios premium sin perder clientes actuales. La percepción de marca era genérica y no transmitía el nivel de servicio que ofrecían.',
        solution: 'Desarrollamos un sistema de identidad visual sofisticado con paleta neutra y acentos dorados, fotografía editorial de alta calidad y web experience tipo revista de lujo. Rediseñamos toda la comunicación en redes sociales con templates branded y estrategia de contenidos premium.',
        results: [
            '+40% engagement en 90 días',
            '0 → 12k seguidores orgánicos',
            'Aumento de ticket promedio 35%',
            'Retención de 90% de clientes existentes'
        ],
        heroImage: 'imagenes/portfolio/beauty-premium.jpg',
        gallery: [
            'imagenes/portfolio/beauty-1.jpg',
            'imagenes/portfolio/beauty-2.jpg',
            'imagenes/portfolio/beauty-3.jpg',
            'imagenes/portfolio/beauty-4.jpg'
        ],
        externalUrl: '' // Dejalo vacío o agregá la URL cuando la tengas
    },
    'derito-asociados': {
        category: 'Branding · Web Experience',
        title: 'Derito & asicioados · Estudio jurídico',
        subtitle: 'Identidad y web para estudio jurídico de abogados',
        client: 'Derito & asociados',
        sector: 'Estudio jurídico',
        services: 'Branding, UI/UX, Web Development',
        year: '2023',
        challenge: 'Estudio jurídico sin identidad visual clara, necesitaba transmitir confiabilidad y modernidad para captar clientes.',
        solution: 'Sistema de branding minimalista tech, web con micro-interacciones fluidas en Framer, landing page optimizada para conversión con copy orientado a beneficios de negocio. Desarrollamos toda la narrativa de marca desde cero.',
        results: [
            '+120% conversión en landing',
            'Reducción 45% bounce rate',
            'Featured en Product Hunt',
            'Cierre de con clientes Serie A'
        ],
        heroImage: 'imagenes/portfolio/logo_derito.jpg',
        gallery: [
            'imagenes/portfolio/derito_1.jpg',
            'imagenes/portfolio/derito_2.jpg',
            'imagenes/portfolio/derito_3.jpg',
            'imagenes/portfolio/derito_4.jpg',
            'imagenes/portfolio/derito_5.jpg'
        ],
        externalUrl: ''
    },
    'fashion-lifestyle': {
        category: 'Social Media Ecosystem',
        title: 'Fashion Brand · Lifestyle',
        subtitle: 'Ecosistema de contenido para marca de moda sustentable',
        client: 'Verde Moda Consciente',
        sector: 'Fashion & Lifestyle',
        services: 'Social Media Strategy, Content Design, Photography Direction',
        year: '2024',
        challenge: 'Marca con producto diferenciado pero sin presencia digital fuerte, feed genérico que no reflejaba los valores de sustentabilidad. Bajo engagement y pocas ventas por Instagram.',
        solution: 'Feed tipo editorial de lujo con fotografía de lifestyle cuidada, templates diseñados para storytelling de cada prenda, guidelines completas de fotografía y estrategia de contenidos enfocada en valores de marca.',
        results: [
            'Feed tipo editorial de lujo',
            '+28% CTR en Instagram',
            '3.5% engagement rate sostenido',
            '+40% ventas por Instagram en 3 meses'
        ],
        heroImage: 'imagenes/portfolio/fashion-lifestyle.jpg',
        gallery: [
            'imagenes/portfolio/fashion-1.jpg',
            'imagenes/portfolio/fashion-2.jpg',
            'imagenes/portfolio/fashion-3.jpg',
            'imagenes/portfolio/fashion-4.jpg',
            'imagenes/portfolio/fashion-5.jpg',
            'imagenes/portfolio/fashion-6.jpg'
        ],
        externalUrl: ''
    },
    'educacion-elearning': {
        category: 'Branding · Social · Web',
        title: 'Educación · E-learning',
        subtitle: 'Rebranding completo de plataforma educativa online',
        client: 'Academia Digital Pro',
        sector: 'Educación Online',
        services: 'Branding Systems, Web Design, Social Media',
        year: '2024',
        challenge: 'Plataforma educativa con marca amateur que no justificaba precios altos. Competían en un mercado saturado sin diferenciación clara.',
        solution: 'Rebranding completo con identidad premium, rediseño de plataforma web con mejor UX, estrategia de contenidos en redes para posicionamiento como referentes del sector.',
        results: [
            'Posicionamiento premium sector',
            '+200% inscripciones orgánicas',
            'Precio curso aumentado 60%',
            'Tasa de finalización de cursos +25%'
        ],
        heroImage: 'imagenes/portfolio/educacion-elearning.jpg',
        gallery: [
            'imagenes/portfolio/edu-1.jpg',
            'imagenes/portfolio/edu-2.jpg',
            'imagenes/portfolio/edu-3.jpg',
            'imagenes/portfolio/edu-4.jpg'
        ],
        externalUrl: ''
    },
    'restaurant-fb': {
        category: 'Branding · Art Direction',
        title: 'Restaurant Group · F&B',
        subtitle: 'Dirección de arte y menú digital para grupo gastronómico',
        client: 'Grupo Gastronómico del Sur',
        sector: 'Food & Beverage',
        services: 'Art Direction, Menu Design, Food Photography',
        year: '2024',
        challenge: 'Grupo con 3 locales sin identidad unificada, menús físicos desactualizados y fotografía amateur de platos. Necesitaban modernizar sin perder esencia.',
        solution: 'Dirección completa de sesiones fotográficas de productos, menú digital interactivo tipo revista gastronómica, estrategia visual coherente entre los 3 locales manteniendo personalidad única de cada uno.',
        results: [
            'Menú fotográfico tipo revista',
            '+50% reservas vía web',
            'Cobertura en medios gastronómicos',
            'Incremento 35% ticket promedio'
        ],
        heroImage: 'imagenes/portfolio/restaurant-fb.jpg',
        gallery: [
            'imagenes/portfolio/rest-1.jpg',
            'imagenes/portfolio/rest-2.jpg',
            'imagenes/portfolio/rest-3.jpg',
            'imagenes/portfolio/rest-4.jpg',
            'imagenes/portfolio/rest-5.jpg'
        ],
        externalUrl: ''
    },
    'alquilerdeautos-hertz': {
        category: 'Web · Social · Content',
        title: 'Alquiler de autos · Hertz',
        subtitle: 'Ecosistema digital para empresa de alquiler de autos',
        client: 'Hertz',
        sector: 'Alquiler de autos',
        services: 'Web Development, Social Content, Piezas gráficas',
        year: '2022',
        challenge: 'Creamos la página Web y posicionamos su empresa en Google.',
        solution: 'Desarrollamos la identidad de Hertz. Diseñamos folletería y videos publicitarios. Contruimos la estrategia de contenidos en redes sociales.',
        results: [
            'Modernización de la marca',
            '+85% tiempo en sitio',
            '15% leads cualificados adicionales',
            'Reducción 60% tiempo de cierre'
        ],
        heroImage: 'imagenes/portfolio/logo_hertz.png',
        gallery: [
            'imagenes/portfolio/hertz_1.png',
            'imagenes/portfolio/hertz_2.png',
            'imagenes/portfolio/hertz_3.png',
            'imagenes/portfolio/hertz_4.png',
            'imagenes/portfolio/hertz_5.png'
        ],
        externalUrl: ''
    }
};

// Array de IDs de proyectos en orden
const projectIds = Object.keys(projectsData);
let currentProjectIndex = 0;

// Elementos del modal
const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalOverlay = modal ? modal.querySelector('.modal-overlay') : null;

// Función para abrir el modal
function openModal(projectId) {
    if (!modal) return;

    const project = projectsData[projectId];
    if (!project) return;

    // Actualizar índice del proyecto actual
    currentProjectIndex = projectIds.indexOf(projectId);

    // Llenar datos del modal
    document.getElementById('modalCategory').textContent = project.category;
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalSubtitle').textContent = project.subtitle;
    document.getElementById('modalClient').textContent = project.client;
    document.getElementById('modalSector').textContent = project.sector;
    document.getElementById('modalServices').textContent = project.services;
    document.getElementById('modalYear').textContent = project.year;
    document.getElementById('modalChallenge').textContent = project.challenge;
    document.getElementById('modalSolution').textContent = project.solution;

    // Llenar imagen hero
    const heroImg = document.getElementById('modalHeroImg');
    if (project.heroImage) {
        heroImg.src = project.heroImage;
        heroImg.alt = project.title;
        heroImg.style.display = 'block';
    } else {
        heroImg.style.display = 'none';
    }

    // Llenar resultados
    const resultsContainer = document.getElementById('modalResults');
    resultsContainer.innerHTML = `
      <ul class="portfolio-metrics">
        ${project.results.map(result => `<li>${result}</li>`).join('')}
      </ul>
    `;

    // Llenar galería
    const galleryContainer = document.getElementById('modalGallery');
    galleryContainer.innerHTML = '';
    if (project.gallery && project.gallery.length > 0) {
        project.gallery.forEach(imgSrc => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `Galería ${project.title}`;
            galleryItem.appendChild(img);
            galleryContainer.appendChild(galleryItem);
        });
    }

    // Mostrar/ocultar link externo
    const externalLinkSection = document.getElementById('modalExternalLink');
    const externalLinkBtn = document.getElementById('modalExternalLinkBtn');

    if (project.externalUrl && project.externalUrl.trim() !== '') {
        externalLinkBtn.href = project.externalUrl;
        externalLinkSection.style.display = 'block';
    } else {
        externalLinkSection.style.display = 'none';
    }

    // Actualizar navegación
    updateNavigation();

    // Mostrar modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    modal.scrollTop = 0;
}

// Función para cerrar el modal
function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Función para actualizar botones de navegación
function updateNavigation() {
    const prevBtn = document.getElementById('navPrev');
    const nextBtn = document.getElementById('navNext');

    if (!prevBtn || !nextBtn) return;

    prevBtn.disabled = currentProjectIndex === 0;
    nextBtn.disabled = currentProjectIndex === projectIds.length - 1;
}

// Función para navegar entre proyectos
function navigateProject(direction) {
    const newIndex = currentProjectIndex + direction;
    if (newIndex < 0 || newIndex >= projectIds.length) return;
    const newProjectId = projectIds[newIndex];
    openModal(newProjectId);
}

// Event listeners para las cards del portfolio
document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.dataset.project;
        const externalUrl = card.dataset.url;

        // Si tiene URL externa, ir directo
        if (externalUrl && externalUrl.trim() !== '') {
            window.open(externalUrl, '_blank');
        } else if (projectId) {
            openModal(projectId);
        }
    });
});

// Event listener para cerrar modal
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
}

// Event listeners para navegación en modal
const prevBtn = document.getElementById('navPrev');
const nextBtn = document.getElementById('navNext');

if (prevBtn) {
    prevBtn.addEventListener('click', () => navigateProject(-1));
}
if (nextBtn) {
    nextBtn.addEventListener('click', () => navigateProject(1));
}

// Cerrar modal con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
    }
});

// Navegación con flechas del teclado dentro del modal
document.addEventListener('keydown', (e) => {
    if (!modal || !modal.classList.contains('active')) return;

    if (e.key === 'ArrowLeft') {
        navigateProject(-1);
    } else if (e.key === 'ArrowRight') {
        navigateProject(1);
    }
});

console.log('Crea Design Studio site loaded with full functionality');
