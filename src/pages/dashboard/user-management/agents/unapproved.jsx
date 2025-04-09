import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderNav from "../../../../components/layout/HeaderNav";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { toast } from "react-toastify";
import moment from "moment";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const UnapprovedAgentsPage = () => {
  const navigate = useNavigate();
  const [unapprovedAgents, setUnapprovedAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchUnapprovedAgents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Please login first.");
        navigate("/");
        return;
      }

      const response = await fetch("https://api.tripbng.com/admin/getallagent", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok && result.data && result.data.data) {
        setUnapprovedAgents(result.data.data.UnAproveAgents || []);
      } else {
        toast.error("No unapproved agents found.");
      }
    } catch (error) {
      console.error("Error fetching unapproved agents:", error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnapprovedAgents();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
    setCurrentPage(1);
  };

  const filterAgents = (agents) => {
    return agents.filter(
      (agent) =>
        agent.agencyName?.toLowerCase().includes(searchTerm) ||
        agent.mobile?.toLowerCase().includes(searchTerm) ||
        agent.email?.toLowerCase().includes(searchTerm) ||
        agent.city?.toLowerCase().includes(searchTerm)
    );
  };

  const paginate = (data) => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const renderPagination = (totalItems) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <div className="flex justify-center mt-4 space-x-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded-md border ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    );
  };

  const exportToCSV = (data, title) => {
    const csvRows = [];
    const headers = [
      "ID",
      "Agency Name",
      "Mobile",
      "Email",
      "City",
      "State",
      "Country",
      "Pincode",
      "Address1",
      "Adhar No.",
      "GST No.",
      "Created",
    ];
    csvRows.push(headers.join(","));

    data.forEach((agent, index) => {
      const row = [
        index + 1,
        agent.agencyName,
        agent.mobile,
        agent.email,
        agent.city,
        agent.state,
        agent.country,
        agent.pincode,
        agent.address1,
        agent.adharNumber,
        agent.gstNumber,
        moment(agent.createdAt).format("YYYY-MM-DD HH:mm"),
      ];
      csvRows.push(row.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.csv`;
    a.click();
  };

  const exportToPDF = (data, title) => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    doc.text(title, 14, 10);
    const currentDate = moment().format("DD/MM/YYYY");
    doc.text(currentDate, 200, 10, { align: "right" });

    autoTable(doc, {
      startY: 20,
      head: [
        [
          "ID",
          "Agency Name",
          "Mobile",
          "Email",
          "City",
          "State",
          "Country",
          "Pincode",
          "Address1",
          "Adhar No.",
          "GST No.",
          "Created",
        ],
      ],
      body: data.map((agent, index) => [
        index + 1,
        agent.agencyName,
        agent.mobile,
        agent.email,
        agent.city,
        agent.state,
        agent.country,
        agent.pincode,
        agent.address1,
        agent.adharNumber,
        agent.gstNumber,
        moment(agent.createdAt).format("YYYY-MM-DD HH:mm"),
      ]),
      styles: { fontSize: 7 },
      margin: { top: 20, left: 10, right: 10, bottom: 10 },
      theme: "grid",
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: "bold",
        halign: "center",
      },
      bodyStyles: {
        lineWidth: 0.2,
        lineColor: [0, 0, 0],
      },
    });

    doc.save(`${title}.pdf`);
  };

  const renderAgentTable = (agents, title) => {
    const filtered = filterAgents(agents);
    const paginated = paginate(filtered);

    return (
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold">{title}</h2>
          {filtered.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => exportToCSV(filtered, title.replace(" ", "_"))}
                className="bg-blue-500 text-white px-3 py-2 rounded-lg shadow text-sm"
              >
                Export CSV
              </button>
              <button
                onClick={() => exportToPDF(filtered, title.replace(" ", "_"))}
                className="bg-green-500 text-white px-3 py-2 rounded-lg shadow text-sm"
              >
                Export PDF
              </button>
            </div>
          )}
        </div>

        {filtered.length === 0 ? (
          <p className="text-gray-500">No {title.toLowerCase()} found.</p>
        ) : (
          <>
            <div className="overflow-x-auto border rounded-lg shadow-sm">
              <Table className="bg-white">
                <TableHeader>
                  <TableRow className="text-gray-600">
                    <TableHead>ID</TableHead>
                    <TableHead>Agency Name</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Pincode</TableHead>
                    <TableHead>Address1</TableHead>
                    <TableHead>Adhar No.</TableHead>
                    <TableHead>GST No.</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginated.map((agent, index) => (
                    <TableRow key={agent._id} className="hover:bg-gray-50">
                      <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                      <TableCell>{agent.agencyName}</TableCell>
                      <TableCell>{agent.mobile}</TableCell>
                      <TableCell>{agent.email}</TableCell>
                      <TableCell>{agent.city}</TableCell>
                      <TableCell>{agent.state}</TableCell>
                      <TableCell>{agent.country}</TableCell>
                      <TableCell>{agent.pincode}</TableCell>
                      <TableCell>{agent.address1}</TableCell>
                      <TableCell>{agent.adharNumber}</TableCell>
                      <TableCell>{agent.gstNumber}</TableCell>
                      <TableCell>{moment(agent.createdAt).format("YYYY-MM-DD HH:mm")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {renderPagination(filtered.length)}
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <HeaderNav title="Unapproved Agents" onSearch={handleSearch} />
      <div className="p-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          renderAgentTable(unapprovedAgents, "Unapproved Agents")
        )}
      </div>
    </>
  );
};

export default UnapprovedAgentsPage;
