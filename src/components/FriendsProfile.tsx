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
  let { userId: userIdFromAuth, name: userNameFromAuth } = userState;
  let msgSocket = socketState.socket;

  // useEffect(() => {
  //   if (!msgSocket) return;
  //   console.log("useEffct in FriendsProfile ran");
  //   const handleEntryToDmResponse = (data) => {
  //     console.log("Server response:", data);
  //   };

  //   const handleNewMessage = (messageData) => {
  //     console.log("New message received:", messageData);
  //   };

  //   const handleConnectError = (error: { message: string }) => {
  //     console.error("Socket connection error:", error);
  //   };

  //   const handleSocketError = (error: { message: string }) => {
  //     console.error("Error from server:", error);
  //   };

  //   // Register event listeners
  //   msgSocket.on("entry_to_dm_response", handleEntryToDmResponse);
  //   msgSocket.on("new_message", handleNewMessage);
  //   msgSocket.on("connect_error", handleConnectError);
  //   msgSocket.on("error", handleSocketError);

  //   // Emit event (only once)
  //   if (msgSocket.connected) {
  //     msgSocket.emit("entry_to_private_dm", {
  //       userId: userIdFromAuth,
  //       receiverId: userId,
  //     });
  //   } else {
  //     msgSocket.once("connect", () => {
  //       msgSocket.emit("entry_to_private_dm", {
  //         userId: userIdFromAuth,
  //         receiverId: userId,
  //       });
  //     });
  //   }

  //   // Cleanup
  //   return () => {
  //     msgSocket.off("entry_to_dm_response", handleEntryToDmResponse);
  //     msgSocket.off("connect_error", handleConnectError);
  //     msgSocket.off("error", handleSocketError);
  //   };
  // }, []);

  function onFriendProfileClick() {
    console.log("UI State:", uiState);
    console.log("Socket State:", socketState);
    console.log("userInfo", userNameFromAuth, dmName);

    uiDispatch({
      type: "SET-CHATMATE",
      payload: { username: dmName, userId: Number(userId) },
    });
    if (!uiState.isChatRoomActive) {
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
