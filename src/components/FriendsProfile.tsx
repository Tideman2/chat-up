import { Box, Avatar, Typography } from "@mui/material";
import { useEffect, useState } from "react";

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
  let { state: socketState, dispatch: socketDispatch } = useMsgSocket();
  let { state: userState } = useAuth();
  let { isChatRoomActive, privateRoomChatMateData, currentRoomId } = uiState;
  let { userId: userIdFromAuth, name: userNameFromAuth } = userState;
  let msgSocket = socketState.socket;
  const [roomIdLocalToComponent, setRoomIdLocalToComponent] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (!msgSocket) return;

    const handleEntryToDmResponse = (data: any) => {
      let { roomId, messages, senderId, receiverId } = data;
      console.log("currentRoomId", roomId);
      const a = [senderId, receiverId];
      console.log({ a, userId, userIdFromAuth });

      if (a.includes(userId) && a.includes(userIdFromAuth)) {
        uiDispatch({
          type: "SET-CHATMATE",
          payload: { username: dmName, userId: Number(userId), roomId }, // Use roomId here
        });
        setRoomIdLocalToComponent(roomId);
        uiDispatch({
          type: "SET_ROOM_MESSAGES",
          payload: { roomId, messages },
        });
      }
    };

    const handleNewMessage = (messageData: any) => {
      // console.log("New message received:", messageData);
    };

    const handleConnectError = (error: { message: string }) => {
      // console.error("Socket connection error:", error);
    };

    const handleSocketError = (error: { message: string }) => {
      // console.error("Error from server:", error);
    };

    // Register event listeners
    msgSocket.on("entry_to_dm_response", handleEntryToDmResponse);
    msgSocket.on("new_message", handleNewMessage);
    msgSocket.on("connect_error", handleConnectError);
    msgSocket.on("error", handleSocketError);

    // Emit event (only once)
    if (msgSocket.connected) {
      msgSocket.emit("entry_to_private_dm", {
        userId: userIdFromAuth,
        receiverId: userId,
      });
    } else {
      msgSocket.once("connect", () => {
        msgSocket.emit("entry_to_private_dm", {
          userId: userIdFromAuth,
          receiverId: userId,
        });
      });
    }

    // Cleanup
    return () => {
      msgSocket.off("entry_to_dm_response", handleEntryToDmResponse);
      msgSocket.off("new_message", handleNewMessage);
      msgSocket.off("connect_error", handleConnectError);
      msgSocket.off("error", handleSocketError);
    };
  }, []);

  function onFriendProfileClick() {
    console.log({ roomIdLocalToComponent, userId, dmName });

    // ALWAYS set current room when clicking a friend
    if (privateRoomChatMateData.roomId != null) {
      uiDispatch({
        type: "SET_CURRENT_ROOM",
        payload: roomIdLocalToComponent,
      });
    }

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
