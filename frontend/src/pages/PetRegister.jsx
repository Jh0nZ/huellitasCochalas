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
import { useNavigate } from 'react-router-dom';
import { useGetBreedsQuery } from "../features/api/breedApi";
import OpenMapPicker from "../Components/OpenMapPicker";
import OpenMapLabel from "../Components/OpenMapLabel";
import { Close } from "@mui/icons-material";

const genders = [
    { id: 1, value: "MACHO", label: "Macho" },
    { id: 2, value: "HEMBRA", label: "Hembra" },
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
    const [mapOpen, setMapOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        breed_id: null,
        size_id: null,
        sterilized: true,
        location: "",
        description: "",
        gender: "",
        status: "P",
        location: {
            lat: null,
            lng: null,
        },
    });

    useEffect(() => {
        console.log("Form data:", formData);
    }, [formData]);

    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({});
    const [registerPet, { isLoading, error }] = useRegisterPetMutation();
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

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
        if (!formData.size_id) {
            formIsValid = false;
            newErrors.size_id = "El tamaño es obligatorio";
        }

        if (!formData.gender) {
            formIsValid = false;
            newErrors.gender = "El género es obligatorio";
        }

        if (!formData.location.lat || !formData.location.lng) {
            formIsValid = false;
            newErrors.location = "La ubicación es obligatoria";
        }

        if (!formData.breed_id) {
            formIsValid = false;
            newErrors.breed_id = "El tipo de mascota es obligatorio";
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
            } else if (key === "location") {
                formDataToSend.append("lat", formData[key].lat);
                formDataToSend.append("lng", formData[key].lng);
            } else {
                formDataToSend.append(key, formData[key]);
            }
        }

        images.forEach((image, index) => {
            formDataToSend.append(`images[${index}]`, image);
        });

        console.log("Form data to send:", formDataToSend);

        try {
            await registerPet(formDataToSend).unwrap();
            alert("Mascota registrada con éxito");

            // Limpiar el formulario después del registro
            setFormData({
                name: "",
                age: "",
                breed_id: 1,
                size_id: 1,
                sterilized: true,
                description: "",
                gender: "",
                status: "P",
                location: "",
                tipoMascota: "",
                tamanioMascota: "",
            });
            setImages([]);
            setErrors({});

            // Redirigir a la página de mascotas
            navigate("/pets");
        } catch (err) {
            console.error("Error registrando la mascota:", err);
            console.error("Detalles del error:", err.data);
        }
    };
    

    return mapOpen ? (
        <Box style={{ height: "75vh", marginTop: "100px" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6">Selecciona tu Dirección</Typography>
                <IconButton onClick={() => setMapOpen(false)}>
                    <Close />
                </IconButton>
            </Box>
            <OpenMapPicker
                style={{ width: "100%", height: "100%" }}
                setMarkerPosition={({ lat, lng }) => {
                    setFormData({
                        ...formData,
                        location: {
                            lat: lat,
                            lng: lng,
                        },
                    });
                }}
                markerPosition={formData.location}
            />
        </Box>
    ) : (
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
                {isLoading || isSizesFetching || isBreedsFetching ? (
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
                            <InputLabel>Sexo*</InputLabel>
                            <Select
                                label="Sexo*"
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
                            error={Boolean(errors.breed_id)}
                        >
                            <InputLabel>Tipo de Mascota*</InputLabel>
                            <Select
                                label="Tipo de Mascota*"
                                name="breed_id"
                                value={formData.breed_id}
                                onChange={handleInputChange}
                                renderValue={(selected) => {
                                    const selectedBreed = breeds.find(
                                        (breed) => breed.id === selected
                                    );
                                    return selectedBreed
                                        ? selectedBreed.name
                                        : "";
                                }}
                            >
                                {breeds.map((breed) => (
                                    <MenuItem key={breed.id} value={breed.id}>
                                        {breed.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.breed_id && (
                                <Typography variant="body2" color="error">
                                    {errors.breed_id}
                                </Typography>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            margin="normal"
                            error={Boolean(errors.size_id)}
                        >
                            <InputLabel>Tamaño de la mascota*</InputLabel>
                            <Select
                                label="Tamaño de la mascota*"
                                name="size_id"
                                value={formData.size_id}
                                onChange={handleInputChange}
                                renderValue={(selected) => {
                                    const selectedSize = sizes.find(
                                        (size) => size.id === selected
                                    );
                                    return selectedSize
                                        ? selectedSize.name
                                        : "";
                                }}
                            >
                                {sizes.map((size) => (
                                    <MenuItem key={size.id} value={size.id}>
                                        {size.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.size_id && (
                                <Typography variant="body2" color="error">
                                    {errors.size_id}
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
                            fullWidth
                            component="label"
                            sx={{ mt: 2 }}
                            onClick={() => setMapOpen(true)}
                            name="location"
                        >
                            {formData.location.lat ? (
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: { xs: "250px", md: "250px" },
                                        overflow: "hidden",
                                    }}
                                >
                                    <OpenMapLabel
                                        location={formData.location}
                                    />
                                </Box>
                            ) : (
                                "Seleccionar Dirección"
                            )}
                        </Button>
                        {errors.location && (
                            <Typography color="error" sx={{ mt: 1 }}>
                                {errors.location}
                            </Typography>
                        )}
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
