import { Box } from "@mui/material";
import React, { useEffect } from "react";

import { useMsgSocket } from "../../../contexts/msgSocketCtx/MsgSocketCtx";
import useUiCtx from "../../../hooks/useUiCtx";

let ChatBox = () => {
  let { state, dispatch } = useUiCtx();
  let socket = useMsgSocket();
  console.log(socket.id);
  return <Box>Chatt boxx</Box>;
};

export default ChatBox;
