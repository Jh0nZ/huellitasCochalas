import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  CircularProgress,
} from "@mui/material";
import { PetCard } from "../components";

// Datos de ejemplo
const petsData = [
  {
    id: 1,
    name: "Fido",
    age: "2 años",
    breed: "Labrador",
    description: "Un labrador juguetón y amigable.",
    image: "https://dbw3zep4prcju.cloudfront.net/animal/acd97097-34c4-4744-9673-e950246cf19d/image/99c443fc-1a2c-4169-b06b-749f9f4224b8.jpeg?versionId=BItqJ3A.zZLibQ3FisNMtE4b0JhVUo7E&bust=1713489188&width=300",
  },
  {
    id: 2,
    name: "Whiskers",
    age: "1 año",
    breed: "Gato doméstico",
    description: "Un gato cariñoso que ama estar en el regazo.",
    image: "https://dbw3zep4prcju.cloudfront.net/animal/8cc8db34-a8df-48cf-b439-370e9a9cbe20/image/de091e8b-f283-4558-a262-3968b8d39807.jpg?versionId=wjtsPGgRvcAHeoJxsYzCDB3ib0yX6Hsc&bust=1726751715&width=300",
  },
  {
    id: 3,
    name: "Buddy",
    age: "3 años",
    breed: "Beagle",
    description: "Un beagle activo y leal.",
    image: "https://dbw3zep4prcju.cloudfront.net/animal/bbeac266-45be-4247-b8a9-766b42040482/image/1cc178ca-3ada-4091-a9bc-03ac705c5920.jpg?versionId=0TSjRZfHNa0gwpqOvCU6xhP.6MFkCNwW&bust=1726751677&width=300",
  },
  // Agrega más datos si es necesario
];

const Pets = () => {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filtrar mascotas por nombre
  const filteredPets = petsData.filter((pet) =>
    pet.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mascotas en Adopción
        </Typography>

        <TextField
          label="Buscar mascota"
          variant="outlined"
          fullWidth
          margin="normal"
          value={filter}
          onChange={handleFilterChange}
        />

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
    </Container>
  );
};

export default Pets;
