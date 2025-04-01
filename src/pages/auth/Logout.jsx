import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { apiService } from "../../services/api"; 

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await apiService.post("/admin/logout");
      
        localStorage.removeItem("token");
        localStorage.removeItem("adminDetails");

        toast.success("Logged out successfully!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch (error) {
        console.error("Logout Error:", error);
        toast.error("Failed to logout. Please try again.");
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Logging out...</h2>
      <p className="text-gray-500">Redirecting to login...</p>
    </div>
  );
}
