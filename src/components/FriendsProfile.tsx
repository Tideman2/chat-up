import { Box, Avatar, Typography } from "@mui/material";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

import theme from "../config/theme";

type ChatBoxProps = {
  userName: string;
  userId: string;
};

export default function FriendsProfile({ userName, userId }: ChatBoxProps) {
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
        console.log(userName, userId);
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
