import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";

const initialData = [
  {
    userId: "U001",
    userName: "John Doe",
    activity: "Logged In",
    date: "2024-09-20",
    time: "10:00 AM",
  },
  {
    userId: "U002",
    userName: "Jane Smith",
    activity: "Viewed Product",
    date: "2024-09-21",
    time: "11:30 AM",
  },
  {
    userId: "U003",
    userName: "Robert Johnson",
    activity: "Added to Cart",
    date: "2024-09-22",
    time: "9:00 AM",
  },
  {
    userId: "U004",
    userName: "Emily Davis",
    activity: "Checked Out",
    date: "2024-09-23",
    time: "8:15 AM",
  },
  {
    userId: "U005",
    userName: "Michael Brown",
    activity: "Logged Out",
    date: "2024-09-24",
    time: "7:00 AM",
  },
];

export default function UserActivityReport() {
  const [activityData, setActivityData] = useState(initialData);

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-lg font-semibold">User Activity Report</h1>
      <Button className="mb-4">Download Report</Button>
      <div className="bg-white rounded-xl p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activityData.map((activity) => (
              <TableRow key={activity.userId} className="text-sm">
                <TableCell>{activity.userId}</TableCell>
                <TableCell>{activity.userName}</TableCell>
                <TableCell>{activity.activity}</TableCell>
                <TableCell>{activity.date}</TableCell>
                <TableCell>{activity.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
