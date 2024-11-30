/* Función checkNombreJuguete
   ¿Qué hace? --> Configura la regex y llama a la función comprobarRegex()
   Parámetros --> Valor del input(element)
   Devuelve --> True/False
*/
function checkNombre(element) {
    let regex = /^[A-Z][a-z]{0,9}$/;
    return comprobarRegex(element, regex);
    // Texto Admite --> Nombre de la persona que empiece por mayúscula, longitud máxima 10 
}

/* Función checkNombreJuguete
   ¿Qué hace? --> Configura la regex y llama a la función comprobarRegex()
   Parámetros --> Valor del input(element)
   Devuelve --> True/False
*/
function checkEdad(element) {

    let regex = /^(1[0-5]|[0-9])$/;
    return comprobarRegex(element, regex);
    // Texto Admite --> Edad de la persona entre 0 y 15
}

/* Función comprobarRegex
   ¿Qué hace? --> Comprueba que el input cumple las condiciones de la regex
   Parámetros --> Valor del input(element) y la regex a comprobar(regex)
   Devuelve --> True/False
*/
function comprobarRegex(element, regex) {
    // Si cumple la condición del regex el borde del input se pone de color verde, en caso negativo se pone de color rojo
    if (regex.test(element.value)) {
        element.setAttribute("class", "verde");
        return true;
    } else {
        element.setAttribute("class", "rojo");
        return false;
    }
}

/* Función checkInputs
   ¿Qué hace? --> Comprueba que todos los inputs del formulario estén bien y cambia el color de los bordes 
                  en caso de que estén bien o mal escritos
   Devuelve --> True/False
*/
function checkInputs() {
    let nombre = document.getElementById("nombre");
    let edad = document.getElementById("edad");
    let aviso = document.getElementById("aviso");

    let todoOk = false;

    todoOk = checkNombre(nombre);

    if (!todoOk) {
        checkEdad(edad);
    }

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
        aviso.innerHTML = "";
        aviso.innerHTML = "Usuario añadido correctamente.";
        nombre.className = "";
        edad.className = "";
    }
    return todoOk;
}

/* Función mostrarVerUsuarios()
   ¿Qué hace? --> Comprueba que todos los inputs del formulario estén bien y cambia el color de los bordes 
                  en caso de que estén bien o mal escritos
*/
document.getElementById("crear").addEventListener("click", async (event) => {
    event.preventDefault();
    // Si los inputs son correctos ingresamos el usuario en la BD
    if (checkInputs()) {
        console.log(checkInputs());
        let nombre = document.getElementById("nombre").value;
        let edad = document.getElementById("edad").value;
        console.log(nombre, edad);
        try {
            console.log(nombre, edad);
            const response = await fetch("http://127.0.0.1:8000/usuarios/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre, edad
                })
            });

            window.location.href = "../html/listaVista.html";
        } catch (e) {
            alert('algo salio mal')
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