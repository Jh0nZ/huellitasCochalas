import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Button, useTheme} from "@mui/material";
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
    tamano:"Mediano",
    age: "2 años",
    breed: "Labrador",
    description: "Un labrador juguetón y amigable.",
    image:
      "https://dbw3zep4prcju.cloudfront.net/animal/acd97097-34c4-4744-9673-e950246cf19d/image/99c443fc-1a2c-4169-b06b-749f9f4224b8.jpeg?versionId=BItqJ3A.zZLibQ3FisNMtE4b0JhVUo7E&bust=1713489188&width=300",
  };

  return (
    <Grid container spacing={2}
    sx={{ mt: 9}}
    >
    
      <Grid item xs={10} sm={5} mx={10}>
        <Card>
          <CardMedia
            component="img"
            alt={pet.name}
            height="300"
            image={pet.image} 
            sx={{
              borderRadius:"10px",
            }}
          />
        </Card>
      </Grid>


      <Grid item xs={10} sm={5}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {pet.name} 
            </Typography>
            <Typography variant="body1" paragraph>
              {pet.description} 
            </Typography>
            <Typography variant="body1">
           <PetsIcon/>   EDAD: {pet.age} años 
            </Typography>
            <Typography variant="body1">
            <PetsIcon/>    RAZA: {pet.breed} 
            </Typography>
            <Typography variant="body1">
            <PetsIcon/>   TAMAÑO: {pet.tamano} 
            </Typography>
            <Typography variant="body1">
            <PetsIcon/>   SEXO: {pet.sexo} 
            </Typography>
            <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: theme.palette.primary.main,
            "&:hover": { backgroundColor: theme.palette.primary.dark },
           mt:4,
            mx: 15,
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
