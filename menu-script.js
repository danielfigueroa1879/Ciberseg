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
    
    // Limpiar eventos previos para evitar duplicados
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
    
    // Desenfocar cualquier input activo antes de abrir el menú
    const activeInput = document.activeElement;
    if (activeInput && (activeInput.tagName === 'INPUT' || activeInput.tagName === 'TEXTAREA')) {
        activeInput.blur();
        isInputFocused = false;
    }
    
    menuButton.classList.add('active');
    mobileMenu.classList.add('active');
    document.body.classList.add('menu-open');
    document.body.classList.remove('form-input-focused'); // Asegurarse de quitar esta clase
    
    isMenuOpen = true;
    
    // Forzar que el header sea visible y con alto z-index cuando el menú está abierto
    const header = document.querySelector('.header');
    if (header) {
        header.style.transform = 'translateY(0) !important';
        header.style.zIndex = '1000'; // Asegurar que el header esté por encima cuando el menú está abierto
        header.style.position = 'fixed';
        header.style.display = 'block'; // Asegurar que sea visible
        header.style.visibility = 'visible';
        header.style.opacity = '1';
        header.style.pointerEvents = 'auto';
    }
    
    console.log('✅ Menú abierto');
}

function closeMenu() {
    console.log('📁 Cerrando menú...');
    
    menuButton.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
    
    isMenuOpen = false;
    document.body.style.overflow = ''; // Restaurar overflow del body
    
    // Restaurar el header si no hay inputs enfocados
    if (!isInputFocused) {
        smartHeaderControl();
    }
    
    console.log('✅ Menú cerrado');
}

// FUNCIÓN 2: CORRECCIÓN AVANZADA PARA FORMULARIOS MÓVILES
function initAdvancedMobileFormFix() {
    // Solo aplicar en dispositivos móviles
    if (window.innerWidth <= 768) {
        console.log('📱 Inicializando corrección avanzada de formulario móvil...');
        
        const header = document.querySelector('.header');
        const body = document.body;
        // Seleccionar todos los inputs de texto y textareas
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
                header.style.zIndex = '-1'; // Asegurar que esté por debajo de todo
                header.style.pointerEvents = 'none'; // Desactivar eventos de ratón
                body.classList.add('header-hidden', 'form-input-active');
                body.style.paddingTop = '0'; // Eliminar cualquier padding superior del body
                console.log('🙈 Header COMPLETAMENTE ocultado para formulario');
            } else if (!isMenuOpen) {
                // MOSTRAR HEADER cuando no hay input enfocado y el menú no está abierto
                header.style.display = 'block';
                header.style.visibility = 'visible';
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
                header.style.zIndex = '999'; // Restaurar z-index para que sea visible pero debajo de inputs enfocados
                header.style.pointerEvents = 'auto';
                body.classList.remove('header-hidden', 'form-input-active');
                body.style.paddingTop = ''; // Restaurar padding original del body
                console.log('👁️ Header completamente restaurado');
            }
        }
        
        // PASO 3: SCROLL ULTRA AGRESIVO PARA POSICIONAR INPUT CORRECTAMENTE
        function smartScrollToInput(input) {
            if (isMenuOpen) return; // No hacer scroll si el menú está abierto
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                console.log('📍 Scroll ULTRA AGRESIVO al input');
                
                // Asegurarse de que el input tenga un z-index alto
                input.style.position = 'relative';
                input.style.zIndex = '1001'; // Más alto que el header
                
                const inputRect = input.getBoundingClientRect();
                const currentScroll = window.pageYOffset;
                const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
                
                // Calcular la posición deseada para el input (ej. 20px desde la parte superior del viewport)
                const targetTop = 20; 
                const targetScroll = currentScroll + inputRect.top - targetTop;
                
                // Forzar el scroll inmediato
                window.scrollTo({
                    top: Math.max(0, targetScroll),
                    behavior: 'instant' 
                });
                
                // Un pequeño retraso para asegurar que el scroll se complete
                setTimeout(() => {
                    const newInputRect = input.getBoundingClientRect();
                    if (newInputRect.top < targetTop || newInputRect.bottom > viewportHeight - keyboardHeight) {
                        // Si el input aún no está en la posición deseada o está cubierto por el teclado
                        window.scrollTo({
                            top: window.pageYOffset + newInputRect.top - targetTop,
                            behavior: 'instant'
                        });
                    }
                }, 50); // Reducir delay
                
            }, 10); // Reducir aún más el delay inicial
        }
        
        // PASO 4: PREVENIR ZOOM EN IOS (ya implementado, asegurar que el tamaño sea 16px o más)
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
                    this.blur(); // Si el menú está abierto, no permitir enfocar el input
                    return;
                }
                
                console.log(`📝 Input ${index + 1} enfocado - MODO AGRESIVO`);
                
                clearTimeout(focusTimeout);
                isInputFocused = true;
                document.body.classList.add('form-input-focused'); // Añadir clase al body
                
                // SECUENCIA ULTRA AGRESIVA
                // 1. Ocultar header INMEDIATAMENTE
                if (header) {
                    header.style.display = 'none';
                    header.style.position = 'absolute'; // Cambiar a absolute para sacarlo del flujo
                    header.style.top = '-500px'; // Moverlo muy arriba
                    header.style.zIndex = '-999';
                }
                
                // 2. Preparar el input para máxima visibilidad (z-index alto)
                this.style.position = 'relative';
                this.style.zIndex = '1001'; // Asegurar que el input esté por encima
                this.style.isolation = 'isolate'; // Crear un nuevo contexto de apilamiento
                
                // 3. Ejecutar acciones de forma inmediata
                setTimeout(() => {
                    setDynamicViewport();
                    smartHeaderControl(); // Ocultar el header
                    smartScrollToInput(this); // Desplazar al input
                    
                    // 4. Forzar que el input esté visible de nuevo (redundante pero seguro)
                    this.scrollIntoView({
                        behavior: 'instant',
                        block: 'start',
                        inline: 'nearest'
                    });
                }, 5); // Muy rápido
                
            }, { passive: false }); // Usar passive: false para prevenir el comportamiento por defecto del navegador si es necesario
            
            // EVENTO BLUR
            input.addEventListener('blur', function(e) {
                console.log(`📝 Input ${index + 1} desenfocado`);
                
                clearTimeout(focusTimeout);
                focusTimeout = setTimeout(() => {
                    const anyFocused = document.querySelector('input:focus, textarea:focus');
                    
                    if (!anyFocused && !isMenuOpen) {
                        console.log('📝 Todos los inputs desenfocados');
                        isInputFocused = false;
                        document.body.classList.remove('form-input-focused'); // Quitar clase del body
                        smartHeaderControl(); // Restaurar el header
                    }
                }, 100); // Reducir delay para una respuesta más rápida
            });
            
            // PREVENIR INTERACCIÓN CUANDO MENÚ ABIERTO (ya implementado)
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
                        smartHeaderControl(); // Reajustar header si el teclado aparece/desaparece
                        const focusedInput = document.activeElement;
                        if (focusedInput && (focusedInput.tagName === 'INPUT' || focusedInput.tagName === 'TEXTAREA')) {
                            smartScrollToInput(focusedInput); // Reajustar scroll si el teclado cambia
                        }
                    }
                }, 50); // Reducir delay
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
            }, 300); // Reducir delay
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
                        document.body.classList.remove('form-input-focused');
                        smartHeaderControl();
                    }
                }, 50); // Reducir delay
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
    
    // Un pequeño retraso para asegurar que el DOM esté completamente cargado
    setTimeout(() => {
        initMenu();
        initAdvancedMobileFormFix(); // ← CORRECCIÓN PRINCIPAL
        initScrollButton();
        initScrollEffects();
        initSmoothScroll();
        
        console.log('🎉 Aplicación completamente inicializada');
    }, 50); // Reducir el delay de inicialización
}

