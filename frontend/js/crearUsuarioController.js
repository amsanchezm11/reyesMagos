function checkNombre(element) {

    let regex = /^[A-Z][a-z]{0,9}$/;
    comprobarRegex(element, regex);
    // Texto Admite --> Nombre de la persona que empiece por mayúscula, longitud máxima 10 
}


function checkEdad(element) {

    let regex = /^(1[0-5]|[0-9])$/;
    comprobarRegex(element, regex);
    // Texto Admite --> Edad de la persona entre 0 y 15
}

function comprobarRegex(element, regex) {
    // Si cumple la condición del regex el borde del input se pone de color verde, en caso negativo se pone de color rojo
    if (regex.test(element.value)) {
        element.setAttribute("class", "verde");
    } else {
        element.setAttribute("class", "rojo");
    }
}


//document.getElementById("crear").addEventListener("click", checkInputs);
function checkInputs() {
    let nombre = document.getElementById("nombre");
    let edad = document.getElementById("edad");
    let aviso = document.getElementById("aviso");
    let todoOk = false;
    checkNombre(nombre);
    checkEdad(edad);

    if (nombre.className == "rojo") {
        aviso.classList.remove("avisoV");
        aviso.classList.add("avisoR");
        aviso.innerHTML = "";
        aviso.innerHTML = "Nombre Incorrecto. Longitud máxima 10.";
    } else if (edad.className == "rojo") {
        aviso.classList.remove("avisoV");
        aviso.classList.add("avisoR");
        aviso.innerHTML = "";
        aviso.innerHTML = "Edad Incorrecta. Edad entre 0 y 15";

    } else {
        aviso.classList.remove("avisoR");
        aviso.classList.add("avisoV");
        todoOk = true;
        // MENSAJE DE QUE SE HA AÑADIDO CORRECTAMENTE
        aviso.innerHTML = "";
        aviso.innerHTML = "Usuario añadido correctamente.";
        // RESETEAMOS LOS VALORES DE LOS INPUTS
        nombre.value = "";
        edad.value = "";
        // RESETEO LAS CLASES DE LOS INPUTS PARA QUE NO SE LE QUEDE EL COLOR VERDE DEL BORDER
        nombre.className = "";
        edad.className = "";
    }
    return todoOk;
}

function aniadirUsuario() {
    //let contenedor = document.getElementById("body");
    let nombre = document.getElementById("nombre").value;
    let edad = document.getElementById("edad").value;

    checkInputs();

    //let usuario = new Usuario(nombre, parseInt(edad));

    //usuarios.push(usuario);
    //console.log(usuarios);
    //mostrarVerUsuarios();

}

//mostrarVerUsuarios();

//if (document.getElementById("crear") != null) {
//    document.getElementById("crear").addEventListener("click",aniadirUsuario);
//}

function mostrarVerUsuarios() {

    let botones = document.getElementById("containerVer");

    if (!document.getElementById("verUsuarios")) {
        let boton = document.createElement("button");
        boton.id = "verUsuarios";
        boton.type = "submit";
        boton.innerHTML = "Ver Usuarios";
        botones.appendChild(boton);

        // Le añadimos la función de verUsuarios al botón
        document.getElementById("verUsuarios").addEventListener("click", function () {
            window.location.href = "./html/listaVista.html";
        });
    }

}

// FETCH

document.getElementById("crear").addEventListener("click", async (event) => {
    event.preventDefault();

    // Si los inputs son correctos ingresamos el usuario en la BD
    if (checkInputs()) {
        let nombre = document.getElementById("nombre").value;
        let edad = document.getElementById("edad").value;

        try {
            const response = await fetch("http://127.0.0.1:8000/usuarios/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre, edad
                })

            });

            const data = await response.json();
            console.log(data);

        } catch (error) {
            alert("algo salió mal");
        }
    }

});

// Función diasHastaReyes()
// ¿Qué hace? --> Te calcula los dias que faltan hasta el 6 de enero de 2025
function diasHastaReyes() {
    let hoy = new Date(); // Fecha actual
    let diaDeReyes = new Date(2025, 0, 6);
    // Calculamos la diferencia(nos la da en ms)
    let diferenciaMilisegundos = diaDeReyes - hoy;
    // Convertimos la diferencia a días
    let diasRestantes = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));

    document.getElementById("reyes").title = `Faltan ${diasRestantes} días para reyes`;
}
// Llamamos a la función diasHastaReyes()
diasHastaReyes();