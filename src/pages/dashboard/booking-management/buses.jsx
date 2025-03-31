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
    busNo: "BUS123",
    company: "Greyhound",
    route: "NYC - DC",
    departure: "10:00 AM",
    arrival: "2:00 PM",
    date: "2024-09-20",
    totalPassengers: 2,
    status: "Confirmed",
  },
  {
    booking: "BK002",
    customerName: "Jane Smith",
    busNo: "BUS456",
    company: "Megabus",
    route: "LA - SF",
    departure: "11:30 AM",
    arrival: "3:00 PM",
    date: "2024-09-21",
    totalPassengers: 1,
    status: "Pending",
  },
  {
    booking: "BK003",
    customerName: "Robert Johnson",
    busNo: "BUS789",
    company: "FlixBus",
    route: "ATL - MIA",
    departure: "9:00 AM",
    arrival: "1:30 PM",
    date: "2024-09-22",
    totalPassengers: 3,
    status: "Cancelled",
  },
  {
    booking: "BK004",
    customerName: "Emily Davis",
    busNo: "BUS101",
    company: "National Geographic",
    route: "CHI - IND",
    departure: "8:15 AM",
    arrival: "10:45 AM",
    date: "2024-09-23",
    totalPassengers: 4,
    status: "Confirmed",
  },
  {
    booking: "BK005",
    customerName: "Michael Brown",
    busNo: "BUS102",
    company: "Peter Pan",
    route: "BOS - NYC",
    departure: "7:00 AM",
    arrival: "9:30 AM",
    date: "2024-09-24",
    totalPassengers: 2,
    status: "Confirmed",
  },
];

export default function Buses() {
  return (
    <section className="flex flex-col gap-6">
    <HeaderNav title="Buses" />
      <div className="bg-white rounded-xl p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book ID</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Bus No</TableHead>
              <TableHead>Company</TableHead>
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
                <TableCell>{booking.busNo}</TableCell>
                <TableCell>{booking.company}</TableCell>
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
      </div>
    </section>
  );
}
