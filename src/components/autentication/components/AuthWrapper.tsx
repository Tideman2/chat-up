import { styled, Box, Typography } from "@mui/material";

export let FormWrapper = styled(Box)(() => {
  return {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
});

export let LogoText = styled(Typography)(({ theme }) => {
  return {
    textAlign: "center",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1),
    width: "fit-content",
  };
});
