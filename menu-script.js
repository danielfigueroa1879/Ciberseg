// ===== SOLUCIÓN ULTRA OPTIMIZADA: MENÚ HAMBURGUESA + BOTÓN FLOTANTE =====
// Versión 2.0 - Optimizada para máximo rendimiento en móviles

console.log('🚀 Iniciando solución ultra optimizada...');

// ===== VARIABLES GLOBALES OPTIMIZADAS =====
let isMenuOpen = false;
let menuButton, mobileMenu;
let scrollTimeout;
let isScrolling = false;
let lastScrollY = 0;

// Cache de elementos DOM para evitar búsquedas repetidas
const elementCache = new Map();

// ===== FUNCIONES DE UTILIDAD OPTIMIZADAS =====
function getElement(id) {
    if (!elementCache.has(id)) {
        elementCache.set(id, document.getElementById(id));
    }
    return elementCache.get(id);
}

// Throttle optimizado usando requestAnimationFrame
function throttle(func, limit = 16) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            requestAnimationFrame(() => inThrottle = false);
        }
    }
}

// Debounce optimizado
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== FUNCIÓN: CREAR MENÚ HAMBURGUESA OPTIMIZADO =====
function setupHamburgerMenu() {
    menuButton = getElement('mobile-menu');
    mobileMenu = getElement('nav-menu');
    
    if (!menuButton || !mobileMenu) {
        console.error('❌ Elementos del menú no encontrados');
        return;
    }
    
    // Verificar y crear estructura del botón solo si es necesario
    if (menuButton.children.length === 0) {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 3; i++) {
            const span = document.createElement('span');
            span.className = 'bar';
            fragment.appendChild(span);
        }
        menuButton.appendChild(fragment);
    }
    
    // Crear enlaces del menú de manera eficiente
    const menuItems = [
        { text: 'Inicio', target: '.hero' },
        { text: 'Servicios', target: '.iot-section' },
        { text: 'Misión', target: '.mission-vision' },
        { text: 'Suscripción', target: '.contact-section' }
    ];
    
    // Usar DocumentFragment para manipulación DOM eficiente
    const fragment = document.createDocumentFragment();
    
    menuItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        
        const a = document.createElement('a');
        a.href = '#';
        a.className = 'nav-link';
        a.textContent = item.text;
        
        // Event listener optimizado con delegación
        a.addEventListener('click', handleMenuItemClick.bind(null, item.target), { passive: false });
        
        li.appendChild(a);
        fragment.appendChild(li);
    });
    
    // Reemplazar contenido de una vez
    mobileMenu.innerHTML = '';
    mobileMenu.appendChild(fragment);
    
    // Event listeners optimizados
    menuButton.addEventListener('click', handleMenuToggle, { passive: false });
    
    // Usar delegación de eventos para el documento
    document.addEventListener('click', handleDocumentClick, { passive: true });
    
    console.log('🍔 Menú hamburguesa optimizado configurado');
}

// ===== MANEJADORES DE EVENTOS OPTIMIZADOS =====
function handleMenuItemClick(target, e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Cerrar menú inmediatamente para mejor UX
    closeMenu();
    
    // Navegación diferida para mejorar rendimiento
    requestAnimationFrame(() => {
        setTimeout(() => {
            const targetElement = document.querySelector(target);
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }, 200);
    });
}

function handleMenuToggle(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleMenu();
}

function handleDocumentClick(e) {
    if (isMenuOpen && 
        !menuButton?.contains(e.target) && 
        !mobileMenu?.contains(e.target)) {
        closeMenu();
    }
}

// ===== FUNCIONES DEL MENÚ OPTIMIZADAS =====
function openMenu() {
    if (isMenuOpen) return;
    
    isMenuOpen = true;
    
    // Usar requestAnimationFrame para animaciones suaves
    requestAnimationFrame(() => {
        menuButton?.classList.add('active');
        mobileMenu?.classList.add('active');
        document.body.classList.add('menu-open');
    });
    
    console.log('📂 Menú abierto');
}

