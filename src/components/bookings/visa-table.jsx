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
    booking: "VB001",
    customerName: "John Doe",
    visaType: "Tourist",
    country: "USA",
    passportNumber: "A12345678",
    applicationDate: "2024-09-10",
    status: "Approved",
  },
  {
    booking: "VB002",
    customerName: "Jane Smith",
    visaType: "Business",
    country: "Canada",
    passportNumber: "B98765432",
    applicationDate: "2024-09-12",
    status: "Pending",
  },
  {
    booking: "VB003",
    customerName: "Robert Johnson",
    visaType: "Student",
    country: "UK",
    passportNumber: "C76543210",
    applicationDate: "2024-09-15",
    status: "Rejected",
  },
  {
    booking: "VB004",
    customerName: "Emily Davis",
    visaType: "Work",
    country: "Germany",
    passportNumber: "D11223344",
    applicationDate: "2024-09-18",
    status: "Approved",
  },
  {
    booking: "VB005",
    customerName: "Michael Brown",
    visaType: "Tourist",
    country: "Australia",
    passportNumber: "E55443322",
    applicationDate: "2024-09-20",
    status: "Approved",
  },
];

export function VisaTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Booking ID</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Visa Type</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Passport Number</TableHead>
          <TableHead>Application Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.booking} className="text-sm">
            <TableCell className="font-normal">{booking.booking}</TableCell>
            <TableCell>{booking.customerName}</TableCell>
            <TableCell>{booking.visaType}</TableCell>
            <TableCell>{booking.country}</TableCell>
            <TableCell>{booking.passportNumber}</TableCell>
            <TableCell>{booking.applicationDate}</TableCell>
            <TableCell>
              <p
                className={`w-fit p-1 text-xs rounded-md ${
                  booking.status === "Approved"
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
