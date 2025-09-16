export type uiDefaultValue = {
  isChatRoomActive: boolean;
  privateRoomChatMateData: {};
};

export type uiActionTypes =
  | {
      type: "TOGGLE-CHATROOM";
    }
  | {
      type: "SET-CHATMATE";
      payload: { username: string; userId: number };
    };

export type uiContextType = {
  state: uiDefaultValue;
  dispatch: React.Dispatch<uiActionTypes>;
};
