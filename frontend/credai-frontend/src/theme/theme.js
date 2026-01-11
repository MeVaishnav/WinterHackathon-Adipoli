import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0D0F12",
      paper: "#161A1E",
    },
    primary: { main: "#3A8DFF" },
    success: { main: "#4ECB71" },
    error: { main: "#FF4D4F" },
    warning: { main: "#F0C324" },
    text: {
      primary: "#E6E6E6",
      secondary: "#A1A7B3",
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});

export default theme;
