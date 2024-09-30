let currentScreen = 1;

function nextScreen(nextScreenNumber) {
    if (nextScreenNumber === undefined) {
        if (currentScreen === 2) {
            if (!validatePersonalForm()) {
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
        } else if (currentScreen === 3 && !validateAcompanantesForm()) {
            alert('Por favor, complete todos los campos requeridos.');
            return;
        } else {
            nextScreenNumber = currentScreen + 1;
        }
    }
    document.getElementById(`screen${currentScreen}`).classList.remove('active');
    currentScreen = nextScreenNumber;
    document.getElementById(`screen${currentScreen}`).classList.add('active');
}

function prevScreen(screen) {
    document.getElementById(`screen${currentScreen}`).classList.remove('active');
    currentScreen = screen;
    document.getElementById(`screen${currentScreen}`).classList.add('active');
}

function toggleAcompanante() {
    let acompanante = document.getElementById("acompanante").value;
    let acompananteCantidad = document.getElementById("cantidadAcompanantes");
    if (acompanante === "si") {
        acompananteCantidad.style.display = "block";
    } else {
        acompananteCantidad.style.display = "none";
    }
}

function validatePersonalForm() {
    let isValid = true;
    const fields = ['correo', 'grado', 'escalafon', 'nombre', 'apellido', 'cedula', 'acompanante', 'menu'];
    
    fields.forEach(field => {
        const inputElement = document.getElementById(field);
        if (!inputElement.value) {
            inputElement.classList.add('error');
            isValid = false;
        } else {
            inputElement.classList.remove('error');
        }
    });
    
    return isValid;
}

function validateAcompanantesForm() {
    let isValid = true;
    const form = document.getElementById("acompanantesForm");
    const inputs = form.querySelectorAll('input, select');

    inputs.forEach(input => {
        if (!input.value) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

