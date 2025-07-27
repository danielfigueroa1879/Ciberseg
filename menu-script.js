// ===== SOLUCIÓN INDEPENDIENTE TOTAL - SIN DEPENDENCIAS =====

console.log('🔧 Iniciando solución INDEPENDIENTE...');

// ===== VARIABLES GLOBALES =====
let isMenuOpen = false;
let menuButton, mobileMenu;
let scrollTimeout;
let isMobile = false;
let floatingButton = null;

// ===== DETECCIÓN DE DISPOSITIVO MÓVIL =====
function detectMobile() {
    isMobile = window.innerWidth <= 768;
    return isMobile;
}

// ===== CREAR BOTÓN COMPLETAMENTE INDEPENDIENTE =====
function createIndependentFloatingButton() {
    console.log('🚀 === CREANDO BOTÓN INDEPENDIENTE ===');
    
    // Verificar si ya existe y removerlo
    const existing = document.querySelector('[data-floating-btn="true"]');
    if (existing) {
        existing.remove();
        console.log('🗑️ Botón existente removido');
    }
    
    // Crear elemento completamente nuevo
    const btn = document.createElement('div');
    btn.setAttribute('data-floating-btn', 'true');
    btn.setAttribute('role', 'button');
    btn.setAttribute('tabindex', '0');
    btn.setAttribute('aria-label', 'Volver al inicio');
    
    // ✨ ESTILOS COMPLETAMENTE INLINE - NO DEPENDENCIAS CSS ✨
    btn.style.cssText = `
        position: fixed !important;
        bottom: 130px !important;
        right: 20px !important;
        width: 60px !important;
        height: 60px !important;
        background: linear-gradient(135deg, #E0FD2C 0%, #C7E525 100%) !important;
        border: 3px solid #B8D91F !important;
        border-radius: 50% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        z-index: 999999 !important;
        box-shadow: 0 8px 25px rgba(224, 253, 44, 0.6) !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        user-select: none !important;
        -webkit-user-select: none !important;
        -webkit-tap-highlight-color: transparent !important;
        font-family: Arial, sans-serif !important;
        opacity: 1 !important;
        visibility: visible !important;
        transform: translateZ(0) !important;
        will-change: transform !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
    `;
    
    // ✨ CREAR FLECHA SIN FONT AWESOME ✨
    btn.innerHTML = `
        <div style="
            color: #0f0f0f !important;
            font-size: 28px !important;
            font-weight: bold !important;
            line-height: 1 !important;
            transform: translateY(-2px) !important;
        ">▲</div>
    `;
    
    // ✨ EVENTOS DIRECTOS ✨
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🔼 Scroll al inicio activado');
        
        // Scroll directo al inicio
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        
        // Efecto visual al hacer clic
        this.style.transform = 'scale(0.9) translateZ(0)';
        setTimeout(() => {
            this.style.transform = 'scale(1) translateZ(0)';
        }, 150);
    }, { passive: false });
    
    // Efecto hover
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateZ(0)';
        this.style.boxShadow = '0 12px 35px rgba(224, 253, 44, 0.8)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateZ(0)';
        this.style.boxShadow = '0 8px 25px rgba(224, 253, 44, 0.6)';
    });
    
    // Touch events para móvil
    btn.addEventListener('touchstart', function(e) {
        this.style.transform = 'scale(0.95) translateZ(0)';
    }, { passive: true });
    
    btn.addEventListener('touchend', function(e) {
        this.style.transform = 'scale(1) translateZ(0)';
    }, { passive: true });
    
    // ✨ INSERTAR EN EL CUERPO DEL DOCUMENTO ✨
    document.body.appendChild(btn);
    floatingButton = btn;
    
    console.log('✅ Botón independiente creado exitosamente');
    
    // Verificación
    setTimeout(() => {
        const verification = document.querySelector('[data-floating-btn="true"]');
        if (verification) {
            console.log('✅ Botón verificado en DOM');
            console.log('📍 Posición:', {
                bottom: verification.style.bottom,
                right: verification.style.right,
                display: verification.style.display,
                zIndex: verification.style.zIndex
            });
        } else {
            console.error('❌ Botón no encontrado en verificación');
        }
    }, 100);
    
    return btn;
}

