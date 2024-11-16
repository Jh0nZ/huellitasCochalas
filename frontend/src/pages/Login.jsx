import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { validateEmail } from "../utils/validaciones";
import { useLoginUserMutation } from "../features/api/userApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loginUser, { data, error, isLoading, isSuccess, isError }] =
    useLoginUserMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log("User login", data);
      localStorage.setItem("user", JSON.stringify(data.user));
      setErrors({});
      navigate("/pets");
    }
    if (isError) {
      console.log("error", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error.data.message
      }));
    }
  }, [data, isSuccess, isError, error]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (isSuccess) {
      setErrors({});
      console.log("logeado supuestamente", data);
      navigate("/pets");
    }

    if (isError) {
      console.log("error", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error.data.message,
      }));
    }
  }, [isSuccess, isError]);

  const handleLogin = (event) => {
    event.preventDefault();

    // Validaciones
    const newErrors = {};
    let hasError = false;

    if (!email || !validateEmail(email)) {
      newErrors.email = !email
        ? "El correo electrónico es obligatorio."
        : "Ingrese un correo electrónico válido.";
      hasError = true;
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria.";
      hasError = true;
    }

    // Si hay errores, establecerlos y no enviar la solicitud
    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Si no hay errores, enviar los datos
    const formData = { email: email, password: password };

    console.log("formdata", formData);
    loginUser(formData);
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    if (field === "email") {
      setEmail(value);
    } else if (field === "password") {
      setPassword(value);
    }

    setErrors({
      ...errors,
      [field]: "",
      general: "",
    });
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
          <Typography variant="h4" component="h1" gutterBottom align="center" color="#645b6d">
         Iniciar sesión
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleChange("email")}
            error={!!errors.email}
            helperText={errors.email}
            disabled={isLoading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleChange("password")}
            error={!!errors.password}
            helperText={errors.password}
            disabled={isLoading}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          {errors.general && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errors.general}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading || errors.general}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Iniciar Sesión"
            )}
          </Button>

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="text"
              color="primary"
              fullWidth
              onClick={handleRegisterRedirect}
              disabled={isLoading}
            >
              ¿No tienes una cuenta? Regístrate
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
