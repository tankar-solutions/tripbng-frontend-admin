import HeaderNav from "../../../components/layout/HeaderNav";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

const bookings = [
  {
    booking: "BK001",
    customerName: "John Doe",
    hotelName: "Hotel California",
    checkInDate: "2024-09-20",
    checkOutDate: "2024-09-25",
    totalGuests: 2,
    status: "Confirmed",
  },
  // Add more bookings as needed
];

export default function Hotels() {
  return (
    <section className="flex flex-col gap-6">
        <HeaderNav title="Hotels" />
      <div className="bg-white rounded-xl p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book ID</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Hotel Name</TableHead>
              <TableHead>Check-in Date</TableHead>
              <TableHead>Check-out Date</TableHead>
              <TableHead>Total Guests</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.booking} className="text-sm">
                <TableCell className="font-normal">{booking.booking}</TableCell>
                <TableCell>{booking.customerName}</TableCell>
                <TableCell>{booking.hotelName}</TableCell>
                <TableCell>{booking.checkInDate}</TableCell>
                <TableCell>{booking.checkOutDate}</TableCell>
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
      </div>
    </section>
  );
}
