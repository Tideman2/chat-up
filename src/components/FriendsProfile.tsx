import { Box, Avatar, Typography } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { Socket } from "socket.io-client";

import useMessageSocket from "../hooks/socket/useMessageSocket";
import { useMsgSocket } from "../contexts/msgSocketCtx/MsgSocketCtx";
import useAuth from "../hooks/useAuth";
import useUiCtx from "../hooks/useUiCtx";

type ChatBoxProps = {
  userName: string;
  userId: string;
};

export default function FriendsProfile({
  userName: dmName,
  userId,
}: ChatBoxProps) {
  let { state: uiState, dispatch: uiDispatch } = useUiCtx();
  let { isChatRoomActive } = uiState;

  function onFriendProfileClick() {
    uiDispatch({
      type: "SET-CHATMATE",
      payload: {
        username: dmName,
        userId: Number(userId),
        roomId: null,
      }, // Use roomId here
    });
    // Only show chat room if it's hidden
    if (!isChatRoomActive) {
      uiDispatch({ type: "TOGGLE-CHATROOM" });
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        columnGap: "10px",
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
    </Box>
  );
}
