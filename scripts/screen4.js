// screen4.js
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

        if (totalGuests >= 8) {
            mesaSelect.options[mesaSelect.selectedIndex].style.backgroundColor = '#dc3545';
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
