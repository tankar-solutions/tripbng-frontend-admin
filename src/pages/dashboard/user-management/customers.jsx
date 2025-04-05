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

export default function Customers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const usersPerPage = 10;
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Please login first.");
        navigate("/");
        return;
      }

      const response = await fetch("https://api.tripbng.com/admin/getalluser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (response.ok && result.data.success) {
        setUsers(result.data.data || []);
      } else {
        toast.error(result.message || "Failed to fetch users.");
        if (result.message === "Please Login First") {
          localStorage.removeItem("accessToken");
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = searchTerm.trim()
    ? users.filter((u) =>
        (u.name && u.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (u.mobile && u.mobile.includes(searchTerm))
      )
    : users;

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePrev = () => currentPage > 1 && setCurrentPage((prev) => prev - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage((prev) => prev + 1);

  const exportCSV = () => {
    const headers = ["#", "Name", "Email", "Mobile", "User Type", "State", "Address", "Pincode"];
    const rows = filteredUsers.map((u, i) => [
      i + 1,
      u.name || "-",
      u.email || "-",
      u.mobile ? `="${u.mobile}"` : "-",
      u.Usertype || "-",
      u.state || "-",
      u.address || "-",
      u.pincode || "-",
    ]);
    const csvContent =
      "\uFEFF" +
      [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["#", "Name", "Email", "Mobile", "User Type", "State", "Address", "Pincode"];
    const tableRows = filteredUsers.map((u, i) => [
      i + 1,
      u.name || "-",
      u.email || "-",
      u.mobile || "-",
      u.Usertype || "-",
      u.state || "-",
      u.address || "-",
      u.pincode || "-",
    ]);
    autoTable(doc, { head: [tableColumn], body: tableRows });
    doc.save("users.pdf");
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
        title="Users"
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
                  <TableHead className="py-4 px-10 text-sm">Name</TableHead>
                  <TableHead className="py-4 px-10 text-sm">Email</TableHead>
                  <TableHead className="py-4 px-10 text-sm">Mobile</TableHead>
                  <TableHead className="py-4 px-10 text-sm">User Type</TableHead>
                  <TableHead className="py-4 px-10 text-sm">State</TableHead>
                  <TableHead className="py-4 px-10 text-sm">Address</TableHead>
                  <TableHead className="py-4 px-10 text-sm">Pincode</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.length > 0 ? (
                  currentUsers.map((u, index) => (
                    <TableRow key={u._id}>
                      <TableCell className="py-4 px-10">{indexOfFirst + index + 1}</TableCell>
                      <TableCell className="py-4 px-10">{u.name || "-"}</TableCell>
                      <TableCell className="py-4 px-10">{u.email || "-"}</TableCell>
                      <TableCell className="py-4 px-10">{u.mobile || "-"}</TableCell>
                      <TableCell className="py-4 px-10">{u.Usertype || "-"}</TableCell>
                      <TableCell className="py-4 px-10">{u.state || "-"}</TableCell>
                      <TableCell className="py-4 px-10">{u.address || "-"}</TableCell>
                      <TableCell className="py-4 px-10">{u.pincode || "-"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-gray-500 py-6">
                      No customers found.
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
          Total Customers: {users.length}
        </div>

        {filteredUsers.length > usersPerPage && (
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
