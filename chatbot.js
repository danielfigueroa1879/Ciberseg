// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // Obtener referencias a todos los elementos HTML necesarios
    const chatToggleButton = document.getElementById('chat-toggle-button');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const loadingIndicator = document.getElementById('chatbot-loading');

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
            // Si hay entrada, agregar el mensaje del usuario al chat y obtener una respuesta
            addMessage(userInput, 'user');
            chatbotInput.value = ''; // Limpiar el campo de entrada
            getAIResponse(userInput);
        }
    });

    // --- Funciones Principales ---

    /**
     * Agrega un mensaje a la ventana del chat.
     * @param {string} text - El texto del mensaje.
     * @param {string} sender - El remitente del mensaje ('user' o 'bot').
     */
    function addMessage(text, sender) {
        // Crear un nuevo elemento div para el mensaje
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);

        // Crear un elemento de párrafo para el texto del mensaje
        const p = document.createElement('p');
        p.textContent = text;
        messageElement.appendChild(p);
        
        // Agregar el nuevo mensaje a la ventana del chat
        chatbotMessages.appendChild(messageElement);
        
        // Desplazarse automáticamente al último mensaje
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    /**
     * Obtiene una respuesta de la IA de Gemini.
     * @param {string} userInput - El texto de entrada del usuario.
     */
    async function getAIResponse(userInput) {
        // Mostrar el indicador de carga mientras se obtiene la respuesta
        loadingIndicator.style.display = 'flex';
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        // Este es el contexto y la instrucción para el modelo de IA
        const prompt = `Eres un asistente virtual para RECYBERSEG, una empresa chilena de ciberseguridad. Tu nombre es 'Cyber Asistente'. Responde a las preguntas de los usuarios sobre nuestros servicios, que incluyen:
        1.  **Auditorías de Seguridad**: Evaluación completa de infraestructura digital.
        2.  **Monitoreo de Redes**: Supervisión 24/7.
        3.  **Consultoría en Ciberseguridad**: Asesoramiento experto y personalizado.
        4.  **Implementación de Sistemas de Seguridad**: Configuración de firewalls, etc.
        5.  **Seguridad IoT**: Protección de dispositivos inteligentes.
        
        Nuestra misión es proteger el ecosistema digital de nuestros clientes con soluciones innovadoras.
        Nuestra visión es ser líderes en soluciones tecnológicas de seguridad digital.
        
        Sé amable, profesional y conciso. Si no sabes la respuesta, di que consultarás con un especialista. No inventes información. Responde en español.
        
        Aquí está la pregunta del usuario: "${userInput}"`;

        try {
            // Preparar el payload para la API de Gemini
            const payload = {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            };
            
            // La clave de API es manejada por el entorno de ejecución
            const apiKey = ""; 
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            // Realizar la llamada a la API
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Error en la API: ${response.statusText}`);
            }

            const result = await response.json();
            
            // Extraer el texto de la respuesta de la API
            let botResponse = 'Lo siento, no pude procesar tu solicitud en este momento.'; // Mensaje de error por defecto
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                botResponse = result.candidates[0].content.parts[0].text;
            }
            
            // Agregar la respuesta del bot al chat
            addMessage(botResponse, 'bot');

        } catch (error) {
            console.error('Error al contactar la IA:', error);
            // Mostrar un mensaje de error en el chat
            addMessage('Hubo un problema al conectar con el asistente. Por favor, intenta de nuevo más tarde.', 'bot');
        } finally {
            // Ocultar el indicador de carga independientemente del resultado
            loadingIndicator.style.display = 'none';
        }
    }
});
