// MENÚ HAMBURGUESA Y FORMULARIO CORREGIDOS
console.log('🍔 Iniciando menú hamburguesa corregido...');

// Variables globales
let menuButton;
let mobileMenu;
let isMenuOpen = false;
let isInputFocused = false;

// Función para inicializar el menú (CORREGIDA)
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
        console.log('🔘 Click en botón hamburguesa');
        toggleMenu();
    });
    
    // Evento touch para móviles
    function handleTouch(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('👆 Touch en botón hamburguesa');
        toggleMenu();
    }
    
    menuButton.addEventListener('touchend', handleTouch, { passive: false });
    
    // Cerrar menú al hacer click en enlaces
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('🔗 Click en enlace del menú:', this.textContent);
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

// Función para abrir/cerrar menú (MEJORADA)
function toggleMenu() {
    console.log('🔄 Toggle menú - Estado actual:', isMenuOpen ? 'Abierto' : 'Cerrado');
    
    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

// Función para abrir menú (MEJORADA)
function openMenu() {
    console.log('📂 Abriendo menú...');
    
    if (!menuButton || !mobileMenu) {
        console.error('❌ No se pueden encontrar elementos del menú');
        return;
    }
    
    // Si hay un input enfocado, desenfocarlo primero
    if (isInputFocused) {
        const focusedInput = document.activeElement;
        if (focusedInput && (focusedInput.tagName === 'INPUT' || focusedInput.tagName === 'TEXTAREA')) {
            focusedInput.blur();
            console.log('📝 Input desenfocado para abrir menú');
        }
        isInputFocused = false;
    }
    
    // Activar clases
    menuButton.classList.add('active');
    mobileMenu.classList.add('active');
    document.body.classList.add('menu-open');
    document.body.classList.remove('form-input-focused'); // Remover clase de input enfocado
    
    // Cambiar variable de estado
    isMenuOpen = true;
    
    // Asegurar que el header esté visible
    const header = document.querySelector('.header');
    if (header) {
        header.style.transform = 'translateY(0)';
        header.style.opacity = '1';
        header.style.pointerEvents = 'auto';
    }
    
    console.log('✅ Menú abierto');
}

// Función para cerrar menú (MEJORADA)
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

// Función mejorada para manejar formularios SIN INTERFERIR CON EL MENÚ
function initMobileFormFix() {
    if (window.innerWidth <= 768) {
        console.log('📱 Inicializando corrección de formulario móvil mejorada...');
        
        const header = document.querySelector('.header');
        const body = document.body;
        const inputs = document.querySelectorAll('.newsletter-form input, .newsletter-form textarea, .contact-form input, .contact-form textarea');
        
        let focusTimeout;
        
        // Configurar viewport height para móviles
        function setViewportHeight() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        setViewportHeight();
        
        // Función para ocultar header (SOLO si menú no está abierto)
        function hideHeader() {
            if (header && !isMenuOpen) {
                header.style.transform = 'translateY(-100%)';
                header.style.transition = 'transform 0.3s ease';
                body.classList.add('form-input-focused');
                console.log('🙈 Header ocultado por input enfocado');
            }
        }
        
        // Función para mostrar header (SOLO si no hay inputs enfocados)
        function showHeader() {
            if (header && !isMenuOpen) {
                header.style.transform = 'translateY(0)';
                header.style.transition = 'transform 0.3s ease';
                body.classList.remove('form-input-focused');
                console.log('👁️ Header mostrado');
            }
        }
        
        // Función para hacer scroll al input
        function scrollToInput(input) {
            // NO hacer scroll si el menú está abierto
            if (isMenuOpen) return;
            
            setTimeout(() => {
                const headerHeight = header ? header.offsetHeight : 80;
                const inputRect = input.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                const targetY = scrollTop + inputRect.top - headerHeight - 30;
                
                console.log('📍 Haciendo scroll al input');
                
                window.scrollTo({
                    top: Math.max(0, targetY),
                    behavior: 'smooth'
                });
            }, 100);
        }
        
        // Event listeners para cada input
        inputs.forEach((input, index) => {
            // Evento focus - SOLO si menú no está abierto
            input.addEventListener('focus', function(e) {
                // NO procesar si el menú está abierto
                if (isMenuOpen) {
                    this.blur(); // Desenfocar inmediatamente
                    return;
                }
                
                console.log('📝 Input enfocado:', this.placeholder || this.name);
                
                if (focusTimeout) {
                    clearTimeout(focusTimeout);
                }
                
                isInputFocused = true;
                hideHeader();
                scrollToInput(this);
                
            }, { passive: false });
            
            // Evento blur
            input.addEventListener('blur', function(e) {
                console.log('📝 Input desenfocado:', this.placeholder || this.name);
                
                focusTimeout = setTimeout(() => {
                    const anyInputFocused = document.querySelector('.newsletter-form input:focus, .newsletter-form textarea:focus, .contact-form input:focus, .contact-form textarea:focus');
                    
                    if (!anyInputFocused && !isMenuOpen) {
                        console.log('📝 Ningún input enfocado - mostrando header');
                        isInputFocused = false;
                        showHeader();
                    }
                }, 150);
            });
            
            // Prevenir enfoque cuando menú está abierto
            input.addEventListener('touchstart', function(e) {
                if (isMenuOpen) {
                    e.preventDefault();
                    console.log('👆 Touch en input bloqueado - menú abierto');
                    return;
                }
            }, { passive: false });
            
            // Evento input para iOS
            input.addEventListener('input', function(e) {
                if (isInputFocused && !isMenuOpen) {
                    hideHeader();
                }
            });
        });
        
        // Manejar cambios de orientación
        window.addEventListener('orientationchange', function() {
            setTimeout(() => {
                setViewportHeight();
                
                // Si hay un input enfocado y menú cerrado, reajustar
                if (isInputFocused && !isMenuOpen) {
                    const focusedInput = document.querySelector('.newsletter-form input:focus, .newsletter-form textarea:focus');
                    if (focusedInput) {
                        scrollToInput(focusedInput);
                    }
                }
            }, 500);
        });
        
        // Manejar redimensionamiento
        window.addEventListener('resize', function() {
            setViewportHeight();
            
            if (window.innerWidth > 768) {
                showHeader();
                isInputFocused = false;
                isMenuOpen = false;
            }
        });
        
        // Manejar clics fuera del formulario
        document.addEventListener('click', function(e) {
            const formElement = e.target.closest('.newsletter-form, .contact-form');
            
            if (!formElement && isInputFocused && !isMenuOpen) {
                console.log('👆 Click fuera del formulario');
                
                setTimeout(() => {
                    const anyInputFocused = document.querySelector('input:focus, textarea:focus');
                    if (!anyInputFocused) {
                        isInputFocused = false;
                        showHeader();
                    }
                }, 100);
            }
        });
        
        // Manejar envío de formulario
        const forms = document.querySelectorAll('.newsletter-form, .contact-form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                console.log('📤 Formulario enviado');
                isInputFocused = false;
                showHeader();
            });
        });
        
        console.log('✅ Corrección de formulario móvil mejorada inicializada');
    }
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

