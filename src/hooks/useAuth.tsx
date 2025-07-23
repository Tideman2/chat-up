import { useContext } from "react";

import { UserContext } from "../contexts/autentication-context/UserContext";

export default function useAuth() {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useAuthContext must be used within UserContextProvider");
  return context;
}
