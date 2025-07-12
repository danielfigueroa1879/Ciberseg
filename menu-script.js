// ===== SOLUCIÓN ANTI-CONFLICTOS: BOTÓN QUE FLOTA REALMENTE =====

console.log('🔧 Eliminando TODOS los conflictos CSS...');

// ===== CSS ULTRA ESPECÍFICO ANTI-CONFLICTOS =====
const antiConflictCSS = `
/* ===== ELIMINAR CONFLICTOS EXISTENTES COMPLETAMENTE ===== */

/* Anular cualquier scroll-to-top existente */
.scroll-to-top,
#scrollToTop,
button[aria-label*="arriba"],
button[aria-label*="Volver"],
button[title*="arriba"],
button[class*="scroll"],
button[id*="scroll"] {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
    position: static !important;
    transform: none !important;
}

/* ===== BOTÓN FLOTANTE ULTRA ESPECÍFICO ===== */

@media screen and (max-width: 768px) {
    
    /* === MENÚ HAMBURGUESA MANTENIDO === */
    
    .header {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        z-index: 1500 !important;
        background-color: rgba(40, 40, 40, 0.98) !important;
        backdrop-filter: blur(10px) !important;
        min-height: 80px !important;
    }
    
    .navbar {
        padding: 15px 0 !important;
        height: 80px !important;
        display: flex !important;
        align-items: center !important;
    }
    
    .nav-container {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        padding: 0 20px !important;
        width: 100% !important;
    }
    
    .nav-logo {
        order: 1 !important;
        flex: 1 !important;
        text-align: center !important;
    }
    
    .nav-logo h2 {
        color: #c1d72b !important;
        font-size: 24px !important;
        font-weight: 700 !important;
        margin: 0 !important;
    }
    
    .nav-toggle {
        order: 2 !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        align-items: center !important;
        cursor: pointer !important;
        padding: 8px !important;
        background-color: #000 !important;
        border: 2px solid rgba(255, 255, 255, 0.4) !important;
        border-radius: 8px !important;
        transition: all 0.3s ease !important;
        position: relative !important;
        z-index: 1502 !important;
        min-height: 44px !important;
        min-width: 44px !important;
        margin-left: auto !important;
    }
    
    .bar {
        width: 24px !important;
        height: 3px !important;
        background-color: #fff !important;
        margin: 3px 0 !important;
        transition: all 0.4s ease !important;
        border-radius: 2px !important;
        display: block !important;
        transform-origin: center !important;
    }
    
    .nav-toggle.active .bar:nth-child(1) {
        transform: translateY(6px) rotate(45deg) !important;
    }
    
    .nav-toggle.active .bar:nth-child(2) {
        opacity: 0 !important;
        transform: scale(0) !important;
    }
    
    .nav-toggle.active .bar:nth-child(3) {
        transform: translateY(-6px) rotate(-45deg) !important;
    }
    
    .nav-menu {
        position: fixed !important;
        left: 0 !important;
        top: 80px !important;
        width: 100% !important;
        background: linear-gradient(135deg, rgba(45, 45, 45, 0.95), rgba(60, 60, 60, 0.92)) !important;
        backdrop-filter: blur(15px) !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        padding: 25px 20px 30px 20px !important;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4) !important;
        border-bottom-left-radius: 25px !important;
        border-bottom-right-radius: 25px !important;
        border: 2px solid rgba(224, 253, 44, 0.4) !important;
        border-top: none !important;
        z-index: 1400 !important;
        opacity: 0 !important;
        visibility: hidden !important;
        transform: translateY(-30px) !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        max-height: 0 !important;
        overflow: hidden !important;
    }
    
    .nav-menu.active {
        opacity: 1 !important;
        visibility: visible !important;
        transform: translateY(0) !important;
        max-height: 400px !important;
    }
    
    .nav-menu li {
        width: 100% !important;
        max-width: 350px !important;
        margin: 0 !important;
        list-style: none !important;
        padding: 0 !important;
        display: block !important;
    }
    
    .nav-link {
        display: block !important;
        width: 100% !important;
        padding: 20px 25px !important;
        font-size: 22px !important;
        font-weight: 600 !important;
        color: #fff !important;
        text-decoration: none !important;
        text-align: center !important;
        transition: all 0.25s ease !important;
        background: transparent !important;
        border: none !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
        margin: 0 !important;
        box-sizing: border-box !important;
        letter-spacing: 1px !important;
        text-transform: uppercase !important;
    }
    
    .nav-link:hover {
        background: rgba(224, 253, 44, 0.1) !important;
        color: #E0FD2C !important;
        transform: translateX(5px) !important;
        border-bottom-color: #E0FD2C !important;
        text-shadow: 0 0 10px rgba(224, 253, 44, 0.5) !important;
    }
    
    .nav-menu li:last-child .nav-link {
        border-bottom: none !important;
    }
    
    /* CONTADOR DE VISITAS */
    .visitor-counter-container {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        color: #E0FD2C !important;
        font-size: 16px !important;
        font-weight: 600 !important;
        background-color: rgba(255, 255, 255, 0.1) !important;
        padding: 8px 15px !important;
        border-radius: 25px !important;
        position: absolute !important;
        top: 24px !important;
        left: 20px !important;
        z-index: 1001 !important;
    }
    
    .search-container {
        display: none !important;
    }
    
    /* === BOTÓN FLOTANTE ULTRA ESPECÍFICO === */
    
    /* ID ultra específico para evitar conflictos */
    body #ultra-floating-btn,
    html body #ultra-floating-btn,
    div #ultra-floating-btn,
    main #ultra-floating-btn {
        /* FORZAR POSITION FIXED */
        position: fixed !important;
        
        /* Posición base - se actualiza dinámicamente */
        top: 50vh !important;
        right: 15px !important;
        left: auto !important;
        bottom: auto !important;
        
        /* Centrado perfecto */
        transform: translateY(-50%) !important;
        -webkit-transform: translateY(-50%) !important;
        -moz-transform: translateY(-50%) !important;
        -ms-transform: translateY(-50%) !important;
        
        /* Tamaño fijo */
        width: 60px !important;
        height: 60px !important;
        min-width: 60px !important;
        min-height: 60px !important;
        max-width: 60px !important;
        max-height: 60px !important;
        
        /* Diseño circular */
        border-radius: 50% !important;
        border: 2px solid rgba(255, 255, 255, 0.3) !important;
        outline: none !important;
        box-sizing: border-box !important;
        
        /* Fondo verde */
        background: linear-gradient(135deg, #E0FD2C 0%, #C7E525 100%) !important;
        background-color: #E0FD2C !important;
        
        /* Sombra flotante */
        box-shadow: 
            0 12px 35px rgba(0, 0, 0, 0.7),
            0 6px 25px rgba(224, 253, 44, 0.9),
            0 3px 15px rgba(0, 0, 0, 0.5) !important;
        
        /* Flexbox centrado */
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        flex-direction: row !important;
        
        /* Z-index ultra alto */
        z-index: 9999999 !important;
        
        /* Interactividad */
        cursor: pointer !important;
        touch-action: manipulation !important;
        -webkit-tap-highlight-color: transparent !important;
        user-select: none !important;
        -webkit-user-select: none !important;
        
        /* Transiciones */
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        -webkit-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        
        /* Estado inicial oculto */
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        
        /* Reset completo */
        margin: 0 !important;
        padding: 0 !important;
        font-size: 0 !important;
        line-height: 1 !important;
        text-align: center !important;
        vertical-align: baseline !important;
        
        /* Overflow */
        overflow: hidden !important;
        
        /* Fuentes */
        font-family: inherit !important;
        color: transparent !important;
    }
    
    /* Estado visible ultra específico */
    body #ultra-floating-btn.ultra-visible,
    html body #ultra-floating-btn.ultra-visible {
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto !important;
    }
    
    /* Hover ultra específico */
    body #ultra-floating-btn:hover,
    html body #ultra-floating-btn:hover {
        background: linear-gradient(135deg, #C7E525 0%, #B8D61F 100%) !important;
        transform: translateY(-50%) translateX(-8px) scale(1.1) !important;
        box-shadow: 
            0 15px 45px rgba(0, 0, 0, 0.8),
            0 8px 30px rgba(224, 253, 44, 1),
            0 4px 20px rgba(0, 0, 0, 0.6) !important;
    }
    
    /* Active ultra específico */
    body #ultra-floating-btn:active,
    html body #ultra-floating-btn:active {
        transform: translateY(-50%) translateX(-5px) scale(1.05) !important;
        transition: all 0.1s ease !important;
    }
    
    /* Flecha ultra específica */
    body #ultra-floating-btn::before,
    html body #ultra-floating-btn::before {
        content: '' !important;
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) rotate(-45deg) !important;
        -webkit-transform: translate(-50%, -50%) rotate(-45deg) !important;
        
        width: 16px !important;
        height: 16px !important;
        
        border-top: 3px solid #000 !important;
        border-right: 3px solid #000 !important;
        border-left: none !important;
        border-bottom: none !important;
        border-radius: 0 !important;
        
        background: transparent !important;
        background-color: transparent !important;
        
        margin: 0 !important;
        padding: 0 !important;
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: none !important;
        z-index: 1 !important;
        
        box-shadow: none !important;
        outline: none !important;
        box-sizing: border-box !important;
    }
}

/* MÓVILES PEQUEÑOS */
@media screen and (max-width: 480px) {
    body #ultra-floating-btn,
    html body #ultra-floating-btn {
        width: 55px !important;
        height: 55px !important;
        right: 12px !important;
    }
    
    body #ultra-floating-btn::before,
    html body #ultra-floating-btn::before {
        width: 14px !important;
        height: 14px !important;
        border-top: 2.5px solid #000 !important;
        border-right: 2.5px solid #000 !important;
    }
    
    .visitor-counter-container {
        font-size: 12px !important;
        padding: 6px 10px !important;
        left: 15px !important;
    }
    
    .nav-logo {
        padding-left: 80px !important;
    }
}

/* DESKTOP - OCULTAR COMPLETAMENTE */
@media screen and (min-width: 769px) {
    #ultra-floating-btn,
    body #ultra-floating-btn,
    html body #ultra-floating-btn {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
    }
    
    .nav-toggle {
        display: none !important;
    }
    
    .nav-menu {
        position: static !important;
        width: auto !important;
        background: transparent !important;
        flex-direction: row !important;
        padding: 0 !important;
        box-shadow: none !important;
        border: none !important;
        opacity: 1 !important;
        visibility: visible !important;
        transform: none !important;
        max-height: none !important;
        overflow: visible !important;
    }
    
    .nav-menu li {
        margin: 0 15px !important;
        width: auto !important;
    }
    
    .nav-link {
        font-size: 18px !important;
        padding: 0 !important;
        width: auto !important;
        border: none !important;
        text-transform: none !important;
        letter-spacing: normal !important;
    }
}
`;

