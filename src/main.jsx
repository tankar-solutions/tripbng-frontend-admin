import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/auth/signup.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Users from "./pages/dashboard/users";
import Bookings from "./pages/dashboard/bookings";
import Inventory from "./pages/dashboard/inventory";
import Reports from "./pages/dashboard/reports";
import Finance from "./pages/dashboard/finance";
import Layout from "./pages/dashboard/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "dashboard/users",
        element: <Users />,
      },
      {
        path: "dashboard/bookings",
        element: <Bookings />,
      },
      {
        path: "dashboard/inventory",
        element: <Inventory />,
      },
      {
        path: "dashboard/reports",
        element: <Reports />,
      },
      {
        path: "dashboard/finance",
        element: <Finance />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
