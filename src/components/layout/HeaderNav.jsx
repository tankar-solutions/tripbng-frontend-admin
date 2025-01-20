import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  BellDot,
  ChevronDown,
  Search,
} from "lucide-react";

export default function HeaderNav() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [adminDetails, setAdminDetails] = useState(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const storedAdminDetails = localStorage.getItem("adminDetails");

    if (authToken) {
      setToken(authToken);
      console.log("AuthToken from localStorage:", authToken);  // Log the token
    }

    if (storedAdminDetails) {
      const parsedAdminDetails = JSON.parse(storedAdminDetails);  // Parse the stored JSON string
      setAdminDetails(parsedAdminDetails);
      console.log("Admin Details from localStorage:", parsedAdminDetails);  // Log the admin details
    }
  }, []);
  return (
    <div className="flex justify-between items-center px-4 py-3">
      {/* Dashboard Title */}
      <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>

      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="flex items-center gap-3 bg-white rounded-xl p-2 border border-gray-300">
          <Search className="text-gray-500" size={15} />
          <input
            type="search"
            name=""
            id=""
            placeholder="Search anything"
            className="outline-none bg-transparent text-sm text-gray-700"
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
        <div
          className="flex items-center gap-3 relative"
          onClick={toggleDropdown}
        >
          <div className="w-10 h-10 bg-orange-400/50 rounded-xl flex items-center justify-center">
            <p className="text-white font-semibold">M</p>
            {/* Placeholder for initials */}
          </div>
          <div>
            <p className="text-sm text-gray-800">{adminDetails?.fullName}</p>
            <p className="text-xs text-neutral-400">Admin</p>
          </div>
          <ChevronDown size={20} className="text-gray-500" />

          {/* Dropdown Menu */}
          <div
            className={`absolute right-0 mt-32 w-48 bg-white shadow-lg rounded-lg border border-gray-200 transition-all duration-300 ease-in-out transform ${
              isDropdownOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ pointerEvents: isDropdownOpen ? "auto" : "none" }}
          >
            <ul className="flex flex-col">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Account Settings
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
