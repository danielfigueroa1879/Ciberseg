// ===== SOLUCIÓN COMPLETA CON SCROLL ULTRA OPTIMIZADO PARA MÓVILES =====

console.log('🚀 Iniciando solución con scroll ultra optimizado...');

// ===== VARIABLES GLOBALES =====
let isMenuOpen = false;
let menuButton, mobileMenu;
let scrollTimeout;
let isMobile = false;

// ===== DETECCIÓN DE DISPOSITIVO MÓVIL =====
function detectMobile() {
    isMobile = window.innerWidth <= 768;
    return isMobile;
}

// ===== FUNCIÓN: SCROLL SUAVE OPTIMIZADO PARA MÓVILES =====
function smoothScrollTo(target) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    if (detectMobile()) {
        // ✨ SCROLL ULTRA OPTIMIZADO PARA MÓVILES ✨
        
        // Método 1: Intersection Observer para scroll preciso
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.disconnect();
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-80px 0px 0px 0px' // Compensa altura del header
        });
        
        observer.observe(targetElement);
        
        // Método 2: Scroll nativo optimizado con requestAnimationFrame
        requestAnimationFrame(() => {
            const headerHeight = 80;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            // Usar scrollTo nativo para máximo rendimiento
            window.scrollTo({
                top: targetPosition,
                left: 0,
                behavior: 'smooth'
            });
        });
        
        // Método 3: Fallback para navegadores antiguos
        setTimeout(() => {
            if (window.pageYOffset === window.scrollY) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
            }
        }, 100);
        
    } else {
        // Desktop: scroll normal
        targetElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
    
    console.log(`🎯 Scroll suave a: ${target}`);
}

// ===== FUNCIÓN: CREAR MENÚ HAMBURGUESA =====
function setupHamburgerMenu() {
    menuButton = document.getElementById('mobile-menu');
    mobileMenu = document.getElementById('nav-menu');
    
    if (!menuButton || !mobileMenu) {
        console.error('❌ Elementos del menú no encontrados');
        return;
    }
    
    // Asegurar estructura del botón
    if (menuButton.children.length === 0) {
        menuButton.innerHTML = `
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        `;
    }
    
    // Crear enlaces del menú con scroll optimizado
    const menuItems = [
        { text: 'Inicio', target: '.hero' },
        { text: 'Servicios', target: '.iot-section' },
        { text: 'Misión', target: '.mission-vision' },
        { text: 'Suscripción', target: '.contact-section' }
    ];
    
    // Limpiar y crear menú
    mobileMenu.innerHTML = '';
    
    menuItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        
        const a = document.createElement('a');
        a.href = '#';
        a.className = 'nav-link';
        a.textContent = item.text;
        
        // ✨ EVENT LISTENER CON SCROLL ULTRA OPTIMIZADO ✨
        a.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Cerrar menú inmediatamente para mejor UX
            closeMenu();
            
            // Scroll optimizado con delay mínimo
            requestAnimationFrame(() => {
                setTimeout(() => {
                    smoothScrollTo(item.target);
                }, 200); // Reducido de 300 a 200ms
            });
        }, { passive: false });
        
        li.appendChild(a);
        mobileMenu.appendChild(li);
    });
    
    // Event listener del botón hamburguesa
    menuButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    }, { passive: false });
    
    // Cerrar menú al hacer click fuera con scroll optimizado
    document.addEventListener('click', function(e) {
        if (isMenuOpen && 
            !menuButton.contains(e.target) && 
            !mobileMenu.contains(e.target)) {
            closeMenu();
        }
    }, { passive: true });
    
    console.log('🍔 Menú hamburguesa con scroll optimizado configurado');
}

