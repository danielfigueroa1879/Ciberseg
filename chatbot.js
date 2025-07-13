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
            // Si hay entrada, agregar el mensaje del usuario al chat y obtener una respuesta
            addMessage(userInput, 'user');
            chatbotInput.value = ''; // Limpiar el campo de entrada
            getFallbackResponse(userInput); // Usar la función de respaldo
        }
    });

    // --- Funciones Principales ---

    /**
     * Agrega un mensaje a la ventana del chat.
     * @param {string} text - El texto del mensaje.
     * @param {string} sender - El remitente del mensaje ('user' o 'bot').
     */
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        const p = document.createElement('p');
        p.textContent = text;
        messageElement.appendChild(p);
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    /**
     * Proporciona una respuesta predefinida basada en palabras clave.
     * Esta es una solución temporal mientras se resuelve el error 403 de la API.
     * @param {string} userInput - El texto de entrada del usuario.
     */
    function getFallbackResponse(userInput) {
        loadingIndicator.style.display = 'flex';
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        const lowerInput = userInput.toLowerCase();
        let botResponse = '';

        // Lógica de respuestas basada en palabras clave
        if (lowerInput.includes('hola') || lowerInput.includes('saludos')) {
            botResponse = '¡Hola! Soy Cyber Asistente, tu guía en RECYBERSEG. ¿En qué puedo ayudarte?';
        } else if (lowerInput.includes('auditoría')) {
            botResponse = 'Ofrecemos auditorías de seguridad completas para evaluar tu infraestructura digital y encontrar posibles vulnerabilidades.';
        } else if (lowerInput.includes('monitoreo')) {
            botResponse = 'Nuestro servicio de monitoreo de redes ofrece supervisión 24/7 para proteger tu red corporativa contra amenazas.';
        } else if (lowerInput.includes('consultoría') || lowerInput.includes('asesoramiento')) {
            botResponse = 'Brindamos consultoría experta y personalizada en ciberseguridad para ayudarte a fortalecer tu postura de seguridad.';
        } else if (lowerInput.includes('iot')) {
            botResponse = 'Nos especializamos en la seguridad de dispositivos IoT (Internet de las Cosas), protegiendo tus dispositivos inteligentes, redes y datos asociados.';
        } else if (lowerInput.includes('precio') || lowerInput.includes('costo')) {
            botResponse = 'Para obtener información sobre precios y cotizaciones personalizadas, por favor completa nuestro formulario de contacto y un especialista se comunicará contigo.';
        } else if (lowerInput.includes('gracias')) {
            botResponse = '¡De nada! ¿Hay algo más en lo que pueda ayudarte?';
        } else {
            botResponse = 'Gracias por tu pregunta. Para darte la información más precisa, te recomiendo completar nuestro formulario de contacto y uno de nuestros especialistas en ciberseguridad se pondrá en contacto contigo a la brevedad.';
        }

        // Simular un pequeño retraso para que parezca que está "pensando"
        setTimeout(() => {
            addMessage(botResponse, 'bot');
            loadingIndicator.style.display = 'none';
        }, 1000);
    }
});
