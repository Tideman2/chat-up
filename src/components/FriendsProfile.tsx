import { Box, Avatar, Typography } from "@mui/material";
import { useEffect } from "react";

import { useMsgSocket } from "../contexts/msgSocketCtx/MsgSocketCtx";
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
  let { state: socketState, dispatch: socketDispatch } = useMsgSocket();
  let { state: userState } = useAuth();

  let msgSocket = socketState.socket;

  function onFriendProfileClick() {
    console.log("UI State:", uiState);
    console.log("Socket State:", socketState);
    console.log("userInfo", userState.name, dmName);

    uiDispatch({
      type: "SET-CHATMATE",
      payload: { username: dmName, userId: Number(userId) },
    });
    if (!uiState.isChatRoomActive) {
      uiDispatch({ type: "TOGGLE-CHATROOM" });
    }

    // 2. Tell server to create/find DM room
    msgSocket?.emit("entry_to_private_dm", {
      userId: userState.userId,
      receiverId: userId,
    });
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
