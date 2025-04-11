import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

import HeaderNav from "../../../components/layout/HeaderNav";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const initialData = [
  { month: "January", revenue: 5000 },
  { month: "February", revenue: 7000 },
  { month: "March", revenue: 8000 },
  { month: "April", revenue: 6000 },
  { month: "May", revenue: 9000 },
  { month: "June", revenue: 12000 },
];

export default function RevenueReport() {
  const [revenueData] = useState(initialData);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const total = revenueData.reduce((acc, item) => acc + item.revenue, 0);
    setTotalRevenue(total);
  }, [revenueData]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    doc.setFontSize(16);
    doc.text("Revenue Report", 14, 20);

    const tableColumn = ["Month", "Revenue ($)"];
    const tableRows = revenueData.map((item) => [item.month, item.revenue.toLocaleString()]);

    tableRows.push(["Total", totalRevenue.toLocaleString()]);

    doc.autoTable({
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      theme: "striped",
      headStyles: { fillColor: [107, 114, 128] },
    });

    doc.save("Revenue_Report.pdf");
  };

  return (
    <section className="flex flex-col gap-6 px-8">
      <HeaderNav title="Revenue Reports" />
      <div className="flex items-end justify-end">
        <Button className="mb-2 w-1/6" onClick={handleDownloadPDF}>
          Download Report
        </Button>
      </div>

      <div className="bg-white rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4">Monthly Revenue Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#6b7280" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead>Revenue ($)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {revenueData.map((item) => (
              <TableRow key={item.month} className="text-sm">
                <TableCell>{item.month}</TableCell>
                <TableCell>{item.revenue.toLocaleString()}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="font-semibold">Total</TableCell>
              <TableCell className="font-semibold">
                {totalRevenue.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
