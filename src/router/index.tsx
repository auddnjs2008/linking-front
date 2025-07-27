import { Layout } from "@/components/layout";
import Home from "@/pages/home";
import GroupPage from "@/pages/groups";
import LinkMe from "@/pages/link-me";
import { createBrowserRouter } from "react-router-dom";
import MyGroupPage from "@/pages/groups-me";
import GroupDetailPage from "@/pages/group-detail";
import LinkDetailPage from "@/pages/link-detail";

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
    ],
  },
]);
