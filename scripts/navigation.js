let currentScreen = 1;

function nextScreen(nextScreenNumber) {
    if (nextScreenNumber === undefined) {
        nextScreenNumber = currentScreen + 1;
    }
    if (document.getElementById(`screen${currentScreen}`)) {
        document.getElementById(`screen${currentScreen}`).classList.remove('active');
    }
    currentScreen = nextScreenNumber;
    if (document.getElementById(`screen${currentScreen}`)) {
        document.getElementById(`screen${currentScreen}`).classList.add('active');
    }
}

function prevScreen(screen) {
    if (document.getElementById(`screen${currentScreen}`)) {
        document.getElementById(`screen${currentScreen}`).classList.remove('active');
    }
    currentScreen = screen;
    if (document.getElementById(`screen${currentScreen}`)) {
        document.getElementById(`screen${currentScreen}`).classList.add('active');
    }
}
