import { Box, styled, Typography } from "@mui/material";

import useUiCtx from "../../../hooks/useUiCtx";

let DmOwnerName = styled(Typography)(({ theme }) => {
  return {
    color: theme.palette.text.primary,
    padding: "5px 10px",
    fontSize: "16px",
    fontWeight: "bold",
  };
});

// This compoenet handles the showing of the current room owner profile info
// Clicking on this component should bring up a modal with the user complete profile

const DmOwnerProfile: React.FC = () => {
  let { state: uiState, dispatch: uiDispatch } = useUiCtx();

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        height: "fit content",
        width: "98%",
        boxSizing: "content-box",
        marginRight: "auto",
        marginLeft: "auto",
        display: "flex",
      }}
    >
      <DmOwnerName>{uiState.privateRoomChatMateData.username}</DmOwnerName>
    </Box>
  );
};

export default DmOwnerProfile;
