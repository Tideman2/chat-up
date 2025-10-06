import { Box, styled, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useMsgSocket } from "../../../contexts/msgSocketCtx/MsgSocketCtx";
import DmOwnerProfile from "./DmOwnerProfile";
import useUiCtx from "../../../hooks/useUiCtx";

interface Message {
  id: number;
  content: string;
  receiver_id: number;
  room_id: number;
  sender_id: number;
  sender_username: string;
  timestamp: string; // or use Date if you parse it
  type: "private" | "group" | string;
}

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
  const { state: uiState, dispatch: uiDispatch } = useUiCtx();
  const { state: userState } = useAuth();
  const { state: socketState } = useMsgSocket(); // Get socket from context
  const { userId: userIdFromAuth, name: userNameFromAuth } = userState;
  const { privateRoomChatMateData, currentRoomId, messages } = uiState;
  const msgSocket = socketState.socket; // Use context socket instead of hook

  const [currentRoomMessages, setCurrentRoomMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  console.log(currentRoomId, "currentRoomId from uiState in ChatBox");
  console.log(messages, "all messages from uiState in ChatBox");

  useEffect(() => {
    if (!msgSocket) return;

    const handleEntryToDmResponse = (data: any) => {
      let { roomId, messages, senderId, receiverId } = data;
      setCurrentRoomMessages(messages); // Update local state with messages
      console.log("currentRoomId", messages);
      console.log(messages);
      if (data && roomId) {
        uiDispatch({
          type: "SET-CHATMATE",
          payload: {
            username: privateRoomChatMateData.username,
            userId: Number(privateRoomChatMateData.userId),
            roomId,
          },
        });
        uiDispatch({
          type: "SET_ROOM_MESSAGES",
          payload: { roomId, messages },
        });
      }
    };

    const handleNewMessage = (data: any) => {
      console.log("New message received:", data);
      setCurrentRoomMessages((prevMessages) => [...prevMessages, data]);
      // if (roomId === currentRoomId) {
      //   // setCurrentRoomMessages((prevMessages) => [...prevMessages, message]);
      // }
    };

    // Register event listeners
    msgSocket.on("entry_to_dm_response", handleEntryToDmResponse);
    msgSocket.on("new_message", handleNewMessage);

    // Emit event (only once)
    if (msgSocket.connected) {
      msgSocket.emit("entry_to_private_dm", {
        userId: userIdFromAuth,
        receiverId: privateRoomChatMateData.userId,
      });
    } else {
      msgSocket.once("connect", () => {
        msgSocket.emit("entry_to_private_dm", {
          userId: userIdFromAuth,
          receiverId: privateRoomChatMateData.userId,
        });
      });
    }

    // Cleanup
    return () => {
      msgSocket.off("entry_to_dm_response", handleEntryToDmResponse);
      msgSocket.off("new_message", handleNewMessage);
      // Reset messages when switching to a different chat
      setCurrentRoomMessages([]);
    };
  }, [msgSocket, userIdFromAuth, privateRoomChatMateData.userId, uiDispatch]);

  // useEffect(() => {}, [privateRoomChatMateData.userId]);

  // Render messages from context
  const renderMessages = () => {
    return currentRoomMessages.map((message, index) => (
      <DmMessages
        key={index}
        sx={{
          marginLeft:
            message.sender_id === Number(userIdFromAuth) ? "auto" : "0",
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >
        {message.content}
      </DmMessages>
    ));
  };

  const handleSendMessage = () => {
    if (!msgSocket || !message.trim()) {
      console.log("handleSendMessage called error");
      return;
    }
    console.log("handleSendMessage called");
    const messageData = {
      content: message.trim(),
      sender_id: userIdFromAuth,
      receiver_id: privateRoomChatMateData.userId,
    };

    console.log("Sending message:", messageData);
    msgSocket.emit("private_message", messageData);
    setMessage("");
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flexShrink: 0 }}>
        <DmOwnerProfile />
      </Box>

      <DmMessagesContainer sx={{ flex: 1 }}>
        {currentRoomMessages.length > 0 ? (
          renderMessages()
        ) : (
          <DmMessages
            sx={{ marginLeft: "auto", marginRight: "auto", marginTop: "20px" }}
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
          onClick={handleSendMessage}
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatBox;
