export const validate = (userData) => {
    let errors = {
        email: '',
        password: ''
    };
    
  // Email validation
  if (!userData.email.trim()) {
    errors.email = 'El email no puede estar vacío';
  } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
    errors.email = 'Por favor, ingrese un email válido';
  } else if (userData.email.length > 35) {
    errors.email = 'El email no puede tener más de 35 caracteres';
  }
    
    // Password validation
    if (!userData.password.trim()) {
        errors.password = 'La contraseña no puede estar vacía';
      } else if (userData.password.length < 6) {
        errors.password = 'La contraseña debe tener al menos 6 caracteres';
      } else if (userData.password.length > 10) {
        errors.password = 'La contraseña no puede tener más de 10 caracteres';
      } else if (!/\d/.test(userData.password)) {
        errors.password = 'La contraseña debe contener al menos un número';
      }
    
    return errors;
};
