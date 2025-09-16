const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono");
const empresa = document.getElementById("empresa");
const clave1 = document.getElementById("password");
const clave2 = document.getElementById("confirmPassword");
const edad = document.getElementById("edad");
const form = document.getElementById('registroForm');
const terminosCheckbox = document.getElementById('terminos');

// Función para mostrar error al lado del campo
function mostrarError(campo, mensaje) {
    // Quitar error anterior si existe
    const errorAnterior = campo.parentNode.querySelector('.error-text');
    if (errorAnterior) {
        errorAnterior.remove();
    }

    if (mensaje) {
        // Agregar clase error al campo
        campo.classList.add("error");

        // Crear y mostrar mensaje
        const errorDiv = document.createElement('small');
        errorDiv.className = 'error-text';
        errorDiv.textContent = mensaje;
        campo.parentNode.appendChild(errorDiv);
    } else {
        // Quitar error
        campo.classList.remove("error");
    }
}

// Función para mostrar error en checkbox (estructura diferente)
function mostrarErrorCheckbox(checkboxElement, mensaje) {
    // Buscar el contenedor del checkbox
    const checkboxGroup = checkboxElement.closest('.checkbox-group');
    const errorAnterior = checkboxGroup.querySelector('.error-text');
    
    if (errorAnterior) {
        errorAnterior.remove();
    }

    if (mensaje) {
        checkboxElement.classList.add("error");
        const errorDiv = document.createElement('small');
        errorDiv.className = 'error-text';
        errorDiv.style.display = 'block';
        errorDiv.style.width = '100%';
        errorDiv.textContent = mensaje;
        checkboxGroup.appendChild(errorDiv);
    } else {
        checkboxElement.classList.remove("error");
    }
}

// Función para mostrar mensaje de éxito
function mostrarExito(mensaje) {
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;

    // Crear modal de éxito
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        max-width: 400px;
        text-align: center;
    `;

    modal.innerHTML = `
        <div style="color: #5a8756; font-size: 48px; margin-bottom: 20px;">✓</div>
        <h3 style="color: #333; margin-bottom: 15px; font-family: 'Oswald', sans-serif;">¡Registro Exitoso!</h3>
        <p style="color: #666; margin-bottom: 20px;">${mensaje}</p>
        <button onclick="this.closest('div').parentElement.remove()" style="
            background: linear-gradient(135deg, #5a8756, #00bd65);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            font-weight: bold;
        ">Aceptar</button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Auto cerrar después de 3 segundos
    setTimeout(() => {
        overlay.remove();
    }, 3000);
}

// Función para mostrar resumen de errores
function mostrarResumenErrores(errores) {
    // Eliminar resumen anterior si existe
    const resumenAnterior = document.querySelector('.errores-resumen');
    if (resumenAnterior) {
        resumenAnterior.remove();
    }

    if (errores.length > 0) {
        const resumenDiv = document.createElement('div');
        resumenDiv.className = 'errores-resumen';
        resumenDiv.style.cssText = `
            background: #ffe6e6;
            border: 2px solid #ff4444;
            border-radius: 10px;
            padding: 15px;
            margin: 20px 0;
            color: #cc0000;
        `;

        const titulo = document.createElement('strong');
        titulo.textContent = 'Por favor corrige los siguientes errores:';
        resumenDiv.appendChild(titulo);

        const lista = document.createElement('ul');
        lista.style.marginTop = '10px';
        errores.forEach(error => {
            const item = document.createElement('li');
            item.textContent = error;
            lista.appendChild(item);
        });

        resumenDiv.appendChild(lista);
        form.insertBefore(resumenDiv, form.firstChild);

        // Scroll al principio del formulario
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Validaciones en tiempo real
nombre.addEventListener('keyup', function () {
    if (nombre.value.trim() === "") {
        mostrarError(nombre, "El nombre es obligatorio");
    } else if (nombre.value.trim().length < 2) {
        mostrarError(nombre, "El nombre debe tener al menos 2 caracteres");
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre.value)) {
        mostrarError(nombre, "El nombre solo puede contener letras");
    } else {
        mostrarError(nombre, null);
    }
});

apellido.addEventListener('keyup', function () {
    if (apellido.value.trim() === "") {
        mostrarError(apellido, "El apellido es obligatorio");
    } else if (apellido.value.trim().length < 2) {
        mostrarError(apellido, "El apellido debe tener al menos 2 caracteres");
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido.value)) {
        mostrarError(apellido, "El apellido solo puede contener letras");
    } else {
        mostrarError(apellido, null);
    }
});

email.addEventListener('keyup', function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email.value.trim() === "") {
        mostrarError(email, "El email es obligatorio");
    } else if (!emailRegex.test(email.value)) {
        mostrarError(email, "Ingresa un email válido (ejemplo@dominio.com)");
    } else {
        mostrarError(email, null);
    }
});

