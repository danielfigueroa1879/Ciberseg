// ===== MENÚ HAMBURGUESA RÁPIDO Y COMPLETO =====

console.log('⚡ Iniciando menú hamburguesa optimizado...');

// Variables globales optimizadas
let isMenuOpen = false;
let menuButton, mobileMenu, navLinks;

// ===== FUNCIÓN 1: ESTILOS CRÍTICOS INMEDIATOS =====
const criticalCSS = `
/* ===== MENÚ HAMBURGUESA OPTIMIZADO ===== */

@media screen and (max-width: 768px) {
    
    /* Botón hamburguesa mejorado */
    .nav-toggle {
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        align-items: center !important;
        cursor: pointer !important;
        padding: 6px !important;
        background-color: #000 !important;
        border: 2px solid rgba(255, 255, 255, 0.3) !important;
        border-radius: 8px !important;
        transition: all 0.2s ease !important;
        position: relative !important;
        z-index: 1002 !important;
        min-height: 36px !important;
        min-width: 36px !important;
        touch-action: manipulation !important;
        -webkit-tap-highlight-color: transparent !important;
    }
    
    .nav-toggle:active {
        transform: scale(0.95) !important;
        background-color: rgba(0, 0, 0, 0.9) !important;
    }
    
    /* Barras del hamburguesa */
    .bar {
        width: 18px !important;
        height: 2px !important;
        background-color: #fff !important;
        margin: 2px 0 !important;
        transition: all 0.25s ease !important;
        border-radius: 1px !important;
        display: block !important;
    }
    
    /* Animación X */
    .nav-toggle.active .bar:nth-child(1) {
        transform: translateY(4px) rotate(45deg) !important;
    }
    
    .nav-toggle.active .bar:nth-child(2) {
        opacity: 0 !important;
    }
    
    .nav-toggle.active .bar:nth-child(3) {
        transform: translateY(-4px) rotate(-45deg) !important;
    }
    
    /* MENÚ DEBAJO DEL HEADER - NO ENCIMA */
    .nav-menu {
        position: fixed !important;
        left: 0 !important;
        top: 90px !important; /* DEBAJO del header */
        width: 100% !important;
        background: rgba(0, 0, 0, 0.98) !important;
        backdrop-filter: blur(20px) !important;
        -webkit-backdrop-filter: blur(20px) !important;
        flex-direction: column !important;
        text-align: center !important;
        padding: 20px 0 !important;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4) !important;
        border-bottom-left-radius: 20px !important;
        border-bottom-right-radius: 20px !important;
        border: 1px solid rgba(224, 253, 44, 0.2) !important;
        z-index: 999 !important; /* MENOR que el header */
        
        /* Estado oculto - RÁPIDO */
        opacity: 0 !important;
        visibility: hidden !important;
        transform: translateY(-20px) !important;
        transition: all 0.2s ease !important; /* MÁS RÁPIDO */
        max-height: 0 !important;
        overflow: hidden !important;
        
        /* Flex para contenido */
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
    }
    
    /* Estado activo - RÁPIDO */
    .nav-menu.active {
        opacity: 1 !important;
        visibility: visible !important;
        transform: translateY(0) !important;
        max-height: 400px !important; /* Altura suficiente para 5 enlaces */
    }
    
    /* Items del menú */
    .nav-menu li {
        margin: 8px 0 !important;
        width: 100% !important;
        list-style: none !important;
        padding: 0 !important;
    }
    
    /* Enlaces optimizados */
    .nav-link {
        font-size: 18px !important;
        color: #fff !important;
        padding: 12px 20px !important;
        display: block !important;
        width: 100% !important;
        border-radius: 8px !important;
        transition: all 0.15s ease !important; /* RÁPIDO */
        text-decoration: none !important;
        font-weight: 500 !important;
        margin: 0 !important;
    }
    
    .nav-link:hover {
        background-color: rgba(224, 253, 44, 0.15) !important;
        color: #E0FD2C !important;
        transform: translateX(3px) !important;
    }
    
    /* Header debe permanecer encima */
    .header {
        z-index: 1001 !important; /* MAYOR que el menú */
        position: fixed !important;
        top: 0 !important;
    }
    
    /* Navegación container */
    .nav-container {
        flex-direction: row !important;
        justify-content: space-between !important;
        align-items: center !important;
        padding: 0 15px !important;
    }
    
    .nav-logo {
        order: 1 !important;
        flex: 1 !important;
        text-align: center !important;
    }
    
    .nav-toggle {
        order: 2 !important;
        margin-left: auto !important;
    }
    
    /* Ocultar búsqueda */
    .search-container {
        display: none !important;
    }
    
    /* Prevenir scroll cuando menú abierto */
    body.menu-open {
        overflow: hidden !important;
    }
}

/* Desktop - menú normal */
@media screen and (min-width: 769px) {
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
        z-index: auto !important;
        top: auto !important;
    }
    
    .nav-menu li {
        margin: 0 15px !important;
        width: auto !important;
    }
    
    .nav-link {
        font-size: 18px !important;
        padding: 0 !important;
        width: auto !important;
        border-radius: 0 !important;
        margin: 0 !important;
    }
}
`;

