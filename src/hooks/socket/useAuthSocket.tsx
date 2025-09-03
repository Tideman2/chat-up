// useAuthSocket.ts (custom hook)
import { useEffect } from "react";
// socket.ts
import { io } from "socket.io-client";
export const socket = io("http://localhost:5000/auth"); // connect to /auth namespace

export function useAuthSocket(onSuccess: (data: any) => void) {
  useEffect(() => {
    socket.on("register_user_response", onSuccess);

    return () => {
      socket.off("register_user_response", onSuccess);
    };
  }, [onSuccess]);

  const registerUser = (payload: {
    name: string;
    email: string;
    password: string;
  }) => {
    socket.emit("register_user", payload);
  };

  return { registerUser };
}
