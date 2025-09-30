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

// let ChatBox = () => {
//   const { state: uiState } = useUiCtx();
//   const { state: socketState } = useMsgSocket();
//   const { state: userState } = useAuth();
//   const { userId } = userState;
//   const { privateRoomChatMateData, currentRoomId, uiDispatch, messages } =
//     uiState;
//   const msgSocket = socketState.socket;
//   console.log(currentRoomId, "currentRoomId from uiState in ChatBox");
//   if (currentRoomId) {
//     console.log(messages[currentRoomId], "messages from uiState in ChatBox");
//   }
//   const [messagesBetweenUsers, setMessages] = useState([]);
//   const [message, setMessage] = useState("");

//   // Render messages
//   const renderMessages = () => {
//     return messagesBetweenUsers.map((message, index) => (
//       <DmMessages
//         key={index}
//         sx={{
//           marginLeft: message.sender_id === userId ? "auto" : "0",
//           marginTop: "15px",
//           marginBottom: "15px",
//         }}
//       >
//         {message.content}
//       </DmMessages>
//     ));
//   };

//   const handleSendMessage = () => {
//     if (!msgSocket || !message.trim() || !privateRoomChatMateData.userId)
//       return;
//     console.log("Preparing to send message:", message);
//     const messageData = {
//       content: message.trim(),
//       sender_id: userId,
//       receiver_id: privateRoomChatMateData.userId,
//     };

//     console.log("Sending message:", messageData);

//     // Emit the message to the server
//     msgSocket.emit("private_message", messageData);

//     // Clear the input field
//     setMessage("");
//   };

//   return (
//     <Box
//       sx={{
//         height: "100%",
//         width: "100%",
//         display: "flex",
//         mt: "2px",
//         flexDirection: "column",
//       }}
//     >
//       <Box sx={{ flexShrink: 0 }}>
//         <DmOwnerProfile />
//       </Box>

//       <DmMessagesContainer sx={{ flex: 1 }}>
//         {messagesBetweenUsers.length > 0 ? (
//           renderMessages()
//         ) : (
//           <DmMessages
//             sx={{
//               marginLeft: "auto",
//               marginRight: "auto",
//               marginTop: "20px",
//             }}
//           >
//             No messages yet.
//           </DmMessages>
//         )}
//       </DmMessagesContainer>

//       <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
//         <TextField
//           variant="outlined"
//           fullWidth
//           placeholder="Type a message..."
//           sx={{ margin: "5px" }}
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <Button
//           sx={{
//             backgroundColor: (theme) => theme.palette.primary.main,
//             "&:hover": {
//               backgroundColor: (theme) => theme.palette.primary.light,
//             },
//             flexShrink: 0,
//             minWidth: "auto",
//           }}
//           variant="contained"
//           endIcon={
//             <SendIcon
//               onClick={() => {
//                 handleSendMessage();
//               }}
//             />
//           }
//         >
//           Send
//         </Button>
//       </Box>
//     </Box>
//   );
// };
let ChatBox = () => {
  const { state: uiState } = useUiCtx();
  const { state: socketState } = useMsgSocket();
  const { state: userState } = useAuth();
  const { userId } = userState;
  const { privateRoomChatMateData, currentRoomId, messages } = uiState; // Get messages from context
  const msgSocket = socketState.socket;

  console.log(currentRoomId, "currentRoomId from uiState in ChatBox");
  console.log(messages, "all messages from uiState in ChatBox");
  // Get messages for the current room from context
  const currentRoomMessages = currentRoomId
    ? messages[currentRoomId] || []
    : [];

  console.log(currentRoomMessages, "messages for current room in ChatBox");

  const [message, setMessage] = useState("");

  // Render messages from context
  const renderMessages = () => {
    return currentRoomMessages.map((message) => (
      <DmMessages
        key={message.id} // Use message.id as key
        sx={{
          marginLeft: message.sender_id === Number(userId) ? "auto" : "0",
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >
        {message.content}
      </DmMessages>
    ));
  };

  const handleSendMessage = () => {
    if (
      !msgSocket ||
      !message.trim() ||
      !privateRoomChatMateData.userId ||
      !currentRoomId
    )
      return;

    const messageData = {
      content: message.trim(),
      sender_id: userId,
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
        {currentRoomMessages.length > 0 ? ( // ✅ Use currentRoomMessages
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
          onClick={handleSendMessage} // ✅ Move onClick to Button, not just icon
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};
export default ChatBox;
