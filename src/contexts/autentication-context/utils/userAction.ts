import {
  userAction,
  userDefaultValue,
  usersArrayType,
} from "../userContextTypes";
import { checkIfUserInfoInStorage } from "./storage";

export function signUpUser(dispatch: React.Dispatch<userAction>) {
  return async (newUserData: userDefaultValue) => {
    const stored = localStorage.getItem("users");
    const users: usersArrayType = stored ? JSON.parse(stored) : [];

    const exists = checkIfUserInfoInStorage(users, {
      type: "SIGN-UP",
      payload: newUserData,
    });

    if (!exists) {
      users.push(newUserData);
      localStorage.setItem("users", JSON.stringify(users));

      dispatch({ type: "SIGN-UP", payload: newUserData });

      return { success: true };
    }

    throw new Error("User already exists!");
  };
}

export function loginUser(dispatch: React.Dispatch<userAction>) {
  return async (credentials: { email: string; passWord: string }) => {
    const stored = localStorage.getItem("users");
    const users: usersArrayType = stored ? JSON.parse(stored) : [];

    const matched = checkIfUserInfoInStorage(users, {
      type: "LOGIN",
      payload: credentials,
    });

    if (typeof matched === "object") {
      dispatch({
        type: "LOGIN",
        payload: { name: matched.name, passWord: matched.passWord },
      });
      return { success: true, user: matched };
    } else {
      // { success: false, message: "Invalid credentials" };
      throw new Error("Invalid credentials");
    }
  };
}

export function logoutUser(dispatch: React.Dispatch<userAction>) {
  return () => {
    dispatch({ type: "LOGOUT" });
  };
}