// FUNCIÓN 6: MANEJAR REDIMENSIONAMIENTO
window.addEventListener('resize', function() {
    // Cerrar menú si se cambia a desktop
    if (window.innerWidth > 768 && isMenuOpen) {
        closeMenu();
    }
    
    // Re-inicializar en móviles si el ancho de la ventana es menor o igual a 768px
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            originalViewportHeight = window.innerHeight; // Actualizar altura original del viewport
            initAdvancedMobileFormFix(); // Volver a inicializar la corrección del formulario
        }, 100); // Un pequeño delay para que el navegador se ajuste
    } else {
        // Limpiar estados en desktop
        isInputFocused = false;
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = 'translateY(0)';
            header.style.zIndex = '1000';
            header.style.display = 'block'; // Asegurarse de que el header sea visible en desktop
            header.style.visibility = 'visible';
            header.style.opacity = '1';
            header.style.pointerEvents = 'auto';
        }
        document.body.classList.remove('header-hidden', 'form-input-focused');
    }
});

// ESTILOS DINÁMICOS MEJORADOS (inyectados en el head del documento)
const enhancedStyles = document.createElement('style');
enhancedStyles.innerHTML = `
    /* Estilos para corrección de formulario móvil */
    @media screen and (max-width: 768px) {
        .header-hidden {
            padding-top: 0 !important;
        }
        
        /* Ocultar el header completamente cuando un input está enfocado */
        body.form-input-focused .header {
            transform: translateY(-100%) !important;
            z-index: -1 !important; /* Asegurar que esté por debajo */
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;
            display: none !important; /* Ocultar completamente */
        }
        
        /* Asegurar que el menú abierto siempre muestre el header */
        .menu-open .header {
            transform: translateY(0) !important;
            z-index: 1000 !important;
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: auto !important;
            display: block !important;
        }
        
        .menu-open {
            overflow: hidden !important; /* Prevenir scroll del body cuando el menú está abierto */
        }
        
        /* Asegurar que inputs sean accesibles y estén por encima de otros elementos */
        input:focus,
        textarea:focus {
            position: relative !important;
            z-index: 2000 !important; /* Muy alto para asegurar visibilidad */
            transform: translateZ(0) !important; /* Forzar aceleración de hardware */
            -webkit-transform: translateZ(0) !important;
        }
        
        /* Prevenir zoom en iOS (asegurar font-size >= 16px) */
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
            min-height: 48px !important; /* Tamaño mínimo para facilitar el toque */
            -webkit-appearance: none !important; /* Eliminar estilos nativos de iOS */
            border-radius: 8px !important;
        }
        
        /* Asegurar visibilidad del formulario y sus elementos */
        .contact-form-wrapper,
        .newsletter-form {
            position: relative !important;
            z-index: 100 !important; /* Asegurar que el formulario esté por encima del contenido normal */
        }

        /* Ajustar el padding-top de la sección de contacto para compensar el header */
        .contact-section {
            padding-top: 120px !important; /* Aumentado para dar más espacio */
        }
        
        /* Crear más espacio entre el header y el formulario */
        .contact-section h2 {
            margin-top: 20px !important;
            margin-bottom: 40px !important;
        }
        
        /* Asegurar que el contenido del formulario tenga suficiente espacio */
        .contact-content {
            margin-top: 30px !important;
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

// INICIALIZACIÓN AUTOMÁTICA cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', initAll);
console.log('📜 Script completo cargado - Formulario móvil corregido');
