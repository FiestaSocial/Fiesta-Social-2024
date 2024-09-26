// confirmationModal.js
function showConfirmation() {
    const mesaConfirmada = document.getElementById('mesa').value;
    document.getElementById('mesaConfirmada').textContent = mesaConfirmada;
    if (document.getElementById(`screen${currentScreen}`)) {
        document.getElementById(`screen${currentScreen}`).classList.remove('active');
    }
    document.getElementById('confirmationModal').style.display = 'block';
}

function finalizarRegistro() {
    document.getElementById('confirmationModal').style.display = 'none';
    document.getElementById('screen1').classList.add('active');
}
