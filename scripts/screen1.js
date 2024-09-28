// screen1.js
function loadScreen1() {
    document.getElementById('screen1').innerHTML = `
        <h1>Bienvenido al asistente web para la Fiesta Social 2024.</h1>
        <p>¡Estamos encantados de tenerte aquí!</p>
        <img src="Imagen de bienvenida.png" alt="Imagen de bienvenida" style="max-width: 100%; height: auto; border-radius: 10px;">
        <div class="navigation-buttons">
            <button onclick="nextScreen(2)">Iniciar</button>
        </div>
    `;
}

loadScreen1();

