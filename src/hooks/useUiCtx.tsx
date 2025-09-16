import { useContext } from "react";

import { UiContext } from "../contexts/uiContext/UiContext";

export default function useUiCtx() {
  const context = useContext(UiContext);
  if (!context)
    throw new Error("useUiContext must be used within UserContextProvider");
  return context;
}
