// screen4.js

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

