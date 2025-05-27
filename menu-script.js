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
// SOLUCIÓN DEFINITIVA: FORMULARIO MÓVIL SIN INTERFERENCIA DEL HEADER
console.log('🔧 Iniciando corrección DEFINITIVA para formulario móvil...');

// Variables globales mejoradas
let isInputFocused = false;
let isMenuOpen = false;
let headerHidden = false;
let originalScrollY = 0;
let formContainer = null;
let currentFocusedInput = null;

// FUNCIÓN 1: DETECCIÓN MÓVIL MEJORADA
function isMobileDevice() {
    return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// FUNCIÓN 2: OCULTAR HEADER COMPLETAMENTE
function hideHeaderCompletely() {
    const header = document.querySelector('.header');
    if (!header || headerHidden) return;
    
    console.log('🙈 Ocultando header COMPLETAMENTE');
    
    // Ocultar header de todas las maneras posibles
    header.style.transform = 'translateY(-100%)';
    header.style.opacity = '0';
    header.style.visibility = 'hidden';
    header.style.zIndex = '-999';
    header.style.position = 'absolute';
    header.style.top = '-200px';
    header.style.pointerEvents = 'none';
    
    // Eliminar padding-top del body
    document.body.style.paddingTop = '0';
    document.body.classList.add('header-completely-hidden');
    
    headerHidden = true;
}

// FUNCIÓN 3: MOSTRAR HEADER
function showHeader() {
    const header = document.querySelector('.header');
    if (!header || !headerHidden) return;
    
    console.log('👁️ Mostrando header');
    
    // Restaurar header
    header.style.transform = 'translateY(0)';
    header.style.opacity = '1';
    header.style.visibility = 'visible';
    header.style.zIndex = '1000';
    header.style.position = 'fixed';
    header.style.top = '0';
    header.style.pointerEvents = 'auto';
    
    // Restaurar padding-top
    document.body.style.paddingTop = '';
    document.body.classList.remove('header-completely-hidden');
    
    headerHidden = false;
}

// FUNCIÓN 4: SCROLL AGRESIVO AL INPUT
function scrollToInputAggressively(input) {
    if (!input || isMenuOpen) return;
    
    console.log('📍 Scroll ULTRA AGRESIVO al input');
    
    // Esperar un frame para que el teclado se abra
    requestAnimationFrame(() => {
        setTimeout(() => {
            const rect = input.getBoundingClientRect();
            const currentScroll = window.pageYOffset;
            
            // Calcular posición objetivo: input en la parte superior (20px desde arriba)
            const targetY = currentScroll + rect.top - 20;
            
            // Scroll inmediato
            window.scrollTo({
                top: Math.max(0, targetY),
                behavior: 'instant'
            });
            
            // Asegurar que el input sea completamente visible
            setTimeout(() => {
                input.scrollIntoView({
                    behavior: 'instant',
                    block: 'start',
                    inline: 'nearest'
                });
                
                // Scroll adicional para garantizar visibilidad
                const newRect = input.getBoundingClientRect();
                if (newRect.top > 100) {
                    window.scrollBy(0, newRect.top - 50);
                }
            }, 50);
            
        }, 100);
    });
}

// FUNCIÓN 5: MANEJAR FOCUS DE INPUT
function handleInputFocus(event) {
    const input = event.target;
    
    // Prevenir si el menú está abierto
    if (isMenuOpen) {
        input.blur();
        return;
    }
    
    console.log('📝 INPUT ENFOCADO - Iniciando secuencia de corrección');
    
    isInputFocused = true;
    currentFocusedInput = input;
    
    // Paso 1: Ocultar header INMEDIATAMENTE
    hideHeaderCompletely();
    
    // Paso 2: Preparar input para máxima visibilidad
    input.style.position = 'relative';
    input.style.zIndex = '9999';
    input.style.backgroundColor = 'rgba(255,255,255,0.15)';
    input.style.border = '2px solid #E0FD2C';
    
    // Paso 3: Scroll agresivo
    scrollToInputAggressively(input);
    
    // Paso 4: Crear "zona libre" alrededor del input
    const inputRect = input.getBoundingClientRect();
    const safeZone = document.createElement('div');
    safeZone.id = 'input-safe-zone';
    safeZone.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: transparent;
        z-index: 5000;
        pointer-events: none;
    `;
    document.body.appendChild(safeZone);
    
    // El input debe tener eventos activos
    input.style.pointerEvents = 'auto';
    input.style.touchAction = 'manipulation';
}

// FUNCIÓN 6: MANEJAR BLUR DE INPUT
function handleInputBlur(event) {
    const input = event.target;
    console.log('📝 INPUT DESENFOCADO');
    
    // Limpiar estilos del input
    input.style.backgroundColor = '';
    input.style.border = '';
    input.style.zIndex = '';
    
    // Remover zona segura si existe
    const safeZone = document.getElementById('input-safe-zone');
    if (safeZone) {
        safeZone.remove();
    }
    
    // Verificar si hay otros inputs enfocados
    setTimeout(() => {
        const anyInputFocused = document.querySelector('input:focus, textarea:focus');
        
        if (!anyInputFocused && !isMenuOpen) {
            console.log('📝 Ningún input enfocado - Restaurando header');
            isInputFocused = false;
            currentFocusedInput = null;
            showHeader();
        }
    }, 150);
}

// FUNCIÓN 7: PREVENIR ZOOM EN iOS
function preventIOSZoom() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        // Asegurar que el font-size sea al menos 16px para prevenir zoom
        const computedStyle = window.getComputedStyle(input);
        const fontSize = parseFloat(computedStyle.fontSize);
        
        if (fontSize < 16) {
            input.style.fontSize = '16px';
        }
        
        // Propiedades adicionales para mejorar la experiencia
        input.style.webkitAppearance = 'none';
        input.style.borderRadius = '8px';
    });
}

// FUNCIÓN 8: INICIALIZAR EVENTOS DEL FORMULARIO
function initFormEvents() {
    if (!isMobileDevice()) return;
    
    console.log('📱 Inicializando eventos de formulario para móvil');
    
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
    
    inputs.forEach((input, index) => {
        console.log(`🔧 Configurando input ${index + 1}`);
        
        // Remover eventos previos
        input.removeEventListener('focus', handleInputFocus);
        input.removeEventListener('blur', handleInputBlur);
        
        // Agregar eventos nuevos
        input.addEventListener('focus', handleInputFocus, { passive: false });
        input.addEventListener('blur', handleInputBlur, { passive: false });
        
        // Prevenir interacción cuando menú esté abierto
        input.addEventListener('touchstart', function(e) {
            if (isMenuOpen) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🚫 Input bloqueado - menú abierto');
                return false;
            }
        }, { passive: false });
        
        input.addEventListener('click', function(e) {
            if (isMenuOpen) {
                e.preventDefault();
                e.stopPropagation();
                this.blur();
                return false;
            }
        });
        
        // Mejorar área de toque
        input.style.minHeight = '48px';
        input.style.padding = '12px 15px';
        input.style.touchAction = 'manipulation';
    });
    
    // Prevenir zoom en iOS
    preventIOSZoom();
}

// FUNCIÓN 9: MANEJAR MENÚ HAMBURGUESA
function initMenuHandling() {
    const menuButton = document.getElementById('mobile-menu');
    const mobileMenu = document.getElementById('nav-menu');
    
    if (!menuButton || !mobileMenu) {
        console.error('🚨 Elementos del menú no encontrados');
        return;
    }
    
    function toggleMenu() {
        if (isMenuOpen) {
            // Cerrar menú
            menuButton.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            isMenuOpen = false;
            
            console.log('📁 Menú cerrado');
            
            // Si hay input enfocado, mantener header oculto
            if (isInputFocused) {
                hideHeaderCompletely();
            } else {
                showHeader();
            }
        } else {
            // Abrir menú
            
            // Desenfocar cualquier input activo
            if (currentFocusedInput) {
                currentFocusedInput.blur();
                isInputFocused = false;
                currentFocusedInput = null;
            }
            
            // Mostrar header para el menú
            showHeader();
            
            menuButton.classList.add('active');
            mobileMenu.classList.add('active');
            document.body.classList.add('menu-open');
            isMenuOpen = true;
            
            console.log('📂 Menú abierto');
        }
    }
    
    // Event listener del botón menú
    menuButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });
    
    // Cerrar menú al hacer click en enlaces
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isMenuOpen) {
                toggleMenu();
            }
        });
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (isMenuOpen && 
            !menuButton.contains(e.target) && 
            !mobileMenu.contains(e.target)) {
            toggleMenu();
        }
    });
}

// FUNCIÓN 10: MANEJAR ORIENTACIÓN Y RESIZE
function handleOrientationChange() {
    console.log('🔄 Cambio de orientación detectado');
    
    setTimeout(() => {
        if (isMobileDevice()) {
            // Re-inicializar todo
            initFormEvents();
            
            // Si hay input enfocado, volver a ocultarlo
            if (isInputFocused && currentFocusedInput) {
                hideHeaderCompletely();
                scrollToInputAggressively(currentFocusedInput);
            }
        }
    }, 500);
}

// FUNCIÓN 11: CLICK FUERA DEL FORMULARIO
function handleClickOutside() {
    document.addEventListener('click', function(e) {
        // Solo procesar si estamos en móvil y hay input enfocado
        if (!isMobileDevice() || !isInputFocused || isMenuOpen) return;
        
        const isFormElement = e.target.closest('.newsletter-form, .contact-form, input, textarea, button[type="submit"]');
        
        if (!isFormElement) {
            console.log('👆 Click fuera del formulario');
            
            // Desenfocar input activo
            const activeInput = document.activeElement;
            if (activeInput && (activeInput.tagName === 'INPUT' || activeInput.tagName === 'TEXTAREA')) {
                activeInput.blur();
            }
        }
    });
}

// FUNCIÓN 12: ESTILOS DINÁMICOS
function addDynamicStyles() {
    const style = document.createElement('style');
    style.id = 'mobile-form-fix-styles';
    style.innerHTML = `
        /* Corrección para formulario móvil */
        @media screen and (max-width: 768px) {
            /* Header completamente oculto */
            .header-completely-hidden {
                padding-top: 0 !important;
            }
            
            .header-completely-hidden .header {
                transform: translateY(-100%) !important;
                opacity: 0 !important;
                visibility: hidden !important;
                z-index: -999 !important;
                position: absolute !important;
                top: -200px !important;
                pointer-events: none !important;
            }
            
            /* Menú abierto */
            .menu-open {
                overflow: hidden !important;
            }
            
            .menu-open .header {
                transform: translateY(0) !important;
                opacity: 1 !important;
                visibility: visible !important;
                z-index: 1000 !important;
                position: fixed !important;
                top: 0 !important;
                pointer-events: auto !important;
            }
            
            /* Inputs enfocados */
            input:focus,
            textarea:focus {
                position: relative !important;
                z-index: 9999 !important;
                outline: none !important;
                border: 2px solid #E0FD2C !important;
                background-color: rgba(255,255,255,0.15) !important;
                box-shadow: 0 0 15px rgba(224, 253, 44, 0.3) !important;
            }
            
            /* Prevenir zoom en iOS */
            input[type="text"],
            input[type="email"],
            input[type="tel"],
            textarea {
                font-size: 16px !important;
                -webkit-appearance: none !important;
                border-radius: 8px !important;
                min-height: 48px !important;
                touch-action: manipulation !important;
            }
            
            /* Formularios */
            .newsletter-form,
            .contact-form {
                position: relative !important;
                z-index: 100 !important;
            }
            
            /* Botones */
            .newsletter-form button[type="submit"],
            .contact-form button[type="submit"] {
                min-height: 48px !important;
                touch-action: manipulation !important;
                z-index: 9998 !important;
                position: relative !important;
            }
            
            /* Asegurar que los contenedores no interfieran */
            .contact-section {
                position: relative !important;
                z-index: 50 !important;
            }
            
            .contact-form-wrapper,
            .contact-info-wrapper {
                position: relative !important;
                z-index: 60 !important;
            }
        }
        
        /* Zona segura para inputs */
        #input-safe-zone {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background: transparent !important;
            z-index: 5000 !important;
            pointer-events: none !important;
        }
    `;
    
    // Remover estilos previos si existen
    const existingStyles = document.getElementById('mobile-form-fix-styles');
    if (existingStyles) {
        existingStyles.remove();
    }
    
    document.head.appendChild(style);
}

// FUNCIÓN 13: INICIALIZACIÓN PRINCIPAL
function initMobileFormFix() {
    if (!isMobileDevice()) {
        console.log('💻 Desktop detectado - no se requiere corrección');
        return;
    }
    
    console.log('🚀 Iniciando corrección completa para móviles');
    
    // Agregar estilos
    addDynamicStyles();
    
    // Inicializar eventos
    setTimeout(() => {
        initFormEvents();
        initMenuHandling();
        handleClickOutside();
        
        // Event listeners adicionales
        window.addEventListener('orientationchange', handleOrientationChange);
        window.addEventListener('resize', () => {
            setTimeout(handleOrientationChange, 300);
        });
        
        console.log('✅ Corrección de formulario móvil COMPLETADA');
    }, 100);
}

// FUNCIÓN 14: LIMPIEZA AL CAMBIAR A DESKTOP
function cleanupMobileStates() {
    if (window.innerWidth > 768) {
        isInputFocused = false;
        isMenuOpen = false;
        headerHidden = false;
        currentFocusedInput = null;
        
        // Limpiar estilos
        document.body.classList.remove('header-completely-hidden', 'menu-open');
        document.body.style.paddingTop = '';
        
        // Restaurar header
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
            header.style.visibility = 'visible';
            header.style.zIndex = '1000';
            header.style.position = 'fixed';
            header.style.top = '0';
            header.style.pointerEvents = 'auto';
        }
        
        // Remover zona segura
        const safeZone = document.getElementById('input-safe-zone');
        if (safeZone) safeZone.remove();
        
        console.log('🖥️ Estados móviles limpiados para desktop');
    }
}

// INICIALIZACIÓN AUTOMÁTICA
document.addEventListener('DOMContentLoaded', function() {
    console.log('📜 DOM cargado - Iniciando corrección');
    initMobileFormFix();
});

// Manejar cambios de tamaño de ventana
window.addEventListener('resize', function() {
    setTimeout(() => {
        if (window.innerWidth <= 768) {
            initMobileFormFix();
        } else {
            cleanupMobileStates();
        }
    }, 300);
});

console.log('🎯 Script de corrección de formulario móvil cargado');

// EXPORTAR FUNCIONES PARA DEBUG (opcional)
window.mobileFormFix = {
    hideHeader: hideHeaderCompletely,
    showHeader: showHeader,
    isInputFocused: () => isInputFocused,
    isMenuOpen: () => isMenuOpen,
    cleanup: cleanupMobileStates
};

