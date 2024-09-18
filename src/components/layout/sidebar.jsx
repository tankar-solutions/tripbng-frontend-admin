import { Link, useLocation } from "react-router-dom";
import { NAV_ITEMS } from "../../constants/sitedata";

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-44 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <Link
            to={"/login"}
            className="flex items-center ps-2.5 mb-5 justify-center w-full"
          >
            <img src="./logo.png" className="w-full" alt="Logo" />
          </Link>
          <ul className="space-y-2">
            {NAV_ITEMS.map((el) => {
              const Icon = el.icon;
              return (
                <li key={el.label}>
                  <Link
                    to={el.href}
                    className={`flex items-center p-2 text-neutral-900 rounded-lg group transition-all duration-300 ${
                      pathname === el.href
                        ? "bg-orange-400/75 text-white font-medium"
                        : "hover:bg-orange-400/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="ms-3 text-sm">{el.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}
