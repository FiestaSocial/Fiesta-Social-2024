// screen4.js

// Definimos `guestsData` aquí y eliminamos cualquier duplicación en otros archivos.
let guestsData = {}; // Datos de invitados y acompañantes

function fetchGuestsData() {
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRMTgpYpR5TVrCZMfOFzMUdXyW4wtu27U6VyN4w-zUwqki6m_Ts2icDBpL1gSyoxBpie6Xup_BxuR1g/pub?output=csv')
        .then(response => response.text())
        .then(csv => csvToJSON(csv))
        .then(data => {
            guestsData = data;
            updateSalon();
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

function updateSalon() {
    const mesaSelect = document.getElementById("mesaSelect");

    if (!mesaSelect) {
        console.error("Elemento 'mesaSelect' no encontrado en el DOM.");
        return;
    }

    for (let i = 1; i <= 35; i++) {
        const mesaDiv = document.getElementById(`mesa${i}`);
        const mesaOption = mesaSelect.querySelector(`option[value='Mesa ${i}']`);
        
        if (!mesaDiv || !mesaOption) {
            console.warn(`Elemento de mesa 'mesa${i}' no encontrado.`);
            continue;
        }

        if (guestsData[`Mesa ${i}`] && guestsData[`Mesa ${i}`].length >= 8) {
            mesaDiv.classList.add('completa');
            mesaOption.style.backgroundColor = '#dc3545';
        } else {
            mesaDiv.classList.remove('completa');
            mesaOption.style.backgroundColor = '';
        }
    }
}

function updateGuestList() {
    const mesaSelect = document.getElementById("mesaSelect");
    const selectedMesa = mesaSelect?.options[mesaSelect.selectedIndex]?.value;
    const guestList = document.getElementById("guestList");
    guestList.innerHTML = "";

    if (selectedMesa && guestsData[selectedMesa]) {
        const guests = guestsData[selectedMesa];
        guests.forEach(guest => {
            const nombreCompleto = `${guest["Nombre"]} ${guest["Apellido"]}`;
            guestList.innerHTML += `<div><strong>${nombreCompleto}</strong></div>`;
            guest["Acompanantes"].forEach(acomp => {
                guestList.innerHTML += `<div>Acompañante: ${acomp}</div>`;
            });
        });
    } else {
        guestList.innerHTML = "No hay invitados registrados en esta mesa.";
    }

    updateSeats(selectedMesa);
}

function updateSeats(selectedMesa) {
    const seats = document.querySelectorAll('.seat');
    seats.forEach(seat => seat.classList.remove('occupied'));

    if (selectedMesa && guestsData[selectedMesa]) {
        let totalGuests = 0;

        guestsData[selectedMesa].forEach(guest => {
            totalGuests += 1;
            totalGuests += guest["Acompanantes"].length;
        });

        for (let i = 1; i <= totalGuests && i <= 8; i++) {
            const seat = document.querySelector(`.seat[data-seat="${i}"]`);
            if (seat) {
                seat.classList.add('occupied');
            }
        }
    }
}

function showGuests(mesa, event) {
    const tooltip = document.getElementById("tooltip");
    if (guestsData[mesa]) {
        const guestNames = guestsData[mesa].map(guest => {
            let fullName = `${guest.Nombre} ${guest.Apellido}`;
            guest["Acompanantes"].forEach(acomp => {
                fullName += `, Acompañante: ${acomp}`;
            });
            return fullName;
        }).join(", ");
        tooltip.textContent = guestNames;
        tooltip.style.display = "block";
        tooltip.style.left = event.pageX + 'px';
        tooltip.style.top = event.pageY + 'px';
    } else {
        tooltip.textContent = "No hay invitados registrados en esta mesa.";
        tooltip.style.display = "block";
        tooltip.style.left = event.pageX + 'px';
        tooltip.style.top = event.pageY + 'px';
    }
}

function hideGuests() {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.display = "none";
}

function loadScreen4() {
    document.getElementById('screen4').innerHTML = `
        <h2>Selección de Mesa</h2>
        <!-- Aquí va la visualización de la mesa -->
        <div class="navigation-buttons">
            <button onclick="prevScreen(3)">Anterior</button>
            <button onclick="submitForm()">Enviar</button>
        </div>
        <div>
            <h3>Invitados Registrados en esta Mesa:</h3>
            <div id="guestList"></div>
        </div>
    `;
    updateSalon();
    updateGuestList();
}

loadScreen4();
document.addEventListener('DOMContentLoaded', fetchGuestsData);
