let guestsData = {};

function fetchGuestsData() {
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRMTgpYpR5TVrCZMfOFzMUdXyW4wtu27U6VyN4w-zUwqki6m_Ts2icDBpL1gSyoxBpie6Xup_BxuR1g/pub?output=csv')
        .then(response => response.text())
        .then(csv => csvToJSON(csv))
        .then(data => {
            guestsData = data;
            updateMesaText();
            markFullTables();
        })
        .catch(error => console.error('Error fetching guest data:', error));
}

function csvToJSON(csv) {
    const lines = csv.split("\n");
    const result = {};
    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].split(",");

        obj["Nombre"] = currentline[3].trim();
        obj["Apellido"] = currentline[4].trim();
        obj["Mesa"] = currentline[19].trim();
        obj["Acompanantes"] = [];

        for (let j = 10; j <= 18; j += 2) {
            if (currentline[j].trim()) {
                obj["Acompanantes"].push(currentline[j].trim());
            }
        }

        if (obj["Mesa"]) {
            if (!result[obj["Mesa"]]) {
                result[obj["Mesa"]] = [];
            }
            result[obj["Mesa"]].push(obj);
        }
    }
    return result;
}

function updateMesaText() {
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

