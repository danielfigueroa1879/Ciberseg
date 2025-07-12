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

/* FLECHA TRIANGULAR - PUNTA MÁS GRANDE Y VISIBLE */
#floating-back-btn::before {
    content: '' !important;
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -55%) !important; /* Centrado perfecto */
    
    /* Triángulo más grande hacia arriba */
    width: 0 !important;
    height: 0 !important;
    border-left: 14px solid transparent !important; /* MÁS GRANDE */
    border-right: 14px solid transparent !important; /* MÁS GRANDE */
    border-bottom: 18px solid #000 !important; /* FLECHA MÁS ALTA Y NEGRA */
    
    /* Sin otros bordes */
    border-top: none !important;
}

/* SOMBRA FLOTANTE MÁS PRONUNCIADA */
#floating-back-btn {
    /* Posicionamiento absoluto y fijo */
    position: fixed !important;
    bottom: 25px !important;
    right: 20px !important;
    
    /* Tamaño fijo */
    width: 60px !important; /* Un poco más grande */
    height: 60px !important; /* Un poco más grande */
    
    /* Diseño circular */
    border-radius: 50% !important;
    border: none !important;
    outline: none !important;
    
    /* Fondo verde brillante */
    background: linear-gradient(135deg, #E0FD2C 0%, #C7E525 100%) !important;
    
    /* Sombra FLOTANTE más pronunciada */
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5), 
                0 4px 15px rgba(224, 253, 44, 0.7),
                0 2px 8px rgba(0, 0, 0, 0.3) !important;
    
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
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    
    /* Estado inicial visible */
    opacity: 1 !important;
    visibility: visible !important;
    transform: translateY(0) !important;
    
    /* Asegurar que esté por encima de todo */
    pointer-events: auto !important;
    user-select: none !important;
    
    /* Borde sutil para definir mejor */
    border: 2px solid rgba(255, 255, 255, 0.2) !important;
}

#floating-back-btn:hover {
    background: linear-gradient(135deg, #C7E525 0%, #B8D61F 100%) !important;
    transform: translateY(-4px) scale(1.1) !important; /* Más flotación */
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.6), 
                0 6px 20px rgba(224, 253, 44, 0.8),
                0 3px 12px rgba(0, 0, 0, 0.4) !important;
}

#floating-back-btn:active {
    transform: translateY(-2px) scale(1.05) !important;
    transition: all 0.1s ease !important;
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

/* RESPONSIVE PARA MÓVILES PEQUEÑOS */
@media screen and (max-width: 480px) {
    #floating-back-btn {
        top: 50% !important;
        right: 12px !important;
        width: 55px !important;
        height: 55px !important;
        
        /* ESTADO INICIAL OCULTO */
        opacity: 0 !important;
        visibility: hidden !important;
        transform: translateY(-50%) translateX(20px) !important;
    }
    
    /* ESTADO VISIBLE */
    #floating-back-btn.show {
        opacity: 1 !important;
        visibility: visible !important;
        transform: translateY(-50%) translateX(0) !important;
    }
    
    #floating-back-btn:hover {
        transform: translateY(-50%) translateX(-4px) scale(1.1) !important;
    }
    
    #floating-back-btn:active {
        transform: translateY(-50%) translateX(-2px) scale(1.05) !important;
    }
    
    /* FLECHA MÁS PEQUEÑA EN MÓVILES PEQUEÑOS */
    #floating-back-btn::after {
        width: 10px !important;
        height: 10px !important;
        border-top: 2.5px solid #000 !important;
        border-right: 2.5px solid #000 !important;
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

// ===== FUNCIÓN: CREAR BOTÓN FLOTANTE SOLO PARA MÓVILES =====
function createForcedFloatingButton() {
    // Verificar si estamos en móvil
    if (window.innerWidth > 768) {
        console.log('💻 Desktop detectado - botón flotante no creado');
        return null;
    }
    
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
    
    // Forzar estilos inline como backup SOLO PARA MÓVILES
    button.style.cssText = `
        position: fixed !important;
        top: 50% !important;
        right: 15px !important;
        transform: translateY(-50%) !important;
        width: 60px !important;
        height: 60px !important;
        border-radius: 50% !important;
        background: linear-gradient(135deg, #E0FD2C 0%, #C7E525 100%) !important;
        border: 2px solid rgba(255, 255, 255, 0.2) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        z-index: 99999 !important;
        opacity: 1 !important;
        visibility: visible !important;
        cursor: pointer !important;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5), 0 4px 15px rgba(224, 253, 44, 0.7) !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    `;
    
    console.log('✅ Botón flotante creado SOLO para móvil');
    return button;
}

