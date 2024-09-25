// navigation.js
// Este archivo maneja la navegación entre las diferentes pantallas de la aplicación.
// navigation.js
let currentScreen = 1;
let guestsData = {};

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
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    currentScreen = nextScreenNumber;
    document.getElementById(`screen${currentScreen}`).classList.add('active');
}

function prevScreen(screen) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    currentScreen = screen;
    document.getElementById(`screen${currentScreen}`).classList.add('active');
}

function validateForm(formId) {
    let form = document.getElementById(formId);
    return form.checkValidity();
}

document.addEventListener('DOMContentLoaded', () => {
    loadScreens();
    fetchGuestsData();
});

function loadScreens() {
    document.getElementById('app').innerHTML = `
        <div id="screen1" class="container screen active"></div>
        <div id="screen2" class="container screen"></div>
        <div id="screen3" class="container screen"></div>
        <div id="screen4" class="container screen"></div>
        <div id="confirmationModal" class="container screen" style="display:none;"></div>
    `;
    loadScreen1();
    loadScreen2();
    loadScreen3();
    loadScreen4();
}

function fetchGuestsData() {
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRMTgpYpR5TVrCZMfOFzMUdXyW4wtu27U6VyN4w-zUwqki6m_Ts2icDBpL1gSyoxBpie6Xup_BxuR1g/pub?output=csv')
        .then(response => response.text())
        .then(csv => csvToJSON(csv))
        .then(data => {
            guestsData = data;
            updateMesaText();
            markFullTables(); // Marcar mesas completas en rojo
        })
        .catch(error => console.error('Error fetching guest data:', error));
}

function csvToJSON(csv) {
    const lines = csv.split("\n");
    const result = {};
    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].split(",");

        obj["Nombre"] = currentline[3].trim();
        obj["Apellido"] = currentline[4].trim();
        obj["Mesa"] = currentline[19].trim();

        obj["Nombre Acompanante 1"] = currentline[10].trim();
        obj["Nombre Acompanante 2"] = currentline[12].trim();
        obj["Nombre Acompanante 3"] = currentline[14].trim();
        obj["Nombre Acompanante 4"] = currentline[16].trim();
        obj["Nombre Acompanante 5"] = currentline[18].trim();

        if (obj["Mesa"]) {
            if (!result[obj["Mesa"]]) {
                result[obj["Mesa"]] = [];
            }
            result[obj["Mesa"]].push(obj);
        }
    }
    return result;
}
