// screen3.js - Información de los Acompañantes
function generateAcompanantesForm(cantidad) {
    let acompanantesForm = document.getElementById('acompanantesForm');
    acompanantesForm.innerHTML = ''; // Clear previous entries

    for (let i = 1; i <= cantidad; i++) {
        acompanantesForm.innerHTML += `
            <h3>Acompañante ${i}</h3>
            <label for="nombreAcompanante${i}">Nombre:</label>
            <input type="text" id="nombreAcompanante${i}" name="nombreAcompanante${i}" required><br><br>
            
            <label for="menuAcompanante${i}">Menú:</label>
            <select id="menuAcompanante${i}" name="menuAcompanante${i}" required>
                <option value="" selected>Seleccionar</option>
                <option value="normal">Normal</option>
                <option value="vegetariano">Vegetariano</option>
                <option value="vegano">Vegano</option>
                <option value="celiaco">Celíaco</option>
            </select><br><br>
        `;
    }
}

function loadScreen3() {
    document.getElementById('screen3').innerHTML = `
        <h2>Información de los Acompañantes</h2>
        <form id="acompanantesForm"></form>
        <div class="navigation-buttons">
            <button onclick="prevScreen(2)">Anterior</button>
            <button onclick="nextScreen(4)">Siguiente</button>
        </div>
    `;
}

