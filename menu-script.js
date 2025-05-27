// SOLUCIÓN COMPLETA PARA FORMULARIO MÓVIL - SIN INTERFERENCIA DEL HEADER
console.log('🔧 Iniciando corrección completa para formulario móvil...');

// Variables globales
let menuButton;
let mobileMenu;
let isMenuOpen = false;
let isInputFocused = false;
let keyboardHeight = 0;
let originalViewportHeight = window.innerHeight;

// FUNCIÓN 1: INICIALIZAR MENÚ HAMBURGUESA
function initMenu() {
    console.log('📱 Inicializando menú móvil...');
    
    menuButton = document.getElementById('mobile-menu');
    mobileMenu = document.getElementById('nav-menu');
    
    if (!menuButton || !mobileMenu) {
        console.error('🚨 ERROR: Elementos del menú no encontrados');
        return;
    }
    
    // Limpiar eventos previos
    menuButton.removeEventListener('click', toggleMenu);
    
    // Evento click principal
    menuButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🔘 Click en botón hamburguesa');
        toggleMenu();
    });
    
    // Cerrar menú al hacer click en enlaces
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('🔗 Click en enlace del menú');
            closeMenu();
        });
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (isMenuOpen && 
            !menuButton.contains(e.target) && 
            !mobileMenu.contains(e.target)) {
            closeMenu();
        }
    });
    
    console.log('✅ Menú inicializado correctamente');
}

