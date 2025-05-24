// Menu hamburguesa y funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const contactForm = document.querySelector('.contact-form form');
    const newsletterForm = document.querySelector('.newsletter-form');

    // Toggle del menú móvil
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            // Toggle clases activas
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevenir scroll del body cuando el menú está abierto
            document.body.classList.toggle('menu-open');
        });
    }

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // Cerrar menú al hacer click fuera de él
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = mobileMenu.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Header con efecto scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Auto-hide header en scroll down, show en scroll up (solo en móviles)
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            // En PC siempre visible
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Smooth scrolling para navegación interna
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Funcionalidad de búsqueda
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                performSearch(searchTerm);
            } else {
                showMessage('Por favor, ingresa un término de búsqueda', 'warning');
            }
        });

        // Búsqueda con Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchBtn.click();
            }
        });
    }

    // Función de búsqueda simple
    function performSearch(term) {
        const searchableElements = document.querySelectorAll('h1, h2, h3, p, li');
        const results = [];
        const searchRegex = new RegExp(term, 'gi');

        searchableElements.forEach(element => {
            if (searchRegex.test(element.textContent)) {
                results.push({
                    element: element,
                    section: findParentSection(element)
                });
            }
        });

        if (results.length > 0) {
            // Scroll al primer resultado
            const firstResult = results[0];
            const headerHeight = header.offsetHeight;
            const targetPosition = firstResult.element.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Resaltar temporalmente el resultado
            highlightElement(firstResult.element);
            
            showMessage(`Se encontraron ${results.length} resultado(s) para "${term}"`, 'success');
        } else {
            showMessage(`No se encontraron resultados para "${term}"`, 'info');
        }

        // Limpiar búsqueda
        searchInput.value = '';
    }

    // Encontrar sección padre
    function findParentSection(element) {
        let parent = element.parentElement;
        while (parent && !parent.matches('section')) {
            parent = parent.parentElement;
        }
        return parent;
    }

    // Resaltar elemento
    function highlightElement(element) {
        const originalBg = element.style.backgroundColor;
        element.style.backgroundColor = 'rgba(212, 255, 0, 0.3)';
        element.style.transition = 'background-color 0.3s ease';
        
        setTimeout(() => {
            element.style.backgroundColor = originalBg;
            setTimeout(() => {
                element.style.transition = '';
            }, 300);
        }, 2000);
    }

    // Manejo del formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formObject = {};
            
            // Obtener todos los campos del formulario
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                const value = input.value.trim();
                formObject[input.name || input.placeholder] = value;
                
                // Validación básica
                if (input.hasAttribute('required') && !value) {
                    showFieldError(input, 'Este campo es obligatorio');
                    isValid = false;
                } else if (input.type === 'email' && value && !isValidEmail(value)) {
                    showFieldError(input, 'Por favor, ingresa un email válido');
                    isValid = false;
                } else {
                    clearFieldError(input);
                }
            });
            
            if (isValid) {
                // Simular envío del formulario
                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    showMessage('¡Mensaje enviado exitosamente! Te contactaremos pronto.', 'success');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }

    // Manejo del formulario de newsletter
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                showMessage('Por favor, ingresa tu correo electrónico', 'warning');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Por favor, ingresa un correo electrónico válido', 'warning');
                return;
            }
            
            // Simular suscripción
            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Suscribiendo...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showMessage('¡Te has suscrito exitosamente a nuestro newsletter!', 'success');
                emailInput.value = '';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Validación de email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Mostrar error en campo
    function showFieldError(field, message) {
        clearFieldError(field);
        
        field.style.borderColor = '#ff4444';
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #ff4444;
            font-size: 12px;
            margin-top: 5px;
            animation: fadeInUp 0.3s ease;
        `;
        
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }

    // Limpiar error de campo
    function clearFieldError(field) {
        field.style.borderColor = '';
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    // Sistema de mensajes/notificaciones
    function showMessage(message, type = 'info') {
        // Crear elemento de mensaje
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = message;
        
        // Estilos del mensaje
        const colors = {
            success: '#4CAF50',
            warning: '#FF9800',
            error: '#f44336',
            info: '#2196F3'
        };
        
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${colors[type] || colors.info};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 9999;
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            max-width: 300px;
            animation: slideInFromRight 0.3s ease;
            cursor: pointer;
        `;
        
        // Añadir al DOM
        document.body.appendChild(messageDiv);
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            messageDiv.style.animation = 'slideOutToRight 0.3s ease';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }, 5000);
        
        // Remover al hacer click
        messageDiv.addEventListener('click', () => {
            messageDiv.style.animation = 'slideOutToRight 0.3s ease';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        });
    }

    // Animaciones en scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    const animateElements = document.querySelectorAll('.service-card, .iot-card, .mv-card');
    animateElements.forEach(el => observer.observe(el));

    // Botones CTA con efecto ripple
    document.querySelectorAll('.cta-button, .submit-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Lazy loading para imágenes (si las hay)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Prevenir comportamiento por defecto en botones sin href
    document.querySelectorAll('button, .cta-button').forEach(button => {
        if (!button.type && !button.form) {
            button.addEventListener('click', function(e) {
                if (!this.getAttribute('onclick') && !this.getAttribute('href')) {
                    // Puedes personalizar las acciones aquí
                    showMessage('Funcionalidad en desarrollo. ¡Pronto estará disponible!', 'info');
                }
            });
        }
    });
});

// Agregar estilos CSS para las animaciones mediante JavaScript
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideInFromRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutToRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .menu-open {
        overflow: hidden;
    }

    .header.scrolled {
        background-color: rgba(26, 26, 26, 0.98);
        backdrop-filter: blur(20px);
    }

    .field-error {
        animation: fadeInUp 0.3s ease;
    }

    @media (max-width: 768px) {
        .message {
            right: 10px !important;
            left: 10px !important;
            max-width: none !important;
        }
    }
`;

document.head.appendChild(styleSheet);

// Función de utilidad para detectar dispositivo móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Función de utilidad para detectar Safari
function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

// Optimizaciones específicas para Safari
if (isSafari()) {
    document.body.classList.add('safari');
    const safariStyles = document.createElement('style');
    safariStyles.textContent = `
        .safari .header {
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }
    `;
    document.head.appendChild(safariStyles);
}

// Manejar cambios de orientación en móviles
window.addEventListener('orientationchange', function() {
    // Cerrar menú móvil si está abierto
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (navMenu && navMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
    
    // Recalcular alturas después del cambio de orientación
    setTimeout(() => {
        window.scrollTo(0, window.scrollY);
    }, 500);
});

// Manejar cambios de tamaño de ventana
window.addEventListener('resize', function() {
    const header = document.querySelector('.header');
    if (header && window.innerWidth > 768) {
        // En PC siempre mostrar header
        header.style.transform = 'translateY(0)';
    }
});

console.log('🔒 CyberIAFigueroaSec - Sistema inicializado correctamente');
