import { NavLink } from "react-router-dom";
import { styled, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { DashBoardLinkProps } from "../types";

const ThemedNavLink = styled(NavLink)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 48,
  height: 48,
  padding: "10px 6px",
  textDecoration: "none",
  borderRadius: "4px",
  transition: "background-color 0.3s ease",
  "&.active": {
    backgroundColor: theme.palette.link.active,
  },
  "&:hover:not(.active)": {
    backgroundColor: theme.palette.link.hover,
  },
}));

export default function DashBoardLink({ linkIcon, path }: DashBoardLinkProps) {
  //   return <ThemedNavLink to={path}>{linkIcon}</ThemedNavLink>;

  return (
    <ThemedNavLink to={path} end>
      {linkIcon}
    </ThemedNavLink>
  );
}
