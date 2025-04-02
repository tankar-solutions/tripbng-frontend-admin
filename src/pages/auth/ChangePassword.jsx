import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("accessToken"); 

    if (!token) {
      toast.error("Unauthorized! Please log in first.");
      setLoading(false);
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("https://api.tripbng.com/admin/changePass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          CurrectPass: currentPassword,
          NewPass: newPassword,
        }),
      });

      const result = await response.json();
      console.log("Change Password Response:", result);

      if (response.ok) {
        toast.success("Password changed successfully!");
        navigate("/dashboard");
      } else {
        toast.error(result.message || "Failed to change password.");
      }
    } catch (err) {
      console.error("Change Password Error:", err);
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
            Change Password
          </h3>
        </div>
        <form onSubmit={handleChangePassword} className="space-y-5">
          <div>
            <label className="font-medium">Current Password</label>
            <Input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="font-medium">New Password</label>
            <Input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full text-neutral-100 bg-yellow-500 py-2"
            disabled={loading}
          >
            {loading ? "Updating..." : "Change Password"}
          </Button>
        </form>
      </div>
    </main>
  );
}
