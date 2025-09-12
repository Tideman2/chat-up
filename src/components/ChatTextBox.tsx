import { Box, Avatar, Typography } from "@mui/material";
import theme from "../config/theme";

type ChatBoxProps = {
  userName: string;
  userId: string;
};

export default function ChatTextBox({ userName, userId }: ChatBoxProps) {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        columnGap: "10px",
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
