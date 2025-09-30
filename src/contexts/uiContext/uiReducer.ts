import { uiDefaultValue, uiActionTypes } from "./uiTypes";

export const initialState: uiDefaultValue = {
  isChatRoomActive: false,
  currentRoomId: null, // INITIAL ACTIVE ROOM ID
  privateRoomChatMateData: {
    username: "",
    userId: 0,
    roomId: null,
    avatar: "",
  },
  // roomsList: [],
  messages: {}, // EMPTY MESSAGES OBJECT
};

export const uiReducer = (
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
        privateRoomChatMateData: {
          ...state.privateRoomChatMateData,
          ...action.payload,
        },
      };

    // case "SET_ROOMS_LIST":
    //   const existingRoom = state.roomsList.find(
    //     (room) => room.roomOwnerId === action.payload.roomOwnerId
    //   );
    //   if (existingRoom) {
    //     return state; // No changes if room already exists
    //   }
    //   return {
    //     ...state,
    //     roomsList: [...state.roomsList, action.payload],
    //   };

    case "SET_CURRENT_ROOM": // HANDLE ACTIVE ROOM ID
      return {
        ...state,
        currentRoomId: action.payload,
      };

    case "SET_ROOM_MESSAGES": // STORE MESSAGES FOR SPECIFIC ROOM
      let existingRoom = false;
      for (let roomId in state.messages) {
        if (Number(roomId) === action.payload.roomId) {
          existingRoom = true;
          break;
        }
      }

      if (existingRoom) {
        return state; // No changes if room messages already exist
      }

      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.roomId]: action.payload.messages,
        },
      };

    case "ADD_MESSAGE": // ADD SINGLE MESSAGE TO ROOM
      const currentMessages = state.messages[action.payload.roomId] || [];
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.roomId]: [...currentMessages, action.payload.message],
        },
      };

    default:
      return state;
  }
};
