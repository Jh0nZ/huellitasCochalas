import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActions,
    Grid2 as Grid,
} from "@mui/material";
import { useGetAdoptionRequestQuery } from "../features/api/adoptionRequestApi";
import { useParams } from "react-router-dom";

const Solicitud = () => {
    const { adoption_request_id } = useParams();
    const { data, error, isLoading } =
        useGetAdoptionRequestQuery(adoption_request_id);

    if (isLoading) {
        return (
            <Typography variant="h6" textAlign="center">
                Cargando solicitud...
            </Typography>
        );
    }
    const onAccept = (id) => {
        console.log("Aceptar solicitud", id);
    };

    const onReject = (id) => {
        console.log("Rechazar solicitud", id);
    };

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:8000/storage/${data.adoptionRequest.images[0].path}`}
                    alt={`Imagen de la casa`}
                />
                <CardContent>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        Solicita adoptar a: {data.adoptionRequest.status.toUpperCase()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Descripción de la solicitud: {data.adoptionRequest.additional_notes}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => onAccept(data.adoptionRequest.id)}
                    >
                        Aceptar
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => onReject(data.adoptionRequest.id)}
                    >
                        Rechazar
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Solicitud;
