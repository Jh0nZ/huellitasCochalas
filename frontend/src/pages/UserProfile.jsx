import React from 'react';
import { Container, Grid, Box, Avatar, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

const petsData = [
  {
    id: 1,
    name: "Fido",
    sexo: "Macho",
    tamano: "Mediano",
    age: "2 años",
    breed: "Labrador",
    image: "https://dbw3zep4prcju.cloudfront.net/animal/acd97097-34c4-4744-9673-e950246cf19d/image/99c443fc-1a2c-4169-b06b-749f9f4224b8.jpeg?versionId=BItqJ3A.zZLibQ3FisNMtE4b0JhVUo7E&bust=1713489188&width=300",
  },
  {
    id: 2,
    name: "Whiskers",
    tamano: "Grande",
    sexo: "Hembra",
    age: "1 año",
    breed: "Gato doméstico",
    image: "https://dbw3zep4prcju.cloudfront.net/animal/8cc8db34-a8df-48cf-b439-370e9a9cbe20/image/de091e8b-f283-4558-a262-3968b8d39807.jpg?versionId=wjtsPGgRvcAHeoJxsYzCDB3ib0yX6Hsc&bust=1726751715&width=300",
  },
];

function UserProfile() {
  const navigate = useNavigate();

  // Función para manejar la redirección al hacer clic en el botón
  const handleSolicitudesClick = () => {
    navigate('/solicitudes'); // Redirige a la ruta '/solicitudes'
  };

  const user = {
    name: "JUAN PEREZ",
    age: 30,
    birthDate: "1994-05-20",
    email: "juan.perez@gmail.com",
    profilePicture: "/images/hombre.jpeg",
    pets: petsData,
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Grid container spacing={3} direction={{ xs: 'column', md: 'row' }} alignItems="center" sx={{ mt: 4 }}>
        {/* Foto de perfil en el lado izquierdo */}
        <Grid item xs={12} md={3}>
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Avatar
              alt={user.name}
              src={user.profilePicture}
              sx={{
                width: { xs: 200, sm: 200 }, // Ajuste del tamaño del avatar
                height: { xs: 200, sm: 200 },
                mx: { xs: 'auto', md: 0 },
              }}
            />
            <Typography variant="h5" sx={{ mt: 2, textAlign: { xs: 'center', md: 'left' } }}>
              {user.name}
            </Typography>
          </Box>
        </Grid>

        {/* Información del usuario en el lado derecho */}
        <Grid item xs={12} md={8}>
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h4" gutterBottom color="#645b6d">
              Información del Usuario
            </Typography>
            <Typography variant="body1">
              <strong>Edad:</strong> {user.age}
            </Typography>
            <Typography variant="body1">
              <strong>Fecha de Nacimiento:</strong> {user.birthDate}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {user.email}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Lista de mascotas registradas */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center" color="#645b6d">
          Mascotas Registradas
        </Typography>

        <Grid container spacing={6} justifyContent="center">
          {user.pets.map((pet) => (
            <Grid item xs={12} sm={6} md={3} key={pet.id}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={pet.image}
                  alt={pet.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div" textAlign="center">
                    {pet.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    {pet.breed} - {pet.sexo} - {pet.tamano} - {pet.age}
                  </Typography>

                  {/* Botón centrado dentro del Card */}
                  <Box textAlign="center" sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={handleSolicitudesClick} // Redirige cuando se haga clic
                      sx={{
                        backgroundColor: "#645b6d",
                        "&:hover": {
                          backgroundColor: "#4a3f54",
                        },
                      }}
                    >
                      Solicitudes
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default UserProfile;
