function loadScreen4() {
    document.getElementById('screen4').innerHTML = `
        <h2>Selección de Mesa</h2>
        <div class="salon-container">
            <div class="mesas" id="mesasIzquierda"></div>
            <div class="pista">PISTA DE BAILE</div>
            <div class="mesas" id="mesasDerecha"></div>
        </div>
        <label for="mesaSelect">Seleccione su mesa:</label>
        <select id="mesaSelect" name="mesaSelect" required onchange="updateMesaText()">
            <option value="" selected>Seleccionar</option>
        </select><br><br>
        <div class="table-container">
            <div class="table" id="mesaText">Mesa</div>
            <div class="seat" data-seat="1" style="transform: translate(-100px, -100px);"></div>
            <div class="seat" data-seat="2" style="transform: translate(0, -125px);"></div>
            <div class="seat" data-seat="3" style="transform: translate(100px, -100px);"></div>
            <div class="seat" data-seat="4" style="transform: translate(125px, 0);"></div>
            <div class="seat" data-seat="5" style="transform: translate(100px, 100px);"></div>
            <div class="seat" data-seat="6" style="transform: translate(0, 125px);"></div>
            <div class="seat" data-seat="7" style="transform: translate(-100px, 100px);"></div>
            <div class="seat" data-seat="8" style="transform: translate(-125px, 0);"></div>
        </div>
        <div class="navigation-buttons">
            <button onclick="prevScreen(3)">Anterior</button>
            <button onclick="submitForm()">Enviar</button>
        </div>
        <div>
            <h3>Invitados Registrados en esta Mesa:</h3>
            <div id="guestList"></div>
        </div>
    `;
    
    // Populate the salon with mesas
    let mesasIzquierda = document.getElementById("mesasIzquierda");
    let mesasDerecha = document.getElementById("mesasDerecha");
    let mesaSelect = document.getElementById("mesaSelect");

    for (let i = 1; i <= 17; i++) {
        mesasIzquierda.innerHTML += `<div class="mesa" id="mesa${i}" onmouseover="showGuests('Mesa ${i}', event)" onmouseout="hideGuests()">${i}</div>`;
    }
    for (let i = 18; i <= 35; i++) {
        mesasDerecha.innerHTML += `<div class="mesa" id="mesa${i}" onmouseover="showGuests('Mesa ${i}', event)" onmouseout="hideGuests()">${i}</div>`;
    }
    for (let i = 1; i <= 35; i++) {
        mesaSelect.innerHTML += `<option value="Mesa ${i}">Mesa ${i}</option>`;
    }

    // Fetch guests data to update salon
    fetchGuestsData();
}

loadScreen4();

