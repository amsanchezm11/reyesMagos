let juguetes = [];

// Ejecutamos la función al cargar la página
window.addEventListener("load", async (event) => {
    event.preventDefault();

    const listaUsuarios = await obtenerUsuarios("http://127.0.0.1:8000/usuarios/");
    const listaReyes = await obtenerJuguetes("http://127.0.0.1:8000/reyes_magos/");

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
async function obtenerJuguetes(url) {
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
        option.value = `${usuario.nombre}_${usuario.edad}_${usuario.id}`;
        option.innerHTML = `${usuario.nombre}`;
        select.appendChild(option);
    });
}

// Función de rellenar select de reyes
function rellenarOptionReyes(reyes) {
    let select = document.getElementById("selectorRey");

    reyes.forEach(rey => {
        let option = document.createElement("option");
        option.value = `${rey.nombre}_${rey.id}`;
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



// Función buscarJuguetes
document.getElementById("buscarJuguete").addEventListener("input", buscarJuguetes);
async function buscarJuguetes(event) {
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

        // Mostrar los resultados en la página
        //mostrarResultadosJuguetes(juguetes);
        mostrarResultadosJuguetes(juguetes, `${sentencia}`);
    } catch (error) {
        console.error("Error al buscar juguetes:", error);
        document.getElementById("resultadoJuguetes").innerHTML = "Error al buscar juguetes.";
    }
}


// Función mostrar los resultados de los juguetes con filtro
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

    // Crear una lista de resultados
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
       // botonAniadir.innerHTML = `<i class="fa-solid fa-plus"></i>`;
        //let icono = document.createElement("i");
        //icono.classList.add("fa-solid");
        //icono.classList.add("fa-plus");
        //icono.id = `aniadir${juguete.nombre}`;
        //icono.addEventListener("click",aniadirJuguete);
        //botonAniadir.appendChild(icono);
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

// Función aniadirJuguete
async function aniadirJuguete(event) {
    let nombreBoton = event.target.id;
    console.log(nombreBoton);
    let nombreJuguete = nombreBoton.replace('aniadir', '');
    // Añado los juguetes al array global
    let juguete = event.target.value;
    juguetes.push(parseInt(juguete));
    console.log(nombreJuguete);

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
            // Obtener los datos del juguete
            const juguete = await response.json();

            if (juguete && juguete.nombre && juguete.imagen) {
                // Crear el elemento para mostrar el juguete en el contenedor "juguetesPedidos"
                let contenedorPedidos = document.getElementById("juguetesPedidos");

                // Crear el div que contendrá el juguete
                let jugueteDiv = document.createElement("div");
                jugueteDiv.classList.add("juguete-pedido");

                // Crear la imagen del juguete
                let img = document.createElement("img");
                img.src = `../img/${juguete.imagen}`;
                img.classList.add("imagen-juguete");

                // Crear el nombre del juguete
                let nombre = document.createElement("p");
                nombre.innerHTML = juguete.nombre;

                let botonEliminar = document.createElement("button");
                botonEliminar.id = `eliminar${juguete.id}`;
                botonEliminar.classList.add("boton-eliminar");
                botonEliminar.innerHTML = `<i class="fa-solid fa-x"></i>`;
                botonEliminar.addEventListener("click", eliminarJuguete);

                // Agregar la imagen y el nombre al div
                jugueteDiv.append(img,nombre,botonEliminar);               

                // Agregar el div al contenedor de "juguetesPedidos"
                contenedorPedidos.appendChild(jugueteDiv);
            }
        }

    } catch (error) {
        console.error("Error al añadir el juguete:", error);
    }
}

// Función eliminar juguete
function eliminarJuguete(event) {
    console.log("Estoy en eliminar");
    // Buscamos el contenedor padre del botón
    let divJuguete = event.target.closest(".juguete-pedido"); 
    // Si existe lo borra
    if (divJuguete) {
        divJuguete.remove();
    }   
}



document.getElementById("crearCarta").addEventListener("click", async (event) => {
   
    event.preventDefault();
    console.log("Entrando en la funcion");
    // Si los inputs son correctos ingresamos el usuario en la BD
    debugger
    let usuarioSelect = document.getElementById("selectorUsu");
    let reySelect = document.getElementById("selectorRey");

    let usuarioValue = usuarioSelect.value;
    let datos = usuarioValue.split("_");
    let usuarioId = parseInt(datos[2]);

    let reyValue = reySelect.value;
    let datos2 = reyValue.split("_");
    let reyId = parseInt(datos2[1]);
    let juguetesCarta = juguetes;

    //const usuarioId = usuarioSelect.value; // Obtén el valor seleccionado
    //const reyId = reySelect.value; // Obtén el valor seleccionado  
    
        //let usuario = document.getElementById("selectorUsu").value;
        //let usuarioId = usuario.id;
        //let rey = document.getElementById("selectorRey").value;
        //let reyId = rey.id;
        console.log(juguetes);
        console.log(usuarioId);
        console.log(reyId);
        try {
            
            const response = await fetch("http://127.0.0.1:8000/cartas/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    //console.log(usuario.id, rey.id);
                    //usuarioId , reyId, juguetes

                        usuario_id: usuarioId,
                        rey_mago_id: reyId,
                        juguetes_ids: juguetesCarta
                        
                     
                })
            });
            alert("carta añadida");
            //window.location.href = "../html/listaVista.html";
            

        } catch (e) {
            alert('algo salio mal');
            console.error(e);
            //errorEntrando =true;
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