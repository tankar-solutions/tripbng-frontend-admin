import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const bookings = [
  {
    booking: "BK001",
    customerName: "John Doe",
    flightNo: "AA123",
    airline: "American Airlines",
    route: "JFK - LAX",
    departure: "10:00 AM",
    arrival: "1:00 PM",
    date: "2024-09-20",
    totalPassengers: 2,
    status: "Confirmed",
  },
  {
    booking: "BK002",
    customerName: "Jane Smith",
    flightNo: "UA456",
    airline: "United Airlines",
    route: "ORD - SFO",
    departure: "11:30 AM",
    arrival: "2:45 PM",
    date: "2024-09-21",
    totalPassengers: 1,
    status: "Pending",
  },
  {
    booking: "BK003",
    customerName: "Robert Johnson",
    flightNo: "DL789",
    airline: "Delta Airlines",
    route: "ATL - SEA",
    departure: "9:00 AM",
    arrival: "12:30 PM",
    date: "2024-09-22",
    totalPassengers: 3,
    status: "Cancelled",
  },
  {
    booking: "BK004",
    customerName: "Emily Davis",
    flightNo: "SW987",
    airline: "Southwest Airlines",
    route: "HOU - DEN",
    departure: "8:15 AM",
    arrival: "10:45 AM",
    date: "2024-09-23",
    totalPassengers: 4,
    status: "Confirmed",
  },
  {
    booking: "BK005",
    customerName: "Michael Brown",
    flightNo: "BA456",
    airline: "British Airways",
    route: "LHR - JFK",
    departure: "7:00 AM",
    arrival: "10:30 AM",
    date: "2024-09-24",
    totalPassengers: 2,
    status: "Confirmed",
  },
];

export  function FlightTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Book ID</TableHead>
          <TableHead>Customer Name</TableHead>
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
        {bookings.map((booking) => (
          <TableRow key={booking.booking} className="text-sm">
            <TableCell className="font-normal">{booking.booking}</TableCell>
            <TableCell>{booking.customerName}</TableCell>
            <TableCell>{booking.flightNo}</TableCell>
            <TableCell>{booking.airline}</TableCell>
            <TableCell>{booking.route}</TableCell>
            <TableCell>{booking.departure}</TableCell>
            <TableCell>{booking.arrival}</TableCell>
            <TableCell>{booking.date}</TableCell>
            <TableCell>{booking.totalPassengers}</TableCell>
            <TableCell>
              <p
                className={`w-fit p-1 text-xs rounded-md ${
                  booking.status === "Confirmed"
                    ? "bg-green-200 text-green-800"
                    : booking.status === "Pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {booking.status}
              </p>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
