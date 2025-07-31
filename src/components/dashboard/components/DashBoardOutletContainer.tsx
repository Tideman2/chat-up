import { Grid, useTheme } from "@mui/material";

import { DashBoardOutletContainerProps } from "../types";

let DefaultForContent2;

export default function DashBoardOutletContainer({
  content1,
  content2,
}: DashBoardOutletContainerProps) {
  let theme = useTheme();
  return (
    <>
      <Grid
        size={4}
        sx={{
          backgroundColor: theme.palette.background.paper,
        }}
      ></Grid>
      <Grid size={7}></Grid>
    </>
  );
}
