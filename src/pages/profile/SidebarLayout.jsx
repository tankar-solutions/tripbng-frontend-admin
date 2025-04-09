// components/SidebarLayout.jsx
import { Outlet, NavLink } from "react-router-dom";
import {
  User,
  Settings,
  CreditCard,
  CalendarCheck,
} from "lucide-react";

export default function SidebarLayout() {
  const menuItems = [
    { label: "Profile", icon: <User size={18} />, to: "/profile" },
    { label: "Settings", icon: <Settings size={18} />, to: "/settings" },
    { label: "Account", icon: <CreditCard size={18} />, to: "/account" },
    { label: "My Bookings", icon: <CalendarCheck size={18} />, to: "/bookings" },
  ];

  return (
    <div className="flex bg-gray-100  min-h-screen text-gray-800">
      <aside className="bg-white shadow-xl rounded-xl p-6 flex flex-col gap-6 border-r border-gray-200 w-auto min-w-[300px] h-[600px]">
        <img
          src="/logo.png"
          alt="TripBooknGo Logo"
          className="h-12 w-auto object-contain"
        />
        <nav className="flex flex-col gap-2 text-[18px] font-medium">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100 text-gray-700"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1 py-2 text-[17px]">
        <Outlet />
      </main>
    </div>
  );
}
