import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { Route, Routes } from "react-router-dom";

import { Login, NotFound, PetRegister, Pets, Infopets } from "./pages";
import { AdoptionRequest, NavBar } from "./Components";
import Home from "./pages/Home";
import UserRegister from "./pages/UserRegister";
import { lightTheme } from "./theme";
import UserProfile from "./pages/UserProfile";
import Solicitudes from "./pages/Solicitudes";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/verInfo/:pet_id" element={<Infopets/>} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/solicitudes" element={<Solicitudes />} />
        <Route path="/pet-register" element={<PetRegister />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/adoption-request/:pet_id" element={<AdoptionRequest />} />
        <Route path="/login" element={<Login />} />
        <Route path="perfil" element={<UserProfile/>} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
