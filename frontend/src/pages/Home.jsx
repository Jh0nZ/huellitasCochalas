import React from "react";
import { Button, Box, Typography, Container, useTheme } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PetsIcon from "@mui/icons-material/Pets";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useNavigate } from "react-router-dom";
const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register"); // Redirige a la ruta del registro
  };
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
      <Container
        sx={{
          textAlign: "center",
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: theme.palette.primary.main,
            "&:hover": { backgroundColor: theme.palette.primary.dark },
            mb: 2, // Espacio entre los botones
            mx: 1,
          }}
        >
          ADOPTA
        </Button>
        <Button
      variant="contained"
      size="large"
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        "&:hover": { backgroundColor: (theme) => theme.palette.primary.dark },
        mx: 1,
      }}
      onClick={handleRegisterClick}
    >
      REGISTRA A TU MASCOTA
    </Button>

      </Container>
       
{/* Requisitos */}
<Box
  sx={{
    backgroundColor: theme.palette.back.main,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: { xs: "auto", md: "65vh" }, 
    mt: 6,
    p: { xs: 2, md: 4 }, 
  }}
>
  <Box sx={{ maxWidth: { xs: "100%", md: "60%" } }}> 
    <Typography
      variant="h4"
      component="h2"
      align="center"
      color="#fdfbfe"
      gutterBottom
    >
      REQUISITOS PARA ADOPTAR
    </Typography>
    <Box>
      <Typography
        variant="h5"
        component="div"
        align="left"
        color="#fdfbfe"
        gutterBottom
        sx={{
          fontSize: { xs: "1rem", md: "1.25rem" }, 
        }}
      >
        
       <p>
        <CheckCircleIcon sx={{ fontSize: 30, color: theme.palette.primary.main, mr: 3 }} />
        Fotocopia de C.I y la persona tiene que ser mayor de 21 años.
      </p>
      
        <p>
          <CheckCircleIcon sx={{ fontSize: 30, color: theme.palette.primary.main, mr: 3  }} />
          Número de teléfono fijo.
        </p>
        <p>
          <CheckCircleIcon sx={{ fontSize: 30, color: theme.palette.primary.main , mr: 3 }} />
          Fotocopia de la última factura de luz o agua.
        </p>
        <p>
          <CheckCircleIcon sx={{ fontSize: 30, color: theme.palette.primary.main , mr: 3 }} />
          Casa propia y permiso escrito.
        </p>
      </Typography>
    </Box>
  </Box>
</Box>

      
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
      
 {/* Quiénes somos */}
<Box
  sx={{
    backgroundColor: theme.palette.back.main,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: { xs: "auto", md: "65vh" }, 
    p: { xs: 2, md: 4 }, 
    mt: 6,
  }}
>
  <Box sx={{ maxWidth: { xs: "100%", md: "60%" } }}>
    <Typography
      variant="h4"
      component="h2"
      align="center"
      color="#fdfbfe"
      gutterBottom
    >
      ¿QUIÉNES SOMOS?
    </Typography>
    <Typography
      variant="h5"
      component="div"
      align="center"
      color="#fdfbfe"
      gutterBottom
      sx={{
        fontSize: { xs: "1rem", md: "1.25rem" }, 
        lineHeight: { xs: 1.5, md: 1.75 }, 
      }}
    >
      <p>
        Somos una comunidad comprometida con mejorar la vida de las mascotas que se encuentran sin hogar.
       
        Nuestra misión es crear un puente entre personas dispuestas a brindar amor y compañía, a mascotas que necesitan
        una segunda oportunidad para vivir en un entorno seguro y amoroso.
      </p>
    </Typography>
  </Box>
</Box>

      
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
        <FacebookIcon/>
        <InstagramIcon/>
        <Typography variant="body2">© 2024 Huellitas Cochalas, Inc.</Typography>
      
      </Box>
    </Box>
  );
};

export default Home;
