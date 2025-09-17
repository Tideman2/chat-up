import { Box } from "@mui/material";
import React, { useEffect } from "react";

import { useMsgSocket } from "../../../contexts/msgSocketCtx/MsgSocketCtx";
import useUiCtx from "../../../hooks/useUiCtx";

let ChatBox = () => {
  let { state: uiState, dispatch: uiDispatch } = useUiCtx();
  let { state: socketState, dispatch: socketDispatch } = useMsgSocket();
  let msgSocket = socketState.socket;

  useEffect(() => {
    if (!msgSocket) return;

    msgSocket.on("connected", (data) => {
      console.log("Connected to Message namespace:", data);
    });

    msgSocket.on("entry_to_dm_response", (data) => {
      console.log("Server created/joined room:", data);
    });

    return () => {
      msgSocket.off("connected");
      msgSocket.off("entry_to_dm_response");
    };
  }, [msgSocket]);

  return <Box>Chatt boxx</Box>;
};

export default ChatBox;
