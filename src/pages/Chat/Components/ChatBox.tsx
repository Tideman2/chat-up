import { Box, styled, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";

import useCurrentUser from "../../../contexts/react-query/useCurrentUser";
import useAuth from "../../../hooks/useAuth";
import { useMsgSocket } from "../../../contexts/msgSocketCtx/MsgSocketCtx";
import DmOwnerProfile from "./DmOwnerProfile";
import useUiCtx from "../../../hooks/useUiCtx";
import useMessageSocket from "../../../hooks/socket/useMessageSocket";
import { useNotificationSocket } from "../../../contexts/notificationSckCtx/NotificationSckCtx";

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

// This component handles the showing of fetched messages and send messages
// It handles registration of websocket listeners to handle fetching
// and sending messages

let ChatBox = () => {
  const { state: uiState, dispatch: uiDispatch } = useUiCtx();
  const { state: userState } = useAuth();
  const { state: socketState } = useMsgSocket(); // Get socket from context
  // const { userId: userIdFromAuth, name: userNameFromAuth } = userState;
  const { privateRoomChatMateData, currentRoomId, messages } = uiState;
  const notificationSocketCtx = useNotificationSocket();
  const notificationSocket = notificationSocketCtx.state.socket;
  const msgSocket = socketState.socket; // Use context socket

  const [currentRoomMessages, setCurrentRoomMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  //To have local data to use, still update context for dependent components
  const [chatRoomId, setRoomId] = useState(null);
  // react query custom hook
  const { data: currentUser, isLoading, error } = useCurrentUser();
  console.log(currentUser);

  console.log(notificationSocket, "notification context");
  console.log(messages, "all messages from uiState in ChatBox");

  const handleEntryToDmResponse = (
    data: any,
    uiDispatch: any,
    privateRoomChatMateDataa: any
  ) => {
    console.log("Data given to entry to dm function : ", data);
    let { roomId, messages, senderId, receiverId } = data;
    console.log("Entry to DM response received:", messages);

    setCurrentRoomMessages(messages); // Update local state with messages
    console.log("currentRoomId", roomId);
    console.log(messages);
    setRoomId(roomId); // Update local state with room id
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
  };

  useEffect(() => {
    if (!msgSocket) return;

    const onEntryResponse = (data: any) =>
      handleEntryToDmResponse(data, uiDispatch, privateRoomChatMateData);
    const onNewMessage = (data: any) => handleNewMessage(data);

    // Register event listeners
    msgSocket.on("entry_to_dm_response", onEntryResponse);
    msgSocket.on("new_message", onNewMessage);

    // Emit event (only once)
    if (msgSocket.connected) {
      msgSocket.emit("entry_to_private_dm", {
        // userId: userIdFromAuth,
        userId: currentUser?.userId,
        receiverId: privateRoomChatMateData.userId,
      });
    } else {
      msgSocket.once("connect", () => {
        msgSocket.emit("entry_to_private_dm", {
          // userId: userIdFromAuth,
          userId: currentUser?.userId,
          receiverId: privateRoomChatMateData.userId,
        });
      });
    }

    // Cleanup
    return () => {
      msgSocket.off("entry_to_dm_response", onEntryResponse);
      msgSocket.off("new_message", onNewMessage);
      setCurrentRoomMessages([]);
    };
  }, [msgSocket, currentUser, privateRoomChatMateData.userId, uiDispatch]);

  console.log(chatRoomId, "chatRoomId from uiState in ChatBox");

  // Render messages from context
  const renderMessages = () => {
    return currentRoomMessages.map((message, index) => (
      <DmMessages
        key={index}
        sx={{
          marginLeft:
            message.sender_id === Number(currentUser?.userId) ? "auto" : "0",
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >
        {message.content}
      </DmMessages>
    ));
  };

  const handleEmitCreateNotification = () => {
    if (!notificationSocket) {
      console.log("handle called CreateNotification error");
      return;
    }

    console.log("Create notification called");
    let notification = {
      // senderId: userIdFromAuth,
      senderId: currentUser?.userId,
      recieverId: privateRoomChatMateData.userId,
      roomId: chatRoomId,
    };

    notificationSocket.emit("create_notification", notification);
    console.log("emited");
  };

  const handleSendMessage = () => {
    if (!msgSocket || !message.trim()) {
      console.log("handle SendMessage called error");
      return;
    }
    console.log("handleSendMessage called");
    const messageData = {
      content: message.trim(),
      // sender_id: userIdFromAuth,
      senderId: currentUser?.userId,
      receiver_id: privateRoomChatMateData.userId,
    };

    console.log("Sending message:", messageData);
    msgSocket.emit("private_message", messageData);
    handleEmitCreateNotification();
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
