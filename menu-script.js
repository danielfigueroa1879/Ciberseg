// ===== BOTÓN FLOTANTE DE REGRESO - SOLUCIÓN COMPLETA =====

console.log('🔴 Iniciando botón flotante optimizado...');

// Variables globales
let floatingButton = null;
let isButtonVisible = false;
let scrollThreshold = 300; // Mostrar después de 300px de scroll

// ===== CSS ESPECÍFICO PARA EL BOTÓN FLOTANTE =====
const floatingButtonCSS = `
/* ===== BOTÓN FLOTANTE DE REGRESO ===== */

.floating-back-button {
    /* Posicionamiento fijo */
    position: fixed !important;
    bottom: 30px !important;
    right: 20px !important;
    
    /* Tamaño y forma */
    width: 50px !important;
    height: 50px !important;
    border-radius: 50% !important;
    
    /* Diseño visual */
    background: linear-gradient(135deg, #E0FD2C 0%, #C7E525 100%) !important;
    border: 2px solid rgba(255, 255, 255, 0.3) !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 
                0 2px 10px rgba(224, 253, 44, 0.4) !important;
    
    /* Centrar contenido */
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    
    /* Interactividad */
    cursor: pointer !important;
    touch-action: manipulation !important;
    -webkit-tap-highlight-color: transparent !important;
    
    /* Z-index muy alto */
    z-index: 9999 !important;
    
    /* Transiciones suaves */
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    
    /* Estado inicial oculto */
    opacity: 0 !important;
    visibility: hidden !important;
    transform: translateY(20px) scale(0.8) !important;
    
    /* Sin estilos de botón por defecto */
    border: none !important;
    outline: none !important;
    padding: 0 !important;
    margin: 0 !important;
}

/* Estado visible */
.floating-back-button.show {
    opacity: 1 !important;
    visibility: visible !important;
    transform: translateY(0) scale(1) !important;
}

/* Hover effect */
.floating-back-button:hover {
    background: linear-gradient(135deg, #C7E525 0%, #B8D61F 100%) !important;
    transform: translateY(-3px) scale(1.1) !important;
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4), 
                0 3px 15px rgba(224, 253, 44, 0.6) !important;
}

/* Active/touch effect */
.floating-back-button:active {
    transform: translateY(-1px) scale(1.05) !important;
    transition: all 0.1s ease !important;
}

/* Flecha hacia arriba - SOLO PUNTA SIN BASE */
.floating-back-button::before {
    content: '' !important;
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    
    /* Forma de flecha - solo punta */
    width: 0 !important;
    height: 0 !important;
    border-left: 8px solid transparent !important;
    border-right: 8px solid transparent !important;
    border-bottom: 12px solid #000 !important; /* Flecha negra hacia arriba */
    
    /* Sin borde superior (solo punta) */
    border-top: none !important;
}

/* Responsive para móviles */
@media screen and (max-width: 768px) {
    .floating-back-button {
        bottom: 25px !important;
        right: 15px !important;
        width: 45px !important;
        height: 45px !important;
    }
    
    .floating-back-button::before {
        border-left: 7px solid transparent !important;
        border-right: 7px solid transparent !important;
        border-bottom: 10px solid #000 !important;
    }
}

@media screen and (max-width: 480px) {
    .floating-back-button {
        bottom: 20px !important;
        right: 12px !important;
        width: 42px !important;
        height: 42px !important;
    }
    
    .floating-back-button::before {
        border-left: 6px solid transparent !important;
        border-right: 6px solid transparent !important;
        border-bottom: 9px solid #000 !important;
    }
}

/* Asegurar visibilidad en todos los móviles */
@supports (-webkit-touch-callout: none) {
    .floating-back-button {
        display: flex !important;
    }
}

/* Prevenir conflictos con otros estilos */
.floating-back-button * {
    box-sizing: border-box !important;
}
`;

// ===== FUNCIÓN: APLICAR CSS DEL BOTÓN =====
function applyFloatingButtonCSS() {
    // Buscar y remover estilos previos
    const existingStyle = document.getElementById('floating-button-styles');
    if (existingStyle) {
        existingStyle.remove();
    }
    
    // Crear nuevo elemento de estilo
    const style = document.createElement('style');
    style.id = 'floating-button-styles';
    style.innerHTML = floatingButtonCSS;
    
    // Agregar al head
    document.head.appendChild(style);
    
    console.log('🎨 Estilos del botón flotante aplicados');
}

// ===== FUNCIÓN: CREAR BOTÓN FLOTANTE =====
function createFloatingButton() {
    // Remover botón existente si existe
    const existingButton = document.querySelector('.floating-back-button, #scrollToTop, .scroll-to-top');
    if (existingButton) {
        existingButton.remove();
        console.log('🗑️ Botón anterior removido');
    }
    
    // Crear nuevo botón
    floatingButton = document.createElement('button');
    floatingButton.className = 'floating-back-button';
    floatingButton.id = 'floatingBackButton';
    floatingButton.setAttribute('aria-label', 'Volver al inicio');
    floatingButton.setAttribute('title', 'Volver arriba');
    
    // Event listener para click
    floatingButton.addEventListener('click', handleButtonClick);
    
    // Event listener para touch (móviles)
    floatingButton.addEventListener('touchstart', handleButtonClick);
    
    // Agregar al body
    document.body.appendChild(floatingButton);
    
    console.log('✅ Botón flotante creado');
    return floatingButton;
}

