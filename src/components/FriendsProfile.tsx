import { Box, Avatar, Typography } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import useUiCtx from "../hooks/useUiCtx";
import { useNotificationSocket } from "../contexts/notificationSckCtx/NotificationSckCtx";
import { NotificationType } from "../contexts/react-query/useUserNotification";
import useUserNotification from "../contexts/react-query/useUserNotification";

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
  let { state: notificationSoc } = useNotificationSocket();
  let notificationSocket = notificationSoc.socket;
  let { state: uiState, dispatch: uiDispatch } = useUiCtx();
  let { isChatRoomActive, privateRoomChatMateData } = uiState;
  let { username } = privateRoomChatMateData;
  const queryClient = useQueryClient();
  // Use the hook to get unread notifications
  const { data: notificationData } = useUserNotification();

  // filter unread notifications
  const unreadNotifications: NotificationType[] =
    notificationData?.notifications?.filter(
      (notification) =>
        notification.senderId === Number(userId) && !notification.isRead
    ) || [];

  console.log(unreadNotifications.length, "unread notifications length");

  function onFriendProfileClick() {
    console.log("friend profile clicked:", dmName, userId);
    console.log("i raaannnn after click");
    uiDispatch({
      type: "SET-CHATMATE",
      payload: {
        username: dmName,
        userId: Number(userId),
        roomId: null,
      },
    });

    //set unread notifications as read
    if (notificationSocket) {
      unreadNotifications.forEach((notification) => {
        console.log(notification.isRead, "notification read status");
        notificationSocket.emit("set_notification_as_read", {
          notificationId: notification.id,
        });
      });
    }
    // Invalidate the query to refetch unread notifications
    queryClient.invalidateQueries({ queryKey: ["userNotifications"] });

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
      {unreadNotifications?.length > 0 && (
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
              "50%": { transform: "scale(1.3)" },
              "100%": { transform: "scale(1)" },
            },
          }}
        >
          {unreadNotifications.length}
        </Typography>
      )}
    </Box>
  );
}