// ===== GESTIÓN DE VISIBILIDAD BASADA EN SCROLL =====
function handleScrollVisibility() {
    if (!floatingButton) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const threshold = 200;
    
    if (scrollTop > threshold) {
        // Mostrar con animación
        floatingButton.style.opacity = '1';
        floatingButton.style.visibility = 'visible';
        floatingButton.style.transform = 'scale(1) translateZ(0)';
    } else {
        // Ocultar con animación
        floatingButton.style.opacity = '0.3';
        floatingButton.style.transform = 'scale(0.8) translateZ(0)';
    }
}

// ===== CONFIGURAR SCROLL EVENTS ===== 
function setupScrollEvents() {
    let ticking = false;
    
    function optimizedScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScrollVisibility();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', optimizedScroll, { passive: true });
    console.log('📜 Scroll events configurados');
}

// ===== FUNCIÓN: SCROLL SUAVE OPTIMIZADO =====
function smoothScrollTo(target) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    if (detectMobile()) {
        requestAnimationFrame(() => {
            const headerHeight = 80;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                left: 0,
                behavior: 'smooth'
            });
        });
    } else {
        targetElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// ===== MENÚ HAMBURGUESA (MANTENIDO ORIGINAL) =====
function setupHamburgerMenu() {
    menuButton = document.getElementById('mobile-menu');
    mobileMenu = document.getElementById('nav-menu');
    
    if (!menuButton || !mobileMenu) {
        console.error('❌ Elementos del menú no encontrados');
        return;
    }
    
    if (menuButton.children.length === 0) {
        menuButton.innerHTML = `
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        `;
    }
    
    const menuItems = [
        { text: 'Inicio', target: '.hero' },
        { text: 'Servicios', target: '.iot-section' },
        { text: 'Misión', target: '.mission-vision' },
        { text: 'Suscripción', target: '.contact-section' }
    ];
    
    mobileMenu.innerHTML = '';
    
    menuItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        
        const a = document.createElement('a');
        a.href = '#';
        a.className = 'nav-link';
        a.textContent = item.text;
        
        a.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            closeMenu();
            
            requestAnimationFrame(() => {
                setTimeout(() => {
                    smoothScrollTo(item.target);
                }, 200);
            });
        }, { passive: false });
        
        li.appendChild(a);
        mobileMenu.appendChild(li);
    });
    
    menuButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    }, { passive: false });
    
    document.addEventListener('click', function(e) {
        if (isMenuOpen && 
            !menuButton.contains(e.target) && 
            !mobileMenu.contains(e.target)) {
            closeMenu();
        }
    }, { passive: true });
    
    console.log('🍔 Menú hamburguesa configurado');
}

