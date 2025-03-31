import { useEffect, useState } from "react";
import HeaderNav from "../../../components/layout/HeaderNav";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../../../components/ui/table";
import toast from "react-hot-toast";

export default function Flights() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://api.tripbng.com/admin/getallflightbooking", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const result = await response.json();
        if (response.ok && result.data.success) {
          setBookings(result.data.data);
        } else {
          toast.error(result.message || "Failed to fetch bookings.");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <section className="flex flex-col gap-6">
    <HeaderNav title="Flights" />
      <div className="bg-white rounded-xl p-4">
        {loading ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer Email</TableHead>
                <TableHead>User Type</TableHead>
                <TableHead>Reference Number</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, index) => (
                <TableRow key={index} className="animate-pulse">
                  <TableCell className="bg-gray-200 h-4 rounded-md" />
                  <TableCell className="bg-gray-200 h-4 rounded-md" />
                  <TableCell className="bg-gray-200 h-4 rounded-md" />
                  <TableCell className="bg-gray-200 h-4 rounded-md" />
                  <TableCell className="bg-gray-200 h-4 rounded-md" />
                  <TableCell className="bg-gray-200 h-4 rounded-md" />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer Email</TableHead>
                <TableHead>User Type</TableHead>
                <TableHead>Reference Number</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <TableRow key={booking._id} className="text-sm">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{booking.SeatBookUserEmail}</TableCell>
                    <TableCell>{booking.UserType}</TableCell>
                    <TableCell>{booking.BookingRefNum || "N/A"}</TableCell>
                    <TableCell>{new Date(booking.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(booking.createdAt).toLocaleTimeString()}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    No bookings found.
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
