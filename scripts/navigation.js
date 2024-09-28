// Función para navegar a la siguiente pantalla
function nextScreen(next) {
    // Ocultar todas las pantallas
    const screens = document.querySelectorAll('.container');
    screens.forEach(screen => screen.classList.remove('active'));

    // Mostrar la pantalla seleccionada
    const currentScreen = document.getElementById(`screen${next}`);
    currentScreen.classList.add('active');
    
    // Verificar si se debe mostrar la información de acompañantes
    if (next === 3) {
        toggleAcompanante();
    }
}

// Función para navegar a la pantalla anterior
function prevScreen(prev) {
    // Ocultar todas las pantallas
    const screens = document.querySelectorAll('.container');
    screens.forEach(screen => screen.classList.remove('active'));

    // Mostrar la pantalla seleccionada
    const currentScreen = document.getElementById(`screen${prev}`);
    currentScreen.classList.add('active');
}

// Función para mostrar/ocultar la información de acompañantes
function toggleAcompanante() {
    const acompananteSelect = document.getElementById('acompanante').value;
    const acompananteSection = document.getElementById('acompananteSection');

    if (acompananteSelect === 'si') {
        acompananteSection.style.display = 'block';
    } else {
        acompananteSection.style.display = 'none';
    }
}

// Función para actualizar el texto de la mesa seleccionada
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

// Función para finalizar el registro
function finalizarRegistro() {
    // Recargar la página para actualizar el estado de todas las mesas
    location.reload();
}

// Evento para iniciar el flujo desde la pantalla de bienvenida
document.getElementById('startButton').addEventListener('click', () => {
    nextScreen(2);
});

// Evento para el botón "Siguiente" en cada pantalla
document.querySelectorAll('.next-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const currentScreen = parseInt(e.target.getAttribute('data-current'));
        nextScreen(currentScreen + 1);
    });
});

// Evento para el botón "Anterior" en cada pantalla
document.querySelectorAll('.prev-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const currentScreen = parseInt(e.target.getAttribute('data-current'));
        prevScreen(currentScreen - 1);
    });
});

// Evento para manejar cambios en la selección de mesa
document.getElementById('mesaSelect').addEventListener('change', updateMesaText);

// Evento para manejar cambios en la selección de acompañantes
document.getElementById('acompanante').addEventListener('change', toggleAcompanante);

