// SOLUCIÓN DEFINITIVA PARA FORMULARIO MÓVIL - HEADER NO INTERFIERE
console.log('🔥 Iniciando solución DEFINITIVA para formulario móvil...');

// Variables globales
let menuButton;
let mobileMenu;
let isMenuOpen = false;
let isFormActive = false;

// FUNCIÓN 1: MENÚ HAMBURGUESA BÁSICO
function initMenu() {
    console.log('🍔 Inicializando menú...');
    
    menuButton = document.getElementById('mobile-menu');
    mobileMenu = document.getElementById('nav-menu');
    
    if (!menuButton || !mobileMenu) {
        console.error('❌ Elementos del menú no encontrados');
        return;
    }
    
    menuButton.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
    });
    
    // Cerrar menú al hacer click en enlaces
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    console.log('✅ Menú inicializado');
}

function toggleMenu() {
    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

function openMenu() {
    if (isFormActive) {
        exitFormMode();
    }
    
    menuButton.classList.add('active');
    mobileMenu.classList.add('active');
    document.body.classList.add('menu-open');
    isMenuOpen = true;
    
    // Asegurar que header esté visible para el menú
    const header = document.querySelector('.header');
    if (header) {
        header.style.display = 'block';
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.zIndex = '1000';
    }
    
    console.log('📂 Menú abierto');
}

function closeMenu() {
    menuButton.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
    isMenuOpen = false;
    console.log('📁 Menú cerrado');
}

// FUNCIÓN 2: SOLUCIÓN DEFINITIVA PARA FORMULARIOS
function initFormSolution() {
    // Solo aplicar en móviles
    if (window.innerWidth > 768) {
        return;
    }
    
    console.log('🔥 Aplicando solución DEFINITIVA para formularios...');
    
    const header = document.querySelector('.header');
    const contactSection = document.querySelector('.contact-section');
    const formWrapper = document.querySelector('.contact-form-wrapper');
    
    if (!header || !contactSection) {
        console.error('❌ Elementos necesarios no encontrados');
        return;
    }
    
    // FUNCIÓN PARA ACTIVAR MODO FORMULARIO
    function enterFormMode() {
        console.log('🔥 ACTIVANDO modo formulario - Header ELIMINADO');
        
        // 1. OCULTAR HEADER COMPLETAMENTE
        header.style.display = 'none';
        header.style.visibility = 'hidden';
        header.style.opacity = '0';
        header.style.zIndex = '-999';
        header.style.pointerEvents = 'none';
        
        // 2. AJUSTAR BODY Y PÁGINA
        document.body.style.paddingTop = '0';
        document.body.classList.add('form-mode-active');
        
        // 3. MOVER SECCIÓN DE FORMULARIO AL TOP
        contactSection.style.paddingTop = '20px';
        contactSection.style.marginTop = '0';
        
        // 4. SCROLL AL TOP DE LA PÁGINA
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        isFormActive = true;
        console.log('✅ Modo formulario ACTIVADO');
    }
    
    // FUNCIÓN PARA SALIR DEL MODO FORMULARIO
    function exitFormMode() {
        console.log('🔄 DESACTIVANDO modo formulario - Header restaurado');
        
        // 1. RESTAURAR HEADER
        header.style.display = 'block';
        header.style.visibility = 'visible';
        header.style.opacity = '1';
        header.style.zIndex = '1000';
        header.style.pointerEvents = 'auto';
        header.style.position = 'fixed';
        header.style.top = '0';
        
        // 2. RESTAURAR BODY Y PÁGINA
        document.body.style.paddingTop = '';
        document.body.classList.remove('form-mode-active');
        
        // 3. RESTAURAR SECCIÓN DE FORMULARIO
        contactSection.style.paddingTop = '';
        contactSection.style.marginTop = '';
        
        isFormActive = false;
        console.log('✅ Header restaurado');
    }
    
    // DETECTAR CUANDO EL USUARIO INTERACTÚA CON EL FORMULARIO
    
    // 1. Al tocar cualquier parte de la sección de contacto
    if (contactSection) {
        contactSection.addEventListener('touchstart', function(e) {
            if (isMenuOpen) return;
            
            console.log('👆 Touch en sección de contacto');
            enterFormMode();
        }, { passive: true });
        
        contactSection.addEventListener('click', function(e) {
            if (isMenuOpen) return;
            
            console.log('👆 Click en sección de contacto');
            enterFormMode();
        });
    }
    
    // 2. Al hacer scroll cerca del formulario
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (isMenuOpen) return;
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const contactTop = contactSection.offsetTop;
            const scrollPosition = window.pageYOffset + window.innerHeight;
            
            // Si está cerca del formulario, activar modo formulario
            if (scrollPosition > contactTop + 100) {
                if (!isFormActive) {
                    enterFormMode();
                }
            }
        }, 100);
    });
    
    // 3. Al tocar inputs específicamente
    const inputs = document.querySelectorAll('.newsletter-form input, .newsletter-form textarea');
    inputs.forEach((input, index) => {
        // Touch events
        input.addEventListener('touchstart', function(e) {
            if (isMenuOpen) {
                e.preventDefault();
                return;
            }
            
            console.log(`📝 Touch en input ${index + 1}`);
            enterFormMode();
            
            // Enfocar el input después de activar modo formulario
            setTimeout(() => {
                this.focus();
            }, 300);
        }, { passive: false });
        
        // Focus events
        input.addEventListener('focus', function() {
            if (isMenuOpen) {
                this.blur();
                return;
            }
            
            console.log(`📝 Focus en input ${index + 1}`);
            
            if (!isFormActive) {
                enterFormMode();
            }
            
            // Scroll al input después de un momento
            setTimeout(() => {
                this.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 200);
        });
        
        // Blur events
        input.addEventListener('blur', function() {
            console.log(`📝 Blur en input ${index + 1}`);
            // No salir del modo formulario automáticamente
            // El usuario puede salir tocando fuera o navegando
        });
    });
    
    // 4. BOTÓN PARA SALIR DEL MODO FORMULARIO
    function createExitButton() {
        const exitBtn = document.createElement('button');
        exitBtn.id = 'exit-form-mode';
        exitBtn.innerHTML = '✕';
        exitBtn.style.cssText = `
            position: fixed !important;
            top: 15px !important;
            right: 15px !important;
            width: 40px !important;
            height: 40px !important;
            background: #E0FD2C !important;
            color: #000 !important;
            border: none !important;
            border-radius: 50% !important;
            font-size: 20px !important;
            font-weight: bold !important;
            cursor: pointer !important;
            z-index: 9999 !important;
            display: none !important;
            align-items: center !important;
            justify-content: center !important;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3) !important;
            transition: all 0.3s ease !important;
        `;
        
        exitBtn.addEventListener('click', function() {
            exitFormMode();
            this.style.display = 'none';
        });
        
        exitBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            exitFormMode();
            this.style.display = 'none';
        });
        
        document.body.appendChild(exitBtn);
        return exitBtn;
    }
    
    const exitButton = createExitButton();
    
    // Mostrar/ocultar botón de salida
    function updateExitButton() {
        if (isFormActive && !isMenuOpen) {
            exitButton.style.display = 'flex';
        } else {
            exitButton.style.display = 'none';
        }
    }
    
    // Actualizar botón cuando cambie el estado
    const originalEnterFormMode = enterFormMode;
    const originalExitFormMode = exitFormMode;
    
    enterFormMode = function() {
        originalEnterFormMode();
        updateExitButton();
    };
    
    exitFormMode = function() {
        originalExitFormMode();
        updateExitButton();
    };
    
    // 5. SALIR DEL MODO FORMULARIO AL NAVEGAR
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isFormActive) {
                exitFormMode();
            }
        });
    });
    
    // 6. MANEJAR SCROLL HACIA ARRIBA PARA SALIR
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        if (!isFormActive || isMenuOpen) return;
        
        const scrollTop = window.pageYOffset;
        
        // Si scroll hacia arriba y está cerca del top, salir del modo formulario
        if (scrollTop < lastScrollTop && scrollTop < 100) {
            exitFormMode();
        }
        
        lastScrollTop = scrollTop;
    });
    
    console.log('✅ Solución definitiva aplicada');
}

// FUNCIÓN 3: INICIALIZACIÓN
function initAll() {
    console.log('🚀 Iniciando aplicación con solución definitiva...');
    
    initMenu();
    initFormSolution();
    
    console.log('✅ Aplicación inicializada');
}

// EVENTOS PRINCIPALES
document.addEventListener('DOMContentLoaded', initAll);

// Reinicializar al cambiar tamaño
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        // Restaurar todo en desktop
        const header = document.querySelector('.header');
        if (header) {
            header.style.display = 'block';
            header.style.visibility = 'visible';
            header.style.opacity = '1';
            header.style.zIndex = '1000';
            header.style.pointerEvents = 'auto';
        }
        document.body.classList.remove('form-mode-active');
        isFormActive = false;
    } else {
        // Aplicar solución en móvil
        setTimeout(initFormSolution, 100);
    }
});

console.log('🔥 Script de solución DEFINITIVA cargado');
