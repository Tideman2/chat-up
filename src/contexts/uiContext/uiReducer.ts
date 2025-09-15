import { uiActionTypes, uiDefaultValue } from "./uiTypes";

export let initialState = {
  isChatRoomActive: false,
};

export let uiReducer = (
  state: uiDefaultValue,
  action: uiActionTypes
): uiDefaultValue => {
  switch (action.type) {
    case "TOGGLE-CHATROOM":
      state.isChatRoomActive = !state.isChatRoomActive;

    default:
      return state;
  }
};
