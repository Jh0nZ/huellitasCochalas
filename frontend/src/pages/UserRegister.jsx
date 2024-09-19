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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleRegister = () => {
    console.log("Formulario enviado:", formData);

    // Aquí se simula el registro exitoso
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setRegistrationSuccess(true);

      // Redirigir después de 4 segundos
      setTimeout(() => {
        navigate("/pets");
      }, 4000);
    }, 2000);
  };

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirige a la página de inicio de sesión
  };
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10, position: "relative" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Regístrate
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
              helperText={errors.first_name}
            />
            <TextField
              label="Apellidos*"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.last_name)}
              helperText={errors.last_name}
            />
            <TextField
              label="Email*"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.email)}
              helperText={errors.email}
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
              helperText={errors.password}
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
              helperText={errors.password_confirmation}
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
