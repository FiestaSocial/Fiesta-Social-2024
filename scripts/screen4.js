// screen4.js - Selección de Mesa
function loadScreen4() {
    document.getElementById('screen4').innerHTML = `
        <h2>Selección de Mesa</h2>
        <div class="salon-container">
            <div class="mesas" id="mesasIzquierda">
                ${Array.from({ length: 17 }, (_, i) => `<div class="mesa" id="mesa${i + 1}" onmouseover="showGuests('Mesa ${i + 1}', event)" onmouseout="hideGuests()">${i + 1}</div>`).join('')}
            </div>
            <div class="pista">PISTA DE BAILE</div>
            <div class="mesas" id="mesasDerecha">
                ${Array.from({ length: 18 }, (_, i) => `<div class="mesa" id="mesa${i + 18}" onmouseover="showGuests('Mesa ${i + 18}', event)" onmouseout="hideGuests()">${i + 18}</div>`).join('')}
            </div>
        </div>
        <label for="mesaSelect">Seleccione su mesa:</label>
        <select id="mesaSelect" name="mesaSelect" required onchange="updateMesaText()">
            <option value="" selected>Seleccionar</option>
            ${Array.from({ length: 35 }, (_, i) => `<option value="Mesa ${i + 1}">Mesa ${i + 1}</option>`).join('')}
        </select><br><br>
        <div class="table-container">
            <div class="table" id="mesaText">Mesa</div>
            ${Array.from({ length: 8 }, (_, i) => `<div class="seat" data-seat="${i + 1}" style="transform: translate(${getSeatPosition(i)});"></div>`).join('')}
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
    markFullTables(); // Marca las mesas completas al cargar
}

function getSeatPosition(index) {
    const positions = [
        '-100px, -100px', '0, -125px', '100px, -100px', 
        '125px, 0', '100px, 100px', '0, 125px', 
        '-100px, 100px', '-125px, 0'
    ];
    return positions[index];
}

