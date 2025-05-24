// MENÚ HAMBURGUESA SIMPLIFICADO
console.log('🍔 Iniciando menú hamburguesa...');

// Variables globales
let menuButton;
let mobileMenu;
let isMenuOpen = false;

// Función para inicializar el menú
function initMenu() {
    console.log('📱 Inicializando menú móvil...');
    
    // Obtener elementos
    menuButton = document.getElementById('mobile-menu');
    mobileMenu = document.getElementById('nav-menu');
    
    console.log('🔍 Elementos encontrados:');
    console.log('- Botón:', menuButton ? '✅' : '❌');
    console.log('- Menú:', mobileMenu ? '✅' : '❌');
    
    if (!menuButton || !mobileMenu) {
        console.error('🚨 ERROR: Elementos del menú no encontrados');
        return;
    }
    
    // Agregar evento click al botón
    menuButton.addEventListener('click', toggleMenu);
    menuButton.addEventListener('touchend', function(e) {
        e.preventDefault();
        toggleMenu();
    });
    
    // Cerrar menú al hacer click en enlaces
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !menuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMenu();
        }
    });
    
    console.log('✅ Menú inicializado correctamente');
}

// Función para abrir/cerrar menú
function toggleMenu() {
    console.log('🔄 Toggle menú - Estado actual:', isMenuOpen ? 'Abierto' : 'Cerrado');
    
    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

// Función para abrir menú
function openMenu() {
    console.log('📂 Abriendo menú...');
    
    menuButton.classList.add('active');
    mobileMenu.classList.add('active');
    document.body.classList.add('menu-open');
    isMenuOpen = true;
    
    console.log('✅ Menú abierto');
}

// Función para cerrar menú
function closeMenu() {
    console.log('📁 Cerrando menú...');
    
    menuButton.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
    isMenuOpen = false;
    
    console.log('✅ Menú cerrado');
}

// SCROLL TO TOP BUTTON
function initScrollButton() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (!scrollBtn) return;
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// HEADER SCROLL EFFECTS
function initScrollEffects() {
    const header = document.querySelector('.header');
    const scrollBtn = document.getElementById('scrollToTop');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header effects
        if (header) {
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Auto-hide en móviles
            if (window.innerWidth <= 768) {
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            }
        }
        
        // Scroll to top button
        if (scrollBtn && window.innerWidth <= 768) {
            if (scrollTop > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        }
        
        lastScrollTop = scrollTop;
    });
}

// SMOOTH SCROLLING
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// FORMULARIOS
function initForms() {
    // Formulario de contacto
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showMessage('¡Mensaje enviado exitosamente!', 'success');
            this.reset();
        });
    }
    
    // Newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showMessage('¡Suscripción exitosa!', 'success');
            this.reset();
        });
    }
}

// SISTEMA DE MENSAJES
function showMessage(text, type = 'info') {
    const message = document.createElement('div');
    message.className = `toast toast-${type}`;
    message.textContent = text;
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #d4ff00;
        color: #000;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 9999;
        font-family: 'Poppins', sans-serif;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => message.remove(), 300);
    }, 3000);
}

// INICIALIZACIÓN PRINCIPAL
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando aplicación...');
    
    // Esperar un poco para asegurar que el DOM esté completamente listo
    setTimeout(() => {
        initMenu();
        initScrollButton();
        initScrollEffects();
        initSmoothScroll();
        initForms();
        
        console.log('🎉 Aplicación inicializada completamente');
    }, 100);
});

// EVENTOS DE VENTANA
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && isMenuOpen) {
        closeMenu();
    }
});

window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        if (isMenuOpen) {
            closeMenu();
        }
    }, 500);
});

// ESTILOS DINÁMICOS
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .menu-open {
        overflow: hidden !important;
    }
`;
document.head.appendChild(dynamicStyles);

console.log('📜 Script cargado completamente');
