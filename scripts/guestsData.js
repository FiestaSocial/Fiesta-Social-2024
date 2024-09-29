// guestsData.js
let guestsData = {}; // Declaración única de guestsData

function fetchGuestsData() {
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRMTgpYpR5TVrCZMfOFzMUdXyW4wtu27U6VyN4w-zUwqki6m_Ts2icDBpL1gSyoxBpie6Xup_BxuR1g/pub?output=csv')
        .then(response => response.text())
        .then(csv => csvToJSON(csv))
        .then(data => {
            guestsData = data;
            updateSalon(); // Llamar a las funciones necesarias
            updateGuestList();
        })
        .catch(error => console.error('Error fetching guest data:', error));
}

function csvToJSON(csv) {
    const lines = csv.split("\n");
    const result = {};

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].split(",");

        obj["Nombre"] = currentline[3].trim();
        obj["Apellido"] = currentline[4].trim();
        obj["Mesa"] = currentline[19].trim();
        obj["Acompanantes"] = [];

        for (let j = 10; j <= 18; j += 2) {
            if (currentline[j].trim()) {
                obj["Acompanantes"].push(currentline[j].trim());
            }
        }

        if (obj["Mesa"]) {
            if (!result[obj["Mesa"]]) {
                result[obj["Mesa"]] = [];
            }
            result[obj["Mesa"]].push(obj);
        }
    }
    return result;
}

document.addEventListener('DOMContentLoaded', fetchGuestsData);

