import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/auth/signup.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Bookings from "./pages/dashboard/bookings";
import Inventory from "./pages/dashboard/inventory";
import Reports from "./pages/dashboard/reports";
import Finance from "./pages/dashboard/finance";
import Layout from "./pages/dashboard/layout";
import AuthProvider from "./components/auth-provider";
import Payments from "./pages/dashboard/payment/payments";
import PaymentDetails from "./pages/dashboard/payment/payment-details";
import UserDetails from "./pages/dashboard/user/user-details";
import Users from "./pages/dashboard/user/users";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <AuthProvider />,
    children: [
      {
        path: "",
        element: <Layout />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "users/:id",
            element: <UserDetails />,
          },
          {
            path: "bookings",
            element: <Bookings />,
          },
          {
            path: "inventory",
            element: <Inventory />,
          },
          {
            path: "reports",
            element: <Reports />,
          },
          {
            path: "finance",
            element: <Finance />,
          },
          {
            path: "payments",
            element: <Payments />,
          },
          {
            path: "payments/:id",
            element: <PaymentDetails />,
          },
        ],
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
