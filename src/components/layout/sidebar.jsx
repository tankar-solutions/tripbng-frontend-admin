import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { navitems } from "../../constants/sitedata";

export default function Sidebar() {
  const { pathname } = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (label) => {
    setOpenSubmenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className="fixed top-0 left-0 z-40 w-72 h-screen transition-transform bg-white shadow-lg sm:translate-x-0 overflow-y-auto border-r border-orange-100">
      <div className="h-full px-4 py-5">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center justify-center mb-8">
          <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
        </Link>

        {/* Nav Items */}
        <ul className="space-y-2 text-gray-800 font-medium">
          {navitems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => item.subItems && toggleSubmenu(item.label)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  pathname === item.href
                    ? "bg-orange-500 text-white font-semibold shadow-md"
                    : "hover:bg-orange-100"
                }`}
              >
                <span className="flex items-center gap-3 truncate w-full text-left">
                  {item.icon && <item.icon className="text-xl flex-shrink-0" />}
                  <span className="truncate">{item.label}</span>
                </span>
                {item.subItems &&
                  (openSubmenus[item.label] ? (
                    <ChevronDown className="w-4 h-4 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  ))}
              </button>
              {item.subItems && (
                <ul
                  className={`transition-all overflow-hidden duration-300 ${
                    openSubmenus[item.label] ? "max-h-screen py-2" : "max-h-0"
                  }`}
                >
                  {item.subItems.map((subItem) => (
                    <li key={subItem.label}>
                      {subItem.subItems ? (
                        <>
                          <button
                            onClick={() => toggleSubmenu(subItem.label)}
                            className={`flex items-center justify-between w-full py-2 pl-12 pr-4 text-sm rounded-lg transition-all ${
                              pathname === subItem.href
                                ? "bg-orange-400 text-white font-semibold"
                                : "hover:bg-orange-100"
                            }`}
                          >
                            {subItem.label}
                            {openSubmenus[subItem.label] ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>
                          <ul
                            className={`transition-all overflow-hidden duration-300 ${
                              openSubmenus[subItem.label]
                                ? "max-h-screen py-1"
                                : "max-h-0"
                            }`}
                          >
                            {subItem.subItems.map((nestedItem) => (
                              <li key={nestedItem.label}>
                                <Link
                                  to={nestedItem.href}
                                  className={`block w-full py-2 pl-16 pr-4 text-sm rounded-lg transition-all ${
                                    pathname === nestedItem.href
                                      ? "bg-orange-300 text-white font-semibold"
                                      : "hover:bg-orange-50"
                                  }`}
                                >
                                  {nestedItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <Link
                          to={subItem.href}
                          className={`block w-full py-2 pl-12 pr-4 text-sm rounded-lg transition-all ${
                            pathname === subItem.href
                              ? "bg-orange-400 text-white font-semibold"
                              : "hover:bg-orange-50"
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      )}
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
