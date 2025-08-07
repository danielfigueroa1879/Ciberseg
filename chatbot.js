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
    }

    // 🎤 NUEVO: Inicializar reconocimiento de voz
    initSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            
            // Configuración optimizada para velocidad
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'es-ES';
            this.recognition.maxAlternatives = 1;
            
            // Eventos del reconocimiento
            this.recognition.onstart = () => {
                this.isListening = true;
                this.showListeningState();
                console.log('🎙️ Escuchando...');
            };
            
            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                console.log('🎯 Reconocido:', transcript);
                
                // Insertar texto en el input y enviarlo automáticamente
                const chatbotInput = document.getElementById('chatbot-input');
                if (chatbotInput) {
                    chatbotInput.value = transcript;
                    // Simular envío del formulario
                    const form = document.getElementById('chatbot-form');
                    if (form) {
                        const event = new Event('submit', { bubbles: true, cancelable: true });
                        form.dispatchEvent(event);
                    }
                }
            };
            
            this.recognition.onend = () => {
                this.isListening = false;
                this.hideListeningState();
                console.log('🎙️ Reconocimiento terminado');
            };
            
            this.recognition.onerror = (event) => {
                this.isListening = false;
                this.hideListeningState();
                console.error('❌ Error reconocimiento:', event.error);
            };
            
            console.log('🎙️ Reconocimiento de voz inicializado');
        } else {
            console.warn('⚠️ Reconocimiento de voz no soportado');
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
            
            // 🎤 NUEVA FUNCIONALIDAD: Reproducir voz MÁS RÁPIDA automáticamente
            if (window.chatbotVoice && window.chatbotVoice.isEnabled) {
                setTimeout(() => {
                    window.chatbotVoice.speak(messageText);
                }, 400); // Delay MÁS CORTO para respuesta más rápida
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

        // Contexto e instrucción para el modelo de IA, con RESPUESTAS MÁS ENERGÉTICAS
        const prompt = `Eres un asistente virtual DINÁMICO para RECYBERSEG, una empresa chilena de ciberseguridad. Tu nombre es 'Cyber Asistente'.
        
        PERSONALIDAD ENERGÉTICA:
        - Responde con ENERGÍA y ENTUSIASMO
        - Sé RÁPIDO y DIRECTO en tus respuestas
        - Usa un tono PROFESIONAL pero DINÁMICO
        - Mantén las respuestas CONCISAS pero COMPLETAS
        - Muestra CONFIANZA en cada respuesta
        
        IMPORTANTE: Debes formatear tus respuestas usando etiquetas HTML. Usa <strong>palabra</strong> para poner texto en negrita y usa <br> para los saltos de línea, especialmente en las listas.
        Cuando listes servicios, usa el formato "1.- <strong>Servicio:</strong> Descripción.<br>".

        INSTRUCCIONES ESPECIALES PARA VOZ RÁPIDA:
        - Habla de manera ENERGÉTICA y ENTUSIASTA
        - Usa frases DINÁMICAS y DIRECTAS
        - Evita palabras innecesarias para SER MÁS RÁPIDO
        - Pronuncia "RECYBERSEG" como "Reci-Ber-Seg"
        - Para "IoT", di "Internet de las Cosas"
        - Para "24/7", di "veinticuatro siete"
        - Usa palabras como "¡Perfecto!", "¡Excelente!", "¡Genial!"

        Si el usuario pregunta cómo contactar, hablar con alguien, o solicitar una cotización, responde con ENERGÍA indicando que pueden usar el formulario de contacto y, al final de tu mensaje, incluye el texto especial [CONTACT_BUTTON] para que se genere un botón.
        Ejemplo de respuesta energética: "¡Perfecto! Para contactarnos RÁPIDAMENTE, usa nuestro formulario y un especialista te contactará DE INMEDIATO. ¡También tienes nuestros datos directos disponibles!<br>[CONTACT_BUTTON]"

        Responde a las preguntas sobre nuestros servicios TOP:
        1.- <strong>Auditorías de Seguridad:</strong> ¡Evaluación COMPLETA de tu infraestructura!<br>
        2.- <strong>Monitoreo de Redes:</strong> ¡Supervisión CONSTANTE veinticuatro siete!<br>
        3.- <strong>Consultoría en Ciberseguridad:</strong> ¡Asesoramiento EXPERTO personalizado!<br>
        4.- <strong>Implementación de Sistemas:</strong> ¡Configuración PROFESIONAL de firewalls!<br>
        5.- <strong>Seguridad Internet de las Cosas:</strong> ¡Protección TOTAL de dispositivos inteligentes!<br>

        Nuestra MISIÓN: ¡Proteger tu ecosistema digital con soluciones INNOVADORAS!
        Nuestra VISIÓN: ¡Ser LÍDERES en tecnología de seguridad digital!

        Sé PROFESIONAL, ENERGÉTICO y DIRECTO. Si no sabes algo, di que consultarás INMEDIATAMENTE con un especialista. NUNCA inventes información. Responde en español con ENERGÍA.

        Pregunta del usuario: "${userInput}"`;

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
        this.recognition = null;
        this.voices = [];
        this.selectedVoice = null;
        this.isEnabled = localStorage.getItem('chatbot-voice-enabled') !== 'false';
        this.isSpeaking = false;
        this.isListening = false;
        this.currentUtterance = null;
        
        // Configuración de voz optimizada para velocidad y energía
        this.voiceConfig = {
            rate: 1.3,           // MÁS RÁPIDO - velocidad energética
            pitch: 0.8,          // Tono masculino pero con energía
            volume: 1.0,         // Volumen máximo para claridad
            lang: 'es-ES'        // Español
        };
        
        this.init();
    }

    async init() {
        await this.loadVoices();
        this.initSpeechRecognition();
        // Esperar a que el chatbot esté disponible
        const initControls = () => {
            if (document.querySelector('.chatbot-header')) {
                this.createVoiceControls();
                console.log('🎤 Sistema de voz rápido y reconocimiento inicializados');
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

        // 🎙️ NUEVO: Botón de micrófono para hablar
        const micButton = document.createElement('button');
        micButton.id = 'voice-mic-btn';
        micButton.innerHTML = '<i class="fas fa-microphone"></i>';
        micButton.title = 'Hablar al chatbot (mantén presionado)';

        // Estilos para todos los botones
        [voiceButton, stopButton, micButton].forEach(btn => {
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
        
        // 🎙️ NUEVO: Eventos del micrófono
        micButton.addEventListener('mousedown', () => this.startListening());
        micButton.addEventListener('mouseup', () => this.stopListening());
        micButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startListening();
        });
        micButton.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.stopListening();
        });

        voiceControls.appendChild(voiceButton);
        voiceControls.appendChild(stopButton);
        voiceControls.appendChild(micButton);
        chatbotHeader.appendChild(voiceControls);

        console.log('🎤 Controles de voz y micrófono agregados al header');
    }

    // 🎙️ NUEVO: Iniciar escucha
    startListening() {
        if (!this.recognition || this.isListening) return;
        
        // Parar cualquier reproducción de voz
        if (this.isSpeaking) {
            this.stopSpeaking();
        }
        
        try {
            this.recognition.start();
        } catch (error) {
            console.error('Error al iniciar reconocimiento:', error);
        }
    }

    // 🎙️ NUEVO: Parar escucha
    stopListening() {
        if (!this.recognition || !this.isListening) return;
        
        try {
            this.recognition.stop();
        } catch (error) {
            console.error('Error al parar reconocimiento:', error);
        }
    }

    // 🎙️ NUEVO: Mostrar estado de escucha
    showListeningState() {
        const micBtn = document.getElementById('voice-mic-btn');
        if (micBtn) {
            micBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
            micBtn.style.backgroundColor = 'rgba(255,0,0,0.3)';
            micBtn.style.animation = 'pulse 1s infinite';
        }
    }

    // 🎙️ NUEVO: Ocultar estado de escucha
    hideListeningState() {
        const micBtn = document.getElementById('voice-mic-btn');
        if (micBtn) {
            micBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            micBtn.style.backgroundColor = 'transparent';
            micBtn.style.animation = 'none';
        }
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
            console.log('🗣️ Reproduciendo RÁPIDO con energía:', cleanText.substring(0, 50) + '...');
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
        const micBtn = document.getElementById('voice-mic-btn');
        if (stopBtn && voiceBtn) {
            stopBtn.style.display = 'flex';
            voiceBtn.style.opacity = '0.5';
            if (micBtn) micBtn.style.opacity = '0.3';
        }
    }

    hideStopButton() {
        const stopBtn = document.getElementById('voice-stop-btn');
        const voiceBtn = document.getElementById('voice-toggle-btn');
        const micBtn = document.getElementById('voice-mic-btn');
        if (stopBtn && voiceBtn) {
            stopBtn.style.display = 'none';
            voiceBtn.style.opacity = '1';
            if (micBtn) micBtn.style.opacity = '1';
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

// API global para controles manuales MÁS RÁPIDOS
window.chatbotControls = {
    voice: () => window.chatbotVoice,
    toggleVoice: () => window.chatbotVoice?.toggleVoice(),
    speakText: (text) => window.chatbotVoice?.speak(text),
    stopSpeaking: () => window.chatbotVoice?.stopSpeaking(),
    startListening: () => window.chatbotVoice?.startListening(),
    stopListening: () => window.chatbotVoice?.stopListening(),
    getVoiceInfo: () => window.chatbotVoice?.getVoiceInfo(),
    keyboard: {
        activate: activateKeyboardMode,
        deactivate: deactivateKeyboardMode,
        isActive: () => isKeyboardActive
    }
};
