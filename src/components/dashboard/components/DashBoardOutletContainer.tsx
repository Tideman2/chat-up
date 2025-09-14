import { Grid, useTheme, Box, Typography } from "@mui/material";

import { DashBoardOutletContainerProps } from "../types";
import React from "react";
import theme from "../../../config/theme";

let DefaultContent2: React.FC = () => {
  return (
    <Box
      sx={{
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
        size={4}
        sx={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {content1}
      </Grid>
      <Grid
        size={7}
        sx={
          isDefault
            ? {
                position: "fixed",
                top: 0,
                right: 0,
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }
            : {}
        }
      >
        {isDefault ? <DefaultContent2 /> : content2}
      </Grid>
    </>
  );
}
