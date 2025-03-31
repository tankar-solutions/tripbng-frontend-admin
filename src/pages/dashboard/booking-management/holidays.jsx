import HeaderNav from "../../../components/layout/HeaderNav";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

const holidayBookings = [
  {
    booking: "HB001",
    customerName: "Alice Johnson",
    destination: "Hawaii",
    startDate: "2024-12-20",
    endDate: "2024-12-27",
    totalPersons: 4,
    status: "Confirmed",
  },
  {
    booking: "HB002",
    customerName: "Michael Clark",
    destination: "Bali",
    startDate: "2024-11-10",
    endDate: "2024-11-17",
    totalPersons: 2,
    status: "Pending",
  },
  {
    booking: "HB003",
    customerName: "Linda Smith",
    destination: "Paris",
    startDate: "2024-10-05",
    endDate: "2024-10-12",
    totalPersons: 1,
    status: "Cancelled",
  },
  {
    booking: "HB004",
    customerName: "James Williams",
    destination: "Tokyo",
    startDate: "2024-09-15",
    endDate: "2024-09-22",
    totalPersons: 3,
    status: "Confirmed",
  },
  {
    booking: "HB005",
    customerName: "Emily Davis",
    destination: "New York",
    startDate: "2024-08-01",
    endDate: "2024-08-05",
    totalPersons: 2,
    status: "Confirmed",
  },
];

export default function Holidays() {
  return (
    <section className="flex flex-col gap-6">
    <HeaderNav title="Holidays" />
      <div className="bg-white rounded-xl p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book ID</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Total Persons</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holidayBookings.map((booking) => (
              <TableRow key={booking.booking} className="text-sm">
                <TableCell className="font-normal">{booking.booking}</TableCell>
                <TableCell>{booking.customerName}</TableCell>
                <TableCell>{booking.destination}</TableCell>
                <TableCell>{booking.startDate}</TableCell>
                <TableCell>{booking.endDate}</TableCell>
                <TableCell>{booking.totalPersons}</TableCell>
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
