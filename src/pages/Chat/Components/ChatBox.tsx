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
  const { privateRoomChatMateData, uiDispatch } = uiState;
  const msgSocket = socketState.socket;

  const [messagesBetweenUsers, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!msgSocket || !privateRoomChatMateData.userId) return;

    const handleEntryToDmResponse = (data) => {
      console.log("Server response:", data);
      setMessages(data.messages || []);
    };

    const handleNewMessage = (messageData) => {
      console.log("New message received:", messageData);
      setMessages((prev) => [...prev, messageData]);
    };

    const handleConnectError = (error: { message: string }) => {
      console.error("Socket connection error:", error);
    };

    const handleSocketError = (error: { message: string }) => {
      console.error("Error from server:", error);
    };

    // Register event listeners
    msgSocket.on("entry_to_dm_response", handleEntryToDmResponse);
    msgSocket.on("new_message", handleNewMessage);
    msgSocket.on("connect_error", handleConnectError);
    msgSocket.on("error", handleSocketError);

    // Emit event
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

    // Cleanup - ADD THE MISSING LISTENER
    return () => {
      msgSocket.off("entry_to_dm_response", handleEntryToDmResponse);
      msgSocket.off("new_message", handleNewMessage); // ← ADD THIS
      msgSocket.off("connect_error", handleConnectError);
      msgSocket.off("error", handleSocketError);
    };
  }, [msgSocket, privateRoomChatMateData.userId, userId]);

  // Render messages
  const renderMessages = () => {
    return messagesBetweenUsers.map((message, index) => (
      <DmMessages
        key={index}
        sx={{
          marginLeft: message.sender_id === userId ? "auto" : "0",
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >
        {message.content}
      </DmMessages>
    ));
  };

  const handleSendMessage = () => {
    if (!msgSocket || !message.trim() || !privateRoomChatMateData.userId)
      return;
    console.log("Preparing to send message:", message);
    const messageData = {
      content: message.trim(),
      sender_id: userId,
      receiver_id: privateRoomChatMateData.userId,
    };

    console.log("Sending message:", messageData);

    // Emit the message to the server
    msgSocket.emit("private_message", messageData);

    // Clear the input field
    setMessage("");
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
          endIcon={
            <SendIcon
              onClick={() => {
                handleSendMessage();
              }}
            />
          }
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatBox;
