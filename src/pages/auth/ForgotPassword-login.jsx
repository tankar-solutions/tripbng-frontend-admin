import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const defaultEmail = location.state?.email || "";

  const [email, setEmail] = useState(defaultEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://api.tripbng.com/admin/sendotpforforgetpasswordlogout",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const successMessage = response.data?.message || "OTP sent successfully";
      console.log(" OTP Sent:", successMessage);


      navigate("/new-password", {
        state: { email },
      });
    } catch (err) {
      console.error(" Error sending OTP:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-4">
          <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
            Forgot Password
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Enter your email to receive an OTP.
          </p>
        </div>

        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label className="font-medium">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </Button>
        </form>
      </div>
    </main>
  );
}
