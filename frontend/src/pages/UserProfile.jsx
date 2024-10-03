import React from 'react';
import { Container, Grid, Box, Avatar, Typography, Card, CardContent, CardMedia } from '@mui/material';

const petsData = [
  {
    id: 1,
    name: "Fido",
    sexo: "Macho",
    tamano: "Mediano",
    age: "2 años",
    breed: "Labrador",
    description: "Un labrador juguetón y amigable.",
    image: "https://dbw3zep4prcju.cloudfront.net/animal/acd97097-34c4-4744-9673-e950246cf19d/image/99c443fc-1a2c-4169-b06b-749f9f4224b8.jpeg?versionId=BItqJ3A.zZLibQ3FisNMtE4b0JhVUo7E&bust=1713489188&width=300",
  },
  {
    id: 2,
    name: "Whiskers",
    tamano: "Grande",
    sexo: "Hembra",
    age: "1 año",
    breed: "Gato doméstico",
    description: "Un gato cariñoso que ama estar en el regazo.",
    image: "https://dbw3zep4prcju.cloudfront.net/animal/8cc8db34-a8df-48cf-b439-370e9a9cbe20/image/de091e8b-f283-4558-a262-3968b8d39807.jpg?versionId=wjtsPGgRvcAHeoJxsYzCDB3ib0yX6Hsc&bust=1726751715&width=300",
  },
 
];

function UserProfile() {
  const user = {
    name: "Juan Pérez",
    age: 30,
    birthDate: "1994-05-20",
    email: "juan.perez@gmail.com",
    profilePicture: "/images/hombre.jpeg",
    pets: petsData, 
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Grid container spacing={4} direction="column" alignItems="center" sx={{ mt: 4 }}>
        {/* Foto y nombre del usuario */}
        <Grid item xs={12}>
          <Box sx={{ textAlign: 'center' }}>
            <Avatar
              alt={user.name}
              src={user.profilePicture}
              sx={{ width: 150, height: 150, mx: 'auto' }}
            />
            <Typography variant="h5" sx={{ mt: 2 }}>
              {user.name}
            </Typography>
          </Box>
        </Grid>

        {/* Información del usuario */}
        <Grid item xs={12}>
          <Box sx={{ textAlign: 'center' }}>
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

        {/* Lista de mascotas registradas */}
        <Grid item xs={12}>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom textAlign="center" color="#645b6d">
              Mascotas Registradas
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {user.pets.map((pet) => (
                <Grid item xs={12} sm={6} md={4} key={pet.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={pet.image} // Cambia a pet.image
                      alt={pet.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div" textAlign="center">
                        {pet.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" textAlign="center">
                        {pet.breed} - {pet.sexo} - {pet.tamano} - {pet.age}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" textAlign="center">
                        {pet.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserProfile;
