window.onload = function() {
    const users = [
        { name: 'Juan Pérez', lastPayment: '2023-07-15' },
        { name: 'Ana García', lastPayment: '2023-08-01' },
        { name: 'Carlos López', lastPayment: '2023-07-20' },
        { name: 'María Rodríguez', lastPayment: '2023-08-10' },
        { name: 'Pedro Sánchez', lastPayment: '2023-07-25' }
    ];

    renderUsers(users);
};

// Función para renderizar los usuarios
function renderUsers(users) {
    const usersInfo = document.getElementById('users-info');
    usersInfo.innerHTML = '';  // Limpiar el contenedor de usuarios antes de actualizar

    users.forEach((user, index) => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');

        // Calcular la fecha de vencimiento inicial
        const expirationDate = new Date(user.lastPayment);
        expirationDate.setMonth(expirationDate.getMonth() + 1);

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const expirationFormatted = expirationDate.toLocaleDateString('es-ES', options);

        userDiv.innerHTML = `
            <p><strong>${user.name}</strong></p>
            <label for="date-${index}">Último Pago:</label>
            <input type="date" id="date-${index}" value="${user.lastPayment}">
            <p id="expiration-${index}">Vence el: <strong>${expirationFormatted}</strong></p>
            <p id="alert-${index}" class="alert"></p>
            <button onclick="updatePaymentInfo(${index})">Actualizar Fecha de Pago</button>
        `;

        usersInfo.appendChild(userDiv);
    });
}

// Función para actualizar la fecha de vencimiento y mostrar alertas
function updatePaymentInfo(userIndex) {
    const today = new Date();

    // Obtener la nueva fecha seleccionada por el usuario
    const newPaymentDate = new Date(document.getElementById(`date-${userIndex}`).value);

    // Calcular la nueva fecha de vencimiento (1 mes después de la nueva fecha de pago)
    const newExpirationDate = new Date(newPaymentDate);
    newExpirationDate.setMonth(newExpirationDate.getMonth() + 1);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const expirationFormatted = newExpirationDate.toLocaleDateString('es-ES', options);

    // Actualizar la fecha de vencimiento en la página
    document.getElementById(`expiration-${userIndex}`).innerHTML = `Vence el: <strong>${expirationFormatted}</strong>`;

    // Verificar si el pago ha vencido
    const alertMessage = document.getElementById(`alert-${userIndex}`);
    if (today > newExpirationDate) {
        alertMessage.innerHTML = '¡Tu pago ha vencido!';
        alertMessage.style.color = 'red';
    } else {
        alertMessage.innerHTML = '';
    }
}

// Función para agregar un nuevo usuario
function addUser() {
    const name = document.getElementById('newUserName').value;
    const lastPayment = document.getElementById('newUserDate').value;

    // Verifica que los campos no estén vacíos
    if (name && lastPayment) {
        const newUser = { name: name, lastPayment: lastPayment };

        // Añadir el nuevo usuario a la lista
        const usersInfo = document.getElementById('users-info');
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');

        const expirationDate = new Date(lastPayment);
        expirationDate.setMonth(expirationDate.getMonth() + 1);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const expirationFormatted = expirationDate.toLocaleDateString('es-ES', options);

        const index = usersInfo.children.length;  // El índice será el número actual de usuarios

        userDiv.innerHTML = `
            <p><strong>${name}</strong></p>
            <label for="date-${index}">Último Pago:</label>
            <input type="date" id="date-${index}" value="${lastPayment}">
            <p id="expiration-${index}">Vence el: <strong>${expirationFormatted}</strong></p>
            <p id="alert-${index}" class="alert"></p>
            <button onclick="updatePaymentInfo(${index})">Actualizar Fecha de Pago</button>
        `;

        usersInfo.appendChild(userDiv);

        // Limpiar el formulario
        document.getElementById('newUserName').value = '';
        document.getElementById('newUserDate').value = '';
    } else {
        alert('Por favor, completa todos los campos antes de agregar un usuario.');
    }
}
