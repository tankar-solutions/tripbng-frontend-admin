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
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Holidays() {
  const [holidayBookings, setHolidayBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchHolidayBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Please login first.");
        navigate("/");
        return;
      }

      const response = await fetch("https://api.tripbng.com/admin/getalltravquery", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok && result.data.success) {
        setHolidayBookings(result.data.data || []);
      } else {
        toast.error(result.message || "Failed to fetch holiday bookings.");
        if (result.message === "Please Login First") {
          localStorage.removeItem("accessToken");
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error fetching holiday bookings:", error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidayBookings();
  }, []);

  return (
    <section className="flex flex-col gap-6">
      <HeaderNav title="Holidays" />
      <div className="bg-white rounded-xl p-4">
        {loading ? (
          <p className="text-center p-4">Loading...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>From City</TableHead>
                <TableHead>To City</TableHead>
                <TableHead>Travel Date</TableHead>
                <TableHead>Return Date</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Nights</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holidayBookings.length > 0 ? (
                holidayBookings.map((booking) => (
                  <TableRow key={booking._id} className="text-sm">
                    <TableCell>{booking.username || "-"}</TableCell>
                    <TableCell>{booking.contact || "-"}</TableCell>
                    <TableCell>{booking.from_city || "-"}</TableCell>
                    <TableCell>{booking.to_city || "-"}</TableCell>
                    <TableCell>{booking.travel_date || "-"}</TableCell>
                    <TableCell>{booking.return_date || "-"}</TableCell>
                    <TableCell>{booking.days || "-"}</TableCell>
                    <TableCell>{booking.nights || "-"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-500">
                    No holiday bookings found.
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
