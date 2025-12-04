import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { QueryProvider } from "./contexts/react-query";
import Router from "./Router";
import theme from "./config/theme";
import ContextWrapper from "./contexts/ContextWrapper";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ContextWrapper>
        <CssBaseline />
        <QueryProvider>
          <RouterProvider router={Router} />
        </QueryProvider>
      </ContextWrapper>
    </ThemeProvider>
  </StrictMode>
);
