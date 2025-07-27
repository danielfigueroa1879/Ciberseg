// ===== CHATBOT ULTRA OPTIMIZADO PARA MÓVILES =====
// Versión 2.0 - Máximo rendimiento y fluidez

console.log("🤖 Iniciando chatbot ultra optimizado...");

// ===== VARIABLES GLOBALES OPTIMIZADAS =====
let chatElements = {};
let isProcessing = false;
let messageQueue = [];
let scrollObserver = null;

// Cache para evitar múltiples consultas DOM
const elementCache = new Map();

// ===== FUNCIONES DE UTILIDAD OPTIMIZADAS =====
function getCachedElement(id) {
    if (!elementCache.has(id)) {
        const element = document.getElementById(id);
        if (element) {
            elementCache.set(id, element);
        }
    }
    return elementCache.get(id);
}

// Throttle optimizado para scroll del chat
function throttleScroll(func, limit = 16) {
    let inThrottle;
    return function() {
        if (!inThrottle) {
            func.apply(this, arguments);
            inThrottle = true;
            requestAnimationFrame(() => inThrottle = false);
        }
    }
}

// Debounce para entrada de texto
function debounceInput(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== INICIALIZACIÓN OPTIMIZADA =====
function initChatbot() {
    // Cache de elementos críticos
    chatElements = {
        toggleButton: getCachedElement('chat-toggle-button'),
        container: getCachedElement('chatbot-container'),
        closeBtn: getCachedElement('close-chat-btn'),
        form: getCachedElement('chatbot-form'),
        input: getCachedElement('chatbot-input'),
        messages: getCachedElement('chatbot-messages'),
        loading: getCachedElement('chatbot-loading')
    };

    // Verificación de elementos críticos
    const requiredElements = Object.keys(chatElements);
    const missingElements = requiredElements.filter(key => !chatElements[key]);
    
    if (missingElements.length > 0) {
        console.error("❌ Elementos del chatbot faltantes:", missingElements);
        return false;
    }

    // Configurar event listeners optimizados
    setupEventListeners();
    
    // Optimizar scroll del chat
    setupScrollOptimization();
    
    // Configurar lazy loading del video
    setupVideoOptimization();
    
    console.log("✅ Chatbot ultra optimizado inicializado");
    return true;
}

// ===== EVENT LISTENERS OPTIMIZADOS =====
function setupEventListeners() {
    // Toggle chatbot con optimización touch
    chatElements.toggleButton.addEventListener('click', handleToggleChat, { 
        passive: false 
    });
    
    // Soporte para touch en móviles
    chatElements.toggleButton.addEventListener('touchstart', handleToggleChat, { 
        passive: true 
    });

    // Cerrar chatbot optimizado
    chatElements.closeBtn.addEventListener('click', handleCloseChat, { 
        passive: false 
    });

    // Form submission optimizado
    chatElements.form.addEventListener('submit', handleFormSubmit, { 
        passive: false 
    });
    
    // Input optimization con debounce para validación
    const debouncedValidation = debounceInput(validateInput, 300);
    chatElements.input.addEventListener('input', debouncedValidation, { 
        passive: true 
    });
    
    // Optimización para Enter key
    chatElements.input.addEventListener('keydown', handleKeyDown, { 
        passive: false 
    });
}

// ===== MANEJADORES DE EVENTOS OPTIMIZADOS =====
function handleToggleChat(e) {
    e.preventDefault();
    e.stopPropagation();
    
    requestAnimationFrame(() => {
        chatElements.container.classList.toggle('active');
        
        // Auto-focus optimizado para mejor UX móvil
        if (chatElements.container.classList.contains('active')) {
            setTimeout(() => {
                if (window.innerWidth > 768) { // Solo en desktop
                    chatElements.input.focus();
                }
            }, 100);
        }
    });
}

function handleCloseChat(e) {
    e.preventDefault();
    e.stopPropagation();
    
    requestAnimationFrame(() => {
        chatElements.container.classList.remove('active');
    });
}

function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleFormSubmit(e);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    if (isProcessing) {
        console.log("⏳ Procesando mensaje anterior...");
        return;
    }
    
    const userInput = chatElements.input.value.trim();
    
    if (userInput) {
        // Agregar a cola de mensajes para procesamiento optimizado
        messageQueue.push({
            text: userInput,
            type: 'user',
            timestamp: Date.now()
        });
        
        // Limpiar input inmediatamente para mejor UX
        chatElements.input.value = '';
        
        // Procesar cola de mensajes
        processMessageQueue();
    }
}

function validateInput(e) {
    const input = e.target.value;
    // Validación básica sin impacto en rendimiento
    if (input.length > 500) {
        e.target.value = input.substring(0, 500);
    }
}

// ===== PROCESAMIENTO DE MENSAJES OPTIMIZADO =====
function processMessageQueue() {
    if (messageQueue.length === 0 || isProcessing) return;
    
    isProcessing = true;
    const message = messageQueue.shift();
    
    // Agregar mensaje del usuario
    addMessageOptimized(message.text, 'user');
    
    // Obtener respuesta de IA de manera asíncrona
    requestAnimationFrame(() => {
        getAIResponse(message.text);
    });
}

