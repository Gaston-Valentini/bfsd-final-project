export const validateField = (name, value, data) => {
    switch (name) {
        case "name":
            var regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(value);
            return regex ? true : "El nombre solo debe contener letras";
        case "surname":
            var regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(value);
            return regex ? true : "El apellido solo debe contener letras";
        case "email":
            var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            return regex ? true : "Escriba un formato de correo electrónico válido";
        case "password":
            var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
            return regex ? true : "La contraseña debe tener al menos 8 caracteres, una letra y un número";
        case "confirmPassword":
            return data.password === value ? true : "Las contraseñas no coinciden";
        default:
            return true;
    }
};
