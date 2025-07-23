import { userDefaultValue, userAction } from "./userContextTypes";

export let initialState: userDefaultValue = {
  name: "",
  email: "",
  passWord: "",
  isAuthenticated: false,
};

let userReducer = (
  state: userDefaultValue,
  action: userAction
): userDefaultValue => {
  switch (action.type) {
    case "SIGN-UP":
    case "LOGIN":
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };

    case "LOGOUT":
      return {
        ...initialState,
        isAuthenticated: false,
      };

    default:
      return state; // 🔐 Safe fallback
  }
};

export default userReducer;
