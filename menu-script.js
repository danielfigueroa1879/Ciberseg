// ===== SOLUCIÓN COMPLETA PARA MENÚ HAMBURGUESA =====

console.log('🔧 Iniciando corrección del menú hamburguesa...');

// Variables globales
let isMenuOpen = false;
let menuButton = null;
let mobileMenu = null;
let navLinks = [];

// ===== FUNCIÓN 1: INICIALIZAR ELEMENTOS =====
function initializeMenuElements() {
    menuButton = document.getElementById('mobile-menu');
    mobileMenu = document.getElementById('nav-menu');
    navLinks = document.querySelectorAll('.nav-link');
    
    console.log('📋 Elementos encontrados:', {
        menuButton: !!menuButton,
        mobileMenu: !!mobileMenu,
        navLinks: navLinks.length
    });
    
    if (!menuButton || !mobileMenu) {
        console.error('❌ No se encontraron elementos esenciales del menú');
        return false;
    }
    
    return true;
}

// ===== FUNCIÓN 2: ABRIR MENÚ =====
function openMenu() {
    console.log('📂 Abriendo menú...');
    
    isMenuOpen = true;
    
    // Activar clases
    menuButton.classList.add('active');
    mobileMenu.classList.add('active');
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.pageYOffset}px`;
    document.body.style.width = '100%';
    
    // Asegurar visibilidad
    mobileMenu.style.opacity = '1';
    mobileMenu.style.visibility = 'visible';
    mobileMenu.style.transform = 'translateY(0)';
    
    console.log('✅ Menú abierto');
}

// ===== FUNCIÓN 3: CERRAR MENÚ =====
function closeMenu() {
    console.log('📁 Cerrando menú...');
    
    isMenuOpen = false;
    
    // Remover clases
    menuButton.classList.remove('active');
    mobileMenu.classList.remove('active');
    
    // Restaurar scroll del body
    const scrollY = document.body.style.top;
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    
    // Ocultar menú
    mobileMenu.style.opacity = '0';
    mobileMenu.style.visibility = 'hidden';
    mobileMenu.style.transform = 'translateY(-20px)';
    
    console.log('✅ Menú cerrado');
}

// ===== FUNCIÓN 4: TOGGLE MENÚ =====
function toggleMenu() {
    console.log('🔄 Toggle menú, estado actual:', isMenuOpen ? 'abierto' : 'cerrado');
    
    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

// ===== FUNCIÓN 5: DETECTAR MÓVIL =====
function isMobile() {
    return window.innerWidth <= 768;
}

// ===== FUNCIÓN 6: CONFIGURAR EVENT LISTENERS =====
function setupEventListeners() {
    
    // 1. Click en botón hamburguesa
    if (menuButton) {
        // Remover listeners previos
        const newMenuButton = menuButton.cloneNode(true);
        menuButton.parentNode.replaceChild(newMenuButton, menuButton);
        menuButton = newMenuButton;
        
        menuButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🖱️ Click en botón hamburguesa');
            toggleMenu();
        });
        
        menuButton.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('👆 Touch en botón hamburguesa');
            toggleMenu();
        });
    }
    
    // 2. Click en enlaces del menú
    navLinks.forEach((link, index) => {
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        navLinks[index] = newLink;
        
        newLink.addEventListener('click', function(e) {
            console.log('🔗 Click en enlace del menú');
            if (isMobile() && isMenuOpen) {
                setTimeout(() => {
                    closeMenu();
                }, 100);
            }
        });
    });
    
    // 3. Click fuera del menú
    document.addEventListener('click', function(e) {
        if (isMenuOpen && 
            !menuButton.contains(e.target) && 
            !mobileMenu.contains(e.target)) {
            console.log('🖱️ Click fuera del menú');
            closeMenu();
        }
    });
    
    // 4. Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            console.log('⌨️ Escape presionado');
            closeMenu();
        }
    });
    
    // 5. Resize window
    window.addEventListener('resize', function() {
        if (!isMobile() && isMenuOpen) {
            console.log('📱➡️💻 Cambio a desktop, cerrando menú');
            closeMenu();
        }
    });
    
    console.log('✅ Event listeners configurados');
}

// ===== FUNCIÓN 7: APLICAR ESTILOS CSS CRÍTICOS =====
function applyCriticalStyles() {
    
    // Crear elemento de estilo
    const style = document.createElement('style');
    style.id = 'hamburger-menu-fix';
    
    style.innerHTML = `
        /* ===== ESTILOS CRÍTICOS PARA MENÚ HAMBURGUESA ===== */
        
        @media screen and (max-width: 768px) {
            
            /* Botón hamburguesa base */
            .nav-toggle {
                display: flex !important;
                flex-direction: column !important;
                justify-content: center !important;
                align-items: center !important;
                cursor: pointer !important;
                padding: 8px !important;
                background-color: #000 !important;
                border: 2px solid rgba(255, 255, 255, 0.3) !important;
                border-radius: 10px !important;
                transition: all 0.3s ease !important;
                position: relative !important;
                z-index: 1001 !important;
                min-height: 40px !important;
                min-width: 40px !important;
                touch-action: manipulation !important;
                -webkit-tap-highlight-color: transparent !important;
            }
            
            .nav-toggle:hover {
                background-color: rgba(0, 0, 0, 0.8) !important;
                border-color: rgba(255, 255, 255, 0.5) !important;
            }
            
            .nav-toggle:active {
                transform: scale(0.95) !important;
            }
            
            /* Barras del hamburguesa */
            .bar {
                width: 22px !important;
                height: 2px !important;
                background-color: #fff !important;
                margin: 3px 0 !important;
                transition: all 0.4s ease !important;
                border-radius: 2px !important;
                display: block !important;
                transform-origin: center !important;
            }
            
            /* Estado activo del botón */
            .nav-toggle.active .bar:nth-child(1) {
                transform: translateY(5px) rotate(45deg) !important;
            }
            
            .nav-toggle.active .bar:nth-child(2) {
                opacity: 0 !important;
                transform: translateX(15px) !important;
            }
            
            .nav-toggle.active .bar:nth-child(3) {
                transform: translateY(-5px) rotate(-45deg) !important;
            }
            
            /* Menú móvil base */
            .nav-menu {
                position: fixed !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                height: 50vh !important;
                background: rgba(0, 0, 0, 0.95) !important;
                backdrop-filter: blur(20px) !important;
                -webkit-backdrop-filter: blur(20px) !important;
                flex-direction: column !important;
                text-align: center !important;
                padding: 120px 0 20px 0 !important;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3) !important;
                border-bottom-left-radius: 40px !important;
                border-bottom-right-radius: 40px !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                z-index: 1000 !important;
                
                /* Estado oculto por defecto */
                opacity: 0 !important;
                visibility: hidden !important;
                transform: translateY(-100%) !important;
                transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
                
                /* Flex para centrar contenido */
                display: flex !important;
                justify-content: flex-start !important;
                align-items: center !important;
                overflow-y: auto !important;
            }
            
            /* Estado activo del menú */
            .nav-menu.active {
                opacity: 1 !important;
                visibility: visible !important;
                transform: translateY(0) !important;
            }
            
            /* Items del menú */
            .nav-menu li {
                margin: 10px 0 !important;
                position: relative !important;
                padding-bottom: 10px !important;
                width: 100% !important;
                list-style: none !important;
            }
            
            .nav-menu li::after {
                content: '' !important;
                position: absolute !important;
                bottom: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 1px !important;
                background: rgba(255, 255, 255, 0.2) !important;
            }
            
            .nav-menu li:last-child::after {
                display: none !important;
            }
            
            /* Enlaces del menú */
            .nav-link {
                font-size: 18px !important;
                color: #fff !important;
                padding: 10px 20px !important;
                display: block !important;
                width: 100% !important;
                border-radius: 8px !important;
                transition: all 0.3s ease !important;
                text-decoration: none !important;
                font-weight: 500 !important;
            }
            
            .nav-link:hover {
                background-color: rgba(224, 253, 44, 0.1) !important;
                color: #E0FD2C !important;
            }
            
            /* Prevenir scroll cuando menú abierto */
            body:has(.nav-menu.active) {
                overflow: hidden !important;
            }
            
            /* Navegación container ajustes */
            .nav-container {
                flex-direction: row !important;
                justify-content: space-between !important;
                align-items: center !important;
                padding: 0 20px !important;
            }
            
            .nav-logo {
                order: 1 !important;
                flex: 1 !important;
                text-align: center !important;
            }
            
            .nav-toggle {
                order: 2 !important;
                margin-left: auto !important;
                flex-shrink: 0 !important;
            }
            
            /* Ocultar búsqueda en móviles */
            .search-container {
                display: none !important;
            }
        }
        
        /* Desktop - ocultar botón hamburguesa */
        @media screen and (min-width: 769px) {
            .nav-toggle {
                display: none !important;
            }
            
            .nav-menu {
                position: static !important;
                width: auto !important;
                height: auto !important;
                background: transparent !important;
                backdrop-filter: none !important;
                flex-direction: row !important;
                padding: 0 !important;
                box-shadow: none !important;
                border-radius: 0 !important;
                border: none !important;
                opacity: 1 !important;
                visibility: visible !important;
                transform: none !important;
                transition: none !important;
            }
            
            .nav-menu li {
                margin: 0 !important;
                padding: 0 !important;
                width: auto !important;
            }
            
            .nav-menu li::after {
                display: none !important;
            }
            
            .nav-link {
                font-size: 18px !important;
                padding: 0 !important;
                margin: 0 15px !important;
                width: auto !important;
                border-radius: 0 !important;
            }
        }
    `;
    
    // Remover estilo previo si existe
    const existingStyle = document.getElementById('hamburger-menu-fix');
    if (existingStyle) {
        existingStyle.remove();
    }
    
    // Agregar nuevo estilo
    document.head.appendChild(style);
    
    console.log('🎨 Estilos críticos aplicados');
}

// ===== FUNCIÓN 8: INICIALIZACIÓN PRINCIPAL =====
function initHamburgerMenu() {
    console.log('🚀 Iniciando corrección del menú hamburguesa...');
    
    // 1. Aplicar estilos críticos
    applyCriticalStyles();
    
    // 2. Esperar un poco para que el DOM se estabilice
    setTimeout(() => {
        
        // 3. Inicializar elementos
        if (!initializeMenuElements()) {
            console.error('❌ No se pudieron inicializar los elementos del menú');
            return;
        }
        
        // 4. Asegurar estado inicial cerrado
        closeMenu();
        
        // 5. Configurar event listeners
        setupEventListeners();
        
        console.log('✅ Menú hamburguesa configurado correctamente');
        
    }, 200);
}

// ===== FUNCIÓN 9: AUTO-INICIALIZACIÓN =====
function autoInit() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHamburgerMenu);
    } else {
        initHamburgerMenu();
    }
}

// ===== FUNCIÓN 10: DEBUGGING =====
function debugMenu() {
    console.log('🔍 Debug del menú:', {
        isMenuOpen,
        menuButton: !!menuButton,
        mobileMenu: !!mobileMenu,
        navLinksCount: navLinks.length,
        isMobileView: isMobile(),
        menuHasActiveClass: mobileMenu?.classList.contains('active'),
        buttonHasActiveClass: menuButton?.classList.contains('active')
    });
}

// ===== INICIALIZACIÓN AUTOMÁTICA =====
autoInit();

// ===== EXPORTAR PARA DEBUGGING =====
window.hamburgerMenu = {
    toggle: toggleMenu,
    open: openMenu,
    close: closeMenu,
    debug: debugMenu,
    isOpen: () => isMenuOpen,
    reinit: initHamburgerMenu
};

console.log('📱 Corrección del menú hamburguesa cargada');
console.log('💡 Usa hamburgerMenu.debug() para debuggear');
console.log('💡 Usa hamburgerMenu.reinit() para reinicializar');
