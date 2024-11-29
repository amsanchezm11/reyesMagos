// Array global donde se va a almacenar los juguetes(Aconsejado por el profesor)
let juguetes = [];

/*  Función obtenerUsuarios()
    ¿Qué hace? --> Al cargar la página obtiene la lista de usuarios y reyes de la bbdd y los almacena 
                   en los selects correspondiente del formulario
*/ 
window.addEventListener("load", async (event) => {
    event.preventDefault();

    const listaUsuarios = await obtenerUsuarios("http://127.0.0.1:8000/usuarios/");
    const listaReyes = await obtenerReyes("http://127.0.0.1:8000/reyes_magos/");

    rellenarOptionUsuario(listaUsuarios);
    rellenarOptionReyes(listaReyes);

});

/*  Función obtenerUsuarios()
    ¿Qué hace? --> Obtiene la lista de usuarios de la bbdd
    Parámetros --> Url de la API
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

/*  Función obtenerReyes()
    ¿Qué hace? --> Obtiene la lista de reyes de la bbdd
    Parámetros --> Url de la API
*/ 
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

        if (Array.isArray(data)) {
            return data;
        } else {
            throw new Error("El formato de la respuesta no es un array.");
        }
    } catch (error) {
        console.error("Error al obtener los resultados:", error);
        return []; 
    }
}

/*  Función rellenarOptionUsuario()
    ¿Qué hace? --> Por cada usuario en la lista proporcionada crea un option y lo añade al select correspondiente.
    Parámetros --> Lista de usuarios de la bbdd.
*/ 
function rellenarOptionUsuario(usuarios) {
    let select = document.getElementById("selectorUsu");

    usuarios.forEach(usuario => {
        let option = document.createElement("option");
        option.value = `${usuario.nombre}_${usuario.edad}_${usuario.id}`;
        option.innerHTML = `${usuario.nombre}`;
        select.appendChild(option);
    });
}


/*  Función rellenarOptionReyes()
    ¿Qué hace? --> Por cada rey en la lista proporcionada crea un option y lo añade al select correspondiente.
    Parámetros --> Lista de reyes de la bbdd.
*/ 
function rellenarOptionReyes(reyes) {
    let select = document.getElementById("selectorRey");

    reyes.forEach(rey => {
        let option = document.createElement("option");
        option.value = `${rey.nombre}_${rey.id}`;
        option.innerHTML = `${rey.nombre}`;
        select.appendChild(option);
    });
}

/*  Función mostrarUsuario()
    ¿Qué hace? --> Coge el valor elegido por el usuario lo divide(Nombre/edad) y lo muestra en un elemento con 
                   id "nombreCarta" y en otro elemento con id "edadCarta".
    Parámetros --> Valor del select que contiene el nombre del rey seleccionado por el usuario(event).
*/ 
document.getElementById("selectorUsu").addEventListener("change", mostrarUsuario);
function mostrarUsuario(event) {

    let usuario = event.target.value;
    let datos = usuario.split("_");
    document.getElementById("nombreCarta").innerHTML = datos[0];
    document.getElementById("edadCarta").innerHTML = parseInt(datos[1]);
}

/*  Función mostrarRey()
    ¿Qué hace? --> Coge el valor elegido por el usuario y lo muestra en un elemento con el id "reyCarta".
    Parámetros --> Valor del select que contiene el nombre del rey seleccionado por el usuario(event).
*/ 
document.getElementById("selectorRey").addEventListener("change", mostrarRey);
function mostrarRey(event) {

    let rey = event.target.value;
    document.getElementById("reyCarta").innerHTML = rey;
}

