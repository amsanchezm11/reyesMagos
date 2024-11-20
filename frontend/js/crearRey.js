let nombre = document.getElementById("nombre");
function checkNombre(element) {

    let regex = /^(Melchor|Gaspar|Baltasar)$/;
    return comprobarRegex(element, regex);
    // Texto Admite --> Los valores Melchor | Gaspar | Baltasar 
}

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


document.getElementById("crearRey").addEventListener("click", checkInputs);
function checkInputs() {

    let aviso = document.getElementById("aviso");
    let nombre = document.getElementById("nombre").value;
    let todoOk = false;

    todoOk = checkNombre(nombre);
    
    if (nombre.className == "rojo") {
        aviso.classList.remove("avisoV");
        aviso.classList.add("avisoR");
        aviso.innerHTML = "";
        aviso.innerHTML = "Nombre Incorrecto. Prueba (Melchor|Gaspar|Baltasar).";       
    } else {
        aviso.classList.remove("avisoR");
        aviso.classList.add("avisoV");
        // MENSAJE DE QUE SE HA AÑADIDO CORRECTAMENTE
        aviso.innerHTML = "";
        aviso.innerHTML = "Rey añadido correctamente.";
        // RESETEAMOS LOS VALORES DE LOS INPUTS
        nombre.value = "";        
        // RESETEO LAS CLASES DE LOS INPUTS PARA QUE NO SE LE QUEDE EL COLOR VERDE DEL BORDER
        nombre.className = "";        
    }
    return todoOk;
}

document.getElementById("crearRey").addEventListener("click", async (event) => {
    event.preventDefault();
    console.log("Entrando en la funcion");
    console.log(checkInputs());
    // Si los inputs son correctos ingresamos el usuario en la BD
    if (checkInputs()) {
        console.log(checkInputs());
        let nombre = document.getElementById("nombre").value;
  
        try {
           
            const response = await fetch("http://127.0.0.1:8000/reyes_magos/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre
                })
            });

            /*data = await response.json();
            console.log(data);*/

        } catch (e) {
            alert('Algo salio mal')
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
    
    document.getElementById("reyes").title= `Faltan ${diasRestantes} días para reyes`;
}
// Llamamos a la función diasHastaReyes()
diasHastaReyes();