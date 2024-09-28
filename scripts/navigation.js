// Función para navegar a la siguiente pantalla
function nextScreen(next) {
    const screens = document.querySelectorAll('.container');
    screens.forEach(screen => screen.classList.remove('active'));

    const currentScreen = document.getElementById(`screen${next}`);
    currentScreen.classList.add('active');

    if (next === 3) {
        toggleAcompanante();
    }
}

// Función para navegar a la pantalla anterior
function prevScreen(prev) {
    const screens = document.querySelectorAll('.container');
    screens.forEach(screen => screen.classList.remove('active'));

    const currentScreen = document.getElementById(`screen${prev}`);
    currentScreen.classList.add('active');
}

// Mostrar/ocultar la sección de acompañantes
function toggleAcompanante() {
    const acompananteSelect = document.getElementById('acompanante').value;
    const acompananteSection = document.getElementById('screen3');

    if (acompananteSelect === 'si') {
        acompananteSection.style.display = 'block';
    } else {
        acompananteSection.style.display = 'none';
    }
}

// Actualizar el texto de la mesa seleccionada
function updateMesaText() {
    const mesaSelect = document.getElementById('mesaSelect');
    const mesaText = document.getElementById('mesaText');
    const selectedMesa = mesaSelect.value;

    if (selectedMesa) {
        mesaText.textContent = selectedMesa;
    } else {
        mesaText.textContent = 'Mesa';
    }
}

// Evento para el botón de inicio
document.getElementById('startButton').addEventListener('click', () => {
    nextScreen(2);
});

// Evento para botones "Siguiente"
document.querySelectorAll('.next-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const currentScreen = parseInt(e.target.getAttribute('data-current'));
        nextScreen(currentScreen + 1);
    });
});

// Evento para botones "Anterior"
document.querySelectorAll('.prev-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const currentScreen = parseInt(e.target.getAttribute('data-current'));
        prevScreen(currentScreen - 1);
    });
});

// Evento para selección de mesa
document.getElementById('mesaSelect').addEventListener('change', updateMesaText);

// Evento para selección de acompañantes
document.getElementById('acompanante').addEventListener('change', toggleAcompanante);
