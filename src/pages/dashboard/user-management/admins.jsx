import { Button } from "../../../components/ui/button";
import {
  BellDot,
  ChevronDown,
  CircleHelp,
  Search,
  Settings,
} from "lucide-react";
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
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Admins</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 bg-white rounded-xl p-2 text-neutral-400 text-sm">
            <Search className="font-thin" size={15} />
            <input
              type="search"
              placeholder="Search admins"
              className="outline-none bg-transparent"
            />
          </div>
          <Button size="icon" className="bg-white text-neutral-700">
            <BellDot size={20} />
          </Button>
          <Button size="icon" className="bg-white text-neutral-700">
            <CircleHelp size={20} />
          </Button>
          <Button size="icon" className="bg-white text-neutral-700">
            <Settings size={20} />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-400/50 rounded-xl" />
            <div>
              <p className="text-sm">Martin Septimus</p>
              <p className="text-xs text-neutral-400">Admin</p>
            </div>
            <ChevronDown size={20} />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Admin Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.adminId} className="text-sm">
                <TableCell>
                  <Link to={`${admin.adminId}`} className="font-medium">
                    {admin.name}
                  </Link>
                </TableCell>
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
