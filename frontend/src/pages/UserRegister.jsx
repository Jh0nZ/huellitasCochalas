import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  InputAdornment,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff, PhotoCamera } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/validaciones";
import { validarPassword } from "../utils/validaciones";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRegisterUserMutation } from "../features/api/userApi";

const UserRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [images, setImages] = useState([]);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    fecha_user:"",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [registerUser, { data, isSuccess, error, isError, isLoading }] =
    useRegisterUserMutation();
  
  useEffect(() => {
    if (isSuccess) {
      setFormData({
        first_name: "",
        last_name: "",
        phone: "",
        fecha_user:"",
        email: "",
        password: "",
        password_confirmation: "",
      });
      setErrors({});
      setSnackbarOpen(true);
    }
    if (isError) {
      console.log("error", error);
      if (error?.status === 422 && error.data?.errors) {
        setErrors(error.data.errors);
      }
    }
  }, [data, isSuccess, error, isError, isLoading]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    navigate("/pets");
  };



  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];

    files.forEach((file) => {
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/gif",
        "image/svg+xml",
      ];
      if (validTypes.includes(file.type) && newImages.length < 1) {
        newImages.push(file);
      }
    });

    setImages((prevImages) => [...prevImages, ...newImages]);

    if (newImages.length < files.length) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        images: "Solo se pueden seleccionar hasta 1 imágenes.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        images: "",
      }));
    }
  };

 

  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const isAdult = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age >= 18;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    if (name === "password") {
      const passwordError = validarPassword(value);
      setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
    }
    if (name === "password_confirmation") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password_confirmation:
          value !== formData.password ? "Las contraseñas no coinciden." : "",
      }));
    }
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 9) {
        setFormData({ ...formData, phone: value });

        if (value.length >= 8) {
            setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                phone: "El teléfono debe tener al menos 8 caracteres.",
            }));
        }
    }
};

  const validarNombre = (nombre) => {
    const regexCaracteresEspeciales = /[!@#$%^&*(),.?":{}|<>_-]/;
    const regex = /[1234567890]/; 

    if (!nombre) {
      return "El nombre es obligatorio.";
    }
    if (nombre.length < 3) {
      return "El nombre debe tener al menos 3 caracteres.";
    }
    if (regexCaracteresEspeciales.test(nombre)) {
      return "El nombre no puede contener caracteres especiales.";
    }if (regex.test(nombre)){
      return "El nombre no puede ser un número";

    }
    return "";
  };

  const validarApellido = (apellido) => {
    const regexCaracteresEspeciales = /[!@#$%^&*(),.?":{}|<>_-]/;
    const regex = /[1234567890]/; 

    if (!apellido) {
      return "El apellido es obligatorio.";
    }
    if (apellido.length < 3) {
      return "El apellido  debe tener al menos 3 caracteres.";
    }
    if (regexCaracteresEspeciales.test(apellido)) {
      return "El apellido  no puede contener caracteres especiales.";
    }if (regex.test(apellido)){
      return "El apellido  no puede ser un números";

    }
    return "";
  };

  const validateFields = () => {
    const newErrors = {};
    let hasError = false;

    const passwordError = validarPassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
      hasError = true;
    }
    
    if (!formData.phone) {
      newErrors.phone = "El teléfono es obligatorio";
      hasError = true;
    }

    if (formData.password_confirmation !== formData.password) {
      newErrors.password_confirmation = "Las contraseñas no coinciden.";
      hasError = true;
    }
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

     if (!formData.fecha_user) {
       newErrors.fecha_user = "La fecha de nacimiento es obligatoria.";
      hasError = true;
     }
    else if (!isAdult(formData.fecha_user)) {
       newErrors.fecha_user = "Debes ser mayor de 18 años.";
       hasError = true;
     }
   if (images.length === 0) {
       newErrors.images = "Debes subir al menos una foto.";
       hasError = true;
     }

    setErrors(newErrors);
    return !hasError;
  };


  

  const handleRegister = async () => {
    if (!validateFields()) return;
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
        images.forEach((image, index) => {
          formDataToSend.append(`images[${index}]`, image);
        }); 
    try {
      await registerUser(formDataToSend).unwrap();
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      
    }
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

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 12, position: "relative" }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          color="#645b6d"
        >
          REGISTRATE
        </Typography>

        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Nombre*"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.first_name)}
            helperText={
              errors.first_name && (
                <Typography color="error">{errors.first_name}</Typography>
              )
            }
          />
          <TextField
            label="Apellidos*"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.last_name)}
            helperText={
              errors.last_name && (
                <Typography color="error">{errors.last_name}</Typography>
              )
            }
          />
            <TextField
                            label="Teléfono*"
                            name="phone"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            fullWidth
                            margin="normal"
                            error={Boolean(errors.phone)}
                            helperText={errors.phone}
                            type="tel"
                        />
          { <TextField
            label="Fecha de Nacimiento"
            name="fecha_user"
            type="date"
            value={formData.fecha_user}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            error={Boolean(errors.fecha_user)}
            helperText={
              errors.fecha_user && (
                <Typography color="error">{errors.fecha_user}</Typography>
              )
            }
          />
           } 
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
              onChange={handleImageChange}
              hidden 
            />
          </Button>
<Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
  {images.length} imágenes seleccionadas.
</Typography>
{errors.images && (
  <Typography color="error" sx={{ mt: 1 }}>
    {errors.images}
  </Typography>
)}

            <List sx={{ mt: 2 }}>
              {images.map((image, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => handleImageRemove(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={URL.createObjectURL(image)} />
                  </ListItemAvatar>
                  <ListItemText primary={image.name} />
                </ListItem>
              ))}
            </List>
          <TextField
            label="Email*"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.email)}
            helperText={
              errors.email && (
                <Typography color="error">{errors.email}</Typography>
              )
            }
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
            helperText={
              errors.password && (
                <Typography color="error">{errors.password}</Typography>
              )
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
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
            helperText={
              errors.password_confirmation && (
                <Typography color="error">
                  {errors.password_confirmation}
                </Typography>
              )
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleToggleConfirmPasswordVisibility}
                    edge="end"
                  >
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
          open={snackbarOpen}
          message="Registrado correctamente"
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
        />
      </Box>
    </Container>
  );
};

export default UserRegister;
