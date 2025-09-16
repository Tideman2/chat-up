import React, { createContext, useContext } from "react";
import { io, Socket } from "socket.io-client";

// create context
const SocketContext = createContext<Socket | null>(null);

let socket = io("http://localhost:5000/message");

// provider
export const MsgSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //   const [socket] = React.useState(() =>
  //     io("http://localhost:5000/message", { autoConnect: true })
  //   );

  React.useEffect(() => {
    socket.on("connect_error", (err) => {
      console.error("Socket connect_error:", err.message);
    });
    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });
    socket.on("connect", () => {
      console.log("connected wee", socket.id);
    });
    console.log("we ran");
    return () => {
      socket.disconnect(); // clean up
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

// custom hook for easier use
export const useMsgSocket = () => {
  const msgCtx = useContext(SocketContext);
  if (!msgCtx) throw new Error("useSocket must be used inside SocketProvider");
  return msgCtx;
};
