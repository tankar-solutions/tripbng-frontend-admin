import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useLocation } from "react-router-dom";

export default function ForgotPassword() {
  const location = useLocation();
  const defaultEmail = location.state?.email || "";

  const [email, setEmail] = useState(defaultEmail);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-4">
          <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
            Reset your password
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Enter your email to receive an OTP and set a new password.
          </p>
        </div>

        <form className="space-y-4">
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

          <Button className="w-full bg-yellow-500 text-white py-2">
            Reset Password
          </Button>
        </form>
      </div>
    </main>
  );
}
