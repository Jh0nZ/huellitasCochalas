import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Menu,
  FormControlLabel,
  Checkbox,
  useTheme,
  Radio,
  RadioGroup,
} from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { PetCard } from '../components';
import { useGetAllPetsQuery } from '../features/api/petApi'; 
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Pets = () => {
  const { data, error, isError, isFetching, isSuccess } = useGetAllPetsQuery();
  useEffect(() => {
    if (isError) {
      console.error('Error:', error);
    }
    if (isSuccess) {
      console.log('Data:', data);
    }
  }, [data, error, isError, isFetching, isSuccess]);

  const [filter, setFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const ageOptions = [
    '1-3',
    '4-6',
    '7-9',
    '10-12'
  ];
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isFetching) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography>cargando...</Typography>
      </Box>
    );
  }
  if (isError) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography>{error.data.message}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 12 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center"   color="#645b6d">
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
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Typography sx={{ px: 2, py: 1, fontWeight: "bold" , alignItems:"center"}}>
                FILTRAR POR
              </Typography>
              <Typography sx={{ px: 2, py: 1, fontWeight: "bold" }}>
                TAMAÑO
              </Typography>
              <FormControlLabel 
                control={<Checkbox defaultChecked />}
                label="Extra Chico"
                sx={{px: 3}}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Chico"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Mediano"
                sx={{px: 3}}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Grande"
                sx={{px: 2.7}}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Extra Grande"
                sx={{px: 3}}
              />
              <Typography sx={{ px: 2, py: 1, fontWeight: "bold" }}>
                GÉNERO
              </Typography>

               <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="hembra"
                name="radio-buttons-group"
                sx={{px: 3}}
              >
                <FormControlLabel value="hembra" control={<Radio />} label="Hembra" />
                <FormControlLabel value="macho" control={<Radio />} label="Macho" />

              </RadioGroup>

              <Typography sx={{ px: 2, py: 1, fontWeight: "bold" }}>
                EDAD
              </Typography>
             
              <Autocomplete
                options={ageOptions}
                getOptionDisabled={(option) => option === ageOptions[4] || option === ageOptions[4]}
                sx={{ width: 300, px:2, }}
                renderInput={(params) => <TextField {...params} label="Selecciona una edad" />}
              />
            </Menu>
        </Box>

        {data.data.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ mt: 3 }}>
            No se encontraron mascotas
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap:4, mt: 4, mx:8 }}>
            {data.data.map((pet) => (
              <Box key={pet.id} sx={{   flexBasis: { xs: "100%", sm: "48%", md: "30%" },
                                        maxWidth: { xs: "100%", sm: "48%", md: "30%" },}}>
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
