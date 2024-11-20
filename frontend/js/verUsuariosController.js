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

// ELIMINAR LO DE ARRIBA

function crearTabla() {
    let lista = document.getElementById("lista");

    let tabla = document.createElement("table");
    tabla.id = "listaUsuarios";
    tabla.classList.add("container-tabla");

    let tHead = document.createElement("thead");
    let tBody = document.createElement("tbody");
    tBody.id = "tBody";
    let filaHead = document.createElement("tr");
    let nombre = document.createElement("th");
    nombre.innerHTML = "Nombre";
    let edad = document.createElement("th");
    edad.innerHTML = "Edad";
    let acciones = document.createElement("th");
    acciones.innerHTML = "Acciones";

    filaHead.append(nombre, edad, acciones);
    tHead.appendChild(filaHead);
    tabla.append(tHead, tBody);
    lista.appendChild(tabla);
}


// Función crearLista

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
        // Creamos los 3 botones (aniadir / ver / borrar) y le asignamos ids dinámicos
        let aniadirCarta = document.createElement("button");
        aniadirCarta.id = `${usuario.nombre}Aniadir`;
        aniadirCarta.innerHTML = "➕";
        let verCarta = document.createElement("button");
        verCarta.id = `${usuario.nombre}Ver`;
        verCarta.innerHTML = "👁️";
        let borrarCarta = document.createElement("button");
        borrarCarta.id = `${usuario.nombre}Borrar`;
        borrarCarta.innerHTML = "➖";
        botones.append(aniadirCarta, verCarta, borrarCarta);
        // Añadimos al td botones los 3 botones aniadir,ver y borrar
        fila.append(usuarioNombre, usuarioEdad, botones);
        // Añadimos la nueva fila a la tabla
        tablaBody.appendChild(fila);
    });
}


crearTabla();
rellenarTabla();
