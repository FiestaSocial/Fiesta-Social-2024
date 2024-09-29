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

    document.getElementById(`screen${currentScreen}`).classList.remove('active');
    currentScreen = nextScreenNumber;
    document.getElementById(`screen${currentScreen}`).classList.add('active');

    if (currentScreen === 2) {
        loadScreen2();
    } else if (currentScreen === 3) {
        loadScreen3();
    } else if (currentScreen === 4) {
        loadScreen4();
    }
}

function prevScreen(screen) {
    document.getElementById(`screen${currentScreen}`).classList.remove('active');
    currentScreen = screen;
    document.getElementById(`screen${currentScreen}`).classList.add('active');
}

function finalizarRegistro() {
    document.getElementById('confirmationModal').style.display = 'none';
    document.getElementById('screen1').classList.add('active');
}

function validateForm(formId) {
    let form = document.getElementById(formId);
    return form.checkValidity();
}

