// screen4.js

function loadScreen4() {
    document.getElementById('screen4').innerHTML = `
        <h2>Selección de Mesa</h2>
        <div class="salon-container">
            <div class="mesas" id="mesasIzquierda">
                ${generateMesasHTML(1, 17)}
            </div>
            <div class="pista">PISTA DE BAILE</div>
            <div class="mesas" id="mesasDerecha">
                ${generateMesasHTML(18, 35)}
            </div>
        </div>
        <label for="mesaSelect">Seleccione su mesa:</label>
        <select id="mesaSelect" name="mesaSelect" required onchange="updateMesaText()">
            <option value="" selected>Seleccionar</option>
            ${generateMesaOptions()}
        </select><br><br>
        <div class="table-container">
            <div class="table" id="mesaText">Mesa</div>
            ${generateSeatsHTML()}
        </div>
        <div class="navigation-buttons">
            <button onclick="prevScreen(3)">Anterior</button>
            <button onclick="submitForm()">Enviar</button>
        </div>
        <div>
            <h3>Invitados Registrados en esta Mesa:</h3>
            <div id="guestList">No hay invitados registrados en esta mesa.</div>
        </div>
    `;
    updateSalon();
    updateGuestList();
}

function generateMesasHTML(start, end) {
    let mesasHTML = '';
    for (let i = start; i <= end; i++) {
        mesasHTML += `<div class="mesa" id="mesa${i}" onmouseover="showGuests('Mesa ${i}', event)" onmouseout="hideGuests()">${i}</div>`;
    }
    return mesasHTML;
}

function generateMesaOptions() {
    let optionsHTML = '';
    for (let i = 1; i <= 35; i++) {
        optionsHTML += `<option value="Mesa ${i}">Mesa ${i}</option>`;
    }
    return optionsHTML;
}

function generateSeatsHTML() {
    let seatsHTML = '';
    for (let i = 1; i <= 8; i++) {
        const positions = [
            [-100, -100], [0, -125], [100, -100],
            [125, 0], [100, 100], [0, 125],
            [-100, 100], [-125, 0]
        ];
        seatsHTML += `<div class="seat" data-seat="${i}" style="transform: translate(${positions[i - 1][0]}px, ${positions[i - 1][1]}px);"></div>`;
    }
    return seatsHTML;
}

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
    updateSeats(selectedMesa);
    updateGuestList();
}

function updateSalon() {
    const mesaSelect = document.getElementById("mesaSelect");

    if (!mesaSelect) {
        console.error("Elemento 'mesaSelect' no encontrado en el DOM.");
        return;
    }

    for (let i = 1; i <= 35; i++) {
        const mesaDiv = document.getElementById(`mesa${i}`);
        const mesaOption = mesaSelect.querySelector(`option[value='Mesa ${i}']`);

        if (!mesaDiv || !mesaOption) {
            console.warn(`Elemento de mesa 'mesa${i}' no encontrado.`);
            continue;
        }

        if (guestsData[`Mesa ${i}`] && guestsData[`Mesa ${i}`].length >= 8) {
            mesaDiv.classList.add('completa');
            mesaOption.style.backgroundColor = '#dc3545';
        } else {
            mesaDiv.classList.remove('completa');
            mesaOption.style.backgroundColor = '';
        }
    }
}

loadScreen4();
