function RegistroUsuario() {
    const user = {
        id: document.getElementById('id').value,
        edad: document.getElementById('edad').value,
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        contraseña: document.getElementById('contraseña').value,
    };

    if (!user.id || !user.edad || !user.nombre || !user.email || !user.contraseña) {
        alert("Todos los campos son obligatorios");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(user);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert("Usuario registrado correctamente.");
    window.location.href = 'index.html';
}
