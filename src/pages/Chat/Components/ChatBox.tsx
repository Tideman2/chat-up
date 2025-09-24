import { Box, styled, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect } from "react";

import useAuth from "../../../hooks/useAuth";
import { useMsgSocket } from "../../../contexts/msgSocketCtx/MsgSocketCtx";
import DmOwnerProfile from "./DmOwnerProfile";
import useUiCtx from "../../../hooks/useUiCtx";
import theme from "../../../config/theme";

let DmMessages = styled(Box)(({ theme }) => {
  return {
    height: "auto",
    width: "fit-content",
    padding: "10px",
    borderRadius: "7%",
    backgroundColor: theme.palette.background.paper,
    variants: theme.typography.body1,
  };
});

let DmMessagesContainer = styled(Box)(({ theme }) => {
  return {
    width: "100%",
    overflowY: "auto",
    padding: "10px",
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
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* // Header area */}
      <Box sx={{ flexShrink: 0 }}>
        <DmOwnerProfile />
      </Box>
      {/* // Messages area */}
      <DmMessagesContainer sx={{ flex: 1 }}>
        <DmMessages>Messages will be shown here</DmMessages>
      </DmMessagesContainer>
      {/* // Input area */}
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Type a message..."
          sx={{ margin: "5px" }}
        />
        <Button
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.light,
            },
            flexShrink: 0,
            minWidth: "auto",
          }}
          variant="contained"
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatBox;
