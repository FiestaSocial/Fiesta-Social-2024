// navigation.js
let currentScreen = 1;

function nextScreen(nextScreenNumber) {
    if (document.getElementById(`screen${currentScreen}`)) {
        document.getElementById(`screen${currentScreen}`).classList.remove('active');
    }

    currentScreen = nextScreenNumber;

    if (document.getElementById(`screen${currentScreen}`)) {
        document.getElementById(`screen${currentScreen}`).classList.add('active');
    }
}

function prevScreen(screen) {
    if (document.getElementById(`screen${currentScreen}`)) {
        document.getElementById(`screen${currentScreen}`).classList.remove('active');
    }

    currentScreen = screen;

    if (document.getElementById(`screen${currentScreen}`)) {
        document.getElementById(`screen${currentScreen}`).classList.add('active');
    }
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

function nextScreenPersonal() {
    if (validatePersonalForm()) {
        let acompanante = document.getElementById("acompanante").value;
        if (acompanante === "si") {
            let cantidadAcompanantes = document.getElementById("cantidadAcompanantes").value;
            generateAcompanantesForm(cantidadAcompanantes);
            nextScreen(3);
        } else {
            nextScreen(4);
        }
    }
}

