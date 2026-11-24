
console.log("¡Bienvenido al blog de DAR! JavaScript cargado con exito.");


var vecesPulsado = 0;


function manejarClicBoton() {
    console.log("El usuario ha hecho clic en el boton.");
    vecesPulsado = vecesPulsado + 1;

    var parrafoMensaje = document.getElementById("mensaje-interactivo");

    if (vecesPulsado === 1) {
        parrafoMensaje.innerHTML = "¡Gracias por hacer clic! (Has pulsado 1 vez)";
        parrafoMensaje.style.color = "#16a34a"; // Color verde
    } else {
        parrafoMensaje.innerHTML = "¡Has vuelto a pulsar el botón! Ya van " + vecesPulsado + " clics.";
        parrafoMensaje.style.color = "#2563eb"; // Color azul
    }
}

function cargarAnioActual() {
    var fecha = new Date();
    var anio = fecha.getFullYear();
    var elementoAnio = document.getElementById("anio-actual");
    if (elementoAnio) {
        elementoAnio.innerText = anio;
    }
}

window.onload = function() {
    cargarAnioActual();
    console.log("Pagina completamente cargada.");
};
