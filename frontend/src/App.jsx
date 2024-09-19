import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./pages/Home";

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
      </Routes>
    </ThemeProvider>
  );
}

export default App;
