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
// JAVASCRIPT CORREGIDO PARA EL MENÚ HAMBURGUESA

// Reemplazar la función initMenu existente con esta versión corregida:

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
    
    // Limpiar eventos previos
    menuButton.removeEventListener('click', toggleMenu);
    menuButton.removeEventListener('touchend', handleTouch);
    
    // Agregar eventos al botón
    menuButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });
    
    // Evento touch para móviles
    function handleTouch(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    }
    
    menuButton.addEventListener('touchend', handleTouch);
    
    // Cerrar menú al hacer click en enlaces
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('🔗 Click en enlace - cerrando menú');
            closeMenu();
        });
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (isMenuOpen && 
            !menuButton.contains(e.target) && 
            !mobileMenu.contains(e.target)) {
            console.log('👆 Click fuera del menú - cerrando');
            closeMenu();
        }
    });
    
    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            console.log('⌨️ Tecla Escape - cerrando menú');
            closeMenu();
        }
    });
    
    console.log('✅ Menú inicializado correctamente');
}

// Función para abrir/cerrar menú (corregida)
function toggleMenu() {
    console.log('🔄 Toggle menú - Estado actual:', isMenuOpen ? 'Abierto' : 'Cerrado');
    
    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

// Función para abrir menú (corregida)
function openMenu() {
    console.log('📂 Abriendo menú...');
    
    if (!menuButton || !mobileMenu) {
        console.error('❌ No se pueden encontrar elementos del menú');
        return;
    }
    
    // Activar clases
    menuButton.classList.add('active');
    mobileMenu.classList.add('active');
    document.body.classList.add('menu-open');
    
    // Cambiar variable de estado
    isMenuOpen = true;
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
    
    console.log('✅ Menú abierto');
}

// Función para cerrar menú (corregida)
function closeMenu() {
    console.log('📁 Cerrando menú...');
    
    if (!menuButton || !mobileMenu) {
        console.error('❌ No se pueden encontrar elementos del menú');
        return;
    }
    
    // Remover clases
    menuButton.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
    
    // Cambiar variable de estado
    isMenuOpen = false;
    
    // Restaurar scroll del body
    document.body.style.overflow = '';
    
    console.log('✅ Menú cerrado');
}

// Función mejorada para manejar formularios sin romper el menú
function initMobileFormImprovements() {
    console.log('📱 Inicializando mejoras para formularios móviles...');
    
    if (window.innerWidth <= 768) {
        const header = document.querySelector('.header');
        const inputs = document.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Al enfocar un input
            input.addEventListener('focus', function() {
                // Solo ocultar header si el menú NO está abierto
                if (!isMenuOpen && header) {
                    console.log('📝 Input enfocado - ocultando header');
                    header.style.transform = 'translateY(-100%)';
                    header.style.transition = 'transform 0.3s ease';
                    document.body.classList.add('form-focused');
                }
                
                // Scroll suave al input
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
                setTimeout(() => {
                    const anyInputFocused = document.querySelector('input:focus, textarea:focus');
                    
                    if (!anyInputFocused && !isMenuOpen && header) {
                        console.log('📝 Restaurando header');
                        header.style.transform = 'translateY(0)';
                        document.body.classList.remove('form-focused');
                    }
                }, 150);
            });
        });
    }
    
    console.log('✅ Mejoras móviles inicializadas');
}

// INICIALIZACIÓN PRINCIPAL CORREGIDA
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando aplicación...');
    
    // Esperar un poco para asegurar que el DOM esté completamente listo
    setTimeout(() => {
        initMenu(); // ← Inicializar menú primero
        initScrollButton();
        initScrollEffects();
        initSmoothScroll();
        initMobileFormImprovements(); // ← Después las mejoras móviles
        
        console.log('🎉 Aplicación inicializada completamente');
    }, 100);
});

// Manejar cambios de tamaño de ventana
window.addEventListener('resize', function() {
    // Cerrar menú si se cambia a desktop
    if (window.innerWidth > 768 && isMenuOpen) {
        closeMenu();
    }
    
    // Re-inicializar mejoras móviles si es necesario
    if (window.innerWidth <= 768) {
        initMobileFormImprovements();
    }
});

// Manejar cambios de orientación
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        if (isMenuOpen) {
            closeMenu();
        }
        if (window.innerWidth <= 768) {
            initMobileFormImprovements();
        }
    }, 500);
});

console.log('📜 Script del menú cargado completamente');