// ===== VARIABLES GLOBALES =====
let isMenuOpen = false;
let menuButton, mobileMenu;
let floatingButton = null;

// ===== FUNCIÓN: APLICAR CSS ANTI-CONFLICTOS =====
function applyAntiConflictCSS() {
    // Remover TODOS los estilos previos
    const allPreviousStyles = document.querySelectorAll('style[id*="floating"], style[id*="complete"], style[id*="menu"], style[id*="button"]');
    allPreviousStyles.forEach(style => style.remove());
    
    // Aplicar CSS ultra específico
    const style = document.createElement('style');
    style.id = 'anti-conflict-floating-css';
    style.innerHTML = antiConflictCSS;
    document.head.appendChild(style);
    
    console.log('🛡️ CSS anti-conflictos aplicado');
}

// ===== FUNCIÓN: CREAR BOTÓN FLOTANTE ANTI-CONFLICTOS =====
function createAntiConflictButton() {
    if (window.innerWidth > 768) return null;
    
    // Eliminar CUALQUIER botón existente
    const allButtons = document.querySelectorAll('button, div, span, a');
    allButtons.forEach(btn => {
        if (btn.id && (btn.id.includes('floating') || btn.id.includes('scroll') || btn.id.includes('back'))) {
            btn.remove();
        }
        if (btn.className && (btn.className.includes('floating') || btn.className.includes('scroll'))) {
            btn.remove();
        }
    });
    
    // Crear botón con ID ultra específico
    floatingButton = document.createElement('button');
    floatingButton.id = 'ultra-floating-btn';
    floatingButton.type = 'button';
    floatingButton.setAttribute('aria-label', 'Ir al inicio');
    
    // Event listeners
    floatingButton.addEventListener('click', handleAntiConflictClick, { passive: false });
    floatingButton.addEventListener('touchstart', handleAntiConflictClick, { passive: false });
    
    // Insertar en body con force
    document.body.appendChild(floatingButton);
    
    // Forzar estilos inline como último recurso
    setTimeout(() => {
        if (floatingButton) {
            floatingButton.style.cssText = `
                position: fixed !important;
                top: 50vh !important;
                right: 15px !important;
                width: 60px !important;
                height: 60px !important;
                border-radius: 50% !important;
                background: linear-gradient(135deg, #E0FD2C 0%, #C7E525 100%) !important;
                border: 2px solid rgba(255, 255, 255, 0.3) !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                z-index: 9999999 !important;
                opacity: 0 !important;
                visibility: hidden !important;
                pointer-events: none !important;
                cursor: pointer !important;
                transition: all 0.3s ease !important;
                transform: translateY(-50%) !important;
                box-shadow: 0 12px 35px rgba(0, 0, 0, 0.7), 0 6px 25px rgba(224, 253, 44, 0.9) !important;
            `;
        }
    }, 50);
    
    console.log('🔴 Botón anti-conflictos creado');
    return floatingButton;
}

