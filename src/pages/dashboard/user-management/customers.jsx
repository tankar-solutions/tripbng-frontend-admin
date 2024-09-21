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

const usersWithBookings = [
  {
    userId: "U001",
    userName: "John Doe",
    role: "Admin",
    avatar: "https://i.pravatar.cc/150?img=1",
    email: "john.doe@example.com",
    phone: "+1 123 456 7890",
    location: "New York, USA",
    status: "Active",
  },
  {
    userId: "U002",
    userName: "Jane Smith",
    role: "Customer",
    avatar: "https://i.pravatar.cc/150?img=2",
    email: "jane.smith@example.com",
    phone: "+1 987 654 3210",
    location: "Los Angeles, USA",
    status: "Inactive",
  },
  {
    userId: "U003",
    userName: "Robert Johnson",
    role: "Customer",
    avatar: "https://i.pravatar.cc/150?img=3",
    email: "robert.johnson@example.com",
    phone: "+1 555 555 5555",
    location: "Chicago, USA",
    status: "Active",
  },
  {
    userId: "U004",
    userName: "Emily Davis",
    role: "Admin",
    avatar: "https://i.pravatar.cc/150?img=4",
    email: "emily.davis@example.com",
    phone: "+44 20 7946 0958",
    location: "London, UK",
    status: "Active",
  },
  {
    userId: "U005",
    userName: "Michael Brown",
    role: "Customer",
    avatar: "https://i.pravatar.cc/150?img=5",
    email: "michael.brown@example.com",
    phone: "+49 30 1234 5678",
    location: "Berlin, Germany",
    status: "Pending",
  },
  {
    userId: "U006",
    userName: "Sarah Connor",
    role: "Customer",
    avatar: "https://i.pravatar.cc/150?img=6",
    email: "sarah.connor@example.com",
    phone: "+33 1 23 45 67 89",
    location: "Paris, France",
    status: "Inactive",
  },
  // ...add more users as needed
];

export default function Customers() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Customers</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 bg-white rounded-xl p-2 text-neutral-400 text-sm">
            <Search className="font-thin" size={15} />
            <input
              type="search"
              name=""
              id=""
              placeholder="Search users"
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
              <TableHead>User Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersWithBookings.map((user) => (
              <TableRow key={user.userId} className="text-sm">
                <TableCell className="flex items-center gap-3">
                  <Link
                    to={`${user.userId}`}
                    className="flex items-center gap-4"
                  >
                    <img
                      src={user.avatar}
                      alt={`${user.userName}'s Avatar`}
                      className="w-10 h-10 rounded-full"
                    />
                    {user.userName}
                  </Link>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.location}</TableCell>
                <TableCell>
                  <p className="w-fit p-1 text-xs rounded-md bg-green-200 text-green-800">
                    {user.role}
                  </p>
                </TableCell>
                <TableCell>
                  <p
                    className={`w-fit p-1 text-xs rounded-md ${
                      user.status === "Active"
                        ? "bg-green-200 text-green-800"
                        : user.status === "Inactive"
                        ? "bg-red-200 text-red-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {user.status}
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
