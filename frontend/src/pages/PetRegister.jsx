import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRegisterPetMutation } from "../features/api/apiSlice"; // Usa la mutación

const PetRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    breed: "",
    breed_id: 1,
    user_id: 1,
    size_id: 1,
    sterilized: true,
    status: "P",
    location: "calle aaa1",
    description: "",
  });
  const [images, setImages] = useState([]);
  const [registerPet, { isLoading, error }] = useRegisterPetMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + images.length > 5) {
      alert("Solo se pueden seleccionar hasta 5 imágenes.");
      return;
    }
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();

    // Agregar datos de la mascota a formData
    for (const key in formData) {
      if (key === "sterilized") {
        formDataToSend.append(key, formData[key] ? "1" : "0");
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    // Agregar las imágenes a formData
    images.forEach((image, index) => {
        formDataToSend.append(`images[${index}]`, image); // Usa un índice para crear un array
    });

    console.log("Datos a enviar:", Array.from(formDataToSend.entries())); // Imprimir para depuración

    try {
        await registerPet(formDataToSend).unwrap(); // Enviar la mascota para registro
        alert("Mascota registrada con éxito");
        // Limpiar el formulario y las imágenes
        setFormData({
            name: "",
            age: "",
            breed: "",
            breed_id: 1,
            user_id: 1,
            size_id: 1,
            sterilized: true,
            status: "P",
            location: "calle aaa1",
            description: "",
        });
        setImages([]); // Limpiar las imágenes
    } catch (err) {
        console.error("Error registrando la mascota:", err);
        // Imprimir detalles adicionales sobre el error
        console.error('Detalles del error:', err.data);
    }
};


  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          REGISTRA A TU MASCOTA
        </Typography>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Nombre de la Mascota"
              name="name"
              value={formData.name}
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

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              style={{ marginTop: "16px" }}
            />
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              {images.length} imágenes seleccionadas.
            </Typography>

            <List sx={{ mt: 2 }}>
              {images.map((image, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={`Imagen ${index + 1}`} />
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleImageRemove(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>

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
        {error && (
          <Typography color="error">Error registrando la mascota</Typography>
        )}
      </Box>
    </Container>
  );
};

export default PetRegister;
