import type { ReactNode } from "react";

import { NotificationSocketProvider } from "./notificationSckCtx/NotificationSckCtx";
import { UserContextProvider } from "../contexts/autentication-context/UserContext";
import { UiContextProvider } from "../contexts/uiContext/UiContext";
import { UsersProvider } from "./usersContext/UsersContext";
import { NotificationProvider } from "./notificationContext/NotificationCtx";

export function ContextWrapper({ children }: { children: ReactNode }) {
  return (
    <NotificationProvider>
      <NotificationSocketProvider>
        <UserContextProvider>
          <UiContextProvider>
            <UsersProvider>{children}</UsersProvider>
          </UiContextProvider>
        </UserContextProvider>
      </NotificationSocketProvider>
    </NotificationProvider>
  );
}

export default ContextWrapper;
