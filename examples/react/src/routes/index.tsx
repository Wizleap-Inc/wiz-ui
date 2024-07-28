import { WizHeader, WizHStack } from "@wizleap-inc/wiz-ui-react";
import { useReducer } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

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
  const [isNavigationOpen, toggleNavigation] = useReducer((v) => !v, true);
  return (
    <>
      <WizHeader
        onToggle={toggleNavigation}
        gapLeft="sm"
        gapRight="xl"
        sticky
      />
      <WizHStack>
        <Navigation isOpen={isNavigationOpen} />
        <Outlet />
      </WizHStack>
    </>
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
