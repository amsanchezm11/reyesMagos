
// Ejecutamos la función al cargar la página
window.addEventListener("load", async (event) => {
    event.preventDefault();

    const listaUsuarios = await obtenerUsuarios("http://127.0.0.1:8000/usuarios/");
    const listaReyes = await obtenerReyes("http://127.0.0.1:8000/reyes_magos/");

    rellenarOptionUsuario(listaUsuarios);
    rellenarOptionReyes(listaReyes);

});

// Función obtener usuarios
async function obtenerUsuarios(url) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Validar si la respuesta es un array
        if (Array.isArray(data)) {
            return data;
        } else {
            throw new Error("El formato de la respuesta no es un array.");
        }
    } catch (error) {
        console.error("Error al obtener los resultados:", error);
        return []; // Retorna un array vacío en caso de error
    }
}

// Función obtener reyes
async function obtenerReyes(url) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Validar si la respuesta es un array
        if (Array.isArray(data)) {
            return data;
        } else {
            throw new Error("El formato de la respuesta no es un array.");
        }
    } catch (error) {
        console.error("Error al obtener los resultados:", error);
        return []; // Retorna un array vacío en caso de error
    }
}
// Función rellenar select del usuarios
function rellenarOptionUsuario(usuarios) {
    let select = document.getElementById("selectorUsu");

    usuarios.forEach(usuario => {
        let option = document.createElement("option");
        option.value = `${usuario.nombre}_${usuario.edad}`;
        option.innerHTML = `${usuario.nombre}`;
        select.appendChild(option);
    });
}
// Función de rellenar select de reyes
function rellenarOptionReyes(reyes) {
    let select = document.getElementById("selectorRey");

    reyes.forEach(rey => {
        let option = document.createElement("option");
        option.value = `${rey.nombre}`;
        option.innerHTML = `${rey.nombre}`;
        select.appendChild(option);
    });
}


// Función mostar usuario elegido
document.getElementById("selectorUsu").addEventListener("change", mostrarUsuario);
function mostrarUsuario(event) {

    let usuario = event.target.value;
    let datos = usuario.split("_");
    document.getElementById("nombreCarta").innerHTML = datos[0];
    document.getElementById("edadCarta").innerHTML = parseInt(datos[1]);
}

// Función mostrar rey elegido
document.getElementById("selectorRey").addEventListener("change", mostrarRey);
function mostrarRey(event) {

    let rey = event.target.value;
    console.log(rey);
    document.getElementById("reyCarta").innerHTML = rey;
}



























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