import React from 'react';
import "./Home.css";
import {  Button, Box} from '@mui/material';
import { createTheme } from "@mui/material/styles";
import { purple } from '@mui/material/colors';
const theme = createTheme({
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main:  purple[500],
      },
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

        <Box sx={{ textAlign: 'center', mt: 4  }}>
        <Button variant="contained" color="primary">
         ADOPTA
        </Button>
      </Box>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Button variant="contained" color="primary">
         REGISTRA A TU MASCOTA
        </Button>
      </Box>
          </div>
  )
}

export default Home