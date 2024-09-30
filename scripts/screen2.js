function toggleAcompanante() {
    let acompanante = document.getElementById("acompanante").value;
    let acompananteCantidad = document.getElementById("acompananteCantidad");
    if (acompanante === "si") {
        acompananteCantidad.style.display = "block";
    } else {
        acompananteCantidad.style.display = "none";
    }
}
