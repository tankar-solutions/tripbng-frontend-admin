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
    booking: "YB001",
    customerName: "John Doe",
    yachtName: "Sea Breeze",
    destination: "Bahamas",
    departureTime: "10:00 AM",
    arrivalTime: "4:00 PM",
    date: "2024-09-20",
    totalPassengers: 5,
    status: "Confirmed",
  },
  {
    booking: "YB002",
    customerName: "Jane Smith",
    yachtName: "Ocean Voyager",
    destination: "Caribbean",
    departureTime: "11:30 AM",
    arrivalTime: "6:00 PM",
    date: "2024-09-21",
    totalPassengers: 3,
    status: "Pending",
  },
  {
    booking: "YB003",
    customerName: "Robert Johnson",
    yachtName: "Sunset Dream",
    destination: "Maldives",
    departureTime: "9:00 AM",
    arrivalTime: "3:00 PM",
    date: "2024-09-22",
    totalPassengers: 8,
    status: "Cancelled",
  },
  {
    booking: "YB004",
    customerName: "Emily Davis",
    yachtName: "Wave Rider",
    destination: "Greek Islands",
    departureTime: "8:15 AM",
    arrivalTime: "2:00 PM",
    date: "2024-09-23",
    totalPassengers: 6,
    status: "Confirmed",
  },
  {
    booking: "YB005",
    customerName: "Michael Brown",
    yachtName: "Blue Horizon",
    destination: "French Riviera",
    departureTime: "7:00 AM",
    arrivalTime: "1:00 PM",
    date: "2024-09-24",
    totalPassengers: 4,
    status: "Confirmed",
  },
];

export function YatchTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Booking ID</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Yacht Name</TableHead>
          <TableHead>Destination</TableHead>
          <TableHead>Departure Time</TableHead>
          <TableHead>Arrival Time</TableHead>
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
            <TableCell>{booking.yachtName}</TableCell>
            <TableCell>{booking.destination}</TableCell>
            <TableCell>{booking.departureTime}</TableCell>
            <TableCell>{booking.arrivalTime}</TableCell>
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
