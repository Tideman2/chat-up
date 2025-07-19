import { styled } from "@mui/material";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  fontWeight: 500,
  margin: "9px",
  "&:hover": {
    textDecoration: "underline",
    color: theme.palette.primary.dark,
  },
}));

export default StyledLink;
