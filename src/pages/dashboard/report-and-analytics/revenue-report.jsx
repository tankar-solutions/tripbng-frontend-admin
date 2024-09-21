import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";

const initialData = [
  { month: "January", revenue: 5000 },
  { month: "February", revenue: 7000 },
  { month: "March", revenue: 8000 },
  { month: "April", revenue: 6000 },
  { month: "May", revenue: 9000 },
  { month: "June", revenue: 12000 },
  // Add more months as needed
];

export default function RevenueReport() {
  const [revenueData, setRevenueData] = useState(initialData);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const total = revenueData.reduce((acc, item) => acc + item.revenue, 0);
    setTotalRevenue(total);
  }, [revenueData]);

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-lg font-semibold">Revenue Report</h1>
      <Button className="mb-4">Download Report</Button>
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
