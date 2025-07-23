import { createContext, useReducer, ReactNode } from "react";
import userReducer, { initialState } from "./userReducer";

import { userContextType } from "./userContextTypes";
import { signUpUser, loginUser, logoutUser } from "./utils/userAction";

//create context
export const UserContext = createContext<userContextType>({
  state: initialState,
  dispatch: () => null,
});

// Create Provider
export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const signup = signUpUser(dispatch);
  const login = loginUser(dispatch);
  const logout = logoutUser(dispatch);

  return (
    <UserContext.Provider value={{ state, dispatch, signup, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
