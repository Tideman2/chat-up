type privateRoomMateData = {
  roomOwnerName: string;
  roomOwnerId: number;
  avatar?: string;
  roomName?: string;
  roomId?: number;
  messages?: Array<{
    senderId: number;
    content: string;
    timestamp: string;
  }>;
};

export type uiDefaultValue = {
  isChatRoomActive: boolean;
  currenrtRoomId?: number | null;
  privateRoomChatMateData: {
    username: string;
    userId: number;
    avatar?: string;
  };
  roomsList?: Array<privateRoomMateData> | [];
};

export type uiActionTypes =
  | {
      type: "TOGGLE-CHATROOM";
    }
  | {
      type: "SET-CHATMATE";
      payload: { username: string; userId: number };
    }
  | {
      type: "ADD-ROOM";
      payload: Array<privateRoomMateData>;
    };

export type uiContextType = {
  state: uiDefaultValue;
  dispatch: React.Dispatch<uiActionTypes>;
};
