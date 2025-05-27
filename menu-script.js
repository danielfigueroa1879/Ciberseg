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

// ============================================
// FORMULARIOS - SECCIÓN COMPLETAMENTE ELIMINADA
// Ya no interfiere con Netlify Forms
// ============================================

// INICIALIZACIÓN PRINCIPAL
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando aplicación...');
    
    // Esperar un poco para asegurar que el DOM esté completamente listo
    setTimeout(() => {
        initMenu();
        initScrollButton();
        initScrollEffects();
        initSmoothScroll();
        // ❌ initForms(); <- ELIMINADO para que Netlify funcione
        
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
// SOLUCIÓN JAVASCRIPT PARA EL PROBLEMA DEL FORMULARIO EN MÓVILES

// Agregar este código al final de tu archivo menu-script.js

// Función para ocultar/mostrar header cuando se enfocan los inputs
function initFormFocusHandler() {
    if (window.innerWidth <= 768) {
        const header = document.querySelector('.header');
        const inputs = document.querySelectorAll('input, textarea');
        let isInputFocused = false;
        
        inputs.forEach(input => {
            // Al enfocar un input
            input.addEventListener('focus', function() {
                console.log('📝 Input enfocado - ocultando header');
                isInputFocused = true;
                
                if (header) {
                    header.style.transform = 'translateY(-100%)';
                    header.style.transition = 'transform 0.3s ease';
                }
                
                // Agregar clase al body para identificar el estado
                document.body.classList.add('form-focused');
                
                // Hacer scroll suave al input si está muy arriba
                setTimeout(() => {
                    const rect = input.getBoundingClientRect();
                    if (rect.top < 100) {
                        input.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }
                }, 100);
            });
            
            // Al perder el foco
            input.addEventListener('blur', function() {
                console.log('📝 Input desenfocado');
                
                // Esperar un poco antes de mostrar el header por si el usuario
                // está cambiando entre inputs
                setTimeout(() => {
                    const anyInputFocused = document.querySelector('input:focus, textarea:focus');
                    
                    if (!anyInputFocused) {
                        console.log('📝 Ningún input enfocado - mostrando header');
                        isInputFocused = false;
                        
                        if (header) {
                            header.style.transform = 'translateY(0)';
                        }
                        
                        document.body.classList.remove('form-focused');
                    }
                }, 150);
            });
        });
        
        // Manejar el evento de submit para restaurar el header
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function() {
                console.log('📝 Formulario enviado - restaurando header');
                isInputFocused = false;
                
                if (header) {
                    header.style.transform = 'translateY(0)';
                }
                
                document.body.classList.remove('form-focused');
            });
        });
    }
}

// Función para ajustar el viewport en móviles
function adjustMobileViewport() {
    if (window.innerWidth <= 768) {
        // Ajustar la altura del viewport para tener en cuenta el teclado virtual
        function updateViewportHeight() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        updateViewportHeight();
        
        window.addEventListener('resize', updateViewportHeight);
        window.addEventListener('orientationchange', () => {
            setTimeout(updateViewportHeight, 500);
        });
    }
}

// Función para mejorar el scroll en formularios
function initSmoothFormScroll() {
    const contactSection = document.getElementById('contacto');
    
    if (contactSection && window.innerWidth <= 768) {
        // Cuando se hace click en el enlace de contacto, asegurar scroll correcto
        const contactLinks = document.querySelectorAll('a[href="#contacto"]');
        
        contactLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Calcular la posición correcta considerando el header
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = contactSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                console.log('🎯 Scroll suave al formulario de contacto');
            });
        });
    }
}

// Función para prevenir el zoom en iOS
function preventIOSZoom() {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
        
        inputs.forEach(input => {
            // Asegurar que el font-size sea al menos 16px para prevenir zoom
            if (window.getComputedStyle(input).fontSize < '16px') {
                input.style.fontSize = '16px';
            }
        });
    }
}

// Función principal para inicializar todas las mejoras móviles
function initMobileFormImprovements() {
    console.log('📱 Inicializando mejoras para formularios móviles...');
    
    initFormFocusHandler();
    adjustMobileViewport();
    initSmoothFormScroll();
    preventIOSZoom();
    
    console.log('✅ Mejoras móviles inicializadas');
}

// Agregar las mejoras móviles a la inicialización principal
// Modificar la función DOMContentLoaded existente para incluir:
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando aplicación...');
    
    setTimeout(() => {
        initMenu();
        initScrollButton();
        initScrollEffects();
        initSmoothScroll();
        initMobileFormImprovements(); // ← AGREGAR ESTA LÍNEA
        
        console.log('🎉 Aplicación inicializada completamente');
    }, 100);
});

// Manejar cambios de orientación y redimensionamiento
window.addEventListener('resize', function() {
    // Re-inicializar las mejoras si cambia el tamaño de pantalla
    if (window.innerWidth <= 768) {
        initMobileFormImprovements();
    }
});

window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        initMobileFormImprovements();
    }, 500);
});
