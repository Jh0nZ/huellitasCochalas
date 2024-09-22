import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  useTheme,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt"; // Icono de filtro
import { PetCard } from "../Components/Index";

// Datos de ejemplo
const petsData = [
  {
    id: 1,
    name: "Fido",
    sexo:"Macho",
    age: "2 años",
    breed: "Labrador",
    description: "Un labrador juguetón y amigable.",
    image:
      "https://dbw3zep4prcju.cloudfront.net/animal/acd97097-34c4-4744-9673-e950246cf19d/image/99c443fc-1a2c-4169-b06b-749f9f4224b8.jpeg?versionId=BItqJ3A.zZLibQ3FisNMtE4b0JhVUo7E&bust=1713489188&width=300",
  },
  {
    id: 2,
    name: "Whiskers",
    sexo:"Hembra",
    age: "1 año",
    breed: "Gato doméstico",
    description: "Un gato cariñoso que ama estar en el regazo.",
    image:
      "https://dbw3zep4prcju.cloudfront.net/animal/8cc8db34-a8df-48cf-b439-370e9a9cbe20/image/de091e8b-f283-4558-a262-3968b8d39807.jpg?versionId=wjtsPGgRvcAHeoJxsYzCDB3ib0yX6Hsc&bust=1726751715&width=300",
  },
  {
    id: 3,
    name: "Buddy",
    sexo:"Macho",
    age: "3 años",
    breed: "Beagle",
    description: "Un beagle activo y leal.",
    image:
      "https://dbw3zep4prcju.cloudfront.net/animal/bbeac266-45be-4247-b8a9-766b42040482/image/1cc178ca-3ada-4091-a9bc-03ac705c5920.jpg?versionId=0TSjRZfHNa0gwpqOvCU6xhP.6MFkCNwW&bust=1726751677&width=300",
  },
  // Agrega más datos si es necesario
];

// Estilos del contenedor de búsqueda
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.25),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

// Estilos del ícono de búsqueda dentro del contenedor
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

// Estilos del campo de entrada de búsqueda
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "40ch",
      },
    },
  },
}));

const Pets = () => {
  const [filter, setFilter] = useState("");
  const theme = useTheme();

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filtrar mascotas por nombre
  const filteredPets = petsData.filter((pet) =>
    pet.name.toLowerCase().includes(filter.toLowerCase())
  );

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

        <Box
          
        >
          {/* Contenedor de la barra de búsqueda y botón */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1, // Espacio entre el buscador y el botón
            }}
          >
            {/* Barra de búsqueda personalizada */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Buscar mascota..."
                inputProps={{ "aria-label": "search" }}
                value={filter}
                onChange={handleFilterChange}
              />
            </Search>

            {/* Botón al lado del buscador */}
            <Button variant="contained" startIcon={<FilterAltIcon />}>
             FILTRAR
            </Button>
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
