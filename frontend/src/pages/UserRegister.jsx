import React, { useState } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  TextField,
  CircularProgress,
} from "@mui/material";


const UserRegister = () => {
  // Estados mínimos para evitar errores
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, ] = useState({});
  const [isLoading, ] = useState(false);
  
  const data = {}; // Simulación de datos para evitar errores

  // Función para manejar los cambios en los campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10, position: "relative" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Regístra a tu Mascota
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
              label="Nombre de la Mascota*"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.first_name)}
              helperText={errors.first_name}
            />
              <TextField
              label="Raza*"
              name="raza_name"
              value={formData.raza_name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.raza_name)}
              helperText={errors.raza_name}
            />
            
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Registrar
            </Button>
          </Box>
        )}

        <Button variant="text" color="primary" fullWidth sx={{ mt: 2 }}>
          ¿Ya tienes una cuenta? Inicia sesión
        </Button>
      </Box>
    </Container>
  );
};

export default UserRegister;
