import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://api.tripbng.com/admin/verifyOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Email: email,
          Otp: otp,
          NewPass: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Password reset successfully!");
        navigate("/login");
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
