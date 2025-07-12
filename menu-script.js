// ===== SOLUCIÓN COMPLETA: MENÚ HAMBURGUESA + BOTÓN FLOTANTE =====

console.log('🔧 Iniciando solución completa...');

// ===== CSS COMPLETO PARA TODO =====
const completeSolutionCSS = `
/* ===== MENÚ HAMBURGUESA + BOTÓN FLOTANTE ===== */

/* OCULTAR BOTONES CONFLICTIVOS EXISTENTES */
.scroll-to-top:not(#real-floating-back-btn),
#scrollToTop:not(#real-floating-back-btn) {
    display: none !important;
}

@media screen and (max-width: 768px) {
    
    /* === MENÚ HAMBURGUESA === */
    
    /* Header configuración */
    .header {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        z-index: 1500 !important;
        background-color: rgba(40, 40, 40, 0.98) !important;
        backdrop-filter: blur(10px) !important;
        height: auto !important;
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
        height: 100% !important;
    }
    
    /* Logo centrado */
    .nav-logo {
        order: 1 !important;
        flex: 1 !important;
        text-align: center !important;
        z-index: 1501 !important;
    }
    
    .nav-logo h2 {
        color: #c1d72b !important;
        font-size: 24px !important;
        font-weight: 700 !important;
        margin: 0 !important;
    }
    
    /* Botón hamburguesa */
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
        flex-shrink: 0 !important;
        touch-action: manipulation !important;
        -webkit-tap-highlight-color: transparent !important;
    }
    
    /* Barras del hamburguesa */
    .bar {
        width: 24px !important;
        height: 3px !important;
        background-color: #fff !important;
        margin: 3px 0 !important;
        transition: all 0.4s ease !important;
        border-radius: 2px !important;
        display: block !important;
        transform-origin: center !important;
        position: relative !important;
    }
    
    /* Animación X */
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
    
    /* Menú móvil */
    .nav-menu {
        position: fixed !important;
        left: 0 !important;
        top: 80px !important;
        width: 100% !important;
        background: linear-gradient(135deg, rgba(45, 45, 45, 0.95), rgba(60, 60, 60, 0.92)) !important;
        backdrop-filter: blur(15px) !important;
        -webkit-backdrop-filter: blur(15px) !important;
        
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: flex-start !important;
        
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
    
    /* Items del menú */
    .nav-menu li {
        width: 100% !important;
        max-width: 350px !important;
        margin: 0 !important;
        list-style: none !important;
        padding: 0 !important;
        display: block !important;
    }
    
    /* Enlaces del menú sin botones */
    .nav-link {
        display: block !important;
        width: 100% !important;
        padding: 20px 25px !important;
        font-size: 22px !important;
        font-weight: 600 !important;
        color: #fff !important;
        text-decoration: none !important;
        text-align: center !important;
        border-radius: 0 !important;
        transition: all 0.25s ease !important;
        background: transparent !important;
        border: none !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
        margin: 0 !important;
        box-sizing: border-box !important;
        letter-spacing: 1px !important;
        text-transform: uppercase !important;
    }
    
    .nav-link:hover,
    .nav-link:active {
        background: rgba(224, 253, 44, 0.1) !important;
        color: #E0FD2C !important;
        transform: translateX(5px) !important;
        border-bottom-color: #E0FD2C !important;
        text-shadow: 0 0 10px rgba(224, 253, 44, 0.5) !important;
    }
    
    .nav-menu li:last-child .nav-link {
        border-bottom: none !important;
    }
    
    /* Ocultar elementos no necesarios - EXCEPTO CONTADOR DE VISITAS */
    .search-container {
        display: none !important;
    }
    
    /* MANTENER CONTADOR DE VISITAS VISIBLE */
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
        text-shadow: 1px 1px 3px rgba(0,0,0,0.5) !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        position: absolute !important;
        top: 24px !important;
        left: 20px !important;
        z-index: 1001 !important;
    }
    
    .visitor-counter-container:hover {
        background-color: rgba(224, 253, 44, 0.2) !important;
        transform: scale(1.05) !important;
    }
    
    .visitor-counter-container .fa-eye {
        font-size: 18px !important;
    }
    
    /* === BOTÓN FLOTANTE === */
    
    #real-floating-back-btn {
        position: fixed !important;
        top: 50vh !important;
        right: 15px !important;
        transform: translateY(-50%) !important;
        
        width: 60px !important;
        height: 60px !important;
        border-radius: 50% !important;
        border: 2px solid rgba(255, 255, 255, 0.3) !important;
        outline: none !important;
        
        background: linear-gradient(135deg, #E0FD2C 0%, #C7E525 100%) !important;
        
        box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.6),
            0 5px 20px rgba(224, 253, 44, 0.8),
            0 3px 12px rgba(0, 0, 0, 0.4) !important;
        
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        
        z-index: 999999 !important;
        
        cursor: pointer !important;
        touch-action: manipulation !important;
        -webkit-tap-highlight-color: transparent !important;
        user-select: none !important;
        
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        
        /* Estado inicial oculto */
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        transform: translateY(-50%) translateX(30px) scale(0.8) !important;
    }
    
    /* Estado visible del botón flotante */
    #real-floating-back-btn.floating-visible {
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto !important;
        transform: translateY(-50%) translateX(0) scale(1) !important;
    }
    
    /* Hover del botón flotante */
    #real-floating-back-btn:hover {
        background: linear-gradient(135deg, #C7E525 0%, #B8D61F 100%) !important;
        transform: translateY(-50%) translateX(-8px) scale(1.15) !important;
        box-shadow: 
            0 15px 40px rgba(0, 0, 0, 0.7),
            0 8px 25px rgba(224, 253, 44, 0.9),
            0 4px 15px rgba(0, 0, 0, 0.5) !important;
    }
    
    /* Active del botón flotante */
    #real-floating-back-btn:active {
        transform: translateY(-50%) translateX(-5px) scale(1.1) !important;
        transition: all 0.1s ease !important;
    }
    
    /* Flecha del botón flotante */
    #real-floating-back-btn::before {
        content: '' !important;
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) rotate(-45deg) !important;
        
        width: 14px !important;
        height: 14px !important;
        border-top: 3px solid #000 !important;
        border-right: 3px solid #000 !important;
        border-left: none !important;
        border-bottom: none !important;
        
        background: transparent !important;
        margin: 0 !important;
        padding: 0 !important;
        pointer-events: none !important;
    }
    
    /* Prevenir scroll cuando menú abierto */
    body.menu-open {
        overflow: hidden !important;
    }
}

/* MÓVILES PEQUEÑOS */
@media screen and (max-width: 480px) {
    .nav-toggle {
        min-height: 40px !important;
        min-width: 40px !important;
        padding: 6px !important;
    }
    
    .nav-logo {
        padding-left: 80px !important; /* Espacio para contador de visitas */
    }
    
    .nav-logo h2 {
        font-size: 22px !important;
    }
    
    .nav-link {
        font-size: 18px !important;
        padding: 15px 20px !important;
    }
    
    #real-floating-back-btn {
        width: 55px !important;
        height: 55px !important;
        right: 12px !important;
    }
    
    #real-floating-back-btn::before {
        width: 12px !important;
        height: 12px !important;
        border-top: 2.5px solid #000 !important;
        border-right: 2.5px solid #000 !important;
    }
    
    /* Contador de visitas en móviles pequeños */
    .visitor-counter-container {
        font-size: 12px !important;
        padding: 6px 10px !important;
        top: 24px !important;
        left: 15px !important;
    }
    
    .visitor-counter-container .fa-eye {
        font-size: 14px !important;
    }
}

/* DESKTOP - OCULTAR BOTÓN FLOTANTE */
@media screen and (min-width: 769px) {
    #real-floating-back-btn {
        display: none !important;
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
        max-width: none !important;
    }
    
    .nav-link {
        font-size: 18px !important;
        padding: 0 !important;
        width: auto !important;
        border-radius: 0 !important;
        background: transparent !important;
        border: none !important;
        text-transform: none !important;
        letter-spacing: normal !important;
    }
}
`;

