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

const agents = [
  {
    agentId: "A001",
    name: "Sarah Blake",
    email: "sarah.blake@realtynetwork.com",
    phone: "+1 555 234 5678",
    region: "California, USA",
    status: "Active",
  },
  {
    agentId: "A002",
    name: "John McArthur",
    email: "john.mcarthur@premieragents.com",
    phone: "+1 555 345 6789",
    region: "New York, USA",
    status: "Inactive",
  },
  {
    agentId: "A003",
    name: "Lily Thompson",
    email: "lily.thompson@globalrealty.com",
    phone: "+44 20 1234 5678",
    region: "London, UK",
    status: "Pending",
  },
  {
    agentId: "A004",
    name: "Pedro Gomez",
    email: "pedro.gomez@latamagents.com",
    phone: "+52 55 1234 5678",
    region: "Mexico City, Mexico",
    status: "Active",
  },
  // Add more agent details as necessary
];

export default function Agents() {
  return (
    <section className="flex flex-col gap-6">
      <HeaderNav title="Agents" />
      <div className="bg-white rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agent Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent) => (
              <TableRow key={agent.agentId} className="text-sm">
                <TableCell>
                  <Link to={`${agent.agentId}`} className="font-medium">
                    {agent.name}
                  </Link>
                </TableCell>
                <TableCell>{agent.email}</TableCell>
                <TableCell>{agent.phone}</TableCell>
                <TableCell>{agent.region}</TableCell>
                <TableCell>
                  <p
                    className={`w-fit p-1 text-xs rounded-md ${
                      agent.status === "Active"
                        ? "bg-green-200 text-green-800"
                        : agent.status === "Inactive"
                        ? "bg-red-200 text-red-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {agent.status}
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
