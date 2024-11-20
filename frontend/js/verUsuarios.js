class Usuario {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
        this.carta = [];
    }

}

let usuarios = [];
let pepe = new Usuario("pepe",12);
let juan = new Usuario("juan",14);
let borja = new Usuario("borja",12);
usuarios = [pepe,juan,borja];

// ELIMINAR LO DE ARRIBA CUANDO PODAMOS SACAR DATOS DE LA BBDD

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
function rellenarTabla() {
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
        let aniadirCarta = document.createElement("button");
        aniadirCarta.id = `${usuario.nombre}Aniadir`;
        aniadirCarta.innerHTML = `<i class="fa-solid fa-plus"></i>`;
        let verCarta = document.createElement("button");
        verCarta.id = `${usuario.nombre}Ver`;
        verCarta.innerHTML = `<i class="fa-solid fa-eye"></i>`;
        let borrarCarta = document.createElement("button");
        borrarCarta.id = `${usuario.nombre}Borrar`;
        borrarCarta.innerHTML = `<i class="fa-solid fa-minus"></i>`;
        botones.append(aniadirCarta, verCarta, borrarCarta);
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
    
    document.getElementById("reyes").title= `Faltan ${diasRestantes} días para reyes`;
}
// Llamamos a la función diasHastaReyes()
diasHastaReyes();
// Llamamos a las funciones crearTabla() y rellenarTabla()
crearTabla();
rellenarTabla();