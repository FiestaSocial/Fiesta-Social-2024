function loadScreen4() {
    document.getElementById('screen4').innerHTML = `
        <h2>Selección de Mesa</h2>
        <div class="salon-container">
            <div class="mesas" id="mesasIzquierda">
                ${Array.from({ length: 17 }, (_, i) => `
                    <div class="mesa" id="mesa${i + 1}" onmouseover="showGuests('Mesa ${i + 1}', event)" onmouseout="hideGuests()">${i + 1}</div>
                `).join('')}
            </div>
            <div class="pista">PISTA DE BAILE</div>
            <div class="mesas" id="mesasDerecha">
                ${Array.from({ length: 18 }, (_, i) => `
                    <div class="mesa" id="mesa${i + 18}" onmouseover="showGuests('Mesa ${i + 18}', event)" onmouseout="hideGuests()">${i + 18}</div>
                `).join('')}
            </div>
        </div>
        <label for="mesaSelect">Seleccione su mesa:</label>
        <select id="mesaSelect" name="mesaSelect" required onchange="updateMesaText()">
            <option value="" selected>Seleccionar</option>
            ${Array.from({ length: 35 }, (_, i) => `<option value="Mesa ${i + 1}">Mesa ${i + 1}</option>`).join('')}
        </select><br><br>
        <div class="table-container">
            <div class="table" id="mesaText">Mesa</div>
            ${Array.from({ length: 8 }, (_, i) => `
                <div class="seat" data-seat="${i + 1}" style="transform: translate(${Math.cos((i * 45) * Math.PI / 180) * 125}px, ${Math.sin((i * 45) * Math.PI / 180) * 125}px);"></div>
            `).join('')}
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

    updateSalon(); // Llamar a la función para colorear mesas completas
}

function updateSalon() {
    const mesaSelect = document.getElementById("mesaSelect");

    for (let i = 1; i <= 35; i++) {
        const mesaDiv = document.getElementById(`mesa${i}`);
        const mesaOption = mesaSelect.querySelector(`option[value='Mesa ${i}']`);
        
        let totalGuests = 0;
        if (guestsData[`Mesa ${i}`]) {
            guestsData[`Mesa ${i}`].forEach(guest => {
                totalGuests += 1; // Invitado principal
                totalGuests += guest["Acompanantes"].length; // Contar acompañantes
            });
        }

        if (totalGuests >= 8) {
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

    guestList.innerHTML = ""; // Limpiar la lista de invitados

    if (selectedMesa && guestsData[selectedMesa]) {
        const guests = guestsData[selectedMesa];

        guests.forEach(guest => {
            const nombreCompleto = `${guest["Nombre"] || 'Nombre no disponible'} ${guest["Apellido"] || 'Apellido no disponible'}`;
            guestList.innerHTML += `<div><strong>${nombreCompleto}</strong></div>`;

            // Incluir acompañantes en el cuadro de texto
            guest["Acompanantes"].forEach(acomp => {
                guestList.innerHTML += `<div>Acompañante: ${acomp}</div>`;
            });
        });
    } else {
        guestList.innerHTML = "No hay invitados registrados en esta mesa.";
    }

    updateSeats(selectedMesa); // Actualizar asientos
}

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

loadScreen4();

