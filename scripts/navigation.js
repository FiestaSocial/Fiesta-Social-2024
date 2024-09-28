document.addEventListener('DOMContentLoaded', () => {
    let currentScreenIndex = 0;
    const screens = document.querySelectorAll('.container');
    const startButton = document.getElementById('startButton');
    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');
    const submitButton = document.getElementById('submitButton');

    startButton.addEventListener('click', () => {
        showScreen(1);
    });

    nextButton.addEventListener('click', () => {
        if (validateCurrentScreen()) {
            showScreen(currentScreenIndex + 1);
        }
    });

    prevButton.addEventListener('click', () => {
        showScreen(currentScreenIndex - 1);
    });

    submitButton.addEventListener('click', (event) => {
        if (validateCurrentScreen() && validateTableSelection()) {
            // Aquí puedes implementar la lógica de envío del formulario
            alert('Reserva enviada con éxito');
            location.reload(); // Recarga la página al finalizar el envío
        }
    });

    function showScreen(index) {
        screens[currentScreenIndex].classList.remove('active');
        currentScreenIndex = index;
        screens[currentScreenIndex].classList.add('active');
    }

    function validateCurrentScreen() {
        let isValid = true;
        const currentScreen = screens[currentScreenIndex];
        const requiredFields = currentScreen.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value) {
                isValid = false;
                field.classList.add('error'); // Resalta el campo con error
                if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                    const errorMessage = document.createElement('div');
                    errorMessage.classList.add('error-message');
                    errorMessage.textContent = 'Este campo es obligatorio';
                    field.parentNode.insertBefore(errorMessage, field.nextSibling);
                }
            } else {
                field.classList.remove('error');
                if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
                    field.nextElementSibling.remove();
                }
            }
        });
        return isValid;
    }

    function validateTableSelection() {
        const selectedTable = document.getElementById('mesaSelect').value;
        if (selectedTable && guestsData[selectedTable] && guestsData[selectedTable].length >= 8) {
            alert('La mesa seleccionada está completa. Por favor, elige otra mesa.');
            return false;
        }
        return true;
    }
});
