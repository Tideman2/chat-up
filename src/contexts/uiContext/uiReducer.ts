import { uiActionTypes, uiDefaultValue } from "./uiTypes";

export const initialState: uiDefaultValue = {
  isChatRoomActive: false,
  currenrtRoomId: null,
  privateRoomChatMateData: {
    username: "", // Add required properties
    userId: 0, // Add required properties
    avatar: "", // Optional, but good to initialize
  },
  roomsList: [], // This will be privateRoomMateData[] automatically
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
    case "ADD-ROOM":
      return {
        ...state,
        roomsList: action.payload,
      };
    default:
      return state;
  }
};
