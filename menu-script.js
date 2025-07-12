// ===== SOLUCIÓN COMPLETA: MENÚ HAMBURGUESA + BOTÓN FLOTANTE =====

console.log('🔧 Iniciando solución completa...');

// ===== VARIABLES GLOBALES =====
let isMenuOpen = false;
let menuButton, mobileMenu;

// La función `applyCompleteSolutionCSS` se ha eliminado de aquí porque el CSS ahora está directamente en `styles.css`.

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
        '#real-floating-back-btn, .scroll-to-top, #scrollToTop, #dynamic-scroll-btn' // Asegurar que el ID anterior también se elimine
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
    setTimeout(handleScroll, 100); // Llamada inicial para verificar la posición al cargar
    
    console.log('📜 Eventos de scroll configurados');
}

// ===== FUNCIÓN: INICIALIZACIÓN PRINCIPAL =====
function initCompleteSolution() {
    console.log('🚀 Iniciando solución completa...');
    
    try {
        // La aplicación del CSS ahora se maneja directamente en styles.css
        
        // 1. Configurar menú hamburguesa
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
        if (!document.getElementById('real-floating-back-btn') && window.innerWidth <= 768) {
            createFloatingButton();
            handleScroll(); // Asegurar que la visibilidad se actualice al cargar
        }
    }, 500);
});

// Resize handler para recrear/ocultar el botón en cambios de tamaño de ventana
window.addEventListener('resize', () => {
    const button = document.getElementById('real-floating-back-btn');
    
    if (window.innerWidth > 768) {
        if (button) button.remove();
        if (isMenuOpen) closeMenu();
    } else {
        if (!button) createFloatingButton();
        handleScroll(); // Actualizar visibilidad al redimensionar
    }
});

// ===== API PÚBLICA (PARA DEPURACIÓN MANUAL EN LA CONSOLA) =====
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