function openMenu() {
    isMenuOpen = true;
    
    requestAnimationFrame(() => {
        menuButton.classList.add('active');
        mobileMenu.classList.add('active');
        document.body.classList.add('menu-open');
        
        if (detectMobile()) {
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${window.scrollY}px`;
        }
    });
    
    console.log('📂 Menú abierto');
}

function closeMenu() {
    isMenuOpen = false;
    
    requestAnimationFrame(() => {
        if (menuButton) menuButton.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
        
        if (detectMobile()) {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            document.body.classList.remove('menu-open');
            
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
            }
        } else {
            document.body.classList.remove('menu-open');
        }
    });
    
    console.log('📁 Menú cerrado');
}

function toggleMenu() {
    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

// ===== INICIALIZACIÓN PRINCIPAL =====
function initCompleteSolution() {
    console.log('🚀 Iniciando solución INDEPENDIENTE...');
    console.log('📱 Ancho de pantalla:', window.innerWidth);
    console.log('📱 Es móvil:', window.innerWidth <= 768);
    
    try {
        detectMobile();
        
        // 1. Configurar menú hamburguesa
        setupHamburgerMenu();
        
        // 2. Crear botón independiente SIEMPRE
        createIndependentFloatingButton();
        
        // 3. Configurar scroll
        setupScrollEvents();
        
        console.log('✅ Solución independiente inicializada');
        
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

// ===== INICIALIZACIÓN AUTOMÁTICA =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCompleteSolution, { once: true });
} else {
    initCompleteSolution();
}

// Backup y verificaciones
window.addEventListener('load', () => {
    setTimeout(() => {
        if (!document.querySelector('[data-floating-btn="true"]')) {
            console.log('🔧 Recreando botón...');
            createIndependentFloatingButton();
        }
    }, 500);
}, { once: true, passive: true });

window.addEventListener('resize', () => {
    detectMobile();
    if (window.innerWidth > 768 && isMenuOpen) {
        closeMenu();
    }
}, { passive: true });

// ===== API PÚBLICA =====
window.completeSolution = {
    reinit: initCompleteSolution,
    toggleMenu: toggleMenu,
    button: () => document.querySelector('[data-floating-btn="true"]'),
    createButton: createIndependentFloatingButton,
    isMobile: () => isMobile
};

// ===== FUNCIÓN DE DEBUG INDEPENDIENTE =====
window.debugFloatingButton = function() {
    console.log('🔍 === DEBUG BOTÓN INDEPENDIENTE ===');
    console.log('📱 Ancho de pantalla:', window.innerWidth);
    
    const btn = document.querySelector('[data-floating-btn="true"]');
    if (btn) {
        console.log('✅ Botón independiente encontrado');
        console.log('📍 Estilos:', {
            position: btn.style.position,
            bottom: btn.style.bottom,
            right: btn.style.right,
            display: btn.style.display,
            zIndex: btn.style.zIndex,
            opacity: btn.style.opacity,
            visibility: btn.style.visibility
        });
        
        // Forzar visibilidad
        btn.style.opacity = '1';
        btn.style.visibility = 'visible';
        btn.style.display = 'flex';
        console.log('🔧 Visibilidad forzada');
        
    } else {
        console.error('❌ Botón independiente NO encontrado');
        console.log('🔧 Creando botón...');
        createIndependentFloatingButton();
    }
};

console.log('✅ Solución INDEPENDIENTE cargada');
console.log('🔧 Usa window.debugFloatingButton() para debug');        // Ocultar botón con estilos forzados
        if (button.classList.contains('floating-visible')) {
            requestAnimationFrame(() => {
                button.classList.remove('floating-visible');
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
                button.style.transform = 'translateY(20px) translateZ(0)';
            });
            console.log('🙈 Botón flotante ocultado (cerca del inicio)');
        }
    }
}

// ===== FUNCIÓN: CONFIGURAR EVENTOS DE SCROLL ULTRA OPTIMIZADA =====
function setupScrollEvents() {
    // ✨ THROTTLE ULTRA OPTIMIZADO PARA SCROLL ✨
    let ticking = false;
    
    function optimizedScrollHandler() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // ✨ EVENT LISTENER OPTIMIZADO CON OPCIONES PASSIVE ✨
    if (detectMobile()) {
        // Móvil: throttle más agresivo para mejor rendimiento
        let mobileScrollTimeout;
        const mobileScrollHandler = () => {
            clearTimeout(mobileScrollTimeout);
            mobileScrollTimeout = setTimeout(optimizedScrollHandler, 8); // ~120fps
        };
        
        window.addEventListener('scroll', mobileScrollHandler, { 
            passive: true,
            capture: false 
        });
        
        // Event listener adicional para touchend en móviles
        window.addEventListener('touchend', () => {
            setTimeout(optimizedScrollHandler, 100);
        }, { passive: true });
        
    } else {
        // Desktop: throttle normal
        window.addEventListener('scroll', optimizedScrollHandler, { 
            passive: true,
            capture: false 
        });
    }
    
    // Llamada inicial optimizada
    requestAnimationFrame(() => {
        setTimeout(handleScroll, 100);
    });
    
    console.log('📜 Eventos de scroll ultra optimizados configurados');
}

// ===== FUNCIÓN: OPTIMIZAR NAVEGACIÓN DE ENLACES EXISTENTES =====
function optimizeExistingLinks() {
    // Optimizar enlaces de navegación existentes
    const existingNavLinks = document.querySelectorAll('a[href^="#"]');
    
    existingNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Scroll optimizado para enlaces existentes
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId) || 
                                   document.querySelector(`.${targetId}`);
                
                if (targetElement) {
                    if (detectMobile()) {
                        smoothScrollTo(`#${targetId}`);
                    } else {
                        targetElement.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }
                }
            }, { passive: false });
        }
    });
    
    console.log(`🔗 ${existingNavLinks.length} enlaces optimizados para scroll suave`);
}

