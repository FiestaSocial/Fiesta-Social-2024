// navigation.js
let currentScreen = 1;

function nextScreen(nextScreenNumber) {
    if (nextScreenNumber === undefined) {
        if (currentScreen === 2) {
            if (!validateForm('guestForm')) {
                alert('Por favor, complete todos los campos requeridos.');
                return;
            }
            let acompanante = document.getElementById("acompanante").value;
            if (acompanante === "si") {
                let cantidadAcompanantes = document.getElementById("cantidadAcompanantes").value;
                generateAcompanantesForm(cantidadAcompanantes);
                nextScreenNumber = 3;
            } else {
                nextScreenNumber = 4;
            }
        } else if (currentScreen === 3 && !validateForm('acompanantesForm')) {
            alert('Por favor, complete todos los campos requeridos.');
            return;
        } else {
            nextScreenNumber = currentScreen + 1;
        }
    }
    if (document.getElementById(`screen${currentScreen}`)) {
        document.getElementById(`screen${currentScreen}`).classList.remove('active');
    }
    currentScreen = nextScreenNumber;
    if (document.getElementById(`screen${currentScreen}`)) {
        document.getElementById(`screen${currentScreen}`).classList.add('active');
    }
}

function prevScreen(screen) {
    if (currentScreen === 4 && document.getElementById("acompanante").value === "no") {
        screen = 2;
    }
    if (document.getElementById(`screen${currentScreen}`)) {
        document.getElementById(`screen${currentScreen}`).classList.remove('active');
    }
    currentScreen = screen;
    if (document.getElementById(`screen${currentScreen}`)) {
        document.getElementById(`screen${currentScreen}`).classList.add('active');
    }
}
