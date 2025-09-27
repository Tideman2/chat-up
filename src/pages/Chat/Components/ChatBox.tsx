import { Box, styled, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect, useState } from "react";

import useAuth from "../../../hooks/useAuth";
import { useMsgSocket } from "../../../contexts/msgSocketCtx/MsgSocketCtx";
import DmOwnerProfile from "./DmOwnerProfile";
import useUiCtx from "../../../hooks/useUiCtx";

// Styled components
let DmMessages = styled(Box)(({ theme }) => ({
  height: "auto",
  width: "fit-content",
  padding: "10px",
  borderRadius: "7%",
  backgroundColor: theme.palette.primary.main,
}));

let DmMessagesContainer = styled(Box)({
  width: "100%",
  color: "white",
  fontWeight: 300,
  overflowY: "auto",
  padding: "10px",
});

let ChatBox = () => {
  const { state: uiState } = useUiCtx();
  const { state: socketState } = useMsgSocket();
  const { state: userState } = useAuth();
  const { userId } = userState;
  const { privateRoomChatMateData } = uiState;
  const msgSocket = socketState.socket;

  const [messagesBetweenUsers, setMessages] = useState([]);

  useEffect(() => {
    if (!msgSocket || !privateRoomChatMateData.userId) return;

    const handleEntryToDmResponse = (data) => {
      console.log("Server response:", data);
      setMessages(data.messages || []);
    };

    const handleConnectError = (error: { message: string }) => {
      console.error("Socket connection error:", error);
    };

    const handleSocketError = (error: { message: string }) => {
      console.error("Error from server:", error);
    };

    // Register event listeners
    msgSocket.on("entry_to_dm_response", handleEntryToDmResponse);
    msgSocket.on("connect_error", handleConnectError);
    msgSocket.on("error", handleSocketError);

    // Emit event (only once)
    if (msgSocket.connected) {
      msgSocket.emit("entry_to_private_dm", {
        userId,
        receiverId: privateRoomChatMateData.userId,
      });
    } else {
      msgSocket.once("connect", () => {
        msgSocket.emit("entry_to_private_dm", {
          userId,
          receiverId: privateRoomChatMateData.userId,
        });
      });
    }

    // Cleanup
    return () => {
      msgSocket.off("entry_to_dm_response", handleEntryToDmResponse);
      msgSocket.off("connect_error", handleConnectError);
      msgSocket.off("error", handleSocketError);
    };
  }, [msgSocket, privateRoomChatMateData.userId, userId]);

  // Render messages
  const renderMessages = () => {
    return messagesBetweenUsers.map((message) => (
      <DmMessages key={message.id}>{message.content}</DmMessages>
    ));
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        mt: "2px",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flexShrink: 0 }}>
        <DmOwnerProfile />
      </Box>

      <DmMessagesContainer sx={{ flex: 1 }}>
        {messagesBetweenUsers.length > 0 ? (
          renderMessages()
        ) : (
          <DmMessages
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "20px",
            }}
          >
            No messages yet.
          </DmMessages>
        )}
      </DmMessagesContainer>

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
