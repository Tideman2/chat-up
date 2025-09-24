import { useContext } from "react";

import { UiContext } from "../contexts/uiContext/UiContext";

interface UiContextValue {
  state: {
    isChatRoomActive: boolean;
    privateRoomChatMateData: {
      username: string;
      userId: number;
      avatar?: string;
    };
  };
  dispatch: React.Dispatch<any>;
}

export default function useUiCtx(): UiContextValue {
  const context = useContext(UiContext);
  if (!context)
    throw new Error("useUiContext must be used within UserContextProvider");
  return context;
}