// ===== FUNCIÓN: MANEJAR CLICK ANTI-CONFLICTOS =====
function handleAntiConflictClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🔼 Subiendo al inicio...');
    
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

// ===== FUNCIÓN: ACTUALIZAR POSICIÓN FLOTANTE =====
function updateFloatingPosition() {
    if (window.innerWidth > 768 || !floatingButton) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const threshold = 200;
    
    if (scrollTop > threshold) {
        // MOSTRAR y POSICIONAR el botón
        const centerPosition = scrollTop + (windowHeight / 2);
        
        // Forzar posición
        floatingButton.style.top = centerPosition + 'px';
        floatingButton.style.position = 'absolute';
        floatingButton.style.transform = 'translateY(-50%)';
        
        if (!floatingButton.classList.contains('ultra-visible')) {
            floatingButton.classList.add('ultra-visible');
            floatingButton.style.opacity = '1';
            floatingButton.style.visibility = 'visible';
            floatingButton.style.pointerEvents = 'auto';
            console.log('👁️ Botón flotante visible y siguiendo scroll');
        }
        
    } else {
        // OCULTAR botón
        if (floatingButton.classList.contains('ultra-visible')) {
            floatingButton.classList.remove('ultra-visible');
            floatingButton.style.opacity = '0';
            floatingButton.style.visibility = 'hidden';
            floatingButton.style.pointerEvents = 'none';
            console.log('🙈 Botón flotante oculto');
        }
    }
}

