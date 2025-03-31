import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function OtpVerify() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) {
      toast.error("Invalid Access. Please login first.");
      navigate("/");
    }
  }, [email, navigate]);

  const handleChange = (element, index) => {
    const value = element.value.replace(/\D/, ""); // Allow only digits
    if (value) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    const otpCode = otp.join("");
  
    if (otpCode.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch(
        "https://tripbng-backend-api-c6kw.onrender.com/admin/vfyOTPLogin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code: otpCode }),
        }
      );
  
      const result = await response.json();
      console.log("OTP API Response:", result); // ✅ Debugging output
  
      const token = result?.data?.data?.AccessTocken || result?.data?.AccessTocken || result?.token;
      console.log("Extracted Token:", token); // ✅ Debugging output
  
      if (response.ok && token) {
        localStorage.setItem("accessToken", token);
        toast.success("OTP Verified Successfully!");
        navigate("/dashboard");
      } else {
        toast.error("Token not received. Please check API response.");
      }
    } catch (err) {
      console.error("OTP Verification Error:", err);
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
            Enter OTP
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            OTP sent to {email || "your email"}
          </p>
        </div>
        <form onSubmit={handleVerify} className="space-y-5">
          <div className="flex justify-between gap-2">
            {otp.map((data, index) => (
              <Input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-12 text-center text-lg font-semibold border border-gray-400 focus:outline-none focus:border-yellow-500"
              />
            ))}
          </div>
          <Button
            type="submit"
            className="w-full text-neutral-100 bg-yellow-500 py-2"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
      </div>
    </main>
  );
} 