import React, { useEffect, useState } from "react";
import {
    Grid2 as Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    useTheme,
    Box,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetPetByIdQuery } from "../features/api/petApi";
import OpenMapLabel from "../components/OpenMapLabel";

const Infopets = () => {
    const { pet_id } = useParams();
    const { data, isSuccess, error, isError, isFetching } =
        useGetPetByIdQuery(pet_id);

    useEffect(() => {
        if (isSuccess) {
            console.log(data);
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
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <Typography>cargando...</Typography>
            </Box>
        );
    }
    if (isError) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <Typography>{error.data.message}</Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                mt: { xs: 4, md: 7 },
                px: { xs: 2, sm: 4 },
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
                boxShadow: 3,
                borderRadius: "10px",
                overflow: "hidden", // Evita que el contenido se desborde
            }}
        >
            {/* Contenedor completo con la imagen, información y mapa */}
            <Card
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    width: "100%",
                }}
            >
                {/* Imagen de la mascota */}
                <Box
                    sx={{
                        width: { xs: "100%", md: "40%" },
                        height: { xs: "250px", md: "350px" },
                    }}
                >
                    <CardMedia
                        component="img"
                        alt={data.data.name}
                        image={`http://localhost:8000/storage/${data.data.images[0].path}`}
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "10px",
                        }}
                    />
                </Box>

                {/* Información de la mascota */}
                <Box
                    sx={{
                        width: { xs: "100%", md: "60%" },
                        padding: { xs: 2, sm: 4 },
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <CardContent sx={{ flex: 1 }}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            {data.data.name.toUpperCase()}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {data.data.description}
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                            }}
                        >
                            <PetsIcon sx={{ mr: 1 }} /> EDAD: {data.data.age}
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                            }}
                        >
                            <PetsIcon sx={{ mr: 1 }} /> RAZA:{" "}
                            {data.data.breed.name}
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                            }}
                        >
                            <PetsIcon sx={{ mr: 1 }} /> TAMAÑO:{" "}
                            {data.data.size.name}
                        </Typography>

                        {/* Botón de Adopción */}
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                "&:hover": {
                                    backgroundColor: theme.palette.primary.dark,
                                },
                                mt: 4,
                                py: 1.5,
                            }}
                            onClick={handleAdoptaClick}
                        >
                            ADOPTAR
                        </Button>
                    </CardContent>

                    {/* Mapa */}
                    <Box
                        sx={{
                            width: "100%",
                            height: { xs: "250px", md: "400px" },
                            boxShadow: 3,
                            borderRadius: "10px",
                            overflow: "hidden",
                            marginTop: { xs: 3, md: 4 },
                        }}
                    >
                        <OpenMapLabel
                            location={{
                                lat: data.data.lat,
                                lng: data.data.lng,
                            }}
                        />
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};

export default Infopets;
