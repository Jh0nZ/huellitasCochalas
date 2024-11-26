import React from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useGetAdoptionRequestQuery } from "../features/api/adoptionRequestApi";
import { useParams } from "react-router-dom";

const Solicitudes = () => {
  const { pet_id } = useParams();
  const { data, error, isLoading } = useGetAdoptionRequestQuery(pet_id);

  if (isLoading) {
    return <Typography variant="h6" textAlign="center">Cargando solicitudes...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" textAlign="center" color="error">Error al cargar las solicitudes: {error.message}</Typography>;
  }

  console.log(data); 

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom textAlign="center" color="#645b6d">
        Solicitudes de Adopción
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {data?.adoption_requests?.length ? (
          data.adoption_requests.map((request) => (
            <Grid item key={request.id} xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={request.user.image} 
                  alt={`Imagen de ${request.user.name}`}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {request.user.name.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: {request.user.email}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    Solicita adoptar a: {request.pet.name.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Descripción de la mascota: {request.pet.description }
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography
            variant="h6"
            textAlign="center"
            color="textSecondary"
            sx={{ mt: 4 }}
          >
            No hay solicitudes disponibles.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Solicitudes;
