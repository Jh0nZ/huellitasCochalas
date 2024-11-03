import React, {useEffect, useState} from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  useTheme,
  Box,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetPetByIdQuery } from "../features/api/petApi";

const Infopets = () => {
  const { pet_id } = useParams();
  const { data, isSuccess, error, isError, isFetching } =
    useGetPetByIdQuery(pet_id);

  useEffect(()=>{
    if (isSuccess) {
      console.log(data);
    }
    if (isError){
      console.log(error);
      
    }
  }, [data, error, isError, isSuccess])

  const theme = useTheme();
  const navigate = useNavigate();

  const handleAdoptaClick = () => {
    navigate("/adoption-request");
  };

  if (isFetching) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography>cargando...</Typography>
      </Box>
    );
  }
  if (isError) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography>{error.data.message}</Typography>
      </Box>
    );
  }

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
            alt={data.data.name}
            height="350"
            image={`http://localhost:8000/storage/${data.data.images[0].path}`}
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
              {data.data.name}
            </Typography>
            <Typography variant="body1" paragraph>
              {data.data.description}
            </Typography>

            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <PetsIcon sx={{ mr: 1 }} /> EDAD: {data.data.age}
            </Typography>

            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <PetsIcon sx={{ mr: 1 }} /> RAZA: {data.data.breed.name}
            </Typography>

            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <PetsIcon sx={{ mr: 1 }} /> TAMAÑO: {data.data.size.name}
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
