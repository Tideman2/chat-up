// useAuthSocket.ts (custom hook)

import { useEffect } from "react";

// socket.ts
import { io } from "socket.io-client";

const socket = io("http://localhost:5000/message"); // connect to message NameSpace

export function useCreateUserRoom(onSuccess: (data: any) => void) {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to Name Space with: ", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("disconnected to Name Space with: ", socket.id);
    });
  }, []);
}
