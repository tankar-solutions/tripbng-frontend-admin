import HeaderNav from "../../../components/layout/HeaderNav";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

const visaApplications = [
  {
    applicationId: "VA001",
    customerName: "John Doe",
    visaType: "Tourist",
    applicationDate: "2024-09-20",
    status: "Approved",
  },
  {
    applicationId: "VA002",
    customerName: "Jane Smith",
    visaType: "Business",
    applicationDate: "2024-09-21",
    status: "Pending",
  },
  {
    applicationId: "VA003",
    customerName: "Robert Johnson",
    visaType: "Student",
    applicationDate: "2024-09-22",
    status: "Rejected",
  },
  {
    applicationId: "VA004",
    customerName: "Emily Davis",
    visaType: "Work",
    applicationDate: "2024-09-23",
    status: "Approved",
  },
  {
    applicationId: "VA005",
    customerName: "Michael Brown",
    visaType: "Transit",
    applicationDate: "2024-09-24",
    status: "Approved",
  },
];

export default function VisaServices() {
  return (
    <section className="flex flex-col gap-6">
          <HeaderNav title="Visa" />
      <div className="bg-white rounded-xl p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application ID</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Visa Type</TableHead>
              <TableHead>Application Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visaApplications.map((application) => (
              <TableRow key={application.applicationId} className="text-sm">
                <TableCell className="font-normal">
                  {application.applicationId}
                </TableCell>
                <TableCell>{application.customerName}</TableCell>
                <TableCell>{application.visaType}</TableCell>
                <TableCell>{application.applicationDate}</TableCell>
                <TableCell>
                  <p
                    className={`w-fit p-1 text-xs rounded-md ${
                      application.status === "Approved"
                        ? "bg-green-200 text-green-800"
                        : application.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {application.status}
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
