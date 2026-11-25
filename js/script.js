console.log("¡Bienvenido al blog de DAR! JavaScript cargado con exito.");

var configBlog = {
    autor: "Francisco",
    bio: "",
    titulo: "Aprendiendo Desarrollo Web",
    subtitulo: "Blog personal para la Actividad 1 de Desarrollo de Aplicaciones en Red (DAR)",
    asignatura: "Desarrollo de Aplicaciones en Red (DAR) - UNIR"
};


function cargarVariablesEnDOM() {
    // 1. Nombre del autor (en la bio y en el pie de pagina)
    var listaAutores = document.getElementsByClassName("nombre-autor");
    for (var i = 0; i < listaAutores.length; i++) {
        listaAutores[i].innerText = configBlog.autor;
    }

    // 2. Descripcion o bio del autor
    var listaBios = document.getElementsByClassName("bio-autor");
    for (var j = 0; j < listaBios.length; j++) {
        listaBios[j].innerText = configBlog.bio;
    }

    // 3. Titulo principal del blog
    var listaTitulos = document.getElementsByClassName("titulo-blog-texto");
    for (var k = 0; k < listaTitulos.length; k++) {
        listaTitulos[k].innerText = configBlog.titulo;
    }

    // 4. Subtitulo del blog
    var listaSubtitulos = document.getElementsByClassName("subtitulo-blog-texto");
    for (var l = 0; l < listaSubtitulos.length; l++) {
        listaSubtitulos[l].innerText = configBlog.subtitulo;
    }

    // 5. Asignatura en el footer
    var listaAsignaturas = document.getElementsByClassName("asignatura-texto");
    for (var m = 0; m < listaAsignaturas.length; m++) {
        listaAsignaturas[m].innerText = configBlog.asignatura;
    }

    console.log("Variables del autor y del blog cargadas en el DOM con exito.");
}

function renderizarEntradas(entradas) {
    var contenedor = document.getElementById("lista-articulos");
    if (!contenedor) return;

    var htmlTotal = "";

    for (var i = 0; i < entradas.length; i++) {
        var post = entradas[i];
        htmlTotal += '<li class="tarjeta-entrada">' +
                     '  <article>' +
                     '    <h3 class="titulo-post-enlace">' +
                     '      <a href="entradas/' + post.archivo + '">' + post.titulo + '</a>' +
                     '    </h3>' +
                     '    <p class="fecha-post">📅 ' + post.fecha + '</p>' +
                     '    <p class="resumen-post">' + post.resumen + '</p>' +
                     '  </article>' +
                     '</li>';
    }

    contenedor.innerHTML = htmlTotal;
    console.log("Total de entradas cargadas en la portada: " + entradas.length);
}

function cargarEntradasAutomaticamente() {
    var contenedor = document.getElementById("lista-articulos");
    if (!contenedor) return;

    fetch("entradas.json")
        .then(function(respuesta) {
            if (!respuesta.ok) {
                throw new Error("No se pudo cargar el archivo entradas.json");
            }
            return respuesta.json();
        })
        .then(function(datos) {
            renderizarEntradas(datos);
        })
        .catch(function(error) {
            console.error("Error al cargar las entradas desde el archivo:", error);
            contenedor.innerHTML = '<li style="color: #ef4444; list-style: none;">Error al cargar las entradas desde entradas.json.</li>';
        });
}

function filtrarEntradas() {
    var input = document.getElementById("campo-buscar");
    if (!input) return;

    var filtro = input.value.toLowerCase();
    var lista = document.getElementById("lista-articulos");
    if (!lista) return;

    var articulos = lista.getElementsByTagName("li");
    var encontrados = 0;

    for (var i = 0; i < articulos.length; i++) {
        var textoTarjeta = articulos[i].innerText.toLowerCase();
        if (textoTarjeta.indexOf(filtro) > -1) {
            articulos[i].style.display = "";
            encontrados = encontrados + 1;
        } else {
            articulos[i].style.display = "none";
        }
    }

    var avisoNoResultados = document.getElementById("aviso-sin-resultados");
    if (avisoNoResultados) {
        if (encontrados === 0) {
            avisoNoResultados.style.display = "block";
        } else {
            avisoNoResultados.style.display = "none";
        }
    }
}

function darLike(postId) {
    var elemento = document.getElementById("contador-likes-" + postId);
    if (elemento) {
        var actuales = parseInt(elemento.innerText) || 0;
        elemento.innerText = actuales + 1;
    }

    var mensaje = document.getElementById("mensaje-like-" + postId);
    if (mensaje) {
        mensaje.innerText = "¡Gracias por tu me gusta!";
    }
}

function cargarNavegacion() {
    var nav = document.getElementById("barra-navegacion");
    if (!nav) return; // Solo en paginas de entrada, no en portada

    // Sacamos el nombre del archivo actual de la URL
    var rutaActual = window.location.pathname;
    var archivoActual = rutaActual.substring(rutaActual.lastIndexOf("/") + 1);

    // Desde la carpeta entradas/ el JSON esta un nivel arriba
    fetch("../entradas.json")
        .then(function(respuesta) {
            if (!respuesta.ok) {
                throw new Error("No se pudo cargar entradas.json");
            }
            return respuesta.json();
        })
        .then(function(entradas) {
            // Buscamos el indice de la entrada actual
            var indiceActual = -1;
            for (var i = 0; i < entradas.length; i++) {
                if (entradas[i].archivo === archivoActual) {
                    indiceActual = i;
                    break;
                }
            }
            if (indiceActual === -1) return;

            var html = "";

            // Enlace anterior: entrada previa o portada si es la primera
            if (indiceActual > 0) {
                var anterior = entradas[indiceActual - 1];
                html += '<a href="' + anterior.archivo + '" class="enlace-nav">← ' + anterior.titulo + '</a>';
            } else {
                html += '<a href="../index.html" class="enlace-nav">← Volver a la portada</a>';
            }

            // Enlace siguiente: entrada siguiente o portada si es la ultima
            if (indiceActual < entradas.length - 1) {
                var siguiente = entradas[indiceActual + 1];
                html += '<a href="' + siguiente.archivo + '" class="enlace-nav">' + siguiente.titulo + ' →</a>';
            } else {
                html += '<a href="../index.html" class="enlace-nav">Volver a la portada</a>';
            }

            nav.innerHTML = html;
            console.log("Navegacion cargada para: " + archivoActual);
        })
        .catch(function(error) {
            console.error("Error al cargar la navegacion:", error);
        });
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
    // Cargamos primero las variables del autor y del blog
    cargarVariablesEnDOM();

    // Cargamos año del footer y entradas dinámicas
    cargarAnioActual();
    cargarEntradasAutomaticamente();
    cargarNavegacion();
};
