import React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import { backendUrl } from "../constants";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  width: "100%",
  borderRadius: 12,
  overflow: "hidden",
  boxShadow: theme.shadows[5],
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageText = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  color: theme.palette.common.white,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  padding: theme.spacing(1),
  textAlign: "center",
}));

const PetSolicitudes = ({ pet }) => {
  const navigate = useNavigate();


  const handleVerInfoClick = (id) => {
    navigate(`/solicitudes/${id}`);
    
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 300,
        margin: "8px auto",
        display: "inline-block", 
      }}
    >
      <ImageButton onClick={() => handleVerInfoClick(pet.id)} focusRipple>
        <ImageSrc
          style={{
            backgroundImage: `url(${backendUrl}/storage/${pet.images[0].path})`,
          }}
        />
        <ImageBackdrop className="MuiImageBackdrop-root" />
        <ImageText>
          <Typography variant="h6" component="div">
            Ver Solicitudes
          </Typography>
        </ImageText>
      </ImageButton>
      <CardContent sx={{ padding: "8px", textAlign: "center" }}>
        <Typography variant="subtitle1" component="div" sx={{ fontWeight: "bold" }}>
          {pet.name.toUpperCase()}
        </Typography>
        
      </CardContent>
    </Box>
  );
};

export default PetSolicitudes;
