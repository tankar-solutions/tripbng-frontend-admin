import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const busBookings = [
  {
    booking: "BK001",
    customerName: "John Doe",
    busNo: "B123",
    operator: "RedBus",
    route: "NYC - DC",
    departure: "8:00 AM",
    arrival: "12:00 PM",
    date: "2024-09-20",
    totalPassengers: 2,
    status: "Confirmed",
  },
  {
    booking: "BK002",
    customerName: "Jane Smith",
    busNo: "B456",
    operator: "Greyhound",
    route: "LA - SF",
    departure: "10:00 AM",
    arrival: "2:30 PM",
    date: "2024-09-21",
    totalPassengers: 1,
    status: "Pending",
  },
  {
    booking: "BK003",
    customerName: "Robert Johnson",
    busNo: "B789",
    operator: "Megabus",
    route: "Boston - NYC",
    departure: "6:00 AM",
    arrival: "10:00 AM",
    date: "2024-09-22",
    totalPassengers: 3,
    status: "Cancelled",
  },
  {
    booking: "BK004",
    customerName: "Emily Davis",
    busNo: "B987",
    operator: "FlixBus",
    route: "Miami - Orlando",
    departure: "9:00 AM",
    arrival: "12:00 PM",
    date: "2024-09-23",
    totalPassengers: 4,
    status: "Confirmed",
  },
  {
    booking: "BK005",
    customerName: "Michael Brown",
    busNo: "B654",
    operator: "Peter Pan",
    route: "Chicago - Detroit",
    departure: "7:30 AM",
    arrival: "11:30 AM",
    date: "2024-09-24",
    totalPassengers: 2,
    status: "Confirmed",
  },
];

export function BusTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Booking ID</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Bus No</TableHead>
          <TableHead>Operator</TableHead>
          <TableHead>Route</TableHead>
          <TableHead>Departure</TableHead>
          <TableHead>Arrival</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Total Passengers</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {busBookings.map((booking) => (
          <TableRow key={booking.booking} className="text-sm">
            <TableCell className="font-normal">{booking.booking}</TableCell>
            <TableCell>{booking.customerName}</TableCell>
            <TableCell>{booking.busNo}</TableCell>
            <TableCell>{booking.operator}</TableCell>
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