// ===== FUNCIÓN: OPTIMIZACIÓN DE SCROLL EN FORMULARIOS =====
function optimizeFormScrolling() {
    const form = document.getElementById('contact-form');
    const inputs = document.querySelectorAll('input, textarea');
    
    if (detectMobile()) {
        inputs.forEach(input => {
            // ✨ SCROLL SUAVE AL ENFOCAR CAMPOS EN MÓVIL ✨
            input.addEventListener('focus', function() {
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        this.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }, 300); // Delay para permitir que se abra el teclado virtual
                });
            }, { passive: true });
        });
        
        // Optimizar scroll al enviar formulario
        if (form) {
            form.addEventListener('submit', function() {
                requestAnimationFrame(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }, { passive: true });
        }
    }
    
    console.log('📝 Scroll de formularios optimizado para móvil');
}

// ===== FUNCIÓN: SCROLL INTELIGENTE ENTRE SECCIONES =====
function setupIntelligentSectionScrolling() {
    if (!detectMobile()) return;
    
    const sections = document.querySelectorAll('.hero, .main-services, .iot-section, .mission-vision, .contact-section');
    
    // ✨ INTERSECTION OBSERVER PARA NAVEGACIÓN INTELIGENTE ✨
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Scroll suave automático si la sección está parcialmente visible
                const rect = entry.boundingClientRect;
                const windowHeight = window.innerHeight;
                
                // Si menos del 70% de la sección es visible, hacer scroll suave
                if (rect.height > windowHeight * 0.7 && rect.top > windowHeight * 0.3) {
                    requestAnimationFrame(() => {
                        entry.target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    });
                }
            }
        });
    }, {
        threshold: [0.3, 0.7],
        rootMargin: '-80px 0px'
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    console.log('🎯 Scroll inteligente entre secciones configurado');
}

// ===== FUNCIÓN: INICIALIZACIÓN PRINCIPAL OPTIMIZADA CON DEBUG =====
function initCompleteSolution() {
    console.log('🚀 Iniciando solución con scroll ultra optimizado...');
    console.log('📱 Ancho de pantalla:', window.innerWidth);
    console.log('📱 Es móvil:', window.innerWidth <= 768);
    
    try {
        // Detectar dispositivo
        detectMobile();
        
        // 1. Configurar menú hamburguesa
        setupHamburgerMenu();
        
        // 2. Crear botón flotante FORZADO
        const button = createFloatingButton();
        
        if (button) {
            console.log('✅ Botón creado exitosamente');
            
            // 3. Verificar que el botón esté en el DOM
            setTimeout(() => {
                const buttonCheck = document.getElementById('real-floating-back-btn');
                if (buttonCheck) {
                    console.log('✅ Botón confirmado en DOM');
                    console.log('📍 Computed styles:', {
                        display: getComputedStyle(buttonCheck).display,
                        position: getComputedStyle(buttonCheck).position,
                        bottom: getComputedStyle(buttonCheck).bottom,
                        right: getComputedStyle(buttonCheck).right,
                        zIndex: getComputedStyle(buttonCheck).zIndex
                    });
                } else {
                    console.error('❌ Botón NO encontrado en verificación');
                }
            }, 500);
        } else {
            console.log('ℹ️ Botón no creado (desktop o error)');
        }
        
        // 4. Configurar scroll optimizado
        setupScrollEvents();
        
        // 5. Optimizar enlaces existentes
        optimizeExistingLinks();
        
        // 6. Optimizar scroll en formularios
        optimizeFormScrolling();
        
        // 7. Configurar scroll inteligente entre secciones
        setupIntelligentSectionScrolling();
        
        console.log('✅ Solución con scroll ultra optimizado inicializada');
        
    } catch (error) {
        console.error('❌ Error en inicialización:', error);
    }
}

