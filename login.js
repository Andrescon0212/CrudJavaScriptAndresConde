function acceso() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuario = usuarios.find(user => user.email === email && user.contraseña === password);

    if (usuario) {
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
        alert("Bienvenido");
        window.location.href = 'home.html';
    } else {
        alert("Usuario o contraseña inválidos");
    }
}
