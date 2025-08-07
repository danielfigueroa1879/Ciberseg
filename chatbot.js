// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    console.log("Chatbot script loaded and DOM is ready.");

    // Obtener referencias a todos los elementos HTML necesarios
    const chatToggleButton = document.getElementById('chat-toggle-button');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const loadingIndicator = document.getElementById('chatbot-loading');

    // Verificar si todos los elementos del chatbot existen
    if (!chatToggleButton || !chatbotContainer || !closeChatBtn || !chatbotForm || !chatbotInput || !chatbotMessages || !loadingIndicator) {
        console.error("Error: No se encontraron uno o más elementos del chatbot en el DOM. Verifica los IDs en tu HTML.");
        return; // Detener la ejecución si falta un elemento crucial
    }

    // --- Event Listeners ---

    // Alternar la visibilidad del chatbot al hacer clic en el botón flotante
    chatToggleButton.addEventListener('click', () => {
        chatbotContainer.classList.toggle('active');
    });

    // Cerrar el chatbot al hacer clic en el botón de cerrar
    closeChatBtn.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
    });

    // Manejar el envío del formulario para enviar un mensaje
    chatbotForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevenir que el formulario recargue la página
        const userInput = chatbotInput.value.trim(); // Obtener la entrada del usuario y eliminar espacios en blanco

        if (userInput) {
            // Si hay entrada, agregar el mensaje del usuario al chat y obtener una respuesta de la IA
            addMessage(userInput, 'user');
            chatbotInput.value = ''; // Limpiar el campo de entrada
            getAIResponse(userInput); // Llamar a la función que usa la API
        }
    });

    // --- Funciones Principales ---

    /**
     * Agrega un mensaje a la ventana del chat y, opcionalmente, un botón.
     * @param {string} text - El texto del mensaje.
     * @param {string} sender - El remitente del mensaje ('user' o 'bot').
     */
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        const p = document.createElement('p');
        
        let messageText = text;

        if (sender === 'bot') {
            // Revisa si el texto del bot incluye el marcador para el botón
            if (text.includes('[CONTACT_BUTTON]')) {
                // Remueve el marcador del texto que se va a mostrar
                messageText = text.replace('[CONTACT_BUTTON]', '');
            }
            p.innerHTML = messageText;
            p.style.textAlign = 'justify';
            
            // 🎤 NUEVA FUNCIONALIDAD: Reproducir voz automáticamente
            if (window.chatbotVoice && window.chatbotVoice.isEnabled) {
                setTimeout(() => {
                    window.chatbotVoice.speak(messageText);
                }, 800); // Delay para que aparezca el mensaje primero
            }
        } else {
            p.textContent = text;
        }

        messageElement.appendChild(p);

        // Si el marcador estaba presente, crea y añade el botón
        if (sender === 'bot' && text.includes('[CONTACT_BUTTON]')) {
            const contactButton = document.createElement('button');
            contactButton.textContent = 'Ir al Formulario';
            
            // Estilos para el botón
            Object.assign(contactButton.style, {
                backgroundColor: '#3182ce',
                color: '#fff',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '20px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '10px',
                transition: 'background-color 0.3s, transform 0.3s'
            });

            // Efecto hover
            contactButton.onmouseover = () => {
                contactButton.style.backgroundColor = '#4299e1';
                contactButton.style.transform = 'scale(1.05)';
            };
            contactButton.onmouseout = () => {
                contactButton.style.backgroundColor = '#3182ce';
                contactButton.style.transform = 'scale(1)';
            };

            // Funcionalidad al hacer clic
            contactButton.addEventListener('click', () => {
                const contactSection = document.getElementById('contacto');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
                // Cierra la ventana del chatbot
                chatbotContainer.classList.remove('active');
            });

            messageElement.appendChild(contactButton);
        }

        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Auto-scroll hacia el último mensaje
    }

    // Hacer la función addMessage globalmente accesible para el sistema de voz
    window.addMessage = addMessage;

    /**
     * Obtiene una respuesta de la IA de Gemini usando la clave de API proporcionada.
     * @param {string} userInput - El texto de entrada del usuario.
     */
    async function getAIResponse(userInput) {
        loadingIndicator.style.display = 'flex';
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        // Contexto e instrucción para el modelo de IA, indicando el uso de HTML y el botón.
        const prompt = `Eres un asistente virtual para RECYBERSEG, una empresa chilena de ciberseguridad. Tu nombre es 'Cyber Asistente'.
        IMPORTANTE: Debes formatear tus respuestas usando etiquetas HTML. Usa <strong>palabra</strong> para poner texto en negrita y usa <br> para los saltos de línea, especialmente en las listas.
        Cuando listes servicios, usa el formato "1.- <strong>Servicio:</strong> Descripción.<br>".

        INSTRUCCIONES ESPECIALES PARA VOZ:
        - Habla de manera natural y conversacional
        - Usa frases cortas y claras para mejor comprensión auditiva
        - Evita abreviaciones complicadas
        - Pronuncia "RECYBERSEG" como "Reci-Ber-Seg"
        - Cuando menciones "IoT", di "Internet de las Cosas"
        - Para "24/7", di "veinticuatro horas, siete días"

        Si el usuario pregunta cómo contactar, hablar con alguien, o solicitar una cotización, responde amablemente indicando que pueden usar el formulario de contacto y, al final de tu mensaje, incluye el texto especial [CONTACT_BUTTON] para que se genere un botón.
        Ejemplo de respuesta de contacto: "¡Por supuesto! Para contactarnos o solicitar una cotización, puedes rellenar nuestro formulario y un especialista se comunicará contigo a la brevedad. También encontrarás nuestros datos de contacto directo en esa sección.<br>[CONTACT_BUTTON]"

        Responde a las preguntas de los usuarios sobre nuestros servicios, que incluyen:
        1.- <strong>Auditorías de Seguridad:</strong> Evaluación completa de infraestructura digital.<br>
        2.- <strong>Monitoreo de Redes:</strong> Supervisión veinticuatro horas, siete días.<br>
        3.- <strong>Consultoría en Ciberseguridad:</strong> Asesoramiento experto y personalizado.<br>
        4.- <strong>Implementación de Sistemas de Seguridad:</strong> Configuración de firewalls, etc.<br>
        5.- <strong>Seguridad Internet de las Cosas:</strong> Protección de dispositivos inteligentes.<br>

        Nuestra misión es proteger el ecosistema digital de nuestros clientes con soluciones innovadoras.
        Nuestra visión es ser líderes en soluciones tecnológicas de seguridad digital.

        Sé amable, profesional y conciso. Si no sabes la respuesta, di que consultarás con un especialista. No inventes información. Responde en español.

        Aquí está la pregunta del usuario: "${userInput}"`;

        // Clave de API proporcionada por el usuario
        const apiKey = "AIzaSyAq7n6WM4WuPKR0CZzIUgAUdI53fm4CpoA";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        try {
            // Preparar el payload para la API de Gemini
            const payload = {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            };

            // Realizar la llamada a la API
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            
            // Extraer el texto de la respuesta de la API de forma segura
            let botResponse;
            if (result.candidates && result.candidates[0] && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts[0]) {
                botResponse = result.candidates[0].content.parts[0].text;
            } else {
                console.error("Respuesta de la API inesperada:", result);
                botResponse = 'Lo siento, no pude procesar la respuesta. Inténtalo de nuevo.';
            }
            
            // Agregar la respuesta del bot al chat
            addMessage(botResponse, 'bot');

        } catch (error) {
            console.error('Error al contactar la IA:', error);
            const errorMessage = `Hubo un problema al conectar con el asistente. Por favor, intenta de nuevo más tarde. (Error: ${error.message})`;
            addMessage(errorMessage, 'bot');
        } finally {
            // Ocultar el indicador de carga
            loadingIndicator.style.display = 'none';
        }
    }

    // 🎤 SISTEMA DE VOZ INTEGRADO
    console.log('🎤 Inicializando sistema de voz...');
});

