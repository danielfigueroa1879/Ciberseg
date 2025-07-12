// ===== SOLUCIÓN DEFINITIVA: BOTÓN FLOTANTE QUE ACOMPAÑA AL SCROLL =====

console.log('🚀 Iniciando solución de botón flotante dinámico...');

// ===== CSS OPTIMIZADO PARA BOTÓN FLOTANTE =====
const floatingButtonCSS = `
/* ===== ELIMINAR CUALQUIER BOTÓN PREVIO ===== */
.scroll-to-top,
#scrollToTop,
button[aria-label*="arriba"],
button[class*="scroll"],
button[id*="scroll"],
#ultra-floating-btn {
    display: none !important;
}

/* ===== BOTÓN FLOTANTE MÓVIL ===== */
@media screen and (max-width: 768px) {
    
    /* BOTÓN FLOTANTE FIJO */
    #dynamic-scroll-btn {
        /* POSITION FIXED - FUNDAMENTAL */
        position: fixed !important;
        bottom: 30px !important;
        right: 20px !important;
        
        /* Tamaño */
        width: 56px !important;
        height: 56px !important;
        
        /* Diseño circular */
        border-radius: 50% !important;
        border: 2px solid rgba(255, 255, 255, 0.3) !important;
        outline: none !important;
        
        /* Fondo verde degradado */
        background: linear-gradient(135deg, #E0FD2C 0%, #C7E525 100%) !important;
        
        /* Sombra para efecto flotante */
        box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.3),
            0 2px 8px rgba(224, 253, 44, 0.4),
            inset 0 1px 2px rgba(255, 255, 255, 0.3) !important;
        
        /* Flexbox para centrar contenido */
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        
        /* Z-index alto */
        z-index: 9999 !important;
        
        /* Interactividad */
        cursor: pointer !important;
        touch-action: manipulation !important;
        -webkit-tap-highlight-color: transparent !important;
        user-select: none !important;
        
        /* Transiciones suaves */
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        
        /* Estado inicial oculto */
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        transform: translateY(100px) !important;
        
        /* Reset */
        margin: 0 !important;
        padding: 0 !important;
        font-size: 0 !important;
        overflow: hidden !important;
    }
    
    /* Estado visible */
    #dynamic-scroll-btn.visible {
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto !important;
        transform: translateY(0) !important;
    }
    
    /* Hover */
    #dynamic-scroll-btn:hover {
        background: linear-gradient(135deg, #C7E525 0%, #B8D61F 100%) !important;
        transform: scale(1.1) !important;
        box-shadow: 
            0 6px 20px rgba(0, 0, 0, 0.4),
            0 4px 12px rgba(224, 253, 44, 0.6) !important;
    }
    
    /* Active */
    #dynamic-scroll-btn:active {
        transform: scale(0.95) !important;
        transition: transform 0.1s ease !important;
    }
    
    /* Icono de flecha */
    #dynamic-scroll-btn svg {
        width: 24px !important;
        height: 24px !important;
        fill: #000 !important;
        pointer-events: none !important;
    }
    
    /* Animación de entrada */
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(100px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    #dynamic-scroll-btn.visible {
        animation: slideInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
    }
}

/* MÓVILES PEQUEÑOS */
@media screen and (max-width: 480px) {
    #dynamic-scroll-btn {
        width: 50px !important;
        height: 50px !important;
        bottom: 25px !important;
        right: 15px !important;
    }
    
    #dynamic-scroll-btn svg {
        width: 20px !important;
        height: 20px !important;
    }
}

/* DESKTOP - Ocultar completamente */
@media screen and (min-width: 769px) {
    #dynamic-scroll-btn {
        display: none !important;
    }
}
`;

// ===== VARIABLES GLOBALES =====
let scrollButton = null;
let isMenuOpen = false;
let menuButton, mobileMenu;
let scrollTimeout;

// ===== FUNCIÓN: CREAR BOTÓN FLOTANTE =====
function createScrollButton() {
    // Solo crear en móviles
    if (window.innerWidth > 768) return;
    
    // Eliminar botones anteriores
    const existingButtons = document.querySelectorAll('#dynamic-scroll-btn, #ultra-floating-btn, .scroll-to-top');
    existingButtons.forEach(btn => btn.remove());
    
    // Crear nuevo botón
    scrollButton = document.createElement('button');
    scrollButton.id = 'dynamic-scroll-btn';
    scrollButton.type = 'button';
    scrollButton.setAttribute('aria-label', 'Volver arriba');
    scrollButton.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 14L12 9L17 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    
    // Event listeners
    scrollButton.addEventListener('click', scrollToTop);
    scrollButton.addEventListener('touchstart', function(e) {
        e.preventDefault();
        scrollToTop();
    }, { passive: false });
    
    // Añadir al body
    document.body.appendChild(scrollButton);
    
    console.log('✅ Botón flotante creado');
    return scrollButton;
}

// ===== FUNCIÓN: SCROLL AL INICIO =====
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== FUNCIÓN: ACTUALIZAR VISIBILIDAD DEL BOTÓN =====
function updateButtonVisibility() {
    if (!scrollButton || window.innerWidth > 768) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const threshold = 300; // Mostrar después de 300px de scroll
    
    if (scrollTop > threshold) {
        if (!scrollButton.classList.contains('visible')) {
            scrollButton.classList.add('visible');
            console.log('🔼 Botón visible');
        }
    } else {
        if (scrollButton.classList.contains('visible')) {
            scrollButton.classList.remove('visible');
            console.log('🔽 Botón oculto');
        }
    }
}

