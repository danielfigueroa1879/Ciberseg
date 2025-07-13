// ===== SOLUCIÓN COMPLETA: MENÚ HAMBURGUESA + BOTÓN FLOTANTE =====

console.log('🔧 Iniciando solución completa...');

// ===== VARIABLES GLOBALES =====
let isMenuOpen = false;
let menuButton, mobileMenu;
let scrollTimeout; // Timer para el botón de regreso arriba

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
    // CAMBIO: Se eliminó la condición de ancho de pantalla para que funcione en PC
    
    // Remover botones existentes para evitar duplicados
    const existingButtons = document.querySelectorAll('#real-floating-back-btn');
    existingButtons.forEach(btn => btn.remove());
    
    // Crear botón
    const button = document.createElement('button');
    button.id = 'real-floating-back-btn';
    button.setAttribute('aria-label', 'Ir al inicio');
    
    // Añadir icono de Font Awesome
    button.innerHTML = '<i class="fas fa-chevron-up"></i>';
    
    // Event listeners
    button.addEventListener('click', handleFloatingClick);
    button.addEventListener('touchstart', handleFloatingClick);
    
    document.body.appendChild(button);
    
    console.log('🔴 Botón flotante creado para todas las pantallas');
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

// ===== FUNCIÓN: MANEJAR SCROLL - CORREGIDA CON TIMER =====
function handleScroll() {
    // CAMBIO: Se eliminó la condición de ancho de pantalla
    
    const button = document.getElementById('real-floating-back-btn');
    if (!button) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const threshold = 200;
    
    // Limpiar el timer anterior en cada evento de scroll
    clearTimeout(scrollTimeout);
    
    if (scrollTop > threshold) {
        // Mostrar botón si no está visible
        if (!button.classList.contains('floating-visible')) {
            button.classList.add('floating-visible');
            console.log('👁️ Botón flotante mostrado');
        }
        
        // Configurar un nuevo timer para ocultar el botón después de 15 segundos de inactividad
        scrollTimeout = setTimeout(() => {
            button.classList.remove('floating-visible');
            console.log('🙈 Botón flotante ocultado por inactividad');
        }, 15000); // 15000 milisegundos = 15 segundos

    } else {
        // Ocultar botón si está cerca del top
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
    setTimeout(handleScroll, 100); // Llamada inicial para verificar la posición al cargar
    
    console.log('📜 Eventos de scroll configurados');
}

// ===== FUNCIÓN: INICIALIZACIÓN PRINCIPAL =====
function initCompleteSolution() {
    console.log('🚀 Iniciando solución completa...');
    
    try {
        // 1. Configurar menú hamburguesa (solo se activa en móvil por CSS)
        setupHamburgerMenu();
        
        // 2. Crear botón flotante
        createFloatingButton();
        
        // 3. Configurar scroll
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

// Backup para asegurar la creación del botón si se carga tarde
window.addEventListener('load', () => {
    setTimeout(() => {
        if (!document.getElementById('real-floating-back-btn')) {
            createFloatingButton();
            handleScroll(); // Asegurar que la visibilidad se actualice al cargar
        }
    }, 500);
});

// Resize handler para recrear/ocultar el botón en cambios de tamaño de ventana
window.addEventListener('resize', () => {
    // CAMBIO: La lógica del botón flotante ya no depende del tamaño de la ventana,
    // pero mantenemos la lógica para cerrar el menú en pantallas grandes.
    if (window.innerWidth > 768) {
        if (isMenuOpen) closeMenu();
    }
});

// ===== API PÚBLICA (PARA DEPURACIÓN MANUAL EN LA CONSOLA) =====
window.completeSolution = {
    reinit: initCompleteSolution,
    toggleMenu: toggleMenu,
    button: () => document.getElementById('real-floating-back-btn')
};

console.log('✅ Solución completa cargada');

