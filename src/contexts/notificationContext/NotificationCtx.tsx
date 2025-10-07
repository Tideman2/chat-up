import React, { createContext, useContext, useReducer } from "react";

type NotificationType = {
  id: Number;
  senderId: string;
  recieverId: string;
  roomId: Number;
  isRead: boolean;
};

type NotificationCtxType = {
  notifications: NotificationType[];
};
