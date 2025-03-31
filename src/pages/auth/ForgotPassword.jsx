import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("Unauthorized! Please log in first.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://api.tripbng.com/admin/forgetPass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      console.log("Forgot Password Response:", result);

      if (response.ok) {
        toast.success("OTP sent to your email!");
        navigate("/reset-password", { state: { email } });
      } else {
        toast.error(result.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error("Forgot Password Error:", err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-8">
          <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
            Forgot Password
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Enter your email to receive an OTP.
          </p>
        </div>
        <form onSubmit={handleForgotPassword} className="space-y-5">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="w-full text-neutral-100 bg-yellow-500 py-2"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </Button>
        </form>
      </div>
    </main>
  );
}
