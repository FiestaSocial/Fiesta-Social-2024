// screen2.js - Datos Personales
function loadScreen2() {
    document.getElementById('screen2').innerHTML = `
        <h2>Datos Personales</h2>
        <form id="guestForm">
            <label for="correo">Correo:</label>
            <input type="email" id="correo" name="correo" required><br><br>
            
            <label for="grado">Grado:</label>
            <select id="grado" name="grado" required>
                <option value="" selected>Seleccionar</option>
                <option value="Cnel.">Cnel.</option>
                <option value="Tte. Cnel.">Tte. Cnel.</option>
                <option value="May.">May.</option>
                <option value="Cap.">Cap.</option>
                <option value="Tte. 1°">Tte. 1°</option>
                <option value="Tte. 2°">Tte. 2°</option>
                <option value="Alf.">Alf.</option>
            </select><br><br>

            <label for="escalafon">Escalafón:</label>
            <select id="escalafon" name="escalafon" required>
                <option value="" selected>Seleccionar</option>
                <option value="Av.">(Av.)</option>
                <option value="Nav.">(Nav.)</option>
                <option value="Esp.">(Esp.)</option>
                <option value="T.P.">(T.P.)</option>
            </select><br><br>

            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required><br><br>

            <label for="apellido">Apellido:</label>
            <input type="text" id="apellido" name="apellido" required><br><br>

            <label for="cedula">Cédula de Identidad:</label>
            <input type="text" id="cedula" name="cedula" required><br><br>

            <label for="acompanante">¿Asiste con acompañante?</label>
            <select id="acompanante" name="acompanante" required onchange="toggleAcompanante()">
                <option value="" selected>Seleccionar</option>
                <option value="no">No</option>
                <option value="si">Sí</option>
            </select><br><br>

            <!-- Campo para seleccionar la cantidad de acompañantes -->
            <div id="acompananteCantidad" style="display:none;">
                <label for="cantidadAcompanantes">¿Cuántos acompañantes?</label>
                <select id="cantidadAcompanantes" name="cantidadAcompanantes">
                    <option value="" selected>Seleccionar</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select><br><br>
            </div>

            <label for="menu">Menú:</label>
            <select id="menu" name="menu" required>
                <option value="" selected>Seleccionar</option>
                <option value="normal">Normal</option>
                <option value="vegetariano">Vegetariano</option>
                <option value="vegano">Vegano</option>
                <option value="celiaco">Celíaco</option>
            </select><br><br>
        </form>
        <div class="navigation-buttons">
            <button onclick="prevScreen(1)">Anterior</button>
            <button onclick="nextScreen()">Siguiente</button>
        </div>
    `;
}

// Función para mostrar/ocultar el campo de cantidad de acompañantes
function toggleAcompanante() {
    let acompanante = document.getElementById("acompanante").value;
    let acompananteCantidad = document.getElementById("acompananteCantidad");
    if (acompanante === "si") {
        acompananteCantidad.style.display = "block";
    } else {
        acompananteCantidad.style.display = "none";
    }
}

