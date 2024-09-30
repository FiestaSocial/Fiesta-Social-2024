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
            totalGuests++;
            guest["Acompanantes"].forEach(() => totalGuests++);
        });
        for (let i = 1; i <= totalGuests && i <= 8; i++) {
            const seat = document.querySelector(`.seat[data-seat="${i}"]`);
            if (seat) {
                seat.classList.add('occupied');
            }
        }
    }
}

function markFullTables() {
    const mesaSelect = document.getElementById("mesaSelect");
    for (let i = 1; i <= 35; i++) {
        const mesaDiv = document.getElementById(`mesa${i}`);
        if (guestsData[`Mesa ${i}`] && guestsData[`Mesa ${i}`].length >= 8) {
            mesaDiv.classList.add('completa');
            mesaSelect.querySelector(`option[value='Mesa ${i}']`).style.backgroundColor = '#dc3545';
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
}
