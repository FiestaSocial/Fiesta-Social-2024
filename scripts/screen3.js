function generateAcompanantesForm(cantidad) {
    let acompanantesForm = document.getElementById("acompanantesForm");
    acompanantesForm.innerHTML = ''; // Limpiar entradas anteriores
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
