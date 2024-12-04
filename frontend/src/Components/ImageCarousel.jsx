import React, { useState, useEffect } from "react";
import { Box, CardMedia, IconButton, Slide } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { backendUrl } from "../constants";

const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [inProp, setInProp] = useState(true);

    useEffect(() => {
        if (images.length > 1) {
            const timer = setInterval(() => {
                setInProp(false); // Inicia la transición de salida
            }, 4000); // Cambia cada 4 segundos
            return () => clearInterval(timer);
        }
    }, [currentIndex, images.length]);

    const handleNext = () => {
        setInProp(false);
    };

    const handlePrev = () => {
        setInProp(false);
        setTimeout(() => {
            setCurrentIndex(
                (prevIndex) => (prevIndex - 1 + images.length) % images.length
            );
            setInProp(true);
        }, 500);
    };

    useEffect(() => {
        if (!inProp) {
            const timeout = setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
                setInProp(true);
            }, 500); // Duración de la transición
            return () => clearTimeout(timeout);
        }
    }, [inProp, images.length]);

    const goToSlide = (index) => {
        setInProp(false);
        setTimeout(() => {
            setCurrentIndex(index);
            setInProp(true);
        }, 500);
    };

    if (images.length === 0) return null;

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: { xs: "250px", md: "350px" },
                overflow: "hidden",
                borderRadius: "10px",
            }}
        >
            <Slide direction="left" in={inProp} timeout={500}>
                <CardMedia
                    component="img"
                    alt={`Imagen ${currentIndex + 1}`}
                    image={`${backendUrl}/storage/${images[currentIndex].path}`}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "10px",
                    }}
                />
            </Slide>

            {images.length > 1 && (
                <>
                    {/* Flecha izquierda */}
                    <IconButton
                        onClick={handlePrev}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: 10,
                            transform: "translateY(-50%)",
                            color: "white",
                        }}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>

                    {/* Flecha derecha */}
                    <IconButton
                        onClick={handleNext}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            right: 10,
                            transform: "translateY(-50%)",
                            color: "white",
                        }}
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>

                    {/* Puntos de navegación */}
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 10,
                            left: "50%",
                            transform: "translateX(-50%)",
                            display: "flex",
                            gap: 1,
                        }}
                    >
                        {images.map((_, index) => (
                            <IconButton
                                key={index}
                                onClick={() => goToSlide(index)}
                                sx={{
                                    color:
                                        currentIndex === index
                                            ? "white"
                                            : "gray",
                                }}
                            >
                                <FiberManualRecordIcon />
                            </IconButton>
                        ))}
                    </Box>
                </>
            )}
        </Box>
    );
};

export default ImageCarousel;
