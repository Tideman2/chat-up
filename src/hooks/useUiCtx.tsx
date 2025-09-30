import { useContext } from "react";

import { UiContext } from "../contexts/uiContext/UiContext";
import { uiDefaultValue } from "../contexts/uiContext/uiTypes";
import { uiContextType } from "../contexts/uiContext/uiTypes";

interface UiContextValue {
  state: uiDefaultValue;
  dispatch: React.Dispatch<any>;
}

export default function useUiCtx(): uiContextType {
  const context = useContext(UiContext);
  if (!context)
    throw new Error("useUiContext must be used within UserContextProvider");
  return context;
}
