import { createContext, useReducer, ReactNode } from "react";

import { uiContextType } from "./uiTypes";
import { initialState, uiReducer } from "./uiReducer";

export const UiContext = createContext<uiContextType>({
  state: initialState,
  dispatch: () => null,
});

export const UiContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  return <UiContext value={{ state, dispatch }}>{children}</UiContext>;
};
