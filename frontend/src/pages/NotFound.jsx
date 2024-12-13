import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <Box
        sx={{
          p: 3,
          border: "1px solid",
          borderRadius: 2,
          borderColor: "grey.300",
        }}
      >
        <Typography variant="h1" component="h1" color="error" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" component="p" gutterBottom>
          Página no encontrada
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Lo sentimos, la página que estás buscando no existe.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          Volver a la página principal
        </Button>
      </Box>
    </Container>
  );
}

export default NotFound;