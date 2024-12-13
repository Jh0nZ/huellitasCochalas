import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useGetAllAdoptionRequestsQuery } from "../features/api/adoptionRequestApi";
import { useParams } from "react-router-dom";
import { backendUrl } from "../constants";

const Solicitudes = () => {
  const { pet_id } = useParams();
  const { data, error, isLoading } = useGetAllAdoptionRequestsQuery(pet_id);
  const theme = useTheme();

  if (isLoading) {
    return (
      <Typography variant="h6" textAlign="center" sx={{ mt: 4 }}>
        Cargando solicitudes...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" textAlign="center" color="error" sx={{ mt: 4 }}>
        Error al cargar las solicitudes: {error.message}
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
        <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    align="center"
                    color="#645b6d"
                >
                    SOLICITUDES DE ADOPCIÓN
                </Typography>

      <Grid container spacing={4} justifyContent="center">
        {data?.adoption_requests?.length ? (
          data.adoption_requests.map((request) => (
            <Grid item key={request.id} xs={10} sm={6} md={4}>
              <Card
                sx={{
                  maxWidth: 345,
                  boxShadow: 4,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={`${backendUrl}/storage/${request.user.images[0].path}`}
                  alt={`Imagen de ${request.user.name}`}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    {request.user.name.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Email: {request.user.email}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    Solicita adoptar a:{" "}
                    <strong>{request.pet.name.toUpperCase()}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Descripción de la solicitud:{" "}
                    {request.additional_notes || "No se proporcionaron notas adicionales."}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", p: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      "&:hover": { backgroundColor: theme.palette.primary.dark },
                      textTransform: "none",
                    }}
                    onClick={() =>
                      (window.location.href = `/solicitud/${request.id}`)
                    }
                  >
                    Ver detalles
                  </Button>
                </CardActions>
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
