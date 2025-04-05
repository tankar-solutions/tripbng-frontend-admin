import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { BellDot, ChevronDown, Search } from "lucide-react";
import toast from "react-hot-toast";

export default function HeaderNav({ title, onSearch }) {
  const [token, setToken] = useState(null);
  const [adminDetails, setAdminDetails] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const storedAdminDetails = localStorage.getItem("adminDetails");

    if (authToken) {
      setToken(authToken);
      console.log("AuthToken from localStorage:", authToken);
    }

    try {
      if (storedAdminDetails) {
        const parsedAdminDetails = JSON.parse(storedAdminDetails);
        setAdminDetails(parsedAdminDetails);
        console.log("Admin Details from localStorage:", parsedAdminDetails);
      }
    } catch (error) {
      console.error("Error parsing admin details:", error);
    }
  }, []);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    setDropdownOpen(false);
    navigate("/logout");
  };

  const handleSearchChange = (e) => {
    onSearch && onSearch(e.target.value); // Call parent's search handler
  };

  return (
    <div className="flex justify-between items-center px-4 py-3 ">
      {/* Dynamic Page Title */}
      <h1 className="text-lg font-semibold text-gray-800">{title}</h1>

      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="flex items-center gap-3 bg-white rounded-xl p-2 border border-gray-300">
          <Search className="text-gray-500" size={15} />
          <input
            type="search"
            placeholder="Search anything"
            className="outline-none bg-transparent text-sm text-gray-700"
            onChange={handleSearchChange}
          />
        </div>

        {/* Notification Button */}
        <Button
          size="icon"
          className="bg-white text-neutral-700 p-2 hover:bg-gray-100 rounded-full"
        >
          <BellDot size={20} />
        </Button>

        {/* User Profile */}
        <div className="relative">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={toggleDropdown}
          >
            <div className="w-10 h-10 bg-orange-400/50 rounded-xl flex items-center justify-center">
              <p className="text-white font-semibold">
                {adminDetails?.fullName ? adminDetails.fullName[0].toUpperCase() : "A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-800">
                {adminDetails?.fullName || "Admin"}
              </p>
              <p className="text-xs text-neutral-400">Admin</p>
            </div>
            <ChevronDown size={20} className="text-gray-500" />
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50 transition-all duration-200 ease-in-out">
              <ul className="flex flex-col">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/change-password");
                    setDropdownOpen(false);
                  }}
                >
                  Change Password
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/forget-password");
                    setDropdownOpen(false);
                  }}
                >
                  Forget Password
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
