export type userDefaultValue = {
  name: string;
  email: string;
  passWord: string;
  isAuthenticated?: boolean;
};

export type usersArrayType = {
  name: string;
  email: string;
  passWord: string;
}[];

export type userAction =
  | {
      type: "SIGN-UP";
      payload: { name: string; email: string; passWord: string };
    }
  | {
      type: "LOGOUT";
    }
  | {
      type: "LOGIN";
      payload: { name: string; email?: string; passWord: string };
    };

export type userContextType = {
  state: userDefaultValue;
  dispatch: React.Dispatch<userAction>;
  signup?: (
    userData: userDefaultValue
  ) => Promise<{ success: boolean; message?: string }>;
  login?: (creds: {
    name: string;
    passWord: string;
  }) => Promise<{ success: boolean; user?: any; message?: string }>;
  logout?: () => void;
};