telefono.addEventListener('keyup', function () {
    const telefonoLimpio = telefono.value.replace(/\D/g, '');
    
    if (telefono.value.length === 0) {
        mostrarError(telefono, "El teléfono es obligatorio");
    } else if (telefonoLimpio.length < 9) {
        mostrarError(telefono, "El teléfono debe tener al menos 9 dígitos");
    } else if (telefonoLimpio.length > 12) {
        mostrarError(telefono, "El teléfono no puede tener más de 12 dígitos");
    } else if (!/^\+?[\d\s-]+$/.test(telefono.value)) {
        mostrarError(telefono, "Formato de teléfono inválido");
    } else {
        mostrarError(telefono, null);
    }
});

clave1.addEventListener('keyup', function () {
    if (clave1.value === "") {
        mostrarError(clave1, "La contraseña es obligatoria");
    } else if (clave1.value.length < 8) {
        mostrarError(clave1, "Mínimo 8 caracteres");
    } else if (!/(?=.*[a-z])/.test(clave1.value)) {
        mostrarError(clave1, "Debe contener al menos una letra minúscula");
    } else if (!/(?=.*[A-Z])/.test(clave1.value)) {
        mostrarError(clave1, "Debe contener al menos una letra mayúscula");
    } else if (!/(?=.*\d)/.test(clave1.value)) {
        mostrarError(clave1, "Debe contener al menos un número");
    } else {
        mostrarError(clave1, null);
    }

    // Verificar confirmación si tiene contenido
    if (clave2.value !== "") {
        if (clave1.value !== clave2.value) {
            mostrarError(clave2, "Las contraseñas no coinciden");
        } else {
            mostrarError(clave2, null);
        }
    }
});

clave2.addEventListener('keyup', function () {
    if (clave2.value === "") {
        mostrarError(clave2, "Confirma tu contraseña");
    } else if (clave1.value !== clave2.value) {
        mostrarError(clave2, "Las contraseñas no coinciden");
    } else {
        mostrarError(clave2, null);
    }
});

edad.addEventListener('keyup', function () {
    const edadNum = parseInt(edad.value);
    
    if (edad.value === "") {
        mostrarError(edad, "La edad es obligatoria");
    } else if (isNaN(edadNum)) {
        mostrarError(edad, "Ingresa una edad válida");
    } else if (edadNum < 18) {
        mostrarError(edad, "Debes ser mayor de 18 años para registrarte");
    } else if (edadNum > 100) {
        mostrarError(edad, "Ingresa una edad válida");
    } else {
        mostrarError(edad, null);
    }
});

// Validación de términos y condiciones
terminosCheckbox.addEventListener('change', function() {
    if (!terminosCheckbox.checked) {
        mostrarErrorCheckbox(terminosCheckbox, "Debes aceptar los términos y condiciones");
    } else {
        mostrarErrorCheckbox(terminosCheckbox, null);
    }
});

// Validación completa de todos los campos
function validarFormulario() {
    let errores = [];
    let camposConError = [];

    // Validar nombre
    if (nombre.value.trim() === "") {
        mostrarError(nombre, "El nombre es obligatorio");
        errores.push("Nombre: campo obligatorio");
        camposConError.push(nombre);
    } else if (nombre.value.trim().length < 2) {
        mostrarError(nombre, "El nombre debe tener al menos 2 caracteres");
        errores.push("Nombre: mínimo 2 caracteres");
        camposConError.push(nombre);
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre.value)) {
        mostrarError(nombre, "El nombre solo puede contener letras");
        errores.push("Nombre: solo letras permitidas");
        camposConError.push(nombre);
    }

    // Validar apellido
    if (apellido.value.trim() === "") {
        mostrarError(apellido, "El apellido es obligatorio");
        errores.push("Apellido: campo obligatorio");
        camposConError.push(apellido);
    } else if (apellido.value.trim().length < 2) {
        mostrarError(apellido, "El apellido debe tener al menos 2 caracteres");
        errores.push("Apellido: mínimo 2 caracteres");
        camposConError.push(apellido);
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido.value)) {
        mostrarError(apellido, "El apellido solo puede contener letras");
        errores.push("Apellido: solo letras permitidas");
        camposConError.push(apellido);
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === "") {
        mostrarError(email, "El email es obligatorio");
        errores.push("Email: campo obligatorio");
        camposConError.push(email);
    } else if (!emailRegex.test(email.value)) {
        mostrarError(email, "Ingresa un email válido");
        errores.push("Email: formato inválido");
        camposConError.push(email);
    }

    // Validar teléfono
    const telefonoLimpio = telefono.value.replace(/\D/g, '');
    if (telefono.value.length === 0) {
        mostrarError(telefono, "El teléfono es obligatorio");
        errores.push("Teléfono: campo obligatorio");
        camposConError.push(telefono);
    } else if (telefonoLimpio.length < 9) {
        mostrarError(telefono, "El teléfono debe tener al menos 9 dígitos");
        errores.push("Teléfono: mínimo 9 dígitos");
        camposConError.push(telefono);
    }

    // Validar edad
    const edadNum = parseInt(edad.value);
    if (edad.value === "") {
        mostrarError(edad, "La edad es obligatoria");
        errores.push("Edad: campo obligatorio");
        camposConError.push(edad);
    } else if (isNaN(edadNum) || edadNum < 18) {
        mostrarError(edad, "Debes ser mayor de 18 años");
        errores.push("Edad: debe ser mayor de 18 años");
        camposConError.push(edad);
    }

    // Validar contraseña
    if (clave1.value === "") {
        mostrarError(clave1, "La contraseña es obligatoria");
        errores.push("Contraseña: campo obligatorio");
        camposConError.push(clave1);
    } else if (clave1.value.length < 8) {
        mostrarError(clave1, "La contraseña debe tener mínimo 8 caracteres");
        errores.push("Contraseña: mínimo 8 caracteres");
        camposConError.push(clave1);
    }

    // Validar confirmación de contraseña
    if (clave2.value === "") {
        mostrarError(clave2, "Confirma tu contraseña");
        errores.push("Confirmación de contraseña: campo obligatorio");
        camposConError.push(clave2);
    } else if (clave1.value !== clave2.value) {
        mostrarError(clave2, "Las contraseñas no coinciden");
        errores.push("Las contraseñas no coinciden");
        camposConError.push(clave2);
    }

    // Validar términos y condiciones
    if (!terminosCheckbox.checked) {
        mostrarErrorCheckbox(terminosCheckbox, "Debes aceptar los términos y condiciones");
        errores.push("Debes aceptar los términos y condiciones");
    }

    // Si hay errores, enfocar el primer campo con error
    if (camposConError.length > 0) {
        camposConError[0].focus();
    }

    return errores;
}