// ===== FUNCIÓN: REDETECCIÓN EN RESIZE =====
function handleResize() {
    const wasMobile = isMobile;
    detectMobile();
    
    // Si cambió de móvil a desktop o viceversa, reinicializar
    if (wasMobile !== isMobile) {
        console.log('📱➡️🖥️ Cambio de dispositivo detectado, reoptimizando...');
        
        // Cerrar menú si está abierto
        if (isMenuOpen) closeMenu();
        
        // Reconfigurar eventos de scroll
        setupScrollEvents();
        
        // Reoptimizar formularios
        optimizeFormScrolling();
    }
    
    // Mantener lógica existente para pantallas grandes
    if (window.innerWidth > 768) {
        if (isMenuOpen) closeMenu();
    }
}

// ===== INICIALIZACIÓN AUTOMÁTICA OPTIMIZADA =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCompleteSolution, { once: true });
} else {
    initCompleteSolution();
}

// Backup para asegurar la creación del botón si se carga tarde
window.addEventListener('load', () => {
    setTimeout(() => {
        if (!document.getElementById('real-floating-back-btn')) {
            createFloatingButton();
            handleScroll();
        }
    }, 500);
}, { once: true, passive: true });

// Resize handler optimizado
window.addEventListener('resize', handleResize, { passive: true });

// ===== OPTIMIZACIONES ADICIONALES PARA MÓVILES =====

// Prevenir scroll bounce en iOS
if (detectMobile() && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });
}

// ===== MONITOREO DE RENDIMIENTO DE SCROLL =====
function monitorScrollPerformance() {
    if ('performance' in window && detectMobile()) {
        let scrollStartTime;
        let scrollFrames = 0;
        
        window.addEventListener('scroll', () => {
            if (!scrollStartTime) {
                scrollStartTime = performance.now();
            }
            scrollFrames++;
        }, { passive: true });
        
        window.addEventListener('scrollend', () => {
            if (scrollStartTime) {
                const scrollDuration = performance.now() - scrollStartTime;
                const fps = (scrollFrames / scrollDuration) * 1000;
                
                console.log(`📊 Scroll performance: ${fps.toFixed(1)} FPS promedio`);
                
                scrollStartTime = null;
                scrollFrames = 0;
            }
        }, { passive: true });
    }
}

// Inicializar monitoreo de rendimiento
if (document.readyState === 'complete') {
    monitorScrollPerformance();
} else {
    window.addEventListener('load', monitorScrollPerformance, { once: true, passive: true });
}

// ===== API PÚBLICA OPTIMIZADA =====
window.completeSolution = {
    reinit: initCompleteSolution,
    toggleMenu: toggleMenu,
    button: () => document.getElementById('real-floating-back-btn'),
    smoothScrollTo: smoothScrollTo,
    isMobile: () => isMobile,
    optimizeScroll: () => {
        setupScrollEvents();
        optimizeFormScrolling();
        setupIntelligentSectionScrolling();
    }
};

console.log('✅ Solución completa con scroll ultra optimizado cargada');

