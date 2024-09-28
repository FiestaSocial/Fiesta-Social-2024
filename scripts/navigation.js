let currentScreen = 1;
const totalScreens = 4;

document.addEventListener('DOMContentLoaded', () => {
    showScreen(currentScreen);
    document.getElementById('nextButton').addEventListener('click', nextScreen);
    document.getElementById('prevButton').addEventListener('click', prevScreen);
    document.getElementById('submitButton').addEventListener('click', submitReservation);
    document.getElementById('startButton').addEventListener('click', () => {
        currentScreen = 2;
        showScreen(currentScreen);
    });
});

function showScreen(screenNumber) {
    const screens = document.querySelectorAll('.container');
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(`screen${screenNumber}`).classList.add('active');
}

function nextScreen() {
    if (validateCurrentScreen()) {
        if (currentScreen < totalScreens) {
            currentScreen++;
            showScreen(currentScreen);
        }
    }
}

function prevScreen() {
    if (currentScreen > 1) {
        currentScreen--;
        showScreen(currentScreen);
    }
}

function validateCurrentScreen() {
    let valid = true;
    const activeScreen = document.querySelector('.container.active');
    const inputs = activeScreen.querySelectorAll('input, select');
    inputs.forEach(input => {
        if (!input.value) {
            input.classList.add('error');
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.innerText = 'Este campo es obligatorio';
            input.parentElement.appendChild(errorMessage);
            valid = false;
        } else {
            input.classList.remove('error');
            const errorMessages = input.parentElement.querySelectorAll('.error-message');
            errorMessages.forEach(msg => msg.remove());
        }
    });
    return valid;
}

function submitReservation() {
    const selectedTable = document.getElementById('mesaSelect').value;
    if (isTableFull(selectedTable)) {
        alert('La mesa seleccionada está completa. Por favor, elija otra mesa.');
        return;
    }
    // Submit the form logic here
    alert('Reserva enviada correctamente.');
    location.reload(); // Reload the page for all users
}

function isTableFull(selectedTable) {
    const tableElement = document.querySelector(`.table[data-table='${selectedTable}']`);
    return tableElement && tableElement.classList.contains('completa');
}
