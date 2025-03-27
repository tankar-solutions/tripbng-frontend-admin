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
import { Link } from "react-router-dom";

const usersWithBookings = [
  {
    userId: "U001",
    userName: "John Doe",
    role: "Admin",
    avatar: "https://i.pravatar.cc/150?img=1",
    booking: {
      bookingId: "BK001",
      flightNo: "AA123",
      airline: "American Airlines",
      route: "JFK - LAX",
      departure: "10:00 AM",
      arrival: "1:00 PM",
      date: "2024-09-20",
      totalPassengers: 2,
      status: "Confirmed",
    },
  },
  {
    userId: "U002",
    userName: "Jane Smith",
    role: "Customer",
    avatar: "https://i.pravatar.cc/150?img=2",
    booking: {
      bookingId: "BK002",
      flightNo: "UA456",
      airline: "United Airlines",
      route: "ORD - SFO",
      departure: "11:30 AM",
      arrival: "2:45 PM",
      date: "2024-09-21",
      totalPassengers: 1,
      status: "Pending",
    },
  },
  {
    userId: "U003",
    userName: "Robert Johnson",
    role: "Customer",
    avatar: "https://i.pravatar.cc/150?img=3",
    booking: {
      bookingId: "BK003",
      flightNo: "DL789",
      airline: "Delta Airlines",
      route: "ATL - SEA",
      departure: "9:00 AM",
      arrival: "12:30 PM",
      date: "2024-09-22",
      totalPassengers: 3,
      status: "Cancelled",
    },
  },
  {
    userId: "U004",
    userName: "Emily Davis",
    role: "Admin",
    avatar: "https://i.pravatar.cc/150?img=4",
    booking: {
      bookingId: "BK004",
      flightNo: "SW987",
      airline: "Southwest Airlines",
      route: "HOU - DEN",
      departure: "8:15 AM",
      arrival: "10:45 AM",
      date: "2024-09-23",
      totalPassengers: 4,
      status: "Confirmed",
    },
  },
  {
    userId: "U005",
    userName: "Michael Brown",
    role: "Customer",
    avatar: "https://i.pravatar.cc/150?img=5",
    booking: {
      bookingId: "BK005",
      flightNo: "BA456",
      airline: "British Airways",
      route: "LHR - JFK",
      departure: "7:00 AM",
      arrival: "10:30 AM",
      date: "2024-09-24",
      totalPassengers: 2,
      status: "Confirmed",
    },
  },
];

export default function Users() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Users</h1>
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
              <TableHead>User Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Booking ID</TableHead>
              <TableHead>Flight No</TableHead>
              <TableHead>Airline</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Arrival</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total Passengers</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersWithBookings.map((user) => (
              <TableRow key={user.userId} className="text-sm">
                <TableCell className="flex items-center gap-3">
                  <Link
                    to={`${user.userId}`}
                    className="flex items-center gap-4"
                  >
                    <img
                      src={user.avatar}
                      alt={`${user.userName}'s Avatar`}
                      className="w-10 h-10 rounded-full"
                    />
                    {user.userName}
                  </Link>
                </TableCell>
                <TableCell>
                  <p
                    className={`w-fit p-1 text-xs rounded-md ${
                      user.role === "Admin"
                        ? "bg-blue-200 text-blue-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {user.role}
                  </p>
                </TableCell>
                <TableCell>{user.booking.bookingId}</TableCell>
                <TableCell>{user.booking.flightNo}</TableCell>
                <TableCell>{user.booking.airline}</TableCell>
                <TableCell>{user.booking.route}</TableCell>
                <TableCell>{user.booking.departure}</TableCell>
                <TableCell>{user.booking.arrival}</TableCell>
                <TableCell>{user.booking.date}</TableCell>
                <TableCell>{user.booking.totalPassengers}</TableCell>
                <TableCell>
                  <p
                    className={`w-fit p-1 text-xs rounded-md ${
                      user.booking.status === "Confirmed"
                        ? "bg-green-200 text-green-800"
                        : user.booking.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {user.booking.status}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
