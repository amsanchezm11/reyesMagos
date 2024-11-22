function checkNombreJuguete(element) {

    let regex = /^[A-Za-z ]{1,20}$/;
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


//document.getElementById("crearRey").addEventListener("click", checkInputs);
function checkInputs() {

    let aviso = document.getElementById("avisoJuguete");
    let nombre = document.getElementById("nombreJuguete");
    let todoOk = false;

    console.log(nombre);
    //console.log(imagen);
    todoOk = checkNombreJuguete(nombre);

    if (!todoOk) {
        aviso.classList.remove("avisoV");
        aviso.classList.add("avisoR");
        aviso.innerHTML = "";
        aviso.innerHTML = "Longitud máxima del texto 20";
    } else {
        aviso.classList.remove("avisoR");
        aviso.classList.add("avisoV");
        // Mensaje de que se ha añadido correctamente
        aviso.innerHTML = "";
        aviso.innerHTML = "Juguete añadido correctamente.";
    }
    return todoOk;
}

document.getElementById("crearJuguete").addEventListener("click", async (event) => {
    event.preventDefault();

    // Si los inputs son correctos ingresamos el usuario en la BD
    if (checkInputs()) {

        let nombre = document.getElementById("nombreJuguete").value;
        let imagen = document.getElementById("imagen").value;

        imagen = imagen.split("\\").pop();

        try {

            const response = await fetch("http://127.0.0.1:8000/juguetes/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre, imagen
                })
            });

            /*data = await response.json();
            console.log(data);*/

        } catch (e) {
            alert('Algo salio mal')
        }
    }

});


// Función para modificar el estilo del type file
document.getElementById("imagen").addEventListener("change", function () {
    let label = document.querySelector(".input-file-label");
    let fileName = this.files[0] ? this.files[0].name : "Seleccionar imagen";
    label.textContent = fileName;
    label.classList.add("selected");
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