// ===== FUNCIÓN: MANEJAR CLICK DEL BOTÓN =====
function handleButtonClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🔼 Botón flotante presionado - navegando al inicio');
    
    // Scroll suave al inicio
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    
    // Efecto visual en el botón
    if (floatingButton) {
        floatingButton.style.transform = 'translateY(-1px) scale(1.05)';
        setTimeout(() => {
            floatingButton.style.transform = '';
        }, 150);
    }
}

// ===== FUNCIÓN: MOSTRAR BOTÓN =====
function showButton() {
    if (!isButtonVisible && floatingButton) {
        isButtonVisible = true;
        floatingButton.classList.add('show');
        console.log('👁️ Botón flotante mostrado');
    }
}

// ===== FUNCIÓN: OCULTAR BOTÓN =====
function hideButton() {
    if (isButtonVisible && floatingButton) {
        isButtonVisible = false;
        floatingButton.classList.remove('show');
        console.log('🙈 Botón flotante ocultado');
    }
}

// ===== FUNCIÓN: MANEJAR SCROLL =====
function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > scrollThreshold) {
        showButton();
    } else {
        hideButton();
    }
}

// ===== FUNCIÓN: CONFIGURAR EVENTOS DE SCROLL =====
function setupScrollEvents() {
    let isScrolling = false;
    
    // Throttled scroll handler para mejor rendimiento
    function throttledScrollHandler() {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                handleScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }
    
    // Event listeners
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    window.addEventListener('touchmove', throttledScrollHandler, { passive: true });
    
    // Verificación inicial
    setTimeout(handleScroll, 100);
    
    console.log('📜 Eventos de scroll configurados');
}

// ===== FUNCIÓN: VERIFICAR VISIBILIDAD =====
function forceVisibility() {
    if (floatingButton) {
        // Asegurar que el botón esté en el DOM
        if (!document.body.contains(floatingButton)) {
            document.body.appendChild(floatingButton);
        }
        
        // Forzar estilos de visibilidad
        floatingButton.style.display = 'flex';
        floatingButton.style.position = 'fixed';
        floatingButton.style.zIndex = '9999';
        
        console.log('🔧 Visibilidad del botón forzada');
    }
}

// ===== FUNCIÓN: INICIALIZACIÓN COMPLETA =====
function initFloatingButton() {
    console.log('🚀 Inicializando botón flotante...');
    
    try {
        // 1. Aplicar CSS
        applyFloatingButtonCSS();
        
        // 2. Crear botón
        createFloatingButton();
        
        // 3. Configurar eventos de scroll
        setupScrollEvents();
        
        // 4. Forzar visibilidad si es necesario
        setTimeout(forceVisibility, 500);
        
        // 5. Verificación periódica (para asegurar que funciona)
        setInterval(() => {
            if (!document.querySelector('.floating-back-button')) {
                console.log('⚠️ Botón perdido, recreando...');
                createFloatingButton();
            }
        }, 3000);
        
        console.log('✅ Botón flotante inicializado correctamente');
        
    } catch (error) {
        console.error('❌ Error al inicializar botón flotante:', error);
    }
}

// ===== FUNCIÓN: REINICIALIZAR =====
function reinitFloatingButton() {
    console.log('🔄 Reinicializando botón flotante...');
    
    // Limpiar todo
    const existingButtons = document.querySelectorAll('.floating-back-button, #scrollToTop, .scroll-to-top');
    existingButtons.forEach(btn => btn.remove());
    
    const existingStyles = document.getElementById('floating-button-styles');
    if (existingStyles) existingStyles.remove();
    
    // Reinicializar
    setTimeout(initFloatingButton, 100);
}

// ===== INICIALIZACIÓN AUTOMÁTICA =====
function autoInit() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFloatingButton);
    } else {
        // DOM ya cargado, inicializar inmediatamente
        initFloatingButton();
    }
    
    // Backup: inicializar cuando la página esté completamente cargada
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (!document.querySelector('.floating-back-button')) {
                console.log('🔄 Backup: inicializando botón flotante...');
                initFloatingButton();
            }
        }, 1000);
    });
}

// ===== EXPORTAR FUNCIONES =====
window.floatingButton = {
    init: initFloatingButton,
    reinit: reinitFloatingButton,
    show: showButton,
    hide: hideButton,
    isVisible: () => isButtonVisible,
    element: () => floatingButton
};

// ===== INICIALIZACIÓN =====
autoInit();

console.log('🔴 Botón flotante de regreso cargado');
console.log('📍 Aparece después de 300px de scroll');
console.log('🔼 Flecha simple apuntando hacia arriba');
console.log('🔧 Para debug: floatingButton.reinit()');