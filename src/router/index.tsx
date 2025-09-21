import { Layout } from "@/components/layout";
import Home from "@/pages/home";
import GroupPage from "@/pages/groups";
import LinkMe from "@/pages/link-me";
import { createBrowserRouter } from "react-router-dom";
import MyGroupPage from "@/pages/groups-me";
import GroupDetailPage from "@/pages/group-detail";
import LinkDetailPage from "@/pages/link-detail";
import UserProfilePage from "@/pages/user";
import SignIn from "@/pages/signIn";
import SignUp from "@/pages/signUp";
import AuthSuccess from "@/pages/auth-success";
import { AuthFail } from "@/pages/auth-fail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/links/:id",
        element: <LinkDetailPage />,
      },
      {
        path: "/links/me",
        element: <LinkMe />,
      },
      {
        path: "/groups",
        element: <GroupPage />,
      },
      {
        path: "/groups/:id",
        element: <GroupDetailPage />,
      },
      {
        path: "/groups/me",
        element: <MyGroupPage />,
      },
      {
        path: "/user",
        element: <UserProfilePage />,
      },
    ],
  },
  {
    path: "/auth",
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "success",
        element: <AuthSuccess />,
      },
      {
        path: "fail",
        element: <AuthFail />,
      },
    ],
  },
]);
