// ===== SOLUCIÓN COMPLETA: BOTÓN FLOTANTE + MENÚ HAMBURGUESA =====

console.log('🔧 Iniciando corrección completa...');

// ===== CSS COMPLETO Y CORREGIDO =====
const completeFixCSS = `
/* ===== BOTÓN FLOTANTE - FORZADO PARA MÓVILES ===== */

#floating-back-btn {
    /* Posicionamiento absoluto y fijo */
    position: fixed !important;
    bottom: 25px !important;
    right: 20px !important;
    
    /* Tamaño fijo */
    width: 55px !important;
    height: 55px !important;
    
    /* Diseño circular */
    border-radius: 50% !important;
    border: none !important;
    outline: none !important;
    
    /* Fondo verde brillante */
    background: #E0FD2C !important;
    
    /* Sombra pronunciada */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), 
                0 2px 10px rgba(224, 253, 44, 0.6) !important;
    
    /* Flexbox para centrar */
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    
    /* Z-index súper alto */
    z-index: 99999 !important;
    
    /* Cursor pointer */
    cursor: pointer !important;
    
    /* Touch optimizado */
    touch-action: manipulation !important;
    -webkit-tap-highlight-color: transparent !important;
    
    /* Transición suave */
    transition: all 0.3s ease !important;
    
    /* Estado inicial visible */
    opacity: 1 !important;
    visibility: visible !important;
    transform: translateY(0) !important;
    
    /* Asegurar que esté por encima de todo */
    pointer-events: auto !important;
    user-select: none !important;
}

#floating-back-btn:hover {
    background: #C7E525 !important;
    transform: translateY(-3px) scale(1.1) !important;
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.5), 
                0 3px 15px rgba(224, 253, 44, 0.8) !important;
}

#floating-back-btn:active {
    transform: translateY(-1px) scale(1.05) !important;
}

/* FLECHA TRIANGULAR - SOLO PUNTA */
#floating-back-btn::before {
    content: '' !important;
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -60%) !important; /* Centrado perfecto */
    
    /* Triángulo hacia arriba */
    width: 0 !important;
    height: 0 !important;
    border-left: 10px solid transparent !important;
    border-right: 10px solid transparent !important;
    border-bottom: 14px solid #000 !important; /* Flecha negra */
    
    /* Sin otros bordes */
    border-top: none !important;
}

/* MENÚ HAMBURGUESA - BARRAS CORREGIDAS */
@media screen and (max-width: 768px) {
    
    /* Contenedor del botón hamburguesa */
    .nav-toggle {
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
    
    /* Barras del hamburguesa - DIMENSIONES CORRECTAS */
    .bar {
        width: 24px !important; /* Más anchas */
        height: 3px !important; /* Más gruesas */
        background-color: #fff !important;
        margin: 3px 0 !important; /* Más separación */
        transition: all 0.4s ease !important; /* Transición más lenta */
        border-radius: 2px !important;
        display: block !important;
        transform-origin: center !important; /* Punto de rotación central */
        position: relative !important;
    }
    
    /* ANIMACIÓN X CORREGIDA */
    .nav-toggle.active .bar:nth-child(1) {
        transform: translateY(6px) rotate(45deg) !important; /* Más separación */
    }
    
    .nav-toggle.active .bar:nth-child(2) {
        opacity: 0 !important;
        transform: scale(0) !important; /* Desaparece suavemente */
    }
    
    .nav-toggle.active .bar:nth-child(3) {
        transform: translateY(-6px) rotate(-45deg) !important; /* Más separación */
    }
    
    /* Hover del botón hamburguesa */
    .nav-toggle:hover {
        background-color: rgba(0, 0, 0, 0.8) !important;
        border-color: rgba(255, 255, 255, 0.6) !important;
    }
    
    .nav-toggle:active {
        transform: scale(0.95) !important;
    }
}

/* FORZAR VISIBILIDAD EN TODOS LOS DISPOSITIVOS */
@media screen and (max-width: 768px) {
    #floating-back-btn {
        display: flex !important;
    }
}

@media screen and (max-width: 480px) {
    #floating-back-btn {
        bottom: 20px !important;
        right: 15px !important;
        width: 50px !important;
        height: 50px !important;
    }
    
    #floating-back-btn::before {
        border-left: 8px solid transparent !important;
        border-right: 8px solid transparent !important;
        border-bottom: 12px solid #000 !important;
    }
}

/* PARA TODOS LOS DISPOSITIVOS APPLE */
@supports (-webkit-appearance: none) {
    #floating-back-btn {
        display: flex !important;
        opacity: 1 !important;
        visibility: visible !important;
    }
}
`;

// ===== FUNCIÓN: APLICAR CSS INMEDIATAMENTE =====
function applyCompleteFix() {
    // Remover estilos previos
    const existingStyles = [
        'floating-button-styles',
        'mobile-menu-fix', 
        'fast-hamburger-menu'
    ];
    
    existingStyles.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.remove();
    });
    
    // Aplicar CSS corregido
    const style = document.createElement('style');
    style.id = 'complete-fix-styles';
    style.innerHTML = completeFixCSS;
    document.head.appendChild(style);
    
    console.log('🎨 CSS completo aplicado');
}

