const questionHeader = document.getElementById('questionHeader');
const responsesInput = document.getElementById('responses');
const nameInput = document.getElementById('nombre');
const emailInput = document.getElementById('correo');
const phoneInput = document.getElementById('telefono');
const nextQuestionButton = document.getElementById('nextQuestionButton');
const submitButton = document.getElementById('submitButton');
const formContainer = document.querySelector('.contenedorChat');
const botonChat = document.getElementById('botonChat');

const questions = [
  { header: ' Escribe tu nombre 👤:', input: nameInput },
  { header: ' Escribe tu correo 📧:', input: emailInput },
  { header: ' Escribe tu número telefónico 📞:', input: phoneInput }
];
const respuestasUsuario = {
  nombre: '',
  correo: '',
  telefono: ''
}
let currentQuestionIndex = 0;

botonChat.addEventListener('click', () => {
  formContainer.classList.toggle('hidden');
});
function storeUserResponses() {
  const nameResponse = nameInput.value.trim();
  const emailResponse = emailInput.value.trim();
  const phoneResponse = phoneInput.value.trim();

  respuestasUsuario.nombre = nameResponse;
  respuestasUsuario.correo = emailResponse;
  respuestasUsuario.telefono = phoneResponse;

  console.log('Respuestas del usuario:', 'Nombre: ', respuestasUsuario.nombre, 'Correo: ', respuestasUsuario.correo, 'Teléfono: ', respuestasUsuario.telefono);
}

function showNextQuestion() {
  if (currentQuestionIndex < questions.length) {
    questionHeader.innerText = questions[currentQuestionIndex].header;
    questionHeader.classList.add('show');
    nextQuestionButton.classList.add('show');
    responsesInput.classList.add('show');
    responsesInput.value = ''; // Limpiamos el campo de respuestas

    // Ocultar preguntas anteriores
    for (let i = 0; i < currentQuestionIndex; i++) {
      questions[i].input.classList.remove('show');
    }
  } else {
    questionHeader.innerText = 'Gracias, nos pondremos en contacto contigo.😊';
    responsesInput.value = ''; // Limpiamos el campo de respuestas
    questionHeader.classList.add('show');
    responsesInput.classList.remove('show');
    nextQuestionButton.classList.remove('show');
    // submitButton.style.display = 'block';
    ;
    // Ocultar la última pregunta también
    questions[currentQuestionIndex - 1].input.classList.remove('show');
    storeUserResponses()
  }
  const finalMessageShown = document.getElementById('questionHeader').innerText === 'Gracias, nos pondremos en contacto contigo.😊';

  // Si se ha mostrado el mensaje final, enviar el formulario
  if (finalMessageShown) {
    // const form = document.getElementById('miFormulario');
    // form.submit(); // Enviar el formulario de manera programática
    const nameResponse = nameInput.value.trim();
    const emailResponse = emailInput.value.trim();
    const phoneResponse = phoneInput.value.trim();

    const formData = new FormData();
    formData.append('nombre', nameResponse);
    formData.append('correo', emailResponse);
    formData.append('telefono', phoneResponse);

    $.ajax({ //Cambiar esto por jquery.ajax si algo
      type:"POST",
      url: "process_data.php",
      data: formData,
      processData:false,
      contentType:false,
      success:function(response){
        console.log(response);
      },
      error: function(xhr,status,error){
        console.error(error)
      }
    })
  }
}

  



function goToNextQuestion() {
  const userResponse = responsesInput.value.trim();
  if(userResponse === ""){
    return;
  }
  if (currentQuestionIndex === 1 && !userResponse.includes('@')) {
    const errorMessageElement = document.createElement('div');
    errorMessageElement.className = 'preguntas';
    errorMessageElement.textContent = 'Por favor, ingrese una dirección de correo electrónico válida.';
    
    // Get the chat-box element
    const chatBox = document.getElementById('cajachat');
    const divUsuario = document.querySelector('.divUsuario');
    
    chatBox.insertBefore(errorMessageElement, divUsuario);
    responsesInput.value = ""; // Limpiar el campo de respuesta para que permanezca en la parte inferior
    return; // No se avanza a la siguiente pregunta si la dirección de correo no es válida
  }
  questions[currentQuestionIndex].input.value = userResponse;
  console.log(`Question ${currentQuestionIndex + 1}: ${userResponse}`); // Log the response

  // Create a new element to represent the user's message
  const userMessageElement = document.createElement('div');
  userMessageElement.className = 'mensajesUsuario';
  userMessageElement.textContent = userResponse;

  // Get the chat-box element
  const chatBox = document.getElementById('cajachat');
  const divUsuario = document.querySelector('.divUsuario')

  chatBox.insertBefore(userMessageElement, divUsuario);

  // Append the user's message to the chat-box
  // chatBox.appendChild(userMessageElement);

  currentQuestionIndex++;
  showNextQuestion();
}
function closeChatIfClickedOutside(event) {
  // Verificar si el clic se hizo fuera del contenedor del chat
  if (!formContainer.contains(event.target) && event.target !== botonChat) {
    formContainer.classList.add('hidden'); // Ocultar el chat
    // Aquí también puedes realizar otras acciones si deseas hacer algo más cuando se cierra el chat al hacer clic fuera de él
  }
}
document.addEventListener('click', closeChatIfClickedOutside);
nextQuestionButton.addEventListener('click', goToNextQuestion);

responsesInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Evita que el Enter genere una nueva línea en el campo de respuestas
    goToNextQuestion();
  }
});

showNextQuestion();
