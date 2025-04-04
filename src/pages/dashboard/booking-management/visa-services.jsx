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

export default function VisaBookings() {
  const [visaBookings, setVisaBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchVisaBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Please login first.");
        navigate("/");
        return;
      }

      const response = await fetch("https://api.tripbng.com/admin/getallvisabooking", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok && result.data.success) {
        setVisaBookings(result.data.data || []);
      } else {
        toast.error(result.message || "Failed to fetch visa bookings.");
        if (result.message === "Please Login First") {
          localStorage.removeItem("accessToken");
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error fetching visa booking:", error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisaBookings(); 
  }, []); 

  return (
    <section className="flex flex-col gap-6">
      <HeaderNav title="Visa Bookings" />

      <div className="bg-white rounded-xl">
        {loading ? (
          <p className="text-center p-4">Loading...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Travel Date</TableHead>
                <TableHead>Stay Duration</TableHead>
                <TableHead>Visa Type</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visaBookings.length > 0 ? (
                visaBookings.map((booking) => (
                  <TableRow key={booking._id} className="text-sm">
                    <TableCell>{booking.username || "-"}</TableCell>
                    <TableCell>{booking.contact || "-"}</TableCell>
                    <TableCell>{booking.for || "-"}</TableCell>
                    <TableCell>{booking.travel_date || "-"}</TableCell>
                    <TableCell>{booking.stayin_days || "-"}</TableCell>
                    <TableCell>{booking.visa_type || "-"}</TableCell>
                    <TableCell>{new Date(booking.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500">
                    No visa bookings found.
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
