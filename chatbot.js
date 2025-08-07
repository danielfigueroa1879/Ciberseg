// Chatbot RECYBERSEG - Con Lógica Avanzada y Voz Bidireccional
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 Chatbot RECYBERSEG iniciando con lógica avanzada...");

    // === CONFIGURACIÓN PRINCIPAL ===
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const speechSynth = window.speechSynthesis;
    let recognition = null;
    let isListening = false;
    let availableVoices = [];
    let isAutoReadEnabled = true;
    let isVoiceEnabled = localStorage.getItem('chatbot-voice-enabled') !== 'false';

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
        console.error("❌ Elementos críticos del chatbot no encontrados");
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
        if (!isAutoReadEnabled || !isVoiceEnabled) return;
        
        const cleanText = text
            .replace(/<[^>]*>/g, ' ')
            .replace(/\[CONTACT_BUTTON\]/g, '')
            .replace(/RECYBERSEG/gi, 'Reci-Ber-Seg')
            .replace(/IoT/g, 'Internet de las Cosas')
            .replace(/24\/7/g, 'veinticuatro siete')
            .replace(/&nbsp;/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        
        if (!cleanText || !speechSynth) return;

        speechSynth.cancel();
        const utterance = new SpeechSynthesisUtterance(cleanText);

        // Seleccionar la mejor voz masculina
        let selectedVoice = null;
        if (availableVoices.length > 0) {
            selectedVoice = availableVoices.find(voice => 
                voice.name.toLowerCase().includes('diego') && voice.lang.startsWith('es')) ||
                availableVoices.find(voice => 
                    (voice.name.toLowerCase().includes('jorge') || voice.name.toLowerCase().includes('carlos')) && voice.lang.startsWith('es')) ||
                availableVoices.find(voice => 
                    voice.lang.startsWith('es') && !voice.name.toLowerCase().match(/laura|helena|paulina|isabelle|sofia|camila|elena|isabel/i)) ||
                availableVoices.find(voice => voice.lang.startsWith('es'));
        }

        if (selectedVoice) {
            utterance.voice = selectedVoice;
            console.log('🗣️ Usando voz:', selectedVoice.name);
        }

        utterance.lang = 'es-ES';
        utterance.rate = 1.3;  // Rápido y energético
        utterance.pitch = 0.8; // Masculino
        utterance.volume = 1.0; // Alto
        speechSynth.speak(utterance);
    }

    // === RECONOCIMIENTO DE VOZ ===
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'es-ES';
        recognition.continuous = true;
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
            
            // Mostrar texto en tiempo real
            if (chatbotInput) {
                chatbotInput.value = finalTranscript + interimTranscript;
                
                // Si hay texto final, procesar
                if (finalTranscript.trim()) {
                    console.log('✅ Reconocimiento final:', finalTranscript);
                    setTimeout(() => {
                        stopListening();
                        handleMessage();
                    }, 500);
                }
            }
        };
        
        recognition.onend = () => {
            isListening = false;
            hideListeningState();
        };
        
        recognition.onerror = (event) => {
            console.error('❌ Error reconocimiento:', event.error);
            isListening = false;
            hideListeningState();
        };
        
        console.log('🎙️ Reconocimiento de voz inicializado');
    } else {
        console.warn('⚠️ Reconocimiento de voz no disponible');
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
        const bigMicBtn = document.getElementById('big-mic-btn');
        const micBtnHeader = document.getElementById('mic-btn-header');
        const instructionText = document.getElementById('mic-instruction');
        const statusIndicator = document.getElementById('voice-status');
        
        // Actualizar micrófono grande
        if (bigMicBtn) {
            bigMicBtn.innerHTML = '🔴';
            bigMicBtn.style.background = 'linear-gradient(145deg, #ef4444, #f87171)';
            bigMicBtn.style.borderColor = '#fca5a5';
            bigMicBtn.style.animation = 'pulse 1s infinite';
            bigMicBtn.title = 'Escuchando... (Suelta para enviar)';
        }
        
        // Actualizar micrófono del header
        if (micBtnHeader) {
            micBtnHeader.innerHTML = '🔴';
            micBtnHeader.style.animation = 'pulse 1s infinite';
        }
        
        // Actualizar texto instructivo
        if (instructionText) {
            instructionText.textContent = '🎙️ Escuchando... Hablando se escribe automáticamente';
            instructionText.style.color = '#ef4444';
            instructionText.style.fontWeight = 'bold';
        }
        
        // Mostrar indicador de estado
        if (statusIndicator) {
            statusIndicator.style.opacity = '1';
            statusIndicator.style.background = '#ef4444';
            statusIndicator.style.animation = 'pulse 0.8s infinite';
        }
        
        // Actualizar input
        if (chatbotInput) {
            chatbotInput.placeholder = '🎙️ Hablando... se está escribiendo automáticamente';
            chatbotInput.style.borderColor = '#ef4444';
            chatbotInput.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';
        }
    }
    
    function hideListeningState() {
        const bigMicBtn = document.getElementById('big-mic-btn');
        const micBtnHeader = document.getElementById('mic-btn-header');
        const instructionText = document.getElementById('mic-instruction');
        const statusIndicator = document.getElementById('voice-status');
        
        // Restaurar micrófono grande
        if (bigMicBtn) {
            bigMicBtn.innerHTML = '🎤';
            bigMicBtn.style.background = 'linear-gradient(145deg, #3182ce, #4299e1)';
            bigMicBtn.style.borderColor = '#63b3ed';
            bigMicBtn.style.animation = 'none';
            bigMicBtn.title = 'MANTÉN PRESIONADO para hablar';
        }
        
        // Restaurar micrófono del header
        if (micBtnHeader) {
            micBtnHeader.innerHTML = '🎤';
            micBtnHeader.style.animation = 'none';
        }
        
        // Restaurar texto instructivo
        if (instructionText) {
            instructionText.textContent = 'Mantén presionado para hablar';
            instructionText.style.color = 'var(--text-white)';
            instructionText.style.fontWeight = 'normal';
        }
        
        // Ocultar indicador de estado
        if (statusIndicator) {
            statusIndicator.style.opacity = '0';
            statusIndicator.style.background = '#22c55e';
            statusIndicator.style.animation = 'none';
        }
        
        // Restaurar input
        if (chatbotInput) {
            chatbotInput.placeholder = 'Escribe tu pregunta...';
            chatbotInput.style.borderColor = '';
            chatbotInput.style.boxShadow = '';
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
                    display: block;
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
            
            // Agregar botones de respuesta rápida
            if (buttons && buttons.length > 0) {
                const buttonsContainer = document.createElement('div');
                buttonsContainer.style.cssText = 'margin-top: 10px; display: flex; flex-wrap: wrap; gap: 5px;';
                
                buttons.forEach(buttonText => {
                    const btn = document.createElement('button');
                    btn.textContent = buttonText;
                    btn.style.cssText = `
                        background: rgba(49, 130, 206, 0.1);
                        border: 1px solid #3182ce;
                        color: #3182ce;
                        padding: 5px 10px;
                        border-radius: 15px;
                        font-size: 12px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    `;
                    
                    btn.addEventListener('click', () => {
                        chatbotInput.value = buttonText;
                        handleMessage();
                    });
                    
                    btn.addEventListener('mouseenter', () => {
                        btn.style.backgroundColor = '#3182ce';
                        btn.style.color = 'white';
                    });
                    
                    btn.addEventListener('mouseleave', () => {
                        btn.style.backgroundColor = 'rgba(49, 130, 206, 0.1)';
                        btn.style.color = '#3182ce';
                    });
                    
                    buttonsContainer.appendChild(btn);
                });
                
                messageElement.appendChild(buttonsContainer);
            }
            
            p.innerHTML = messageText;
            p.style.textAlign = 'justify';
            
            // Reproducir voz automáticamente
            setTimeout(() => speakText(messageText), 300);
            
        } else {
            p.textContent = text;
        }

        messageElement.appendChild(p);
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // === BÚSQUEDA EN BASE DE CONOCIMIENTO ===
    function findExactMatch(userText, rules) {
        const normalizedUserText = userText.toLowerCase().trim();
        
        // 1. Buscar coincidencia exacta
        for (const rule of rules) {
            if (rule && rule.keywords) {
                for (const keyword of rule.keywords) {
                    const normalizedKeyword = keyword.toLowerCase().trim();
                    
                    if (normalizedUserText === normalizedKeyword) {
                        console.log(`🎯 Coincidencia EXACTA: "${normalizedUserText}"`);
                        return rule;
                    }
                }
            }
        }
        
        // 2. Buscar por inclusión (para frases largas)
        if (normalizedUserText.length > 5) {
            for (const rule of rules) {
                if (rule && rule.keywords) {
                    for (const keyword of rule.keywords) {
                        const normalizedKeyword = keyword.toLowerCase().trim();
                        
                        if (normalizedKeyword.length > 3 && normalizedUserText.includes(normalizedKeyword)) {
                            console.log(`🔍 Coincidencia por INCLUSIÓN: "${normalizedKeyword}"`);
                            return rule;
                        }
                    }
                }
            }
        }
        
        return null;
    }

    // === INDICADOR DE ESCRITURA ===
    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'message bot-message';
        typingDiv.innerHTML = `
            <div class="typing-dots" style="display: flex; gap: 5px; padding: 10px;">
                <div style="width: 8px; height: 8px; background: #3182ce; border-radius: 50%; animation: bounce 1.4s infinite;"></div>
                <div style="width: 8px; height: 8px; background: #3182ce; border-radius: 50%; animation: bounce 1.4s infinite 0.2s;"></div>
                <div style="width: 8px; height: 8px; background: #3182ce; border-radius: 50%; animation: bounce 1.4s infinite 0.4s;"></div>
            </div>
        `;
        
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    // === MANEJO PRINCIPAL DE MENSAJES ===
    async function handleMessage() {
        const text = chatbotInput.value.trim();
        if (!text) return;
        
        console.log('📝 Procesando mensaje:', text);
        
        addMessage('user', text);
        chatbotInput.value = '';
        
        // Buscar en base de conocimiento
        const matchedRule = findExactMatch(text, recybersegRules);
        
        if (matchedRule) {
            setTimeout(() => {
                addMessage('bot', matchedRule.response, matchedRule.buttons || []);
            }, 500);
            return;
        }

        // Si no hay coincidencia, usar IA
        addTypingIndicator();
        
        try {
            const fullPrompt = `${systemPrompt}\n\n**Consulta del Usuario:**\n${text}\n\n**Respuesta:**`;
            
            const apiKey = "AIzaSyAq7n6WM4WuPKR0CZzIUgAUdI53fm4CpoA";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: fullPrompt }] }]
                })
            });

            removeTypingIndicator();

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            const aiResponse = result.candidates?.[0]?.content?.parts?.[0]?.text || 
                              "Lo siento, no pude procesar tu consulta. ¿Puedes intentar de otra manera?";
            
            addMessage('bot', aiResponse);

        } catch (error) {
            console.error('❌ Error en IA:', error);
            removeTypingIndicator();
            addMessage('bot', `Hubo un problema de conexión. Error: ${error.message}`);
        }
    }

    // === CREAR CONTROLES DE VOZ MEJORADOS ===
    function createVoiceControls() {
        const header = document.querySelector('.chatbot-header');
        const chatForm = document.querySelector('.chatbot-form');
        
        if (!header || document.getElementById('voice-controls')) return;

        // === CONTROLES EN EL HEADER ===
        const controlsContainer = document.createElement('div');
        controlsContainer.id = 'voice-controls';
        controlsContainer.style.cssText = 'display: flex; gap: 5px; align-items: center;';

        // Botón toggle auto-lectura
        const autoReadBtn = document.createElement('button');
        autoReadBtn.id = 'auto-read-btn';
        autoReadBtn.innerHTML = isAutoReadEnabled ? '🔊' : '🔇';
        autoReadBtn.title = isAutoReadEnabled ? 'Desactivar lectura automática' : 'Activar lectura automática';
        
        // Botón de micrófono pequeño (header)
        const micBtnHeader = document.createElement('button');
        micBtnHeader.id = 'mic-btn-header';
        micBtnHeader.innerHTML = '🎤';
        micBtnHeader.title = 'Activar micrófono grande';

        // Estilos para botones del header
        [autoReadBtn, micBtnHeader].forEach(btn => {
            btn.style.cssText = `
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                padding: 8px;
                border-radius: 50%;
                transition: all 0.3s ease;
                min-width: 36px;
                min-height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            btn.addEventListener('mouseenter', () => {
                btn.style.backgroundColor = 'rgba(255,255,255,0.2)';
                btn.style.transform = 'scale(1.1)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.backgroundColor = 'transparent';
                btn.style.transform = 'scale(1)';
            });
        });

        controlsContainer.appendChild(autoReadBtn);
        controlsContainer.appendChild(micBtnHeader);
        header.appendChild(controlsContainer);

        // === MICRÓFONO GRANDE EN EL FORMULARIO ===
        if (chatForm && !document.getElementById('big-mic-btn')) {
            // Contenedor para el micrófono grande
            const micContainer = document.createElement('div');
            micContainer.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10px;
                border-top: 1px solid var(--border-color);
                background-color: var(--bg-card);
            `;

            // Micrófono grande
            const bigMicBtn = document.createElement('button');
            bigMicBtn.id = 'big-mic-btn';
            bigMicBtn.innerHTML = '🎤';
            bigMicBtn.title = 'MANTÉN PRESIONADO para hablar';
            bigMicBtn.style.cssText = `
                background: linear-gradient(145deg, #3182ce, #4299e1);
                border: 3px solid #63b3ed;
                color: white;
                font-size: 32px;
                cursor: pointer;
                padding: 20px;
                border-radius: 50%;
                transition: all 0.3s ease;
                min-width: 80px;
                min-height: 80px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 15px rgba(49, 130, 206, 0.3);
                position: relative;
                overflow: hidden;
            `;

            // Texto instructivo
            const instructionText = document.createElement('div');
            instructionText.id = 'mic-instruction';
            instructionText.textContent = 'Mantén presionado para hablar';
            instructionText.style.cssText = `
                color: var(--text-white);
                font-size: 12px;
                text-align: center;
                margin-top: 8px;
                opacity: 0.7;
            `;

            // Indicador de estado
            const statusIndicator = document.createElement('div');
            statusIndicator.id = 'voice-status';
            statusIndicator.style.cssText = `
                position: absolute;
                top: -5px;
                right: -5px;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #22c55e;
                border: 3px solid white;
                opacity: 0;
                transition: all 0.3s ease;
            `;

            bigMicBtn.appendChild(statusIndicator);
            micContainer.appendChild(bigMicBtn);
            micContainer.appendChild(instructionText);

            // Insertar antes del formulario
            chatForm.parentNode.insertBefore(micContainer, chatForm);
        }

        // === EVENTOS PARA AUTO-LECTURA ===
        autoReadBtn.addEventListener('click', () => {
            isAutoReadEnabled = !isAutoReadEnabled;
            localStorage.setItem('chatbot-voice-enabled', isAutoReadEnabled);
            autoReadBtn.innerHTML = isAutoReadEnabled ? '🔊' : '🔇';
            autoReadBtn.title = isAutoReadEnabled ? 'Desactivar lectura automática' : 'Activar lectura automática';
            
            if (!isAutoReadEnabled) speechSynth.cancel();
            
            autoReadBtn.style.backgroundColor = isAutoReadEnabled ? 
                'rgba(0,255,0,0.3)' : 'rgba(255,0,0,0.3)';
            setTimeout(() => autoReadBtn.style.backgroundColor = 'transparent', 1000);
            
            console.log(`🔊 Auto-lectura ${isAutoReadEnabled ? 'activada' : 'desactivada'}`);
        });

        // === EVENTOS PARA MICRÓFONO HEADER ===
        micBtnHeader.addEventListener('click', () => {
            const bigMic = document.getElementById('big-mic-btn');
            if (bigMic) {
                bigMic.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Efecto de pulso para llamar la atención
                bigMic.style.animation = 'pulse 1s ease-in-out 3';
                setTimeout(() => bigMic.style.animation = 'none', 3000);
            }
        });

        // === EVENTOS PARA MICRÓFONO GRANDE ===
        const bigMicBtn = document.getElementById('big-mic-btn');
        const instructionText = document.getElementById('mic-instruction');
        const statusIndicator = document.getElementById('voice-status');

        if (bigMicBtn && instructionText && statusIndicator) {
            // Eventos de mouse
            bigMicBtn.addEventListener('mousedown', (e) => {
                e.preventDefault();
                startListening();
                bigMicBtn.style.transform = 'scale(0.95)';
            });

            bigMicBtn.addEventListener('mouseup', (e) => {
                e.preventDefault();
                stopListening();
                bigMicBtn.style.transform = 'scale(1)';
            });

            bigMicBtn.addEventListener('mouseleave', (e) => {
                if (isListening) {
                    stopListening();
                    bigMicBtn.style.transform = 'scale(1)';
                }
            });

            // Eventos táctiles para móvil
            bigMicBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                startListening();
                bigMicBtn.style.transform = 'scale(0.95)';
            });

            bigMicBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                stopListening();
                bigMicBtn.style.transform = 'scale(1)';
            });

            // Efecto hover
            bigMicBtn.addEventListener('mouseenter', () => {
                if (!isListening) {
                    bigMicBtn.style.transform = 'scale(1.05)';
                    bigMicBtn.style.boxShadow = '0 6px 20px rgba(49, 130, 206, 0.4)';
                }
            });

            bigMicBtn.addEventListener('mouseleave', () => {
                if (!isListening) {
                    bigMicBtn.style.transform = 'scale(1)';
                    bigMicBtn.style.boxShadow = '0 4px 15px rgba(49, 130, 206, 0.3)';
                }
            });
        }

        console.log('🎤 Sistema de micrófono grande y controles creados');
    }

    // === EVENT LISTENERS PRINCIPALES ===
    chatToggleButton.addEventListener('click', () => {
        chatbotContainer.classList.toggle('active');
        console.log('🔄 Toggle chatbot');
    });

    closeChatBtn.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
        console.log('❌ Cerrando chatbot');
    });

    chatbotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleMessage();
    });

    // === MANEJO DEL TECLADO VIRTUAL ===
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

    window.addEventListener('resize', handleKeyboard);
    
    if (chatbotInput) {
        chatbotInput.addEventListener('focus', () => setTimeout(handleKeyboard, 300));
        chatbotInput.addEventListener('blur', () => {
            setTimeout(() => chatbotContainer.classList.remove('keyboard-active'), 300);
        });
    }

    // === INICIALIZACIÓN ===
    setTimeout(() => {
        createVoiceControls();
        
        // Mensaje de bienvenida con botones
        const welcomeButtons = ['Servicios', 'Auditorías', 'Monitoreo 24/7', 'IoT', 'Contacto'];
        addMessage('bot', 
            '¡Hola! Soy <strong>Cyber Asistente</strong> de RECYBERSEG. ¡Estoy aquí para ayudarte con toda la información sobre nuestros servicios de ciberseguridad de vanguardia! ¿En qué puedo asistirte hoy?', 
            welcomeButtons);
        
        console.log('✅ Chatbot RECYBERSEG completamente inicializado con lógica avanzada');
        
    }, 1000);

    // === API GLOBAL EXTENDIDA ===
    window.chatbotRECYBERSEG = {
        // Control básico
        toggle: () => chatbotContainer.classList.toggle('active'),
        open: () => chatbotContainer.classList.add('active'),
        close: () => chatbotContainer.classList.remove('active'),
        
        // Control de voz
        speak: (text) => speakText(text),
        toggleAutoRead: () => document.getElementById('auto-read-btn')?.click(),
        startListening: () => startListening(),
        stopListening: () => stopListening(),
        
        // Estado
        isListening: () => isListening,
        isAutoReadEnabled: () => isAutoReadEnabled,
        
        // Mensajes
        sendMessage: (text) => {
            chatbotInput.value = text;
            handleMessage();
        },
        addMessage: (sender, text, buttons = []) => addMessage(sender, text, buttons),
        
        // Utilidades
        clearChat: () => {
            chatbotMessages.innerHTML = '';
            const welcomeButtons = ['Servicios', 'Auditorías', 'Monitoreo 24/7', 'IoT', 'Contacto'];
            addMessage('bot', 
                '¡Hola! Soy <strong>Cyber Asistente</strong> de RECYBERSEG. ¡Estoy aquí para ayudarte con toda la información sobre nuestros servicios de ciberseguridad de vanguardia! ¿En qué puedo asistirte hoy?', 
                welcomeButtons);
        },
        
        // Debug info
        getState: () => ({
            isListening,
            isAutoReadEnabled,
            availableVoices: availableVoices.length,
            hasRecognition: !!recognition,
            rulesCount: recybersegRules.length
        })
    };

    // === ATAJOS DE TECLADO ===
    document.addEventListener('keydown', (e) => {
        // Alt + V para activar reconocimiento de voz
        if (e.altKey && e.key === 'v') {
            e.preventDefault();
            if (isListening) {
                stopListening();
            } else {
                startListening();
            }
        }
        
        // Alt + C para abrir/cerrar chatbot
        if (e.altKey && e.key === 'c') {
            e.preventDefault();
            chatbotContainer.classList.toggle('active');
        }
        
        // Alt + S para toggle auto-lectura
        if (e.altKey && e.key === 's') {
            e.preventDefault();
            document.getElementById('auto-read-btn')?.click();
        }
    });

    // === MANEJO DE ERRORES GLOBAL ===
    window.addEventListener('error', (event) => {
        console.error('💥 Error global capturado:', event.error);
    });

    window.addEventListener('unhandledrejection', (event) => {
        console.error('💥 Promise rechazada:', event.reason);
    });

    // === VERIFICACIÓN DE COMPATIBILIDAD ===
    function checkCompatibility() {
        const features = {
            speechSynthesis: 'speechSynthesis' in window,
            speechRecognition: !!(window.SpeechRecognition || window.webkitSpeechRecognition),
            fetch: 'fetch' in window,
            localStorage: 'localStorage' in window,
            classList: 'classList' in document.createElement('div')
        };
        
        console.log('🔍 Verificación de compatibilidad:', features);
        
        const unsupported = Object.entries(features)
            .filter(([feature, supported]) => !supported)
            .map(([feature]) => feature);
        
        if (unsupported.length > 0) {
            console.warn('⚠️ Funciones no soportadas:', unsupported);
            
            // Mostrar mensaje si falta algo crítico
            if (unsupported.includes('speechSynthesis') && unsupported.includes('speechRecognition')) {
                setTimeout(() => {
                    addMessage('bot', 
                        '⚠️ <strong>Aviso:</strong> Tu navegador no soporta funciones de voz. El chatbot funcionará solo con texto. Te recomiendo usar Chrome, Edge o Safari para la experiencia completa.');
                }, 2000);
            }
        }
        
        return features;
    }

    checkCompatibility();

    console.log('🎉 Chatbot RECYBERSEG listo - Versión Avanzada con Lógica Superior');

    // === FUNCIÓN DE LIMPIEZA AL CERRAR ===
    window.addEventListener('beforeunload', () => {
        if (speechSynth) {
            speechSynth.cancel();
        }
        if (recognition && isListening) {
            recognition.stop();
        }
    });

});