// Función mejorada para inicializar todo
function initEnhancedMobile() {
    console.log('📱 Inicializando mejoras móviles avanzadas...');
    
    initMobileFormFix();
    
    // Prevenir zoom en iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        console.log('🍎 Dispositivo iOS detectado - previniendo zoom');
        
        const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
        inputs.forEach(input => {
            if (window.getComputedStyle(input).fontSize < '16px') {
                input.style.fontSize = '16px';
            }
        });
        
        // Prevenir zoom con viewport
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
    }
    
    console.log('✅ Mejoras móviles avanzadas completadas');
}

// INICIALIZACIÓN PRINCIPAL CORREGIDA
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando aplicación con menú y formulario corregidos...');
    
    setTimeout(() => {
        initMenu(); // ← Menú corregido
        initScrollButton();
        initScrollEffects();
        initSmoothScroll();
        initEnhancedMobile(); // ← Formulario que no interfiere con menú
        
        console.log('🎉 Aplicación completamente inicializada');
    }, 100);
});

// Manejar cambios de tamaño de ventana
window.addEventListener('resize', function() {
    // Cerrar menú si se cambia a desktop
    if (window.innerWidth > 768 && isMenuOpen) {
        closeMenu();
        isMenuOpen = false;
    }
    
    // Re-inicializar mejoras móviles si es necesario
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            initMobileFormFix();
        }, 300);
    }
});

// Manejar cambios de orientación
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        if (isMenuOpen) {
            // Reajustar menú si está abierto
            const mobileMenu = document.getElementById('nav-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                console.log('🔄 Reajustando menú tras cambio de orientación');
            }
        }
        
        if (window.innerWidth <= 768) {
            initMobileFormFix();
        }
    }, 500);
});

// Estilos dinámicos
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

console.log('📜 Script del menú y formulario corregido cargado completamente');
