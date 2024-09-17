import React from 'react';
import "./Home.css";
import {  Button, Box,Typography} from '@mui/material';
import { createTheme } from "@mui/material/styles";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PetsIcon from '@mui/icons-material/Pets';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

const theme = createTheme({
  palette: {
    primary: {
      main: "#a5d6a7", // Verde pastel
    },
    secondary: {
      main: "#ffab91", // Coral pastel
    },
    texto: {
      main: "#fdfbfe", // blanco
    },
    box: {
      main: "#c9b6db", // morado
    },
    dark: {
      main: "#645b6d", // fuerte morado
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

const Home = () => {


  return (
    <div id='home-box' className='page'>
      <section id="home-welcome-banner" className='home-section'>
        <div id="home-mybanner" style={{backgroundImage: `url(${"/images/gatoyperro.jpg"})`}}></div>
        <div id="home-banner-text" className='text-centered'>
          <h1>¡Bienvenido a Huellitas Cochalas!</h1>
          <p>¿Estás listo para darle un hogar a una mascota o registrarla para adopción?</p>
          <p>“Ayúdanos a darles un hogar lleno de amor a mascotas sin hogar”</p>
        </div>
      </section>

       
      <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#b457df',
              "&:hover": { backgroundColor: '#f0ddf8' },
            }}
          >
            ADOPTA
          </Button>
        </Box>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#b457df',
              "&:hover": { backgroundColor: '#f0ddf8' },
            }}
          >
            REGISTRA A TU MASCOTA
          </Button>
        </Box>

        
        <section id="home-post-its-client" className='home-section home-section-hgtAll'>
        <div className='text-centered'>
          <h2>¡BENEFICIOS DE ADOPTAR!</h2>
          <div className='display-flex'>
            <div className='home-post-it'>
               
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 5,
                textAlign: 'center',
              }}
            >
              <FavoriteIcon sx={{ fontSize: 50, color: '#645b6d' }} />
              <Typography variant="h6" color="text.primary" sx={{ mt: 1 }}>
                SALVAS UNA  VIDA
              </Typography>
            </Box>
             
            </div>
            <div className='home-post-it'>
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: 1,
                
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 5,
                textAlign: 'center',
              }}
            >
              <PetsIcon sx={{ fontSize: 50, color: '#645b6d' }} />
              <Typography variant="h6" color="text.primary" sx={{ mt: 1 }}>
               APOYAS EL BIENESTAR FAMILIAR
              </Typography>
            </Box>  
            </div>
            <div className='home-post-it'>
            <Box
              sx={{
                width: 100,
                height: 100,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 5,
                textAlign: 'center',
              }}
            >
              <InsertEmoticonIcon sx={{ fontSize: 50, color: '#645b6d' }} />
              <Typography variant="h6" color="text.primary" sx={{ mt: 1}}>
              MEJORA TU BIENESTAR EMOCIONAL
              </Typography>
            </Box>
      
            </div>
          </div>
        </div>
      </section>
      
          </div>
         
          
  )
}

export default Home