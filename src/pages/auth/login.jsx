import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://tripbng-backend-api-c6kw.onrender.com/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // ✅ Save token & admin details
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("adminDetails", JSON.stringify(data.admin));

        toast.success("Login successful!");

        // ✅ Navigate to OTP verify with email & OTP
        navigate("/otp-verify", {
          state: { email, backendOtp: data.otp },
        });
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (err) {
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
            Log in to your account
          </h3>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full text-neutral-100 bg-yellow-500 py-2"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>

          {error && <div className="text-red-500">{error}</div>}
        </form>
      </div>
    </main>
  );
}