/* Función buscarJuguetes()
   ¿Qué hace? --> oma el valor ingresado por 
   el usuario, obtiene los juguetes de la bbdd que coinciden con ese valor, y muestra los resultados.
   Si no hay texto en el input search, limpia los resultados.
   Parámetros --> El valor que el usuario ha escrito en el formulario(event).
*/
document.getElementById("buscarJuguete").addEventListener("input", buscarJuguetes);
async function buscarJuguetes(event) {
    // Creamos una sentencia para muestre solo los que el usuario ha elegido
    const sentencia = event.target.value.trim();

    if (sentencia.length === 0) {
        document.getElementById("resultadoJuguetes").innerHTML = "";
        return;
    }

    try {

        const response = await fetch(`http://127.0.0.1:8000/juguetes?search=${encodeURIComponent(sentencia)}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const juguetes = await response.json();

        mostrarResultadosJuguetes(juguetes, `${sentencia}`);
    } catch (error) {
        console.error("Error al buscar juguetes:", error);
        document.getElementById("resultadoJuguetes").innerHTML = "Error al buscar juguetes.";
    }
}

/* Función mostrarResultadosJuguetes()
   ¿Qué hace? --> Muestra todos los juguetes según el valor del input tipo search
   Parámetros --> El array de juguetes que se obtiene de la bbdd(juguetes) y un filtro(opcional) que utiliza 
                  el contenido del input search para filtrar los resultados de los juguetes por su nombre. 
                  Si no se proporciona, el filtro estará vacío y no mostrará ningún juguete.
*/
function mostrarResultadosJuguetes(juguetes, filtro = '') {
    let contenedorResultados = document.getElementById("resultadoJuguetes");
    contenedorResultados.innerHTML = "";
    let tabla = document.createElement("table");
    tabla.classList.add("juguete");
    contenedorResultados.appendChild(tabla);

    // Filtramos los juguetes por el nombre
    let juguetesFiltrados = juguetes.filter(juguete =>
        juguete.nombre.toLowerCase().includes(filtro.toLowerCase())
    );

    if (juguetesFiltrados.length === 0) {
        contenedorResultados.innerHTML = "<p>No se encontraron juguetes.</p>";
        return;
    }

    juguetesFiltrados.forEach(juguete => {
        let img = document.createElement("img");
        img.src = `../img/${juguete.imagen}`;
        img.classList.add("imagen-juguete");
        let nombre = document.createElement("p");
        nombre.innerHTML = `${juguete.nombre}`;
        let botonAniadir = document.createElement("button");
        botonAniadir.id = `aniadir${juguete.nombre}`;
        botonAniadir.classList.add("boton-aniadir");
        botonAniadir.value = `${juguete.id}`;
        botonAniadir.innerHTML = "+";
        botonAniadir.addEventListener("click", aniadirJuguete);
        let fila = document.createElement("tr");
        let imgContenedor = document.createElement("td");
        imgContenedor.appendChild(img);
        let nombreContenedor = document.createElement("td");
        nombreContenedor.appendChild(nombre);
        let botonContenedor = document.createElement("td");
        botonContenedor.appendChild(botonAniadir);
        fila.append(imgContenedor, nombreContenedor, botonContenedor);
        tabla.appendChild(fila);
    });
}

/* Función eliminarJuguete()
¿Qué hace? --> Busca el juguete seleccionado en el formulario en la bbdd y muestra en la carta el juguete mediante DOM
               junto al boton de eliminar que eliminará el juguete(elemento) en el DOM en caso de ser pulsado
*/
async function aniadirJuguete(event) {
    let nombreBoton = event.target.id;
    let nombreJuguete = nombreBoton.replace('aniadir', '');
    // Añadimos los juguetes al array global
    let juguete = event.target.value;
    // Añadimos el juguete al array global de juguetes
    juguetes.push(parseInt(juguete));

    try {
        const response = await fetch(`http://127.0.0.1:8000/juguetes/${nombreJuguete}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const juguete = await response.json();

            if (juguete && juguete.nombre && juguete.imagen) {
                let contenedorPedidos = document.getElementById("juguetesPedidos");

                let jugueteDiv = document.createElement("div");
                jugueteDiv.classList.add("juguete-pedido");

                let img = document.createElement("img");
                img.src = `../img/${juguete.imagen}`;
                img.classList.add("imagen-juguete");

                let nombre = document.createElement("p");
                nombre.innerHTML = juguete.nombre;

                let botonEliminar = document.createElement("button");
                botonEliminar.id = `eliminar${juguete.id}`;
                botonEliminar.classList.add("boton-eliminar");
                botonEliminar.innerHTML = `<i class="fa-solid fa-x"></i>`;
                botonEliminar.addEventListener("click", eliminarJuguete);

                jugueteDiv.append(img, nombre, botonEliminar);
                contenedorPedidos.appendChild(jugueteDiv);
            }
        }

    } catch (error) {
        console.error("Error al añadir el juguete:", error);
    }
}

/* Función eliminarJuguete()
¿Qué hace? --> Busca el elemento que contiene el boton al que ha sido asignado y borra dicho elemento
*/
function eliminarJuguete(event) {
    console.log("Estoy en eliminar");
    // Buscamos el contenedor padre del botón
    let divJuguete = event.target.closest(".juguete-pedido");
    // Si existe lo borra
    if (divJuguete) {
        divJuguete.remove();
    }
}

/* Función crearCarta()
¿Qué hace? --> Almacena el nombre del usuario y el rey mago, los juguetes(objetos) en la tabla cartas de la bbdd
*/
document.getElementById("crearCarta").addEventListener("click", async (event) => {

    event.preventDefault();
    let usuarioSelect = document.getElementById("selectorUsu");
    let reySelect = document.getElementById("selectorRey");

    let usuarioValue = usuarioSelect.value;
    let datos = usuarioValue.split("_");
    let usuarioId = parseInt(datos[2]);

    let reyValue = reySelect.value;
    let datos2 = reyValue.split("_");
    let reyId = parseInt(datos2[1]);
    let juguetesCarta = juguetes;

    try {

        const response = await fetch("http://127.0.0.1:8000/cartas/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({          
                usuario_id: usuarioId,
                rey_mago_id: reyId,
                juguetes_ids: juguetesCarta

            })
        });
            alert("carta añadida");      
    } catch (e) {
        alert('algo salio mal');
        console.error(e);
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