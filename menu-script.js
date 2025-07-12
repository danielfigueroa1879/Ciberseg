// ===== SOLUCIÓN DEFINITIVA: BOTÓN FLOTANTE QUE ACOMPAÑA AL SCROLL =====

// Mensaje de inicio para depuración.
console.log('🚀 Iniciando solución de botón flotante dinámico...');

// ===== VARIABLES GLOBALES =====
let scrollButton = null; // Referencia al elemento del botón.
let isMenuOpen = false; // Estado del menú móvil.
let menuButton, mobileMenu; // Referencias a elementos del menú.
let throttledUpdate; // Variable para la función de actualización con "throttle".

// ===== FUNCIÓN: CREAR BOTÓN FLOTANTE =====
function createScrollButton() {
    console.log('DEBUG: Attempting to create scroll button...');
    // El botón solo se crea si el ancho de la ventana es de un dispositivo móvil.
    if (window.innerWidth > 768) {
        console.log('DEBUG: Desktop view, not creating scroll button.');
        return;
    }
    
    // Elimina cualquier botón existente con el mismo ID o clases para evitar duplicados.
    const existingButtons = document.querySelectorAll('#dynamic-scroll-btn, #ultra-floating-btn, .scroll-to-top');
    existingButtons.forEach(btn => {
        console.log('DEBUG: Removing existing button:', btn.id || btn.className);
        btn.remove();
    });
    
    // Crea el nuevo elemento <button>.
    scrollButton = document.createElement('button');
    scrollButton.id = 'dynamic-scroll-btn'; // Asigna un ID único.
    scrollButton.type = 'button';
    scrollButton.setAttribute('aria-label', 'Volver arriba'); // Atributo para accesibilidad.
    // Inserta el SVG de la flecha dentro del botón.
    scrollButton.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 14L12 9L17 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    
    // Añade los "event listeners" para el clic y el toque.
    scrollButton.addEventListener('click', scrollToTop);
    scrollButton.addEventListener('touchstart', function(e) {
        e.preventDefault(); // Previene el comportamiento de scroll por defecto en touch.
        scrollToTop();
    }, { passive: false }); // 'passive: false' es importante para 'preventDefault'.
    
    // Añade el botón al cuerpo del documento.
    document.body.appendChild(scrollButton);
    
    console.log('DEBUG: ✅ Botón flotante creado y añadido al DOM.');
    return scrollButton; // Devuelve la referencia al botón creado.
}

// ===== FUNCIÓN: SCROLL AL INICIO DE LA PÁGINA =====
function scrollToTop() {
    console.log('DEBUG: Scrolling to top...');
    // Realiza un scroll suave hasta la parte superior de la página.
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== FUNCIÓN: ACTUALIZAR VISIBILIDAD DEL BOTÓN BASADO EN EL SCROLL =====
function updateButtonVisibility() {
    if (!scrollButton) {
        console.log('DEBUG: Button element not found in updateButtonVisibility.');
        return;
    }
    if (window.innerWidth > 768) {
        // Si estamos en escritorio, asegúrate de que el botón esté oculto.
        if (scrollButton.classList.contains('visible')) {
            scrollButton.classList.remove('visible');
            console.log('DEBUG: 🔽 Botón oculto (desktop view)');
        }
        return;
    }

    // Obtiene la posición actual del scroll vertical.
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const threshold = 300; // El botón se mostrará después de 300px de scroll hacia abajo.

    // Verifica si hay suficiente contenido para hacer scroll.
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const hasScrollableContent = scrollHeight > (clientHeight + threshold); // Asegura que haya al menos 300px de scroll disponible.

    console.log(`DEBUG: ScrollTop: ${scrollTop}, Threshold: ${threshold}, Button Visible: ${scrollButton.classList.contains('visible')}`);
    console.log(`DEBUG: ScrollHeight: ${scrollHeight}, ClientHeight: ${clientHeight}, HasScrollableContent: ${hasScrollableContent}`);

    // Si el scroll supera el umbral Y hay contenido scrollable, el botón se hace visible.
    if (scrollTop > threshold && hasScrollableContent) {
        if (!scrollButton.classList.contains('visible')) {
            scrollButton.classList.add('visible'); // Añade la clase 'visible'.
            console.log('DEBUG: 🔼 Botón becoming visible.');
        }
    } else {
        // Si el scroll está por debajo del umbral O no hay suficiente contenido scrollable, el botón se oculta.
        if (scrollButton.classList.contains('visible')) {
            scrollButton.classList.remove('visible'); // Remueve la clase 'visible'.
            console.log('DEBUG: 🔽 Botón becoming hidden.');
        }
    }
}

// ===== FUNCIÓN: THROTTLE PARA OPTIMIZAR EVENTOS DE SCROLL =====
// Limita la frecuencia con la que se ejecuta una función, mejorando el rendimiento.
function throttle(func, wait) {
    let timeout;
    let lastArgs;
    let lastThis;
    let lastResult;
    let lastCallTime = 0;

    const throttled = function(...args) {
        const now = Date.now();
        lastArgs = args;
        lastThis = this;

        if (now - lastCallTime > wait) {
            lastCallTime = now;
            lastResult = func.apply(lastThis, lastArgs);
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                lastCallTime = Date.now();
                lastResult = func.apply(lastThis, lastArgs);
            }, wait - (now - lastCallTime));
        }
        return lastResult;
    };
    
    throttled.cancel = () => {
        clearTimeout(timeout);
    };

    return throttled;
}


