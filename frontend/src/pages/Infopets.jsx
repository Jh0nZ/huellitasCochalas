import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Button, useTheme } from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';
import { useNavigate } from "react-router-dom";

const Infopets = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleAdoptaClick = () => {
    navigate("/adoption-request"); 
  };

  const pet = {
    id: 1,
    name: "Fido",
    sexo: "Macho",
    tamano: "Mediano",
    age: "2 años",
    breed: "Labrador",
    description: "Un labrador juguetón y amigable.",
    image:
      "https://dbw3zep4prcju.cloudfront.net/animal/acd97097-34c4-4744-9673-e950246cf19d/image/99c443fc-1a2c-4169-b06b-749f9f4224b8.jpeg?versionId=BItqJ3A.zZLibQ3FisNMtE4b0JhVUo7E&bust=1713489188&width=300",
  };

  return (
    <Grid 
      container 
      spacing={4} 
      alignItems="center"
      justifyContent="center" 
      sx={{ mt: { xs: 4, md: 9 }, px: { xs: 2, sm: 10 }, gap: 3 }}
    >
      {/* Imagen de la mascota */}
      <Grid item xs={12} sm={6} md={5}>
        <Card sx={{ boxShadow: 3 }}>
          <CardMedia
            component="img"
            alt={pet.name}
            height="350"
            image={pet.image}
            sx={{
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
        </Card>
      </Grid>

      {/* Información de la mascota */}
      <Grid item xs={12} sm={6} md={5}>
        <Card sx={{ boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {pet.name}
            </Typography>
            <Typography variant="body1" paragraph>
              {pet.description}
            </Typography>

            <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <PetsIcon sx={{ mr: 1 }} /> EDAD: {pet.age}
            </Typography>

            <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <PetsIcon sx={{ mr: 1 }} /> RAZA: {pet.breed}
            </Typography>

            <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <PetsIcon sx={{ mr: 1 }} /> TAMAÑO: {pet.tamano}
            </Typography>

            <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
              <PetsIcon sx={{ mr: 1 }} /> SEXO: {pet.sexo}
            </Typography>

            {/* Botón de Adopción */}
            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{
                backgroundColor: theme.palette.primary.main,
                "&:hover": { backgroundColor: theme.palette.primary.dark },
                mt: 4,
                py: 1.5,
              }}
              onClick={handleAdoptaClick}
            >
              ADOPTAR
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Infopets;
