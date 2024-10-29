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
  Select,
  ListItemText,
  MenuItem,
  Avatar,
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRegisterPetMutation } from "../features/api/apiSlice";

const genders = [
  { value: "MACHO", label: "Macho" },
  { value: "HEMBRA", label: "Hembra" },
];

const tipMas = [
  { value: "PERRO", label: "Perro" },
  { value: "GATO", label: "Gato" },
];

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
    gender: "",
    tipoMascota: "", // Cambié a tipoMascota
  });
  
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [registerPet, { isLoading, error }] = useRegisterPetMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

   
    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];
  
    files.forEach((file) => {
   
      const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/svg+xml"];
      if (validTypes.includes(file.type) && newImages.length < 5) {
        newImages.push(file);
      }
    });
  
    setImages((prevImages) => [...prevImages, ...newImages]);
  

    if (newImages.length < files.length) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        images: "Solo se pueden seleccionar hasta 5 imágenes."
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        images: ""
      }));
    }
  };


  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (!formData.name) {
      formIsValid = false;
      newErrors.name = "El nombre de la mascota es obligatorio";
    }

    if (!formData.age || isNaN(formData.age)) {
      formIsValid = false;
      newErrors.age = "La edad de la mascota es obligatoria";
    }

    if (!formData.breed) {
      formIsValid = false;
      newErrors.breed = "La raza de la mascota es obligatoria";
    }

    if (!formData.description) {
      formIsValid = false;
      newErrors.description = "La descripción es obligatoria";
    } else if (formData.description.length < 30 || formData.description.length > 50) {
      formIsValid = false;
      newErrors.description = "La descripción debe tener entre 30 y 50 caracteres";
    }

    if (!formData.gender) {
      formIsValid = false;
      newErrors.gender = "El género es obligatorio";
    }

    if (!formData.tipoMascota) {
      formIsValid = false;
      newErrors.tipoMascota = "La mascota es obligatoria";
    }
    if (images.length === 0) {
      newErrors.images = "Debes subir al menos una foto.";
      formIsValid = true;
    } else if (images.length !== 5) {
      newErrors.images = "Debes subir al menos 5 imágenes.";
      formIsValid= true;
    }
    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === "sterilized") {
        formDataToSend.append(key, formData[key] ? "1" : "0");
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    images.forEach((image, index) => {
      formDataToSend.append(`images[${index}]`, image);
    });

    try {
      await registerPet(formDataToSend).unwrap();
      alert("Mascota registrada con éxito");
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
        gender: "",
        tipoMascota: "", 
      });
      setImages([]);
      setErrors({});
    } catch (err) {
      console.error("Error registrando la mascota:", err);
      console.error("Detalles del error:", err.data);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="#645b6d">
          REGISTRA A TU MASCOTA
        </Typography>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Nombre de la Mascota*"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
            <TextField
              label="Edad de la mascota*"
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
            <FormControl fullWidth margin="normal" error={Boolean(errors.gender)}>
              <InputLabel>Género*</InputLabel>
              <Select
                label="Género*"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.gender && (
                <Typography variant="body2" color="error">
                  {errors.gender}
                </Typography>
              )}
            </FormControl>
            <FormControl fullWidth margin="normal" error={Boolean(errors.tipoMascota)}>
              <InputLabel>Tipo de Mascota*</InputLabel>
              <Select
                label="Tipo de Mascota*"
                name="tipoMascota" // Cambié a tipoMascota
                value={formData.tipoMascota}
                onChange={handleInputChange}
              >
                {tipMas.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.tipoMascota && (
                <Typography variant="body2" color="error">
                  {errors.tipoMascota}
                </Typography>
              )}
            </FormControl>
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
            {errors.images && (
              <Typography color="error" sx={{ mt: 1 }}>
                {errors.images}
              </Typography>
                  )}
            <List sx={{ mt: 2 }}>
              {images.map((image, index) => (
                <ListItem key={index} secondaryAction={
                  <IconButton edge="end" onClick={() => handleImageRemove(index)}>
                    <DeleteIcon />
                  </IconButton>
                }>
                  <ListItemAvatar>
                    <Avatar src={URL.createObjectURL(image)} />
                  </ListItemAvatar>
                  <ListItemText primary={image.name} />
                </ListItem>
              ))}
            </List>
            <Button
              variant="contained"
              onClick={handleSubmit}
              fullWidth
              sx={{ mt: 3 }}
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
