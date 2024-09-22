import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { AdoptionRequest, NavBar } from "./Components/Index";
import { Login, NotFound, PetRegister, Pets } from "./pages";
import Home from "./pages/Home";
import UserRegister from "./pages/UserRegister";
import { lightTheme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/register-pet" element={<PetRegister />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/adoption-request" element={<AdoptionRequest />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
