import { Box, Avatar, Typography } from "@mui/material";
import { useEffect } from "react";

import { useMsgSocket } from "../contexts/msgSocketCtx/MsgSocketCtx";
import useUiCtx from "../hooks/useUiCtx";
import theme from "../config/theme";

type ChatBoxProps = {
  userName: string;
  userId: string;
};

export default function FriendsProfile({ userName, userId }: ChatBoxProps) {
  let { state, dispatch } = useUiCtx();
  let socket = useMsgSocket();

  function onFriendProfileClick() {
    // let socket = io("http://localhost:5000/message");
    // socket.on("connect", () => {
    //   console.log("connected to socket, id: ", socket.id);
    // });
    console.log(socket.id);
    dispatch({
      type: "SET-CHATMATE",
      payload: { username: userName, userId: Number(userId) },
    });
    if (!state.isChatRoomActive) {
      dispatch({ type: "TOGGLE-CHATROOM" });
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
      <Typography fontWeight={"bold"}>{userName}</Typography>
    </Box>
  );
}
