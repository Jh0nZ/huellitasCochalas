import {
    Button,
    Card,
    CardContent,
    Container,
    CardMedia,
    Typography,
    CardActions,
    Grid2 as Grid,
} from "@mui/material";
import { useGetAdoptionRequestQuery } from "../features/api/adoptionRequestApi";
import { useUpdateAdoptionRequestMutation } from "../features/api/adoptionRequestApi";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
    const { data, error, isLoading } =
        useGetAdoptionRequestQuery(adoption_request_id);

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
                status: "accepted",
            },
            id: id,
        });
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 12, mb: 8 }}>
             <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    align="center"
                    color="#645b6d"
                >
                   DETALLES DE LA SOLICITUD
                </Typography>
          <Card sx={{ maxWidth: 345, boxShadow: 4, borderRadius: 2, overflow: "hidden" }}>
            <CardMedia
              component="img"
              height="180"
              image={`http://localhost:8000/storage/${data.adoptionRequest.images[0].path}`}
              alt={`Imagen de la solicitud`}
              sx={{ objectFit: "cover" }}
            />
             <CardContent>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        Solicita adoptar a:{" "}
                        {data.adoptionRequest.status.toUpperCase()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Descripción de la solicitud:{" "}
                        {data.adoptionRequest.additional_notes}
                    </Typography>
                </CardContent>
            <CardActions sx={{ display: "flex", flexDirection: "column", gap: 2, p: 1 }}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                
                onClick={() => onAccept(data.adoptionRequest.id)}
              >
                Aceptar
              </Button>
              <Button
                variant="contained"
                color="error"
                fullWidth
                
                onClick={() => onReject(data.adoptionRequest.id)}
              >
                Rechazar
              </Button>
            </CardActions>
          </Card>
        </Container>
    );
};

export default Solicitud;
