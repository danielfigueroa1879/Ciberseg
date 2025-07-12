// ===== MENÚ HAMBURGUESA - ARREGLO MÓVIL COMPLETO =====

console.log('📱 Iniciando corrección específica para móvil...');

// Variables globales
let isMenuOpen = false;
let menuButton, mobileMenu;

// ===== CSS CORREGIDO PARA MÓVIL =====
const mobileCorrectedCSS = `
/* ===== CORRECCIÓN ESPECÍFICA MÓVIL ===== */

@media screen and (max-width: 768px) {
    
    /* HEADER: Asegurar que esté arriba y visible */
    .header {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        z-index: 1500 !important; /* MUY ALTO para estar encima */
        background-color: rgba(40, 40, 40, 0.98) !important;
        backdrop-filter: blur(10px) !important;
        height: auto !important;
        min-height: 80px !important;
    }
    
    /* NAVBAR: Layout correcto */
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
    
    /* LOGO: Centrado y visible */
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
    
    /* BOTÓN HAMBURGUESA: Visible y funcional */
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
        transition: all 0.2s ease !important;
        position: relative !important;
        z-index: 1502 !important; /* MÁS ALTO que todo */
        min-height: 40px !important;
        min-width: 40px !important;
        margin-left: auto !important;
        flex-shrink: 0 !important;
        touch-action: manipulation !important;
        -webkit-tap-highlight-color: transparent !important;
    }
    
    .nav-toggle:active {
        transform: scale(0.9) !important;
        background-color: rgba(0, 0, 0, 0.9) !important;
    }
    
    /* BARRAS HAMBURGUESA */
    .bar {
        width: 20px !important;
        height: 2px !important;
        background-color: #fff !important;
        margin: 2.5px 0 !important;
        transition: all 0.25s ease !important;
        border-radius: 1px !important;
        display: block !important;
    }
    
    /* ANIMACIÓN X */
    .nav-toggle.active .bar:nth-child(1) {
        transform: translateY(4.5px) rotate(45deg) !important;
    }
    
    .nav-toggle.active .bar:nth-child(2) {
        opacity: 0 !important;
        transform: translateX(10px) !important;
    }
    
    .nav-toggle.active .bar:nth-child(3) {
        transform: translateY(-4.5px) rotate(-45deg) !important;
    }
    
    /* MENÚ MÓVIL: DEBAJO del header */
    .nav-menu {
        position: fixed !important;
        left: 0 !important;
        top: 80px !important; /* EXACTAMENTE debajo del header */
        width: 100% !important;
        background: linear-gradient(135deg, rgba(45, 45, 45, 0.95), rgba(60, 60, 60, 0.92)) !important;
        backdrop-filter: blur(15px) !important;
        -webkit-backdrop-filter: blur(15px) !important;
        
        /* Layout del menú */
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: flex-start !important;
        
        /* Espaciado y diseño */
        padding: 25px 20px 30px 20px !important;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4) !important;
        border-bottom-left-radius: 25px !important;
        border-bottom-right-radius: 25px !important;
        border: 2px solid rgba(224, 253, 44, 0.4) !important;
        border-top: none !important;
        
        /* Z-index DEBAJO del header */
        z-index: 1400 !important; /* MENOR que header (1500) */
        
        /* Estados de visibilidad */
        opacity: 0 !important;
        visibility: hidden !important;
        transform: translateY(-30px) !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        
        /* Altura automática */
        max-height: 0 !important;
        overflow: hidden !important;
    }
    
    /* MENÚ ACTIVO */
    .nav-menu.active {
        opacity: 1 !important;
        visibility: visible !important;
        transform: translateY(0) !important;
        max-height: 500px !important; /* Altura suficiente para 5 enlaces */
    }
    
    /* ITEMS DEL MENÚ */
    .nav-menu li {
        width: 100% !important;
        max-width: 300px !important;
        margin: 6px 0 !important;
        list-style: none !important;
        padding: 0 !important;
        display: block !important;
    }
    
    /* ENLACES DEL MENÚ */
    .nav-link {
        display: block !important;
        width: 100% !important;
        padding: 15px 25px !important;
        font-size: 18px !important;
        font-weight: 500 !important;
        color: #fff !important;
        text-decoration: none !important;
        text-align: center !important;
        border-radius: 12px !important;
        transition: all 0.25s ease !important;
        background: rgba(255, 255, 255, 0.08) !important;
        border: 1px solid rgba(255, 255, 255, 0.15) !important;
        margin: 0 !important;
        box-sizing: border-box !important;
    }
    
    .nav-link:hover,
    .nav-link:active {
        background: rgba(224, 253, 44, 0.2) !important;
        color: #E0FD2C !important;
        transform: translateY(-2px) !important;
        border-color: rgba(224, 253, 44, 0.4) !important;
        box-shadow: 0 4px 15px rgba(224, 253, 44, 0.2) !important;
    }
    
    /* OCULTAR ELEMENTOS NO NECESARIOS */
    .search-container,
    .visitor-counter-container {
        display: none !important;
    }
    
    /* BODY: Prevenir scroll cuando menú abierto */
    body.menu-open {
        overflow: hidden !important;
        position: fixed !important;
        width: 100% !important;
    }
    
    /* HERO: Ajustar padding para header fijo */
    .hero {
        padding-top: 120px !important; /* Más espacio para header */
    }
}

/* TABLET Y MÓVIL PEQUEÑO */
@media screen and (max-width: 480px) {
    .nav-toggle {
        min-height: 36px !important;
        min-width: 36px !important;
        padding: 6px !important;
    }
    
    .bar {
        width: 18px !important;
    }
    
    .nav-logo h2 {
        font-size: 22px !important;
    }
    
    .nav-link {
        font-size: 16px !important;
        padding: 12px 20px !important;
    }
}

/* DESKTOP: Menú normal horizontal */
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
        max-width: none !important;
    }
    
    .nav-link {
        font-size: 18px !important;
        padding: 0 !important;
        width: auto !important;
        border-radius: 0 !important;
        background: transparent !important;
        border: none !important;
    }
}
`;

