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
    let acompananteCantidad = document.getElementById("acompananteCantidad");
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
            nextScreen(3); // Navega a la pantalla de acompañantes
        } else {
            nextScreen(4); // Navega directamente a la pantalla de selección de mesa
        }
    }
}

function validatePersonalForm() {
    // Implementación de validación aquí
    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    nextScreen(1);
});
