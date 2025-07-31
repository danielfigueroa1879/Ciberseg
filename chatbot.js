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
                backgroundColor: '#E0FD2C',
                color: '#0f0f0f',
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
                contactButton.style.backgroundColor = '#C7E525';
                contactButton.style.transform = 'scale(1.05)';
            };
            contactButton.onmouseout = () => {
                contactButton.style.backgroundColor = '#E0FD2C';
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
            addMessage(`Hubo un problema al conectar con el asistente. Por favor, intenta de nuevo más tarde. (Error: ${error.message})`, 'bot');
        } finally {
            // Ocultar el indicador de carga
            loadingIndicator.style.display = 'none';
        }
    }
});
// CORRECCIÓN: Se eliminó una llave de cierre '}' extra que causaba un error de sintaxis.
