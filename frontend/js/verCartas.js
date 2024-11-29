

// Ejecutamos la función al cargar la página
window.addEventListener("load", async (event) => {
    event.preventDefault();

    const listaUsuarios = await obtenerUsuarios("http://127.0.0.1:8000/usuarios/");
    //const listaCartas = await obtenerCartas("http://127.0.0.1:8000/cartas/");

    rellenarOptionUsuario(listaUsuarios);
    //completarTabla(listaCartas);
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

// Función obtener usuarios
async function obtenerCartas(url) {
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
    let select = document.getElementById("usuarioVerCarta");

    usuarios.forEach(usuario => {
        let option = document.createElement("option");
        option.value = `${usuario.id}`;
        option.innerHTML = `${usuario.nombre}`;
        select.appendChild(option);
    });

    select.addEventListener("change", async () => {

        let usuarioId = select.value;

        try {
            const response = await fetch(`http://127.0.0.1:8000/cartas/${usuarioId}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("cartas en completarTabla:", data);
            // Validar si la respuesta es un array
            if (data.result && Array.isArray(data.result)) {
                completarTabla(data.result);
            } else {
                console.error("data.result no es un array válido:", data.result);
                throw new Error("El formato de la respuesta no es correcto.");
            }
        } catch (error) {
            console.error("Error al obtener los resultados:", error);
            return []; // Retorna un array vacío en caso de error
        }
    });
}

async function obtenerRey(reyId) {
    try {
        // Hacer una solicitud para obtener los datos del rey mago
        const response = await fetch(`http://127.0.0.1:8000/reyes_magos/`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const resultados = await response.json(); // Procesar la respuesta en formato JSON
        console.log("Datos del Rey Mago:", resultados);

        // Retornar el nombre del rey mago
        //return resultado.nombre;
        const reyMago = resultados.find(rey => rey.id === reyId);
        return reyMago.nombre;

    } catch (error) {
        console.error("Error al obtener el Rey Mago:", error);
        return "Desconocido"; // Valor predeterminado en caso de error
    }
}



// Función rellenar select del usuarios

async function completarTabla(cartas) {

    //let select = document.getElementById("usuarioVerCarta");
    let tBody = document.getElementById("tBody");

    if (tBody.hasChildNodes()) {
        tBody.innerHTML = "";
    }

    for (let carta of cartas) {
        let fila = document.createElement("tr");
        fila.classList.add("obtener-lista");
        // Columna: ID de la carta
        let cartaNombre = document.createElement("td");
        cartaNombre.innerHTML = `Carta ${carta.id}`;

        // Columna: Nombre del Rey Mago
        let reyMago = document.createElement("td");
        reyMago.classList.add("nombreRey");
        let nombreRey = await obtenerRey(carta.rey_mago_id);
        reyMago.innerHTML = nombreRey;

        // Columna: Número de juguetes
        let numJuguetes = document.createElement("td");
        numJuguetes.innerHTML = carta.juguetes_ids.length;

        // Columna: Acciones
        let contenedorBotones = document.createElement("td");
        contenedorBotones.classList.add("contenedor-botones-carta");

        let borrarCarta = document.createElement("button");
        borrarCarta.innerHTML = "✖️";
        borrarCarta.id = `eliminar${carta.id}`;
        borrarCarta.addEventListener("click", async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/cartas/${carta.id}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                    
                } else {
                    alert(`Carta ${carta.id} eliminada con éxito`)
                    fila.remove();
                }

                console.log(`Elemento con ID ${id} eliminado correctamente.`);
                return true;
            } catch (error) {
                console.error("Error al borrar el elemento:", error);
                return false;
            }
        });

        let verCarta = document.createElement("button");
        verCarta.innerHTML = "🔍";
        verCarta.href = "#cartaAbajo";
        verCarta.id = `ver${carta.usuario_id}`;
        verCarta.addEventListener("click", obtenerUsuarioNombre);
        verCarta.addEventListener("click", obtenerNombreRey);
        verCarta.addEventListener("click", obtenerJuguetes);
        contenedorBotones.append(borrarCarta, verCarta);
        fila.append(cartaNombre, reyMago, numJuguetes, contenedorBotones);
        tBody.appendChild(fila);
    }
}

async function obtenerUsuarioNombre(event) {

    let elemento = event.target.id;
    let userId = elemento.replace("ver", "");
    let idUsuario = parseInt(userId);
    console.log(userId);
  
    try {
        const response = await fetch(`http://127.0.0.1:8000/usuarios/`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        let nombreUser = data.find(user => user.id === idUsuario).nombre; 
        let edadUser = data.find(user => user.id === idUsuario).edad; 
        let nombreCartaUser = document.getElementById("nombreCarta");
        nombreCartaUser.innerHTML = `${nombreUser}`;
        console.log("nombre usuario:", nombreUser);
        let edadCartaUser = document.getElementById("edadCarta");
        edadCartaUser.innerHTML = `${edadUser}`;

    } catch (error) {
        console.error("Error al obtener los resultados:", error);
        return []; // Retorna un array vacío en caso de error
    }
  
}

async function obtenerNombreRey(event) {

    let elemento = event.target;
    console.log(event.target);
   // let userId = elemento.replace("ver", "");
    //let idUsuario = parseInt(userId);
    //console.log(userId);
  
    let nombreRey = elemento.closest(".obtener-lista");
    let nodoNombreRey = nombreRey.querySelector(".nombreRey");

    console.log(nombreRey);
    console.log(nodoNombreRey);
    console.log();
    let nombreReyCarta = document.getElementById("reyCarta");
    nombreReyCarta.innerHTML = `${nodoNombreRey.textContent}`;
}

async function obtenerJuguetes(event) {
    
    let idUsuario = event.target.id;
    let userId = idUsuario.replace("ver", "");
    let id = parseInt(userId);
    try {
        const response = await fetch(`http://127.0.0.1:8000/cartas/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("cartas en completarTabla2:", data.result[0].juguetes_ids);
        // Validar si la respuesta es un array
        if (data.result && Array.isArray(data.result)) {

            let juguetes = data.result[0].juguetes_ids;
            let contenedorJuguetes = document.getElementById("juguetesPedidos");
            if (contenedorJuguetes.hasChildNodes) {
                contenedorJuguetes.innerHTML = "";
            }

            let tabla = document.createElement("table");
            contenedorJuguetes.appendChild(tabla);

            juguetes.forEach(juguete => {
                let fila = document.createElement("tr");
                fila.classList.add("fila-carta");
                let contenedorImg = document.createElement("td");
                let img = document.createElement("img");
                img.src = `../img/${juguete.imagen}`;
                img.classList.add("imagen-juguete");
                contenedorImg.appendChild(img);
                let contendorNombre = document.createElement("td");
                contendorNombre.innerHTML = `${juguete.nombre}`;
                fila.append(img,contendorNombre);
                tabla.appendChild(fila);
            });

        } else {
            console.error("data.result no es un array válido:", data.result);
            throw new Error("El formato de la respuesta no es correcto.");
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
    let lista = document.getElementById("listaCartas");
    // Creamos el elemento tabla y le asignamos su id y la clase ue va a tener
    let tabla = document.createElement("table");
    tabla.id = "tablaJuguetes";
    tabla.classList.add("container-tabla");
    /* Creamos los elementos thead y tbody, éste ultimo con su id que lo usaremos 
    para rellenar filas en el método rellenarTabla()*/
    let tHead = document.createElement("thead");
    let tBody = document.createElement("tbody");
    tBody.id = "tBody";
    // Creamos la fila que va a ir en la cabecera junto a sus th que van a ser los titulos de cada columna
    let filaHead = document.createElement("tr");
    let carta = document.createElement("th");
    carta.innerHTML = "Carta";
    let reyMago = document.createElement("th");
    reyMago.innerHTML = "Rey Mago";
    let cantidadJuguetes = document.createElement("th");
    cantidadJuguetes.innerHTML = "Cantidad juguetes";
    let acciones = document.createElement("th");
    acciones.innerHTML = "Acciones";
    // Agregamos los elementos hijos a los elementos padres
    filaHead.append(carta, reyMago, cantidadJuguetes, acciones);
    tHead.appendChild(filaHead);
    tabla.append(tHead, tBody);
    lista.appendChild(tabla);

}





// Función diasHastaReyes()
// ¿Qué hace? --> Te calcula los dias que faltan hasta el 6 de enero de 2025
function diasHastaReyes() {
    let hoy = new Date(); // Fecha actual
    let diaDeReyes = new Date(2025, 0, 6);
    let diferenciaMilisegundos = diaDeReyes - hoy;
    let diasRestantes = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));

    document.getElementById("reyes").title = `Faltan ${diasRestantes} días para reyes`;
}
// Llamamos a la función diasHastaReyes()
diasHastaReyes();
// Llamamos a las funciones crearTabla() y rellenarTabla()
crearTabla();
// Le ponemos un titulo informativo al boton ordenar
document.getElementById("botonOrdenar").title = "Ordenar tabla";