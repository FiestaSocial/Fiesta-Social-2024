// screen2.js
function validatePersonalForm() {
    let isValid = true;
    const fields = ['correo', 'grado', 'escalafon', 'nombre', 'apellido', 'cedula', 'acompanante', 'menu'];

    fields.forEach(field => {
        const inputElement = document.getElementById(field);
        const errorMessage = inputElement.nextElementSibling;

        // Check if the input is valid
        if (!inputElement.value) {
            inputElement.classList.add('error');
            if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                const errorElement = document.createElement('div');
                errorElement.classList.add('error-message');
                errorElement.textContent = 'Este campo es obligatorio';
                inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
            }
            isValid = false;
        } else {
            inputElement.classList.remove('error');
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.remove();
            }
        }
    });

    return isValid;
}

function nextScreenPersonal() {
    if (validatePersonalForm()) {
        let acompanante = document.getElementById('acompanante').value;
        if (acompanante === 'si') {
            let cantidadAcompanantes = document.getElementById('cantidadAcompanantes').value;
            generateAcompanantesForm(cantidadAcompanantes);
            nextScreen(3); // Navega a la pantalla de acompañantes
        } else {
            nextScreen(4); // Navega directamente a la pantalla de selección de mesa
        }
    }
}

document.getElementById('screen2').innerHTML = `
    <h2>Datos Personales</h2>
    <form id="guestForm">
        <!-- Form fields go here -->
    </form>
    <div class="navigation-buttons">
        <button onclick="prevScreen(1)">Anterior</button>
        <button onclick="nextScreenPersonal()">Siguiente</button>
    </div>
`;
