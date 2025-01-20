import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom"; // Use React Router's useNavigate
import { apiService } from "../../services/api";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate(); // Use React Router's navigate hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the form's default submit behavior
    setLoading(true);
    setError("");
    try {
      const response = await apiService.post("/admin/login", {
        email,
        password,
      });
      if (response.success) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("adminDetails", JSON.stringify(response.data.adminDetails));
        console.log("Login successful");
        navigate('/dashboard')
        toast.success("Login successful!");
        console.log("aa", response.data);
        
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-8">
          <div className="mt-5">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
          </div>
        </div>
        <form onSubmit={handleLogin} className="space-y-5"> {/* onSubmit triggers handleLogin */}
          <div>
            <label className="font-medium">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state on change
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state on change
            />
          </div>

          <Button
            type="submit" 
            className="w-full text-neutral-100 bg-yellow-500 py-2"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>

          {error && <div className="text-red-500">{error}</div>} {/* Display error message */}
        </form>
      </div>
    </main>
  );
}
