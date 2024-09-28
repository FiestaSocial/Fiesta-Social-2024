// navigation.js
let currentScreen = 1;

function nextScreen(nextScreenNumber) {
    if (nextScreenNumber === undefined) {
        nextScreenNumber = currentScreen + 1;
    }

    // Hide current screen
    document.getElementById(`screen${currentScreen}`).classList.remove('active');

    // Show the next screen
    currentScreen = nextScreenNumber;
    document.getElementById(`screen${currentScreen}`).classList.add('active');
}

function prevScreen(screen) {
    // Hide current screen
    document.getElementById(`screen${currentScreen}`).classList.remove('active');

    // Show the previous screen
    currentScreen = screen;
    document.getElementById(`screen${currentScreen}`).classList.add('active');
}
