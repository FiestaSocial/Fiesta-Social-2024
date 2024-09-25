// confirmationModal.js
// Gestiona el modal de confirmación que se muestra al completar el registro.
// confirmationModal.js
function showConfirmation() {
    const mesaConfirmada = document.getElementById('mesa').value;
    document.getElementById('confirmationModal').innerHTML = `
        <h2>Registro Completo</h2>
        <p>Se ha registrado en la <strong>${mesaConfirmada}</strong></p>
        <p>Si quiere realizar un cambio comuníquese con la Secc. Contable de la B.A. III.</p>
        <button onclick="finalizarRegistro()">Finalizar</button>
    `;
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById('confirmationModal').style.display = 'block';
}

function finalizarRegistro() {
    document.getElementById('confirmationModal').style.display = 'none';
    currentScreen = 1;
    document.getElementById('screen1').classList.add('active');
}