// Validación al enviar el formulario
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validar todos los campos
    const errores = validarFormulario();

    if (errores.length > 0) {
        // Mostrar resumen de errores
        mostrarResumenErrores(errores);
        return;
    }

    // Crear y guardar usuario
    const nuevoUsuario = {
        id: Date.now(),
        nombre: nombre.value.trim(),
        apellido: apellido.value.trim(),
        email: email.value.trim(),
        telefono: telefono.value.trim(),
        edad: parseInt(edad.value),
        empresa: empresa.value.trim(),
        password: clave1.value,
        newsletter: document.getElementById('newsletter').checked,
        fechaRegistro: new Date().toISOString()
    };

    // Obtener usuarios existentes del localStorage
    let usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];

    // Verificar si el email ya existe
    const emailExiste = usuariosRegistrados.find(user => user.email === nuevoUsuario.email);
    if (emailExiste) {
        mostrarError(email, "Este correo ya está registrado");
        mostrarResumenErrores(["El correo electrónico ya está registrado en el sistema"]);
        email.focus();
        return;
    }

    // Agregar el nuevo usuario al array
    usuariosRegistrados.push(nuevoUsuario);

    // Guardar en localStorage
    localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosRegistrados));

    console.log("Usuario guardado:", nuevoUsuario);
    console.log("Total de usuarios registrados:", usuariosRegistrados.length);

    // Eliminar resumen de errores si existe
    const resumenErrores = document.querySelector('.errores-resumen');
    if (resumenErrores) {
        resumenErrores.remove();
    }

    // Mostrar mensaje de éxito
    mostrarExito(`Usuario: ${nuevoUsuario.nombre} ${nuevoUsuario.apellido}<br>Email: ${nuevoUsuario.email}`);

    // Limpiar formulario
    form.reset();
    
    // Limpiar todos los estilos de error
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.error-text').forEach(el => el.remove());

    // Opcional: redirigir al login después de un delay
    setTimeout(() => {
        // window.location.href = 'login.html';
    }, 3500);
});

// Funciones de utilidad para debugging
function verUsuariosRegistrados() {
    const usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
    console.log("========================================");
    console.log("USUARIOS REGISTRADOS:", usuarios.length);
    console.log("========================================");
    console.table(usuarios);
    return usuarios;
}

function limpiarUsuarios() {
    if (confirm("¿Estás seguro de que quieres eliminar todos los usuarios?")) {
        localStorage.removeItem('usuariosRegistrados');
        console.log("✓ Todos los usuarios han sido eliminados");
    }
}

function buscarUsuarioPorEmail(email) {
    const usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
    const usuario = usuarios.find(u => u.email === email);
    if (usuario) {
        console.log("Usuario encontrado:", usuario);
    } else {
        console.log("No se encontró usuario con ese email");
    }
    return usuario;
}

// Hacer las funciones disponibles globalmente para testing
window.verUsuarios = verUsuariosRegistrados;
window.limpiarUsuarios = limpiarUsuarios;
window.buscarUsuario = buscarUsuarioPorEmail;