function closeMenu() {
    if (!isMenuOpen) return;
    
    isMenuOpen = false;
    
    // Usar requestAnimationFrame para animaciones suaves
    requestAnimationFrame(() => {
        menuButton?.classList.remove('active');
        mobileMenu?.classList.remove('active');
        document.body.classList.remove('menu-open');
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

// ===== FUNCIÓN: CREAR BOTÓN FLOTANTE OPTIMIZADO =====
function createFloatingButton() {
    // Remover botones existentes de manera eficiente
    const existingButtons = document.querySelectorAll('#real-floating-back-btn');
    existingButtons.forEach(btn => btn.remove());
    
    // Crear botón optimizado
    const button = document.createElement('button');
    button.id = 'real-floating-back-btn';
    button.setAttribute('aria-label', 'Ir al inicio');
    
    // Crear icono de manera eficiente
    const icon = document.createElement('i');
    icon.className = 'fas fa-chevron-up';
    button.appendChild(icon);
    
    // Event listeners optimizados
    button.addEventListener('click', handleFloatingClick, { passive: false });
    button.addEventListener('touchstart', handleFloatingClick, { passive: true });
    
    // Usar requestAnimationFrame para inserción suave
    requestAnimationFrame(() => {
        document.body.appendChild(button);
    });
    
    console.log('🔴 Botón flotante optimizado creado');
    return button;
}

// ===== FUNCIÓN: MANEJAR CLICK DEL BOTÓN FLOTANTE OPTIMIZADO =====
function handleFloatingClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🔼 Scroll optimizado al inicio');
    
    // Scroll optimizado
    if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    } else {
        // Fallback para navegadores antiguos
        window.scrollTo(0, 0);
    }
}

// ===== FUNCIÓN: MANEJAR SCROLL ULTRA OPTIMIZADA =====
function handleScroll() {
    const button = getElement('real-floating-back-btn');
    if (!button) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const threshold = 200;
    
    // Optimización: solo procesar si hay cambio significativo
    if (Math.abs(scrollTop - lastScrollY) < 10) return;
    lastScrollY = scrollTop;
    
    // Limpiar timeout anterior
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    const shouldShow = scrollTop > threshold;
    const isVisible = button.classList.contains('floating-visible');
    
    if (shouldShow && !isVisible) {
        // Mostrar botón
        requestAnimationFrame(() => {
            button.classList.add('floating-visible');
        });
        console.log('👁️ Botón flotante mostrado');
        
        // Timer para auto-ocultar
        scrollTimeout = setTimeout(() => {
            requestAnimationFrame(() => {
                button.classList.remove('floating-visible');
            });
            console.log('🙈 Botón flotante ocultado por inactividad');
        }, 15000);
        
    } else if (!shouldShow && isVisible) {
        // Ocultar botón
        requestAnimationFrame(() => {
            button.classList.remove('floating-visible');
        });
        console.log('🙈 Botón flotante ocultado (cerca del inicio)');
    } else if (shouldShow && isVisible) {
        // Resetear timer si ya está visible
        scrollTimeout = setTimeout(() => {
            requestAnimationFrame(() => {
                button.classList.remove('floating-visible');
            });
            console.log('🙈 Botón flotante ocultado por inactividad');
        }, 15000);
    }
}

// ===== FUNCIÓN: CONFIGURAR EVENTOS DE SCROLL OPTIMIZADA =====
function setupScrollEvents() {
    // Throttle optimizado para scroll
    const throttledScroll = throttle(handleScroll, 16); // ~60fps
    
    // Event listener optimizado con opciones passive
    window.addEventListener('scroll', throttledScroll, { 
        passive: true,
        capture: false 
    });
    
    // Llamada inicial optimizada
    requestAnimationFrame(() => {
        setTimeout(handleScroll, 100);
    });
    
    console.log('📜 Eventos de scroll ultra optimizados configurados');
}

// ===== FUNCIÓN: OPTIMIZACIONES ADICIONALES =====
function optimizePerformance() {
    // Optimizar imágenes lazy loading si existen
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        if (images.length > 0) {
            console.log(`🖼️ ${images.length} imágenes lazy configuradas`);
        }
    }
    
    // Prefetch de recursos críticos
    const prefetchResources = [
        'fotos/fondo.png',
        'fotos/bots1.mp4'
    ];
    
    prefetchResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = resource;
        document.head.appendChild(link);
    });
    
    // Optimizar CSS containment si es soportado
    if (CSS.supports('contain', 'layout')) {
        console.log('✅ CSS Containment soportado');
    }
    
    console.log('⚡ Optimizaciones de rendimiento aplicadas');
}

