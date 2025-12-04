import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { Grid, styled, Stack, Divider, Box } from "@mui/material";

import ChatIcon from "@mui/icons-material/Chat";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useNotificationSocket } from "../../contexts/notificationSckCtx/NotificationSckCtx";
import { useNotification } from "../../contexts/notificationContext/NotificationCtx";

import DashBoardLink from "./components/DashBoardLink";
import { BASEURL } from "../../utils/api";

let DashBoardRoot = styled(Grid)(({ theme }) => {
  return {
    width: "100vw",
    height: "100vh",
    overflow: "hidden", // Prevent outer scrolling
    maxHeight: "100vh", // Constrain height
  };
});

export default function DashBoardLayout() {
  let { state: notificationSoc } = useNotificationSocket();
  let { state: notificationState, dispatch: notificationDispatch } =
    useNotification();
  let notificationSocket = notificationSoc.socket;

  useEffect(() => {
    if (!notificationSocket) return;

    const fetchUnreadMessages = async () => {
      const url = BASEURL + "/notifications/get_unread_notifications";
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Unread notifications:", data);
        return data;
      } else {
        console.error("Failed to fetch unread notifications");
      }
    };

    let handleTestSockett = () => {
      console.log("socket test ran");
    };

    console.log("I ran");
    notificationSocket.emit("tests_socket", handleTestSockett);

    //here we will fetch all unread messages
    //Add them to the notification context so all consumers can react to it
    const run = async () => {
      const data = await fetchUnreadMessages();

      if (data?.length > 0) {
        notificationDispatch({
          type: "ADD-NOTIFICATIONS",
          payload: data.notifications,
        });
      }
    };

    run();
  }, []);

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
