import React from "react";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components";
import Home from "./pages/Home";
import { PetRegister } from "./pages";

import UserRegister from "./pages/UserRegister";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/pets" element={<PetRegister />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
