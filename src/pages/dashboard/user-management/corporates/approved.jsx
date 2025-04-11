import HeaderNav from "../../../../components/layout/HeaderNav";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Link } from "react-router-dom";

const corporateAccounts = [
  {
    companyId: "C001",
    companyName: "Tech Innovators Inc.",
    contactPerson: "Alice Johnson",
    email: "alice.johnson@techinnovators.com",
    phone: "+1 987 654 3210",
    location: "San Francisco, USA",
    status: "Active",
  },
  {
    companyId: "C002",
    companyName: "Global Solutions Ltd.",
    contactPerson: "Bob Williams",
    email: "bob.williams@globalsolutions.com",
    phone: "+44 20 7946 0958",
    location: "London, UK",
    status: "Inactive",
  },
  {
    companyId: "C003",
    companyName: "Future Enterprises",
    contactPerson: "Charlie Brown",
    email: "charlie.brown@futureenterprises.com",
    phone: "+49 30 1234 5678",
    location: "Berlin, Germany",
    status: "Pending",
  },
  {
    companyId: "C004",
    companyName: "Prime Innovations",
    contactPerson: "Diana Evans",
    email: "diana.evans@primeinnovations.com",
    phone: "+33 1 23 45 67 89",
    location: "Paris, France",
    status: "Active",
  },
];

export default function Corporate() {
  return (
    <section className="flex flex-col gap-6 p-8">
    <HeaderNav title="Corporate" />
  
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <Table className="min-w-[700px]">
        <TableHeader>
          <TableRow className="text-gray-600">
            <TableHead className="py-3 px-4 text-sm">Company Name</TableHead>
            <TableHead className="py-3 px-4 text-sm">Contact Person</TableHead>
            <TableHead className="py-3 px-4 text-sm">Email</TableHead>
            <TableHead className="py-3 px-4 text-sm">Phone</TableHead>
            <TableHead className="py-3 px-4 text-sm">Location</TableHead>
            <TableHead className="py-3 px-4 text-sm">Status</TableHead>
          </TableRow>
        </TableHeader>
  
        <TableBody>
          {corporateAccounts.map((company) => (
            <TableRow key={company.companyId} className="text-sm hover:bg-gray-50">
              <TableCell className="py-3 px-4">
                <Link to={`${company.companyId}`} className="font-medium text-blue-600 hover:underline">
                  {company.companyName}
                </Link>
              </TableCell>
              <TableCell className="py-3 px-4">{company.contactPerson}</TableCell>
              <TableCell className="py-3 px-4">{company.email}</TableCell>
              <TableCell className="py-3 px-4">{company.phone}</TableCell>
              <TableCell className="py-3 px-4">{company.location}</TableCell>
              <TableCell className="py-3 px-4">
                <p
                  className={`w-fit px-2 py-1 text-xs rounded-md font-medium ${
                    company.status === "Active"
                      ? "bg-green-200 text-green-800"
                      : company.status === "Inactive"
                      ? "bg-red-200 text-red-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {company.status}
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
