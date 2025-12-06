import { Box, Avatar, Typography } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

import useUiCtx from "../hooks/useUiCtx";
import { useNotificationSocket } from "../contexts/notificationSckCtx/NotificationSckCtx";

type ChatBoxProps = {
  userName: string;
  userId: string;
};

// This component handles the updating of the chatroom to the clicked component
// it basically handles the chatRoom view

export default function FriendsProfile({
  userName: dmName,
  userId,
}: ChatBoxProps) {
  let { state: uiState, dispatch: uiDispatch } = useUiCtx();
  let { isChatRoomActive, privateRoomChatMateData } = uiState;
  let { username } = privateRoomChatMateData;
  let notificationSocketCtx = useNotificationSocket();
  let notificationSocket = notificationSocketCtx.state.socket;
  let [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    if (!notificationSocket) return;
    //function to handle new nohtifications and check them against Friends Id
    //handles real time update of notification badge
    function onNewNotifications(data: any) {
      if (privateRoomChatMateData.roomId) {
        if (
          privateRoomChatMateData.roomId !== data.roomId &&
          data.senderId === userId
        ) {
          setNotificationCount((prev) => prev + 1);
        }
      }
      console.log(data, "Notification from FreiendsProfile component");
    }
    notificationSocket.on("new_message_notification", onNewNotifications);

    return () => {
      setNotificationCount(0);
      notificationSocket.off("new_message_notification", onNewNotifications);
    };
  }, [privateRoomChatMateData, userId, notificationSocket]);

  function onFriendProfileClick() {
    uiDispatch({
      type: "SET-CHATMATE",
      payload: {
        username: dmName,
        userId: Number(userId),
        roomId: null,
      },
    });

    // Only show chat room if it's hidden
    if (!isChatRoomActive) {
      uiDispatch({ type: "TOGGLE-CHATROOM" });
    }
  }

  function checkIfProfileIsActiveDM(theme: any) {
    if (dmName === username) {
      return theme.palette.link.active;
    }
    return theme.palette.background.paper;
  }

  return (
    <Box
      sx={{
        backgroundColor: (theme) => checkIfProfileIsActiveDM(theme),
        display: "flex",
        paddingY: "10px",
        columnGap: 1,
        paddingX: "10px",
        borderRadius: "5px",
        alignItems: "center",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: (theme) =>
            dmName === username ? "" : theme.palette.link.hover, // change color on hover
        },
      }}
      onClick={() => {
        onFriendProfileClick();
      }}
      key={userId}
    >
      <Avatar sx={{ bgcolor: (theme) => theme.palette.secondary.main }}>
        U-S
      </Avatar>
      <Typography fontWeight={"bold"}>{dmName}</Typography>
      {notificationCount > 0 && (
        <Typography
          fontSize={"10px"}
          minWidth={"20px"}
          height={"20px"}
          display={"flex"}
          alignItems={"center"}
          marginLeft={"auto"}
          justifyContent={"center"}
          bgcolor={"#ff4444"}
          color="white"
          borderRadius={"50%"}
          fontWeight={"bold"}
          sx={{
            animation: "pulse 2s infinite",
            "@keyframes pulse": {
              "0%": { transform: "scale(1)" },
              "50%": { transform: "scale(1.1)" },
              "100%": { transform: "scale(1)" },
            },
          }}
        >
          {notificationCount}
        </Typography>
      )}
    </Box>
  );
}
