// useAuthSocket.ts (custom hook)
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

type UseMessageSocketProps = {
  onFailure: (error: any) => void;
  onError: (error: any) => void;
  handleNewMessage: (data: any) => void;
};

export default function useMessageSocket({
  onFailure,
  onError,
  handleNewMessage,
}: UseMessageSocketProps): Socket | null {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Create socket connection
    const socket = io("http://localhost:5000/message");
    socketRef.current = socket;

    // Set listeners
    socket.on("connect", () => {
      console.log("connected to Name Space with: ", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("disconnected to Name Space with: ", socket.id);
    });

    socket.on("new_message", handleNewMessage);
    socket.on("connect_error", onFailure);
    socket.on("error", onError);

    // Cleanup
    return () => {
      socket.off("new_message", handleNewMessage);
      socket.off("connect_error", onFailure);
      socket.off("error", onError);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [onFailure, onError, handleNewMessage]); // Add dependencies

  return socketRef.current;
}
