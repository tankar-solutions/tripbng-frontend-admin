import { Button } from "../../../components/ui/button";
import {
  BellDot,
  ChevronDown,
  CircleHelp,
  Plus,
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

import { CalendarIcon, Filter } from "../../../components/icons";

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
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Visa Services</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 bg-white rounded-xl p-2 text-neutral-400 text-sm">
            <Search className="font-thin" size={15} />
            <input
              type="search"
              placeholder="Search anything"
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 bg-white rounded-xl p-2 text-neutral-400 text-sm">
          <Search className="font-thin" size={15} />
          <input
            type="search"
            placeholder="Search anything"
            className="outline-none bg-transparent"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-neutral-400">
            <Filter />
            <span className="text-sm">Status</span>
            <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-1 text-neutral-400">
            <CalendarIcon />
            <span className="text-sm">1-8 July 2024</span>
            <ChevronDown size={14} />
          </button>
          <Button className="flex items-center gap-3">
            <Plus size={15} />
            Add Application
          </Button>
        </div>
      </div>
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
