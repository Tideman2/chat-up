import { createContext, useReducer, ReactNode, Dispatch } from "react";
import React from "react";

type usersType = {
  name: string;
  email: string;
  userId: string;
};

type initialStateType = {
  users: usersType[];
  loading: boolean;
  error: string | null;
};

const initialState: initialStateType = {
  users: [],
  loading: false,
  error: null,
};

type usersActionType =
  | { type: "SET_USERS"; payload: usersType[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

type usersContextType = {
  state: initialStateType;
  dispatch: Dispatch<usersActionType>; // Use Dispatch directly from react
};

// Create context with initial values
const UsersContext = createContext<usersContextType>({
  state: initialState,
  dispatch: () => null, // Default dispatch function
});

// Context provider component
type UsersProviderProps = {
  children: ReactNode;
};

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const [state, dispatch] = useReducer(usersReducer, initialState);

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};

// You'll also need a reducer function
const usersReducer = (
  state: initialStateType,
  action: usersActionType
): initialStateType => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default UsersContext;
