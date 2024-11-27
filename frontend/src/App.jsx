import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { Route, Routes } from "react-router-dom";

import { Login, NotFound, PetRegister, Pets, Infopets } from "./pages";
import { AdoptionRequest, NavBar } from "./components";
import Home from "./pages/Home";
import UserRegister from "./pages/UserRegister";
import { lightTheme } from "./theme";
import UserProfile from "./pages/UserProfile";
import Solicitudes from "./pages/Solicitudes";
import Solicitud from "./pages/Solicitud";
import MapPicker from "./components/MapPicker";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/verInfo/:pet_id" element={<Infopets/>} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/solicitudes/:pet_id" element={<Solicitudes />} />
        <Route path="/solicitud/:adoption_request_id" element={<Solicitud/>} />
        <Route path="/pet-register" element={<PetRegister />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/adoption-request/:pet_id" element={<AdoptionRequest />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<UserProfile/>} />
        <Route path="/testmap" element={<MapPicker/>} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
