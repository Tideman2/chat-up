export type userDefaultValue = {
  name: string;
  email: string;
  userId: string;
  isAuthenticated?: boolean;
};

export type usersArrayType = {
  userId: string;
  name: string;
  email: string;
}[];

// | {
//     type: "SEND-DM";
//     payload: {};
//   }

export type userAction =
  | {
      type: "SIGN-UP";
      payload: { name: string; email: string; passWord: string };
    }
  | {
      type: "LOGOUT";
    }
  | {
      type: "SET-USER";
      payload: { name: string; email: string; userId: string };
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
  setUser?: (creds: {
    name: string;
    email: string;
    userId: string;
  }) => Promise<any>;
  logout?: () => void;
};
