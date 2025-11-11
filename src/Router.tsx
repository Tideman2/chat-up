import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "./components/autentication/login/Login";
import SignUp from "./components/autentication/sign-up/SignUp";
import AutenticationLayout from "./components/autentication/AutenticationLayout";
import ResetPassword from "./components/autentication/reset-password/ResetPassword";
import DashBoardLayout from "./components/dashboard/DashboardLayout";

import Chats from "./pages/Chat/Chats";

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
    element: <DashBoardLayout />,
    children: [
      {
        path: "/app/chat",
        element: <Chats />,
      },
    ],
  },
]);

export default Router;
