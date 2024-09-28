// screen4.js - Selección de Mesa
function validateMesaSelection() {
    const mesaSelect = document.getElementById('mesaSelect');
    const selectedMesa = mesaSelect?.options[mesaSelect.selectedIndex]?.value;
    const errorMessage = mesaSelect.nextElementSibling;

    if (!selectedMesa || (selectedMesa && guestsData[selectedMesa]?.length >= 8)) {
        mesaSelect.classList.add('error');
        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
            const errorElement = document.createElement('div');
            errorElement.classList.add('error-message');
            errorElement.textContent = 'Por favor, seleccione una mesa válida o diferente. La mesa seleccionada está completa.';
            mesaSelect.parentNode.insertBefore(errorElement, mesaSelect.nextSibling);
        }
        return false;
    } else {
        mesaSelect.classList.remove('error');
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.remove();
        }
    }

    return true;
}

function submitMesaSelection() {
    if (validateMesaSelection()) {
        submitForm(); // Call the form submission function
    }
}

// Call submitMesaSelection() on clicking the "Enviar" button
document.getElementById('submitButtonScreen4').addEventListener('click', submitMesaSelection);