function addMessageOptimized(text, sender) {
    // Crear elemento de mensaje de manera eficiente
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;
    
    const p = document.createElement('p');
    
    let messageText = text;
    let shouldAddButton = false;

    if (sender === 'bot') {
        // Procesar marcadores de botón
        if (text.includes('[CONTACT_BUTTON]')) {
            messageText = text.replace('[CONTACT_BUTTON]', '');
            shouldAddButton = true;
        }
        p.innerHTML = messageText;
        p.style.textAlign = 'justify';
    } else {
        p.textContent = text;
    }

    messageElement.appendChild(p);

    // Agregar botón si es necesario
    if (shouldAddButton) {
        const contactButton = createContactButton();
        messageElement.appendChild(contactButton);
    }

    // Usar DocumentFragment para inserción eficiente
    const fragment = document.createDocumentFragment();
    fragment.appendChild(messageElement);
    
    requestAnimationFrame(() => {
        chatElements.messages.appendChild(fragment);
        scrollToBottomOptimized();
    });
}

function createContactButton() {
    const contactButton = document.createElement('button');
    contactButton.textContent = 'Ir al Formulario';
    
    // Aplicar estilos de manera eficiente
    const buttonStyles = {
        backgroundColor: '#E0FD2C',
        color: '#0f0f0f',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '20px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '10px',
        transition: 'background-color 0.2s, transform 0.2s',
        fontSize: '14px'
    };
    
    Object.assign(contactButton.style, buttonStyles);

    // Event listeners optimizados
    contactButton.addEventListener('mouseenter', () => {
        contactButton.style.backgroundColor = '#C7E525';
        contactButton.style.transform = 'scale(1.05)';
    }, { passive: true });
    
    contactButton.addEventListener('mouseleave', () => {
        contactButton.style.backgroundColor = '#E0FD2C';
        contactButton.style.transform = 'scale(1)';
    }, { passive: true });

    contactButton.addEventListener('click', handleContactButtonClick, { 
        passive: false 
    });

    return contactButton;
}

function handleContactButtonClick() {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
        // Scroll optimizado
        contactSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start' 
        });
    }
    
    // Cerrar chatbot con animación suave
    requestAnimationFrame(() => {
        chatElements.container.classList.remove('active');
    });
}

// ===== SCROLL OPTIMIZATION =====
function setupScrollOptimization() {
    // Intersection Observer para scroll inteligente
    if ('IntersectionObserver' in window) {
        scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Elemento visible, continuar scroll normal
                } else {
                    // Optimizar scroll cuando no es visible
                }
            });
        }, {
            root: chatElements.messages,
            threshold: 0.1
        });
    }
}

function scrollToBottomOptimized() {
    // Usar requestAnimationFrame para scroll suave
    requestAnimationFrame(() => {
        const scrollHeight = chatElements.messages.scrollHeight;
        const clientHeight = chatElements.messages.clientHeight;
        
        if (scrollHeight > clientHeight) {
            chatElements.messages.scrollTo({
                top: scrollHeight,
                behavior: 'smooth'
            });
        }
    });
}

// ===== OPTIMIZACIÓN DE VIDEO =====
function setupVideoOptimization() {
    const video = chatElements.toggleButton.querySelector('video');
    if (!video) return;
    
    // Lazy loading del video para mejor rendimiento inicial
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                if (video.paused) {
                    video.play().catch(e => {
                        console.log("🎥 Video autoplay bloqueado:", e.message);
                    });
                }
                videoObserver.unobserve(video);
            }
        });
    });
    
    videoObserver.observe(video);
    
    // Optimización para dispositivos con batería baja
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            if (battery.level < 0.2) {
                video.pause();
                console.log("🔋 Video pausado por batería baja");
            }
        });
    }
}

// ===== RESPUESTA DE IA OPTIMIZADA =====
async function getAIResponse(userInput) {
    // Mostrar loading de manera optimizada
    showLoadingOptimized();
    
    const prompt = buildPrompt(userInput);
    const apiKey = "AIzaSyAq7n6WM4WuPKR0CZzIUgAUdI53fm4CpoA";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
        // Fetch optimizado con timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        
        // Extraer respuesta de manera segura
        let botResponse;
        if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
            botResponse = result.candidates[0].content.parts[0].text;
        } else {
            console.error("Respuesta de la API inesperada:", result);
            botResponse = 'Lo siento, no pude procesar la respuesta. Inténtalo de nuevo.';
        }
        
        // Agregar respuesta con delay para mejor UX
        setTimeout(() => {
            addMessageOptimized(botResponse, 'bot');
            hideLoadingOptimized();
            isProcessing = false;
            
            // Procesar siguiente mensaje en cola si existe
            if (messageQueue.length > 0) {
                setTimeout(processMessageQueue, 500);
            }
        }, 800);

    } catch (error) {
        console.error('Error al contactar la IA:', error);
        
        let errorMessage = 'Hubo un problema al conectar con el asistente.';
        if (error.name === 'AbortError') {
            errorMessage = 'La consulta tardó demasiado. Intenta con una pregunta más corta.';
        }
        
        setTimeout(() => {
            addMessageOptimized(`${errorMessage} Por favor, intenta de nuevo más tarde.`, 'bot');
            hideLoadingOptimized();
            isProcessing = false;
        }, 500);
    }
}

