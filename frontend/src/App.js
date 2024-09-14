// App.js
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import NavBar from './Components/NavBar';

function App() {
  return (
    <Container>
      <NavBar/>
      <br></br><br></br><br></br>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Hola Mundo
        </Typography>
        <Typography variant="body1">
          Bienvenido a tu aplicación React con Material-UI.
        </Typography>
        <Button variant="contained" color="primary">
          ¡Haz clic aquí!
        </Button>
      </Box>
    </Container>
  );
}

export default App;
