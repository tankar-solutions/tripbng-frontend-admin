import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Auth
import Login from "./pages/auth/login";
import OtpVerify from "./pages/auth/OtpVerify";
import ChangePassword from "./pages/auth/ChangePassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Logout from "./pages/auth/Logout";
import ForgotPasswordLogin from "./pages/auth/ForgotPassword-login";
import NewPassword from "./pages/auth/NewPassword";

// Dashboard + AuthProvider
import AuthProvider from "./components/auth-provider";
import Layout from "./pages/dashboard/layout";
import Dashboard from "./pages/dashboard/dashboard.jsx";

// Sidebar Layout
import SidebarLayout from "./pages/profile/SidebarLayout";

// Sidebar Pages
import Profile from "./pages/profile/profile";

// User Management
import Customers from "./pages/dashboard/user-management/customers";
import Approved from "./pages/dashboard/user-management/agents/approved";
import Unapproved from "./pages/dashboard/user-management/agents/unapproved";
import Approve from "./pages/dashboard/user-management/corporates/approved";
import Unapprove from "./pages/dashboard/user-management/corporates/unapproved";
import Admins from "./pages/dashboard/user-management/admins";
import UserDetail from "./pages/dashboard/user-management/customers/UserDetails";

// Booking
import Flights from "./pages/dashboard/booking-management/flights";
import Hotels from "./pages/dashboard/booking-management/hotels";
import Buses from "./pages/dashboard/booking-management/buses";
import Holidays from "./pages/dashboard/booking-management/holidays";
import VisaServices from "./pages/dashboard/booking-management/visa-services";

// Reports
import RevenueReport from "./pages/dashboard/report-and-analytics/revenue-report";
import UserActivityReport from "./pages/dashboard/report-and-analytics/user-activity-report";
import BookingTrends from "./pages/dashboard/report-and-analytics/booking-trends";
import CustomReports from "./pages/dashboard/report-and-analytics/custom-reports";

// Transactions
import TransactionsMonitoring from "./pages/dashboard/payment-and-transations/transaction-monitoring";
import RefundManagement from "./pages/dashboard/payment-and-transations/refund-management";
import CommissionManagement from "./pages/dashboard/payment-and-transations/comission-management";

// Support / Offers / Feedback
import SupportTickets from "./pages/dashboard/support-and-assistance/support-tickets";
import CreateOffers from "./pages/dashboard/offers-and-promotions/create-offers";
import ManageReviews from "./pages/dashboard/feedback-and-reviews/manage-reviews";
import UserFeedback from "./pages/dashboard/feedback-and-reviews/user-feedback";
import SubAdmin from "./pages/dashboard/sub-admin/add-subadmin";

const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/otp-verify",
    element: <OtpVerify />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/forget-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordLogin />,
  },
  {
    path: "/new-password",
    element: <NewPassword />,
  },

  // Dashboard Routes with Auth + Main Layout
  {
    path: "/dashboard",
    element: <AuthProvider />,
    children: [
      {
        path: "/dashboard",
        element: <Layout />,
        children: [
          { path: "", element: <Dashboard /> },
          { path: "user-management/customers", element: <Customers /> },
          { path: "user-management/customers/user-details", element: <UserDetail /> },
          { path: "user-management/corporates/approved", element: <Approve /> },
          { path: "user-management/corporates/unapproved", element: <Unapprove /> },
          { path: "user-management/agents/approved", element: <Approved /> },
          { path: "user-management/agents/unapproved", element: <Unapproved /> },
          { path: "user-management/admins", element: <Admins /> },

          { path: "booking-management/flights", element: <Flights /> },
          { path: "booking-management/hotels", element: <Hotels /> },
          { path: "booking-management/buses", element: <Buses /> },
          { path: "booking-management/holidays", element: <Holidays /> },
          { path: "booking-management/visa-services", element: <VisaServices /> },

          { path: "report-and-analytics/revenue-report", element: <RevenueReport /> },
          { path: "report-and-analytics/user-activity-report", element: <UserActivityReport /> },
          { path: "report-and-analytics/booking-trends", element: <BookingTrends /> },
          { path: "report-and-analytics/custom-reports", element: <CustomReports /> },

          { path: "payments-and-transactions/transation-monitoring", element: <TransactionsMonitoring /> },
          { path: "payments-and-transactions/refund-management", element: <RefundManagement /> },
          { path: "payments-and-transactions/comission-management", element: <CommissionManagement /> },

          { path: "support-and-assistance/support-tickets", element: <SupportTickets /> },
          { path: "offers-and-promotions/create-offers", element: <CreateOffers /> },
          { path: "offers-and-promotions/manage-reviews", element: <ManageReviews /> },
          { path: "offers-and-promotions/user-feedback", element: <UserFeedback /> },

          { path: "sub-admin/add-subadmin", element: <SubAdmin /> },
        ],
      },
    ],
  },

  // Sidebar Section Routes
  {
    path: "/",
    element: <SidebarLayout />,
    children: [
      { path: "profile", element: <Profile /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          fontSize: "14px",
        },
      }}
    />
  </StrictMode>
);
