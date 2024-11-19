import React, { useEffect, useState } from "react";
import {
	Button,
	Container,
	Typography,
	Box,
	TextField,
	CircularProgress,
	Snackbar,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { ImagePreview } from "./";
import { useSendAdoptionRequestMutation } from "../features/api/adoptionRequestApi";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdoptionRequest = () => {
	const { pet_id } = useParams();
	const [houseImages, setHouseImages] = useState([]);
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [sendAdoptionRequest, { data, error, isSuccess, isError, isLoading }] =
		useSendAdoptionRequestMutation();
	const [formData, setFormData] = useState({
		phone: "",
		address: "",
		reasons: "",
	});


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

		if (/^\d*$/.test(value)) {
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
		setHouseImages((prevImages) => [...prevImages, ...files]);
	};

	const handleRemoveHouseImage = (index) => {
		setHouseImages((prevImages) => prevImages.filter((_, i) => i !== index));
	};

	const validateFields = () => {
		const newErrors = {};
		let hasError = false;

		if (formData.phone.length < 8) {
			newErrors.phone = "El teléfono debe tener al menos 8 caracteres.";
			hasError = true;
		}

		if (!formData.address) {
			newErrors.address = "La dirección es obligatoria.";
			hasError = true;
		}

		if (formData.reasons.length < 30) {
			newErrors.reasons = "Los motivos deben tener al menos 30 caracteres.";
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
			const formDataToSend = new FormData();
			formDataToSend.append("phone", formData.phone);
			formDataToSend.append("location", formData.address);
			formDataToSend.append("additional_notes", formData.reasons);
			formDataToSend.append("pet_id", pet_id);
			formDataToSend.append("status", "pending");

			// Añade las imágenes al FormData
			houseImages.forEach((image, index) => {
				formDataToSend.append(`images[${index}]`, image);
			});

			console.log("Formulario enviado:", formDataToSend);
			sendAdoptionRequest(formDataToSend);
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

						<Snackbar
						open={snackbarOpen}
						message="Envio de solicitud correctamente"
						autoHideDuration={4000}
						onClose={handleSnackbarClose}
                         />
					</Box>
				)}
			</Box>
		</Container>
	);
};

export default AdoptionRequest;
