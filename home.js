// Cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarUsuarios();
    mostrarBienvenida();
});

// Función para mostrar mensaje de bienvenida
function mostrarBienvenida() {
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (!usuarioLogueado) {
        alert("No estás logueado. Redirigiendo al login.");
        window.location.href = 'login.html';
        return;
    }
    document.getElementById('mensajeBienvenida').textContent = `Bienvenido, ${usuarioLogueado.nombre}`;
}

// Función para mostrar usuarios registrados
function mostrarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const listaUsuarios = document.getElementById('listaUsuarios');
    listaUsuarios.innerHTML = ''; // Limpiar la lista

    usuarios.forEach((user, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <div>
                <strong>ID:</strong> ${user.id} | <strong>Nombre:</strong> ${user.nombre} | <strong>Edad:</strong> ${user.edad} | <strong>Correo:</strong> ${user.email}
            </div>
            <div>
                <button class="btn btn-info btn-sm me-2" onclick="verUsuario(${index})">Ver</button>
                <button class="btn btn-warning btn-sm me-2" onclick="editarUsuario(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${index})">Eliminar</button>
            </div>
        `;
        listaUsuarios.appendChild(li);
    });
}

// Función para agregar un nuevo usuario
function agregarUsuario() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const idNuevo = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1; // ID autoincremental
    const nombreNuevo = document.getElementById('nombreNuevo').value;
    const edadNueva = document.getElementById('edadNueva').value;
    const emailNuevo = document.getElementById('emailNuevo').value;

    if (!nombreNuevo || !edadNueva || !emailNuevo) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const nuevoUsuario = { id: idNuevo, nombre: nombreNuevo, edad: parseInt(edadNueva), email: emailNuevo };
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Actualizar sesión con el nuevo usuario
    localStorage.setItem('usuarioLogueado', JSON.stringify(nuevoUsuario));

    alert("Usuario agregado correctamente. Ahora estás logueado como el nuevo usuario.");
    mostrarUsuarios();
    mostrarBienvenida();

    document.getElementById('formNuevoUsuario').reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalNuevoUsuario'));
    modal.hide();
}

// Función para eliminar un usuario
function eliminarUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.splice(index, 1);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert("Usuario eliminado.");
    mostrarUsuarios();
}

// Función para ver detalles de un usuario
function verUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios[index];
    
    const detalleUsuario = document.getElementById('detalleUsuario');
    detalleUsuario.innerHTML = `
        <p><strong>ID:</strong> ${usuario.id}</p>
        <p><strong>Nombre:</strong> ${usuario.nombre}</p>
        <p><strong>Edad:</strong> ${usuario.edad}</p>
        <p><strong>Correo:</strong> ${usuario.email}</p>
    `;

    const modalVerUsuario = new bootstrap.Modal(document.getElementById('modalVerUsuario'));
    modalVerUsuario.show();
}

// Función para editar un usuario
function editarUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios[index];
    
    document.getElementById('nombreEditar').value = usuario.nombre;
    document.getElementById('edadEditar').value = usuario.edad;
    document.getElementById('emailEditar').value = usuario.email;

    // Guardar índice para actualizar más tarde
    document.getElementById('modalEditarUsuario').setAttribute('data-usuario-index', index);

    const modalEditarUsuario = new bootstrap.Modal(document.getElementById('modalEditarUsuario'));
    modalEditarUsuario.show();
}

// Función para guardar los cambios del usuario editado
function guardarCambiosUsuario() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const index = document.getElementById('modalEditarUsuario').getAttribute('data-usuario-index');
    const usuario = usuarios[index];

    usuario.nombre = document.getElementById('nombreEditar').value;
    usuario.edad = document.getElementById('edadEditar').value;
    usuario.email = document.getElementById('emailEditar').value;

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert("Usuario actualizado correctamente.");
    mostrarUsuarios();

    const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditarUsuario'));
    modal.hide();
}

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    alert("Sesión cerrada.");
    window.location.href = 'login.html';
}
