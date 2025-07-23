import { Layout } from "@/components/layout";
import Home from "@/pages/home";
import GroupPage from "@/pages/groups";
import LinkMe from "@/pages/link-me";
import { createBrowserRouter } from "react-router-dom";

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
        path: "/links/me",
        element: <LinkMe />,
      },
      {
        path: "/groups",
        element: <GroupPage />,
      },
    ],
  },
]);
