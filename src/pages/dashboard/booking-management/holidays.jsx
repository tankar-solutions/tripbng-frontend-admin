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

export default function Holidays() {
  const [holidayBookings, setHolidayBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 10;
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const fetchHolidayBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Please login first.");
        navigate("/");
        return;
      }

      const response = await fetch("https://api.tripbng.com/admin/getalltravquery", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (response.ok && result.data.success) {
        setHolidayBookings(result.data.data || []);
      } else {
        toast.error(result.message || "Failed to fetch holiday bookings.");
        if (result.message === "Please Login First") {
          localStorage.removeItem("accessToken");
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error fetching holiday bookings:", error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidayBookings();
  }, []);

  // Search and Filter Logic
  const filteredBookings = searchTerm.trim()
    ? holidayBookings.filter((booking) => {
        const term = searchTerm.toLowerCase();
        return (
          (booking.username && booking.username.toLowerCase().includes(term)) ||
          (booking.contact && booking.contact.toLowerCase().includes(term)) ||
          (booking.from_city && booking.from_city.toLowerCase().includes(term)) ||
          (booking.to_city && booking.to_city.toLowerCase().includes(term))
        );
      })
    : holidayBookings;

  // Pagination using filtered bookings
  const indexOfLast = currentPage * bookingsPerPage;
  const indexOfFirst = indexOfLast - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const exportCSV = () => {
    const headers = [
      "Username",
      "Contact",
      "From City",
      "To City",
      "Travel Date",
      "Return Date",
      "Days",
      "Nights",
    ];
  
    const formatDate = (dateStr) => {
      if (!dateStr) return "-";
      const dateObj = new Date(dateStr);
      if (isNaN(dateObj)) return "-";
      return `${dateObj.getDate().toString().padStart(2, "0")}-${(dateObj.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${dateObj.getFullYear()}`;
    };
  
    const rows = holidayBookings.map((booking, index) => [
      index + 1,
      booking.username || "-",
      booking.contact || "-",
      booking.from_city || "-",
      booking.to_city || "-",
      formatDate(booking.travel_date),
      formatDate(booking.return_date),
      booking.days || "-",
      booking.nights || "-",
    ]);
  
    const csvContent =
      "\uFEFF" +
      [["Index", ...headers].join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "holiday_bookings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  
  const exportPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      format: "a4",
      unit: "mm",
    });
  
    const now = new Date();
    const currentDate = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1)
      .toString().padStart(2, "0")}/${now.getFullYear()}`;
  
    
    doc.setFontSize(16);
    doc.text("Holiday Bookings Report", 14, 20);
    doc.setFontSize(10);
    const pageWidth = doc.internal.pageSize.getWidth();
    const dateText = `Generated on: ${currentDate}`;
    const textWidth = doc.getTextWidth(dateText);
    doc.text(dateText, pageWidth - textWidth - 14, 20);
  
    const tableColumn = [
      "ID",
      "Username",
      "Contact",
      "From City",
      "To City",
      "Travel Date",
      "Return Date",
      "Days",
      "Nights",
    ];
  
    const tableRows = holidayBookings.map((booking, index) => [
      index + 1,
      booking.username || "-",
      booking.contact || "-",
      booking.from_city || "-",
      booking.to_city || "-",
      booking.travel_date || "-",
      booking.return_date || "-",
      booking.days || "-",
      booking.nights || "-",
    ]);
  
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30, 
      theme: "grid",
      styles: {
        fontSize: 9,
        cellPadding: 3,
        overflow: "linebreak",
        halign: "left",
        valign: "middle",
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: "bold",
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 12 },   
        1: { cellWidth: 35 },   
        2: { cellWidth: 30 }, 
        3: { cellWidth: 30 },   
        4: { cellWidth: 30 },  
        5: { cellWidth: 35 },   
        6: { cellWidth: 35 },   
        7: { cellWidth: 18 },   
        8: { cellWidth: 18 },   
      },
      margin: { left: 14, right: 14 },
      didDrawPage: (data) => {
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(9);
        doc.text(`Page ${doc.internal.getNumberOfPages()}`, data.settings.margin.left, pageHeight - 5);
      },
    });
  
    doc.save("holiday_bookings.pdf");
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
    <section className="flex flex-col gap-6">
      <HeaderNav
        title="Holidays"
        onSearch={(value) => {
          setSearchTerm(value);
          setCurrentPage(1); // Reset to page 1 on search
        }}
      />

      {/* Export Buttons */}
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

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {loading ? (
          <p className="text-center p-6 text-gray-600">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className=" text-gray-800">
                  <TableHead className="py-4 px-10 text-sm">ID</TableHead>
                  <TableHead className="py-4 px-10 text-sm">Username</TableHead>
                  <TableHead className="py-4 px-10 text-sm">Contact</TableHead>
                  <TableHead className="py-4 px-10 text-sm">From City</TableHead>
                  <TableHead className="py-4 px-10 text-sm">To City</TableHead>
                  <TableHead className="py-4 px-10 text-sm">Travel Date</TableHead>
                  <TableHead className="py-4 px-10 text-sm">Return Date</TableHead>
                  <TableHead className="py-4 px-10 text-sm">Days</TableHead>
                  <TableHead className="py-4 px-10 text-sm">Nights</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentBookings.length > 0 ? (
                  currentBookings.map((booking, index) => (
                    <TableRow key={booking._id} className="hover:bg-gray-50 transition">
                      <TableCell className="py-4 px-10">{indexOfFirst + index + 1}</TableCell>
                      <TableCell className="py-4 px-10">{booking.username || "-"}</TableCell>
                      <TableCell className="py-4 px-10">{booking.contact || "-"}</TableCell>
                      <TableCell className="py-4 px-10">{booking.from_city || "-"}</TableCell>
                      <TableCell className="py-4 px-10">{booking.to_city || "-"}</TableCell>
                      <TableCell className="py-4 px-10">{booking.travel_date || "-"}</TableCell>
                      <TableCell className="py-4 px-10">{booking.return_date || "-"}</TableCell>
                      <TableCell className="py-4 px-10">{booking.days || "-"}</TableCell>
                      <TableCell className="py-4 px-10">{booking.nights || "-"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-gray-500 py-6">
                      No holiday bookings found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-2 px-4 gap-4">
        {/* Total Count */}
        <div className="text-sm text-gray-600 w-full md:w-auto order-2 md:order-1">
          Total Bookings: {holidayBookings.length}
        </div>

        {/* Pagination */}
        {filteredBookings.length > bookingsPerPage && (
          <div className="flex gap-2 justify-center w-full md:w-auto order-1 md:order-2">
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
