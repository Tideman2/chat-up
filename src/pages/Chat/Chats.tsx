import { useEffect } from "react";
import { io } from "socket.io-client";

import { MsgSocketProvider } from "../../contexts/msgSocketCtx/MsgSocketCtx";
import useUiCtx from "../../hooks/useUiCtx";
import ChatBox from "./Components/ChatBox";
import ChatsContent1 from "./Components/ChatsContent1";
import DashBoardOutletContainer from "../../components/dashboard/components/DashBoardOutletContainer";

export default function Chats() {
  let { state, dispatch } = useUiCtx();

  useEffect(() => {
    return () => {
      if (state.isChatRoomActive) {
        dispatch({
          type: "TOGGLE-CHATROOM",
        });
      }
    };
  }, []);
  console.log(state);

  return (
    <MsgSocketProvider>
      <DashBoardOutletContainer
        content1={<ChatsContent1 />}
        content2={state.isChatRoomActive ? <ChatBox /> : null}
      />
    </MsgSocketProvider>
  );
}
