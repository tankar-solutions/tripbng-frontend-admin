import { useEffect, useState } from "react";
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
import toast from "react-hot-toast";

export default function Customers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.tripbng.com/admin/getalluser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const result = await response.json();
      if (response.ok && result.data.success) {
        setUsers(result.data.data);
      } else {
        toast.error(result.message || "Failed to fetch users.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); 
    const interval = setInterval(fetchUsers, 60000); 
    return () => clearInterval(interval); 
  }, []);

  return (
    <section className="flex flex-col gap-6">
      <HeaderNav title="Customers" />

      <div className="bg-white rounded-xl">
        {loading ? (
          <p className="text-center p-4">Loading...</p>
        ) : (
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
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user._id} className="text-sm">
                    <TableCell className="flex items-center gap-3">
                      <Link to={`${user._id}`} className="flex items-center gap-4">
                        {user.name || "Unknown User"}
                      </Link>
                    </TableCell>
                    <TableCell>{user.email || "N/A"}</TableCell>
                    <TableCell>{user.mobile || "N/A"}</TableCell>
                    <TableCell>{user.address || "N/A"}</TableCell>
                    <TableCell>
                      <p className="w-fit p-1 text-xs rounded-md bg-green-200 text-green-800">
                        {user.Usertype || "N/A"}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className={`w-fit p-1 text-xs rounded-md ${user.isActive ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                        {user.isActive ? "Active" : "Inactive"}
                      </p>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </section>
  );
}
