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

        // Extraer los nombres de los acompañantes
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

function markFullTables() {
    const mesaSelect = document.getElementById("mesaSelect");

    for (let i = 1; i <= 35; i++) {
        const mesaDiv = document.getElementById(`mesa${i}`);
        const mesaOption = mesaSelect.querySelector(`option[value='Mesa ${i}']`);
        
        let totalGuests = 0;
        if (guestsData[`Mesa ${i}`]) {
            guestsData[`Mesa ${i}`].forEach(guest => {
                totalGuests += 1; // Invitado principal
                totalGuests += guest["Acompanantes"].length; // Acompañantes
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
