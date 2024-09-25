// screen4.js
// Administra la selección de mesas y la visualización de invitados en la pantalla de selección de mesa.
// screen4.js
// screen4.js - Actualizado
function loadScreen4() {
    document.getElementById('screen4').innerHTML = `
        <h2>Selección de Mesa</h2>
        <div class="salon-container">
            <div class="mesas" id="mesasIzquierda">
                ${generateMesasHTML(1, 17)}
            </div>
            <div class="pista">PISTA DE BAILE</div>
            <div class="mesas" id="mesasDerecha">
                ${generateMesasHTML(18, 35)}
            </div>
        </div>
        <label for="mesaSelect">Seleccione su mesa:</label>
        <select id="mesaSelect" name="mesaSelect" required onchange="updateMesaText()">
            <option value="" selected>Seleccionar</option>
            ${generateMesasOptionsHTML(1, 35)}
        </select><br><br>
        <div class="table-container">
            <div class="table" id="mesaText">Mesa</div>
            ${generateSeatsHTML(8)}
        </div>
        <div class="navigation-buttons">
            <button onclick="prevScreen(3)">Anterior</button>
            <button onclick="submitForm()">Enviar</button>
        </div>
        <div>
            <h3>Invitados Registrados en esta Mesa:</h3>
            <div id="guestList">No hay invitados registrados en esta mesa.</div>
        </div>
    `;
}

function generateMesasHTML(start, end) {
    let mesasHTML = '';
    for (let i = start; i <= end; i++) {
        mesasHTML += `<div class="mesa" id="mesa${i}" onmouseover="showGuests('Mesa ${i}', event)" onmouseout="hideGuests()">${i}</div>`;
    }
    return mesasHTML;
}

function generateMesasOptionsHTML(start, end) {
    let optionsHTML = '';
    for (let i = start; i <= end; i++) {
        optionsHTML += `<option value="Mesa ${i}">Mesa ${i}</option>`;
    }
    return optionsHTML;
}

function generateSeatsHTML(count) {
    let seatsHTML = '';
    const seatPositions = [
        { x: -80, y: -80 }, { x: 0, y: -90 }, { x: 80, y: -80 },
        { x: 90, y: 0 }, { x: 80, y: 80 }, { x: 0, y: 90 },
        { x: -80, y: 80 }, { x: -90, y: 0 }
    ];
    for (let i = 1; i <= count; i++) {
        seatsHTML += `<div class="seat" data-seat="${i}" style="transform: translate(${seatPositions[i-1].x}px, ${seatPositions[i-1].y}px);"></div>`;
    }
    return seatsHTML;
}

function updateMesaText() {
    const mesaSelect = document.getElementById("mesaSelect");
    const mesaText = document.getElementById("mesaText");
    const mesaInput = document.getElementById("mesa");
    const selectedMesa = mesaSelect?.options[mesaSelect.selectedIndex]?.value;
    if (mesaText && selectedMesa) {
        mesaText.textContent = selectedMesa;
    }
    if (mesaInput && selectedMesa) {
        mesaInput.value = selectedMesa;
    }
    updateSeats();
    updateGuestList();
}

function updateGuestList() {
    const mesaSelect = document.getElementById("mesaSelect");
    const selectedMesa = mesaSelect?.options[mesaSelect.selectedIndex]?.value;
    const guestList = document.getElementById("guestList");

    guestList.innerHTML = ""; // Limpiar la lista de invitados

    if (selectedMesa && guestsData[selectedMesa]) {
        const guests = guestsData[selectedMesa];

        guests.forEach(guest => {
            const nombreCompleto = `${guest["Nombre"] || 'Nombre no disponible'} ${guest["Apellido"] || 'Apellido no disponible'}`;
            guestList.innerHTML += `<div><strong>${nombreCompleto}</strong></div>`;

            // Incluir acompañantes en el cuadro de texto
            if (guest["Nombre Acompanante 1"]) guestList.innerHTML += `<div>Acompañante: ${guest["Nombre Acompanante 1"]}</div>`;
            if (guest["Nombre Acompanante 2"]) guestList.innerHTML += `<div>Acompañante: ${guest["Nombre Acompanante 2"]}</div>`;
            if (guest["Nombre Acompanante 3"]) guestList.innerHTML += `<div>Acompañante: ${guest["Nombre Acompanante 3"]}</div>`;
            if (guest["Nombre Acompanante 4"]) guestList.innerHTML += `<div>Acompañante: ${guest["Nombre Acompanante 4"]}</div>`;
            if (guest["Nombre Acompanante 5"]) guestList.innerHTML += `<div>Acompañante: ${guest["Nombre Acompanante 5"]}</div>`;
        });
    } else {
        guestList.innerHTML = "No hay invitados registrados en esta mesa.";
    }
}
