import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import { Navigation } from "@/components/layout/navigation";
import { About } from "@/pages/about";
import { Chat } from "@/pages/chat";
import { Contact } from "@/pages/contact";
import { Help } from "@/pages/help";
import { Home } from "@/pages/home";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/help",
    element: <Help />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
];

const Layout = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
};

export const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: routes,
    },
  ]);
  return <RouterProvider router={router} />;
};
