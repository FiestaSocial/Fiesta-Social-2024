// screen4.js

// Función para cargar la pantalla de selección de mesa
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
            ${generateTableOptions(1, 35)}
        </select><br><br>

        <div class="table-container">
            <div class="table" id="mesaText">Mesa</div>
            <div class="seat" data-seat="1" style="transform: translate(-100px, -100px);"></div>
            <div class="seat" data-seat="2" style="transform: translate(0, -125px);"></div>
            <div class="seat" data-seat="3" style="transform: translate(100px, -100px);"></div>
            <div class="seat" data-seat="4" style="transform: translate(125px, 0);"></div>
            <div class="seat" data-seat="5" style="transform: translate(100px, 100px);"></div>
            <div class="seat" data-seat="6" style="transform: translate(0, 125px);"></div>
            <div class="seat" data-seat="7" style="transform: translate(-100px, 100px);"></div>
            <div class="seat" data-seat="8" style="transform: translate(-125px, 0);"></div>
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

    // Llamar a las funciones necesarias
    updateSalon();
    updateGuestList();
}

// Función para generar los divs de las mesas
function generateTableDivs(start, end) {
    let divs = '';
    for (let i = start; i <= end; i++) {
        divs += `<div class="mesa" id="mesa${i}" onmouseover="showGuests('Mesa ${i}', event)" onmouseout="hideGuests()">${i}</div>`;
    }
    return divs;
}

// Función para generar las opciones del menú desplegable
function generateTableOptions(start, end) {
    let options = '';
    for (let i = start; i <= end; i++) {
        options += `<option value="Mesa ${i}">Mesa ${i}</option>`;
    }
    return options;
}

// Llamar a la función para cargar la pantalla 4
loadScreen4();

