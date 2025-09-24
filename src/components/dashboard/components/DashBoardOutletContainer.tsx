import { Grid, useTheme, Box, Typography, keyframes } from "@mui/material";

import { DashBoardOutletContainerProps } from "../types";
import React from "react";
import theme from "../../../config/theme";

let DefaultContent2: React.FC = () => {
  const fadeInOut = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

  return (
    <Box
      sx={{
        animation: `${fadeInOut} 3s ease-in-out infinite`,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          color: (theme) => theme.palette.secondary.main,
          fontSize: "19px",
        }}
      >
        Welcome to
      </Typography>
      <Typography
        sx={{
          fontSize: "36px",
          fontWeight: "bold",
        }}
      >
        CHAT-UP
      </Typography>
    </Box>
  );
};

export default function DashBoardOutletContainer({
  content1,
  content2,
}: DashBoardOutletContainerProps) {
  let theme = useTheme();
  const isDefault = !content2;

  return (
    <>
      <Grid
        size={3}
        sx={{
          backgroundColor: theme.palette.background.paper,
          overflowY: "auto",
          height: "100%",
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari
          },
        }}
      >
        {content1}
      </Grid>
      <Grid
        size={8.4}
        sx={
          isDefault
            ? {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }
            : {
                overflowY: "auto",
                height: "100%",
                scrollbarWidth: "none", // Firefox
                "&::-webkit-scrollbar": {
                  display: "none", // Chrome, Safari
                },
              }
        }
      >
        {isDefault ? <DefaultContent2 /> : content2}
      </Grid>
    </>
  );
}
