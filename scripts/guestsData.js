// guestsData.js
let guestsData = {};

function fetchGuestsData() {
    fetch('https://docs.google.com/spreadsheets/d/e/YOUR_GOOGLE_SHEETS_LINK_HERE/pub?output=csv')
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
        obj["Nombre Acompanante 1"] = currentline[10].trim();
        obj["Nombre Acompanante 2"] = currentline[12].trim();
        obj["Nombre Acompanante 3"] = currentline[14].trim();
        obj["Nombre Acompanante 4"] = currentline[16].trim();
        obj["Nombre Acompanante 5"] = currentline[18].trim();

        if (obj["Mesa"]) {
            if (!result[obj["Mesa"]]) {
                result[obj["Mesa"]] = [];
            }
            result[obj["Mesa"]].push(obj);
        }
    }
    return result;
}

document.addEventListener('DOMContentLoaded', () => {
    fetchGuestsData();
});