// ===== FUNCIÓN: THROTTLED SCROLL HANDLER =====
function throttle(func, wait) {
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

// ===== FUNCIÓN: CONFIGURAR MENÚ =====
function setupMenu() {
    menuButton = document.getElementById('mobile-menu');
    mobileMenu = document.getElementById('nav-menu');
    
    if (!menuButton || !mobileMenu) return;
    
    // Asegurar estructura del menú
    if (menuButton.children.length === 0) {
        menuButton.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
    }
    
    // Configurar enlaces del menú
    const menuItems = [
        { text: 'Inicio', target: '#inicio' },
        { text: 'Servicios', target: '#servicios' },
        { text: 'Contacto', target: '#contacto' },
        { text: 'Suscripción', target: '#contacto' }
    ];
    
    mobileMenu.innerHTML = '';
    menuItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        const a = document.createElement('a');
        a.href = item.target;
        a.className = 'nav-link';
        a.textContent = item.text;
        a.addEventListener('click', function(e) {
            e.preventDefault();
            closeMenu();
            const target = document.querySelector(item.target);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
        li.appendChild(a);
        mobileMenu.appendChild(li);
    });
    
    // Event listeners
    menuButton.addEventListener('click', toggleMenu);
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !menuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMenu();
        }
    });
    
    console.log('✅ Menú configurado');
}

function openMenu() {
    isMenuOpen = true;
    if (menuButton) menuButton.classList.add('active');
    if (mobileMenu) mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    isMenuOpen = false;
    if (menuButton) menuButton.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

function toggleMenu() {
    isMenuOpen ? closeMenu() : openMenu();
}

// ===== FUNCIÓN: APLICAR CSS =====
function applyCSS() {
    // Eliminar estilos anteriores
    const oldStyles = document.querySelectorAll('style[id*="floating"], style[id*="scroll"], style[id*="anti-conflict"]');
    oldStyles.forEach(style => style.remove());
    
    // Aplicar nuevo CSS
    const style = document.createElement('style');
    style.id = 'dynamic-floating-button-css';
    style.innerHTML = floatingButtonCSS;
    document.head.appendChild(style);
    
    console.log('✅ CSS aplicado');
}

// ===== FUNCIÓN: CONFIGURAR EVENTOS DE SCROLL =====
function setupScrollEvents() {
    const throttledUpdate = throttle(updateButtonVisibility, 100);
    
    // Eventos de scroll
    window.addEventListener('scroll', throttledUpdate, { passive: true });
    window.addEventListener('touchmove', throttledUpdate, { passive: true });
    
    // Verificación inicial
    setTimeout(updateButtonVisibility, 100);
    
    console.log('✅ Eventos de scroll configurados');
}

// ===== FUNCIÓN: MONITOREAR Y MANTENER BOTÓN =====
function monitorButton() {
    setInterval(() => {
        if (window.innerWidth <= 768 && !document.getElementById('dynamic-scroll-btn')) {
            console.log('⚠️ Botón perdido, recreando...');
            createScrollButton();
            updateButtonVisibility();
        }
    }, 2000);
}

// ===== FUNCIÓN: INICIALIZACIÓN PRINCIPAL =====
function initFloatingButton() {
    console.log('🎯 Iniciando sistema de botón flotante...');
    
    try {
        // 1. Aplicar CSS
        applyCSS();
        
        // 2. Configurar menú
        setupMenu();
        
        // 3. Crear botón
        createScrollButton();
        
        // 4. Configurar eventos
        setupScrollEvents();
        
        // 5. Monitorear
        monitorButton();
        
        console.log('✅ Sistema de botón flotante inicializado correctamente');
        
    } catch (error) {
        console.error('❌ Error en inicialización:', error);
    }
}

// ===== EVENTOS DE RESIZE =====
window.addEventListener('resize', throttle(() => {
    if (window.innerWidth > 768) {
        // Eliminar botón en desktop
        if (scrollButton) {
            scrollButton.remove();
            scrollButton = null;
        }
        if (isMenuOpen) closeMenu();
    } else {
        // Crear botón si no existe en móvil
        if (!document.getElementById('dynamic-scroll-btn')) {
            createScrollButton();
            updateButtonVisibility();
        }
    }
}, 300));

// ===== INICIALIZACIÓN =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFloatingButton);
} else {
    initFloatingButton();
}

// Inicialización adicional después de load
window.addEventListener('load', () => {
    setTimeout(() => {
        if (!document.getElementById('dynamic-scroll-btn') && window.innerWidth <= 768) {
            createScrollButton();
            updateButtonVisibility();
        }
    }, 500);
});

// ===== API PÚBLICA =====
window.floatingButtonSystem = {
    reinit: initFloatingButton,
    getButton: () => document.getElementById('dynamic-scroll-btn'),
    forceShow: () => {
        const btn = document.getElementById('dynamic-scroll-btn');
        if (btn) btn.classList.add('visible');
    },
    forceHide: () => {
        const btn = document.getElementById('dynamic-scroll-btn');
        if (btn) btn.classList.remove('visible');
    }
};

console.log('✅ Sistema de botón flotante cargado');
console.log('📍 El botón aparecerá después de 300px de scroll');
console.log('🔧 Debug: window.floatingButtonSystem');
