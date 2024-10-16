import React, { useState } from 'react';
import {
  Container, Typography, Box, Button, Menu, useTheme,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { PetCard } from '../Components';
import { useGetPetsQuery } from '../features/api/apiSlice'; // Importa el hook

const Pets = () => {
  const { data: petsData = [], error, isLoading } = useGetPetsQuery();
  const [filter, setFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredPets = petsData.filter((pet) =>
    pet.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isLoading) return <Typography align="center">Cargando...</Typography>;
  if (error) return <Typography align="center">Error: {error.message}</Typography>;

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 10 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          MASCOTAS EN ADOPCIÓN
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button variant="contained" startIcon={<FilterAltIcon />} onClick={handleClick}>
            FILTRAR
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {/* Tu menú de filtros aquí */}
          </Menu>
        </Box>

        {filteredPets.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ mt: 3 }}>
            No se encontraron mascotas
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
            {filteredPets.map((pet) => (
              <Box key={pet.id} sx={{ flexBasis: '30%', maxWidth: '30%' }}>
                <PetCard pet={pet} />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Pets;
