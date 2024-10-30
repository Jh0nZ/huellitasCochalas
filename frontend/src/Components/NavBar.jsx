import React, { useEffect } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../features/api/userApi";

const pages = ["HOME", "REGISTRATE", "PET REGISTER"];
const settings = ["Perfil", "Cerrar sesión"];

function NavBar() {
  const [logoutUser, { data, isSuccess, error, isError }] =
    useLogoutUserMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log("Logout successful", data);
      navigate("/login");
    }
    if (isError) {
      console.log("Logout failed", error);
    }
  }, [isSuccess, isError, data, error]);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
  const navigate = useNavigate();
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
      logoutUser();
    }
    if (settings === "Perfil") {
      navigate("/perfil");
    }
  };
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#9567AB" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo grande en pantallas md+ */}
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
            <img
              src="/Huellitas.png"
              alt="Huellitas icon"
              style={{ maxWidth: "20%", height: "auto" }}
            />
          </Box>

          {/* Menú responsivo (Icono de menú en pantallas xs-md) */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                <MenuItem key={page} onClick={() => handlePageClick(page)}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo pequeño en pantallas xs */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src="/Huellitas.png"
              alt="huellitas icon"
              style={{ maxWidth: "40%", height: "auto" }}
            />
          </Typography>

          {/* Menú de páginas en pantallas md+ */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
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
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/images/hombre.jpeg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "40px" }}
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
                  <Typography sx={{ textAlign: "center" }}>
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
}

export default NavBar;
