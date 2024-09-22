import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#645b6d", // morado
    },
    secondary: {
      main: "#ffab91", // Coral pastel
    },
    texto: {
      main: "#fdfbfe", // blanco
    },
    box: {
      main: "#c9b6db", // morado
    },
    dark: {
      main: "#645b6d", // fuerte morado
    },
    back:{
        main: "#cba9db",
          },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export { lightTheme };
