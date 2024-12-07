import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Menu,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  TextField,
  Divider,
  IconButton,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import { useGetAllPetsQuery } from "../features/api/petApi";
import { PetCard } from "../Components";

const Pets = () => {
  const [filters, setFilters] = useState({ size: [], gender: [], age: "" });
  const [anchorEl, setAnchorEl] = useState(null);

  // Construcción de la query 
  const queryParams = new URLSearchParams();
  if (filters.size.length > 0) {
    queryParams.append("size", filters.size.join(","));
  }
  if (filters.gender.length > 0) {
    queryParams.append("gender", filters.gender.join(","));
  }
  if (filters.age) {
    queryParams.append("age", filters.age);
  }

  const { data, error, isFetching } = useGetAllPetsQuery(queryParams.toString());

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const updated = { ...prev };
      if (type === "size" || type === "gender") {
        updated[type] = prev[type].includes(value)
          ? prev[type].filter((v) => v !== value)
          : [...prev[type], value];
      } else {
        updated[type] = value;
      }
      return updated;
    });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 12 }}>
      <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    align="center"
                    color="#645b6d"
                >
                    MASCOTAS EN ADOPCIÓN
                </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<FilterAltIcon />}
            onClick={handleClick}
            sx={{ bgcolor: "#645b6d", color: "white", textTransform: "none", ":hover": { bgcolor: "#4A4A4A" } }}
          >
            Filtrar
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{ p: 2, width: 350 }}
            PaperProps={{
              style: {
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" sx={{ px: 2, py: 1, fontWeight: "bold" }}>
                Filtrar por
              </Typography>
              <IconButton onClick={handleClose} size="small">
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Typography sx={{ px: 2, fontWeight: "bold", mb: 1 }}>Tamaño</Typography>
            {[
              { id: "1", label: "Pequeño" },
              { id: "2", label: "Mediano" },
              { id: "3", label: "Grande" },
            ].map(({ id, label }) => (
              <FormControlLabel
                key={id}
                control={
                  <Checkbox
                    checked={filters.size.includes(id)}
                    onChange={() => handleFilterChange("size", id)}
                    sx={{ color: "#645b6d" }}
                  />
                }
                label={label}
                sx={{ px: 2, fontSize: "14px" }}
              />
            ))}

            <Typography sx={{ px: 2, fontWeight: "bold", mt: 2, mb: 1 }}>Género</Typography>
            {[
              { value: "MACHO", label: "Macho" },
              { value: "HEMBRA", label: "Hembra" },
            ].map(({ value, label }) => (
              <FormControlLabel
                key={value}
                control={
                  <Checkbox
                    checked={filters.gender.includes(value)}
                    onChange={() => handleFilterChange("gender", value)}
                    sx={{ color: "#645b6d" }}
                  />
                }
                label={label}
                sx={{ px: 2, fontSize: "14px" }}
              />
            ))}

            <Typography sx={{ px: 2, fontWeight: "bold", mt: 2, mb: 1 }}>Edad</Typography>
            <TextField
              label="Rango de edad"
              value={filters.age}
              onChange={(e) => handleFilterChange("age", e.target.value)}
              placeholder="Ejemplo: 1-3"
              fullWidth
              sx={{ px: 2, mt: 1, borderRadius: "4px" }}
              InputProps={{
                style: {
                  fontSize: "14px",
                },
              }}
            />
          </Menu>
        </Box>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress sx={{ color: "#645b6d" }} />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            Error: {error.message}
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "center",
              mt: 4,
            }}
          >
            {data?.data?.length > 0 ? (
              data.data.map((pet) => <PetCard key={pet.id} pet={pet} />)
            ) : (
              <Typography>No se encontraron mascotas</Typography>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Pets;
