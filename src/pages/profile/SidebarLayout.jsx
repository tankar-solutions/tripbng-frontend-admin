import React, { useState } from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import {
  User,
  Settings,
  CreditCard,
  CalendarCheck,
  Menu,
  X,
} from "lucide-react";

export default function SidebarLayout() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Profile", icon: <User size={18} />, to: "/profile" },
    { label: "Settings", icon: <Settings size={18} />, to: "/settings" },
    { label: "Account", icon: <CreditCard size={18} />, to: "/account" },
    { label: "My Bookings", icon: <CalendarCheck size={18} />, to: "/bookings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <aside
        className={`fixed z-40 lg:static top-0 left-0 h-screen bg-white shadow-xl rounded-r-xl p-6 border-r border-gray-200 w-72 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <Link to="/dashboard" className="flex items-center justify-center mb-8">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
        </Link>
        <nav className="flex flex-col gap-2 text-lg font-medium">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100 text-gray-700"
                }`
              }
              onClick={() => setIsOpen(false)} 
            >
            {item.icon}
            {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 pt-20 lg:pt-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
