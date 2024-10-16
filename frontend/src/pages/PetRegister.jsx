import React, { useState } from 'react';
import {
  Container, Typography, Box, Button, TextField, CircularProgress,
} from '@mui/material';
import { useRegisterPetMutation } from '../features/api/apiSlice'; // Usa la mutación

const PetRegister = () => {
  const [formData, setFormData] = useState({
    pet_name: '',
    age: '',
    breed: '',
    description: '',
  });
  const [images, setImages] = useState([]);
  const [registerPet, { isLoading, error }] = useRegisterPetMutation(); // RTK Query hook para registrar mascotas

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await registerPet(formData).unwrap(); // Enviar la mascota para registro
      alert('Mascota registrada con éxito');
    } catch (err) {
      console.error('Error registrando la mascota:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          REGISTRA A TU MASCOTA
        </Typography>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Nombre de la Mascota"
              name="pet_name"
              value={formData.pet_name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Edad"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Raza"
              name="breed"
              value={formData.breed}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Descripción"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              onClick={handleSubmit}
            >
              Registrar Mascota
            </Button>
          </Box>
        )}
        {error && <Typography color="error">Error registrando la mascota</Typography>}
      </Box>
    </Container>
  );
};

export default PetRegister;
