import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { 
  BellDot, 
  ChevronDown, 
  CircleHelp, 
  Plus, 
  Search, 
  Settings 
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../../../components/ui/table";
import { CalendarIcon, Filter } from "../../../components/icons";
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
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Flights</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 bg-white rounded-xl p-2 text-neutral-400 text-sm">
            <Search size={15} />
            <input
              type="search"
              placeholder="Search anything"
              className="outline-none bg-transparent"
            />
          </div>
          <Button size="icon" className="bg-white text-neutral-700"><BellDot size={20} /></Button>
          <Button size="icon" className="bg-white text-neutral-700"><CircleHelp size={20} /></Button>
          <Button size="icon" className="bg-white text-neutral-700"><Settings size={20} /></Button>
        </div>
      </div>
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