// ===== FUNCIÓN: CREAR BOTÓN FLOTANTE FORZADO =====
function createForcedFloatingButton() {
    // Remover botones existentes
    const existingButtons = document.querySelectorAll(
        '#floating-back-btn, .floating-back-button, #scrollToTop, .scroll-to-top'
    );
    existingButtons.forEach(btn => btn.remove());
    
    console.log('🗑️ Botones anteriores removidos');
    
    // Crear botón nuevo
    const button = document.createElement('button');
    button.id = 'floating-back-btn';
    button.setAttribute('aria-label', 'Volver al inicio');
    button.setAttribute('title', 'Ir arriba');
    
    // Event listeners
    button.addEventListener('click', handleFloatingClick);
    button.addEventListener('touchstart', handleFloatingClick);
    
    // Agregar al body
    document.body.appendChild(button);
    
    // Forzar estilos inline como backup
    button.style.cssText = `
        position: fixed !important;
        bottom: 25px !important;
        right: 20px !important;
        width: 55px !important;
        height: 55px !important;
        border-radius: 50% !important;
        background: #E0FD2C !important;
        border: none !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        z-index: 99999 !important;
        opacity: 1 !important;
        visibility: visible !important;
        cursor: pointer !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4) !important;
    `;
    
    console.log('✅ Botón flotante creado y forzado');
    return button;
}

// ===== FUNCIÓN: MANEJAR CLICK FLOTANTE =====
function handleFloatingClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🔼 Botón flotante presionado');
    
    // Scroll al inicio
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    
    // Efecto visual
    const button = e.target.closest('#floating-back-btn');
    if (button) {
        button.style.transform = 'translateY(-2px) scale(1.1)';
        setTimeout(() => {
            button.style.transform = '';
        }, 200);
    }
}

// ===== FUNCIÓN: ARREGLAR MENÚ HAMBURGUESA =====
function fixHamburgerMenu() {
    const menuButton = document.getElementById('mobile-menu');
    const mobileMenu = document.getElementById('nav-menu');
    
    if (!menuButton || !mobileMenu) {
        console.error('❌ Elementos del menú no encontrados');
        return;
    }
    
    // Asegurar estructura HTML correcta del botón
    if (menuButton.children.length === 0) {
        menuButton.innerHTML = `
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        `;
        console.log('🔧 Estructura del menú hamburguesa corregida');
    }
    
    // Event listener para toggle
    menuButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = menuButton.classList.contains('active');
        
        if (isActive) {
            // Cerrar menú
            menuButton.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            console.log('📁 Menú cerrado');
        } else {
            // Abrir menú
            menuButton.classList.add('active');
            mobileMenu.classList.add('active');
            document.body.classList.add('menu-open');
            console.log('📂 Menú abierto');
        }
    });
    
    console.log('✅ Menú hamburguesa configurado');
}

// ===== FUNCIÓN: CREAR ENLACES DEL MENÚ =====
function createMenuLinks() {
    const mobileMenu = document.getElementById('nav-menu');
    if (!mobileMenu) return;
    
    const menuItems = [
        { text: 'Inicio', target: '.hero' },
        { text: 'Servicios', target: '.iot-section' },
        { text: 'Misión', target: '.mission-vision' },
        { text: 'Suscripción', target: '.contact-section' }
    ];
    
    // Limpiar menú
    mobileMenu.innerHTML = '';
    
    // Crear enlaces
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
            document.getElementById('mobile-menu').classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            
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
    
    console.log('📋 Enlaces del menú creados');
}

// ===== FUNCIÓN: VERIFICAR BOTÓN PERIÓDICAMENTE =====
function monitorFloatingButton() {
    setInterval(() => {
        const button = document.getElementById('floating-back-btn');
        if (!button || !document.body.contains(button)) {
            console.log('⚠️ Botón flotante perdido, recreando...');
            createForcedFloatingButton();
        }
    }, 2000);
}

// ===== FUNCIÓN: INICIALIZACIÓN COMPLETA =====
function initCompleteFix() {
    console.log('🚀 Iniciando corrección completa...');
    
    try {
        // 1. Aplicar CSS
        applyCompleteFix();
        
        // 2. Crear botón flotante
        createForcedFloatingButton();
        
        // 3. Arreglar menú hamburguesa
        fixHamburgerMenu();
        
        // 4. Crear enlaces del menú
        createMenuLinks();
        
        // 5. Monitorear botón
        monitorFloatingButton();
        
        console.log('✅ Corrección completa aplicada');
        
    } catch (error) {
        console.error('❌ Error en la corrección:', error);
    }
}

// ===== FUNCIÓN: REINICIALIZAR TODO =====
function reinitAll() {
    console.log('🔄 Reinicializando todo...');
    
    // Limpiar elementos existentes
    const buttons = document.querySelectorAll('#floating-back-btn, .floating-back-button');
    buttons.forEach(btn => btn.remove());
    
    const styles = document.querySelectorAll('#complete-fix-styles, #floating-button-styles');
    styles.forEach(style => style.remove());
    
    // Reinicializar
    setTimeout(initCompleteFix, 100);
}

// ===== INICIALIZACIÓN AUTOMÁTICA =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCompleteFix);
} else {
    initCompleteFix();
}

// Backup para asegurar que funcione
window.addEventListener('load', () => {
    setTimeout(() => {
        const button = document.getElementById('floating-back-btn');
        if (!button) {
            console.log('🔄 Backup: creando botón flotante...');
            createForcedFloatingButton();
        }
    }, 1000);
});

// ===== EXPORTAR FUNCIONES =====
window.completeFix = {
    reinit: reinitAll,
    createButton: createForcedFloatingButton,
    fixMenu: fixHamburgerMenu
};

console.log('🔧 Corrección completa cargada');
console.log('🔴 Botón flotante: Verde circular con flecha triangular');
console.log('🍔 Menú hamburguesa: X animada corregida');
console.log('📱 Para debug: completeFix.reinit()');
