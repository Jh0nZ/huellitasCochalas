import React, { useEffect, useState } from "react";
import {
    Button,
    Container,
    Typography,
    Box,
    TextField,
    CircularProgress,
    Snackbar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
} from "@mui/material";
import { PhotoCamera, Close } from "@mui/icons-material";
import ImagePreview from "./ImagePreview";
import MapPicker from "./MapPicker";
import OpenMapPicker from "./OpenMapPicker";
import OpenMapLabel from "./OpenMapLabel";
import MapLabel from "./MapLabel";
import { useSendAdoptionRequestMutation } from "../features/api/adoptionRequestApi";
import { useParams, useNavigate } from "react-router-dom";

const AdoptionRequest = () => {
    const { pet_id } = useParams();
    const [houseImages, setHouseImages] = useState([]);
    const [errors, setErrors] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [mapOpen, setMapOpen] = useState(false);

    const handleOpenMap = () => setMapOpen(true);
    const handleCloseMap = () => setMapOpen(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();

    const [
        sendAdoptionRequest,
        { data, error, isSuccess, isError, isLoading },
    ] = useSendAdoptionRequestMutation();

    const [formData, setFormData] = useState({
        phone: "",
        address: "",
        reasons: "",
        location: {
            lat: "",
            lng: "",
        },
    });

    useEffect(() => {
        console.log("formdata", formData);
    }, [formData]);

    useEffect(() => {
        if (isSuccess) {
            console.log("Solicitud enviada con éxito:", data);
            setSnackbarOpen(true);
        }
        if (isError) {
            console.error("Error al enviar la solicitud:", error);
        }
    }, [isSuccess, isError, data, error]);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        navigate("/home");
    };

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

    const handlePhoneChange = (e) => {
        const { value } = e.target;
        if (/^\d*$/.test(value) && value.length <= 9) {
            setFormData({ ...formData, phone: value });

            if (value.length >= 8) {
                setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    phone: "El teléfono debe tener al menos 8 caracteres.",
                }));
            }
        }
    };

    const handleHouseImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (houseImages.length + files.length > 2) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                images: "Solo puedes subir hasta 2 imágenes de tu casa.",
            }));
            return;
        }

        setHouseImages((prevImages) => [...prevImages, ...files]);
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors.images;
            return newErrors;
        });
    };

    const handleRemoveHouseImage = (index) => {
        setHouseImages((prevImages) =>
            prevImages.filter((_, i) => i !== index)
        );
    };

    const validateFields = () => {
        const newErrors = {};
        let hasError = false;

        if (!formData.phone) {
            newErrors.phone = "El teléfono es obligatorio";
            hasError = true;
        }

        if (!formData.address) {
            newErrors.address = "La dirección es obligatoria.";
            hasError = true;
        }

        if (formData.reasons.length < 30) {
            newErrors.reasons =
                "Los motivos deben tener al menos 30 caracteres.";
            hasError = true;
        }

        if (houseImages.length < 2) {
            newErrors.images = "Debes subir al menos 2 imágenes de tu casa.";
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
    };

    const handleSubmit = () => {
        if (validateFields()) {
            setOpenDialog(true);
        }
    };

    const handleConfirmSubmit = () => {
        const formDataToSend = new FormData();
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("location", formData.address);
        formDataToSend.append("additional_notes", formData.reasons);
        formDataToSend.append("pet_id", pet_id);
        formDataToSend.append("status", "pending");
        formDataToSend.append("lat", formData.location.lat);
        formDataToSend.append("lng", formData.location.lng);

        houseImages.forEach((image, index) => {
            formDataToSend.append(`images[${index}]`, image);
        });

        console.log("Formulario enviado:", formDataToSend);
        sendAdoptionRequest(formDataToSend);
        setOpenDialog(false);
    };

    const handleCancelSubmit = () => {
        setOpenDialog(false);
        setFormData({ phone: "", address: "", reasons: "" });
        setHouseImages([]);
        setErrors({});
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
                <IconButton onClick={handleCloseMap}>
                    <Close />
                </IconButton>
            </Box>
            <OpenMapPicker
                style={{ width: "100%", height: "100%" }}
                setMarkerPosition={({ lat, lng }) => {
                    setFormData({
                        ...formData,
                        address: lat + "," + lng,
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
                    SOLICITAR ADOPCIÓN
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
                            label="Teléfono*"
                            name="phone"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            fullWidth
                            margin="normal"
                            error={Boolean(errors.phone)}
                            helperText={errors.phone}
                            type="tel"
                        />
                        <TextField
                            label="Motivos para la adopción*"
                            name="reasons"
                            value={formData.reasons}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={3}
                            error={Boolean(errors.reasons)}
                            helperText={errors.reasons}
                        />
                        <Button
                            variant="outlined"
                            fullWidth
                            component="label"
                            sx={{ mt: 2 }}
                            onClick={handleOpenMap}
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
                        {errors.address && (
                            <Typography color="error" sx={{ mt: 1 }}>
                                {errors.address}
                            </Typography>
                        )}
                        <Button
                            variant="outlined"
                            component="label"
                            startIcon={<PhotoCamera />}
                            fullWidth
                            sx={{ mt: 2 }}
                            disabled={houseImages.length >= 2}
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

                        {errors.images && (
                            <Typography color="error" sx={{ mt: 1 }}>
                                {errors.images}
                            </Typography>
                        )}
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
                                    onRemove={() =>
                                        handleRemoveHouseImage(index)
                                    }
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

                        <Snackbar
                            open={snackbarOpen}
                            message="Envío de solicitud correctamente"
                            autoHideDuration={3000}
                            onClose={handleSnackbarClose}
                        />

                        {/* Modal de Confirmación */}
                        <Dialog open={openDialog} onClose={handleCancelSubmit}>
                            <DialogTitle>Confirmar Envío</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    ¿Estás seguro de que deseas enviar esta
                                    solicitud de adopción?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={handleCancelSubmit}
                                    color="error"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    onClick={handleConfirmSubmit}
                                    color="primary"
                                >
                                    Enviar
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default AdoptionRequest;
