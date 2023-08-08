const cajaChat = document.getElementById('cajaChat');
const mensajeUsuario = document.getElementById('mensajeUsuario');


const botonChat = document.getElementById('botonChat');
const chatContainer = document.querySelector('.contenedorChat');

let firstQuestion = true;

botonChat.addEventListener('click', () => {
  chatContainer.classList.toggle('hidden');
});

let chatData = {
  name: "",
  email: "",
  phoneNumber: "",
};

function appendMessage(message, isUserMessage = false) {
  const messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  messageDiv.classList.add(isUserMessage ? 'user-message' : 'bot-message');
  cajaChat.appendChild(messageDiv);
}

function addUserMessage(message) {
  appendMessage(message, true);
}

function sendMessage() {
  const userResponse = mensajeUsuario.value.trim();
  mensajeUsuario.value = "";

  if (!userResponse) {
    return; 
  }

  if (firstQuestion && !isValidResponde(userResponse)){
    appendMessage('Por favor, responde solo con "Si" o "No".' )
    return
  }

  addUserMessage(userResponse);

  if (firstQuestion){ 
    switch (userResponse) {
      case "si":
      case "Si":
        appendMessage("Agrega tu nombre 👤:");
        break;
      case "no":
      case "No":
        appendMessage("Estaremos pendientes");
        break;
      default:
        handleNextQuestion(userResponse);
        break;
    }
    firstQuestion=false;
  } else{
    handleNextQuestion(userResponse);
  }
}

function isValidResponde(response){
  return response === "Si" || response === "si" || response === "No" || response === "no";
}

function handleNextQuestion(userResponse) {
  if (!chatData.name) {
    chatData.name = userResponse;
    appendMessage(`Hola, ${chatData.name}. Agrega tu correo electrónico 📧:`);
  } else if (!chatData.email) {
    if (!validEmail(userResponse)) {
      appendMessage("Por favor, ingresa una dirección de correo electrónico valida.")
      return;
    }
    chatData.email = userResponse;
    appendMessage("Agrega tu número telefónico 📞:");
  } else if (!chatData.phoneNumber) {
    chatData.phoneNumber = userResponse;
    appendMessage('Gracias, nos pondremos en contacto contigo.😊');

    // Set the input values
    document.getElementById('respuesta1').value = chatData.name;
    document.getElementById('respuesta2').value = chatData.email;
    document.getElementById('respuesta3').value = chatData.phoneNumber;

    // Prepare the form data
    const formData = new FormData(document.getElementById('chatForm'));

    // Enviar datos a través de AJAX al servidor
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '../process_data.php', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        // Procesar la respuesta del servidor aquí (opcional)
        console.log(xhr.responseText);
      }
    };
    xhr.send(formData);
  }
}

function validEmail(email){
  return email.includes('@')
}

function handleKeyPress(event) {
  if (event.keyCode === 13) {
    sendMessage();
  }
}

mensajeUsuario.addEventListener('keypress', handleKeyPress);

appendMessage("Hola 👋, ¿Quieres ver más detalles de nuestros servicios? (Responde 'Si' o 'No')");
