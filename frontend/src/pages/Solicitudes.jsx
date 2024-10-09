import React from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const usersData = [
  {
    id: 1,
    name: "Juan Pérez",
    age: 28,
    occupation: "Veterinario",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    description: "Un veterinario apasionado por el bienestar animal.",
  },
  {
    id: 2,
    name: "Laura Martínez",
    age: 34,
    occupation: "Cuidadora de mascotas",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    description: "Experta en el cuidado de mascotas con 10 años de experiencia.",
  },
  {
    id: 3,
    name: "Carlos Gómez",
    age: 30,
    occupation: "Entrenador de perros",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
    description: "Entrenador especializado en obediencia y comportamiento canino.",
  },
  {
    id: 4,
    name: "María López",
    age: 26,
    occupation: "Voluntaria en refugio",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    description: "Dedicada a ayudar a los animales sin hogar.",
  },
];

const Solicitudes = () => {
  const navigate = useNavigate();

  const handleProfileClick = (userId) => {
    navigate('/perfil');  // Cambia a la ruta correspondiente al perfil del usuario
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom textAlign="center" color="#645b6d">
        Solicitudes de Adopción
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {usersData.map((user) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
            <Card sx={{ borderRadius: '10px', height: '100%', textAlign: 'center' }}>
              <CardMedia
                component="img"
                height="200"
                image={user.image}
                alt={user.name}
                sx={{ borderRadius: '50%', width: 100, height: 100, margin: 'auto', mt: 2 }}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.occupation} - {user.age} años
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {user.description}
                </Typography>
                <Box sx={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    onClick={() => handleProfileClick(user.id)} // Llama a la función con el id del usuario
                    sx={{
                      backgroundColor: "#645b6d",
                      "&:hover": { backgroundColor: "#4a3f54" },
                      mt: 2,
                    }}
                  >
                    Ver Perfil
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Solicitudes;