// ===== FUNCIÓN 2: APLICAR CSS INMEDIATAMENTE =====
function applyFastCSS() {
    const style = document.createElement('style');
    style.id = 'fast-hamburger-menu';
    style.innerHTML = criticalCSS;
    
    // Remover estilo previo
    const existing = document.getElementById('fast-hamburger-menu');
    if (existing) existing.remove();
    
    document.head.appendChild(style);
}

// ===== FUNCIÓN 3: CREAR ENLACES COMPLETOS =====
function createCompleteMenu() {
    const menuContainer = document.getElementById('nav-menu');
    if (!menuContainer) return;
    
    // CREAR LOS 5 ENLACES REQUERIDOS
    const menuItems = [
        { text: 'Inicio', href: '#inicio' },
        { text: 'Servicios', href: '#servicios' },
        { text: 'Misión', href: '#mision' }, // NUEVO
        { text: 'Contacto', href: '#contacto' },
        { text: 'Suscripción', href: '#suscripcion' } // NUEVO
    ];
    
    // Limpiar menú actual
    menuContainer.innerHTML = '';
    
    // Crear enlaces completos
    menuItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        
        const a = document.createElement('a');
        a.href = item.href;
        a.className = 'nav-link';
        a.textContent = item.text;
        
        // Event listener para cerrar menú al hacer click
        a.addEventListener('click', () => {
            setTimeout(closeMenu, 100);
        });
        
        li.appendChild(a);
        menuContainer.appendChild(li);
    });
    
    console.log('✅ Menú completo creado con 5 enlaces');
}

// ===== FUNCIÓN 4: ABRIR MENÚ RÁPIDO =====
function openMenu() {
    isMenuOpen = true;
    
    // Clases activas
    menuButton.classList.add('active');
    mobileMenu.classList.add('active');
    
    // Prevenir scroll
    document.body.classList.add('menu-open');
    
    console.log('📂 Menú abierto');
}

// ===== FUNCIÓN 5: CERRAR MENÚ RÁPIDO =====
function closeMenu() {
    isMenuOpen = false;
    
    // Remover clases
    if (menuButton) menuButton.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('active');
    
    // Restaurar scroll
    document.body.classList.remove('menu-open');
    
    console.log('📁 Menú cerrado');
}

// ===== FUNCIÓN 6: TOGGLE RÁPIDO =====
function toggleMenu(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

// ===== FUNCIÓN 7: SETUP RÁPIDO =====
function fastSetup() {
    // Obtener elementos
    menuButton = document.getElementById('mobile-menu');
    mobileMenu = document.getElementById('nav-menu');
    
    if (!menuButton || !mobileMenu) {
        console.error('❌ Elementos del menú no encontrados');
        return;
    }
    
    // Crear menú completo
    createCompleteMenu();
    
    // Event listeners optimizados
    menuButton.addEventListener('click', toggleMenu);
    menuButton.addEventListener('touchstart', toggleMenu);
    
    // Click fuera del menú
    document.addEventListener('click', (e) => {
        if (isMenuOpen && 
            !menuButton.contains(e.target) && 
            !mobileMenu.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });
    
    // Resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isMenuOpen) {
            closeMenu();
        }
    });
    
    // Estado inicial cerrado
    closeMenu();
    
    console.log('⚡ Setup rápido completado');
}

// ===== FUNCIÓN 8: INICIALIZACIÓN INMEDIATA =====
function initFastMenu() {
    // 1. Aplicar CSS inmediatamente
    applyFastCSS();
    
    // 2. Setup rápido
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fastSetup);
    } else {
        fastSetup();
    }
}

// ===== ACTUALIZAR HTML DINÁMICAMENTE =====
function updateMenuHTML() {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        // Asegurar estructura correcta
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
    }
    
    // Asegurar que el menú tenga la sección de misión
    const missionSection = document.querySelector('#mision');
    if (!missionSection) {
        // Buscar mission-vision section y agregar id
        const mvSection = document.querySelector('.mission-vision');
        if (mvSection) {
            mvSection.id = 'mision';
        }
    }
    
    // Crear sección de suscripción si no existe
    let subscriptionSection = document.querySelector('#suscripcion');
    if (!subscriptionSection) {
        subscriptionSection = document.querySelector('#contacto');
        if (subscriptionSection) {
            // Usar la misma sección de contacto para suscripción
            const clone = subscriptionSection.cloneNode(false);
            clone.id = 'suscripcion';
            subscriptionSection.parentNode.insertBefore(clone, subscriptionSection);
        }
    }
}

// ===== INICIALIZACIÓN AUTOMÁTICA =====
initFastMenu();
updateMenuHTML();

// ===== EXPORTAR FUNCIONES =====
window.fastMenu = {
    toggle: toggleMenu,
    open: openMenu,
    close: closeMenu,
    isOpen: () => isMenuOpen,
    recreate: createCompleteMenu
};

console.log('🚀 Menú hamburguesa rápido cargado');
console.log('📱 Aparece DEBAJO del header');
console.log('📋 Incluye: Inicio, Servicios, Misión, Contacto, Suscripción');
