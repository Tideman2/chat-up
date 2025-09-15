export type uiDefaultValue = {
  isChatRoomActive: boolean;
};

export type uiActionTypes = {
  type: "TOGGLE-CHATROOM";
};

export type uiContextType = {
  state: uiDefaultValue;
  dispatch: React.Dispatch<uiActionTypes>;
};
