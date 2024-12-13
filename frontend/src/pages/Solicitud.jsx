import {
    Button,
    Card,
    CardContent,
    Container,
    CardMedia,
    Typography,
    CardActions,
    Grid,
    Box,
} from "@mui/material";
import { useGetAdoptionRequestQuery } from "../features/api/adoptionRequestApi";
import { useUpdateAdoptionRequestMutation } from "../features/api/adoptionRequestApi";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { OpenMapLabel } from "../Components";
import { backendUrl } from "../constants";

const Solicitud = () => {
    const navigate = useNavigate();
    const { adoption_request_id } = useParams();
    const [
        updateAdoptionRequest,
        {
            data: updateDatam,
            error: updateError,
            isError: isUpdateError,
            isSuccess: isUpdateSuccess,
            isLoading: isUpdateLoading,
        },
    ] = useUpdateAdoptionRequestMutation();

    useEffect(() => {
        if (isUpdateError) {
            console.error("Error:", updateError);
        }
        if (isUpdateSuccess) {
            console.log("Data:", updateDatam);
            navigate("/");
        }
    }, [
        updateDatam,
        updateError,
        isUpdateError,
        isUpdateLoading,
        isUpdateSuccess,
    ]);
    
    const { data, error, isLoading, isSuccess, isError } =
        useGetAdoptionRequestQuery(adoption_request_id);

    useEffect(() => {
        if (isSuccess) {
            console.log(data);
        }
        if (isError) {
            console.log(error);
        }
    }, [data, error, isError, isSuccess]);

    if (isLoading || isUpdateLoading) {
        return (
            <Typography variant="h6" textAlign="center">
                Cargando solicitud...
            </Typography>
        );
    }

    const onAccept = (id) => {
        console.log("Aceptar solicitud", id);
        updateAdoptionRequest({
            data: {
                status: "accepted",
            },
            id: id,
        });
    };

    const onReject = (id) => {
        console.log("Rechazar solicitud", id);
        updateAdoptionRequest({
            data: {
                status: "rejected",  
            },
            id: id,
        });
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 12, mb: 8 }}>
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                align="center"
                color="#645b6d"
            >
                DETALLES DE LA SOLICITUD
            </Typography>
            <Card
                sx={{
                    boxShadow: 4,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" }, // Layout responsive
                }}
            >
                {/* Imagen de la casa en la parte izquierda */}
                <CardMedia
                    component="img"
                    height="300"
                    image={`${backendUrl}/storage/${data.adoptionRequest.images[0].path}`}
                    alt={`Imagen de la solicitud`}
                    sx={{
                        objectFit: "cover",
                        width: { xs: "100%", md: "50%" }, 
                    }}
                />

                {/* Contenido de la solicitud en la parte derecha */}
                <CardContent
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: { xs: 2, md: 3 }, 
                    }}
                >
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        Solicita adoptar a:{" "}
                        {data.adoptionRequest.status.toUpperCase()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Descripción de la solicitud:{" "}
                        {data.adoptionRequest.additional_notes}
                    </Typography>

                    <Box
                        sx={{
                            width: "100%",
                            height: { xs: "200px", md: "200px" },
                            overflow: "hidden",
                            mt: 2,
                        }}
                    >
                        <OpenMapLabel
                            location={{
                                lat: data.adoptionRequest.lat,
                                lng: data.adoptionRequest.lng,
                            }}
                        />
                    </Box>

                    {/* Botones debajo de la descripción */}
                    <Box sx={{ mt: 3 }}>
                        <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            size="small" 
                            onClick={() => onAccept(data.adoptionRequest.id)}
                        >
                            Aceptar
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            fullWidth
                            size="small" 
                            onClick={() => onReject(data.adoptionRequest.id)}
                            sx={{ mt: 2 }}
                        >
                            Rechazar
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Solicitud;
