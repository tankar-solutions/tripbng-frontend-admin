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

export default function VisaBookings() {
  const [visaBookings, setVisaBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const bookingsPerPage = 10;
  const navigate = useNavigate();

  const fetchVisaBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Please login first.");
        navigate("/");
        return;
      }

      const response = await fetch("https://api.tripbng.com/admin/getallvisabooking", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (response.ok && result.data.success) {
        setVisaBookings(result.data.data || []);
      } else {
        toast.error(result.message || "Failed to fetch visa bookings.");
        if (result.message === "Please Login First") {
          localStorage.removeItem("accessToken");
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error fetching visa bookings:", error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisaBookings();
  }, []);

  const filteredBookings = searchTerm.trim()
    ? visaBookings.filter(
        (b) =>
          (b.username && b.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (b.contact && b.contact.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (b.for && b.for.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : visaBookings;

  const indexOfLast = currentPage * bookingsPerPage;
  const indexOfFirst = indexOfLast - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  const handlePrev = () => currentPage > 1 && setCurrentPage((prev) => prev - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage((prev) => prev + 1);

  const exportCSV = () => {
    const headers = [
      "#",
      "Username",
      "Contact",
      "Destination",
      "Travel Date",
      "Stay Days",
      "Visa Type",
      "Created Date",
      "Created Time",
    ];
  
    const rows = filteredBookings.map((b, i) => {
      const createdDateObj = new Date(b.createdAt);
      const travelDateObj = b.travel_date ? new Date(b.travel_date) : null;
  
      const createdDate = `${createdDateObj.getDate().toString().padStart(2, "0")}-${(createdDateObj.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${createdDateObj.getFullYear()}`;
  
      const createdTime = `${createdDateObj.getHours().toString().padStart(2, "0")}:${createdDateObj
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${createdDateObj.getSeconds().toString().padStart(2, "0")}`;
  
      const travelDate = travelDateObj
        ? `${travelDateObj.getDate().toString().padStart(2, "0")}-${(travelDateObj.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${travelDateObj.getFullYear()}`
        : "-";
  
      const contactSafe = b.contact ? `'${b.contact}` : "-";
  
      return [
        i + 1,
        b.username || "-",
        contactSafe,
        b.for || "-",
        travelDate,
        b.stayin_days || "-",
        b.visa_type || "-",
        createdDate,
        createdTime,
      ];
    });
  
    const csvContent =
      "\uFEFF" +
      [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "visa_bookings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  
  
  const exportPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape", 
      unit: "mm",
      format: "a4",
    });
  
    const now = new Date();
    const currentDate = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${now.getFullYear()}`;
  

    doc.setFontSize(16);
    doc.text("Visa Bookings Report", 14, 15);
    doc.setFontSize(10);
    const pageWidth = doc.internal.pageSize.getWidth();
    const dateText = `Generated on: ${currentDate}`;
    const textWidth = doc.getTextWidth(dateText);
    doc.text(dateText, pageWidth - textWidth - 14,15);
  
  
    const headers = [
      "ID",
      "Username",
      "Contact",
      "Destination",
      "Travel Date",
      "Stay Days",
      "Visa Type",
      "Created At",
    ];
  
    const rows = filteredBookings.map((b, i) => {
      const createdAt = new Date(b.createdAt);
      const formattedDate = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${createdAt.getDate().toString().padStart(2, "0")}`;
  
      return [
        i + 1,
        b.username || "-",
        b.contact || "-",
        b.for || "-",
        b.travel_date || "-",
        b.stayin_days || "-",
        b.visa_type || "-",
        formattedDate,
      ];
    });
  
    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 22,
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
        2: { cellWidth: 35 },  
        3: { cellWidth: 35 },  
        4: { cellWidth: 30 },  
        5: { cellWidth: 20 },  
        6: { cellWidth: 25 },  
        7: { cellWidth: 30 },  
      },
      margin: { left: 14, right: 14 },
    });
  
    doc.save("visa_bookings.pdf");
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
        title="Visa Bookings"
        onSearch={(value) => {
          setSearchTerm(value);
          setCurrentPage(1);
        }}
      />

      <div className="flex justify-end gap-3 px-4">
        <button onClick={exportCSV} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow">
          Export CSV
        </button>
        <button onClick={exportPDF} className="bg-green-500 text-white px-4 py-2 rounded-lg shadow">
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
                <TableRow className="text-gray-600">
                  <TableHead className="py-4 px-10 text-sm">ID</TableHead>
                  <TableHead className="py-4 px-10 text-sm">Username</TableHead>
                  <TableHead className="py-4 px-10 text-sm">Contact</TableHead>
                  <TableHead className="py-4 px-10 text-sm">Destination</TableHead>
                  <TableHead className="py-4 px-10 text-sm">Travel Date</TableHead>
                  <TableHead className="py-4 px-10 text-sm">Stay Days</TableHead>
                  <TableHead className="py-4 px-10 text-sm">Visa Type</TableHead>
                  <TableHead className="py-4 px-10 text-sm">Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentBookings.length > 0 ? (
                  currentBookings.map((b, index) => (
                    <TableRow key={b._id}>
                      <TableCell className="py-4 px-10 text-sm">{indexOfFirst + index + 1}</TableCell>
                      <TableCell className="py-4 px-10 text-sm">{b.username || "-"}</TableCell>
                      <TableCell className="py-4 px-10 text-sm">{b.contact || "-"}</TableCell>
                      <TableCell className="py-4 px-10 text-sm">{b.for || "-"}</TableCell>
                      <TableCell className="py-4 px-10 text-sm">{b.travel_date || "-"}</TableCell>
                      <TableCell className="py-4 px-10 text-sm">{b.stayin_days || "-"}</TableCell>
                      <TableCell className="py-4 px-10 text-sm">{b.visa_type || "-"}</TableCell>
                      <TableCell className="py-4 px-10 text-sm">{new Date(b.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                      No visa bookings found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-2 px-4 gap-4">
        <div className="text-sm text-gray-600 w-full md:w-auto order-2 md:order-1">
          Total Bookings: {visaBookings.length}
        </div>

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
