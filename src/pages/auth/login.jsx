import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("https://tripbng-backend-api-c6kw.onrender.com/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("adminDetails", JSON.stringify(data.adminDetails));
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again later.");
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
            <label className="font-medium">Username</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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