// ===== FUNCIÓN DE DEBUG PARA BOTÓN INDEPENDIENTE =====
window.debugFloatingButton = function() {
    console.log('🔍 === DEBUG BOTÓN INDEPENDIENTE ===');
    console.log('📱 Ancho de pantalla:', window.innerWidth);
    
    const btn = document.querySelector('[data-floating-btn="true"]');
    if (btn) {
        console.log('✅ Botón independiente encontrado');
        console.log('📍 Estilos:', {
            position: btn.style.position,
            bottom: btn.style.bottom,
            right: btn.style.right,
            display: btn.style.display,
            zIndex: btn.style.zIndex,
            opacity: btn.style.opacity,
            visibility: btn.style.visibility
        });
        
        // Forzar visibilidad
        btn.style.opacity = '1';
        btn.style.visibility = 'visible';
        btn.style.display = 'flex';
        console.log('🔧 Visibilidad forzada');
        
    } else {
        console.error('❌ Botón independiente NO encontrado');
        console.log('🔧 Creando botón...');
        createIndependentFloatingButton();
    }
};

console.log('✅ Solución INDEPENDIENTE cargada');
console.log('🔧 Usa window.debugFloatingButton() para debug');

// ===== FUNCIÓN: CONFIGURAR EVENTOS DE SCROLL ULTRA OPTIMIZADA =====
function setupScrollEvents() {
    // ✨ THROTTLE ULTRA OPTIMIZADO PARA SCROLL ✨
    let ticking = false;
    
    function optimizedScrollHandler() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // ✨ EVENT LISTENER OPTIMIZADO CON OPCIONES PASSIVE ✨
    if (detectMobile()) {
        // Móvil: throttle más agresivo para mejor rendimiento
        let mobileScrollTimeout;
        const mobileScrollHandler = () => {
            clearTimeout(mobileScrollTimeout);
            mobileScrollTimeout = setTimeout(optimizedScrollHandler, 8); // ~120fps
        };
        
        window.addEventListener('scroll', mobileScrollHandler, { 
            passive: true,
            capture: false 
        });
        
        // Event listener adicional para touchend en móviles
        window.addEventListener('touchend', () => {
            setTimeout(optimizedScrollHandler, 100);
        }, { passive: true });
        
    } else {
        // Desktop: throttle normal
        window.addEventListener('scroll', optimizedScrollHandler, { 
            passive: true,
            capture: false 
        });
    }
    
    // Llamada inicial optimizada
    requestAnimationFrame(() => {
        setTimeout(handleScroll, 100);
    });
    
    console.log('📜 Eventos de scroll ultra optimizados configurados');
}

// ===== FUNCIÓN: OPTIMIZAR NAVEGACIÓN DE ENLACES EXISTENTES =====
function optimizeExistingLinks() {
    // Optimizar enlaces de navegación existentes
    const existingNavLinks = document.querySelectorAll('a[href^="#"]');
    
    existingNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Scroll optimizado para enlaces existentes
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId) || 
                                   document.querySelector(`.${targetId}`);
                
                if (targetElement) {
                    if (detectMobile()) {
                        smoothScrollTo(`#${targetId}`);
                    } else {
                        targetElement.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }
                }
            }, { passive: false });
        }
    });
    
    console.log(`🔗 ${existingNavLinks.length} enlaces optimizados para scroll suave`);
}

// ===== FUNCIÓN: OPTIMIZACIÓN DE SCROLL EN FORMULARIOS =====
function optimizeFormScrolling() {
    const form = document.getElementById('contact-form');
    const inputs = document.querySelectorAll('input, textarea');
    
    if (detectMobile()) {
        inputs.forEach(input => {
            // ✨ SCROLL SUAVE AL ENFOCAR CAMPOS EN MÓVIL ✨
            input.addEventListener('focus', function() {
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        this.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }, 300); // Delay para permitir que se abra el teclado virtual
                });
            }, { passive: true });
        });
        
        // Optimizar scroll al enviar formulario
        if (form) {
            form.addEventListener('submit', function() {
                requestAnimationFrame(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }, { passive: true });
        }
    }
    
    console.log('📝 Scroll de formularios optimizado para móvil');
}

