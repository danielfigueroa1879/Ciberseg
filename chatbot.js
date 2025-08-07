// Chatbot RECYBERSEG - Con Lógica Avanzada y Voz Bidireccional (Versión Corregida)
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 Chatbot RECYBERSEG iniciando con lógica avanzada...");

    // === CONFIGURACIÓN PRINCIPAL ===
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const speechSynth = window.speechSynthesis;
    let recognition = null;
    let isListening = false;
    let availableVoices = [];
    let isAutoReadEnabled = localStorage.getItem('chatbot-voice-enabled') !== 'false';

    // Elementos del DOM
    const chatToggleButton = document.getElementById('chat-toggle-button');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const loadingIndicator = document.getElementById('chatbot-loading');

    // Verificar elementos críticos
    if (!chatToggleButton || !chatbotContainer || !closeChatBtn || !chatbotForm || !chatbotInput || !chatbotMessages || !loadingIndicator) {
        console.error("❌ Elementos críticos del chatbot no encontrados. Asegúrate de que los IDs en tu HTML coinciden.");
        return;
    }

    console.log("✅ Elementos del chatbot verificados correctamente");

    // === BASE DE CONOCIMIENTO RECYBERSEG ===
    const recybersegRules = [
        {
            keywords: ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'saludos', 'hi'],
            response: '¡Hola! Soy <strong>Cyber Asistente</strong> de RECYBERSEG. ¡Estoy aquí para ayudarte con toda la información sobre nuestros servicios de ciberseguridad! ¿En qué puedo asistirte hoy?',
            buttons: ['Servicios', 'Auditorías', 'Monitoreo', 'IoT', 'Contacto']
        },
        {
            keywords: ['servicios', 'qué hacen', 'ofrecen', 'productos'],
            response: '🛡️ <strong>Nuestros Servicios TOP:</strong><br><br>1.- <strong>Auditorías de Seguridad:</strong> ¡Evaluación COMPLETA de tu infraestructura!<br>2.- <strong>Monitoreo de Redes:</strong> ¡Supervisión CONSTANTE 24/7!<br>3.- <strong>Consultoría en Ciberseguridad:</strong> ¡Asesoramiento EXPERTO personalizado!<br>4.- <strong>Implementación de Sistemas:</strong> ¡Configuración PROFESIONAL de firewalls!<br>5.- <strong>Seguridad IoT:</strong> ¡Protección TOTAL de dispositivos inteligentes!',
            buttons: ['Auditorías', 'Monitoreo 24/7', 'Consultoría', 'IoT', 'Cotizar']
        },
        {
            keywords: ['auditorías', 'auditoria', 'evaluación', 'análisis de seguridad'],
            response: '🔍 <strong>Auditorías de Seguridad RECYBERSEG:</strong><br><br>✅ <strong>Evaluación completa</strong> de infraestructura digital<br>✅ <strong>Análisis de vulnerabilidades</strong> en tiempo real<br>✅ <strong>Reportes detallados</strong> con recomendaciones<br>✅ <strong>Pruebas de penetración</strong> profesionales<br>✅ <strong>Certificaciones de seguridad</strong><br><br>¡Protegemos tu empresa desde la base!',
            buttons: ['Precio Auditoría', 'Tiempo estimado', 'Contactar', 'Otros servicios']
        },
        {
            keywords: ['monitoreo', '24/7', 'supervisión', 'vigilancia', 'redes'],
            response: '🔒 <strong>Monitoreo de Redes 24/7:</strong><br><br>🚨 <strong>Supervisión CONSTANTE</strong> de tu red corporativa<br>⚡ <strong>Detección inmediata</strong> de amenazas<br>📊 <strong>Reportes en tiempo real</strong><br>🛡️ <strong>Respuesta automática</strong> a incidentes<br>📱 <strong>Alertas instantáneas</strong><br><br>¡Tu red NUNCA duerme, nosotros TAMPOCO!',
            buttons: ['Precio Monitoreo', 'Demo gratis', 'Contactar', 'Más info']
        },
        {
            keywords: ['iot', 'internet de las cosas', 'dispositivos inteligentes', 'smart'],
            response: '🌐 <strong>Seguridad IoT RECYBERSEG:</strong><br><br>📱 <strong>Protección TOTAL</strong> de dispositivos inteligentes<br>🔐 <strong>Cifrado avanzado</strong> de comunicaciones<br>🛡️ <strong>Monitoreo especializado</strong> IoT<br>⚙️ <strong>Configuración segura</strong> de dispositivos<br>🚨 <strong>Detección de anomalías</strong><br><br>¡El futuro es IoT, la seguridad es RECYBERSEG!',
            buttons: ['Evaluar IoT', 'Precio', 'Consultoría', 'Contactar']
        },
        {
            keywords: ['consultoría', 'asesoramiento', 'consultor', 'ayuda experta'],
            response: '👨‍💻 <strong>Consultoría en Ciberseguridad:</strong><br><br>🎯 <strong>Asesoramiento EXPERTO</strong> personalizado<br>📋 <strong>Análisis de riesgos</strong> específicos<br>🔧 <strong>Diseño de políticas</strong> de seguridad<br>📚 <strong>Capacitación</strong> de equipos<br>🏆 <strong>Mejores prácticas</strong> del mercado<br><br>¡Tu éxito en ciberseguridad es NUESTRA especialidad!',
            buttons: ['Agendar consulta', 'Precio', 'Especialistas', 'Contactar']
        },
        {
            keywords: ['precios', 'cotización', 'costo', 'cuánto cuesta', 'precio'],
            response: '💰 <strong>¡Cotización PERSONALIZADA!</strong><br><br>Cada empresa es ÚNICA, por eso nuestros precios se adaptan a:<br><br>📊 <strong>Tamaño de tu empresa</strong><br>🔧 <strong>Servicios específicos</strong> requeridos<br>⏰ <strong>Nivel de urgencia</strong><br>🎯 <strong>Objetivos de seguridad</strong><br><br>¡Solicita tu cotización GRATUITA y sin compromiso!',
            buttons: ['Solicitar cotización', 'Contactar', 'Más servicios']
        },
        {
            keywords: ['contacto', 'contactar', 'hablar', 'comunicar', 'teléfono', 'email'],
            response: '📞 <strong>¡Contacta con RECYBERSEG!</strong><br><br>🏢 <strong>Ubicación:</strong> La Serena, Chile<br>📧 <strong>Email:</strong> danielfigueroa1879@gmail.com<br>📱 <strong>Teléfono:</strong> +56 9 5997 8963<br>💬 <strong>WhatsApp:</strong> ¡Disponible!<br><br>¡Un especialista se comunicará contigo DE INMEDIATO![CONTACT_BUTTON]',
            buttons: ['WhatsApp', 'Llamar', 'Email', 'Formulario']
        },
        {
            keywords: ['misión', 'objetivo', 'propósito'],
            response: '🎯 <strong>Nuestra MISIÓN:</strong><br><br>Proteger y fortalecer el ecosistema digital de nuestros clientes mediante soluciones <strong>INNOVADORAS, confiables y personalizadas</strong> en ciberseguridad.<br><br>Garantizamos la <strong>integridad, disponibilidad y confidencialidad</strong> de tus datos, impulsando un entorno más seguro para enfrentar los desafíos del mundo digital.',
            buttons: ['Visión', 'Servicios', 'Contactar']
        },
        {
            keywords: ['visión', 'futuro', 'metas'],
            response: '🚀 <strong>Nuestra VISIÓN:</strong><br><br>Ser reconocidos como <strong>LÍDERES en soluciones tecnológicas</strong> de seguridad digital, destacándonos por nuestra innovación, profesionalismo y capacidad de adaptación.<br><br>Aspiramos a construir un <strong>mundo digital más seguro</strong>, donde la tecnología y la confianza vayan de la mano.',
            buttons: ['Misión', 'Servicios', 'Contactar']
        }
    ];

    const systemPrompt = `Eres 'Cyber Asistente', el asistente virtual ENERGÉTICO de RECYBERSEG, empresa chilena líder en ciberseguridad.

PERSONALIDAD:
- Responde con ENERGÍA y ENTUSIASMO profesional
- Sé RÁPIDO, DIRECTO y DINÁMICO
- Usa palabras como "¡Perfecto!", "¡Excelente!", "¡Genial!"
- Mantén tono profesional pero ENTUSIASTA

INSTRUCCIONES ESPECIALES:
- Usa <strong>texto</strong> para negritas y <br> para saltos de línea
- Pronuncia "RECYBERSEG" como "Reci-Ber-Seg"
- Para "IoT" di "Internet de las Cosas"
- Para "24/7" di "veinticuatro siete"

Si preguntan por contacto, incluye [CONTACT_BUTTON] al final de tu respuesta.

SERVICIOS principales de RECYBERSEG:
1. Auditorías de Seguridad - Evaluación COMPLETA
2. Monitoreo de Redes 24/7 - Supervisión CONSTANTE
3. Consultoría en Ciberseguridad - Asesoramiento EXPERTO
4. Implementación de Sistemas - Configuración PROFESIONAL
5. Seguridad IoT - Protección TOTAL

Responde de forma ENERGÉTICA y PROFESIONAL siempre.`;

    // === SISTEMA DE VOCES ===
    function loadVoices() {
        availableVoices = speechSynth.getVoices();
        if (availableVoices.length > 0) {
            console.log("🎤 Voces cargadas:", availableVoices.length);
        }
    }

    loadVoices();
    if (speechSynth.onvoiceschanged !== undefined) {
        speechSynth.onvoiceschanged = loadVoices;
    }

    function speakText(text) {
        if (!isAutoReadEnabled || !speechSynth) return;
        
        const cleanText = text
            .replace(/<[^>]*>/g, ' ')
            .replace(/\[CONTACT_BUTTON\]/g, '')
            .replace(/RECYBERSEG/gi, 'Reci-Ber-Seg')
            .replace(/IoT/g, 'Internet de las Cosas')
            .replace(/24\/7/g, 'veinticuatro siete')
            .replace(/&nbsp;/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        
        if (!cleanText) return;

        speechSynth.cancel();
        const utterance = new SpeechSynthesisUtterance(cleanText);

        // Seleccionar la mejor voz masculina en español
        let selectedVoice = null;
        if (availableVoices.length > 0) {
            selectedVoice = availableVoices.find(voice => voice.name.toLowerCase().includes('diego') && voice.lang.startsWith('es')) ||
                availableVoices.find(voice => (voice.name.toLowerCase().includes('jorge') || voice.name.toLowerCase().includes('carlos')) && voice.lang.startsWith('es')) ||
                availableVoices.find(voice => voice.lang.startsWith('es-ES') || voice.lang.startsWith('es-MX')) ||
                availableVoices.find(voice => voice.lang.startsWith('es'));
        }

        if (selectedVoice) {
            utterance.voice = selectedVoice;
            console.log('🗣️ Usando voz:', selectedVoice.name);
        }

        utterance.lang = 'es-ES';
        utterance.rate = 1.2; // Velocidad energética pero clara
        utterance.pitch = 0.9; // Tono ligeramente más grave
        utterance.volume = 1.0;
        speechSynth.speak(utterance);
    }

    // === RECONOCIMIENTO DE VOZ ===
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'es-CL,es-ES'; // Prioriza español de Chile
        recognition.continuous = false; // Procesa después de una pausa
        recognition.interimResults = true;
        
        recognition.onstart = () => {
            isListening = true;
            showListeningState();
            console.log('🎙️ Iniciando reconocimiento...');
        };
        
        recognition.onresult = (event) => {
            let finalTranscript = '';
            let interimTranscript = '';
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }
            
            if (chatbotInput) {
                chatbotInput.value = finalTranscript + interimTranscript;
                if (finalTranscript.trim()) {
                    console.log('✅ Reconocimiento final:', finalTranscript);
                    stopListening(); // Detiene automáticamente
                    handleMessage(); // Envía el mensaje
                }
            }
        };
        
        recognition.onend = () => {
            isListening = false;
            hideListeningState();
            console.log('🛑 Reconocimiento detenido.');
        };
        
        recognition.onerror = (event) => {
            console.error('❌ Error reconocimiento:', event.error);
            isListening = false;
            hideListeningState();
        };
        
        console.log('🎙️ Reconocimiento de voz inicializado');
    } else {
        console.warn('⚠️ Reconocimiento de voz no disponible en este navegador.');
    }

    function startListening() {
        if (!recognition || isListening) return;
        try {
            if (chatbotInput) chatbotInput.value = '';
            recognition.start();
        } catch (error) {
            console.error('Error al iniciar reconocimiento:', error);
        }
    }
    
    function stopListening() {
        if (!recognition || !isListening) return;
        try {
            recognition.stop();
        } catch (error) {
            console.error('Error al detener reconocimiento:', error);
        }
    }
    
    function showListeningState() {
        const micBtn = document.getElementById('mic-btn');
        if (micBtn) {
            micBtn.innerHTML = '🔴';
            micBtn.style.animation = 'pulse 1.5s infinite';
            micBtn.title = 'Escuchando... Habla ahora';
        }
        if (chatbotInput) {
            chatbotInput.placeholder = '🎙️ Escuchando...';
            chatbotInput.style.borderColor = '#ff4444';
        }
    }
    
    function hideListeningState() {
        const micBtn = document.getElementById('mic-btn');
        if (micBtn) {
            micBtn.innerHTML = '🎤';
            micBtn.style.animation = 'none';
            micBtn.title = 'Mantén presionado para hablar';
        }
        if (chatbotInput) {
            chatbotInput.placeholder = 'Escribe tu pregunta...';
            chatbotInput.style.borderColor = '';
        }
    }

    // === MANEJO DE MENSAJES ===
    function addMessage(sender, text, buttons = []) {
        console.log(`💬 Agregando mensaje de ${sender}`);
        
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        
        const p = document.createElement('p');
        let messageText = text;

        if (sender === 'bot') {
            // Procesar botón de contacto
            if (text.includes('[CONTACT_BUTTON]')) {
                messageText = text.replace('[CONTACT_BUTTON]', '');
                
                const contactButton = document.createElement('button');
                contactButton.textContent = 'Ir al Formulario de Contacto';
                contactButton.className = 'contact-form-button'; // Usar clase para estilos
                
                contactButton.addEventListener('click', () => {
                    const contactSection = document.getElementById('contacto');
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    if (chatbotContainer) chatbotContainer.classList.remove('active');
                });
                
                // Adjuntar el botón después del párrafo de texto
                setTimeout(() => messageElement.appendChild(contactButton), 0);
            }
            
            p.innerHTML = messageText; // Usar innerHTML para renderizar <strong> y <br>
            
            // Agregar botones de respuesta rápida
            if (buttons && buttons.length > 0) {
                const buttonsContainer = document.createElement('div');
                buttonsContainer.className = 'quick-reply-buttons'; // Usar clase para estilos
                
                buttons.forEach(buttonText => {
                    const btn = document.createElement('button');
                    btn.textContent = buttonText;
                    
                    btn.addEventListener('click', () => {
                        if (chatbotInput) {
                            chatbotInput.value = buttonText;
                            handleMessage();
                        }
                    });
                    
                    buttonsContainer.appendChild(btn);
                });
                
                messageElement.appendChild(buttonsContainer);
            }
            
            // Reproducir voz automáticamente
            setTimeout(() => speakText(messageText), 300);
            
        } else {
            p.textContent = text; // Para mensajes de usuario, usar textContent es más seguro
        }

        messageElement.appendChild(p);
        if (chatbotMessages) {
            chatbotMessages.appendChild(messageElement);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
    }

    // === BÚSQUEDA EN BASE DE CONOCIMIENTO ===
    function findBestMatch(userText, rules) {
        const normalizedUserText = userText.toLowerCase().trim();
        let bestMatch = null;
        let highestScore = 0;

        for (const rule of rules) {
            if (rule && rule.keywords) {
                for (const keyword of rule.keywords) {
                    const normalizedKeyword = keyword.toLowerCase().trim();
                    let currentScore = 0;

                    if (normalizedUserText === normalizedKeyword) {
                        currentScore = 100; // Coincidencia exacta es la máxima prioridad
                    } else if (normalizedUserText.includes(normalizedKeyword)) {
                        // Puntaje basado en la longitud de la palabra clave
                        currentScore = normalizedKeyword.length; 
                    }

                    if (currentScore > highestScore) {
                        highestScore = currentScore;
                        bestMatch = rule;
                    }
                }
            }
        }
        
        if (bestMatch) {
             console.log(`🎯 Mejor coincidencia encontrada con puntaje ${highestScore}`);
        }
        return bestMatch;
    }

    // === INDICADOR DE ESCRITURA ===
    function addTypingIndicator() {
        if (document.getElementById('typing-indicator')) return; // Evitar duplicados
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'message bot-message';
        typingDiv.innerHTML = `
            <div class="typing-dots">
                <div></div>
                <div></div>
                <div></div>
            </div>
        `;
        
        if (chatbotMessages) {
            chatbotMessages.appendChild(typingDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    // === MANEJO PRINCIPAL DE MENSAJES ===
    async function handleMessage() {
        if (!chatbotInput) return;
        const text = chatbotInput.value.trim();
        if (!text) return;
        
        console.log('📝 Procesando mensaje:', text);
        
        addMessage('user', text);
        chatbotInput.value = '';
        
        // Buscar en base de conocimiento local primero
        const matchedRule = findBestMatch(text, recybersegRules);
        
        if (matchedRule) {
            addTypingIndicator();
            setTimeout(() => {
                removeTypingIndicator();
                addMessage('bot', matchedRule.response, matchedRule.buttons || []);
            }, 800); // Simula un pensamiento rápido
            return;
        }

        // Si no hay coincidencia, usar IA de Gemini
        addTypingIndicator();
        
        try {
            const fullPrompt = `${systemPrompt}\n\n**Consulta del Usuario:**\n${text}\n\n**Respuesta:**`;
            
            // IMPORTANTE: Reemplaza "TU_API_KEY" con tu clave de API real de Google AI Studio.
            const apiKey = "TU_API_KEY"; // <-- REEMPLAZA ESTA CLAVE
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: fullPrompt }] }]
                })
            });

            removeTypingIndicator();

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error de la API de Gemini:', errorData);
                throw new Error(`Error ${response.status}: ${errorData.error?.message || 'Error desconocido'}`);
            }

            const result = await response.json();
            const aiResponse = result.candidates?.[0]?.content?.parts?.[0]?.text ||
                               "Lo siento, no pude procesar tu consulta en este momento. ¿Puedes intentar de otra manera?";
            
            addMessage('bot', aiResponse);

        } catch (error) {
            console.error('❌ Error en la llamada a la IA:', error);
            removeTypingIndicator();
            addMessage('bot', `Hubo un problema de conexión con mi cerebro digital. Por favor, intenta de nuevo más tarde. Error: ${error.message}`);
        }
    }

    // === CREAR CONTROLES DE VOZ ===
    function createVoiceControls() {
        const header = document.querySelector('.chatbot-header');
        if (!header || document.getElementById('voice-controls')) return;

        const controlsContainer = document.createElement('div');
        controlsContainer.id = 'voice-controls';

        // Botón toggle auto-lectura
        const autoReadBtn = document.createElement('button');
        autoReadBtn.id = 'auto-read-btn';
        autoReadBtn.className = 'header-btn';
        autoReadBtn.innerHTML = isAutoReadEnabled ? '🔊' : '🔇';
        autoReadBtn.title = isAutoReadEnabled ? 'Desactivar lectura automática' : 'Activar lectura automática';
        
        // Botón de micrófono
        const micBtn = document.createElement('button');
        micBtn.id = 'mic-btn';
        micBtn.className = 'header-btn';
        micBtn.innerHTML = '🎤';
        micBtn.title = 'Presiona para hablar';
        if (!SpeechRecognition) {
            micBtn.disabled = true;
            micBtn.title = 'Reconocimiento de voz no disponible';
            micBtn.style.opacity = '0.5';
        }

        // Eventos
        autoReadBtn.addEventListener('click', () => {
            isAutoReadEnabled = !isAutoReadEnabled;
            localStorage.setItem('chatbot-voice-enabled', isAutoReadEnabled);
            autoReadBtn.innerHTML = isAutoReadEnabled ? '🔊' : '🔇';
            autoReadBtn.title = isAutoReadEnabled ? 'Desactivar lectura automática' : 'Activar lectura automática';
            
            if (!isAutoReadEnabled) speechSynth.cancel();
            
            autoReadBtn.style.backgroundColor = isAutoReadEnabled ? 'rgba(0,255,0,0.3)' : 'rgba(255,0,0,0.3)';
            setTimeout(() => autoReadBtn.style.backgroundColor = '', 500);
        });

        // Eventos del micrófono (click para activar/desactivar)
        micBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (isListening) {
                stopListening();
            } else {
                startListening();
            }
        });

        controlsContainer.appendChild(autoReadBtn);
        controlsContainer.appendChild(micBtn);
        header.appendChild(controlsContainer);
        
        console.log('🎤 Controles de voz avanzados creados');
    }

    // === EVENT LISTENERS PRINCIPALES ===
    if (chatToggleButton) {
        chatToggleButton.addEventListener('click', () => {
            chatbotContainer.classList.toggle('active');
            console.log('🔄 Toggle chatbot');
            if (chatbotContainer.classList.contains('active') && chatbotMessages.children.length === 0) {
                 // Saludo inicial solo la primera vez que se abre
                 addTypingIndicator();
                 setTimeout(() => {
                    removeTypingIndicator();
                    const welcomeRule = recybersegRules.find(r => r.keywords.includes('hola'));
                    if(welcomeRule) {
                        addMessage('bot', welcomeRule.response, welcomeRule.buttons);
                    }
                 }, 1000);
            }
        });
    }

    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', () => {
            chatbotContainer.classList.remove('active');
            console.log('❌ Cerrando chatbot');
        });
    }

    if (chatbotForm) {
        chatbotForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleMessage();
        });
    }

    // === MANEJO DEL TECLADO VIRTUAL EN MÓVILES ===
    let initialHeight = window.innerHeight;
    
    function handleKeyboardVisibility() {
        const currentHeight = window.innerHeight;
        const isKeyboardVisible = initialHeight > currentHeight + 150; // Umbral de 150px
        
        if (chatbotContainer) {
            chatbotContainer.classList.toggle('keyboard-active', isKeyboardVisible);
        }
    }

    window.addEventListener('resize', handleKeyboardVisibility);
    
    if (chatbotInput) {
        chatbotInput.addEventListener('focus', () => setTimeout(handleKeyboardVisibility, 300));
        chatbotInput.addEventListener('blur', () => setTimeout(() => {
            if (chatbotContainer) chatbotContainer.classList.remove('keyboard-active');
        }, 300));
    }

    // === INICIALIZACIÓN FINAL ===
    createVoiceControls();
    console.log('✅ Chatbot completamente inicializado y listo.');

    // === API GLOBAL SIMPLE (OPCIONAL) ===
    window.chatbot = {
        toggle: () => chatToggleButton?.click(),
        close: () => closeChatBtn?.click(),
        speak: (text) => speakText(text),
        toggleVoice: () => document.getElementById('auto-read-btn')?.click(),
        startListening: () => startListening(),
        stopListening: () => stopListening(),
        isListening: () => isListening
    };

    console.log('🎉 Chatbot listo para usar. Llama a window.chatbot para interactuar desde la consola.');
});