// ===== FUNCIÓN: APLICAR CSS INMEDIATAMENTE =====
function applyMobileFix() {
    const style = document.createElement('style');
    style.id = 'mobile-menu-fix';
    style.innerHTML = mobileCorrectedCSS;
    
    // Remover estilo previo
    const existing = document.getElementById('mobile-menu-fix');
    if (existing) existing.remove();
    
    document.head.appendChild(style);
    console.log('🎨 CSS móvil aplicado');
}

// ===== FUNCIÓN: CREAR MENÚ COMPLETO =====
function createFullMenu() {
    const menuContainer = document.getElementById('nav-menu');
    if (!menuContainer) {
        console.error('❌ No se encontró nav-menu');
        return;
    }
    
    // LOS 5 ENLACES REQUERIDOS CON NAVEGACIÓN FUNCIONAL
    const menuItems = [
        { text: 'Inicio', href: '#inicio', target: 'hero' },
        { text: 'Servicios', href: '#servicios', target: 'iot-section' },
        { text: 'Misión', href: '#mision', target: 'mission-vision' },
        { text: 'Contacto', href: '#contacto', target: 'contact-section' },
        { text: 'Suscripción', href: '#suscripcion', target: 'contact-section' }
    ];
    
    // Limpiar contenido actual
    menuContainer.innerHTML = '';
    
    // Crear cada enlace
    menuItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        
        const a = document.createElement('a');
        a.href = item.href;
        a.className = 'nav-link';
        a.textContent = item.text;
        
        // Click handler con navegación funcional
        a.addEventListener('click', (e) => {
            e.preventDefault(); // Prevenir comportamiento por defecto
            console.log(`🔗 Navegando a: ${item.text}`);
            
            // Cerrar menú primero
            closeMenu();
            
            // Navegar a la sección después de cerrar el menú
            setTimeout(() => {
                navigateToSection(item.target, item.href);
            }, 300);
        });
        
        li.appendChild(a);
        menuContainer.appendChild(li);
        
        console.log(`📝 Enlace creado: ${item.text} → ${item.target}`);
    });
    
    console.log(`✅ Menú completo creado con ${menuItems.length} enlaces`);
    console.log('📋 Enlaces: Inicio, Servicios, Misión, Contacto, Suscripción');
}

// ===== FUNCIÓN: ABRIR MENÚ =====
function openMenu() {
    if (isMenuOpen) return;
    
    isMenuOpen = true;
    
    // Activar clases
    if (menuButton) menuButton.classList.add('active');
    if (mobileMenu) mobileMenu.classList.add('active');
    
    // Prevenir scroll del body
    document.body.classList.add('menu-open');
    
    console.log('📂 Menú abierto');
}

