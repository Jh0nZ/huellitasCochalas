import React, { useState } from "react";
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
import FilterAltIcon from "@mui/icons-material/FilterAlt"; // Icono de filtro
import { PetCard } from "../Components";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// Datos de ejemplo
const petsData = [
  {
    id: 1,
    name: "Fido",
    sexo: "Macho",
    tamano:"Mediano",
    age: "2 años",
    breed: "Labrador",
    description: "Un labrador juguetón y amigable.",
    image:
      "https://dbw3zep4prcju.cloudfront.net/animal/acd97097-34c4-4744-9673-e950246cf19d/image/99c443fc-1a2c-4169-b06b-749f9f4224b8.jpeg?versionId=BItqJ3A.zZLibQ3FisNMtE4b0JhVUo7E&bust=1713489188&width=300",
  },
  {
    id: 2,
    name: "Whiskers",
    tamano:"Grande",
    sexo: "Hembra",
    age: "1 año",
    breed: "Gato doméstico",
    description: "Un gato cariñoso que ama estar en el regazo.",
    image:
      "https://dbw3zep4prcju.cloudfront.net/animal/8cc8db34-a8df-48cf-b439-370e9a9cbe20/image/de091e8b-f283-4558-a262-3968b8d39807.jpg?versionId=wjtsPGgRvcAHeoJxsYzCDB3ib0yX6Hsc&bust=1726751715&width=300",
  },
  {
    id: 3,
    name: "Buddy",
    sexo: "Macho",
    tamano:"Chico",
    age: "3 años",
    breed: "Beagle",
    description: "Un beagle activo y leal.",
    image:
      "https://dbw3zep4prcju.cloudfront.net/animal/bbeac266-45be-4247-b8a9-766b42040482/image/1cc178ca-3ada-4091-a9bc-03ac705c5920.jpg?versionId=0TSjRZfHNa0gwpqOvCU6xhP.6MFkCNwW&bust=1726751677&width=300",
  },
  {
    id: 4,
    name: "Chispas",
    sexo: "Macho",
    tamano:"Mediano",
    age: "2 años",
    breed: "Beagle",
    description: "Un beagle activo y leal.",
    image:
      "https://dbw3zep4prcju.cloudfront.net/animal/bbeac266-45be-4247-b8a9-766b42040482/image/1cc178ca-3ada-4091-a9bc-03ac705c5920.jpg?versionId=0TSjRZfHNa0gwpqOvCU6xhP.6MFkCNwW&bust=1726751677&width=300",
  },
];

const Pets = () => {
  const [filter, setFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState(null); // Estado para manejar el menú
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
  // Filtrar mascotas por nombre
  const filteredPets = petsData.filter((pet) =>
    pet.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Funciones para el menú
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 10 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          color="#645b6d"
        >
          MASCOTAS EN ADOPCIÓN
        </Typography>

        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              startIcon={<FilterAltIcon />}
              onClick={handleClick}
            >
              FILTRAR
            </Button>

            {/* Menú desplegable */}
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

          {/* Resultados filtrados */}
          {filteredPets.length === 0 ? (
            <Typography variant="h6" align="center" sx={{ mt: 3 }}>
              No se encontraron mascotas
            </Typography>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mt: 2,
              }}
            >
              {filteredPets.map((pet) => (
                <Box
                  key={pet.id}
                  sx={{
                    flexBasis: { xs: "100%", sm: "48%", md: "30%" },
                    maxWidth: { xs: "100%", sm: "48%", md: "30%" },
                  }}
                >
                  <PetCard pet={pet} />
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Pets;