// ===== FUNCIÓN: SCROLL INTELIGENTE ENTRE SECCIONES =====
function setupIntelligentSectionScrolling() {
    if (!detectMobile()) return;
    
    const sections = document.querySelectorAll('.hero, .main-services, .iot-section, .mission-vision, .contact-section');
    
    // ✨ INTERSECTION OBSERVER PARA NAVEGACIÓN INTELIGENTE ✨
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Scroll suave automático si la sección está parcialmente visible
                const rect = entry.boundingClientRect;
                const windowHeight = window.innerHeight;
                
                // Si menos del 70% de la sección es visible, hacer scroll suave
                if (rect.height > windowHeight * 0.7 && rect.top > windowHeight * 0.3) {
                    requestAnimationFrame(() => {
                        entry.target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    });
                }
            }
        });
    }, {
        threshold: [0.3, 0.7],
        rootMargin: '-80px 0px'
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    console.log('🎯 Scroll inteligente entre secciones configurado');
}

// ===== FUNCIÓN: INICIALIZACIÓN PRINCIPAL OPTIMIZADA CON DEBUG =====
function initCompleteSolution() {
    console.log('🚀 Iniciando solución con scroll ultra optimizado...');
    console.log('📱 Ancho de pantalla:', window.innerWidth);
    console.log('📱 Es móvil:', window.innerWidth <= 768);
    
    try {
        // Detectar dispositivo
        detectMobile();
        
        // 1. Configurar menú hamburguesa
        setupHamburgerMenu();
        
        // 2. Crear botón flotante FORZADO
        const button = createFloatingButton();
        
        if (button) {
            console.log('✅ Botón creado exitosamente');
            
            // 3. Verificar que el botón esté en el DOM
            setTimeout(() => {
                const buttonCheck = document.getElementById('real-floating-back-btn');
                if (buttonCheck) {
                    console.log('✅ Botón confirmado en DOM');
                    console.log('📍 Computed styles:', {
                        display: getComputedStyle(buttonCheck).display,
                        position: getComputedStyle(buttonCheck).position,
                        bottom: getComputedStyle(buttonCheck).bottom,
                        right: getComputedStyle(buttonCheck).right,
                        zIndex: getComputedStyle(buttonCheck).zIndex
                    });
                } else {
                    console.error('❌ Botón NO encontrado en verificación');
                }
            }, 500);
        } else {
            console.log('ℹ️ Botón no creado (desktop o error)');
        }
        
        // 4. Configurar scroll optimizado
        setupScrollEvents();
        
        // 5. Optimizar enlaces existentes
        optimizeExistingLinks();
        
        // 6. Optimizar scroll en formularios
        optimizeFormScrolling();
        
        // 7. Configurar scroll inteligente entre secciones
        setupIntelligentSectionScrolling();
        
        console.log('✅ Solución con scroll ultra optimizado inicializada');
        
    } catch (error) {
        console.error('❌ Error en inicialización:', error);
    }
}

// ===== FUNCIÓN: REDETECCIÓN EN RESIZE =====
function handleResize() {
    const wasMobile = isMobile;
    detectMobile();
    
    // Si cambió de móvil a desktop o viceversa, reinicializar
    if (wasMobile !== isMobile) {
        console.log('📱➡️🖥️ Cambio de dispositivo detectado, reoptimizando...');
        
        // Cerrar menú si está abierto
        if (isMenuOpen) closeMenu();
        
        // Reconfigurar eventos de scroll
        setupScrollEvents();
        
        // Reoptimizar formularios
        optimizeFormScrolling();
    }
    
    // Mantener lógica existente para pantallas grandes
    if (window.innerWidth > 768) {
        if (isMenuOpen) closeMenu();
    }
}

