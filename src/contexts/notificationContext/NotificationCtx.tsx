import React, { createContext, useContext, useReducer, ReactNode } from "react";

type NotificationType = {
  id: Number;
  senderId: string;
  recieverId: string;
  roomId: Number;
  isRead: boolean;
  timeStamp?: any;
};

type NotificationCtxType = {
  notifications: NotificationType[];
};

type notificationActions =
  | {
      type: "ADD-NOTIFICATION";
      payload: NotificationType;
    }
  | {
      type: "ADD-NOTIFICATIONS";
      payload: NotificationType[];
    };

type NotifyContextType = {
  state: NotificationCtxType;
  dispatch: React.Dispatch<notificationActions>;
};

let NotificationContext = createContext<NotifyContextType>({
  state: {
    notifications: [],
  },
  dispatch: () => null,
});

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    (state: NotificationCtxType, action: notificationActions) => {
      switch (action.type) {
        case "ADD-NOTIFICATION":
          return {
            ...state,
            notifications: [...state.notifications, action.payload],
          };
        case "ADD-NOTIFICATIONS":
          return {
            ...state,
            notifications: [...state.notifications, ...action.payload],
          };
        default:
          return state;
      }
    },
    { notifications: [] } // Initial state matches NotificationCtxType
  );

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
