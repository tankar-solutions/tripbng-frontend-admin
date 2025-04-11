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
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Flights() {
  const [flightBookings, setFlightBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchFlightBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Please login first.");
        navigate("/");
        return;
      }

      const response = await fetch("https://api.tripbng.com/admin/getallflightbooking", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (response.ok && result.data.success) {
        setFlightBookings(result.data.data || []);
      } else {
        toast.error(result.message || "Failed to fetch flight bookings.");
        if (result.message === "Please Login First") {
          localStorage.removeItem("accessToken");
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error fetching flight bookings:", error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlightBookings();
  }, []);

  const filteredBookings = searchTerm.trim()
    ? flightBookings.filter((booking) =>
        (booking.SeatBookUserEmail &&
          booking.SeatBookUserEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (booking.BookingRefNum &&
          booking.BookingRefNum.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : flightBookings;

  const indexOfLast = currentPage * bookingsPerPage;
  const indexOfFirst = indexOfLast - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  const handlePrev = () => currentPage > 1 && setCurrentPage(prev => prev - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(prev => prev + 1);

  const exportCSV = () => {
    const headers = [
      "ID", "Email", "User Type", "Booking Ref", "Flight", "Pax",
      "Booking Status", "Travel Data", "PNR", "Date", "Time"
    ];

    const rows = filteredBookings.map((b, i) => {
      const dateObj = new Date(b.createdAt);
      const date = `${dateObj.getDate().toString().padStart(2, "0")}-${(dateObj.getMonth() + 1)
        .toString().padStart(2, "0")}-${dateObj.getFullYear()}`;
      const time = `${dateObj.getHours().toString().padStart(2, "0")}:${dateObj
        .getMinutes().toString().padStart(2, "0")}:${dateObj.getSeconds().toString().padStart(2, "0")}`;

      return [
        i + 1,
        b.SeatBookUserEmail || "-",
        b.UserType || "-",
        b.BookingRefNum || "-",
        b.Flight || "-",
        b.Pax || "-",
        b.BookingStatus || "-",
        b.TravelData || "-",
        b.Pnr || "-",
        date,
        time,
      ];
    });

    const csvContent =
      "\uFEFF" +
      [headers.join(","), ...rows.map(row => row.map(cell => `"${cell}"`).join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "flight_bookings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const exportPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "A4", 
    });
  
    const now = new Date();
    const currentDate = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1)
      .toString().padStart(2, "0")}/${now.getFullYear()}`;
  
    doc.setFontSize(16);
    doc.text("Flight Bookings Report", 40, 40);
    doc.setFontSize(10);
    const pageWidth = doc.internal.pageSize.getWidth();
    const dateText = `Generated on: ${currentDate}`;
    const textWidth = doc.getTextWidth(dateText);
    doc.text(dateText, pageWidth - textWidth - 40, 40);
  
    const tableColumn = [
      "ID",
      "Email",
      "User Type",
      "Booking Ref",
      "Flight",
      "Pax",
      "Status",
      "Travel Data",
      "PNR",
      "Date",
      "Time",
    ];
  
    const tableRows = filteredBookings.map((b, i) => {
      const dateObj = new Date(b.createdAt);
      return [
        i + 1,
        b.SeatBookUserEmail || "-",
        b.UserType || "-",
        b.BookingRefNum || "-",
        b.Flight || "-",
        b.Pax || "-",
        b.BookingStatus || "-",
        b.TravelData || "-",
        b.Pnr || "-",
        `${dateObj.getDate().toString().padStart(2, "0")}-${(dateObj.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${dateObj.getFullYear()}`,
        dateObj.toLocaleTimeString(),
      ];
    });
  

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 60,
      theme: "grid", 
      styles: {
        fontSize: 9,
        cellPadding: 6,
        overflow: "linebreak",
        valign: "middle",
        halign: "left",
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: "bold",
        halign: "center",
      },
      margin: { top: 60, left: 30, right: 30 },
      didDrawPage: (data) => {
        doc.setFontSize(9);
        doc.text(
          `Page ${doc.internal.getNumberOfPages()}`,
          data.settings.margin.left,
          doc.internal.pageSize.height - 10
        );
      },
    });
  
    doc.save("flight_bookings.pdf");
  };
  

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i <= 3 || i === totalPages || i === currentPage) {
        pages.push(i);
      } else if (i === 4 && currentPage > 5) {
        pages.push("...");
      } else if (i > 3 && i < totalPages - 1 && Math.abs(i - currentPage) <= 1) {
        pages.push(i);
      }
    }

    const uniquePages = [...new Set(pages)];
    return uniquePages.map((page, index) =>
      page === "..." ? (
        <span key={index} className="px-2 py-1 text-gray-500">...</span>
      ) : (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1 rounded-full text-sm ${
            currentPage === page
              ? "bg-orange-500 text-white font-semibold"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          {page}
        </button>
      )
    );
  };

  return (
    <section className="flex flex-col gap-6 px-8">
    <HeaderNav
      title="Flights"
      onSearch={(value) => {
        setSearchTerm(value);
        setCurrentPage(1);
      }}
    />
  
    <div className="flex flex-col sm:flex-row justify-end gap-3">
      <button onClick={exportCSV} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
        Export CSV
      </button>
      <button onClick={exportPDF} className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600">
        Export PDF
      </button>
    </div>
  
    <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
      {loading ? (
        <p className="text-center p-6 text-gray-600">Loading...</p>
      ) : (
        <div className="min-w-[1200px]">
          <Table>
            <TableHeader>
              <TableRow className="text-gray-800 bg-gray-50">
                <TableHead className="py-4 px-6 text-sm">ID</TableHead>
                <TableHead className="py-4 px-6 text-sm">Email</TableHead>
                <TableHead className="py-4 px-6 text-sm">User Type</TableHead>
                <TableHead className="py-4 px-6 text-sm">Booking Ref</TableHead>
                <TableHead className="py-4 px-6 text-sm">Flight</TableHead>
                <TableHead className="py-4 px-6 text-sm">Pax</TableHead>
                <TableHead className="py-4 px-6 text-sm">Status</TableHead>
                <TableHead className="py-4 px-6 text-sm">Travel Data</TableHead>
                <TableHead className="py-4 px-6 text-sm">PNR</TableHead>
                <TableHead className="py-4 px-6 text-sm">Date</TableHead>
                <TableHead className="py-4 px-6 text-sm">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBookings.length > 0 ? (
                currentBookings.map((booking, index) => {
                  const createdAt = new Date(booking.createdAt);
                  return (
                    <TableRow key={booking._id}>
                      <TableCell className="py-4 px-6 text-sm">{indexOfFirst + index + 1}</TableCell>
                      <TableCell className="py-4 px-6 text-sm">{booking.SeatBookUserEmail || "-"}</TableCell>
                      <TableCell className="py-4 px-6 text-sm">{booking.UserType || "-"}</TableCell>
                      <TableCell className="py-4 px-6 text-sm">{booking.BookingRefNum || "-"}</TableCell>
                      <TableCell className="py-4 px-6 text-sm">{booking.Flight || "-"}</TableCell>
                      <TableCell className="py-4 px-6 text-sm">{booking.Pax || "-"}</TableCell>
                      <TableCell className="py-4 px-6 text-sm">{booking.BookingStatus || "-"}</TableCell>
                      <TableCell className="py-4 px-6 text-sm">{booking.TravelData || "-"}</TableCell>
                      <TableCell className="py-4 px-6 text-sm">{booking.Pnr || "-"}</TableCell>
                      <TableCell className="py-4 px-6 text-sm">{createdAt.toLocaleDateString()}</TableCell>
                      <TableCell className="py-4 px-6 text-sm">{createdAt.toLocaleTimeString()}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={11} className="text-center text-gray-500 py-6">
                    No flight bookings found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  
    <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
      <div className="text-sm text-gray-600 order-2 md:order-1">
        Total Bookings: {flightBookings.length}
      </div>
  
      {filteredBookings.length > bookingsPerPage && (
        <div className="flex flex-wrap gap-2 justify-center order-1 md:order-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg text-sm ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-100 text-orange-500 hover:bg-blue-200"
            }`}
          >
            Previous
          </button>
          {renderPagination()}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg text-sm ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-100 text-orange-500 hover:bg-blue-200"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  </section>
  
  );
}
