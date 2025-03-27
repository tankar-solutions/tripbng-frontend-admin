import { Button } from "../../../components/ui/button";
import {
  BellDot,
  ChevronDown,
  CircleHelp,
  Plus,
  Search,
  Settings,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { CalendarIcon, Filter } from "../../../components/icons";

const userPayments = [
  {
    name: "John Doe",
    bookingCode: "BK001",
    airline: "American Airlines",
    route: "JFK - LAX",
    billingDate: "2024-09-20",
    amount: "$350",
    status: "Paid",
    action: "View Details",
  },
  {
    name: "Jane Smith",
    bookingCode: "BK002",
    airline: "United Airlines",
    route: "ORD - SFO",
    billingDate: "2024-09-21",
    amount: "$420",
    status: "Pending",
    action: "Pay Now",
  },
  {
    name: "Robert Johnson",
    bookingCode: "BK003",
    airline: "Delta Airlines",
    route: "ATL - SEA",
    billingDate: "2024-09-22",
    amount: "$300",
    status: "Cancelled",
    action: "N/A",
  },
  {
    name: "Emily Davis",
    bookingCode: "BK004",
    airline: "Southwest Airlines",
    route: "HOU - DEN",
    billingDate: "2024-09-23",
    amount: "$280",
    status: "Paid",
    action: "View Details",
  },
  {
    name: "Michael Brown",
    bookingCode: "BK005",
    airline: "British Airways",
    route: "LHR - JFK",
    billingDate: "2024-09-24",
    amount: "$500",
    status: "Paid",
    action: "View Details",
  },
];

export default function PaymentsDetails() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Payments</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 bg-white rounded-xl p-2 text-neutral-400 text-sm">
            <Search className="font-thin" size={15} />
            <input
              type="search"
              name=""
              id=""
              placeholder="Search users or bookings"
              className="outline-none bg-transparent"
            />
          </div>
          <Button size="icon" className="bg-white text-neutral-700">
            <BellDot size={20} />
          </Button>
          <Button size="icon" className="bg-white text-neutral-700">
            <CircleHelp size={20} />
          </Button>
          <Button size="icon" className="bg-white text-neutral-700">
            <Settings size={20} />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-400/50 rounded-xl" />
            <div>
              <p className="text-sm">Martin Septimus</p>
              <p className="text-xs text-neutral-400">Admin</p>
            </div>
            <ChevronDown size={20} />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 bg-white rounded-xl p-2 text-neutral-400 text-sm">
          <Search className="font-thin" size={15} />
          <input
            type="search"
            name=""
            id=""
            placeholder="Search anything"
            className="outline-none bg-transparent"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-neutral-400">
            <Filter />
            <span className="text-sm">Status</span>
            <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-1 text-neutral-400">
            <CalendarIcon />
            <span className="text-sm">1-8 July 2024</span>
            <ChevronDown size={14} />
          </button>
          <Button className="flex items-center gap-3">
            <Plus size={15} />
            Add Users
          </Button>
        </div>
      </div>
      <div className=" bg-white rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Booking Code</TableHead>
              <TableHead>Airline</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Billing Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userPayments.map((payment) => (
              <TableRow key={payment.bookingCode}>
                <TableCell>{payment.name}</TableCell>
                <TableCell>{payment.bookingCode}</TableCell>
                <TableCell>{payment.airline}</TableCell>
                <TableCell>{payment.route}</TableCell>
                <TableCell>{payment.billingDate}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>
                  <p
                    className={`w-fit p-1 text-xs rounded-md ${
                      payment.status === "Paid"
                        ? "bg-green-200 text-green-800"
                        : payment.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {payment.status}
                  </p>
                </TableCell>
                <TableCell>
                  <Button>{payment.action}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
