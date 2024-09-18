import { Navigate, Outlet } from "react-router-dom";

export default function AuthProvider() {
  const user = true;
  return user ? <Outlet /> : <Navigate to="/signup" />;
}
