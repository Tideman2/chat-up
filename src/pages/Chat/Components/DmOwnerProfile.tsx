import { Box, styled, Typography } from "@mui/material";

import useUiCtx from "../../../hooks/useUiCtx";

let DmOwnerName = styled(Typography)(({ theme }) => {
  return {
    color: theme.palette.text.primary,
    fontSize: "16px",
    fontWeight: "bold",
  };
});

const DmOwnerProfile: React.FC = () => {
  let { state: uiState, dispatch: uiDispatch } = useUiCtx();
  // console.log(uiState);
  // More detailed logging
  // console.log("Full uiState:", uiState);
  // console.log("privateRoomChatMateData:", uiState.privateRoomChatMateData);
  // console.log("username:", uiState.privateRoomChatMateData.username);
  // console.log("userId:", uiState.privateRoomChatMateData.userId);

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        height: "fit content",
      }}
    >
      <DmOwnerName>{uiState.privateRoomChatMateData.username}</DmOwnerName>
    </Box>
  );
};

export default DmOwnerProfile;