// ===== FUNCIÓN: CONFIGURAR EL MENÚ DE NAVEGACIÓN MÓVIL =====
function setupMenu() {
    menuButton = document.getElementById('mobile-menu'); // Botón de hamburguesa.
    mobileMenu = document.getElementById('nav-menu');    // Menú de navegación.
    
    // Si no se encuentran los elementos del menú, muestra una advertencia y sal.
    if (!menuButton || !mobileMenu) {
        console.warn('DEBUG: ⚠️ No se encontraron elementos de menú (mobile-menu o nav-menu).');
        return;
    }
    
    // Asegura que el botón de hamburguesa tenga las barras si no las tiene.
    if (menuButton.children.length === 0) {
        menuButton.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
    }
    
    // Define los ítems del menú.
    const menuItems = [
        { text: 'Inicio', target: '#inicio' },
        { text: 'Servicios', target: '#servicios' },
        { text: 'Contacto', target: '#contacto' },
        { text: 'Suscripción', target: '#contacto' } // Apunta a la sección de contacto.
    ];
    
    mobileMenu.innerHTML = ''; // Limpia el contenido actual del menú.
    // Crea y añade cada ítem al menú.
    menuItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        const a = document.createElement('a');
        a.href = item.target;
        a.className = 'nav-link';
        a.textContent = item.text;
        // Añade un "event listener" para cerrar el menú y hacer scroll al hacer clic.
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
    
    // Añade "event listeners" para abrir/cerrar el menú y cerrarlo al hacer clic fuera.
    menuButton.addEventListener('click', toggleMenu);
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !menuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMenu();
        }
    });
    
    console.log('DEBUG: ✅ Menú configurado.');
}

// Funciones para abrir y cerrar el menú.
function openMenu() {
    isMenuOpen = true;
    if (menuButton) menuButton.classList.add('active');
    if (mobileMenu) mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // Evita el scroll del fondo cuando el menú está abierto.
    console.log('DEBUG: Menu opened.');
}

function closeMenu() {
    isMenuOpen = false;
    if (menuButton) menuButton.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('active');
    document.body.style.overflow = ''; // Restaura el scroll del fondo.
    console.log('DEBUG: Menu closed.');
}

function toggleMenu() {
    isMenuOpen ? closeMenu() : openMenu();
}

// ===== FUNCIÓN: CONFIGURAR LOS EVENTOS DE SCROLL =====
function setupScrollEvents() {
    // Asigna la función de actualización con "throttle" a la variable global.
    throttledUpdate = throttle(updateButtonVisibility, 100);
    
    // Añade los "event listeners" para el scroll y el touchmove (para dispositivos táctiles).
    window.addEventListener('scroll', throttledUpdate, { passive: true });
    window.addEventListener('touchmove', throttledUpdate, { passive: true });
    
    // Realiza una verificación inicial de la visibilidad del botón poco después de la carga.
    setTimeout(updateButtonVisibility, 100);
    
    console.log('DEBUG: ✅ Eventos de scroll configurados.');
}

// ===== FUNCIÓN: MONITOREAR Y MANTENER EL BOTÓN FLOTANTE =====
// Esta función se ejecuta periódicamente para asegurar que el botón esté presente.
function monitorButton() {
    setInterval(() => {
        // Si estamos en móvil y el botón no existe, lo recrea y actualiza su visibilidad.
        if (window.innerWidth <= 768 && !document.getElementById('dynamic-scroll-btn')) {
            console.log('DEBUG: ⚠️ Botón flotante perdido, recreando...');
            createScrollButton();
            updateButtonVisibility();
        }
    }, 2000); // Se chequea cada 2 segundos.
}

