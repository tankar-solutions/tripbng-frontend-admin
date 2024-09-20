import { Button } from "../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

const tickets = [
  {
    id: "T001",
    customerName: "John Doe",
    subject: "Issue with booking",
    status: "Open",
    date: "2024-09-20",
  },
  {
    id: "T002",
    customerName: "Jane Smith",
    subject: "Refund request",
    status: "In Progress",
    date: "2024-09-21",
  },
  {
    id: "T003",
    customerName: "Robert Johnson",
    subject: "Payment issue",
    status: "Resolved",
    date: "2024-09-22",
  },
  {
    id: "T004",
    customerName: "Emily Davis",
    subject: "Change in itinerary",
    status: "Open",
    date: "2024-09-23",
  },
  {
    id: "T005",
    customerName: "Michael Brown",
    subject: "Flight cancellation",
    status: "Resolved",
    date: "2024-09-24",
  },
];

export default function SupportTickets() {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-lg font-semibold">Support Tickets</h1>
      <Button className="mb-4">Refresh Tickets</Button>
      <div className="bg-white rounded-xl p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id} className="text-sm">
                <TableCell className="font-normal">{ticket.id}</TableCell>
                <TableCell>{ticket.customerName}</TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>
                  <p
                    className={`w-fit p-1 text-xs rounded-md ${
                      ticket.status === "Open"
                        ? "bg-yellow-200 text-yellow-800"
                        : ticket.status === "In Progress"
                        ? "bg-blue-200 text-blue-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {ticket.status}
                  </p>
                </TableCell>
                <TableCell>{ticket.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