// ===== VARIABLES GLOBALES =====
let isMenuOpen = false;
let menuButton, mobileMenu;

// ===== FUNCIÓN: APLICAR CSS COMPLETO =====
function applyCompleteSolutionCSS() {
    // Remover estilos previos
    const existingStyles = [
        'real-floating-button-css',
        'floating-button-styles',
        'mobile-menu-fix',
        'complete-fix-styles'
    ];
    
    existingStyles.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.remove();
    });
    
    // Aplicar CSS completo
    const style = document.createElement('style');
    style.id = 'complete-solution-css';
    style.innerHTML = completeSolutionCSS;
    document.head.appendChild(style);
    
    console.log('🎨 CSS completo aplicado');
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
    
    // Crear enlaces del menú
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
        
        a.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Cerrar menú
            closeMenu();
            
            // Navegar a sección
            setTimeout(() => {
                const target = document.querySelector(item.target);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 300);
        });
        
        li.appendChild(a);
        mobileMenu.appendChild(li);
    });
    
    // Event listener del botón hamburguesa
    menuButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (isMenuOpen && 
            !menuButton.contains(e.target) && 
            !mobileMenu.contains(e.target)) {
            closeMenu();
        }
    });
    
    console.log('🍔 Menú hamburguesa configurado');
}

