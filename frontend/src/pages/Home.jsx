import React from "react";
import { Button, Box, Typography, Container, useTheme } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PetsIcon from "@mui/icons-material/Pets";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

const Home = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      {/* Sección de Bienvenida */}
      <Box
        sx={{
          backgroundImage: `url(/images/gatoyperro.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
          color: theme.palette.common.white,
          textAlign: "center",
          p: 3,
        }}
      >
        <Box
          sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)", p: 4, borderRadius: 2 }}
        >
          <Typography variant="h3" component="h1">
            ¡Bienvenido a Huellitas Cochalas!
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            ¿Estás listo para darle un hogar a una mascota o registrarla para
            adopción?
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            “Ayúdanos a darles un hogar lleno de amor a mascotas sin hogar”
          </Typography>
        </Box>
      </Box>

      {/* Botones de Acción */}
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: theme.palette.primary.main,
            "&:hover": { backgroundColor: theme.palette.primary.dark },
            mb: 2,
            mx: 1,
          }}
        >
          ADOPTA
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: theme.palette.primary.main,
            "&:hover": { backgroundColor: theme.palette.primary.dark },
            mx: 1,
          }}
        >
          REGISTRA A TU MASCOTA
        </Button>
      </Container>

      {/* Sección de Beneficios */}
      <Container sx={{ mt: 6 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          ¡BENEFICIOS DE ADOPTAR!
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
            mt: 4,
          }}
        >
          {/* Post-it 1: Salvas una vida */}
          <Box
            sx={{
              p: 4,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              boxShadow: 2,
              textAlign: "center",
              flex: "1 1 250px", // Ajuste flexible
            }}
          >
            <FavoriteIcon
              sx={{ fontSize: 50, color: theme.palette.secondary.main }}
            />
            <Typography variant="h6" sx={{ mt: 2 }}>
              SALVAS UNA VIDA
            </Typography>
          </Box>

          {/* Post-it 2: Apoyas el bienestar familiar */}
          <Box
            sx={{
              p: 4,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              boxShadow: 2,
              textAlign: "center",
              flex: "1 1 250px", // Ajuste flexible
            }}
          >
            <PetsIcon
              sx={{ fontSize: 50, color: theme.palette.secondary.main }}
            />
            <Typography variant="h6" sx={{ mt: 2 }}>
              APOYAS EL BIENESTAR FAMILIAR
            </Typography>
          </Box>

          {/* Post-it 3: Mejora tu bienestar emocional */}
          <Box
            sx={{
              p: 4,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              boxShadow: 2,
              textAlign: "center",
              flex: "1 1 250px", // Ajuste flexible
            }}
          >
            <InsertEmoticonIcon
              sx={{ fontSize: 50, color: theme.palette.secondary.main }}
            />
            <Typography variant="h6" sx={{ mt: 2 }}>
              MEJORA TU BIENESTAR EMOCIONAL
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: theme.palette.grey[900],
          color: theme.palette.common.white,
          textAlign: "center",
          p: 2,
          mt: 6,
        }}
      >
        <Typography variant="body2">© 2024 Huellitas Cochalas, Inc.</Typography>
      </Box>
    </Box>
  );
};

export default Home;
