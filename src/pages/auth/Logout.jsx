import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("adminDetails");

    // Show success message
    toast.success("Logged out successfully!");

    // Redirect to login page after a short delay
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }, [navigate]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Logging out...</h2>
      <p className="text-gray-500">Redirecting to login...</p>
    </div>
  );
}
