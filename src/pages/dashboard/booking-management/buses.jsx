import { useEffect, useState } from "react";
import HeaderNav from "../../../components/layout/HeaderNav";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Buses() {
  const [busBookings, setBusBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("Unauthorized! Please log in first.");
      navigate("/");
      return;
    }

    const fetchBusData = async () => {
      try {
        const response = await axios.get(
          "https://api.tripbng.com/admin/getallbusbooking",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = response.data?.data?.data;
        if (Array.isArray(data)) {
          setBusBookings(data);
          setFilteredBookings(data);
        } else {
          toast.error("No bus booking data found.");
        }
      } catch (error) {
        console.error("Failed to fetch bus data:", error);
        toast.error("Failed to fetch bus booking data.");
      }
    };

    fetchBusData();
  }, [navigate]);


  useEffect(() => {
    const filtered = busBookings.filter((booking) =>
      booking.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBookings(filtered);
    setCurrentPage(1);
  }, [searchTerm, busBookings]);

  const exportCSV = () => {
    const csvContent = [
      [
        "Book ID",
        "Customer Name",
        "Bus No",
        "Company",
        "Route",
        "Departure",
        "Arrival",
        "Date",
        "Total Passengers",
        "Status",
      ],
      ...filteredBookings.map((b) => [
        b._id?.slice(-6),
        b.username,
        b.bus_number,
        b.company,
        b.route,
        b.departure_time,
        b.arrival_time,
        b.date,
        b.total_passengers,
        b.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "bus_bookings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Bus Bookings", 14, 16);
    autoTable(doc, {
      head: [
        [
          "Book ID",
          "Customer",
          "Bus No",
          "Company",
          "Route",
          "Departure",
          "Arrival",
          "Date",
          "Passengers",
          "Status",
        ],
      ],
      body: filteredBookings.map((b) => [
        b._id?.slice(-6),
        b.username,
        b.bus_number,
        b.company,
        b.route,
        b.departure_time,
        b.arrival_time,
        b.date,
        b.total_passengers,
        b.status,
      ]),
    });
    doc.save("bus_bookings.pdf");
  };

  const totalPages = Math.ceil(filteredBookings.length / rowsPerPage);
  const paginatedData = filteredBookings.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <section className="flex flex-col gap-6">
      <HeaderNav
        title="Buses"
        showSearch
        searchValue={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex justify-end gap-3 px-4">
        <button
          onClick={exportCSV}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow transition"
        >
          Export CSV
        </button>
        <button
          onClick={exportPDF}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow transition"
        >
          Export PDF
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book ID</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Bus No</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Arrival</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total Passengers</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((booking, index) => (
                <TableRow key={booking._id || index} className="text-sm">
                  <TableCell className="font-normal">
                    {booking._id?.slice(-6) || "N/A"}
                  </TableCell>
                  <TableCell>{booking.username || "N/A"}</TableCell>
                  <TableCell>{booking.bus_number || "N/A"}</TableCell>
                  <TableCell>{booking.company || "N/A"}</TableCell>
                  <TableCell>{booking.route || "N/A"}</TableCell>
                  <TableCell>{booking.departure_time || "N/A"}</TableCell>
                  <TableCell>{booking.arrival_time || "N/A"}</TableCell>
                  <TableCell>{booking.date || "N/A"}</TableCell>
                  <TableCell>{booking.total_passengers || "0"}</TableCell>
                  <TableCell>
                    <p
                      className={`w-fit p-1 text-xs rounded-md ${
                        booking.status === "Confirmed"
                          ? "bg-green-200 text-green-800"
                          : booking.status === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {booking.status || "Pending"}
                    </p>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="text-center">
                  No bookings available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 items-center py-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
}
