import React, { createContext, useContext, useReducer } from "react";
import { io, Socket } from "socket.io-client";

interface SocketState {
  socket: Socket | null;
}

type Action =
  | { type: "ADD-SOCKET"; payload: Socket }
  | { type: "REMOVE-SOCKET" };

interface SocketContextType {
  state: SocketState;
  dispatch: React.Dispatch<Action>;
}

const initialState: SocketState = { socket: null };

const socketReducer = (state: SocketState, action: Action): SocketState => {
  switch (action.type) {
    case "ADD-SOCKET":
      return { socket: action.payload };
    case "REMOVE-SOCKET":
      state.socket?.disconnect();
      return { socket: null };
    default:
      return state;
  }
};

const SocketContext = createContext<SocketContextType | null>(null);

export const MsgSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(socketReducer, initialState);

  React.useEffect(() => {
    const socket = io("http://localhost:5000/message");
    dispatch({ type: "ADD-SOCKET", payload: socket });

    return () => {
      dispatch({ type: "REMOVE-SOCKET" });
    };
  }, []);

  return (
    <SocketContext.Provider value={{ state, dispatch }}>
      {children}
    </SocketContext.Provider>
  );
};

// hook
export const useMsgSocket = () => {
  const msgCtx = useContext(SocketContext);
  if (!msgCtx) throw new Error("useSocket must be used inside SocketProvider");
  return msgCtx;
};
