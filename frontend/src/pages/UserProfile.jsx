import React, { useEffect } from "react";
import {
  Container,
  Grid2 as Grid,
  Box,
  Avatar,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import { useCheckUserQuery } from "../features/api/userApi";
import { PetCard } from "../Components";

const calculateAge = (birthDate) => {
  const [month, day, year] = birthDate.split('-').map(Number);
  const birth = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const petsData = [
  {
    id: 1,
    name: "Fido",
    sexo: "Macho",
    tamano: "Mediano",
    age: "2 años",
    breed: "Labrador",
    image:
      "https://dbw3zep4prcju.cloudfront.net/animal/acd97097-34c4-4744-9673-e950246cf19d/image/99c443fc-1a2c-4169-b06b-749f9f4224b8.jpeg?versionId=BItqJ3A.zZLibQ3FisNMtE4b0JhVUo7E&bust=1713489188&width=300",
  },
  {
    id: 2,
    name: "Whiskers",
    tamano: "Grande",
    sexo: "Hembra",
    age: "1 año",
    breed: "Gato doméstico",
    image:
      "https://dbw3zep4prcju.cloudfront.net/animal/8cc8db34-a8df-48cf-b439-370e9a9cbe20/image/de091e8b-f283-4558-a262-3968b8d39807.jpg?versionId=wjtsPGgRvcAHeoJxsYzCDB3ib0yX6Hsc&bust=1726751715&width=300",
  },
];

function UserProfile() {
  const navigate = useNavigate();
  const { data, isSuccess, error, isError, isFetching } = useCheckUserQuery();
  useEffect(() => {
    if (isSuccess) {
      console.log("User data", data);
    }
    if (isError) {
      console.log("Error", error);
    }
  }, [data, isSuccess, error, isError]);

  // Función para manejar la redirección al hacer clic en el botón
  const handleSolicitudesClick = () => {
    navigate("/solicitudes"); // Redirige a la ruta '/solicitudes'
  };

  const user = {
    name: "JUAN PEREZ",
    age: 30,
    birthDate: "1994-05-20",
    email: "juan.perez@gmail.com",
    profilePicture: "/images/hombre.jpeg",
    pets: petsData,
  };

  if (isFetching) {
    return <Typography variant="h4">Cargando...</Typography>;
  }

  if (isError) {
    return <Typography variant="h4">Error al cargar la información</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Grid
        container
        spacing={3}
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        sx={{ mt: 4 }}
      >
        {/* Foto de perfil en el lado izquierdo */}
        <Grid item xs={12} md={3}>
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Avatar
              alt={data.user.name}
              sx={{
                width: { xs: 200, sm: 200 }, // Ajuste del tamaño del avatar
                height: { xs: 200, sm: 200 },
                mx: { xs: "auto", md: 0 },
              }}
            >
            <PersonIcon sx={{ fontSize: 100 }} />
            </Avatar>
            <Typography
              variant="h5"
              sx={{ mt: 2, textAlign: { xs: "center", md: "left" } }}
            >
              {data.user.name}
            </Typography>
          </Box>
        </Grid>

        {/* Información del usuario en el lado derecho */}
        <Grid item xs={12} md={8}>
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography variant="h4" gutterBottom color="#645b6d">
              Información del Usuario
            </Typography>
            <Typography variant="body1">
              <strong>Edad:</strong> {calculateAge(data.user.fecha_user)}
            </Typography>
            <Typography variant="body1">
              <strong>Fecha de Nacimiento:</strong> {data.user.fecha_user}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {data.user.email}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Lista de mascotas registradas */}
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          color="#645b6d"
        >
          Mascotas Registradas
        </Typography>

        <Grid container spacing={6} justifyContent="center">
          {data.pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default UserProfile;
