import React, { useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  CardMedia,
  Typography,
  Card,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCheckUserQuery } from "../features/api/userApi";
import { PetSolicitudes } from "../Components";
import { backendUrl } from "../constants";

const calculateAge = (birthDate) => {
  const [year, month, day] = birthDate.split("-").map(Number);
  const birth = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

function UserProfile() {
  const navigate = useNavigate();
  const { data, isSuccess, error, isError, isFetching } = useCheckUserQuery();

  useEffect(() => {
    if (isSuccess) {
      console.log("User data", data);
    }
    if (isError) {
      console.error("Error:", error);
    }
  }, [data, isSuccess, error, isError]);

  if (isFetching) {
    return <Typography variant="h4" textAlign="center">Cargando...</Typography>;
  }

  if (isError) {
    return <Typography variant="h4" textAlign="center" color="error">Error al cargar la información</Typography>;
  }

  const userImage =
  data?.user?.images?.[0]?.path
    ? `${backendUrl}/storage/${data?.user?.images?.[0]?.path}`
    : "/hombre.jpeg";

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Grid
        container
        spacing={4}
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
      >
        {/* Foto de perfil */}
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: "center" }}>
          <CardMedia
      component="img"
      height="350"
      image={userImage}
      sx={{
        borderRadius: "50%",
        objectFit: "cover",
        border: "5px solid #e0e0e0",
      }}
      alt={data?.user?.name || "Usuario"}
    />

          </Box>
        </Grid>

        {/* Información personal */}
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              p: 3,
              backgroundColor: "#f7f5fa",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h4" color="#645b6d" gutterBottom>
              Información Personal
            </Typography>
            
            <Typography
              variant="h5"
              sx={{ mt: 2, fontWeight: "bold" ,mb: 1 }}
            >
              {data?.user?.name?.toUpperCase() || "Nombre no disponible"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Edad:</strong> {calculateAge(data?.user?.fecha_user || "2000-01-01")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Fecha de Nacimiento:</strong> {data?.user?.fecha_user || "Desconocida"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Teléfono:</strong> {data?.user?.phone|| "No disponible"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Email:</strong> {data?.user?.email || "No disponible"}
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Lista de mascotas registradas */}
      <Box sx={{ mt: 6 }}>
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          color="#645b6d"
        >
          Mascotas Registradas
        </Typography>

        <Grid container justifyContent="center">
          {data?.pets?.length ? (
            data.pets.map((pet) => <PetSolicitudes key={pet.id} pet={pet} />)
          ) : (
            <Typography
              variant="h6"
              textAlign="center"
              color="textSecondary"
              sx={{ mt: 4 }}
            >
              No hay mascotas registradas.
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

export default UserProfile;
