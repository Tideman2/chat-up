import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";
import { Container } from "@mui/material";

import { FormWrapper, LogoText } from "./components/AuthWrapper";

const socket = io("http://localhost:5000"); // your Flask server

export default function AutenticationLayout() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server with ID:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

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