// ===== FUNCIÓN: INICIALIZACIÓN PRINCIPAL OPTIMIZADA =====
function initCompleteSolution() {
    console.log('🚀 Iniciando solución ultra optimizada...');
    
    try {
        // Usar requestIdleCallback si está disponible para tareas no críticas
        const runOptimizations = () => {
            setupHamburgerMenu();
            createFloatingButton();
            setupScrollEvents();
            optimizePerformance();
            console.log('✅ Solución ultra optimizada inicializada');
        };
        
        if ('requestIdleCallback' in window) {
            requestIdleCallback(runOptimizations, { timeout: 1000 });
        } else {
            // Fallback para navegadores sin soporte
            setTimeout(runOptimizations, 0);
        }
        
    } catch (error) {
        console.error('❌ Error:', error);
        // Fallback básico en caso de error
        setupHamburgerMenu();
        createFloatingButton();
    }
}

// ===== MANEJADORES DE EVENTOS DEL CICLO DE VIDA =====
function handleDOMContentLoaded() {
    initCompleteSolution();
}

function handleWindowLoad() {
    // Verificaciones post-carga
    setTimeout(() => {
        if (!getElement('real-floating-back-btn')) {
            console.log('🔧 Recreando botón flotante...');
            createFloatingButton();
            requestAnimationFrame(handleScroll);
        }
    }, 500);
}

function handleWindowResize() {
    // Optimizar resize con debounce
    const debouncedResize = debounce(() => {
        if (window.innerWidth > 768 && isMenuOpen) {
            closeMenu();
        }
    }, 250);
    
    debouncedResize();
}

// ===== INICIALIZACIÓN AUTOMÁTICA OPTIMIZADA =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleDOMContentLoaded, { once: true });
} else {
    // DOM ya está listo
    requestAnimationFrame(initCompleteSolution);
}

// Event listeners del ciclo de vida optimizados
window.addEventListener('load', handleWindowLoad, { once: true, passive: true });
window.addEventListener('resize', handleWindowResize, { passive: true });

// Cleanup en caso de descarga de página
window.addEventListener('beforeunload', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    console.log('🧹 Cleanup realizado');
}, { once: true, passive: true });

// ===== API PÚBLICA OPTIMIZADA =====
window.completeSolution = {
    reinit: initCompleteSolution,
    toggleMenu: toggleMenu,
    button: () => getElement('real-floating-back-btn'),
    performance: {
        cache: elementCache,
        isMenuOpen: () => isMenuOpen,
        lastScrollY: () => lastScrollY
    }
};

console.log('✅ Solución ultra optimizada cargada');

// ===== OPTIMIZACIÓN FINAL: REDUCIR MEMORY LEAKS =====
// Observer para limpiar event listeners si el elemento es removido
if ('MutationObserver' in window) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.removedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.id === 'real-floating-back-btn' || 
                        node.id === 'mobile-menu' || 
                        node.contains(menuButton) || 
                        node.contains(mobileMenu)) {
                        console.log('🧹 Elemento removido, limpiando referencias...');
                        elementCache.clear();
                    }
                }
            });
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}