function toggleMenu() {
    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

function openMenu() {
    console.log('📂 Abriendo menú...');
    
    // Desenfocar cualquier input activo
    const activeInput = document.activeElement;
    if (activeInput && (activeInput.tagName === 'INPUT' || activeInput.tagName === 'TEXTAREA')) {
        activeInput.blur();
        isInputFocused = false;
    }
    
    menuButton.classList.add('active');
    mobileMenu.classList.add('active');
    document.body.classList.add('menu-open');
    document.body.classList.remove('form-input-focused');
    
    isMenuOpen = true;
    
    // Forzar que el header sea visible
    const header = document.querySelector('.header');
    if (header) {
        header.style.transform = 'translateY(0) !important';
        header.style.zIndex = '1000';
        header.style.position = 'fixed';
    }
    
    console.log('✅ Menú abierto');
}

function closeMenu() {
    console.log('📁 Cerrando menú...');
    
    menuButton.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
    
    isMenuOpen = false;
    document.body.style.overflow = '';
    
    console.log('✅ Menú cerrado');
}

// FUNCIÓN 2: CORRECCIÓN AVANZADA PARA FORMULARIOS MÓVILES
function initAdvancedMobileFormFix() {
    if (window.innerWidth <= 768) {
        console.log('📱 Inicializando corrección avanzada de formulario móvil...');
        
        const header = document.querySelector('.header');
        const body = document.body;
        const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
        
        let focusTimeout;
        let scrollTimeout;
        let resizeTimeout;
        
        // PASO 1: CONFIGURAR VIEWPORT DINÁMICO
        function setDynamicViewport() {
            const currentHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
            keyboardHeight = Math.max(0, originalViewportHeight - currentHeight);
            
            document.documentElement.style.setProperty('--real-vh', `${currentHeight * 0.01}px`);
            document.documentElement.style.setProperty('--keyboard-height', `${keyboardHeight}px`);
            
            console.log(`📐 Viewport: ${currentHeight}px, Teclado: ${keyboardHeight}px`);
        }
        
        // PASO 2: MANEJO AGRESIVO DEL HEADER - OCULTAR COMPLETAMENTE
        function smartHeaderControl() {
            if (!header) return;
            
            if (isInputFocused && !isMenuOpen) {
                // OCULTAR HEADER COMPLETAMENTE Y AGRESIVAMENTE
                header.style.display = 'none'; // Ocultar completamente
                header.style.visibility = 'hidden';
                header.style.opacity = '0';
                header.style.transform = 'translateY(-100%)';
                header.style.zIndex = '-1';
                header.style.pointerEvents = 'none';
                body.classList.add('header-hidden', 'form-input-active');
                body.style.paddingTop = '0';
                console.log('🙈 Header COMPLETAMENTE ocultado para formulario');
            } else if (!isMenuOpen) {
                // MOSTRAR HEADER cuando no hay input enfocado
                header.style.display = 'block';
                header.style.visibility = 'visible';
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
                header.style.zIndex = '1000';
                header.style.pointerEvents = 'auto';
                body.classList.remove('header-hidden', 'form-input-active');
                body.style.paddingTop = '';
                console.log('👁️ Header completamente restaurado');
            }
        }
        
        // PASO 3: SCROLL ULTRA AGRESIVO PARA POSICIONAR INPUT CORRECTAMENTE
        function smartScrollToInput(input) {
            if (isMenuOpen) return;
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                console.log('📍 Scroll ULTRA AGRESIVO al input');
                
                // Desactivar cualquier interferencia del header
                if (header) {
                    header.style.position = 'absolute';
                    header.style.top = '-200px';
                }
                
                // Calcular posición sin considerar header
                const inputRect = input.getBoundingClientRect();
                const currentScroll = window.pageYOffset;
                const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
                
                // Posición agresiva: input en la parte MUY superior de la pantalla
                const targetScroll = currentScroll + inputRect.top - 50; // Solo 50px desde arriba
                
                // Scroll inmediato y forzado
                window.scrollTo({
                    top: Math.max(0, targetScroll),
                    behavior: 'instant' // Cambiar a instant para ser más rápido
                });
                
                // Scroll adicional después de un momento para asegurar posición
                setTimeout(() => {
                    const newInputRect = input.getBoundingClientRect();
                    if (newInputRect.top > 100) {
                        window.scrollTo({
                            top: window.pageYOffset + newInputRect.top - 50,
                            behavior: 'instant'
                        });
                    }
                }, 100);
                
            }, 50); // Reducir delay
        }
        
        // PASO 4: PREVENIR ZOOM EN IOS
        function preventIOSZoom() {
            inputs.forEach(input => {
                const computedStyle = window.getComputedStyle(input);
                const fontSize = parseFloat(computedStyle.fontSize);
                
                if (fontSize < 16) {
                    input.style.fontSize = '16px';
                    console.log('🍎 Zoom prevenido en input');
                }
            });
        }
        
        // PASO 5: EVENT LISTENERS MEJORADOS
        inputs.forEach((input, index) => {
            // EVENTO FOCUS - ULTRA AGRESIVO
            input.addEventListener('focus', function(e) {
                if (isMenuOpen) {
                    this.blur();
                    return;
                }
                
                console.log(`📝 Input ${index + 1} enfocado - MODO AGRESIVO`);
                
                clearTimeout(focusTimeout);
                isInputFocused = true;
                
                // SECUENCIA ULTRA AGRESIVA
                // 1. Ocultar header INMEDIATAMENTE
                if (header) {
                    header.style.display = 'none';
                    header.style.position = 'absolute';
                    header.style.top = '-500px';
                    header.style.zIndex = '-999';
                }
                
                // 2. Preparar el input para máxima visibilidad
                this.style.position = 'relative';
                this.style.zIndex = '9999';
                this.style.isolation = 'isolate';
                
                // 3. Ejecutar acciones de forma inmediata
                setTimeout(() => {
                    setDynamicViewport();
                    smartHeaderControl();
                    smartScrollToInput(this);
                    
                    // 4. Forzar que el input esté visible
                    this.scrollIntoView({
                        behavior: 'instant',
                        block: 'start',
                        inline: 'nearest'
                    });
                }, 10); // Muy rápido
                
            }, { passive: false });
            
            // EVENTO BLUR
            input.addEventListener('blur', function(e) {
                console.log(`📝 Input ${index + 1} desenfocado`);
                
                clearTimeout(focusTimeout);
                focusTimeout = setTimeout(() => {
                    const anyFocused = document.querySelector('input:focus, textarea:focus');
                    
                    if (!anyFocused && !isMenuOpen) {
                        console.log('📝 Todos los inputs desenfocados');
                        isInputFocused = false;
                        setDynamicViewport();
                        smartHeaderControl();
                    }
                }, 200);
            });
            
            // PREVENIR INTERACCIÓN CUANDO MENÚ ABIERTO
            input.addEventListener('touchstart', function(e) {
                if (isMenuOpen) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🚫 Input bloqueado - menú abierto');
                }
            }, { passive: false });
            
            input.addEventListener('mousedown', function(e) {
                if (isMenuOpen) {
                    e.preventDefault();
                    console.log('🚫 Input bloqueado - menú abierto');
                }
            });
        });
        
        // PASO 6: VISUAL VIEWPORT API (iOS Safari)
        if (window.visualViewport) {
            console.log('📱 Visual Viewport API disponible');
            
            window.visualViewport.addEventListener('resize', function() {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    setDynamicViewport();
                    if (isInputFocused) {
                        smartHeaderControl();
                    }
                }, 100);
            });
        }
        
        // PASO 7: MANEJAR CAMBIOS DE ORIENTACIÓN
        window.addEventListener('orientationchange', function() {
            console.log('🔄 Cambio de orientación detectado');
            
            setTimeout(() => {
                originalViewportHeight = window.innerHeight;
                setDynamicViewport();
                
                if (isInputFocused && !isMenuOpen) {
                    const focusedInput = document.querySelector('input:focus, textarea:focus');
                    if (focusedInput) {
                        smartScrollToInput(focusedInput);
                    }
                }
            }, 500);
        });
        
        // PASO 8: CLICK FUERA DEL FORMULARIO
        document.addEventListener('click', function(e) {
            const isFormElement = e.target.closest('.newsletter-form, .contact-form, input, textarea');
            
            if (!isFormElement && isInputFocused && !isMenuOpen) {
                console.log('👆 Click fuera del formulario - desenfocar');
                
                const activeInput = document.activeElement;
                if (activeInput && (activeInput.tagName === 'INPUT' || activeInput.tagName === 'TEXTAREA')) {
                    activeInput.blur();
                }
                
                setTimeout(() => {
                    if (!document.querySelector('input:focus, textarea:focus')) {
                        isInputFocused = false;
                        smartHeaderControl();
                    }
                }, 100);
            }
        });
        
        // INICIALIZACIÓN
        preventIOSZoom();
        setDynamicViewport();
        
        console.log('✅ Corrección avanzada de formulario inicializada');
    }
}

