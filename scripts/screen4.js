// screen4.js
function loadScreen4() {
    document.getElementById('screen4').innerHTML = `
        <h2>Selección de Mesa</h2>
        <label for="mesaSelect">Seleccione su mesa:</label>
        <select id="mesaSelect" name="mesaSelect" required onchange="updateMesaText()">
            <option value="" selected>Seleccionar</option>
            ${generateMesaOptions()}
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
    updateMesaText(); // Inicializa la visualización de la mesa
}

// Genera las opciones del dropdown para la selección de mesas
function generateMesaOptions() {
    let options = '';
    for (let i = 1; i <= 35; i++) {
        options += `<option value="Mesa ${i}">Mesa ${i}</option>`;
    }
    return options;
}

function updateMesaText() {
    const mesaSelect = document.getElementById("mesaSelect");
    const mesaText = document.getElementById("mesaText");
    const selectedMesa = mesaSelect?.options[mesaSelect.selectedIndex]?.value;
    
    if (mesaText && selectedMesa) {
        mesaText.textContent = selectedMesa;
    }
    
    updateSeats();
    updateGuestList();
}

function updateSeats() {
    const mesaSelect = document.getElementById("mesaSelect");
    const selectedMesa = mesaSelect?.options[mesaSelect.selectedIndex]?.value;
    const seats = document.querySelectorAll('.seat');
    
    seats.forEach(seat => seat.classList.remove('occupied'));

    if (selectedMesa && guestsData[selectedMesa]) {
        let totalGuests = 0;

        guestsData[selectedMesa].forEach(guest => {
            const guestAndAcompanantes = [guest];
            if (guest["Nombre Acompanante 1"]) guestAndAcompanantes.push(guest["Nombre Acompanante 1"]);
            if (guest["Nombre Acompanante 2"]) guestAndAcompanantes.push(guest["Nombre Acompanante 2"]);
            if (guest["Nombre Acompanante 3"]) guestAndAcompanantes.push(guest["Nombre Acompanante 3"]);
            if (guest["Nombre Acompanante 4"]) guestAndAcompanantes.push(guest["Nombre Acompanante 4"]);
            if (guest["Nombre Acompanante 5"]) guestAndAcompanantes.push(guest["Nombre Acompanante 5"]);

            guestAndAcompanantes.forEach((_, seatIndex) => {
                const seat = document.querySelector(`.seat[data-seat="${totalGuests + 1}"]`);
                if (seat) {
                    seat.classList.add('occupied');
                }
                totalGuests++;
            });
        });
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
            let guestInfo = `<div><strong>${guest.Nombre} ${guest.Apellido}</strong></div>`;
            if (guest["Nombre Acompanante 1"]) guestInfo += `<div>Acompañante: ${guest["Nombre Acompanante 1"]}</div>`;
            if (guest["Nombre Acompanante 2"]) guestInfo += `<div>Acompañante: ${guest["Nombre Acompanante 2"]}</div>`;
            if (guest["Nombre Acompanante 3"]) guestInfo += `<div>Acompañante: ${guest["Nombre Acompanante 3"]}</div>`;
            if (guest["Nombre Acompanante 4"]) guestInfo += `<div>Acompañante: ${guest["Nombre Acompanante 4"]}</div>`;
            if (guest["Nombre Acompanante 5"]) guestInfo += `<div>Acompañante: ${guest["Nombre Acompanante 5"]}</div>`;

            guestList.innerHTML += guestInfo;
        });
    } else {
        guestList.innerHTML = "No hay invitados registrados en esta mesa.";
    }
}

loadScreen4();
