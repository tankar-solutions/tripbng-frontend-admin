import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { apiService } from "../../services/api";

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
      const response = await apiService.post("/admin/vfyOTPLogin", {
        email,
        code: otpCode,
      });

      console.log("OTP API Response:", response);

      const token = response?.data?.data?.AccessTocken;

      if (token) {
        localStorage.setItem("accessToken", token);

        // Get current date and time
        const now = new Date();
        const time = now.toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        // Get browser info
        const browser = navigator.userAgent;

        // Get IP info using public API
        const ipResponse = await fetch("https://ipinfo.io/json?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2U2MzhkMWRjOWU3ODlhNzI5OGFjNmUiLCJ1c2VybmFtZSI6Im5pZGhpIiwiZW1haWwiOiJ0aHVtbWFybmlkaGk3QGdtYWlsLmNvbSIsInR5cGUiOiJBZG1pbiIsImlhdCI6MTc0NDI1OTgzOSwiZXhwIjoxNzQ1NTU1ODM5fQ.V3WUmakTn1biJsnA3cipDu_woT8jZHSyuclWpUkUSsk");
        const ipData = await ipResponse.json();
        const ip = ipData.ip;

        // Store login record
        const loginEntry = { time, ip, browser };
        const previousLogins = JSON.parse(localStorage.getItem("loginData")) || [];
        const updatedLogins = [loginEntry, ...previousLogins.slice(0, 19)];
        localStorage.setItem("loginData", JSON.stringify(updatedLogins));

        toast.success("OTP Verified Successfully!");
        navigate("/dashboard");
      } else {
        toast.error("Token not received. Please check API response.");
      }
    } catch (err) {
      console.error("OTP Verification Error:", err);
      toast.error(err.response?.data?.message || "Something went wrong");
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
