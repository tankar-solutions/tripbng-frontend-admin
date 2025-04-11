import HeaderNav from "../../../components/layout/HeaderNav";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Link } from "react-router-dom";

const admins = [
  {
    adminId: "AD001",
    name: "Oliver Stone",
    email: "oliver.stone@company.com",
    phone: "+1 555 123 4567",
    role: "Super Admin",
    status: "Active",
  },
  {
    adminId: "AD002",
    name: "Emma Carter",
    email: "emma.carter@company.com",
    phone: "+1 555 234 5678",
    role: "Admin",
    status: "Inactive",
  },
  {
    adminId: "AD003",
    name: "James Anderson",
    email: "james.anderson@company.com",
    phone: "+44 20 1234 5678",
    role: "Moderator",
    status: "Pending",
  },
  {
    adminId: "AD004",
    name: "Isabella White",
    email: "isabella.white@company.com",
    phone: "+61 2 1234 5678",
    role: "Admin",
    status: "Active",
  },
  // Add more admin details as necessary
];

export default function Admins() {
  return (
    <section className="flex flex-col gap-6 px-8">
    <HeaderNav title="Admin" />
  
    <div className="bg-white rounded-xl overflow-x-auto shadow">
      <Table className="min-w-[600px] text-sm">
        <TableHeader>
          <TableRow className="bg-gray-50 text-gray-700">
            <TableHead>Admin Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.map((admin) => (
            <TableRow>
              <TableCell>{admin.adminId}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>{admin.phone}</TableCell>
              <TableCell>{admin.role}</TableCell>
              <TableCell>
                <p
                  className={`w-fit p-1 text-xs rounded-md ${
                    admin.status === "Active"
                      ? "bg-green-200 text-green-800"
                      : admin.status === "Inactive"
                      ? "bg-red-200 text-red-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {admin.status}
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
