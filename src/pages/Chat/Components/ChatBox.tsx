import { Box } from "@mui/material";
import React from "react";

import { useMsgSocket } from "../../../contexts/msgSocketCtx/MsgSocketCtx";
import useUiCtx from "../../../hooks/useUiCtx";

let ChatBox = () => {
  // alias ui context
  let { state: uiState, dispatch: uiDispatch } = useUiCtx();

  // alias socket context
  let { state: socketState, dispatch: socketDispatch } = useMsgSocket();

  console.log("UI State:", uiState);
  console.log("Socket State:", socketState);

  return <Box>Chatt boxx</Box>;
};

export default ChatBox;
