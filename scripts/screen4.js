// screen4.js
function loadScreen4() {
    document.getElementById('screen4').innerHTML = `
        <h2>Selección de Mesa</h2>
        <div class="salon-container">
            <div class="mesas" id="mesasIzquierda">
                ${generateTableDivs(1, 17)}
            </div>
            <div class="pista">PISTA DE BAILE</div>
            <div class="mesas" id="mesasDerecha">
                ${generateTableDivs(18, 35)}
            </div>
        </div>
        <label for="mesaSelect">Seleccione su mesa:</label>
        <select id="mesaSelect" name="mesaSelect" required onchange="updateMesaText()">
            <option value="" selected>Seleccionar</option>
            ${generateSelectOptions(1, 35)}
        </select><br><br>
        <div class="table-container">
            <div class="table" id="mesaText">Mesa</div>
            ${generateSeatDivs(8)} <!-- Generar los 8 lugares alrededor de la mesa -->
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

    // Marcar las mesas completas y actualizar la lista de invitados
    updateSalon();
    updateGuestList();
}

// Genera los elementos de las mesas en el salón
function generateTableDivs(start, end) {
    let tables = '';
    for (let i = start; i <= end; i++) {
        tables += `<div class="mesa" id="mesa${i}" onmouseover="showGuests('Mesa ${i}', event)" onmouseout="hideGuests()">${i}</div>`;
    }
    return tables;
}

// Genera las opciones del menú desplegable para seleccionar la mesa
function generateSelectOptions(start, end) {
    let options = '';
    for (let i = start; i <= end; i++) {
        options += `<option value="Mesa ${i}">Mesa ${i}</option>`;
    }
    return options;
}

// Genera los lugares alrededor de la mesa seleccionada
function generateSeatDivs(numSeats) {
    let seats = '';
    const positions = [
        { x: -100, y: -100 },
        { x: 0, y: -125 },
        { x: 100, y: -100 },
        { x: 125, y: 0 },
        { x: 100, y: 100 },
        { x: 0, y: 125 },
        { x: -100, y: 100 },
        { x: -125, y: 0 }
    ];
    
    for (let i = 0; i < numSeats; i++) {
        seats += `<div class="seat" data-seat="${i + 1}" style="transform: translate(${positions[i].x}px, ${positions[i].y}px);"></div>`;
    }
    return seats;
}

// Cargar la pantalla de selección de mesa
loadScreen4();
