// screen3.js
function generateAcompanantesForm(cantidad) {
    let acompanantesForm = document.getElementById("acompanantesForm");
    acompanantesForm.innerHTML = ''; // Clear previous entries
    for (let i = 1; i <= cantidad; i++) {
        acompanantesForm.innerHTML += `
            <h3>Acompañante ${i}</h3>
            <label for="nombreAcompanante${i}">Nombre:</label>
            <input type="text" id="nombreAcompanante${i}" name="nombreAcompanante${i}" required><br><br>`;
    }
}
