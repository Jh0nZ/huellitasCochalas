import React, { useEffect } from "react";
import {
    Typography,
    Button,
    useTheme,
    Box,
    CircularProgress,
    Card,
    Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetPetByIdQuery } from "../features/api/petApi";
import OpenMapLabel from "../Components/OpenMapLabel";
import ImageCarousel from "../Components/ImageCarousel";

const Infopets = () => {
    const { pet_id } = useParams();
    const { data, isSuccess, error, isError, isFetching } = useGetPetByIdQuery(pet_id);

    useEffect(() => {
        if (isSuccess) {
            console.log(data);
            console.log(data.is_auth_user);
        }
        if (isError) {
            console.log(error);
        }
    }, [data, error, isError, isSuccess]);

    const theme = useTheme();
    const navigate = useNavigate();

    const handleAdoptaClick = () => {
        navigate("/adoption-request/" + pet_id);
    };

    if (isFetching) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }
    if (isError) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="80vh"
            >
                <Typography>{error.data?.message}</Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: { xs: "100%", md: "80%" },
                mx: "auto",
                gap: 3,
                padding: 2,
            }}
        >
            <Card
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    width: "100%",
                    boxShadow: 3,
                    borderRadius: 2,
                    padding: 2,
                    backgroundColor: theme.palette.background.paper,
                    gap: 3,
                }}
            >
                {/* Imagen de la mascota (ocupa toda la izquierda) */}
                <Box sx={{ flex: 1 }}>
                    <ImageCarousel images={data.data.images} />
                </Box>

                {/* Información de la mascota (ocupa toda la derecha) */}
                <Box sx={{ flex: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {data.data.name.toUpperCase()}
                    </Typography>
                    <Typography variant="body1">{data.data.description}</Typography>

                    {/* Datos adicionales */}
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
                        <Typography variant="body1" color="textSecondary">
                            <strong>EDAD:</strong> {data.data.age}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            <strong>TIPO:</strong> {data.data.breed.name}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            <strong>TAMAÑO:</strong> {data.data.size.name}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            <strong>SEXO:</strong> {data.data.gender}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    {/* Mapa */}
                    <Box
                        sx={{
                            width: "100%",
                            height: { xs: "250px", md: "300px" },
                            boxShadow: 3,
                            borderRadius: "10px",
                            overflow: "hidden",
                            marginTop: 3,
                        }}
                    >
                        <OpenMapLabel
                            location={{
                                lat: data.data.lat,
                                lng: data.data.lng,
                            }}
                            precision={data.is_auth_user}
                            zoom={15}
                        />
                    </Box>

                    <Box sx={{ marginTop: 2 }}>
                        {/* Botón de Adopción (pequeño, al final) */}
                        <Button
                            variant="contained"
                            size="small"
                            fullWidth
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                "&:hover": {
                                    backgroundColor: theme.palette.primary.dark,
                                },
                                py: 1,
                            }}
                            onClick={handleAdoptaClick}
                        >
                            ADOPTAR
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};

export default Infopets;