// ===== FUNCIÓN: CONFIGURAR MENÚ =====
function setupMenu() {
    menuButton = document.getElementById('mobile-menu');
    mobileMenu = document.getElementById('nav-menu');
    
    if (!menuButton || !mobileMenu) return;
    
    // Asegurar estructura
    if (menuButton.children.length === 0) {
        menuButton.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
    }
    
    // Crear enlaces
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
            closeMenu();
            setTimeout(() => {
                const target = document.querySelector(item.target);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }, 300);
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
    
    console.log('🍔 Menú configurado');
}

function openMenu() {
    isMenuOpen = true;
    if (menuButton) menuButton.classList.add('active');
    if (mobileMenu) mobileMenu.classList.add('active');
    document.body.classList.add('menu-open');
}

function closeMenu() {
    isMenuOpen = false;
    if (menuButton) menuButton.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
}

function toggleMenu() {
    isMenuOpen ? closeMenu() : openMenu();
}

// ===== FUNCIÓN: CONFIGURAR SCROLL EVENTS =====
function setupScrollEvents() {
    let isScrolling = false;
    
    function handleScroll() {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updateFloatingPosition();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    
    // Verificación inicial
    setTimeout(updateFloatingPosition, 100);
    
    console.log('📜 Scroll events configurados');
}

// ===== FUNCIÓN: MONITOREAR BOTÓN =====
function monitorButton() {
    setInterval(() => {
        if (window.innerWidth <= 768) {
            if (!document.getElementById('ultra-floating-btn')) {
                console.log('⚠️ Botón perdido, recreando...');
                createAntiConflictButton();
            }
        }
    }, 3000);
}

// ===== FUNCIÓN: INICIALIZACIÓN PRINCIPAL =====
function initAntiConflictSolution() {
    console.log('🚀 Iniciando solución anti-conflictos...');
    
    try {
        // 1. CSS anti-conflictos
        applyAntiConflictCSS();
        
        // 2. Configurar menú
        setupMenu();
        
        // 3. Crear botón flotante
        createAntiConflictButton();
        
        // 4. Configurar scroll
        setupScrollEvents();
        
        // 5. Monitorear
        monitorButton();
        
        console.log('✅ Solución anti-conflictos inicializada');
        
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

// ===== INICIALIZACIÓN =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAntiConflictSolution);
} else {
    initAntiConflictSolution();
}

window.addEventListener('load', () => {
    setTimeout(() => {
        if (!document.getElementById('ultra-floating-btn') && window.innerWidth <= 768) {
            createAntiConflictButton();
        }
    }, 500);
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const btn = document.getElementById('ultra-floating-btn');
        if (btn) btn.remove();
        if (isMenuOpen) closeMenu();
    } else {
        if (!document.getElementById('ultra-floating-btn')) {
            createAntiConflictButton();
        }
    }
});

// ===== EXPORTAR =====
window.antiConflictSolution = {
    reinit: initAntiConflictSolution,
    button: () => document.getElementById('ultra-floating-btn')
};

console.log('✅ Solución anti-conflictos cargada');
console.log('🛡️ CSS ultra específico aplicado');
console.log('🔴 Botón flotante: Position absolute que sigue el scroll');
console.log('📍 Se mueve contigo mientras navegas');
console.log('🔧 Debug: antiConflictSolution.reinit()');
