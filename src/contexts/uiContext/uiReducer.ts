import { uiActionTypes, uiDefaultValue } from "./uiTypes";

export let initialState = {
  isChatRoomActive: false,
  privateRoomChatMateData: {},
};

export let uiReducer = (
  state: uiDefaultValue,
  action: uiActionTypes
): uiDefaultValue => {
  switch (action.type) {
    case "TOGGLE-CHATROOM":
      return {
        ...state,
        isChatRoomActive: !state.isChatRoomActive,
      };

    case "SET-CHATMATE":
      return {
        ...state,
        privateRoomChatMateData: action.payload,
      };

    default:
      return state;
  }
};
