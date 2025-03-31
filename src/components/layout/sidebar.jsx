import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Logo } from "../icons";
import { Button } from "../ui/button";
import { navitems } from "../../constants/sitedata";

export default function Sidebar() {
  const { pathname } = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (label) => {
    setOpenSubmenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div className="h-full px-3 py-4 overflow-y-auto bg-white">
        <Link
          to="/dashboard"
          className="flex items-center ps-2.5 mb-5 justify-center w-full"
        >
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />

        </Link>
        <ul className="space-y-2">
          {navitems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => item.subItems && toggleSubmenu(item.label)}
                className={`flex items-center justify-between w-full p-2 rounded-lg group text-sm ${
                  pathname === item.href
                    ? "bg-orange-400/75 text-white"
                    : "hover:bg-orange-400/25"
                }`}
              >
                <span className="flex items-center">
                  <span className="ms-3 text-sm">{item.label}</span>
                </span>
                {item.subItems &&
                  (openSubmenus[item.label] ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  ))}
              </button>

              {item.subItems && (
                <ul
                  className={`transition-all overflow-hidden duration-150 ${
                    openSubmenus[item.label] ? "max-h-screen py-2" : "max-h-0"
                  }`}
                >
                  {item.subItems.map((subItem) => (
                    <li key={subItem.label}>
                      <Link
                        to={subItem.href}
                        className={`flex items-center w-full py-2 text-sm transition duration-75 rounded-lg pl-11 group ${
                          pathname === subItem.href
                            ? "bg-orange-400/75 text-white"
                            : "hover:bg-orange-400/25"
                        }`}
                      >
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
