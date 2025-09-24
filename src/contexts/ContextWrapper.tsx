import type { ReactNode } from "react";

import { UserContextProvider } from "../contexts/autentication-context/UserContext";
import { UiContextProvider } from "../contexts/uiContext/UiContext";
import { UsersProvider } from "./usersContext/UsersContext";

export function ContextWrapper({ children }: { children: ReactNode }) {
  return (
    <UserContextProvider>
      <UiContextProvider>
        <UsersProvider>{children}</UsersProvider>
      </UiContextProvider>
    </UserContextProvider>
  );
}

export default ContextWrapper;
