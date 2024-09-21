import { Button } from "../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

const refunds = [
  {
    id: "RF001",
    customerName: "John Doe",
    amount: "$100.00",
    reason: "Flight Cancelled",
    status: "Processed",
    date: "2024-09-20",
  },
  {
    id: "RF002",
    customerName: "Jane Smith",
    amount: "$50.00",
    reason: "Change of Plans",
    status: "Pending",
    date: "2024-09-21",
  },
  {
    id: "RF003",
    customerName: "Robert Johnson",
    amount: "$75.00",
    reason: "Technical Issues",
    status: "Failed",
    date: "2024-09-22",
  },
  {
    id: "RF004",
    customerName: "Emily Davis",
    amount: "$120.00",
    reason: "Duplicate Payment",
    status: "Processed",
    date: "2024-09-23",
  },
  {
    id: "RF005",
    customerName: "Michael Brown",
    amount: "$200.00",
    reason: "Incorrect Booking",
    status: "Processed",
    date: "2024-09-24",
  },
];

export default function RefundManagement() {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-lg font-semibold">Refund Management</h1>
      <Button className="mb-4">Refresh Refunds</Button>
      <div className="bg-white rounded-xl p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Refund ID</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {refunds.map((refund) => (
              <TableRow key={refund.id} className="text-sm">
                <TableCell className="font-normal">{refund.id}</TableCell>
                <TableCell>{refund.customerName}</TableCell>
                <TableCell>{refund.amount}</TableCell>
                <TableCell>{refund.reason}</TableCell>
                <TableCell>
                  <p
                    className={`w-fit p-1 text-xs rounded-md ${
                      refund.status === "Processed"
                        ? "bg-green-200 text-green-800"
                        : refund.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {refund.status}
                  </p>
                </TableCell>
                <TableCell>{refund.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
