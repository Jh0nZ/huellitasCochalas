import React, { useState } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff, PhotoCamera } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ImagePreview } from "../Components";
import { validateEmail } from "../utils/validaciones";
import { validarNombreApellido } from "../utils/validaciones";

const UserRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    pet_birthdate: ""
  });
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const isAdult = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  
  };
  

  const validarNombre = (nombre) => {
    const regexCaracteresEspeciales = /[!@#$%^&*(),.?":{}|<>_-]/;
  
    if (!nombre) {
      return "El nombre es obligatorio.";
    }
    if (nombre.length < 3) {
      return "El nombre debe tener al menos 3 caracteres.";
    }
    if (regexCaracteresEspeciales.test(nombre)) {
      return "El nombre no puede contener caracteres especiales.";
    }
    return ""; 
  };
  
  const validarApellido = (apellido) => {
    const regexCaracteresEspeciales = /[!@#$%^&*(),.?":{}|<>_-]/;
  
    if (!apellido) {
      return "El apellido es obligatorio.";
    }
    if (apellido.length < 3) {
      return "El apellido  debe tener al menos 3 caracteres.";
    }
    if (regexCaracteresEspeciales.test(apellido)) {
      return "El apellido  no puede contener caracteres especiales.";
    }
    return ""; 
  };
  
  const validateFields = () => {
    const newErrors = {};
    let hasError = false;
  
    const nombreError = validarNombre(formData.first_name);
    if (nombreError) {
      newErrors.first_name = nombreError;
      hasError = true;
    }
  
    const apellidoError = validarApellido(formData.last_name);
    if (apellidoError) {
      newErrors.last_name = apellidoError;
      hasError = true;
    }
   
    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = !formData.email
        ? "El correo electrónico es obligatorio."
        : "Ingrese un correo electrónico válido.";
      hasError = true;
    }
  
    
    if (!formData.pet_birthdate) {
      newErrors.pet_birthdate = "La fecha de nacimiento es obligatoria.";
      hasError = true;
    } else if (!isAdult(formData.pet_birthdate)) {
      newErrors.pet_birthdate = "Debes ser mayor de 18 años.";
      hasError = true;
    }
  
    
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria.";
      hasError = true;
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "La contraseña debe tener al menos una letra mayúscula.";
      hasError = true;
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = "La contraseña debe tener al menos una letra minúscula.";
      hasError = true;
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = "La contraseña debe tener al menos un número.";
      hasError = true;
    } else if (!/[!@#$%^&*()_+{}\[\]:;"'<>,.?/|\\~`-]/.test(formData.password)) {
      newErrors.password = "La contraseña debe tener al menos un carácter especial.";
      hasError = true;
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres.";
      hasError = true;
    }
  
    
    if (formData.password_confirmation !== formData.password) {
      newErrors.password_confirmation = "Las contraseñas no coinciden.";
      hasError = true;
    }
  
    setErrors(newErrors);
    return !hasError;
  };

  const handleRegister = () => {
    if (!validateFields()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setRegistrationSuccess(true);
      setTimeout(() => {
        navigate("/pets");
      }, 4000);
    }, 2000);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10, position: "relative" }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="#645b6d">
          REGISTRATE
        </Typography>

        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Nombre*"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.first_name)}
              helperText={errors.first_name && <Typography color="error">{errors.first_name}</Typography>}
            />
            <TextField
              label="Apellidos*"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.last_name)}
              helperText={errors.last_name && <Typography color="error">{errors.last_name}</Typography>}
            />
           <TextField
              label="Fecha de Nacimiento"
              name="pet_birthdate"
              type="date"
              value={formData.pet_birthdate}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              error={Boolean(errors.pet_birthdate)}
              helperText={
                errors.pet_birthdate && (
                  <Typography color="error">{errors.pet_birthdate}</Typography>
                )
              }
            />
            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCamera />}
              fullWidth
              sx={{ mt: 2 }}
            >
              Sube una foto para su perfil
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleImageChange}
              />
            </Button>
            <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
              {images.map((image, index) => (
                <ImagePreview
                  key={index}
                  image={URL.createObjectURL(image)}
                  onRemove={() => handleRemoveImage(index)}
                />
              ))}
            </Box>
            <TextField
              label="Email*"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.email)}
              helperText={errors.email && <Typography color="error">{errors.email}</Typography>}
            />
           <TextField
            label="Contraseña*"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.password)}
            helperText={errors.password && <Typography color="error">{errors.password}</Typography>}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirmar Contraseña*"
            name="password_confirmation"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.password_confirmation}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.password_confirmation)}
            helperText={errors.password_confirmation && (
              <Typography color="error">{errors.password_confirmation}</Typography>
            )}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleToggleConfirmPasswordVisibility} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleRegister}
            >
              Registrar
            </Button>
          </Box>
        )}

        <Button
          variant="text"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLoginRedirect}
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </Button>

        <Snackbar
          open={registrationSuccess}
          message="Registrado correctamente"
          autoHideDuration={4000}
        />
      </Box>
    </Container>
  );
};

export default UserRegister;
