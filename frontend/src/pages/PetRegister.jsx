import React, { useState } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  TextField,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { PhotoCamera, Delete } from "@mui/icons-material";
import { ImagePreview } from "../Components/Index";

const PetRegister = () => {
  const [formData, setFormData] = useState({
    pet_name: "",
    age: "",
    breed: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    console.log("Formulario enviado:", formData);
    console.log("Imágenes seleccionadas:", images);

    // Aquí se puede hacer el envío del formulario, por ejemplo, usando fetch o axios.
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Mascota registrada para adopción");
    }, 2000);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Registrar Mascota para Adopción
        </Typography>

        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Nombre de la Mascota*"
              name="pet_name"
              value={formData.pet_name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.pet_name)}
              helperText={errors.pet_name}
            />
            <TextField
              label="Edad*"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.age)}
              helperText={errors.age}
            />
            <TextField
              label="Raza*"
              name="breed"
              value={formData.breed}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.breed)}
              helperText={errors.breed}
            />
            <TextField
              label="Descripción*"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              error={Boolean(errors.description)}
              helperText={errors.description}
            />

            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCamera />}
              fullWidth
              sx={{ mt: 2 }}
            >
              Subir Imágenes de la Mascota
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleImageChange}
              />
            </Button>

            <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
              {images.map((image, index) => (
                <ImagePreview
                  key={index}
                  image={URL.createObjectURL(image)}
                  onRemove={() => handleRemoveImage(index)}
                />
              ))}
            </Box>

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
      </Box>
    </Container>
  );
};

export default PetRegister;
