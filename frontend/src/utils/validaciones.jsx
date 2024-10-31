export const validarPassword = (contraseña) => {
  if (!contraseña) {
    return "La contraseña es obligatoria.";
  }
  if (contraseña.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }
  if (!/[a-z]/.test(contraseña)) {
    return "La contraseña debe contener al menos una letra minúscula.";
  }
  if (!/[A-Z]/.test(contraseña)) {
    return "La contraseña debe contener al menos una letra mayúscula.";
  }
  if (!/\d/.test(contraseña)) {
    return "La contraseña debe contener al menos un número.";
  }
  if (!/[!@#$%^&*()_+{}\[\]:;"'<>,.?/|\\~`-]/.test(contraseña)) {
    return "La contraseña debe contener al menos un carácter especial.";
  }
  
};

  
 

  export const validarEmailDocente = (email) => {
    const regexDocente = /^[a-zA-Z0-9._%+-]+@fcyt\.umss\.edu\.bo$/;
    return regexDocente.test(email);
  };
  
  export const validarEmailEstudiante = (email) => {
    const regexEstudiante = /^[0-9]{9}@est\.umss\.edu$/;
    return regexEstudiante.test(email);
  };
  
  export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };