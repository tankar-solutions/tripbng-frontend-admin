import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "../../../components/ui/button";
import HeaderNav from "../../../components/layout/HeaderNav";

const bookingTrends = [
  { month: "January", bookings: 30 },
  { month: "February", bookings: 20 },
  { month: "March", bookings: 50 },
  { month: "April", bookings: 40 },
  { month: "May", bookings: 60 },
  { month: "June", bookings: 70 },
  { month: "July", bookings: 90 },
  { month: "August", bookings: 80 },
  { month: "September", bookings: 100 },
];

export default function BookingTrends() {
  return (
    <section className="flex flex-col gap-6 px-8">
      <HeaderNav title="Booking-Trends" />
      <div className="flex items-end justify-end">
        <Button className="mb-2 w-1/6">Download Report</Button>
      </div>
      <div className="bg-white rounded-xl p-4 h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={bookingTrends} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="bookings"
              stroke="#6b7280" 
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