// ===== FUNCIONES DEL MENÚ OPTIMIZADAS =====
function openMenu() {
    isMenuOpen = true;
    
    // ✨ ANIMACIÓN OPTIMIZADA CON requestAnimationFrame ✨
    requestAnimationFrame(() => {
        menuButton.classList.add('active');
        mobileMenu.classList.add('active');
        document.body.classList.add('menu-open');
        
        // Prevenir scroll del body en móvil
        if (detectMobile()) {
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${window.scrollY}px`;
        }
    });
    
    console.log('📂 Menú abierto con scroll optimizado');
}

function closeMenu() {
    isMenuOpen = false;
    
    // ✨ RESTAURAR SCROLL OPTIMIZADO ✨
    requestAnimationFrame(() => {
        if (menuButton) menuButton.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
        
        // Restaurar scroll del body
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
    
    console.log('📁 Menú cerrado con scroll restaurado');
}

function toggleMenu() {
    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

// ===== FUNCIÓN: CREAR BOTÓN FLOTANTE =====
function createFloatingButton() {
    // Remover botones existentes para evitar duplicados
    const existingButtons = document.querySelectorAll('#real-floating-back-btn');
    existingButtons.forEach(btn => btn.remove());
    
    // Crear botón
    const button = document.createElement('button');
    button.id = 'real-floating-back-btn';
    button.setAttribute('aria-label', 'Ir al inicio');
    
    // Añadir icono de Font Awesome
    button.innerHTML = '<i class="fas fa-chevron-up"></i>';
    
    // ✨ EVENT LISTENERS CON SCROLL ULTRA OPTIMIZADO ✨
    button.addEventListener('click', handleFloatingClick, { passive: false });
    button.addEventListener('touchstart', handleFloatingClick, { passive: true });
    
    document.body.appendChild(button);
    
    console.log('🔴 Botón flotante con scroll optimizado creado');
    return button;
}

// ===== FUNCIÓN: MANEJAR CLICK DEL BOTÓN FLOTANTE OPTIMIZADO =====
function handleFloatingClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🔼 Scroll ultra suave al inicio');
    
    if (detectMobile()) {
        // ✨ SCROLL AL INICIO ULTRA OPTIMIZADO PARA MÓVILES ✨
        
        // Método 1: requestAnimationFrame para máxima suavidad
        requestAnimationFrame(() => {
            // Método 2: Smooth scroll nativo optimizado
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        });
        
        // Método 3: Verificación de scroll completado
        const checkScrollComplete = () => {
            if (window.pageYOffset > 10) {
                requestAnimationFrame(checkScrollComplete);
            } else {
                console.log('✅ Scroll al inicio completado');
            }
        };
        
        setTimeout(checkScrollComplete, 100);
        
    } else {
        // Desktop: scroll normal
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
}

// ===== FUNCIÓN: MANEJAR SCROLL ULTRA OPTIMIZADA =====
function handleScroll() {
    const button = document.getElementById('real-floating-back-btn');
    if (!button) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const threshold = 200;
    
    // ✨ OPTIMIZACIÓN: Solo procesar cambios significativos ✨
    if (Math.abs(scrollTop - (handleScroll.lastScrollY || 0)) < 5) return;
    handleScroll.lastScrollY = scrollTop;
    
    // Limpiar el timer anterior
    clearTimeout(scrollTimeout);
    
    if (scrollTop > threshold) {
        // Mostrar botón con animación optimizada - CENTRADO VERTICALMENTE
        if (!button.classList.contains('floating-visible')) {
            requestAnimationFrame(() => {
                button.classList.add('floating-visible');
                // Asegurar que se mantenga centrado verticalmente
                button.style.transform = 'translateY(-50%) translateZ(0)';
            });
            console.log('👁️ Botón flotante mostrado en el centro derecha');
        }
        
        // Timer para auto-ocultar optimizado
        scrollTimeout = setTimeout(() => {
            requestAnimationFrame(() => {
                button.classList.remove('floating-visible');
            });
            console.log('🙈 Botón flotante ocultado por inactividad');
        }, 15000);
        
    } else {
        // Ocultar botón con animación optimizada
        if (button.classList.contains('floating-visible')) {
            requestAnimationFrame(() => {
                button.classList.remove('floating-visible');
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

// ===== FUNCIÓN: INICIALIZACIÓN PRINCIPAL OPTIMIZADA =====
function initCompleteSolution() {
    console.log('🚀 Iniciando solución con scroll ultra optimizado...');
    
    try {
        // Detectar dispositivo
        detectMobile();
        
        // 1. Configurar menú hamburguesa
        setupHamburgerMenu();
        
        // 2. Crear botón flotante
        createFloatingButton();
        
        // 3. Configurar scroll optimizado
        setupScrollEvents();
        
        // 4. Optimizar enlaces existentes
        optimizeExistingLinks();
        
        // 5. Optimizar scroll en formularios
        optimizeFormScrolling();
        
        // 6. Configurar scroll inteligente entre secciones
        setupIntelligentSectionScrolling();
        
        console.log('✅ Solución con scroll ultra optimizado inicializada');
        
    } catch (error) {
        console.error('❌ Error:', error);
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

// ===== FUNCIÓN DE DEBUG PARA SCROLL =====
window.debugScroll = function() {
    console.log('🔍 Debug de scroll:', {
        isMobile: isMobile,
        scrollY: window.scrollY,
        isMenuOpen: isMenuOpen,
        buttonVisible: document.getElementById('real-floating-back-btn')?.classList.contains('floating-visible')
    });
};
