import { useContext } from "react";

import UsersContext from "../contexts/usersContext/UsersContext";

const useUsersCtx = () => {
  let context = useContext(UsersContext);
  if (!context)
    throw new Error("useUsersCtx must be used within UserContextProvider");
  return context;
};

export default useUsersCtx;
