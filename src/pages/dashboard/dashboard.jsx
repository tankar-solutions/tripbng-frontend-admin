import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderNav from "../../components/layout/HeaderNav";
import toast from "react-hot-toast";
import { MdDirectionsBus } from "react-icons/md";
import { PiAirplaneTiltFill } from "react-icons/pi";
import { FaHotel, FaUsers } from "react-icons/fa6";
import { GiPalmTree } from "react-icons/gi";
import { SiLibreofficeimpress } from "react-icons/si";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { RiUserStarLine } from "react-icons/ri";

export default function AdminDashboardReport() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    flights: 0,
    holidays: 0,
    visa: 0,
    buses: 0,
    hotels: 0,
    users: 0,
    corporates: 0,
    agents: 0,
  });

  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      toast.error("Unauthorized! Please log in first.");
      navigate("/");
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    const fetchCounts = async () => {
      try {
        const [
          flightRes,
          holidayRes,
          visaRes,
          busRes,
          userRes,
          agentRes
        ] = await Promise.all([
          axios.get("https://api.tripbng.com/admin/getallflightbooking", { headers }),
          axios.get("https://api.tripbng.com/admin/getalltravquery", { headers }),
          axios.get("https://api.tripbng.com/admin/getallvisabooking", { headers }),
          axios.get("https://api.tripbng.com/admin/getallbusbooking", { headers }),
          axios.get("https://api.tripbng.com/admin/getalluser", { headers }),
          axios.get("https://api.tripbng.com/admin/getallagent", { headers })
        ]);

        const allResponses = [flightRes, holidayRes, visaRes, busRes];
        const isExpired = allResponses.some((res) =>
          res?.data?.message?.toLowerCase()?.includes("expire")
        );
        if (isExpired) {
          toast.error("Session expired. Please login again.");
          localStorage.removeItem("accessToken");
          navigate("/");
          return;
        }

        const approvedAgents = agentRes?.data?.data?.data?.AproveAgents || [];
        const unapprovedAgents = agentRes?.data?.data?.data?.UnAproveAgents || [];

        setCounts({
          flights: Array.isArray(flightRes.data?.data?.data) ? flightRes.data.data.data.length : 0,
          holidays: Array.isArray(holidayRes.data?.data?.data) ? holidayRes.data.data.data.length : 0,
          visa: Array.isArray(visaRes.data?.data?.data) ? visaRes.data.data.data.length : 0,
          buses: Array.isArray(busRes.data?.data?.data) ? busRes.data.data.data.length : 0,
          hotels: 0,
          users: Array.isArray(userRes.data?.data?.data) ? userRes.data.data.data.length : 0,
          corporates: 0,
          agents: approvedAgents.length + unapprovedAgents.length,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, [navigate, token]);

  const bookingCards = [
    {
      label: "Flights",
      count: counts.flights,
      icon: <PiAirplaneTiltFill className="text-4xl text-blue-900" />,
      path: "/dashboard/booking-management/flights",
    },
    {
      label: "Hotels",
      count: counts.hotels,
      icon: <FaHotel className="text-4xl text-blue-900" />,
      path: "/dashboard/booking-management/hotels",
    },
    {
      label: "Holidays",
      count: counts.holidays,
      icon: <GiPalmTree className="text-4xl text-blue-900" />,
      path: "/dashboard/booking-management/holidays",
    },
    {
      label: "Visa",
      count: counts.visa,
      icon: <SiLibreofficeimpress className="text-4xl text-blue-900" />,
      path: "/dashboard/booking-management/visa-services",
    },
    {
      label: "Buses",
      count: counts.buses,
      icon: <MdDirectionsBus className="text-4xl text-blue-900" />,
      path: "/dashboard/booking-management/buses",
    },
  ];

  const userCards = [
    {
      label: "Users",
      count: counts.users,
      icon: <FaUsers className="text-4xl text-green-700" />,
      path: "/dashboard/user-management/customers",
    },
    {
      label: "Agents",
      count: counts.agents,
      icon: <HiOutlineBuildingOffice2 className="text-4xl text-green-700" />,
      path: "/dashboard/user-management/agents",
    },
    {
      label: "Corporate",
      count: counts.corporates,
      icon: <RiUserStarLine className="text-4xl text-green-700" />,
      path: "/dashboard/user-management/corporates",
    },
  ];

  if (loading) {
    return (
      <main className="min-h-screen flex justify-center items-center bg-gray-100">
        <p className="text-xl font-semibold text-blue-600 animate-pulse">
          Loading dashboard...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 space-y-6">
      <HeaderNav title="Dashboard Report" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookingCards.map((item, index) => (
          <DashboardCard key={index} {...item} onClick={() => navigate(item.path)} />
        ))}
      </div>

      <hr className="border-t-2 border-gray-300 my-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userCards.map((item, index) => (
          <DashboardCard key={index} {...item} onClick={() => navigate(item.path)} />
        ))}
      </div>
    </main>
  );
}

function DashboardCard({ label, count, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-3xl">{icon}</span>
        <span className="text-sm text-blue-500">View All →</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-1">{label}</h3>
      <p className="text-4xl font-bold text-orange-500">
        {count}
        <span className="text-sm text-gray-500 font-normal">Total bookings</span>
      </p>
    </div>
  );
}
