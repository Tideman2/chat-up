import { Box, Avatar, Typography } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { Socket } from "socket.io-client";

import useMessageSocket from "../hooks/socket/useMessageSocket";
import useAuth from "../hooks/useAuth";
import useUiCtx from "../hooks/useUiCtx";
import theme from "../config/theme";

type ChatBoxProps = {
  userName: string;
  userId: string;
};

export default function FriendsProfile({
  userName: dmName,
  userId,
}: ChatBoxProps) {
  let { state: uiState, dispatch: uiDispatch } = useUiCtx();
  let { isChatRoomActive, privateRoomChatMateData } = uiState;
  let { username } = privateRoomChatMateData;

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
      <Typography
        fontSize={"12px"}
        ml={"auto"}
        bgcolor={"red"}
        p={"5px"}
        color="white"
        borderRadius={"50%"}
      >
        23
      </Typography>
    </Box>
  );
}