// ===== FUNCIONES DEL MENÚ =====
function openMenu() {
    isMenuOpen = true;
    menuButton.classList.add('active');
    mobileMenu.classList.add('active');
    document.body.classList.add('menu-open');
    console.log('📂 Menú abierto');
}

function closeMenu() {
    isMenuOpen = false;
    if (menuButton) menuButton.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
    console.log('📁 Menú cerrado');
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
    if (window.innerWidth > 768) return;
    
    // Remover botones existentes
    const existingButtons = document.querySelectorAll(
        '#real-floating-back-btn, .scroll-to-top, #scrollToTop'
    );
    existingButtons.forEach(btn => btn.remove());
    
    // Crear botón
    const button = document.createElement('button');
    button.id = 'real-floating-back-btn';
    button.setAttribute('aria-label', 'Ir al inicio');
    
    // Event listeners
    button.addEventListener('click', handleFloatingClick);
    button.addEventListener('touchstart', handleFloatingClick);
    
    document.body.appendChild(button);
    
    console.log('🔴 Botón flotante creado');
    return button;
}

// ===== FUNCIÓN: MANEJAR CLICK DEL BOTÓN FLOTANTE =====
function handleFloatingClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🔼 Scroll al inicio');
    
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

// ===== FUNCIÓN: MANEJAR SCROLL - CORREGIDA =====
function handleScroll() {
    if (window.innerWidth > 768) return;
    
    const button = document.getElementById('real-floating-back-btn');
    if (!button) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const threshold = 200;
    
    // LÓGICA CORREGIDA: Mostrar cuando BAJAS (scrollTop > threshold)
    if (scrollTop > threshold) {
        // HAY SCROLL HACIA ABAJO - MOSTRAR BOTÓN
        if (!button.classList.contains('floating-visible')) {
            button.classList.add('floating-visible');
            console.log('👁️ Botón flotante mostrado (bajando por la página)');
        }
    } else {
        // CERCA DEL TOP - OCULTAR BOTÓN
        if (button.classList.contains('floating-visible')) {
            button.classList.remove('floating-visible');
            console.log('🙈 Botón flotante ocultado (cerca del inicio)');
        }
    }
}

// ===== FUNCIÓN: CONFIGURAR EVENTOS DE SCROLL =====
function setupScrollEvents() {
    let isScrolling = false;
    
    function throttledScroll() {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                handleScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    setTimeout(handleScroll, 100);
    
    console.log('📜 Eventos de scroll configurados');
}

// ===== FUNCIÓN: INICIALIZACIÓN PRINCIPAL =====
function initCompleteSolution() {
    console.log('🚀 Iniciando solución completa...');
    
    try {
        // 1. Aplicar CSS
        applyCompleteSolutionCSS();
        
        // 2. Configurar menú hamburguesa
        setupHamburgerMenu();
        
        // 3. Crear botón flotante
        createFloatingButton();
        
        // 4. Configurar scroll
        setupScrollEvents();
        
        console.log('✅ Solución completa inicializada');
        
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

// ===== INICIALIZACIÓN AUTOMÁTICA =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCompleteSolution);
} else {
    initCompleteSolution();
}

// Backup
window.addEventListener('load', () => {
    setTimeout(() => {
        if (!document.getElementById('real-floating-back-btn') && window.innerWidth <= 768) {
            createFloatingButton();
        }
    }, 500);
});

// Resize handler
window.addEventListener('resize', () => {
    const button = document.getElementById('real-floating-back-btn');
    
    if (window.innerWidth > 768) {
        if (button) button.remove();
        if (isMenuOpen) closeMenu();
    } else {
        if (!button) createFloatingButton();
    }
});

// ===== EXPORTAR =====
window.completeSolution = {
    reinit: initCompleteSolution,
    toggleMenu: toggleMenu,
    button: () => document.getElementById('real-floating-back-btn')
};

console.log('✅ Solución completa cargada');
console.log('🍔 Menú hamburguesa: 4 enlaces funcionando');
console.log('🔴 Botón flotante: Aparece al BAJAR por la página');
console.log('👁️ Contador de visitas: Visible en esquina superior izquierda');
console.log('💻 Desktop: Navegación normal');
console.log('🔧 Debug: completeSolution.reinit()');
