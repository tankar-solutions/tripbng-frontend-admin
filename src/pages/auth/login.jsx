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

  const handleLogin = (e) => {
    e.preventDefault(); 
    setLoading(true);
    setError("");
    
    // Simulate a successful login and navigate
    setTimeout(() => {
      // Here you can assume the login is successful without any actual API call
      localStorage.setItem("authToken", "dummyToken"); // Simulating setting a token
      localStorage.setItem("adminDetails", JSON.stringify({ name: "Admin" })); // Simulating setting admin details
      console.log("Login successful");
      navigate('/dashboard'); // Redirect to dashboard
      toast.success("Login successful!"); // Optional success toast
    }, 1000); // Simulating delay

    setLoading(false);
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
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
