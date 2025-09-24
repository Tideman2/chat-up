import { Box, styled } from "@mui/material";
import React, { useEffect } from "react";

import useAuth from "../../../hooks/useAuth";
import { useMsgSocket } from "../../../contexts/msgSocketCtx/MsgSocketCtx";
import DmOwnerProfile from "./DmOwnerProfile";
import useUiCtx from "../../../hooks/useUiCtx";

let DmMessages = styled(Box)(({ theme }) => {
  return {
    height: "auto",
    width: "auto",
    padding: "10px",
    borderRadius: "5%",
    backgroundColor: theme.palette.background.paper,
    variants: theme.typography.body1,
  };
});

let ChatBox = () => {
  let { state: uiState, dispatch: uiDispatch } = useUiCtx();
  let { state: socketState, dispatch: socketDispatch } = useMsgSocket();
  let { state: userState } = useAuth();
  let msgSocket = socketState.socket;
  let { userId } = userState;
  let { privateRoomChatMateData } = uiState;

  //set up sockets event listeners and emit actions
  // useEffect(() => {
  //   if (!msgSocket) return;
  //   console.log("Effect ran", uiState.privateRoomChatMateData);
  //   privateRoomChatMateData.userId;
  //   // 2. Tell server to create/find DM room
  //   msgSocket?.emit("on_entry_to_private_dm", {
  //     userId,
  //     receiverId: privateRoomChatMateData.userId,
  //   });

  //   //Register callback for emit event from socket server
  //   msgSocket.on("entry_to_dm_response", (data) => {
  //     console.log("call-back fired?");
  //     console.log("Server created/joined room:", data);
  //   });

  //   //emit event on entry to dm
  //   // msgSocket.emit("get");
  //   return () => {
  //     msgSocket.off("entry_to_dm_response");
  //   };
  // }, [msgSocket]);
  useEffect(() => {
    if (!msgSocket || !privateRoomChatMateData.userId) return;
    console.log("Effect ran", uiState.privateRoomChatMateData);

    msgSocket.on("error", (data) => {
      console.error("Error from server:", data);
    });

    msgSocket.emit("on_entry_to_private_dm", {
      userId,
      receiverId: privateRoomChatMateData.userId,
    });
    console.log(userId);
    msgSocket.on("entry_to_dm_response", (data) => {
      console.log("Server response:", data);
    });

    return () => {
      msgSocket.off("entry_to_dm_response");
    };
  }, [msgSocket, privateRoomChatMateData.userId, userId]);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <DmOwnerProfile />
    </Box>
  );
};

export default ChatBox;
