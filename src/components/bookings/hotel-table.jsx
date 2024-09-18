import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const hotelBookings = [
  {
    bookingId: "HB001",
    customerName: "John Doe",
    hotelName: "The Plaza Hotel",
    roomType: "Deluxe Suite",
    checkIn: "2024-09-20",
    checkOut: "2024-09-25",
    totalGuests: 2,
    status: "Confirmed",
  },
  {
    bookingId: "HB002",
    customerName: "Jane Smith",
    hotelName: "Grand Hyatt",
    roomType: "King Room",
    checkIn: "2024-09-21",
    checkOut: "2024-09-24",
    totalGuests: 1,
    status: "Pending",
  },
  {
    bookingId: "HB003",
    customerName: "Robert Johnson",
    hotelName: "Hilton Atlanta",
    roomType: "Queen Room",
    checkIn: "2024-09-22",
    checkOut: "2024-09-26",
    totalGuests: 3,
    status: "Cancelled",
  },
  {
    bookingId: "HB004",
    customerName: "Emily Davis",
    hotelName: "Marriott Denver",
    roomType: "Executive Suite",
    checkIn: "2024-09-23",
    checkOut: "2024-09-28",
    totalGuests: 4,
    status: "Confirmed",
  },
  {
    bookingId: "HB005",
    customerName: "Michael Brown",
    hotelName: "The Ritz-Carlton",
    roomType: "Club Room",
    checkIn: "2024-09-24",
    checkOut: "2024-09-29",
    totalGuests: 2,
    status: "Confirmed",
  },
];

export function HotelTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Booking ID</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Hotel Name</TableHead>
          <TableHead>Room Type</TableHead>
          <TableHead>Check-In</TableHead>
          <TableHead>Check-Out</TableHead>
          <TableHead>Total Guests</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {hotelBookings.map((booking) => (
          <TableRow key={booking.bookingId} className="text-sm">
            <TableCell className="font-normal">{booking.bookingId}</TableCell>
            <TableCell>{booking.customerName}</TableCell>
            <TableCell>{booking.hotelName}</TableCell>
            <TableCell>{booking.roomType}</TableCell>
            <TableCell>{booking.checkIn}</TableCell>
            <TableCell>{booking.checkOut}</TableCell>
            <TableCell>{booking.totalGuests}</TableCell>
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
