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
  objectFit: 'cover', // Asegura que la imagen cubra el área sin distorsionarse
});

const PetCard = ({ pet }) => {
  const navigate = useNavigate();

  const handleverInfoClick = () => {
    navigate("/verInfo"); 
  };
  return (
    <StyledCard>
      <StyledCardMedia
        component="img"
        image={`http://localhost:8000/storage/${pet.images[0].path}`}
        alt={pet.name}
      />
      <CardContent>
        <Typography variant="h6" component="div" >
          {pet.name.toUpperCase()}
        </Typography>
        <Typography variant="h6" component="div">
          {pet.sexo}
        </Typography>
        <Typography variant="body2" component="div">
          {pet.size.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {pet.age} - {pet.breed.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          {pet.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary"
        onClick={handleverInfoClick}
        >
         
          Ver Más
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default PetCard;
