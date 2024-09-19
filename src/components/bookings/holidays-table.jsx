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
    booking: "HP001",
    customerName: "John Doe",
    packageName: "Tropical Getaway",
    destination: "Bali, Indonesia",
    duration: "7 Days",
    departure: "2024-10-05",
    returnDate: "2024-10-12",
    totalPeople: 2,
    status: "Confirmed",
  },
  {
    booking: "HP002",
    customerName: "Jane Smith",
    packageName: "European Adventure",
    destination: "Paris, France",
    duration: "10 Days",
    departure: "2024-09-25",
    returnDate: "2024-10-05",
    totalPeople: 1,
    status: "Pending",
  },
  {
    booking: "HP003",
    customerName: "Robert Johnson",
    packageName: "Safari Expedition",
    destination: "Kenya, Africa",
    duration: "5 Days",
    departure: "2024-11-10",
    returnDate: "2024-11-15",
    totalPeople: 3,
    status: "Cancelled",
  },
  {
    booking: "HP004",
    customerName: "Emily Davis",
    packageName: "Island Hopping",
    destination: "Maldives",
    duration: "6 Days",
    departure: "2024-10-20",
    returnDate: "2024-10-26",
    totalPeople: 4,
    status: "Confirmed",
  },
  {
    booking: "HP005",
    customerName: "Michael Brown",
    packageName: "Desert Safari",
    destination: "Dubai, UAE",
    duration: "4 Days",
    departure: "2024-09-30",
    returnDate: "2024-10-04",
    totalPeople: 2,
    status: "Confirmed",
  },
];

export function HolidaysTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Booking ID</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Package Name</TableHead>
          <TableHead>Destination</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Departure Date</TableHead>
          <TableHead>Return Date</TableHead>
          <TableHead>Total People</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.booking} className="text-sm">
            <TableCell className="font-normal">{booking.booking}</TableCell>
            <TableCell>{booking.customerName}</TableCell>
            <TableCell>{booking.packageName}</TableCell>
            <TableCell>{booking.destination}</TableCell>
            <TableCell>{booking.duration}</TableCell>
            <TableCell>{booking.departure}</TableCell>
            <TableCell>{booking.returnDate}</TableCell>
            <TableCell>{booking.totalPeople}</TableCell>
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
