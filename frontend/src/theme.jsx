import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#a5d6a7", // Verde pastel
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
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export { lightTheme };
