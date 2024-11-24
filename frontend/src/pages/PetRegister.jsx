import React, { useEffect, useState } from "react";
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
import { PhotoCamera } from "@mui/icons-material";
import { useRegisterPetMutation } from "../features/api/petApi";
import { useGetSizesQuery } from "../features/api/sizeApi";
import { useGetBreedsQuery } from "../features/api/breedApi";

const genders = [
    { id: 1, value: "MACHO", label: "Macho" },
    { id: 2, value: "HEMBRA", label: "Hembra" },
];

const tipMas = [
    { id: 1, value: "PERRO", label: "Perro" },
    { id: 2, value: "GATO", label: "Gato" },
];
const tamanio = [
    { id: 1, value: "PEQUEÑO", label: "Pequeño" },
    { id: 2, value: "MEDIANO", label: "Mediano" },
    { id: 3, value: "GRANDE", label: "Grande" },
];

const PetRegister = () => {
    const {
        data: sizes,
        error: sizesError,
        isError: isSizesError,
        isSuccess: isSizesSucess,
        isFetching: isSizesFetching,
    } = useGetSizesQuery();
    useEffect(() => {
        if (isSizesSucess) {
            console.log("Tamaños:", sizes);
        }
        if (isSizesError) {
            console.error("Error obteniendo los tamaños:", sizesError);
        }
    }, [sizes, sizesError, isSizesError, isSizesSucess]);
    const {
        data: breeds,
        error: breedsError,
        isError: isBreedsError,
        isSuccess: isBreedsSucess,
        isFetching: isBreedsFetching,
    } = useGetBreedsQuery();
    useEffect(() => {
        if (isBreedsSucess) {
            console.log("Razas:", breeds);
        }
        if (isBreedsError) {
            console.error("Error obteniendo las razas:", breedsError);
        }
    }, [breeds, breedsError, isBreedsError, isBreedsSucess]);

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        breed_id: 1,
        user_id: 1,
        size_id: 1,
        sterilized: true,
        location: "calle aaa1",
        description: "",
        gender: "",
        status: "P",
        tipo_mascota: "",
        tamanio_mascota: "",
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
            const validTypes = [
                "image/jpeg",
                "image/png",
                "image/jpg",
                "image/gif",
                "image/svg+xml",
            ];
            if (validTypes.includes(file.type) && newImages.length < 5) {
                newImages.push(file);
            }
        });

        setImages((prevImages) => [...prevImages, ...newImages]);

        if (newImages.length < files.length) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                images: "Solo se pueden seleccionar hasta 5 imágenes.",
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                images: "",
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
        } else if (formData.description.length < 30) {
            formIsValid = false;
            newErrors.description =
                "La descripción debe tener entre 30 y 50 caracteres";
        }
        if (!formData.tamanio_mascota) {
            formIsValid = false;
            newErrors.tamanioMascota = "El tamaño es obligatorio";
        }

        if (!formData.gender) {
            formIsValid = false;
            newErrors.gender = "El género es obligatorio";
        }

        if (!formData.tipo_mascota) {
            formIsValid = false;
            newErrors.tipoMascota = "La mascota es obligatoria";
        }
        if (images.length === 0) {
            newErrors.images = "Debes subir al menos una foto.";
            formIsValid = false;
        } else if (images.length < 3) {
            newErrors.images = "Debes subir al menos 3 imágenes.";
            formIsValid = false;
        } else if (images.length > 5) {
            newErrors.images = "No puedes subir más de 5 imágenes.";
            formIsValid = false;
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
                breed_id: 1,
                user_id: 1,
                size_id: 1,
                sterilized: true,
                description: "",
                gender: "",
                status: "P",
                location: "calle aaa1",
                tipoMascota: "",
                tamanioMascota: "",
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
            <Box sx={{ mt: 12 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    align="center"
                    color="#645b6d"
                >
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
                        <FormControl
                            fullWidth
                            margin="normal"
                            error={Boolean(errors.gender)}
                        >
                            <InputLabel>Género*</InputLabel>
                            <Select
                                label="Género*"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                            >
                                {genders.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
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
                        <FormControl
                            fullWidth
                            margin="normal"
                            error={Boolean(errors.tipoMascota)}
                        >
                            <InputLabel>Tipo de Mascota*</InputLabel>
                            <Select
                                label="Tipo de Mascota*"
                                name="tipo_mascota" // Cambié a tipoMascota
                                value={formData.tipo_mascota}
                                onChange={handleInputChange}
                            >
                                {tipMas.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
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

                        <FormControl
                            fullWidth
                            margin="normal"
                            error={Boolean(errors.tamanioMascota)} // Cambié a errors.tamanioMascota
                        >
                            <InputLabel>Tamaño de la mascota*</InputLabel>
                            <Select
                                label="Tamaño de la mascota*"
                                name="tamanio_mascota"
                                value={formData.tamanio_mascota}
                                onChange={handleInputChange}
                            >
                                {tamanio.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.tamanioMascota && (
                                <Typography variant="body2" color="error">
                                    {errors.tamanioMascota}
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
                        <Button
                            variant="outlined"
                            component="label"
                            startIcon={<PhotoCamera />}
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Sube fotos de tu mascota
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                hidden
                            />
                        </Button>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ mt: 1 }}
                        >
                            {images.length} imágenes seleccionadas.
                        </Typography>
                        {errors.images && (
                            <Typography color="error" sx={{ mt: 1 }}>
                                {errors.images}
                            </Typography>
                        )}
                        <List sx={{ mt: 2 }}>
                            {images.map((image, index) => (
                                <ListItem
                                    key={index}
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            onClick={() =>
                                                handleImageRemove(index)
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            src={URL.createObjectURL(image)}
                                        />
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
