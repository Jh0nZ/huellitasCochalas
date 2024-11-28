import React, { useEffect } from "react";
import { Typography, Button, useTheme, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetPetByIdQuery } from "../features/api/petApi";
import OpenMapLabel from "../components/OpenMapLabel";
import ImageCarousel from "../components/ImageCarousel";

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
                width: { xs: "100%", md: "40%" },
                mx: "auto",
                padding: 3,
                gap: 2,
            }}
        >
            {/* Imagen de la mascota */}
            <ImageCarousel images={data.data.images} />

            {/* Información de la mascota */}
            <Typography variant="h4" component="h1" gutterBottom>
                {data.data.name.toUpperCase()}
            </Typography>
            <Typography variant="body1">{data.data.description}</Typography>

            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                <Typography variant="body1">EDAD: {data.data.age}</Typography>

                <Typography variant="body1">
                    TIPO: {data.data.breed.name}
                </Typography>

                <Typography variant="body1">
                    TAMAÑO: {data.data.size.name}
                </Typography>
            </Box>
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
        </Box>
    );
};

export default Infopets;
