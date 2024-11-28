import React, { useEffect, useState, forwardRef, useRef } from "react";
import {
    AppBar,
    Container,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Button,
    Menu,
    MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../features/api/userApi";

const pages = ["HOME", "REGISTRATE", "PET REGISTER"];
const settings = ["Perfil", "Cerrar sesión"];

const NavBar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [logoutUser, { data, isSuccess, error, isError }] =
        useLogoutUserMutation();

    useEffect(() => {
        if (isSuccess) {
            console.log("Logout successful", data);
            localStorage.removeItem("user");
            navigate("/login");
        }
        if (isError) {
            console.log("Logout failed", error);
        }
    }, [isSuccess, isError, data, error]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handlePageClick = (page) => {
        handleCloseNavMenu();
        if (page === "REGISTRATE") {
            navigate("/register");
        }
        if (page === "HOME") {
            navigate("/home");
        }
        if (page === "PET REGISTER") {
            navigate("/pet-register");
        }
    };

    const handleSettingsClick = (settings) => {
        handleCloseNavMenu();
        if (settings === "Cerrar sesión") {
            navigate("/login");
            logoutUser();
        }
        if (settings === "Perfil") {
            navigate("/perfil");
        }
    };
    return (
        <AppBar sx={{ backgroundColor: "#9567AB"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Logo grande para pantallas medianas y grandes */}
                    <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
                        <img
                            src="/Huellitas.png"
                            alt="Huellitas icon"
                            style={{ width: "120px", height: "auto" }} // Ajuste de tamaño
                        />
                    </Box>

                    {/* Menú hamburguesa para pantallas pequeñas */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: "block", md: "none" } }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={() => handlePageClick(page)}
                                >
                                    <Typography textAlign="center">
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Logo pequeño para pantallas pequeñas */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src="/Huellitas.png"
                            alt="Huellitas icon"
                            style={{ width: "80px", height: "auto" }} // Tamaño reducido
                        />
                    </Box>

                    {/* Botones de navegación para pantallas grandes */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                            justifyContent: "center",
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => handlePageClick(page)}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {/* Menú de usuario */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Button
                            onClick={handleOpenUserMenu}
                            sx={{ my: 2, color: "white" }}
                        >
                            Perfil
                        </Button>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={() => handleSettingsClick(setting)}
                                >
                                    <Typography textAlign="center">
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;
