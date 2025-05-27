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
