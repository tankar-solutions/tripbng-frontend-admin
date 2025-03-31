import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard.jsx";

import Layout from "./pages/dashboard/layout";
import AuthProvider from "./components/auth-provider";

import Login from "./pages/auth/login";
import OtpVerify from "./pages/auth/OtpVerify";
import ChangePassword from "./pages/auth/ChangePassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Logout from "./pages/auth/Logout";

import Customers from "./pages/dashboard/user-management/customers";
import Agents from "./pages/dashboard/user-management/agents";
import Admins from "./pages/dashboard/user-management/admins";
import Flights from "./pages/dashboard/booking-management/flights";
import Hotels from "./pages/dashboard/booking-management/hotels";
import Buses from "./pages/dashboard/booking-management/buses";
import Holidays from "./pages/dashboard/booking-management/holidays";
import VisaServices from "./pages/dashboard/booking-management/visa-services";
import RevenueReport from "./pages/dashboard/report-and-analytics/revenue-report";
import UserActivityReport from "./pages/dashboard/report-and-analytics/user-activity-report";
import BookingTrends from "./pages/dashboard/report-and-analytics/booking-trends";
import CustomReports from "./pages/dashboard/report-and-analytics/custom-reports";
import TransactionsMonitoring from "./pages/dashboard/payment-and-transations/transaction-monitoring";
import RefundManagement from "./pages/dashboard/payment-and-transations/refund-management";
import SupportTickets from "./pages/dashboard/support-and-assistance/support-tickets";
import CreateOffers from "./pages/dashboard/offers-and-promotions/create-offers";
import ManageReviews from "./pages/dashboard/feedback-and-reviews/manage-reviews";
import UserFeedback from "./pages/dashboard/feedback-and-reviews/user-feedback";
import Corporate from "./pages/dashboard/user-management/corporate";
import CommissionManagement from "./pages/dashboard/payment-and-transations/comission-management";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <AuthProvider />,
    children: [
      {
        path: "/dashboard",
        element: <Layout />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "user-management/customers",
            element: <Customers />,
          },
          {
            path: "user-management/corporate",
            element: <Corporate />,
          },
          {
            path: "user-management/agents",
            element: <Agents />,
          },
          {
            path: "user-management/admins",
            element: <Admins />,
          },
          {
            path: "booking-management/flights",
            element: <Flights />,
          },
          {
            path: "booking-management/hotels",
            element: <Hotels />,
          },
          {
            path: "booking-management/buses",
            element: <Buses />,
          },
          {
            path: "booking-management/holidays",
            element: <Holidays />,
          },
          {
            path: "booking-management/visa-services",
            element: <VisaServices />,
          },
          {
            path: "booking-management/visa-services",
            element: <VisaServices />,
          },
          {
            path: "report-and-analytics/revenue-report",
            element: <RevenueReport />,
          },
          {
            path: "report-and-analytics/user-activity-report",
            element: <UserActivityReport />,
          },
          {
            path: "report-and-analytics/booking-trends",
            element: <BookingTrends />,
          },
          {
            path: "report-and-analytics/custom-reports",
            element: <CustomReports />,
          },
          {
            path: "payments-and-transactions/transation-monitoring",
            element: <TransactionsMonitoring />,
          },
          {
            path: "payments-and-transactions/refund-management",
            element: <RefundManagement />,
          },
          {
            path: "payments-and-transactions/comission-management",
            element: <CommissionManagement />,
          },
          {
            path: "support-and-assistance/support-tickets",
            element: <SupportTickets />,
          },
          {
            path: "offers-and-promotions/create-offers",
            element: <CreateOffers />,
          },
          {
            path: "offers-and-promotions/manage-reviews",
            element: <ManageReviews />,
          },
          {
            path: "offers-and-promotions/user-feedback",
            element: <UserFeedback />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path : "/otp-verify",
    element :<OtpVerify />,
  },
  {
    path : "/change-password",
    element : <ChangePassword />,
  },
  {
    path :"/forget-password",
    element : <ForgotPassword />,
  },
  {
    path : "/reset-password",
    element : <ResetPassword />,
  },
  {
    path : "/logout",
    element : <Logout />,
  }
 
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster
      position="bottom-right" // Still keep this set
      toastOptions={{
        style: {
          fontSize: "14px",
        },
      }}
    />
  </StrictMode>
);
