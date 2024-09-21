import Sidebar from "../../components/layout/sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-4 sm:ml-64">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
