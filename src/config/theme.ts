import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: "none",
          margin: "9px",
        },
      },
    },
  },
  palette: {
    // 🌟 Main branding color - Used for AppBar, Buttons, Links, etc.
    primary: {
      main: "#075E54",
      500: "#075E54",
      contrastText: "#ffffff",
    },

    // 🌟 Accent color - Used for action buttons like "Send", FAB, etc.
    secondary: {
      main: "#25D366",
      contrastText: "#ffffff",
    },

    // 🪵 Used for app background
    background: {
      default: "#ECE5DD",
      paper: "#ffffff", // For cards, chat bubbles
    },

    // 🖊️ Used for most text
    text: {
      primary: "#1A1C1F", // Main text
      secondary: "#4F4F4F", // Subtle text like time, subtitles
    },

    error: {
      main: "#D32F2F",
    },
  },

  typography: {
    fontFamily: "Roboto, Arial",
    h1: {
      fontSize: 28,
      fontWeight: 600,
      marginBottom: 5,
      color: `#1A1C1F`, // Primary text color
    },
    body1: {
      fontSize: 16,
      color: "#1A1C1F",
    },
    caption: {
      fontSize: 12,
      color: "#4F4F4F", // Timestamps or less important text
    },
    textTypo: {
      fontSize: "1rem",
      fontWeight: 500,
      color: "#1A1C1F",
    },
  },
});

export default theme;
