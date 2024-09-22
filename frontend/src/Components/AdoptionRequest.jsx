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
import { PhotoCamera } from "@mui/icons-material";
import { ImagePreview } from "./Index";

const AdoptionRequest = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    reasons: "",
  });
  const [houseImages, setHouseImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleHouseImageChange = (e) => {
    const files = Array.from(e.target.files);
    setHouseImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveHouseImage = (index) => {
    setHouseImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    console.log("Formulario enviado:", formData);
    console.log("Imágenes de la casa:", houseImages);

    // Aquí se puede hacer el envío del formulario, por ejemplo, usando fetch o axios.
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Solicitud de adopción enviada");
    }, 2000);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Solicitar Adopción
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
              label="Nombre*"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
            <TextField
              label="Teléfono*"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.phone)}
              helperText={errors.phone}
            />
            <TextField
              label="Dirección*"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.address)}
              helperText={errors.address}
            />
            <TextField
              label="Motivos para la adopción*"
              name="reasons"
              value={formData.reasons}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              error={Boolean(errors.reasons)}
              helperText={errors.reasons}
            />

            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCamera />}
              fullWidth
              sx={{ mt: 2 }}
            >
              Subir Imágenes de tu Casa
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleHouseImageChange}
              />
            </Button>

            <Box
              sx={{
                mt: 2,
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              {houseImages.map((image, index) => (
                <ImagePreview
                  key={index}
                  image={URL.createObjectURL(image)}
                  onRemove={() => handleRemoveHouseImage(index)}
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
              Enviar Solicitud
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default AdoptionRequest;
