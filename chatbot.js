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
        console.log("Chat toggle button clicked.");
        chatbotContainer.classList.toggle('active');
    });

    // Cerrar el chatbot al hacer clic en el botón de cerrar
    closeChatBtn.addEventListener('click', () => {
        console.log("Close chat button clicked.");
        chatbotContainer.classList.remove('active');
    });

    // Manejar el envío del formulario para enviar un mensaje
    chatbotForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevenir que el formulario recargue la página
        console.log("Chat form submitted.");
        const userInput = chatbotInput.value.trim(); // Obtener la entrada del usuario y eliminar espacios en blanco

        if (userInput) {
            console.log(`User input: ${userInput}`);
            // Si hay entrada, agregar el mensaje del usuario al chat y obtener una respuesta
            addMessage(userInput, 'user');
            chatbotInput.value = ''; // Limpiar el campo de entrada
            getAIResponse(userInput);
        } else {
            console.log("User input is empty.");
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
        console.log(`Message added: "${text}" from ${sender}`);
    }

    /**
     * Obtiene una respuesta de la IA de Gemini.
     * @param {string} userInput - El texto de entrada del usuario.
     */
    async function getAIResponse(userInput) {
        // Mostrar el indicador de carga mientras se obtiene la respuesta
        loadingIndicator.style.display = 'flex';
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        console.log("Showing loading indicator and fetching AI response...");

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

            console.log("Sending request to Gemini API...");
            // Realizar la llamada a la API
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                // Si la respuesta no es exitosa, lanzar un error con el estado
                throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            console.log("API Response received:", result);
            
            // Extraer el texto de la respuesta de la API de forma segura
            let botResponse;
            if (result.candidates && result.candidates[0] && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts[0]) {
                botResponse = result.candidates[0].content.parts[0].text;
            } else {
                // Mensaje de error si la estructura de la respuesta no es la esperada
                console.error("Respuesta de la API inesperada:", result);
                botResponse = 'Lo siento, no pude procesar la respuesta. Inténtalo de nuevo.';
            }
            
            // Agregar la respuesta del bot al chat
            addMessage(botResponse, 'bot');

        } catch (error) {
            console.error('Error al contactar la IA:', error);
            // Mostrar un mensaje de error detallado en el chat
            addMessage(`Hubo un problema al conectar con el asistente. Por favor, intenta de nuevo más tarde. (Error: ${error.message})`, 'bot');
        } finally {
            // Ocultar el indicador de carga independientemente del resultado
            loadingIndicator.style.display = 'none';
            console.log("Hiding loading indicator.");
        }
    }
});