// ===== FUNCIÓN: NAVEGACIÓN A SECCIONES =====
function navigateToSection(targetClass, fallbackId) {
    let targetElement = null;
    
    // 1. Buscar por clase (para secciones existentes)
    if (targetClass === 'hero') {
        targetElement = document.querySelector('.hero');
    } else if (targetClass === 'iot-section') {
        targetElement = document.querySelector('.iot-section');
    } else if (targetClass === 'mission-vision') {
        targetElement = document.querySelector('.mission-vision');
    } else if (targetClass === 'contact-section') {
        targetElement = document.querySelector('.contact-section');
    }
    
    // 2. Si no encuentra por clase, buscar por ID
    if (!targetElement && fallbackId) {
        const cleanId = fallbackId.replace('#', '');
        targetElement = document.getElementById(cleanId);
    }
    
    // 3. Ejecutar scroll suave
    if (targetElement) {
        console.log(`✅ Navegando a sección: ${targetClass}`);
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
        
        // Agregar efecto visual temporal
        targetElement.style.transition = 'all 0.3s ease';
        targetElement.style.transform = 'scale(1.01)';
        setTimeout(() => {
            targetElement.style.transform = 'scale(1)';
        }, 300);
        
    } else {
        console.warn(`⚠️ No se encontró la sección: ${targetClass} o ${fallbackId}`);
        
        // Fallback: scroll al top si es inicio
        if (targetClass === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}
function closeMenu() {
    if (!isMenuOpen) return;
    
    isMenuOpen = false;
    
    // Remover clases
    if (menuButton) menuButton.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('active');
    
    // Restaurar scroll del body
    document.body.classList.remove('menu-open');
    
    console.log('📁 Menú cerrado');
}

// ===== FUNCIÓN: TOGGLE MENÚ =====
function toggleMenu(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    console.log('🔄 Toggle menú');
    
    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

// ===== FUNCIÓN: CONFIGURAR EVENTOS =====
function setupEvents() {
    // Obtener elementos
    menuButton = document.getElementById('mobile-menu');
    mobileMenu = document.getElementById('nav-menu');
    
    if (!menuButton) {
        console.error('❌ No se encontró mobile-menu');
        return;
    }
    
    if (!mobileMenu) {
        console.error('❌ No se encontró nav-menu');
        return;
    }
    
    // Crear menú completo
    createFullMenu();
    
    // Event listeners
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
    
    // Tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });
    
    // Resize de ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isMenuOpen) {
            closeMenu();
        }
    });
    
    // Estado inicial
    closeMenu();
    
    console.log('⚡ Eventos configurados');
}

// ===== FUNCIÓN: VERIFICAR Y ARREGLAR HTML =====
function verifyHTML() {
    // Asegurar que existe la sección misión con ID
    const missionSection = document.querySelector('.mission-vision');
    if (missionSection && !missionSection.id) {
        missionSection.id = 'mision';
        console.log('✅ ID "mision" agregado a .mission-vision');
    }
    
    // Asegurar que existe sección de servicios con ID
    const servicesSection = document.querySelector('.iot-section');
    if (servicesSection && !servicesSection.id) {
        servicesSection.id = 'servicios';
        console.log('✅ ID "servicios" agregado a .iot-section');
    }
    
    // Asegurar que existe sección hero con ID
    const heroSection = document.querySelector('.hero');
    if (heroSection && !heroSection.id) {
        heroSection.id = 'inicio';
        console.log('✅ ID "inicio" agregado a .hero');
    }
    
    // Asegurar que existe sección contacto con ID
    const contactSection = document.querySelector('.contact-section');
    if (contactSection && !contactSection.id) {
        contactSection.id = 'contacto';
        console.log('✅ ID "contacto" agregado a .contact-section');
    }
    
    // Crear referencia para suscripción (mismo que contacto)
    if (contactSection && !document.getElementById('suscripcion')) {
        contactSection.setAttribute('data-suscripcion', 'true');
        console.log('✅ Referencia "suscripcion" agregada a contacto');
    }
    
    console.log('🔍 HTML verificado y IDs agregados');
}

// ===== FUNCIÓN: INICIALIZACIÓN =====
function initMobileMenu() {
    console.log('🚀 Iniciando menú móvil corregido...');
    
    // 1. Aplicar CSS inmediatamente
    applyMobileFix();
    
    // 2. Verificar HTML
    verifyHTML();
    
    // 3. Configurar eventos
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupEvents);
    } else {
        setupEvents();
    }
    
    console.log('✅ Menú móvil inicializado');
}

// ===== INICIALIZACIÓN AUTOMÁTICA =====
initMobileMenu();

// ===== EXPORTAR FUNCIONES =====
window.mobileMenu = {
    open: openMenu,
    close: closeMenu,
    toggle: toggleMenu,
    isOpen: () => isMenuOpen,
    recreate: createFullMenu
};

console.log('📱 Corrección móvil lista');
console.log('📋 Enlaces: Inicio, Servicios, Misión, Contacto, Suscripción');
console.log('🔧 Para debug: mobileMenu.toggle()');
console.log('📍 Navegación funcional activada');

// ===== DEBUG: VERIFICAR SECCIONES =====
setTimeout(() => {
    console.log('🔍 Verificando secciones disponibles:');
    const sections = [
        { name: 'Hero (.hero)', element: document.querySelector('.hero') },
        { name: 'Servicios (.iot-section)', element: document.querySelector('.iot-section') },
        { name: 'Misión (.mission-vision)', element: document.querySelector('.mission-vision') },
        { name: 'Contacto (.contact-section)', element: document.querySelector('.contact-section') }
    ];
    
    sections.forEach(section => {
        if (section.element) {
            console.log(`✅ ${section.name} - ENCONTRADA`);
        } else {
            console.log(`❌ ${section.name} - NO ENCONTRADA`);
        }
    });
}, 1000);