// ===== INICIALIZACIÓN AUTOMÁTICA OPTIMIZADA =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCompleteSolution, { once: true });
} else {
    initCompleteSolution();
}

// Backup para asegurar la creación del botón si se carga tarde
window.addEventListener('load', () => {
    setTimeout(() => {
        if (!document.getElementById('real-floating-back-btn')) {
            createFloatingButton();
            handleScroll();
        }
    }, 500);
}, { once: true, passive: true });

// Resize handler optimizado
window.addEventListener('resize', handleResize, { passive: true });

// ===== OPTIMIZACIONES ADICIONALES PARA MÓVILES =====

// Prevenir scroll bounce en iOS
if (detectMobile() && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });
}

// ===== MONITOREO DE RENDIMIENTO DE SCROLL =====
function monitorScrollPerformance() {
    if ('performance' in window && detectMobile()) {
        let scrollStartTime;
        let scrollFrames = 0;
        
        window.addEventListener('scroll', () => {
            if (!scrollStartTime) {
                scrollStartTime = performance.now();
            }
            scrollFrames++;
        }, { passive: true });
        
        window.addEventListener('scrollend', () => {
            if (scrollStartTime) {
                const scrollDuration = performance.now() - scrollStartTime;
                const fps = (scrollFrames / scrollDuration) * 1000;
                
                console.log(`📊 Scroll performance: ${fps.toFixed(1)} FPS promedio`);
                
                scrollStartTime = null;
                scrollFrames = 0;
            }
        }, { passive: true });
    }
}

// Inicializar monitoreo de rendimiento
if (document.readyState === 'complete') {
    monitorScrollPerformance();
} else {
    window.addEventListener('load', monitorScrollPerformance, { once: true, passive: true });
}

// ===== API PÚBLICA OPTIMIZADA =====
window.completeSolution = {
    reinit: initCompleteSolution,
    toggleMenu: toggleMenu,
    button: () => document.getElementById('real-floating-back-btn'),
    smoothScrollTo: smoothScrollTo,
    isMobile: () => isMobile,
    optimizeScroll: () => {
        setupScrollEvents();
        optimizeFormScrolling();
        setupIntelligentSectionScrolling();
    }
};

console.log('✅ Solución completa con scroll ultra optimizado cargada');

// ===== FUNCIÓN DE DEBUG PARA DIAGNÓSTICO =====
window.debugFloatingButton = function() {
    console.log('🔍 === DEBUG BOTÓN FLOTANTE ===');
    console.log('📱 Ancho de pantalla:', window.innerWidth);
    console.log('📱 Es móvil:', window.innerWidth <= 768);
    
    const button = document.getElementById('real-floating-back-btn');
    if (button) {
        console.log('✅ Botón encontrado en DOM');
        console.log('📍 Estilos inline:', {
            display: button.style.display,
            position: button.style.position,
            bottom: button.style.bottom,
            right: button.style.right,
            opacity: button.style.opacity,
            visibility: button.style.visibility,
            zIndex: button.style.zIndex
        });
        console.log('📍 Computed styles:', {
            display: getComputedStyle(button).display,
            position: getComputedStyle(button).position,
            bottom: getComputedStyle(button).bottom,
            right: getComputedStyle(button).right,
            opacity: getComputedStyle(button).opacity,
            visibility: getComputedStyle(button).visibility,
            zIndex: getComputedStyle(button).zIndex
        });
        console.log('📍 Classes:', button.className);
        console.log('📍 Parent:', button.parentElement);
        
        // Forzar mostrar el botón para test
        button.style.opacity = '1';
        button.style.visibility = 'visible';
        button.style.transform = 'translateY(0) translateZ(0)';
        console.log('🔧 Forzando visibilidad para test...');
        
    } else {
        console.error('❌ Botón NO encontrado en DOM');
        console.log('🔧 Intentando crear botón...');
        if (window.innerWidth <= 768) {
            createFloatingButton();
        }
    }
    
    console.log('🔍 === FIN DEBUG ===');
};
