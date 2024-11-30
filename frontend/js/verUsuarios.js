// Ejecutamos la función al cargar la página
window.addEventListener("load", async (event) => {
    event.preventDefault();

    const lista = await obtenerUsuarios("http://127.0.0.1:8000/usuarios/");
    rellenarTabla(lista);
});

/* Función obtenerUsuarios()
   ¿Qué hace? --> Hace una peticion a la bbdd de todos los usuarios que hay en ella
   Parámetros --> Url donde vamos a obtener los datos
   Devuelve --> Lista de usuarios o lista vacia
*/
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

/*  Función crear tabla
    ¿Qué hace? --> Obtiene el elemento(div) con el id "lista" que es el elemento que va a contener la tabla
                   Se crea la tabla con thead y tbody y con la cabecera configurada  */
function crearTabla() {
    // Obtenemos la lista
    let lista = document.getElementById("lista");
    // Creamos el elemento tabla y le asignamos su id y la clase ue va a tener
    let tabla = document.createElement("table");
    tabla.id = "listaUsuarios";
    tabla.classList.add("container-tabla");
    /* Creamos los elementos thead y tbody, éste ultimo con su id que lo usaremos 
    para rellenar filas en el método rellenarTabla()*/
    let tHead = document.createElement("thead");
    let tBody = document.createElement("tbody");
    tBody.id = "tBody";
    // Creamos la fila que va a ir en la cabecera junto a sus th que van a ser los titulos de cada columna
    let filaHead = document.createElement("tr");
    let nombre = document.createElement("th");
    nombre.innerHTML = "Nombre";
    let edad = document.createElement("th");
    edad.innerHTML = "Edad";
    let acciones = document.createElement("th");
    acciones.innerHTML = "Acciones";
    // Agregamos los elementos hijos a los elementos padres
    filaHead.append(nombre, edad, acciones);
    tHead.appendChild(filaHead);
    tabla.append(tHead, tBody);
    lista.appendChild(tabla);

}

/* Función rellenarTabla()
    ¿Que hace? --> Obtiene el elemento tbody de la tabla y por cada usuario que hay en el array de usuarios
                   va creando y añadiendo una fila con todos los datos del usuario junto a los botones de acciones */
function rellenarTabla(usuarios) {
    // Obtenemos el elemento tabla
    let tablaBody = document.getElementById("tBody");
    // Por cada usuario creamos una nueva fila en la tabla
    usuarios.forEach(usuario => {
        // Creamos el elemento(fila) que irá en la tabla
        let fila = document.createElement("tr");
        // Creamos el elemento(td) usuario
        let usuarioNombre = document.createElement("td");
        usuarioNombre.innerHTML = `${usuario.nombre}`;
        let usuarioEdad = document.createElement("td");
        usuarioEdad.innerHTML = `${usuario.edad}`;
        // Creamos el elemento(td) botones
        let botones = document.createElement("td");
        botones.classList.add("acciones");
        // Creamos los 3 botones (aniadir / ver / borrar) y le asignamos ids dinámicos
        let crearCarta = document.createElement("a");
        crearCarta.id = `${usuario.nombre}Carta`;
        crearCarta.innerHTML = `<i class="fa-solid fa-file"></i>`;
        crearCarta.title = "Crear carta";
        crearCarta.href = "../html/crearCarta.html";


        // Boton borrar usuario
        let borrarUsuario = document.createElement("button");
        borrarUsuario.id = `${usuario.nombre}Borrar`;
        borrarUsuario.innerHTML = `<i class="fa-solid fa-x"></i>`;
        borrarUsuario.title = "Borrar usuario";
        borrarUsuario.addEventListener("click", async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/usuarios/${usuario.id}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    alert(`Usuario ${usuario.nombre} eliminado con éxito`)
                    fila.remove();
                }

                return true; 
            } catch (error) {
                console.error("Error al borrar el elemento:", error);
                return false; 
            }
        });



        botones.append(crearCarta, borrarUsuario);
        // Añadimos al td botones los 3 botones aniadir,ver y borrar
        fila.append(usuarioNombre, usuarioEdad, botones);
        // Añadimos la nueva fila a la tabla
        tablaBody.appendChild(fila);
    });
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
// Llamamos a las funciones crearTabla() y rellenarTabla()
crearTabla();