function buildPrompt(userInput) {
    return `Eres un asistente virtual para RECYBERSEG, una empresa chilena de ciberseguridad. Tu nombre es 'Cyber Asistente'.
    IMPORTANTE: Debes formatear tus respuestas usando etiquetas HTML. Usa <strong>palabra</strong> para poner texto en negrita y usa <br> para los saltos de línea, especialmente en las listas.
    Cuando listes servicios, usa el formato "1.- <strong>Servicio:</strong> Descripción.<br>".

    Si el usuario pregunta cómo contactar, hablar con alguien, o solicitar una cotización, responde amablemente indicando que pueden usar el formulario de contacto y, al final de tu mensaje, incluye el texto especial [CONTACT_BUTTON] para que se genere un botón.
    Ejemplo de respuesta de contacto: "¡Por supuesto! Para contactarnos o solicitar una cotización, puedes rellenar nuestro formulario y un especialista se comunicará contigo a la brevedad. También encontrarás nuestros datos de contacto directo en esa sección.<br>[CONTACT_BUTTON]"

    Responde a las preguntas de los usuarios sobre nuestros servicios, que incluyen:
    1.- <strong>Auditorías de Seguridad:</strong> Evaluación completa de infraestructura digital.<br>
    2.- <strong>Monitoreo de Redes:</strong> Supervisión 24/7.<br>
    3.- <strong>Consultoría en Ciberseguridad:</strong> Asesoramiento experto y personalizado.<br>
    4.- <strong>Implementación de Sistemas de Seguridad:</strong> Configuración de firewalls, etc.<br>
    5.- <strong>Seguridad IoT:</strong> Protección de dispositivos inteligentes.<br>

    Nuestra misión es proteger el ecosistema digital de nuestros clientes con soluciones innovadoras.
    Nuestra visión es ser líderes en soluciones tecnológicas de seguridad digital.

    Sé amable, profesional y conciso. Si no sabes la respuesta, di que consultarás con un especialista. No inventes información. Responde en español.

    Aquí está la pregunta del usuario: "${userInput}"`;
}

// ===== LOADING OPTIMIZADO =====
function showLoadingOptimized() {
    requestAnimationFrame(() => {
        chatElements.loading.style.display = 'flex';
        scrollToBottomOptimized();
    });
}

function hideLoadingOptimized() {
    requestAnimationFrame(() => {
        chatElements.loading.style.display = 'none';
    });
}

// ===== INICIALIZACIÓN CON LIFECYCLE OPTIMIZATION =====
function handleDOMReady() {
    // Usar requestIdleCallback si está disponible
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            initChatbot();
        }, { timeout: 2000 });
    } else {
        // Fallback para navegadores sin soporte
        setTimeout(initChatbot, 100);
    }
}

// ===== CLEANUP Y OPTIMIZACIÓN DE MEMORIA =====
function cleanup() {
    // Limpiar observers
    if (scrollObserver) {
        scrollObserver.disconnect();
        scrollObserver = null;
    }
    
    // Limpiar cache
    elementCache.clear();
    
    // Limpiar cola de mensajes
    messageQueue.length = 0;
    
    console.log("🧹 Chatbot cleanup realizado");
}

// ===== INICIALIZACIÓN AUTOMÁTICA =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleDOMReady, { once: true });
} else {
    handleDOMReady();
}

// Cleanup al descargar página
window.addEventListener('beforeunload', cleanup, { once: true, passive: true });

// API pública para debugging
window.chatbotOptimized = {
    reinit: initChatbot,
    cleanup: cleanup,
    isProcessing: () => isProcessing,
    queueLength: () => messageQueue.length,
    cache: elementCache
};

console.log("✅ Chatbot ultra optimizado cargado");

// ===== OPTIMIZACIONES ADICIONALES =====

// Preload de recursos del chatbot
function preloadChatbotResources() {
    // Precargar video del botón si no está ya cargado
    const video = document.querySelector('#chat-toggle-button video');
    if (video && video.readyState < 3) {
        video.load();
    }
}

// Performance monitoring
function monitorPerformance() {
    if ('performance' in window && 'mark' in performance) {
        performance.mark('chatbot-init-start');
        
        setTimeout(() => {
            performance.mark('chatbot-init-end');
            performance.measure('chatbot-init', 'chatbot-init-start', 'chatbot-init-end');
            
            const measure = performance.getEntriesByName('chatbot-init')[0];
            console.log(`⚡ Chatbot inicializado en ${measure.duration.toFixed(2)}ms`);
        }, 1000);
    }
}

// Iniciar monitoring y preload
if (document.readyState === 'complete') {
    preloadChatbotResources();
    monitorPerformance();
} else {
    window.addEventListener('load', () => {
        preloadChatbotResources();
        monitorPerformance();
    }, { once: true, passive: true });
}
