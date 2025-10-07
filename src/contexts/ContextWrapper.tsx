import type { ReactNode } from "react";

import { NotificationSocketProvider } from "./notificationSckCtx/notificationSckCtx";
import { UserContextProvider } from "../contexts/autentication-context/UserContext";
import { UiContextProvider } from "../contexts/uiContext/UiContext";
import { UsersProvider } from "./usersContext/UsersContext";

export function ContextWrapper({ children }: { children: ReactNode }) {
  return (
    <NotificationSocketProvider>
      <UserContextProvider>
        <UiContextProvider>
          <UsersProvider>{children}</UsersProvider>
        </UiContextProvider>
      </UserContextProvider>
    </NotificationSocketProvider>
  );
}

export default ContextWrapper;
