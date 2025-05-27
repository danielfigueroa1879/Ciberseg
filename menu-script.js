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
// ===== SOLUCIÓN JAVASCRIPT PARA FORMULARIO MÓVIL =====

// Función principal para manejar el formulario en móviles
function initMobileFormFix() {
    if (window.innerWidth <= 768) {
        console.log('📱 Inicializando corrección de formulario móvil...');
        
        const header = document.querySelector('.header');
        const body = document.body;
        const inputs = document.querySelectorAll('.newsletter-form input, .newsletter-form textarea, .contact-form input, .contact-form textarea');
        
        // Variables de control
        let isInputFocused = false;
        let focusTimeout;
        
        // Configurar viewport height para móviles
        function setViewportHeight() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            console.log('📐 Viewport height actualizado:', vh + 'px');
        }
        
        setViewportHeight();
        
        // Función para ocultar header
        function hideHeader() {
            if (header) {
                header.style.transform = 'translateY(-100%)';
                header.style.transition = 'transform 0.3s ease';
                header.classList.add('input-focused');
                body.classList.add('form-input-focused');
                console.log('🙈 Header ocultado');
            }
        }
        
        // Función para mostrar header
        function showHeader() {
            if (header) {
                header.style.transform = 'translateY(0)';
                header.style.transition = 'transform 0.3s ease';
                header.classList.remove('input-focused');
                body.classList.remove('form-input-focused');
                console.log('👁️ Header mostrado');
            }
        }
        
        // Función para hacer scroll al input
        function scrollToInput(input) {
            setTimeout(() => {
                const headerHeight = header ? header.offsetHeight : 80;
                const inputRect = input.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Calcular posición objetivo
                const targetY = scrollTop + inputRect.top - headerHeight - 20;
                
                console.log('📍 Haciendo scroll al input:', {
                    inputTop: inputRect.top,
                    headerHeight: headerHeight,
                    targetY: targetY
                });
                
                window.scrollTo({
                    top: Math.max(0, targetY),
                    behavior: 'smooth'
                });
            }, 100);
        }
        
        // Event listeners para cada input
        inputs.forEach((input, index) => {
            console.log(`🎯 Configurando input ${index + 1}:`, input.placeholder || input.name);
            
            // Evento focus
            input.addEventListener('focus', function(e) {
                console.log('📝 Input enfocado:', this.placeholder || this.name);
                
                // Limpiar timeout previo
                if (focusTimeout) {
                    clearTimeout(focusTimeout);
                }
                
                isInputFocused = true;
                
                // Ocultar header inmediatamente
                hideHeader();
                
                // Hacer scroll al input
                scrollToInput(this);
                
                // Asegurar z-index alto
                this.style.zIndex = '1004';
                this.style.position = 'relative';
                
            }, { passive: false });
            
            // Evento blur
            input.addEventListener('blur', function(e) {
                console.log('📝 Input desenfocado:', this.placeholder || this.name);
                
                // Esperar un poco para ver si otro input recibe foco
                focusTimeout = setTimeout(() => {
                    const anyInputFocused = document.querySelector('.newsletter-form input:focus, .newsletter-form textarea:focus, .contact-form input:focus, .contact-form textarea:focus');
                    
                    if (!anyInputFocused) {
                        console.log('📝 Ningún input enfocado - mostrando header');
                        isInputFocused = false;
                        showHeader();
                    }
                }, 150);
                
                // Restaurar z-index
                this.style.zIndex = '1003';
            });
            
            // Evento input para iOS
            input.addEventListener('input', function(e) {
                if (isInputFocused) {
                    // Asegurar que el header siga oculto mientras se escribe
                    hideHeader();
                }
            });
            
            // Evento touchstart para mejor respuesta táctil
            input.addEventListener('touchstart', function(e) {
                console.log('👆 Touch en input:', this.placeholder || this.name);
                
                // Preparar para enfoque
                if (!isInputFocused) {
                    hideHeader();
                }
            }, { passive: true });
        });
        
        // Manejar cambios de orientación
        window.addEventListener('orientationchange', function() {
            console.log('🔄 Cambio de orientación detectado');
            
            setTimeout(() => {
                setViewportHeight();
                
                // Si hay un input enfocado, reajustar
                const focusedInput = document.querySelector('.newsletter-form input:focus, .newsletter-form textarea:focus');
                if (focusedInput) {
                    scrollToInput(focusedInput);
                }
            }, 500);
        });
        
        // Manejar redimensionamiento de ventana
        window.addEventListener('resize', function() {
            setViewportHeight();
            
            // Si cambió a desktop, restaurar header
            if (window.innerWidth > 768) {
                showHeader();
                isInputFocused = false;
            }
        });
        
        // Manejar clics fuera del formulario
        document.addEventListener('click', function(e) {
            const formElement = e.target.closest('.newsletter-form, .contact-form');
            
            if (!formElement && isInputFocused) {
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
        
        // Manejar tecla Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isInputFocused) {
                console.log('⌨️ Tecla Escape - ocultando teclado');
                document.activeElement.blur();
                isInputFocused = false;
                showHeader();
            }
        });
        
        console.log('✅ Corrección de formulario móvil inicializada');
    }
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

// Integrar con la inicialización existente
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM cargado - iniciando aplicación...');
    
    setTimeout(() => {
        initMenu();
        initScrollButton();
        initScrollEffects();
        initSmoothScroll();
        initEnhancedMobile(); // ← Nueva función mejorada
        
        console.log('🎉 Aplicación completamente inicializada');
    }, 100);
});

// Reinicializar al cambiar tamaño de ventana
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        // Reinicializar solo si es necesario
        setTimeout(() => {
            initMobileFormFix();
        }, 300);
    }
});

// Debug: Mostrar información del viewport en móviles
if (window.innerWidth <= 768) {
    console.log('📱 Información del dispositivo:', {
        width: window.innerWidth,
        height: window.innerHeight,
        userAgent: navigator.userAgent.substring(0, 50) + '...',
        pixelRatio: window.devicePixelRatio
    });
}
