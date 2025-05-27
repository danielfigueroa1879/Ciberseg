// SOLUCIÓN RADICAL PARA FORMULARIO MÓVIL - ENFOQUE COMPLETAMENTE DIFERENTE
console.log('🔥 Iniciando solución RADICAL para formulario móvil...');

// Variables globales
let menuButton;
let mobileMenu;
let isMenuOpen = false;
let isInputFocused = false;
let activeInput = null;
let originalFormPosition = null;
let formContainer = null;

// DETECCIÓN DE DISPOSITIVO MÓVIL
function isMobileDevice() {
    return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// FUNCIÓN 1: INICIALIZAR MENÚ (BÁSICO)
function initMenu() {
    console.log('📱 Inicializando menú básico...');
    
    menuButton = document.getElementById('mobile-menu');
    mobileMenu = document.getElementById('nav-menu');
    
    if (!menuButton || !mobileMenu) {
        console.error('🚨 ERROR: Elementos del menú no encontrados');
        return;
    }
    
    menuButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });
    
    // Cerrar menú al hacer click en enlaces
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    console.log('✅ Menú básico inicializado');
}

function toggleMenu() {
    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

function openMenu() {
    // Si hay un input enfocado, cerrarlo primero
    if (activeInput) {
        activeInput.blur();
        restoreNormalLayout();
    }
    
    menuButton.classList.add('active');
    mobileMenu.classList.add('active');
    document.body.classList.add('menu-open');
    isMenuOpen = true;
    
    console.log('✅ Menú abierto');
}

function closeMenu() {
    menuButton.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
    isMenuOpen = false;
    
    console.log('✅ Menú cerrado');
}

// FUNCIÓN 2: SOLUCIÓN RADICAL PARA FORMULARIOS
function initRadicalMobileFormFix() {
    if (!isMobileDevice()) {
        console.log('💻 No es móvil, saliendo...');
        return;
    }
    
    console.log('🔥 Iniciando solución RADICAL para formulario móvil...');
    
    const inputs = document.querySelectorAll('.newsletter-form input, .newsletter-form textarea, .contact-form input, .contact-form textarea');
    const header = document.querySelector('.header');
    const body = document.body;
    
    // ESTRATEGIA RADICAL: CREAR UN OVERLAY PARA EL FORMULARIO
    function createFormOverlay(input) {
        console.log('🔥 Creando overlay radical para formulario');
        
        // Remover overlay existente
        removeFormOverlay();
        
        // Crear overlay que cubra toda la pantalla
        const overlay = document.createElement('div');
        overlay.id = 'form-overlay-radical';
        overlay.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            background: rgba(0, 0, 0, 0.95) !important;
            z-index: 999999 !important;
            display: flex !important;
            flex-direction: column !important;
            padding: 20px !important;
            box-sizing: border-box !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
        `;
        
        // Crear contenedor del formulario en el overlay
        const formWrapper = document.createElement('div');
        formWrapper.style.cssText = `
            background: linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05)) !important;
            border: 2px solid #E0FD2C !important;
            border-radius: 15px !important;
            padding: 25px !important;
            margin: auto !important;
            max-width: 400px !important;
            width: 100% !important;
            backdrop-filter: blur(10px) !important;
        `;
        
        // Título
        const title = document.createElement('h2');
        title.textContent = 'Formulario de Inscripción';
        title.style.cssText = `
            color: #E0FD2C !important;
            font-size: 22px !important;
            margin-bottom: 20px !important;
            text-align: center !important;
            font-family: 'Poppins', sans-serif !important;
        `;
        
        // Botón cerrar
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.style.cssText = `
            position: absolute !important;
            top: 15px !important;
            right: 15px !important;
            background: #E0FD2C !important;
            color: #000 !important;
            border: none !important;
            width: 35px !important;
            height: 35px !important;
            border-radius: 50% !important;
            font-size: 18px !important;
            font-weight: bold !important;
            cursor: pointer !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        `;
        
        closeBtn.onclick = function() {
            removeFormOverlay();
        };
        
        // Crear formulario clonado pero funcional
        const newForm = createRadicalForm();
        
        // Ensamblar overlay
        formWrapper.appendChild(closeBtn);
        formWrapper.appendChild(title);
        formWrapper.appendChild(newForm);
        overlay.appendChild(formWrapper);
        
        // Agregar al body
        document.body.appendChild(overlay);
        
        // Enfocar primer input después de un momento
        setTimeout(() => {
            const firstInput = newForm.querySelector('input[type="text"]');
            if (firstInput) {
                firstInput.focus();
            }
        }, 300);
        
        return overlay;
    }
    
    // CREAR FORMULARIO COMPLETAMENTE NUEVO
    function createRadicalForm() {
        const form = document.createElement('form');
        form.className = 'radical-form';
        form.method = 'post';
        form.setAttribute('data-netlify', 'true');
        form.setAttribute('name', 'suscripcion');
        form.setAttribute('netlify-honeypot', 'bot-field2');
        
        form.style.cssText = `
            display: flex !important;
            flex-direction: column !important;
            gap: 18px !important;
        `;
        
        // Campo anti-spam oculto
        const honeyPot = document.createElement('div');
        honeyPot.style.display = 'none';
        honeyPot.innerHTML = '<label>No llenes este campo si eres humano: <input name="bot-field2" /></label>';
        form.appendChild(honeyPot);
        
        // Crear inputs
        const inputs = [
            { type: 'text', name: 'nombre', placeholder: 'Nombre', required: true },
            { type: 'email', name: 'email', placeholder: 'Email', required: true },
            { type: 'tel', name: 'telefono', placeholder: 'Teléfono' },
            { type: 'text', name: 'asunto', placeholder: 'Asunto', value: 'Suscripción' }
        ];
        
        inputs.forEach(inputData => {
            const input = document.createElement('input');
            input.type = inputData.type;
            input.name = inputData.name;
            input.placeholder = inputData.placeholder;
            if (inputData.required) input.required = true;
            if (inputData.value) input.value = inputData.value;
            
            input.style.cssText = `
                width: 100% !important;
                padding: 16px 18px !important;
                border: 2px solid rgba(224, 253, 44, 0.3) !important;
                border-radius: 8px !important;
                background-color: rgba(255,255,255,0.1) !important;
                color: #fff !important;
                font-family: 'Poppins', sans-serif !important;
                font-size: 16px !important;
                font-weight: 500 !important;
                min-height: 50px !important;
                box-sizing: border-box !important;
                -webkit-appearance: none !important;
            `;
            
            // Eventos de foco mejorados
            input.addEventListener('focus', function() {
                this.style.borderColor = '#E0FD2C';
                this.style.boxShadow = '0 0 0 3px rgba(224, 253, 44, 0.3)';
                this.style.backgroundColor = 'rgba(255,255,255,0.2)';
            });
            
            input.addEventListener('blur', function() {
                this.style.borderColor = 'rgba(224, 253, 44, 0.3)';
                this.style.boxShadow = 'none';
                this.style.backgroundColor = 'rgba(255,255,255,0.1)';
            });
            
            form.appendChild(input);
        });
        
        // Textarea
        const textarea = document.createElement('textarea');
        textarea.name = 'mensaje';
        textarea.placeholder = 'Escribe tu mensaje aquí...';
        textarea.rows = 4;
        textarea.required = true;
        
        textarea.style.cssText = `
            width: 100% !important;
            padding: 16px 18px !important;
            border: 2px solid rgba(224, 253, 44, 0.3) !important;
            border-radius: 8px !important;
            background-color: rgba(255,255,255,0.1) !important;
            color: #fff !important;
            font-family: 'Poppins', sans-serif !important;
            font-size: 16px !important;
            font-weight: 500 !important;
            min-height: 100px !important;
            box-sizing: border-box !important;
            resize: none !important;
            -webkit-appearance: none !important;
        `;
        
        textarea.addEventListener('focus', function() {
            this.style.borderColor = '#E0FD2C';
            this.style.boxShadow = '0 0 0 3px rgba(224, 253, 44, 0.3)';
            this.style.backgroundColor = 'rgba(255,255,255,0.2)';
        });
        
        textarea.addEventListener('blur', function() {
            this.style.borderColor = 'rgba(224, 253, 44, 0.3)';
            this.style.boxShadow = 'none';
            this.style.backgroundColor = 'rgba(255,255,255,0.1)';
        });
        
        form.appendChild(textarea);
        
        // Botón submit
        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.textContent = 'SUSCRIBIRSE';
        
        submitBtn.style.cssText = `
            background-color: #E0FD2C !important;
            color: #000 !important;
            border: none !important;
            padding: 16px 32px !important;
            font-size: 16px !important;
            font-weight: 700 !important;
            cursor: pointer !important;
            border-radius: 8px !important;
            transition: all 0.3s ease !important;
            text-transform: uppercase !important;
            letter-spacing: 1px !important;
            margin-top: 10px !important;
            min-height: 50px !important;
            font-family: 'Poppins', sans-serif !important;
        `;
        
        submitBtn.addEventListener('mousedown', function() {
            this.style.backgroundColor = '#C7E525';
            this.style.transform = 'translateY(1px)';
        });
        
        submitBtn.addEventListener('mouseup', function() {
            this.style.backgroundColor = '#E0FD2C';
            this.style.transform = 'translateY(0)';
        });
        
        // Manejar envío
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Mostrar mensaje de éxito
            const successMsg = document.createElement('div');
            successMsg.style.cssText = `
                background: #4CAF50 !important;
                color: white !important;
                padding: 15px !important;
                border-radius: 8px !important;
                text-align: center !important;
                margin-top: 15px !important;
                font-family: 'Poppins', sans-serif !important;
            `;
            successMsg.textContent = '¡Mensaje enviado con éxito!';
            
            form.appendChild(successMsg);
            
            // Cerrar overlay después de 2 segundos
            setTimeout(() => {
                removeFormOverlay();
            }, 2000);
            
            // Enviar formulario real si es posible
            try {
                fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(new FormData(form)).toString()
                });
            } catch (error) {
                console.log('Error enviando formulario:', error);
            }
        });
        
        form.appendChild(submitBtn);
        return form;
    }
    
    // REMOVER OVERLAY
    function removeFormOverlay() {
        const existing = document.getElementById('form-overlay-radical');
        if (existing) {
            existing.remove();
        }
        isInputFocused = false;
        activeInput = null;
        
        // Restaurar header si está oculto
        const header = document.querySelector('.header');
        if (header) {
            header.style.display = '';
            header.style.visibility = '';
            header.style.opacity = '';
            header.style.transform = '';
            header.style.zIndex = '';
        }
        
        document.body.classList.remove('form-input-active', 'header-hidden');
    }
    
    // FUNCIÓN PARA RESTAURAR LAYOUT NORMAL
    function restoreNormalLayout() {
        removeFormOverlay();
    }
    
    // APLICAR LISTENERS A INPUTS ORIGINALES
    inputs.forEach((input, index) => {
        // Reemplazar evento focus con overlay
        input.addEventListener('focus', function(e) {
            if (isMenuOpen) {
                this.blur();
                return;
            }
            
            console.log(`🔥 Input ${index + 1} enfocado - CREANDO OVERLAY`);
            
            // Desenfocar inmediatamente para evitar problemas
            this.blur();
            
            // Crear overlay después de un momento
            setTimeout(() => {
                activeInput = this;
                isInputFocused = true;
                createFormOverlay(this);
            }, 100);
            
        }, { passive: false });
        
        // Prevenir touch cuando menú abierto
        input.addEventListener('touchstart', function(e) {
            if (isMenuOpen) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, { passive: false });
    });
    
    // CERRAR OVERLAY CON ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.getElementById('form-overlay-radical')) {
            removeFormOverlay();
        }
    });
    
    // CERRAR OVERLAY AL HACER CLICK FUERA
    document.addEventListener('click', function(e) {
        const overlay = document.getElementById('form-overlay-radical');
        if (overlay && e.target === overlay) {
            removeFormOverlay();
        }
    });
    
    console.log('✅ Solución radical aplicada a', inputs.length, 'inputs');
}

// FUNCIÓN 3: INICIALIZACIÓN COMPLETA
function initAll() {
    console.log('🚀 Iniciando aplicación con solución radical...');
    
    setTimeout(() => {
        initMenu();
        initRadicalMobileFormFix(); // ← SOLUCIÓN RADICAL
        
        console.log('🎉 Aplicación con solución radical inicializada');
    }, 100);
}

// MANEJO DE REDIMENSIONAMIENTO
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        // Cerrar menú y overlay en desktop
        if (isMenuOpen) {
            closeMenu();
        }
        removeFormOverlay();
    }
});

// INICIALIZACIÓN AUTOMÁTICA
document.addEventListener('DOMContentLoaded', initAll);

console.log('🔥 Script de solución RADICAL cargado');
