// Chatbot RECYBERSEG - Versión Limpia con Voz Rápida
document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Chatbot iniciando...");

    // Elementos del DOM
    const chatToggleButton = document.getElementById('chat-toggle-button');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const loadingIndicator = document.getElementById('chatbot-loading');

    // Verificar elementos
    if (!chatToggleButton || !chatbotContainer || !closeChatBtn || !chatbotForm || !chatbotInput || !chatbotMessages || !loadingIndicator) {
        console.error("❌ Elementos del chatbot no encontrados");
        return;
    }

    console.log("✅ Elementos del chatbot encontrados");

    // Sistema de voz simple
    let voiceSystem = null;
    let isVoiceEnabled = localStorage.getItem('chatbot-voice') !== 'false';

    // Inicializar voz
    function initVoice() {
        if ('speechSynthesis' in window) {
            voiceSystem = {
                synth: window.speechSynthesis,
                speak: function(text) {
                    if (!isVoiceEnabled) return;
                    
                    const cleanText = text
                        .replace(/<[^>]*>/g, ' ')
                        .replace(/\[CONTACT_BUTTON\]/g, '')
                        .replace(/RECYBERSEG/gi, 'Reci-Ber-Seg')
                        .replace(/IoT/g, 'Internet de las Cosas')
                        .replace(/24\/7/g, 'veinticuatro siete')
                        .trim();
                    
                    if (!cleanText) return;
                    
                    this.synth.cancel();
                    const utterance = new SpeechSynthesisUtterance(cleanText);
                    utterance.rate = 1.3;  // Rápido
                    utterance.pitch = 0.8; // Masculino
                    utterance.volume = 1.0; // Alto
                    utterance.lang = 'es-ES';
                    
                    this.synth.speak(utterance);
                    console.log('🗣️ Hablando:', cleanText.substring(0, 50) + '...');
                }
            };
            console.log('🎤 Sistema de voz inicializado');
        }
    }

    // Event Listeners básicos
    chatToggleButton.addEventListener('click', () => {
        console.log('🔄 Toggle chatbot');
        chatbotContainer.classList.toggle('active');
    });

    closeChatBtn.addEventListener('click', () => {
        console.log('❌ Cerrando chatbot');
        chatbotContainer.classList.remove('active');
    });

    chatbotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userInput = chatbotInput.value.trim();
        console.log('📝 Usuario escribió:', userInput);

        if (userInput) {
            addMessage(userInput, 'user');
            chatbotInput.value = '';
            getAIResponse(userInput);
        }
    });

    // Función para agregar mensajes
    function addMessage(text, sender) {
        console.log(`💬 Agregando mensaje de ${sender}:`, text);
        
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        
        const p = document.createElement('p');
        let messageText = text;

        if (sender === 'bot') {
            if (text.includes('[CONTACT_BUTTON]')) {
                messageText = text.replace('[CONTACT_BUTTON]', '');
                
                // Crear botón
                const contactButton = document.createElement('button');
                contactButton.textContent = 'Ir al Formulario';
                contactButton.style.cssText = `
                    background-color: #3182ce;
                    color: white;
                    border: none;
                    padding: 10px 15px;
                    border-radius: 20px;
                    font-weight: bold;
                    cursor: pointer;
                    margin-top: 10px;
                    transition: all 0.3s ease;
                `;
                
                contactButton.addEventListener('click', () => {
                    const contactSection = document.getElementById('contacto');
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    chatbotContainer.classList.remove('active');
                });
                
                messageElement.appendChild(contactButton);
            }
            
            p.innerHTML = messageText;
            p.style.textAlign = 'justify';
            
            // Reproducir voz después de mostrar el mensaje
            setTimeout(() => {
                if (voiceSystem) {
                    voiceSystem.speak(messageText);
                }
            }, 300);
        } else {
            p.textContent = text;
        }

        messageElement.appendChild(p);
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Función para obtener respuesta de la IA
    async function getAIResponse(userInput) {
        console.log('🤖 Obteniendo respuesta de IA para:', userInput);
        
        loadingIndicator.style.display = 'flex';
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        const prompt = `Eres un asistente virtual ENERGÉTICO para RECYBERSEG, empresa chilena de ciberseguridad. Tu nombre es 'Cyber Asistente'.

        PERSONALIDAD:
        - Responde con ENERGÍA y ENTUSIASMO
        - Sé RÁPIDO y DIRECTO
        - Usa palabras como "¡Perfecto!", "¡Excelente!", "¡Genial!"
        - Mantén tono profesional pero dinámico

        FORMATO: Usa <strong>texto</strong> para negritas y <br> para saltos de línea.

        SERVICIOS principales:
        1.- <strong>Auditorías de Seguridad:</strong> ¡Evaluación COMPLETA!<br>
        2.- <strong>Monitoreo de Redes:</strong> ¡Supervisión CONSTANTE 24/7!<br>
        3.- <strong>Consultoría:</strong> ¡Asesoramiento EXPERTO!<br>
        4.- <strong>Implementación:</strong> ¡Configuración PROFESIONAL!<br>
        5.- <strong>Seguridad IoT:</strong> ¡Protección TOTAL!<br>

        Si preguntan por contacto, incluye [CONTACT_BUTTON] al final.

        Pregunta: "${userInput}"`;

        const apiKey = "AIzaSyAq7n6WM4WuPKR0CZzIUgAUdI53fm4CpoA";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            let botResponse = 'Lo siento, hubo un error. Inténtalo de nuevo.';
            
            if (result.candidates && result.candidates[0] && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts[0]) {
                botResponse = result.candidates[0].content.parts[0].text;
            }
            
            console.log('✅ Respuesta de IA recibida');
            addMessage(botResponse, 'bot');

        } catch (error) {
            console.error('❌ Error en IA:', error);
            addMessage(`Hubo un problema al conectar. Error: ${error.message}`, 'bot');
        } finally {
            loadingIndicator.style.display = 'none';
        }
    }

    // Crear controles de voz en el header
    function createVoiceControls() {
        const header = document.querySelector('.chatbot-header');
        if (!header || document.getElementById('voice-btn')) return;

        const voiceBtn = document.createElement('button');
        voiceBtn.id = 'voice-btn';
        voiceBtn.innerHTML = isVoiceEnabled ? '🔊' : '🔇';
        voiceBtn.title = isVoiceEnabled ? 'Desactivar voz' : 'Activar voz';
        voiceBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 8px;
            border-radius: 50%;
            margin-left: 10px;
            transition: all 0.3s ease;
        `;

        voiceBtn.addEventListener('click', () => {
            isVoiceEnabled = !isVoiceEnabled;
            localStorage.setItem('chatbot-voice', isVoiceEnabled);
            voiceBtn.innerHTML = isVoiceEnabled ? '🔊' : '🔇';
            voiceBtn.title = isVoiceEnabled ? 'Desactivar voz' : 'Activar voz';
            
            voiceBtn.style.backgroundColor = isVoiceEnabled ? 
                'rgba(0,255,0,0.3)' : 'rgba(255,0,0,0.3)';
            setTimeout(() => voiceBtn.style.backgroundColor = 'transparent', 1000);
            
            console.log(`🔊 Voz ${isVoiceEnabled ? 'activada' : 'desactivada'}`);
        });

        voiceBtn.addEventListener('mouseenter', () => {
            voiceBtn.style.backgroundColor = 'rgba(255,255,255,0.2)';
            voiceBtn.style.transform = 'scale(1.1)';
        });

        voiceBtn.addEventListener('mouseleave', () => {
            voiceBtn.style.backgroundColor = 'transparent';
            voiceBtn.style.transform = 'scale(1)';
        });

        header.appendChild(voiceBtn);
        console.log('🎤 Botón de voz agregado');
    }

    // Manejo del teclado virtual
    let initialHeight = window.innerHeight;
    
    function handleKeyboard() {
        const currentHeight = window.innerHeight;
        const heightDiff = initialHeight - currentHeight;
        
        if (heightDiff > 150) {
            chatbotContainer.classList.add('keyboard-active');
        } else {
            chatbotContainer.classList.remove('keyboard-active');
        }
    }

    // Event listeners adicionales
    window.addEventListener('resize', handleKeyboard);
    
    if (chatbotInput) {
        chatbotInput.addEventListener('focus', () => {
            setTimeout(handleKeyboard, 300);
        });
        
        chatbotInput.addEventListener('blur', () => {
            setTimeout(() => {
                chatbotContainer.classList.remove('keyboard-active');
            }, 300);
        });
    }

    // Inicialización
    setTimeout(() => {
        initVoice();
        createVoiceControls();
        console.log('✅ Chatbot completamente inicializado');
    }, 1000);

    // API global simple
    window.chatbot = {
        toggle: () => chatbotContainer.classList.toggle('active'),
        close: () => chatbotContainer.classList.remove('active'),
        speak: (text) => voiceSystem && voiceSystem.speak(text),
        toggleVoice: () => document.getElementById('voice-btn')?.click()
    };

    console.log('🎉 Chatbot listo para usar');
});