// 🎤 CLASE SISTEMA DE VOZ CHATBOT
class ChatbotVoice {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voices = [];
        this.selectedVoice = null;
        this.isEnabled = localStorage.getItem('chatbot-voice-enabled') !== 'false';
        this.isSpeaking = false;
        this.currentUtterance = null;
        
        // Configuración de voz optimizada para hombre
        this.voiceConfig = {
            rate: 0.85,          // Velocidad natural masculina
            pitch: 0.7,          // Tono más grave/masculino
            volume: 0.9,         // Volumen claro
            lang: 'es-ES'        // Español de España
        };
        
        this.init();
    }

    async init() {
        await this.loadVoices();
        // Esperar a que el chatbot esté disponible
        const initControls = () => {
            if (document.querySelector('.chatbot-header')) {
                this.createVoiceControls();
                console.log('🎤 Sistema de voz completamente inicializado');
            } else {
                setTimeout(initControls, 1000);
            }
        };
        setTimeout(initControls, 2000);
    }

    async loadVoices() {
        return new Promise((resolve) => {
            const loadVoicesNow = () => {
                this.voices = this.synth.getVoices();
                this.selectBestMaleVoice();
                resolve();
            };

            if (this.voices.length === 0) {
                this.synth.onvoiceschanged = loadVoicesNow;
                setTimeout(loadVoicesNow, 1500);
            } else {
                loadVoicesNow();
            }
        });
    }

    selectBestMaleVoice() {
        // Prioridades de voces masculinas (orden de preferencia)
        const maleVoicePreferences = [
            'Microsoft Pablo',
            'Pablo',
            'Diego',
            'Jorge',
            'Carlos',
            'Google español',
            'Spanish Spain Male',
            'es-ES-Standard-B',
            'es-ES-Wavenet-B',
            'es-ES-Neural2-B',
            'Microsoft David',
            'Google UK English Male',
            'Alex',
            'Daniel'
        ];

        // Buscar la mejor voz masculina
        for (const preferredName of maleVoicePreferences) {
            const voice = this.voices.find(v => 
                v.name.toLowerCase().includes(preferredName.toLowerCase()) || 
                v.voiceURI.toLowerCase().includes(preferredName.toLowerCase())
            );
            if (voice) {
                this.selectedVoice = voice;
                console.log(`🎯 Voz masculina seleccionada: ${voice.name} (${voice.lang})`);
                return;
            }
        }

        // Backup: buscar cualquier voz masculina en español
        const spanishMaleVoice = this.voices.find(voice => {
            const name = voice.name.toLowerCase();
            return voice.lang.startsWith('es') && 
                   (name.includes('male') || name.includes('man') || name.includes('masc'));
        });

        if (spanishMaleVoice) {
            this.selectedVoice = spanishMaleVoice;
            console.log(`🎯 Voz masculina española: ${spanishMaleVoice.name}`);
        } else {
            // Último recurso: primera voz en español
            this.selectedVoice = this.voices.find(v => v.lang.startsWith('es')) || this.voices[0];
            console.log(`⚠️ Usando voz de respaldo: ${this.selectedVoice?.name || 'default'}`);
        }
    }

    createVoiceControls() {
        const chatbotHeader = document.querySelector('.chatbot-header');
        if (!chatbotHeader || document.getElementById('voice-toggle-btn')) return;

        // Contenedor para controles de voz
        const voiceControls = document.createElement('div');
        voiceControls.style.cssText = 'display: flex; gap: 5px; align-items: center;';

        // Botón de control de voz
        const voiceButton = document.createElement('button');
        voiceButton.id = 'voice-toggle-btn';
        voiceButton.innerHTML = this.isEnabled ? 
            '<i class="fas fa-volume-up"></i>' : 
            '<i class="fas fa-volume-mute"></i>';
        voiceButton.title = this.isEnabled ? 'Desactivar voz' : 'Activar voz';
        
        // Botón de parar voz
        const stopButton = document.createElement('button');
        stopButton.id = 'voice-stop-btn';
        stopButton.innerHTML = '<i class="fas fa-stop"></i>';
        stopButton.title = 'Parar voz';
        stopButton.style.display = 'none';

        // Estilos para ambos botones
        [voiceButton, stopButton].forEach(btn => {
            btn.style.cssText = `
                background: none;
                border: none;
                color: white;
                font-size: 16px;
                cursor: pointer;
                padding: 8px;
                border-radius: 50%;
                transition: all 0.3s ease;
                min-width: 32px;
                min-height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            // Efectos hover
            btn.addEventListener('mouseenter', () => {
                btn.style.backgroundColor = 'rgba(255,255,255,0.2)';
                btn.style.transform = 'scale(1.1)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.backgroundColor = 'transparent';
                btn.style.transform = 'scale(1)';
            });
        });

        // Eventos
        voiceButton.addEventListener('click', () => this.toggleVoice(voiceButton));
        stopButton.addEventListener('click', () => this.stopSpeaking(stopButton));

        voiceControls.appendChild(voiceButton);
        voiceControls.appendChild(stopButton);
        chatbotHeader.appendChild(voiceControls);

        console.log('🎤 Controles de voz agregados al header');
    }

    toggleVoice(button) {
        this.isEnabled = !this.isEnabled;
        localStorage.setItem('chatbot-voice-enabled', this.isEnabled);
        
        button.innerHTML = this.isEnabled ? 
            '<i class="fas fa-volume-up"></i>' : 
            '<i class="fas fa-volume-mute"></i>';
        button.title = this.isEnabled ? 'Desactivar voz' : 'Activar voz';

        // Feedback visual
        button.style.backgroundColor = this.isEnabled ? 
            'rgba(0,255,0,0.3)' : 'rgba(255,0,0,0.3)';
        setTimeout(() => {
            button.style.backgroundColor = 'transparent';
        }, 1000);

        if (!this.isEnabled && this.isSpeaking) {
            this.stopSpeaking();
        }

        console.log(`🔊 Voz ${this.isEnabled ? 'activada' : 'desactivada'}`);
    }

    speak(text) {
        if (!this.isEnabled || !this.synth || this.isSpeaking) return;

        // Limpiar texto para mejor pronunciación
        const cleanText = this.cleanTextForSpeech(text);
        if (!cleanText.trim()) return;

        // Parar cualquier speech anterior
        this.synth.cancel();

        // Crear nueva utterance
        this.currentUtterance = new SpeechSynthesisUtterance(cleanText);
        
        // Configurar voz masculina
        if (this.selectedVoice) {
            this.currentUtterance.voice = this.selectedVoice;
        }
        
        // Aplicar configuración optimizada para voz masculina
        Object.assign(this.currentUtterance, this.voiceConfig);

        // Event listeners
        this.currentUtterance.onstart = () => {
            this.isSpeaking = true;
            this.showStopButton();
            console.log('🗣️ Reproduciendo con voz masculina:', cleanText.substring(0, 50) + '...');
        };

        this.currentUtterance.onend = () => {
            this.isSpeaking = false;
            this.hideStopButton();
            console.log('✅ Voz terminada');
        };

        this.currentUtterance.onerror = (event) => {
            this.isSpeaking = false;
            this.hideStopButton();
            console.error('❌ Error de voz:', event.error);
        };

        // Reproducir con voz masculina
        this.synth.speak(this.currentUtterance);
    }

    stopSpeaking(button = null) {
        if (this.synth) {
            this.synth.cancel();
        }
        this.isSpeaking = false;
        this.currentUtterance = null;
        this.hideStopButton();
        
        if (button) {
            button.style.backgroundColor = 'rgba(255,0,0,0.3)';
            setTimeout(() => {
                button.style.backgroundColor = 'transparent';
            }, 500);
        }
        
        console.log('⏹️ Voz detenida');
    }

    showStopButton() {
        const stopBtn = document.getElementById('voice-stop-btn');
        const voiceBtn = document.getElementById('voice-toggle-btn');
        if (stopBtn && voiceBtn) {
            stopBtn.style.display = 'flex';
            voiceBtn.style.opacity = '0.5';
        }
    }

    hideStopButton() {
        const stopBtn = document.getElementById('voice-stop-btn');
        const voiceBtn = document.getElementById('voice-toggle-btn');
        if (stopBtn && voiceBtn) {
            stopBtn.style.display = 'none';
            voiceBtn.style.opacity = '1';
        }
    }

    cleanTextForSpeech(text) {
        return text
            // Remover HTML tags
            .replace(/<[^>]*>/g, ' ')
            // Remover marcadores especiales
            .replace(/\[CONTACT_BUTTON\]/g, '')
            // Convertir entidades HTML
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, ' y ')
            .replace(/&lt;/g, ' menor que ')
            .replace(/&gt;/g, ' mayor que ')
            // Mejorar pronunciación para voz masculina
            .replace(/RECYBERSEG/gi, 'Reci-Ber-Seg')
            .replace(/IoT/g, 'Internet de las Cosas')
            .replace(/24\/7/g, 'veinticuatro horas, siete días')
            .replace(/AI/g, 'Inteligencia Artificial')
            .replace(/CEO/g, 'Director Ejecutivo')
            .replace(/API/g, 'A-P-I')
            .replace(/URL/g, 'U-R-L')
            .replace(/HTTP/g, 'H-T-T-P')
            .replace(/HTTPS/g, 'H-T-T-P-S')
            // Números y porcentajes
            .replace(/(\d+)%/g, '$1 por ciento')
            .replace(/(\d+)°C/g, '$1 grados centígrados')
            // Limpiar espacios extras
            .replace(/\s+/g, ' ')
            .trim();
    }

    // API pública
    setVoiceEnabled(enabled) {
        this.isEnabled = enabled;
        localStorage.setItem('chatbot-voice-enabled', enabled);
        const button = document.getElementById('voice-toggle-btn');
        if (button) {
            button.innerHTML = enabled ? 
                '<i class="fas fa-volume-up"></i>' : 
                '<i class="fas fa-volume-mute"></i>';
        }
    }

    speakText(text) {
        this.speak(text);
    }

    getVoiceInfo() {
        return {
            selectedVoice: this.selectedVoice?.name || 'No seleccionada',
            isEnabled: this.isEnabled,
            isSpeaking: this.isSpeaking,
            availableVoices: this.voices.length,
            config: this.voiceConfig
        };
    }
}

// 🎤 MANEJO DEL TECLADO VIRTUAL (código anterior)
let initialViewportHeight = window.innerHeight;
let chatbotContainer = null;
let chatbotInput = null;
let isKeyboardActive = false;

function initKeyboardHandler() {
    chatbotContainer = document.getElementById('chatbot-container');
    chatbotInput = document.getElementById('chatbot-input');
    
    if (!chatbotContainer || !chatbotInput) {
        setTimeout(initKeyboardHandler, 1000);
        return;
    }

    window.addEventListener('resize', handleViewportChange);
    chatbotInput.addEventListener('focus', handleInputFocus);
    chatbotInput.addEventListener('blur', handleInputBlur);
    chatbotInput.addEventListener('touchstart', preventZoom);
    
    console.log('🔧 Keyboard handler inicializado');
}

function handleViewportChange() {
    const currentHeight = window.innerHeight;
    const heightDifference = initialViewportHeight - currentHeight;
    
    if (heightDifference > 150 && !isKeyboardActive) {
        activateKeyboardMode();
    } else if (heightDifference < 100 && isKeyboardActive) {
        deactivateKeyboardMode();
    }
}

function activateKeyboardMode() {
    if (!chatbotContainer) return;
    
    isKeyboardActive = true;
    chatbotContainer.classList.add('keyboard-active');
    
    setTimeout(() => {
        if (chatbotInput && chatbotInput === document.activeElement) {
            chatbotInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 300);
    
    console.log('⌨️ Modo teclado activado');
}

function deactivateKeyboardMode() {
    if (!chatbotContainer) return;
    
    isKeyboardActive = false;
    chatbotContainer.classList.remove('keyboard-active');
    console.log('⌨️ Modo teclado desactivado');
}

function handleInputFocus(e) {
    setTimeout(() => {
        if (window.innerHeight < initialViewportHeight - 100) {
            activateKeyboardMode();
        }
        
        e.target.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
        });
    }, 300);
}

function handleInputBlur() {
    setTimeout(() => {
        if (document.activeElement !== chatbotInput) {
            deactivateKeyboardMode();
        }
    }, 100);
}

function preventZoom(e) {
    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 
                'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
            );
            
            setTimeout(() => {
                viewport.setAttribute('content', 
                    'width=device-width, initial-scale=1.0'
                );
            }, 500);
        }
    }
}

if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
        const currentHeight = window.visualViewport.height;
        const heightDifference = initialViewportHeight - currentHeight;
        
        if (heightDifference > 150 && !isKeyboardActive) {
            activateKeyboardMode();
        } else if (heightDifference < 100 && isKeyboardActive) {
            deactivateKeyboardMode();
        }
    });
}

// 🎤 INICIALIZACIÓN COMPLETA
function initChatbotVoice() {
    if (!('speechSynthesis' in window)) {
        console.warn('⚠️ Web Speech API no soportada en este navegador');
        return;
    }

    window.chatbotVoice = new ChatbotVoice();
    console.log('🎤 Sistema de voz masculina inicializado');
}

// Auto-inicialización
setTimeout(() => {
    initKeyboardHandler();
    initChatbotVoice();
}, 2000);

window.addEventListener('load', () => {
    initialViewportHeight = window.innerHeight;
    setTimeout(() => {
        initKeyboardHandler();
        initChatbotVoice();
    }, 3000);
});

// API global para controles manuales
window.chatbotControls = {
    voice: () => window.chatbotVoice,
    toggleVoice: () => window.chatbotVoice?.toggleVoice(),
    speakText: (text) => window.chatbotVoice?.speak(text),
    stopSpeaking: () => window.chatbotVoice?.stopSpeaking(),
    getVoiceInfo: () => window.chatbotVoice?.getVoiceInfo(),
    keyboard: {
        activate: activateKeyboardMode,
        deactivate: deactivateKeyboardMode,
        isActive: () => isKeyboardActive
    }
};
