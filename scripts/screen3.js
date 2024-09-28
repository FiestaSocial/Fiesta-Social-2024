// screen3.js - Información de los Acompañantes
function generateAcompanantesForm(cantidad) {
    let acompanantesForm = document.getElementById('acompanantesForm');
    acompanantesForm.innerHTML = ''; // Clear previous entries

    for (let i = 1; i <= cantidad; i++) {
        acompanantesForm.innerHTML += `
            <h3>Acompañante ${i}</h3>
            <label for="nombreAcompanante${i}">Nombre:</label>
            <input type="text" id="nombreAcompanante${i}" name="nombreAcompanante${i}" required><br><br>
            <label for="menuAcompanante${i}">Menú:</label>
            <select id="menuAcompanante${i}" name="menuAcompanante${i}" required>
                <option value="" selected>Seleccionar</option>
                <option value="normal">Normal</option>
                <option value="vegetariano">Vegetariano</option>
                <option value="vegano">Vegano</option>
                <option value="celiaco">Celíaco</option>
            </select><br><br>
        `;
    }
}

function validateAcompanantesForm() {
    let isValid = true;
    const form = document.getElementById('acompanantesForm');
    const inputs = form.querySelectorAll('input, select');

    inputs.forEach(input => {
        const errorMessage = input.nextElementSibling;
        
        // Check if the input is valid
        if (!input.value) {
            input.classList.add('error');
            if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                const errorElement = document.createElement('div');
                errorElement.classList.add('error-message');
                errorElement.textContent = 'Este campo es obligatorio';
                input.parentNode.insertBefore(errorElement, input.nextSibling);
            }
            isValid = false;
        } else {
            input.classList.remove('error');
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.remove();
            }
        }
    });

    return isValid;
}

function nextScreenAcompanantes() {
    if (validateAcompanantesForm()) {
        nextScreen(4);
    }
}

// Call nextScreenAcompanantes() on clicking the "Siguiente" button
document.getElementById('nextButtonScreen3').addEventListener('click', nextScreenAcompanantes);