// FUNCIÓN 3: BOTONES DE SCROLL Y EFECTOS
function initScrollButton() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function initScrollEffects() {
    const header = document.querySelector('.header');
    const scrollBtn = document.getElementById('scrollToTop');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header effects (SOLO si no hay input enfocado y menú cerrado)
        if (header && !isInputFocused && !isMenuOpen) {
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
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

// FUNCIÓN 4: SMOOTH SCROLLING
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

// FUNCIÓN 5: INICIALIZACIÓN PRINCIPAL
function initAll() {
    console.log('🚀 Iniciando aplicación corregida...');
    
    setTimeout(() => {
        initMenu();
        initAdvancedMobileFormFix(); // ← CORRECCIÓN PRINCIPAL
        initScrollButton();
        initScrollEffects();
        initSmoothScroll();
        
        console.log('🎉 Aplicación completamente inicializada');
    }, 100);
}

// FUNCIÓN 6: MANEJAR REDIMENSIONAMIENTO
window.addEventListener('resize', function() {
    // Cerrar menú si se cambia a desktop
    if (window.innerWidth > 768 && isMenuOpen) {
        closeMenu();
    }
    
    // Re-inicializar en móviles
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            initAdvancedMobileFormFix();
        }, 300);
    } else {
        // Limpiar estados en desktop
        isInputFocused = false;
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = 'translateY(0)';
            header.style.zIndex = '1000';
        }
        document.body.classList.remove('header-hidden', 'form-input-focused');
    }
});

// ESTILOS DINÁMICOS MEJORADOS
const enhancedStyles = document.createElement('style');
enhancedStyles.innerHTML = `
    /* Estilos para corrección de formulario móvil */
    @media screen and (max-width: 768px) {
        .header-hidden {
            padding-top: 0 !important;
        }
        
        .form-input-focused .header {
            transform: translateY(-100%) !important;
            z-index: 1 !important;
        }
        
        .menu-open {
            overflow: hidden !important;
        }
        
        .menu-open .header {
            transform: translateY(0) !important;
            z-index: 1000 !important;
        }
        
        /* Asegurar que inputs sean accesibles */
        input:focus,
        textarea:focus {
            position: relative !important;
            z-index: 2000 !important;
            transform: translateZ(0) !important;
        }
        
        /* Prevenir zoom en iOS */
        input[type="text"],
        input[type="email"], 
        input[type="tel"],
        textarea {
            font-size: 16px !important;
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
        }
        
        /* Mejorar área de toque */
        .newsletter-form input,
        .newsletter-form textarea,
        .contact-form input,
        .contact-form textarea {
            min-height: 48px !important;
            -webkit-appearance: none !important;
            border-radius: 8px !important;
        }
        
        /* Asegurar visibilidad del formulario */
        .contact-form-wrapper,
        .newsletter-form {
            position: relative !important;
            z-index: 100 !important;
        }
    }
    
    /* Animaciones */
    @keyframes slideMenuIn {
        from { transform: translateY(-100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideMenuOut {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(-100%); opacity: 0; }
    }
`;
document.head.appendChild(enhancedStyles);

// INICIALIZACIÓN AUTOMÁTICA
document.addEventListener('DOMContentLoaded', initAll);
console.log('📜 Script completo cargado - Formulario móvil corregido');

