import { Outlet } from "react-router-dom";
import { Grid, styled, Stack, Divider, Box } from "@mui/material";

import ChatIcon from "@mui/icons-material/Chat";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import DashBoardLink from "./components/DashBoardLink";

let DashBoardRoot = styled(Grid)(({ theme }) => {
  return {
    width: "100%",
    height: "100vh",
    overflow: "hidden", // Prevent outer scrolling
    maxHeight: "100vh", // Constrain height
  };
});

export default function DashBoardLayout() {
  return (
    <DashBoardRoot container>
      <Grid
        size={0.6}
        sx={{
          height: "100vh",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: "fit-content",
          }}
        >
          <Stack spacing={1} padding={1}>
            <DashBoardLink
              linkIcon={
                <ChatIcon
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                    borderRadius: "50%",
                    fontSize: 24,
                  }}
                />
              }
              path="/app/chat"
            />

            <DashBoardLink
              path=""
              linkIcon={
                <PhoneOutlinedIcon
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                    borderRadius: "50%",
                  }}
                />
              }
            />

            <DashBoardLink
              path=""
              linkIcon={
                <UpdateOutlinedIcon
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                    borderRadius: "50%",
                  }}
                />
              }
            />

            <Divider />

            <DashBoardLink
              path=""
              linkIcon={
                <ArchiveOutlinedIcon
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                    borderRadius: "50%",
                  }}
                />
              }
            />

            <DashBoardLink
              path=""
              linkIcon={
                <StarBorderOutlinedIcon
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                    borderRadius: "50%",
                  }}
                />
              }
            />

            <Divider />
          </Stack>

          <Box padding={1} sx={{ marginBottom: "10px" }}>
            <DashBoardLink
              path=""
              linkIcon={
                <SettingsOutlinedIcon
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                    borderRadius: "50%",
                  }}
                />
              }
            />
          </Box>
        </Box>
      </Grid>
      <Outlet></Outlet>
    </DashBoardRoot>
  );
}