// ===== FUNCIÓN: MANEJAR SCROLL PARA MOSTRAR/OCULTAR BOTÓN =====
function handleScrollVisibility() {
    const button = document.getElementById('floating-back-btn');
    if (!button || window.innerWidth > 768) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollThreshold = 200; // Mostrar después de 200px de scroll
    
    if (scrollTop > scrollThreshold) {
        // MOSTRAR BOTÓN - hay scroll hacia abajo
        if (!button.classList.contains('show')) {
            button.classList.add('show');
            console.log('👁️ Botón flotante mostrado (scroll hacia abajo)');
        }
    } else {
        // OCULTAR BOTÓN - estamos cerca del top
        if (button.classList.contains('show')) {
            button.classList.remove('show');
            console.log('🙈 Botón flotante ocultado (llegamos arriba)');
        }
    }
}

// ===== FUNCIÓN: CONFIGURAR EVENTOS DE SCROLL OPTIMIZADOS =====
function setupScrollEvents() {
    let isScrolling = false;
    let lastScrollTop = 0;
    
    // Throttled scroll handler para mejor rendimiento
    function throttledScrollHandler() {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                handleScrollVisibility();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }
    
    // Event listeners optimizados
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    window.addEventListener('touchmove', throttledScrollHandler, { passive: true });
    
    // Verificación inicial (ocultar al cargar)
    setTimeout(() => {
        handleScrollVisibility();
    }, 100);
    
    console.log('📜 Eventos de scroll configurados para mostrar/ocultar botón');
}
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
    
// ===== FUNCIÓN: MANEJAR CLICK FLOTANTE =====
function handleFloatingClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🔼 Botón flotante presionado - navegando al inicio');
    
    // Scroll suave al inicio
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    
    // Efecto visual más pronunciado - MANTENER CENTRADO
    const button = e.target.closest('#floating-back-btn');
    if (button) {
        button.style.transform = 'translateY(-50%) translateX(-5px) scale(1.15)';
        button.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.6), 0 6px 20px rgba(224, 253, 44, 0.8)';
        setTimeout(() => {
            // Verificar si el botón aún debe estar visible
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop <= 200) {
                // Si llegamos arriba, ocultar el botón
                button.classList.remove('show');
                button.style.transform = 'translateY(-50%) translateX(20px)';
                console.log('🏠 Llegamos arriba - botón flotante ocultado');
            } else {
                // Si aún hay scroll, mantener visible
                button.style.transform = 'translateY(-50%)';
            }
            button.style.boxShadow = '';
        }, 250);
    }
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

// ===== FUNCIÓN: VERIFICAR BOTÓN PERIÓDICAMENTE - SOLO MÓVILES =====
function monitorFloatingButton() {
    setInterval(() => {
        // Solo monitorear en móviles
        if (window.innerWidth <= 768) {
            const button = document.getElementById('floating-back-btn');
            if (!button || !document.body.contains(button)) {
                console.log('⚠️ Botón flotante perdido en móvil, recreando...');
                createForcedFloatingButton();
            }
        } else {
            // En desktop, asegurar que no exista
            const button = document.getElementById('floating-back-btn');
            if (button) {
                button.remove();
                console.log('💻 Botón flotante removido en desktop');
            }
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
        
        // 3. Configurar eventos de scroll para mostrar/ocultar
        setupScrollEvents();
        
        // 4. Arreglar menú hamburguesa
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

// Backup para asegurar que funcione SOLO EN MÓVILES
window.addEventListener('load', () => {
    setTimeout(() => {
        if (window.innerWidth <= 768) { // Solo en móviles
            const button = document.getElementById('floating-back-btn');
            if (!button) {
                console.log('🔄 Backup: creando botón flotante para móvil...');
                createForcedFloatingButton();
            }
        }
    }, 1000);
});

// Event listener para cambios de tamaño de ventana
window.addEventListener('resize', () => {
    const button = document.getElementById('floating-back-btn');
    
    if (window.innerWidth > 768) {
        // Desktop: remover botón si existe
        if (button) {
            button.remove();
            console.log('💻 Botón flotante removido al cambiar a desktop');
        }
    } else {
        // Móvil: crear botón si no existe
        if (!button) {
            console.log('📱 Creando botón flotante al cambiar a móvil');
            createForcedFloatingButton();
        }
    }
});

// ===== EXPORTAR FUNCIONES =====
window.completeFix = {
    reinit: reinitAll,
    createButton: createForcedFloatingButton,
    fixMenu: fixHamburgerMenu
};

console.log('🔧 Corrección completa cargada');
console.log('🔴 Botón flotante: Aparece al hacer SCROLL hacia abajo');
console.log('🏠 Al llegar arriba: Botón DESAPARECE automáticamente');
console.log('📍 Posición: Centro vertical del lado derecho');
console.log('💻 Desktop: Botón flotante OCULTO');
console.log('🍔 Menú hamburguesa: X animada corregida');
console.log('📱 Para debug: completeFix.reinit()');
