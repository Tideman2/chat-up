// useAuthSocket.ts (custom hook)
import { useEffect } from "react";
// socket.ts

import { io } from "socket.io-client";
export const socket = io("http://localhost:5000/auth"); // connect to /message namespace

export function useAuthSocketLogin(onSuccess: (data: any) => void) {
  useEffect(() => {
    socket.on("login_user_response", onSuccess);

    return () => {
      socket.off("login_user_response", onSuccess);
    };
  }, [onSuccess]);

  const loginUser = (payload: { username: string; password: string }) => {
    socket.emit("login_user", payload);
  };

  return { loginUser };
}
