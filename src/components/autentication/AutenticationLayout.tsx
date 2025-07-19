import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

import { FormWrapper, LogoText } from "./components/AuthWrapper";

export default function AutenticationLayout() {
  return (
    <>
      <FormWrapper>
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LogoText variant="h1">Chat-up</LogoText>
          <Outlet />
        </Container>
      </FormWrapper>
    </>
  );
}