// ===== FUNCIÓN: INICIALIZACIÓN PRINCIPAL DEL SISTEMA DEL BOTÓN FLOTANTE =====
function initFloatingButton() {
    console.log('DEBUG: 🎯 Iniciando sistema de botón flotante...');
    
    try {
        // La aplicación del CSS del botón ahora se maneja directamente en styles.css
        
        // 1. Configura el menú (independiente del botón, pero importante para la UX).
        setupMenu();
        
        // 2. Crea el botón (la función ya comprueba si es necesario).
        createScrollButton();
        
        // 3. Configura los eventos de scroll para controlar la visibilidad.
        setupScrollEvents();
        
        // 4. Inicia el monitoreo del botón para asegurar su persistencia.
        monitorButton();
        
        console.log('DEBUG: ✅ Sistema de botón flotante inicializado correctamente.');
        
    } catch (error) {
        // Captura y muestra cualquier error durante la inicialización.
        console.error('DEBUG: ❌ Error en inicialización del botón flotante:', error);
    }
}

// ===== EVENTOS DE REDIMENSIONAMIENTO DE LA VENTANA (RESIZE) =====
// Se usa "throttle" para optimizar la ejecución en el redimensionamiento.
window.addEventListener('resize', throttle(() => {
    console.log('DEBUG: Window resized. Inner width:', window.innerWidth);
    if (window.innerWidth > 768) {
        // Si la ventana es de escritorio, elimina el botón si existe.
        if (scrollButton) {
            scrollButton.remove();
            scrollButton = null;
            console.log('DEBUG: Scroll button removed for desktop view.');
        }
        // Asegúrate de cerrar el menú si estaba abierto en escritorio.
        if (isMenuOpen) closeMenu();
    } else {
        // Si la ventana es móvil, crea el botón si no existe.
        if (!document.getElementById('dynamic-scroll-btn')) {
            console.log('DEBUG: Detected mobile view, creating scroll button if not exists.');
            createScrollButton();
        }
        // Actualiza la visibilidad del botón para el nuevo tamaño.
        updateButtonVisibility();
    }
}, 300)); // Se ejecuta como máximo cada 300ms.

// ===== INICIALIZACIÓN DEL SCRIPT AL CARGAR EL DOM =====
// Asegura que el script se ejecute cuando el DOM (estructura HTML) esté completamente cargado.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFloatingButton);
} else {
    // Si el DOM ya está cargado (por ejemplo, si el script se carga de forma asíncrona),
    // ejecuta la inicialización inmediatamente.
    initFloatingButton();
}

// Inicialización adicional después del evento 'load' (como respaldo).
window.addEventListener('load', () => {
    setTimeout(() => {
        // Vuelve a verificar y recrear el botón en móvil si por alguna razón no se creó.
        if (!document.getElementById('dynamic-scroll-btn') && window.innerWidth <= 768) {
            console.log('DEBUG: Window loaded, re-checking for scroll button on mobile.');
            createScrollButton();
            updateButtonVisibility();
        }
    }, 500); // Pequeño retraso para asegurar que todo el contenido se haya renderizado.
});

// ===== API PÚBLICA (PARA DEPURACIÓN MANUAL EN LA CONSOLA) =====
// Permite controlar y depurar el sistema del botón desde la consola del navegador.
window.floatingButtonSystem = {
    reinit: initFloatingButton, // Reinicia todo el sistema.
    getButton: () => document.getElementById('dynamic-scroll-btn'), // Obtiene la referencia al botón.
    forceShow: () => { // Fuerza la visibilidad del botón.
        const btn = document.getElementById('dynamic-scroll-btn');
        if (btn) btn.classList.add('visible');
        console.log('DEBUG: Forced scroll button show.');
    },
    forceHide: () => { // Fuerza la ocultación del botón.
        const btn = document.getElementById('dynamic-scroll-btn');
        if (btn) btn.classList.remove('visible');
        console.log('DEBUG: Forced scroll button hide.');
    }
};

console.log('✅ Sistema de botón flotante cargado.');
console.log('📍 El botón aparecerá después de 300px de scroll.');
console.log('🔧 Para depurar, abre la consola del navegador en tu móvil y busca los mensajes que empiezan con "DEBUG:".');
