import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();


  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  
  let authToken = localStorage.getItem("accessToken");

  if (!email) {
    toast.error("Invalid request! Please enter your email first.");
    navigate("/forgot-password");
    return null;
  }

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!authToken) {
      toast.error("Session expired! Please login again.");
      navigate("/");
      return;
    }

    try {
      const response = await fetch("https://api.tripbng.com/admin/ChangeForgetPass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          code: otp,
          newPassword,
          email, 
        }),
      });

      const data = await response.json();

      if (response.status === 401 || data.message === "Your Access Token is expire Please Login Again") {
        toast.error("Session expired! Please login again.");
        localStorage.removeItem("accessToken");
        navigate("/");
        return;
      }

      if (response.ok && data.status === 200 && data.data?.success) {
        console.log("Your Password is SuccessFully Change");
        toast.success(data.message || "Your Password is Successfully Changed!");
        navigate("/");
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-8">
          <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
            Reset Password
          </h3>
        </div>
        <form onSubmit={handleResetPassword} className="space-y-5">
          <div>
            <label className="font-medium">OTP</label>
            <Input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="font-medium">New Password</label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="font-medium">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full text-neutral-100 bg-yellow-500 py-2"
            disabled={loading}
          >
            {loading ? "Updating..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </main>
  );
}
