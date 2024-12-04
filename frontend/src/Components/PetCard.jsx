import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../constants";
// Estilos personalizados para la tarjeta
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  borderRadius: 12,
  boxShadow: theme.shadows[5],
}));

const StyledCardMedia = styled(CardMedia)({
  height: 200, // Aumenta la altura de la imagen
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  objectFit: "cover", // Asegura que la imagen cubra el área sin distorsionarse
});

const PetCard = ({ pet }) => {
  const navigate = useNavigate();

  const handleverInfoClick = (id) => {
    navigate(`/verInfo/${id}`);
  };
  return (
    <StyledCard>
      <StyledCardMedia
        component="img"
        image={`${backendUrl}/storage/${pet.images[0].path}`}
        alt={pet.name}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {pet.name.toUpperCase()}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {pet.gender}
        </Typography>
        
        <Typography variant="body2" component="div">
          Tamaño: {pet.size.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Tipo: {pet.breed.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Edad: {pet.age}
        </Typography>
      
       
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => handleverInfoClick(pet.id)}
        >
          Ver Más
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default PetCard;
