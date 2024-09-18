import { Button } from "../../components/ui/button";
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
} from "../../components/ui/table";
import { Calendar, Filter } from "../../components/icons";

const flights = [
  {
    flightNo: "AA123",
    airline: "American Airlines",
    route: "JFK - LAX",
    totalSeats: 150,
    bookedSeats: 2, // based on your bookings data
    status: "Available",
  },
  {
    flightNo: "UA456",
    airline: "United Airlines",
    route: "ORD - SFO",
    totalSeats: 200,
    bookedSeats: 1,
    status: "Available",
  },
  {
    flightNo: "DL789",
    airline: "Delta Airlines",
    route: "ATL - SEA",
    totalSeats: 180,
    bookedSeats: 3,
    status: "Cancelled",
  },
  {
    flightNo: "SW987",
    airline: "Southwest Airlines",
    route: "HOU - DEN",
    totalSeats: 120,
    bookedSeats: 4,
    status: "Available",
  },
  {
    flightNo: "BA456",
    airline: "British Airways",
    route: "LHR - JFK",
    totalSeats: 220,
    bookedSeats: 2,
    status: "Available",
  },
];

export default function Inventory() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Inventory</h1>
        <div className="flex items-center gap-3">
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
            <Calendar />
            <span className="text-sm">1-8 July 2024</span>
            <ChevronDown size={14} />
          </button>
          <Button className="flex items-center gap-3">
            <Plus size={15} />
            Add Inventory
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Flight No</TableHead>
              <TableHead>Airline</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Total Seats</TableHead>
              <TableHead>Booked Seats</TableHead>
              <TableHead>Available Seats</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flights.map((flight) => (
              <TableRow key={flight.flightNo} className="text-sm">
                <TableCell>{flight.flightNo}</TableCell>
                <TableCell>{flight.airline}</TableCell>
                <TableCell>{flight.route}</TableCell>
                <TableCell>{flight.totalSeats}</TableCell>
                <TableCell>{flight.bookedSeats}</TableCell>
                <TableCell>{flight.totalSeats - flight.bookedSeats}</TableCell>
                <TableCell>
                  <p
                    className={`w-fit p-1 text-xs rounded-md ${
                      flight.status === "Available"
                        ? "bg-green-200 text-green-800"
                        : flight.status === "Cancelled"
                        ? "bg-red-200 text-red-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {flight.status}
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
