import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderNav from "../../components/layout/HeaderNav";
import toast from "react-hot-toast";

export default function AdminDashboardReport() {
  const navigate = useNavigate();
  const [flightCount, setFlightCount] = useState(0);

  useEffect(() => {
    const fetchFlightCount = async () => {
      const token = localStorage.getItem("accessToken"); // ✅ Corrected token key

      if (!token) {
        toast.error("Unauthorized! Please log in first.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("https://api.tripbng.com/admin/getallflightbooking", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Log the entire response to verify the data structure
        console.log("API Response:", response.data);

        // ✅ Check if response indicates an expired token
        if (response.data?.message === "Your Access Token is expire Please Login Again") {
          toast.error("Session expired. Please login again.");
          localStorage.removeItem("accessToken");
          navigate("/login");
          return;
        }

        if (response.status === 200 && Array.isArray(response.data?.data)) {
          setFlightCount(response.data.data.length);  // Set the count from the response data
        } else {
          toast.error("No flight data found.");
        }
      } catch (error) {
        console.error("Failed to fetch flight data:", error);
        toast.error("Failed to fetch flight data.");
      }
    };

    fetchFlightCount();
  }, [navigate]);

  const reportData = [
    { label: "Flights", count: flightCount, icon: "✈️", path: "/dashboard/booking-management/flights" },
    { label: "Hotels", count: 72, icon: "🏨", path: "/admin/hotels" },
    { label: "Holidays", count: 38, icon: "🌴", path: "/admin/holidays" },
    { label: "Visa", count: 22, icon: "🛂", path: "/admin/visa" },
    { label: "Buses", count: 89, icon: "🚌", path: "/admin/buses" },
  ];

  return (
    <main className="min-h-screen bg-gray-100 p-6 space-y-6">
      <HeaderNav title="Dashboard Report" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {reportData.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">{item.icon}</span>
              <span className="text-sm text-blue-500">View All →</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.label}</h3>
            <p className="text-4xl font-bold text-blue-600">{item.count}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
