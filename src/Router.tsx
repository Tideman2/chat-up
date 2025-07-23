import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "./App";
import Login from "./components/autentication/login/Login";
import SignUp from "./components/autentication/sign-up/SignUp";
import AutenticationLayout from "./components/autentication/AutenticationLayout";
import ResetPassword from "./components/autentication/reset-password/ResetPassword";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/authentication/login" replace={true} />,
  },

  {
    path: "/authentication",
    element: <AutenticationLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
        children: [],
      },
      {
        path: "*",
        element: <Navigate to="login" replace={true} />,
      },
    ],
  },

  {
    path: "/app",
    element: <App />,
  },
]);

export default Router;
