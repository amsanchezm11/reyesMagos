
document.getElementById('imagen').addEventListener('change', function() {
    let label = document.querySelector('.input-file-label');
    let fileName = this.files[0] ? this.files[0].name : "Seleccionar imagen";
    label.textContent = fileName;
    label.classList.add("selected");
});