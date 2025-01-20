import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem("authToken");
  

  // If no token or not an admin, redirect to login page
  if (!authToken) {
    return <Navigate to="/" replace />;
  }

  return children; // Render protected content if conditions are met
};

export default ProtectedRoute;
