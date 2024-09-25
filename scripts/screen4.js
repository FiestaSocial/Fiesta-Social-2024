// screen4.js
// Administra la selección de mesas y la visualización de invitados en la pantalla de selección de mesa.
// screen4.js
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
            <div id="guestList"></div>
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
    for (let i = 1; i <= count; i++) {
        seatsHTML += `<div class="seat" data-seat="${i}" style="transform: translate(0, 0);"></div>`;
    }
    return seatsHTML;
}

function submitForm() {
    const mesaSelect = document.getElementById("mesaSelect");
    const selectedMesa = mesaSelect?.options[mesaSelect.selectedIndex]?.value;

    if (selectedMesa && guestsData[selectedMesa] && guestsData[selectedMesa].length >= 8) {
        alert("La mesa seleccionada ya está completa. Por favor, elija otra mesa.");
        return;
    }

    // Código para enviar los datos y mostrar la confirmación
}
