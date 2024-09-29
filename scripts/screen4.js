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
            ${generateSeatDivs(8)} <!-- Genera los 8 lugares alrededor de la mesa -->
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

    // Marcar mesas completas y actualizar la lista de invitados
    updateSalon();
    updateGuestList();
}

// Función para generar las mesas en el salón
function generateTableDivs(start, end) {
    let tables = '';
    for (let i = start; i <= end; i++) {
        tables += `<div class="mesa" id="mesa${i}" onmouseover="showGuests('Mesa ${i}', event)" onmouseout="hideGuests()">${i}</div>`;
    }
    return tables;
}

// Función para generar las opciones del menú desplegable de mesas
function generateSelectOptions(start, end) {
    let options = '';
    for (let i = start; i <= end; i++) {
        options += `<option value="Mesa ${i}">Mesa ${i}</option>`;
    }
    return options;
}

// Función para generar los lugares alrededor de la mesa seleccionada
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

// Función para actualizar la mesa seleccionada y la lista de invitados
function updateMesaText() {
    const mesaSelect = document.getElementById("mesaSelect");
    const mesaText = document.getElementById("mesaText");
    const selectedMesa = mesaSelect?.options[mesaSelect.selectedIndex]?.value;
    
    if (mesaText && selectedMesa) {
        mesaText.textContent = selectedMesa;
    }

    updateSeats(selectedMesa);
    updateGuestList();
}

// Función para actualizar la representación de los lugares ocupados en la mesa seleccionada
function updateSeats(selectedMesa) {
    const seats = document.querySelectorAll('.seat');
    seats.forEach(seat => seat.classList.remove('occupied'));

    if (selectedMesa && guestsData[selectedMesa]) {
        let totalGuests = 0;

        guestsData[selectedMesa].forEach(guest => {
            totalGuests += 1; // Contar al invitado principal
            totalGuests += guest["Acompanantes"].length; // Contar acompañantes
        });

        for (let i = 1; i <= totalGuests && i <= 8; i++) {
            const seat = document.querySelector(`.seat[data-seat="${i}"]`);
            if (seat) {
                seat.classList.add('occupied');
            }
        }
    }
}

// Llamar a la función para cargar la pantalla de selección de mesa
loadScreen4();
