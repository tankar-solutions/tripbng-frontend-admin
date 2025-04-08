import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function NewPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "https://api.tripbng.com/admin/changeforgetpasswordlogout",
        {
          email,
          otp,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const message = response.data?.message || "Password changed successfully";
      console.log("✅ Success:", message);
      setSuccessMessage(message);

      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, 2000); 
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong.";
      console.error(" Error:", msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4 relative">
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-4">
          <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
            Set a New Password
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Enter the OTP sent to <span className="font-semibold">{email}</span> and choose your new password.
          </p>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
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

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2"
            disabled={loading}
          >
            {loading ? "Updating..." : "Change Password"}
          </Button>
        </form>
      </div>

      {/* Bottom-right success message */}
      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-fade-in">
          {successMessage}
        </div>
      )}
    </main>
  );
}
