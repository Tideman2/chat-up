import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";

import Router from "./Router";
import theme from "./config/theme";
import { UserContextProvider } from "./contexts/autentication-context/UserContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <CssBaseline />
        <RouterProvider router={Router} />
      </UserContextProvider>
    </ThemeProvider>
  </StrictMode>
);
