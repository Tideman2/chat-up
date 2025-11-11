type MessageType = {
  id: number;
  sender_id: number;
  sender_username: string;
  content: string;
  timestamp: string;
  room_id: number;
  receiver_id?: number;
};

export type uiDefaultValue = {
  isChatRoomActive: boolean;
  currentRoomId: number | null; // ACTIVE ROOM ID FOR CHATBOX
  privateRoomChatMateData: {
    username: string;
    userId: number;
    roomId?: number | null;
    avatar?: string;
  };
  // roomsList: privateRoomMateData[];
  messages: {
    [roomId: number]: MessageType[]; // MESSAGES ORGANIZED BY ROOM ID
  };
};

export type uiActionTypes =
  | {
      type: "TOGGLE-CHATROOM";
    }
  | {
      type: "SET-CHATMATE";
      payload: {
        username: string;
        userId: number;
        roomId?: number | null;
        avatar?: string;
      };
    }
  | {
      type: "ADD_MESSAGE";
      payload: {
        roomId: number;
        message: MessageType;
      };
    }
  | {
      type: "SET_ROOM_MESSAGES";
      payload: {
        roomId: number;
        messages: MessageType[];
      };
    }
  | {
      type: "SET_CURRENT_ROOM";
      payload: number | null; // SET ACTIVE ROOM ID
    };

export type uiContextType = {
  state: uiDefaultValue;
  dispatch: React.Dispatch<uiActionTypes>;
};
