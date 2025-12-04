import { useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import { MsgSocketProvider } from "../../contexts/msgSocketCtx/MsgSocketCtx";
import useUiCtx from "../../hooks/useUiCtx";
import { UserContext } from "../../contexts/autentication-context/UserContext";
import ChatBox from "./Components/ChatBox";
import ChatsContent1 from "./Components/ChatsContent1";
import DashBoardOutletContainer from "../../components/dashboard/components/DashBoardOutletContainer";

export default function Chats() {
  let { state, dispatch } = useUiCtx();
  let { isChatRoomActive, privateRoomChatMateData } = state;
  let { userId, username, avatar } = privateRoomChatMateData;

  useEffect(() => {
    return () => {
      if (isChatRoomActive) {
        dispatch({
          type: "TOGGLE-CHATROOM",
        });
      }
    };
  }, []);

  return (
    <MsgSocketProvider>
      <DashBoardOutletContainer
        content1={<ChatsContent1 />}
        content2={state.isChatRoomActive ? <ChatBox /> : null}
      />
    </MsgSocketProvider>
  );
}
